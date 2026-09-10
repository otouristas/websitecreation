import type { SiteLocale } from '@/lib/i18n/locale';

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
}

export interface SeoServicesPillarCopy {
  readonly eyebrow: string;
  readonly h1: string;
  /** The answer-first paragraph, directly under the H1. */
  readonly answer: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly primaryKeyword: string;
  readonly includes: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly process: { readonly title: string; readonly intro: string; readonly steps: readonly PillarSection[] };
  readonly pricing: { readonly title: string; readonly intro: string; readonly note: string; readonly cta: string };
  readonly choosing: { readonly title: string; readonly intro: string; readonly items: readonly PillarSection[] };
  readonly notForYou: { readonly title: string; readonly items: readonly string[] };
  readonly proof: { readonly title: string; readonly intro: string; readonly caveat: string };
  readonly faqTitle: string;
  readonly faqs: readonly PillarFaq[];
  readonly cta: { readonly title: string; readonly body: string; readonly primary: string; readonly secondary: string };
  readonly relatedTitle: string;
}

const el: SeoServicesPillarCopy = {
  eyebrow: 'Υπηρεσίες SEO',
  h1: 'SEO για επιχειρήσεις: υπηρεσίες που φέρνουν αιτήματα πελατών, όχι αναφορές',
  answer:
    'Το SEO για επιχειρήσεις είναι συνεχής εργασία σε τρία μέτωπα: τεχνική υγεία της ιστοσελίδας, περιεχόμενο που αντιστοιχεί σε πραγματικές αναζητήσεις, και σήματα εμπιστοσύνης εκτός του site. Στην AnotherSEOGuru ξεκινάει με έλεγχο και αντιστοίχιση λέξεων-κλειδιών σε σελίδες, τρέχει μηνιαία από {{ENTRY_SEO}} και μετριέται σε κλικ και αιτήματα, όχι σε κατατάξεις που δεν φέρνουν πελάτες.',
  metaTitle: 'Υπηρεσίες SEO για Επιχειρήσεις',
  metaDescription:
    'Υπηρεσίες SEO για ελληνικές επιχειρήσεις: τεχνικό SEO, τοπικό SEO, περιεχόμενο και GEO/AEO. Τι περιλαμβάνουν, πώς τιμολογούνται και πώς μετριούνται.',
  primaryKeyword: 'υπηρεσίες SEO',
  includes: {
    title: 'Τι περιλαμβάνει μια σοβαρή υπηρεσία SEO',
    intro:
      'Αν μια προσφορά SEO δεν αναφέρει συγκεκριμένα τι γίνεται κάθε μήνα, δεν είναι προσφορά. Αυτά είναι τα πέντε κομμάτια της δουλειάς, και κανένα δεν λειτουργεί μόνο του.',
    items: [
      {
        title: 'Τεχνικό SEO',
        body:
          'Ό,τι εμποδίζει τη Google να διαβάσει και να ευρετηριάσει τις σελίδες που πουλάνε: σφάλματα ευρετηρίασης, canonical, ταχύτητα και Core Web Vitals, δομημένα δεδομένα που αντιστοιχούν στο ορατό περιεχόμενο, αρχιτεκτονική εσωτερικών συνδέσμων. Είναι το πρώτο που κοιτάμε, γιατί κάθε άλλη εργασία χτίζεται πάνω του.',
      },
      {
        title: 'Αντιστοίχιση λέξεων-κλειδιών σε σελίδες',
        body:
          'Μία εμπορική ομάδα αναζητήσεων, μία σελίδα. Χωρίς αυτό, δύο σελίδες σας ανταγωνίζονται μεταξύ τους για την ίδια αναζήτηση και καμία δεν κερδίζει. Ξεκινάμε από τα δεδομένα του δικού σας Search Console, όχι από γενικές λίστες όγκου.',
      },
      {
        title: 'Περιεχόμενο με εμπορική πρόθεση',
        body:
          'Σελίδες υπηρεσιών, σελίδες περιοχής και άρθρα που απαντούν σε ερωτήσεις που κάνει κάποιος λίγο πριν ζητήσει προσφορά. Γράφουμε στα ελληνικά, για την αγορά σας, με παραδείγματα από τον κλάδο σας.',
      },
      {
        title: 'Τοπικό SEO',
        body:
          'Google Business Profile, συνέπεια στοιχείων επικοινωνίας, κριτικές και καταχωρήσεις, σελίδες περιοχής όπου υπάρχει πραγματική τοπική πρόθεση. Για επιχειρήσεις με φυσικό σημείο ή περιοχή εξυπηρέτησης, εδώ κρίνεται το τηλεφώνημα.',
      },
      {
        title: 'GEO και AEO',
        body:
          'Απαντήσεις γραμμένες σε μορφή που μπορεί να παραθέσει μια μηχανή απάντησης, σαφή στοιχεία εταιρείας και δομημένα δεδομένα που συμφωνούν με τη σελίδα. Καμία μηχανή δεν εγγυάται ότι θα σας αναφέρει· αυτό που ελέγχετε είναι αν το περιεχόμενό σας μπορεί να χρησιμοποιηθεί.',
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
          'Διόρθωση τεχνικών εμποδίων, ξαναγράψιμο των σελίδων που μπορούν να φέρουν πελάτες, Google Business Profile και τοπικά σήματα, πρώτο περιεχόμενο. Εδώ φαίνονται οι πρώτες κινήσεις σε θέσεις.',
      },
      {
        title: 'Μήνες 4-6: επέκταση',
        body:
          'Ευρύτερη θεματική κάλυψη, εσωτερική σύνδεση προς τις εμπορικές σελίδες, εργασία authority και σταθερή παραγωγή περιεχομένου βάσει πραγματικής ζήτησης.',
      },
      {
        title: 'Κάθε μήνα: μέτρηση',
        body:
          'Αναφορά με οργανικά κλικ, θέσεις στις εμπορικές αναζητήσεις και αιτήματα που ήρθαν από την οργανική αναζήτηση. Αν κάτι δεν αποδίδει, αλλάζει· δεν επαναλαμβάνεται επειδή ήταν στο πλάνο.',
      },
    ],
  },
  pricing: {
    title: 'Πόσο κοστίζει',
    intro:
      'Οι τιμές είναι δημόσιες. Το SEO τιμολογείται με βάση τον ανταγωνισμό, τη ζήτηση αναζήτησης και τον όγκο περιεχομένου - όχι με αριθμό λέξεων-κλειδιών.',
    note:
      'Όλες οι τιμές είναι καθαρές, χωρίς ΦΠΑ 24%. Η ελάχιστη διάρκεια συνεργασίας είναι 6 μήνες και στη συνέχεια ανανεώνεται μηνιαία: κάτω από αυτό το διάστημα δεν προλαβαίνει να φανεί αν η δουλειά αποδίδει.',
    cta: 'Δείτε αναλυτικά τα πακέτα',
  },
  choosing: {
    title: 'Πώς να επιλέξετε εταιρεία SEO',
    intro:
      'Τέσσερις ερωτήσεις που ξεχωρίζουν μια σοβαρή πρόταση από μια που πουλάει ελπίδα.',
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
      question: 'Πόσο κοστίζει το SEO τον μήνα;',
      answer:
        'Τα πακέτα μας ξεκινούν από {{ENTRY_SEO}} τον μήνα καθαρά, με {{SEO_GROWTH}} και {{SEO_AUTHORITY}} για πιο ανταγωνιστικές αγορές και e-shop. Το τι χωράει σε κάθε επίπεδο εξαρτάται από τον ανταγωνισμό στον κλάδο σας και τον όγκο περιεχομένου που χρειάζεται, όχι από αριθμό λέξεων-κλειδιών.',
    },
    {
      question: 'Πόσο χρόνο χρειάζεται το SEO για να φέρει αποτελέσματα;',
      answer:
        'Οι πρώτες κινήσεις σε θέσεις φαίνονται συνήθως σε 2 έως 4 μήνες. Ουσιαστική διαφορά σε αιτήματα πελατών θέλει 6 μήνες και πάνω, και σε ανταγωνιστικούς κλάδους περισσότερο. Γι’ αυτό η ελάχιστη διάρκεια είναι 6 μήνες: κάτω από αυτό δεν προλαβαίνει να φανεί αν δουλεύει.',
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
      question: 'Ποια είναι η διαφορά ανάμεσα σε SEO και Google Ads;',
      answer:
        'Οι διαφημίσεις αγοράζουν εμφάνιση τώρα και σταματούν όταν σταματήσει το budget. Το SEO χτίζει θέσεις που παραμένουν, αλλά θέλει χρόνο. Οι περισσότερες επιχειρήσεις κερδίζουν από συνδυασμό: Ads για άμεση ζήτηση, SEO για κόστος απόκτησης που πέφτει με τον καιρό.',
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
  },
  relatedTitle: 'Σχετικές σελίδες',
};

const en: SeoServicesPillarCopy = {
  eyebrow: 'SEO services',
  h1: 'SEO services for businesses that need enquiries, not reports',
  answer:
    'SEO for a business is continuous work on three fronts: the technical health of the site, content that matches what people actually search, and trust signals off the site. Ours starts with an audit and a keyword-to-page map, runs monthly from {{ENTRY_SEO}}, and is measured in clicks and enquiries rather than rankings that bring nobody.',
  metaTitle: 'SEO Services for Businesses',
  metaDescription:
    'SEO services for businesses in Greece and beyond: technical SEO, local SEO, content and GEO/AEO. What each includes, how it is priced, and how it is measured.',
  primaryKeyword: 'SEO services',
  includes: {
    title: 'What a serious SEO service includes',
    intro:
      'If a proposal does not say what happens each month, it is not a proposal. These are the five parts of the work, and none of them functions alone.',
    items: [
      {
        title: 'Technical SEO',
        body:
          'Whatever stops Google reading and indexing the pages that sell: indexation errors, canonicals, speed and Core Web Vitals, structured data that matches what is visible, internal link architecture. It comes first because everything else is built on it.',
      },
      {
        title: 'Keyword-to-page mapping',
        body:
          'One commercial cluster, one page. Without it, two of your pages compete for the same search and neither wins. We start from your own Search Console data rather than a generic volume export.',
      },
      {
        title: 'Content with commercial intent',
        body:
          'Service pages, area pages and articles that answer the questions someone asks just before requesting a quote - written for your market, with examples from your sector.',
      },
      {
        title: 'Local SEO',
        body:
          'Google Business Profile, consistent contact details, reviews and citations, and area pages where there is real local intent. For a business with premises or a service area, this is where the phone call is won.',
      },
      {
        title: 'GEO and AEO',
        body:
          'Answers written in a shape an answer engine can quote, clear company facts, and structured data that agrees with the page. No engine guarantees it will cite you; what you control is whether your content can be used.',
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
          'Clear the technical blockers, rewrite the pages that can convert, sort Google Business Profile and local signals, publish the first content. This is where the first position movement shows.',
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
  pricing: {
    title: 'What it costs',
    intro:
      'Pricing is public. SEO is priced on competition, search demand and content volume - not on a keyword count.',
    note:
      'All prices are net of 24% Greek VAT. The minimum engagement is 6 months, monthly thereafter: below that there is not enough time to tell whether the work is paying.',
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
        'First position movement usually shows in 2 to 4 months. A material difference in enquiries takes 6 months or more, and longer in competitive sectors. That is why the minimum engagement is 6 months: below that there is not enough evidence to judge it.',
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
        'Ads buy visibility now and stop when the budget stops. SEO builds positions that persist but takes time. Most businesses do best with both: Ads for immediate demand, SEO for an acquisition cost that falls over time.',
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
  },
  relatedTitle: 'Related pages',
};

export function getSeoServicesPillarCopy(locale: SiteLocale): SeoServicesPillarCopy {
  return locale === 'el' ? el : en;
}
