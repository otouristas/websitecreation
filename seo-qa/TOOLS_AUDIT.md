# Tools audit

## Finding: there is no tool on any of the nine tool pages

`/en/tools/[slug]` renders, in full: a breadcrumb, an H1, a one-paragraph
description, two buttons, a sentence of related links, and on three of nine an
FAQ block. Roughly 95 words.

The page says so itself:

> "The interactive tool runs on our secure app subdomain."

`src/app/[locale]/tools/[slug]/page.tsx` contains no form, no input, no state
and no client component. Every route's `appPath` deep-links to the separate
product SPA where the actual tool lives.

## Classification

Part 11 defines the categories. All nine fall in the same one.

| Tool | GSC impressions | Has FAQ | Classification | Action |
|---|---:|:--:|---|---|
| keyword-research | 0 | yes | PLACEHOLDER | NOINDEX |
| free-seo-audit | 0 | yes | PLACEHOLDER | NOINDEX |
| google-search-console-analytics | 2 | yes | PLACEHOLDER | NOINDEX |
| gsc-query-clustering | 0 | no | PLACEHOLDER | NOINDEX |
| semantic-keyword-clusters | 0 | no | PLACEHOLDER | NOINDEX |
| llm-citation-tracking | 0 | no | PLACEHOLDER | NOINDEX |
| seo-health-score | 0 | no | PLACEHOLDER | NOINDEX |
| internal-linking-opportunities | 0 | no | PLACEHOLDER | NOINDEX |
| free-seo-tools | 7 | no | PLACEHOLDER | NOINDEX |

"PLACEHOLDER" here means placeholder **as a tool page**, not that the underlying
tool is fake — the tools presumably work fine inside the app. The page is an
advertisement for a tool, and Part 11 is explicit: *do not index a "tool" that
is just marketing copy with no tool.*

## What changed

- All nine are `noindex, follow`. Routes stay live, navigation still works, and
  the app deep links are untouched — this is an indexing decision, not a
  deletion.
- Removed from `sitemap.ts`, so the sitemap no longer submits noindex URLs.
- `/tools` (the hub, 345 words listing all nine) **stays indexable**. It is a
  legitimate category page and the correct entry point for "free seo tools"
  intent.

Cost: **9 impressions and 0 clicks** across two URLs, over the whole export.

## Not attempted

Part 11 offers "PARTIAL: finish the functionality if safely possible from the
repository." None of these are partial — there is no tool code here to finish.
Building working SEO tools into the marketing site would be writing a product,
not completing one, and the results would need to be real to be publishable.

## Promotion path

Each of these becomes indexable again when the page itself does the job: the
tool embedded or genuinely usable on the page, with input, output, a worked
example, and honest limits. That is a product decision. Flip
`noIndex` in `src/app/[locale]/tools/[slug]/page.tsx` per-slug once it is true.
