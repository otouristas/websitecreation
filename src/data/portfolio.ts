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
  results?: string[];
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
  'travel-ai': { label: 'Travel AI', labelEl: 'Travel AI' },
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
      'Car rental website for Paros with fleet showcase, online booking flow, and local SEO targeting island search intent.',
    summaryEl:
      'Ιστοσελίδα ενοικίασης αυτοκινήτου στην Πάρο με online κρατήσεις και τοπικό SEO για νησιωτικές αναζητήσεις.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo', 'speed-optimization'],
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
    summary: 'Rent-a-car site for Antiparos with multilingual pages and conversion-focused vehicle listings.',
    summaryEl: 'Ιστοσελίδα rent-a-car στην Αντίπαρο με πολύγλωσσες σελίδες και βελτιστοποίηση κρατήσεων.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'seo-web-design', 'local-seo'],
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
    summary: 'Regional car rental hub covering multiple Cyclades islands with structured local landing pages.',
    summaryEl:
      'Περιφερειακό hub ενοικίασης αυτοκινήτου στις Κυκλάδες με δομημένες τοπικές landing pages.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
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
    summary: 'Crete car rental website optimized for airport and port pickup keywords.',
    summaryEl:
      'Ιστοσελίδα ενοικίασης αυτοκινήτου στην Κρήτη βελτιστοποιημένη για αεροδρόμιο και λιμάνι.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Naxos rent-a-car site with fleet gallery, pricing tables, and island SEO.',
    summaryEl:
      'Rent-a-car στη Νάξο με gallery στόλου, πίνακες τιμών και τοπικό SEO.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Greek-first rent-a-car site for Antiparos with local schema and GBP alignment.',
    summaryEl:
      'Ελληνική rent-a-car ιστοσελίδα στην Αντίπαρο με τοπικό schema και ευθυγράμμιση GBP.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Paros car rental with bilingual content and seasonal offer landing pages.',
    summaryEl:
      'Ενοικίαση αυτοκινήτου στην Πάρο με δίγλωσσο περιεχόμενο και εποχιακές προσφορές.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Athens/Piraeus car rental targeting port and airport transfer keywords.',
    summaryEl:
      'Ενοικίαση αυτοκινήτου Αθήνα/Πειραιάς με στόχευση λιμανιού και αεροδρομίου.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Capital city car rental with location pages and fast mobile booking.',
    summaryEl:
      'Ενοικίαση αυτοκινήτου στην πρωτεύουσα με σελίδες τοποθεσιών και γρήγορη mobile κράτηση.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'speed-optimization'],
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
    summary: 'Paros rent-a-car with Greek SEO focus and vehicle category pages.',
    summaryEl:
      'Rent-a-car Πάρου με ελληνικό SEO και σελίδες κατηγοριών οχημάτων.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Santorini hotel directory with property showcases and tourism SEO architecture.',
    summaryEl:
      'Κατάλογος ξενοδοχείων Σαντορίνης με παρουσιάσεις καταλυμάτων και τουριστικό SEO.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'seo-web-design', 'content-creation'],
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
    summary: 'Sifnos hospitality guide with hotel listings and island travel content.',
    summaryEl:
      'Οδηγός φιλοξενίας Σίφνου με λίστες ξενοδοχείων και περιεχόμενο ταξιδιού.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'Boutique hotel website with room galleries, direct booking CTAs, and brand storytelling.',
    summaryEl:
      'Boutique hotel με galleries δωματίων, CTAs άμεσης κράτησης και brand storytelling.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Hotel site with garden-themed design, amenities pages, and local SEO.',
    summaryEl:
      'Ξενοδοχείο με σχεδιασμό κήπου, σελίδες παροχών και τοπικό SEO.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Luxury villa rentals with photo-rich galleries and direct inquiry forms.',
    summaryEl:
      'Πολυτελείς βίλες με πλούσιες galleries και φόρμες άμεσης επικοινωνίας.',
    results: [
      'Photo-rich property pages with inquiry forms',
      'Vacation rental schema and amenity detail',
      'International EN/EL targeting for high-intent guests',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Premium villa website with immersive imagery and international SEO.',
    summaryEl:
      'Premium villa site με immersive εικόνες και διεθνές SEO.',
    results: [
      'Photo-rich property pages with inquiry forms',
      'Vacation rental schema and amenity detail',
      'International EN/EL targeting for high-intent guests',
    ],

    services: ['website-creation', 'local-seo', 'ai-visibility'],
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
      'Seaside holiday villas in Mariou, Plakias & Myrthios, South Rethymno Crete — multi-property booking site with local SEO.',
    summaryEl:
      'Παραθαλάσσιες βίλες διακοπών σε Μαριού, Πλακιά & Μύρθιο, Νότιο Ρέθυμνο — multi-property site με τοπικό SEO.',
    seoTitle: 'Villas Katerina | Holiday Villas South Rethymno',
    seoDescription:
      'Seaside holiday villas in Mariou, Plakias & Myrthios, South Rethymno Crete. Book Villas Katerina.',
    results: [
      'Multi-villa property pages for Mariou, Plakias and Myrthios',
      'Direct inquiry / booking CTAs for South Rethymno guests',
      'EN/EL SEO for Crete holiday villa search intent',
    ],
    services: ['website-creation', 'local-seo'],
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
    summary: 'Multi-property apartment brand with sub-sites for individual listings.',
    summaryEl:
      'Multi-property brand διαμερισμάτων με υποσελίδες για κάθε κατάλυμα.',
    results: [
      'Photo-rich property pages with inquiry forms',
      'Vacation rental schema and amenity detail',
      'International EN/EL targeting for high-intent guests',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Luxury Mykonos property marketing with high-end visual design.',
    summaryEl:
      'Luxury marketing Μυκόνου με υψηλής αισθητικής οπτικό σχεδιασμό.',
    results: [
      'Photo-rich property pages with inquiry forms',
      'Vacation rental schema and amenity detail',
      'International EN/EL targeting for high-intent guests',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Cyclades travel guide with island hubs, itineraries, and content SEO.',
    summaryEl:
      'Οδηγός Κυκλάδων με hubs νησιών, itineraries και content SEO.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation', 'local-seo'],
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
    summary: 'Crete tourism portal with destination pages and internal linking clusters.',
    summaryEl:
      'Τουριστική πύλη Κρήτης με σελίδες προορισμών και εσωτερική σύνδεση.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation', 'seo-web-design'],
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
    summary: 'Crete travel resource with guides, maps content, and SEO landing pages.',
    summaryEl:
      'Ταξιδιωτικός πόρος Κρήτης με οδηγούς, χάρτες και SEO landing pages.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'Tour operator site with excursion catalog and booking CTAs.',
    summaryEl:
      'Tour operator με κατάλογο εκδρομών και CTAs κράτησης.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Santorini tours with package pages and seasonal campaign landing pages.',
    summaryEl:
      'Εκδρομές Σαντορίνης με πακέτα και εποχιακές campaign pages.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Adventure tour site for Crete quad safaris with gallery and FAQ schema.',
    summaryEl:
      'Περιπέτεια quad safari στην Κρήτη με gallery και FAQ schema.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'local-seo'],
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
      'Cuba travel specialist with bilingual package funnels — international site on skydream.travel and Greek hub on skydream.gr.',
    summaryEl:
      'Ειδικός ταξιδιών Κούβας με δίγλωσσα πακέτα — διεθνές site στο skydream.travel και ελληνικό hub στο skydream.gr.',
    seoTitle: 'Ταξίδι στην Κούβα | Skydream Travel Specialist',
    seoDescription:
      'Σχεδιάζουμε το ταξίδι στην Κούβα: διαμονή, μεταφορές, εκδρομές και βίζα. Ατομικά, γαμήλια και θεματικά ταξίδια.',
    results: [
      'Dual-domain EN/EL architecture with hreflang-ready travel packages',
      'Destination content clusters for Cuba trips, weddings and thematic tours',
      'Lead forms wired for quote requests on both .travel and .gr',
    ],
    services: ['website-creation', 'seo-web-design', 'content-creation'],
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
    summary: 'Educational travel brand with course-style content and lead capture.',
    summaryEl:
      'Εκπαιδευτικό travel brand με course-style περιεχόμενο και lead capture.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'VIP transfer service with route pages and click-to-call conversion design.',
    summaryEl:
      'VIP μεταφορές με σελίδες διαδρομών και click-to-call μετατροπή.',
    results: [
      'Route pages for airports, ports and hotels',
      'Click-to-call and WhatsApp conversion paths',
      'Local SEO for transfer and VIP intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Luxury transfer and concierge site with premium brand positioning.',
    summaryEl:
      'Luxury transfers και concierge με premium brand positioning.',
    results: [
      'Route pages for airports, ports and hotels',
      'Click-to-call and WhatsApp conversion paths',
      'Local SEO for transfer and VIP intents',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Island transfer bookings with Greek local SEO and mobile-first UX.',
    summaryEl:
      'Κρατήσεις μεταφορών νησιού με ελληνικό τοπικό SEO και mobile-first UX.',
    results: [
      'Route pages for airports, ports and hotels',
      'Click-to-call and WhatsApp conversion paths',
      'Local SEO for transfer and VIP intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Travel AI platform with product marketing pages and AEO-focused content structure.',
    summaryEl:
      'Travel AI πλατφόρμα με product marketing και AEO-focused δομή περιεχομένου.',
    results: [
      'Product marketing pages for AI travel workflows',
      'AEO-ready FAQ and feature content structure',
      'Conversion landing pages for demos and signups',
    ],

    services: ['website-creation', 'ai-visibility', 'seo-web-design'],
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
    summary: 'AI product site with technical SEO, schema, and conversion landing pages.',
    summaryEl:
      'AI product site με technical SEO, schema και conversion landing pages.',
    results: [
      'Product marketing pages for AI travel workflows',
      'AEO-ready FAQ and feature content structure',
      'Conversion landing pages for demos and signups',
    ],

    services: ['website-creation', 'ai-visibility'],
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
    summary: 'Rethymno tourism guide with local attractions and hospitality SEO.',
    summaryEl:
      'Οδηγός Ρεθύμνου με αξιοθέατα και hospitality SEO.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation'],
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
      'Event venue and estate site with wedding and hospitality landing pages — primary .gr with .com sister domain.',
    summaryEl:
      'Χώρος εκδηλώσεων και κτήμα με σελίδες γάμων και φιλοξενίας — κύριο .gr με αδελφό domain .com.',
    results: [
      'Wedding and event inquiry funnels with gallery-led storytelling',
      'Sister-domain strategy for international discovery',
      'SEO landing pages for venue + hospitality intents',
    ],
    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Destination wedding site for Folegandros with gallery and inquiry funnels.',
    summaryEl:
      'Destination wedding site στη Φολέγανδρο με gallery και inquiry funnels.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'local-seo'],
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
      'Luxury honeymoon planning for Greece — Greek site myhoneymoon.gr plus international myhoneymoon.travel.',
    summaryEl:
      'Σχεδιασμός πολυτελών ταξιδιών του μέλιτος στην Ελλάδα — ελληνικό site myhoneymoon.gr και διεθνές myhoneymoon.travel.',
    seoTitle: 'myHoneymoon | Luxury Honeymoon in Greece',
    seoDescription:
      'Bespoke luxury honeymoons in Greece. Stress-free planning for couples who want a romantic getaway designed uniquely for them.',
    results: [
      'Dual-brand domains for Greek and international couple intent',
      'Destination content with inquiry forms for bespoke packages',
      'Romantic travel storytelling optimized for ENG + EL search',
    ],
    services: ['website-creation', 'content-creation'],
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
    summary: 'Agritourism farm experience site with activities and booking CTAs.',
    summaryEl:
      'Αγροτουριστικό farm experience με δραστηριότητες και CTAs κράτησης.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation'],
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
    summary: 'Restaurant website with menu showcase and local dining SEO.',
    summaryEl:
      'Εστιατόριο με παρουσίαση μενού και τοπικό SEO εστίασης.',
    results: [
      'Menu and atmosphere pages for local dining search',
      'LocalBusiness schema and mobile contact CTAs',
      'Bilingual content for tourists where relevant',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Cafe brand site with atmosphere-focused design and local visibility.',
    summaryEl:
      'Cafe brand με atmosphere-focused design και τοπική ορατότητα.',
    results: [
      'Menu and atmosphere pages for local dining search',
      'LocalBusiness schema and mobile contact CTAs',
      'Bilingual content for tourists where relevant',
    ],

    services: ['website-creation'],
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
    summary: 'Events and bar brand with editorial content and social proof.',
    summaryEl:
      'Events και bar brand με editorial περιεχόμενο και social proof.',
    results: [
      'Menu and atmosphere pages for local dining search',
      'LocalBusiness schema and mobile contact CTAs',
      'Bilingual content for tourists where relevant',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'Short-term rental / hosting brand with property marketing pages.',
    summaryEl:
      'Short-term rental / hosting brand με σελίδες marketing καταλυμάτων.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'European expansion site for hosting and rental management brand.',
    summaryEl:
      'Ευρωπαϊκό expansion site για hosting και rental management.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation'],
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
    summary: 'Personal brand and professional portfolio with authority SEO.',
    summaryEl:
      'Personal brand και επαγγελματικό portfolio με authority SEO.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Belgium business site with multilingual structure and technical SEO.',
    summaryEl:
      'Επιχειρηματική ιστοσελίδα Βελγίου με πολύγλωσση δομή και technical SEO.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'seo-audits'],
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
    summary: 'Home services marketplace with category pages and local SEO.',
    summaryEl:
      'Marketplace οικιακών υπηρεσιών με κατηγορίες και τοπικό SEO.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Retail e-commerce with product SEO and structured data.',
    summaryEl:
      'Retail e-commerce με product SEO και structured data.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'seo-web-design'],
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
    summary: 'Health brand site with product education content and international SEO.',
    summaryEl:
      'Health brand με εκπαιδευτικό περιεχόμενο προϊόντων και διεθνές SEO.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'Nutrition practice site with service pages and local health SEO.',
    summaryEl:
      'Ιατρείο διατροφής με σελίδες υπηρεσιών και τοπικό health SEO.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Local business site for island salon with booking and GBP alignment.',
    summaryEl:
      'Τοπική επιχείρηση κομμωτηρίου νησιού με booking και GBP alignment.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Scooter and moto rental on Folegandros with seasonal landing pages.',
    summaryEl:
      'Ενοικίαση scooter και μοτοσικλέτας στη Φολέγανδρο με εποχιακές σελίδες.',
    results: [
      'Fleet and location landing pages for airport, port and hotel pickup',
      'Mobile booking CTAs with clear seasonal rates',
      'Local SEO + schema for island rent-a-car intents',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Retail site with product categories and local search optimization.',
    summaryEl:
      'Retail site με κατηγορίες προϊόντων και τοπική βελτιστοποίηση.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation'],
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
    summary: 'Greek e-commerce with category SEO and technical performance tuning.',
    summaryEl:
      'Ελληνικό e-commerce με SEO κατηγοριών και βελτιστοποίηση απόδοσης.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'speed-optimization'],
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
    summary: 'Programmatic local landing site for seasonal US search intent.',
    summaryEl:
      'Programmatic τοπικές landing pages για εποχιακή US αναζήτηση.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation', 'local-seo', 'content-creation'],
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
    summary: 'Product marketing site with technical specs and conversion pages.',
    summaryEl:
      'Product marketing με τεχνικά specs και conversion pages.',
    results: [
      'Service/product pages mapped to commercial search intent',
      'Clear lead-gen CTAs on mobile and desktop',
      'Technical SEO foundations: titles, meta, speed, schema',
    ],

    services: ['website-creation'],
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
    summary: 'Accommodation listings for Antiparos with room pages and local SEO.',
    summaryEl:
      'Καταλύματα Αντιπάρου με σελίδες δωματίων και τοπικό SEO.',
    results: [
      'Room and amenity pages with direct-booking CTAs',
      'Hospitality schema and image-led galleries',
      'Local + destination SEO for tourist discovery',
    ],

    services: ['website-creation', 'local-seo'],
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
    summary: 'Sifnos travel guide with beaches, villages, and hospitality content.',
    summaryEl:
      'Οδηγός Σίφνου με παραλίες, χωριά και περιεχόμενο φιλοξενίας.',
    results: [
      'Destination hubs with excursion and package child pages',
      'FAQ and itinerary content for long-tail travel search',
      'Lead forms for quotes and bookings',
    ],

    services: ['website-creation', 'content-creation'],
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
    summary: 'Cyclades tourism hub with island guides and internal linking architecture.',
    summaryEl:
      'Tourism hub Κυκλάδων με οδηγούς νησιών και εσωτερική αρχιτεκτονική συνδέσεων.',
    results: [
      'Island silo architecture with cross-island internal links',
      'English-first destination content for international travelers',
      'Programmatic-ready guide pages for beaches, villages and ferries',
    ],
    services: ['website-creation', 'content-creation', 'seo-web-design'],
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
      'Pest control and disinfection company site with service pages, local trust signals, and lead-gen CTAs for commercial spaces.',
    summaryEl:
      'Ιστοσελίδα απεντόμωσης και απολύμανσης με σελίδες υπηρεσιών, τοπική αξιοπιστία και CTAs για επαγγελματικούς χώρους.',
    seoTitle: 'Agrocult | Απεντόμωση, Μυοκτονία & Απολύμανση',
    seoDescription:
      'Εξειδικευμένες υπηρεσίες απεντόμωσης, μυοκτονίας, απολύμανσης και αρωματισμού επαγγελματικών χώρων.',
    results: [
      'Service landing pages for pest control, rodent control and disinfection',
      'LocalBusiness-ready structure for Greek commercial search',
      'Clear quote CTAs above the fold for B2B inquiries',
    ],
    services: ['website-creation', 'local-seo'],
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
      'Real-time vehicle tracking SaaS marketing site with product storytelling, feature pages, and conversion-focused CTAs.',
    summaryEl:
      'Marketing site για πραγματικό χρόνο GPS tracking οχημάτων με σελίδες προϊόντος και CTAs μετατροπής.',
    seoTitle: 'Erebos - Real-Time Vehicle Tracking Platform',
    seoDescription:
      'Real-time GPS tracking for individuals and fleets. Use your phone or install a hardware tracker.',
    results: [
      'Product marketing pages for phone + hardware tracker modes',
      'Clear free-tier positioning for one-vehicle users',
      'Technical SEO for SaaS feature and pricing intents',
    ],
    services: ['website-creation', 'seo-web-design'],
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
      'Architecture studio in Rethymno with project galleries, residential and commercial service pages, and local SEO.',
    summaryEl:
      'Αρχιτεκτονικό γραφείο στο Ρέθυμνο με galleries έργων, σελίδες κατοικιών/επαγγελματικών χώρων και τοπικό SEO.',
    seoTitle: 'Αρχιτεκτονικό Γραφείο Ρέθυμνο | Ergo & Art',
    seoDescription:
      'Αρχιτεκτονικό γραφείο στο Ρέθυμνο για κατοικίες, επαγγελματικούς χώρους και ανακαινίσεις.',
    results: [
      'Project portfolio galleries with conversion inquiry forms',
      'Rethymno local SEO for architecture and renovation intents',
      'Greek-first content for residential and commercial clients',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
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
      'Rethymno gym site with personal training, group programs, and local fitness SEO.',
    summaryEl:
      'Γυμναστήριο στο Ρέθυμνο με personal training, ομαδικά προγράμματα και τοπικό SEO fitness.',
    seoTitle: 'Fitness Hood Training Center | Γυμναστήριο στο Ρέθυμνο',
    seoDescription:
      'Fitness Hood Training Center στο Ρέθυμνο με personal training, ομαδικά προγράμματα και σύγχρονες προπονήσεις.',
    results: [
      'Program and membership pages for local gym search',
      'Mobile-first booking and contact paths',
      'Local SEO for Rethymno fitness intents',
    ],
    services: ['website-creation', 'local-seo'],
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
      'Retail e-commerce for hookah, accessories and lifestyle products with category SEO and product structure.',
    summaryEl:
      'E-shop ναργιλέδων και αξεσουάρ με SEO κατηγοριών και δομημένες σελίδες προϊόντων.',
    seoTitle: 'HUQQA KING - Καπνός, Ναργιλέδες, Hookah',
    seoDescription:
      'Ναργιλέδες, είδη και γεύσεις ναργιλέ, αξεσουάρ, χειροποίητα σετ τσαγιού, τάβλι και κομπολόγια.',
    results: [
      'Category and product SEO for specialty retail',
      'E-commerce UX tuned for mobile browsing',
      'Structured product pages ready for rich results',
    ],
    services: ['website-creation', 'eshop-woocommerce', 'speed-optimization'],
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
      'Mediation practice site covering family, civil, commercial and banking disputes with trust-led lead capture.',
    summaryEl:
      'Ιστοσελίδα διαμεσολάβησης για οικογενειακές, αστικές, εμπορικές και τραπεζικές υποθέσεις με φόρμες επικοινωνίας.',
    seoTitle: 'Διαμεσολάβηση Διαφορών | Κοινή Λύση',
    seoDescription:
      'Διαμεσολάβηση διαφορών για οικογενειακές, αστικές, εμπορικές και τραπεζικές υποθέσεις.',
    results: [
      'Practice-area landing pages for mediation intents',
      'Confidential, trust-first UX for sensitive legal inquiries',
      'Greek local SEO for dispute resolution queries',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
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
      'Speech therapy, occupational therapy and mental health center in Rethymno with service hubs and local authority SEO.',
    summaryEl:
      'Κέντρο λογοθεραπείας, εργοθεραπείας και ψυχικής υγείας στο Ρέθυμνο με hubs υπηρεσιών και τοπικό SEO.',
    seoTitle: 'Logopedia Ρέθυμνο | Λογοθεραπεία, Εργοθεραπεία & Ψυχική Υγεία',
    seoDescription:
      'Πρότυπο κέντρο Logopedia στο Ρέθυμνο με εικοσαετή εμπειρία σε λογοθεραπεία, εργοθεραπεία και ψυχική υγεία.',
    results: [
      'Multi-service medical vertical architecture',
      'Local SEO for Rethymno therapy and mental health search',
      'Clear appointment CTAs across service pages',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
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
      'Naxos Auto Rent brand site with free airport/port delivery messaging, transparent pricing, and island-ready fleet SEO.',
    summaryEl:
      'Site Naxos Auto Rent με δωρεάν παράδοση αεροδρόμιο/λιμάνι, διαφανείς τιμές και SEO στόλου.',
    seoTitle: 'Naxos Auto Rent: Car Rental on Naxos Island',
    seoDescription:
      'Rent a car on Naxos with free delivery to the airport and port, transparent prices, and an island-ready fleet.',
    results: [
      'Airport and port pickup keyword landing pages',
      'Transparent pricing tables for tourist conversion',
      'English-first booking funnel for international travelers',
    ],
    services: ['website-creation', 'local-seo', 'seo-web-design'],
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
      'Family-run Naxos car rental with free delivery, insured fleet messaging, and high-intent booking CTAs.',
    summaryEl:
      'Οικογενειακή ενοικίαση αυτοκινήτου στη Νάξο με δωρεάν παράδοση, ασφαλισμένο στόλο και CTAs κράτησης.',
    seoTitle: 'Naxos Car Rental | Best Rates & Free Delivery – Naxos Auto Rent',
    seoDescription:
      'Family-run car rental in Naxos. Free delivery at Naxos Airport (JNX), the port or your hotel.',
    results: [
      'Conversion-focused booking paths for JNX and port arrivals',
      'No-hidden-fees positioning for trust and CTR',
      'Multilingual fleet and rates pages',
    ],
    services: ['website-creation', 'local-seo', 'speed-optimization'],
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
      'Gym and personal training brand in Rethymno with online coaching pages and local fitness SEO.',
    summaryEl:
      'Γυμναστήριο και personal training στο Ρέθυμνο με online coaching και τοπικό SEO.',
    seoTitle: 'Politidis Fitness | Γυμναστήριο & Personal Training Ρέθυμνο',
    seoDescription:
      'Γυμναστήριο Politidis Fitness στο Ρέθυμνο με personal training, online coaching και προγράμματα προπόνησης.',
    results: [
      'Program and coaching service pages',
      'Local SEO for Rethymno gym search',
      'Lead capture for personal training consults',
    ],
    services: ['website-creation', 'local-seo'],
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
      'Sifnos car, scooter and moto rentals since 1988 — Apollonia-based fleet with seasonal rates and island discovery CTAs.',
    summaryEl:
      'Ενοικιάσεις αυτοκινήτων, scooters και μοτοσικλετών στη Σίφνο από το 1988 — στόλος στην Απολλωνία με εποχιακές τιμές.',
    seoTitle: 'Artemis Rental Sifnos | Car, Scooter & Moto Rentals',
    seoDescription:
      'Rent cars and scooters in Sifnos with Artemis Rental. Reliable vehicles, fair seasonal rates, friendly service since 1988.',
    results: [
      'Vehicle-class landing pages for cars, scooters and motos',
      'Seasonal pricing messaging for tourist conversion',
      'Local SEO for Sifnos rent-a-car intents',
    ],
    services: ['website-creation', 'local-seo'],
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
      'Online positive dog training with puppy programs, obedience, and behavior pages plus lead-gen funnels.',
    summaryEl:
      'Online εκπαίδευση σκύλων με θετικές μεθόδους — κουτάβια, υπακοή και συμπεριφορά με φόρμες επικοινωνίας.',
    seoTitle: 'Εκπαίδευση Σκύλων Online με Θετικές Μεθόδους | Smart Dog Training',
    seoDescription:
      'Online εκπαίδευση σκύλων με θετικές μεθόδους και εξατομικευμένη καθοδήγηση.',
    results: [
      'Program pages for puppy, obedience and behavior training',
      'Online-first lead capture for remote coaching',
      'Greek content SEO for dog training intents',
    ],
    services: ['website-creation', 'content-creation'],
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
      'Family Cretan taverna in Platanes, Rethymno with menu storytelling, gallery, and local dining SEO.',
    summaryEl:
      'Οικογενειακή κρητική ταβέρνα στα Πλατανιά Ρεθύμνου με μενού, gallery και τοπικό SEO εστίασης.',
    seoTitle: 'Taverna Yiannis - Authentic Cretan Cuisine in Platanes, Rethymno',
    seoDescription:
      'Family-run tavern in Platanes, Rethymno with traditional Cretan dishes and warm hospitality.',
    results: [
      'Bilingual menu and atmosphere pages for tourists',
      'Local SEO for Platanes / Rethymno dining',
      'Reservation and contact CTAs for walk-in and hotel guests',
    ],
    services: ['website-creation', 'local-seo'],
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
      'Mobile bar and vintage van bar catering for weddings and events across Greece with quote-request CTAs.',
    summaryEl:
      'Mobile bar και vintage van bar για γάμους και εκδηλώσεις σε όλη την Ελλάδα με φόρμες προσφοράς.',
    seoTitle: 'Mobile Bar & Van Bar για Εκδηλώσεις | vwanaki',
    seoDescription:
      'Premium mobile bar και vintage van bar catering για γάμους, βαπτίσεις, πάρτυ και εταιρικές εκδηλώσεις.',
    results: [
      'Event-type landing pages for weddings and corporate parties',
      'Quote-request conversion paths nationwide',
      'Visual portfolio for mobile bar setups',
    ],
    services: ['website-creation', 'local-seo', 'content-creation'],
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
