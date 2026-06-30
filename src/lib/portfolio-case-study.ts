import {
  PORTFOLIO_CATEGORIES,
  type PortfolioProject,
} from '@/data/portfolio';
import type { SiteLocale } from '@/lib/i18n/locale';

export interface CaseStudySection {
  title: string;
  items: string[];
}

export interface ProjectCaseStudy {
  overview: string;
  challenge: string;
  approach: string;
  seo: CaseStudySection;
  geoAeo: CaseStudySection;
  technical: CaseStudySection;
  content: CaseStudySection;
  outcomes: string[];
}

const CATEGORY_SEO: Record<
  PortfolioProject['category'],
  { en: string[]; el: string[] }
> = {
  'rent-a-car': {
    en: [
      'Island and airport pickup keyword clusters (e.g. “rent a car Paros”, “car rental port”)',
      'Fleet category pages with unique titles, meta descriptions and H1 per vehicle class',
      'LocalBusiness + AutoRental schema with geo coordinates and opening hours',
      'Internal linking between fleet, FAQ, terms and location landing pages',
      'Multilingual hreflang for EN/EL tourist search intent',
    ],
    el: [
      'Keyword clusters για νησιά, αεροδρόμια και λιμάνια (π.χ. «ενοικίαση αυτοκινήτου Πάρος»)',
      'Σελίδες στόλου με μοναδικά title, meta description και H1 ανά κατηγορία οχήματος',
      'LocalBusiness + AutoRental schema με συντεταγμένες και ωράριο',
      'Εσωτερική σύνδεση fleet, FAQ, όροι και τοπικές landing pages',
      'Hreflang EN/EL για αναζητήσεις τουριστών',
    ],
  },
  hotel: {
    en: [
      'Room-type and amenity landing pages targeting branded + “hotel in [destination]” queries',
      'LodgingBusiness / Hotel schema with offers, check-in times and geo',
      'Image alt text and gallery structure for Google Images and Discover',
      'Direct booking CTA paths to reduce OTA dependency in organic funnels',
      'Seasonal content hubs linked from homepage and navigation',
    ],
    el: [
      'Landing pages ανά τύπο δωματίου και παροχές για branded + «ξενοδοχείο [προορισμός]»',
      'LodgingBusiness / Hotel schema με προσφορές, check-in και geo',
      'Alt κειμένα εικόνων και gallery για Google Images',
      'CTA άμεσης κράτησης για μείωση εξάρτησης από OTAs',
      'Seasonal content hubs από αρχική και menu',
    ],
  },
  villa: {
    en: [
      'Luxury villa keyword targeting for international English queries',
      'VacationRental / LodgingBusiness schema with capacity and amenities',
      'High-intent inquiry forms above the fold on mobile',
      'Photo-rich pages with WebP delivery and lazy loading below fold',
      'Cross-linking between properties when portfolio spans multiple units',
    ],
    el: [
      'Στόχευση luxury villa keywords για διεθνές EN/EL κοινό',
      'VacationRental schema με χωρητικότητα και παροχές',
      'Φόρμες αιτήματος above the fold σε mobile',
      'WebP galleries με lazy loading',
      'Cross-linking μεταξύ properties στο ίδιο portfolio',
    ],
  },
  tours: {
    en: [
      'Destination hub architecture with island/region silos and excursion child pages',
      'TouristTrip / Event schema where applicable for rich results',
      'FAQ blocks targeting “things to do”, “best tours” and long-tail questions',
      'Content clusters for internal PageRank flow to money pages',
      'Blog and guide articles supporting transactional landing pages',
    ],
    el: [
      'Hub αρχιτεκτονική ανά νησί/περιοχή με child pages εκδρομών',
      'TouristTrip / Event schema όπου εφαρμόζεται',
      'FAQ blocks για «τι να κάνω», «καλύτερες εκδρομές»',
      'Content clusters για ροή PageRank σε money pages',
      'Blog/οδηγοί που υποστηρίζουν transactional σελίδες',
    ],
  },
  transfers: {
    en: [
      'Airport/port transfer keyword pages with route-specific copy',
      'LocalBusiness + Service schema for VIP and transfer offerings',
      'Click-to-call and WhatsApp CTAs optimized for mobile SERP',
      'Trust signals: fleet, licenses, reviews and service area markup',
      'City-pair landing pages (e.g. airport → hotel zones)',
    ],
    el: [
      'Σελίδες keywords για μεταφορές αεροδρομίου/λιμανιού ανά διαδρομή',
      'LocalBusiness + Service schema για VIP/transfers',
      'Click-to-call και WhatsApp CTAs για mobile SERP',
      'Trust signals: στόλος, άδειες, κριτικές, service area',
      'Landing pages ανά ζεύγος πόλεων (αεροδρόμιο → ζώνη ξενοδοχείων)',
    ],
  },
  'travel-ai': {
    en: [
      'Entity-rich About and product pages for brand + category discovery',
      'SoftwareApplication / Organization schema for AI product clarity',
      'Documentation and use-case pages structured for AI citation (AEO)',
      'FAQ and HowTo schema for answer-engine snippets',
      'Technical blog content targeting “travel AI”, “tourism chatbot” queries',
    ],
    el: [
      'Entity-rich About/product pages για brand discovery',
      'SoftwareApplication / Organization schema για AI προϊόν',
      'Documentation/use-case σελίδες για AI citations (AEO)',
      'FAQ και HowTo schema για answer snippets',
      'Technical blog για «travel AI», «tourism chatbot»',
    ],
  },
  restaurant: {
    en: [
      'Menu and reservation intent keywords with Restaurant schema',
      'Local pack alignment: NAP consistency and GBP category mapping',
      'Food photography optimization with descriptive alt and filenames',
      'Seasonal/event pages (weddings, private dining) as supporting clusters',
      'Review and social proof modules near conversion points',
    ],
    el: [
      'Keywords μενού/κράτησης με Restaurant schema',
      'Local pack: NAP consistency και GBP categories',
      'Βελτιστοποίηση φωτογραφιών φαγητού με alt και filenames',
      'Seasonal/event pages (γάμοι, private dining)',
      'Social proof κοντά σε CTAs κράτησης',
    ],
  },
  other: {
    en: [
      'Service-page architecture mapped to primary commercial keywords',
      'Organization + WebSite schema with SearchAction where relevant',
      'On-page SEO: titles, metas, heading hierarchy and canonical tags',
      'Core Web Vitals pass on mobile for ranking stability',
      'Conversion path clarity from organic landing to lead capture',
    ],
    el: [
      'Αρχιτεκτονική service pages ανά commercial keywords',
      'Organization + WebSite schema με SearchAction όπου χρειάζεται',
      'On-page SEO: titles, metas, headings, canonicals',
      'Core Web Vitals pass σε mobile',
      'Καθαρό conversion path από organic σε lead capture',
    ],
  },
};

const GEO_AEO: { en: string[]; el: string[] } = {
  en: [
    'Structured FAQ and Q&A blocks formatted for LLM extraction',
    'Clear entity statements (brand, location, services) in first paragraphs',
    'Schema.org markup for Organization, WebSite and relevant business types',
    'Authoritative “about” and “how it works” pages for citation-worthy summaries',
    'Comparison and pricing transparency sections where appropriate for AI answers',
  ],
  el: [
    'Δομημένα FAQ/Q&A blocks για εξαγωγή από LLMs',
    'Σαφείς entity δηλώσεις (brand, τοποθεσία, υπηρεσίες) στην αρχή κειμένου',
    'Schema.org για Organization, WebSite και business types',
    'Σελίδες «σχετικά» και «πώς λειτουργεί» για AI citations',
    'Διαφάνεια τιμών/σύγκρισης όπου βοηθά τα AI answers',
  ],
};

const TECHNICAL: { en: string[]; el: string[] } = {
  en: [
    'Mobile-first responsive layout with accessible navigation',
    'Optimized LCP via hero image compression and font loading strategy',
    'Clean URL structure, XML sitemap and robots.txt configuration',
    'Security headers, HTTPS and form spam protection',
    'Analytics and Search Console integration from launch',
  ],
  el: [
    'Mobile-first responsive layout με accessible navigation',
    'Βελτιστοποίηση LCP (hero images, fonts)',
    'Καθαρά URLs, XML sitemap και robots.txt',
    'HTTPS, security headers και anti-spam φόρμες',
    'Analytics και Search Console από το launch',
  ],
};

const CONTENT: { en: string[]; el: string[] } = {
  en: [
    'Conversion-focused copy for bookings, quotes and contact intents',
    'Trust modules: testimonials, certifications and partner logos',
    'Multilingual content strategy aligned with target markets',
    'Internal linking from blogs/guides to commercial pages',
    'Ongoing content recommendations documented for the client team',
  ],
  el: [
    'Copy με επίκεντρο κρατήσεις, προσφορές και επικοινωνία',
    'Trust modules: testimonials, πιστοποιήσεις, logos',
    'Πολύγλωσση content strategy ανά αγορές',
    'Internal linking από blog/οδηγούς σε commercial pages',
    'Οδηγίες ongoing content για την ομάδα του πελάτη',
  ],
};

function serviceLabels(slug: string, isEl: boolean): string {
  const map: Record<string, { en: string; el: string }> = {
    'website-creation': { en: 'custom website build', el: 'κατασκευή ιστοσελίδας' },
    'website-redesign': { en: 'website redesign', el: 'redesign ιστοσελίδας' },
    'seo-web-design': { en: 'SEO web design', el: 'SEO web design' },
    'speed-optimization': { en: 'speed optimization', el: 'βελτιστοποίηση ταχύτητας' },
    'ai-visibility': { en: 'GEO/AEO visibility', el: 'GEO/AEO ορατότητα' },
    'local-seo': { en: 'local SEO', el: 'τοπικό SEO' },
    'content-creation': { en: 'content creation', el: 'δημιουργία περιεχομένου' },
    'link-building': { en: 'link building', el: 'link building' },
    'seo-audits': { en: 'technical SEO audit', el: 'τεχνικό SEO audit' },
    'logo-design': { en: 'brand/logo design', el: 'branding/logo' },
  };
  return map[slug]?.[isEl ? 'el' : 'en'] ?? slug.replace(/-/g, ' ');
}

export function buildProjectCaseStudy(
  project: PortfolioProject,
  locale: SiteLocale = 'en',
): ProjectCaseStudy {
  const isEl = locale === 'el';
  const cat = PORTFOLIO_CATEGORIES[project.category];
  const catLabel = isEl ? cat.labelEl : cat.label;
  const markets = project.markets.join(', ');
  const langs = project.languages.map((l) => l.toUpperCase()).join(' / ');
  const serviceList = project.services.map((s) => serviceLabels(s, isEl)).join(', ');
  const name = project.name;
  const summary = isEl && project.summaryEl ? project.summaryEl : project.summary;

  const overview = isEl
    ? `${name} είναι live ${catLabel.toLowerCase()} project για αγορές ${markets}, σε ${langs}. Παραδώσαμε ${serviceList} με επίκεντρο οργανική κίνηση, κρατήσεις και ορατότητα σε Google και AI απαντήσεις.`
    : `${name} is a live ${catLabel.toLowerCase()} project serving ${markets} markets in ${langs}. We delivered ${serviceList} focused on organic traffic, bookings and visibility across Google and AI answer engines.`;

  const challenge = isEl
    ? `Ο πελάτης χρειαζόταν ιστοσελίδα που να εμπιστεύονται οι ταξιδιώτες, να rankάρει για competitive tourism keywords και να μετατρέπει επισκέψεις σε κρατήσεις ή αιτήματα - χωρίς να εξαρτάται μόνο από OTAs ή aggregators.`
    : `The client needed a site tourists trust, that ranks for competitive tourism keywords and converts visits into bookings or inquiries - without relying solely on OTAs or aggregators.`;

  const approach = isEl
    ? `Σχεδιάσαμε mobile-first UX για ${catLabel.toLowerCase()}, υλοποιήσαμε τεχνικό SEO από την αρχή και δομήσαμε περιεχόμενο για local, GEO και AEO. ${summary}`
    : `We designed mobile-first UX for ${catLabel.toLowerCase()}, implemented technical SEO from day one and structured content for local, GEO and AEO discovery. ${summary}`;

  const seoItems = [...CATEGORY_SEO[project.category][isEl ? 'el' : 'en']];
  if (project.seoTitle) {
    seoItems.unshift(
      isEl
        ? `Live title tag audit: «${project.seoTitle}»`
        : `Live title tag: "${project.seoTitle}"`,
    );
  }
  if (project.seoDescription) {
    seoItems.push(
      isEl
        ? `Meta description βελτιστοποιημένη για CTR: ${project.seoDescription.slice(0, 120)}…`
        : `Meta description optimized for CTR: ${project.seoDescription.slice(0, 120)}…`,
    );
  }

  const outcomes =
    project.results && project.results.length > 0
      ? project.results
      : isEl
        ? [
            'SEO-ready αρχιτεκτονική από την 1η μέρα του launch',
            'Schema markup για rich results και local discovery',
            'Mobile-first UX για τουρίστες που κλείνουν από κινητό',
            'Δομή περιεχομένου για GEO/AEO και μελλοντική ανάπτυξη',
          ]
        : [
            'SEO-ready architecture from day one of launch',
            'Schema markup for rich results and local discovery',
            'Mobile-first UX for tourists booking on phones',
            'Content structure prepared for GEO/AEO growth',
          ];

  return {
    overview,
    challenge,
    approach,
    seo: {
      title: isEl ? 'SEO - Τεχνικό & On-page' : 'SEO - Technical & On-page',
      items: seoItems,
    },
    geoAeo: {
      title: isEl ? 'GEO & AEO - AI αναζήτηση' : 'GEO & AEO - AI search',
      items: GEO_AEO[isEl ? 'el' : 'en'],
    },
    technical: {
      title: isEl ? 'Τεχνική υλοποίηση' : 'Technical delivery',
      items: TECHNICAL[isEl ? 'el' : 'en'],
    },
    content: {
      title: isEl ? 'Περιεχόμενο & μετατροπές' : 'Content & conversions',
      items: CONTENT[isEl ? 'el' : 'en'],
    },
    outcomes,
  };
}
