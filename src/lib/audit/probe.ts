import { assertPublicHost, normalizeUrl, ScanError } from '@/lib/scan/ssrf';

/**
 * One measured HTTP request.
 *
 * Every number the audit reports about the network comes from here, so the
 * measurement rules live in one place: the clock starts before the socket is
 * asked for and TTFB is taken the moment `fetch` resolves its headers, which
 * on undici is the response head - not the body. `totalMs` then covers the
 * body drain, so `totalMs - ttfbMs` is genuinely download time and not a
 * parsing artefact.
 *
 * Redirects are followed by hand because each hop has to pass the same public
 * host gate as the first one (a public page must not be able to bounce the
 * probe onto an internal address), and because the hop chain is itself a
 * metric we report.
 */

export interface ProbeHop {
  readonly url: string;
  readonly status: number;
}

export interface Probe {
  /** The URL finally served, after redirects. */
  readonly url: string;
  readonly status: number;
  /** Time to response headers, milliseconds, final hop only. */
  readonly ttfbMs: number;
  /** Headers to fully drained body, milliseconds, final hop only. */
  readonly totalMs: number;
  /** Wall clock across every hop, milliseconds. */
  readonly elapsedMs: number;
  /** Bytes actually received on the wire (post-compression). */
  readonly transferBytes: number;
  /** Bytes after decoding, i.e. the size of `body`. */
  readonly decodedBytes: number;
  readonly truncated: boolean;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: string;
  readonly redirects: readonly ProbeHop[];
}

export interface ProbeOptions {
  /** Abort the whole probe after this many milliseconds. */
  readonly timeoutMs?: number;
  /** Stop reading the body past this many bytes. */
  readonly maxBytes?: number;
  readonly maxRedirects?: number;
  readonly accept?: string;
  /** Skip the body entirely - status, timing and headers only. */
  readonly headOnly?: boolean;
  /**
   * The public-host gate, as a seam.
   *
   * Defaults to the real SSRF guard and the route never overrides it. It is a
   * parameter at all so the self-test can measure a probe against a fixture
   * server on loopback - the one thing the guard exists to forbid - without
   * anything in the shipped path being able to opt out of it. Overriding this
   * in a request handler would be a hole; keep it to tests.
   */
  readonly guard?: (hostname: string) => Promise<unknown>;
}

export const AUDIT_USER_AGENT =
  'Mozilla/5.0 (compatible; AnotherSEOGuru-Audit/1.0; +https://anotherseoguru.com/en/services/seo-audits)';

const DEFAULTS = {
  timeoutMs: 9_000,
  maxBytes: 1_500_000,
  maxRedirects: 4,
  accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
} as const;

/** The response headers worth keeping; the rest are noise for an audit. */
const KEEP_HEADERS = [
  'content-type',
  'content-encoding',
  'content-length',
  'server',
  'x-powered-by',
  'strict-transport-security',
  'cache-control',
  'x-robots-tag',
  'content-security-policy',
  'x-frame-options',
  'link',
  'vary',
  'age',
  'cf-cache-status',
  'x-vercel-cache',
] as const;

function pickHeaders(res: Response): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name of KEEP_HEADERS) {
    const value = res.headers.get(name);
    if (value !== null) out[name] = value;
  }
  return out;
}

/**
 * Drains the body, counting wire bytes and decoded characters separately.
 *
 * `content-length` is absent on most chunked HTML responses, so compressed
 * size is counted off the raw stream. Node's undici decompresses transparently,
 * which means the byte count here is post-decode; where the server declared an
 * encoding we recover the wire figure from `content-length` when it gave one.
 */
async function drain(
  res: Response,
  maxBytes: number,
): Promise<{ text: string; bytes: number; truncated: boolean }> {
  const reader = res.body?.getReader();
  if (!reader) return { text: '', bytes: 0, truncated: false };
  const decoder = new TextDecoder('utf-8', { fatal: false });
  let text = '';
  let bytes = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    text += decoder.decode(value, { stream: true });
    if (bytes >= maxBytes) {
      truncated = true;
      await reader.cancel().catch(() => undefined);
      break;
    }
  }
  text += decoder.decode();
  return { text, bytes, truncated };
}

export async function probe(target: string | URL, options: ProbeOptions = {}): Promise<Probe> {
  const opts = { ...DEFAULTS, ...options };
  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), opts.timeoutMs);
  const startedAll = performance.now();
  const redirects: ProbeHop[] = [];

  try {
    let current = target instanceof URL ? target : normalizeUrl(target);

    for (let hop = 0; hop <= opts.maxRedirects; hop += 1) {
      await (opts.guard ?? assertPublicHost)(current.hostname);

      const started = performance.now();
      let res: Response;
      try {
        res = await fetch(current, {
          method: opts.headOnly ? 'HEAD' : 'GET',
          redirect: 'manual',
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'user-agent': AUDIT_USER_AGENT,
            accept: opts.accept,
            'accept-language': 'el,en;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
          },
        });
      } catch (err) {
        if ((err as Error).name === 'AbortError') throw new ScanError('timeout', 504);
        throw new ScanError('unreachable', 502);
      }
      const ttfbMs = performance.now() - started;

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        await res.body?.cancel().catch(() => undefined);
        redirects.push({ url: current.toString(), status: res.status });
        if (!location) throw new ScanError('unreachable', 502);
        if (hop === opts.maxRedirects) throw new ScanError('too_many_redirects', 502);
        current = normalizeUrl(new URL(location, current).toString());
        continue;
      }

      const headers = pickHeaders(res);
      let body = '';
      let decodedBytes = 0;
      let truncated = false;
      if (!opts.headOnly) {
        const drained = await drain(res, opts.maxBytes);
        body = drained.text;
        decodedBytes = drained.bytes;
        truncated = drained.truncated;
      }
      const totalMs = performance.now() - started;

      const declared = Number(headers['content-length'] ?? NaN);
      const transferBytes =
        Number.isFinite(declared) && declared > 0 ? declared : decodedBytes;

      return {
        url: current.toString(),
        status: res.status,
        ttfbMs,
        totalMs,
        elapsedMs: performance.now() - startedAll,
        transferBytes,
        decodedBytes,
        truncated,
        headers,
        body,
        redirects,
      };
    }

    throw new ScanError('too_many_redirects', 502);
  } finally {
    clearTimeout(deadline);
  }
}

/** A probe whose failure is a finding, not an error - used for robots, sitemap, llms.txt. */
export async function tryProbe(
  target: string | URL,
  options: ProbeOptions = {},
): Promise<Probe | null> {
  try {
    return await probe(target, options);
  } catch {
    return null;
  }
}
