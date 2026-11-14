import { PLATFORM_TOOLS_EL } from "./platform-tools-el";

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
    title: "Research the words your customers use",
    description:
      "Start with a product, a service or a set of searches from Search Console. Group similar phrases and choose which page should answer each group.",
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
    title: "Free SEO audit",
    description:
      "Check whether Google can index your pages, review Core Web Vitals and look for problems with titles or internal links. Use the findings to choose a first fix.",
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
    title: "Explore your Google Search Console data",
    description:
      "See which searches brought people to a page. Filter by country or device to find out where a rise or drop in clicks occurred.",
    primaryKeyword: "Google Search Console dashboard",
    appPath: "/dashboard",
  },
  {
    slug: "gsc-query-clustering",
    title: "Group related Search Console queries",
    description:
      "See which searches ask for the same thing in different words. Use each group to update an existing page or identify a subject your site has yet to cover.",
    primaryKeyword: "search console query clustering",
    appPath: "/keyword-clustering",
  },
  {
    slug: "semantic-keyword-clusters",
    title: "Build a topic plan from your keywords",
    description:
      "Paste your keyword list to group phrases by meaning. Use the groups to decide which topics deserve an article and which belong on the same landing page.",
    primaryKeyword: "semantic keyword clustering",
    appPath: "/keyword-clusters",
  },
  {
    slug: "llm-citation-tracking",
    title: "Track citations in AI answers",
    description:
      "Check whether an AI answer mentions your business or cites one of your pages. Return to the same questions to see how the sources change.",
    primaryKeyword: "LLM SEO citation tracker",
    appPath: "/llm-citations",
  },
  {
    slug: "seo-health-score",
    title: "Review your site’s SEO health",
    description:
      "Start with the overall score, then open the checks behind it to see which technical issues need attention first.",
    primaryKeyword: "SEO health score tool",
    appPath: "/seo-health",
  },
  {
    slug: "internal-linking-opportunities",
    title: "Find places to add internal links",
    description:
      "Find existing pages where a link would help a reader reach a related page. It’s a useful first check after publishing a new article.",
    primaryKeyword: "internal linking tool",
    appPath: "/internal-linking",
  },
  {
    slug: "ad-preview-tool",
    title: "Preview an ad before publishing",
    description:
      "See how a headline, image and link fit across Google, social ads and ChatGPT previews. Check for text that gets cut off before you publish.",
    primaryKeyword: "ad preview tool",
    appPath: "/tools/ad-preview",
    faqs: [
      {
        question: "How do I preview an ad before it goes live?",
        answer:
          "Paste your headlines, primary text, link and image into the ad preview tool. It draws the ad the way each platform shows it, cuts text where the platform cuts it and flags anything over a limit, so you fix it before the ad is rejected or truncated.",
      },
      {
        question: "What are the character limits for Google, Meta and TikTok ads?",
        answer:
          "Google Search headlines are 30 characters and descriptions 90. Facebook and Instagram show about 125 characters of primary text before \"See more\". TikTok ad text is capped at 100 characters, LinkedIn shows 150 before \"more\" and X allows 280.",
      },
      {
        question: "Can I see how my page appears in ChatGPT?",
        answer:
          "Yes. Inside AnotherSEOGuru the previews tool asks the question your buyers ask, answers it with live web sources and shows which sites ChatGPT style answers cite, with your site highlighted. You can also load real ChatGPT answers you track in AI visibility.",
      },
    ],
  },
  {
    slug: "free-seo-tools",
    title: "Free SEO checkers for individual pages",
    description:
      "Open the browser tools to check meta tags, schema or hreflang, prepare a robots.txt file, or review Core Web Vitals.",
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

export function getPlatformTool(slug: string, locale: "en" | "el" = "en"): PlatformToolDefinition | undefined {
  const tool = getPlatformToolBySlug(slug);
  if (!tool || locale !== "el") return tool;
  const el = PLATFORM_TOOLS_EL[slug];
  if (!el) return undefined;
  return { ...tool, title: el.title, description: el.description, primaryKeyword: el.primaryKeyword, faqs: el.faqs };
}
