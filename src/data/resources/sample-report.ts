import type { Block } from "@/data/help";

/**
 * /resources/sample-seo-report: a full monthly client report on sample data,
 * printable as a PDF, with an explanation of every section. It owns
 * "sample seo report" and "seo report example"; the written template stays on
 * /resources/seo-report-template.
 */

export interface SampleReportMeta {
  readonly slug: string;
  readonly title: string;
  readonly seoTitle: string;
  readonly description: string;
  readonly lead: string;
  readonly primaryKeyword: string;
  readonly eyebrow: string;
  readonly download: string;
  readonly ctaTitle: string;
  readonly ctaText: string;
  readonly signup: string;
  readonly demo: string;
  readonly related: string;
}

export const SAMPLE_REPORT_SLUG = "sample-seo-report";
export const SAMPLE_REPORT_PUBLISHED = "2026-11-08";
export const SAMPLE_REPORT_UPDATED = "2026-11-14";

export const SAMPLE_REPORT: SampleReportMeta = {
  slug: SAMPLE_REPORT_SLUG,
  title: "A sample monthly SEO report for a client",
  seoTitle: "Sample SEO Report: Monthly Example + PDF",
  description:
    "See a complete sample SEO report: summary, KPIs, clicks trend, rankings, top queries, wins and losses, work done and next steps. Download the PDF without signing up.",
  lead: "What would you tell a client if clicks rose overall but a key service page slipped? See how a monthly report handles both. The dental clinic and its figures are fictional. Download the full report as a PDF without signing up.",
  primaryKeyword: "sample seo report",
  eyebrow: "Example report",
  download: "Download the sample PDF",
  ctaTitle: "Build a report for your own client",
  ctaText:
    "Choose a site and month to fill in the Search Console figures. Add your own summary of the work and the next steps. You can export a PDF or schedule a monthly email. White-label branding is included in Agency and available as a paid add-on.",
  signup: "Sign up free",
  demo: "Open the report in the demo",
  related: "Related guides",
};

export const SAMPLE_REPORT_EL: SampleReportMeta = {
  slug: SAMPLE_REPORT_SLUG,
  title: "Δείγμα μηνιαίας αναφοράς SEO για πελάτη",
  seoTitle: "Δείγμα αναφοράς SEO (μηνιαίο, σε PDF)",
  description:
    "Δείτε ένα πλήρες δείγμα μηνιαίας αναφοράς SEO: σύνοψη, KPIs, κλικ, θέσεις, κορυφαίες αναζητήσεις, εργασίες και επόμενα βήματα. Κατεβάστε το PDF χωρίς εγγραφή.",
  lead: "Πώς εξηγείτε σε έναν πελάτη ότι τα συνολικά κλικ αυξήθηκαν αλλά μια σημαντική σελίδα έχασε επισκέψεις; Δείτε πώς παρουσιάζονται και τα δύο σε μια μηνιαία αναφορά. Το οδοντιατρείο και τα στοιχεία είναι υποθετικά. Κατεβάστε ολόκληρη την αναφορά σε PDF χωρίς εγγραφή.",
  primaryKeyword: "δείγμα αναφοράς seo",
  eyebrow: "Παράδειγμα αναφοράς",
  download: "Κατεβάστε το δείγμα PDF",
  ctaTitle: "Ετοιμάστε μια αναφορά για τον δικό σας πελάτη",
  ctaText:
    "Επιλέξτε ιστοσελίδα και μήνα για να συμπληρωθούν τα στοιχεία από το Search Console. Προσθέστε τι δουλειά κάνατε και τι προτείνετε για τον επόμενο μήνα. Μπορείτε να κατεβάσετε την αναφορά σε PDF ή να προγραμματίσετε την αποστολή της. Η χρήση του δικού σας λογότυπου περιλαμβάνεται στο Agency και διατίθεται ως πρόσθετη επιλογή επί πληρωμή.",
  signup: "Εγγραφή δωρεάν",
  demo: "Δείτε την αναφορά στο demo",
  related: "Σχετικοί οδηγοί",
};

export const SAMPLE_REPORT_BLOCKS: ReadonlyArray<Block> = [
  { type: "h2", id: "what-is-in-it", text: "What is in this sample SEO report" },
  {
    type: "p",
    text: "**A good monthly SEO report answers three questions in the first minute: did organic search grow the business, why, and what happens next.** Everything else supports those answers. The sample above follows that order: a written summary with four KPIs, the trend, the ranking spread, the queries and pages behind the change, wins and losses with reasons, the work shipped, sized opportunities and next steps.",
  },
  {
    type: "table",
    head: ["Section", "Question it answers", "Why it is there"],
    rows: [
      ["Summary", "What happened and why?", "Most clients read only this. Three sentences: result, main cause, next focus."],
      ["KPIs", "Is SEO bringing in business?", "Non-branded clicks and leads first, each compared with last month and last year."],
      ["Clicks over time", "Is the growth real or seasonal?", "13 months on one chart shows seasonality, and the non-branded line shows what SEO earned."],
      ["Ranking spread", "Are rankings improving overall?", "Counts of queries in positions 1-3, 4-10 and 11-20 are easier to read than one average position."],
      ["Top queries and pages", "Where does the traffic come from?", "Names the searches and pages that matter, in the client's own words."],
      ["Wins and losses", "What moved, and why?", "Every big change gets a reason, including the bad ones."],
      ["Completed work", "What did we pay for?", "Links each piece of work to what it earned so far."],
      ["Opportunities", "Where is the next growth?", "Sized in extra clicks per month, as a range, so priorities are clear."],
      ["Next steps", "What happens next month?", "Three items, highest priority first. This is what the client agrees to."],
    ],
  },
  { type: "h2", id: "what-makes-it-good", text: "What makes an SEO report example worth copying" },
  {
    type: "list",
    items: [
      "**It leads with non-branded clicks.** Brand searches respond to ads and word of mouth. Splitting them out shows what SEO earned, as explained in [branded vs non-branded keywords](/en/resources/branded-vs-non-branded-keywords).",
      "**Every number has a comparison.** Last month and the same month last year, so a seasonal dip is not mistaken for a problem.",
      "**It explains drops.** The sample says why “invisalign cost” lost clicks and what will be done. Clients trust reports that admit bad news.",
      "**It ties work to results.** The emergency page shipped on 8 October and earned 298 clicks. That one line justifies the retainer.",
      "**It is short.** One page of summary, then supporting sections. Long reports full of charts are skimmed and forgotten.",
      "**It names the data source.** “Google Search Console” on the report lets the client verify every figure.",
    ],
  },
  { type: "h2", id: "how-to-make-yours", text: "How to make this report for your own client" },
  {
    type: "steps",
    howTo: {
      name: "Create a monthly SEO client report from Google Search Console",
      description: "Build a branded monthly SEO report like the sample, from live Search Console data, in AnotherSEOGuru App.",
    },
    items: [
      { title: "Connect Search Console", text: "Sign in with Google and grant read-only access. Every property your account can see appears in the site switcher." },
      { title: "Open Reports and pick the client", text: "Choose the site, the month and the comparison (previous period or last year)." },
      { title: "Choose the sections", text: "Keep the ones your client reads. Summary, KPIs, trend, queries, pages, wins and losses, opportunities, completed work and next steps are all available." },
      { title: "Add your branding", text: "Your agency name, logo and colour, plus the client's logo. White-label branding is part of the Agency plan." },
      { title: "Write the summary", text: "Three sentences in your own words. This is the part clients read first." },
      { title: "Send it", text: "Download the PDF, email it from the app, or schedule it to go out every month or every Monday." },
    ],
  },
  {
    type: "p",
    text: "Prefer to write it by hand? The [SEO report template](/en/resources/seo-report-template) gives the same structure as a fill-in document, and [SEO KPIs](/en/resources/seo-kpis) explains which metrics belong in it. For agencies sending many of these each month, see [white-label SEO reports](/en/platform/white-label-reports).",
  },
  {
    type: "faq",
    items: [
      { q: "What should a monthly SEO report include?", a: "A short written summary, non-branded clicks and leads compared with last month and last year, a 13-month clicks trend, the ranking spread, top queries and pages, wins and losses with reasons, the work completed, sized opportunities and next month's priorities." },
      { q: "Can I download this sample SEO report as a PDF?", a: "Yes. Choose Download the sample PDF above the report. The English file opens without an account and includes the report for the fictional dental practice." },
      { q: "Are the numbers in the sample real?", a: "No. Northside Dental is an invented clinic and every figure is sample data. The structure and the sections are the ones AnotherSEOGuru App builds from a real Search Console property." },
      { q: "How long should an SEO report be?", a: "Long enough to answer what happened, why and what is next. For most clients that is one page of summary and KPIs plus three to six supporting sections. Remove any section that has not changed a decision in three months." },
      { q: "Is there a free SEO report generator?", a: "AnotherSEOGuru App builds this report from Search Console data and its Search Console reports cost no credits. You can try it on sample data in the live demo without signing up." },
    ],
  },
];

export const SAMPLE_REPORT_BLOCKS_EL: ReadonlyArray<Block> = [
  { type: "h2", id: "what-is-in-it", text: "Τι περιέχει αυτό το δείγμα αναφοράς SEO" },
  {
    type: "p",
    text: "**Μια καλή μηνιαία αναφορά SEO απαντά σε τρία ερωτήματα μέσα στο πρώτο λεπτό: αν η οργανική αναζήτηση έφερε δουλειά, γιατί, και τι ακολουθεί.** Όλα τα υπόλοιπα στηρίζουν αυτές τις απαντήσεις. Το δείγμα ακολουθεί αυτή τη σειρά: γραπτή σύνοψη με τέσσερα KPIs, την εξέλιξη, την κατανομή θέσεων, τις αναζητήσεις και σελίδες πίσω από την αλλαγή, κέρδη και απώλειες με αιτίες, τις εργασίες, τις ευκαιρίες και τα επόμενα βήματα.",
  },
  {
    type: "table",
    head: ["Ενότητα", "Σε τι απαντά", "Γιατί υπάρχει"],
    rows: [
      ["Σύνοψη", "Τι έγινε και γιατί;", "Οι περισσότεροι πελάτες διαβάζουν μόνο αυτή. Τρεις προτάσεις: αποτέλεσμα, αιτία, επόμενη εστίαση."],
      ["KPIs", "Φέρνει δουλειά το SEO;", "Πρώτα τα κλικ χωρίς επωνυμία και τα αιτήματα, με σύγκριση με τον προηγούμενο μήνα και πέρσι."],
      ["Κλικ στον χρόνο", "Είναι πραγματική η άνοδος ή εποχική;", "13 μήνες σε ένα γράφημα δείχνουν την εποχικότητα."],
      ["Κατανομή θέσεων", "Βελτιώνονται οι θέσεις συνολικά;", "Το πλήθος αναζητήσεων στις θέσεις 1-3, 4-10 και 11-20 διαβάζεται πιο εύκολα από μια μέση θέση."],
      ["Αναζητήσεις και σελίδες", "Από πού έρχεται η κίνηση;", "Ονομάζει τις αναζητήσεις και τις σελίδες που μετράνε."],
      ["Κέρδη και απώλειες", "Τι άλλαξε και γιατί;", "Κάθε μεγάλη αλλαγή έχει αιτία, και οι αρνητικές."],
      ["Εργασίες", "Τι πληρώσαμε;", "Συνδέει κάθε εργασία με το αποτέλεσμά της."],
      ["Ευκαιρίες", "Πού είναι η επόμενη ανάπτυξη;", "Με εκτίμηση επιπλέον κλικ τον μήνα, ως εύρος."],
      ["Επόμενα βήματα", "Τι γίνεται τον επόμενο μήνα;", "Τρία σημεία, με σειρά προτεραιότητας."],
    ],
  },
  { type: "h2", id: "how-to-make-yours", text: "Πώς φτιάχνετε την ίδια αναφορά για τον πελάτη σας" },
  {
    type: "steps",
    howTo: {
      name: "Μηνιαία αναφορά SEO πελάτη από το Google Search Console",
      description: "Φτιάξτε επώνυμη μηνιαία αναφορά SEO σαν το δείγμα, από ζωντανά δεδομένα Search Console, στο AnotherSEOGuru App.",
    },
    items: [
      { title: "Συνδέστε το Search Console", text: "Συνδεθείτε με Google και δώστε πρόσβαση μόνο για ανάγνωση." },
      { title: "Ανοίξτε τις Αναφορές", text: "Διαλέξτε ιστότοπο, μήνα και σύγκριση (προηγούμενη περίοδος ή πέρσι)." },
      { title: "Διαλέξτε ενότητες", text: "Κρατήστε όσες διαβάζει ο πελάτης σας." },
      { title: "Προσθέστε το branding σας", text: "Όνομα, λογότυπο και χρώμα του agency σας, και το λογότυπο του πελάτη. Το white-label branding ανήκει στο πακέτο Agency." },
      { title: "Γράψτε τη σύνοψη", text: "Τρεις προτάσεις με δικά σας λόγια." },
      { title: "Στείλτε τη", text: "Κατεβάστε το PDF, στείλτε email από την εφαρμογή ή προγραμματίστε το κάθε μήνα ή κάθε Δευτέρα." },
    ],
  },
  {
    type: "faq",
    items: [
      { q: "Τι πρέπει να περιέχει μια μηνιαία αναφορά SEO;", a: "Σύντομη γραπτή σύνοψη, κλικ χωρίς επωνυμία και αιτήματα σε σύγκριση με τον προηγούμενο μήνα και πέρσι, εξέλιξη 13 μηνών, κατανομή θέσεων, κορυφαίες αναζητήσεις και σελίδες, κέρδη και απώλειες με αιτίες, εργασίες, ευκαιρίες και επόμενα βήματα." },
      { q: "Μπορώ να κατεβάσω το δείγμα ως PDF;", a: "Ναι. Πατήστε «Κατεβάστε το δείγμα PDF» πάνω από την αναφορά. Θα πάρετε την ελληνική αναφορά για το υποθετικό οδοντιατρείο, χωρίς εγγραφή." },
      { q: "Είναι πραγματικά τα νούμερα;", a: "Όχι. Η Northside Dental είναι φανταστική και όλα τα νούμερα είναι δείγμα. Η δομή είναι αυτή που φτιάχνει το AnotherSEOGuru App από πραγματικό Search Console." },
    ],
  },
];
