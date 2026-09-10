/**
 * Stable publication dates for generated (non-editorial) pages.
 *
 * Service hubs, industry hubs, industry×service pages and case studies have no
 * per-page publication date of their own, so four call sites reached for
 * `new Date().toISOString()`. With `revalidate = 3600` that meant every hourly
 * ISR pass republished ~1,750 URLs with a brand-new `datePublished`, and
 * `datePublished === dateModified` on all of them - a page that claims to be
 * both written and updated in the same instant, an hour after the last time it
 * claimed the same thing. Crawlers learn to discount dates that behave that
 * way, and it makes genuine updates invisible.
 *
 * These are constants on purpose: bump `GENERATED_CONTENT_UPDATED` when the
 * templates or the copy behind them actually change.
 */

/** When the current generation of programmatic templates went live. */
export const GENERATED_CONTENT_PUBLISHED = '2026-02-01T00:00:00.000Z';

/** Last substantive revision of that copy. */
export const GENERATED_CONTENT_UPDATED = '2026-08-15T00:00:00.000Z';
