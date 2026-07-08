/**
 * Greek translations for service slugs (programmatic SEO).
 */
export const serviceNamesEl: Record<
  string,
  {
    name: string;
    shortName: string;
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
    titleKeyword: 'AI Visibility (GEO/AEO)',
    name: 'Ορατότητα σε AI (GEO/AEO)',
    shortName: 'AI SEO',
    description:
      'Schema, οντότητες και δομημένο περιεχόμενο για ChatGPT, Perplexity, Gemini και την παραδοσιακή αναζήτηση.',
    features: [
      'Υλοποίηση schema',
      'Βελτιστοποίηση οντοτήτων',
      'Δόμηση γράφου γνώσης',
      'Δομημένο περιεχόμενο',
      'Αρχιτεκτονική φιλική σε AI',
      'Βελτιστοποίηση αναφορών (citations)',
    ],
  },
  'logo-design': {
    titleKeyword: 'Σχεδιασμός Λογοτύπου',
    name: 'Σχεδιασμός Λογοτύπου',
    shortName: 'Εταιρική ταυτότητα',
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
    titleKeyword: 'SEO',
    name: 'Τοπικό SEO & Google Business',
    shortName: 'Τοπικό SEO',
    description:
      'Βελτιστοποίηση Google Business Profile, τοπικές καταχωρήσεις και στρατηγική για τοπικές αναζητήσεις.',
    features: [
      'Βελτιστοποίηση Google Business Profile',
      'Τοπικές καταχωρήσεις',
      'Στρατηγική κριτικών',
      'Τοπικές λέξεις-κλειδιά',
      'Κατάταξη στον χάρτη της Google',
      'Στόχευση ανά περιοχή',
    ],
  },
  'link-building': {
    titleKeyword: 'Link Building',
    name: 'Δημιουργία Backlinks',
    shortName: 'Backlinks',
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
    titleKeyword: 'SEO Audit',
    name: 'Τεχνικός Έλεγχος SEO',
    shortName: 'SEO Audit',
    description:
      'Πλήρης τεχνικός έλεγχος: δυνατότητα ανίχνευσης, ευρετηρίαση, Core Web Vitals και ανάλυση ανταγωνισμού.',
    features: [
      'Τεχνικός έλεγχος',
      'Core Web Vitals',
      'Διαχείριση crawl budget',
      'Έλεγχος εσωτερικών συνδέσμων',
      'Ανάλυση κενών έναντι ανταγωνισμού',
      'Ανάκαμψη από ποινές Google',
    ],
  },
  'eshop-woocommerce': {
    titleKeyword: 'Κατασκευή E-shop',
    name: 'Κατασκευή E-shop WooCommerce',
    shortName: 'Κατασκευή E-shop',
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
