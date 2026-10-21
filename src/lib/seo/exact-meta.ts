import type { Metadata } from 'next';
import { serpMetaFor } from '@/data/serp-meta';

/**
 * Replace title, description and social tags with the metadata map when this
 * path is in it. Pages that are not in the map keep the metadata they already
 * built.
 */
export function applySerpMeta(metadata: Metadata, path: string): Metadata {
  const row = serpMetaFor(path);
  if (!row) return metadata;
  return {
    ...metadata,
    title: row.title,
    description: row.description,
    openGraph: {
      ...(metadata.openGraph ?? {}),
      title: row.title,
      description: row.description,
    },
    twitter: {
      ...(metadata.twitter ?? {}),
      title: row.title,
      description: row.description,
    },
  };
}

function metadataPath(metadata: Metadata): string | undefined {
  const raw = metadata.openGraph && 'url' in metadata.openGraph ? metadata.openGraph.url : undefined;
  if (!raw) return undefined;
  const value = raw instanceof URL ? raw.toString() : raw;
  if (typeof value !== 'string') return undefined;
  try {
    return new URL(value).pathname;
  } catch {
    return value.startsWith('/') ? value : undefined;
  }
}

/**
 * Ship a hand-written SERP title verbatim.
 *
 * `buildMetadata` runs every title through `buildFullTitle`, which caps the
 * primary part and appends « | AnotherSEOGuru». Mapped titles are already
 * counted to 50–60 characters. Some carry the brand and some deliberately do
 * not, so the builder would either truncate them or brand them twice.
 *
 * When the canonical URL is in the metadata map, that entry wins for the
 * title, the description and the Open Graph / Twitter copies, even if an
 * earlier step passed a different string.
 */
export function withExactTitle(metadata: Metadata, title: string): Metadata {
  const next: Metadata = {
    ...metadata,
    title,
    openGraph: { ...(metadata.openGraph ?? {}), title },
    twitter: { ...(metadata.twitter ?? {}), title },
  };
  const path = metadataPath(next);
  return path ? applySerpMeta(next, path) : next;
}
