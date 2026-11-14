import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, FileUp, Gauge, LineChart, ListChecks, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { OpportunitiesPreview, PlanMini } from "@/components/kit";
import { homeCopy } from "@/components/pages/home/copy";
import { CapabilityGrid } from "@/components/pages/platform-wave/modules";
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveClose,
  WaveFaq,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveSoftwareActions,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import { PlatformLinks, appLink, c, gscBoostSoftwareSchema, platformBreadcrumbs, platformMetadata, type GscFaqItem } from "@/components/gsc-boost";
import { OPPORTUNITY_FINDER, resourcePath } from "@/data/resources";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

/**
 * Product page for "seo forecasting tool". The method lives on
 * /resources/seo-forecasting (owns "seo forecasting"); the free in-browser
 * version is /resources/search-console-opportunity-finder. This page sells
 * the app: the same forecast on every row, every week, measured after release.
 */

type PageProps = { params: Promise<{ locale: string }> };
const PATH = "/platform/seo-forecasting-tool";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "SEO Forecasting Tool from Search Console", el: "Εργαλείο πρόβλεψης SEO από το Search Console" },
    description: {
      en: "Forecast the extra clicks each SEO fix will earn, from your own Search Console positions and CTR. Conservative, expected and ceiling ranges. Free tool, no sign-up.",
      el: "Προβλέψτε τα επιπλέον κλικ κάθε διόρθωσης SEO από τις δικές σας θέσεις και το CTR στο Search Console. Συντηρητικό, αναμενόμενο και μέγιστο σενάριο.",
    },
    keyword: { en: "seo forecasting tool", el: "εργαλείο πρόβλεψης seo" },
  });
}

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("How does the SEO forecast work?", "Πώς λειτουργεί η πρόβλεψη SEO;"),
    a: c(
      "Bottom-up, from your own Search Console data. For each non-brand query it takes today's impressions, position and CTR, estimates the clicks at a realistic better position or with a better snippet, and subtracts the clicks you already get. CTR comes from your own curve where you have enough data, blended with a baseline where you do not.",
      "Από κάτω προς τα πάνω, από τα δικά σας δεδομένα Search Console. Για κάθε αναζήτηση χωρίς επωνυμία παίρνει εμφανίσεις, θέση και CTR, εκτιμά τα κλικ σε μια ρεαλιστικά καλύτερη θέση ή με καλύτερο snippet και αφαιρεί τα κλικ που ήδη έχετε.",
    ),
    link: { kind: "site", path: "/resources/seo-forecasting", label: c("Read the full method", "Διαβάστε τη μέθοδο") },
  },
  {
    q: c("Is there a free SEO forecasting tool?", "Υπάρχει δωρεάν εργαλείο πρόβλεψης SEO;"),
    a: c(
      "Yes. The Search Console opportunity finder runs the same striking-distance and low-CTR forecast on a Queries.csv export, in your browser, with no sign-up. It gives a conservative, expected and ceiling figure. The app does the same on up to 100,000 rows per period, straight from the API, every week.",
      "Ναι. Το εργαλείο ευκαιριών Search Console τρέχει την ίδια πρόβλεψη σε εξαγωγή Queries.csv, στον browser σας, χωρίς εγγραφή. Δίνει συντηρητικό, αναμενόμενο και μέγιστο νούμερο. Η εφαρμογή κάνει το ίδιο σε έως 100.000 γραμμές ανά περίοδο, κάθε εβδομάδα.",
    ),
    link: { kind: "site", path: `/resources/${OPPORTUNITY_FINDER.slug}`, label: c("Open the free tool", "Ανοίξτε το δωρεάν εργαλείο") },
  },
  {
    q: c("How accurate is an SEO forecast?", "Πόσο ακριβής είναι μια πρόβλεψη SEO;"),
    a: c(
      "It is a sizing tool, not a promise. Built from your real impressions and CTR it is far closer than a forecast built from keyword-tool volumes, but rankings depend on competitors and Google. That is why the forecast is a range, and why the app measures each change after you ship it so the next forecast learns from the last.",
      "Είναι εργαλείο εκτίμησης μεγέθους, όχι υπόσχεση. Επειδή βασίζεται στις πραγματικές σας εμφανίσεις και το CTR είναι πολύ πιο κοντά στην πραγματικότητα από προβλέψεις με όγκους αναζήτησης, αλλά οι θέσεις εξαρτώνται από ανταγωνιστές και Google. Γι' αυτό δίνεται ως εύρος.",
    ),
  },
  {
    q: c("Does forecasting cost credits?", "Η πρόβλεψη κοστίζει μονάδες;"),
    a: c(
      "No. Opportunities and click estimates are built from Search Console data, and Search Console features never use credits on any plan.",
      "Όχι. Οι ευκαιρίες και οι εκτιμήσεις κλικ βασίζονται στο Search Console, και οι δυνατότητες Search Console δεν χρησιμοποιούν ποτέ μονάδες σε κανένα πακέτο.",
    ),
    link: { kind: "site", path: "/pricing", label: c("See plans", "Δείτε τα πακέτα") },
  },
  {
    q: c("Can I show the forecast to clients?", "Μπορώ να δείξω την πρόβλεψη στους πελάτες;"),
    a: c(
      "Yes. Opportunities with their click estimates can go straight into the monthly client report, so the plan you propose and the result you report use the same numbers.",
      "Ναι. Οι ευκαιρίες με την εκτίμηση κλικ μπαίνουν απευθείας στη μηνιαία αναφορά πελάτη, ώστε το πλάνο και το αποτέλεσμα να χρησιμοποιούν τα ίδια νούμερα.",
    ),
    link: { kind: "site", path: "/platform/white-label-reports", label: c("White-label reports", "White-label αναφορές") },
  },
];

export default async function SeoForecastingToolPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);
  const yes = copy.markYes;
  const link = "font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-current";
  const finder = resourcePath(OPPORTUNITY_FINDER.slug, locale);

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, PATH),
          platformBreadcrumbs(locale, [{ name: tx("SEO forecasting tool", "Εργαλείο πρόβλεψης SEO"), path: PATH }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href={finder} tag={tx("Free", "Δωρεάν")} text={tx("Try the forecast on your export, no sign-up", "Δοκιμάστε την πρόβλεψη στην εξαγωγή σας, χωρίς εγγραφή")} />}
          title={
            <>
              {tx("Estimate how many extra clicks", "Πόσα επιπλέον κλικ θα μπορούσε")} <WaveAccent>{tx("an SEO change could bring", "να φέρει μια αλλαγή SEO;")}</WaveAccent>
            </>
          }
          lead={tx(
            "Should you rewrite a title or update a page that’s close to the top ten? AnotherSEOGuru App uses your Search Console impressions, position and click-through rate to estimate the monthly clicks at stake. Compare that estimate with the work involved before you choose.",
            "Να αλλάξετε τον τίτλο ή να βελτιώσετε μια σελίδα που πλησιάζει την πρώτη δεκάδα; Το AnotherSEOGuru App χρησιμοποιεί εμφανίσεις, θέσεις και CTR από το Search Console για να εκτιμήσει τα επιπλέον κλικ τον μήνα. Έτσι μπορείτε να σταθμίσετε το πιθανό όφελος και τη δουλειά που χρειάζεται κάθε αλλαγή.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="forecasting-hero" />}
          trust={<TrustMarks items={[tx("7-day free trial, no card", "7 ημέρες δωρεάν δοκιμή, χωρίς κάρτα"), tx("Read-only Google access", "Πρόσβαση στη Google μόνο για ανάγνωση"), tx("Cancel anytime", "Ακύρωση οποτεδήποτε")]} yesLabel={yes} />}
          panel={
            <a href={appLink("/demo/opportunities", locale, "forecasting-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/opportunities"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx("Opportunities with an estimate of extra monthly clicks.", "Ευκαιρίες με εκτίμηση επιπλέον μηνιαίων κλικ.")}
              >
                <OpportunitiesPreview locale={locale} />
              </AppPanel>
            </a>
          }
          panelNote={
            <Link href={finder} className={link}>
              {tx("Or run the free forecast on a Search Console export", "Ή τρέξτε τη δωρεάν πρόβλεψη σε εξαγωγή Search Console")}
            </Link>
          }
        />

        <WaveSection id="features" shot="features">
          <WaveHeading
            align="center"
            eyebrow={tx("Why it is different", "Γιατί διαφέρει")}
            title={
              <>
                {tx("How we estimate ", "Πώς εκτιμούμε ")}
                <WaveAccent>{tx("extra clicks", "τα επιπλέον κλικ")}</WaveAccent>
              </>
            }
            lead={tx(
              "The starting point is the number of times your page already appears for a search. Its position and click-through rate help estimate how much room there is to improve.",
              "Η εκτίμηση ξεκινά από τις εμφανίσεις που έχει ήδη η σελίδα σας για μια αναζήτηση. Η θέση της και το ποσοστό των εμφανίσεων που καταλήγουν σε κλικ δείχνουν πόσο περιθώριο βελτίωσης υπάρχει.",
            )}
          />
          <CapabilityGrid
            yesLabel={yes}
            tiers={[
              {
                id: "model",
                label: tx("The model", "Το μοντέλο"),
                items: [
                  {
                    key: "curve",
                    icon: <LineChart className="size-5" aria-hidden />,
                    title: tx("Your own CTR curve", "Η δική σας καμπύλη CTR"),
                    body: tx("Learned from your non-brand queries and blended with a baseline where a position has few rows.", "Μαθαίνεται από τις αναζητήσεις σας χωρίς επωνυμία και συνδυάζεται με βασική καμπύλη όπου υπάρχουν λίγα δεδομένα."),
                  },
                  {
                    key: "ranges",
                    icon: <BarChart3 className="size-5" aria-hidden />,
                    title: tx("Three honest scenarios", "Τρία ειλικρινή σενάρια"),
                    body: tx("Conservative, expected and ceiling, so you can promise the first and plan for the second.", "Συντηρητικό, αναμενόμενο και μέγιστο, ώστε να υπόσχεστε το πρώτο και να σχεδιάζετε με το δεύτερο."),
                  },
                ],
              },
              {
                id: "act",
                label: tx("From forecast to work", "Από την πρόβλεψη στη δουλειά"),
                items: [
                  {
                    key: "rank",
                    icon: <Target className="size-5" aria-hidden />,
                    title: tx("Ranked by impact and effort", "Σειρά βάσει αντίκτυπου και κόπου"),
                    body: tx("Striking-distance queries, low-CTR snippets, decaying pages and cannibalization, each with an estimate.", "Αναζητήσεις κοντά στην κορυφή, snippets με χαμηλό CTR, σελίδες σε πτώση και κανιβαλισμός, όλα με εκτίμηση."),
                  },
                  {
                    key: "tasks",
                    icon: <ListChecks className="size-5" aria-hidden />,
                    title: tx("One click to a task", "Ένα κλικ για εργασία"),
                    body: tx("Turn an opportunity into a task with its click estimate attached.", "Μετατρέψτε μια ευκαιρία σε εργασία με την εκτίμηση κλικ."),
                  },
                ],
              },
              {
                id: "learn",
                label: tx("Proof", "Απόδειξη"),
                items: [
                  {
                    key: "measure",
                    icon: <Gauge className="size-5" aria-hidden />,
                    title: tx("Measured after release", "Μέτρηση μετά την υλοποίηση"),
                    body: tx("Mark the day a change goes live and compare clicks before and after, so the forecast earns trust.", "Σημειώστε την ημέρα που βγαίνει live μια αλλαγή και συγκρίνετε τα κλικ πριν και μετά."),
                  },
                  {
                    key: "free",
                    icon: <FileUp className="size-5" aria-hidden />,
                    title: tx("Free version in the browser", "Δωρεάν έκδοση στον browser"),
                    body: tx("Upload a Queries.csv export to the opportunity finder. Nothing is uploaded to a server.", "Ανεβάστε εξαγωγή Queries.csv στο εργαλείο ευκαιριών. Τίποτα δεν φεύγει από τον browser."),
                  },
                ],
              },
            ]}
          />
        </WaveSection>

        <WaveSection shot="preview" tinted>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <WaveHeading
              eyebrow={tx("The size of the prize", "Το μέγεθος της ευκαιρίας")}
              title={
                <>
                  {tx("Know what a quarter of SEO ", "Ξέρετε τι μπορεί να φέρει ")}
                  <WaveAccent>{tx("could add.", "ένα τρίμηνο SEO.")}</WaveAccent>
                </>
              }
              lead={tx(
                "The plan view adds up every open opportunity into one number of extra monthly clicks, split by type. Use it to agree priorities with a client or a manager before the work starts.",
                "Η προβολή πλάνου αθροίζει κάθε ανοιχτή ευκαιρία σε ένα νούμερο επιπλέον μηνιαίων κλικ, ανά τύπο. Χρησιμοποιήστε το για να συμφωνήσετε προτεραιότητες πριν ξεκινήσει η δουλειά.",
              )}
            />
            <AppPanel url="app.anotherseoguru.com/demo" badge={tx("Sample data", "Δείγμα δεδομένων")} caption={tx("Open opportunities added up into one monthly figure.", "Οι ανοιχτές ευκαιρίες αθροισμένες σε ένα μηνιαίο νούμερο.")}>
              <div className="p-4">
                <PlanMini locale={locale} />
              </div>
            </AppPanel>
          </div>
        </WaveSection>

        <WaveSteps
          shot="workflow"
          eyebrow={tx("How it works", "Πώς δουλεύει")}
          title={
            <>
              {tx("From Search Console to a ", "Από το Search Console σε ")}
              <WaveAccent>{tx("forecast you can defend.", "πρόβλεψη που στέκει.")}</WaveAccent>
            </>
          }
          steps={[
            { n: "01", title: tx("Connect", "Σύνδεση"), body: tx("Sign in with Google, read-only.", "Σύνδεση με Google, μόνο για ανάγνωση.") },
            { n: "02", title: tx("Forecast", "Πρόβλεψη"), body: tx("Every non-brand query is checked and sized in extra clicks.", "Κάθε αναζήτηση χωρίς επωνυμία ελέγχεται και εκτιμάται σε επιπλέον κλικ.") },
            { n: "03", title: tx("Prioritise", "Προτεραιότητα"), body: tx("Work down the list, biggest return for the effort first.", "Δουλέψτε τη λίστα, με τη μεγαλύτερη απόδοση πρώτα.") },
            { n: "04", title: tx("Measure", "Μέτρηση"), body: tx("Compare before and after, and report it to the client.", "Συγκρίνετε πριν και μετά, και δείξτε το στον πελάτη.") },
          ]}
        />

        <WaveFaq
          locale={locale}
          items={FAQ}
          title={
            <>
              {tx("SEO forecasting, ", "Πρόβλεψη SEO, ")}
              <WaveAccent>{tx("answered.", "απαντήσεις.")}</WaveAccent>
            </>
          }
          lead={tx("How the forecast is built, how far to trust it and what it costs.", "Πώς φτιάχνεται η πρόβλεψη, πόσο να την εμπιστεύεστε και πόσο κοστίζει.")}
        />

        <WaveClose
          locale={locale}
          source="forecasting-band"
          title={
            <>
              {tx("Stop guessing what SEO ", "Σταματήστε να μαντεύετε τι θα ")}
              <WaveAccent>{tx("will bring.", "φέρει το SEO.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
