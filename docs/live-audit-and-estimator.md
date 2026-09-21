# Live site test and live cost estimator

Both live on `/[locale]/get-started`, above the brief form. A visitor measures
their own site, sees what fixing it costs, and only then fills in a form — and
the brief that reaches us carries their figures instead of a name and an email.

## What is actually measured

`POST /api/audit` streams newline-delimited JSON while it works. Every number
it reports was measured on that request; nothing is modelled, cached or carried
over from another site. When a probe does not complete the field is `null` and
the UI prints `—` rather than filling in a plausible figure.

Five real network probes, run against the visitor's origin:

| Probe | What it establishes |
| --- | --- |
| homepage | status, redirect chain, TTFB, download time, bytes, compression, security headers |
| `/robots.txt` | whether Googlebot, Bingbot and seven AI crawlers can reach `/` |
| sitemap | the URL the site declares, or `/sitemap.xml`; URL count, index or not |
| `/llms.txt` | present or absent |
| a random path | whether a missing URL returns a real 404 or a soft 200 |

The homepage HTML is then parsed into counts and values (`src/lib/audit/signals.ts`)
and graded by ~40 weighted checks (`src/lib/audit/checks.ts`) across four
pillars: **technical**, **content**, **performance** and **AI visibility**.
Checks are three-state — `pass`, `warn` (half weight) and `fail` — because a
binary verdict on a 63-character title lies in both directions.

### Why the stream

The progress log on screen is the generator's own event stream, read off the
response as it arrives. There is no minimum duration and no scripted sequence:
a fast host finishes in under a second and the log says so. The older
`/api/scan` (still behind the homepage hero) holds its results for 2.2 s so a
timed animation can play — which teaches a visitor that the number at the end
is theatre too.

### Safety

Every hop — first request and every redirect — passes `assertPublicHost` from
`src/lib/scan/ssrf.ts`, so a public page cannot bounce the scanner onto a
private address. `ProbeOptions.guard` exists only so the self-test can measure
against a fixture server on loopback; the route never passes it, and the
self-test asserts that loopback is refused without it.

Per-IP rate limit is 8 audits a minute, in module memory — per instance on a
serverless platform, so it is a brake on a browser rather than a quota.

## The estimator

`src/lib/estimate/model.ts` is pure: inputs in, line items out. Every line is
traceable to `src/data/pricing.ts` — the same source the pricing page reads —
so a price cannot drift between the two. What the price list does not state
(pages covered per tier, what a second language costs) lives in
`src/data/estimator-rates.ts` as named constants with the reasoning attached.

Totals shown: one-off, per month, due at kick-off, and the commitment over the
planned months with a ±15% scoping band. It is an estimate, and the UI says so.

## The handover

`recommendFromAudit` turns the measurement into a starting scope, and every
recommendation prints the figure that produced it ("Scoped to 22 pages from
your sitemap", "GPTBot, Google-Extended cannot crawl you"). It may escalate to
a rebuild when the technical *and* performance pillars both fail, with the
scores that say so — it never quietly moves a visitor off the track they chose.

`?service=<slug>` presets — service pages link here and until now nothing read
the parameter, so `/el/get-started?service=ai-visibility` landed on a blank
wizard. The slug now seeds both the wizard's goal and the estimator's scope
(`SERVICE_PRESETS`, `SERVICE_GOALS` in `src/lib/estimate/recommend.ts`), and
`?website=` from the homepage scan pre-fills the test input.

## Tests

`npm run test:audit` boots a fixture site on loopback with a known-bad
homepage, a robots.txt blocking two answer engines, a sitemap and an llms.txt,
drives the real generator against it over a real socket, and asserts on the
metrics, the verdicts, the crawler judgements, the SSRF refusal, the
recommendation and the cost arithmetic.
