# Website Launch Offer — campaign record

| Field | Value in code | Owner action |
| --- | --- | --- |
| campaign_id | `website-launch-offer` | Keep |
| status | `draft` | Set `active` only after the rows below are real |
| starts_at / ends_at | null | A single 30-day window in Europe/Athens. No per-visit countdown. |
| timezone | Europe/Athens | Keep |
| capacity_proposed | 5 | Confirm or replace. Not shown as a live count until verified. |
| capacity_total | null | The confirmed integer |
| capacity_verified_at | null | Timestamp of that confirmation |
| eligible_package_ids | starter, professional, business | Keep unless a package is pulled |
| discount_bps | 3000 | Build base only |
| terms_version | `draft-2026-10-17` | Replace when counsel signs the terms |
| reference_price_evidence | List prices in `pricing.ts`, this audit | Attach the price history you want cited |
| pricing_version | `2026-10-17` | Bump when cents change |

While status is draft, marketing surfaces show the proposed from-prices and the owner’s copy, scarcity says «Ζήτησε προσφορά και διαθεσιμότητα», and `canReserve` is false. Set `SHOW_PROPOSED_OFFER_WHILE_DRAFT` to false if those prices must stay off the site until activation.

A slot is reserved only by quote acceptance plus a confirmed deposit, with a capacity check, an expiry and an idempotency key. On expiry or sell-out the discount leaves the HTML, the estimator, forms and schema. Accepted snapshots keep their price and SEO months.

Scarcity sentence, only with verified remaining and total: «Απομένουν {remaining_slots} από τις {total_slots} θέσεις της προσφοράς.» Plus: «Η θέση επιβεβαιώνεται με αποδοχή προσφοράς και προκαταβολή. Η έναρξη του έργου προγραμματίζεται ξεχωριστά.»

Ended: «Η προσφορά ολοκληρώθηκε. Ζήτησε την τρέχουσα προσφορά για το έργο σου.»
