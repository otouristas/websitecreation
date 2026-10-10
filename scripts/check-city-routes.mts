/**
 * check:city-routes - call the real middleware with real NextRequest objects
 * and assert the HTTP status for service × city URLs after the 2026-10 cut:
 * kept pages pass through, removed pages answer 410 Gone, the one ranking
 * legacy URL answers 308 to its service hub.
 *
 * Usage: npm run check:city-routes
 */
import { NextRequest } from 'next/server';
import { middleware } from '../src/middleware';
import { listKeptServiceLocations } from '../src/lib/indexability/service-location';

const BASE = 'https://anotherseoguru.com';
let failed = 0;
let checked = 0;

function expectStatus(path: string, status: number, location?: string) {
  const res = middleware(new NextRequest(`${BASE}${path}`));
  checked += 1;
  // NextResponse.next() carries the internal x-middleware-next header and a 200 status.
  const passThrough = res.headers.get('x-middleware-next') === '1';
  const actual = passThrough ? 200 : res.status;
  const actualLocation = res.headers.get('location');
  const okLocation = location === undefined || actualLocation === `${BASE}${location}`;
  if (actual !== status || !okLocation) {
    failed += 1;
    console.error(
      `FAIL ${path}: expected ${status}${location ? ` -> ${location}` : ''}, got ${actual}${actualLocation ? ` -> ${actualLocation}` : ''}`,
    );
  }
}

// Every kept page passes through to the route (200).
for (const locale of ['el', 'en'] as const) {
  for (const { service, location } of listKeptServiceLocations(locale)) {
    expectStatus(`/${locale}/services/${service}/${location}`, 200);
  }
}

// Removed combinations: 410 Gone.
const gone = [
  '/el/services/website-redesign/memphis-tn', // Greek page for a US city (audit T2)
  '/el/services/website-creation/memphis-tn',
  '/en/services/website-creation/memphis-tn', // US city
  '/en/services/local-seo/new-york-ny',
  '/el/services/local-seo/larissa-gr', // Greek city not kept
  '/el/services/website-creation/corinth-gr',
  '/el/services/content-creation/tripoli-gr',
  '/el/services/ai-visibility/athens-gr', // kept city, service not kept
  '/en/services/logo-design/london-uk',
  '/en/services/website-creation/thessaloniki-gr', // kept in el only
  '/en/services/local-seo/patras-gr',
  '/en/services/local-seo/kalamata-gr',
  '/el/services/website-creation/london-uk', // Greek page for a non-Greek city
  '/en/services/website-creation/crete-gr', // region page folded into Heraklion/Chania/Rethymno
  '/en/services/link-building/kos-gr', // only the el twin carries the ranking
  '/en/services/website-creation/athens-gr/', // trailing slash on a kept page is still matched as kept
];
for (const path of gone) {
  expectStatus(path, path.endsWith('athens-gr/') ? 200 : 410);
}

// The 410 body links to the service hub and carries noindex.
{
  const res = middleware(new NextRequest(`${BASE}/el/services/local-seo/larissa-gr`));
  const body = await res.text();
  checked += 1;
  if (!body.includes('href="/el/services/local-seo"') || res.headers.get('x-robots-tag') !== 'noindex') {
    failed += 1;
    console.error('FAIL 410 body: missing hub link or x-robots-tag');
  }
}

// The one removed URL with a ranking keyword: 308 to the service hub.
expectStatus('/el/services/link-building/kos-gr', 308, '/el/services/link-building');

// Unrelated routes are untouched.
expectStatus('/el/services/local-seo', 200);
expectStatus('/en/locations', 200);
expectStatus('/el/solutions/hotels/website-creation', 200);

console.log(`Checked ${checked} responses.`);
if (failed > 0) {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
console.log('All city route status checks passed.');
