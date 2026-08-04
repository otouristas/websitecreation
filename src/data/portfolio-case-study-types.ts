/** Per-project unique case study overrides (EN + EL). */

export interface LocalizedCaseStudyCopy {
  overview: { en: string; el: string };
  challenge: { en: string; el: string };
  approach: { en: string; el: string };
  seo: { en: string[]; el: string[] };
  geoAeo: { en: string[]; el: string[] };
  technical: { en: string[]; el: string[] };
  content: { en: string[]; el: string[] };
  outcomes: { en: string[]; el: string[] };
  primaryKeywords: { en: string[]; el: string[] };
}

export type PortfolioCaseStudyMap = Record<string, LocalizedCaseStudyCopy>;
