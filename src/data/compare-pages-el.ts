/**
 * Greek copy for /el/compare. Slugs stay English. Every claim is already on
 * the English page. No prices, no database sizes, no new competitor facts.
 */
export interface ComparePageEl {
  readonly competitorName: string;
  readonly headline: string;
  /** Words at the end of `headline` that the hero italicizes. */
  readonly accentWords: number;
  readonly seoTitle: string;
  readonly summary: string;
  readonly cardText: string;
  readonly whenChooseUs: readonly string[];
  readonly whenChooseThem: readonly string[];
}

export const COMPARE_PAGES_EL: Readonly<Record<string, ComparePageEl>> = {
  ahrefs: {
    competitorName: "Ahrefs",
    headline: "AnotherSEOGuru App έναντι του Ahrefs",
    accentWords: 1,
    seoTitle: "Εναλλακτική του Ahrefs",
    summary:
      "Το Ahrefs είναι σουίτα έρευνας συνδέσμων και λέξεων. Το AnotherSEOGuru App χτίζεται στο Search Console σας και σε ροές με AI, όταν το εμπόδιο είναι να δράσετε στα δεδομένα που έχετε.",
    cardText: "Πού ταιριάζει το καθένα, και πού είμαστε η λάθος απάντηση.",
    whenChooseUs: [
      "Θέλετε ροές αναζήτησης και σελίδας δεμένες στο επιβεβαιωμένο property σας",
      "Χρειάζεστε briefs, ομαδοποίηση και εκτέλεση σε σύντομους κύκλους με βοήθεια AI",
      "Προτιμάτε ένα σύνολο που συνδυάζεται με προαιρετική ολοκληρωμένη υπηρεσία",
    ],
    whenChooseThem: [
      "Η κύρια δουλειά σας είναι το ιστορικό ευρετήριο backlinks και η ευρεία εξόρυξη λέξεων-κλειδιών",
      "Έχετε ήδη ώριμη διαδικασία που μετατρέπει τις εξαγωγές σε δράση",
    ],
  },
  semrush: {
    competitorName: "Semrush",
    headline: "AnotherSEOGuru App έναντι του Semrush",
    accentWords: 1,
    seoTitle: "Εναλλακτική του Semrush",
    summary:
      "Το Semrush είναι ευρεία σουίτα marketing, με διαφημίσεις και περιεχόμενο. Το AnotherSEOGuru App μένει στην οργανική δουλειά: Search Console, τεχνικοί έλεγχοι, κατατάξεις και ορατότητα σε LLM.",
    cardText: "Από πού έρχονται τα δεδομένα και πώς δουλεύετε καθημερινά.",
    whenChooseUs: [
      "Θέλετε πιο ήσυχη οργανική στοίβα, χωρίς να ξαναμάθετε είκοσι καρτέλες",
      "Συνδέετε το Search Console και θέλετε προτάσεις δεμένες με τα δικά σας κλικ και impressions",
      "Τρέχετε agency και θέλετε αφηγήσεις έτοιμες για τον πελάτη πιο γρήγορα",
    ],
    whenChooseThem: [
      "Χρειάζεστε PPC, social και εταιρικές αναφορές σε μία μεγάλη πλατφόρμα",
      "Η ομάδα είναι ήδη πιστοποιημένη και δουλεύει μέσα στις ροές του Semrush",
    ],
  },
  "search-console-alone": {
    competitorName: "Search Console",
    headline: "AnotherSEOGuru App έναντι του Search Console",
    accentWords: 2,
    seoTitle: "Πέρα από το Search Console",
    summary:
      "Το Search Console είναι δωρεάν και απαραίτητο, αλλά σταματά στην παρατήρηση. Η εφαρμογή προσθέτει ομαδοποίηση, βαθμό υγείας, κατατάξεις και playbooks με AI, και η παρατήρηση γίνεται λίστα εργασιών.",
    cardText: "Τι προστίθεται πάνω στο δωρεάν εργαλείο της Google.",
    whenChooseUs: [
      "Κουραστήκατε να ομαδοποιείτε αναζητήσεις σε φύλλα εργασίας",
      "Θέλετε ειδοποιήσεις φθοράς, έλεγχο σελίδων που διεκδικούν τις ίδιες αναζητήσεις και πλαίσιο πειράματος",
      "Χρειάζεστε ένα σημείο όπου η ομάδα εκτελεί τη δουλειά της εβδομάδας",
    ],
    whenChooseThem: [
      "Κάνετε μόνο περιστασιακούς ελέγχους και δεν έχετε προϋπολογισμό για εργαλείο",
      "Έχετε ήδη φτιάξει εσωτερικές εξαγωγές και πίνακες",
    ],
  },
};

export const COMPARE_HUB_EL = {
  title: "Σύγκριση εργαλείων SEO",
  description:
    "Πώς συγκρίνεται το AnotherSEOGuru App με τα Ahrefs, το Semrush και το Search Console μόνο του, και ποιο ταιριάζει στη δουλειά που έχετε μπροστά σας.",
  primaryKeyword: "σύγκριση εργαλείων seo",
  crumb: "Συγκρίσεις",
  pill: "Διαλέξτε με βάση τη δουλειά, όχι τον πίνακα δυνατοτήτων",
  heroTitle: "Ποιο εργαλείο SEO ταιριάζει στη δουλειά σας;",
  heroAccentWords: 4,
  lead: "Κάθε εργαλείο εδώ είναι καλό σε κάτι. Οι σελίδες λένε πού ταιριάζει το καθένα και πού είμαστε η λάθος απάντηση, ώστε να διαλέξετε με βάση τη δουλειά και όχι τον πίνακα δυνατοτήτων.",
  plans: "Δείτε τα πακέτα εφαρμογής",
  platform: "Τι κάνει η πλατφόρμα",
  shortEyebrow: "Η σύντομη απάντηση",
  shortTitle: "Δεδομένα που έχετε ή δεδομένα που ψάχνετε;",
  shortBody:
    "Το AnotherSEOGuru χτίζεται γύρω από ένα επιβεβαιωμένο property του Google Search Console: διαβάζει τα πραγματικά κλικ, τα impressions και τις θέσεις και τα κάνει δουλειά. Τα Ahrefs και Semrush είναι ευρύτερες σουίτες έρευνας, με πολύ μεγαλύτερα ευρετήρια backlinks και λέξεων-κλειδιών. Αν το εμπόδιο είναι να βρείτε δεδομένα, αγοράστε ένα ευρετήριο. Αν το εμπόδιο είναι να αποφασίσετε τι θα κάνετε με τα δεδομένα που ήδη έχετε, αυτό φτιάξαμε.",
  schemaName: "Σύγκριση του AnotherSEOGuru με άλλα εργαλεία SEO",
  schemaDescription:
    "Συγκρίσεις του AnotherSEOGuru με τα Ahrefs, το Semrush και το Search Console μόνο του.",
  fitsUs: "Πότε ταιριάζει το AnotherSEOGuru",
  fitsThem: (name: string) => `Πότε μπορεί να ταιριάζει το ${name}`,
  all: "Όλες οι συγκρίσεις",
  features: "Δείτε τις δυνατότητες",
  agency: "Μιλήστε με την ομάδα",
} as const;
