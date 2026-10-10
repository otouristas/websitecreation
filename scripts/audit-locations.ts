/**
 * audit:locations — fail if any location eligible for indexing lacks uniqueness
 * requirements, if a kept service × city page would not pass the content gate,
 * or if any hardcoded internal link points at a removed (410) city URL.
 *
 * Usage: npm run audit:locations
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  allLocations,
  shouldIndexServiceLocation,
  getIndexableServiceLocationSlugs,
} from '../src/data/locations';
import {
  evaluateLocationContent,
  getLocationPack,
  MONEY_HUB_SLUGS,
} from '../src/data/location-content';
import { LOCATION_PACKS_EL } from '../src/data/location-content/packs-el';
import { LOCATION_PACKS_EN } from '../src/data/location-content/packs-en';
import {
  CITY_PAGE_LOCATIONS,
  CITY_PAGE_SERVICES,
  decideServiceLocationRoute,
  listKeptServiceLocations,
} from '../src/lib/indexability/service-location';
import { getAllServiceSlugs } from '../src/data/services';
import { buildLocationServiceUrls } from '../src/lib/sitemap-locations';

let failed = 0;

function fail(msg: string) {
  console.error(`FAIL: ${msg}`);
  failed += 1;
}

console.log('Auditing location content packs + index gates…\n');

for (const loc of allLocations.filter((l) => l.countryCode === 'GR')) {
  const pack = getLocationPack(loc.slug, 'el');
  if (!pack) {
    fail(`GR ${loc.slug}: missing EL content pack (must stay noindex until written)`);
    continue;
  }
  const result = evaluateLocationContent(loc, 'el');
  if (!result.ok) {
    fail(`GR ${loc.slug}: EL gate — ${result.reasons.join(', ')}`);
  }
  if (!LOCATION_PACKS_EL[loc.slug]) {
    fail(`GR ${loc.slug}: not registered in LOCATION_PACKS_EL`);
  }
}

for (const loc of allLocations) {
  if (loc.countryCode === 'GR') continue;
  const pack = LOCATION_PACKS_EN[loc.slug];
  if (!pack) continue;
  const result = evaluateLocationContent(loc, 'en');
  if (!result.ok) {
    fail(`EN ${loc.slug}: pack exists but gate fails — ${result.reasons.join(', ')}`);
  }
}

for (const slug of MONEY_HUB_SLUGS) {
  const loc = allLocations.find((l) => l.slug === slug);
  if (!loc) {
    fail(`money hub ${slug}: location missing`);
    continue;
  }
  if (loc.countryCode === 'GR') {
    const pack = getLocationPack(slug, 'el');
    if (!pack?.serviceDepth?.['website-creation'] || !pack?.serviceDepth?.['local-seo']) {
      fail(`money hub ${slug}: missing EL serviceDepth for website-creation/local-seo`);
    }
  } else {
    const pack = getLocationPack(slug, 'en');
    if (!pack?.serviceDepth?.['website-creation'] || !pack?.serviceDepth?.['local-seo']) {
      fail(`money hub ${slug}: missing EN serviceDepth for website-creation/local-seo`);
    }
  }
}

const elIndexable = getIndexableServiceLocationSlugs('el');
const enIndexable = getIndexableServiceLocationSlugs('en');

for (const slug of elIndexable) {
  const loc = allLocations.find((l) => l.slug === slug);
  if (!loc || !shouldIndexServiceLocation(loc, 'el')) {
    fail(`EL indexable list drift: ${slug}`);
  }
}
for (const slug of enIndexable) {
  const loc = allLocations.find((l) => l.slug === slug);
  if (!loc || !shouldIndexServiceLocation(loc, 'en')) {
    fail(`EN indexable list drift: ${slug}`);
  }
}

// --- 2026-10 city cut: kept pages must be real, everything else must be gone ---
const serviceSlugs = new Set(getAllServiceSlugs());
for (const svc of CITY_PAGE_SERVICES) {
  if (!serviceSlugs.has(svc)) fail(`kept service ${svc} is not in services.ts`);
}
for (const locale of ['el', 'en'] as const) {
  for (const slug of CITY_PAGE_LOCATIONS[locale]) {
    const loc = allLocations.find((l) => l.slug === slug);
    if (!loc) {
      fail(`${locale} kept city ${slug}: location missing`);
      continue;
    }
    if (locale === 'el' && loc.countryCode !== 'GR') {
      fail(`el kept city ${slug}: Greek pages are for Greek cities only`);
    }
    if (loc.countryCode === 'US') fail(`${locale} kept city ${slug}: US cities were cut`);
    const gate = evaluateLocationContent(loc, locale);
    if (!gate.ok) fail(`${locale} kept city ${slug}: content gate fails - ${gate.reasons.join(', ')}`);
  }
  const kept = listKeptServiceLocations(locale);
  const sitemapCount = buildLocationServiceUrls(locale, locale === 'el' ? 'el' : 'en-intl').length +
    (locale === 'en' ? buildLocationServiceUrls('en', 'en-us').length : 0);
  if (sitemapCount !== kept.length) {
    fail(`${locale} sitemap lists ${sitemapCount} city URLs, expected ${kept.length}`);
  }
  for (const { service, location } of kept) {
    if (decideServiceLocationRoute(`/${locale}/services/${service}/${location}`)?.kind !== 'keep') {
      fail(`${locale} ${service}/${location}: kept but middleware does not serve it`);
    }
  }
}

// Hardcoded internal links to service × city URLs must point at kept pages.
const LINK_PATTERNS: { re: RegExp; locale?: 'el' | 'en' }[] = [
  { re: /\/(en|el)\/services\/([a-z0-9-]+)\/([a-z0-9-]+)/g },
  { re: /elServiceLocationPath\(\s*["']([a-z0-9-]+)["']\s*,\s*["']([a-z0-9-]+)["']/g, locale: 'el' },
  { re: /enServiceLocationPath\(\s*["']([a-z0-9-]+)["']\s*,\s*["']([a-z0-9-]+)["']/g, locale: 'en' },
];
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|mdx?|txt)$/.test(name)) out.push(full);
  }
  return out;
}
const scanned = [...walk('src'), ...walk('content'), 'public/llms.txt', 'public/llms-full.txt'].filter(
  (f) => !f.endsWith('src/data/gsc-pages.ts') && !f.endsWith('src/lib/indexability/service-location.ts'),
);
let linkCount = 0;
for (const file of scanned) {
  const text = readFileSync(file, 'utf8');
  for (const { re, locale } of LINK_PATTERNS) {
    for (const m of text.matchAll(re)) {
      const [loc, svc, city] = locale ? [locale, m[1], m[2]] : [m[1], m[2], m[3]];
      const path = `/${loc}/services/${svc}/${city}`;
      linkCount += 1;
      const decision = decideServiceLocationRoute(path);
      if (decision && decision.kind !== 'keep') fail(`${file}: links to removed URL ${path}`);
    }
  }
}
console.log(`Checked ${linkCount} hardcoded service×city links in ${scanned.length} files.`);

console.log(`\nGR locations: ${allLocations.filter((l) => l.countryCode === 'GR').length}`);
console.log(`EL indexable: ${elIndexable.length}`);
console.log(
  `EN indexable: ${enIndexable.length} (non-GR ${enIndexable.filter((s) => !s.endsWith('-gr')).length} + GR ${enIndexable.filter((s) => s.endsWith('-gr')).length})`,
);
console.log(
  `Live service×city pages: el ${listKeptServiceLocations('el').length}, en ${listKeptServiceLocations('en').length} (${CITY_PAGE_SERVICES.length} services)`,
);

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}

console.log('\nAll location uniqueness checks passed.');
