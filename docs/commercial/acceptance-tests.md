# Acceptance tests

Automated in `scripts/commercial-selftest.mts` (`npm run test:commercial`):

- 1050 / 1750 / 2800 and gross 1302 / 2170 / 3472
- Discount formula on the base only; ecommerce extra stays 1200
- Instalments 525/315/210, 875/525/350, 1400/840/560, remainder on the last invoice
- SEO retainers stay 500 / 900 / 1500 even inside the old summer window
- 3 and 6 month allowances, `autoRenew === false`
- Greek owner strings for the strip and the Professional / Business cards, and an English strip
- Draft, active, expired, sold-out, unknown capacity
- Two buyers racing for the last slot, idempotent replay, cancel, unverified capacity
- Grandfathered snapshot, duplicate payment, unverified transfer, tampered cents
- HMAC accept / reject, rate limit, PII key rejection
- Three counters, cross-tenant denial, notice dedupe
- 31 Jan, leap day, DST dates, client pause versus our delay
- Care minimum 40€ and the 15-minute step
- Estimator band not below the package base

`scripts/audit-selftest.mts` still passes against the same estimator (84/84), including “no currency symbol in plan line labels”.

Not automated here: 360 / 390 / tablet / desktop screenshots, light and dark, print export, CSRF against a browser, signed provider webhooks from Stripe. The estimate route checks `Origin` against `Host` and returns 409 on a mismatched `claimedNetCents`. Stripe test-mode webhooks are not connected in this repo.
