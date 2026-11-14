import { Bot, Building2, KeyRound, LineChart, MessageSquare, PenLine, ShieldCheck, Sparkles, Swords, type LucideIcon } from "lucide-react";
import { c, type Copy } from "./copy";
import { cost, CREDIT_COSTS, type CostLine, type PlanId } from "./plans";

/**
 * The nine AnotherSEOGuru App modules, adapted from the app's
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

const ALL: ReadonlyArray<PlanId> = ["Starter", "Pro", "Agency"];
const GROWTH_UP: ReadonlyArray<PlanId> = ["Pro", "Agency"];

export const MODULES: ReadonlyArray<ProductModule> = [
  {
    id: "opportunities",
    name: c("Opportunities", "Ευκαιρίες"),
    icon: Sparkles,
    title: { lead: c("Choose your", "Ποια αλλαγή"), accent: c("next SEO fix", "έχει προτεραιότητα;") },
    tagline: c("Ranked fixes with an estimated click impact for each.", "Διορθώσεις κατά προτεραιότητα, με εκτίμηση των επιπλέον κλικ για την καθεμία."),
    summary: c(
      "Compare pages by the extra monthly clicks a change could bring. Each estimate comes from the impressions and clicks in your own Search Console account.",
      "Συγκρίνετε τις σελίδες σας με βάση τα επιπλέον κλικ που θα μπορούσε να φέρει μια αλλαγή κάθε μήνα. Η εκτίμηση βασίζεται στις εμφανίσεις και στα κλικ του δικού σας Search Console.",
    ),
    bullets: [
      c("Striking-distance keywords on positions 4–20 with real demand", "Λέξεις-κλειδιά κοντά στην κορυφή, στις θέσεις 4–20, με πραγματική ζήτηση"),
      c("Snippets that earn fewer clicks than their position should", "Snippets που παίρνουν λιγότερα κλικ απ’ όσα δικαιολογεί η θέση τους"),
      c("Decaying pages, cannibalization and missing content", "Σελίδες που χάνουν κλικ ή ανταγωνίζονται για τις ίδιες αναζητήσεις και θέματα που λείπουν"),
    ],
    what: [
      c(
        "Scans every query and page for five kinds of opportunity: striking distance, low CTR, content decay, cannibalization and missing content.",
        "Σαρώνει κάθε ερώτημα και σελίδα για πέντε είδη ευκαιριών: λέξεις-κλειδιά κοντά στην κορυφή, χαμηλό CTR, σελίδες που χάνουν κλικ, σελίδες που ανταγωνίζονται για τις ίδιες αναζητήσεις και θέματα που λείπουν.",
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
        "Sends any fix to your task list, or to Aster AI along with the relevant page and query.",
        "Στέλνει οποιαδήποτε διόρθωση στη λίστα εργασιών σας ή στον Aster AI, μαζί με τη σχετική σελίδα και την αναζήτηση.",
      ),
    ],
    why: c(
      "Open a suggestion to check the figures before you turn it into a task.",
      "Ανοίξτε μια πρόταση για να δείτε τα στοιχεία της πριν τη μετατρέψετε σε εργασία.",
    ),
    costs: [
      cost("gsc", c("Finding and ranking opportunities", "Εντοπισμός και ταξινόμηση ευκαιριών")),
      cost("seo_ai_chat", c("Ask Aster AI about a fix", "Ερώτηση στον Aster AI για μια διόρθωση")),
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
    title: { lead: c("See where search traffic", "Πού άλλαξε η επισκεψιμότητα"), accent: c("changed", "από τη Google;") },
    tagline: c("Clicks, impressions, CTR and rankings, with comparisons and annotations.", "Κλικ, εμφανίσεις, CTR και θέσεις κατάταξης, με συγκρίσεις και σημειώσεις."),
    summary: c(
      "Find the pages behind a rise or drop in clicks. Filter by country or device and compare the dates that matter to your business.",
      "Βρείτε σε ποιες σελίδες αυξήθηκαν ή μειώθηκαν τα κλικ. Επιλέξτε χώρα ή συσκευή και συγκρίνετε τις περιόδους που ενδιαφέρουν την επιχείρησή σας.",
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
      "Mark the date of a redesign or a content update so you can return to the chart and compare traffic on either side.",
      "Σημειώστε πότε αλλάξατε τον σχεδιασμό ή το κείμενο μιας σελίδας. Αργότερα θα μπορείτε να συγκρίνετε τα κλικ πριν και μετά την αλλαγή.",
    ),
    costs: [cost("gsc", c("Performance reports, comparisons and annotations", "Αναφορές απόδοσης, συγκρίσεις και σημειώσεις"))],
    plans: ALL,
    demoPath: "/demo/performance",
  },
  {
    id: "keywords",
    name: c("Keywords", "Λέξεις-κλειδιά"),
    icon: KeyRound,
    title: { lead: c("Find searches to target and", "Έρευνα λέξεων-κλειδιών και"), accent: c("track your position", "παρακολούθηση θέσεων") },
    tagline: c("Keyword research, rank tracking and topic clusters.", "Έρευνα λέξεων-κλειδιών, παρακολούθηση θέσεων και θεματικές ομάδες."),
    summary: c(
      "Check how often people search for a phrase and what the top pages already cover. Group related terms and follow the rankings you care about.",
      "Δείτε πόσο συχνά αναζητούν οι χρήστες μια φράση και τι καλύπτουν ήδη οι πρώτες σελίδες. Ομαδοποιήστε τους σχετικούς όρους και παρακολουθήστε τις θέσεις που σας ενδιαφέρουν.",
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
      "Before commissioning a new page, check whether another page on your site already appears for the same searches.",
      "Πριν αναθέσετε ένα νέο κείμενο, ελέγξτε μήπως κάποια σελίδα σας εμφανίζεται ήδη για τις ίδιες αναζητήσεις.",
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
    title: { lead: c("Plan and edit", "Ετοιμάστε το"), accent: c("your next article", "επόμενο άρθρο σας") },
    tagline: c("Briefs, AI writing, optimization and WordPress publishing.", "Briefs, γραφή με AI, βελτιστοποίηση και δημοσίευση στο WordPress."),
    summary: c(
      "Prepare a brief using the pages that appear in search today. Review the draft against that brief, then publish the finished article to WordPress.",
      "Δείτε τι καλύπτουν οι σελίδες που εμφανίζονται στη Google και ετοιμάστε οδηγίες για τον συντάκτη. Ελέγξτε το προσχέδιο με βάση αυτές τις οδηγίες και δημοσιεύστε το τελικό άρθρο στο WordPress.",
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
      "A writer can start with the questions readers need answered. An editor can use the same brief to check the draft.",
      "Ο συντάκτης γνωρίζει εξαρχής σε ποιες ερωτήσεις πρέπει να απαντήσει. Στην επιμέλεια, η ομάδα σας μπορεί να ελέγξει αν το κείμενο τις καλύπτει.",
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
    title: { lead: c("Find the technical issues", "Δείτε ποια τεχνικά προβλήματα"), accent: c("worth fixing first", "χρειάζονται διόρθωση") },
    tagline: c("Technical health, indexability and Core Web Vitals.", "Τεχνική υγεία, δυνατότητα ευρετηρίασης και Core Web Vitals."),
    summary: c(
      "Check for broken pages, slow templates and settings that prevent Google from indexing a page. The audit lists issues by priority.",
      "Ελέγξτε ποιες σελίδες δεν ανοίγουν, ποια πρότυπα φορτώνουν αργά και ποιες ρυθμίσεις εμποδίζουν την καταχώριση στη Google. Τα προβλήματα εμφανίζονται με σειρά προτεραιότητας.",
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
      "Use the affected URLs to give your developer a specific problem to investigate.",
      "Με τις διευθύνσεις των σελίδων που επηρεάζονται, μπορείτε να δείξετε στον προγραμματιστή σας ακριβώς πού εντοπίζεται το πρόβλημα.",
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
    title: { lead: c("See where competing sites", "Για ποιες αναζητήσεις"), accent: c("show up in search", "εμφανίζονται οι ανταγωνιστές σας;") },
    tagline: c("Competitor discovery, keyword gaps and backlinks.", "Εντοπισμός ανταγωνιστών, κενά λέξεων-κλειδιών και backlinks."),
    summary: c(
      "Find the sites that appear for the searches you care about. Compare their rankings and backlinks with yours to identify topics you could cover.",
      "Βρείτε ποιες ιστοσελίδες εμφανίζονται για τις αναζητήσεις που σας ενδιαφέρουν. Συγκρίνετε τις θέσεις και τα backlinks τους με τα δικά σας και εντοπίστε θέματα που θα μπορούσατε να καλύψετε.",
    ),
    bullets: [
      c("Organic competitor discovery", "Εντοπισμός οργανικών ανταγωνιστών"),
      c("Queries where competing pages already rank", "Αναζητήσεις στις οποίες εμφανίζονται οι ανταγωνιστές σας"),
      c("Backlinks and referring domains", "Backlinks και referring domains"),
    ],
    what: [
      c("Discovers the domains that compete with you for the same keywords.", "Εντοπίζει τα domains που ανταγωνίζονται μαζί σας για τις ίδιες λέξεις-κλειδιά."),
      c(
        "Keyword gap analysis: the keywords competitors rank for and you don’t.",
        "Ανάλυση keyword gap: οι λέξεις-κλειδιά όπου κατατάσσονται οι ανταγωνιστές και εσείς όχι.",
      ),
      c("Backlink and referring-domain lookups for any domain.", "Αναζήτηση backlinks και referring domains για οποιοδήποτε domain."),
      c(
        "A SERP explorer to see exactly who ranks for a keyword today.",
        "Ένας SERP explorer για να δείτε ακριβώς ποιος κατατάσσεται σήμερα για μια λέξη-κλειδί.",
      ),
    ],
    why: c(
      "Look at the pages that rank before adding a term to your plan. Is the person searching likely to need what you offer?",
      "Πριν εντάξετε μια φράση στο πλάνο σας, διαβάστε τα πρώτα αποτελέσματα. Αυτό που ψάχνει ο χρήστης αντιστοιχεί σε κάτι που προσφέρετε;",
    ),
    costs: [cost("competitor_analysis"), cost("content_gap_analysis"), cost("backlink_lookup"), cost("serp_overview")],
    plans: GROWTH_UP,
    demoPath: "/demo/competitors",
  },
  {
    id: "ai-visibility",
    name: c("AI visibility", "Ορατότητα στην AI"),
    icon: Bot,
    title: { lead: c("Which AI answers", "Σε ποιες απαντήσεις AI"), accent: c("mention your business?", "εμφανίζεται η επιχείρησή σας;") },
    tagline: c("How ChatGPT, Gemini, Perplexity and AI Overviews mention you.", "Πώς σας αναφέρουν τα ChatGPT, Gemini, Perplexity και τα AI Overviews."),
    summary: c(
      "Follow the questions your customers ask in ChatGPT, Gemini and Perplexity. See whether the answers mention your business or cite your pages, and check your presence in Google AI Overviews.",
      "Παρακολουθήστε ερωτήσεις πελατών στο ChatGPT, στο Gemini και στο Perplexity. Δείτε αν οι απαντήσεις αναφέρουν την επιχείρησή σας ή παραπέμπουν στις σελίδες σας. Μπορείτε επίσης να ελέγξετε αν εμφανίζεστε στα Google AI Overviews.",
    ),
    bullets: [
      c("Mentions and citations in ChatGPT, Gemini and Perplexity", "Αναφορές και παραπομπές σε ChatGPT, Gemini και Perplexity"),
      c("Google AI Overviews presence for your keywords", "Παρουσία στα Google AI Overviews για τις λέξεις-κλειδιά σας"),
      c("Share of voice against your competitors", "Μερίδιο αναφορών σε σχέση με τους ανταγωνιστές σας"),
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
        "Δείχνει το μερίδιο αναφορών σας απέναντι στους ανταγωνιστές για τα prompts που παρακολουθείτε.",
      ),
      c(
        "Suggests changes that make your pages easier for AI systems to cite.",
        "Προτείνει αλλαγές που κάνουν τις σελίδες σας πιο εύκολο να παρατεθούν από συστήματα AI.",
      ),
    ],
    why: c(
      "Compare the sources that appear for the same question over time. A single mention is one observation.",
      "Συγκρίνετε τις πηγές που εμφανίζονται για την ίδια ερώτηση σε διαφορετικές ημερομηνίες, ώστε να δείτε ποιες αναφορές επαναλαμβάνονται.",
    ),
    costs: [cost("llm_citation_tracker"), cost("ai_overview_check"), cost("citation_optimization")],
    plans: GROWTH_UP,
    demoPath: "/demo/ai-visibility",
  },
  {
    id: "assistant",
    name: c("Aster AI", "Aster AI"),
    icon: MessageSquare,
    title: { lead: c("Ask", "Ρωτήστε τον"), accent: c("Aster AI", "Aster AI") },
    tagline: c("Answers grounded in your own Search Console data.", "Απαντήσεις βασισμένες στα δικά σας δεδομένα Search Console."),
    summary: c(
      "Ask which pages lost traffic or how you could improve a title. Aster AI can use the searches and clicks from your own site to explain its answer.",
      "Ρωτήστε ποιες σελίδες έχασαν κλικ ή πώς θα μπορούσατε να βελτιώσετε έναν τίτλο. Ο Aster AI μπορεί να στηρίξει την απάντησή του στις αναζητήσεις και στα κλικ του δικού σας ιστοτόπου.",
    ),
    bullets: [
      c("Explains changes with the numbers behind them", "Εξηγεί τις αλλαγές με τα νούμερα που τις τεκμηριώνουν"),
      c("Opens from any opportunity with the context attached", "Ανοίγει από κάθε πρόταση και γνωρίζει ποια σελίδα και αναζήτηση αφορά"),
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
      "Open Aster AI from a suggested fix to discuss the page and query that led to it. Chat uses a daily question allowance for your plan.",
      "Ανοίξτε τον Aster AI από μια προτεινόμενη διόρθωση για να συζητήσετε τη συγκεκριμένη σελίδα και αναζήτηση. Το πακέτο σας ορίζει πόσες ερωτήσεις μπορείτε να κάνετε κάθε ημέρα.",
    ),
    costs: [cost("seo_ai_chat")],
    plans: ALL,
    demoPath: "/demo",
  },
  {
    id: "agency",
    name: c("Agency workspace", "Χώρος εργασίας agency"),
    icon: Building2,
    title: { lead: c("Keep each client’s tasks and", "Εργασίες και αναφορές"), accent: c("reports together", "ανά πελάτη") },
    tagline: c("Clients, pipeline, tasks and white-label reports.", "Πελάτες, pipeline, εργασίες και white-label αναφορές."),
    summary: c(
      "Open a client’s project to check their Search Console figures, assign work and prepare a report with your own logo. You can follow new business in the same CRM.",
      "Ανοίξτε το έργο του πελάτη για να δείτε τα στοιχεία του Search Console, να αναθέσετε εργασίες και να ετοιμάσετε αναφορά με το λογότυπό σας. Στο ίδιο CRM παρακολουθείτε και τις νέες συνεργασίες.",
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
      "Before the next client call, check which tasks are complete and which pages changed since your last report.",
      "Πριν μιλήσετε με τον πελάτη, δείτε τι ολοκληρώθηκε και πώς απέδωσαν οι σελίδες του από την προηγούμενη αναφορά.",
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
