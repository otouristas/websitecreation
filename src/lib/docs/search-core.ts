/**
 * Search over the docs index. No data imports here: the browser bundle loads
 * this file and fetches the index as JSON.
 */
export type DocKind = "guide" | "iphone" | "term" | "resource";

/** One searchable page. Shipped to the browser as JSON, so text is capped. */
export interface DocEntry {
  readonly href: string;
  readonly kind: DocKind;
  readonly section: string;
  readonly title: string;
  readonly description: string;
  readonly text: string;
}

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export interface DocHit extends DocEntry {
  readonly score: number;
  readonly snippet: string | null;
}

/** Every word must match; title matches rank first. Greek accents and case are ignored. */
export function searchDocs(index: ReadonlyArray<DocEntry>, query: string, limit = 10): DocHit[] {
  const words = fold(query).split(/\s+/).filter((w) => w.length > 1);
  if (words.length === 0) return [];
  const hits: DocHit[] = [];
  for (const entry of index) {
    const title = fold(entry.title);
    const description = fold(entry.description);
    const body = fold(entry.text);
    let score = 0;
    let all = true;
    for (const w of words) {
      const s = (title === w ? 30 : 0) + (title.includes(w) ? 10 : 0) + (description.includes(w) ? 4 : 0) + (body.includes(w) ? 1 : 0);
      if (s === 0) all = false;
      score += s;
    }
    if (!all) continue;
    const at = title.includes(words[0]) || description.includes(words[0]) ? -1 : body.indexOf(words[0]);
    let snippet: string | null = null;
    if (at >= 0) {
      const from = at > 40 ? entry.text.indexOf(" ", at - 40) + 1 : 0;
      const to = entry.text.lastIndexOf(" ", at + 110);
      snippet = `${from > 0 ? "…" : ""}${entry.text.slice(from, to > at ? to : at + 110).trim()}…`;
    }
    hits.push({ ...entry, score, snippet });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Looser match for questions: any word counts, so "how do I connect search console" still finds pages. */
export function rankForQuestion(index: ReadonlyArray<DocEntry>, question: string, limit = 6): DocEntry[] {
  const stop = new Set(["the", "and", "how", "what", "does", "can", "with", "for", "you", "your", "are", "του", "της", "και", "πως", "πώς", "τι", "να", "το", "τα", "με", "για", "στο", "στη", "μου"]);
  const words = fold(question).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 2 && !stop.has(w));
  if (words.length === 0) return [];
  return index
    .map((e) => {
      const title = fold(e.title);
      const rest = fold(`${e.description} ${e.text}`);
      const score = words.reduce((s, w) => s + (title.includes(w) ? 6 : 0) + (rest.includes(w) ? 1 : 0), 0);
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
}
