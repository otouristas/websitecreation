import { NextResponse } from 'next/server';
import { extractMeta, runChecks } from '@/lib/scan/checks';
import { scoreChecks, type ScanResult } from '@/lib/scan/score';
import { assertPublicHost, normalizeUrl, ScanError } from '@/lib/scan/ssrf';

/**
 * POST /api/scan  { url: string }
 *
 * Fetches the visitor's homepage server-side (public hosts only, 6 s budget,
 * three redirects, 1 MB of HTML) and returns thirteen weighted checks with a
 * 0-100 score. This is the lead magnet behind the hero input: the visitor
 * gets a real, instant read of their site, and hands us their domain.
 *
 * Rate limiting is per IP in module memory. On Vercel each instance keeps its
 * own map, so the ceiling is per instance, not global - adequate for abuse
 * from a browser, not a hard quota.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOTAL_BUDGET_MS = 6_000;
const MAX_REDIRECTS = 3;
const MAX_BYTES = 1_000_000;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; AnotherSEOGuru-Scan/1.0; +https://anotherseoguru.com/en/services/seo-audits)';

const buckets = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    if (buckets.size > 5_000) {
      for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    }
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

async function readCapped(res: Response, cap: number): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder('utf-8', { fatal: false });
  let out = '';
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    out += decoder.decode(value, { stream: true });
    if (received >= cap) {
      await reader.cancel().catch(() => undefined);
      break;
    }
  }
  return out;
}

export async function POST(req: Request): Promise<NextResponse> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: { url?: unknown };
  try {
    body = (await req.json()) as { url?: unknown };
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }
  if (typeof body.url !== 'string') {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), TOTAL_BUDGET_MS);

  try {
    let current = normalizeUrl(body.url);
    const started = performance.now();
    let response: Response | null = null;
    let ttfbMs = 0;

    for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
      await assertPublicHost(current.hostname);
      const hopStart = performance.now();
      let res: Response;
      try {
        res = await fetch(current, {
          method: 'GET',
          redirect: 'manual',
          signal: controller.signal,
          headers: {
            'user-agent': USER_AGENT,
            accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
            'accept-language': 'el,en;q=0.8',
          },
          cache: 'no-store',
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') throw new ScanError('timeout', 504);
        throw new ScanError('unreachable', 502);
      }
      ttfbMs = performance.now() - hopStart;

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        await res.body?.cancel().catch(() => undefined);
        if (!location) throw new ScanError('unreachable', 502);
        if (hop === MAX_REDIRECTS) throw new ScanError('too_many_redirects', 502);
        current = normalizeUrl(new URL(location, current).toString());
        continue;
      }
      response = res;
      break;
    }

    if (!response) throw new ScanError('too_many_redirects', 502);

    const contentType = response.headers.get('content-type') ?? '';
    if (!/text\/html|application\/xhtml\+xml/i.test(contentType)) {
      await response.body?.cancel().catch(() => undefined);
      throw new ScanError('not_html', 415);
    }

    let html: string;
    try {
      html = await readCapped(response, MAX_BYTES);
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw new ScanError('timeout', 504);
      throw new ScanError('unreachable', 502);
    }

    const meta = extractMeta(html);
    const checks = runChecks(meta, {
      https: current.protocol === 'https:',
      status: response.status,
      ttfbMs,
    });
    const { score, passed, total, topIssues } = scoreChecks(checks);

    const result: ScanResult = {
      url: body.url,
      finalUrl: current.toString(),
      status: response.status,
      ttfbMs: Math.round(ttfbMs),
      score,
      passed,
      total,
      checks,
      topIssues,
      meta: {
        title: meta.title,
        description: meta.description,
        h1Count: meta.h1Count,
        jsonLdTypes: meta.jsonLdTypes,
        hreflangCount: meta.hreflangCount,
        lang: meta.lang,
      },
    };

    void started;
    return NextResponse.json(result, {
      headers: { 'cache-control': 'no-store' },
    });
  } catch (err) {
    if (err instanceof ScanError) {
      return NextResponse.json({ error: err.code }, { status: err.status });
    }
    return NextResponse.json({ error: 'unreachable' }, { status: 502 });
  } finally {
    clearTimeout(deadline);
  }
}
