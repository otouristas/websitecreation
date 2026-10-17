import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Command, FileBarChart, KanbanSquare, ListChecks, Send, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  Accent,
  AppWindow,
  Container,
  CtaBand,
  FeatureRow,
  HeroCentered,
  KitEyebrow,
  KitHeading,
  KitSection,
  PipelinePreview,
  ReportPreview,
  SoftwareCtas,
  Stage,
  TrustLine,
  softwareTrust,
} from "@/components/kit";
import {
  AGENCY_FAQ,
  AgencyCrossSell,
  AgencyPlanCard,
  GscFaq,
  PersonaLinks,
  PlatformLinks,
  SiteSwitcherMini,
  appLink,
  platformBreadcrumbs,
  platformMetadata,
  type Copy,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/for/agencies",
    title: { en: "SEO Platform for Agencies: GSC Boost", el: "GSC Boost: λογισμικό SEO για agencies" },
    description: {
      en: "GSC Boost for agencies: each client’s Search Console, a client CRM, pipeline, tasks and white-label reports in one workspace. Agency plan: 30 sites, 10 seats.",
      el: "GSC Boost για agencies: το Search Console κάθε πελάτη, CRM, pipeline, εργασίες και white-label αναφορές σε έναν χώρο. Πακέτο Agency: 30 ιστότοποι, 10 χρήστες.",
    },
    keyword: { en: "SEO software for agencies", el: "λογισμικό SEO για agencies" },
  });
}

const FEATURES: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: Building2,
    title: { en: "Client CRM", el: "CRM πελατών" },
    text: {
      en: "Accounts, contacts, notes and the sites you manage for each client, kept in one record.",
      el: "Λογαριασμοί, επαφές, σημειώσεις και οι ιστότοποι που διαχειρίζεστε για κάθε πελάτη, όλα σε μία καρτέλα.",
    },
  },
  {
    icon: KanbanSquare,
    title: { en: "Pipeline", el: "Pipeline" },
    text: {
      en: "Deals from first call to signed contract, with the value and next step on every card.",
      el: "Deals από το πρώτο τηλεφώνημα μέχρι την υπογραφή του συμβολαίου, με την αξία και το επόμενο βήμα σε κάθε κάρτα.",
    },
  },
  {
    icon: ListChecks,
    title: { en: "Tasks", el: "Εργασίες" },
    text: {
      en: "Every fix and follow-up in one list, linked to the client or the opportunity that created it.",
      el: "Κάθε διόρθωση και follow-up σε μία λίστα, συνδεδεμένα με τον πελάτη ή την ευκαιρία από την οποία προέκυψαν.",
    },
  },
  {
    icon: FileBarChart,
    title: { en: "White-label reports", el: "White-label αναφορές" },
    text: {
      en: "Client-ready reports with your logo and name, built from Search Console data at 0 credits.",
      el: "Αναφορές έτοιμες για τον πελάτη, με το λογότυπο και το όνομά σας, από δεδομένα του Search Console με 0 μονάδες.",
    },
  },
  {
    icon: Command,
    title: { en: "Multi-site switching", el: "Εναλλαγή πολλών ιστοτόπων" },
    text: {
      en: "Jump between properties with ⌘K. The switcher is built to stay fast with 90+ properties.",
      el: "Μεταβείτε από ιδιότητα σε ιδιότητα με ⌘K. Η εναλλαγή παραμένει γρήγορη ακόμη και με 90+ ιδιότητες.",
    },
  },
  {
    icon: Send,
    title: { en: "Portal-ready reporting", el: "Αναφορές έτοιμες για το portal" },
    text: {
      en: "Print or save any report as a PDF and drop it into your client portal or monthly email.",
      el: "Τυπώστε ή αποθηκεύστε οποιαδήποτε αναφορά ως PDF και ανεβάστε τη στο portal πελατών ή στείλτε τη με το μηνιαίο email.",
    },
  },
];

const WORKFLOW: ReadonlyArray<{ title: Copy; text: Copy }> = [
  {
    title: { en: "Find", el: "Εντοπισμός" },
    text: {
      en: "The opportunity engine flags a fix on a client’s site, with an estimated click impact.",
      el: "Η μηχανή ευκαιριών επισημαίνει μια διόρθωση στον ιστότοπο ενός πελάτη, με εκτίμηση των επιπλέον κλικ.",
    },
  },
  {
    title: { en: "Assign", el: "Ανάθεση" },
    text: { en: "Turn it into a task for that client with a priority and a due date.", el: "Μετατρέψτε τη σε εργασία για τον πελάτη, με προτεραιότητα και προθεσμία." },
  },
  {
    title: { en: "Ship", el: "Υλοποίηση" },
    text: {
      en: "Mark the change on the chart the day it goes live, so the effect is easy to see.",
      el: "Σημειώστε την αλλαγή στο γράφημα την ημέρα που βγαίνει live, ώστε το αποτέλεσμα να φαίνεται εύκολα.",
    },
  },
  {
    title: { en: "Report", el: "Αναφορά" },
    text: { en: "The monthly white-label report shows the result, in your branding.", el: "Η μηνιαία white-label αναφορά δείχνει το αποτέλεσμα, με το δικό σας branding." },
  },
];

/** GSC Boost for agencies, adapted from the app's AgenciesPage. */
export default async function PlatformForAgenciesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For agencies", "Για agencies"), path: "/platform/for/agencies" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Building2 />}>{tx("GSC Boost for agencies", "GSC Boost για agencies")}</KitEyebrow>}
          title={
            <>
              {tx("Run every client’s SEO from", "Διαχειριστείτε το SEO κάθε πελάτη από")} <Accent>{tx("one workspace", "έναν χώρο εργασίας")}</Accent>
            </>
          }
          lead={tx(
            "GSC Boost is SEO software built for agencies: a client CRM, deal pipeline, tasks and white-label reports, sitting next to each client’s Search Console data. Less time moving numbers between tools, more time doing the SEO.",
            "Το GSC Boost είναι λογισμικό SEO φτιαγμένο για agencies: CRM πελατών, pipeline πωλήσεων, εργασίες και white-label αναφορές, ακριβώς δίπλα στα δεδομένα Search Console κάθε πελάτη. Λιγότερος χρόνος στη μεταφορά νούμερων από εργαλείο σε εργαλείο, περισσότερος χρόνος για το ίδιο το SEO.",
          )}
          actions={<SoftwareCtas locale={locale} source="agencies-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <div className="mx-auto mt-14 w-full max-w-[1180px] px-3 sm:px-6">
            <AppWindow
              url="app.anotherseoguru.com/demo/pipeline"
              href={appLink("/demo/pipeline", locale, "agencies-window")}
              ctaLabel={tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
              label={tx(
                "The agency pipeline: deals grouped by stage with monthly value and next step.",
                "Το pipeline του agency: deals ανά στάδιο, με μηνιαία αξία και επόμενο βήμα.",
              )}
              badge={
                <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {tx("Sample data", "Δείγμα δεδομένων")}
                </span>
              }
            >
              <div className="p-3 sm:p-6">
                <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
                  <div>
                    <div className="text-[18px] font-semibold tracking-[-0.02em] text-foreground sm:text-[20px]">Pipeline</div>
                    <div className="mt-0.5 text-[12px] text-muted-foreground sm:text-[13px]">{tx("Deals from lead to signed", "Deals από το lead μέχρι την υπογραφή")}</div>
                  </div>
                  <span className="hidden h-8 items-center rounded-md bg-foreground px-3 text-[12px] font-medium text-background sm:inline-flex">
                    {tx("New deal", "Νέα συμφωνία")}
                  </span>
                </div>
                <PipelinePreview locale={locale} />
              </div>
            </AppWindow>
          </div>
        </HeroCentered>

        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx("The agency workspace", "Ο χώρος εργασίας για agencies")}
            title={
              <>
                {tx("Clients, work and results,", "Πελάτες, εργασίες και αποτελέσματα,")} <Accent>{tx("together", "μαζί")}</Accent>
              </>
            }
            description={tx(
              "Everything an agency needs around the SEO itself, connected to the data it reports on.",
              "Ό,τι χρειάζεται ένα agency γύρω από το ίδιο το SEO, συνδεδεμένο με τα δεδομένα στα οποία βασίζονται οι αναφορές του.",
            )}
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
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

        <KitSection tinted>
          <KitHeading
            align="center"
            eyebrow={tx("Workflow", "Ροή εργασίας")}
            title={
              <>
                {tx("From opportunity to", "Από την ευκαιρία στην")} <Accent>{tx("report", "αναφορά")}</Accent>
              </>
            }
          />
          <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-hairline md:block" />
            {WORKFLOW.map((step, i) => (
              <li key={step.title.en} className="reveal relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface font-mono text-[13px] font-medium text-brand">
                  {i + 1}
                </span>
                <div className="md:mt-5">
                  <h3 className="text-[16px] font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-1.5 max-w-[240px] text-[14.5px] leading-relaxed text-muted-foreground">{step.text[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
          <SoftwareCtas locale={locale} source="agencies-workflow" className="mt-14" />
        </KitSection>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-24 sm:gap-28">
            <FeatureRow
              eyebrow={tx("White-label reports", "White-label αναφορές")}
              eyebrowIcon={<FileBarChart />}
              title={
                <>
                  {tx("Reports clients actually", "Αναφορές που οι πελάτες πραγματικά")} <Accent>{tx("read", "διαβάζουν")}</Accent>
                </>
              }
              body={tx(
                "Each report shows what changed, what you shipped and what comes next, under your logo. It is built from live Search Console data, so it costs no credits and takes no copy-pasting.",
                "Κάθε αναφορά δείχνει τι άλλαξε, τι υλοποιήσατε και τι ακολουθεί, με το δικό σας λογότυπο. Βασίζεται σε ζωντανά δεδομένα του Search Console, οπότε δεν κοστίζει μονάδες και δεν χρειάζεται copy-paste.",
              )}
              bullets={[
                tx("Your logo and agency name, not ours", "Το λογότυπο και το όνομα του agency σας, όχι τα δικά μας"),
                tx("Wins, KPIs with comparisons and next month’s plan", "Επιτυχίες, KPIs με συγκρίσεις και το πλάνο του επόμενου μήνα"),
                tx("Prints cleanly or saves as PDF", "Καθαρή εκτύπωση ή αποθήκευση ως PDF"),
              ]}
              preview={
                <Stage>
                  <ReportPreview locale={locale} />
                </Stage>
              }
            />
            <FeatureRow
              flip
              eyebrow={tx("Many sites", "Πολλοί ιστότοποι")}
              eyebrowIcon={<Command />}
              title={
                <>
                  {tx("Built for", "Φτιαγμένο για")} <Accent>{tx("90+ properties", "90+ ιδιότητες")}</Accent>
                </>
              }
              body={tx(
                "Every Search Console property your Google account can see is one keystroke away. Press ⌘K, type a few letters and you’re in that client’s data with your date range kept.",
                "Κάθε ιδιότητα του Search Console στην οποία έχει πρόσβαση ο λογαριασμός σας Google απέχει ένα πλήκτρο. Πατήστε ⌘K, πληκτρολογήστε λίγα γράμματα και βρίσκεστε στα δεδομένα του πελάτη, με το ίδιο εύρος ημερομηνιών.",
              )}
              preview={
                <Stage>
                  <SiteSwitcherMini locale={locale} />
                </Stage>
              }
            />
          </Container>
        </section>

        <KitSection className="border-t border-hairline">
          <div className="reveal">
            <AgencyPlanCard locale={locale} source="agencies-plan" />
          </div>
        </KitSection>

        <AgencyCrossSell locale={locale} />
        <GscFaq locale={locale} items={AGENCY_FAQ} />

        <KitSection className="border-t border-hairline">
          <KitHeading align="center" title={tx("Not an agency?", "Δεν είστε agency;")} />
          <PersonaLinks locale={locale} exclude="/platform/for/agencies" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </KitSection>

        <CtaBand
          locale={locale}
          source="agencies-band"
          title={
            <>
              {tx("Give your team one place to", "Δώστε στην ομάδα σας ένα σημείο για να")} <Accent>{tx("work", "δουλεύει")}</Accent>.
            </>
          }
          description={tx(
            "Connect Google once, read-only, and bring every client’s site into one workspace.",
            "Συνδέστε τη Google μία φορά, μόνο για ανάγνωση, και φέρτε τον ιστότοπο κάθε πελάτη σε έναν χώρο εργασίας.",
          )}
        />
        <PlatformLinks locale={locale} current="/platform/for/agencies" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
