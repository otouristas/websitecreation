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
    ? `Απαντάμε μέσα σε ${RESPONSE_HOURS} εργάσιμες ώρες, στα ελληνικά ή στα αγγλικά.`
    : `We reply within ${RESPONSE_HOURS} working hours, in Greek or English.`;
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
      'Μόλις σημειώσετε ότι δημοσιεύσατε την αλλαγή, η εφαρμογή καταγράφει την ημερομηνία στο γράφημα. Συγκρίνει τις 28 ημέρες πριν με τις 28 ημέρες μετά, παραλείποντας την ημέρα της δημοσίευσης. Δείχνει επίσης πώς κινήθηκε η υπόλοιπη ιστοσελίδα στα ίδια διαστήματα.';
    const measureDisclaimer =
      'Η σύγκριση σας βοηθά να αξιολογήσετε την αλλαγή. Η ζήτηση και άλλοι παράγοντες επηρεάζουν τα κλικ, ενώ η Google μπορεί να χρειαστεί περισσότερο χρόνο για να εμφανίσει τη νέα έκδοση.';
    const connect =
      'Συνδεθείτε με τον λογαριασμό Google και επιλέξτε την ιστοσελίδα που θέλετε να εξετάσετε. Η πρόσβαση στο Search Console είναι μόνο για ανάγνωση.';
    const opportunities =
      'Για κάθε αναζήτηση ή σελίδα, το AnotherSEOGuru App κρατά την πρόταση με τη μεγαλύτερη εκτιμώμενη αύξηση κλικ. Έτσι βλέπετε μία φορά κάθε ευκαιρία και μπορείτε να συγκρίνετε τις επιλογές σας.';
    const task =
      'Αποθηκεύστε την πρόταση στις Εργασίες. Θα έχετε μαζί τη σελίδα, την αναζήτηση που σας ενδιαφέρει, οδηγίες για την αλλαγή και την προτεραιότητά της.';
    const report =
      'Στις Αναφορές, επιλέξτε «Αναφορά πελάτη», την ιστοσελίδα και τις ημερομηνίες. Ο πελάτης θα δει τα στοιχεία του Search Console μαζί με τις εργασίες που ολοκληρώσατε. Με την αντίστοιχη επιλογή του πακέτου σας μπορείτε να προσθέσετε το λογότυπό σας.';
    return {
      path,
      alternatePath,
      name: 'Πώς λειτουργεί',
      homeName: 'Αρχική',
      inLanguage: 'el',
      pillTag: 'Διαδικασία',
      pillText: 'Δείτε τα βήματα με ένα παράδειγμα',
      lead: 'Ας πούμε ότι η σελίδα ενός δωματίου εμφανίζεται στη Google, αλλά λίγοι ταξιδιώτες την ανοίγουν. Με το AnotherSEOGuru App βλέπετε τι αναζήτησαν, δοκιμάζετε έναν πιο συγκεκριμένο τίτλο και παρακολουθείτε τα κλικ μετά την αλλαγή.',
      primaryHref: `${lp('/get-started')}#free-audit`,
      primaryLabel: 'Ζητήστε δωρεάν έλεγχο SEO',
      links: [
        { href: lp('/'), label: 'AnotherSEOGuru App' },
        { href: managedHref, label: 'Διαχείριση SEO' },
      ],
      stepsEyebrow: 'Στην εφαρμογή',
      stepsTitle: 'Επτά βήματα',
      stepsAccent: 'από τα δεδομένα στην αναφορά',
      stepsLead: 'Για τη σελίδα του δωματίου μπορείτε να κρατήσετε σε μία εργασία τον παλιό τίτλο, την πρόταση και την ημερομηνία δημοσίευσης.',
      steps: [
        { n: '01', title: 'Σύνδεση Search Console', body: connect },
        { n: '02', title: 'Εύρεση ευκαιριών', body: opportunities },
        { n: '03', title: 'Άνοιγμα εργασίας', body: task },
        {
          n: '04',
          title: 'Υλοποίηση της αλλαγής',
          body: 'Δημοσιεύστε τον νέο τίτλο στην ιστοσελίδα σας. Αν έχετε επιλέξει διαχείριση SEO, τη δημοσίευση αναλαμβάνει η ομάδα μας.',
        },
        {
          n: '05',
          title: 'Καταγραφή ημερομηνίας',
          body: 'Μόλις η αλλαγή εμφανιστεί στη σελίδα, σημειώστε την εργασία ως ολοκληρωμένη. Έτσι καταγράφεται η σωστή ημερομηνία στο γράφημα.',
        },
        { n: '06', title: 'Σύγκριση πριν και μετά', body: 'Μετά από 28 ημέρες δείτε πώς κινήθηκαν τα κλικ της σελίδας σε σύγκριση με τις προηγούμενες 28 ημέρες.' },
        { n: '07', title: 'Αποστολή αναφοράς', body: report },
      ],
      measureEyebrow: 'Μετά την υλοποίηση',
      measureTitle: '28 ημέρες',
      measureAccent: 'πριν και μετά',
      measureLead,
      measureDisclaimer,
      chartNote:
        'Η κατακόρυφη γραμμή δείχνει την ημέρα της δημοσίευσης.',
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
      panelCaption: 'Παράδειγμα εργασίας για τη σελίδα ενός δωματίου.',
      panelNote: 'Η σελίδα και τα στοιχεία του ξενοδοχείου είναι υποθετικά.',
      panelBadge: 'Δείγμα δεδομένων',
      faqTitle: 'Πριν συνδέσετε',
      faqAccent: 'την ιστοσελίδα σας',
      faqs: [
        { question: 'Πώς συνδέω το Google Search Console;', answer: connect },
        { question: 'Πώς επιλέγει η εφαρμογή τις προτάσεις;', answer: opportunities },
        { question: 'Τι περιέχει μια εργασία;', answer: task },
        {
          question: 'Βοηθάει και στο ChatGPT και στο Gemini;',
          answer:
            'Με το Pro και το Agency μπορείτε να παρακολουθείτε κάθε εβδομάδα πώς απαντούν το ChatGPT, το Gemini και το Perplexity σε επιλεγμένες ερωτήσεις. Βλέπετε σε ποιες απαντήσεις αναφέρεται η επιχείρησή σας και πώς αλλάζει η εικόνα με τον χρόνο.',
        },
        {
          question: 'Ποιος κάνει την αλλαγή;',
          answer:
            'Με τη συνδρομή στην εφαρμογή, εσείς επιλέγετε και δημοσιεύετε τις αλλαγές. Με την υπηρεσία διαχείρισης SEO μπορούμε να αναλάβουμε την υλοποίηση.',
        },
        {
          question: 'Τι είναι η σύγκριση 28 ημερών;',
          answer: `${measureLead} ${measureDisclaimer}`,
        },
        { question: 'Τι περιλαμβάνει η αναφορά;', answer: report },
      ],
      askLabel: 'Συνομιλία στο WhatsApp',
      closeTitle: 'Δοκιμάστε το στη',
      closeAccent: 'δική σας ιστοσελίδα',
      closeLead: `Συνδέστε το Search Console για να δείτε τις πρώτες προτάσεις. Αν θέλετε βοήθεια από την ομάδα μας, στείλτε μας την ιστοσελίδα σας. ${reply}`,
      source: 'pos-leitourgei',
      choiceSource: 'pos-leitourgei-choice',
    };
  }

  const measureLead =
    'Mark a change as shipped and the app adds its date to the performance chart. It compares the 28 days before with the 28 days after, leaving out publication day. You can also see how the rest of the site performed over those same dates.';
  const measureDisclaimer =
    'Use the comparison to judge whether to keep the change. Search demand and other updates can also affect clicks, and Google may take longer to pick up the new version.';
  const connect =
    'Sign in with Google and choose the Search Console properties you want to work on. The connection is read-only.';
  const opportunities =
    'For each query or page, AnotherSEOGuru App keeps the suggestion with the largest estimated click gain. You see each opportunity once and can compare the options.';
  const task =
    'Save a suggestion to Tasks. The task keeps the page, the search it targets, a brief for the edit and a priority you can filter by.';
  const report =
    'In Reports, open Client report and choose the site and dates. The report puts the Search Console numbers alongside the work you completed. You can add your own branding if your plan includes it.';
  return {
    path,
    alternatePath,
    name: 'How it works',
    homeName: 'Home',
    inLanguage: 'en',
    pillTag: 'Walkthrough',
    pillText: 'Follow a page edit from start to finish',
    lead: 'Say your hotel room page shows up on Google, but few people click it. AnotherSEOGuru App shows you the searches behind those impressions. You can try a more specific page title and follow what happens to clicks after you publish.',
    primaryHref: `${lp('/get-started')}#free-audit`,
    primaryLabel: 'Request a free SEO audit',
    links: [
      { href: lp('/'), label: 'AnotherSEOGuru App' },
      { href: managedHref, label: 'Managed SEO' },
    ],
    stepsEyebrow: 'Inside the app',
    stepsTitle: 'Seven steps',
    stepsAccent: 'from data to the report',
    stepsLead: 'For the hotel page, keep the old title, the suggested edit and the publication date together in one task.',
    steps: [
      { n: '01', title: 'Connect Search Console', body: connect },
      { n: '02', title: 'Find opportunities', body: opportunities },
      { n: '03', title: 'Open a task', body: task },
      {
        n: '04',
        title: 'Publish the edit',
        body: 'Update the title on your website. If you use our managed SEO service, our team can handle the edit for you.',
      },
      {
        n: '05',
        title: 'Mark it done',
        body: 'Once the new title is live, mark the task as shipped. That records the date you’ll see on your performance chart.',
      },
      { n: '06', title: 'Compare search performance', body: 'After 28 days, compare clicks to the page with clicks in the 28 days before publication.' },
      { n: '07', title: 'Send the report', body: report },
    ],
    measureEyebrow: 'After publication',
    measureTitle: '28 days',
    measureAccent: 'before and after',
    measureLead,
    measureDisclaimer,
    chartNote: 'The vertical line marks the day you published.',
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
    panelCaption: 'Example task for a hotel room page.',
    panelNote: 'The hotel page and figures in this example are fictional.',
    panelBadge: 'Sample data',
    faqTitle: 'Before you connect',
    faqAccent: 'your site',
    faqs: [
      { question: 'How do I connect Google Search Console?', answer: connect },
      { question: 'What does the App do with that data?', answer: opportunities },
      { question: 'What is on a task?', answer: task },
      {
        question: 'Does it help with ChatGPT and Gemini too?',
        answer:
          'With Pro or Agency you can track how ChatGPT, Gemini and Perplexity answer your selected questions each week. See which answers mention your business and whether that changes over time.',
      },
      {
        question: 'Who makes the change?',
        answer:
          'With a software plan, you choose and publish the edits. If you hire our team for managed SEO, we can put them live for you.',
      },
      { question: 'What is the 28-day comparison?', answer: `${measureLead} ${measureDisclaimer}` },
      { question: 'What is in the report?', answer: report },
    ],
    askLabel: 'Talk on WhatsApp',
    closeTitle: 'Try it on',
    closeAccent: 'your own site',
    closeLead: `Connect Search Console to see your first suggestions. If you’d like our team to take a look, send us your website. ${reply}`,
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
