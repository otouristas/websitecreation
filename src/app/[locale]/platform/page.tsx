import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, Code2, Globe, ListChecks, Puzzle, Smartphone, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ChatDomainEntry } from "@/components/landing/ChatDomainEntry";
import { SeoChatDemo } from "@/components/landing/SeoChatDemo";
import { SampleWindow } from "@/components/pages/home/SampleWindow";
import { homeCopy } from "@/components/pages/home/copy";
import { TieredModuleGrid } from "@/components/pages/platform-wave/modules";
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveAgencyDoor,
  WaveChoice,
  WaveClose,
  WaveEyebrow,
  WaveFaq,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveSoftwareActions,
  WaveStats,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import {
  HOME_FAQ,
  INTEGRATIONS_PATH,
  IntegrationCards,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  appLink,
  gscBoostSoftwareSchema,
  platformMetadata,
  type ModuleId,
} from "@/components/gsc-boost";
import { DecisionsPanel, RawQueriesPanel } from "@/components/kit";
import { getAppPath } from "@/lib/app-links";
import { withExactTitle } from "@/lib/seo/exact-meta";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * Competitor product titles lead with the category and name the job once
 * (Moz: "SEO Software for Smarter Marketing", Screaming Frog: "SEO Spider
 * Website Crawler"). The old title started with the product name and
 * buildMetadata appended " | AnotherSEOGuru", so the brand shipped twice.
 * withExactTitle keeps this string intact: the builder caps the primary
 * segment at 43 characters.
 */
const PLATFORM_TITLE = {
  en: "SEO Software for Search Console Fixes | AnotherSEOGuru",
  el: "Λογισμικό SEO από το Search Console | AnotherSEOGuru",
} as const;

const PLATFORM_DESCRIPTION = {
  en: "AnotherSEOGuru App turns Google Search Console into ranked fixes with click estimates. Keywords, site audits and AI visibility, from your own data.",
  el: "Το AnotherSEOGuru App κάνει το Search Console λίστα διορθώσεων με εκτίμηση κλικ. Λέξεις-κλειδιά, έλεγχοι και ορατότητα σε AI, από τα δεδομένα σας.",
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const metadata = platformMetadata({
    locale,
    path: "/platform",
    title: PLATFORM_TITLE,
    description: PLATFORM_DESCRIPTION,
    keyword: { en: "SEO software platform", el: "λογισμικό SEO" },
  });
  return withExactTitle(metadata, PLATFORM_TITLE[locale]);
}

const TOUR: ReadonlyArray<ModuleId> = [
  "opportunities",
  "performance",
  "keywords",
  "content",
  "audit",
  "competitors",
  "ai-visibility",
  "assistant",
  "agency",
];

export default async function PlatformHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (path: string) => localizedPath(locale, path);
  const copy = homeCopy(locale);
  const places = [
    {
      name: tx("Web workspace", "Χώρος εργασίας web"),
      detail: tx("Chat, evidence, documents and your existing SEO tools.", "Συνομιλία, στοιχεία, έγγραφα και τα υπάρχοντα εργαλεία SEO."),
      href: `${getAppPath("/demo/chat")}?lang=${locale}`,
      state: tx("Try the sample workspace", "Δοκιμάστε το δείγμα"),
      icon: Globe,
    },
    {
      name: "iPhone",
      detail: tx("A native app on the same account, with sharing and site context.", "Εγγενής εφαρμογή στον ίδιο λογαριασμό, με κοινή χρήση και πλαίσιο ιστοτόπου."),
      href: lp("/platform/iphone"),
      state: "TestFlight beta",
      icon: Smartphone,
    },
    {
      name: "Android",
      detail: tx("A native Android client using the same data and assistant.", "Εγγενής εφαρμογή Android με τα ίδια δεδομένα και βοηθό."),
      href: lp("/platform/android"),
      state: tx("Release preparation", "Προετοιμασία κυκλοφορίας"),
      icon: Smartphone,
    },
    {
      name: "WordPress",
      detail: tx("Work in the editor. Preview SEO changes and approve them before applying.", "Εργαστείτε στον editor. Δείτε και εγκρίνετε τις αλλαγές SEO πριν εφαρμοστούν."),
      href: lp("/platform/wordpress"),
      state: tx("Plugin and editor tools", "Plugin και εργαλεία editor"),
      icon: Puzzle,
    },
    {
      name: tx("Browser extension", "Επέκταση προγράμματος περιήγησης"),
      detail: tx("Ask about the page you choose, with your account and site context.", "Ρωτήστε για τη σελίδα που επιλέγετε, με τον λογαριασμό και τον ιστότοπό σας."),
      href: lp("/platform/chrome-extension"),
      state: tx("Chrome and compatible browsers", "Chrome και συμβατά προγράμματα"),
      icon: Puzzle,
    },
    {
      name: "MCP / API",
      detail: tx("Use the supported tools from external assistants with scoped permissions.", "Χρησιμοποιήστε τα υποστηριζόμενα εργαλεία από εξωτερικούς βοηθούς με συγκεκριμένα δικαιώματα."),
      href: lp("/platform/mcp"),
      state: tx("See supported capabilities", "Δείτε τις υποστηριζόμενες δυνατότητες"),
      icon: Code2,
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={[gscBoostSoftwareSchema(locale)]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href="#aster" tag={copy.announceTag} text={copy.announce} />}
          title={
            <>
              <span className="block">{tx("Ask Aster AI.", "Ρωτήστε τον Aster AI.")}</span>
              <span className="block">
                {tx("Find your ", "Δείτε το ")}
                <WaveAccent>{tx("next move.", "επόμενο βήμα.")}</WaveAccent>
              </span>
            </>
          }
          lead={tx(
            "How can I rank for this keyword? Why are my clicks falling? Ask in your own words. Aster AI connects your questions to Search Console evidence, page checks and a clear next step inside AnotherSEOGuru App. Inspect the sources, save a task or draft, and review each change before it goes live.",
            "Πώς θα ανέβω για αυτή τη λέξη-κλειδί; Γιατί μειώνονται τα κλικ μου; Ρωτήστε με δικά σας λόγια. Ο Aster AI εξετάζει τα δεδομένα σας στο Search Console, ελέγχει τις σελίδες και σας προτείνει τι να κάνετε στη συνέχεια. Αποθηκεύστε μια εργασία ή ένα προσχέδιο και ελέγξτε τις αλλαγές πριν τις δημοσιεύσετε.",
          )}
          actions={<ChatDomainEntry locale={locale} />}
          trust={<TrustMarks items={copy.trust} yesLabel={copy.markYes} />}
          panel={<SampleWindow copy={copy} />}
          panelNote={
            <>
              {copy.sampleCaption}{" "}
              <a href={appLink("/demo", locale, "platform-window-link")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                {tx("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη")}
              </a>
            </>
          }
        />

        <section data-shot="tools" className="border-y border-hairline bg-surface/40">
          <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13.5px] text-muted-foreground">
              <li className="text-muted-foreground/80">{copy.worksWith}</li>
              {copy.integrations.map((item) => (
                <li key={item.label}>
                  <Link href={lp(item.href)} className="inline-flex items-center gap-2 hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              {tx("Integrations and data sources, not customer endorsements.", "Ενσωματώσεις και πηγές δεδομένων, όχι αξιολογήσεις πελατών.")}
            </p>
          </div>
        </section>

        <section data-shot="aster" className="scroll-mt-28">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <WaveHeading
              align="center"
              eyebrow="Aster AI"
              title={
                <>
                  {tx("Ask in your own words. ", "Ρωτήστε με δικά σας λόγια. ")}
                  <WaveAccent>{tx("See the evidence.", "Δείτε τα στοιχεία.")}</WaveAccent>
                </>
              }
              lead={tx(
                "Sample data for a fictional hotel. The demo runs the real app with no account.",
                "Δείγμα δεδομένων για ένα φανταστικό ξενοδοχείο. Η επίδειξη τρέχει την πραγματική εφαρμογή χωρίς λογαριασμό.",
              )}
            />
            <div className="mx-auto mt-12 min-w-0 max-w-5xl">
              <SeoChatDemo locale={locale} />
            </div>
          </div>
        </section>

        <WaveSection id="product" shot="modules">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div className="min-w-0">
              <WaveEyebrow>{tx("The product", "Το προϊόν")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("One workspace for the whole ", "Ένας χώρος εργασίας για ολόκληρο τον ")}
                <WaveAccent>{tx("SEO loop", "κύκλο του SEO")}</WaveAccent>
              </h2>
            </div>
            <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">
              {tx(
                "Find what to fix, research what to build, ship it and prove it worked. Nine modules, all working from the same data.",
                "Βρείτε τι να διορθώσετε, ερευνήστε τι να δημιουργήσετε, υλοποιήστε το και αποδείξτε ότι πέτυχε. Εννέα λειτουργίες, όλες πάνω στα ίδια δεδομένα.",
              )}
            </p>
          </div>
          <TieredModuleGrid locale={locale} source="platform-tour" ids={TOUR} />
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-[14px]">
            <Link href={lp("/platform/features")} className="font-semibold text-primary hover:text-foreground">
              {tx("Every module, with what it costs", "Όλες οι λειτουργίες, με το κόστος τους")} →
            </Link>
            <Link href={isEl ? "/el/pos-leitourgei" : "/en/how-it-works"} className="font-semibold text-primary hover:text-foreground">
              {tx("How it works", "Πώς λειτουργεί")} →
            </Link>
          </p>
        </WaveSection>

        <WaveSection shot="decisions" tinted>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div className="min-w-0">
              <WaveEyebrow>{tx("Why AnotherSEOGuru App", "Γιατί AnotherSEOGuru App")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("Search Console shows you data. AnotherSEOGuru App hands you ", "Το Search Console σάς δείχνει δεδομένα. Το AnotherSEOGuru App σάς δίνει ")}
                <WaveAccent>{tx("decisions.", "αποφάσεις.")}</WaveAccent>
              </h2>
            </div>
            <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">
              {tx(
                "Search Console’s reports are thousands of rows sorted by clicks, usually with your own brand name on top. The fixes worth making are buried further down.",
                "Οι αναφορές του Search Console είναι χιλιάδες γραμμές ταξινομημένες κατά κλικ, συνήθως με το όνομα του brand σας στην κορυφή. Οι διορθώσεις που αξίζουν είναι θαμμένες πιο κάτω.",
              )}
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <AppPanel url="search.google.com/search-console" badge={tx("Before", "Πριν")} caption={tx("Raw rows, sorted by clicks", "Ακατέργαστες γραμμές, ταξινομημένες κατά κλικ")}>
              <RawQueriesPanel locale={locale} />
            </AppPanel>
            <AppPanel url="app.anotherseoguru.com" badge={tx("After", "Μετά")} caption={tx("The same data, as ranked actions", "Τα ίδια δεδομένα, ως ενέργειες με προτεραιότητα")}>
              <DecisionsPanel locale={locale} />
            </AppPanel>
          </div>
          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: tx("Ranked by clicks, not noise", "Προτεραιότητα στα κλικ, όχι στον θόρυβο"),
                text: tx(
                  "Every fix is scored by the extra clicks it could bring and the effort it takes, so the top of the list is always the best next move.",
                  "Κάθε διόρθωση βαθμολογείται με βάση τα επιπλέον κλικ που μπορεί να φέρει και τον κόπο που απαιτεί, οπότε η κορυφή της λίστας είναι πάντα η πιο χρήσιμη επόμενη κίνηση.",
                ),
              },
              {
                icon: Calculator,
                title: tx("Every estimate explained", "Κάθε εκτίμηση τεκμηριωμένη"),
                text: tx(
                  "Each number shows the position, impressions and CTR behind it, measured against a CTR curve fitted to your own site.",
                  "Κάθε νούμερο δείχνει τη θέση, τις εμφανίσεις και το CTR από τα οποία προκύπτει, σε σύγκριση με μια καμπύλη CTR προσαρμοσμένη στον δικό σας ιστότοπο.",
                ),
              },
              {
                icon: ListChecks,
                title: tx("Follow-through built in", "Ενσωματωμένη υλοποίηση"),
                text: tx(
                  "Turn a fix into a task, annotate what you shipped and see the effect on the chart, or in a client report.",
                  "Μετατρέψτε μια διόρθωση σε εργασία, σημειώστε τι υλοποιήσατε και δείτε το αποτέλεσμα στο γράφημα ή σε μια αναφορά πελάτη.",
                ),
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="min-w-0 rounded-[22px] border border-hairline bg-background/70 p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[19px] font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              );
            })}
          </ul>
        </WaveSection>

        <WaveSteps
          eyebrow={tx("How it works", "Πώς λειτουργεί")}
          title={
            <>
              {tx("From sign-in to a plan in ", "Από τη σύνδεση σε πλάνο δράσης σε ")}
              <WaveAccent>{tx("three steps.", "τρία βήματα.")}</WaveAccent>
            </>
          }
          steps={[
            {
              n: "01",
              title: tx("Connect Google", "Συνδέστε τη Google"),
              body: tx(
                "Sign up with Google and approve read-only access. Every property your account can see is listed; pick where to start.",
                "Κάντε εγγραφή με Google και εγκρίνετε πρόσβαση μόνο για ανάγνωση. Εμφανίζονται όλοι οι ιστότοποι στους οποίους έχει πρόσβαση ο λογαριασμός σας· επιλέξτε από πού θα ξεκινήσετε.",
              ),
            },
            {
              n: "02",
              title: tx("Get your plan", "Πάρτε το πλάνο σας"),
              body: tx(
                "AnotherSEOGuru App analyzes your queries and pages, finds every opportunity and ranks the fixes by the clicks they could bring.",
                "Το AnotherSEOGuru App αναλύει τις αναζητήσεις και τις σελίδες σας, εντοπίζει κάθε ευκαιρία και ταξινομεί τις διορθώσεις με βάση τα κλικ που μπορούν να φέρουν.",
              ),
            },
            {
              n: "03",
              title: tx("Ship and measure", "Υλοποιήστε και μετρήστε"),
              body: tx(
                "Turn fixes into tasks, mark what you shipped on the chart and watch the result, or put it in a client report.",
                "Μετατρέψτε τις διορθώσεις σε εργασίες, σημειώστε στο γράφημα τι υλοποιήσατε και παρακολουθήστε το αποτέλεσμα ή βάλτε το σε μια αναφορά πελάτη.",
              ),
            },
          ]}
          actions={<WaveSoftwareActions locale={locale} source="platform-steps" />}
        />

        <WaveChoice locale={locale} source="platform-choice" />

        <WaveSection id="iphone" shot="iphone">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="min-w-0">
              <WaveEyebrow>{tx("New · iPhone app beta", "Νέο · εφαρμογή iPhone σε beta")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("Your fixes and traffic, ", "Οι διορθώσεις και η κίνησή σας, ")}
                <WaveAccent>{tx("on your iPhone", "στο iPhone")}</WaveAccent>
              </h2>
              <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted-foreground">
                {tx(
                  "A native iPhone app on the same account: this week's fixes, rank tracking, alerts, AI evidence, widgets and a live clicks tracker in the Dynamic Island.",
                  "Εγγενής εφαρμογή iPhone στον ίδιο λογαριασμό: οι διορθώσεις της εβδομάδας, θέσεις, ειδοποιήσεις, δεδομένα AI, widgets και ζωντανή εικόνα των κλικ στο Dynamic Island.",
                )}
              </p>
              <Link href={lp("/platform/iphone")} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-foreground">
                {tx("See the iPhone app", "Δείτε την εφαρμογή iPhone")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="grid min-w-0 grid-cols-3 items-end gap-3 sm:gap-5">
              {(["today", "serp-explorer", "ai-evidence"] as const).map((file, index) => (
                <div key={file} className={index === 1 ? "" : "translate-y-5"}>
                  <div className="overflow-hidden rounded-[1.6rem] border border-hairline bg-surface p-1">
                    <Image
                      src={`/images/iphone/${file}.webp`}
                      alt={tx("AnotherSEOGuru App iPhone app screen", "Οθόνη της εφαρμογής AnotherSEOGuru App για iPhone")}
                      width={601}
                      height={1306}
                      sizes="(min-width: 1024px) 190px, 30vw"
                      className="h-auto w-full rounded-[1.35rem]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WaveSection>

        <WaveSection id="places" shot="places" tinted>
          <WaveHeading
            eyebrow={tx("One account, the places you work", "Ένας λογαριασμός, εκεί που εργάζεστε")}
            title={
              <>
                {tx("Keep the question, the evidence and the ", "Κρατήστε μαζί την ερώτηση, τα στοιχεία και το ")}
                <WaveAccent>{tx("next step.", "επόμενο βήμα.")}</WaveAccent>
              </>
            }
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((card) => {
              const Icon = card.icon;
              return (
                <li key={card.name} className="min-w-0">
                  <Link href={card.href} className="flex h-full flex-col rounded-[22px] border border-hairline bg-background/70 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:hover:translate-y-0">
                    <Icon className="size-5 text-primary" aria-hidden />
                    <h3 className="mt-5 text-[18px] font-bold text-foreground">{card.name}</h3>
                    <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-muted-foreground">{card.detail}</p>
                    <p className="mt-5 text-[13px] font-semibold text-primary">{card.state}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </WaveSection>

        <WaveSection id="integrations" shot="integrations">
          <WaveHeading
            eyebrow={tx("New · One login everywhere", "Νέο · Ένας λογαριασμός παντού")}
            title={
              <>
                {tx("Also in Chrome, WordPress and ", "Και στο Chrome, στο WordPress και στους ")}
                <WaveAccent>{tx("your AI assistant", "βοηθούς AI")}</WaveAccent>
              </>
            }
            lead={tx(
              "An SEO extension for Chrome, a Search Console plugin for WordPress and an MCP server for Claude, ChatGPT and Cursor, all on the same account and in sync.",
              "Επέκταση SEO για Chrome, plugin Search Console για WordPress και MCP server για Claude, ChatGPT και Cursor, όλα στον ίδιο λογαριασμό και συγχρονισμένα.",
            )}
          />
          <IntegrationCards locale={locale} exclude="web" className="mt-12" />
          <Link href={lp(INTEGRATIONS_PATH)} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-foreground">
            {tx("See all integrations", "Δείτε όλες τις ενσωματώσεις")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </WaveSection>

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Simple plans. Credits only for ", "Απλά πακέτα. Μονάδες μόνο για ")}
                <WaveAccent>{tx("heavy lifting.", "τη βαριά δουλειά.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Search Console analysis, the opportunity engine and client reports never use credits. Credits cover third-party data and AI.",
              "Η ανάλυση Search Console, η μηχανή ευκαιριών και οι αναφορές πελατών δεν χρησιμοποιούν ποτέ μονάδες. Οι μονάδες καλύπτουν δεδομένα τρίτων και AI.",
            )}
          />
          <PlanPicker locale={locale} source="platform-plans" className="mt-10" />
          <p className="mt-10 text-center text-[14px]">
            <Link href={`${lp("/platform/pricing")}#compare`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-foreground">
              {tx("Compare every feature and credit cost", "Συγκρίνετε όλες τις λειτουργίες και το κόστος σε μονάδες")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </WaveSection>

        <WaveSection shot="personas">
          <WaveHeading
            align="center"
            eyebrow={tx("Who it’s for", "Για ποιους είναι")}
            title={
              <>
                {tx("The same software, framed around ", "Το ίδιο λογισμικό, στα μέτρα ")}
                <WaveAccent>{tx("your team.", "της ομάδας σας.")}</WaveAccent>
              </>
            }
          />
          <PersonaLinks locale={locale} className="mt-12" />
        </WaveSection>

        <WaveStats locale={locale} />
        <WaveAgencyDoor locale={locale} />
        <WaveFaq
          locale={locale}
          items={HOME_FAQ}
          title={
            <>
              {copy.faqTitleBefore}
              <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          lead={copy.faqLead}
        />
        <WaveClose
          locale={locale}
          source="platform-band"
          title={
            <>
              {tx("Your next wins are already in your data. ", "Οι επόμενες επιτυχίες σας κρύβονται ήδη στα δεδομένα σας. ")}
              <WaveAccent>{tx("Let’s find them.", "Ας τις βρούμε.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
