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
  MCP_PACKAGE,
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
 * The AnotherSEOGuru MCP server: the hosted server at app.anotherseoguru.com/mcp
 * and the @anotherseoguru/mcp npm package (a stdio bridge plus CLI). Facts from
 * gsc-gemini-boost/packages/mcp/README.md; tool names must match it exactly.
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
      en: "An MCP server for SEO: your Google Search Console data, fixes, tasks and AI visibility in Claude, ChatGPT, Cursor, VS Code and Windsurf, with OAuth sign-in.",
      el: "MCP server για SEO: δεδομένα Search Console, διορθώσεις, εργασίες και ορατότητα σε AI μέσα σε Claude, ChatGPT, Cursor, VS Code και Windsurf, με σύνδεση OAuth.",
    },
    keyword: { en: "Google Search Console MCP", el: "MCP server για SEO" },
  });
}

const TOOLS: ReadonlyArray<{ name: string; text: Copy; write?: boolean }> = [
  { name: "list_sites", text: c("The Search Console properties your account can read, with their project.", "Τα properties του Search Console που διαβάζει ο λογαριασμός σας, με το έργο του καθενός.") },
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
      "The ranked fix list: striking-distance keywords, low-CTR snippets, decaying pages, cannibalization and missing content, each with extra clicks per month.",
      "Η λίστα διορθώσεων με σειρά: λέξεις κοντά στην πρώτη σελίδα, snippets με χαμηλό CTR, σελίδες σε πτώση, αλληλοεπικάλυψη και περιεχόμενο που λείπει, με τα επιπλέον κλικ τον μήνα.",
    ),
  },
  { name: "get_tasks", text: c("Your SEO and client tasks: status, priority, due date, target page and the clicks each is worth.", "Οι εργασίες SEO και πελατών: κατάσταση, προτεραιότητα, προθεσμία, σελίδα και τα κλικ που αξίζει η καθεμία.") },
  {
    name: "get_ai_visibility_summary",
    text: c("How often AI assistants cite your site for tracked prompts, per model, and which competitors they cite instead.", "Πόσο συχνά σας αναφέρουν οι βοηθοί AI στα prompts που παρακολουθείτε, ανά μοντέλο, και ποιους ανταγωνιστές αναφέρουν αντί για εσάς."),
  },
  { name: "get_task_brief", text: c("The full brief for one task: evidence, target URL and query, steps and acceptance checks.", "Το πλήρες brief μιας εργασίας: στοιχεία, URL και αναζήτηση-στόχος, βήματα και κριτήρια ολοκλήρωσης.") },
  { name: "start_task", text: c("Marks a task as in progress.", "Σημειώνει μια εργασία ως σε εξέλιξη."), write: true },
  { name: "add_task_note", text: c("Adds a note to a task: findings, a blocker, a pull request link.", "Προσθέτει σημείωση σε μια εργασία: ευρήματα, ένα εμπόδιο, έναν σύνδεσμο pull request."), write: true },
  {
    name: "complete_task",
    text: c("Marks a task shipped, records what changed and starts the before/after Search Console measurement.", "Σημειώνει μια εργασία ως ολοκληρωμένη, καταγράφει τι άλλαξε και ξεκινά τη μέτρηση πριν/μετά στο Search Console."),
    write: true,
  },
  { name: "fix_task", text: c("A prompt: load a task's brief, make the fix in the open project and report back.", "Ένα prompt: φορτώνει το brief μιας εργασίας, κάνει τη διόρθωση στο ανοιχτό έργο και αναφέρει τι έγινε.") },
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
      "Sign up for AnotherSEOGuru and connect Search Console once. Then add https://app.anotherseoguru.com/mcp as a custom connector: in Claude under Settings → Connectors, in ChatGPT under Settings → Apps & Connectors with developer mode on. Approve access when asked. There is no token to paste.",
      "Κάντε εγγραφή στο AnotherSEOGuru και συνδέστε το Search Console μία φορά. Μετά προσθέστε το https://app.anotherseoguru.com/mcp ως custom connector: στο Claude από Settings → Connectors, στο ChatGPT από Settings → Apps & Connectors με ενεργό το developer mode. Εγκρίνετε την πρόσβαση όταν σας ζητηθεί. Δεν χρειάζεται να επικολλήσετε κανένα token.",
    ),
  },
  {
    q: c("Can the assistant change my site or my Google account?", "Μπορεί ο βοηθός να αλλάξει τον ιστότοπο ή τον λογαριασμό μου στη Google;"),
    a: c(
      "No. The read tools never change anything, and Search Console access is read-only. The only write tools update your AnotherSEOGuru tasks (start, add a note, complete), and only if you granted the tasks permission. Sign in with read-only scope if you want none of that.",
      "Όχι. Τα εργαλεία ανάγνωσης δεν αλλάζουν τίποτα και η πρόσβαση στο Search Console είναι μόνο για ανάγνωση. Τα μόνα εργαλεία εγγραφής ενημερώνουν τις εργασίες σας στο AnotherSEOGuru (έναρξη, σημείωση, ολοκλήρωση) και μόνο αν έχετε δώσει την αντίστοιχη άδεια. Αν δεν θέλετε ούτε αυτό, συνδεθείτε μόνο για ανάγνωση.",
    ),
  },
  {
    q: c("Do I need Node.js?", "Χρειάζομαι Node.js;"),
    a: c(
      "Only for the local bridge. Clients that accept a remote server URL (Claude.ai, ChatGPT, Cursor, VS Code, Windsurf) connect to https://app.anotherseoguru.com/mcp directly. For clients that start local commands, the npm package needs Node.js 18 or newer and has no other dependencies.",
      "Μόνο για την τοπική γέφυρα. Όσες εφαρμογές δέχονται διεύθυνση απομακρυσμένου server (Claude.ai, ChatGPT, Cursor, VS Code, Windsurf) συνδέονται απευθείας στο https://app.anotherseoguru.com/mcp. Για εφαρμογές που εκκινούν τοπικές εντολές, το πακέτο npm θέλει Node.js 18 ή νεότερο και τίποτε άλλο.",
    ),
  },
  {
    q: c("How do I disconnect an assistant?", "Πώς αποσυνδέω έναν βοηθό;"),
    a: c(
      "Open Settings → Connected apps in the web app and press Disconnect next to it; access is revoked at once on every device. From a terminal, npx @anotherseoguru/mcp logout does the same.",
      "Ανοίξτε Ρυθμίσεις → Συνδεδεμένες εφαρμογές στην εφαρμογή web και πατήστε Αποσύνδεση δίπλα του· η πρόσβαση ανακαλείται αμέσως σε κάθε συσκευή. Από τερματικό, το npx @anotherseoguru/mcp logout κάνει το ίδιο.",
    ),
    link: { kind: "site", path: "/platform/integrations", label: c("All integrations", "Όλες οι ενσωματώσεις") },
  },
];

/** A static mock of an assistant answering from the MCP tools. */
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
    alternateName: MCP_PACKAGE,
    description: c(
      "Model Context Protocol server for SEO: Google Search Console performance, the ranked fix list, tasks and AI visibility from AnotherSEOGuru inside Claude, ChatGPT, Cursor, VS Code and Windsurf. Remote server with OAuth sign-in, or a local npm bridge.",
      "MCP server για SEO: απόδοση από το Google Search Console, η λίστα διορθώσεων, οι εργασίες και η ορατότητα σε AI από το AnotherSEOGuru μέσα σε Claude, ChatGPT, Cursor, VS Code και Windsurf. Απομακρυσμένος server με σύνδεση OAuth ή τοπική γέφυρα μέσω npm.",
    ),
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "MCP server",
    softwareRequirements: "An MCP client; Node.js 18 or later for the local npm bridge",
    featureList: TOOLS.map((t) => t.name),
  });

  return (
    <>
      <SchemaMarkup schemas={[schema, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: "/platform/integrations" }, { name: "MCP", path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Bot />}>{tx("MCP server · Remote and npm", "MCP server · Απομακρυσμένα και npm")}</KitEyebrow>}
          title={
            <>
              {tx("A Google Search Console MCP server,", "Ένας MCP server για το Google Search Console,")} <Accent>{tx("built for SEO", "φτιαγμένος για SEO")}</Accent>
            </>
          }
          lead={tx(
            "Use your Search Console data, fix list, tasks and AI visibility inside Claude, ChatGPT, Cursor, VS Code and Windsurf. Add one URL, sign in with OAuth, and the assistant answers from your own account and can work through your SEO tasks.",
            "Χρησιμοποιήστε τα δεδομένα Search Console, τη λίστα διορθώσεων, τις εργασίες και την ορατότητα σε AI μέσα σε Claude, ChatGPT, Cursor, VS Code και Windsurf. Προσθέτετε μία διεύθυνση, συνδέεστε με OAuth, και ο βοηθός απαντά από τον δικό σας λογαριασμό και δουλεύει τις εργασίες SEO σας.",
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
              <ChatMock locale={locale} />
            </Stage>
          </Container>
        </HeroCentered>

        <NameStrip
          heading={tx("Works in the AI assistants and editors you already use", "Δουλεύει στους βοηθούς AI και στους editors που ήδη χρησιμοποιείτε")}
          items={[
            { name: "Claude", role: tx("Remote or Desktop", "Remote ή Desktop") },
            { name: "ChatGPT", role: tx("Custom connector", "Custom connector") },
            { name: "Cursor", role: tx("Remote or local", "Remote ή τοπικά") },
            { name: "VS Code", role: tx("Copilot agent mode", "Copilot agent mode") },
            { name: "Windsurf", role: tx("Remote or local", "Remote ή τοπικά") },
            { name: "Claude Code", role: tx("One command", "Μία εντολή") },
          ]}
        />

        <KitSection id="setup">
          <KitHeading
            eyebrow={tx("Setup", "Ρύθμιση")}
            title={
              <>
                {tx("Two ways in,", "Δύο τρόποι σύνδεσης,")} <Accent>{tx("one account", "ένας λογαριασμός")}</Accent>
              </>
            }
            description={tx(
              "Sign up and connect Search Console in the web app first. Then pick the way that fits your client.",
              "Πρώτα κάντε εγγραφή και συνδέστε το Search Console στην εφαρμογή web. Μετά διαλέξτε τον τρόπο που ταιριάζει στην εφαρμογή σας.",
            )}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="reveal flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6">
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
                  tx("Claude: Settings → Connectors → Add custom connector", "Claude: Settings → Connectors → Add custom connector"),
                  tx("ChatGPT: Settings → Apps & Connectors → Advanced → Developer mode → Create, OAuth", "ChatGPT: Settings → Apps & Connectors → Advanced → Developer mode → Create, με OAuth"),
                  tx("Claude Code: claude mcp add --transport http anotherseoguru <URL>", "Claude Code: claude mcp add --transport http anotherseoguru <URL>"),
                ]}
              />
            </div>
            <div className="reveal flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6">
              <KitEyebrow icon={<Terminal />}>{tx("Local, via npm", "Τοπικά, μέσω npm")}</KitEyebrow>
              <h3 className="mt-3 text-[18px] font-semibold text-foreground">{tx("Claude Desktop, Cursor, VS Code, Windsurf", "Claude Desktop, Cursor, VS Code, Windsurf")}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {tx(
                  `For clients that start local commands. ${MCP_PACKAGE} signs you in once in the browser, then bridges your client to the hosted server. Node.js 18 or newer.`,
                  `Για εφαρμογές που εκκινούν τοπικές εντολές. Το ${MCP_PACKAGE} σας συνδέει μία φορά από τον browser και μετά γεφυρώνει την εφαρμογή σας με τον server μας. Node.js 18 ή νεότερο.`,
                )}
              </p>
              <CodeBlock label={tx("1. Sign in", "1. Σύνδεση")} className="mt-5">
                {`npx ${MCP_PACKAGE} login`}
              </CodeBlock>
              <CodeBlock label={tx("2. Add to your client's MCP config", "2. Προσθήκη στις ρυθμίσεις MCP")} className="mt-3">
                {`{
  "mcpServers": {
    "anotherseoguru": {
      "command": "npx",
      "args": ["-y", "${MCP_PACKAGE}"]
    }
  }
}`}
              </CodeBlock>
              <p className="mt-3 text-[13px] text-muted-foreground">
                {tx(`npx ${MCP_PACKAGE} config <client> prints the exact snippet for your client.`, `Η εντολή npx ${MCP_PACKAGE} config <εφαρμογή> τυπώνει τις ακριβείς ρυθμίσεις για την εφαρμογή σας.`)}
              </p>
            </div>
          </div>
        </KitSection>

        <KitSection tinted id="tools">
          <KitHeading
            eyebrow={tx("Tools", "Εργαλεία")}
            title={
              <>
                {tx("What the assistant", "Τι μπορεί να κάνει")} <Accent>{tx("can do", "ο βοηθός")}</Accent>
              </>
            }
            description={tx(
              "Six read tools, three task tools and one prompt. The task tools need the tasks permission, which the sign-in asks for by default; sign in read-only to leave them out.",
              "Έξι εργαλεία ανάγνωσης, τρία για εργασίες και ένα prompt. Τα εργαλεία εργασιών θέλουν την αντίστοιχη άδεια, που η σύνδεση ζητά από προεπιλογή· συνδεθείτε μόνο για ανάγνωση αν δεν τα θέλετε.",
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

        <KitSection id="examples">
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

        <KitSection tinted id="security">
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
                "Η σύνδεση γίνεται με OAuth 2.1 και PKCE στον δικό σας browser, οπότε ούτε ο βοηθός ούτε η γραμμή εντολών βλέπουν τον κωδικό σας. Κάθε σύνδεση εμφανίζεται στο Ρυθμίσεις → Συνδεδεμένες εφαρμογές.",
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

        <OtherWaysSection locale={locale} current="mcp" />
        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="mcp-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
