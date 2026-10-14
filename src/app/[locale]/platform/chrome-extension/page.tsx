import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Braces,
  Gauge,
  Globe2,
  Heading,
  ImageOff,
  Languages,
  Link2,
  LockKeyhole,
  Puzzle,
  Search,
  Share2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, CheckList, Container, CtaBand, HeroCentered, KitHeading, KitSection, MarketingBadge, Stage, TrustLine, kitSecondaryBtn } from "@/components/kit";
import {
  CHROME_PATH,
  CompareTable,
  FeatureGrid,
  GscFaq,
  OtherWaysSection,
  PlatformLinks,
  SignUpFree,
  c,
  integrationAppSchema,
  platformBreadcrumbs,
  platformMetadata,
  type Copy,
  type GscFaqItem,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * The AnotherSEOGuru Chrome extension. Facts from gsc-gemini-boost/
 * chrome-extension/STORE_LISTING.md. It is submitted to the Chrome Web Store
 * but not listed yet, so the page says "Coming to the Chrome Web Store" and
 * offers sign-up, not an install link. When the listing is live, add the store
 * URL as a secondary CTA and as `installUrl` in the schema.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = CHROME_PATH;
const EXTENSION_NAME = "AnotherSEOGuru – SEO Extension";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "SEO Chrome Extension with Search Console", el: "Επέκταση SEO για Chrome με Search Console" },
    description: {
      en: "Free SEO extension for Chrome: meta tags, headings, links, schema, hreflang and Core Web Vitals on any page. Sign in to see that page's Search Console clicks.",
      el: "Δωρεάν επέκταση SEO για Chrome: meta, επικεφαλίδες, σύνδεσμοι, schema, hreflang και Core Web Vitals σε κάθε σελίδα, και με σύνδεση τα κλικ του Search Console.",
    },
    keyword: { en: "SEO Chrome extension", el: "επέκταση SEO για Chrome" },
  });
}

const FREE_CHECKS: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: Search,
    title: c("Title and meta description", "Τίτλος και meta description"),
    text: c(
      "Lengths with hints, canonical, robots meta, language, word count, H1 count and an indexability verdict.",
      "Μήκη με υποδείξεις, canonical, robots meta, γλώσσα, πλήθος λέξεων, πλήθος H1 και αν η σελίδα μπορεί να μπει στο index.",
    ),
  },
  {
    icon: Heading,
    title: c("Headings tree", "Δομή επικεφαλίδων"),
    text: c(
      "The full H1-H6 outline, with warnings for a missing or second H1 and skipped levels.",
      "Ολόκληρη η δομή H1-H6, με προειδοποίηση όταν λείπει ή υπάρχει δεύτερη H1 και όταν πηδιέται επίπεδο.",
    ),
  },
  {
    icon: Link2,
    title: c("Links, with nofollow", "Σύνδεσμοι και nofollow"),
    text: c(
      "Internal, external, nofollow, sponsored and ugc counts, a filterable list, CSV export and a switch that highlights nofollow links on the page.",
      "Εσωτερικοί, εξωτερικοί, nofollow, sponsored και ugc, λίστα με φίλτρα, εξαγωγή σε CSV και διακόπτης που επισημαίνει τους nofollow πάνω στη σελίδα.",
    ),
  },
  {
    icon: ImageOff,
    title: c("Images missing alt", "Εικόνες χωρίς alt"),
    text: c("Every image with a missing or empty alt attribute, exportable to CSV.", "Κάθε εικόνα χωρίς alt ή με κενό alt, με εξαγωγή σε CSV."),
  },
  {
    icon: Braces,
    title: c("Schema", "Schema"),
    text: c(
      "JSON-LD and microdata, the types found, parse errors, and one click to Google's Rich Results Test or validator.schema.org.",
      "JSON-LD και microdata, οι τύποι που βρέθηκαν, σφάλματα, και με ένα κλικ στο Rich Results Test της Google ή στο validator.schema.org.",
    ),
  },
  {
    icon: Share2,
    title: c("Open Graph and Twitter", "Open Graph και Twitter"),
    text: c("The social tags, with a preview of the share card.", "Οι ετικέτες social, με προεπισκόπηση της κάρτας κοινοποίησης."),
  },
  {
    icon: Globe2,
    title: c("Hreflang, with return links", "Hreflang με έλεγχο επιστροφής"),
    text: c(
      "x-default, self-reference, duplicate and invalid codes, plus an optional check that each alternate links back.",
      "x-default, αυτο-αναφορά, διπλοί και άκυροι κωδικοί, και προαιρετικός έλεγχος ότι κάθε εναλλακτική σελίδα δείχνει πίσω.",
    ),
  },
  {
    icon: Gauge,
    title: c("Core Web Vitals, measured", "Core Web Vitals, μετρημένα"),
    text: c(
      "LCP, CLS, FCP and TTFB measured in your own browser on the page you are on, rated good, needs improvement or poor.",
      "LCP, CLS, FCP και TTFB μετρημένα στον δικό σας browser, στη σελίδα που βλέπετε, με χαρακτηρισμό καλό, θέλει βελτίωση ή κακό.",
    ),
  },
  {
    icon: Wrench,
    title: c("Quick tools", "Γρήγορα εργαλεία"),
    text: c(
      "robots.txt, sitemap.xml, a site: search, PageSpeed Insights, URL Inspection, the Wayback Machine and view-source, one click each.",
      "robots.txt, sitemap.xml, αναζήτηση site:, PageSpeed Insights, URL Inspection, Wayback Machine και view-source, με ένα κλικ το καθένα.",
    ),
  },
];

const SERP_FEATURES: ReadonlyArray<Copy> = [
  c("Position numbers on organic results; ads are skipped", "Αριθμός θέσης σε κάθε οργανικό αποτέλεσμα· οι διαφημίσεις δεν μετριούνται"),
  c("Export the results and People Also Ask to CSV", "Εξαγωγή των αποτελεσμάτων και του People Also Ask σε CSV"),
  c("Copy every URL on the page in one go", "Αντιγραφή όλων των URL της σελίδας με μία κίνηση"),
  c("Signed in: your own sites highlighted in the results", "Με σύνδεση: οι δικοί σας ιστότοποι επισημαίνονται στα αποτελέσματα"),
];

const SIGNED_IN: ReadonlyArray<Copy> = [
  c(
    "This page's clicks, impressions, CTR and position from Search Console, against the previous 28 days",
    "Κλικ, εμφανίσεις, CTR και θέση της σελίδας από το Search Console, σε σύγκριση με τις προηγούμενες 28 ημέρες",
  ),
  c("The top queries that bring people to the page", "Οι αναζητήσεις που φέρνουν τους περισσότερους επισκέπτες στη σελίδα"),
  c("The page's open tasks from your workspace", "Οι ανοιχτές εργασίες της σελίδας από τον χώρο εργασίας σας"),
  c("Save as task on any issue the checks find", "Αποθήκευση ως εργασία για κάθε πρόβλημα που βρίσκουν οι έλεγχοι"),
];

const COMPARE: ReadonlyArray<{ label: Copy; ours: boolean | Copy; theirs: boolean | Copy }> = [
  { label: c("Title, meta description, headings, links, images", "Τίτλος, meta description, επικεφαλίδες, σύνδεσμοι, εικόνες"), ours: true, theirs: true },
  { label: c("Links and images missing alt exported to CSV", "Εξαγωγή συνδέσμων και εικόνων χωρίς alt σε CSV"), ours: true, theirs: c("Varies", "Ανάλογα με την επέκταση") },
  { label: c("Schema, Open Graph and share-card preview", "Schema, Open Graph και προεπισκόπηση κάρτας"), ours: true, theirs: c("Varies", "Ανάλογα με την επέκταση") },
  { label: c("Hreflang return-link check", "Έλεγχος επιστροφής hreflang"), ours: true, theirs: c("Not usually", "Συνήθως όχι") },
  { label: c("Core Web Vitals measured on the page", "Core Web Vitals μετρημένα στη σελίδα"), ours: true, theirs: c("Varies", "Ανάλογα με την επέκταση") },
  { label: c("Positions and People Also Ask export on Google", "Θέσεις και εξαγωγή People Also Ask στη Google"), ours: true, theirs: c("Varies", "Ανάλογα με την επέκταση") },
  { label: c("The page's own Search Console clicks and queries", "Κλικ και αναζητήσεις της σελίδας από το δικό σας Search Console"), ours: true, theirs: false },
  { label: c("Save an issue as a task in your SEO workspace", "Αποθήκευση προβλήματος ως εργασία στον χώρο εργασίας SEO"), ours: true, theirs: false },
  { label: c("Greek and English interface", "Περιβάλλον σε ελληνικά και αγγλικά"), ours: true, theirs: c("Rarely Greek", "Σπάνια στα ελληνικά") },
  { label: c("Account needed for on-page checks", "Χρειάζεται λογαριασμός για τους ελέγχους"), ours: c("No", "Όχι"), theirs: c("Varies", "Ανάλογα με την επέκταση") },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Is the SEO extension for Chrome free?", "Είναι δωρεάν η επέκταση SEO για Chrome;"),
    a: c(
      "Yes. Every on-page check and the Google results tools are free and work without an account. Signing in with a free AnotherSEOGuru account adds your own Search Console numbers, top queries and tasks for the page.",
      "Ναι. Όλοι οι έλεγχοι της σελίδας και τα εργαλεία στα αποτελέσματα της Google είναι δωρεάν και δουλεύουν χωρίς λογαριασμό. Με δωρεάν λογαριασμό AnotherSEOGuru προστίθενται τα δικά σας νούμερα Search Console, οι κορυφαίες αναζητήσεις και οι εργασίες της σελίδας.",
    ),
  },
  {
    q: c("Where can I install it?", "Από πού την εγκαθιστώ;"),
    a: c(
      "The extension has been submitted to the Chrome Web Store and will be listed there once Google approves it. Sign up now and your account is ready when it goes live.",
      "Η επέκταση έχει υποβληθεί στο Chrome Web Store και θα εμφανιστεί εκεί μόλις την εγκρίνει η Google. Κάντε εγγραφή από τώρα και ο λογαριασμός σας θα είναι έτοιμος όταν κυκλοφορήσει.",
    ),
  },
  {
    q: c("Is there a Search Console Chrome extension that shows data for the page I'm on?", "Υπάρχει επέκταση Chrome που δείχνει τα δεδομένα Search Console της σελίδας που βλέπω;"),
    a: c(
      "Yes, this one. Signed in, it shows the page's clicks, impressions, CTR and average position from your own Search Console, with the change against the previous 28 days, the top queries and any open tasks.",
      "Ναι, αυτή. Με σύνδεση δείχνει κλικ, εμφανίσεις, CTR και μέση θέση της σελίδας από το δικό σας Search Console, με τη μεταβολή σε σχέση με τις προηγούμενες 28 ημέρες, τις κορυφαίες αναζητήσεις και τις ανοιχτές εργασίες.",
    ),
  },
  {
    q: c("Does the extension send the pages I visit anywhere?", "Στέλνει πουθενά η επέκταση τις σελίδες που επισκέπτομαι;"),
    a: c(
      "No. The page analysis runs entirely in your browser. Only the signed-in features talk to app.anotherseoguru.com, to fetch your own numbers for the page. There is no analytics, no tracking and no remote code.",
      "Όχι. Η ανάλυση της σελίδας γίνεται εξ ολοκλήρου στον browser σας. Μόνο οι λειτουργίες με σύνδεση επικοινωνούν με το app.anotherseoguru.com, για να φέρουν τα δικά σας νούμερα. Δεν υπάρχουν analytics, παρακολούθηση ή απομακρυσμένος κώδικας.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
  {
    q: c("Is the extension available in Greek?", "Υπάρχει η επέκταση στα ελληνικά;"),
    a: c("Yes. The interface is in Greek and English.", "Ναι. Το περιβάλλον είναι στα ελληνικά και στα αγγλικά."),
  },
  {
    q: c("How do I disconnect the extension from my account?", "Πώς αποσυνδέω την επέκταση από τον λογαριασμό μου;"),
    a: c(
      "Sign out in the extension, or open Settings → Connected apps in the web app and press Disconnect next to it. The same page lists the WordPress plugin and AI assistants you connected.",
      "Αποσυνδεθείτε από την επέκταση ή ανοίξτε Ρυθμίσεις → Συνδεδεμένες εφαρμογές στην εφαρμογή web και πατήστε Αποσύνδεση. Στην ίδια σελίδα βλέπετε και το plugin WordPress και τους βοηθούς AI που έχετε συνδέσει.",
    ),
    link: { kind: "site", path: "/platform/integrations", label: c("All integrations", "Όλες οι ενσωματώσεις") },
  },
];

/** A static mock of the popup: the free overview on the left, "Your data" on the right. */
function PopupMock({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === "el";
  const tabs = isEl ? ["Επισκόπηση", "Επικεφαλίδες", "Σύνδεσμοι", "Schema", "Ταχύτητα"] : ["Overview", "Headings", "Links", "Schema", "Speed"];
  const bar = (label: string, value: number, max: number, tone: "ok" | "warn") => (
    <div>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">
          {value}/{max}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-foreground/10">
        <div className={tone === "ok" ? "h-full rounded-full bg-success" : "h-full rounded-full bg-warning"} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
  const row = (k: string, v: string, good = true) => (
    <div className="flex items-center justify-between gap-3 py-1.5 text-[12px]">
      <span className="text-muted-foreground">{k}</span>
      <span className={good ? "font-medium text-success" : "font-medium text-warning"}>{v}</span>
    </div>
  );
  const metric = (k: string, v: string, d: string, up: boolean) => (
    <div className="rounded-lg border border-hairline bg-background/60 p-2.5">
      <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-display text-[17px] font-semibold text-foreground">{v}</div>
      <div className={up ? "text-[11px] text-success" : "text-[11px] text-warning"}>{d}</div>
    </div>
  );
  return (
    <figure className="relative">
      <figcaption className="sr-only">
        {isEl
          ? "Απεικόνιση της επέκτασης: έλεγχοι τίτλου και περιγραφής, και τα νούμερα Search Console της σελίδας με σύνδεση. Τα νούμερα είναι παράδειγμα."
          : "Illustration of the extension: title and description checks, and the page's Search Console numbers when signed in. The numbers are an example."}
      </figcaption>
      <div aria-hidden className="pointer-events-none grid select-none gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-hairline bg-surface text-left">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
            <span className="flex size-6 items-center justify-center rounded-md bg-brand/15 text-brand">
              <Puzzle className="size-3.5" />
            </span>
            <span className="text-[13px] font-semibold text-foreground">AnotherSEOGuru</span>
            <span className="ml-auto rounded-full border border-hairline px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground">aegean-suites.example/rooms</span>
          </div>
          <div className="flex gap-3 overflow-hidden border-b border-hairline px-4 py-2 text-[11.5px] text-muted-foreground">
            {tabs.map((t, i) => (
              <span key={t} className={i === 0 ? "font-semibold text-foreground" : ""}>
                {t}
              </span>
            ))}
          </div>
          <div className="space-y-3 px-4 py-4">
            {bar(isEl ? "Μήκος τίτλου" : "Title length", 54, 60, "ok")}
            {bar(isEl ? "Μήκος meta description" : "Meta description length", 171, 160, "warn")}
            <div className="divide-y divide-hairline/70 pt-1">
              {row("Canonical", isEl ? "Στον εαυτό της" : "Self")}
              {row("Robots", "index, follow")}
              {row("H1", isEl ? "1 επικεφαλίδα" : "1 heading")}
              {row(isEl ? "Εικόνες χωρίς alt" : "Images missing alt", "3", false)}
              {row("LCP", "2.1 s")}
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_6%,var(--surface)),var(--surface))] text-left">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
            <span className="text-[13px] font-semibold text-foreground">{isEl ? "Τα δεδομένα σας" : "Your data"}</span>
            <MarketingBadge kind="live" className="ml-auto">
              {isEl ? "Με σύνδεση" : "Signed in"}
            </MarketingBadge>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {metric(isEl ? "Κλικ" : "Clicks", "412", "+18%", true)}
              {metric(isEl ? "Εμφανίσεις" : "Impressions", "9,870", "+6%", true)}
              {metric("CTR", "4.2%", "+0.4", true)}
              {metric(isEl ? "Θέση" : "Position", "7.8", "-1.3", true)}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{isEl ? "Κορυφαίες αναζητήσεις" : "Top queries"}</div>
              <ul className="mt-1.5 space-y-1 text-[12px] text-foreground/90">
                <li className="flex justify-between">
                  <span>{isEl ? "δωμάτια σαντορίνη θέα" : "santorini rooms caldera view"}</span>
                  <span className="font-mono text-muted-foreground">#6</span>
                </li>
                <li className="flex justify-between">
                  <span>{isEl ? "ξενοδοχείο οία" : "oia boutique hotel"}</span>
                  <span className="font-mono text-muted-foreground">#9</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-hairline bg-background/60 px-3 py-2 text-[12px]">
              <span className="text-foreground">{isEl ? "Συντόμευση meta description" : "Shorten meta description"}</span>
              <span className="text-link">{isEl ? "Αποθήκευση ως εργασία" : "Save as task"}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        {isEl ? "Απεικόνιση με δείγμα ιστότοπου· τα νούμερα είναι παράδειγμα." : "Illustration on a sample site; the numbers are an example."}
      </p>
    </figure>
  );
}

export default async function PlatformChromeExtensionPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  const schema = integrationAppSchema({
    locale,
    path: PATH,
    name: EXTENSION_NAME,
    alternateName: "AnotherSEOGuru Chrome extension",
    description: c(
      "Free SEO extension for Chrome: on-page checks for titles, meta descriptions, headings, links, images, schema, Open Graph, hreflang and Core Web Vitals, tools on Google results, and the page's own Search Console data when signed in.",
      "Δωρεάν επέκταση SEO για Chrome: έλεγχοι τίτλου, meta description, επικεφαλίδων, συνδέσμων, εικόνων, schema, Open Graph, hreflang και Core Web Vitals, εργαλεία στα αποτελέσματα της Google και τα δεδομένα Search Console της σελίδας με σύνδεση.",
    ),
    operatingSystem: "Chrome",
    applicationCategory: "BrowserApplication",
    applicationSubCategory: "SEO",
    free: true,
    softwareRequirements: "Google Chrome 116 or later",
    featureList: FREE_CHECKS.map((f) => f.title.en).concat(["Google results positions and CSV export", "Search Console data for the current page (signed in)"]),
  });

  return (
    <>
      <SchemaMarkup schemas={[schema, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: "/platform/integrations" }, { name: tx("Chrome extension", "Επέκταση Chrome"), path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={
            <MarketingBadge kind="new" className="h-7 px-3 text-[11px]">
              {tx("Coming to the Chrome Web Store", "Έρχεται στο Chrome Web Store")}
            </MarketingBadge>
          }
          title={
            <>
              {tx("The SEO extension for Chrome that knows", "Η επέκταση SEO για Chrome που ξέρει")} <Accent>{tx("your Search Console", "το Search Console σας")}</Accent>
            </>
          }
          lead={tx(
            "Check any page's title, meta description, headings, links, schema, hreflang and Core Web Vitals in one click, free and without an account. Sign in and the same popup shows that page's clicks, impressions, CTR and position from your own Search Console.",
            "Ελέγξτε σε ένα κλικ τίτλο, meta description, επικεφαλίδες, συνδέσμους, schema, hreflang και Core Web Vitals σε κάθε σελίδα, δωρεάν και χωρίς λογαριασμό. Συνδεθείτε και το ίδιο παράθυρο δείχνει κλικ, εμφανίσεις, CTR και θέση της σελίδας από το δικό σας Search Console.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpFree locale={locale} source="chrome-hero" />
              <a href="#free-checks" className={kitSecondaryBtn}>
                {tx("See what it checks", "Δείτε τι ελέγχει")}
                <ArrowRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: Sparkles, label: tx("Free on-page checks, no account", "Δωρεάν έλεγχοι, χωρίς λογαριασμό") },
                { icon: LockKeyhole, label: tx("Analysis runs in your browser", "Η ανάλυση γίνεται στον browser σας") },
                { icon: Languages, label: tx("English and Greek", "Ελληνικά και αγγλικά") },
              ]}
            />
          }
        >
          <Container className="mt-14 sm:mt-16">
            <Stage className="mx-auto max-w-4xl">
              <PopupMock locale={locale} />
            </Stage>
          </Container>
        </HeroCentered>

        <KitSection id="free-checks">
          <KitHeading
            eyebrow={tx("Free, no account", "Δωρεάν, χωρίς λογαριασμό")}
            title={
              <>
                {tx("A full on-page SEO check,", "Πλήρης έλεγχος on-page SEO,")} <Accent>{tx("on any page", "σε κάθε σελίδα")}</Accent>
              </>
            }
            description={tx(
              "Open the popup on any website, yours or a competitor's. A quick score with the top issues stays in view while you look through the tabs.",
              "Ανοίξτε το παράθυρο σε οποιονδήποτε ιστότοπο, δικό σας ή ανταγωνιστή. Μια γρήγορη βαθμολογία με τα σημαντικότερα προβλήματα μένει πάντα ορατή όσο περνάτε από τις καρτέλες.",
            )}
          />
          <FeatureGrid locale={locale} items={FREE_CHECKS} />
        </KitSection>

        <KitSection tinted id="google-results">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <KitHeading
                eyebrow={tx("On Google results", "Στα αποτελέσματα της Google")}
                title={
                  <>
                    {tx("Positions and People Also Ask,", "Θέσεις και People Also Ask,")} <Accent>{tx("ready for a sheet", "έτοιμα για υπολογιστικό φύλλο")}</Accent>
                  </>
                }
                description={tx(
                  "Search on Google as usual. The extension numbers the organic results and adds a small toolbar for exporting what you see.",
                  "Ψάξτε στη Google όπως πάντα. Η επέκταση αριθμεί τα οργανικά αποτελέσματα και προσθέτει μια μικρή μπάρα για να εξάγετε ό,τι βλέπετε.",
                )}
              />
              <CheckList items={SERP_FEATURES.map((f) => f[locale])} className="mt-8" />
            </div>
            <div>
              <KitHeading
                eyebrow={tx("Signed in", "Με σύνδεση")}
                title={
                  <>
                    {tx("Your Search Console,", "Το Search Console σας,")} <Accent>{tx("on the page itself", "πάνω στην ίδια τη σελίδα")}</Accent>
                  </>
                }
                description={tx(
                  "Sign in with your AnotherSEOGuru account, the same one as the web app, and the popup adds a Your data tab for pages on your own sites.",
                  "Συνδεθείτε με τον λογαριασμό σας στο AnotherSEOGuru, τον ίδιο με την εφαρμογή web, και το παράθυρο αποκτά την καρτέλα «Τα δεδομένα σας» για τις σελίδες των δικών σας ιστότοπων.",
                )}
              />
              <CheckList items={SIGNED_IN.map((f) => f[locale])} className="mt-8" />
              <p className="mt-6 text-[14px] text-muted-foreground">
                {tx("Tasks you save land in your workspace, next to the fixes from ", "Οι εργασίες που αποθηκεύετε μπαίνουν στον χώρο εργασίας σας, δίπλα στις διορθώσεις από τις ")}
                <Link href={`${localizedPath(locale, "/platform/features")}#opportunities`} className="font-medium text-link hover:underline">
                  {tx("Opportunities", "Ευκαιρίες")}
                </Link>
                .
              </p>
            </div>
          </div>
        </KitSection>

        <KitSection id="compare">
          <KitHeading
            eyebrow={tx("Compared", "Σύγκριση")}
            title={
              <>
                {tx("How it compares with", "Πώς συγκρίνεται με τις")} <Accent>{tx("typical free SEO extensions", "συνηθισμένες δωρεάν επεκτάσεις SEO")}</Accent>
              </>
            }
            description={tx(
              "Most free SEO extensions for Chrome cover the on-page basics well. The difference here is that the same popup can show your own Search Console data and feed your task list.",
              "Οι περισσότερες δωρεάν επεκτάσεις SEO για Chrome καλύπτουν καλά τα βασικά. Η διαφορά εδώ είναι ότι το ίδιο παράθυρο δείχνει και τα δικά σας δεδομένα Search Console και τροφοδοτεί τη λίστα εργασιών σας.",
            )}
          />
          <CompareTable
            locale={locale}
            caption={c("AnotherSEOGuru extension compared with typical free SEO extensions", "Η επέκταση AnotherSEOGuru σε σύγκριση με τις συνηθισμένες δωρεάν επεκτάσεις SEO")}
            columns={[c("AnotherSEOGuru", "AnotherSEOGuru"), c("Typical free extension", "Συνηθισμένη δωρεάν επέκταση")]}
            rows={COMPARE}
            note={c(
              "A general comparison: free extensions differ, and many do some of these things well.",
              "Γενική σύγκριση: οι δωρεάν επεκτάσεις διαφέρουν μεταξύ τους και πολλές κάνουν καλά κάποια από αυτά.",
            )}
          />
        </KitSection>

        <KitSection tinted id="privacy">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <KitHeading
              eyebrow={tx("Privacy", "Απόρρητο")}
              title={
                <>
                  {tx("Your browsing stays", "Η περιήγησή σας μένει")} <Accent>{tx("in your browser", "στον browser σας")}</Accent>
                </>
              }
              description={tx(
                "The page analysis runs locally. Only the signed-in features talk to app.anotherseoguru.com, and only to fetch your own numbers. No analytics, no tracking, no remote code.",
                "Η ανάλυση της σελίδας γίνεται τοπικά. Μόνο οι λειτουργίες με σύνδεση επικοινωνούν με το app.anotherseoguru.com, και μόνο για να φέρουν τα δικά σας νούμερα. Χωρίς analytics, χωρίς παρακολούθηση, χωρίς απομακρυσμένο κώδικα.",
              )}
            />
            <CheckList
              items={[
                tx("Free checks work without signing in", "Οι δωρεάν έλεγχοι δουλεύουν χωρίς σύνδεση"),
                tx("Read-only Search Console access, as in the web app", "Πρόσβαση στο Search Console μόνο για ανάγνωση, όπως στην εφαρμογή web"),
                tx("Disconnect any time in Settings → Connected apps", "Αποσύνδεση όποτε θέλετε από Ρυθμίσεις → Συνδεδεμένες εφαρμογές"),
                tx("Right-click selected text to research it as a keyword", "Δεξί κλικ σε επιλεγμένο κείμενο για έρευνα ως λέξη-κλειδί"),
              ]}
            />
          </div>
        </KitSection>

        <OtherWaysSection locale={locale} current="chrome" />
        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="chrome-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
