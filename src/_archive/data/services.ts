// Services data for programmatic SEO pages
export interface Service {
    slug: string;
    name: string;
    shortName: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    features: string[];
    icon: string;
}

export const services: Service[] = [
    {
        slug: 'website-creation',
        name: 'Website Creation',
        shortName: 'Web Creation',
        description: 'Beautiful, fast websites built for real business results. Custom design, full SEO setup, and optimized for conversions from day one.',
        metaTitle: 'Website Creation Services',
        metaDescription: 'Professional website creation. Fast-loading, SEO-optimized sites built for conversions.',
        features: [
            'Custom UX/UI design',
            'Fast-loading pages',
            'Mobile-first responsive',
            'Performance optimized',
            'SEO foundations included',
            'Analytics setup',
        ],
        icon: 'globe',
    },
    {
        slug: 'website-redesign',
        name: 'Website Redesign',
        shortName: 'Redesign',
        description: 'Transform your outdated website into a fast, modern, conversion-focused machine with our redesign services.',
        metaTitle: 'Website Redesign Services',
        metaDescription: 'Modernize your website with speed optimization, fresh design, and SEO migration.',
        features: [
            'Speed optimization',
            'Modern UI refresh',
            'SEO migration',
            'Content restructuring',
            'Mobile optimization',
            'Performance audit',
        ],
        icon: 'refresh',
    },
    {
        slug: 'seo-web-design',
        name: 'SEO Web Design',
        shortName: 'SEO Design',
        description: 'Websites designed with SEO at the core. Technical SEO, schema markup, and internal linking built-in.',
        metaTitle: 'SEO Web Design Services',
        metaDescription: 'SEO-first website design with technical optimization, schema markup, and ranking-focused architecture.',
        features: [
            'Technical SEO audit',
            'Schema markup',
            'Internal linking strategy',
            'Site architecture',
            'Meta optimization',
            'Speed optimization',
        ],
        icon: 'search',
    },
    {
        slug: 'speed-optimization',
        name: 'Speed Optimization',
        shortName: 'Speed',
        description: 'Website performance optimization for faster load times. Improve user experience and boost your search rankings.',
        metaTitle: 'Website Speed Optimization',
        metaDescription: 'Website speed optimization for faster load times. Improve user experience and search rankings.',
        features: [
            'Performance audit',
            'Load time optimization',
            'Image optimization',
            'Mobile speed',
            'Caching setup',
            'Code optimization',
        ],
        icon: 'zap',
    },
    {
        slug: 'ai-visibility',
        name: 'AI Visibility',
        shortName: 'AI SEO',
        description: 'Make your website visible to AI systems and chatbots. Schema, entities, and structured content for AI discovery.',
        metaTitle: 'AI Visibility & SEO Services',
        metaDescription: 'Optimize your website for AI systems. Schema implementation, entity optimization, and structured content.',
        features: [
            'Schema implementation',
            'Entity optimization',
            'Knowledge graph setup',
            'Structured content',
            'AI-friendly architecture',
            'Citation optimization',
        ],
        icon: 'brain',
    },
    {
        slug: 'logo-design',
        name: 'Logo Design',
        shortName: 'Logo',
        description: 'Professional logo design and brand kit creation. Build a memorable brand identity that stands out.',
        metaTitle: 'Logo Design & Branding Services',
        metaDescription: 'Professional logo design and brand kit creation. Build a memorable brand identity for your business.',
        features: [
            'Custom logo design',
            'Brand kit creation',
            'Color palette',
            'Typography selection',
            'Brand guidelines',
            'Multiple formats',
        ],
        icon: 'palette',
    },
    {
        slug: 'content-creation',
        name: 'Content Creation',
        shortName: 'Content',
        description: 'SEO-optimized content creation for service pages, location pages, and blog content that drives traffic.',
        metaTitle: 'Content Creation Services',
        metaDescription: 'Professional SEO content creation. Service pages, location pages, blog content that ranks and converts.',
        features: [
            'SEO copywriting',
            'Service page content',
            'Location page content',
            'Blog articles',
            'Conversion copy',
            'Content strategy',
        ],
        icon: 'edit',
    },
    {
        slug: 'local-seo',
        name: 'Local SEO & GBP',
        shortName: 'Local SEO',
        description: 'Dominate your local market. We optimize your Google Business Profile and build citations to get you ranked in the "Map Pack".',
        metaTitle: 'Local SEO & Google Business Profile Services',
        metaDescription: 'Expert Local SEO services. Google Business Profile optimization, citation building, and review management.',
        features: [
            'GBP optimization',
            'Local citation building',
            'Review management strategy',
            'Local keyword targeting',
            'Map pack ranking',
            'Neighborhood targeting',
        ],
        icon: 'map-pin',
    },
    {
        slug: 'link-building',
        name: 'Link Building',
        shortName: 'Backlinks',
        description: 'Authority building through high-quality backlinks. We secure relevant placements to boost your domain authority.',
        metaTitle: 'Link Building & Authority Services',
        metaDescription: 'White-hat link building services. High-authority guest posts, digital PR, and niche edits.',
        features: [
            'High DA guest posts',
            'Niche relevant links',
            'Digital PR outreach',
            'Broken link building',
            'Anchor text strategy',
            'Spam monitoring',
        ],
        icon: 'link',
    },
    {
        slug: 'seo-audits',
        name: 'SEO Audits',
        shortName: 'Audits',
        description: 'Comprehensive technical SEO audits. We identify and fix the hidden issues holding your rankings back.',
        metaTitle: 'Technical SEO Audit Services',
        metaDescription: 'Deep technical SEO audits. Core Web Vitals, crawlability, indexation, and penalty analysis.',
        features: [
            'Technical health check',
            'Core Web Vitals analysis',
            'Crawl budget optimization',
            'Internal linking audit',
            'Competitor gap analysis',
            'Penalty recovery',
        ],
        icon: 'clipboard-check',
    },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find((s) => s.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
    return services.map((s) => s.slug);
};
