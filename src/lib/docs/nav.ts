import { glossaryCategories } from "@/data/glossary-data";
import { categoryTitle } from "@/components/glossary/category-labels";
import { helpContent, helpPath, IPHONE_CATEGORY } from "@/data/help";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { PLATFORM_TOOLS_EL } from "@/data/platform-tools-el";
import { OPPORTUNITY_FINDER, RESOURCE_CLUSTERS, clusterArticles, resourcePath } from "@/data/resources";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { glossaryPath, glossaryTermName } from "@/lib/docs/glossary";

/**
 * Navigation for the docs: the four tabs along the top and the sidebar each
 * one shows. The help center, the iPhone guides, the SEO glossary and the
 * resources keep their own URLs; this only puts them under one roof.
 */
export type DocsTab = "guides" | "iphone" | "glossary" | "resources";

export interface SideItem {
  readonly title: string;
  readonly href: string;
  readonly icon?: string;
  readonly badge?: string;
  readonly external?: boolean;
  readonly children?: ReadonlyArray<SideItem>;
}

export interface SideGroup {
  readonly title: string;
  readonly items: ReadonlyArray<SideItem>;
}

export interface TabLink {
  readonly id: DocsTab;
  readonly label: string;
  readonly href: string;
  readonly icon: string;
}

export function docsTabs(locale: SiteLocale): TabLink[] {
  const el = locale === "el";
  return [
    { id: "guides", label: el ? "Οδηγοί" : "Guides", href: helpPath(locale), icon: "book" },
    { id: "iphone", label: el ? "Εφαρμογή iPhone" : "iPhone app", href: helpPath(locale, IPHONE_CATEGORY), icon: "smartphone" },
    { id: "glossary", label: el ? "SEO γλωσσάρι" : "SEO glossary", href: glossaryPath(locale), icon: "library" },
    { id: "resources", label: el ? "Υλικό" : "Resources", href: localizedPath(locale, "/resources"), icon: "layers" },
  ];
}

const CATEGORY_ICONS: Readonly<Record<string, string>> = {
  "getting-started": "rocket",
  "search-performance": "bar-chart",
  "opportunities-tasks": "sparkles",
  "keywords-content": "key",
  "site-audit": "shield",
  "competitors-ai": "bot",
  agencies: "building",
  "account-billing": "credit-card",
  "iphone-app": "smartphone",
  integrations: "link",
};

const CLUSTER_ICONS: Readonly<Record<string, string>> = {
  "search-console": "search",
  "traffic-drops": "bar-chart",
  forecasting: "sparkles",
  reporting: "file",
};

export const categoryIcon = (slug: string) => CATEGORY_ICONS[slug];

export function sidebarFor(tab: DocsTab, locale: SiteLocale): SideGroup[] {
  const el = locale === "el";
  const content = helpContent(locale);
  const cat = (slug: string) => content.find((c) => c.slug === slug);
  const articleItems = (slug: string): SideItem[] =>
    cat(slug)?.articles.map((a) => ({ title: a.title, href: helpPath(locale, slug, a.slug) })) ?? [];
  const categoryItem = (slug: string): SideItem | null => {
    const c = cat(slug);
    return c ? { title: c.title, href: helpPath(locale, slug), icon: CATEGORY_ICONS[slug], children: articleItems(slug) } : null;
  };
  const present = (items: ReadonlyArray<SideItem | null>) => items.filter((x): x is SideItem => x !== null);

  switch (tab) {
    case "guides":
      return [
        {
          title: el ? "Ξεκινήστε" : "Get started",
          items: [
            { title: el ? "Εισαγωγή" : "Introduction", href: helpPath(locale), icon: "rocket" },
            ...articleItems("getting-started"),
          ],
        },
        {
          title: el ? "Χρήση του AnotherSEOGuru App" : "Using AnotherSEOGuru App",
          items: present(["search-performance", "opportunities-tasks", "keywords-content", "site-audit", "competitors-ai"].map(categoryItem)),
        },
        {
          title: el ? "Γραφεία και λογαριασμός" : "Agencies and account",
          items: present(["agencies", "account-billing"].map(categoryItem)),
        },
        // Slot for the Chrome extension, WordPress plugin and MCP guides: a help
        // category with slug "integrations" shows up here once it exists.
        ...(cat("integrations")
          ? [{ title: el ? "Ενσωματώσεις" : "Integrations", items: [{ title: cat("integrations")!.title, href: helpPath(locale, "integrations"), icon: "link" }, ...articleItems("integrations")] }]
          : []),
        {
          title: el ? "Παντού" : "Everywhere",
          items: [{ title: el ? "Εφαρμογή iPhone" : "iPhone app", href: helpPath(locale, IPHONE_CATEGORY), icon: "smartphone", badge: "Beta" }],
        },
      ];
    case "iphone": {
      const items = articleItems(IPHONE_CATEGORY);
      return [
        { title: el ? "Εφαρμογή iPhone" : "iPhone app", items: [{ title: el ? "Επισκόπηση" : "Overview", href: helpPath(locale, IPHONE_CATEGORY), icon: "smartphone" }, ...items] },
      ];
    }
    case "glossary":
      return [
        { title: el ? "Γλωσσάρι" : "Glossary", items: [{ title: el ? "Όλοι οι όροι Α–Ω" : "All terms A–Z", href: glossaryPath(locale), icon: "library" }] },
        ...glossaryCategories.map((c) => ({
          title: categoryTitle(c, locale),
          items: c.terms.map((t) => ({ title: glossaryTermName(t, locale), href: glossaryPath(locale, t.id) })),
        })),
      ];
    case "resources": {
      const lp = (p: string) => localizedPath(locale, p);
      const rp = (slug?: string) => resourcePath(slug, locale);
      return [
        {
          title: el ? "Υλικό" : "Resources",
          items: [
            { title: el ? "Επισκόπηση" : "Overview", href: lp("/resources"), icon: "layers" },
            { title: el ? "Ευκαιρίες από το Search Console" : OPPORTUNITY_FINDER.title, href: rp(OPPORTUNITY_FINDER.slug), icon: "wrench", badge: el ? "Δωρεάν" : "Free" },
          ],
        },
        {
          title: el ? "Οδηγοί" : "Guides",
          items: RESOURCE_CLUSTERS.filter((c) => c.id !== "ai-visibility").map((c) => {
            const [pillar, ...rest] = [...clusterArticles(c.id, locale)].sort((a, b) => (a.kind === "pillar" ? -1 : b.kind === "pillar" ? 1 : 0));
            return {
              title: el
                ? ({
                    "search-console": "Ανάλυση Search Console",
                    "traffic-drops": "Πτώση και φθορά περιεχομένου",
                    forecasting: "Πρόβλεψη και προτεραιότητα",
                    reporting: "Αναφορές SEO",
                    "ai-visibility": "Ορατότητα σε αναζήτηση AI",
                  } satisfies Record<string, string>)[c.id]
                : c.title,
              href: rp(pillar.slug),
              icon: CLUSTER_ICONS[c.id],
              children: rest.map((a) => ({ title: a.title.split(":")[0], href: rp(a.slug) })),
            };
          }),
        },
        {
          title: el ? "Πλαίσια" : "Frameworks",
          items: [
            { title: el ? "Επίπεδα αναζήτησης" : "Search optimization layers", href: lp("/resources/search-optimization-layers"), icon: "layers" },
            { title: el ? "Ανατομία σελίδας για AI" : "AI search page anatomy", href: lp("/resources/ai-search-page-anatomy"), icon: "file" },
            ...clusterArticles("ai-visibility", locale).map((a) => ({ title: a.title.split(":")[0], href: rp(a.slug), icon: "bot" })),
          ],
        },
        {
          title: el ? "Μάθετε" : "Learn",
          items: [
            { title: el ? "Λεξικό SEO" : "SEO glossary", href: glossaryPath(locale), icon: "library" },
            { title: "Blog", href: lp("/blog"), icon: "book" },
            { title: el ? "Οδηγοί AnotherSEOGuru App" : "AnotherSEOGuru App guides", href: helpPath(locale), icon: "rocket" },
          ],
        },
        {
          title: el ? "Δωρεάν εργαλεία" : "Free tools",
          items: [
            { title: el ? "Όλα τα εργαλεία" : "Tools hub", href: lp("/tools"), icon: "wrench" },
            ...PLATFORM_TOOLS.map((t) => ({ title: (el ? (PLATFORM_TOOLS_EL[t.slug]?.title ?? t.title) : t.title).split(/[,&]/)[0].trim(), href: lp(`/tools/${t.slug}`) })),
          ],
        },
        {
          title: el ? "Συγκρίσεις" : "Compare",
          items: [
            { title: el ? "Ahrefs" : "vs Ahrefs", href: lp("/compare/ahrefs") },
            { title: el ? "Semrush" : "vs Semrush", href: lp("/compare/semrush") },
            { title: el ? "Μόνο το Search Console" : "vs Search Console alone", href: lp("/compare/search-console-alone") },
          ],
        },
      ];
    }
  }
}

/** The tab a help category belongs to. */
export const tabForCategory = (slug: string): DocsTab => (slug === IPHONE_CATEGORY ? "iphone" : "guides");
