#!/usr/bin/env npx tsx
/**
 * Greek service×location title audit.
 *
 * Guards the city-hub consolidation. Greek searchers type the local head term
 * bare and both ways round ("seo καλαμάτα" / "καλαμάτα seo"), and we used to
 * answer it with four to six titles per city - 183 of the 540 EL
 * service×location titles carried a standalone "SEO" token, so Google had our
 * own pages to choose between and none of them accumulated the signals.
 *
 * `local-seo` now owns "SEO {city}" and every other service stays qualified.
 * This has regressed once already (the `seo-audits` keyword was moved off
 * "Υπηρεσίες SEO" and the short-title map put it straight back), so the rule is
 * checked rather than trusted.
 *
 * Run: npx tsx scripts/greek-title-audit.ts
 */

import {
  buildServiceLocationMetadata,
  EL_CITY_HEAD_TERM_SERVICE,
  EL_SHORT_TITLE_KEYWORD,
} from '../src/lib/seo/metadata';
import { getLocationsByCountry } from '../src/data/locations';
import { services } from '../src/data/services';
import { getServiceEl } from '../src/data/services-i18n';
import { MAX_TITLE_TOTAL } from '../src/lib/seo/metadata';

const cities = getLocationsByCountry('GR');
const failures: string[] = [];
let headTermClaims = 0;

for (const location of cities) {
  const city = location.cityLocal ?? location.city;
  let claimsThisCity = 0;

  for (const service of services) {
    const meta = buildServiceLocationMetadata({ name: service.name, slug: service.slug }, location, 'el');
    const title = String(meta.title ?? '');
    const primary = title.replace(/ \| AnotherSEOGuru$/, '');
    const id = `${service.slug}/${location.slug}`;

    if (title.length > MAX_TITLE_TOTAL) {
      failures.push(`${id}: title is ${title.length} chars (max ${MAX_TITLE_TOTAL}) - "${title}"`);
    }

    // A bare head-term claim is "SEO {city}" at the front of the title.
    const claimsHeadTerm = new RegExp(`^SEO ${city}(\\s|$)`).test(primary);
    if (claimsHeadTerm) {
      claimsThisCity++;
      headTermClaims++;
      if (service.slug !== EL_CITY_HEAD_TERM_SERVICE) {
        failures.push(`${id}: claims the city head term "SEO ${city}" - only ${EL_CITY_HEAD_TERM_SERVICE} may`);
      }
    }

    // The hub's own qualifier must not ride along on rival titles.
    if (service.slug !== EL_CITY_HEAD_TERM_SERVICE && /Τοπικ[όή][\s\w]*SEO\s*$/u.test(primary)) {
      failures.push(`${id}: ends on the hub's qualifier - "${primary}"`);
    }

    // The old bug: a service with no SEO in its own naming picking up an "SEO"
    // token from a fallback. Keyed on the service's Greek naming, not on the
    // slug - `content-creation` is deliberately "SEO Content" and legitimately
    // leads with it, while `logo-design` has no business carrying the token.
    const svcEl = getServiceEl(service.slug);
    const ownNaming = [
      svcEl?.titleKeyword,
      svcEl?.name,
      service.name,
      EL_SHORT_TITLE_KEYWORD[service.slug],
    ]
      .filter(Boolean)
      .join(' ');
    if (!/seo/i.test(ownNaming) && /(^|\s)SEO(\s|$)/.test(primary)) {
      failures.push(`${id}: picked up an "SEO" token it has no naming for - "${primary}"`);
    }
  }

  if (claimsThisCity !== 1) {
    failures.push(`${location.slug}: ${claimsThisCity} pages claim "SEO ${city}" (expected exactly 1)`);
  }
}

const total = cities.length * services.length;
console.log(`greek-title-audit: ${total} EL service×location titles across ${cities.length} Greek cities`);
console.log(`  head-term claims: ${headTermClaims} (expected ${cities.length}, one per city)`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('greek-title-audit: clean');
