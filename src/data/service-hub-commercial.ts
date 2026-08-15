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
        'An SEO audit is a prioritized review of technical health, on-page relevance, and competitive gaps, so you know what to fix first to unlock rankings. We pair crawl findings with Search Console data and a clear fix roadmap, not a 100-page PDF you’ll never use.',
      processTitle: 'How our SEO audit works',
      process: [
        'Crawl + indexation review (robots, sitemaps, canonicals, soft 404s)',
        'Core Web Vitals and mobile UX pass',
        'On-page and internal-link gaps on money pages',
        'Competitor SERP snapshot and quick-win keyword list',
        'Prioritized roadmap you can execute in-house or with our retainer',
      ],
      pricingTeaser:
        'Pricing and packages are on the pricing page, with 24% VAT shown separately. Final scope follows the project.',
      audienceTitle: 'Who this is for',
      audience:
        'Sites stuck on page 2–3, redesigns that lost traffic, and teams that want a clear technical baseline before a retainer.',
    },
    el: {
      definition:
        'Το SEO audit είναι προτεραιοποιημένος έλεγχος τεχνικής υγείας, on-page και ανταγωνισμού, ώστε να ξέρετε τι να διορθώσετε πρώτα για να ξεκλειδώσουν οι κατατάξεις. Συνδυάζουμε crawl με δεδομένα Search Console και καθαρό πλάνο ενεργειών, όχι PDF 100 σελίδων που δεν θα διαβάσετε ποτέ.',
      processTitle: 'Πώς δουλεύει ο τεχνικός έλεγχος',
      process: [
        'Crawl & ευρετηρίαση (robots, sitemaps, canonicals, soft 404)',
        'Έλεγχος Core Web Vitals και mobile UX',
        'Κενά on-page και εσωτερικής σύνδεσης στις money pages',
        'Στιγμιότυπο SERP ανταγωνιστών και λίστα γρήγορων wins',
        'Προτεραιοποιημένο roadmap για in-house ή retainer',
      ],
      pricingTeaser:
        'Οι τιμές και τα πακέτα βρίσκονται στη σελίδα τιμών, με τον ΦΠΑ 24% να εμφανίζεται ξεχωριστά. Το τελικό εύρος προκύπτει από το project.',
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
        'Pricing and packages are on the pricing page, with 24% VAT shown separately. Final scope follows the project.',
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
        'Οι τιμές και τα πακέτα βρίσκονται στη σελίδα τιμών, με τον ΦΠΑ 24% να εμφανίζεται ξεχωριστά. Το τελικό εύρος προκύπτει από το project.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Ιατρεία, δικηγόροι, ξενοδοχεία, rent-a-car, εστίαση και brands με πολλά σημεία που χρειάζονται map pack στην Ελλάδα και στο εξωτερικό.',
    },
  },
  'eshop-woocommerce': {
    en: {
      definition:
        'A WooCommerce e-shop is a sales system, catalog structure, payments, shipping, trust, and SEO category architecture, not just a theme with a cart. We build stores that can rank and convert from day one.',
      processTitle: 'How we build your e-shop',
      process: [
        'Catalog IA: categories and URLs mapped to search demand',
        'Design + product templates built for conversion',
        'Greek-ready payments, VAT checkout, and shipping zones',
        'Technical SEO, Product schema, and Core Web Vitals',
        'Launch checklist, training, and optional e-shop SEO retainer',
      ],
      pricingTeaser:
        'Pricing and packages are on the pricing page, with 24% VAT shown separately. Final scope follows the project.',
      audienceTitle: 'Who this is for',
      audience:
        'Greek retailers who need WooCommerce ownership, local payments/couriers, and SEO-ready category structure, not a locked SaaS theme.',
    },
    el: {
      definition:
        'Ένα e-shop WooCommerce είναι σύστημα πωλήσεων, δομή καταλόγου, πληρωμές, μεταφορικά, εμπιστοσύνη και SEO κατηγοριών, όχι απλά ένα θέμα με καλάθι. Χτίζουμε καταστήματα που κατατάσσονται και μετατρέπουν από την 1η μέρα.',
      processTitle: 'Πώς χτίζουμε το e-shop σας',
      process: [
        'Αρχιτεκτονική καταλόγου: κατηγορίες και URLs με βάση ζήτηση αναζήτησης',
        'Σχεδιασμός + templates προϊόντων για μετατροπή',
        'Ελληνικές πληρωμές, checkout με ΦΠΑ και ζώνες αποστολής',
        'Τεχνικό SEO, Product schema και Core Web Vitals',
        'Launch checklist, εκπαίδευση και προαιρετικό e-shop SEO retainer',
      ],
      pricingTeaser:
        'Οι τιμές και τα πακέτα βρίσκονται στη σελίδα τιμών, με τον ΦΠΑ 24% να εμφανίζεται ξεχωριστά. Το τελικό εύρος προκύπτει από το project.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Έλληνες retailers που θέλουν ιδιοκτησία WooCommerce, τοπικές πληρωμές/courier και SEO δομή κατηγοριών, όχι κλειδωμένο SaaS θέμα.',
    },
  },
  'ai-visibility': {
    en: {
      definition:
        'AI Visibility (GEO/AEO) is how brands get cited in ChatGPT, Perplexity, and Google AI Overviews, with entities, schema, and answer-shaped content, not just classic blue-link rankings.',
      processTitle: 'GEO / AEO process',
      process: [
        'Entity and brand consistency audit',
        'Citation-ready service and FAQ pages',
        'Schema + structured definitions for AI parsers',
        'Prompt / mention monitoring for priority queries',
        'Monthly iteration tied to Search Console + AI mentions',
      ],
      pricingTeaser:
        'Pricing and packages are on the pricing page, with 24% VAT shown separately. Final scope follows the project.',
      audienceTitle: 'Who this is for',
      audience:
        'Tourism, hospitality, and local brands that already rank in Google and want to show up when buyers ask AI assistants for recommendations.',
    },
    el: {
      definition:
        'Η AI Visibility (GEO/AEO) είναι πώς εμφανίζεται η μάρκα σας σε ChatGPT, Perplexity και Google AI Overviews, με οντότητες, schema και περιεχόμενο σε μορφή απάντησης, όχι μόνο με κλασικά blue links.',
      processTitle: 'Διαδικασία GEO / AEO',
      process: [
        'Έλεγχος οντοτήτων και συνέπειας brand',
        'Citation-ready σελίδες υπηρεσιών και FAQ',
        'Schema + δομημένοι ορισμοί για AI parsers',
        'Παρακολούθηση prompts / mentions σε κρίσιμα queries',
        'Μηνιαία επανάληψη με Search Console + AI mentions',
      ],
      pricingTeaser:
        'Οι τιμές και τα πακέτα βρίσκονται στη σελίδα τιμών, με τον ΦΠΑ 24% να εμφανίζεται ξεχωριστά. Το τελικό εύρος προκύπτει από το project.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Τουρισμός, φιλοξενία και τοπικά brands που ήδη κατατάσσονται στη Google και θέλουν να εμφανίζονται όταν οι αγοραστές ρωτούν AI βοηθούς.',
    },
  },
};


/**
 * Commercial bodies for the remaining eight services.
 *
 * `getServiceHubCommercial` previously returned null for anything outside the
 * four "money" slugs, so /services/website-creation and seven others rendered
 * no definition, no process and no audience at all - the most-linked service on
 * the site had the thinnest page.
 *
 * Copy avoids ranking promises and fixed timelines by design; pricing points at
 * /pricing rather than restating figures, so nothing here can drift from
 * `src/data/pricing.ts`.
 */
const ADDITIONAL: Record<string, { en: ServiceHubCommercial; el: ServiceHubCommercial }> = {
  'website-creation': {
    en: {
      definition:
        'A website build that starts from search demand and conversion, not from a template. We map what your market actually searches for, structure the site around it, and build on foundations that technical SEO can work with later.',
      processTitle: 'How a build runs',
      process: [
        'Business, market and competitor analysis',
        'Search demand research and keyword mapping',
        'Information architecture and wireframes',
        'Design and build, mobile-first',
        'Technical SEO, schema and Core Web Vitals',
        'Launch, measurement setup and training',
      ],
      pricingTeaser:
        'Website projects are quoted per project, because scope changes cost. Package tiers and indicative delivery windows are on the pricing page.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses replacing a site that does not bring enquiries, and businesses launching who would rather build on correct foundations than retrofit them.',
    },
    el: {
      definition:
        'Κατασκευή ιστοσελίδας που ξεκινά από τη ζήτηση αναζήτησης και τη μετατροπή, όχι από ένα έτοιμο template. Χαρτογραφούμε τι ψάχνει πραγματικά η αγορά σας, δομούμε το site γύρω από αυτό και χτίζουμε θεμέλια πάνω στα οποία μπορεί να δουλέψει το τεχνικό SEO.',
      processTitle: 'Πώς εξελίσσεται ένα έργο',
      process: [
        'Ανάλυση επιχείρησης, αγοράς και ανταγωνισμού',
        'Έρευνα ζήτησης και αντιστοίχιση λέξεων-κλειδιών',
        'Αρχιτεκτονική πληροφορίας και wireframes',
        'Σχεδιασμός και κατασκευή, mobile-first',
        'Τεχνικό SEO, schema και Core Web Vitals',
        'Δημοσίευση, ρύθμιση μετρήσεων και εκπαίδευση',
      ],
      pricingTeaser:
        'Τα έργα κατασκευής τιμολογούνται ανά project, γιατί το εύρος αλλάζει το κόστος. Τα πακέτα και οι ενδεικτικοί χρόνοι παράδοσης είναι στη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις που αντικαθιστούν ένα site που δεν φέρνει αιτήματα, και σε όσους ξεκινούν και προτιμούν να χτίσουν σωστά από την αρχή.',
    },
  },
  'website-redesign': {
    en: {
      definition:
        'A redesign that does not cost you the rankings you already have. Most traffic losses after a rebuild come from lost URLs, changed structure and dropped content, so migration planning is part of the work, not an afterthought.',
      processTitle: 'How a redesign runs',
      process: [
        'Audit of what currently ranks and why',
        'URL inventory and redirect mapping',
        'Content and structure decisions before design',
        'Design and build on the retained architecture',
        'Pre-launch technical checks',
        'Post-launch monitoring in Search Console',
      ],
      pricingTeaser:
        'Redesign scope depends on the size of the existing site and how much content needs rewriting. Quoted per project.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses with a dated site that still earns traffic, where losing existing visibility during the rebuild is not acceptable.',
    },
    el: {
      definition:
        'Ανασχεδιασμός που δεν σας κοστίζει τις κατατάξεις που ήδη έχετε. Οι περισσότερες απώλειες επισκεψιμότητας μετά από ανακατασκευή προέρχονται από χαμένα URL, αλλαγμένη δομή και περιεχόμενο που αφαιρέθηκε. Γι\' αυτό το πλάνο μετάπτωσης είναι μέρος της δουλειάς.',
      processTitle: 'Πώς εξελίσσεται ένας ανασχεδιασμός',
      process: [
        'Έλεγχος για το τι κατατάσσεται σήμερα και γιατί',
        'Καταγραφή URL και χαρτογράφηση ανακατευθύνσεων',
        'Αποφάσεις περιεχομένου και δομής πριν τον σχεδιασμό',
        'Σχεδιασμός και κατασκευή πάνω στη διατηρούμενη αρχιτεκτονική',
        'Τεχνικοί έλεγχοι πριν τη δημοσίευση',
        'Παρακολούθηση στο Search Console μετά τη δημοσίευση',
      ],
      pricingTeaser:
        'Το εύρος εξαρτάται από το μέγεθος του υπάρχοντος site και από το πόσο περιεχόμενο χρειάζεται ξαναγράψιμο. Τιμολογείται ανά έργο.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις με παλιό site που όμως εξακολουθεί να φέρνει επισκεψιμότητα, όπου η απώλεια ορατότητας κατά την ανακατασκευή δεν είναι αποδεκτή.',
    },
  },
  'seo-web-design': {
    en: {
      definition:
        'Design decisions made with search in mind from the first wireframe: heading structure, internal linking, page speed and crawlable markup, rather than a visual layer that SEO has to fight afterwards.',
      processTitle: 'What this covers',
      process: [
        'Keyword-informed page and heading structure',
        'Internal linking planned at wireframe stage',
        'Performance budgets set before build',
        'Semantic markup and structured data',
        'Conversion paths on the pages that matter',
      ],
      pricingTeaser: 'Delivered as part of a website build. See the pricing page for tiers.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses who have previously paid for a beautiful site that never ranked, and do not want to repeat that.',
    },
    el: {
      definition:
        'Σχεδιαστικές αποφάσεις που λαμβάνουν υπόψη την αναζήτηση από το πρώτο wireframe: δομή επικεφαλίδων, εσωτερική διασύνδεση, ταχύτητα και markup που διαβάζεται, αντί για ένα οπτικό στρώμα με το οποίο θα παλέψει μετά το SEO.',
      processTitle: 'Τι περιλαμβάνει',
      process: [
        'Δομή σελίδων και επικεφαλίδων βάσει λέξεων-κλειδιών',
        'Εσωτερική διασύνδεση σχεδιασμένη από το στάδιο του wireframe',
        'Όρια απόδοσης που ορίζονται πριν την κατασκευή',
        'Σημασιολογικό markup και δομημένα δεδομένα',
        'Διαδρομές μετατροπής στις σελίδες που έχουν σημασία',
      ],
      pricingTeaser: 'Παραδίδεται ως μέρος της κατασκευής. Δείτε τα πακέτα στη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις που έχουν ήδη πληρώσει για ένα όμορφο site που δεν κατατάχθηκε ποτέ και δεν θέλουν να το επαναλάβουν.',
    },
  },
  'speed-optimization': {
    en: {
      definition:
        'Work on Core Web Vitals and real-world load performance: images, fonts, JavaScript, third-party scripts and server response. Speed affects both what users do and what Google can measure.',
      processTitle: 'How we approach it',
      process: [
        'Field and lab measurement of current performance',
        'Identify what actually blocks rendering',
        'Image, font and script optimisation',
        'Third-party script audit',
        'Re-measurement and reporting',
      ],
      pricingTeaser: 'Scoped from the audit findings. See the pricing page for audit tiers.',
      audienceTitle: 'Who this is for',
      audience:
        'Sites failing Core Web Vitals, and e-shops where load time is measurably costing conversions.',
    },
    el: {
      definition:
        'Εργασία στα Core Web Vitals και στην πραγματική ταχύτητα φόρτωσης: εικόνες, γραμματοσειρές, JavaScript, scripts τρίτων και απόκριση διακομιστή. Η ταχύτητα επηρεάζει και τη συμπεριφορά των χρηστών και όσα μπορεί να μετρήσει η Google.',
      processTitle: 'Πώς το προσεγγίζουμε',
      process: [
        'Μέτρηση της τρέχουσας απόδοσης σε πραγματικές συνθήκες και σε εργαστήριο',
        'Εντοπισμός του τι πραγματικά καθυστερεί την εμφάνιση',
        'Βελτιστοποίηση εικόνων, γραμματοσειρών και scripts',
        'Έλεγχος scripts τρίτων',
        'Επαναμέτρηση και αναφορά',
      ],
      pricingTeaser: 'Το εύρος προκύπτει από τα ευρήματα του ελέγχου. Δείτε τα πακέτα ελέγχου στη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε sites που αποτυγχάνουν στα Core Web Vitals και σε e-shop όπου ο χρόνος φόρτωσης κοστίζει μετρήσιμα σε μετατροπές.',
    },
  },
  'content-creation': {
    en: {
      definition:
        'Content written against real search demand and mapped to the pages that can convert, rather than volume for its own sake. Every piece answers a question someone is actually asking.',
      processTitle: 'How content gets made',
      process: [
        'Demand research and topic clustering',
        'Mapping each topic to a commercial destination',
        'Answer-first drafting with a clear structure',
        'Internal linking into the relevant money page',
        'Refresh cycle for pieces that gain traction',
      ],
      pricingTeaser:
        'Included in the monthly SEO engagements, or priced per page as an add-on. See the pricing page.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses that need topical depth to compete, and those whose existing blog gets impressions but no clicks.',
    },
    el: {
      definition:
        'Περιεχόμενο γραμμένο με βάση την πραγματική ζήτηση αναζήτησης και συνδεδεμένο με τις σελίδες που φέρνουν πελάτες, όχι όγκος για τον όγκο. Κάθε κείμενο απαντά σε ερώτηση που όντως γίνεται.',
      processTitle: 'Πώς παράγεται το περιεχόμενο',
      process: [
        'Έρευνα ζήτησης και ομαδοποίηση θεμάτων',
        'Αντιστοίχιση κάθε θέματος με εμπορικό προορισμό',
        'Συγγραφή με άμεση απάντηση και καθαρή δομή',
        'Εσωτερική διασύνδεση προς τη σχετική εμπορική σελίδα',
        'Κύκλος ανανέωσης για όσα κείμενα αποδίδουν',
      ],
      pricingTeaser:
        'Περιλαμβάνεται στα μηνιαία πακέτα SEO ή τιμολογείται ανά σελίδα ως πρόσθετο. Δείτε τη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις που χρειάζονται θεματικό βάθος για να ανταγωνιστούν και σε όσες το blog τους παίρνει εμφανίσεις χωρίς κλικ.',
    },
  },
  'link-building': {
    en: {
      definition:
        'Authority work based on analysis rather than volume: where your competitors earn links, which of those are realistically reachable, and what is worth pursuing for your market.',
      processTitle: 'How we approach authority',
      process: [
        'Backlink gap analysis against real competitors',
        'Relevance and quality assessment of opportunities',
        'Outreach and digital PR angles',
        'Ongoing monitoring of the profile',
      ],
      pricingTeaser:
        'Included in the higher SEO engagements. Any third-party publisher costs are quoted separately and agreed in advance.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses in competitive markets where content and technical work alone have stopped moving positions.',
    },
    el: {
      definition:
        'Εργασία authority βασισμένη σε ανάλυση και όχι σε ποσότητα: από πού κερδίζουν συνδέσμους οι ανταγωνιστές σας, ποιοι από αυτούς είναι ρεαλιστικά προσβάσιμοι και τι αξίζει να επιδιωχθεί για την αγορά σας.',
      processTitle: 'Πώς προσεγγίζουμε το authority',
      process: [
        'Ανάλυση κενών σε backlinks σε σχέση με πραγματικούς ανταγωνιστές',
        'Αξιολόγηση συνάφειας και ποιότητας των ευκαιριών',
        'Προσέγγιση και αφορμές digital PR',
        'Συνεχής παρακολούθηση του προφίλ συνδέσμων',
      ],
      pricingTeaser:
        'Περιλαμβάνεται στα ανώτερα πακέτα SEO. Τυχόν κόστη τρίτων για δημοσιεύσεις τιμολογούνται ξεχωριστά και συμφωνούνται εκ των προτέρων.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις σε ανταγωνιστικές αγορές, όπου το περιεχόμενο και η τεχνική εργασία από μόνα τους έχουν σταματήσει να μετακινούν θέσεις.',
    },
  },
  'eshop-seo': {
    en: {
      definition:
        'SEO for e-commerce: category and product architecture, faceted navigation handling, product schema, and the technical work that lets a large catalogue be crawled and understood.',
      processTitle: 'What e-shop SEO covers',
      process: [
        'Category and product URL architecture',
        'Faceted navigation and crawl control',
        'Product structured data',
        'Category page content and internal linking',
        'Performance work on template pages',
      ],
      pricingTeaser:
        'Usually the SEO Authority engagement, given catalogue size. See the pricing page.',
      audienceTitle: 'Who this is for',
      audience:
        'Online stores where organic is meant to be a primary channel rather than a byproduct of paid traffic.',
    },
    el: {
      definition:
        'SEO για e-commerce: αρχιτεκτονική κατηγοριών και προϊόντων, διαχείριση φίλτρων πλοήγησης, schema προϊόντων και η τεχνική εργασία που επιτρέπει σε έναν μεγάλο κατάλογο να διαβαστεί σωστά.',
      processTitle: 'Τι καλύπτει το SEO για e-shop',
      process: [
        'Αρχιτεκτονική URL κατηγοριών και προϊόντων',
        'Διαχείριση φίλτρων πλοήγησης και ελέγχου ανίχνευσης',
        'Δομημένα δεδομένα προϊόντων',
        'Περιεχόμενο σελίδων κατηγορίας και εσωτερική διασύνδεση',
        'Εργασία απόδοσης στα πρότυπα σελίδων',
      ],
      pricingTeaser:
        'Συνήθως αντιστοιχεί στο πακέτο SEO Authority, λόγω μεγέθους καταλόγου. Δείτε τη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε ηλεκτρονικά καταστήματα όπου η οργανική αναζήτηση προορίζεται να είναι βασικό κανάλι και όχι παραπροϊόν της πληρωμένης κίνησης.',
    },
  },
  'logo-design': {
    en: {
      definition:
        'Brand essentials delivered alongside a build: a logo, colour and type system, and the files you need to use them consistently. Scoped as an add-on rather than a standalone branding programme.',
      processTitle: 'What you receive',
      process: [
        'Discovery on positioning and audience',
        'Logo concepts and refinement',
        'Colour and type system',
        'Export files for web and print',
      ],
      pricingTeaser: 'Priced as an add-on. See the pricing page for the starting figure.',
      audienceTitle: 'Who this is for',
      audience:
        'Businesses building a new site who need matching brand basics, not a full rebrand.',
    },
    el: {
      definition:
        'Βασικά στοιχεία brand που παραδίδονται μαζί με την κατασκευή: λογότυπο, σύστημα χρωμάτων και τυπογραφίας και τα αρχεία που χρειάζεστε για να τα χρησιμοποιείτε με συνέπεια. Ορίζεται ως πρόσθετο, όχι ως πλήρες πρόγραμμα branding.',
      processTitle: 'Τι παραλαμβάνετε',
      process: [
        'Διερεύνηση τοποθέτησης και κοινού',
        'Προτάσεις λογοτύπου και βελτίωση',
        'Σύστημα χρωμάτων και τυπογραφίας',
        'Αρχεία εξαγωγής για web και εκτύπωση',
      ],
      pricingTeaser: 'Τιμολογείται ως πρόσθετο. Δείτε την τιμή εκκίνησης στη σελίδα τιμών.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις που φτιάχνουν νέο site και χρειάζονται αντίστοιχα βασικά στοιχεία brand, όχι πλήρη επανασχεδιασμό ταυτότητας.',
    },
  },
};

export function getServiceHubCommercial(
  slug: string,
  locale: 'en' | 'el'
): ServiceHubCommercial | null {
  if (isMoneyServiceSlug(slug)) return COMMERCIAL[slug][locale];
  return ADDITIONAL[slug]?.[locale] ?? null;
}
