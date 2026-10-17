import type { PlacePageData } from './types';

/** Visible place-page prose. Shared pricing, process and calls to action are excluded. */
export function visiblePlaceText(place: PlacePageData): string {
  const raw = [
    place.lead,
    ...place.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    place.areas.join(' '),
    ...place.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join('\n');
  return raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLocaleLowerCase('el-GR')
      .split(/[^\p{L}\p{N}]+/u)
      .filter((word) => word.length > 1),
  );
}

/** Token Jaccard. 0 means no shared words, 1 means the same word set. */
export function jaccardSimilarity(left: string, right: string): number {
  const a = tokenSet(left);
  const b = tokenSet(right);
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 1 : intersection / union;
}
