export interface ComparePageDefinition {
  readonly slug: string;
  readonly competitorName: string;
  readonly headline: string;
  readonly summary: string;
  readonly whenChooseUs: readonly string[];
  readonly whenChooseThem: readonly string[];
}

export const COMPARE_PAGES: readonly ComparePageDefinition[] = [
  {
    slug: "ahrefs",
    competitorName: "Ahrefs",
    headline: "AnotherSEOGuru vs Ahrefs",
    summary:
      "Ahrefs is a world-class link and keyword research suite. AnotherSEOGuru is built around your Google Search Console reality plus AI execution workflows — ideal when your bottleneck is acting on GSC data, not exporting another CSV.",
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
    headline: "AnotherSEOGuru vs Semrush",
    summary:
      "Semrush is a broad marketing suite with deep paid and content modules. AnotherSEOGuru focuses on organic SEO operations: GSC-native views, technical checks, rank tracking, and LLM visibility — with less surface noise.",
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
    headline: "AnotherSEOGuru vs Search Console alone",
    summary:
      "Search Console is free and essential — but it stops at observation. AnotherSEOGuru adds clustering, health scoring, rank tracking, AI playbooks, and optional autopilot so observation turns into a prioritized backlog.",
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
