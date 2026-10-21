import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Command, FileBarChart, KanbanSquare, ListChecks, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { PipelinePreview, ReportPreview } from "@/components/kit";
import { homeCopy } from "@/components/pages/home/copy";
import { CapabilityGrid } from "@/components/pages/platform-wave/modules";
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveAccent,
  WaveAgencyDoor,
  WaveClose,
  WaveFaq,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveSoftwareActions,
  WaveStats,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import {
  AGENCY_FAQ,
  AgencyPlanCard,
  PersonaLinks,
  PlatformLinks,
  SiteSwitcherMini,
  appLink,
  platformBreadcrumbs,
  platformMetadata,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/for/agencies",
    title: { en: "SEO for Agencies: AnotherSEOGuru App", el: "AnotherSEOGuru App: λογισμικό SEO για agencies" },
    description: {
      en: "AnotherSEOGuru App for agencies: each client’s Search Console, a client CRM, pipeline, tasks and white-label reports in one workspace. Agency plan: 30 sites, 10 seats.",
      el: "AnotherSEOGuru App για agencies: το Search Console κάθε πελάτη, CRM, pipeline, εργασίες και white-label αναφορές σε έναν χώρο. Πακέτο Agency: 30 ιστότοποι, 10 χρήστες.",
    },
    keyword: { en: "SEO software for agencies", el: "λογισμικό SEO για agencies" },
  });
}

export default async function PlatformForAgenciesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);
  const yes = copy.markYes;

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For agencies", "Για agencies"), path: "/platform/for/agencies" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href="#capabilities" tag={tx("Agencies", "Agencies")} text={tx("AnotherSEOGuru App for agencies", "AnotherSEOGuru App για agencies")} />}
          title={
            <>
              <span className="block">{tx("Run every client’s SEO", "Διαχειριστείτε το SEO κάθε πελάτη")}</span>
              <span className="block">
                {tx("from ", "από ")}
                <WaveAccent>{tx("one workspace.", "έναν χώρο εργασίας.")}</WaveAccent>
              </span>
            </>
          }
          lead={tx(
            "AnotherSEOGuru App is SEO software built for agencies: a client CRM, deal pipeline, tasks and white-label reports, sitting next to each client’s Search Console data. Less time moving numbers between tools, more time doing the SEO.",
            "Το AnotherSEOGuru App είναι λογισμικό SEO φτιαγμένο για agencies: CRM πελατών, pipeline πωλήσεων, εργασίες και white-label αναφορές, ακριβώς δίπλα στα δεδομένα Search Console κάθε πελάτη. Λιγότερος χρόνος στη μεταφορά νούμερων από εργαλείο σε εργαλείο, περισσότερος χρόνος για το ίδιο το SEO.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="agencies-hero" />}
          trust={<TrustMarks items={copy.trust} yesLabel={yes} />}
          panel={
            <a href={appLink("/demo/pipeline", locale, "agencies-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/pipeline"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx(
                  "The agency pipeline: deals grouped by stage with monthly value and next step.",
                  "Το pipeline του agency: deals ανά στάδιο, με μηνιαία αξία και επόμενο βήμα.",
                )}
              >
                <PipelinePreview locale={locale} />
              </AppPanel>
            </a>
          }
          panelNote={
            <a href={appLink("/demo/pipeline", locale, "agencies-window-link")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
              {tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
            </a>
          }
        />

        <WaveSection id="capabilities" shot="capabilities">
          <WaveHeading
            align="center"
            eyebrow={tx("The agency workspace", "Ο χώρος εργασίας για agencies")}
            title={
              <>
                {tx("Clients, work and results, ", "Πελάτες, εργασίες και αποτελέσματα, ")}
                <WaveAccent>{tx("together.", "μαζί.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Everything an agency needs around the SEO itself, connected to the data it reports on.",
              "Ό,τι χρειάζεται ένα agency γύρω από το ίδιο το SEO, συνδεδεμένο με τα δεδομένα στα οποία βασίζονται οι αναφορές του.",
            )}
          />
          <CapabilityGrid
            yesLabel={yes}
            tiers={[
              {
                id: "clients",
                label: tx("Clients", "Πελάτες"),
                items: [
                  {
                    key: "crm",
                    icon: <Building2 className="size-5" aria-hidden />,
                    title: tx("Client CRM", "CRM πελατών"),
                    body: tx(
                      "Accounts, contacts, notes and the sites you manage for each client, kept in one record.",
                      "Λογαριασμοί, επαφές, σημειώσεις και οι ιστότοποι που διαχειρίζεστε για κάθε πελάτη, όλα σε μία καρτέλα.",
                    ),
                  },
                  {
                    key: "pipeline",
                    icon: <KanbanSquare className="size-5" aria-hidden />,
                    title: tx("Pipeline", "Pipeline"),
                    body: tx(
                      "Deals from first call to signed contract, with the value and next step on every card.",
                      "Deals από το πρώτο τηλεφώνημα μέχρι την υπογραφή του συμβολαίου, με την αξία και το επόμενο βήμα σε κάθε κάρτα.",
                    ),
                  },
                  {
                    key: "tasks",
                    icon: <ListChecks className="size-5" aria-hidden />,
                    title: tx("Tasks", "Εργασίες"),
                    body: tx(
                      "Every fix and follow-up in one list, linked to the client or the opportunity that created it.",
                      "Κάθε διόρθωση και follow-up σε μία λίστα, συνδεδεμένα με τον πελάτη ή την ευκαιρία από την οποία προέκυψαν.",
                    ),
                  },
                ],
              },
              {
                id: "reporting",
                label: tx("Reporting", "Αναφορές"),
                items: [
                  {
                    key: "reports",
                    icon: <FileBarChart className="size-5" aria-hidden />,
                    title: tx("White-label reports", "White-label αναφορές"),
                    body: tx(
                      "Each report shows what changed, what you shipped and what comes next, under your logo. It is built from live Search Console data, so it costs no credits and takes no copy-pasting.",
                      "Κάθε αναφορά δείχνει τι άλλαξε, τι υλοποιήσατε και τι ακολουθεί, με το δικό σας λογότυπο. Βασίζεται σε ζωντανά δεδομένα του Search Console, οπότε δεν κοστίζει μονάδες και δεν χρειάζεται copy-paste.",
                    ),
                    points: [
                      tx("Your logo and agency name, not ours", "Το λογότυπο και το όνομα του agency σας, όχι τα δικά μας"),
                      tx("Wins, KPIs with comparisons and next month’s plan", "Επιτυχίες, KPIs με συγκρίσεις και το πλάνο του επόμενου μήνα"),
                      tx("Prints cleanly or saves as PDF", "Καθαρή εκτύπωση ή αποθήκευση ως PDF"),
                    ],
                  },
                  {
                    key: "portal",
                    icon: <Send className="size-5" aria-hidden />,
                    title: tx("Portal-ready reporting", "Αναφορές έτοιμες για το portal"),
                    body: tx(
                      "Print or save any report as a PDF and drop it into your client portal or monthly email.",
                      "Τυπώστε ή αποθηκεύστε οποιαδήποτε αναφορά ως PDF και ανεβάστε τη στο portal πελατών ή στείλτε τη με το μηνιαίο email.",
                    ),
                  },
                ],
              },
              {
                id: "scale",
                label: tx("Scale", "Κλίμακα"),
                items: [
                  {
                    key: "switcher",
                    icon: <Command className="size-5" aria-hidden />,
                    title: tx("Built for 90+ properties", "Φτιαγμένο για 90+ ιδιότητες"),
                    body: tx(
                      "Every Search Console property your Google account can see is one keystroke away. Press ⌘K, type a few letters and you’re in that client’s data with your date range kept.",
                      "Κάθε ιδιότητά του Search Console στην οποία έχει πρόσβαση ο λογαριασμός σας Google απέχει ένα πλήκτρο. Πατήστε ⌘K, πληκτρολογήστε λίγα γράμματα και βρίσκεστε στα δεδομένα του πελάτη, με το ίδιο εύρος ημερομηνιών.",
                    ),
                    points: [
                      tx("Jump between properties with ⌘K. The switcher is built to stay fast with 90+ properties.", "Μεταβείτε από ιδιότητα σε ιδιότητα με ⌘K. Η εναλλαγή παραμένει γρήγορη ακόμη και με 90+ ιδιότητες."),
                    ],
                  },
                ],
              },
            ]}
          />
        </WaveSection>

        <WaveSection shot="previews" tinted>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="min-w-0">
              <WaveHeading eyebrow={tx("White-label reports", "White-label αναφορές")} title={<>{tx("Reports clients actually ", "Αναφορές που οι πελάτες πραγματικά ")}<WaveAccent>{tx("read.", "διαβάζουν.")}</WaveAccent></>} />
              <div className="mt-6">
                <AppPanel url="app.anotherseoguru.com/reports" badge={tx("Sample data", "Δείγμα δεδομένων")} caption={tx("A client report built from Search Console.", "Αναφορά πελάτη από το Search Console.")}>
                  <ReportPreview locale={locale} />
                </AppPanel>
              </div>
            </div>
            <div className="min-w-0">
              <WaveHeading eyebrow={tx("Many sites", "Πολλοί ιστότοποι")} title={<>{tx("One keystroke to the ", "Ένα πλήκτρο ως τα ")}<WaveAccent>{tx("next client.", "επόμενο πελάτη.")}</WaveAccent></>} />
              <div className="mt-6">
                <AppPanel url="app.anotherseoguru.com" badge={tx("Sample data", "Δείγμα δεδομένων")} caption={tx("Site switcher for many properties.", "Εναλλαγή πολλών ιδιοτήτων.")}>
                  <SiteSwitcherMini locale={locale} />
                </AppPanel>
              </div>
            </div>
          </div>
        </WaveSection>

        <WaveSteps
          shot="workflow"
          eyebrow={tx("Workflow", "Ροή εργασίας")}
          title={
            <>
              {tx("From opportunity to ", "Από την ευκαιρία στην ")}
              <WaveAccent>{tx("report.", "αναφορά.")}</WaveAccent>
            </>
          }
          steps={[
            {
              n: "01",
              title: tx("Find", "Εντοπισμός"),
              body: tx(
                "The opportunity engine flags a fix on a client’s site, with an estimated click impact.",
                "Η μηχανή ευκαιριών επισημαίνει μια διόρθωση στον ιστότοπο ενός πελάτη, με εκτίμηση των επιπλέον κλικ.",
              ),
            },
            {
              n: "02",
              title: tx("Assign", "Ανάθεση"),
              body: tx("Turn it into a task for that client with a priority and a due date.", "Μετατρέψτε τη σε εργασία για τον πελάτη, με προτεραιότητα και προθεσμία."),
            },
            {
              n: "03",
              title: tx("Ship", "Υλοποίηση"),
              body: tx(
                "Mark the change on the chart the day it goes live, so the effect is easy to see.",
                "Σημειώστε την αλλαγή στο γράφημα την ημέρα που βγαίνει live, ώστε το αποτέλεσμα να φαίνεται εύκολα.",
              ),
            },
            {
              n: "04",
              title: tx("Report", "Αναφορά"),
              body: tx("The monthly white-label report shows the result, in your branding.", "Η μηνιαία white-label αναφορά δείχνει το αποτέλεσμα, με το δικό σας branding."),
            },
          ]}
        />

        <WaveSection shot="plan">
          <div className="mb-8 flex justify-center">
            <WaveSoftwareActions locale={locale} source="agencies-workflow" align="center" />
          </div>
          <AgencyPlanCard locale={locale} source="agencies-plan" />
        </WaveSection>

        <WaveStats locale={locale} />
        <WaveAgencyDoor locale={locale} />
        <WaveFaq
          locale={locale}
          items={AGENCY_FAQ}
          title={
            <>
              {copy.faqTitleBefore}
              <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          lead={copy.faqLead}
        />

        <WaveSection shot="others">
          <WaveHeading align="center" title={tx("Not an agency?", "Δεν είστε agency;")} />
          <PersonaLinks locale={locale} exclude="/platform/for/agencies" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </WaveSection>

        <WaveClose
          locale={locale}
          source="agencies-band"
          title={
            <>
              {tx("Give your team one place to ", "Δώστε στην ομάδα σας ένα σημείο για να ")}
              <WaveAccent>{tx("work.", "δουλεύει.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/for/agencies" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
