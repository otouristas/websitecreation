# Implementation map — phase 1

One price source: `src/data/pricing.ts` for the package ladders, with integer cents, VAT and the 30% formula in `src/data/commercial/money.ts`. The campaign record is `src/data/commercial/campaign.ts`. Care rates are `src/data/commercial/care.ts`. SEO Launch allowances are `src/data/commercial/seo-launch.ts`. All of those are re-exported from `pricing.ts` where callers already import prices.

`currentPrice()` applies the build discount only to website tiers, and only when `launchOfferView().discountApplies` is true. SEO retainers always return `regular`. `isOfferActive()` is not consulted.

The draft campaign presents the proposed from-prices (`SHOW_PROPOSED_OFFER_WHILE_DRAFT`) so the owner copy can be reviewed. It does not reserve a slot or publish a remaining-places count.

| Change | File |
| --- | --- |
| Offer strip | `src/components/commercial/LaunchOfferBanner.tsx` on the homepage, `/pricing`, and website `PriceTiers` |
| Package cards | `src/components/pricing/PriceCard.tsx` |
| Estimator | `src/lib/estimate/model.ts`, `src/components/commercial/WebsiteEstimator.tsx`, `POST /api/commercial/estimate` |
| SEO Launch page | `/[locale]/seo-launch` |
| Care page | `/[locale]/care` |
| Offer terms | `/[locale]/offer-terms` reads `docs/commercial/terms-draft.{el,en}.md` |
| Software notice | `/[locale]/platform/pricing` only. Plan prices untouched. |
| Sitemap | `src/app/sitemap.ts` adds the three paths. No new promo landing. |

Not in this phase: Stripe calls, portal tables, report PDFs, production data, ads, email sending. See the release report.
