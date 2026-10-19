import type { ResourceArticle } from "./types";

const PUBLISHED = "2026-10-19";

export const TRAFFIC_DROP_ARTICLES: ReadonlyArray<ResourceArticle> = [
  {
    slug: "organic-traffic-drop",
    cluster: "traffic-drops",
    kind: "pillar",
    title: "Organic traffic drop: how to find the cause in seven checks",
    seoTitle: "Organic Traffic Drop: Find the Cause",
    description:
      "A diagnosis order for a drop in organic traffic: measurement, seasonality, indexing, Google updates, results-page changes, competitors and decaying pages, with the Search Console view for each.",
    primaryKeyword: "organic traffic drop",
    secondaryKeywords: ["website traffic down", "why did my organic traffic drop", "traffic drop", "organic traffic down"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**When organic traffic drops, find out whether you lost rankings, lost demand or lost clicks at the same rankings before changing anything.** Search Console answers that in minutes: compare the drop period with the period before and the same period last year, and look at what happened to position, impressions and CTR. Then work through the seven checks below in order, because the early ones are the cheapest to rule out and the most common.",
      },
      { type: "h2", id: "first-look", text: "The first look: rankings, demand or clicks?" },
      {
        type: "table",
        head: ["Clicks fell and…", "It is most likely", "Go to"],
        rows: [
          ["Average position fell", "A ranking loss", "Checks 3, 4, 6 and 7"],
          ["Impressions fell, position held", "A demand change", "Check 2"],
          ["CTR fell, position and impressions held", "Something on the results page takes the click", "Check 5"],
          ["Search Console is flat but Analytics fell", "A measurement problem", "Check 1"],
        ],
      },
      { type: "h2", id: "check-1", text: "1. Is it real? Rule out measurement" },
      {
        type: "list",
        items: [
          "Compare Search Console clicks with Analytics sessions from organic search. If only Analytics dropped, look at tracking, consent banners and recent site releases before SEO.",
          "Check that the date range does not end on the last two or three days, which are still being filled in.",
          "Check that a filter (country, device, page) is not still on from a previous session.",
        ],
      },
      { type: "h2", id: "check-2", text: "2. Is it seasonal, or did demand fall?" },
      {
        type: "p",
        text: "Compare with the same weeks last year. A ski resort loses clicks every spring; that is not a problem. If impressions for your top non-brand queries fell while your positions held, demand fell, and rewriting pages will not bring it back. Note it in your report and move on.",
      },
      { type: "h2", id: "check-3", text: "3. Did pages fall out of the index?" },
      {
        type: "list",
        items: [
          "**Indexing → Pages:** a jump in “Excluded by noindex tag”, “Blocked by robots.txt” or “Page with redirect” right before the drop is the classic release mistake.",
          "**URL Inspection** on your top lost pages: is the page indexed, and is the Google-selected canonical the one you expect?",
          "**Recent releases:** a migration, a new template, a CMS update or a change to robots.txt in the week before the drop is a strong suspect.",
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "Indexing problems are the one cause where hours matter. If your key pages are noindexed or blocked, fix that before anything else on this list.",
      },
      { type: "h2", id: "check-4", text: "4. Did it coincide with a Google update?" },
      {
        type: "p",
        text: "Google publishes confirmed ranking updates on its Search Status Dashboard. If the drop starts within a few days of a core update and is spread across many pages, it is most likely a broad reassessment of quality rather than a technical fault. Recovery then comes from improving the affected content and is usually only visible after a later update, not within days. Mark updates on your chart so the timing is easy to see; AnotherSEOGuru App adds confirmed updates to its charts automatically.",
      },
      { type: "h2", id: "check-5", text: "5. Did the results page change?" },
      {
        type: "p",
        text: "If position held but CTR fell, search your top lost queries. A new AI Overview, a featured snippet held by someone else, more ads or a video carousel above you all push clicks down without any ranking change. The response is different for each, and covered in [high impressions, low CTR](/en/resources/high-impressions-low-ctr).",
      },
      { type: "h2", id: "check-6", text: "6. Did a competitor overtake you?" },
      {
        type: "p",
        text: "For each lost query, see who now ranks above you and what their page has that yours lacks: a newer date, a tool, a table, a clearer answer, more depth. A loss concentrated in one topic usually means one competitor did better work there.",
      },
      { type: "h2", id: "check-7", text: "7. Is it a few pages decaying?" },
      {
        type: "p",
        text: "On Performance → Pages, compare periods and sort by click difference. If a handful of pages account for most of the loss, this is [content decay](/en/resources/content-decay), and refreshing those pages is the fix. Also check whether two of your own pages started swapping places for the same query: that is [keyword cannibalization](/en/resources/keyword-cannibalization).",
      },
      { type: "h2", id: "share-of-loss", text: "Find where the loss is concentrated" },
      {
        type: "steps",
        howTo: { name: "Locate an organic traffic drop in Search Console", description: "Break a sitewide drop down by page, query, country and device to find where the clicks were lost." },
        items: [
          { title: "Compare two equal periods", text: "Date → Compare: the four weeks since the drop against the four weeks before it." },
          { title: "Pages tab, sorted by click difference", text: "Add up the top ten losses. If they explain most of the drop, the problem is local to those pages." },
          { title: "Queries tab, non-brand", text: "Check whether the lost queries share a topic or intent." },
          { title: "Countries and Devices tabs", text: "A drop in one country or only on mobile points to a specific cause such as a local competitor or a mobile rendering issue." },
          { title: "Write down the cause", text: "Rankings, demand or CTR, for each of the biggest losses. That sentence decides the fix." },
        ],
      },
      { type: "h2", id: "what-not-to-do", text: "What not to do in the first week" },
      {
        type: "list",
        items: [
          "Rewrite every page at once. You will not know what helped.",
          "Disavow links in a panic. Link spam is rarely the cause of a sudden drop.",
          "Change URLs. A migration on top of a drop makes both harder to read.",
          "Report a cause before you have checked the first three items above.",
        ],
      },
      { type: "h2", id: "cluster", text: "In this guide" },
      {
        type: "cards",
        cols: 2,
        items: [
          { title: "Content decay", text: "Find pages losing clicks slowly and decide whether to refresh, merge or remove them.", href: "/en/resources/content-decay", icon: "bar-chart" },
          { title: "How to analyze Search Console data", text: "The five questions behind every useful Search Console review.", href: "/en/resources/search-console-analysis", icon: "search" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "Why did my organic traffic suddenly drop?", a: "The most common causes are, in order: a measurement or tracking change, seasonality, pages dropping out of the index after a release, a Google core update, a change on the results page such as a new AI Overview, and competitors. Search Console shows which by comparing position, impressions and CTR before and after." },
          { q: "How do I know if a Google update hit my site?", a: "Check whether the drop starts within a few days of a confirmed update on Google's Search Status Dashboard, and whether it is spread across many pages and queries rather than concentrated in one section." },
          { q: "How long does it take to recover from a traffic drop?", a: "Technical causes such as an accidental noindex can recover within days to weeks once fixed and recrawled. Losses from a core update usually recover, if at all, after content improvements and a later update, which can take months." },
          { q: "Should I compare with last month or last year?", a: "Both. The previous period shows when the drop started; the same period last year shows whether it is seasonal." },
        ],
      },
    ],
  },
  {
    slug: "content-decay",
    cluster: "traffic-drops",
    kind: "article",
    title: "Content decay: how to find pages losing traffic and what to do with each",
    seoTitle: "Content Decay: Find, Refresh or Prune Pages",
    description:
      "Spot content decay in Search Console, tell a ranking slide from falling demand, and decide per page whether to refresh, merge, redirect or leave it, with a refresh checklist.",
    primaryKeyword: "content decay",
    secondaryKeywords: ["content refresh", "content decay seo", "content pruning"],
    cta: "soft",
    published: PUBLISHED,
    updated: PUBLISHED,
    body: [
      {
        type: "p",
        text: "**Content decay is the gradual loss of organic clicks on a page that used to perform, usually because competitors published something better, the information aged, or the results page changed.** To find it, compare each page's clicks with an earlier period in Search Console and look for meaningful pages that lost a large share. Then diagnose each one before acting: a page losing demand needs nothing, a page losing rankings needs a refresh, and a page losing clicks at the same ranking needs a better snippet.",
      },
      { type: "h2", id: "find", text: "Finding decaying pages" },
      {
        type: "steps",
        howTo: { name: "Find content decay in Google Search Console", description: "Compare page clicks across two periods to find pages losing organic traffic." },
        items: [
          { title: "Choose the comparison", text: "Last 3 months against the previous 3 months. For seasonal sites, last 3 months against the same 3 months a year earlier." },
          { title: "Pages tab, sorted by click difference", text: "The biggest absolute losses are at the top." },
          { title: "Set a threshold", text: "Ignore pages that had few clicks to begin with. A useful starting rule is pages that had at least 40 clicks a month and lost at least 20% of them." },
          { title: "Export the list", text: "Keep the URL, clicks before and after, position before and after, and impressions before and after." },
        ],
      },
      { type: "h2", id: "diagnose", text: "Diagnose before you refresh" },
      {
        type: "table",
        head: ["What changed", "Diagnosis", "Action"],
        rows: [
          ["Position dropped by 1.5 or more", "Rankings slipped", "Refresh the content; check what now outranks you"],
          ["Impressions fell 30%+, position held", "Demand fell", "Check seasonality; leave the page alone if it is seasonal"],
          ["CTR fell 25%+, position held", "A results-page feature or rival snippet takes clicks", "Rewrite the title and description; aim for the AI Overview citation"],
          ["All three softened", "Mixed", "Refresh, then watch which metric recovers"],
        ],
      },
      {
        type: "p",
        text: "These thresholds are the ones AnotherSEOGuru App's decay detector uses to label a page's likely cause. They are a starting point; tune them to your site.",
      },
      { type: "h2", id: "decide", text: "Refresh, merge, redirect or leave it" },
      {
        type: "table",
        head: ["Page", "Decision"],
        rows: [
          ["Still matches a real query, lost rankings", "Refresh"],
          ["Overlaps with a stronger page on the same topic", "Merge into the stronger page and redirect"],
          ["Covers something that no longer exists (old product, retired feature)", "Redirect to the closest current page"],
          ["No meaningful demand, no links, no business value", "Remove or noindex (content pruning)"],
          ["Seasonal or demand-driven loss", "Leave it"],
        ],
      },
      { type: "h2", id: "refresh-checklist", text: "A refresh checklist that actually moves rankings" },
      {
        type: "list",
        items: [
          "Search the page's main query and read the current top three. Write down what they cover that you do not.",
          "Rewrite the opening so the answer comes in the first paragraph.",
          "Replace outdated facts, screenshots, prices and examples. Remove what is no longer true.",
          "Add what is missing: a step, a table, an example, a FAQ answering the questions in “People also ask”.",
          "Check the title and description against the queries the page gets impressions for today, not the ones it was written for.",
          "Add internal links to it from newer related pages, with descriptive anchors.",
          "Update the visible “last updated” date only if the content really changed.",
        ],
      },
      {
        type: "note",
        tone: "warning",
        text: "Changing only the date is not a refresh. It does not make the content more useful, and readers notice.",
      },
      { type: "h2", id: "measure", text: "Measure every refresh" },
      {
        type: "p",
        text: "Note the date you shipped. After four weeks, compare the page's clicks over the same number of days before and after, leaving the ship day out. Compare against the rest of the site over the same days so a sitewide rise or seasonal swing is not credited to your refresh. That is how AnotherSEOGuru App measures shipped tasks, and it works just as well in a spreadsheet.",
      },
      { type: "h2", id: "cadence", text: "How often to check" },
      {
        type: "p",
        text: "Monthly for sites that publish regularly, quarterly for smaller sites. Decay is slow, so a weekly check mostly shows noise. Put the review in the same meeting as your [Search Console analysis](/en/resources/search-console-analysis), and if a drop is sudden and sitewide, use the [traffic drop diagnosis](/en/resources/organic-traffic-drop) instead.",
      },
      {
        type: "faq",
        items: [
          { q: "What causes content decay?", a: "Usually competitors publishing more complete or newer pages, information going out of date, new results-page features taking clicks, or your own newer pages competing with the old one." },
          { q: "How often should I refresh content?", a: "When the data says so, not on a fixed schedule. Pages about prices, tools and rules need checking at least once a year; evergreen explanations can go years without a change." },
          { q: "Is content pruning good for SEO?", a: "Removing or merging pages with no demand, no links and no purpose can help Google focus on your useful pages. Removing pages that still get clicks or links usually hurts. Prune by data, not by age." },
          { q: "Should I change the URL when I refresh a page?", a: "No. Keep the URL so the page keeps its history and links. Change the URL only when merging into another page, with a 301 redirect." },
        ],
      },
    ],
  },
];
