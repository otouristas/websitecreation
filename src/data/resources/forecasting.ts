import type { ResourceArticle } from "./types";

const PUBLISHED = "2026-10-19";

export const FORECASTING_ARTICLES: ReadonlyArray<ResourceArticle> = [
  {
    slug: "seo-forecasting",
    cluster: "forecasting",
    kind: "pillar",
    title: "SEO forecasting: how to estimate the clicks your work will earn",
    seoTitle: "SEO Forecasting from Search Console Data",
    description:
      "A practical SEO forecasting method built on your own Search Console data: a baseline, the uplift from specific fixes, confidence weights and three honest scenarios.",
    primaryKeyword: "seo forecasting",
    secondaryKeywords: ["seo forecast", "seo traffic forecast", "how to forecast seo traffic", "seo forecast template"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**An SEO forecast estimates how many extra organic clicks a set of changes is likely to earn, and over what period.** The most reliable way to build one is bottom-up: start from the queries you already rank for in Google Search Console, estimate what a better position or a better snippet would add for each one, weight each estimate by how likely you are to achieve it, then add them up. Forecasts built from keyword-tool volumes alone tend to overshoot, because they ignore your real click-through rate.",
      },
      {
        type: "note",
        tone: "info",
        text: "A forecast is a sizing tool, not a promise. Its job is to decide which work to do first and to set expectations a client or a CFO can check later. Present it as a range.",
      },
      { type: "h2", id: "why-bottom-up", text: "Why a bottom-up forecast beats a traffic projection" },
      {
        type: "p",
        text: "There are two common ways to forecast SEO. The first extends the trend line of last year's organic traffic into next year. It answers “where are we heading if nothing changes”, which is useful as a baseline, but says nothing about what your work adds. The second multiplies keyword volume by an assumed CTR for a target ranking. It answers “what is this keyword worth”, but it starts from third-party volume estimates and an industry CTR that may be nothing like your own.",
      },
      {
        type: "p",
        text: "The bottom-up method combines the strengths of both. Your Search Console data already contains the demand (impressions), your current position and your real CTR for every query. You only have to estimate one thing per query: where it could realistically move.",
      },
      {
        type: "table",
        head: ["Method", "Answers", "Main weakness"],
        rows: [
          ["Trend projection", "Where traffic goes if nothing changes", "Says nothing about the effect of your work"],
          ["Keyword volume × CTR", "What a new keyword could be worth", "Third-party volumes and a generic CTR curve"],
          ["Bottom-up from Search Console", "What specific fixes are likely to add", "Only covers demand you already appear for"],
        ],
      },
      { type: "h2", id: "method", text: "The method, step by step" },
      {
        type: "steps",
        howTo: { name: "Build an SEO forecast from Search Console data", description: "Estimate the extra clicks a set of SEO changes is likely to earn, using your own queries, positions and CTR." },
        items: [
          {
            title: "Set the baseline",
            text: "Export at least 12 months of clicks by month from Search Console (Performance → Date → Export). Compare each month with the same month last year so seasonality is visible. The baseline is what you expect next quarter with no new work.",
          },
          {
            title: "Export queries for the last three months",
            text: "Performance → Queries → Export gives you up to 1,000 rows with clicks, impressions, CTR and average position. Three months is long enough to smooth out weekly noise and short enough to reflect today's rankings.",
          },
          {
            title: "Remove brand queries",
            text: "People searching your name click at rates no curve predicts, and better SEO rarely moves them. Filter them out with a regex before you estimate anything. See [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
          },
          {
            title: "Pick a realistic target for each query",
            text: "For a query ranking 4 to 10, the top 3 is a realistic target. For one ranking 11 to 20, page one (around position 8) is. Beyond 20, treat the query as new content, not an uplift.",
          },
          {
            title: "Estimate the uplift with a CTR curve",
            text: "Multiply impressions by the difference between the CTR at the target position and your current CTR. Scale the curve to the query's own CTR, so a query that under-clicks today is assumed to keep under-clicking. [CTR by position](/en/resources/ctr-by-position) explains the curve.",
          },
          {
            title: "Weight by confidence",
            text: "Not every push works. Multiply each estimate by a probability: higher for queries already on page one, lower for page two, lower still where competitors are much stronger.",
          },
          {
            title: "Add a time profile",
            text: "Changes take weeks to be recrawled and re-ranked. Spread the uplift over the quarter instead of counting it from day one.",
          },
          {
            title: "Present three scenarios",
            text: "Conservative (only the top fixes you will actually ship, at their confidence), expected (all fixes at their confidence) and ceiling (all fixes fully achieved). The ceiling is there to show the size of the prize, not as a target.",
          },
        ],
      },
      { type: "h2", id: "worked-example", text: "A worked example" },
      {
        type: "p",
        text: "Take a hypothetical query, “invoice software for freelancers”, with 6,000 impressions a month at an average position of 7.2 and a CTR of 2.4%. On the baseline curve, position 7.2 earns about 3.0% and position 3 about 9.2%. The query clicks at roughly 80% of the curve, so we assume it would also earn about 80% of 9.2%, which is 7.4%, at position 3.",
      },
      {
        type: "table",
        head: ["Input", "Value"],
        rows: [
          ["Impressions a month", "6,000"],
          ["Current position / CTR", "7.2 / 2.4% (144 clicks)"],
          ["Target position", "3"],
          ["CTR at target, scaled to this query", "≈ 7.4%"],
          ["Clicks at target", "≈ 444"],
          ["Uplift if achieved", "≈ 300 clicks a month"],
          ["Confidence (page one, low effort)", "0.6"],
          ["Expected uplift", "≈ 180 clicks a month"],
        ],
      },
      {
        type: "p",
        text: "Repeat that for every query worth pushing, add them up, and you have a forecast where every number can be traced back to a row in Search Console. That traceability is what makes the forecast defensible in a review meeting.",
      },
      { type: "h2", id: "tool", text: "Run it on your own export in a minute" },
      {
        type: "p",
        text: "Our free [Search Console opportunity finder](/en/resources/search-console-opportunity-finder) does steps 2 to 8 in your browser. Upload the Queries.csv from a Search Console export, add your brand names, and it returns the queries worth pushing, the snippets worth rewriting and a conservative, expected and ceiling forecast. The file never leaves your computer and there is no sign-up.",
      },
      { type: "h2", id: "new-content", text: "Forecasting new content" },
      {
        type: "p",
        text: "For topics you do not rank for yet, Search Console has no impressions to work from, so you fall back on keyword volume. Keep these forecasts separate from the uplift forecast and discount them harder: you do not know your future position, and the volume itself is an estimate. A reasonable approach is volume × the CTR of a mid page-one position × a low probability, ramped over six months.",
      },
      { type: "h2", id: "mistakes", text: "Mistakes that make forecasts wrong" },
      {
        type: "list",
        items: [
          "**Counting brand queries.** They inflate the baseline and nothing you do changes them much.",
          "**Assuming position 1.** Forecast to the next realistic step, not the top.",
          "**Using one CTR curve for everything.** Your own data beats any benchmark; blend the two where your data is thin.",
          "**Ignoring results pages that changed.** If an AI Overview now sits above the results, the same position earns fewer clicks than it did a year ago.",
          "**Reporting the ceiling as the plan.** Clients remember the biggest number you said.",
          "**Not checking afterwards.** Compare each shipped fix with the same number of days before and after, against the rest of the site as a control.",
        ],
      },
      { type: "h2", id: "cluster", text: "Go deeper" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "Organic CTR by position", text: "The curve behind every click estimate, and what a good CTR is for your position.", href: "/en/resources/ctr-by-position", icon: "bar-chart" },
          { title: "SEO quick wins from Search Console", text: "Striking-distance queries and other fixes that pay back in weeks, not quarters.", href: "/en/resources/seo-quick-wins", icon: "sparkles" },
          { title: "Search Console opportunity finder", text: "Free tool: upload your export and get a ranked list and a forecast.", href: "/en/resources/search-console-opportunity-finder", icon: "wrench" },
          { title: "Prioritizing Search Console queries", text: "Our scoring framework for deciding which query to work on first.", href: "/en/blog/gsc-query-prioritization-framework", icon: "book" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How accurate is an SEO forecast?", a: "Accurate enough to rank work and set a range, not accurate enough to promise a number. Bottom-up forecasts from your own Search Console data are usually closer than projections from keyword tools, because they use your real impressions and CTR. Check them against results after each quarter and adjust your confidence weights." },
          { q: "How far ahead should an SEO forecast go?", a: "Three to six months for the uplift from existing rankings, where you can see the inputs. Twelve months is reasonable for a baseline with seasonality. Anything longer is mostly guesswork about competitors and Google." },
          { q: "Do I need a paid tool to forecast SEO?", a: "No. Search Console's free export and a CTR curve are enough for the method on this page. Our free opportunity finder runs it in the browser. Paid tools help with new-content forecasts, where you need keyword volumes." },
          { q: "Should a forecast include AI Overviews?", a: "Yes, indirectly. If your own CTR at a position has fallen while the position held, use your recent CTR rather than an older benchmark. Learning the curve from your own recent data does that automatically." },
        ],
      },
    ],
  },
  {
    slug: "ctr-by-position",
    cluster: "forecasting",
    kind: "article",
    title: "Organic CTR by position: the curve, and what a good CTR is",
    seoTitle: "Organic CTR by Position & What's a Good CTR",
    description:
      "The click-through rate each Google position usually earns, why your own curve differs, and how to tell whether a query's CTR is good for where it ranks.",
    primaryKeyword: "ctr by position",
    secondaryKeywords: ["organic ctr by position", "google ctr by position", "ctr curve", "serp ctr", "what is a good ctr"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**Organic CTR falls steeply with position: the first result earns several times the clicks of the fifth, and page two earns very little.** On the baseline curve we use, position 1 earns about 23.5% of impressions, position 3 about 9.2%, position 10 about 1.8% and position 15 under 1%. A “good” CTR is therefore not one number: it is a CTR at or above what your position usually earns for that kind of query.",
      },
      { type: "h2", id: "curve", text: "The baseline CTR curve" },
      {
        type: "p",
        text: "This is the starting curve inside AnotherSEOGuru App's opportunity engine: a blended desktop and mobile curve for non-brand queries on results pages that show AI Overviews. It is a baseline to compare against, not a law. The app blends it with each site's own curve as soon as there is enough data.",
      },
      {
        type: "table",
        head: ["Position", "Expected CTR", "Position", "Expected CTR"],
        rows: [
          ["1", "23.5%", "11", "1.35%"],
          ["2", "13.5%", "12", "1.15%"],
          ["3", "9.2%", "13", "1.0%"],
          ["4", "6.6%", "14", "0.88%"],
          ["5", "5.0%", "15", "0.78%"],
          ["6", "3.9%", "16", "0.70%"],
          ["7", "3.1%", "17", "0.62%"],
          ["8", "2.5%", "18", "0.56%"],
          ["9", "2.1%", "19", "0.50%"],
          ["10", "1.8%", "20", "0.45%"],
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "Average position in Search Console is an impression-weighted average of your top position across every search. A query at “6.4” may rank 3 on some searches and 12 on others, so compare it with the curve, but do not expect it to behave exactly like position 6.",
      },
      { type: "h2", id: "why-yours-differs", text: "Why your own curve is different" },
      {
        type: "list",
        items: [
          "**Brand queries** click far above the curve. Someone searching your name wants you.",
          "**Results-page layout** matters more than position. An AI Overview, a map pack, shopping results or a featured snippet above you pushes the click share of every organic result down.",
          "**Intent** changes the shape. Navigational and transactional queries concentrate clicks on the top result; research queries spread them out.",
          "**Device mix** matters. On mobile, fewer results are visible without scrolling.",
          "**Your snippet** can beat or lose to the results around it at the same position.",
        ],
      },
      { type: "h2", id: "own-curve", text: "How to build your own curve" },
      {
        type: "steps",
        howTo: { name: "Build a site-specific CTR curve from Search Console", description: "Learn the click-through rate your own site earns at each position." },
        items: [
          { title: "Export three months of queries", text: "Performance → Queries → Export. Three months gives enough rows per position without mixing in old rankings." },
          { title: "Remove brand queries", text: "Use a regex filter so your name does not distort the top positions." },
          { title: "Keep rows with enough impressions", text: "Rows with fewer than about 30 impressions are mostly noise." },
          { title: "Group by rounded position", text: "Round each average position to the nearest whole number and take the median CTR per group. The median resists outliers better than the mean." },
          { title: "Blend thin groups with the baseline", text: "Where a position has only a handful of rows, lean on the baseline. Where it has dozens, trust your data. Force the curve to fall with position so position 6 never beats position 5." },
        ],
      },
      {
        type: "p",
        text: "The free [Search Console opportunity finder](/en/resources/search-console-opportunity-finder) does exactly this with your export, then flags every query whose CTR is far below its own curve.",
      },
      { type: "h2", id: "good-ctr", text: "What is a good CTR?" },
      {
        type: "p",
        text: "Judge a query against its position, not against your site average. As a working rule, a non-brand query in the top 10 that earns less than 60% of the CTR its position usually earns is underperforming and its title and description are worth a rewrite. A query at or above the curve is fine, even if the number looks small.",
      },
      {
        type: "table",
        head: ["Query", "Position", "CTR", "Expected at that position", "Verdict"],
        rows: [
          ["Hypothetical query A", "2.1", "14%", "≈ 13%", "Good"],
          ["Hypothetical query B", "4.0", "2.1%", "≈ 6.6%", "Rewrite the snippet"],
          ["Hypothetical query C", "12.5", "0.9%", "≈ 1.1%", "Fine: the problem is the position"],
        ],
      },
      {
        type: "p",
        text: "Query C shows why CTR alone misleads. Its CTR is low because it is on page two; a better snippet will not fix that. That is a [striking-distance query](/en/resources/seo-quick-wins), and the work is on the page and its internal links.",
      },
      { type: "h2", id: "use-it", text: "Where the curve is used" },
      {
        type: "list",
        items: [
          "[SEO forecasting](/en/resources/seo-forecasting): estimating what a better position would add.",
          "[High impressions, low CTR](/en/resources/high-impressions-low-ctr): spotting snippets that lose clicks they should win.",
          "[Traffic drop diagnosis](/en/resources/organic-traffic-drop): telling a CTR drop from a ranking drop.",
        ],
      },
      {
        type: "faq",
        items: [
          { q: "What is the average CTR for position 1 on Google?", a: "It depends heavily on the query and the results page. On the non-brand baseline curve we use, position 1 earns about 23.5%. Brand queries often earn far more, and queries under a large AI Overview or a shopping block can earn far less." },
          { q: "Why is my CTR low even though I rank in the top 3?", a: "Usually something above you takes the click: an AI Overview, a featured snippet, ads or a map pack. Otherwise your title and description may be weaker than those around you, or the query's intent does not match your page." },
          { q: "Is a CTR curve from a study better than my own data?", a: "Not for your site. Studies are useful as a baseline when you have little data. Once you have enough rows per position, your own curve predicts your clicks better." },
          { q: "Does CTR affect rankings?", a: "Google does not publish CTR as a ranking factor, and claims either way are hard to verify. Treat CTR as a lever for clicks at the position you already hold, which is valuable on its own." },
        ],
      },
    ],
  },
  {
    slug: "seo-quick-wins",
    cluster: "forecasting",
    kind: "article",
    title: "SEO quick wins: five fixes you can find in Search Console today",
    seoTitle: "SEO Quick Wins from Search Console",
    description:
      "Striking-distance queries, weak snippets, orphaned pages, decaying winners and split rankings: where to find each quick win in Search Console and how to ship it.",
    primaryKeyword: "seo quick wins",
    secondaryKeywords: ["striking distance keywords", "page 2 keywords", "low hanging fruit seo"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**The fastest SEO wins come from demand you already have: queries where Google shows you often but you rank just below the clicks, or rank well but lose the click to a better snippet.** Search Console shows both for free. The five fixes below need no new content and no links, and most can be shipped in an afternoon.",
      },
      { type: "h2", id: "striking-distance", text: "1. Push striking-distance queries into the top 3" },
      {
        type: "p",
        text: "Striking-distance queries rank between positions 4 and 20 with real demand. Moving one from position 7 to 3 roughly triples its clicks on a typical curve, and Google already considers the page relevant, so the push is small.",
      },
      {
        type: "steps",
        howTo: { name: "Find striking-distance keywords in Google Search Console", description: "Filter Search Console to queries ranking 4 to 20 with enough impressions to matter." },
        items: [
          { title: "Open Performance → Search results", text: "Set the date range to the last 3 months and turn on Average position." },
          { title: "Exclude your brand", text: "Add a query filter → Custom (regex) → Doesn't match regex, with your brand names." },
          { title: "Sort by impressions", text: "Then scan the Position column for values between 4 and 20. Skip rows with only a handful of impressions." },
          { title: "Open the ranking page", text: "Click the query, then the Pages tab. If more than one page shows up, read [keyword cannibalization](/en/resources/keyword-cannibalization) first." },
          { title: "Strengthen that one page", text: "Answer the query in the first paragraph, cover what the top three results cover that you do not, use the query's words in a heading, and add two or three internal links from related pages with descriptive anchors." },
        ],
      },
      {
        type: "note",
        tone: "tip",
        text: "Search Console's own table cannot filter by position range. Export the queries and filter the Position column, or let the free [opportunity finder](/en/resources/search-console-opportunity-finder) do it and rank the results by clicks at stake.",
      },
      { type: "h2", id: "snippets", text: "2. Rewrite snippets that lose clicks they should win" },
      {
        type: "p",
        text: "A top-10 query earning well under the CTR its position usually earns has a snippet problem, not a ranking problem. Rewrite the title to lead with the words of the query and a concrete benefit, and the description to answer the question directly. [High impressions, low CTR](/en/resources/high-impressions-low-ctr) walks through the causes.",
      },
      { type: "h2", id: "internal-links", text: "3. Link to pages Google ranks but your site ignores" },
      {
        type: "p",
        text: "Sort Performance → Pages by impressions and check your top pages' internal links. A page that ranks on page one with only one internal link pointing at it is easy to strengthen: link to it from your highest-traffic related pages using the query as anchor text.",
      },
      { type: "h2", id: "refresh", text: "4. Refresh a winner that has started to slip" },
      {
        type: "p",
        text: "Compare the last 3 months with the previous 3 months on the Pages tab and sort by click difference. A former top page that has lost a fifth of its clicks is usually cheaper to refresh than a new page is to write. See [content decay](/en/resources/content-decay).",
      },
      { type: "h2", id: "split", text: "5. Consolidate rankings split across two pages" },
      {
        type: "p",
        text: "If two of your pages trade places for the same query, neither ranks as well as one combined page would. Pick the stronger one, merge the useful parts of the other into it and redirect.",
      },
      { type: "h2", id: "order", text: "Which quick win first?" },
      {
        type: "table",
        head: ["Fix", "Typical effort", "Where it shows up", "What it moves"],
        rows: [
          ["Striking distance (positions 4–10)", "Low", "Performance → Queries", "Position"],
          ["Striking distance (positions 11–20)", "Medium", "Performance → Queries", "Position"],
          ["Snippet rewrite", "Low", "Performance → Queries, CTR column", "CTR"],
          ["Internal links", "Low", "Performance → Pages + your own links", "Position"],
          ["Refresh a decaying page", "Medium", "Pages, compare mode", "Position and CTR"],
          ["Consolidate split pages", "Medium", "Query → Pages tab", "Position"],
        ],
      },
      {
        type: "p",
        text: "Rank them by estimated clicks divided by effort. The method is in [SEO forecasting](/en/resources/seo-forecasting). Then measure each one: compare the page's clicks over the same number of days before and after you shipped, and give Google two to four weeks to recrawl.",
      },
      {
        type: "faq",
        items: [
          { q: "What are striking distance keywords?", a: "Queries you already rank for between positions 4 and 20, with enough impressions to be worth pushing. Google sees your page as relevant, so a modest improvement can move it into the positions that get most of the clicks." },
          { q: "How long do SEO quick wins take to show results?", a: "Snippet rewrites can show within days of Google recrawling the page. Position changes from on-page work and internal links usually take two to six weeks." },
          { q: "Are quick wins enough for an SEO strategy?", a: "No. They monetize demand you already have. Growth beyond that needs new content for topics you do not rank for yet, and authority to compete for harder queries." },
        ],
      },
    ],
  },
];
