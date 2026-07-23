// SEO Description Builder - targets 150–160 character meta descriptions

const BASE_URL = 'https://anotherseoguru.com';
const BRAND_NAME = 'AnotherSEOGuru';

/** Used only when no custom description is supplied */
const DEFAULT_USP =
  'SEO-ready sites, GEO/AEO, and measurable growth for Search Console teams';

export const META_DESC_MIN = 150;
export const META_DESC_MAX = 160;

interface DescriptionInput {
  primaryKeyword: string;
  location?: string;
  industry?: string;
  service?: string;
  usp?: string;
  ctaHint?: string;
}

export function smartTruncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace === -1) return truncated;

  let result = truncated.slice(0, lastSpace);
  result = result.replace(/[,;:\-– - ]$/, '').trim();

  return result;
}

/**
 * Ensure description is SERP-optimal (150–160 chars). Pads or trims as needed.
 */
export function finalizeDescription(
  text: string,
  minLen = META_DESC_MIN,
  maxLen = META_DESC_MAX,
): string {
  let d = text.replace(/\s+/g, ' ').trim();

  // Collapse duplicated CTA fragments from layered builders.
  d = d
    .replace(/(Ζητήστε δωρεάν προσφορά[^.]*\.)(\s*Ζητήστε[^.]*)+/gi, '$1')
    .replace(/(Get a free quote[^.]*\.)(\s*Free quote[^.]*)+/gi, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  if (d.length > maxLen) {
    d = smartTruncate(d, maxLen - 1);
    if (!d.endsWith('.')) d += '.';
    return d.slice(0, maxLen);
  }

  if (d.length < minLen) {
    const isGreek = /[α-ωΑ-Ωίϊΐόάέύϋΰήώ]/i.test(d);
    const alreadyHasCta = /προσφορά|quote|trial/i.test(d);
    const pads = isGreek
      ? alreadyHasCta
        ? [' Τοπική στρατηγική και γρήγορη παράδοση.', ' SEO-ready από την πρώτη μέρα.']
        : [' Ζητήστε δωρεάν προσφορά.', ' Τοπική στρατηγική και γρήγορη παράδοση.']
      : alreadyHasCta
        ? [' Built for Google and AI search.', ' Transparent pricing, fast delivery.']
        : [' Free quote available.', ' Built for Google and AI search.'];
    for (const pad of pads) {
      if (d.length >= minLen) break;
      const candidate = d + pad;
      if (candidate.length <= maxLen) {
        d = candidate;
      } else {
        d = smartTruncate(candidate, maxLen - 1);
        if (!d.endsWith('.')) d += '.';
        break;
      }
    }
  }

  if (d.length > maxLen) {
    d = smartTruncate(d, maxLen - 1);
    if (!d.endsWith('.')) d += '.';
  }

  return d.slice(0, maxLen);
}

export function buildMetaDescription(input: DescriptionInput): string {
  const { primaryKeyword, location, industry, service, usp, ctaHint } = input;

  const uniqueUSP = usp || DEFAULT_USP;
  const callToAction = ctaHint || 'Get a free quote or start your 7-day trial.';

  let description = '';

  if (service && location) {
    description = `${service} in ${location}: ${uniqueUSP}. Local SEO, fast sites, GEO/AEO. ${callToAction}`;
  } else if (service && industry) {
    description = `${service} for ${industry}: ${uniqueUSP}. Industry-specific SEO and web design. ${callToAction}`;
  } else if (industry) {
    description = `${industry} website & SEO solutions. ${uniqueUSP}. Packages for your vertical. ${callToAction}`;
  } else if (service) {
    description = `${service} services: ${uniqueUSP}. Search Console workflows, AI SEO, and delivery. ${callToAction}`;
  } else {
    description = `${primaryKeyword}: ${uniqueUSP}. Rank on Google and AI search. ${callToAction}`;
  }

  return finalizeDescription(description);
}

export function getDescriptionStatus(description: string): {
  length: number;
  status: 'too-short' | 'optimal' | 'too-long';
  message: string;
} {
  const length = description.length;

  if (length < META_DESC_MIN) {
    return { length, status: 'too-short', message: `Too short (${length} chars, target ${META_DESC_MIN}+)` };
  }
  if (length > 180) {
    return { length, status: 'too-long', message: `Too long (${length} chars, max 180)` };
  }
  return { length, status: 'optimal', message: `OK (${length} chars)` };
}

export { BASE_URL, BRAND_NAME, DEFAULT_USP };
