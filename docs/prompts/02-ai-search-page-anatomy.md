# Prompt 2 — Implement the AI-search page anatomy on every content template

Copy everything below the line into an agent working on any website codebase.

---

You are working in an existing website codebase. Implement the twelve parts of
a page built for AI search, **in the templates**, so that every content page
gets them by construction. Do not create a page that documents the checklist.

The classic on-page checklist assumed a person scanning results and deciding
what to click. This one assumes a language model deciding what to quote. The
two want different things from the same HTML: liftable answers over clever
introductions, tables over prose, attributed numbers over adjectives, and text
the server sent over text a browser drew.

## Architecture: one contract, three consumers

Do not scatter these twelve concerns across templates. Build a single
declaration each page makes about itself, and derive everything from it:

```ts
interface AiPageContract {
  url: string;                  // absolute, canonical
  headline: string;
  description: string;
  locale: string;
  datePublished: string;
  dateModified: string;         // rendered visibly AND emitted
  author: AuthorEntity;         // Person | Organization, with url + sameAs
  publisher: { name: string; url: string };
  takeaways?: string[];         // the answer, each line liftable alone
  faqs?: { question: string; answer: string }[];
  data?: OriginalDatum[];       // { value, claim, method, measuredAt, illustrative? }
  breadcrumbs?: { name: string; url: string }[];
  speakableSelectors?: string[];
  schemaType?: 'Article' | 'BlogPosting' | 'WebPage' | 'TechArticle';
}
```

Three consumers read it and **cannot disagree**, because there is one source:

1. `buildPageGraph(contract)` → the JSON-LD `@graph`.
2. Render primitives → the visible HTML.
3. The auditor → reads the rendered page back and scores it.

Add `validateContract()` that rejects: a takeaway opening with a backward
reference, a figure with no method, `dateModified` before `datePublished`, an
author with no name. Warn in dev; do not ship a page whose markup outruns its
copy.

## The twelve, and what each one means in code

**1. One page, one intent.** Exactly one `<h1>`. `<title>` names the topic and
the jobs the page does. URL short, readable, permanent.

**2. Let the AI crawlers in.** `robots.txt` allows `GPTBot`, `OAI-SearchBot`,
`ClaudeBot`, `PerplexityBot`, `Google-Extended` by name (a named group replaces
the `*` group — it inherits nothing). Content server-rendered; verify by
counting words in the served bytes, not in a browser.

**3. Answer first, above the fold.** A `<KeyTakeaways>` component: 4–6
sentences between the H1 and the first H2, carrying `data-ai="takeaways"`, fed
from `contract.takeaways`, and emitted as the Article node's `abstract` from
the same array.

**4. One prompt, many queries.** An answer engine fans one prompt into a dozen
sub-queries. Each gets its own H2, phrased as the question: what it is, how it
works, what it costs, how to choose.

**5. Tables and lists, not prose.** Figures in `<table>` with real `<th>` and a
`<caption>`. Sequences in `<ol>`. Self-contained rows come back quoted; the
same facts in a paragraph do not come back at all.

**6. Chunks that stand alone.** Retrieval pulls a passage, not a page. Each
section leads with its answer and explains afterwards. Flag paragraphs opening
with "as mentioned above", "this means", or a dangling pronoun.

**7. A number worth quoting.** A `<StatCallout>` rendering value, claim,
**method** and measurement date from an `OriginalDatum`, with a matching
`Dataset` node. Emit no `Dataset` for `illustrative: true` — the type asserts
something was measured. **If the codebase has no real figure, leave this check
failing and report it. Do not invent one.**

**8. Say what nobody else can.** Not automatable. Have the auditor report it as
*advisory*: look for first-hand evidence markers ("we audited", "our data") and
say plainly that a human decides whether the page says anything a model could
not have generated.

**9. Question in, answer out.** FAQ answers rendered in the HTML and emitted as
`FAQPage` from the same array. Fail this on editorial pages that answer no
question; only warn on programmatic records — duplicating FAQ markup across a
template set asserts a rich result the site cannot earn.

**10. Say it twice, machine-readably.** One `@graph`, nodes with `@id`s
referencing each other: Article/WebPage, author, breadcrumbs, FAQ, datasets,
`isPartOf` the site's WebSite node. Never assert a claim the copy does not make.

**11. Be a thing the web knows.** An author registry that collapses spelling
variants to one entity with a stable `@id`, a `url` and `sameAs` profiles. The
byline links to it, `rel="author"`. The article's `author` is an `@id`
reference, not an inline string. **Do not invent a person** — if the site has
none, model the organization properly and leave the slot documented.

**12. Prove it is still true.** `<LastUpdated>` rendering `<time
dateTime="YYYY-MM-DD">` with the same value the schema asserts. Check by
attribute, not text: non-English pages render their own month names.

## Method

1. **Audit first.** Build the raw-HTML auditor (see Prompt 1, Step 0) and
   record a baseline on a fixed sample before touching a template.
2. **Fix causes, not pages.** Every failure that repeats across a sample is a
   template bug. Fix it once and say how many URLs that covers.
3. **Re-audit and report the delta**, on the same sample.

## Data-layer work this usually requires

- Front matter / CMS gains a `takeaways:` field, parsed and validated at the
  data boundary (drop, with a warning, any line opening with a backward
  reference — cheaper than catching it in the audit).
- Author strings resolve through the registry rather than being rendered raw.
- Programmatic templates compose their answer-first block **from their own
  records** (category, market, scope, status) rather than having prose written
  per page.

## Definition of done

- One contract type; one graph builder; primitives for takeaways, byline,
  freshness and attributed figures.
- Every content template emits a page-level node and renders the date it
  asserts.
- Baseline → final scores reported on a fixed sample, per layer.
- Remaining failures listed, each with a reason, and the honest ones left
  failing rather than gamed.
- `lint`, typecheck and build pass.
