export type PortfolioCategory =
  | 'rent-a-car'
  | 'hotel'
  | 'villa'
  | 'tours'
  | 'transfers'
  | 'travel-ai'
  | 'restaurant'
  | 'other';

export type PortfolioMarket = 'GR' | 'US' | 'UK' | 'CA' | 'EU';

export interface PortfolioProject {
  slug: string;
  name: string;
  url: string;
  /** Sister domains / alternate live URLs for the same brand */
  relatedUrls?: string[];
  category: PortfolioCategory;
  markets: PortfolioMarket[];
  languages: ('en' | 'el')[];
  screenshot: string;
  summary: string;
  summaryEl?: string;
  services: string[];
  seoTitle?: string;
  seoDescription?: string;
  /** Greek SEO title for /el/work/[slug] metadata */
  seoTitleEl?: string;
  /** Greek SEO description for /el/work/[slug] metadata */
  seoDescriptionEl?: string;
  results?: string[];
  /** Greek outcome bullets when they differ from EN results */
  resultsEl?: string[];
  featured: boolean;
}

export const PORTFOLIO_CATEGORIES: Record<
  PortfolioCategory,
  { label: string; labelEl: string }
> = {
  'rent-a-car': { label: 'Rent-a-car', labelEl: 'Ενοικίαση αυτοκινήτου' },
  hotel: { label: 'Hotels', labelEl: 'Ξενοδοχεία' },
  villa: { label: 'Villas & apartments', labelEl: 'Βίλες & διαμερίσματα' },
  tours: { label: 'Tours & travel', labelEl: 'Τουρισμός & εκδρομές' },
  transfers: { label: 'Transfers & VIP', labelEl: 'Μεταφορές & VIP' },
  'travel-ai': { label: 'Travel AI', labelEl: 'AI chatbot ταξιδιών' },
  restaurant: { label: 'Restaurants & cafes', labelEl: 'Εστιατόρια' },
  other: { label: 'Other', labelEl: 'Άλλα' },
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'aggelos-rentals',
    name: 'Aggelos Rentals',
    url: 'https://aggelosrentals.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/aggelos-rentals.webp',
    summary:
      'Aggelos Rentals: car rental with port/airport delivery website for Paros & Piraeus with SEO targeting “rent a car Paros”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Aggelos Rentals: ιστοσελίδα ενοικίαση αυτοκινήτου με παράδοση λιμάνι/αεροδρόμιο για Πάρος & Πειραιάς με SEO σε «ενοικίαση αυτοκινήτου Πάρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Paros & Piraeus: pages and copy aimed at “rent a car Paros”',
      'Differentiation: seasonal fleet booking for island arrivals',
      'Stack: website-creation, local-seo, speed-optimization',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Πάρος & Πειραιάς για «ενοικίαση αυτοκινήτου Πάρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου με παράδοση λιμάνι/αεροδρόμιο',
      'Schema + τεχνικό SEO baseline για Aggelos Rentals',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Aggelos Rentals | rent a car Paros',
    seoDescription: 'Aggelos Rentals — car rental with port/airport delivery in Paros & Piraeus. SEO + mobile UX for “rent a car Paros”.',
    seoTitleEl: 'Aggelos Rentals | ενοικίαση αυτοκινήτου Πάρος',
    seoDescriptionEl: 'Aggelos Rentals — ενοικίαση αυτοκινήτου με παράδοση λιμάνι/αεροδρόμιο στο Πάρος & Πειραιάς. SEO + mobile UX για «ενοικίαση αυτοκινήτου Πάρος».',
    featured: true,
  },
  {
    slug: 'antiparos-rentacar',
    name: 'Antiparos Rent a Car',
    url: 'https://antiparosrentacar.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/antiparos-rentacar.webp',
    summary:
      'Antiparos Rent a Car: island rent-a-car website for Antiparos with SEO targeting “rent a car Antiparos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Antiparos Rent a Car: ιστοσελίδα ενοικίαση αυτοκινήτου νησί για Αντίπαρος με SEO σε «ενοικίαση αυτοκινήτου Αντίπαρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Antiparos: pages and copy aimed at “rent a car Antiparos”',
      'Differentiation: ferry-arrival pickup and compact fleet for narrow roads',
      'Stack: website-creation, seo-web-design, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Αντίπαρος για «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου νησί',
      'Schema + τεχνικό SEO baseline για Antiparos Rent a Car',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design', 'local-seo'],
                                                    seoTitle: 'Antiparos Rent a Car | rent a car Antiparos',
    seoDescription: 'Antiparos Rent a Car — island rent-a-car in Antiparos. SEO + mobile UX for “rent a car Antiparos”.',
    seoTitleEl: 'Antiparos Rent a Car | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Antiparos Rent a Car — ενοικίαση αυτοκινήτου νησί στο Αντίπαρος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    featured: true,
  },
  {
    slug: 'cyclades-rentacar',
    name: 'Cyclades Rent a Car',
    url: 'https://cycladesrentacar.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/cyclades-rentacar.webp',
    summary:
      'Cyclades Rent a Car: multi-island car rental brand website for Cyclades with SEO targeting “Cyclades car rental”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Cyclades Rent a Car: ιστοσελίδα ενοικίαση αυτοκινήτου Κυκλάδες για Κυκλάδες με SEO σε «ενοικίαση αυτοκινήτου Κυκλάδες», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Cyclades: pages and copy aimed at “Cyclades car rental”',
      'Differentiation: hub-and-spoke island rental positioning',
      'Stack: website-creation, local-seo, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κυκλάδες για «ενοικίαση αυτοκινήτου Κυκλάδες»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Κυκλάδες',
      'Schema + τεχνικό SEO baseline για Cyclades Rent a Car',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Cyclades Rent a Car | Cyclades car rental',
    seoDescription: 'Cyclades Rent a Car — multi-island car rental brand in Cyclades. SEO + mobile UX for “Cyclades car rental”.',
    seoTitleEl: 'Cyclades Rent a Car | ενοικίαση αυτοκινήτου Κυκλάδες',
    seoDescriptionEl: 'Cyclades Rent a Car — ενοικίαση αυτοκινήτου Κυκλάδες στο Κυκλάδες. SEO + mobile UX για «ενοικίαση αυτοκινήτου Κυκλάδες».',
    featured: true,
  },
  {
    slug: 'cretanways-rentals',
    name: 'Cretan Ways Rentals',
    url: 'https://cretanwaysrentals.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/cretanways-rentals.webp',
    summary:
      'Cretan Ways Rentals: Crete car & scooter rentals website for Crete with SEO targeting “rent a car Crete”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Cretan Ways Rentals: ιστοσελίδα ενοικίαση αυτοκινήτου Κρήτη για Κρήτη με SEO σε «ενοικίαση αυτοκινήτου Κρήτη», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Crete: pages and copy aimed at “rent a car Crete”',
      'Differentiation: airport-to-resort routes across Crete',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κρήτη για «ενοικίαση αυτοκινήτου Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Κρήτη',
      'Schema + τεχνικό SEO baseline για Cretan Ways Rentals',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Cretan Ways Rentals | rent a car Crete',
    seoDescription: 'Cretan Ways Rentals — Crete car & scooter rentals in Crete. SEO + mobile UX for “rent a car Crete”.',
    seoTitleEl: 'Cretan Ways Rentals | ενοικίαση αυτοκινήτου Κρήτη',
    seoDescriptionEl: 'Cretan Ways Rentals — ενοικίαση αυτοκινήτου Κρήτη στο Κρήτη. SEO + mobile UX για «ενοικίαση αυτοκινήτου Κρήτη».',
    featured: true,
  },
  {
    slug: 'naxos-carrentals',
    name: 'Naxos Car Rentals',
    url: 'https://naxos-carrentals.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/naxos-carrentals.webp',
    summary:
      'Naxos Car Rentals: Naxos car rental website for Naxos with SEO targeting “rent a car Naxos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Naxos Car Rentals: ιστοσελίδα ενοικίαση αυτοκινήτου Νάξος για Νάξος με SEO σε «ενοικίαση αυτοκινήτου Νάξος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Naxos: pages and copy aimed at “rent a car Naxos”',
      'Differentiation: port pickup and beach-day fleet pages',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Νάξος για «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Νάξος',
      'Schema + τεχνικό SEO baseline για Naxos Car Rentals',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rentals | rent a car Naxos',
    seoDescription: 'Naxos Car Rentals — Naxos car rental in Naxos. SEO + mobile UX for “rent a car Naxos”.',
    seoTitleEl: 'Naxos Car Rentals | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rentals — ενοικίαση αυτοκινήτου Νάξος στο Νάξος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Νάξος».',
    featured: true,
  },
  {
    slug: 'rentacar-antiparos-gr',
    name: 'Rent a Car Antiparos',
    url: 'https://rentacarantiparos.gr',
    category: 'rent-a-car',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/rentacar-antiparos-gr.webp',
    summary:
      'Rent a Car Antiparos: .gr local rent-a-car website for Antiparos with SEO targeting “Antiparos rent a car”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Rent a Car Antiparos: ιστοσελίδα τοπική ενοικίαση αυτοκινήτου .gr για Αντίπαρος με SEO σε «ενοικίαση αυτοκινήτου Αντίπαρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Antiparos: pages and copy aimed at “Antiparos rent a car”',
      'Differentiation: Greek-first local SEO for Antiparos visitors',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Αντίπαρος για «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents τοπική ενοικίαση αυτοκινήτου .gr',
      'Schema + τεχνικό SEO baseline για Rent a Car Antiparos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Antiparos | Antiparos rent a car',
    seoDescription: 'Rent a Car Antiparos — .gr local rent-a-car in Antiparos. SEO + mobile UX for “Antiparos rent a car”.',
    seoTitleEl: 'Rent a Car Antiparos | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Rent a Car Antiparos — τοπική ενοικίαση αυτοκινήτου .gr στο Αντίπαρος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    featured: false,
  },
  {
    slug: 'rentacar-in-paros',
    name: 'Rent a Car in Paros',
    url: 'https://rentacarinparos.gr',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/rentacar-in-paros.webp',
    summary:
      'Rent a Car in Paros: Paros car rental landing brand website for Paros with SEO targeting “rent a car in Paros”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Rent a Car in Paros: ιστοσελίδα ενοικίαση αυτοκινήτου Πάρος για Πάρος με SEO σε «ενοικίαση αυτοκινήτου στην Πάρο», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Paros: pages and copy aimed at “rent a car in Paros”',
      'Differentiation: conversion-led vehicle cards for summer peaks',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Πάρος για «ενοικίαση αυτοκινήτου στην Πάρο»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Πάρος',
      'Schema + τεχνικό SEO baseline για Rent a Car in Paros',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car in Paros | Paros car hire',
    seoDescription: 'Rent a Car in Paros — Paros car rental landing brand in Paros. SEO + mobile UX for “rent a car in Paros”.',
    seoTitleEl: 'Rent a Car in Paros | ενοικίαση αυτοκινήτου στην Πάρο',
    seoDescriptionEl: 'Rent a Car in Paros — ενοικίαση αυτοκινήτου Πάρος στο Πάρος. SEO + mobile UX για «ενοικίαση αυτοκινήτου στην Πάρο».',
    featured: false,
  },
  {
    slug: 'rentacar-piraeus',
    name: 'Rent a Car Piraeus',
    url: 'https://rentacarpiraeus.gr',
    category: 'rent-a-car',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/rentacar-piraeus.webp',
    summary:
      'Rent a Car Piraeus: port city car rental website for Piraeus with SEO targeting “rent a car Piraeus”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Rent a Car Piraeus: ιστοσελίδα ενοικίαση αυτοκινήτου λιμάνι για Πειραιάς με SEO σε «ενοικίαση αυτοκινήτου Πειραιάς», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Piraeus: pages and copy aimed at “rent a car Piraeus”',
      'Differentiation: ferry-day and cruise-port pickup intents',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Πειραιάς για «ενοικίαση αυτοκινήτου Πειραιάς»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου λιμάνι',
      'Schema + τεχνικό SEO baseline για Rent a Car Piraeus',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Piraeus | Piraeus port car rental',
    seoDescription: 'Rent a Car Piraeus — port city car rental in Piraeus. SEO + mobile UX for “rent a car Piraeus”.',
    seoTitleEl: 'Rent a Car Piraeus | ενοικίαση αυτοκινήτου Πειραιάς',
    seoDescriptionEl: 'Rent a Car Piraeus — ενοικίαση αυτοκινήτου λιμάνι στο Πειραιάς. SEO + mobile UX για «ενοικίαση αυτοκινήτου Πειραιάς».',
    featured: false,
  },
  {
    slug: 'athens-rentacar',
    name: 'Athens Rent a Car',
    url: 'https://athensrentacar.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/athens-rentacar.webp',
    summary:
      'Athens Rent a Car: Athens city & airport rental website for Athens with SEO targeting “rent a car Athens”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Athens Rent a Car: ιστοσελίδα ενοικίαση αυτοκινήτου Αθήνα για Αθήνα με SEO σε «ενοικίαση αυτοκινήτου Αθήνα», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Athens: pages and copy aimed at “rent a car Athens”',
      'Differentiation: airport + city delivery for business and tourism',
      'Stack: website-creation, speed-optimization',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Αθήνα για «ενοικίαση αυτοκινήτου Αθήνα»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Αθήνα',
      'Schema + τεχνικό SEO baseline για Athens Rent a Car',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'speed-optimization'],
                                                    seoTitle: 'Athens Rent a Car | rent a car Athens',
    seoDescription: 'Athens Rent a Car — Athens city & airport rental in Athens. SEO + mobile UX for “rent a car Athens”.',
    seoTitleEl: 'Athens Rent a Car | ενοικίαση αυτοκινήτου Αθήνα',
    seoDescriptionEl: 'Athens Rent a Car — ενοικίαση αυτοκινήτου Αθήνα στο Αθήνα. SEO + mobile UX για «ενοικίαση αυτοκινήτου Αθήνα».',
    featured: false,
  },
  {
    slug: 'rentacar-paros-gr',
    name: 'Rent a Car Paros',
    url: 'https://rentacar-paros.gr',
    category: 'rent-a-car',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/rentacar-paros-gr.webp',
    summary:
      'Rent a Car Paros: Paros .gr rental site website for Paros with SEO targeting “rentacar Paros”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Rent a Car Paros: ιστοσελίδα ιστοσελίδα ενοικίασης Πάρος για Πάρος με SEO σε «ενοικίαση αυτοκινήτου Πάρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Paros: pages and copy aimed at “rentacar Paros”',
      'Differentiation: local domain authority for Greek searchers',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Πάρος για «ενοικίαση αυτοκινήτου Πάρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα ενοικίασης Πάρος',
      'Schema + τεχνικό SEO baseline για Rent a Car Paros',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Paros | rentacar Paros',
    seoDescription: 'Rent a Car Paros — Paros .gr rental site in Paros. SEO + mobile UX for “rentacar Paros”.',
    seoTitleEl: 'Rent a Car Paros | ενοικίαση αυτοκινήτου Πάρος',
    seoDescriptionEl: 'Rent a Car Paros — ιστοσελίδα ενοικίασης Πάρος στο Πάρος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Πάρος».',
    featured: false,
  },
  {
    slug: 'hotels-santorini',
    name: 'Hotels Santorini',
    url: 'https://hotelssantorini.gr',
    category: 'hotel',
    markets: ['GR', 'EU', 'US'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/hotels-santorini.webp',
    summary:
      'Hotels Santorini: Santorini hotels directory / bookings website for Santorini with SEO targeting “hotels Santorini”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Hotels Santorini: ιστοσελίδα ξενοδοχεία Σαντορίνη για Σαντορίνη με SEO σε «ξενοδοχεία Σαντορίνη», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Santorini: pages and copy aimed at “hotels Santorini”',
      'Differentiation: caldera & beach hotel discovery with direct CTAs',
      'Stack: website-creation, seo-web-design, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σαντορίνη για «ξενοδοχεία Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ξενοδοχεία Σαντορίνη',
      'Schema + τεχνικό SEO baseline για Hotels Santorini',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design', 'content-creation'],
                                                    seoTitle: 'Hotels Santorini | Santorini hotel booking',
    seoDescription: 'Hotels Santorini — Santorini hotels directory / bookings in Santorini. SEO + mobile UX for “hotels Santorini”.',
    seoTitleEl: 'Hotels Santorini | ξενοδοχεία Σαντορίνη',
    seoDescriptionEl: 'Hotels Santorini — ξενοδοχεία Σαντορίνη στο Σαντορίνη. SEO + mobile UX για «ξενοδοχεία Σαντορίνη».',
    featured: true,
  },
  {
    slug: 'hotels-sifnos',
    name: 'Hotels Sifnos',
    url: 'https://hotelssifnos.com',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/hotels-sifnos.webp',
    summary:
      'Hotels Sifnos: Sifnos hotels website for Sifnos with SEO targeting “hotels Sifnos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Hotels Sifnos: ιστοσελίδα ξενοδοχεία Σίφνος για Σίφνος με SEO σε «ξενοδοχεία Σίφνος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Sifnos: pages and copy aimed at “hotels Sifnos”',
      'Differentiation: boutique island stays with local SEO hubs',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σίφνος για «ξενοδοχεία Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ξενοδοχεία Σίφνος',
      'Schema + τεχνικό SEO baseline για Hotels Sifnos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Hotels Sifnos | Sifnos accommodation',
    seoDescription: 'Hotels Sifnos — Sifnos hotels in Sifnos. SEO + mobile UX for “hotels Sifnos”.',
    seoTitleEl: 'Hotels Sifnos | ξενοδοχεία Σίφνος',
    seoDescriptionEl: 'Hotels Sifnos — ξενοδοχεία Σίφνος στο Σίφνος. SEO + mobile UX για «ξενοδοχεία Σίφνος».',
    featured: true,
  },
  {
    slug: 'onoma-hotel',
    name: 'Onoma Hotel',
    url: 'https://onomahotel.com',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/onoma-hotel.webp',
    summary:
      'Onoma Hotel: boutique hotel brand site website for Greece hospitality with SEO targeting “Onoma Hotel”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Onoma Hotel: ιστοσελίδα ιστοσελίδα boutique ξενοδοχείου για φιλοξενία Ελλάδα με SEO σε «Onoma Hotel», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Greece hospitality: pages and copy aimed at “Onoma Hotel”',
      'Differentiation: brand storytelling + room-type SEO pages',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση φιλοξενία Ελλάδα για «Onoma Hotel»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα boutique ξενοδοχείου',
      'Schema + τεχνικό SEO baseline για Onoma Hotel',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Onoma Hotel | boutique hotel Greece',
    seoDescription: 'Onoma Hotel — boutique hotel brand site in Greece hospitality. SEO + mobile UX for “Onoma Hotel”.',
    seoTitleEl: 'Onoma Hotel | boutique ξενοδοχείο',
    seoDescriptionEl: 'Onoma Hotel — ιστοσελίδα boutique ξενοδοχείου στο φιλοξενία Ελλάδα. SEO + mobile UX για «Onoma Hotel».',
    featured: true,
  },
  {
    slug: 'kipos-hotel',
    name: 'Kipos Hotel',
    url: 'https://kipos-hotel.com',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/kipos-hotel.webp',
    summary:
      'Kipos Hotel: garden-themed hotel website website for garden hotel stay with SEO targeting “Kipos Hotel”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Kipos Hotel: ιστοσελίδα ιστοσελίδα ξενοδοχείου με κήπο για ξενοδοχείο με κήπο με SEO σε «Kipos Hotel», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'garden hotel stay: pages and copy aimed at “Kipos Hotel”',
      'Differentiation: amenities and garden experience as ranking hooks',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ξενοδοχείο με κήπο για «Kipos Hotel»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα ξενοδοχείου με κήπο',
      'Schema + τεχνικό SEO baseline για Kipos Hotel',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Kipos Hotel | garden hotel Greece',
    seoDescription: 'Kipos Hotel — garden-themed hotel website in garden hotel stay. SEO + mobile UX for “Kipos Hotel”.',
    seoTitleEl: 'Kipos Hotel | ξενοδοχείο με κήπο',
    seoDescriptionEl: 'Kipos Hotel — ιστοσελίδα ξενοδοχείου με κήπο στο ξενοδοχείο με κήπο. SEO + mobile UX για «Kipos Hotel».',
    featured: false,
  },
  {
    slug: 'eolides-villas',
    name: 'Eolides Villas',
    url: 'https://eolidesvillas.gr',
    category: 'villa',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/eolides-villas.webp',
    summary:
      'Eolides Villas: luxury villa portfolio website for Greek villas with SEO targeting “Eolides Villas”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Eolides Villas: ιστοσελίδα portfolio πολυτελών βιλών για βίλες Ελλάδα με SEO σε «Eolides Villas», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Greek villas: pages and copy aimed at “Eolides Villas”',
      'Differentiation: multi-property villa SEO with inquiry forms',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση βίλες Ελλάδα για «Eolides Villas»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents portfolio πολυτελών βιλών',
      'Schema + τεχνικό SEO baseline για Eolides Villas',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Eolides Villas | luxury villas Greece',
    seoDescription: 'Eolides Villas — luxury villa portfolio in Greek villas. SEO + mobile UX for “Eolides Villas”.',
    seoTitleEl: 'Eolides Villas | πολυτελείς βίλες',
    seoDescriptionEl: 'Eolides Villas — portfolio πολυτελών βιλών στο βίλες Ελλάδα. SEO + mobile UX για «Eolides Villas».',
    featured: true,
  },
  {
    slug: 'villa-olivia-clara',
    name: 'Villa Olivia Clara',
    url: 'https://villaoliviaclara.com',
    category: 'villa',
    markets: ['GR', 'EU', 'UK'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/villa-olivia-clara.webp',
    summary:
      'Villa Olivia Clara: single flagship villa site website for luxury villa stay with SEO targeting “Villa Olivia Clara”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Villa Olivia Clara: ιστοσελίδα ιστοσελίδα flagship βίλας για πολυτελής βίλα με SEO σε «Villa Olivia Clara», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'luxury villa stay: pages and copy aimed at “Villa Olivia Clara”',
      'Differentiation: photo-led conversion for high-intent villa searches',
      'Stack: website-creation, local-seo, ai-visibility',
    ],
    resultsEl: [
      'Μοναδική αφήγηση πολυτελής βίλα για «Villa Olivia Clara»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα flagship βίλας',
      'Schema + τεχνικό SEO baseline για Villa Olivia Clara',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo', 'ai-visibility'],
                                                    seoTitle: 'Villa Olivia Clara | luxury villa rental',
    seoDescription: 'Villa Olivia Clara — single flagship villa site in luxury villa stay. SEO + mobile UX for “Villa Olivia Clara”.',
    seoTitleEl: 'Villa Olivia Clara | ενοικίαση πολυτελούς βίλας',
    seoDescriptionEl: 'Villa Olivia Clara — ιστοσελίδα flagship βίλας στο πολυτελής βίλα. SEO + mobile UX για «Villa Olivia Clara».',
    featured: true,
  },
  {
    slug: 'villas-katerina',
    name: 'Villas Katerina',
    url: 'https://villaskaterina.com',
    category: 'villa',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/villas-katerina.webp',
    summary:
      'Villas Katerina: villas Katerina brand website for villa complex with SEO targeting “Villas Katerina”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Villas Katerina: ιστοσελίδα brand Villas Katerina για συγκρότημα βιλών με SEO σε «Villas Katerina», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'villa complex: pages and copy aimed at “Villas Katerina”',
      'Differentiation: unit comparison pages for villa shoppers',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση συγκρότημα βιλών για «Villas Katerina»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand Villas Katerina',
      'Schema + τεχνικό SEO baseline για Villas Katerina',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Villas Katerina | villas for rent Greece',
    seoDescription: 'Villas Katerina — villas Katerina brand in villa complex. SEO + mobile UX for “Villas Katerina”.',
    seoTitleEl: 'Villas Katerina | βίλες προς ενοικίαση',
    seoDescriptionEl: 'Villas Katerina — brand Villas Katerina στο συγκρότημα βιλών. SEO + mobile UX για «Villas Katerina».',
    featured: false,
  },
  {
    slug: 'spili-apartments',
    name: 'Spili Apartments',
    url: 'https://spiliapartments.com',
    category: 'villa',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/spili-apartments.webp',
    summary:
      'Spili Apartments: apartments in Spili website for Spili Crete with SEO targeting “Spili apartments”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Spili Apartments: ιστοσελίδα διαμερίσματα στο Σπήλι για Σπήλι Κρήτη με SEO σε «διαμερίσματα Σπήλι», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Spili Crete: pages and copy aimed at “Spili apartments”',
      'Differentiation: Crete hinterland stay SEO vs coastal competitors',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σπήλι Κρήτη για «διαμερίσματα Σπήλι»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents διαμερίσματα στο Σπήλι',
      'Schema + τεχνικό SEO baseline για Spili Apartments',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Spili Apartments | Spili Crete accommodation',
    seoDescription: 'Spili Apartments — apartments in Spili in Spili Crete. SEO + mobile UX for “Spili apartments”.',
    seoTitleEl: 'Spili Apartments | διαμερίσματα Σπήλι',
    seoDescriptionEl: 'Spili Apartments — διαμερίσματα στο Σπήλι στο Σπήλι Κρήτη. SEO + mobile UX για «διαμερίσματα Σπήλι».',
    featured: false,
  },
  {
    slug: 'mykonos-luxury',
    name: 'Mykonos Luxury',
    url: 'https://mykonos.luxury',
    category: 'villa',
    markets: ['GR', 'EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/mykonos-luxury.webp',
    summary:
      'Mykonos Luxury: Mykonos luxury stays website for Mykonos with SEO targeting “Mykonos luxury villa”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Mykonos Luxury: ιστοσελίδα πολυτελής διαμονή Μύκονος για Μύκονος με SEO σε «πολυτελής βίλα Μύκονος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Mykonos: pages and copy aimed at “Mykonos luxury villa”',
      'Differentiation: luxury villa/hotel intents for international EN search',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Μύκονος για «πολυτελής βίλα Μύκονος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents πολυτελής διαμονή Μύκονος',
      'Schema + τεχνικό SEO baseline για Mykonos Luxury',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Mykonos Luxury | Mykonos luxury villa',
    seoDescription: 'Mykonos Luxury — Mykonos luxury stays in Mykonos. SEO + mobile UX for “Mykonos luxury villa”.',
    seoTitleEl: 'Mykonos Luxury | πολυτελής βίλα Μύκονος',
    seoDescriptionEl: 'Mykonos Luxury — πολυτελής διαμονή Μύκονος στο Μύκονος. SEO + mobile UX για «πολυτελής βίλα Μύκονος».',
    featured: true,
  },
  {
    slug: 'discover-cyclades',
    name: 'Discover Cyclades',
    url: 'https://discovercyclades.gr',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/discover-cyclades.webp',
    summary:
      'Discover Cyclades: Cyclades travel guide & tours website for Cyclades with SEO targeting “Discover Cyclades”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Discover Cyclades: ιστοσελίδα οδηγός & εκδρομές Κυκλάδων για Κυκλάδες με SEO σε «Discover Cyclades», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Cyclades: pages and copy aimed at “Discover Cyclades”',
      'Differentiation: island hub architecture for discovery traffic',
      'Stack: website-creation, content-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κυκλάδες για «Discover Cyclades»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents οδηγός & εκδρομές Κυκλάδων',
      'Schema + τεχνικό SEO baseline για Discover Cyclades',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation', 'local-seo'],
                                                    seoTitle: 'Discover Cyclades | Cyclades travel guide',
    seoDescription: 'Discover Cyclades — Cyclades travel guide & tours in Cyclades. SEO + mobile UX for “Discover Cyclades”.',
    seoTitleEl: 'Discover Cyclades | οδηγός Κυκλάδες',
    seoDescriptionEl: 'Discover Cyclades — οδηγός & εκδρομές Κυκλάδων στο Κυκλάδες. SEO + mobile UX για «Discover Cyclades».',
    featured: true,
  },
  {
    slug: 'discover-crete',
    name: 'Discover Crete',
    url: 'https://discover-crete.com',
    category: 'tours',
    markets: ['GR', 'EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/discover-crete.webp',
    summary:
      'Discover Crete: Crete discovery & tours website for Crete with SEO targeting “Discover Crete”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Discover Crete: ιστοσελίδα ανακάλυψη & εκδρομές Κρήτης για Κρήτη με SEO σε «Discover Crete», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Crete: pages and copy aimed at “Discover Crete”',
      'Differentiation: region silos for west/east Crete intents',
      'Stack: website-creation, content-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κρήτη για «Discover Crete»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ανακάλυψη & εκδρομές Κρήτης',
      'Schema + τεχνικό SEO baseline για Discover Crete',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation', 'seo-web-design'],
                                                    seoTitle: 'Discover Crete | Crete tours',
    seoDescription: 'Discover Crete — Crete discovery & tours in Crete. SEO + mobile UX for “Discover Crete”.',
    seoTitleEl: 'Discover Crete | εκδρομές Κρήτη',
    seoDescriptionEl: 'Discover Crete — ανακάλυψη & εκδρομές Κρήτης στο Κρήτη. SEO + mobile UX για «Discover Crete».',
    featured: true,
  },
  {
    slug: 'way-to-crete',
    name: 'Way to Crete',
    url: 'https://waytocrete.com',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/way-to-crete.webp',
    summary:
      'Way to Crete: Crete travel experiences website for Crete with SEO targeting “Way to Crete”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Way to Crete: ιστοσελίδα ταξιδιωτικές εμπειρίες Κρήτης για Κρήτη με SEO σε «Way to Crete», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Crete: pages and copy aimed at “Way to Crete”',
      'Differentiation: experience-led booking pages for Crete travelers',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κρήτη για «Way to Crete»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ταξιδιωτικές εμπειρίες Κρήτης',
      'Schema + τεχνικό SEO baseline για Way to Crete',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Way to Crete | Crete experiences',
    seoDescription: 'Way to Crete — Crete travel experiences in Crete. SEO + mobile UX for “Way to Crete”.',
    seoTitleEl: 'Way to Crete | εμπειρίες Κρήτη',
    seoDescriptionEl: 'Way to Crete — ταξιδιωτικές εμπειρίες Κρήτης στο Κρήτη. SEO + mobile UX για «Way to Crete».',
    featured: false,
  },
  {
    slug: 'santorini-daily-tours',
    name: 'Santorini Daily Tours',
    url: 'https://santorinidailytours.com',
    category: 'tours',
    markets: ['GR', 'EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/santorini-daily-tours.webp',
    summary:
      'Santorini Daily Tours: daily tours Santorini website for Santorini with SEO targeting “Santorini daily tours”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Santorini Daily Tours: ιστοσελίδα ημερήσιες εκδρομές Σαντορίνη για Σαντορίνη με SEO σε «ημερήσιες εκδρομές Σαντορίνη», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Santorini: pages and copy aimed at “Santorini daily tours”',
      'Differentiation: tour product pages for volcano/boat/day trips',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σαντορίνη για «ημερήσιες εκδρομές Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ημερήσιες εκδρομές Σαντορίνη',
      'Schema + τεχνικό SEO baseline για Santorini Daily Tours',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Santorini Daily Tours | Santorini boat tour',
    seoDescription: 'Santorini Daily Tours — daily tours Santorini in Santorini. SEO + mobile UX for “Santorini daily tours”.',
    seoTitleEl: 'Santorini Daily Tours | ημερήσιες εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santorini Daily Tours — ημερήσιες εκδρομές Σαντορίνη στο Σαντορίνη. SEO + mobile UX για «ημερήσιες εκδρομές Σαντορίνη».',
    featured: true,
  },
  {
    slug: 'santo-tours-marinakis',
    name: 'Santo Tours Marinakis',
    url: 'https://santotoursmarinakis.com',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/santo-tours-marinakis.webp',
    summary:
      'Santo Tours Marinakis: local Santorini tour operator website for Santorini with SEO targeting “Santo Tours Marinakis”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Santo Tours Marinakis: ιστοσελίδα τοπικός tour operator Σαντορίνης για Σαντορίνη με SEO σε «Santo Tours Marinakis», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Santorini: pages and copy aimed at “Santo Tours Marinakis”',
      'Differentiation: family operator trust + excursion SEO',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σαντορίνη για «Santo Tours Marinakis»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents τοπικός tour operator Σαντορίνης',
      'Schema + τεχνικό SEO baseline για Santo Tours Marinakis',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Santo Tours Marinakis | Santorini tours',
    seoDescription: 'Santo Tours Marinakis — local Santorini tour operator in Santorini. SEO + mobile UX for “Santo Tours Marinakis”.',
    seoTitleEl: 'Santo Tours Marinakis | εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santo Tours Marinakis — τοπικός tour operator Σαντορίνης στο Σαντορίνη. SEO + mobile UX για «Santo Tours Marinakis».',
    featured: false,
  },
  {
    slug: 'quad-safari-rethymno',
    name: 'Quad Safari Rethymno',
    url: 'https://quadsafarirethymno.com',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/quad-safari-rethymno.webp',
    summary:
      'Quad Safari Rethymno: quad safari tours website for Rethymno Crete with SEO targeting “quad safari Rethymno”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Quad Safari Rethymno: ιστοσελίδα εκδρομές quad safari για Ρέθυμνο Κρήτη με SEO σε «quad safari Ρέθυμνο», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Rethymno Crete: pages and copy aimed at “quad safari Rethymno”',
      'Differentiation: adventure activity keywords around Rethymno',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Ρέθυμνο Κρήτη για «quad safari Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents εκδρομές quad safari',
      'Schema + τεχνικό SEO baseline για Quad Safari Rethymno',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Quad Safari Rethymno | Crete ATV tour',
    seoDescription: 'Quad Safari Rethymno — quad safari tours in Rethymno Crete. SEO + mobile UX for “quad safari Rethymno”.',
    seoTitleEl: 'Quad Safari Rethymno | quad safari Ρέθυμνο',
    seoDescriptionEl: 'Quad Safari Rethymno — εκδρομές quad safari στο Ρέθυμνο Κρήτη. SEO + mobile UX για «quad safari Ρέθυμνο».',
    featured: false,
  },
  {
    slug: 'skydream-travel',
    name: 'Skydream Travel',
    url: 'https://www.skydream.travel',
    relatedUrls: ['https://www.skydream.gr'],
    category: 'tours',
    markets: ['GR', 'EU', 'US'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/skydream-travel.webp',
    summary:
      'Skydream Travel: travel agency / packages website for travel agency with SEO targeting “SkyDream Travel”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Skydream Travel: ιστοσελίδα ταξιδιωτικό γραφείο / πακέτα για ταξιδιωτικό γραφείο με SEO σε «SkyDream Travel», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'travel agency: pages and copy aimed at “SkyDream Travel”',
      'Differentiation: package and destination landing SEO',
      'Stack: website-creation, seo-web-design, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ταξιδιωτικό γραφείο για «SkyDream Travel»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ταξιδιωτικό γραφείο / πακέτα',
      'Schema + τεχνικό SEO baseline για Skydream Travel',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'seo-web-design', 'content-creation'],
                                                    seoTitle: 'Skydream Travel | travel agency Greece',
    seoDescription: 'Skydream Travel — travel agency / packages in travel agency. SEO + mobile UX for “SkyDream Travel”.',
    seoTitleEl: 'Skydream Travel | ταξιδιωτικό γραφείο',
    seoDescriptionEl: 'Skydream Travel — ταξιδιωτικό γραφείο / πακέτα στο ταξιδιωτικό γραφείο. SEO + mobile UX για «SkyDream Travel».',
    featured: true,
  },
  {
    slug: 'cuba-travel-academy',
    name: 'Cuba Travel Academy',
    url: 'https://www.cubatravel.academy',
    category: 'tours',
    markets: ['US', 'EU'],
    languages: ['en'],
    screenshot: '/portfolio/cuba-travel-academy.webp',
    summary:
      'Cuba Travel Academy: Cuba travel academy / training website for Cuba travel education with SEO targeting “Cuba Travel Academy”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Cuba Travel Academy: ιστοσελίδα ακαδημία ταξιδιών Κούβας για εκπαίδευση ταξιδιών Κούβα με SEO σε «Cuba Travel Academy», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Cuba travel education: pages and copy aimed at “Cuba Travel Academy”',
      'Differentiation: education + travel niche authority content',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση εκπαίδευση ταξιδιών Κούβα για «Cuba Travel Academy»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ακαδημία ταξιδιών Κούβας',
      'Schema + τεχνικό SEO baseline για Cuba Travel Academy',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Cuba Travel Academy | Cuba travel courses',
    seoDescription: 'Cuba Travel Academy — Cuba travel academy / training in Cuba travel education. SEO + mobile UX for “Cuba Travel Academy”.',
    seoTitleEl: 'Cuba Travel Academy | μαθήματα ταξιδιών Κούβα',
    seoDescriptionEl: 'Cuba Travel Academy — ακαδημία ταξιδιών Κούβας στο εκπαίδευση ταξιδιών Κούβα. SEO + mobile UX για «Cuba Travel Academy».',
    featured: false,
  },
  {
    slug: 'kaffatos-vip-transfers',
    name: 'Kaffatos VIP Transfers',
    url: 'https://kaffatosviptransfers.com',
    category: 'transfers',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/kaffatos-vip-transfers.webp',
    summary:
      'Kaffatos VIP Transfers: VIP chauffeur transfers website for VIP transfers Greece with SEO targeting “VIP transfers Greece”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Kaffatos VIP Transfers: ιστοσελίδα VIP μεταφορές με οδηγό για VIP μεταφορές Ελλάδα με SEO σε «VIP μεταφορές», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'VIP transfers Greece: pages and copy aimed at “VIP transfers Greece”',
      'Differentiation: airport/port VIP route landing pages',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση VIP μεταφορές Ελλάδα για «VIP μεταφορές»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents VIP μεταφορές με οδηγό',
      'Schema + τεχνικό SEO baseline για Kaffatos VIP Transfers',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Kaffatos VIP Transfers | VIP transfers Greece',
    seoDescription: 'Kaffatos VIP Transfers — VIP chauffeur transfers in VIP transfers Greece. SEO + mobile UX for “VIP transfers Greece”.',
    seoTitleEl: 'Kaffatos VIP Transfers | VIP μεταφορές',
    seoDescriptionEl: 'Kaffatos VIP Transfers — VIP μεταφορές με οδηγό στο VIP μεταφορές Ελλάδα. SEO + mobile UX για «VIP μεταφορές».',
    featured: true,
  },
  {
    slug: 'the-ace-vip',
    name: 'The Ace VIP',
    url: 'https://theacevip.com',
    category: 'transfers',
    markets: ['GR', 'EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/the-ace-vip.webp',
    summary:
      'The Ace VIP: ACE VIP transfer brand website for VIP transport with SEO targeting “The ACE VIP”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'The Ace VIP: ιστοσελίδα brand ACE VIP για VIP μεταφορές με SEO σε «The ACE VIP», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'VIP transport: pages and copy aimed at “The ACE VIP”',
      'Differentiation: premium fleet trust signals for corporate VIP',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση VIP μεταφορές για «The ACE VIP»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand ACE VIP',
      'Schema + τεχνικό SEO baseline για The Ace VIP',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'The Ace VIP | VIP car service',
    seoDescription: 'The Ace VIP — ACE VIP transfer brand in VIP transport. SEO + mobile UX for “The ACE VIP”.',
    seoTitleEl: 'The Ace VIP | VIP αυτοκίνητο',
    seoDescriptionEl: 'The Ace VIP — brand ACE VIP στο VIP μεταφορές. SEO + mobile UX για «The ACE VIP».',
    featured: false,
  },
  {
    slug: 'antiparos-transfer',
    name: 'Antiparos Transfer',
    url: 'https://antiparostransfer.gr',
    category: 'transfers',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/antiparos-transfer.webp',
    summary:
      'Antiparos Transfer: island transfer service website for Antiparos with SEO targeting “Antiparos transfer”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Antiparos Transfer: ιστοσελίδα μεταφορές νησιού για Αντίπαρος με SEO σε «μεταφορά Αντίπαρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Antiparos: pages and copy aimed at “Antiparos transfer”',
      'Differentiation: ferry/port transfer booking for Antiparos',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Αντίπαρος για «μεταφορά Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents μεταφορές νησιού',
      'Schema + τεχνικό SEO baseline για Antiparos Transfer',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Antiparos Transfer | Antiparos taxi',
    seoDescription: 'Antiparos Transfer — island transfer service in Antiparos. SEO + mobile UX for “Antiparos transfer”.',
    seoTitleEl: 'Antiparos Transfer | μεταφορά Αντίπαρος',
    seoDescriptionEl: 'Antiparos Transfer — μεταφορές νησιού στο Αντίπαρος. SEO + mobile UX για «μεταφορά Αντίπαρος».',
    featured: false,
  },
  {
    slug: 'navos-ai',
    name: 'Navos AI',
    url: 'https://navos.ai',
    category: 'travel-ai',
    markets: ['US', 'EU', 'UK'],
    languages: ['en'],
    screenshot: '/portfolio/navos-ai.webp',
    summary:
      'Navos AI: AI travel assistant / SaaS website for travel AI product with SEO targeting “Navos AI”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Navos AI: ιστοσελίδα AI βοηθός ταξιδιών / SaaS για προϊόν travel AI με SEO σε «Navos AI», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'travel AI product: pages and copy aimed at “Navos AI”',
      'Differentiation: product + use-case pages for AI citations',
      'Stack: website-creation, ai-visibility, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση προϊόν travel AI για «Navos AI»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents AI βοηθός ταξιδιών / SaaS',
      'Schema + τεχνικό SEO baseline για Navos AI',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'ai-visibility', 'seo-web-design'],
                                                    seoTitle: 'Navos AI | travel AI assistant',
    seoDescription: 'Navos AI — AI travel assistant / SaaS in travel AI product. SEO + mobile UX for “Navos AI”.',
    seoTitleEl: 'Navos AI | AI βοηθός ταξιδιών',
    seoDescriptionEl: 'Navos AI — AI βοηθός ταξιδιών / SaaS στο προϊόν travel AI. SEO + mobile UX για «Navos AI».',
    featured: true,
  },
  {
    slug: 'project-shadow-ai',
    name: 'Project Shadow AI',
    url: 'https://projectshadow.ai',
    category: 'travel-ai',
    markets: ['US', 'EU'],
    languages: ['en'],
    screenshot: '/portfolio/project-shadow-ai.webp',
    summary:
      'Project Shadow AI: AI project / platform website for AI tourism tooling with SEO targeting “Project Shadow AI”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Project Shadow AI: ιστοσελίδα AI project / πλατφόρμα για AI εργαλεία τουρισμού με SEO σε «Project Shadow AI», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'AI tourism tooling: pages and copy aimed at “Project Shadow AI”',
      'Differentiation: technical brand authority for AI search visibility',
      'Stack: website-creation, ai-visibility',
    ],
    resultsEl: [
      'Μοναδική αφήγηση AI εργαλεία τουρισμού για «Project Shadow AI»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents AI project / πλατφόρμα',
      'Schema + τεχνικό SEO baseline για Project Shadow AI',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'ai-visibility'],
                                                    seoTitle: 'Project Shadow AI | AI for travel brands',
    seoDescription: 'Project Shadow AI — AI project / platform in AI tourism tooling. SEO + mobile UX for “Project Shadow AI”.',
    seoTitleEl: 'Project Shadow AI | AI για τουρισμό',
    seoDescriptionEl: 'Project Shadow AI — AI project / πλατφόρμα στο AI εργαλεία τουρισμού. SEO + mobile UX για «Project Shadow AI».',
    featured: true,
  },
  {
    slug: 'rethemnos',
    name: 'Rethemnos',
    url: 'https://rethemnos.gr',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/rethemnos.webp',
    summary:
      'Rethemnos: Rethymno tourism portal website for Rethymno with SEO targeting “Rethymno tourism”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Rethemnos: ιστοσελίδα τουριστική πύλη Ρεθύμνου για Ρέθυμνο με SEO σε «τουρισμός Ρέθυμνο», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Rethymno: pages and copy aimed at “Rethymno tourism”',
      'Differentiation: city guide hubs feeding commercial tourism pages',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Ρέθυμνο για «τουρισμός Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents τουριστική πύλη Ρεθύμνου',
      'Schema + τεχνικό SEO baseline για Rethemnos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Rethemnos | Rethymno tourism',
    seoDescription: 'Rethemnos — Rethymno tourism portal in Rethymno. SEO + mobile UX for “Rethymno tourism”.',
    seoTitleEl: 'Rethemnos | τουρισμός Ρέθυμνο',
    seoDescriptionEl: 'Rethemnos — τουριστική πύλη Ρεθύμνου στο Ρέθυμνο. SEO + mobile UX για «τουρισμός Ρέθυμνο».',
    featured: false,
  },
  {
    slug: 'ktima-orion',
    name: 'Ktima Orion',
    url: 'https://ktimaorion.gr',
    relatedUrls: ['https://ktimaorion.com'],
    category: 'villa',
    markets: ['GR', 'EU'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/ktima-orion.webp',
    summary:
      'Ktima Orion: estate venue & stays website for estate / ktima with SEO targeting “Ktima Orion”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Ktima Orion: ιστοσελίδα κτήμα για εκδηλώσεις & διαμονή για κτήμα με SEO σε «Κτήμα Orion», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'estate / ktima: pages and copy aimed at “Ktima Orion”',
      'Differentiation: venue + hospitality dual intent SEO',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση κτήμα για «Κτήμα Orion»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents κτήμα για εκδηλώσεις & διαμονή',
      'Schema + τεχνικό SEO baseline για Ktima Orion',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Ktima Orion | estate venue Greece',
    seoDescription: 'Ktima Orion — estate venue & stays in estate / ktima. SEO + mobile UX for “Ktima Orion”.',
    seoTitleEl: 'Ktima Orion | Κτήμα Orion',
    seoDescriptionEl: 'Ktima Orion — κτήμα για εκδηλώσεις & διαμονή στο κτήμα. SEO + mobile UX για «Κτήμα Orion».',
    featured: false,
  },
  {
    slug: 'weddings-folegandros',
    name: 'Weddings Folegandros',
    url: 'https://weddings-folegandros.gr',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/weddings-folegandros.webp',
    summary:
      'Weddings Folegandros: destination weddings website for Folegandros with SEO targeting “Folegandros weddings”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Weddings Folegandros: ιστοσελίδα γάμοι προορισμού για Φολέγανδρος με SEO σε «γάμοι Φολέγανδρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Folegandros: pages and copy aimed at “Folegandros weddings”',
      'Differentiation: wedding planning SEO for island elopements',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Φολέγανδρος για «γάμοι Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents γάμοι προορισμού',
      'Schema + τεχνικό SEO baseline για Weddings Folegandros',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Weddings Folegandros | Folegandros weddings',
    seoDescription: 'Weddings Folegandros — destination weddings in Folegandros. SEO + mobile UX for “Folegandros weddings”.',
    seoTitleEl: 'Weddings Folegandros | γάμοι Φολέγανδρος',
    seoDescriptionEl: 'Weddings Folegandros — γάμοι προορισμού στο Φολέγανδρος. SEO + mobile UX για «γάμοι Φολέγανδρος».',
    featured: false,
  },
  {
    slug: 'my-honeymoon',
    name: 'My Honeymoon',
    url: 'https://www.myhoneymoon.gr',
    relatedUrls: ['https://www.myhoneymoon.travel'],
    category: 'tours',
    markets: ['GR', 'EU', 'US'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/my-honeymoon.webp',
    summary:
      'My Honeymoon: honeymoon planning brand website for honeymoon travel with SEO targeting “My Honeymoon”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'My Honeymoon: ιστοσελίδα brand οργάνωσης honeymoon για ταξίδι honeymoon με SEO σε «My Honeymoon», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'honeymoon travel: pages and copy aimed at “My Honeymoon”',
      'Differentiation: romantic itinerary and package keyword clusters',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ταξίδι honeymoon για «My Honeymoon»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand οργάνωσης honeymoon',
      'Schema + τεχνικό SEO baseline για My Honeymoon',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'My Honeymoon | Greece honeymoon packages',
    seoDescription: 'My Honeymoon — honeymoon planning brand in honeymoon travel. SEO + mobile UX for “My Honeymoon”.',
    seoTitleEl: 'My Honeymoon | πακέτα honeymoon Ελλάδα',
    seoDescriptionEl: 'My Honeymoon — brand οργάνωσης honeymoon στο ταξίδι honeymoon. SEO + mobile UX για «My Honeymoon».',
    featured: false,
  },
  {
    slug: 'arion-farm',
    name: 'Arion Farm',
    url: 'https://arionfarm.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/arion-farm.webp',
    summary:
      'Arion Farm: farm brand & experiences website for farm / agritourism with SEO targeting “Arion Farm”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Arion Farm: ιστοσελίδα brand αγροκτήματος & εμπειρίες για αγρόκτημα / αγροτουρισμός με SEO σε «Arion Farm», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'farm / agritourism: pages and copy aimed at “Arion Farm”',
      'Differentiation: agritourism and product SEO',
      'Stack: website-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση αγρόκτημα / αγροτουρισμός για «Arion Farm»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand αγροκτήματος & εμπειρίες',
      'Schema + τεχνικό SEO baseline για Arion Farm',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Arion Farm | agritourism Greece',
    seoDescription: 'Arion Farm — farm brand & experiences in farm / agritourism. SEO + mobile UX for “Arion Farm”.',
    seoTitleEl: 'Arion Farm | αγροτουρισμός',
    seoDescriptionEl: 'Arion Farm — brand αγροκτήματος & εμπειρίες στο αγρόκτημα / αγροτουρισμός. SEO + mobile UX για «Arion Farm».',
    featured: false,
  },
  {
    slug: 'plati-taverna',
    name: 'Plati Taverna',
    url: 'https://platiataverna.com',
    category: 'restaurant',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/plati-taverna.webp',
    summary:
      'Plati Taverna: Greek taverna website website for taverna / restaurant with SEO targeting “Plati Taverna”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Plati Taverna: ιστοσελίδα ιστοσελίδα ελληνικής ταβέρνας για ταβέρνα / εστιατόριο με SEO σε «Πλάτη Ταβέρνα», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'taverna / restaurant: pages and copy aimed at “Plati Taverna”',
      'Differentiation: menu + reservation local SEO',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ταβέρνα / εστιατόριο για «Πλάτη Ταβέρνα»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα ελληνικής ταβέρνας',
      'Schema + τεχνικό SEO baseline για Plati Taverna',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Plati Taverna | Greek taverna',
    seoDescription: 'Plati Taverna — Greek taverna website in taverna / restaurant. SEO + mobile UX for “Plati Taverna”.',
    seoTitleEl: 'Plati Taverna | Πλάτη Ταβέρνα',
    seoDescriptionEl: 'Plati Taverna — ιστοσελίδα ελληνικής ταβέρνας στο ταβέρνα / εστιατόριο. SEO + mobile UX για «Πλάτη Ταβέρνα».',
    featured: false,
  },
  {
    slug: 'fabrica-cafe',
    name: 'Fabrica Cafe',
    url: 'https://fabricacafe.info',
    category: 'restaurant',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/fabrica-cafe.webp',
    summary:
      'Fabrica Cafe: cafe brand site website for cafe with SEO targeting “Fabrica Cafe”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Fabrica Cafe: ιστοσελίδα ιστοσελίδα καφέ για καφέ με SEO σε «Fabrica Cafe», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'cafe: pages and copy aimed at “Fabrica Cafe”',
      'Differentiation: local cafe discovery and menu highlights',
      'Stack: website-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση καφέ για «Fabrica Cafe»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα καφέ',
      'Schema + τεχνικό SEO baseline για Fabrica Cafe',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Fabrica Cafe | cafe near me Greece',
    seoDescription: 'Fabrica Cafe — cafe brand site in cafe. SEO + mobile UX for “Fabrica Cafe”.',
    seoTitleEl: 'Fabrica Cafe | καφέ',
    seoDescriptionEl: 'Fabrica Cafe — ιστοσελίδα καφέ στο καφέ. SEO + mobile UX για «Fabrica Cafe».',
    featured: false,
  },
  {
    slug: 'cocktails-in-the-city',
    name: 'Cocktails in the City',
    url: 'https://cocktailsinthecity.gr',
    category: 'restaurant',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/cocktails-in-the-city.webp',
    summary:
      'Cocktails in the City: cocktail bar / nightlife website for cocktail bar with SEO targeting “Cocktails in the City”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Cocktails in the City: ιστοσελίδα cocktail bar / nightlife για cocktail bar με SEO σε «Cocktails in the City», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'cocktail bar: pages and copy aimed at “Cocktails in the City”',
      'Differentiation: events and signature drinks as content SEO',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση cocktail bar για «Cocktails in the City»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents cocktail bar / nightlife',
      'Schema + τεχνικό SEO baseline για Cocktails in the City',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Cocktails in the City | cocktail bar Greece',
    seoDescription: 'Cocktails in the City — cocktail bar / nightlife in cocktail bar. SEO + mobile UX for “Cocktails in the City”.',
    seoTitleEl: 'Cocktails in the City | cocktail bar',
    seoDescriptionEl: 'Cocktails in the City — cocktail bar / nightlife στο cocktail bar. SEO + mobile UX για «Cocktails in the City».',
    featured: false,
  },
  {
    slug: 'dailyhost',
    name: 'DailyHost',
    url: 'https://dailyhost.gr',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/dailyhost.webp',
    summary:
      'DailyHost: hospitality hosting platform/brand website for short-term hosting with SEO targeting “DailyHost”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'DailyHost: ιστοσελίδα brand φιλοξενίας / hosting για βραχυχρόνια μίσθωση με SEO σε «DailyHost», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'short-term hosting: pages and copy aimed at “DailyHost”',
      'Differentiation: property listing UX and host conversion paths',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση βραχυχρόνια μίσθωση για «DailyHost»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand φιλοξενίας / hosting',
      'Schema + τεχνικό SEO baseline για DailyHost',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'DailyHost | holiday hosting Greece',
    seoDescription: 'DailyHost — hospitality hosting platform/brand in short-term hosting. SEO + mobile UX for “DailyHost”.',
    seoTitleEl: 'DailyHost | βραχυχρόνια μίσθωση',
    seoDescriptionEl: 'DailyHost — brand φιλοξενίας / hosting στο βραχυχρόνια μίσθωση. SEO + mobile UX για «DailyHost».',
    featured: false,
  },
  {
    slug: 'dailyhost-eu',
    name: 'DailyHost EU',
    url: 'https://dailyhost.eu',
    category: 'hotel',
    markets: ['EU'],
    languages: ['en'],
    screenshot: '/portfolio/dailyhost-eu.webp',
    summary:
      'DailyHost EU: EU-facing hosting brand website for EU hosting market with SEO targeting “DailyHost EU”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'DailyHost EU: ιστοσελίδα ευρωπαϊκό hosting brand για αγορά hosting ΕΕ με SEO σε «DailyHost EU», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'EU hosting market: pages and copy aimed at “DailyHost EU”',
      'Differentiation: multi-market EN positioning for EU guests',
      'Stack: website-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση αγορά hosting ΕΕ για «DailyHost EU»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ευρωπαϊκό hosting brand',
      'Schema + τεχνικό SEO baseline για DailyHost EU',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'DailyHost EU | Europe vacation hosting',
    seoDescription: 'DailyHost EU — EU-facing hosting brand in EU hosting market. SEO + mobile UX for “DailyHost EU”.',
    seoTitleEl: 'DailyHost EU | φιλοξενία Ευρώπη',
    seoDescriptionEl: 'DailyHost EU — ευρωπαϊκό hosting brand στο αγορά hosting ΕΕ. SEO + mobile UX για «DailyHost EU».',
    featured: false,
  },
  {
    slug: 'george-xipolitas',
    name: 'George Xipolitas',
    url: 'https://georgexipolitas.com',
    category: 'other',
    markets: ['GR', 'EU'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/george-xipolitas.webp',
    summary:
      'George Xipolitas: professional services site website for personal brand / professional with SEO targeting “George Xipolitas”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'George Xipolitas: ιστοσελίδα ιστοσελίδα επαγγελματικών υπηρεσιών για προσωπικό brand / επαγγελματίας με SEO σε «George Xipolitas», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'personal brand / professional: pages and copy aimed at “George Xipolitas”',
      'Differentiation: authority pages for local professional search',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση προσωπικό brand / επαγγελματίας για «George Xipolitas»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα επαγγελματικών υπηρεσιών',
      'Schema + τεχνικό SEO baseline για George Xipolitas',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'George Xipolitas | professional services Greece',
    seoDescription: 'George Xipolitas — professional services site in personal brand / professional. SEO + mobile UX for “George Xipolitas”.',
    seoTitleEl: 'George Xipolitas | επαγγελματικές υπηρεσίες',
    seoDescriptionEl: 'George Xipolitas — ιστοσελίδα επαγγελματικών υπηρεσιών στο προσωπικό brand / επαγγελματίας. SEO + mobile UX για «George Xipolitas».',
    featured: false,
  },
  {
    slug: 'helicro',
    name: 'Helicro',
    url: 'https://helicro.be',
    category: 'other',
    markets: ['EU'],
    languages: ['en'],
    screenshot: '/portfolio/helicro.webp',
    summary:
      'Helicro: Helicro business site website for Belgium / EU business with SEO targeting “Helicro”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Helicro: ιστοσελίδα επιχειρηματική ιστοσελίδα Helicro για Βέλγιο / ΕΕ με SEO σε «Helicro», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Belgium / EU business: pages and copy aimed at “Helicro”',
      'Differentiation: EU commercial SEO for B2B discovery',
      'Stack: website-creation, seo-audits',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Βέλγιο / ΕΕ για «Helicro»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents επιχειρηματική ιστοσελίδα Helicro',
      'Schema + τεχνικό SEO baseline για Helicro',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-audits'],
                                                    seoTitle: 'Helicro | Belgium business website',
    seoDescription: 'Helicro — Helicro business site in Belgium / EU business. SEO + mobile UX for “Helicro”.',
    seoTitleEl: 'Helicro | επιχειρηματική ιστοσελίδα Βέλγιο',
    seoDescriptionEl: 'Helicro — επιχειρηματική ιστοσελίδα Helicro στο Βέλγιο / ΕΕ. SEO + mobile UX για «Helicro».',
    featured: false,
  },
  {
    slug: 'mastorush',
    name: 'Mastorush',
    url: 'https://mastorush.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/mastorush.webp',
    summary:
      'Mastorush: Mastorush services brand website for crafts / services Greece with SEO targeting “Mastorush”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Mastorush: ιστοσελίδα brand υπηρεσιών Mastorush για τεχνικές υπηρεσίες Ελλάδα με SEO σε «Mastorush», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'crafts / services Greece: pages and copy aimed at “Mastorush”',
      'Differentiation: service-area pages for local demand',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση τεχνικές υπηρεσίες Ελλάδα για «Mastorush»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand υπηρεσιών Mastorush',
      'Schema + τεχνικό SEO baseline για Mastorush',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Mastorush | home services Greece',
    seoDescription: 'Mastorush — Mastorush services brand in crafts / services Greece. SEO + mobile UX for “Mastorush”.',
    seoTitleEl: 'Mastorush | υπηρεσίες σπιτιού',
    seoDescriptionEl: 'Mastorush — brand υπηρεσιών Mastorush στο τεχνικές υπηρεσίες Ελλάδα. SEO + mobile UX για «Mastorush».',
    featured: false,
  },
  {
    slug: 'opticore-store',
    name: 'Opticore Store',
    url: 'https://opticorestore.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/opticore-store.webp',
    summary:
      'Opticore Store: optics store e-shop website for optics / eyewear e-commerce with SEO targeting “Opticore Store”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Opticore Store: ιστοσελίδα e-shop οπτικών για οπτικά / e-shop με SEO σε «Opticore Store», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'optics / eyewear e-commerce: pages and copy aimed at “Opticore Store”',
      'Differentiation: category SEO for frames and lenses',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση οπτικά / e-shop για «Opticore Store»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents e-shop οπτικών',
      'Schema + τεχνικό SEO baseline για Opticore Store',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Opticore Store | buy glasses online Greece',
    seoDescription: 'Opticore Store — optics store e-shop in optics / eyewear e-commerce. SEO + mobile UX for “Opticore Store”.',
    seoTitleEl: 'Opticore Store | αγορά γυαλιών online',
    seoDescriptionEl: 'Opticore Store — e-shop οπτικών στο οπτικά / e-shop. SEO + mobile UX για «Opticore Store».',
    featured: false,
  },
  {
    slug: 'phytomore',
    name: 'Phytomore',
    url: 'https://phytomore.com',
    category: 'other',
    markets: ['EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/phytomore.webp',
    summary:
      'Phytomore: Phytomore product brand website for plant / wellness brand with SEO targeting “Phytomore”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Phytomore: ιστοσελίδα product brand Phytomore για φυτά / wellness με SEO σε «Phytomore», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'plant / wellness brand: pages and copy aimed at “Phytomore”',
      'Differentiation: product education content for organic search',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση φυτά / wellness για «Phytomore»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents product brand Phytomore',
      'Schema + τεχνικό SEO baseline για Phytomore',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Phytomore | plant based products',
    seoDescription: 'Phytomore — Phytomore product brand in plant / wellness brand. SEO + mobile UX for “Phytomore”.',
    seoTitleEl: 'Phytomore | φυτικά προϊόντα',
    seoDescriptionEl: 'Phytomore — product brand Phytomore στο φυτά / wellness. SEO + mobile UX για «Phytomore».',
    featured: false,
  },
  {
    slug: 'thenutrinest',
    name: 'The Nutri Nest',
    url: 'https://www.thenutrinest.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/thenutrinest.webp',
    summary:
      'The Nutri Nest: nutrition / healthy living website for nutrition brand with SEO targeting “The Nutri Nest”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'The Nutri Nest: ιστοσελίδα διατροφή / healthy living για διατροφή με SEO σε «The Nutri Nest», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'nutrition brand: pages and copy aimed at “The Nutri Nest”',
      'Differentiation: nutrition content hubs and product CTAs',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση διατροφή για «The Nutri Nest»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents διατροφή / healthy living',
      'Schema + τεχνικό SEO baseline για The Nutri Nest',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'The Nutri Nest | nutrition Greece',
    seoDescription: 'The Nutri Nest — nutrition / healthy living in nutrition brand. SEO + mobile UX for “The Nutri Nest”.',
    seoTitleEl: 'The Nutri Nest | διατροφή Ελλάδα',
    seoDescriptionEl: 'The Nutri Nest — διατροφή / healthy living στο διατροφή. SEO + mobile UX για «The Nutri Nest».',
    featured: false,
  },
  {
    slug: 'folegandros-hairsalon',
    name: 'Folegandros Hair Salon',
    url: 'https://folegandros-hairsalon.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/folegandros-hairsalon.webp',
    summary:
      'Folegandros Hair Salon: hair salon website for Folegandros with SEO targeting “Folegandros hair salon”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Folegandros Hair Salon: ιστοσελίδα κομμωτήριο για Φολέγανδρος με SEO σε «κομμωτήριο Φολέγανδρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Folegandros: pages and copy aimed at “Folegandros hair salon”',
      'Differentiation: local service SEO for island visitors and residents',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Φολέγανδρος για «κομμωτήριο Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents κομμωτήριο',
      'Schema + τεχνικό SEO baseline για Folegandros Hair Salon',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Folegandros Hair Salon | hairdresser Folegandros',
    seoDescription: 'Folegandros Hair Salon — hair salon in Folegandros. SEO + mobile UX for “Folegandros hair salon”.',
    seoTitleEl: 'Folegandros Hair Salon | κομμωτήριο Φολέγανδρος',
    seoDescriptionEl: 'Folegandros Hair Salon — κομμωτήριο στο Φολέγανδρος. SEO + mobile UX για «κομμωτήριο Φολέγανδρος».',
    featured: false,
  },
  {
    slug: 'folegandros-moto',
    name: 'Folegandros Moto',
    url: 'https://folegandros-moto.gr',
    category: 'rent-a-car',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/folegandros-moto.webp',
    summary:
      'Folegandros Moto: moto & scooter rental website for Folegandros with SEO targeting “Folegandros scooter rental”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Folegandros Moto: ιστοσελίδα ενοικίαση μηχανών & scooters για Φολέγανδρος με SEO σε «ενοικίαση μηχανής Φολέγανδρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Folegandros: pages and copy aimed at “Folegandros scooter rental”',
      'Differentiation: two-wheel fleet for cliff-road island mobility',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Φολέγανδρος για «ενοικίαση μηχανής Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση μηχανών & scooters',
      'Schema + τεχνικό SEO baseline για Folegandros Moto',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Folegandros Moto | Folegandros scooter rental',
    seoDescription: 'Folegandros Moto — moto & scooter rental in Folegandros. SEO + mobile UX for “Folegandros scooter rental”.',
    seoTitleEl: 'Folegandros Moto | ενοικίαση μηχανής Φολέγανδρος',
    seoDescriptionEl: 'Folegandros Moto — ενοικίαση μηχανών & scooters στο Φολέγανδρος. SEO + mobile UX για «ενοικίαση μηχανής Φολέγανδρος».',
    featured: false,
  },
  {
    slug: 'vape-and-more',
    name: 'Vape and More',
    url: 'https://vapeandmore.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/vape-and-more.webp',
    summary:
      'Vape and More: vape & more e-commerce website for vape retail with SEO targeting “Vape and More”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Vape and More: ιστοσελίδα e-shop vape & more για κατάστημα vape με SEO σε «Vape and More», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'vape retail: pages and copy aimed at “Vape and More”',
      'Differentiation: product category architecture for retail search',
      'Stack: website-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση κατάστημα vape για «Vape and More»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents e-shop vape & more',
      'Schema + τεχνικό SEO baseline για Vape and More',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Vape and More | vape shop Greece',
    seoDescription: 'Vape and More — vape & more e-commerce in vape retail. SEO + mobile UX for “Vape and More”.',
    seoTitleEl: 'Vape and More | κατάστημα vape',
    seoDescriptionEl: 'Vape and More — e-shop vape & more στο κατάστημα vape. SEO + mobile UX για «Vape and More».',
    featured: false,
  },
  {
    slug: 'ilektronika-tsigara',
    name: 'Ilektronika Tsigara',
    url: 'https://ilektronikatsigara.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/ilektronika-tsigara.webp',
    summary:
      'Ilektronika Tsigara: e-cigarette shop website for e-cigarette retail with SEO targeting “electronic cigarettes Greece”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Ilektronika Tsigara: ιστοσελίδα κατάστημα ηλεκτρονικών τσιγάρων για ηλεκτρονικά τσιγάρα με SEO σε «ηλεκτρονικά τσιγάρα», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'e-cigarette retail: pages and copy aimed at “electronic cigarettes Greece”',
      'Differentiation: Greek commercial keywords for e-cig categories',
      'Stack: website-creation, speed-optimization',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ηλεκτρονικά τσιγάρα για «ηλεκτρονικά τσιγάρα»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents κατάστημα ηλεκτρονικών τσιγάρων',
      'Schema + τεχνικό SEO baseline για Ilektronika Tsigara',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'speed-optimization'],
                                                    seoTitle: 'Ilektronika Tsigara | electronic cigarettes Greece',
    seoDescription: 'Ilektronika Tsigara — e-cigarette shop in e-cigarette retail. SEO + mobile UX for “electronic cigarettes Greece”.',
    seoTitleEl: 'Ilektronika Tsigara | ηλεκτρονικά τσιγάρα',
    seoDescriptionEl: 'Ilektronika Tsigara — κατάστημα ηλεκτρονικών τσιγάρων στο ηλεκτρονικά τσιγάρα. SEO + mobile UX για «ηλεκτρονικά τσιγάρα».',
    featured: false,
  },
  {
    slug: 'best-pumpkin-near-me',
    name: 'Best Pumpkin Near Me',
    url: 'https://bestpumpkinnearme.com',
    category: 'other',
    markets: ['US'],
    languages: ['en'],
    screenshot: '/portfolio/best-pumpkin-near-me.webp',
    summary:
      'Best Pumpkin Near Me: local “near me” seasonal site website for US local pumpkin / seasonal with SEO targeting “best pumpkin near me”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Best Pumpkin Near Me: ιστοσελίδα τοπικό seasonal site «κοντά μου» για τοπικό seasonal US με SEO σε «best pumpkin near me», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'US local pumpkin / seasonal: pages and copy aimed at “best pumpkin near me”',
      'Differentiation: hyperlocal near-me SEO for seasonal demand',
      'Stack: website-creation, local-seo, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση τοπικό seasonal US για «best pumpkin near me»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents τοπικό seasonal site «κοντά μου»',
      'Schema + τεχνικό SEO baseline για Best Pumpkin Near Me',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Best Pumpkin Near Me | pumpkin patch near me',
    seoDescription: 'Best Pumpkin Near Me — local “near me” seasonal site in US local pumpkin / seasonal. SEO + mobile UX for “best pumpkin near me”.',
    seoTitleEl: 'Best Pumpkin Near Me | κολοκύθα κοντά μου',
    seoDescriptionEl: 'Best Pumpkin Near Me — τοπικό seasonal site «κοντά μου» στο τοπικό seasonal US. SEO + mobile UX για «best pumpkin near me».',
    featured: false,
  },
  {
    slug: 'stretcher-stopper',
    name: 'Stretcher Stopper',
    url: 'https://stretcherstopper.com',
    category: 'other',
    markets: ['US'],
    languages: ['en'],
    screenshot: '/portfolio/stretcher-stopper.webp',
    summary:
      'Stretcher Stopper: Stretcher Stopper product site website for product / safety brand with SEO targeting “Stretcher Stopper”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Stretcher Stopper: ιστοσελίδα ιστοσελίδα προϊόντος Stretcher Stopper για προϊόν / ασφάλεια με SEO σε «Stretcher Stopper», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'product / safety brand: pages and copy aimed at “Stretcher Stopper”',
      'Differentiation: product education + commercial intent pages',
      'Stack: website-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση προϊόν / ασφάλεια για «Stretcher Stopper»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα προϊόντος Stretcher Stopper',
      'Schema + τεχνικό SEO baseline για Stretcher Stopper',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Stretcher Stopper | medical stretcher safety',
    seoDescription: 'Stretcher Stopper — Stretcher Stopper product site in product / safety brand. SEO + mobile UX for “Stretcher Stopper”.',
    seoTitleEl: 'Stretcher Stopper | ασφάλεια φορείου',
    seoDescriptionEl: 'Stretcher Stopper — ιστοσελίδα προϊόντος Stretcher Stopper στο προϊόν / ασφάλεια. SEO + mobile UX για «Stretcher Stopper».',
    featured: false,
  },
  {
    slug: 'antiparos-rooms',
    name: 'Antiparos Rooms',
    url: 'https://antiparosrooms.com',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/antiparos-rooms.webp',
    summary:
      'Antiparos Rooms: rooms & apartments Antiparos website for Antiparos with SEO targeting “Antiparos rooms”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Antiparos Rooms: ιστοσελίδα δωμάτια & διαμερίσματα Αντίπαρος για Αντίπαρος με SEO σε «δωμάτια Αντίπαρος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Antiparos: pages and copy aimed at “Antiparos rooms”',
      'Differentiation: direct booking rooms vs OTA dependency',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Αντίπαρος για «δωμάτια Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents δωμάτια & διαμερίσματα Αντίπαρος',
      'Schema + τεχνικό SEO baseline για Antiparos Rooms',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Antiparos Rooms | Antiparos apartments',
    seoDescription: 'Antiparos Rooms — rooms & apartments Antiparos in Antiparos. SEO + mobile UX for “Antiparos rooms”.',
    seoTitleEl: 'Antiparos Rooms | δωμάτια Αντίπαρος',
    seoDescriptionEl: 'Antiparos Rooms — δωμάτια & διαμερίσματα Αντίπαρος στο Αντίπαρος. SEO + mobile UX για «δωμάτια Αντίπαρος».',
    featured: false,
  },
  {
    slug: 'travel-sifnos',
    name: 'Travel Sifnos',
    url: 'https://travelsifnos.com',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/travel-sifnos.webp',
    summary:
      'Travel Sifnos: Sifnos travel guide website for Sifnos with SEO targeting “Travel Sifnos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Travel Sifnos: ιστοσελίδα ταξιδιωτικός οδηγός Σίφνου για Σίφνος με SEO σε «Travel Sifnos», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Sifnos: pages and copy aimed at “Travel Sifnos”',
      'Differentiation: local experiences and stay discovery for Sifnos',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σίφνος για «Travel Sifnos»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ταξιδιωτικός οδηγός Σίφνου',
      'Schema + τεχνικό SEO baseline για Travel Sifnos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Travel Sifnos | Sifnos travel guide',
    seoDescription: 'Travel Sifnos — Sifnos travel guide in Sifnos. SEO + mobile UX for “Travel Sifnos”.',
    seoTitleEl: 'Travel Sifnos | οδηγός Σίφνος',
    seoDescriptionEl: 'Travel Sifnos — ταξιδιωτικός οδηγός Σίφνου στο Σίφνος. SEO + mobile UX για «Travel Sifnos».',
    featured: false,
  },
  {
    slug: 'greece-cyclades',
    name: 'Greece Cyclades',
    url: 'https://greececyclades.com',
    category: 'tours',
    markets: ['GR', 'EU', 'US'],
    languages: ['en'],
    screenshot: '/portfolio/greece-cyclades.webp',
    summary:
      'Greece Cyclades: Cyclades travel brand website for Cyclades Greece with SEO targeting “Greece Cyclades”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Greece Cyclades: ιστοσελίδα travel brand Κυκλάδων για Κυκλάδες Ελλάδα με SEO σε «Κυκλάδες Ελλάδα», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
    results: [
      'Cyclades Greece: pages and copy aimed at “Greece Cyclades”',
      'Differentiation: broad Cyclades discovery vs island-specific siblings',
      'Stack: website-creation, content-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Κυκλάδες Ελλάδα για «Κυκλάδες Ελλάδα»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents travel brand Κυκλάδων',
      'Schema + τεχνικό SEO baseline για Greece Cyclades',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'content-creation', 'seo-web-design'],
                                                    seoTitle: 'Greece Cyclades | Cyclades holidays',
    seoDescription: 'Greece Cyclades — Cyclades travel brand in Cyclades Greece. SEO + mobile UX for “Greece Cyclades”.',
    seoTitleEl: 'Greece Cyclades | Κυκλάδες Ελλάδα',
    seoDescriptionEl: 'Greece Cyclades — travel brand Κυκλάδων στο Κυκλάδες Ελλάδα. SEO + mobile UX για «Κυκλάδες Ελλάδα».',
    featured: true,
  },
  {
    slug: 'agrocult',
    name: 'Agrocult',
    url: 'https://agrocult.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/agrocult.webp',
    summary:
      'Agrocult: AgroCult brand website for agriculture / agribusiness with SEO targeting “AgroCult”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Agrocult: ιστοσελίδα brand AgroCult για αγροτικές επιχειρήσεις με SEO σε «AgroCult», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'agriculture / agribusiness: pages and copy aimed at “AgroCult”',
      'Differentiation: B2B agri content and service SEO',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση αγροτικές επιχειρήσεις για «AgroCult»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand AgroCult',
      'Schema + τεχνικό SEO baseline για Agrocult',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Agrocult | agriculture Greece',
    seoDescription: 'Agrocult — AgroCult brand in agriculture / agribusiness. SEO + mobile UX for “AgroCult”.',
    seoTitleEl: 'Agrocult | γεωργία Ελλάδα',
    seoDescriptionEl: 'Agrocult — brand AgroCult στο αγροτικές επιχειρήσεις. SEO + mobile UX για «AgroCult».',
    featured: false,
  },
  {
    slug: 'erebos',
    name: 'Erebos',
    url: 'https://erebos.gr',
    category: 'other',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/erebos.webp',
    summary:
      'Erebos: Erebos brand site website for brand / nightlife or services with SEO targeting “Erebos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Erebos: ιστοσελίδα ιστοσελίδα brand Erebos για brand / υπηρεσίες με SEO σε «Erebos», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'brand / nightlife or services: pages and copy aimed at “Erebos”',
      'Differentiation: brand-first SEO with clear service taxonomy',
      'Stack: website-creation, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση brand / υπηρεσίες για «Erebos»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα brand Erebos',
      'Schema + τεχνικό SEO baseline για Erebos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Erebos | Erebos Greece',
    seoDescription: 'Erebos — Erebos brand site in brand / nightlife or services. SEO + mobile UX for “Erebos”.',
    seoTitleEl: 'Erebos | Erebos Ελλάδα',
    seoDescriptionEl: 'Erebos — ιστοσελίδα brand Erebos στο brand / υπηρεσίες. SEO + mobile UX για «Erebos».',
    featured: true,
  },
  {
    slug: 'ergo-and-art',
    name: 'Ergo & Art',
    url: 'https://ergoandart.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/ergo-and-art.webp',
    summary:
      'Ergo & Art: Ergo and Art studio website for art / crafts with SEO targeting “Ergo and Art”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Ergo & Art: ιστοσελίδα στούντιο Ergo and Art για τέχνη / χειροτεχνία με SEO σε «Ergo and Art», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'art / crafts: pages and copy aimed at “Ergo and Art”',
      'Differentiation: portfolio SEO for art and custom work inquiries',
      'Stack: website-creation, local-seo, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση τέχνη / χειροτεχνία για «Ergo and Art»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents στούντιο Ergo and Art',
      'Schema + τεχνικό SEO baseline για Ergo & Art',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
                                                    seoTitle: 'Ergo & Art | Ergo and Art',
    seoDescription: 'Ergo & Art — Ergo and Art studio in art / crafts. SEO + mobile UX for “Ergo and Art”.',
    seoTitleEl: 'Ergo & Art | Ergo and Art',
    seoDescriptionEl: 'Ergo & Art — στούντιο Ergo and Art στο τέχνη / χειροτεχνία. SEO + mobile UX για «Ergo and Art».',
    featured: false,
  },
  {
    slug: 'fitness-hood',
    name: 'Fitness Hood Training Center',
    url: 'https://fitnesshoodtrainingcenter.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/fitness-hood.webp',
    summary:
      'Fitness Hood Training Center: Fitness Hood training center website for fitness training with SEO targeting “Fitness Hood”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Fitness Hood Training Center: ιστοσελίδα Fitness Hood training center για γυμναστήριο / training με SEO σε «Fitness Hood», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'fitness training: pages and copy aimed at “Fitness Hood”',
      'Differentiation: local gym SEO and class/program pages',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση γυμναστήριο / training για «Fitness Hood»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents Fitness Hood training center',
      'Schema + τεχνικό SEO baseline για Fitness Hood Training Center',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Fitness Hood Training Center | Fitness Hood',
    seoDescription: 'Fitness Hood Training Center — Fitness Hood training center in fitness training. SEO + mobile UX for “Fitness Hood”.',
    seoTitleEl: 'Fitness Hood Training Center | Fitness Hood',
    seoDescriptionEl: 'Fitness Hood Training Center — Fitness Hood training center στο γυμναστήριο / training. SEO + mobile UX για «Fitness Hood».',
    featured: false,
  },
  {
    slug: 'huqqa-king',
    name: 'Huqqa King',
    url: 'https://huqqaking.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/huqqa-king.webp',
    summary:
      'Huqqa King: Huqqa King lounge website for hookah / lounge brand with SEO targeting “Huqqa King”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Huqqa King: ιστοσελίδα Huqqa King lounge για ναργιλές / lounge με SEO σε «Huqqa King», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'hookah / lounge brand: pages and copy aimed at “Huqqa King”',
      'Differentiation: local nightlife discovery keywords',
      'Stack: website-creation, eshop-woocommerce, speed-optimization',
    ],
    resultsEl: [
      'Μοναδική αφήγηση ναργιλές / lounge για «Huqqa King»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents Huqqa King lounge',
      'Schema + τεχνικό SEO baseline για Huqqa King',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'eshop-woocommerce', 'speed-optimization'],
                                                    seoTitle: 'Huqqa King | hookah lounge',
    seoDescription: 'Huqqa King — Huqqa King lounge in hookah / lounge brand. SEO + mobile UX for “Huqqa King”.',
    seoTitleEl: 'Huqqa King | ναργιλές',
    seoDescriptionEl: 'Huqqa King — Huqqa King lounge στο ναργιλές / lounge. SEO + mobile UX για «Huqqa King».',
    featured: false,
  },
  {
    slug: 'koini-lisi',
    name: 'Κοινή Λύση',
    url: 'https://koinilisi.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/koini-lisi.webp',
    summary:
      'Κοινή Λύση: Koini Lisi services website for solutions / services firm with SEO targeting “Koini Lisi”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Κοινή Λύση: ιστοσελίδα υπηρεσίες Κοινή Λύση για λύσεις / υπηρεσίες με SEO σε «Κοινή Λύση», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'solutions / services firm: pages and copy aimed at “Koini Lisi”',
      'Differentiation: service landing pages for Greek commercial queries',
      'Stack: website-creation, local-seo, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση λύσεις / υπηρεσίες για «Κοινή Λύση»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents υπηρεσίες Κοινή Λύση',
      'Schema + τεχνικό SEO baseline για Κοινή Λύση',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Κοινή Λύση | Koini Lisi',
    seoDescription: 'Κοινή Λύση — Koini Lisi services in solutions / services firm. SEO + mobile UX for “Koini Lisi”.',
    seoTitleEl: 'Κοινή Λύση | επιχειρηματικές λύσεις',
    seoDescriptionEl: 'Κοινή Λύση — υπηρεσίες Κοινή Λύση στο λύσεις / υπηρεσίες. SEO + mobile UX για «Κοινή Λύση».',
    featured: false,
  },
  {
    slug: 'logopedia',
    name: 'Logopedia',
    url: 'https://logopedia.edu.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/logopedia.webp',
    summary:
      'Logopedia: logopedia / speech therapy website for speech therapy education with SEO targeting “Logopedia”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Logopedia: ιστοσελίδα λογοθεραπεία για λογοθεραπεία / εκπαίδευση με SEO σε «λογοθεραπεία», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'speech therapy education: pages and copy aimed at “Logopedia”',
      'Differentiation: educational authority + local therapy booking SEO',
      'Stack: website-creation, local-seo, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση λογοθεραπεία / εκπαίδευση για «λογοθεραπεία»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents λογοθεραπεία',
      'Schema + τεχνικό SEO baseline για Logopedia',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Logopedia | speech therapy Greece',
    seoDescription: 'Logopedia — logopedia / speech therapy in speech therapy education. SEO + mobile UX for “Logopedia”.',
    seoTitleEl: 'Logopedia | λογοθεραπεία',
    seoDescriptionEl: 'Logopedia — λογοθεραπεία στο λογοθεραπεία / εκπαίδευση. SEO + mobile UX για «λογοθεραπεία».',
    featured: true,
  },
  {
    slug: 'naxos-car-rental',
    name: 'Naxos Car Rental',
    url: 'https://naxos-car-rental.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU', 'US'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/naxos-car-rental.webp',
    summary:
      'Naxos Car Rental: Naxos car rental brand website for Naxos with SEO targeting “Naxos car rental”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Naxos Car Rental: ιστοσελίδα brand ενοικίασης Νάξου για Νάξος με SEO σε «ενοικίαση αυτοκινήτου Νάξος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'Naxos: pages and copy aimed at “Naxos car rental”',
      'Differentiation: distinct fleet taxonomy vs sibling Naxos brands',
      'Stack: website-creation, local-seo, seo-web-design',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Νάξος για «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents brand ενοικίασης Νάξου',
      'Schema + τεχνικό SEO baseline για Naxos Car Rental',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rental | rent a car Naxos airport',
    seoDescription: 'Naxos Car Rental — Naxos car rental brand in Naxos. SEO + mobile UX for “Naxos car rental”.',
    seoTitleEl: 'Naxos Car Rental | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rental — brand ενοικίασης Νάξου στο Νάξος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Νάξος».',
    featured: true,
  },
  {
    slug: 'naxos-auto-rent',
    name: 'Naxos Auto Rent',
    url: 'https://naxosautorent.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU', 'US'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/naxos-auto-rent.webp',
    summary:
      'Naxos Auto Rent: auto rent Naxos website for Naxos with SEO targeting “Naxos auto rent”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Naxos Auto Rent: ιστοσελίδα auto rent Νάξος για Νάξος με SEO σε «ενοικίαση αυτοκινήτου Νάξος online», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'Naxos: pages and copy aimed at “Naxos auto rent”',
      'Differentiation: English-first booking UX for international guests',
      'Stack: website-creation, local-seo, speed-optimization',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Νάξος για «ενοικίαση αυτοκινήτου Νάξος online»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents auto rent Νάξος',
      'Schema + τεχνικό SEO baseline για Naxos Auto Rent',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Naxos Auto Rent | Naxos car hire online',
    seoDescription: 'Naxos Auto Rent — auto rent Naxos in Naxos. SEO + mobile UX for “Naxos auto rent”.',
    seoTitleEl: 'Naxos Auto Rent | ενοικίαση αυτοκινήτου Νάξος online',
    seoDescriptionEl: 'Naxos Auto Rent — auto rent Νάξος στο Νάξος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Νάξος online».',
    featured: false,
  },
  {
    slug: 'politidis-fitness',
    name: 'Politidis Fitness',
    url: 'https://politidisfitness.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/politidis-fitness.webp',
    summary:
      'Politidis Fitness: Politidis Fitness website for fitness brand with SEO targeting “Politidis Fitness”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Politidis Fitness: ιστοσελίδα Politidis Fitness για fitness brand με SEO σε «Politidis Fitness», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'fitness brand: pages and copy aimed at “Politidis Fitness”',
      'Differentiation: trainer authority pages and program SEO',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση fitness brand για «Politidis Fitness»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents Politidis Fitness',
      'Schema + τεχνικό SEO baseline για Politidis Fitness',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Politidis Fitness | personal trainer Greece',
    seoDescription: 'Politidis Fitness — Politidis Fitness in fitness brand. SEO + mobile UX for “Politidis Fitness”.',
    seoTitleEl: 'Politidis Fitness | personal trainer',
    seoDescriptionEl: 'Politidis Fitness — Politidis Fitness στο fitness brand. SEO + mobile UX για «Politidis Fitness».',
    featured: false,
  },
  {
    slug: 'rentacar-sifnos',
    name: 'Artemis Rental Sifnos',
    url: 'https://rentacarsifnos.com',
    category: 'rent-a-car',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/rentacar-sifnos.webp',
    summary:
      'Artemis Rental Sifnos: Sifnos car rental website for Sifnos with SEO targeting “rent a car Sifnos”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Artemis Rental Sifnos: ιστοσελίδα ενοικίαση αυτοκινήτου Σίφνος για Σίφνος με SEO σε «ενοικίαση αυτοκινήτου Σίφνος», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'Sifnos: pages and copy aimed at “rent a car Sifnos”',
      'Differentiation: port arrival + village hop itineraries',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση Σίφνος για «ενοικίαση αυτοκινήτου Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ενοικίαση αυτοκινήτου Σίφνος',
      'Schema + τεχνικό SEO baseline για Artemis Rental Sifnos',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Artemis Rental Sifnos | rent a car Sifnos',
    seoDescription: 'Artemis Rental Sifnos — Sifnos car rental in Sifnos. SEO + mobile UX for “rent a car Sifnos”.',
    seoTitleEl: 'Artemis Rental Sifnos | ενοικίαση αυτοκινήτου Σίφνος',
    seoDescriptionEl: 'Artemis Rental Sifnos — ενοικίαση αυτοκινήτου Σίφνος στο Σίφνος. SEO + mobile UX για «ενοικίαση αυτοκινήτου Σίφνος».',
    featured: true,
  },
  {
    slug: 'smart-dog-training',
    name: 'Smart Dog Training',
    url: 'https://smartdogtraining.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/smart-dog-training.webp',
    summary:
      'Smart Dog Training: Smart Dog Training website for dog training with SEO targeting “Smart Dog Training”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Smart Dog Training: ιστοσελίδα Smart Dog Training για εκπαίδευση σκύλων με SEO σε «εκπαίδευση σκύλων», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'dog training: pages and copy aimed at “Smart Dog Training”',
      'Differentiation: local pet-service keywords and program funnels',
      'Stack: website-creation, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση εκπαίδευση σκύλων για «εκπαίδευση σκύλων»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents Smart Dog Training',
      'Schema + τεχνικό SEO baseline για Smart Dog Training',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Smart Dog Training | dog training near me',
    seoDescription: 'Smart Dog Training — Smart Dog Training in dog training. SEO + mobile UX for “Smart Dog Training”.',
    seoTitleEl: 'Smart Dog Training | εκπαίδευση σκύλων',
    seoDescriptionEl: 'Smart Dog Training — Smart Dog Training στο εκπαίδευση σκύλων. SEO + mobile UX για «εκπαίδευση σκύλων».',
    featured: false,
  },
  {
    slug: 'taverna-yiannis',
    name: 'Taverna Yiannis',
    url: 'https://tavernayiannis.gr',
    category: 'restaurant',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/taverna-yiannis.webp',
    summary:
      'Taverna Yiannis: family taverna site website for traditional taverna with SEO targeting “Taverna Yiannis”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'Taverna Yiannis: ιστοσελίδα ιστοσελίδα οικογενειακής ταβέρνας για παραδοσιακή ταβέρνα με SEO σε «Ταβέρνα Γιάννης», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'traditional taverna: pages and copy aimed at “Taverna Yiannis”',
      'Differentiation: local food keywords and Google Maps conversion',
      'Stack: website-creation, local-seo',
    ],
    resultsEl: [
      'Μοναδική αφήγηση παραδοσιακή ταβέρνα για «Ταβέρνα Γιάννης»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα οικογενειακής ταβέρνας',
      'Schema + τεχνικό SEO baseline για Taverna Yiannis',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Taverna Yiannis | traditional Greek taverna',
    seoDescription: 'Taverna Yiannis — family taverna site in traditional taverna. SEO + mobile UX for “Taverna Yiannis”.',
    seoTitleEl: 'Taverna Yiannis | Ταβέρνα Γιάννης',
    seoDescriptionEl: 'Taverna Yiannis — ιστοσελίδα οικογενειακής ταβέρνας στο παραδοσιακή ταβέρνα. SEO + mobile UX για «Ταβέρνα Γιάννης».',
    featured: false,
  },
  {
    slug: 'vwanaki',
    name: 'vwanaki',
    url: 'https://vwanaki.gr',
    category: 'restaurant',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/vwanaki.webp',
    summary:
      'vwanaki: restaurant website website for restaurant brand with SEO targeting “Vwanaki restaurant”, fast mobile UX, and clear booking CTAs.',
    summaryEl:
      'vwanaki: ιστοσελίδα ιστοσελίδα εστιατορίου για εστιατόριο με SEO σε «Vwanaki εστιατόριο», γρήγορο mobile UX και καθαρά CTAs κράτησης.',
            results: [
      'restaurant brand: pages and copy aimed at “Vwanaki restaurant”',
      'Differentiation: brand-led menu SEO and reservation CTAs',
      'Stack: website-creation, local-seo, content-creation',
    ],
    resultsEl: [
      'Μοναδική αφήγηση εστιατόριο για «Vwanaki εστιατόριο»',
      'Αρχιτεκτονική υπηρεσιών/προϊόντων για commercial intents ιστοσελίδα εστιατορίου',
      'Schema + τεχνικό SEO baseline για vwanaki',
      'Mobile διαδρομές κράτησης/αιτήματος για αιχμή σεζόν',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'vwanaki | Vwanaki restaurant',
    seoDescription: 'vwanaki — restaurant website in restaurant brand. SEO + mobile UX for “Vwanaki restaurant”.',
    seoTitleEl: 'vwanaki | Vwanaki εστιατόριο',
    seoDescriptionEl: 'vwanaki — ιστοσελίδα εστιατορίου στο εστιατόριο. SEO + mobile UX για «Vwanaki εστιατόριο».',
    featured: false,
  },
];

export function getPortfolioBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedPortfolio(limit = 12): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured).slice(0, limit);
}

export function getPortfolioByCategory(category: PortfolioCategory): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.category === category);
}

export const PORTFOLIO_CATEGORY_FILTERS: PortfolioCategory[] = [
  'rent-a-car',
  'hotel',
  'villa',
  'tours',
  'transfers',
  'travel-ai',
  'restaurant',
  'other',
];
