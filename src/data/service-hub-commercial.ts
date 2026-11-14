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
        'We compare the crawl with Search Console to see which pages Google can reach and where search traffic has fallen. The report explains which fixes to make first and who can carry them out.',
      processTitle: 'How our SEO audit works',
      process: [
        'Crawl + indexation review (robots, sitemaps, canonicals, soft 404s)',
        'Core Web Vitals and mobile UX pass',
        'On-page and internal-link gaps on money pages',
        'Competitor SERP snapshot and quick-win keyword list',
        'A fix list for your developers or our implementation team',
      ],
      pricingTeaser:
        'See the packages and VAT details, then ask for a quote for the work your site needs.',
      audienceTitle: 'Who this is for',
      audience:
        'Sites stuck on page 2–3, redesigns that lost traffic, and teams that want a clear technical baseline before a retainer.',
    },
    el: {
      definition:
        'Συγκρίνουμε τον τεχνικό έλεγχο με τα στοιχεία του Search Console. Βλέπουμε ποιες σελίδες διαβάζει η Google, πού μειώθηκαν οι επισκέψεις και ποιες διορθώσεις αξίζει να αναλάβει πρώτα η ομάδα σας.',
      processTitle: 'Πώς δουλεύει ο τεχνικός έλεγχος',
      process: [
        'Crawl & ευρετηρίαση (robots, sitemaps, canonicals, soft 404)',
        'Έλεγχος Core Web Vitals και mobile UX',
        'Κενά on-page και εσωτερικής σύνδεσης στις money pages',
        'Στιγμιότυπο SERP ανταγωνιστών και λίστα γρήγορων wins',
        'Λίστα διορθώσεων για τη δική σας ομάδα ή για ανάθεση σε εμάς',
      ],
      pricingTeaser:
        'Δείτε τι περιλαμβάνει κάθε πακέτο, πώς υπολογίζεται ο ΦΠΑ και ζητήστε προσφορά για τη δική σας ιστοσελίδα.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Αν η επισκεψιμότητα έπεσε μετά από ανασχεδιασμό ή οι σελίδες σας μένουν χαμηλά στα αποτελέσματα, ένας έλεγχος βοηθά να αποφασίσετε τι αξίζει να διορθώσετε.',
    },
  },
  'local-seo': {
    en: {
      definition:
        'We compare your Google Business Profile with your website and other listings. A customer searching nearby should see the right address, hours and way to reach you.',
      processTitle: 'Local SEO process',
      process: [
        'GBP audit (categories, services, photos, Q&A, posts)',
        'NAP cleanup and priority citation builds',
        'Review acquisition playbook',
        'Location / service landing pages with local schema',
        'Monthly rank + call/direction tracking',
      ],
      pricingTeaser:
        'See the packages and VAT details, then ask for a quote for the work your site needs.',
      audienceTitle: 'Who this is for',
      audience:
        'Clinics, law firms, hotels, rent-a-car, restaurants, and multi-location brands that need map pack visibility in Greece and abroad.',
    },
    el: {
      definition:
        'Συγκρίνουμε το Google Business Profile με την ιστοσελίδα και τις άλλες καταχωρίσεις σας. Ελέγχουμε αν ο πελάτης που ψάχνει στην περιοχή βλέπει τη σωστή διεύθυνση, το ωράριο και το τηλέφωνό σας.',
      processTitle: 'Διαδικασία τοπικού SEO',
      process: [
        'Έλεγχος GBP (κατηγορίες, υπηρεσίες, φωτογραφίες, Q&A, posts)',
        'Καθαρισμός NAP και βασικές citations',
        'Πλάνο απόκτησης κριτικών',
        'Landing pages πόλης/υπηρεσίας με τοπικό schema',
        'Μηνιαία παρακολούθηση θέσεων, κλήσεων και αιτημάτων για οδηγίες',
      ],
      pricingTeaser:
        'Δείτε τι περιλαμβάνει κάθε πακέτο, πώς υπολογίζεται ο ΦΠΑ και ζητήστε προσφορά για τη δική σας ιστοσελίδα.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Ιατρεία, δικηγόροι, ξενοδοχεία, rent-a-car, εστίαση και brands με πολλά σημεία που χρειάζονται map pack στην Ελλάδα και στο εξωτερικό.',
    },
  },
  'eshop-woocommerce': {
    en: {
      definition:
        'We organise the catalogue, payment options and shipping rules together. Before the WooCommerce shop opens, we check the route from a product page through to checkout.',
      processTitle: 'How we build your e-shop',
      process: [
        'Catalog IA: categories and URLs mapped to search demand',
        'Design + product templates built for conversion',
        'Greek-ready payments, VAT checkout, and shipping zones',
        'Technical SEO, Product schema, and Core Web Vitals',
        'Launch checklist, training, and optional e-shop SEO retainer',
      ],
      pricingTeaser:
        'See the packages and VAT details, then ask for a quote for the work your site needs.',
      audienceTitle: 'Who this is for',
      audience:
        'Greek retailers who need WooCommerce ownership, local payments/couriers, and SEO-ready category structure, not a locked SaaS theme.',
    },
    el: {
      definition:
        'Οργανώνουμε μαζί τον κατάλογο, τους τρόπους πληρωμής και τους κανόνες αποστολής. Πριν ανοίξει το κατάστημα WooCommerce, ελέγχουμε τη διαδικασία από τη σελίδα προϊόντος μέχρι την ολοκλήρωση της παραγγελίας.',
      processTitle: 'Πώς ετοιμάζουμε το e-shop σας',
      process: [
        'Αρχιτεκτονική καταλόγου: κατηγορίες και URLs με βάση ζήτηση αναζήτησης',
        'Σχεδιασμός σελίδων προϊόντων και διαδικασίας αγοράς',
        'Ελληνικές πληρωμές, checkout με ΦΠΑ και ζώνες αποστολής',
        'Τεχνικό SEO, Product schema και Core Web Vitals',
        'Έλεγχοι πριν τη δημοσίευση, εκπαίδευση και προαιρετική μηνιαία διαχείριση SEO',
      ],
      pricingTeaser:
        'Δείτε τι περιλαμβάνει κάθε πακέτο, πώς υπολογίζεται ο ΦΠΑ και ζητήστε προσφορά για τη δική σας ιστοσελίδα.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Εμπόρους που θέλουν δικό τους κατάστημα WooCommerce, με ελληνικούς τρόπους πληρωμής, συνεργαζόμενες μεταφορικές και κατηγορίες που βρίσκονται στη Google.',
    },
  },
  'ai-visibility': {
    en: {
      definition:
        'We check how clearly your site describes the business and whether the published facts agree across pages. A fixed set of questions lets us follow how AI services mention you over time.',
      processTitle: 'GEO / AEO process',
      process: [
        'Entity and brand-fact consistency audit',
        'Answer-shaped service and FAQ pages',
        'Schema that matches the visible text',
        'Monthly sampling of a fixed question set',
        'Iteration tied to Search Console clicks and mention trends',
      ],
      pricingTeaser:
        'Dedicated GEO and AEO work is included in the SEO Growth and Authority retainers. Prices and VAT are on the pricing page.',
      audienceTitle: 'Who this is for',
      audience:
        'Tourism, hospitality and local brands whose buyers already ask AI assistants before they book or call, and whose site can already be crawled.',
    },
    el: {
      definition:
        'Ελέγχουμε αν περιγράφετε καθαρά την επιχείρησή σας και αν συμφωνούν τα στοιχεία στις σελίδες σας. Επαναλαμβάνουμε συγκεκριμένες ερωτήσεις για να βλέπουμε πώς σας αναφέρουν οι υπηρεσίες AI με τον καιρό.',
      processTitle: 'Διαδικασία GEO / AEO',
      process: [
        'Έλεγχος οντοτήτων και συνέπειας στοιχείων',
        'Σελίδες υπηρεσιών και FAQ σε μορφή απάντησης',
        'Schema που συμφωνεί με το ορατό κείμενο',
        'Μηνιαία δειγματοληψία σταθερού συνόλου ερωτημάτων',
        'Επανάληψη με κλικ Search Console και τάση αναφορών',
      ],
      pricingTeaser:
        'Αφιερωμένη εργασία GEO και AEO περιλαμβάνεται στα πακέτα SEO Growth και Authority. Τιμές και ΦΠΑ στη σελίδα τιμών.',
      audienceTitle: 'Για ποιον είναι',
      audience:
        'Τουρισμός, φιλοξενία και τοπικές επιχειρήσεις των οποίων οι αγοραστές ήδη ρωτούν βοηθούς AI πριν κλείσουν ή καλέσουν, και των οποίων το site ήδη διαβάζεται.',
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
        'We agree what your visitors should be able to do, then design the pages that get them there. The build includes mobile layouts, basic search setup and a handover so you can manage the site.',
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
        'Πριν τον σχεδιασμό συμφωνούμε τι χρειάζεται να κάνει ο επισκέπτης. Η κατασκευή περιλαμβάνει εμφάνιση για κινητά, βασικό SEO και παράδοση της ιστοσελίδας ώστε να μπορείτε να τη διαχειρίζεστε.',
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
        'Before changing the design, we identify the pages that already attract visitors. We map their addresses, check redirects and review the new pages when the site goes live.',
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
        'Πριν αλλάξουμε τον σχεδιασμό, εντοπίζουμε τις σελίδες που ήδη φέρνουν επισκέπτες. Αντιστοιχίζουμε τις διευθύνσεις, ελέγχουμε τις ανακατευθύνσεις και επανεξετάζουμε τις σελίδες μετά τη δημοσίευση.',
      processTitle: 'Πώς εξελίσσεται ένας ανασχεδιασμός',
      process: [
        'Έλεγχος για το τι κατατάσσεται σήμερα και γιατί',
        'Καταγραφή URL και χαρτογράφηση ανακατευθύνσεων',
        'Αποφάσεις περιεχομένου και δομής πριν από τον σχεδιασμό',
        'Σχεδιασμός και κατασκευή πάνω στη διατηρούμενη αρχιτεκτονική',
        'Τεχνικοί έλεγχοι πριν από τη δημοσίευση',
        'Παρακολούθηση στο Search Console μετά τη δημοσίευση',
      ],
      pricingTeaser:
        'Το εύρος εξαρτάται από το μέγεθος του υπάρχοντος site και από το πόσο περιεχόμενο χρειάζεται ξαναγράψιμο. Τιμολογείται ανά έργο.',
      audienceTitle: 'Σε ποιους απευθύνεται',
      audience:
        'Σε επιχειρήσεις με παλιό site που όμως εξακολουθεί να φέρνει επισκεψιμότητα, όπου η απώλεια ορατότητας κατά την ανακατασκευή δεν είναι αποδεκτή.',
    },
  },
  'web-design': {
    en: {
      definition:
        'We plan the navigation, headings and links while designing each page. A visitor can understand where to go next, and Google can follow the relationships between your services.',
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
        'Σχεδιάζουμε το μενού, τις επικεφαλίδες και τους συνδέσμους μαζί με κάθε σελίδα. Ο επισκέπτης καταλαβαίνει πού να συνεχίσει και η Google μπορεί να διαβάσει πώς συνδέονται οι υπηρεσίες σας.',
      processTitle: 'Τι περιλαμβάνει',
      process: [
        'Δομή σελίδων και επικεφαλίδων βάσει λέξεων-κλειδιών',
        'Εσωτερική διασύνδεση σχεδιασμένη από το στάδιο του wireframe',
        'Όρια απόδοσης που ορίζονται πριν από την κατασκευή',
        'Σημασιολογικό markup και structured data',
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
        'We measure how the site behaves on a phone and find what is slowing the page down. We check images, fonts, scripts and server response, then repeat the measurements after the fixes.',
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
        'Μετράμε πώς ανοίγει η σελίδα στο κινητό. Ελέγχουμε εικόνες, γραμματοσειρές, κώδικα και απόκριση του διακομιστή και επαναλαμβάνουμε τις ίδιες μετρήσεις μετά τις διορθώσεις.',
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
        'We match search questions to the page that can answer them. That may mean improving a service description you already have or writing a guide a customer needs before buying.',
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
        'Αντιστοιχίζουμε τις ερωτήσεις των πελατών στη σελίδα που μπορεί να τις απαντήσει. Μερικές φορές χρειάζεται καλύτερη περιγραφή μιας υπηρεσίας και άλλες φορές ένας νέος οδηγός πριν την αγορά.',
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
        'We look at which publications already cover your sector and why they link to other businesses. That helps us choose relevant contacts and stories for your own outreach.',
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
        'Βλέπουμε ποια μέσα καλύπτουν τον κλάδο σας και για ποιους λόγους παραπέμπουν σε άλλες επιχειρήσεις. Έτσι επιλέγουμε συντάκτες και θέματα που ταιριάζουν στη δική σας δουλειά.',
      processTitle: 'Πώς επιλέγουμε πηγές για backlinks',
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
        'We review category pages, products and filter combinations to see which versions Google should index. That helps shoppers reach the product or selection they searched for.',
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
        'Ελέγχουμε κατηγορίες, προϊόντα και συνδυασμούς φίλτρων για να ξεχωρίσουμε ποιες σελίδες χρειάζεται να εμφανίζονται στη Google. Έτσι ο αγοραστής μπορεί να βρει το προϊόν ή την κατηγορία που αναζητά.',
      processTitle: 'Τι καλύπτει το SEO για e-shop',
      process: [
        'Αρχιτεκτονική URL κατηγοριών και προϊόντων',
        'Διαχείριση φίλτρων πλοήγησης και ελέγχου crawl',
        'Structured data προϊόντων',
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
        'If you need a logo alongside a new website, we can include it as a separate add-on. You receive the design files, colours and typography for use on the site and in print.',
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
        'Αν μαζί με τη νέα ιστοσελίδα χρειάζεστε λογότυπο, μπορούμε να το εντάξουμε στην προσφορά ως ξεχωριστή υπηρεσία. Παραλαμβάνετε τα αρχεία του σχεδίου, τα χρώματα και τις γραμματοσειρές για ιστοσελίδα και έντυπα.',
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
        'Σε επιχειρήσεις που ετοιμάζουν νέα ιστοσελίδα και χρειάζονται λογότυπο και βασικές οδηγίες εταιρικής ταυτότητας.',
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
