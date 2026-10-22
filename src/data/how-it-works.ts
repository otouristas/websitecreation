import { RESPONSE_HOURS } from '@/data/company-facts';
import { serpMetaFor } from '@/data/serp-meta';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';

/**
 * How AnotherSEOGuru App works, from Search Console to a measured task.
 *
 * The slugs differ on purpose. English searches use /en/how-it-works. Greek
 * searches use /el/pos-leitourgei. This page is not an entry in
 * src/data/services.ts: that array generates service × city URLs.
 */

export const HOW_IT_WORKS_EN_PATH = '/en/how-it-works';
export const HOW_IT_WORKS_EL_PATH = '/el/pos-leitourgei';

export function howItWorksPath(locale: SiteLocale): string {
  return locale === 'el' ? HOW_IT_WORKS_EL_PATH : HOW_IT_WORKS_EN_PATH;
}

export function howLanguageAlternates(): Record<string, string> {
  return {
    en: `${BASE_URL}${HOW_IT_WORKS_EN_PATH}`,
    el: `${BASE_URL}${HOW_IT_WORKS_EL_PATH}`,
    'x-default': `${BASE_URL}${HOW_IT_WORKS_EN_PATH}`,
  };
}

export function howItWorksMeta(path: string): { title: string; description: string } {
  const row = serpMetaFor(path);
  if (!row) throw new Error(`Missing SERP metadata for ${path}`);
  return row;
}

export interface HowFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface HowStep {
  readonly n: string;
  readonly title: string;
  readonly body: string;
}

export interface HowItWorksCopy {
  readonly path: string;
  readonly alternatePath: string;
  readonly name: string;
  readonly homeName: string;
  readonly inLanguage: 'en' | 'el';
  readonly pillTag: string;
  readonly pillText: string;
  readonly lead: string;
  readonly primaryHref: string;
  readonly primaryLabel: string;
  readonly links: readonly { readonly href: string; readonly label: string }[];
  readonly stepsEyebrow: string;
  readonly stepsTitle: string;
  readonly stepsAccent: string;
  readonly stepsLead: string;
  readonly steps: readonly HowStep[];
  readonly measureEyebrow: string;
  readonly measureTitle: string;
  readonly measureAccent: string;
  readonly measureLead: string;
  readonly measureDisclaimer: string;
  readonly chartNote: string;
  readonly sample: {
    readonly taskTitle: string;
    readonly status: string;
    readonly briefLabel: string;
    readonly brief: string;
    readonly pageLabel: string;
    readonly page: string;
    readonly queryLabel: string;
    readonly query: string;
    readonly priorityLabel: string;
    readonly priority: string;
    readonly chartLabel: string;
    readonly before: string;
    readonly marker: string;
    readonly after: string;
  };
  readonly panelCaption: string;
  readonly panelNote: string;
  readonly panelBadge: string;
  readonly faqTitle: string;
  readonly faqAccent: string;
  readonly faqs: readonly HowFaqItem[];
  readonly askLabel: string;
  readonly closeTitle: string;
  readonly closeAccent: string;
  readonly closeLead: string;
  readonly source: string;
  readonly choiceSource: string;
}

function replyWindow(locale: SiteLocale): string {
  return locale === 'el'
    ? `Απαντάμε μέσα σε ${RESPONSE_HOURS} ώρες, στα ελληνικά ή στα αγγλικά.`
    : `We reply within ${RESPONSE_HOURS} hours, in Greek or English.`;
}

export function getHowItWorksCopy(locale: SiteLocale): HowItWorksCopy {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const path = howItWorksPath(locale);
  const alternatePath = isEl ? HOW_IT_WORKS_EN_PATH : HOW_IT_WORKS_EL_PATH;
  const reply = replyWindow(locale);
  const managedHref = isEl ? '/el/diacheirisi-seo' : '/en/managed-seo';

  if (isEl) {
    const measureLead =
      'Η σήμανση της εργασίας ως υλοποιημένης ξεκινά αυτόματη σύγκριση 28 ημερών στο Search Console, για τις ίδιες ημέρες πριν και μετά την ημέρα υλοποίησης, χωρίς εκείνη την ημέρα, με ένδειξη στο γράφημα της Απόδοσης και με τον υπόλοιπο ιστότοπο τις ίδιες ημέρες ως ομάδα ελέγχου.';
    const measureDisclaimer =
      'Το παράθυρο βοηθά την παρακολούθηση: δεν είναι προθεσμία της Google και δεν αποδεικνύει ότι η αλλαγή προκάλεσε τη μεταβολή.';
    const connect =
      'Συνδέεστε με Google, επιλέγετε τα properties του Search Console και η πρόσβαση μένει μόνο για ανάγνωση, γιατί δεν ζητάμε άδεια να αλλάξουμε κάτι στον λογαριασμό Google σας.';
    const opportunities =
      'Το AnotherSEOGuru App διαβάζει τα ερωτήματα και τις σελίδες, εμφανίζει το καθένα μία φορά στη μεγαλύτερη ευκαιρία του και αντιμετωπίζει την εκτίμηση κλικ ως μέγεθος της ευκαιρίας, όχι ως υπόσχεση.';
    const task =
      'Όταν στέλνετε μια ευκαιρία στις Εργασίες, η εργασία περιλαμβάνει brief, τη σελίδα, το ερώτημα και μια προτεραιότητα, ώστε να φιλτράρετε τη λίστα.';
    const report =
      'Στις Αναφορές, η Αναφορά πελάτη φτιάχνει αναφορά με την επωνυμία σας για τον ιστότοπο και το διάστημα που επιλέγετε, με την εικόνα του Search Console και τη δουλειά που υλοποιήθηκε.';
    return {
      path,
      alternatePath,
      name: 'Πώς λειτουργεί',
      homeName: 'Αρχική',
      inLanguage: 'el',
      pillTag: 'Ροή',
      pillText: 'Από το Search Console σε μετρημένη εργασία',
      lead: 'Συνδέετε το Google Search Console με πρόσβαση μόνο για ανάγνωση. Το AnotherSEOGuru App βρίσκει τις ευκαιρίες και τις μετατρέπει σε εργασίες. Την αλλαγή την κάνετε εσείς ή την αναλαμβάνει η ομάδα. Όταν σημειώσετε την εργασία ως υλοποιημένη, ξεκινά σύγκριση 28 ημερών με ένδειξη στο γράφημα της Απόδοσης, και μετά ακολουθεί η αναφορά.',
      primaryHref: `${lp('/get-started')}#free-audit`,
      primaryLabel: 'Κλείστε μια κλήση',
      links: [
        { href: lp('/platform'), label: 'AnotherSEOGuru App' },
        { href: managedHref, label: 'Διαχείριση SEO' },
      ],
      stepsEyebrow: 'Η ροή',
      stepsTitle: 'Επτά βήματα',
      stepsAccent: 'από τα δεδομένα στην αναφορά',
      stepsLead: 'Η σειρά μένει η ίδια: σύνδεση, ευκαιρίες, εργασίες, υλοποίηση, ολοκλήρωση, μέτρηση και αναφορά.',
      steps: [
        { n: '01', title: 'Σύνδεση Search Console', body: connect },
        { n: '02', title: 'Εύρεση ευκαιριών', body: opportunities },
        { n: '03', title: 'Άνοιγμα εργασίας', body: task },
        {
          n: '04',
          title: 'Υλοποίηση της αλλαγής',
          body: 'Δημοσιεύετε την αλλαγή στην ιστοσελίδα, ή την αναλαμβάνει η ομάδα, και η εργασία μένει ανοιχτή ώσπου η αλλαγή να δημοσιευτεί.',
        },
        {
          n: '05',
          title: 'Σήμανση ως υλοποιημένης',
          body: 'Σημειώνετε την εργασία ως υλοποιημένη όταν η αλλαγή έχει δημοσιευτεί: καταγράφεται η ημερομηνία και οι σημειώσεις μένουν χωριστά από την ενέργεια.',
        },
        { n: '06', title: 'Μέτρηση 28 ημερών', body: `${measureLead} ${measureDisclaimer}` },
        { n: '07', title: 'Αποστολή αναφοράς', body: report },
      ],
      measureEyebrow: 'Μετά την υλοποίηση',
      measureTitle: '28 ημέρες',
      measureAccent: 'πριν και μετά',
      measureLead,
      measureDisclaimer,
      chartNote:
        'Η ένδειξη καταγράφει την ημέρα που η εργασία υλοποιήθηκε. Το Search Console δίνει το πριν και το μετά όταν κλείσει το παράθυρο.',
      sample: {
        taskTitle: 'Ξαναγράψτε το title tag',
        status: 'Υλοποιήθηκε',
        briefLabel: 'Brief',
        brief: 'Title tag και meta description για μία σελίδα',
        pageLabel: 'Σελίδα',
        page: '/rooms/sea-view',
        queryLabel: 'Ερώτημα',
        query: 'ξενοδοχείο με θέα',
        priorityLabel: 'Προτεραιότητα',
        priority: 'Υψηλή',
        chartLabel: 'Απόδοση',
        before: '28 ημέρες πριν',
        marker: 'Υλοποιήθηκε',
        after: '28 ημέρες μετά',
      },
      panelCaption: 'Δείγμα εργασίας μέσα στο AnotherSEOGuru App. Δεν είναι λογαριασμός πελάτη.',
      panelNote: 'Δείγμα δεδομένων μέσα στο AnotherSEOGuru App. Δεν είναι λογαριασμός πελάτη.',
      panelBadge: 'Δείγμα δεδομένων',
      faqTitle: 'Ερωτήσεις για',
      faqAccent: 'τη ροή',
      faqs: [
        { question: 'Πώς συνδέω το Google Search Console;', answer: connect },
        { question: 'Τι κάνει το App με αυτά τα δεδομένα;', answer: opportunities },
        { question: 'Τι περιέχει μια εργασία;', answer: task },
        {
          question: 'Ποιος κάνει την αλλαγή;',
          answer:
            'Την κάνετε εσείς ή την αναλαμβάνει η ομάδα. Σημειώνετε την εργασία ως υλοποιημένη όταν η αλλαγή έχει δημοσιευτεί, και καταγράφεται η ημερομηνία. Οι σημειώσεις μένουν χωριστά από την ενέργεια.',
        },
        {
          question: 'Τι είναι η σύγκριση 28 ημερών;',
          answer: `${measureLead} ${measureDisclaimer}`,
        },
        { question: 'Τι περιλαμβάνει η αναφορά;', answer: report },
      ],
      askLabel: 'Συνομιλία στο WhatsApp',
      closeTitle: 'Κλείστε μια κλήση',
      closeAccent: 'με την ομάδα',
      closeLead: `Στείλτε την ιστοσελίδα και θα δούμε τη ροή στο δικό σας Search Console. ${reply}`,
      source: 'pos-leitourgei',
      choiceSource: 'pos-leitourgei-choice',
    };
  }

  const measureLead =
    'Marking the task shipped starts an automatic 28-day Search Console comparison for the same number of days before and after the ship day, excluding that day, with a Shipped marker on the Performance chart and the rest of the site measured over the same days as a control.';
  const measureDisclaimer =
    'The window helps monitoring: it is not a Google deadline or proof that the change caused the outcome.';
  const connect =
    'You sign in with Google, choose the Search Console properties, and the access stays read-only, because we never ask to change anything in your Google account.';
  const opportunities =
    'AnotherSEOGuru App reads the queries and pages, lists each one once under its largest opportunity, and treats the click figure as an estimate of size, not a promise.';
  const task =
    'Sending an opportunity to Tasks gives the task a brief, the page and the query it targets, and a priority you can filter the list by.';
  const report =
    'Open Reports, then Client report, and it builds a branded report for the site and the range you choose, covering the Search Console picture and the work that shipped.';
  return {
    path,
    alternatePath,
    name: 'How it works',
    homeName: 'Home',
    inLanguage: 'en',
    pillTag: 'Flow',
    pillText: 'From Search Console to a measured task',
    lead: 'Connect Google Search Console with read-only access. AnotherSEOGuru App finds the opportunities and turns them into tasks. You publish the change, or the team ships it. Mark it shipped and a 28-day comparison starts, with a Shipped marker on the Performance chart, and then the report follows.',
    primaryHref: `${lp('/get-started')}#free-audit`,
    primaryLabel: 'Book a call',
    links: [
      { href: lp('/platform'), label: 'AnotherSEOGuru App' },
      { href: managedHref, label: 'Managed SEO' },
    ],
    stepsEyebrow: 'The flow',
    stepsTitle: 'Seven steps',
    stepsAccent: 'from data to the report',
    stepsLead: 'The order stays the same: connect, find opportunities, open tasks, ship the change, mark it done, measure, then report.',
    steps: [
      { n: '01', title: 'Connect Search Console', body: connect },
      { n: '02', title: 'Find opportunities', body: opportunities },
      { n: '03', title: 'Open a task', body: task },
      {
        n: '04',
        title: 'Ship the change',
        body: 'You publish the change on the site, or the team ships it, and the task stays open until that change is actually live.',
      },
      {
        n: '05',
        title: 'Mark it done',
        body: 'Mark the task shipped when the change is live: that records the date, and notes stay separate from the action.',
      },
      { n: '06', title: 'Measure 28 days', body: `${measureLead} ${measureDisclaimer}` },
      { n: '07', title: 'Send the report', body: report },
    ],
    measureEyebrow: 'After it ships',
    measureTitle: '28 days',
    measureAccent: 'before and after',
    measureLead,
    measureDisclaimer,
    chartNote: 'The marker records the day the task shipped. Search Console supplies the before and after once the window has run.',
    sample: {
      taskTitle: 'Rewrite the title tag',
      status: 'Shipped',
      briefLabel: 'Brief',
      brief: 'Title tag and meta description for one page',
      pageLabel: 'Page',
      page: '/rooms/sea-view',
      queryLabel: 'Query',
      query: 'sea view hotel',
      priorityLabel: 'Priority',
      priority: 'High',
      chartLabel: 'Performance',
      before: '28 days before',
      marker: 'Shipped',
      after: '28 days after',
    },
    panelCaption: 'Sample task inside AnotherSEOGuru App. Not a client account.',
    panelNote: 'Sample data inside AnotherSEOGuru App. Not a client account.',
    panelBadge: 'Sample data',
    faqTitle: 'Questions about',
    faqAccent: 'the flow',
    faqs: [
      { question: 'How do I connect Google Search Console?', answer: connect },
      { question: 'What does the App do with that data?', answer: opportunities },
      { question: 'What is on a task?', answer: task },
      {
        question: 'Who makes the change?',
        answer:
          'You publish it, or the team ships it for you. Mark the task shipped when the change is live, and the date is recorded. Notes stay separate from the action.',
      },
      { question: 'What is the 28-day comparison?', answer: `${measureLead} ${measureDisclaimer}` },
      { question: 'What is in the report?', answer: report },
    ],
    askLabel: 'Talk on WhatsApp',
    closeTitle: 'Book a call',
    closeAccent: 'with the team',
    closeLead: `Send the site and we will walk through the flow on your Search Console. ${reply}`,
    source: 'how-it-works',
    choiceSource: 'how-it-works-choice',
  };
}

export function buildHowItWorksSchemas(locale: SiteLocale): SchemaOutput[] {
  const copy = getHowItWorksCopy(locale);
  const url = `${BASE_URL}${copy.path}`;
  return [
    generateBreadcrumbSchema({
      items: [
        { name: copy.homeName, url: localizedPath(locale, '/') },
        { name: copy.name, url: copy.path },
      ],
    }),
    {
      ...generateHowToSchema({
        name: copy.name,
        description: copy.lead,
        steps: copy.steps.map((step) => ({ name: step.title, text: step.body })),
      }),
      inLanguage: copy.inLanguage,
      url,
    },
    generateFAQSchema({ faqs: copy.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}
