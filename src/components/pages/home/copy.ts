import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import type { SiteLocale } from '@/lib/i18n/locale';

type Mark = 'yes' | 'some' | 'no';

export interface HomeCopy {
  readonly announceTag: string;
  readonly announce: string;
  readonly h1Line1: string;
  readonly h1Line2Before: string;
  readonly h1Accent: string;
  readonly h1Line2After: string;
  readonly lead: string;
  readonly signup: string;
  readonly audit: string;
  readonly whatsapp: string;
  readonly trust: readonly string[];
  readonly trustIntro: string;
  readonly worksWith: string;
  readonly integrations: readonly { readonly label: string; readonly href: string; readonly icon: 'gsc' | 'ga' | 'wp' | 'chrome' | 'iphone' | 'mcp' }[];
  readonly platformEyebrow: string;
  readonly platformTitleBefore: string;
  readonly platformAccent: string;
  readonly platformTitleAfter: string;
  readonly platformLead: string;
  readonly cards: readonly { readonly title: string; readonly body: string }[];
  readonly stepsEyebrow: string;
  readonly stepsTitleBefore: string;
  readonly stepsAccent: string;
  readonly stepsTitleAfter: string;
  readonly steps: readonly { readonly n: string; readonly title: string; readonly body: string }[];
  readonly waysEyebrow: string;
  readonly waysTitleBefore: string;
  readonly waysAccent: string;
  readonly waysLead: string;
  readonly appBadge: string;
  readonly appTitle: string;
  readonly appLead: string;
  readonly appPoints: readonly string[];
  readonly demo: string;
  readonly agencyBadge: string;
  readonly agencyTitle: string;
  readonly agencyLead: string;
  readonly agencyPoints: readonly string[];
  readonly pricing: string;
  readonly bothTitle: string;
  readonly bothBody: string;
  readonly quote: string;
  readonly whyEyebrow: string;
  readonly whyTitleBefore: string;
  readonly whyAccent: string;
  readonly whyLead: string;
  readonly colAgency: string;
  readonly colAgencyShort: string;
  readonly colTool: string;
  readonly colToolShort: string;
  readonly compare: readonly { readonly label: string; readonly agency: Mark; readonly tool: Mark }[];
  readonly markYes: string;
  readonly markSome: string;
  readonly markNo: string;
  readonly footnote: string;
  readonly numbersEyebrow: string;
  readonly numbersTitleBefore: string;
  readonly numbersAccent: string;
  readonly numbersTitleAfter: string;
  readonly numbersLead: string;
  readonly statYears: string;
  readonly statProjects: string;
  readonly statMarkets: string;
  readonly statReply: string;
  readonly hoursSuffix: string;
  readonly idealEyebrow: string;
  readonly idealTitle: string;
  readonly allProjects: string;
  readonly faqEyebrow: string;
  readonly faqTitleBefore: string;
  readonly faqAccent: string;
  readonly faqLead: string;
  readonly faqs: readonly { readonly q: string; readonly a: string }[];
  readonly finalTitleBefore: string;
  readonly finalAccent: string;
  readonly doneEyebrow: string;
  readonly doneTitle: string;
  readonly doneBody: string;
  readonly selfEyebrow: string;
  readonly selfTitle: string;
  readonly selfBody: string;
  readonly sample: string;
  readonly sampleCaption: string;
  readonly workspace: string;
  readonly nav: readonly string[];
  readonly tasksCount: string;
  readonly connected: string;
  readonly clicks: string;
  readonly ranges: readonly string[];
  readonly shipped: string;
  readonly doNext: string;
  readonly clickImpact: string;
  readonly fixes: readonly { readonly title: string; readonly impact: string }[];
  readonly aiTitle: string;
  readonly aiQuery: string;
  readonly engines: readonly { readonly name: string; readonly state: string; readonly cited: boolean }[];
  readonly asterName: string;
  readonly asterSample: string;
  readonly asterBody: string;
}

const en: HomeCopy = {
  announceTag: 'Demo',
  announce: 'Ask Aster AI about a page',
  h1Line1: 'Websites and SEO',
  h1Line2Before: 'for ',
  h1Accent: 'your business',
  h1Line2After: '',
  lead: 'People are already looking for what you offer. We check how they find your business and where they get stuck. Start with a free SEO check, or connect Search Console to explore the figures yourself.',
  signup: 'Sign up free with Google',
  audit: 'Get a free SEO audit',
  whatsapp: 'Talk on WhatsApp',
  trust: ['Your own Search Console data', 'Read-only Google connection', 'Free plan available'],
  trustIntro: 'Businesses we have worked with',
  worksWith: 'Works with',
  integrations: [
    { label: 'Google Search Console', href: '/platform/integrations', icon: 'gsc' },
    { label: 'Google Analytics', href: '/platform/integrations', icon: 'ga' },
    { label: 'WordPress', href: '/platform/wordpress', icon: 'wp' },
    { label: 'Chrome extension', href: '/platform/chrome-extension', icon: 'chrome' },
    { label: 'iPhone app', href: '/platform/iphone', icon: 'iphone' },
    { label: 'MCP / API', href: '/platform/mcp', icon: 'mcp' },
  ],
  platformEyebrow: 'The platform',
  platformTitleBefore: 'Find the pages that ',
  platformAccent: 'need attention',
  platformTitleAfter: '',
  platformLead: 'See which searches bring people to your site and which pages they pass over. Save an edit as a task, then check your clicks after publication.',
  cards: [
    { title: 'Opportunities', body: 'Find pages losing clicks and searches you nearly rank for. Compare the estimated gains before choosing a page to update.' },
    { title: 'Performance', body: 'Compare clicks, impressions and search positions, with the dates of your edits marked on the chart.' },
    { title: 'AI visibility', body: 'See whether ChatGPT, Gemini, Perplexity and Google AI Overviews mention your business or a competitor when you ask a customer’s question.' },
    { title: 'Tasks', body: 'Save a suggested change as a task and record the date you made it. Come back later to see how clicks changed.' },
    { title: 'Aster AI', body: 'Ask which page lost clicks. Open the figures behind the answer and save the next step as a task.' },
    { title: 'Everywhere you work', body: 'Use the same account in your browser and in the iPhone beta. Connect WordPress, Chrome or your AI assistant when you need them.' },
  ],
  stepsEyebrow: 'How it works',
  stepsTitleBefore: 'Work on ',
  stepsAccent: 'one page',
  stepsTitleAfter: ' at a time',
  steps: [
    { n: '01', title: 'Connect your site', body: 'Choose the Google account you use for Search Console, then select your site. The app reads its search data.' },
    { n: '02', title: 'Choose a page to improve', body: 'Open a suggestion to see the queries, impressions and clicks behind it. Pick one edit your team can make this week.' },
    { n: '03', title: 'Compare clicks after your edit', body: 'Make the change yourself or ask our team to help. Record the date in the app so you can compare the page’s clicks before and after the edit.' },
  ],
  waysEyebrow: 'Who does the work?',
  waysTitleBefore: 'Choose who ',
  waysAccent: 'makes the changes',
  waysLead: 'Use the app with your own team, or ask ours to take on the work. You can follow the changes in the same account.',
  appBadge: 'AnotherSEOGuru App',
  appTitle: 'Pick your next SEO task',
  appLead: 'Connect Search Console to see which pages already get impressions and where an edit could earn more clicks.',
  appPoints: [
    'Opportunities, performance and tasks',
    'AI visibility across the major assistants',
    'Aster AI chat with the evidence behind every answer',
    'iPhone app, Chrome extension and WordPress plugin',
  ],
  demo: 'Explore the live demo',
  agencyBadge: 'Agency services',
  agencyTitle: 'Have our team make the changes',
  agencyLead: 'We agree on the work, make the technical and content edits, and show what changed in your monthly report.',
  agencyPoints: [
    'A free audit before any contract',
    'Technical, on-page, local SEO and GEO / AEO',
    'Greek and English, with correct hreflang',
    'Monthly report with real Search Console numbers',
  ],
  pricing: 'See pricing',
  bothTitle: 'Already using the app?',
  bothBody: 'Keep managing routine edits yourself and ask our team for help with a project that needs more time.',
  quote: 'Get a quote',
  whyEyebrow: 'Why AnotherSEOGuru',
  whyTitleBefore: 'What you can do with ',
  whyAccent: 'AnotherSEOGuru App',
  whyLead: 'See the searches behind a suggested edit, save the work and compare performance after publication. If you need help putting those edits in place, you can request a separate agency quote.',
  colAgency: 'Typical agency',
  colAgencyShort: 'Agency',
  colTool: 'Typical SEO tool',
  colToolShort: 'Tool',
  compare: [
    { label: 'Starts from your own Search Console data', agency: 'some', tool: 'some' },
    { label: 'Ranked fixes with an estimated click impact', agency: 'no', tool: 'some' },
    { label: 'Save a suggested edit as a task', agency: 'some', tool: 'some' },
    { label: 'AI visibility in ChatGPT, Gemini, Perplexity, AI Overviews', agency: 'some', tool: 'some' },
    { label: 'Every shipped change marked on the chart', agency: 'no', tool: 'no' },
    { label: 'Ask Aster AI about the site you selected', agency: 'no', tool: 'no' },
    { label: 'Start on a free plan', agency: 'some', tool: 'some' },
  ],
  markYes: 'Included',
  markSome: 'Sometimes',
  markNo: 'Usually not',
  footnote: '✓ included · ~ sometimes · - usually not. General comparison, not a claim about any named company.',
  numbersEyebrow: 'By the numbers',
  numbersTitleBefore: '',
  numbersAccent: '10+ years',
  numbersTitleAfter: ' in SEO and web design',
  numbersLead: 'AnotherSEOGuru is the web and SEO team at Touristas Technologies. Our portfolio includes hotel booking sites, rental businesses and online shops.',
  statYears: 'Years of experience',
  statProjects: 'Projects delivered',
  statMarkets: 'Markets',
  statReply: 'Response time',
  hoursSuffix: 'h',
  idealEyebrow: 'Ideal for',
  idealTitle: 'Websites we have built for travel businesses',
  allProjects: 'Explore all projects',
  faqEyebrow: 'FAQ',
  faqTitleBefore: 'Before you ',
  faqAccent: 'get started',
  faqLead: 'Find out what you can do in the app and when it makes sense to ask our team for help.',
  faqs: [
    {
      q: 'What does AnotherSEOGuru do?',
      a: 'AnotherSEOGuru App shows you where your pages appear in Google and which edits may help. Our agency builds websites and WooCommerce shops and can take on the SEO work for you.',
    },
    {
      q: 'Should I use the app or ask for managed SEO?',
      a: 'Start with the free plan if you or a colleague can make the changes. For hands-on help, request a free check and tell us which parts you would like our team to handle.',
    },
    {
      q: 'How do SEO, AEO and GEO differ?',
      a: 'SEO helps people find your pages in search. AEO makes answers on those pages easy to identify. GEO looks at how AI services such as ChatGPT or Gemini describe and cite your business.',
    },
    {
      q: 'Can you build a site for my tourism business?',
      a: 'Yes. We build multilingual sites for hotels, villas, car rentals and tours, with a route from the relevant room, vehicle or trip to a direct booking.',
    },
    {
      q: 'When can I expect to see a change?',
      a: 'We usually look for changes in search impressions over three to six months. A change in bookings or enquiries can take six to twelve months. Competition and how quickly changes go live both matter.',
    },
    {
      q: 'Do I need a contract for the free check?',
      a: `The free check carries no commitment. If you choose monthly managed SEO, the initial term is ${SEO_MIN_TERM_MONTHS} months, then the agreement renews monthly.`,
    },
  ],
  finalTitleBefore: 'Where would you ',
  finalAccent: 'like to start?',
  doneEyebrow: 'We do it for you',
  doneTitle: 'Request a free SEO check',
  doneBody: 'Send the address of your site. The check highlights issues on the page, and you can ask our team which ones to tackle first.',
  selfEyebrow: 'Do it yourself',
  selfTitle: 'AnotherSEOGuru App',
  selfBody: 'See what people search for before they reach your site. Choose a page to improve and follow its clicks after your edit.',
  sample: 'Sample data',
  sampleCaption: 'Explore a sample site with illustrative search data.',
  workspace: 'Workspace',
  nav: ['Opportunities', 'Performance', 'AI visibility', 'Tasks', 'Aster AI'],
  tasksCount: '4',
  connected: 'Connected · read-only',
  clicks: 'Organic clicks',
  ranges: ['12 mo', '3 mo', '28 d'],
  shipped: 'Added language links to the room pages',
  doNext: 'Suggested edits',
  clickImpact: 'Est. +870 clicks/mo',
  fixes: [
    { title: 'Update the boutique hotel page', impact: '+412' },
    { title: 'Rewrite the pool page title', impact: '+268' },
    { title: 'Update the beach guide', impact: '+190' },
  ],
  aiTitle: 'AI visibility',
  aiQuery: '“best boutique hotel in paros”',
  engines: [
    { name: 'ChatGPT', state: 'Cited', cited: true },
    { name: 'Gemini', state: 'Mentioned', cited: false },
    { name: 'Perplexity', state: 'Cited', cited: true },
    { name: 'AI Overviews', state: 'Cited', cited: true },
  ],
  asterName: 'Aster AI',
  asterSample: 'sample',
  asterBody: 'The hotel page already appears in search. I’ve saved the suggested edit as a task so you can check its clicks after publication.',
};

const el: HomeCopy = {
  announceTag: 'Δοκιμή',
  announce: 'Ρωτήστε τον Aster AI για μια σελίδα',
  h1Line1: 'Ιστοσελίδες και SEO',
  h1Line2Before: 'για την ',
  h1Accent: 'επιχείρησή σας',
  h1Line2After: '',
  lead: 'Πώς σας βρίσκει κάποιος που ψάχνει δωμάτιο, προϊόν ή επαγγελματία στην περιοχή του; Ελέγχουμε τι βλέπει στη Google και πόσο εύκολα μπορεί να επικοινωνήσει μαζί σας. Ξεκινήστε με δωρεάν έλεγχο ή δείτε μόνοι σας τα στοιχεία στο AnotherSEOGuru App.',
  signup: 'Δωρεάν εγγραφή με Google',
  audit: 'Δωρεάν έλεγχος SEO',
  whatsapp: 'Μιλήστε μας στο WhatsApp',
  trust: ['Τα δικά σας στοιχεία Search Console', 'Σύνδεση Google μόνο για ανάγνωση', 'Διαθέσιμο δωρεάν πακέτο'],
  trustIntro: 'Επιχειρήσεις με τις οποίες έχουμε συνεργαστεί',
  worksWith: 'Συνεργάζεται με',
  integrations: [
    { label: 'Google Search Console', href: '/platform/integrations', icon: 'gsc' },
    { label: 'Google Analytics', href: '/platform/integrations', icon: 'ga' },
    { label: 'WordPress', href: '/platform/wordpress', icon: 'wp' },
    { label: 'Επέκταση Chrome', href: '/platform/chrome-extension', icon: 'chrome' },
    { label: 'Εφαρμογή iPhone', href: '/platform/iphone', icon: 'iphone' },
    { label: 'MCP / API', href: '/platform/mcp', icon: 'mcp' },
  ],
  platformEyebrow: 'Η πλατφόρμα',
  platformTitleBefore: 'Ποιες σελίδες ',
  platformAccent: 'χρειάζονται βελτίωση;',
  platformTitleAfter: '',
  platformLead: 'Δείτε ποιες αναζητήσεις φέρνουν επισκέπτες και ποιες σελίδες εμφανίζονται συχνά αλλά παίρνουν λίγα κλικ. Κρατήστε την προτεινόμενη αλλαγή ως εργασία και παρακολουθήστε τα κλικ μετά τη δημοσίευση.',
  cards: [
    { title: 'Ευκαιρίες', body: 'Βρείτε σελίδες που χάνουν κλικ και αναζητήσεις για τις οποίες βρίσκεστε κοντά στην πρώτη σελίδα. Συγκρίνετε πόσα επιπλέον κλικ θα μπορούσε να φέρει κάθε αλλαγή.' },
    { title: 'Απόδοση', body: 'Συγκρίνετε τα κλικ, τις εμφανίσεις και τις θέσεις σας στη Google. Στο γράφημα μπορείτε να σημειώσετε πότε αλλάξατε μια σελίδα.' },
    { title: 'Ορατότητα AI', body: 'Δείτε αν το ChatGPT, το Gemini, το Perplexity και τα AI Overviews της Google αναφέρουν εσάς ή κάποιον ανταγωνιστή σε μια ερώτηση πελάτη.' },
    { title: 'Εργασίες', body: 'Αποθηκεύστε την πρόταση ως εργασία. Σημειώστε πότε την εφαρμόσατε για να δείτε αργότερα πώς άλλαξαν τα κλικ της σελίδας.' },
    { title: 'Aster AI', body: 'Ρωτήστε ποια σελίδα έχασε κλικ. Δείτε τα στοιχεία στα οποία βασίζεται η απάντηση και κρατήστε την αλλαγή που προτείνεται ως εργασία.' },
    { title: 'Όπου κι αν δουλεύετε', body: 'Με τον ίδιο λογαριασμό χρησιμοποιείτε την εφαρμογή στον υπολογιστή και τη δοκιμαστική έκδοση για iPhone. Μπορείτε επίσης να συνδέσετε το WordPress, τον Chrome ή τον δικό σας βοηθό AI.' },
  ],
  stepsEyebrow: 'Πώς λειτουργεί',
  stepsTitleBefore: 'Πώς βελτιώνετε ',
  stepsAccent: 'μία σελίδα',
  stepsTitleAfter: ' κάθε φορά',
  steps: [
    { n: '01', title: 'Συνδέστε την ιστοσελίδα σας', body: 'Συνδεθείτε με τον λογαριασμό Google που χρησιμοποιείτε για το Search Console. Επιλέξτε ιστοσελίδα και δώστε πρόσβαση μόνο για ανάγνωση.' },
    { n: '02', title: 'Επιλέξτε μια σελίδα για βελτίωση', body: 'Ανοίξτε μια πρόταση και δείτε τις αναζητήσεις, τις εμφανίσεις και τα κλικ της σελίδας. Διαλέξτε μια αλλαγή για την οποία έχετε χρόνο αυτή την εβδομάδα.' },
    { n: '03', title: 'Συγκρίνετε τα κλικ μετά την αλλαγή', body: 'Μπορείτε να κάνετε την αλλαγή εσείς ή να ζητήσετε βοήθεια από την ομάδα μας. Σημειώστε την ημερομηνία στην εφαρμογή για να συγκρίνετε τα κλικ πριν και μετά.' },
  ],
  waysEyebrow: 'Ποιος αναλαμβάνει;',
  waysTitleBefore: 'Επιλέξτε πώς ',
  waysAccent: 'θα γίνουν οι αλλαγές',
  waysLead: 'Αν έχετε δική σας ομάδα, μπορείτε να δουλέψετε στο AnotherSEOGuru App. Μπορούμε επίσης να αναλάβουμε εμείς την υλοποίηση. Και στις δύο περιπτώσεις βλέπετε τις εργασίες στον λογαριασμό σας.',
  appBadge: 'AnotherSEOGuru App',
  appTitle: 'Βρείτε την επόμενη εργασία SEO',
  appLead: 'Συνδέστε το Search Console για να δείτε ποιες σελίδες εμφανίζονται ήδη στη Google και πού μια αλλαγή θα μπορούσε να φέρει περισσότερα κλικ.',
  appPoints: [
    'Ευκαιρίες, απόδοση και εργασίες',
    'Αναφορές της επιχείρησής σας στις απαντήσεις AI',
    'Συνομιλία με τον Aster AI, με στοιχεία πίσω από κάθε απάντηση',
    'Εφαρμογή iPhone, επέκταση Chrome και πρόσθετο WordPress',
  ],
  demo: 'Δείτε τη ζωντανή επίδειξη',
  agencyBadge: 'Με την ομάδα μας',
  agencyTitle: 'Αναθέστε μας την υλοποίηση',
  agencyLead: 'Συμφωνούμε μαζί σας ποιες εργασίες προέχουν, αναλαμβάνουμε τις τεχνικές διορθώσεις και τα κείμενα και σας δείχνουμε τι άλλαξε στη μηνιαία αναφορά.',
  agencyPoints: [
    'Δωρεάν έλεγχος πριν από κάθε συμφωνία',
    'Τεχνικό, on-page, τοπικό SEO και GEO / AEO',
    'Ελληνικά και αγγλικά, με σωστό hreflang',
    'Μηνιαία αναφορά με στοιχεία από το δικό σας Search Console',
  ],
  pricing: 'Δείτε τις τιμές',
  bothTitle: 'Χρησιμοποιείτε ήδη την εφαρμογή;',
  bothBody: 'Συνεχίστε να κάνετε τις καθημερινές αλλαγές και ζητήστε βοήθεια από την ομάδα μας για τις πιο απαιτητικές εργασίες.',
  quote: 'Ζητήστε προσφορά',
  whyEyebrow: 'Γιατί AnotherSEOGuru',
  whyTitleBefore: 'Τι μπορείτε να κάνετε με ',
  whyAccent: 'το AnotherSEOGuru App',
  whyLead: 'Δείτε ποιες αναζητήσεις οδήγησαν σε μια πρόταση, κρατήστε την εργασία και συγκρίνετε τα στοιχεία μετά τη δημοσίευση. Αν χρειάζεστε βοήθεια με την υλοποίηση, μπορείτε να ζητήσετε ξεχωριστή προσφορά από την ομάδα μας.',
  colAgency: 'Συνηθισμένο γραφείο',
  colAgencyShort: 'Γραφείο',
  colTool: 'Συνηθισμένο εργαλείο SEO',
  colToolShort: 'Εργαλείο',
  compare: [
    { label: 'Ξεκινά από τα δικά σας δεδομένα Search Console', agency: 'some', tool: 'some' },
    { label: 'Διορθώσεις με σειρά και εκτίμηση κλικ', agency: 'no', tool: 'some' },
    { label: 'Αποθήκευση προτεινόμενης αλλαγής ως εργασίας', agency: 'some', tool: 'some' },
    { label: 'Ορατότητα σε ChatGPT, Gemini, Perplexity, AI Overviews', agency: 'some', tool: 'some' },
    { label: 'Κάθε αλλαγή σημειωμένη στο γράφημα', agency: 'no', tool: 'no' },
    { label: 'Ερωτήσεις στον Aster AI για τη δική σας ιστοσελίδα', agency: 'no', tool: 'no' },
    { label: 'Δυνατότητα χρήσης με δωρεάν πακέτο', agency: 'some', tool: 'some' },
  ],
  markYes: 'Περιλαμβάνεται',
  markSome: 'Μερικές φορές',
  markNo: 'Συνήθως όχι',
  footnote: '✓ περιλαμβάνεται · ~ μερικές φορές · - συνήθως όχι. Γενική σύγκριση, όχι ισχυρισμός για συγκεκριμένη εταιρεία.',
  numbersEyebrow: 'Σε αριθμούς',
  numbersTitleBefore: '',
  numbersAccent: '10+ χρόνια',
  numbersTitleAfter: ' στο SEO και στην κατασκευή ιστοσελίδων',
  numbersLead: 'Η AnotherSEOGuru είναι η ομάδα ιστοσελίδων και SEO της Touristas Technologies. Στα έργα μας θα βρείτε ξενοδοχεία με απευθείας κρατήσεις, επιχειρήσεις ενοικίασης και ηλεκτρονικά καταστήματα.',
  statYears: 'Χρόνια εμπειρίας',
  statProjects: 'Έργα που παραδώσαμε',
  statMarkets: 'Αγορές',
  statReply: 'Χρόνος απάντησης',
  hoursSuffix: 'ώ',
  idealEyebrow: 'Ιδανικό για',
  idealTitle: 'Έργα μας για τουριστικές επιχειρήσεις',
  allProjects: 'Δείτε όλα τα έργα',
  faqEyebrow: 'FAQ',
  faqTitleBefore: 'Πριν ',
  faqAccent: 'ξεκινήσετε',
  faqLead: 'Μάθετε τι μπορείτε να κάνετε στην εφαρμογή και πότε αξίζει να ζητήσετε βοήθεια από την ομάδα μας.',
  faqs: [
    {
      q: 'Τι κάνει η AnotherSEOGuru;',
      a: 'Στο AnotherSEOGuru App βλέπετε πού εμφανίζονται οι σελίδες σας στη Google και ποιες αλλαγές αξίζει να δοκιμάσετε. Η ομάδα μας αναλαμβάνει επίσης την κατασκευή ιστοσελίδων και καταστημάτων WooCommerce, καθώς και τη διαχείριση SEO.',
    },
    {
      q: 'Να χρησιμοποιήσω την εφαρμογή ή να αναθέσω το SEO;',
      a: 'Αν μπορείτε να κάνετε τις αλλαγές εσείς ή κάποιος συνεργάτης σας, ξεκινήστε με το δωρεάν πακέτο. Αν θέλετε να αναλάβουμε εμείς, ζητήστε δωρεάν έλεγχο και πείτε μας πού χρειάζεστε βοήθεια.',
    },
    {
      q: 'Σε τι διαφέρουν το SEO, το AEO και το GEO;',
      a: 'Το SEO βοηθά τους πελάτες να βρίσκουν τις σελίδες σας στη Google. Με το AEO οργανώνουμε τις απαντήσεις που δίνετε σε συγκεκριμένες ερωτήσεις. Με το GEO εξετάζουμε πώς υπηρεσίες όπως το ChatGPT ή το Gemini παρουσιάζουν την επιχείρησή σας.',
    },
    {
      q: 'Φτιάχνετε ιστοσελίδες για τουριστικές επιχειρήσεις;',
      a: 'Ναι. Έχουμε φτιάξει πολύγλωσσες ιστοσελίδες για ξενοδοχεία, βίλες, ενοικιάσεις αυτοκινήτων και εκδρομές. Ο ταξιδιώτης μπορεί να προχωρήσει σε απευθείας κράτηση από τη σελίδα που τον ενδιαφέρει.',
    },
    {
      q: 'Πότε θα αρχίσω να βλέπω διαφορά;',
      a: 'Συνήθως εξετάζουμε την πορεία των εμφανίσεων στη Google σε διάστημα τριών έως έξι μηνών. Για αισθητή διαφορά σε κρατήσεις ή αιτήματα μπορεί να χρειαστούν έξι έως δώδεκα μήνες, ανάλογα με τον ανταγωνισμό και το πότε θα δημοσιευτούν οι αλλαγές.',
    },
    {
      q: 'Χρειάζεται συμφωνητικό για τον δωρεάν έλεγχο;',
      a: `Ο δωρεάν έλεγχος δεν σας δεσμεύει. Αν επιλέξετε μηνιαία διαχείριση SEO, η αρχική συμφωνία διαρκεί ${SEO_MIN_TERM_MONTHS} μήνες και έπειτα ανανεώνεται κάθε μήνα.`,
    },
  ],
  finalTitleBefore: 'Πώς θέλετε ',
  finalAccent: 'να ξεκινήσετε;',
  doneEyebrow: 'Το κάνουμε εμείς',
  doneTitle: 'Ζητήστε δωρεάν έλεγχο SEO',
  doneBody: 'Στείλτε τη διεύθυνση της ιστοσελίδας σας. Ο έλεγχος εντοπίζει προβλήματα στη σελίδα και μπορείτε να ρωτήσετε την ομάδα μας ποια αξίζει να διορθώσετε πρώτα.',
  selfEyebrow: 'Μόνοι σας',
  selfTitle: 'AnotherSEOGuru App',
  selfBody: 'Δείτε τι αναζητούν όσοι βρίσκουν την ιστοσελίδα σας. Επιλέξτε μια σελίδα για βελτίωση και παρακολουθήστε τα κλικ της μετά την αλλαγή.',
  sample: 'Δείγμα δεδομένων',
  sampleCaption: 'Γνωρίστε την εφαρμογή με ενδεικτικά στοιχεία αναζήτησης.',
  workspace: 'Χώρος εργασίας',
  nav: ['Ευκαιρίες', 'Απόδοση', 'Ορατότητα AI', 'Εργασίες', 'Aster AI'],
  tasksCount: '4',
  connected: 'Συνδεδεμένο · μόνο ανάγνωση',
  clicks: 'Οργανικά κλικ',
  ranges: ['12 μ.', '3 μ.', '28 ημ.'],
  shipped: 'Προστέθηκαν σύνδεσμοι γλώσσας στις σελίδες δωματίων',
  doNext: 'Προτεινόμενες αλλαγές',
  clickImpact: 'Εκτίμηση +870 κλικ/μήνα',
  fixes: [
    { title: 'Βελτίωση της σελίδας για το ξενοδοχείο στην Πάρο', impact: '+412' },
    { title: 'Νέος τίτλος στη σελίδα για την πισίνα', impact: '+268' },
    { title: 'Ενημέρωση του οδηγού για τις παραλίες', impact: '+190' },
  ],
  aiTitle: 'Ορατότητα AI',
  aiQuery: '«καλύτερο boutique ξενοδοχείο Πάρος»',
  engines: [
    { name: 'ChatGPT', state: 'Πηγή', cited: true },
    { name: 'Gemini', state: 'Αναφορά', cited: false },
    { name: 'Perplexity', state: 'Πηγή', cited: true },
    { name: 'AI Overviews', state: 'Πηγή', cited: true },
  ],
  asterName: 'Aster AI',
  asterSample: 'δείγμα',
  asterBody: 'Η σελίδα του ξενοδοχείου εμφανίζεται ήδη στην αναζήτηση. Αποθήκευσα την προτεινόμενη αλλαγή ως εργασία για να ελέγξετε τα κλικ της μετά τη δημοσίευση.',
};

export function homeCopy(locale: SiteLocale): HomeCopy {
  return locale === 'el' ? el : en;
}
