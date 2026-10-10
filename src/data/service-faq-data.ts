import { resolvePriceTokens } from '@/data/pricing';

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
      'Yes. We build and optimize sites for tourism and local brands across Greece, the EU, the UK and the US, with EN/EL bilingual setups when needed.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Use Get Started, tell us your goals and timeline, and we reply with a scoped package in EUR, no hidden fees.',
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
      'Ναι. Φτιάχνουμε και βελτιστοποιούμε sites για τουρισμό και τοπικές επιχειρήσεις σε ΕΕ, UK, ΗΠΑ και Καναδά, με δίγλωσσα EN/EL setups όπου χρειάζεται.',
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
          'Packages start at {{ENTRY_WEBSITE}} (Starter, up to 5 pages), {{WEBSITE_PRO}} (Professional) and {{WEBSITE_BUSINESS}} (Business). See Pricing for full details and add-ons.',
      },
      {
        question: 'Do you build websites for Athens and Thessaloniki businesses?',
        answer:
          'Yes. We create conversion-focused sites with local SEO for Athens, Thessaloniki and cities across Greece, plus international tourism brands.',
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
        question: 'Πόσο κοστίζει η κατασκευή μιας ιστοσελίδας;',
        answer:
          'Τα πακέτα κατασκευής ιστοσελίδας ξεκινούν από {{ENTRY_WEBSITE}} (Starter), με {{WEBSITE_PRO}} (Professional) και {{WEBSITE_BUSINESS}} (Business) για μεγαλύτερα ή πολύγλωσσα έργα. Όλες οι τιμές είναι χωρίς ΦΠΑ και αναλύονται στη σελίδα τιμών.',
      },
      {
        question: 'Πόσο χρόνο χρειάζεται η κατασκευή ιστοσελίδας;',
        answer:
          'Ένα site παρουσίασης παραδίδεται συνήθως σε 3 έως 5 εβδομάδες. Μεγαλύτερα και πολύγλωσσα έργα χρειάζονται 5 έως 12 εβδομάδες, ανάλογα με το περιεχόμενο και τις λειτουργίες.',
      },
      {
        question: 'Περιλαμβάνεται SEO στην κατασκευή;',
        answer:
          'Κάθε πακέτο περιλαμβάνει τα τεχνικά θεμέλια SEO: δομή, τίτλους, ταχύτητα, προσαρμογή σε κινητά και ρύθμιση Search Console. Η συνεχής δουλειά για ανέβασμα θέσεων γίνεται με τα μηνιαία πακέτα SEO.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'eshop-woocommerce': {
    en: [
      {
        question: 'How much does a WooCommerce e-shop cost?',
        answer:
          'E-commerce setup starts as an add-on from €600 on top of a website package, or as a scoped Business build. Final cost depends on catalog size, payments and shipping rules.',
      },
      {
        question: 'Do you handle Greek payments and shipping?',
        answer:
          'Yes. We configure common Greek payment gateways, VAT-ready checkout and shipping zones so your store is ready for local buyers.',
      },
      {
        question: 'Can you optimize an existing e-shop for SEO?',
        answer:
          'Yes, category/product SEO, Core Web Vitals, internal linking and content briefs for money pages. Pair with our e-shop SEO retainer for ongoing growth.',
      },
      {
        question: 'How fast can an e-shop launch?',
        answer:
          'A focused catalog launch typically takes 3–5 weeks after product data and brand assets are ready.',
      },
    ],
    el: [
      {
        question: 'Πόσο κοστίζει η κατασκευή ενός eshop;',
        answer:
          'Η λειτουργικότητα e-commerce ξεκινά από {{ADDON_ECOMMERCE}} επιπλέον του πακέτου ιστοσελίδας, ή περιλαμβάνεται σε ένα έργο Business. Το τελικό κόστος εξαρτάται από τον αριθμό προϊόντων, τις πληρωμές, τα μεταφορικά και τις συνδέσεις με άλλα συστήματα.',
      },
      {
        question: 'Σε πόσο καιρό είναι έτοιμο ένα eshop;',
        answer:
          'Ένα eshop με οργανωμένο κατάλογο βγαίνει online συνήθως σε 3 έως 5 εβδομάδες από τη στιγμή που είναι έτοιμα τα προϊόντα, οι φωτογραφίες και τα κείμενα. Η πιο συχνή καθυστέρηση είναι το περιεχόμενο των προϊόντων, όχι η ανάπτυξη.',
      },
      {
        question: 'Συνδέεται το eshop με το ERP μου;',
        answer:
          'Συνήθως ναι. Το WooCommerce συνδέεται με τα περισσότερα εμπορικά προγράμματα για απόθεμα, τιμές και παραγγελίες. Η σύνδεση κοστολογείται ξεχωριστά, αφού εξαρτάται από το πρόγραμμα και το τι πρέπει να συγχρονίζεται.',
      },
      {
        question: 'Μπορώ να φτιάξω eshop μόνος μου;',
        answer:
          'Μπορείτε να στήσετε ένα βασικό κατάστημα σε έτοιμη πλατφόρμα. Το δύσκολο είναι να πουλάει: σωστές πληρωμές και μεταφορικά, δομή κατηγοριών που κατατάσσεται, ταχύτητα σε κινητό και τιμολόγηση. Ο οδηγός «Πόσο κοστίζει ένα eshop» στο blog μας συγκρίνει τις δύο επιλογές.',
      },
      {
        question: 'Φτιάχνετε και OpenCart, Magento ή Shopify;',
        answer:
          'Νέα καταστήματα τα στήνουμε σε WooCommerce. Αν έχετε ήδη eshop σε OpenCart, Magento ή Shopify, το ελέγχουμε και σας λέμε αν συμφέρει μετάβαση ή βελτίωση του υπάρχοντος.',
      },
    ],
  },
  'ai-visibility': {
    en: [
      {
        question: 'What is GEO / AEO and how is it different from SEO?',
        answer:
          'SEO ranks you in classic Google results. AEO structures pages so an answer engine can lift a short answer (AI Overviews, snippets). GEO makes the business a consistent source when ChatGPT, Perplexity or Gemini compose an answer. Neither replaces SEO, and neither guarantees a citation.',
      },
      {
        question: 'Do you offer GEO / AEO services outside Greece?',
        answer:
          'Yes. The same programme runs for tourism and local brands that sell into Greece, the EU, the UK and the US: entity consistency, visible FAQs with matching schema, and monthly mention sampling next to Search Console.',
      },
      {
        question: 'What do AI visibility packages include?',
        answer:
          'Dedicated GEO and AEO work is included in the SEO Growth and Authority retainers: entity cleanup, answer-shaped commercial pages, schema that matches visible text, and measurement against a fixed question set. Foundations does not include a separate GEO programme.',
      },
      {
        question: 'How soon will we see a result?',
        answer:
          'Entity and FAQ fixes can affect short answers within weeks on some queries. A stable mention trend on competitive questions usually takes quarters of measurement, not one ChatGPT session. We do not promise that any engine will cite you.',
      },
    ],
    el: [
      {
        question: 'Τι είναι GEO / AEO και πώς διαφέρει από το SEO;',
        answer:
          'Το SEO σας κατατάσσει στα κλασικά αποτελέσματα Google. Το AEO δομεί τις σελίδες ώστε μια μηχανή απάντησης να σηκώσει σύντομη απάντηση (AI Overviews, snippets). Το GEO κάνει την επιχείρηση συνεπή πηγή όταν το ChatGPT, το Perplexity ή το Gemini συνθέτουν απάντηση. Κανένα δεν αντικαθιστά το SEO και κανένα δεν εγγυάται αναφορά.',
      },
      {
        question: 'Προσφέρετε υπηρεσίες GEO / AEO εκτός Ελλάδας;',
        answer:
          'Ναι. Το ίδιο πρόγραμμα τρέχει για τουρισμό και τοπικές επιχειρήσεις που πουλάνε σε Ελλάδα, ΕΕ, Ηνωμένο Βασίλειο και ΗΠΑ: συνέπεια οντότητας, ορατά FAQ με αντίστοιχο schema και μηνιαία δειγματοληψία αναφορών δίπλα στο Search Console.',
      },
      {
        question: 'Τι περιλαμβάνει ένα πακέτο ορατότητας σε AI;',
        answer:
          'Αφιερωμένη εργασία GEO και AEO περιλαμβάνεται στα πακέτα SEO Growth και Authority: καθαρισμός οντότητας, εμπορικές σελίδες σε μορφή απάντησης, schema που συμφωνεί με το ορατό κείμενο και μέτρηση σε σταθερό σύνολο ερωτημάτων. Το Foundations δεν περιλαμβάνει ξεχωριστό πρόγραμμα GEO.',
      },
      {
        question: 'Πότε θα δούμε αποτέλεσμα;',
        answer:
          'Διορθώσεις οντότητας και FAQ μπορούν να επηρεάσουν σύντομες απαντήσεις σε εβδομάδες, σε ορισμένα ερωτήματα. Σταθερή τάση αναφορών σε ανταγωνιστικά ερωτήματα θέλει συνήθως τρίμηνα μέτρησης, όχι μία συνεδρία ChatGPT. Δεν υπόσχομαστε ότι κάποια μηχανή θα σας αναφέρει.',
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
          'Google Business Profile optimization, local landing pages, citations, review strategy, and location schema, focused on map pack and high-intent “near me” queries.',
      },
      {
        question: 'Do you run local SEO in Thessaloniki and Athens?',
        answer:
          'Yes. We have dedicated city pages and playbooks for Athens, Thessaloniki, Crete islands and other Greek markets, plus international tourism brands.',
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
          'Βελτιστοποίηση Google Business Profile, τοπικές landing pages, citations, στρατηγική κριτικών και location schema, με στόχο map pack και αναζητήσεις «κοντά μου».',
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
          'An SEO audit is a prioritized review of technical health, indexation, on-page relevance, content gaps, and authority. We deliver a fix roadmap, not a 200-item dump, then optional implementation.',
      },
      {
        question: 'What do technical SEO services include?',
        answer:
          'Crawlability, canonicals, sitemaps, Core Web Vitals, mobile usability, structured data, and internal linking, the foundations that unlock content and link investments.',
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
        question: 'Τι είναι το SEO audit;',
        answer:
          'Ένα SEO audit είναι τεχνικός έλεγχος της ιστοσελίδας: ευρετηρίαση, ταχύτητα, δομή, on-page και περιεχόμενο, με λίστα διορθώσεων κατά προτεραιότητα. Δεν είναι λίστα 200 προειδοποιήσεων από εργαλείο, αλλά πλάνο για το τι διορθώνεται πρώτο και γιατί.',
      },
      {
        question: 'Πόσο κοστίζει ένας έλεγχος SEO;',
        answer:
          'Ο τεχνικός έλεγχος SEO ξεκινά από {{ADDON_TECHNICAL_AUDIT}} και ο εκτενής από {{ADDON_ADVANCED_AUDIT}}, χωρίς ΦΠΑ. Το audit περιλαμβάνεται επίσης στον πρώτο μήνα κάθε μηνιαίου πακέτου SEO.',
      },
      {
        question: 'Υπάρχει δωρεάν έλεγχος ιστοσελίδας;',
        answer:
          'Ναι. Ο δωρεάν αρχικός έλεγχος γίνεται μέσα σε 24 ώρες σε εργάσιμες ημέρες και δείχνει αν υπάρχει σοβαρό πρόβλημα. Για άμεσο σκορ, το δωρεάν εργαλείο SEO ελέγχου δίνει αποτέλεσμα σε ένα λεπτό.',
      },
      {
        question: 'Τι περιλαμβάνει το τεχνικό SEO;',
        answer:
          'Crawlability, canonical, sitemaps, Core Web Vitals, προσαρμογή σε κινητά, δομημένα δεδομένα και εσωτερικούς συνδέσμους: τα θεμέλια που χρειάζονται το περιεχόμενο και οι σύνδεσμοι για να αποδώσουν.',
      },
      {
        question: 'Πότε θα δω αποτελέσματα μετά το audit;',
        answer:
          'Οι διορθώσεις ευρετηρίασης και τίτλων μπορεί να φανούν σε λίγες εβδομάδες. Ανταγωνιστικές αναζητήσεις χρειάζονται συνήθως 4 έως 6 μήνες συστηματικής δουλειάς.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'link-building': {
    en: [
      {
        question: 'What are link building services?',
        answer:
          'We earn relevant, editorial backlinks, guest posts, digital PR, and niche placements, that strengthen authority. Quality and topical relevance beat raw link volume.',
      },
      {
        question: 'Do you guarantee rankings from link building?',
        answer:
          'No ethical agency can guarantee rankings. We guarantee process, relevance filters, and transparent reporting, and we avoid spam networks that risk penalties.',
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
        question: 'Αξίζει να αγοράσω backlinks;',
        answer:
          'Όχι. Οι αγορασμένοι σύνδεσμοι από δίκτυα παραβιάζουν τις οδηγίες της Google και μπορεί να οδηγήσουν σε ποινή ή απλώς να αγνοηθούν. Χτίζουμε συνδέσμους που κερδίζονται, μέσω digital PR, περιεχομένου και συνεργασιών.',
      },
      {
        question: 'Πόσα backlinks χρειάζομαι;',
        answer:
          'Δεν υπάρχει μαγικός αριθμός. Μετράει η σχέση των sites που σας συνδέουν με τον κλάδο σας και η απόσταση από τους ανταγωνιστές που ήδη κατατάσσονται. Ένας σύνδεσμος από σχετικό ελληνικό site αξίζει περισσότερο από δεκάδες άσχετους.',
      },
      {
        question: 'Πόσο κοστίζει το link building;',
        answer:
          'Η ανάλυση συνδέσμων περιλαμβάνεται στο πακέτο Growth ({{SEO_GROWTH}}/μήνα) και η στρατηγική digital PR και απόκτησης συνδέσμων στο Authority ({{SEO_AUTHORITY}}/μήνα). Δεν πουλάμε συνδέσμους με το κομμάτι.',
      },
      {
        question: 'Εγγυάστε κατατάξεις από link building;',
        answer:
          'Όχι. Κανείς δεν ελέγχει τα συστήματα κατάταξης της Google. Αυτό που δεσμευόμαστε είναι η διαδικασία, τα φίλτρα ποιότητας και η διαφανής αναφορά για κάθε σύνδεσμο.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'content-creation': {
    en: [
      {
        question: 'What is SEO content?',
        answer:
          'SEO content answers a clear search intent with useful structure, proof, and internal links, so it can rank and convert. We brief and write pages mapped to real keyword demand.',
      },
      {
        question: 'Do you write blogs and service pages?',
        answer:
          'Yes. Pillar guides, service pages, location pages, and FAQs, with schema-ready Q&A for PAA and AI Overviews when relevant.',
      },
      {
        question: 'How do you pick topics?',
        answer:
          'From Search Console opportunities, commercial keyword clusters, and competitor gaps, prioritized by intent and business value, not vanity volume alone.',
      },
    ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι το SEO copywriting;',
        answer:
          'Κείμενα που απαντούν σε συγκεκριμένη πρόθεση αναζήτησης, με σωστή δομή, τίτλους και εσωτερικούς συνδέσμους, ώστε η σελίδα να κατατάσσεται και ταυτόχρονα να πείθει τον αναγνώστη να επικοινωνήσει ή να αγοράσει.',
      },
      {
        question: 'Πόσο κοστίζει ένα άρθρο SEO;',
        answer:
          'Κάθε επιπλέον σελίδα ή άρθρο τιμολογείται ως πρόσθετο, με την τιμή εκκίνησης στη σελίδα τιμών. Στα μηνιαία πακέτα SEO Growth και Authority η παραγωγή περιεχομένου περιλαμβάνεται.',
      },
      {
        question: 'Γράφετε σελίδες υπηρεσιών και άρθρα blog;',
        answer:
          'Ναι. Σελίδες υπηρεσιών, σελίδες περιοχών, οδηγούς, FAQ και περιγραφές προϊόντων, στα ελληνικά και στα αγγλικά.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'website-redesign': {
    en: DEFAULT_EN,
    el: [
      {
        question: 'Θα χάσω την κατάταξή μου με νέο site;',
        answer:
          'Όχι, αν η μετάβαση σχεδιαστεί πριν το λανσάρισμα. Καταγράφουμε κάθε URL που φέρνει κίνηση, βάζουμε 301 redirects ένα προς ένα και παρακολουθούμε ευρετηρίαση και θέσεις τις πρώτες εβδομάδες. Οι απώλειες συμβαίνουν όταν αυτό το βήμα παραλείπεται.',
      },
      {
        question: 'Πόσο κοστίζει ένας ανασχεδιασμός ιστοσελίδας;',
        answer:
          'Ο ανασχεδιασμός κοστολογείται με τα ίδια πακέτα με μια νέα κατασκευή, από {{ENTRY_WEBSITE}}. Για μεγάλα sites με πολλά URLs, το πλήρες σχέδιο μετάβασης περιλαμβάνεται στο πακέτο Business ({{WEBSITE_BUSINESS}}).',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'seo-web-design': {
    en: DEFAULT_EN,
    el: [
      {
        question: 'Ποια η διαφορά σχεδιασμού και κατασκευής ιστοσελίδας;',
        answer:
          'Ο σχεδιασμός ορίζει τη δομή, τη διάταξη και την εμπειρία κάθε σελίδας. Η κατασκευή ιστοσελίδας είναι όλο το έργο: σχεδιασμός, ανάπτυξη, περιεχόμενο, έλεγχοι και λανσάρισμα.',
      },
      {
        question: 'Μπορώ να κρατήσω το υπάρχον site και να αλλάξω μόνο τον σχεδιασμό;',
        answer:
          'Συχνά ναι, αν η τεχνική βάση είναι υγιής. Ελέγχουμε πρώτα ταχύτητα, δομή και ευρετηρίαση· αν το πρόβλημα είναι μόνο η εμφάνιση, αλλάζουμε τον σχεδιασμό χωρίς να αγγίξουμε τα URLs που ήδη κατατάσσονται.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'eshop-seo': {
    en: [
      {
        question: 'What are ecommerce SEO services?',
        answer:
          'Ecommerce SEO optimizes category and product templates, internal linking, product schema, site speed, and content so organic search drives sales, not just traffic.',
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
        question: 'Πόσο κοστίζει το SEO για ένα eshop;',
        answer:
          'Τα περισσότερα καταστήματα ξεκινούν από το πακέτο Growth ({{SEO_GROWTH}}/μήνα). Μεγάλοι κατάλογοι και ανταγωνιστικές κατηγορίες χρειάζονται συνήθως το Authority ({{SEO_AUTHORITY}}/μήνα), που καλύπτει e-commerce πανελλαδικά.',
      },
      {
        question: 'Πότε θα δω πωλήσεις από τη Google;',
        answer:
          'Οι διορθώσεις σε ευρετηρίαση και πρότυπα σελίδων μπορεί να αυξήσουν τις εμφανίσεις σε λίγες εβδομάδες. Πωλήσεις από ανταγωνιστικές κατηγορίες θέλουν συνήθως αρκετούς μήνες περιεχομένου και εργασίας στους συνδέσμους.',
      },
      {
        question: 'Δουλεύετε με WooCommerce και Shopify;',
        answer:
          'Ναι. Κάνουμε τεχνικό και on-page SEO για WooCommerce και άλλες πλατφόρμες, με ελληνικές πληρωμές και ΦΠΑ όπου χρειάζεται.',
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
  const items = entry
    ? locale === 'el'
      ? entry.el
      : entry.en
    : locale === 'el'
      ? DEFAULT_EL
      : DEFAULT_EN;
  // Prices are authored as `{{TOKEN}}` so they cannot go stale the way the
  // literals did when the summer offer expired.
  return items.map((f) => ({
    ...f,
    answer: resolvePriceTokens(f.answer, locale),
  }));
}
