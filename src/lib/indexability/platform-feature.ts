/**
 * Indexability review for platform feature pages.
 *
 * The constraint here is different from the industry × service matrix. The
 * product application is a separate codebase, so this repository cannot verify
 * what any given feature does, what it accepts, what it returns or where it
 * stops. Writing that detail anyway is exactly the fabrication the brief
 * prohibits, so expansion is only possible where the content can stand on
 * discipline knowledge rather than product specifics.
 *
 * That leaves two honest signals:
 *
 *  - the page carries a long-form explainer (`data/platform-feature-explainers.ts`);
 *  - Search Console already shows the URL earning meaningful impressions.
 *
 * A feature with neither is Tier C: the route stays for navigation and the app
 * link still works, but it is not submitted for indexing while it is a
 * ~115-word restatement of five bullet points. Promote it by writing the page,
 * not by flipping a flag.
 */

import { getGscStat } from '@/data/gsc-pages';
import { FEATURES_WITH_EXPLAINER } from '@/data/platform-feature-explainers';

/** Impressions at which a feature page is earning its place unaided. */
const IMPRESSION_FLOOR = 20;

export interface FeatureVerdict {
  readonly indexable: boolean;
  readonly tier: 'A' | 'B' | 'C';
  readonly impressions: number;
  readonly reason: string;
}

export function evaluatePlatformFeature(slug: string): FeatureVerdict {
  const stat = getGscStat(`/en/platform/features/${slug}`) ?? getGscStat(`/platform/features/${slug}`);
  const impressions = stat?.i ?? 0;
  const expanded = FEATURES_WITH_EXPLAINER.has(slug);

  if (expanded) {
    return {
      indexable: true,
      tier: 'A',
      impressions,
      reason: `Expanded with a long-form explainer and FAQs (${impressions} impressions).`,
    };
  }
  if (impressions >= IMPRESSION_FLOOR) {
    return {
      indexable: true,
      tier: 'B',
      impressions,
      reason: `Measured demand (${impressions} impressions) justifies indexing while the page is expanded.`,
    };
  }
  return {
    indexable: false,
    tier: 'C',
    impressions,
    reason:
      'No measured demand and no content beyond the product bullet list. Route and app link retained; promote once the page is written, which needs the app source to describe honestly.',
  };
}

export function isPlatformFeatureIndexable(slug: string): boolean {
  return evaluatePlatformFeature(slug).indexable;
}
