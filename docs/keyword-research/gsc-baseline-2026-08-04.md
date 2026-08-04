# GSC Baseline — anotherseoguru.com (2026-08-04)

> Export: `https___anotherseoguru.com_-Performance-on-Search-2026-08-04.xlsx`  
> Window: **Last 16 months** (2025-04-03 → 2026-08-02), Search type = Web  
> Companion: [gsc-baseline-2026-07-23.md](./gsc-baseline-2026-07-23.md) · Ahrefs proxy (no Semrush MCP)

## Snapshot

| Window | Clicks | Impressions | CTR | Avg pos |
|---|---:|---:|---:|---:|
| Last 28d | 27 | 15,297 | 0.18% | 35.7 |
| Last 90d | 28 | 19,239 | 0.15% | 29.9 |
| Last 180d | 36 | 21,608 | 0.17% | 42.2 |
| All 16mo | 74 | 23,648 | 0.31% | 42.6 |

| Geography | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Greece | 67 | 7,559 | 0.89% |
| United States | 2 | 9,123 | 0.02% |
| UK | 1 | 1,260 | 0.08% |

| Device | Clicks | Impressions | CTR |
|---|---:|---:|---:|
| Desktop | 37 | 18,583 | 0.20% |
| Mobile | 37 | 4,746 | 0.78% |

**Ahrefs (2026-08-01):** DR 20 · ~1 tracked KW · ~14 organic traffic · 363 live referring domains. Trust GSC over Ahrefs index for this domain.

**Verdict:** Greece converts; US thin pSEO burns impressions. Homepage CTR is the bottleneck (7,555 imps / 0.37% CTR). Vanity `seo guru` titles retired in moonshot deploy.

## Protect (already converting)

| Page / query | Signal |
|---|---|
| `/` homepage | 28 clicks / 7,555 imps / pos 33.5 — rewrite titles (done) |
| `geo agency ελλάδα` → `/el/blog/geo-agency-ellada` | 4 clicks / 145 imps / pos 13.9 |
| `seo για ξενοδοχεία` | 2 clicks / 118 imps / pos 24.8 |
| `/blog/google-search-operators-2026` | 3 clicks / 251 imps / pos 16.4 — slug updated 2026 + redirect from -2025 |
| `/el/services/local-seo/rethymno-gr` | 2 clicks / pos 9.2 |
| `/el/services/local-seo/mykonos-gr` | 1 click / pos 4.8 |
| `/about` | 4 clicks / pos 2.9 |

## Opportunity queries (push to top 10)

| Query | Imps | Pos | CTR | Action |
|---|---:|---:|---:|---|
| κατασκευη/κατασκευή eshop (+variants) | 139+ | 25–31 | 0% | E-shop guide + service hub |
| ποσο κοστιζει μια ιστοσελιδα | 116 | 37 | 0% | Cost blog + `/el/pricing` |
| ποσο κοστιζει το seo | 108 | 36 | 0% | Cost blog + pricing FAQ |
| seo θεσσαλονικη | 140 | 37 | 0% | Local SEO Thessaloniki page |
| seo αθηνα | 51 | 32 | 2% | Local SEO Athens |
| κατασκευή ιστοσελίδων αθήνα | 73 | 45 | 0% | Website-creation Athens |
| seo για ξενοδοχεία | 118 | 25 | 1.7% | Hotel SEO blog |
| geo agency ελλάδα | 145 | 14 | 2.8% | Deepen to top 5 |

## High-impression pages (pre-moonshot)

| Page | Imps | Pos | CTR | Priority |
|---|---:|---:|---:|---|
| `/` | 7,555 | 33.5 | 0.37% | Title/H1 rewrite |
| `/el/blog/kataskevi-eshop-odigos` | 1,245 | 31 | 0% | CTR + commercial links |
| `/el/blog/poso-kostizei-mia-istoselida` | 762 | 65 | 0% | Title + pricing links |
| `/el/blog/poso-kostizei-to-seo` | 496 | 51 | 0.2% | Title + pricing links |
| `/en/services/website-redesign/sydney-au` | 412 | 64 | 0% | Noindex (pruned) |
| `/en/services/local-seo/toronto-ca` | 326 | 57 | 0% | Noindex (pruned) |
| `/el/services/local-seo/thessaloniki-gr` | 229 | 18 | 0% | Striking distance |
| `/el/services/website-creation/athens-gr` | 225 | 47 | 0% | Deepen + FAQ |
| `/el/pricing` | 98 | 59 | 0% | Meta + FAQ schema |

## Moonshot changes shipped (2026-08-04)

1. Homepage EN/EL titles — kill `seo guru` vanity; align H1 + meta with brand + commercial offer.
2. CTR rewrites on EL money blogs + pricing meta.
3. EN location allowlist pruned to `london-uk` only (+ GR cities via content packs); US/AU/CA noindex + out of sitemaps.
4. `robots.txt` — single `sitemap-index.xml` entry.
5. Athens/Thessaloniki EL packs deepened (FAQs + serviceDepth).
6. Glossary dead blog links remapped; operators guide slug → `google-search-operators-2026`.
7. Hub-spoke money links: pricing ↔ cost blogs ↔ services ↔ work.

## Success gates (28-day rolling)

1. Homepage CTR **> 1.5%** (from 0.37%).
2. Greece clicks **≥ 80 / 28d** (from ~27).
3. `/el/blog/kataskevi-eshop-odigos` CTR **> 1%** or pos **≤ 15**.
4. `geo agency ελλάδα` pos **≤ 8**.
5. US thin-page impressions declining after noindex.

## Weekly checklist

1. Re-export GSC Queries + Pages + Countries (last 28 days + last 6 months).
2. Diff clicks/CTR on homepage, pricing, e-shop guide, GEO hub, Athens/Thessaloniki.
3. Count `/get-started` submissions + WhatsApp taps in GA4.
4. Confirm pruned US URLs drop from coverage / impressions.
5. Optional: fold Semrush Position Tracking CSV if exported (no Semrush API in stack).
