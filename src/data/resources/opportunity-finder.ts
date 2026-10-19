import type { Block } from "@/data/help";

/** The explanation under the free tool, shared by the page and its Markdown twin. */
export const OPPORTUNITY_FINDER_BLOCKS: ReadonlyArray<Block> = [
  { type: "h2", id: "what-it-finds", text: "What it finds" },
  {
    type: "table",
    head: ["Opportunity", "Rule", "Estimate"],
    rows: [
      ["Striking distance", "Non-brand query at positions 4–20 with at least about 150 impressions per 28 days", "Clicks at position 3 (from page one) or 8 (from page two), scaled to the query's own CTR, minus clicks today"],
      ["Low CTR", "Non-brand query in the top 10 with at least about 300 impressions per 28 days, earning under 60% of the CTR its position usually earns", "Half of the gap between expected and actual clicks: a rewrite rarely recovers all of it"],
    ],
  },
  {
    type: "p",
    text: "Each query appears once, under its bigger opportunity, ranked by estimated clicks × confidence ÷ effort. These are the same thresholds and formulas as two of the five detectors in AnotherSEOGuru App's [Opportunities](/help/opportunities-tasks/opportunities) screen.",
  },
  { type: "h2", id: "curve", text: "Whose CTR curve?" },
  {
    type: "p",
    text: "Yours, where your data allows. The tool groups your non-brand queries by position, takes the median CTR of rows with at least 30 impressions, and blends it with a baseline curve wherever a position has few rows. The baseline and the reasoning are in [organic CTR by position](/en/resources/ctr-by-position).",
  },
  { type: "h2", id: "export", text: "How to export from Search Console" },
  {
    type: "steps",
    howTo: { name: "Export Search Console queries for the opportunity finder", description: "Download the Queries.csv file from Google Search Console's Performance report." },
    items: [
      { title: "Open the Performance report", text: "In Search Console, choose the property, then Performance → Search results." },
      { title: "Set the date range", text: "Last 3 months is a good default. Pick the same range in the tool." },
      { title: "Export", text: "Click Export → Download CSV. Search Console downloads a zip file." },
      { title: "Upload Queries.csv", text: "Unzip it and choose Queries.csv above. Pages.csv works too, to see pages instead of queries." },
    ],
  },
  { type: "h2", id: "limits", text: "What it cannot do" },
  {
    type: "list",
    items: [
      "**More than 1,000 rows.** The Search Console interface exports at most 1,000 queries. The long tail needs the API.",
      "**Decay and cannibalization.** Both need data the export does not have: a comparison period per page, and queries joined to pages.",
      "**Tell you why.** It sizes the opportunity; reading the results page and the ranking page is still your job. [SEO quick wins](/en/resources/seo-quick-wins) and [high impressions, low CTR](/en/resources/high-impressions-low-ctr) cover the fixes.",
    ],
  },
  {
    type: "faq",
    items: [
      { q: "Is the Search Console opportunity finder free?", a: "Yes, with no sign-up and no email. It runs in your browser and the file you choose is never uploaded." },
      { q: "How accurate are the click estimates?", a: "They are estimates of the size of the prize, built from your own impressions, positions and CTR. Use them to decide what to work on first. The forecast shows a conservative, expected and ceiling figure for that reason." },
      { q: "Why are my brand queries excluded?", a: "People searching your name click at rates no curve predicts, and better SEO rarely changes them. Including them would inflate both the curve and the forecast." },
      { q: "Can it read an export in another language?", a: "Yes. It reads the columns by position when the headers are not in English, and accepts decimal commas and percentages." },
    ],
  },
];
