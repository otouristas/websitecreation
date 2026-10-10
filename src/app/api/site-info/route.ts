import { NextResponse } from 'next/server';
import { clientIp, createRateLimiter, fetchPublicHtml } from '@/lib/scan/fetch-page';
import { parseSiteInfo } from '@/lib/scan/site-info';
import { ScanError } from '@/lib/scan/ssrf';

/**
 * POST /api/site-info  { url: string }
 *
 * Reads the visitor's homepage (same public-host gate, redirect handling and
 * byte cap as /api/scan) and returns the business details our forms ask for:
 * name, title, description, logo, icon, phone, email and language. The
 * "Fetch my details" button uses it so nobody types what their site says.
 *
 * Failures are always a 4xx JSON body { error: <code> }, never a crash.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOTAL_BUDGET_MS = 6_000;
const MAX_REDIRECTS = 3;
const MAX_BYTES = 800_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; AnotherSEOGuru-SiteInfo/1.0; +https://anotherseoguru.com/en/get-started)';

const rateLimited = createRateLimiter(10, 60_000);

/** Upstream trouble (timeouts, dead hosts) is still the visitor's input problem: answer 4xx. */
const STATUS: Record<string, number> = {
  invalid_url: 400,
  blocked_host: 400,
  dns: 422,
  timeout: 408,
  unreachable: 422,
  not_html: 415,
  too_many_redirects: 422,
  rate_limited: 429,
};

export async function POST(req: Request): Promise<NextResponse> {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let url: unknown;
  try {
    url = ((await req.json()) as { url?: unknown }).url;
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }
  if (typeof url !== 'string' || !url.trim()) {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), TOTAL_BUDGET_MS);
  try {
    const page = await fetchPublicHtml(url, {
      signal: controller.signal,
      userAgent: USER_AGENT,
      maxRedirects: MAX_REDIRECTS,
      maxBytes: MAX_BYTES,
    });
    if (page.status >= 400) {
      return NextResponse.json({ error: 'unreachable' }, { status: 422 });
    }
    const info = parseSiteInfo(page.html, page.finalUrl);
    return NextResponse.json(info, { headers: { 'cache-control': 'no-store' } });
  } catch (err) {
    const code = err instanceof ScanError ? err.code : 'unreachable';
    return NextResponse.json({ error: code }, { status: STATUS[code] ?? 422 });
  } finally {
    clearTimeout(deadline);
  }
}
