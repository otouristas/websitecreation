/** Offline regression fixtures for the actual thirteen-check lead scan.
 * Run: npx tsx --test scripts/scan-selftest.mts
 * Sources checked 2026-11-11:
 * https://developers.google.com/search/docs/appearance/title-link
 * https://developers.google.com/search/docs/appearance/snippet
 * https://developers.google.com/search/docs/specialty/international/localized-versions
 * https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
 * Google Search Central, Multiple H1 Headings (official video):
 * https://www.youtube.com/watch?v=zyqJJXWk0gk
 * No provider, model, paid service, email, DNS lookup or external fetch is used.
 */
import assert from 'node:assert/strict';
import test from 'node:test';
import { extractMeta, runChecks, headerBlocksGoogleIndexing } from '../src/lib/scan/checks';
import { scoreChecks } from '../src/lib/scan/score';
import { fetchPublicHtml, readCapped } from '../src/lib/scan/fetch-page';
import { ScanError } from '../src/lib/scan/ssrf';
import { POST } from '../src/app/api/scan/route';

const HTML = `<!doctype html><html lang="el"><head><title>Αρχική</title>
<meta name="description" content="Μικρή, χρήσιμη περιγραφή.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://8.8.8.8/service">
<meta property="og:title" content="Δοκιμή"><meta property="og:image" content="/image.jpg">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization"}</script>
</head><body><h1>Η υπηρεσία μας</h1><img src="/decorative.svg" alt=""></body></html>`;
const ctx = { https: true, status: 200, ttfbMs: 200 };
function checks(html = HTML, context = ctx) { return runChecks(extractMeta(html), context); }
function byId(html: string, id: string) { return checks(html).find((check) => check.id === id)!; }
function response(html = HTML, status = 200, headers: Record<string, string> = {}) {
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8', ...headers } });
}
async function withFetch<T>(handler: typeof fetch, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = handler;
  try { return await run(); } finally { globalThis.fetch = original; }
}
const fetchOptions = { signal: new AbortController().signal, userAgent: 'Offline-Fixture', maxRedirects: 3, maxBytes: 1_000_000 };
let requestId = 0;
function scanRequest(url = 'https://8.8.8.8/service') {
  return new Request('https://scanner.invalid/api/scan', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': `fixture-${requestId++}` },
    body: JSON.stringify({ url }),
  });
}

test('retains exactly thirteen unique boolean observations, including source details', () => {
  const result = checks();
  assert.equal(result.length, 13);
  assert.equal(new Set(result.map((check) => check.id)).size, 13);
  assert.ok(result.every((check) => typeof check.pass === 'boolean' && check.detail));
  assert.equal(scoreChecks(result).total, 13);
});

test('short and long useful titles/descriptions do not fail arbitrary character bands', () => {
  assert.equal(byId(HTML, 'title').pass, true);
  assert.equal(byId(HTML, 'description').pass, true);
  const long = HTML.replace('Αρχική', 'Περιγραφή '.repeat(30)).replace('Μικρή, χρήσιμη περιγραφή.', 'Χρήσιμη περιγραφή. '.repeat(30));
  assert.equal(byId(long, 'title').pass, true);
  assert.equal(byId(long, 'description').pass, true);
  assert.equal(byId(HTML.replace('<title>Αρχική</title>', '<title> </title>'), 'title').pass, false);
  assert.equal(byId(HTML.replace('Μικρή, χρήσιμη περιγραφή.', ''), 'description').pass, false);
});

test('multiple H1 elements are counted without inventing a Google exact-one violation', () => {
  const html = HTML.replace('</body>', '<h1>Δεύτερη ενότητα</h1></body>');
  assert.equal(extractMeta(html).h1Count, 2);
  assert.equal(byId(html, 'h1').pass, true);
  assert.equal(byId(HTML.replace('<h1>Η υπηρεσία μας</h1>', ''), 'h1').severity, 'advisory');
});

test('monolingual page does not lose score for absent optional hreflang', () => {
  const mono = byId(HTML, 'hreflang');
  assert.equal(mono.pass, true);
  assert.equal(mono.weight, 0);
  assert.equal(mono.severity, 'info');
  const alternate = HTML.replace('</head>', '<link rel="alternate" hreflang="en" href="https://8.8.8.8/en"></head>');
  assert.equal(extractMeta(alternate).hreflangCount, 1);
  assert.equal(scoreChecks(checks(HTML)).score, scoreChecks(checks(alternate)).score);
});

test('HTML parser ignores inert/script markup, handles > in attributes and counts real alt only', () => {
  const html = HTML.replace('</body>', `<script>const sample = '<h1>fake</h1><meta name="robots" content="noindex">';</script>
  <template><h1>Template</h1><img src="hidden"></template><!-- <h1>Comment</h1> -->
  <img src="a" title="a > b" data-alt="not an alt"><img src="b" alt="a > b"></body>`);
  const meta = extractMeta(html);
  assert.equal(meta.h1Count, 1);
  assert.equal(meta.imageCount, 3);
  assert.equal(meta.imagesWithAlt, 2);
  assert.equal(byId(html, 'img_alt').pass, false);
  assert.equal(byId(html, 'robots').pass, true);
});

test('all robots meta declarations combine restrictively, including googlebot and none', () => {
  for (const extra of [
    '<meta name="robots" content="noindex"><meta name="robots" content="index,follow">',
    '<meta name="GOOGLEBOT" content="NOINDEX">',
    '<meta name="robots" content="none">',
  ]) assert.equal(byId(HTML.replace('</head>', extra + '</head>'), 'robots').pass, false);
  const other = HTML.replace('</head>', '<meta name="bingbot" content="noindex"><meta name="robots" content="noimageindex"></head>');
  assert.equal(byId(other, 'robots').pass, true);
});

test('Google noindex header respects crawler scope and directive boundaries', () => {
  for (const header of ['noindex, follow', 'googlebot: noindex', 'GoogleBot: none', 'max-snippet: 50, noindex', 'otherbot: index, googlebot: noindex']) {
    assert.equal(headerBlocksGoogleIndexing(header), true, header);
  }
  for (const header of ['otherbot: noindex, nofollow', 'noimageindex', 'index, follow', 'otherbot: noindex, googlebot: index']) {
    assert.equal(headerBlocksGoogleIndexing(header), false, header);
  }
});

test('actual indexing exclusion outranks absent optional metadata in three findings', () => {
  const result = scoreChecks(runChecks(extractMeta('<html><body></body></html>'), { ...ctx, xRobotsTag: 'noindex' }));
  assert.equal(result.topIssues.length, 3);
  assert.equal(result.topIssues[0].id, 'robots');
  assert.ok(result.topIssues.every((check) => check.severity === 'issue'));
  assert.ok(!result.topIssues.some((check) => check.id === 'hreflang'));
});

test('JSON-LD presence is not a schema-validation claim, invalid data is not counted', () => {
  assert.deepEqual(extractMeta(HTML).jsonLdTypes, ['Organization']);
  const graph = HTML.replace('{"@context":"https://schema.org","@type":"Organization"}', '{"@graph":[{"@type":["Hotel","LocalBusiness"]}]}');
  assert.deepEqual(extractMeta(graph).jsonLdTypes, ['Hotel', 'LocalBusiness']);
  assert.deepEqual(extractMeta(HTML.replace('"Organization"', 'malformed')).jsonLdTypes, []);
  const emptyOg = HTML.replace('content="Δοκιμή"', 'content=""');
  assert.equal(byId(emptyOg, 'opengraph').pass, false);
});

test('byte cap rejects incomplete document but permits an exactly sized UTF-8 body', async () => {
  const html = 'Ελλάδα';
  assert.equal(await readCapped(new Response(html), Buffer.byteLength(html)), html);
  await assert.rejects(readCapped(new Response(html), 3), (err: unknown) => err instanceof ScanError && err.code === 'page_too_large');
});

test('fetch captures final header evidence and requested path, without external requests', async () => {
  await withFetch(async (input) => {
    assert.equal(String(input), 'https://8.8.8.8/service');
    return response(HTML, 200, { 'x-robots-tag': 'googlebot: noindex' });
  }, async () => {
    const page = await fetchPublicHtml('https://8.8.8.8/service', fetchOptions);
    assert.equal(page.xRobotsTag, 'googlebot: noindex');
    assert.equal(page.finalUrl.pathname, '/service');
    assert.ok(Number.isFinite(Date.parse(page.observedAt)));
  });
});

test('non-success responses never become homepage metadata findings', async () => {
  for (const [status, expected] of [[301, 'upstream_error'], [304, 'upstream_error'], [401, 'access_blocked'], [403, 'access_blocked'], [429, 'upstream_rate_limited'], [500, 'upstream_error']] as const) {
    // Even a non-HTML blocked response must retain its real status evidence.
    await withFetch(async () => new Response(status === 304 ? null : 'blocked', { status }), async () => {
      const res = await POST(scanRequest());
      const json = await res.json();
      assert.equal(res.status, 422);
      assert.equal(json.error, expected);
      assert.equal(json.upstreamStatus, status);
      assert.equal(json.score, undefined);
      assert.equal(json.checks, undefined);
    });
  }
});

test('known HTTP200 Cloudflare access challenge is not graded as page SEO', async () => {
  await withFetch(async () => response('<title>Just a moment...</title><script src="/cdn-cgi/challenge-platform/h/g/orchestrate/chl_page/v1"></script>'), async () => {
    const res = await POST(scanRequest());
    const json = await res.json();
    assert.equal(json.error, 'access_blocked');
    assert.equal(json.upstreamStatus, 200);
    assert.equal(json.score, undefined);
  });
});

test('Cloudflare challenge header is distinguished from a normal article mentioning challenges', async () => {
  await withFetch(async () => response(HTML, 200, { 'cf-mitigated': 'challenge' }), async () => {
    const json = await (await POST(scanRequest())).json();
    assert.equal(json.error, 'access_blocked');
  });
  const article = HTML.replace('</body>', '<article>Cloudflare challenge guide: Just a moment... cf-chl- /cdn-cgi/challenge-platform/</article><pre>&lt;title&gt;Just a moment&lt;/title&gt;</pre></body>');
  await withFetch(async () => response(article), async () => {
    const res = await POST(scanRequest());
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.checks.length, 13);
  });
});

test('capped API response returns a limitation, never partial missing-tag findings', async () => {
  await withFetch(async () => response(HTML + ' '.repeat(1_000_001)), async () => {
    const res = await POST(scanRequest());
    const json = await res.json();
    assert.equal(res.status, 422);
    assert.equal(json.error, 'page_too_large');
    assert.equal(json.score, undefined);
    assert.equal(json.checks, undefined);
  });
});

test('redirect SSRF guard still refuses a public URL redirecting to loopback', async () => {
  let calls = 0;
  await withFetch(async () => { calls += 1; return new Response(null, { status: 302, headers: { location: 'http://127.0.0.1/private' } }); }, async () => {
    await assert.rejects(fetchPublicHtml('https://8.8.8.8/service', fetchOptions), (err: unknown) => err instanceof ScanError && err.code === 'blocked_host');
    assert.equal(calls, 1);
  });
});

test('actual scan API exposes measured thirteen checks, header exclusion and bounded scope', async () => {
  await withFetch(async () => response(HTML, 200, { 'x-robots-tag': 'noindex' }), async () => {
    const res = await POST(scanRequest());
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('cache-control'), 'no-store');
    assert.equal(json.checks.length, 13);
    assert.equal(json.finalUrl, 'https://8.8.8.8/service');
    assert.equal(json.scope, 'requested-page-html');
    assert.equal(json.truncated, false);
    assert.ok(Number.isFinite(Date.parse(json.observedAt)));
    assert.equal(json.topIssues[0].id, 'robots');
    assert.match(json.topIssues[0].detail, /X-Robots-Tag=noindex/);
  });
});
