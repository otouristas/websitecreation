import type { FAQ } from '@/lib/types/page';
import type { SiteLocale } from '@/lib/i18n/locale';
import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';

/**
 * Copy for the agency pricing page.
 *
 * Lives here so /en/pricing and /el/pricing stay the same page: same sections,
 * same FAQ set, same facts. Prices are `{{TOKEN}}` placeholders resolved at
 * render against `src/data/pricing.ts`, so the visible copy and the FAQPage
 * schema cannot drift from the package cards.
 *
 * This page owns commercial cost queries (πόσο κοστίζει το SEO). Do not add a
 * second price URL for that intent.
 */

export interface PricingDeterminant {
  readonly title: string;
  readonly body: string;
}

export interface PricingCompareRow {
  readonly label: string;
  readonly foundations: string;
  readonly growth: string;
  readonly authority: string;
}

export interface PricingPageCopy {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly h1: string;
  readonly heroLead: string;
  readonly heroNote: string;
  readonly cost: {
    readonly eyebrow: string;
    readonly title: string;
    readonly answer: string;
    readonly websiteBand: string;
    readonly determinantsTitle: string;
    readonly determinantsIntro: string;
    readonly determinants: readonly PricingDeterminant[];
  };
  readonly compare: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly rows: readonly PricingCompareRow[];
    readonly footnote: string;
  };
  readonly faqTitle: string;
  readonly faqs: readonly FAQ[];
  readonly proof: {
    readonly title: string;
    readonly body: string;
    readonly hotels: string;
    readonly rentals: string;
    readonly work: string;
    readonly services: string;
  };
}

const el: PricingPageCopy = {
  metaTitle: 'Πόσο κοστίζει το SEO',
  metaDescription:
    'Πόσο κοστίζει το SEO στην Ελλάδα: μηνιαία πακέτα από {{ENTRY_SEO}} έως {{SEO_AUTHORITY}} (προ ΦΠΑ 24%). Ιστοσελίδα από {{ENTRY_WEBSITE}} έως {{WEBSITE_BUSINESS}}+. Χωρίς εγγυήσεις θέσης. Δείτε πακέτα.',
  primaryKeyword: 'πόσο κοστίζει το seo',
  h1: 'Τιμές SEO και κατασκευής ιστοσελίδων',
  heroLead:
    'Οι τιμές μας δεν βασίζονται στο πόσο φθηνά μπορούμε να παραδώσουμε μια λίστα εργασιών. Βασίζονται στον χρόνο, την τεχνική εργασία, την έρευνα, το περιεχόμενο και τη στρατηγική που απαιτείται για πραγματική οργανική ανάπτυξη.',
  heroNote: 'Τα πακέτα ορίζουν το αρχικό scope. Η στρατηγική προσαρμόζεται στο έργο.',
  cost: {
    eyebrow: 'Κόστος στην Ελλάδα',
    title: 'Πόσο κοστίζει το SEO στην Ελλάδα',
    answer:
      'Στην Ελλάδα ένα σοβαρό μηνιαίο SEO ξεκινά από {{ENTRY_SEO}} και φτάνει {{SEO_AUTHORITY}} τον μήνα, προ ΦΠΑ 24%. Στην AnotherSEOGuru αυτό αντιστοιχεί στα πακέτα Foundations, Growth και Authority: η τιμή ακολουθεί το εύρος της εργασίας, όχι έναν αριθμό λέξεων-κλειδιών.',
    websiteBand:
      'Η κατασκευή ιστοσελίδας ξεκινά από {{ENTRY_WEBSITE}} και φτάνει {{WEBSITE_BUSINESS}}+ για e-shop, πολυγλωσσικά ή πολλαπλών καταλυμάτων έργα. Κάθε τιμή παρακάτω εμφανίζεται καθαρή και με ΦΠΑ.',
    determinantsTitle: 'Τι καθορίζει την τιμή',
    determinantsIntro:
      'Δύο επιχειρήσεις στον ίδιο κλάδο σπάνια χρειάζονται την ίδια εργασία. Η προσφορά ακολουθεί τέσσερα πράγματα που φαίνονται στα δεδομένα, όχι μια λίστα λέξεων-κλειδιών.',
    determinants: [
      {
        title: 'Ανταγωνισμός στην αναζήτηση',
        body: 'Πόσες σοβαρές επιχειρήσεις στοχεύουν τις ίδιες εμπορικές αναζητήσεις, και πόσο ισχυρό είναι ήδη το αποτύπωμά τους. Σε τουρισμό αιχμής αυτό αλλάζει το scope πιο γρήγορα από οτιδήποτε άλλο.',
      },
      {
        title: 'Τεχνική κατάσταση και αρχιτεκτονική',
        body: 'Αν η Google δεν μπορεί να διαβάσει ή να ευρετηριάσει τις σελίδες που πουλάνε, το περιεχόμενο δεν φτάνει. Τα θεμέλια κοστίζουν λιγότερο στον σχεδιασμό παρά όταν διορθώνονται μετά.',
      },
      {
        title: 'Όγκος και βάθος περιεχομένου',
        body: 'Πόσες εμπορικές ομάδες αναζητήσεων χρειάζονται δική τους σελίδα, και πόσο περιεχόμενο πρέπει να γραφτεί για να τις καλύψει χωρίς να ανταγωνίζονται μεταξύ τους.',
      },
      {
        title: 'Αγορά: τοπική, πανελλαδική ή διεθνής',
        body: 'Ένα κατάλυμα σε ένα νησί και ένα e-shop με πολλές γλώσσες δεν είναι το ίδιο πρόγραμμα. Η κάλυψη αγοράς ορίζει ώρες, περιεχόμενο και εργασία authority.',
      },
    ],
  },
  compare: {
    eyebrow: 'Πακέτα SEO',
    title: 'Foundations, Growth ή Authority',
    intro:
      'Τα τρία πακέτα ορίζουν scope, όχι «Χ λέξεις-κλειδιά τον μήνα». Διαλέγετε το εύρος εργασίας που σηκώνει ο ανταγωνισμός σας. Αναλυτικά παραδοτέα στη σελίδα υπηρεσιών SEO.',
    rows: [
      {
        label: 'Για ποιον',
        foundations: 'Το ελάχιστο επίπεδο στο οποίο γίνεται σοβαρή δουλειά',
        growth: 'Συστηματική οργανική ανάπτυξη',
        authority: 'Ανταγωνιστικές, e-commerce, πανελλαδικές ή διεθνείς αγορές',
      },
      {
        label: 'Τεχνικά',
        foundations: 'Έλεγχος και ιεραρχημένο πλάνο διορθώσεων',
        growth: 'Συνεχής τεχνική εργασία πάνω στα θεμέλια',
        authority: 'Πιο σύνθετο τεχνικό scope, μαζί με μετατροπές',
      },
      {
        label: 'Περιεχόμενο',
        foundations: 'On-page στις σελίδες που μπορούν να φέρουν πελάτες',
        growth: 'Πρόγραμμα περιεχομένου με βάση πραγματική ζήτηση',
        authority: 'Μεγαλύτερο θεματικό βάθος και περισσότερες σελίδες',
      },
      {
        label: 'Τοπικά σήματα',
        foundations: 'Google Business Profile και τοπικά σήματα',
        growth: 'Τοπικά σήματα και ευρύτερη θεματική κάλυψη',
        authority: 'Τοπικά σήματα μέσα σε πανελλαδικό ή διεθνές πρόγραμμα',
      },
      {
        label: 'Authority',
        foundations: 'Βάση, χωρίς digital PR',
        growth: 'Ανάλυση κενών σε backlinks',
        authority: 'Στρατηγική digital PR και σχετικών συνδέσμων',
      },
      {
        label: 'GEO / AEO',
        foundations: 'Δεν περιλαμβάνεται ως ξεχωριστό πρόγραμμα',
        growth: 'Εργασία για μηχανές απαντήσεων AI',
        authority: 'GEO / AEO μέσα σε ευρύτερο πρόγραμμα',
      },
      {
        label: 'Αναφορά',
        foundations: 'Μηνιαία αναφορά στους εμπορικούς στόχους',
        growth: 'Μηνιαία αναφορά και τηλεδιάσκεψη στρατηγικής',
        authority: 'Ανασκόπηση απόδοσης κάθε δεκαπενθήμερο',
      },
    ],
    footnote: `Οι τιμές είναι καθαρές, προ ΦΠΑ 24%. Η τελική τιμή με ΦΠΑ εμφανίζεται σε κάθε κάρτα πακέτου. Ελάχιστη διάρκεια συνεργασίας SEO: ${SEO_MIN_TERM_MONTHS} μήνες.`,
  },
  faqTitle: 'Συχνές ερωτήσεις για το κόστος SEO',
  faqs: [
    {
      question: 'Πόσο κοστίζει το SEO στην Ελλάδα;',
      answer:
        'Στην Ελλάδα ένα σοβαρό μηνιαίο SEO ξεκινά από {{ENTRY_SEO}} και φτάνει {{SEO_AUTHORITY}} τον μήνα, προ ΦΠΑ 24%. Στην AnotherSEOGuru τα πακέτα είναι Foundations, Growth και Authority. Η τιμή ακολουθεί ανταγωνισμό, τεχνικά και περιεχόμενο, όχι αριθμό λέξεων-κλειδιών. Η κατασκευή ιστοσελίδας ξεκινά από {{ENTRY_WEBSITE}} έως {{WEBSITE_BUSINESS}}+.',
    },
    {
      question: 'Τι καθορίζει την τιμή του SEO;',
      answer:
        'Τέσσερα πράγματα: ο ανταγωνισμός στις εμπορικές αναζητήσεις, η τεχνική κατάσταση και η αρχιτεκτονική του site, ο όγκος περιεχομένου που χρειάζεται πραγματική κάλυψη, και αν η αγορά είναι τοπική, πανελλαδική ή διεθνής. Γι’ αυτό δύο ξενοδοχεία ή δύο rent-a-car δεν παίρνουν την ίδια προσφορά.',
    },
    {
      question: 'Πόσο κοστίζει μια επαγγελματική ιστοσελίδα;',
      answer:
        'Τα πακέτα κατασκευής ξεκινούν από {{ENTRY_WEBSITE}} (Starter) και φτάνουν {{WEBSITE_BUSINESS}}+ (Business) για e-shop, πολλές γλώσσες ή πολλά καταλύματα. Το Professional ({{WEBSITE_PRO}}) είναι το σύνηθες σημείο για ξενοδοχεία και τουριστικές επιχειρήσεις. Όλες οι τιμές είναι προ ΦΠΑ 24%.',
    },
    {
      question: 'Γιατί δεν προσφέρετε SEO με 100 ευρώ τον μήνα;',
      answer:
        'Σε αυτό το επίπεδο δεν υπάρχει χρόνος για έρευνα, τεχνική εργασία, περιεχόμενο και παρακολούθηση. Μια σοβαρή συνεργασία SEO απαιτεί ανάλυση δεδομένων, υλοποίηση και συνεχή προσαρμογή. Προτιμούμε να πούμε ότι δεν ταιριάζουμε, παρά να χρεώσουμε για κάτι που δεν πρόκειται να αποδώσει.',
    },
    {
      question: 'Εγγυάστε την πρώτη θέση στη Google;',
      answer:
        'Όχι. Κανένα agency δεν ελέγχει τα συστήματα κατάταξης της Google, οπότε καμία εγγύηση θέσης δεν είναι βάσιμη. Δουλεύουμε πάνω σε ό,τι ελέγχεται: τεχνική κατάσταση, περιεχόμενο, αρχιτεκτονική, authority και μετατροπές.',
    },
    {
      question: 'Σε πόσο καιρό θα δω αποτελέσματα;',
      answer:
        'Ενδεικτικά: 0 έως 3 μήνες θεμέλια, 3 έως 6 μήνες πιθανή ανάπτυξη, 6 έως 12 και πλέον μήνες σύνθετη απόδοση. Ο χρόνος εξαρτάται από τον ανταγωνισμό, την κατάσταση του site, το authority και την ταχύτητα υλοποίησης. Πρόκειται για φάσεις, όχι για εγγυήσεις.',
    },
    {
      question: 'Χρειάζεται συμβόλαιο;',
      answer: `Για τα μηνιαία πακέτα SEO ισχύει ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μηνών και στη συνέχεια η συνεργασία συνεχίζεται μηνιαία. Οι πρώτοι μήνες πηγαίνουν σε θεμέλια που αποδίδουν αργότερα. Τα έργα κατασκευής ιστοσελίδας τιμολογούνται ανά έργο.`,
    },
    {
      question: 'Περιλαμβάνεται ο ΦΠΑ στις τιμές;',
      answer:
        'Οι αναγραφόμενες επαγγελματικές τιμές εμφανίζονται προ ΦΠΑ. Προστίθεται ΦΠΑ 24%, όπου εφαρμόζεται. Σε κάθε πακέτο εμφανίζεται και η τελική τιμή με ΦΠΑ.',
    },
    {
      question: 'Ποια είναι η διαφορά Foundations, Growth και Authority;',
      answer:
        'Το Foundations είναι το ελάχιστο σοβαρό scope: τεχνικά, on-page στις σελίδες που πουλάνε, Google Business Profile και μηνιαία αναφορά. Το Growth προσθέτει πρόγραμμα περιεχομένου, ανάλυση authority και εργασία GEO/AEO. Το Authority καλύπτει ανταγωνιστικές, e-commerce ή διεθνείς αγορές, με digital PR και ανασκόπηση κάθε δεκαπενθήμερο. Δεν πουλάμε αριθμό λέξεων-κλειδιών.',
    },
  ],
  proof: {
    title: 'Τουρισμός, όχι γενικές υποσχέσεις',
    body: 'Δουλεύουμε κυρίως με ξενοδοχεία, ενοικιάσεις αυτοκινήτων και περιοδείες στην Ελλάδα. Δείχνουμε τι χτίσαμε, όχι ποσοστά που δεν τεκμηριώνονται.',
    hotels: 'Λύσεις για ξενοδοχεία',
    rentals: 'Ιστοσελίδες rent-a-car',
    work: 'Έργα και μελέτες περίπτωσης',
    services: 'Τι περιλαμβάνει μια υπηρεσία SEO',
  },
};

const en: PricingPageCopy = {
  metaTitle: 'How much SEO costs in Greece',
  metaDescription:
    'How much does SEO cost in Greece? Monthly retainers from {{ENTRY_SEO}} to {{SEO_AUTHORITY}} (ex VAT). Websites from {{ENTRY_WEBSITE}} to {{WEBSITE_BUSINESS}}+. No ranking guarantees. See packages.',
  primaryKeyword: 'how much does SEO cost',
  h1: 'SEO and website pricing',
  heroLead:
    'Our pricing is not based on how cheaply we can deliver a task list. It reflects the time, technical work, research, content and strategy required to produce real organic growth.',
  heroNote: 'Packages define the initial scope. The strategy adapts to the project.',
  cost: {
    eyebrow: 'Cost in Greece',
    title: 'How much does SEO cost in Greece',
    answer:
      'In Greece a serious monthly SEO programme starts at {{ENTRY_SEO}} and runs to {{SEO_AUTHORITY}} a month, excluding 24% VAT. At AnotherSEOGuru that is Foundations, Growth and Authority: price follows the scope of the work, not a keyword count.',
    websiteBand:
      'Website projects start at {{ENTRY_WEBSITE}} and reach {{WEBSITE_BUSINESS}}+ for e-commerce, multilingual or multi-property work. Every figure below is shown net and including VAT.',
    determinantsTitle: 'What determines the price',
    determinantsIntro:
      'Two businesses in the same sector rarely need the same work. A quote follows four things visible in the data, not a keyword list.',
    determinants: [
      {
        title: 'Search competition',
        body: 'How many serious businesses already target the same commercial searches, and how strong their footprint is. In peak-season tourism that changes scope faster than anything else.',
      },
      {
        title: 'Technical condition and architecture',
        body: 'If Google cannot read or index the pages that sell, content never arrives. Foundations cost less at design time than when they are repaired afterwards.',
      },
      {
        title: 'Content volume and depth',
        body: 'How many commercial search clusters need their own page, and how much content must be written so those pages do not compete with each other.',
      },
      {
        title: 'Market: local, national or international',
        body: 'A single-island stay and a multilingual e-shop are not the same programme. Market coverage sets hours, content and authority work.',
      },
    ],
  },
  compare: {
    eyebrow: 'SEO packages',
    title: 'Foundations, Growth or Authority',
    intro:
      'The three packages define scope, not “X keywords a month”. You pick the breadth of work your competition requires. Full deliverables sit on the SEO services page.',
    rows: [
      {
        label: 'Best for',
        foundations: 'The minimum level at which serious work is possible',
        growth: 'Systematic organic growth',
        authority: 'Competitive, e-commerce, national or international markets',
      },
      {
        label: 'Technical',
        foundations: 'Audit and a prioritised fix roadmap',
        growth: 'Ongoing technical work on top of the foundations',
        authority: 'Heavier technical scope, plus conversion work',
      },
      {
        label: 'Content',
        foundations: 'On-page work on the pages that can convert',
        growth: 'A content programme against real search demand',
        authority: 'Larger topical depth and more pages',
      },
      {
        label: 'Local signals',
        foundations: 'Google Business Profile and local signals',
        growth: 'Local signals plus broader topical coverage',
        authority: 'Local signals inside a national or international programme',
      },
      {
        label: 'Authority',
        foundations: 'A base, without digital PR',
        growth: 'Backlink gap analysis',
        authority: 'Digital PR and relevant link acquisition',
      },
      {
        label: 'GEO / AEO',
        foundations: 'Not a separate programme at this level',
        growth: 'Work for AI answer engines',
        authority: 'GEO / AEO inside a broader programme',
      },
      {
        label: 'Reporting',
        foundations: 'Monthly report tied to commercial goals',
        growth: 'Monthly report and a strategy call',
        authority: 'Fortnightly performance review',
      },
    ],
    footnote: `Prices are net of 24% Greek VAT. The gross figure is shown on every package card. Minimum SEO term: ${SEO_MIN_TERM_MONTHS} months.`,
  },
  faqTitle: 'Pricing questions',
  faqs: [
    {
      question: 'How much does SEO cost in Greece?',
      answer:
        'In Greece a serious monthly SEO programme starts at {{ENTRY_SEO}} and runs to {{SEO_AUTHORITY}} a month, excluding 24% VAT. At AnotherSEOGuru the packages are Foundations, Growth and Authority. Price follows competition, technical work and content, not a keyword count. Website projects start at {{ENTRY_WEBSITE}} and reach {{WEBSITE_BUSINESS}}+.',
    },
    {
      question: 'What determines the SEO price?',
      answer:
        'Four things: competition on the commercial searches, the technical condition and architecture of the site, the volume of content needed for real coverage, and whether the market is local, national or international. That is why two hotels or two rent-a-car businesses do not get the same quote.',
    },
    {
      question: 'How much does a professional website cost?',
      answer:
        'Website packages start at {{ENTRY_WEBSITE}} (Starter) and reach {{WEBSITE_BUSINESS}}+ (Business) for e-commerce, multiple languages or multiple properties. Professional ({{WEBSITE_PRO}}) is the usual point for hotels and tourism businesses. All prices exclude 24% VAT.',
    },
    {
      question: 'Why do you not offer SEO for 100 euro a month?',
      answer:
        'At that level there is no time for research, technical work, content and monitoring. Serious SEO requires data analysis, implementation and continuous adjustment. We would rather tell you we are not a fit than charge for something that will not work.',
    },
    {
      question: 'Do you guarantee first position on Google?',
      answer:
        'No. No agency controls Google’s ranking systems, so no position guarantee is legitimate. We work on what can actually be influenced: technical condition, content, architecture, authority and conversion.',
    },
    {
      question: 'How long until I see results?',
      answer:
        'Indicatively: 0 to 3 months foundations, 3 to 6 months potential growth, 6 to 12 and more months compounding. Time depends on competition, the state of the site, authority and how quickly recommendations get implemented. These are phases, not guarantees.',
    },
    {
      question: 'Is a contract required?',
      answer: `Monthly SEO engagements carry a ${SEO_MIN_TERM_MONTHS} month minimum term, then continue month to month. The first months go into foundations that pay off later. Website projects are quoted per project.`,
    },
    {
      question: 'Is VAT included in the prices?',
      answer:
        'Listed professional prices are shown excluding VAT. Greek VAT of 24% is added where applicable. Every package also displays the final price including VAT.',
    },
    {
      question: 'What is the difference between Foundations, Growth and Authority?',
      answer:
        'Foundations is the minimum serious scope: technical work, on-page on the pages that sell, Google Business Profile and a monthly report. Growth adds a content programme, authority analysis and GEO/AEO. Authority covers competitive, e-commerce or international markets, with digital PR and a fortnightly review. We do not sell a keyword count.',
    },
  ],
  proof: {
    title: 'Tourism work, not generic promises',
    body: 'Most of the work is hotels, car rental and tours in Greece. We show what we built, not percentages we cannot evidence.',
    hotels: 'Hotel websites and SEO',
    rentals: 'Rent-a-car websites',
    work: 'Portfolio and case studies',
    services: 'What an SEO service includes',
  },
};

export function getPricingPageCopy(locale: SiteLocale): PricingPageCopy {
  return locale === 'el' ? el : en;
}
