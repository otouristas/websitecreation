# Platform feature audit

## The constraint that shaped every verdict

Part 3 asks me to inspect the application, determine whether each capability
really exists, and document inputs, outputs and limitations.

**I could not do that, and I did not pretend to.** The product is a separate
Vite SPA served from `app.anotherseoguru.com`; this repository is the marketing
site. `src/lib/app-links.ts` deep-links into it, but no application source is
present. There is no way to verify from here what any feature accepts, returns,
or cannot do.

The brief also says: do not fabricate product capabilities. Those two
instructions together rule out writing detailed feature specifications, so I did
not classify anything as "REAL" or "PLACEHOLDER" on evidence I do not have.
Every feature's existing claims (`marketing-features.json`) are the business's
own and were left untouched; nothing was added to them.

What could be decided honestly is whether each page **deserves to be indexed
today**, using two verifiable signals: measured Search Console demand, and
whether the page carries content that stands up without the app source.

## Verdicts

All 27 features shipped an identical shape: ~40-word overview, 5 benefits,
5 how-it-works steps, 4 use cases — roughly 115 rendered words.

| Feature | Impressions | Avg position | Tier | Action |
|---|---:|---:|:--:|---|
| semantic-keyword-clustering | 963 | 20.9 | A | KEEP_EXPAND |
| technical-seo-audits | 347 | 48.7 | A | KEEP_EXPAND |
| sprint-board-task-management | 96 | 42.6 | B | KEEP |
| multi-llm-ai-system | 7 | 53.7 | C | NOINDEX |
| ai-autopilot-mode | 5 | 21.6 | C | NOINDEX |
| competitor-content-spy | 4 | 51.0 | C | NOINDEX |
| ranking-predictions | 3 | 17.0 | C | NOINDEX |
| outreach-autopilot | 3 | 8.0 | C | NOINDEX |
| shopping-product-research | 2 | 29.0 | C | NOINDEX |
| content-gap-analysis | 2 | 19.5 | C | NOINDEX |
| serp-intent-mapper | 2 | 35.5 | C | NOINDEX |
| *18 further features* | 0 | — | C | NOINDEX |

**Tier C is not a claim that these features do not exist.** It says the page is
a 115-word restatement of five bullets with no measured demand, which is not
enough to justify an indexed URL. The routes stay live, the navigation still
lists them, the app links still work, and `noindex, follow` keeps their outgoing
links counting. Each is promoted the moment the page is actually written — which
needs the app source to describe honestly.

Total: **27 indexable → 3**. Impressions preserved: 1,406 of 1,436 (97.9%).
The 30 impressions dropped are spread across 8 URLs averaging position 30+.

## The two expansions

Both were written from **discipline knowledge, not product specification** — the
distinction that made them safe. Everything stated is true independently of any
tool, so no capability was invented. They live in
`src/data/platform-feature-explainers.ts`, whose header documents the boundary
for whoever edits it next.

### semantic-keyword-clustering — 115 → 867 words

The priority page: 963 impressions, 0 clicks, position 20.9. It was ranking on
page two for real demand while offering a paragraph.

Added: a direct-answer definition, why string matching fails, intent as the
second grouping axis, the four things clusters are actually used for (content
planning, topical maps, cannibalisation, internal linking), where clustering
goes wrong, and 5 FAQs with FAQPage schema.

### technical-seo-audits — 115 → 703 words

347 impressions at position 48.7. Added: the order checks matter in and why,
why most audits change nothing, and how auditing a templated site differs from
auditing a page-by-page one. Plus 4 FAQs with schema.

Note from the query data: the audit demand in Search Console is almost entirely
*local service* intent — "baltimore seo audit", "seo audit houston",
"seo audit ελλάδα". That belongs to the service × location pages, not to a
product feature page. The feature page was written for product intent and should
not chase those queries.

## Intent separation for the Python demand

`semantic keyword clustering python` is **181 of 429 clustering impressions** —
42% of the demand in this cluster is developer intent that a product page cannot
satisfy without lying about the implementation.

Per Part 4, this was split rather than absorbed:

| Intent | URL | Status |
|---|---|---|
| Product | `/en/platform/features/semantic-keyword-clustering` | Expanded |
| Informational | `/en/blog/semantic-keyword-clustering` | **New**, 1,193 words |

The article covers the no-code SERP-overlap method and the Python route
(embeddings → cosine similarity → agglomerative clustering, threshold tuning),
because that is genuine technique knowledge. **It does not claim the product is
built in Python or exposes a Python library** — the product page and the article
are cross-linked and target different intents.

## Overlap noted, not merged

`keyword-research-clustering` and `semantic-keyword-clustering` make overlapping
claims ("AI-powered semantic clustering by search intent" appears in both). That
is Part 3 category C. Both are now Tier C / Tier A respectively, so only the
demand-backed one is indexed and the cannibalisation is resolved in practice. A
真 merge should be decided with the product team, not inferred from marketing
copy.
