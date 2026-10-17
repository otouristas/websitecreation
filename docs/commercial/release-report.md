# Release report — websitecreation, phase 1

## Status words

| | |
| --- | --- |
| Implemented | In this branch, not on `main` |
| Merged | No |
| Deployed | No |
| Live-verified | No. Local preview only, if the release notes include screenshots. |

## Repo

`otouristas/websitecreation`. Branch `cursor/website-launch-offer-phase-1-a6fd`, commit `6f64b51` (plus this report update). Pushed to origin.

Pull request: not opened. The GitHub API refused with `must be a collaborator` (`https://docs.github.com/rest/pulls/pulls#create-a-pull-request`). A collaborator can open it from https://github.com/otouristas/websitecreation/pull/new/cursor/website-launch-offer-phase-1-a6fd against `main`. No Vercel preview URL exists until that pull request is created.

`otouristas/gsc-gemini-boost` was not readable (`gh` 404). No portal migration, no SaaS price edit, no second pull request. The app notice is on the marketing page `/platform/pricing` only.

## What landed

Shared pricing version `2026-10-17`. Website from-prices 1050 / 1750 / 2800 net while the draft offer is presented. SEO retainers unchanged. Estimator shows base, discount, undiscounted extras, included SEO Launch, optional monthly lines unchecked, net, VAT, payable, deposit and 50/30/20. VAT treatment for Greece, EU B2B reverse charge and non-EU. Campaign stays draft: no slot count, no reservation. Pages `/seo-launch`, `/care`, `/offer-terms`. Owner copy on the strip, hero, Professional card and Business card. Terms drafts marked requires legal review, without an invented tax number, company form or court. llms.txt states the draft status and forbids “free SEO worth €X”.

## Tests

Recorded 17 Oct 2026 on this branch, after the pricing and copy edits.

| Command | Result |
| --- | --- |
| `npx tsx scripts/commercial-selftest.mts` | Passed. Covers base-only 30% (1050/1750/2800), VAT 1302/2170/3472, reverse charge and non-EU at 0 Greek VAT, instalments 525/315/210, 875/525/350, 1400/840/560, SEO retainers staying at list even inside the old 31 Aug 2026 window, extras undiscounted, band floor not below the package base, draft/active/expired/sold-out/unknown capacity, last-slot race, idempotent reservation, cancel, grandfathered snapshot, duplicate and unverified payments, tampered amount, PII rejection, signature, rate limit, the three counters, cross-tenant, notice dedupe, month-end, leap day, Athens DST dates, client pause vs our delay, care minimum and 15-minute step. |
| `npx tsx scripts/audit-selftest.mts` | 84/84 passed. Entry tier 1050, VAT 1302, 30 pages = 3700. |
| `npx tsc --noEmit` | Passed. |
| `npm run lint` | Exit 1. Zero errors. Fifteen warnings, all in files this change did not introduce (`generate-portfolio-case-studies.mjs`, `validate-portfolio-case-studies.mjs`, industry service page, Footer payment `<img>`, `solutions-ui.ts`, `blog.ts`, `seo-guides.ts`). ESLint is configured with `--max-warnings 0`. The commercial modules, estimator, pricing page, SEO Launch, care and offer-terms pages lint clean. |
| `npm run build` | Passed. Next.js 16.3.1 compiled and generated 1876 static pages, including `/el` and `/en` for pricing, seo-launch, care and offer-terms, plus `POST /api/commercial/estimate`. |

Browser check on local `next dev` (port 8080), cookies declined, 360 / 390 / 768 / 1440, light and dark. Document scroll width matched the viewport at each width. The offer strip, owner hero and the three cards rendered the specified Greek strings, including net, VAT and totals 1.302 / 2.170 / 3.472. Scarcity copy is the ask sentence, not a slot count. Screenshots are local artifacts, not committed.

Not run: a production Vercel preview, cache purge, signed payment webhooks against a live provider, and cross-browser checks beyond Chromium.

## Preview

Local `next dev` on port 8080 only. No Vercel preview URL, because the pull request was not created. Not production. Not merged. Not deployed. Not live-verified on anotherseoguru.com.

## Migrations and config

None. No environment variable is required for the draft presentation. Turning the offer off without deleting copy is `SHOW_PROPOSED_OFFER_WHILE_DRAFT = false` in `src/data/commercial/campaign.ts`. Activation still needs real `starts_at`, `ends_at`, `capacity_total`, `capacity_verified_at` and a terms version that has had legal review.

## Rollback

Revert the branch. Prices fall back with the previous `pricing.ts`. No database migration to undo.

## Explicitly not done

Portal models, test-mode card payments, bank-transfer verification, private report HTML, production emails, ads, cache purge, changes to SaaS plan prices, OAuth, white-label brands, or `clients.anotherseoguru.com`.
