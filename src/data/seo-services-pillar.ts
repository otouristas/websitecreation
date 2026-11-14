import type { SiteLocale } from '@/lib/i18n/locale';
import type { ServiceTopicEl } from '@/data/services-i18n';

/**
 * Copy for the SEO-services commercial pillar.
 *
 * This page exists because nothing owned the intent. The repo's own Ahrefs
 * research (docs/keyword-research/greek-seo-cluster-2026-07-23.md) puts
 * «υπηρεσίες SEO» at 400/mo, «εταιρεία SEO» at 300 and «προώθηση ιστοσελίδων
 * seo» at 200, all with KD 1-2 - and mapped every one of them at either
 * `/el/services`, a CollectionPage that lists twelve services, or
 * `/el/services/seo-audits`, which sells an audit rather than a retainer.
 * Neither is the page a business owner searching "εταιρεία SEO" wants.
 *
 * Everything factual here traces to something in the repo: prices to
 * `src/data/pricing.ts`, the minimum term to `src/data/company-facts.ts`,
 * proof to `src/data/portfolio.ts`. No metric is claimed for a client, because
 * none is recorded for any of them.
 */

export interface PillarFaq {
  readonly question: string;
  readonly answer: string;
}

export interface PillarSection {
  readonly title: string;
  readonly body: string;
  readonly bullets?: readonly string[];
  /** Existing service URL, locale-prefixed at render. */
  readonly href?: string;
}

export interface TourismChip {
  readonly label: string;
  readonly line: string;
  /** Portfolio slug; the page falls back to /work when the project is missing. */
  readonly slug: string;
}

export interface SeoServicesPillarCopy {
  readonly eyebrow: string;
  readonly h1: string;
  /** The answer-first paragraph, directly under the H1. */
  readonly answer: string;
  /** One-sentence GSC platform + tourism ICP, above the fold. */
  readonly answerExtra: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly includes: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly process: { readonly title: string; readonly intro: string; readonly steps: readonly PillarSection[] };
  readonly tourism: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly chips: readonly TourismChip[];
    readonly portfolioLabel: string;
  };
  readonly pricing: { readonly title: string; readonly intro: string; readonly note: string; readonly cta: string };
  readonly choosing: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly notForYou: { readonly title: string; readonly items: readonly string[] };
  readonly proof: { readonly title: string; readonly intro: string; readonly caveat: string };
  readonly faqTitle: string;
  readonly faqs: readonly PillarFaq[];
  readonly cta: {
    readonly title: string;
    readonly body: string;
    readonly primary: string;
    readonly secondary: string;
    readonly whatsapp: string;
  };
  readonly relatedTitle: string;
  /**
   * Greek-only H2 topic blocks the keyword map assigns to this page
   * (βελτιστοποίηση ιστοσελίδας, SEO ή διαφήμιση, SEO για e-shop). Paragraphs
   * may carry `[anchor](/path)` links.
   */
  readonly topics?: readonly ServiceTopicEl[];
  /** Greek-only: H2 and intro (with inline links) above the city links. */
  readonly cities?: { readonly title: string; readonly intro: string };
}

const el: SeoServicesPillarCopy = {
  eyebrow: 'Υπηρεσίες SEO',
  h1: 'Υπηρεσίες SEO και προώθηση ιστοσελίδων στη Google',
  answer:
    'Αν θέλετε περισσότερα αιτήματα από τη Google, ξεκινάμε από τις αναζητήσεις που κάνουν ήδη οι πελάτες σας. Βρίσκουμε ποια σελίδα χρειάζεται ο καθένας, διορθώνουμε τεχνικά εμπόδια και παρακολουθούμε κλικ και αιτήματα. Η μηνιαία συνεργασία ξεκινά από {{ENTRY_SEO}}.',
  answerExtra:
    'Δουλεύουμε κυρίως με ξενοδοχεία, ενοικίαση αυτοκινήτου και εκδρομές στην Ελλάδα, πάνω στη δική μας πλατφόρμα που συνδέεται στο Google Search Console.',
  metaTitle: 'Υπηρεσίες SEO & Προώθηση Ιστοσελίδων | AnotherSEOGuru',
  metaDescription:
    'Υπηρεσίες SEO για επιχειρήσεις σε όλη την Ελλάδα: τεχνικό SEO, περιεχόμενο, τοπικό SEO και προώθηση στη Google, με μέτρηση σε αιτήματα. Ζητήστε έλεγχο.',
  primaryKeyword: 'υπηρεσίες SEO',
  includes: {
    title: 'Τι περιλαμβάνουν οι υπηρεσίες SEO κάθε μήνα',
    intro:
      'Κάθε μήνα συμφωνούμε ποιες από τις παρακάτω εργασίες προέχουν για τη δική σας ιστοσελίδα.',
    items: [
      {
        title: 'Τεχνικό SEO',
        href: '/seo-services/technical',
        body:
          'Ελέγχουμε αν η Google μπορεί να βρει και να καταχωρίσει τις βασικές σελίδες σας. Αν, για παράδειγμα, επιλέγει λάθος έκδοση μιας σελίδας υπηρεσίας, εξετάζουμε τις διευθύνσεις, το canonical και τους εσωτερικούς συνδέσμους. Σας δείχνουμε το σημείο που χρειάζεται διόρθωση.',
      },
      {
        title: 'Αντιστοίχιση λέξεων-κλειδιών σε σελίδες',
        href: '/seo-services/strategy',
        body:
          'Βλέπουμε στο Search Console ποια σελίδα εμφανίζεται για κάθε βασική αναζήτηση. Αν δύο σελίδες απαντούν στην ίδια ερώτηση, ελέγχουμε αν έχουν διαφορετικό κοινό ή αν μία πλήρης σελίδα θα εξυπηρετούσε καλύτερα τον πελάτη.',
      },
      {
        title: 'Περιεχόμενο με εμπορική πρόθεση',
        href: '/seo-services/on-page',
        body:
          'Σελίδες υπηρεσιών, σελίδες περιοχής και άρθρα που απαντούν σε ερωτήσεις που κάνει κάποιος λίγο πριν ζητήσει προσφορά. Γράφουμε στα ελληνικά, για την αγορά σας, με παραδείγματα από τον κλάδο σας.',
      },
      {
        title: 'Τοπικό SEO',
        href: '/services/local-seo',
        body:
          'Google Business Profile, συνέπεια στοιχείων επικοινωνίας, κριτικές και καταχωρήσεις, σελίδες περιοχής όπου υπάρχει πραγματική τοπική πρόθεση. Για επιχειρήσεις με φυσικό σημείο ή περιοχή εξυπηρέτησης, εδώ κρίνεται το τηλεφώνημα.',
      },
      {
        title: 'GEO και AEO',
        href: '/services/ai-visibility',
        body:
          'Επιλέγουμε ερωτήσεις που ακούτε από πελάτες, όπως «Τι καλύπτει η ασφάλεια;». Ελέγχουμε αν δίνετε πλήρη απάντηση στη σελίδα σας, τι λένε οι υπηρεσίες AI και σε ποια πηγή παραπέμπουν. Καταγράφουμε τυχόν λάθη και τις πληροφορίες που μπορείτε να διορθώσετε.',
      },
    ],
  },
  process: {
    title: 'Πώς δουλεύουμε',
    intro:
      'Το πρώτο τρίμηνο είναι διόρθωση και βάση. Από εκεί και πέρα η δουλειά είναι επαναλαμβανόμενη και μετρήσιμη.',
    steps: [
      {
        title: 'Εβδομάδες 1-2: έλεγχος και προτεραιότητες',
        body:
          'Τεχνικός έλεγχος, ανάλυση Search Console, χάρτης λέξεων-κλειδιών ανά σελίδα και σύγκριση με τους ανταγωνιστές που πραγματικά εμφανίζονται. Παραδίδουμε ιεραρχημένο πλάνο, όχι κατάλογο σφαλμάτων.',
      },
      {
        title: 'Μήνες 1-3: θεμέλια',
        body:
          'Διορθώνουμε πρώτα όσα εμποδίζουν την πρόσβαση ή την ευρετηρίαση. Έπειτα δουλεύουμε στις συμφωνημένες σελίδες υπηρεσιών και, όπου χρειάζεται, στο Google Business Profile. Σημειώνουμε πότε δημοσιεύτηκε κάθε αλλαγή.',
      },
      {
        title: 'Μήνες 4-6: επέκταση',
        body:
          'Βρίσκουμε ερωτήσεις που μένουν αναπάντητες, ενημερώνουμε τις σχετικές σελίδες και τις συνδέουμε με την υπηρεσία που αφορά τον αναγνώστη. Αν μια ενέργεια δεν φαίνεται να βοηθά, επανεξετάζουμε την προτεραιότητά της.',
      },
      {
        title: 'Κάθε μήνα: μέτρηση',
        body:
          'Βλέπετε ποιες σελίδες αλλάξαμε, ποιες αναζητήσεις έφεραν οργανικά κλικ και πόσα αιτήματα ή κρατήσεις καταγράφηκαν, εφόσον η μέτρηση είναι ρυθμισμένη. Έτσι μπορούμε να αποφασίσουμε μαζί τι αξίζει να γίνει τον επόμενο μήνα.',
      },
    ],
  },
  tourism: {
    eyebrow: 'Τουρισμός και φιλοξενία',
    title: 'Τουρισμός, φιλοξενία και τοπικές επιχειρήσεις',
    intro:
      'Δουλεύουμε κυρίως με ξενοδοχεία, ενοικίαση αυτοκινήτου, βίλες και τοπικές επιχειρήσεις στην Ελλάδα - με έμφαση σε άμεσες κρατήσεις και αιτήματα πελατών, όχι μόνο σε επισκεψιμότητα.',
    chips: [
      {
        label: 'Discover Cyclades',
        line:
          'Δείτε πώς οργανώθηκαν οι οδηγοί ανά νησί και πώς συνδέονται με τις σχετικές σελίδες του προορισμού.',
        slug: 'discover-cyclades',
      },
      {
        label: 'Villa Olivia Clara',
        line:
          'Ιστοσελίδα για βίλα στην Κρήτη. Οι φωτογραφίες και οι πληροφορίες για τη διαμονή οδηγούν τον επισκέπτη στην απευθείας επικοινωνία.',
        slug: 'villa-olivia-clara',
      },
      {
        label: 'Aggelos Rentals',
        line:
          'Ιστοσελίδα ενοικίασης αυτοκινήτων στην Πάρο με παρουσίαση του στόλου και απευθείας επικοινωνία με την επιχείρηση.',
        slug: 'aggelos-rentals',
      },
    ],
    portfolioLabel: 'ολοκληρωμένα έργα: δείτε το portfolio',
  },
  pricing: {
    title: 'Πακέτα και τιμές SEO',
    intro:
      'Οι τιμές είναι δημόσιες. Το SEO τιμολογείται με βάση τον ανταγωνισμό, τη ζήτηση αναζήτησης και τον όγκο περιεχομένου - όχι με αριθμό λέξεων-κλειδιών.',
    note:
      'Η ελάχιστη διάρκεια συνεργασίας είναι 6 μήνες. Στη συνέχεια η συνεργασία ανανεώνεται μηνιαία. Δείτε σε κάθε πακέτο πώς υπολογίζεται ο ΦΠΑ.',
    cta: 'Δείτε αναλυτικά τα πακέτα',
  },
  choosing: {
    title: 'Πώς να αξιολογήσετε μια πρόταση SEO',
    intro:
      'Τέσσερις ερωτήσεις που ξεχωρίζουν μια σοβαρή πρόταση από μια που πουλάει ελπίδα. Τον πλήρη οδηγό θα τον βρείτε στο άρθρο «Πώς να επιλέξετε εταιρεία SEO» στο blog.',
    items: [
      {
        title: 'Τι ακριβώς γίνεται κάθε μήνα;',
        body:
          'Ζητήστε συγκεκριμένα παραδοτέα, όχι «βελτιστοποίηση». Αν η απάντηση δεν περιλαμβάνει ονόματα σελίδων, θέματα περιεχομένου και τεχνικές διορθώσεις, δεν υπάρχει πλάνο.',
      },
      {
        title: 'Πάνω σε ποια δεδομένα;',
        body:
          'Μια πρόταση χωρίς πρόσβαση στο Search Console σας είναι εικασία. Τα δικά σας κλικ, θέσεις και εμφανίσεις είναι το μόνο σημείο εκκίνησης που δεν είναι υπόθεση.',
      },
      {
        title: 'Τι υπόσχεται;',
        body:
          'Κανένα γραφείο δεν ελέγχει τα συστήματα κατάταξης της Google. Εγγύηση για «πρώτη θέση» ή για συγκεκριμένο ποσοστό αύξησης είναι σήμα κινδύνου, όχι αυτοπεποίθηση.',
      },
      {
        title: 'Τι γίνεται αν φύγετε;',
        body:
          'Το περιεχόμενο, οι λογαριασμοί και τα δεδομένα πρέπει να είναι δικά σας από την πρώτη μέρα. Αν η δουλειά ζει σε εργαλεία που δεν ελέγχετε, δεν την αγοράσατε.',
      },
    ],
  },
  notForYou: {
    title: 'Πότε δεν είμαστε η σωστή επιλογή',
    items: [
      'Θέλετε αποτελέσματα σε έναν μήνα. Το SEO δεν δουλεύει έτσι, και όποιος το υπόσχεται είτε δεν το ξέρει είτε δεν το εννοεί.',
      'Ψάχνετε το φθηνότερο πακέτο. Κάτω από ένα σημείο, η δουλειά που χωράει στο budget δεν αρκεί για να αλλάξει κάτι.',
      'Θέλετε εγγύηση θέσης. Δεν τη δίνουμε γιατί δεν μπορεί να δοθεί.',
      'Ο κλάδος σας δεν έχει ουσιαστική ζήτηση στην αναζήτηση. Θα σας το πούμε στον πρώτο έλεγχο, πριν πληρώσετε.',
    ],
  },
  proof: {
    title: 'Έργα σε ελληνική αγορά',
    intro:
      'Δουλεύουμε κυρίως με τουρισμό, φιλοξενία, ενοικίαση αυτοκινήτου και τοπικές επιχειρήσεις στην Ελλάδα.',
    caveat:
      'Δείχνουμε τι χτίσαμε και για ποιες αναζητήσεις. Δεν δημοσιεύουμε ποσοστά αύξησης για λογαριασμό πελατών: τα νούμερα που δεν μπορούμε να τεκμηριώσουμε δεν είναι απόδειξη.',
  },
  faqTitle: 'Συχνές ερωτήσεις',
  faqs: [
    {
      question: 'Τι είναι οι υπηρεσίες SEO;',
      answer:
        'Είναι η συνεχής δουλειά που κάνει μια ιστοσελίδα να εμφανίζεται ψηλότερα στα οργανικά αποτελέσματα της Google: τεχνικές διορθώσεις ώστε η Google να διαβάζει σωστά τις σελίδες, περιεχόμενο που απαντά σε αυτό που ψάχνουν οι πελάτες σας και σύνδεσμοι από άλλα sites που χτίζουν εμπιστοσύνη. Σε αντίθεση με τη διαφήμιση, δεν πληρώνετε ανά κλικ.',
    },
    {
      question: 'Πόσο κοστίζει η προώθηση ιστοσελίδας;',
      answer:
        'Τα πακέτα μας ξεκινούν από {{ENTRY_SEO}} τον μήνα καθαρά, με {{SEO_GROWTH}} και {{SEO_AUTHORITY}} για πιο ανταγωνιστικές αγορές και e-shop. Το τι χωράει σε κάθε επίπεδο εξαρτάται από τον ανταγωνισμό στον κλάδο σας και τον όγκο περιεχομένου που χρειάζεται, όχι από αριθμό λέξεων-κλειδιών.',
    },
    {
      question: 'Σε πόσο καιρό θα βγω στην πρώτη σελίδα της Google;',
      answer:
        'Από την πρώτη αναφορά βλέπετε ποιες διορθώσεις έγιναν. Το πότε αυτές θα επηρεάσουν τις εμφανίσεις, τα κλικ ή τις κρατήσεις εξαρτάται από την κατάσταση της ιστοσελίδας, τη ζήτηση και τον ανταγωνισμό. Η ελάχιστη συνεργασία είναι 6 μήνες.',
    },
    {
      question: 'Πρέπει το SEO να γίνει πριν ή μετά την κατασκευή της ιστοσελίδας;',
      answer:
        'Πριν, όσο αφορά τη δομή. Η αρχιτεκτονική σελίδων, οι διευθύνσεις URL και η αντιστοίχιση λέξεων-κλειδιών κοστίζουν ελάχιστα όταν αποφασίζονται στον σχεδιασμό και πολλά όταν διορθώνονται μετά. Η συνεχής δουλειά SEO ξεκινά μόλις βγει το site.',
    },
    {
      question: 'Μπορώ να κάνω SEO μόνος μου;',
      answer:
        'Τα βασικά ναι: Google Business Profile, καθαρά titles, σελίδες που απαντούν σε πραγματικές ερωτήσεις. Εκεί που συνήθως κολλάει μια επιχείρηση είναι στην τεχνική διάγνωση και στη συνέπεια - η δουλειά είναι μηνιαία, όχι μία φορά.',
    },
    {
      question: 'Χρειάζομαι SEO αν τρέχω Google Ads;',
      answer:
        'Αν οι διαφημίσεις σας φέρνουν πελάτες, εξετάζουμε ποιες αναζητήσεις αξίζει να καλύψετε και οργανικά. Τα δύο κανάλια μετρώνται χωριστά. Μπορούν να οδηγούν στην ίδια σελίδα, όπου ο πελάτης χρειάζεται σαφείς όρους και τρόπο επικοινωνίας.',
    },
    {
      question: 'Δίνετε εγγύηση για πρώτη θέση στη Google;',
      answer:
        'Όχι. Κανένα γραφείο δεν ελέγχει τα συστήματα κατάταξης της Google, οπότε τέτοια εγγύηση δεν μπορεί να δοθεί ειλικρινά. Αυτό που εγγυόμαστε είναι η δουλειά: συγκεκριμένα παραδοτέα κάθε μήνα και αναφορά που δείχνει τι έγινε και τι απέδωσε.',
    },
    {
      question: 'Δουλεύετε με μικρές επιχειρήσεις;',
      answer:
        'Ναι, και είναι το μεγαλύτερο μέρος της δουλειάς μας. Για μια τοπική επιχείρηση σε μία πόλη, το πακέτο Foundations συνήθως αρκεί για ουσιαστική βελτίωση. Αν ο κλάδος σας δεν έχει αρκετή ζήτηση για να το δικαιολογήσει, θα σας το πούμε στον πρώτο έλεγχο.',
    },
  ],
  cta: {
    title: 'Ξεκινήστε με έναν έλεγχο, όχι με συμβόλαιο',
    body:
      'Πείτε μας τι πουλάτε και πού. Κοιτάμε το site σας, το Search Console και τους ανταγωνιστές που πραγματικά εμφανίζονται, και επιστρέφουμε με το τι χρειάζεται και τι κοστίζει - μέσα σε 24 ώρες σε εργάσιμες ημέρες.',
    primary: 'Ζητήστε δωρεάν έλεγχο',
    secondary: 'Δείτε τιμές',
    whatsapp: 'Μιλήστε μας στο WhatsApp',
  },
  relatedTitle: 'Σχετικές σελίδες',
  topics: [
    {
      title: 'Βελτιστοποίηση ιστοσελίδας: τεχνικό SEO και on-page',
      paragraphs: [
        'Η βελτιστοποίηση ιστοσελίδας έχει δύο σκέλη. Το τεχνικό SEO φροντίζει να μπορεί η Google να βρει, να διαβάσει και να ευρετηριάσει κάθε σελίδα που πουλάει: ταχύτητα, ευρετηρίαση, canonical, structured data. Ξεκινάμε πάντα με ένα [SEO audit](/services/seo-audits), και η συνεχής τεχνική δουλειά περιγράφεται στο [τεχνικό SEO](/seo-services/technical).',
        'Το on-page SEO είναι η ίδια η σελίδα: τίτλος, επικεφαλίδες, κείμενο και εσωτερικοί σύνδεσμοι που ταιριάζουν με αυτό που ψάχνει ο πελάτης. Η υπηρεσία περιγράφεται στο [on-page SEO](/seo-services/on-page). Τα βήματα τα εξηγεί ο [οδηγός on-page SEO](/blog/on-page-seo-el).',
      ],
    },
    {
      title: 'Προώθηση ιστοσελίδων με SEO ή με διαφήμιση;',
      paragraphs: [
        'Η προώθηση ιστοσελίδων στη Google γίνεται με δύο τρόπους: πληρώνετε για κάθε κλικ στις διαφημίσεις ή κερδίζετε θέσεις στα οργανικά αποτελέσματα με SEO. Η διαφήμιση φέρνει επισκέψεις από την πρώτη μέρα και σταματά μαζί με το budget. Το SEO αργεί, αλλά οι θέσεις μένουν.',
        'Για τις περισσότερες επιχειρήσεις η απάντηση είναι συνδυασμός. Αναλυτική σύγκριση κόστους θα βρείτε στο άρθρο [SEO ή Google Ads](/blog/seo-i-google-ads).',
      ],
    },
    {
      title: 'SEO για επιχειρήσεις και e-shop',
      paragraphs: [
        'Μια τοπική επιχείρηση χρειάζεται κυρίως τοπικό SEO και καλές σελίδες υπηρεσιών. Ένα ηλεκτρονικό κατάστημα χρειάζεται κάτι άλλο: σωστές κατηγορίες, σελίδες προϊόντων που δεν ανταγωνίζονται μεταξύ τους και φίλτρα που δεν γεμίζουν την Google με διπλές σελίδες. Γι’ αυτό έχουμε ξεχωριστή υπηρεσία [SEO για eshop](/services/eshop-seo).',
        'Η AnotherSEOGuru είναι [εταιρεία SEO](/) που δουλεύει κυρίως με ξενοδοχεία, ενοικίαση αυτοκινήτου και τοπικές επιχειρήσεις, πάνω στη δική της πλατφόρμα που συνδέεται στο Google Search Console.',
      ],
    },
  ],
  cities: {
    title: 'SEO σε όλη την Ελλάδα: Αθήνα, Θεσσαλονίκη, Κρήτη, νησιά',
    intro:
      'Δουλεύουμε με επιχειρήσεις σε όλη την Ελλάδα. Δείτε για παράδειγμα το [SEO στην Αθήνα](/services/seo-audits/athens-gr), το [SEO στη Θεσσαλονίκη](/services/seo-audits/thessaloniki-gr) και το [SEO στο Ηράκλειο](/services/seo-audits/heraklion-gr), ή επιλέξτε την πόλη σας:',
  },
};

const en: SeoServicesPillarCopy = {
  eyebrow: 'SEO services',
  h1: 'SEO services for businesses in Greece',
  answer:
    'If you want more enquiries from Google, start with the searches your customers already make. We match them to pages, fix technical problems and track clicks and enquiries as the work goes live. Monthly SEO starts at {{ENTRY_SEO}}.',
  answerExtra:
    'We work mainly with hotels, rent-a-car and tours in Greece, on our own platform connected to Google Search Console.',
  metaTitle: 'SEO Greece: SEO Services for Tourism & SMEs | AnotherSEOGuru',
  metaDescription:
    'SEO services in Greece for tourism businesses, hotels and SMEs: technical SEO, local SEO and content, measured in enquiries, not reports. Request a review.',
  primaryKeyword: 'SEO Greece',
  includes: {
    title: 'What monthly SEO includes',
    intro:
      'Each month we agree which of these jobs will make the biggest difference to your site.',
    items: [
      {
        title: 'Technical SEO',
        href: '/seo-services/technical',
        body:
          'Whatever stops Google reading and indexing the pages that sell: indexation errors, canonicals, speed and Core Web Vitals, structured data that matches what is visible, internal link architecture. It comes first because everything else is built on it.',
      },
      {
        title: 'Keyword-to-page mapping',
        href: '/seo-services/strategy',
        body:
          'We check which pages appear for the searches you care about. If two overlap, we look at what customers need before deciding whether to keep them separate or combine them.',
      },
      {
        title: 'Content with commercial intent',
        href: '/seo-services/on-page',
        body:
          'Service pages, area pages and articles that answer the questions someone asks just before requesting a quote - written for your market, with examples from your sector.',
      },
      {
        title: 'Local SEO',
        href: '/services/local-seo',
        body:
          'Google Business Profile, consistent contact details, reviews and citations, and area pages where there is real local intent. For a business with premises or a service area, this is where the phone call is won.',
      },
      {
        title: 'GEO and AEO',
        href: '/services/ai-visibility',
        body:
          'We test questions customers ask, inspect the cited sources and check your own pages for gaps or errors. You see the answer we recorded and which facts you can correct.',
      },
    ],
  },
  process: {
    title: 'How the work runs',
    intro:
      'The first quarter is repair and foundations. After that the work is repeatable and measurable.',
    steps: [
      {
        title: 'Weeks 1-2: audit and priorities',
        body:
          'Technical audit, Search Console analysis, a keyword-to-page map, and a comparison against the competitors who actually appear. You get a prioritised plan, not a list of errors.',
      },
      {
        title: 'Months 1-3: foundations',
        body:
          'We fix technical obstacles, update the agreed service pages and review your Google Business Profile where relevant. We record each publication date so you can compare what followed.',
      },
      {
        title: 'Months 4-6: expansion',
        body:
          'Broader topical coverage, internal linking into the commercial pages, authority work, and steady content against real demand.',
      },
      {
        title: 'Every month: measurement',
        body:
          'A report covering organic clicks, positions on the commercial searches, and enquiries that came from organic. If something is not working it changes - it does not get repeated because it was in the plan.',
      },
    ],
  },
  tourism: {
    eyebrow: 'Tourism and hospitality',
    title: 'Tourism, hospitality and local businesses',
    intro:
      'Most of our work is hotels, rent-a-car, villas and local businesses in Greece - with the emphasis on direct bookings and enquiries, not traffic alone.',
    chips: [
      {
        label: 'Discover Cyclades',
        line:
          'See how guides are grouped by island and link visitors to the relevant destination pages.',
        slug: 'discover-cyclades',
      },
      {
        label: 'Villa Olivia Clara',
        line:
          'A Crete villa website that uses photography and accommodation details to help guests enquire directly.',
        slug: 'villa-olivia-clara',
      },
      {
        label: 'Aggelos Rentals',
        line:
          'A Paros car rental website that presents the fleet and gives visitors a direct route to the business.',
        slug: 'aggelos-rentals',
      },
    ],
    portfolioLabel: 'completed projects: see the portfolio',
  },
  pricing: {
    title: 'What it costs',
    intro:
      'Pricing is public. SEO is priced on competition, search demand and content volume - not on a keyword count.',
    note:
      'The minimum engagement is 6 months, then the service renews monthly. Each package shows how VAT applies.',
    cta: 'See the full packages',
  },
  choosing: {
    title: 'How to choose an SEO agency',
    intro: 'Four questions that separate a serious proposal from one selling hope.',
    items: [
      {
        title: 'What exactly happens each month?',
        body:
          'Ask for named deliverables, not "optimisation". If the answer does not include page names, content topics and technical fixes, there is no plan.',
      },
      {
        title: 'Based on what data?',
        body:
          'A proposal written without access to your Search Console is guesswork. Your own clicks, positions and impressions are the only starting point that is not an assumption.',
      },
      {
        title: 'What is being promised?',
        body:
          'No agency controls Google’s ranking systems. A guarantee of "position one" or a specific percentage increase is a warning sign, not confidence.',
      },
      {
        title: 'What happens if you leave?',
        body:
          'The content, the accounts and the data should be yours from day one. If the work lives in tools you do not control, you did not buy it.',
      },
    ],
  },
  notForYou: {
    title: 'When we are the wrong choice',
    items: [
      'You need results in a month. SEO does not work that way, and anyone promising it either does not know or does not mean it.',
      'You are shopping for the cheapest package. Below a certain point, the work that fits the budget is not enough to change anything.',
      'You want a guaranteed position. We do not give one because it cannot honestly be given.',
      'Your sector has no meaningful search demand. We will tell you at the first audit, before you pay.',
    ],
  },
  proof: {
    title: 'Work in the Greek market',
    intro:
      'Most of our work is tourism, hospitality, car rental and local businesses in Greece.',
    caveat:
      'We show what we built and which searches it targets. We do not publish growth percentages on clients’ behalf: numbers we cannot evidence are not proof.',
  },
  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      question: 'How much does SEO cost per month?',
      answer:
        'Our packages start at {{ENTRY_SEO}} a month net, with {{SEO_GROWTH}} and {{SEO_AUTHORITY}} for more competitive markets and e-shops. What fits in each tier depends on competition in your sector and the content volume needed, not on a keyword count.',
    },
    {
      question: 'How long does SEO take to work?',
      answer:
        'The first report shows what we changed. When impressions, clicks or bookings change depends on your starting point, demand and competition. Our minimum engagement is 6 months.',
    },
    {
      question: 'Should SEO happen before or after the website is built?',
      answer:
        'Before, as far as structure goes. Page architecture, URLs and keyword mapping cost almost nothing when decided during design and a great deal when retrofitted. The ongoing SEO work starts once the site is live.',
    },
    {
      question: 'Can I do SEO myself?',
      answer:
        'The basics, yes: Google Business Profile, clean titles, pages that answer real questions. Where businesses usually stall is technical diagnosis and consistency - the work is monthly, not a one-off.',
    },
    {
      question: 'What is the difference between SEO and Google Ads?',
      answer:
        'If ads bring customers, we look at which queries you also want to cover through organic search. We measure each channel separately. Both can lead people to the same service or product page.',
    },
    {
      question: 'Do you guarantee first position on Google?',
      answer:
        'No. No agency controls Google’s ranking systems, so that guarantee cannot honestly be given. What we guarantee is the work: named deliverables each month and a report showing what was done and what it returned.',
    },
    {
      question: 'Do you work with small businesses?',
      answer:
        'Yes, and it is most of what we do. For a local business in one city, the Foundations package is usually enough to make a material difference. If your sector does not have the demand to justify it, we will say so at the first audit.',
    },
  ],
  cta: {
    title: 'Start with an audit, not a contract',
    body:
      'Tell us what you sell and where. We will look at your site, your Search Console and the competitors who actually appear, and come back with what is needed and what it costs - within 24 working hours.',
    primary: 'Request a free audit',
    secondary: 'See pricing',
    whatsapp: 'Chat on WhatsApp',
  },
  relatedTitle: 'Related pages',
};

export function getSeoServicesPillarCopy(locale: SiteLocale): SeoServicesPillarCopy {
  return locale === 'el' ? el : en;
}
