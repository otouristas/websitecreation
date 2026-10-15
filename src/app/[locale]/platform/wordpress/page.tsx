import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bot,
  Braces,
  Download,
  Eye,
  Gauge,
  Import,
  Languages,
  ListChecks,
  Map,
  PanelRight,
  Search,
  Share2,
  Shuffle,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, CheckList, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, MarketingBadge, NameStrip, Stage, StepsGrid, TrustLine, kitSecondaryBtn } from "@/components/kit";
import {
  FeatureGrid,
  GscFaq,
  OtherWaysSection,
  PlatformLinks,
  SignUpFree,
  WORDPRESS_PATH,
  WORDPRESS_ZIP,
  WordPressGlyph,
  c,
  integrationAppSchema,
  platformBreadcrumbs,
  platformMetadata,
  type Copy,
  type GscFaqItem,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * The AnotherSEOGuru WordPress plugin 4.2: a full SEO plugin. Facts from gsc-gemini-boost/
 * wordpress-plugin/anotherseoguru (readme.txt, includes/editor, includes/modules). The
 * WordPress.org listing is not submitted yet, so the download is the zip from the app. When
 * the listing is live, point the download CTA and `downloadUrl` at wordpress.org/plugins/….
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = WORDPRESS_PATH;
const PLUGIN_NAME = "AnotherSEOGuru SEO – the WordPress SEO plugin with Search Console built in";
const IMPORTS_FROM = ["Yoast SEO", "Rank Math", "All in One SEO", "SEOPress", "Redirection"] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "WordPress SEO Plugin with Search Console Built In", el: "Plugin SEO για WordPress με Search Console" },
    description: {
      en: "A free WordPress SEO plugin: live Google preview, SEO and readability analysis, schema, sitemaps, redirects, keyword research and Search Console data in every post. Imports from Yoast and Rank Math.",
      el: "Δωρεάν plugin SEO για WordPress: ζωντανή προεπισκόπηση Google, ανάλυση SEO και αναγνωσιμότητας, schema, sitemaps, ανακατευθύνσεις, έρευνα λέξεων-κλειδιών και Search Console σε κάθε άρθρο. Μεταφορά από Yoast και Rank Math.",
    },
    keyword: { en: "WordPress SEO plugin", el: "plugin SEO για WordPress" },
  });
}

const FEATURES: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: ListChecks,
    title: c("From an editor finding to a verified task", "Από εύρημα του editor σε επαληθευμένη εργασία"),
    text: c(
      "Send a published page's editor finding to your project tasks. Review an exact SEO title or description preview on web or iPhone, approve that saved version, then apply and recheck the public page. Shared receipts show progress in WordPress and the client workspace. Full page-builder layout editing is outside this flow.",
      "Στείλτε ένα εύρημα από τον editor δημοσιευμένης σελίδας στις εργασίες του έργου. Ελέγξτε την ακριβή προεπισκόπηση τίτλου ή περιγραφής SEO σε web ή iPhone, εγκρίνετε αυτή την αποθηκευμένη έκδοση, και εφαρμόστε με επανέλεγχο της δημόσιας σελίδας. Τα κοινά αποδεικτικά δείχνουν την πρόοδο σε WordPress και στον χώρο πελάτη. Η επεξεργασία της πλήρους διάταξης page builder δεν περιλαμβάνεται σε αυτή τη ροή.",
    ),
  },
  {
    icon: Eye,
    title: c("Live Google preview", "Ζωντανή προεπισκόπηση Google"),
    text: c(
      "See the result as Google shows it, on desktop and mobile, while you type. Titles are measured in pixels, not just characters, so you know before publishing whether they get cut off.",
      "Βλέπετε το αποτέλεσμα όπως το δείχνει η Google, σε υπολογιστή και κινητό, όσο γράφετε. Οι τίτλοι μετριούνται σε pixel και όχι μόνο σε χαρακτήρες, οπότε ξέρετε πριν τη δημοσίευση αν θα κοπούν.",
    ),
  },
  {
    icon: Gauge,
    title: c("SEO and readability scores", "Βαθμός SEO και αναγνωσιμότητας"),
    text: c(
      "About 35 SEO checks and a readability analysis for every post: keyword placement, headings, links, images, text length, sentence and paragraph length, passive voice and reading ease. Up to five focus keywords per post.",
      "Περίπου 35 έλεγχοι SEO και ανάλυση αναγνωσιμότητας για κάθε άρθρο: θέση λέξης-κλειδιού, επικεφαλίδες, σύνδεσμοι, εικόνες, μήκος κειμένου, μήκος προτάσεων και παραγράφων, παθητική φωνή και ευκολία ανάγνωσης. Έως πέντε λέξεις-κλειδιά ανά άρθρο.",
    ),
  },
  {
    icon: Languages,
    title: c("Built for Greek, not translated", "Φτιαγμένο για τα ελληνικά"),
    text: c(
      "The analysis understands Greek: accents, final sigma, word forms and the Greek question mark. It suggests a clean Greeklish slug, and the whole plugin is translated into Greek.",
      "Η ανάλυση καταλαβαίνει τα ελληνικά: τόνους, τελικό σίγμα, κλίσεις λέξεων και το ελληνικό ερωτηματικό. Προτείνει καθαρό slug σε greeklish, και όλο το plugin είναι στα ελληνικά.",
    ),
  },
  {
    icon: PanelRight,
    title: c("Search Console in every post", "Search Console σε κάθε άρθρο"),
    text: c(
      "Clicks, impressions, CTR, position and the searches that bring people to the post, right in the editor. Queries in positions 8 to 20 are flagged as quick wins, and any query can become a focus keyword.",
      "Κλικ, εμφανίσεις, CTR, θέση και οι αναζητήσεις που φέρνουν κόσμο στο άρθρο, μέσα στον editor. Οι αναζητήσεις στις θέσεις 8 έως 20 σημειώνονται ως γρήγορες ευκαιρίες, και κάθε αναζήτηση γίνεται λέξη-κλειδί με ένα κλικ.",
    ),
  },
  {
    icon: Search,
    title: c("Keyword research in the editor", "Έρευνα λέξεων-κλειδιών στον editor"),
    text: c(
      "Search volume, difficulty, CPC and intent for a keyword, up to 30 related ideas and 10 questions people ask, which you can add to an FAQ block. Uses credits from your account.",
      "Όγκος αναζήτησης, δυσκολία, CPC και πρόθεση για μια λέξη-κλειδί, έως 30 σχετικές ιδέες και 10 ερωτήσεις που κάνει ο κόσμος, τις οποίες προσθέτετε σε μπλοκ FAQ. Χρησιμοποιεί μονάδες του λογαριασμού σας.",
    ),
  },
  {
    icon: Wand2,
    title: c("Write the title and description with AI", "Τίτλος και περιγραφή με AI"),
    text: c(
      "Three title or meta description options written from your post and focus keyword, inside the right length. Pick one or edit it. Uses one credit; if nothing usable comes back, you are not charged.",
      "Τρεις επιλογές τίτλου ή meta description από το άρθρο και τη λέξη-κλειδί σας, μέσα στο σωστό μήκος. Διαλέγετε ή διορθώνετε. Χρησιμοποιεί μία μονάδα· αν δεν βγει κάτι χρήσιμο, δεν χρεώνεστε.",
    ),
  },
  {
    icon: Braces,
    title: c("Schema for every page", "Schema σε κάθε σελίδα"),
    text: c(
      "One connected schema graph per page: website, organisation or person, local business, article, breadcrumbs and product for WooCommerce. FAQ and How-to blocks add their own schema, with a JSON-LD preview and a Rich Results Test link.",
      "Ένα ενιαίο schema graph ανά σελίδα: ιστότοπος, εταιρεία ή πρόσωπο, τοπική επιχείρηση, άρθρο, breadcrumbs και προϊόν για WooCommerce. Τα μπλοκ FAQ και How-to προσθέτουν το δικό τους schema, με προεπισκόπηση JSON-LD και σύνδεσμο στο Rich Results Test.",
    ),
  },
  {
    icon: Map,
    title: c("XML sitemaps", "XML sitemaps"),
    text: c(
      "A sitemap index with posts, pages, taxonomies, images and authors, plus an optional news sitemap. Noindex pages are left out, and the sitemap updates when you publish.",
      "Sitemap index με άρθρα, σελίδες, κατηγορίες, εικόνες και συντάκτες, και προαιρετικό news sitemap. Οι σελίδες noindex μένουν έξω και το sitemap ενημερώνεται όταν δημοσιεύετε.",
    ),
  },
  {
    icon: Shuffle,
    title: c("Redirects and 404 monitor", "Ανακατευθύνσεις και 404"),
    text: c(
      "301, 302, 307, 410 and 451 redirects, with patterns, CSV import and export, and an automatic redirect when you change a slug. The 404 log shows broken URLs with a “Redirect this” button.",
      "Ανακατευθύνσεις 301, 302, 307, 410 και 451, με μοτίβα, εισαγωγή και εξαγωγή CSV, και αυτόματη ανακατεύθυνση όταν αλλάζετε slug. Το αρχείο 404 δείχνει τα σπασμένα URL με κουμπί «Ανακατεύθυνση».",
    ),
  },
  {
    icon: Bot,
    title: c("robots.txt, llms.txt and AI crawlers", "robots.txt, llms.txt και AI crawlers"),
    text: c(
      "Edit robots.txt, allow or block 12 AI crawlers such as GPTBot, ClaudeBot and PerplexityBot one by one, and serve an llms.txt that lists your pillar content first.",
      "Επεξεργάζεστε το robots.txt, επιτρέπετε ή μπλοκάρετε έναν έναν 12 AI crawlers όπως GPTBot, ClaudeBot και PerplexityBot, και δημοσιεύετε llms.txt με το βασικό σας περιεχόμενο πρώτο.",
    ),
  },
  {
    icon: Share2,
    title: c("Social previews", "Προεπισκόπηση κοινοποίησης"),
    text: c(
      "Facebook and X previews with their own title, description and image for each post.",
      "Προεπισκόπηση Facebook και X με δικό τους τίτλο, περιγραφή και εικόνα για κάθε άρθρο.",
    ),
  },
  {
    icon: ListChecks,
    title: c("Breadcrumbs, table of contents, FAQ and How-to blocks", "Breadcrumbs, πίνακας περιεχομένων, FAQ και How-to"),
    text: c(
      "Four blocks for the block editor, plus SEO columns, Quick Edit and Bulk Edit in the posts list.",
      "Τέσσερα μπλοκ για τον block editor, και στήλες SEO, Γρήγορη και Μαζική επεξεργασία στη λίστα άρθρων.",
    ),
  },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Can it replace Yoast SEO or Rank Math?", "Μπορεί να αντικαταστήσει το Yoast SEO ή το Rank Math;"),
    a: c(
      "Yes. It covers what they do on a typical site: titles and descriptions, analysis, schema, sitemaps, redirects, breadcrumbs, robots.txt and social previews. On top of that it brings your Search Console data, keyword research and AI suggestions into the editor. The importer copies your titles, descriptions, focus keywords, settings and redirects from the old plugin.",
      "Ναι. Καλύπτει όσα κάνουν σε έναν συνηθισμένο ιστότοπο: τίτλους και περιγραφές, ανάλυση, schema, sitemaps, ανακατευθύνσεις, breadcrumbs, robots.txt και προεπισκοπήσεις κοινοποίησης. Επιπλέον φέρνει μέσα στον editor τα δεδομένα του Search Console, την έρευνα λέξεων-κλειδιών και τις προτάσεις AI. Ο οδηγός μεταφοράς αντιγράφει τίτλους, περιγραφές, λέξεις-κλειδιά, ρυθμίσεις και ανακατευθύνσεις από το παλιό plugin.",
    ),
  },
  {
    q: c("How do I switch from Yoast or Rank Math?", "Πώς περνάω από Yoast ή Rank Math;"),
    a: c(
      "Install the plugin and open AnotherSEOGuru → Import & Tools. A dry run shows what will be copied from Yoast SEO, Rank Math, All in One SEO, SEOPress or Redirection. Then run the import. The old plugin's data is never deleted, so you can go back. Deactivate the old plugin when you are happy.",
      "Εγκαταστήστε το plugin και ανοίξτε AnotherSEOGuru → Εισαγωγή & Εργαλεία. Μια δοκιμαστική εκτέλεση δείχνει τι θα αντιγραφεί από Yoast SEO, Rank Math, All in One SEO, SEOPress ή Redirection. Μετά τρέχετε την εισαγωγή. Τα δεδομένα του παλιού plugin δεν σβήνονται ποτέ, οπότε μπορείτε να γυρίσετε πίσω. Απενεργοποιήστε το παλιό plugin όταν είστε σίγουροι.",
    ),
  },
  {
    q: c("Can I keep my current SEO plugin?", "Μπορώ να κρατήσω το plugin SEO που έχω;"),
    a: c(
      "Yes. If Yoast SEO, Rank Math, All in One SEO, SEOPress or The SEO Framework is active, the plugin steps back: it prints nothing on your pages, so nothing is duplicated, and you still get Search Console data, keyword research and the editor analysis. Titles you approve in AnotherSEOGuru are written into your SEO plugin's own fields.",
      "Ναι. Αν είναι ενεργό το Yoast SEO, το Rank Math, το All in One SEO, το SEOPress ή το The SEO Framework, το plugin κάνει πίσω: δεν τυπώνει τίποτα στις σελίδες σας, οπότε τίποτα δεν διπλασιάζεται, και εξακολουθείτε να έχετε Search Console, έρευνα λέξεων-κλειδιών και την ανάλυση στον editor. Οι τίτλοι που εγκρίνετε στο AnotherSEOGuru γράφονται στα πεδία του δικού σας plugin SEO.",
    ),
  },
  {
    q: c("What is free and what uses credits?", "Τι είναι δωρεάν και τι χρησιμοποιεί μονάδες;"),
    a: c(
      "The SEO plugin itself is free: analysis, previews, schema, sitemaps, redirects, the importer and every setting. Search Console data needs a free AnotherSEOGuru account. Keyword research uses 5 credits per keyword (a repeat within 24 hours is free) and AI title or description suggestions use 1 credit. You are not charged when no data comes back.",
      "Το ίδιο το plugin SEO είναι δωρεάν: ανάλυση, προεπισκοπήσεις, schema, sitemaps, ανακατευθύνσεις, μεταφορά και όλες οι ρυθμίσεις. Τα δεδομένα του Search Console θέλουν δωρεάν λογαριασμό AnotherSEOGuru. Η έρευνα λέξεων-κλειδιών χρησιμοποιεί 5 μονάδες ανά λέξη (η επανάληψη μέσα σε 24 ώρες είναι δωρεάν) και οι προτάσεις τίτλου ή περιγραφής με AI 1 μονάδα. Αν δεν έρθουν δεδομένα, δεν χρεώνεστε.",
    ),
  },
  {
    q: c("Is the plugin on WordPress.org?", "Υπάρχει το plugin στο WordPress.org;"),
    a: c(
      "Not yet. Until it is, download the zip and upload it under Plugins → Add New → Upload Plugin. Updates will come through the directory once it is listed.",
      "Όχι ακόμη. Μέχρι να μπει, κατεβάστε το zip και ανεβάστε το από Πρόσθετα → Προσθήκη νέου → Μεταφόρτωση πρόσθετου. Οι ενημερώσεις θα έρχονται από τον κατάλογο μόλις καταχωριστεί.",
    ),
  },
  {
    q: c("Does it slow my site down?", "Κάνει πιο αργό τον ιστότοπο;"),
    a: c(
      "No front-end JavaScript is added for visitors. The editor scripts load only in the admin, sitemaps and the redirect list are cached, and visitors are never tracked.",
      "Δεν προστίθεται JavaScript για τους επισκέπτες. Τα scripts του editor φορτώνουν μόνο στη διαχείριση, τα sitemaps και η λίστα ανακατευθύνσεων κρατιούνται σε cache, και οι επισκέπτες δεν καταγράφονται ποτέ.",
    ),
  },
  {
    q: c("How do I disconnect the site?", "Πώς αποσυνδέω τον ιστότοπο;"),
    a: c(
      "Press Disconnect under AnotherSEOGuru → Connect, or disconnect it in the web app under Settings → Connected apps. The SEO features keep working without a connection.",
      "Πατήστε Αποσύνδεση στο AnotherSEOGuru → Σύνδεση, ή αποσυνδέστε τον από την εφαρμογή web στο Ρυθμίσεις → Συνδεδεμένες εφαρμογές. Οι λειτουργίες SEO συνεχίζουν να δουλεύουν και χωρίς σύνδεση.",
    ),
    link: { kind: "site", path: "/platform/integrations", label: c("All integrations", "Όλες οι ενσωματώσεις") },
  },
];

/** A static mock of the block editor with the plugin's sidebar. */
function EditorMock({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === "el";
  const ring = (label: string, value: number) => (
    <div className="flex items-center gap-2">
      <span className="relative flex size-10 items-center justify-center rounded-full border-[3px] border-success/80 font-display text-[13px] font-semibold text-foreground">{value}</span>
      <span className="text-[11.5px] text-muted-foreground">{label}</span>
    </div>
  );
  const check = (text: string, ok = true) => (
    <li className="flex items-start gap-2">
      <span className={`mt-1 size-2 shrink-0 rounded-full ${ok ? "bg-success" : "bg-signal"}`} />
      <span>{text}</span>
    </li>
  );
  return (
    <figure>
      <figcaption className="sr-only">
        {isEl
          ? "Απεικόνιση του block editor με την πλαϊνή στήλη AnotherSEOGuru: βαθμοί SEO και αναγνωσιμότητας, προεπισκόπηση Google και έλεγχοι. Τα στοιχεία είναι παράδειγμα."
          : "Illustration of the block editor with the AnotherSEOGuru sidebar: SEO and readability scores, a Google preview and checks. The data is an example."}
      </figcaption>
      <div aria-hidden className="pointer-events-none grid select-none overflow-hidden rounded-2xl border border-hairline bg-background text-left md:grid-cols-[1fr_320px]">
        <div className="hidden border-r border-hairline p-6 md:block">
          <div className="h-3 w-24 rounded bg-foreground/10" />
          <div className="mt-5 font-display text-[22px] font-semibold leading-tight text-foreground">
            {isEl ? "Πού να μείνετε στη Νάξο: περιοχές και ξενοδοχεία" : "Where to stay in Naxos: a local's guide"}
          </div>
          <div className="mt-5 space-y-2">
            {[100, 94, 97, 60, 0, 92, 88, 70].map((w, i) => (w ? <div key={i} className="h-2.5 rounded bg-foreground/[0.07]" style={{ width: `${w}%` }} /> : <div key={i} className="h-3" />))}
          </div>
        </div>
        <div className="bg-surface">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand/15 text-brand">
              <WordPressGlyph className="size-3.5" />
            </span>
            <span className="text-[13px] font-semibold text-foreground">AnotherSEOGuru SEO</span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="flex gap-5">
              {ring("SEO", 92)}
              {ring(isEl ? "Αναγνωσιμότητα" : "Readability", 88)}
            </div>
            <div className="flex gap-3 border-b border-hairline text-[11.5px]">
              {(isEl ? ["SEO", "Ανάγνωση", "Social", "Schema", "Insights"] : ["SEO", "Readability", "Social", "Schema", "Insights"]).map((t, i) => (
                <span key={t} className={i === 0 ? "border-b-2 border-brand pb-1.5 font-semibold text-foreground" : "pb-1.5 text-muted-foreground"}>
                  {t}
                </span>
              ))}
            </div>
            <div className="rounded-lg border border-hairline bg-background/70 p-3">
              <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">{isEl ? "Προεπισκόπηση Google" : "Google preview"}</div>
              <p className="mt-1.5 truncate text-[11px] text-muted-foreground">example.gr › naxos</p>
              <p className="text-[13.5px] leading-snug text-link">{isEl ? "Πού να μείνετε στη Νάξο: περιοχές και ξενοδοχεία" : "Where to Stay in Naxos: Best Areas & Beach Hotels"}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                {isEl ? "Οι καλύτερες περιοχές της Νάξου για κάθε ταξίδι, με ξενοδοχεία δίπλα στη θάλασσα και συμβουλές ντόπιων." : "The best areas of Naxos for every kind of trip, with beach hotels and tips from locals."}
              </p>
              <div className="mt-2 h-1 rounded bg-success/70" />
            </div>
            <ul className="space-y-1.5 text-[12px] text-foreground/90">
              {check(isEl ? "Η λέξη-κλειδί είναι στην αρχή του τίτλου" : "Focus keyword at the start of the title")}
              {check(isEl ? "Ο τίτλος χωράει: 541 από 580 px" : "Title fits: 541 of 580 px")}
              {check(isEl ? "Προσθέστε τη λέξη-κλειδί σε έναν υπότιτλο H2" : "Add the keyword to an H2 subheading", false)}
            </ul>
            <div className="flex items-center justify-between rounded-lg border border-signal/30 bg-background/70 px-3 py-2">
              <span className="text-[12px] text-foreground">{isEl ? "Γράψε με AI" : "Write with AI"}</span>
              <MarketingBadge kind="live">{isEl ? "1 μονάδα" : "1 credit"}</MarketingBadge>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        {isEl ? "Απεικόνιση με δείγμα άρθρου· τα στοιχεία είναι παράδειγμα." : "Illustration on a sample post; the data is an example."}
      </p>
    </figure>
  );
}

export default async function PlatformWordPressPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  const schema = integrationAppSchema({
    locale,
    path: PATH,
    name: PLUGIN_NAME,
    alternateName: "AnotherSEOGuru WordPress SEO plugin",
    description: c(
      "Free WordPress SEO plugin with a live Google preview, SEO and readability analysis (Greek and English), schema, XML sitemaps, redirects with a 404 monitor, robots.txt and llms.txt, breadcrumbs, Google Search Console data in every post, keyword research and AI title suggestions, and an importer from Yoast SEO, Rank Math, All in One SEO and SEOPress.",
      "Δωρεάν plugin SEO για WordPress με ζωντανή προεπισκόπηση Google, ανάλυση SEO και αναγνωσιμότητας (ελληνικά και αγγλικά), schema, XML sitemaps, ανακατευθύνσεις με παρακολούθηση 404, robots.txt και llms.txt, breadcrumbs, δεδομένα Google Search Console σε κάθε άρθρο, έρευνα λέξεων-κλειδιών και προτάσεις τίτλου με AI, και μεταφορά από Yoast SEO, Rank Math, All in One SEO και SEOPress.",
    ),
    operatingSystem: "WordPress",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEO plugin",
    free: true,
    downloadUrl: WORDPRESS_ZIP,
    softwareRequirements: "WordPress 6.2 or later, PHP 7.4 or later",
    featureList: FEATURES.map((f) => f.title.en),
  });

  return (
    <>
      <SchemaMarkup schemas={[schema, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: "/platform/integrations" }, { name: "WordPress", path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<WordPressGlyph />}>{tx("WordPress SEO plugin · Free", "Plugin SEO για WordPress · Δωρεάν")}</KitEyebrow>}
          title={
            <>
              {tx("The WordPress SEO plugin", "Το plugin SEO για WordPress")} <Accent>{tx("that knows your Google data", "που ξέρει τα δεδομένα σας στη Google")}</Accent>
            </>
          }
          lead={tx(
            "Everything you use Yoast or Rank Math for, with a live Google preview, analysis that understands Greek, and the post's real Search Console queries in the editor. Keyword research and AI titles are one click away. Switch in minutes with the built-in importer.",
            "Όλα όσα κάνετε με το Yoast ή το Rank Math, με ζωντανή προεπισκόπηση Google, ανάλυση που καταλαβαίνει ελληνικά, και τις πραγματικές αναζητήσεις του άρθρου από το Search Console μέσα στον editor. Έρευνα λέξεων-κλειδιών και τίτλοι με AI σε ένα κλικ. Περνάτε σε λίγα λεπτά με τον ενσωματωμένο οδηγό μεταφοράς.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpFree locale={locale} source="wordpress-hero" />
              <a href={WORDPRESS_ZIP} className={kitSecondaryBtn} download>
                <Download className="size-4 text-muted-foreground" aria-hidden />
                {tx("Download the plugin (.zip)", "Λήψη του plugin (.zip)")}
              </a>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: Import, label: tx("Imports from Yoast and Rank Math", "Μεταφορά από Yoast και Rank Math") },
                { icon: Languages, label: tx("Fully in Greek", "Πλήρως στα ελληνικά") },
                { icon: Gauge, label: tx("WordPress 6.2+, PHP 7.4+", "WordPress 6.2+, PHP 7.4+") },
              ]}
            />
          }
        >
          <Container className="mt-14 sm:mt-16">
            <Stage className="mx-auto max-w-4xl">
              <EditorMock locale={locale} />
            </Stage>
          </Container>
        </HeroCentered>

        <NameStrip
          heading={tx("Moves your SEO data over from", "Μεταφέρει τα δεδομένα SEO σας από")}
          items={IMPORTS_FROM.map((name): { name: string; role: string } => ({
            name,
            role: name === "Redirection" ? tx("Redirects", "Ανακατευθύνσεις") : tx("Titles, keywords, settings", "Τίτλοι, λέξεις-κλειδιά, ρυθμίσεις"),
          }))}
        />

        <KitSection id="features">
          <KitHeading
            eyebrow={tx("What the plugin does", "Τι κάνει το plugin")}
            title={
              <>
                {tx("A complete SEO plugin,", "Ένα πλήρες plugin SEO,")} <Accent>{tx("plus your Google data", "συν τα δεδομένα σας στη Google")}</Accent>
              </>
            }
            description={tx(
              "Titles, analysis, schema, sitemaps and redirects like the plugins you know, and what they can't do: real Search Console queries, keyword research and AI suggestions while you write.",
              "Τίτλοι, ανάλυση, schema, sitemaps και ανακατευθύνσεις όπως στα plugin που ξέρετε, και όσα εκείνα δεν κάνουν: πραγματικές αναζητήσεις από το Search Console, έρευνα λέξεων-κλειδιών και προτάσεις AI όσο γράφετε.",
            )}
          />
          <FeatureGrid locale={locale} items={FEATURES} />
        </KitSection>

        <KitSection tinted id="rank-math-yoast">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <KitHeading
              eyebrow={tx("Switch from Rank Math or Yoast", "Από Rank Math ή Yoast")}
              title={
                <>
                  {tx("Switch in minutes,", "Αλλάζετε σε λίγα λεπτά,")} <Accent>{tx("or keep your plugin", "ή κρατάτε το plugin σας")}</Accent>
                </>
              }
              description={tx(
                "The importer copies titles, descriptions, focus keywords, schema settings and redirects from Yoast SEO, Rank Math, All in One SEO, SEOPress and Redirection, after a dry run that shows what will move. Not ready to switch? With another SEO plugin active, it prints nothing on your pages and adds the Search Console side to the plugin you have.",
                "Ο οδηγός μεταφοράς αντιγράφει τίτλους, περιγραφές, λέξεις-κλειδιά, ρυθμίσεις schema και ανακατευθύνσεις από Yoast SEO, Rank Math, All in One SEO, SEOPress και Redirection, μετά από δοκιμαστική εκτέλεση που δείχνει τι θα μεταφερθεί. Δεν είστε έτοιμοι να αλλάξετε; Με άλλο plugin SEO ενεργό, δεν τυπώνει τίποτα στις σελίδες σας και προσθέτει το κομμάτι του Search Console στο plugin που έχετε.",
              )}
            />
            <CheckList
              items={[
                tx("The old plugin's data is never deleted, so you can go back", "Τα δεδομένα του παλιού plugin δεν σβήνονται ποτέ, οπότε μπορείτε να γυρίσετε πίσω"),
                tx("A setup wizard sets the basics on first activation", "Ένας οδηγός ρύθμισης βάζει τα βασικά στην πρώτη ενεργοποίηση"),
                tx("No upsell banners or nags in your admin", "Χωρίς διαφημιστικά banner και ενοχλήσεις στη διαχείριση"),
                tx("Approved fixes from the app land in the right fields, with undo", "Οι εγκεκριμένες διορθώσεις από την εφαρμογή μπαίνουν στα σωστά πεδία, με αναίρεση"),
              ]}
            />
          </div>
        </KitSection>

        <KitSection id="install">
          <KitHeading
            align="center"
            eyebrow={tx("Install", "Εγκατάσταση")}
            title={
              <>
                {tx("Up and running in", "Έτοιμο σε")} <Accent>{tx("three steps", "τρία βήματα")}</Accent>
              </>
            }
          />
          <StepsGrid
            className="mt-14"
            steps={[
              {
                title: tx("Upload and activate", "Ανεβάστε και ενεργοποιήστε"),
                text: tx(
                  "Download the zip, then Plugins → Add New → Upload Plugin, and activate. A WordPress.org listing is coming.",
                  "Κατεβάστε το zip, μετά Πρόσθετα → Προσθήκη νέου → Μεταφόρτωση πρόσθετου, και ενεργοποιήστε το. Η καταχώριση στο WordPress.org έρχεται σύντομα.",
                ),
              },
              {
                title: tx("Run the setup wizard", "Τρέξτε τον οδηγό ρύθμισης"),
                text: tx(
                  "Set your site type and logo, and import from Yoast or Rank Math if you used them. Every SEO feature works from here, free.",
                  "Ορίστε τον τύπο του ιστότοπου και το λογότυπο, και κάντε μεταφορά από Yoast ή Rank Math αν τα χρησιμοποιούσατε. Όλες οι λειτουργίες SEO δουλεύουν από εδώ, δωρεάν.",
                ),
              },
              {
                title: tx("Connect for Search Console data", "Σύνδεση για Search Console"),
                text: tx(
                  "AnotherSEOGuru → Connect. Sign up free or sign in and press Allow. Every published post then shows its Search Console numbers in the editor.",
                  "AnotherSEOGuru → Σύνδεση. Κάντε δωρεάν εγγραφή ή συνδεθείτε και πατήστε Να επιτρέπεται. Μετά κάθε δημοσιευμένο άρθρο δείχνει τα νούμερά του από το Search Console στον editor.",
                ),
              },
            ]}
          />
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <SignUpFree locale={locale} source="wordpress-steps" />
            <a href={WORDPRESS_ZIP} className={kitSecondaryBtn} download>
              <Download className="size-4 text-muted-foreground" aria-hidden />
              {tx("Download the plugin (.zip)", "Λήψη του plugin (.zip)")}
            </a>
          </div>
          <p className="mt-6 text-center text-[14px] text-muted-foreground">
            {tx("Prefer to write in the app? The ", "Προτιμάτε να γράφετε στην εφαρμογή; Το ")}
            <Link href={`${localizedPath(locale, "/platform/features")}#content`} className="font-medium text-link hover:underline">
              {tx("content studio", "στούντιο περιεχομένου")}
            </Link>
            {tx(" publishes straight to WordPress too.", " δημοσιεύει κι αυτό απευθείας στο WordPress.")}
          </p>
        </KitSection>

        <OtherWaysSection locale={locale} current="wordpress" tinted />
        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="wordpress-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
