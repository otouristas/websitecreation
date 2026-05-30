export interface HomeFaqItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * Single FAQ source for homepage schema + UI (Vite landing + Next positioning merged).
 */
export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    question: "What is AnotherSEOGuru?",
    answer:
      "AnotherSEOGuru is SEO software built around Google Search Console, with multi-model AI workflows and modules for clustering, tracking, audits, and LLM visibility. We also offer agency services when you want done-for-you execution.",
  },
  {
    question: "How does AnotherSEOGuru compare to Ahrefs or Semrush?",
    answer:
      "Those tools excel at large-scale keyword indexes and historical links. We focus on operational SEO: connecting your verified property, prioritizing queries and pages, clustering intent, and shipping a weekly backlog — plus optional AI execution. See our comparison pages for nuance.",
  },
  {
    question: "Do I need to connect Google Search Console?",
    answer:
      "Connecting Search Console unlocks queries, pages, and performance data in the workspace. Many recommendations assume that connection; some tools accept other inputs — check in-product for your use case.",
  },
  {
    question: "What AI models can I use?",
    answer:
      "The product integrates multiple providers (for example OpenAI, Anthropic, Google) depending on plan and feature. Exact models and availability are shown in the app.",
  },
  {
    question: "Can I use free tools without signing up?",
    answer:
      "Some utilities run on the marketing site; deeper generators and saved projects typically require an account. Many free-tool URLs route to the app for the full experience.",
  },
  {
    question: "Is the platform the same as your agency services?",
    answer:
      "No. The platform is self-serve software. Agency services are retainers for web design, local SEO, content, and campaigns — we can work alongside your in-house use of the product.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Export policies and retention are defined in the product terms at signup. Export important reports before you churn; we recommend treating the app as the system of record while active.",
  },
  {
    question: "Do you offer white-label reports?",
    answer:
      "Agency-oriented plans in the product may include client-ready reporting; confirm current plan details in-app. Our agency team can also deliver branded deliverables on retainer.",
  },
];
