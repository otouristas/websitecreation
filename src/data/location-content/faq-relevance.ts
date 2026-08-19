/**
 * Topical filter for city-pack FAQs.
 *
 * The packs carry city-level FAQs, and the service × location page merged all of
 * them into every service. That put "Πόσο κοστίζει η κατασκευή ιστοσελίδας;" on
 * the technical-audit page and "Κάνετε κατασκευή e-shop;" on the link-building
 * page - and, because the same block feeds FAQPage schema, it shipped that
 * mismatch to Google as structured data too.
 *
 * Classification is keyword-driven rather than hand-tagged across ~140 authored
 * FAQs. It is deliberately conservative: anything that does not clearly belong
 * to one topic is treated as `generic` and kept, because dropping a relevant FAQ
 * is worse than keeping a broadly applicable one.
 */

import type { LocationFaq } from './types';

export type FaqTopic = 'website-build' | 'eshop' | 'local-seo' | 'seo' | 'generic';

const RULES: readonly { topic: FaqTopic; rx: RegExp }[] = [
  { topic: 'eshop', rx: /e-?shop|ηλεκτρονικ[όο]\s+κατάστημα|woocommerce|καλάθι|πληρωμ/i },
  { topic: 'website-build', rx: /κατασκευ[ήη]\s+ιστοσελ|ιστοσελίδα[ς]?\s+(κοστ|στην|στη|στο)|φτιάχνετε\s+ιστοσελ|redesign|ανασχεδιασμ|site\s+από\s+την\s+αρχή/i },
  { topic: 'local-seo', rx: /τοπικ[όο]\s+SEO|google\s+business|map\s+pack|κοντά\s+μου|κριτικ[έε]ς|χάρτ[ηε]/i },
  { topic: 'seo', rx: /\bSEO\b|κατάταξη|αποτελέσματα|λέξεις[- ]κλειδι|google/i },
];

export function classifyFaq(faq: LocationFaq): FaqTopic {
  const text = `${faq.question} ${faq.answer}`;
  for (const rule of RULES) if (rule.rx.test(text)) return rule.topic;
  return 'generic';
}

/** Topics each service page may legitimately answer. `generic` is always allowed. */
const ALLOWED: Record<string, readonly FaqTopic[]> = {
  'website-creation': ['website-build', 'seo'],
  'website-redesign': ['website-build', 'seo'],
  'seo-web-design': ['website-build', 'seo'],
  'speed-optimization': ['seo', 'website-build'],
  'logo-design': [],
  'content-creation': ['seo'],
  'local-seo': ['local-seo', 'seo'],
  'link-building': ['seo'],
  'ai-visibility': ['seo'],
  'seo-audits': ['seo', 'local-seo'],
  'eshop-woocommerce': ['eshop', 'website-build'],
  'eshop-seo': ['eshop', 'seo'],
};

/**
 * City FAQs that belong on this service's page. Unknown services keep only
 * `generic` entries, which is the safe default for a newly added slug.
 */
export function packFaqsForService(
  faqs: readonly LocationFaq[] | undefined,
  serviceSlug: string,
  limit = 4,
): LocationFaq[] {
  if (!faqs?.length) return [];
  const allowed = new Set<FaqTopic>([...(ALLOWED[serviceSlug] ?? []), 'generic']);
  return faqs.filter((f) => allowed.has(classifyFaq(f))).slice(0, limit);
}
