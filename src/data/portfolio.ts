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
  /**
   * Set when the client's site is no longer serving.
   *
   * A dead domain stays in the portfolio record, but it must not be featured
   * as proof and must not be linked to as a live site.
   */
  liveStatus?: 'offline';
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
      'Aggelos Rentals: car rental with port and airport delivery for Piraeus and Paros, SEO for “rent a car Piraeus”, focused on port and airport handoff for ferry and flight arrivals.',
    summaryEl:
      'Aggelos Rentals: ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο στον Πειραιά και στην Πάρο, SEO για «ενοικίαση αυτοκινήτου Πειραιά», με έμφαση σε παράδοση σε λιμάνι και αεροδρόμιο για αφίξεις με πλοίο ή πτήση.',
    results: [
      'Piraeus and Paros: pages aimed at “rent a car Piraeus” and “airport car delivery Greece”',
      'Differentiation: port and airport handoff for ferry and flight arrivals',
      'Stack: website creation, local SEO, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τον Πειραιά και την Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου Πειραιά»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο',
      'Βάση σήμανσης schema και τεχνικού SEO για Aggelos Rentals',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Aggelos Rentals | rent a car Piraeus',
    seoDescription: 'Aggelos Rentals, car rental with port and airport delivery in Piraeus and Paros. SEO for “rent a car Piraeus”.',
    seoTitleEl: 'Aggelos Rentals | ενοικίαση αυτοκινήτου Πειραιά',
    seoDescriptionEl: 'Aggelos Rentals, ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο στον Πειραιά και στην Πάρο. SEO για «ενοικίαση αυτοκινήτου Πειραιά».',
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
      'Antiparos Rent a Car: island car and scooter rental for Antiparos, SEO for “rent a car Antiparos”, structured around “rent a car Antiparos”.',
    summaryEl:
      'Antiparos Rent a Car: ενοικίαση αυτοκινήτων και μηχανών στην Αντίπαρο, SEO για «ενοικίαση αυτοκινήτου Αντίπαρος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    results: [
      'Antiparos: pages aimed at “rent a car Antiparos” and “Antiparos scooter hire”',
      'Differentiation: ferry-arrival pickup and compact fleet for narrow island roads',
      'Stack: website creation, SEO web design, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Αντίπαρο με έμφαση σε «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων και μηχανών στο νησί',
      'Βάση σήμανσης schema και τεχνικού SEO για Antiparos Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design', 'local-seo'],
                                                    seoTitle: 'Antiparos Rent a Car | rent a car Antiparos',
    seoDescription: 'Antiparos Rent a Car, island car and scooter rental in Antiparos. SEO for “rent a car Antiparos”.',
    seoTitleEl: 'Antiparos Rent a Car | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Antiparos Rent a Car, ενοικίαση αυτοκινήτων και μηχανών στην Αντίπαρο. SEO για «ενοικίαση αυτοκινήτου Αντίπαρος».',
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
      'Cyclades Rent a Car: multi-island car rental comparison platform for Cyclades islands, SEO for “rent a car Cyclades”, optimized for mobile and local search.',
    summaryEl:
      'Cyclades Rent a Car: πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά των Κυκλάδων, SEO για «ενοικίαση αυτοκινήτου Κυκλάδες», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Cyclades islands: pages aimed at “rent a car Cyclades” and “Greek islands car hire”',
      'Differentiation: compare agencies across 24 islands with clear booking paths',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τις Κυκλάδες με έμφαση σε «ενοικίαση αυτοκινήτου Κυκλάδες»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά',
      'Βάση σήμανσης schema και τεχνικού SEO για Cyclades Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Cyclades Rent a Car | rent a car Cyclades',
    seoDescription: 'Cyclades Rent a Car, multi-island car rental comparison platform in Cyclades islands. SEO for “rent a car Cyclades”.',
    seoTitleEl: 'Cyclades Rent a Car | ενοικίαση αυτοκινήτου Κυκλάδες',
    seoDescriptionEl: 'Cyclades Rent a Car, πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά των Κυκλάδων. SEO για «ενοικίαση αυτοκινήτου Κυκλάδες».',
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
      'Naxos Car Rentals: Naxos car rental for Naxos, SEO for “rent a car Naxos”, with a clear path to booking.',
    summaryEl:
      'Naxos Car Rentals: ενοικίαση αυτοκινήτων στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος», με καθαρή διαδρομή προς κράτηση.',
    results: [
      'Naxos: pages aimed at “rent a car Naxos” and “Naxos car rental”',
      'Differentiation: port pickup and beach-day fleet pages for island itineraries',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Car Rentals',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rentals | rent a car Naxos',
    seoDescription: 'Naxos Car Rentals, Naxos car rental in Naxos. SEO for “rent a car Naxos”.',
    seoTitleEl: 'Naxos Car Rentals | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rentals, ενοικίαση αυτοκινήτων στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος».',
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
      'Rent a Car Antiparos: local Antiparos rent-a-car (.gr) website for Antiparos, SEO for “Antiparos rent a car”, structured around “Antiparos rent a car”.',
    summaryEl:
      'Rent a Car Antiparos: τοπική ενοικίαση αυτοκινήτων στην Αντίπαρο, SEO για «ενοικίαση αυτοκινήτου Αντίπαρος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    results: [
      'Antiparos: pages aimed at “Antiparos rent a car” and “car hire Antiparos Greece”',
      'Differentiation: Greek-first local SEO for Antiparos visitors booking on mobile',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Αντίπαρο με έμφαση σε «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: τοπική ενοικίαση αυτοκινήτων Αντιπάρου',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Antiparos',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Antiparos | Antiparos rent a car',
    seoDescription: 'Rent a Car Antiparos, local Antiparos rent-a-car (.gr) in Antiparos. SEO for “Antiparos rent a car”.',
    seoTitleEl: 'Rent a Car Antiparos | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Rent a Car Antiparos, τοπική ενοικίαση αυτοκινήτων στην Αντίπαρο. SEO για «ενοικίαση αυτοκινήτου Αντίπαρος».',
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
      'Rent a Car in Paros: Paros car hire brand website for Paros, SEO for “rent a car in Paros”, with technical SEO from day one.',
    summaryEl:
      'Rent a Car in Paros: ενοικίαση αυτοκινήτων στην Πάρο, SEO για «ενοικίαση αυτοκινήτου στην Πάρο», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Paros: pages aimed at “rent a car in Paros” and “Paros car hire”',
      'Differentiation: conversion-led vehicle cards for summer peak demand',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου στην Πάρο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στην Πάρο',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car in Paros',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car in Paros | Paros car hire',
    seoDescription: 'Rent a Car in Paros, Paros car hire brand in Paros. SEO for “rent a car in Paros”.',
    seoTitleEl: 'Rent a Car in Paros | ενοικίαση αυτοκινήτου στην Πάρο',
    seoDescriptionEl: 'Rent a Car in Paros, ενοικίαση αυτοκινήτων στην Πάρο. SEO για «ενοικίαση αυτοκινήτου στην Πάρο».',
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
      'Rent a Car Piraeus: Piraeus port city car rental for Piraeus, SEO for “rent a car Piraeus”, with technical SEO from day one.',
    summaryEl:
      'Rent a Car Piraeus: ενοικίαση αυτοκινήτων στον Πειραιά, SEO για «ενοικίαση αυτοκινήτου Πειραιάς», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Piraeus: pages aimed at “rent a car Piraeus” and “Piraeus port car rental”',
      'Differentiation: ferry-day and neighborhood pickup around the port',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τον Πειραιά με έμφαση σε «ενοικίαση αυτοκινήτου Πειραιάς»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στον Πειραιά',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Piraeus',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Piraeus | Piraeus port car rental',
    seoDescription: 'Rent a Car Piraeus, Piraeus port city car rental in Piraeus. SEO for “rent a car Piraeus”.',
    seoTitleEl: 'Rent a Car Piraeus | ενοικίαση αυτοκινήτου Πειραιάς',
    seoDescriptionEl: 'Rent a Car Piraeus, ενοικίαση αυτοκινήτων στον Πειραιά. SEO για «ενοικίαση αυτοκινήτου Πειραιάς».',
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
      'Athens Rent a Car: Athens city and airport car rental for Athens, SEO for “rent a car Athens”, with trust signals and a clear booking path.',
    summaryEl:
      'Athens Rent a Car: ενοικίαση αυτοκινήτων στην Αθήνα, SEO για «ενοικίαση αυτοκινήτου Αθήνα», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή κράτησης.',
    results: [
      'Athens: pages aimed at “rent a car Athens” and “Athens airport car rental”',
      'Differentiation: airport and city delivery for business and tourism',
      'Stack: website creation, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Αθήνα με έμφαση σε «ενοικίαση αυτοκινήτου Αθήνα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στην Αθήνα',
      'Βάση σήμανσης schema και τεχνικού SEO για Athens Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'speed-optimization'],
                                                    seoTitle: 'Athens Rent a Car | rent a car Athens',
    seoDescription: 'Athens Rent a Car, Athens city and airport car rental in Athens. SEO for “rent a car Athens”.',
    seoTitleEl: 'Athens Rent a Car | ενοικίαση αυτοκινήτου Αθήνα',
    seoDescriptionEl: 'Athens Rent a Car, ενοικίαση αυτοκινήτων στην Αθήνα. SEO για «ενοικίαση αυτοκινήτου Αθήνα».',
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
      'Rent a Car Paros: Paros car rental (.gr domain) for Paros, SEO for “rentacar Paros”, with technical SEO from day one.',
    summaryEl:
      'Rent a Car Paros: ενοικίαση αυτοκινήτων στην Πάρο, SEO για «ενοικίαση αυτοκινήτου Πάρος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Paros: pages aimed at “rentacar Paros” and “Paros car rental Greece”',
      'Differentiation: local .gr domain for Greek-language Paros searchers',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου Πάρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στην Πάρο',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Paros',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Paros | rentacar Paros',
    seoDescription: 'Rent a Car Paros, Paros car rental (.gr domain) in Paros. SEO for “rentacar Paros”.',
    seoTitleEl: 'Rent a Car Paros | ενοικίαση αυτοκινήτου Πάρος',
    seoDescriptionEl: 'Rent a Car Paros, ενοικίαση αυτοκινήτων στην Πάρο. SEO για «ενοικίαση αυτοκινήτου Πάρος».',
    liveStatus: 'offline', // site offline at scrape time
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
      'Hotels Santorini: Santorini hotels directory and bookings for Santorini, SEO for “hotels Santorini”, with technical SEO from day one.',
    summaryEl:
      'Hotels Santorini: κατάλογος και κρατήσεις ξενοδοχείων στη Σαντορίνη, SEO για «ξενοδοχεία Σαντορίνη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Santorini: pages aimed at “hotels Santorini” and “Santorini hotel booking”',
      'Differentiation: caldera and beach hotel discovery with direct booking calls to action',
      'Stack: website creation, SEO web design, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Σαντορίνη με έμφαση σε «ξενοδοχεία Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κατάλογος και κρατήσεις ξενοδοχείων Σαντορίνης',
      'Βάση σήμανσης schema και τεχνικού SEO για Hotels Santorini',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design', 'content-creation'],
                                                    seoTitle: 'Hotels Santorini | Santorini hotel booking',
    seoDescription: 'Hotels Santorini, Santorini hotels directory and bookings in Santorini. SEO for “hotels Santorini”.',
    seoTitleEl: 'Hotels Santorini | ξενοδοχεία Σαντορίνη',
    seoDescriptionEl: 'Hotels Santorini, κατάλογος και κρατήσεις ξενοδοχείων στη Σαντορίνη. SEO για «ξενοδοχεία Σαντορίνη».',
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
      'Hotels Sifnos: Sifnos hotels and stays for Sifnos, SEO for “hotels Sifnos”, with technical SEO from day one.',
    summaryEl:
      'Hotels Sifnos: ιστοσελίδα για ξενοδοχεία και διαμονή στη Σίφνο, SEO για «ξενοδοχεία Σίφνος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Sifnos: pages aimed at “hotels Sifnos” and “Sifnos accommodation”',
      'Differentiation: boutique island stay hubs for travelers researching lodging',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Σίφνο με έμφαση σε «ξενοδοχεία Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ξενοδοχεία και διαμονή στη Σίφνο',
      'Βάση σήμανσης schema και τεχνικού SEO για Hotels Sifnos',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Hotels Sifnos | Sifnos accommodation',
    seoDescription: 'Hotels Sifnos, Sifnos hotels and stays in Sifnos. SEO for “hotels Sifnos”.',
    seoTitleEl: 'Hotels Sifnos | ξενοδοχεία Σίφνος',
    seoDescriptionEl: 'Hotels Sifnos, ξενοδοχεία και διαμονή στη Σίφνο. SEO για «ξενοδοχεία Σίφνος».',
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
      'Onoma Hotel: boutique hotel brand site for Greece, SEO for “Onoma Hotel”, with a clear path to booking.',
    summaryEl:
      'Onoma Hotel: ιστοσελίδα boutique ξενοδοχείου στην Ελλάδα, SEO για «Onoma Hotel», με καθαρή διαδρομή προς κράτηση.',
    results: [
      'Greece: pages aimed at “Onoma Hotel” and “boutique hotel Greece”',
      'Differentiation: brand storytelling with room-type pages for direct bookings',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «Onoma Hotel»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ιστοσελίδα boutique ξενοδοχείου',
      'Βάση σήμανσης schema και τεχνικού SEO για Onoma Hotel',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Onoma Hotel | boutique hotel Greece',
    seoDescription: 'Onoma Hotel, boutique hotel brand site in Greece. SEO for “Onoma Hotel”.',
    seoTitleEl: 'Onoma Hotel | boutique ξενοδοχείο Ελλάδα',
    seoDescriptionEl: 'Onoma Hotel, ιστοσελίδα boutique ξενοδοχείου στην Ελλάδα. SEO για «Onoma Hotel».',
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
      'Villa Olivia Clara: luxury private villa for Crete, SEO for “Villa Olivia Clara”, focused on photo-led conversion for high-intent luxury villa searches.',
    summaryEl:
      'Villa Olivia Clara: ιστοσελίδα για πολυτελή ιδιωτική βίλα στην Κρήτη, SEO για «Villa Olivia Clara», με έμφαση σε μετατροπή μέσω φωτογραφίας για αναζητήσεις πολυτελούς βίλας.',
    results: [
      'Crete: pages aimed at “Villa Olivia Clara” and “luxury villa Crete”',
      'Differentiation: photo-led conversion for high-intent luxury villa searches',
      'Stack: website creation, local SEO, ai-visibility',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Κρήτη με έμφαση σε «Villa Olivia Clara»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πολυτελής ιδιωτική βίλα',
      'Βάση σήμανσης schema και τεχνικού SEO για Villa Olivia Clara',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'ai-visibility'],
                                                    seoTitle: 'Villa Olivia Clara | luxury villa Crete',
    seoDescription: 'Villa Olivia Clara, luxury private villa in Crete. SEO for “Villa Olivia Clara”.',
    seoTitleEl: 'Villa Olivia Clara | πολυτελής βίλα Κρήτη',
    seoDescriptionEl: 'Villa Olivia Clara, πολυτελής ιδιωτική βίλα στην Κρήτη. SEO για «Villa Olivia Clara».',
    featured: true,
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
      'Mykonos Luxury: luxury Mykonos journey and villa concierge for Mykonos, SEO for “Mykonos luxury villa”, with technical SEO from day one.',
    summaryEl:
      'Mykonos Luxury: ιστοσελίδα για πολυτελή διαμονή και concierge στη Μύκονο, SEO για «πολυτελής βίλα Μύκονος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Mykonos: pages aimed at “Mykonos luxury villa” and “Mykonos concierge”',
      'Differentiation: complete luxury journey packaging for international guests',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Μύκονο με έμφαση σε «πολυτελής βίλα Μύκονος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πολυτελής διαμονή και concierge στη Μύκονο',
      'Βάση σήμανσης schema και τεχνικού SEO για Mykonos Luxury',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Mykonos Luxury | Mykonos luxury villa',
    seoDescription: 'Mykonos Luxury, luxury Mykonos journey and villa concierge in Mykonos. SEO for “Mykonos luxury villa”.',
    seoTitleEl: 'Mykonos Luxury | πολυτελής βίλα Μύκονος',
    seoDescriptionEl: 'Mykonos Luxury, πολυτελής διαμονή και concierge στη Μύκονο. SEO για «πολυτελής βίλα Μύκονος».',
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
      'Discover Cyclades: Cyclades travel guide and discovery platform for Cyclades, SEO for “Discover Cyclades”, ready for organic growth in Cyclades.',
    summaryEl:
      'Discover Cyclades: ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης για τις Κυκλάδες, SEO για «οδηγός Κυκλάδες», έτοιμη για οργανική ανάπτυξη στις Κυκλάδες.',
    results: [
      'Cyclades: pages aimed at “Discover Cyclades” and “Cyclades travel guide”',
      'Differentiation: island hub architecture that funnels discovery traffic to commercial pages',
      'Stack: website creation, content creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τις Κυκλάδες με έμφαση σε «οδηγός Κυκλάδες»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης Κυκλάδων',
      'Βάση σήμανσης schema και τεχνικού SEO για Discover Cyclades',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation', 'local-seo'],
                                                    seoTitle: 'Discover Cyclades | Cyclades travel guide',
    seoDescription: 'Discover Cyclades, Cyclades travel guide and discovery platform in Cyclades. SEO for “Discover Cyclades”.',
    seoTitleEl: 'Discover Cyclades | οδηγός Κυκλάδες',
    seoDescriptionEl: 'Discover Cyclades, ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης για τις Κυκλάδες. SEO για «οδηγός Κυκλάδες».',
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
      'Discover Crete: Crete discovery and tours platform for Crete / Paleochora, SEO for “Discover Crete”, with technical SEO from day one.',
    summaryEl:
      'Discover Crete: πλατφόρμα ανακάλυψης και εκδρομών στην Κρήτη και στην Παλαιόχωρα, SEO για «εκδρομές Κρήτη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Crete / Paleochora: pages aimed at “Discover Crete” and “Crete tours”',
      'Differentiation: region silos for west and east Crete travel intents',
      'Stack: website creation, content creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Κρήτη και την Παλαιόχωρα με έμφαση σε «εκδρομές Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πλατφόρμα ανακάλυψης και εκδρομών Κρήτης',
      'Βάση σήμανσης schema και τεχνικού SEO για Discover Crete',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation', 'seo-web-design'],
                                                    seoTitle: 'Discover Crete | Crete tours',
    seoDescription: 'Discover Crete, Crete discovery and tours platform in Crete / Paleochora. SEO for “Discover Crete”.',
    seoTitleEl: 'Discover Crete | εκδρομές Κρήτη',
    seoDescriptionEl: 'Discover Crete, πλατφόρμα ανακάλυψης και εκδρομών στην Κρήτη και στην Παλαιόχωρα. SEO για «εκδρομές Κρήτη».',
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
      'Way to Crete: storytelling tours and Crete experiences website for Crete, SEO for “Way to Crete”, with technical SEO from day one.',
    summaryEl:
      'Way to Crete: ιστοσελίδα για εκδρομές storytelling και εμπειρίες στην Κρήτη, SEO για «εμπειρίες Κρήτη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Crete: pages aimed at “Way to Crete” and “Crete experiences”',
      'Differentiation: experience-led booking pages that sell belonging, not just sightseeing',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Κρήτη με έμφαση σε «εμπειρίες Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: εκδρομές storytelling και εμπειρίες στην Κρήτη',
      'Βάση σήμανσης schema και τεχνικού SEO για Way to Crete',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Way to Crete | Crete experiences',
    seoDescription: 'Way to Crete, storytelling tours and Crete experiences in Crete. SEO for “Way to Crete”.',
    seoTitleEl: 'Way to Crete | εμπειρίες Κρήτη',
    seoDescriptionEl: 'Way to Crete, εκδρομές storytelling και εμπειρίες στην Κρήτη. SEO για «εμπειρίες Κρήτη».',
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
      'Santorini Daily Tours: daily tour products in Santorini website for Santorini, SEO for “Santorini daily tours”, with technical SEO from day one.',
    summaryEl:
      'Santorini Daily Tours: ιστοσελίδα για ημερήσιες εκδρομές στη Σαντορίνη, SEO για «ημερήσιες εκδρομές Σαντορίνη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Santorini: pages aimed at “Santorini daily tours” and “Santorini boat tour”',
      'Differentiation: product pages for volcano, boat and day-trip intents',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Σαντορίνη με έμφαση σε «ημερήσιες εκδρομές Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ημερήσιες εκδρομές στη Σαντορίνη',
      'Βάση σήμανσης schema και τεχνικού SEO για Santorini Daily Tours',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Santorini Daily Tours | Santorini boat tour',
    seoDescription: 'Santorini Daily Tours, daily tour products in Santorini in Santorini. SEO for “Santorini daily tours”.',
    seoTitleEl: 'Santorini Daily Tours | ημερήσιες εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santorini Daily Tours, ημερήσιες εκδρομές στη Σαντορίνη. SEO για «ημερήσιες εκδρομές Σαντορίνη».',
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
      'Santo Tours Marinakis: local Santorini tour operator website for Santorini, SEO for “Santo Tours Marinakis”, optimized for mobile and local search.',
    summaryEl:
      'Santo Tours Marinakis: ιστοσελίδα για τοπικό tour operator στη Σαντορίνη, SEO για «εκδρομές Σαντορίνη», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Santorini: pages aimed at “Santo Tours Marinakis” and “Santorini tours”',
      'Differentiation: family operator trust and licensed excursion SEO since 2000',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Σαντορίνη με έμφαση σε «εκδρομές Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: τοπικός tour operator στη Σαντορίνη',
      'Βάση σήμανσης schema και τεχνικού SEO για Santo Tours Marinakis',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Santo Tours Marinakis | Santorini tours',
    seoDescription: 'Santo Tours Marinakis, local Santorini tour operator in Santorini. SEO for “Santo Tours Marinakis”.',
    seoTitleEl: 'Santo Tours Marinakis | εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santo Tours Marinakis, τοπικός tour operator στη Σαντορίνη. SEO για «εκδρομές Σαντορίνη».',
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
      'Skydream Travel: travel agency and holiday packages for Greece, SEO for “SkyDream Travel”, with trust signals and a clear inquiry path.',
    summaryEl:
      'Skydream Travel: ταξιδιωτικό γραφείο και πακέτα διακοπών στην Ελλάδα, SEO για «ταξιδιωτικό γραφείο», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή επικοινωνίας.',
            results: [
      'Greece: pages aimed at “SkyDream Travel” and “travel agency Greece”',
      'Differentiation: package and destination landing pages for commercial travel intent',
      'Stack: website creation, SEO web design, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «ταξιδιωτικό γραφείο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ταξιδιωτικό γραφείο και πακέτα διακοπών',
      'Βάση σήμανσης schema και τεχνικού SEO για Skydream Travel',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'seo-web-design', 'content-creation'],
                                                    seoTitle: 'Skydream Travel | travel agency Greece',
    seoDescription: 'Skydream Travel, travel agency and holiday packages in Greece. SEO for “SkyDream Travel”.',
    seoTitleEl: 'Skydream Travel | ταξιδιωτικό γραφείο',
    seoDescriptionEl: 'Skydream Travel, ταξιδιωτικό γραφείο και πακέτα διακοπών στην Ελλάδα. SEO για «ταξιδιωτικό γραφείο».',
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
      'Cuba Travel Academy: Cuba travel education academy for Cuba travel (Greek audience), SEO for “Cuba Travel Academy”, ready for organic growth in Cuba travel (Greek audience).',
    summaryEl:
      'Cuba Travel Academy: ακαδημία εκπαίδευσης για ταξίδι στην Κούβα, με κοινό στην Ελλάδα, SEO για «ταξίδι Κούβα», έτοιμη για οργανική ανάπτυξη στην Ελλάδα.',
    results: [
      'Cuba travel (Greek audience): pages aimed at “Cuba Travel Academy” and “Cuba travel guide Greek”',
      'Differentiation: education-led content that answers document and itinerary questions before booking',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα, με στόχο το ταξίδι στην Κούβα, με έμφαση σε «ταξίδι Κούβα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ακαδημία εκπαίδευσης για ταξίδι στην Κούβα',
      'Βάση σήμανσης schema και τεχνικού SEO για Cuba Travel Academy',
      'Διαδρομές εγγραφής από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Cuba Travel Academy | Cuba travel guide Greek',
    seoDescription: 'Cuba Travel Academy, Cuba travel education academy in Cuba travel (Greek audience). SEO for “Cuba Travel Academy”.',
    seoTitleEl: 'Cuba Travel Academy | ταξίδι Κούβα',
    seoDescriptionEl: 'Cuba Travel Academy, ακαδημία εκπαίδευσης για ταξίδι στην Κούβα, με κοινό στην Ελλάδα. SEO για «ταξίδι Κούβα».',
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
      'Antiparos Transfer: luxury island transfer service for Antiparos and Paros, SEO for “Antiparos transfer”, with trust signals and a clear booking path.',
    summaryEl:
      'Antiparos Transfer: υπηρεσία πολυτελών μεταφορών στην Αντίπαρο και στην Πάρο, SEO για «μεταφορά Αντίπαρος», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή κράτησης.',
    results: [
      'Antiparos and Paros: pages aimed at “Antiparos transfer” and “Antiparos taxi”',
      'Differentiation: family-run door-to-door transfers since 1994 including weddings',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Αντίπαρο και την Πάρο με έμφαση σε «μεταφορά Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: υπηρεσία πολυτελών μεταφορών στο νησί',
      'Βάση σήμανσης schema και τεχνικού SEO για Antiparos Transfer',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Antiparos Transfer | Antiparos taxi',
    seoDescription: 'Antiparos Transfer, luxury island transfer service in Antiparos and Paros. SEO for “Antiparos transfer”.',
    seoTitleEl: 'Antiparos Transfer | μεταφορά Αντίπαρος',
    seoDescriptionEl: 'Antiparos Transfer, υπηρεσία πολυτελών μεταφορών στην Αντίπαρο και στην Πάρο. SEO για «μεταφορά Αντίπαρος».',
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
      'Navos AI: AI strategy advisor SaaS website for global SaaS market, SEO for “Navos AI”, structured around “Navos AI”.',
    summaryEl:
      'Navos AI: πλατφόρμα τεχνητής νοημοσύνης για επιχειρηματικές αποφάσεις στη διεθνή αγορά SaaS, SEO για «Navos AI», με δομή περιεχομένου για «Navos AI».',
    results: [
      'global SaaS market: pages aimed at “Navos AI” and “AI strategy advisor”',
      'Differentiation: product and use-case pages that explain decisions needing attention now',
      'Stack: website creation, ai-visibility, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη διεθνή αγορά SaaS με έμφαση σε «Navos AI»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πλατφόρμα τεχνητής νοημοσύνης για επιχειρηματικές αποφάσεις',
      'Βάση σήμανσης schema και τεχνικού SEO για Navos AI',
      'Διαδρομές επίδειξης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'ai-visibility', 'seo-web-design'],
                                                    seoTitle: 'Navos AI | AI strategy advisor',
    seoDescription: 'Navos AI, AI strategy advisor SaaS in global SaaS market. SEO for “Navos AI”.',
    seoTitleEl: 'Navos AI | σύμβουλος στρατηγικής AI',
    seoDescriptionEl: 'Navos AI, πλατφόρμα τεχνητής νοημοσύνης για επιχειρηματικές αποφάσεις στη διεθνή αγορά SaaS. SEO για «Navos AI».',
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
      'Project Shadow AI: AI tooling for online stores for global e-commerce, SEO for “Project Shadow AI”, with technical SEO from day one.',
    summaryEl:
      'Project Shadow AI: ιστοσελίδα για εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα στη διεθνή αγορά e-commerce, SEO για «Project Shadow AI», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'global e-commerce: pages aimed at “Project Shadow AI” and “AI for WordPress stores”',
      'Differentiation: technical brand pages for AI store assistance (scrape was thin)',
      'Stack: website creation, ai-visibility',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη διεθνή αγορά e-commerce με έμφαση σε «Project Shadow AI»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα',
      'Βάση σήμανσης schema και τεχνικού SEO για Project Shadow AI',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'ai-visibility'],
                                                    seoTitle: 'Project Shadow AI | AI for WordPress stores',
    seoDescription: 'Project Shadow AI, AI tooling for online stores in global e-commerce. SEO for “Project Shadow AI”.',
    seoTitleEl: 'Project Shadow AI | AI για ηλεκτρονικό κατάστημα',
    seoDescriptionEl: 'Project Shadow AI, εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα στη διεθνή αγορά e-commerce. SEO για «Project Shadow AI».',
    liveStatus: 'offline', // thin or broken page at scrape time
    featured: false,
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
      'Rethemnos: Rethymno tourism portal and local guide for Rethymno, SEO for “Rethymno tourism”, with trust signals and a clear inquiry path.',
    summaryEl:
      'Rethemnos: τουριστική πύλη και τοπικός οδηγός για το Ρέθυμνο, SEO για «τουρισμός Ρέθυμνο», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή επικοινωνίας.',
    results: [
      'Rethymno: pages aimed at “Rethymno tourism” and “visit Rethymno”',
      'Differentiation: city guide hubs that feed commercial tourism and local business pages',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για το Ρέθυμνο με έμφαση σε «τουρισμός Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: τουριστική πύλη και τοπικός οδηγός Ρεθύμνου',
      'Βάση σήμανσης schema και τεχνικού SEO για Rethemnos',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Rethemnos | Rethymno tourism',
    seoDescription: 'Rethemnos, Rethymno tourism portal and local guide in Rethymno. SEO for “Rethymno tourism”.',
    seoTitleEl: 'Rethemnos | τουρισμός Ρέθυμνο',
    seoDescriptionEl: 'Rethemnos, τουριστική πύλη και τοπικός οδηγός για το Ρέθυμνο. SEO για «τουρισμός Ρέθυμνο».',
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
      'Ktima Orion: wedding and events estate for Keratea, Attica, SEO for “Ktima Orion”, focused on wedding, baptism and event venue SEO for Attica couples.',
    summaryEl:
      'Ktima Orion: κτήμα γάμων και εκδηλώσεων στην Κερατέα Αττικής, SEO για «Κτήμα Ωρίων», με έμφαση σε SEO για γάμους, βαπτίσεις και εκδηλώσεις στην Αττική.',
    results: [
      'Keratea, Attica: pages aimed at “Ktima Orion” and “wedding estate Attica”',
      'Differentiation: wedding, baptism and event venue SEO for Attica couples',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Κερατέα Αττικής με έμφαση σε «Κτήμα Ωρίων»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κτήμα γάμων και εκδηλώσεων',
      'Βάση σήμανσης schema και τεχνικού SEO για Ktima Orion',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Ktima Orion | wedding estate Attica',
    seoDescription: 'Ktima Orion, wedding and events estate in Keratea, Attica. SEO for “Ktima Orion”.',
    seoTitleEl: 'Ktima Orion | Κτήμα Ωρίων',
    seoDescriptionEl: 'Ktima Orion, κτήμα γάμων και εκδηλώσεων στην Κερατέα Αττικής. SEO για «Κτήμα Ωρίων».',
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
      'Weddings Folegandros: destination wedding planning website for Folegandros, SEO for “Folegandros weddings”, with technical SEO from day one.',
    summaryEl:
      'Weddings Folegandros: ιστοσελίδα για οργάνωση γάμων προορισμού στη Φολέγανδρο, SEO για «γάμοι Φολέγανδρος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Folegandros: pages aimed at “Folegandros weddings” and “destination wedding Greece”',
      'Differentiation: Aegean wedding storytelling with planning inquiry paths',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Φολέγανδρο με έμφαση σε «γάμοι Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: οργάνωση γάμων προορισμού',
      'Βάση σήμανσης schema και τεχνικού SEO για Weddings Folegandros',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Weddings Folegandros | Folegandros weddings',
    seoDescription: 'Weddings Folegandros, destination wedding planning in Folegandros. SEO for “Folegandros weddings”.',
    seoTitleEl: 'Weddings Folegandros | γάμοι Φολέγανδρος',
    seoDescriptionEl: 'Weddings Folegandros, οργάνωση γάμων προορισμού στη Φολέγανδρο. SEO για «γάμοι Φολέγανδρος».',
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
      'My Honeymoon: honeymoon planning brand website for Greece, SEO for “My Honeymoon”, optimized for mobile and local search.',
    summaryEl:
      'My Honeymoon: ιστοσελίδα για οργάνωση ταξιδιού του μέλιτος στην Ελλάδα, SEO για «ταξίδι του μέλιτος Ελλάδα», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
            results: [
      'Greece: pages aimed at “My Honeymoon” and “Greece honeymoon packages”',
      'Differentiation: romantic itinerary and package keyword clusters for couples',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «ταξίδι του μέλιτος Ελλάδα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: οργάνωση ταξιδιού του μέλιτος',
      'Βάση σήμανσης schema και τεχνικού SEO για My Honeymoon',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'My Honeymoon | Greece honeymoon packages',
    seoDescription: 'My Honeymoon, honeymoon planning brand in Greece. SEO for “My Honeymoon”.',
    seoTitleEl: 'My Honeymoon | ταξίδι του μέλιτος Ελλάδα',
    seoDescriptionEl: 'My Honeymoon, οργάνωση ταξιδιού του μέλιτος στην Ελλάδα. SEO για «ταξίδι του μέλιτος Ελλάδα».',
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
      'George Xipolitas: dining consulting and hospitality professional brand website for Greece, SEO for “George Xipolitas”, with technical SEO from day one.',
    summaryEl:
      'George Xipolitas: επαγγελματικό brand συμβουλευτικής εστίασης στην Ελλάδα, SEO για «George Xipolitas», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Greece: pages aimed at “George Xipolitas” and “hospitality consulting Greece”',
      'Differentiation: authority pages for local professional and hospitality search',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «George Xipolitas»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: επαγγελματικό brand συμβουλευτικής εστίασης',
      'Βάση σήμανσης schema και τεχνικού SEO για George Xipolitas',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'George Xipolitas | hospitality consulting Greece',
    seoDescription: 'George Xipolitas, dining consulting and hospitality professional brand in Greece. SEO for “George Xipolitas”.',
    seoTitleEl: 'George Xipolitas | συμβουλευτική εστίασης',
    seoDescriptionEl: 'George Xipolitas, επαγγελματικό brand συμβουλευτικής εστίασης στην Ελλάδα. SEO για «George Xipolitas».',
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
      'Helicro: airport and private transfer service for Belgium and Greece corridors, SEO for “Helicro transport”, focused on bilingual Belgium–Greece transfer booking with loyalty offers.',
    summaryEl:
      'Helicro: υπηρεσία ιδιωτικών μεταφορών και μεταφορών αεροδρομίου στο Βέλγιο και στις διαδρομές προς την Ελλάδα, SEO για «Helicro μεταφορές», με έμφαση σε δίγλωσσες κρατήσεις μεταφορών Βέλγιο–Ελλάδα με προγράμματα επιβράβευσης.',
    results: [
      'Belgium and Greece corridors: pages aimed at “Helicro transport” and “Belgium airport transfer”',
      'Differentiation: bilingual Belgium–Greece transfer booking with loyalty offers',
      'Stack: website creation, seo-audits',
    ],
    resultsEl: [
      'Τοπική αφήγηση για το Βέλγιο και τις διαδρομές προς την Ελλάδα με έμφαση σε «Helicro μεταφορές»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: υπηρεσία ιδιωτικών μεταφορών και μεταφορών αεροδρομίου',
      'Βάση σήμανσης schema και τεχνικού SEO για Helicro',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-audits'],
                                                    seoTitle: 'Helicro | Helicro transport',
    seoDescription: 'Helicro, airport and private transfer service in Belgium and Greece corridors. SEO for “Helicro transport”.',
    seoTitleEl: 'Helicro | Helicro μεταφορές',
    seoDescriptionEl: 'Helicro, υπηρεσία ιδιωτικών μεταφορών και μεταφορών αεροδρομίου στο Βέλγιο και στις διαδρομές προς την Ελλάδα. SEO για «Helicro μεταφορές».',
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
      'Mastorush: craftsman quote marketplace for Greece, SEO for “Mastorush”, with a clear path to signup.',
    summaryEl:
      'Mastorush: αγορά αιτημάτων προσφορών από μάστορες στην Ελλάδα, SEO για «Mastorush», με καθαρή διαδρομή προς εγγραφή.',
    results: [
      'Greece: pages aimed at “Mastorush” and “find craftsman Greece”',
      'Differentiation: post a job, get verified craftsman quotes with photos',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «Mastorush»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: αγορά αιτημάτων προσφορών από μάστορες',
      'Βάση σήμανσης schema και τεχνικού SEO για Mastorush',
      'Διαδρομές εγγραφής από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Mastorush | find craftsman Greece',
    seoDescription: 'Mastorush, craftsman quote marketplace in Greece. SEO for “Mastorush”.',
    seoTitleEl: 'Mastorush | προσφορές από μάστορες',
    seoDescriptionEl: 'Mastorush, αγορά αιτημάτων προσφορών από μάστορες στην Ελλάδα. SEO για «Mastorush».',
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
      'The Nutri Nest: clinical dietitian and nutrition practice website for Greece, SEO for “clinical dietitian Greece”, with trust signals and a clear inquiry path.',
    summaryEl:
      'The Nutri Nest: κλινική διαιτολογία και διατροφολογία στην Ελλάδα, SEO για «κλινική διαιτολόγος», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή επικοινωνίας.',
    results: [
      'Greece: pages aimed at “clinical dietitian Greece” and “The Nutri Nest”',
      'Differentiation: practitioner authority pages and appointment inquiry paths',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «κλινική διαιτολόγος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κλινική διαιτολογία και διατροφολογία',
      'Βάση σήμανσης schema και τεχνικού SEO για The Nutri Nest',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'The Nutri Nest | clinical dietitian Greece',
    seoDescription: 'The Nutri Nest, clinical dietitian and nutrition practice in Greece. SEO for “clinical dietitian Greece”.',
    seoTitleEl: 'The Nutri Nest | κλινική διαιτολόγος',
    seoDescriptionEl: 'The Nutri Nest, κλινική διαιτολογία και διατροφολογία στην Ελλάδα. SEO για «κλινική διαιτολόγος».',
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
      'Folegandros Hair Salon: hair, nails and makeup salon for Folegandros, SEO for “Folegandros hair salon”, with a clear path to booking.',
    summaryEl:
      'Folegandros Hair Salon: κομμωτήριο, νύχια και μακιγιάζ στη Φολέγανδρο, SEO για «κομμωτήριο Φολέγανδρος», με καθαρή διαδρομή προς κράτηση.',
    results: [
      'Folegandros: pages aimed at “Folegandros hair salon” and “Sousi Hair Salon”',
      'Differentiation: beauty services for island visitors and residents with book-now',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Φολέγανδρο με έμφαση σε «κομμωτήριο Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κομμωτήριο, νύχια και μακιγιάζ',
      'Βάση σήμανσης schema και τεχνικού SEO για Folegandros Hair Salon',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Folegandros Hair Salon | Sousi Hair Salon',
    seoDescription: 'Folegandros Hair Salon, hair, nails and makeup salon in Folegandros. SEO for “Folegandros hair salon”.',
    seoTitleEl: 'Folegandros Hair Salon | κομμωτήριο Φολέγανδρος',
    seoDescriptionEl: 'Folegandros Hair Salon, κομμωτήριο, νύχια και μακιγιάζ στη Φολέγανδρο. SEO για «κομμωτήριο Φολέγανδρος».',
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
      'Folegandros Moto: moto and scooter rental for Folegandros, SEO for “Folegandros scooter rental”, structured around “Folegandros scooter rental”.',
    summaryEl:
      'Folegandros Moto: ενοικίαση μηχανών και scooters στη Φολέγανδρο, SEO για «ενοικίαση μηχανής Φολέγανδρος», με δομή περιεχομένου για «ενοικίαση μηχανής Φολέγανδρος».',
    results: [
      'Folegandros: pages aimed at “Folegandros scooter rental” and “rent a moto Folegandros”',
      'Differentiation: two-wheel fleet for island mobility since 1998',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Φολέγανδρο με έμφαση σε «ενοικίαση μηχανής Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση μηχανών και scooters',
      'Βάση σήμανσης schema και τεχνικού SEO για Folegandros Moto',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Folegandros Moto | Folegandros scooter rental',
    seoDescription: 'Folegandros Moto, moto and scooter rental in Folegandros. SEO for “Folegandros scooter rental”.',
    seoTitleEl: 'Folegandros Moto | ενοικίαση μηχανής Φολέγανδρος',
    seoDescriptionEl: 'Folegandros Moto, ενοικίαση μηχανών και scooters στη Φολέγανδρο. SEO για «ενοικίαση μηχανής Φολέγανδρος».',
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
      'Best Pumpkin Near Me: US local pumpkin patch directory for United States, SEO for “best pumpkin near me”, with technical SEO from day one.',
    summaryEl:
      'Best Pumpkin Near Me: κατάλογος τοπικών pumpkin patches στις ΗΠΑ, SEO για «best pumpkin near me», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'United States: pages aimed at “best pumpkin near me” and “pumpkin patch near me”',
      'Differentiation: hyperlocal near-me SEO for seasonal autumn demand',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τις Ηνωμένες Πολιτείες με έμφαση σε «best pumpkin near me»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κατάλογος τοπικών pumpkin patches στις ΗΠΑ',
      'Βάση σήμανσης schema και τεχνικού SEO για Best Pumpkin Near Me',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Best Pumpkin Near Me | pumpkin patch near me',
    seoDescription: 'Best Pumpkin Near Me, US local pumpkin patch directory in United States. SEO for “best pumpkin near me”.',
    seoTitleEl: 'Best Pumpkin Near Me | pumpkin patch κοντά μου',
    seoDescriptionEl: 'Best Pumpkin Near Me, κατάλογος τοπικών pumpkin patches στις ΗΠΑ. SEO για «best pumpkin near me».',
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
      'Stretcher Stopper: medical stretcher wall-protection product website for United States / healthcare facilities, SEO for “Stretcher Stopper”, ready for organic growth in United States / healthcare facilities.',
    summaryEl:
      'Stretcher Stopper: ιστοσελίδα για προϊόν προστασίας τοίχων από φορεία για χώρους υγείας στις ΗΠΑ, SEO για «Stretcher Stopper», έτοιμη για οργανική ανάπτυξη στις ΗΠΑ.',
    results: [
      'United States / healthcare facilities: pages aimed at “Stretcher Stopper” and “medical stretcher safety”',
      'Differentiation: product education pages with direct quote requests',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τις ΗΠΑ και τους χώρους υγείας με έμφαση σε «Stretcher Stopper»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: προϊόν προστασίας τοίχων από φορεία',
      'Βάση σήμανσης schema και τεχνικού SEO για Stretcher Stopper',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Stretcher Stopper | medical stretcher safety',
    seoDescription: 'Stretcher Stopper, medical stretcher wall-protection product in United States / healthcare facilities. SEO for “Stretcher Stopper”.',
    seoTitleEl: 'Stretcher Stopper | προστασία τοίχων νοσοκομείο',
    seoDescriptionEl: 'Stretcher Stopper, προϊόν προστασίας τοίχων από φορεία για χώρους υγείας στις ΗΠΑ. SEO για «Stretcher Stopper».',
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
      'Antiparos Rooms: seaside rooms and apartments website for Antiparos, SEO for “Antiparos rooms”, with trust signals and a clear booking path.',
    summaryEl:
      'Antiparos Rooms: ιστοσελίδα για παραθαλάσσια δωμάτια και διαμερίσματα στην Αντίπαρο, SEO για «δωμάτια Αντίπαρος», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή κράτησης.',
    results: [
      'Antiparos: pages aimed at “Antiparos rooms” and “Antiparos apartments”',
      'Differentiation: direct booking for Cycladic seaside apartments versus OTA dependence',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Αντίπαρο με έμφαση σε «δωμάτια Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: παραθαλάσσια δωμάτια και διαμερίσματα',
      'Βάση σήμανσης schema και τεχνικού SEO για Antiparos Rooms',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Antiparos Rooms | Antiparos apartments',
    seoDescription: 'Antiparos Rooms, seaside rooms and apartments in Antiparos. SEO for “Antiparos rooms”.',
    seoTitleEl: 'Antiparos Rooms | δωμάτια Αντίπαρος',
    seoDescriptionEl: 'Antiparos Rooms, παραθαλάσσια δωμάτια και διαμερίσματα στην Αντίπαρο. SEO για «δωμάτια Αντίπαρος».',
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
      'Erebos: real-time GPS vehicle tracking platform for Greece and the EU, SEO for “Erebos GPS tracking”, with trust signals and a clear signup path.',
    summaryEl:
      'Erebos: πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο στην Ελλάδα και στην ΕΕ, SEO για «παρακολούθηση οχημάτων», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή εγγραφής.',
            results: [
      'Greece and the EU: pages aimed at “Erebos GPS tracking” and “vehicle tracking platform”',
      'Differentiation: phone or hardware tracker setup with free start tracking CTA',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα και την ΕΕ με έμφαση σε «παρακολούθηση οχημάτων»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο',
      'Βάση σήμανσης schema και τεχνικού SEO για Erebos',
      'Διαδρομές εγγραφής από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Erebos | Erebos GPS tracking',
    seoDescription: 'Erebos, real-time GPS vehicle tracking platform in Greece and the EU. SEO for “Erebos GPS tracking”.',
    seoTitleEl: 'Erebos | παρακολούθηση οχημάτων',
    seoDescriptionEl: 'Erebos, πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο στην Ελλάδα και στην ΕΕ. SEO για «παρακολούθηση οχημάτων».',
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
      'Naxos Car Rental: Naxos car rental brand for Naxos, SEO for “Naxos car rental”, structured around “Naxos car rental”.',
    summaryEl:
      'Naxos Car Rental: ενοικίαση αυτοκινήτων στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Νάξος».',
            results: [
      'Naxos: pages aimed at “Naxos car rental” and “rent a car Naxos airport”',
      'Differentiation: distinct fleet taxonomy versus sibling Naxos rental brands',
      'Stack: website creation, local SEO, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Car Rental',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rental | rent a car Naxos airport',
    seoDescription: 'Naxos Car Rental, Naxos car rental brand in Naxos. SEO for “Naxos car rental”.',
    seoTitleEl: 'Naxos Car Rental | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rental, ενοικίαση αυτοκινήτων στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος».',
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
      'Naxos Auto Rent: online Naxos auto rent website for Naxos, SEO for “Naxos auto rent”, with technical SEO from day one.',
    summaryEl:
      'Naxos Auto Rent: online ενοικίαση αυτοκινήτων στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος online», με τεχνικό SEO από την πρώτη μέρα.',
            results: [
      'Naxos: pages aimed at “Naxos auto rent” and “Naxos car hire online”',
      'Differentiation: English-first booking UX for international guests',
      'Stack: website creation, local SEO, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος online»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: online ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Auto Rent',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Naxos Auto Rent | Naxos car hire online',
    seoDescription: 'Naxos Auto Rent, online Naxos auto rent in Naxos. SEO for “Naxos auto rent”.',
    seoTitleEl: 'Naxos Auto Rent | ενοικίαση αυτοκινήτου Νάξος online',
    seoDescriptionEl: 'Naxos Auto Rent, online ενοικίαση αυτοκινήτων στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος online».',
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
      'Artemis Rental Sifnos: car and scooter rental for Sifnos, SEO for “rent a car Sifnos”, with trust signals and a clear booking path.',
    summaryEl:
      'Artemis Rental Sifnos: ενοικίαση αυτοκινήτων και scooters στη Σίφνο, SEO για «ενοικίαση αυτοκινήτου Σίφνος», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή κράτησης.',
            results: [
      'Sifnos: pages aimed at “rent a car Sifnos” and “Sifnos scooter rental”',
      'Differentiation: reliable fleet from Apollonia since 1988 with free Kamares port pickup',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για τη Σίφνο με έμφαση σε «ενοικίαση αυτοκινήτου Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: ενοικίαση αυτοκινήτων και scooters',
      'Βάση σήμανσης schema και τεχνικού SEO για Artemis Rental Sifnos',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Artemis Rental Sifnos | rent a car Sifnos',
    seoDescription: 'Artemis Rental Sifnos, car and scooter rental in Sifnos. SEO for “rent a car Sifnos”.',
    seoTitleEl: 'Artemis Rental Sifnos | ενοικίαση αυτοκινήτου Σίφνος',
    seoDescriptionEl: 'Artemis Rental Sifnos, ενοικίαση αυτοκινήτων και scooters στη Σίφνο. SEO για «ενοικίαση αυτοκινήτου Σίφνος».',
    featured: true,
  },
  {
    slug: 'vwanaki',
    name: 'vwanaki',
    url: 'https://vwanaki.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el', 'en'],
    screenshot: '/portfolio/vwanaki.webp',
    summary:
      'vwanaki: mobile cocktail bar for events for Greece, SEO for “mobile cocktail bar Greece”, with trust signals and a clear inquiry path.',
    summaryEl:
      'vwanaki: κινητό cocktail bar για εκδηλώσεις στην Ελλάδα, SEO για «κινητό cocktail bar», με ξεκάθαρα σήματα εμπιστοσύνης και διαδρομή αιτήματος προσφοράς.',
            results: [
      'Greece: pages aimed at “mobile cocktail bar Greece” and “Vwanaki cocktail bar”',
      'Differentiation: a mobile bar that comes to the client for cocktails and events',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για την Ελλάδα με έμφαση σε «κινητό cocktail bar»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις: κινητό cocktail bar για εκδηλώσεις',
      'Βάση σήμανσης schema και τεχνικού SEO για vwanaki',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'vwanaki | mobile cocktail bar Greece',
    seoDescription: 'vwanaki, mobile cocktail bar for events in Greece. SEO for “mobile cocktail bar Greece”.',
    seoTitleEl: 'vwanaki | κινητό cocktail bar',
    seoDescriptionEl: 'vwanaki, κινητό cocktail bar για εκδηλώσεις στην Ελλάδα. SEO για «κινητό cocktail bar».',
    featured: false,
  },
];

export function getPortfolioBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedPortfolio(limit = 12): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured && !p.liveStatus).slice(0, limit);
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
