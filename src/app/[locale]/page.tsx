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
import { TitleRecommendation } from "@/components/pages/home/TitleRecommendation";
import { homeCopy } from "@/components/pages/home/copy";
import { HOW_STEPS } from "@/data/value-explainer";
import { ProofStrip } from "@/components/pages/home/ProofStrip";
import { TieredModuleGrid } from "@/components/pages/platform-wave/modules";
import {
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveAgencyDoor,
  WaveChoice,
  WaveClose,
  WaveEyebrow,
  WaveFaq,
  WaveHeading,
  WaveSection,
  WaveSoftwareActions,
  WaveStats,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import {
  HOME_FAQ,
  INTEGRATIONS_PATH,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
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
  en: "SEO Software for Google Search Console | AnotherSEOGuru",
  el: "Εργαλεία SEO για το Google Search Console | AnotherSEOGuru",
} as const;

const PLATFORM_DESCRIPTION = {
  en: "Find pages that get seen on Google but rarely clicked. Ask Aster AI what to change, review the search data and track your edits in AnotherSEOGuru App.",
  el: "Δείτε ποιες σελίδες εμφανίζονται στη Google αλλά παίρνουν λίγα κλικ. Ο Aster AI προτείνει αλλαγές με βάση τα στοιχεία σας στο Search Console.",
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const metadata = platformMetadata({
    locale,
    path: "/",
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
      name: tx("Web app", "Εφαρμογή στο web"),
      detail: tx("Ask Aster AI about a page and keep the answer with your tasks and drafts.", "Ρωτήστε τον Aster AI για μια σελίδα και κρατήστε την απάντηση μαζί με τις εργασίες και τα προσχέδιά σας."),
      href: `${getAppPath("/demo/chat")}?lang=${locale}`,
      state: tx("Open the demo", "Ανοίξτε τη δοκιμαστική έκδοση"),
      icon: Globe,
    },
    {
      name: "iPhone",
      detail: tx("Check clicks and share a page with Aster AI while you’re away from your desk.", "Δείτε τα κλικ από το κινητό σας και στείλτε μια σελίδα στον Aster AI για έλεγχο."),
      href: lp("/platform/iphone"),
      state: tx("Join the TestFlight beta", "Δείτε πώς θα τη δοκιμάσετε μέσω TestFlight"),
      icon: Smartphone,
    },
    {
      name: "Android",
      detail: tx("The Android app is being prepared for release. It uses the same account and site data.", "Ετοιμάζουμε την εφαρμογή για Android. Θα έχετε πρόσβαση στα στοιχεία της ιστοσελίδας σας με τον ίδιο λογαριασμό."),
      href: lp("/platform/android"),
      state: tx("Android release details", "Πληροφορίες για την κυκλοφορία"),
      icon: Smartphone,
    },
    {
      name: "WordPress",
      detail: tx("Review a suggested title or description while you edit the page. You decide which changes to apply.", "Δείτε τον προτεινόμενο τίτλο ή την περιγραφή την ώρα που επεξεργάζεστε τη σελίδα. Εσείς επιλέγετε ποιες αλλαγές θα εφαρμόσετε."),
      href: lp("/platform/wordpress"),
      state: tx("See the WordPress plugin", "Δείτε το πρόσθετο για WordPress"),
      icon: Puzzle,
    },
    {
      name: tx("Chrome extension", "Επέκταση για Chrome"),
      detail: tx("Open a page in your browser and ask Aster AI about it while it’s in front of you.", "Ανοίξτε τη σελίδα που σας ενδιαφέρει και ρωτήστε τον Aster AI γι’ αυτήν απευθείας από το πρόγραμμα περιήγησης."),
      href: lp("/platform/chrome-extension"),
      state: tx("See the browser extension", "Δείτε πώς λειτουργεί η επέκταση"),
      icon: Puzzle,
    },
    {
      name: "MCP / API",
      detail: tx("Bring your Search Console reports into the AI assistant you already use. You choose what it can access.", "Δείτε τις αναφορές του Search Console μέσα στον βοηθό AI που χρησιμοποιείτε ήδη. Εσείς ορίζετε τα δικαιώματα πρόσβασης."),
      href: lp("/platform/mcp"),
      state: tx("See what you can connect", "Δείτε ποιες συνδέσεις υποστηρίζονται"),
      icon: Code2,
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={[gscBoostSoftwareSchema(locale)]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <section data-shot="hero" aria-labelledby="home-heading" className="hero-below-header relative isolate">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="kit-grid absolute inset-0 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_0%,black_30%,transparent_100%)]" />
            <div className="absolute -left-32 -top-52 size-[min(580px,80vw)] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-24 top-20 size-[min(500px,70vw)] rounded-full bg-signal/15 blur-3xl" />
          </div>
          <div className="mx-auto grid max-w-[1320px] items-start gap-y-5 px-5 pb-14 pt-2 sm:px-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-x-14 lg:gap-y-7 lg:pb-24 lg:pt-14">
            <div className="min-w-0">
              <h1 id="home-heading" className="text-balance font-display text-[2.15rem] font-bold leading-[1.04] tracking-[-0.045em] text-foreground sm:text-[3.25rem] lg:max-w-[13ch] lg:text-[clamp(3.5rem,4.65vw,4.5rem)]">
                {tx("Which page should you ", "Ποια σελίδα αξίζει να ")}
                <WaveAccent>{tx("fix first?", "βελτιώσετε πρώτα;")}</WaveAccent>
              </h1>
              <p className="mt-3 max-w-[48ch] text-pretty text-[16px] leading-relaxed text-muted-foreground lg:mt-5 lg:text-[19px]">
                {tx(
                  "Aster AI finds pages people see on Google but rarely click. See what to change and the searches behind each suggestion.",
                  "Ο Aster AI βρίσκει σελίδες που εμφανίζονται στη Google αλλά παίρνουν λίγα κλικ. Δείτε τι προτείνει να αλλάξετε και σε ποιες αναζητήσεις βασίζεται.",
                )}
              </p>
            </div>
            <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <TitleRecommendation locale={locale} />
            </div>
            <div className="min-w-0 lg:col-start-1 lg:row-start-2">
              <ChatDomainEntry locale={locale} />
              <div className="mt-6"><TrustMarks items={copy.trust} yesLabel={copy.markYes} /></div>
            </div>
          </div>
        </section>

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
          </div>
        </section>

        <section data-shot="aster" className="scroll-mt-28">
          <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
            <WaveHeading
              align="center"
              eyebrow="Aster AI"
              title={
                <>
                  {tx("What would Aster AI change ", "Τι θα άλλαζε ο Aster AI ")}
                  <WaveAccent>{tx("on this page?", "σε αυτή τη σελίδα;")}</WaveAccent>
                </>
              }
              lead={tx(
                "Pick a question about this fictional outdoor shop. Read the suggested edit and open the checks behind it.",
                "Διαλέξτε μια ερώτηση για το υποθετικό κατάστημα ειδών πεζοπορίας. Δείτε τι προτείνει ο Aster AI και ποια στοιχεία εξετάζει.",
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
              <WaveEyebrow>{tx("Inside AnotherSEOGuru App", "Στο AnotherSEOGuru App")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("What you can do with ", "Πώς μπορείτε να αξιοποιήσετε ")}
                <WaveAccent>{tx("your search data", "τα δεδομένα αναζήτησης")}</WaveAccent>
              </h2>
            </div>
            <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">
              {tx(
                "Investigate a drop in clicks, pick the next article to write or prepare a report for a client. Each tool works with the site you’ve selected.",
                "Δείτε γιατί μια σελίδα χάνει κλικ, βρείτε θέμα για το επόμενο άρθρο σας ή ετοιμάστε αναφορά για έναν πελάτη. Κάθε εργαλείο χρησιμοποιεί τα στοιχεία της ιστοσελίδας που έχετε επιλέξει.",
              )}
            </p>
          </div>
          <TieredModuleGrid locale={locale} source="platform-tour" ids={TOUR} />
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-[14px]">
            <Link href={lp("/platform/features")} className="font-semibold text-primary hover:text-foreground">
              {tx("Explore features and costs", "Δείτε τις λειτουργίες και το κόστος τους")} →
            </Link>
            <Link href={isEl ? "/el/pos-leitourgei" : "/en/how-it-works"} className="font-semibold text-primary hover:text-foreground">
              {tx("How it works", "Πώς λειτουργεί")} →
            </Link>
          </p>
        </WaveSection>

        <WaveSection shot="decisions" tinted>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div className="min-w-0">
              <WaveEyebrow>{tx("Google Search Console", "Google Search Console")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("A page can appear in hundreds of searches and ", "Μια σελίδα μπορεί να εμφανίζεται συχνά και να παίρνει ")}
                <WaveAccent>{tx("still get few clicks.", "ελάχιστα κλικ.")}</WaveAccent>
              </h2>
            </div>
            <p className="text-pretty text-[17px] leading-[1.7] text-muted-foreground">
              {tx(
                "AnotherSEOGuru App spots searches like these in your Google data. Open a suggestion to see the page, what people searched for and why a change may be worth your time.",
                "Το AnotherSEOGuru App εντοπίζει τέτοιες περιπτώσεις στο Search Console. Ανοίξτε μια πρόταση για να δείτε τη σελίδα, τι έψαχνε ο κόσμος και γιατί αξίζει να κάνετε μια αλλαγή.",
              )}
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <AppPanel url="search.google.com/search-console" badge={tx("Before", "Πριν")} caption={tx("Searches ordered by clicks", "Αναζητήσεις κατά αριθμό κλικ")}>
              <RawQueriesPanel locale={locale} />
            </AppPanel>
            <AppPanel url="app.anotherseoguru.com" badge={tx("After", "Μετά")} caption={tx("Suggested changes in priority order", "Προτεινόμενες αλλαγές με σειρά προτεραιότητας")}>
              <DecisionsPanel locale={locale} />
            </AppPanel>
          </div>
          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: tx("Decide where to spend your time", "Δείτε τι αξίζει τον χρόνο σας"),
                text: tx(
                  "Compare the estimated extra clicks with the effort each change takes. Start with a fix that fits the time you have.",
                  "Συγκρίνετε τα επιπλέον κλικ που εκτιμά η εφαρμογή με τη δουλειά που απαιτεί κάθε αλλαγή. Διαλέξτε τι μπορείτε να κάνετε αυτή την εβδομάδα.",
                ),
              },
              {
                icon: Calculator,
                title: tx("Check the estimate", "Δείτε πώς προκύπτει η εκτίμηση"),
                text: tx(
                  "See the page’s position and impressions, then compare its click-through rate with what’s typical for your own site at that position.",
                  "Δείτε τη θέση και τις εμφανίσεις της σελίδας. Συγκρίνετε το ποσοστό κλικ της με εκείνο που έχουν συνήθως οι δικές σας σελίδες στην ίδια θέση.",
                ),
              },
              {
                icon: ListChecks,
                title: tx("See what happened afterwards", "Παρακολουθήστε τι άλλαξε"),
                text: tx(
                  "Save a task and mark the day you published the change. The date appears on your chart and in your client report.",
                  "Αποθηκεύστε την πρόταση ως εργασία και σημειώστε πότε κάνατε την αλλαγή. Θα δείτε την ημερομηνία στο γράφημα και στην αναφορά για τον πελάτη σας.",
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
              {tx("Your first week with ", "Η πρώτη σας εβδομάδα με το ")}
              <WaveAccent>{tx("AnotherSEOGuru App", "AnotherSEOGuru App")}</WaveAccent>
            </>
          }
          steps={HOW_STEPS.map((step) => ({ n: step.n, title: tx(step.titleEn, step.titleEl), body: tx(step.bodyEn, step.bodyEl) }))}
          actions={<WaveSoftwareActions locale={locale} source="platform-steps" />}
        />

        <ProofStrip locale={locale} />

        <WaveChoice locale={locale} source="platform-choice" />

        <WaveSection id="iphone" shot="iphone">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="min-w-0">
              <WaveEyebrow>{tx("iPhone beta", "Δοκιμαστική έκδοση για iPhone")}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
                {tx("Check your site ", "Παρακολουθήστε την ιστοσελίδα σας ")}
                <WaveAccent>{tx("on your iPhone", "στο iPhone")}</WaveAccent>
              </h2>
              <p className="mt-4 text-pretty text-[17px] leading-relaxed text-muted-foreground">
                {tx(
                  "Open this week’s tasks and check your rankings with the account you already use on the web. Start a site audit and follow its progress from your Lock Screen.",
                  "Μπείτε με τον λογαριασμό που χρησιμοποιείτε στον υπολογιστή για να δείτε τις εργασίες της εβδομάδας και τις θέσεις σας στη Google. Ξεκινήστε έναν έλεγχο της ιστοσελίδας σας και παρακολουθήστε την πρόοδό του από την οθόνη κλειδώματος.",
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
                      alt={{
                        today: tx("Search clicks and pages to check in the iPhone app", "Κλικ από αναζητήσεις και σελίδες για έλεγχο στην εφαρμογή iPhone"),
                        "serp-explorer": tx("Top Google results for a search, shown on iPhone", "Τα πρώτα αποτελέσματα μιας αναζήτησης στη Google, στο iPhone"),
                        "ai-evidence": tx("Visits from AI assistants in the iPhone app", "Επισκέψεις από βοηθούς AI στην εφαρμογή iPhone"),
                      }[file]}
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
            eyebrow={tx("Access and availability", "Πρόσβαση και διαθεσιμότητα")}
            title={
              <>
                {tx("Where you can use ", "Πού μπορείτε να χρησιμοποιήσετε το ")}
                <WaveAccent>{tx("AnotherSEOGuru App", "AnotherSEOGuru App")}</WaveAccent>
              </>
            }
          />
          <ul id="integrations" data-shot="integrations" className="mt-12 scroll-mt-28 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <Link href={lp(INTEGRATIONS_PATH)} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-foreground">
            {tx("See all integrations", "Δείτε όλες τις διαθέσιμες συνδέσεις")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </WaveSection>

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Start with ", "Ξεκινήστε με ")}
                <WaveAccent>{tx("one site for free", "μία ιστοσελίδα δωρεάν")}</WaveAccent>
              </>
            }
            lead={tx(
              "Your plan covers Search Console analysis, suggested fixes and reports. You use credits for actions such as live rank checks and publishing to WordPress. Compare the plans by sites, features and monthly allowance.",
              "Η ανάλυση του Search Console, οι προτεινόμενες διορθώσεις και οι αναφορές περιλαμβάνονται στο πακέτο σας. Μονάδες χρησιμοποιείτε, για παράδειγμα, για να ελέγξετε τη σημερινή θέση μιας λέξης-κλειδιού ή να δημοσιεύσετε στο WordPress. Συγκρίνετε πόσες ιστοσελίδες, λειτουργίες και μονάδες καλύπτει κάθε πακέτο.",
            )}
          />
          <PlanPicker locale={locale} source="platform-plans" className="mt-10" />
          <p className="mt-10 text-center text-[14px]">
            <Link href={`${lp("/pricing")}#compare`} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-foreground">
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
                {tx("How does it fit ", "Πώς θα το χρησιμοποιήσει ")}
                <WaveAccent>{tx("your team?", "η ομάδα σας;")}</WaveAccent>
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
              {tx("See which pages ", "Δείτε ποιες σελίδες ")}
              <WaveAccent>{tx("need your attention.", "αξίζει να βελτιώσετε πρώτα.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
