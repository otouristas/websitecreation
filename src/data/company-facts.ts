import { portfolioProjects } from '@/data/portfolio';

/**
 * Verifiable company facts, in one place.
 *
 * The site previously claimed "55+ live websites" on /work, "70+" in the
 * pricing FAQ and "55+" in trust-stats, against 71 actual portfolio entries.
 * Everything derives from data now, so the numbers cannot contradict.
 *
 * Nothing in this file may be aspirational. If a claim cannot be supported by
 * something in the repo, it does not belong here.
 */

/** Live client projects, counted from the portfolio dataset. */
export const PROJECT_COUNT = portfolioProjects.length;

/** Distinct markets represented in the portfolio. */
export const MARKET_COUNT = new Set(portfolioProjects.flatMap((p) => p.markets)).size;

/** Minimum SEO engagement, in months. Confirmed commercial policy. */
export const SEO_MIN_TERM_MONTHS = 6;

/** Working hours within which enquiries get a reply. */
export const RESPONSE_HOURS = 24;

export const LANGUAGES = ['el', 'en'] as const;
