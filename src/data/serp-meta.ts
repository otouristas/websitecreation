import map from './serp-meta.json';

/** Exact SERP title and description for one indexable URL. */
export interface SerpEntry {
  readonly title: string;
  readonly description: string;
}

/**
 * Hand-counted titles and descriptions for the city and service URLs.
 * Titles are already 50–60 characters and some include the brand, so they must
 * ship verbatim. `buildMetadata` would otherwise cap the primary part and
 * append « | AnotherSEOGuru» a second time.
 */
export const SERP_META = map as Readonly<Record<string, SerpEntry>>;

export function serpMetaFor(path: string): SerpEntry | undefined {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  return SERP_META[normalized];
}
