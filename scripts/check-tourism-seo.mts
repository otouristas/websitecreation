/**
 * Tourism vertical pages under /el/seo-tourismou: word count, pairwise
 * similarity, meta lengths, one primary keyword per URL, internal links that
 * resolve, brand bans and no em dashes.
 *
 * Similarity is token Jaccard on the vertical-specific prose. Shared process,
 * rules, pricing and calls to action are not in that text.
 *
 * Usage: npm run check:tourism-seo
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { TOURISM_VERTICALS, buildVerticalSchemas, buildTourismHubSchemas, visibleTourismText } from '../src/data/tourism-seo';
import { PLACE_PAGES, countWords, jaccardSimilarity } from '../src/data/place-seo';
import { getAllIndustrySlugs } from '../src/data/industries';
import { getPortfolioBySlug } from '../src/data/portfolio';
import { META_DESC_MAX, META_DESC_MIN } from '../src/lib/seo';

const MIN_WORDS = 600;
const MAX_SIMILARITY = 0.35;
const TITLE_MAX = 60;
const ROOT = new URL('..', import.meta.url).pathname;
const BANNED = new RegExp(
  [['σίφ', 'νος'], ['sif', 'nos'], ['καμά', 'ρες'], ['\\bγιώρ', 'γ'], ['\\bgeor', 'ge\\b'], ['κασι', 'ώτ'], ['kasi', 'ot']]
    .map((part) => part.join(''))
    .join('|'),
  'i',
);
const DASHES = new RegExp(`[${String.fromCharCode(0x2014)}${String.fromCharCode(0x2015)}]| ${String.fromCharCode(0x2013)} `);

let failed = 0;
function fail(message: string) {
  failed += 1;
  console.error(`FAIL ${message}`);
}

const placeSlugs = new Set(PLACE_PAGES.map((place) => place.slug));
const industrySlugs = new Set(getAllIndustrySlugs());
const verticalSlugs = new Set(TOURISM_VERTICALS.map((vertical) => vertical.slug));
const blogSlugs = new Set(readdirSync(join(ROOT, 'content/blog')).map((name) => name.replace(/\.md$/, '')));
const KNOWN_STATIC = new Set([
  '/el', '/el/seo', '/el/seo-services', '/el/seo-services/technical', '/el/pricing', '/el/get-started', '/el/work',
  '/el/ai-visibility-check', '/el/seo-tourismou',
]);

function linkResolves(href: string): boolean {
  if (KNOWN_STATIC.has(href)) return true;
  let m = /^\/el\/seo\/([a-z-]+)$/.exec(href);
  if (m) return placeSlugs.has(m[1]!);
  m = /^\/el\/solutions\/([a-z-]+)$/.exec(href);
  if (m) return industrySlugs.has(m[1]!);
  m = /^\/el\/blog\/([a-z0-9-]+)$/.exec(href);
  if (m) return blogSlugs.has(m[1]!);
  m = /^\/el\/seo-tourismou\/([a-z-]+)$/.exec(href);
  if (m) return verticalSlugs.has(m[1]!);
  m = /^\/el\/services\/([a-z-]+)$/.exec(href);
  if (m) return existsSync(join(ROOT, 'src/data/services.ts')) && readFileSync(join(ROOT, 'src/data/services.ts'), 'utf8').includes(`slug: '${m[1]}'`);
  return false;
}

const keywords = new Map<string, string>();
const texts = new Map<string, string>();
for (const vertical of TOURISM_VERTICALS) {
  const text = visibleTourismText(vertical);
  texts.set(vertical.slug, text);
  const words = countWords(text);
  console.log(`${vertical.slug}: ${words} words, title ${vertical.title.length}, description ${vertical.description.length}`);
  if (words < MIN_WORDS) fail(`${vertical.slug} has ${words} words, minimum is ${MIN_WORDS}`);
  const all = [text, vertical.title, vertical.description, vertical.h1].join('\n');
  if (BANNED.test(all)) fail(`${vertical.slug} contains a banned brand term`);
  if (DASHES.test(all)) fail(`${vertical.slug} contains an em dash or a spaced en dash`);
  if (vertical.title.length > TITLE_MAX) fail(`${vertical.slug} title is ${vertical.title.length} chars`);
  if (!vertical.title.startsWith('Υπηρεσίες SEO για ')) fail(`${vertical.slug} title does not lead with «Υπηρεσίες SEO για»`);
  const d = vertical.description.length;
  if (d < META_DESC_MIN || d > META_DESC_MAX) fail(`${vertical.slug} description is ${d} chars`);
  if (!vertical.h1.endsWith(vertical.h1Accent)) fail(`${vertical.slug} h1Accent is not a suffix of h1`);
  const owner = keywords.get(vertical.primaryKeyword);
  if (owner) fail(`${vertical.slug} and ${owner} share the primary keyword «${vertical.primaryKeyword}»`);
  keywords.set(vertical.primaryKeyword, vertical.slug);
  const kw = vertical.primaryKeyword.toLocaleLowerCase('el-GR');
  if (!vertical.lead.toLocaleLowerCase('el-GR').includes(kw.replace(/^υπηρεσίες /, ''))) {
    fail(`${vertical.slug} lead does not contain its primary keyword`);
  }
  if (vertical.regions.length < 4) fail(`${vertical.slug} has ${vertical.regions.length} regions`);
  if (vertical.faqs.length < 4) fail(`${vertical.slug} has ${vertical.faqs.length} FAQs`);
  const hrefs = [
    ...vertical.regions.map((region) => region.href),
    ...vertical.related.map((link) => link.href),
    ...[...text.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]!),
    ...vertical.sections.flatMap((section) => section.paragraphs.flatMap((p) => [...p.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]!))),
  ];
  for (const href of hrefs) if (!linkResolves(href)) fail(`${vertical.slug} links to ${href}, which does not resolve`);
  for (const slug of vertical.workSlugs) if (!getPortfolioBySlug(slug)) fail(`${vertical.slug} work slug ${slug} is unknown`);
  const schema = JSON.stringify(buildVerticalSchemas(vertical));
  if (schema.includes('AggregateRating') || schema.includes('PostalAddress')) fail(`${vertical.slug} schema includes a rating or address`);
  if (!schema.includes('https://anotherseoguru.com/#organization')) fail(`${vertical.slug} schema does not reference the Organization @id`);
}

let maxSimilarity = 0;
let maxPair = '';
const slugs = [...texts.keys()];
for (let i = 0; i < slugs.length; i += 1) {
  for (let j = i + 1; j < slugs.length; j += 1) {
    const score = jaccardSimilarity(texts.get(slugs[i]!)!, texts.get(slugs[j]!)!);
    if (score > maxSimilarity) {
      maxSimilarity = score;
      maxPair = `${slugs[i]} ~ ${slugs[j]}`;
    }
    if (score >= MAX_SIMILARITY) fail(`${slugs[i]} ~ ${slugs[j]} similarity ${score.toFixed(3)}`);
  }
}
console.log(`max similarity: ${maxSimilarity.toFixed(3)} (${maxPair})`);

const hubSchema = JSON.stringify(buildTourismHubSchemas(TOURISM_VERTICALS));
if (hubSchema.includes('AggregateRating') || hubSchema.includes('PostalAddress')) fail('hub schema includes a rating or address');

console.log(`verticals: ${TOURISM_VERTICALS.length}`);
if (failed > 0) {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
console.log('Tourism SEO checks passed.');
