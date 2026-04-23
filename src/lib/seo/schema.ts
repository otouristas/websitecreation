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
        '@type': 'Article',
        headline: data.headline,
        description: data.description,
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        author: {
            '@type': 'Organization',
            name: data.author.name,
            url: data.author.url || BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
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
