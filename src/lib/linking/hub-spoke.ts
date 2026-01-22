/**
 * Hub-Spoke Internal Linking System
 * Manages relationships between hub pages and spoke pages
 */

import { services } from '@/data/services';
import { industries } from '@/data/industries';
import type { Breadcrumb } from '@/lib/types/page';

// Cluster type definition
interface Cluster {
    hub: string;
    name: string;
    focusKeyword: string;
    spokes: string[];
}

// Cluster definitions matching plan.md
export const clusters: Record<string, Cluster> = {
    'seo-fundamentals': {
        hub: '/seo-fundamentals',
        name: 'SEO Fundamentals',
        focusKeyword: 'what is seo',
        spokes: ['/seo-for-beginners', '/importance-of-seo', '/seo-basics'],
    },
    'website-seo': {
        hub: '/website-seo',
        name: 'Website Optimization',
        focusKeyword: 'website seo',
        spokes: ['/on-page-seo', '/website-seo-checklist', '/seo-optimization-techniques'],
    },
    'seo-services': {
        hub: '/services',
        name: 'SEO Services',
        focusKeyword: 'seo services',
        spokes: services.map((s) => `/services/${s.slug}`),
    },
    'ai-seo': {
        hub: '/ai-seo',
        name: 'AI-Powered SEO',
        focusKeyword: 'ai seo',
        spokes: ['/ai-seo-tools', '/ai-vs-traditional-seo', '/how-to-use-ai-for-seo'],
    },
    'technical-seo': {
        hub: '/technical-seo',
        name: 'Technical SEO',
        focusKeyword: 'technical seo',
        spokes: ['/core-web-vitals', '/page-speed-optimization', '/seo-ranking-factors'],
    },
    'seo-tools': {
        hub: '/seo-tools',
        name: 'SEO Tools',
        focusKeyword: 'seo tools',
        spokes: ['/keyword-research-tools', '/free-seo-tools', '/seo-tools-comparison'],
    },
    'boost-traffic': {
        hub: '/boost-traffic',
        name: 'Traffic Growth',
        focusKeyword: 'boost website traffic',
        spokes: ['/increase-organic-traffic', '/seo-ranking-improvement', '/organic-traffic-strategies'],
    },
    'industries': {
        hub: '/solutions',
        name: 'Industry Solutions',
        focusKeyword: 'website solutions',
        spokes: industries.map((i) => `/solutions/${i.slug}`),
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

/**
 * Generate breadcrumb path for a page
 */
export function generateBreadcrumbs(
    segments: { name: string; url: string }[]
): Breadcrumb[] {
    return [
        { name: 'Home', url: '/' },
        ...segments,
    ];
}

/**
 * Generate service page breadcrumbs
 */
export function getServiceBreadcrumbs(serviceName: string, serviceSlug: string): Breadcrumb[] {
    return generateBreadcrumbs([
        { name: 'Services', url: '/services' },
        { name: serviceName, url: `/services/${serviceSlug}` },
    ]);
}

/**
 * Generate service + location page breadcrumbs
 */
export function getServiceLocationBreadcrumbs(
    serviceName: string,
    serviceSlug: string,
    cityName: string,
    locationSlug: string
): Breadcrumb[] {
    return generateBreadcrumbs([
        { name: 'Services', url: '/services' },
        { name: serviceName, url: `/services/${serviceSlug}` },
        { name: cityName, url: `/services/${serviceSlug}/${locationSlug}` },
    ]);
}

/**
 * Generate industry page breadcrumbs
 */
export function getIndustryBreadcrumbs(industryName: string, industrySlug: string): Breadcrumb[] {
    return generateBreadcrumbs([
        { name: 'Solutions', url: '/solutions' },
        { name: industryName, url: `/solutions/${industrySlug}` },
    ]);
}

/**
 * Generate industry + service page breadcrumbs
 */
export function getIndustryServiceBreadcrumbs(
    industryName: string,
    industrySlug: string,
    serviceName: string,
    serviceSlug: string
): Breadcrumb[] {
    return generateBreadcrumbs([
        { name: 'Solutions', url: '/solutions' },
        { name: industryName, url: `/solutions/${industrySlug}` },
        { name: serviceName, url: `/solutions/${industrySlug}/${serviceSlug}` },
    ]);
}
