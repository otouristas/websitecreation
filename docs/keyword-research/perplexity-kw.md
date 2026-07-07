# Keyword Research Deliverable — AnotherSEOGuru (GR + EN)

## 1. Executive summary & the opportunity

AnotherSEOGuru is generating meaningful impressions in Google Search Console, but almost all tracked queries sit on pages 4–10, which translates into negligible clicks and leads. The core issue is not lack of demand but misalignment: current content and page architecture are only loosely mapped to what people in the Greek market actually search for around SEO services, website creation, e‑shops, hosting/domains, Google Ads, and AI‑related topics.

Analysis of the GSC export and Ahrefs GR data shows four primary demand themes: (1) SEO services & pricing, (2) web design by city, (3) e‑shop / WooCommerce, and (4) hosting/domains/AEO/AI search, plus several off‑core but commercially valuable side topics (Ads, chatbots, AI visibility). Within these themes we can define ten actionable keyword clusters across Greek and English that align with the site’s existing programmatic service × location system, FAQ/schema infrastructure, hubs, blog, and glossary.

The immediate opportunity is to turn this raw demand into focused landing pages and FAQ/AEO content so that each cluster has a clear pillar page with a well‑defined H1/title, section layout, and FAQ schema; location modifiers (city/region) are handled via programmatic Greek service pages; and AI‑Overview + question‑type queries (“τι είναι”, “πόσο κοστίζει”, “πώς λειτουργεί”, “ποιο να διαλέξω”, “SEO vs Google Ads”) are systematically answered in a way that LLMs and Google’s AI Overviews can cite.

Quick wins are already detectable in GSC: queries like `seo υπηρεσιες`, `προωθηση ιστοσελιδων τιμη`, `κατασκευη ιστοσελιδων αθηνα`, and local SEO terms for cities such as Ρέθυμνο already show impressions around positions 6–20, meaning that small page‑level improvements (copy alignment, headings, FAQ schema, internal links) can realistically move them into the top 3–5. These P0 opportunities should be prioritized ahead of brand‑new content.

## 2. Methodology & data sources

This deliverable is research‑only: it defines keyword clusters, target URLs, FAQ banks, AEO/LLM questions, and internal‑linking plans without touching any production code or content files. All implementation work (adding new pages, editing copy, adjusting schema, updating Next.js routes) is left for a subsequent execution phase.

The analysis combines two primary data sources:

- **Google Search Console (GSC)** export for anotherseoguru.com: impressions, clicks, average position, and query text, ~90% in Greek, covering SEO services, web design, hosting/domains, Ads, chatbot, and AI/AEO queries.
- **Ahrefs Keyword Explorer, country = Greece (GR)**: monthly search volume, keyword difficulty (KD), click potential, SERP features (AI Overview, local pack, questions, videos, images, paid results).

Greek‑market Ahrefs data is used as the canonical reference for volume and difficulty, e.g.:

- `seo` — 4,300/mo, KD 93, informational, AI Overview.
- `google ads` — 14,000/mo, KD 80, commercial/branded, question + video.
- `κατασκευη ιστοσελιδων` — 700/mo, KD 51, commercial, AI Overview.
- `κατασκευη ιστοσελιδων θεσσαλονικη` — 200/mo, KD 39, commercial/local, local pack.
- `κατασκευη ιστοσελιδων αθηνα` — 80/mo, KD 39, commercial/local, local pack.
- `κατασκευη eshop` — 700/mo, KD 2, commercial, AI Overview + paid.
- `κατασκευη eshop woocommerce` — 150/mo, commercial.
- `web hosting` — 450/mo, KD 61, commercial, question + local pack.
- `web hosting greece` — 150/mo, KD 54, commercial/local, local pack.
- `hosting` — 700/mo, KD 50, commercial/local, AI Overview.
- `domain name` — 1,200/mo, KD 75, informational, paid + question.
- `seo υπηρεσιες` — 300/mo, commercial.
- `προωθηση ιστοσελιδων` — 300/mo, commercial, image.
- `προωθηση ιστοσελιδων τιμη` — 150/mo, commercial.
- `seo για eshop` — 200/mo, commercial.
- `seo θεσσαλονικη` — 100/mo, commercial/local.
- `aeo` — 150/mo, KD 0, info/branded, AI Overview.
- `woocommerce τι ειναι` — 150/mo, KD 0, info, AI Overview.

Question‑type keywords with strong AI‑Overview presence (`seo τι είναι`, `chatbot τι ειναι`, `google ads τι ειναι`, `τι ειναι seo`, `δημιουργια eshop τι χρειαζεται`, `ποσο κοστιζει ενα eshop`, `seo πως λειτουργει`, `domain name τι ειναι`, `hosting τι ειναι`, `ποιο web hosting να διαλεξω`, `πως συνεργαζονται seo και adwords`, `seo vs google ads`) are treated as AEO fuel for FAQ sections, blog posts, and glossary entries.

All volumes are Greek‑market metrics unless explicitly marked as English (cluster C10), where international demand is more relevant. SERP‑feature annotations (AI Overview, local pack, questions, video, images, paid) are used to prioritize which queries should drive structured FAQs, comparison tables, and location‑based schema.

## 3. Keyword universe — cluster overview

The keyword universe for AnotherSEOGuru is organized into ten practical clusters, each with a pillar keyword, approximate cluster volume, dominant intent, a primary target page, current page status, and priority. These clusters are grounded in GSC queries and supported by Ahrefs GR data.

### Cluster overview table

| Cluster | Pillar keyword | Approx. cluster volume (GR) | Dominant intent | Primary target page | Page status | Priority |
|---|---|---|---|---|---|---|
| C1 — SEO services & pricing | `seo υπηρεσιες` / `seo τιμες` | ~1,000+ (incl. pricing variants) | Commercial | `/gr/services/seo-audits` + `/services` hub | Exists (needs copy realignment) | P0 |
| C2 — Web design by city | `κατασκευη ιστοσελιδων` + city modifiers | ~1,000+ (core + cities) | Commercial/local | `/gr/services/website-creation/[location]` | Exists, some cities missing | P1 |
| C3 — E‑shop / WooCommerce | `κατασκευη eshop` / `seo για eshop` | ~1,000+ | Commercial | new `/gr/services/eshop` or `/services/eshop-woocommerce` | Gap/new | P2 |
| C4 — Hosting & domains (off‑core) | `web hosting` / `hosting` / `domain name` | ~2,500+ | Commercial/info | `/blog/hosting-guide`, `/glossary/hosting`, `/glossary/domain-name` | New content | P3 (off‑core) |
| C5 — Local SEO by city | `seo` + city modifiers | ~800+ | Commercial/local | `/gr/services/local-seo/[location]` | Exists for some cities, others missing | P1 |
| C6 — AEO / AI visibility / GEO | `aeo` / AI SEO / GEO | ~400+ | Informational/branded | `/services/ai-visibility` + AI/AEO blogs | Exists (needs keyword alignment) | P2 |
| C7 — Google Ads & SEO vs Ads (off‑core) | `google ads` / `seo vs google ads` | 14,000+ (Ads) + global comparison | Commercial/comparison | `/blog/seo-vs-google-ads-ellada` (+ optional Ads consulting page) | New content | P3 (off‑core) |
| C8 — Chatbots / AI for business (off‑core) | `chatbot τι ειναι` / chatbot use‑cases | ~400+ | Informational/commercial | `/blog/chatbot-gia-epicheiriseis` + `/solutions/chatbot` | New content | P3 (off‑core) |
| C9 — Vertical / industry SEO | tourism, medical, hospitality, services SEO | ~500+ | Commercial | `/solutions/[industry]` | Partially existing, needs expansion | P2 |
| C10 — English head terms | `seo services`, `web development`, etc. | ~5,000+ (EN) | Commercial | `/services/*` (EN) + `/locations` | Exists (needs alignment to GR clusters) | P1 |

Off‑core clusters (C4, C7, C8) must be visibly flagged as “not currently a productized service” in internal docs and briefs so they are not accidentally pitched as core offerings. They are content and lead‑gen opportunities (blog, glossary, comparison guides) designed to support the main service clusters.

## 4. Per‑cluster detail

Each cluster below includes example keywords (from GSC + Ahrefs), indicative metrics, intent/SERP notes, suggested target pages and H1/title angles, and key content gaps.

### C1 — SEO services & pricing

**Example keywords**

- `seo υπηρεσιες` (300/mo, commercial, GR).
- Pricing & cost variants: `seo τιμες`, `ποσο κοστιζει το seo`, `seo κοστος`, `πακετα seo`, `προσφορα seo` (combined ~700/mo).
- Informational head term: `seo` (4,300/mo, KD 93, info, AI Overview).

**SERP & intent notes**

- Strong mix of commercial and informational intent: users want both definitions (“τι είναι SEO”) and pricing/comparison (“τιμές”, “κόστος”).
- AI Overview on `seo` and multiple “τι είναι” queries implies that concise, structured answers plus deeper sections are necessary to win citations.

**Recommended target pages**

- Primary Greek pillar: `/gr/services/seo-audits` repositioned as “SEO υπηρεσίες & SEO Audit” with a transparent pricing section and packages.
- English pillar: `/services/seo-audits` expanded to address “SEO services”, “SEO pricing”, and “SEO packages” in EN.
- Hub page: `/services` acting as an overview for SEO, local SEO, website creation, AI visibility, and (optionally) Ads/chatbots.

**H1/title angles**

- GR: `SEO υπηρεσίες για μικρές επιχειρήσεις στην Ελλάδα` with subheading including “τιμές, πακέτα, SEO audit”.
- EN: `SEO Services & Audits for Small Businesses` with a dedicated pricing section.

**Content gaps**

- No dedicated Greek page that explicitly answers “πόσο κοστίζει το SEO;” with price ranges, scenarios, and FAQs.
- Existing SEO content is more generic than the actual queries; it should mirror the language of “τιμή”, “πακέτο”, “προσφορά”.

---

### C2 — Web design by city

**Example keywords**

- `κατασκευη ιστοσελιδων` (700/mo, KD 51, commercial, AI Overview).
- City modifiers: `κατασκευη ιστοσελιδων θεσσαλονικη` (200/mo, KD 39, local pack), `κατασκευη ιστοσελιδων αθηνα` (80/mo, KD 39, local pack), plus variants for Ηράκλειο, Κρήτη, κ.λπ.
- Pricing modifiers: `κατασκευη ιστοσελιδων τιμες` (~50–100/mo).

**SERP & intent notes**

- Primarily commercial/local intent: users look for agencies near them, with local packs appearing for city queries.
- AI Overview for the generic term indicates that informational elements (process, what’s included, timelines) are also valuable.

**Recommended target pages**

- Programmatic GR pages: `/gr/services/website-creation/[location]` for key cities (Athens, Thessaloniki, Heraklion, Patras, Larissa, Volos, plus new cities Rethymno, Chania, Kos, Corinth, Serres, Lamia, Kavala).
- EN counterparts: `/services/website-creation/[location]` for EN queries like “website design near me”.

**H1/title angles**

- GR: `Κατασκευή Ιστοσελίδων στην [Πόλη]` with subheading referencing “σύγχρονα website, SEO, και υποστήριξη”.
- EN: `Website Design & Development in [City]`.

**Content gaps**

- Missing city pages in `src/data/locations.ts` for Ρέθυμνο, Χανιά, Κως, Κόρινθος, Σέρρες, Λαμία, Καβάλα (to be added during execution).
- Existing city pages may lack localized testimonials, pricing, and FAQs tailored to web design queries.

---

### C3 — E‑shop / WooCommerce

**Example keywords**

- `κατασκευη eshop` (700/mo, KD 2, commercial, AI Overview + paid).
- `κατασκευη eshop woocommerce` (150/mo, commercial).
- `seo για eshop` (200/mo, commercial, e‑commerce SEO intent).

**SERP & intent notes**

- Highly commercial intent: users are ready to commission an e‑shop or get SEO for an existing store.
- AI Overview and paid ads suggest heavy competition but clear information patterns (cost, platform choice, timelines, legal requirements).

**Recommended target pages**

- New GR service page: `/gr/services/eshop-creation` or `/gr/services/eshop-woocommerce`.
- EN service page: `/services/eshop-woocommerce` targeting “WooCommerce development” and “e‑commerce SEO”.

**H1/title angles**

- GR: `Κατασκευή E‑shop & WooCommerce SEO` with sections for “κόστος”, “τι χρειάζεται”, “πλατφόρμες”, “SEO για e‑shop”.
- EN: `WooCommerce E‑shop Development & SEO`.

**Content gaps**

- No dedicated e‑shop service landing exists today; this is a clear structural gap given the demand.
- E‑shop SEO is only implicitly covered; it needs a section with internal links from the SEO services pillar.

---

### C4 — Hosting & domains (off‑core)

**Example keywords**

- `web hosting` (450/mo, KD 61, commercial, question + local pack).
- `web hosting greece` (150/mo, KD 54, commercial/local, local pack).
- `hosting` (700/mo, KD 50, commercial/local, AI Overview).
- `domain name` (1,200/mo, KD 75, informational, paid + questions).

**SERP & intent notes**

- Mix of comparison and transactional intent: users compare providers, ask “τι είναι” questions, and seek recommendations.

**Recommended target pages (content‑only)**

- GR blog guide: `/blog/web-hosting-guide-greece` explaining types of hosting, how to choose, and SEO implications.
- Glossary entries: `/glossary/web-hosting`, `/glossary/domain-name` with clear definitions and FAQs.

**H1/title angles**

- GR blog: `Τι είναι Web Hosting και πώς επηρεάζει το SEO`.
- GR glossary: `Domain Name (Όνομα Χώρου): Οδηγός για αρχάριους`.

**Content gaps**

- No structured glossary or blog posts about hosting/domains currently; these should be added as off‑core, non‑service content.
- Internally mark all hosting/domain content as “off‑core” so sales doesn’t promise standalone hosting services.

---

### C5 — Local SEO by city

**Example keywords**

- `seo θεσσαλονικη` (100/mo, commercial/local).
- Other city modifiers: `seo κρητη`, `seo ηρακλειο`, `seo ρεθυμνο`, `seo χανια`, `seo κως`, `seo κορινθος`, `seo σερρες`, `seo λαμια`, `seo καβαλα` (GSC shows combined ~700+ impressions).

**SERP & intent notes**

- Strong local intent: users are looking for an SEO specialist in their city.
- SERPs are dominated by local packs, maps, and local businesses.

**Recommended target pages**

- GR programmatic local SEO pages: `/gr/services/local-seo/[location]` for all major cities; ensure `locations.ts` includes all relevant cities.
- EN counterparts: `/services/local-seo/[location]` where EN demand exists.

**H1/title angles**

- GR: `Local SEO στην [Πόλη]: Φέρνουμε πελάτες από την Google`.

**Content gaps**

- Missing pages for several cities; existing pages may not explicitly mention “Local SEO” and “Google My Business” optimization.
- Need localized case studies and examples per city (even if fictionalized around archetypal businesses).

---

### C6 — AEO / AI visibility / GEO

**Example keywords**

- `aeo` (150/mo, KD 0, info/branded, AI Overview).
- Related concepts: “answer engine optimization”, “AI SEO”, “voice SEO για eshop”, “GEO” (generative engine optimization).

**SERP & intent notes**

- Mostly informational and branded: users want to understand AEO and AI‑driven search, not yet buy a service.
- AI Overview is strongly present; this is a thought‑leadership opportunity.

**Recommended target pages**

- Service page: `/services/ai-visibility` focusing on AEO, AI Overviews, LLM citations, and GEO.
- Blog pillars: `pillar-ai-llm-visibility`, `llm-citations-brand-visibility`, `geo-aeo-ellada` as deep‑dive articles.

**H1/title angles**

- GR: `Answer Engine Optimization (AEO) & AI Visibility για Ελληνικές επιχειρήσεις`.

**Content gaps**

- Need explicit targeting of AEO and AI Overview queries in GR, with definitions, diagrams, and case studies.
- Connect AEO content to SEO and content marketing hubs via internal links.

---

### C7 — Google Ads & SEO vs Ads (off‑core)

**Example keywords**

- `google ads` (14,000/mo, KD 80, commercial/branded, question + video).
- `google ads τι ειναι` (200/mo, informational).
- `seo vs google ads` (1,700 global, comparison).

**SERP & intent notes**

- Strong question and comparison patterns: users want to understand the difference between SEO and Ads, and when to use each.
- Many SERPs include explainer videos and comparison articles.

**Recommended target pages**

- GR comparison blog: `/blog/seo-vs-google-ads-ellada`.
- Optional service‑adjacent page: `/services/google-ads-consulting` if you decide to offer Ads consulting.

**H1/title angles**

- GR: `SEO vs Google Ads: Τι ταιριάζει στην επιχείρησή σου;`.

**Content gaps**

- No structured comparison content currently; this is an off‑core content opportunity.
- Ensure the page clearly states whether Ads management is offered, or if the focus is advisory/education only.

---

### C8 — Chatbots / AI for business (off‑core)

**Example keywords**

- `chatbot τι ειναι` (400/mo, informational).
- Longer‑tail: `chatbot για επιχειρησεις`, `chatbot για ενοικιαζομενα`, `chatbot για υποστηριξη πελατων` (visible in GSC).

**SERP & intent notes**

- Informational + early commercial: users explore chatbots as a solution and look for examples.

**Recommended target pages**

- GR blog: `/blog/chatbot-gia-epicheiriseis` with case studies for tourism, rentals, and service businesses.
- Optional solution page: `/solutions/chatbot` if productized later.

**H1/title angles**

- GR: `Chatbot για επιχειρήσεις: Πώς δουλεύει και τι κερδίζεις`.

**Content gaps**

- No dedicated content currently; this cluster is off‑core and should be clearly marked as such internally.
- Opportunity to cross‑link with AEO/AI visibility content.

---

### C9 — Vertical / industry SEO

**Example keywords**

- `seo για τουριστικες επιχειρησεις`.
- `κατασκευη ιατρικων ιστοσελιδων`.
- `seo εστιαση`, `seo οικιακες υπηρεσιες`.

**SERP & intent notes**

- Highly commercial and niche: users look for specialists with industry expertise, not generic SEO agencies.

**Recommended target pages**

- GR solutions pages: `/solutions/tourism-seo`, `/solutions/medical-websites`, `/solutions/hospitality-seo`, `/solutions/home-services-seo`.

**H1/title angles**

- GR: `SEO για Τουριστικές Επιχειρήσεις` and similar vertical‑specific titles.

**Content gaps**

- Some solutions pages may exist; others need to be created and linked from hubs and blogs.
- Each vertical page should include industry‑specific FAQs and examples.

---

### C10 — English head terms

**Example keywords**

- `seo services`, `seo agencies`, `modern web design`, `web development`, `web development agency`, `website design near me`.

**SERP & intent notes**

- Commercial intent with global competition; these queries are lower volume in GR but important for international visibility and credibility.

**Recommended target pages**

- EN services: `/services/*` (SEO, local SEO, website creation, AI visibility).
- EN locations: `/locations` and `/services/[service]/[location]`.

**H1/title angles**

- EN: `SEO Services for European SMEs`, `Modern Web Design & Development Agency`.

**Content gaps**

- Need better hreflang pairing and internal links between EN and GR versions.
- Make sure EN content reflects the same service structure and clusters as GR.

---

## 5. People Also Ask (PAA)

PAA‑style question keywords in Greek are central because they almost all trigger AI Overviews and sitelinks, making them powerful AEO fuel. The table below shows representative questions, answer angles, and target pages.

| Question keyword | Short answer angle | Target page |
|---|---|---|
| `seo τι είναι` / `τι ειναι seo` | Define SEO in 2–3 sentences, then list main benefits for Greek SMEs. | `/gr/services/seo-audits` + `/glossary/seo` |
| `seo πως λειτουργει` | Explain crawling, indexing, ranking, on/off‑page SEO in plain Greek. | `/blog/seo-basics-gr` |
| `ποσο κοστιζει το seo` | Provide price ranges and factors that influence cost (competition, pages, languages). | `/gr/services/seo-audits` |
| `google ads τι ειναι` | Define Google Ads, campaign types, and when to use Ads vs SEO. | `/blog/seo-vs-google-ads-ellada` |
| `seo vs google ads` | Comparison table: pros/cons, time to results, cost structure. | `/blog/seo-vs-google-ads-ellada` |
| `chatbot τι ειναι` | Simple explanation of chatbots and use cases in tourism and services. | `/blog/chatbot-gia-epicheiriseis` |
| `δημιουργια eshop τι χρειαζεται` | Checklist: domain, hosting, platform, design, SEO, payments, logistics. | `/gr/services/eshop-creation` |
| `ποσο κοστιζει ενα eshop` | Price ranges for basic vs advanced e‑shops, plus ongoing costs. | `/gr/services/eshop-creation` |
| `domain name τι ειναι` | Define domain names, extensions (.gr, .com), and SEO relevance. | `/glossary/domain-name` |
| `hosting τι ειναι` | Define hosting, types (shared/VPS/cloud), and impact on speed/SEO. | `/glossary/web-hosting` |
| `ποιο web hosting να διαλεξω` | Decision framework: budget, performance, support, location, SEO factors. | `/blog/web-hosting-guide-greece` |
| `πως συνεργαζονται seo και adwords` | Explain integrated strategy: use Ads for quick wins and SEO for long‑term. | `/blog/seo-vs-google-ads-ellada` |

These questions should be implemented as FAQ schema on relevant pages (service, blog, glossary) using your existing FAQ components and schema helpers during execution.

## 6. Query fan‑out (AI Mode / AI Overviews)

Generative engines and AI Overviews expand head queries into trees of subquestions; structuring content around these trees increases the chance of being chosen as a cited source.

### Fan‑out for `κατασκευη eshop`

Likely subtopics:

- **Cost** — “πόσο κοστιζει ενα e‑shop;” with breakdown by features, product count, integrations.
- **Platform choice** — WooCommerce vs Shopify vs custom; pros/cons and recommendations for Greek SMEs.
- **Timeline** — “πόσο χρόνο χρειάζεται” for design, development, and launch.
- **Requirements** — “τι χρειάζεται” (domain, hosting, SSL, content, product photos, payment gateway, logistics).
- **SEO** — “SEO για e‑shop” basics (category structure, filters, page speed, structured data).
- **Legal/tax** — invoices, GDPR, cookie consent, with high‑level guidance and external links.

Structured sections on the new e‑shop service page should mirror this tree so a conversational query like “θέλω e‑shop, πόσο κοστίζει και τι χρειάζεται;” finds a single page that covers all angles.

### Fan‑out for `seo υπηρεσιες`

Likely subtopics:

- What is SEO: definitions and basic explanation.
- Types of SEO: on‑page, technical, off‑page, local SEO.
- Pricing: packages, retainers vs projects, typical budgets for Greek SMEs.
- Process: audit, strategy, implementation, reporting.
- Results: timelines and case studies.

### Fan‑out for `web hosting`

Likely subtopics:

- What is hosting and why it matters.
- Types of hosting: shared, VPS, dedicated, cloud.
- How hosting affects SEO: speed, uptime, location.
- How to choose hosting in Greece.

You can use similar trees for local SEO queries, AEO/AI visibility, and vertical SEO pages to guide section structure.

## 7. FAQ bank

The FAQ bank for this project is maintained as a separate Markdown file (`faq-aeo-bank.md`) and should be used as the source of truth for all FAQ implementations. In execution, FAQs will be plugged into:

- Home page FAQs: `src/data/home-faq-data.ts`, rendered via your `FAQSection` component.[cite:8]
- Service pages: dedicated FAQ sections per service (SEO, local SEO, website creation, e‑shop, AI visibility).
- Blog posts and glossary: contextual FAQ blocks at the bottom of articles.

Each FAQ entry in the bank includes:

- Question (GR or EN).
- Short answer (2–4 sentences, conversational).
- Target page(s) where it should appear.
- Schema type (FAQPage, Article, Service, LocalBusiness) to be applied via your schema helpers.

By centralizing FAQs, you avoid duplication and ensure that AEO‑relevant questions are consistently answered across the site.

## 8. AEO / ChatGPT / LLM optimization

Many informational queries in the Greek market already trigger AI Overviews and sitelinks, so content should be designed **answer‑first** rather than **story‑first**:

- Open each section with a direct, concise answer in 1–3 sentences.
- Follow with structured expansions (lists, tables, examples) that LLMs can easily parse and cite.

Conversational query patterns (“τι είναι”, “πώς λειτουργεί”, “πόσο κοστίζει”, “ποιο να διαλέξω”, “SEO vs Google Ads”) should appear in headings and copy, not just in FAQ blocks. For example, a section titled `Πόσο κοστίζει το SEO στην Ελλάδα;` followed by a clear explanation and a table of price ranges is more likely to be selected by AI Overview and ChatGPT‑style answers than a vague “Τιμοκατάλογος” section.

Content formats that LLMs favor include:

- Definition blocks (“Τι είναι X” / “What is X”) at the top of glossary and service pages.
- Comparison tables for “vs” queries (SEO vs Ads, hosting providers, platforms).
- Checklists and bullet lists for “τι χρειάζεται” queries.

Existing blogs such as `llm-citations-brand-visibility` and `pillar-ai-llm-visibility` should be explicitly connected to AEO queries via internal links and updated headings so they serve as EN/GR thought‑leadership pillars for AI visibility.

## 9. Citations & entity strategy

Entity coverage is critical both for classic SEO and for AEO/LLM citations. Across service, blog, and glossary pages, content should systematically mention and explain:

- Digital marketing.
- Τεχνητή νοημοσύνη (artificial intelligence).
- Social media.
- Keyword research.
- Μηχανές αναζήτησης (search engines).
- Λέξεις κλειδιά (keywords).
- On‑page SEO, technical SEO, off‑page SEO.
- Answer engine optimization (AEO).

Recommended glossary additions at `/glossary`:

- New entries: “Digital Marketing”, “Τεχνητή Νοημοσύνη”, “Social Media Marketing”, “Keyword Research”, “Local SEO”, “Technical SEO”, “Answer Engine Optimization”.
- Expanded entries: “SEO”, “Domain Name”, “Web Hosting” with FAQs and AEO‑style definitions.

External sources worth citing on key pages:

- Google Search Central documentation for SEO fundamentals.
- Official Google Ads docs for Ads vs SEO explanations.
- Ahrefs (or similar) for definitions of KD, search volume, SERP features.

Schema as citation:

- Use `FAQPage`, `Article`, `Service`, `LocalBusiness`, and `BreadcrumbList` schema types to make content machine‑readable.
- Ensure each major page has consistent `Organization`/`Website` schema and that FAQs are wired via your existing schema utilities.

## 10. Internal linking plan

Use your hub‑spoke system (as defined in `src/lib/linking/hub-spoke.ts`) to connect clusters to thematic hubs:

- **SEO Fundamentals hub** — glossary and basic SEO blogs; anchors like “τι είναι SEO”, “βασικές αρχές SEO”.
- **Website SEO hub** — web design by city pages and e‑shop content; anchors like “SEO για ιστοσελίδες”.
- **AI SEO hub** — AEO and AI visibility pages; anchors like “Answer Engine Optimization”, “AI SEO”.
- **Technical SEO hub** — hosting and technical SEO sections; anchors like “τεχνικό SEO”, “ταχύτητα ιστοσελίδας”.
- **SEO Tools hub** — keyword research and analytics content; anchors like “εργαλεία SEO”, “keyword research tools”.
- **Traffic Growth hub** — Ads and chatbot content; anchors like “αύξηση επισκεψιμότητας”, “περισσότεροι πελάτες από την Google”.

The Greek `/gr/locations` hub should act as the entry point for all city‑based service pages, with internal links from the home page and `/gr/services`. Each location page should link back to relevant service pillars (SEO services, website creation, local SEO) and cross‑link between EN and GR via hreflang.

Anchor text strategy:

- Use exact or near‑exact keyword phrases where possible (e.g. “Κατασκευή Ιστοσελίδων Αθήνα”, “SEO Θεσσαλονίκη”).
- Mix entity‑based anchors (“τεχνικό SEO”, “web hosting”, “digital marketing”) to strengthen topical clusters.

## 11. Page‑by‑page action map

Execution will rely on `master-keyword-list.csv`, mapping each keyword to a target URL, file path, page status, and priority. At a high level:

- **Existing pages (P0/P1)** — optimize copy, headings, FAQs, and internal links for queries already ranking between positions 6–20 in GSC (e.g. `seo υπηρεσιες`, `προωθηση ιστοσελιδων τιμη`, `κατασκευη ιστοσελιδων αθηνα`, local SEO queries for Ρέθυμνο).
- **City expansion (P1)** — add missing Greek cities to `src/data/locations.ts` and generate corresponding `/gr/services/*/[location]` pages.[cite:8]
- **New e‑shop service (P2)** — create `/gr/services/eshop-creation` (and EN counterpart) structured around the fan‑out tree for `κατασκευη eshop`.
- **AEO/AI content (P2)** — align `/services/ai-visibility` and AI blogs with AEO queries in GR.
- **Off‑core content (P3)** — add hosting/domains, Ads comparison, and chatbot guides as blog and glossary entries.

Each CSV row tracks: `keyword, language, cluster, monthly_volume_gr, difficulty, intent, serp_features, current_gsc_position, current_impressions, target_url, target_file, page_status (exists/gap/new), priority (P0–P3)`.

## 12. Prioritized roadmap

Based on demand, competition, and ease of implementation:

- **P0 quick wins** — improve existing pages already near page 1 (positions 6–20) and add FAQ schema for high‑value questions (SEO services, web design Athens/Thessaloniki, local SEO in existing cities).
- **P1 city expansion** — add missing Greek cities to `locations.ts`, generate local SEO and web design pages, and connect them via `/gr/locations`.
- **P2 e‑shop + AEO content** — launch e‑shop/WooCommerce service pages and strengthen AEO/AI visibility content and FAQs.
- **P3 off‑core topics** — publish hosting/domain guides, Google Ads vs SEO comparison, and chatbot articles; clearly mark them as content, not primary services.

Roadmap items will be tied to specific keyword clusters and pages via the CSV map, making it straightforward to execute changes page‑by‑page.

## 13. Appendix

`master-keyword-list.csv` is the quantitative backbone: it enumerates all keywords from GSC and Ahrefs with metrics and mappings. This Markdown document focuses on qualitative strategy; the CSV handles granular execution data.

**Glossary additions**

- Add entries for: Digital Marketing, Τεχνητή Νοημοσύνη, Social Media Marketing, Keyword Research, Local SEO, Technical SEO, Answer Engine Optimization.
- Expand: SEO, Domain Name, Web Hosting with richer definitions and FAQs.

**Greek spelling and accent variants**

- Queries often appear with and without accents (e.g. `κατασκευη ιστοσελιδων θεσσαλονικη` vs `κατασκευή ιστοσελίδων Θεσσαλονίκη`).
- All variants should map to a single canonical URL per topic/city; canonicalization is handled by the router and content strategy, not by creating duplicate pages.
