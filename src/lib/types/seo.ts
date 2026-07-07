/**
 * SEO Type Definitions
 * Schema markup types and metadata interfaces
 */

import type { FAQ, Breadcrumb, SchemaType } from './page';

// Article schema data
export interface ArticleSchemaData {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author: {
        name: string;
        url?: string;
    };
    image?: {
        url: string;
        width: number;
        height: number;
    };
    /** Use BlogPosting for blog posts (richer type than generic Article). */
    schemaType?: 'Article' | 'BlogPosting';
    /** BCP-47 language of the content, e.g. 'el' | 'en'. */
    inLanguage?: string;
    /** Canonical URL of the page this article is the main entity of. */
    mainEntityOfPage?: string;
}

// FAQ schema data (uses FAQ from page.ts)
export interface FAQSchemaData {
    faqs: FAQ[];
}

// Breadcrumb schema data (uses Breadcrumb from page.ts)
export interface BreadcrumbSchemaData {
    items: Breadcrumb[];
}

// Local business schema data
export interface LocalBusinessSchemaData {
    name: string;
    description: string;
    address?: {
        streetAddress?: string;
        addressLocality: string;
        addressRegion: string;
        postalCode?: string;
        addressCountry: string;
    };
    geo?: {
        latitude: number;
        longitude: number;
    };
    telephone?: string;
    url: string;
    priceRange?: string;
}

// Service schema data
export interface ServiceSchemaData {
    name: string;
    description: string;
    provider: {
        name: string;
        url: string;
    };
    areaServed?: string[];
    serviceType?: string;
}

// Organization schema data
export interface OrganizationSchemaData {
    name: string;
    url: string;
    logo: string;
    description: string;
    contactPoint?: {
        contactType: string;
        email?: string;
        telephone?: string;
    };
    sameAs?: string[];
}

// Schema output type
export interface SchemaOutput {
    '@context': 'https://schema.org';
    '@type': SchemaType | 'Organization';
    [key: string]: unknown;
}

// Export all types for convenience
export type {
    FAQ,
    Breadcrumb,
    SchemaType,
};
