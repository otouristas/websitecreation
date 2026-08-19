/**
 * Indexability review for industry × service pages.
 *
 * This is the analogue of `evaluateLocationContent`, but it deliberately does
 * not key off body length. Word count is a symptom: a 450-word page that fully
 * answers one narrow transactional intent deserves to be indexed, and a
 * 2,000-word page assembled from the same template with a noun swapped does not.
 *
 * Two independent inputs decide instead:
 *
 *  1. Editorial relevance - is this service something businesses in this
 *     industry actually buy, and can the page say something the generic service
 *     page cannot (`data/industry-service-relevance.ts`).
 *  2. Measured demand - what Search Console already reports for the URL
 *     (`data/gsc-pages.ts`).
 *
 * Demand can override editorial judgement in both directions, and clicks are
 * treated as decisive: a URL that has earned clicks is never demoted by this
 * function, whatever the matrix says. Losing a converting page to a tidy
 * taxonomy is a worse outcome than keeping one awkward URL.
 */

import { getGscStat } from '@/data/gsc-pages';
import { isCoreService, mismatchReason, relevanceRationale } from '@/data/industry-service-relevance';
import type { SiteLocale } from '@/lib/i18n/locale';

export type IndexTier = 'A' | 'B' | 'C' | 'D';
export type IndexAction = 'KEEP_EXPAND' | 'KEEP' | 'CONSOLIDATE' | 'NOINDEX';

export interface IndustryServiceVerdict {
  readonly tier: IndexTier;
  readonly action: IndexAction;
  /** True when the page should be indexed and listed in sitemaps. */
  readonly indexable: boolean;
  /** Where the intent is served instead, when this page is not indexed. */
  readonly consolidateTo?: string;
  readonly clicks: number;
  readonly impressions: number;
  readonly position: number | null;
  readonly core: boolean;
  readonly reason: string;
}

/** Impressions at which an on-topic page is worth indexing on evidence alone. */
const IMPRESSION_FLOOR_CORE = 5;
/** Impressions at which an off-topic page is worth a second look rather than removal. */
const IMPRESSION_FLOOR_OFFTOPIC = 60;

export function evaluateIndustryService(
  industrySlug: string,
  serviceSlug: string,
  locale: SiteLocale,
): IndustryServiceVerdict {
  const path = `/${locale}/solutions/${industrySlug}/${serviceSlug}`;
  // GSC rows predate the locale-prefix migration, so an unprefixed row is the
  // same page and its history still counts.
  const stat = getGscStat(path) ?? (locale === 'en' ? getGscStat(`/solutions/${industrySlug}/${serviceSlug}`) : undefined);
  const clicks = stat?.c ?? 0;
  const impressions = stat?.i ?? 0;
  const position = stat?.p ?? null;
  const core = isCoreService(industrySlug, serviceSlug);
  const hub = `/${locale}/solutions/${industrySlug}`;

  // 1. Anything that has earned a click stays, on or off matrix. Off-matrix
  //    winners are flagged for review rather than silently blessed.
  if (clicks > 0) {
    return {
      tier: 'A',
      action: 'KEEP_EXPAND',
      indexable: true,
      clicks,
      impressions,
      position,
      core,
      reason: core
        ? `Proven: ${clicks} click(s) on a core service for this industry.`
        : `Proven by clicks (${clicks}) despite sitting outside the industry's core services - preserved for review, not auto-removed.`,
    };
  }

  // 2. On-topic pages with real impressions are the expansion candidates.
  if (core && impressions >= IMPRESSION_FLOOR_CORE) {
    return {
      tier: 'A',
      action: 'KEEP_EXPAND',
      indexable: true,
      clicks,
      impressions,
      position,
      core,
      reason: `Core service with measured demand (${impressions} impressions, avg position ${position ?? 'n/a'}). ${relevanceRationale(industrySlug)}`,
    };
  }

  // 3. On-topic with no history yet: a legitimate distinct intent, indexed on
  //    editorial grounds so it can accumulate evidence.
  if (core) {
    return {
      tier: 'B',
      action: 'KEEP',
      indexable: true,
      clicks,
      impressions,
      position,
      core,
      reason: `Core service for this industry with a distinct commercial intent. ${relevanceRationale(industrySlug)}`,
    };
  }

  // 4. Off-topic but ranking for something at volume. Not indexed on that basis
  //    alone - impressions against a mismatched intent are usually the page
  //    surfacing for a generic query, not evidence the pairing is wanted.
  if (impressions >= IMPRESSION_FLOOR_OFFTOPIC) {
    return {
      tier: 'C',
      action: 'CONSOLIDATE',
      indexable: false,
      consolidateTo: hub,
      clicks,
      impressions,
      position,
      core,
      reason: `${impressions} impressions but poor intent fit at avg position ${position ?? 'n/a'} - ${mismatchReason(industrySlug, serviceSlug)} Intent is served by the industry hub.`,
    };
  }

  // 5. Everything else: the Cartesian filler the hub already covers.
  return {
    tier: 'D',
    action: 'CONSOLIDATE',
    indexable: false,
    consolidateTo: hub,
    clicks,
    impressions,
    position,
    core,
    reason: mismatchReason(industrySlug, serviceSlug),
  };
}

/** Convenience wrapper for the page and the sitemap. */
export function isIndustryServiceIndexable(
  industrySlug: string,
  serviceSlug: string,
  locale: SiteLocale,
): boolean {
  return evaluateIndustryService(industrySlug, serviceSlug, locale).indexable;
}
