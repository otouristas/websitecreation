/**
 * Hub-Spoke Internal Linking System
 * Manages relationships between hub pages and spoke pages
 */

import { services } from '@/data/services';
import { industries, TOURISM_INDUSTRY_SLUGS } from '@/data/industries';
import { MARKETING_FEATURES } from '@/data/marketing-features';
import { COMPARE_PAGES } from '@/data/compare-pages';
import type { Breadcrumb } from '@/lib/types/page';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

// Cluster type definition
interface Cluster {
    hub: string;
    name: string;
    focusKeyword: string;
    spokes: string[];
}

/** Live hubs only — dead stub clusters removed to avoid linking to 404s. */
export const clusters: Record<string, Cluster> = {
    'seo-services': {
        hub: '/services',
        name: 'SEO Services',
        focusKeyword: 'seo services',
        spokes: [
            ...services.map((s) => `/services/${s.slug}`),
            '/pricing',
            '/get-started',
            '/services/website-creation/athens-gr',
            '/services/local-seo/thessaloniki-gr',
            '/solutions/hotels',
            '/services/eshop-woocommerce',
            '/work',
        ],
    },
    industries: {
        hub: '/solutions',
        name: 'Industry Solutions',
        focusKeyword: 'website solutions',
        spokes: [
            ...industries.map((i) => `/solutions/${i.slug}`),
            ...TOURISM_INDUSTRY_SLUGS.map((slug) => `/solutions/${slug}/website-creation`),
            '/pricing',
            '/get-started',
        ],
    },
    'seo-platform': {
        hub: '/platform',
        name: 'SEO Platform',
        focusKeyword: 'seo software platform',
        spokes: [
            '/platform/features',
            '/platform/pricing',
            '/resources',
            '/glossary',
            '/tools',
            '/blog/pillar-search-console-mastery',
            '/blog/pillar-ai-llm-visibility',
            '/blog/pillar-technical-seo-in-house',
            '/blog/pillar-agency-playbooks',
            '/platform/for/agencies',
            '/platform/for/in-house',
            '/platform/for/ecommerce',
            ...MARKETING_FEATURES.map((f) => `/platform/features/${f.slug}`),
            ...COMPARE_PAGES.map((c) => `/compare/${c.slug}`),
        ],
    },
};

export type ClusterKey = keyof typeof clusters;

/**
 * Get hub page for a given spoke URL
 */
export function getHubForPage(pageUrl: string): string | null {
    for (const cluster of Object.values(clusters)) {
        if (cluster.spokes.includes(pageUrl)) {
            return cluster.hub;
        }
    }
    return null;
}

/**
 * Get all spokes for a hub page
 */
export function getSpokesForHub(hubUrl: string): string[] {
    for (const cluster of Object.values(clusters)) {
        if (cluster.hub === hubUrl) {
            return [...cluster.spokes];
        }
    }
    return [];
}

/**
 * Get related pages from same cluster (excluding current page)
 */
export function getRelatedPages(pageUrl: string, limit = 5): string[] {
    for (const cluster of Object.values(clusters)) {
        if (cluster.spokes.includes(pageUrl) || cluster.hub === pageUrl) {
            const allPages = [cluster.hub, ...cluster.spokes];
            return allPages
                .filter((p) => p !== pageUrl)
                .slice(0, limit);
        }
    }
    return [];
}

/** Money-page related links for pricing (locale-agnostic paths). */
export function getPricingRelatedPaths(): { path: string; titleEn: string; titleEl: string }[] {
    return [
        { path: '/services/website-creation', titleEn: 'Website creation', titleEl: 'Κατασκευή ιστοσελίδων' },
        { path: '/services/eshop-woocommerce', titleEn: 'E-shop WooCommerce', titleEl: 'Κατασκευή e-shop' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility (GEO/AEO)', titleEl: 'Ορατότητα σε AI (GEO/AEO)' },
        { path: '/solutions/hotels', titleEn: 'Hotel websites & SEO', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/services/website-creation/athens-gr', titleEn: 'Website creation Athens', titleEl: 'Κατασκευή ιστοσελίδων Αθήνα' },
        { path: '/services/local-seo/thessaloniki-gr', titleEn: 'Local SEO Thessaloniki', titleEl: 'Τοπικό SEO Θεσσαλονίκη' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
        { path: '/work', titleEn: 'Portfolio & case studies', titleEl: 'Έργα & case studies' },
    ];
}

/** Related money links for a service hub. */
export function getServiceHubRelatedPaths(serviceSlug: string): { path: string; titleEn: string; titleEl: string }[] {
    return [
        { path: '/pricing', titleEn: 'Pricing & packages', titleEl: 'Τιμές & πακέτα' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
        { path: '/solutions/hotels', titleEn: 'Hotels & hospitality', titleEl: 'Ξενοδοχεία & φιλοξενία' },
        { path: '/solutions/rent-a-car', titleEn: 'Rent-a-car websites', titleEl: 'Ενοικιάσεις αυτοκινήτων' },
        { path: `/services/${serviceSlug}/athens-gr`, titleEn: 'Athens', titleEl: 'Αθήνα' },
        { path: `/services/${serviceSlug}/thessaloniki-gr`, titleEn: 'Thessaloniki', titleEl: 'Θεσσαλονίκη' },
        { path: '/work', titleEn: 'Related work', titleEl: 'Σχετικά έργα' },
    ];
}

/**
 * Generate breadcrumb path for a page (paths are locale-prefixed).
 */
export function generateBreadcrumbs(
    segments: { name: string; url: string }[],
    locale: SiteLocale = 'en',
): Breadcrumb[] {
    const lp = (path: string) => localizedPath(locale, path);
    return [
        { name: locale === 'el' ? 'Αρχική' : 'Home', url: lp('/') },
        ...segments.map((s) => ({
            name: s.name,
            url: s.url.startsWith('http') || s.url.startsWith('/en/') || s.url.startsWith('/el/')
                ? s.url
                : lp(s.url),
        })),
    ];
}

/**
 * Generate service page breadcrumbs
 */
export function getServiceBreadcrumbs(
    serviceName: string,
    serviceSlug: string,
    locale: SiteLocale = 'en',
): Breadcrumb[] {
    return generateBreadcrumbs(
        [
            { name: locale === 'el' ? 'Υπηρεσίες' : 'Services', url: '/services' },
            { name: serviceName, url: `/services/${serviceSlug}` },
        ],
        locale,
    );
}

/**
 * Generate service + location page breadcrumbs
 */
export function getServiceLocationBreadcrumbs(
    serviceName: string,
    serviceSlug: string,
    cityName: string,
    locationSlug: string,
    locale: SiteLocale = 'en',
): Breadcrumb[] {
    return generateBreadcrumbs(
        [
            { name: locale === 'el' ? 'Υπηρεσίες' : 'Services', url: '/services' },
            { name: serviceName, url: `/services/${serviceSlug}` },
            { name: cityName, url: `/services/${serviceSlug}/${locationSlug}` },
        ],
        locale,
    );
}

/**
 * Generate industry page breadcrumbs
 */
export function getIndustryBreadcrumbs(
    industryName: string,
    industrySlug: string,
    locale: SiteLocale = 'en',
): Breadcrumb[] {
    return generateBreadcrumbs(
        [
            { name: locale === 'el' ? 'Λύσεις' : 'Solutions', url: '/solutions' },
            { name: industryName, url: `/solutions/${industrySlug}` },
        ],
        locale,
    );
}

/**
 * Generate industry + service page breadcrumbs
 */
export function getIndustryServiceBreadcrumbs(
    industryName: string,
    industrySlug: string,
    serviceName: string,
    serviceSlug: string,
    locale: SiteLocale = 'en',
): Breadcrumb[] {
    return generateBreadcrumbs(
        [
            { name: locale === 'el' ? 'Λύσεις' : 'Solutions', url: '/solutions' },
            { name: industryName, url: `/solutions/${industrySlug}` },
            { name: serviceName, url: `/solutions/${industrySlug}/${serviceSlug}` },
        ],
        locale,
    );
}
