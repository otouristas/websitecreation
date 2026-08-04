/**
 * audit:locations — fail if any location eligible for indexing lacks uniqueness requirements.
 *
 * Usage: npm run audit:locations
 */
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

console.log(`\nGR locations: ${allLocations.filter((l) => l.countryCode === 'GR').length}`);
console.log(`EL indexable: ${elIndexable.length}`);
console.log(
  `EN indexable: ${enIndexable.length} (non-GR ${enIndexable.filter((s) => !s.endsWith('-gr')).length} + GR ${enIndexable.filter((s) => s.endsWith('-gr')).length})`,
);

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}

console.log('\nAll location uniqueness checks passed.');
