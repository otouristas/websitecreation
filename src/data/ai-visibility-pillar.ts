import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Copy for the AI-visibility commercial hub (`/services/ai-visibility`).
 *
 * This page is the commercial owner of the GEO / AEO cluster. The site's best
 * non-brand ranking (`geo agency ελλάδα`) currently lands on a blog post, and
 * four Greek articles redefine the same terms in parallel. The hub has to be
 * deep enough to deserve that intent: what the work is, who it is for, what
 * it includes, how it is priced, and what it will not promise.
 *
 * Facts trace to the repo: GEO/AEO is listed on the Growth and Authority
 * packages in `src/data/pricing.ts`, the minimum term is
 * `SEO_MIN_TERM_MONTHS`, proof comes from `src/data/portfolio.ts`. No client
 * metric is claimed. No engine is promised to cite anyone - optimisation
 * makes content usable by an answer engine; it does not make the engine
 * quote it.
 */

export interface PillarFaq {
  readonly question: string;
  readonly answer: string;
}

export interface PillarSection {
  readonly title: string;
  readonly body: string;
}

export interface AiVisibilityPillarCopy {
  readonly eyebrow: string;
  readonly h1: string;
  /** Answer-first paragraph directly under the H1. */
  readonly answer: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly problem: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly definitions: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly includes: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly audience: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly process: { readonly title: string; readonly intro: string; readonly steps: readonly PillarSection[] };
  readonly pricing: { readonly title: string; readonly intro: string; readonly note: string; readonly cta: string };
  readonly notForYou: { readonly title: string; readonly items: readonly string[] };
  readonly proof: { readonly title: string; readonly intro: string; readonly caveat: string };
  readonly faqTitle: string;
  readonly faqs: readonly PillarFaq[];
  readonly cta: { readonly title: string; readonly body: string; readonly primary: string; readonly secondary: string };
  readonly relatedTitle: string;
}

const el: AiVisibilityPillarCopy = {
  eyebrow: 'AI SEO (GEO / AEO)',
  h1: 'AI SEO: ορατότητα στο ChatGPT, στο Gemini και στα AI Overviews',
  answer:
    'Τι απαντά το ChatGPT ή το Gemini όταν κάποιος ρωτά για την επιχείρησή σας; Ελέγχουμε τις απαντήσεις σε συγκεκριμένες ερωτήσεις, διορθώνουμε ασάφειες στις σελίδες σας και παρακολουθούμε τις αναφορές δίπλα στα κλικ της Google. Η υπηρεσία περιλαμβάνεται στα πακέτα SEO Growth και Authority, από {{SEO_GROWTH}} τον μήνα.',
  // The /el route ships the keyword-map title verbatim from services-i18n `seo`.
  metaTitle: 'AI SEO & GEO: Ορατότητα σε ChatGPT, Gemini & AI Overviews',
  metaDescription:
    'Υπηρεσίες AI SEO και GEO για ορατότητα στο ChatGPT, στο Gemini και στα AI Overviews της Google, με μηνιαία μέτρηση αναφορών. Ζητήστε έλεγχο ορατότητας.',
  primaryKeyword: 'ai seo',
  problem: {
    title: 'Τι μαθαίνει ο πελάτης πριν ανοίξει τη σελίδα σας;',
    intro:
      'Κάποιος που ψάχνει ξενοδοχείο στην Πάρο μπορεί να ρωτήσει το ChatGPT πόσο απέχει από το λιμάνι. Η απάντηση που θα πάρει μπορεί να επηρεάσει ποια καταλύματα θα κοιτάξει.',
    items: [
      {
        title: 'Πού βρήκε την πληροφορία;',
        body:
          'Το ChatGPT, το Gemini, το Perplexity και τα AI Overviews της Google μπορούν να δείξουν πηγές. Ελέγχουμε αν παραπέμπουν στη δική σας σελίδα ή σε κάποια πλατφόρμα κρατήσεων.',
      },
      {
        title: 'Τι λείπει από τη δική σας σελίδα;',
        body:
          'Η φράση «ιδανικό για οικογένειες» αφήνει τον γονιό με μια ερώτηση. Χρεώνεται επιπλέον το παιδί; Στη σελίδα του δωματίου χρειάζεται να φαίνεται η πολιτική του ξενοδοχείου.',
      },
      {
        title: 'Ποια στοιχεία μπορείτε να διορθώσετε;',
        body:
          'Αν η ιστοσελίδα και το επαγγελματικό σας προφίλ δίνουν διαφορετικό ωράριο, ξεκινάμε από εκεί. Κάθε εργαλείο AI επιλέγει τις δικές του πηγές.',
      },
    ],
  },
  definitions: {
    title: 'Ποια είναι η διαφορά ανάμεσα σε SEO, AEO και GEO;',
    intro:
      'Ας πάρουμε μια εταιρεία ενοικίασης αυτοκινήτων. Ένας ταξιδιώτης τη βρίσκει στη Google και θέλει να μάθει πόση εγγύηση χρειάζεται για την κράτηση.',
    items: [
      {
        title: 'SEO',
        body:
          'Βοηθά τη Google να βρει τη σελίδα ενοικίασης και να την εμφανίσει σε σχετικές αναζητήσεις. Στο Search Console βλέπουμε ποιες αναζητήσεις έφεραν κλικ.',
      },
      {
        title: 'AEO',
        body:
          'Το Answer Engine Optimization βοηθά τον ταξιδιώτη να βρει αμέσως την απάντηση. Γράφουμε το ποσό της εγγύησης και τους όρους δίπλα στην ερώτηση, ώστε να μπορεί να τα διαβάσει και μια μηχανή αναζήτησης.',
      },
      {
        title: 'GEO',
        body:
          'Το Generative Engine Optimization εξετάζει πώς περιγράφουν την επιχείρηση εργαλεία όπως το ChatGPT. Ελέγχουμε αν αναφέρουν τη σωστή εταιρεία, τι λένε για την εγγύηση και από πού πήραν την πληροφορία.',
      },
    ],
  },
  includes: {
    title: 'Τι αλλάζουμε στην ιστοσελίδα σας',
    intro:
      'Ξεκινάμε από τις σελίδες που διαβάζει κάποιος πριν σας καλέσει ή κάνει κράτηση. Αν λείπει μια πληροφορία που δίνετε καθημερινά στο τηλέφωνο, έχει θέση εκεί.',
    items: [
      {
        title: 'Σωστά στοιχεία επιχείρησης',
        body:
          'Ελέγχουμε αν η επωνυμία, η διεύθυνση και οι υπηρεσίες σας συμφωνούν στην ιστοσελίδα, στο Google Business Profile και στους βασικούς καταλόγους.',
      },
      {
        title: 'Απαντήσεις στις ερωτήσεις των πελατών',
        body:
          'Κοιτάμε πώς διατυπώνουν οι χρήστες τις αναζητήσεις τους στο Search Console. Προσθέτουμε την απάντηση στη σελίδα όπου τη χρειάζονται.',
      },
      {
        title: 'Όροι πριν από την κράτηση',
        body:
          'Ξεκαθαρίζουμε τι περιλαμβάνει η δημοσιευμένη τιμή, πού γίνεται η παραλαβή ή τι ώρα ανοίγετε. Οι λεπτομέρειες εξαρτώνται από την υπηρεσία που προσφέρετε.',
      },
      {
        title: 'Τεχνικός έλεγχος',
        body:
          'Ελέγχουμε αν η Google βρίσκει τις σημαντικές σελίδες σας, πόσο γρήγορα φορτώνουν και ποιες άλλες σελίδες οδηγούν σε αυτές. Ελέγχουμε επίσης αν τα structured data συμφωνούν με το κείμενο που βλέπει ο πελάτης.',
      },
      {
        title: 'Μηνιαία παρακολούθηση',
        body:
          'Επαναλαμβάνουμε τις ίδιες ερωτήσεις και καταγράφουμε πότε η απάντηση αναφέρει την επιχείρησή σας ή δίνει σύνδεσμο. Έτσι μπορείτε να συγκρίνετε τις αναφορές με τα κλικ από την Google.',
      },
    ],
  },
  audience: {
    title: 'Πότε έχει νόημα το AI SEO για την επιχείρησή σας;',
    intro:
      'Είναι χρήσιμο όταν οι υποψήφιοι πελάτες συγκρίνουν επιλογές πριν κλείσουν ή τηλεφωνήσουν. Για όσους απευθύνονται σε ταξιδιώτες, εξετάζουμε τι ρωτούν στα ελληνικά και στα αγγλικά.',
    items: [
      {
        title: 'Ξενοδοχεία, βίλες και εκδρομές',
        body:
          '«Πόσο απέχει το κατάλυμα από το λιμάνι;» και «Περιλαμβάνεται η μεταφορά στην εκδρομή;» είναι ερωτήσεις που μπορείτε να απαντήσετε από πρώτο χέρι.',
      },
      {
        title: 'Ενοικιάσεις αυτοκινήτων και τοπικές υπηρεσίες',
        body:
          'Ένας οδηγός θέλει να ξέρει αν μπορεί να παραλάβει το αυτοκίνητο στο αεροδρόμιο. Κάποιος που ψάχνει οδοντίατρο χρειάζεται τη διεύθυνση και το ωράριο του ιατρείου.',
      },
      {
        title: 'Ιστοσελίδες που ήδη δέχονται αιτήματα',
        body:
          'Αν η Google βρίσκει τις σελίδες σας και οι πελάτες μπορούν ήδη να επικοινωνήσουν μαζί σας, κοιτάμε ποιες ερωτήσεις μένουν αναπάντητες.',
      },
      {
        title: 'Αν συγκρίνετε εταιρείες GEO στην Ελλάδα',
        body:
          'Ζητήστε να σας δείξουν ποια σελίδα θα άλλαζαν πρώτη, ποια ερώτηση θα απαντούσε η αλλαγή και πώς θα την παρακολουθούσαν.',
      },
    ],
  },
  process: {
    title: 'Από τον πρώτο έλεγχο στη μηνιαία αναφορά',
    intro:
      'Μας λέτε τι ρωτούν οι πελάτες σας. Συμφωνούμε ποιες ερωτήσεις αξίζει να παρακολουθούμε και καταγράφουμε τι απαντούν σήμερα τα εργαλεία AI.',
    steps: [
      {
        title: 'Επιλέγουμε τις πρώτες διορθώσεις',
        body:
          'Ελέγχουμε τις σελίδες, τα στοιχεία επικοινωνίας και τις αρχικές απαντήσεις. Σας δείχνουμε ποια αλλαγή προτείνουμε πρώτη και γιατί.',
      },
      {
        title: 'Συμπληρώνουμε τις σελίδες υπηρεσιών',
        body:
          'Προσθέτουμε τους όρους που λείπουν, γράφουμε απαντήσεις εκεί όπου χρειάζονται και συνδέουμε τις σχετικές σελίδες μεταξύ τους.',
      },
      {
        title: 'Ελέγχουμε τα κενά',
        body:
          'Όταν μια απάντηση αναφέρει ανταγωνιστή, κοιτάμε ποια πληροφορία βρήκε για εκείνον. Σε δίγλωσσες ιστοσελίδες ελέγχουμε αν ο πελάτης παίρνει την ίδια απάντηση και στις δύο γλώσσες.',
      },
      {
        title: 'Σας δείχνουμε τι άλλαξε',
        body:
          'Κάθε μήνα βλέπετε ποιες σελίδες δουλέψαμε, σε ποιες ερωτήσεις εμφανίστηκε η επιχείρησή σας και πόσα οργανικά κλικ κατέγραψε το Search Console.',
      },
    ],
  },
  pricing: {
    title: 'Πόσο κοστίζει το AI SEO;',
    intro:
      'Τα πακέτα SEO Growth και SEO Authority περιλαμβάνουν GEO και AEO στην ίδια μηνιαία τιμή με τις τεχνικές διορθώσεις, τη δουλειά στο περιεχόμενο και την αναφορά.',
    note:
      'Στις τιμές προστίθεται ΦΠΑ 24%. Η αρχική διάρκεια είναι 6 μήνες. Στη συνέχεια η συνεργασία ανανεώνεται κάθε μήνα.',
    cta: 'Συγκρίνετε τα πακέτα SEO',
  },
  notForYou: {
    title: 'Πότε να ξεκινήσετε από αλλού',
    items: [
      'Η Google δυσκολεύεται να βρει τις σελίδες σας. Προηγείται ο τεχνικός έλεγχος.',
      'Οι επισκέπτες δυσκολεύονται να επικοινωνήσουν ή να κάνουν κράτηση. Διορθώστε πρώτα αυτό το βήμα.',
      'Χρειάζεστε συγκεκριμένο αριθμό νέων άρθρων κάθε μήνα. Η δουλειά εδώ ξεκινά από τις ερωτήσεις που μένουν αναπάντητες στις υπάρχουσες σελίδες.',
      'Χρειάζεστε εγγυημένη αναφορά ή αποτέλεσμα μέχρι συγκεκριμένη ημερομηνία. Κάθε εργαλείο επιλέγει ποιες επιχειρήσεις θα αναφέρει.',
    ],
  },
  proof: {
    title: 'Παραδείγματα από επιχειρήσεις στην Ελλάδα',
    intro:
      'Δείτε έργα για καταλύματα, ενοικιάσεις αυτοκινήτων και άλλες τοπικές επιχειρήσεις. Σε ορισμένα από αυτά αναλάβαμε και το GEO ή το AEO.',
    caveat:
      'Σε κάθε έργο θα βρείτε τις σελίδες που φτιάξαμε και τις αναζητήσεις για τις οποίες τις σχεδιάσαμε. Για αυτά τα έργα δεν δημοσιεύουμε ποσοστά αναφορών.',
  },
  faqTitle: 'Συχνές ερωτήσεις',
  faqs: [
    {
      question: 'Τι σημαίνει GEO για τη δική μου επιχείρηση;',
      answer:
        'Με το Generative Engine Optimization ελέγχουμε τι λένε για εσάς τα εργαλεία AI. Αν μια απάντηση δίνει λάθος διεύθυνση ή παραπέμπει σε κατάλογο, εξετάζουμε ποια στοιχεία χρειάζονται διόρθωση ή λείπουν από τη σελίδα σας.',
    },
    {
      question: 'Τι αλλάζετε όταν κάνετε AEO;',
      answer:
        'Με το Answer Engine Optimization γράφουμε την απάντηση εκεί όπου τη χρειάζεται ο πελάτης. Για παράδειγμα, στη σελίδα ενοικίασης βάζουμε τους όρους ασφάλισης δίπλα στην ερώτηση «Τι καλύπτει η ασφάλεια;».',
    },
    {
      question: 'Αντικαθιστά το GEO το SEO;',
      answer:
        'Όχι. Το SEO βοηθά τους πελάτες να βρουν την ιστοσελίδα σας στην αναζήτηση. Το GEO προσθέτει τον έλεγχο του τρόπου με τον οποίο εμφανίζεται η επιχείρησή σας στις απαντήσεις AI.',
    },
    {
      question: 'Πώς μετράτε την ορατότητα στο ChatGPT;',
      answer:
        'Κάθε μήνα κάνουμε τις ίδιες ερωτήσεις και καταγράφουμε αν εμφανίζεστε εσείς ή κάποιος ανταγωνιστής και αν υπάρχει σύνδεσμος. Ξεχωριστά μετράμε τα κλικ της Google στο Search Console και τις επισκέψεις από εργαλεία AI που καταγράφει το Analytics.',
    },
    {
      question: 'Πόσο κοστίζει το AI SEO;',
      answer:
        'Το SEO Growth κοστίζει {{SEO_GROWTH}} τον μήνα και το SEO Authority {{SEO_AUTHORITY}} τον μήνα, πλέον ΦΠΑ. Και τα δύο περιλαμβάνουν GEO και AEO. Το SEO Foundations καλύπτει τεχνικό και τοπικό SEO.',
    },
    {
      question: 'Πότε θα δω αν οι αλλαγές αποδίδουν;',
      answer:
        'Στη μηνιαία αναφορά βλέπετε τις αλλαγές στις σελίδες σας και τις απαντήσεις που καταγράψαμε. Δεν υπάρχει συγκεκριμένη προθεσμία για την πρώτη αναφορά. Συγκρίνουμε διαδοχικές μετρήσεις για να δούμε αν μια αλλαγή διαρκεί.',
    },
    {
      question: 'Μπορείτε να εγγυηθείτε ότι το ChatGPT θα μας προτείνει;',
      answer:
        'Όχι. Το ChatGPT επιλέγει ποιες πηγές θα χρησιμοποιήσει σε κάθε απάντηση. Εμείς μπορούμε να διορθώσουμε τα στοιχεία που δημοσιεύετε και να σας δείξουμε πότε και πώς σας ανέφερε.',
    },
    {
      question: 'Πώς θα καταλάβω αν αξίζει για τη δική μου επιχείρηση;',
      answer:
        'Στείλτε μας τις ερωτήσεις που ακούτε πριν από μια κράτηση ή ένα ραντεβού. Στον πρώτο έλεγχο θα δούμε πώς απαντούν σήμερα τα εργαλεία AI και αν προέχει κάποια άλλη αλλαγή στην ιστοσελίδα σας.',
    },
  ],
  cta: {
    title: 'Τι λέει το ChatGPT για την επιχείρησή σας;',
    body:
      'Στείλτε μας την ιστοσελίδα σας και μια ερώτηση που σας κάνουν συχνά οι πελάτες σας. Θα σας δείξουμε τι απαντούν τα εργαλεία AI, τι θα αλλάζαμε στη σελίδα σας και πόσο κοστίζει η δουλειά.',
    primary: 'Ζητήστε δωρεάν έλεγχο',
    secondary: 'Δείτε τιμές',
  },
  relatedTitle: 'Σχετικές σελίδες',
};

const en: AiVisibilityPillarCopy = {
  eyebrow: 'AI visibility (GEO / AEO)',
  h1: 'Help AI services describe your business accurately',
  answer:
    'What does ChatGPT or Gemini say when someone asks about your business? We check a fixed set of questions, clarify the facts on your pages and track mentions alongside Google clicks. This work is included in SEO Growth and Authority, from {{SEO_GROWTH}} a month.',
  metaTitle: 'Generative Engine Optimization (GEO & AEO) Services',
  metaDescription:
    'See how ChatGPT, Gemini and Google AI Overviews describe your business. We check mentions each month and help you fix missing or conflicting details on your site.',
  primaryKeyword: 'AI visibility',
  problem: {
    title: 'What will a customer learn before they visit your site?',
    intro:
      'Someone choosing a hotel in Paros might ask ChatGPT how far it is from the port. The answer can influence which hotels they look at next.',
    items: [
      {
        title: 'Whose answer are they reading?',
        body:
          'ChatGPT, Gemini, Perplexity and Google AI Overviews can show sources. We check whether they point to your site, a booking platform or a directory.',
      },
      {
        title: 'What’s missing from your own page?',
        body:
          '“Family-friendly” leaves a parent with a practical question. Does a child stay free or cost extra? Your room page is the place to explain your policy.',
      },
      {
        title: 'Which details can you fix?',
        body:
          'If your website lists different opening hours from your business profile, start there. Each AI service decides which sources to use.',
      },
    ],
  },
  definitions: {
    title: 'How do SEO, AEO and GEO fit together?',
    intro:
      'Take a car hire company. A traveller finds it on Google and wants to know how much to set aside for the deposit.',
    items: [
      {
        title: 'SEO',
        body:
          'Helps Google find the rental page and show it in relevant searches. Search Console tells us which searches brought people to the site.',
      },
      {
        title: 'AEO',
        body:
          'Answer Engine Optimization helps the traveller find the deposit amount and terms right under their question. Search engines can read the same answer.',
      },
      {
        title: 'GEO',
        body:
          'Generative Engine Optimization looks at how services such as ChatGPT describe the company. We check whether they name the right business, what they say about its deposit and which source they cite.',
      },
    ],
  },
  includes: {
    title: 'What we change on your website',
    intro:
      'We start with the pages people read before calling or booking. If you regularly have to explain something over the phone, that detail belongs on the page.',
    items: [
      {
        title: 'Accurate business listings',
        body:
          'We check that your name, address and services match across your website, Google Business Profile and the main directories.',
      },
      {
        title: 'Answers to customer questions',
        body:
          'We use the wording people search for in Search Console and put the answer on the page where a customer needs it.',
      },
      {
        title: 'Booking and service details',
        body:
          'We clarify what your published price includes, where customers can pick up a car or when your doors open. The details depend on what you sell.',
      },
      {
        title: 'Pages search engines can read',
        body:
          'We check whether Google can find your key pages, how quickly they load and which pages link to them. We also check that structured data matches what customers see.',
      },
      {
        title: 'Monthly mention tracking',
        body:
          'We repeat the same questions and record when an answer names you or links to your site. You can compare those mentions with clicks from Google.',
      },
    ],
  },
  audience: {
    title: 'Would AI visibility work help your business?',
    intro:
      'It’s worth looking at if customers compare options before they book or call. If you serve travellers in Greece, that may mean looking at questions in Greek and English.',
    items: [
      {
        title: 'Hotels, villas and tours',
        body:
          '“How far is the hotel from the port?” and “Does the tour include a transfer?” are questions you can answer first-hand.',
      },
      {
        title: 'Car hire and local services',
        body:
          'A driver wants to know if they can collect a car at the airport. Someone choosing a dentist needs the practice address and opening hours.',
      },
      {
        title: 'Sites already taking enquiries',
        body:
          'If Google can find your pages and customers can already reach you, we can look at the questions those pages still leave open.',
      },
      {
        title: 'Choosing a GEO agency in Greece',
        body:
          'Ask which page they would change first, which customer question the edit would answer and how they would track it.',
      },
    ],
  },
  process: {
    title: 'From the first review to your monthly report',
    intro:
      'Tell us what customers ask. Together we choose the questions worth tracking and record what AI services say about your business today.',
    steps: [
      {
        title: 'Choose the first fixes',
        body:
          'We review your pages, contact details and the first set of answers. You see which change we recommend first and why.',
      },
      {
        title: 'Update your service pages',
        body:
          'We add missing terms, answer the questions that come up before booking and link related pages so people can find them.',
      },
      {
        title: 'Look for gaps',
        body:
          'When an answer recommends a competitor, we check what information it found about them. On bilingual sites, we also compare what customers see in each language.',
      },
      {
        title: 'Review the month’s results',
        body:
          'You see which pages we edited, which answers mentioned your business and how many organic clicks Search Console recorded.',
      },
    ],
  },
  pricing: {
    title: 'How much does AI visibility work cost?',
    intro:
      'SEO Growth and SEO Authority include GEO and AEO in the monthly price alongside technical fixes, content work and reporting.',
    note:
      'Prices exclude 24% Greek VAT. The initial term is 6 months, then the agreement renews monthly.',
    cta: 'Compare SEO packages',
  },
  notForYou: {
    title: 'When to start elsewhere',
    items: [
      'Google has trouble finding your pages. Start with a technical review.',
      'Customers struggle to enquire or book. Fix that step first.',
      'You need a set number of articles each month. This service starts with unanswered questions on existing pages.',
      'You need a guaranteed mention by a particular date. Each AI service decides which businesses to recommend.',
    ],
  },
  proof: {
    title: 'Examples from businesses in Greece',
    intro:
      'Explore work for accommodation providers, car hire companies and other local businesses. Some of these projects also included GEO and AEO.',
    caveat:
      'The project pages show what we built and which searches we designed it for. We don’t publish citation rates for these projects.',
  },
  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      question: 'What does GEO mean for my business?',
      answer:
        'With Generative Engine Optimization, we check what AI services say about you. If an answer gives the wrong address or links to a directory, we look for details to correct or add on your own pages.',
    },
    {
      question: 'What would you change as part of AEO?',
      answer:
        'With Answer Engine Optimization, we put the answer where the customer needs it. On a car hire page, that might mean spelling out the insurance terms under “What does the insurance cover?”',
    },
    {
      question: 'Does GEO replace SEO?',
      answer:
        'No. SEO helps customers find your website in search. GEO adds a check on how AI services describe your business in their answers.',
    },
    {
      question: 'How much does AI visibility work cost?',
      answer:
        'SEO Growth costs {{SEO_GROWTH}} per month and SEO Authority costs {{SEO_AUTHORITY}} per month, plus VAT. Both include GEO and AEO. SEO Foundations covers technical and local SEO.',
    },
    {
      question: 'How soon will I know whether the changes are working?',
      answer:
        'Your monthly report shows the edits and the answers we recorded. A first mention can’t be scheduled. We compare several rounds of answers to see whether a change holds.',
    },
    {
      question: 'Can you guarantee a recommendation from ChatGPT?',
      answer:
        'No. ChatGPT chooses its own sources for each answer. We can correct the information you publish and show you when and how it mentioned you.',
    },
    {
      question: 'How do I know if it’s worth it for my business?',
      answer:
        'Send us the questions customers ask before they book or call. In the first review we’ll look at the answers AI services give today and whether something else on your site needs attention first.',
    },
  ],
  cta: {
    title: 'What does ChatGPT say about your business?',
    body:
      'Send us your website and a question you hear from customers. We’ll show you what AI services say today, what we’d change on the page and what the work would cost.',
    primary: 'Request a free audit',
    secondary: 'See pricing',
  },
  relatedTitle: 'Related pages',
};

export function getAiVisibilityPillarCopy(locale: SiteLocale): AiVisibilityPillarCopy {
  return locale === 'el' ? el : en;
}
