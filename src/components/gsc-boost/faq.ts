import { c, type Copy } from "./copy";
import { CREDIT_COSTS } from "./plans";

/**
 * AnotherSEOGuru App FAQs, adapted from the app's src/marketing/content/faq.tsx.
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
      "You grant read-only access to Search Console and, if you connect it, Google Analytics. That lets the app read performance reports. Settings, sitemaps, URLs and user permissions stay under your control. You can disconnect it in your Google Account at any time.",
      "Δίνετε πρόσβαση μόνο για ανάγνωση στο Search Console και, αν το συνδέσετε, στο Google Analytics. Η εφαρμογή διαβάζει τις αναφορές απόδοσης. Εσείς διαχειρίζεστε τις ρυθμίσεις, τα sitemaps, τις διευθύνσεις και τους χρήστες. Μπορείτε να ανακαλέσετε την πρόσβαση από τον λογαριασμό σας Google όποτε θέλετε.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
  {
    q: c("How are the click estimates calculated?", "Πώς υπολογίζονται οι εκτιμήσεις κλικ;"),
    a: c(
      "The app uses searches that leave out your brand name to learn the click-through rate your site usually sees at each position. It compares that rate with the page’s actual rate and impressions to estimate how many more clicks it could receive in a month. You can inspect the figures behind each suggestion.",
      "Η εφαρμογή εξετάζει αναζητήσεις χωρίς την επωνυμία σας και υπολογίζει τι ποσοστό κλικ παίρνουν συνήθως οι σελίδες σας σε κάθε θέση. Με βάση αυτό το ποσοστό, τις πραγματικές εμφανίσεις και τα κλικ της σελίδας, εκτιμά πόσα επιπλέον κλικ θα μπορούσε να πάρει σε έναν μήνα. Μπορείτε να δείτε τα στοιχεία πίσω από κάθε πρόταση.",
    ),
  },
  {
    q: c("Do I need a credit card to try it?", "Χρειάζομαι πιστωτική κάρτα για να το δοκιμάσω;"),
    a: c(
      "No card is required. A new account gives you seven days to try Pro on your own site. You can then use the free plan or choose a paid one. To look around before signing up, open the demo with sample data.",
      "Μπορείτε να δοκιμάσετε το Pro στη δική σας ιστοσελίδα για επτά ημέρες χωρίς κάρτα. Στη συνέχεια μπορείτε να χρησιμοποιήσετε το δωρεάν πακέτο ή να επιλέξετε συνδρομή. Αν θέλετε πρώτα να δείτε την εφαρμογή, ανοίξτε τη δοκιμαστική έκδοση με ενδεικτικά δεδομένα χωρίς εγγραφή.",
    ),
    link: { kind: "app", path: "/demo", label: c("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη") },
  },
  {
    q: c("What are credits used for?", "Σε τι χρησιμοποιούνται οι μονάδες;"),
    a: c(
      "Each plan includes a monthly allowance for actions such as importing a site or checking a live ranking. The app shows the cost before you start. Search Console reports and suggested fixes use no credits. Questions for Aster AI have a separate daily limit.",
      "Κάθε μήνα έχετε στη διάθεσή σας μονάδες για εργασίες όπως η εισαγωγή ιστοσελίδας ή ο έλεγχος της σημερινής θέσης μιας λέξης-κλειδιού. Βλέπετε το κόστος πριν ξεκινήσετε. Οι αναφορές του Search Console και οι προτεινόμενες διορθώσεις δεν καταναλώνουν μονάδες. Για τις ερωτήσεις στον Aster AI ισχύει ξεχωριστό ημερήσιο όριο.",
    ),
    link: { kind: "site", path: "/pricing#credits", label: c("See credit examples", "Δείτε παραδείγματα χρέωσης") },
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
    q: c("Does it work for agencies with many sites?", "Μπορώ να διαχειρίζομαι τις ιστοσελίδες των πελατών μου;"),
    a: c(
      "The Agency plan covers up to 30 client sites and five team members. Switch between sites in the same account and send each client a report with your agency’s name and logo.",
      "Το Agency καλύπτει έως 30 ιστοσελίδες πελατών και πέντε μέλη της ομάδας σας. Αλλάζετε ιστοσελίδα μέσα από τον ίδιο λογαριασμό και στέλνετε σε κάθε πελάτη αναφορά με την επωνυμία και το λογότυπό σας.",
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
    q: c("Is AnotherSEOGuru App the same company as the AnotherSEOGuru agency?", "Η ομάδα σας χρησιμοποιεί το AnotherSEOGuru App και στα έργα πελατών;"),
    a: c(
      "Yes. Our SEO team built AnotherSEOGuru App and uses it on client projects. A software plan gives you the tools to manage SEO yourself. If you want our team to do the work, request a free audit to start the conversation.",
      "Ναι. Η ομάδα SEO μας δημιούργησε το AnotherSEOGuru App και το χρησιμοποιεί στα έργα πελατών. Με τη συνδρομή διαχειρίζεστε εσείς το SEO. Αν θέλετε να αναλάβει η ομάδα μας τη δουλειά, μπορείτε να ζητήσετε δωρεάν έλεγχο.",
    ),
    link: { kind: "site", path: "/get-started#free-audit", label: c("Get a free SEO audit", "Δωρεάν έλεγχος SEO") },
  },
];

export const PRICING_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("What is a credit?", "Τι είναι μια μονάδα;"),
    a: c(
      `Credits are the allowance your plan gives you for metered actions. For example, importing a site uses ${K.website_import} credit. Look at the button before starting to see the cost. Reading your Search Console reports uses no credits.`,
      `Οι μονάδες περιλαμβάνονται στο πακέτο σας και χρησιμοποιούνται για συγκεκριμένες εργασίες. Για παράδειγμα, η εισαγωγή μιας ιστοσελίδας χρησιμοποιεί ${K.website_import} μονάδα. Το κόστος φαίνεται στο κουμπί πριν ξεκινήσετε. Οι αναφορές του Search Console δεν καταναλώνουν μονάδες.`,
    ),
  },
  {
    q: c("Are there add-ons?", "Υπάρχουν πρόσθετα (add-ons);"),
    a: c(
      "Yes. On a paid plan you can add sites, tracked keywords, AI questions to monitor, monthly credits or your own branding on reports. You can also buy a one-time credit pack when you need one.",
      "Ναι. Σε κάθε συνδρομή μπορείτε να προσθέσετε ιστοσελίδες, λέξεις-κλειδιά, ερωτήσεις για παρακολούθηση σε AI, μηνιαίες μονάδες ή τη δική σας επωνυμία στις αναφορές. Αν χρειάζεστε επιπλέον μονάδες για έναν μόνο μήνα, μπορείτε να αγοράσετε ένα πακέτο εφάπαξ.",
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
      "Yes. Explore the sample account without signing up, or create an account to try Pro for seven days on your own site. You don’t need a card, and the free plan is available after the trial.",
      "Ναι. Μπορείτε να δείτε έναν δοκιμαστικό λογαριασμό χωρίς εγγραφή. Για να δοκιμάσετε το Pro στη δική σας ιστοσελίδα, ανοίξτε λογαριασμό. Η δοκιμή διαρκεί επτά ημέρες, χωρίς κάρτα. Μετά έχετε και την επιλογή του δωρεάν πακέτου.",
    ),
    link: { kind: "app", path: "/demo", label: c("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη") },
  },
  {
    q: c("How does yearly billing work?", "Πώς λειτουργεί η ετήσια χρέωση;"),
    a: c(
      "You make one payment for the full year. It costs the same as ten monthly payments.",
      "Προπληρώνετε όλο το έτος και το συνολικό ποσό ισούται με δέκα μηνιαίες συνδρομές.",
    ),
  },
  {
    q: c("What counts as a site?", "Τι θεωρείται ιστότοπος;"),
    a: c(
      "Each website you add as a project counts as one site. It usually corresponds to one Search Console property and has its own settings, competitors and reports.",
      "Κάθε ιστοσελίδα που προσθέτετε ως ξεχωριστό έργο μετρά μία φορά. Συνήθως αντιστοιχεί σε μία ιδιοκτησία στο Search Console και έχει δικές της ρυθμίσεις, ανταγωνιστές και αναφορές.",
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
      "Stripe processes payments. We don’t see or store your full card number. Download an invoice for any charge from Billing in your account.",
      "Την πληρωμή αναλαμβάνει η Stripe. Δεν βλέπουμε ούτε αποθηκεύουμε τον πλήρη αριθμό της κάρτας σας. Μπορείτε να κατεβάσετε το τιμολόγιο κάθε χρέωσης από την ενότητα Χρέωση στον λογαριασμό σας.",
    ),
  },
  {
    q: c("Is this the same as your agency SEO packages?", "Είναι το ίδιο με τα πακέτα SEO της εταιρείας σας;"),
    a: c(
      "The app subscription gives you the tools to do the work. If you want our team to plan and carry out the changes, see the separate managed SEO packages.",
      "Με τη συνδρομή στην εφαρμογή έχετε τα εργαλεία για να κάνετε εσείς τις αλλαγές. Αν θέλετε να αναλάβουμε τον σχεδιασμό και την υλοποίηση, δείτε τα ξεχωριστά πακέτα διαχείρισης SEO.",
    ),
    link: { kind: "site", path: "/ypiresies/times", label: c("Agency SEO packages", "Πακέτα SEO της εταιρείας") },
  },
];

export const AGENCY_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("How many client sites can I manage?", "Πόσους ιστοτόπους πελατών μπορώ να διαχειρίζομαι;"),
    a: c(
      "The Agency plan includes 30 sites and 5 team seats. The site switcher lists every Search Console property your Google account can access, and it is built to stay fast with 90+ of them.",
      "Το πακέτο Agency περιλαμβάνει 30 ιστοτόπους και 5 θέσεις χρηστών. Η εναλλαγή ιστοτόπων εμφανίζει κάθε ιδιότητά του Search Console στην οποία έχει πρόσβαση ο λογαριασμός σας Google και παραμένει γρήγορη ακόμη και με 90+ ιδιότητες.",
    ),
  },
  {
    q: c("Can I put my own branding on reports?", "Μπορώ να βάλω το δικό μου branding στις αναφορές;"),
    a: c(
      "Yes. On the Agency plan, client reports carry your logo and name instead of ours, and they print cleanly or save as PDF for your monthly client email.",
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
