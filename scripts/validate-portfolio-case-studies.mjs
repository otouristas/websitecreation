#!/usr/bin/env node
/**
 * Validate unique EN/EL case-study overrides + Greek quality gates.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadTsExportObject(filePath, exportName) {
  const src = fs.readFileSync(filePath, 'utf8');
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
  return [...new Set([...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))];
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
const metaPath = path.join(root, 'docs/portfolio-audits/_meta-corrections.json');
if (!fs.existsSync(metaPath)) {
  errors.push('Missing docs/portfolio-audits/_meta-corrections.json');
}
const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : {};

const missingMeta = slugs.filter((s) => !meta[s]);
if (missingMeta.length) errors.push(`Missing META corrections: ${missingMeta.join(', ')}`);

const missing = slugs.filter((s) => !caseStudies[s]);
if (missing.length) errors.push(`Missing caseStudy overrides: ${missing.join(', ')}`);

const overviewEn = new Map();
const overviewEl = new Map();
const challengeEn = new Map();
const challengeEl = new Map();

const bannedEl = [
  /rankάρει/i,
  /generic template/i,
  /\bCTAs?\b/,
  /mobile UX/i,
  /buyer journey/i,
  /ιστοσελίδα ιστοσελίδα/i,
  /website-creation/i,
  /local-seo/i,
];

const genericPlaces = new Set([
  'εστιατόριο',
  'καφέ',
  'brand',
  'κτήμα',
  'restaurant brand',
  'cocktail bar',
  'travel AI product',
  'fitness brand',
  'dog training',
]);

for (const slug of slugs) {
  const cs = caseStudies[slug];
  const m = meta[slug];
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

  if (m) {
    if (!m.locationEl || genericPlaces.has(m.locationEl.trim().toLowerCase())) {
      errors.push(`${slug}: generic or missing locationEl (${m.locationEl})`);
    }
    if (!m.businessEl || !m.kwEl?.[0] || !m.ctaEl) {
      errors.push(`${slug}: incomplete META (businessEl/kwEl/ctaEl)`);
    }
  }

  const elTexts = [
    cs.overview?.el,
    cs.challenge?.el,
    cs.approach?.el,
    ...(cs.seo?.el || []),
    ...(cs.geoAeo?.el || []),
    ...(cs.technical?.el || []),
    ...(cs.content?.el || []),
    ...(cs.outcomes?.el || []),
  ].filter(Boolean);

  for (const t of elTexts) {
    for (const re of bannedEl) {
      if (re.test(t)) errors.push(`${slug}: banned EL token ${re} in “${t.slice(0, 80)}…”`);
    }
    if (/(\S+)\s+\1/i.test(t) && !/και και|ή ή/.test(t)) {
      // allow rare intentional repeats; flag ιστοσελίδα ιστοσελίδα already covered
      const dup = t.match(/(\S+)\s+\1/i);
      if (dup && /ιστοσελίδα|εστιατόριο|Σίφνος|Νάξος|Πάρος/.test(dup[1])) {
        errors.push(`${slug}: duplicate word “${dup[1]}”`);
      }
    }
  }

  if (cs.overview?.el && m?.kwEl?.[0]) {
    const count = (cs.overview.el.match(new RegExp(m.kwEl[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || [])
      .length;
    if (count >= 3) errors.push(`${slug}: kwEl[0] appears ${count}× in overview.el`);
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

  // Fact checks for known mismatches
  if (slug === 'vwanaki') {
    const blob = elTexts.join(' ');
    if (/εστιατόριο/i.test(blob)) errors.push('vwanaki still mentions εστιατόριο');
    if (!/cocktail bar|κοκτέιλ|κινητ/i.test(blob)) errors.push('vwanaki missing cocktail/mobile bar language');
  }
  if (slug === 'erebos' && !/παρακολούθηση|GPS|οχημ/i.test(elTexts.join(' '))) {
    errors.push('erebos missing vehicle tracking language');
  }
  if (slug === 'koini-lisi' && !/διαμεσολάβηση|εξωδικαστική/i.test(elTexts.join(' '))) {
    errors.push('koini-lisi missing mediation language');
  }
}

const { summaries, summaryEls } = loadPortfolioFieldUniques();
if (summaries.length < slugs.length) errors.push(`EN summary count ${summaries.length} < slugs ${slugs.length}`);
if (summaryEls.length < slugs.length) errors.push(`EL summary count ${summaryEls.length} < slugs ${slugs.length}`);

const suffixCounts = {};
for (const s of summaryEls) {
  const suf = s.slice(-48);
  suffixCounts[suf] = (suffixCounts[suf] || 0) + 1;
}
const maxSuffix = Math.max(0, ...Object.values(suffixCounts));
if (maxSuffix > 12) {
  errors.push(`Too many identical summaryEl suffixes (${maxSuffix} > 12)`);
}

for (const s of summaryEls) {
  for (const re of bannedEl) {
    if (re.test(s)) errors.push(`Banned token in summaryEl: ${s.slice(0, 100)}`);
  }
}

const blog2026 = path.join(root, 'content/blog/google-search-operators-2026.md');
const blog2025 = path.join(root, 'content/blog/google-search-operators-2025.md');
if (!fs.existsSync(blog2026)) errors.push('Missing operators 2026 blog');
if (fs.existsSync(blog2025)) errors.push('Old operators 2025 blog still present');

console.log(
  JSON.stringify(
    {
      slugs: slugs.length,
      caseStudies: Object.keys(caseStudies).length,
      meta: Object.keys(meta).length,
      maxSummaryElSuffix: maxSuffix,
      errors: errors.length,
      warnings: warnings.length,
      errorList: errors.slice(0, 40),
      warningList: warnings,
    },
    null,
    2,
  ),
);

if (errors.length) process.exit(1);
