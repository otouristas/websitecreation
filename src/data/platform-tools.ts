/**
 * Programmatic SEO: intent pages on the marketing site that deep-link into the Vite app.
 */
export interface PlatformToolDefinition {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly primaryKeyword: string;
  /** Path on the product app (e.g. /keyword-clustering) */
  readonly appPath: string;
}

export const PLATFORM_TOOLS: readonly PlatformToolDefinition[] = [
  {
    slug: "google-search-console-analytics",
    title: "Google Search Console analytics workspace",
    description:
      "Explore queries, pages, countries, and devices with filters built for SEO teams. Connect your property and act on real Search Console data.",
    primaryKeyword: "Google Search Console dashboard",
    appPath: "/dashboard",
  },
  {
    slug: "gsc-query-clustering",
    title: "GSC query clustering",
    description:
      "Group Search Console queries by similarity to find content themes, gaps, and internal linking opportunities without spreadsheets.",
    primaryKeyword: "search console query clustering",
    appPath: "/keyword-clustering",
  },
  {
    slug: "semantic-keyword-clusters",
    title: "Semantic keyword clusters & topic plans",
    description:
      "Paste keywords and get AI semantic clusters with topic plans for editorial and landing page strategy.",
    primaryKeyword: "semantic keyword clustering",
    appPath: "/keyword-clusters",
  },
  {
    slug: "llm-citation-tracking",
    title: "LLM citation & AI visibility tracking",
    description:
      "Monitor how your brand and URLs appear in AI answers and citations so you can optimize for Chat-style discovery.",
    primaryKeyword: "LLM SEO citation tracker",
    appPath: "/llm-citations",
  },
  {
    slug: "seo-health-score",
    title: "SEO health score & technical checks",
    description:
      "Consolidated health signals and prioritized fixes so you know what moves rankings versus noise.",
    primaryKeyword: "SEO health score tool",
    appPath: "/seo-health",
  },
  {
    slug: "internal-linking-opportunities",
    title: "Internal linking intelligence",
    description:
      "Discover contextual internal link opportunities to distribute PageRank and support new content.",
    primaryKeyword: "internal linking tool",
    appPath: "/internal-linking",
  },
  {
    slug: "free-seo-tools",
    title: "Free SEO tools (meta, schema, CWV, and more)",
    description:
      "Generators and checkers for meta tags, schema, robots.txt, Core Web Vitals, and hreflang—run them in the browser.",
    primaryKeyword: "free SEO tools",
    appPath: "/free-tools",
  },
];

export function getPlatformToolBySlug(slug: string): PlatformToolDefinition | undefined {
  return PLATFORM_TOOLS.find((t) => t.slug === slug);
}
