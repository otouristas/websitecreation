import { generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';
import { HUB_TOURISM_FAQS } from './shared';
import type { TourismVertical } from './types';

const ORG_ID = `${BASE_URL}/#organization`;

export const TOURISM_HUB_PATH = '/el/seo-tourismou';
export const TOURISM_HUB_NAME = 'SEO για τουριστικές επιχειρήσεις';

export function tourismPath(slug: string): string {
  return `${TOURISM_HUB_PATH}/${slug}`;
}

export function tourismUrl(slug: string): string {
  return `${BASE_URL}${tourismPath(slug)}`;
}

const GREECE = { '@type': 'Country', name: 'Ελλάδα' } as const;

export function buildVerticalSchemas(vertical: TourismVertical): SchemaOutput[] {
  const url = tourismUrl(vertical.slug);
  const service: SchemaOutput = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: vertical.h1,
    description: vertical.description,
    url,
    inLanguage: 'el',
    serviceType: vertical.serviceType,
    provider: { '@id': ORG_ID },
    areaServed: GREECE,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: vertical.serviceType,
      itemListElement: vertical.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.title, description: item.body },
      })),
    },
  };
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Αρχική', url: '/el' },
        { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
        { name: vertical.name, url: tourismPath(vertical.slug) },
      ],
    }),
    service,
    generateFAQSchema({ faqs: vertical.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}

export function buildTourismHubSchemas(verticals: readonly TourismVertical[]): SchemaOutput[] {
  const url = `${BASE_URL}${TOURISM_HUB_PATH}`;
  return [
    generateBreadcrumbSchema({
      items: [
        { name: 'Αρχική', url: '/el' },
        { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Υπηρεσίες SEO για τουριστικές επιχειρήσεις',
      url,
      inLanguage: 'el',
      serviceType: 'SEO για τουριστικές επιχειρήσεις',
      provider: { '@id': ORG_ID },
      areaServed: GREECE,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: verticals.map((vertical, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: vertical.h1,
        url: tourismUrl(vertical.slug),
      })),
    },
    generateFAQSchema({ faqs: HUB_TOURISM_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}
