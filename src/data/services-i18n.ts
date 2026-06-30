/**
 * Greek translations for service slugs (programmatic SEO).
 */
export const serviceNamesEl: Record<
  string,
  { name: string; shortName: string; description: string; features?: string[] }
> = {
  'website-creation': {
    name: 'Κατασκευή Ιστοσελίδων',
    shortName: 'Ιστοσελίδες',
    description:
      'Γρήγορες, όμορφες ιστοσελίδες με SEO από την πρώτη μέρα. Σχεδιασμός, ανάπτυξη και βελτιστοποίηση για μετατροπές.',
    features: [
      'Custom UX/UI design',
      'Γρήγορες σελίδες',
      'Mobile-first responsive',
      'Βελτιστοποίηση απόδοσης',
      'SEO foundations included',
      'Ρύθμιση analytics',
    ],
  },
  'website-redesign': {
    name: 'Ανασχεδιασμός Ιστοσελίδας',
    shortName: 'Redesign',
    description:
      'Μετατρέψτε παλιά sites σε σύγχρονα, γρήγορα και φιλικά προς την αναζήτηση — με ασφαλή SEO migration.',
    features: [
      'Βελτιστοποίηση ταχύτητας',
      'Σύγχρονο UI refresh',
      'SEO migration',
      'Αναδόμηση περιεχομένου',
      'Mobile optimization',
      'Performance audit',
    ],
  },
  'seo-web-design': {
    name: 'SEO Web Design',
    shortName: 'SEO Design',
    description:
      'Σχεδιασμός με τεχνικό SEO, schema, εσωτερικούς συνδέσμους και αρχιτεκτονική που κατατάσσει.',
    features: [
      'Τεχνικό SEO audit',
      'Schema markup',
      'Internal linking strategy',
      'Site architecture',
      'Meta optimization',
      'Βελτιστοποίηση ταχύτητας',
    ],
  },
  'speed-optimization': {
    name: 'Βελτιστοποίηση Ταχύτητας',
    shortName: 'Ταχύτητα',
    description:
      'Core Web Vitals, caching και βελτιστοποίηση κώδικα για ταχύτερο site και καλύτερες κατατάξεις.',
    features: [
      'Performance audit',
      'Βελτιστοποίηση load time',
      'Βελτιστοποίηση εικόνων',
      'Ταχύτητα mobile',
      'Caching setup',
      'Βελτιστοποίηση κώδικα',
    ],
  },
  'ai-visibility': {
    name: 'Ορατότητα σε AI (GEO/AEO)',
    shortName: 'AI SEO',
    description:
      'Schema, entities και δομημένο περιεχόμενο για ChatGPT, Perplexity, Gemini και παραδοσιακή αναζήτηση.',
    features: [
      'Schema implementation',
      'Entity optimization',
      'Knowledge graph setup',
      'Structured content',
      'AI-friendly architecture',
      'Citation optimization',
    ],
  },
  'logo-design': {
    name: 'Σχεδιασμός Λογοτύπου',
    shortName: 'Branding',
    description: 'Επαγγελματικό λογότυπο και brand kit για αναγνωρισιμότητα στην αγορά σας.',
    features: [
      'Custom logo design',
      'Brand kit',
      'Color palette',
      'Typography',
      'Brand guidelines',
      'Πολλαπλά formats',
    ],
  },
  'content-creation': {
    name: 'Δημιουργία Περιεχομένου',
    shortName: 'Content',
    description:
      'SEO copy για σελίδες υπηρεσιών, τοπικές σελίδες και blog που φέρνουν οργανική κίνηση.',
    features: [
      'SEO copywriting',
      'Service page content',
      'Τοπικό περιεχόμενο',
      'Blog άρθρα',
      'Conversion copy',
      'Content strategy',
    ],
  },
  'local-seo': {
    name: 'Τοπικό SEO & Google Business',
    shortName: 'Local SEO',
    description:
      'Βελτιστοποίηση Google Business Profile, citations και στρατηγική για τοπικές αναζητήσεις.',
    features: [
      'GBP optimization',
      'Local citations',
      'Review strategy',
      'Τοπικά keywords',
      'Map pack ranking',
      'Neighborhood targeting',
    ],
  },
  'link-building': {
    name: 'Link Building',
    shortName: 'Backlinks',
    description: 'White-hat backlinks, digital PR και niche edits για αύξηση domain authority.',
    features: [
      'Guest posts υψηλής DA',
      'Niche relevant links',
      'Digital PR',
      'Broken link building',
      'Anchor text strategy',
      'Spam monitoring',
    ],
  },
  'seo-audits': {
    name: 'Τεχνικό SEO Audit',
    shortName: 'Audits',
    description:
      'Πλήρες τεχνικό audit: crawlability, indexation, Core Web Vitals και ανάλυση ανταγωνισμού.',
    features: [
      'Τεχνικός έλεγχος',
      'Core Web Vitals',
      'Crawl budget',
      'Internal linking audit',
      'Competitor gap analysis',
      'Penalty recovery',
    ],
  },
};

export function getServiceEl(slug: string) {
  return serviceNamesEl[slug];
}
