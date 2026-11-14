import type { SiteLocale } from '@/lib/i18n/locale';

const nextSteps = {
  'search-console-mastery': {
    path: '/resources/search-console-opportunity-finder',
    en: ['Which searches are worth another look?', 'Open the free tool with a Search Console export. See which searches already show your pages and where a better title might earn more clicks.', 'Check my Search Console export'],
    el: ['Ποιες αναζητήσεις αξίζει να εξετάσετε;', 'Ανεβάστε στο δωρεάν εργαλείο το αρχείο που εξαγάγατε από το Search Console. Δείτε πού εμφανίζονται οι σελίδες σας και πού ένας καλύτερος τίτλος ίσως φέρει περισσότερα κλικ.', 'Έλεγχος αρχείου Search Console'],
  },
  'technical-seo-in-house': {
    path: '/tools/free-seo-audit',
    en: ['Could Google be missing one of your pages?', 'Start with a URL you want customers to find. See which technical checks the audit runs and how to follow up on an issue.', 'See how the site audit works'],
    el: ['Μπορεί η Google να βρει τη σελίδα σας;', 'Ξεκινήστε από μια σελίδα στην οποία θέλετε να φτάνουν οι πελάτες σας. Δείτε τι ελέγχει η εφαρμογή και πώς να εξετάσετε ένα πρόβλημα που εντοπίζει.', 'Δείτε πώς γίνεται ο έλεγχος'],
  },
  'ai-llm-visibility': {
    path: '/ai-visibility-check',
    en: ['What does AI say when a buyer asks about you?', 'Try one question a customer might ask. The visibility check shows how to read an AI answer and inspect the sources it cites.', 'Explore the AI visibility check'],
    el: ['Τι απαντά η AI όταν ένας πελάτης ρωτά για εσάς;', 'Διαλέξτε μια ερώτηση που θα έκανε ένας πελάτης σας. Δείτε πώς να εξετάσετε την απάντηση και να βρείτε ποιες ιστοσελίδες αναφέρει ως πηγές.', 'Δείτε τον έλεγχο ορατότητας σε AI'],
  },
  'agency-playbooks': {
    path: '/resources/sample-seo-report',
    en: ['What would you show a client this month?', 'Open a sample monthly SEO report. See how it explains a change in clicks, records what the team did and sets out the next job.', 'Read the sample client report'],
    el: ['Τι θα δείχνατε στον πελάτη σας αυτόν τον μήνα;', 'Ανοίξτε ένα δείγμα μηνιαίας αναφοράς SEO. Δείτε πώς εξηγεί μια μεταβολή στα κλικ, καταγράφει τη δουλειά της ομάδας και προτείνει την επόμενη αλλαγή.', 'Διαβάστε το δείγμα αναφοράς'],
  },
  'local-seo': {
    path: '/tools/google-search-console-analytics',
    en: ['Which searches bring local customers to your site?', 'Look at the phrases people use before they click. Compare the pages for your services and locations to see where someone looking nearby ends up.', 'Explore the Search Console tools'],
    el: ['Με ποιες αναζητήσεις σάς βρίσκουν οι πελάτες της περιοχής;', 'Δείτε τι έγραψαν στη Google όσοι έκαναν κλικ. Συγκρίνετε τις σελίδες των υπηρεσιών και των περιοχών σας για να δείτε πού καταλήγουν οι επισκέπτες.', 'Δείτε τα εργαλεία για το Search Console'],
  },
  'industry-playbooks': {
    path: '/platform/features',
    en: ['Which page helps someone book, buy or enquire?', 'Pick a service or product page. See how AnotherSEOGuru App connects its search terms to a suggested edit you can review.', 'See what the app does with a page'],
    el: ['Ποια σελίδα βοηθά τον επισκέπτη να κλείσει ή να αγοράσει;', 'Επιλέξτε μια σελίδα υπηρεσίας ή προϊόντος. Δείτε πώς το AnotherSEOGuru App χρησιμοποιεί τις αναζητήσεις της για να σας προτείνει μια συγκεκριμένη αλλαγή.', 'Δείτε πώς εξετάζει μια σελίδα η εφαρμογή'],
  },
} as const;

export function articleNextStep(pillar: string | undefined, locale: SiteLocale) {
  if (!pillar || !Object.hasOwn(nextSteps, pillar)) return undefined;
  const step = nextSteps[pillar as keyof typeof nextSteps];
  const [heading, description, label] = step[locale];
  return { heading, description, label, path: step.path };
}
