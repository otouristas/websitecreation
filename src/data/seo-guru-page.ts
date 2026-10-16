import type { SiteLocale } from '@/lib/i18n/locale';
import { FOUNDER_YEARS, PROJECTS_DELIVERED } from '@/data/founder';
import { RESPONSE_HOURS, SEO_MIN_TERM_MONTHS } from '@/data/company-facts';

/**
 * Copy for /en/seo-guru and /el/seo-guru.
 *
 * The task brief said to use a title, description and H1 "below", but none
 * were recorded. These follow the site's SERP limits (title ≤60 characters,
 * description 140–158) and the query "seo guru".
 *
 * Facts come from founder.ts, company-facts.ts and pricing tokens. Measured
 * client results are not on record, so that block is a placeholder.
 *
 * Strings may contain `{{TOKEN}}` price placeholders, resolved at render.
 */

type Card = {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
  readonly link?: { href: string; label: string };
};

export type SeoGuruCopy = {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly crumb: string;
  readonly pill: string;
  readonly pillTag: string;
  readonly h1: { readonly before: string; readonly accent: string; readonly after: string };
  readonly lead: string;
  readonly leadExtra: string;
  readonly stats: ReadonlyArray<{ value: string; label: string }>;
  readonly who: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly bullets: readonly string[];
    readonly visualCaption: string;
    readonly previewBody: string;
  };
  readonly method: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly cards: readonly Card[] };
  readonly results: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly all: string;
    readonly placeholderKicker: string;
    readonly placeholderTitle: string;
    readonly placeholderBody: string;
    readonly placeholderFrame: string;
  };
  readonly services: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly cards: readonly Card[] };
  readonly pricing: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly cards: readonly Card[]; readonly all: string };
  readonly faqTitle: string;
  readonly faqs: ReadonlyArray<{ question: string; answer: string }>;
  readonly relatedTitle: string;
  readonly cta: { readonly title: string; readonly body: string };
  readonly personDescription: string;
};

const years = `${FOUNDER_YEARS}+`;
const projects = `${PROJECTS_DELIVERED}+`;

const el: SeoGuruCopy = {
  metaTitle: 'SEO Guru | Γιώργος Κ., AnotherSEOGuru',
  metaDescription:
    'Ο Γιώργος Κ. είναι ο SEO guru της AnotherSEOGuru στην Αθήνα. Η μέθοδος ξεκινά από το Search Console σας, με υπηρεσίες και μηνιαίες τιμές. Δωρεάν έλεγχος.',
  primaryKeyword: 'seo guru',
  crumb: 'SEO guru',
  pillTag: 'Δωρεάν',
  pill: 'Ξεκινήστε με δωρεάν έλεγχο της ιστοσελίδας σας',
  h1: { before: 'Ο', accent: 'SEO guru', after: 'για ελληνικές επιχειρήσεις' },
  lead: `Ο Γιώργος Κ. είναι ο ιδρυτής της AnotherSEOGuru και ο SEO guru με τον οποίο μιλάτε. Η εταιρεία έχει έδρα στις Καμάρες της Σίφνου και ο Γιώργος εδρεύει στην Αθήνα, με ${years} χρόνια στο SEO και πάνω από ${PROJECTS_DELIVERED} έργα, κυρίως για ξενοδοχεία, ενοικιάσεις αυτοκινήτων και τοπικές επιχειρήσεις.`,
  leadExtra: `Η δουλειά ξεκινά από τα δικά σας δεδομένα στο Search Console. Απαντάμε μέσα σε ${RESPONSE_HOURS} ώρες, στα ελληνικά ή στα αγγλικά, και δεν υποσχόμαστε θέσεις που κανείς δεν μπορεί να εγγυηθεί.`,
  stats: [
    { value: years, label: 'Χρόνια στο SEO' },
    { value: projects, label: 'Έργα που παραδόθηκαν' },
    { value: 'EL / EN', label: 'Γλώσσες συνεργασίας' },
    { value: `${RESPONSE_HOURS}ω`, label: 'Απάντηση στον έλεγχο' },
  ],
  who: {
    eyebrow: 'Ποιοι είμαστε',
    title: 'Ποιος είναι ο SEO guru',
    body: 'AnotherSEOGuru είναι εταιρεία κατασκευής ιστοσελίδων και SEO. Ο SEO guru της ομάδας είναι ο Γιώργος Κ.: βλέπει ο ίδιος την ιστοσελίδα, αποφασίζει τι γίνεται πρώτο και η ομάδα το υλοποιεί. Δεν είναι ένα ψευδώνυμο πάνω σε μια αναφορά που ετοιμάζει κάποιος άλλος.',
    bullets: [
      'Ιδρυτής: Γιώργος Κ., σύμβουλος SEO με έδρα την Αθήνα',
      'Εταιρεία: AnotherSEOGuru, Καμάρες, Σίφνος',
      'Γλώσσες: ελληνικά και αγγλικά, με hreflang όπου χρειάζεται',
      'Πρώτο βήμα: δωρεάν έλεγχος, πριν από οποιαδήποτε σύμβαση',
    ],
    visualCaption: 'Όχι αποτέλεσμα πελάτη',
    previewBody:
      'Το πρώτο πράγμα που παίρνετε είναι ο δωρεάν έλεγχος: τα θέματα, η σειρά διόρθωσης και μια τιμή. Δεν δείχνουμε δείγμα γραφήματος, για να μη διαβαστεί ως αποτέλεσμα πελάτη.',
  },
  method: {
    eyebrow: 'Μέθοδος',
    title: 'Πώς δουλεύει ένας SEO guru εδώ',
    intro: 'Τρία βήματα, με την ίδια σειρά σε κάθε συνεργασία. Η σειρά βγαίνει από τα δεδομένα σας, όχι από ένα έτοιμο πακέτο ενεργειών.',
    cards: [
      {
        eyebrow: '01',
        title: 'Διαβάζουμε το Search Console',
        text: 'Συνδέουμε τα δικά σας δεδομένα, μόνο για ανάγνωση. Ερωτήματα, σελίδες, εμφανίσεις και θέσεις μένουν η πηγή, όχι μια γενική λίστα λέξεων-κλειδιών.',
      },
      {
        eyebrow: '02',
        title: 'Ταξινομούμε τις διορθώσεις',
        text: 'Τεχνικά θέματα, σελίδες και περιεχόμενο μπαίνουν σε σειρά ανάλογα με το τι μπορεί να φέρει πελάτες πρώτο. Κάθε ενέργεια εξηγεί τη θέση και τις εμφανίσεις πίσω της.',
      },
      {
        eyebrow: '03',
        title: 'Τα υλοποιούμε και τα σημειώνουμε',
        text: `Η ομάδα κάνει τις διορθώσεις και η μηνιαία αναφορά δείχνει τι στάλθηκε, πάνω στο γράφημα του Search Console. Ελάχιστη διάρκεια μηνιαίου SEO: ${SEO_MIN_TERM_MONTHS} μήνες.`,
      },
    ],
  },
  results: {
    eyebrow: 'Έργα',
    title: 'Ιστοσελίδες που μπορείτε να ανοίξετε',
    intro:
      'Παρακάτω είναι ζωντανά έργα από τη σελίδα έργων. Κάθε εικόνα είναι το homepage της ιστοσελίδας, ήδη δημοσιευμένο στο /work. Δεν είναι γραφήματα απόδοσης και δεν είναι μαρτυρίες.',
    all: 'Δείτε όλα τα έργα',
    placeholderKicker: 'Σύμβολο θέσης',
    placeholderTitle: 'Μετρήσιμα αποτελέσματα πελατών δεν έχουν καταγραφεί',
    placeholderBody:
      'Εδώ μπαίνουν νούμερα Search Console πριν και μετά, και τα στιγμιότυπα που θα δώσει ο ιδιοκτήτης. Δεν υπάρχουν τέτοια στοιχεία στο αρχείο, οπότε δεν εμφανίζεται κανένα νούμερο, μαρτυρία ή εικόνα αποτελέσματος. Αυτό το πλαίσιο δεν είναι αποτέλεσμα πελάτη.',
    placeholderFrame: 'Σύμβολο θέσης στιγμιότυπου: δεν υπάρχει εικόνα αποτελέσματος',
  },
  services: {
    eyebrow: 'Υπηρεσίες',
    title: 'Τι αναλαμβάνει ο SEO guru',
    intro: 'Οι υπηρεσίες είναι οι ίδιες με τον υπόλοιπο ιστότοπο. Κάθε κάρτα οδηγεί στη σελίδα της υπηρεσίας.',
    cards: [
      {
        eyebrow: 'Κάθε μήνα',
        title: 'Υπηρεσίες SEO',
        text: 'Τεχνικό SEO, on-page, περιεχόμενο και αναφορά, με σειρά που βγαίνει από το Search Console.',
        link: { href: '/seo-services', label: 'Δείτε τις υπηρεσίες SEO' },
      },
      {
        eyebrow: 'Χάρτης',
        title: 'Τοπικό SEO',
        text: 'Google Business Profile, σελίδες περιοχής και κριτικές, μόνο εκεί που δουλεύετε πραγματικά.',
        link: { href: '/services/local-seo', label: 'Τοπικό SEO' },
      },
      {
        eyebrow: 'Κατασκευή',
        title: 'Ιστοσελίδες και e-shop',
        text: 'Γρήγορες δίγλωσσες ιστοσελίδες και WooCommerce, με schema και Core Web Vitals πριν το λανσάρισμα.',
        link: { href: '/services', label: 'Όλες οι υπηρεσίες κατασκευής' },
      },
      {
        eyebrow: 'AI',
        title: 'GEO και AEO',
        text: 'Σελίδες που μπορούν να τις παραθέσουν οι βοηθοί AI, μαζί με παρακολούθηση αναφορών.',
        link: { href: '/services/ai-visibility', label: 'Ορατότητα σε AI' },
      },
    ],
  },
  pricing: {
    eyebrow: 'Τιμές',
    title: 'Πώς τιμολογείται η δουλειά',
    intro:
      'Η τιμή ακολουθεί τον ανταγωνισμό, τη ζήτηση αναζήτησης και τον όγκο περιεχομένου, όχι έναν αριθμό λέξεων-κλειδιών. Οι τιμές είναι καθαρές, προ ΦΠΑ 24%, και είναι οι ίδιες με τη σελίδα τιμών.',
    cards: [
      {
        eyebrow: 'Πριν τη σύμβαση',
        title: 'Δωρεάν έλεγχος',
        text: `Μας στέλνετε την ιστοσελίδα. Μέσα σε ${RESPONSE_HOURS} ώρες παίρνετε τα πρώτα θέματα και μια τιμή, πριν πληρώσετε.`,
      },
      {
        eyebrow: 'Κάθε μήνα',
        title: 'από {{ENTRY_SEO}} έως {{SEO_AUTHORITY}}/μήνα + ΦΠΑ',
        text: `Μηνιαίο SEO. Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μήνες. Τα πακέτα είναι Foundations, Growth και Authority.`,
      },
      {
        eyebrow: 'Μία φορά',
        title: 'Έλεγχος από {{ADDON_TECHNICAL_AUDIT}} + ΦΠΑ',
        text: 'Τεχνικός έλεγχος με λίστα διορθώσεων, αν θέλετε σχέδιο χωρίς μηνιαία ανάθεση.',
      },
    ],
    all: 'Δείτε όλες τις τιμές και τα πακέτα',
  },
  faqTitle: 'Συχνές ερωτήσεις για τον SEO guru',
  faqs: [
    {
      question: 'Τι κάνει ένας SEO guru;',
      answer:
        'Βρίσκει γιατί μια ιστοσελίδα δεν φέρνει τους πελάτες που θα μπορούσε από την αναζήτηση και το μετατρέπει σε λίστα εργασίας με σειρά. Στην AnotherSEOGuru αυτό σημαίνει ανάγνωση του Search Console, τεχνικές και on-page διορθώσεις, σελίδες για πραγματικά ερωτήματα και αναφορά για ό,τι στάλθηκε. Δεν υποσχόμαστε κατατάξεις.',
    },
    {
      question: 'Πώς επιλέγω SEO guru;',
      answer:
        'Ρωτήστε ποιος κάνει τη δουλειά, τι μετράει και τι δεν υπόσχεται. Μια χρήσιμη απάντηση ονομάζει την πηγή δεδομένων (το δικό σας Search Console), το πρώτο παραδοτέο (εδώ είναι ο δωρεάν έλεγχος) και μια τιμή που διαβάζετε πριν υπογράψετε. Ζητήστε ζωντανές ιστοσελίδες, όχι διαφάνειες με ανώνυμα αποτελέσματα.',
    },
    {
      question: 'Πόσο χρεώνει ένας SEO guru;',
      answer:
        'Το μηνιαίο SEO στην AnotherSEOGuru ξεκινά από {{ENTRY_SEO}} τον μήνα και φτάνει {{SEO_AUTHORITY}}, συν ΦΠΑ 24%. Ο τεχνικός έλεγχος ξεκινά από {{ADDON_TECHNICAL_AUDIT}} συν ΦΠΑ. Η τιμή ακολουθεί ανταγωνισμό, ζήτηση και περιεχόμενο, όχι αριθμό λέξεων-κλειδιών.',
    },
    {
      question: 'Ποια η διαφορά ανάμεσα σε SEO guru, σύμβουλο και εταιρεία;',
      answer:
        'Οι λέξεις επικαλύπτονται. Ο σύμβουλος καθοδηγεί. Η εταιρεία κάνει και την υλοποίηση. Εδώ έχετε και τα δύο: ο Γιώργος Κ. ορίζει το πλάνο και η ομάδα το παραδίδει. Η σελίδα του συμβούλου SEO εξηγεί την επιλογή της συμβουλευτικής μόνης της.',
    },
    {
      question: 'Πώς ξεκινάμε;',
      answer: `Στέλνετε την ιστοσελίδα σας για τον δωρεάν έλεγχο. Απαντάμε μέσα σε ${RESPONSE_HOURS} ώρες με τα πρώτα θέματα και μια τιμή. Από εκεί αποφασίζετε αν συνεχίζουμε.`,
    },
  ],
  relatedTitle: 'Σχετικές σελίδες',
  cta: {
    title: 'Στείλτε την ιστοσελίδα σας',
    body: `Δωρεάν έλεγχος SEO μέσα σε ${RESPONSE_HOURS} ώρες: τα πρώτα θέματα και μια σταθερή τιμή, στα ελληνικά ή στα αγγλικά.`,
  },
  personDescription: `Ο Γιώργος Κ. είναι ο ιδρυτής της AnotherSEOGuru και σύμβουλος SEO με έδρα την Αθήνα, ${years} χρόνια εμπειρίας και ${projects} έργα.`,
};

const en: SeoGuruCopy = {
  metaTitle: 'SEO Guru | George K, AnotherSEOGuru',
  metaDescription:
    'George K is the SEO guru behind AnotherSEOGuru in Athens. The method uses your Search Console, with services and monthly prices. Ask for a free audit.',
  primaryKeyword: 'seo guru',
  crumb: 'SEO guru',
  pillTag: 'Free',
  pill: 'Start with a free audit of your website',
  h1: { before: 'The', accent: 'SEO guru', after: 'for Greek businesses' },
  lead: `George K is the founder of AnotherSEOGuru and the SEO guru you talk to. The company is based in Kamares, Sifnos, and George is based in Athens, with ${years} years in SEO and more than ${PROJECTS_DELIVERED} projects delivered, mostly for hotels, car rentals and local businesses.`,
  leadExtra: `The work starts from your own Search Console data. We reply within ${RESPONSE_HOURS} hours, in Greek or English, and we do not promise rankings nobody can guarantee.`,
  stats: [
    { value: years, label: 'Years in SEO' },
    { value: projects, label: 'Projects delivered' },
    { value: 'EL / EN', label: 'Working languages' },
    { value: `${RESPONSE_HOURS}h`, label: 'Audit reply time' },
  ],
  who: {
    eyebrow: 'Who we are',
    title: 'Who the SEO guru is',
    body: 'AnotherSEOGuru is a web design and SEO company. The SEO guru on the team is George K: he looks at the site himself, decides what happens first, and the team ships it. It is not a pen name on a report someone else prepared.',
    bullets: [
      'Founder: George K, SEO consultant based in Athens',
      'Company: AnotherSEOGuru, Kamares, Sifnos',
      'Languages: Greek and English, with hreflang where the site needs it',
      'First step: a free audit, before any contract',
    ],
    visualCaption: 'Not a client result',
    previewBody:
      'The first thing you get is the free audit: the issues, the order to fix them and a price. No sample chart is shown here, so it cannot be read as a client result.',
  },
  method: {
    eyebrow: 'Method',
    title: 'How an SEO guru works here',
    intro: 'Three steps, in the same order on every engagement. The order comes from your data, not from a ready-made task list.',
    cards: [
      {
        eyebrow: '01',
        title: 'Read Search Console',
        text: 'We use your own data, read-only. Queries, pages, impressions and positions stay the source, rather than a generic keyword list.',
      },
      {
        eyebrow: '02',
        title: 'Rank the fixes',
        text: 'Technical issues, pages and content go in the order that can bring customers first. Each action names the position and impressions behind it.',
      },
      {
        eyebrow: '03',
        title: 'Ship them and mark them',
        text: `The team makes the fixes, and the monthly report shows what shipped on the Search Console chart. Minimum monthly SEO term: ${SEO_MIN_TERM_MONTHS} months.`,
      },
    ],
  },
  results: {
    eyebrow: 'Work',
    title: 'Sites you can open',
    intro:
      'These are live projects from the work page. Each image is that site’s homepage, already published on /work. They are not performance charts and they are not testimonials.',
    all: 'See all the work',
    placeholderKicker: 'Placeholder',
    placeholderTitle: 'Measured client results are not on record',
    placeholderBody:
      'This is where Search Console before-and-after numbers go, and the screenshots the owner supplies. None are on record, so no figure, testimonial or result image is shown. This box is not a client result.',
    placeholderFrame: 'Screenshot placeholder: no result image is on file',
  },
  services: {
    eyebrow: 'Services',
    title: 'What the SEO guru takes on',
    intro: 'The services are the same ones as the rest of the site. Each card links to that service page.',
    cards: [
      {
        eyebrow: 'Monthly',
        title: 'SEO services',
        text: 'Technical SEO, on-page work, content and a report, ordered from Search Console.',
        link: { href: '/seo-services', label: 'See the SEO services' },
      },
      {
        eyebrow: 'Maps',
        title: 'Local SEO',
        text: 'Google Business Profile, area pages and reviews, only where you actually work.',
        link: { href: '/services/local-seo', label: 'Local SEO' },
      },
      {
        eyebrow: 'Build',
        title: 'Websites and e-shops',
        text: 'Fast bilingual sites and WooCommerce stores, with schema and Core Web Vitals handled before launch.',
        link: { href: '/services', label: 'All build services' },
      },
      {
        eyebrow: 'AI',
        title: 'GEO and AEO',
        text: 'Pages AI assistants can cite, plus tracking of whether they mention you.',
        link: { href: '/services/ai-visibility', label: 'AI visibility' },
      },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'How the work is priced',
    intro:
      'Price follows competition, search demand and how much content the site needs, not a keyword count. Figures are net of 24% VAT and match the pricing page.',
    cards: [
      {
        eyebrow: 'Before a contract',
        title: 'Free audit',
        text: `Send the site. Within ${RESPONSE_HOURS} hours you get the first issues and a price, before you pay anything.`,
      },
      {
        eyebrow: 'Monthly',
        title: 'from {{ENTRY_SEO}} to {{SEO_AUTHORITY}}/mo + VAT',
        text: `Monthly SEO. Minimum term ${SEO_MIN_TERM_MONTHS} months. The packages are Foundations, Growth and Authority.`,
      },
      {
        eyebrow: 'Once',
        title: 'Audit from {{ADDON_TECHNICAL_AUDIT}} + VAT',
        text: 'A technical audit with an ordered fix list, if you want a plan without a monthly engagement.',
      },
    ],
    all: 'See every price and package',
  },
  faqTitle: 'Questions about an SEO guru',
  faqs: [
    {
      question: 'What does an SEO guru do?',
      answer:
        'An SEO guru finds why a site is not getting the customers it could from search, and turns that into an ordered list of work. At AnotherSEOGuru that means reading your Search Console, technical and on-page fixes, pages for real queries, and a report of what shipped. We do not promise rankings.',
    },
    {
      question: 'How do I choose an SEO guru?',
      answer:
        'Ask who does the work, what they measure and what they will not promise. A useful answer names the data source (your Search Console), the first deliverable (here, a free audit) and a price you can read before you sign. Ask to see live sites, not a slide of unnamed results.',
    },
    {
      question: 'How much does an SEO guru charge?',
      answer:
        'Monthly SEO at AnotherSEOGuru starts at {{ENTRY_SEO}} a month and runs to {{SEO_AUTHORITY}}, plus 24% VAT. A technical audit starts at {{ADDON_TECHNICAL_AUDIT}} plus VAT. Price follows competition, demand and content, not a keyword count.',
    },
    {
      question: 'What is the difference between an SEO guru, a consultant and an agency?',
      answer:
        'The words overlap. A consultant advises. An agency also does the work. Here you get both: George K sets the plan and the team ships it. The SEO consultant page explains the advisory option on its own.',
    },
    {
      question: 'How do we start?',
      answer: `Send your site for the free audit. We reply within ${RESPONSE_HOURS} hours with the first issues and a price. You decide whether to continue.`,
    },
  ],
  relatedTitle: 'Related pages',
  cta: {
    title: 'Send your website',
    body: `A free SEO audit within ${RESPONSE_HOURS} hours: the first issues and a fixed price, in Greek or English.`,
  },
  personDescription: `George K is the founder of AnotherSEOGuru and an SEO consultant based in Athens, with ${years} years of experience and ${projects} projects delivered.`,
};

const COPY: Record<SiteLocale, SeoGuruCopy> = { el, en };

export function getSeoGuruCopy(locale: SiteLocale): SeoGuruCopy {
  return COPY[locale];
}
