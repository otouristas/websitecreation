import { searchDocs, type DocEntry } from "@/lib/docs/search-core";

export interface HelpSearchEntry {
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly section: string;
  /** h2/h3 text, or article titles on a category page. */
  readonly headings: string;
}

export interface HelpSearchHit {
  readonly href: string;
  readonly title: string;
  readonly description: string;
  readonly section: string;
  readonly snippet: string | null;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Instant match over help titles, summaries and headings.
 * One-character queries stay on titles so a single letter does not match every article.
 */
export function searchHelp(entries: readonly HelpSearchEntry[], query: string, limit = 8): HelpSearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const words = fold(q).split(/\s+/).filter((w) => w.length > 1);
  if (words.length === 0) {
    const needle = fold(q);
    return entries
      .filter((entry) => fold(entry.title).includes(needle))
      .slice(0, limit)
      .map((entry) => ({
        href: entry.href,
        title: entry.title,
        description: entry.description,
        section: entry.section,
        snippet: null,
      }));
  }
  const docs: DocEntry[] = entries.map((entry) => ({
    href: entry.href,
    kind: "guide",
    section: entry.section,
    title: entry.title,
    description: entry.description,
    text: entry.headings,
  }));
  return searchDocs(docs, q, limit).map((hit) => ({
    href: hit.href,
    title: hit.title,
    description: hit.description,
    section: hit.section,
    snippet: hit.snippet,
  }));
}
