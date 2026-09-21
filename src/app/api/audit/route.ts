import { runAudit } from '@/lib/audit/run';
import type { AuditEvent } from '@/lib/audit/types';

/**
 * POST /api/audit  { url: string }
 *
 * Streams newline-delimited JSON events while the audit runs, so the widget
 * can show each probe landing at the moment it lands. The alternative - one
 * JSON response at the end, with a spinner animated on a timer - is what the
 * homepage scan does today, and it means the visible progress bar is fiction.
 * Here the log is the work.
 *
 * The response is unbuffered NDJSON rather than SSE because the client is a
 * `fetch` reader, not an `EventSource`: no reconnect semantics to honour, no
 * event-name framing to parse, and a single trailing `result` line that the
 * widget keeps.
 *
 * Rate limiting is per IP in module memory. On a serverless platform each
 * instance keeps its own map, so the ceiling is per instance rather than
 * global - enough to stop a browser hammering it, not a quota.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60_000;

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

function ndjson(event: AuditEvent): Uint8Array {
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

  let body: { url?: unknown };
  try {
    body = (await req.json()) as { url?: unknown };
  } catch {
    return Response.json({ error: 'invalid_url' }, { status: 400 });
  }
  if (typeof body.url !== 'string' || body.url.trim().length === 0) {
    return Response.json({ error: 'invalid_url' }, { status: 400 });
  }
  const url = body.url.trim().slice(0, 2048);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of runAudit(url)) {
          controller.enqueue(ndjson(event));
        }
      } catch {
        // The generator owns its own error events; anything reaching here is a
        // bug rather than a bad target, so the client gets one generic line and
        // the stream closes cleanly instead of hanging.
        controller.enqueue(ndjson({ type: 'error', code: 'generic' }));
      } finally {
        controller.close();
      }
    },
    cancel() {
      // The visitor navigated away mid-audit. Nothing to unwind: each probe
      // carries its own timeout and will abort on its own.
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
