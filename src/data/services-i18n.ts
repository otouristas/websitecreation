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
  }
> = {
  'website-creation': {
    titleKeyword: 'Κατασκευή Ιστοσελίδων',
    name: 'Κατασκευή Ιστοσελίδων',
    shortName: 'Ιστοσελίδες',
    nameAccusative: 'κατασκευή ιστοσελίδων',
    description:
      'Γρήγορες, όμορφες ιστοσελίδες με SEO από την πρώτη μέρα. Σχεδιασμός, ανάπτυξη και βελτιστοποίηση για μετατροπές.',
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
    titleKeyword: 'SEO Web Design',
    name: 'Σχεδιασμός με SEO',
    shortName: 'SEO Design',
    nameAccusative: 'σχεδιασμό με SEO',
    description:
      'Σχεδιασμός με τεχνικό SEO, schema, εσωτερικούς συνδέσμους και αρχιτεκτονική που κατατάσσεται ψηλά.',
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
    titleKeyword: 'AI SEO Agency / GEO / AEO',
    name: 'AI SEO Agency (GEO / AEO)',
    shortName: 'AI SEO',
    nameAccusative: 'AI SEO (GEO / AEO)',
    description:
      'Υπηρεσίες AI SEO agency για Generative Engine Optimization (GEO) και Answer Engine Optimization (AEO). Εμφανιστείτε σε ChatGPT, Perplexity και Google AI Overviews, όχι μόνο στα κλασικά αποτελέσματα.',
    features: [
      'GEO / generative engine optimization',
      'AEO για AI Overviews & chat απαντήσεις',
      'Schema + καθαρισμός οντοτήτων',
      'Citation-ready σελίδες υπηρεσιών',
      'Παρακολούθηση AI mentions',
      'Playbooks για τουρισμό & τοπικά brands',
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
    titleKeyword: 'Δημιουργία Περιεχομένου',
    name: 'Δημιουργία Περιεχομένου',
    shortName: 'Περιεχόμενο',
    nameAccusative: 'δημιουργία περιεχομένου',
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
    name: 'Δημιουργία Backlinks',
    shortName: 'Backlinks',
    nameAccusative: 'δημιουργία backlinks',
    description: 'Ποιοτικά backlinks, digital PR και τοποθετήσεις σε σχετικές ιστοσελίδες για αύξηση της αυθεντίας του domain σας.',
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
    titleKeyword: 'Υπηρεσίες SEO',
    name: 'Υπηρεσίες SEO & Τεχνικός Έλεγχος',
    shortName: 'Υπηρεσίες SEO',
    nameAccusative: 'υπηρεσίες SEO & τεχνικό έλεγχο',
    description:
      'Υπηρεσίες SEO για ιστοσελίδες στην Ελλάδα: τεχνικός έλεγχος, on-page, λέξεις-κλειδιά, τοπικό SEO και μηνιαία προώθηση. Διαφανή πακέτα από €400/μήνα.',
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
    titleKeyword: 'Κατασκευή E-shop',
    name: 'Κατασκευή E-shop WooCommerce',
    shortName: 'Κατασκευή E-shop',
    nameAccusative: 'κατασκευή e-shop WooCommerce',
    description:
      'Υψηλής μετατροπής, πλήρως προσαρμοσμένα ηλεκτρονικά καταστήματα (e-shops) WooCommerce με ενσωματωμένες πληρωμές, μεταφορικά και SEO.',
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
    titleKeyword: 'SEO για E-shop',
    name: 'SEO για E-shop',
    shortName: 'E-shop SEO',
    nameAccusative: 'SEO ηλεκτρονικού καταστήματος',
    description:
      'Εξειδικευμένες υπηρεσίες SEO για ηλεκτρονικά καταστήματα. Αυξήστε την οργανική εμφάνιση κατηγοριών και προϊόντων για περισσότερες πωλήσεις.',
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

export function getServiceEl(slug: string) {
  return serviceNamesEl[slug];
}
