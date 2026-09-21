/**
 * Schema Markup Generator
 * Generates JSON-LD structured data for SEO
 */

import type {
    ArticleSchemaData,
    DefinedTermSetSchemaData,
    PersonSchemaData,
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
        ...(data.about && {
            about: {
                '@type': data.about.type,
                '@id': `${data.about.url}#entity`,
                name: data.about.name,
                url: data.about.url,
                ...(data.about.areaServed?.length
                    ? { areaServed: data.about.areaServed }
                    : {}),
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
  /**
   * schema.org type of the thing the entry points at, e.g. 'BlogPosting'.
   *
   * Without it a ListItem carries a position and a link and nothing saying
   * what it is, which is an untyped list - the exact shape we would flag on a
   * client's site. Optional so existing callers keep working, but every
   * caller in this repo passes it.
   */
  readonly itemType?: string;
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
        ...(item.itemType
          ? { item: { '@type': item.itemType, '@id': item.url, name: item.name } }
          : {}),
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

/**
 * DefinedTermSet + DefinedTerm for the glossary.
 *
 * `/[locale]/glossary` renders 105 definitions - and, before this, no
 * structured data at all, so a page whose entire job is defining terms said
 * nothing machine-readable about any of them. A term set is also the one
 * place on this site where a long list of genuinely homogeneous entries
 * exists, which is what makes it readable as a set rather than as prose.
 *
 * Descriptions are the short definitions, matching the server-rendered list
 * in the page: markup that disagrees with the visible text is worse than no
 * markup.
 */
export function generateDefinedTermSetSchema(
  data: DefinedTermSetSchemaData,
): SchemaOutput {
  const setId = `${data.url}#glossary`;
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': setId,
    name: data.name,
    ...(data.description ? { description: data.description } : {}),
    url: data.url,
    ...(data.inLanguage ? { inLanguage: data.inLanguage } : {}),
    isPartOf: { '@id': `${BASE_URL}/#website` },
    hasDefinedTerm: data.terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${data.url}#${term.id}`,
      name: term.name,
      description: term.description,
      inDefinedTermSet: { '@id': setId },
    })),
  };
}

/**
 * Person schema.
 *
 * The seam, not the content. The site has no author bios and no team page, so
 * there is no real name, role or profile URL in this repo to put here, and
 * inventing one would be exactly the kind of aspirational claim
 * `src/data/company-facts.ts` rules out. Wire this up when a real person is
 * ready to be named.
 */
export function generatePersonSchema(data: PersonSchemaData): SchemaOutput {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    ...(data.url ? { url: data.url, '@id': `${data.url}#person` } : {}),
    ...(data.jobTitle ? { jobTitle: data.jobTitle } : {}),
    ...(data.description ? { description: data.description } : {}),
    ...(data.knowsAbout?.length ? { knowsAbout: data.knowsAbout } : {}),
    ...(data.sameAs?.length ? { sameAs: data.sameAs } : {}),
    ...(data.worksFor
      ? {
          worksFor: {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            name: data.worksFor.name,
            url: data.worksFor.url,
          },
        }
      : {}),
  };
}
