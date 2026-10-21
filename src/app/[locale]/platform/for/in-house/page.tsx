import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineChart, ListChecks, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { OpportunitiesPreview } from "@/components/kit";
import { homeCopy } from "@/components/pages/home/copy";
import { CapabilityGrid, TieredModuleGrid } from "@/components/pages/platform-wave/modules";
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
  HOME_FAQ,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  appLink,
  planById,
  platformBreadcrumbs,
  platformMetadata,
  type GscFaqItem,
  type ModuleId,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/for/in-house",
    title: { en: "SEO for In-House Teams: AnotherSEOGuru App", el: "AnotherSEOGuru App για in-house ομάδες SEO" },
    description: {
      en: "AnotherSEOGuru App for in-house teams: one ranked list of fixes from your own Search Console, tools to act on it, and charts that show what each change did.",
      el: "Το AnotherSEOGuru App για in-house ομάδες: μία λίστα διορθώσεων από το δικό σας Search Console, εργαλεία για να τις κάνετε και γραφήματα για το τι έφερε κάθε αλλαγή.",
    },
    keyword: { en: "in-house SEO software", el: "λογισμικό SEO για in-house ομάδες" },
  });
}

const LAUNCH = planById("Launch");
const GROWTH = planById("Growth");
const IN_HOUSE_MODULES: readonly ModuleId[] = ["opportunities", "performance", "keywords", "content", "audit", "assistant"];

const IN_HOUSE_FAQ: readonly GscFaqItem[] = [
  {
    q: { en: "Which plan fits an in-house team?", el: "Ποιο πακέτο ταιριάζει σε μια in-house ομάδα;" },
    a: {
      en: `Launch covers ${LAUNCH.sites} sites and ${LAUNCH.seats} seat, with Search Console performance, opportunities, keyword research and rank tracking, site audit and the AI assistant. Growth adds content briefs and WordPress publishing, competitor gaps and AI visibility tracking, with ${GROWTH.sites} sites and ${GROWTH.seats} seats.`,
      el: `Το Launch καλύπτει ${LAUNCH.sites} ιστοτόπους και ${LAUNCH.seats} χρήστη, με απόδοση Search Console, ευκαιρίες, έρευνα λέξεων-κλειδιών και παρακολούθηση θέσεων, έλεγχο ιστότοπου και τον βοηθό AI. Το Growth προσθέτει briefs περιεχομένου και δημοσίευση στο WordPress, κενά έναντι ανταγωνιστών και ορατότητα στην AI, με ${GROWTH.sites} ιστοτόπους και ${GROWTH.seats} χρήστες.`,
    },
    link: { kind: "site", path: "/platform/pricing#compare", label: { en: "Compare the plans", el: "Συγκρίνετε τα πακέτα" } },
  },
  ...HOME_FAQ.filter((item) =>
    ["What access do you need to my Google account?", "How are the click estimates calculated?", "What are credits used for?", "Can I cancel anytime?"].includes(item.q.en),
  ),
];

export default async function PlatformForInHousePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For in-house teams", "Για in-house ομάδες"), path: "/platform/for/in-house" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href="#capabilities" tag={tx("In-house", "In-house")} text={tx("AnotherSEOGuru App for in-house teams", "AnotherSEOGuru App για in-house ομάδες")} />}
          title={
            <>
              <span className="block">{tx("Know what to fix", "Μάθετε τι να διορθώσετε")}</span>
              <span className="block">
                {tx("on your site ", "στον ιστότοπό σας ")}
                <WaveAccent>{tx("this week.", "αυτή την εβδομάδα.")}</WaveAccent>
              </span>
            </>
          }
          lead={tx(
            "AnotherSEOGuru App is SEO software for in-house marketers and small teams. It reads your own Search Console, ranks the fixes worth making by the clicks they could bring, gives you the keyword, content and audit tools to act on them, and shows on the chart what each change did.",
            "Το AnotherSEOGuru App είναι λογισμικό SEO για in-house marketers και μικρές ομάδες. Διαβάζει το δικό σας Search Console, βάζει σε σειρά τις διορθώσεις που αξίζουν με βάση τα κλικ που μπορούν να φέρουν, σας δίνει τα εργαλεία λέξεων-κλειδιών, περιεχομένου και ελέγχου για να τις κάνετε και δείχνει στο γράφημα τι έφερε κάθε αλλαγή.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="in-house-hero" />}
          trust={<TrustMarks items={copy.trust} yesLabel={copy.markYes} />}
          panel={
            <a href={appLink("/demo/opportunities", locale, "in-house-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/opportunities"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx(
                  "The Opportunities list on a sample site: ranked fixes with estimated extra clicks per month.",
                  "Η λίστα Ευκαιριών σε δείγμα ιστότοπου: διορθώσεις με σειρά και εκτίμηση επιπλέον κλικ ανά μήνα.",
                )}
              >
                <OpportunitiesPreview locale={locale} />
              </AppPanel>
            </a>
          }
          panelNote={
            <a href={appLink("/demo/opportunities", locale, "in-house-window-link")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
              {tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
            </a>
          }
        />

        <WaveSection id="capabilities" shot="capabilities">
          <WaveHeading
            align="center"
            eyebrow={tx("Why in-house teams use it", "Γιατί το χρησιμοποιούν οι in-house ομάδες")}
            title={
              <>
                {tx("Less time in spreadsheets, ", "Λιγότερος χρόνος σε spreadsheets, ")}
                <WaveAccent>{tx("more changes shipped.", "περισσότερες αλλαγές στον αέρα.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Search Console tells you what happened. An in-house team also needs to know what to do next, why traffic moved and whether last month’s work paid off.",
              "Το Search Console σάς λέει τι συνέβη. Μια in-house ομάδα χρειάζεται επίσης να ξέρει τι να κάνει μετά, γιατί άλλαξε η επισκεψιμότητα και αν απέδωσε η δουλειά του προηγούμενου μήνα.",
            )}
          />
          <CapabilityGrid
            yesLabel={copy.markYes}
            tiers={[
              {
                id: "week",
                label: tx("This week", "Αυτή την εβδομάδα"),
                items: [
                  {
                    key: "list",
                    icon: <Target className="size-5" aria-hidden />,
                    title: tx("A ranked to-do list", "Μια λίστα με σειρά προτεραιότητας"),
                    body: tx(
                      "Striking-distance keywords, weak snippets, decaying pages, pages competing for the same searches and missing content, scored by the extra clicks each fix could bring.",
                      "Λέξεις-κλειδιά κοντά στην κορυφή, αδύναμα snippets, σελίδες σε φθορά, σελίδες που διεκδικούν τις ίδιες αναζητήσεις και περιεχόμενο που λείπει, με βαθμολογία βάσει των επιπλέον κλικ.",
                    ),
                  },
                  {
                    key: "chart",
                    icon: <LineChart className="size-5" aria-hidden />,
                    title: tx("Every traffic change explained", "Κάθε αλλαγή στην κίνηση εξηγημένη"),
                    body: tx(
                      "Period comparisons, your own release notes and confirmed Google updates on the same chart, with up to 16 months of history.",
                      "Συγκρίσεις περιόδων, οι δικές σας σημειώσεις και οι επιβεβαιωμένες ενημερώσεις της Google στο ίδιο γράφημα, με έως 16 μήνες ιστορικό.",
                    ),
                  },
                  {
                    key: "proof",
                    icon: <ListChecks className="size-5" aria-hidden />,
                    title: tx("Proof of what worked", "Απόδειξη για το τι πέτυχε"),
                    body: tx(
                      "Turn a fix into a task, mark the day it went live and watch the effect, so the next budget conversation starts from numbers.",
                      "Κάντε μια διόρθωση εργασία, σημειώστε την ημέρα που βγήκε στον αέρα και δείτε το αποτέλεσμα, ώστε η επόμενη συζήτηση για τον προϋπολογισμό να ξεκινά από νούμερα.",
                    ),
                  },
                ],
              },
            ]}
          />
        </WaveSection>

        <WaveSection shot="modules" tinted>
          <WaveHeading
            align="center"
            eyebrow={tx("The modules you’ll use most", "Οι λειτουργίες που θα χρησιμοποιείτε περισσότερο")}
            title={
              <>
                {tx("From finding the fix to ", "Από τον εντοπισμό της διόρθωσης ως την ")}
                <WaveAccent>{tx("proving it.", "απόδειξη.")}</WaveAccent>
              </>
            }
          />
          <TieredModuleGrid locale={locale} source="in-house-tour" ids={IN_HOUSE_MODULES} />
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
          actions={<WaveSoftwareActions locale={locale} source="in-house-steps" />}
        />

        <WaveSection id="pricing" shot="pricing">
          <WaveHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Most in-house teams start on ", "Οι περισσότερες in-house ομάδες ξεκινούν με ")}
                <WaveAccent>Launch</WaveAccent>
              </>
            }
            lead={tx(
              "Move to Growth when you publish content every week or want competitor and AI visibility tracking. Search Console features never use credits on any plan.",
              "Περάστε στο Growth όταν δημοσιεύετε περιεχόμενο κάθε εβδομάδα ή θέλετε ανταγωνιστές και ορατότητα στην AI. Οι λειτουργίες του Search Console δεν χρεώνουν μονάδες σε κανένα πακέτο.",
            )}
          />
          <PlanPicker locale={locale} source="in-house-plans" className="mt-10" />
        </WaveSection>

        <WaveStats locale={locale} />
        <WaveAgencyDoor locale={locale} />
        <WaveFaq
          locale={locale}
          items={IN_HOUSE_FAQ}
          title={
            <>
              {copy.faqTitleBefore}
              <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          lead={copy.faqLead}
        />
        <WaveSection shot="others">
          <WaveHeading
            align="center"
            eyebrow={tx("Other teams", "Άλλες ομάδες")}
            title={tx("Different kind of team?", "Διαφορετικός τύπος ομάδας;")}
          />
          <PersonaLinks locale={locale} exclude="/platform/for/in-house" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </WaveSection>
        <WaveClose
          locale={locale}
          source="in-house-band"
          title={
            <>
              {tx("Your next wins are already in your data. ", "Οι επόμενες επιτυχίες σας κρύβονται ήδη στα δεδομένα σας. ")}
              <WaveAccent>{tx("Let’s find them.", "Ας τις βρούμε.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/for/in-house" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
