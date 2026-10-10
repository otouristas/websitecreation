import { NextResponse } from 'next/server';
import { extractMeta, runChecks } from '@/lib/scan/checks';
import { clientIp, createRateLimiter, fetchPublicHtml } from '@/lib/scan/fetch-page';
import { scoreChecks, type ScanResult } from '@/lib/scan/score';
import { ScanError } from '@/lib/scan/ssrf';

/**
 * POST /api/scan  { url: string }
 *
 * Fetches the visitor's homepage server-side (public hosts only, 6 s budget,
 * three redirects, 1 MB of HTML) and returns thirteen weighted checks with a
 * 0-100 score. This is the lead magnet behind the hero input: the visitor
 * gets a real, instant read of their site, and hands us their domain.
 *
 * Rate limiting is per IP in module memory (see createRateLimiter).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOTAL_BUDGET_MS = 6_000;
const MAX_REDIRECTS = 3;
const MAX_BYTES = 1_000_000;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; AnotherSEOGuru-Scan/1.0; +https://anotherseoguru.com/en/services/seo-audits)';

const rateLimited = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS);

export async function POST(req: Request): Promise<NextResponse> {
  if (rateLimited(clientIp(req))) {
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
    const page = await fetchPublicHtml(body.url, {
      signal: controller.signal,
      userAgent: USER_AGENT,
      maxRedirects: MAX_REDIRECTS,
      maxBytes: MAX_BYTES,
    });

    const meta = extractMeta(page.html);
    const checks = runChecks(meta, {
      https: page.finalUrl.protocol === 'https:',
      status: page.status,
      ttfbMs: page.ttfbMs,
    });
    const { score, passed, total, topIssues } = scoreChecks(checks);

    const result: ScanResult = {
      url: body.url,
      finalUrl: page.finalUrl.toString(),
      status: page.status,
      ttfbMs: Math.round(page.ttfbMs),
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
