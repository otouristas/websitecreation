# Keyword Research - AnotherSEOGuru (GR + EN)

> **Type:** Research-only deliverable (no code changes).
> **Markets:** Greek (primary, ~90% of impressions) + English (programmatic footprint).
> **Sources:** Supplied Google Search Console export + live Ahrefs data (country = Greece).
> **Companion files:** [`master-keyword-list.csv`](./master-keyword-list.csv) · [`faq-aeo-bank.md`](./faq-aeo-bank.md)
> **Last built:** 2026-06-30

> **Routing note (verified against the repo):** the site uses a localized App Router at `src/app/[locale]/…`. The Greek locale prefix is **`/el`** and English is **`/en`** (default, applied via `src/middleware.ts`). So "the Greek homepage" = `/el` rendered by `src/app/[locale]/page.tsx`. Older `src/app/gr/…` / un-prefixed paths are deprecated and now sit in `src/_archive/`. All file references below use the live `[locale]` structure.

---

## 1. Executive summary & the opportunity

The GSC export tells one consistent story: **AnotherSEOGuru is being seen but not clicked.** Almost every query sits on **page 4–10** (position 20–100), where CTR is effectively 0%. The handful of clicks the site does get come from a tiny number of queries already near the top.

That is the opportunity. Demand and indexing already exist - the gap is **on-page relevance, content depth, and SERP-feature capture** (AI Overviews, local packs, PAA). Moving a cluster from position 40 → 8 is the single highest-leverage action available.

### The four demand themes

| Theme | Representative queries | Status |
|---|---|---|
| **SEO services & pricing** | `seo υπηρεσιες`, `seo τιμες`, `ποσο κοστιζει το seo`, `πακετα seo` | Page exists, under-optimised |
| **Web design by city** | `κατασκευη ιστοσελιδων θεσσαλονικη/αθηνα/ηρακλειο/κρητη` | Programmatic pages exist |
| **Hosting / domains / e-shop** | `web hosting`, `ελληνικο domain`, `κατασκευη eshop woocommerce` | Mostly content gaps / off-core |
| **AEO / AI search** | `aeo`, `aeo chatgpt`, `voice seo για eshop` | Blogs exist, expand |

### Top 10 quick wins (already ranking - push to page 1)

These have impressions **and** a position worth defending or pushing. Ordered by ease.

| # | Query | Pos | Impr | Action |
|---|---|---|---|---|
| 1 | `seo υπηρεσιεσ` | 6.0 | 45 | On-page polish + FAQ schema on the `/el` SEO services section → top 3 |
| 2 | `προωθηση ιστοσελιδων τιμη` | 1.0 | 5 | Already #1 - add price table + FAQ to hold & expand to `προωθηση ιστοσελιδων` |
| 3 | `ρεθυμνο προωθηση ιστοσελιδων` | 1.29 | 35 | Strong - build a Rethymno page (city is a `locations.ts` gap) |
| 4 | `dailyhost` (brand) | 1.69 | 62 | Brand/nav term already converting (8% CTR) - keep |
| 5 | `daily host` | 5.0 | 4 | Same brand cluster - consolidate |
| 6 | `ρεθυμνο seo` | 12.4 | 51 | Rethymno local SEO page → top 5 |
| 7 | `κατασκευη ιατρικων ιστοσελιδων` | 13.85 | 52 | Medical vertical near page 1 - deepen (see C9 note) |
| 8 | `κατασκευη ιστοσελιδων αθηνα` | 16.1 | 41 | Athens web-design page exists - strengthen |
| 9 | `seo audit ελλαδα` | 71.6 | 12 | Lower pos but commercial; tie to `/en/services/seo-audits` (+ `/el`) |
| 10 | `web hosting` | 14.5 | 340 | Huge impressions - decide: content play or out of scope (off-core) |

---

## 2. Methodology & data sources

- **Google Search Console export** (supplied) - clicks, impressions, CTR, average position per query. Defines *demonstrated* demand and current rank.
- **Ahrefs Keywords Explorer (country = GR)** - monthly search volume, Keyword Difficulty (KD), search intent, SERP features, parent topic.
- **Ahrefs matching/related terms (GR)** - question keywords (PAA fuel) and "also-talk-about" entities (fan-out + citation targets).

**Reading the numbers:**
- All volumes are **Greek-market monthly** unless the row is in **Cluster C10 (English)**.
- ` - ` for volume/KD means Ahrefs has no reliable estimate (very-long-tail Greek terms that still convert).
- KD is 0–100 (higher = harder). Greek local terms are mostly **KD < 55** = winnable.
- **AI Overview** appearing in SERP features is the most important AEO signal - see §8.

---

## 3. Keyword universe - cluster overview

Ten clusters. "Page status": **exists** (live page), **gap** (page exists but term/content not covered), **new** (no page yet). Greek URLs are `/el/…`, English `/en/…`.

| Cluster | Pillar keyword | Pillar vol (GR) | Intent | Primary target | File | Status | Priority |
|---|---|---|---|---|---|---|---|
| **C1 - SEO services & pricing** | `seo υπηρεσιες` | 300 | Commercial | `/el` + `/el/services/seo-audits` | `src/app/[locale]/page.tsx` | exists | **P0** |
| **C2 - Web design by city** | `κατασκευη ιστοσελιδων` | 700 | Commercial/local | `/el/services/website-creation/[city]` | `src/app/[locale]/services/[service]/[location]/page.tsx` | exists | **P0** |
| **C3 - E-shop / WooCommerce** | `κατασκευη eshop` | 700 | Commercial | new e-shop service/landing | `src/data/services.ts` | **gap** | **P1** |
| **C4 - Hosting & domains** | `web hosting` | 450 | Commercial | content/glossary/blog | `/el/glossary`, `/el/blog` | **off-core** | **P3** |
| **C5 - Local SEO by city** | `seo θεσσαλονικη` | 100 | Commercial/local | `/el/services/local-seo/[city]` | `src/data/locations.ts` | exists + gaps | **P1** |
| **C6 - AEO / AI visibility** | `aeo` | 150 | Info/branded | `/el/services/ai-visibility` | `src/app/[locale]/services/[service]/page.tsx` | exists | **P1** |
| **C7 - Google Ads & SEO-vs-Ads** | `seo vs google ads` | 1,700 (global) | Commercial/info | comparison blog | `content/blog/` | **off-core** | **P2** |
| **C8 - Chatbots / AI for business** | `chatbot για ενοικιαζομενα` | low | Commercial | `/el/solutions/travel-ai-chatbots` + blog | `src/data/industries.ts` | exists (tourism) | **P3** |
| **C9 - Vertical / industry SEO** | `κατασκευη ιατρικων ιστοσελιδων` | 40 | Commercial | `/el/solutions/[industry]` | `src/data/industries.ts` | exists + gap | **P1** |
| **C10 - English head terms** | `web development` | EN | Commercial | EN `/en/services/*`, `/en/locations` | `src/data/services.ts` | exists | **P2** |

**Confirmed inventory (from repo):**
- **Services (10, no e-shop):** website-creation, website-redesign, seo-web-design, speed-optimization, ai-visibility, logo-design, content-creation, local-seo, link-building, seo-audits.
- **Greek locations that EXIST (`-gr`):** athens, thessaloniki, patras, heraklion, larissa, volos, crete, santorini, mykonos, naxos, paros. **GAPS:** rethymno, chania, kos, corinth, serres, lamia, kavala.
- **Industries (relevant):** restaurants, hotels, tour-operators, travel-agencies, villas-apartments, rent-a-car, **travel-ai-chatbots**, dentists, chiropractors, plastic-surgeons, med-spas, therapists, lawyers, plumbers, electricians, hvac, roofers, cleaning-services… (no single "medical" umbrella - see C9).

---

## 4. Per-cluster detail

> Metrics: GR monthly volume / KD / intent. GSC = position · impressions from the supplied export. Where Ahrefs has no volume, the GSC impressions prove live demand.

### C1 - SEO services & pricing  · Priority P0

The commercial core. Greeks search both the service (`seo υπηρεσιες`) and, heavily, the **price** (`τιμες`, `κοστος`, `ποσο κοστιζει`, `πακετα`, `προσφορα`). Pricing intent is under-served on the site.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| seo υπηρεσιες | 300 | - | commercial | 6.0 · 45 |
| ποσο κοστιζει το seo | 10 | - | commercial | 17.1 · 58 |
| seo κοστος / κοστος seo / σεο τιμες | - | - | commercial | 21.5–93 · 3–12 |
| seo τιμες / τιμες seo | 40 | - | commercial | 78–83 · 14–25 |
| πακετα seo | 40 | - | commercial | 89.8 · 6 |
| seo για επιχειρησεις | - | - | commercial | 75.7 · 86 |
| seo για μικρες επιχειρησεις | - | low | commercial | 42.5 · 19 |
| προσφορα seo | - | - | commercial | 25.3 · 4 |
| εταιρεια seo | 90 (parent) | - | commercial | 1 · 1 |

- **SERP notes:** pricing terms are low-KD with weak incumbents - winnable fast.
- **Target/angle:** a dedicated **Greek SEO pricing/packages** section/page on `/el` with a transparent price table ("από €X/μήνα") and an FAQ answering `ποσο κοστιζει`. Pricing transparency is the differentiator most Greek agencies avoid.
- **Content gap:** the `/el` homepage likely lacks a structured pricing block + FAQPage schema for these.

### C2 - Web design by city  · Priority P0

Largest commercial-local demand. Note the **enormous accent/spelling variation** in GSC (κατασκευη/κατασκευή, ιστοσελιδων/ιστοσελίδων, θεσσαλονικη/θεσσαλονίκη) - all map to **one canonical city URL**, not duplicates.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| κατασκευη ιστοσελιδων | 700 | 51 | commercial | - |
| κατασκευη ιστοσελιδων θεσσαλονικη (all variants) | 200 | 39 | comm/local | 29–48 · 3–47 |
| κατασκευη ιστοσελιδων θεσσαλονικη τιμες | - | - | comm/local | 30.5 · 25 |
| κατασκευη ιστοσελιδων αθηνα (all variants) | 80 | 39 | comm/local | 13–21 · 2–41 |
| κατασκευη ιστοσελιδων ηρακλειο | - | - | comm/local | 27.3 · 6 |
| κατασκευη ιστοσελιδας κρητη | - | - | comm/local | 51.3 · 4 |
| εταιρειες κατασκευης ιστοσελιδων θεσσαλονικη | - | - | comm/local | 64.7 · 9 |
| ιστοσελιδες θεσσαλονικη / κατασκευη site θεσσαλονικη | - | - | comm/local | 45–46 · 11 |

- **SERP notes:** **local pack** present on city terms → Google Business Profile + LocalBusiness schema matter as much as the page.
- **Target/angle:** strengthen `/el/services/website-creation/{thessaloniki-gr,athens-gr,heraklion-gr,crete-gr}`. Add a **"τιμές" price block** (matches `τιμες` modifier demand) and a city-specific FAQ.
- **Content gap:** Thessaloniki is the biggest local prize (pos ~40 with 47 impressions on one variant) and currently mid-page - deepen unique local content.

### C3 - E-shop / WooCommerce  · Priority P1 · **GAP (no e-shop service)**

`κατασκευη eshop` has **700 vol at KD 2** - one of the easiest high-value terms in the dataset - and the site has **no e-shop service page** (services list confirmed: no e-shop). AI Overview + paid dominate the SERP.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| κατασκευη eshop | 700 | 2 | commercial | - |
| κατασκευη eshop woocommerce | 150 | - | commercial | 91 · 22 |
| κατασκευη woocommerce | - | - | commercial | 97 · 23 |
| κατασκευη eshop θεσσαλονικη τιμες | - | - | comm/local | 36.3 · 6 |
| seo για eshop / e-shop | 200 | - | commercial | 80–85 · 63–101 |
| eshop seo / seo eshop | - | - | commercial | 24–82 · 16–17 |
| seo για ηλεκτρονικο καταστημα | - | - | commercial | 91.8 · 11 |
| webshop seo / voice seo για eshop | - | - | commercial | 31–34 · 15–19 |
| woocommerce τι ειναι | 150 | 0 | info | 23 · 2 |

- **SERP notes:** `seo για eshop` shows **101 impressions** - strong latent demand the site already surfaces for, but at pos 80+.
- **Target/angle:** create an **e-shop / WooCommerce build service** (`κατασκευη eshop`) **and** an **e-shop SEO** page (`seo για eshop`) - distinct intents (build vs optimise). Add to `src/data/services.ts` (+ Greek `src/data/services-i18n.ts`) - roadmap item, not a current offering.

### C4 - Hosting & domains  · Priority P3 · **OFF-CORE (not a productized service)**

High impressions (`web hosting` = 340 impr) but **AnotherSEOGuru does not sell hosting or domains.** Treat as **informational/content** plays to capture top-funnel + feed AEO, *not* as services to advertise.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| web hosting | 450 | 61 | commercial | 14.5 · 340 |
| hosting | 700 | 50 | comm/local | 11 · 3 |
| web hosting greece | 150 | 54 | comm/local | 27.2 · 55 |
| web hosting services | - | - | commercial | 26.3 · 15 |
| ελληνικο/ελληνικα domain | 40 | - | comm | 51–55 · 13 |
| domain name | 1,200 | 75 | info | - |
| presta shop host greece / magento hosting ελλαδα | - | - | comm | 8.9 / 73 · 3–8 |

- **Recommendation:** publish **guide/glossary content** ("πώς να διαλέξεις web hosting", "τι είναι το domain") that internal-links to actual services (web design, SEO). Do **not** create a hosting *service* page. Brand terms (`dailyhost`, `daily host`, `mediahost`) are navigational - likely legacy/partner references; keep but don't invest.

### C5 - Local SEO by city  · Priority P1 · exists + **city gaps**

Strong local-SEO intent across many Greek cities. **Critical gap:** `locations.ts` has athens, thessaloniki, patras, heraklion, larissa, volos, crete, santorini, mykonos, naxos, paros. **Rethymno, Chania, Kos, Corinth, Serres, Lamia** appear in GSC with rankings but **have no page.**

| Keyword | Vol | KD | Intent | GSC pos · impr | In locations.ts? |
|---|---|---|---|---|---|
| seo θεσσαλονικη | 100 | - | comm/local | 95 · 14 | ✅ |
| ρεθυμνο seo | - | - | comm/local | 12.4 · 51 | ❌ gap |
| ρεθυμνο προωθηση ιστοσελιδων | - | - | comm/local | **1.29** · 35 | ❌ gap |
| κρητη seo / κρήτη | - | - | comm/local | 62 · 23 | ✅ (`crete-gr`) |
| ηρακλειο seo | - | - | comm/local | 82.7 · 10 | ✅ |
| κως seo | - | - | comm/local | 79 · 6 | ❌ gap |
| χανια seo | - | - | comm/local | 88 · 1 | ❌ gap |
| seo κορινθος / σερρες seo / λαμια seo | - | - | comm/local | 83–87 · 1–3 | ❌ gap |

- **SERP notes:** Rethymno is already **position 1.29** for `ρεθυμνο προωθηση ιστοσελιδων` (35 impr) despite no dedicated page - building one is a near-guaranteed win.
- **Action:** add the missing cities to `src/data/locations.ts` following the `Location` interface (slug `-gr`, city, cityLocal, tier, geo). Also register new Greek slugs in `src/lib/locale-paths.ts` (`GREEK_LOCATION_SLUGS`). This unlocks `/el/services/local-seo/[city]` and `/el/services/website-creation/[city]` automatically.

### C6 - AEO / AI visibility / GEO  · Priority P1 · exists

The site's strategic differentiator, and demand is emerging. `aeo` = 150 vol, **KD 0**, AI Overview present.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| aeo | 150 | 0 | info/branded | 75 · 17 |
| aeo marketing / aeo chatgpt | - | - | info | 51 / 78 · 1 |
| voice seo για eshop | - | - | comm | 31.7 · 15 |
| seo labs vs ανταγωνιστες | - | - | comm/branded | 96 · 1 |
| google e seo / seo web | - | - | info | 24–40 · 12–14 |

- **Target/angle:** `/el/services/ai-visibility` + existing blogs `geo-aeo-ellada`, `pillar-ai-llm-visibility`, `llm-citations-brand-visibility`. Expand each to explicitly target `aeo`, `answer engine optimization`, `aeo chatgpt`.
- **Why now:** §8 shows nearly every informational query in this dataset already triggers an AI Overview - owning AEO is both a service pitch *and* a way to get cited.

### C7 - Google Ads & SEO-vs-Ads  · Priority P2 · **OFF-CORE**

Comparison/decision content. AnotherSEOGuru doesn't run Ads as a service, but these are perfect **top-funnel + AEO** content routing to SEO services.

| Keyword | Vol | KD | Intent | GSC pos · impr |
|---|---|---|---|---|
| seo vs google ads (global) | 1,700 | - | info | - |
| seo vs google ads ελλαδα | - | - | info | 36.3 · 18 |
| google ads seo / seo adwords / google adwords seo | - | - | comm | 22–27 · 4–6 |
| adwords μικρες επιχειρησεις | - | - | comm | 25.5 · 67 |
| google ads vs seo | - | - | info | 25 · 1 |

- **Recommendation:** one strong **"SEO vs Google Ads (Ελλάδα)"** comparison blog with a decision table + FAQ; internal-link to SEO services. Multilingual variants (`google ads vagy seo` HU, `seo vai google ads` FI) = international noise, ignore.

### C8 - Chatbots / AI for business  · Priority P3 · partially **exists** (`travel-ai-chatbots`)

`chatbot τι ειναι` = 400 vol with AI Overview. **The site already has a `travel-ai-chatbots` industry page** (`/el/solutions/travel-ai-chatbots`), which directly serves `chatbot για ενοικιαζομενα` - connect it. General business-chatbot terms remain off-core.

| Keyword | Vol | KD | Intent | GSC pos · impr | Home |
|---|---|---|---|---|---|
| chatbot για ενοικιαζομενα | - | - | comm | 87 · 6 | `/el/solutions/travel-ai-chatbots` (exists) |
| chatbot για επιχειρησεις | - | - | comm | 25.5 · 13 | blog (off-core) |
| chatbot για υποστηριξη πελατων | - | - | comm | 21 · 2 | blog (off-core) |
| chatbot τι ειναι | 400 | 0 | info | - | glossary/blog |

- **Recommendation:** strengthen `travel-ai-chatbots` for `chatbot για ενοικιαζομενα` (+ cross-link villas-apartments/rent-a-car). Add a general "chatbot τι ειναι" info blog only if pursuing the broader term.

### C9 - Vertical / industry SEO  · Priority P1 · exists + gap

The site has `/el/solutions/[industry]` with a rich set, plus a `medical-marketing` blog. GSC shows medical & tourism traction. **Note:** there is **no single "medical" industry slug** - health is split across `dentists`, `chiropractors`, `plastic-surgeons`, `med-spas`, `therapists`. The query `κατασκευη ιατρικων ιστοσελιδων` has **no exact-match landing page** → content gap.

| Keyword | Vol | KD | Intent | GSC pos · impr | Mapping |
|---|---|---|---|---|---|
| κατασκευη ιατρικων ιστοσελιδων | 40 | - | commercial | **13.85** · 52 | **gap** - build medical web-design page/blog (or hub over health verticals) |
| κατασκευη ιατρικων ιστοσελιδων θεσσαλονικη | - | - | comm/local | 23.6 · 16 | gap (medical + Thessaloniki) |
| seo για τουριστικες επιχειρησεις | - | - | commercial | 25.8 · 6 | `/el/solutions/{hotels,tour-operators,travel-agencies,villas-apartments}` (exist) |
| seo εστιαση | - | - | commercial | 89 · 3 | `/el/solutions/restaurants` (exists) |
| seo οικιακες υπηρεσιες | - | - | commercial | 40 · 2 | `/el/solutions/{plumbers,electricians,cleaning-services,hvac}` (exist) |

- **Target/angle:** medical is closest to page 1 (pos 13.85, 52 impr) but lacks a dedicated page - **build a "κατασκευή ιατρικών ιστοσελίδων" page/hub** (highest-ROI gap in this cluster) and deepen the `medical-marketing` blog. Tourism & restaurant verticals already exist - optimise them for the Greek queries.

### C10 - English head terms  · Priority P2 · exists (EN footprint)

The English programmatic pages surface for generic web/SEO terms but rank low. Lower priority than Greek given the impression split, but cheap to improve via the existing system.

| Keyword (EN) | Intent | GSC pos · impr |
|---|---|---|
| web development | commercial | 7.86 · 7 |
| web development agency / heraklion crete | commercial | 12 / 75.5 · 1–2 |
| website design near me | commercial/local | 1 · 1 |
| seo services / seo agencies / and seo services | commercial | 7–12 · 1 |
| modern web design | commercial | 13 · 1 |
| web hosting / web hosting in greece / services | commercial | 14–31 · 1–15 |

- **Target/angle:** strengthen EN `/en/services/website-creation` (+ web-dev angle) and `/en/services/website-creation/heraklion-gr` for "heraklion crete". `web development` at **pos 7.86** is a quiet quick win.

---

## 5. People Also Ask (PAA)

Real question keywords from Ahrefs (GR), most with AI Overviews. Answer these **directly and concisely** (40–55 words) at the top of the relevant page to win PAA + AI Overview slots. Full copy in [`faq-aeo-bank.md`](./faq-aeo-bank.md).

| Question | Vol | Answer angle | Target page |
|---|---|---|---|
| seo τι ειναι / τι ειναι το seo | 450 / 200 | 1-line definition + how it works | `/el/glossary` + `/el` |
| seo πως λειτουργει | 90 | 3-step plain explanation | `/el` SEO section |
| ποσο κοστιζει το seo | 10+ | Price range + what drives cost | `/el` pricing block |
| google ads τι ειναι | 200 | Definition + when to use vs SEO | SEO-vs-Ads blog (C7) |
| πως συνεργαζονται seo και adwords | 30 | Complementary-channel answer | SEO-vs-Ads blog (C7) |
| ποσο κοστιζει ενα eshop | 80 | Cost range + what's included | e-shop page (C3) |
| δημιουργια eshop τι χρειαζεται | 100 | Checklist: domain, hosting, platform, ΑΦΜ/φορολογια | e-shop page (C3) |
| τι φορολογια εχουν τα eshop | 70 | Greek tax basics + disclaimer | e-shop blog (C3) |
| woocommerce τι ειναι | 150 | Definition + WooCommerce vs Shopify | e-shop page / glossary |
| domain name τι ειναι / domain τι ειναι | 70 / 50 | Definition + how to register .gr | glossary (C4) |
| hosting τι ειναι / ποιο web hosting να διαλεξω | 40 / 30 | Definition + selection criteria | glossary/blog (C4) |
| chatbot τι ειναι | 400 | Definition + business use cases | travel-ai-chatbots / blog (C8) |
| aeo / answer engine optimization | 150 / 90 | What AEO is + how it differs from SEO | `/el/services/ai-visibility` |

---

## 6. Query fan-out (AI Mode / AI Overviews)

Generative search expands one query into a tree of sub-questions, then synthesises an answer from pages that cover the **whole tree**. Structure each pillar page so its H2/H3s answer the full fan-out - that's how you get cited (§8).

**`κατασκευη eshop` (C3)** fans out to →
- πόσο κοστίζει ένα eshop;  • τι χρειάζεται για να ανοίξω eshop (domain, hosting, πλατφόρμα, ΑΦΜ);  • WooCommerce vs Shopify vs custom;  • πόσο χρόνο παίρνει;  • φορολογία/νομικά;  • πληρωμές & μεταφορικά;  • SEO για eshop;  • συντήρηση & κόστος μετά.

**`κατασκευη ιστοσελιδων [city]` (C2)** fans out to →
- πόσο κοστίζει;  • πόσο διαρκεί;  • WordPress vs custom;  • responsive/mobile;  • SEO από την αρχή;  • φιλοξενία & domain;  • portfolio;  • υποστήριξη μετά.

**`seo υπηρεσιες` / pricing (C1)** fans out to →
- πόσο κοστίζει το SEO;  • τι περιλαμβάνει ένα πακέτο;  • πόσο γρήγορα φέρνει αποτελέσματα;  • SEO vs Google Ads;  • τοπικό SEO;  • SEO για eshop;  • πώς μετριέται η επιτυχία.

**`aeo` / AI visibility (C6)** fans out to →
- τι είναι το AEO;  • AEO vs SEO;  • πώς με αναφέρει το ChatGPT/Perplexity;  • schema & structured data;  • AI Overviews στην Google;  • τι αλλάζει για eshop/τοπικές επιχειρήσεις.

**`web hosting` (C4)** fans out to →
- τι είναι το hosting;  • ποιο να διαλέξω;  • shared vs VPS vs cloud;  • hosting στην Ελλάδα vs εξωτερικό;  • ταχύτητα & SEO;  • domain + hosting μαζί.

> **Rule of thumb:** every fan-out node = one H2/H3 with a 1–3 sentence direct answer, then detail. Add a matching FAQ entry (§7) so the same node is eligible for PAA/FAQ rich results.

---

## 7. FAQ bank

Copy-ready Q&A lives in [`faq-aeo-bank.md`](./faq-aeo-bank.md), grouped per cluster. **Where FAQs plug into the codebase:**

| FAQ location | Data/component | Schema |
|---|---|---|
| Homepage / locale FAQ | `src/data/home-faq-data.ts` → `src/components/marketing/HomeFaq.tsx` | auto `generateFAQSchema()` |
| Service & service×location pages | `src/components/seo/FAQSection.tsx` (accepts FAQ array) | `generateFAQSchema()` |
| Blog posts | inline Q&A in `content/blog/*.md` | add FAQPage at page level if needed |

Schema builders live in `src/lib/seo/schema.ts` (`generateFAQSchema`, `combineSchemas`). **Every page targeting a PAA question should ship a matching FAQPage entry** - the cheapest AI-Overview/PAA win available.

---

## 8. AEO / ChatGPT / LLM optimization

**The dataset's defining signal:** nearly every informational/question query carries `ai_overview` + `ai_overview_sitelink` (seo τι είναι, woocommerce τι ειναι, google ads τι ειναι, domain/hosting τι ειναι, aeo, κατασκευη eshop…). Greek SERPs for this niche are **answer-engine-first.** Optimising only for blue links leaves most of the SERP on the table.

**How to get cited (AI Overviews, ChatGPT, Perplexity, Gemini):**
1. **Answer-first format.** Lead each section with a 40–55 word direct answer, then expand. LLMs extract the concise answer.
2. **Cover the full fan-out (§6).** Pages that answer the whole sub-question tree get synthesised/cited far more often than thin pages.
3. **Structured, extractable shapes.** Definitions, numbered steps, comparison tables, and "X vs Y" sections are disproportionately cited.
4. **Entities & disambiguation (§9).** Name entities explicitly and link them - LLMs map content to a knowledge graph.
5. **Schema as machine-readable backup.** FAQPage, Article, Service, LocalBusiness, BreadcrumbList (all in `src/lib/seo/schema.ts`) reinforce the same facts.
6. **Conversational variants.** Target natural phrasings: "πόσο κοστίζει να φτιάξω eshop", "ποιο hosting να διαλέξω για WordPress", "ποια είναι η καλύτερη εταιρεία SEO για μικρή επιχείρηση".
7. **Freshness + author/E-E-A-T.** Dated, authored, regularly-updated pages (the blog already carries author/date frontmatter) earn citation trust.

**Tie-in:** the existing blogs `llm-citations-brand-visibility` and `pillar-ai-llm-visibility` are the natural home for the public version - expand to target `aeo`, `aeo chatgpt`, `answer engine optimization`, with a Greek-market angle. The repo also ships `llms.txt` at root - keep it aligned with these pages.

---

## 9. Citations & entity strategy

**Entities to cover and interlink** (Ahrefs also-talk-about, GR). Mentioning + disambiguating these strengthens topical authority and LLM knowledge-graph mapping:

`digital marketing` (4,800) · `τεχνητή νοημοσύνη` (23,000) · `social media` (3,900) · `keyword research` (4,000) · `μηχανές αναζήτησης` · `λέξεις κλειδιά` · `on-page seo` · `off-page seo` · `technical seo` · `answer engine optimization` (90) · `search engine optimization` · `google` · `google search`.

**Glossary additions** (`/el/glossary`, `/en/glossary`) - each a short, schema-marked definition that doubles as a citation source and internal-link target: **AEO, GEO, SEO, on/off/technical SEO, SERP, schema/structured data, WooCommerce, domain, web hosting, keyword research, AI Overview, local pack, λέξεις-κλειδιά, μηχανή αναζήτησης.**

**External sources worth citing** (trust for readers + LLMs): Google Search Central / Search Essentials, Schema.org, Google Business Profile help, official WooCommerce/WordPress docs, and the Greek `.gr` registry (for domain content). Cite primary sources, not competitors.

**Schema-as-citation:** every cluster has a matching schema type in `src/lib/seo/schema.ts` - use FAQPage (PAA), Article (blog), Service (services), LocalBusiness (city pages), BreadcrumbList (everywhere). Consistent schema = consistent machine-readable facts for AI engines to quote.

---

## 10. Internal linking plan

Map clusters onto the existing hub-spoke system in `src/lib/linking/hub-spoke.ts`:

| Hub | Receives spokes from | Example anchors (entity-rich) |
|---|---|---|
| **SEO Services** (`/services`) | C1, C5, C9 | "υπηρεσίες SEO", "τοπικό SEO Θεσσαλονίκη", "SEO για eshop" |
| **AI SEO** (`/ai-seo`) | C6, C8 | "AEO", "answer engine optimization", "AI visibility" |
| **Technical SEO** (`/technical-seo`) | C2, C4 | "technical seo", "ταχύτητα ιστοσελίδας", "Core Web Vitals" |
| **SEO Tools** (`/seo-tools`) | C1, C6 | "keyword research", "SEO audit", "λέξεις κλειδιά" |
| **Website SEO** (`/website-seo`) | C2, C3, C10 | "κατασκευή ιστοσελίδων", "on-page seo", "web design" |
| **Locations** (`/el/locations`) | C2, C5 | city names → city service pages |

**Rules:**
- Each **pillar** links down to its spokes; each **spoke** links back up + sideways to 2–3 siblings.
- **Anchors** should reuse the §9 entity list (not "click here") - anchors are ranking *and* AEO signals.
- **Bilingual:** the locale router already pairs `/en` ↔ `/el` for the same page; ensure `hreflang` (en ↔ el) is emitted. `src/lib/locale-paths.ts` maps EN↔EL marketing routes - keep new pages registered there.
- **PAA/FAQ pages** link to the commercial page that monetises the answer (e.g. `ποσο κοστιζει το seo` FAQ → `/el` pricing block).

---

## 11. Page-by-page action map

| Cluster | Target URL | File | Status | Action |
|---|---|---|---|---|
| C1 | `/el` (SEO + pricing block) | `src/app/[locale]/page.tsx` | exists | Add price table + FAQ schema for `seo τιμες/κοστος/πακετα` |
| C1 | `/el/services/seo-audits` | `src/app/[locale]/services/[service]/page.tsx` | exists | Strengthen for `seo audit ελλαδα` |
| C2 | `/el/services/website-creation/{thessaloniki,athens,heraklion,crete}-gr` | `src/app/[locale]/services/[service]/[location]/page.tsx` | exists | Add τιμές block + city FAQ; deepen Thessaloniki |
| C3 | `/el/services/eshop-woocommerce` + `/el/services/eshop-seo` | `src/data/services.ts` + `services-i18n.ts` | **new** | Create e-shop **build** + e-shop **SEO** services (KD 2 - high ROI) |
| C4 | hosting/domain guides + glossary | `content/blog/`, `src/app/[locale]/glossary/page.tsx` | **new (off-core)** | Guide content only; do **not** create a hosting service |
| C5 | `/el/services/local-seo/[city]` | `src/data/locations.ts` (+ `src/lib/locale-paths.ts`) | exists + gaps | **Add Rethymno, Chania, Kos, Corinth, Serres, Lamia** |
| C6 | `/el/services/ai-visibility` + AEO blogs | `src/app/[locale]/services/[service]/page.tsx`, `content/blog/` | exists | Target `aeo`, `aeo chatgpt`, `answer engine optimization` |
| C7 | SEO-vs-Ads comparison | `content/blog/` | **new (off-core)** | One decision-table blog → links to SEO services |
| C8 | `/el/solutions/travel-ai-chatbots` (+ optional blog) | `src/data/industries.ts`, `content/blog/` | exists | Optimise for `chatbot για ενοικιαζομενα`; cross-link villas/rent-a-car |
| C9 | `/el/solutions/{restaurants,hotels,tour-operators}` + **new medical page** | `src/data/industries.ts`, `content/blog/medical-marketing.md` | exists + gap | Build "κατασκευή ιατρικών ιστοσελίδων" page (pos 13.85 gap); optimise tourism/εστίαση |
| C10 | EN `/en/services/website-creation`, `…/heraklion-gr` | `src/data/services.ts` | exists | Push `web development` (pos 7.86) |
| All | FAQ data | `src/data/home-faq-data.ts` | exists | Expand with cluster FAQs from `faq-aeo-bank.md` |

---

## 12. Prioritized roadmap

| Priority | Theme | Effort | Impact | Why |
|---|---|---|---|---|
| **P0** | Optimise pages at pos 6–20 (C1 `seo υπηρεσιεσ`, C2 Athens/Thessaloniki, C10 `web development`) + add FAQPage schema | Low | High | Closest to page 1; small lifts = real clicks |
| **P0** | C1 pricing block + `ποσο κοστιζει`/`τιμες` FAQ on `/el` | Low | High | Under-served high-intent demand, low competition |
| **P1** | C5 add missing Greek cities to `locations.ts` (Rethymno first - already pos 1.29) | Med | High | Unlocks city pages programmatically; near-guaranteed wins |
| **P1** | C3 e-shop build + e-shop SEO services | Med | High | `κατασκευη eshop` KD 2 @ 700 vol; `seo για eshop` 101 impr |
| **P1** | C9 build medical web-design page + optimise tourism/εστίαση | Med | Med-High | Medical already pos 13.85 with 52 impr, no exact page |
| **P1** | C6 expand AEO pages/blogs | Med | Med-High | Strategic differentiator; AI-Overview-heavy SERPs |
| **P2** | C7 SEO-vs-Ads comparison blog | Low | Med | Top-funnel + AEO; routes to SEO services |
| **P2** | C10 broaden English programmatic pages | Low | Med | Cheap via existing system |
| **P3** | C8 optimise `travel-ai-chatbots` for `ενοικιαζομενα` | Low | Low-Med | Page exists; small tuning |
| **P3** | C4 hosting/domain guides (off-core) | Low | Low-Med | Top-funnel/AEO only; not a service |

---

## 13. Appendix

- **Master keyword list:** [`master-keyword-list.csv`](./master-keyword-list.csv) - every GSC + Ahrefs keyword with metrics, cluster, target page/file, status, priority.
- **FAQ / AEO bank:** [`faq-aeo-bank.md`](./faq-aeo-bank.md) - copy-ready answers per cluster.
- **Glossary terms to add:** AEO, GEO, SEO, on-page/off-page/technical SEO, SERP, schema/structured data, WooCommerce, domain, web hosting, keyword research, AI Overview, local pack, λέξεις-κλειδιά, μηχανή αναζήτησης.
- **Accent/spelling variants:** Greek queries appear with and without tonos/accents and in multiple spellings (κατασκευη/κατασκευή, ιστοσελιδων/ιστοσελίδων). **Target one canonical URL per intent** - do not create duplicate pages per spelling. Natural on-page usage of the common variants is enough.
- **International noise to ignore:** `seo hinnat`, `lämmitysöljyn hinta seo` (Finnish), `google ads vagy seo` (Hungarian), `seo vai google ads` (Finnish) - not Greek-market targets.
- **Locale mechanics:** prefixes `/en` & `/el` (`src/lib/i18n/locale.ts`); Greek detection + redirect in `src/middleware.ts`; EN↔EL route mapping + `GREEK_LOCATION_SLUGS` in `src/lib/locale-paths.ts`; Greek locations sitemap is `src/app/sitemap-locations-el.xml`.
