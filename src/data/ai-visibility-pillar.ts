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
  eyebrow: 'Ορατότητα σε AI (GEO / AEO)',
  h1: 'GEO και AEO για επιχειρήσεις: ορατότητα στις απαντήσεις AI, όχι υποσχέσεις αναφοράς',
  answer:
    'Η ορατότητα σε AI είναι συνεχής εργασία σε τρία μέτωπα: σαφή στοιχεία επιχείρησης, σελίδες γραμμένες σε μορφή που μπορεί να παραθέσει μια μηχανή απάντησης, και μέτρηση σε σταθερό σύνολο ερωτημάτων. Στην AnotherSEOGuru εντάσσεται στα πακέτα SEO Growth και Authority, από {{SEO_GROWTH}} τον μήνα, και μετριέται σε τάσεις αναφορών δίπλα στα οργανικά κλικ. Καμία μηχανή δεν εγγυάται ότι θα σας αναφέρει.',
  metaTitle: 'GEO Agency Ελλάδα',
  metaDescription:
    'GEO agency στην Ελλάδα για ChatGPT, Perplexity και AI Overviews. Τι περιλαμβάνει η δουλειά GEO και AEO, πώς τιμολογείται και τι δεν υπόσχεται η συνεργασία.',
  primaryKeyword: 'geo agency ελλάδα',
  problem: {
    title: 'Οι αγοραστές ρωτούν μηχανές απάντησης, όχι μόνο τη Google',
    intro:
      'Ένα μέρος της έρευνας τελειώνει μέσα στην απάντηση: στο ChatGPT, στο Gemini, στο Perplexity και στα AI Overviews της Google. Αν το περιεχόμενό σας δεν είναι σε μορφή που μπορεί να χρησιμοποιηθεί, η σύντομη λίστα την παίρνει κάποιος άλλος - συχνά ένα OTA ή ένας κατάλογος.',
    items: [
      {
        title: 'Η εμφάνιση χωρίς κλικ είναι πλέον μέρος της αναζήτησης',
        body:
          'Τα AI Overviews και οι απαντήσεις chat συνοψίζουν πριν ο χρήστης ανοίξει ιστοσελίδα. Το κλασικό SEO εξακολουθεί να φέρνει κλικ. Το AEO και το GEO αφορούν το αν το brand σας είναι αρκετά σαφές ώστε να μπει σε αυτή τη σύνοψη.',
      },
      {
        title: 'Τα γενικά ερωτήματα ευνοούν τους μεγάλους καταλόγους',
        body:
          '«Καλύτερο ξενοδοχείο στην Πάρο» σχεδόν πάντα επιστρέφει OTAs. Συγκεκριμένα ερωτήματα - απόσταση από το λιμάνι, πολιτική παιδιών, εγγύηση rent-a-car - ευνοούν επίσημες σελίδες με ρητά γεγονότα. Εκεί κρίνεται μια ελληνική επιχείρηση.',
      },
      {
        title: 'Η βελτιστοποίηση κάνει το περιεχόμενο χρησιμοποιήσιμο, όχι επιλεγμένο',
        body:
          'Κανένα γραφείο δεν ελέγχει τι θα παραθέσει το ChatGPT ή το Gemini. Αυτό που ελέγχετε είναι αν τα στοιχεία σας είναι συνεπή, αν οι απαντήσεις είναι ορατές στη σελίδα και αν μετράτε την τάση σε σταθερά ερωτήματα. Η υπόσχεση «θα σας αναφέρει η AI» είναι σήμα κινδύνου.',
      },
    ],
  },
  definitions: {
    title: 'Τι είναι το GEO και τι είναι το AEO',
    intro:
      'Τρία ακρωνύμια, μία στοίβα. Χωρίς κοινούς ορισμούς, κάθε πρόταση πουλάει το ίδιο πράγμα με άλλο όνομα. Εδώ είναι η διάκριση που χρησιμοποιούμε στη δουλειά.',
    items: [
      {
        title: 'SEO',
        body:
          'Κατάταξη και κλικ στα κλασικά αποτελέσματα: οργανικά αποτελέσματα και, όπου ισχύει, το πακέτο χάρτη. Χωρίς crawlable, γρήγορες σελίδες με σαφή πρόθεση, δεν υπάρχει βάση για τα άλλα δύο.',
      },
      {
        title: 'AEO',
        body:
          'Answer Engine Optimization: δομή περιεχομένου ώστε μια μηχανή απάντησης να μπορεί να σηκώσει μια σύντομη, ακριβή απάντηση. FAQ ορατά στη σελίδα, απάντηση αμέσως κάτω από την ερώτηση, schema που συμφωνεί με το κείμενο, πίνακες όπου βοηθούν. Εμφανίζεται σε featured snippets, AI Overviews και φωνητικές απαντήσεις.',
      },
      {
        title: 'GEO',
        body:
          'Generative Engine Optimization: να είστε αναγνωρίσιμη, συνεπής πηγή όταν ένα μοντέλο συνθέτει απάντηση στο ChatGPT, στο Perplexity ή στο Gemini. Οντότητα, αποδείξεις, πολιτικές και γεγονότα που μπορεί να παραθέσει με ασφάλεια. Δεν αντικαθιστά το SEO· κάθεται από πάνω του.',
      },
    ],
  },
  includes: {
    title: 'Τι περιλαμβάνει μια σοβαρή υπηρεσία ορατότητας σε AI',
    intro:
      'Αν μια προσφορά GEO δεν λέει τι αλλάζει στο site κάθε μήνα, δεν είναι προσφορά. Αυτά είναι τα πέντε κομμάτια της δουλειάς, και κανένα δεν λειτουργεί μόνο του.',
    items: [
      {
        title: 'Καθαρότητα οντότητας',
        body:
          'Ίδια επωνυμία, υπηρεσίες, διευθύνσεις και γλωσσικές παραλλαγές σε site, Google Business Profile και βασικούς καταλόγους. Αντικρουόμενα στοιχεία είναι ο πιο φθηνός τρόπος να μην σας εμπιστευτεί ένα μοντέλο.',
      },
      {
        title: 'Περιεχόμενο σε μορφή απάντησης',
        body:
          'Ερωτήσεις όπως εμφανίζονται στο Search Console, απάντηση 40 έως 60 λέξεων αμέσως από κάτω, FAQ ορατά στη σελίδα και schema που καθρεφτίζει ακριβώς αυτό το κείμενο. Markup χωρίς ορατή απάντηση δεν μετράει.',
      },
      {
        title: 'Εμπορικές σελίδες με γεγονότα',
        body:
          'Πολιτικές, αποστάσεις, τιμές όπου δημοσιεύονται, κανόνες παραλαβής, ωράριο, τι περιλαμβάνεται. Τα generic κείμενα χάνουν από OTAs. Τα συγκεκριμένα γεγονότα είναι αυτό που μπορεί να παρατεθεί.',
      },
      {
        title: 'Τεχνικά θεμέλια',
        body:
          'Ευρετηρίαση, ταχύτητα, αρχιτεκτονική εσωτερικών συνδέσμων και δομημένα δεδομένα που αντιστοιχούν στο ορατό περιεχόμενο. Το GEO χωρίς τεχνικό SEO είναι σκεπή χωρίς τοίχους. Αν το site δεν διαβάζεται, καμία «AI βελτιστοποίηση» δεν αποδίδει.',
      },
      {
        title: 'Μέτρηση χωρίς ψευδαισθήσεις',
        body:
          'Σταθερό σύνολο ερωτημάτων, δειγματοληψία ανά μήνα, καταγραφή αν το brand αναφέρθηκε, συνδέθηκε ή παραλείφθηκε, δίπλα στα κλικ του Search Console. Τάσεις ανά τρίμηνο. Όχι «AI rank #1» και όχι ένα screenshot από μία συνεδρία ChatGPT.',
      },
    ],
  },
  audience: {
    title: 'Για ποιους είναι αυτή η δουλειά',
    intro:
      'Το GEO και το AEO έχουν νόημα εκεί όπου οι αγοραστές ήδη ρωτούν μια μηχανή απάντησης πριν κλείσουν ή καλέσουν. Σε άλλους κλάδους προηγείται το κλασικό SEO.',
    items: [
      {
        title: 'Τουρισμός και φιλοξενία',
        body:
          'Ξενοδοχεία, βίλες και εκδρομές που ανταγωνίζονται OTAs σε ερωτήματα προορισμού. Τα γενικά ερωτήματα τα παίρνουν οι κατάλογοι· τα συγκεκριμένα (λιμάνι, οικογένεια, μεταφορές) τα παίρνει όποιος έχει ρητές απαντήσεις στη σελίδα.',
      },
      {
        title: 'Rent-a-car και τοπικές υπηρεσίες',
        body:
          'Εγγύηση, ασφάλεια, ηλικία οδηγού, παραλαβή αεροδρομίου· ή «δικηγόρος εργατικών στην Αθήνα», «οδοντίατρος κοντά μου». Το πακέτο χάρτη φέρνει ακόμα κλήσεις. Τα AI Overviews συνοψίζουν όλο και περισσότερο τις ίδιες ερωτήσεις.',
      },
      {
        title: 'Επιχειρήσεις με site που ήδη διαβάζεται',
        body:
          'Αν το site δεν ευρετηριάζεται, αν οι εμπορικές σελίδες είναι λεπτές ή αν δεν υπάρχει διαδρομή αιτήματος, πρώτα διορθώνονται τα θεμέλια. Το GEO δεν σώζει ένα site που η Google δεν μπορεί να διαβάσει.',
      },
      {
        title: 'Όσοι συγκρίνουν GEO agency στην Ελλάδα',
        body:
          'Η σωστή ερώτηση δεν είναι «ποιος υπόσχεται αναφορές». Είναι τι αλλάζει στο site, πάνω σε ποια δεδομένα, πώς μετράται και τι γίνεται αν φύγετε. Αυτή η σελίδα απαντά σε αυτά, δημόσια.',
      },
    ],
  },
  process: {
    title: 'Πώς δουλεύουμε',
    intro:
      'Πρακτική σειρά: θεμέλια SEO, μετά AEO στις εμπορικές σελίδες, μετά πρόγραμμα GEO. Να τρέχετε δειγματοληψία ChatGPT σε site που δεν ανιχνεύεται είναι το πιο ακριβό λάθος που βλέπουμε.',
    steps: [
      {
        title: 'Εβδομάδες 1-2: βάση και προτεραιότητες',
        body:
          'Τεχνικός έλεγχος, συνέπεια οντότητας (About, στοιχεία επικοινωνίας, schema) και πρώτη δειγματοληψία σε σταθερό σύνολο ερωτημάτων. Παραδίδουμε ιεραρχημένο πλάνο, όχι λίστα εργαλείων.',
      },
      {
        title: 'Μήνες 1-3: AEO στις σελίδες που πουλάνε',
        body:
          'FAQ και απαντήσεις στις εμπορικές σελίδες, schema που συμφωνεί με το ορατό κείμενο, πολιτικές και γεγονότα που έλειπαν, εσωτερική σύνδεση προς αυτές τις σελίδες. Εδώ φαίνονται οι πρώτες κινήσεις σε σύντομες απαντήσεις.',
      },
      {
        title: 'Μήνες 4-6: επέκταση GEO',
        body:
          'Κλείσιμο κενών όπου αναφέρονται ανταγωνιστές και εσείς όχι, ευρύτερη θεματική κάλυψη, συνέπεια EL και EN όπου ο τουρισμός το απαιτεί, σταθερή επανάληψη της δειγματοληψίας.',
      },
      {
        title: 'Κάθε μήνα: μέτρηση',
        body:
          'Αναφορά με οργανικά κλικ, παρουσία σε εμπορικά ερωτήματα και τάση αναφορών στο σταθερό σύνολο. Αν κάτι δεν αποδίδει, αλλάζει. Δεν επαναλαμβάνεται επειδή ήταν στο πλάνο.',
      },
    ],
  },
  pricing: {
    title: 'Πόσο κοστίζει',
    intro:
      'Το GEO και το AEO δεν είναι ξεχωριστή μηνιαία συνεργασία των 50 ευρώ. Εντάσσονται στα μηνιαία πακέτα SEO που ήδη καλύπτουν τεχνική εργασία, περιεχόμενο και αναφορά. Αφιερωμένη εργασία AEO και GEO περιλαμβάνεται από το Growth και πάνω.',
    note:
      'Όλες οι τιμές είναι καθαρές, χωρίς ΦΠΑ 24%. Η ελάχιστη διάρκεια συνεργασίας είναι 6 μήνες και στη συνέχεια ανανεώνεται μηνιαία: κάτω από αυτό το διάστημα δεν προλαβαίνει να φανεί αν η δουλειά αποδίδει.',
    cta: 'Δείτε αναλυτικά τα πακέτα',
  },
  notForYou: {
    title: 'Πότε δεν είμαστε η σωστή επιλογή',
    items: [
      'Θέλετε εγγύηση ότι το ChatGPT θα σας αναφέρει. Δεν τη δίνουμε, γιατί δεν μπορεί να δοθεί.',
      'Το site σας δεν ευρετηριάζεται ή δεν έχει διαδρομή αιτήματος. Πρώτα τα θεμέλια, μετά η ορατότητα σε AI.',
      'Ψάχνετε όγκο άρθρων γραμμένων από AI χωρίς γεγονότα, οντότητα ή μέτρηση.',
      'Θέλετε αποτελέσματα σε έναν μήνα. Οι πρώτες κινήσεις σε σύντομες απαντήσεις μπορεί να φανούν σε εβδομάδες· σταθερή τάση αναφορών θέλει τρίμηνα.',
    ],
  },
  proof: {
    title: 'Έργα όπου η ορατότητα σε AI είναι μέρος της στοίβας',
    intro:
      'Δουλεύουμε κυρίως με τουρισμό, φιλοξενία, ενοικίαση αυτοκινήτου και τοπικές επιχειρήσεις στην Ελλάδα. Σε κάποια έργα η εργασία GEO και AEO είναι ρητό μέρος του εύρους.',
    caveat:
      'Δείχνουμε τι χτίσαμε και για ποιες αναζητήσεις. Δεν δημοσιεύουμε ποσοστά αναφορών ή «AI rank» για λογαριασμό πελατών: τα νούμερα που δεν μπορούμε να τεκμηριώσουμε δεν είναι απόδειξη.',
  },
  faqTitle: 'Συχνές ερωτήσεις',
  faqs: [
    {
      question: 'Τι είναι το GEO;',
      answer:
        'GEO σημαίνει Generative Engine Optimization: εργασία ώστε η επιχείρησή σας να είναι σαφής, συνεπής πηγή όταν ένα μοντέλο συνθέτει απάντηση στο ChatGPT, στο Perplexity ή στο Gemini. Περιλαμβάνει καθαρότητα οντότητας, σελίδες με γεγονότα και μέτρηση σε σταθερό σύνολο ερωτημάτων. Δεν αντικαθιστά το SEO και δεν εγγυάται ότι κάποια μηχανή θα σας αναφέρει.',
    },
    {
      question: 'Τι είναι το AEO;',
      answer:
        'AEO σημαίνει Answer Engine Optimization: δομή περιεχομένου ώστε μια μηχανή απάντησης να μπορεί να σηκώσει μια σύντομη, ακριβή απάντηση. Πρακτικά: ερωτήσεις όπως τις γράφουν οι χρήστες, απάντηση αμέσως από κάτω, FAQ ορατά στη σελίδα και schema που συμφωνεί με το κείμενο. Εμφανίζεται σε featured snippets, AI Overviews και φωνητικές απαντήσεις.',
    },
    {
      question: 'Το GEO αντικαθιστά το SEO;',
      answer:
        'Όχι. Τα μοντέλα αντλούν από τις ίδιες σελίδες που κατατάσσει η Google. Χωρίς τεχνική υγεία, σαφή πρόθεση ανά URL και περιεχόμενο που απαντά σε πραγματικές αναζητήσεις, δεν υπάρχει σταθερό υλικό για παράθεση. Η πρακτική σειρά είναι SEO, μετά AEO στις εμπορικές σελίδες, μετά πρόγραμμα GEO.',
    },
    {
      question: 'Πόσο κοστίζει η ορατότητα σε AI;',
      answer:
        'Αφιερωμένη εργασία GEO και AEO περιλαμβάνεται στα πακέτα SEO Growth ({{SEO_GROWTH}} τον μήνα καθαρά) και Authority ({{SEO_AUTHORITY}}). Το Foundations καλύπτει τεχνικό και τοπικό SEO χωρίς ξεχωριστό πρόγραμμα GEO. Δεν πουλάμε τρεις ξεχωριστές μηνιαίες συνεργασίες (SEO + AEO + GEO) στην ίδια επιχείρηση.',
    },
    {
      question: 'Πόσο χρόνο χρειάζεται το GEO για να φέρει αποτέλεσμα;',
      answer:
        'Διορθώσεις οντότητας και FAQ μπορούν να επηρεάσουν σύντομες απαντήσεις σε εβδομάδες, σε ορισμένα ερωτήματα. Σταθερή τάση αναφορών σε ανταγωνιστικά ερωτήματα τουρισμού θέλει συνήθως τρίμηνα μέτρησης, όχι μία συνεδρία ChatGPT. Γι’ αυτό η ελάχιστη συνεργασία είναι 6 μήνες: κάτω από αυτό δεν υπάρχει αρκετή ένδειξη.',
    },
    {
      question: 'Εγγυάστε ότι θα μας αναφέρει το ChatGPT;',
      answer:
        'Όχι. Κανένα γραφείο δεν ελέγχει τι θα παραθέσει ένα μοντέλο, οπότε τέτοια εγγύηση δεν μπορεί να δοθεί ειλικρινά. Αυτό που εγγυόμαστε είναι η δουλειά: συγκεκριμένα παραδοτέα κάθε μήνα και αναφορά που δείχνει κλικ, τάση αναφορών και τι άλλαξε στο site.',
    },
    {
      question: 'Για ποιες επιχειρήσεις έχει νόημα ένα GEO agency στην Ελλάδα;',
      answer:
        'Για όσες οι αγοραστές ήδη ρωτούν AI πριν κλείσουν ή καλέσουν: ξενοδοχεία, rent-a-car, εκδρομές και τοπικές υπηρεσίες με εμπορικά ερωτήματα. Αν ο κλάδος σας δεν έχει αυτή τη ζήτηση, θα σας το πούμε στον πρώτο έλεγχο. Για κλασικό SEO χωρίς αυτό το στρώμα, δείτε τις υπηρεσίες SEO.',
    },
  ],
  cta: {
    title: 'Ξεκινήστε με έναν έλεγχο, όχι με υπόσχεση αναφοράς',
    body:
      'Πείτε μας τι πουλάτε και ποιες ερωτήσεις κάνουν ήδη οι πελάτες σας. Κοιτάμε το site, το Search Console και τι απαντούν σήμερα οι μηχανές στο δικό σας σύνολο ερωτημάτων, και επιστρέφουμε με το τι χρειάζεται και τι κοστίζει - μέσα σε 24 ώρες σε εργάσιμες ημέρες.',
    primary: 'Ζητήστε δωρεάν έλεγχο',
    secondary: 'Δείτε τιμές',
  },
  relatedTitle: 'Σχετικές σελίδες',
};

const en: AiVisibilityPillarCopy = {
  eyebrow: 'AI visibility (GEO / AEO)',
  h1: 'GEO and AEO for businesses: visibility in AI answers, not citation promises',
  answer:
    'AI visibility is continuous work on three fronts: clear company facts, pages written in a shape an answer engine can quote, and measurement against a fixed set of questions. Ours sits inside the SEO Growth and Authority retainers, from {{SEO_GROWTH}} a month, and is measured as mention trends alongside organic clicks. No engine guarantees it will cite you.',
  metaTitle: 'AI Visibility (GEO / AEO)',
  metaDescription:
    'GEO and AEO for businesses: entity clarity, answer-shaped pages and measurement. What the work includes, how it is priced, and what it does not promise.',
  primaryKeyword: 'AI visibility',
  problem: {
    title: 'Buyers ask answer engines, not only Google',
    intro:
      'Part of research now ends inside the answer: ChatGPT, Gemini, Perplexity and Google AI Overviews. If your content is not in a shape those systems can use, the shortlist goes to someone else - often an OTA or a directory.',
    items: [
      {
        title: 'Visibility without a click is now part of search',
        body:
          'AI Overviews and chat answers summarise before anyone opens a site. Classic SEO still earns clicks. AEO and GEO are about whether your brand is clear enough to be used in that summary.',
      },
      {
        title: 'Generic questions favour the big directories',
        body:
          '"Best hotel in Paros" almost always returns OTAs. Specific questions - distance to the port, child policy, rental deposit - favour official pages with explicit facts. That is where a real business can compete.',
      },
      {
        title: 'Optimisation makes content usable, not chosen',
        body:
          'No agency controls what ChatGPT or Gemini will quote. What you control is whether your facts are consistent, whether the answers are visible on the page, and whether you measure the trend against a fixed question set. A promise that "AI will mention you" is a warning sign.',
      },
    ],
  },
  definitions: {
    title: 'What GEO is, and what AEO is',
    intro:
      'Three acronyms, one stack. Without shared definitions every proposal sells the same work under a different name. This is the split we use in the work.',
    items: [
      {
        title: 'SEO',
        body:
          'Rankings and clicks in classic results: organic listings and, where it applies, the map pack. Without crawlable, fast pages with a clear intent, there is no base for the other two.',
      },
      {
        title: 'AEO',
        body:
          'Answer Engine Optimization: structuring content so an answer engine can lift a short, accurate answer. Visible FAQs, the answer directly under the question, schema that matches the text, tables where they help. It shows up in featured snippets, AI Overviews and voice answers.',
      },
      {
        title: 'GEO',
        body:
          'Generative Engine Optimization: being a recognisable, consistent source when a model composes an answer in ChatGPT, Perplexity or Gemini. Entity, evidence, policies and facts it can quote safely. It does not replace SEO; it sits on top of it.',
      },
    ],
  },
  includes: {
    title: 'What a serious AI visibility service includes',
    intro:
      'If a GEO proposal does not say what changes on the site each month, it is not a proposal. These are the five parts of the work, and none of them functions alone.',
    items: [
      {
        title: 'Entity clarity',
        body:
          'The same name, services, addresses and language variants on the site, Google Business Profile and the core directories. Conflicting facts are the cheapest way to lose a model’s trust.',
      },
      {
        title: 'Answer-shaped content',
        body:
          'Questions as they appear in Search Console, a 40 to 60 word answer immediately underneath, FAQs visible on the page, and schema that mirrors that text exactly. Markup with no visible answer does not count.',
      },
      {
        title: 'Commercial pages with facts',
        body:
          'Policies, distances, published prices, pickup rules, hours, what is included. Generic brochure copy loses to OTAs. Specific facts are what can be quoted.',
      },
      {
        title: 'Technical foundations',
        body:
          'Indexation, speed, internal link architecture and structured data that matches what is on the page. GEO without technical SEO is a roof without walls. If the site cannot be read, no amount of "AI optimisation" pays.',
      },
      {
        title: 'Measurement without the theatre',
        body:
          'A fixed question set, sampled monthly, logging whether the brand was named, linked or omitted, next to Search Console clicks. Trends by quarter. Not "AI rank #1" and not one ChatGPT screenshot.',
      },
    ],
  },
  audience: {
    title: 'Who this work is for',
    intro:
      'GEO and AEO pay off where buyers already ask an answer engine before they book or call. In other sectors, classic SEO comes first.',
    items: [
      {
        title: 'Tourism and hospitality',
        body:
          'Hotels, villas and tours competing with OTAs on destination queries. Generic prompts go to directories; specific ones (port, family, transfers) go to whoever has explicit answers on the page.',
      },
      {
        title: 'Rent-a-car and local services',
        body:
          'Deposit, insurance, driver age, airport pickup; or "employment lawyer in Athens", "dentist near me". The map pack still brings calls. AI Overviews increasingly summarise the same questions.',
      },
      {
        title: 'Businesses whose site can already be read',
        body:
          'If the site is not indexed, if the commercial pages are thin, or if there is no enquiry path, foundations come first. GEO will not rescue a site Google cannot read.',
      },
      {
        title: 'Anyone comparing a GEO agency',
        body:
          'The useful question is not "who promises citations". It is what changes on the site, on what data, how it is measured, and what happens if you leave. This page answers those, in public.',
      },
    ],
  },
  process: {
    title: 'How the work runs',
    intro:
      'The practical sequence is SEO foundations, then AEO on the commercial pages, then a GEO programme. Running ChatGPT sampling on a site that does not crawl is the most expensive mistake we see.',
    steps: [
      {
        title: 'Weeks 1-2: baseline and priorities',
        body:
          'Technical audit, entity consistency (About, contact details, schema) and a first sample against a fixed question set. You get a prioritised plan, not a list of tools.',
      },
      {
        title: 'Months 1-3: AEO on the pages that sell',
        body:
          'FAQs and answers on the commercial pages, schema that matches the visible text, the policies and facts that were missing, internal links into those pages. This is where the first movement on short answers shows.',
      },
      {
        title: 'Months 4-6: GEO expansion',
        body:
          'Close gaps where competitors are named and you are not, broader topical coverage, EL and EN consistency where tourism needs it, and a steady repeat of the sample.',
      },
      {
        title: 'Every month: measurement',
        body:
          'A report covering organic clicks, presence on commercial queries, and the mention trend on the fixed set. If something is not working it changes. It does not get repeated because it was in the plan.',
      },
    ],
  },
  pricing: {
    title: 'What it costs',
    intro:
      'GEO and AEO are not a €50 side retainer. They sit inside the monthly SEO engagements that already cover technical work, content and reporting. Dedicated AEO and GEO work is included from Growth up.',
    note:
      'All prices are net of 24% Greek VAT. The minimum engagement is 6 months, monthly thereafter: below that there is not enough time to tell whether the work is paying.',
    cta: 'See the full packages',
  },
  notForYou: {
    title: 'When we are the wrong choice',
    items: [
      'You want a guarantee that ChatGPT will mention you. We do not give one, because it cannot honestly be given.',
      'Your site is not indexed or has no enquiry path. Foundations first, then AI visibility.',
      'You are shopping for a volume of AI-written articles with no facts, no entity work and no measurement.',
      'You need results in a month. First movement on short answers can show in weeks; a stable mention trend takes quarters.',
    ],
  },
  proof: {
    title: 'Work where AI visibility is part of the stack',
    intro:
      'Most of our work is tourism, hospitality, car rental and local businesses in Greece. On some projects GEO and AEO work is an explicit part of the scope.',
    caveat:
      'We show what we built and which searches it targets. We do not publish citation rates or "AI rank" on clients’ behalf: numbers we cannot evidence are not proof.',
  },
  faqTitle: 'Frequently asked questions',
  faqs: [
    {
      question: 'What is GEO?',
      answer:
        'GEO means Generative Engine Optimization: work so your business is a clear, consistent source when a model composes an answer in ChatGPT, Perplexity or Gemini. It covers entity clarity, pages with facts, and measurement against a fixed question set. It does not replace SEO and it does not guarantee that any engine will mention you.',
    },
    {
      question: 'What is AEO?',
      answer:
        'AEO means Answer Engine Optimization: structuring content so an answer engine can lift a short, accurate answer. In practice: questions as people type them, the answer immediately underneath, FAQs visible on the page, and schema that matches the text. It shows up in featured snippets, AI Overviews and voice answers.',
    },
    {
      question: 'Does GEO replace SEO?',
      answer:
        'No. Models draw on the same pages Google ranks. Without technical health, one intent per URL and content that answers real searches, there is nothing stable to quote. The practical sequence is SEO, then AEO on the commercial pages, then a GEO programme.',
    },
    {
      question: 'How much does AI visibility cost?',
      answer:
        'Dedicated GEO and AEO work is included in the SEO Growth ({{SEO_GROWTH}} a month net) and Authority ({{SEO_AUTHORITY}}) packages. Foundations covers technical and local SEO without a separate GEO programme. We do not sell three retainers (SEO + AEO + GEO) to the same business.',
    },
    {
      question: 'How long does GEO take to show a result?',
      answer:
        'Entity and FAQ fixes can affect short answers within weeks on some queries. A stable mention trend on competitive tourism questions usually takes quarters of measurement, not one ChatGPT session. That is why the minimum engagement is 6 months: below that there is not enough evidence.',
    },
    {
      question: 'Do you guarantee that ChatGPT will mention us?',
      answer:
        'No. No agency controls what a model will quote, so that guarantee cannot honestly be given. What we guarantee is the work: named deliverables each month and a report showing clicks, the mention trend and what changed on the site.',
    },
    {
      question: 'Which businesses is a GEO agency for?',
      answer:
        'Those whose buyers already ask AI before they book or call: hotels, rent-a-car, tours and local services with commercial queries. If your sector does not have that demand, we will say so at the first audit. For classic SEO without this layer, see SEO services.',
    },
  ],
  cta: {
    title: 'Start with an audit, not a citation promise',
    body:
      'Tell us what you sell and which questions your buyers already ask. We will look at the site, Search Console and what the engines answer today on your question set, and come back with what is needed and what it costs - within 24 working hours.',
    primary: 'Request a free audit',
    secondary: 'See pricing',
  },
  relatedTitle: 'Related pages',
};

export function getAiVisibilityPillarCopy(locale: SiteLocale): AiVisibilityPillarCopy {
  return locale === 'el' ? el : en;
}
