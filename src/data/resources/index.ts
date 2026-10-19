import { localizedPath } from "@/lib/i18n/locale";
import { EXPANSION_ARTICLES } from "./expansion";
import { FORECASTING_ARTICLES } from "./forecasting";
import { REPORTING_ARTICLES } from "./reporting";
import { REPORTING_EXPANSION_ARTICLES } from "./reporting-expansion";
import { SEARCH_CONSOLE_ARTICLES } from "./search-console";
import { TRAFFIC_DROP_ARTICLES } from "./traffic-drops";
import type { ClusterId, ResourceArticle, ResourceCluster } from "./types";

export { OPPORTUNITY_FINDER_BLOCKS } from "./opportunity-finder";
export type { ClusterId, ResourceArticle, ResourceCluster } from "./types";

/** Resources are English-only (EN_ONLY_SECTIONS). */
export const resourcePath = (slug?: string) => localizedPath("en", slug ? `/resources/${slug}` : "/resources");

export const OPPORTUNITY_FINDER_SLUG = "search-console-opportunity-finder";

/** The free tool. Its page is static (src/app/[locale]/resources/search-console-opportunity-finder). */
export const OPPORTUNITY_FINDER = {
  slug: OPPORTUNITY_FINDER_SLUG,
  cluster: "forecasting" as ClusterId,
  title: "Search Console opportunity finder",
  seoTitle: "Free Search Console Opportunity Finder",
  description:
    "Upload your Search Console export and get the queries worth pushing, the snippets worth rewriting and a click forecast. Runs in your browser, no sign-up.",
  primaryKeyword: "search console opportunity finder",
  published: "2026-10-19",
  updated: "2026-10-19",
} as const;

/** Clusters in hub order. The fifth reuses the two framework pages that were already here. */
export const RESOURCE_CLUSTERS: ReadonlyArray<ResourceCluster> = [
  {
    id: "search-console",
    title: "Search Console analysis",
    summary: "Read the Performance report properly: what changed, where the demand is, what underperforms and where your pages compete.",
    pillar: "search-console-analysis",
    existing: [
      { title: "A one-hour weekly Search Console loop", href: "/en/blog/gsc-weekly-ops-playbook", role: "supporting" },
      { title: "Search Console mastery (blog hub)", href: "/en/blog/topics/search-console-mastery", role: "supporting" },
      { title: "AnotherSEOGuru App vs Search Console alone", href: "/en/compare/search-console-alone", role: "commercial" },
    ],
    product: { title: "Search performance in AnotherSEOGuru App", href: "/en/platform/features#performance" },
  },
  {
    id: "traffic-drops",
    title: "Traffic drops and content decay",
    summary: "Find out whether you lost rankings, demand or clicks, then fix the pages that are slipping.",
    pillar: "organic-traffic-drop",
    existing: [
      { title: "Website redesign without losing SEO", href: "/en/blog/website-redesign-guide", role: "supporting" },
      { title: "Technical SEO for in-house teams", href: "/en/blog/topics/technical-seo-in-house", role: "supporting" },
    ],
    product: { title: "Decay and update annotations in AnotherSEOGuru App", href: "/en/platform/features#opportunities" },
  },
  {
    id: "forecasting",
    title: "Forecasting and prioritization",
    summary: "Estimate what each fix is worth in clicks, pick the quick wins and set targets you can defend.",
    pillar: "seo-forecasting",
    existing: [
      { title: "Prioritizing Search Console queries", href: "/en/blog/gsc-query-prioritization-framework", role: "supporting" },
      { title: "AnotherSEOGuru App vs Ahrefs", href: "/en/compare/ahrefs", role: "commercial" },
      { title: "AnotherSEOGuru App vs Semrush", href: "/en/compare/semrush", role: "commercial" },
    ],
    product: { title: "Opportunities with click-impact estimates", href: "/en/platform/features#opportunities" },
  },
  {
    id: "reporting",
    title: "SEO reporting",
    summary: "Reports clients read: what to include, the KPIs that matter and a template to start from.",
    pillar: "seo-reporting",
    existing: [
      { title: "Agency playbooks (blog hub)", href: "/en/blog/topics/agency-playbooks", role: "supporting" },
      { title: "AnotherSEOGuru App for agencies", href: "/en/platform/for/agencies", role: "commercial" },
    ],
    product: { title: "Client reports and the agency workspace", href: "/en/platform/features#agency" },
  },
  {
    id: "ai-visibility",
    title: "AI search visibility",
    summary: "How answer engines read, quote and cite pages, and how to measure whether they cite you.",
    pillar: "search-optimization-layers",
    existing: [
      { title: "Anatomy of a page built for AI search", href: "/en/resources/ai-search-page-anatomy", role: "supporting" },
      { title: "LLM citations and brand visibility", href: "/en/blog/llm-citations-brand-visibility", role: "supporting" },
      { title: "Free AI visibility check", href: "/en/ai-visibility-check", role: "tool" },
    ],
    product: { title: "AI visibility tracking in AnotherSEOGuru App", href: "/en/platform/features#ai-visibility" },
  },
];

export const RESOURCE_ARTICLES: ReadonlyArray<ResourceArticle> = [
  ...SEARCH_CONSOLE_ARTICLES,
  ...TRAFFIC_DROP_ARTICLES,
  ...FORECASTING_ARTICLES,
  ...REPORTING_ARTICLES,
  ...REPORTING_EXPANSION_ARTICLES,
  ...EXPANSION_ARTICLES,
];

export function findResource(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((a) => a.slug === slug);
}

export function clusterById(id: ClusterId): ResourceCluster {
  return RESOURCE_CLUSTERS.find((c) => c.id === id)!;
}

export function clusterArticles(id: ClusterId): ReadonlyArray<ResourceArticle> {
  return RESOURCE_ARTICLES.filter((a) => a.cluster === id);
}

/** Pillar title for a cluster, including the AI cluster whose pillar is a bespoke page. */
export function pillarTitle(cluster: ResourceCluster): string {
  return findResource(cluster.pillar)?.title.split(":")[0] ?? "Search optimization layers";
}
