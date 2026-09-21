import type { Market } from './markets';
import type { AiOverviewPanel, ChatPanel, GooglePanel, OrganicResult, SourceLink } from './types';

/**
 * DataForSEO, narrowed to the two calls the AI-visibility check needs.
 *
 *   serp/google/organic/live/advanced     -> the blue links and the AI Overview
 *   ai_optimization/chat_gpt/llm_responses/live -> what ChatGPT answers
 *
 * Both are live endpoints: one request, one answer, no task polling. They are
 * also billed per call (the ChatGPT one with web search is the expensive half),
 * which is why the route in front of this caches, rate-limits per IP and keeps
 * a daily ceiling.
 *
 * Everything here treats the upstream payload as `unknown` and walks it with
 * the small accessors below. DataForSEO adds and reshuffles SERP element types
 * continuously; a parser that reads optimistically would turn a new element
 * into a 500 on our side. A missing field means a quieter panel instead.
 */

const API_BASE = 'https://api.dataforseo.com/v3';
const SERP_PATH = '/serp/google/organic/live/advanced';
const CHAT_PATH = '/ai_optimization/chat_gpt/llm_responses/live';

const SERP_TIMEOUT_MS = 25_000;
const CHAT_TIMEOUT_MS = 35_000;

/** Organic rows the panel shows. Four keeps the column near the height of the
 *  other two surfaces; a match below it is appended on top of this. */
const ORGANIC_LIMIT = 4;
const AI_BLOCK_LIMIT = 4;
const REFERENCE_LIMIT = 8;

const DEFAULT_CHAT_MODEL = 'gpt-4.1-mini';

export type DataForSeoErrorCode = 'unconfigured' | 'timeout' | 'upstream' | 'no_results';

export class DataForSeoError extends Error {
  constructor(
    readonly code: DataForSeoErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'DataForSeoError';
  }
}

export function hasCredentials(): boolean {
  return Boolean(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD);
}

/* ------------------------------------------------------------------ helpers */

type Json = Record<string, unknown>;

function asRecord(value: unknown): Json | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Json) : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function int(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : null;
}

/** Bare, lowercase host: `https://WWW.Example.gr/rooms?x=1` -> `example.gr`. */
export function normalizeDomain(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return '';
  const withoutScheme = trimmed.replace(/^[a-z][a-z0-9+.-]*:\/\//, '');
  const host = (withoutScheme.split(/[/?#]/)[0] ?? '').replace(/^www\./, '').replace(/\.$/, '');
  if (!host) return '';
  try {
    // The URL parser applies IDN ToASCII, so a visitor typing «ελλάδα.gr» and
    // the punycode host DataForSEO reports normalise to the same string.
    return new URL(`https://${host}`).hostname.replace(/^www\./, '');
  } catch {
    return host;
  }
}

/** A tracked domain matches itself and its subdomains, never a lookalike suffix. */
function matches(candidate: string, tracked: string | null): boolean {
  if (!tracked) return false;
  const host = normalizeDomain(candidate);
  if (!host) return false;
  return host === tracked || host.endsWith(`.${tracked}`);
}

function domainFromUrl(url: string): string {
  try {
    return normalizeDomain(new URL(url).hostname);
  } catch {
    return normalizeDomain(url);
  }
}

/** Cut at the last sentence end (or word) before `max`, so a clipped panel never ends mid-word. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const head = text.slice(0, max);
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('; '), head.lastIndexOf('\n'));
  const cut = sentence > max * 0.6 ? sentence + 1 : head.lastIndexOf(' ');
  return `${head.slice(0, cut > 0 ? cut : max).trimEnd()}…`;
}

/**
 * ChatGPT returns its sources twice: as `annotations`, and inline in the prose
 * as `([domain](url))`. We render the annotations as chips under the answer, so
 * the inline copies are noise - strip them, and flatten any remaining markdown
 * link to its label.
 */
function cleanAnswer(text: string): string {
  return text
    .replace(/\s*\(\[[^\]]*\]\([^)]*\)\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Markdown down to plain text, for AI Overview blocks that only ship `markdown`. */
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function dedupeLinks(links: readonly SourceLink[], limit: number): SourceLink[] {
  const seen = new Set<string>();
  const unique: SourceLink[] = [];
  for (const link of links) {
    const key = link.url || `${link.domain}|${link.title}`;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(link);
  }
  // A cited match is the whole point of the panel, so it leads and the cap
  // trims the rest - never the other way round.
  const matched = unique.filter((l) => l.isMatch);
  const others = unique.filter((l) => !l.isMatch);
  return [...matched, ...others].slice(0, limit);
}

/* --------------------------------------------------------------- transport */

async function post(path: string, payload: unknown, timeoutMs: number): Promise<Json> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new DataForSeoError('unconfigured');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 401 || res.status === 402) {
      await res.body?.cancel().catch(() => undefined);
      throw new DataForSeoError('unconfigured', `dataforseo auth/credit ${res.status}`);
    }
    if (!res.ok) {
      await res.body?.cancel().catch(() => undefined);
      throw new DataForSeoError('upstream', `dataforseo ${path} ${res.status}`);
    }

    const json = asRecord(await res.json());
    if (!json) throw new DataForSeoError('upstream', 'dataforseo returned a non-object');
    // 20000 is DataForSEO's own "ok"; HTTP 200 alone says nothing about the task.
    if (int(json.status_code) !== 20000) {
      throw new DataForSeoError('upstream', `dataforseo status ${str(json.status_message)}`);
    }
    return json;
  } catch (err) {
    if (err instanceof DataForSeoError) throw err;
    if ((err as Error)?.name === 'AbortError') throw new DataForSeoError('timeout');
    throw new DataForSeoError('upstream', (err as Error)?.message);
  } finally {
    clearTimeout(timer);
  }
}

/** The single task's first result, once both the envelope and the task report success. */
function firstResult(payload: Json): Json {
  const task = asRecord(asArray(payload.tasks)[0]);
  if (!task) throw new DataForSeoError('no_results');
  if (int(task.status_code) !== 20000) {
    throw new DataForSeoError('upstream', `dataforseo task ${str(task.status_message)}`);
  }
  const result = asRecord(asArray(task.result)[0]);
  if (!result) throw new DataForSeoError('no_results');
  return result;
}

/* ----------------------------------------------------------------- parsing */

function parseOrganic(items: readonly unknown[], tracked: string | null): GooglePanel {
  const all: OrganicResult[] = [];
  for (const raw of items) {
    const item = asRecord(raw);
    if (!item || str(item.type) !== 'organic') continue;
    const url = str(item.url);
    const domain = normalizeDomain(str(item.domain)) || domainFromUrl(url);
    all.push({
      rank: int(item.rank_group) ?? all.length + 1,
      title: str(item.title),
      url,
      domain,
      breadcrumb: str(item.breadcrumb) || domain,
      snippet: truncate(str(item.description), 220),
      isMatch: matches(domain, tracked),
    });
  }

  const match = all.find((r) => r.isMatch) ?? null;
  const top = all.slice(0, ORGANIC_LIMIT);
  // Ranking 12th is still an answer to "am I there?" - show the row rather
  // than dropping it because it fell outside the visible five.
  const results = match && !top.some((r) => r.url === match.url) ? [...top, match] : top;

  return { results, matched: Boolean(match), matchRank: match?.rank ?? null };
}

function parseAiOverview(items: readonly unknown[], tracked: string | null): AiOverviewPanel {
  const overview = items.map(asRecord).find((item) => item && str(item.type) === 'ai_overview');
  if (!overview) return { present: false, blocks: [], references: [], matched: false };

  const blocks: string[] = [];
  const references: SourceLink[] = [];

  const collectReference = (raw: unknown): void => {
    const ref = asRecord(raw);
    if (!ref) return;
    const url = str(ref.url);
    const domain = normalizeDomain(str(ref.domain)) || domainFromUrl(url);
    if (!domain) return;
    references.push({
      title: str(ref.title) || str(ref.source) || domain,
      domain,
      url,
      isMatch: matches(domain, tracked),
    });
  };

  for (const raw of asArray(overview.references)) collectReference(raw);

  for (const raw of asArray(overview.items)) {
    const element = asRecord(raw);
    if (!element) continue;
    const type = str(element.type);
    if (type === 'ai_overview_reference') {
      collectReference(element);
      continue;
    }
    for (const nested of asArray(element.references)) collectReference(nested);
    const text = str(element.text) || stripMarkdown(str(element.markdown));
    if (text && blocks.length < AI_BLOCK_LIMIT) blocks.push(truncate(text, 420));
  }

  if (blocks.length === 0) {
    const markdown = stripMarkdown(str(overview.markdown));
    if (markdown) blocks.push(truncate(markdown, 420));
  }

  const deduped = dedupeLinks(references, REFERENCE_LIMIT);
  return {
    // An `ai_overview` element with nothing in it (Google was still streaming
    // it when the crawl finished) is not an AI Overview the visitor can be in.
    present: blocks.length > 0 || deduped.length > 0,
    blocks,
    references: deduped,
    matched: deduped.some((r) => r.isMatch),
  };
}

function parseChat(result: Json, tracked: string | null): ChatPanel {
  const paragraphs: string[] = [];
  const citations: SourceLink[] = [];

  for (const rawItem of asArray(result.items)) {
    const item = asRecord(rawItem);
    if (!item) continue;
    // `reasoning` items carry the model's scratchpad, not its answer.
    if (str(item.type) && str(item.type) !== 'message') continue;
    for (const rawSection of asArray(item.sections)) {
      const section = asRecord(rawSection);
      if (!section) continue;
      const text = str(section.text);
      if (text) paragraphs.push(text);
      for (const rawAnnotation of asArray(section.annotations)) {
        const annotation = asRecord(rawAnnotation);
        if (!annotation) continue;
        const url = str(annotation.url);
        if (!url) continue;
        const domain = domainFromUrl(url);
        citations.push({
          title: str(annotation.title) || domain,
          domain,
          url,
          isMatch: matches(domain, tracked),
        });
      }
    }
  }

  const answer = truncate(cleanAnswer(paragraphs.join('\n\n')), 1_100);
  const deduped = dedupeLinks(citations, REFERENCE_LIMIT);
  return {
    available: answer.length > 0,
    model: str(result.model_name) || null,
    answer,
    citations: deduped,
    matched: deduped.some((c) => c.isMatch),
  };
}

/* ------------------------------------------------------------------- calls */

/**
 * `keyword` is URL-encoded on purpose: DataForSEO decodes every `%##` in the
 * field and turns a literal `+` into a space, so an encoded keyword is the only
 * form that round-trips intact.
 */
export async function fetchSerp(
  keyword: string,
  market: Market,
  tracked: string | null,
): Promise<{ google: GooglePanel; aiOverview: AiOverviewPanel }> {
  const payload = await post(
    SERP_PATH,
    [
      {
        keyword: encodeURIComponent(keyword),
        location_code: market.locationCode,
        language_code: market.languageCode,
        device: 'desktop',
        os: 'windows',
        depth: 20,
        // Google streams the overview in after the page loads. Without this the
        // crawl only ever returns one that happened to be cached.
        load_async_ai_overview: true,
      },
    ],
    SERP_TIMEOUT_MS,
  );

  const items = asArray(firstResult(payload).items);
  return { google: parseOrganic(items, tracked), aiOverview: parseAiOverview(items, tracked) };
}

const CHAT_SYSTEM_MESSAGE: Record<string, string> = {
  el: 'Απαντάς σε αναζήτηση που πληκτρολόγησε χρήστης. Απάντησε στα ελληνικά, σε έως 110 λέξεις, ονομάζοντας τις συγκεκριμένες επιχειρήσεις, μάρκες ή ιστοσελίδες που απαντούν καλύτερα. Χρησιμοποίησε αναζήτηση στο web και ανάφερε τις πηγές σου.',
  de: 'Du beantwortest eine Suchanfrage, die ein Nutzer eingegeben hat. Antworte auf Deutsch in höchstens 110 Wörtern und nenne die konkreten Unternehmen, Marken oder Websites, die sie am besten beantworten. Nutze die Websuche und gib deine Quellen an.',
  en: 'You are answering a search query a user typed. Reply in English, in at most 110 words, naming the specific businesses, brands or websites that answer it best. Use web search and cite your sources.',
};

/**
 * The user prompt is the keyword itself - the question is "what does ChatGPT
 * say when someone types this", so anything we wrap around it would be a
 * different question. The system message only fixes the language and length.
 */
export async function fetchChatAnswer(
  keyword: string,
  market: Market,
  tracked: string | null,
): Promise<ChatPanel> {
  const payload = await post(
    CHAT_PATH,
    [
      {
        user_prompt: keyword,
        system_message: CHAT_SYSTEM_MESSAGE[market.languageCode] ?? CHAT_SYSTEM_MESSAGE.en,
        model_name: process.env.DATAFORSEO_CHATGPT_MODEL || DEFAULT_CHAT_MODEL,
        max_output_tokens: 400,
        temperature: 0.3,
        web_search: true,
        web_search_country_iso_code: market.countryIso,
      },
    ],
    CHAT_TIMEOUT_MS,
  );

  return parseChat(firstResult(payload), tracked);
}
