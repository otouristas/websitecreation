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
    title: { en: "SEO App for iPhone: AnotherSEOGuru App (Beta)", el: "Εφαρμογή SEO για iPhone: AnotherSEOGuru App" },
    description: {
      en: "Check which pages lost clicks, track your rankings and see this week’s SEO tasks on your iPhone. Request an invitation to the AnotherSEOGuru TestFlight beta.",
      el: "Δείτε στο iPhone σας ποιες σελίδες έχασαν κλικ, τις θέσεις σας στη Google και τις εργασίες SEO της εβδομάδας. Ζητήστε πρόσκληση για τη δοκιμαστική έκδοση.",
    },
    keyword: { en: "Search Console app for iPhone", el: "εφαρμογή Search Console για iPhone" },
  });
}

/** Real screens from the beta build, captured on an iPhone. */
const SCREENS: ReadonlyArray<{ file: string; title: Copy; caption: Copy }> = [
  {
    file: "today",
    title: c("Today", "Σήμερα"),
    caption: c("Compare clicks, impressions, click-through rate and average position with the previous 28 days.", "Συγκρίνετε τα κλικ, τις εμφανίσεις, το ποσοστό κλικ και τη μέση θέση με τις προηγούμενες 28 ημέρες."),
  },
  {
    file: "ranking-ladder",
    title: c("Ranking ladder", "Κλίμακα θέσεων"),
    caption: c("See how many searches put your site in the top 3, 10, 20 or 100 results.", "Δείτε σε πόσες αναζητήσεις η ιστοσελίδα σας εμφανίζεται στις πρώτες 3, 10, 20 ή 100 θέσεις."),
  },
  {
    file: "search-detail",
    title: c("Any search, in detail", "Κάθε αναζήτηση αναλυτικά"),
    caption: c("Choose a search to see which of your pages appear. Track your position or ask Aster AI about a change.", "Επιλέξτε μια αναζήτηση για να δείτε ποιες σελίδες σας εμφανίζονται. Παρακολουθήστε τη θέση σας ή ρωτήστε τον Aster AI γιατί άλλαξε."),
  },
  {
    file: "serp-explorer",
    title: c("Google search results", "Αποτελέσματα Google"),
    caption: c("Check today’s top ten results for a search and see how clicks are distributed.", "Δείτε ποιες δέκα σελίδες εμφανίζονται πρώτες στη Google και πώς μοιράζονται τα κλικ."),
  },
  {
    file: "ai-overview-cited",
    title: c("AI Overview check", "Έλεγχος AI Overview"),
    caption: c("Check whether Google’s AI Overview links to your site for a particular search.", "Δείτε αν η επισκόπηση AI της Google περιλαμβάνει σύνδεσμο προς την ιστοσελίδα σας για μια συγκεκριμένη αναζήτηση."),
  },
  {
    file: "traffic-acquisition",
    title: c("Traffic acquisition", "Πηγές επισκεψιμότητας"),
    caption: c("See where visits come from in Google Analytics 4. AI assistants are listed separately.", "Δείτε από πού ήρθαν οι επισκέπτες σας σύμφωνα με το Google Analytics 4. Οι επισκέψεις από βοηθούς AI εμφανίζονται ξεχωριστά."),
  },
  {
    file: "ai-evidence",
    title: c("AI mentions and visits", "Αναφορές και επισκέψεις από AI"),
    caption: c("See which AI answers mention your site and how many visits came from ChatGPT, Copilot, Perplexity or Gemini.", "Δείτε σε ποιες απαντήσεις AI αναφέρεται η ιστοσελίδα σας και πόσες επισκέψεις ήρθαν από ChatGPT, Copilot, Perplexity ή Gemini."),
  },
  {
    file: "keyword-research",
    title: c("Keyword research", "Έρευνα λέξεων-κλειδιών"),
    caption: c("Look up how often people search for a term, what they’re looking for and how demand changed over the last year.", "Δείτε πόσο συχνά αναζητά ο κόσμος έναν όρο, τι θέλει να βρει και πώς άλλαξε το ενδιαφέρον τον τελευταίο χρόνο."),
  },
  {
    file: "sign-in",
    title: c("Sign in", "Σύνδεση"),
    caption: c("Sign in with Apple, Google or email. To look around first, open the sample account.", "Συνδεθείτε με Apple, Google ή email. Για να δείτε πρώτα πώς λειτουργεί η εφαρμογή, ανοίξτε τον δοκιμαστικό λογαριασμό."),
  },
];

const FEATURES: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: ListChecks,
    title: c("Which page to work on", "Με ποια σελίδα να ξεκινήσετε"),
    text: c(
      "Find pages that have lost clicks or appear often but get few visits. An estimate of the extra clicks each change could bring helps you choose where to start.",
      "Δείτε ποιες σελίδες έχασαν κλικ ή εμφανίζονται συχνά αλλά δέχονται λίγες επισκέψεις. Η εφαρμογή εκτιμά πόσα επιπλέον κλικ θα μπορούσε να φέρει κάθε αλλαγή για να επιλέξετε από πού θα ξεκινήσετε.",
    ),
  },
  {
    icon: CheckCircle2,
    title: c("Results after an edit", "Τι απέδωσε μια αλλαγή"),
    text: c(
      "Record when you published a change. Compare clicks before and after over 14, 28 or 56 days to see whether they rose, stayed level or fell.",
      "Σημειώστε πότε δημοσιεύσατε την αλλαγή. Συγκρίνετε τα κλικ πριν και μετά, σε διάστημα 14, 28 ή 56 ημερών, για να δείτε αν αυξήθηκαν, έμειναν σταθερά ή μειώθηκαν.",
    ),
  },
  {
    icon: Bot,
    title: c("Ask Aster AI about a page", "Ρωτήστε τον Aster AI για μια σελίδα"),
    text: c(
      "Choose your site and ask about its Search Console figures. If the answer suggests a change you want to make, save it as a task.",
      "Επιλέξτε ιστοσελίδα και ρωτήστε για τα στοιχεία της στο Search Console. Αν θέλετε να δοκιμάσετε μια πρόταση του Aster AI, αποθηκεύστε τη ως εργασία.",
    ),
  },
  {
    icon: Target,
    title: c("Rank tracking", "Η θέση σας στη Google"),
    text: c(
      "See the latest daily position for each keyword you track in Search Console, its best position and how it moved this week.",
      "Για κάθε λέξη-κλειδί που παρακολουθείτε, δείτε την τελευταία ημερήσια θέση από το Search Console, την καλύτερη θέση της και πώς κινήθηκε την τελευταία εβδομάδα.",
    ),
  },
  {
    icon: Bell,
    title: c("Notifications you choose", "Εσείς επιλέγετε τις ειδοποιήσεις"),
    text: c(
      "Choose which tasks, approvals, reports or account updates you want to hear about. Set a daily or weekly summary, quiet hours and a daily limit. Allow notifications on your iPhone to receive them there.",
      "Επιλέξτε για ποιες εργασίες, εγκρίσεις, αναφορές ή αλλαγές λογαριασμού θέλετε ενημέρωση. Ορίστε καθημερινή ή εβδομαδιαία σύνοψη, ώρες ησυχίας και ημερήσιο όριο. Για να λαμβάνετε ειδοποιήσεις στο iPhone, επιτρέψτε τις στις ρυθμίσεις της συσκευής.",
    ),
  },
  {
    icon: Sparkles,
    title: c("Where AI mentions your site", "Πού σας αναφέρουν οι βοηθοί AI"),
    text: c(
      "See which AI answers mention your site, when Google includes it in an AI Overview and which assistants have sent visitors.",
      "Δείτε σε ποιες απαντήσεις AI αναφέρεται η ιστοσελίδα σας, πότε τη συμπεριλαμβάνει η Google στις επισκοπήσεις AI και ποιοι βοηθοί σάς έφεραν επισκέπτες.",
    ),
  },
  {
    icon: LayoutGrid,
    title: c("Home and Lock Screen widgets", "Widget για την αρχική οθόνη και την οθόνη κλειδώματος"),
    text: c(
      "See clicks and suggested fixes from your last saved report at a glance. Open the app to refresh the figures.",
      "Δείτε με μια ματιά τα κλικ και τις προτεινόμενες διορθώσεις από την τελευταία αποθηκευμένη αναφορά. Ανοίξτε την εφαρμογή για να ενημερωθούν τα στοιχεία.",
    ),
  },
  {
    icon: LineChart,
    title: c("Client reports", "Αναφορές για πελάτες"),
    text: c(
      "Open a client report you prepared on the web, check the version with your branding and email it from your phone.",
      "Ανοίξτε την αναφορά που ετοιμάσατε για τον πελάτη σας, ελέγξτε πώς φαίνεται με το λογότυπό σας και στείλτε τη με email από το κινητό.",
    ),
  },
  {
    icon: Languages,
    title: c("Language and display", "Γλώσσα και εμφάνιση"),
    text: c(
      "Your Greek or English language choice carries across to the web. Adjust the text size on iPhone or switch between light and dark appearance.",
      "Η επιλογή σας για ελληνικά ή αγγλικά ισχύει και στον υπολογιστή. Στο iPhone μπορείτε να αλλάξετε το μέγεθος των γραμμάτων και να επιλέξετε φωτεινή ή σκούρα εμφάνιση.",
    ),
  },
];

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("Is the AnotherSEOGuru iPhone app on the App Store?", "Είναι η εφαρμογή AnotherSEOGuru για iPhone στο App Store;"),
    a: c(
      "The current iPhone version is available by invitation through Apple’s TestFlight. Email us to request an invite.",
      "Η δοκιμαστική έκδοση για iPhone διατίθεται με πρόσκληση μέσω του TestFlight της Apple. Στείλτε μας email για να ζητήσετε πρόσβαση.",
    ),
  },
  {
    q: c("Do I need a separate subscription for the app?", "Χρειάζομαι ξεχωριστή συνδρομή για την εφαρμογή;"),
    a: c(
      "Your web plan covers the iPhone app. Sign in with the same account to see your projects and credits. Manage an existing subscription where you bought it. For plans offered through Apple, you’ll see the local price and renewal terms before you buy.",
      "Το πακέτο που έχετε στον υπολογιστή καλύπτει και το iPhone. Με τον ίδιο λογαριασμό βλέπετε τα έργα και τις μονάδες σας. Διαχειρίζεστε τη συνδρομή σας εκεί όπου την αγοράσατε. Αν επιλέξετε πακέτο μέσω της Apple, θα δείτε την τοπική τιμή και τους όρους ανανέωσης πριν από την αγορά.",
    ),
    link: { kind: "site", path: "/pricing", label: c("See the plans", "Δείτε τα πακέτα") },
  },
  {
    q: c("Does the app rank fixes the same way as the web app?", "Θα δω στο iPhone τις ίδιες προτάσεις που βλέπω στον υπολογιστή;"),
    a: c(
      "Yes. Open the same site on your iPhone or the web and you’ll see the same suggested fixes, in the same order.",
      "Ναι. Αν ανοίξετε την ίδια ιστοσελίδα στο iPhone και στον υπολογιστή, θα δείτε τις ίδιες προτεινόμενες διορθώσεις με την ίδια σειρά.",
    ),
  },
  {
    q: c("Which iPhones does it support?", "Ποια iPhone υποστηρίζει;"),
    a: c(
      "You can install it on an iPhone or iPad running version 17 or later. On version 26 and later, the app uses Apple’s Liquid Glass navigation.",
      "Σε iPhone χρειάζεστε iOS 17 ή νεότερη έκδοση και σε iPad, iPadOS 17 ή νεότερη έκδοση. Από την έκδοση 26 και μετά, η εφαρμογή χρησιμοποιεί την πλοήγηση Liquid Glass της Apple.",
    ),
  },
  {
    q: c("What access does it need to my Google data?", "Τι πρόσβαση χρειάζεται στα δεδομένα μου στη Google;"),
    a: c(
      "It requests read-only access to your Search Console and Analytics reports, just as it does on the web.",
      "Ζητά άδεια μόνο για ανάγνωση των αναφορών σας στο Search Console και στο Google Analytics, όπως και στον υπολογιστή.",
    ),
    link: { kind: "site", path: "/platform/security", label: c("How we handle your data", "Πώς διαχειριζόμαστε τα δεδομένα σας") },
  },
  {
    q: c("Can I try it without connecting a site?", "Μπορώ να τη δοκιμάσω χωρίς να συνδέσω ιστότοπο;"),
    a: c(
      "Yes. The app includes a sample workspace that works offline, so you can explore every screen before connecting Google.",
      "Ναι. Ανοίξτε τον δοκιμαστικό λογαριασμό για να δείτε τις αναφορές με ενδεικτικά δεδομένα. Λειτουργεί ακόμη και χωρίς σύνδεση στο διαδίκτυο.",
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
    isPartOf: { "@type": "SoftwareApplication", name: "AnotherSEOGuru App", url: `${BASE_URL}${localizedPath(locale, "/")}` },
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
              {tx("See how your site is doing on Google", "Δείτε πώς τα πάει η ιστοσελίδα σας στη Google")} <Accent>{tx("from your iPhone", "από το iPhone σας")}</Accent>
            </>
          }
          lead={tx(
            "Open a site to see which pages lost clicks and which changes are worth your time. Your tasks and Search Console figures are the same ones you use on the web. Request an invitation to try the iPhone beta.",
            "Ανοίξτε τον ιστότοπο που σας ενδιαφέρει και δείτε ποιες σελίδες έχασαν κλικ και ποιες αλλαγές αξίζει να εξετάσετε. Θα βρείτε τις ίδιες εργασίες και τα ίδια στοιχεία Search Console που βλέπετε στον υπολογιστή σας. Η δοκιμαστική έκδοση για iPhone διατίθεται με πρόσκληση.",
          )}
          actions={
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={BETA_HREF} className={kitPrimaryBtn}>
                <Mail className="size-4" aria-hidden />
                {tx("Request beta access", "Ζητήστε πρόσκληση για iPhone")}
              </a>
              <a href={webApp} className={kitSecondaryBtn}>
                {tx("Try the web app demo", "Δοκιμάστε την εφαρμογή στον browser")}
                <ArrowRight className="size-4 text-muted-foreground" />
              </a>
            </div>
          }
          trust={
            <TrustLine
              items={[
                { icon: Smartphone, label: tx("iOS 17+, iPhone and iPad", "iOS 17+, iPhone και iPad") },
                { icon: CheckCircle2, label: tx("Same account as the web app", "Ο ίδιος λογαριασμός με τον υπολογιστή") },
                { icon: Languages, label: tx("English and Greek", "Ελληνικά και αγγλικά") },
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

        <KitSection id="next-native-preview" tinted>
          <KitHeading eyebrow={tx("Coming to iPhone · Preview", "Έρχεται στο iPhone · Προεπισκόπηση")}
            title={tx("Where do your visitors come from?", "Από ποιες χώρες έρχονται οι επισκέπτες σας;")}
            description={tx("We’re working on a project setup screen and a map of your GA4 audience for the next iPhone release. Choose a country on the map or globe to see its sessions, active users and views.", "Για την επόμενη έκδοση ετοιμάζουμε νέα οθόνη ρυθμίσεων για κάθε έργο και χάρτη με το κοινό σας από το GA4. Επιλέγοντας χώρα στον χάρτη ή στην υδρόγειο θα βλέπετε τις συνεδρίες, τους ενεργούς χρήστες και τις προβολές από εκεί.")} />
        </KitSection>

        <KitSection id="screens">
          <KitHeading
            eyebrow={tx("Screens from the beta", "Στιγμιότυπα της δοκιμαστικής έκδοσης")}
            title={
              <>
                {tx("Your SEO reports,", "Οι αναφορές SEO σας")} <Accent>{tx("on your phone", "στο κινητό")}</Accent>
              </>
            }
            description={tx(
              "These screenshots come from the beta and show Search Console data for a real site.",
              "Τα στιγμιότυπα προέρχονται από τη δοκιμαστική έκδοση και δείχνουν στοιχεία μιας πραγματικής ιστοσελίδας από το Search Console.",
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
                {tx("Pick up where you left off", "Συνεχίστε στο iPhone")} <Accent>{tx("on your iPhone", "από εκεί που μείνατε")}</Accent>
              </>
            }
            description={tx(
              "When you’re away from your desk, you can still see which site needs attention, check a new alert or send a client their report.",
              "Ακόμη κι αν δεν είστε στον υπολογιστή, μπορείτε να δείτε ποια ιστοσελίδα χρειάζεται την προσοχή σας, να ανοίξετε μια ειδοποίηση ή να στείλετε σε πελάτη την αναφορά του.",
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
