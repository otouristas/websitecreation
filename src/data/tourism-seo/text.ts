import type { TourismVertical } from './types';

/** Visible vertical-page prose. Shared process, rules, pricing and calls to action are excluded. */
export function visibleTourismText(vertical: TourismVertical): string {
  const raw = [
    vertical.lead,
    ...vertical.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    vertical.searches.join(' '),
    ...vertical.deliverables.flatMap((item) => [item.title, item.body]),
    ...vertical.regions.flatMap((region) => [region.label, region.note]),
    ...vertical.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join('\n');
  return raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
