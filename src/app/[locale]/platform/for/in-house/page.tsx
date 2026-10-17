import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LineChart, ListChecks, Target, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  Accent,
  AppWindow,
  Container,
  CtaBand,
  HeroCentered,
  KitEyebrow,
  KitHeading,
  KitSection,
  OpportunitiesPreview,
  SoftwareCtas,
  TrustLine,
  ValueTrio,
  softwareTrust,
} from "@/components/kit";
import {
  AgencyCrossSell,
  GscFaq,
  HOME_FAQ,
  HowItWorks,
  ModuleTour,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  appLink,
  planById,
  platformBreadcrumbs,
  platformMetadata,
  type GscFaqItem,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/for/in-house",
    title: { en: "SEO Platform for In-House Teams: GSC Boost", el: "GSC Boost για in-house ομάδες SEO" },
    description: {
      en: "GSC Boost for in-house teams: one ranked list of fixes from your own Search Console, tools to act on it, and charts that show what each change did.",
      el: "Το GSC Boost για in-house ομάδες: μία λίστα διορθώσεων από το δικό σας Search Console, εργαλεία για να τις κάνετε και γραφήματα για το τι έφερε κάθε αλλαγή.",
    },
    keyword: { en: "in-house SEO software", el: "λογισμικό SEO για in-house ομάδες" },
  });
}

const LAUNCH = planById("Launch");
const GROWTH = planById("Growth");

const IN_HOUSE_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: { en: "Which plan fits an in-house team?", el: "Ποιο πακέτο ταιριάζει σε μια in-house ομάδα;" },
    a: {
      en: `Launch covers ${LAUNCH.sites} sites and ${LAUNCH.seats} seat, with Search Console performance, opportunities, keyword research and rank tracking, site audit and the AI assistant. Growth adds content briefs and WordPress publishing, competitor gaps and AI visibility tracking, with ${GROWTH.sites} sites and ${GROWTH.seats} seats.`,
      el: `Το Launch καλύπτει ${LAUNCH.sites} ιστοτόπους και ${LAUNCH.seats} χρήστη, με απόδοση Search Console, ευκαιρίες, έρευνα λέξεων-κλειδιών και παρακολούθηση θέσεων, έλεγχο ιστότοπου και τον βοηθό AI. Το Growth προσθέτει briefs περιεχομένου και δημοσίευση στο WordPress, κενά έναντι ανταγωνιστών και ορατότητα στην AI, με ${GROWTH.sites} ιστοτόπους και ${GROWTH.seats} χρήστες.`,
    },
    link: { kind: "site", path: "/platform/pricing#compare", label: { en: "Compare the plans", el: "Συγκρίνετε τα πακέτα" } },
  },
  ...HOME_FAQ.filter((f) =>
    ["What access do you need to my Google account?", "How are the click estimates calculated?", "What are credits used for?", "Can I cancel anytime?"].includes(f.q.en),
  ),
];

/**
 * GSC Boost for in-house teams. Written from the app's module content only:
 * every capability named here is one of the nine modules on /platform/features.
 */
export default async function PlatformForInHousePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For in-house teams", "Για in-house ομάδες"), path: "/platform/for/in-house" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<Users />}>{tx("GSC Boost for in-house teams", "GSC Boost για in-house ομάδες")}</KitEyebrow>}
          title={
            <>
              {tx("Know what to fix on your site", "Μάθετε τι να διορθώσετε στον ιστότοπό σας")} <Accent>{tx("this week", "αυτή την εβδομάδα")}</Accent>
            </>
          }
          lead={tx(
            "GSC Boost is SEO software for in-house marketers and small teams. It reads your own Search Console, ranks the fixes worth making by the clicks they could bring, gives you the keyword, content and audit tools to act on them, and shows on the chart what each change did.",
            "Το GSC Boost είναι λογισμικό SEO για in-house marketers και μικρές ομάδες. Διαβάζει το δικό σας Search Console, βάζει σε σειρά τις διορθώσεις που αξίζουν με βάση τα κλικ που μπορούν να φέρουν, σας δίνει τα εργαλεία λέξεων-κλειδιών, περιεχομένου και ελέγχου για να τις κάνετε και δείχνει στο γράφημα τι έφερε κάθε αλλαγή.",
          )}
          actions={<SoftwareCtas locale={locale} source="in-house-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <div className="mx-auto mt-14 w-full max-w-[1100px] px-3 sm:px-6">
            <AppWindow
              href={appLink("/demo/opportunities", locale, "in-house-window")}
              ctaLabel={tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
              label={tx(
                "The Opportunities list on a sample site: ranked fixes with estimated extra clicks per month.",
                "Η λίστα Ευκαιριών σε δείγμα ιστότοπου: διορθώσεις με σειρά και εκτίμηση επιπλέον κλικ ανά μήνα.",
              )}
              badge={
                <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {tx("Sample data", "Δείγμα δεδομένων")}
                </span>
              }
            >
              <div className="p-3 sm:p-6">
                <OpportunitiesPreview locale={locale} />
              </div>
            </AppWindow>
          </div>
        </HeroCentered>

        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx("Why in-house teams use it", "Γιατί το χρησιμοποιούν οι in-house ομάδες")}
            title={
              <>
                {tx("Less time in spreadsheets,", "Λιγότερος χρόνος σε spreadsheets,")} <Accent>{tx("more changes shipped", "περισσότερες αλλαγές στον αέρα")}</Accent>
              </>
            }
            description={tx(
              "Search Console tells you what happened. An in-house team also needs to know what to do next, why traffic moved and whether last month’s work paid off.",
              "Το Search Console σάς λέει τι συνέβη. Μια in-house ομάδα χρειάζεται επίσης να ξέρει τι να κάνει μετά, γιατί άλλαξε η επισκεψιμότητα και αν απέδωσε η δουλειά του προηγούμενου μήνα.",
            )}
          />
          <ValueTrio
            className="mt-14"
            items={[
              {
                icon: Target,
                title: tx("A ranked to-do list", "Μια λίστα με σειρά προτεραιότητας"),
                text: tx(
                  "Striking-distance keywords, weak snippets, decaying pages, cannibalization and missing content, scored by the extra clicks each fix could bring.",
                  "Λέξεις-κλειδιά κοντά στην κορυφή, αδύναμα snippets, σελίδες σε φθορά, κανιβαλισμός και περιεχόμενο που λείπει, με βαθμολογία βάσει των επιπλέον κλικ.",
                ),
              },
              {
                icon: LineChart,
                title: tx("Every traffic change explained", "Κάθε αλλαγή στην κίνηση εξηγημένη"),
                text: tx(
                  "Period comparisons, your own release notes and confirmed Google updates on the same chart, with up to 16 months of history.",
                  "Συγκρίσεις περιόδων, οι δικές σας σημειώσεις και οι επιβεβαιωμένες ενημερώσεις της Google στο ίδιο γράφημα, με έως 16 μήνες ιστορικό.",
                ),
              },
              {
                icon: ListChecks,
                title: tx("Proof of what worked", "Απόδειξη για το τι πέτυχε"),
                text: tx(
                  "Turn a fix into a task, mark the day it went live and watch the effect, so the next budget conversation starts from numbers.",
                  "Κάντε μια διόρθωση εργασία, σημειώστε την ημέρα που βγήκε στον αέρα και δείτε το αποτέλεσμα, ώστε η επόμενη συζήτηση για τον προϋπολογισμό να ξεκινά από νούμερα.",
                ),
              },
            ]}
          />
        </KitSection>

        <section className="border-t border-hairline py-20 sm:py-28">
          <Container>
            <KitHeading
              align="center"
              eyebrow={tx("The modules you’ll use most", "Οι λειτουργίες που θα χρησιμοποιείτε περισσότερο")}
              title={
                <>
                  {tx("From finding the fix to", "Από τον εντοπισμό της διόρθωσης ως την")} <Accent>{tx("proving it", "απόδειξη")}</Accent>
                </>
              }
            />
            <ModuleTour
              locale={locale}
              ids={["opportunities", "performance", "keywords", "content", "audit", "assistant"]}
              source="in-house-tour"
              className="mt-20"
            />
          </Container>
        </section>

        <HowItWorks locale={locale} source="in-house-steps" tinted />

        <KitSection id="pricing">
          <KitHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Most in-house teams start on", "Οι περισσότερες in-house ομάδες ξεκινούν με")} <Accent>Launch</Accent>
              </>
            }
            description={tx(
              "Move to Growth when you publish content every week or want competitor and AI visibility tracking. Search Console features never use credits on any plan.",
              "Περάστε στο Growth όταν δημοσιεύετε περιεχόμενο κάθε εβδομάδα ή θέλετε ανταγωνιστές και ορατότητα στην AI. Οι λειτουργίες του Search Console δεν χρεώνουν μονάδες σε κανένα πακέτο.",
            )}
          />
          <PlanPicker locale={locale} source="in-house-plans" className="mt-10" />
        </KitSection>

        <AgencyCrossSell locale={locale} />
        <GscFaq locale={locale} items={IN_HOUSE_FAQ} />

        <KitSection className="border-t border-hairline">
          <KitHeading align="center" title={tx("Different kind of team?", "Διαφορετικός τύπος ομάδας;")} />
          <PersonaLinks locale={locale} exclude="/platform/for/in-house" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </KitSection>

        <CtaBand
          locale={locale}
          source="in-house-band"
          title={
            <>
              {tx("Your next wins are already in your data.", "Οι επόμενες επιτυχίες σας κρύβονται ήδη στα δεδομένα σας.")}{" "}
              <Accent>{tx("Let’s find them", "Ας τις βρούμε")}</Accent>.
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/for/in-house" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
