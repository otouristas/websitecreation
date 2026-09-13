# Redesign, September 2026: "Built to rank. Designed to convert."

What changed, why, and what to keep in mind before touching it again. Read
alongside `docs/seo-2026/README.md` (the organic programme) and
`docs/greek-style-guide.md` (every Greek string).

## The brief

Research across current award-winning agency sites, SEO/GEO agency sites and
conversion studies pointed the same way: dark canvases with slow brand-colour
gradients and grain, oversized kinetic type with a mono label face, bento
grids, restraint in motion, and for GEO agencies, *showing* AI citations rather
than describing them. Instant URL-audit widgets are the strongest agency lead
magnet; WhatsApp converts several times better than forms for consultative
B2B in Southern Europe. The brand already had this world in its cover art
(navy, royal blue, cyan, "Built to rank. Designed to convert.") - the site
simply never used it.

## Decisions

- **Dark-first.** `:root` carries the brand theme; `.light` on `<html>` is the
  toggle (stored under the same `theme` key as before). `@custom-variant dark`
  is redefined as `&:not(.light *)`, so existing `dark:` utilities keep
  meaning "the brand look".
- **Whole site reskinned through the token layer.** `src/app/globals.css` and
  `src/components/landing/primitives.tsx` drive the visual language; the 43
  bespoke pages and ~30 route templates inherit it through tokens, the
  `blueprint-grid` ground (same name, new aurora + grain recipe) and the
  `.btn*` / `.card*` shims. Six high-intent pages were checked by hand.
- **Green retired, cyan accent, one "signal" green.** `--brand` is cyan.
  `--signal` is reserved for proof states (cited, live, passed). Signature hues
  on bespoke pages stay in the 200-290 band; `local-seo.tsx` moved from 165 to
  200.
- **Type.** Inter Tight (variable) for display, Inter for text, JetBrains Mono
  for micro-labels. All three ship Greek. Font tokens live in a plain `@theme`
  block (not `inline`) and the next/font variables sit on `<html>`. This also
  fixed a pre-existing bug: body copy had been rendering in the system font
  because inline theme tokens are never emitted as CSS variables.
- **Motion.** The hero animates with CSS keyframes only (`rise-words`), so it
  is the LCP element and never waits on JavaScript. Section reveals are CSS
  scroll-driven animations (`reveal` utility, `animation-timeline: view()`)
  with no JS and no hidden content for browsers that lack the feature. The
  `motion` package is used only for the count-up numbers.
- **Lead magnet.** The hero's instant scan posts to `src/app/api/scan/route.ts`,
  which fetches the visitor's homepage server-side (public hosts only, 6 s
  budget, three redirects, 1 MB) and scores thirteen weighted checks from
  `src/lib/scan/`. The widget then captures an email or WhatsApp number to
  Formspree with the score and issues attached, and hands off to
  `/get-started?website=…` (the wizard now prefills `website`).
- **Truthfulness.** The answer-engine panel is labelled a sample and tracks a
  placeholder domain. Every number on the page is still derived from
  `company-facts.ts` / `trust-stats.ts`.

## Verified before merge

- `npm run lint`, `npx tsc --noEmit`, `npm run build` (all static params).
- SEO parity against `main` for `/en` and `/el`: title, description, canonical,
  robots, hreflang, Open Graph, H1 text, every JSON-LD block and the FAQ
  questions are identical.
- Contrast: every text-bearing token pair passes AA in both themes.
- axe (wcag2a/aa/21aa): no serious or critical violations on `/en` and `/el`.
- Reduced motion: hero and all sections render still and fully visible.
- Scan API: private, loopback, link-local, `file:` and malformed targets are
  rejected; the widget completes idle → scanning → results → capture → sent
  with Formspree mocked.

## Not done here

- The 43 bespoke pages and remaining templates were reskinned by tokens only.
  Their section structures are unchanged; a hands-on pass with the new
  primitives would tighten them further.
- The scan API rate limit is per instance (module memory). Move it to a shared
  store if abuse ever shows up.
- The OG image (`src/app/opengraph-image.png`) is regenerated from
  `opengraph-image.tsx`; regenerate it if the tagline or palette changes.
