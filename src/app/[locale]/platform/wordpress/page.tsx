import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ClipboardList,
  Download,
  Gauge,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  PanelRight,
  Send,
  ShieldCheck,
  Undo2,
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
 * The AnotherSEOGuru WordPress plugin (v2). Facts from gsc-gemini-boost/
 * wordpress-plugin/anotherseoguru/readme.txt. The WordPress.org listing is in
 * review, so the download is the zip from the app. When the listing is live,
 * point the download CTA and `downloadUrl` at wordpress.org/plugins/….
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = WORDPRESS_PATH;
const PLUGIN_NAME = "AnotherSEOGuru – Search Console insights & one-click SEO fixes";
const SEO_PLUGINS = ["Rank Math", "Yoast SEO", "All in One SEO", "SEOPress", "The SEO Framework"] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "WordPress Search Console Plugin & SEO Fixes", el: "Search Console στο WordPress: plugin SEO" },
    description: {
      en: "Search Console clicks and queries for each post in the WordPress editor, and one-click title and meta fixes saved to Rank Math, Yoast and other SEO plugins.",
      el: "Κλικ και αναζητήσεις του Search Console για κάθε άρθρο μέσα στο WordPress, και διορθώσεις τίτλου και meta με ένα κλικ σε Rank Math, Yoast και άλλα plugin SEO.",
    },
    keyword: { en: "WordPress Search Console plugin", el: "plugin SEO για WordPress" },
  });
}

const FEATURES: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: PanelRight,
    title: c("Search Console in the editor", "Search Console μέσα στον editor"),
    text: c(
      "Clicks, impressions, CTR and average position for the post you are editing, each with the change against the previous period, in the block editor sidebar or the classic editor meta box.",
      "Κλικ, εμφανίσεις, CTR και μέση θέση για το άρθρο που επεξεργάζεστε, με τη μεταβολή από την προηγούμενη περίοδο, στην πλαϊνή στήλη του block editor ή στο meta box του classic editor.",
    ),
  },
  {
    icon: ListChecks,
    title: c("Top queries and open tasks", "Κορυφαίες αναζητήσεις και εργασίες"),
    text: c(
      "The searches that bring people to the page and its open SEO tasks, with a link to the full page report in the app.",
      "Οι αναζητήσεις που φέρνουν κόσμο στη σελίδα και οι ανοιχτές εργασίες SEO της, με σύνδεσμο στην πλήρη αναφορά της σελίδας στην εφαρμογή.",
    ),
  },
  {
    icon: ClipboardList,
    title: c("Add tasks from the editor", "Νέα εργασία από τον editor"),
    text: c(
      "Note an idea or a fix as a task without leaving the post. It shows up in your workspace, in the web app and on iPhone.",
      "Σημειώστε μια ιδέα ή μια διόρθωση ως εργασία χωρίς να φύγετε από το άρθρο. Εμφανίζεται στον χώρο εργασίας σας, στο web και στο iPhone.",
    ),
  },
  {
    icon: Wand2,
    title: c("One-click title and meta fixes", "Διορθώσεις τίτλου και meta με ένα κλικ"),
    text: c(
      "The app suggests titles and meta descriptions from your real search queries. Press Approve and the new text is written into your SEO plugin's own fields, and the page is purged from common caches.",
      "Η εφαρμογή προτείνει τίτλους και meta descriptions από τις πραγματικές αναζητήσεις σας. Πατάτε Έγκριση και το νέο κείμενο γράφεται στα πεδία του plugin SEO σας, ενώ η σελίδα καθαρίζεται από τις γνωστές cache.",
    ),
  },
  {
    icon: Undo2,
    title: c("Undo, and nothing without approval", "Αναίρεση, και τίποτα χωρίς έγκριση"),
    text: c(
      "Undo puts the old text back. The plugin never changes your content on its own.",
      "Η Αναίρεση επαναφέρει το παλιό κείμενο. Το plugin δεν αλλάζει ποτέ μόνο του το περιεχόμενό σας.",
    ),
  },
  {
    icon: Send,
    title: c("IndexNow on publish", "IndexNow σε κάθε δημοσίευση"),
    text: c(
      "New and updated pages go to IndexNow, so Bing and the other participating search engines hear about them sooner. Off with one switch.",
      "Οι νέες και οι ενημερωμένες σελίδες στέλνονται στο IndexNow, ώστε το Bing και οι υπόλοιπες μηχανές που συμμετέχουν να τις μαθαίνουν νωρίτερα. Το κλείνετε με έναν διακόπτη.",
    ),
  },
  {
    icon: LayoutDashboard,
    title: c("Dashboard widget", "Widget στον πίνακα ελέγχου"),
    text: c(
      "Connection status, your plan and the home page's Search Console numbers on the WordPress dashboard.",
      "Κατάσταση σύνδεσης, το πακέτο σας και τα νούμερα Search Console της αρχικής σελίδας στον πίνακα ελέγχου του WordPress.",
    ),
  },
  {
    icon: KeyRound,
    title: c("No API keys", "Χωρίς API keys"),
    text: c(
      "Connect with one click: sign in, allow the site, and you are back in WordPress. There is nothing to copy and paste.",
      "Σύνδεση με ένα κλικ: συνδέεστε, εγκρίνετε τον ιστότοπο και επιστρέφετε στο WordPress. Δεν χρειάζεται να αντιγράψετε τίποτα.",
    ),
  },
  {
    icon: ShieldCheck,
    title: c("Visitors are never tracked", "Οι επισκέπτες δεν καταγράφονται"),
    text: c(
      "No data about your visitors is sent. Nothing is sent at all before an administrator connects the site.",
      "Δεν στέλνεται κανένα στοιχείο για τους επισκέπτες σας. Πριν συνδέσει ο διαχειριστής τον ιστότοπο, δεν στέλνεται τίποτα απολύτως.",
    ),
  },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Does it work with Rank Math and Yoast SEO?", "Δουλεύει με Rank Math και Yoast SEO;"),
    a: c(
      "Yes. The plugin detects Rank Math, Yoast SEO, All in One SEO, SEOPress and The SEO Framework and writes approved titles and meta descriptions into that plugin's own fields, so your SEO plugin keeps printing them as before. It works alongside your SEO plugin and does not replace it. Without one, it prints the approved title and description itself.",
      "Ναι. Το plugin εντοπίζει Rank Math, Yoast SEO, All in One SEO, SEOPress και The SEO Framework και γράφει τους εγκεκριμένους τίτλους και τις meta descriptions στα πεδία του ίδιου του plugin, οπότε το plugin SEO σας συνεχίζει να τα εμφανίζει όπως πριν. Δουλεύει μαζί του, δεν το αντικαθιστά. Αν δεν έχετε plugin SEO, εμφανίζει το ίδιο τον εγκεκριμένο τίτλο και την περιγραφή.",
    ),
  },
  {
    q: c("How do I see Google Search Console data in WordPress?", "Πώς βλέπω τα δεδομένα του Google Search Console μέσα στο WordPress;"),
    a: c(
      "Install the plugin, go to Settings → AnotherSEOGuru and press Connect. Make sure the site is added in AnotherSEOGuru with its Search Console property. Then open any published post or page: the sidebar shows its clicks, impressions, CTR, position, top queries and open tasks.",
      "Εγκαταστήστε το plugin, πηγαίνετε στο Ρυθμίσεις → AnotherSEOGuru και πατήστε Σύνδεση. Βεβαιωθείτε ότι ο ιστότοπος είναι προσθεμένος στο AnotherSEOGuru με το property του στο Search Console. Μετά ανοίξτε οποιοδήποτε δημοσιευμένο άρθρο ή σελίδα: η πλαϊνή στήλη δείχνει κλικ, εμφανίσεις, CTR, θέση, κορυφαίες αναζητήσεις και ανοιχτές εργασίες.",
    ),
  },
  {
    q: c("Is the plugin on WordPress.org?", "Υπάρχει το plugin στο WordPress.org;"),
    a: c(
      "The WordPress.org directory listing is in review. Until then, download the zip and upload it under Plugins → Add New → Upload Plugin. Updates will come through the directory once it is listed.",
      "Η καταχώριση στον κατάλογο του WordPress.org είναι υπό έλεγχο. Μέχρι τότε, κατεβάστε το zip και ανεβάστε το από Πρόσθετα → Προσθήκη νέου → Μεταφόρτωση πρόσθετου. Οι ενημερώσεις θα έρχονται από τον κατάλογο μόλις καταχωριστεί.",
    ),
  },
  {
    q: c("Why do one-click fixes need an Application Password?", "Γιατί οι διορθώσεις με ένα κλικ χρειάζονται Application Password;"),
    a: c(
      "It is the standard WordPress way to let an outside app use the REST API without sharing your real password. The plugin creates one named AnotherSEOGuru when you connect and you can revoke it under Users → Profile. WordPress offers Application Passwords on https sites; without https the insights and tasks still work.",
      "Είναι ο κανονικός τρόπος του WordPress για να χρησιμοποιεί μια εξωτερική εφαρμογή το REST API χωρίς τον πραγματικό σας κωδικό. Το plugin δημιουργεί ένα με όνομα AnotherSEOGuru όταν συνδέεστε και μπορείτε να το ανακαλέσετε από Χρήστες → Προφίλ. Το WordPress δίνει Application Passwords σε ιστότοπους με https· χωρίς https τα στοιχεία και οι εργασίες δουλεύουν κανονικά.",
    ),
  },
  {
    q: c("Who can see the Search Console numbers?", "Ποιος βλέπει τα νούμερα του Search Console;"),
    a: c(
      "Anyone who can edit a post sees the panel for that post. Only administrators can connect, disconnect and change settings. The access token stays on the server and is never sent to the browser.",
      "Όποιος μπορεί να επεξεργαστεί ένα άρθρο βλέπει το πάνελ του. Μόνο οι διαχειριστές συνδέουν, αποσυνδέουν και αλλάζουν ρυθμίσεις. Το access token μένει στον server και δεν στέλνεται ποτέ στον browser.",
    ),
  },
  {
    q: c("How do I disconnect the site?", "Πώς αποσυνδέω τον ιστότοπο;"),
    a: c(
      "Press Disconnect under Settings → AnotherSEOGuru, which also deletes the Application Password, or disconnect it in the web app under Settings → Connected apps. Deleting the plugin removes all of its settings.",
      "Πατήστε Αποσύνδεση στο Ρυθμίσεις → AnotherSEOGuru, που διαγράφει και το Application Password, ή αποσυνδέστε τον από την εφαρμογή web στο Ρυθμίσεις → Συνδεδεμένες εφαρμογές. Αν διαγράψετε το plugin, φεύγουν και όλες οι ρυθμίσεις του.",
    ),
    link: { kind: "site", path: "/platform/integrations", label: c("All integrations", "Όλες οι ενσωματώσεις") },
  },
];

/** A static mock of the block editor sidebar. */
function EditorMock({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === "el";
  const metric = (k: string, v: string, d: string) => (
    <div className="rounded-lg border border-hairline bg-background/60 p-2.5">
      <div className="text-[10.5px] uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-display text-[16px] font-semibold text-foreground">{v}</div>
      <div className="text-[11px] text-success">{d}</div>
    </div>
  );
  return (
    <figure>
      <figcaption className="sr-only">
        {isEl
          ? "Απεικόνιση του block editor με την πλαϊνή στήλη AnotherSEOGuru: νούμερα Search Console, αναζητήσεις και μια πρόταση τίτλου. Τα νούμερα είναι παράδειγμα."
          : "Illustration of the block editor with the AnotherSEOGuru sidebar: Search Console numbers, queries and a title suggestion. The numbers are an example."}
      </figcaption>
      <div aria-hidden className="pointer-events-none grid select-none overflow-hidden rounded-2xl border border-hairline bg-background text-left md:grid-cols-[1fr_300px]">
        <div className="hidden border-r border-hairline p-6 md:block">
          <div className="h-3 w-24 rounded bg-foreground/10" />
          <div className="mt-5 font-display text-[22px] font-semibold leading-tight text-foreground">
            {isEl ? "Οδηγός: πού να μείνετε στη Νάξο" : "Where to stay in Naxos: a local's guide"}
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
            <span className="text-[13px] font-semibold text-foreground">AnotherSEOGuru</span>
            <span className="ml-auto text-[11px] text-muted-foreground">{isEl ? "28 ημέρες" : "28 days"}</span>
          </div>
          <div className="space-y-4 px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {metric(isEl ? "Κλικ" : "Clicks", "1,284", "+12%")}
              {metric(isEl ? "Εμφανίσεις" : "Impressions", "38.2k", "+9%")}
              {metric("CTR", "3.4%", "+0.2")}
              {metric(isEl ? "Θέση" : "Position", "5.6", "-0.8")}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{isEl ? "Κορυφαίες αναζητήσεις" : "Top queries"}</div>
              <ul className="mt-1.5 space-y-1 text-[12px] text-foreground/90">
                <li className="flex justify-between">
                  <span>{isEl ? "πού να μείνω στη νάξο" : "where to stay in naxos"}</span>
                  <span className="font-mono text-muted-foreground">#4</span>
                </li>
                <li className="flex justify-between">
                  <span>{isEl ? "νάξος ξενοδοχεία παραλία" : "naxos beach hotels"}</span>
                  <span className="font-mono text-muted-foreground">#11</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-signal/30 bg-background/70 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{isEl ? "Νέος τίτλος, εγκεκριμένος" : "New title, approved"}</span>
                <MarketingBadge kind="live">Rank Math</MarketingBadge>
              </div>
              <p className="mt-1.5 text-[12.5px] text-foreground">{isEl ? "Πού να μείνετε στη Νάξο: περιοχές και ξενοδοχεία" : "Where to Stay in Naxos: Best Areas & Beach Hotels"}</p>
              <p className="mt-1 text-[11.5px] text-link">{isEl ? "Αναίρεση" : "Undo"}</p>
            </div>
            <div className="rounded-lg border border-hairline bg-background/60 px-3 py-2 text-[12px] text-muted-foreground">+ {isEl ? "Προσθήκη εργασίας" : "Add task"}</div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        {isEl ? "Απεικόνιση με δείγμα άρθρου· τα νούμερα είναι παράδειγμα." : "Illustration on a sample post; the numbers are an example."}
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
    alternateName: "AnotherSEOGuru WordPress plugin",
    description: c(
      "WordPress plugin that shows Google Search Console clicks, impressions, CTR, position, top queries and tasks for each post in the block and classic editor, applies approved title and meta description fixes to Rank Math, Yoast SEO, All in One SEO, SEOPress or The SEO Framework with undo, and submits pages to IndexNow.",
      "Plugin WordPress που δείχνει κλικ, εμφανίσεις, CTR, θέση, κορυφαίες αναζητήσεις και εργασίες από το Google Search Console για κάθε άρθρο στον block και στον classic editor, εφαρμόζει εγκεκριμένες διορθώσεις τίτλου και meta description σε Rank Math, Yoast SEO, All in One SEO, SEOPress ή The SEO Framework με αναίρεση, και στέλνει σελίδες στο IndexNow.",
    ),
    operatingSystem: "WordPress",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEO plugin",
    free: true,
    downloadUrl: WORDPRESS_ZIP,
    softwareRequirements: "WordPress 6.0 or later, PHP 7.4 or later",
    featureList: FEATURES.map((f) => f.title.en),
  });

  return (
    <>
      <SchemaMarkup schemas={[schema, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: "/platform/integrations" }, { name: "WordPress", path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<WordPressGlyph />}>{tx("WordPress plugin · Free", "Plugin WordPress · Δωρεάν")}</KitEyebrow>}
          title={
            <>
              {tx("Google Search Console,", "Το Google Search Console,")} <Accent>{tx("inside WordPress", "μέσα στο WordPress")}</Accent>
            </>
          }
          lead={tx(
            "A free WordPress plugin that shows each post's Search Console clicks, queries and tasks right in the editor. Approve a better title or meta description in AnotherSEOGuru and it is written into Rank Math, Yoast, All in One SEO, SEOPress or The SEO Framework, with undo.",
            "Δωρεάν plugin για WordPress που δείχνει τα κλικ, τις αναζητήσεις και τις εργασίες κάθε άρθρου από το Search Console, μέσα στον editor. Εγκρίνετε καλύτερο τίτλο ή meta description στο AnotherSEOGuru και γράφεται στο Rank Math, Yoast, All in One SEO, SEOPress ή The SEO Framework, με δυνατότητα αναίρεσης.",
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
                { icon: KeyRound, label: tx("One-click connect, no API keys", "Σύνδεση με ένα κλικ, χωρίς API keys") },
                { icon: Undo2, label: tx("Nothing changes without your approval", "Τίποτα δεν αλλάζει χωρίς έγκριση") },
                { icon: Gauge, label: tx("WordPress 6.0+, PHP 7.4+", "WordPress 6.0+, PHP 7.4+") },
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
          heading={tx("Writes approved fixes into the SEO plugin you already use", "Γράφει τις εγκεκριμένες διορθώσεις στο plugin SEO που ήδη χρησιμοποιείτε")}
          items={SEO_PLUGINS.map((name): { name: string; role: string } => ({ name, role: tx("Title and meta description", "Τίτλος και meta description") })).concat([
            { name: "IndexNow", role: tx("On publish and update", "Σε δημοσίευση και ενημέρωση") },
          ])}
        />

        <KitSection id="features">
          <KitHeading
            eyebrow={tx("What the plugin does", "Τι κάνει το plugin")}
            title={
              <>
                {tx("Your Search Console data,", "Τα δεδομένα του Search Console,")} <Accent>{tx("where you write", "εκεί που γράφετε")}</Accent>
              </>
            }
            description={tx(
              "Stop switching tabs to check how a post is doing. The numbers, the queries and the fix list come to the editor, and approved fixes go back to the page.",
              "Τέρμα οι καρτέλες για να δείτε πώς πάει ένα άρθρο. Τα νούμερα, οι αναζητήσεις και η λίστα διορθώσεων έρχονται στον editor, και οι εγκεκριμένες διορθώσεις επιστρέφουν στη σελίδα.",
            )}
          />
          <FeatureGrid locale={locale} items={FEATURES} />
        </KitSection>

        <KitSection tinted id="rank-math-yoast">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <KitHeading
              eyebrow={tx("Rank Math, Yoast and more", "Rank Math, Yoast και άλλα")}
              title={
                <>
                  {tx("A Search Console integration for", "Σύνδεση Search Console για")} <Accent>{tx("your SEO plugin", "το plugin SEO σας")}</Accent>
                </>
              }
              description={tx(
                "Rank Math and Yoast SEO are good at what they do: they print titles, descriptions and schema. They don't show you which searches each post gets or which snippet is losing clicks. The plugin adds that side, and writes the fixes you approve into the same fields your SEO plugin already uses.",
                "Το Rank Math και το Yoast SEO κάνουν καλά τη δουλειά τους: τυπώνουν τίτλους, περιγραφές και schema. Δεν σας δείχνουν όμως ποιες αναζητήσεις φέρνει κάθε άρθρο ή ποιο snippet χάνει κλικ. Το plugin προσθέτει αυτό το κομμάτι και γράφει τις διορθώσεις που εγκρίνετε στα ίδια πεδία που ήδη χρησιμοποιεί το plugin SEO σας.",
              )}
            />
            <CheckList
              items={[
                tx("Suggestions come from the page's real Search Console queries", "Οι προτάσεις βγαίνουν από τις πραγματικές αναζητήσεις της σελίδας στο Search Console"),
                tx("You approve each change in the app; undo restores the old text", "Εγκρίνετε κάθε αλλαγή στην εφαρμογή· η αναίρεση επαναφέρει το παλιό κείμενο"),
                tx("Caches purged after a change: LiteSpeed, WP Rocket, WP Super Cache, W3 Total Cache, SiteGround", "Καθαρισμός cache μετά από κάθε αλλαγή: LiteSpeed, WP Rocket, WP Super Cache, W3 Total Cache, SiteGround"),
                tx("After a fix ships, the app measures clicks before and after", "Μετά τη διόρθωση, η εφαρμογή μετρά τα κλικ πριν και μετά"),
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
                {tx("Connected in", "Σύνδεση σε")} <Accent>{tx("three steps", "τρία βήματα")}</Accent>
              </>
            }
          />
          <StepsGrid
            className="mt-14"
            steps={[
              {
                title: tx("Upload and activate", "Ανεβάστε και ενεργοποιήστε"),
                text: tx(
                  "Download the zip, then Plugins → Add New → Upload Plugin, and activate. The WordPress.org listing is in review.",
                  "Κατεβάστε το zip, μετά Πρόσθετα → Προσθήκη νέου → Μεταφόρτωση πρόσθετου, και ενεργοποιήστε το. Η καταχώριση στο WordPress.org είναι υπό έλεγχο.",
                ),
              },
              {
                title: tx("Connect with AnotherSEOGuru", "Σύνδεση με το AnotherSEOGuru"),
                text: tx(
                  "Settings → AnotherSEOGuru → Connect. Sign up or sign in, press Allow, and you are back in WordPress.",
                  "Ρυθμίσεις → AnotherSEOGuru → Σύνδεση. Κάντε εγγραφή ή συνδεθείτε, πατήστε Να επιτρέπεται και επιστρέφετε στο WordPress.",
                ),
              },
              {
                title: tx("Open any post", "Ανοίξτε ένα άρθρο"),
                text: tx(
                  "With the site and its Search Console property added in the app, every published post shows its numbers in the editor.",
                  "Με τον ιστότοπο και το property του Search Console προσθεμένα στην εφαρμογή, κάθε δημοσιευμένο άρθρο δείχνει τα νούμερά του στον editor.",
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
