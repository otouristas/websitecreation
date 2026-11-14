import { getAppPath } from '@/lib/app-links';

export const dynamic = 'force-dynamic';

const responseHeaders = { 'content-type': 'application/json', 'cache-control': 'no-store' };

function failure(status: number, code: string): Response {
  return Response.json({ error: { code } }, { status, headers: responseHeaders });
}

async function forward(request: Request, upstream: URL): Promise<Response> {
  const headers = new Headers({ accept: 'application/json' });
  if (request.method === 'POST') headers.set('content-type', 'application/json');
  const clientIp = request.headers.get('cf-connecting-ip');
  if (clientIp) headers.set('x-forwarded-for', clientIp);
  try {
    const response = await fetch(upstream, {
      method: request.method,
      headers,
      body: request.method === 'POST' ? request.body : undefined,
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(25000),
      // Required by Node-compatible fetch when a request body is streamed.
      ...(request.method === 'POST' && { duplex: 'half' as const }),
    });
    if (!response.headers.get('content-type')?.includes('application/json')) {
      return failure(502, 'intake_unavailable');
    }
    return new Response(response.body, { status: response.status, headers: responseHeaders });
  } catch {
    return failure(502, 'intake_unavailable');
  }
}

export async function POST(request: Request): Promise<Response> {
  if (process.env.NEXT_PUBLIC_AGENCY_WORKER !== '1') return failure(404, 'not_found');
  if (request.headers.get('origin') !== new URL(request.url).origin) return failure(403, 'invalid_origin');
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return failure(415, 'expected_json');
  }
  if (Number(request.headers.get('content-length')) > 16000) return failure(413, 'payload_too_large');
  return forward(request, new URL(getAppPath('/api/leads')));
}

export async function GET(request: Request): Promise<Response> {
  if (process.env.NEXT_PUBLIC_AGENCY_WORKER !== '1') return failure(404, 'not_found');
  const token = new URL(request.url).searchParams.get('token') ?? '';
  if (!/^[A-Za-z0-9_-]{32,64}$/.test(token)) return failure(400, 'invalid_token');
  const upstream = new URL(getAppPath('/api/leads'));
  upstream.searchParams.set('token', token);
  return forward(request, upstream);
}
