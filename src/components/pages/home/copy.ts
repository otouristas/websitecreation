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
  announceTag: 'NEW',
  announce: 'Meet Aster AI, your SEO guru',
  h1Line1: 'Search Console in.',
  h1Line2Before: '',
  h1Accent: 'Customers',
  h1Line2After: ' out.',
  lead: 'A Search Console-native SEO platform and an agency that builds the strategy around your data. Get the fixes that win the most clicks, ranked and estimated. Ship them yourself, or let our team do it.',
  signup: 'Sign up free with Google',
  audit: 'Get a free SEO audit',
  whatsapp: 'Talk on WhatsApp',
  trust: ['Built on your Search Console data', 'No lock-in contract', 'Reply within 24 hours'],
  trustIntro: 'Trusted by businesses across Greece and beyond',
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
  platformTitleBefore: 'SEO, ',
  platformAccent: 'consolidated.',
  platformTitleAfter: '',
  platformLead: 'Not another dashboard and not another monthly PDF. Your Search Console data, ranked opportunities, AI visibility, tasks and the team that ships them, in one place. It is the same tool our own team uses every day.',
  cards: [
    { title: 'Opportunities', body: 'Ranked fixes with an estimated click impact for each: striking distance, low CTR, content decay and missing pages.' },
    { title: 'Performance', body: 'Clicks, impressions, CTR and rankings, with comparisons and annotations for every change you ship.' },
    { title: 'AI visibility', body: 'How ChatGPT, Gemini, Perplexity and AI Overviews mention you, and your share of voice against competitors.' },
    { title: 'Tasks', body: 'Turn fixes into tasks, mark what you shipped and watch the result on the chart.' },
    { title: 'Aster AI', body: 'Your SEO guru. Ask a question, inspect the evidence behind the answer and turn it into a task.' },
    { title: 'Everywhere you work', body: 'Web workspace, iPhone app, WordPress plugin, Chrome extension and MCP / API, all on the same account.' },
  ],
  stepsEyebrow: 'How it works',
  stepsTitleBefore: 'From raw rows to ',
  stepsAccent: 'shipped fixes,',
  stepsTitleAfter: ' in three steps.',
  steps: [
    { n: '01', title: 'Connect Google, read-only.', body: 'Sign in with Google and pick your Search Console property. Nothing on your site changes until you approve it.' },
    { n: '02', title: 'Get a ranked to-do list.', body: 'Thousands of rows become a short list of fixes. Each shows the position, impressions and click-through behind it, from your own data.' },
    { n: '03', title: 'Ship it, then check it.', body: 'Do it yourself or hand it to our team. Every change we ship is marked on your Search Console chart, so results are easy to check.' },
  ],
  waysEyebrow: 'Two ways in',
  waysTitleBefore: 'Do it yourself. Let us do it. ',
  waysAccent: 'Or both.',
  waysLead: 'Same data, same tool, same account. Only who ships the fix changes.',
  appBadge: 'Self-serve · AnotherSEOGuru App',
  appTitle: 'Search Console as a to-do list.',
  appLead: 'Connect Google read-only and get the fixes that win the most clicks, ranked and estimated, for every site you manage.',
  appPoints: [
    'Opportunities, performance and tasks',
    'AI visibility across the major assistants',
    'Aster AI chat with the evidence behind every answer',
    'iPhone app, Chrome extension and WordPress plugin',
  ],
  demo: 'Explore the live demo',
  agencyBadge: 'Managed · Agency',
  agencyTitle: 'Our team ships it for you.',
  agencyLead: 'Monthly SEO ranked by what brings customers: technical fixes, content and links, in that order.',
  agencyPoints: [
    'A free audit before any contract',
    'Technical, on-page, local SEO and GEO / AEO',
    'Greek and English, with correct hreflang',
    'Monthly report with real Search Console numbers',
  ],
  pricing: 'See pricing',
  bothTitle: 'Both?',
  bothBody: 'Use the App every day and let the team take the heavy work. One account, one source of truth.',
  quote: 'Get a quote',
  whyEyebrow: 'Why AnotherSEOGuru',
  whyTitleBefore: 'Most agencies send reports. We send ',
  whyAccent: 'decisions.',
  whyLead: 'Search Console holds thousands of rows, usually with your own brand name on top. We turn them into a short list of fixes, each with the extra customers it should bring, and then we ship them.',
  colAgency: 'Typical agency',
  colAgencyShort: 'Agency',
  colTool: 'Typical SEO tool',
  colToolShort: 'Tool',
  compare: [
    { label: 'Starts from your own Search Console data', agency: 'some', tool: 'some' },
    { label: 'Ranked fixes with an estimated click impact', agency: 'no', tool: 'some' },
    { label: 'A team that ships the fixes', agency: 'yes', tool: 'no' },
    { label: 'AI visibility in ChatGPT, Gemini, Perplexity, AI Overviews', agency: 'some', tool: 'some' },
    { label: 'Every shipped change marked on the chart', agency: 'no', tool: 'no' },
    { label: 'Free audit before any contract', agency: 'some', tool: 'no' },
    { label: 'No lock-in contract', agency: 'some', tool: 'yes' },
  ],
  markYes: 'Included',
  markSome: 'Sometimes',
  markNo: 'Usually not',
  footnote: '✓ included · ~ sometimes · - usually not. General comparison, not a claim about any named company.',
  numbersEyebrow: 'By the numbers',
  numbersTitleBefore: '',
  numbersAccent: '10+ years',
  numbersTitleAfter: ' of shipping, not promising.',
  numbersLead: 'AnotherSEOGuru is the SEO and web team at Touristas Technologies. Organic growth, without guarantees nobody can keep.',
  statYears: 'Years of experience',
  statProjects: 'Projects delivered',
  statMarkets: 'Markets',
  statReply: 'Response time',
  hoursSuffix: 'h',
  idealEyebrow: 'Ideal for',
  idealTitle: 'Our depth is in tourism and hospitality.',
  allProjects: 'Explore all projects',
  faqEyebrow: 'FAQ',
  faqTitleBefore: 'Questions buyers actually ',
  faqAccent: 'ask.',
  faqLead: 'Direct answers on SEO, GEO/AEO, the App and delivery time. Something else? We reply within 24 hours.',
  faqs: [
    {
      q: 'What does AnotherSEOGuru do?',
      a: 'We build websites, WooCommerce shops and hotel sites, then grow them with technical SEO, local SEO, GEO and AEO, so you win bookings and leads, not just traffic. AnotherSEOGuru App gives you the same Search Console-based tooling our team uses.',
    },
    {
      q: 'App or managed SEO: which one do I need?',
      a: 'If you have time and want control, start free with the App. If you want the work done, start with a free audit and our team ships it. Many do both on the same account.',
    },
    {
      q: 'What is GEO vs SEO vs AEO?',
      a: 'SEO ranks you in classic Google results. AEO structures content so AI systems can extract a direct answer. GEO helps your brand get cited in ChatGPT, Perplexity, Gemini and Google AI Overviews.',
    },
    {
      q: 'Do you build hotel and rent-a-car websites?',
      a: 'Yes. Tourism is our deepest vertical: hotels, villas, rent-a-car and tours, designed for direct bookings and multilingual pages.',
    },
    {
      q: 'How long until SEO shows results?',
      a: 'Search Console impressions usually move in 3–6 months. Meaningful booking or lead growth typically takes 6–12 months, depending on competition and how fast content ships.',
    },
    {
      q: 'Is there a lock-in contract?',
      a: 'No. Every engagement starts with a free SEO audit, so you see the problems and the fixes before you commit.',
    },
  ],
  finalTitleBefore: 'Your next customers are already searching. ',
  finalAccent: 'Let’s find them.',
  doneEyebrow: 'We do it for you',
  doneTitle: 'A free SEO audit in 24 hours',
  doneBody: 'Send us your website. You get the issues that cost you customers, what to fix first and a fixed price, in your language.',
  selfEyebrow: 'Do it yourself',
  selfTitle: 'AnotherSEOGuru App',
  selfBody: 'Connect Google read-only and get the fixes that win the most clicks, ranked and estimated, for every site you manage.',
  sample: 'Sample data',
  sampleCaption: 'Sample product window. The figures are illustrative, not a client result.',
  workspace: 'Workspace',
  nav: ['Opportunities', 'Performance', 'AI visibility', 'Tasks', 'Aster AI'],
  tasksCount: '4',
  connected: 'Connected · read-only',
  clicks: 'Organic clicks',
  ranges: ['12 mo', '3 mo', '28 d'],
  shipped: 'Shipped: Greek rooms pages with hreflang',
  doNext: 'Do this next',
  clickImpact: 'up to +966 clicks/mo',
  fixes: [
    { title: 'Top 3 for “boutique hotel paros”', impact: '+412' },
    { title: 'Rewrite title & meta, /paros-hotel-with-pool', impact: '+268' },
    { title: 'Refresh decaying guide, /blog/best-beaches', impact: '+190' },
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
  asterBody: 'Start with pages already visible in search. I have turned the top fix into a task you can measure.',
};

const el: HomeCopy = {
  announceTag: 'NEW',
  announce: 'Γνωρίστε τον Aster AI, τον SEO guru σας',
  h1Line1: 'Από το Search Console',
  h1Line2Before: 'σε ',
  h1Accent: 'πελάτες.',
  h1Line2After: '',
  lead: 'Πλατφόρμα SEO πάνω στο Search Console σας και ομάδα που χτίζει τη στρατηγική γύρω από τα δεδομένα σας. Παίρνετε τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση. Τις κάνετε μόνοι σας ή τις κάνει η ομάδα μας.',
  signup: 'Δωρεάν εγγραφή με Google',
  audit: 'Δωρεάν έλεγχος SEO',
  whatsapp: 'Μιλήστε μας στο WhatsApp',
  trust: ['Με βάση τα δικά σας δεδομένα Search Console', 'Χωρίς δέσμευση', 'Απάντηση σε 24 ώρες'],
  trustIntro: 'Μας εμπιστεύονται επιχειρήσεις στην Ελλάδα και το εξωτερικό',
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
  platformTitleBefore: 'Όλο το SEO, ',
  platformAccent: 'σε ένα μέρος.',
  platformTitleAfter: '',
  platformLead: 'Όχι άλλος ένας πίνακας και όχι άλλο ένα μηνιαίο PDF. Τα δεδομένα του Search Console, οι ευκαιρίες με σειρά, η ορατότητα στο AI, οι εργασίες και η ομάδα που τις υλοποιεί, μαζί. Είναι το ίδιο εργαλείο που χρησιμοποιεί καθημερινά η ομάδα μας.',
  cards: [
    { title: 'Ευκαιρίες', body: 'Διορθώσεις κατά προτεραιότητα, με εκτίμηση των επιπλέον κλικ για την καθεμία: λέξεις κοντά στην πρώτη σελίδα, χαμηλό CTR, περιεχόμενο που πέφτει και σελίδες που λείπουν.' },
    { title: 'Απόδοση', body: 'Κλικ, εμφανίσεις, CTR και θέσεις κατάταξης, με συγκρίσεις και σημειώσεις για κάθε αλλαγή.' },
    { title: 'Ορατότητα AI', body: 'Πώς σας αναφέρουν τα ChatGPT, Gemini, Perplexity και τα AI Overviews, και το μερίδιό σας έναντι των ανταγωνιστών.' },
    { title: 'Εργασίες', body: 'Κάντε τις διορθώσεις εργασίες, σημειώστε τι αλλάξατε και δείτε το αποτέλεσμα στο γράφημα.' },
    { title: 'Aster AI', body: 'Ο SEO guru σας. Κάντε μια ερώτηση, δείτε τα στοιχεία πίσω από την απάντηση και κάντε την εργασία.' },
    { title: 'Όπου κι αν δουλεύετε', body: 'Εφαρμογή web, εφαρμογή iPhone, πρόσθετο WordPress, επέκταση Chrome και MCP / API, όλα στον ίδιο λογαριασμό.' },
  ],
  stepsEyebrow: 'Πώς λειτουργεί',
  stepsTitleBefore: 'Από τα δεδομένα στις ',
  stepsAccent: 'έτοιμες διορθώσεις,',
  stepsTitleAfter: ' σε τρία βήματα.',
  steps: [
    { n: '01', title: 'Συνδέστε το Google, μόνο για ανάγνωση.', body: 'Συνδεθείτε με Google και διαλέξτε το property του Search Console. Τίποτα δεν αλλάζει στον ιστότοπό σας χωρίς την έγκρισή σας.' },
    { n: '02', title: 'Πάρτε λίστα με προτεραιότητες.', body: 'Χιλιάδες γραμμές γίνονται μια σύντομη λίστα διορθώσεων. Η καθεμία δείχνει θέση, εμφανίσεις και CTR, από τα δικά σας δεδομένα.' },
    { n: '03', title: 'Υλοποιήστε και ελέγξτε.', body: 'Το κάνετε μόνοι σας ή το αναθέτετε σε εμάς. Κάθε αλλαγή σημειώνεται στο γράφημα του Search Console, ώστε να ελέγχετε εύκολα το αποτέλεσμα.' },
  ],
  waysEyebrow: 'Δύο τρόποι',
  waysTitleBefore: 'Μόνοι σας. Με εμάς. ',
  waysAccent: 'Ή και τα δύο.',
  waysLead: 'Ίδια δεδομένα, ίδιο εργαλείο, ίδιος λογαριασμός. Αλλάζει μόνο ποιος κάνει τη διόρθωση.',
  appBadge: 'Μόνοι σας · AnotherSEOGuru App',
  appTitle: 'Το Search Console ως λίστα εργασιών.',
  appLead: 'Συνδέστε το Google μόνο για ανάγνωση και πάρτε τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση, για κάθε ιστότοπο που διαχειρίζεστε.',
  appPoints: [
    'Ευκαιρίες, απόδοση και εργασίες',
    'Ορατότητα στους μεγάλους βοηθούς AI',
    'Συνομιλία με τον Aster AI, με στοιχεία πίσω από κάθε απάντηση',
    'Εφαρμογή iPhone, επέκταση Chrome και πρόσθετο WordPress',
  ],
  demo: 'Δείτε τη ζωντανή επίδειξη',
  agencyBadge: 'Με την ομάδα μας',
  agencyTitle: 'Η ομάδα μας τα κάνει για εσάς.',
  agencyLead: 'Μηνιαίο SEO με προτεραιότητα στους πελάτες: τεχνικές διορθώσεις, περιεχόμενο και links, με τη σειρά που φέρνει αποτέλεσμα πιο γρήγορα.',
  agencyPoints: [
    'Δωρεάν έλεγχος πριν από κάθε συμφωνία',
    'Τεχνικό, on-page, τοπικό SEO και GEO / AEO',
    'Ελληνικά και αγγλικά, με σωστό hreflang',
    'Μηνιαία αναφορά με πραγματικά νούμερα Search Console',
  ],
  pricing: 'Δείτε τις τιμές',
  bothTitle: 'Και τα δύο;',
  bothBody: 'Χρησιμοποιείτε το App καθημερινά και η ομάδα αναλαμβάνει τη βαριά δουλειά. Ένας λογαριασμός, μία εικόνα.',
  quote: 'Ζητήστε προσφορά',
  whyEyebrow: 'Γιατί AnotherSEOGuru',
  whyTitleBefore: 'Οι περισσότεροι στέλνουν αναφορές. Εμείς στέλνουμε ',
  whyAccent: 'αποφάσεις.',
  whyLead: 'Το Search Console έχει χιλιάδες γραμμές, συνήθως με το όνομα της επιχείρησής σας στην κορυφή. Τις κάνουμε μια σύντομη λίστα διορθώσεων, με τους επιπλέον πελάτες που μπορεί να φέρει η καθεμία, και μετά τις υλοποιούμε.',
  colAgency: 'Συνηθισμένο γραφείο',
  colAgencyShort: 'Γραφείο',
  colTool: 'Συνηθισμένο εργαλείο SEO',
  colToolShort: 'Εργαλείο',
  compare: [
    { label: 'Ξεκινά από τα δικά σας δεδομένα Search Console', agency: 'some', tool: 'some' },
    { label: 'Διορθώσεις με σειρά και εκτίμηση κλικ', agency: 'no', tool: 'some' },
    { label: 'Ομάδα που υλοποιεί τις διορθώσεις', agency: 'yes', tool: 'no' },
    { label: 'Ορατότητα σε ChatGPT, Gemini, Perplexity, AI Overviews', agency: 'some', tool: 'some' },
    { label: 'Κάθε αλλαγή σημειωμένη στο γράφημα', agency: 'no', tool: 'no' },
    { label: 'Δωρεάν έλεγχος πριν από συμφωνία', agency: 'some', tool: 'no' },
    { label: 'Χωρίς δέσμευση', agency: 'some', tool: 'yes' },
  ],
  markYes: 'Περιλαμβάνεται',
  markSome: 'Μερικές φορές',
  markNo: 'Συνήθως όχι',
  footnote: '✓ περιλαμβάνεται · ~ μερικές φορές · - συνήθως όχι. Γενική σύγκριση, όχι ισχυρισμός για συγκεκριμένη εταιρεία.',
  numbersEyebrow: 'Σε αριθμούς',
  numbersTitleBefore: '',
  numbersAccent: '10+ χρόνια',
  numbersTitleAfter: ' δουλειάς, όχι υποσχέσεων.',
  numbersLead: 'Η AnotherSEOGuru είναι η ομάδα SEO και κατασκευής ιστοσελίδων της Touristas Technologies. Οργανική ανάπτυξη, χωρίς εγγυήσεις που κανείς δεν μπορεί να τηρήσει.',
  statYears: 'Χρόνια εμπειρίας',
  statProjects: 'Έργα που παραδώσαμε',
  statMarkets: 'Αγορές',
  statReply: 'Χρόνος απάντησης',
  hoursSuffix: 'ώ',
  idealEyebrow: 'Ιδανικό για',
  idealTitle: 'Η εμπειρία μας είναι στον τουρισμό και τη φιλοξενία.',
  allProjects: 'Δείτε όλα τα έργα',
  faqEyebrow: 'FAQ',
  faqTitleBefore: 'Ερωτήσεις που κάνουν ',
  faqAccent: 'οι πελάτες.',
  faqLead: 'Άμεσες απαντήσεις για SEO, GEO/AEO, το App και τον χρόνο παράδοσης. Κάτι άλλο; Απαντάμε μέσα σε 24 ώρες.',
  faqs: [
    {
      q: 'Τι κάνει η AnotherSEOGuru;',
      a: 'Φτιάχνουμε εταιρικές ιστοσελίδες, WooCommerce e-shop και sites ξενοδοχείων, και τα αναπτύσσουμε με τεχνικό SEO, τοπικό SEO, GEO και AEO, για κρατήσεις και αιτήματα, όχι μόνο για επισκέψεις. Το AnotherSEOGuru App σας δίνει τα ίδια εργαλεία Search Console που χρησιμοποιεί η ομάδα μας.',
    },
    {
      q: 'App ή SEO με την ομάδα: τι χρειάζομαι;',
      a: 'Αν έχετε χρόνο και θέλετε τον έλεγχο, ξεκινήστε δωρεάν με το App. Αν θέλετε να γίνει η δουλειά, ξεκινήστε με δωρεάν έλεγχο και την υλοποιεί η ομάδα μας. Πολλοί κάνουν και τα δύο στον ίδιο λογαριασμό.',
    },
    {
      q: 'Τι διαφέρουν GEO, SEO και AEO;',
      a: 'Το SEO σας ανεβάζει στα κλασικά αποτελέσματα της Google. Το AEO οργανώνει το περιεχόμενο ώστε τα συστήματα AI να δίνουν άμεση απάντηση. Το GEO βοηθά την επωνυμία σας να αναφέρεται στα ChatGPT, Perplexity, Gemini και στα Google AI Overviews.',
    },
    {
      q: 'Φτιάχνετε ιστοσελίδες για ξενοδοχεία και ενοικιάσεις αυτοκινήτων;',
      a: 'Ναι. Ο τουρισμός είναι ο κλάδος που ξέρουμε καλύτερα: ξενοδοχεία, βίλες, rent-a-car και εκδρομές, με απευθείας κρατήσεις και πολύγλωσσες σελίδες.',
    },
    {
      q: 'Σε πόσο καιρό φαίνονται αποτελέσματα;',
      a: 'Οι εμφανίσεις στο Search Console συνήθως κινούνται σε 3–6 μήνες. Ουσιαστική αύξηση σε κρατήσεις ή αιτήματα παίρνει συνήθως 6–12 μήνες, ανάλογα με τον ανταγωνισμό και την ταχύτητα του περιεχομένου.',
    },
    {
      q: 'Υπάρχει δέσμευση;',
      a: 'Όχι. Κάθε συνεργασία ξεκινά με δωρεάν έλεγχο SEO, ώστε να βλέπετε τα προβλήματα και τις διορθώσεις πριν δεσμευτείτε.',
    },
  ],
  finalTitleBefore: 'Οι επόμενοι πελάτες σας ήδη ψάχνουν. ',
  finalAccent: 'Ας τους βρούμε.',
  doneEyebrow: 'Το κάνουμε εμείς',
  doneTitle: 'Δωρεάν έλεγχος SEO σε 24 ώρες',
  doneBody: 'Στείλτε μας την ιστοσελίδα σας. Παίρνετε τα προβλήματα που σας κοστίζουν πελάτες, τι να διορθώσετε πρώτα και σταθερή τιμή, στη γλώσσα σας.',
  selfEyebrow: 'Μόνοι σας',
  selfTitle: 'AnotherSEOGuru App',
  selfBody: 'Συνδέστε το Google μόνο για ανάγνωση και πάρτε τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση, για κάθε ιστότοπο που διαχειρίζεστε.',
  sample: 'Δείγμα δεδομένων',
  sampleCaption: 'Ενδεικτικό παράθυρο του προϊόντος. Τα νούμερα είναι δείγμα, όχι αποτέλεσμα πελάτη.',
  workspace: 'Workspace',
  nav: ['Ευκαιρίες', 'Απόδοση', 'Ορατότητα AI', 'Εργασίες', 'Aster AI'],
  tasksCount: '4',
  connected: 'Συνδεδεμένο · μόνο ανάγνωση',
  clicks: 'Οργανικά κλικ',
  ranges: ['12 μ.', '3 μ.', '28 ημ.'],
  shipped: 'Έγινε: ελληνικές σελίδες δωματίων με hreflang',
  doNext: 'Κάντε αυτό τώρα',
  clickImpact: 'έως +966 κλικ/μήνα',
  fixes: [
    { title: 'Top 3 για «boutique hotel paros»', impact: '+412' },
    { title: 'Νέος τίτλος και meta, /paros-hotel-with-pool', impact: '+268' },
    { title: 'Ανανέωση οδηγού, /blog/best-beaches', impact: '+190' },
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
  asterBody: 'Ξεκινήστε από σελίδες που ήδη εμφανίζονται στην αναζήτηση. Την πρώτη διόρθωση την έκανα εργασία, ώστε να μετρήσετε το αποτέλεσμα.',
};

export function homeCopy(locale: SiteLocale): HomeCopy {
  return locale === 'el' ? el : en;
}
