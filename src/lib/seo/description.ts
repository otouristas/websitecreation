// SEO description builder.
//
// Targets 145-155 characters, accepts 140-158, hard-caps at 160.
//
// It deliberately does NOT pad. The previous version enforced a 150-character
// minimum by appending filler ("Built for Google and AI search.") and, when the
// filler overflowed the cap, truncated it mid-phrase - which is where live
// snippets like "…Get a free quote today. Built for." came from. Length now
// comes from real per-entity content or the description is simply shorter.

const BASE_URL = 'https://anotherseoguru.com';
const BRAND_NAME = 'AnotherSEOGuru';

/** Ideal SERP window. Nothing is padded to reach these. */
export const META_DESC_IDEAL_MIN = 145;
export const META_DESC_IDEAL_MAX = 155;
/** Acceptable window used by the auditor. */
export const META_DESC_MIN = 140;
export const META_DESC_MAX = 158;
/** Absolute ceiling. */
export const META_DESC_HARD_MAX = 160;

interface DescriptionInput {
  primaryKeyword: string;
  location?: string;
  industry?: string;
  service?: string;
  /** Concrete differentiator for this page. Composed, never generic filler. */
  usp?: string;
  ctaHint?: string;
}

const CONNECTIVES = new Set([
  'and', 'or', 'with', 'for', 'to', 'the', 'a', 'of', 'in', 'on', 'from', 'plus', 'built',
  'και', 'ή', 'με', 'για', 'στο', 'στη', 'στην', 'από', 'που', 'το', 'η', 'ο', 'σε',
]);

/**
 * Truncate at a sentence boundary when one exists inside the limit, otherwise
 * at a word boundary. Never leaves a dangling connective, so we cannot emit
 * fragments like "Built for." or "tailored for and".
 */
export function smartTruncate(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;

  // Prefer the last complete sentence that fits.
  const window = clean.slice(0, maxLength);
  const lastStop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('; '));
  if (lastStop > maxLength * 0.6) {
    return window.slice(0, lastStop + 1).trim();
  }

  // Otherwise cut on a word boundary and drop trailing connectives.
  let words = window.split(' ');
  words.pop(); // the word the cut landed inside
  while (words.length > 1 && CONNECTIVES.has(words[words.length - 1].toLowerCase().replace(/[^\p{L}]/gu, ''))) {
    words.pop();
  }
  let out = words.join(' ').replace(/[,;:·\-\s]+$/u, '').trim();
  if (out && !/[.!?]$/.test(out)) out += '.';
  return out;
}

/**
 * Normalise a description and enforce the ceiling. Short descriptions are left
 * short: a truthful 128-character description beats a padded 152-character one.
 */
export function finalizeDescription(text: string, maxLen = META_DESC_HARD_MAX): string {
  let d = text.replace(/\s+/g, ' ').trim();

  // Collapse duplicated CTA fragments produced by layered builders.
  d = d
    .replace(/(Ζητήστε δωρεάν προσφορά[^.]*\.)(\s*Ζητήστε[^.]*)+/gi, '$1')
    .replace(/(Get a free quote[^.]*\.)(\s*Free quote[^.]*)+/gi, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  // Em dashes never reach metadata.
  d = d.replace(/\s*—\s*/g, ' - ');

  if (d.length > maxLen) d = smartTruncate(d, maxLen);
  return d;
}

/**
 * Fallback description builder.
 *
 * Callers should pass a real `usp` describing what the page actually offers.
 * Without one the output stays short and factual rather than reaching for
 * boilerplate about ranking on Google and AI search.
 */
export function buildMetaDescription(input: DescriptionInput): string {
  const { primaryKeyword, location, industry, service, usp, ctaHint } = input;
  const cta = ctaHint ?? '';

  const parts: string[] = [];

  if (service && location) {
    parts.push(`${service} in ${location}.`);
  } else if (service && industry) {
    parts.push(`${service} for ${industry}.`);
  } else if (industry) {
    parts.push(`${industry} websites and SEO.`);
  } else if (service) {
    parts.push(`${service}.`);
  } else {
    parts.push(`${primaryKeyword}.`);
  }

  if (usp) parts.push(usp.endsWith('.') ? usp : `${usp}.`);
  if (cta) parts.push(cta.endsWith('.') ? cta : `${cta}.`);

  return finalizeDescription(parts.join(' '));
}

export function getDescriptionStatus(description: string): {
  length: number;
  status: 'too-short' | 'optimal' | 'too-long';
  message: string;
} {
  const length = description.length;

  if (length < META_DESC_MIN) {
    return {
      length,
      status: 'too-short',
      message: `Too short (${length} chars, target ${META_DESC_IDEAL_MIN}-${META_DESC_IDEAL_MAX})`,
    };
  }
  if (length > META_DESC_MAX) {
    return {
      length,
      status: 'too-long',
      message: `Too long (${length} chars, max ${META_DESC_MAX})`,
    };
  }
  return { length, status: 'optimal', message: `OK (${length} chars)` };
}

export { BASE_URL, BRAND_NAME };


/**
 * Compose a description that lands inside the SERP window.
 *
 * Given a base sentence and candidate closing clauses ordered longest-first,
 * picks the longest clause that keeps the result within `max`. Every clause
 * must be meaningful on its own - this chooses between real sentences, it does
 * not pad with filler, which is what produced the truncated snippets before.
 */
export function fitDescription(
  base: string,
  clauses: readonly string[],
  min = META_DESC_MIN,
  max = META_DESC_MAX,
): string {
  const b = base.replace(/\s+/g, ' ').trim();

  // Score every candidate and take the one closest to the middle of the window.
  const target = (min + max) / 2;
  let best = b;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const clause of clauses) {
    const candidate = `${b} ${clause}`.replace(/\s+/g, ' ').trim();
    const len = candidate.length;
    // Overflowing the ceiling is disqualifying; being short is merely suboptimal.
    const score = len > max ? Number.POSITIVE_INFINITY : Math.abs(len - target);
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return finalizeDescription(best);
}
