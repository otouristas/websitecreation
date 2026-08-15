/**
 * Schema Markup Generator
 * Generates JSON-LD structured data for SEO
 */

import type {
    ArticleSchemaData,
    FAQSchemaData,
    BreadcrumbSchemaData,
    LocalBusinessSchemaData,
    ServiceSchemaData,
    OrganizationSchemaData,
    SchemaOutput,
} from '@/lib/types/seo';

const BASE_URL = 'https://anotherseoguru.com';
const BRAND_NAME = 'AnotherSEOGuru';

/**
 * Generate Article schema markup
 */
export function generateArticleSchema(data: ArticleSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': data.schemaType ?? 'Article',
        headline: data.headline,
        description: data.description,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        ...(data.inLanguage && { inLanguage: data.inLanguage }),
        ...(data.mainEntityOfPage && {
            mainEntityOfPage: { '@type': 'WebPage', '@id': data.mainEntityOfPage },
        }),
        author: {
            '@type': 'Organization',
            name: data.author.name,
            url: data.author.url || BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            name: BRAND_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`,
                width: 200,
                height: 60,
            },
        },
        ...(data.image && {
            image: {
                '@type': 'ImageObject',
                url: data.image.url,
                width: data.image.width,
                height: data.image.height,
            },
        }),
    };
}

/**
 * Generate FAQ schema markup
 */
export function generateFAQSchema(data: FAQSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Generate BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema(data: BreadcrumbSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
    };
}

/**
 * Generate LocalBusiness schema markup
 */
export function generateLocalBusinessSchema(data: LocalBusinessSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name,
        description: data.description,
        url: data.url,
        ...(data.address && {
            address: {
                '@type': 'PostalAddress',
                streetAddress: data.address.streetAddress,
                addressLocality: data.address.addressLocality,
                addressRegion: data.address.addressRegion,
                postalCode: data.address.postalCode,
                addressCountry: data.address.addressCountry,
            },
        }),
        ...(data.geo && {
            geo: {
                '@type': 'GeoCoordinates',
                latitude: data.geo.latitude,
                longitude: data.geo.longitude,
            },
            areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                    '@type': 'GeoCoordinates',
                    latitude: data.geo.latitude,
                    longitude: data.geo.longitude,
                },
                geoRadius: '40000', // ~25 miles in meters
            },
        }),
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.priceRange && { priceRange: data.priceRange }),
    };
}

/**
 * Generate Service schema markup
 */
export function generateServiceSchema(data: ServiceSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
            '@type': 'Organization',
            name: data.provider.name,
            url: data.provider.url,
        },
        ...(data.areaServed && { areaServed: data.areaServed }),
        ...(data.serviceType && { serviceType: data.serviceType }),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Service Offerings',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: data.name,
                    }
                }
            ]
        }
    };
}

/**
 * Generate Organization schema markup
 */
export function generateOrganizationSchema(data: OrganizationSchemaData): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: data.name,
        url: data.url,
        logo: data.logo,
        description: data.description,
        ...(data.contactPoint && {
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: data.contactPoint.contactType,
                email: data.contactPoint.email,
                telephone: data.contactPoint.telephone,
            },
        }),
        ...(data.sameAs && { sameAs: data.sameAs }),
    };
}

/**
 * Combine multiple schemas into a single array for page injection
 */
export function combineSchemas(...schemas: SchemaOutput[]): SchemaOutput[] {
    return schemas.filter(Boolean);
}

/**
 * Serialize schemas to JSON string for script injection
 */
export function serializeSchemas(schemas: SchemaOutput[]): string {
    return JSON.stringify(schemas);
}

/**
 * SoftwareApplication JSON-LD for the SEO platform product page.
 */
export function generateSoftwareApplicationSchema(input: {
    name: string;
    description: string;
    url: string;
}): SchemaOutput {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: input.name,
        description: input.description,
        url: input.url,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available; paid plans in app.',
        },
        provider: {
            '@type': 'Organization',
            name: BRAND_NAME,
            url: BASE_URL,
        },
    };
}

export { BASE_URL, BRAND_NAME };


export interface CollectionItem {
  readonly url: string;
  readonly name: string;
}

export interface CollectionPageSchemaData {
  readonly name: string;
  readonly description?: string;
  readonly url: string;
  readonly inLanguage?: string;
  readonly items: readonly CollectionItem[];
}

/**
 * CollectionPage + nested ItemList for archive surfaces (blog index, pillar
 * hubs, services, solutions, work). These pages previously emitted no
 * structured data, so an index of 69 posts looked like an ordinary page.
 *
 * Item URLs must already be absolute and locale-prefixed.
 */
export function generateCollectionPageSchema(
  data: CollectionPageSchemaData,
): SchemaOutput {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    url: data.url,
    ...(data.inLanguage ? { inLanguage: data.inLanguage } : {}),
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.items.length,
      itemListElement: data.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: item.url,
        name: item.name,
      })),
    },
  };
}

export interface OfferTier {
  readonly id: string;
  readonly name: string;
  readonly regular: number;
  readonly offer: number;
}

export interface OfferCatalogSchemaData {
  readonly name: string;
  readonly url: string;
  readonly locale: 'en' | 'el';
  readonly tiers: readonly OfferTier[];
  /** Net -> gross converter, injected so the VAT rate lives in one place. */
  readonly priceOf?: (tier: OfferTier) => number;
}

/**
 * OfferCatalog for the pricing page.
 *
 * The pricing page rendered a full price table while emitting no price schema
 * at all. Prices published here are NET of VAT, matching the figure shown as
 * the headline on each card; `priceSpecification.valueAddedTaxIncluded` says so
 * explicitly rather than leaving it ambiguous.
 */
export function generateOfferCatalogSchema(data: OfferCatalogSchemaData): SchemaOutput {
  const price = data.priceOf ?? ((t: OfferTier) => t.offer);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    url: data.url,
    provider: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: BRAND_NAME,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.name,
      itemListElement: data.tiers.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: price(t),
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: false,
        },
      })),
    },
  };
}
