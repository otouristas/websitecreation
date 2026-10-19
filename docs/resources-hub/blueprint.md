# Resources hub blueprint: Search Console growth

Built 2026-10-19 on branch `claude/resources-hub-goo2zi` of `otouristas/websitecreation` (the public site at anotherseoguru.com). Nothing is deployed to production; review on the Vercel preview of the pull request.

**Where the hub lives, and why.** `gsc-gemini-boost` is the product app (Vite SPA at app.anotherseoguru.com). Its README states the public marketing site is `websitecreation` (Next.js). The hub is built there, under the existing `/resources` section, which is English-only by design (`EN_ONLY_SECTIONS`; `/el/resources/*` 308s to `/en`).

**Data used.** Search volumes and keyword difficulty are from Ahrefs Keywords Explorer, United States database, pulled on 2026-10-19 through the Ahrefs connector. Anything Ahrefs did not return is marked *unverified*. Semrush was tried first and had no API units. No volumes, CTRs or quotes were invented; the CTR figures on the site are the baseline curve hard-coded in the app's opportunity engine (`gsc-gemini-boost/src/lib/seo/ctr.ts`), and are presented as such.

## The five strongest topical-authority opportunities

1. **SEO forecasting from Search Console data** (`seo forecasting` 2,000/mo, KD 0; `seo forecast` 1,300, KD 5). Weak SERP, and the product's core differentiator is exactly this: click-impact estimates per fix.
2. **SEO reporting and report templates** (`seo reporting` 3,700, KD 12; `seo report template` 2,700, KD 13; `seo client reporting` 1,400, KD 6; `white label seo reports` 1,800, KD 11). High commercial value; maps to the Agency plan's white-label client reports.
3. **Search Console analysis and its sub-problems** (cannibalization fixes 600, KD 0; branded vs non-branded 700 + branded keywords 1,000, KD 0; high impressions low CTR). Low difficulty, every page ends in a product feature.
4. **Traffic drops and content decay** (content audit 1,900, content refresh 350, content decay 150, website traffic down 150). Problem-aware buyers in pain; maps to the decay detector and update annotations.
5. **AI search visibility measurement** (`ai overview tracking` 1,200, KD 40; `llm visibility tracking` 450; `share of voice seo` 1,400, KD 43). Harder SERP, but the site already owns two framework pages and a free AI visibility check to build on.

## A. Business analysis (knowledge base)

### Verified facts (from the repos)
| Fact | Source |
|---|---|
| Product: AnotherSEOGuru App, “Search Console, turned into a growth plan”: ranked fixes with an estimated click impact | `gsc-gemini-boost/README.md` |
| Nine modules: Opportunities, Performance, Keywords, Content, Site audit, Competitors, AI visibility, AI assistant, Agency workspace | `src/components/gsc-boost/modules.ts` |
| Opportunity detectors: striking distance, low CTR, content decay, cannibalization, missing content | `src/data/help/en.ts` (opportunities article), app `src/lib/seo/opportunities.ts` |
| Plans (USD): Launch $29/mo (3 sites, 1 seat, 1,200 credits), Growth $79 (10 sites, 3 seats, 6,000 credits), Agency $149 (30 sites, 10 seats, 20,000 credits); yearly = 10× monthly | `src/components/gsc-boost/plans.ts` |
| Search Console features cost 0 credits on every plan; paid data and AI use credits | `plans.ts` CREDIT_COSTS, `/platform/features` |
| White-label client reports, CRM, pipeline are Agency-plan features; content briefs/WordPress, competitor gaps, AI visibility tracking are Growth+ | `plans.ts` |
| Live demo on sample data, no account or card | `faq.ts` |
| Loads up to 100,000 query/page rows per period | help: queries-and-pages |
| Shipped fixes measured before/after with the rest of the site as a control | help: tasks-and-results |
| Charts mark your releases and confirmed Google updates | `modules.ts` |
| Also: iPhone app, Chrome extension, WordPress plugin, MCP server | `/platform/*` routes |
| The same company runs an SEO agency on the same site (services, local SEO, web design) | site routes `/services`, `/seo-services` |

### Ideal customers and jobs-to-be-done (assumptions, labelled)
| Segment | Job | Evidence |
|---|---|---|
| In-house marketers / founders, 1–3 sites (Launch) | “Tell me what to fix this week and what it is worth” | Plan tagline (verified) |
| Content teams shipping weekly (Growth) | Briefs → publish → measure | Plan tagline (verified) |
| Agencies with many clients (Agency) | Report to clients, run pipeline, white-label | Plan tagline (verified) |
| Buying triggers | Traffic drop, new client, reporting pain, AI Overviews eating clicks | **Assumption** from content of help center |

### Differentiation
Search-Console-native and opportunity-ranked (clicks at stake per fix), measured results with a control, agency workspace in the same tool, cheap entry price. **Competitors (assumption based on existing /compare pages):** Ahrefs, Semrush (broad suites), Search Console alone, plus GSC-specific tools (e.g. SEOTesting, Looker Studio templates). Pricing of competitors is not stated anywhere on the hub.

### Content audit (before this change)
| Area | Coverage | Gaps / issues |
|---|---|---|
| Blog (79 posts, EN+EL) | Broad agency SEO: costs, local, industries, AI/GEO | Few posts on Search Console workflows (3), none on forecasting, reporting templates, KPIs, decay, cannibalization fixes |
| `/resources` | Hub + 2 AI frameworks | Thin: no clusters, no Search Console content |
| `/tools/[slug]` | 9 noindex stubs deep-linking into the app | No working tool on the site except AI visibility check |
| `/compare` | Ahrefs, Semrush, Search Console alone | Fine; reused as commercial pages of clusters |
| Glossary | ~120 terms incl. content-decay, keyword-cannibalization, ctr | Owns definitions; new pages target how-to intents and link to it |
| **Bug found** | `resolveHelpHref` sent every `/en/...` link inside docs blocks to the app origin, so the existing `/resources` cards (frameworks, SEO guides, glossary, compare) pointed at app.anotherseoguru.com | Fixed: locale-prefixed paths now stay on the site |

Existing URLs are all kept. Cannibalization watch-list: `/en/blog/gsc-query-prioritization-framework` (query prioritization) vs `/resources/seo-forecasting` and `/resources/seo-quick-wins` — different primary queries, cross-linked; review in the monthly loop.

## B. Hub architecture

```
/en/resources                                   Hub (updated)
├─ Search Console analysis
│  ├─ /resources/search-console-analysis        Pillar   · google search console analysis
│  ├─ /resources/high-impressions-low-ctr       Article  · high impressions low ctr
│  ├─ /resources/branded-vs-non-branded-keywords Article · branded vs non branded keywords
│  ├─ /resources/keyword-cannibalization        Article  · how to fix keyword cannibalization
│  └─ commercial: /compare/search-console-alone · product: /platform/features#performance
├─ Traffic drops and content decay
│  ├─ /resources/organic-traffic-drop           Pillar   · organic traffic drop
│  ├─ /resources/content-decay                  Article  · content decay
│  └─ product: /platform/features#opportunities
├─ Forecasting and prioritization
│  ├─ /resources/seo-forecasting                Pillar   · seo forecasting
│  ├─ /resources/ctr-by-position                Article  · ctr by position
│  ├─ /resources/seo-quick-wins                 Article  · seo quick wins
│  ├─ /resources/search-console-opportunity-finder  FREE TOOL
│  └─ commercial: /compare/ahrefs, /compare/semrush · product: /platform/features#opportunities
├─ SEO reporting
│  ├─ /resources/seo-reporting                  Pillar   · seo reporting
│  ├─ /resources/seo-report-template            Article  · seo report template
│  ├─ /resources/seo-kpis                       Article  · seo kpis
│  └─ commercial: /platform/for/agencies · product: /platform/features#agency
└─ AI search visibility (existing pages, kept)
   ├─ /resources/search-optimization-layers     Pillar (existing)
   ├─ /resources/ai-search-page-anatomy         Existing
   └─ tool: /ai-visibility-check (existing)
```

Each URL owns one primary query (in `src/data/resources/*.ts`, field `primaryKeyword`); secondaries are folded into the owning page instead of getting their own URL. URLs are flat (`/resources/<slug>`), all canonical to `/en`, all in `sitemap.xml`, all linked from the hub, the docs sidebar and their cluster.

## C. Opportunities (60), scored and prioritized

Scoring 1–5, weighted: Demand 25% (volume: ≥2,000 → 5, ≥1,000 → 4, ≥300 → 3, ≥100 → 2, else 1; unverified → 2), SERP competitiveness 25% (KD ≤10 → 5, ≤20 → 4, ≤35 → 3, ≤55 → 2, else 1; unverified → 3), Product relevance 20%, Conversion potential 20%, Uniqueness 10%. Relevance, conversion and uniqueness are judgement scores. Groups: A problem-aware, B solution-aware, C commercial, D informational, E tool/resource.

| # | Group | Opportunity | Target query | US volume | KD | Intent | Cluster | Format | Demand | SERP | Relevance | Conversion | Unique | **Score** | Status | URL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | B | SEO forecasting method | seo forecasting | 2,000 | 0 | Info/Comm | Forecasting | Pillar guide | 5 | 5 | 5 | 4 | 5 | **4.8** | Batch 1 | `/resources/seo-forecasting` |
| 2 | C | SEO dashboard | seo dashboard | 4,600 | 10 | Comm | Reporting | Commercial guide + template | 5 | 5 | 5 | 5 | 3 | **4.8** | Days 31-60 | `/resources/seo-dashboard` |
| 3 | B | SEO forecast (short-tail) | seo forecast | 1,300 | 5 | Info/Comm | Forecasting | Same page (secondary) | 4 | 5 | 5 | 4 | 5 | **4.55** | Batch 1 (in pillar) | `/resources/seo-forecasting` |
| 4 | C | SEO reporting tool (balanced roundup) | seo reporting tool | 1,900 | 9 | Comm | Reporting | Commercial roundup | 4 | 5 | 5 | 5 | 3 | **4.55** | Days 31-60 | `/resources/seo-reporting-tools` |
| 5 | D | SEO reporting | seo reporting | 3,700 | 12 | Info/Comm | Reporting | Pillar guide | 5 | 4 | 5 | 5 | 3 | **4.55** | Batch 1 | `/resources/seo-reporting` |
| 6 | D | SEO client reporting | seo client reporting | 1,400 | 6 | Info/Comm | Reporting | Same page (secondary) | 4 | 5 | 5 | 5 | 3 | **4.55** | Batch 1 (in pillar) | `/resources/seo-reporting` |
| 7 | D | SEO report template | seo report template | 2,700 | 13 | Info/Comm | Reporting | Template | 5 | 4 | 5 | 5 | 3 | **4.55** | Batch 1 | `/resources/seo-report-template` |
| 8 | D | SEO KPIs | seo kpis | 1,700 | 1 | Info/Comm | Reporting | Guide | 4 | 5 | 5 | 4 | 3 | **4.35** | Batch 1 | `/resources/seo-kpis` |
| 9 | C | White-label SEO reports | white label seo reports | 1,800 | 11 | Comm | Reporting | Commercial page | 4 | 4 | 5 | 5 | 3 | **4.3** | Days 31-60 | `/resources/white-label-seo-reports` |
| 10 | C | Keyword cannibalization checker | keyword cannibalization checker | 300 | 3 | Comm | Search Console | Section in article; tool later | 3 | 5 | 5 | 5 | 3 | **4.3** | Batch 1 (in article) | `/resources/keyword-cannibalization` |
| 11 | D | SEO report example | seo report example | 1,500 | 16 | Info/Comm | Reporting | Same page (secondary) | 4 | 4 | 5 | 5 | 3 | **4.3** | Batch 1 (in article) | `/resources/seo-report-template` |
| 12 | D | Monthly SEO report template | monthly seo report template | 500 | 5 | Info/Comm | Reporting | Same page (secondary) | 3 | 5 | 5 | 5 | 3 | **4.3** | Batch 1 (in article) | `/resources/seo-report-template` |
| 13 | C | Semrush alternative | semrush alternative | 3,000 | 13 | Comm | Forecasting | Existing /compare/semrush | 5 | 4 | 4 | 5 | 2 | **4.25** | Existing, refresh | `/compare/semrush` |
| 14 | D | SERP CTR / CTR curve | serp ctr | 1,000 | 0 | Info | Forecasting | Same page (secondary) | 4 | 5 | 5 | 3 | 4 | **4.25** | Batch 1 (in article) | `/resources/ctr-by-position` |
| 15 | B | SEO quick wins from Search Console | seo quick wins | 500 | 2 | Info/Comm | Forecasting | Guide | 3 | 5 | 5 | 4 | 4 | **4.2** | Batch 1 | `/resources/seo-quick-wins` |
| 16 | D | SEO strategy template | seo strategy template | 1,000 | 1 | Info/Comm | Forecasting | Template | 4 | 5 | 4 | 4 | 3 | **4.15** | Days 31-60 | `/resources/seo-roadmap` |
| 17 | E | SEO forecast template / calculator | seo forecast template | 200 | 2 | Tool | Forecasting | Tool mode + downloadable CSV | 2 | 5 | 5 | 5 | 4 | **4.15** | Days 31-60 | `/resources/search-console-opportunity-finder` |
| 18 | A | Keyword cannibalization fix | how to fix keyword cannibalization | 600 | 0 | Info | Search Console | Guide | 3 | 5 | 5 | 4 | 3 | **4.1** | Batch 1 | `/resources/keyword-cannibalization` |
| 19 | B | Branded vs non-branded split with regex | branded vs non branded keywords | 700 | 0 | Info | Search Console | Guide | 3 | 5 | 5 | 3 | 4 | **4.0** | Batch 1 | `/resources/branded-vs-non-branded-keywords` |
| 20 | B | SEO roadmap from Search Console data | seo roadmap | 900 | 0 | Info/Comm | Forecasting | Guide + template | 3 | 5 | 4 | 4 | 4 | **4.0** | Days 31-60 | `/resources/seo-roadmap` |
| 21 | A | Content decay | content decay | 150 | 9 | Info | Traffic drops | Guide | 2 | 5 | 5 | 4 | 4 | **3.95** | Batch 1 | `/resources/content-decay` |
| 22 | B | Branded keywords | branded keywords | 1,000 | 0 | Info | Search Console | Same page (secondary) | 4 | 5 | 4 | 3 | 3 | **3.95** | Batch 1 (in article) | `/resources/branded-vs-non-branded-keywords` |
| 23 | B | SEO task management for teams | seo task management | 400 | 3 | Comm | Reporting | Guide | 3 | 5 | 4 | 4 | 3 | **3.9** | Days 31-60 | `/resources/seo-task-management` |
| 24 | C | SEO proposal template (agency) | seo proposal template | 600 | 0 | Comm | Reporting | Template | 3 | 5 | 4 | 4 | 3 | **3.9** | Days 31-60 | `/resources/seo-proposal-template` |
| 25 | A | Website traffic down: first checks | website traffic down | 150 | 1 | Info | Traffic drops | Section of pillar | 2 | 5 | 5 | 4 | 3 | **3.85** | Batch 1 (in pillar) | `/resources/organic-traffic-drop` |
| 26 | C | SEO agency reporting software | seo agency reporting | 150 | 11 | Comm | Reporting | Commercial page | 2 | 4 | 5 | 5 | 3 | **3.8** | Days 31-60 | `/resources/white-label-seo-reports` |
| 27 | C | Ahrefs alternative | ahrefs alternative | 600 | 13 | Comm | Forecasting | Existing /compare/ahrefs | 3 | 4 | 4 | 5 | 2 | **3.75** | Existing, refresh | `/compare/ahrefs` |
| 28 | D | Organic CTR by position | ctr by position | 100 | 3 | Info | Forecasting | Guide + table | 2 | 5 | 5 | 3 | 4 | **3.75** | Batch 1 | `/resources/ctr-by-position` |
| 29 | E | Search Console opportunity finder | search console opportunity finder | unverified | unverified | Tool | Forecasting | Free tool | 2 | 3 | 5 | 5 | 5 | **3.75** | Batch 1 (built) | `/resources/search-console-opportunity-finder` |
| 30 | A | Organic traffic drop diagnosis | organic traffic drop | 30 | 0 | Info | Traffic drops | Pillar guide | 1 | 5 | 5 | 4 | 4 | **3.7** | Batch 1 | `/resources/organic-traffic-drop` |
| 31 | A | High impressions, low CTR | high impressions low ctr | 50 | 2 | Info | Search Console | Guide | 1 | 5 | 5 | 4 | 4 | **3.7** | Batch 1 | `/resources/high-impressions-low-ctr` |
| 32 | A | Zero-click searches and what they cost you | zero click searches | 700 | 2 | Info | AI visibility | Guide | 3 | 5 | 4 | 3 | 3 | **3.7** | Days 31-60 | `/resources/zero-click-searches` |
| 33 | B | How to forecast SEO traffic | how to forecast seo traffic | 90 | 0 | Info | Forecasting | Same page (secondary) | 1 | 5 | 5 | 4 | 4 | **3.7** | Batch 1 (in pillar) | `/resources/seo-forecasting` |
| 34 | C | AI visibility tool | ai visibility tool | 4,100 | 63 | Comm | AI visibility | Existing /ai-visibility-check + roundup | 5 | 1 | 5 | 5 | 2 | **3.7** | Days 61-90 | `/resources/ai-visibility-tools` |
| 35 | D | What is a good CTR | what is a good ctr | 700 | 7 | Info | Forecasting | Same page (secondary) | 3 | 5 | 4 | 3 | 3 | **3.7** | Batch 1 (in article) | `/resources/ctr-by-position` |
| 36 | B | How to improve CTR | how to increase ctr | 150 | 0 | Info | Search Console | Same page (secondary) | 2 | 5 | 5 | 3 | 3 | **3.65** | Batch 1 (in article) | `/resources/high-impressions-low-ctr` |
| 37 | B | How to measure SEO | how to measure seo | 250 | 6 | Info/Comm | Reporting | Same page (secondary) | 2 | 5 | 4 | 4 | 3 | **3.65** | Batch 1 (in article) | `/resources/seo-kpis` |
| 38 | B | AI Overview tracking | ai overview tracking | 1,200 | 40 | Comm | AI visibility | Guide | 4 | 2 | 5 | 4 | 3 | **3.6** | Days 31-60 | `/resources/ai-overview-tracking` |
| 39 | B | LLM visibility tracking | llm visibility tracking | 450 | unverified | Comm | AI visibility | Guide | 3 | 3 | 5 | 4 | 3 | **3.6** | Days 31-60 | `/resources/llm-visibility-tracking` |
| 40 | E | SEO ROI calculator | seo roi calculator | 450 | 1 | Tool | Reporting | Tool | 3 | 5 | 3 | 4 | 2 | **3.6** | Days 61-90 | `/resources/seo-roi-calculator` |
| 41 | C | Rank tracker (Search Console based) | rank tracker | 11,000 | 80 | Comm | Forecasting | Commercial page | 5 | 1 | 4 | 5 | 2 | **3.5** | Days 61-90 | `/resources/rank-tracking` |
| 42 | B | Content audit with Search Console | content audit | 1,900 | 23 | Info | Traffic drops | Guide | 4 | 3 | 4 | 3 | 3 | **3.45** | Days 31-60 | `/resources/content-audit` |
| 43 | E | CTR calculator (clicks ÷ impressions + expected CTR) | ctr calculator | 1,400 | 0 | Tool | Forecasting | Mini tool | 4 | 5 | 3 | 2 | 2 | **3.45** | Days 61-90 | `/resources/ctr-by-position` |
| 44 | E | AI visibility check | ai overview checker | unverified | unverified | Tool | AI visibility | Existing free tool | 2 | 3 | 5 | 4 | 4 | **3.45** | Existing | `/ai-visibility-check` |
| 45 | D | Impressions vs clicks | impressions vs clicks | 350 | 0 | Info | Search Console | Section of pillar; glossary owns definitions | 3 | 5 | 4 | 2 | 2 | **3.4** | Batch 1 (in pillar) | `/resources/search-console-analysis` |
| 46 | D | Share of voice in SEO and AI answers | share of voice seo | 1,400 | 43 | Info | AI visibility | Guide | 4 | 2 | 4 | 4 | 3 | **3.4** | Days 61-90 | `/resources/share-of-voice` |
| 47 | B | Search Console API for SEOs | search console api | 300 | 2 | Info | Search Console | Guide | 3 | 5 | 3 | 2 | 3 | **3.3** | Days 61-90 | `/resources/search-console-api` |
| 48 | C | Search Console alternative / add-on | search console alternative | 10 | unverified | Comm | Search Console | Existing /compare/search-console-alone | 1 | 3 | 5 | 5 | 3 | **3.3** | Existing | `/compare/search-console-alone` |
| 49 | B | How to analyze Search Console data | google search console analysis | 70 | unverified | Info | Search Console | Pillar guide | 1 | 3 | 5 | 4 | 4 | **3.2** | Batch 1 | `/resources/search-console-analysis` |
| 50 | B | Content refresh process | content refresh | 350 | 31 | Info | Traffic drops | Same page (secondary) | 3 | 3 | 4 | 3 | 3 | **3.2** | Batch 1 (in article) | `/resources/content-decay` |
| 51 | D | Search optimization layers (SEO/AEO/GEO) | search optimization layers | unverified | unverified | Info | AI visibility | Existing framework (pillar) | 2 | 3 | 4 | 3 | 5 | **3.15** | Existing | `/resources/search-optimization-layers` |
| 52 | D | Anatomy of a page built for AI search | ai search page anatomy | unverified | unverified | Info | AI visibility | Existing framework | 2 | 3 | 4 | 3 | 5 | **3.15** | Existing | `/resources/ai-search-page-anatomy` |
| 53 | E | Branded keyword regex generator | search console regex | 10 | unverified | Tool | Search Console | Mini tool in article | 1 | 3 | 5 | 3 | 4 | **3.0** | Days 31-60 | `/resources/branded-vs-non-branded-keywords` |
| 54 | C | Looker Studio vs a reporting tool | looker studio search console template | 10 | unverified | Comm | Reporting | Comparison | 1 | 3 | 4 | 4 | 3 | **2.9** | Days 61-90 | `/resources/looker-studio-seo-report` |
| 55 | A | Anonymized queries in Search Console | anonymized queries search console | unverified | unverified | Info | Search Console | Guide | 2 | 3 | 4 | 2 | 4 | **2.85** | Days 61-90 | `/resources/anonymized-queries` |
| 56 | A | Search Console impressions dropped but rankings didn't | search console impressions drop | 0 | unverified | Info | Traffic drops | Guide | 1 | 3 | 4 | 3 | 4 | **2.8** | Days 61-90 | `/resources/impressions-drop` |
| 57 | A | Client asks why SEO isn't working | seo not working | unverified | unverified | Info | Reporting | Guide | 2 | 3 | 3 | 3 | 3 | **2.75** | Days 61-90 | `/resources/seo-not-working` |
| 58 | B | Content pruning: when to remove pages | content pruning | 200 | 22 | Info | Traffic drops | Guide | 2 | 3 | 4 | 2 | 3 | **2.75** | Days 31-60 | `/resources/content-pruning` |
| 59 | A | Traffic drop after a Google core update | google core update recovery | 40 | unverified | Info | Traffic drops | Guide | 1 | 3 | 4 | 3 | 3 | **2.7** | Days 31-60 | `/resources/core-update-traffic-drop` |
| 60 | A | Why Search Console and Analytics don't match | search console vs google analytics | 10 | unverified | Info | Search Console | Guide | 1 | 3 | 4 | 2 | 3 | **2.5** | Days 61-90 | `/resources/search-console-vs-analytics` |

## D. Finished content (first batch: 12 pages + tool)

| Page | Kind | Primary query | CTA |
|---|---|---|---|
| `/resources` | Hub (rewritten) | SEO resources | Tool + sign-up rail |
| `/resources/search-console-analysis` | Pillar | google search console analysis | Soft (tool, demo) |
| `/resources/high-impressions-low-ctr` | Article | high impressions low ctr | Soft |
| `/resources/branded-vs-non-branded-keywords` | Article | branded vs non branded keywords | Soft |
| `/resources/keyword-cannibalization` | Article | how to fix keyword cannibalization | Direct (sign-up, demo) |
| `/resources/organic-traffic-drop` | Pillar | organic traffic drop | Soft |
| `/resources/content-decay` | Article | content decay | Soft |
| `/resources/seo-forecasting` | Pillar | seo forecasting | Soft |
| `/resources/ctr-by-position` | Article | ctr by position | Soft |
| `/resources/seo-quick-wins` | Article | seo quick wins | Soft |
| `/resources/seo-reporting` | Pillar | seo reporting | Direct |
| `/resources/seo-report-template` | Article | seo report template | Direct |
| `/resources/seo-kpis` | Article | seo kpis | Soft |
| `/resources/search-console-opportunity-finder` | Free tool | search console opportunity finder | Direct |

Every article: answer in the first paragraph, steps, a table, a worked example (hypothetical numbers labelled as such), FAQs, a CTA matched to intent. Schema: Article, BreadcrumbList, FAQPage (from visible FAQs) and HowTo (from visible titled steps); the tool has WebApplication + FAQPage + HowTo; the hub has CollectionPage. Each page also has a Markdown twin at `<url>.md` for LLM tools.

## E. Free tool

Ideas evaluated:

| Idea | Real search demand | Product fit | Build cost | Verdict |
|---|---|---|---|---|
| **Search Console opportunity finder + click forecast** (upload Queries.csv) | seo forecasting 2,000, seo forecast template 200, seo quick wins 500 | Identical to the app's Opportunities module | Low: port of app code, runs client-side | **Built** |
| Branded keyword regex generator | search console regex ~10–20 (low) | Medium | Very low | Next: embed in the branded article |
| CTR calculator with expected CTR | ctr calculator 1,400 (intent mostly ads) | Low–medium | Low | Later |
| SEO ROI calculator | 450, KD 1 | Medium (agency) | Low | Later; an ROICalculator component already exists |
| Cannibalization checker | checker 300 | High | Needs query×page data, which the UI export lacks | Not possible without API; it is the upgrade path into the app |
| SEO report template generator | template 2,700 | High | Medium | Template delivered as copyable content instead |

The built tool (`src/components/tools/OpportunityFinder.tsx`, `src/lib/opportunity-finder/`): parses the Search Console export (any language, decimal commas, pasted from Sheets), learns the site's own CTR curve, runs the app's striking-distance and low-CTR detectors with the same thresholds and formulas, de-duplicates per query, ranks by clicks × confidence ÷ effort, shows a conservative / expected / ceiling forecast, and exports CSV. No email, no upload, sample data button.

## F. Internal linking map

Hierarchy: Hub → Pillars → Supporting → Commercial → Product. Every resource page additionally renders: a “Part of <pillar>” link (supporting pages), previous/next within the cluster, a “More in <cluster>” list (all siblings + existing related pages + the product page), the end CTA, and the docs sidebar (all hub pages). In-body contextual links per page (column 2 = links to other hub pages):

| Page | In-body hub links | All in-body links |
|---|---|---|
| `/resources/search-console-analysis` | 7 | `/en/resources/organic-traffic-drop`, `/en/resources/seo-quick-wins`, `/en/resources/ctr-by-position`, `/en/resources/high-impressions-low-ctr`, `/en/resources/keyword-cannibalization`, `/en/resources/branded-vs-non-branded-keywords`, `/en/blog/gsc-weekly-ops-playbook`, `/en/resources/seo-forecasting` |
| `/resources/high-impressions-low-ctr` | 4 | `/en/resources/seo-quick-wins`, `/en/resources/ctr-by-position`, `/en/resources/ai-search-page-anatomy`, `/en/ai-visibility-check`, `/en/resources/search-console-opportunity-finder` |
| `/resources/branded-vs-non-branded-keywords` | 2 | `/en/resources/seo-report-template`, `/en/resources/search-console-opportunity-finder` |
| `/resources/keyword-cannibalization` | 3 | `/en/glossary/keyword-cannibalization`, `/en/resources/search-console-analysis`, `/en/resources/content-decay`, `/en/resources/seo-quick-wins` |
| `/resources/organic-traffic-drop` | 4 | `/en/resources/high-impressions-low-ctr`, `/en/resources/content-decay`, `/en/resources/keyword-cannibalization`, `/en/resources/search-console-analysis` |
| `/resources/content-decay` | 2 | `/en/resources/search-console-analysis`, `/en/resources/organic-traffic-drop` |
| `/resources/seo-forecasting` | 4 | `/en/resources/branded-vs-non-branded-keywords`, `/en/resources/ctr-by-position`, `/en/resources/search-console-opportunity-finder`, `/en/resources/seo-quick-wins`, `/en/blog/gsc-query-prioritization-framework` |
| `/resources/ctr-by-position` | 5 | `/en/resources/search-console-opportunity-finder`, `/en/resources/seo-quick-wins`, `/en/resources/seo-forecasting`, `/en/resources/high-impressions-low-ctr`, `/en/resources/organic-traffic-drop` |
| `/resources/seo-quick-wins` | 5 | `/en/resources/keyword-cannibalization`, `/en/resources/search-console-opportunity-finder`, `/en/resources/high-impressions-low-ctr`, `/en/resources/content-decay`, `/en/resources/seo-forecasting` |
| `/resources/seo-reporting` | 4 | `/en/resources/branded-vs-non-branded-keywords`, `/en/resources/seo-kpis`, `/en/resources/seo-forecasting`, `/en/resources/seo-report-template`, `/demo`, `/en/platform/for/agencies` |
| `/resources/seo-report-template` | 3 | `/en/resources/seo-kpis`, `/en/resources/branded-vs-non-branded-keywords`, `/en/resources/seo-reporting`, `/demo` |
| `/resources/seo-kpis` | 2 | `/en/resources/seo-forecasting`, `/demo`, `/en/resources/seo-reporting` |
| `/resources/search-console-opportunity-finder` | 3 | `/help/opportunities-tasks/opportunities`, `/en/resources/ctr-by-position`, `/en/resources/seo-quick-wins`, `/en/resources/high-impressions-low-ctr` |

Inbound to the hub from the rest of the site: `/tools` (new card for the free tool), docs sidebar on `/help`, `/glossary`, `/resources`, and `sitemap.xml`. No orphan pages: every new URL is linked from the hub, the sidebar and its cluster. Link checks: see section H.

## G. Conversion map, analytics and roadmap

**Path:** Search → resource → related content (cluster list, prev/next) → free tool or product page → sign-up / demo.

| Intent | Pages | CTA | Event (GA4, via `trackCtaClick` → `cta_click` with `cta_name`) |
|---|---|---|---|
| Informational | Pillars + most articles | Soft: free tool, then live demo | `resources_<slug>_tool`, `resources_<slug>_demo` |
| Commercial | Cannibalization, reporting, report template, tool page | Direct: sign-up, then demo | `resources_<slug>_signup`, `resources_<slug>_demo` |
| Tool use | Opportunity finder | — | `opportunity_finder_run` (source, rows, opportunities, range_days), `opportunity_finder_export`, `opportunity_finder_error` |
| Sign-up attribution | All app links | `utm_source=website&utm_content=resources-<slug>` | Read in the app's sign-up attribution |

No popups, no gates. Events respect the existing cookie-consent check in `src/lib/analytics.ts`.

### 90-day roadmap
| Days | Work |
|---|---|
| **1–30 Foundation (this PR)** | Hub, 4 pillars, 8 articles, free tool, schema, sitemap, sidebar, link fix. Then: submit sitemap in Search Console, request indexing for the 14 URLs, annotate the launch date. |
| **31–60 Expansion** | Commercial: `white-label-seo-reports`, `seo-reporting-tools` (balanced roundup), `seo-dashboard`. Supporting: `content-audit`, `content-pruning`, `seo-roadmap` (+ strategy template), `ai-overview-tracking`, `llm-visibility-tracking`, `zero-click-searches`, `seo-proposal-template`, `seo-task-management`. Tool: regex generator inside the branded article; downloadable forecast CSV template. Refresh `/compare/semrush` and `/compare/ahrefs` (3,000 and 600/mo). |
| **61–90 Improve and scale** | Refresh batch 1 from its own Search Console data (titles of pages with impressions but low CTR). Add `search-console-api`, `search-console-vs-analytics`, `anonymized-queries`, `share-of-voice`. Consider Greek versions only if the hub earns English traffic (the section is English-only today). Outreach: the opportunity finder and the report template are the linkable assets. |

## Measurement and monthly review

KPIs: impressions and non-branded clicks for `/en/resources/*` (Search Console, page filter), indexed pages of the hub (Indexing → Pages), average position per cluster (query regex per cluster), `opportunity_finder_run` and `_export` counts, `cta_click` with `cta_name` starting `resources_`, sign-ups with `utm_content=resources-*`, referring domains to the tool and the template.

Monthly loop (first Monday):
1. **Refresh**: hub pages with impressions but CTR under 60% of expected (use the opportunity finder on a `/resources/` page filter export).
2. **Expand**: queries with impressions that land on a loosely related hub page → new supporting article.
3. **Merge**: two hub pages (or a hub page and a blog post) sharing a query's impressions → consolidate, 301.
4. **Remove**: pages with no impressions after 90 days and no links → rewrite for a different query or merge.
5. Re-score the opportunity table with fresh volumes, and move the next 4–6 into production.

## H. Implementation status

| Item | Status |
|---|---|
| Hub page with clusters, tool, CollectionPage schema | Done |
| 4 pillars + 8 supporting articles, written in full | Done |
| Free Search Console opportunity finder | Done |
| Article / FAQ / HowTo / Breadcrumb schema, self-canonical, sitemap, Markdown twins | Done |
| Docs sidebar groups per cluster; tools hub card | Done |
| Fix: docs links to `/en/...` were sent to the app origin | Done |
| Typecheck, lint, production build | Done (see PR) |
| Local crawl: every hub URL 200, canonical, no noindex, all internal links 200 | Done (see PR) |
| Vercel preview review | Pending |
| Production deploy | Blocked: needs explicit approval |
| Search Console: submit sitemap, request indexing, annotate launch | Pending (after deploy) |
| Days 31–90 content and tools | Pending |
| Greek versions | Not planned yet: `/resources` is English-only by design |
