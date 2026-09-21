# ai-search

The six layers and the twelve page checks, as code: a page contract, the JSON-LD
graph derived from it, render primitives that put the same facts on the page,
and an auditor that reads the rendered HTML back and scores it.

Nothing here knows about this site. `src/lib/ai-search/*` has no imports outside
itself and no dependencies, so the folder plus `scripts/audit-ai-search.mjs`
copies into any Next.js (or any server-rendered) codebase unchanged.

## Why raw HTML

`checks.ts` parses served bytes with regex. No jsdom, no headless browser, no
JavaScript executed. That is the test, not a shortcut: GPTBot, ClaudeBot,
PerplexityBot and OAI-SearchBot fetch and parse, they do not render. Auditing
with a browser tells you what a browser sees, which is the one reader this is
not about.

## The three pieces

### 1. The contract — `contract.ts`

A page declares what it is: author, dates, the answer it leads with, the
questions it covers, the figures it will be quoted on.

```ts
const contract: AiPageContract = {
  url: 'https://example.com/guides/x',
  headline, description, locale,
  datePublished, dateModified,
  author: resolveAuthor(post.author),
  publisher: { name: 'Example', url: 'https://example.com' },
  takeaways: post.takeaways,          // answer first, each line liftable alone
  faqs,                               // rendered AND emitted as FAQPage
  data: [{ value, claim, method, measuredAt }],
  breadcrumbs,
  schemaType: 'BlogPosting',
};
```

`validateContract(contract)` returns the violations worth failing a build over:
a takeaway that opens with a backward reference, a figure with no method, a
`dateModified` that precedes `datePublished`.

### 2. The graph — `schema.ts`

`buildPageGraph(contract, { siteUrl })` returns one `@graph` whose nodes carry
`@id`s and reference each other: the article's `author` is an `@id` pointing at
the author node, which is the same entity the author page and the site-wide
`Organization` node describe. That referencing is the difference between markup
and an entity.

`buildWebPageNode()` is the page-level node for hubs, feature pages and legal
pages that are not articles. Without one, a page's only JSON-LD is the
site-wide Organization node and nothing in the markup is about the page.

A `Dataset` node is emitted per figure, and never for one marked
`illustrative: true` — the type asserts that something was measured.

### 3. The checks — `checks.ts`

Eighteen pure functions over `{ url, html, robotsTxt, hasLlmsTxt }`, mapped to
the layer each one belongs to. `auditPage()` runs them and returns a score and
a per-layer breakdown.

| Layer | Checks |
|---|---|
| SEO | one page one intent; indexable and canonical |
| AEO | answer first; fan-out H2s; tables and lists; FAQ matches schema |
| GEO | AI crawlers allowed; standalone passages; a number worth quoting; llms.txt; non-commodity (advisory) |
| AIO | server-rendered; schema present and parseable; author resolves; freshness shown |
| DEO | prices, terms and Offer/Service markup |
| SXO | heading order; alt text, internal links, viewport |

## Running it

```bash
npm run audit:ai-search                                   # localhost:3000
npm run audit:ai-search -- --base https://example.com     # any origin
npm run audit:ai-search -- --paths /a,/b --verbose
npm run audit:ai-search -- --min-score 80                 # exits 1 below the floor, for CI
npm run audit:ai-search -- --json report.json
```

With no `--paths` it samples evenly across the sitemap, so the sample is a
spread of templates rather than twelve copies of one.

## Components

`src/components/ai-search/` renders the visible half of the contract, and is
the only part of this that is styled for a particular site:

- `KeyTakeaways` — the answer above the fold, `data-ai="takeaways"`.
- `LastUpdated` — `<time dateTime>` carrying the same value as `dateModified`.
- `AuthorByline` — the name in the byline, linked, matching the author node.
- `StatCallout` — a figure with its claim, method and measurement date.

## What it will not do

It cannot tell you whether the page is worth citing. `checkNonCommodity` is
advisory for that reason: it looks for first-hand evidence markers and says so,
but a human decides whether the page says anything a model could not have
generated. Nothing here makes a citation owed to anyone.
