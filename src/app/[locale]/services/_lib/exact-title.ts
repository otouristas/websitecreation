import type { Metadata } from 'next';

/**
 * Ship a hand-written SERP title verbatim.
 *
 * `buildMetadata` runs every title through `buildFullTitle`, which caps the
 * primary part at 43 characters and appends « | AnotherSEOGuru». The Greek
 * keyword map's titles are already counted to ≤60 characters, some carry the
 * brand themselves and some deliberately do not, so the builder would either
 * truncate them or brand them twice. Everything else (canonical, hreflang,
 * description, OpenGraph) still comes from `buildMetadata`.
 */
export function withExactTitle(metadata: Metadata, title: string): Metadata {
  return {
    ...metadata,
    title,
    openGraph: { ...(metadata.openGraph ?? {}), title },
    twitter: { ...(metadata.twitter ?? {}), title },
  };
}
