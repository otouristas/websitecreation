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
    "Open a Search Console export to see where a higher ranking or a better title could bring in more clicks. Your file stays in your browser. No sign-up required.",
  primaryKeyword: "search console opportunity finder",
  published: "2026-10-19",
  updated: "2026-10-19",
} as const;

/** Clusters in hub order. The fifth reuses the two framework pages that were already here. */
export const RESOURCE_CLUSTERS: ReadonlyArray<ResourceCluster> = [
  {
    id: "search-console",
    title: "Understand your Search Console data",
    summary: "Find out which searches bring people to your site, where clicks have changed and when two of your pages show up for the same query.",
    pillar: "search-console-analysis",
    existing: [
      { title: "A weekly Search Console check you can finish in an hour", href: "/en/blog/gsc-weekly-ops-playbook", role: "supporting" },
      { title: "More guides to using Search Console", href: "/en/blog/topics/search-console-mastery", role: "supporting" },
      { title: "What AnotherSEOGuru App adds to Search Console", href: "/en/compare/search-console-alone", role: "commercial" },
    ],
    product: { title: "See which searches bring you clicks in AnotherSEOGuru App", href: "/en/platform/features#performance" },
  },
  {
    id: "traffic-drops",
    title: "Diagnose a drop in search traffic",
    summary: "When a page loses traffic, check whether fewer people searched, your ranking fell or fewer people clicked. Each points to a different fix.",
    pillar: "organic-traffic-drop",
    existing: [
      { title: "How to protect your search rankings during a redesign", href: "/en/blog/website-redesign-guide", role: "supporting" },
      { title: "Technical SEO for in-house teams", href: "/en/blog/topics/technical-seo-in-house", role: "supporting" },
    ],
    product: { title: "Find pages losing clicks in AnotherSEOGuru App", href: "/en/platform/features#opportunities" },
  },
  {
    id: "forecasting",
    title: "Decide which SEO fixes to tackle first",
    summary: "Estimate the extra clicks a change could bring, weigh the work involved and explain why one page comes before another.",
    pillar: "seo-forecasting",
    existing: [
      { title: "Which Search Console queries deserve your time?", href: "/en/blog/gsc-query-prioritization-framework", role: "supporting" },
      { title: "AnotherSEOGuru App vs Ahrefs", href: "/en/compare/ahrefs", role: "commercial" },
      { title: "AnotherSEOGuru App vs Semrush", href: "/en/compare/semrush", role: "commercial" },
    ],
    product: { title: "Compare the estimated clicks for each opportunity", href: "/en/platform/features#opportunities" },
  },
  {
    id: "reporting",
    title: "SEO reporting",
    summary: "Show clients which pages gained or lost clicks, what you changed and what you plan to do next. Start with a report template.",
    pillar: "seo-reporting",
    existing: [
      { title: "Practical guides for SEO agencies", href: "/en/blog/topics/agency-playbooks", role: "supporting" },
      { title: "AnotherSEOGuru App for agencies", href: "/en/platform/for/agencies", role: "commercial" },
    ],
    product: { title: "Build client reports in the agency workspace", href: "/en/platform/features#agency" },
  },
  {
    id: "ai-visibility",
    title: "Track mentions in AI search",
    summary: "See what an AI answer says about your business, which pages it cites and how those references change over time.",
    pillar: "search-optimization-layers",
    existing: [
      { title: "How to structure a page for AI search", href: "/en/resources/ai-search-page-anatomy", role: "supporting" },
      { title: "How to track brand mentions and citations in AI answers", href: "/en/blog/llm-citations-brand-visibility", role: "supporting" },
      { title: "Free AI visibility check", href: "/en/ai-visibility-check", role: "tool" },
    ],
    product: { title: "Track AI mentions and citations in AnotherSEOGuru App", href: "/en/platform/features#ai-visibility" },
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
    title: "Τι δείχνουν τα στοιχεία του Search Console",
    summary: "Δείτε με ποιες αναζητήσεις σάς βρίσκουν στη Google, πού άλλαξαν τα κλικ και πότε δύο δικές σας σελίδες εμφανίζονται για την ίδια αναζήτηση.",
    existing: ["Πώς να ελέγχετε το Search Console σε μία ώρα την εβδομάδα (στα αγγλικά)", "Περισσότεροι οδηγοί για το Search Console (στα αγγλικά)", "Τι προσθέτει το AnotherSEOGuru App στο Search Console"],
    product: "Δείτε στο AnotherSEOGuru App ποιες αναζητήσεις σάς φέρνουν κλικ",
  },
  "traffic-drops": {
    title: "Γιατί μειώθηκαν οι επισκέψεις από τη Google;",
    summary: "Αν μια σελίδα έχασε επισκέψεις, ελέγξτε τι άλλαξε. Έπεσε η θέση της, μειώθηκαν οι αναζητήσεις ή λιγότεροι από όσους την είδαν έκαναν κλικ;",
    existing: ["Πώς να προστατεύσετε την κατάταξή σας όταν αλλάζετε τον ιστότοπο", "Οδηγοί τεχνικού SEO για την ομάδα σας"],
    product: "Βρείτε στο AnotherSEOGuru App τις σελίδες που χάνουν κλικ",
  },
  forecasting: {
    title: "Ποιες βελτιώσεις SEO έχουν προτεραιότητα;",
    summary: "Υπολογίστε πόσα επιπλέον κλικ μπορεί να φέρει κάθε αλλαγή και πόση δουλειά απαιτεί. Έτσι μπορείτε να εξηγήσετε γιατί ξεκινάτε από μια συγκεκριμένη σελίδα.",
    existing: ["Ποιες αναζητήσεις του Search Console αξίζουν πρώτα την προσοχή σας (στα αγγλικά)", "Σύγκριση του AnotherSEOGuru App με το Ahrefs", "Σύγκριση του AnotherSEOGuru App με το Semrush"],
    product: "Συγκρίνετε τα επιπλέον κλικ που μπορεί να φέρει κάθε αλλαγή",
  },
  reporting: {
    title: "Αναφορές SEO",
    summary: "Δείξτε στους πελάτες σας ποιες σελίδες κέρδισαν ή έχασαν κλικ, τι αλλάξατε και τι θα κάνετε στη συνέχεια. Θα βρείτε και πρότυπο αναφοράς.",
    existing: ["Πρακτικοί οδηγοί για γραφεία SEO", "Το AnotherSEOGuru App για γραφεία SEO"],
    product: "Ετοιμάστε τις αναφορές πελατών στον χώρο της ομάδας σας",
  },
  "ai-visibility": {
    title: "Η επιχείρησή σας στις απαντήσεις AI",
    summary: "Δείτε αν οι απαντήσεις AI αναφέρουν την επιχείρησή σας, ποιες σελίδες παραθέτουν ως πηγές και πώς αλλάζουν αυτές οι αναφορές με τον καιρό.",
    existing: ["Πώς να οργανώσετε μια σελίδα για την αναζήτηση με AI", "Πώς να παρακολουθείτε ποιον αναφέρουν οι απαντήσεις AI (στα αγγλικά)", "Δωρεάν έλεγχος της παρουσίας σας στις απαντήσεις AI"],
    product: "Παρακολουθήστε τις αναφορές στην επιχείρησή σας με το AnotherSEOGuru App",
  },
};

function shiftHref(href: string, locale: SiteLocale): string {
  if (locale !== "el") return href;
  if (href === "/en/blog/website-redesign-guide") return "/el/blog/anasxediasmos-istoselidas";
  if (href.startsWith("/en/blog/")) {
    if (href === "/en/blog/topics/technical-seo-in-house" || href === "/en/blog/topics/agency-playbooks") {
      return `/el${href.slice(3)}`;
    }
    return href;
  }
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
