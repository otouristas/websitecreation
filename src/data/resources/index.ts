import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { EL_EXPANSION } from "./el/expansion";
import { EL_FORECASTING } from "./el/forecasting";
import { EL_REPORTING } from "./el/reporting";
import { EL_REPORTING_EXPANSION } from "./el/reporting-expansion";
import { EL_SEARCH_CONSOLE } from "./el/search-console";
import { EL_TRAFFIC } from "./el/traffic-drops";
import { EXPANSION_ARTICLES } from "./expansion";
import { FORECASTING_ARTICLES } from "./forecasting";
import { REPORTING_ARTICLES } from "./reporting";
import { REPORTING_EXPANSION_ARTICLES } from "./reporting-expansion";
import { SEARCH_CONSOLE_ARTICLES } from "./search-console";
import { TRAFFIC_DROP_ARTICLES } from "./traffic-drops";
import type { ClusterId, ResourceArticle, ResourceCluster } from "./types";

export { OPPORTUNITY_FINDER_BLOCKS } from "./opportunity-finder";
export type { ClusterId, ResourceArticle, ResourceCluster } from "./types";

/**
 * Resources share the English slug in both locales (/el/resources/seo-reporting).
 * Callers that omit locale stay on the English URL.
 */
export const resourcePath = (slug?: string, locale: SiteLocale = "en") =>
  localizedPath(locale, slug ? `/resources/${slug}` : "/resources");

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

const EL_RESOURCE_ARTICLES: ReadonlyArray<ResourceArticle> = [
  ...EL_SEARCH_CONSOLE,
  ...EL_TRAFFIC,
  ...EL_FORECASTING,
  ...EL_REPORTING,
  ...EL_REPORTING_EXPANSION,
  ...EL_EXPANSION,
];

const EL_CLUSTER_COPY: Readonly<Record<ClusterId, Pick<ResourceCluster, "title" | "summary"> & { existing: ReadonlyArray<string>; product: string }>> = {
  "search-console": {
    title: "Ανάλυση Search Console",
    summary: "Διαβάστε σωστά την αναφορά Απόδοσης: τι άλλαξε, πού είναι η ζήτηση, τι υστερεί και πού ανταγωνίζονται οι σελίδες σας.",
    existing: ["Εβδομαδιαίος έλεγχος Search Console, σε μία ώρα", "Search Console, ο κόμβος στο blog", "AnotherSEOGuru App και μόνο το Search Console"],
    product: "Απόδοση αναζήτησης στο AnotherSEOGuru App",
  },
  "traffic-drops": {
    title: "Πτώση επισκεψιμότητας και φθορά",
    summary: "Δείτε αν χάσατε κατατάξεις, ζήτηση ή κλικ, και διορθώστε τις σελίδες που γλιστρούν.",
    existing: ["Ανασχεδιασμός χωρίς να χαθεί το SEO", "Τεχνικό SEO για εσωτερικές ομάδες"],
    product: "Σημειώσεις φθοράς και ενημερώσεων στο AnotherSEOGuru App",
  },
  forecasting: {
    title: "Πρόβλεψη και προτεραιότητα",
    summary: "Εκτιμήστε πόσα κλικ αξίζει κάθε διόρθωση, διαλέξτε τα γρήγορα κέρδη και βάλτε στόχους που μπορείτε να υπερασπιστείτε.",
    existing: ["Προτεραιότητα στις αναζητήσεις του Search Console", "AnotherSEOGuru App και Ahrefs", "AnotherSEOGuru App και Semrush"],
    product: "Ευκαιρίες με εκτίμηση επίδρασης στα κλικ",
  },
  reporting: {
    title: "Αναφορές SEO",
    summary: "Αναφορές που διαβάζουν οι πελάτες: τι μπαίνει μέσα, ποιοι δείκτες μετράνε και ένα πρότυπο για να ξεκινήσετε.",
    existing: ["Playbooks για agencies, ο κόμβος στο blog", "AnotherSEOGuru App για agencies"],
    product: "Αναφορές πελατών και ο χώρος του agency",
  },
  "ai-visibility": {
    title: "Ορατότητα σε αναζήτηση AI",
    summary: "Πώς οι μηχανές απαντήσεων διαβάζουν, παραθέτουν και αναφέρουν σελίδες, και πώς μετράτε αν αναφέρουν εσάς.",
    existing: ["Ανατομία σελίδας για αναζήτηση AI", "Αναφορές LLM και ορατότητα επωνυμίας", "Δωρεάν έλεγχος ορατότητας σε AI"],
    product: "Παρακολούθηση ορατότητας AI στο AnotherSEOGuru App",
  },
};

function shiftHref(href: string, locale: SiteLocale): string {
  if (locale !== "el" || href.startsWith("/en/blog")) return href;
  if (href.startsWith("/en/")) return `/el${href.slice(3)}`;
  return href;
}

export function articlesFor(locale: SiteLocale): ReadonlyArray<ResourceArticle> {
  return locale === "el" ? EL_RESOURCE_ARTICLES : RESOURCE_ARTICLES;
}

export function findResource(slug: string, locale: SiteLocale = "en"): ResourceArticle | undefined {
  return articlesFor(locale).find((a) => a.slug === slug);
}

export function clusterById(id: ClusterId, locale: SiteLocale = "en"): ResourceCluster {
  const cluster = RESOURCE_CLUSTERS.find((c) => c.id === id)!;
  if (locale !== "el") return cluster;
  const copy = EL_CLUSTER_COPY[id];
  return {
    ...cluster,
    title: copy.title,
    summary: copy.summary,
    existing: cluster.existing.map((item, index) => ({ ...item, title: copy.existing[index] ?? item.title, href: shiftHref(item.href, locale) })),
    product: { title: copy.product, href: shiftHref(cluster.product.href, locale) },
  };
}

export function clusterArticles(id: ClusterId, locale: SiteLocale = "en"): ReadonlyArray<ResourceArticle> {
  return articlesFor(locale).filter((a) => a.cluster === id);
}

/** Pillar title for a cluster, including the AI cluster whose pillar is a bespoke page. */
export function pillarTitle(cluster: ResourceCluster, locale: SiteLocale = "en"): string {
  return findResource(cluster.pillar, locale)?.title.split(":")[0] ?? (locale === "el" ? "Επίπεδα αναζήτησης" : "Search optimization layers");
}
