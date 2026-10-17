export interface ComparePageDefinition {
  readonly slug: string;
  readonly competitorName: string;
  readonly headline: string;
  /** SERP title (≤43 chars before the brand suffix), led by the "alternative" query people search. */
  readonly seoTitle: string;
  readonly summary: string;
  readonly whenChooseUs: readonly string[];
  readonly whenChooseThem: readonly string[];
}

export const COMPARE_PAGES: readonly ComparePageDefinition[] = [
  {
    slug: "ahrefs",
    competitorName: "Ahrefs",
    headline: "AnotherSEOGuru App vs Ahrefs",
    seoTitle: "Ahrefs alternative: AnotherSEOGuru App",
    summary:
      "Ahrefs is a link and keyword research suite. AnotherSEOGuru App is built around your Google Search Console data and the work of acting on it.",
    whenChooseUs: [
      "You want query/page workflows wired to your verified property",
      "You need AI-assisted briefs, clustering, and sprint-style execution",
      "You prefer an all-in-one that pairs with optional agency delivery",
    ],
    whenChooseThem: [
      "Your primary job is historical backlink index scale and massive keyword mining",
      "You already have a mature process for turning exports into action",
    ],
  },
  {
    slug: "semrush",
    competitorName: "Semrush",
    headline: "AnotherSEOGuru App vs Semrush",
    seoTitle: "Semrush alternative: AnotherSEOGuru App",
    summary:
      "Semrush is a broad marketing suite. AnotherSEOGuru App focuses on organic SEO from your Search Console: technical checks, rank tracking and AI visibility.",
    whenChooseUs: [
      "You want a calmer organic stack without re-learning twenty tabs",
      "You connect GSC and want recommendations tied to your actual clicks and impressions",
      "You run an agency and want client-ready narratives faster",
    ],
    whenChooseThem: [
      "You need PPC, social, and enterprise reporting in one mega-platform",
      "Your team is already certified and embedded in Semrush workflows",
    ],
  },
  {
    slug: "search-console-alone",
    competitorName: "Search Console alone",
    headline: "AnotherSEOGuru App vs Search Console alone",
    seoTitle: "AnotherSEOGuru App vs Search Console",
    summary:
      "Search Console stops at observation. AnotherSEOGuru App adds clustering, rank tracking and AI playbooks, and makes that data a prioritized backlog.",
    whenChooseUs: [
      "You are tired of spreadsheet gymnastics for query grouping",
      "You want decay alerts, cannibalization checks, and experiment framing",
      "You need one place for your team to execute weekly",
    ],
    whenChooseThem: [
      "You only need occasional spot checks and have no budget for tooling",
      "You already built internal ETL and dashboards",
    ],
  },
];

export function getComparePageBySlug(slug: string): ComparePageDefinition | undefined {
  return COMPARE_PAGES.find((c) => c.slug === slug);
}
