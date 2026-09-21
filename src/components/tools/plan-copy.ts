import type { Pillar } from '@/lib/audit/types';
import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Every string the live audit and the estimator render, in both languages.
 *
 * Copy lives here rather than inline so the two components stay readable and
 * so a Greek reviewer can read the whole surface in one file instead of
 * hunting through JSX. The audit's check labels and fixes are NOT here - those
 * ship from the API with the result, because the check that produced them is
 * the thing that knows what it measured.
 */

export const PILLAR_LABELS: Record<Pillar, { en: string; el: string }> = {
  technical: { en: 'Technical', el: 'Τεχνικά' },
  content: { en: 'Content', el: 'Περιεχόμενο' },
  performance: { en: 'Speed', el: 'Ταχύτητα' },
  ai: { en: 'AI visibility', el: 'Ορατότητα σε AI' },
};

export const STEP_LABELS: Record<string, { en: string; el: string }> = {
  resolve: { en: 'Resolving the domain', el: 'Εύρεση domain' },
  homepage: { en: 'Fetching the homepage', el: 'Λήψη αρχικής σελίδας' },
  parse: { en: 'Reading the markup', el: 'Ανάγνωση markup' },
  robots: { en: 'Reading robots.txt', el: 'Ανάγνωση robots.txt' },
  sitemap: { en: 'Counting the sitemap', el: 'Καταμέτρηση sitemap' },
  ai: { en: 'Checking AI crawler access', el: 'Έλεγχος πρόσβασης AI crawlers' },
  notfound: { en: 'Testing a missing URL', el: 'Δοκιμή ανύπαρκτης διεύθυνσης' },
  score: { en: 'Scoring', el: 'Βαθμολόγηση' },
};

export const AUDIT_COPY = {
  en: {
    eyebrow: 'Live site test',
    title: 'Measure the site, then price the fix',
    intro:
      'Type a domain. We fetch it now, on this request, and report what we actually measured: server timing, markup, structured data, and which AI crawlers your robots.txt lets in.',
    placeholder: 'your-website.gr',
    run: 'Run the test',
    rerun: 'Test another site',
    running: 'Testing',
    hint: 'Free · no signup · nothing stored',
    score: 'Overall',
    grade: 'Grade',
    measured: 'What we measured',
    priorities: 'Fix these first',
    aiAccess: 'AI crawler access',
    aiAllowed: 'allowed',
    aiBlocked: 'blocked',
    searchAccess: 'Search crawler access',
    allPass: 'Every check passed. The next gains are in content depth and off-site authority.',
    elapsed: (ms: number) => `measured in ${(ms / 1000).toFixed(1)}s`,
    toEstimate: 'Price the fix',
    disclaimer:
      'Measured on the homepage only, from our server, once. Field data from real visitors will differ.',
    metrics: {
      ttfbMs: 'Time to first byte',
      downloadMs: 'HTML download',
      htmlBytes: 'HTML size',
      compression: 'Compression',
      redirectHops: 'Redirects',
      wordCount: 'Words in the HTML',
      imageCount: 'Images',
      altCoverage: 'Images with alt',
      renderBlockingScripts: 'Render-blocking scripts',
      externalScripts: 'External scripts',
      thirdPartyHosts: 'Third-party hosts',
      internalLinks: 'Internal links',
      sitemapUrls: 'Sitemap URLs',
      jsonLdTypes: 'Structured data',
      hreflangCount: 'hreflang alternates',
      notFoundStatus: 'Missing URL returns',
      server: 'Server',
      llmsTxt: 'llms.txt',
    },
    errors: {
      invalid_url: 'That does not look like a website address.',
      blocked_host: 'We can only test public websites.',
      dns: 'We could not find that domain.',
      timeout: 'The site took too long to answer.',
      unreachable: 'The site did not answer.',
      not_html: 'That address does not return a web page.',
      too_many_redirects: 'The site redirects too many times.',
      rate_limited: 'Too many tests from this connection. Try again in a minute.',
      generic: 'Something went wrong. Try again, or send us the address.',
    },
  },
  el: {
    eyebrow: 'Ζωντανός έλεγχος',
    title: 'Μετρήστε το site, μετά κοστολογήστε τη διόρθωση',
    intro:
      'Γράψτε ένα domain. Το κατεβάζουμε τώρα, σε αυτό το αίτημα, και αναφέρουμε ό,τι πραγματικά μετρήσαμε: χρόνους διακομιστή, markup, δομημένα δεδομένα και ποια AI crawlers επιτρέπει το robots.txt σας.',
    placeholder: 'to-site-sas.gr',
    run: 'Ξεκινήστε τον έλεγχο',
    rerun: 'Έλεγχος άλλου site',
    running: 'Έλεγχος',
    hint: 'Δωρεάν · χωρίς εγγραφή · δεν αποθηκεύεται τίποτα',
    score: 'Συνολικά',
    grade: 'Βαθμός',
    measured: 'Τι μετρήσαμε',
    priorities: 'Διορθώστε πρώτα αυτά',
    aiAccess: 'Πρόσβαση AI crawlers',
    aiAllowed: 'επιτρέπεται',
    aiBlocked: 'μπλοκαρισμένο',
    searchAccess: 'Πρόσβαση crawlers αναζήτησης',
    allPass: 'Κάθε έλεγχος πέρασε. Τα επόμενα κέρδη είναι στο βάθος περιεχομένου και στο authority.',
    elapsed: (ms: number) => `μετρήθηκε σε ${(ms / 1000).toFixed(1)}δλ`,
    toEstimate: 'Κοστολογήστε τη διόρθωση',
    disclaimer:
      'Μετρήθηκε μόνο η αρχική, από τον διακομιστή μας, μία φορά. Τα δεδομένα πεδίου από πραγματικούς επισκέπτες θα διαφέρουν.',
    metrics: {
      ttfbMs: 'Χρόνος πρώτου byte',
      downloadMs: 'Λήψη HTML',
      htmlBytes: 'Μέγεθος HTML',
      compression: 'Συμπίεση',
      redirectHops: 'Ανακατευθύνσεις',
      wordCount: 'Λέξεις στο HTML',
      imageCount: 'Εικόνες',
      altCoverage: 'Εικόνες με alt',
      renderBlockingScripts: 'Scripts που μπλοκάρουν',
      externalScripts: 'Εξωτερικά scripts',
      thirdPartyHosts: 'Hosts τρίτων',
      internalLinks: 'Εσωτερικοί σύνδεσμοι',
      sitemapUrls: 'Διευθύνσεις sitemap',
      jsonLdTypes: 'Δομημένα δεδομένα',
      hreflangCount: 'Εναλλακτικές hreflang',
      notFoundStatus: 'Ανύπαρκτη διεύθυνση επιστρέφει',
      server: 'Διακομιστής',
      llmsTxt: 'llms.txt',
    },
    errors: {
      invalid_url: 'Αυτό δεν μοιάζει με διεύθυνση ιστοσελίδας.',
      blocked_host: 'Μπορούμε να ελέγξουμε μόνο δημόσιες ιστοσελίδες.',
      dns: 'Δεν βρήκαμε αυτό το domain.',
      timeout: 'Η ιστοσελίδα άργησε πολύ να απαντήσει.',
      unreachable: 'Η ιστοσελίδα δεν απάντησε.',
      not_html: 'Η διεύθυνση δεν επιστρέφει ιστοσελίδα.',
      too_many_redirects: 'Η ιστοσελίδα κάνει πάρα πολλές ανακατευθύνσεις.',
      rate_limited: 'Πολλοί έλεγχοι από αυτή τη σύνδεση. Δοκιμάστε ξανά σε ένα λεπτό.',
      generic: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας τη διεύθυνση.',
    },
  },
} as const;

export const ESTIMATE_COPY = {
  en: {
    eyebrow: 'Live estimate',
    title: 'What it costs, updated as you change it',
    intro:
      'Every figure below comes from the published price list. Move a slider and the total moves with it, so you can see the shape of the budget before anyone calls you.',
    track: 'What do you need?',
    tracks: { website: 'A website', seo: 'SEO', both: 'Both' },
    pages: 'Pages',
    languages: 'Languages',
    features: 'Features',
    seoTier: 'SEO plan',
    contentPages: 'Content pages per month',
    audit: 'Audit first',
    auditOptions: { none: 'Not needed', technical: 'Technical', advanced: 'Advanced' },
    maintenance: 'Add monthly maintenance',
    breakdown: 'Breakdown',
    oneOff: 'Build, billed once',
    oneOffNone: 'No build cost',
    monthly: 'Per month',
    monthlyNone: 'No monthly cost',
    perMonth: '/mo',
    band: (low: string, high: string) => `Scoping band ${low} – ${high}`,
    minTerm: (months: number) => `Monthly work runs on a ${months} month minimum, then month to month. The build is invoiced separately.`,
    net: 'net',
    vat: 'incl. VAT 24%',
    offer: 'Current offer applied',
    saving: (amount: string) => `You save €${amount} net`,
    fromAudit: 'Starting scope, from your test',
    disclaimer:
      'An estimate, not a quote. Published prices, your inputs, and a ±15% band on the build for what scoping usually moves. The quote follows a call.',
    send: 'Send this brief',
    sendHint: 'Your figures travel with the brief, so nobody starts from zero on the call.',
    empty: 'Pick what you need and the estimate builds itself.',
  },
  el: {
    eyebrow: 'Ζωντανή εκτίμηση',
    title: 'Τι κοστίζει, καθώς το αλλάζετε',
    intro:
      'Κάθε νούμερο παρακάτω προέρχεται από τον δημοσιευμένο τιμοκατάλογο. Μετακινήστε έναν διακόπτη και το σύνολο αλλάζει μαζί, ώστε να δείτε το μέγεθος του budget πριν σας καλέσει κανείς.',
    track: 'Τι χρειάζεστε;',
    tracks: { website: 'Ιστοσελίδα', seo: 'SEO', both: 'Και τα δύο' },
    pages: 'Σελίδες',
    languages: 'Γλώσσες',
    features: 'Λειτουργίες',
    seoTier: 'Πλάνο SEO',
    contentPages: 'Σελίδες περιεχομένου ανά μήνα',
    audit: 'Έλεγχος πρώτα',
    auditOptions: { none: 'Δεν χρειάζεται', technical: 'Τεχνικός', advanced: 'Εκτενής' },
    maintenance: 'Προσθήκη μηνιαίας συντήρησης',
    breakdown: 'Ανάλυση',
    oneOff: 'Κατασκευή, εφάπαξ',
    oneOffNone: 'Χωρίς κόστος κατασκευής',
    monthly: 'Ανά μήνα',
    monthlyNone: 'Χωρίς μηνιαίο κόστος',
    perMonth: '/μήνα',
    band: (low: string, high: string) => `Εύρος scoping ${low} – ${high}`,
    minTerm: (months: number) => `Η μηνιαία συνεργασία έχει ελάχιστη διάρκεια ${months} μηνών και μετά συνεχίζεται μηνιαία. Η κατασκευή τιμολογείται ξεχωριστά.`,
    net: 'καθαρά',
    vat: 'με ΦΠΑ 24%',
    offer: 'Εφαρμόστηκε η τρέχουσα προσφορά',
    saving: (amount: string) => `Κερδίζετε €${amount} καθαρά`,
    fromAudit: 'Αρχικό scope, από τον έλεγχό σας',
    disclaimer:
      'Εκτίμηση, όχι προσφορά. Δημοσιευμένες τιμές, τα δικά σας δεδομένα και εύρος ±15% στην κατασκευή για όσα συνήθως μετακινεί το scoping. Η προσφορά ακολουθεί μετά από κλήση.',
    send: 'Στείλτε αυτό το brief',
    sendHint: 'Τα νούμερά σας ταξιδεύουν μαζί με το brief, ώστε κανείς να μην ξεκινά από το μηδέν στην κλήση.',
    empty: 'Επιλέξτε τι χρειάζεστε και η εκτίμηση χτίζεται μόνη της.',
  },
} as const;

/** The copy bundle for one locale; the `as const` above makes the two differ. */
export type AuditCopy = (typeof AUDIT_COPY)[SiteLocale];
export type EstimateCopy = (typeof ESTIMATE_COPY)[SiteLocale];

export function pick<T>(locale: SiteLocale, values: { en: T; el: T }): T {
  return locale === 'el' ? values.el : values.en;
}
