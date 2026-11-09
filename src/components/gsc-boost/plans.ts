import { c, type Copy } from "./copy";

/**
 * AnotherSEOGuru App plans, copied from the app's plan catalog (gsc-gemini-boost
 * src/lib/plans.ts, origin/main). Plan names must stay identical: the app's
 * checkout resolves Stripe prices by plan name, and `/signup?plan=&cycle=`
 * preselects the plan a visitor picked here. Prices are US dollars.
 *
 * When the app changes a price, credit allowance or limit, change it here too.
 * Never round or invent a figure on the website.
 */

export type PlanId = "Starter" | "Pro" | "Agency";
export type BillingCycle = "monthly" | "yearly";

export interface Plan {
  readonly id: PlanId;
  readonly tagline: Copy;
  readonly monthly: number;
  /** Billed once per year (two months free). */
  readonly yearly: number;
  readonly credits: number;
  readonly sites: number;
  readonly seats: number;
  readonly keywords: number;
  readonly prompts: number;
  readonly highlight?: boolean;
  readonly features: ReadonlyArray<Copy>;
}

export const PLANS: ReadonlyArray<Plan> = [
  {
    id: "Starter",
    tagline: c("For one business with one or two sites.", "Για μία επιχείρηση με έναν ή δύο ιστοτόπους."),
    monthly: 19,
    yearly: 190,
    credits: 500,
    sites: 2,
    seats: 1,
    keywords: 100,
    prompts: 10,
    features: [
      c("Every fix the engine finds, with click impact", "Κάθε διόρθωση που βρίσκει η μηχανή, με αντίκτυπο σε κλικ"),
      c("Unlimited tasks with measured results", "Απεριόριστες εργασίες με μετρημένα αποτελέσματα"),
      c("100 tracked keywords and alerts", "100 λέξεις-κλειδιά σε παρακολούθηση και ειδοποιήσεις"),
      c("10 AI visibility prompts", "10 prompts ορατότητας στην AI"),
      c("GA4, widgets and the iPhone app", "GA4, widgets και η εφαρμογή για iPhone"),
    ],
  },
  {
    id: "Pro",
    tagline: c("For marketers and freelancers who ship every week.", "Για marketers και freelancers που δημοσιεύουν κάθε εβδομάδα."),
    monthly: 49,
    yearly: 490,
    credits: 2500,
    sites: 5,
    seats: 2,
    keywords: 500,
    prompts: 50,
    highlight: true,
    features: [
      c("Everything in Starter", "Όλα όσα περιλαμβάνει το Starter"),
      c("AI visibility in ChatGPT, Gemini, Perplexity and AI Overviews", "Ορατότητα στην AI σε ChatGPT, Gemini, Perplexity και AI Overviews"),
      c("Content briefs, writer, optimizer and revamp", "Briefs περιεχομένου, συγγραφή, βελτιστοποίηση και ανανέωση"),
      c("Autopilot fixes on WordPress and GitHub", "Αυτόματες διορθώσεις σε WordPress και GitHub"),
      c("Competitors, keyword gap, backlinks and local grid", "Ανταγωνιστές, keyword gap, backlinks και τοπικό grid"),
      c("Weekly site audits up to 5,000 pages", "Εβδομαδιαίοι έλεγχοι ιστότοπου έως 5.000 σελίδες"),
    ],
  },
  {
    id: "Agency",
    tagline: c("For agencies managing many clients and sites.", "Για γραφεία που διαχειρίζονται πολλούς πελάτες και ιστοτόπους."),
    monthly: 299,
    yearly: 2990,
    credits: 25000,
    sites: 30,
    seats: 5,
    keywords: 5000,
    prompts: 300,
    features: [
      c("Everything in Pro", "Όλα όσα περιλαμβάνει το Pro"),
      c("White-label client reports", "Αναφορές πελατών white-label"),
      c("Site audits up to 20,000 pages per site", "Έλεγχοι ιστότοπου έως 20.000 σελίδες ανά ιστότοπο"),
      c("Onboarding call and priority support", "Κλήση γνωριμίας και υποστήριξη προτεραιότητας"),
    ],
  },
];

/** The free plan: no card, forever. */
export const FREE_PLAN = { credits: 25, sites: 1, seats: 1, keywords: 10, prompts: 3 } as const;

/** Card-free reverse trial: Pro features for 7 days. */
export const TRIAL = { days: 7, credits: 250, sites: 1 } as const;

export interface Addon {
  readonly id: string;
  readonly name: Copy;
  readonly monthly: number;
  readonly yearly: number;
}

/** Recurring add-ons on any paid plan (the app's billing_addons). */
export const ADDONS: ReadonlyArray<Addon> = [
  { id: "extra_site", name: c("Extra site", "Επιπλέον ιστότοπος"), monthly: 5, yearly: 50 },
  { id: "extra_keywords", name: c("500 more tracked keywords", "500 επιπλέον λέξεις-κλειδιά"), monthly: 9, yearly: 90 },
  { id: "extra_prompts", name: c("50 more AI visibility prompts", "50 επιπλέον prompts ορατότητας AI"), monthly: 19, yearly: 190 },
  { id: "monthly_credits", name: c("2,500 credits every month", "2.500 μονάδες κάθε μήνα"), monthly: 25, yearly: 250 },
  { id: "white_label", name: c("White-label reports", "Αναφορές white-label"), monthly: 29, yearly: 290 },
];

export function planById(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

export function yearlySavings(plan: Plan): number {
  return plan.monthly * 12 - plan.yearly;
}

export const LOWEST_MONTHLY = Math.min(...PLANS.map((p) => p.monthly));
export const HIGHEST_MONTHLY = Math.max(...PLANS.map((p) => p.monthly));

/**
 * Comparison groups for the pricing page. Every public feature row is placed
 * in one of these groups. A feature that is not listed falls through to
 * "other" and still renders, so a new plan bullet cannot disappear.
 */
export const COMPARISON_GROUPS = [
  { id: "usage", label: c("Usage", "Χρήση") },
  { id: "search-console", label: c("Search Console", "Search Console") },
  { id: "ai-content", label: c("AI and content", "AI και περιεχόμενο") },
  { id: "competitors", label: c("Competitors and AI visibility", "Ανταγωνιστές και ορατότητα στην AI") },
  { id: "agency", label: c("Agency", "Agency") },
  { id: "support", label: c("Support", "Υποστήριξη") },
] as const;

export type ComparisonGroupId = (typeof COMPARISON_GROUPS)[number]["id"] | "other";

const FEATURE_GROUP: Readonly<Record<string, ComparisonGroupId>> = {
  "100 tracked keywords and alerts": "usage",
  "Every fix the engine finds, with click impact": "search-console",
  "Unlimited tasks with measured results": "search-console",
  "GA4, widgets and the iPhone app": "search-console",
  "Weekly site audits up to 5,000 pages": "search-console",
  "Content briefs, writer, optimizer and revamp": "ai-content",
  "Autopilot fixes on WordPress and GitHub": "ai-content",
  "10 AI visibility prompts": "competitors",
  "AI visibility in ChatGPT, Gemini, Perplexity and AI Overviews": "competitors",
  "Competitors, keyword gap, backlinks and local grid": "competitors",
  "White-label client reports": "agency",
  "Site audits up to 20,000 pages per site": "agency",
  "Onboarding call and priority support": "support",
};

export interface ComparisonRow {
  readonly feature: Copy;
  readonly included: ReadonlyArray<boolean>;
  readonly group: ComparisonGroupId;
}

/**
 * Feature rows for the comparison table, derived from PLANS so it can never
 * drift: each plan includes its own features plus everything below it.
 */
export function comparisonRows(): ReadonlyArray<ComparisonRow> {
  const rows: ComparisonRow[] = [];
  PLANS.forEach((plan, planIndex) => {
    for (const feature of plan.features) {
      if (/^everything in/i.test(feature.en)) continue;
      rows.push({
        feature,
        included: PLANS.map((_, i) => i >= planIndex),
        group: FEATURE_GROUP[feature.en] ?? "other",
      });
    }
  });
  return rows;
}

export interface CreditPack {
  readonly name: string;
  readonly credits: number;
  readonly bonus: number;
  readonly price: number;
}

/** Names match the app's `credit_packages.name`. */
export const CREDIT_PACKS: ReadonlyArray<CreditPack> = [
  { name: "1,000 credits", credits: 1000, bonus: 0, price: 12 },
  { name: "5,000 credits", credits: 5000, bonus: 0, price: 49 },
  { name: "20,000 credits", credits: 20000, bonus: 0, price: 159 },
];

/** The app's published rate card (src/lib/plans.ts CREDIT_COSTS). */
export const CREDIT_COSTS = {
  gsc: 0,
  keyword_research: 5,
  keyword_autocomplete: 2,
  keyword_clustering: 2,
  topic_clusters: 5,
  serp_overview: 2,
  rank_tracking_per_keyword: 1,
  ai_overview_check: 1,
  ai_content_brief: 10,
  meta_description_generator: 1,
  faq_schema: 2,
  crawl_fetch: 1,
  cwv_check: 1,
  technical_audit: 5,
  indexability_report: 3,
  internal_links_analysis: 5,
  site_audit: 8,
  competitor_analysis: 3,
  content_gap_analysis: 5,
  backlink_lookup: 2,
  llm_citation_tracker: 3,
  citation_optimization: 5,
  eeat_audit: 12,
  merge_plan: 3,
  cannibal_resolve: 3,
  seo_ai_chat: 1,
  website_import: 1,
  wordpress_publish: 1,
} as const;

export type CreditFeature = keyof typeof CREDIT_COSTS;

export const COST_LABELS: Readonly<Record<CreditFeature, Copy>> = {
  gsc: c("Search Console analysis", "Ανάλυση Search Console"),
  keyword_research: c("Keyword research lookup", "Αναζήτηση λέξης-κλειδιού"),
  keyword_autocomplete: c("Autocomplete ideas", "Ιδέες autocomplete"),
  keyword_clustering: c("Keyword clustering", "Ομαδοποίηση λέξεων-κλειδιών"),
  topic_clusters: c("Topic cluster map", "Χάρτης θεματικών ομάδων"),
  serp_overview: c("SERP overview", "Επισκόπηση SERP"),
  rank_tracking_per_keyword: c("Rank check, per keyword", "Έλεγχος θέσης, ανά λέξη-κλειδί"),
  ai_overview_check: c("Google AI Overview check", "Έλεγχος Google AI Overview"),
  ai_content_brief: c("AI content brief", "Πλάνο περιεχομένου με AI"),
  meta_description_generator: c("Title & meta description ideas", "Ιδέες για τίτλο & meta description"),
  faq_schema: c("FAQ schema", "FAQ schema"),
  crawl_fetch: c("Single page fetch", "Ανάκτηση μίας σελίδας"),
  cwv_check: c("Core Web Vitals check", "Έλεγχος Core Web Vitals"),
  technical_audit: c("Technical audit", "Τεχνικός έλεγχος"),
  indexability_report: c("Indexability report", "Αναφορά ευρετηρίασης"),
  internal_links_analysis: c("Internal links analysis", "Ανάλυση εσωτερικών συνδέσμων"),
  site_audit: c("Full site audit", "Πλήρης έλεγχος ιστότοπου"),
  competitor_analysis: c("Competitor analysis", "Ανάλυση ανταγωνιστών"),
  content_gap_analysis: c("Keyword gap analysis", "Ανάλυση keyword gap"),
  backlink_lookup: c("Backlink lookup", "Αναζήτηση backlinks"),
  llm_citation_tracker: c("AI citation check (ChatGPT, Gemini, Perplexity)", "Έλεγχος παραπομπών AI (ChatGPT, Gemini, Perplexity)"),
  citation_optimization: c("Citation optimization plan", "Πλάνο βελτιστοποίησης παραπομπών"),
  eeat_audit: c("E-E-A-T audit", "Έλεγχος E-E-A-T"),
  merge_plan: c("Page merge plan", "Πλάνο συγχώνευσης σελίδων"),
  cannibal_resolve: c("Cannibalization fix plan", "Πλάνο διόρθωσης κανιβαλισμού"),
  seo_ai_chat: c("AI assistant question", "Ερώτηση στον βοηθό AI"),
  website_import: c("Website or WordPress import", "Εισαγωγή ιστότοπου ή WordPress"),
  wordpress_publish: c("Publish a page to WordPress", "Δημοσίευση σελίδας στο WordPress"),
};

export interface CostLine {
  readonly label: Copy;
  readonly credits: number;
}

export function cost(feature: CreditFeature, label?: Copy): CostLine {
  return { label: label ?? COST_LABELS[feature], credits: CREDIT_COSTS[feature] };
}

/** What a month of credits covers, as on the app's pricing page. */
export const CREDIT_EXAMPLES: ReadonlyArray<CostLine> = [
  {
    label: c("Search Console analytics, opportunities & client reports", "Αναλυτικά Search Console, ευκαιρίες & αναφορές πελατών"),
    credits: CREDIT_COSTS.gsc,
  },
  { label: c("Question to the AI assistant", "Ερώτηση στον βοηθό AI"), credits: CREDIT_COSTS.seo_ai_chat },
  { label: c("SERP overview for a keyword", "Επισκόπηση SERP για μια λέξη-κλειδί"), credits: CREDIT_COSTS.serp_overview },
  { label: c("Keyword research lookup", "Αναζήτηση λέξης-κλειδιού"), credits: CREDIT_COSTS.keyword_research },
  { label: c("Site audit run", "Εκτέλεση ελέγχου ιστότοπου"), credits: CREDIT_COSTS.site_audit },
  { label: c("AI content brief", "Πλάνο περιεχομένου με AI"), credits: CREDIT_COSTS.ai_content_brief },
];
