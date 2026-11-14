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
        description: 'Give diners the menu, directions and a way to reserve a table while they are deciding where to eat.',
        metaDescription: 'Professional websites for restaurants. Online menus, reservations, local SEO optimization.',
        painPoints: ['Online menu display', 'Table reservations', 'Local visibility', 'Mobile ordering'],
        icon: 'utensils',
    },
    {
        slug: 'plumbers',
        name: 'Plumbers',
        description: 'A burst pipe leaves little time to compare websites. Show which areas you cover, when you take urgent jobs and which number to call.',
        metaDescription: 'Plumbing websites aimed at generating emergency calls. SEO for local plumbing services.',
        painPoints: ['Emergency calls', 'Service area routing', 'Trust verification', 'Job scheduling'],
        icon: 'wrench',
    },
    {
        slug: 'hvac',
        name: 'HVAC',
        description: 'Give customers a choice between requesting an installation and arranging maintenance for the equipment they already own.',
        metaDescription: 'HVAC contractor websites with seasonal booking tools and maintenance plan features.',
        painPoints: ['Seasonal demand', 'System quotes', 'Maintenance contracts', 'Emergency repairs'],
        icon: 'thermometer',
    },
    {
        slug: 'electricians',
        name: 'Electricians',
        description: 'Show the electrical work you take on, your qualifications and examples of recent jobs. Give customers a short way to request a quote.',
        metaDescription: 'Electrician websites that build trust. Showcase projects, certifications, and get more quotes.',
        painPoints: ['Safety assurance', 'Project quoting', 'Emergency service', 'Licensing proof'],
        icon: 'zap',
    },
    {
        slug: 'roofers',
        name: 'Roofers',
        description: 'Help homeowners decide whether they need a roof repair or a replacement. Show the materials you use and examples of each kind of job.',
        metaDescription: 'Roofing company websites optimized for high-ticket leads. Storm damage and replacement services.',
        painPoints: ['High ticket trust', 'Storm damage leads', 'Material selection', 'Insurance claims'],
        icon: 'home',
    },
    {
        slug: 'landscapers',
        name: 'Landscapers',
        description: 'Let someone browse gardens you have designed, then ask about a planting project or regular maintenance.',
        metaDescription: 'Landscaping websites with beautiful portfolios. Maintenance contracts and design consultation booking.',
        painPoints: ['Visual portfolio', 'Recurring contracts', 'Seasonal services', 'Design consultations'],
        icon: 'flower',
    },
    {
        slug: 'painters',
        name: 'Painters',
        description: 'Show clients how a colour looks in a finished room and what you need to know to estimate their painting job.',
        metaDescription: 'Painting contractor websites with project galleries and quote request forms.',
        painPoints: ['Color reliability', 'Project quoting', 'Visual proof', 'Scheduling'],
        icon: 'paint-bucket',
    },
    {
        slug: 'carpenters',
        name: 'Carpenters',
        description: 'Let a client see the joinery, finish and scale of your work before asking you to price a cabinet or a larger build.',
        metaDescription: 'Carpentry and woodworking websites. Showcase custom projects and craftsmanship.',
        painPoints: ['Craftsmanship display', 'Custom capabilities', 'Project timeline', 'Material quality'],
        icon: 'hammer',
    },
    {
        slug: 'flooring',
        name: 'Flooring',
        description: 'Help a homeowner compare flooring materials, picture them in a room and request a price for installation.',
        metaDescription: 'Flooring installation websites. Showrooms for hardwood, tile, and carpet services.',
        painPoints: ['Material visualization', 'In-home estimates', 'Durability questions', 'Installation timing'],
        icon: 'layers',
    },
    {
        slug: 'cleaning-services',
        name: 'Cleaning Services',
        description: 'Make it easy to price a one-off clean or arrange a regular visit for a home or workplace.',
        metaDescription: 'Maid and cleaning service websites. Bookings for residential and commercial cleaning.',
        painPoints: ['Trust & security', 'Recurring booking', 'Custom checklists', 'Pricing transparency'],
        icon: 'sparkles',
    },
    {
        slug: 'movers',
        name: 'Movers',
        description: 'Collect the pickup and delivery details needed for a moving estimate, alongside reviews from previous customers.',
        metaDescription: 'Moving company websites with quote engines. Local and long-distance moving lead gen.',
        painPoints: ['Quote accuracy', 'Trust & safety', 'Date availability', 'Insurance coverage'],
        icon: 'truck',
    },
    {
        slug: 'locksmiths',
        name: 'Locksmiths',
        description: 'Put your phone number, service area and actual working hours where someone locked outside can find them on a phone.',
        metaDescription: 'Locksmith websites optimized for emergency calls. 24/7 service and mobile dispatch.',
        painPoints: ['Immediate response', 'Mobile dispatch', '24/7 availability', 'Price transparency'],
        icon: 'key',
    },
    {
        slug: 'pest-control',
        name: 'Pest Control',
        description: 'Help customers identify a pest, understand the treatment options and request an urgent visit when needed.',
        metaDescription: 'Pest control websites with treatment plans and pest libraries. Emergency extermination services.',
        painPoints: ['Urgency', 'Safety concerns', 'Recurring plans', 'Pest identification'],
        icon: 'bug',
    },
    {
        slug: 'lawyers',
        name: 'Lawyers',
        description: 'Explain which cases your firm handles and how a prospective client can arrange a first conversation with the right lawyer.',
        metaDescription: 'Law firm websites that build trust and generate leads. Practice area pages and local SEO.',
        painPoints: ['Trust building', 'Practice areas', 'Case results', 'Attorney profiles'],
        icon: 'scale',
    },
    {
        slug: 'dentists',
        name: 'Dentists',
        description: 'Help patients read about a dental treatment, locate the practice and request an appointment.',
        metaDescription: 'Dental practice websites. Patient appointment booking, cosmetic dentistry showcases, and local SEO.',
        painPoints: ['Fear reduction', 'Insurance info', 'Emergency slots', 'Cosmetic results'],
        icon: 'smile',
    },
    {
        slug: 'doctors',
        name: 'Doctors & Medical Practices',
        description: 'Make it easier to find your practice by specialty and location. Give patients reliable information about the visit and a way to book.',
        metaDescription: 'SEO for doctors and medical practices: local search, Google Business Profile, specialty pages, online booking and GDPR-aware forms. Request a free audit.',
        painPoints: ['Patients searching nearby', 'Trust in medical content', 'Online appointment booking', 'Patient privacy and GDPR'],
        icon: 'stethoscope',
    },
    {
        slug: 'chiropractors',
        name: 'Chiropractors',
        description: 'Explain what a first chiropractic visit involves and let a new patient choose an appointment.',
        metaDescription: 'Chiropractor websites with new patient specials. Pain relief education and appointment booking.',
        painPoints: ['Pain relief', 'New patient intake', 'Insurance/Cost', 'Treatment explanation'],
        icon: 'activity',
    },
    {
        slug: 'therapists',
        name: 'Therapists',
        description: 'Explain your areas of practice and how someone can get in touch privately to discuss a first appointment.',
        metaDescription: 'Therapy and counseling websites. private practice marketing and patient connection.',
        painPoints: ['Privacy/Trust', 'Specialty match', 'Insurance coverage', 'Approachability'],
        icon: 'heart',
    },
    {
        slug: 'real-estate',
        name: 'Real Estate',
        description: 'Let buyers search listings by area and ask about the property they are looking at.',
        metaDescription: 'Real estate websites with property listings, IDX integration, and local SEO.',
        painPoints: ['Property listings', 'Lead generation', 'Market visibility', 'Virtual tours'],
        icon: 'home',
    },
    {
        slug: 'hotels',
        name: 'Hotels',
        description: 'Let guests compare rooms, check availability and reach your booking engine directly from your hotel website.',
        metaDescription:
          'Hotel website design with booking CTAs, room galleries and tourism SEO. Built to win direct bookings back from the OTAs. Request a quote.',
        painPoints: ['Direct bookings', 'Room showcases', 'OTA competition', 'Guest reviews'],
        icon: 'building',
    },
    {
        slug: 'gyms',
        name: 'Gyms',
        description: 'Give someone choosing a gym the weekly timetable, membership options and directions to their nearest location.',
        metaDescription: 'Gym and fitness center websites. Class schedules, memberships, and local SEO.',
        painPoints: ['Class scheduling', 'Membership signups', 'Trainer profiles', 'Facility showcase'],
        icon: 'dumbbell',
    },
    {
        slug: 'salons',
        name: 'Salons',
        description: 'Let clients choose a treatment from your service menu and book with the salon.',
        metaDescription: 'Salon and spa websites with online booking, service menus, and local SEO.',
        painPoints: ['Online booking', 'Service showcase', 'Staff profiles', 'Before/after gallery'],
        icon: 'scissors',
    },
    {
        slug: 'plastic-surgeons',
        name: 'Plastic Surgeons',
        description: 'Explain the procedures your clinic offers and give prospective patients a way to arrange a consultation.',
        metaDescription: 'Plastic surgery marketing and SEO. Patient acquisition for rhinoplasty, breast augmentation, and more.',
        painPoints: ['Patient trust', 'Before/after compliance', 'High-end branding', 'Lead qualification'],
        icon: 'user-plus',
    },
    {
        slug: 'med-spas',
        name: 'Med Spas',
        description: 'Help clients compare the treatments you offer and book a consultation with the clinic.',
        metaDescription: 'Med Spa marketing and web design. SEO for Botox, fillers, and aesthetic treatments.',
        painPoints: ['Booking rates', 'Visual appeal', 'Treatment education', 'Recurring clients'],
        icon: 'sparkles',
    },
    {
        slug: 'dui-lawyers',
        name: 'DUI Lawyers',
        description: 'Put the practice area, jurisdiction and call button where someone seeking urgent legal advice can find them.',
        metaDescription: 'DUI attorney SEO and web design. Generate urgent defense leads in your local market.',
        painPoints: ['Urgency', 'Authority/Trust', 'Local visibility', 'Mobile experience'],
        icon: 'shield',
    },
    {
        slug: 'personal-injury',
        name: 'Personal Injury',
        description: 'Explain which injury claims you handle and what a prospective client needs for a first conversation.',
        metaDescription: 'Personal injury lawyer marketing. High-value case generation for auto accidents and slips.',
        painPoints: ['High competition', 'Case results', 'Trust signals', 'Lead volume'],
        icon: 'ambulance',
    },
    {
        slug: 'financial-advisors',
        name: 'Financial Advisors',
        description: 'Give prospective clients enough detail about your advisory services to decide whether to book a meeting.',
        metaDescription: 'SEO for financial advisors and wealth managers. Build trust and attract high-net-worth clients.',
        painPoints: ['Trust & Credibility', 'Compliance', 'Lead quality', 'Expertise showcase'],
        icon: 'briefcase',
    },
    {
        slug: 'rent-a-car',
        name: 'Rent-a-Car',
        description: 'Show the available car classes, pickup points and rental conditions before a traveller starts a direct booking.',
        metaDescription:
          'Car rental website design with fleet pages, booking funnels and local SEO for airports and islands. Free EUR quote.',
        painPoints: ['Online bookings', 'Fleet showcase', 'Seasonal demand', 'OTA competition'],
        icon: 'car',
    },
    {
        slug: 'tour-operators',
        name: 'Tour Operators',
        description: 'Give each excursion its own itinerary, meeting point and booking details so visitors can choose a trip that fits their day.',
        metaDescription:
          'Tour operator websites with excursion catalogs, booking CTAs and destination SEO. Built for Google and AI search.',
        painPoints: ['Excursion bookings', 'Seasonal packages', 'Gallery content', 'Multi-language SEO'],
        icon: 'map',
    },
    {
        slug: 'villas-apartments',
        name: 'Villas & Apartments',
        description: 'Show guests which villa or apartment fits their group and give them a direct way to ask about their dates.',
        metaDescription: 'Villa and apartment rental websites. Direct bookings, luxury galleries, and vacation rental SEO.',
        painPoints: ['Direct bookings', 'Photo galleries', 'OTA competition', 'International guests'],
        icon: 'home',
    },
    {
        slug: 'travel-agencies',
        name: 'Travel Agencies',
        description: 'Help travellers compare packages by destination and ask your team to tailor an itinerary.',
        metaDescription: 'Travel agency web design and SEO. Package pages, destination content, and multilingual lead funnels.',
        painPoints: ['Package sales', 'Lead capture', 'Destination content', 'Trust signals'],
        icon: 'plane',
    },
    {
        slug: 'travel-ai-chatbots',
        name: 'Travel AI Chatbots',
        description: 'Answer recurring guest questions in their language and show them where to continue a booking.',
        metaDescription: 'Travel AI chatbot development. Multilingual assistants for hotels, rent-a-car, and tour operators.',
        painPoints: ['24/7 support', 'Multilingual guests', 'Booking automation', 'AI search visibility'],
        icon: 'bot',
    },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
    return industries.find((i) => i.slug === slug);
};

export const getAllIndustrySlugs = (): string[] => {
    return industries.map((i) => i.slug);
};

/** Tourism niches prioritized for industry×service sitemap spokes. */
export const TOURISM_INDUSTRY_SLUGS = [
    'hotels',
    'restaurants',
    'rent-a-car',
    'tour-operators',
    'villas-apartments',
    'travel-agencies',
    'travel-ai-chatbots',
] as const;

export type TourismIndustrySlug = (typeof TOURISM_INDUSTRY_SLUGS)[number];

/**
 * Verticals that only make sense in the US market (DUI lawyers, personal
 * injury, chiropractors, roofers, plastic surgeons). They were translated
 * literally into Greek and linked from every Greek city and service page.
 * Grids rendered in the `el` locale leave them out.
 */
export const US_ONLY_INDUSTRY_SLUGS: ReadonlySet<string> = new Set([
    'dui-lawyers',
    'personal-injury',
    'chiropractors',
    'roofers',
    'plastic-surgeons',
]);

/** Industries to show in link grids for a locale. */
export const getIndustriesForLocale = (locale: 'en' | 'el'): Industry[] =>
    locale === 'el' ? industries.filter((i) => !US_ONLY_INDUSTRY_SLUGS.has(i.slug)) : industries;
