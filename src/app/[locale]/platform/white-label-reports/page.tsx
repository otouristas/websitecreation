import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, FileDown, FileText, Layers, Palette, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Image from "next/image";
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
      en: "Build client SEO reports from Google Search Console, add your logo and download a PDF. Try the report builder with sample data or schedule a weekly or monthly email.",
      el: "Φτιάξτε αναφορές SEO για κάθε πελάτη από το Google Search Console, με το λογότυπό σας. Δείτε το δείγμα PDF και πώς προγραμματίζετε τις αποστολές με email.",
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
      `White-label branding is available as an add-on or included in the Agency plan ($${planById("Agency").monthly} a month for ${planById("Agency").sites} sites and ${planById("Agency").seats} seats, two months free on yearly billing). Reports built from Search Console never use credits, so sending more reports does not cost more.`,
      `Οι αναφορές με το λογότυπό σας διατίθενται ως πρόσθετο ή περιλαμβάνονται στο πακέτο Agency ($${planById("Agency").monthly} τον μήνα για ${planById("Agency").sites} ιστοτόπους και ${planById("Agency").seats} χρήστες, δύο μήνες δώρο στην ετήσια χρέωση). Οι αναφορές από το Search Console δεν χρησιμοποιούν ποτέ μονάδες.`,
    ),
    link: { kind: "site", path: "/pricing", label: c("See all plans", "Δείτε όλα τα πακέτα") },
  },
  {
    q: c("Can I schedule reports to clients?", "Μπορώ να προγραμματίσω αποστολή στους πελάτες;"),
    a: c(
      "Yes. Send a report now or schedule it every Monday for the last seven days of available data. Monthly reports go out on the fourth and cover the previous calendar month. Choose English or Greek for the email and its attached PDF.",
      "Ναι. Στείλτε την αναφορά αμέσως ή κάθε Δευτέρα για τις επτά τελευταίες ημέρες με διαθέσιμα στοιχεία. Οι μηνιαίες αναφορές αποστέλλονται στις 4 και καλύπτουν τον προηγούμενο ημερολογιακό μήνα. Επιλέγετε ελληνικά ή αγγλικά για το email και το συνημμένο PDF.",
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
      "Open the reports demo to see a sample before you sign up. A new account also includes a seven-day Pro trial without a card. White-label branding is included with Agency or available as an add-on.",
      "Δείτε μια ενδεικτική αναφορά στην επίδειξη χωρίς εγγραφή. Με νέο λογαριασμό μπορείτε επίσης να δοκιμάσετε το Pro για επτά ημέρες χωρίς κάρτα. Για αναφορές με τη δική σας επωνυμία, επιλέξτε το πακέτο Agency ή το αντίστοιχο πρόσθετο.",
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
              {tx("Send clients an SEO report", "Στείλτε στους πελάτες σας αναφορά SEO")} <WaveAccent>{tx("under your own name", "με το δικό σας λογότυπο")}</WaveAccent>
            </>
          }
          lead={tx(
            "Show your client which pages gained or lost clicks, what you worked on and what you recommend next. AnotherSEOGuru App pulls the figures from their Search Console account. Add your summary, then download the PDF or schedule the email.",
            "Δείξτε στον πελάτη ποιες σελίδες κέρδισαν ή έχασαν κλικ, τι βελτιώσατε και τι προτείνετε για τον επόμενο μήνα. Το AnotherSEOGuru App συγκεντρώνει τα στοιχεία από το Search Console του πελάτη. Προσθέστε τη σύνοψή σας και κατεβάστε την αναφορά σε PDF ή προγραμματίστε την αποστολή της με email.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="white-label-hero" demoPath="/demo/reports" />}
          trust={<TrustMarks items={[tx("7-day free trial, no card", "7 ημέρες δωρεάν δοκιμή, χωρίς κάρτα"), tx("Read-only Google access", "Πρόσβαση στη Google μόνο για ανάγνωση"), tx("Cancel anytime", "Ακύρωση οποτεδήποτε")]} yesLabel={yes} />}
          panel={
            <a href={appLink("/demo/reports", locale, "white-label-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/reports"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx("Open the Reports screen for Northwind Outdoors and try a PDF export.", "Ανοίξτε τις αναφορές της Northwind Outdoors και δοκιμάστε την εξαγωγή σε PDF.")}
              >
                <Image
                  src={`/images/reporting/client-report-${locale}.webp`}
                  width={1072}
                  height={675}
                  alt={tx("Report builder with the reporting period, selected client and a preview of the Northwind Outdoors report", "Επιλογή περιόδου και πελάτη με προεπισκόπηση της αναφοράς Northwind Outdoors")}
                  sizes="(min-width: 1024px) 48vw, 94vw"
                  priority
                  className="h-auto w-full"
                />
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
              "Your name and logo appear on the report, and the client can see which figures came from their own Search Console account.",
              "Η αναφορά φέρει το όνομα και το λογότυπό σας. Ο πελάτης βλέπει επίσης ότι τα στοιχεία προέρχονται από το δικό του Google Search Console.",
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
              "Choose the client and the reporting period. The app fills in the search figures so you can spend your time explaining the changes and the work planned for next month.",
              "Επιλέξτε πελάτη και χρονικό διάστημα. Η εφαρμογή συμπληρώνει τα στοιχεία αναζήτησης και εσείς εξηγείτε τις αλλαγές και τις προτεραιότητες του επόμενου μήνα.",
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
            <WaveSoftwareActions locale={locale} source="white-label-plan" demoPath="/demo/reports" align="center" />
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
