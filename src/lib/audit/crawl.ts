import { probe, tryProbe } from './probe';
import { extractSignals } from './signals';
import { isAllowed, type RobotsFile } from './robots';
import { normalizeUrl } from '@/lib/scan/ssrf';
import { AUDIT_USER_AGENT } from './probe';

/**
 * A bounded breadth-first site crawl.
 *
 * The crawl model - a frontier keyed by normalised URL, a depth per entry, a
 * worker pool draining it, sitemap URLs seeded alongside the homepage - is
 * adapted from LibreCrawl (MIT, Copyright (c) 2025 Phiality),
 * https://github.com/PhialsBasement/LibreCrawl. See NOTICE.md. Their crawler is
 * Python, threaded, database-backed and unbounded; this is a rewrite for a
 * single serverless request, which changes the one thing that matters:
 *
 * every crawl here ends. It ends on a URL cap, a depth cap, or a wall clock,
 * whichever comes first, because the alternative on a request-scoped runtime
 * is a function that is killed mid-flight and reports nothing. A visitor who
 * is told "the first 40 pages" and gets them is better served than one who is
 * promised the whole site and gets a timeout.
 *
 * What we do NOT do, deliberately: render JavaScript. LibreCrawl drives
 * Playwright for that. A headless browser per page does not fit a serverless
 * function's memory or time, and a site whose content only exists after JS is
 * itself a finding this audit already reports.
 */

export interface CrawlOptions {
  readonly maxUrls?: number;
  readonly maxDepth?: number;
  readonly concurrency?: number;
  /** Wall clock for the crawl phase. The pool stops starting work past it. */
  readonly budgetMs?: number;
  readonly respectRobots?: boolean;
  /** Test-only seam; see `ProbeOptions.guard`. */
  readonly guard?: (hostname: string) => Promise<unknown>;
}

export const CRAWL_DEFAULTS = {
  maxUrls: 40,
  maxDepth: 3,
  concurrency: 5,
  budgetMs: 22_000,
  respectRobots: true,
} as const;

const PAGE_TIMEOUT_MS = 7_000;
const PAGE_MAX_BYTES = 700_000;
/** Sitemap entries we will read; enough to seed and to measure orphans against. */
const SITEMAP_URL_CAP = 300;

/** Extensions that are never HTML, skipped before a request is spent on them. */
const ASSET_EXTENSION =
  /\.(jpg|jpeg|png|gif|webp|avif|svg|ico|bmp|tiff?|mp4|webm|mov|avi|mp3|wav|ogg|pdf|zip|rar|gz|tgz|7z|doc|docx|xls|xlsx|ppt|pptx|css|js|mjs|json|xml|rss|atom|txt|woff2?|ttf|otf|eot|dmg|exe|apk)$/i;

export interface CrawledPage {
  readonly url: string;
  readonly status: number;
  readonly depth: number;
  readonly ttfbMs: number;
  readonly bytes: number;
  readonly redirectHops: number;
  readonly title: string | null;
  readonly description: string | null;
  readonly h1Count: number;
  readonly h1Text: string | null;
  readonly wordCount: number;
  readonly canonical: string | null;
  readonly noindex: boolean;
  readonly imagesTotal: number;
  readonly imagesWithAlt: number;
  readonly internalLinks: number;
  readonly externalLinks: number;
  readonly jsonLdTypes: readonly string[];
  /** Pages that linked here, for reporting a broken link's source. */
  readonly linkedFrom: readonly string[];
  readonly isHtml: boolean;
  readonly error: string | null;
}

/** Tokens are kept beside the page for duplicate detection and never serialised. */
export interface CrawlPageInternal {
  readonly page: CrawledPage;
  readonly tokens: ReadonlySet<string>;
}

export interface RedirectRecord {
  readonly from: string;
  readonly to: string;
  readonly hops: number;
}

export interface CrawlSummary {
  readonly requested: number;
  readonly crawled: number;
  readonly discovered: number;
  readonly maxDepthReached: number;
  readonly stoppedBy: 'urls' | 'depth' | 'time' | 'exhausted';
  readonly elapsedMs: number;
  /** Frontier entries we never reached, so the UI can say so honestly. */
  readonly notReached: number;
  readonly blockedByRobots: number;
  /**
   * Every redirect observed, kept separately from the pages.
   *
   * A redirect is a finding about the LINK, not about the destination, and the
   * destination is usually also reachable directly - so deduplicating pages by
   * final URL would otherwise delete the finding along with the duplicate row.
   */
  readonly redirects: readonly RedirectRecord[];
}

/**
 * Canonical key for a URL.
 *
 * `/about` and `/about/` and `/about?utm_source=x` are one page for crawl
 * purposes; treating them as three is how a bounded crawl burns its budget on
 * the same content and reports duplicate-title issues it invented itself.
 */
export function crawlKey(url: URL): string {
  const clean = new URL(url.toString());
  clean.hash = '';
  for (const param of [...clean.searchParams.keys()]) {
    if (/^(utm_|fbclid|gclid|mc_|ref$|source$)/i.test(param)) clean.searchParams.delete(param);
  }
  clean.searchParams.sort();
  let path = clean.pathname.replace(/\/{2,}/g, '/');
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  clean.pathname = path === '' ? '/' : path;
  return `${clean.protocol}//${clean.host}${clean.pathname}${clean.search}`;
}

function sameSite(candidate: URL, root: URL): boolean {
  const a = candidate.hostname.replace(/^www\./i, '').toLowerCase();
  const b = root.hostname.replace(/^www\./i, '').toLowerCase();
  return a === b;
}

/** Internal page URLs found in the markup, already normalised and de-duplicated. */
export function extractCrawlableLinks(html: string, pageUrl: string, root: URL): string[] {
  const out = new Set<string>();
  const anchors = html.match(/<a\b[^>]*>/gi) ?? [];
  for (const tag of anchors) {
    const match = tag.match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/i);
    const href = (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim();
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript|data|sms|whatsapp):/i.test(href)) continue;
    let resolved: URL;
    try {
      resolved = new URL(href.replace(/&amp;/g, '&'), pageUrl);
    } catch {
      continue;
    }
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') continue;
    if (!sameSite(resolved, root)) continue;
    if (ASSET_EXTENSION.test(resolved.pathname)) continue;
    out.add(crawlKey(resolved));
  }
  return [...out];
}

/** Word tokens for near-duplicate comparison. */
function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((word) => word.length > 2),
  );
}

interface FrontierEntry {
  readonly key: string;
  readonly depth: number;
}

/**
 * Crawls from `startUrl`, yielding each page the moment it settles.
 *
 * The generator shape is what makes the UI honest: a page appears on screen
 * because it was just fetched, not because a timer advanced a fake list.
 */
export async function* crawlSite(
  startUrl: string,
  robots: RobotsFile,
  sitemapUrls: readonly string[],
  options: CrawlOptions = {},
): AsyncGenerator<
  { type: 'page'; page: CrawlPageInternal } | { type: 'summary'; summary: CrawlSummary }
> {
  const opts = { ...CRAWL_DEFAULTS, ...options };
  const started = Date.now();
  const root = normalizeUrl(startUrl);
  const rootKey = crawlKey(root);

  const queued = new Map<string, number>([[rootKey, 0]]);
  const frontier: FrontierEntry[] = [{ key: rootKey, depth: 0 }];
  const linkedFrom = new Map<string, Set<string>>();
  const done = new Set<string>();

  const redirects: RedirectRecord[] = [];
  let blockedByRobots = 0;
  let maxDepthReached = 0;
  let stoppedBy: CrawlSummary['stoppedBy'] = 'exhausted';

  // Sitemap URLs join the frontier at depth 1: they are the site's own claim
  // about what exists, which beats guessing from the homepage alone, and it is
  // what makes orphan detection possible at all.
  for (const raw of sitemapUrls) {
    if (queued.size >= opts.maxUrls * 3) break;
    try {
      const url = normalizeUrl(raw);
      if (!sameSite(url, root) || ASSET_EXTENSION.test(url.pathname)) continue;
      const key = crawlKey(url);
      if (queued.has(key)) continue;
      queued.set(key, 1);
      frontier.push({ key, depth: 1 });
    } catch {
      // A malformed <loc> is the sitemap's problem, not the crawl's.
    }
  }

  const outOfTime = (): boolean => Date.now() - started >= opts.budgetMs;

  const takeNext = (): FrontierEntry | null => {
    while (frontier.length > 0) {
      const entry = frontier.shift();
      if (!entry || done.has(entry.key)) continue;
      if (entry.depth > opts.maxDepth) {
        stoppedBy = 'depth';
        continue;
      }
      if (opts.respectRobots && !isAllowed(robots, AUDIT_USER_AGENT, new URL(entry.key).pathname)) {
        blockedByRobots += 1;
        done.add(entry.key);
        continue;
      }
      return entry;
    }
    return null;
  };

  async function fetchOne(entry: FrontierEntry): Promise<CrawlPageInternal> {
    done.add(entry.key);
    maxDepthReached = Math.max(maxDepthReached, entry.depth);
    const sources = [...(linkedFrom.get(entry.key) ?? [])].slice(0, 5);

    let result;
    try {
      result = await probe(entry.key, {
        timeoutMs: PAGE_TIMEOUT_MS,
        maxBytes: PAGE_MAX_BYTES,
        maxRedirects: 3,
        guard: opts.guard,
      });
    } catch (err) {
      return {
        page: {
          url: entry.key,
          status: 0,
          depth: entry.depth,
          ttfbMs: 0,
          bytes: 0,
          redirectHops: 0,
          title: null,
          description: null,
          h1Count: 0,
          h1Text: null,
          wordCount: 0,
          canonical: null,
          noindex: false,
          imagesTotal: 0,
          imagesWithAlt: 0,
          internalLinks: 0,
          externalLinks: 0,
          jsonLdTypes: [],
          linkedFrom: sources,
          isHtml: false,
          error: (err as { code?: string }).code ?? 'unreachable',
        },
        tokens: new Set(),
      };
    }

    const isHtml = /text\/html|application\/xhtml\+xml/i.test(result.headers['content-type'] ?? '');
    if (!isHtml) {
      return {
        page: {
          url: result.url,
          status: result.status,
          depth: entry.depth,
          ttfbMs: Math.round(result.ttfbMs),
          bytes: result.decodedBytes,
          redirectHops: result.redirects.length,
          title: null,
          description: null,
          h1Count: 0,
          h1Text: null,
          wordCount: 0,
          canonical: null,
          noindex: false,
          imagesTotal: 0,
          imagesWithAlt: 0,
          internalLinks: 0,
          externalLinks: 0,
          jsonLdTypes: [],
          linkedFrom: sources,
          isHtml: false,
          error: null,
        },
        tokens: new Set(),
      };
    }

    const signals = extractSignals(result.body, result.url);

    // Only a page that answered 200 is worth following out of; a 404's
    // navigation would flood the frontier with links we already have.
    if (result.status >= 200 && result.status < 300 && entry.depth < opts.maxDepth) {
      for (const link of extractCrawlableLinks(result.body, result.url, root)) {
        if (!linkedFrom.has(link)) linkedFrom.set(link, new Set());
        linkedFrom.get(link)?.add(result.url);
        if (queued.has(link)) continue;
        queued.set(link, entry.depth + 1);
        frontier.push({ key: link, depth: entry.depth + 1 });
      }
    }

    const bodyText = result.body.replace(/<[^>]+>/g, ' ');
    return {
      page: {
        url: result.url,
        status: result.status,
        depth: entry.depth,
        ttfbMs: Math.round(result.ttfbMs),
        bytes: result.decodedBytes,
        redirectHops: result.redirects.length,
        title: signals.title,
        description: signals.description,
        h1Count: signals.headings.counts.h1,
        h1Text: signals.headings.h1Text[0] ?? null,
        wordCount: signals.wordCount,
        canonical: signals.canonical,
        noindex: /noindex/i.test(signals.metaRobots ?? '') || /noindex/i.test(result.headers['x-robots-tag'] ?? ''),
        imagesTotal: signals.images.total,
        imagesWithAlt: signals.images.withAlt,
        internalLinks: signals.links.internal,
        externalLinks: signals.links.external,
        jsonLdTypes: signals.jsonLd.types,
        linkedFrom: sources,
        isHtml: true,
        error: null,
      },
      tokens: tokenize(bodyText),
    };
  }

  // A worker pool over the shared frontier. `inFlight` is keyed so a settled
  // promise can remove itself without scanning the array.
  const inFlight = new Map<string, Promise<{ key: string; result: CrawlPageInternal }>>();
  // Final URLs already emitted. A redirect resolves to a URL that is often
  // also sitting in the frontier on its own merits (/old-page -> /offers, and
  // /offers is in the sitemap), so without this the target is fetched twice
  // and then reported as a duplicate of itself.
  const emitted = new Set<string>();
  let crawled = 0;

  while (true) {
    while (inFlight.size < opts.concurrency && crawled + inFlight.size < opts.maxUrls && !outOfTime()) {
      const entry = takeNext();
      if (!entry) break;
      inFlight.set(
        entry.key,
        fetchOne(entry).then((result) => ({ key: entry.key, result })),
      );
    }

    if (inFlight.size === 0) {
      if (crawled >= opts.maxUrls) stoppedBy = 'urls';
      else if (outOfTime()) stoppedBy = 'time';
      else if (frontier.length === 0) stoppedBy = 'exhausted';
      break;
    }

    const settled = await Promise.race(inFlight.values());
    inFlight.delete(settled.key);

    let finalKey = settled.key;
    try {
      finalKey = crawlKey(new URL(settled.result.page.url));
    } catch {
      // Keep the requested key when the final URL will not parse.
    }
    if (settled.result.page.redirectHops > 0 || finalKey !== settled.key) {
      redirects.push({
        from: settled.key,
        to: settled.result.page.url,
        hops: Math.max(1, settled.result.page.redirectHops),
      });
    }
    done.add(finalKey);
    if (emitted.has(finalKey)) continue;
    emitted.add(finalKey);

    crawled += 1;
    yield { type: 'page', page: settled.result };
  }

  yield {
    type: 'summary',
    summary: {
      requested: opts.maxUrls,
      crawled,
      discovered: queued.size,
      maxDepthReached,
      stoppedBy,
      elapsedMs: Date.now() - started,
      notReached: Math.max(0, queued.size - done.size),
      blockedByRobots,
      redirects,
    },
  };
}

/**
 * robots.txt and the sitemap it declares.
 *
 * A sitemap index is followed one level, two children deep at most: the point
 * is to seed the frontier and to have something to measure orphans against,
 * not to mirror the site's own index.
 */
export async function discoverSeeds(
  origin: string,
  guard?: (hostname: string) => Promise<unknown>,
): Promise<{ robotsText: string | null; sitemapUrls: string[]; sitemapFound: boolean }> {
  const robotsProbe = await tryProbe(`${origin}/robots.txt`, {
    timeoutMs: 5_000,
    maxBytes: 300_000,
    accept: 'text/plain,*/*;q=0.5',
    guard,
  });
  const robotsOk =
    robotsProbe !== null &&
    robotsProbe.status >= 200 &&
    robotsProbe.status < 300 &&
    !/text\/html/i.test(robotsProbe.headers['content-type'] ?? '');
  const robotsText = robotsOk ? robotsProbe.body : null;

  const declared = robotsText
    ? [...robotsText.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1])
    : [];
  const roots = declared.length > 0 ? declared.slice(0, 2) : [`${origin}/sitemap.xml`];

  const urls: string[] = [];
  let sitemapFound = false;
  const seen = new Set<string>();

  const readOne = async (target: string, depth: number): Promise<void> => {
    if (depth > 1 || urls.length >= SITEMAP_URL_CAP || seen.has(target)) return;
    seen.add(target);
    const res = await tryProbe(target, {
      timeoutMs: 5_000,
      maxBytes: 800_000,
      accept: 'application/xml,text/xml,*/*;q=0.5',
      guard,
    });
    if (!res || res.status < 200 || res.status >= 300) return;
    if (/text\/html/i.test(res.headers['content-type'] ?? '')) return;
    if (!/<(urlset|sitemapindex)[\s>]/i.test(res.body)) return;
    sitemapFound = true;

    const locs = [...res.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
    if (/<sitemapindex[\s>]/i.test(res.body)) {
      for (const child of locs.slice(0, 2)) await readOne(child, depth + 1);
      return;
    }
    for (const loc of locs) {
      if (urls.length >= SITEMAP_URL_CAP) break;
      urls.push(loc);
    }
  };

  for (const root of roots) await readOne(root, 0);
  return { robotsText, sitemapUrls: urls, sitemapFound };
}
