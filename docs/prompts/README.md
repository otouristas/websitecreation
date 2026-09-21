# Implementation prompts

Two prompts for making a website codebase legible to answer engines. They are
written to be handed to a coding agent in **any** repo, not just this one.

| File | What it makes the agent do |
|---|---|
| `01-search-optimization-layers.md` | Implement SEO, AEO, GEO, AIO, DEO and SXO as infrastructure, bottom-up, with an auditor that scores each layer |
| `02-ai-search-page-anatomy.md` | Implement the twelve parts of an AI-readable page as one contract with three consumers: the JSON-LD graph, the rendered HTML, and the auditor |

Run 01 first: it builds the measurement. Run 02 to drive the page-level score
up. Both insist on the same rule, which is the part worth keeping if you keep
nothing else:

> Never assert in markup what the page does not show, and never invent data to
> clear a check.

The working implementation of both lives in `src/lib/ai-search/`,
`src/components/ai-search/` and `scripts/audit-ai-search.mjs`. That module has
no imports outside itself, so it copies into another codebase whole; its
README explains the pieces.
