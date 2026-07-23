/**
 * Commercial body copy for money service hubs (definition, process, pricing, audience).
 */

export type ServiceHubCommercial = {
  definition: string;
  processTitle: string;
  process: string[];
  pricingTeaser: string;
  audienceTitle: string;
  audience: string;
};

const MONEY_SLUGS = [
  'seo-audits',
  'local-seo',
  'eshop-woocommerce',
  'ai-visibility',
] as const;

export type MoneyServiceSlug = (typeof MONEY_SLUGS)[number];

export function isMoneyServiceSlug(slug: string): slug is MoneyServiceSlug {
  return (MONEY_SLUGS as readonly string[]).includes(slug);
}

const COMMERCIAL: Record<MoneyServiceSlug, { en: ServiceHubCommercial; el: ServiceHubCommercial }> = {
  'seo-audits': {
    en: {
      definition:
        'An SEO audit is a prioritized review of technical health, on-page relevance, and competitive gaps — so you know what to fix first to unlock rankings. We pair crawl findings with Search Console data and a clear fix roadmap, not a 100-page PDF you’ll never use.',
      processTitle: 'How our SEO audit works',
      process: [
        'Crawl + indexation review (robots, sitemaps, canonicals, soft 404s)',
        'Core Web Vitals and mobile UX pass',
        'On-page and internal-link gaps on money pages',
        'Competitor SERP snapshot and quick-win keyword list',
        'Prioritized roadmap you can execute in-house or with our retainer',
      ],
      pricingTeaser:
        'One-shot audits typically start in the €300–€800 range; ongoing technical + growth work sits in monthly SEO packages from €299/mo. See Pricing for transparent bands.',
      audienceTitle: 'Who this is for',
      audience:
        'Sites stuck on page 2–3, redesigns that lost traffic, and teams that want a clear technical baseline before a retainer.',
    },
    el: {
      definition:
        'Το SEO audit είναι προτεραιοποιημένος έλεγχος τεχνικής υγείας, on-page και ανταγωνισμού — ώστε να ξέρετε τι να διορθώσετε πρώτα για να ξεκλειδώσουν οι κατατάξεις. Συνδυάζουμε crawl με δεδομένα Search Console και καθαρό πλάνο ενεργειών, όχι PDF 100 σελίδων που δεν θα διαβάσετε ποτέ.',
      processTitle: 'Πώς δουλεύει ο τεχνικός έλεγχος',
      process: [
        'Crawl & ευρετηρίαση (robots, sitemaps, canonicals, soft 404)',
        'Έλεγχος Core Web Vitals και mobile UX',
        'Κενά on-page και εσωτερικής σύνδεσης στις money pages',
        'Στιγμιότυπο SERP ανταγωνιστών και λίστα γρήγορων wins',
        'Προτεραιοποιημένο roadmap για in-house ή retainer',
      ],
      pricingTeaser:
        'Εφάπαξ audits συνήθως €300–€800· η συνεχής τεχνική + ανάπτυξη καλύπτεται από μηνιαία πακέτα από €299/μήνα. Δείτε τις Τιμές για διαφανή εύρη.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Sites κολλημένα στη 2η–3η σελίδα, redesigns που έχασαν traffic, και ομάδες που θέλουν καθαρή τεχνική βάση πριν από retainer.',
    },
  },
  'local-seo': {
    en: {
      definition:
        'Local SEO is how you win Google’s map pack and “near me” results: Google Business Profile, NAP consistency, reviews, citations, and city/service pages that match real local intent.',
      processTitle: 'Local SEO process',
      process: [
        'GBP audit (categories, services, photos, Q&A, posts)',
        'NAP cleanup and priority citation builds',
        'Review acquisition playbook',
        'Location / service landing pages with local schema',
        'Monthly rank + call/direction tracking',
      ],
      pricingTeaser:
        'Local SEO retainers start at €299/mo (Starter). Growth and multi-location plans scale from there — all in EUR on Pricing.',
      audienceTitle: 'Who this is for',
      audience:
        'Clinics, law firms, hotels, rent-a-car, restaurants, and multi-location brands that need map pack visibility in Greece and abroad.',
    },
    el: {
      definition:
        'Το τοπικό SEO είναι πώς κερδίζετε το map pack και τις αναζητήσεις «κοντά μου»: Google Business Profile, συνεπές NAP, κριτικές, citations και σελίδες πόλης/υπηρεσίας που ταιριάζουν σε πραγματική τοπική πρόθεση.',
      processTitle: 'Διαδικασία τοπικού SEO',
      process: [
        'Έλεγχος GBP (κατηγορίες, υπηρεσίες, φωτογραφίες, Q&A, posts)',
        'Καθαρισμός NAP και βασικές citations',
        'Πλάνο απόκτησης κριτικών',
        'Landing pages πόλης/υπηρεσίας με τοπικό schema',
        'Μηνιαία παρακολούθηση θέσεων, κλήσεων και κατευθύνσεων',
      ],
      pricingTeaser:
        'Τα πακέτα τοπικού SEO ξεκινούν από €299/μήνα (Starter). Growth και multi-location κλιμακώνονται ανάλογα — όλα σε ευρώ στη σελίδα Τιμές.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Ιατρεία, δικηγόροι, ξενοδοχεία, rent-a-car, εστίαση και brands με πολλά σημεία που χρειάζονται map pack στην Ελλάδα και στο εξωτερικό.',
    },
  },
  'eshop-woocommerce': {
    en: {
      definition:
        'A WooCommerce e-shop is a sales system — catalog structure, payments, shipping, trust, and SEO category architecture — not just a theme with a cart. We build stores that can rank and convert from day one.',
      processTitle: 'How we build your e-shop',
      process: [
        'Catalog IA: categories and URLs mapped to search demand',
        'Design + product templates built for conversion',
        'Greek-ready payments, VAT checkout, and shipping zones',
        'Technical SEO, Product schema, and Core Web Vitals',
        'Launch checklist, training, and optional e-shop SEO retainer',
      ],
      pricingTeaser:
        'E-commerce builds typically start from the Professional package (€1,799) with e-commerce setup, or a scoped Business build. See Pricing and request a quote for catalog size.',
      audienceTitle: 'Who this is for',
      audience:
        'Greek retailers who need WooCommerce ownership, local payments/couriers, and SEO-ready category structure — not a locked SaaS theme.',
    },
    el: {
      definition:
        'Ένα e-shop WooCommerce είναι σύστημα πωλήσεων — δομή καταλόγου, πληρωμές, μεταφορικά, εμπιστοσύνη και SEO κατηγοριών — όχι απλά ένα θέμα με καλάθι. Χτίζουμε καταστήματα που κατατάσσονται και μετατρέπουν από την 1η μέρα.',
      processTitle: 'Πώς χτίζουμε το e-shop σας',
      process: [
        'Αρχιτεκτονική καταλόγου: κατηγορίες και URLs με βάση ζήτηση αναζήτησης',
        'Σχεδιασμός + templates προϊόντων για μετατροπή',
        'Ελληνικές πληρωμές, checkout με ΦΠΑ και ζώνες αποστολής',
        'Τεχνικό SEO, Product schema και Core Web Vitals',
        'Launch checklist, εκπαίδευση και προαιρετικό e-shop SEO retainer',
      ],
      pricingTeaser:
        'Τα e-shops ξεκινούν συνήθως από το Professional (€1.799) με e-commerce setup, ή ως scoped Business. Δείτε Τιμές και ζητήστε προσφορά ανάλογα με τον κατάλογο.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Έλληνες retailers που θέλουν ιδιοκτησία WooCommerce, τοπικές πληρωμές/courier και SEO δομή κατηγοριών — όχι κλειδωμένο SaaS θέμα.',
    },
  },
  'ai-visibility': {
    en: {
      definition:
        'AI Visibility (GEO/AEO) is how brands get cited in ChatGPT, Perplexity, and Google AI Overviews — with entities, schema, and answer-shaped content — not just classic blue-link rankings.',
      processTitle: 'GEO / AEO process',
      process: [
        'Entity and brand consistency audit',
        'Citation-ready service and FAQ pages',
        'Schema + structured definitions for AI parsers',
        'Prompt / mention monitoring for priority queries',
        'Monthly iteration tied to Search Console + AI mentions',
      ],
      pricingTeaser:
        'AI visibility work is delivered inside Growth/Scale SEO retainers or as a scoped add-on. Packages from €299/mo — details on Pricing.',
      audienceTitle: 'Who this is for',
      audience:
        'Tourism, hospitality, and local brands that already rank in Google and want to show up when buyers ask AI assistants for recommendations.',
    },
    el: {
      definition:
        'Η AI Visibility (GEO/AEO) είναι πώς εμφανίζεται η μάρκα σας σε ChatGPT, Perplexity και Google AI Overviews — με οντότητες, schema και περιεχόμενο σε μορφή απάντησης — όχι μόνο με κλασικά blue links.',
      processTitle: 'Διαδικασία GEO / AEO',
      process: [
        'Έλεγχος οντοτήτων και συνέπειας brand',
        'Citation-ready σελίδες υπηρεσιών και FAQ',
        'Schema + δομημένοι ορισμοί για AI parsers',
        'Παρακολούθηση prompts / mentions σε κρίσιμα queries',
        'Μηνιαία επανάληψη με Search Console + AI mentions',
      ],
      pricingTeaser:
        'Η εργασία AI visibility παραδίδεται μέσα σε Growth/Scale SEO retainers ή ως scoped add-on. Πακέτα από €299/μήνα — λεπτομέρειες στις Τιμές.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Τουρισμός, φιλοξενία και τοπικά brands που ήδη κατατάσσονται στη Google και θέλουν να εμφανίζονται όταν οι αγοραστές ρωτούν AI βοηθούς.',
    },
  },
};

export function getServiceHubCommercial(
  slug: string,
  locale: 'en' | 'el'
): ServiceHubCommercial | null {
  if (!isMoneyServiceSlug(slug)) return null;
  return COMMERCIAL[slug][locale];
}
