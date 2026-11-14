/**
 * How AnotherSEOGuru App brings visits from Google and AI answers, in the same three steps and
 * words as the web app, iPhone, Android, the browser extension and the WordPress plugin
 * (gsc-gemini-boost src/features/overview/value.ts). Used by the homepage, the how-it-works
 * pages and pricing, so the promise reads the same everywhere.
 */

export interface ValueStep {
  readonly n: string;
  readonly titleEn: string;
  readonly titleEl: string;
  readonly bodyEn: string;
  readonly bodyEl: string;
}

export const HOW_STEPS: readonly ValueStep[] = [
  {
    n: '01',
    titleEn: 'Connect your site',
    titleEl: 'Συνδέστε την ιστοσελίδα σας',
    bodyEn:
      'Choose a site in Google Search Console and give the app read-only access. It uses your pages and search queries to find places where a change could bring more clicks.',
    bodyEl:
      'Επιλέξτε την ιστοσελίδα σας στο Google Search Console και δώστε πρόσβαση μόνο για ανάγνωση. Η εφαρμογή εξετάζει τις σελίδες σας και τις αναζητήσεις στις οποίες εμφανίζονται για να βρει πού υπάρχει περιθώριο για περισσότερα κλικ.',
  },
  {
    n: '02',
    titleEn: 'Choose a change to make',
    titleEl: 'Επιλέξτε τι θα αλλάξετε',
    bodyEn:
      'Pick a suggestion from your weekly list. Review the draft title, description or page edit. If you use the WordPress plugin, you can approve changes in the editor.',
    bodyEl:
      'Διαλέξτε μια πρόταση από την εβδομαδιαία λίστα και διαβάστε τον νέο τίτλο, την περιγραφή ή τη διόρθωση που προτείνεται. Με το πρόσθετο για WordPress μπορείτε να εγκρίνετε τις αλλαγές μέσα από τον επεξεργαστή.',
  },
  {
    n: '03',
    titleEn: 'Follow the page after publication',
    titleEl: 'Δείτε τι έγινε μετά τη δημοσίευση',
    bodyEn:
      'Mark the date you published. Once 28 days have passed, compare search clicks with the previous 28 days. Your chart keeps the date of the edit beside the numbers.',
    bodyEl:
      'Σημειώστε πότε δημοσιεύσατε την αλλαγή. Μόλις περάσουν 28 ημέρες, συγκρίνετε τα κλικ από τη Google με τις προηγούμενες 28. Η ημερομηνία της αλλαγής φαίνεται πάνω στο γράφημα.',
  },
];

export const VALUE_HONESTY = {
  en: "The figures come from Google Search Console. The comparison shows how clicks changed over the period. Seasonality and other changes to a site can also affect the result.",
  el: 'Τα στοιχεία προέρχονται από το Google Search Console και δείχνουν πώς άλλαξαν τα κλικ μέσα στην περίοδο σύγκρισης. Η εποχικότητα και άλλες αλλαγές στην ιστοσελίδα μπορούν επίσης να επηρεάσουν το αποτέλεσμα.',
} as const;

/** SEO next to AEO / GEO in plain words: what we want, what we do, how we measure. */
export interface SearchKindRow {
  readonly labelEn: string;
  readonly labelEl: string;
  readonly seoEn: string;
  readonly seoEl: string;
  readonly aiEn: string;
  readonly aiEl: string;
}

export const SEO_VS_AI: readonly SearchKindRow[] = [
  {
    labelEn: 'The goal',
    labelEl: 'Ο στόχος',
    seoEn: 'Help people find your pages in Google search results',
    seoEl: 'Να βρίσκουν οι πελάτες τις σελίδες σας στα αποτελέσματα της Google',
    aiEn: 'Earn a mention and a link in relevant AI answers',
    aiEl: 'Να αναφέρεται η επιχείρησή σας σε σχετικές απαντήσεις AI με σύνδεσμο προς την ιστοσελίδα σας',
  },
  {
    labelEn: 'What we fix',
    labelEl: 'Τι διορθώνουμε',
    seoEn: 'Titles, content, speed, internal links',
    seoEl: 'Τίτλους, περιεχόμενο, ταχύτητα, εσωτερικά links',
    aiEn: 'Clear answers, FAQ, schema, mentions of your brand',
    aiEl: 'Σαφείς απαντήσεις, FAQ, schema, αναφορές της επωνυμίας σας',
  },
  {
    labelEn: 'How we measure',
    labelEl: 'Πώς μετράμε',
    seoEn: 'Clicks and position in your Search Console',
    seoEl: 'Κλικ και θέση στο Search Console σας',
    aiEn: 'How many tracked questions mention you, citations, AI visits in GA4',
    aiEl: 'Σε ποιες απαντήσεις αναφέρεστε, ποιοι σύνδεσμοι εμφανίζονται και πόσες επισκέψεις από AI καταγράφει το GA4',
  },
];

/** What each plan gets you, as an outcome, not a tool list. Keyed by the plan id in src/data/app-plans. */
export const PLAN_OUTCOMES: Readonly<Record<string, { readonly en: string; readonly el: string }>> = {
  free: { en: 'Review your five highest-priority suggestions each week.', el: 'Δείτε κάθε εβδομάδα τις πέντε προτάσεις με τη μεγαλύτερη προτεραιότητα.' },
  starter: { en: 'Work through the full weekly list and check how clicks change after each edit.', el: 'Δείτε όλη την εβδομαδιαία λίστα και παρακολουθήστε πώς αλλάζουν τα κλικ μετά από κάθε διόρθωση.' },
  pro: { en: 'Compare how AI assistants describe your business and which competitors they mention.', el: 'Δείτε πώς παρουσιάζουν την επιχείρησή σας οι βοηθοί AI και ποιους ανταγωνιστές αναφέρουν.' },
  agency: { en: 'Show each client what you worked on and how their search traffic changed.', el: 'Δείξτε σε κάθε πελάτη τι δουλειά κάνατε και πώς εξελίχθηκαν οι επισκέψεις του από τη Google.' },
};
