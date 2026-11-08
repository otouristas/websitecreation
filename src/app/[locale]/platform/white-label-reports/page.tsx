import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, FileDown, FileText, Layers, Palette, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ReportPreview } from "@/components/kit";
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
import { AgencyPlanCard, PlatformLinks, appLink, c, gscBoostSoftwareSchema, platformBreadcrumbs, platformMetadata, planById, type GscFaqItem } from "@/components/gsc-boost";
import { resourcePath } from "@/data/resources";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * Product page for "white label seo reporting tool" and close variants. The
 * guide at /resources/white-label-seo-reports owns the informational head
 * term; this page is where a buyer lands, sees the report and signs up.
 * Every feature named here exists in the app's Reports screen
 * (gsc-gemini-boost src/features/reports): branding, sections, PDF, email
 * and weekly or monthly schedules, saved copies per client.
 */

type PageProps = { params: Promise<{ locale: string }> };
const PATH = "/platform/white-label-reports";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: PATH,
    title: { en: "White Label SEO Reporting Tool for Agencies", el: "Εργαλείο white-label αναφορών SEO" },
    description: {
      en: "White-label SEO reports from Google Search Console: your logo, your colours, PDF or scheduled email, for every client. No copy-pasting and no credits. Try it free.",
      el: "White-label αναφορές SEO από το Google Search Console: το λογότυπο και τα χρώματά σας, PDF ή προγραμματισμένο email, για κάθε πελάτη. Χωρίς copy-paste.",
    },
    keyword: { en: "white label seo reporting tool", el: "white label αναφορές seo" },
  });
}

const FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: c("What is a white-label SEO report?", "Τι είναι μια white-label αναφορά SEO;"),
    a: c(
      "A client report made in a tool but delivered entirely in your agency's brand: your logo, colours and name, with no mention of the software behind it. AnotherSEOGuru App builds it from the client's Google Search Console data, so the numbers match what the client can verify.",
      "Αναφορά πελάτη που φτιάχνεται σε ένα εργαλείο αλλά παραδίδεται εξ ολοκλήρου με το brand του agency σας: λογότυπο, χρώματα και όνομα, χωρίς αναφορά στο λογισμικό. Το AnotherSEOGuru App τη φτιάχνει από τα δεδομένα Google Search Console του πελάτη.",
    ),
  },
  {
    q: c("What does it cost?", "Πόσο κοστίζει;"),
    a: c(
      `White-label client reports are part of the Agency plan ($${planById("Agency").monthly} a month for ${planById("Agency").sites} sites and ${planById("Agency").seats} seats, two months free on yearly billing). Reports built from Search Console never use credits, so sending more reports does not cost more.`,
      `Οι white-label αναφορές πελατών ανήκουν στο πακέτο Agency ($${planById("Agency").monthly} τον μήνα για ${planById("Agency").sites} ιστοτόπους και ${planById("Agency").seats} χρήστες, δύο μήνες δώρο στην ετήσια χρέωση). Οι αναφορές από το Search Console δεν χρησιμοποιούν ποτέ μονάδες.`,
    ),
    link: { kind: "site", path: "/pricing", label: c("See all plans", "Δείτε όλα τα πακέτα") },
  },
  {
    q: c("Can I schedule reports to clients?", "Μπορώ να προγραμματίσω αποστολή στους πελάτες;"),
    a: c(
      "Yes. Email a report straight from the app, or schedule it to go out every Monday or once a month. The email shows the same numbers and sections as the report, and the PDF can be attached.",
      "Ναι. Στείλτε την αναφορά με email από την εφαρμογή ή προγραμματίστε την κάθε Δευτέρα ή μία φορά τον μήνα. Το email δείχνει τα ίδια νούμερα και τις ίδιες ενότητες, με το PDF συνημμένο.",
    ),
  },
  {
    q: c("Which sections can a report include?", "Ποιες ενότητες μπορεί να έχει μια αναφορά;"),
    a: c(
      "Summary with KPIs, organic clicks over time, ranking spread, devices and countries, top queries, top pages, wins and losses, opportunities, completed work, next steps, notes and Google Analytics sessions. Pick the ones each client reads.",
      "Σύνοψη με KPIs, οργανικά κλικ στον χρόνο, κατανομή θέσεων, συσκευές και χώρες, κορυφαίες αναζητήσεις και σελίδες, κέρδη και απώλειες, ευκαιρίες, εργασίες, επόμενα βήματα, σημειώσεις και συνεδρίες Google Analytics.",
    ),
    link: { kind: "site", path: "/resources/sample-seo-report", label: c("See a full sample report", "Δείτε ένα πλήρες δείγμα") },
  },
  {
    q: c("Do I need Looker Studio or a spreadsheet?", "Χρειάζομαι Looker Studio ή υπολογιστικό φύλλο;"),
    a: c(
      "No. Connect Google once with read-only access and every property your account can see is available. There are no connectors to maintain and no templates to rebuild when a field changes.",
      "Όχι. Συνδέετε τη Google μία φορά με πρόσβαση μόνο για ανάγνωση και κάθε ιδιότητα του λογαριασμού σας είναι διαθέσιμη. Δεν υπάρχουν connectors να συντηρείτε.",
    ),
  },
  {
    q: c("Can I try it before paying?", "Μπορώ να το δοκιμάσω πριν πληρώσω;"),
    a: c(
      "Yes. Every new account gets a 7-day free trial with no card, and the live demo opens the Reports screen on sample data with no sign-up at all.",
      "Ναι. Κάθε νέος λογαριασμός έχει 7 ημέρες δωρεάν δοκιμή χωρίς κάρτα, και η ζωντανή επίδειξη ανοίγει τις Αναφορές σε δείγμα δεδομένων χωρίς καμία εγγραφή.",
    ),
    link: { kind: "app", path: "/demo/reports", label: c("Open the demo", "Ανοίξτε το demo") },
  },
];

export default async function WhiteLabelReportsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);
  const yes = copy.markYes;
  const link = "font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-current";

  const rows: ReadonlyArray<[string, string, string]> = [
    [tx("Pulling the numbers", "Συλλογή νούμερων"), tx("Export from Search Console, paste into a sheet or deck", "Εξαγωγή από Search Console, επικόλληση σε φύλλο ή παρουσίαση"), tx("Live from Search Console, any date range", "Ζωντανά από το Search Console, για οποιοδήποτε διάστημα")],
    [tx("Comparisons", "Συγκρίσεις"), tx("Second export, manual formulas", "Δεύτερη εξαγωγή, χειροκίνητοι τύποι"), tx("Previous period or last year, one click", "Προηγούμενη περίοδος ή πέρσι, με ένα κλικ")],
    [tx("Why it changed", "Γιατί άλλαξε"), tx("Hunt through queries by hand", "Ψάξιμο στις αναζητήσεις με το χέρι"), tx("Wins and losses listed, opportunities sized in clicks", "Κέρδη και απώλειες έτοιμα, ευκαιρίες με εκτίμηση κλικ")],
    [tx("Branding", "Branding"), tx("Rebuild the template for every client", "Νέο πρότυπο για κάθε πελάτη"), tx("Set once: logo, colour, agency name", "Μία φορά: λογότυπο, χρώμα, όνομα agency")],
    [tx("Delivery", "Αποστολή"), tx("Export PDF, write the email, remember the date", "Εξαγωγή PDF, email, να θυμάστε την ημερομηνία"), tx("PDF, email or a weekly or monthly schedule", "PDF, email ή εβδομαδιαίο ή μηνιαίο πρόγραμμα")],
    [tx("Cost per extra report", "Κόστος ανά επιπλέον αναφορά"), tx("Your time, every month", "Ο χρόνος σας, κάθε μήνα"), tx("No credits: Search Console reports are free to run", "Χωρίς μονάδες: οι αναφορές Search Console δεν χρεώνονται")],
  ];

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, PATH),
          platformBreadcrumbs(locale, [{ name: tx("White-label SEO reports", "White-label αναφορές SEO"), path: PATH }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href="#sample" tag={tx("Agencies", "Agencies")} text={tx("White-label SEO reporting tool", "Εργαλείο white-label αναφορών SEO")} />}
          title={
            <>
              <span className="block">{tx("White-label SEO reports", "White-label αναφορές SEO")}</span>
              <span className="block">
                {tx("your clients ", "που οι πελάτες σας ")}
                <WaveAccent>{tx("actually read.", "πραγματικά διαβάζουν.")}</WaveAccent>
              </span>
            </>
          }
          lead={tx(
            "AnotherSEOGuru App turns each client's Google Search Console data into a monthly report under your logo: a clear summary, what changed and why, the work you shipped and what comes next. Download the PDF or schedule the email. No spreadsheets, no Looker Studio connectors, and Search Console reports never use credits.",
            "Το AnotherSEOGuru App μετατρέπει τα δεδομένα Google Search Console κάθε πελάτη σε μηνιαία αναφορά με το δικό σας λογότυπο: καθαρή σύνοψη, τι άλλαξε και γιατί, τι υλοποιήσατε και τι ακολουθεί. Κατεβάστε το PDF ή προγραμματίστε το email. Χωρίς υπολογιστικά φύλλα και χωρίς connectors, και οι αναφορές Search Console δεν χρεώνουν ποτέ μονάδες.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="white-label-hero" />}
          trust={<TrustMarks items={[tx("7-day free trial, no card", "7 ημέρες δωρεάν δοκιμή, χωρίς κάρτα"), tx("Read-only Google access", "Πρόσβαση στη Google μόνο για ανάγνωση"), tx("Cancel anytime", "Ακύρωση οποτεδήποτε")]} yesLabel={yes} />}
          panel={
            <a href={appLink("/demo/reports", locale, "white-label-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/reports"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx("A monthly client report built from Search Console, under the agency's brand.", "Μηνιαία αναφορά πελάτη από το Search Console, με το brand του agency.")}
              >
                <ReportPreview locale={locale} />
              </AppPanel>
            </a>
          }
          panelNote={
            <Link href={localizedPath(locale, "/resources/sample-seo-report")} className={link}>
              {tx("See a full sample report", "Δείτε ένα πλήρες δείγμα αναφοράς")}
            </Link>
          }
        />

        <WaveSection id="features" shot="features">
          <WaveHeading
            align="center"
            eyebrow={tx("What you get", "Τι παίρνετε")}
            title={
              <>
                {tx("Your brand on every page, ", "Το brand σας σε κάθε σελίδα, ")}
                <WaveAccent>{tx("ours on none.", "το δικό μας σε καμία.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Everything a client sees carries your agency's name. The data source stays visible, because “Source: Google Search Console” is what makes the numbers credible.",
              "Ό,τι βλέπει ο πελάτης φέρει το όνομα του agency σας. Η πηγή των δεδομένων μένει ορατή, γιατί το «Πηγή: Google Search Console» κάνει τα νούμερα αξιόπιστα.",
            )}
          />
          <CapabilityGrid
            yesLabel={yes}
            tiers={[
              {
                id: "brand",
                label: tx("Branding", "Branding"),
                items: [
                  {
                    key: "brand",
                    icon: <Palette className="size-5" aria-hidden />,
                    title: tx("Logo, colour and agency name", "Λογότυπο, χρώμα και όνομα agency"),
                    body: tx("Set your branding once and every report uses it. Add each client's logo next to yours.", "Ορίζετε το branding μία φορά και το χρησιμοποιεί κάθε αναφορά. Προσθέστε και το λογότυπο του πελάτη."),
                  },
                  {
                    key: "sections",
                    icon: <Layers className="size-5" aria-hidden />,
                    title: tx("Choose what each client sees", "Διαλέξτε τι βλέπει κάθε πελάτης"),
                    body: tx(
                      "Summary, KPIs, clicks trend, ranking spread, devices and countries, top queries and pages, wins and losses, opportunities, completed work, next steps and notes.",
                      "Σύνοψη, KPIs, εξέλιξη κλικ, κατανομή θέσεων, συσκευές και χώρες, αναζητήσεις και σελίδες, κέρδη και απώλειες, ευκαιρίες, εργασίες, επόμενα βήματα και σημειώσεις.",
                    ),
                  },
                ],
              },
              {
                id: "deliver",
                label: tx("Delivery", "Αποστολή"),
                items: [
                  {
                    key: "pdf",
                    icon: <FileDown className="size-5" aria-hidden />,
                    title: tx("Clean PDF", "Καθαρό PDF"),
                    body: tx("Download a PDF that prints cleanly, ready for the client portal or a monthly email.", "Κατεβάστε PDF που τυπώνεται καθαρά, έτοιμο για το portal ή το μηνιαίο email."),
                  },
                  {
                    key: "schedule",
                    icon: <CalendarClock className="size-5" aria-hidden />,
                    title: tx("Scheduled emails", "Προγραμματισμένα email"),
                    body: tx("Send now, or every Monday, or once a month. The email shows the same numbers and sections as the report.", "Αποστολή τώρα, κάθε Δευτέρα ή μία φορά τον μήνα. Το email δείχνει τα ίδια νούμερα με την αναφορά."),
                  },
                ],
              },
              {
                id: "scale",
                label: tx("Many clients", "Πολλοί πελάτες"),
                items: [
                  {
                    key: "saved",
                    icon: <FileText className="size-5" aria-hidden />,
                    title: tx("Saved reports per client", "Αποθηκευμένες αναφορές ανά πελάτη"),
                    body: tx("Every client keeps its own copies, so last quarter's report is one click away.", "Κάθε πελάτης κρατά τα δικά του αντίγραφα, οπότε η αναφορά του προηγούμενου τριμήνου απέχει ένα κλικ."),
                  },
                  {
                    key: "clients",
                    icon: <Users className="size-5" aria-hidden />,
                    title: tx("Client CRM and tasks next to the data", "CRM πελατών και εργασίες δίπλα στα δεδομένα"),
                    body: tx("Tasks you complete feed the “completed work” section, so the report writes half of itself.", "Οι εργασίες που ολοκληρώνετε περνούν στην ενότητα «εργασίες», οπότε η μισή αναφορά γράφεται μόνη της."),
                  },
                ],
              },
            ]}
          />
        </WaveSection>

        <WaveSection id="sample" shot="compare" tinted>
          <WaveHeading
            eyebrow={tx("Hours back every month", "Ώρες πίσω κάθε μήνα")}
            title={
              <>
                {tx("Manual reporting vs ", "Χειροκίνητες αναφορές έναντι ")}
                <WaveAccent>AnotherSEOGuru App.</WaveAccent>
              </>
            }
            lead={tx(
              "Most agencies spend an hour or more per client per month assembling reports. The app does the assembly; you write the three-sentence summary.",
              "Τα περισσότερα agencies ξοδεύουν μία ώρα ή περισσότερο ανά πελάτη τον μήνα για τις αναφορές. Η εφαρμογή κάνει τη συναρμολόγηση· εσείς γράφετε τη σύνοψη.",
            )}
          />
          <div className="mt-10 overflow-x-auto rounded-[22px] border border-hairline bg-background/80">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-hairline text-[13px] uppercase tracking-wide text-muted-foreground">
                  <th className="p-4 font-medium">{tx("Step", "Βήμα")}</th>
                  <th className="p-4 font-medium">{tx("Spreadsheets and decks", "Φύλλα και παρουσιάσεις")}</th>
                  <th className="p-4 font-medium text-primary">AnotherSEOGuru App</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([step, manual, app]) => (
                  <tr key={step} className="border-b border-hairline/70 last:border-0 align-top">
                    <td className="p-4 font-medium text-foreground">{step}</td>
                    <td className="p-4 text-muted-foreground">{manual}</td>
                    <td className="p-4 text-foreground">{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] text-muted-foreground">
            {tx("Want to see every section first? ", "Θέλετε να δείτε πρώτα κάθε ενότητα; ")}
            <Link href={localizedPath(locale, "/resources/sample-seo-report")} className={link}>
              {tx("Open the sample SEO report", "Ανοίξτε το δείγμα αναφοράς SEO")}
            </Link>
            {tx(" or read the ", " ή διαβάστε τον ")}
            <Link href={resourcePath("white-label-seo-reports", locale)} className={link}>
              {tx("white-label reporting guide", "οδηγό για white-label αναφορές")}
            </Link>
            .
          </p>
        </WaveSection>

        <WaveSteps
          shot="workflow"
          eyebrow={tx("How it works", "Πώς δουλεύει")}
          title={
            <>
              {tx("From Search Console to the client's inbox in ", "Από το Search Console στο inbox του πελάτη σε ")}
              <WaveAccent>{tx("four steps.", "τέσσερα βήματα.")}</WaveAccent>
            </>
          }
          steps={[
            { n: "01", title: tx("Connect", "Σύνδεση"), body: tx("Sign in with Google, read-only. Every property your account can see is ready.", "Σύνδεση με Google, μόνο για ανάγνωση. Κάθε ιδιότητα του λογαριασμού σας είναι έτοιμη.") },
            { n: "02", title: tx("Brand", "Branding"), body: tx("Add your logo, colour and agency name once.", "Προσθέστε λογότυπο, χρώμα και όνομα agency μία φορά.") },
            { n: "03", title: tx("Build", "Δημιουργία"), body: tx("Pick the client, the month and the sections. Write the summary.", "Διαλέξτε πελάτη, μήνα και ενότητες. Γράψτε τη σύνοψη.") },
            { n: "04", title: tx("Send", "Αποστολή"), body: tx("Download the PDF, email it, or schedule it monthly.", "Κατεβάστε το PDF, στείλτε το ή προγραμματίστε το μηνιαία.") },
          ]}
        />

        <WaveSection shot="plan">
          <div className="mb-8 flex justify-center">
            <WaveSoftwareActions locale={locale} source="white-label-plan" align="center" />
          </div>
          <AgencyPlanCard locale={locale} source="white-label-plan" />
        </WaveSection>

        <WaveFaq
          locale={locale}
          items={FAQ}
          title={
            <>
              {tx("White-label reporting, ", "White-label αναφορές, ")}
              <WaveAccent>{tx("answered.", "απαντήσεις.")}</WaveAccent>
            </>
          }
          lead={tx("Straight answers about branding, delivery and price.", "Ευθείες απαντήσεις για branding, αποστολή και τιμή.")}
        />

        <WaveClose
          locale={locale}
          source="white-label-band"
          title={
            <>
              {tx("Send your next client report ", "Στείλτε την επόμενη αναφορά πελάτη ")}
              <WaveAccent>{tx("in minutes.", "σε λίγα λεπτά.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current={PATH} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
