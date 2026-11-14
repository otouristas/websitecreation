import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:8787';
async function check(path, type, options = {}, expected = 200) {
  const response = await fetch(base + path, { redirect: 'manual', ...options });
  assert.equal(response.status, expected, `${path}: ${response.status} ${response.headers.get('location') || (await response.clone().text()).slice(0, 200)}`);
  assert.ok(response.headers.get('content-type')?.includes(type), `${path}: expected ${type}`);
  assert.match(response.headers.get('x-robots-tag') || '', /noindex/, path);
  console.log(response.status, path, response.headers.get('content-type'));
  return response;
}
const home = await (await check('/', 'text/html')).text();
assert.match(home, /<html[^>]+lang="el"/);
assert.ok(home.includes('href="/get-started#free-audit"') && !home.includes('href="/el/get-started#free-audit"'), 'The free audit CTA uses the public path and keeps its fragment');
assert.ok(!home.includes('href="/el/ypiresies/times"'), 'Agency links point straight to pricing');
assert.ok(home.includes('href="https://anotherseoguru.com/el/privacy"'), 'Product privacy uses the correct origin');
assert.match(home, /rel="canonical"[^>]+anotherseoguru\.gr\/?"/);
assert.ok(!home.includes('fonts.googleapis.com/css'), 'Fonts must be served by the Worker');
const pricing = await (await check('/times', 'text/html')).text();
assert.match(pricing, /<h1/);
assert.match(pricing, /anotherseoguru\.gr\/times/);
const guide = '/blog/poso-kostizei-mia-istoselida';
assert.match(await (await check(guide, 'text/html')).text(), /Τιμές Κατασκευής Ιστοσελίδας/i);
assert.match(await (await check(guide + '.md', 'text/markdown')).text(), /Τιμές Κατασκευής Ιστοσελίδας/i);
const sitemap = await (await check('/sitemap.xml', 'xml')).text();
assert.ok(sitemap.includes(`https://anotherseoguru.gr${guide}`));
for (const [path, indexable] of [
  ['/solutions/hotels/website-creation', true],
  ['/solutions/hotels/eshop-woocommerce', false],
]) {
  const html = await (await check(path, 'text/html')).text();
  const tags = html.match(/<meta\b[^>]*\bname="(?:robots|googlebot)"[^>]*>/gi) || [];
  assert.ok(tags.length, `${path} must declare robots metadata`);
  for (const tag of tags) {
    const directives = (tag.match(/\bcontent="([^"]+)"/i)?.[1] || '').toLowerCase().split(/,\s*/);
    assert.ok(directives.includes(indexable ? 'index' : 'noindex'), tag);
    assert.equal(directives.includes('noindex'), !indexable, tag);
    assert.ok(directives.includes('follow'), tag);
  }
  assert.equal(sitemap.includes(`<loc>https://anotherseoguru.gr${path}</loc>`), indexable, path);
}
assert.match(await (await check('/llms.txt', 'text/plain')).text(), /anotherseoguru\.gr/);
assert.match(await (await check('/robots.txt', 'text/plain')).text(), /Disallow: \/(?:\s|$)/);
await check('/get-started', 'text/html');
const image = await check('/brand/agency-og.png', 'image/png');
assert.ok((await image.arrayBuffer()).byteLength > 1000);
const optimized = await fetch(`${base}/_next/image?url=%2Fbrand%2Fagency-og.png&w=640&q=75`, { headers: { accept: 'image/webp' } });
assert.equal(optimized.status, 200);
assert.match(optimized.headers.get('content-type') || '', /^image\//);
const alias = await fetch(base + '/el/ypiresies/times', { redirect: 'manual' });
assert.ok([301, 308].includes(alias.status), 'canonical route redirect');
assert.equal(new URL(alias.headers.get('location'), base).pathname, '/times');
assert.equal(new URL(alias.headers.get('location'), base).hostname, new URL(base).hostname);
const bad = await check('/api/audit', 'application/json', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }, 400);
assert.equal((await bad.json()).error, 'invalid_url');

const invalidToken = await check('/api/agency-leads?token=invalid', 'application/json', {}, 400);
assert.equal((await invalidToken.json()).error.code, 'invalid_token');
const noOrigin = await check('/api/agency-leads', 'application/json', { method: 'POST', body: '{}' }, 403);
assert.equal((await noOrigin.json()).error.code, 'invalid_origin');
