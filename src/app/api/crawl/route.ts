import { runCrawl } from '@/lib/audit/crawl-run';
import type { CrawlEvent } from '@/lib/audit/crawl-run';

/**
 * POST /api/crawl  { url: string, maxUrls?: number }
 *
 * Streams newline-delimited JSON while a bounded site crawl runs, so the page
 * table fills as each URL actually settles.
 *
 * Budgets are deliberate and visible in the response: the crawler stops on a
 * URL cap, a depth cap or a wall clock, and reports which one stopped it. A
 * marketing-site crawler that promises "your whole site" inside one request
 * is promising something a serverless runtime cannot deliver, so this one
 * promises the first N pages and says so.
 *
 * Rate limiting is stricter than the single-page audit's, because one call
 * here costs up to forty upstream requests against somebody else's server.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 120_000;

const buckets = new Map<string, { count: number; reset: number }>();

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

function ndjson(event: CrawlEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

export async function POST(req: Request): Promise<Response> {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: { url?: unknown; maxUrls?: unknown };
  try {
    body = (await req.json()) as { url?: unknown; maxUrls?: unknown };
  } catch {
    return Response.json({ error: 'invalid_url' }, { status: 400 });
  }
  if (typeof body.url !== 'string' || body.url.trim().length === 0) {
    return Response.json({ error: 'invalid_url' }, { status: 400 });
  }

  const url = body.url.trim().slice(0, 2048);
  const maxUrls = typeof body.maxUrls === 'number' ? body.maxUrls : undefined;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of runCrawl(url, { maxUrls })) {
          controller.enqueue(ndjson(event));
        }
      } catch {
        controller.enqueue(ndjson({ type: 'error', code: 'generic' }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson; charset=utf-8',
      'cache-control': 'no-store, no-transform',
      'x-accel-buffering': 'no',
    },
  });
}
