import type { SiteLocale } from '@/lib/i18n/locale';
import { FOUNDER_YEARS, PROJECTS_DELIVERED } from '@/data/founder';
import { RESPONSE_HOURS, SEO_MIN_TERM_MONTHS } from '@/data/company-facts';

/**
 * Copy for the founder / SEO-consultant page: /el/symvoulos-seo and
 * /en/seo-consultant (Greek keyword map, section 3, "pages to create").
 *
 * Facts are limited to what the owner confirmed (src/data/founder.ts) and
 * what the repo can show (the /work portfolio). Prices only as tokens,
 * resolved at render time from src/data/pricing.ts.
 *
 * Strings with `[label](/path)` render that span as an internal link.
 */

type Card = { readonly eyebrow: string; readonly title: string; readonly text: string; readonly link?: { href: string; label: string } };

export type ConsultantCopy = {
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
  readonly role: { readonly eyebrow: string; readonly title: string; readonly body: string; readonly bullets: readonly string[] };
  readonly modes: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly cards: readonly Card[] };
  readonly experience: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly all: string };
  readonly versus: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly consultantTitle: string;
    readonly consultantItems: readonly string[];
    readonly companyTitle: string;
    readonly companyItems: readonly string[];
  };
  readonly pricing: { readonly eyebrow: string; readonly title: string; readonly intro: string; readonly cards: readonly Card[]; readonly all: string };
  readonly faqTitle: string;
  readonly faqs: ReadonlyArray<{ question: string; answer: string }>;
  readonly relatedTitle: string;
  readonly cta: { readonly title: string; readonly body: string };
  readonly personDescription: string;
  readonly visualCaption: string;
};

const years = `${FOUNDER_YEARS}+`;
const projects = `${PROJECTS_DELIVERED}+`;

const el: ConsultantCopy = {
  metaTitle: 'Σύμβουλος SEO | Γιώργος Κ., SEO Specialist',
  metaDescription: `Γιώργος Κ., σύμβουλος SEO και SEO specialist με ${years} χρόνια σε ελληνικά sites τουρισμού και e-shop. Συμβουλευτική, audit και καθοδήγηση ομάδων.`,
  primaryKeyword: 'σύμβουλος SEO',
  crumb: 'Σύμβουλος SEO',
  pillTag: 'Δωρεάν',
  pill: 'Ξεκινήστε με δωρεάν έλεγχο της ιστοσελίδας σας',
  h1: { before: 'Γιώργος Κ.:', accent: 'σύμβουλος SEO', after: 'για ελληνικές επιχειρήσεις' },
  lead: `Είμαι ο Γιώργος Κ., ιδρυτής της AnotherSEOGuru και σύμβουλος SEO με έδρα την Αθήνα. Με ${years} χρόνια εμπειρίας και πάνω από ${PROJECTS_DELIVERED} έργα, δουλεύω κυρίως με ξενοδοχεία, rent-a-car, τουριστικές επιχειρήσεις και e-shop, από το audit μέχρι τη στρατηγική.`,
  leadExtra: `Αν ψάχνετε ειδικό στο SEO που θα δει ο ίδιος την ιστοσελίδα σας και θα σας πει τι να διορθώσετε πρώτα, ξεκινήστε από τον δωρεάν έλεγχο. Απαντάμε μέσα σε ${RESPONSE_HOURS} ώρες.`,
  stats: [
    { value: years, label: 'Χρόνια στο SEO' },
    { value: projects, label: 'Έργα που παραδόθηκαν' },
    { value: 'Αθήνα', label: 'Έδρα' },
    { value: 'EL / EN', label: 'Γλώσσες συνεργασίας' },
  ],
  role: {
    eyebrow: 'Ο ρόλος',
    title: 'Τι κάνει ένας σύμβουλος SEO',
    body: 'Ένας σύμβουλος SEO (SEO consultant ή SEO specialist) βρίσκει γιατί μια ιστοσελίδα δεν εμφανίζεται στη Google και τι θα της φέρει περισσότερους πελάτες, και το μετατρέπει σε σχέδιο με σειρά προτεραιότητας. Οι αποφάσεις βασίζονται στα δικά σας δεδομένα από το Search Console, όχι σε γενικές συνταγές, και ο σύμβουλος βοηθά εσάς ή την ομάδα σας να τις υλοποιήσετε.',
    bullets: [
      'Τεχνικός έλεγχος: ευρετηρίαση, ταχύτητα, δομή και σφάλματα',
      'Έρευνα λέξεων-κλειδιών και αντιστοίχιση σε σελίδες',
      'Στρατηγική περιεχομένου και εσωτερικών συνδέσμων',
      'Τοπικό SEO και Google Business Profile',
      'Ορατότητα στις απαντήσεις του ChatGPT, του Gemini και της Google AI',
      'Καθοδήγηση developers και ομάδων περιεχομένου',
    ],
  },
  modes: {
    eyebrow: 'Συνεργασία',
    title: 'Συμβουλευτική, audit ή πλήρης ανάθεση;',
    intro: 'Τρεις τρόποι συνεργασίας. Η επιλογή εξαρτάται κυρίως από το αν έχετε δική σας ομάδα για την υλοποίηση.',
    cards: [
      {
        eyebrow: 'Έχετε ομάδα',
        title: 'Συμβουλευτική SEO',
        text: 'Για επιχειρήσεις με δικό τους developer ή υπεύθυνο marketing. Συναντήσεις εργασίας, απαντήσεις σε συγκεκριμένα ερωτήματα (μετάβαση σε νέο site, πτώση επισκεψιμότητας, νέα αγορά) και έλεγχος όσων υλοποιεί η ομάδα σας.',
      },
      {
        eyebrow: 'Μία φορά',
        title: 'SEO audit',
        text: 'Πλήρης τεχνικός έλεγχος της ιστοσελίδας με λίστα διορθώσεων κατά προτεραιότητα, ώστε να ξέρετε τι διορθώνετε πρώτα και γιατί. Το υλοποιείτε μόνοι σας ή μας το αναθέτετε.',
        link: { href: '/services/seo-audits', label: 'Τι περιλαμβάνει το SEO audit' },
      },
      {
        eyebrow: 'Κάθε μήνα',
        title: 'Πλήρης ανάθεση',
        text: `Αναλαμβάνουμε το SEO από άκρη σε άκρη: τεχνικές διορθώσεις, περιεχόμενο, τοπικό SEO και μηνιαία αναφορά σε κλικ και αιτήματα. Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μήνες.`,
        link: { href: '/seo-services', label: 'Δείτε τις υπηρεσίες SEO' },
      },
    ],
  },
  experience: {
    eyebrow: 'Εμπειρία',
    title: 'Εμπειρία και έργα',
    intro: `${years} χρόνια στο SEO και πάνω από ${PROJECTS_DELIVERED} έργα: ιστοσελίδες, e-shop και SEO για ξενοδοχεία, ενοικιάσεις αυτοκινήτων, τουριστικές και τοπικές επιχειρήσεις, από τις Κυκλάδες και την Κρήτη μέχρι την Αθήνα. Μερικά από τα έργα που είναι online σήμερα:`,
    all: 'Δείτε όλα τα έργα',
  },
  versus: {
    eyebrow: 'Επιλογή',
    title: 'Σύμβουλος SEO ή εταιρεία SEO;',
    body: 'Ένας ανεξάρτητος σύμβουλος σας δίνει άμεση επαφή με τον άνθρωπο που κάνει τη δουλειά, αλλά συνήθως δεν έχει ομάδα για την υλοποίηση. Μια εταιρεία έχει ομάδα, αλλά συχνά μιλάτε με account manager αντί για τον ειδικό. Στην AnotherSEOGuru έχετε και τα δύο: σύμβουλο για τη στρατηγική και ομάδα για την υλοποίηση, ως [εταιρεία SEO](/) με πλήρεις [υπηρεσίες SEO](/seo-services).',
    consultantTitle: 'Σας αρκεί σύμβουλος όταν',
    consultantItems: [
      'έχετε developer ή ομάδα marketing',
      'θέλετε δεύτερη γνώμη πριν από redesign ή μετάβαση',
      'χρειάζεστε σχέδιο, όχι εκτέλεση',
    ],
    companyTitle: 'Χρειάζεστε εταιρεία όταν',
    companyItems: [
      'δεν έχετε σε ποιον να αναθέσετε τις διορθώσεις',
      'θέλετε τεχνικό SEO, περιεχόμενο και τοπικό SEO μαζί',
      'θέλετε μηνιαία αναφορά και έναν υπεύθυνο για το αποτέλεσμα',
    ],
  },
  pricing: {
    eyebrow: 'Τιμές',
    title: 'Τιμές συμβουλευτικής SEO',
    intro: 'Οι τιμές είναι οι ίδιες με τον τιμοκατάλογό μας και δεν περιλαμβάνουν ΦΠΑ.',
    cards: [
      {
        eyebrow: 'Συμβουλευτική',
        title: 'Κατόπιν προσφοράς',
        text: 'Η προσφορά βγαίνει αφού δούμε την ιστοσελίδα σας στον δωρεάν έλεγχο, ώστε να πληρώνετε μόνο ό,τι χρειάζεστε.',
      },
      {
        eyebrow: 'SEO audit',
        title: 'από {{ADDON_TECHNICAL_AUDIT}} + ΦΠΑ',
        text: 'Τεχνικός έλεγχος με λίστα διορθώσεων. Ο εκτενής έλεγχος ξεκινά από {{ADDON_ADVANCED_AUDIT}} + ΦΠΑ.',
      },
      {
        eyebrow: 'Πλήρης ανάθεση',
        title: 'από {{ENTRY_SEO}}/μήνα + ΦΠΑ',
        text: `Μηνιαίο πακέτο SEO, με ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μήνες.`,
      },
    ],
    all: 'Δείτε όλες τις τιμές και τα πακέτα',
  },
  faqTitle: 'Συχνές ερωτήσεις για τον σύμβουλο SEO',
  faqs: [
    {
      question: 'Τι κάνει ένας SEO specialist;',
      answer:
        'Ένας SEO specialist (ειδικός SEO) βρίσκει τι εμποδίζει μια ιστοσελίδα να εμφανιστεί στη Google και τι θα της φέρει περισσότερους πελάτες. Ελέγχει την τεχνική κατάσταση, ερευνά λέξεις-κλειδιά, σχεδιάζει περιεχόμενο και εσωτερικούς συνδέσμους, δουλεύει το τοπικό SEO και μετρά τα αποτελέσματα στο Search Console. Ως σύμβουλος δίνει και σειρά προτεραιότητας, ώστε να ξέρετε τι κάνετε πρώτα.',
    },
    {
      question: 'Πόσο χρεώνει ένας σύμβουλος SEO;',
      answer:
        'Εξαρτάται από το τι χρειάζεστε. Στην AnotherSEOGuru ο τεχνικός έλεγχος SEO ξεκινά από {{ADDON_TECHNICAL_AUDIT}} + ΦΠΑ και το μηνιαίο SEO από {{ENTRY_SEO}} τον μήνα + ΦΠΑ. Η συμβουλευτική τιμολογείται κατόπιν προσφοράς, αφού δούμε την ιστοσελίδα σας στον δωρεάν έλεγχο. Όλες οι τιμές βρίσκονται στη σελίδα τιμών.',
    },
    {
      question: 'Ποια η διαφορά ανάμεσα σε σύμβουλο SEO και εταιρεία SEO;',
      answer:
        'Ο σύμβουλος SEO δίνει στρατηγική και καθοδήγηση, ενώ η εταιρεία SEO αναλαμβάνει και την υλοποίηση. Αν έχετε δική σας ομάδα, συνήθως αρκεί ο σύμβουλος. Αν όχι, χρειάζεστε κάποιον να κάνει και τις διορθώσεις. Στην AnotherSEOGuru μπορείτε να ξεκινήσετε με συμβουλευτική ή audit και να περάσετε σε πλήρη ανάθεση όποτε θέλετε.',
    },
    {
      question: 'Συνεργάζεστε με επιχειρήσεις εκτός Αθήνας;',
      answer:
        'Ναι. Η έδρα μας είναι στην Αθήνα, αλλά πολλά από τα έργα μας βρίσκονται στις Κυκλάδες, στην Κρήτη και σε άλλες περιοχές της Ελλάδας. Η συνεργασία γίνεται online, στα ελληνικά ή στα αγγλικά.',
    },
    {
      question: 'Πώς ξεκινάμε;',
      answer: `Με τον δωρεάν έλεγχο της ιστοσελίδας σας. Μας στέλνετε τη διεύθυνση και μέσα σε ${RESPONSE_HOURS} ώρες παίρνετε τα βασικά προβλήματα και τι θα διορθώνατε πρώτα. Από εκεί αποφασίζετε αν θέλετε συμβουλευτική, audit ή πλήρη ανάθεση.`,
    },
  ],
  relatedTitle: 'Σχετικές σελίδες',
  cta: {
    title: 'Ας δούμε μαζί την ιστοσελίδα σας',
    body: `Ξεκινήστε με δωρεάν έλεγχο SEO: μέσα σε ${RESPONSE_HOURS} ώρες ξέρετε τι να διορθώσετε πρώτα.`,
  },
  personDescription: `Σύμβουλος SEO και ιδρυτής της AnotherSEOGuru, με έδρα την Αθήνα, ${years} χρόνια εμπειρίας και ${projects} έργα.`,
  visualCaption: 'Δείγμα ελέγχου SEO, όπως αυτός που παίρνει κάθε πελάτης πριν από τη συνεργασία.',
};

const en: ConsultantCopy = {
  metaTitle: 'SEO Consultant | George K, SEO Specialist',
  metaDescription: `George K, SEO consultant and SEO specialist in Athens with ${years} years on Greek tourism sites and e-shops. Consulting, SEO audits and team coaching.`,
  primaryKeyword: 'SEO consultant',
  crumb: 'SEO consultant',
  pillTag: 'Free',
  pill: 'Start with a free audit of your website',
  h1: { before: 'George K:', accent: 'SEO consultant', after: 'for Greek businesses' },
  lead: `I’m George K, founder of AnotherSEOGuru and an SEO consultant based in Athens. With ${years} years of experience and more than ${PROJECTS_DELIVERED} projects delivered, I work mostly with hotels, car rentals, tourism businesses and e-shops, from the audit to the strategy.`,
  leadExtra: `If you want an SEO specialist who looks at your site personally and tells you what to fix first, start with the free audit. We reply within ${RESPONSE_HOURS} hours.`,
  stats: [
    { value: years, label: 'Years in SEO' },
    { value: projects, label: 'Projects delivered' },
    { value: 'Athens', label: 'Based in' },
    { value: 'EN / EL', label: 'Working languages' },
  ],
  role: {
    eyebrow: 'The role',
    title: 'What an SEO consultant does',
    body: 'An SEO consultant (or SEO specialist) finds out why a website isn’t showing up on Google and what would bring it more customers, then turns that into a prioritised plan. Decisions come from your own Search Console data, not a generic recipe, and the consultant helps you or your team carry them out.',
    bullets: [
      'Technical audit: indexing, speed, structure and errors',
      'Keyword research mapped to the right pages',
      'Content and internal linking strategy',
      'Local SEO and Google Business Profile',
      'Visibility in answers from ChatGPT, Gemini and Google AI',
      'Guidance for developers and content teams',
    ],
  },
  modes: {
    eyebrow: 'Working together',
    title: 'Consulting, an audit or a full engagement?',
    intro: 'Three ways to work together. The right one mostly depends on whether you have your own team to implement the changes.',
    cards: [
      {
        eyebrow: 'You have a team',
        title: 'SEO consulting',
        text: 'For businesses with their own developer or marketing lead. Working sessions, answers to specific questions (a site migration, a traffic drop, a new market) and review of what your team ships.',
      },
      {
        eyebrow: 'One-off',
        title: 'SEO audit',
        text: 'A full technical audit of your website with a prioritised list of fixes, so you know what to fix first and why. Implement it yourself or hand it to us.',
        link: { href: '/services/seo-audits', label: 'What the SEO audit covers' },
      },
      {
        eyebrow: 'Monthly',
        title: 'Full engagement',
        text: `We take on SEO end to end: technical fixes, content, local SEO and a monthly report on clicks and enquiries. Minimum term ${SEO_MIN_TERM_MONTHS} months.`,
        link: { href: '/seo-services', label: 'See our SEO services' },
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'Experience and projects',
    intro: `${years} years in SEO and more than ${PROJECTS_DELIVERED} projects: websites, e-shops and SEO for hotels, car rentals, tourism and local businesses, from the Cyclades and Crete to Athens. A few of the projects that are live today:`,
    all: 'See all our work',
  },
  versus: {
    eyebrow: 'Choosing',
    title: 'SEO consultant or SEO company?',
    body: 'An independent consultant gives you direct contact with the person doing the work, but usually has no team to implement it. A company has a team, but you often talk to an account manager rather than the specialist. At AnotherSEOGuru you get both: a consultant for the strategy and a team to ship it, as an [SEO agency](/) with full [SEO services](/seo-services).',
    consultantTitle: 'A consultant is enough when',
    consultantItems: [
      'you have a developer or a marketing team',
      'you want a second opinion before a redesign or migration',
      'you need a plan, not execution',
    ],
    companyTitle: 'You need a company when',
    companyItems: [
      'there is nobody to hand the fixes to',
      'you want technical SEO, content and local SEO together',
      'you want a monthly report and one owner for the result',
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'SEO consulting prices',
    intro: 'The same prices as our price list, excluding VAT.',
    cards: [
      {
        eyebrow: 'Consulting',
        title: 'Quoted per project',
        text: 'We quote after looking at your website in the free audit, so you only pay for what you need.',
      },
      {
        eyebrow: 'SEO audit',
        title: 'from {{ADDON_TECHNICAL_AUDIT}} + VAT',
        text: 'A technical audit with a list of fixes. The advanced audit starts from {{ADDON_ADVANCED_AUDIT}} + VAT.',
      },
      {
        eyebrow: 'Full engagement',
        title: 'from {{ENTRY_SEO}}/mo + VAT',
        text: `A monthly SEO package, with a minimum term of ${SEO_MIN_TERM_MONTHS} months.`,
      },
    ],
    all: 'See all prices and packages',
  },
  faqTitle: 'SEO consultant FAQ',
  faqs: [
    {
      question: 'What does an SEO specialist do?',
      answer:
        'An SEO specialist finds out what is stopping a website from showing up on Google and what would bring it more customers. They audit the technical setup, research keywords, plan content and internal links, work on local SEO and measure results in Search Console. As a consultant, they also set the priorities, so you know what to do first.',
    },
    {
      question: 'How much does an SEO consultant charge?',
      answer:
        'It depends on what you need. At AnotherSEOGuru a technical SEO audit starts from {{ADDON_TECHNICAL_AUDIT}} + VAT and monthly SEO from {{ENTRY_SEO}} a month + VAT. Consulting is quoted per project, after we look at your website in the free audit. All prices are on the pricing page.',
    },
    {
      question: 'What is the difference between an SEO consultant and an SEO company?',
      answer:
        'An SEO consultant gives strategy and guidance, while an SEO company also does the implementation. If you have your own team, a consultant is usually enough. If not, you need someone to make the fixes too. At AnotherSEOGuru you can start with consulting or an audit and move to a full engagement whenever you want.',
    },
    {
      question: 'Do you work with businesses outside Athens?',
      answer:
        'Yes. We are based in Athens, but many of our projects are in the Cyclades, Crete and elsewhere in Greece and abroad. We work online, in Greek or English.',
    },
    {
      question: 'How do we start?',
      answer: `With a free audit of your website. Send us the address and within ${RESPONSE_HOURS} hours you get the main issues and what to fix first. From there you decide whether you want consulting, an audit or a full engagement.`,
    },
  ],
  relatedTitle: 'Related pages',
  cta: {
    title: 'Let’s look at your website together',
    body: `Start with a free SEO audit: within ${RESPONSE_HOURS} hours you know what to fix first.`,
  },
  personDescription: `SEO consultant and founder of AnotherSEOGuru, based in Athens, with ${years} years of experience and ${projects} projects delivered.`,
  visualCaption: 'A sample SEO audit, the kind every client gets before we start.',
};

export function getConsultantCopy(locale: SiteLocale): ConsultantCopy {
  return locale === 'el' ? el : en;
}
