import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Layers, RefreshCcw, Unplug, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, StepsGrid, TrustLine, ValueTrio, kitSecondaryBtn } from "@/components/kit";
import {
  INTEGRATIONS_PATH,
  IntegrationCards,
  GscFaq,
  PlatformLinks,
  SURFACES,
  SignUpFree,
  c,
  platformBreadcrumbs,
  platformMetadata,
  type Copy,
  type GscFaqItem,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { BASE_URL, generateCollectionPageSchema } from "@/lib/seo/schema";

/**
 * Hub for every way to use GSC Boost with one AnotherSEOGuru login: the web
 * app, iPhone, the Chrome extension, the WordPress plugin and AI assistants
 * over MCP. The cards come from SURFACES in components/gsc-boost/integrations.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = INTEGRATIONS_PATH;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "SEO Integrations: Chrome, WordPress, AI", el: "Ενσωματώσεις: Chrome, WordPress, βοηθοί AI" },
    description: {
      en: "One AnotherSEOGuru login for the web app, iPhone, the SEO Chrome extension, the WordPress plugin and AI assistants over MCP, with your data synced everywhere.",
      el: "Ένας λογαριασμός AnotherSEOGuru για web, iPhone, την επέκταση SEO για Chrome, το plugin WordPress και τους βοηθούς AI μέσω MCP, με τα δεδομένα σας παντού.",
    },
    keyword: { en: "SEO integrations", el: "ενσωματώσεις SEO" },
  });
}

const WHICH: ReadonlyArray<{ need: Copy; use: Copy; path: string }> = [
  { need: c("Plan the week and see every report", "Να οργανώσετε την εβδομάδα και να δείτε κάθε αναφορά"), use: c("Web app", "Εφαρμογή web"), path: "/platform" },
  { need: c("Check traffic and alerts on the go", "Να ελέγχετε κίνηση και ειδοποιήσεις όπου κι αν είστε"), use: c("iPhone app", "Εφαρμογή iPhone"), path: "/platform/iphone" },
  { need: c("Audit any page while you browse, and see its own numbers", "Να ελέγχετε κάθε σελίδα όσο περιηγείστε και να βλέπετε τα νούμερά της"), use: c("Chrome extension", "Επέκταση Chrome"), path: "/platform/chrome-extension" },
  { need: c("Run your site's SEO in WordPress, with Search Console while you write", "Να κάνετε το SEO του ιστότοπου μέσα στο WordPress, με Search Console όσο γράφετε"), use: c("WordPress SEO plugin", "Plugin SEO για WordPress"), path: "/platform/wordpress" },
  { need: c("Ask questions in plain words, or let an AI agent work a task", "Να ρωτάτε με απλά λόγια ή να αφήνετε έναν AI agent να κάνει μια εργασία"), use: c("AI assistants (MCP)", "Βοηθοί AI (MCP)"), path: "/platform/mcp" },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Do I need a separate account for the extension, plugin or MCP server?", "Χρειάζομαι ξεχωριστό λογαριασμό για την επέκταση, το plugin ή το MCP;"),
    a: c(
      "No. All of them sign in with the same AnotherSEOGuru account as the web app, so your sites, tasks and plan are the same everywhere. Sign up once and connect each one when you need it.",
      "Όχι. Όλα συνδέονται με τον ίδιο λογαριασμό AnotherSEOGuru με την εφαρμογή web, οπότε οι ιστότοποι, οι εργασίες και το πακέτο σας είναι ίδια παντού. Κάνετε εγγραφή μία φορά και συνδέετε το καθένα όταν το χρειαστείτε.",
    ),
  },
  {
    q: c("What syncs between them?", "Τι συγχρονίζεται μεταξύ τους;"),
    a: c(
      "Tasks you save in the Chrome extension, add in the WordPress editor or update from an AI assistant show up in the web app and on iPhone. Title and meta description fixes you approve in the app are written to WordPress.",
      "Οι εργασίες που αποθηκεύετε στην επέκταση Chrome, προσθέτετε στον editor του WordPress ή ενημερώνετε από έναν βοηθό AI εμφανίζονται στην εφαρμογή web και στο iPhone. Οι διορθώσεις τίτλου και meta description που εγκρίνετε στην εφαρμογή γράφονται στο WordPress.",
    ),
  },
  {
    q: c("Where do I see and remove the apps I connected?", "Πού βλέπω και αφαιρώ τις εφαρμογές που έχω συνδέσει;"),
    a: c(
      "In the web app under Settings → Connected apps. It lists the Chrome extension, WordPress sites, command line and AI assistants signed in to your account, and Disconnect signs each one out at once.",
      "Στην εφαρμογή web, στο Ρυθμίσεις → Συνδεδεμένες εφαρμογές. Εκεί βλέπετε την επέκταση Chrome, τους ιστότοπους WordPress, τη γραμμή εντολών και τους βοηθούς AI που έχουν συνδεθεί, και η Αποσύνδεση τα αποσυνδέει αμέσως.",
    ),
  },
  {
    q: c("Do the integrations need API keys?", "Χρειάζονται API keys οι ενσωματώσεις;"),
    a: c(
      "No. The extension, the WordPress plugin and AI assistants connect through a normal sign-in in your browser and an Allow button. A personal token exists only for servers and CI, where a browser sign-in isn't practical.",
      "Όχι. Η επέκταση, το plugin WordPress και οι βοηθοί AI συνδέονται με κανονική σύνδεση στον browser και ένα κουμπί έγκρισης. Προσωπικό token υπάρχει μόνο για servers και CI, όπου η σύνδεση από browser δεν βολεύει.",
    ),
  },
  {
    q: c("What access do they have to my Google account?", "Τι πρόσβαση έχουν στον λογαριασμό μου στη Google;"),
    a: c(
      "None directly. They read your data through AnotherSEOGuru, which has read-only access to Search Console and Analytics. Nothing in your Google account can be changed from any of them.",
      "Καμία απευθείας. Διαβάζουν τα δεδομένα σας μέσω του AnotherSEOGuru, που έχει πρόσβαση μόνο για ανάγνωση στο Search Console και στο Analytics. Από καμία δεν μπορεί να αλλάξει κάτι στον λογαριασμό σας στη Google.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
];

export default async function PlatformIntegrationsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (p: string) => localizedPath(locale, p);

  const collection = generateCollectionPageSchema({
    name: tx("GSC Boost integrations", "Ενσωματώσεις GSC Boost"),
    description: tx(
      "Every way to use GSC Boost with one AnotherSEOGuru login: web app, iPhone, Chrome extension, WordPress plugin and AI assistants over MCP.",
      "Όλοι οι τρόποι να χρησιμοποιήσετε το GSC Boost με έναν λογαριασμό AnotherSEOGuru: web, iPhone, επέκταση Chrome, plugin WordPress και βοηθοί AI μέσω MCP.",
    ),
    url: `${BASE_URL}${lp(PATH)}`,
    inLanguage: locale,
    items: SURFACES.map((s) => ({ name: s.name[locale], url: `${BASE_URL}${lp(s.path)}`, itemType: "SoftwareApplication" })),
  });

  return (
    <>
      <SchemaMarkup schemas={[collection, platformBreadcrumbs(locale, [{ name: tx("Integrations", "Ενσωματώσεις"), path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Layers />}>{tx("GSC Boost · Integrations", "GSC Boost · Ενσωματώσεις")}</KitEyebrow>}
          title={
            <>
              {tx("One login, everywhere you", "Ένας λογαριασμός, παντού όπου")} <Accent>{tx("work on SEO", "δουλεύετε SEO")}</Accent>
            </>
          }
          lead={tx(
            "Use your Search Console data in the web app, on iPhone, in Chrome, inside WordPress and in AI assistants like Claude and ChatGPT. One AnotherSEOGuru account signs you in to all of them, and your sites and tasks stay in sync.",
            "Χρησιμοποιήστε τα δεδομένα του Search Console στο web, στο iPhone, στο Chrome, μέσα στο WordPress και σε βοηθούς AI όπως το Claude και το ChatGPT. Ένας λογαριασμός AnotherSEOGuru σας συνδέει σε όλα, και οι ιστότοποι και οι εργασίες σας μένουν συγχρονισμένα.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <SignUpFree locale={locale} source="integrations-hero" />
              <Link href={`${lp("/get-started")}#free-audit`} className={kitSecondaryBtn}>
                {tx("Get a quote", "Ζητήστε προσφορά")}
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: UserPlus, label: tx("One account for every app", "Ένας λογαριασμός για όλες τις εφαρμογές") },
                { icon: RefreshCcw, label: tx("Tasks and sites in sync", "Εργασίες και ιστότοποι συγχρονισμένα") },
                { icon: Unplug, label: tx("Disconnect any app in one click", "Αποσύνδεση με ένα κλικ") },
              ]}
            />
          }
        >
          <Container className="mt-14 pb-6 sm:mt-16">
            <IntegrationCards locale={locale} />
          </Container>
        </HeroCentered>

        <KitSection tinted id="one-login">
          <KitHeading
            align="center"
            eyebrow={tx("How it works", "Πώς λειτουργεί")}
            title={
              <>
                {tx("Sign up once,", "Εγγραφή μία φορά,")} <Accent>{tx("connect anywhere", "σύνδεση παντού")}</Accent>
              </>
            }
          />
          <StepsGrid
            className="mt-14"
            steps={[
              {
                title: tx("Sign up and add your sites", "Εγγραφή και προσθήκη ιστότοπων"),
                text: tx(
                  "Create a free account and connect Google Search Console read-only. Your sites, fixes and tasks live here.",
                  "Δημιουργήστε δωρεάν λογαριασμό και συνδέστε το Google Search Console μόνο για ανάγνωση. Εδώ βρίσκονται οι ιστότοποι, οι διορθώσεις και οι εργασίες σας.",
                ),
              },
              {
                title: tx("Connect each app with your account", "Σύνδεση κάθε εφαρμογής με τον λογαριασμό σας"),
                text: tx(
                  "In the extension, the plugin or your AI assistant, choose to connect, sign in and press Allow. No API keys to copy.",
                  "Στην επέκταση, στο plugin ή στον βοηθό AI, επιλέξτε σύνδεση, μπείτε στον λογαριασμό σας και πατήστε Να επιτρέπεται. Δεν αντιγράφετε κανένα API key.",
                ),
              },
              {
                title: tx("Manage it in Connected apps", "Διαχείριση στις Συνδεδεμένες εφαρμογές"),
                text: tx(
                  "Settings → Connected apps lists everything signed in to your account, when it was last used, and a Disconnect button for each.",
                  "Το Ρυθμίσεις → Συνδεδεμένες εφαρμογές δείχνει όλα όσα έχουν συνδεθεί στον λογαριασμό σας, πότε χρησιμοποιήθηκαν τελευταία φορά και ένα κουμπί Αποσύνδεσης για το καθένα.",
                ),
              },
            ]}
          />
          <ValueTrio
            className="mt-16"
            items={[
              {
                icon: RefreshCcw,
                title: tx("Tasks follow you", "Οι εργασίες σας ακολουθούν"),
                text: tx(
                  "Save an issue as a task in Chrome, add one from the WordPress editor, close one from Cursor: it is the same list in the web app and on iPhone.",
                  "Αποθηκεύστε ένα πρόβλημα ως εργασία στο Chrome, προσθέστε μία από τον editor του WordPress, κλείστε μία από το Cursor: είναι η ίδια λίστα στο web και στο iPhone.",
                ),
              },
              {
                icon: Layers,
                title: tx("The same numbers everywhere", "Τα ίδια νούμερα παντού"),
                text: tx(
                  "Every app reads the same Search Console data and the same ranked fixes, so they never disagree.",
                  "Όλες οι εφαρμογές διαβάζουν τα ίδια δεδομένα Search Console και τις ίδιες διορθώσεις, οπότε δεν διαφωνούν ποτέ.",
                ),
              },
              {
                icon: Unplug,
                title: tx("You stay in control", "Ο έλεγχος μένει σε εσάς"),
                text: tx(
                  "Google access is read-only, fixes are written to WordPress only after you approve them, and any app can be disconnected at once.",
                  "Η πρόσβαση στη Google είναι μόνο για ανάγνωση, οι διορθώσεις γράφονται στο WordPress μόνο αφού τις εγκρίνετε, και κάθε εφαρμογή αποσυνδέεται αμέσως.",
                ),
              },
            ]}
          />
        </KitSection>

        <KitSection id="which">
          <KitHeading
            eyebrow={tx("Which one when", "Τι χρησιμοποιώ πότε")}
            title={
              <>
                {tx("Pick the one that fits", "Διαλέξτε αυτό που ταιριάζει")} <Accent>{tx("the moment", "στη στιγμή")}</Accent>
              </>
            }
          />
          <div className="reveal mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
              <caption className="sr-only">{tx("Which integration to use for which job", "Ποια ενσωμάτωση για ποια δουλειά")}</caption>
              <thead>
                <tr className="border-b border-hairline text-[13px] text-muted-foreground">
                  <th scope="col" className="w-[62%] py-3 pr-4 font-medium">
                    {tx("When you want to…", "Όταν θέλετε…")}
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    {tx("Use", "Χρησιμοποιήστε")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {WHICH.map((w) => (
                  <tr key={w.path} className="border-b border-hairline/70">
                    <td className="py-3.5 pr-4 text-foreground/90">{w.need[locale]}</td>
                    <td className="py-3.5">
                      <Link href={lp(w.path)} className="inline-flex items-center gap-1.5 font-medium text-link hover:underline">
                        {w.use[locale]}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </KitSection>

        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="integrations-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
