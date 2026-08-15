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
      'Aggelos Rentals: car rental with port and airport delivery for Piraeus and Paros, SEO for “rent a car Piraeus”, focused on port and airport handoff for ferry and flight arrivals.',
    summaryEl:
      'Aggelos Rentals: ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο στον Πειραιά και Πάρο, SEO για «ενοικίαση αυτοκινήτου Πειραιά», με έμφαση σε παράδοση σε λιμάνι και αεροδρόμιο για αφίξεις με πλοίο ή πτήση.',
    results: [
      'Piraeus and Paros: pages aimed at “rent a car Piraeus” and “airport car delivery Greece”',
      'Differentiation: port and airport handoff for ferry and flight arrivals',
      'Stack: website creation, local SEO, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Πειραιά και Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου Πειραιά»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο',
      'Βάση σήμανσης schema και τεχνικού SEO για Aggelos Rentals',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Aggelos Rentals | rent a car Piraeus',
    seoDescription: 'Aggelos Rentals, car rental with port and airport delivery in Piraeus and Paros. SEO for “rent a car Piraeus”.',
    seoTitleEl: 'Aggelos Rentals | ενοικίαση αυτοκινήτου Πειραιά',
    seoDescriptionEl: 'Aggelos Rentals, ενοικίαση αυτοκινήτων με παράδοση σε λιμάνι και αεροδρόμιο στον Πειραιά και Πάρο. SEO για «ενοικίαση αυτοκινήτου Πειραιά».',
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
      'Antiparos Rent a Car: ενοικίαση αυτοκινήτων και μηχανών στο νησί στην Αντίπαρο, SEO για «ενοικίαση αυτοκινήτου Αντίπαρος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    results: [
      'Antiparos: pages aimed at “rent a car Antiparos” and “Antiparos scooter hire”',
      'Differentiation: ferry-arrival pickup and compact fleet for narrow island roads',
      'Stack: website creation, SEO web design, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Αντίπαρο με έμφαση σε «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων και μηχανών στο νησί',
      'Βάση σήμανσης schema και τεχνικού SEO για Antiparos Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design', 'local-seo'],
                                                    seoTitle: 'Antiparos Rent a Car | rent a car Antiparos',
    seoDescription: 'Antiparos Rent a Car, island car and scooter rental in Antiparos. SEO for “rent a car Antiparos”.',
    seoTitleEl: 'Antiparos Rent a Car | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Antiparos Rent a Car, ενοικίαση αυτοκινήτων και μηχανών στο νησί στην Αντίπαρο. SEO για «ενοικίαση αυτοκινήτου Αντίπαρος».',
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
      'Cyclades Rent a Car: πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά στις Κυκλάδες, SEO για «ενοικίαση αυτοκινήτου Κυκλάδες», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Cyclades islands: pages aimed at “rent a car Cyclades” and “Greek islands car hire”',
      'Differentiation: compare agencies across 24 islands with clear booking paths',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κυκλάδες με έμφαση σε «ενοικίαση αυτοκινήτου Κυκλάδες»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά',
      'Βάση σήμανσης schema και τεχνικού SEO για Cyclades Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Cyclades Rent a Car | rent a car Cyclades',
    seoDescription: 'Cyclades Rent a Car, multi-island car rental comparison platform in Cyclades islands. SEO for “rent a car Cyclades”.',
    seoTitleEl: 'Cyclades Rent a Car | ενοικίαση αυτοκινήτου Κυκλάδες',
    seoDescriptionEl: 'Cyclades Rent a Car, πλατφόρμα σύγκρισης ενοικίασης αυτοκινήτων στα νησιά στις Κυκλάδες. SEO για «ενοικίαση αυτοκινήτου Κυκλάδες».',
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
      'Cretan Ways Rentals: Crete car and scooter rentals for Crete, SEO for “rent a car Crete”, focused on airport-to-resort routes for independent Crete travelers.',
    summaryEl:
      'Cretan Ways Rentals: ενοικίαση αυτοκινήτων και scooters στην Κρήτη στην Κρήτη, SEO για «ενοικίαση αυτοκινήτου Κρήτη», με έμφαση σε διαδρομές από αεροδρόμιο προς θέρετρα για ανεξάρτητους ταξιδιώτες.',
    results: [
      'Crete: pages aimed at “rent a car Crete” and “Heraklion car rental”',
      'Differentiation: airport-to-resort routes for independent Crete travelers',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη με έμφαση σε «ενοικίαση αυτοκινήτου Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων και scooters στην Κρήτη',
      'Βάση σήμανσης schema και τεχνικού SEO για Cretan Ways Rentals',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Cretan Ways Rentals | rent a car Crete',
    seoDescription: 'Cretan Ways Rentals, Crete car and scooter rentals in Crete. SEO for “rent a car Crete”.',
    seoTitleEl: 'Cretan Ways Rentals | ενοικίαση αυτοκινήτου Κρήτη',
    seoDescriptionEl: 'Cretan Ways Rentals, ενοικίαση αυτοκινήτων και scooters στην Κρήτη στην Κρήτη. SEO για «ενοικίαση αυτοκινήτου Κρήτη».',
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
      'Naxos Car Rentals: ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος», με καθαρή διαδρομή προς κράτηση.',
    results: [
      'Naxos: pages aimed at “rent a car Naxos” and “Naxos car rental”',
      'Differentiation: port pickup and beach-day fleet pages for island itineraries',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Car Rentals',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rentals | rent a car Naxos',
    seoDescription: 'Naxos Car Rentals, Naxos car rental in Naxos. SEO for “rent a car Naxos”.',
    seoTitleEl: 'Naxos Car Rentals | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rentals, ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος».',
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
      'Rent a Car Antiparos: τοπική ενοικίαση αυτοκινήτων Αντιπάρου στην Αντίπαρο, SEO για «ενοικίαση αυτοκινήτου Αντίπαρος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Αντίπαρος».',
    results: [
      'Antiparos: pages aimed at “Antiparos rent a car” and “car hire Antiparos Greece”',
      'Differentiation: Greek-first local SEO for Antiparos visitors booking on mobile',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Αντίπαρο με έμφαση σε «ενοικίαση αυτοκινήτου Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις τοπική ενοικίαση αυτοκινήτων Αντιπάρου',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Antiparos',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Antiparos | Antiparos rent a car',
    seoDescription: 'Rent a Car Antiparos, local Antiparos rent-a-car (.gr) in Antiparos. SEO for “Antiparos rent a car”.',
    seoTitleEl: 'Rent a Car Antiparos | ενοικίαση αυτοκινήτου Αντίπαρος',
    seoDescriptionEl: 'Rent a Car Antiparos, τοπική ενοικίαση αυτοκινήτων Αντιπάρου στην Αντίπαρο. SEO για «ενοικίαση αυτοκινήτου Αντίπαρος».',
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
      'Rent a Car in Paros: ενοικίαση αυτοκινήτων στην Πάρο στην Πάρο, SEO για «ενοικίαση αυτοκινήτου στην Πάρο», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Paros: pages aimed at “rent a car in Paros” and “Paros car hire”',
      'Differentiation: conversion-led vehicle cards for summer peak demand',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου στην Πάρο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στην Πάρο',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car in Paros',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car in Paros | Paros car hire',
    seoDescription: 'Rent a Car in Paros, Paros car hire brand in Paros. SEO for “rent a car in Paros”.',
    seoTitleEl: 'Rent a Car in Paros | ενοικίαση αυτοκινήτου στην Πάρο',
    seoDescriptionEl: 'Rent a Car in Paros, ενοικίαση αυτοκινήτων στην Πάρο στην Πάρο. SEO για «ενοικίαση αυτοκινήτου στην Πάρο».',
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
      'Rent a Car Piraeus: ενοικίαση αυτοκινήτων στον Πειραιά στον Πειραιά, SEO για «ενοικίαση αυτοκινήτου Πειραιάς», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Piraeus: pages aimed at “rent a car Piraeus” and “Piraeus port car rental”',
      'Differentiation: ferry-day and neighborhood pickup around the port',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Πειραιά με έμφαση σε «ενοικίαση αυτοκινήτου Πειραιάς»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στον Πειραιά',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Piraeus',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Piraeus | Piraeus port car rental',
    seoDescription: 'Rent a Car Piraeus, Piraeus port city car rental in Piraeus. SEO for “rent a car Piraeus”.',
    seoTitleEl: 'Rent a Car Piraeus | ενοικίαση αυτοκινήτου Πειραιάς',
    seoDescriptionEl: 'Rent a Car Piraeus, ενοικίαση αυτοκινήτων στον Πειραιά στον Πειραιά. SEO για «ενοικίαση αυτοκινήτου Πειραιάς».',
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
      'Athens Rent a Car: ενοικίαση αυτοκινήτων στην Αθήνα στην Αθήνα, SEO για «ενοικίαση αυτοκινήτου Αθήνα», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
    results: [
      'Athens: pages aimed at “rent a car Athens” and “Athens airport car rental”',
      'Differentiation: airport and city delivery for business and tourism',
      'Stack: website creation, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Αθήνα με έμφαση σε «ενοικίαση αυτοκινήτου Αθήνα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στην Αθήνα',
      'Βάση σήμανσης schema και τεχνικού SEO για Athens Rent a Car',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'speed-optimization'],
                                                    seoTitle: 'Athens Rent a Car | rent a car Athens',
    seoDescription: 'Athens Rent a Car, Athens city and airport car rental in Athens. SEO for “rent a car Athens”.',
    seoTitleEl: 'Athens Rent a Car | ενοικίαση αυτοκινήτου Αθήνα',
    seoDescriptionEl: 'Athens Rent a Car, ενοικίαση αυτοκινήτων στην Αθήνα στην Αθήνα. SEO για «ενοικίαση αυτοκινήτου Αθήνα».',
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
      'Rent a Car Paros: ενοικίαση αυτοκινήτων στην Πάρο στην Πάρο, SEO για «ενοικίαση αυτοκινήτου Πάρος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Paros: pages aimed at “rentacar Paros” and “Paros car rental Greece”',
      'Differentiation: local .gr domain for Greek-language Paros searchers',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Πάρο με έμφαση σε «ενοικίαση αυτοκινήτου Πάρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στην Πάρο',
      'Βάση σήμανσης schema και τεχνικού SEO για Rent a Car Paros',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Rent a Car Paros | rentacar Paros',
    seoDescription: 'Rent a Car Paros, Paros car rental (.gr domain) in Paros. SEO for “rentacar Paros”.',
    seoTitleEl: 'Rent a Car Paros | ενοικίαση αυτοκινήτου Πάρος',
    seoDescriptionEl: 'Rent a Car Paros, ενοικίαση αυτοκινήτων στην Πάρο στην Πάρο. SEO για «ενοικίαση αυτοκινήτου Πάρος».',
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
      'Hotels Santorini: κατάλογος και κρατήσεις ξενοδοχείων Σαντορίνης στη Σαντορίνη, SEO για «ξενοδοχεία Σαντορίνη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Santorini: pages aimed at “hotels Santorini” and “Santorini hotel booking”',
      'Differentiation: caldera and beach hotel discovery with direct booking calls to action',
      'Stack: website creation, SEO web design, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σαντορίνη με έμφαση σε «ξενοδοχεία Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κατάλογος και κρατήσεις ξενοδοχείων Σαντορίνης',
      'Βάση σήμανσης schema και τεχνικού SEO για Hotels Santorini',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design', 'content-creation'],
                                                    seoTitle: 'Hotels Santorini | Santorini hotel booking',
    seoDescription: 'Hotels Santorini, Santorini hotels directory and bookings in Santorini. SEO for “hotels Santorini”.',
    seoTitleEl: 'Hotels Santorini | ξενοδοχεία Σαντορίνη',
    seoDescriptionEl: 'Hotels Santorini, κατάλογος και κρατήσεις ξενοδοχείων Σαντορίνης στη Σαντορίνη. SEO για «ξενοδοχεία Σαντορίνη».',
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
      'Hotels Sifnos: ιστοσελίδα για ξενοδοχεία και διαμονή στη Σίφνο στη Σίφνο, SEO για «ξενοδοχεία Σίφνος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Sifnos: pages aimed at “hotels Sifnos” and “Sifnos accommodation”',
      'Differentiation: boutique island stay hubs for travelers researching lodging',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σίφνο με έμφαση σε «ξενοδοχεία Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ξενοδοχεία και διαμονή στη Σίφνο',
      'Βάση σήμανσης schema και τεχνικού SEO για Hotels Sifnos',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Hotels Sifnos | Sifnos accommodation',
    seoDescription: 'Hotels Sifnos, Sifnos hotels and stays in Sifnos. SEO for “hotels Sifnos”.',
    seoTitleEl: 'Hotels Sifnos | ξενοδοχεία Σίφνος',
    seoDescriptionEl: 'Hotels Sifnos, ξενοδοχεία και διαμονή στη Σίφνο στη Σίφνο. SEO για «ξενοδοχεία Σίφνος».',
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
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Onoma Hotel»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ιστοσελίδα boutique ξενοδοχείου',
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
    slug: 'kipos-hotel',
    name: 'Kipos Hotel',
    url: 'https://kipos-hotel.com',
    category: 'hotel',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/kipos-hotel.webp',
    summary:
      'Kipos Hotel: city-centre hotel near the Old Town for Rethymno, SEO for “Kipos Hotel Rethymno”, with a clear path to booking.',
    summaryEl:
      'Kipos Hotel: ξενοδοχείο στο κέντρο κοντά στην Παλιά Πόλη στο Ρέθυμνο, SEO για «Kipos Hotel Ρέθυμνο», με καθαρή διαδρομή προς κράτηση.',
    results: [
      'Rethymno: pages aimed at “Kipos Hotel Rethymno” and “hotel Old Town Rethymno”',
      'Differentiation: city-centre location with easy access to shops, cafes and the Old Town',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ρέθυμνο με έμφαση σε «Kipos Hotel Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ξενοδοχείο στο κέντρο κοντά στην Παλιά Πόλη',
      'Βάση σήμανσης schema και τεχνικού SEO για Kipos Hotel',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Kipos Hotel | Kipos Hotel Rethymno',
    seoDescription: 'Kipos Hotel, city-centre hotel near the Old Town in Rethymno. SEO for “Kipos Hotel Rethymno”.',
    seoTitleEl: 'Kipos Hotel | Kipos Hotel Ρέθυμνο',
    seoDescriptionEl: 'Kipos Hotel, ξενοδοχείο στο κέντρο κοντά στην Παλιά Πόλη στο Ρέθυμνο. SEO για «Kipos Hotel Ρέθυμνο».',
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
      'Eolides Villas: family villas portfolio for Lampini, Rethymno Crete, SEO for “Eolides Villas”, with technical SEO from day one.',
    summaryEl:
      'Eolides Villas: ιστοσελίδα για οικογενειακές βίλες στη Λαμπινή Ρεθύμνου στην Κρήτη, SEO για «Eolides Villas», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Lampini, Rethymno Crete: pages aimed at “Eolides Villas” and “family villas Rethymno”',
      'Differentiation: multi-villa portfolio with inquiry forms for family groups',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Λαμπινή Ρεθύμνου στην Κρήτη με έμφαση σε «Eolides Villas»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις οικογενειακές βίλες',
      'Βάση σήμανσης schema και τεχνικού SEO για Eolides Villas',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Eolides Villas | family villas Rethymno',
    seoDescription: 'Eolides Villas, family villas portfolio in Lampini, Rethymno Crete. SEO for “Eolides Villas”.',
    seoTitleEl: 'Eolides Villas | οικογενειακές βίλες Ρέθυμνο',
    seoDescriptionEl: 'Eolides Villas, οικογενειακές βίλες στη Λαμπινή Ρεθύμνου στην Κρήτη. SEO για «Eolides Villas».',
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
      'Villa Olivia Clara: ιστοσελίδα για πολυτελής ιδιωτική βίλα στην Κρήτη, SEO για «Villa Olivia Clara», με έμφαση σε μετατροπή μέσω φωτογραφίας για αναζητήσεις πολυτελούς βίλας.',
    results: [
      'Crete: pages aimed at “Villa Olivia Clara” and “luxury villa Crete”',
      'Differentiation: photo-led conversion for high-intent luxury villa searches',
      'Stack: website creation, local SEO, ai-visibility',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη με έμφαση σε «Villa Olivia Clara»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πολυτελής ιδιωτική βίλα',
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
    slug: 'villas-katerina',
    name: 'Villas Katerina',
    url: 'https://villaskaterina.com',
    category: 'villa',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/villas-katerina.webp',
    summary:
      'Villas Katerina: villa complex for holiday stays for Crete, SEO for “Villas Katerina”, with trust signals and a clear booking path.',
    summaryEl:
      'Villas Katerina: ιστοσελίδα για συγκρότημα βιλών για διακοπές στην Κρήτη, SEO για «Villas Katerina», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
            results: [
      'Crete: pages aimed at “Villas Katerina” and “villas for rent Crete”',
      'Differentiation: unit comparison pages so guests pick the right villa quickly',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη με έμφαση σε «Villas Katerina»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις συγκρότημα βιλών για διακοπές',
      'Βάση σήμανσης schema και τεχνικού SEO για Villas Katerina',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Villas Katerina | villas for rent Crete',
    seoDescription: 'Villas Katerina, villa complex for holiday stays in Crete. SEO for “Villas Katerina”.',
    seoTitleEl: 'Villas Katerina | βίλες προς ενοικίαση Κρήτη',
    seoDescriptionEl: 'Villas Katerina, συγκρότημα βιλών για διακοπές στην Κρήτη. SEO για «Villas Katerina».',
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
      'Spili Apartments: family holiday apartments website for Spili, Rethymno Crete, SEO for “Spili apartments”, with trust signals and a clear booking path.',
    summaryEl:
      'Spili Apartments: ιστοσελίδα για οικογενειακά διαμερίσματα διακοπών στο Σπήλι Ρεθύμνου στην Κρήτη, SEO για «διαμερίσματα Σπήλι», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
    results: [
      'Spili, Rethymno Crete: pages aimed at “Spili apartments” and “Spili Crete accommodation”',
      'Differentiation: Crete hinterland stay SEO versus coastal competitors',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σπήλι Ρεθύμνου στην Κρήτη με έμφαση σε «διαμερίσματα Σπήλι»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις οικογενειακά διαμερίσματα διακοπών',
      'Βάση σήμανσης schema και τεχνικού SEO για Spili Apartments',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Spili Apartments | Spili Crete accommodation',
    seoDescription: 'Spili Apartments, family holiday apartments in Spili, Rethymno Crete. SEO for “Spili apartments”.',
    seoTitleEl: 'Spili Apartments | διαμερίσματα Σπήλι',
    seoDescriptionEl: 'Spili Apartments, οικογενειακά διαμερίσματα διακοπών στο Σπήλι Ρεθύμνου στην Κρήτη. SEO για «διαμερίσματα Σπήλι».',
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
      'Mykonos Luxury: luxury Mykonos journey and villa concierge for Mykonos, SEO for “Mykonos luxury villa”, with technical SEO from day one.',
    summaryEl:
      'Mykonos Luxury: ιστοσελίδα για πολυτελής διαμονή και concierge στη Μύκονο στη Μύκονο, SEO για «πολυτελής βίλα Μύκονος», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Mykonos: pages aimed at “Mykonos luxury villa” and “Mykonos concierge”',
      'Differentiation: complete luxury journey packaging for international guests',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Μύκονο με έμφαση σε «πολυτελής βίλα Μύκονος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πολυτελής διαμονή και concierge στη Μύκονο',
      'Βάση σήμανσης schema και τεχνικού SEO για Mykonos Luxury',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Mykonos Luxury | Mykonos luxury villa',
    seoDescription: 'Mykonos Luxury, luxury Mykonos journey and villa concierge in Mykonos. SEO for “Mykonos luxury villa”.',
    seoTitleEl: 'Mykonos Luxury | πολυτελής βίλα Μύκονος',
    seoDescriptionEl: 'Mykonos Luxury, πολυτελής διαμονή και concierge στη Μύκονο στη Μύκονο. SEO για «πολυτελής βίλα Μύκονος».',
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
      'Discover Cyclades: ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης Κυκλάδων στις Κυκλάδες, SEO για «οδηγός Κυκλάδες», έτοιμη για οργανική ανάπτυξη στη Κυκλάδες.',
    results: [
      'Cyclades: pages aimed at “Discover Cyclades” and “Cyclades travel guide”',
      'Differentiation: island hub architecture that funnels discovery traffic to commercial pages',
      'Stack: website creation, content creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κυκλάδες με έμφαση σε «οδηγός Κυκλάδες»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης Κυκλάδων',
      'Βάση σήμανσης schema και τεχνικού SEO για Discover Cyclades',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation', 'local-seo'],
                                                    seoTitle: 'Discover Cyclades | Cyclades travel guide',
    seoDescription: 'Discover Cyclades, Cyclades travel guide and discovery platform in Cyclades. SEO for “Discover Cyclades”.',
    seoTitleEl: 'Discover Cyclades | οδηγός Κυκλάδες',
    seoDescriptionEl: 'Discover Cyclades, ταξιδιωτικός οδηγός και πλατφόρμα ανακάλυψης Κυκλάδων στις Κυκλάδες. SEO για «οδηγός Κυκλάδες».',
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
      'Discover Crete: πλατφόρμα ανακάλυψης και εκδρομών Κρήτης στην Κρήτη και Παλαιόχωρα, SEO για «εκδρομές Κρήτη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Crete / Paleochora: pages aimed at “Discover Crete” and “Crete tours”',
      'Differentiation: region silos for west and east Crete travel intents',
      'Stack: website creation, content creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη και Παλαιόχωρα με έμφαση σε «εκδρομές Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πλατφόρμα ανακάλυψης και εκδρομών Κρήτης',
      'Βάση σήμανσης schema και τεχνικού SEO για Discover Crete',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation', 'seo-web-design'],
                                                    seoTitle: 'Discover Crete | Crete tours',
    seoDescription: 'Discover Crete, Crete discovery and tours platform in Crete / Paleochora. SEO for “Discover Crete”.',
    seoTitleEl: 'Discover Crete | εκδρομές Κρήτη',
    seoDescriptionEl: 'Discover Crete, πλατφόρμα ανακάλυψης και εκδρομών Κρήτης στην Κρήτη και Παλαιόχωρα. SEO για «εκδρομές Κρήτη».',
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
      'Way to Crete: ιστοσελίδα για εκδρομές storytelling και εμπειρίες στην Κρήτη στην Κρήτη, SEO για «εμπειρίες Κρήτη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Crete: pages aimed at “Way to Crete” and “Crete experiences”',
      'Differentiation: experience-led booking pages that sell belonging, not just sightseeing',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη με έμφαση σε «εμπειρίες Κρήτη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις εκδρομές storytelling και εμπειρίες στην Κρήτη',
      'Βάση σήμανσης schema και τεχνικού SEO για Way to Crete',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Way to Crete | Crete experiences',
    seoDescription: 'Way to Crete, storytelling tours and Crete experiences in Crete. SEO for “Way to Crete”.',
    seoTitleEl: 'Way to Crete | εμπειρίες Κρήτη',
    seoDescriptionEl: 'Way to Crete, εκδρομές storytelling και εμπειρίες στην Κρήτη στην Κρήτη. SEO για «εμπειρίες Κρήτη».',
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
      'Santorini Daily Tours: ιστοσελίδα για ημερήσιες εκδρομές στη Σαντορίνη στη Σαντορίνη, SEO για «ημερήσιες εκδρομές Σαντορίνη», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Santorini: pages aimed at “Santorini daily tours” and “Santorini boat tour”',
      'Differentiation: product pages for volcano, boat and day-trip intents',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σαντορίνη με έμφαση σε «ημερήσιες εκδρομές Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ημερήσιες εκδρομές στη Σαντορίνη',
      'Βάση σήμανσης schema και τεχνικού SEO για Santorini Daily Tours',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Santorini Daily Tours | Santorini boat tour',
    seoDescription: 'Santorini Daily Tours, daily tour products in Santorini in Santorini. SEO for “Santorini daily tours”.',
    seoTitleEl: 'Santorini Daily Tours | ημερήσιες εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santorini Daily Tours, ημερήσιες εκδρομές στη Σαντορίνη στη Σαντορίνη. SEO για «ημερήσιες εκδρομές Σαντορίνη».',
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
      'Santo Tours Marinakis: ιστοσελίδα για τοπικός tour operator στη Σαντορίνη στη Σαντορίνη, SEO για «εκδρομές Σαντορίνη», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Santorini: pages aimed at “Santo Tours Marinakis” and “Santorini tours”',
      'Differentiation: family operator trust and licensed excursion SEO since 2000',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σαντορίνη με έμφαση σε «εκδρομές Σαντορίνη»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις τοπικός tour operator στη Σαντορίνη',
      'Βάση σήμανσης schema και τεχνικού SEO για Santo Tours Marinakis',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Santo Tours Marinakis | Santorini tours',
    seoDescription: 'Santo Tours Marinakis, local Santorini tour operator in Santorini. SEO for “Santo Tours Marinakis”.',
    seoTitleEl: 'Santo Tours Marinakis | εκδρομές Σαντορίνη',
    seoDescriptionEl: 'Santo Tours Marinakis, τοπικός tour operator στη Σαντορίνη στη Σαντορίνη. SEO για «εκδρομές Σαντορίνη».',
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
      'Quad Safari Rethymno: quad safari adventure tours website for Rethymno, Crete, SEO for “quad safari Rethymno”, focused on adventure activity keywords around Rethymno with book-now paths.',
    summaryEl:
      'Quad Safari Rethymno: ιστοσελίδα για εκδρομές quad safari στο Ρέθυμνο στην Κρήτη, SEO για «quad safari Ρέθυμνο», με έμφαση σε λέξεις-κλειδιά περιπέτειας γύρω από το Ρέθυμνο με διαδρομές κράτησης.',
    results: [
      'Rethymno, Crete: pages aimed at “quad safari Rethymno” and “Crete ATV tour”',
      'Differentiation: adventure activity keywords around Rethymno with book-now paths',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ρέθυμνο στην Κρήτη με έμφαση σε «quad safari Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις εκδρομές quad safari',
      'Βάση σήμανσης schema και τεχνικού SEO για Quad Safari Rethymno',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Quad Safari Rethymno | Crete ATV tour',
    seoDescription: 'Quad Safari Rethymno, quad safari adventure tours in Rethymno, Crete. SEO for “quad safari Rethymno”.',
    seoTitleEl: 'Quad Safari Rethymno | quad safari Ρέθυμνο',
    seoDescriptionEl: 'Quad Safari Rethymno, εκδρομές quad safari στο Ρέθυμνο στην Κρήτη. SEO για «quad safari Ρέθυμνο».',
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
      'Skydream Travel: ταξιδιωτικό γραφείο και πακέτα διακοπών στην Ελλάδα, SEO για «ταξιδιωτικό γραφείο», με ξεκάθαρα σήματα εμπιστοσύνης και επικοινωνία.',
            results: [
      'Greece: pages aimed at “SkyDream Travel” and “travel agency Greece”',
      'Differentiation: package and destination landing pages for commercial travel intent',
      'Stack: website creation, SEO web design, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «ταξιδιωτικό γραφείο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ταξιδιωτικό γραφείο και πακέτα διακοπών',
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
      'Cuba Travel Academy: ακαδημία εκπαίδευσης για ταξίδι στην Κούβα στην Ελλάδα με στόχο ταξίδι στην Κούβα, SEO για «ταξίδι Κούβα», έτοιμη για οργανική ανάπτυξη στη Ελλάδα με στόχο ταξίδι στην Κούβα.',
    results: [
      'Cuba travel (Greek audience): pages aimed at “Cuba Travel Academy” and “Cuba travel guide Greek”',
      'Differentiation: education-led content that answers document and itinerary questions before booking',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με στόχο ταξίδι στην Κούβα με έμφαση σε «ταξίδι Κούβα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ακαδημία εκπαίδευσης για ταξίδι στην Κούβα',
      'Βάση σήμανσης schema και τεχνικού SEO για Cuba Travel Academy',
      'Διαδρομές εγγραφής από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Cuba Travel Academy | Cuba travel guide Greek',
    seoDescription: 'Cuba Travel Academy, Cuba travel education academy in Cuba travel (Greek audience). SEO for “Cuba Travel Academy”.',
    seoTitleEl: 'Cuba Travel Academy | ταξίδι Κούβα',
    seoDescriptionEl: 'Cuba Travel Academy, ακαδημία εκπαίδευσης για ταξίδι στην Κούβα στην Ελλάδα με στόχο ταξίδι στην Κούβα. SEO για «ταξίδι Κούβα».',
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
      'Kaffatos VIP Transfers: VIP chauffeur transfers website for Greece / Athens region, SEO for “VIP transfers Greece”, ready for organic growth in Greece / Athens region.',
    summaryEl:
      'Kaffatos VIP Transfers: ιστοσελίδα για VIP μεταφορές με οδηγό στην Ελλάδα και ευρύτερη Αθήνα, SEO για «VIP μεταφορές», έτοιμη για οργανική ανάπτυξη στη Ελλάδα και ευρύτερη Αθήνα.',
    results: [
      'Greece / Athens region: pages aimed at “VIP transfers Greece” and “private driver Athens”',
      'Differentiation: airport and port VIP route landing pages',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα και ευρύτερη Αθήνα με έμφαση σε «VIP μεταφορές»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις VIP μεταφορές με οδηγό',
      'Βάση σήμανσης schema και τεχνικού SEO για Kaffatos VIP Transfers',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Kaffatos VIP Transfers | VIP transfers Greece',
    seoDescription: 'Kaffatos VIP Transfers, VIP chauffeur transfers in Greece / Athens region. SEO for “VIP transfers Greece”.',
    seoTitleEl: 'Kaffatos VIP Transfers | VIP μεταφορές',
    seoDescriptionEl: 'Kaffatos VIP Transfers, VIP μεταφορές με οδηγό στην Ελλάδα και ευρύτερη Αθήνα. SEO για «VIP μεταφορές».',
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
      'The Ace VIP: Mykonos luxury villas and premium concierge for Mykonos, SEO for “Mykonos VIP villas”, with technical SEO from day one.',
    summaryEl:
      'The Ace VIP: ιστοσελίδα για πολυτελείς βίλες και premium concierge στη Μύκονο στη Μύκονο, SEO για «βίλες Μύκονος VIP», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Mykonos: pages aimed at “Mykonos VIP villas” and “Mykonos concierge”',
      'Differentiation: exclusive villa and concierge packaging for high-spend guests',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Μύκονο με έμφαση σε «βίλες Μύκονος VIP»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πολυτελείς βίλες και premium concierge στη Μύκονο',
      'Βάση σήμανσης schema και τεχνικού SEO για The Ace VIP',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'The Ace VIP | Mykonos VIP villas',
    seoDescription: 'The Ace VIP, Mykonos luxury villas and premium concierge in Mykonos. SEO for “Mykonos VIP villas”.',
    seoTitleEl: 'The Ace VIP | βίλες Μύκονος VIP',
    seoDescriptionEl: 'The Ace VIP, πολυτελείς βίλες και premium concierge στη Μύκονο στη Μύκονο. SEO για «βίλες Μύκονος VIP».',
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
      'Antiparos Transfer: υπηρεσία πολυτελών μεταφορών στο νησί στην Αντίπαρο και Πάρο, SEO για «μεταφορά Αντίπαρος», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
    results: [
      'Antiparos and Paros: pages aimed at “Antiparos transfer” and “Antiparos taxi”',
      'Differentiation: family-run door-to-door transfers since 1994 including weddings',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Αντίπαρο και Πάρο με έμφαση σε «μεταφορά Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις υπηρεσία πολυτελών μεταφορών στο νησί',
      'Βάση σήμανσης schema και τεχνικού SEO για Antiparos Transfer',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Antiparos Transfer | Antiparos taxi',
    seoDescription: 'Antiparos Transfer, luxury island transfer service in Antiparos and Paros. SEO for “Antiparos transfer”.',
    seoTitleEl: 'Antiparos Transfer | μεταφορά Αντίπαρος',
    seoDescriptionEl: 'Antiparos Transfer, υπηρεσία πολυτελών μεταφορών στο νησί στην Αντίπαρο και Πάρο. SEO για «μεταφορά Αντίπαρος».',
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
      'Τοπική αφήγηση για διεθνή αγορά SaaS με έμφαση σε «Navos AI»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πλατφόρμα τεχνητής νοημοσύνης για επιχειρηματικές αποφάσεις',
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
      'Project Shadow AI: ιστοσελίδα για εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα στη διεθνές αγορά e-commerce, SEO για «Project Shadow AI», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'global e-commerce: pages aimed at “Project Shadow AI” and “AI for WordPress stores”',
      'Differentiation: technical brand pages for AI store assistance (scrape was thin)',
      'Stack: website creation, ai-visibility',
    ],
    resultsEl: [
      'Τοπική αφήγηση για διεθνές αγορά e-commerce με έμφαση σε «Project Shadow AI»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα',
      'Βάση σήμανσης schema και τεχνικού SEO για Project Shadow AI',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'ai-visibility'],
                                                    seoTitle: 'Project Shadow AI | AI for WordPress stores',
    seoDescription: 'Project Shadow AI, AI tooling for online stores in global e-commerce. SEO for “Project Shadow AI”.',
    seoTitleEl: 'Project Shadow AI | AI για ηλεκτρονικό κατάστημα',
    seoDescriptionEl: 'Project Shadow AI, εργαλεία τεχνητής νοημοσύνης για ηλεκτρονικά καταστήματα στη διεθνές αγορά e-commerce. SEO για «Project Shadow AI».',
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
      'Rethemnos: Rethymno tourism portal and local guide for Rethymno, SEO for “Rethymno tourism”, with trust signals and a clear inquiry path.',
    summaryEl:
      'Rethemnos: τουριστική πύλη και τοπικός οδηγός Ρεθύμνου στο Ρέθυμνο, SEO για «τουρισμός Ρέθυμνο», με ξεκάθαρα σήματα εμπιστοσύνης και επικοινωνία.',
    results: [
      'Rethymno: pages aimed at “Rethymno tourism” and “visit Rethymno”',
      'Differentiation: city guide hubs that feed commercial tourism and local business pages',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ρέθυμνο με έμφαση σε «τουρισμός Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις τουριστική πύλη και τοπικός οδηγός Ρεθύμνου',
      'Βάση σήμανσης schema και τεχνικού SEO για Rethemnos',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Rethemnos | Rethymno tourism',
    seoDescription: 'Rethemnos, Rethymno tourism portal and local guide in Rethymno. SEO for “Rethymno tourism”.',
    seoTitleEl: 'Rethemnos | τουρισμός Ρέθυμνο',
    seoDescriptionEl: 'Rethemnos, τουριστική πύλη και τοπικός οδηγός Ρεθύμνου στο Ρέθυμνο. SEO για «τουρισμός Ρέθυμνο».',
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
      'Τοπική αφήγηση για Κερατέα Αττικής με έμφαση σε «Κτήμα Ωρίων»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κτήμα γάμων και εκδηλώσεων',
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
      'Τοπική αφήγηση για Φολέγανδρο με έμφαση σε «γάμοι Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις οργάνωση γάμων προορισμού',
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
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «ταξίδι του μέλιτος Ελλάδα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις οργάνωση ταξιδιού του μέλιτος',
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
    slug: 'arion-farm',
    name: 'Arion Farm',
    url: 'https://arionfarm.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/arion-farm.webp',
    summary:
      'Arion Farm: Cretan farm experiences and agritourism website for Crete, SEO for “Arion Farm”, optimized for mobile and local search.',
    summaryEl:
      'Arion Farm: ιστοσελίδα για αγροτικές εμπειρίες και αγροτουρισμός στην Κρήτη στην Κρήτη, SEO για «Arion Farm», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Crete: pages aimed at “Arion Farm” and “Crete farm experiences”',
      'Differentiation: tours, traditional food and participatory farm experiences',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κρήτη με έμφαση σε «Arion Farm»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις αγροτικές εμπειρίες και αγροτουρισμός στην Κρήτη',
      'Βάση σήμανσης schema και τεχνικού SEO για Arion Farm',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Arion Farm | Crete farm experiences',
    seoDescription: 'Arion Farm, Cretan farm experiences and agritourism in Crete. SEO for “Arion Farm”.',
    seoTitleEl: 'Arion Farm | αγροτουρισμός Κρήτη',
    seoDescriptionEl: 'Arion Farm, αγροτικές εμπειρίες και αγροτουρισμός στην Κρήτη στην Κρήτη. SEO για «Arion Farm».',
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
      'Plati Taverna: traditional Greek taverna for Spili, Rethymno, SEO for “Plati Taverna Spili”, with a clear path to reservation.',
    summaryEl:
      'Plati Taverna: παραδοσιακή ελληνική ταβέρνα στο Σπήλι Ρεθύμνου, SEO για «Ταβέρνα Πλατεία Σπήλι», με καθαρή διαδρομή προς κράτηση τραπεζιού.',
    results: [
      'Spili, Rethymno: pages aimed at “Plati Taverna Spili” and “taverna Spili Rethymno”',
      'Differentiation: menu and wine pages with local village storytelling',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σπήλι Ρεθύμνου με έμφαση σε «Ταβέρνα Πλατεία Σπήλι»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις παραδοσιακή ελληνική ταβέρνα',
      'Βάση σήμανσης schema και τεχνικού SEO για Plati Taverna',
      'Διαδρομές κράτησης τραπεζιού από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Plati Taverna | Plati Taverna Spili',
    seoDescription: 'Plati Taverna, traditional Greek taverna in Spili, Rethymno. SEO for “Plati Taverna Spili”.',
    seoTitleEl: 'Plati Taverna | Ταβέρνα Πλατεία Σπήλι',
    seoDescriptionEl: 'Plati Taverna, παραδοσιακή ελληνική ταβέρνα στο Σπήλι Ρεθύμνου. SEO για «Ταβέρνα Πλατεία Σπήλι».',
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
      'Fabrica Cafe: cafe and gathering spot for Spili, Rethymno, SEO for “Fabrica Cafe Spili”, focused on local cafe discovery with menu and visit highlights.',
    summaryEl:
      'Fabrica Cafe: καφέ και χώρος συνάντησης στο Σπήλι Ρεθύμνου, SEO για «Fabrica Cafe Σπήλι», με έμφαση σε τοπική ανακάλυψη καφέ με highlights μενού και επίσκεψης.',
    results: [
      'Spili, Rethymno: pages aimed at “Fabrica Cafe Spili” and “cafe Spili Rethymno”',
      'Differentiation: local cafe discovery with menu and visit highlights',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σπήλι Ρεθύμνου με έμφαση σε «Fabrica Cafe Σπήλι»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις καφέ και χώρος συνάντησης',
      'Βάση σήμανσης schema και τεχνικού SEO για Fabrica Cafe',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Fabrica Cafe | Fabrica Cafe Spili',
    seoDescription: 'Fabrica Cafe, cafe and gathering spot in Spili, Rethymno. SEO for “Fabrica Cafe Spili”.',
    seoTitleEl: 'Fabrica Cafe | Fabrica Cafe Σπήλι',
    seoDescriptionEl: 'Fabrica Cafe, καφέ και χώρος συνάντησης στο Σπήλι Ρεθύμνου. SEO για «Fabrica Cafe Σπήλι».',
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
      'Cocktails in the City: cocktail bar and nightlife brand for Greece, SEO for “Cocktails in the City”, with trust signals and a clear reservation path.',
    summaryEl:
      'Cocktails in the City: cocktail bar και nightlife brand στην Ελλάδα, SEO για «Cocktails in the City», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
    results: [
      'Greece: pages aimed at “Cocktails in the City” and “cocktail bar Greece”',
      'Differentiation: events and signature drinks as content SEO hooks',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Cocktails in the City»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις cocktail bar και nightlife brand',
      'Βάση σήμανσης schema και τεχνικού SEO για Cocktails in the City',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Cocktails in the City | cocktail bar Greece',
    seoDescription: 'Cocktails in the City, cocktail bar and nightlife brand in Greece. SEO for “Cocktails in the City”.',
    seoTitleEl: 'Cocktails in the City | cocktail bar',
    seoDescriptionEl: 'Cocktails in the City, cocktail bar και nightlife brand στην Ελλάδα. SEO για «Cocktails in the City».',
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
      'DailyHost: short-term rental hosting management for Greece, SEO for “DailyHost”, optimized for mobile and local search.',
    summaryEl:
      'DailyHost: διαχείριση βραχυχρόνιας μίσθωσης στην Ελλάδα, SEO για «DailyHost», βελτιστοποιημένη για κινητά και τοπική αναζήτηση.',
    results: [
      'Greece: pages aimed at “DailyHost” and “holiday hosting Greece”',
      'Differentiation: host onboarding and property listing conversion paths',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «DailyHost»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις διαχείριση βραχυχρόνιας μίσθωσης',
      'Βάση σήμανσης schema και τεχνικού SEO για DailyHost',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'DailyHost | holiday hosting Greece',
    seoDescription: 'DailyHost, short-term rental hosting management in Greece. SEO for “DailyHost”.',
    seoTitleEl: 'DailyHost | βραχυχρόνια μίσθωση',
    seoDescriptionEl: 'DailyHost, διαχείριση βραχυχρόνιας μίσθωσης στην Ελλάδα. SEO για «DailyHost».',
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
      'DailyHost EU: EU-facing vacation hosting brand website for European market, SEO for “DailyHost EU”, structured around “DailyHost EU”.',
    summaryEl:
      'DailyHost EU: ευρωπαϊκό brand διαχείρισης καταλυμάτων στην ευρωπαϊκή αγορά, SEO για «DailyHost EU», με δομή περιεχομένου για «DailyHost EU».',
    results: [
      'European market: pages aimed at “DailyHost EU” and “Europe vacation hosting”',
      'Differentiation: multi-market English positioning for EU guests and owners',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για ευρωπαϊκή αγορά με έμφαση σε «DailyHost EU»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ευρωπαϊκό brand διαχείρισης καταλυμάτων',
      'Βάση σήμανσης schema και τεχνικού SEO για DailyHost EU',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'DailyHost EU | Europe vacation hosting',
    seoDescription: 'DailyHost EU, EU-facing vacation hosting brand in European market. SEO for “DailyHost EU”.',
    seoTitleEl: 'DailyHost EU | φιλοξενία καταλυμάτων Ευρώπη',
    seoDescriptionEl: 'DailyHost EU, ευρωπαϊκό brand διαχείρισης καταλυμάτων στην ευρωπαϊκή αγορά. SEO για «DailyHost EU».',
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
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «George Xipolitas»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις επαγγελματικό brand συμβουλευτικής εστίασης',
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
      'Helicro: υπηρεσία ιδιωτικών και αεροδρομικών μεταφορών στο Βέλγιο και διαδρομές προς Ελλάδα, SEO για «Helicro μεταφορές», με έμφαση σε δίγλωσσες κρατήσεις μεταφορών Βέλγιο–Ελλάδα με προγράμματα επιβράβευσης.',
    results: [
      'Belgium and Greece corridors: pages aimed at “Helicro transport” and “Belgium airport transfer”',
      'Differentiation: bilingual Belgium–Greece transfer booking with loyalty offers',
      'Stack: website creation, seo-audits',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Βέλγιο και διαδρομές προς Ελλάδα με έμφαση σε «Helicro μεταφορές»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις υπηρεσία ιδιωτικών και αεροδρομικών μεταφορών',
      'Βάση σήμανσης schema και τεχνικού SEO για Helicro',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-audits'],
                                                    seoTitle: 'Helicro | Helicro transport',
    seoDescription: 'Helicro, airport and private transfer service in Belgium and Greece corridors. SEO for “Helicro transport”.',
    seoTitleEl: 'Helicro | Helicro μεταφορές',
    seoDescriptionEl: 'Helicro, υπηρεσία ιδιωτικών και αεροδρομικών μεταφορών στο Βέλγιο και διαδρομές προς Ελλάδα. SEO για «Helicro μεταφορές».',
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
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Mastorush»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις αγορά αιτημάτων προσφορών από μάστορες',
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
    slug: 'opticore-store',
    name: 'Opticore Store',
    url: 'https://opticorestore.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/opticore-store.webp',
    summary:
      'Opticore Store: optics and eyewear e-shop for Greece, SEO for “Opticore Store”, structured around “Opticore Store”.',
    summaryEl:
      'Opticore Store: ηλεκτρονικό κατάστημα οπτικών στην Ελλάδα, SEO για «αγορά γυαλιών online», με δομή περιεχομένου για «αγορά γυαλιών online».',
    results: [
      'Greece: pages aimed at “Opticore Store” and “buy glasses online Greece”',
      'Differentiation: category SEO for frames and lenses with clear add-to-cart paths',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «αγορά γυαλιών online»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ηλεκτρονικό κατάστημα οπτικών',
      'Βάση σήμανσης schema και τεχνικού SEO για Opticore Store',
      'Διαδρομές παραγγελίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Opticore Store | buy glasses online Greece',
    seoDescription: 'Opticore Store, optics and eyewear e-shop in Greece. SEO for “Opticore Store”.',
    seoTitleEl: 'Opticore Store | αγορά γυαλιών online',
    seoDescriptionEl: 'Opticore Store, ηλεκτρονικό κατάστημα οπτικών στην Ελλάδα. SEO για «αγορά γυαλιών online».',
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
      'Phytomore: plant-based wellness product brand website for Greece / EU, SEO for “Phytomore”, ready for organic growth in Greece / EU.',
    summaryEl:
      'Phytomore: brand φυτικών προϊόντων wellness στην Ελλάδα και ΕΕ, SEO για «Phytomore», έτοιμη για οργανική ανάπτυξη στη Ελλάδα και ΕΕ.',
    results: [
      'Greece / EU: pages aimed at “Phytomore” and “plant based products”',
      'Differentiation: product education content that supports organic discovery',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα και ΕΕ με έμφαση σε «Phytomore»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις brand φυτικών προϊόντων wellness',
      'Βάση σήμανσης schema και τεχνικού SEO για Phytomore',
      'Διαδρομές παραγγελίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Phytomore | plant based products',
    seoDescription: 'Phytomore, plant-based wellness product brand in Greece / EU. SEO for “Phytomore”.',
    seoTitleEl: 'Phytomore | φυτικά προϊόντα',
    seoDescriptionEl: 'Phytomore, brand φυτικών προϊόντων wellness στην Ελλάδα και ΕΕ. SEO για «Phytomore».',
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
      'The Nutri Nest: κλινική διαιτολογία και διατροφολογία στην Ελλάδα, SEO για «κλινική διαιτολόγος», με ξεκάθαρα σήματα εμπιστοσύνης και επικοινωνία.',
    results: [
      'Greece: pages aimed at “clinical dietitian Greece” and “The Nutri Nest”',
      'Differentiation: practitioner authority pages and appointment inquiry paths',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «κλινική διαιτολόγος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κλινική διαιτολογία και διατροφολογία',
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
      'Τοπική αφήγηση για Φολέγανδρο με έμφαση σε «κομμωτήριο Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κομμωτήριο, νύχια και μακιγιάζ',
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
      'Τοπική αφήγηση για Φολέγανδρο με έμφαση σε «ενοικίαση μηχανής Φολέγανδρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση μηχανών και scooters',
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
    slug: 'vape-and-more',
    name: 'Vape and More',
    url: 'https://vapeandmore.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/vape-and-more.webp',
    summary:
      'Vape and More: vape retail e-shop for Greece, SEO for “Vape and More”, with technical SEO from day one.',
    summaryEl:
      'Vape and More: ηλεκτρονικό κατάστημα vape στην Ελλάδα, SEO για «κατάστημα vape», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'Greece: pages aimed at “Vape and More” and “vape shop Greece”',
      'Differentiation: product category architecture for retail search and fast checkout',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «κατάστημα vape»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ηλεκτρονικό κατάστημα vape',
      'Βάση σήμανσης schema και τεχνικού SEO για Vape and More',
      'Διαδρομές παραγγελίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Vape and More | vape shop Greece',
    seoDescription: 'Vape and More, vape retail e-shop in Greece. SEO for “Vape and More”.',
    seoTitleEl: 'Vape and More | κατάστημα vape',
    seoDescriptionEl: 'Vape and More, ηλεκτρονικό κατάστημα vape στην Ελλάδα. SEO για «κατάστημα vape».',
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
      'Ilektronika Tsigara: electronic cigarettes e-shop for Greece, SEO for “electronic cigarettes Greece”, ready for organic growth in Greece.',
    summaryEl:
      'Ilektronika Tsigara: ηλεκτρονικό κατάστημα ηλεκτρονικών τσιγάρων στην Ελλάδα, SEO για «ηλεκτρονικά τσιγάρα», έτοιμη για οργανική ανάπτυξη στη Ελλάδα.',
    results: [
      'Greece: pages aimed at “electronic cigarettes Greece” and “e-cig shop Greece”',
      'Differentiation: Greek commercial category SEO with free-shipping conversion hooks',
      'Stack: website creation, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «ηλεκτρονικά τσιγάρα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ηλεκτρονικό κατάστημα ηλεκτρονικών τσιγάρων',
      'Βάση σήμανσης schema και τεχνικού SEO για Ilektronika Tsigara',
      'Διαδρομές παραγγελίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'speed-optimization'],
                                                    seoTitle: 'Ilektronika Tsigara | electronic cigarettes Greece',
    seoDescription: 'Ilektronika Tsigara, electronic cigarettes e-shop in Greece. SEO for “electronic cigarettes Greece”.',
    seoTitleEl: 'Ilektronika Tsigara | ηλεκτρονικά τσιγάρα',
    seoDescriptionEl: 'Ilektronika Tsigara, ηλεκτρονικό κατάστημα ηλεκτρονικών τσιγάρων στην Ελλάδα. SEO για «ηλεκτρονικά τσιγάρα».',
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
      'Best Pumpkin Near Me: κατάλογος τοπικών pumpkin patches στις ΗΠΑ στις Ηνωμένες Πολιτείες, SEO για «best pumpkin near me», με τεχνικό SEO από την πρώτη μέρα.',
    results: [
      'United States: pages aimed at “best pumpkin near me” and “pumpkin patch near me”',
      'Differentiation: hyperlocal near-me SEO for seasonal autumn demand',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ηνωμένες Πολιτείες με έμφαση σε «best pumpkin near me»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κατάλογος τοπικών pumpkin patches στις ΗΠΑ',
      'Βάση σήμανσης schema και τεχνικού SEO για Best Pumpkin Near Me',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Best Pumpkin Near Me | pumpkin patch near me',
    seoDescription: 'Best Pumpkin Near Me, US local pumpkin patch directory in United States. SEO for “best pumpkin near me”.',
    seoTitleEl: 'Best Pumpkin Near Me | pumpkin patch κοντά μου',
    seoDescriptionEl: 'Best Pumpkin Near Me, κατάλογος τοπικών pumpkin patches στις ΗΠΑ στις Ηνωμένες Πολιτείες. SEO για «best pumpkin near me».',
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
      'Stretcher Stopper: ιστοσελίδα για προϊόν προστασίας τοίχων από φορεία στις ΗΠΑ και χώροι υγείας, SEO για «Stretcher Stopper», έτοιμη για οργανική ανάπτυξη στη ΗΠΑ και χώροι υγείας.',
    results: [
      'United States / healthcare facilities: pages aimed at “Stretcher Stopper” and “medical stretcher safety”',
      'Differentiation: product education pages with direct quote requests',
      'Stack: website creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για ΗΠΑ και χώροι υγείας με έμφαση σε «Stretcher Stopper»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις προϊόν προστασίας τοίχων από φορεία',
      'Βάση σήμανσης schema και τεχνικού SEO για Stretcher Stopper',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation'],
                                                    seoTitle: 'Stretcher Stopper | medical stretcher safety',
    seoDescription: 'Stretcher Stopper, medical stretcher wall-protection product in United States / healthcare facilities. SEO for “Stretcher Stopper”.',
    seoTitleEl: 'Stretcher Stopper | προστασία τοίχων νοσοκομείο',
    seoDescriptionEl: 'Stretcher Stopper, προϊόν προστασίας τοίχων από φορεία στις ΗΠΑ και χώροι υγείας. SEO για «Stretcher Stopper».',
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
      'Antiparos Rooms: ιστοσελίδα για παραθαλάσσια δωμάτια και διαμερίσματα στην Αντίπαρο, SEO για «δωμάτια Αντίπαρος», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
    results: [
      'Antiparos: pages aimed at “Antiparos rooms” and “Antiparos apartments”',
      'Differentiation: direct booking for Cycladic seaside apartments versus OTA dependence',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Αντίπαρο με έμφαση σε «δωμάτια Αντίπαρος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις παραθαλάσσια δωμάτια και διαμερίσματα',
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
    slug: 'travel-sifnos',
    name: 'Travel Sifnos',
    url: 'https://travelsifnos.com',
    category: 'tours',
    markets: ['GR', 'EU'],
    languages: ['en', 'el'],
    screenshot: '/portfolio/travel-sifnos.webp',
    summary:
      'Travel Sifnos: Sifnos travel guide for Sifnos, SEO for “Travel Sifnos”, ready for organic growth in Sifnos.',
    summaryEl:
      'Travel Sifnos: ταξιδιωτικός οδηγός Σίφνου στη Σίφνο, SEO για «οδηγός Σίφνος», έτοιμη για οργανική ανάπτυξη στη Σίφνο.',
    results: [
      'Sifnos: pages aimed at “Travel Sifnos” and “Sifnos travel guide”',
      'Differentiation: local experiences and stay discovery for Sifnos visitors',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σίφνο με έμφαση σε «οδηγός Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ταξιδιωτικός οδηγός Σίφνου',
      'Βάση σήμανσης schema και τεχνικού SEO για Travel Sifnos',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],

    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Travel Sifnos | Sifnos travel guide',
    seoDescription: 'Travel Sifnos, Sifnos travel guide in Sifnos. SEO for “Travel Sifnos”.',
    seoTitleEl: 'Travel Sifnos | οδηγός Σίφνος',
    seoDescriptionEl: 'Travel Sifnos, ταξιδιωτικός οδηγός Σίφνου στη Σίφνο. SEO για «οδηγός Σίφνος».',
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
      'Greece Cyclades: Cyclades travel brand website for Cyclades, Greece, SEO for “Greece Cyclades”, focused on broad Cyclades discovery positioning versus island-specific siblings.',
    summaryEl:
      'Greece Cyclades: ταξιδιωτικό brand Κυκλάδων στις Κυκλάδες, SEO για «Κυκλάδες Ελλάδα», με έμφαση σε ευρεία τοποθέτηση ανακάλυψης Κυκλάδων έναντι εξειδικευμένων siblings.',
    results: [
      'Cyclades, Greece: pages aimed at “Greece Cyclades” and “Cyclades holidays”',
      'Differentiation: broad Cyclades discovery positioning versus island-specific siblings',
      'Stack: website creation, content creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Κυκλάδες με έμφαση σε «Κυκλάδες Ελλάδα»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ταξιδιωτικό brand Κυκλάδων',
      'Βάση σήμανσης schema και τεχνικού SEO για Greece Cyclades',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'content-creation', 'seo-web-design'],
                                                    seoTitle: 'Greece Cyclades | Cyclades holidays',
    seoDescription: 'Greece Cyclades, Cyclades travel brand in Cyclades, Greece. SEO for “Greece Cyclades”.',
    seoTitleEl: 'Greece Cyclades | Κυκλάδες Ελλάδα',
    seoDescriptionEl: 'Greece Cyclades, ταξιδιωτικό brand Κυκλάδων στις Κυκλάδες. SEO για «Κυκλάδες Ελλάδα».',
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
      'Agrocult: pest control, landscaping and agri services for Rethymno, SEO for “Agrocult Rethymno”, with trust signals and a clear inquiry path.',
    summaryEl:
      'Agrocult: απεντόμωση, έργα πρασίνου και αγροτικές υπηρεσίες στο Ρέθυμνο, SEO για «Agrocult Ρέθυμνο», με ξεκάθαρα σήματα εμπιστοσύνης και αίτημα προσφοράς.',
            results: [
      'Rethymno: pages aimed at “Agrocult Rethymno” and “pest control Rethymno”',
      'Differentiation: public health, green projects and agri service landing pages',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ρέθυμνο με έμφαση σε «Agrocult Ρέθυμνο»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις απεντόμωση, έργα πρασίνου και αγροτικές υπηρεσίες',
      'Βάση σήμανσης schema και τεχνικού SEO για Agrocult',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Agrocult | Agrocult Rethymno',
    seoDescription: 'Agrocult, pest control, landscaping and agri services in Rethymno. SEO for “Agrocult Rethymno”.',
    seoTitleEl: 'Agrocult | Agrocult Ρέθυμνο',
    seoDescriptionEl: 'Agrocult, απεντόμωση, έργα πρασίνου και αγροτικές υπηρεσίες στο Ρέθυμνο. SEO για «Agrocult Ρέθυμνο».',
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
      'Erebos: πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο στην Ελλάδα και την ΕΕ, SEO για «παρακολούθηση οχημάτων», με ξεκάθαρα σήματα εμπιστοσύνης και εγγραφή.',
            results: [
      'Greece and the EU: pages aimed at “Erebos GPS tracking” and “vehicle tracking platform”',
      'Differentiation: phone or hardware tracker setup with free start tracking CTA',
      'Stack: website creation, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα και την ΕΕ με έμφαση σε «παρακολούθηση οχημάτων»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο',
      'Βάση σήμανσης schema και τεχνικού SEO για Erebos',
      'Διαδρομές εγγραφής από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'seo-web-design'],
                                                    seoTitle: 'Erebos | Erebos GPS tracking',
    seoDescription: 'Erebos, real-time GPS vehicle tracking platform in Greece and the EU. SEO for “Erebos GPS tracking”.',
    seoTitleEl: 'Erebos | παρακολούθηση οχημάτων',
    seoDescriptionEl: 'Erebos, πλατφόρμα παρακολούθησης οχημάτων σε πραγματικό χρόνο στην Ελλάδα και την ΕΕ. SEO για «παρακολούθηση οχημάτων».',
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
      'Ergo & Art: architecture and spatial design studio for Greece, SEO for “Ergo and Art”, with trust signals and a clear inquiry path.',
    summaryEl:
      'Ergo & Art: στούντιο αρχιτεκτονικής και σχεδιασμού χώρων στην Ελλάδα, SEO για «Ergo and Art», με ξεκάθαρα σήματα εμπιστοσύνης και αίτημα προσφοράς.',
            results: [
      'Greece: pages aimed at “Ergo and Art” and “architecture studio Greece”',
      'Differentiation: human-centred space design portfolio for project inquiries',
      'Stack: website creation, local SEO, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Ergo and Art»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις στούντιο αρχιτεκτονικής και σχεδιασμού χώρων',
      'Βάση σήμανσης schema και τεχνικού SEO για Ergo & Art',
      'Διαδρομές αιτήματος προσφοράς από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
                                                    seoTitle: 'Ergo & Art | Ergo and Art',
    seoDescription: 'Ergo & Art, architecture and spatial design studio in Greece. SEO for “Ergo and Art”.',
    seoTitleEl: 'Ergo & Art | Ergo and Art',
    seoDescriptionEl: 'Ergo & Art, στούντιο αρχιτεκτονικής και σχεδιασμού χώρων στην Ελλάδα. SEO για «Ergo and Art».',
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
      'Fitness Hood Training Center: strength and discipline training center for Greece, SEO for “Fitness Hood”, ready for organic growth in Greece.',
    summaryEl:
      'Fitness Hood Training Center: κέντρο προπόνησης δύναμης και πειθαρχίας στην Ελλάδα, SEO για «Fitness Hood», έτοιμη για οργανική ανάπτυξη στη Ελλάδα.',
            results: [
      'Greece: pages aimed at “Fitness Hood” and “training center Greece”',
      'Differentiation: local gym SEO with class and program pages',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Fitness Hood»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κέντρο προπόνησης δύναμης και πειθαρχίας',
      'Βάση σήμανσης schema και τεχνικού SEO για Fitness Hood Training Center',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Fitness Hood Training Center | Fitness Hood',
    seoDescription: 'Fitness Hood Training Center, strength and discipline training center in Greece. SEO for “Fitness Hood”.',
    seoTitleEl: 'Fitness Hood Training Center | Fitness Hood',
    seoDescriptionEl: 'Fitness Hood Training Center, κέντρο προπόνησης δύναμης και πειθαρχίας στην Ελλάδα. SEO για «Fitness Hood».',
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
      'Huqqa King: hookah lounge brand website for Greece, SEO for “Huqqa King”, with trust signals and a clear visit path.',
    summaryEl:
      'Huqqa King: brand ναργιλέ / lounge στην Ελλάδα, SEO για «Huqqa King», με ξεκάθαρα σήματα εμπιστοσύνης και επικοινωνία.',
            results: [
      'Greece: pages aimed at “Huqqa King” and “hookah lounge Greece”',
      'Differentiation: local nightlife discovery with age-gated brand presence',
      'Stack: website creation, eshop-woocommerce, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Huqqa King»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις brand ναργιλέ / lounge',
      'Βάση σήμανσης schema και τεχνικού SEO για Huqqa King',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'eshop-woocommerce', 'speed-optimization'],
                                                    seoTitle: 'Huqqa King | hookah lounge Greece',
    seoDescription: 'Huqqa King, hookah lounge brand in Greece. SEO for “Huqqa King”.',
    seoTitleEl: 'Huqqa King | ναργιλές',
    seoDescriptionEl: 'Huqqa King, brand ναργιλέ / lounge στην Ελλάδα. SEO για «Huqqa King».',
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
      'Κοινή Λύση: mediation and out-of-court dispute resolution website for Greece, SEO for “mediation Greece”, with a clear path to inquiry.',
    summaryEl:
      'Κοινή Λύση: διαμεσολάβηση και εξωδικαστική επίλυση διαφορών στην Ελλάδα, SEO για «διαμεσολάβηση», με καθαρή διαδρομή προς επικοινωνία.',
            results: [
      'Greece: pages aimed at “mediation Greece” and “Koini Lisi”',
      'Differentiation: confidential mediation service pages for Greek commercial queries',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «διαμεσολάβηση»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις διαμεσολάβηση και εξωδικαστική επίλυση διαφορών',
      'Βάση σήμανσης schema και τεχνικού SEO για Κοινή Λύση',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Κοινή Λύση | mediation Greece',
    seoDescription: 'Κοινή Λύση, mediation and out-of-court dispute resolution in Greece. SEO for “mediation Greece”.',
    seoTitleEl: 'Κοινή Λύση | διαμεσολάβηση',
    seoDescriptionEl: 'Κοινή Λύση, διαμεσολάβηση και εξωδικαστική επίλυση διαφορών στην Ελλάδα. SEO για «διαμεσολάβηση».',
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
      'Logopedia: speech therapy education and practice website for Greece, SEO for “Logopedia”, with technical SEO from day one.',
    summaryEl:
      'Logopedia: λογοθεραπεία και εκπαίδευση στην Ελλάδα, SEO για «λογοθεραπεία», με τεχνικό SEO από την πρώτη μέρα.',
            results: [
      'Greece: pages aimed at “Logopedia” and “speech therapy Greece”',
      'Differentiation: educational authority plus local therapy booking SEO',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «λογοθεραπεία»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις λογοθεραπεία και εκπαίδευση',
      'Βάση σήμανσης schema και τεχνικού SEO για Logopedia',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
                                                    seoTitle: 'Logopedia | speech therapy Greece',
    seoDescription: 'Logopedia, speech therapy education and practice in Greece. SEO for “Logopedia”.',
    seoTitleEl: 'Logopedia | λογοθεραπεία',
    seoDescriptionEl: 'Logopedia, λογοθεραπεία και εκπαίδευση στην Ελλάδα. SEO για «λογοθεραπεία».',
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
      'Naxos Car Rental: ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος», με δομή περιεχομένου για «ενοικίαση αυτοκινήτου Νάξος».',
            results: [
      'Naxos: pages aimed at “Naxos car rental” and “rent a car Naxos airport”',
      'Differentiation: distinct fleet taxonomy versus sibling Naxos rental brands',
      'Stack: website creation, local SEO, SEO web design',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Car Rental',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
                                                    seoTitle: 'Naxos Car Rental | rent a car Naxos airport',
    seoDescription: 'Naxos Car Rental, Naxos car rental brand in Naxos. SEO for “Naxos car rental”.',
    seoTitleEl: 'Naxos Car Rental | ενοικίαση αυτοκινήτου Νάξος',
    seoDescriptionEl: 'Naxos Car Rental, ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος».',
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
      'Naxos Auto Rent: online ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο, SEO για «ενοικίαση αυτοκινήτου Νάξος online», με τεχνικό SEO από την πρώτη μέρα.',
            results: [
      'Naxos: pages aimed at “Naxos auto rent” and “Naxos car hire online”',
      'Differentiation: English-first booking UX for international guests',
      'Stack: website creation, local SEO, speed optimization',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Νάξο με έμφαση σε «ενοικίαση αυτοκινήτου Νάξος online»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις online ενοικίαση αυτοκινήτων στη Νάξο',
      'Βάση σήμανσης schema και τεχνικού SEO για Naxos Auto Rent',
      'Διαδρομές κράτησης από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo', 'speed-optimization'],
                                                    seoTitle: 'Naxos Auto Rent | Naxos car hire online',
    seoDescription: 'Naxos Auto Rent, online Naxos auto rent in Naxos. SEO for “Naxos auto rent”.',
    seoTitleEl: 'Naxos Auto Rent | ενοικίαση αυτοκινήτου Νάξος online',
    seoDescriptionEl: 'Naxos Auto Rent, online ενοικίαση αυτοκινήτων στη Νάξο στη Νάξο. SEO για «ενοικίαση αυτοκινήτου Νάξος online».',
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
      'Politidis Fitness: personal training and online fitness programs website for Greece, SEO for “Politidis Fitness”, with a clear path to inquiry.',
    summaryEl:
      'Politidis Fitness: προσωπική προπόνηση και online προγράμματα fitness στην Ελλάδα, SEO για «Politidis Fitness», με καθαρή διαδρομή προς επικοινωνία.',
            results: [
      'Greece: pages aimed at “Politidis Fitness” and “personal trainer Greece”',
      'Differentiation: trainer authority pages and program SEO for coaching leads',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «Politidis Fitness»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις προσωπική προπόνηση και online προγράμματα fitness',
      'Βάση σήμανσης schema και τεχνικού SEO για Politidis Fitness',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Politidis Fitness | personal trainer Greece',
    seoDescription: 'Politidis Fitness, personal training and online fitness programs in Greece. SEO for “Politidis Fitness”.',
    seoTitleEl: 'Politidis Fitness | personal trainer',
    seoDescriptionEl: 'Politidis Fitness, προσωπική προπόνηση και online προγράμματα fitness στην Ελλάδα. SEO για «Politidis Fitness».',
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
      'Artemis Rental Sifnos: ενοικίαση αυτοκινήτων και scooters στη Σίφνο, SEO για «ενοικίαση αυτοκινήτου Σίφνος», με ξεκάθαρα σήματα εμπιστοσύνης και κράτηση.',
            results: [
      'Sifnos: pages aimed at “rent a car Sifnos” and “Sifnos scooter rental”',
      'Differentiation: reliable fleet from Apollonia since 1988 with free Kamares port pickup',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Σίφνο με έμφαση σε «ενοικίαση αυτοκινήτου Σίφνος»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις ενοικίαση αυτοκινήτων και scooters',
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
    slug: 'smart-dog-training',
    name: 'Smart Dog Training',
    url: 'https://smartdogtraining.gr',
    category: 'other',
    markets: ['GR'],
    languages: ['el'],
    screenshot: '/portfolio/smart-dog-training.webp',
    summary:
      'Smart Dog Training: positive-reinforcement dog training website for Greece, SEO for “Smart Dog Training”, structured around “Smart Dog Training”.',
    summaryEl:
      'Smart Dog Training: εκπαίδευση σκύλων με θετική ενίσχυση στην Ελλάδα, SEO για «εκπαίδευση σκύλων», με δομή περιεχομένου για «εκπαίδευση σκύλων».',
            results: [
      'Greece: pages aimed at “Smart Dog Training” and “dog training Greece”',
      'Differentiation: relationship-first training funnels with program pages',
      'Stack: website creation, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «εκπαίδευση σκύλων»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις εκπαίδευση σκύλων με θετική ενίσχυση',
      'Βάση σήμανσης schema και τεχνικού SEO για Smart Dog Training',
      'Διαδρομές επικοινωνίας από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'content-creation'],
                                                    seoTitle: 'Smart Dog Training | dog training Greece',
    seoDescription: 'Smart Dog Training, positive-reinforcement dog training in Greece. SEO for “Smart Dog Training”.',
    seoTitleEl: 'Smart Dog Training | εκπαίδευση σκύλων',
    seoDescriptionEl: 'Smart Dog Training, εκπαίδευση σκύλων με θετική ενίσχυση στην Ελλάδα. SEO για «εκπαίδευση σκύλων».',
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
      'Taverna Yiannis: family traditional Cretan taverna for Platanes, Rethymno, SEO for “Taverna Yiannis Platanes”, with technical SEO from day one.',
    summaryEl:
      'Taverna Yiannis: οικογενειακή παραδοσιακή κρητική ταβέρνα στους Πλατανές Ρεθύμνου, SEO για «Ταβέρνα Γιάννης Πλατανές», με τεχνικό SEO από την πρώτη μέρα.',
            results: [
      'Platanes, Rethymno: pages aimed at “Taverna Yiannis Platanes” and “traditional Cretan taverna”',
      'Differentiation: local food keywords and Maps-driven visit conversion',
      'Stack: website creation, local SEO',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Πλατανές Ρεθύμνου με έμφαση σε «Ταβέρνα Γιάννης Πλατανές»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις οικογενειακή παραδοσιακή κρητική ταβέρνα',
      'Βάση σήμανσης schema και τεχνικού SEO για Taverna Yiannis',
      'Διαδρομές κράτησης τραπεζιού από κινητό έτοιμες για περιόδους αιχμής',
    ],
    services: ['website-creation', 'local-seo'],
                                                    seoTitle: 'Taverna Yiannis | Taverna Yiannis Platanes',
    seoDescription: 'Taverna Yiannis, family traditional Cretan taverna in Platanes, Rethymno. SEO for “Taverna Yiannis Platanes”.',
    seoTitleEl: 'Taverna Yiannis | Ταβέρνα Γιάννης Πλατανές',
    seoDescriptionEl: 'Taverna Yiannis, οικογενειακή παραδοσιακή κρητική ταβέρνα στους Πλατανές Ρεθύμνου. SEO για «Ταβέρνα Γιάννης Πλατανές».',
    featured: false,
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
      'vwanaki: κινητό cocktail bar για εκδηλώσεις στην Ελλάδα, SEO για «κινητό cocktail bar», με ξεκάθαρα σήματα εμπιστοσύνης και αίτημα προσφοράς.',
            results: [
      'Greece: pages aimed at “mobile cocktail bar Greece” and “Vwanaki cocktail bar”',
      'Differentiation: a mobile bar that comes to the client for cocktails and events',
      'Stack: website creation, local SEO, content creation',
    ],
    resultsEl: [
      'Τοπική αφήγηση για Ελλάδα με έμφαση σε «κινητό cocktail bar»',
      'Αρχιτεκτονική υπηρεσιών και προϊόντων για εμπορικές προθέσεις κινητό cocktail bar για εκδηλώσεις',
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
