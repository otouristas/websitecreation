/** Offline native socket fixture. It never opens a network connection. */
import { EventEmitter } from 'node:events';
import http from 'node:http';
import https from 'node:https';
import { Readable } from 'node:stream';

export async function withNativeResponse<T>(handler: typeof fetch, run: () => Promise<T>, inspect?: (url: URL, options: http.RequestOptions) => void): Promise<T> {
  const originalHttp = http.request;
  const originalHttps = https.request;
  const fixture = ((url: URL, options: http.RequestOptions, callback: (response: http.IncomingMessage) => void) => {
    inspect?.(url, options);
    const request = new EventEmitter() as EventEmitter & { end(): void; destroy(error?: Error): void };
    request.destroy = (error?: Error) => { if (error) request.emit('error', error); request.emit('close'); };
    const aborted = () => request.destroy(Object.assign(new Error('Aborted'), { name: 'AbortError' }));
    options.signal?.addEventListener('abort', aborted, { once: true });
    request.once('close', () => options.signal?.removeEventListener('abort', aborted));
    request.end = () => {
      void Promise.resolve(handler(url, { headers: options.headers as HeadersInit, signal: options.signal })).then((response) => {
        const incoming = (response.body ? Readable.fromWeb(response.body as never) : Readable.from([])) as http.IncomingMessage;
        incoming.statusCode = response.status;
        incoming.headers = Object.fromEntries(response.headers.entries());
        incoming.once('close', () => request.emit('close'));
        callback(incoming);
      }, (error) => request.emit('error', error));
    };
    return request;
  }) as typeof http.request;
  http.request = fixture;
  https.request = fixture as typeof https.request;
  try { return await run(); } finally { http.request = originalHttp; https.request = originalHttps; }
}
