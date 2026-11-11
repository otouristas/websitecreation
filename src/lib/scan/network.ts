import http from 'node:http';
import https from 'node:https';
import { Readable } from 'node:stream';
import { createBrotliDecompress, createGunzip, createInflate } from 'node:zlib';
import { resolvePublicAddresses, ScanError } from './ssrf';

/** A single request: redirects are intentionally left to the caller's per-hop URL gate. */
export async function pinnedPageResponse(url: URL, options: {
  signal: AbortSignal;
  headers: Record<string, string>;
}): Promise<{ response: Response; ttfbMs: number }> {
  const started = performance.now();
  const addresses = await resolvePublicAddresses(url.hostname, options.signal);
  const address = addresses[0];
  if (options.signal.aborted) throw new ScanError('timeout', 504);
  return new Promise((resolve, reject) => {
    const request = (url.protocol === 'https:' ? https : http).request(url, {
      method: 'GET', agent: false, signal: options.signal,
      // Preserve hostname in the URL for Host and TLS certificate validation.
      // No second DNS lookup can replace the public address checked above.
      lookup: (_hostname, lookupOptions, callback) => {
        if ((lookupOptions as { all?: boolean }).all) {
          (callback as unknown as (error: null, values: typeof addresses) => void)(null, [address]);
        } else callback(null, address.address, address.family);
      },
      headers: { 'accept-encoding': 'identity', ...options.headers },
    }, (incoming) => {
      const headers = new Headers();
      for (const [key, values] of Object.entries(incoming.headers)) {
        if (Array.isArray(values)) for (const value of values) headers.append(key, value);
        else if (values !== undefined) headers.set(key, values);
      }
      const status = incoming.statusCode ?? 0;
      if (status < 200 || status > 599) {
        incoming.destroy(); reject(new ScanError('unreachable', 502)); return;
      }
      let body: Readable = incoming;
      // Servers normally respect identity; decode supported unsolicited compression
      // before readCapped applies the limit to actual HTML, rather than compressed bytes.
      const encoding = headers.get('content-encoding')?.trim().toLowerCase();
      const decoder = encoding === 'gzip' ? createGunzip() : encoding === 'br' ? createBrotliDecompress() : encoding === 'deflate' ? createInflate() : null;
      if (decoder) {
        incoming.on('error', (error) => decoder.destroy(error));
        decoder.once('close', () => { if (!incoming.destroyed) incoming.destroy(); });
        body = incoming.pipe(decoder);
        headers.delete('content-encoding'); headers.delete('content-length');
      } else if (encoding && encoding !== 'identity') {
        incoming.destroy(); reject(new ScanError('unreachable', 502)); return;
      }
      const noBody = [204, 205, 304].includes(status);
      if (noBody) incoming.destroy();
      resolve({
        response: new Response(noBody ? null : Readable.toWeb(body) as ReadableStream<Uint8Array>, { status, headers }),
        ttfbMs: performance.now() - started,
      });
    });
    request.once('error', (error) => reject(options.signal.aborted || error.name === 'AbortError' ? new ScanError('timeout', 504) : new ScanError('unreachable', 502)));
    request.end();
  });
}
