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

export const MIN_INTRO_WORDS = 70;
export const MIN_NEIGHBORHOODS = 3;
export const MIN_FAQS = 3;
export const MONEY_SERVICES = ['website-creation', 'local-seo'] as const;

export function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
