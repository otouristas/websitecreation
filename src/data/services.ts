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
        description: 'We design your site around what customers come to do, whether that is booking a room or asking for a quote. The build includes mobile layouts, search setup and Analytics.',
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
        description: 'Keep the pages that already bring enquiries while making the rest of your site faster and easier to use. We map old addresses before the move.',
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
        slug: 'web-design',
        name: 'Web Design',
        shortName: 'Web Design',
        description: 'We plan the menu and the links between pages around the services people look for, so they can reach the right page and get in touch.',
        metaTitle: 'Web Design Services Built for SEO',
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
        description: 'We measure the pages your customers use, then fix slow images, code and caching. You can compare load times before and after the work.',
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
            'We check what AI answers say about your business and make the facts on your pages easier to find and quote.',
        metaTitle: 'AI SEO Agency: GEO & AEO Services',
        metaDescription:
            'GEO and AEO services: entity clarity, answer-shaped pages and measurement for visibility in ChatGPT, Gemini and AI Overviews, with no citation promises.',
        features: [
            'Entity and brand-fact consistency',
            'Answer-shaped FAQs for AEO',
            'Schema that matches visible text',
            'Commercial pages with quotable facts',
            'Monthly mention sampling, not AI-rank theatre',
            'Tourism and local-business programmes',
        ],
        icon: 'brain',
    },
    {
        slug: 'logo-design',
        name: 'Logo Design',
        shortName: 'Logo',
        description: 'Get a logo your team can use on the website, in print and on social profiles, with the colours, type and source files in one place.',
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
        description: 'We write service pages and articles around the questions customers ask before they call, book or buy.',
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
        description: 'Give nearby customers accurate hours, directions and a phone number. We work on your Google Business Profile and the pages for the areas you serve.',
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
        description: 'We identify publications your customers read and pitch relevant stories that can earn a link to your business.',
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
        description: 'Find out why your pages are hard to find in Google. We check indexing, speed and content, then give you a list of fixes in order of priority.',
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
        description: 'Open a WooCommerce shop with payments, shipping and stock set up around the way you sell.',
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
        description: 'Help shoppers find the right category or product in Google. We check filters, duplicate pages and mobile speed before planning new content.',
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
