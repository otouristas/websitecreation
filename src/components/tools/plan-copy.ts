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

/**
 * The plan panel names the work, and nothing else.
 *
 * It used to price it: a headline total, VAT, a scoping band, a euro figure
 * against every line. On a real Greek hotel site that read "Total over 6
 * months: EUR 11.890" before the visitor had spoken to anybody, and a cold
 * lead does not negotiate a number like that - they close the tab. The price
 * list is published at /pricing for anyone who wants it, and the quote follows
 * a call, which is how the business actually sells.
 *
 * So there is no currency in this file, and the guard in the self-test keeps
 * it that way.
 */
export const SCOPE_COPY = {
  en: {
    eyebrow: 'Your plan',
    title: 'What your site needs',
    intro:
      'Built from what we just measured. Adjust anything that does not match your plans - it is your brief, and it reaches a person, not a pipeline.',
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
    included: 'What this covers',
    oneOffTag: 'once',
    monthlyTag: 'monthly',
    fromAudit: 'Why this scope, from your test',
    priceNote: 'We price this on a short call, once we have seen the site properly.',
    priceLink: 'Package prices are published here',
    minTerm: (months: number) => `Monthly SEO work runs on a ${months} month minimum, then month to month.`,
    send: 'Send this brief',
    sendHint: 'Everything above travels with it, so nobody starts from zero on the call.',
    empty: 'Pick what you need and the plan builds itself.',
  },
  el: {
    eyebrow: 'Το πλάνο σας',
    title: 'Τι χρειάζεται το site σας',
    intro:
      'Φτιάχτηκε από όσα μόλις μετρήσαμε. Αλλάξτε ό,τι δεν ταιριάζει στα σχέδιά σας. Είναι το δικό σας brief και το διαβάζει άνθρωπος.',
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
    included: 'Τι περιλαμβάνει',
    oneOffTag: 'εφάπαξ',
    monthlyTag: 'μηνιαία',
    fromAudit: 'Γιατί αυτό το scope, από τον έλεγχό σας',
    priceNote: 'Η τιμή βγαίνει σε μια σύντομη κλήση, αφού δούμε σωστά το site.',
    priceLink: 'Οι τιμές των πακέτων είναι δημοσιευμένες εδώ',
    minTerm: (months: number) => `Η μηνιαία συνεργασία SEO έχει ελάχιστη διάρκεια ${months} μηνών και μετά συνεχίζεται μηνιαία.`,
    send: 'Στείλτε αυτό το brief',
    sendHint: 'Όλα τα παραπάνω ταξιδεύουν μαζί, ώστε κανείς να μην ξεκινά από το μηδέν στην κλήση.',
    empty: 'Επιλέξτε τι χρειάζεστε και το πλάνο χτίζεται μόνο του.',
  },
} as const;

/** The crawl phases, in the order the generator reports them. */
export const CRAWL_PHASE_LABELS: Record<string, { en: string; el: string }> = {
  resolve: { en: 'Resolving the domain', el: 'Εύρεση domain' },
  robots: { en: 'Reading robots.txt', el: 'Ανάγνωση robots.txt' },
  sitemap: { en: 'Reading the sitemap', el: 'Ανάγνωση sitemap' },
  crawl: { en: 'Crawling pages', el: 'Σάρωση σελίδων' },
  analyse: { en: 'Comparing pages against each other', el: 'Σύγκριση σελίδων μεταξύ τους' },
};

export const SEVERITY_LABELS = {
  critical: { en: 'Critical', el: 'Κρίσιμο' },
  warning: { en: 'Warning', el: 'Προειδοποίηση' },
  notice: { en: 'Notice', el: 'Σημείωση' },
} as const;

export const CRAWL_COPY = {
  en: {
    placeholder: 'your-website.gr',
    run: 'Crawl my site',
    running: 'Crawling',
    rerun: 'Crawl another site',
    hint: 'Free · no signup · we obey your robots.txt',
    pages: 'Pages crawled',
    findings: 'Site-wide findings',
    stats: 'Across the crawl',
    table: { url: 'Page', status: 'Status', depth: 'Depth', words: 'Words', ttfb: 'TTFB', title: 'Title' },
    statLabels: {
      pages: 'Pages',
      ok: 'Answered 200',
      broken: 'Broken',
      redirected: 'Redirects',
      noindexed: 'Noindexed',
      avgWordCount: 'Avg words',
      avgTtfbMs: 'Avg TTFB',
      maxDepth: 'Max depth',
    },
    affected: (n: number) => `${n} affected`,
    andMore: (n: number) => `and ${n} more`,
    clean: 'Nothing site-wide to report across the pages we crawled.',
    scope: (crawled: number, reason: string) => `${crawled} pages crawled — stopped on ${reason}.`,
    stopReason: {
      urls: 'the page limit',
      time: 'the time limit',
      depth: 'the depth limit',
      exhausted: 'running out of links',
    },
    caveat:
      'A bounded crawl: the first pages reachable from your homepage and sitemap, within one request. Findings describe what we crawled, not necessarily the whole site.',
    cta: 'Get these fixed',
    ctaHint: 'Send us the site and we come back with a plan in 24 working hours.',
    errors: {
      invalid_url: 'That does not look like a website address.',
      blocked_host: 'We can only crawl public websites.',
      dns: 'We could not find that domain.',
      timeout: 'The site took too long to answer.',
      unreachable: 'The site did not answer.',
      not_html: 'That address does not return a web page.',
      too_many_redirects: 'The site redirects too many times.',
      rate_limited: 'A crawl costs the target site real requests, so they are limited. Try again in a couple of minutes.',
      generic: 'Something went wrong. Try again, or send us the address.',
    },
  },
  el: {
    placeholder: 'to-site-sas.gr',
    run: 'Σάρωση του site μου',
    running: 'Σάρωση',
    rerun: 'Σάρωση άλλου site',
    hint: 'Δωρεάν · χωρίς εγγραφή · σεβόμαστε το robots.txt σας',
    pages: 'Σελίδες που σαρώθηκαν',
    findings: 'Ευρήματα σε όλο το site',
    stats: 'Σε όλη τη σάρωση',
    table: { url: 'Σελίδα', status: 'Κατάσταση', depth: 'Βάθος', words: 'Λέξεις', ttfb: 'TTFB', title: 'Τίτλος' },
    statLabels: {
      pages: 'Σελίδες',
      ok: 'Απάντησαν 200',
      broken: 'Σπασμένες',
      redirected: 'Ανακατευθύνσεις',
      noindexed: 'Με noindex',
      avgWordCount: 'Μ.ό. λέξεων',
      avgTtfbMs: 'Μ.ό. TTFB',
      maxDepth: 'Μέγιστο βάθος',
    },
    affected: (n: number) => `${n} επηρεάζονται`,
    andMore: (n: number) => `και ${n} ακόμη`,
    clean: 'Δεν εντοπίστηκε κάτι σε επίπεδο site στις σελίδες που σαρώσαμε.',
    scope: (crawled: number, reason: string) => `${crawled} σελίδες σαρώθηκαν — σταματήσαμε λόγω ${reason}.`,
    stopReason: {
      urls: 'του ορίου σελίδων',
      time: 'του ορίου χρόνου',
      depth: 'του ορίου βάθους',
      exhausted: 'εξάντλησης των συνδέσμων',
    },
    caveat:
      'Οριοθετημένη σάρωση: οι πρώτες σελίδες που φτάνουμε από την αρχική και το sitemap σας, μέσα σε ένα αίτημα. Τα ευρήματα αφορούν όσα σαρώσαμε, όχι απαραίτητα όλο το site.',
    cta: 'Διορθώστε τα',
    ctaHint: 'Στείλτε μας το site και επιστρέφουμε με πλάνο σε 24 εργάσιμες ώρες.',
    errors: {
      invalid_url: 'Αυτό δεν μοιάζει με διεύθυνση ιστοσελίδας.',
      blocked_host: 'Μπορούμε να σαρώσουμε μόνο δημόσιες ιστοσελίδες.',
      dns: 'Δεν βρήκαμε αυτό το domain.',
      timeout: 'Η ιστοσελίδα άργησε πολύ να απαντήσει.',
      unreachable: 'Η ιστοσελίδα δεν απάντησε.',
      not_html: 'Η διεύθυνση δεν επιστρέφει ιστοσελίδα.',
      too_many_redirects: 'Η ιστοσελίδα κάνει πάρα πολλές ανακατευθύνσεις.',
      rate_limited: 'Μια σάρωση κοστίζει πραγματικά αιτήματα στο site-στόχο, γι\' αυτό είναι περιορισμένη. Δοκιμάστε σε δυο λεπτά.',
      generic: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας τη διεύθυνση.',
    },
  },
} as const;

/** The copy bundle for one locale; the `as const` above makes the two differ. */
export type AuditCopy = (typeof AUDIT_COPY)[SiteLocale];
export type ScopeCopy = (typeof SCOPE_COPY)[SiteLocale];
export type CrawlCopy = (typeof CRAWL_COPY)[SiteLocale];

export function pick<T>(locale: SiteLocale, values: { en: T; el: T }): T {
  return locale === 'el' ? values.el : values.en;
}
