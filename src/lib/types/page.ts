/**
 * Page Data Model for Programmatic SEO
 * Supports 100K+ pages with structured content and SEO metadata
 */

// Core page content section
export interface ContentSection {
    type: 'introduction' | 'definition' | 'benefits' | 'step-by-step' | 'faq' | 'conclusion' | 'tools' | 'comparison';
    heading: string;
    content: string;
    subSections?: ContentSection[];
    cta?: string;
}

// FAQ item structure
export interface FAQ {
    question: string;
    answer: string;
}

// Breadcrumb for navigation hierarchy
export interface Breadcrumb {
    name: string;
    url: string;
}

// Keyword with SEO metadata
export interface Keyword {
    keyword: string;
    searchVolume?: number;
    difficulty?: number;
    intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
    primary: boolean;
}

// Page type for template selection
export type PageType = 'hub' | 'spoke' | 'guide' | 'comparison' | 'tutorial' | 'tool-review' | 'beginner-guide' | 'location' | 'service' | 'industry';

// Schema type for structured data
export type SchemaType =
    | 'Article'
    | 'FAQPage'
    | 'BreadcrumbList'
    | 'LocalBusiness'
    | 'Service'
    | 'Product'
    | 'SoftwareApplication';

// Traffic/priority tiers
export type Priority = 'high' | 'medium' | 'low';

// Complete page data model
export interface PageDataModel {
    // Identification
    id: string;
    slug: string;
    cluster: string;
    pageType: PageType;

    // SEO Metadata
    seo: {
        title: string;
        metaDescription: string;
        canonical: string;
        h1: string;
        focusKeyword: string;
        relatedKeywords: string[];
    };

    // Content structure
    content: {
        sections: ContentSection[];
        faqs?: FAQ[];
        readTime?: number;
    };

    // Structured data
    schema: {
        types: SchemaType[];
        datePublished: string;
        dateModified: string;
        author: string;
        breadcrumbs: Breadcrumb[];
    };

    // Rendering config
    rendering: {
        prerender: boolean;
        revalidate: number;
        priority: Priority;
    };

    // Internal linking
    links: {
        hubPage?: string;
        relatedPages: string[];
        previousPage?: string;
        nextPage?: string;
    };

    // Tracking
    tracking: {
        pageGroup: string;
        intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
        expectedTraffic: Priority;
    };
}

// Helper type for partial page creation
export type CreatePageInput = Omit<PageDataModel, 'id'> & { id?: string };
