/**
 * HTML -> measured signals.
 *
 * Pure string work, no network and no DOM, so every signal can be exercised in
 * isolation and the route stays a thin orchestrator. Nothing here judges the
 * page: these are counts and values only. The verdicts live in `checks.ts`,
 * which keeps "what we measured" separable from "what we think of it" - the
 * thing that matters when a visitor asks why their score moved.
 *
 * The parsing is deliberately regex-based rather than a full parser: the input
 * is a stranger's homepage, it is capped at 1.5 MB, and the route runs on a
 * request budget. Every extraction degrades to "absent" on malformed markup
 * rather than throwing.
 */

export interface HeadingSignals {
  readonly counts: Readonly<Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', number>>;
  readonly h1Text: readonly string[];
  /** Headings phrased as questions - the shape answer engines quote. */
  readonly questionCount: number;
  /** True when a heading level is skipped on the way down (h2 -> h4). */
  readonly skipsLevel: boolean;
}

export interface ImageSignals {
  readonly total: number;
  readonly withAlt: number;
  readonly lazy: number;
  readonly withDimensions: number;
  readonly modernFormats: number;
}

export interface ScriptSignals {
  readonly total: number;
  /** External scripts in <head> with neither async nor defer. */
  readonly renderBlocking: number;
  readonly external: number;
  readonly inlineBytes: number;
  readonly thirdPartyHosts: readonly string[];
}

export interface LinkSignals {
  readonly internal: number;
  readonly external: number;
  readonly nofollow: number;
  readonly uniqueInternal: number;
}

export interface JsonLdSignals {
  readonly types: readonly string[];
  readonly blocks: number;
  readonly invalidBlocks: number;
  readonly hasEntity: boolean;
  readonly hasFaq: boolean;
  readonly hasArticle: boolean;
  readonly hasBreadcrumb: boolean;
  readonly hasSameAs: boolean;
}

export interface Signals {
  readonly title: string | null;
  readonly description: string | null;
  readonly canonical: string | null;
  readonly metaRobots: string | null;
  readonly viewport: string | null;
  readonly charset: string | null;
  readonly lang: string | null;
  readonly ogTitle: boolean;
  readonly ogDescription: boolean;
  readonly ogImage: boolean;
  readonly twitterCard: boolean;
  readonly favicon: boolean;
  readonly hreflangCount: number;
  readonly hasXDefault: boolean;
  readonly headings: HeadingSignals;
  readonly images: ImageSignals;
  readonly scripts: ScriptSignals;
  readonly stylesheets: number;
  readonly inlineStyleBytes: number;
  readonly links: LinkSignals;
  readonly jsonLd: JsonLdSignals;
  readonly wordCount: number;
  readonly iframes: number;
  readonly landmarks: readonly string[];
  readonly preconnects: number;
  /** The rendered-text share of the raw bytes. Thin shells sit near zero. */
  readonly textRatio: number;
}

/** Schema.org types that identify who the site is - the anchor for an entity. */
const ENTITY_TYPES = new Set([
  'organization',
  'localbusiness',
  'corporation',
  'person',
  'website',
  'hotel',
  'lodgingbusiness',
  'restaurant',
  'travelagency',
  'autorental',
  'store',
  'professionalservice',
  'medicalbusiness',
  'legalservice',
  'realestateagent',
]);

const ARTICLE_TYPES = new Set(['article', 'blogposting', 'newsarticle', 'techarticle', 'howto']);

const MODERN_IMAGE = /\.(webp|avif)(\?|#|$)/i;

/** Question openers in both site languages; used to spot answer-shaped headings. */
const QUESTION_OPENERS =
  /^(how|what|why|when|where|which|who|can|do|does|is|are|should|πώς|πως|τι|γιατί|γιατι|πότε|ποτε|πού|που|ποιος|ποια|ποιο|ποιες|ποιοι|μπορώ|μπορει|μπορεί)\b/i;

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Attribute map for one start tag. The tag name itself is skipped. */
function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const body = tag.replace(/^<\s*[a-zA-Z][-a-zA-Z0-9]*/, '');
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    out[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return out;
}

/** Everything before </head>, or the first 200 KB when the tag never arrives. */
function headSlice(html: string): string {
  const end = html.search(/<\/head\s*>/i);
  return end === -1 ? html.slice(0, 200_000) : html.slice(0, end);
}

/** Strips comments, styles and non-JSON-LD scripts so counts are not inflated. */
function stripNoise(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (s) =>
      /application\/ld\+json/i.test(s) ? s : ' ',
    )
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ');
}

function countWords(html: string): number {
  // The <head> is metadata. Counting a <title> as body copy is how a
  // client-rendered shell with nothing in it scores as having content.
  const bodyOnly = html.replace(/<head\b[\s\S]*?<\/head\s*>/i, ' ');
  const text = stripNoise(bodyOnly)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = decodeEntities(text).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  return words.length;
}

function readJsonLd(html: string): JsonLdSignals {
  const types: string[] = [];
  let invalidBlocks = 0;
  let hasSameAs = false;
  const blocks =
    html.match(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) ?? [];

  const walk = (node: unknown, depth: number): void => {
    if (depth > 6 || !node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item, depth + 1);
      return;
    }
    const record = node as Record<string, unknown>;
    const type = record['@type'];
    if (typeof type === 'string') types.push(type);
    else if (Array.isArray(type)) for (const t of type) if (typeof t === 'string') types.push(t);
    if ('sameAs' in record) hasSameAs = true;
    for (const key of ['@graph', 'mainEntity', 'itemListElement', 'about', 'hasPart', 'publisher', 'author']) {
      if (key in record) walk(record[key], depth + 1);
    }
  };

  for (const block of blocks) {
    const inner = block.replace(/^<script\b[^>]*>/i, '').replace(/<\/script\s*>$/i, '');
    try {
      walk(JSON.parse(inner) as unknown, 0);
    } catch {
      invalidBlocks += 1;
    }
  }

  const lower = types.map((t) => t.replace(/^https?:\/\/schema\.org\//i, '').toLowerCase());
  return {
    types: Array.from(new Set(types)).slice(0, 12),
    blocks: blocks.length,
    invalidBlocks,
    hasEntity: lower.some((t) => ENTITY_TYPES.has(t)),
    hasFaq: lower.some((t) => t === 'faqpage' || t === 'qapage'),
    hasArticle: lower.some((t) => ARTICLE_TYPES.has(t)),
    hasBreadcrumb: lower.includes('breadcrumblist'),
    hasSameAs,
  };
}

function readHeadings(html: string): HeadingSignals {
  const counts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
  const h1Text: string[] = [];
  const sequence: number[] = [];
  let questionCount = 0;

  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const level = Number(m[1]) as 1 | 2 | 3 | 4 | 5 | 6;
    counts[`h${level}` as keyof typeof counts] += 1;
    sequence.push(level);
    const text = decodeEntities(m[2].replace(/<[^>]+>/g, ' '));
    if (level === 1 && text) h1Text.push(text.slice(0, 120));
    if (text.includes(';') || text.includes('?') || QUESTION_OPENERS.test(text)) questionCount += 1;
  }

  // Unclosed <h1> tags are common enough that a bare count is the safer floor.
  const bareH1 = (html.match(/<h1\b/gi) ?? []).length;
  if (bareH1 > counts.h1) counts.h1 = bareH1;

  let skipsLevel = false;
  for (let i = 1; i < sequence.length; i += 1) {
    if (sequence[i] - sequence[i - 1] > 1) {
      skipsLevel = true;
      break;
    }
  }

  return { counts, h1Text, questionCount, skipsLevel };
}

function readImages(html: string): ImageSignals {
  const tags = html.match(/<img\b[^>]*>/gi) ?? [];
  let withAlt = 0;
  let lazy = 0;
  let withDimensions = 0;
  let modernFormats = 0;
  for (const tag of tags) {
    const a = attrs(tag);
    if ('alt' in a) withAlt += 1;
    if ((a.loading ?? '').toLowerCase() === 'lazy') lazy += 1;
    if (a.width && a.height) withDimensions += 1;
    const src = `${a.src ?? ''} ${a.srcset ?? ''}`;
    if (MODERN_IMAGE.test(src)) modernFormats += 1;
  }
  // <picture> sources carry the modern formats when <img> keeps the fallback.
  modernFormats += (html.match(/<source\b[^>]*type=["']image\/(webp|avif)["'][^>]*>/gi) ?? []).length;
  return { total: tags.length, withAlt, lazy, withDimensions, modernFormats };
}

function readScripts(html: string, head: string, host: string | null): ScriptSignals {
  const all = html.match(/<script\b[^>]*>/gi) ?? [];
  const headScripts = head.match(/<script\b[^>]*>/gi) ?? [];
  let external = 0;
  let renderBlocking = 0;
  const thirdPartyHosts = new Set<string>();

  for (const tag of all) {
    const a = attrs(tag);
    if (!a.src) continue;
    external += 1;
    try {
      const url = new URL(a.src, host ? `https://${host}` : 'https://example.invalid');
      if (host && url.hostname !== host && !url.hostname.endsWith(`.${host}`)) {
        thirdPartyHosts.add(url.hostname);
      }
    } catch {
      // Unparseable src: it still counts as external, just not attributable.
    }
  }

  for (const tag of headScripts) {
    const a = attrs(tag);
    if (!a.src) continue;
    const type = (a.type ?? '').toLowerCase();
    if (type && type !== 'text/javascript' && type !== 'module' && type !== 'application/javascript') continue;
    if ('async' in a || 'defer' in a || type === 'module') continue;
    renderBlocking += 1;
  }

  let inlineBytes = 0;
  const inline = html.match(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  for (const block of inline) {
    if (/application\/ld\+json/i.test(block)) continue;
    inlineBytes += block.length;
  }

  return {
    total: all.length,
    renderBlocking,
    external,
    inlineBytes,
    thirdPartyHosts: Array.from(thirdPartyHosts).slice(0, 8),
  };
}

function readLinks(html: string, host: string | null): LinkSignals {
  const tags = html.match(/<a\b[^>]*>/gi) ?? [];
  let internal = 0;
  let external = 0;
  let nofollow = 0;
  const uniqueInternal = new Set<string>();

  for (const tag of tags) {
    const a = attrs(tag);
    const href = a.href;
    if (!href || href.startsWith('#') || /^(mailto|tel|javascript|data):/i.test(href)) continue;
    if ((a.rel ?? '').toLowerCase().includes('nofollow')) nofollow += 1;
    try {
      const url = new URL(href, host ? `https://${host}/` : 'https://example.invalid/');
      if (host && (url.hostname === host || url.hostname.endsWith(`.${host}`))) {
        internal += 1;
        uniqueInternal.add(url.pathname);
      } else if (!host) {
        internal += 1;
        uniqueInternal.add(url.pathname);
      } else {
        external += 1;
      }
    } catch {
      // Malformed href: not countable either way.
    }
  }

  return { internal, external, nofollow, uniqueInternal: uniqueInternal.size };
}

export function extractSignals(rawHtml: string, pageUrl: string): Signals {
  const html = stripNoise(rawHtml);
  // Script analysis reads the document before `stripNoise` removes the very
  // tags it is counting; comments still go, so a commented-out <script> is
  // not billed as render-blocking.
  const withScripts = rawHtml.replace(/<!--[\s\S]*?-->/g, '');
  const head = headSlice(withScripts);
  let host: string | null = null;
  try {
    host = new URL(pageUrl).hostname;
  } catch {
    host = null;
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]) || null : null;

  let description: string | null = null;
  let metaRobots: string | null = null;
  let viewport: string | null = null;
  let charset: string | null = null;
  let ogTitle = false;
  let ogDescription = false;
  let ogImage = false;
  let twitterCard = false;

  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    if (a.charset) charset = a.charset;
    const name = (a.name ?? '').toLowerCase();
    const property = (a.property ?? '').toLowerCase();
    const httpEquiv = (a['http-equiv'] ?? '').toLowerCase();
    if (httpEquiv === 'content-type' && a.content) {
      const found = a.content.match(/charset=([\w-]+)/i);
      if (found) charset = found[1];
    }
    if (name === 'description' && description === null) description = a.content ?? '';
    if (name === 'robots' && metaRobots === null) metaRobots = a.content ?? '';
    if (name === 'viewport') viewport = a.content ?? '';
    if (property === 'og:title' || name === 'og:title') ogTitle = true;
    if (property === 'og:description' || name === 'og:description') ogDescription = true;
    if (property === 'og:image' || name === 'og:image') ogImage = true;
    if (name === 'twitter:card' || property === 'twitter:card') twitterCard = true;
  }

  let canonical: string | null = null;
  let hreflangCount = 0;
  let hasXDefault = false;
  let favicon = false;
  let stylesheets = 0;
  let preconnects = 0;

  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const a = attrs(tag);
    const rel = (a.rel ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && canonical === null) canonical = a.href ?? '';
    if (rel.includes('alternate') && a.hreflang) {
      hreflangCount += 1;
      if (a.hreflang.toLowerCase() === 'x-default') hasXDefault = true;
    }
    if (rel.includes('icon') || rel.includes('apple-touch-icon') || rel.includes('shortcut')) favicon = true;
    if (rel.includes('stylesheet')) stylesheets += 1;
    if (rel.includes('preconnect') || rel.includes('dns-prefetch')) preconnects += 1;
  }

  const langMatch = html.match(/<html\b[^>]*\blang\s*=\s*["']?([a-zA-Z-]+)/i);

  let inlineStyleBytes = 0;
  for (const block of rawHtml.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) ?? []) {
    inlineStyleBytes += block.length;
  }

  const landmarks = (['main', 'nav', 'header', 'footer', 'article', 'aside'] as const).filter((tag) =>
    new RegExp(`<${tag}\\b`, 'i').test(html),
  );

  const wordCount = countWords(rawHtml);

  return {
    title,
    description: description || null,
    canonical: canonical || null,
    metaRobots,
    viewport: viewport || null,
    charset,
    lang: langMatch ? langMatch[1] : null,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    favicon,
    hreflangCount,
    hasXDefault,
    headings: readHeadings(html),
    images: readImages(html),
    scripts: readScripts(withScripts, head, host),
    stylesheets,
    inlineStyleBytes,
    links: readLinks(html, host),
    jsonLd: readJsonLd(html),
    wordCount,
    iframes: (html.match(/<iframe\b/gi) ?? []).length,
    landmarks,
    preconnects,
    textRatio: rawHtml.length === 0 ? 0 : Math.min(1, (wordCount * 6) / rawHtml.length),
  };
}
