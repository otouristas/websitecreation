# Phase 2 patch plan — client portal, payments, reports

Status: **not implemented, not merged, not deployed.** This file is the patch for `otouristas/gsc-gemini-boost` because that repo returned HTTP 404 for this agent’s token. Nothing here was applied to a database, Stripe, or production data.

`clients.anotherseoguru.com` does not appear in `otouristas/websitecreation`. Do not point that host at the marketing site. Confirm the deploy target inside `gsc-gemini-boost` (look for `crm_clients`, `client_portal_members`, `PortalApp`) before adding tables.

## Blocker

- Read and push access to `otouristas/gsc-gemini-boost` is missing (`gh api repos/otouristas/gsc-gemini-boost` → 404).
- Opening a pull request on `websitecreation` also failed with GitHub `must be a collaborator`. The phase 1 branch is pushed; this branch is the follow-up plan only.

## Do not touch

Existing SaaS contracts, plan prices, credit packs, OAuth provider settings, and client white-label brands. The portal must work without a software subscription. Entitlement keys to add, without changing how software billing is priced:

- `software_access`
- `client_portal_access`
- `included_seo_service`
- `care_minutes`

App copy to add, in Greek and English, on the software billing or account surface (not instead of a plan price):

> Η συνδρομή λογισμικού δεν περιλαμβάνει ανθρώπινη υλοποίηση SEO ή αλλαγές ιστοσελίδας, εκτός αν αναφέρεται ρητά σε ξεχωριστή συμφωνία υπηρεσιών.

> A software subscription does not include human SEO implementation or website changes, unless a separate services agreement says so explicitly.

The same sentence is already on the marketing page `/platform/pricing` in websitecreation. Do not change `src/data` SaaS plan figures there or in the app.

## Reuse, do not reprice

Port or import the pure functions already tested in websitecreation. Do not add a second price formula.

| Concern | Source |
| --- | --- |
| Cents, basis points, VAT, 50/30/20 | `src/data/commercial/money.ts` |
| Campaign draft / active / expired / sold out | `src/data/commercial/campaign.ts` (`launchOfferView`) |
| Slot reservation | `src/lib/commercial/capacity.ts` (`tryReserveSlot`, `cancelReservation`) |
| Snapshot, test-mode payments, signatures, counters, tenant check | `src/lib/commercial/ledger.ts` |
| SEO month calendar, pause, DST | `src/lib/commercial/seo-program.ts` |
| Care rates and support window | `src/data/commercial/care.ts` |
| SEO Launch months and the included phrase | `src/data/commercial/seo-launch.ts` |
| Report fields | `docs/commercial/report-specification.md` |

`applyPayment` currently accepts `provider: 'test'` only. When the app’s existing verified provider is wired, keep that check server-side, require a verified flag, and ignore duplicate event ids. Do not store card numbers. Bank transfer counts only after a human or provider verification flag is true.

## Inspect before migrating

Open the app schema first. Add a table only when the equivalent does not already exist. Prefer columns on the existing client/project tables over a parallel CRM. Suggested names below are the contract, not a command to create duplicates.

Every row that holds a client’s commercial data carries `tenant_id` (the CRM client id already used by `crm_clients` / `client_portal_members`). Queries filter by that id in the database policy, not only in the UI. A member of tenant A must get an empty result or 404 for tenant B, including file URLs.

### catalog_versions

`pricing_version` text primary key (`2026-10-17`), `published_at`, `build_discount_bps` (3000), `vat_bps_gr` (2400), package rows (id, list_cents, included_pages, seo_launch_months, auto_renew false). Historical versions are immutable.

### campaigns and reservations

Columns matching `LaunchCampaign`: `campaign_id`, `status` (`draft|active|expired|sold_out`), `starts_at`, `ends_at`, `timezone`, `window_days`, `capacity_total` null until verified, `capacity_verified_at`, `eligible_package_ids`, `discount_bps`, `terms_version`, `reference_price_evidence`, `pricing_version`.

`capacity_total` stays null and `capacity_verified_at` stays null until the owner confirms the proposed 5. Do not seed a live count.

`offer_reservations`: `id`, `tenant_id`, `campaign_id`, `quote_id`, `idempotency_key` unique, `state` (`held|confirmed|expired|cancelled`), `expires_at`, `quote_accepted_at`, `deposit_confirmed_at`. Insert of a hold is one transaction that locks the campaign row, counts held+confirmed reservations that have not expired, and refuses when `reserved >= capacity_total` or capacity is unverified. The same idempotency key returns the existing row.

A slot is confirmed only when quote acceptance and a verified deposit both exist. Expiry or sell-out sets the campaign so `launchOfferView` turns the public discount off. Accepted snapshots are not rewritten.

### proposals, items, agreements

`proposals`: `id`, `tenant_id`, `project_id`, `pricing_version`, `campaign_id`, `status` (`draft|issued|accepted|expired|superseded`).

`proposal_items`: `proposal_id`, `kind` (`build_base|build_discount|extra_page|language_structure|translation|booking_link|booking_provider|custom_app|hosting|licence|care|paid_seo|seo_launch`), `net_cents` (null when quoted and not priced), `discount_bps` (0 except `build_base`’s negative sibling `build_discount`). SEO Launch lines store months and 0 net cents, with the phrase «περιλαμβάνεται στην προσφορά, χωρίς επιπλέον χρέωση», never a “worth €X” amount.

`agreements`: written when the client accepts. Stores the `AcceptedSnapshot` fields as columns, plus `snapshot_json` that is never updated. The client gets a copy (portal page plus the email template in `docs/commercial/email-templates.el-en.md`, unsent until the owner sends it). Later catalog edits do not change `net_cents`.

### requests and change orders

`service_requests`: `project_id`, `tenant_id`, `category` (`implementation_bug|build_change|seo_launch|care|extra_work|new_feature`), `urls` text[], `requester_member_id`, `state`.

States, in order: `new` → `evaluating` → `waiting` → `scheduled` → `in_progress` → `in_review` → `done`. Greek labels for the portal: νέο, αξιολόγηση, αναμονή, προγραμματισμένο, σε εξέλιξη, προς έλεγχο, ολοκληρωμένο.

One approver per project, plus delegate member ids. Out-of-scope work (`extra_work`, `new_feature`, and a `build_change` after the two revision rounds) becomes a `change_orders` row that stays blocked until the approver accepts a priced snapshot. An AI suggestion may fill a draft; it must not set `accepted`.

Attachments go to private storage. The portal issues a short-lived signed URL. Reject password fields. The official queue is email and the portal. An auto-acknowledgement is not a first response.

`counterFor` in `ledger.ts` decides the hour bucket: SEO Launch, Care, or non-billable (implementation bug, in-round build change, admin, our own bug).

### time entries and entitlements

`time_entries`: `tenant_id`, `project_id`, `request_id` nullable, `bucket` (`seo_launch|care|non_billable`), `minutes` (actual, not rounded up inside a package), `started_at`, `note`, `actor_id`. Care inside a package has no per-ticket minimum. Extra work outside a package uses `extraWorkCents`: 30 minutes = 4000 cents, then 15-minute steps at 8000 cents/hour.

`care_entitlements`: `plan_id` (`technical-care|care-plus|partner` or none), `period_start`, `period_end`, `included_minutes`, `consumed_minutes`. No rollover, except a documented row where the delay was ours. Alert when consumed ≥ 80% and again before zero. Overage needs a new accepted change order.

`seo_programs`: `project_id`, `months_purchased` (0, 3 or 6), `auto_renew` false, `market`, `language`, `started_at` null until go-live and access, `paused_days`, `ended_at`. Client delay adds a `seo_program_pauses` row and extends the end date. Our delay does not. Month 1 is baseline, tracking, targeting map. Use `athensCivilDate` / `addCalendarMonths` so a 31st and the Europe/Athens DST weekends do not shift the civil date.

Notices at 30 and 7 days are optional rows in `notice_log` with a unique `(program_id, kind)` so they cannot send twice. Do not send them from this plan.

### payments and audit

`payments`: `id` unique from the provider event, `tenant_id`, `agreement_id`, `amount_cents`, `kind` (`deposit|instalment|balance`), `provider` (the existing one), `verified`, `test_mode` true until the owner turns it off. Webhook handler checks the signature with the existing secret, compares the amount to the server installment, and is idempotent on event id. Reject CSRF on browser posts. Rate-limit public quote endpoints the way `consumeRate` does.

`audit_events`: append-only `tenant_id`, `actor_id`, `action`, `entity`, `at`, `diff` without card data, passwords, or raw tokens.

### report snapshots

`report_snapshots`: `kind` (`seo|care|combined`), `period_start`, `period_end`, `freshness_at`, `payload_json`, `partial_month` boolean. Combined only when the client has both an SEO program and a care entitlement in that period. SEO payload: tasks with URLs, before/after, GSC clicks, impressions, CTR = sum(clicks)/sum(impressions), weighted position, next step. Omit GA4 until the property is verified. Do not zero-fill missing days and do not add an AI-visibility number. Care payload: limit, minutes per task, exceptions, extras, balance. HTML plus print stylesheet. Keep these URLs out of every sitemap and behind the tenant check.

Admin totals, when a real cost feed does not exist: contract value ex-VAT, collected, owed, planned vs actual minutes, committed capacity. Show revenue per hour from collected ÷ actual billable minutes, and label it as that, not as margin.

## Public site already done

Phase 1 on `cursor/website-launch-offer-phase-1-a6fd` renders the offer, validates `POST /api/commercial/estimate`, and keeps the campaign in draft. Phase 2 must not fork those numbers. When a reservation is confirmed or the campaign is sold out, the public site should read campaign status from the same record the portal writes (a later, explicit sync). Until that sync exists, the marketing site stays on the in-repo draft record.

## Rollback

This document changes no runtime behavior. Deleting the file is the rollback. Do not run a migration from it until the app schema has been read and the owner has confirmed capacity, dates, and legal review of `docs/commercial/terms-draft.el.md` and `terms-draft.en.md`.
