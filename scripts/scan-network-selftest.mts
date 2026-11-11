/** Offline DNS/socket tests for the production pinned request path. No network, email or paid services. */
import assert from 'node:assert/strict';
import test from 'node:test';
import dns from 'node:dns/promises';
import type { LookupAddress } from 'node:dns';
import { brotliCompressSync, deflateSync, gzipSync } from 'node:zlib';
import { fetchPublicHtml } from '../src/lib/scan/fetch-page';
import { isPrivateIp, normalizeUrl, ScanError } from '../src/lib/scan/ssrf';
import { withNativeResponse } from './scan-network-fixture.mjs';

const HTML = '<html><head><title>Ελλάδα</title></head><body><h1>Sample</h1></body></html>';
const options = () => ({ signal: new AbortController().signal, userAgent: 'Offline fixture', maxRedirects: 3, maxBytes: 10_000 });
const publicAnswer: LookupAddress = { address: '8.8.8.8', family: 4 };
const privateAnswer: LookupAddress = { address: '127.0.0.1', family: 4 };
async function withDns<T>(resolve: (host: string) => Promise<LookupAddress[]>, run: () => Promise<T>): Promise<T> {
  const original = dns.lookup;
  dns.lookup = resolve as unknown as typeof dns.lookup;
  try { return await run(); } finally { dns.lookup = original; }
}
const blocked = (error: unknown) => error instanceof ScanError && error.code === 'blocked_host';
const page = () => new Response(HTML, { headers: { 'content-type': 'text/html' } });

test('blocks private, reserved, full link-local range, hexadecimal mapped IPv6 and NAT64 addresses', () => {
  for (const address of ['127.0.0.1', '10.0.0.1', '169.254.169.254', '100.64.0.1', '192.0.2.1', '198.18.0.1', '::1', 'fe80::1', 'fe90::1', 'febf::1', 'fd00::1', '::ffff:127.0.0.1', '::ffff:7f00:1', '::ffff:a9fe:a9fe', '64:ff9b::a9fe:a9fe', '2001:db8::1']) {
    assert.equal(isPrivateIp(address), true, address);
  }
  for (const address of ['8.8.8.8', '1.1.1.1', '2001:4860:4860::8888']) assert.equal(isPrivateIp(address), false, address);
});

test('pins both socket lookup callback forms to checked IP while retaining original Host/TLS hostname', async () => {
  let resolutions = 0;
  await withDns(async () => (++resolutions === 1 ? [publicAnswer] : [privateAnswer]), async () => {
    await withNativeResponse(async () => page(), async () => {
      const result = await fetchPublicHtml('https://public-site.com/requested?sample=1', options());
      assert.equal(result.finalUrl.hostname, 'public-site.com');
      assert.equal(result.html, HTML);
      assert.equal(resolutions, 1);
    }, (url, opts) => {
      assert.equal(url.hostname, 'public-site.com');
      assert.equal(opts.agent, false);
      const lookup = opts.lookup as unknown as (host: string, options: { all?: boolean }, callback: (...args: unknown[]) => void) => void;
      lookup('public-site.com', {}, (error, address, family) => assert.deepEqual([error, address, family], [null, '8.8.8.8', 4]));
      lookup('public-site.com', { all: true }, (error, addresses) => assert.deepEqual([error, addresses], [null, [publicAnswer]]));
      assert.equal(resolutions, 1, 'socket callback must never perform another DNS lookup');
    });
  });
});

test('fresh second request rejects changed DNS instead of trusting a warm safe-host cache', async () => {
  let resolutions = 0, requests = 0;
  await withDns(async () => (++resolutions === 1 ? [publicAnswer] : [privateAnswer]), async () => {
    await withNativeResponse(async () => { requests++; return page(); }, async () => {
      await fetchPublicHtml('https://public-site.com/', options());
      await assert.rejects(fetchPublicHtml('https://public-site.com/', options()), blocked);
      assert.equal(resolutions, 2);
      assert.equal(requests, 1);
    });
  });
});

test('mixed public/private DNS answers are rejected before any socket is opened', async () => {
  let requests = 0;
  await withDns(async () => [publicAnswer, { address: '::ffff:a9fe:a9fe', family: 6 }], async () => {
    await withNativeResponse(async () => { requests++; return page(); }, async () => {
      await assert.rejects(fetchPublicHtml('https://public-site.com/', options()), blocked);
      assert.equal(requests, 0);
    });
  });
});

test('every redirect is freshly resolved, including same-host DNS changes', async () => {
  for (const target of ['https://other-site.com/private', 'https://public-site.com/private']) {
    let resolutions = 0, requests = 0;
    await withDns(async () => (++resolutions === 1 ? [publicAnswer] : [privateAnswer]), async () => {
      await withNativeResponse(async () => { requests++; return new Response(null, { status: 302, headers: { location: target } }); }, async () => {
        await assert.rejects(fetchPublicHtml('https://public-site.com/', options()), blocked);
        assert.equal(resolutions, 2);
        assert.equal(requests, 1);
      });
    });
  }
});

test('redirects to mapped private literals, credentials and unsafe ports are rejected before a second socket', async () => {
  for (const target of ['http://[::ffff:7f00:1]/secret', 'http://[::ffff:a9fe:a9fe]/metadata', 'https://user:pass@8.8.8.8/', 'https://8.8.8.8:8080/']) {
    let requests = 0;
    await withNativeResponse(async () => { requests++; return new Response(null, { status: 302, headers: { location: target } }); }, async () => {
      await assert.rejects(fetchPublicHtml('https://8.8.8.8/', options()), (error: unknown) => error instanceof ScanError && ['blocked_host', 'invalid_url'].includes(error.code));
      assert.equal(requests, 1);
    });
  }
  assert.throws(() => normalizeUrl('https://8.8.8.8:8080/'), ScanError);
});

test('shared deadline interrupts stalled DNS without opening a socket', async () => {
  const controller = new AbortController();
  let requests = 0;
  await withDns(async () => new Promise<LookupAddress[]>(() => {}), async () => {
    await withNativeResponse(async () => { requests++; return page(); }, async () => {
      const pending = fetchPublicHtml('https://public-site.com/', { ...options(), signal: controller.signal });
      controller.abort();
      await assert.rejects(pending, (error: unknown) => error instanceof ScanError && error.code === 'timeout');
      assert.equal(requests, 0);
    });
  });
});

test('shared deadline reaches the native socket and rejects an unfinished request', async () => {
  const controller = new AbortController();
  await withNativeResponse(async () => new Promise<Response>(() => {}), async () => {
    const pending = fetchPublicHtml('https://8.8.8.8/', { ...options(), signal: controller.signal });
    setImmediate(() => controller.abort());
    await assert.rejects(pending, (error: unknown) => error instanceof ScanError && error.code === 'timeout');
  }, (_url, opts) => assert.equal(opts.signal, controller.signal));
});

test('native transport decodes supported compression before HTML observation and size enforcement', async () => {
  for (const [encoding, compress] of [['gzip', gzipSync], ['br', brotliCompressSync], ['deflate', deflateSync]] as const) {
    await withNativeResponse(async () => new Response(new Uint8Array(compress(Buffer.from(HTML))), { headers: { 'content-type': 'text/html', 'content-encoding': encoding } }), async () => {
      assert.equal((await fetchPublicHtml('https://8.8.8.8/', options())).html, HTML);
      await assert.rejects(fetchPublicHtml('https://8.8.8.8/', { ...options(), maxBytes: 20 }), (error: unknown) => error instanceof ScanError && error.code === 'page_too_large');
    });
  }
});
