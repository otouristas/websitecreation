# Programmatic SEO quality report

## The question this had to answer

Not "are pages long enough". Part 12 is explicit that word count is a diagnostic,
not the pass condition, and that the real test is whether **every indexable page
deserves independent search existence**.

Three families failed that test. Each failed for a different reason, so each got
a different remedy.

| Family | Before | After | What was actually wrong |
|---|---:|---:|---|
| industry × service | 744 | **255** | Cartesian product; page existed because the URL could be generated |
| platform features | 27 | **3** | Real capabilities, unverifiable from this repo, 115-word pages |
| tools | 9 | **0** | No tool on the page |

Total indexable: **2,217 → 1,696**. Thin pages (<350 words): **802 → 23**.

## Industry × service: from 744 to 255

### What decides

`src/lib/indexability/industry-service.ts` takes two independent inputs and
deliberately ignores body length.

**Editorial relevance** (`data/industry-service-relevance.ts`): each of the 31
industries declares the services businesses in it actually buy. A plumber does
not buy e-shop SEO. A hotel does not buy WooCommerce. Those pairings exist
because 31 × 12 is a valid loop, not because anyone searches for them.

**Measured demand** (`data/gsc-pages.ts`, generated from the real export): what
Search Console already reports for the URL.

Demand overrides editorial judgement in both directions, and **clicks are
decisive** — a URL that has earned a click is never demoted, whatever the matrix
says. Losing a converting page to a tidy taxonomy is the worse outcome.

### Tiers applied

| Tier | Count | Rule | Action |
|:--:|---:|---|---|
| A | 31 | Clicks > 0, or core service with ≥5 impressions | KEEP_EXPAND, indexed |
| B | 224 | Core service, no history yet | KEEP, indexed |
| C | 2 | Off-topic but ≥60 impressions | CONSOLIDATE to hub |
| D | 487 | Outside the industry's core set | CONSOLIDATE to hub |

### GSC preservation (Part 7)

**All 4 clicks preserved. 0 lost.** Impressions: 944 kept, 656 consolidated.

The four click-earning URLs were inspected individually as instructed:

- `/el/solutions/real-estate/eshop-woocommerce` — 1 click, 23 impressions,
  position 28.8. Off-matrix, kept on the clicks rule.
- `/solutions/real-estate/website-creation` — 1 click, 18 impressions. Core. Kept.
- `/solutions/gyms/speed-optimization` — 1 click, 5 impressions. Off-matrix, kept.
- `/el/solutions/cleaning-services/eshop-seo` — 1 click, **1 impression**,
  position 3. Off-matrix. Kept on the clicks rule, but flagged: a single
  impression converting once is a long-tail fluke, not evidence a cleaning
  company wants e-commerce SEO. Revisit at the next export.

The named high-impression URLs were also evaluated on intent rather than volume,
exactly as Part 7 requires:

| URL | Impressions | Position | Verdict |
|---|---:|---:|---|
| `/el/solutions/hotels/website-creation` | 290 | 66.6 | **Kept** — core hospitality service |
| `/el/solutions/hotels/local-seo` | 66 | 53.3 | **Kept** — core |
| `/el/solutions/real-estate/website-creation` | 74 | 40.5 | **Kept** — core |
| `/el/solutions/real-estate/content-creation` | 53 | 61.1 | **Kept** — core |
| `/el/solutions/rent-a-car/eshop-seo` | 73 | 25.9 | Consolidated — rent-a-car has no storefront |
| `/el/solutions/plastic-surgeons/eshop-seo` | 62 | 19.7 | Consolidated — clinics do not sell products online |
| `/el/solutions/lawyers/eshop-seo` | 43 | 58.2 | Consolidated — the example Part 7 names |
| `/el/solutions/salons/eshop-seo` | 32 | 16.1 | Consolidated — same mismatch |

The consolidated e-shop pages were ranking for generic "e-shop SEO" queries, not
for the pairing. That intent is served better by `/services/eshop-seo` and by
the industry hub, both of which remain indexed.

### Differentiation, not padding (Part 10)

The kept 255 went from 227 to **440 median words** (min 385) — but the number is
not the point. What changed is that the pages now differ on two real axes:

- **Service axis** — `data/industry-service-copy.ts` carries an authored
  approach / process / outcome per service, in EN and EL, plus 3 FAQs per
  service with FAQPage schema. Grounded in the deliverables already published
  in `services-i18n.ts`.
- **Industry axis** — the authored `painPoints` and the demand rationale from
  the relevance matrix.

No statistic, benchmark, regulation, client, result or price was invented.
Where the old copy quoted prices, it now defers to `/pricing`.

## Why not just noindex everything thin

Because that is not what PASS means. 487 pages were consolidated because the
industry hub genuinely satisfies the intent — not because they were short. The
255 that stayed were kept because the pairing is a real purchase, and they were
then made worth keeping. A page removed for being short and a page removed for
having no reason to exist are different decisions; only the second is defensible.

## Remaining thin pages: 23

None are programmatic filler.

| Page | Words | Why it stays |
|---|---:|---|
| `/en,/el/get-started` | 3, 4 | Conversion form; branded intent, no SEO body needed |
| `/en,/el/glossary` | 7, 8 (in `<main>`) | **Fixed** — 105 terms now server-rendered outside `<main>`; 1,498 words with JS off |
| `/en/platform/for/*` | 75–93 | Real audience pages, newly linked from the platform hub |
| `/privacy`, `/terms`, `/contact` | 77–114 | Utility pages that must stay indexable |
| `/en/compare/*` | 112–114 | Genuine comparison intent |
| `/en/platform/features/sprint-board-task-management` | 206 | Kept on 96 impressions; **flagged** — thinnest indexed feature |
| `/el/blog/topics/*` | 276, 317 | Topic hubs listing real articles |

## Honest caveats

1. **`sprint-board-task-management` is the weakest page still indexed.** It sits
   on demand alone (96 impressions, position 42.6) with 206 words. It should be
   expanded or dropped at the next review; it is indexed today because removing
   a page with measured demand needs a better reason than its length.
2. **The GSC export is a snapshot** (`lets-rank-first/Pages.csv`, top 1,000
   pages, single date range). Tier decisions rest on it, so re-run
   `scripts/programmatic-migration-plan.ts` against a fresh export before
   treating any Tier C/D verdict as settled.
3. **Consolidation is noindex, not redirect.** The routes stay reachable and
   `follow` keeps their links counting. Redirecting 489 URLs to industry hubs
   would be the more aggressive move and is reversible only with effort;
   noindex is reversible by changing one matrix entry.
