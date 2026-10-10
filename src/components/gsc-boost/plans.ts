import { c, type Copy } from "./copy";

/**
 * GSC Boost plans, copied from the app's plan catalog (gsc-gemini-boost
 * src/lib/plans.ts, origin/main). Plan names must stay identical: the app's
 * checkout resolves Stripe prices by plan name, and `/signup?plan=&cycle=`
 * preselects the plan a visitor picked here. Prices are US dollars.
 *
 * When the app changes a price, credit allowance or limit, change it here too.
 * Never round or invent a figure on the website.
 */

export type PlanId = "Launch" | "Growth" | "Agency";
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
  readonly highlight?: boolean;
  readonly features: ReadonlyArray<Copy>;
}

export const PLANS: ReadonlyArray<Plan> = [
  {
    id: "Launch",
    tagline: c(
      "For founders and in-house marketers running one or two sites.",
      "Για ιδρυτές και in-house marketers με έναν ή δύο ιστοτόπους.",
    ),
    monthly: 29,
    yearly: 290,
    credits: 1200,
    sites: 3,
    seats: 1,
    features: [
      c("Search Console performance & annotations", "Απόδοση Search Console & σημειώσεις"),
      c("Opportunity engine with click-impact estimates", "Μηχανή ευκαιριών με εκτίμηση αντίκτυπου σε κλικ"),
      c("Keyword research & rank tracking", "Έρευνα λέξεων-κλειδιών & παρακολούθηση θέσεων"),
      c("Site audit and page inspector", "Έλεγχος ιστότοπου και επιθεώρηση σελίδων"),
      c("AI assistant for your data", "Βοηθός AI για τα δεδομένα σας"),
    ],
  },
  {
    id: "Growth",
    tagline: c("For growing teams that ship content every week.", "Για ομάδες σε ανάπτυξη που δημοσιεύουν περιεχόμενο κάθε εβδομάδα."),
    monthly: 79,
    yearly: 790,
    credits: 6000,
    sites: 10,
    seats: 3,
    highlight: true,
    features: [
      c("Everything in Launch", "Όλα όσα περιλαμβάνει το Launch"),
      c("Content briefs, AI writer & WordPress publishing", "Briefs περιεχομένου, συγγραφή με AI & δημοσίευση στο WordPress"),
      c("Competitor gaps, backlinks & SERP explorer", "Κενά έναντι ανταγωνιστών, backlinks & εξερεύνηση SERP"),
      c("AI visibility tracking (ChatGPT, Gemini, Perplexity)", "Παρακολούθηση ορατότητας στην AI (ChatGPT, Gemini, Perplexity)"),
      c("Priority support", "Υποστήριξη προτεραιότητας"),
    ],
  },
  {
    id: "Agency",
    tagline: c("For agencies managing many clients and sites.", "Για γραφεία που διαχειρίζονται πολλούς πελάτες και ιστοτόπους."),
    monthly: 149,
    yearly: 1490,
    credits: 20000,
    sites: 30,
    seats: 10,
    features: [
      c("Everything in Growth", "Όλα όσα περιλαμβάνει το Growth"),
      c("Client CRM, pipeline & tasks", "CRM πελατών, pipeline & εργασίες"),
      c("White-label client reports", "Αναφορές πελατών white-label"),
      c("Bulk site switching for 30 sites", "Γρήγορη εναλλαγή μεταξύ 30 ιστοτόπων"),
      c("Dedicated onboarding", "Αποκλειστική υποστήριξη ενσωμάτωσης"),
    ],
  },
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
 * Feature rows for the comparison table, derived from PLANS so it can never
 * drift: each plan includes its own features plus everything below it.
 */
export function comparisonRows(): ReadonlyArray<{ feature: Copy; included: ReadonlyArray<boolean> }> {
  const rows: Array<{ feature: Copy; included: boolean[] }> = [];
  PLANS.forEach((plan, planIndex) => {
    for (const feature of plan.features) {
      if (/^everything in/i.test(feature.en)) continue;
      rows.push({ feature, included: PLANS.map((_, i) => i >= planIndex) });
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
  { name: "Starter Pack", credits: 100, bonus: 0, price: 10 },
  { name: "Growth Pack", credits: 500, bonus: 50, price: 40 },
  { name: "Pro Pack", credits: 1000, bonus: 150, price: 70 },
  { name: "Enterprise Pack", credits: 5000, bonus: 1000, price: 300 },
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
  keyword_research: c("Keyword research lookup", "Αναζήτηση έρευνας λέξεων-κλειδιών"),
  keyword_autocomplete: c("Autocomplete ideas", "Ιδέες autocomplete"),
  keyword_clustering: c("Keyword clustering", "Ομαδοποίηση λέξεων-κλειδιών"),
  topic_clusters: c("Topic cluster map", "Χάρτης θεματικών ομάδων"),
  serp_overview: c("SERP overview", "Επισκόπηση SERP"),
  rank_tracking_per_keyword: c("Rank check, per keyword", "Έλεγχος θέσης, ανά λέξη-κλειδί"),
  ai_overview_check: c("Google AI Overview check", "Έλεγχος Google AI Overview"),
  ai_content_brief: c("AI content brief", "Brief περιεχομένου με AI"),
  meta_description_generator: c("Title & meta description ideas", "Ιδέες για τίτλο & meta description"),
  faq_schema: c("FAQ schema", "FAQ schema"),
  crawl_fetch: c("Single page fetch", "Ανάκτηση μίας σελίδας"),
  cwv_check: c("Core Web Vitals check", "Έλεγχος Core Web Vitals"),
  technical_audit: c("Technical audit", "Τεχνικός έλεγχος"),
  indexability_report: c("Indexability report", "Αναφορά δυνατότητας ευρετηρίασης"),
  internal_links_analysis: c("Internal links analysis", "Ανάλυση εσωτερικών συνδέσμων"),
  site_audit: c("Full site audit", "Πλήρης έλεγχος ιστότοπου"),
  competitor_analysis: c("Competitor analysis", "Ανάλυση ανταγωνιστών"),
  content_gap_analysis: c("Keyword gap analysis", "Ανάλυση κενού λέξεων-κλειδιών"),
  backlink_lookup: c("Backlink lookup", "Αναζήτηση backlinks"),
  llm_citation_tracker: c("AI citation check (ChatGPT, Gemini, Perplexity)", "Έλεγχος παραπομπών AI (ChatGPT, Gemini, Perplexity)"),
  citation_optimization: c("Citation optimization plan", "Πρόγραμμα βελτιστοποίησης παραπομπών"),
  eeat_audit: c("E-E-A-T audit", "Έλεγχος E-E-A-T"),
  merge_plan: c("Page merge plan", "Πρόγραμμα συγχώνευσης σελίδων"),
  cannibal_resolve: c("Cannibalization fix plan", "Πρόγραμμα διόρθωσης κανιβαλισμού"),
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
  { label: c("Keyword research lookup", "Αναζήτηση έρευνας λέξεων-κλειδιών"), credits: CREDIT_COSTS.keyword_research },
  { label: c("Site audit run", "Εκτέλεση ελέγχου ιστότοπου"), credits: CREDIT_COSTS.site_audit },
  { label: c("AI content brief", "Brief περιεχομένου με AI"), credits: CREDIT_COSTS.ai_content_brief },
];
