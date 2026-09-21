import { NextResponse } from 'next/server';
import { DataForSeoError, fetchChatAnswer, fetchSerp, hasCredentials, normalizeDomain } from '@/lib/search-preview/dataforseo';
import { DEFAULT_MARKET, getMarket } from '@/lib/search-preview/markets';
import type { SearchPreviewErrorCode, SearchPreviewResult } from '@/lib/search-preview/types';

/**
 * POST /api/search-preview  { keyword, market, domain? }
 *
 * One keyword, three surfaces: the Google result, the AI Overview above it,
 * and what ChatGPT answers - the live version of the story the homepage tells
 * with a fixed example. Backs the tool at /[locale]/ai-visibility-check.
 *
 * Unlike /api/scan, every call here spends money at DataForSEO (the SERP call
 * plus the ChatGPT call with web search run around three cents together), so
 * the guards are stricter than abuse control:
 *
 *   - a 12-hour cache per keyword + market + domain, so re-runs are free;
 *   - six checks per IP per hour;
 *   - a daily ceiling across everyone, after which the tool says so rather
 *     than quietly emptying the account.
 *
 * All three live in module memory. On a serverless platform each instance
 * keeps its own, so the real ceiling is per instance - which is the right
 * trade for a lead magnet, not for a billing control we would bet the account
 * on. `SEARCH_PREVIEW_DAILY_LIMIT` tunes the last one.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_KEYWORD_LENGTH = 80;
const MAX_KEYWORD_WORDS = 12;

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60 * 60_000;

const CACHE_TTL_MS = 12 * 60 * 60_000;
const CACHE_MAX_ENTRIES = 500;

const DEFAULT_DAILY_LIMIT = 120;

const buckets = new Map<string, { count: number; reset: number }>();
const cache = new Map<string, { result: SearchPreviewResult; expires: number }>();
let spend = { day: '', count: 0 };

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    if (buckets.size > 5_000) {
      for (const [key, value] of buckets) if (value.reset < now) buckets.delete(key);
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

function dailyLimit(): number {
  const configured = Number(process.env.SEARCH_PREVIEW_DAILY_LIMIT);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_DAILY_LIMIT;
}

/** Counts live checks only; cache hits and rejected requests cost nothing. */
function budgetExhausted(): boolean {
  const day = new Date().toISOString().slice(0, 10);
  if (spend.day !== day) spend = { day, count: 0 };
  return spend.count >= dailyLimit();
}

function readCache(key: string): SearchPreviewResult | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return hit.result;
}

function writeCache(key: string, result: SearchPreviewResult): void {
  if (cache.size >= CACHE_MAX_ENTRIES) {
    const now = Date.now();
    for (const [k, v] of cache) if (v.expires < now) cache.delete(k);
    // Still full: drop the oldest insertion, which Map iteration hands us first.
    if (cache.size >= CACHE_MAX_ENTRIES) {
      const oldest = cache.keys().next();
      if (!oldest.done) cache.delete(oldest.value);
    }
  }
  cache.set(key, { result, expires: Date.now() + CACHE_TTL_MS });
}

function fail(error: SearchPreviewErrorCode, status: number): NextResponse {
  return NextResponse.json({ error }, { status, headers: { 'cache-control': 'no-store' } });
}

export async function POST(req: Request): Promise<NextResponse> {
  let body: { keyword?: unknown; market?: unknown; domain?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return fail('invalid_keyword', 400);
  }

  // Control characters would reach DataForSEO's keyword field and the LLM
  // prompt; a keyword never contains them.
  const keyword = typeof body.keyword === 'string' ? body.keyword.replace(/[\u0000-\u001f]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (keyword.length < 2) return fail('invalid_keyword', 400);
  // A search query is a handful of words. The length cap is also what stops
  // the ChatGPT call being used as a free LLM with our account attached.
  if (keyword.length > MAX_KEYWORD_LENGTH || keyword.split(' ').length > MAX_KEYWORD_WORDS) {
    return fail('keyword_too_long', 400);
  }

  const market = getMarket(typeof body.market === 'string' ? body.market : DEFAULT_MARKET);
  if (!market) return fail('invalid_market', 400);

  const rawDomain = typeof body.domain === 'string' ? body.domain : '';
  const domain = rawDomain.trim() ? normalizeDomain(rawDomain) : null;
  if (domain !== null && !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain)) return fail('invalid_domain', 400);

  if (!hasCredentials()) return fail('unconfigured', 503);

  const cacheKey = `${market.id}|${keyword.toLowerCase()}|${domain ?? ''}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { 'cache-control': 'no-store' } });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) return fail('rate_limited', 429);
  if (budgetExhausted()) return fail('daily_limit', 429);
  spend.count += 1;

  // The SERP call is the backbone; the chat answer is one of three panels, so
  // a failure there degrades that panel instead of the whole check.
  const [serp, chat] = await Promise.allSettled([
    fetchSerp(keyword, market, domain),
    fetchChatAnswer(keyword, market, domain),
  ]);

  if (serp.status === 'rejected') {
    const code: SearchPreviewErrorCode =
      serp.reason instanceof DataForSeoError ? serp.reason.code : 'generic';
    console.error('[search-preview] serp failed', code, (serp.reason as Error)?.message);
    return fail(code, code === 'timeout' ? 504 : code === 'unconfigured' ? 503 : 502);
  }

  if (chat.status === 'rejected') {
    console.error('[search-preview] chat failed', (chat.reason as Error)?.message);
  }

  const result: SearchPreviewResult = {
    keyword,
    market: market.id,
    domain,
    fetchedAt: new Date().toISOString(),
    sample: false,
    google: serp.value.google,
    aiOverview: serp.value.aiOverview,
    chat:
      chat.status === 'fulfilled'
        ? chat.value
        : { available: false, model: null, answer: '', citations: [], matched: false },
  };

  writeCache(cacheKey, result);
  return NextResponse.json(result, { headers: { 'cache-control': 'no-store' } });
}
