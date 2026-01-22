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
        slug: 'plumbers',
        name: 'Plumbers',
        description: 'High-converting websites for plumbing contractors. Emergency service booking, area validation, and local trust signals.',
        metaDescription: 'Plumbing websites aimed at generating emergency calls. SEO for local plumbing services.',
        painPoints: ['Emergency calls', 'Service area routing', 'Trust verification', 'Job scheduling'],
        icon: 'wrench',
    },
    {
        slug: 'hvac',
        name: 'HVAC',
        description: 'Professional sites for HVAC companies. Seasonal promotion tools, maintenance plans, and equipment showcases.',
        metaDescription: 'HVAC contractor websites with seasonal booking tools and maintenance plan features.',
        painPoints: ['Seasonal demand', 'System quotes', 'Maintenance contracts', 'Emergency repairs'],
        icon: 'thermometer',
    },
    {
        slug: 'electricians',
        name: 'Electricians',
        description: 'Trust-building websites for licensed electricians. Service galleries, safety certifications, and quote request forms.',
        metaDescription: 'Electrician websites that build trust. Showcase projects, certifications, and get more quotes.',
        painPoints: ['Safety assurance', 'Project quoting', 'Emergency service', 'Licensing proof'],
        icon: 'zap',
    },
    {
        slug: 'roofers',
        name: 'Roofers',
        description: 'Roofing websites designed to capture high-value leads. Project galleries, material showcases, and storm damage landing pages.',
        metaDescription: 'Roofing company websites optimized for high-ticket leads. Storm damage and replacement services.',
        painPoints: ['High ticket trust', 'Storm damage leads', 'Material selection', 'Insurance claims'],
        icon: 'home',
    },
    {
        slug: 'landscapers',
        name: 'Landscapers',
        description: 'Visual-first websites for landscaping companies. Portfolio galleries, maintenance scheduling, and seasonal service pages.',
        metaDescription: 'Landscaping websites with beautiful portfolios. Maintenance contracts and design consultation booking.',
        painPoints: ['Visual portfolio', 'Recurring contracts', 'Seasonal services', 'Design consultations'],
        icon: 'flower',
    },
    {
        slug: 'painters',
        name: 'Painters',
        description: 'Lead-generation sites for painting contractors. Color visualizers, project galleries, and instant quote estimations.',
        metaDescription: 'Painting contractor websites with project galleries and quote request forms.',
        painPoints: ['Color reliability', 'Project quoting', 'Visual proof', 'Scheduling'],
        icon: 'paint-bucket',
    },
    {
        slug: 'carpenters',
        name: 'Carpenters',
        description: 'Custom woodworking and carpentry websites. Portfolio showcases for cabinetry, framing, and finish work.',
        metaDescription: 'Carpentry and woodworking websites. Showcase custom projects and craftsmanship.',
        painPoints: ['Craftsmanship display', 'Custom capabilities', 'Project timeline', 'Material quality'],
        icon: 'hammer',
    },
    {
        slug: 'flooring',
        name: 'Flooring',
        description: 'Flooring installer websites. Material catalogs, room visualizers, and installation quote calculators.',
        metaDescription: 'Flooring installation websites. Showrooms for hardwood, tile, and carpet services.',
        painPoints: ['Material visualization', 'In-home estimates', 'Durability questions', 'Installation timing'],
        icon: 'layers',
    },
    {
        slug: 'cleaning-services',
        name: 'Cleaning Services',
        description: 'Booking-focused websites for house and commercial cleaners. Recurring service setup and instant pricing.',
        metaDescription: 'Maid and cleaning service websites. Bookings for residential and commercial cleaning.',
        painPoints: ['Trust & security', 'Recurring booking', 'Custom checklists', 'Pricing transparency'],
        icon: 'sparkles',
    },
    {
        slug: 'movers',
        name: 'Movers',
        description: 'Moving company websites with quote calculators, distance estimators, and trust-building reviews.',
        metaDescription: 'Moving company websites with quote engines. Local and long-distance moving lead gen.',
        painPoints: ['Quote accuracy', 'Trust & safety', 'Date availability', 'Insurance coverage'],
        icon: 'truck',
    },
    {
        slug: 'locksmiths',
        name: 'Locksmiths',
        description: 'Urgency-optimized websites for locksmiths. Click-to-call focus, 24/7 availability markers, and service area maps.',
        metaDescription: 'Locksmith websites optimized for emergency calls. 24/7 service and mobile dispatch.',
        painPoints: ['Immediate response', 'Mobile dispatch', '24/7 availability', 'Price transparency'],
        icon: 'key',
    },
    {
        slug: 'pest-control',
        name: 'Pest Control',
        description: 'Pest control websites with pest identification guides, treatment plans, and emergency service booking.',
        metaDescription: 'Pest control websites with treatment plans and pest libraries. Emergency extermination services.',
        painPoints: ['Urgency', 'Safety concerns', 'Recurring plans', 'Pest identification'],
        icon: 'bug',
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
        slug: 'dentists',
        name: 'Dentists',
        description: 'Dental practice websites with appointment scheduling, patient testimonials, and service education.',
        metaDescription: 'Dental practice websites. Patient appointment booking, cosmetic dentistry showcases, and local SEO.',
        painPoints: ['Fear reduction', 'Insurance info', 'Emergency slots', 'Cosmetic results'],
        icon: 'smile',
    },
    {
        slug: 'chiropractors',
        name: 'Chiropractors',
        description: 'Chiropractic websites focusing on pain relief education, new patient offers, and online scheduling.',
        metaDescription: 'Chiropractor websites with new patient specials. Pain relief education and appointment booking.',
        painPoints: ['Pain relief', 'New patient intake', 'Insurance/Cost', 'Treatment explanation'],
        icon: 'activity',
    },
    {
        slug: 'therapists',
        name: 'Therapists',
        description: 'Private practice websites for therapists. Secure contact forms, specialty descriptions, and "good fit" guides.',
        metaDescription: 'Therapy and counseling websites. private practice marketing and patient connection.',
        painPoints: ['Privacy/Trust', 'Specialty match', 'Insurance coverage', 'Approachability'],
        icon: 'heart',
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
        slug: 'hotels',
        name: 'Hotels',
        description: 'Hotel and hospitality websites with booking integrations, gallery showcases, and tourism-focused SEO.',
        metaDescription: 'Hotel websites with booking systems, galleries, and tourism SEO optimization.',
        painPoints: ['Direct bookings', 'Room showcases', 'OTA competition', 'Guest reviews'],
        icon: 'building',
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
        slug: 'salons',
        name: 'Salons',
        description: 'Beauty salon and spa websites with service menus, booking systems, and local beauty SEO.',
        metaDescription: 'Salon and spa websites with online booking, service menus, and local SEO.',
        painPoints: ['Online booking', 'Service showcase', 'Staff profiles', 'Before/after gallery'],
        icon: 'scissors',
    },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
    return industries.find((i) => i.slug === slug);
};

export const getAllIndustrySlugs = (): string[] => {
    return industries.map((i) => i.slug);
};
