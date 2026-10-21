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
  liveStatus?: 'offline' | 'unverified';
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
  'travel-ai': { label: 'AI & software', labelEl: 'Λογισμικό & AI' },
  restaurant: { label: 'Restaurants & cafes', labelEl: 'Εστιατόρια' },
  other: { label: 'Other', labelEl: 'Άλλα' },
};

export const portfolioProjects: PortfolioProject[] = [
  {
    "slug": "aggelos-rentals",
    "name": "Aggelos Rentals",
    "url": "https://aggelosrentals.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/aggelos-rentals.webp",
    "summary": "Daily and monthly car rental in Piraeus, with delivery to the port and Athens airport.",
    "summaryEl": "Ημερήσια και μηνιαία ενοικίαση αυτοκινήτου στον Πειραιά, με παράδοση στο λιμάνι και στο αεροδρόμιο Αθηνών.",
    "results": [
      "Daily and monthly rentals",
      "Port and airport delivery",
      "24-hour customer support"
    ],
    "resultsEl": [
      "Ημερήσιες και μηνιαίες μισθώσεις",
      "Παράδοση σε λιμάνι και αεροδρόμιο",
      "Υποστήριξη όλο το εικοσιτετράωρο"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "speed-optimization"
    ],
    "seoTitle": "Aggelos Rentals | Website project",
    "seoDescription": "Daily and monthly car rental in Piraeus, with delivery to the port and Athens airport.",
    "seoTitleEl": "Aggelos Rentals | Παρουσίαση έργου",
    "seoDescriptionEl": "Ημερήσια και μηνιαία ενοικίαση αυτοκινήτου στον Πειραιά, με παράδοση στο λιμάνι και στο αεροδρόμιο Αθηνών.",
    "featured": true
  },
  {
    "slug": "antiparos-rentacar",
    "name": "Antiparos Rent a Car",
    "url": "https://antiparosrentacar.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/antiparos-rentacar.webp",
    "summary": "An Antiparos rental project presenting cars and scooters for exploring the island.",
    "summaryEl": "Έργο ενοικίασης αυτοκινήτων και σκούτερ στην Αντίπαρο, για τις καθημερινές μετακινήσεις στο νησί.",
    "results": [
      "Island car rentals",
      "Scooter options",
      "Rental enquiries"
    ],
    "resultsEl": [
      "Ενοικιάσεις αυτοκινήτων στο νησί",
      "Επιλογές σκούτερ",
      "Αιτήματα ενοικίασης"
    ],
    "services": [
      "website-creation",
      "web-design",
      "local-seo"
    ],
    "seoTitle": "Antiparos Rent a Car | Website project",
    "seoDescription": "An Antiparos rental project presenting cars and scooters for exploring the island.",
    "seoTitleEl": "Antiparos Rent a Car | Παρουσίαση έργου",
    "seoDescriptionEl": "Έργο ενοικίασης αυτοκινήτων και σκούτερ στην Αντίπαρο, για τις καθημερινές μετακινήσεις στο νησί.",
    "featured": true,
    "liveStatus": "unverified"
  },
  {
    "slug": "cyclades-rentacar",
    "name": "Cyclades Rent a Car",
    "url": "https://cycladesrentacar.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/cyclades-rentacar.webp",
    "summary": "A directory of local vehicle-rental partners across the Cyclades, from Discover Cyclades.",
    "summaryEl": "Κατάλογος τοπικών επιχειρήσεων ενοικίασης οχημάτων στις Κυκλάδες, από το Discover Cyclades.",
    "results": [
      "Browse by island and vehicle",
      "Local rental partners",
      "Direct rental arrangements"
    ],
    "resultsEl": [
      "Αναζήτηση ανά νησί και τύπο οχήματος",
      "Τοπικές επιχειρήσεις ενοικίασης",
      "Απευθείας συνεννόηση για την ενοικίαση"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "content-creation"
    ],
    "seoTitle": "Cyclades Rent a Car | Website project",
    "seoDescription": "A directory of local vehicle-rental partners across the Cyclades, from Discover Cyclades.",
    "seoTitleEl": "Cyclades Rent a Car | Παρουσίαση έργου",
    "seoDescriptionEl": "Κατάλογος τοπικών επιχειρήσεων ενοικίασης οχημάτων στις Κυκλάδες, από το Discover Cyclades.",
    "featured": true
  },
  {
    "slug": "naxos-carrentals",
    "name": "Naxos Car Rentals",
    "url": "https://naxos-carrentals.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/naxos-carrentals.webp",
    "summary": "A local Naxos car-rental website with compact, automatic, family and four-wheel-drive vehicles.",
    "summaryEl": "Ιστοσελίδα τοπικής ενοικίασης αυτοκινήτων στη Νάξο, με μικρά, αυτόματα, οικογενειακά οχήματα και τετρακίνητα.",
    "results": [
      "Vehicle categories",
      "Online booking",
      "Local Naxos team"
    ],
    "resultsEl": [
      "Κατηγορίες οχημάτων",
      "Ηλεκτρονική κράτηση",
      "Τοπική ομάδα στη Νάξο"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "Naxos Car Rentals | Website project",
    "seoDescription": "A local Naxos car-rental website with compact, automatic, family and four-wheel-drive vehicles.",
    "seoTitleEl": "Naxos Car Rentals | Παρουσίαση έργου",
    "seoDescriptionEl": "Ιστοσελίδα τοπικής ενοικίασης αυτοκινήτων στη Νάξο, με μικρά, αυτόματα, οικογενειακά οχήματα και τετρακίνητα.",
    "featured": true
  },
  {
    "slug": "rentacar-antiparos-gr",
    "name": "AGGELOS Rentals · Paros & Antiparos",
    "url": "https://rentacarantiparos.gr",
    "category": "rent-a-car",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/rentacar-antiparos-gr.webp",
    "summary": "AGGELOS Rentals serves Paros and Antiparos with a local car-rental offer.",
    "summaryEl": "Η AGGELOS Rentals εξυπηρετεί την Πάρο και την Αντίπαρο με ενοικιάσεις αυτοκινήτων.",
    "results": [
      "Paros and Antiparos coverage",
      "Vehicle selection",
      "Rental contact"
    ],
    "resultsEl": [
      "Εξυπηρέτηση Πάρου και Αντιπάρου",
      "Επιλογή οχήματος",
      "Επικοινωνία για ενοικίαση"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "AGGELOS Rentals · Paros & Antiparos | Website project",
    "seoDescription": "AGGELOS Rentals serves Paros and Antiparos with a local car-rental offer.",
    "seoTitleEl": "AGGELOS Rentals · Paros & Antiparos | Παρουσίαση έργου",
    "seoDescriptionEl": "Η AGGELOS Rentals εξυπηρετεί την Πάρο και την Αντίπαρο με ενοικιάσεις αυτοκινήτων.",
    "featured": false
  },
  {
    "slug": "rentacar-in-paros",
    "name": "Rent a Car in Paros",
    "url": "https://rentacarinparos.gr",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/rentacar-in-paros.webp",
    "summary": "A Greek-language guide to car rental in Paros, with port and airport information and a booking route through Discover Cyclades.",
    "summaryEl": "Ελληνικός οδηγός ενοικίασης αυτοκινήτου στην Πάρο, με πληροφορίες για λιμάνι και αεροδρόμιο και δυνατότητα κράτησης μέσω Discover Cyclades.",
    "results": [
      "Paros pickup information",
      "Rental advice",
      "Booking access"
    ],
    "resultsEl": [
      "Πληροφορίες παραλαβής στην Πάρο",
      "Συμβουλές ενοικίασης",
      "Πρόσβαση στην κράτηση"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Rent a Car in Paros | Website project",
    "seoDescription": "A Greek-language guide to car rental in Paros, with port and airport information and a booking route through Discover Cyclades.",
    "seoTitleEl": "Rent a Car in Paros | Παρουσίαση έργου",
    "seoDescriptionEl": "Ελληνικός οδηγός ενοικίασης αυτοκινήτου στην Πάρο, με πληροφορίες για λιμάνι και αεροδρόμιο και δυνατότητα κράτησης μέσω Discover Cyclades.",
    "featured": false
  },
  {
    "slug": "rentacar-piraeus",
    "name": "GetCarPiraeus",
    "url": "https://rentacarpiraeus.gr",
    "category": "rent-a-car",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/rentacar-piraeus.webp",
    "summary": "GetCarPiraeus offers cars, vans, motorcycles and scooters around Piraeus and its ferry port.",
    "summaryEl": "Το GetCarPiraeus προσφέρει αυτοκίνητα, βαν, μοτοσικλέτες και σκούτερ στον Πειραιά και στο λιμάνι.",
    "results": [
      "Port gates E1–E12",
      "Cars, vans and two-wheelers",
      "Piraeus and neighbouring areas"
    ],
    "resultsEl": [
      "Πύλες λιμανιού Ε1–Ε12",
      "Αυτοκίνητα, βαν και δίκυκλα",
      "Πειραιάς και γειτονικές περιοχές"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "GetCarPiraeus | Website project",
    "seoDescription": "GetCarPiraeus offers cars, vans, motorcycles and scooters around Piraeus and its ferry port.",
    "seoTitleEl": "GetCarPiraeus | Παρουσίαση έργου",
    "seoDescriptionEl": "Το GetCarPiraeus προσφέρει αυτοκίνητα, βαν, μοτοσικλέτες και σκούτερ στον Πειραιά και στο λιμάνι.",
    "featured": false
  },
  {
    "slug": "athens-rentacar",
    "name": "Athens Rent a Car",
    "url": "https://athensrentacar.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/athens-rentacar.webp",
    "summary": "An Athens car-rental project focused on city and airport arrivals.",
    "summaryEl": "Έργο ενοικίασης αυτοκινήτων στην Αθήνα, με έμφαση στις μετακινήσεις στην πόλη και στις αφίξεις από το αεροδρόμιο.",
    "results": [
      "Athens car rental",
      "Airport arrival planning",
      "Rental enquiries"
    ],
    "resultsEl": [
      "Ενοικίαση αυτοκινήτου στην Αθήνα",
      "Οργάνωση άφιξης από το αεροδρόμιο",
      "Αιτήματα ενοικίασης"
    ],
    "services": [
      "website-creation",
      "speed-optimization"
    ],
    "seoTitle": "Athens Rent a Car | Website project",
    "seoDescription": "An Athens car-rental project focused on city and airport arrivals.",
    "seoTitleEl": "Athens Rent a Car | Παρουσίαση έργου",
    "seoDescriptionEl": "Έργο ενοικίασης αυτοκινήτων στην Αθήνα, με έμφαση στις μετακινήσεις στην πόλη και στις αφίξεις από το αεροδρόμιο.",
    "featured": false,
    "liveStatus": "unverified"
  },
  {
    "slug": "rentacar-paros-gr",
    "name": "Rent a Car Paros",
    "url": "https://rentacar-paros.gr",
    "category": "rent-a-car",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/rentacar-paros-gr.webp",
    "summary": "A Paros car-rental project for travellers planning their island transport.",
    "summaryEl": "Έργο ενοικίασης αυτοκινήτων στην Πάρο, για ταξιδιώτες που οργανώνουν τις μετακινήσεις τους στο νησί.",
    "results": [
      "Paros rental information",
      "Island transport",
      "Contact for availability"
    ],
    "resultsEl": [
      "Πληροφορίες ενοικίασης στην Πάρο",
      "Μετακινήσεις στο νησί",
      "Επικοινωνία για διαθεσιμότητα"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Rent a Car Paros | Website project",
    "seoDescription": "A Paros car-rental project for travellers planning their island transport.",
    "seoTitleEl": "Rent a Car Paros | Παρουσίαση έργου",
    "seoDescriptionEl": "Έργο ενοικίασης αυτοκινήτων στην Πάρο, για ταξιδιώτες που οργανώνουν τις μετακινήσεις τους στο νησί.",
    "featured": false,
    "liveStatus": "unverified"
  },
  {
    "slug": "hotels-santorini",
    "name": "Hotels Santorini",
    "url": "https://hotelssantorini.gr",
    "category": "hotel",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/hotels-santorini.webp",
    "summary": "A Santorini hotel and area guide combining accommodation discovery with practical travel information.",
    "summaryEl": "Οδηγός ξενοδοχείων και περιοχών της Σαντορίνης, που συνδυάζει την αναζήτηση διαμονής με πρακτικές ταξιδιωτικές πληροφορίες.",
    "results": [
      "Hotel discovery",
      "Area guides",
      "Practical travel and safety information"
    ],
    "resultsEl": [
      "Αναζήτηση ξενοδοχείων",
      "Οδηγοί περιοχών",
      "Πρακτικές πληροφορίες ταξιδιού και ασφάλειας"
    ],
    "services": [
      "website-creation",
      "web-design",
      "content-creation"
    ],
    "seoTitle": "Hotels Santorini | Website project",
    "seoDescription": "A Santorini hotel and area guide combining accommodation discovery with practical travel information.",
    "seoTitleEl": "Hotels Santorini | Παρουσίαση έργου",
    "seoDescriptionEl": "Οδηγός ξενοδοχείων και περιοχών της Σαντορίνης, που συνδυάζει την αναζήτηση διαμονής με πρακτικές ταξιδιωτικές πληροφορίες.",
    "featured": true
  },
  {
    "slug": "hotels-sifnos",
    "name": "Hotels Sifnos",
    "url": "https://hotelssifnos.com",
    "category": "hotel",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/hotels-sifnos.webp",
    "summary": "A curated directory of Sifnos hotels and villas, organised by area and style with direct contact to local partners.",
    "summaryEl": "Επιλεγμένος κατάλογος ξενοδοχείων και βιλών στη Σίφνο, ανά περιοχή και ύφος διαμονής, με απευθείας επικοινωνία με τους συνεργάτες.",
    "results": [
      "Accommodation by area",
      "Hotels and villas",
      "Direct partner contact"
    ],
    "resultsEl": [
      "Καταλύματα ανά περιοχή",
      "Ξενοδοχεία και βίλες",
      "Απευθείας επικοινωνία με τους συνεργάτες"
    ],
    "services": [
      "website-creation",
      "content-creation"
    ],
    "seoTitle": "Hotels Sifnos | Website project",
    "seoDescription": "A curated directory of Sifnos hotels and villas, organised by area and style with direct contact to local partners.",
    "seoTitleEl": "Hotels Sifnos | Παρουσίαση έργου",
    "seoDescriptionEl": "Επιλεγμένος κατάλογος ξενοδοχείων και βιλών στη Σίφνο, ανά περιοχή και ύφος διαμονής, με απευθείας επικοινωνία με τους συνεργάτες.",
    "featured": true
  },
  {
    "slug": "onoma-hotel",
    "name": "ONOMA Hotel",
    "url": "https://onomahotel.com",
    "category": "hotel",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/onoma-hotel.webp",
    "summary": "A five-star hotel in Thessaloniki built around personalised stays, with a rooftop pool and bar, dining and playful shared spaces.",
    "summaryEl": "Πεντάστερο ξενοδοχείο στη Θεσσαλονίκη με εξατομικευμένη εμπειρία διαμονής, πισίνα και μπαρ στην ταράτσα, εστιατόριο και χώρους ψυχαγωγίας.",
    "results": [
      "Personalised rooms",
      "Rooftop pool and bar",
      "Direct hotel booking"
    ],
    "resultsEl": [
      "Δωμάτια με προσωπικό χαρακτήρα",
      "Πισίνα και μπαρ στην ταράτσα",
      "Απευθείας κράτηση στο ξενοδοχείο"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "ONOMA Hotel | Website project",
    "seoDescription": "A five-star hotel in Thessaloniki built around personalised stays, with a rooftop pool and bar, dining and playful shared spaces.",
    "seoTitleEl": "ONOMA Hotel | Παρουσίαση έργου",
    "seoDescriptionEl": "Πεντάστερο ξενοδοχείο στη Θεσσαλονίκη με εξατομικευμένη εμπειρία διαμονής, πισίνα και μπαρ στην ταράτσα, εστιατόριο και χώρους ψυχαγωγίας.",
    "featured": true
  },
  {
    "slug": "villa-olivia-clara",
    "name": "Villa Olivia Clara",
    "url": "https://villaoliviaclara.com",
    "category": "villa",
    "markets": [
      "GR",
      "EU",
      "UK"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/villa-olivia-clara.webp",
    "summary": "A family villa above Platis Gialos on Sifnos, with four bedrooms, a private pool and direct contact with its owner.",
    "summaryEl": "Οικογενειακή βίλα πάνω από τον Πλατύ Γιαλό της Σίφνου, με τέσσερα υπνοδωμάτια, ιδιωτική πισίνα και απευθείας επικοινωνία με την ιδιοκτήτρια.",
    "results": [
      "Four bedrooms, up to eight guests",
      "Private pool",
      "Platis Gialos, Sifnos"
    ],
    "resultsEl": [
      "Τέσσερα υπνοδωμάτια, έως οκτώ επισκέπτες",
      "Ιδιωτική πισίνα",
      "Πλατύς Γιαλός Σίφνου"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "ai-visibility"
    ],
    "seoTitle": "Villa Olivia Clara | Website project",
    "seoDescription": "A family villa above Platis Gialos on Sifnos, with four bedrooms, a private pool and direct contact with its owner.",
    "seoTitleEl": "Villa Olivia Clara | Παρουσίαση έργου",
    "seoDescriptionEl": "Οικογενειακή βίλα πάνω από τον Πλατύ Γιαλό της Σίφνου, με τέσσερα υπνοδωμάτια, ιδιωτική πισίνα και απευθείας επικοινωνία με την ιδιοκτήτρια.",
    "featured": true
  },
  {
    "slug": "mykonos-luxury",
    "name": "Mykonos Luxury",
    "url": "https://mykonos.luxury",
    "category": "villa",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/mykonos-luxury.webp",
    "summary": "A Mykonos concierge platform for private villas, yachts and tailored VIP experiences.",
    "summaryEl": "Υπηρεσίες προσωπικής εξυπηρέτησης στη Μύκονο, με ιδιωτικές βίλες, γιοτ και εξατομικευμένες εμπειρίες.",
    "results": [
      "Private villa collection",
      "Yacht experiences",
      "24-hour concierge service"
    ],
    "resultsEl": [
      "Συλλογή ιδιωτικών βιλών",
      "Εμπειρίες με γιοτ",
      "Προσωπική εξυπηρέτηση όλο το εικοσιτετράωρο"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "Mykonos Luxury | Website project",
    "seoDescription": "A Mykonos concierge platform for private villas, yachts and tailored VIP experiences.",
    "seoTitleEl": "Mykonos Luxury | Παρουσίαση έργου",
    "seoDescriptionEl": "Υπηρεσίες προσωπικής εξυπηρέτησης στη Μύκονο, με ιδιωτικές βίλες, γιοτ και εξατομικευμένες εμπειρίες.",
    "featured": true
  },
  {
    "slug": "discover-cyclades",
    "name": "Discover Cyclades",
    "url": "https://discovercyclades.gr",
    "category": "tours",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/discover-cyclades.webp",
    "summary": "A Cyclades travel platform bringing island guides, ferry tracking, accommodation and activities into one planning experience.",
    "summaryEl": "Ταξιδιωτική πλατφόρμα για τις Κυκλάδες, με οδηγούς νησιών, παρακολούθηση πλοίων, διαμονή και δραστηριότητες.",
    "results": [
      "Guides for 24 islands",
      "Ferry routes and live tracking",
      "Touristas AI travel assistant"
    ],
    "resultsEl": [
      "Οδηγοί για 24 νησιά",
      "Δρομολόγια και ζωντανή παρακολούθηση πλοίων",
      "Ταξιδιωτικός βοηθός Touristas AI"
    ],
    "services": [
      "website-creation",
      "content-creation",
      "local-seo"
    ],
    "seoTitle": "Discover Cyclades | Website project",
    "seoDescription": "A Cyclades travel platform bringing island guides, ferry tracking, accommodation and activities into one planning experience.",
    "seoTitleEl": "Discover Cyclades | Παρουσίαση έργου",
    "seoDescriptionEl": "Ταξιδιωτική πλατφόρμα για τις Κυκλάδες, με οδηγούς νησιών, παρακολούθηση πλοίων, διαμονή και δραστηριότητες.",
    "featured": true
  },
  {
    "slug": "discover-crete",
    "name": "Discover Crete",
    "url": "https://discover-crete.com",
    "category": "tours",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/discover-crete.webp",
    "summary": "An independent Crete travel guide covering beaches, cities, stays, transport and suggested itineraries.",
    "summaryEl": "Ανεξάρτητος ταξιδιωτικός οδηγός Κρήτης για παραλίες, πόλεις, διαμονή, μετακινήσεις και προτεινόμενες διαδρομές.",
    "results": [
      "Beach and city guides",
      "Ferry, flight and car information",
      "Multi-day itineraries"
    ],
    "resultsEl": [
      "Οδηγοί για παραλίες και πόλεις",
      "Πληροφορίες για πλοία, πτήσεις και αυτοκίνητα",
      "Πολυήμερες διαδρομές"
    ],
    "services": [
      "website-creation",
      "content-creation",
      "web-design"
    ],
    "seoTitle": "Discover Crete | Website project",
    "seoDescription": "An independent Crete travel guide covering beaches, cities, stays, transport and suggested itineraries.",
    "seoTitleEl": "Discover Crete | Παρουσίαση έργου",
    "seoDescriptionEl": "Ανεξάρτητος ταξιδιωτικός οδηγός Κρήτης για παραλίες, πόλεις, διαμονή, μετακινήσεις και προτεινόμενες διαδρομές.",
    "featured": true
  },
  {
    "slug": "way-to-crete",
    "name": "Way to Crete",
    "url": "https://waytocrete.com",
    "category": "tours",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/way-to-crete.webp",
    "summary": "An archived Crete travel project centred on storytelling, local tours and experiences.",
    "summaryEl": "Παλαιότερο ταξιδιωτικό έργο για την Κρήτη, με ιστορίες του τόπου, εκδρομές και τοπικές εμπειρίες.",
    "results": [
      "Crete destination stories",
      "Local experiences",
      "Historical project showcase"
    ],
    "resultsEl": [
      "Ιστορίες από την Κρήτη",
      "Τοπικές εμπειρίες",
      "Παρουσίαση παλαιότερου έργου"
    ],
    "services": [
      "website-creation",
      "content-creation"
    ],
    "seoTitle": "Way to Crete | Website project",
    "seoDescription": "An archived Crete travel project centred on storytelling, local tours and experiences.",
    "seoTitleEl": "Way to Crete | Παρουσίαση έργου",
    "seoDescriptionEl": "Παλαιότερο ταξιδιωτικό έργο για την Κρήτη, με ιστορίες του τόπου, εκδρομές και τοπικές εμπειρίες.",
    "featured": false,
    "liveStatus": "offline"
  },
  {
    "slug": "santorini-daily-tours",
    "name": "Santorini Daily Tours",
    "url": "https://santorinidailytours.com",
    "category": "tours",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/santorini-daily-tours.webp",
    "summary": "A family-run Santorini agency based in Fira, offering day tours, cruises and transfers since 2000.",
    "summaryEl": "Οικογενειακό πρακτορείο στα Φηρά της Σαντορίνης, με εκδρομές, κρουαζιέρες και μεταφορές από το 2000.",
    "results": [
      "Volcano and catamaran trips",
      "Private island tours",
      "Local transfers"
    ],
    "resultsEl": [
      "Εκδρομές στο ηφαίστειο και με καταμαράν",
      "Ιδιωτικές περιηγήσεις στο νησί",
      "Τοπικές μεταφορές"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Santorini Daily Tours | Website project",
    "seoDescription": "A family-run Santorini agency based in Fira, offering day tours, cruises and transfers since 2000.",
    "seoTitleEl": "Santorini Daily Tours | Παρουσίαση έργου",
    "seoDescriptionEl": "Οικογενειακό πρακτορείο στα Φηρά της Σαντορίνης, με εκδρομές, κρουαζιέρες και μεταφορές από το 2000.",
    "featured": true
  },
  {
    "slug": "santo-tours-marinakis",
    "name": "Marinakis Tours",
    "url": "https://santotoursmarinakis.com",
    "category": "tours",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/santo-tours-marinakis.webp",
    "summary": "Marinakis Tours offers private tours, wine experiences, catamaran trips and transfers on Santorini.",
    "summaryEl": "Η Marinakis Tours προσφέρει ιδιωτικές περιηγήσεις, επισκέψεις σε οινοποιεία, εκδρομές με καταμαράν και μεταφορές στη Σαντορίνη.",
    "results": [
      "Family agency since 2000",
      "Island and wine tours",
      "Private transfers"
    ],
    "resultsEl": [
      "Οικογενειακό πρακτορείο από το 2000",
      "Περιηγήσεις και επισκέψεις σε οινοποιεία",
      "Ιδιωτικές μεταφορές"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "Marinakis Tours | Website project",
    "seoDescription": "Marinakis Tours offers private tours, wine experiences, catamaran trips and transfers on Santorini.",
    "seoTitleEl": "Marinakis Tours | Παρουσίαση έργου",
    "seoDescriptionEl": "Η Marinakis Tours προσφέρει ιδιωτικές περιηγήσεις, επισκέψεις σε οινοποιεία, εκδρομές με καταμαράν και μεταφορές στη Σαντορίνη.",
    "featured": false
  },
  {
    "slug": "skydream-travel",
    "name": "Skydream Travel",
    "url": "https://www.skydream.travel",
    "relatedUrls": [
      "https://www.skydream.gr"
    ],
    "category": "tours",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/skydream-travel.webp",
    "summary": "An Athens travel design studio creating bespoke trips around the traveller’s interests.",
    "summaryEl": "Ταξιδιωτικό γραφείο στην Αθήνα που σχεδιάζει εξατομικευμένα ταξίδια με βάση τα ενδιαφέροντα του ταξιδιώτη.",
    "results": [
      "Tailored travel planning",
      "Destination inspiration",
      "Personal travel consultation"
    ],
    "resultsEl": [
      "Εξατομικευμένος σχεδιασμός ταξιδιού",
      "Έμπνευση για προορισμούς",
      "Προσωπική ταξιδιωτική συμβουλή"
    ],
    "services": [
      "website-creation",
      "web-design",
      "content-creation"
    ],
    "seoTitle": "Skydream Travel | Website project",
    "seoDescription": "An Athens travel design studio creating bespoke trips around the traveller’s interests.",
    "seoTitleEl": "Skydream Travel | Παρουσίαση έργου",
    "seoDescriptionEl": "Ταξιδιωτικό γραφείο στην Αθήνα που σχεδιάζει εξατομικευμένα ταξίδια με βάση τα ενδιαφέροντα του ταξιδιώτη.",
    "featured": true
  },
  {
    "slug": "cuba-travel-academy",
    "name": "Cuba Travel Academy",
    "url": "https://www.cubatravel.academy",
    "category": "tours",
    "markets": [
      "US",
      "EU"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/cuba-travel-academy.webp",
    "summary": "A practical Cuba travel guide covering visas, currency, weather, safety and trip preparation.",
    "summaryEl": "Πρακτικός ταξιδιωτικός οδηγός για την Κούβα, με πληροφορίες για βίζα, συνάλλαγμα, καιρό, ασφάλεια και προετοιμασία.",
    "results": [
      "Entry and visa guidance",
      "Currency and practical advice",
      "Destination information"
    ],
    "resultsEl": [
      "Πληροφορίες εισόδου και βίζας",
      "Συνάλλαγμα και πρακτικές συμβουλές",
      "Πληροφορίες προορισμού"
    ],
    "services": [
      "website-creation",
      "content-creation"
    ],
    "seoTitle": "Cuba Travel Academy | Website project",
    "seoDescription": "A practical Cuba travel guide covering visas, currency, weather, safety and trip preparation.",
    "seoTitleEl": "Cuba Travel Academy | Παρουσίαση έργου",
    "seoDescriptionEl": "Πρακτικός ταξιδιωτικός οδηγός για την Κούβα, με πληροφορίες για βίζα, συνάλλαγμα, καιρό, ασφάλεια και προετοιμασία.",
    "featured": false
  },
  {
    "slug": "antiparos-transfer",
    "name": "AGGELOS Transfer",
    "url": "https://antiparostransfer.gr",
    "category": "transfers",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/antiparos-transfer.webp",
    "summary": "AGGELOS Transfer provides private transport on Paros and Antiparos, including airport arrivals, weddings and island tours.",
    "summaryEl": "Η AGGELOS Transfer αναλαμβάνει ιδιωτικές μεταφορές στην Πάρο και στην Αντίπαρο, για αφίξεις στο αεροδρόμιο, γάμους και περιηγήσεις.",
    "results": [
      "Paros and Antiparos transfers",
      "Wedding transport",
      "Private island tours"
    ],
    "resultsEl": [
      "Μεταφορές σε Πάρο και Αντίπαρο",
      "Μεταφορές για γάμους",
      "Ιδιωτικές περιηγήσεις"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "AGGELOS Transfer | Website project",
    "seoDescription": "AGGELOS Transfer provides private transport on Paros and Antiparos, including airport arrivals, weddings and island tours.",
    "seoTitleEl": "AGGELOS Transfer | Παρουσίαση έργου",
    "seoDescriptionEl": "Η AGGELOS Transfer αναλαμβάνει ιδιωτικές μεταφορές στην Πάρο και στην Αντίπαρο, για αφίξεις στο αεροδρόμιο, γάμους και περιηγήσεις.",
    "featured": false
  },
  {
    "slug": "navos-ai",
    "name": "Navos AI",
    "url": "https://navos.ai",
    "category": "travel-ai",
    "markets": [
      "US",
      "EU",
      "UK"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/navos-ai.webp",
    "summary": "An always-on business strategy advisor that connects business context and external changes with evidence and decisions.",
    "summaryEl": "Σύμβουλος επιχειρηματικής στρατηγικής που συνδέει το πλαίσιο της επιχείρησης και τις εξωτερικές αλλαγές με τεκμηριωμένες αποφάσεις.",
    "results": [
      "Business context",
      "External change monitoring",
      "Decision support"
    ],
    "resultsEl": [
      "Πλαίσιο επιχείρησης",
      "Παρακολούθηση εξωτερικών αλλαγών",
      "Υποστήριξη αποφάσεων"
    ],
    "services": [
      "website-creation",
      "ai-visibility",
      "web-design"
    ],
    "seoTitle": "Navos AI | Website project",
    "seoDescription": "An always-on business strategy advisor that connects business context and external changes with evidence and decisions.",
    "seoTitleEl": "Navos AI | Παρουσίαση έργου",
    "seoDescriptionEl": "Σύμβουλος επιχειρηματικής στρατηγικής που συνδέει το πλαίσιο της επιχείρησης και τις εξωτερικές αλλαγές με τεκμηριωμένες αποφάσεις.",
    "featured": true
  },
  {
    "slug": "project-shadow-ai",
    "name": "Project Shadow AI",
    "url": "https://projectshadow.ai",
    "category": "travel-ai",
    "markets": [
      "US",
      "EU"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/project-shadow-ai.webp",
    "summary": "A WooCommerce AI plugin and analytics product for store questions, content writing and customer assistance.",
    "summaryEl": "Πρόσθετο AI και εργαλείο ανάλυσης για WooCommerce, με απαντήσεις για το κατάστημα, συγγραφή περιεχομένου και υποστήριξη πελατών.",
    "results": [
      "Store analytics and questions",
      "Shadow Writer",
      "Store chatbot and plugin insights"
    ],
    "resultsEl": [
      "Ανάλυση και ερωτήσεις για το κατάστημα",
      "Shadow Writer",
      "Chatbot καταστήματος και πληροφορίες προσθέτων"
    ],
    "services": [
      "website-creation",
      "ai-visibility"
    ],
    "seoTitle": "Project Shadow AI | Website project",
    "seoDescription": "A WooCommerce AI plugin and analytics product for store questions, content writing and customer assistance.",
    "seoTitleEl": "Project Shadow AI | Παρουσίαση έργου",
    "seoDescriptionEl": "Πρόσθετο AI και εργαλείο ανάλυσης για WooCommerce, με απαντήσεις για το κατάστημα, συγγραφή περιεχομένου και υποστήριξη πελατών.",
    "featured": true
  },
  {
    "slug": "rethemnos",
    "name": "Rethemnos",
    "url": "https://rethemnos.gr",
    "category": "other",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/rethemnos.webp",
    "summary": "A local Rethymno publication covering news, culture, events and life in the region.",
    "summaryEl": "Τοπική ενημερωτική ιστοσελίδα για το Ρέθυμνο, με ειδήσεις, πολιτισμό, εκδηλώσεις και τη ζωή της περιοχής.",
    "results": [
      "Local news",
      "Culture and events",
      "Rethymno community information"
    ],
    "resultsEl": [
      "Τοπικές ειδήσεις",
      "Πολιτισμός και εκδηλώσεις",
      "Ενημέρωση για την κοινωνία του Ρεθύμνου"
    ],
    "services": [
      "website-creation",
      "content-creation"
    ],
    "seoTitle": "Rethemnos | Website project",
    "seoDescription": "A local Rethymno publication covering news, culture, events and life in the region.",
    "seoTitleEl": "Rethemnos | Παρουσίαση έργου",
    "seoDescriptionEl": "Τοπική ενημερωτική ιστοσελίδα για το Ρέθυμνο, με ειδήσεις, πολιτισμό, εκδηλώσεις και τη ζωή της περιοχής.",
    "featured": false
  },
  {
    "slug": "ktima-orion",
    "name": "Κτήμα Ωρίων",
    "url": "https://ktimaorion.gr",
    "relatedUrls": [
      "https://ktimaorion.com"
    ],
    "category": "other",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/ktima-orion.webp",
    "summary": "A wedding and baptism venue in Keratea, Attica, with sea views and spaces for 50 to 350 guests.",
    "summaryEl": "Χώρος γάμων και βαπτίσεων στην Κερατέα Αττικής, με θέα στη θάλασσα και δυνατότητα φιλοξενίας 50 έως 350 καλεσμένων.",
    "results": [
      "Weddings and baptisms",
      "Sea-view venue",
      "Guest parking"
    ],
    "resultsEl": [
      "Γάμοι και βαπτίσεις",
      "Χώρος με θέα στη θάλασσα",
      "Χώρος στάθμευσης επισκεπτών"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "Κτήμα Ωρίων | Website project",
    "seoDescription": "A wedding and baptism venue in Keratea, Attica, with sea views and spaces for 50 to 350 guests.",
    "seoTitleEl": "Κτήμα Ωρίων | Παρουσίαση έργου",
    "seoDescriptionEl": "Χώρος γάμων και βαπτίσεων στην Κερατέα Αττικής, με θέα στη θάλασσα και δυνατότητα φιλοξενίας 50 έως 350 καλεσμένων.",
    "featured": false
  },
  {
    "slug": "weddings-folegandros",
    "name": "Weddings Folegandros",
    "url": "https://weddings-folegandros.gr",
    "category": "tours",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/weddings-folegandros.webp",
    "summary": "A Folegandros wedding-planning website for destination weddings, elopements and ceremonies around Chora and Panagia.",
    "summaryEl": "Ιστοσελίδα οργάνωσης γάμων στη Φολέγανδρο, για τελετές, μικρούς γάμους και ζευγάρια που επιλέγουν τη Χώρα και την Παναγία.",
    "results": [
      "Destination wedding planning",
      "Intimate ceremonies",
      "Folegandros locations"
    ],
    "resultsEl": [
      "Οργάνωση γάμου στο νησί",
      "Μικρές, προσωπικές τελετές",
      "Τοποθεσίες στη Φολέγανδρο"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Weddings Folegandros | Website project",
    "seoDescription": "A Folegandros wedding-planning website for destination weddings, elopements and ceremonies around Chora and Panagia.",
    "seoTitleEl": "Weddings Folegandros | Παρουσίαση έργου",
    "seoDescriptionEl": "Ιστοσελίδα οργάνωσης γάμων στη Φολέγανδρο, για τελετές, μικρούς γάμους και ζευγάρια που επιλέγουν τη Χώρα και την Παναγία.",
    "featured": false
  },
  {
    "slug": "my-honeymoon",
    "name": "My Honeymoon",
    "url": "https://www.myhoneymoon.gr",
    "relatedUrls": [
      "https://www.myhoneymoon.travel"
    ],
    "category": "tours",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/my-honeymoon.webp",
    "summary": "A travel-planning service for personalised honeymoons and trips designed around each couple.",
    "summaryEl": "Υπηρεσία σχεδιασμού γαμήλιων ταξιδιών, με προτάσεις προσαρμοσμένες στο κάθε ζευγάρι.",
    "results": [
      "Honeymoon destinations",
      "Personal travel planning",
      "Couple consultation"
    ],
    "resultsEl": [
      "Προορισμοί γαμήλιου ταξιδιού",
      "Εξατομικευμένος σχεδιασμός",
      "Συζήτηση με το ζευγάρι"
    ],
    "services": [
      "website-creation",
      "content-creation"
    ],
    "seoTitle": "My Honeymoon | Website project",
    "seoDescription": "A travel-planning service for personalised honeymoons and trips designed around each couple.",
    "seoTitleEl": "My Honeymoon | Παρουσίαση έργου",
    "seoDescriptionEl": "Υπηρεσία σχεδιασμού γαμήλιων ταξιδιών, με προτάσεις προσαρμοσμένες στο κάθε ζευγάρι.",
    "featured": false
  },
  {
    "slug": "george-xipolitas",
    "name": "George Xipolitas",
    "url": "https://georgexipolitas.com",
    "category": "other",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/george-xipolitas.webp",
    "summary": "A personal hospitality and dining-consulting project for George Xipolitas.",
    "summaryEl": "Προσωπική επαγγελματική παρουσία του George Xipolitas στον χώρο της φιλοξενίας και της συμβουλευτικής εστίασης.",
    "results": [
      "Professional identity",
      "Hospitality expertise",
      "Consulting enquiries"
    ],
    "resultsEl": [
      "Επαγγελματική ταυτότητα",
      "Εμπειρία στη φιλοξενία",
      "Αιτήματα συμβουλευτικής"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "George Xipolitas | Website project",
    "seoDescription": "A personal hospitality and dining-consulting project for George Xipolitas.",
    "seoTitleEl": "George Xipolitas | Παρουσίαση έργου",
    "seoDescriptionEl": "Προσωπική επαγγελματική παρουσία του George Xipolitas στον χώρο της φιλοξενίας και της συμβουλευτικής εστίασης.",
    "featured": false,
    "liveStatus": "unverified"
  },
  {
    "slug": "helicro",
    "name": "Helicro",
    "url": "https://helicro.be",
    "category": "other",
    "markets": [
      "EU"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/helicro.webp",
    "summary": "A Belgian airport-transfer and private-chauffeur service linking Brussels, Antwerp, Ghent and Wallonia with regional airports.",
    "summaryEl": "Βελγική υπηρεσία μεταφορών αεροδρομίου και ιδιωτικού οδηγού, για Βρυξέλλες, Αμβέρσα, Γάνδη και Βαλλονία.",
    "results": [
      "Airport minivan transfers",
      "Zaventem, Charleroi and Lille",
      "Private chauffeur requests"
    ],
    "resultsEl": [
      "Μεταφορές με μίνι βαν",
      "Αεροδρόμια Zaventem, Charleroi και Lille",
      "Αιτήματα ιδιωτικού οδηγού"
    ],
    "services": [
      "website-creation",
      "seo-audits"
    ],
    "seoTitle": "Helicro | Website project",
    "seoDescription": "A Belgian airport-transfer and private-chauffeur service linking Brussels, Antwerp, Ghent and Wallonia with regional airports.",
    "seoTitleEl": "Helicro | Παρουσίαση έργου",
    "seoDescriptionEl": "Βελγική υπηρεσία μεταφορών αεροδρομίου και ιδιωτικού οδηγού, για Βρυξέλλες, Αμβέρσα, Γάνδη και Βαλλονία.",
    "featured": false
  },
  {
    "slug": "mastorush",
    "name": "MastoRush",
    "url": "https://mastorush.gr",
    "category": "other",
    "markets": [
      "GR"
    ],
    "languages": [
      "el"
    ],
    "screenshot": "/portfolio/mastorush.webp",
    "summary": "A Greek platform for finding tradespeople and requesting quotes for home and property work.",
    "summaryEl": "Ελληνική πλατφόρμα αναζήτησης επαγγελματιών και προσφορών για εργασίες σε σπίτι και επαγγελματικό χώρο.",
    "results": [
      "Search by trade",
      "Describe the required job",
      "Request local professional quotes"
    ],
    "resultsEl": [
      "Αναζήτηση ανά ειδικότητα",
      "Περιγραφή της εργασίας",
      "Αίτημα προσφορών από επαγγελματίες"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "MastoRush | Website project",
    "seoDescription": "A Greek platform for finding tradespeople and requesting quotes for home and property work.",
    "seoTitleEl": "MastoRush | Παρουσίαση έργου",
    "seoDescriptionEl": "Ελληνική πλατφόρμα αναζήτησης επαγγελματιών και προσφορών για εργασίες σε σπίτι και επαγγελματικό χώρο.",
    "featured": false
  },
  {
    "slug": "thenutrinest",
    "name": "Nutrinest Clinic",
    "url": "https://www.thenutrinest.gr",
    "category": "other",
    "markets": [
      "GR"
    ],
    "languages": [
      "el"
    ],
    "screenshot": "/portfolio/thenutrinest.webp",
    "summary": "Nutrinest Clinic is the nutrition practice of clinical dietitian Konstantina Papageorgiou, MSc.",
    "summaryEl": "Το Nutrinest Clinic είναι το διαιτολογικό γραφείο της κλινικής διαιτολόγου Κωνσταντίνας Παπαγεωργίου, MSc.",
    "results": [
      "Dietitian profile",
      "Nutrition services",
      "Appointment enquiries"
    ],
    "resultsEl": [
      "Παρουσίαση της διαιτολόγου",
      "Υπηρεσίες διατροφής",
      "Αιτήματα ραντεβού"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Nutrinest Clinic | Website project",
    "seoDescription": "Nutrinest Clinic is the nutrition practice of clinical dietitian Konstantina Papageorgiou, MSc.",
    "seoTitleEl": "Nutrinest Clinic | Παρουσίαση έργου",
    "seoDescriptionEl": "Το Nutrinest Clinic είναι το διαιτολογικό γραφείο της κλινικής διαιτολόγου Κωνσταντίνας Παπαγεωργίου, MSc.",
    "featured": false
  },
  {
    "slug": "folegandros-hairsalon",
    "name": "Sousi Hair Salon",
    "url": "https://folegandros-hairsalon.gr",
    "category": "other",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/folegandros-hairsalon.webp",
    "summary": "Sousi Hair Salon by Katerina offers hair, nail, makeup and bridal services on Folegandros.",
    "summaryEl": "Το Sousi Hair Salon της Κατερίνας προσφέρει κομμωτική, περιποίηση άκρων, μακιγιάζ και νυφικές υπηρεσίες στη Φολέγανδρο.",
    "results": [
      "Hair and styling",
      "Nails and makeup",
      "Bridal appointments"
    ],
    "resultsEl": [
      "Κομμωτική και χτενίσματα",
      "Περιποίηση άκρων και μακιγιάζ",
      "Νυφικά ραντεβού"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Sousi Hair Salon | Website project",
    "seoDescription": "Sousi Hair Salon by Katerina offers hair, nail, makeup and bridal services on Folegandros.",
    "seoTitleEl": "Sousi Hair Salon | Παρουσίαση έργου",
    "seoDescriptionEl": "Το Sousi Hair Salon της Κατερίνας προσφέρει κομμωτική, περιποίηση άκρων, μακιγιάζ και νυφικές υπηρεσίες στη Φολέγανδρο.",
    "featured": false
  },
  {
    "slug": "folegandros-moto",
    "name": "Road Runner Folegandros",
    "url": "https://folegandros-moto.gr",
    "category": "rent-a-car",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/folegandros-moto.webp",
    "summary": "Road Runner rents motorcycles, scooters and ATVs on Folegandros, with local service dating to 1998.",
    "summaryEl": "Η Road Runner ενοικιάζει μοτοσικλέτες, σκούτερ και ATV στη Φολέγανδρο, με παρουσία στο νησί από το 1998.",
    "results": [
      "Motorcycles, scooters and ATVs",
      "Port and hotel delivery",
      "Folegandros rental team"
    ],
    "resultsEl": [
      "Μοτοσικλέτες, σκούτερ και ATV",
      "Παράδοση σε λιμάνι και ξενοδοχείο",
      "Τοπική ομάδα στη Φολέγανδρο"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Road Runner Folegandros | Website project",
    "seoDescription": "Road Runner rents motorcycles, scooters and ATVs on Folegandros, with local service dating to 1998.",
    "seoTitleEl": "Road Runner Folegandros | Παρουσίαση έργου",
    "seoDescriptionEl": "Η Road Runner ενοικιάζει μοτοσικλέτες, σκούτερ και ATV στη Φολέγανδρο, με παρουσία στο νησί από το 1998.",
    "featured": false
  },
  {
    "slug": "best-pumpkin-near-me",
    "name": "Best Pumpkin Near Me",
    "url": "https://bestpumpkinnearme.com",
    "category": "other",
    "markets": [
      "US"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/best-pumpkin-near-me.webp",
    "summary": "A US pumpkin-patch discovery website with location guides and a Halloween affiliate shop.",
    "summaryEl": "Ιστοσελίδα αναζήτησης pumpkin patches στις ΗΠΑ, με οδηγούς ανά περιοχή και κατάστημα προτάσεων για το Halloween.",
    "results": [
      "Pumpkin patches by location",
      "Seasonal activity guides",
      "Halloween affiliate shopping"
    ],
    "resultsEl": [
      "Αναζήτηση pumpkin patch ανά περιοχή",
      "Οδηγοί εποχικών δραστηριοτήτων",
      "Προτάσεις αγορών Halloween με συνεργαζόμενους συνδέσμους"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "content-creation"
    ],
    "seoTitle": "Best Pumpkin Near Me | Website project",
    "seoDescription": "A US pumpkin-patch discovery website with location guides and a Halloween affiliate shop.",
    "seoTitleEl": "Best Pumpkin Near Me | Παρουσίαση έργου",
    "seoDescriptionEl": "Ιστοσελίδα αναζήτησης pumpkin patches στις ΗΠΑ, με οδηγούς ανά περιοχή και κατάστημα προτάσεων για το Halloween.",
    "featured": false
  },
  {
    "slug": "stretcher-stopper",
    "name": "Stretcher Stopper",
    "url": "https://stretcherstopper.com",
    "category": "other",
    "markets": [
      "US"
    ],
    "languages": [
      "en"
    ],
    "screenshot": "/portfolio/stretcher-stopper.webp",
    "summary": "StretcherStopper® is a floor-mounted hospital protection device designed for stretcher and equipment environments.",
    "summaryEl": "Το StretcherStopper® είναι σύστημα προστασίας νοσοκομειακών χώρων που στερεώνεται στο δάπεδο και αφορά τη χρήση φορείων και εξοπλισμού.",
    "results": [
      "Hospital wall protection",
      "Floor-mounted device",
      "Product information and enquiries"
    ],
    "resultsEl": [
      "Προστασία νοσοκομειακών χώρων",
      "Στερέωση στο δάπεδο",
      "Πληροφορίες προϊόντος και επικοινωνία"
    ],
    "services": [
      "website-creation"
    ],
    "seoTitle": "Stretcher Stopper | Website project",
    "seoDescription": "StretcherStopper® is a floor-mounted hospital protection device designed for stretcher and equipment environments.",
    "seoTitleEl": "Stretcher Stopper | Παρουσίαση έργου",
    "seoDescriptionEl": "Το StretcherStopper® είναι σύστημα προστασίας νοσοκομειακών χώρων που στερεώνεται στο δάπεδο και αφορά τη χρήση φορείων και εξοπλισμού.",
    "featured": false
  },
  {
    "slug": "antiparos-rooms",
    "name": "AGGELOS Antiparos Apartments",
    "url": "https://antiparosrooms.com",
    "category": "hotel",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/antiparos-rooms.webp",
    "summary": "AGGELOS Antiparos Apartments presents island accommodation with sea views, balconies and practical in-room facilities.",
    "summaryEl": "Η AGGELOS Antiparos Apartments παρουσιάζει διαμονή στην Αντίπαρο με θέα στη θάλασσα, μπαλκόνια και πρακτικές παροχές δωματίου.",
    "results": [
      "Sea-view apartments",
      "Kitchen and Wi-Fi facilities",
      "Direct stay enquiries"
    ],
    "resultsEl": [
      "Διαμερίσματα με θέα στη θάλασσα",
      "Κουζίνα και Wi-Fi",
      "Απευθείας αιτήματα διαμονής"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "AGGELOS Antiparos Apartments | Website project",
    "seoDescription": "AGGELOS Antiparos Apartments presents island accommodation with sea views, balconies and practical in-room facilities.",
    "seoTitleEl": "AGGELOS Antiparos Apartments | Παρουσίαση έργου",
    "seoDescriptionEl": "Η AGGELOS Antiparos Apartments παρουσιάζει διαμονή στην Αντίπαρο με θέα στη θάλασσα, μπαλκόνια και πρακτικές παροχές δωματίου.",
    "featured": false
  },
  {
    "slug": "erebos",
    "name": "Erebos",
    "url": "https://erebos.gr",
    "category": "travel-ai",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/erebos.webp",
    "summary": "A real-time vehicle-tracking platform for individual vehicles and fleets, using a phone or GPS hardware.",
    "summaryEl": "Πλατφόρμα ζωντανής παρακολούθησης οχημάτων και στόλων, με χρήση κινητού ή συσκευής GPS.",
    "results": [
      "Real-time vehicle location",
      "Phone or GPS device",
      "Individual vehicles and fleets"
    ],
    "resultsEl": [
      "Ζωντανή θέση οχήματος",
      "Χρήση κινητού ή συσκευής GPS",
      "Μεμονωμένα οχήματα και στόλοι"
    ],
    "services": [
      "website-creation",
      "web-design"
    ],
    "seoTitle": "Erebos | Website project",
    "seoDescription": "A real-time vehicle-tracking platform for individual vehicles and fleets, using a phone or GPS hardware.",
    "seoTitleEl": "Erebos | Παρουσίαση έργου",
    "seoDescriptionEl": "Πλατφόρμα ζωντανής παρακολούθησης οχημάτων και στόλων, με χρήση κινητού ή συσκευής GPS.",
    "featured": true
  },
  {
    "slug": "naxos-car-rental",
    "name": "Naxos Auto Rent",
    "url": "https://naxos-car-rental.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/naxos-car-rental.webp",
    "summary": "A Naxos Auto Rent website for local car rental and delivery at the port or airport.",
    "summaryEl": "Ιστοσελίδα της Naxos Auto Rent για τοπική ενοικίαση αυτοκινήτου και παράδοση στο λιμάνι ή στο αεροδρόμιο.",
    "results": [
      "Local Naxos rental team",
      "Port and airport delivery",
      "Vehicle and booking information"
    ],
    "resultsEl": [
      "Τοπική ομάδα στη Νάξο",
      "Παράδοση σε λιμάνι και αεροδρόμιο",
      "Πληροφορίες οχημάτων και κράτησης"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "web-design"
    ],
    "seoTitle": "Naxos Auto Rent | Website project",
    "seoDescription": "A Naxos Auto Rent website for local car rental and delivery at the port or airport.",
    "seoTitleEl": "Naxos Auto Rent | Παρουσίαση έργου",
    "seoDescriptionEl": "Ιστοσελίδα της Naxos Auto Rent για τοπική ενοικίαση αυτοκινήτου και παράδοση στο λιμάνι ή στο αεροδρόμιο.",
    "featured": true
  },
  {
    "slug": "naxos-auto-rent",
    "name": "Naxos Auto Rent",
    "url": "https://naxosautorent.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU",
      "US"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/naxos-auto-rent.webp",
    "summary": "A family-run Naxos Auto Rent business offering car rentals and delivery at the port, airport or hotel.",
    "summaryEl": "Οικογενειακή επιχείρηση Naxos Auto Rent, με ενοικιάσεις αυτοκινήτων και παράδοση σε λιμάνι, αεροδρόμιο ή ξενοδοχείο.",
    "results": [
      "Family-run local business",
      "Port, airport and hotel delivery",
      "Online rental booking"
    ],
    "resultsEl": [
      "Οικογενειακή τοπική επιχείρηση",
      "Παράδοση σε λιμάνι, αεροδρόμιο και ξενοδοχείο",
      "Ηλεκτρονική κράτηση ενοικίασης"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "speed-optimization"
    ],
    "seoTitle": "Naxos Auto Rent | Website project",
    "seoDescription": "A family-run Naxos Auto Rent business offering car rentals and delivery at the port, airport or hotel.",
    "seoTitleEl": "Naxos Auto Rent | Παρουσίαση έργου",
    "seoDescriptionEl": "Οικογενειακή επιχείρηση Naxos Auto Rent, με ενοικιάσεις αυτοκινήτων και παράδοση σε λιμάνι, αεροδρόμιο ή ξενοδοχείο.",
    "featured": false
  },
  {
    "slug": "rentacar-sifnos",
    "name": "Artemis Rental Sifnos",
    "url": "https://rentacarsifnos.com",
    "category": "rent-a-car",
    "markets": [
      "GR",
      "EU"
    ],
    "languages": [
      "en",
      "el"
    ],
    "screenshot": "/portfolio/rentacar-sifnos.webp",
    "summary": "Artemis Rental is a family car-rental business in Apollonia, Sifnos, serving visitors since 1988.",
    "summaryEl": "Η Artemis Rental είναι οικογενειακή επιχείρηση ενοικίασης αυτοκινήτων στην Απολλωνία της Σίφνου, με παρουσία από το 1988.",
    "results": [
      "Local family business",
      "Kamares arrival options",
      "Online reservation information"
    ],
    "resultsEl": [
      "Τοπική οικογενειακή επιχείρηση",
      "Παραλαβή για αφίξεις στις Καμάρες",
      "Πληροφορίες ηλεκτρονικής κράτησης"
    ],
    "services": [
      "website-creation",
      "local-seo"
    ],
    "seoTitle": "Artemis Rental Sifnos | Website project",
    "seoDescription": "Artemis Rental is a family car-rental business in Apollonia, Sifnos, serving visitors since 1988.",
    "seoTitleEl": "Artemis Rental Sifnos | Παρουσίαση έργου",
    "seoDescriptionEl": "Η Artemis Rental είναι οικογενειακή επιχείρηση ενοικίασης αυτοκινήτων στην Απολλωνία της Σίφνου, με παρουσία από το 1988.",
    "featured": true
  },
  {
    "slug": "vwanaki",
    "name": "vwanaki",
    "url": "https://vwanaki.gr",
    "category": "other",
    "markets": [
      "GR"
    ],
    "languages": [
      "el",
      "en"
    ],
    "screenshot": "/portfolio/vwanaki.webp",
    "summary": "A mobile cocktail-bar van for weddings, baptisms and events in Athens and beyond.",
    "summaryEl": "Κινητό cocktail bar σε βανάκι για γάμους, βαπτίσεις και εκδηλώσεις στην Αθήνα και σε άλλους προορισμούς.",
    "results": [
      "Mobile cocktail bar",
      "Weddings and private events",
      "Event quote requests"
    ],
    "resultsEl": [
      "Κινητό cocktail bar",
      "Γάμοι και ιδιωτικές εκδηλώσεις",
      "Αιτήματα προσφοράς εκδήλωσης"
    ],
    "services": [
      "website-creation",
      "local-seo",
      "content-creation"
    ],
    "seoTitle": "vwanaki | Website project",
    "seoDescription": "A mobile cocktail-bar van for weddings, baptisms and events in Athens and beyond.",
    "seoTitleEl": "vwanaki | Παρουσίαση έργου",
    "seoDescriptionEl": "Κινητό cocktail bar σε βανάκι για γάμους, βαπτίσεις και εκδηλώσεις στην Αθήνα και σε άλλους προορισμούς.",
    "featured": true
  }
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
