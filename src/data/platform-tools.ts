/**
 * Programmatic SEO: intent pages on the marketing site that deep-link into the Vite app.
 */
export interface PlatformToolFaq {
  readonly question: string;
  readonly answer: string;
}

export interface PlatformToolDefinition {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly primaryKeyword: string;
  /** Path on the product app (e.g. /keyword-clustering) */
  readonly appPath: string;
  /** Optional FAQ for AEO / FAQPage on the marketing landing */
  readonly faqs?: readonly PlatformToolFaq[];
}

export const PLATFORM_TOOLS: readonly PlatformToolDefinition[] = [
  {
    slug: "keyword-research",
    title: "Free keyword research tool, ideas, clusters & intent",
    description:
      "Find SEO keywords and topic clusters from your seeds or Search Console themes. Group by intent, then map one primary phrase per page. Built for keyword research that turns into content, not endless spreadsheets.",
    primaryKeyword: "keyword research",
    appPath: "/keyword-clustering",
    faqs: [
      {
        question: "How do you do keyword research for SEO?",
        answer:
          "Start from seed topics your buyers care about, expand with related terms and questions, group by search intent, then prioritize by volume, difficulty, and business value. Map one primary keyword (and close variants) to each page.",
      },
      {
        question: "What are SEO keywords?",
        answer:
          "SEO keywords are the words and phrases people type into search engines when looking for information, products, or services. Good keyword research matches those phrases to pages that can convert.",
      },
      {
        question: "What is keyword difficulty?",
        answer:
          "Keyword difficulty estimates how hard it is to rank in the top 10 organic results, usually on a 0–100 scale. Lower KD with clear commercial intent is often the best place to start for newer sites.",
      },
    ],
  },
  {
    slug: "free-seo-audit",
    title: "Free SEO audit, health score & prioritized fixes",
    description:
      "Run a free SEO audit checklist against your site priorities: indexation, Core Web Vitals, titles, and internal links. Get a clear health score path, then upgrade to full SEO audit services when you want done-for-you fixes.",
    primaryKeyword: "free seo audit",
    appPath: "/seo-health",
    faqs: [
      {
        question: "What is an SEO audit?",
        answer:
          "An SEO audit is a structured review of technical health, indexation, on-page relevance, content gaps, and authority signals. It prioritizes fixes that unlock rankings fastest instead of dumping a 200-item spreadsheet.",
      },
      {
        question: "How often should you do an SEO audit?",
        answer:
          "Run a full audit when launching a new site, after a redesign, or every 6–12 months. Spot-check Core Web Vitals, index coverage, and top money pages monthly via Search Console.",
      },
      {
        question: "Free vs paid SEO audit?",
        answer:
          "Free checkers catch common issues quickly. A professional audit adds prioritization, competitor context, and a roadmap tied to business goals, then implementation, which free tools never do alone.",
      },
    ],
  },
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
      "Generators and checkers for meta tags, schema, robots.txt, Core Web Vitals, and hreflang - run them in the browser. Start here if you searched for SEO tools.",
    primaryKeyword: "seo tools",
    appPath: "/free-tools",
    faqs: [
      {
        question: "What are the SEO tools?",
        answer:
          "SEO tools help you research keywords, audit technical issues, track rankings, analyze backlinks, and measure Search Console performance. Free checkers cover basics; paid suites scale research and monitoring.",
      },
      {
        question: "Which SEO tool is best for beginners?",
        answer:
          "Beginners should start with Google Search Console plus one free audit/checker and a simple keyword tool. Add a paid suite only when you need larger keyword databases or link data weekly.",
      },
      {
        question: "Free vs paid SEO tools?",
        answer:
          "Free tools are enough for audits, meta tags, and basic research. Paid tools win on depth of keyword indexes, historical backlinks, and competitor coverage, useful once you publish consistently.",
      },
    ],
  },
];

export function getPlatformToolBySlug(slug: string): PlatformToolDefinition | undefined {
  return PLATFORM_TOOLS.find((t) => t.slug === slug);
}
