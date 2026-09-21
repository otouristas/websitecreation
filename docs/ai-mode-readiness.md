# AI Mode readiness

*Written 2026-09-21.*

A rubric for judging whether a site can act as the **grounding source** behind
a rich answer in Google's AI Mode, and how we score it against client sites.

---

## 1. What this is, and what it is not

On 20 September 2026, Dan Petrovic (DEJAN AI) published a catalogue of the tag
vocabulary Google's AI Mode appears to emit so its front-end can render cards,
carousels, maps, product modules and widgets inside an AI answer: `<FollowUp>`,
`<Generate>`, `<layout type="map|comparison|inspiration">`, `<List>`/`<Entity>`,
`<Carousel>`, `<ImageGrid>`, `<Product>`, `<Event>`, `<DataViz>`, `<Video>` and
others, with 30 entity types and two structural rules.

**A website never emits any of these tags.** They are the model's output
vocabulary, rendered by Google's front-end. Nobody can add a `<Carousel>` to
their HTML and get a carousel. The only lever a site has is being the source a
card is assembled from — which is what turns the published "required grounding
attributes" into a checklist worth acting on.

**Read the source critically before repeating it to a client:**

- It is reverse-engineered from prompt leaks. No Google documentation confirms
  any of it, and Google has not acknowledged the vocabulary.
- The published article still carries drafting artifacts — several sections
  open with "Your draft mentions…" or "While your draft covers…", which is an
  editing session pasted into the final text.
- Its `<InlineQuiz>` example is not valid JSON: the `explanation` value on the
  second question is unquoted.
- The "Dominant Layout Environment" and "Required Grounding Attributes"
  columns in the 30-entity table read as the author's own synthesis rather
  than leaked material. We mark those `inferred` in
  `src/data/ai-mode-tags.ts` and treat them as a hypothesis.

**So the governing rule for everything below:** a recommendation earns a place
here only if it is worth doing as ordinary structured-data practice even if
this vocabulary turns out to be wrong. Nothing in this rubric is justified
only by the leak. That is what makes it safe to put in front of a client, and
it is why the list of applicable entity types is much shorter than 30.

Nothing here promises that any engine will cite, render or rank anything.
Optimisation makes content usable by an answer engine; it does not make the
engine quote it.

---

## 2. The two render rules

These are the only claims in the source that are directly measurable on a
page, which is why they carry most of the weight here.

| Rule | What it says | How we measure it |
| :--- | :--- | :--- |
| **Homogeneity** | Entries in one container must share a single entity type, or it degrades to plain bullets | `collection_shape` — distinct `@type` across `ItemList` children must be exactly 1 |
| **Minimum assets** | A carousel or grid needs at least three validated children, or the layout flattens | `collection_shape` (≥3 entries) and `media_assets` (≥3 usable images) |

Both live in `RENDER_RULES` in `src/data/ai-mode-tags.ts`, and the audit
self-test pins the boundary: two entries fail where three pass, and a mixed
list fails however long it is.

---

## 3. The rubric

Five dimensions, 0–2 each, 10 total. Dimensions 1, 2, 3 and 5 are scored
directly by the live audit's `ai` pillar; dimension 4 is partly scored and
partly a judgement call.

| # | Dimension | 0 | 1 | 2 | Audit check |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Entity identity** | no entity JSON-LD | type and name only | type, name, url, address or geo, phone, `sameAs` | `entity_schema`, `entity_completeness` |
| 2 | **Collection shape** | no list, or mixed types | untyped entries, or fewer than 3 | ≥3 entries, one type, typed | `collection_shape` |
| 3 | **Asset floor** | fewer than 3 usable images | 3+ but missing alt or dimensions | ≥3 with real URLs, alt and dimensions | `media_assets` |
| 4 | **Answer surface** | no question headings, no Q&A | questions present, answers behind JS | question headings with answers in server HTML | `question_headings`, `faq_schema`, `server_text` |
| 5 | **Access and feed** | AI crawlers blocked | allowed, no `llms.txt` | allowed, `llms.txt`, text server-rendered | `ai_access`, `llms_txt`, `server_text` |

Score `n/a` rather than 0 where a dimension genuinely does not apply — a
single-location business with no catalogue has nothing to put in dimension 2,
and scoring it 0 would misreport a non-problem as a defect.

---

## 4. What each client vertical is, and what it could ground

Two different questions, which is why they give different answers. **What the
business is** drives the schema type it should publish about itself.
**What it could also ground** is conditional on the client publishing the
right content — and mostly they do not, which is why that column is advice and
not markup we emit.

| Vertical | n | The business is | schema.org | Could also ground, if they publish it |
| :--- | --: | :--- | :--- | :--- |
| rent-a-car | 14 | `LocalServiceOrTradeBusiness` | `AutoRental` | `VehicleModel` — **only** with per-model pages carrying trim, transmission, seats and a rate |
| tours | 13 | `LocalServiceOrTradeBusiness` | `TravelAgency` | `Event` — **only** with dated departures; `PublicVenueOrLandmark` via `about` on a tour page |
| hotel | 7 | `LodgingPlace` | `LodgingBusiness` | ≥3 room types as a typed list |
| villa | 6 | `LodgingPlace` | `LodgingBusiness` | ≥3 properties as a typed list |
| restaurant | 4 | `PhysicalStoreOrLocalBusiness` | `Restaurant` | `hasMenu` with ≥3 `MenuSection` |
| transfers | 3 | `LocalServiceOrTradeBusiness` | `LocalBusiness` | ≥3 routes as typed `Service` entries |
| travel-ai | 2 | `Corporation` | `Organization` | — |
| other | 22 | needs a human decision | — | — |

49 of 71 clients fall into a vertical with a known mapping. The remaining 22
are deliberately unclassified: guessing an entity type for them would be the
same error as marking up a rental firm as a `VehicleModel` because it has cars
on the page.

**Two rejections worth stating**, because both are tempting and both are
wrong by default:

- A rent-a-car client **is not** a `VehicleModel`. It is a rental business.
  `VehicleModel` applies to the cars, and only if the client publishes a page
  per model with real specifications. A fleet grid of photos is not that.
- A tour operator **is not** an `Event`. Its departures might be, if they are
  dated and bookable. A page saying "daily tours available" is not a dated
  departure, and marking it up as one is inventing a fact.

### The review-score question

The source lists *review score* among the grounding attributes for
`LodgingPlace`, and `aggregateRating` is the property that carries it.

This repo does **not** emit `aggregateRating` or `Review` on
anotherseoguru.com, and that rule stands. It exists because self-serving
first-party review markup, with no source and no consent, is a guidelines
violation.

That is a different situation from a hotel publishing its own genuine
ratings, which is standard and supported. So for clients: `aggregateRating` is
legitimate **when the underlying reviews are real, the source is verifiable,
and the client is marking up data they actually hold.** If any of those three
is missing, leave it out. Never reconstruct a rating from a third-party site
the client does not control.

---

## 5. Running it

```bash
npx tsx scripts/ai-mode-report.mts --plan-only        # classification, no network
npx tsx scripts/ai-mode-report.mts --category hotel   # measure 5 hotels
npx tsx scripts/ai-mode-report.mts --slug way-to-crete
npx tsx scripts/ai-mode-report.mts --all              # every live client, opt-in
```

The script drives the live audit engine rather than re-implementing scoring,
so what the rubric advises and what the widget measures cannot drift apart. It
skips the projects recorded as `liveStatus: 'offline'` — four domains are
dead and one is a parked for-sale page, and auditing those reports a failure
that belongs to the registrar.

It contacts sites we do not own, so requests are sequential with a delay and
the default is five. `--all` is opt-in.

**What the script cannot tell you.** It produces the work list, not the
verdict. Whether a rent-a-car client has per-model pages worth marking up,
whether a tour operator's departures are really dated, whether a dimension
should be `n/a` — those are judgements about content, and a person makes them.

---

## 6. Our own site

Of the 30 entity types, six describe pages this site owns. The other 24 are
recorded in `src/data/ai-mode-tags.ts` with `appliesToOurSite: false` so the
decision stays visible instead of being re-litigated.

| Entity type | Our surface | State |
| :--- | :--- | :--- |
| `Corporation` | sitewide `@graph` | Covered by `buildStructuredDataGraph()` |
| `Other` → `DefinedTerm` | `/glossary` | `DefinedTermSet` with 105 terms |
| `SpecificPurchasableSoftwareSystem` | `/platform`, `/compare/[slug]` | `SoftwareApplication`; comparison surface still prose-shaped |
| `LocalServiceOrTradeBusiness` | `/services/*` | `Service`; no `address` to publish, see below |
| `RealWorldGeographicArea` | `/locations` | `CollectionPage`; not marked up as places |
| `SpecificPerson` | none yet | Generator exists, unwired — see below |

Two honest gaps:

- **No postal address.** `src/lib/contact-info.ts` holds a phone, an email and
  a WhatsApp link. There is no street address and no coordinates, so the
  `LocalBusiness` grounding floor is unreachable for us without inventing
  facts. `Organization` with `areaServed` is the honest ceiling.
- **No `Person`.** `generatePersonSchema` exists and nothing calls it. The
  site has no author bios and no team page, so there is no real name, role or
  profile URL to put in it. The seam is there; wiring it needs a person who
  agrees to be named, not a code change.

Client case studies at `/work/[slug]` carry an `about` node naming the
business, its type and its markets — identity only, and skipped entirely when
the site is recorded as offline.
