/**
 * Emits seo-qa/PROGRAMMATIC_MIGRATION_PLAN.csv and INDUSTRY_SERVICE_AUDIT.csv:
 * the full decision trail for every programmatic URL touched by the
 * indexability review, produced before any mutation ships.
 */
import fs from 'node:fs';
import { industries } from '@/data/industries';
import { getAllServiceSlugs } from '@/data/services';
import { evaluateIndustryService } from '@/lib/indexability/industry-service';
import { relevanceRationale } from '@/data/industry-service-relevance';
import { getGscStat } from '@/data/gsc-pages';
import { MARKETING_FEATURES } from '@/data/marketing-features';
import { FEATURES_WITH_EXPLAINER } from '@/data/platform-feature-explainers';
import { evaluatePlatformFeature } from '@/lib/indexability/platform-feature';
import { PLATFORM_TOOLS } from '@/data/platform-tools';

const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
const locales = ['en', 'el'] as const;

type Row = Record<string, unknown>;
const rows: Row[] = [];

// --- industry x service --------------------------------------------------
for (const locale of locales) {
  for (const ind of industries) {
    for (const svc of getAllServiceSlugs()) {
      const v = evaluateIndustryService(ind.slug, svc, locale);
      rows.push({
        URL: `https://anotherseoguru.com/${locale}/solutions/${ind.slug}/${svc}`,
        Family: 'industry-x-service',
        CurrentIndexability: 'index',
        Clicks: v.clicks,
        Impressions: v.impressions,
        Position: v.position ?? '',
        ContentWords: 227,
        UniqueContentAssessment: v.indexable
          ? 'Service angle + industry pain points now differentiate on both axes'
          : 'Template body with the industry noun substituted; no independent substance',
        IntentAssessment: v.core
          ? `Core service for this industry. ${relevanceRationale(ind.slug)}`
          : 'Not a distinct buying intent for this industry',
        StrategicValue: v.tier === 'A' ? 'High (measured demand)' : v.tier === 'B' ? 'Medium (core service)' : 'Low',
        FinalTier: v.tier,
        FinalAction: v.action,
        RedirectDestination: v.indexable ? '' : `https://anotherseoguru.com${v.consolidateTo}`,
        Reason: v.reason,
      });
    }
  }
}

// --- platform features ---------------------------------------------------
for (const f of MARKETING_FEATURES) {
  const path = `/en/platform/features/${f.slug}`;
  const g = getGscStat(path) ?? getGscStat(`/platform/features/${f.slug}`);
  const expanded = FEATURES_WITH_EXPLAINER.has(f.slug);
  const imp = g?.i ?? 0;
  const v = evaluatePlatformFeature(f.slug);
  rows.push({
    URL: `https://anotherseoguru.com${path}`,
    Family: 'platform-feature',
    CurrentIndexability: 'index',
    Clicks: g?.c ?? 0,
    Impressions: imp,
    Position: g?.p ?? '',
    ContentWords: expanded ? '600+' : 115,
    UniqueContentAssessment: expanded
      ? 'Expanded with discipline-level explainer, FAQs and further reading'
      : 'Product claims only (overview, benefits, how it works, use cases)',
    IntentAssessment: 'Product/capability intent',
    StrategicValue: v.tier === 'A' ? 'High' : v.tier === 'B' ? 'Medium (measured demand)' : 'Low',
    FinalTier: v.tier,
    FinalAction: expanded ? 'KEEP_EXPAND' : v.indexable ? 'KEEP' : 'NOINDEX',
    RedirectDestination: '',
    Reason: v.reason,
  });
}

// --- tools ---------------------------------------------------------------
for (const t of PLATFORM_TOOLS) {
  const path = `/en/tools/${t.slug}`;
  const g = getGscStat(path) ?? getGscStat(`/tools/${t.slug}`);
  rows.push({
    URL: `https://anotherseoguru.com${path}`,
    Family: 'tool',
    CurrentIndexability: 'index',
    Clicks: g?.c ?? 0,
    Impressions: g?.i ?? 0,
    Position: g?.p ?? '',
    ContentWords: 95,
    UniqueContentAssessment: 'Heading, description and a deep link. No tool on the page.',
    IntentAssessment: 'Tool intent, unmet: the interactive tool runs on the app subdomain',
    StrategicValue: 'Low',
    FinalTier: 'C',
    FinalAction: 'NOINDEX',
    RedirectDestination: '',
    Reason: 'PLACEHOLDER: indexing this would index an advertisement for a tool rather than a tool. Route retained for navigation; promote once it hosts real functionality.',
  });
}

const cols = ['URL','Family','CurrentIndexability','Clicks','Impressions','Position','ContentWords','UniqueContentAssessment','IntentAssessment','StrategicValue','FinalTier','FinalAction','RedirectDestination','Reason'];
const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => q(r[c])).join(','))].join('\n');
fs.mkdirSync('seo-qa', { recursive: true });
fs.writeFileSync('seo-qa/PROGRAMMATIC_MIGRATION_PLAN.csv', csv);

const ix = rows.filter((r) => r.Family === 'industry-x-service');
fs.writeFileSync('seo-qa/INDUSTRY_SERVICE_AUDIT.csv',
  [cols.join(','), ...ix.map((r) => cols.map((c) => q(r[c])).join(','))].join('\n'));

const tally = (f: string, k: string) => {
  const o: Record<string, number> = {};
  for (const r of rows.filter((x) => x.Family === f)) o[String(r[k])] = (o[String(r[k])] || 0) + 1;
  return o;
};
console.log('rows:', rows.length);
console.log('industry-x-service tiers :', JSON.stringify(tally('industry-x-service', 'FinalTier')));
console.log('industry-x-service action:', JSON.stringify(tally('industry-x-service', 'FinalAction')));
console.log('platform-feature action  :', JSON.stringify(tally('platform-feature', 'FinalAction')));
console.log('tool action              :', JSON.stringify(tally('tool', 'FinalAction')));
const kept = ix.filter((r) => r.FinalAction !== 'CONSOLIDATE');
console.log('industry-x-service kept  :', kept.length, 'of', ix.length);
console.log('impressions kept         :', kept.reduce((a, r) => a + Number(r.Impressions), 0));
console.log('impressions consolidated :', ix.filter((r) => r.FinalAction === 'CONSOLIDATE').reduce((a, r) => a + Number(r.Impressions), 0));
console.log('clicks kept              :', kept.reduce((a, r) => a + Number(r.Clicks), 0));
console.log('clicks consolidated      :', ix.filter((r) => r.FinalAction === 'CONSOLIDATE').reduce((a, r) => a + Number(r.Clicks), 0));
