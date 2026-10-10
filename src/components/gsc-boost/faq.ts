import { c, type Copy } from "./copy";
import { CREDIT_COSTS } from "./plans";

/**
 * GSC Boost FAQs, adapted from the app's src/marketing/content/faq.tsx.
 * Answers are plain text so the visible copy and the FAQPage schema are the
 * same string. A trailing link, when there is one, is rendered after it.
 */

export interface FaqLink {
  /** "site" paths are localised website paths; "app" paths open the app. */
  readonly kind: "site" | "app";
  readonly path: string;
  readonly label: Copy;
}

export interface GscFaqItem {
  readonly q: Copy;
  readonly a: Copy;
  readonly link?: FaqLink;
}

const K = CREDIT_COSTS;

export const HOME_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("What access do you need to my Google account?", "Τι πρόσβαση χρειάζεστε στον λογαριασμό μου Google;"),
    a: c(
      "Read-only access to Google Search Console and Google Analytics, which you approve on Google’s own consent screen. GSC Boost can read your performance data; it can’t change settings, submit sitemaps, remove URLs or manage users. You can revoke access at any time from your Google Account.",
      "Πρόσβαση μόνο για ανάγνωση στο Google Search Console και στο Google Analytics, την οποία εγκρίνετε στην οθόνη συναίνεσης της ίδιας της Google. Το GSC Boost μπορεί να διαβάσει τα δεδομένα απόδοσής σας· δεν μπορεί να αλλάξει ρυθμίσεις, να υποβάλει sitemaps, να αφαιρέσει URL ή να διαχειριστεί χρήστες. Μπορείτε να ανακαλέσετε την πρόσβαση οποιαδήποτε στιγμή από τον Λογαριασμό σας Google.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
  {
    q: c("How are the click estimates calculated?", "Πώς υπολογίζονται οι εκτιμήσεις κλικ;"),
    a: c(
      "From your own data. For each query or page, GSC Boost compares its CTR and position with a CTR curve fitted to your site’s non-brand queries, then estimates the extra clicks a fix would bring over a month. The estimates are deliberately conservative, and every one shows the position, impressions and CTR it is based on.",
      "Από τα δικά σας δεδομένα. Για κάθε ερώτημα ή σελίδα, το GSC Boost συγκρίνει το CTR και τη θέση του με μια καμπύλη CTR προσαρμοσμένη στα non-brand ερωτήματα του ιστότοπού σας και εκτιμά τα επιπλέον κλικ που θα έφερνε μια διόρθωση μέσα σε έναν μήνα. Οι εκτιμήσεις είναι σκόπιμα συντηρητικές και η καθεμία δείχνει τη θέση, τις εμφανίσεις και το CTR στα οποία βασίζεται.",
    ),
  },
  {
    q: c("Do I need a credit card to try it?", "Χρειάζομαι πιστωτική κάρτα για να το δοκιμάσω;"),
    a: c(
      "No. The live demo runs the whole product on sample data, with no account or card. To work on your own sites, you connect Google and choose a plan.",
      "Όχι. Η ζωντανή επίδειξη τρέχει ολόκληρο το προϊόν με δείγμα δεδομένων, χωρίς λογαριασμό ή κάρτα. Για να δουλέψετε στους δικούς σας ιστοτόπους, συνδέετε τη Google και επιλέγετε πακέτο.",
    ),
    link: { kind: "app", path: "/demo", label: c("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη") },
  },
  {
    q: c("What are credits used for?", "Σε τι χρησιμοποιούνται οι μονάδες;"),
    a: c(
      `Search Console analysis, the opportunity engine and client reports cost nothing. Credits pay for third-party data and AI: a keyword research lookup is ${K.keyword_research} credits, a site audit ${K.site_audit}, an AI content brief ${K.ai_content_brief} and an assistant question ${K.seo_ai_chat}. Every plan includes a monthly allowance, and you can top up any time.`,
      `Η ανάλυση Search Console, η μηχανή ευκαιριών και οι αναφορές πελατών δεν κοστίζουν τίποτα. Οι μονάδες καλύπτουν δεδομένα τρίτων και AI: μια αναζήτηση στην έρευνα λέξεων-κλειδιών κοστίζει ${K.keyword_research} μονάδες, ένας έλεγχος ιστότοπου ${K.site_audit}, ένα AI content brief ${K.ai_content_brief} και μια ερώτηση στον βοηθό ${K.seo_ai_chat}. Κάθε πακέτο περιλαμβάνει μηνιαίο απόθεμα μονάδων και μπορείτε να αγοράσετε περισσότερες όποτε θέλετε.`,
    ),
    link: { kind: "site", path: "/platform/pricing#credits", label: c("See every credit cost", "Δείτε όλα τα κόστη σε μονάδες") },
  },
  {
    q: c("Is my data used to train AI models?", "Χρησιμοποιούνται τα δεδομένα μου για την εκπαίδευση μοντέλων AI;"),
    a: c(
      "No. Your Google data is never used to train AI models and never sold. When you use an AI feature, the model provider receives only what that request needs.",
      "Όχι. Τα δεδομένα σας από τη Google δεν χρησιμοποιούνται ποτέ για την εκπαίδευση μοντέλων AI και δεν πωλούνται ποτέ. Όταν χρησιμοποιείτε μια λειτουργία AI, ο πάροχος του μοντέλου λαμβάνει μόνο ό,τι χρειάζεται το συγκεκριμένο αίτημα.",
    ),
    link: { kind: "app", path: "/privacy", label: c("Privacy policy", "Πολιτική απορρήτου") },
  },
  {
    q: c("Does it work for agencies with many sites?", "Είναι κατάλληλο για agencies με πολλούς ιστοτόπους;"),
    a: c(
      "Yes. The Agency plan adds a client CRM, pipeline, tasks and white-label reports, and the site switcher is built for accounts with 90+ Search Console properties.",
      "Ναι. Το πακέτο Agency προσθέτει CRM πελατών, pipeline, εργασίες και white-label αναφορές, ενώ η εναλλαγή ιστοτόπων είναι σχεδιασμένη για λογαριασμούς με 90+ ιδιότητες στο Search Console.",
    ),
    link: { kind: "site", path: "/platform/for/agencies", label: c("See the agency workspace", "Δείτε τον χώρο εργασίας για agencies") },
  },
  {
    q: c("Can I cancel anytime?", "Μπορώ να ακυρώσω οποτεδήποτε;"),
    a: c(
      "Yes. You can change or cancel your plan from Billing at any time, and you keep access until the end of the period you’ve paid for.",
      "Ναι. Μπορείτε να αλλάξετε ή να ακυρώσετε το πακέτο σας από τη Χρέωση οποιαδήποτε στιγμή και διατηρείτε την πρόσβαση μέχρι το τέλος της περιόδου που έχετε πληρώσει.",
    ),
  },
  {
    q: c("Is GSC Boost the same company as the AnotherSEOGuru agency?", "Το GSC Boost είναι της ίδιας εταιρείας με το AnotherSEOGuru;"),
    a: c(
      "Yes. GSC Boost is the software our SEO team built and uses on client work every day. Inside the app it carries the AnotherSEOGuru name. If you would rather have us do the work, start with a free audit instead.",
      "Ναι. Το GSC Boost είναι το λογισμικό που έφτιαξε η ομάδα SEO μας και χρησιμοποιεί καθημερινά στη δουλειά για πελάτες. Μέσα στην εφαρμογή εμφανίζεται με το όνομα AnotherSEOGuru. Αν προτιμάτε να κάνουμε εμείς τη δουλειά, ξεκινήστε με έναν δωρεάν έλεγχο.",
    ),
    link: { kind: "site", path: "/get-started#free-audit", label: c("Get a free SEO audit", "Δωρεάν έλεγχος SEO") },
  },
];

export const PRICING_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("What is a credit?", "Τι είναι μια μονάδα;"),
    a: c(
      `A unit for paid work: third-party data (keyword volumes, SERPs, backlinks, crawls) and AI. Search Console analysis, opportunities and client reports cost 0 credits. Every action that uses credits shows its cost on the button before you run it, for example “Start import” shows ${K.website_import} credit per import.`,
      `Μια μονάδα χρέωσης για εργασίες με κόστος: δεδομένα τρίτων (όγκοι λέξεων-κλειδιών, SERPs, backlinks, crawls) και AI. Η ανάλυση Search Console, οι ευκαιρίες και οι αναφορές πελατών κοστίζουν 0 μονάδες. Κάθε ενέργεια που χρησιμοποιεί μονάδες δείχνει το κόστος της πάνω στο κουμπί πριν την εκτελέσετε· για παράδειγμα, η «Έναρξη εισαγωγής» δείχνει ${K.website_import} μονάδα ανά εισαγωγή.`,
    ),
  },
  {
    q: c("Are there add-ons?", "Υπάρχουν πρόσθετα (add-ons);"),
    a: c(
      "No. Everything is included, with no add-ons: a plan’s price covers every feature listed for it, with no paid toolkits or per-feature upgrades on top. Credit packs are optional top-ups for busy months, not features.",
      "Όχι. Όλα περιλαμβάνονται, χωρίς add-ons: η τιμή κάθε πακέτου καλύπτει όλες τις λειτουργίες που αναφέρει, χωρίς επιπλέον χρεώσεις για εργαλεία ή αναβαθμίσεις ανά λειτουργία. Τα πακέτα μονάδων είναι προαιρετική ενίσχυση για τους πιο φορτωμένους μήνες, όχι λειτουργίες.",
    ),
  },
  {
    q: c("What happens if I run out of credits?", "Τι γίνεται αν μου τελειώσουν οι μονάδες;"),
    a: c(
      "Search Console features keep working, because they don’t use credits. Paid actions pause until your monthly allowance renews or you add a credit pack.",
      "Οι λειτουργίες του Search Console συνεχίζουν να δουλεύουν, γιατί δεν χρησιμοποιούν μονάδες. Οι ενέργειες με χρέωση σταματούν προσωρινά μέχρι να ανανεωθεί το μηνιαίο σας απόθεμα ή να προσθέσετε ένα πακέτο μονάδων.",
    ),
  },
  {
    q: c("Can I try it before I pay?", "Μπορώ να το δοκιμάσω πριν πληρώσω;"),
    a: c(
      "Yes. The live demo runs the full product on sample data for three fictional sites, with no account or card required. When you’re ready, connect Google and pick a plan.",
      "Ναι. Η ζωντανή επίδειξη τρέχει ολόκληρο το προϊόν με δείγμα δεδομένων για τρεις φανταστικούς ιστοτόπους, χωρίς λογαριασμό ή κάρτα. Όταν είστε έτοιμοι, συνδέστε τη Google και επιλέξτε πακέτο.",
    ),
    link: { kind: "app", path: "/demo", label: c("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη") },
  },
  {
    q: c("How does yearly billing work?", "Πώς λειτουργεί η ετήσια χρέωση;"),
    a: c(
      "You pay for ten months and get twelve. Yearly plans are billed once a year, up front.",
      "Πληρώνετε δέκα μήνες και παίρνετε δώδεκα. Τα ετήσια πακέτα χρεώνονται μία φορά τον χρόνο, προκαταβολικά.",
    ),
  },
  {
    q: c("What counts as a site?", "Τι θεωρείται ιστότοπος;"),
    a: c(
      "A site is a website you set up as a project in GSC Boost, usually one Search Console property, with its own settings, brand terms, competitors and reports.",
      "Ιστότοπος είναι ένας ιστότοπος που ρυθμίζετε ως έργο στο GSC Boost, συνήθως μία ιδιότητα του Search Console, με δικές του ρυθμίσεις, όρους επωνυμίας, ανταγωνιστές και αναφορές.",
    ),
  },
  {
    q: c("Can I change or cancel my plan?", "Μπορώ να αλλάξω ή να ακυρώσω το πακέτο μου;"),
    a: c(
      "Yes. Upgrade, downgrade or cancel from Billing at any time. If you cancel, you keep access until the end of the current billing period.",
      "Ναι. Αναβαθμίστε, υποβαθμίστε ή ακυρώστε από τη Χρέωση οποιαδήποτε στιγμή. Αν ακυρώσετε, διατηρείτε την πρόσβαση μέχρι το τέλος της τρέχουσας περιόδου χρέωσης.",
    ),
  },
  {
    q: c("How do payments and invoices work?", "Πώς λειτουργούν οι πληρωμές και τα τιμολόγια;"),
    a: c(
      "Payments are processed by Stripe; we never see or store your full card number. Invoices for every charge are available from Billing.",
      "Οι πληρωμές γίνονται μέσω Stripe· δεν βλέπουμε και δεν αποθηκεύουμε ποτέ τον πλήρη αριθμό της κάρτας σας. Τα τιμολόγια για κάθε χρέωση είναι διαθέσιμα στη Χρέωση.",
    ),
  },
  {
    q: c("Is this the same as your agency SEO packages?", "Είναι το ίδιο με τα πακέτα SEO της εταιρείας σας;"),
    a: c(
      "No. These are software plans: you use GSC Boost and do the work yourself. Our agency packages are a separate service where our team does the SEO for you, priced on the main pricing page.",
      "Όχι. Αυτά είναι πακέτα λογισμικού: χρησιμοποιείτε το GSC Boost και κάνετε τη δουλειά μόνοι σας. Τα πακέτα της εταιρείας μας είναι ξεχωριστή υπηρεσία όπου η ομάδα μας αναλαμβάνει το SEO για εσάς, με τιμές στη βασική σελίδα τιμών.",
    ),
    link: { kind: "site", path: "/pricing", label: c("Agency SEO packages", "Πακέτα SEO της εταιρείας") },
  },
];

export const AGENCY_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("How many client sites can I manage?", "Πόσους ιστοτόπους πελατών μπορώ να διαχειρίζομαι;"),
    a: c(
      "The Agency plan includes 30 sites and 10 team seats. The site switcher lists every Search Console property your Google account can access, and it is built to stay fast with 90+ of them.",
      "Το πακέτο Agency περιλαμβάνει 30 ιστοτόπους και 10 θέσεις χρηστών. Η εναλλαγή ιστοτόπων εμφανίζει κάθε ιδιότητα του Search Console στην οποία έχει πρόσβαση ο λογαριασμός σας Google και παραμένει γρήγορη ακόμη και με 90+ ιδιότητες.",
    ),
  },
  {
    q: c("Can I put my own branding on reports?", "Μπορώ να βάλω το δικό μου branding στις αναφορές;"),
    a: c(
      "Yes. On the Agency plan, client reports carry your logo and name instead of ours, and they print cleanly or save as PDF for your client portal or monthly email.",
      "Ναι. Στο πακέτο Agency, οι αναφορές πελατών φέρουν το δικό σας λογότυπο και όνομα αντί για τα δικά μας, και τυπώνονται καθαρά ή αποθηκεύονται ως PDF για το portal πελατών ή το μηνιαίο σας email.",
    ),
  },
  {
    q: c("Do reports cost credits?", "Οι αναφορές κοστίζουν μονάδες;"),
    a: c(
      "No. Client reports are built from Search Console data, which never uses credits.",
      "Όχι. Οι αναφορές πελατών βασίζονται σε δεδομένα του Search Console, που δεν χρησιμοποιούν ποτέ μονάδες.",
    ),
  },
  {
    q: c("Do my clients need an account?", "Χρειάζονται λογαριασμό οι πελάτες μου;"),
    a: c(
      "No. Reports are made to be shared: print them or save them as PDF and send them however you already do. Clients never need to log in.",
      "Όχι. Οι αναφορές είναι φτιαγμένες για να μοιράζονται: τυπώστε τις ή αποθηκεύστε τις ως PDF και στείλτε τις όπως κάνετε ήδη. Οι πελάτες δεν χρειάζεται ποτέ να συνδεθούν.",
    ),
  },
  {
    q: c("Can your team help with client work too?", "Μπορεί η ομάδα σας να βοηθήσει και στη δουλειά για πελάτες;"),
    a: c(
      "Yes. If you need execution bandwidth, our own SEO team can take on technical fixes, content or local SEO for your clients. Start with a free audit of one client site and we’ll quote a fixed price.",
      "Ναι. Αν χρειάζεστε επιπλέον χέρια, η δική μας ομάδα SEO μπορεί να αναλάβει τεχνικές διορθώσεις, περιεχόμενο ή τοπικό SEO για τους πελάτες σας. Ξεκινήστε με δωρεάν έλεγχο ενός ιστότοπου πελάτη και θα σας δώσουμε σταθερή τιμή.",
    ),
    link: { kind: "site", path: "/get-started#free-audit", label: c("Get a free SEO audit", "Δωρεάν έλεγχος SEO") },
  },
];
