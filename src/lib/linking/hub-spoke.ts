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
export function getPricingRelatedPaths(
    locale: SiteLocale = 'en',
): { path: string; titleEn: string; titleEl: string }[] {
    const costSeo = locale === 'el' ? '/blog/poso-kostizei-to-seo' : '/blog/how-much-does-seo-cost';
    const costSite = locale === 'el' ? '/blog/poso-kostizei-mia-istoselida' : '/blog/how-much-does-a-website-cost';
    const costEshop = locale === 'el' ? '/blog/kataskevi-eshop-odigos' : '/blog/ecommerce-website-cost-guide';

    return [
        { path: '/services/website-creation', titleEn: 'Website creation', titleEl: 'Κατασκευή ιστοσελίδων' },
        { path: '/services/eshop-woocommerce', titleEn: 'E-shop WooCommerce', titleEl: 'Κατασκευή e-shop' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility (GEO/AEO)', titleEl: 'Ορατότητα σε AI (GEO/AEO)' },
        { path: '/solutions/hotels', titleEn: 'Hotel websites & SEO', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/services/website-creation/athens-gr', titleEn: 'Website creation Athens', titleEl: 'Κατασκευή ιστοσελίδων Αθήνα' },
        { path: '/services/local-seo/thessaloniki-gr', titleEn: 'Local SEO Thessaloniki', titleEl: 'Τοπικό SEO Θεσσαλονίκη' },
        { path: costSeo, titleEn: 'How much does SEO cost?', titleEl: 'Πόσο κοστίζει το SEO;' },
        { path: costSite, titleEn: 'How much does a website cost?', titleEl: 'Πόσο κοστίζει μια ιστοσελίδα;' },
        { path: costEshop, titleEn: 'E-shop cost guide', titleEl: 'Οδηγός κατασκευής e-shop' },
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

/** Blog slug → commercial / money paths for RelatedPages (locale-agnostic paths). */
export const BLOG_MONEY_LINKS: Record<
    string,
    { path: string; titleEn: string; titleEl: string }[]
> = {
    'kataskevi-eshop-odigos': [
        { path: '/services/eshop-woocommerce', titleEn: 'WooCommerce e-shop', titleEl: 'Κατασκευή e-shop WooCommerce' },
        { path: '/services/eshop-seo', titleEn: 'E-shop SEO', titleEl: 'SEO για e-shop' },
        { path: '/pricing', titleEn: 'Pricing & packages', titleEl: 'Τιμές & πακέτα' },
        { path: '/work', titleEn: 'E-shop portfolio', titleEl: 'Έργα e-shop' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'ecommerce-website-cost-guide': [
        { path: '/services/eshop-woocommerce', titleEn: 'WooCommerce e-shop', titleEl: 'Κατασκευή e-shop WooCommerce' },
        { path: '/pricing', titleEn: 'Pricing & packages', titleEl: 'Τιμές & πακέτα' },
    ],
    'poso-kostizei-to-seo': [
        { path: '/pricing', titleEn: 'SEO pricing', titleEl: 'Τιμές SEO' },
        { path: '/services/seo-audits', titleEn: 'SEO services', titleEl: 'Υπηρεσίες SEO' },
        { path: '/services/local-seo', titleEn: 'Local SEO', titleEl: 'Τοπικό SEO' },
    ],
    'how-much-does-seo-cost': [
        { path: '/pricing', titleEn: 'SEO pricing', titleEl: 'Τιμές SEO' },
        { path: '/services/seo-audits', titleEn: 'SEO audits', titleEl: 'Υπηρεσίες SEO' },
        { path: '/services/local-seo', titleEn: 'Local SEO', titleEl: 'Τοπικό SEO' },
    ],
    'poso-kostizei-mia-istoselida': [
        { path: '/pricing', titleEn: 'Website pricing', titleEl: 'Τιμές ιστοσελίδας' },
        { path: '/services/website-creation', titleEn: 'Website creation', titleEl: 'Κατασκευή ιστοσελίδων' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'how-much-does-a-website-cost': [
        { path: '/pricing', titleEn: 'Website pricing', titleEl: 'Τιμές ιστοσελίδας' },
        { path: '/services/website-creation', titleEn: 'Website creation', titleEl: 'Κατασκευή ιστοσελίδων' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'seo-gia-xenodoxeia': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/blog/kataskevi-istoselidas-xenodoxeia', titleEn: 'Hotel website design', titleEl: 'Κατασκευή ιστοσελίδας ξενοδοχείου' },
        { path: '/services/local-seo', titleEn: 'Local SEO', titleEl: 'Τοπικό SEO' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility', titleEl: 'Ορατότητα σε AI' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/work', titleEn: 'Hotel portfolio', titleEl: 'Έργα ξενοδοχείων' },
    ],
    'seo-gia-xenodoxeia-odigos-2026': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility', titleEl: 'Ορατότητα σε AI' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
    ],
    'hotel-seo-guide': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/services/local-seo', titleEn: 'Local SEO', titleEl: 'Τοπικό SEO' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility', titleEl: 'Ορατότητα σε AI' },
    ],
    'seo-for-hotels-guide': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/services/ai-visibility', titleEn: 'AI visibility', titleEl: 'Ορατότητα σε AI' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
    ],
    'geo-agency-ellada': [
        { path: '/services/ai-visibility', titleEn: 'AI visibility (GEO/AEO)', titleEl: 'AI Visibility (GEO/AEO)' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/work', titleEn: 'Portfolio', titleEl: 'Έργα' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'kataskevi-istoselidas-xenodoxeia': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/blog/seo-gia-xenodoxeia', titleEn: 'Hotel SEO guide', titleEl: 'SEO για ξενοδοχεία' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/work', titleEn: 'Portfolio', titleEl: 'Έργα' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'hotel-website-design': [
        { path: '/solutions/hotels', titleEn: 'Hotel solutions', titleEl: 'Λύσεις για ξενοδοχεία' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/work', titleEn: 'Portfolio', titleEl: 'Έργα' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'google-search-operators-2026': [
        { path: '/blog/gsc-weekly-ops-playbook', titleEn: 'GSC weekly ops', titleEl: 'Εβδομαδιαίο GSC playbook' },
        { path: '/blog/technical-seo-guide', titleEn: 'Technical SEO', titleEl: 'Τεχνικό SEO' },
        { path: '/tools/free-seo-tools', titleEn: 'Free SEO tools', titleEl: 'Δωρεάν εργαλεία SEO' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'ai-seo-agency-geo-aeo': [
        { path: '/services/ai-visibility', titleEn: 'AI visibility (GEO/AEO)', titleEl: 'AI Visibility (GEO/AEO)' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'ai-seo-agency-geo-aeo-el': [
        { path: '/services/ai-visibility', titleEn: 'AI visibility (GEO/AEO)', titleEl: 'AI Visibility (GEO/AEO)' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/get-started', titleEn: 'Get a quote', titleEl: 'Ζητήστε προσφορά' },
    ],
    'what-is-seo': [
        { path: '/services/seo-audits', titleEn: 'SEO services', titleEl: 'Υπηρεσίες SEO' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/glossary', titleEn: 'SEO glossary', titleEl: 'Γλωσσάρι SEO' },
    ],
    'seo-gia-arxarious': [
        { path: '/services/seo-audits', titleEn: 'SEO services', titleEl: 'Υπηρεσίες SEO' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/glossary', titleEn: 'SEO glossary', titleEl: 'Γλωσσάρι SEO' },
    ],
    'seo-for-beginners': [
        { path: '/services/seo-audits', titleEn: 'SEO services', titleEl: 'Υπηρεσίες SEO' },
        { path: '/pricing', titleEn: 'Pricing', titleEl: 'Τιμές' },
        { path: '/glossary', titleEn: 'SEO glossary', titleEl: 'Γλωσσάρι SEO' },
    ],
};

export function getBlogMoneyLinks(
    slug: string,
): { path: string; titleEn: string; titleEl: string }[] {
    return BLOG_MONEY_LINKS[slug] ?? [];
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
