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
        name: 'AI Visibility (GEO / AEO)',
        shortName: 'AI SEO',
        description:
            'AI SEO agency services for Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Get cited in ChatGPT, Perplexity and Google AI Overviews, not just classic rankings.',
        metaTitle: 'AI SEO Agency | GEO & AEO Services',
        metaDescription:
            'Hire an AI SEO agency for GEO and AEO. Schema, entities, citation-ready content and monitoring so your brand shows up in AI answers and search.',
        features: [
            'GEO / generative engine optimization',
            'AEO for AI Overviews & chat answers',
            'Schema + entity cleanup',
            'Citation-ready service pages',
            'AI mention monitoring',
            'Tourism & local brand playbooks',
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
        description: 'SEO content services: service pages, location pages, and blogs mapped to real search demand, built to rank and convert.',
        metaTitle: 'SEO Content Services, Pages & Blogs That Rank',
        metaDescription: 'SEO content creation for service pages, location pages, and blogs. Intent-led copy with FAQs and internal linking for organic growth.',
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
        description: 'Local SEO services for map pack and “near me” growth. We optimize Google Business Profile, citations, reviews, and location pages.',
        metaTitle: 'Local SEO Services, Map Pack, GBP & Near Me',
        metaDescription: 'Local SEO services and local SEO agency support: Google Business Profile, citations, reviews, and city pages that win map pack rankings.',
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
        description: 'White-hat link building services that earn relevant, editorial backlinks, not spam directories, to grow authority and rankings.',
        metaTitle: 'Link Building Services, White-Hat Authority Growth',
        metaDescription: 'Professional link building services: high-authority guest posts, digital PR, and niche-relevant placements with spam monitoring.',
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
        description: 'SEO audit services and technical SEO services: prioritized crawl, indexation, Core Web Vitals, and on-page fixes that unlock rankings.',
        metaTitle: 'SEO Audit Services & Technical SEO Audits',
        metaDescription: 'Professional SEO audit services: technical health, Core Web Vitals, crawlability, indexation, competitor gaps, plus a clear fix roadmap.',
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
    {
        slug: 'eshop-woocommerce',
        name: 'E-shop WooCommerce',
        shortName: 'E-shop Build',
        description: 'High-converting, fully customized WooCommerce e-shops. Integrated secure payments, shipping calculators, and automated inventory systems.',
        metaTitle: 'WooCommerce E-shop Creation Services',
        metaDescription: 'Professional WooCommerce e-shop creation. Beautiful, secure, and SEO-optimized online stores built for sales.',
        features: [
            'WooCommerce setup',
            'Custom product page design',
            'Payment gateway integration',
            'Shipping rules & checkout optimization',
            'SEO category structure',
            'Inventory management',
        ],
        icon: 'shopping-cart',
    },
    {
        slug: 'eshop-seo',
        name: 'E-shop SEO',
        shortName: 'E-shop SEO',
        description: 'Ecommerce SEO services for online stores: category and product optimization, schema, speed, and content that drives organic sales.',
        metaTitle: 'Ecommerce SEO Services, Categories, Products & Sales',
        metaDescription: 'Ecommerce SEO services for WooCommerce and online stores: category/product SEO, product schema, mobile speed, and conversion-focused content.',
        features: [
            'E-shop technical audit',
            'Category & product optimization',
            'Product schema markup',
            'E-commerce keyword research',
            'Speed & mobile optimization',
            'Conversion rate optimization',
        ],
        icon: 'trending-up',
    },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find((s) => s.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
    return services.map((s) => s.slug);
};
