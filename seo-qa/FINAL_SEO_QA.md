# FINAL SEO QA — anotherseoguru.com

**Method:** production build (`next build`, 3,079 prerendered routes) served via `next start`,
then a full BFS crawl of every sitemap URL plus every internally-linked URL — **3,675 URLs**
fetched and parsed. All figures below come from that crawl, not from reading the source.
Rendering was re-verified with JavaScript disabled. Core Web Vitals were measured in headless
Chromium at 4× CPU throttle on a mobile viewport.

The prior session's "all SEO fixes are complete" claim did not hold. **Nine defect classes were
found and fixed**; one remains open as a business decision (§ Programmatic quality).

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
| PROGRAMMATIC SEO QUALITY | **FAIL** |
| INTERNAL LINKING | **PASS** |
| STRUCTURED DATA | **PASS** |
| CORE WEB VITALS | **PASS** |
| PRIORITY GSC PAGES | **PASS** (1 thin page flagged) |

---

## Before → after

| Metric | Before | After |
|---|---:|---:|
| Pages with `og:image` / `twitter:image` | 0 of 2,411 | **2,217 of 2,217** |
| Internal links pointing at a redirect | 134 | **0** |
| Redirects hit during internal crawl | 69 | **0** |
| Pages emitting fabricated `LocalBusiness` + postal address | 2,400 | **0** |
| Indexable URLs sharing a duplicate title | 100 | **6** (3 intentional pairs) |
| Titles whose suffix repeats the title base | 98 | **3** |
| Greek pages with broken grammar after `για` | ~800 | **0** |
| Orphan indexable pages | 4 | **1** (`/`, expected) |
| Crawl-unreachable indexable pages | 11 | **8** (linked, BFS artefact) |
| ESLint errors | 51 | **0** |
| 404s in crawl | 0 | **0** |

---

## What was broken, and what was done

### 1. No social image anywhere on the site — FIXED
Every page shipped `twitter:card: summary_large_image` with **no image to go with it**. The root
layout defined `openGraph.images`, but every page's own `generateMetadata` returns its own
`openGraph` object, which replaces the parent's wholesale — so the images were silently dropped on
all 2,411 indexable URLs. `src/lib/seo/metadata.ts` now defaults both `openGraph.images` and
`twitter.images` to `/opengraph-image.png`.

### 2. Fabricated local presence in structured data — FIXED (SEO safety)
Every service × location page emitted `LocalBusiness` with a `PostalAddress` in that city —
Athens, London, New York, Tokyo, Dubai — across **2,400 pages**. The company has no premises in
those cities; the `Organization` node correctly carries no address at all. This asserted physical
locations that do not exist. Removed; `Service` + `areaServed`, the correct markup for a
service-area business, remains. `generateLocalBusinessSchema` had no other caller.

### 3. 52 Greek pages sharing 3 truncated titles — FIXED
`Υπηρεσίες SEO & Τεχνικός Έλεγχος για Ξενοδοχεία` exceeded the Greek title budget, and truncation
cut the **industry name** — the distinguishing token — leaving 26 pages titled
`Υπηρεσίες SEO & Τεχνικός Έλεγχος για |`. The service name is now what shortens, and
`smartTruncateTitle` refuses to end a title on a dangling function word (`για`, `for`, `and`…).

### 4. Title boilerplate on 98 URLs — FIXED
The suffix ladder appended a keyword the base already contained:
`Κατασκευή Ιστοσελίδων Αθήνα - Κατασκευή`, `Τοπικό SEO Θεσσαλονίκη - Τοπικό SEO`.
`fitTitleWithSuffix` now skips any suffix already present in the base. 98 → 3.

### 5. 134 internal links pointing at redirects — FIXED
Three separate causes, all fixed at the source rather than per-link:
- The header language switcher swapped only the locale prefix. Blog slugs differ per locale, so
  `/en/blog/what-is-seo` offered a `ΕΛ` link to `/el/blog/what-is-seo`, which 308'd straight back —
  69 links. `LanguageSwitcher` now takes an `alternateHref`; the post page supplies the real
  counterpart, or the other locale's blog index when no translation exists.
- 57 markdown links carried the wrong locale prefix. Rewritten against each post's actual locale;
  `MarkdownBody` now resolves `/blog/<slug>` to the post's own locale so this cannot recur.
- Related/money links and a hardcoded tools link applied the reader's locale to one-locale posts.
  New `blogHref()` helper resolves them.

### 6. English pages served under `/el` with `lang="el"` — FIXED
47 URLs (`/el/platform*`, `/el/tools*`, `/el/resources`, `/el/compare/*`) served **English copy**
under `<html lang="el">`, canonicalising to the `/en` twin — a duplicate plus a wrong-language
signal, with 249 internal links feeding it. `localizedPath` now routes these EN-only sections to
`/en` directly, and the `/el` variants 308 to their `/en` twin. No redirect hops were introduced,
because the links were fixed first.

`/glossary` was wrongly on the EN-only list even though `/el/glossary` has real Greek content —
the switcher was dumping Greek readers on the homepage. Removed from the list; `/el/glossary`
still returns 200 and self-canonicalises.

### 7. Greek grammar across ~800 programmatic pages — FIXED
Greek inflects; the templates interpolated nominative nouns after prepositions.
- `για Δικηγόροι` → `για Δικηγόρους`. Added `nameAccusative` to all 31 Greek industries and 12
  Greek services, wired into titles, descriptions and H1s.
- `στην Ηράκλειο` / `στην Χανιά` → `στο Ηράκλειο` / `στα Χανιά`, via the existing
  `getGreekLocative` helper the location templates were not using.
- `Αθήνα, Greece` → `Αθήνα, Ελλάδα` (new `COUNTRY_LABELS_EL`), including in `Service.areaServed`.
- Latin neighbourhood chips (`Syntagma, Kolonaki`) on Greek pages → `Σύνταγμα, Κολωνάκι`.

### 8. Three orphan pages — FIXED
`/en/platform/for/{agencies,in-house,ecommerce}` were in the sitemap at priority 0.85 and declared
in the hub-spoke config, but **nothing linked to them** — unreachable by crawl. Now linked from
the platform hub with descriptive anchors.

### 9. robots.txt: Googlebot exempt from the API/admin disallows — FIXED
A named user-agent group replaces the `*` group entirely, so `Disallow: /api/` and `/admin/` never
applied to Googlebot, Googlebot-Image or Bingbot. Repeated in each named group.

### 10. Lint — FIXED
51 ESLint errors → 0. Genuine fixes: `prefer-const`, an unused binding left by the schema removal.
`src/_archive/**` (dead, never-imported code) is now ignored. Six remaining React-Compiler errors
were **suppressed with justification, not rewritten** — they flag correct post-mount
initialisation of `localStorage`/`matchMedia`/`searchParams` (theme, cookie consent, UTM capture),
which cannot be done during SSR, plus two component-registry lookups the rule cannot see through.

---

## Test results by area

### Build quality — PASS
Build succeeds; TypeScript clean; ESLint 0 errors; 3,079 routes prerendered; no dynamic-route,
metadata, sitemap or JSON-LD serialization errors. Two framework deprecation notices remain
(`middleware`→`proxy`, Edge runtime) — informational, not failures.

### URL inventory
3,675 URLs crawled, all 200. **2,217 indexable**, 1,308 `noindex` (the location content gate),
150 parameterised URLs (`?project`, `?term`, `?service`) all correctly canonicalised to their
clean parent and absent from sitemaps. No unexpected URLs: no dashboards, auth routes or
staging paths are reachable or listed. Full detail in `FINAL_URL_INVENTORY.csv`.

### Canonicals — PASS
0 indexable pages without a canonical. 0 canonicals on the wrong host or protocol. 0 pointing at
a redirect, a 404 or a `noindex` page. 0 conflicts with sitemap membership. The single non-self
canonical is `/` → `/en`, which is the intended root consolidation.

### Hreflang — PASS
0 clusters point at a non-200, `noindex` or non-canonical target. 0 missing `x-default`. 0
`html lang` mismatches. Pages with no hreflang are single-locale by design (EN-only blog posts,
EN-only product sections) — correct, since advertising an alternate that redirects is worse than
none. See `FINAL_HREFLANG_REPORT.csv` (12,831 rows, one per declared cluster edge).

### Sitemaps — PASS
1,640 URLs across 5 sitemaps in the index. **0 entries** that redirect, 404, carry `noindex`,
canonicalise elsewhere, or use query parameters. `lastmod` present on 100%.
*Note:* `sitemap-locations.xml` (301) and `sitemap-locations-en-us.xml` (200, 0 URLs) are not in
the index. The empty one is the correct output of the content gate — no US location passes it —
but it is a dead endpoint worth removing if it was ever submitted to GSC.

### Robots — PASS
Verified as Googlebot: pages, CSS and JS chunks all return 200. No `X-Robots-Tag` interference.
`/api/` and `/admin/` are disallowed for `*` and now for the named bot groups too. No URL is
blocked in robots.txt as a substitute for canonicalisation — every consolidation is done with a
canonical or a 308.

### Metadata — PASS
0 missing titles, descriptions or H1s; 0 pages with multiple H1s; 0 titles over 65 chars; 0
descriptions over 165. Duplicates are down to 6 URLs: `/` + `/en` (intentional), and two case
studies whose EN/EL twins share an authored client-brand title — locale twins with correct
hreflang, so not cannibalising. Detail in `FINAL_METADATA_REPORT.csv`.

### Indexability — PASS
The uniqueness gate on service × location works as designed: 1,308 combinations are `noindex` and
excluded from sitemaps; the 1,092 that pass have a median of 891 body words. No valuable URL is
noindexed for lack of clicks; no unrelated URL is redirected to the homepage.

### Internal linking — PASS
0 broken links, 0 links to redirects. Depth: 1 page at depth 0, 33 at depth 1, 805 at 2, 1,196 at
3, 311 at 4, 39 at 5 (`logo-design` × smaller Greek cities — the lowest-value combinations, which
is the right place for them). One orphan: `/`, which nothing links to because all navigation
targets `/en`. Commercial hubs carry the authority: `/en/services/local-seo` 2,446 inbound,
`/en/services/ai-visibility` 2,398, `/el/services/eshop-seo` 1,689.
**Watch item:** sitewide boilerplate anchors are heavy — `pricing & packages` ×4,888,
`get a quote` ×4,637, `all locations` ×3,481, and every industry name repeats sitewide from the
footer grid. Median 110 links per page (56 in `<main>`). Not a penalty risk, but trimming the
footer industry grid would concentrate more equity on the money pages.

### Structured data — PASS
7,172 JSON-LD blocks, **0 parse failures**. One `Organization` `@id`
(`https://anotherseoguru.com/#organization`), one logo URL — entity-consistent sitewide.
0 breadcrumbs out of sequence. All 1,198 `FAQPage` blocks have their questions present in visible
page copy. No `Review`, `AggregateRating`, `Rating` or fabricated-award markup anywhere.
The fabricated `LocalBusiness` was the only spammy schema and is gone.

### Core Web Vitals — PASS
Mobile viewport, 4× CPU throttle, ~1.6 Mbps / 150 ms RTT:

| Page | LCP | CLS | DOMContentLoaded |
|---|---:|---:|---:|
| homepage | 1412 ms | 0.000 | 1224 ms |
| service hub | 1312 ms | 0.000 | 1155 ms |
| programmatic location | 1208 ms | 0.000 | 1075 ms |
| blog article | 1204 ms | 0.000 | 1034 ms |
| platform feature | 1180 ms | 0.000 | 1031 ms |
| case study | 1756 ms | 0.000 | 1024 ms |

CLS is 0.000 on every template. **Watch item:** ~1.1 MB of decoded JS on the homepage (~300 kB
over the wire compressed). It is not hurting LCP because content is server-rendered, but it is
the main INP risk on low-end mobile.

### Rendering — PASS
With JavaScript disabled, every SEO-critical element is present in the server HTML: title, meta
description, canonical, 3 hreflang links, exactly one H1, JSON-LD, and full body copy
(1,276 words homepage / 1,079 location / 1,433 blog) with 78–105 internal links. Nothing
discovery-critical depends on hydration.

### Legacy URLs — PASS
All GSC-era paths resolve intentionally: `/services/*`, `/blog/*`, `/solutions/*`, `/platform/*`,
`/work/*`, `/contact`, `/pricing`, `/get-started` → 308 to `/en/…`; `/gr/*` → `/el/*`;
`/features`, `/seo-platform` → `/en/platform*`; `/free-tools/*`, `/app/*` → the app origin;
`/glossary?term=*` → 307 to `/en/glossary?term=*`, which canonicalises to `/en/glossary`.
No uncontrolled duplicate root/EN versions exist. `/blog/google-search-operators-2025` resolves in
2 hops to the 2026 slug — acceptable, though the rule order could be tightened to one hop.

### SEO safety — PASS
No mass low-value AI page creation in this pass (page count went **down** by 47 through
consolidation). No keyword-stuffed city names — the fixes removed repetition. No fabricated
locations (that defect was found and removed). No fabricated clients, reviews, case studies or
ranking claims — no `Review`/`AggregateRating` schema exists. No backlink disavowal. Nothing
valuable noindexed. No URL redirected to the homepage. No hreflang points at a non-canonical URL.

---

## FAIL: Programmatic SEO quality

The uniqueness gate was built for **service × location** and works there. It was **never applied
to the other three programmatic families**, which ship at a fraction of the depth. Body word
counts below exclude header, nav and footer:

| Page type | Indexable | In sitemap | Median body words | Intra-group 5-gram similarity |
|---|---:|---:|---:|---:|
| service × location | 1,092 | 1,092 | **1,068** | 0.55 mean (EL up to 0.68) |
| industry hub | 62 | 62 | 1,035 | — |
| blog post | 79 | 79 | 1,138 | — |
| case study | 142 | 142 | 472 | — |
| **industry × service** | **744** | 168 | **227** | 0.43 mean (EL `ai-visibility` **0.73**) |
| **platform feature** | **27** | 27 | **115** | — |
| **tools** | **9** | 9 | **95** | — |

**780 indexable URLs (35%) are thin**, 204 of them actively submitted in sitemaps. The 744
industry × service pages are the classic city/vertical-substitution pattern: same 6 H2s, same 3
H3s, ~227 words, differing mainly by the industry noun. `/en/platform/features/semantic-keyword-clustering`
— one of the ten named GSC priority URLs — is 115 words with 5 inbound links.

**I did not fix this, deliberately.** The remedy is either (a) `noindex` + desitemap ~780 URLs, or
(b) invest real copy in them. Option (a) removes a third of the indexable footprint and those
pages may currently earn impressions; option (b) means writing content, and inventing capability
claims for platform features would be exactly the fabrication § 17 prohibits. Both are business
calls. The gate infrastructure (`evaluateLocationContent`) already exists and can be extended to
`solutions/` in a few lines once you pick the threshold.

**Recommendation:** apply the gate to industry × service at ≥400 body words, and either expand the
27 platform-feature pages (they are product pages you can describe factually) or consolidate them
into `/platform/features`.

---

## Other open items (not blocking)

1. **Greek city intro copy is service-agnostic in the wrong direction.** `packs-el.ts` intros are
   website-creation copy shown on every service. On `/el/services/seo-audits/athens-gr` the page
   still reads *"παραδίδει κατασκευή ιστοσελίδων Αθήνα… πακέτα κατασκευής από €1.200"* — wrong
   offer, wrong price for that page. Authored data across ~45 packs; `serviceDepth` already exists
   as the per-service field and is correct where populated.
2. **`Στεγαστικοί` for "roofers"** is not a Greek trade term (it reads as *mortgage-related*).
   Likely `Κατασκευαστές Στεγών`. Naming is yours to decide, so it was left alone.
3. **`/en/services/eshop-seo/volos-gr` H1** reads `E-shop SEO in Βόλος (Volos)` — Greek script in
   an English H1. Defensible for local relevance, but inconsistent with the title.
4. **Two case-study titles repeat the client brand** (`Fitness Hood Training Center | Fitness Hood`).
   Authored `seoTitle` values, not a template bug.
5. **`sitemap-locations-en-us.xml`** returns 200 with zero URLs and is not in the index.
6. **Footer link volume** — see Internal linking above.

---

## Artifacts

| File | Rows | Contents |
|---|---:|---|
| `FINAL_URL_INVENTORY.csv` | 3,675 | url, status, canonical, indexability, lang, hreflang count, title, H1, description, sitemaps, page type, inlinks, outlinks, depth, words |
| `FINAL_REDIRECTS.csv` | 25 | every redirect, target, and how many internal links point at it |
| `FINAL_HREFLANG_REPORT.csv` | 12,831 | one row per cluster edge: target status, indexability, canonical match, reciprocity, verdict |
| `FINAL_METADATA_REPORT.csv` | 2,216 | title/description/H1 with lengths and duplicate counts, og:image |
| `FINAL_INTERNAL_LINK_REPORT.csv` | 3,674 | depth, inbound/outbound counts, top inbound anchor, orphan flag |
| `FINAL_INDEXABILITY_REPORT.csv` | 3,675 | status, robots meta, canonical, self-canonical, sitemap membership, lastmod, reason |
