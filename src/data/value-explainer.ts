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
    titleEn: 'We find',
    titleEl: 'Βρίσκουμε',
    bodyEn:
      'We read your Search Console (read only), check your pages and compare you with competitors using Ahrefs data. We also ask ChatGPT, Gemini and Perplexity whether they recommend you.',
    bodyEl:
      'Διαβάζουμε το Search Console σας (μόνο ανάγνωση), ελέγχουμε τις σελίδες σας και σας συγκρίνουμε με τους ανταγωνιστές με δεδομένα Ahrefs. Ρωτάμε επίσης το ChatGPT, το Gemini και το Perplexity αν σας προτείνουν.',
  },
  {
    n: '02',
    titleEn: 'You fix',
    titleEl: 'Διορθώνετε',
    bodyEn:
      'Every week you get a short, ordered list of fixes with the text ready: title, description, FAQ, schema. On WordPress you apply them in one click.',
    bodyEl:
      'Κάθε εβδομάδα παίρνετε λίγες διορθώσεις με σειρά και έτοιμο κείμενο: τίτλο, περιγραφή, FAQ, schema. Στο WordPress τις εφαρμόζετε με ένα κλικ.',
  },
  {
    n: '03',
    titleEn: 'We measure',
    titleEl: 'Μετράμε',
    bodyEn:
      '28 days before and after every fix, with clicks from Google and mentions in AI answers. You see it in the app and in the Monday email.',
    bodyEl:
      '28 ημέρες πριν και μετά από κάθε διόρθωση, με κλικ από το Google και αναφορές στις απαντήσεις AI. Το βλέπετε στην εφαρμογή και στο email της Δευτέρας.',
  },
];

export const VALUE_HONESTY = {
  en: "We don't promise rankings. We show what changed, with your own numbers from Google. A before and after comparison doesn't prove the change caused it.",
  el: 'Δεν υποσχόμαστε κατάταξη. Δείχνουμε τι άλλαξε, με τα δικά σας νούμερα από το Google. Η σύγκριση πριν και μετά δεν αποδεικνύει ότι η αλλαγή το προκάλεσε.',
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
    seoEn: 'Show up high on Google and get the click',
    seoEl: 'Να βγαίνετε ψηλά στο Google και να σας πατάνε',
    aiEn: 'Get recommended by the AI, with a link to you',
    aiEl: 'Να σας προτείνει το AI, με link προς εσάς',
  },
  {
    labelEn: 'What we fix',
    labelEl: 'Τι διορθώνουμε',
    seoEn: 'Titles, content, speed, internal links',
    seoEl: 'Τίτλους, περιεχόμενο, ταχύτητα, εσωτερικά links',
    aiEn: 'Clear answers, FAQ, schema, mentions of your brand',
    aiEl: 'Καθαρές απαντήσεις, FAQ, schema, αναφορές της επωνυμίας σας',
  },
  {
    labelEn: 'How we measure',
    labelEl: 'Πώς μετράμε',
    seoEn: 'Clicks and position in your Search Console',
    seoEl: 'Κλικ και θέση στο Search Console σας',
    aiEn: 'How many tracked questions mention you, citations, AI visits in GA4',
    aiEl: 'Σε πόσες ερωτήσεις σας αναφέρει, παραπομπές, επισκέψεις από AI στο GA4',
  },
];

/** What each plan gets you, as an outcome, not a tool list. Keyed by the plan id in src/data/app-plans. */
export const PLAN_OUTCOMES: Readonly<Record<string, { readonly en: string; readonly el: string }>> = {
  free: { en: 'See your top 5 fixes every week and what each one brought.', el: 'Δείτε τις 5 πρώτες διορθώσεις κάθε εβδομάδα και τι έφερε η καθεμία.' },
  starter: { en: 'Every fix every week, not just the top 5, measured before and after.', el: 'Όλες οι διορθώσεις κάθε εβδομάδα, όχι μόνο οι 5 πρώτες, μετρημένες πριν και μετά.' },
  pro: { en: 'Find out whether ChatGPT recommends you, and what is missing.', el: 'Μάθετε αν σας προτείνει το ChatGPT και τι λείπει.' },
  agency: { en: 'Branded reports that prove the result for up to 30 client sites.', el: 'Αναφορές με το δικό σας σήμα που δείχνουν το αποτέλεσμα για έως 30 ιστοσελίδες πελατών.' },
};
