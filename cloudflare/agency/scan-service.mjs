const endpoints = new Set(['/api/audit', '/api/scan', '/api/site-info']);

/** The scanner's Node service pins each socket to a validated public address. */
export async function scanResponse(request, pathname) {
  if (!endpoints.has(pathname)) return null;
  const json = (error, status) => Response.json({ error }, { status, headers: { 'cache-control': 'no-store' } });
  if (request.method !== 'POST') return json('method_not_allowed', 405);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json('invalid_url', 400);
  if (Number(request.headers.get('content-length')) > 16384) return json('invalid_url', 413);

  let bytes = 0;
  const reader = request.body?.getReader();
  const chunks = [];
  if (!reader) return json('invalid_url', 400);
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 16384) { await reader.cancel(); return json('invalid_url', 413); }
    chunks.push(value);
  }
  let url;
  try { url = JSON.parse(await new Blob(chunks).text()).url; } catch { return json('invalid_url', 400); }
  if (typeof url !== 'string' || !url.trim() || url.length > 2048) return json('invalid_url', 400);
  const headers = new Headers({ 'content-type': 'application/json' });
  const visitorIp = request.headers.get('cf-connecting-ip');
  if (visitorIp) headers.set('x-forwarded-for', visitorIp);
  try {
    const upstream = await fetch('https://anotherseoguru.com' + pathname, {
      method: 'POST', headers, body: JSON.stringify({ url }), redirect: 'manual', signal: request.signal,
    });
    if (upstream.status >= 300 && upstream.status < 400) return json('unreachable', 502);
    return new Response(upstream.body, { status: upstream.status, headers: {
      'content-type': upstream.headers.get('content-type') || 'application/json', 'cache-control': 'no-store',
    } });
  } catch { return json('unreachable', 502); }
}
