import { generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';
import { HUB_FAQS } from './shared';
import type { PlacePageData } from './types';

const ORG_ID = `${BASE_URL}/#organization`;

export function placePath(slug: string): string {
  return `/el/seo/${slug}`;
}

export function placeUrl(slug: string): string {
  return `${BASE_URL}${placePath(slug)}`;
}

export function buildPlaceSchemas(place: PlacePageData): SchemaOutput[] {
  const url = placeUrl(place.slug);
  const service: SchemaOutput = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: place.h1,
    description: place.description,
    url,
    inLanguage: 'el',
    serviceType: 'SEO',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': place.areaServedType,
      name: place.name,
    },
  };
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Αρχική', url: '/el' },
        { name: 'SEO σε όλη την Ελλάδα', url: '/el/seo' },
        { name: `SEO ${place.name}`, url: placePath(place.slug) },
      ],
    }),
    service,
    generateFAQSchema({ faqs: place.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}

export function buildHubSchemas(): SchemaOutput[] {
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Αρχική', url: '/el' },
        { name: 'SEO σε όλη την Ελλάδα', url: '/el/seo' },
      ],
    }),
    generateFAQSchema({ faqs: HUB_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}
