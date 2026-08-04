/**
 * Service-hub FAQ content (EN + EL) for commercial money pages.
 * Used by /services/[service] with FAQPage schema.
 */

export type ServiceFaqItem = { question: string; answer: string };

const DEFAULT_EN: ServiceFaqItem[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most website projects ship in 2–4 weeks after kickoff. SEO retainers run monthly with measurable milestones from month one.',
  },
  {
    question: 'Do you work with businesses outside Greece?',
    answer:
      'Yes. We build and optimize sites for tourism and local brands across the EU, UK, US and Canada — with EN/EL bilingual setups when needed.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Use Get Started, tell us your goals and timeline, and we reply with a scoped package in EUR — no hidden fees.',
  },
];

const DEFAULT_EL: ServiceFaqItem[] = [
  {
    question: 'Πόσο διαρκεί ένα τυπικό project;',
    answer:
      'Οι περισσότερες ιστοσελίδες παραδίδονται σε 2–4 εβδομάδες μετά το kickoff. Τα μηνιαία SEO πακέτα έχουν μετρήσιμα milestones από τον πρώτο μήνα.',
  },
  {
    question: 'Δουλεύετε και εκτός Ελλάδας;',
    answer:
      'Ναι. Φτιάχνουμε και βελτιστοποιούμε sites για τουρισμό και τοπικές επιχειρήσεις σε ΕΕ, UK, ΗΠΑ και Καναδά — με δίγλωσσα EN/EL setups όπου χρειάζεται.',
  },
  {
    question: 'Πώς παίρνω προσφορά;',
    answer:
      'Συμπληρώστε τη φόρμα Get Started με τους στόχους και το timeline σας. Απαντάμε με ξεκάθαρο πακέτο σε ευρώ, χωρίς κρυφές χρεώσεις.',
  },
];

const BY_SERVICE: Record<string, { en: ServiceFaqItem[]; el: ServiceFaqItem[] }> = {
  'website-creation': {
    en: [
      {
        question: 'How much does a website cost?',
        answer:
          'Packages start at €899 (Starter, up to 5 pages), €1,799 (Professional) and €2,999 (Business). See Pricing for full details and add-ons.',
      },
      {
        question: 'Do you build websites for Athens and Thessaloniki businesses?',
        answer:
          'Yes. We create conversion-focused sites with local SEO for Athens, Thessaloniki and cities across Greece — plus international tourism brands.',
      },
      {
        question: 'Is SEO included with website creation?',
        answer:
          'Every package includes baseline technical SEO (titles, meta, speed, mobile). Ongoing ranking growth is covered by monthly SEO packages.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Πόσο κοστίζει μια ιστοσελίδα;',
        answer:
          'Τα πακέτα ξεκινούν από €899 (Starter, έως 5 σελίδες), €1.799 (Professional) και €2.999 (Business). Δείτε τις Τιμές για λεπτομέρειες και add-ons.',
      },
      {
        question: 'Φτιάχνετε ιστοσελίδες για Αθήνα και Θεσσαλονίκη;',
        answer:
          'Ναι. Δημιουργούμε sites με τοπικό SEO για Αθήνα, Θεσσαλονίκη και πόλεις σε όλη την Ελλάδα — καθώς και διεθνή τουριστικά brands.',
      },
      {
        question: 'Περιλαμβάνεται SEO στην κατασκευή;',
        answer:
          'Κάθε πακέτο περιλαμβάνει βασικό τεχνικό SEO (titles, meta, ταχύτητα, mobile). Η συνεχής κατάταξη καλύπτεται από μηνιαία πακέτα SEO.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
  'eshop-woocommerce': {
    en: [
      {
        question: 'How much does a WooCommerce e-shop cost?',
        answer:
          'E-commerce setup starts as an add-on from €499 on top of a website package, or as a scoped Business build. Final cost depends on catalog size, payments and shipping rules.',
      },
      {
        question: 'Do you handle Greek payments and shipping?',
        answer:
          'Yes. We configure common Greek payment gateways, VAT-ready checkout and shipping zones so your store is ready for local buyers.',
      },
      {
        question: 'Can you optimize an existing e-shop for SEO?',
        answer:
          'Yes — category/product SEO, Core Web Vitals, internal linking and content briefs for money pages. Pair with our e-shop SEO retainer for ongoing growth.',
      },
      {
        question: 'How fast can an e-shop launch?',
        answer:
          'A focused catalog launch typically takes 3–5 weeks after product data and brand assets are ready.',
      },
    ],
    el: [
      {
        question: 'Πόσο κοστίζει κατασκευή e-shop WooCommerce;',
        answer:
          'Η ρύθμιση e-commerce ξεκινά από €499 ως add-on πάνω σε πακέτο ιστοσελίδας, ή ως scoped Business project. Το τελικό κόστος εξαρτάται από κατάλογο, πληρωμές και αποστολές.',
      },
      {
        question: 'Ρυθμίζετε ελληνικές πληρωμές και αποστολές;',
        answer:
          'Ναι. Ρυθμίζουμε συνηθισμένες ελληνικές πύλες πληρωμών, checkout με ΦΠΑ και ζώνες αποστολής για τοπικούς αγοραστές.',
      },
      {
        question: 'Μπορείτε να βελτιστοποιήσετε υπάρχον e-shop για SEO;',
        answer:
          'Ναι — SEO κατηγοριών/προϊόντων, Core Web Vitals, εσωτερική σύνδεση και briefs περιεχομένου. Συνδυάζεται με μηνιαίο e-shop SEO.',
      },
      {
        question: 'Σε πόσο καιρό μπορεί να βγει online ένα e-shop;',
        answer:
          'Ένα focused launch καταλόγου συνήθως χρειάζεται 3–5 εβδομάδες αφού είναι έτοιμα προϊόντα και brand assets.',
      },
    ],
  },
  'ai-visibility': {
    en: [
      {
        question: 'What is GEO / AEO and how is it different from SEO?',
        answer:
          'SEO ranks you in classic Google results. GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) help your brand get cited in AI answers — ChatGPT, Perplexity, Google AI Overviews.',
      },
      {
        question: 'Do you offer AI SEO agency services internationally?',
        answer:
          'Yes. We run GEO/AEO programs for tourism and local brands targeting Greece, EU, UK and US search — with schema, FAQ entities and citation-ready content.',
      },
      {
        question: 'What do AI visibility packages include?',
        answer:
          'Entity cleanup, FAQ/schema, citation-worthy pages, internal linking and monitoring of AI mentions alongside classic rankings.',
      },
      {
        question: 'How soon will we see AI citation results?',
        answer:
          'Technical and content foundations ship in weeks. Measurable citation and branded mention lifts usually appear over 1–3 months depending on competition.',
      },
    ],
    el: [
      {
        question: 'Τι είναι GEO / AEO και πώς διαφέρει από το SEO;',
        answer:
          'Το SEO σας κατατάσσει στα κλασικά αποτελέσματα Google. Το GEO και το AEO βοηθούν το brand σας να αναφέρεται σε απαντήσεις AI — ChatGPT, Perplexity, Google AI Overviews.',
      },
      {
        question: 'Προσφέρετε υπηρεσίες AI SEO / GEO agency;',
        answer:
          'Ναι. Τρέχουμε προγράμματα GEO/AEO για τουρισμό και τοπικές επιχειρήσεις σε Ελλάδα, ΕΕ, UK και ΗΠΑ — με schema, FAQ entities και citation-ready περιεχόμενο.',
      },
      {
        question: 'Τι περιλαμβάνει ένα πακέτο AI visibility;',
        answer:
          'Καθαρισμό entities, FAQ/schema, σελίδες έτοιμες για citations, εσωτερική σύνδεση και παρακολούθηση AI mentions παράλληλα με τις κλασικές κατατάξεις.',
      },
      {
        question: 'Πότε θα δούμε αποτελέσματα σε AI citations;',
        answer:
          'Τα τεχνικά και content foundations παραδίδονται σε εβδομάδες. Μετρήσιμη αύξηση citations εμφανίζεται συνήθως σε 1–3 μήνες ανάλογα με τον ανταγωνισμό.',
      },
    ],
  },
  'local-seo': {
    en: [
      {
        question: 'What is local SEO?',
        answer:
          'Local SEO is how you rank in Google’s map pack and local results for “near me” and city searches. It centers on Google Business Profile, NAP consistency, reviews, local pages, and citations.',
      },
      {
        question: 'What do your local SEO services include?',
        answer:
          'Google Business Profile optimization, local landing pages, citations, review strategy, and location schema — focused on map pack and high-intent “near me” queries.',
      },
      {
        question: 'Do you run local SEO in Thessaloniki and Athens?',
        answer:
          'Yes. We have dedicated city pages and playbooks for Athens, Thessaloniki, Crete islands and other Greek markets — plus international tourism brands.',
      },
      {
        question: 'How much does local SEO cost?',
        answer:
          'Retainers depend on competition and number of locations. Most small businesses start with a focused GBP + citations + location pages package, then scale monthly content and reviews.',
      },
      {
        question: 'Does local SEO still work in 2026?',
        answer:
          'Yes pack and “near me” searches remain high-intent. Complete profiles, recent reviews, and unique location pages still beat generic national sites for local demand.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι το τοπικό SEO;',
        answer:
          'Το τοπικό SEO είναι πώς κατατάσσεστε στο map pack και στα τοπικά αποτελέσματα για αναζητήσεις «κοντά μου» και πόλης. Εστιάζει σε Google Business Profile, NAP, κριτικές, τοπικές σελίδες και citations.',
      },
      {
        question: 'Τι περιλαμβάνει το τοπικό SEO;',
        answer:
          'Βελτιστοποίηση Google Business Profile, τοπικές landing pages, citations, στρατηγική κριτικών και location schema — με στόχο map pack και αναζητήσεις «κοντά μου».',
      },
      {
        question: 'Κάνετε τοπικό SEO σε Θεσσαλονίκη και Αθήνα;',
        answer:
          'Ναι. Έχουμε dedicated σελίδες πόλεων και playbooks για Αθήνα, Θεσσαλονίκη, νησιά Κρήτης και άλλες ελληνικές αγορές.',
      },
      {
        question: 'Πόσο κοστίζει το τοπικό SEO;',
        answer:
          'Το κόστος εξαρτάται από ανταγωνισμό και αριθμό τοποθεσιών. Οι περισσότερες μικρές επιχειρήσεις ξεκινούν με GBP + citations + location pages και μετά κλιμακώνουν περιεχόμενο και κριτικές.',
      },
      {
        question: 'Πώς να βελτιώσω το τοπικό SEO μου;',
        answer:
          'Συμπληρώστε πλήρως το Google Business Profile, κρατήστε σταθερό NAP παντού, μαζέψτε και απαντήστε σε κριτικές, δημιουργήστε τοπικές σελίδες υπηρεσιών και χτίστε σχετικές καταχωρήσεις.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
  'seo-audits': {
    en: [
      {
        question: 'What are SEO audit services?',
        answer:
          'An SEO audit is a prioritized review of technical health, indexation, on-page relevance, content gaps, and authority. We deliver a fix roadmap — not a 200-item dump — then optional implementation.',
      },
      {
        question: 'What do technical SEO services include?',
        answer:
          'Crawlability, canonicals, sitemaps, Core Web Vitals, mobile usability, structured data, and internal linking — the foundations that unlock content and link investments.',
      },
      {
        question: 'How often should you do an SEO audit?',
        answer:
          'Run a full audit at launch, after a redesign, or every 6–12 months. Spot-check index coverage, vitals, and money pages monthly in Search Console.',
      },
      {
        question: 'How much do SEO audit services cost?',
        answer:
          'Scoped audits start as a fixed project; ongoing technical SEO is usually part of a monthly retainer. We’ll quote based on site size and stack.',
      },
      {
        question: 'What are professional SEO services beyond the audit?',
        answer:
          'After the audit we implement on-page fixes, content, local SEO, link building, or AI visibility (GEO/AEO) as a monthly package with clear deliverables and reporting.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι οι υπηρεσίες SEO;',
        answer:
          'Υπηρεσίες SEO σημαίνει συστηματική βελτιστοποίηση ιστοσελίδας για οργανική κατάταξη: τεχνικός έλεγχος, on-page, λέξεις-κλειδιά, τοπικό SEO όπου χρειάζεται, περιεχόμενο και μηνιαία αναφορά προόδου.',
      },
      {
        question: 'Τι είναι το SEO audit;',
        answer:
          'Προτεραιοποιημένος έλεγχος τεχνικής υγείας, ευρετηρίασης, on-page, κενών περιεχομένου και authority. Παραδίδουμε roadmap διορθώσεων — όχι απλώς λίστα 200 σημείων.',
      },
      {
        question: 'Τι περιλαμβάνει το τεχνικό SEO;',
        answer:
          'Crawlability, canonicals, sitemaps, Core Web Vitals, mobile, structured data και εσωτερική σύνδεση — τα θεμέλια που ξεκλειδώνουν content και links.',
      },
      {
        question: 'Πόσο κοστίζουν οι υπηρεσίες SEO / εταιρεία SEO στην Ελλάδα;',
        answer:
          'Τα μηνιαία πακέτα ξεκινούν από €299 (Starter), €599 (Growth) και €999 (Scale). Εφάπαξ audits κοστολογούνται ξεχωριστά. Δείτε τις Τιμές για λεπτομέρειες.',
      },
      {
        question: 'Πότε θα δω αποτελέσματα από προώθηση SEO;',
        answer:
          'Τοπικές αναζητήσεις με χαμηλό ανταγωνισμό συχνά σε 2–3 μήνες. Ανταγωνιστικές λέξεις πανελλαδικά συνήθως 4–6+ μήνες συστηματικής δουλειάς.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
  'link-building': {
    en: [
      {
        question: 'What are link building services?',
        answer:
          'We earn relevant, editorial backlinks — guest posts, digital PR, and niche placements — that strengthen authority. Quality and topical relevance beat raw link volume.',
      },
      {
        question: 'Do you guarantee rankings from link building?',
        answer:
          'No ethical agency can guarantee rankings. We guarantee process, relevance filters, and transparent reporting — and we avoid spam networks that risk penalties.',
      },
      {
        question: 'How is off-page SEO different from link building?',
        answer:
          'Link building is the core of off-page SEO. Off-page also includes brand mentions and reputation signals. We focus on links that support pages already strong on-page.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι οι υπηρεσίες link building;',
        answer:
          'Κερδίζουμε σχετικά, editorial backlinks — guest posts, digital PR και niche placements — που ενισχύουν το authority. Ποιότητα και θεματική συνάφεια πάνω από όγκο.',
      },
      {
        question: 'Εγγυάστε κατατάξεις από link building;',
        answer:
          'Καμία ethical ομάδα δεν εγγυάται θέσεις. Εγγυόμαστε διαδικασία, φίλτρα ποιότητας και διαφανή reporting — χωρίς spam networks που ρισκάρουν penalties.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
  'content-creation': {
    en: [
      {
        question: 'What is SEO content?',
        answer:
          'SEO content answers a clear search intent with useful structure, proof, and internal links — so it can rank and convert. We brief and write pages mapped to real keyword demand.',
      },
      {
        question: 'Do you write blogs and service pages?',
        answer:
          'Yes. Pillar guides, service pages, location pages, and FAQs — with schema-ready Q&A for PAA and AI Overviews when relevant.',
      },
      {
        question: 'How do you pick topics?',
        answer:
          'From Search Console opportunities, commercial keyword clusters, and competitor gaps — prioritized by intent and business value, not vanity volume alone.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι το SEO content;',
        answer:
          'Περιεχόμενο που απαντά σε σαφή search intent με δομή, απόδειξη και εσωτερικούς συνδέσμους — ώστε να κατατάσσεται και να μετατρέπει. Γράφουμε σελίδες mapped σε πραγματική ζήτηση.',
      },
      {
        question: 'Γράφετε blogs και σελίδες υπηρεσιών;',
        answer:
          'Ναι. Pillar guides, service pages, location pages και FAQs — με schema-ready Q&A για PAA και AI Overviews όπου χρειάζεται.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
  'eshop-seo': {
    en: [
      {
        question: 'What are ecommerce SEO services?',
        answer:
          'Ecommerce SEO optimizes category and product templates, internal linking, product schema, site speed, and content so organic search drives sales — not just traffic.',
      },
      {
        question: 'Do you work with WooCommerce and Shopify?',
        answer:
          'Yes. We run technical and on-page ecommerce SEO for WooCommerce stores and other common stacks, including Greek payments and VAT-ready setups when needed.',
      },
      {
        question: 'How fast can ecommerce SEO show results?',
        answer:
          'Template and indexation fixes can move impressions in weeks. Competitive category rankings usually take several months of content and authority work.',
      },
      ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι οι υπηρεσίες ecommerce SEO;',
        answer:
          'Βελτιστοποίηση κατηγοριών/προϊόντων, εσωτερική σύνδεση, product schema, ταχύτητα και περιεχόμενο ώστε η οργανική αναζήτηση να φέρνει πωλήσεις — όχι μόνο traffic.',
      },
      {
        question: 'Δουλεύετε με WooCommerce και Shopify;',
        answer:
          'Ναι. Τρέχουμε τεχνικό και on-page ecommerce SEO για WooCommerce και άλλα stacks, με ελληνικές πληρωμές και ΦΠΑ όπου χρειάζεται.',
      },
      ...DEFAULT_EL.slice(2),
    ],
  },
};

export function getServiceFaqs(
  serviceSlug: string,
  locale: 'en' | 'el'
): ServiceFaqItem[] {
  const entry = BY_SERVICE[serviceSlug];
  if (entry) return locale === 'el' ? entry.el : entry.en;
  return locale === 'el' ? DEFAULT_EL : DEFAULT_EN;
}
