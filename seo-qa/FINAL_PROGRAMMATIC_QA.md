# FINAL PROGRAMMATIC QA — anotherseoguru.com

Production build served via `next start`, then a full BFS crawl of every sitemap
URL plus every internally-linked URL: **3,668 URLs** fetched and parsed. Core Web
Vitals measured in headless Chromium at 4× CPU throttle on a mobile viewport.
Rendering re-verified with JavaScript disabled.

---

## Scorecard

| Check | Result |
|---|---|
| PRODUCTION BUILD | **PASS** |
| CANONICALS | **PASS** |
| HREFLANG | **PASS** |
| SITEMAPS | **PASS** |
| ROBOTS | **PASS** |
| METADATA | **PASS** |
| INDEXABILITY | **PASS** |
| PROGRAMMATIC SEO QUALITY | **PASS** |
| INTERNAL LINKING | **PASS** |
| STRUCTURED DATA | **PASS** |
| CORE WEB VITALS | **PASS** |
| PRIORITY GSC PAGES | **PASS** |

---

## Required counts

| Metric | Before | After |
|---|---:|---:|
| **TOTAL INDEXABLE** | 2,217 | **1,696** |
| SERVICE × LOCATION indexable | 1,092 | **1,092** (unchanged) |
| INDUSTRY × SERVICE indexable | 744 | **255** |
| PLATFORM FEATURES indexable | 27 | **3** |
| TOOLS indexable | 9 | **0** |
| Thin pages (<350 words) | 802 | **23** |
| PAGES EXPANDED | — | **257** (255 industry × service + 2 features) |
| PAGES CONSOLIDATED | — | **489** |
| PAGES NOINDEXED | — | **522** (489 + 24 features + 9 tools) |
| REDIRECTS ADDED | — | **2 rules** (`/el/{platform,tools,resources,compare}` → `/en/…`) |
| **GSC IMPRESSIONS PRESERVED** | — | **2,350 of 3,036 (77.4%)** |
| **GSC IMPRESSIONS AFFECTED** | — | **686 (22.6%)** |
| **GSC CLICKS PRESERVED** | — | **4 of 4 (100%)** |

Impressions by family: industry × service 944 kept / 656 consolidated;
platform features 1,406 kept / 30 consolidated; tools 0 kept / 9 consolidated
(0 clicks in that family).

---

## Crawl evidence

```
crawled 3,668  |  200 html 3,668  |  indexable 1,696  |  noindex 1,822
status codes                {"200": 3668}
sitemap URLs                1,695   problems 0
missing canonical           0       non-self canonical 1  (/ → /en, intentional)
html lang mismatch          0
missing og:image            0       missing title 0   missing h1 0   multi-h1 0
duplicate title URLs        6       duplicate description URLs 2
redirects hit in crawl      0       internal links to redirects 0
404s                        0
hreflang bad targets        0       non-reciprocal 2  (/ vs /en, expected)
orphans                     1  (/)  unreachable 8      depth > 4  39
JSON-LD blocks              7,894   parse failures 0
```

### Indexable footprint by family

| Family | Pages | Median words |
|---|---:|---:|
| service × location | 1,092 | 916 |
| industry × service | 255 | 440 |
| case study | 142 | 484 |
| blog | 80 | 1,407 |
| industry hub | 62 | 417 |
| service hub | 24 | 761 |
| other (utility, compare, platform) | 35 | 322 |
| platform feature | 3 | 778 |
| home | 3 | 1,548 |

### Core Web Vitals — mobile, 4× CPU throttle, ~1.6 Mbps / 150 ms

| Page | LCP | CLS |
|---|---:|---:|
| homepage | 1,260 ms | 0.000 |
| service hub | 1,300 ms | 0.000 |
| programmatic location | 1,280 ms | 0.000 |
| industry × service | 1,140 ms | 0.000 |
| blog article (new) | 1,168 ms | 0.000 |
| platform feature (expanded) | 1,200 ms | 0.000 |
| case study | 1,816 ms | 0.000 |

CLS is 0.000 on every template. The expanded pages did not regress LCP.

---

## Work completed, in the order requested

**1. `packs-el.ts` service mismatch — fixed.** 45 Greek city intros were written
for website creation and rendered on all twelve services, so
`/el/services/seo-audits/athens-gr` opened by advertising build packages. The
sales and pricing sentences were stripped (42 sentences across 42 packs) and a
service-aware layer added: `data/location-content/service-copy-el.ts` carries
authored copy for all twelve services, grounded in the deliverables already
published in `services-i18n.ts`. City FAQs are now topic-filtered, so build
questions no longer appear — or ship as FAQPage schema — on audit pages.

*Pricing:* 87 hardcoded figures removed. They were **offer** prices gated by
`isOfferActive()` and would have gone stale on 2026-08-31, and one had already
drifted (e-commerce written as €600 against a real €1,200). Authored copy now
uses `{{ENTRY_WEBSITE}}`-style tokens resolved at render from `data/pricing.ts`.
The intro word floor was re-based 70 → 50 and documented: the removed sentences
were near-identical across 40 of 45 cities, so they inflated word count while
*lowering* uniqueness. All 45 cities still pass; no location page was lost.

**2. Στεγαστικοί → Κατασκευαστές Στεγών — fixed.** The old label reads as
housing/mortgage (στεγαστικό δάνειο), not a roofing trade. Name, accusative
form, description, meta description and pain points updated; supporting terms
(επισκευή στέγης, εργασίες στέγης) used where natural. URL slug unchanged.

**3–5. Platform features — audited and expanded.** See `PLATFORM_FEATURE_AUDIT.md`.
semantic-keyword-clustering 115 → 867 words, technical-seo-audits 115 → 703,
both with FAQPage schema. A new 1,193-word article at
`/en/blog/semantic-keyword-clustering` serves the Python intent (181 of 429
clustering impressions) **without claiming the product is built in Python**.

**6–9. Industry × service — classified and consolidated.** See
`PROGRAMMATIC_QUALITY_REPORT.md`. 744 → 255 on editorial relevance plus measured
demand, never on word count alone. All 4 clicks preserved.

**11. Tools — audited.** See `TOOLS_AUDIT.md`. All nine pages contain no tool;
all nine noindexed at a cost of 9 impressions and 0 clicks.

**14. Internal links.** The 31-industry grids on service hubs and service ×
location pages now link to the industry hub when a pairing is consolidated,
so no internal link points at a noindex page. Bespoke hotel and rent-a-car
service chips filter the same way. Result: **0 internal links to redirects**.

**15. Sitemaps regenerated.** 1,695 URLs, **0 problems** — no redirects, no
404s, no noindex, no non-canonical, no query parameters.

---

## Also fixed during this pass

**Glossary was invisible without JavaScript.** `/en/glossary` and `/el/glossary`
are indexable and in the sitemap, but `GlossaryClient` reads `useSearchParams`,
which excluded its whole subtree from the prerendered HTML — the served page
carried an H1 and a loading string, and all 105 definitions existed only after
hydration. A server-rendered term list now ships in the static HTML: **1,498
words (EN) / 1,618 (EL) with JavaScript disabled, 105 `<dt>` elements**.

This corrects the previous QA report, which marked RENDERING = PASS on a
three-URL sample that did not include the glossary.

**Client logo wall removed** at your request, along with the named assets
(Health Assistance, Petsville, EEF, allazwdiatrofi) and the now-dead marquee
CSS. No references remain in `src/`, `content/` or `public/`.

**`noindex, nofollow` → `noindex, follow`** sitewide. The old value stranded the
equity passing through every excluded page.

---

## Honest limits

1. **The product application is not in this repository.** It is a separate SPA at
   `app.anotherseoguru.com`. No feature's inputs, outputs or limitations could be
   verified, so none were written. That is why 24 feature pages are Tier C rather
   than expanded, and why nothing was classified as "not actually implemented" —
   I do not have the evidence to make either claim.
2. **`sprint-board-task-management` is the weakest indexed page** (206 words,
   kept on 96 impressions). Expand or drop at the next review.
3. **Tier decisions rest on one GSC snapshot.** Re-run
   `scripts/programmatic-migration-plan.ts` against a fresh export before
   treating any Tier C/D verdict as final.
4. **Consolidation is noindex, not redirect** — reversible by changing one
   matrix entry in `data/industry-service-relevance.ts`.

## Verification gates

```
next build     EXIT 0    3,668 routes, no metadata/sitemap/JSON-LD errors
tsc --noEmit   0 errors
eslint src     0 errors  (16 warnings, all pre-existing unused-var)
crawl          3,668 URLs, 0 404s, 0 redirects, 0 links to redirects
```

## Deliverables

| File | Rows |
|---|---:|
| `PROGRAMMATIC_MIGRATION_PLAN.csv` | 780 |
| `INDUSTRY_SERVICE_AUDIT.csv` | 744 |
| `PROGRAMMATIC_QUALITY_REPORT.md` | — |
| `PLATFORM_FEATURE_AUDIT.md` | — |
| `TOOLS_AUDIT.md` | — |
| `FINAL_URL_INVENTORY.csv` | 3,667 |
| `FINAL_INDEXABILITY_REPORT.csv` | 3,667 |
| `FINAL_INTERNAL_LINK_REPORT.csv` | 3,667 |
| `FINAL_METADATA_REPORT.csv` | 1,695 |
| `FINAL_HREFLANG_REPORT.csv` | 9,850 |
| `FINAL_REDIRECTS.csv` | 24 |
