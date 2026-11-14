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
  readonly sections?: ReadonlyArray<{ readonly heading: string; readonly body?: string; readonly bullets?: readonly string[] }>;
  readonly faq?: ReadonlyArray<{ readonly q: string; readonly a: string }>;
}

export const COMPARE_PAGES_EL: Readonly<Record<string, ComparePageEl>> = {
  ahrefs: {
    competitorName: "Ahrefs",
    headline: "AnotherSEOGuru App ή Ahrefs;",
    accentWords: 1,
    seoTitle: "Εναλλακτική του Ahrefs",
    summary:
      "Με το Ahrefs μπορείτε να ερευνήσετε λέξεις-κλειδιά και backlinks σε πολλούς ιστοτόπους. Το AnotherSEOGuru App ξεκινά από το δικό σας Search Console για να βρείτε ποιες σελίδες αξίζει να βελτιώσετε και να οργανώσετε τις αλλαγές.",
    cardText: "Έρευνα ανταγωνιστών ή βελτιώσεις στις δικές σας σελίδες;",
    whenChooseUs: [
      "Θέλετε να δείτε με ποιες αναζητήσεις φτάνουν οι επισκέπτες σε κάθε σελίδα",
      "Οι συντάκτες σας χρειάζονται θεματικές ομάδες λέξεων-κλειδιών και οδηγίες για κάθε κείμενο",
      "Θέλετε να μπορείτε να αναθέσετε τις αλλαγές σε ομάδα SEO",
    ],
    whenChooseThem: [
      "Εξετάζετε συστηματικά backlinks και ιστορικά στοιχεία λέξεων-κλειδιών για ανταγωνιστικούς ιστοτόπους",
      "Η ομάδα σας οργανώνει ήδη την έρευνά της με αρχεία εξαγωγής",
    ],
  },
  semrush: {
    competitorName: "Semrush",
    headline: "AnotherSEOGuru App ή Semrush;",
    accentWords: 1,
    seoTitle: "Εναλλακτική του Semrush",
    summary:
      "Το Semrush καλύπτει τόσο τις πληρωμένες καμπάνιες όσο και την οργανική αναζήτηση. Το AnotherSEOGuru App ταιριάζει σε ομάδα που θέλει να εντοπίζει πτώσεις στα οργανικά κλικ και να εξηγεί στον πελάτη τι άλλαξε.",
    cardText: "Τι χρειάζεστε για οργανική αναζήτηση και τι για πληρωμένες καμπάνιες;",
    whenChooseUs: [
      "Η ομάδα σας ασχολείται κυρίως με την οργανική αναζήτηση",
      "Θέλετε προτάσεις που βασίζονται στα κλικ και στις εμφανίσεις του δικού σας ιστοτόπου",
      "Κάθε μήνα εξηγείτε στον πελάτη πώς απέδωσαν οι σελίδες του στη Google",
    ],
    whenChooseThem: [
      "Διαχειρίζεστε διαφημίσεις αναζήτησης, κοινωνικά δίκτυα και αναφορές στην ίδια πλατφόρμα",
      "Η ομάδα σας γνωρίζει ήδη το Semrush και το χρησιμοποιεί καθημερινά",
    ],
  },
  "search-console-alone": {
    competitorName: "Search Console",
    headline: "AnotherSEOGuru App ή Search Console;",
    accentWords: 2,
    seoTitle: "Πέρα από το Search Console",
    summary:
      "Το δωρεάν Search Console σάς δείχνει πώς τα πηγαίνει ο ιστότοπός σας στη Google. Συνδέστε το στο AnotherSEOGuru App αν θέλετε να ομαδοποιείτε αναζητήσεις, να εντοπίζετε σελίδες που χάνουν κλικ και να αναθέτετε τις αλλαγές στην ομάδα σας.",
    cardText: "Πότε αρκούν τα στοιχεία της Google και πότε χρειάζεστε και οργάνωση εργασιών;",
    whenChooseUs: [
      "Κάθε εβδομάδα ομαδοποιείτε τις αναζητήσεις με το χέρι",
      "Θέλετε να εντοπίζετε σελίδες που χάνουν κλικ ή ανταγωνίζονται μεταξύ τους για τις ίδιες αναζητήσεις",
      "Περισσότερα από ένα άτομα πρέπει να γνωρίζουν ποιες εργασίες SEO εκκρεμούν",
    ],
    whenChooseThem: [
      "Ελέγχετε περιστασιακά μια σελίδα ή μια φράση αναζήτησης και θέλετε ένα δωρεάν εργαλείο",
      "Η ομάδα σας έχει ήδη δικούς της πίνακες αναφορών και οργάνωσης εργασιών",
    ],
  },
  agencyanalytics: {
    competitorName: "AgencyAnalytics",
    headline: "AnotherSEOGuru App ή AgencyAnalytics;",
    accentWords: 1,
    seoTitle: "Εναλλακτική του AgencyAnalytics",
    summary:
      "Το AgencyAnalytics συγκεντρώνει πολλά κανάλια marketing στην ίδια αναφορά. Αν προσφέρετε SEO, το AnotherSEOGuru App συνδυάζει τα στοιχεία του Search Console με τις εργασίες που ολοκληρώσατε, σε αναφορά με το δικό σας λογότυπο.",
    cardText: "Μηνιαίες αναφορές για πελάτες που σας αναθέτουν το SEO τους.",
    whenChooseUs: [
      "Οι αναφορές σας αφορούν κυρίως την οργανική αναζήτηση και θέλετε να βγαίνουν από το Search Console χωρίς connectors",
      "Θέλετε αναφορά και δουλειά στο ίδιο σημείο: ευκαιρίες με εκτίμηση κλικ, εργασίες και μηνιαία αναφορά",
      "Θέλετε αναφορές που δεν χρεώνουν μονάδες, ώστε ένας νέος πελάτης να μην ανεβάζει το κόστος",
    ],
    whenChooseThem: [
      "Κάνετε αναφορές για πολλά κανάλια διαφήμισης, social και κλήσεων για κάθε πελάτη",
      "Η ομάδα σας τρέχει ήδη όλη τη διαδικασία αναφορών εκεί και δουλεύει",
    ],
    sections: [
      { heading: "Δοκιμάστε την αναφορά με έναν πελάτη", body: "Συνδέστε το Search Console με πρόσβαση μόνο για ανάγνωση, προσθέστε το λογότυπό σας και ετοιμάστε την αναφορά του προηγούμενου μήνα. Συγκρίνετέ τη με αυτή που στείλατε ήδη. Οι αναφορές με τη δική σας εταιρική ταυτότητα περιλαμβάνονται στο πακέτο Agency." },
    ],
    faq: [
      { q: "Μπορώ να δω δείγμα πριν συνδέσω πελάτη;", a: "Ναι. Το δείγμα της εφαρμογής ανοίγει χωρίς εγγραφή και περιέχει αναφορά με ενδεικτικά στοιχεία." },
    ],
  },
  whatagraph: {
    competitorName: "Whatagraph",
    headline: "AnotherSEOGuru App ή Whatagraph;",
    accentWords: 1,
    seoTitle: "Εναλλακτική του Whatagraph",
    summary:
      "Το Whatagraph συνδυάζει δεδομένα από πολλές πηγές marketing. Με το AnotherSEOGuru App μπορείτε να δείξετε στον πελάτη ποια σελίδα του προτείνετε να βελτιώσετε και σε ποια στοιχεία του Search Console στηρίζεστε.",
    cardText: "Από τα στοιχεία αναζήτησης στην πρόταση για τον επόμενο μήνα.",
    whenChooseUs: [
      "Οι πελάτες σας πληρώνουν για SEO και θέλουν αναφορά που εξηγεί τα οργανικά αποτελέσματα",
      "Θέλετε η αναφορά να συνοδεύεται από πλάνο: ευκαιρίες, εκτιμήσεις κλικ και επόμενα βήματα",
      "Θέλετε εργαλεία SEO (θέσεις, έλεγχοι, ορατότητα σε AI) στο ίδιο σημείο με τις αναφορές",
    ],
    whenChooseThem: [
      "Χρειάζεστε να συνδυάζετε πολλές πηγές διαφήμισης, social και analytics",
      "Τις αναφορές τις φτιάχνει ομάδα marketing με προσαρμοσμένα dashboards για πολλά κανάλια",
    ],
    sections: [
      { heading: "Τι θα δει ο πελάτης στην αναφορά SEO", body: "Επιλέξτε μια σελίδα που έχει πολλές εμφανίσεις και λίγα κλικ. Μπορείτε να εξηγήσετε τι προτείνετε να αλλάξει και να παρακολουθήσετε τα κλικ της μετά τη δημοσίευση. Η αναφορά αποστέλλεται με email ή κατεβαίνει σε PDF." },
    ],
    faq: [
      { q: "Μπορώ να συμπεριλάβω στοιχεία Google Analytics;", a: "Ναι. Η αναφορά μπορεί να περιλαμβάνει τις επισκέψεις από το Google Analytics μαζί με τα στοιχεία του Search Console." },
    ],
  },
  dashthis: {
    competitorName: "DashThis",
    headline: "AnotherSEOGuru App ή DashThis;",
    accentWords: 1,
    seoTitle: "Εναλλακτική του DashThis",
    summary:
      "Με το DashThis ο πελάτης παρακολουθεί πολλά κανάλια marketing σε έναν πίνακα. Με το AnotherSEOGuru App λαμβάνει μηνιαία αναφορά για την οργανική αναζήτηση, μαζί με τη δική σας σύνοψη και τις εργασίες που ολοκληρώσατε.",
    cardText: "Ζωντανός πίνακας πολλών καναλιών ή μηνιαία αναφορά για το SEO;",
    whenChooseUs: [
      "Θέλετε αναφορά SEO με γραπτή σύνοψη, αιτίες και επόμενα βήματα",
      "Θέλετε να διαχειρίζεστε τη δουλειά SEO στο ίδιο σημείο με τις αναφορές",
      "Διαχειρίζεστε πολλές ιδιότητες Search Console και αλλάζετε πελάτη όλη μέρα",
    ],
    whenChooseThem: [
      "Θέλετε ένα απλό dashboard πολλών καναλιών για κάθε πελάτη",
      "Οι πελάτες σας προτιμούν ζωντανό σύνδεσμο dashboard από μηνιαία γραπτή αναφορά",
    ],
    sections: [
      { heading: "Τι περιλαμβάνει η μηνιαία αναφορά", body: "Ο πελάτης βλέπει τα κλικ των τελευταίων 13 μηνών και τις σελίδες που κέρδισαν ή έχασαν επισκέψεις. Μπορείτε να προσθέσετε τη δική σας εξήγηση, τις εργασίες που τελείωσαν και τις προτεραιότητες του επόμενου μήνα." },
    ],
    faq: [
      { q: "Πώς λαμβάνει την αναφορά ο πελάτης;", a: "Μπορείτε να κατεβάσετε την αναφορά σε PDF ή να προγραμματίσετε την αποστολή της με email." },
    ],
  },
};

export const COMPARE_HUB_EL = {
  title: "Σύγκριση εργαλείων SEO",
  description:
    "Πώς συγκρίνεται το AnotherSEOGuru App με τα Ahrefs, το Semrush και το Search Console μόνο του, και ποιο ταιριάζει στη δουλειά που έχετε μπροστά σας.",
  primaryKeyword: "σύγκριση εργαλείων seo",
  crumb: "Συγκρίσεις",
  pill: "Πακέτα και τιμές",
  heroTitle: "Ποιο εργαλείο SEO ταιριάζει στη δουλειά σας;",
  heroAccentWords: 4,
  lead: "Θέλετε να ερευνήσετε τους ανταγωνιστές σας, να βελτιώσετε τις σελίδες σας ή να ετοιμάσετε αναφορές για πελάτες; Δείτε σε ποιες από αυτές τις δουλειές σάς εξυπηρετεί κάθε εργαλείο.",
  plans: "Δείτε τα πακέτα εφαρμογής",
  platform: "Τι κάνει η πλατφόρμα",
  shortEyebrow: "Η σύντομη απάντηση",
  shortTitle: "Τι θέλετε να μάθετε;",
  shortBody:
    "Το AnotherSEOGuru App σάς βοηθά να επιλέξετε την επόμενη αλλαγή στον ιστότοπό σας με βάση τα κλικ και τις εμφανίσεις του. Με το Ahrefs και το Semrush μπορείτε επίσης να ερευνήσετε ανταγωνιστικούς ιστοτόπους. Για αναφορές πελατών, δείτε αν σας αρκεί μια αναφορά SEO ή αν χρειάζεστε και στοιχεία από διαφημίσεις και κοινωνικά δίκτυα.",
  schemaName: "Σύγκριση του AnotherSEOGuru με άλλα εργαλεία SEO",
  schemaDescription:
    "Συγκρίσεις του AnotherSEOGuru με τα Ahrefs, το Semrush και το Search Console μόνο του.",
  fitsUs: "Πότε ταιριάζει το AnotherSEOGuru",
  fitsThem: (name: string) => `Πότε μπορεί να ταιριάζει το ${name}`,
  all: "Όλες οι συγκρίσεις",
  features: "Δείτε τις δυνατότητες",
  agency: "Μιλήστε με την ομάδα",
} as const;
