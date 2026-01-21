// Industries data for programmatic SEO pages
export interface Industry {
    slug: string;
    name: string;
    description: string;
    metaDescription: string;
    painPoints: string[];
    icon: string;
}

export const industries: Industry[] = [
    {
        slug: 'restaurants',
        name: 'Restaurants',
        description: 'Website solutions tailored for restaurants, cafes, and food businesses. Online menus, reservations, and local SEO.',
        metaDescription: 'Professional websites for restaurants. Online menus, reservations, local SEO optimization.',
        painPoints: ['Online menu display', 'Table reservations', 'Local visibility', 'Mobile ordering'],
        icon: 'utensils',
    },
    {
        slug: 'hotels',
        name: 'Hotels',
        description: 'Hotel and hospitality websites with booking integrations, gallery showcases, and tourism-focused SEO.',
        metaDescription: 'Hotel websites with booking systems, galleries, and tourism SEO optimization.',
        painPoints: ['Direct bookings', 'Room showcases', 'OTA competition', 'Guest reviews'],
        icon: 'building',
    },
    {
        slug: 'real-estate',
        name: 'Real Estate',
        description: 'Real estate websites with property listings, search functionality, and local market SEO strategies.',
        metaDescription: 'Real estate websites with property listings, IDX integration, and local SEO.',
        painPoints: ['Property listings', 'Lead generation', 'Market visibility', 'Virtual tours'],
        icon: 'home',
    },
    {
        slug: 'lawyers',
        name: 'Lawyers',
        description: 'Law firm websites that build trust, showcase expertise, and generate qualified leads through SEO.',
        metaDescription: 'Law firm websites that build trust and generate leads. Practice area pages and local SEO.',
        painPoints: ['Trust building', 'Practice areas', 'Case results', 'Attorney profiles'],
        icon: 'scale',
    },
    {
        slug: 'doctors',
        name: 'Doctors',
        description: 'Medical practice websites with HIPAA considerations, patient portals, and healthcare SEO strategies.',
        metaDescription: 'Medical practice websites with patient focus. Healthcare SEO and appointment integration.',
        painPoints: ['Patient trust', 'Appointment booking', 'Service descriptions', 'Reviews management'],
        icon: 'stethoscope',
    },
    {
        slug: 'gyms',
        name: 'Gyms',
        description: 'Fitness center websites with class schedules, membership info, and local fitness SEO optimization.',
        metaDescription: 'Gym and fitness center websites. Class schedules, memberships, and local SEO.',
        painPoints: ['Class scheduling', 'Membership signups', 'Trainer profiles', 'Facility showcase'],
        icon: 'dumbbell',
    },
    {
        slug: 'ecommerce',
        name: 'E-commerce',
        description: 'E-commerce websites built for performance, conversions, and product-focused SEO strategies.',
        metaDescription: 'E-commerce websites optimized for speed and conversions. Product SEO and checkout optimization.',
        painPoints: ['Fast checkout', 'Product visibility', 'Cart abandonment', 'Mobile shopping'],
        icon: 'shopping-cart',
    },
    {
        slug: 'travel-agencies',
        name: 'Travel Agencies',
        description: 'Travel agency websites with destination pages, tour packages, and travel industry SEO.',
        metaDescription: 'Travel agency websites with destination content, tour packages, and travel SEO.',
        painPoints: ['Destination pages', 'Tour bookings', 'Travel guides', 'Trust signals'],
        icon: 'plane',
    },
    {
        slug: 'salons',
        name: 'Salons',
        description: 'Beauty salon and spa websites with service menus, booking systems, and local beauty SEO.',
        metaDescription: 'Salon and spa websites with online booking, service menus, and local SEO.',
        painPoints: ['Online booking', 'Service showcase', 'Staff profiles', 'Before/after gallery'],
        icon: 'scissors',
    },
    {
        slug: 'contractors',
        name: 'Contractors',
        description: 'Contractor and home service websites with project portfolios, quotes, and local service area SEO.',
        metaDescription: 'Contractor websites with project portfolios, quote forms, and service area SEO.',
        painPoints: ['Project gallery', 'Quote requests', 'Service areas', 'Certifications'],
        icon: 'hammer',
    },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
    return industries.find((i) => i.slug === slug);
};

export const getAllIndustrySlugs = (): string[] => {
    return industries.map((i) => i.slug);
};
