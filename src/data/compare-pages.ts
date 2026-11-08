import { COMPARE_PAGES_EL } from "./compare-pages-el";

export interface ComparePageDefinition {
  readonly slug: string;
  readonly competitorName: string;
  readonly headline: string;
  /** SERP title (≤43 chars before the brand suffix), led by the "alternative" query people search. */
  readonly seoTitle: string;
  readonly summary: string;
  readonly whenChooseUs: readonly string[];
  readonly whenChooseThem: readonly string[];
  /** The query this page owns, when it is an "alternative" search. */
  readonly primaryKeyword?: string;
  /** Longer English body under the hero: a heading and paragraphs or a bullet list each. */
  readonly sections?: ReadonlyArray<{ readonly heading: string; readonly body?: string; readonly bullets?: readonly string[] }>;
  readonly faq?: ReadonlyArray<{ readonly q: string; readonly a: string }>;
}

export const COMPARE_PAGES: readonly ComparePageDefinition[] = [
  {
    slug: "ahrefs",
    competitorName: "Ahrefs",
    headline: "AnotherSEOGuru App vs Ahrefs",
    seoTitle: "Ahrefs Alternative: AnotherSEOGuru App",
    summary:
      "Ahrefs is a world-class link and keyword research suite. AnotherSEOGuru App is an Ahrefs alternative built around your Google Search Console reality plus AI execution workflows - ideal when your bottleneck is acting on GSC data, not exporting another CSV.",
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
    seoTitle: "Semrush Alternative: AnotherSEOGuru App",
    summary:
      "Semrush is a broad marketing suite with deep paid and content modules. AnotherSEOGuru App, a Semrush alternative for organic SEO, focuses on operations: GSC-native views, technical checks, rank tracking, and LLM visibility - with less surface noise.",
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
      "Search Console is free and essential, but it stops at observation. AnotherSEOGuru App adds clustering, health scoring, rank tracking, AI playbooks, and optional autopilot so observation turns into a prioritized backlog.",
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
  {
    slug: "agencyanalytics",
    competitorName: "AgencyAnalytics",
    headline: "AnotherSEOGuru App vs AgencyAnalytics",
    seoTitle: "AgencyAnalytics Alternative for SEO",
    primaryKeyword: "agencyanalytics alternative",
    summary:
      "AgencyAnalytics is a client reporting platform for marketing agencies that covers many channels. AnotherSEOGuru App is an AgencyAnalytics alternative for agencies whose work is SEO: white-label reports built from Google Search Console, plus the opportunities, tasks and client CRM that produce the results those reports show.",
    whenChooseUs: [
      "Your reports are mostly about organic search and you want them built from Search Console with no connectors to maintain",
      "You want the report and the work in one place: opportunities sized in clicks, tasks, then the monthly report",
      "You want reports that cost no credits to run, so adding a client does not add per-report cost",
    ],
    whenChooseThem: [
      "You report on many paid, social and call-tracking channels for every client in one dashboard",
      "Your team already runs its whole client reporting process there and it works",
    ],
    sections: [
      {
        heading: "The short answer",
        body: "If your agency sells SEO, the hard part of a monthly report is not the charts. It is explaining what changed, why, and what you will do next, then doing it. AnotherSEOGuru App puts those steps together: it reads each client's Search Console, lists the opportunities with an estimate of extra clicks, turns them into tasks, and builds a white-label report that includes the work you completed. If your agency reports on ten channels per client, a broad multi-channel reporting platform is the better fit.",
      },
      {
        heading: "What you get with AnotherSEOGuru App",
        bullets: [
          "White-label client reports: your logo, colour and agency name, with the client's logo",
          "Sections clients read: summary, KPIs, 13-month trend, ranking spread, top queries and pages, wins and losses, opportunities, completed work and next steps",
          "PDF download, email from the app, or a weekly or monthly schedule",
          "Opportunity engine with click-impact estimates, so every report ends with a sized plan",
          "Client CRM, pipeline and tasks next to each client's data",
          "Rank tracking, site audits, AI visibility (ChatGPT, Gemini, Perplexity) and content tools in the same workspace",
        ],
      },
      {
        heading: "How to switch",
        body: "Connect Google once with read-only access and every Search Console property your account can see is available. Set your branding, build one client's report for last month and compare it with the report you sent. Most agencies move one client first, then the rest once the numbers match.",
      },
    ],
    faq: [
      { q: "Is AnotherSEOGuru App a good AgencyAnalytics alternative?", a: "For SEO-focused agencies, yes: it builds white-label reports straight from Google Search Console and adds the opportunity, task and CRM tools that produce the results. For agencies that need many paid and social integrations in one dashboard, a multi-channel reporting platform fits better." },
      { q: "Does AnotherSEOGuru App have white-label reports?", a: "Yes. Reports carry your agency name, logo and colour, and can be downloaded as PDF, emailed or scheduled weekly or monthly. White-label branding is part of the Agency plan." },
      { q: "Can I try it before moving clients?", a: "Yes. The live demo opens the Reports screen on sample data without sign-up, and sign-up is free with Google." },
    ],
  },
  {
    slug: "whatagraph",
    competitorName: "Whatagraph",
    headline: "AnotherSEOGuru App vs Whatagraph",
    seoTitle: "Whatagraph Alternative for SEO Reporting",
    primaryKeyword: "whatagraph alternative",
    summary:
      "Whatagraph is a marketing reporting tool that blends data from many sources into reports and dashboards. AnotherSEOGuru App is a Whatagraph alternative built for SEO work: it reads Google Search Console, tells you what to fix and how many clicks it could add, and turns the result into a white-label client report.",
    whenChooseUs: [
      "Your clients pay you for SEO and want a report that explains organic results, not a wall of channel charts",
      "You want the report to come with a plan: opportunities, click estimates and next steps from the same data",
      "You want SEO tools (rank tracking, audits, AI visibility) in the same place as reporting",
    ],
    whenChooseThem: [
      "You need to blend many ad, social and analytics sources into cross-channel reports",
      "Your reporting is owned by a marketing team that builds custom dashboards for many channels",
    ],
    sections: [
      {
        heading: "The short answer",
        body: "Cross-channel reporting tools are built to collect data from many places. AnotherSEOGuru App is built to act on one: Google Search Console. It finds the queries close to page one, the snippets earning too few clicks and the pages losing traffic, sizes each in extra clicks, and then reports what changed in your client's brand. If SEO is what you sell, that is usually the report clients want.",
      },
      {
        heading: "What you get with AnotherSEOGuru App",
        bullets: [
          "White-label SEO reports from live Search Console data, no connectors to maintain",
          "Wins and losses with reasons, completed work and next steps in every report",
          "PDF, email or scheduled delivery, weekly or monthly",
          "Opportunity engine with click-impact estimates and one-click tasks",
          "Search Console features never use credits on any plan",
        ],
      },
    ],
    faq: [
      { q: "What is a good Whatagraph alternative for SEO agencies?", a: "If your reports are mainly about organic search, AnotherSEOGuru App builds white-label reports from Google Search Console and adds the SEO tools that produce the results. If you need many paid and social sources blended, a cross-channel tool fits better." },
      { q: "Does AnotherSEOGuru App connect to Google Analytics?", a: "Reports can include a Google Analytics sessions section next to the Search Console data." },
    ],
  },
  {
    slug: "dashthis",
    competitorName: "DashThis",
    headline: "AnotherSEOGuru App vs DashThis",
    seoTitle: "DashThis Alternative for SEO Agencies",
    primaryKeyword: "dashthis alternative",
    summary:
      "DashThis is a dashboard tool for marketing reports. AnotherSEOGuru App is a DashThis alternative for SEO: instead of a dashboard you configure, it reads Google Search Console, tells you what to do next and builds a white-label monthly report with the work you completed.",
    whenChooseUs: [
      "You want an SEO report with a written summary, reasons and next steps, not only charts",
      "You want to manage the SEO work itself in the same place as the reporting",
      "You manage many Search Console properties and switch between clients all day",
    ],
    whenChooseThem: [
      "You want a simple dashboard of many marketing channels for each client",
      "Your clients prefer a live dashboard link over a monthly written report",
    ],
    sections: [
      {
        heading: "The short answer",
        body: "A dashboard shows numbers; a report explains them. AnotherSEOGuru App builds the explanation from Search Console data: wins and losses with reasons, the ranking spread, opportunities sized in clicks and the work you shipped. It also gives you the tools to do that work: rank tracking, site audits, content briefs and AI visibility tracking.",
      },
      {
        heading: "What you get with AnotherSEOGuru App",
        bullets: [
          "White-label monthly SEO reports, PDF or scheduled email",
          "A 13-month clicks trend, so seasonality is obvious",
          "Opportunities with click estimates in every report",
          "Client CRM, pipeline and tasks for agencies",
        ],
      },
    ],
    faq: [
      { q: "Is AnotherSEOGuru App a DashThis alternative?", a: "For SEO agencies, yes. It builds white-label SEO reports from Search Console with a written summary and next steps, and adds SEO tools. For multi-channel dashboards, a dashboard tool fits better." },
    ],
  },
];

export function getComparePageBySlug(slug: string): ComparePageDefinition | undefined {
  return COMPARE_PAGES.find((c) => c.slug === slug);
}

/** English page, or the Greek overlay when locale is el. Missing Greek is undefined. */
export function getComparePage(slug: string, locale: "en" | "el" = "en"): ComparePageDefinition | undefined {
  const page = getComparePageBySlug(slug);
  if (!page || locale !== "el") return page;
  const el = COMPARE_PAGES_EL[slug];
  if (!el) return undefined;
  return {
    ...page,
    competitorName: el.competitorName,
    headline: el.headline,
    seoTitle: el.seoTitle,
    summary: el.summary,
    whenChooseUs: el.whenChooseUs,
    whenChooseThem: el.whenChooseThem,
    sections: el.sections,
    faq: el.faq,
  };
}
