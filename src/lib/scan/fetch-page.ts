import { assertPublicHost, normalizeUrl, ScanError } from './ssrf';

/**
 * The guarded homepage fetch shared by /api/scan and /api/site-info.
 *
 * Every hop (the first request and each redirect) passes the public-host gate
 * in ssrf.ts, redirects are followed by hand so a public page cannot bounce us
 * onto an internal one, and the body is read up to a byte cap. Failures throw
 * a ScanError with a stable code the routes turn into JSON.
 */

export interface FetchedPage {
  html: string;
  finalUrl: URL;
  status: number;
  /** Time to first byte of the last hop, in ms. */
  ttfbMs: number;
}

export interface FetchPageOptions {
  signal: AbortSignal;
  userAgent: string;
  maxRedirects: number;
  maxBytes: number;
}

export async function readCapped(res: Response, cap: number): Promise<string> {
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

export async function fetchPublicHtml(input: string, opts: FetchPageOptions): Promise<FetchedPage> {
  let current = normalizeUrl(input);
  let response: Response | null = null;
  let ttfbMs = 0;

  for (let hop = 0; hop <= opts.maxRedirects; hop += 1) {
    await assertPublicHost(current.hostname);
    const hopStart = performance.now();
    let res: Response;
    try {
      res = await fetch(current, {
        method: 'GET',
        redirect: 'manual',
        signal: opts.signal,
        headers: {
          'user-agent': opts.userAgent,
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
      if (hop === opts.maxRedirects) throw new ScanError('too_many_redirects', 502);
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
    html = await readCapped(response, opts.maxBytes);
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw new ScanError('timeout', 504);
    throw new ScanError('unreachable', 502);
  }

  return { html, finalUrl: current, status: response.status, ttfbMs };
}

/**
 * Per-IP fixed-window limiter in module memory. On Vercel each instance keeps
 * its own map, so the ceiling is per instance, not global: adequate for abuse
 * from a browser, not a hard quota.
 */
export function createRateLimiter(limit: number, windowMs: number): (ip: string) => boolean {
  const buckets = new Map<string, { count: number; reset: number }>();
  return (ip: string) => {
    const now = Date.now();
    const bucket = buckets.get(ip);
    if (!bucket || bucket.reset < now) {
      buckets.set(ip, { count: 1, reset: now + windowMs });
      if (buckets.size > 5_000) {
        for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
      }
      return false;
    }
    bucket.count += 1;
    return bucket.count > limit;
  };
}

export function clientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
