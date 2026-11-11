import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Bot, KeyRound, LockKeyhole, Terminal, Unplug } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, CheckList, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, NameStrip, Stage, TrustLine, kitSecondaryBtn } from "@/components/kit";
import {
  CodeBlock,
  GscFaq,
  MCP_BRIDGE,
  MCP_PATH,
  MCP_URL,
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
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

/**
 * The AnotherSEOGuru MCP server: the hosted server at app.anotherseoguru.com/mcp.
 * Clients that only start local commands reach it through the public mcp-remote
 * bridge (OAuth with dynamic client registration and a loopback redirect, both
 * supported by app.anotherseoguru.com). Our own npm package is not published yet,
 * so the page never tells people to install it. Tool names must match
 * gsc-gemini-boost/supabase/functions/mcp exactly.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = MCP_PATH;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "Google Search Console MCP Server for SEO", el: "MCP server για Google Search Console" },
    description: {
      en: "An MCP server for SEO: your Google Search Console data, fixes, tasks and AI visibility in Claude, ChatGPT, Codex, Cursor and other AI assistants, with OAuth sign-in.",
      el: "MCP server για SEO: δεδομένα Search Console, διορθώσεις, εργασίες και ορατότητα σε AI μέσα σε Claude, ChatGPT, Codex, Cursor και άλλους βοηθούς AI, με σύνδεση OAuth.",
    },
    keyword: { en: "Google Search Console MCP", el: "MCP server για SEO" },
  });
}

const TOOLS: ReadonlyArray<{ name: string; text: Copy; write?: boolean }> = [
  { name: "list_sites", text: c("The saved projects and linked Search Console properties available to this connection.", "Τα αποθηκευμένα έργα και οι συνδεδεμένες ιδιότητες Search Console που είναι διαθέσιμα σε αυτή τη σύνδεση.") },
  {
    name: "get_performance",
    text: c(
      "Clicks, impressions, CTR and position for a date range against the previous period, by query, page, country, device or date.",
      "Κλικ, εμφανίσεις, CTR και θέση για ένα διάστημα σε σύγκριση με το προηγούμενο, ανά αναζήτηση, σελίδα, χώρα, συσκευή ή ημέρα.",
    ),
  },
  {
    name: "get_opportunities",
    text: c(
      "Prioritized opportunities from the project's search data, with estimated additional clicks where available. Estimates are not guaranteed results.",
      "Ευκαιρίες με σειρά προτεραιότητας από τα δεδομένα αναζήτησης του έργου, με εκτιμώμενα επιπλέον κλικ όπου υπάρχουν. Οι εκτιμήσεις δεν αποτελούν εγγύηση αποτελέσματος.",
    ),
  },
  { name: "get_tasks", text: c("Your project tasks: status, priority, due date, target page and any saved opportunity estimates.", "Οι εργασίες του έργου σας: κατάσταση, προτεραιότητα, προθεσμία, σελίδα και τυχόν αποθηκευμένες εκτιμήσεις ευκαιριών.") },
  {
    name: "get_ai_visibility_summary",
    text: c("How often AI assistants cite your site for tracked prompts, per model, and which competitors they cite instead.", "Πόσο συχνά σας αναφέρουν οι βοηθοί AI στα prompts που παρακολουθείτε, ανά μοντέλο, και ποιους ανταγωνιστές αναφέρουν αντί για εσάς."),
  },
  { name: "get_seo_health", text: c("The latest SEO Health Score with the score per category and its 7 and 30 day trend.", "Η τελευταία βαθμολογία SEO Health, με τη βαθμολογία ανά κατηγορία και την πορεία 7 και 30 ημερών.") },
  { name: "get_site_audit_findings", text: c("Issues from the latest site crawl, grouped by issue with affected pages and example URLs, worst first.", "Τα προβλήματα από τον τελευταίο έλεγχο του ιστότοπου, ομαδοποιημένα, με τις σελίδες που επηρεάζονται και παραδείγματα URL, τα σοβαρότερα πρώτα.") },
  { name: "list_page_changes", text: c("Recent SEO changes on monitored pages (title, meta, H1, canonical, noindex, redirects and more), with the value before and after.", "Πρόσφατες αλλαγές SEO στις σελίδες που παρακολουθείτε (τίτλος, meta, H1, canonical, noindex, ανακατευθύνσεις κ.ά.), με την τιμή πριν και μετά.") },
  { name: "get_live_ranks", text: c("Tracked keywords with the Search Console position next to the latest live Google positions on desktop and mobile.", "Οι λέξεις που παρακολουθείτε, με τη θέση από το Search Console δίπλα στις τελευταίες θέσεις στη Google σε υπολογιστή και κινητό.") },
  { name: "get_backlink_risk", text: c("A risk review of referring domains from the backlink lookups you already saved. It never runs a new lookup.", "Έλεγχος κινδύνου για τους ιστότοπους που σας παραπέμπουν, από τους ελέγχους backlinks που έχετε ήδη αποθηκεύσει. Δεν κάνει ποτέ νέο έλεγχο.") },
  { name: "validate_schema", text: c("Checks the structured data (JSON-LD) of a public URL or a snippet and lists errors and eligible rich results.", "Ελέγχει τα δομημένα δεδομένα (JSON-LD) μιας δημόσιας σελίδας ή ενός αποσπάσματος και δείχνει σφάλματα και rich results.") },
  { name: "get_agent_task_inbox", text: c("Tasks sent from the app to this connection, so an agent can pick them up.", "Οι εργασίες που στείλατε από την εφαρμογή σε αυτή τη σύνδεση, ώστε να τις αναλάβει ένας agent.") },
  { name: "get_task_brief", text: c("The full brief for one task: evidence, target URL and query, steps and acceptance checks.", "Το πλήρες brief μιας εργασίας: στοιχεία, URL και αναζήτηση-στόχος, βήματα και κριτήρια ολοκλήρωσης.") },
  { name: "start_task", text: c("Marks a task as in progress.", "Σημειώνει μια εργασία ως σε εξέλιξη."), write: true },
  { name: "add_task_note", text: c("Adds a note to a task: findings, a blocker, a pull request link.", "Προσθέτει σημείωση σε μια εργασία: ευρήματα, ένα εμπόδιο, έναν σύνδεσμο pull request."), write: true },
  {
    name: "complete_task",
    text: c("Marks a task shipped, records what changed and starts the before/after Search Console measurement.", "Σημειώνει μια εργασία ως ολοκληρωμένη, καταγράφει τι άλλαξε και ξεκινά τη μέτρηση πριν/μετά στο Search Console."),
    write: true,
  },
];

const PROMPTS: ReadonlyArray<Copy> = [
  c("Which pages lost the most clicks this month?", "Ποιες σελίδες έχασαν τα περισσότερα κλικ αυτόν τον μήνα;"),
  c("What are my top 5 fixes for my site, and what is each worth?", "Ποιες είναι οι 5 πιο σημαντικές διορθώσεις για τον ιστότοπό μου και πόσο αξίζει η καθεμία;"),
  c("Is ChatGPT citing us for our tracked prompts, and who does it cite instead?", "Μας αναφέρει το ChatGPT στα prompts που παρακολουθούμε; Ποιους αναφέρει αντί για εμάς;"),
  c("Fix this task in this repo and mark it shipped.", "Κάνε αυτή την εργασία σε αυτό το repo και σημείωσέ τη ως ολοκληρωμένη."),
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("What is an MCP server for SEO?", "Τι είναι ένας MCP server για SEO;"),
    a: c(
      "MCP (Model Context Protocol) is the open standard AI assistants use to call outside tools. An SEO MCP server gives the assistant tools for your SEO data. This one exposes your Google Search Console performance, the ranked fix list, your tasks and your AI visibility, so Claude, ChatGPT or Cursor can answer from your own numbers instead of guessing.",
      "Το MCP (Model Context Protocol) είναι το ανοιχτό πρότυπο με το οποίο οι βοηθοί AI καλούν εξωτερικά εργαλεία. Ένας MCP server για SEO δίνει στον βοηθό εργαλεία για τα δεδομένα SEO σας. Αυτός εδώ δίνει πρόσβαση στην απόδοση από το Google Search Console, στη λίστα διορθώσεων, στις εργασίες και στην ορατότητά σας σε AI, ώστε το Claude, το ChatGPT ή το Cursor να απαντούν με τα δικά σας νούμερα αντί να μαντεύουν.",
    ),
  },
  {
    q: c("How do I connect Google Search Console to Claude or ChatGPT?", "Πώς συνδέω το Google Search Console με το Claude ή το ChatGPT;"),
    a: c(
      "Use a ChatGPT or Claude account that supports custom remote MCP connections. Add https://app.anotherseoguru.com/mcp, choose OAuth where requested, sign in to AnotherSEOGuru and review the permissions. Connect Search Console in the project before asking for its search performance. Client menus and organization permissions vary.",
      "Χρησιμοποιήστε λογαριασμό ChatGPT ή Claude που υποστηρίζει προσαρμοσμένες απομακρυσμένες συνδέσεις MCP. Προσθέστε το https://app.anotherseoguru.com/mcp, επιλέξτε OAuth όπου ζητείται, συνδεθείτε στο AnotherSEOGuru και ελέγξτε τις άδειες. Για στοιχεία απόδοσης αναζήτησης, συνδέστε το Search Console στο έργο. Τα μενού και οι άδειες οργανισμού διαφέρουν ανά εφαρμογή.",
    ),
  },
  {
    q: c("Can the assistant change my site or my Google account?", "Μπορεί ο βοηθός να αλλάξει τον ιστότοπο ή τον λογαριασμό μου στη Google;"),
    a: c(
      "Google access is read-only. Reading reports does not change your site. Tools that update tasks or other account data require the corresponding permission; destructive actions require explicit confirmation. Choose read-only access if you only want analysis, and review a proposed change before approving it.",
      "Η πρόσβαση στη Google είναι μόνο για ανάγνωση. Η ανάγνωση αναφορών δεν αλλάζει τον ιστότοπό σας. Τα εργαλεία που ενημερώνουν εργασίες ή άλλα στοιχεία λογαριασμού χρειάζονται την αντίστοιχη άδεια, ενώ οι διαγραφές απαιτούν ρητή επιβεβαίωση. Αν θέλετε μόνο ανάλυση, επιλέξτε πρόσβαση ανάγνωσης και ελέγξτε κάθε προτεινόμενη αλλαγή πριν την εγκρίνετε.",
    ),
  },
  {
    q: c("Do I need Node.js?", "Χρειάζομαι Node.js;"),
    a: c(
      "A compatible remote MCP client can connect directly to the server URL with OAuth, without a local Node.js installation. Local-command-only clients may need a bridge such as mcp-remote and the Node.js version that bridge currently supports.",
      "Μια συμβατή εφαρμογή απομακρυσμένου MCP συνδέεται απευθείας στη διεύθυνση server με OAuth, χωρίς τοπική εγκατάσταση Node.js. Οι εφαρμογές που εκτελούν μόνο τοπικές εντολές μπορεί να χρειάζονται γέφυρα όπως το mcp-remote και την έκδοση Node.js που υποστηρίζει.",
    ),
  },
  {
    q: c("How do I disconnect an assistant?", "Πώς αποσυνδέω έναν βοηθό;"),
    a: c(
      "Open Settings → Connected apps in the web app and press Disconnect next to it; access is revoked at once on every device.",
      "Ανοίξτε Ρυθμίσεις → Συνδεδεμένες εφαρμογές στην εφαρμογή web και πατήστε Αποσύνδεση δίπλα του· η πρόσβαση ανακαλείται αμέσως σε κάθε συσκευή.",
    ),
    link: { kind: "site", path: "/platform/integrations", label: c("All integrations", "Όλες οι ενσωματώσεις") },
  },
];

const CLIENTS: ReadonlyArray<{ id: string; name: string; how: Copy; label: Copy; code: string }> = [
  { id: "claude", name: "Claude", how: c("Add a custom remote MCP connector, paste the server URL and sign in with OAuth. Your organization may need to enable custom connectors first.", "Προσθέστε προσαρμοσμένη απομακρυσμένη σύνδεση MCP, επικολλήστε τη διεύθυνση server και συνδεθείτε με OAuth. Ο οργανισμός σας μπορεί να χρειάζεται να ενεργοποιήσει πρώτα τις προσαρμοσμένες συνδέσεις."), label: c("Server URL", "Διεύθυνση server"), code: MCP_URL },
  { id: "chatgpt", name: "ChatGPT", how: c("Use the custom remote MCP connection controls available to your account. Paste the server URL, choose OAuth and approve only the access you want to grant.", "Χρησιμοποιήστε τις ρυθμίσεις προσαρμοσμένης σύνδεσης MCP που διαθέτει ο λογαριασμός σας. Επικολλήστε τη διεύθυνση server, επιλέξτε OAuth και εγκρίνετε μόνο την πρόσβαση που θέλετε να δώσετε."), label: c("Server URL", "Διεύθυνση server"), code: MCP_URL },
];

function ChatMock({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === "el";
  return (
    <figure>
      <figcaption className="sr-only">
        {isEl
          ? "Απεικόνιση συνομιλίας: ο βοηθός καλεί το get_opportunities και απαντά με τις κορυφαίες διορθώσεις. Τα νούμερα είναι παράδειγμα."
          : "Illustration of a chat: the assistant calls get_opportunities and answers with the top fixes. The numbers are an example."}
      </figcaption>
      <div aria-hidden className="pointer-events-none select-none space-y-3 rounded-2xl border border-hairline bg-background p-4 text-left sm:p-6">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-brand/15 px-4 py-2.5 text-[13.5px] text-foreground">
          {isEl ? "Ποιες είναι οι 3 πιο σημαντικές διορθώσεις για το aegean-suites.example;" : "What are my top 3 fixes for aegean-suites.example?"}
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-1.5 font-mono text-[11.5px] text-muted-foreground">
          <Bot className="size-3.5 text-brand" />
          anotherseoguru · get_opportunities
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-hairline bg-surface px-4 py-3 text-[13.5px] leading-relaxed text-foreground/90">
          <p>{isEl ? "Από το Search Console σας, με τη μεγαλύτερη αξία πρώτα:" : "From your Search Console, biggest first:"}</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>{isEl ? "/rooms: θέση 11 για «santorini caldera suites», περίπου +140 κλικ/μήνα" : "/rooms: position 11 for “santorini caldera suites”, about +140 clicks/month"}</li>
            <li>{isEl ? "/offers: CTR 1,2% στη θέση 4, ξαναγράψτε τον τίτλο, περίπου +90" : "/offers: 1.2% CTR at position 4, rewrite the title, about +90"}</li>
            <li>{isEl ? "/blog/oia-sunset: πτώση 28 ημερών, ανανέωση, περίπου +60" : "/blog/oia-sunset: 28-day decline, refresh it, about +60"}</li>
          </ol>
          <p className="mt-2 text-muted-foreground">{isEl ? "Να ξεκινήσω την πρώτη εργασία;" : "Want me to start the first task?"}</p>
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        {isEl ? "Απεικόνιση με δείγμα ιστότοπου· τα νούμερα είναι παράδειγμα." : "Illustration on a sample site; the numbers are an example."}
      </p>
    </figure>
  );
}

export default async function PlatformMcpPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  const schema = integrationAppSchema({
    locale,
    path: PATH,
    name: "AnotherSEOGuru MCP server",
    alternateName: "AnotherSEOGuru App MCP",
    description: c(
      "Model Context Protocol server for SEO: Google Search Console performance, the ranked fix list, tasks and AI visibility from AnotherSEOGuru inside Claude, ChatGPT, Cursor, VS Code and Windsurf. Remote server with OAuth sign-in for Claude, ChatGPT, Codex, Cursor, Grok Bot, OpenClaw and Hermes.",
      "MCP server για SEO: απόδοση από το Google Search Console, η λίστα διορθώσεων, οι εργασίες και η ορατότητα σε AI από το AnotherSEOGuru μέσα σε Claude, ChatGPT, Cursor, VS Code και Windsurf. Απομακρυσμένος server με σύνδεση OAuth για Claude, ChatGPT, Codex, Cursor, Grok Bot, OpenClaw και Hermes.",
    ),
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "MCP server",
    softwareRequirements: "An MCP client with remote server support, or a supported Node.js version for the mcp-remote bridge",
    featureList: TOOLS.map((t) => t.name),
  });

  return (
    <>
      <SchemaMarkup schemas={[schema, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: "/platform/integrations" }, { name: "MCP", path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Bot />}>{tx("MCP server · One URL, any assistant", "MCP server · Μία διεύθυνση, κάθε βοηθός")}</KitEyebrow>}
          title={
            <>
              {tx("A Google Search Console MCP server,", "Ένας MCP server για το Google Search Console,")} <Accent>{tx("built for SEO", "φτιαγμένος για SEO")}</Accent>
            </>
          }
          lead={tx(
            "Use your Search Console data, fix list, tasks and AI visibility inside Claude, ChatGPT, Codex, Cursor, Grok Bot and other AI assistants. Add one URL, sign in with OAuth, and the assistant answers from your own account and can work through your SEO tasks.",
            "Χρησιμοποιήστε τα δεδομένα Search Console, τη λίστα διορθώσεων, τις εργασίες και την ορατότητα σε AI μέσα σε Claude, ChatGPT, Codex, Cursor, Grok Bot και άλλους βοηθούς AI. Προσθέτετε μία διεύθυνση, συνδέεστε με OAuth, και ο βοηθός απαντά από τον δικό σας λογαριασμό και δουλεύει τις εργασίες SEO σας.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpFree locale={locale} source="mcp-hero" />
              <a href="#setup" className={kitSecondaryBtn}>
                {tx("See the setup", "Δείτε τη ρύθμιση")}
                <ArrowRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: KeyRound, label: tx("OAuth sign-in, no token pasting", "Σύνδεση OAuth, χωρίς tokens") },
                { icon: LockKeyhole, label: tx("Read tools never change anything", "Τα εργαλεία ανάγνωσης δεν αλλάζουν τίποτα") },
                { icon: Unplug, label: tx("Disconnect any time", "Αποσύνδεση όποτε θέλετε") },
              ]}
            />
          }
        >
          <Container className="mt-14 sm:mt-16">
            <Stage className="mx-auto max-w-3xl">
              <p className="mb-4 text-xs text-muted-foreground">{tx("Illustrative conversation with fictional data. Live answers use the connected project and selected dates.", "Ενδεικτική συνομιλία με υποθετικά δεδομένα. Οι πραγματικές απαντήσεις χρησιμοποιούν το συνδεδεμένο έργο και την επιλεγμένη περίοδο.")}</p><ChatMock locale={locale} />
            </Stage>
          </Container>
        </HeroCentered>

        <NameStrip heading={tx("Custom remote connections in compatible clients", "Προσαρμοσμένες απομακρυσμένες συνδέσεις σε συμβατές εφαρμογές")}
          items={[{ name: "ChatGPT", role: tx("Interactive performance cards", "Διαδραστικές κάρτες απόδοσης") }, { name: "Claude", role: tx("Project data and task tools", "Δεδομένα έργου και εργαλεία εργασιών") }]} />

        <KitSection id="connection-status">
          <KitHeading eyebrow={tx("Your project, in your AI workflow", "Το έργο σας στη συνομιλία AI")} title={tx("Ask from your data. Approve the next step.", "Ρωτήστε με τα δεδομένα σας. Εγκρίνετε το επόμενο βήμα.")}
            description={tx("Explore Search Console performance in interactive ChatGPT cards, or ask Claude for the same project's MCP results. Read the dates and source, discuss the opportunities and approve task updates when you are ready to act.", "Δείτε την απόδοση Search Console σε διαδραστικές κάρτες ChatGPT ή ζητήστε από το Claude τα δεδομένα MCP του ίδιου έργου. Ελέγξτε περίοδο και πηγή, συζητήστε τις ευκαιρίες και εγκρίνετε ενημερώσεις εργασιών όταν είστε έτοιμοι να προχωρήσετε.")} />
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">{tx("Connect using the custom setup below. Available tools follow the permissions you grant to your AnotherSEOGuru account connection.", "Συνδεθείτε με την προσαρμοσμένη ρύθμιση που ακολουθεί. Τα διαθέσιμα εργαλεία εξαρτώνται από τις άδειες που δίνετε στη σύνδεση του λογαριασμού AnotherSEOGuru.")}</p>
        </KitSection>

        <KitSection id="setup">
          <KitHeading
            eyebrow={tx("Setup", "Ρύθμιση")}
            title={
              <>
                {tx("Two ways in,", "Δύο τρόποι σύνδεσης,")} <Accent>{tx("one account", "ένας λογαριασμός")}</Accent>
              </>
            }
            description={tx(
              "Sign in to AnotherSEOGuru and choose a project. Connect Search Console when you want search reports, then add the assistant with the permissions you choose.",
              "Συνδεθείτε στο AnotherSEOGuru και επιλέξτε έργο. Συνδέστε το Search Console όταν θέλετε αναφορές αναζήτησης και προσθέστε τον βοηθό με τις άδειες που επιλέγετε.",
            )}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="reveal flex min-w-0 flex-col rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-6">
              <KitEyebrow icon={<Bot />}>{tx("Remote server", "Απομακρυσμένος server")}</KitEyebrow>
              <h3 className="mt-3 text-[18px] font-semibold text-foreground">{tx("Claude.ai, ChatGPT, Cursor, VS Code, Windsurf", "Claude.ai, ChatGPT, Cursor, VS Code, Windsurf")}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {tx(
                  "Nothing to install. Add this URL as a custom connector or remote MCP server and approve access in your browser.",
                  "Δεν εγκαθιστάτε τίποτα. Προσθέστε αυτή τη διεύθυνση ως custom connector ή απομακρυσμένο MCP server και εγκρίνετε την πρόσβαση στον browser.",
                )}
              </p>
              <CodeBlock label={tx("Server URL", "Διεύθυνση server")} className="mt-5">
                {MCP_URL}
              </CodeBlock>
              <CheckList
                size="sm"
                className="mt-5"
                items={[
                  tx("Add a custom remote MCP connection in a compatible client.", "Προσθέστε προσαρμοσμένη απομακρυσμένη σύνδεση MCP σε συμβατή εφαρμογή."),
                  tx("Use OAuth and review the requested AnotherSEOGuru permissions.", "Χρησιμοποιήστε OAuth και ελέγξτε τις άδειες AnotherSEOGuru που ζητούνται."),
                  tx("Select the intended project and a date range in your question.", "Αναφέρετε το έργο και την περίοδο που σας ενδιαφέρουν στην ερώτησή σας."),
                ]}
              />
            </div>
            <div className="reveal flex min-w-0 flex-col rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-6">
              <KitEyebrow icon={<Terminal />}>{tx("Local command", "Τοπική εντολή")}</KitEyebrow>
              <h3 className="mt-3 text-[18px] font-semibold text-foreground">{tx("Claude Desktop and other local-only clients", "Claude Desktop και εφαρμογές μόνο με τοπικές εντολές")}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {tx(
                  `For clients that can only start a local command. The open-source ${MCP_BRIDGE} bridge opens your browser to sign in, then connects your client to the same server. Use a Node.js version currently supported by the bridge.`,
                  `Για εφαρμογές που εκτελούν μόνο τοπικές εντολές. Η γέφυρα ανοιχτού κώδικα ${MCP_BRIDGE} ανοίγει τον browser για να συνδεθείτε και μετά συνδέει την εφαρμογή σας στον ίδιο server. Χρησιμοποιήστε έκδοση Node.js που υποστηρίζει η γέφυρα.`,
                )}
              </p>
              <CodeBlock label={tx("Add to your client's MCP config", "Προσθήκη στις ρυθμίσεις MCP")} className="mt-5">
                {`{
  "mcpServers": {
    "anotherseoguru": {
      "command": "npx",
      "args": ["-y", "${MCP_BRIDGE}", "${MCP_URL}"]
    }
  }
}`}
              </CodeBlock>
              <p className="mt-3 text-[13px] text-muted-foreground">
                {tx(
                  "On Windows, if the client can't start npx, use \"command\": \"cmd\" with \"/c\", \"npx\" in front of the arguments.",
                  "Στα Windows, αν η εφαρμογή δεν ξεκινά το npx, βάλτε \"command\": \"cmd\" και στην αρχή των παραμέτρων \"/c\", \"npx\".",
                )}
              </p>
            </div>
          </div>
        </KitSection>

        <KitSection tinted id="clients">
          <KitHeading
            eyebrow={tx("Step by step", "Βήμα βήμα")}
            title={
              <>
                {tx("Setup for", "Ρύθμιση για")} <Accent>{tx("your assistant", "τον βοηθό σας")}</Accent>
              </>
            }
            description={tx(
              "Copy the lines for the assistant you use. Each one opens your browser once so you can approve access; nothing else to paste.",
              "Αντιγράψτε τις γραμμές για τον βοηθό που χρησιμοποιείτε. Κάθε σύνδεση ανοίγει μία φορά τον browser για να εγκρίνετε την πρόσβαση· δεν χρειάζεται να επικολλήσετε τίποτε άλλο.",
            )}
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {CLIENTS.map((client) => (
              <li key={client.id} id={`client-${client.id}`} className="reveal flex min-w-0 flex-col rounded-2xl border border-hairline bg-background p-5 sm:p-6">
                <h3 className="text-[17px] font-semibold text-foreground">{client.name}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{client.how[locale]}</p>
                <CodeBlock label={client.label[locale]} className="mt-4">
                  {client.code}
                </CodeBlock>
              </li>
            ))}
          </ul>
        </KitSection>

        <KitSection id="tools">
          <KitHeading
            eyebrow={tx("Tools", "Εργαλεία")}
            title={
              <>
                {tx("What the assistant", "Τι μπορεί να κάνει")} <Accent>{tx("can do", "ο βοηθός")}</Accent>
              </>
            }
            description={tx(
              "Read tools for your data, three task tools and one prompt. The task tools need the tasks permission, which the sign-in asks for by default; sign in read-only to leave them out.",
              "Εργαλεία ανάγνωσης για τα δεδομένα σας, τρία για εργασίες και ένα prompt. Τα εργαλεία εργασιών θέλουν την αντίστοιχη άδεια, που η σύνδεση ζητά από προεπιλογή· συνδεθείτε μόνο για ανάγνωση αν δεν τα θέλετε.",
            )}
          />
          <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
              <caption className="sr-only">{tx("MCP tools and what they do", "Τα εργαλεία MCP και τι κάνουν")}</caption>
              <thead>
                <tr className="border-b border-hairline text-[13px] text-muted-foreground">
                  <th scope="col" className="w-[34%] py-3 pr-4 font-medium">
                    {tx("Tool", "Εργαλείο")}
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    {tx("What it does", "Τι κάνει")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr key={t.name} className="border-b border-hairline/70 align-top">
                    <th scope="row" className="py-3.5 pr-4 font-mono text-[13px] font-medium text-foreground">
                      {t.name}
                      {t.write ? <span className="ml-2 font-sans text-[11px] font-normal text-muted-foreground">{tx("tasks", "εργασίες")}</span> : null}
                      {t.name === "fix_task" ? <span className="ml-2 font-sans text-[11px] font-normal text-muted-foreground">prompt</span> : null}
                    </th>
                    <td className="py-3.5 text-muted-foreground">{t.text[locale]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </KitSection>

        <KitSection tinted id="examples">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <KitHeading
              eyebrow={tx("Ask it", "Ρωτήστε τον")}
              title={
                <>
                  {tx("Questions that used to need", "Ερωτήσεις που ήθελαν")} <Accent>{tx("an export", "εξαγωγή δεδομένων")}</Accent>
                </>
              }
              description={tx(
                "In an editor like Cursor or VS Code, the fix_task prompt goes one step further: it reads a task's brief, makes the change in your code and marks it shipped, so the before/after measurement starts.",
                "Σε editor όπως το Cursor ή το VS Code, το prompt fix_task πάει ένα βήμα παραπέρα: διαβάζει το brief μιας εργασίας, κάνει την αλλαγή στον κώδικα και τη σημειώνει ως ολοκληρωμένη, ώστε να ξεκινήσει η μέτρηση πριν/μετά.",
              )}
            />
            <CheckList items={PROMPTS.map((p) => `“${p[locale]}”`)} />
          </div>
        </KitSection>

        <KitSection id="security">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <KitHeading
              eyebrow={tx("Security", "Ασφάλεια")}
              title={
                <>
                  {tx("Signed in like any app,", "Σύνδεση όπως σε κάθε εφαρμογή,")} <Accent>{tx("revoked in one click", "ανάκληση με ένα κλικ")}</Accent>
                </>
              }
              description={tx(
                "Sign-in is OAuth 2.1 with PKCE in your own browser, so neither the assistant nor the CLI sees your password. Every connection appears in Settings → Connected apps.",
                "Η σύνδεση γίνεται με OAuth 2.1 και PKCE στον δικό σας browser, οπότε ούτε ο βοηθός ούτε η γραμμή εντολών βλέπουν τον κωδικό σας. Κάθε σύνδεση εμφανίζεται στις Ρυθμίσεις → Συνδεδεμένες εφαρμογές.",
              )}
            />
            <CheckList
              items={[
                tx("Read-only Search Console access", "Πρόσβαση στο Search Console μόνο για ανάγνωση"),
                tx("Access tokens last an hour and refresh automatically", "Τα access tokens διαρκούν μία ώρα και ανανεώνονται αυτόματα"),
                tx("Disconnect in Settings → Connected apps, effective on every device at once", "Αποσύνδεση από Ρυθμίσεις → Συνδεδεμένες εφαρμογές, αμέσως σε όλες τις συσκευές"),
                tx("A personal token is available for CI and servers", "Για CI και servers υπάρχει και προσωπικό token"),
              ]}
            />
          </div>
        </KitSection>

        <OtherWaysSection locale={locale} current="mcp" tinted />
        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="mcp-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
