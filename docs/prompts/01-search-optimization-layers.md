# Prompt 1 — Implement the six layers of search optimization in this codebase

Copy everything below the line into an agent working on any website codebase.

---

You are working in an existing website codebase. Implement the six layers of
modern search optimization as **working infrastructure in the code**. Do not
write an article about them. Do not add a page that explains them. Nobody
should be able to tell this work happened by reading the site; they should only
be able to tell by auditing it.

## The model

| # | Layer | Goal | Lives in code as |
|---|---|---|---|
| 01 | SEO | Get crawled, indexed, ranked | robots, sitemaps, canonicals, hreflang, metadata, heading order |
| 02 | AEO | Become the direct answer | answer-first blocks, question-shaped H2s, tables, FAQ that matches its schema |
| 03 | GEO | Get cited by AI | AI-crawler access, server-rendered text, standalone passages, attributed original data, llms.txt |
| 04 | AIO | Be machine-readable | a page-level JSON-LD node, an `@graph` with `@id` references, a resolvable author entity, visible `dateModified` |
| 05 | DEO | Get chosen by an assistant | Offer/Service/Product markup with price, availability, terms |
| 06 | SXO | Convert the visit | viewport, alt text, internal links, speed, CTA path |

They **stack**. A page a crawler cannot fetch is not a candidate for a
citation, a recommendation or a conversion. Work bottom-up and do not skip.

## Non-negotiables

1. **Never invent data.** If a layer wants an original statistic and the
   codebase has none, say so and leave the check failing. Do not fabricate a
   benchmark, a sample size, a client result or a testimonial to clear a rule.
2. **Never assert in markup what the page does not show.** Every `dateModified`,
   author, FAQ answer and price in JSON-LD must be visible in the rendered HTML.
   This is Google's structured-data policy and the only version that survives a
   fact-checking model.
3. **Never bolt `FAQPage` onto a programmatic template set.** Duplicated FAQ
   markup across hundreds of URLs asserts a rich result the site cannot earn.
   FAQ belongs where the questions are real and unique to that page.
4. **Do not invent people.** If the site has no named authors, model the
   organization that does exist as a proper entity and leave a documented slot
   for real people.
5. **Minimal diffs.** Fix causes in templates and shared components, never
   page-by-page when a template is the cause.

## Step 0 — build the auditor first, and measure

Before changing any page, build the measurement, because otherwise you are
guessing about what is broken and cannot prove you fixed it.

Create two things:

- `lib/ai-search/checks.ts` — pure functions taking
  `{ url, html, robotsTxt, hasLlmsTxt }` and returning
  `{ id, layer, title, status: 'pass'|'fail'|'warn'|'na', detail }`.
  **No imports, no dependencies, no network.** Parse raw HTML with regex.
- `scripts/audit-ai-search.mjs` — fetches raw HTML over `fetch`, samples the
  sitemap evenly (or takes `--paths`), runs the checks, prints per-page results
  plus per-layer totals and the failures that repeat across templates. Supports
  `--base <origin>`, `--limit`, `--json <file>`, `--min-score <n>` (exit 1
  below the floor, for CI). Wire it up as `npm run audit:ai-search`.

**Parse raw HTML. No jsdom, no Playwright, no headless browser.** That is the
test, not a shortcut: GPTBot, ClaudeBot, PerplexityBot and OAI-SearchBot fetch
and parse, they do not execute JavaScript. A browser-based audit measures the
one reader this work is not about.

Run it against a production build of the current site and **record the
baseline** — mean score and per-layer percentages. You will be judged on the
delta, so keep the sample fixed between runs.

## Step 1 — SEO

Check and fix: exactly one `<h1>` per page; `<title>` under ~60 characters; a
canonical whose **path** matches the page (compare paths, not origins, or every
staging mirror fails); a meta description in range; `hreflang` on localized
pages; the sitemap listing every indexable URL and nothing noindexed; headings
that descend one level at a time.

## Step 2 — AEO

Every content page opens with an **answer-first block**: 4–6 sentences under
the H1, before the first H2, each written to survive being lifted out alone —
no "as mentioned above", no pronoun pointing backwards. Build it as a component
with a stable hook (`data-ai="takeaways"`) so the auditor can find it, and feed
it from the same data the schema's `abstract` uses so they cannot drift.

Give each sub-question its own H2, phrased as it would be asked. Put figures in
`<table>` with real `<th>`, sequences in `<ol>`. Where an FAQ exists, render the
answers in the HTML and emit `FAQPage` from the **same array**.

## Step 3 — GEO

Verify `robots.txt` explicitly allows `GPTBot`, `OAI-SearchBot`, `ClaudeBot`,
`PerplexityBot` and `Google-Extended`. Remember a named user-agent group
*replaces* the `*` group, so a named group with no rules inherits nothing.

Verify content is server-rendered: count words in the served HTML, not in the
browser. Anything drawn client-side does not exist for these crawlers.

Publish `/llms.txt`. Then find the one figure the codebase can actually prove —
a count derived from real records, a measurement you ran — and publish it with
its **value, claim, method and measurement date**, marked up as `Dataset`. If
there is genuinely nothing, leave the check failing and report it.

## Step 4 — AIO

Every page carries a page-level JSON-LD node (`WebPage`, `Article`,
`CollectionPage`, `Service` — something about *this page*). A page whose only
structured data is the site-wide `Organization` node has no markup about itself.

Emit **one `@graph`** whose nodes carry `@id`s and reference each other, not a
pile of disconnected blocks. The article's `author` should be an `@id` pointing
at an author node that also has a `url` and `sameAs` profiles — otherwise the
author is a string, not an entity.

Every page that asserts `dateModified` must render that date in `<time
dateTime="YYYY-MM-DD">`. Check this by attribute, not by text: a non-English
page renders its own month names.

## Step 5 — DEO

Anywhere the site shows prices or availability, emit `Offer` / `Service` /
`Product` with `price`, `priceCurrency` and availability, and link the terms
and policies an assistant would compare on. Do **not** add Offer markup to
editorial pages that merely mention a price.

## Step 6 — SXO

`viewport` meta present; every `<img>` has `alt`; at least a few internal links
per page so nothing is a dead end; the conversion path reachable without
JavaScript.

## Definition of done

- `npm run audit:ai-search` exists, runs against any origin, and is documented.
- You report **baseline → final** mean score and per-layer percentages on the
  same fixed sample.
- Every remaining failure is listed with a one-line reason, and any failure you
  chose not to fix is explained as a deliberate decision, not an oversight.
- `lint`, typecheck and build all pass.
- The fixes live in templates and shared components. State how many URLs each
  template-level fix covers.
