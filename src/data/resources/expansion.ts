import type { ResourceArticle } from "./types";

const PUBLISHED = "2026-10-19";

/**
 * Days 31-60 expansion: a roadmap template (forecasting), a content audit (traffic drops)
 * and two AI visibility articles (zero-click searches, AI Overview tracking).
 */
export const EXPANSION_ARTICLES: ReadonlyArray<ResourceArticle> = [
  {
    slug: "seo-roadmap",
    cluster: "forecasting",
    kind: "article",
    title: "SEO roadmap: a 90-day and 12-month plan built from Search Console data",
    seoTitle: "SEO Roadmap Template: 90-Day and 12-Month Plan",
    description:
      "Build an SEO roadmap from your own Search Console data: a scoring table, a 90-day sprint plan, a 12-month view and a copyable SEO strategy template.",
    primaryKeyword: "seo roadmap",
    secondaryKeywords: ["seo strategy template", "seo plan template", "seo action plan", "seo roadmap template"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**An SEO roadmap is a dated, ranked list of the SEO work you will ship, with an owner, an estimated click impact and a way to measure each item.** The most defensible way to build one is from your own Google Search Console data: list every candidate fix the data points to, size each in clicks, score it by impact, confidence and effort, then put the top items into a 90-day plan and the bigger themes into a 12-month view. A roadmap that cannot say why item one comes before item ten is a wish list.",
      },
      {
        type: "note",
        tone: "info",
        text: "Strategy, plan, roadmap and action plan get used interchangeably. On this page the **strategy** is the goal and the few bets that serve it, the **roadmap** is the sequence of work over 12 months, and the **action plan** is the next 90 days broken into tasks. The template below holds all three in one document.",
      },
      { type: "h2", id: "what-goes-in", text: "What an SEO roadmap contains" },
      {
        type: "table",
        head: ["Part", "What it says", "Where it comes from"],
        rows: [
          ["Goal", "One measurable outcome, such as non-brand clicks to product pages", "The business, not the SEO tool"],
          ["Baseline", "Where that metric is today and where it goes with no new work", "12 months of Search Console clicks by month"],
          ["Workstreams", "Three to five themes: quick wins, content, technical, authority, measurement", "Grouping of the candidate work"],
          ["Items", "Specific changes to specific URLs", "Search Console queries and pages, the site audit"],
          ["Estimate", "Clicks a month if the item works, and a confidence weight", "Impressions × CTR gap, see [SEO forecasting](/en/resources/seo-forecasting)"],
          ["Owner and date", "Who ships it and in which sprint", "Your team's real capacity"],
          ["Measure", "How you will know it worked", "Before and after clicks against the rest of the site"],
        ],
      },
      { type: "h2", id: "inputs", text: "The Search Console exports you need" },
      {
        type: "list",
        items: [
          "**Clicks by month for the last 16 months** (Performance → Date → Export). This is the baseline and it shows seasonality.",
          "**Queries for the last three months** with clicks, impressions, CTR and position. Remove brand queries first with a regex, as explained in [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
          "**Pages, last three months compared with the previous three** (or the same months last year for seasonal sites). This surfaces decaying pages.",
          "**Indexing → Pages** for URLs that should rank but are excluded.",
          "**A list of what you shipped last year**, if you have one. It tells you which kinds of work paid back on this site.",
        ],
      },
      { type: "h2", id: "build", text: "How to build the roadmap, step by step" },
      {
        type: "steps",
        howTo: { name: "Build an SEO roadmap from Search Console data", description: "Turn Search Console exports into a scored, dated SEO plan for the next 90 days and 12 months." },
        items: [
          {
            title: "Write the goal and the baseline",
            text: "Pick one metric the business already cares about, usually non-brand clicks to pages that convert. Project the baseline forward from last year's months so you can later tell your work apart from seasonality.",
          },
          {
            title: "Collect candidate work from the data",
            text: "Go through five sources: queries ranking 4 to 20 with real demand ([striking distance](/en/resources/seo-quick-wins)), page-one results with a CTR far below their position ([high impressions, low CTR](/en/resources/high-impressions-low-ctr)), pages losing clicks ([content decay](/en/resources/content-decay)), queries split between two of your URLs ([keyword cannibalization](/en/resources/keyword-cannibalization)) and queries you get impressions for without a good page. Add technical blockers from the indexing report.",
          },
          {
            title: "Size each item in clicks",
            text: "For an existing query: impressions × (CTR at the target position minus today's CTR). Use a realistic next step, not position 1. The curve is on [CTR by position](/en/resources/ctr-by-position). For new content, use keyword volume and discount it harder.",
          },
          {
            title: "Score impact, confidence and effort",
            text: "Score = estimated clicks × confidence ÷ effort. Confidence is a probability from 0.2 to 0.8. Effort is in days. The scoring table below shows how this ranks a mixed list.",
          },
          {
            title: "Fill the first 90 days to real capacity",
            text: "Count the days your team actually has, subtract a quarter for interruptions, and fill them from the top of the scored list. Anything that does not fit goes to the 12-month view, not into a crowded sprint.",
          },
          {
            title: "Group the rest into quarterly themes",
            text: "The 12-month view should be themes with a rough size, not 200 dated tasks. You will re-score them every quarter with fresh data.",
          },
          {
            title: "Decide how each item is measured",
            text: "Write the URL, the ship date and the comparison window next to each item. Compare the same number of days before and after, and the rest of the site over the same days as a control.",
          },
        ],
      },
      { type: "h2", id: "prioritization", text: "A prioritization table that ranks mixed work" },
      {
        type: "p",
        text: "The point of scoring is to compare unlike things: a title rewrite, a new guide and a site migration fix. Worked example (hypothetical numbers):",
      },
      {
        type: "table",
        head: ["Item", "Est. clicks / month", "Confidence", "Effort (days)", "Score", "Rank"],
        rows: [
          ["Rewrite titles on 8 page-one URLs with low CTR", "320", "0.6", "1", "192", "1"],
          ["Push 5 striking-distance queries (internal links, sections)", "540", "0.5", "4", "68", "2"],
          ["Merge two pages splitting “pricing calculator”", "210", "0.6", "2", "63", "3"],
          ["Refresh 3 decaying guides", "380", "0.5", "6", "32", "4"],
          ["Fix 40 product pages excluded as duplicates", "450", "0.4", "8", "23", "5"],
          ["New guide for an untargeted topic", "600", "0.25", "8", "19", "6"],
        ],
      },
      {
        type: "p",
        text: "The new guide has the biggest raw number and ranks last, which is usually right: you do not know where it will rank, and it takes the longest. Our [query prioritization framework](/en/blog/gsc-query-prioritization-framework) goes deeper into scoring individual queries, and the free [Search Console opportunity finder](/en/resources/search-console-opportunity-finder) produces the first three rows of a table like this from your export.",
      },
      { type: "h2", id: "template", text: "The SEO strategy template" },
      {
        type: "p",
        text: "Copy this into a document or a project tool. Keep it to one page for the strategy and one table per quarter. A roadmap nobody opens after the kickoff is not a roadmap.",
      },
      {
        type: "code",
        lang: "markdown",
        title: "SEO roadmap and strategy template: copy this",
        text: [
          "# SEO roadmap: [Site] · [Start date] to [End date]",
          "",
          "## 1. Strategy (one page)",
          "- Goal: [Metric] from [baseline] to [target] by [date].",
          "- Baseline with no new work: [number] (projected from the same months last year).",
          "- Bets: [2-3 sentences: where the growth will come from and why this site can win it].",
          "- Not doing this year: [what you are explicitly leaving out].",
          "",
          "## 2. Workstreams",
          "| Workstream | Why | Owner | Share of capacity |",
          "|---|---|---|---|",
          "| Quick wins (CTR, striking distance) | [reason] | [name] | [x]% |",
          "| Content (refresh, new pages) | [reason] | [name] | [x]% |",
          "| Technical (indexing, speed, structure) | [reason] | [name] | [x]% |",
          "| Authority (links, mentions) | [reason] | [name] | [x]% |",
          "| Measurement and reporting | [reason] | [name] | [x]% |",
          "",
          "## 3. 90-day action plan",
          "| # | Item | URL(s) | Est. clicks / mo | Confidence | Effort (d) | Score | Owner | Sprint | Status |",
          "|---|---|---|---|---|---|---|---|---|---|",
          "| 1 | [change] | [url] | [n] | [0.2-0.8] | [n] | [n] | [name] | [1-6] | To do |",
          "",
          "## 4. 12-month view",
          "| Quarter | Theme | Rough size | Depends on |",
          "|---|---|---|---|",
          "| Q1 | [theme] | [S/M/L] | [dependency] |",
          "| Q2 | [theme] | [S/M/L] | [dependency] |",
          "| Q3 | [theme] | [S/M/L] | [dependency] |",
          "| Q4 | [theme] | [S/M/L] | [dependency] |",
          "",
          "## 5. Measurement",
          "- KPI and source: [e.g. non-brand clicks, Search Console, page filter].",
          "- Each shipped item: same number of days before and after, rest of site as control.",
          "- Review: monthly (status, results), quarterly (re-score and re-plan).",
          "",
          "## 6. Risks and assumptions",
          "- [e.g. developer time for technical items is not confirmed]",
        ].join("\n"),
      },
      { type: "h2", id: "example", text: "Example: a 90-day plan for a small SaaS site" },
      {
        type: "p",
        text: "Worked example (hypothetical numbers). A software company with about 9,000 non-brand clicks a month, one content writer and two developer days a month. The goal is +20% non-brand clicks to feature and pricing pages in 12 months.",
      },
      {
        type: "table",
        head: ["Sprint (2 weeks)", "Work", "Expected effect"],
        rows: [
          ["1", "Title and description rewrites on 8 low-CTR URLs; brand regex set up for reporting", "≈ 190 clicks / month within 4 to 6 weeks"],
          ["2", "Internal links and new sections for 5 striking-distance queries", "≈ 270 clicks / month over the quarter"],
          ["3", "Merge two cannibalizing pages, 301 the weaker one", "≈ 125 clicks / month"],
          ["4", "Refresh the first of three decaying guides", "≈ 60 clicks / month"],
          ["5", "Developer days: fix duplicate product URLs flagged in the indexing report", "≈ 180 clicks / month, lower confidence"],
          ["6", "Refresh guides 2 and 3; first quarterly review and re-score", "≈ 130 clicks / month"],
        ],
      },
      {
        type: "p",
        text: "The expected total, about 950 clicks a month, covers roughly half of the 12-month goal of 1,800. That is a healthy first quarter: the rest comes from content themes planned for later quarters, which the team re-scores after seeing what the quick wins delivered.",
      },
      { type: "h2", id: "twelve-months", text: "The 12-month view" },
      {
        type: "table",
        head: ["Quarter", "Typical theme", "Why in this order"],
        rows: [
          ["1", "Quick wins and fixes to pages that already rank", "Fastest feedback, builds trust in the plan"],
          ["2", "Content refresh and consolidation, guided by a [content audit](/en/resources/content-audit)", "Cleans up before you add more pages"],
          ["3", "New content for gaps you already get impressions for", "Demand is proven by your own data"],
          ["4", "Authority and new topics; plan next year", "Slowest payback, needs the earlier groundwork"],
        ],
      },
      { type: "h2", id: "mistakes", text: "Mistakes that sink SEO roadmaps" },
      {
        type: "list",
        items: [
          "**Planning to 100% capacity.** Something urgent always arrives. Plan to about 75%.",
          "**Dating every task for 12 months.** Rankings, Google and the business change. Date the next 90 days, theme the rest.",
          "**No baseline.** Without one, a seasonal rise looks like your success and a seasonal dip looks like your failure.",
          "**Counting brand queries in the goal.** Brand clicks follow marketing and press, not SEO work.",
          "**Never re-scoring.** The estimates were guesses. Replace them with measured results every quarter.",
          "**Reporting activity instead of results.** Report what each shipped item earned, using the KPIs in [SEO KPIs](/en/resources/seo-kpis).",
        ],
      },
      {
        type: "p",
        text: "If you would rather not maintain the scoring by hand, AnotherSEOGuru App's Opportunities module ranks fixes from your Search Console data with an estimated click impact, and Tasks measures each shipped fix before and after against the rest of the site. The [live demo](/demo) runs on sample data without an account.",
      },
      { type: "h2", id: "cluster", text: "Go deeper" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "SEO forecasting", text: "The method behind every click estimate in the roadmap.", href: "/en/resources/seo-forecasting", icon: "bar-chart" },
          { title: "SEO quick wins", text: "The items that usually belong in sprint one.", href: "/en/resources/seo-quick-wins", icon: "sparkles" },
          { title: "Content audit", text: "Decide what to keep, update, merge or remove before adding pages.", href: "/en/resources/content-audit", icon: "file" },
          { title: "SEO report template", text: "Report the roadmap's progress each month.", href: "/en/resources/seo-report-template", icon: "book" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "What is the difference between an SEO strategy and an SEO roadmap?", a: "The strategy is the goal and the few bets that serve it: which queries and pages you will win and why. The roadmap is the sequence of work that carries the strategy out, with dates, owners and estimates. A strategy fits on one page; a roadmap is a table you update." },
          { q: "How long should an SEO roadmap cover?", a: "Twelve months for themes and three months for dated work. SEO results take weeks to show, so a plan shorter than a quarter cannot be judged, and dated tasks beyond a quarter are usually wrong by the time you reach them." },
          { q: "How do I prioritize SEO tasks?", a: "Estimate the clicks each task could add, multiply by how confident you are it will work, and divide by the effort in days. Fixes to pages that already rank on page one usually come first because they are cheap and likely to work." },
          { q: "What should be in an SEO action plan for the first 90 days?", a: "Snippet rewrites for page-one results with low CTR, pushes for queries ranking 4 to 20, merges of pages that compete for the same query, refreshes of decaying pages and any indexing problem that blocks important URLs. New content usually starts once these are in motion." },
          { q: "How often should the roadmap be updated?", a: "Update statuses weekly or every sprint, review results monthly, and re-score the whole list each quarter with fresh Search Console data and the measured results of what you shipped." },
        ],
      },
    ],
  },
  {
    slug: "content-audit",
    cluster: "traffic-drops",
    kind: "article",
    title: "Content audit: how to decide what to keep, update, merge, redirect or remove",
    seoTitle: "Content Audit: SEO Template and Step-by-Step Process",
    description:
      "A content audit driven by Search Console data: pull clicks, impressions, links and conversions per URL, then keep, update, merge, redirect or remove each URL.",
    primaryKeyword: "content audit",
    secondaryKeywords: ["seo content audit", "content audit template", "how to do a content audit", "content inventory"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**A content audit is a page-by-page review of a site that ends in one decision per URL: keep, update, merge, redirect or remove.** For SEO, base each decision on four numbers you can pull for every page: clicks and impressions from Google Search Console, the backlinks pointing at it, and the conversions it starts. A page with demand but slipping rankings gets updated, two pages chasing the same queries get merged, a page about something that no longer exists gets redirected, and a page with no demand, no links and no business purpose gets removed.",
      },
      {
        type: "note",
        tone: "info",
        text: "An audit covers the whole site at once. If you only need to find pages that are losing traffic now, the [content decay](/en/resources/content-decay) workflow is faster. If the problem is two pages competing for one query, go straight to [keyword cannibalization](/en/resources/keyword-cannibalization).",
      },
      { type: "h2", id: "when", text: "When a content audit is worth the time" },
      {
        type: "list",
        items: [
          "**Before a redesign or migration**, so you do not move pages you should have removed.",
          "**After a broad traffic loss** you have already diagnosed with the [organic traffic drop](/en/resources/organic-traffic-drop) checks, when the cause points at content quality rather than a technical problem.",
          "**Once a year** on a site that publishes every week. Large blogs collect overlapping and outdated posts faster than anyone notices.",
          "**When you inherit a site**, as a new in-house lead or a new agency, to learn what exists and what earns.",
        ],
      },
      { type: "h2", id: "columns", text: "The spreadsheet columns" },
      {
        type: "p",
        text: "One row per URL. These columns are enough to make every decision in the table further down; anything else is optional.",
      },
      {
        type: "table",
        head: ["Column", "Source", "Why it matters"],
        rows: [
          ["URL", "Sitemap, a crawl and the Search Console Pages export combined", "Catches pages missing from the sitemap"],
          ["Content type", "URL pattern or CMS", "Lets you set different thresholds for blog posts and product pages"],
          ["Clicks (12 months)", "Search Console → Pages", "Real demand the page already captures"],
          ["Impressions (12 months)", "Search Console → Pages", "Demand the page is seen for, even without clicks"],
          ["Average position", "Search Console → Pages", "Separates a ranking problem from a demand problem"],
          ["Clicks change vs previous period", "Search Console, compare mode", "Flags decay"],
          ["Top query", "Search Console, filter by page → Queries", "What Google thinks the page is about"],
          ["Referring domains", "A backlink tool, or Search Console → Links → Top linked pages", "Pages with links should not be deleted without a redirect"],
          ["Conversions", "GA4 landing pages with key events", "Business value beyond traffic"],
          ["Last updated", "CMS", "Context, not a decision rule"],
          ["Quality notes", "Manual review", "Accuracy, intent match, thin or duplicated copy"],
          ["Decision", "You", "Keep, update, merge, redirect or remove"],
          ["Target URL", "You", "For merges and redirects"],
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "The Search Console interface exports up to 1,000 rows. On a larger site, export by folder with a page filter (for example, URLs containing /blog/) or use the Search Console API so pages with few clicks are not silently left out.",
      },
      { type: "h2", id: "process", text: "How to do a content audit, step by step" },
      {
        type: "steps",
        howTo: { name: "Run an SEO content audit with Search Console data", description: "Build a URL inventory, add performance, link and conversion data, and decide what to do with each page." },
        items: [
          {
            title: "Build the URL inventory",
            text: "Combine your XML sitemap, a crawl of the site and the Search Console Pages export. De-duplicate, and drop URLs that redirect or return errors into a separate technical list.",
          },
          {
            title: "Add 12 months of Search Console data",
            text: "Clicks, impressions and average position per page. Twelve months smooths out seasonality; add a second column comparing the last three months with the same three months a year earlier to catch decay.",
          },
          {
            title: "Add each page's top query",
            text: "For pages that matter, filter Performance by the page and note the query with the most clicks. When two URLs share a top query, mark both: that is a merge candidate.",
          },
          {
            title: "Add backlinks and conversions",
            text: "Referring domains per URL and conversions per landing page. These two columns protect pages with little search traffic but real value.",
          },
          {
            title: "Review quality by hand where it counts",
            text: "You do not need to read every page. Read the ones heading for update or merge, and spot-check the remove list. Note what is outdated, thin or off-intent.",
          },
          {
            title: "Apply the decision rules",
            text: "Use the decision table below for a first pass, then override where your notes disagree. Write a target URL for every merge and redirect.",
          },
          {
            title: "Ship in batches and annotate",
            text: "Work through the decisions in batches of 10 to 30 pages and record the date of each batch, so you can tell which change moved which number.",
          },
          {
            title: "Measure after four to eight weeks",
            text: "Compare clicks to the affected pages and their merge targets over the same number of days before and after, against the rest of the site.",
          },
        ],
      },
      { type: "h2", id: "decisions", text: "The decision table" },
      {
        type: "table",
        head: ["Decision", "Typical signals", "What to do"],
        rows: [
          ["Keep", "Steady or growing clicks, position holds, content is accurate", "Leave it; add internal links from newer pages"],
          ["Update", "Real impressions, position or clicks slipping, content partly outdated", "Refresh the copy, answer the current query better, rewrite the title"],
          ["Merge", "Two or more URLs share a top query or cover the same topic thinly", "Combine into the strongest URL, 301 the others to it"],
          ["Redirect", "Topic retired (old product, past event), but the URL has links or clicks", "301 to the closest current page"],
          ["Remove", "Under ~10 clicks in 12 months, no referring domains, no conversions, no purpose", "Delete (410) or noindex if it must stay for users"],
        ],
      },
      {
        type: "p",
        text: "The click threshold for removal depends on the site. On a small local business site, a page with 10 clicks a year may still be the only page about a service you sell. Look at the business purpose column before you look at the traffic column.",
      },
      { type: "h3", id: "remove-options", text: "Delete, noindex or redirect?" },
      {
        type: "table",
        head: ["Situation", "Best option"],
        rows: [
          ["Page has backlinks or clicks and a close replacement exists", "301 redirect to the replacement"],
          ["No links, no clicks, no replacement", "Delete and return 410 (or 404)"],
          ["Users need it, search does not (thank-you pages, internal filters)", "Keep it live, add noindex"],
          ["Page is temporarily out of date", "Update it; do not remove a URL you will need again"],
        ],
      },
      { type: "h2", id: "template", text: "Content audit template" },
      {
        type: "p",
        text: "Paste this header row into a spreadsheet. The sample rows show how filled-in rows look.",
      },
      {
        type: "code",
        lang: "csv",
        title: "Content audit template: header and sample rows (hypothetical)",
        text: [
          "url,content_type,clicks_12m,impressions_12m,avg_position,clicks_change_pct,top_query,referring_domains,conversions_12m,last_updated,quality_notes,decision,target_url",
          "/blog/invoice-template,blog,8420,212000,4.1,-3,invoice template,31,96,2025-02,Accurate,keep,",
          "/blog/late-payment-tips,blog,1960,88000,9.8,-38,late payment,4,12,2023-06,Old law references,update,",
          "/blog/how-to-chase-invoices,blog,640,41000,14.2,-12,late payment,1,2,2022-11,Overlaps late-payment-tips,merge,/blog/late-payment-tips",
          "/features/legacy-export,feature,120,9000,11.5,-70,csv export,6,0,2021-04,Feature retired,redirect,/features/integrations",
          "/blog/company-picnic-2021,blog,3,400,38.0,-50,,0,0,2021-08,No purpose,remove,",
        ].join("\n"),
      },
      { type: "h2", id: "example", text: "Worked example" },
      {
        type: "p",
        text: "Worked example (hypothetical numbers), using the rows above. The invoice template page is the site's strongest page, so it stays and gains links from newer posts. The late-payment post still has demand (88,000 impressions) but lost 38% of its clicks while its position slid toward 10: an update. The “how to chase invoices” post shares its top query and ranks lower, so it is merged into the late-payment post and redirected, which also removes a [cannibalization](/en/resources/keyword-cannibalization) problem. The retired feature page still has six referring domains, so it is redirected rather than deleted. The picnic post goes.",
      },
      {
        type: "p",
        text: "Across a real audit of a few hundred URLs, the typical outcome is a short update list that carries most of the upside, a handful of merges, and a remove list that mostly tidies the crawl rather than adding traffic by itself.",
      },
      { type: "h2", id: "after", text: "After the audit: turn decisions into work" },
      {
        type: "p",
        text: "An audit is only useful if the decisions get shipped. Put the update and merge rows into your [SEO roadmap](/en/resources/seo-roadmap), sized in clicks like any other item, and treat the quick title rewrites as [quick wins](/en/resources/seo-quick-wins). For each updated page, check its title and description against the queries it gets impressions for today using [high impressions, low CTR](/en/resources/high-impressions-low-ctr).",
      },
      {
        type: "p",
        text: "AnotherSEOGuru App runs the decay and cannibalization detectors on your Search Console data continuously, so after the audit you hear about the next page that starts slipping instead of waiting a year. The [live demo](/demo) shows them on sample data.",
      },
      { type: "h2", id: "mistakes", text: "Common content audit mistakes" },
      {
        type: "list",
        items: [
          "**Deleting by age.** Old pages that still earn clicks or links are assets. Decide by data.",
          "**Ignoring links when removing.** A deleted page with referring domains throws away authority a redirect would keep.",
          "**Merging without redirecting.** The merged-away URL must 301 to the target, and internal links should be updated to point at the target directly.",
          "**Auditing only the blog.** Product, category and service pages decay and overlap too.",
          "**Shipping everything on one day.** You will not know which change caused which result.",
        ],
      },
      { type: "h2", id: "cluster", text: "Related guides" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "Content decay", text: "Find the pages losing traffic right now and diagnose each one.", href: "/en/resources/content-decay", icon: "bell" },
          { title: "Fix keyword cannibalization", text: "Choose the page that should rank and consolidate the rest.", href: "/en/resources/keyword-cannibalization", icon: "layers" },
          { title: "Organic traffic drop", text: "Diagnose a sudden loss before you start an audit.", href: "/en/resources/organic-traffic-drop", icon: "search" },
          { title: "SEO roadmap", text: "Turn the audit's decisions into a scored 90-day plan.", href: "/en/resources/seo-roadmap", icon: "list" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How long does a content audit take?", a: "For a site of a few hundred URLs, pulling and joining the data takes a day, and the review and decisions two to four more. Very large sites usually audit one section at a time." },
          { q: "What is the difference between a content audit and a content inventory?", a: "An inventory lists every URL and its basic attributes. An audit adds performance, links and conversions, and ends with a decision for each URL. The inventory is the first step of the audit." },
          { q: "How often should I do a content audit?", a: "A full audit once a year is enough for most sites, plus one before any redesign or migration. Between audits, a monthly decay check catches pages that start slipping." },
          { q: "Does removing low-quality pages improve SEO?", a: "Removing or merging pages with no demand, no links and no purpose can help Google spend its attention on your useful pages. Removing pages that still earn clicks or links usually hurts. On its own, pruning rarely adds traffic; the updates and merges do most of the work." },
          { q: "Can I do a content audit with free tools only?", a: "Yes. Search Console gives clicks, impressions, positions and top linked pages, GA4 gives conversions, and a spreadsheet holds the decisions. A crawler helps on larger sites but is not required for a first pass." },
        ],
      },
    ],
  },
  {
    slug: "zero-click-searches",
    cluster: "ai-visibility",
    kind: "article",
    title: "Zero-click searches: what they are and how to measure their effect on your site",
    seoTitle: "Zero-Click Searches: How to Measure and Respond",
    description:
      "Zero-click searches end on the results page without a visit. See which SERP features cause them, how to spot them in Search Console and what to do about them.",
    primaryKeyword: "zero click searches",
    secondaryKeywords: ["zero click search", "zero-click seo", "ai overviews ctr", "zero click search seo"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**A zero-click search is a search that ends on the results page: the searcher gets the answer from an AI Overview, a featured snippet, a knowledge panel or another results-page feature and never visits a website.** On your own site, the effect shows up in Google Search Console as a specific pattern: impressions hold or rise, average position stays about the same, and CTR falls. You cannot win the click back on every query, so the response is to be the source the answer is built from, build demand for your brand, and focus effort on queries where the searcher still needs to visit a page.",
      },
      {
        type: "note",
        tone: "info",
        text: "Our glossary has the short definition of a [zero-click search](/en/glossary/zero-click-search). This page is about measuring the effect on your own data and deciding what to do.",
      },
      { type: "h2", id: "causes", text: "Which results-page features cause zero-click searches" },
      {
        type: "table",
        head: ["Feature", "What it answers on the page", "Queries most affected", "What you can still win"],
        rows: [
          ["AI Overview", "A generated summary with linked sources", "Informational “what, why, how” questions", "A citation link and brand exposure"],
          ["Featured snippet", "One quoted passage from one page", "Definitions, short steps, lists", "The snippet itself, which carries your link"],
          ["Direct answers", "Weather, time, conversions, calculations, sports scores", "Factual lookups", "Very little; rarely worth targeting"],
          ["Knowledge panel", "Facts about an entity", "Brand, people, places", "Accurate facts about your own brand"],
          ["Local pack", "Map, phone, hours, directions", "“Near me” and service + city", "Calls and direction requests from your Business Profile"],
          ["People also ask", "Expandable short answers", "Follow-up questions", "Exposure; some clicks on expanded answers"],
          ["Shopping, flights, hotels units", "Prices and options inside Google", "Commercial product and travel queries", "Clicks to the offer, often via feeds and listings"],
        ],
      },
      {
        type: "p",
        text: "Not every zero-click search is a loss. Someone who checks your opening hours in the local pack and then walks in is a customer who never visited your website. The problem is informational content whose business case depended on the visit.",
      },
      { type: "h2", id: "how-counted", text: "How Search Console counts these searches" },
      {
        type: "p",
        text: "Search Console counts an impression whenever a link to your site is shown on a results page the searcher sees, and a click only when they follow it. Google's documentation says a link inside an AI Overview counts as an impression, and that all links in an AI Overview share the single position the Overview occupies on the page. So a page cited in an AI Overview at the top can report a strong average position and very few clicks. As of October 2026, the Performance report has no filter that separates AI Overview impressions from other web results, so you infer the effect from the pattern, not from a dedicated metric.",
      },
      { type: "h2", id: "detect", text: "How to see the effect in your own data" },
      {
        type: "steps",
        howTo: { name: "Find zero-click losses in Google Search Console", description: "Identify queries where impressions hold but CTR falls at a stable position, a sign that a results-page feature is answering the search." },
        items: [
          {
            title: "Compare a period with the same period last year",
            text: "Performance → Date → Compare, last three months against the same three months a year earlier. Year over year removes seasonality, which otherwise looks exactly like a CTR change.",
          },
          {
            title: "Remove brand queries",
            text: "Brand searches click at high rates and hide everything else. Filter them out with a regex, as in [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
          },
          {
            title: "Export queries with both periods",
            text: "Keep clicks, impressions, CTR and position for each period. Drop rows with fewer than about 100 impressions in either period; they are too noisy.",
          },
          {
            title: "Flag the zero-click pattern",
            text: "Position changed by less than one place, impressions are flat or up, and CTR fell by a quarter or more. Those queries lost clicks without losing rankings.",
          },
          {
            title: "Check the results page for the flagged queries",
            text: "Search a sample of them, or run them through our free [AI visibility check](/en/ai-visibility-check), which shows the Google results, the AI Overview above them and the ChatGPT answer side by side with your domain marked. Note which feature now sits above you.",
          },
          {
            title: "Group by query type",
            text: "Label each flagged query as definition, how-to, comparison, local or commercial. The losses usually cluster in one or two types, and that tells you where to change strategy.",
          },
        ],
      },
      {
        type: "table",
        head: ["Pattern", "Likely cause", "Where to look next"],
        rows: [
          ["Position stable, impressions up, CTR down", "A results-page feature now answers the query", "This page"],
          ["Position down, CTR down with it", "A ranking loss, not a zero-click effect", "[Organic traffic drop](/en/resources/organic-traffic-drop)"],
          ["Impressions down, position and CTR stable", "Less demand", "Seasonality, market trends"],
          ["CTR low on one page only, at a good position", "A weak title or description", "[High impressions, low CTR](/en/resources/high-impressions-low-ctr)"],
        ],
      },
      { type: "h2", id: "example", text: "Worked example" },
      {
        type: "p",
        text: "Worked example (hypothetical numbers). A guide ranks for “what is a purchase order” at an average position of 2.3 in both periods. Impressions grew from 18,000 to 21,000 a month, but CTR fell from 11% to 4.5%, so clicks went from about 1,980 to about 945. A manual check shows an AI Overview with a definition, citing two other sites. The page did not lose a ranking: it lost the click to an answer on the page. The same site's comparison pages, “purchase order vs invoice” and “purchase order software”, held their CTR, because the searcher still needs to read and choose.",
      },
      {
        type: "p",
        text: "That split, definitions losing clicks while comparisons and commercial pages hold, is the most common shape of the effect. Measure it on your data rather than relying on a general industry figure: the share of zero-click searches varies by topic, country and device, and your own Search Console export is the only source that describes your queries.",
      },
      { type: "h2", id: "what-to-do", text: "What to do about zero-click searches" },
      {
        type: "list",
        items: [
          "**Be the cited source.** Put a short, direct answer in the first paragraph, use headings that match the questions, and name your sources and dates. [Anatomy of a page built for AI search](/en/resources/ai-search-page-anatomy) shows the structure that answer engines can quote.",
          "**Give a reason to click.** A definition can be answered on the results page; a calculator, a template, original data, a worked example or a comparison table cannot. Add the part of the page that the summary cannot replace.",
          "**Shift effort toward queries that need the visit.** Comparisons, pricing, “best” lists, local services and product pages still send clicks. Weight your roadmap toward them.",
          "**Build brand demand.** A cited brand that searchers recognise gets searched by name later. Track branded clicks and impressions as a separate KPI.",
          "**Track citations, not only clicks.** For your most important informational queries, record whether an AI Overview appears and whether it cites you. [AI Overview tracking](/en/resources/ai-overview-tracking) covers how.",
          "**Update your forecasts.** If your CTR at a position has fallen while the position held, forecast with your recent curve, not an old benchmark. See [CTR by position](/en/resources/ctr-by-position).",
        ],
      },
      { type: "h2", id: "which-queries", text: "Which queries to keep chasing" },
      {
        type: "table",
        head: ["Query type", "Zero-click risk", "Verdict"],
        rows: [
          ["Simple facts, definitions, conversions", "High", "Keep a concise answer for citation; do not expect clicks"],
          ["How-to with many steps", "Medium", "Worth it if the page adds images, tools or detail the summary cannot"],
          ["Comparisons and “best” lists", "Lower", "Prioritize; the searcher still needs to evaluate"],
          ["Commercial and transactional", "Lower", "Prioritize; the action happens on your site"],
          ["Local service queries", "High for the website, lower for the business", "Invest in the Business Profile as much as the page"],
        ],
      },
      { type: "h2", id: "report", text: "How to report it to a client or a manager" },
      {
        type: "p",
        text: "Show non-brand clicks next to non-brand impressions and average position, so a falling click line with a stable position is visible at a glance. Add the list of queries flagged by the steps above, the feature now shown on each, and whether you are cited in it. The [SEO KPIs](/en/resources/seo-kpis) page explains which metrics to keep in the report and which to drop. The [search optimization layers](/en/resources/search-optimization-layers) framework is a useful way to explain why visibility in an answer counts even when it earns no click.",
      },
      { type: "h2", id: "cluster", text: "Go deeper" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "AI Overview tracking", text: "What you can track in AI Overviews, with a template and cadence.", href: "/en/resources/ai-overview-tracking", icon: "bot" },
          { title: "Anatomy of a page built for AI search", text: "The structure answer engines can read and quote.", href: "/en/resources/ai-search-page-anatomy", icon: "layout" },
          { title: "High impressions, low CTR", text: "When the problem is your snippet, not the results page.", href: "/en/resources/high-impressions-low-ctr", icon: "search" },
          { title: "Free AI visibility check", text: "See the Google results, the AI Overview and ChatGPT's answer for one keyword.", href: "/en/ai-visibility-check", icon: "sparkles" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "What is a zero-click search?", a: "A search where the person gets what they need on the results page, from an AI Overview, a featured snippet, a knowledge panel, a local pack or a direct answer, and does not click through to any website." },
          { q: "How do I know if zero-click searches are hurting my traffic?", a: "In Search Console, compare a period with the same period last year for non-brand queries. Queries where position held, impressions held or rose, and CTR fell by a quarter or more are the ones losing clicks to a results-page feature." },
          { q: "Do AI Overviews reduce CTR?", a: "On many informational queries they do, because the summary answers the question before the results. The size of the effect differs by query type, so measure it on your own queries with the year-over-year comparison above instead of applying a general figure." },
          { q: "Is zero-click SEO worth doing?", a: "Yes, where being named has value: brand awareness, trust before a purchase, or being the source an answer engine relies on. For pages whose only value was the visit, shift effort to queries where the searcher still needs to click." },
          { q: "Does Search Console show AI Overview clicks separately?", a: "Not as of October 2026. Links in AI Overviews are counted in the normal web search totals, and every link in an Overview shares its single position. You can only infer the effect from the CTR pattern and by checking the results pages." },
        ],
      },
    ],
  },
  {
    slug: "ai-overview-tracking",
    cluster: "ai-visibility",
    kind: "article",
    title: "AI Overview tracking: what you can measure and how to set it up",
    seoTitle: "AI Overview Tracking: Methods, Template and Cadence",
    description:
      "AI Overview tracking explained: what Search Console can and cannot show, three ways to track AI Overviews, a tracking sheet template and a review cadence.",
    primaryKeyword: "ai overview tracking",
    secondaryKeywords: ["track ai overviews", "ai overview rank tracking", "google ai overview tracker", "ai overview citations"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**AI Overview tracking means recording, for a fixed set of queries, whether Google shows an AI Overview, whether it cites your site, which of your URLs it cites and which competitors it cites instead.** Google Search Console cannot do this on its own: it counts AI Overview links inside the normal web results without a separate filter. So you track the Overviews with a panel of queries checked on a schedule, by hand, with a SERP tracker that detects AI Overviews or with an AI visibility tool, and you join the results with Search Console clicks and CTR for the same queries.",
      },
      {
        type: "note",
        tone: "warning",
        text: "As of October 2026, Search Console does not report AI Overview impressions or clicks separately. Google's documentation says links in an AI Overview are counted in the web search totals and all share the position of the Overview. Check the current Search Console documentation before relying on this, because Google may add a filter later.",
      },
      { type: "h2", id: "what-you-can-track", text: "What you can and cannot track" },
      {
        type: "table",
        head: ["Question", "Can you track it?", "How"],
        rows: [
          ["Does an AI Overview appear for this query?", "Yes, as a sample", "Manual checks, SERP trackers, AI visibility tools"],
          ["Is my site cited, and with which URL?", "Yes, as a sample", "The same methods; record the cited URL"],
          ["Which competitors are cited?", "Yes, as a sample", "Record every cited domain, not only yours"],
          ["Impressions and clicks from AI Overview links only", "No", "Search Console mixes them into web results"],
          ["Total clicks and CTR on queries that show an Overview", "Yes", "Join your tracked list with Search Console data"],
          ["Exactly what every searcher saw", "No", "Overviews vary by location, device, wording and time"],
        ],
      },
      {
        type: "p",
        text: "The last row matters. Every method on this page samples what Google showed at one moment from one location. Treat the results as rates over many queries and many checks, not as a fact about a single search.",
      },
      { type: "h2", id: "methods", text: "Three ways to track AI Overviews" },
      {
        type: "table",
        head: ["Method", "Scale", "Cost", "Strengths", "Weaknesses"],
        rows: [
          ["Manual query panel", "20 to 50 queries", "Time only", "You see the full page, including wording and layout", "Slow, hard to repeat consistently, personalised results"],
          ["SERP tracker with AI Overview detection", "Hundreds to thousands", "Paid, per query checked", "Consistent location and device, history over time", "Coverage and citation parsing vary by vendor"],
          ["AI visibility tool", "Dozens to hundreds of prompts", "Paid", "Also covers ChatGPT, Gemini and Perplexity; share of voice", "Prompts are not the same as real search queries"],
        ],
      },
      { type: "h3", id: "manual", text: "Manual query panel" },
      {
        type: "p",
        text: "Start here even if you plan to buy a tool, because it teaches you what the Overviews for your topic look like. Use a private window, the same country setting and the same device type every time. Our free [AI visibility check](/en/ai-visibility-check) helps with one query at a time: it shows the Google results, the AI Overview above them and the ChatGPT answer side by side, with your domain marked wherever it appears.",
      },
      { type: "h3", id: "serp-trackers", text: "SERP trackers" },
      {
        type: "p",
        text: "Many rank trackers now record whether an AI Overview appeared and which URLs it linked. Before you pay, check three things on a sample of your queries: that the tool detects Overviews that only load after an interaction, that it records every cited URL rather than a yes or no, and that you can export the history.",
      },
      { type: "h3", id: "ai-visibility-tools", text: "AI visibility tools" },
      {
        type: "p",
        text: "These run your prompts across several answer engines and report how often you are mentioned or cited compared with competitors. They are the right tool when the question is wider than Google, which is the subject of our post on [LLM citations and brand visibility](/en/blog/llm-citations-brand-visibility). The AI visibility module in AnotherSEOGuru App works this way: its prompt tracker asks each tracked engine your prompts, saves every answer with its sources, and reports mention rate, share of voice and the prompts where a competitor is named and you are not. It also shows which of your pages appear in AI Overviews and which queries show an Overview without citing you.",
      },
      { type: "h2", id: "setup", text: "How to set up AI Overview tracking" },
      {
        type: "steps",
        howTo: { name: "Set up AI Overview tracking for your site", description: "Build a query panel from Search Console, check it on a schedule and record AI Overview presence, citations and competitors." },
        items: [
          {
            title: "Pick 30 to 100 queries from Search Console",
            text: "Take non-brand queries with the most impressions in the last three months, weighted toward informational queries, where Overviews appear most. Add the commercial queries your business depends on even if they show no Overview today.",
          },
          {
            title: "Tag each query",
            text: "Topic, intent (informational, comparison, commercial, local) and the URL you want to be cited. Tags let you see later that, for example, how-to queries are cited and comparisons are not.",
          },
          {
            title: "Fix the conditions of each check",
            text: "Same country and language, same device type, logged out, same tool settings. Change one condition and your trend line means nothing.",
          },
          {
            title: "Record presence, citation and competitors",
            text: "For each query: Overview yes or no, your site cited yes or no, which of your URLs, its order among the cited links, and every other cited domain. Save a screenshot for the queries that matter most.",
          },
          {
            title: "Join with Search Console",
            text: "Add clicks, impressions, CTR and position for each query over the same weeks. This is where tracking pays off: you can compare CTR on queries where you are cited with queries where you are not.",
          },
          {
            title: "Review on a fixed cadence and act",
            text: "Look at rates, not single results. For queries where an Overview appears and cites a competitor, compare that page with yours and use [AI search page anatomy](/en/resources/ai-search-page-anatomy) to plan what to add.",
          },
        ],
      },
      { type: "h2", id: "template", text: "AI Overview tracking sheet template" },
      {
        type: "code",
        lang: "markdown",
        title: "AI Overview tracking sheet: copy this (sample rows are hypothetical)",
        text: [
          "# AI Overview tracking: [Site] · Country: [xx] · Device: [mobile/desktop]",
          "",
          "| Check date | Query | Topic | Intent | Target URL | AIO shown | We are cited | Cited URL | Our order in sources | Other cited domains | GSC clicks (28d) | GSC CTR (28d) | GSC position | Notes |",
          "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
          "| 2026-10-05 | what is a purchase order | Basics | Info | /guides/purchase-order | Yes | No | - | - | rival-a.com, wiki.org | 610 | 3.9% | 2.4 | Overview quotes a definition we lack |",
          "| 2026-10-05 | purchase order vs invoice | Basics | Comparison | /guides/po-vs-invoice | Yes | Yes | /guides/po-vs-invoice | 1 | rival-b.com | 880 | 8.7% | 1.9 | |",
          "| 2026-10-05 | purchase order software | Product | Commercial | /product | No | - | - | - | - | 420 | 6.1% | 4.2 | |",
          "",
          "## Summary for this check",
          "- AIO presence rate: [queries with an Overview] / [queries checked]",
          "- Citation rate: [queries citing us] / [queries with an Overview]",
          "- Share of citations: [our citations] / [all citations across tracked queries]",
          "- Right-URL rate: [citations of the target URL] / [our citations]",
          "- Top competing domains: [domain, count]",
        ].join("\n"),
      },
      { type: "h2", id: "metrics", text: "The metrics worth reporting" },
      {
        type: "table",
        head: ["Metric", "Formula", "What it tells you"],
        rows: [
          ["AIO presence rate", "Queries with an Overview ÷ queries checked", "How exposed your topic is to zero-click answers"],
          ["Citation rate", "Queries citing you ÷ queries with an Overview", "Whether you are a source Google uses"],
          ["Share of citations", "Your citations ÷ all citations on the panel", "Your position against competitors"],
          ["Right-URL rate", "Citations of the intended URL ÷ your citations", "Whether the page you built for the query is the one used"],
          ["CTR gap", "CTR when cited minus CTR when not cited, at similar positions", "What a citation is worth in clicks on your site"],
        ],
      },
      {
        type: "p",
        text: "The CTR gap is the number most teams are missing. It turns citations into something you can put in a forecast. If being cited does not change CTR on your queries, the value of a citation is exposure, and you report it that way. The wider effect on clicks is covered in [zero-click searches](/en/resources/zero-click-searches).",
      },
      { type: "h2", id: "cadence", text: "How often to check" },
      {
        type: "table",
        head: ["Panel", "Cadence", "Why"],
        rows: [
          ["Core panel (30 to 100 queries)", "Every two weeks or monthly", "Overviews change often; monthly is enough to see a trend"],
          ["Queries for pages you just updated", "Weekly for four to six weeks", "To see whether the change earned a citation"],
          ["Full topic review", "Quarterly", "Re-pick queries from fresh Search Console data"],
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "Check each query more than once in a cycle if your tool allows it. The same query can show an Overview on one check and not the next. Recording “shown in 2 of 3 checks” is more honest than a single yes.",
      },
      { type: "h2", id: "fit", text: "Where this fits" },
      {
        type: "p",
        text: "AI Overviews are one layer of a wider picture: ranking in the results, being quoted in an answer, being recommended by a chat assistant and finally being chosen. The [search optimization layers](/en/resources/search-optimization-layers) framework explains how they relate and what each one needs from a page. For the click side of the same queries, use [high impressions, low CTR](/en/resources/high-impressions-low-ctr) and keep brand queries out of the numbers as described in [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
      },
      { type: "h2", id: "cluster", text: "Go deeper" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "Free AI visibility check", text: "One keyword: Google results, the AI Overview and ChatGPT's answer side by side.", href: "/en/ai-visibility-check", icon: "sparkles" },
          { title: "Search optimization layers", text: "How SEO, AEO and GEO fit together, and what to measure in each.", href: "/en/resources/search-optimization-layers", icon: "layers" },
          { title: "Anatomy of a page built for AI search", text: "What a page needs to be quoted in an answer.", href: "/en/resources/ai-search-page-anatomy", icon: "layout" },
          { title: "LLM citations and brand visibility", text: "Tracking mentions beyond Google, in ChatGPT, Gemini and Perplexity.", href: "/en/blog/llm-citations-brand-visibility", icon: "bot" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "Can I track AI Overviews in Google Search Console?", a: "Not directly as of October 2026. AI Overview links are counted in the normal web search impressions and clicks, with no separate filter, and all links in an Overview share its position. Track presence and citations with a query panel and join the results with Search Console data." },
          { q: "What is the best way to track AI Overviews?", a: "Start with a manual panel of 30 to 50 queries to learn what the Overviews look like for your topic, then move to a SERP tracker or an AI visibility tool once you know which queries and competitors matter. Keep location, device and settings fixed between checks." },
          { q: "How many queries should I track?", a: "Thirty to one hundred is enough for most sites to see rates and trends. Pick non-brand queries with the most impressions in Search Console, plus the commercial queries your business depends on." },
          { q: "Why does the AI Overview change between checks?", a: "Overviews depend on location, device, the exact wording, the time and ongoing changes on Google's side. That is why tracking reports rates across many queries and checks rather than a single result." },
          { q: "Does AI Overview rank tracking replace normal rank tracking?", a: "No. Positions and clicks still come from the organic results, and Search Console remains the source for them. AI Overview tracking adds a second view: whether you are a source in the answer above those results." },
          { q: "How do I get cited in AI Overviews?", a: "No one can guarantee a citation. Pages that get cited usually rank well already, answer the question directly in the first paragraph, use headings that match the question and state current, sourced facts. Compare your page with the cited ones and close the gaps." },
        ],
      },
    ],
  },
];
