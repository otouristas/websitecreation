# Folded-A marketing implementation: 13 October 2026

This implements the approved identity in `otouristas/websitecreation` (anotherseoguru.com). The app, client portal and native iOS implementations are owned separately in `otouristas/gsc-gemini-boost`.

The shared `BrandLogo` renders the original on-light/on-dark SVGs; it does not rebuild the logo lettering with UI fonts. Header, mobile navigation, footer and localized 404 use that component. Icons, touch/PWA assets, Organization and Article publisher logos, middleware 410 responses and both social image routes use the approved artwork. `public/logo.png` and `public/logo.svg` remain compatibility aliases to approved assets. The original ICO remains unchanged in public; Next's app metadata ICO copy is removed because its decoder rejects the original ICO's RGB PNG payload. The SVG icon is the preferred metadata icon.

`src/brand/tokens/brand.tokens.json` is the unchanged shared source. Its original CSS/TypeScript/SwiftUI/HSL exports and synchronization script are preserved. Global roles bridge to full CSS colors, retaining the existing dark-default controller and light toggle; the same controller now synchronizes `data-asg-theme`. Per-route hue overrides are retired. Actions have solid accessible default/hover/pressed/disabled pairs; selection, proof/success, warning, danger and chart roles remain distinct. Inputs use necessary control boundaries and preserve invalid outlines. Mostly neutral surfaces replace the previous broad aurora and glass treatments.

Headings, body and UI labels use Greek-capable Inter at existing marketing sizes, configured in `src/brand/typography.ts`. Error roots reuse the same stored preference and font setup through `ErrorAppearance`. Minimal middleware410 responses load the same official Inter400/700 faces from public, with their OFL license. Geist Mono is reserved for code. The existing `font-serif` and `font-mono` UI utility contracts are retained as Inter aliases to avoid route-specific typography. The logo's supplied lettering is outlined Inter Display. No new font specification is inferred from the brand package. Social-card text embeds official static Inter400/600/700 TTF faces from Google Fonts; license, source URLs and hashes are recorded in `src/brand/fonts/`. Next output tracing includes those files. The supplied logo remains unchanged.

## Verification and upkeep

- `npm run check:brand`: original five exports/82 opaque contrast pairs, 21 original artwork hashes, public token/manifest parity and static/dynamic social-image parity.
- `npm run generate:brand-og`: regenerate the explicit static `/opengraph-image.png` from the shared ImageResponse implementation. `/opengraph-image` uses the same component.
- `npm run build`: production compilation, TypeScript and generated routes.
- Rendered evidence and actual coverage: `2026-10-13-coverage.md` and `2026-10-13-coverage.csv` beside this document. Token-pair checks alone do not establish rendered accessibility.

Preserve client portfolio marks/screenshots, payment-provider/Google/WhatsApp identities and provider/data-specific illustration colors; these are intentional external or data exceptions, not alternative AnotherSEOGuru palettes. Service-design sample swatches are examples of client design output. Existing content, URLs/statuses, SEO/indexability, calculations, API logic, authentication, lead delivery and payment behavior are retained. A localized missing-route fallback keeps the existing 404 status while applying the same branded error layout. Contact definition-list markup is corrected for accessibility without changing its content or form logic. Horizontal help/pricing table regions are labeled and keyboard-focusable.

Full-repository lint has pre-existing no-require-imports errors in `scripts/ads-lead-measurement-check.cjs` and `scripts/analytics-consent-check.cjs`; these scripts were unchanged. The existing blog validator also reports content-rule failures in unchanged posts. Keep those separate from changed-file lint and branding verification. No real contact messages or paid search-preview requests are used in QA.

This PR delivers implementation and evidence. Production deployment/merge and the app/native release are coordinated separately. Social posting remains paused; rejected synthetic-narration videos must not be reused.
