# Current-state audit — 17 Oct 2026

Code findings are from `otouristas/websitecreation` at the commit this branch started from. Live verification is separate and was not treated as proof that production already shows the new prices.

## Domain → repo

| Domain | Repo | Evidence in this checkout | Live check |
| --- | --- | --- | --- |
| anotherseoguru.com | `otouristas/websitecreation` | `docs/brand/2026-10-13-handoff.md` says the Vercel production domain mapping was verified on 13 Oct 2026. This workspace is that repo. | Not re-checked against Vercel in this run. |
| app.anotherseoguru.com | `otouristas/gsc-gemini-boost` | Cited from this repo’s platform copy and `src/lib/app-links.ts` (default origin). | Not opened. |
| clients.anotherseoguru.com | Not named in this repo | No config, redirect or string `clients.anotherseoguru.com` under `websitecreation`. The owner brief says the portal likely lives in `gsc-gemini-boost` (`crm_clients`, `client_portal_members`, `PortalApp`). | Not verified. `gh api repos/otouristas/gsc-gemini-boost` returned 404 for this agent’s token, so the portal repo was not read. |

Do not merge the client host into the marketing site. Phase 1 changes only `websitecreation`.

## Prices before this branch

| Surface | File | Behaviour found in code |
| --- | --- | --- |
| Shared price list | `src/data/pricing.ts` | Website list 1500 / 2500 / 4000. Old offer field 1200 / 2000 / 3200 (20%). SEO list 500 / 900 / 1500 with offer 400 / 720 / 1200. `isOfferActive()` true only through 31 Aug 2026 23:59 Europe/Athens. On 17 Oct 2026 that helper is already false, so `currentPrice()` was returning list prices. |
| Estimator rates | `src/data/estimator-rates.ts` | Page caps 5 / 12 / 25. Second language was 35% of whatever base `currentPrice` returned, so a future discount would have reduced the language line. ±15% band. Booking was one €450 line. |
| Estimator maths | `src/lib/estimate/model.ts` | Visitor-facing plan copy has no currency. The brief still carries money. Defaults were track `both`, Growth SEO and a technical audit. |
| Pricing page | `src/app/[locale]/pricing/page.tsx` | Summer Offer pill and the sentence about 20% until 31 Aug 2026, gated by `isOfferActive()`. |
| Cards | `src/components/pricing/PriceCard.tsx` | Strike-through and “Summer Offer” while `isOfferActive()`. |
| Tokens | `resolvePriceTokens` | Homepage FAQ, location packs and service FAQ read `{{ENTRY_WEBSITE}}` and the other tokens at render. |
| Schema | `generateOfferCatalogSchema` | Net price, VAT excluded. Fallback was `tier.offer`, which would have been the retired 20% figure if a caller forgot `priceOf`. |
| llms.txt | `public/llms.txt` | Listed 1500 / 2500 / 4000 and “response within 24 hours”. |
| Support claims | kit trust line, get-started, ClosingCta | “24 hours” and «χωρίς δέσμευση» on agency surfaces. WhatsApp was an unscoped contact channel. |
| Software prices | `src/components/gsc-boost/plans.ts` | Unchanged. Not part of the build offer. |

## Claims grepped, and what this phase did

| Claim | Where it still appears | This phase |
| --- | --- | --- |
| 20% / 31 Aug 2026 | Removed from the pricing page. `isOfferActive()` remains only as the historical helper and is not used to price anything. | Done in code. |
| «δωρεάν προσφορά» | Still in many location, blog and metadata strings. Commercial CTAs on pricing cards, get-started metadata and the homepage offer use «Ζήτησε προσφορά». | Partial. Remaining hits are listed as follow-up, not silently rewritten across the city matrix. |
| 24/7 | Client-chatbot marketing in `el-home` services grid describes a chatbot the client might buy, not our support desk. | Left. Our desk copy no longer says 24/7. |
| «24 ώρες» | Consultant, SEO-guru and some audit widgets still promise a 24-hour audit reply via `RESPONSE_HOURS`. | Agency trust, get-started, closing CTA and llms contact line now say 2 business days for sales. The consultant pages were not bulk-edited. |
| «χωρίς δέσμευση» | Removed from get-started and the agency trust line. | Done on those surfaces. |
| Guaranteed rankings | Pricing FAQ already said no. New FAQ repeats no ranking, revenue or AI guarantee. | Done on the pricing FAQ. |
| Unlimited | New FAQ states two revision rounds. | Done. |

## Live verification

No production deploy, no Vercel alias change, no cache purge. Screenshots in the release report are from the local preview of this branch, not from anotherseoguru.com.
