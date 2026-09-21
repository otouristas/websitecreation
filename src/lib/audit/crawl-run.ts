import { ABSENT_ROBOTS, parseRobots, type RobotsFile } from './robots';
import { CRAWL_DEFAULTS, crawlSite, discoverSeeds, type CrawlPageInternal, type CrawlSummary, type CrawledPage } from './crawl';
import { buildSiteReport, type SiteReport } from './site-checks';
import { assertPublicHost, normalizeUrl, ScanError } from '@/lib/scan/ssrf';

/**
 * The full technical crawl, as a stream of events.
 *
 * Same contract as the single-page audit: every event is emitted when the work
 * behind it actually finished. A page row appears because that page was just
 * fetched. The counter moves because a response landed. Nothing is paced.
 *
 * The phases are deliberately visible to the caller - resolve, robots,
 * sitemap, crawl, analyse - because a crawl is long enough that a visitor
 * needs to know it is alive, and naming the phase is more honest than a
 * spinner that means nothing.
 */

export interface CrawlOptions {
  readonly maxUrls?: number;
  readonly guard?: (hostname: string) => Promise<unknown>;
}

export interface CrawlResult {
  readonly url: string;
  readonly startUrl: string;
  readonly scannedAt: string;
  readonly pages: readonly CrawledPage[];
  readonly report: SiteReport;
  readonly robotsPresent: boolean;
  readonly sitemapFound: boolean;
  readonly sitemapUrlCount: number;
  readonly elapsedMs: number;
}

export type CrawlEvent =
  | { readonly type: 'phase'; readonly id: string; readonly state: 'start' | 'done' | 'skip'; readonly detail?: string }
  | { readonly type: 'page'; readonly page: CrawledPage; readonly index: number }
  | { readonly type: 'progress'; readonly crawled: number; readonly queued: number }
  | { readonly type: 'result'; readonly result: CrawlResult }
  | { readonly type: 'error'; readonly code: string };

export const CRAWL_PHASES = ['resolve', 'robots', 'sitemap', 'crawl', 'analyse'] as const;

export async function* runCrawl(
  input: string,
  options: CrawlOptions = {},
): AsyncGenerator<CrawlEvent> {
  const started = Date.now();
  const { guard } = options;
  const maxUrls = Math.min(Math.max(options.maxUrls ?? CRAWL_DEFAULTS.maxUrls, 5), 60);

  // -------------------------------------------------------------- resolve
  yield { type: 'phase', id: 'resolve', state: 'start' };
  let target: URL;
  try {
    target = normalizeUrl(input);
  } catch (err) {
    yield { type: 'error', code: err instanceof ScanError ? err.code : 'invalid_url' };
    return;
  }
  // Gate the start host before a single request leaves, so a refused target
  // fails as an error the caller can render rather than as one crawled "page"
  // carrying an error string that every downstream count then includes.
  try {
    await (guard ?? assertPublicHost)(target.hostname);
  } catch (err) {
    yield { type: 'error', code: err instanceof ScanError ? err.code : 'blocked_host' };
    return;
  }
  const origin = `${target.protocol}//${target.host}`;
  yield { type: 'phase', id: 'resolve', state: 'done', detail: target.hostname };

  // ------------------------------------------------------ robots + sitemap
  yield { type: 'phase', id: 'robots', state: 'start' };
  yield { type: 'phase', id: 'sitemap', state: 'start' };
  let seeds: Awaited<ReturnType<typeof discoverSeeds>>;
  try {
    seeds = await discoverSeeds(origin, guard);
  } catch {
    seeds = { robotsText: null, sitemapUrls: [], sitemapFound: false };
  }
  const robots: RobotsFile = seeds.robotsText ? parseRobots(seeds.robotsText) : ABSENT_ROBOTS;
  yield {
    type: 'phase',
    id: 'robots',
    state: robots.present ? 'done' : 'skip',
    detail: robots.present ? `${robots.groups.length} groups` : 'no robots.txt',
  };
  yield {
    type: 'phase',
    id: 'sitemap',
    state: seeds.sitemapFound ? 'done' : 'skip',
    detail: seeds.sitemapFound ? `${seeds.sitemapUrls.length} URLs` : 'no sitemap found',
  };

  // ----------------------------------------------------------------- crawl
  yield { type: 'phase', id: 'crawl', state: 'start' };
  const collected: CrawlPageInternal[] = [];
  let summary: CrawlSummary | null = null;
  let index = 0;

  for await (const event of crawlSite(target.toString(), robots, seeds.sitemapUrls, { maxUrls, guard })) {
    if (event.type === 'page') {
      collected.push(event.page);
      index += 1;
      yield { type: 'page', page: event.page.page, index };
      yield { type: 'progress', crawled: index, queued: maxUrls };
      continue;
    }
    summary = event.summary;
  }

  const finalSummary: CrawlSummary = summary ?? {
    requested: maxUrls,
    crawled: collected.length,
    discovered: collected.length,
    maxDepthReached: 0,
    stoppedBy: 'exhausted',
    elapsedMs: Date.now() - started,
    notReached: 0,
    blockedByRobots: 0,
    redirects: [],
  };

  // Every page failing is not a crawl with findings, it is an unreachable site.
  if (collected.length === 0 || collected.every((entry) => entry.page.status === 0)) {
    yield { type: 'error', code: 'unreachable' };
    return;
  }

  yield {
    type: 'phase',
    id: 'crawl',
    state: 'done',
    detail: `${finalSummary.crawled} pages · stopped on ${finalSummary.stoppedBy}`,
  };

  // --------------------------------------------------------------- analyse
  yield { type: 'phase', id: 'analyse', state: 'start' };
  const report = buildSiteReport(collected, seeds.sitemapUrls, finalSummary);
  yield {
    type: 'phase',
    id: 'analyse',
    state: 'done',
    detail: `${report.issues.length} site-wide findings`,
  };

  yield {
    type: 'result',
    result: {
      url: input,
      startUrl: target.toString(),
      scannedAt: new Date().toISOString(),
      pages: collected.map((entry) => entry.page),
      report,
      robotsPresent: robots.present,
      sitemapFound: seeds.sitemapFound,
      sitemapUrlCount: seeds.sitemapUrls.length,
      elapsedMs: Date.now() - started,
    },
  };
}
