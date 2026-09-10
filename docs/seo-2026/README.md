# Organic + AEO/GEO programme — baseline, decisions, roadmap

Written 2026-09-10 against `claude/anotherseoguru-seo-overhaul-ww6pfa`.

This is the record of what the codebase actually looked like, what changed, and
what is left. It is meant to be read before the next round of work, so nobody
re-derives the same findings or undoes a decision without knowing why it was
made.

Companion documents already in the repo, all still authoritative:

- `docs/greek-style-guide.md` — every Greek string must follow it.
- `docs/keyword-research/greek-seo-cluster-2026-07-23.md` — Ahrefs GR volumes.
- `docs/keyword-research/gsc-baseline-2026-08-04.md` — real Search Console data.
- `seo-qa/` — the previous round's indexability and programmatic-quality work.

---

## 1. Where the site actually stands

From `docs/keyword-research/gsc-baseline-2026-08-04.md`, 16 months to
2026-08-02:

| Metric | Value |
|---|---:|
| Clicks | 74 |
| Impressions | 23,648 |
| CTR | 0.31% |
| Average position | 42.6 |
| Greece clicks / CTR | 67 / 0.89% |
| US clicks / CTR | 2 / 0.02% |

Two things follow, and they shaped every decision below.

**Greece converts and everything else does not.** Greece is 90% of clicks from
32% of impressions. The US produced 9,123 impressions and 2 clicks. Adding
international programmatic surface has repeatedly cost impressions and returned
nothing.

**The problem is not coverage, it is that the pages are thin.** The site had
1,697 indexable URLs and 74 clicks. `/el/blog/poso-kostizei-mia-istoselida`
holds 762 impressions at position 65; `/el/blog/kataskevi-eshop-odigos` holds
1,245 at position 31. The demand is already arriving. It lands on
1,000-word pages that do not deserve to win.

So the work is: **stop shipping pages that cannot win, fix what is untrue, and
deepen the pages that already have demand.** Not more URLs.

---

## 2. What changed on this branch

### Truthfulness (highest priority — these were live)

| Defect | Scale | Fixed by |
|---|---|---|
| Expired promo prices sitewide while /pricing showed the real ones | 20+ surfaces, ~40% below list | `entryWebsiteNet()`/`entrySeoNet()` + `{{TOKEN}}` resolution |
| Blog quoting €299/€599/€999 under tier names that do not exist | 173 figures, 30 of 71 posts | tokens + tier renames |
| "500+ websites", "98% satisfaction", "50+ industries", "55+", "73", "5 markets", "15+ tools", Canada/Australia/Ireland | homepage, /about, /work, Organization schema | derived from `company-facts.ts` / removed |
| Invented case metrics on /get-started ("Page 1 Position 1", "4.8%-8.2%", "0% χαμένοι πελάτες") | both locales | rewritten as process, no promised numbers |
| A parked for-sale domain featured on the homepage with a "View live site" button | `greececyclades.com` | `liveStatus: 'offline'`, excluded from featured, link disabled |

### Technical

| Defect | Scale |
|---|---|
| Every blog post reported the build date as `datePublished`/`dateModified`/`lastmod` | 71 posts |
| Industry, industry×service and case-study pages restamped their dates every ISR pass | ~950 URLs |
| Sitemaps stamped request time as `lastmod` on every fetch | ~2,700 URLs |
| 480 indexed, sitemapped EN URLs with zero authored English (gated on the *Greek* pack) | 480 URLs |
| 15 meta descriptions shipping amputated mid-phrase | 15 posts |
| FAQ answers absent from server HTML while `FAQPage` schema asserted them | 99 URLs |
| `FAQPage` duplicated across programmatic templates for a rich result an agency cannot earn | ~2,600 URLs |
| `/el/compare` 308'd into a 404 | 1 route |
| Slug redirects placed after `/blog/:path*` and therefore unreachable | 2 rules |
| Hamburger rendered outside the viewport at 320/360/375px | all mobile |

### Content and linking

- Four hotel-SEO URLs consolidated into two, unique material merged, 301s in place.
- `techniko-seo` ↔ `technical-seo-guide` paired; the Greek technical-SEO post had no hreflang at all.
- Local SEO became its own pillar; four posts were filed under `search-console-mastery`.
- Footer stopped linking noindex US city pages and stopped labelling `/contact` four different ways; a Platform column took seven BOFU pages from 1-2 inbound links to sitewide.
- `/compare` hub created.
- **New:** `/[locale]/seo-services`, the commercial pillar for «SEO για επιχειρήσεις».

---

## 3. Keyword universe (Phase 3)

Volumes are Ahrefs GR from the existing research doc. Blank = no reliable GR
volume; included because GSC shows impressions or the intent is commercially
obvious.

### A. Core transactional — websites

| Query | Vol GR | Owner |
|---|---:|---|
| κατασκευή ιστοσελίδων / ιστοσελίδας | — | `/el/services/website-creation` |
| κατασκευή ιστοσελίδων Αθήνα | 73 imp (GSC) | `/el/services/website-creation/athens-gr` |
| κατασκευή e-shop | 139 imp (GSC) | `/el/services/eshop-woocommerce` |
| δημιουργία / σχεδιασμός ιστοσελίδας | — | website-creation hub (secondary) |
| ανασχεδιασμός ιστοσελίδας | — | `/el/services/website-redesign` |

### B. Core transactional — SEO

| Query | Vol GR | KD | Owner |
|---|---:|---:|---|
| υπηρεσίες SEO | 400 | 1 | **`/el/seo-services`** (new) |
| εταιρεία SEO | 300 | 1 | **`/el/seo-services`** |
| προώθηση ιστοσελίδων seo | 200 | 2 | **`/el/seo-services`** |
| seo υπηρεσιες (variants) | 150-300 | — | **`/el/seo-services`** |
| τοπικό SEO / local seo | 80 | 70 | `/el/services/local-seo` |
| τεχνικό seo | 100 | — | `/el/blog/techniko-seo` → **needs a commercial owner** |
| seo audit | 150 | 82 | `/el/services/seo-audits` |
| SEO Θεσσαλονίκη | 140 imp | — | `/el/services/local-seo/thessaloniki-gr` |
| SEO Αθήνα | 51 imp | — | `/el/services/local-seo/athens-gr` |

### C. Commercial investigation

| Query | Vol GR | Owner |
|---|---:|---|
| τιμές seo | 700 | `/el/pricing` + `/el/blog/poso-kostizei-to-seo` |
| κόστος seo | 600 | same |
| πόσο κοστίζει μια ιστοσελίδα | 116 imp | `/el/blog/poso-kostizei-mia-istoselida` |
| SEO ή Google Ads | — | `/el/blog/seo-i-google-ads` |
| WordPress ή custom / Next.js | — | **missing** |
| SEO agency ή freelancer | — | **missing** |

### D. Problem-aware

| Query | Owner |
|---|---|
| γιατί δεν εμφανίζεται η ιστοσελίδα μου στη Google | **missing** — strongest AEO candidate in the set |
| πώς να βγω πρώτη σελίδα Google | partial (`seo-gia-arxarious`) |
| πόσο χρόνο χρειάζεται το SEO | answered on `/el/seo-services`; no post owns it |
| τι περιλαμβάνει μια σωστή υπηρεσία SEO | now `/el/seo-services` |

### E. Industry

Covered: ξενοδοχεία, rent-a-car, εστιατόρια, δικηγόροι, οδοντίατροι,
γυμναστήρια, μεσιτικά. Missing: **SEO για e-shop** (the build guide exists,
the SEO guide does not) and an umbrella **SEO για τουριστικές επιχειρήσεις**.

### F. AI search / GEO / AEO

| Query | Owner |
|---|---|
| geo agency ελλάδα | `/el/blog/geo-agency-ellada` — 145 imp, pos 13.9, the site's best non-brand position |
| GEO vs SEO vs AEO | `/el/blog/geo-vs-seo-vs-aeo-el` |
| τι είναι το GEO / AEO | **defined in 7 posts, owned by none** |
| Google AI Overview | **mentioned in 25 of 71 posts, defined by none** |
| πώς εμφανίζομαι στο ChatGPT | **missing as a page** |
| fan-out queries | **zero occurrences in the corpus** |

---

## 4. Fan-out map (Phase 4)

For the two seeds that matter, mapped to a destination. `SECTION` means it
belongs inside an existing page, not on a new URL — most fan-outs do.

### Seed: κατασκευή ιστοσελίδας

| Fan-out | Destination | Status |
|---|---|---|
| τιμές / κόστος | `/el/blog/poso-kostizei-mia-istoselida` | exists |
| χρόνος παράδοσης | SECTION on website-creation | exists |
| WordPress vs custom | NEW POST | missing |
| WordPress vs Next.js | NEW POST | missing |
| SEO-ready από την αρχή | SECTION on the pillar + `/el/services/seo-web-design` | thin |
| hosting / domain | `/el/blog/web-hosting-domain-odigos` | exists |
| συντήρηση | SECTION on pricing (add-on) | exists |
| Core Web Vitals | `/el/services/speed-optimization` | thin |
| e-commerce | `/el/services/eshop-woocommerce` | exists |
| portfolio / παραδείγματα | `/el/work` | exists |
| agency vs freelancer | NEW POST | missing |
| redesign / migration | `/el/blog/anasxediasmos-istoselidas` | exists |
| τι να ζητήσω πριν πληρώσω | SECTION, split across two pricing posts | consolidate |

### Seed: SEO για επιχειρήσεις

| Fan-out | Destination | Status |
|---|---|---|
| κόστος | `/el/seo-services` §pricing + `/el/blog/poso-kostizei-to-seo` | done |
| χρόνος αποτελεσμάτων | `/el/seo-services` FAQ | done |
| deliverables | `/el/seo-services` §includes | done |
| technical SEO | `/el/blog/techniko-seo` | needs a commercial owner |
| local SEO | `/el/services/local-seo` | exists |
| content | `/el/blog/on-page-seo` (EN-heavy) | thin in EL |
| links | `/el/blog/off-page-seo` | exists |
| Google Business Profile | `/el/services/local-seo` | exists |
| Search Console | EN only | EL gap |
| keyword research | `/el/blog/lexeis-kleidia-seo` | exists |
| ROI / leads | `/el/seo-services` §choosing | done |
| AI Overviews / ChatGPT / AEO / GEO | `/el/services/ai-visibility` (276 words) | **thin, and four blog posts outrank it** |
| επιλογή agency / red flags | `/el/seo-services` §choosing | done |
| case studies | `/el/work` | exists, no metrics |

---

## 5. What to do next, in order

### P0 — finish what this branch started

1. **`/el/services/ai-visibility` is 276 words** and competes with four Greek
   blog posts on the same terms. It is the commercial destination for the one
   cluster where the site already ranks (`geo agency ελλάδα`, position 13.9).
   Rebuild it to the shape of `/el/seo-services`.
2. **Own «τι είναι το GEO» and «τι είναι το AEO».** Seven posts define them in
   parallel, so no page can win either. One definitional page each, and the
   other six link to it instead of redefining.
3. **Own «Google AI Overview».** Named in 25 of 71 posts, defined by none.

### P1 — the demand that is already arriving

4. **Deepen `/el/blog/poso-kostizei-mia-istoselida`** (762 impressions, position 65)
   and **`kataskevi-eshop-odigos`** (1,245 impressions, position 31). Both are
   ~1,000 words against queries worth 600-700/mo. Position 65 is what a
   1,000-word page earns.
5. **Write «Γιατί δεν εμφανίζεται η ιστοσελίδα μου στη Google».** No page owns
   it, it is a question a business owner types verbatim, and it is the best
   answer-engine candidate in the set.
6. **SEO για e-shop.** The build guide exists; the SEO guide does not, and
   `/el/services/eshop-seo` is 201 words.

### P2 — structural

7. **The industry axis is 8-10 words per page.** `getServiceAngle()` and
   `getServiceFaqs()` take no industry argument, so 744 industry×service pages
   differ by a `painPoints.join(' ')`. Either author a real industry axis or
   cut the tier-D routes; noindexing a Cartesian product still costs crawl.
8. **`src/lib/linking/hub-spoke.ts` declares a three-cluster architecture that
   nothing imports.** The dead code is a correct description of what the site
   should link like. Wire it up or delete it.
9. **No person exists on this site.** Zero `Person` schema, no author bios, no
   team page; `/about` is 277 lines with no names. For a site selling expertise
   that is the inverse of what E-E-A-T rewards.

### Deliberately not done

- **No new city pages.** 540 Greek service×location URLs already carry ~14
  authored words each. Adding more makes the average worse.
- **No `aggregateRating` / `Review` schema.** The homepage renders a hardcoded
  five-star row above three testimonials with no source, date or consent
  record. Marking that up is a self-serving-review violation. Get written
  consent and a real source, or pull the block — do not schema it.
- **No claimed client outcomes.** All 71 case studies are template-assembled and
  no traffic, ranking, booking or revenue figure is recorded for any of them.
  The honest claim shape is "we built this, in this market, for this keyword".
- **No promise of AI citation.** Optimisation makes content citable. It does not
  make any engine cite it, and no page on the site now says otherwise.
