// SEO Metadata Builder
// Generates complete Next.js Metadata objects with OG/Twitter alignment

import { Metadata } from 'next';
import { buildMetaDescription, BASE_URL, BRAND_NAME } from './description';

interface MetadataInput {
    title: string;
    description?: string;
    path: string;
    primaryKeyword?: string;
    location?: string;
    industry?: string;
    service?: string;
    usp?: string;
    ctaHint?: string;
    noIndex?: boolean;
}

/**
 * Build complete Metadata object for Next.js App Router
 * Ensures title, description, canonical, OG, and Twitter are aligned
 */
export function buildMetadata(input: MetadataInput): Metadata {
    const {
        title,
        description: customDescription,
        path,
        primaryKeyword,
        location,
        industry,
        service,
        usp,
        ctaHint,
        noIndex = false,
    } = input;

    // Generate description if not provided
    const description = customDescription || buildMetaDescription({
        primaryKeyword: primaryKeyword || title,
        location,
        industry,
        service,
        usp,
        ctaHint,
    });

    // Build canonical URL (ensure no trailing slash except for root)
    const canonical = path === '/'
        ? BASE_URL
        : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

    // Clean title - aggressively remove any existing brand suffixes/prefixes to prevent duplication
    let cleanTitle = title;

    // Remove " | AnotherSEOGuru" or " - AnotherSEOGuru" (case insensitive)
    cleanTitle = cleanTitle.replace(new RegExp(`\\s*[\\|\\-]\\s*${BRAND_NAME}`, 'gi'), '');

    // Remove "AnotherSEOGuru | " or "AnotherSEOGuru - " at start
    cleanTitle = cleanTitle.replace(new RegExp(`^${BRAND_NAME}\\s*[\\|\\-]\\s*`, 'gi'), '');

    // Remove just "AnotherSEOGuru" if it's there specifically (but be careful not to remove it if it's the ONLY thing, though usually we append)
    if (cleanTitle.toLowerCase() !== BRAND_NAME.toLowerCase()) {
        cleanTitle = cleanTitle.replace(new RegExp(BRAND_NAME, 'gi'), '').trim();
    }

    // Clean up any double separators or trailing separators
    cleanTitle = cleanTitle
        .replace(/\s*\|\s*$/, '')
        .replace(/\s*-\s*$/, '')
        .replace(/^\s*\|\s*/, '')
        .replace(/^\s*-\s*/, '')
        .trim();

    // Build full title with single brand suffix
    // If the title IS the brand name, don't duplicate it
    const fullTitle = cleanTitle.toLowerCase() === BRAND_NAME.toLowerCase()
        ? BRAND_NAME
        : `${cleanTitle} | ${BRAND_NAME}`;

    const metadata: Metadata = {
        title: fullTitle,
        description,
        alternates: {
            canonical,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonical,
            siteName: BRAND_NAME,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
        },
    };

    // Add noindex if specified
    if (noIndex) {
        metadata.robots = {
            index: false,
            follow: false,
        };
    }

    return metadata;
}

/**
 * Build metadata for service pages
 */
export function buildServiceMetadata(service: { name: string; slug: string; metaDescription?: string }): Metadata {
    return buildMetadata({
        title: `${service.name} Services`,
        description: service.metaDescription,
        path: `/services/${service.slug}`,
        service: service.name,
        ctaHint: 'View pricing and get started.',
    });
}

/**
 * Build metadata for service × location pages
 */
export function buildServiceLocationMetadata(
    service: { name: string; slug: string },
    location: { city: string; state: string; stateCode: string; slug: string }
): Metadata {
    const cityState = `${location.city}, ${location.stateCode}`;

    return buildMetadata({
        title: `${service.name} in ${cityState}`,
        path: `/services/${service.slug}/${location.slug}`,
        service: service.name,
        location: cityState,
        usp: `Fast, beautiful websites for ${location.city} businesses`,
        ctaHint: 'Get a free quote today.',
    });
}

/**
 * Build metadata for industry hub pages
 */
export function buildIndustryMetadata(industry: { name: string; slug: string; metaDescription?: string }): Metadata {
    return buildMetadata({
        title: `Website Solutions for ${industry.name}`,
        description: industry.metaDescription,
        path: `/solutions/${industry.slug}`,
        industry: industry.name,
        ctaHint: 'See packages for your industry.',
    });
}

/**
 * Build metadata for industry × service pages
 */
export function buildIndustryServiceMetadata(
    industry: { name: string; slug: string },
    service: { name: string; slug: string }
): Metadata {
    return buildMetadata({
        title: `${service.name} for ${industry.name}`,
        path: `/solutions/${industry.slug}/${service.slug}`,
        service: service.name,
        industry: industry.name,
        usp: `Specialized ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} businesses`,
        ctaHint: 'Get started today.',
    });
}

export { BASE_URL, BRAND_NAME };
