import { resolvePriceTokens } from '@/data/pricing';

/**
 * One H2 topic block on a Greek service page. `paragraphs` may contain inline
 * links written as `[anchor](/path)`; paths are locale-less and get the /el
 * prefix at render.
 */
export interface ServiceTopicEl {
  readonly title: string;
  readonly paragraphs: readonly string[];
}

/** Greek copy for the shared service hub template, per the Greek keyword map. */
export interface ServiceHubPageEl {
  readonly h1: string;
  /** Answer-first opening paragraph. May carry `{{TOKENS}}`. */
  readonly lead: string;
  readonly includedTitle?: string;
  readonly processTitle?: string;
  readonly pricingTitle?: string;
  readonly citiesTitle?: string;
  readonly faqTitle?: string;
  readonly topics?: readonly ServiceTopicEl[];
}

/**
 * Greek translations for service slugs (programmatic SEO).
 */
export const serviceNamesEl: Record<
  string,
  {
    name: string;
    shortName: string;
    /**
     * Accusative form, used after prepositions like "για" / "σε".
     * Greek inflects, so `name` (nominative) reads broken in running copy:
     * "για Υπηρεσίες SEO & Τεχνικός Έλεγχος" -> "για υπηρεσίες SEO & τεχνικό έλεγχο".
     */
    nameAccusative: string;
    description: string;
    features?: string[];
    /** Nominative commercial keyword used to front-load SERP titles (matches real Greek queries). */
    titleKeyword?: string;
    /**
     * Exact Greek SERP strings for the hub (≤60 / ≤155 chars), from the Greek
     * keyword map. Rendered verbatim: the generic builder would truncate them
     * and append the brand a second time.
     */
    seo?: { title: string; description: string };
    /** Hub page copy that overrides the shared template (H1, lead, H2s, topic sections). */
    page?: ServiceHubPageEl;
  }
> = {
  'website-creation': {
    titleKeyword: 'Κατασκευή Ιστοσελίδων',
    name: 'Κατασκευή Ιστοσελίδων',
    shortName: 'Ιστοσελίδες',
    nameAccusative: 'κατασκευή ιστοσελίδων',
    seo: {
      title: 'Κατασκευή Ιστοσελίδων με SEO | Τιμές & Πακέτα',
      description:
        'Κατασκευή ιστοσελίδων για επιχειρήσεις σε όλη την Ελλάδα: γρήγορες, mobile-first και έτοιμες για SEO. Πακέτα με σταθερή τιμή και παράδοση σε εβδομάδες.',
    },
    description:
      'Κατασκευή ιστοσελίδων με SEO από την πρώτη μέρα: σχεδιασμός, ανάπτυξη και βελτιστοποίηση για μετατροπές, με σταθερή τιμή από {{ENTRY_WEBSITE}}.',
    features: [
      'Σχεδιασμός UX/UI στα μέτρα σας',
      'Γρήγορες σελίδες',
      'Απόλυτα προσαρμοσμένο σε κινητά',
      'Βελτιστοποίηση επιδόσεων',
      'Ενσωματωμένες βάσεις SEO',
      'Ρύθμιση Google Analytics',
    ],
  },
  'website-redesign': {
    titleKeyword: 'Ανασχεδιασμός Ιστοσελίδας',
    name: 'Ανασχεδιασμός Ιστοσελίδας',
    shortName: 'Ανασχεδιασμός',
    nameAccusative: 'ανασχεδιασμό ιστοσελίδας',
    seo: {
      title: 'Ανασχεδιασμός Ιστοσελίδας χωρίς Απώλεια SEO',
      description:
        'Ανασχεδιασμός ιστοσελίδας ή e-shop με σχέδιο redirects, ώστε να κρατήσετε κατατάξεις και επισκεψιμότητα. Νέος σχεδιασμός, ίδια ή καλύτερη θέση στη Google.',
    },
    page: {
      h1: 'Ανασχεδιασμός ιστοσελίδας χωρίς να χάσετε την κατάταξή σας',
      lead:
        'Ο ανασχεδιασμός ιστοσελίδας (website redesign) αλλάζει σχεδιασμό, ταχύτητα και δομή χωρίς να χαθούν οι σελίδες που ήδη φέρνουν κίνηση. Πριν αλλάξουμε οτιδήποτε, καταγράφουμε κάθε URL και σχεδιάζουμε τα redirects.',
      includedTitle: 'Τι περιλαμβάνει ο ανασχεδιασμός',
      pricingTitle: 'Πόσο κοστίζει ένας ανασχεδιασμός ιστοσελίδας',
      faqTitle: 'Συχνές ερωτήσεις για τον ανασχεδιασμό ιστοσελίδας',
      topics: [
        {
          title: 'Πότε χρειάζεται ανασχεδιασμός',
          paragraphs: [
            'Όταν το site είναι αργό στο κινητό, όταν δεν μπορείτε να προσθέσετε σελίδες χωρίς να φωνάξετε κάποιον, ή όταν φέρνει επισκέψεις αλλά όχι αιτήματα. Αν το πρόβλημα είναι μόνο η εμφάνιση, συχνά αρκεί αλλαγή σχεδιασμού πάνω στην ίδια δομή, χωρίς μετάβαση.',
            'Αν δεν είστε σίγουροι, ένα [SEO audit](/services/seo-audits) δείχνει τι χρειάζεται πραγματικά διόρθωση πριν αποφασίσετε για νέο site.',
          ],
        },
        {
          title: 'Redesign e-shop: προϊόντα, κατηγορίες, URLs',
          paragraphs: [
            'Σε ένα e-shop ο κίνδυνος είναι μεγαλύτερος, γιατί οι κατηγορίες και τα προϊόντα είναι αυτά που κατατάσσονται. Κρατάμε τα URLs όπου γίνεται, αντιστοιχίζουμε ένα προς ένα όσα αλλάζουν και ελέγχουμε φίλτρα και σελιδοποίηση πριν το λανσάρισμα.',
            'Αν το κατάστημα χρειάζεται νέα βάση, δείτε την [κατασκευή eshop με WooCommerce](/services/eshop-woocommerce).',
          ],
        },
        {
          title: 'Το σχέδιο μετάβασης: redirects και έλεγχοι',
          paragraphs: [
            'Καταγράφουμε κάθε σελίδα που έχει κλικ, εμφανίσεις ή εξωτερικούς συνδέσμους στο Search Console σας. Κάθε μία παίρνει προορισμό στο νέο site και 301 redirect. Πριν το λανσάρισμα ελέγχουμε το νέο site σε δοκιμαστικό περιβάλλον: τίτλους, canonical, sitemap και εσωτερικούς συνδέσμους.',
          ],
        },
        {
          title: 'Τι αλλάζει μετά την παράδοση',
          paragraphs: [
            'Τις πρώτες εβδομάδες παρακολουθούμε ευρετηρίαση, σφάλματα 404 και θέσεις στις σελίδες που μετράνε, ώστε μια απώλεια να διορθωθεί αμέσως και όχι μήνες αργότερα. Ο αναλυτικός οδηγός είναι στο άρθρο για τη [μετάβαση ιστοσελίδας χωρίς απώλεια SEO](/blog/anasxediasmos-istoselidas).',
          ],
        },
      ],
    },
    description:
      'Μετατρέψτε παλιές ιστοσελίδες σε σύγχρονες, γρήγορες και φιλικές προς την αναζήτηση - με ασφαλή μεταφορά SEO.',
    features: [
      'Βελτιστοποίηση ταχύτητας',
      'Σύγχρονη ανανέωση σχεδιασμού',
      'Ασφαλής μεταφορά SEO',
      'Αναδόμηση περιεχομένου',
      'Βελτιστοποίηση για κινητά',
      'Έλεγχος επιδόσεων',
    ],
  },
  'seo-web-design': {
    // Was 'SEO Web Design'. This page owns «σχεδιασμός ιστοσελίδων / web design»;
    // /services/website-creation owns «κατασκευή / δημιουργία ιστοσελίδας».
    titleKeyword: 'Σχεδιασμός Ιστοσελίδων',
    name: 'Σχεδιασμός Ιστοσελίδων (Web Design)',
    shortName: 'Web Design',
    nameAccusative: 'σχεδιασμό ιστοσελίδων',
    seo: {
      title: 'Σχεδιασμός Ιστοσελίδων (Web Design) με SEO',
      description:
        'Σχεδιασμός ιστοσελίδων με UX και SEO από την αρχή: δομή, κείμενα και ταχύτητα που μετατρέπουν επισκέπτες σε πελάτες. Web design για ελληνικές επιχειρήσεις.',
    },
    page: {
      h1: 'Σχεδιασμός ιστοσελίδων (web design) με SEO από την αρχή',
      lead:
        'Ο σχεδιασμός ιστοσελίδων που κάνουμε ξεκινά από το τι ψάχνουν οι πελάτες σας στη Google και μετά αποφασίζει χρώματα και διάταξη. Έτσι κάθε σελίδα έχει έναν σκοπό, μια λέξη-κλειδί και ένα σαφές επόμενο βήμα.',
      includedTitle: 'Τι περιλαμβάνει ο σχεδιασμός ιστοσελίδας',
      faqTitle: 'Συχνές ερωτήσεις για το web design',
      topics: [
        {
          title: 'Web design που ξεκινά από την αναζήτηση',
          paragraphs: [
            'Πριν από το πρώτο wireframe αποφασίζουμε ποιες σελίδες χρειάζεστε και ποια αναζήτηση απαντά η καθεμία. Η αρχιτεκτονική, το μενού και οι εσωτερικοί σύνδεσμοι σχεδιάζονται γύρω από αυτό, ώστε ο σχεδιασμός να μη χρειαστεί να ξαναγίνει όταν ξεκινήσει το SEO.',
          ],
        },
        {
          title: 'UX, ταχύτητα και Core Web Vitals',
          paragraphs: [
            'Ένα όμορφο site που αργεί χάνει επισκέπτες πριν τον δουν. Σχεδιάζουμε με ελαφριές γραμματοσειρές, σωστά μεγέθη εικόνων και σταθερή διάταξη, ώστε τα Core Web Vitals να περνούν από το σχέδιο και όχι με διορθώσεις μετά.',
          ],
        },
        {
          title: 'Σχεδιασμός για κινητά πρώτα',
          paragraphs: [
            'Οι περισσότεροι επισκέπτες μιας τοπικής επιχείρησης έρχονται από κινητό. Γι’ αυτό κάθε σελίδα σχεδιάζεται και εγκρίνεται πρώτα στην οθόνη του κινητού: κουμπί κλήσης, φόρμα με λίγα πεδία και κείμενο που διαβάζεται χωρίς zoom.',
          ],
        },
        {
          title: 'Σχεδιασμός ή κατασκευή ιστοσελίδας;',
          paragraphs: [
            'Ο σχεδιασμός ορίζει πώς φαίνεται και πώς λειτουργεί κάθε σελίδα. Η [κατασκευή ιστοσελίδων](/services/website-creation) είναι ολόκληρο το έργο: σχεδιασμός, ανάπτυξη, περιεχόμενο και λανσάρισμα. Αν έχετε ήδη site που λειτουργεί τεχνικά, μπορούμε να αλλάξουμε μόνο τον σχεδιασμό· αν όχι, ξεκινάμε από την κατασκευή.',
          ],
        },
      ],
    },
    description:
      'Σχεδιασμός ιστοσελίδων με UX και SEO από την αρχή: αρχιτεκτονική, schema, εσωτερικοί σύνδεσμοι και ταχύτητα που μετατρέπουν επισκέπτες σε πελάτες.',
    features: [
      'Τεχνικός έλεγχος SEO',
      'Schema markup',
      'Στρατηγική εσωτερικών συνδέσμων',
      'Αρχιτεκτονική ιστοσελίδας',
      'Βελτιστοποίηση meta ετικετών',
      'Βελτιστοποίηση ταχύτητας',
    ],
  },
  'speed-optimization': {
    titleKeyword: 'Βελτιστοποίηση Ταχύτητας',
    name: 'Βελτιστοποίηση Ταχύτητας',
    shortName: 'Ταχύτητα',
    nameAccusative: 'βελτιστοποίηση ταχύτητας',
    description:
      'Core Web Vitals, caching και βελτιστοποίηση κώδικα για ταχύτερη ιστοσελίδα και καλύτερες κατατάξεις.',
    features: [
      'Έλεγχος επιδόσεων',
      'Βελτιστοποίηση χρόνου φόρτωσης',
      'Βελτιστοποίηση εικόνων',
      'Ταχύτητα σε κινητά',
      'Ρύθμιση caching',
      'Βελτιστοποίηση κώδικα',
    ],
  },
  'ai-visibility': {
    titleKeyword: 'AI SEO (GEO / AEO)',
    name: 'AI SEO: Ορατότητα σε AI (GEO / AEO)',
    shortName: 'AI SEO',
    nameAccusative: 'AI SEO (GEO / AEO)',
    seo: {
      title: 'AI SEO & GEO: Ορατότητα στο ChatGPT και AI Overviews',
      description:
        'Υπηρεσίες AI SEO (GEO/AEO): δουλεύουμε ώστε η επιχείρησή σας να μπορεί να αναφέρεται στις απαντήσεις του ChatGPT, του Gemini και των AI Overviews.',
    },
    description:
      'GEO και AEO για επιχειρήσεις: σαφή στοιχεία, σελίδες σε μορφή απάντησης και μέτρηση, ώστε οι μηχανές απάντησης να μπορούν να χρησιμοποιήσουν το περιεχόμενό σας. Χωρίς υποσχέσεις αναφοράς.',
    features: [
      'Συνέπεια οντότητας και στοιχείων επιχείρησης',
      'FAQ σε μορφή απάντησης για AEO',
      'Schema που συμφωνεί με το ορατό κείμενο',
      'Εμπορικές σελίδες με σαφή γεγονότα',
      'Μηνιαία δειγματοληψία αναφορών, όχι «AI rank»',
      'Προγράμματα για τουρισμό και τοπικές επιχειρήσεις',
    ],
  },
  'logo-design': {
    titleKeyword: 'Σχεδιασμός Λογοτύπου',
    name: 'Σχεδιασμός Λογοτύπου',
    shortName: 'Εταιρική ταυτότητα',
    nameAccusative: 'σχεδιασμό λογοτύπου',
    description: 'Επαγγελματικό λογότυπο και πλήρες κιτ εταιρικής ταυτότητας για αναγνωρισιμότητα στην αγορά σας.',
    features: [
      'Σχεδιασμός λογοτύπου στα μέτρα σας',
      'Κιτ εταιρικής ταυτότητας',
      'Παλέτα χρωμάτων',
      'Τυπογραφία',
      'Οδηγός χρήσης ταυτότητας',
      'Πολλαπλές μορφές αρχείων',
    ],
  },
  'content-creation': {
    titleKeyword: 'SEO Copywriting',
    name: 'SEO Copywriting & Δημιουργία Περιεχομένου',
    shortName: 'SEO Copywriting',
    nameAccusative: 'SEO copywriting και δημιουργία περιεχομένου',
    seo: {
      title: 'SEO Copywriting & Δημιουργία Περιεχομένου',
      description:
        'Υπηρεσίες SEO copywriting: κείμενα σελίδων, άρθρα blog και περιγραφές προϊόντων γραμμένα για αναγνώστες και για τη Google, στα ελληνικά και αγγλικά.',
    },
    page: {
      h1: 'SEO copywriting και δημιουργία περιεχομένου που κατατάσσεται',
      lead:
        'Το SEO copywriting γράφει κείμενα που απαντούν σε αυτό που ψάχνει ο πελάτης και ταυτόχρονα βοηθούν τη Google να καταλάβει τη σελίδα. Γράφουμε σελίδες υπηρεσιών, άρθρα και περιγραφές προϊόντων σε ελληνικά και αγγλικά.',
      includedTitle: 'Τι περιλαμβάνει το SEO copywriting',
      faqTitle: 'Συχνές ερωτήσεις για το SEO copywriting',
      topics: [
        {
          title: 'Κείμενα σελίδων, άρθρα, περιγραφές προϊόντων',
          paragraphs: [
            'Σελίδες υπηρεσιών που λένε τι κάνετε, για ποιον και πόσο κοστίζει. Άρθρα που απαντούν στις ερωτήσεις πριν από την αγορά. Περιγραφές προϊόντων που δεν αντιγράφουν τον προμηθευτή. Κάθε κείμενο ξεκινά από μια λέξη-κλειδί και μια πρόθεση αναζήτησης, όχι από αριθμό λέξεων.',
            'Για τα βασικά του on-page δείτε τον οδηγό [on-page SEO](/blog/on-page-seo-el).',
          ],
        },
        {
          title: 'Δίγλωσσο περιεχόμενο για τουρισμό',
          paragraphs: [
            'Ξενοδοχεία, rent-a-car και εκδρομές χρειάζονται κείμενα που δουλεύουν και στα ελληνικά και στα αγγλικά. Δεν μεταφράζουμε λέξη προς λέξη: κάθε γλώσσα στοχεύει τις αναζητήσεις που κάνει το δικό της κοινό.',
          ],
        },
      ],
    },
    description:
      'Κείμενα με SEO για σελίδες υπηρεσιών, τοπικές σελίδες και blog που φέρνουν οργανική επισκεψιμότητα.',
    features: [
      'Συγγραφή κειμένων με SEO',
      'Περιεχόμενο σελίδων υπηρεσιών',
      'Τοπικό περιεχόμενο',
      'Άρθρα blog',
      'Κείμενα που μετατρέπουν',
      'Στρατηγική περιεχομένου',
    ],
  },
  'local-seo': {
    titleKeyword: 'Τοπικό SEO',
    name: 'Τοπικό SEO & Google Business',
    shortName: 'Τοπικό SEO',
    nameAccusative: 'τοπικό SEO & Google Business',
    seo: {
      title: 'Τοπικό SEO & Google Business Profile | AnotherSEOGuru',
      description:
        'Τοπικό SEO για επιχειρήσεις: βελτιστοποίηση Google Business Profile, κριτικές και καταχώρηση στο Google Maps, για να σας βρίσκουν πελάτες κοντά σας.',
    },
    description:
      'Τοπικό SEO για Ελλάδα: βελτιστοποίηση Google Business Profile, καταχωρήσεις, κριτικές και τοπικές σελίδες ώστε να εμφανίζεστε στο map pack για Αθήνα, Θεσσαλονίκη και άλλες πόλεις.',
    features: [
      'Βελτιστοποίηση Google Business Profile',
      'Τοπικές καταχωρήσεις (citations) & NAP',
      'Στρατηγική κριτικών',
      'Τοπικές λέξεις-κλειδιά & landing pages',
      'Κατάταξη στον χάρτη της Google (map pack)',
      'Στόχευση ανά πόλη / περιοχή',
    ],
  },
  'link-building': {
    titleKeyword: 'Link Building',
    name: 'Link Building & Backlinks',
    shortName: 'Link building',
    nameAccusative: 'link building και backlinks',
    seo: {
      title: 'Link Building & Backlinks για Ελληνικά Sites',
      description:
        'Υπηρεσίες link building: ποιοτικά backlinks από σχετικά ελληνικά sites, digital PR και καθαρισμός spam συνδέσμων. Χωρίς αγορά συνδέσμων από δίκτυα.',
    },
    page: {
      h1: 'Link building: ποιοτικά backlinks από ελληνικά sites',
      lead:
        'Το link building είναι η απόκτηση συνδέσμων (backlinks) από άλλα sites προς το δικό σας. Τα ελληνικά backlinks που χτίζουμε έρχονται από σχετικά sites και media μέσω digital PR και περιεχομένου, όχι από δίκτυα πώλησης συνδέσμων.',
      includedTitle: 'Τι περιλαμβάνει το link building',
      pricingTitle: 'Πόσο κοστίζει το link building',
      faqTitle: 'Συχνές ερωτήσεις για τα backlinks',
      topics: [
        {
          title: 'Τι είναι τα backlinks και γιατί μετράνε',
          paragraphs: [
            'Ένα backlink είναι σύνδεσμος από άλλο site προς το δικό σας. Η Google τα διαβάζει ως συστάσεις: ένας σύνδεσμος από σχετικό, αξιόπιστο site βοηθά μια σελίδα να κατατάσσεται, ενώ δεκάδες σύνδεσμοι από άσχετα sites δεν βοηθούν και μπορεί να βλάψουν. Τα βασικά εξηγούνται στο άρθρο [τι είναι τα backlinks](/blog/ti-einai-ta-backlinks).',
          ],
        },
        {
          title: 'Πώς χτίζουμε συνδέσμους: digital PR, περιεχόμενο, συνεργασίες',
          paragraphs: [
            'Ξεκινάμε από κάτι που αξίζει σύνδεσμο: έναν οδηγό, δεδομένα από τον κλάδο σας ή μια ιστορία που ενδιαφέρει τοπικά media. Μετά το προτείνουμε σε συγκεκριμένους αρθρογράφους και sites, ένα προς ένα. Συνεργασίες με προμηθευτές, συλλόγους και τοπικούς φορείς δίνουν επίσης φυσικούς συνδέσμους.',
          ],
        },
        {
          title: 'Ελληνικά backlinks vs διεθνή',
          paragraphs: [
            'Για ελληνικό κοινό μετράει περισσότερο ένας σύνδεσμος από ελληνικό site του κλάδου σας παρά δέκα από ξένους καταλόγους. Για τουριστικές επιχειρήσεις με ξένους πελάτες, στοχεύουμε και διεθνή ταξιδιωτικά sites στη γλώσσα της αγοράς.',
          ],
        },
        {
          title: 'Έλεγχος και καθαρισμός spam συνδέσμων',
          paragraphs: [
            'Αν το site σας έχει ιστορικό αγορασμένων ή αυτόματων συνδέσμων, ξεκινάμε με έλεγχο του προφίλ. Δεν αποκηρύσσουμε συνδέσμους στα τυφλά· μόνο όσους δείχνουν πραγματικό μοτίβο spam. Ο έλεγχος συνδέσμων είναι μέρος του [SEO audit](/services/seo-audits).',
          ],
        },
      ],
    },
    description:
      'Link building με ποιοτικά backlinks από σχετικά ελληνικά sites, digital PR και καθαρισμό spam συνδέσμων, για αύξηση της αξιοπιστίας του domain σας.',
    features: [
      'Guest posts σε ιστοσελίδες υψηλού κύρους',
      'Σύνδεσμοι από σχετικές ιστοσελίδες',
      'Digital PR',
      'Αξιοποίηση σπασμένων συνδέσμων',
      'Στρατηγική anchor text',
      'Παρακολούθηση για spam συνδέσμους',
    ],
  },
  'seo-audits': {
    // Was `titleKeyword: 'Υπηρεσίες SEO'`, which put this audit page in
    // competition with /el/seo-services for the head term. This page sells an
    // audit; the pillar sells the retainer.
    // shortName / nameAccusative / description used to say «Υπηρεσίες SEO»,
    // the head term /el/seo-services owns. The hub is now named and described
    // as an audit; its city children keep «SEO {πόλη}» wording (see
    // `serviceCityCopyEl` below).
    titleKeyword: 'SEO Audit',
    name: 'SEO Audit & Τεχνικός Έλεγχος',
    shortName: 'SEO Audit',
    nameAccusative: 'SEO audit και τεχνικό έλεγχο',
    seo: {
      title: 'SEO Audit: Τεχνικός Έλεγχος Ιστοσελίδας | AnotherSEOGuru',
      description:
        'Τεχνικό SEO audit ιστοσελίδας: ευρετηρίαση, ταχύτητα, δομή και περιεχόμενο, με λίστα διορθώσεων κατά προτεραιότητα. Δωρεάν αρχικός έλεγχος σε 24 ώρες.',
    },
    page: {
      h1: 'SEO audit: τεχνικός έλεγχος ιστοσελίδας με λίστα διορθώσεων',
      lead:
        'Ένα SEO audit εντοπίζει ό,τι εμποδίζει τη Google να βρει, να διαβάσει και να κατατάξει τις σελίδες σας. Ο τεχνικός έλεγχος ιστοσελίδας καλύπτει ευρετηρίαση, ταχύτητα, δομή και περιεχόμενο και καταλήγει σε λίστα διορθώσεων κατά προτεραιότητα. Το πλήρες audit ξεκινά από {{ADDON_TECHNICAL_AUDIT}}.',
      includedTitle: 'Τι ελέγχει ένα SEO audit',
      processTitle: 'Παραδοτέα και χρόνος',
      pricingTitle: 'Πόσο κοστίζει ένας έλεγχος SEO',
      citiesTitle: 'SEO σε Αθήνα, Θεσσαλονίκη, Κρήτη και νησιά',
      faqTitle: 'Συχνές ερωτήσεις για το SEO audit',
      topics: [
        {
          title: 'Δωρεάν έλεγχος 24 ωρών ή πλήρες audit;',
          paragraphs: [
            'Ο δωρεάν αρχικός έλεγχος σάς λέει μέσα σε 24 ώρες αν υπάρχει σοβαρό τεχνικό πρόβλημα και τι να κοιτάξετε πρώτα. Αν θέλετε μόνο ένα γρήγορο σκορ, ο [δωρεάν SEO έλεγχος ιστοσελίδας](/tools/free-seo-audit) δίνει αποτέλεσμα σε ένα λεπτό.',
            'Το πλήρες audit πηγαίνει σελίδα προς σελίδα: δεδομένα Search Console, ανταγωνιστές που πραγματικά εμφανίζονται και ιεραρχημένες διορθώσεις που μπορεί να υλοποιήσει η ομάδα σας ή εμείς.',
          ],
        },
        {
          title: 'Τι γίνεται μετά το audit',
          paragraphs: [
            'Μπορείτε να υλοποιήσετε τις διορθώσεις in-house, με τη λίστα και τις οδηγίες που παραδίδουμε. Αν θέλετε συνεχή δουλειά, οι [υπηρεσίες SEO](/seo-services) ξεκινούν από αυτό ακριβώς το πλάνο. Για το on-page κομμάτι, ο οδηγός [on-page SEO](/blog/on-page-seo-el) εξηγεί τι ελέγχεται σε κάθε σελίδα.',
          ],
        },
      ],
    },
    description:
      'SEO audit ιστοσελίδας: τεχνικός έλεγχος ευρετηρίασης, ταχύτητας, δομής και περιεχομένου, με λίστα διορθώσεων κατά προτεραιότητα. Πλήρες audit από {{ADDON_TECHNICAL_AUDIT}}.',
    features: [
      'Πλήρης τεχνικός SEO audit',
      'Core Web Vitals & ταχύτητα',
      'On-page βελτιστοποίηση & περιεχόμενο',
      'Έρευνα λέξεων-κλειδιών',
      'Ανάλυση ανταγωνισμού',
      'Πλάνο προώθησης & μηνιαία αναφορά',
    ],
  },
  'eshop-woocommerce': {
    titleKeyword: 'Κατασκευή Eshop',
    name: 'Κατασκευή Eshop με WooCommerce',
    shortName: 'Κατασκευή Eshop',
    nameAccusative: 'κατασκευή eshop με WooCommerce',
    seo: {
      title: 'Κατασκευή Eshop με WooCommerce | Τιμές 2026',
      description:
        'Κατασκευή e-shop με WooCommerce: πληρωμές, μεταφορικά, σύνδεση με ERP και SEO προϊόντων. Δείτε τιμές κατασκευής eshop και τι περιλαμβάνει κάθε πακέτο.',
    },
    page: {
      h1: 'Κατασκευή eshop με WooCommerce, έτοιμο να πουλάει',
      lead:
        'Η κατασκευή eshop (ηλεκτρονικού καταστήματος) γίνεται σε WooCommerce, με πληρωμές με κάρτα, μεταφορικά και τιμολόγηση ρυθμισμένα για την Ελλάδα. Η δημιουργία eshop ξεκινά από {{ADDON_ECOMMERCE}} επιπλέον του πακέτου ιστοσελίδας και περιλαμβάνει SEO για κατηγορίες και προϊόντα.',
      includedTitle: 'Τι περιλαμβάνει η δημιουργία eshop',
      pricingTitle: 'Τιμές κατασκευής eshop',
      citiesTitle: 'Κατασκευή eshop σε Αθήνα, Θεσσαλονίκη, Κρήτη και νησιά',
      faqTitle: 'Συχνές ερωτήσεις για την κατασκευή eshop',
      topics: [
        {
          title: 'Γιατί WooCommerce (και πότε Shopify)',
          paragraphs: [
            'Το WooCommerce τρέχει πάνω σε WordPress, άρα η κατασκευή eshop με WordPress και η κατασκευή WooCommerce είναι το ίδιο έργο. Το κατάστημα, τα δεδομένα και οι πελάτες μένουν δικά σας, χωρίς μηνιαία συνδρομή πλατφόρμας και προμήθεια ανά πώληση, και υπάρχουν έτοιμες συνδέσεις για ελληνικές τράπεζες, courier και τιμολόγηση.',
            'Το Shopify έχει νόημα όταν θέλετε γρήγορο ξεκίνημα με λίγα προϊόντα και δεν σας πειράζει η μηνιαία συνδρομή. Αν έχετε ήδη κατάστημα σε OpenCart, Magento ή Shopify, το κοιτάμε πρώτα και σας λέμε αν αξίζει μετάβαση ή διόρθωση.',
          ],
        },
        {
          title: 'Κατασκευή eshop με σύνδεση ERP',
          paragraphs: [
            'Αν το απόθεμα, οι τιμές και οι παραγγελίες ζουν στο εμπορικό σας πρόγραμμα, η διασύνδεση eshop και ERP γλιτώνει τις διπλές καταχωρήσεις. Ξεκινάμε από το τι πρέπει να συγχρονίζεται (κωδικοί, απόθεμα, τιμές, παραγγελίες) και πόσο συχνά, και κοστολογούμε τη σύνδεση ως ξεχωριστή, custom εργασία, αφού εξαρτάται από το πρόγραμμα που χρησιμοποιείτε.',
          ],
        },
        {
          title: 'B2B eshop και χονδρική',
          paragraphs: [
            'Ένα B2B eshop χρειάζεται τιμοκαταλόγους ανά πελάτη, ελάχιστες ποσότητες, αγορά με ΑΦΜ και εγκεκριμένους λογαριασμούς πριν δει κανείς τιμές. Το WooCommerce τα υποστηρίζει, και μπορεί να τρέχει χονδρική και λιανική στο ίδιο κατάστημα.',
          ],
        },
        {
          title: 'Eshop για φαρμακεία και καλλυντικά',
          paragraphs: [
            'Στα φαρμακεία και τα καλλυντικά ο κατάλογος είναι μεγάλος και οι αναζητήσεις γίνονται με όνομα προϊόντος. Χρειάζεστε καθαρή δομή κατηγοριών και brands, γρήγορη αναζήτηση και σελίδες προϊόντων που δεν αντιγράφουν το κείμενο του προμηθευτή. Για προϊόντα με ειδικούς κανόνες πώλησης online, ελέγξτε πρώτα τι επιτρέπεται.',
          ],
        },
        {
          title: 'Πριν ξεκινήσετε',
          paragraphs: [
            'Για τα τυπικά (έναρξη στην εφορία, όροι χρήσης, πληρωμές, επιδοτήσεις) δείτε τον οδηγό [τι χρειάζεται για να ανοίξετε eshop](/blog/ti-xreiazetai-gia-eshop). Για το συνολικό κόστος, το άρθρο [πόσο κοστίζει ένα eshop](/blog/kataskevi-eshop-odigos). Όταν το κατάστημα είναι live, το [SEO για eshop](/services/eshop-seo) φέρνει τις πωλήσεις από την οργανική αναζήτηση.',
          ],
        },
      ],
    },
    description:
      'Κατασκευή eshop με WooCommerce: πληρωμές, μεταφορικά, σύνδεση με ERP και SEO κατηγοριών και προϊόντων, έτοιμο να πουλάει από την πρώτη μέρα.',
    features: [
      'Εγκατάσταση & ρύθμιση WooCommerce',
      'Σχεδιασμός σελίδων προϊόντων',
      'Σύνδεση με πύλες πληρωμών',
      'Ρύθμιση μεταφορικών & ολοκλήρωσης παραγγελίας',
      'SEO δομή κατηγοριών',
      'Διαχείριση αποθέματος',
    ],
  },
  'eshop-seo': {
    titleKeyword: 'SEO για Eshop',
    name: 'SEO για Eshop',
    shortName: 'Eshop SEO',
    nameAccusative: 'SEO ηλεκτρονικού καταστήματος',
    seo: {
      title: 'SEO για Eshop | Προώθηση Ηλεκτρονικού Καταστήματος',
      description:
        'SEO για eshop: κατηγορίες, σελίδες προϊόντων, φίλτρα και ταχύτητα, ώστε το ηλεκτρονικό σας κατάστημα να πουλάει από την οργανική αναζήτηση στη Google.',
    },
    page: {
      h1: 'SEO για eshop και προώθηση ηλεκτρονικού καταστήματος',
      lead:
        'Το SEO για e-shop δουλεύει διαφορετικά από ένα site παρουσίασης: οι πωλήσεις έρχονται από σελίδες κατηγοριών και προϊόντων. Η προώθηση eshop που κάνουμε ξεκινά από αυτές, μετά διορθώνει φίλτρα, διπλότυπα και ταχύτητα.',
      includedTitle: 'Τι περιλαμβάνει το SEO για eshop',
      faqTitle: 'Συχνές ερωτήσεις για το SEO eshop',
      topics: [
        {
          title: 'SEO κατηγοριών και προϊόντων',
          paragraphs: [
            'Οι κατηγορίες κατατάσσονται για τις εμπορικές αναζητήσεις («παπούτσια τρεξίματος γυναικεία»), τα προϊόντα για τις αναζητήσεις με όνομα και κωδικό. Γράφουμε μοναδικό κείμενο στις κατηγορίες που φέρνουν ζήτηση, διορθώνουμε τίτλους και περιγραφές προϊόντων και προσθέτουμε schema προϊόντος με τιμή και διαθεσιμότητα.',
          ],
        },
        {
          title: 'Φίλτρα, διπλότυπα και canonical',
          paragraphs: [
            'Τα φίλτρα μεγέθους, χρώματος και τιμής παράγουν χιλιάδες URLs που ανταγωνίζονται τις κατηγορίες σας. Αποφασίζουμε ποια φίλτρα αξίζει να ευρετηριάζονται (γιατί έχουν δική τους ζήτηση) και ποια όχι, και ρυθμίζουμε canonical και εσωτερικούς συνδέσμους ανάλογα.',
          ],
        },
        {
          title: 'Προώθηση eshop: SEO, Google Shopping ή διαφήμιση;',
          paragraphs: [
            'Η διαφήμιση eshop φέρνει πωλήσεις από την πρώτη μέρα, αλλά κοστίζει σε κάθε κλικ. Το SEO αργεί μερικούς μήνες, όμως μειώνει το κόστος ανά πώληση με τον καιρό. Τα περισσότερα καταστήματα κερδίζουν με συνδυασμό· η σύγκριση είναι στο άρθρο [SEO ή Google Ads](/blog/seo-i-google-ads).',
          ],
        },
        {
          title: 'Μετρήσεις: πωλήσεις από οργανική αναζήτηση',
          paragraphs: [
            'Η μηνιαία αναφορά δείχνει πωλήσεις και έσοδα από την οργανική αναζήτηση, ανά κατηγορία, όχι μόνο θέσεις και επισκέψεις. Αν το κατάστημα χρειάζεται πρώτα νέα βάση, δείτε την [κατασκευή eshop](/services/eshop-woocommerce).',
          ],
        },
      ],
    },
    description:
      'SEO για eshop: βελτιστοποίηση κατηγοριών, προϊόντων, φίλτρων και ταχύτητας, ώστε το ηλεκτρονικό σας κατάστημα να πουλάει από την οργανική αναζήτηση.',
    features: [
      'Τεχνικός έλεγχος για e-shop',
      'Βελτιστοποίηση κατηγοριών & προϊόντων',
      'Schema markup προϊόντων (JSON-LD)',
      'Έρευνα λέξεων-κλειδιών e-commerce',
      'Ταχύτητα & βελτιστοποίηση για κινητά',
      'Βελτιστοποίηση ποσοστού μετατροπής (CRO)',
    ],
  },
};

/**
 * Greek service copy, with `{{ENTRY_SEO}}`-style price tokens resolved.
 *
 * Resolved here rather than in each consumer: these descriptions render on the
 * services hub, the mega menu, the mobile sheet, service x location pages and
 * llms.txt, and a token reaching any one of those is a visible bug.
 */
export function getServiceEl(slug: string) {
  const entry = serviceNamesEl[slug];
  if (!entry) return entry;
  return { ...entry, description: resolvePriceTokens(entry.description, 'el') };
}

/* ------------------------------------------------------------------ city pages */

/** What a Greek service × city template needs to know about the city. */
export interface CityCopyContext {
  /** Nominative, e.g. «Θεσσαλονίκη». */
  readonly city: string;
  /** Locative, e.g. «στη Θεσσαλονίκη». */
  readonly inCity: string;
  /** Location slug, e.g. `thessaloniki-gr`. */
  readonly slug: string;
  /** «Καλαμαριά, Τούμπα και Άνω Πόλη», or '' when the city has none listed. */
  readonly hoods: string;
}

/**
 * Greek copy for the four service × city templates.
 *
 * One owner per phrase (keyword map, cannibalisation row 11):
 *  - website-creation/{city} owns «κατασκευή ιστοσελίδων + πόλη»
 *  - eshop-woocommerce/{city} owns «κατασκευή eshop + πόλη»
 *  - seo-audits/{city} owns «SEO / υπηρεσίες SEO / προώθηση ιστοσελίδων + πόλη»
 *  - local-seo/{city} owns «τοπικό SEO / Google Maps + πόλη»
 * Each title and H1 uses only its own phrase. Mentions of a sibling service
 * appear only as links to that sibling's page.
 *
 * No local client, project or result is claimed: none is recorded per city.
 * A real local proof line should be added to `lead` once the owner supplies one.
 */
export interface ServiceCityCopyEl {
  readonly title: (c: CityCopyContext) => string;
  readonly description: (c: CityCopyContext) => string;
  readonly h1: (c: CityCopyContext) => string;
  /** Trailing part of the H1 to set in the serif accent (must be its suffix). */
  readonly h1Accent: (c: CityCopyContext) => string;
  /** Opening paragraph, plain text. May carry `{{TOKENS}}`. */
  readonly lead: (c: CityCopyContext) => string;
  readonly includedTitle: (c: CityCopyContext) => string;
  readonly pricingTitle: (c: CityCopyContext) => string;
  readonly pricingQuestion: (c: CityCopyContext) => string;
  readonly ctaTitle: (c: CityCopyContext) => string;
  readonly topics: (c: CityCopyContext) => readonly ServiceTopicEl[];
}

const withHoods = (c: CityCopyContext) => (c.hoods ? ` και στις γύρω περιοχές (${c.hoods})` : ' και στις γύρω περιοχές');

export const serviceCityCopyEl: Record<string, ServiceCityCopyEl> = {
  'website-creation': {
    title: (c) => `Κατασκευή Ιστοσελίδων ${c.city} | AnotherSEOGuru`,
    description: (c) =>
      `Κατασκευή ιστοσελίδων ${c.inCity}: γρήγορα sites με SEO, σαφείς τιμές και υποστήριξη στα ελληνικά. Δείτε πακέτα και έργα και ζητήστε προσφορά.`,
    h1: (c) => `Κατασκευή ιστοσελίδων ${c.inCity}`,
    h1Accent: (c) => c.inCity,
    lead: (c) =>
      `Φτιάχνουμε ιστοσελίδες για επιχειρήσεις ${c.inCity}${withHoods(c)}, με σταθερή τιμή από {{ENTRY_WEBSITE}}. Κάθε site παραδίδεται με βασικό τοπικό SEO, ώστε να εμφανίζεται όταν κάποιος ψάχνει την υπηρεσία σας με όνομα πόλης.`,
    includedTitle: (c) => `Κατασκευή ιστοσελίδας ${c.inCity}: τι περιλαμβάνει`,
    pricingTitle: (c) => `Τιμές κατασκευής ιστοσελίδων ${c.inCity}`,
    pricingQuestion: (c) => `Πόσο κοστίζει μια ιστοσελίδα ${c.inCity};`,
    ctaTitle: (c) => `Ζητήστε προσφορά για ιστοσελίδα ${c.inCity}`,
    topics: (c) => [
      {
        title: 'Ιστοσελίδα παρουσίασης ή ηλεκτρονικό κατάστημα;',
        paragraphs: [
          `Αν πουλάτε προϊόντα online, το έργο είναι e-shop και έχει δική του σελίδα: [κατασκευή eshop ${c.inCity}](/services/eshop-woocommerce/${c.slug}). Για όλες τις επιλογές, τα πακέτα και τη διαδικασία δείτε την κεντρική σελίδα για την [κατασκευή ιστοσελίδων](/services/website-creation), και για το συνολικό κόστος τον οδηγό [πόσο κοστίζει μια ιστοσελίδα](/blog/poso-kostizei-mia-istoselida).`,
        ],
      },
    ],
  },
  'eshop-woocommerce': {
    title: (c) => `Κατασκευή Eshop ${c.city} | WooCommerce & SEO`,
    description: (c) =>
      `Κατασκευή eshop ${c.inCity} με WooCommerce: πληρωμές, μεταφορικά, σύνδεση ERP και SEO προϊόντων. Δείτε τιμές κατασκευής eshop και ζητήστε προσφορά.`,
    h1: (c) => `Κατασκευή eshop ${c.inCity}`,
    h1Accent: (c) => c.inCity,
    lead: (c) =>
      `Φτιάχνουμε e-shop για επιχειρήσεις ${c.inCity} σε WooCommerce, με πληρωμές, μεταφορικά και τιμολόγηση έτοιμα από την πρώτη μέρα. Η δημιουργία eshop ξεκινά από {{ADDON_ECOMMERCE}} επιπλέον του πακέτου ιστοσελίδας.`,
    includedTitle: (c) => `Δημιουργία eshop ${c.inCity}: τι περιλαμβάνει`,
    pricingTitle: (c) => `Τιμές κατασκευής eshop ${c.inCity}`,
    pricingQuestion: (c) => `Πόσο κοστίζει ένα eshop ${c.inCity};`,
    ctaTitle: (c) => `Ζητήστε προσφορά για eshop ${c.inCity}`,
    topics: () => [
      {
        title: 'Πριν ξεκινήσετε το eshop',
        paragraphs: [
          'Πληρωμές, ERP, B2B και η επιλογή WooCommerce ή Shopify εξηγούνται στην κεντρική σελίδα για την [κατασκευή eshop με WooCommerce](/services/eshop-woocommerce). Για έναρξη στην εφορία, όρους χρήσης και επιδοτήσεις, δείτε [τι χρειάζεται για να ανοίξετε eshop](/blog/ti-xreiazetai-gia-eshop).',
        ],
      },
    ],
  },
  'seo-audits': {
    title: (c) => `SEO ${c.city}: Υπηρεσίες SEO & Προώθηση Ιστοσελίδων`,
    description: (c) =>
      `Υπηρεσίες SEO ${c.inCity}: τεχνικός έλεγχος, τοπικό SEO και προώθηση ιστοσελίδων για τοπικές επιχειρήσεις, με μηνιαία αναφορά σε κλικ και αιτήματα.`,
    h1: (c) => `SEO ${c.inCity}: υπηρεσίες SEO και προώθηση ιστοσελίδων`,
    h1Accent: () => 'προώθηση ιστοσελίδων',
    lead: (c) =>
      `Οι υπηρεσίες SEO ${c.inCity} ξεκινούν με έλεγχο της ιστοσελίδας σας και των τοπικών ανταγωνιστών και συνεχίζουν με μηνιαία βελτιστοποίηση. Τα μηνιαία πακέτα ξεκινούν από {{ENTRY_SEO}} και η πρόοδος μετριέται σε κλικ και αιτήματα.`,
    includedTitle: (c) => `Υπηρεσίες SEO ${c.inCity}: τι περιλαμβάνουν`,
    pricingTitle: (c) => `Πόσο κοστίζει το SEO ${c.inCity}`,
    pricingQuestion: (c) => `Πόσο κοστίζει το SEO ${c.inCity};`,
    ctaTitle: (c) => `Ξεκινήστε το SEO ${c.inCity} με δωρεάν έλεγχο`,
    topics: (c) => [
      {
        title: `Προώθηση ιστοσελίδων ${c.inCity}`,
        paragraphs: [
          `Η προώθηση ιστοσελίδων ${c.inCity} δουλεύει σε τρία μέτωπα: τεχνική υγεία, σελίδες υπηρεσιών που απαντούν σε αυτό που ψάχνουν οι πελάτες σας με όνομα πόλης, και σύνδεσμοι από σχετικά sites της περιοχής. Το πρώτο βήμα είναι ένα [SEO audit](/services/seo-audits) με λίστα διορθώσεων. Η μηνιαία δουλειά περιγράφεται στις [υπηρεσίες SEO](/seo-services).`,
        ],
      },
      {
        title: `Τοπικό SEO και Google Maps ${c.inCity}`,
        paragraphs: [
          `Αν οι πελάτες σας ψάχνουν «κοντά μου», μεγάλο μέρος των κλικ πηγαίνει στον χάρτη και όχι στα οργανικά αποτελέσματα. Το Google Business Profile, οι κριτικές και η συνέπεια των στοιχείων σας είναι ξεχωριστή δουλειά: δείτε το [τοπικό SEO ${c.inCity}](/services/local-seo/${c.slug}).`,
        ],
      },
    ],
  },
  'local-seo': {
    title: (c) => `Τοπικό SEO ${c.city} | Google Maps & Business Profile`,
    description: (c) =>
      `Τοπικό SEO ${c.inCity}: βελτιστοποίηση Google Business Profile, κριτικές και τοπικές σελίδες, για να σας βρίσκουν πελάτες στον χάρτη της Google.`,
    h1: (c) => `Τοπικό SEO ${c.inCity}`,
    h1Accent: (c) => c.inCity,
    lead: (c) =>
      `Βοηθάμε επιχειρήσεις ${c.inCity}${withHoods(c)} να εμφανίζονται στον χάρτη της Google και στα τοπικά αποτελέσματα, ξεκινώντας από το Google Business Profile. Το τοπικό SEO περιλαμβάνεται στα μηνιαία πακέτα SEO από {{ENTRY_SEO}}.`,
    includedTitle: (c) => `Τοπικό SEO ${c.inCity}: τι περιλαμβάνει`,
    pricingTitle: (c) => `Πόσο κοστίζει το τοπικό SEO ${c.inCity}`,
    pricingQuestion: (c) => `Πόσο κοστίζει το τοπικό SEO ${c.inCity};`,
    ctaTitle: (c) => `Δείτε πού βρίσκεστε στον χάρτη ${c.inCity}`,
    topics: (c) => [
      {
        title: `Google Business Profile για επιχειρήσεις ${c.inCity}`,
        paragraphs: [
          'Σωστή κύρια κατηγορία, υπηρεσίες με τις λέξεις που χρησιμοποιούν οι πελάτες, ωράριο, φωτογραφίες και απαντήσεις σε κριτικές. Αν το προφίλ δεν υπάρχει ακόμα, ο οδηγός [πώς βάζω την επιχείρησή μου στο Google Maps](/blog/epixeirisi-sto-google-maps) δείχνει τα βήματα. Η πλήρης μέθοδος είναι στη σελίδα για το [τοπικό SEO](/services/local-seo).',
        ],
      },
    ],
  },
};
