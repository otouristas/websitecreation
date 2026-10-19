# Greek Copy Style Guide (AnotherSEOGuru)

The Greek site must read as written by a native professional, not machine-translated. Apply this to every `el` string.

## Keep in English (universally accepted in Greek tech/marketing)
`SEO, GEO, AEO, Google, Google Search Console, Google Business Profile, Google Analytics, WordPress, WooCommerce, e-shop, schema, backlink(s), link building, Core Web Vitals, hosting, domain, blog, chatbot, landing page, AI, LLM, ChatGPT, Perplexity, Gemini, rent-a-car, travel AI, Booking, OTA, on-page, mobile-first, portfolio, ROI, leads` (leads acceptable but prefer «αιτήματα πελατών» in body copy), `rich snippets, JSON-LD, CRO, digital PR`.

### SEO and Google terms: never translate
Greek SEOs use the English term. A literal translation («Γράφος γνώσης», «ανίχνευση», «Σύνοψη AI», «δομημένα δεδομένα») reads as machine-translated. Keep the English term and put Greek grammar around it («το crawl», «κάνει crawl», «ο crawler», «τα structured data»):

- Google products and tools: Search Console, Google Analytics, GA4, Google Business Profile, Merchant Center, PageSpeed Insights, Looker Studio, URL Inspection, Google Ads
- Results-page features: Knowledge Graph, Knowledge Panel, Featured snippet, People Also Ask, AI Overview, AI Mode, Local pack, Map pack, Top stories, Sitelinks, rich results, rich snippets, SERP
- Technical SEO: crawl / crawler / crawling, crawl budget, Core Web Vitals, LCP, INP, CLS, TTFB, structured data, schema, JSON-LD, sitemap, robots.txt, llms.txt, canonical, hreflang, noindex, nofollow, Open Graph
- On-page and links: meta description, title tag, backlinks, anchor text, referring domains, domain rank, keyword gap, E-E-A-T, long-tail, landing page, CTR, content brief

A glossary entry may show a Greek gloss in brackets after the English term («Crawling (ανίχνευση)»); body copy never uses the gloss on its own. `npm run check:greek` fails on the common literal translations. The product app enforces the same list in `gsc-gemini-boost/src/lib/i18n/glossary.ts`.

Not every match is the SEO term: «σελίδες προορισμού» on tourism pages means travel-destination pages, and «ανιχνευτές» for the opportunity engine means detectors. Those stay Greek.

## Always translate (do NOT leave in English)
| English | Professional Greek |
|---|---|
| Custom / custom design | στα μέτρα σας / εξατομικευμένο |
| Responsive / mobile-first responsive | προσαρμοσμένο σε όλες τις οθόνες |
| Performance audit | έλεγχος επιδόσεων |
| Site architecture | αρχιτεκτονική ιστοσελίδας |
| Internal linking strategy | στρατηγική εσωτερικών συνδέσμων |
| Meta optimization | βελτιστοποίηση meta ετικετών |
| Brand kit / guidelines | κιτ / οδηγός εταιρικής ταυτότητας |
| Conversion rate / copy | ποσοστό μετατροπής / κείμενα που μετατρέπουν |
| Content hubs | θεματικοί κόμβοι περιεχομένου |
| Organic traffic | οργανική επισκεψιμότητα |
| Case studies | μελέτες περίπτωσης / έργα |
| Included | περιλαμβάνεται |
| Global markets | διεθνείς αγορές |
| Done-for-you | ολοκληρωμένη υπηρεσία |
| Insights | άρθρα / γνώση |
| Project | έργο |
| Launch / go-live | δημοσίευση |
| Brief (a client's project brief) | ενημέρωση (a content brief, the SEO deliverable, stays «brief») |
| Onboarding | οδηγός έναρξης |
| UK / US / Canada | Ηνωμένο Βασίλειο / ΗΠΑ / Καναδάς |

## Never use Greeklish (Greek roots in Latin, or Latin verbs with Greek endings)
- ❌ `rankάρουν`, `κλικάρουν`, `ποστάρουν`, `σεταπ` → ✅ `κατατάσσονται ψηλά / ανεβαίνουν στη Google`, `κάνουν κλικ`, `δημοσιεύουν`, `ρύθμιση`.

## Punctuation
- No em dashes (U+2014) and no spaced en dashes. Rewrite with a comma, colon, full stop or parentheses; `npm run check:no-em-dash` enforces this.
- Greek question mark is `;` (already correct in FAQ questions).

## Consistency
- Spell it `e-shop` (not `eshop`).
- Use `Google Business Profile` (not `GBP`) in body copy.
- Feature bullet lists must be 100% Greek (no half-English lists) except the accepted terms above.
