import type { ResourceArticle } from "./types";

const PUBLISHED = "2026-10-19";

export const SEARCH_CONSOLE_ARTICLES: ReadonlyArray<ResourceArticle> = [
  {
    slug: "search-console-analysis",
    cluster: "search-console",
    kind: "pillar",
    title: "How to analyze Google Search Console data: five questions that find the work",
    seoTitle: "How to Analyze Google Search Console Data",
    description:
      "A repeatable way to analyze Search Console: what changed, where the demand is, what underperforms, where pages compete and what is missing, with the filter for each.",
    primaryKeyword: "google search console analysis",
    secondaryKeywords: ["how to analyze google search console data", "search console performance report", "search console data", "impressions vs clicks"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**Analyzing Google Search Console means turning the Performance report into a short list of changes worth making.** Most people stop at the chart. A useful analysis asks five questions in order: what changed, where the demand is, what underperforms for its position, where your own pages compete, and what people search for that you have no good page for. Each question maps to one filter or comparison in Search Console, and each answer ends in a concrete fix.",
      },
      { type: "h2", id: "basics", text: "The four metrics, read correctly" },
      {
        type: "table",
        head: ["Metric", "What it really measures", "Common misreading"],
        rows: [
          ["Impressions", "How often a result of yours was shown, whether or not it was scrolled into view", "“People saw us 50,000 times”"],
          ["Clicks", "Clicks from Google Search to your site", "Expecting it to match sessions in Analytics"],
          ["CTR", "Clicks ÷ impressions", "Comparing CTR across positions"],
          ["Average position", "Your top position per search, averaged and weighted by impressions", "Treating it as a rank on one results page"],
        ],
      },
      {
        type: "p",
        text: "Two consequences matter for analysis. First, impressions and clicks move for reasons other than your rankings: demand, seasonality and results-page layout. Second, totals at the top of the report include anonymized queries that the query table hides, so the rows never add up to the total.",
      },
      { type: "h2", id: "q1", text: "1. What changed, and why?" },
      {
        type: "p",
        text: "Turn on **Compare** in the date filter: the last 28 days against the previous 28, or the last 3 months against the same 3 months a year ago if your business is seasonal. On the Pages tab, sort by click difference. A page that lost clicks lost them for one of three reasons, and the columns tell you which.",
      },
      {
        type: "table",
        head: ["Pattern", "Most likely cause", "Next step"],
        rows: [
          ["Position fell", "Rankings slipped", "Check what now outranks you; refresh the page"],
          ["Impressions fell, position held", "Demand fell", "Check last year's same period before touching the page"],
          ["CTR fell, position held", "Something above you takes the click", "Look at the live results page; rewrite the snippet"],
        ],
      },
      {
        type: "p",
        text: "If the whole site dropped at once, follow the [organic traffic drop diagnosis](/en/resources/organic-traffic-drop) instead.",
      },
      { type: "h2", id: "q2", text: "2. Where is the demand you already have?" },
      {
        type: "p",
        text: "Sort Queries by impressions and remove brand queries. The top of that list is your real non-brand demand. Queries ranking between 4 and 20 are the cheapest clicks you can win, because Google already finds your page relevant. [SEO quick wins](/en/resources/seo-quick-wins) explains how to push them.",
      },
      { type: "h2", id: "q3", text: "3. What underperforms for its position?" },
      {
        type: "p",
        text: "Compare each top-10 query's CTR with the CTR its position usually earns. A query far below the curve is losing clicks to a better snippet or a results-page feature. The curve is in [CTR by position](/en/resources/ctr-by-position) and the fixes are in [high impressions, low CTR](/en/resources/high-impressions-low-ctr).",
      },
      { type: "h2", id: "q4", text: "4. Where do your own pages compete?" },
      {
        type: "p",
        text: "Click an important query and open the Pages tab. More than one URL with meaningful impressions means Google is unsure which page answers it. That split usually costs positions. [Keyword cannibalization](/en/resources/keyword-cannibalization) shows how to confirm it and which of four fixes to use.",
      },
      { type: "h2", id: "q5", text: "5. What is missing?" },
      {
        type: "p",
        text: "Look for queries with impressions where the ranking page is only loosely related: your pricing page ranking 30th for a how-to question, or the homepage ranking for a specific use case. That is demand Google already associates with you, without a page built for it. Those are your first new articles.",
      },
      { type: "h2", id: "filters", text: "Filters that make the analysis faster" },
      {
        type: "list",
        items: [
          "**Exclude brand:** Query → Custom (regex) → Doesn't match regex. Patterns are in [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
          "**Questions only:** a regex such as `^(how|what|why|when|which|can|does|is)\\b` finds informational queries.",
          "**One section:** Page → URLs containing `/blog/` to analyze content separately from product pages.",
          "**Mobile versus desktop:** the Devices tab, compared, shows whether a drop is device-specific.",
        ],
      },
      {
        type: "note",
        tone: "info",
        text: "The Search Console interface shows at most 1,000 rows per table. For larger sites, use the Search Console API, the Bulk Data Export to BigQuery, or a tool that pages through the API. AnotherSEOGuru App loads up to 100,000 rows per period.",
      },
      { type: "h2", id: "routine", text: "Make it a routine" },
      {
        type: "p",
        text: "The five questions take about an hour once you know the filters. Doing them weekly beats doing them perfectly once a quarter. Our [one-hour weekly Search Console loop](/en/blog/gsc-weekly-ops-playbook) is a ready-made agenda, and the [SEO forecasting](/en/resources/seo-forecasting) method turns what you find into a ranked plan.",
      },
      { type: "h2", id: "cluster", text: "In this guide" },
      {
        type: "cards",
        cols: 3,
        items: [
          { title: "High impressions, low CTR", text: "Why pages are seen but not clicked, and the fixes in order.", href: "/en/resources/high-impressions-low-ctr", icon: "search" },
          { title: "Branded vs non-branded keywords", text: "How to split them in Search Console with regex.", href: "/en/resources/branded-vs-non-branded-keywords", icon: "key" },
          { title: "Keyword cannibalization", text: "Confirm it in Search Console and pick the right fix.", href: "/en/resources/keyword-cannibalization", icon: "layers" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How often should I analyze Search Console?", a: "A short weekly check for changes and a deeper monthly pass through all five questions works for most sites. Daily checks only make sense during a migration, a launch or a Google core update." },
          { q: "Why don't Search Console clicks match Google Analytics sessions?", a: "They count different things. Search Console counts clicks on Google results; Analytics counts sessions that it could record, which depends on consent, tracking and how sessions are attributed. Expect the trends to agree, not the numbers." },
          { q: "What date range should I use?", a: "Three months for analysis of current rankings, with a comparison period. Up to 16 months when you need to see seasonality, which is the most Search Console keeps." },
          { q: "Is average position reliable?", a: "It is reliable as a trend and for comparing queries, not as an exact rank. It averages your top position across every search where you appeared, so one query can rank differently by country, device and day." },
        ],
      },
    ],
  },
  {
    slug: "high-impressions-low-ctr",
    cluster: "search-console",
    kind: "article",
    title: "High impressions, low CTR: why Google shows you but nobody clicks",
    seoTitle: "High Impressions, Low CTR: Causes and Fixes",
    description:
      "Seven reasons a page gets impressions without clicks, how to tell which one applies in Search Console, and the fix for each, from position to snippet to intent.",
    primaryKeyword: "high impressions low ctr",
    secondaryKeywords: ["low ctr", "how to increase ctr", "improve ctr", "impressions but no clicks"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**High impressions with a low CTR usually means one of two things: you rank too low for the impressions to turn into clicks, or you rank well but something on the results page takes the click first.** The fix depends entirely on which. Check the average position before you touch a title: below about position 10, CTR is low by nature and the job is ranking higher; in the top 10, a CTR far under what the position usually earns is a snippet or results-page problem.",
      },
      { type: "h2", id: "diagnose", text: "Diagnose it in two minutes" },
      {
        type: "steps",
        items: [
          { title: "Find the rows", text: "Performance → Queries, last 3 months, sorted by impressions. Exclude brand queries." },
          { title: "Check position first", text: "If the average position is above 10, stop here: this is a ranking problem. See [SEO quick wins](/en/resources/seo-quick-wins)." },
          { title: "Compare CTR with the curve", text: "For top-10 queries, compare CTR with the CTR the position usually earns in [CTR by position](/en/resources/ctr-by-position). Under about 60% of it is worth fixing." },
          { title: "Look at the live results page", text: "Search the query in a private window, on mobile as well as desktop. What sits above you and what do the other titles promise?" },
        ],
      },
      { type: "h2", id: "causes", text: "The seven causes and their fixes" },
      {
        type: "table",
        head: ["Cause", "How you recognize it", "Fix"],
        rows: [
          ["Position too low", "Average position 11+", "Improve the page and its internal links; the snippet is not the issue"],
          ["AI Overview or featured snippet above you", "Position held, CTR fell; the box is visible on the results page", "Answer the question in one quotable paragraph near the top; aim to be a cited source"],
          ["Ads, shopping or map pack above you", "Commercial or local query; organic results start below the fold", "Accept a lower CTR, or target the long-tail versions of the query"],
          ["Weak title", "Generic title; competitors' titles are more specific", "Lead with the query's words and a concrete outcome or number"],
          ["Description that does not answer", "Google rewrites it, or it is a list of keywords", "Write a one-sentence answer plus a reason to click"],
          ["Intent mismatch", "Query wants a list, tool or price; your page is an essay", "Change the page format, or target a different query with this page"],
          ["Inflated impressions", "Huge impressions at deep positions from a single day or image results", "Check the date and Search appearance; it may not be a problem at all"],
        ],
      },
      { type: "h2", id: "titles", text: "Rewriting the title and description" },
      {
        type: "p",
        text: "Google may rewrite your title, but it starts from yours far more often than not. A title that wins clicks does three things: it uses the words of the query near the start, it makes one specific promise, and it differs from the nine results around it.",
      },
      {
        type: "table",
        head: ["", "Before", "After"],
        rows: [
          ["Title", "Invoicing Guide | Brand", "How to Invoice as a Freelancer (Free Template + Examples)"],
          ["Description", "Read our guide to invoicing, invoices and invoice software for freelancers.", "What to put on a freelance invoice, when to send it and how to get paid on time. Includes a free template you can copy."],
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "Change one variable at a time and note the date. Compare the same number of days before and after the change, and allow a week or two for Google to recrawl. Otherwise you cannot tell what worked.",
      },
      { type: "h2", id: "ai-overviews", text: "When an AI Overview takes the click" },
      {
        type: "p",
        text: "If your position is stable but CTR has dropped, and the results page now opens with an AI Overview, the lost clicks are mostly not coming back through the snippet. The useful goal changes: be one of the sources the overview cites. That rewards a direct answer in the first paragraph, clear headings phrased like questions, and facts other pages do not have. The [anatomy of a page built for AI search](/en/resources/ai-search-page-anatomy) covers the structure, and the free [AI visibility check](/en/ai-visibility-check) shows what Google's AI Overview and ChatGPT answer for a keyword.",
      },
      { type: "h2", id: "at-scale", text: "Finding every low-CTR query at once" },
      {
        type: "p",
        text: "Doing this row by row works for ten queries. For a full site, upload your Search Console export to the free [opportunity finder](/en/resources/search-console-opportunity-finder): it learns your own CTR curve and lists every top-10 query clicking far below it, with the clicks a rewrite could add.",
      },
      {
        type: "faq",
        items: [
          { q: "What is a good CTR in Search Console?", a: "One at or above what your position usually earns for that kind of query. Your site's average CTR is not a useful benchmark, because it mixes brand queries, page-one and page-two rankings." },
          { q: "Why do I have impressions but zero clicks?", a: "Usually because the query ranks on page two or deeper, where very few people scroll. Impressions there are counted whenever your result loads, even if nobody sees it." },
          { q: "Does adding the year to a title increase CTR?", a: "It can for queries where freshness matters, such as tools, prices and rules that change. Only add it if the page is genuinely updated for that year, and update the title when the year changes." },
          { q: "How long until a new title affects CTR?", a: "As soon as Google recrawls the page, often within days for pages that are crawled frequently. Judge the change after two to four weeks of data." },
        ],
      },
    ],
  },
  {
    slug: "branded-vs-non-branded-keywords",
    cluster: "search-console",
    kind: "article",
    title: "Branded vs non-branded keywords: how to split them in Search Console",
    seoTitle: "Branded vs Non-Branded Keywords + Regex",
    description:
      "Why every SEO report should separate branded and non-branded search, the regex to do it in Google Search Console, and the edge cases that make the split wrong.",
    primaryKeyword: "branded vs non branded keywords",
    secondaryKeywords: ["branded keywords", "non branded keywords", "search console regex", "google search console regex"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**Branded keywords contain your company or product name; non-branded keywords do not.** The split matters because the two behave differently: branded search measures demand you created elsewhere (ads, word of mouth, sales), while non-branded search measures what SEO actually wins. In Google Search Console you separate them with a query filter set to **Custom (regex)**, using a pattern of your brand names and their common misspellings.",
      },
      { type: "h2", id: "why", text: "Why the split changes your conclusions" },
      {
        type: "list",
        items: [
          "**Brand clicks hide SEO problems.** A TV campaign can lift branded clicks while non-branded clicks fall, and the total looks fine.",
          "**Brand CTR distorts benchmarks.** Branded queries click at rates no CTR curve predicts, so they make every average look better than it is.",
          "**Brand is not what you sell in a report.** Clients and managers want to know what SEO earned. Non-branded growth is that number.",
        ],
      },
      { type: "h2", id: "regex", text: "The regex filter in Search Console" },
      {
        type: "steps",
        howTo: { name: "Filter branded queries out of Google Search Console", description: "Use a custom regex query filter to separate branded and non-branded search." },
        items: [
          { title: "Open the filter", text: "Performance → Search results → Add filter → Query." },
          { title: "Choose Custom (regex)", text: "Pick **Matches regex** to see branded queries, or **Doesn't match regex** to see non-branded ones." },
          { title: "Paste the pattern", text: "Use one of the patterns below, adapted to your names." },
          { title: "Check the result", text: "Open the Queries tab and scan the first hundred rows for anything misclassified. Adjust the pattern before you trust the totals." },
        ],
      },
      {
        type: "code",
        lang: "regex",
        title: "One brand name, with spacing and common typos",
        text: "(?i)acme\\s?books|acmebook|acme\\s?bokks|akme\\s?books",
      },
      {
        type: "code",
        lang: "regex",
        title: "Several brands and products",
        text: "(?i)\\b(acme|acme\\s?books|ledgerly|invoice\\s?pilot)\\b",
      },
      {
        type: "code",
        lang: "regex",
        title: "A Greek brand written in Greek and Latin letters",
        text: "(?i)(ακμε|ακμή|akme|acme)",
      },
      {
        type: "note",
        tone: "info",
        text: "Search Console uses RE2 regex syntax, which does not support lookaheads or lookbehinds. `(?i)` makes a pattern case-insensitive. Keep patterns short and test them on the Queries tab.",
      },
      { type: "h2", id: "misspellings", text: "Finding the misspellings you forgot" },
      {
        type: "p",
        text: "Filter Queries with **Matches regex** and only the first three or four letters of your name, for example `(?i)acm|akm`. Sort by impressions. The variants people actually type will be near the top, and the ones you did not expect are usually the most useful to add.",
      },
      { type: "h2", id: "edge-cases", text: "Edge cases that make the split wrong" },
      {
        type: "table",
        head: ["Case", "Problem", "What to do"],
        rows: [
          ["Your brand is a common word", "“Notion” or “Apple” also match generic searches", "Match the brand with a category word, such as `notion\\s?templates?`"],
          ["Brand plus category", "“acme invoicing software” is branded but shows category demand", "Count it as branded, and track it separately if it grows"],
          ["Competitor brands", "“acme alternative” or “vs” queries are non-branded for you but high intent", "Keep them non-branded and report them as a commercial group"],
          ["Product names", "Product names may not contain the company name", "Add each product name to the pattern"],
          ["Founder names", "People search the founder's name with the company", "Decide once and keep it consistent across reports"],
        ],
      },
      { type: "h2", id: "report", text: "Using the split in reporting" },
      {
        type: "p",
        text: "Report non-branded clicks and impressions as the headline SEO metric, with branded shown alongside for context. A month where branded rises and non-branded falls is a month where SEO needs attention, whatever the total says. The [SEO report template](/en/resources/seo-report-template) puts both on the first page.",
      },
      {
        type: "p",
        text: "In AnotherSEOGuru App, brand and non-brand are quick filters on every query table, and the opportunity engine leaves brand queries out of striking-distance estimates automatically. The free [opportunity finder](/en/resources/search-console-opportunity-finder) asks for your brand names for the same reason.",
      },
      {
        type: "faq",
        items: [
          { q: "What are branded keywords?", a: "Search queries that include your company, product or service brand name, including misspellings. People searching them already know you." },
          { q: "What are non-branded keywords?", a: "Queries that describe a problem, product category or topic without naming you. They measure how well you compete for people who do not know you yet." },
          { q: "What share of traffic should be non-branded?", a: "There is no universal healthy ratio; it depends on how well known the brand is and how much it advertises. Track the trend of non-branded clicks over time rather than the share." },
          { q: "Is the regex filter case-sensitive?", a: "Start the pattern with (?i) to make it case-insensitive. Search Console stores most queries in lower case, but the flag avoids surprises." },
        ],
      },
    ],
  },
  {
    slug: "keyword-cannibalization",
    cluster: "search-console",
    kind: "article",
    title: "How to find and fix keyword cannibalization with Search Console",
    seoTitle: "How to Fix Keyword Cannibalization",
    description:
      "Confirm keyword cannibalization in Google Search Console, tell harmful overlap from harmless overlap, and choose between merging, redirecting, re-targeting and relinking.",
    primaryKeyword: "how to fix keyword cannibalization",
    secondaryKeywords: ["keyword cannibalization checker", "find keyword cannibalization", "seo cannibalization"],
    cta: "direct",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**Keyword cannibalization is harmful when two or more of your pages split impressions for the same query and the ranking page keeps changing, so neither ranks as well as one strong page would.** You confirm it in Search Console by opening the query and checking the Pages tab, then comparing over time. The fix is usually to pick one page and consolidate the rest into it, but not every overlap needs fixing. The [glossary entry](/en/glossary/keyword-cannibalization) has the short definition; this page is about the work.",
      },
      { type: "h2", id: "harmful", text: "Harmful or harmless?" },
      {
        type: "table",
        head: ["Signal", "Probably harmless", "Probably harmful"],
        rows: [
          ["Who gets the impressions", "One page gets almost all of them", "Two pages each get a large share"],
          ["Ranking page over time", "Stable", "Swaps week to week"],
          ["Positions", "Both pages rank in the top 5 (you hold two results)", "Both sit between 8 and 30"],
          ["Intent", "The pages answer different intents", "The pages answer the same question"],
        ],
      },
      { type: "h2", id: "find", text: "Finding it in Search Console" },
      {
        type: "steps",
        howTo: { name: "Find keyword cannibalization in Google Search Console", description: "Check whether several of your pages compete for the same query." },
        items: [
          { title: "Start from important queries", text: "Performance → Queries, last 3 months, non-brand, sorted by impressions. The [Search Console analysis guide](/en/resources/search-console-analysis) shows how to set up the brand filter and the comparison." },
          { title: "Open one query", text: "Click it, then switch to the Pages tab. Note every URL with meaningful impressions." },
          { title: "Check over time", text: "With the query filter still on, compare month by month. If the top page changes between periods, Google is undecided." },
          { title: "Repeat from the page side", text: "Filter by one page, open Queries, and look for the queries where a sibling page also ranks." },
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "This is slow for more than a handful of queries, because the interface shows one query at a time. Query-and-page data from the Search Console API shows every overlap at once; AnotherSEOGuru App's cannibalization detector runs on that data and lists each query with the pages competing for it.",
      },
      { type: "h2", id: "fix", text: "Choosing the fix" },
      {
        type: "table",
        head: ["Situation", "Fix", "Keep in mind"],
        rows: [
          ["Two pages say the same thing", "Merge into the stronger page and 301 redirect the other", "Move the unique, useful parts; update internal links to the new URL"],
          ["Pages serve different intents but overlap in wording", "Re-target the weaker page to its own query", "Change its title, H1 and opening to its own intent"],
          ["One page should win, the other must stay (e.g. a product page)", "Relink: point internal links with the query as anchor to the winner", "Remove the query from the other page's title and headings"],
          ["Near-duplicate variants (filters, parameters, print versions)", "Canonical to the main URL, or noindex", "Canonical is a hint, not a command; check that Google follows it"],
        ],
      },
      { type: "h2", id: "pick-winner", text: "Which page should win?" },
      {
        type: "list",
        items: [
          "The one with more clicks over the last 3 months for the query family, not only for the one query.",
          "The one with more external links pointing at it.",
          "The one whose format matches what ranks: a list for list queries, a tool for tool queries.",
          "When in doubt, the older URL, since it has the longer history.",
        ],
      },
      { type: "h2", id: "after", text: "After the fix" },
      {
        type: "p",
        text: "Record the date. Check the query's Pages tab after two to four weeks: one URL should hold most of the impressions and the position should improve. Compare the winning page's clicks with the same number of days before the change. If the old URL still appears, check that the redirect works and that your sitemap and internal links no longer point at it.",
      },
      {
        type: "p",
        text: "Cannibalization often shows up as a slow slide rather than a sudden drop, so it belongs in your [content decay](/en/resources/content-decay) review too. Once one page owns the query, it is often a [striking-distance quick win](/en/resources/seo-quick-wins) worth pushing into the top 3.",
      },
      {
        type: "faq",
        items: [
          { q: "Is it bad to have two pages ranking for the same keyword?", a: "Not if both rank near the top and serve different intents; holding two results can be an advantage. It is a problem when both rank lower than one page would and Google keeps switching between them." },
          { q: "Can I fix cannibalization with a canonical tag?", a: "Only for near-duplicate pages. For two distinct articles, a canonical tag is often ignored. Merging and redirecting is more reliable." },
          { q: "How long does it take to recover after merging pages?", a: "Usually a few weeks, once Google has recrawled both URLs and followed the redirect. Larger sites with infrequent crawling can take longer." },
          { q: "Is there a free keyword cannibalization checker?", a: "Search Console itself, one query at a time, as described above. For the whole site at once you need query-and-page data from the API, which tools such as AnotherSEOGuru App read for you." },
        ],
      },
    ],
  },
];
