import { portfolioProjects } from '@/data/portfolio';
import { PROJECTS_DELIVERED } from '@/data/founder';

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

/**
 * Live sites listed in the portfolio (/work), counted from the dataset. Use it
 * only where the copy counts that list itself ("71 sites you can open today").
 * It is a subset of everything delivered: for "projects delivered/completed"
 * claims and bare trust stats use `PROJECTS_DELIVERED_LABEL`.
 */
export const PROJECT_COUNT = portfolioProjects.length;

/** Total projects delivered, as the owner states it ("200+"). Source: founder.ts. */
export { PROJECTS_DELIVERED };
export const PROJECTS_DELIVERED_LABEL = `${PROJECTS_DELIVERED}+`;

/** Distinct markets represented in the portfolio. */
export const MARKET_COUNT = new Set(portfolioProjects.flatMap((p) => p.markets)).size;

/** Minimum SEO engagement, in months. Confirmed commercial policy. */
export const SEO_MIN_TERM_MONTHS = 6;

/** Working hours within which enquiries get a reply. */
export const RESPONSE_HOURS = 24;

export const LANGUAGES = ['el', 'en'] as const;
