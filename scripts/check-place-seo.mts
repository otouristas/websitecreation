/**
 * Place pages under /el/seo: word count, pairwise similarity, brand bans,
 * and the 301s that replaced 410s for Phase 1 places.
 *
 * Similarity is token Jaccard on the place-specific prose (lead, sections,
 * area names, FAQs). Pricing, process and calls to action are not in that text.
 *
 * Usage: npm run check:place-seo
 */
import { NextRequest } from 'next/server';
import { getAllServiceSlugs } from '../src/data/services';
import {
  PLACE_PAGES,
  placeTitle,
  countWords,
  jaccardSimilarity,
  visiblePlaceText,
  buildPlaceSchemas,
  buildHubSchemas,
} from '../src/data/place-seo';
import {
  PHASE1_PLACE_PAGE,
  decideServiceLocationRoute,
  isServiceLocationKept,
} from '../src/lib/indexability/service-location';
import { middleware } from '../src/middleware';
import { META_DESC_MAX, META_DESC_MIN } from '../src/lib/seo';

const MIN_WORDS = 600;
const MAX_SIMILARITY = 0.4;
const BASE = 'https://anotherseoguru.com';
// Pieces stay split so the brand scan does not treat this checker as a mention.
const BANNED = new RegExp(
  [
    ['σίφ', 'νος'],
    ['sif', 'nos'],
    ['καμά', 'ρες'],
    ['kama', 'res'],
    ['\\bγιώρ', 'γος\\b'],
    ['\\bγιώρ', 'γο\\b'],
    ['\\bgeor', 'ge\\b'],
    ['κασι', 'ώτ'],
    ['kasi', 'otis'],
    ['antiparosrentacar'],
    ['antiparos-rentacar'],
  ]
    .map((part) => part.join(''))
    .join('|'),
  'i',
);

let failed = 0;

function fail(message: string) {
  failed += 1;
  console.error(`FAIL ${message}`);
}

const texts = new Map<string, string>();
for (const place of PLACE_PAGES) {
  const text = visiblePlaceText(place);
  texts.set(place.slug, text);
  const words = countWords(text);
  console.log(`${place.slug}: ${words} words`);
  if (words < MIN_WORDS) fail(`${place.slug} has ${words} words, minimum is ${MIN_WORDS}`);
  if (BANNED.test(text) || BANNED.test(place.description) || BANNED.test(place.title)) {
    fail(`${place.slug} contains a banned brand term`);
  }
  if (!text.includes('κατασκευή ιστοσελίδων')) fail(`${place.slug} does not mention κατασκευή ιστοσελίδων`);
  if (!place.sections.some((section) => section.paragraphs.some((p) => p.includes('/el/services/website-creation')))) {
    fail(`${place.slug} does not link to the website-creation service`);
  }
  const descriptionLength = place.description.length;
  if (descriptionLength < META_DESC_MIN || descriptionLength > META_DESC_MAX) {
    fail(`${place.slug} description is ${descriptionLength} chars`);
  }
  if (place.nearby.length < 2 || place.nearby.length > 3) {
    fail(`${place.slug} has ${place.nearby.length} nearby links`);
  }
  if (place.h1Accent !== 'προώθηση ιστοσελίδων' || !place.h1.endsWith(place.h1Accent)) {
    fail(`${place.slug} H1 accent does not match the Rethymno pattern`);
  }
  if (place.title !== placeTitle(place.name)) {
    fail(`${place.slug} title does not match placeTitle()`);
  }
  if (place.title.length < 50 || place.title.length > 60) {
    fail(`${place.slug} title is ${place.title.length} chars`);
  }
  if (PHASE1_PLACE_PAGE[place.legacySlug] !== `/el/seo/${place.slug}`) {
    fail(`${place.slug} legacy slug is not mapped to its page`);
  }
  const schema = JSON.stringify(buildPlaceSchemas(place));
  if (schema.includes('PostalAddress') || schema.includes('AggregateRating') || schema.includes('streetAddress')) {
    fail(`${place.slug} schema includes an address or rating`);
  }
  if (!schema.includes('https://anotherseoguru.com/#organization')) {
    fail(`${place.slug} service schema does not reference the Organization @id`);
  }
  if (!schema.includes(`"@type":"${place.areaServedType}"`) && !schema.includes(`"@type": "${place.areaServedType}"`)) {
    fail(`${place.slug} areaServed is not ${place.areaServedType}`);
  }
}

let maxSimilarity = 0;
let maxPair = '';
const slugs = [...texts.keys()];
for (let i = 0; i < slugs.length; i += 1) {
  for (let j = i + 1; j < slugs.length; j += 1) {
    const left = slugs[i]!;
    const right = slugs[j]!;
    const score = jaccardSimilarity(texts.get(left)!, texts.get(right)!);
    if (score > maxSimilarity) {
      maxSimilarity = score;
      maxPair = `${left} ~ ${right}`;
    }
    if (score >= MAX_SIMILARITY) fail(`${left} ~ ${right} similarity ${score.toFixed(3)}`);
  }
}
console.log(`max similarity: ${maxSimilarity.toFixed(3)} (${maxPair})`);

const hubSchema = JSON.stringify(buildHubSchemas());
if (hubSchema.includes('PostalAddress') || hubSchema.includes('AggregateRating')) {
  fail('hub schema includes an address or rating');
}

const services = getAllServiceSlugs();
let redirects = 0;
for (const place of PLACE_PAGES) {
  for (const locale of ['el', 'en'] as const) {
    for (const service of services) {
      const path = `/${locale}/services/${service}/${place.legacySlug}`;
      const decision = decideServiceLocationRoute(path);
      if (isServiceLocationKept(locale, service, place.legacySlug)) {
        if (decision?.kind !== 'keep') fail(`${path} should stay live`);
        continue;
      }
      redirects += 1;
      if (decision?.kind !== 'redirect' || decision.status !== 301 || decision.to !== `/el/seo/${place.slug}`) {
        fail(`${path} should 301 to /el/seo/${place.slug}`);
        continue;
      }
      if (decideServiceLocationRoute(decision.to) !== null) fail(`${path} redirect target is itself a city route`);
      const response = middleware(new NextRequest(`${BASE}${path}`));
      const location = response.headers.get('location');
      if (response.status !== 301 || location !== `${BASE}${decision.to}`) {
        fail(`${path} middleware returned ${response.status} ${location ?? ''}`);
      }
    }
  }
}

const rethymno = decideServiceLocationRoute('/el/services/ai-visibility/rethymno-gr');
if (rethymno?.kind !== 'gone') fail('Rethymno removed URLs must stay 410');
const rethymnoLive = decideServiceLocationRoute('/el/services/seo-audits/rethymno-gr');
if (rethymnoLive?.kind !== 'keep') fail('Rethymno SEO page must stay live');

console.log(`redirects: ${redirects}`);
console.log(`places: ${PLACE_PAGES.length}`);
if (failed > 0) {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
console.log('Place SEO checks passed.');
