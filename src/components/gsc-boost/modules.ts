import { Bot, Building2, KeyRound, LineChart, MessageSquare, PenLine, ShieldCheck, Sparkles, Swords, type LucideIcon } from "lucide-react";
import { c, type Copy } from "./copy";
import { cost, CREDIT_COSTS, type CostLine, type PlanId } from "./plans";

/**
 * The nine GSC Boost modules, adapted from the app's
 * src/marketing/content/modules.tsx. The ids are the anchors on
 * /platform/features (the site menu links to /platform/features#<id>), so
 * keep them stable.
 */

export type ModuleId =
  | "opportunities"
  | "performance"
  | "keywords"
  | "content"
  | "audit"
  | "competitors"
  | "ai-visibility"
  | "assistant"
  | "agency";

export interface ProductModule {
  readonly id: ModuleId;
  readonly name: Copy;
  readonly icon: LucideIcon;
  /** Headline in three parts so the middle can be set in the serif accent. */
  readonly title: { readonly lead: Copy; readonly accent: Copy; readonly tail?: Copy };
  readonly tagline: Copy;
  readonly summary: Copy;
  readonly bullets: ReadonlyArray<Copy>;
  readonly what: ReadonlyArray<Copy>;
  readonly why: Copy;
  readonly costs: ReadonlyArray<CostLine>;
  readonly plans: ReadonlyArray<PlanId>;
  /** Path inside the app's public demo. */
  readonly demoPath: string;
}

const ALL: ReadonlyArray<PlanId> = ["Launch", "Growth", "Agency"];
const GROWTH_UP: ReadonlyArray<PlanId> = ["Growth", "Agency"];

export const MODULES: ReadonlyArray<ProductModule> = [
  {
    id: "opportunities",
    name: c("Opportunities", "Ευκαιρίες"),
    icon: Sparkles,
    title: {
      lead: c("The fixes that win the most clicks,", "Οι διορθώσεις που φέρνουν τα περισσότερα κλικ,"),
      accent: c("ranked", "ταξινομημένες"),
    },
    tagline: c("Ranked fixes with an estimated click impact for each.", "Διορθώσεις κατά προτεραιότητα, με εκτίμηση των επιπλέον κλικ για την καθεμία."),
    summary: c(
      "GSC Boost reads every query and page in your Search Console data and turns them into one ranked list of fixes, each with an estimate of the extra clicks it could bring per month.",
      "Το GSC Boost διαβάζει κάθε αναζήτηση και κάθε σελίδα στα δεδομένα του Search Console σας και τα μετατρέπει σε μία λίστα διορθώσεων με σειρά προτεραιότητας, η καθεμία με εκτίμηση για τα επιπλέον κλικ που μπορεί να φέρει κάθε μήνα.",
    ),
    bullets: [
      c("Striking-distance keywords on positions 4–20 with real demand", "Λέξεις-κλειδιά κοντά στην κορυφή, στις θέσεις 4–20, με πραγματική ζήτηση"),
      c("Snippets that earn fewer clicks than their position should", "Snippets που παίρνουν λιγότερα κλικ απ’ όσα δικαιολογεί η θέση τους"),
      c("Decaying pages, cannibalization and missing content", "Σελίδες σε φθορά, κανιβαλισμός και περιεχόμενο που λείπει"),
    ],
    what: [
      c(
        "Scans every query and page for five kinds of opportunity: striking distance, low CTR, content decay, cannibalization and missing content.",
        "Σαρώνει κάθε ερώτημα και σελίδα για πέντε είδη ευκαιριών: λέξεις-κλειδιά κοντά στην κορυφή, χαμηλό CTR, φθορά περιεχομένου, κανιβαλισμό και περιεχόμενο που λείπει.",
      ),
      c(
        "Estimates extra clicks per month for each fix with a CTR curve fitted to your own non-brand queries.",
        "Εκτιμά τα επιπλέον κλικ ανά μήνα για κάθε διόρθωση, με καμπύλη CTR προσαρμοσμένη στις δικές σας non-brand αναζητήσεις.",
      ),
      c(
        "Ranks fixes by impact for the effort involved, and shows the numbers behind every estimate.",
        "Ταξινομεί τις διορθώσεις με βάση το όφελος σε σχέση με τον κόπο και δείχνει τα νούμερα πίσω από κάθε εκτίμηση.",
      ),
      c(
        "Sends any fix to your task list, or to the AI assistant with the context attached.",
        "Στέλνει οποιαδήποτε διόρθωση στη λίστα εργασιών σας ή στον βοηθό AI, μαζί με όλο το context.",
      ),
    ],
    why: c(
      "Search Console tells you what happened. The opportunity list tells you what to do next and roughly what it’s worth, so the biggest wins stop sitting unnoticed on page two.",
      "Το Search Console σάς λέει τι συνέβη. Η λίστα ευκαιριών σάς λέει τι να κάνετε μετά και περίπου πόσο αξίζει, ώστε οι μεγαλύτερες ευκαιρίες να μη μένουν απαρατήρητες στη δεύτερη σελίδα.",
    ),
    costs: [
      cost("gsc", c("Finding and ranking opportunities", "Εντοπισμός και ταξινόμηση ευκαιριών")),
      cost("seo_ai_chat", c("Asking the AI how to fix one", "Ερώτηση στην AI για το πώς να διορθώσετε μία")),
      cost("cannibal_resolve"),
      cost("merge_plan"),
    ],
    plans: ALL,
    demoPath: "/demo/opportunities",
  },
  {
    id: "performance",
    name: c("Performance", "Απόδοση"),
    icon: LineChart,
    title: { lead: c("Every change in traffic,", "Κάθε αλλαγή στην επισκεψιμότητα,"), accent: c("explained", "εξηγημένη") },
    tagline: c("Clicks, impressions, CTR and rankings, with comparisons and annotations.", "Κλικ, εμφανίσεις, CTR και θέσεις κατάταξης, με συγκρίσεις και σημειώσεις."),
    summary: c(
      "Clicks, impressions, CTR and position for every query, page, country and device, with period comparisons and annotations for your releases and Google’s updates.",
      "Κλικ, εμφανίσεις, CTR και θέση για κάθε ερώτημα, σελίδα, χώρα και συσκευή, με συγκρίσεις περιόδων και σημειώσεις για τις δικές σας αλλαγές και τις ενημερώσεις της Google.",
    ),
    bullets: [
      c("Compare with the previous period or the same period last year", "Σύγκριση με την προηγούμενη περίοδο ή την ίδια περίοδο πέρσι"),
      c("Your releases and confirmed Google updates, marked on the chart", "Οι αλλαγές σας και οι επιβεβαιωμένες ενημερώσεις της Google, σημειωμένες πάνω στο γράφημα"),
      c("Up to 16 months of history, segmented by device and country", "Έως 16 μήνες ιστορικό, ανά συσκευή και χώρα"),
    ],
    what: [
      c("Daily, weekly or monthly trends for clicks, impressions, CTR and average position.", "Ημερήσιες, εβδομαδιαίες ή μηνιαίες τάσεις για κλικ, εμφανίσεις, CTR και μέση θέση."),
      c(
        "Drill into queries, pages, countries and devices, then export any table to CSV.",
        "Εμβαθύνετε σε αναζητήσεις, σελίδες, χώρες και συσκευές και εξαγάγετε οποιονδήποτε πίνακα σε CSV.",
      ),
      c("Compare with the previous period or year over year.", "Σύγκριση με την προηγούμενη περίοδο ή με την αντίστοιχη περσινή."),
      c(
        "Mark your own changes on the chart; confirmed Google ranking updates appear automatically.",
        "Σημειώστε τις δικές σας αλλαγές στο γράφημα· οι επιβεβαιωμένες ενημερώσεις κατάταξης της Google εμφανίζονται αυτόματα.",
      ),
    ],
    why: c(
      "When traffic moves, you need the reason in minutes, not after an afternoon in spreadsheets. Annotations and comparisons put cause and effect on the same chart.",
      "Όταν η επισκεψιμότητα αλλάζει, χρειάζεστε την αιτία σε λίγα λεπτά, όχι μετά από ένα απόγευμα με spreadsheets. Οι σημειώσεις και οι συγκρίσεις βάζουν αιτία και αποτέλεσμα στο ίδιο γράφημα.",
    ),
    costs: [cost("gsc", c("Performance reports, comparisons and annotations", "Αναφορές απόδοσης, συγκρίσεις και σημειώσεις"))],
    plans: ALL,
    demoPath: "/demo/performance",
  },
  {
    id: "keywords",
    name: c("Keywords", "Λέξεις-κλειδιά"),
    icon: KeyRound,
    title: { lead: c("Find the demand.", "Βρείτε τη ζήτηση."), accent: c("Track", "Παρακολουθήστε"), tail: c("what you win.", "όσα κερδίζετε.") },
    tagline: c("Keyword research, rank tracking and topic clusters.", "Έρευνα λέξεων-κλειδιών, παρακολούθηση θέσεων και θεματικές ομάδες."),
    summary: c(
      "Research keywords with volume, difficulty and intent, see who ranks today, group ideas into topics and track the positions that matter to you.",
      "Ερευνήστε λέξεις-κλειδιά με όγκο, δυσκολία και πρόθεση αναζήτησης, δείτε ποιος κατατάσσεται σήμερα, ομαδοποιήστε ιδέες σε θέματα και παρακολουθήστε τις θέσεις που σας ενδιαφέρουν.",
    ),
    bullets: [
      c("Volume, difficulty and intent for every idea", "Όγκος, δυσκολία και πρόθεση για κάθε ιδέα"),
      c("A SERP overview of who ranks and what they cover", "Επισκόπηση SERP: ποιος κατατάσσεται και τι καλύπτει"),
      c("Rank tracking with history for the keywords you choose", "Παρακολούθηση θέσεων με ιστορικό για τις λέξεις-κλειδιά που επιλέγετε"),
    ],
    what: [
      c(
        "Keyword ideas from a seed term, with search volume, difficulty, intent and trend.",
        "Ιδέες λέξεων-κλειδιών από έναν αρχικό όρο, με όγκο αναζητήσεων, δυσκολία, πρόθεση και τάση.",
      ),
      c("Shows where you already rank, straight from Search Console.", "Δείχνει πού ήδη κατατάσσεστε, απευθείας από το Search Console."),
      c(
        "A SERP overview for any keyword: the pages that rank and what they cover.",
        "Επισκόπηση SERP για οποιαδήποτε λέξη-κλειδί: οι σελίδες που κατατάσσονται και τι καλύπτουν.",
      ),
      c("Groups related keywords into clusters and topic maps.", "Ομαδοποιεί σχετικές λέξεις-κλειδιά σε ομάδες και θεματικούς χάρτες."),
      c("Tracks positions for the keywords you choose, with history.", "Παρακολουθεί τις θέσεις για τις λέξεις-κλειδιά που επιλέγετε, με ιστορικό."),
    ],
    why: c(
      "Search Console only shows queries you already appear for. Research shows the demand you are missing, and tracking shows whether your work is paying off.",
      "Το Search Console δείχνει μόνο αναζητήσεις στις οποίες ήδη εμφανίζεστε. Η έρευνα δείχνει τη ζήτηση που χάνετε και η παρακολούθηση δείχνει αν η δουλειά σας αποδίδει.",
    ),
    costs: [
      cost("keyword_research"),
      cost("keyword_autocomplete"),
      cost("serp_overview"),
      cost("keyword_clustering"),
      cost("topic_clusters"),
      cost("rank_tracking_per_keyword"),
    ],
    plans: ALL,
    demoPath: "/demo/keywords",
  },
  {
    id: "content",
    name: c("Content", "Περιεχόμενο"),
    icon: PenLine,
    title: {
      lead: c("From brief to", "Από το brief μέχρι το"),
      accent: c("published", "δημοσιευμένο"),
      tail: c(", in one place", "κείμενο, όλα σε ένα σημείο"),
    },
    tagline: c("Briefs, AI writing, optimization and WordPress publishing.", "Briefs, γραφή με AI, βελτιστοποίηση και δημοσίευση στο WordPress."),
    summary: c(
      "Build briefs from what already ranks, write and score drafts against them, and publish to WordPress without copy and paste.",
      "Δημιουργήστε briefs με βάση ό,τι ήδη κατατάσσεται, γράψτε και βαθμολογήστε κείμενα με βάση αυτά και δημοσιεύστε στο WordPress χωρίς copy-paste.",
    ),
    bullets: [
      c("AI briefs with an outline, questions and entities to cover", "AI briefs με δομή, ερωτήσεις και οντότητες που πρέπει να καλύψετε"),
      c("An optimizer that scores drafts and suggests titles and descriptions", "Βελτιστοποιητής που βαθμολογεί τα κείμενα και προτείνει τίτλους και περιγραφές"),
      c("Import from and publish to WordPress", "Εισαγωγή από και δημοσίευση στο WordPress"),
    ],
    what: [
      c(
        "AI content briefs with a recommended outline, word count, questions to answer and entities to cover.",
        "AI content briefs με προτεινόμενη δομή, αριθμό λέξεων, ερωτήσεις που πρέπει να απαντηθούν και οντότητες που πρέπει να καλυφθούν.",
      ),
      c(
        "An optimizer that scores your draft against the brief and flags what is missing.",
        "Βελτιστοποιητής που βαθμολογεί το κείμενό σας σε σχέση με το brief και επισημαίνει τι λείπει.",
      ),
      c(
        "Title and meta description ideas, FAQ schema and E-E-A-T reviews on demand.",
        "Ιδέες για τίτλους και meta descriptions, FAQ schema και αξιολογήσεις E-E-A-T όποτε τις χρειάζεστε.",
      ),
      c(
        "Imports pages from WordPress and publishes drafts back when they are ready.",
        "Εισάγει σελίδες από το WordPress και δημοσιεύει τα κείμενα πίσω μόλις είναι έτοιμα.",
      ),
    ],
    why: c(
      "Most content underperforms because it misses what searchers expect to find. A brief grounded in the live results closes that gap before anyone writes a word.",
      "Το περισσότερο περιεχόμενο δεν αποδίδει επειδή δεν καλύπτει αυτό που περιμένουν να βρουν οι χρήστες. Ένα brief βασισμένο στα πραγματικά αποτελέσματα κλείνει αυτό το κενό πριν γραφτεί έστω και μία λέξη.",
    ),
    costs: [
      cost("ai_content_brief"),
      cost("meta_description_generator"),
      cost("faq_schema"),
      cost("eeat_audit"),
      { label: c("Publish to WordPress", "Δημοσίευση στο WordPress"), credits: CREDIT_COSTS.wordpress_publish },
    ],
    plans: GROWTH_UP,
    demoPath: "/demo/content",
  },
  {
    id: "audit",
    name: c("Site audit", "Έλεγχος ιστότοπου"),
    icon: ShieldCheck,
    title: { lead: c("Technical issues,", "Τεχνικά προβλήματα,"), accent: c("prioritized", "με σειρά προτεραιότητας") },
    tagline: c("Technical health, indexability and Core Web Vitals.", "Τεχνική υγεία, δυνατότητα ευρετηρίασης και Core Web Vitals."),
    summary: c(
      "Crawl your site for the problems that cost rankings, such as broken pages, indexability blockers and slow templates, and fix the important ones first.",
      "Κάντε crawl στον ιστότοπό σας για να βρείτε τα προβλήματα που κοστίζουν θέσεις κατάταξης, όπως σπασμένες σελίδες, εμπόδια ευρετηρίασης και αργά templates, και διορθώστε πρώτα τα σημαντικά.",
    ),
    bullets: [
      c("A full-site crawl with clear severity levels", "Πλήρες crawl του ιστότοπου με σαφή επίπεδα σοβαρότητας"),
      c("Indexability and internal-link analysis", "Ανάλυση ευρετηρίασης και εσωτερικών συνδέσμων"),
      c("Core Web Vitals from Google PageSpeed Insights", "Core Web Vitals από το Google PageSpeed Insights"),
    ],
    what: [
      c(
        "Crawls your site and groups issues into critical, warning and notice.",
        "Κάνει crawl στον ιστότοπό σας και ομαδοποιεί τα προβλήματα σε κρίσιμα, προειδοποιήσεις και παρατηρήσεις.",
      ),
      c(
        "Inspects any single page: titles, headings, meta tags and links.",
        "Ελέγχει οποιαδήποτε μεμονωμένη σελίδα: τίτλους, επικεφαλίδες, meta tags και συνδέσμους.",
      ),
      c(
        "Checks indexability and finds orphaned or weakly linked pages.",
        "Ελέγχει την ευρετηρίαση και εντοπίζει ορφανές ή ανεπαρκώς συνδεδεμένες σελίδες.",
      ),
      c(
        "Measures Core Web Vitals (LCP, INP, CLS) with Google PageSpeed Insights.",
        "Μετρά τα Core Web Vitals (LCP, INP, CLS) με το Google PageSpeed Insights.",
      ),
    ],
    why: c(
      "Technical problems quietly cap how well good content can rank. Clear severities and plain-language fixes show where to start, without a 200-row export.",
      "Τα τεχνικά προβλήματα περιορίζουν αθόρυβα το πόσο ψηλά μπορεί να φτάσει ακόμη και το καλό περιεχόμενο. Σαφή επίπεδα σοβαρότητας και διορθώσεις σε απλή γλώσσα δείχνουν από πού να ξεκινήσετε, χωρίς export 200 γραμμών.",
    ),
    costs: [
      cost("site_audit"),
      cost("technical_audit"),
      cost("crawl_fetch"),
      cost("indexability_report"),
      cost("internal_links_analysis"),
      cost("cwv_check"),
    ],
    plans: ALL,
    demoPath: "/demo/audit",
  },
  {
    id: "competitors",
    name: c("Competitors", "Ανταγωνιστές"),
    icon: Swords,
    title: { lead: c("See what competitors win, and", "Δείτε τι κερδίζουν οι ανταγωνιστές σας, και"), accent: c("how", "πώς") },
    tagline: c("Competitor discovery, keyword gaps and backlinks.", "Εντοπισμός ανταγωνιστών, κενά λέξεων-κλειδιών και backlinks."),
    summary: c(
      "Find out who you really compete with in search, the keywords they rank for that you don’t, and how your backlink profiles compare.",
      "Μάθετε με ποιους πραγματικά ανταγωνίζεστε στην αναζήτηση, για ποιες λέξεις-κλειδιά κατατάσσονται ενώ εσείς όχι και πώς συγκρίνονται τα backlink προφίλ σας.",
    ),
    bullets: [
      c("Organic competitor discovery", "Εντοπισμός οργανικών ανταγωνιστών"),
      c("Keyword gap: their rankings, your blind spots", "Κενό λέξεων-κλειδιών: οι δικές τους θέσεις, τα δικά σας τυφλά σημεία"),
      c("Backlinks and referring domains", "Backlinks και referring domains"),
    ],
    what: [
      c("Discovers the domains that compete with you for the same keywords.", "Εντοπίζει τα domains που ανταγωνίζονται μαζί σας για τις ίδιες λέξεις-κλειδιά."),
      c(
        "Keyword gap analysis: the keywords competitors rank for and you don’t.",
        "Ανάλυση κενού λέξεων-κλειδιών: οι λέξεις-κλειδιά όπου κατατάσσονται οι ανταγωνιστές και εσείς όχι.",
      ),
      c("Backlink and referring-domain lookups for any domain.", "Αναζήτηση backlinks και referring domains για οποιοδήποτε domain."),
      c(
        "A SERP explorer to see exactly who ranks for a keyword today.",
        "Ένας SERP explorer για να δείτε ακριβώς ποιος κατατάσσεται σήμερα για μια λέξη-κλειδί.",
      ),
    ],
    why: c(
      "Your competitors have already tested what works for your audience. A gap analysis turns their rankings into a prioritized content plan for you.",
      "Οι ανταγωνιστές σας έχουν ήδη δοκιμάσει τι λειτουργεί για το κοινό σας. Η ανάλυση κενών μετατρέπει τις θέσεις τους σε πρόγραμμα περιεχομένου με προτεραιότητες για εσάς.",
    ),
    costs: [cost("competitor_analysis"), cost("content_gap_analysis"), cost("backlink_lookup"), cost("serp_overview")],
    plans: GROWTH_UP,
    demoPath: "/demo/competitors",
  },
  {
    id: "ai-visibility",
    name: c("AI visibility", "Ορατότητα στην AI"),
    icon: Bot,
    title: { lead: c("Know when AI", "Μάθετε πότε η AI"), accent: c("recommends you", "σας προτείνει") },
    tagline: c("How ChatGPT, Gemini, Perplexity and AI Overviews mention you.", "Πώς σας αναφέρουν τα ChatGPT, Gemini, Perplexity και τα AI Overviews."),
    summary: c(
      "Track whether ChatGPT, Gemini and Perplexity mention or cite your brand for the questions your buyers ask, and whether you appear in Google’s AI Overviews.",
      "Παρακολουθήστε αν το ChatGPT, το Gemini και το Perplexity αναφέρουν ή παραθέτουν το brand σας στις ερωτήσεις που κάνουν οι πελάτες σας, και αν εμφανίζεστε στα AI Overviews της Google.",
    ),
    bullets: [
      c("Mentions and citations in ChatGPT, Gemini and Perplexity", "Αναφορές και παραπομπές σε ChatGPT, Gemini και Perplexity"),
      c("Google AI Overviews presence for your keywords", "Παρουσία στα Google AI Overviews για τις λέξεις-κλειδιά σας"),
      c("Share of voice against your competitors", "Μερίδιο φωνής σε σχέση με τους ανταγωνιστές σας"),
    ],
    what: [
      c(
        "Runs the prompts you care about through ChatGPT, Gemini and Perplexity and records whether you are mentioned or cited.",
        "Τρέχει τα prompts που σας ενδιαφέρουν σε ChatGPT, Gemini και Perplexity και καταγράφει αν αναφέρεστε ή παρατίθεστε ως πηγή.",
      ),
      c(
        "Checks whether your pages appear in Google’s AI Overviews for your keywords.",
        "Ελέγχει αν οι σελίδες σας εμφανίζονται στα AI Overviews της Google για τις λέξεις-κλειδιά σας.",
      ),
      c(
        "Shows your share of voice against competitors for the prompts you track.",
        "Δείχνει το μερίδιο φωνής σας απέναντι στους ανταγωνιστές για τα prompts που παρακολουθείτε.",
      ),
      c(
        "Suggests changes that make your pages easier for AI systems to cite.",
        "Προτείνει αλλαγές που κάνουν τις σελίδες σας πιο εύκολο να παρατεθούν από συστήματα AI.",
      ),
    ],
    why: c(
      "More buying research now starts in an AI answer. If assistants don’t mention you, that demand never reaches your site, and Search Console can’t show it.",
      "Όλο και περισσότερες αγοραστικές αποφάσεις ξεκινούν πλέον από μια απάντηση AI. Αν οι βοηθοί AI δεν σας αναφέρουν, αυτή η ζήτηση δεν φτάνει ποτέ στον ιστότοπό σας και το Search Console δεν μπορεί να τη δείξει.",
    ),
    costs: [cost("llm_citation_tracker"), cost("ai_overview_check"), cost("citation_optimization")],
    plans: GROWTH_UP,
    demoPath: "/demo/ai-visibility",
  },
  {
    id: "assistant",
    name: c("AI assistant", "Βοηθός AI"),
    icon: MessageSquare,
    title: { lead: c("An assistant that has", "Ένας βοηθός που έχει"), accent: c("read your data", "διαβάσει τα δεδομένα σας") },
    tagline: c("Answers grounded in your own Search Console data.", "Απαντήσεις βασισμένες στα δικά σας δεδομένα Search Console."),
    summary: c(
      "Ask questions in plain language and get answers grounded in your Search Console numbers: why traffic moved, what to fix first, how to rewrite a title.",
      "Κάντε ερωτήσεις σε απλή γλώσσα και πάρτε απαντήσεις βασισμένες στα νούμερα του Search Console σας: γιατί άλλαξε η επισκεψιμότητα, τι να διορθώσετε πρώτα, πώς να ξαναγράψετε έναν τίτλο.",
    ),
    bullets: [
      c("Explains changes with the numbers behind them", "Εξηγεί τις αλλαγές με τα νούμερα που τις τεκμηριώνουν"),
      c("Opens from any opportunity with the context attached", "Ανοίγει από οποιαδήποτε ευκαιρία με όλο το context έτοιμο"),
      c("Drafts titles, descriptions and outlines on request", "Γράφει τίτλους, περιγραφές και δομές κειμένων όταν του ζητηθεί"),
    ],
    what: [
      c("Answers questions about your site using your Search Console data.", "Απαντά σε ερωτήσεις για τον ιστότοπό σας με βάση τα δεδομένα του Search Console."),
      c("Explains what changed between two periods and the likely cause.", "Εξηγεί τι άλλαξε ανάμεσα σε δύο περιόδους και ποια είναι η πιθανή αιτία."),
      c(
        "Opens from any opportunity with the query, page and metrics already attached.",
        "Ανοίγει από οποιαδήποτε ευκαιρία με την αναζήτηση, τη σελίδα και τις μετρήσεις ήδη συνημμένες.",
      ),
      c("Drafts titles, meta descriptions and outlines you can edit.", "Γράφει τίτλους, meta descriptions και δομές κειμένων που μπορείτε να επεξεργαστείτε."),
    ],
    why: c(
      "Analysis is only useful if it turns into a decision. The assistant closes the gap between a number on a chart and the change you should make.",
      "Η ανάλυση έχει αξία μόνο όταν οδηγεί σε απόφαση. Ο βοηθός γεφυρώνει την απόσταση ανάμεσα σε ένα νούμερο στο γράφημα και στην αλλαγή που πρέπει να κάνετε.",
    ),
    costs: [cost("seo_ai_chat")],
    plans: ALL,
    demoPath: "/demo",
  },
  {
    id: "agency",
    name: c("Agency workspace", "Χώρος εργασίας agency"),
    icon: Building2,
    title: { lead: c("Run every client from", "Διαχειριστείτε κάθε πελάτη από"), accent: c("one workspace", "έναν χώρο εργασίας") },
    tagline: c("Clients, pipeline, tasks and white-label reports.", "Πελάτες, pipeline, εργασίες και white-label αναφορές."),
    summary: c(
      "A client CRM, deal pipeline, task list and white-label reports, connected to each client’s Search Console.",
      "CRM πελατών, pipeline πωλήσεων, λίστα εργασιών και white-label αναφορές, συνδεδεμένα με το Search Console κάθε πελάτη.",
    ),
    bullets: [
      c("Clients, contacts, notes and linked sites", "Πελάτες, επαφές, σημειώσεις και συνδεδεμένοι ιστότοποι"),
      c("A pipeline from lead to signed", "Pipeline από το πρώτο lead μέχρι την υπογραφή"),
      c("White-label reports with your branding", "White-label αναφορές με το δικό σας branding"),
    ],
    what: [
      c(
        "A CRM for clients, contacts, notes and the sites you manage for them.",
        "CRM για πελάτες, επαφές, σημειώσεις και τους ιστοτόπους που διαχειρίζεστε για λογαριασμό τους.",
      ),
      c("A deal pipeline from first call to signed contract.", "Pipeline πωλήσεων από το πρώτο τηλεφώνημα μέχρι την υπογραφή του συμβολαίου."),
      c(
        "One task list for every fix and follow-up, linked to the opportunity that created it.",
        "Μία λίστα εργασιών για κάθε διόρθωση και follow-up, συνδεδεμένη με την ευκαιρία από την οποία προέκυψε.",
      ),
      c(
        "Client-ready reports with your logo, ready to print or save as PDF.",
        "Αναφορές έτοιμες για τον πελάτη, με το λογότυπό σας, για εκτύπωση ή αποθήκευση ως PDF.",
      ),
    ],
    why: c(
      "Agencies lose hours every month moving numbers between tools. Keeping clients, work and results in one place gives that time back to the actual SEO.",
      "Τα agencies χάνουν ώρες κάθε μήνα μεταφέροντας νούμερα από εργαλείο σε εργαλείο. Με πελάτες, εργασίες και αποτελέσματα σε ένα σημείο, αυτός ο χρόνος επιστρέφει στο ίδιο το SEO.",
    ),
    costs: [
      { label: c("Client reports", "Αναφορές πελατών"), credits: 0 },
      { label: c("CRM, pipeline and tasks", "CRM, pipeline και εργασίες"), credits: 0 },
    ],
    plans: ["Agency"],
    demoPath: "/demo/clients",
  },
];

export function moduleById(id: ModuleId): ProductModule {
  return MODULES.find((m) => m.id === id) ?? MODULES[0];
}

export function planAvailability(plans: ReadonlyArray<PlanId>): Copy {
  if (plans.length === 3) return c("Every plan", "Όλα τα πακέτα");
  if (plans.length === 2) return c(`${plans[0]} and ${plans[1]}`, `${plans[0]} και ${plans[1]}`);
  return c(`${plans[0]} plan`, `Πακέτο ${plans[0]}`);
}
