# Ahrefs keyword research: anotherseoguru.com + GSC Boost

- **Data date:** 2026-10-14 (Ahrefs Keywords Explorer / Site Explorer / SERP Overview, pulled 2026-10-14)
- **Countries:** GR (Greek and English queries), US, GB
- **Companion file:** `docs/keyword-research/2026-10-14-master-keywords.csv`. It has 2,180 rows: 2,010 ahrefs-ke, 165 fanout and 5 ahrefs-se. Priorities are P0 246, P1 759 and P2 1,175. Status is existing 1,686 and gap 494.
- **Volumes:** these are Ahrefs monthly search volume estimates. A blank cell means Ahrefs has no volume, so none was invented. "KD" is Ahrefs Keyword Difficulty, where blank means not computed.
- **API usage:** about 126k Ahrefs API-key units this session (key: about 126.3k of 200k used; workspace: 370k of 800k).
- **Status column:**
  - `existing` means a live URL in the repo already targets the keyword.
  - `GAP:` means a new page or post is proposed.
- **Priority:**
  - P0 means do now: high volume or commercial intent, and it fits the business.
  - P1 means next.
  - P2 means long tail or nice to have.

## 0. Data sources and caveats

1. **The Ahrefs GSC integration is stale.** Project 10503889 returns "No GSC data available" for 2026-07-14 onward. Its history only has data for Sep–Nov 2025 (Oct 2025: 19 clicks / 94 impressions). **Action: reconnect Search Console in Ahrefs.** Because of this, the CSV has no `ahrefs-gsc` rows.
   - GSC reality below therefore comes from the repo's own GSC exports: `src/data/gsc-pages.ts` (top 1,000 pages, exported 2026-08-19) and `docs/keyword-research/gsc-baseline-2026-08-04.md`.
2. **Site Explorer is close to empty.** anotherseoguru.com has only 5 organic keywords in Ahrefs. The automatic "organic competitors" for GR (ahrefs, moz, semrush, wikipedia, wordstream) share 0 keywords, so they are not useful. Real competitors were taken from SERP Overview on the money keywords instead (section 2).
3. **AI Overviews are now the norm.** Among rows with volume ≥10 and SERP data, an AI Overview appears on GR 59/109, US 368/491 and GB 33/38. Every P0 page should therefore have:
   - an answer-first intro (40–60 words)
   - FAQ blocks with schema
   - concrete numbers such as prices, timelines and case results, which AIO tends to cite

## 1. GSC reality (export 2026-08-19, top 1,000 pages)

- **Totals:** 32,004 impressions, 93 clicks (CTR 0.29%).
  - `/el`: 10,615 impressions / 24 clicks across 321 pages
  - `/en`: 9,394 / 7 across 497 pages
  - unprefixed legacy URLs: 11,995 / 62 across 182 pages
  - US/AU/CA pSEO pages: about 6.1k impressions
- **Homepage:** 8,438 impressions at average position 32.1. It ranks for brand and broad "seo agency" queries but sits on page 3–4.

**Zero-click pages with high impressions (CTR / title problems):**

| Page | Impr. | Pos | Note |
|---|---:|---:|---|
| /el/blog/kataskevi-eshop-odigos | 1,249 | 31 | Title lacks "τιμές/κόστος" (κατασκευη eshop τιμες 200) |
| /en/platform/features/semantic-keyword-clustering | 963 | 20.9 | Now 301 → /en/platform/features#keywords. Keep the anchor section rich |
| /el/blog/poso-kostizei-mia-istoselida | 837 | 65 | Needs "τιμές κατασκευής" in the title and more depth |
| /compare/semrush | 325 | 43 | Reframe as "Semrush alternative" |
| /el/solutions/hotels/website-creation | 290 | 66.6 | Generic title. Target "κατασκευή ιστοσελίδων για ξενοδοχεία" (200, KD1) |
| /el/services/website-creation/thessaloniki-gr | 262 | 66.7 | Thin city page (300 vol, KD48) |
| /el/services/local-seo/thessaloniki-gr | 246 | 17.5 | Striking distance |
| /el/services/website-creation/athens-gr | 225 | 47 | 350 vol, KD47 |

**Striking distance (pos 4–20):**
- /el/services/local-seo/mykonos-gr 4.9
- /el/blog/seo-gia-akinita 8.3
- /el/work/rentacar-sifnos 9.2
- /el/blog/geo-agency-ellada 11.5. This now redirects to /el/services/ai-visibility, so make sure that page carries "GEO agency Ελλάδα".
- /el/services/website-creation/santorini-gr 13.8
- /el/blog/seo-gia-estiatoria 16.5
- /el/services/local-seo/thessaloniki-gr 17.5
- /el/blog/seo-gia-xenodoxeia 19.5

## 2. Site Explorer and real competitors (SERP Overview, GR)

- **υπηρεσίες seo:** advision.gr, visualrow, tool.gr, notthesame, xo.gr, designous, tryseo, iservices
- **κατασκευή ιστοσελίδων:** netstudio, cactusweb, simplewebsolutions, makemyweb, seo1, webex, nextlevelweb, webnode
- **κατασκευή ιστοσελίδων ξενοδοχείων:** abouthotelier, hotelbranding, iark, cactusweb, artious, hotelwize, iframe, 3ds
- **google search console alternative (US):** winners have DR 0–31 (ivanhoe.pro, rankcaddy, sneo, visen, searchoptimo, plus reddit/capterra). This SERP is beatable.
- **seo company greece (US, KD1):** clutch, saltydigital, techbehemoths, thatware, designrush, onmarketing, themanifest. Mostly directories, so a listing on Clutch/DesignRush also helps.

## Executive summary: top 15 actions

| # | Action | Justifying keywords (vol, KD) | Pri |
|---|---|---|---|
| 1 | **Reconnect GSC in Ahrefs** (project 10503889) and re-pull query data | No GSC data since 2025-11 | P0 |
| 2 | Retitle and expand `/compare/semrush` and `/compare/ahrefs` for **"alternative"** intent. Add pricing tables and a "who should switch" section | semrush alternative 3,000/KD13; ahrefs alternatives 3,300/KD0; best semrush alternative 900 | P0 |
| 3 | Rewrite the **AI visibility service** title/H1 to "AI SEO agency / GEO / AEO services" (EN + EL) | ai seo agency 3,800/KD19 (GB 2,000/KD7); generative engine optimization services 3,100/KD9; aeo agency 1,900/KD3 | P0 |
| 4 | Build `/en/platform/ai-visibility-tracker` (product landing) and `/en/blog/best-ai-visibility-tools` (listicle that includes GSC Boost) | ai visibility tool 4,100; best ai visibility tools 2,000/KD4; ai visibility checker 1,600/KD2; ai overview tracker 1,200/KD2 | P0 |
| 5 | Publish `/en/blog/how-to-get-recommended-by-chatgpt` | how to rank in chatgpt 900/KD5; …search 500; how to get cited by chatgpt 400 | P0 |
| 6 | Build `/en/compare/google-search-console-alternatives` (weak SERP, DR 0–31) | google search console alternative 150/KD0; gsc dashboard 200; reporting 200 | P0 |
| 7 | CTR rewrites of the EL cost posts (eshop, website and SEO cost) | κατασκευη eshop τιμες 200; κόστος seo 700; τιμές seo 800; κατασκευη ιστοσελιδων τιμη 200 | P0 |
| 8 | Retitle and deepen `/el/solutions/hotels/website-creation` | κατασκευή ιστοσελίδων για ξενοδοχεία 200/KD1; …ξενοδοχείων 150/KD0; booking engine ξενοδοχείου 70 | P0 |
| 9 | Fix the local-seo and website-creation city templates. Push Thessaloniki and Athens with unique content, and add Patras and Kalamata depth | κατασκευή ιστοσελίδων αθήνα 350; θεσσαλονίκη 300; πατρα 200/KD25; καλαμάτα 150; seo αθηνα 200 | P0 |
| 10 | Retitle the iPhone page around **"SEO app for iPhone"** | seo app 1,800/KD22; seo iphone app 150; seo apps for iphone 100 | P1 |
| 11 | Build the EN `/en/solutions/tourism-seo` hub (hotels, tour operators, villas, car rental) | travel seo 1,600/KD11; hotel seo 1,000/KD0; seo for tour operators 450; vacation rental seo 300 | P1 |
| 12 | Publish `/en/blog/llms-txt-guide`, which ties into the GEO service | llms.txt 2,500/KD0 | P1 |
| 13 | Write `/en/blog/ahrefs-vs-semrush-vs-search-console` | ahrefs vs semrush 3,500/KD21 | P1 |
| 14 | Build the `/en/platform/rank-tracker` landing (GSC-based free rank tracking) | free rank tracker 5,800/KD18 | P1 |
| 15 | Publish `/el/blog/kostos-google-ads` (Google Ads cost for eshops; it supports the eshop funnel) | κόστος διαφήμισης στη google για eshop 600 | P1 |

Also:
- Make `/en/seo-services` an explicit "SEO agency Greece" page, since seo company greece is 200/KD1.
- List the agency on Clutch, DesignRush and TechBehemoths.
- Check that the US/AU/CA pSEO pages are intended to be indexed (about 6.1k impressions, 0 clicks).

## 3–4. Topic tables (top rows by volume; the full set is in the CSV)

SERP column: **AIO** means an AI Overview is present, and PAA means People Also Ask.

### 3a. Greek: SEO services, agency, prices, consultant

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| τιμές seo | GR | 800 |  | info/comm | - | `/el/pricing` | existing | P0 |
| κόστος seo | GR | 700 |  | info/comm | - | `/el/blog/poso-kostizei-to-seo` | existing | P0 |
| seo agency | GR | 500 | 0 | info/comm/local | local_pack | `/el` | existing | P0 |
| υπηρεσίες seo | GR | 450 | 0 | info/comm/local | **AIO**, sitelink | `/el/seo-services` | existing | P0 |
| προώθηση ιστοσελίδων | GR | 350 | 0 | info/comm | sitelink | `/el/seo-services` | existing | P0 |
| εταιρεια seo | GR | 300 | 0 | comm/local | **AIO** | `/el` | existing | P0 |
| προωθηση ιστοσελιδων | GR | 300 | 0 | comm/local | snippet, local_pack | `/el/seo-services` | existing | P0 |
| seo κόστος | GR | 200 |  | info/comm | - | `/el/blog/poso-kostizei-to-seo` | existing | P0 |
| seo optimization agency | GR | 200 |  | info/comm/local | - | `/el` | existing | P0 |
| προώθηση ιστοσελίδων seo | GR | 200 | 0 | info/comm/local | local_pack, sitelink | `/el/seo-services` | existing | P0 |
| seo specialist | GR | 200 | 0 | info/comm | **AIO**, sitelink, video | `/el/symvoulos-seo` | existing | P0 |
| seo agency greece | GR | 150 |  | info/comm/local | - | `/el` | existing | P0 |
| seo digital agency | GR | 150 |  | info/comm/local | - | `/el` | existing | P0 |
| seo digital marketing agency | GR | 150 |  | info/comm/local | - | `/el` | existing | P0 |
| seo consultant | GR | 150 | 14 | info/comm/local | video | `/el/symvoulos-seo` | existing | P0 |
| seo greece | GR | 150 | 0 | comm | **AIO** | `/el` | existing | P0 |
| seo expert | GR | 100 | 49 | info/comm | **AIO**, PAA | `/el/symvoulos-seo` | existing | P0 |
| seo web agency | GR | 100 |  | info/comm/local | - | `/el` | existing | P0 |
| seo υπηρεσίες | GR | 100 |  | info/comm/local | - | `/el/seo-services` | existing | P0 |
| seo optimisation agency | GR | 100 |  | info/comm/local | - | `/el` | existing | P0 |

### 3b. Greek: website creation (general and pricing)

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| κατασκευή ιστοσελίδων | GR | 1100 | 55 | info/comm/local | video | `/el/services/website-creation` | existing | P0 |
| κατασκευή ιστοσελίδας | GR | 1100 | 0 | info/comm/local | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων | GR | 600 | 54 | info/comm/trans/local | - | `/el/services/website-creation` | existing | P0 |
| δημιουργία ιστοσελίδας | GR | 600 | 13 | info/comm/trans/local | - | `/el/services/website-creation` | existing | P0 |
| web design | GR | 450 | 61 | info/comm/local | local_pack, sitelink | `/el/services/website-creation` | existing | P1 |
| σχεδιασμός ιστοσελίδων | GR | 200 | 37 | info/comm/trans/local | local_pack | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων τιμη | GR | 200 |  | info/comm/local | - | `/el/pricing` | existing | P0 |
| κατασκευή ιστοσελίδων wordpress | GR | 200 | 1 | info/comm/local/brand | **AIO** | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων πακετα | GR | 200 | 0 | info/comm/local | - | `/el/pricing` | existing | P0 |
| κατασκευή ιστοσελίδας με wordpress | GR | 150 |  | info/comm/brand | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων τιμες | GR | 150 | 0 | info/comm/local | **AIO** | `/el/pricing` | existing | P0 |
| κατασκευή ιστοσελίδων τιμές | GR | 150 |  | info/comm/local | - | `/el/pricing` | existing | P0 |
| κατασκευή δυναμικών ιστοσελίδων | GR | 100 |  | info/comm | - | `/el/services/website-creation` | existing | P0 |
| web design agency websites | GR | 100 |  | info/comm/local | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων προσφορα | GR | 100 |  | info/comm/trans/local | - | `/el/pricing` | existing | P0 |
| κατασκευή ιστοσελίδων παρουσίασης | GR | 100 |  | info/comm | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων μαρούσι | GR | 100 |  | info/comm/local | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων χαλανδρι | GR | 100 |  | info/comm/local | - | `/el/services/website-creation` | existing | P0 |
| κατασκευή site | GR | 100 | 0 | info/comm | - | `/el/services/website-creation` | existing | P0 |
| κατασκευη ιστοσελιδων για μεσιτεσ | GR | 100 |  | info/comm/local | - | `/el/solutions/real-estate/website-creation` | existing | P1 |

### 3c. Greek: website creation by city

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| κατασκευή ιστοσελίδων αθήνα | GR | 350 | 47 | info/comm/local | local_pack | `/el/services/website-creation/athens-gr` | existing | P0 |
| κατασκευή ιστοσελίδων θεσσαλονίκη | GR | 300 | 48 | info/comm/local | - | `/el/services/website-creation/thessaloniki-gr` | existing | P0 |
| κατασκευη ιστοσελιδων πατρα | GR | 200 | 25 | info/comm/local | local_pack | `/el/services/website-creation/patras-gr` | existing | P0 |
| κατασκευη ιστοσελιδων θεσσαλονικη | GR | 200 | 50 | info/comm/local | local_pack | `/el/services/website-creation/thessaloniki-gr` | existing | P0 |
| κατασκευή ιστοσελίδας καλαμάτα | GR | 150 |  | info/comm/local | - | `/el/services/website-creation/kalamata-gr` | existing | P0 |
| κατασκευή ιστοσελίδων καλαμάτα | GR | 150 | 52 | info/comm/local | local_pack | `/el/services/website-creation/kalamata-gr` | existing | P0 |
| κατασκευή ιστοσελίδων θεσσαλονίκη τιμεσ | GR | 150 |  | info/comm/local | - | `/el/services/website-creation/thessaloniki-gr` | existing | P0 |
| κατασκευή site ηράκλειο κρήτης | GR | 150 | 58 | info/comm/local | local_pack | `/el/services/website-creation/heraklion-gr` | existing | P1 |
| κατασκευη ιστοσελιδων ηρακλειο | GR | 100 | 56 | info/comm/local/brand | local_pack | `/el/services/website-creation/heraklion-gr` | existing | P1 |
| κατασκευή ιστοσελίδων ηράκλειο κρήτης | GR | 100 | 67 | info/comm/local | - | `/el/services/website-creation/heraklion-gr` | existing | P1 |
| web design ηράκλειο κρήτης | GR | 100 | 62 | info/comm/local | - | `/el/services/website-creation/heraklion-gr` | existing | P1 |
| κατασκευη ιστοσελιδων καλαματα | GR | 90 | 52 | info/comm/local | local_pack | `/el/services/website-creation/kalamata-gr` | existing | P1 |
| κατασκευή ιστοσελίδων κρήτη | GR | 90 | 33 | info/comm/local | - | `/el/services/website-creation/crete-gr` | existing | P1 |
| κατασκευη ιστοσελιδων κερκυρα | GR | 90 |  |  | - | `/el/services/website-creation/corfu-gr` | existing | P1 |
| κατασκευη ιστοσελιδων αθηνα | GR | 80 | 0 | info/comm/local | local_pack | `/el/services/website-creation/athens-gr` | existing | P1 |
| κατασκευή ιστοσελίδων πάτρα | GR | 80 | 17 | info/comm/local | - | `/el/services/website-creation/patras-gr` | existing | P1 |
| web design κερκυρα | GR | 80 |  | info/comm/local | - | `/el/services/website-creation/corfu-gr` | existing | P1 |
| κατασκευη ιστοσελιδων περιστερι | GR | 70 |  |  | - | `/el/services/website-creation/peristeri` | gap | P1 |
| κατασκευή ιστοσελίδων λάρισα | GR | 60 |  | info/comm/local | - | `/el/services/website-creation/larissa-gr` | existing | P1 |
| κατασκευή ιστοσελίδων ηράκλειο | GR | 60 | 39 | info/comm/local | local_pack | `/el/services/website-creation/heraklion-gr` | existing | P1 |

### 3d. Greek: eshop / WooCommerce

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| woocommerce | GR | 1600 | 65 | info/comm/nav/brand | sitelink, **AIO**, PAA | `/el/services/eshop-woocommerce` | existing | P1 |
| κατασκευη eshop | GR | 700 | 13 | info/comm/trans/local | paid_top | `/el/services/eshop-woocommerce` | existing | P0 |
| κόστος διαφήμισης στη google για eshop | GR | 600 |  | info/comm/brand | - | `/el/blog/kostos-google-ads` | gap | P1 |
| δημιουργία eshop | GR | 300 | 4 | info/comm/trans | **AIO** | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop θεσσαλονικη | GR | 300 | 0 | info/comm/local | - | `/el/services/eshop-woocommerce/thessaloniki-gr` | existing | P0 |
| κατασκευή eshop wordpress | GR | 250 |  | info/comm/brand | - | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop μονος μου | GR | 200 | 0 | info/comm/trans/brand | **AIO** | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευή woocommerce | GR | 200 |  | info/comm/brand | - | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop τιμες | GR | 200 | 1 | info/comm/trans | **AIO** | `/el/blog/kataskevi-eshop-odigos` | existing | P0 |
| shopify greece | GR | 200 | 0 | info/comm/nav/brand | sitelink, **AIO** | `/el/blog/shopify-vs-woocommerce` | gap | P1 |
| κατασκευή eshop με σύνδεση erp | GR | 200 |  | info/comm | - | `/el/blog/woocommerce-odigos-rythmiseon` | gap | P1 |
| κατασκευή ιστοσελίδων eshop | GR | 150 |  | info/comm | - | `/el/services/eshop-woocommerce` | existing | P0 |
| woocommerce τι ειναι | GR | 150 | 0 | info/comm/brand | **AIO**, video | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop μονοσ μου | GR | 150 | 0 | info/comm | paid_top, **AIO**, video | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευή eshop woocommerce | GR | 150 |  | info/comm/trans/brand | - | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευή eshop τιμέσ | GR | 150 | 5 | info/comm | **AIO** | `/el/blog/kataskevi-eshop-odigos` | existing | P0 |
| eshop κατασκευη | GR | 150 | 6 | info/comm/trans/local | video | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop προσφορα | GR | 150 |  | info/comm/trans | - | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop φαρμακειου | GR | 150 |  | info/comm/trans | - | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop b2b | GR | 150 |  | info/comm/trans | - | `/el/services/eshop-woocommerce` | existing | P0 |

### 3e. Greek: hotels, tourism, rent a car, villas

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| κατασκευή ιστοσελίδων για ξενοδοχεία | GR | 200 | 1 | info/comm/local | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| digital marketing για ξενοδοχεια | GR | 200 |  | comm | - | `/el/solutions/hotels` | existing | P0 |
| κατασκευή ιστοσελίδων ξενοδοχείων | GR | 150 | 0 | info/comm/trans/local | local_pack | `/el/solutions/hotels/website-creation` | existing | P0 |
| κατασκευή ιστοσελίδας ξενοδοχείου | GR | 150 | 0 | info/comm/local | local_pack | `/el/solutions/hotels/website-creation` | existing | P0 |
| ιστοσελίδες ξενοδοχείων | GR | 150 | 49 | comm/trans | **AIO** | `/el/solutions/hotels/website-creation` | existing | P0 |
| ιστοσελίδα για ξενοδοχείο | GR | 150 |  | comm | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| ιστοσελίδες για ξενοδοχεία | GR | 150 | 52 | comm/trans | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| digital marketing για ξενοδοχεία | GR | 150 |  | comm | - | `/el/solutions/hotels` | existing | P0 |
| υπηρεσίες seo για ξενοδοχεία | GR | 100 |  | info/comm/local | - | `/el/blog/seo-gia-xenodoxeia` | existing | P0 |
| δημιουργία ιστοσελίδας για ξενοδοχεία | GR | 100 |  | info/comm | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| hotel web design | GR | 100 |  | info/comm | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| εταιρεία digital marketing για ξενοδοχεία | GR | 100 |  | comm/local | - | `/el/solutions/hotels` | existing | P0 |
| υπηρεσίες digital marketing για ξενοδοχεία | GR | 100 |  | comm/local | - | `/el/solutions/hotels` | existing | P0 |
| email marketing για ξενοδοχεία | GR | 100 |  |  | - | `/el/solutions/hotels` | existing | P0 |
| κατασκευη ιστοσελιδας ξενοδοχειου | GR | 100 |  | comm | - | `/el/solutions/hotels/website-creation` | existing | P0 |
| ψηφιακό μάρκετινγκ για ξενοδοχεία | GR | 100 |  | comm | - | `/el/solutions/hotels` | existing | P0 |
| booking rent a car | GR | 100 | 0 | nav/comm/trans/brand | paid_top, local_pack | `/el/solutions/rent-a-car` | existing | P1 |
| υπηρεσίες marketing για ξενοδοχεία | GR | 90 |  |  | - | `/el/solutions/hotels` | existing | P1 |
| ψηφιακο μαρκετινγκ για ξενοδοχεια | GR | 90 |  | comm | - | `/el/solutions/hotels` | existing | P1 |
| digital marketing ξενοδοχεια | GR | 90 |  |  | - | `/el/solutions/hotels` | existing | P1 |

### 3f. Greek: local SEO and Google Business Profile

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| google my business | GR | 5600 | 0 | comm/brand | **AIO**, PAA | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| google business profile | GR | 1800 | 81 | comm/trans/brand | sitelink | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| local seo κτηματομεσίτης | GR | 450 |  | comm/local | - | `/el/blog/seo-gia-akinita` | existing | P1 |
| κριτικες google | GR | 300 | 0 | comm/brand | **AIO** | `/el/blog/kritikes-google-odigos` | gap | P2 |
| seo αθηνα | GR | 200 |  | comm/local | - | `/el/services/local-seo/athens-gr` | existing | P0 |
| seo υπηρεσίες θεσσαλονίκη | GR | 150 |  | info/comm/local | - | `/el/services/local-seo/thessaloniki-gr` | existing | P0 |
| seo agency thessaloniki | GR | 150 |  | info/comm/local | - | `/el/services/local-seo/thessaloniki-gr` | existing | P0 |
| τοπικο seo | GR | 150 | 0 | comm | - | `/el/services/local-seo` | existing | P1 |
| google business profile ελληνικα | GR | 100 |  | info/brand | - | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| προώθηση ιστοσελίδων ηράκλειο κρήτης | GR | 90 | 42 | info/comm/local | - | `/el/services/local-seo/heraklion-gr` | existing | P1 |
| τοπικό seo και πως να το βελτιώσω | GR | 90 |  | info | - | `/el/blog/topiko-seo-kykladon` | existing | P2 |
| google business profile manager | GR | 90 | 76 | comm/brand | PAA, **AIO** | `/el/blog/epixeirisi-sto-google-maps` | existing | P2 |
| local seo | GR | 80 | 67 | comm | PAA, video | `/el/services/local-seo` | existing | P2 |
| τοπικό seo | GR | 70 |  | comm | - | `/el/services/local-seo` | existing | P2 |
| google my business κριτικεσ | GR | 70 |  | comm/brand | - | `/el/blog/epixeirisi-sto-google-maps` | existing | P2 |
| προώθηση ιστοσελίδων θεσσαλονίκη | GR | 60 |  | info/comm/local | - | `/el/services/local-seo/thessaloniki-gr` | existing | P1 |
| προώθηση ιστοσελίδων αθήνα | GR | 60 |  | info/comm/local | - | `/el/services/local-seo/athens-gr` | existing | P1 |
| seo θεσσαλονίκη | GR | 60 |  | comm/local | - | `/el/services/local-seo/thessaloniki-gr` | existing | P1 |
| local seo υπηρεσίες | GR | 50 | 0 | info/comm/local | - | `/el/services/local-seo` | existing | P2 |
| καταχώρηση στο google maps | GR | 50 |  | trans/brand | - | `/el/blog/epixeirisi-sto-google-maps` | existing | P2 |

### 3g. Greek: GEO / AEO / AI SEO

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| ai mode | GR | 3700 | 56 | info/brand | **AIO**, PAA | `/el/blog/google-ai-mode-tags-el` | existing | P1 |
| geo | GR | 500 | 0 | info/comm | **AIO** | `/el/services/ai-visibility` | existing | P0 |
| ai seo | GR | 200 | 58 | info/comm | - | `/el/services/ai-visibility` | existing | P1 |
| ai seo greece | GR | 150 |  | info/comm | - | `/el/services/ai-visibility` | existing | P0 |
| generative engine optimization | GR | 150 |  | info/comm | - | `/el/services/ai-visibility` | existing | P0 |
| answer engine optimization | GR | 150 |  | info | - | `/el/services/ai-visibility` | existing | P0 |
| seo vs geo | GR | 150 |  | info/comm | - | `/el/blog/geo-vs-seo-vs-aeo-el` | existing | P1 |
| geo vs seo | GR | 150 |  | info/comm | - | `/el/blog/geo-vs-seo-vs-aeo-el` | existing | P1 |
| ai seo υπηρεσίες | GR | 100 |  | info/comm/local | - | `/el/services/ai-visibility` | existing | P0 |
| aeo | GR | 100 | 9 | info/comm/brand | **AIO** | `/el/services/ai-visibility` | existing | P0 |
| geo seo | GR | 100 |  | info/comm | - | `/el/services/ai-visibility` | existing | P0 |
| τι είναι το ai seo; | GR | 100 | 0 | info/comm | - | `/el/blog/geo-vs-seo-vs-aeo-el` | existing | P1 |
| generative engine optimization υπηρεσίες | GR | 90 |  | info/comm/local/brand | - | `/el/services/ai-visibility` | existing | P1 |
| geo agency ελλάδα | GR | 90 |  | info/comm/nav/local/brand | - | `/el/services/ai-visibility` | existing | P1 |
| geo spy ai | GR | 70 |  | info/comm/brand | - | `/el/services/ai-visibility` | existing | P1 |

### 3h. Greek: question keywords

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| seo τι είναι | GR | 400 | 0 | info | **AIO**, video | `/el/blog/seo-gia-arxarious` | existing | P1 |
| τι ειναι το seo | GR | 200 | 0 | info | **AIO**, video | `/el/blog/seo-gia-arxarious` | existing | P1 |
| τι είναι seo | GR | 200 | 0 | info | **AIO**, sitelink | `/el/blog/seo-gia-arxarious` | existing | P1 |
| woocommerce τι ειναι | GR | 150 | 0 | info/comm/brand | **AIO**, video | `/el/services/eshop-woocommerce` | existing | P0 |
| δημιουργια eshop τι χρειαζεται | GR | 150 | 0 | info/comm | **AIO** | `/el/blog/ti-xreiazetai-gia-eshop` | existing | P1 |
| google ads τι ειναι | GR | 150 | 0 | info/brand | **AIO**, sitelink | `/el/blog/seo-i-google-ads` | existing | P1 |
| τι είναι το ai seo; | GR | 100 | 0 | info/comm | - | `/el/blog/geo-vs-seo-vs-aeo-el` | existing | P1 |
| seo τι σημαινει | GR | 100 |  | info | - | `/el/blog/seo-gia-arxarious` | existing | P1 |
| τι είναι οι υπηρεσίες seo | GR | 90 |  | info | - | `/el/seo-services` | existing | P1 |
| ποσο κοστιζει ενα eshop | GR | 90 | 0 | info/comm | **AIO** | `/el/blog/kataskevi-eshop-odigos` | existing | P1 |
| off page seo τι ειναι | GR | 90 |  | info | - | `/el/blog/off-page-seo-odigos` | gap | P2 |
| τι είναι το seo | GR | 90 | 0 | info | **AIO** | `/el/blog/seo-gia-arxarious` | existing | P2 |
| τι ειναι seo marketing | GR | 70 |  | info | - | `/el/blog/seo-gia-arxarious` | existing | P2 |
| πώς λειτουργούν τα google ads | GR | 70 |  | info/brand | - | `/el/blog/seo-i-google-ads` | existing | P2 |
| τι ειναι το google ads | GR | 60 |  | info/comm/brand | - | `/el/blog/seo-i-google-ads` | existing | P2 |

### 4a. EN: Search Console software, dashboards, API

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| free rank tracker | US | 5800 | 18 | comm | **AIO**, sitelink, video | `/en/platform/rank-tracker` | gap | P1 |
| webmaster tools | US | 3300 | 73 | info/comm | PAA, **AIO** | `/en/platform/features` | existing | P1 |
| google webmaster tools | US | 2400 | 66 | info/nav/brand | **AIO**, sitelink, PAA | `/en/platform/features` | existing | P1 |
| ahrefs webmaster tools | US | 2100 | 63 | info/nav/brand | sitelink, **AIO** | `/en/compare/search-console-alone` | existing | P1 |
| gsc api | US | 900 | 53 | info/brand | sitelink, **AIO**, PAA | `/en/help/alerts-and-integrations/search-console-api` | gap | P2 |
| google search console api | US | 700 | 44 | info/nav/brand | sitelink, PAA, **AIO** | `/en/help/alerts-and-integrations/search-console-api` | gap | P2 |
| google search console url inspection tool | US | 450 | 20 | info/brand | PAA | `/en/platform/features` | existing | P1 |
| ahrefs search console | US | 450 | 4 | info/brand | **AIO**, sitelink, video, PAA | `/en/compare/search-console-alone` | existing | P1 |
| webmaster tools content keywords | US | 300 | 5 | info/brand | **AIO**, PAA, sitelink, video | `/en/platform/features` | existing | P1 |
| google webmaster tools content keywords | US | 300 | 8 | info/brand | sitelink, PAA | `/en/platform/features` | existing | P1 |
| google search console semrush | US | 300 |  | info/comm/nav/brand | - | `/en/compare/search-console-alone` | existing | P1 |
| ahrefs google search console | US | 300 | 13 | info/comm/brand | **AIO**, sitelink, PAA, video | `/en/compare/search-console-alone` | existing | P1 |
| search console api | US | 300 | 2 | info/brand | sitelink, PAA | `/en/help/alerts-and-integrations/search-console-api` | gap | P2 |
| google search console mcp | US | 300 | 7 | info/brand | - | `/en/help/alerts-and-integrations/search-console-api` | gap | P2 |
| ahrefs free webmaster tools | US | 250 | 14 | info/comm/brand | sitelink, PAA | `/en/compare/search-console-alone` | existing | P1 |
| webmaster tools seo | US | 250 | 73 | info/comm/brand | **AIO**, PAA | `/en/platform/features` | existing | P1 |
| yandex webmaster tools | US | 250 | 1 | info/nav/brand | sitelink, **AIO**, PAA | `/en/platform/features` | existing | P1 |
| google webmaster tools check backlinks | US | 250 | 90 | info/comm/brand | **AIO**, sitelink | `/en/platform/features` | existing | P1 |
| webmaster tools google remove url | US | 250 |  | info/brand | - | `/en/platform/features` | existing | P1 |
| webmaster tools for seo | US | 250 | 27 | info/comm/brand | **AIO**, PAA, sitelink, video | `/en/platform/features` | existing | P1 |

### 4b. EN: Ahrefs / Semrush / Moz alternatives and comparisons

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| ahrefs pricing | US | 13000 | 39 | comm/brand | sitelink, PAA, **AIO** | `/en/platform/pricing` | existing | P2 |
| semrush pricing | US | 5000 | 1 | comm/brand | **AIO**, PAA, sitelink, video | `/en/platform/pricing` | existing | P2 |
| ahrefs vs semrush | US | 3500 | 21 | info/comm/brand | **AIO**, sitelink, PAA, discussion | `/en/blog/ahrefs-vs-semrush-vs-search-console` | gap | P0 |
| ahrefs alternatives | US | 3300 | 0 | info/comm/brand | **AIO**, discussion | `/en/compare/ahrefs` | existing | P0 |
| free ahrefs alternative | US | 3100 | 20 | info/comm/brand | **AIO**, sitelink | `/en/compare/ahrefs` | existing | P0 |
| semrush alternative | US | 3000 | 13 | info/comm/brand | **AIO**, sitelink, PAA | `/en/compare/semrush` | existing | P0 |
| spyfu vs ahrefs | US | 2900 | 2 | info/comm/brand | **AIO**, sitelink, PAA | `/en/compare/ahrefs` | existing | P0 |
| semrush vs ahrefs | US | 2900 | 0 | info/comm/brand | **AIO**, sitelink, discussion, PAA | `/en/blog/ahrefs-vs-semrush-vs-search-console` | gap | P0 |
| alternatives to ahrefs | US | 2900 | 13 | info/comm/brand | **AIO**, sitelink, PAA | `/en/compare/ahrefs` | existing | P0 |
| alternative to ahrefs | US | 2600 | 13 | info/comm/brand | **AIO**, sitelink, PAA | `/en/compare/ahrefs` | existing | P0 |
| semrush alternatives | US | 2400 | 11 | info/comm/brand | PAA, sitelink | `/en/compare/semrush` | existing | P0 |
| ahrefs alternative free | US | 2400 | 16 | info/comm/brand | sitelink, **AIO**, PAA | `/en/compare/ahrefs` | existing | P0 |
| semrush vs ahrefs vs moz | US | 2400 | 1 | info/comm/brand | **AIO**, discussion, video, sitelink, PAA | `/en/blog/ahrefs-vs-semrush-vs-search-console` | gap | P0 |
| ahrefs vs moz | US | 1900 | 2 | info/comm/brand | **AIO**, sitelink, PAA, video, discussion | `/en/compare/ahrefs` | existing | P0 |
| moz alternative | US | 1900 | 1 | info/comm/brand | **AIO**, PAA, sitelink | `/en/compare/moz` | gap | P2 |
| ahrefs vs semrush vs moz | US | 1800 | 5 | info/comm/brand | **AIO**, sitelink, PAA, video, discussion | `/en/blog/ahrefs-vs-semrush-vs-search-console` | gap | P0 |
| ahrefs alternatives free | US | 1600 | 4 | info/comm/brand | **AIO**, sitelink, PAA, discussion | `/en/compare/ahrefs` | existing | P0 |
| semrush vs similarweb | US | 1600 | 0 | info/comm/brand | **AIO**, PAA, discussion, sitelink | `/en/compare/semrush` | existing | P0 |
| semrush alternative | GB | 1500 | 7 | info/comm/brand | **AIO**, PAA, sitelink | `/en/compare/semrush` | existing | P0 |
| similarweb alternative | US | 1500 | 0 | info/comm/brand | **AIO**, sitelink, video, PAA | `/en/compare/moz` | gap | P2 |

### 4c. EN: AI visibility tools / trackers

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| ai visibility | US | 4300 | 48 | info/comm | **AIO**, PAA | `/en/platform/ai-visibility-tracker` | gap | P1 |
| ai visibility tool | US | 4100 | 63 | info/comm | **AIO**, PAA, sitelink | `/en/platform/ai-visibility-tracker` | gap | P1 |
| ai search visibility | US | 2700 | 66 | info/comm | **AIO**, PAA | `/en/platform/ai-visibility-tracker` | gap | P1 |
| best ai visibility tools | US | 2000 | 4 | info/comm | **AIO**, sitelink | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| ai visibility tools | US | 1700 | 36 | info/comm | **AIO**, PAA, sitelink | `/en/platform/ai-visibility-tracker` | gap | P0 |
| ai visibility tracking | US | 1700 | 46 | info/comm | **AIO**, sitelink, PAA | `/en/platform/ai-visibility-tracker` | gap | P1 |
| ai visibility tracker | US | 1700 | 54 | info/comm | **AIO**, PAA, sitelink | `/en/platform/ai-visibility-tracker` | gap | P1 |
| ai search visibility tracking tools | US | 1600 | 40 | info/comm | - | `/en/platform/ai-visibility-tracker` | gap | P0 |
| ai search visibility tool | US | 1600 | 38 | info/comm | sitelink, **AIO**, PAA | `/en/platform/ai-visibility-tracker` | gap | P0 |
| ai visibility checker | US | 1600 | 2 | info/comm | **AIO**, sitelink | `/en/ai-visibility-check` | existing | P0 |
| best ai visibility tracking tools | US | 1500 | 18 | info/comm | - | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| best software for ai visibility in search | US | 1400 | 23 | info/comm | **AIO**, PAA, sitelink | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| best ai visibility | US | 1300 |  | info/comm | - | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| ai visibility analytics tools brand mentions | US | 1200 | 12 | info/comm | - | `/en/platform/ai-visibility-tracker` | gap | P0 |
| best ai visibility tracker | US | 1200 |  | info/comm | - | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| generative engine optimization tools | US | 1200 | 5 | info/comm | **AIO**, sitelink, PAA | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| best answer engine optimization platforms 2026 | US | 1200 |  | info/comm | - | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| ai overview tracking | US | 1200 | 40 | info/comm/brand | **AIO**, sitelink, PAA | `/en/platform/ai-visibility-tracker` | gap | P0 |
| ai visibility analysis tool | US | 1200 | 35 | info/comm | - | `/en/platform/ai-visibility-tracker` | gap | P0 |
| ai overview tracker | US | 1200 | 2 | comm/brand | **AIO**, PAA | `/en/platform/ai-visibility-tracker` | gap | P0 |

### 4d. EN: GEO / AEO / AI SEO agency and services

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| google ai mode | US | 29000 | 7 | info/brand | **AIO**, sitelink | `/en/blog/google-ai-mode-tags` | existing | P1 |
| answer engine optimization | US | 7000 | 45 | info/comm | **AIO**, sitelink, PAA | `/en/services/ai-visibility` | existing | P1 |
| generative engine optimization | US | 6500 | 68 | info | **AIO**, PAA, video | `/en/services/ai-visibility` | existing | P1 |
| ai seo agency | US | 3800 | 19 | info/comm/local | **AIO**, PAA | `/en/services/ai-visibility` | existing | P0 |
| generative engine optimization services | US | 3100 | 9 | info/comm/local | **AIO**, sitelink, PAA | `/en/services/ai-visibility` | existing | P0 |
| llms.txt | US | 2500 | 0 | info | **AIO**, PAA | `/en/blog/llms-txt-guide` | gap | P0 |
| top answer engine optimization for ai solutions | US | 2200 | 0 | info/comm | video, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| generative engine optimization agency | US | 2200 | 12 | info/comm/local | **AIO**, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| ai seo agency | GB | 2000 | 7 | info/comm/local | **AIO**, PAA | `/en/services/ai-visibility` | existing | P0 |
| what is generative engine optimization | US | 2000 | 46 | info | **AIO**, PAA, sitelink | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| llm optimization | US | 1900 | 26 | info | **AIO**, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| aeo agency | US | 1900 | 3 | info/comm/local | **AIO**, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| aeo services | US | 1700 | 2 | info/comm | **AIO**, PAA | `/en/services/ai-visibility` | existing | P0 |
| geo agency | US | 1700 | 27 | info/comm/local | **AIO**, sitelink, PAA | `/en/services/ai-visibility` | existing | P0 |
| llm seo | US | 1600 | 19 | info/comm | **AIO**, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| generative engine optimization geo | US | 1500 | 0 | info | **AIO**, discussion, PAA | `/en/services/ai-visibility` | existing | P0 |
| what is generative engine optimization? | US | 1400 | 65 | info | - | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| what is answer engine optimization aeo | US | 1300 | 8 | info | - | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| answer engine optimization services | US | 1200 | 12 | info/comm/local | **AIO**, PAA, sitelink | `/en/services/ai-visibility` | existing | P0 |
| what is answer engine optimization? | US | 1200 | 27 | info | - | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |

### 4e. EN: SEO app for iPhone / iOS

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| seo app | US | 1800 | 22 | info/comm | **AIO**, PAA, sitelink, video | `/en/platform/iphone` | existing | P0 |
| seo apps | US | 1100 | 46 | info/comm | **AIO**, PAA, sitelink | `/en/platform/iphone` | existing | P1 |
| best seo app | US | 200 | 55 | info/comm | **AIO**, sitelink, PAA | `/en/platform/iphone` | existing | P1 |
| seo app free | US | 200 | 14 | info/comm | PAA, sitelink | `/en/platform/iphone` | existing | P1 |
| seo app | GB | 200 | 0 | info/comm | **AIO**, PAA | `/en/platform/iphone` | existing | P1 |
| mac seo app | US | 150 | 0 | info/comm/brand | PAA, sitelink | `/en/platform/iphone` | existing | P1 |
| brighton seo app | US | 150 | 0 | info/comm/brand | sitelink, PAA | `/en/platform/iphone` | existing | P1 |
| seo app marketing | US | 150 |  | info/comm | - | `/en/platform/iphone` | existing | P1 |
| seo iphone app | US | 150 | 8 | info/comm/brand | sitelink, discussion, PAA | `/en/platform/iphone` | existing | P1 |
| best seo app | GB | 150 |  | info/comm | - | `/en/platform/iphone` | existing | P1 |
| seo apps for iphone | US | 100 | 0 | info/comm/brand | PAA, sitelink, discussion, video | `/en/platform/iphone` | existing | P2 |
| free seo app | US | 100 | 65 | info/comm | PAA, sitelink | `/en/platform/iphone` | existing | P2 |

### 4f. EN: hotel and tourism SEO, hotel web design

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| travel seo | US | 1600 | 11 | info/comm | **AIO**, PAA | `/en/solutions/tourism-seo` | gap | P0 |
| hotel booking engine | US | 1100 | 26 | comm | **AIO**, PAA, sitelink | `/en/blog/hotel-booking-engine-guide` | gap | P1 |
| seo for hotels | US | 1000 | 6 | info/comm | **AIO**, PAA, sitelink | `/en/blog/hotel-seo-guide` | existing | P0 |
| hotel seo | US | 1000 | 0 | info/comm | **AIO**, sitelink, PAA | `/en/blog/hotel-seo-guide` | existing | P0 |
| travel seo keywords | US | 800 | 0 | info/comm | **AIO**, PAA, sitelink, video | `/en/solutions/tourism-seo` | gap | P1 |
| travel seo services | GB | 800 | 0 | info/comm/local | **AIO**, PAA | `/en/solutions/tourism-seo` | gap | P1 |
| travel seo services | US | 700 | 2 | info/comm/local | **AIO**, PAA, sitelink | `/en/solutions/tourism-seo` | gap | P1 |
| travel seo agency | GB | 700 | 1 | info/comm/local | **AIO**, PAA | `/en/solutions/tourism-seo` | gap | P1 |
| travel seo consultant | US | 600 | 0 | info/comm/local | **AIO**, PAA, sitelink | `/en/solutions/tourism-seo` | gap | P1 |
| hotel seo services | US | 600 | 5 | info/comm/local | **AIO**, PAA, sitelink | `/en/solutions/hotels` | existing | P1 |
| hotel seo agency | US | 600 | 3 | info/comm/local | **AIO**, PAA, sitelink | `/en/solutions/hotels` | existing | P1 |
| travel seo agency | US | 600 | 2 | info/comm/local | **AIO**, PAA, sitelink | `/en/solutions/tourism-seo` | gap | P1 |
| hotel website design | US | 500 | 9 | info/comm | **AIO**, PAA | `/en/blog/hotel-website-design` | existing | P1 |
| hotel seo | GB | 500 | 6 | info/comm | **AIO**, PAA, sitelink | `/en/blog/hotel-seo-guide` | existing | P1 |
| seo for tour operators | US | 450 | 0 | info/comm | **AIO**, PAA, sitelink | `/en/solutions/tour-operators` | existing | P1 |
| travel seo consultant | GB | 450 | 0 | info/comm/local | PAA | `/en/solutions/tourism-seo` | gap | P1 |
| travel seo | GB | 450 | 3 | info/comm | **AIO**, PAA | `/en/solutions/tourism-seo` | gap | P1 |
| hotel seo agency | GB | 400 | 0 | info/comm/local/brand | **AIO**, PAA | `/en/solutions/hotels` | existing | P1 |
| travel seo expert | GB | 400 | 0 | info/comm/local | **AIO**, PAA | `/en/solutions/tourism-seo` | gap | P1 |
| hotel seo company | US | 350 | 3 | info/comm/local | sitelink, PAA | `/en/solutions/hotels` | existing | P1 |

### 4g. EN: SEO agency Greece and SEO cost

| Keyword | Ctry | Vol | KD | Intent | SERP | Target URL | Status | Pri |
|---|---|---:|---:|---|---|---|---|---|
| how much does seo cost | US | 2300 | 46 | info/comm | **AIO**, sitelink, PAA | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much do seo services cost | US | 500 | 39 | info/comm | **AIO**, sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does seo cost per month | US | 400 | 42 | info/comm | **AIO**, sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does seo cost for small business | US | 400 | 35 | info/comm | **AIO**, sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does seo cost for a small business | US | 300 | 7 | info/comm | **AIO**, sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does enterprise seo cost | US | 250 | 3 | info/comm | **AIO**, PAA, sitelink, discussion | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does seo cost? | US | 250 | 45 | info/comm | **AIO**, sitelink, PAA | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| seo company greece | US | 200 | 1 | info/comm/local | local_pack, PAA, sitelink | `/en/seo-services` | existing | P0 |
| what does seo cost | US | 200 | 0 | info/comm | **AIO**, PAA, discussion, sitelink | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does an seo cost | US | 200 | 0 | info/comm | **AIO**, PAA, discussion, sitelink | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much seo services cost | US | 200 | 39 | info/comm | **AIO**, sitelink, PAA | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| how much does seo cost per month? | US | 150 | 43 | info/comm | sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P2 |
| how much does seo service cost | US | 150 | 19 | info/comm | sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P2 |
| how much does seo services cost | US | 150 | 39 | info/comm | sitelink, PAA, discussion | `/en/blog/how-much-does-seo-cost` | existing | P2 |
| how much does enterprise seo services cost | US | 150 |  | info/comm | - | `/en/blog/how-much-does-seo-cost` | existing | P2 |

## 5. Fan-out map (12 head topics)

Each head topic is broken into the sub-queries that AI Overviews, AI Mode and ChatGPT fan out to. Each sub-query maps to an existing URL or a `GAP:` URL.
- Volumes come from Ahrefs where it had them. They are blank otherwise; fan-out sub-queries are often zero-volume but get cited.
- All 165 rows are in the CSV with `source=fanout`.

#### F1 best SEO agency in Greece

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| seo company greece | US | 200 | 1 | `/en/seo-services` | existing | P0 |
| seo agency greece | US | 80 | 2 | `/en/seo-services` | existing | P0 |
| seo greece | US | 80 | 0 | `/en/seo-services` | existing | P0 |
| seo expert greece | GR | 80 | 0 | `/en/seo-consultant` | existing | P1 |
| digital marketing agency greece | US | 60 | 49 | `/en/seo-services` | existing | P1 |
| seo agency athens | GR | 30 |  | `/en/services/local-seo/athens-gr` | existing | P1 |
| best seo agency greece | US | 20 |  | `/en/blog/how-to-choose-an-seo-agency-in-greece` | gap | P1 |
| how to choose an seo agency | US |  |  | `/en/blog/how-to-choose-an-seo-agency-in-greece` | gap | P1 |
| how much does seo cost in greece | US |  |  | `/en/blog/how-much-does-seo-cost` | existing | P1 |
| seo agency for hotels in greece | US |  |  | `/en/solutions/hotels` | existing | P1 |
| geo agency greece | US |  |  | `/en/services/ai-visibility` | existing | P1 |
| seo agency greece reviews case studies | US |  |  | `/en/work` | existing | P1 |
| greek seo expert | GR | 40 |  | `/en/seo-consultant` | existing | P2 |
| seo agency vs freelancer | US |  |  | `/en/blog/how-to-choose-an-seo-agency-in-greece` | gap | P2 |
| local seo greece google maps | US |  |  | `/en/services/local-seo` | existing | P2 |

#### F2 πόσο κοστίζει το SEO στην Ελλάδα

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| τιμές seo | GR | 800 |  | `/el/pricing` | existing | P0 |
| κόστος seo | GR | 700 |  | `/el/blog/poso-kostizei-to-seo` | existing | P0 |
| πακέτα seo | GR | 70 |  | `/el/pricing` | existing | P1 |
| αξίζει το seo | GR | 50 |  | `/el/blog/poso-kostizei-to-seo` | existing | P1 |
| seo χαμηλό κόστος | GR | 40 |  | `/el/blog/poso-kostizei-to-seo` | existing | P1 |
| seo τιμές ελλάδα | GR | 20 |  | `/el/pricing` | existing | P1 |
| seo μηνιαίο κόστος | GR |  |  | `/el/pricing` | existing | P1 |
| τι περιλαμβάνει ένα πακέτο seo | GR |  |  | `/el/seo-services` | existing | P1 |
| αξίζει πραγματικά το seo | GR | 30 |  | `/el/blog/poso-kostizei-to-seo` | existing | P2 |
| γιατί το seo είναι ακριβό | GR | 20 |  | `/el/blog/poso-kostizei-to-seo` | existing | P2 |
| πότε θα δω αποτελέσματα από seo | GR | 10 |  | `/el/seo-services` | existing | P2 |
| seo freelancer | GR | 10 |  | `/el/symvoulos-seo` | existing | P2 |
| seo ή google ads κόστος | GR |  |  | `/el/blog/seo-i-google-ads` | existing | P2 |
| πόσο κοστίζει το τοπικό seo | GR |  |  | `/el/services/local-seo` | existing | P2 |

#### F3 GSC Boost vs Semrush

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| semrush alternative | US | 3000 | 13 | `/en/compare/semrush` | existing | P0 |
| semrush alternatives | US | 2400 | 11 | `/en/compare/semrush` | existing | P0 |
| best semrush alternative | US | 900 | 11 | `/en/compare/semrush` | existing | P0 |
| semrush pricing | US | 5000 | 1 | `/en/platform/pricing` | existing | P1 |
| semrush vs ahrefs | US | 2900 | 0 | `/en/blog/ahrefs-vs-semrush-vs-search-console` | gap | P1 |
| alternatives to semrush | US | 800 | 11 | `/en/compare/semrush` | existing | P1 |
| semrush ai visibility | GB | 500 |  | `/en/compare/semrush` | existing | P1 |
| google search console semrush | US | 300 |  | `/en/compare/search-console-alone` | existing | P1 |
| gsc boost pricing | US |  |  | `/en/platform/pricing` | existing | P1 |
| semrush free | US | 1400 | 57 | `/en/compare/semrush` | existing | P2 |
| is semrush worth it for small business | US |  |  | `/en/compare/semrush` | existing | P2 |
| semrush vs search console data accuracy | US |  |  | `/en/compare/search-console-alone` | existing | P2 |
| gsc boost review | US |  |  | `/en/platform` | existing | P2 |

#### F4 best Google Search Console tools

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| google search console alternative | US | 150 | 0 | `/en/compare/google-search-console-alternatives` | gap | P0 |
| google search console keywords | US | 700 | 22 | `/en/blog/gsc-query-prioritization-framework` | existing | P1 |
| how to use google search console for seo | US | 400 | 62 | `/en/blog/pillar-search-console-mastery` | existing | P1 |
| google search console mcp | US | 300 | 7 | `/en/help/alerts-and-integrations/search-console-api` | gap | P1 |
| search console keywords limit | US | 300 |  | `/en/blog/gsc-query-prioritization-framework` | existing | P1 |
| google search console dashboard | US | 200 | 63 | `/en/platform/features` | existing | P1 |
| google search console reporting | US | 200 | 51 | `/en/platform/features` | existing | P1 |
| google search console tools | US | 100 | 76 | `/en/platform/features` | existing | P1 |
| google search console app | US | 50 | 33 | `/en/platform/iphone` | existing | P1 |
| google search console rank tracker | US | 10 |  | `/en/platform/rank-tracker` | gap | P1 |
| bing webmaster tools | US | 7800 | 2 | `/en/blog/bing-webmaster-tools-vs-google-search-console` | gap | P2 |
| google search console api | US | 700 | 44 | `/en/help/alerts-and-integrations/search-console-api` | gap | P2 |
| google search console to looker studio | US | 200 |  | `/en/blog/search-console-looker-studio-vs-gsc-boost` | gap | P2 |
| search console insights | US | 150 | 33 | `/en/platform/features` | existing | P2 |

#### F5 how to get recommended by ChatGPT

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| ai visibility checker | US | 1600 | 2 | `/en/ai-visibility-check` | existing | P0 |
| how to rank in chatgpt | US | 900 | 5 | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P0 |
| how to rank in chatgpt search | US | 500 |  | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P0 |
| how to get cited by chatgpt | US | 400 | 2 | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P0 |
| how to get business recommended by chatgpt | US | 150 |  | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P0 |
| how to get recommended by chatgpt | US | 100 | 5 | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P0 |
| llms.txt | US | 2500 | 0 | `/en/blog/llms-txt-guide` | gap | P1 |
| llm citation tracking | US | 700 | 8 | `/en/tools/llm-citation-tracking` | existing | P1 |
| chatgpt rank tracker | US | 200 |  | `/en/platform/ai-visibility-tracker` | gap | P1 |
| how to show up in chatgpt | US | 100 | 2 | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P1 |
| why brand does not show up in chatgpt | US | 100 | 0 | `/en/blog/how-to-get-recommended-by-chatgpt` | gap | P1 |
| why does reddit get cited by chatgpt | US | 150 |  | `/en/blog/llm-citations-brand-visibility` | existing | P2 |
| does chatgpt use google search | US | 10 |  | `/en/blog/llm-citations-brand-visibility` | existing | P2 |
| schema markup for chatgpt | US |  |  | `/en/resources/ai-search-page-anatomy` | existing | P2 |
| chatgpt local business recommendations hotels | US |  |  | `/en/solutions/hotels` | existing | P2 |

#### F6 hotel website design Greece

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| hotel website design | US | 500 | 9 | `/en/blog/hotel-website-design` | existing | P0 |
| κατασκευή ιστοσελίδων για ξενοδοχεία | GR | 200 | 1 | `/el/solutions/hotels/website-creation` | existing | P0 |
| digital marketing για ξενοδοχεια | GR | 200 |  | `/el/solutions/hotels` | existing | P0 |
| κατασκευή ιστοσελίδας ξενοδοχείου | GR | 150 | 0 | `/el/solutions/hotels/website-creation` | existing | P0 |
| ιστοσελίδες ξενοδοχείων | GR | 150 | 49 | `/el/solutions/hotels/website-creation` | existing | P0 |
| hotel booking engine | US | 1100 | 26 | `/en/blog/hotel-booking-engine-guide` | gap | P1 |
| hotel website design agency | US | 200 | 3 | `/en/solutions/hotels/website-creation` | existing | P1 |
| hotel website design cost | US | 100 | 0 | `/en/blog/hotel-website-cost-greece` | gap | P1 |
| υπηρεσίες seo για ξενοδοχεία | GR | 100 |  | `/el/blog/seo-gia-xenodoxeia` | existing | P1 |
| booking engine ξενοδοχείου | GR | 70 |  | `/el/blog/kataskevi-istoselidas-xenodoxeia` | existing | P1 |
| πόσο κοστίζει ιστοσελίδα ξενοδοχείου | GR |  |  | `/el/blog/poso-kostizei-istoselida-xenodoxeiou` | gap | P1 |
| best hotel website design | US | 150 | 5 | `/en/blog/hotel-website-design` | existing | P2 |
| boutique hotel website design | US | 100 | 8 | `/en/blog/hotel-website-design` | existing | P2 |
| google ads για ξενοδοχεία | GR | 80 |  | `/el/blog/google-ads-gia-xenodoxeia` | gap | P2 |
| πολύγλωσση ιστοσελίδα ξενοδοχείου | GR |  |  | `/el/blog/kataskevi-istoselidas-xenodoxeia` | existing | P2 |

#### F7 κατασκευή ιστοσελίδων

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| κατασκευή ιστοσελίδων | GR | 1100 | 55 | `/el/services/website-creation` | existing | P0 |
| κατασκευή ιστοσελίδων αθήνα | GR | 350 | 47 | `/el/services/website-creation/athens-gr` | existing | P0 |
| κατασκευή ιστοσελίδων θεσσαλονίκη | GR | 300 | 48 | `/el/services/website-creation/thessaloniki-gr` | existing | P0 |
| κατασκευη ιστοσελιδων πακετα | GR | 200 | 0 | `/el/pricing` | existing | P0 |
| κατασκευη ιστοσελιδων τιμες | GR | 150 | 0 | `/el/pricing` | existing | P0 |
| κατασκευή ιστοσελίδων κρήτη | GR | 90 | 33 | `/el/services/website-creation/crete-gr` | existing | P1 |
| κατασκευή ιστοσελίδων με wordpress | GR | 80 |  | `/el/services/website-creation` | existing | P1 |
| ποσο κοστιζει μια ιστοσελιδα | GR | 30 | 0 | `/el/blog/poso-kostizei-mia-istoselida` | existing | P1 |
| seo κατά την κατασκευή μιας ιστοσελίδας | GR | 30 |  | `/el/services/seo-web-design` | existing | P1 |
| κατασκευή ιστοσελίδας δωρεάν | GR | 90 | 0 | `/el/blog/pos-na-ftiaxo-istoselida` | gap | P2 |
| τι χρειάζεται για να φτιάξω μια ιστοσελίδα | GR | 50 |  | `/el/blog/pos-na-ftiaxo-istoselida` | gap | P2 |
| συχνές ερωτήσεις για την κατασκευή ιστοσελίδας | GR | 30 |  | `/el/services/website-creation` | existing | P2 |
| τι γίνεται μετά την κατασκευή της ιστοσελίδας | GR | 30 |  | `/el/services/website-redesign` | existing | P2 |
| κατασκευή ιστοσελίδων αμεα | GR | 30 |  | `/el/blog/prosvasimi-istoselida-amea` | gap | P2 |
| πόσο χρόνο παίρνει η κατασκευή ιστοσελίδας | GR |  |  | `/el/services/website-creation` | existing | P2 |

#### F8 κατασκευή eshop

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| κατασκευη eshop | GR | 700 | 13 | `/el/services/eshop-woocommerce` | existing | P0 |
| κατασκευη eshop θεσσαλονικη | GR | 300 | 0 | `/el/services/eshop-woocommerce/thessaloniki-gr` | existing | P0 |
| κατασκευη eshop τιμες | GR | 200 | 1 | `/el/blog/kataskevi-eshop-odigos` | existing | P0 |
| woocommerce | GR | 1600 | 65 | `/el/services/eshop-woocommerce` | existing | P1 |
| κόστος διαφήμισης στη google για eshop | GR | 600 |  | `/el/blog/kostos-google-ads` | gap | P1 |
| κατασκευή eshop με σύνδεση erp | GR | 200 |  | `/el/blog/woocommerce-odigos-rythmiseon` | gap | P1 |
| δημιουργια eshop τι χρειαζεται | GR | 150 | 0 | `/el/blog/ti-xreiazetai-gia-eshop` | existing | P1 |
| ποσο κοστιζει ενα eshop | GR | 90 | 0 | `/el/blog/kataskevi-eshop-odigos` | existing | P1 |
| κατασκευή eshop αθήνα | GR | 70 |  | `/el/services/eshop-woocommerce/athens-gr` | existing | P1 |
| seo για eshop | GR | 30 |  | `/el/services/eshop-seo` | existing | P1 |
| τι φορολογια εχουν τα eshop | GR | 50 | 0 | `/el/blog/ti-xreiazetai-gia-eshop` | existing | P2 |
| κατασκευη eshop επιδοτηση | GR | 20 |  | `/el/blog/epidotisi-eshop` | gap | P2 |
| shopify vs woocommerce | GR | 20 | 7 | `/el/blog/shopify-vs-woocommerce` | gap | P2 |

#### F9 GEO / AEO / AI SEO agency

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| ai seo agency | US | 3800 | 19 | `/en/services/ai-visibility` | existing | P0 |
| generative engine optimization services | US | 3100 | 9 | `/en/services/ai-visibility` | existing | P0 |
| generative engine optimization agency | US | 2200 | 12 | `/en/services/ai-visibility` | existing | P0 |
| best ai visibility tools | US | 2000 | 4 | `/en/blog/best-ai-visibility-tools` | gap | P0 |
| aeo agency | US | 1900 | 3 | `/en/services/ai-visibility` | existing | P0 |
| geo agency | US | 1700 | 27 | `/en/services/ai-visibility` | existing | P0 |
| aeo services | US | 1700 | 2 | `/en/services/ai-visibility` | existing | P0 |
| geo agency ελλάδα | GR | 90 |  | `/el/services/ai-visibility` | existing | P0 |
| answer engine optimization | US | 7000 | 45 | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| what is generative engine optimization | US | 2000 | 46 | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| ai visibility tracking | US | 1700 | 46 | `/en/platform/ai-visibility-tracker` | gap | P1 |
| how to rank in ai overviews | US | 700 | 43 | `/en/resources/ai-search-page-anatomy` | existing | P1 |
| what is geo vs seo | US | 350 |  | `/en/blog/geo-vs-seo-vs-aeo` | existing | P1 |
| how much does geo cost | US |  |  | `/en/blog/how-much-does-geo-cost` | gap | P2 |

#### F10 τοπικό SEO & Google Business Profile

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| seo αθηνα | GR | 200 |  | `/el/services/local-seo/athens-gr` | existing | P0 |
| τοπικο seo | GR | 150 | 0 | `/el/services/local-seo` | existing | P0 |
| google my business | GR | 5600 | 0 | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| google business profile | GR | 1800 | 81 | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| κριτικες google | GR | 300 | 0 | `/el/blog/kritikes-google-odigos` | gap | P1 |
| google business profile ελληνικα | GR | 100 |  | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| τοπικό seo και πως να το βελτιώσω | GR | 90 |  | `/el/blog/topiko-seo-odigos` | gap | P1 |
| καταχώρηση στο google maps | GR | 50 |  | `/el/blog/epixeirisi-sto-google-maps` | existing | P1 |
| τι ειναι το τοπικο seo | GR | 40 | 0 | `/el/services/local-seo` | existing | P1 |
| local seo θεσσαλονίκη | GR | 40 |  | `/el/services/local-seo/thessaloniki-gr` | existing | P1 |
| google my business τι ειναι | GR | 40 | 0 | `/el/blog/epixeirisi-sto-google-maps` | existing | P2 |
| διαχείριση google business profile | GR | 10 |  | `/el/services/local-seo` | existing | P2 |
| πώς ανεβαίνω στο google maps | GR |  |  | `/el/blog/epixeirisi-sto-google-maps` | existing | P2 |

#### F11 SEO / Search Console app for iPhone

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| seo app | US | 1800 | 22 | `/en/platform/iphone` | existing | P0 |
| seo app free | US | 200 | 14 | `/en/platform/iphone` | existing | P1 |
| seo iphone app | US | 150 | 8 | `/en/platform/iphone` | existing | P1 |
| seo apps for iphone | US | 100 | 0 | `/en/platform/iphone` | existing | P1 |
| google search console app | US | 50 | 33 | `/en/platform/iphone` | existing | P1 |
| is there a google search console app for iphone | US |  |  | `/en/platform/iphone` | existing | P1 |
| best seo app | US | 200 | 55 | `/en/platform/iphone` | existing | P2 |
| mac seo app | US | 150 | 0 | `/en/platform/iphone` | existing | P2 |
| seo app android | US | 90 | 0 | `/en/platform/iphone` | existing | P2 |
| check google rankings on iphone | US |  |  | `/en/platform/iphone` | existing | P2 |
| search console widget ios | US |  |  | `/en/help/getting-started/welcome` | gap | P2 |

#### F12 hotel & tourism SEO

| Sub-query | Ctry | Vol | KD | Target | Status | Pri |
|---|---|---:|---:|---|---|---|
| travel seo | US | 1600 | 11 | `/en/solutions/tourism-seo` | gap | P0 |
| hotel seo | US | 1000 | 0 | `/en/blog/hotel-seo-guide` | existing | P0 |
| seo for hotels | US | 1000 | 6 | `/en/blog/hotel-seo-guide` | existing | P0 |
| hotel seo agency | US | 600 | 3 | `/en/solutions/hotels` | existing | P1 |
| hotel seo services | US | 600 | 5 | `/en/solutions/hotels` | existing | P1 |
| travel seo agency | US | 600 | 2 | `/en/solutions/tourism-seo` | gap | P1 |
| seo for tour operators | US | 450 | 0 | `/en/solutions/tour-operators` | existing | P1 |
| tourism seo company | US | 350 | 2 | `/en/solutions/tourism-seo` | gap | P1 |
| vacation rental seo | US | 300 | 0 | `/en/solutions/villas-apartments` | existing | P1 |
| local seo for hotels | US | 250 | 2 | `/en/blog/hotel-seo-guide` | existing | P1 |
| hotel seo strategy | US | 250 | 0 | `/en/blog/hotel-seo-guide` | existing | P1 |
| car rental seo | US | 200 | 0 | `/en/solutions/rent-a-car` | existing | P1 |
| seo for hotels in greece | US |  |  | `/en/solutions/hotels` | existing | P1 |

## 6. Content gap list

### 6a. Priority new pages (proposed URL, title, H1)

| # | Proposed URL | Title tag | H1 | Keywords (vol) | Pri |
|---|---|---|---|---|---|
| 1 | /en/platform/ai-visibility-tracker | AI Visibility Tracker: Monitor AI Overviews & ChatGPT \| GSC Boost | AI visibility tracker for Google AI Overviews, AI Mode and ChatGPT | ai visibility tool 4,100; ai visibility tracker 1,700; ai overview tracker 1,200; llm citation tracking 700 | P0 |
| 2 | /en/blog/best-ai-visibility-tools | 12 Best AI Visibility Tools in 2026 (Tested & Compared) | The best AI visibility tools in 2026 | best ai visibility tools 2,000/KD4; ai visibility checker 1,600 | P0 |
| 3 | /en/blog/how-to-get-recommended-by-chatgpt | How to Rank in ChatGPT: Get Cited & Recommended (2026) | How to get your brand recommended by ChatGPT | how to rank in chatgpt 900; …search 500; how to get cited by chatgpt 400 | P0 |
| 4 | /en/compare/google-search-console-alternatives | 9 Google Search Console Alternatives & Add-ons (2026) | Google Search Console alternatives: tools that do more with your GSC data | google search console alternative 150/KD0; gsc dashboard 200 | P0 |
| 5 | /en/solutions/tourism-seo | Tourism & Travel SEO Agency: Hotels, Tours, Villas \| AnotherSEOGuru | Travel and tourism SEO that fills rooms, tours and rental calendars | travel seo 1,600; hotel seo 1,000; seo for tour operators 450 | P1 |
| 6 | /en/blog/llms-txt-guide | llms.txt: What It Is, Example File & Does It Help SEO? | llms.txt explained, with a copy-paste example | llms.txt 2,500/KD0 | P1 |
| 7 | /en/blog/ahrefs-vs-semrush-vs-search-console | Ahrefs vs Semrush (vs Search Console): Which to Use in 2026 | Ahrefs vs Semrush vs Google Search Console | ahrefs vs semrush 3,500/KD21 | P1 |
| 8 | /en/platform/rank-tracker | Free Rank Tracker from Google Search Console Data \| GSC Boost | Free rank tracker built on your real Search Console positions | free rank tracker 5,800/KD18 | P1 |
| 9 | /en/compare/moz | GSC Boost vs Moz Pro: A Cheaper Moz Alternative | GSC Boost vs Moz Pro | moz alternative 1,900 | P1 |
| 10 | /en/blog/bing-webmaster-tools-vs-google-search-console | Bing Webmaster Tools vs Google Search Console (2026) | Bing Webmaster Tools vs Google Search Console: what each shows you | bing webmaster tools 7,800 | P2 |
| 11 | /en/help/alerts-and-integrations/search-console-api | Google Search Console API & MCP: Connect Your Data \| GSC Boost | Use the Search Console API (and MCP) without writing code | gsc api 900; search console api 700; gsc mcp 300 | P1 |
| 12 | /en/blog/hotel-booking-engine-guide | Hotel Booking Engine: How to Choose One (2026 Guide) | How to choose a hotel booking engine for direct bookings | hotel booking engine 1,100/KD26 | P2 |
| 13 | /el/blog/kostos-google-ads | Κόστος Google Ads 2026: Πόσο Κοστίζει η Διαφήμιση για Eshop | Πόσο κοστίζει η διαφήμιση στη Google για ένα eshop | κόστος διαφήμισης στη google για eshop 600; google ads τι ειναι 150 | P1 |
| 14 | /el/blog/kritikes-google-odigos | Κριτικές Google: Πώς να Πάρετε Περισσότερες (Οδηγός) | Πώς να αυξήσετε τις κριτικές Google της επιχείρησής σας | κριτικες google 300 | P1 |
| 15 | /el/blog/pos-na-ftiaxo-istoselida | Πώς να Φτιάξω Ιστοσελίδα Μόνος μου (Δωρεάν vs Επαγγελματική) | Πώς να φτιάξετε ιστοσελίδα μόνοι σας και πότε να πάρετε επαγγελματία | πως να φτιαξω ιστοσελιδα δωρεαν μονος μου 100 + 21 variants | P2 |
| 16 | /el/blog/woocommerce-odigos-rythmiseon | WooCommerce Οδηγός: Ρυθμίσεις, ERP, Πληρωμές & Courier | WooCommerce: ο πλήρης οδηγός ρυθμίσεων για ελληνικό eshop | κατασκευή eshop με σύνδεση erp 200 | P2 |
| 17 | /el/blog/shopify-vs-woocommerce | Shopify ή WooCommerce; Σύγκριση για Ελληνικό Eshop (2026) | Shopify vs WooCommerce για ελληνικό eshop | shopify greece 200 | P2 |
| 18 | /en/blog/how-to-choose-an-seo-agency-in-greece | How to Choose an SEO Agency in Greece (Checklist + Prices) | How to choose an SEO agency in Greece | best seo agency greece 20; how to choose an seo agency | P2 |
| 19 | /el/blog/prosvasimi-istoselida-amea | Προσβάσιμη Ιστοσελίδα (ΑμεΑ & WCAG): Τι Ισχύει το 2026 | Προσβάσιμη ιστοσελίδα: απαιτήσεις WCAG και ΑμεΑ | κατασκευή ιστοσελίδας w3c 30 + variants | P2 |
| 20 | /el/blog/off-page-seo-odigos | Off-Page SEO: Τι Είναι & Πώς Γίνεται (Οδηγός 2026) | Off-page SEO: τι είναι και πώς χτίζεται | off page seo τι ειναι 90 | P2 |

New Greek city pages are low priority; volumes are 10–70 each. They include περιστέρι, πειραιάς, καρδίτσα, κατερίνη, ξάνθη, βέροια and the Athens suburbs. Add them only if each can carry unique local proof. Cyclades/Santorini/Mykonos/Paros/Naxos/Sifnos web-design queries show 0 or no volume in Ahrefs, but the existing island pages already earn impressions (santorini pos 13.8, mykonos pos 4.9), so keep them as they are.

### 6b. All gap URLs from the CSV (aggregated)

Sum vol counts Ahrefs rows only and includes overlapping long-tail variants. The empty-URL row is Sifnos travel queries (σίφνος 4,200), which are off-topic for the agency. Use them only for the rentacar-sifnos case study.

| Proposed URL | Rows | Sum vol | Top keyword (vol, ctry) |
|---|---:|---:|---|
| `/en/blog/best-ai-visibility-tools` | 137 | 107000 | best ai visibility tools (2000, US) |
| `/en/platform/ai-visibility-tracker` | 121 | 92490 | ai visibility (4300, US) |
| `/en/blog/ahrefs-vs-semrush-vs-search-console` | 15 | 17200 | ahrefs vs semrush (3500, US) |
| `/en/solutions/tourism-seo` | 56 | 11930 | travel seo (1600, US) |
| `/en/blog/bing-webmaster-tools-vs-google-search-console` | 10 | 11300 | bing webmaster tools (7800, US) |
| `/en/compare/moz` | 9 | 6850 | moz alternative (1900, US) |
| `` | 2 | 6200 | σίφνος (4200, GR) |
| `/en/platform/rank-tracker` | 5 | 5900 | free rank tracker (5800, US) |
| `/en/blog/how-to-get-recommended-by-chatgpt` | 33 | 3650 | how to rank in chatgpt (900, US) |
| `/en/help/alerts-and-integrations/search-console-api` | 9 | 2700 | gsc api (900, US) |
| `/en/blog/llms-txt-guide` | 2 | 2500 | llms.txt (2500, US) |
| `/en/blog/hotel-booking-engine-guide` | 4 | 1650 | hotel booking engine (1100, US) |
| `/el/blog/pos-na-ftiaxo-istoselida` | 22 | 920 | πωσ να φτιαξω ιστοσελιδα δωρεαν μονοσ μου (100, GR) |
| `/el/blog/woocommerce-odigos-rythmiseon` | 13 | 610 | κατασκευή eshop με σύνδεση erp (200, GR) |
| `/el/blog/kostos-google-ads` | 2 | 600 | κόστος διαφήμισης στη google για eshop (600, GR) |
| `/en/compare/google-search-console-alternatives` | 5 | 550 | google search console alternative (150, US) |
| `/el/blog/kritikes-google-odigos` | 3 | 310 | κριτικες google (300, GR) |
| `/el/blog/shopify-vs-woocommerce` | 3 | 220 | shopify greece (200, GR) |
| `/el/services/website-creation/peristeri` | 3 | 160 | κατασκευη ιστοσελιδων περιστερι (70, GR) |
| `/el/blog/off-page-seo-odigos` | 2 | 140 | off page seo τι ειναι (90, GR) |
| `/el/blog/prosvasimi-istoselida-amea` | 6 | 140 | κατασκευή ιστοσελίδας w3c (30, GR) |
| `/el/services/website-creation/piraeus` | 1 | 60 | κατασκευή ιστοσελίδων πειραιάς (60, GR) |
| `/el/services/website-creation/karditsa` | 1 | 50 | κατασκευή ιστοσελίδων καρδίτσα (50, GR) |
| `/el/services/eshop-woocommerce/karditsa` | 1 | 50 | κατασκευή eshop καρδίτσα (50, GR) |
| `/el/services/website-creation/ilioupoli` | 1 | 40 | κατασκευή ιστοσελίδων ηλιούπολη (40, GR) |
| `/el/services/eshop-woocommerce/peristeri` | 1 | 40 | κατασκευή eshop περιστέρι (40, GR) |
| `/el/services/website-creation/xanthi` | 2 | 40 | κατασκευή ιστοσελίδας ξάνθη (20, GR) |
| `/el/services/website-creation/katerini` | 2 | 40 | κατασκευή ιστοσελίδας κατερίνη (20, GR) |
| `/el/services/website-creation/ampelokipoi` | 1 | 30 | κατασκευη ιστοσελιδων αμπελοκηποι (30, GR) |
| `/el/services/website-creation/kalamaria` | 1 | 30 | κατασκευή ιστοσελίδων καλαμαριά (30, GR) |
| `/el/services/website-creation/pagkrati` | 1 | 30 | κατασκευή ιστοσελίδων παγκράτι (30, GR) |
| `/el/services/website-creation/attica` | 1 | 30 | κατασκευή ιστοσελίδων αττική (30, GR) |
| `/el/services/website-creation/alimos` | 1 | 30 | κατασκευή ιστοσελίδων άλιμος (30, GR) |
| `/el/blog/polyglosso-seo` | 1 | 30 | τι είναι πολύγλωσσο seo (30, GR) |
| `/en/blog/how-to-choose-an-seo-agency-in-greece` | 4 | 20 | best seo agency greece (20, US) |
| `/el/services/local-seo/katerini` | 1 | 20 | προώθηση ιστοσελίδων κατερίνη (20, GR) |
| `/el/services/website-creation/faliro` | 1 | 20 | κατασκευή ιστοσελίδας παλαιό φάληρο (20, GR) |
| `/el/services/website-creation/veria` | 1 | 10 | κατασκευή ιστοσελίδων βέροια (10, GR) |
| `/el/services/website-creation/kolonos` | 1 | 10 | κατασκευη ιστοσελιδων κολωνος (10, GR) |
| `/en/blog/hotel-website-cost-greece` | 1 | 0 | hotel website design cost (100, US) |
| `/el/blog/topiko-seo-odigos` | 1 | 0 | τοπικό seo και πως να το βελτιώσω (90, GR) |
| `/el/blog/poso-kostizei-istoselida-xenodoxeiou` | 1 | 0 | πόσο κοστίζει ιστοσελίδα ξενοδοχείου (, GR) |
| `/el/services/website-creation/cyclades` | 1 | 0 | κατασκευή ιστοσελίδων κυκλάδες (0, GR) |
| `/en/blog/search-console-looker-studio-vs-gsc-boost` | 1 | 0 | google search console to looker studio (200, US) |
| `/el/blog/google-ads-gia-xenodoxeia` | 1 | 0 | google ads για ξενοδοχεία (80, GR) |
| `/el/blog/epidotisi-eshop` | 1 | 0 | κατασκευη eshop επιδοτηση (20, GR) |
| `/en/blog/how-much-does-geo-cost` | 1 | 0 | how much does geo cost (, US) |
| `/en/help/getting-started/welcome` | 1 | 0 | search console widget ios (, US) |

## 7. Title / meta / H1 changes

| # | File | Page | Current | Proposed EN | Proposed EL | Justifying keyword (vol/KD) |
|---|---|---|---|---|---|---|
| 1 | `src/data/compare-pages.ts` (semrush `headline`, used as title by `src/app/[locale]/compare/[slug]/page.tsx`) | /compare/semrush | AnotherSEOGuru vs Semrush | GSC Boost vs Semrush: A Search Console-First Semrush Alternative | GSC Boost vs Semrush: Η Εναλλακτική του Semrush με Search Console | semrush alternative 3,000/13; semrush alternatives 2,400 |
| 2 | `src/data/compare-pages.ts` (ahrefs) | /compare/ahrefs | AnotherSEOGuru vs Ahrefs | GSC Boost vs Ahrefs: The Search Console-Based Ahrefs Alternative | GSC Boost vs Ahrefs: Εναλλακτική του Ahrefs με Δεδομένα Search Console | ahrefs alternatives 3,300/0 |
| 3 | `src/data/compare-pages.ts` (search-console-alone) | /compare/search-console-alone | AnotherSEOGuru vs Search Console alone | Google Search Console Alternative? GSC Boost vs Search Console Alone | Εναλλακτική του Google Search Console; GSC Boost vs Search Console | google search console alternative 150/0 |
| 4 | `src/data/services.ts` (ai-visibility `metaTitle`), `src/data/services-i18n.ts` (EL ai-visibility `seo.title`) | /services/ai-visibility | EN "AI Visibility (GEO / AEO)"; EL "AI SEO & GEO: Ορατότητα στο ChatGPT και AI Overviews" | AI SEO Agency: GEO & AEO Services for ChatGPT & AI Overviews | AI SEO & GEO Agency Ελλάδα: Ορατότητα στο ChatGPT | ai seo agency 3,800/19; GEO services 3,100/9; geo agency ελλάδα 90; ai seo 200 |
| 4b | same (H1) | | | H1: AI SEO agency: get cited in ChatGPT, Google AI Overviews and AI Mode | H1: AI SEO & GEO agency: ορατότητα στο ChatGPT και στα AI Overviews | aeo agency 1,900/3 |
| 5 | `src/app/[locale]/platform/iphone/page.tsx` | /platform/iphone | GSC Boost for iPhone: Search Console App (Beta) | SEO App for iPhone: Google Search Console on iOS \| GSC Boost | Εφαρμογή SEO για iPhone: Google Search Console \| GSC Boost | seo app 1,800/22; seo iphone app 150 |
| 6 | `src/data/seo-services-pillar.ts` (EN `metaTitle`, `h1`) | /en/seo-services | SEO Greece \| SEO Services for Businesses; H1 "SEO Greece: SEO services for businesses that bring enquiries, not reports" | Title: SEO Agency Greece: SEO Services & Company \| AnotherSEOGuru. H1: SEO agency in Greece: SEO services that bring enquiries, not reports | (EL unchanged: "Υπηρεσίες SEO & Προώθηση Ιστοσελίδων") | seo company greece 200/1; seo agency greece 80–150; seo greece 150 |
| 7 | `content/blog/kataskevi-eshop-odigos.md` (frontmatter `title`) | /el/blog/kataskevi-eshop-odigos | Πόσο Κοστίζει ένα Eshop και Πώς Φτιάχνεται | – | Κατασκευή Eshop 2026: Κόστος, Τιμές & Βήματα | κατασκευη eshop 700/13; κατασκευη eshop τιμες 200; 1,249 impr / 0 clicks |
| 8 | `content/blog/poso-kostizei-mia-istoselida.md` | /el/blog/poso-kostizei-mia-istoselida | Πόσο Κοστίζει μια Ιστοσελίδα το 2026; | – | Πόσο Κοστίζει μια Ιστοσελίδα; Τιμές Κατασκευής 2026 | κατασκευη ιστοσελιδων τιμη 200; πακετα 200; τιμες 150; 837 impr |
| 9 | `content/blog/poso-kostizei-to-seo.md` | /el/blog/poso-kostizei-to-seo | Πόσο Κοστίζει το SEO στην Ελλάδα; (2026) | – | Κόστος SEO 2026: Πόσο Κοστίζει το SEO στην Ελλάδα | κόστος seo 700; seo κόστος 200 |
| 10 | `src/data/services-i18n.ts` (local-seo city template, about line 660) | /el/services/local-seo/{city} | Τοπικό SEO ${city} \| Google Maps & Business Profile | – | SEO ${city} \| Τοπικό SEO & Google Maps | seo αθηνα 200; seo agency thessaloniki 150; seo υπηρεσίες θεσσαλονίκη 150 |
| 11 | `src/data/services-i18n.ts` (website-creation city template, about line 591) | /el/services/website-creation/{city} | Κατασκευή Ιστοσελίδων ${city} \| AnotherSEOGuru | – | Κατασκευή Ιστοσελίδων ${city} \| Τιμές & Πακέτα | κατασκευή ιστοσελίδων αθήνα 350; θεσσαλονίκη 300; πατρα 200 |
| 12 | `src/lib/seo/metadata.ts` (`buildIndustryServiceMetadata` / `elIndustryServiceTitleBase`: add an override for hotels + website-creation) | /el/solutions/hotels/website-creation | generic "… \| Στρατηγική" | Hotel Website Design in Greece: Booking Engine & SEO | Κατασκευή Ιστοσελίδων για Ξενοδοχεία \| Booking Engine & SEO | κατασκευή ιστοσελίδων για ξενοδοχεία 200/1; …ξενοδοχείων 150/0; hotel website design 500/9 |
| 13 | `content/blog/kataskevi-istoselidas-xenodoxeia.md` | /el/blog/kataskevi-istoselidas-xenodoxeia | Τι Πρέπει να Έχει η Ιστοσελίδα Ξενοδοχείου | – | Ιστοσελίδα Ξενοδοχείου: Τι Πρέπει να Έχει + Booking Engine (2026) | ιστοσελίδες ξενοδοχείων 150/49; κατασκευή ιστοσελίδας ξενοδοχείου 150 |
| 14 | `content/blog/seo-gia-xenodoxeia.md` | /el/blog/seo-gia-xenodoxeia (pos 19.5) | SEO για Ξενοδοχεία: Άμεσες Κρατήσεις | – | SEO για Ξενοδοχεία: Οδηγός & Υπηρεσίες για Άμεσες Κρατήσεις | υπηρεσίες seo για ξενοδοχεία 100; digital marketing για ξενοδοχεια 200 |
| 15 | `src/app/[locale]/platform/features/page.tsx` | /platform/features | SEO Platform Features: GSC Boost | Google Search Console Dashboard & SEO Tools \| GSC Boost | Dashboard Google Search Console & Εργαλεία SEO \| GSC Boost | google search console dashboard 200; reporting 200; tools 100 |
| 16 | `src/data/pricing-page-copy.ts` (EL `metaDescription`) | /el/pricing | Τιμές SEO & Κατασκευής Ιστοσελίδων 2026 \| Πακέτα | keep the title; add "από €…" price anchors to the meta description and to the first paragraph | – | τιμές seo 800; πακέτα seo |

Homepage (`src/app/[locale]/page.tsx`): keep EL "Εταιρεία SEO & Κατασκευή Ιστοσελίδων" (εταιρεια seo 300/KD0, κατασκευή ιστοσελίδων 1,100). EN "SEO & Web Design Agency in Greece" is fine.

Consultant page (`src/data/consultant-page.ts`): keep it. σύμβουλος seo shows 0 volume, while seo specialist 200 and seo consultant 150 are already in the title.

## 8. Method notes

- **Calls used:**
  - Keywords Explorer `matching-terms` (terms and questions, phrase mode, volume ≥10 filters)
  - `overview` for named seed lists
  - `serp-overview` for competitor and AIO checks
  - Site Explorer organic keywords and competitors
  - Ahrefs GSC endpoints (empty after 2025-11)
- **How rows were built:** they were deduplicated by keyword+country. Junk was filtered out: navigational queries for other brands, and unrelated "airbnb"/travel terms. Each row was assigned a cluster and target URL by rules and then checked against existing routes in `src/app/[locale]`, `content/blog` and `src/data/locations.ts`.
- **Not used:** the SEOTesting MCP failed with an invalid API key.
