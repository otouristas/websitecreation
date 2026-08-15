#!/usr/bin/env npx tsx
/**
 * Generator-aware SEO metadata audit.
 *
 * The previous `audit-meta.mjs` grepped `src/app` for literal strings, so it
 * could only see hand-written static pages - roughly 40 of ~2,170 URLs. This
 * calls the metadata builders directly for every generated route, which is the
 * only way to actually cover service x location, industry x service and blog.
 *
 * Run:  npx tsx scripts/seo-audit.ts [--csv]
 * Exits 1 on any error-level finding.
 */

import { writeFileSync } from 'fs';
import { services } from '../src/data/services';
import { industries } from '../src/data/industries';
import {
  getIndexableServiceLocationSlugs,
  getLocationBySlug,
  greeceLocations,
} from '../src/data/locations';
import { getAllBlogPosts } from '../src/lib/blog';
import {
  buildServiceMetadata,
  buildServiceLocationMetadata,
  buildServiceLocationMetadataEl,
  buildIndustryServiceMetadata,
} from '../src/lib/seo/metadata';
// The industry hub route composes getIndustryMeta INTO buildMetadata, so the
// audit must do the same - calling getIndustryMeta raw reports false "missing
// canonical" findings, because canonical/hreflang are added by buildMetadata.
import { getIndustryMeta, getLocalizedIndustry } from '../src/lib/industry-locale';
import { buildMetadata, findBannedTokens } from '../src/lib/seo/metadata';
import { localizedPath } from '../src/lib/i18n/locale';
import type { SiteLocale } from '../src/lib/i18n/locale';

const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 158;
const DESC_HARD_MAX = 160;

/**
 * Claim tokens are checked by the shared, negation-aware `findBannedTokens` so
 * the audit and the dev-time metadata guard cannot disagree - a flat
 * /\bguarantee/i would flag our own "no ranking guarantees" disclaimer.
 * These two are audit-only additions.
 */
const BANNED = [
  { rx: /€/, label: 'price in metadata' },
  { rx: /\binstant\b/i, label: 'instant' },
];

interface Row {
  url: string;
  lang: string;
  type: string;
  title: string;
  titleLen: number;
  desc: string;
  descLen: number;
  canonical: string;
  issues: string[];
  severity: 'ok' | 'warn' | 'error';
}

const rows: Row[] = [];

function record(url: string, lang: SiteLocale, type: string, md: Record<string, unknown>) {
  const title = String(md.title ?? '');
  const desc = String(md.description ?? '');
  const canonical = String(
    (md.alternates as { canonical?: string } | undefined)?.canonical ?? '',
  );

  const issues: string[] = [];
  let severity: Row['severity'] = 'ok';

  if (!title) { issues.push('missing title'); severity = 'error'; }
  if (title.length > TITLE_MAX) { issues.push(`title ${title.length} > ${TITLE_MAX}`); severity = 'error'; }
  if (!desc) { issues.push('missing description'); severity = 'error'; }
  if (desc && desc.length > DESC_HARD_MAX) { issues.push(`desc ${desc.length} > ${DESC_HARD_MAX}`); severity = 'error'; }
  else if (desc && desc.length > DESC_MAX) { issues.push(`desc ${desc.length} > ${DESC_MAX}`); if (severity === 'ok') severity = 'warn'; }
  else if (desc && desc.length < DESC_MIN) { issues.push(`desc ${desc.length} < ${DESC_MIN}`); if (severity === 'ok') severity = 'warn'; }
  if (!canonical) { issues.push('missing canonical'); severity = 'error'; }

  for (const b of BANNED) {
    if (b.rx.test(title)) { issues.push(`title: ${b.label}`); severity = 'error'; }
    if (b.rx.test(desc)) { issues.push(`desc: ${b.label}`); severity = 'error'; }
  }
  for (const label of findBannedTokens(title)) { issues.push(`title: ${label}`); severity = 'error'; }
  for (const label of findBannedTokens(desc)) { issues.push(`desc: ${label}`); severity = 'error'; }

  // A description ending on a connective means something truncated badly.
  if (/\b(and|or|with|for|to|the|of|from|built|και|με|για|από)\.?$/i.test(desc.trim())) {
    issues.push('desc ends on a connective (truncation)');
    severity = 'error';
  }

  rows.push({ url, lang, type, title, titleLen: title.length, desc, descLen: desc.length, canonical, issues, severity });
}

const locales: SiteLocale[] = ['en', 'el'];

// --- service hubs -----------------------------------------------------------
for (const locale of locales) {
  for (const s of services) {
    record(`/${locale}/services/${s.slug}`, locale, 'service', buildServiceMetadata(s, locale) as never);
  }
}

// --- service x location -----------------------------------------------------
for (const locale of locales) {
  const slugs = locale === 'el'
    ? greeceLocations.map((l) => l.slug)
    : getIndexableServiceLocationSlugs('en');
  for (const s of services) {
    for (const slug of slugs) {
      const loc = getLocationBySlug(slug);
      if (!loc) continue;
      const md = locale === 'el'
        ? buildServiceLocationMetadataEl(s, loc)
        : buildServiceLocationMetadata(s, loc);
      record(`/${locale}/services/${s.slug}/${slug}`, locale, 'service-location', md as never);
    }
  }
}

// --- industries + industry x service ---------------------------------------
for (const locale of locales) {
  for (const ind of industries) {
    const localized = getLocalizedIndustry(ind.slug, locale);
    if (localized) {
      const meta = getIndustryMeta(localized, locale);
      record(`/${locale}/solutions/${ind.slug}`, locale, 'industry',
        buildMetadata({
          title: meta.title,
          description: meta.description,
          path: localizedPath(locale, `/solutions/${ind.slug}`),
          hreflangPath: `/solutions/${ind.slug}`,
        }) as never);
    }
    for (const s of services) {
      record(`/${locale}/solutions/${ind.slug}/${s.slug}`, locale, 'industry-service',
        buildIndustryServiceMetadata(ind, s, locale) as never);
    }
  }
}

// --- report -----------------------------------------------------------------
const errors = rows.filter((r) => r.severity === 'error');
const warns = rows.filter((r) => r.severity === 'warn');

// duplicates
const byTitle = new Map<string, string[]>();
const byDesc = new Map<string, string[]>();
for (const r of rows) {
  byTitle.set(r.title, [...(byTitle.get(r.title) ?? []), r.url]);
  byDesc.set(r.desc, [...(byDesc.get(r.desc) ?? []), r.url]);
}
const dupTitles = [...byTitle.entries()].filter(([, u]) => u.length > 1);
const dupDescs = [...byDesc.entries()].filter(([, u]) => u.length > 1);

console.log(`\nURLs audited:     ${rows.length}`);
console.log(`  errors:         ${errors.length}`);
console.log(`  warnings:       ${warns.length}`);
console.log(`  duplicate titles:       ${dupTitles.length}`);
console.log(`  duplicate descriptions: ${dupDescs.length}`);
console.log(`  blog posts (separate):  ${getAllBlogPosts().length}\n`);

const byIssue = new Map<string, number>();
for (const r of rows) for (const i of r.issues) {
  const key = i.replace(/\d+/g, 'N');
  byIssue.set(key, (byIssue.get(key) ?? 0) + 1);
}
if (byIssue.size) {
  console.log('Findings by type:');
  for (const [k, v] of [...byIssue.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(v).padStart(5)}  ${k}`);
  }
}

for (const r of errors.slice(0, 15)) {
  console.log(`\nERROR ${r.url}\n  ${r.issues.join(' | ')}\n  T(${r.titleLen}) ${r.title}\n  D(${r.descLen}) ${r.desc}`);
}
if (errors.length > 15) console.log(`\n… and ${errors.length - 15} more errors`);

if (process.argv.includes('--csv')) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [
    'URL,Language,Type,Title,TitleLen,Description,DescLen,Canonical,Issues,Status',
    ...rows.map((r) => [
      esc(r.url), r.lang, r.type, esc(r.title), r.titleLen,
      esc(r.desc), r.descLen, esc(r.canonical), esc(r.issues.join('; ')), r.severity,
    ].join(',')),
  ].join('\n');
  writeFileSync('seo-audit.csv', csv);
  console.log('\nWrote seo-audit.csv');
}

process.exit(errors.length > 0 ? 1 : 0);
