/**
 * Greek translations for service slugs (programmatic SEO).
 */
export const serviceNamesEl: Record<
  string,
  { name: string; shortName: string; description: string }
> = {
  'website-creation': {
    name: 'Κατασκευή Ιστοσελίδων',
    shortName: 'Ιστοσελίδες',
    description:
      'Γρήγορες, όμορφες ιστοσελίδες με SEO από την πρώτη μέρα. Σχεδιασμός, ανάπτυξη και βελτιστοποίηση για μετατροπές.',
  },
  'website-redesign': {
    name: 'Ανασχεδιασμός Ιστοσελίδας',
    shortName: 'Redesign',
    description:
      'Μετατρέψτε παλιά sites σε σύγχρονα, γρήγορα και φιλικά προς την αναζήτηση — με ασφαλή SEO migration.',
  },
  'seo-web-design': {
    name: 'SEO Web Design',
    shortName: 'SEO Design',
    description:
      'Σχεδιασμός με τεχνικό SEO, schema, εσωτερικούς συνδέσμους και αρχιτεκτονική που κατατάσσει.',
  },
  'speed-optimization': {
    name: 'Βελτιστοποίηση Ταχύτητας',
    shortName: 'Ταχύτητα',
    description:
      'Core Web Vitals, caching και βελτιστοποίηση κώδικα για ταχύτερο site και καλύτερες κατατάξεις.',
  },
  'ai-visibility': {
    name: 'Ορατότητα σε AI (GEO/AEO)',
    shortName: 'AI SEO',
    description:
      'Schema, entities και δομημένο περιεχόμενο για ChatGPT, Perplexity, Gemini και παραδοσιακή αναζήτηση.',
  },
  'logo-design': {
    name: 'Σχεδιασμός Λογοτύπου',
    shortName: 'Branding',
    description: 'Επαγγελματικό λογότυπο και brand kit για αναγνωρισιμότητα στην αγορά σας.',
  },
  'content-creation': {
    name: 'Δημιουργία Περιεχομένου',
    shortName: 'Content',
    description:
      'SEO copy για σελίδες υπηρεσιών, τοπικές σελίδες και blog που φέρνουν οργανική κίνηση.',
  },
  'local-seo': {
    name: 'Τοπικό SEO & Google Business',
    shortName: 'Local SEO',
    description:
      'Βελτιστοποίηση Google Business Profile, citations και στρατηγική για τοπικές αναζητήσεις.',
  },
  'link-building': {
    name: 'Link Building',
    shortName: 'Backlinks',
    description: 'White-hat backlinks, digital PR και niche edits για αύξηση domain authority.',
  },
  'seo-audits': {
    name: 'Τεχνικό SEO Audit',
    shortName: 'Audits',
    description:
      'Πλήρες τεχνικό audit: crawlability, indexation, Core Web Vitals και ανάλυση ανταγωνισμού.',
  },
};

export function getServiceEl(slug: string) {
  return serviceNamesEl[slug];
}
