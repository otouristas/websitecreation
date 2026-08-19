/**
 * Location content packs, unique copy required before a service×location
 * URL may be indexed or listed in sitemaps (hybrid pSEO uniqueness gate).
 */

export type LocationContentLocale = 'en' | 'el';

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationContentPack {
  slug: string;
  /** Unique city intro (locale-matched). */
  intro: string;
  /** Tourism / hospitality angle (EL renderer uses this for hotel CTAs). */
  tourism?: boolean;
  /** Optional nearby city slugs for internal linking. */
  nearbySlugs?: string[];
  /** Portfolio work slugs to surface as proof. */
  portfolioSlugs?: string[];
  /** Local FAQs (merged into service×location FAQ blocks). */
  faqs?: LocationFaq[];
  /**
   * Extra depth for high-value service×city combos.
   * Keys: service slug (e.g. website-creation, local-seo).
   */
  serviceDepth?: Record<string, string>;
}

/**
 * Floor for the city intro's descriptive content.
 *
 * Was 70 when the intros still ended in promotional boilerplate ("πακέτα από
 * €1.200 και μηνιαία SEO από €400, με διαφανείς τιμές και δωρεάν προσφορά"),
 * which appeared in near-identical form across 40 of 45 cities - inflating word
 * count while *lowering* the uniqueness ratio, and advertising website-build
 * packages on SEO-audit and link-building pages. That boilerplate is gone and
 * the floor is re-based on what is left, which is genuinely city-specific.
 * Pricing now lives only on /pricing, where it can follow the live offer window.
 */
export const MIN_INTRO_WORDS = 50;
export const MIN_NEIGHBORHOODS = 3;
export const MIN_FAQS = 3;
export const MONEY_SERVICES = ['website-creation', 'local-seo'] as const;

export function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
