import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
  Languages,
  LayoutGrid,
  LineChart,
  ListChecks,
  Mail,
  Smartphone,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, TrustLine, kitPrimaryBtn, kitSecondaryBtn } from "@/components/kit";
import { GscFaq, PlatformLinks, appLink, c, platformBreadcrumbs, platformMetadata, type Copy, type GscFaqItem } from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { BASE_URL, LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME, brandOrganization } from "@/lib/seo/schema";
import type { SchemaOutput } from "@/lib/types/seo";

/**
 * AnotherSEOGuru App for iPhone. The app is a native SwiftUI client on the same
 * backend as the web app (gsc-gemini-boost/ios/README.md). It is in TestFlight
 * beta, not on the App Store yet, so this page offers beta access and makes no
 * App Store claim. When it ships, swap BETA_HREF for the App Store URL and add
 * `downloadUrl` and `offers` to the schema.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = "/platform/iphone";
const SUPPORT_EMAIL = "support@anotherseoguru.com";
const BETA_HREF = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("iPhone beta access")}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "AnotherSEOGuru App for iPhone", el: "Εφαρμογή SEO για iPhone: AnotherSEOGuru App" },
    description: {
      en: "AnotherSEOGuru App on iPhone turns Google Search Console into this week's fixes, with rank tracking, alerts, AI evidence and widgets. In beta.",
      el: "Το AnotherSEOGuru App για iPhone κάνει τα δεδομένα του Search Console διορθώσεις της εβδομάδας, με θέσεις, ειδοποιήσεις, δεδομένα AI και widgets. Σε beta.",
    },
    keyword: { en: "Search Console app for iPhone", el: "εφαρμογή Search Console για iPhone" },
  });
}

/** Real screens from the beta build, captured on an iPhone. */
const SCREENS: ReadonlyArray<{ file: string; title: Copy; caption: Copy }> = [
  {
    file: "today",
    title: c("Today", "Σήμερα"),
    caption: c("Search health, clicks, impressions, CTR and position against the previous 28 days.", "Υγεία αναζήτησης, κλικ, εμφανίσεις, CTR και θέση σε σύγκριση με τις προηγούμενες 28 ημέρες."),
  },
  {
    file: "ranking-ladder",
    title: c("Ranking ladder", "Κλίμακα θέσεων"),
    caption: c("How many searches sit in the top 3, 10, 20 and 100, and what needs attention.", "Πόσες αναζητήσεις είναι στο top 3, 10, 20 και 100, και τι χρειάζεται προσοχή."),
  },
  {
    file: "search-detail",
    title: c("Any search, in detail", "Κάθε αναζήτηση αναλυτικά"),
    caption: c("Its trend, the pages ranking for it, and one tap to track rank or ask the assistant.", "Η πορεία της, οι σελίδες που κατατάσσονται και με ένα πάτημα παρακολούθηση θέσης ή ερώτηση στον βοηθό."),
  },
  {
    file: "serp-explorer",
    title: c("SERP explorer", "SERP explorer"),
    caption: c("The live Google top 10 for a search and who gets the clicks.", "Το ζωντανό top 10 της Google για μια αναζήτηση και ποιος παίρνει τα κλικ."),
  },
  {
    file: "ai-overview-cited",
    title: c("AI Overview check", "Έλεγχος AI Overview"),
    caption: c("See the AI Overview for a search and whether your site is cited in it.", "Δείτε το AI Overview μιας αναζήτησης και αν αναφέρεται ο ιστότοπός σας."),
  },
  {
    file: "traffic-acquisition",
    title: c("Traffic acquisition", "Πηγές επισκεψιμότητας"),
    caption: c("Google Analytics 4 sessions by channel, AI assistants counted separately.", "Συνεδρίες Google Analytics 4 ανά κανάλι, με τους βοηθούς AI χωριστά."),
  },
  {
    file: "ai-evidence",
    title: c("AI evidence", "Δεδομένα AI"),
    caption: c("Visits from ChatGPT, Copilot, Perplexity and Gemini, and mentions in AI answers.", "Επισκέψεις από ChatGPT, Copilot, Perplexity και Gemini, και αναφορές σε απαντήσεις AI."),
  },
  {
    file: "keyword-research",
    title: c("Keyword research", "Έρευνα λέξεων-κλειδιών"),
    caption: c("Volume, difficulty, CPC, intent and the 12-month trend for any keyword.", "Όγκος, δυσκολία, CPC, πρόθεση και η πορεία 12 μηνών για κάθε λέξη-κλειδί."),
  },
  {
    file: "sign-in",
    title: c("Sign in", "Σύνδεση"),
    caption: c("Sign in with Apple, Google or email, or explore the sample workspace first.", "Σύνδεση με Apple, Google ή email, ή εξερευνήστε πρώτα το δείγμα."),
  },
];

const FEATURES: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: ListChecks,
    title: c("This week's fixes", "Οι διορθώσεις της εβδομάδας"),
    text: c(
      "Striking-distance searches, low CTR, decaying pages, cannibalization and missing content, prioritized using estimated click opportunities. Estimates do not promise traffic.",
      "Αναζητήσεις κοντά στην πρώτη σελίδα, χαμηλό CTR, σελίδες σε πτώση, αλληλοεπικάλυψη και περιεχόμενο που λείπει, με προτεραιότητα βάσει εκτιμώμενων ευκαιριών για κλικ. Οι εκτιμήσεις δεν υπόσχονται κίνηση.",
    ),
  },
  {
    icon: CheckCircle2,
    title: c("Fix, ship, measure", "Διόρθωση, δημοσίευση, μέτρηση"),
    text: c(
      "Mark a task shipped and the app compares clicks before and after (14, 28 or 56 days), then calls it Won, Flat or Lost.",
      "Σημειώστε μια εργασία ως ολοκληρωμένη και η εφαρμογή συγκρίνει τα κλικ πριν και μετά (14, 28 ή 56 ημέρες) και τη χαρακτηρίζει Κέρδος, Σταθερή ή Απώλεια.",
    ),
  },
  {
    icon: Bot,
    title: c("Assistant on your data", "Βοηθός με τα δικά σας δεδομένα"),
    text: c(
      "Ask questions about the selected site's Search Console data; save any answer as a task.",
      "Κάντε ερωτήσεις για τα δεδομένα Search Console του ιστότοπου· αποθηκεύστε κάθε απάντηση ως εργασία.",
    ),
  },
  {
    icon: Target,
    title: c("Rank tracking", "Παρακολούθηση θέσεων"),
    text: c(
      "Your tracked keywords with the daily Google position from Search Console, best position and 7-day movement.",
      "Οι λέξεις-κλειδιά σας με την καθημερινή θέση στη Google από το Search Console, την καλύτερη θέση και την κίνηση 7 ημερών.",
    ),
  },
  {
    icon: Bell,
    title: c("Alerts and push", "Ειδοποιήσεις και push"),
    text: c(
      "Choose task, approval, report, conversation, payment and connection updates. Account preferences sync with web, with daily or weekly summaries, a chosen time zone, quiet hours and a daily cap. Device permission is separate.",
      "Επιλέξτε ενημερώσεις εργασιών, εγκρίσεων, αναφορών, συζητήσεων, πληρωμών και συνδέσεων. Οι προτιμήσεις συγχρονίζονται με το web: ημερήσια ή εβδομαδιαία σύνοψη, ζώνη ώρας, ώρες ησυχίας και ημερήσιο όριο. Η άδεια κάθε συσκευής είναι ξεχωριστή.",
    ),
  },
  {
    icon: Sparkles,
    title: c("AI visibility", "Ορατότητα σε AI"),
    text: c(
      "AI Overview citations, visits from AI assistants and mentions in AI answers, side by side.",
      "Αναφορές σε AI Overviews, επισκέψεις από βοηθούς AI και αναφορές σε απαντήσεις AI, δίπλα δίπλα.",
    ),
  },
  {
    icon: LayoutGrid,
    title: c("Widgets", "Widgets"),
    text: c(
      "Home and Lock Screen widgets show clicks and fixes from your last saved report. Open the app to refresh the source; the snapshot is not a live Google traffic feed.",
      "Widgets στην αρχική οθόνη και στην οθόνη κλειδώματος δείχνουν κλικ και διορθώσεις από την τελευταία αποθηκευμένη αναφορά. Ανοίξτε την εφαρμογή για ανανέωση· το στιγμιότυπο δεν είναι ζωντανή ροή κίνησης από τη Google.",
    ),
  },
  {
    icon: LineChart,
    title: c("Client reports", "Αναφορές πελατών"),
    text: c(
      "Preview the branded client report from the web app and email it from your phone.",
      "Προεπισκόπηση της επώνυμης αναφοράς πελάτη από την εφαρμογή web και αποστολή της με email από το κινητό.",
    ),
  },
  {
    icon: Languages,
    title: c("Greek and English", "Ελληνικά και Αγγλικά"),
    text: c(
      "Greek and English, synced with your web account, plus light/dark appearance and scalable text on iPhone.",
      "Ελληνικά και αγγλικά, συγχρονισμένα με τον λογαριασμό σας στο web, φωτεινή/σκούρα εμφάνιση και κείμενο που προσαρμόζεται στο iPhone.",
    ),
  },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Is the AnotherSEOGuru iPhone app on the App Store?", "Είναι η εφαρμογή AnotherSEOGuru για iPhone στο App Store;"),
    a: c(
      "Not yet. The app is in beta through Apple's TestFlight. Email us for beta access and we'll send you an invite; the App Store release follows the beta.",
      "Όχι ακόμη. Η εφαρμογή είναι σε beta μέσω του TestFlight της Apple. Στείλτε μας email για πρόσβαση και θα σας στείλουμε πρόσκληση· η κυκλοφορία στο App Store ακολουθεί μετά τη beta.",
    ),
  },
  {
    q: c("Do I need a separate subscription for the app?", "Χρειάζομαι ξεχωριστή συνδρομή για την εφαρμογή;"),
    a: c(
      "No. Use the same account on iPhone and app.anotherseoguru.com to keep your plan, projects and credits together. App Store plans, where offered, show Apple's local price and renewal terms before purchase. An existing web subscription stays managed by its original billing provider.",
      "Όχι. Χρησιμοποιήστε τον ίδιο λογαριασμό σε iPhone και app.anotherseoguru.com για κοινό πρόγραμμα, έργα και μονάδες. Όπου διατίθενται προγράμματα App Store, η τοπική τιμή και οι όροι ανανέωσης της Apple εμφανίζονται πριν την αγορά. Μια υπάρχουσα συνδρομή web παραμένει στον αρχικό πάροχο χρέωσης.",
    ),
    link: { kind: "site", path: "/platform/pricing", label: c("See the plans", "Δείτε τα πακέτα") },
  },
  {
    q: c("Does the app rank fixes the same way as the web app?", "Βγάζει η εφαρμογή τις ίδιες διορθώσεις με την εφαρμογή web;"),
    a: c(
      "Yes. The app's opportunity engine and its fix-ship-measure loop are ports of the web app's own code, so both rank the same fixes for the same site.",
      "Ναι. Ο μηχανισμός ευκαιριών και ο κύκλος διόρθωση-δημοσίευση-μέτρηση της εφαρμογής είναι μεταφορά του κώδικα της εφαρμογής web, οπότε και οι δύο βγάζουν τις ίδιες διορθώσεις για τον ίδιο ιστότοπο.",
    ),
  },
  {
    q: c("Which iPhones does it support?", "Ποια iPhone υποστηρίζει;"),
    a: c(
      "iPhone and iPad on iOS 17 or later. It is a native SwiftUI app, not a web view, with the Liquid Glass navigation on iOS 26 and later.",
      "iPhone και iPad με iOS 17 ή νεότερο. Είναι εγγενής εφαρμογή SwiftUI, όχι web view, με την πλοήγηση Liquid Glass στο iOS 26 και νεότερα.",
    ),
  },
  {
    q: c("What access does it need to my Google data?", "Τι πρόσβαση χρειάζεται στα δεδομένα μου στη Google;"),
    a: c(
      "The same read-only Search Console and Analytics access as the web app. It can read your data; it can't change anything in your Google account.",
      "Την ίδια πρόσβαση μόνο για ανάγνωση σε Search Console και Analytics με την εφαρμογή web. Μπορεί να διαβάσει τα δεδομένα σας· δεν μπορεί να αλλάξει τίποτα στον λογαριασμό σας Google.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
  {
    q: c("Can I try it without connecting a site?", "Μπορώ να τη δοκιμάσω χωρίς να συνδέσω ιστότοπο;"),
    a: c(
      "Yes. The app includes a sample workspace that works offline, so you can explore every screen before connecting Google.",
      "Ναι. Η εφαρμογή έχει ένα δείγμα χώρου εργασίας που λειτουργεί και χωρίς σύνδεση, ώστε να δείτε κάθε οθόνη πριν συνδέσετε τη Google.",
    ),
  },
];

function appSchema(locale: SiteLocale): SchemaOutput {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${BASE_URL}${PATH}#app`,
    name: "AnotherSEOGuru App for iPhone",
    alternateName: "AnotherSEOGuru for iPhone",
    description:
      locale === "el"
        ? "Εγγενής εφαρμογή iPhone για το AnotherSEOGuru App: διορθώσεις από το Google Search Console, παρακολούθηση θέσεων, ειδοποιήσεις και ορατότητα σε AI."
        : "Native iPhone app for AnotherSEOGuru App: fixes from Google Search Console, rank tracking, alerts and AI visibility.",
    url: `${BASE_URL}${localizedPath(locale, PATH)}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS 17 or later",
    inLanguage: ["en", "el"],
    releaseNotes: "Beta (TestFlight)",
    screenshot: SCREENS.map((s) => `${BASE_URL}/images/iphone/${s.file}.webp`),
    isPartOf: { "@type": "SoftwareApplication", name: "AnotherSEOGuru App", url: `${BASE_URL}${localizedPath(locale, "/platform")}` },
    provider: brandOrganization(),
    publisher: { "@type": "Organization", "@id": LEGAL_ENTITY_ID, name: LEGAL_ENTITY_NAME },
  };
}

function Phone({ file, alt, priority }: { readonly file: string; readonly alt: string; readonly priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-hairline bg-surface p-1.5 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--primary)_45%,transparent)]">
      <Image
        src={`/images/iphone/${file}.webp`}
        alt={alt}
        width={601}
        height={1306}
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 34vw, 68vw"
        priority={priority}
        className="h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}

export default async function PlatformIphonePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const webApp = appLink("/demo", locale, "iphone-hero");

  return (
    <>
      <SchemaMarkup schemas={[appSchema(locale), platformBreadcrumbs(locale, [{ name: tx("iPhone app", "Εφαρμογή iPhone"), path: PATH }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Smartphone />}>{tx("AnotherSEOGuru App for iPhone · Beta", "AnotherSEOGuru App για iPhone · Beta")}</KitEyebrow>}
          title={
            <>
              {tx("Search Console,", "Το Search Console,")} <Accent>{tx("in your pocket", "στην τσέπη σας")}</Accent>
            </>
          }
          lead={tx(
            "A native iPhone app for AnotherSEOGuru App. It turns your Google Search Console data into this week's fixes, ranked by the clicks each one is worth, then measures them after you ship.",
            "Εγγενής εφαρμογή iPhone για το AnotherSEOGuru App. Κάνει τα δεδομένα του Google Search Console διορθώσεις της εβδομάδας, με σειρά βάσει των κλικ που αξίζει η καθεμία, και τις μετρά αφού τις δημοσιεύσετε.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={BETA_HREF} className={kitPrimaryBtn}>
                <Mail className="size-4" aria-hidden />
                {tx("Request beta access", "Ζητήστε πρόσβαση στη beta")}
              </a>
              <a href={webApp} className={kitSecondaryBtn}>
                {tx("Try the web app demo", "Δοκιμάστε το demo στο web")}
                <ArrowRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: Smartphone, label: tx("iOS 17+, iPhone and iPad", "iOS 17+, iPhone και iPad") },
                { icon: CheckCircle2, label: tx("Same account as the web app", "Ίδιος λογαριασμός με το web") },
                { icon: Languages, label: tx("English and Greek", "Ελληνικά και Αγγλικά") },
              ]}
            />
          }
        >
          <Container className="mt-14 sm:mt-16">
            <div className="mx-auto grid max-w-4xl grid-cols-3 items-end gap-3 sm:gap-6">
              <div className="translate-y-6">
                <Phone file="ranking-ladder" alt={tx(SCREENS[1].caption.en, SCREENS[1].caption.el)} />
              </div>
              <Phone file="today" alt={tx(SCREENS[0].caption.en, SCREENS[0].caption.el)} priority />
              <div className="translate-y-6">
                <Phone file="ai-overview-cited" alt={tx(SCREENS[4].caption.en, SCREENS[4].caption.el)} />
              </div>
            </div>
          </Container>
        </HeroCentered>

        <KitSection id="screens">
          <KitHeading
            eyebrow={tx("Screens from the beta", "Οθόνες από τη beta")}
            title={
              <>
                {tx("Every report you open on desktop,", "Κάθε αναφορά που ανοίγετε στον υπολογιστή,")} <Accent>{tx("on your phone", "στο κινητό")}</Accent>
              </>
            }
            description={tx(
              "Real screens from the beta build, on a live Search Console property.",
              "Πραγματικές οθόνες από την έκδοση beta, σε ζωντανό ιστότοπο του Search Console.",
            )}
          />
          <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {SCREENS.map((s) => (
              <li key={s.file} className="w-[68vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none">
                <figure>
                  <Phone file={s.file} alt={s.caption[locale]} />
                  <figcaption className="mt-4 px-1">
                    <span className="block text-[15px] font-semibold text-foreground">{s.title[locale]}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{s.caption[locale]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </KitSection>

        <KitSection tinted id="features">
          <KitHeading
            eyebrow={tx("What's in the app", "Τι περιέχει η εφαρμογή")}
            title={
              <>
                {tx("The same engine as the web app,", "Ο ίδιος μηχανισμός με την εφαρμογή web,")} <Accent>{tx("built for iPhone", "φτιαγμένος για iPhone")}</Accent>
              </>
            }
            description={tx(
              "A native SwiftUI app on the same backend as app.anotherseoguru.com, so your sites, tasks, tracked keywords and alerts follow you.",
              "Εγγενής εφαρμογή SwiftUI στο ίδιο backend με το app.anotherseoguru.com, ώστε οι ιστότοποι, οι εργασίες, οι λέξεις-κλειδιά και οι ειδοποιήσεις σας να σας ακολουθούν.",
            )}
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title.en} className="bg-background p-6 sm:p-7">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-4 text-[16px] font-semibold text-foreground">{title[locale]}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{text[locale]}</p>
              </li>
            ))}
          </ul>
        </KitSection>

        <GscFaq locale={locale} items={FAQ} />
        <CtaBand locale={locale} source="iphone-band" />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
