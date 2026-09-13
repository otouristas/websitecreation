/**
 * Content for the homepage sections.
 *
 * Everything a section renders that is not derived from another dataset
 * (pricing, portfolio, trust stats) lives here, in both locales, so the
 * section components stay layout-only. Greek follows docs/greek-style-guide.md.
 * Nothing here is a claimed client result.
 */

export type HomeFeatureIcon =
  | 'search'
  | 'audit'
  | 'pin'
  | 'sparkles'
  | 'layout'
  | 'cart'
  | 'book'
  | 'link';

export interface HomeFeature {
  readonly href: string;
  readonly icon: HomeFeatureIcon;
  readonly eyebrowEn: string;
  readonly eyebrowEl: string;
  readonly titleEn: string;
  readonly titleEl: string;
  readonly bodyEn: string;
  readonly bodyEl: string;
}

/** The eight service clusters from docs/keyword-research, in bento order. */
export const HOME_FEATURES: readonly HomeFeature[] = [
  {
    href: '/services/ai-visibility',
    icon: 'sparkles',
    eyebrowEn: 'AI search',
    eyebrowEl: 'Αναζήτηση με AI',
    titleEn: 'GEO & AEO',
    titleEl: 'GEO & AEO',
    bodyEn: 'Get cited in ChatGPT, Perplexity, Gemini and AI Overviews, then track it month over month.',
    bodyEl: 'Αναφορές σε ChatGPT, Perplexity, Gemini και AI Overviews, με παρακολούθηση κάθε μήνα.',
  },
  {
    href: '/services/website-creation',
    icon: 'layout',
    eyebrowEn: 'Build',
    eyebrowEl: 'Κατασκευή',
    titleEn: 'Website design',
    titleEl: 'Κατασκευή ιστοσελίδων',
    bodyEn: 'Fast, mobile-first sites with the SEO architecture in place before a single word is written.',
    bodyEl: 'Γρήγορες ιστοσελίδες, mobile-first, με αρχιτεκτονική SEO από την πρώτη μέρα.',
  },
  {
    href: '/seo-services',
    icon: 'search',
    eyebrowEn: 'Organic',
    eyebrowEl: 'Οργανικά',
    titleEn: 'SEO services',
    titleEl: 'Υπηρεσίες SEO',
    bodyEn: 'Technical foundations, content and internal linking built around the queries that actually convert.',
    bodyEl: 'Τεχνικά θεμέλια, περιεχόμενο και εσωτερική διασύνδεση γύρω από τους όρους που φέρνουν πελάτες.',
  },
  {
    href: '/services/seo-audits',
    icon: 'audit',
    eyebrowEn: 'Diagnosis',
    eyebrowEl: 'Διάγνωση',
    titleEn: 'SEO audit',
    titleEl: 'Τεχνικός έλεγχος SEO',
    bodyEn: 'A full crawl, Search Console analysis and a prioritised fix list you can hand to any developer.',
    bodyEl: 'Πλήρης ανάλυση, δεδομένα Search Console και λίστα διορθώσεων με σειρά προτεραιότητας.',
  },
  {
    href: '/services/local-seo',
    icon: 'pin',
    eyebrowEn: 'Local',
    eyebrowEl: 'Τοπικά',
    titleEn: 'Local SEO',
    titleEl: 'Τοπικό SEO',
    bodyEn: 'Google Business Profile, local landing pages and the map pack for your city or island.',
    bodyEl: 'Google Business Profile, τοπικές σελίδες και χάρτης Google για την πόλη ή το νησί σας.',
  },
  {
    href: '/services/eshop-woocommerce',
    icon: 'cart',
    eyebrowEn: 'Commerce',
    eyebrowEl: 'E-commerce',
    titleEn: 'E-shop development',
    titleEl: 'Κατασκευή e-shop',
    bodyEn: 'WooCommerce stores with product schema, clean category structure and a checkout that converts.',
    bodyEl: 'WooCommerce καταστήματα με schema προϊόντων, καθαρή δομή κατηγοριών και checkout που πουλά.',
  },
  {
    href: '/services/content-creation',
    icon: 'book',
    eyebrowEn: 'Content',
    eyebrowEl: 'Περιεχόμενο',
    titleEn: 'Content & topical hubs',
    titleEl: 'Περιεχόμενο & θεματικοί κόμβοι',
    bodyEn: 'Answer-first articles clustered into hubs, so one page can rank for a whole family of queries.',
    bodyEl: 'Άρθρα με άμεση απάντηση, οργανωμένα σε κόμβους ώστε μία σελίδα να καλύπτει πολλές αναζητήσεις.',
  },
  {
    href: '/services/link-building',
    icon: 'link',
    eyebrowEn: 'Authority',
    eyebrowEl: 'Κύρος',
    titleEn: 'Digital PR & links',
    titleEl: 'Digital PR & backlinks',
    bodyEn: 'Editorial mentions and relevant links, earned rather than bought, with every placement documented.',
    bodyEl: 'Αναφορές και σχετικά backlinks που κερδίζονται, όχι που αγοράζονται, με πλήρη τεκμηρίωση.',
  },
];

export interface HomeVertical {
  readonly slug: string;
  readonly titleEn: string;
  readonly titleEl: string;
  readonly descEn: string;
  readonly descEl: string;
  /** A real client screenshot from public/portfolio, used as a dimmed backdrop. */
  readonly screenshot: string;
  readonly screenshotAltEn: string;
  readonly screenshotAltEl: string;
}

export const HOME_VERTICALS: readonly HomeVertical[] = [
  {
    slug: 'hotels',
    titleEn: 'Hotels & hospitality',
    titleEl: 'Ξενοδοχεία & φιλοξενία',
    descEn: 'Direct-booking sites, room galleries and tourism keyword clusters that beat the OTAs on your own name.',
    descEl: 'Ιστοσελίδες με απευθείας κρατήσεις, γκαλερί δωματίων και θεματικούς κόμβους τουρισμού.',
    screenshot: '/portfolio/hotels-santorini.webp',
    screenshotAltEn: 'Hotels Santorini homepage',
    screenshotAltEl: 'Αρχική σελίδα Hotels Santorini',
  },
  {
    slug: 'rent-a-car',
    titleEn: 'Rent-a-car',
    titleEl: 'Ενοικίαση αυτοκινήτου',
    descEn: 'Fleet pages, booking funnels and island or airport SEO for car rental brands.',
    descEl: 'Σελίδες στόλου, διαδικασία κράτησης και SEO για νησιά ή αεροδρόμια.',
    screenshot: '/portfolio/antiparos-rentacar.webp',
    screenshotAltEn: 'Antiparos Rent a Car homepage',
    screenshotAltEl: 'Αρχική σελίδα Antiparos Rent a Car',
  },
  {
    slug: 'tour-operators',
    titleEn: 'Tours & travel',
    titleEl: 'Εκδρομές & τουρισμός',
    descEn: 'Excursion catalogues, destination hubs and content SEO built to scale across seasons.',
    descEl: 'Κατάλογοι εκδρομών, κόμβοι προορισμών και περιεχόμενο που κλιμακώνεται ανά σεζόν.',
    screenshot: '/portfolio/discover-crete.webp',
    screenshotAltEn: 'Discover Crete homepage',
    screenshotAltEl: 'Αρχική σελίδα Discover Crete',
  },
];

export interface HomeReason {
  readonly titleEn: string;
  readonly titleEl: string;
  readonly bodyEn: string;
  readonly bodyEl: string;
}

export const HOME_REASONS: readonly HomeReason[] = [
  {
    titleEn: 'We run on our own software',
    titleEl: 'Δουλεύουμε με το δικό μας λογισμικό',
    bodyEn: 'Our platform is Search Console-native, so decisions come from your real query data rather than a third-party estimate.',
    bodyEl: 'Η πλατφόρμα μας συνδέεται στο Search Console, οπότε οι αποφάσεις βγαίνουν από τα πραγματικά σας δεδομένα.',
  },
  {
    titleEn: 'Tourism is our proving ground',
    titleEl: 'Ο τουρισμός είναι το πεδίο μας',
    bodyEn: 'Hotels, rent-a-car and tours across the Cyclades, Crete and Athens - seasonal demand, multilingual sites, direct bookings.',
    bodyEl: 'Ξενοδοχεία, ενοικίαση αυτοκινήτου και εκδρομές σε Κυκλάδες, Κρήτη και Αθήνα, με έμφαση σε απευθείας κρατήσεις.',
  },
  {
    titleEn: 'Build and rank in one team',
    titleEl: 'Κατασκευή και SEO από μία ομάδα',
    bodyEn: 'The people writing the SEO strategy are the people building the site, so nothing gets lost in a handover.',
    bodyEl: 'Όσοι σχεδιάζουν τη στρατηγική SEO είναι όσοι φτιάχνουν την ιστοσελίδα, χωρίς κενά στην παράδοση.',
  },
  {
    titleEn: 'AI visibility, measured',
    titleEl: 'Μετρήσιμη ορατότητα σε AI',
    bodyEn: 'GEO and AEO with citation tracking and a documented method, not acronyms on a slide.',
    bodyEl: 'GEO και AEO με παρακολούθηση αναφορών και τεκμηριωμένη μέθοδο, όχι απλώς ακρωνύμια.',
  },
  {
    titleEn: 'Greek and English, natively',
    titleEl: 'Ελληνικά και αγγλικά, σωστά',
    bodyEn: 'Both locales written properly, with reciprocal hreflang - not one language machine-translated into the other.',
    bodyEl: 'Και οι δύο γλώσσες γραμμένες σωστά, με hreflang, όχι αυτόματη μετάφραση.',
  },
];

/**
 * One entry per brand, not per site. `public/logos/assets/` holds six Aggelos
 * marks because that client runs six sites - all but one are left out, or a
 * third of the wall would read as the same yellow wordmark repeating.
 */
export const HOME_LOGOS = [
  { src: '/logos/assets/naxos-auto-rent.png', alt: 'Naxos Auto Rent' },
  { src: '/logos/assets/artemis-auto-rental.svg', alt: 'Artemis Rental Sifnos' },
  { src: '/logos/assets/villa-olivia-clara-logo-768x204.png', alt: 'Villa Olivia Clara' },
  { src: '/logos/assets/fastmotorrental-naxos.png', alt: 'Fast Motor Rental Naxos' },
  { src: '/logos/assets/roadrunner-folegandros.png', alt: 'Road Runner Folegandros' },
  { src: '/logos/assets/aggelosrentals.png', alt: 'Aggelos Rentals' },
  { src: '/logos/assets/alkhotel.png', alt: 'ALK Hotel' },
  { src: '/logos/assets/elitehospitality.png', alt: 'Elite Hospitality Services' },
  { src: '/logos/assets/meropirooms.png', alt: 'Meropi Rooms' },
] as const;

export interface HomeTestimonial {
  readonly name: string;
  readonly role: string;
  readonly text: string;
}

export const HOME_TESTIMONIALS: Record<'en' | 'el', readonly HomeTestimonial[]> = {
  en: [
    {
      name: 'Aggelos Rentals',
      role: 'Rent-a-car, Paros',
      text: 'Our new site handles fleet browsing and island SEO properly - bookings come directly instead of only through aggregators.',
    },
    {
      name: 'Villa Olivia Clara',
      role: 'Luxury villa, Greece',
      text: 'The design matches our brand and ranks for international villa searches. Inquiry quality improved within the first season.',
    },
    {
      name: 'Discover Cyclades',
      role: 'Travel guide',
      text: 'Content hubs and internal linking brought steady organic growth across island pages - exactly the architecture we needed.',
    },
  ],
  el: [
    {
      name: 'Aggelos Rentals',
      role: 'Ενοικίαση αυτοκινήτου, Πάρος',
      text: 'Η νέα ιστοσελίδα δείχνει τον στόλο σωστά και κατατάσσεται για αναζητήσεις στο νησί - περισσότερες άμεσες κρατήσεις.',
    },
    {
      name: 'Villa Olivia Clara',
      role: 'Πολυτελής βίλα',
      text: 'Σχεδιασμός που ταιριάζει στο brand μας και κατάταξη για διεθνείς αναζητήσεις. Καλύτερα αιτήματα από την πρώτη σεζόν.',
    },
    {
      name: 'Discover Cyclades',
      role: 'Ταξιδιωτικός οδηγός',
      text: 'Οι θεματικοί κόμβοι και η εσωτερική διασύνδεση έφεραν σταθερή οργανική ανάπτυξη στις σελίδες των νησιών.',
    },
  ],
};

/** Live, featured projects shown in the homepage work rail, in order. */
export const HOME_WORK_SLUGS = [
  'discover-cyclades',
  'hotels-santorini',
  'villa-olivia-clara',
  'aggelos-rentals',
  'mykonos-luxury',
  'navos-ai',
] as const;

/** Answer engines the platform tracks. Marks are used nominatively. */
export interface HomeEngine {
  readonly id: 'chatgpt' | 'perplexity' | 'gemini' | 'aio';
  readonly name: string;
  readonly mark?: string;
  /** Fallback glyph colour when no mark is available. */
  readonly tone: string;
}

export const HOME_ENGINES: readonly HomeEngine[] = [
  { id: 'chatgpt', name: 'ChatGPT', mark: '/logos/assets/openai.webp', tone: 'oklch(0.85 0.05 160)' },
  { id: 'perplexity', name: 'Perplexity', mark: '/logos/assets/perplexity.png', tone: 'oklch(0.8 0.1 200)' },
  { id: 'gemini', name: 'Gemini', tone: 'oklch(0.75 0.16 285)' },
  { id: 'aio', name: 'Google AI Overviews', tone: 'oklch(0.8 0.15 70)' },
];

/**
 * Sample prompts for the answer-engine panel. The panel is a demonstration of
 * the platform's tracking view for a hypothetical tourism client, labelled as
 * a sample - no figure here is presented as an outcome for any real business.
 */
export interface HomePromptSample {
  readonly prompt: string;
  readonly domain: string;
  readonly cited: Record<HomeEngine['id'], boolean>;
}

export const HOME_PROMPT_SAMPLES: Record<'en' | 'el', readonly HomePromptSample[]> = {
  en: [
    {
      prompt: 'boutique hotel in Paros near the port',
      domain: 'your-hotel.gr',
      cited: { chatgpt: true, perplexity: true, gemini: true, aio: false },
    },
    {
      prompt: 'rent a car Antiparos ferry pickup',
      domain: 'your-rentals.gr',
      cited: { chatgpt: true, perplexity: false, gemini: true, aio: true },
    },
    {
      prompt: 'Crete storytelling tours small group',
      domain: 'your-tours.gr',
      cited: { chatgpt: true, perplexity: true, gemini: false, aio: true },
    },
  ],
  el: [
    {
      prompt: 'boutique ξενοδοχείο Πάρος κοντά στο λιμάνι',
      domain: 'your-hotel.gr',
      cited: { chatgpt: true, perplexity: true, gemini: true, aio: false },
    },
    {
      prompt: 'ενοικίαση αυτοκινήτου Αντίπαρος παραλαβή στο λιμάνι',
      domain: 'your-rentals.gr',
      cited: { chatgpt: true, perplexity: false, gemini: true, aio: true },
    },
    {
      prompt: 'εκδρομές Κρήτη μικρά γκρουπ',
      domain: 'your-tours.gr',
      cited: { chatgpt: true, perplexity: true, gemini: false, aio: true },
    },
  ],
};
