/**
 * The twelve page checks and the six layers, run against raw HTML.
 *
 * Raw HTML on purpose: no jsdom, no headless browser, no JavaScript executed.
 * That is not a shortcut, it is the test. GPTBot, ClaudeBot, PerplexityBot and
 * OAI-SearchBot fetch and parse; they do not render. Auditing a page with a
 * browser tells you what a browser sees, which is the one reader this is not
 * about. If a check cannot find something in the served bytes, neither can they.
 *
 * Pure functions, no imports, no network: `scripts/audit-ai-search.mjs` does
 * the fetching and this file does the judging, so the same rules run in CI, in
 * a test, or against any site you can curl.
 */

export type Layer = 'SEO' | 'AEO' | 'GEO' | 'AIO' | 'DEO' | 'SXO';
export type Status = 'pass' | 'fail' | 'warn' | 'na';

export interface CheckResult {
  readonly id: string;
  readonly layer: Layer;
  readonly title: string;
  readonly status: Status;
  readonly detail: string;
  /** Advisory checks report but never fail a run. */
  readonly advisory?: boolean;
}

export interface PageInput {
  readonly url: string;
  readonly html: string;
  /** robots.txt body, fetched once per origin. */
  readonly robotsTxt?: string;
  /** Whether /llms.txt returned 200. */
  readonly hasLlmsTxt?: boolean;
  readonly status?: number;
}

/* ---------------------------------------------------------------- helpers */

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
] as const;

/** Question openers, English and Greek, for the fan-out check. */
const QUESTION_OPENERS =
  /^(what|how|why|when|where|who|which|is|are|does|do|can|should|will|τι|πώς|πως|γιατί|γιατι|πότε|ποτε|πού|που|ποιος|ποια|ποιο|πόσο|ποσο|μπορώ|μπορεί|χρειάζεται)\b/i;

/** Openers that make a paragraph unusable on its own. */
const BACKWARD_REFERENCE =
  /^\s*(as (mentioned|noted|discussed|we saw) (above|earlier)|this means|that said|these|those|it (is|was) (also|therefore)|however, (this|it)|όπως (αναφέρθηκε|είδαμε) (παραπάνω|πιο πάνω)|αυτό σημαίνει)/i;

export function stripTags(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tagText(html: string, tag: string): string[] {
  const out: string[] = [];
  const rx = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  let m: RegExpExecArray | null;
  while ((m = rx.exec(html)) !== null) out.push(stripTags(m[1]));
  return out;
}

export function metaContent(html: string, nameOrProp: string): string | null {
  const rx = new RegExp(
    `<meta[^>]+(?:name|property)=["']${nameOrProp}["'][^>]*content=["']([^"']*)["']`,
    'i',
  );
  const alt = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProp}["']`,
    'i',
  );
  return html.match(rx)?.[1] ?? html.match(alt)?.[1] ?? null;
}

/** Every JSON-LD block on the page, flattened through `@graph`. */
export function jsonLdNodes(html: string): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  const rx = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = rx.exec(html)) !== null) {
    try {
      const parsed: unknown = JSON.parse(m[1].trim());
      const queue: unknown[] = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (queue.length) {
        const node = queue.shift();
        if (!node || typeof node !== 'object') continue;
        const rec = node as Record<string, unknown>;
        if (Array.isArray(rec['@graph'])) queue.push(...(rec['@graph'] as unknown[]));
        else nodes.push(rec);
      }
    } catch {
      nodes.push({ __parseError: true });
    }
  }
  return nodes;
}

function types(node: Record<string, unknown>): string[] {
  const t = node['@type'];
  return Array.isArray(t) ? (t as string[]) : typeof t === 'string' ? [t] : [];
}

function findNode(nodes: Record<string, unknown>[], type: string) {
  return nodes.find((n) => types(n).includes(type));
}

function ok(id: string, layer: Layer, title: string, detail: string): CheckResult {
  return { id, layer, title, status: 'pass', detail };
}
function bad(id: string, layer: Layer, title: string, detail: string): CheckResult {
  return { id, layer, title, status: 'fail', detail };
}
function warn(id: string, layer: Layer, title: string, detail: string, advisory = false): CheckResult {
  return { id, layer, title, status: 'warn', detail, advisory };
}

/* ------------------------------------------------------------ the twelve */

/** 01 - one page, one intent: title, single H1, readable URL. */
export function checkTitleH1Url({ html, url }: PageInput): CheckResult {
  const id = 'title-h1-url';
  const title = tagText(html, 'title')[0] ?? '';
  const h1s = tagText(html, 'h1').filter(Boolean);
  const slug = new URL(url).pathname.split('/').filter(Boolean).pop() ?? '';

  if (!title) return bad(id, 'SEO', 'One page, one intent', 'no <title>');
  if (h1s.length === 0) return bad(id, 'SEO', 'One page, one intent', 'no <h1>');
  if (h1s.length > 1) {
    return bad(id, 'SEO', 'One page, one intent', `${h1s.length} <h1> elements: ${h1s.map((h) => h.slice(0, 24)).join(' | ')}`);
  }
  if (title.length > 70) {
    return warn(id, 'SEO', 'One page, one intent', `title is ${title.length} chars, truncates in most SERPs`);
  }
  if (slug.length > 60 || /\d{6,}|%[0-9a-f]{2}/i.test(slug)) {
    return warn(id, 'SEO', 'One page, one intent', `slug is not readable: ${slug.slice(0, 40)}`);
  }
  return ok(id, 'SEO', 'One page, one intent', `title ${title.length} chars, 1 h1, slug "${slug}"`);
}

/** 02a - the AI crawlers are allowed in robots.txt. */
export function checkCrawlerAccess({ robotsTxt }: PageInput): CheckResult {
  const id = 'crawler-access';
  if (!robotsTxt) return warn(id, 'GEO', 'Let the AI crawlers in', 'robots.txt not fetched');

  const groups = parseRobots(robotsTxt);
  const blocked = AI_CRAWLERS.filter((bot) => !robotsAllows(groups, bot, '/'));
  return blocked.length
    ? bad(id, 'GEO', 'Let the AI crawlers in', `blocked or unlisted with a blocking default: ${blocked.join(', ')}`)
    : ok(id, 'GEO', 'Let the AI crawlers in', `${AI_CRAWLERS.length} AI crawlers allowed`);
}

/** 02b - the content is in the bytes, not drawn later by JavaScript. */
export function checkServerRendered({ html }: PageInput): CheckResult {
  const id = 'server-rendered';
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const text = stripTags(body);
  const words = text.split(/\s+/).filter(Boolean).length;

  if (words < 120) {
    return bad(id, 'AIO', 'Rendered on the server', `only ${words} words in the served HTML; most AI crawlers run no JavaScript`);
  }
  if (words < 300) {
    return warn(id, 'AIO', 'Rendered on the server', `${words} words in the served HTML, thin for a content page`);
  }
  return ok(id, 'AIO', 'Rendered on the server', `${words} words in the served HTML`);
}

/** 03 - the answer is above the fold and liftable. */
export function checkAnswerFirst({ html }: PageInput): CheckResult {
  const id = 'answer-first';
  const declared = /data-ai=["']takeaways["']/i.test(html);
  const afterH1 = html.split(/<\/h1>/i)[1] ?? '';
  const beforeH2 = afterH1.split(/<h2\b/i)[0] ?? '';
  const lead = stripTags(beforeH2);

  if (declared) return ok(id, 'AEO', 'Answer first, above the fold', 'takeaways block declared');
  if (lead.length >= 240) {
    return ok(id, 'AEO', 'Answer first, above the fold', `${lead.length} chars of answer before the first H2`);
  }
  return bad(id, 'AEO', 'Answer first, above the fold', `only ${lead.length} chars between the H1 and the first H2`);
}

/** 04 - one prompt fans out; each sub-query gets its own H2. */
export function checkFanOut({ html }: PageInput): CheckResult {
  const id = 'fan-out';
  const h2s = tagText(html, 'h2').filter(Boolean);
  const questions = h2s.filter((h) => h.includes('?') || QUESTION_OPENERS.test(h.trim()));

  if (h2s.length < 3) return bad(id, 'AEO', 'One prompt, many queries', `${h2s.length} H2s; a fan-out needs several`);
  if (questions.length === 0) {
    return warn(id, 'AEO', 'One prompt, many queries', `${h2s.length} H2s, none phrased as a question`);
  }
  return ok(id, 'AEO', 'One prompt, many queries', `${questions.length}/${h2s.length} H2s phrased as questions`);
}

/** 05 - figures in tables, sequences in lists. */
export function checkStructuredFormats({ html }: PageInput): CheckResult {
  const id = 'structured-formats';
  const tables = (html.match(/<table\b/gi) ?? []).length;
  const headed = (html.match(/<th\b/gi) ?? []).length;
  const lists = (html.match(/<(ul|ol)\b/gi) ?? []).length;
  const items = (html.match(/<li\b/gi) ?? []).length;

  if (tables === 0 && items < 3) {
    return bad(id, 'AEO', 'Tables and lists, not prose', 'no table and fewer than three list items');
  }
  if (tables > 0 && headed === 0) {
    return warn(id, 'AEO', 'Tables and lists, not prose', `${tables} table(s) with no <th>; headerless tables do not parse`);
  }
  return ok(id, 'AEO', 'Tables and lists, not prose', `${tables} table(s), ${lists} list(s), ${items} items`);
}

/** 06 - every passage survives being pulled out alone. */
export function checkExtractablePassages({ html }: PageInput): CheckResult {
  const id = 'extractable-passages';
  const paragraphs = tagText(html, 'p').filter((p) => p.length > 80);
  const dangling = paragraphs.filter((p) => BACKWARD_REFERENCE.test(p));

  if (paragraphs.length === 0) return warn(id, 'GEO', 'Chunks that stand alone', 'no substantial paragraphs found');
  if (dangling.length > 0) {
    return warn(
      id,
      'GEO',
      'Chunks that stand alone',
      `${dangling.length}/${paragraphs.length} paragraphs open with a backward reference: "${dangling[0].slice(0, 56)}..."`,
    );
  }
  return ok(id, 'GEO', 'Chunks that stand alone', `${paragraphs.length} paragraphs, none opening backwards`);
}

/** 07 - a number worth quoting, with its provenance attached. */
export function checkOriginalData(input: PageInput): CheckResult {
  const id = 'original-data';
  const nodes = jsonLdNodes(input.html);
  const dataset = findNode(nodes, 'Dataset');
  if (dataset) {
    return ok(id, 'GEO', 'A number worth quoting', `Dataset: ${String(dataset.name ?? '').slice(0, 48)}`);
  }
  const text = stripTags(input.html);
  const figures = text.match(/\b\d+(?:[.,]\d+)?\s?(?:%|x\b|percent)/gi) ?? [];
  const attributed = /\b(sample of|based on|measured|methodology|method:|n\s?=\s?\d|source:|according to our)/i.test(text);

  if (figures.length === 0) return bad(id, 'GEO', 'A number worth quoting', 'no figure on the page a model could cite');
  if (!attributed) {
    return warn(id, 'GEO', 'A number worth quoting', `${figures.length} figure(s) with no visible method or source`);
  }
  return ok(id, 'GEO', 'A number worth quoting', `${figures.length} attributed figure(s)`);
}

/** 08 - advisory: only a human can tell whether this is worth citing. */
export function checkNonCommodity({ html }: PageInput): CheckResult {
  const id = 'non-commodity';
  const text = stripTags(html);
  const words = text.split(/\s+/).length;
  const firstHand = /\b(we (audited|measured|tested|ran|found|rebuilt|shipped)|our (audit|data|research|clients)|in our)\b/i.test(text);
  return firstHand
    ? warn(id, 'GEO', 'Something only you can say', `first-hand evidence present (${words} words); a human still has to judge it`, true)
    : warn(id, 'GEO', 'Something only you can say', 'no first-hand evidence markers; a model can generate this page without you', true);
}

/** 09 - the FAQ exists, and the schema matches what is on the page. */
export function checkFaq({ html }: PageInput): CheckResult {
  const id = 'faq';
  const nodes = jsonLdNodes(html);
  const faq = findNode(nodes, 'FAQPage');
  const text = stripTags(html).toLowerCase();

  if (!faq) {
    const questionish = tagText(html, 'h2').concat(tagText(html, 'h3')).filter((h) => h.includes('?'));
    if (questionish.length) {
      return warn(id, 'AEO', 'Question in, answer out', `${questionish.length} question headings but no FAQPage schema`);
    }
    // An editorial page that answers no question is a miss. On a template page
    // it is a decision: FAQPage duplicated across a programmatic set asserts a
    // rich result the site cannot earn, and Google has been demoting it since
    // 2023. So warn there, fail only where the page is an article.
    const isEditorial = nodes.some((n) => types(n).some((t) => ['BlogPosting', 'TechArticle'].includes(t)));
    return isEditorial
      ? bad(id, 'AEO', 'Question in, answer out', 'editorial page with no FAQ section and no FAQPage schema')
      : warn(id, 'AEO', 'Question in, answer out', 'no FAQ section; expected on an answer page, optional on a record');
  }

  const entities = (faq.mainEntity as Record<string, unknown>[] | undefined) ?? [];
  const missing = entities.filter((q) => {
    const answer = (q.acceptedAnswer as Record<string, unknown> | undefined)?.text;
    if (typeof answer !== 'string') return true;
    // A model, and Google's policy, want the answer visible - not only in JSON.
    return !text.includes(stripTags(answer).slice(0, 40).toLowerCase());
  });

  return missing.length
    ? bad(id, 'AEO', 'Question in, answer out', `${missing.length}/${entities.length} FAQ answers are in the schema but not in the HTML`)
    : ok(id, 'AEO', 'Question in, answer out', `${entities.length} questions, all answers visible`);
}

/** 10 - the markup says what the copy says, in a parseable form. */
export function checkSchema({ html }: PageInput): CheckResult {
  const id = 'schema';
  const nodes = jsonLdNodes(html);
  if (nodes.some((n) => n.__parseError)) return bad(id, 'AIO', 'Say it twice, machine-readably', 'a JSON-LD block does not parse');
  if (nodes.length === 0) return bad(id, 'AIO', 'Say it twice, machine-readably', 'no JSON-LD on the page');

  const present = [...new Set(nodes.flatMap(types))];
  const wanted = ['BreadcrumbList'];
  const missing = wanted.filter((t) => !present.includes(t));
  const hasMain = present.some((t) =>
    ['Article', 'BlogPosting', 'TechArticle', 'WebPage', 'Service', 'Product', 'CollectionPage'].includes(t),
  );

  if (!hasMain) return bad(id, 'AIO', 'Say it twice, machine-readably', `no page-level type; found: ${present.join(', ')}`);
  if (missing.length) return warn(id, 'AIO', 'Say it twice, machine-readably', `missing ${missing.join(', ')}; have ${present.join(', ')}`);
  return ok(id, 'AIO', 'Say it twice, machine-readably', present.join(', '));
}

/** 11 - the author is an entity, not a string. */
export function checkAuthorEntity({ html }: PageInput): CheckResult {
  const id = 'author-entity';
  const nodes = jsonLdNodes(html);
  const article = nodes.find((n) => types(n).some((t) => ['Article', 'BlogPosting', 'TechArticle'].includes(t)));
  if (!article) return { id, layer: 'AIO', title: 'A named, resolvable author', status: 'na', detail: 'not an article page' };

  const author = article.author as Record<string, unknown> | undefined;
  if (!author) return bad(id, 'AIO', 'A named, resolvable author', 'article has no author');

  const ref = author['@id'] as string | undefined;
  const resolved = ref ? nodes.find((n) => n['@id'] === ref) : author;
  const name = (resolved?.name ?? author.name) as string | undefined;
  if (!name) return bad(id, 'AIO', 'A named, resolvable author', 'author has no name');

  const hasIdentity = Boolean(resolved && (resolved.url || (resolved.sameAs as unknown[])?.length));
  const visible = stripTags(html).includes(name);

  if (!visible) return bad(id, 'AIO', 'A named, resolvable author', `"${name}" is in the schema but not on the page`);
  if (!hasIdentity) return warn(id, 'AIO', 'A named, resolvable author', `"${name}" has no url or sameAs, so it resolves to nothing`);
  return ok(id, 'AIO', 'A named, resolvable author', `${name} (${types(resolved!).join('/')}) with url/sameAs`);
}

/** 12 - the page shows the date its markup claims. */
export function checkFreshness({ html }: PageInput): CheckResult {
  const id = 'freshness';
  const nodes = jsonLdNodes(html);
  const article = nodes.find((n) => n.dateModified);
  if (!article) return bad(id, 'AIO', 'Prove it is still true', 'no dateModified in the markup');

  const modified = String(article.dateModified).slice(0, 10);
  const text = stripTags(html);
  const [y, m, d] = modified.split('-');

  /*
   * `<time datetime="2026-08-15">` is the signal that settles this, and it is
   * language-independent: a Greek page renders "15 Αυγούστου 2026" as its text,
   * which no English month-name heuristic will ever match. Checking the
   * attribute first is both more correct and the reason <time> exists.
   */
  const timeAttr = new RegExp(`datetime=["']${modified}`, 'i').test(html);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];
  const monthName = months[Number(m) - 1] ?? '';
  const day = String(Number(d));
  const visible =
    timeAttr ||
    text.includes(modified) ||
    (text.includes(y) &&
      new RegExp(`\\b${day}\\b`).test(text) &&
      (monthName ? new RegExp(monthName.slice(0, 3), 'i').test(text) : true));

  const ageDays = Math.round((Date.now() - Date.parse(modified)) / 86_400_000);
  if (!visible) return bad(id, 'AIO', 'Prove it is still true', `dateModified ${modified} is asserted but never shown to a reader`);
  if (ageDays > 540) return warn(id, 'AIO', 'Prove it is still true', `last updated ${modified}, ${ageDays} days ago`);
  return ok(id, 'AIO', 'Prove it is still true', `last updated ${modified}, shown on the page`);
}

/* -------------------------------------------------- the rest of the layers */

/** SEO: the page is indexable, canonical and described. */
export function checkIndexable({ html, url }: PageInput): CheckResult {
  const id = 'indexable';
  const robots = metaContent(html, 'robots') ?? '';
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const description = metaContent(html, 'description');

  if (/noindex/i.test(robots)) return bad(id, 'SEO', 'Indexable and canonical', 'meta robots says noindex');
  if (!canonical) return bad(id, 'SEO', 'Indexable and canonical', 'no canonical link');
  if (!description) return warn(id, 'SEO', 'Indexable and canonical', 'no meta description');
  if (description.length < 80 || description.length > 170) {
    return warn(id, 'SEO', 'Indexable and canonical', `meta description is ${description.length} chars`);
  }
  // Compare paths, not origins: auditing a staging or localhost mirror of a
  // site whose canonicals are absolute production URLs is the normal case. A
  // canonical pointing at a different *path* is the actual defect.
  const canonicalPath = canonical.startsWith('http') ? new URL(canonical).pathname : canonical;
  const here = new URL(url).pathname;
  const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  if (norm(canonicalPath) !== norm(here)) {
    return warn(id, 'SEO', 'Indexable and canonical', `canonical points elsewhere: ${canonicalPath}`);
  }
  return ok(id, 'SEO', 'Indexable and canonical', `canonical ${canonicalPath}, description ${description.length} chars`);
}

/** SEO/SXO: headings descend one level at a time. */
export function checkHeadingOrder({ html }: PageInput): CheckResult {
  const id = 'heading-order';
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  const jumps: string[] = [];
  let prev = levels[0] ?? 1;
  for (const l of levels.slice(1)) {
    if (l > prev + 1) jumps.push(`h${prev} to h${l}`);
    prev = l;
  }
  return jumps.length
    ? warn(id, 'SXO', 'Headings descend in order', `${jumps.length} jump(s): ${jumps.slice(0, 3).join(', ')}`)
    : ok(id, 'SXO', 'Headings descend in order', `${levels.length} headings, no jumps`);
}

/** GEO: the site publishes a corpus for models that ask for one. */
export function checkLlmsTxt({ hasLlmsTxt }: PageInput): CheckResult {
  const id = 'llms-txt';
  if (hasLlmsTxt === undefined) return { id, layer: 'GEO', title: 'llms.txt published', status: 'na', detail: 'not checked' };
  return hasLlmsTxt
    ? ok(id, 'GEO', 'llms.txt published', '/llms.txt returns 200')
    : warn(id, 'GEO', 'llms.txt published', 'no /llms.txt; models have no curated index of the site');
}

/** DEO: an assistant needs facts to compare on before it can recommend you. */
export function checkDecisionData({ html }: PageInput): CheckResult {
  const id = 'decision-data';
  const nodes = jsonLdNodes(html);
  const offerish = nodes.filter((n) => types(n).some((t) => ['Offer', 'AggregateOffer', 'Product', 'Service'].includes(t)));
  const text = stripTags(html);
  const price = /(?:€|EUR|\$|£)\s?\d|\d+\s?(?:€|EUR)/.test(text);
  const terms = /(terms|policy|privacy|refund|cancellation|όροι|πολιτική)/i.test(html);

  if (offerish.length) return ok(id, 'DEO', 'Facts an assistant can compare', `${offerish.length} Offer/Service node(s) in the markup`);
  if (price && terms) return warn(id, 'DEO', 'Facts an assistant can compare', 'prices and terms are visible but not marked up as Offer/Service');
  if (price) return warn(id, 'DEO', 'Facts an assistant can compare', 'prices visible, no terms link and no Offer markup');
  return { id, layer: 'DEO', title: 'Facts an assistant can compare', status: 'na', detail: 'no commercial intent on this page' };
}

/** SXO: images carry alt text, and the page is reachable from itself. */
export function checkExperience({ html }: PageInput): CheckResult {
  const id = 'experience';
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\balt=/.test(t));
  const internalLinks = (html.match(/<a\b[^>]+href=["']\/[^"']*["']/gi) ?? []).length;
  const viewport = metaContent(html, 'viewport');

  if (!viewport) return bad(id, 'SXO', 'Usable when it arrives', 'no viewport meta');
  if (noAlt.length) return warn(id, 'SXO', 'Usable when it arrives', `${noAlt.length}/${imgs.length} images without alt`);
  if (internalLinks < 3) return warn(id, 'SXO', 'Usable when it arrives', `${internalLinks} internal links; the page is a dead end`);
  return ok(id, 'SXO', 'Usable when it arrives', `${imgs.length} images with alt, ${internalLinks} internal links`);
}

/* ------------------------------------------------------------ robots.txt */

interface RobotsGroup {
  readonly agents: string[];
  readonly allow: string[];
  readonly disallow: string[];
}

/** Minimal robots.txt parser: enough to answer "may this bot fetch this path". */
export function parseRobots(txt: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: { agents: string[]; allow: string[]; disallow: string[] } | null = null;
  let lastWasAgent = false;

  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const [field, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    const key = field.trim().toLowerCase();

    if (key === 'user-agent') {
      if (!current || !lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if (current) {
      if (key === 'allow') current.allow.push(value);
      if (key === 'disallow') current.disallow.push(value);
      lastWasAgent = false;
    }
  }
  return groups;
}

/**
 * Longest-match wins, allow wins ties - the rule Google and the RFC use. A
 * named group replaces `*` entirely for that agent, which is the trap this
 * exists to catch: a `User-agent: GPTBot` group with no rules inherits nothing.
 */
export function robotsAllows(groups: RobotsGroup[], agent: string, path: string): boolean {
  const lower = agent.toLowerCase();
  const named = groups.find((g) => g.agents.includes(lower));
  const group = named ?? groups.find((g) => g.agents.includes('*'));
  if (!group) return true;

  const match = (patterns: string[]) =>
    patterns
      .filter((p) => p !== '' && pathMatches(p, path))
      .reduce((longest, p) => (p.length > longest ? p.length : longest), -1);

  const allow = match(group.allow);
  const disallow = match(group.disallow);
  if (disallow === -1) return true;
  return allow >= disallow;
}

function pathMatches(pattern: string, path: string): boolean {
  const rx = new RegExp(
    '^' +
      pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\$$/, '$'),
  );
  return rx.test(path);
}

/* ----------------------------------------------------------------- runner */

export const PAGE_CHECKS = [
  checkTitleH1Url,
  checkIndexable,
  checkCrawlerAccess,
  checkServerRendered,
  checkAnswerFirst,
  checkFanOut,
  checkStructuredFormats,
  checkExtractablePassages,
  checkOriginalData,
  checkNonCommodity,
  checkFaq,
  checkSchema,
  checkAuthorEntity,
  checkFreshness,
  checkLlmsTxt,
  checkDecisionData,
  checkHeadingOrder,
  checkExperience,
] as const;

export interface PageReport {
  readonly url: string;
  readonly results: CheckResult[];
  /** 0-100 over the non-advisory, non-na checks. */
  readonly score: number;
  readonly byLayer: Record<Layer, { pass: number; total: number }>;
}

export function auditPage(input: PageInput): PageReport {
  const results = PAGE_CHECKS.map((check) => check(input));
  const scored = results.filter((r) => !r.advisory && r.status !== 'na');
  const points = scored.reduce((sum, r) => sum + (r.status === 'pass' ? 1 : r.status === 'warn' ? 0.5 : 0), 0);

  const byLayer = {} as Record<Layer, { pass: number; total: number }>;
  for (const r of scored) {
    byLayer[r.layer] ??= { pass: 0, total: 0 };
    byLayer[r.layer].total += 1;
    if (r.status === 'pass') byLayer[r.layer].pass += 1;
  }

  return {
    url: input.url,
    results,
    score: scored.length ? Math.round((points / scored.length) * 100) : 0,
    byLayer,
  };
}
