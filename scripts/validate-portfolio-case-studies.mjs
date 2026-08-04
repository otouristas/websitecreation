#!/usr/bin/env node
/**
 * Validate unique EN/EL case-study overrides for every portfolio project.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadTsExportObject(filePath, exportName) {
  const src = fs.readFileSync(filePath, 'utf8');
  // Strip type imports / annotations lightly for Function eval of the object literal
  const marker = `export const ${exportName}`;
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error(`Export ${exportName} not found in ${filePath}`);
  const eq = src.indexOf('=', idx);
  let i = eq + 1;
  while (/\s/.test(src[i])) i++;
  if (src[i] !== '{') throw new Error(`Expected object for ${exportName}`);
  let depth = 0;
  let end = i;
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = j;
        break;
      }
    }
  }
  // eslint-disable-next-line no-new-func
  return new Function(`return (${src.slice(i, end + 1)})`)();
}

function loadPortfolioSlugs() {
  const src = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8');
  const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

function loadPortfolioFieldUniques() {
  const src = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8');
  const summaries = [...src.matchAll(/summary:\s*\n?\s*'((?:\\'|[^'])*)'/g)].map((m) =>
    m[1].replace(/\\'/g, "'"),
  );
  const summaryEls = [...src.matchAll(/summaryEl:\s*\n?\s*'((?:\\'|[^'])*)'/g)].map((m) =>
    m[1].replace(/\\'/g, "'"),
  );
  return { summaries, summaryEls };
}

const errors = [];
const warnings = [];

const slugs = loadPortfolioSlugs();
const caseStudies = loadTsExportObject(
  path.join(root, 'src/data/portfolio-case-studies.ts'),
  'PORTFOLIO_CASE_STUDIES',
);

const missing = slugs.filter((s) => !caseStudies[s]);
if (missing.length) errors.push(`Missing caseStudy overrides: ${missing.join(', ')}`);

const extra = Object.keys(caseStudies).filter((s) => !slugs.includes(s));
if (extra.length) warnings.push(`Extra caseStudy keys not in portfolio: ${extra.join(', ')}`);

const overviewEn = new Map();
const overviewEl = new Map();
const challengeEn = new Map();
const challengeEl = new Map();

for (const slug of slugs) {
  const cs = caseStudies[slug];
  if (!cs) continue;
  for (const field of [
    'overview',
    'challenge',
    'approach',
    'seo',
    'geoAeo',
    'technical',
    'content',
    'outcomes',
    'primaryKeywords',
  ]) {
    if (!cs[field]) errors.push(`${slug}: missing ${field}`);
  }
  if (cs.overview) {
    for (const [map, lang] of [
      [overviewEn, 'en'],
      [overviewEl, 'el'],
    ]) {
      const text = cs.overview[lang];
      if (!text || text.length < 40) errors.push(`${slug}: overview.${lang} too short`);
      if (map.has(text)) errors.push(`Duplicate overview.${lang}: ${slug} == ${map.get(text)}`);
      else map.set(text, slug);
    }
  }
  if (cs.challenge) {
    for (const [map, lang] of [
      [challengeEn, 'en'],
      [challengeEl, 'el'],
    ]) {
      const text = cs.challenge[lang];
      if (!text || text.length < 40) errors.push(`${slug}: challenge.${lang} too short`);
      if (map.has(text)) errors.push(`Duplicate challenge.${lang}: ${slug} == ${map.get(text)}`);
      else map.set(text, slug);
    }
  }
}

const { summaries, summaryEls } = loadPortfolioFieldUniques();
const dupSummary = summaries.filter((s, i) => summaries.indexOf(s) !== i);
const dupSummaryEl = summaryEls.filter((s, i) => summaryEls.indexOf(s) !== i);
if (dupSummary.length) errors.push(`Duplicate EN summaries: ${dupSummary.length}`);
if (dupSummaryEl.length) errors.push(`Duplicate EL summaries: ${dupSummaryEl.length}`);
if (summaries.length < slugs.length) errors.push(`EN summary count ${summaries.length} < slugs ${slugs.length}`);
if (summaryEls.length < slugs.length) errors.push(`EL summary count ${summaryEls.length} < slugs ${slugs.length}`);

// Operators 2026 presence
const blog2026 = path.join(root, 'content/blog/google-search-operators-2026.md');
const blog2025 = path.join(root, 'content/blog/google-search-operators-2025.md');
if (!fs.existsSync(blog2026)) errors.push('Missing content/blog/google-search-operators-2026.md');
if (fs.existsSync(blog2025)) errors.push('Old content/blog/google-search-operators-2025.md still present');

const nextConfig = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8');
if (!nextConfig.includes('google-search-operators-2025')) {
  errors.push('next.config.ts missing operators-2025 redirect source');
}
if (!nextConfig.includes('google-search-operators-2026')) {
  errors.push('next.config.ts missing operators-2026 redirect destination');
}

// Scrape coverage (warnings only — dead URLs allowed)
const scrapeDir = path.join(root, '.firecrawl/work');
let scrapeOk = 0;
let scrapeMissing = 0;
for (const slug of slugs) {
  const md = path.join(scrapeDir, `${slug}.md`);
  if (fs.existsSync(md) && fs.statSync(md).size > 200) scrapeOk++;
  else scrapeMissing++;
}

console.log(
  JSON.stringify(
    {
      slugs: slugs.length,
      caseStudies: Object.keys(caseStudies).length,
      scrapeOk,
      scrapeMissing,
      errors: errors.length,
      warnings: warnings.length,
      errorList: errors,
      warningList: warnings,
    },
    null,
    2,
  ),
);

if (errors.length) process.exit(1);
