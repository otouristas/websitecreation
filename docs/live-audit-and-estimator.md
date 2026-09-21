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

## Weight change: the AI pillar, 2026-09-21

Three checks were added to the `ai` pillar — `entity_completeness` (6),
`collection_shape` (4) and `media_assets` (3). The pillar went from 58 to 71
points, and from 21.7% to 25.4% of the 280-point total. Pillar scores are
normalised within a pillar, so the other three are unaffected in isolation,
but the overall score is a weighted roll-up and therefore moved.

**A visitor who ran the audit before this date and reruns it will see a
different number with no change to their site.** Nothing is stored, so no
saved result is invalidated, but the discrepancy is real and worth knowing
about before someone asks about it on a call.

Why these three, and why in the existing pillar:

- `entity_completeness` judges the entity block against what its own declared
  type is expected to carry, rather than asking the same properties of
  everyone. A hotel with no opening hours is a gap; a SaaS homepage with none
  is not. The profiles live in `src/data/ai-mode-tags.ts` so the audit and the
  client-facing readiness rubric score the same way.
- `collection_shape` reads whether a page publishes a list a machine can treat
  as a set: at least three entries, all declaring one type. Breadcrumbs are
  excluded — a `BreadcrumbList` is an item list, and counting it would make
  every site with a breadcrumb look like it publishes a collection.
- `media_assets` counts images with a real URL, alt text and declared
  dimensions. An inline `data:` URI cannot be linked to and an unlabelled
  image cannot be described.

No fifth pillar: `result.pillars` renders into a two-column grid, four bars
fill it and five leave a hole. The self-test asserts `pillars.length === 4` so
that decision has to be made deliberately rather than by accident.

The check copy states what was measured and what to do about it. It does not
mention Google AI Mode, and it does not claim that fixing any of this gets a
page rendered or cited. The reasoning behind the three checks comes from a
reverse-engineered source (see `docs/ai-mode-readiness.md`); a widget a
prospect is reading is the wrong place to relay an unverified claim about a
search engine. Each check is defensible as ordinary structured-data practice
on its own, which is the test each one had to pass to be added at all.
