import { RESPONSE_HOURS, SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { serpMetaFor } from '@/data/serp-meta';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import type { SchemaOutput } from '@/lib/types/seo';

/**
 * Managed SEO, the done-for-you engagement.
 *
 * The slugs differ on purpose. English searches use /en/managed-seo. Greek
 * searches use /el/diacheirisi-seo. This page is not an entry in
 * src/data/services.ts: that array generates service × city URLs.
 */

export const MANAGED_SEO_EN_PATH = '/en/managed-seo';
export const MANAGED_SEO_EL_PATH = '/el/diacheirisi-seo';

const GREECE = { '@type': 'Country', name: 'Greece' } as const;
const ORG_ID = `${BASE_URL}/#organization`;

export function managedSeoPath(locale: SiteLocale): string {
  return locale === 'el' ? MANAGED_SEO_EL_PATH : MANAGED_SEO_EN_PATH;
}

export function managedLanguageAlternates(): Record<string, string> {
  return {
    en: `${BASE_URL}${MANAGED_SEO_EN_PATH}`,
    el: `${BASE_URL}${MANAGED_SEO_EL_PATH}`,
    'x-default': `${BASE_URL}${MANAGED_SEO_EN_PATH}`,
  };
}

export function managedSeoMeta(path: string): { title: string; description: string } {
  const row = serpMetaFor(path);
  if (!row) throw new Error(`Missing SERP metadata for ${path}`);
  return row;
}

export interface ManagedFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface ManagedRisk {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly href?: string;
}

export interface ManagedStep {
  readonly n: string;
  readonly title: string;
  readonly body: string;
}

export interface ManagedSampleTask {
  readonly title: string;
  readonly kind: string;
  readonly state: string;
}

export interface ManagedSeoCopy {
  readonly path: string;
  readonly alternatePath: string;
  readonly name: string;
  readonly homeName: string;
  readonly serviceName: string;
  readonly serviceType: string;
  readonly inLanguage: 'en' | 'el';
  readonly pillTag: string;
  readonly pillText: string;
  readonly lead: string;
  readonly primaryHref: string;
  readonly primaryLabel: string;
  readonly links: readonly { readonly href: string; readonly label: string }[];
  readonly risksEyebrow: string;
  readonly risksTitle: string;
  readonly risksAccent: string;
  readonly risksLead: string;
  readonly risks: readonly ManagedRisk[];
  readonly stepsEyebrow: string;
  readonly stepsTitle: string;
  readonly stepsAccent: string;
  readonly stepsLead: string;
  readonly steps: readonly ManagedStep[];
  readonly appEyebrow: string;
  readonly appTitle: string;
  readonly appAccent: string;
  readonly appLead: string;
  readonly appPoints: readonly string[];
  readonly appDisclaimer: string;
  readonly tasksLabel: string;
  readonly windowLabel: string;
  readonly sampleTasks: readonly ManagedSampleTask[];
  readonly panelCaption: string;
  readonly panelNote: string;
  readonly panelBadge: string;
  readonly termsEyebrow: string;
  readonly termsTitle: string;
  readonly termsAccent: string;
  readonly termsLead: string;
  readonly terms: readonly string[];
  readonly termsLinkLabel: string;
  readonly termsHref: string;
  readonly faqTitle: string;
  readonly faqAccent: string;
  readonly faqs: readonly ManagedFaqItem[];
  readonly askLabel: string;
  readonly closeTitle: string;
  readonly closeAccent: string;
  readonly closeLead: string;
  readonly source: string;
  readonly choiceSource: string;
}

function minimumTerm(locale: SiteLocale): string {
  return locale === 'el'
    ? `Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μηνών, στη συνέχεια μηνιαία ανανέωση.`
    : `A ${SEO_MIN_TERM_MONTHS} month minimum term, then rolling monthly.`;
}

function replyWindow(locale: SiteLocale): string {
  return locale === 'el'
    ? `Απαντάμε μέσα σε ${RESPONSE_HOURS} ώρες, στα ελληνικά ή στα αγγλικά.`
    : `We reply within ${RESPONSE_HOURS} hours, in Greek or English.`;
}

function measurementDisclaimer(locale: SiteLocale): string {
  return locale === 'el'
    ? 'Το παράθυρο σύγκρισης 28 ημερών στις Εργασίες βοηθά την παρακολούθηση. Δεν είναι προθεσμία της Google και δεν αποδεικνύει από μόνο του ότι η αλλαγή προκάλεσε τη μεταβολή.'
    : 'The 28-day before/after window in Tasks helps monitor changes. It is not a Google deadline or proof that the change caused the outcome.';
}

export function getManagedSeoCopy(locale: SiteLocale): ManagedSeoCopy {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const path = managedSeoPath(locale);
  const alternatePath = isEl ? MANAGED_SEO_EN_PATH : MANAGED_SEO_EL_PATH;
  const term = minimumTerm(locale);
  const reply = replyWindow(locale);
  const disclaimer = measurementDisclaimer(locale);

  if (isEl) {
    return {
      path,
      alternatePath,
      name: 'Διαχείριση SEO',
      homeName: 'Αρχική',
      serviceName: 'Διαχείριση SEO',
      serviceType: 'Διαχείριση SEO',
      inLanguage: 'el',
      pillTag: 'Ομάδα',
      pillText: 'Ολοκληρωμένη υπηρεσία μέσα στο AnotherSEOGuru App',
      lead: 'Η διαχείριση SEO είναι η ομάδα που κάνει τη δουλειά: έλεγχο, τεχνικές διορθώσεις, περιεχόμενο, Google Business Profile και εργασίες που βλέπετε στο AnotherSEOGuru App. Δεν μένετε με μια αναφορά και μια λίστα για να την κάνετε μόνοι σας.',
      primaryHref: `${lp('/get-started')}#free-audit`,
      primaryLabel: 'Κλείστε μια κλήση',
      links: [
        { href: lp('/seo-services'), label: 'Υπηρεσίες SEO' },
        { href: lp('/services'), label: 'Όλες οι υπηρεσίες' },
        { href: lp('/pricing'), label: 'Δείτε τα πακέτα' },
      ],
      risksEyebrow: 'Από πού ξεκινά',
      risksTitle: 'Πέντε λόγοι που η ιστοσελίδα',
      risksAccent: 'θέλει ομάδα',
      risksLead: 'Η μηνιαία δουλειά ξεκινά από ό,τι ήδη κοστίζει επισκέψεις. Δεν είναι μια γενική λίστα ελέγχων.',
      risks: [
        {
          key: 'technical',
          title: 'Τεχνικά προβλήματα που έμειναν πίσω',
          body: 'Παλιά redirects, canonical που δείχνουν αλλού και αργά templates μαζεύονται, ώσπου η Google σταματά να εμπιστεύεται τις σελίδες που πρέπει να φέρνουν πελάτες. Η συνεργασία ξεκινά από ό,τι μπλοκάρει την ευρετηρίαση.',
          href: lp('/seo-services/technical'),
        },
        {
          key: 'content',
          title: 'Περιεχόμενο που έπαψε να φέρνει επισκέψεις',
          body: 'Σελίδες που κάποτε έφερναν επισκέψεις σιγούν όταν αλλάζει η προσφορά, η σεζόν ή η αναζήτηση και κανείς δεν τις ξαναγράφει. Ανανεώνουμε όσες το Search Console ακόμη δείχνει, αντί να δημοσιεύουμε κι άλλες ίδιες.',
          href: lp('/seo-services/on-page'),
        },
        {
          key: 'maps',
          title: 'Χαμένη ορατότητα στο Google Maps',
          body: 'Ένα Google Business Profile που δεν συμφωνεί με την ιστοσελίδα, ή που δεν το συντηρεί κανείς, χάνεται από τον χάρτη που χρησιμοποιούν οι πελάτες κοντά σας. Η τοπική δουλειά βάζει το προφίλ και την ιστοσελίδα στην ίδια ιστορία.',
          href: lp('/services/local-seo'),
        },
        {
          key: 'reporting',
          title: 'Αναφορές χωρίς δουλειά',
          body: 'Ένα μηνιαίο PDF με θέσεις, που σταματά εκεί, δεν αλλάζει την ιστοσελίδα. Κάθε θέμα που αναφέρουμε είναι εργασία που η ομάδα πρέπει να ολοκληρώσει.',
          href: lp('/platform'),
        },
        {
          key: 'multilingual',
          title: 'Πολύγλωσσες ιστοσελίδες',
          body: 'Σελίδες στα ελληνικά και στα αγγλικά που μοιράζονται το ίδιο URL, ή που το hreflang δείχνει στη λάθος γλώσσα, διεκδικούν τις ίδιες αναζητήσεις. Δίνουμε σε κάθε γλώσσα το δικό της URL και σωστό ζεύγος hreflang.',
        },
      ],
      stepsEyebrow: 'Σειρά δουλειάς',
      stepsTitle: 'Έξι βήματα',
      stepsAccent: 'στη συνεργασία',
      stepsLead: 'Κάθε βήμα καταλήγει σε δουλειά που φαίνεται στο AnotherSEOGuru App, όχι σε μια σημείωση που μένει στο email.',
      steps: [
        {
          n: '01',
          title: 'Έλεγχος',
          body: 'Διαβάζουμε το Search Console, το crawl και τις σελίδες που ήδη φέρνουν επισκέψεις, και σημειώνουμε τι τις κρατά πίσω.',
        },
        {
          n: '02',
          title: 'Στρατηγική',
          body: 'Η σειρά της δουλειάς ακολουθεί τις αναζητήσεις που μπορούν να φέρουν πελάτες, όχι μια γενική λίστα που ταιριάζει σε κάθε ιστοσελίδα.',
        },
        {
          n: '03',
          title: 'Τεχνικό',
          body: 'Διορθώνουμε ευρετηρίαση, canonical, Core Web Vitals και structured data πριν προσθέσουμε νέες σελίδες.',
        },
        {
          n: '04',
          title: 'Περιεχόμενο',
          body: 'Ανανεώνουμε σελίδες που έπαψαν να φέρνουν επισκέψεις και γράφουμε όσες λείπουν σύμφωνα με τον έλεγχο.',
        },
        {
          n: '05',
          title: 'Τοπικό',
          body: 'Φέρνουμε το Google Business Profile σε συμφωνία με την ιστοσελίδα: κατηγορίες, υπηρεσίες και οι σελίδες που πρέπει να εμπιστεύεται η Google.',
        },
        {
          n: '06',
          title: 'Εργασίες με μέτρηση',
          body: 'Κάθε αλλαγή γίνεται εργασία στο AnotherSEOGuru App. Όταν δηλώνεται ολοκληρωμένη, ανοίγει το παράθυρο σύγκρισης 28 ημερών.',
        },
      ],
      appEyebrow: 'Μέσα στο App',
      appTitle: 'Τι βλέπετε',
      appAccent: 'στις Εργασίες',
      appLead: 'Οι εργασίες δείχνουν τη σελίδα, το ερώτημα και τι ολοκληρώθηκε. Η λίστα παρακάτω είναι δείγμα δεδομένων στο AnotherSEOGuru App, όχι λογαριασμός πελάτη.',
      appPoints: [
        'Η εργασία γράφει τη σελίδα και το ερώτημα που αφορά.',
        'Η δήλωση ολοκλήρωσης καταγράφει την ημερομηνία και ανοίγει σύγκριση 28 ημερών.',
        'Οι σημειώσεις μένουν χωριστά από τις ενέργειες, ώστε να φαίνεται τι στάλθηκε.',
      ],
      appDisclaimer: disclaimer,
      tasksLabel: 'Εργασίες',
      windowLabel: 'Παράθυρο 28 ημερών',
      sampleTasks: [
        {
          title: 'Διόρθωση canonical σε σελίδες που διεκδικούν τις ίδιες αναζητήσεις',
          kind: 'Τεχνικό',
          state: 'Ανοιχτή',
        },
        {
          title: 'Ανανέωση σελίδας που έπαψε να φέρνει επισκέψεις',
          kind: 'Περιεχόμενο',
          state: 'Ολοκληρώθηκε',
        },
        {
          title: 'Συμπλήρωση του Google Business Profile',
          kind: 'Τοπικό',
          state: 'Ανοιχτή',
        },
      ],
      panelCaption: 'Δείγμα εργασιών στο AnotherSEOGuru App. Δεν είναι λογαριασμός πελάτη.',
      panelNote: 'Δείγμα δεδομένων μέσα στο AnotherSEOGuru App. Δεν είναι λογαριασμός πελάτη.',
      panelBadge: 'Δείγμα δεδομένων',
      termsEyebrow: 'Από την πρώτη μέρα',
      termsTitle: 'Πώς',
      termsAccent: 'συνεργαζόμαστε',
      termsLead: 'Ξεκάθαροι όροι από την πρώτη μέρα. Τα πακέτα και η αμοιβή είναι στη σελίδα των πακέτων.',
      terms: [term, reply],
      termsLinkLabel: 'Δείτε τα πακέτα',
      termsHref: lp('/pricing'),
      faqTitle: 'Ερωτήσεις για τη',
      faqAccent: 'διαχείριση SEO',
      faqs: [
        {
          question: 'Τι περιλαμβάνει η διαχείριση SEO;',
          answer:
            'Η ομάδα κάνει τον έλεγχο, ορίζει τη σειρά της δουλειάς, εφαρμόζει τεχνικές διορθώσεις και περιεχόμενο, φροντίζει το Google Business Profile και καταγράφει τις εργασίες στο AnotherSEOGuru App. Βλέπετε τη δουλειά και το παράθυρο σύγκρισης 28 ημερών.',
        },
        {
          question: 'Το παράθυρο των 28 ημερών είναι υπόσχεση αποτελέσματος;',
          answer: disclaimer,
        },
        {
          question: 'Πόσο διαρκεί η συνεργασία και πόσο γρήγορα απαντάτε;',
          answer: `${term} ${reply}`,
        },
        {
          question: 'Πού βλέπω τα πακέτα και την αμοιβή;',
          answer: 'Τα πακέτα και η αμοιβή είναι στη σελίδα των πακέτων, πριν ξεκινήσουμε.',
        },
        {
          question: 'Υπόσχεστε θέση στη Google;',
          answer:
            'Δεν υποσχόμαστε θέση. Η δουλειά φαίνεται στο Search Console και στις εργασίες που ολοκληρώθηκαν. Η κλήση είναι με την ομάδα.',
        },
      ],
      askLabel: 'Μιλήστε στο WhatsApp',
      closeTitle: 'Κλείστε μια κλήση',
      closeAccent: 'με την ομάδα',
      closeLead: `Στείλτε την ιστοσελίδα και τι πουλάτε. ${reply} Η κλήση είναι με την ομάδα.`,
      source: 'diacheirisi-seo',
      choiceSource: 'diacheirisi-seo-choice',
    };
  }

  return {
    path,
    alternatePath,
    name: 'Managed SEO',
    homeName: 'Home',
    serviceName: 'Managed SEO services',
    serviceType: 'Managed SEO',
    inLanguage: 'en',
    pillTag: 'Team',
    pillText: 'Done for you, inside AnotherSEOGuru App',
    lead: 'Managed SEO is the team doing the work: the audit, the technical fixes, the content, Google Business Profile and the tasks you can see in AnotherSEOGuru App. You are not left with a report and a list of homework.',
    primaryHref: `${lp('/get-started')}#free-audit`,
    primaryLabel: 'Book a call',
    links: [
      { href: lp('/seo-services'), label: 'SEO services' },
      { href: lp('/services'), label: 'All services' },
      { href: lp('/pricing'), label: 'See the packages' },
    ],
    risksEyebrow: 'Where it starts',
    risksTitle: 'Five reasons a site',
    risksAccent: 'needs a team',
    risksLead: 'The monthly work starts from what is already costing visits. It is not a generic checklist.',
    risks: [
      {
        key: 'technical',
        title: 'Technical debt',
        body: 'Old redirects, conflicting canonicals and slow templates pile up until Google stops trusting the pages that should bring customers. The engagement starts by clearing what blocks indexation.',
        href: lp('/seo-services/technical'),
      },
      {
        key: 'content',
        title: 'Content decay',
        body: 'Pages that once earned visits go quiet when the offer, the season or the search changes and nobody rewrites them. We refresh the ones Search Console still shows, instead of publishing more of the same.',
        href: lp('/seo-services/on-page'),
      },
      {
        key: 'maps',
        title: 'Lost Maps visibility',
        body: 'A Google Business Profile that disagrees with the website, or that nobody maintains, drops out of the map results nearby customers use. Local work puts the profile and the site on the same story.',
        href: lp('/services/local-seo'),
      },
      {
        key: 'reporting',
        title: 'Reporting without action',
        body: 'A monthly PDF that lists positions and then stops does not change the site. Every item we report is a task the team is expected to ship.',
        href: lp('/platform'),
      },
      {
        key: 'multilingual',
        title: 'Multilingual sites',
        body: 'Greek and English pages that share a URL, or that point hreflang at the wrong language, compete for the same searches. Each language gets its own URL and a correct hreflang pair.',
      },
    ],
    stepsEyebrow: 'Scope',
    stepsTitle: 'Six steps',
    stepsAccent: 'in the engagement',
    stepsLead: 'Each step ends as work you can see in AnotherSEOGuru App, not as a note that stays in email.',
    steps: [
      {
        n: '01',
        title: 'Audit',
        body: 'We read Search Console, the crawl and the pages that already earn visits, and we write down what is holding them back.',
      },
      {
        n: '02',
        title: 'Strategy',
        body: 'The order of work follows the searches that can bring customers, not a generic checklist that would fit any website.',
      },
      {
        n: '03',
        title: 'Technical',
        body: 'We fix indexation, canonicals, Core Web Vitals and structured data before we add new pages.',
      },
      {
        n: '04',
        title: 'Content',
        body: 'We refresh pages that have gone quiet and write the ones the audit shows are missing.',
      },
      {
        n: '05',
        title: 'Local',
        body: 'We bring the Google Business Profile in line with the site: categories, services and the pages Google should trust.',
      },
      {
        n: '06',
        title: 'Measured tasks',
        body: 'Every change becomes a task in AnotherSEOGuru App. Marking it shipped records the date and opens the 28-day comparison.',
      },
    ],
    appEyebrow: 'Inside the App',
    appTitle: 'What you see',
    appAccent: 'in Tasks',
    appLead: 'Tasks show the page, the query and what shipped. The list below is sample data inside AnotherSEOGuru App, not a client account.',
    appPoints: [
      'The task names the page and the query it belongs to.',
      'Marking the work shipped records the date and starts a 28-day comparison.',
      'Notes stay separate from the actions, so you can see what actually went out.',
    ],
    appDisclaimer: disclaimer,
    tasksLabel: 'Tasks',
    windowLabel: '28-day window',
    sampleTasks: [
      {
        title: 'Fix canonicals on pages competing for the same searches',
        kind: 'Technical',
        state: 'Open',
      },
      {
        title: 'Refresh a page that stopped earning visits',
        kind: 'Content',
        state: 'Shipped',
      },
      {
        title: 'Complete the Google Business Profile',
        kind: 'Local',
        state: 'Open',
      },
    ],
    panelCaption: 'Sample tasks inside AnotherSEOGuru App. Not a client account.',
    panelNote: 'Sample data inside AnotherSEOGuru App. Not a client account.',
    panelBadge: 'Sample data',
    termsEyebrow: 'From day one',
    termsTitle: 'How we work',
    termsAccent: 'together',
    termsLead: 'Clear terms from day one. Packages and fees are on the packages page.',
    terms: [term, reply],
    termsLinkLabel: 'See the packages',
    termsHref: lp('/pricing'),
    faqTitle: 'Questions about',
    faqAccent: 'managed SEO',
    faqs: [
      {
        question: 'What does managed SEO include?',
        answer:
          'The team runs the audit, sets the order of work, ships technical fixes and content, looks after Google Business Profile, and records the tasks in AnotherSEOGuru App. You see the work and the 28-day before/after window.',
      },
      {
        question: 'Is the 28-day window a promise of results?',
        answer: disclaimer,
      },
      {
        question: 'How long is the engagement, and how fast do you reply?',
        answer: `${term} ${reply}`,
      },
      {
        question: 'Where are the packages and the fee?',
        answer: 'Packages and fees are on the packages page, before we start.',
      },
      {
        question: 'Do you promise a Google position?',
        answer: 'We do not promise a position. The work shows up in Search Console and in the tasks that shipped. The call is with the team.',
      },
    ],
    askLabel: 'Talk on WhatsApp',
    closeTitle: 'Book a call',
    closeAccent: 'with the team',
    closeLead: `Send the site and what you sell. ${reply} The call is with the team.`,
    source: 'managed-seo',
    choiceSource: 'managed-seo-choice',
  };
}

export function buildManagedSeoSchemas(locale: SiteLocale): SchemaOutput[] {
  const copy = getManagedSeoCopy(locale);
  const meta = managedSeoMeta(copy.path);
  const url = `${BASE_URL}${copy.path}`;
  return [
    generateBreadcrumbSchema({
      items: [
        { name: copy.homeName, url: localizedPath(locale, '/') },
        { name: copy.name, url: copy.path },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: copy.serviceName,
      description: meta.description,
      url,
      inLanguage: copy.inLanguage,
      serviceType: copy.serviceType,
      provider: { '@id': ORG_ID },
      areaServed: GREECE,
    },
    generateFAQSchema({ faqs: copy.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })) }),
  ];
}
