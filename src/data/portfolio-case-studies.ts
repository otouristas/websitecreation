import { PROJECT_RESEARCH } from './portfolio-research';
import type { PortfolioCaseStudyMap } from './portfolio-case-study-types';

/** Public website observations are distinct from measured client performance. */
export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudyMap = Object.fromEntries(
  Object.entries(PROJECT_RESEARCH).map(([slug, brief]) => [slug, {
    overview: brief.overview, challenge: brief.audience, approach: brief.journey,
    seo: brief.keywords, geoAeo: brief.features,
    technical: { en: [], el: [] }, content: { en: [], el: [] },
    outcomes: brief.features, primaryKeywords: brief.keywords,
  }]),
);
