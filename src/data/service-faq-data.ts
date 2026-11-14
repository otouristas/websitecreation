import { resolvePriceTokens } from '@/data/pricing';

/**
 * Service-hub FAQ content (EN + EL) for commercial money pages.
 * Used by /services/[service] with FAQPage schema.
 */

export type ServiceFaqItem = { question: string; answer: string };

const DEFAULT_EN: ServiceFaqItem[] = [
  {
    question: 'When will I know the timeline?',
    answer:
      'Before work starts, we agree which pages you need, who supplies the text and when you can review the site. A monthly SEO engagement includes a report on the work and its results.',
  },
  {
    question: 'Do you work with businesses outside Greece?',
    answer:
      'Yes. We work with businesses serving customers in Greece and abroad. We can build the site in English and Greek when your customers use both.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Send us your website, what you want visitors to do and any date you have in mind. We’ll send you a quote in euros that lists the work it covers.',
  },
];

const DEFAULT_EL: ServiceFaqItem[] = [
  {
    question: 'Πότε θα ξέρω το χρονοδιάγραμμα;',
    answer:
      'Πριν ξεκινήσουμε, συμφωνούμε ποιες σελίδες χρειάζεστε, ποιος θα ετοιμάσει το υλικό και πότε θα δείτε την πρώτη εκδοχή. Για το μηνιαίο SEO λαμβάνετε αναφορά με τις αλλαγές και τα αποτελέσματα.',
  },
  {
    question: 'Δουλεύετε και εκτός Ελλάδας;',
    answer:
      'Ναι. Συνεργαζόμαστε και με επιχειρήσεις που απευθύνονται σε πελάτες του εξωτερικού. Μπορούμε να ετοιμάσουμε τις σελίδες σας στα ελληνικά και στα αγγλικά.',
  },
  {
    question: 'Πώς παίρνω προσφορά;',
    answer:
      'Στείλτε μας την ιστοσελίδα σας, τι θέλετε να κάνουν οι επισκέπτες της και αν υπάρχει προθεσμία. Θα λάβετε προσφορά σε ευρώ με τις εργασίες που περιλαμβάνει.',
  },
];

const BY_SERVICE: Record<string, { en: ServiceFaqItem[]; el: ServiceFaqItem[] }> = {
  'website-creation': {
    en: [
      {
        question: 'How much does a website cost?',
        answer:
          'Website Starter costs {{ENTRY_WEBSITE_GROSS}} including VAT for up to five pages. Compare the Professional and Business packages if you need more pages, languages or integrations.',
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
          'Το Website Starter κοστίζει {{ENTRY_WEBSITE_GROSS}} με ΦΠΑ για έως πέντε σελίδες. Αν χρειάζεστε περισσότερες σελίδες, γλώσσες ή συνδέσεις με άλλα συστήματα, δείτε τι περιλαμβάνουν τα Professional και Business.',
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
          'SEO helps search engines find and understand your pages. With AEO we improve the answers customers can read there. With GEO we sample the questions they ask AI services and check which sources the answers cite.',
      },
      {
        question: 'Do you offer GEO / AEO services outside Greece?',
        answer:
          'Yes. We work with tourism and local businesses reaching Greece, the EU, the UK and the US. We review the questions and sources in the languages their customers actually use.',
      },
      {
        question: 'What do AI visibility packages include?',
        answer:
          'SEO Growth and Authority include dedicated AEO and GEO work. We review the details on your pages and sample answers to a fixed set of customer questions each month. Foundations covers the core SEO work.',
      },
      {
        question: 'How soon will we see a result?',
        answer:
          'We show you which pages changed in the first monthly report. We can measure what a service answered on a given date, but we cannot predict when it will choose to mention or cite a business.',
      },
    ],
    el: [
      {
        question: 'Τι είναι GEO / AEO και πώς διαφέρει από το SEO;',
        answer:
          'Με το SEO ελέγχουμε πώς βρίσκει και διαβάζει η Google την ιστοσελίδα σας. Με το AEO βελτιώνουμε τις απαντήσεις που διαβάζει εκεί ο πελάτης. Με το GEO ελέγχουμε πώς περιγράφουν την επιχείρησή σας οι υπηρεσίες AI και ποιες πηγές παραθέτουν.',
      },
      {
        question: 'Προσφέρετε υπηρεσίες GEO / AEO εκτός Ελλάδας;',
        answer:
          'Ναι. Συνεργαζόμαστε με τουριστικές και τοπικές επιχειρήσεις που απευθύνονται σε πελάτες στην Ελλάδα, την υπόλοιπη ΕΕ, το Ηνωμένο Βασίλειο και τις ΗΠΑ. Εξετάζουμε τις ερωτήσεις και τις πηγές στις γλώσσες των πελατών σας.',
      },
      {
        question: 'Τι περιλαμβάνει ένα πακέτο ορατότητας σε AI;',
        answer:
          'Τα πακέτα SEO Growth και Authority περιλαμβάνουν ξεχωριστή εργασία AEO και GEO. Ελέγχουμε τις πληροφορίες στις σελίδες σας και καταγράφουμε κάθε μήνα τις απαντήσεις σε συμφωνημένες ερωτήσεις πελατών. Το Foundations καλύπτει τη βασική εργασία SEO.',
      },
      {
        question: 'Πότε θα δούμε αποτέλεσμα;',
        answer:
          'Στην πρώτη μηνιαία αναφορά βλέπετε τι αλλάξαμε στις σελίδες σας. Μπορούμε να δείξουμε τι απάντησε μια υπηρεσία AI σε συγκεκριμένη ερώτηση και ημερομηνία. Η ίδια η υπηρεσία επιλέγει αν και πότε θα παραθέσει την επιχείρησή σας.',
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
          'We check the hours, contact details and services on your Google Business Profile. We also review your listings and location pages so someone nearby can find the right number, directions and booking link.',
      },
      {
        question: 'Do you run local SEO in Thessaloniki and Athens?',
        answer:
          'Yes. We work with businesses in both cities and elsewhere in Greece. Tell us which locations you serve and whether customers visit your premises or you travel to them.',
      },
      {
        question: 'How much does local SEO cost?',
        answer:
          'It depends on how many locations you have and the competition in each area. A single shop usually needs a review of its Business Profile, its contact page and its main local listings first.',
      },
      {
        question: 'Does local SEO still work in 2026?',
        answer:
          'Someone looking for a nearby service needs opening hours, directions, reviews and a way to call or book. Your business listing and location page let them check those details.',
      },
    ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι το τοπικό SEO;',
        answer:
          'Είναι η δουλειά που βοηθά έναν πελάτη να σας βρει στη Google και στους Χάρτες όταν ψάχνει μια υπηρεσία στην περιοχή του. Αρχίζει από το όνομα, τη διεύθυνση, το ωράριο και το τηλέφωνό σας.',
      },
      {
        question: 'Τι περιλαμβάνει το τοπικό SEO;',
        answer:
          'Ελέγχουμε το Google Business Profile, τις καταχωρίσεις σας και τις σελίδες κάθε τοποθεσίας. Έτσι ο πελάτης μπορεί να βρει σωστό τηλέφωνο, οδηγίες πρόσβασης και τρόπο να κλείσει ραντεβού.',
      },
      {
        question: 'Κάνετε τοπικό SEO σε Θεσσαλονίκη και Αθήνα;',
        answer:
          'Ναι, και σε άλλες πόλεις και νησιά της Ελλάδας. Πείτε μας ποιες περιοχές εξυπηρετείτε και αν οι πελάτες έρχονται σε εσάς ή πηγαίνετε εσείς σε αυτούς.',
      },
      {
        question: 'Πόσο κοστίζει το τοπικό SEO;',
        answer:
          'Η τιμή εξαρτάται από τα σημεία εξυπηρέτησης και τον ανταγωνισμό σε κάθε περιοχή. Για ένα κατάστημα ξεκινάμε συνήθως από το Google Business Profile, τη σελίδα επικοινωνίας και τις βασικές τοπικές καταχωρίσεις.',
      },
      {
        question: 'Πώς να βελτιώσω το τοπικό SEO μου;',
        answer:
          'Ελέγξτε πρώτα ότι η διεύθυνση, το τηλέφωνο και το ωράριο συμφωνούν στο Google Business Profile και στην ιστοσελίδα σας. Απαντήστε στις κριτικές και εξηγήστε ποιες υπηρεσίες προσφέρετε σε κάθε περιοχή.',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'seo-audits': {
    en: [
      {
        question: 'What are SEO audit services?',
        answer:
          'We check which pages Google can find, where visitors run into problems and which fixes matter first. You get the affected pages, the reason for each change and a suggested order of work.',
      },
      {
        question: 'What do technical SEO services include?',
        answer:
          'We check whether Google can reach and index the right pages, whether redirects work and what slows the site down on mobile. We also review internal links, sitemaps and structured data.',
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
          'Ελέγχουμε ποιες σελίδες βρίσκει η Google, ποιες λείπουν και τι δυσκολεύει τον επισκέπτη. Για κάθε πρόβλημα θα δείτε ποια σελίδα αφορά, γιατί αξίζει να διορθωθεί και από πού να ξεκινήσετε.',
      },
      {
        question: 'Πόσο κοστίζει ένας έλεγχος SEO;',
        answer:
          'Ο τεχνικός έλεγχος SEO ξεκινά από {{ADDON_TECHNICAL_AUDIT}} και ο εκτενής από {{ADDON_ADVANCED_AUDIT}}, χωρίς ΦΠΑ. Το audit περιλαμβάνεται επίσης στον πρώτο μήνα κάθε μηνιαίου πακέτου SEO.',
      },
      {
        question: 'Υπάρχει δωρεάν έλεγχος ιστοσελίδας;',
        answer:
          'Ναι. Στείλτε μας τη διεύθυνση και το θέμα που σας απασχολεί. Ο δωρεάν αρχικός έλεγχος βοηθά να φανεί αν χρειάζεται πιο αναλυτική εξέταση.',
      },
      {
        question: 'Τι περιλαμβάνει το τεχνικό SEO;',
        answer:
          'Ελέγχουμε αν η Google βρίσκει τις σωστές σελίδες, πού οδηγούν οι ανακατευθύνσεις και τι καθυστερεί τη φόρτωση στο κινητό. Εξετάζουμε επίσης τους εσωτερικούς συνδέσμους, τα sitemaps και τα structured data.',
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
          'Yes. We write guides, service pages, location pages and answers to customer questions in English and Greek. We agree the audience and purpose before drafting.',
      },
      {
        question: 'How do you pick topics?',
        answer:
          'We start with searches already sending people to your site and questions customers ask before they buy. Those tell us which page to write or update first.',
      },
    ...DEFAULT_EN.slice(2),
    ],
    el: [
      {
        question: 'Τι είναι το SEO copywriting;',
        answer:
          'Είναι η συγγραφή μιας σελίδας γύρω από μια πραγματική ερώτηση του πελάτη. Για παράδειγμα, μια σελίδα ενοικίασης αυτοκινήτου μπορεί να εξηγεί την εγγύηση και την ασφάλιση πριν ζητήσει από τον επισκέπτη να κάνει κράτηση.',
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
          'Ένας ανασχεδιασμός μπορεί να επηρεάσει την κατάταξη. Πριν τη μετάβαση καταγράφουμε τις σελίδες που φέρνουν επισκέπτες και αντιστοιχίζουμε κάθε παλιά διεύθυνση με τη νέα. Μετά ελέγχουμε τις ανακατευθύνσεις, την ευρετηρίαση και τα κλικ.',
      },
      {
        question: 'Πόσο κοστίζει ένας ανασχεδιασμός ιστοσελίδας;',
        answer:
          'Ο ανασχεδιασμός κοστολογείται με τα ίδια πακέτα με μια νέα κατασκευή, από {{ENTRY_WEBSITE}}. Για μεγάλα sites με πολλά URLs, το πλήρες σχέδιο μετάβασης περιλαμβάνεται στο πακέτο Business ({{WEBSITE_BUSINESS}}).',
      },
    ...DEFAULT_EL.slice(2),
    ],
  },
  'web-design': {
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
