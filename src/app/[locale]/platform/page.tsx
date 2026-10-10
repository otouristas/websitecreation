import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, ListChecks, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  Accent,
  AnnouncePill,
  AppWindow,
  BeforeAfter,
  Container,
  CtaBand,
  DecisionsPanel,
  HeroCentered,
  KitHeading,
  KitSection,
  OverviewPreview,
  RawQueriesPanel,
  SoftwareCtas,
  Stage,
  TrustLine,
  ValueTrio,
  softwareTrust,
} from "@/components/kit";
import {
  AgencyCrossSell,
  GscFaq,
  HOME_FAQ,
  HowItWorks,
  LOWEST_MONTHLY,
  ModuleTour,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  WorksWith,
  appLink,
  gscBoostSoftwareSchema,
  platformMetadata,
  type ModuleId,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform",
    title: { en: "GSC Boost: SEO Software for Search Console", el: "GSC Boost: λογισμικό SEO για Search Console" },
    description: {
      en: `GSC Boost is SEO software that turns Google Search Console into a ranked list of fixes with click estimates. Keywords, audits, AI visibility. From $${LOWEST_MONTHLY}/mo.`,
      el: `Το GSC Boost είναι λογισμικό SEO που κάνει το Google Search Console λίστα διορθώσεων με εκτίμηση κλικ. Λέξεις-κλειδιά, έλεγχοι, ορατότητα σε AI. Από $${LOWEST_MONTHLY}/μήνα.`,
    },
    keyword: { en: "SEO software platform", el: "λογισμικό SEO" },
  });
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

/**
 * GSC Boost landing, modelled on the app's own home page
 * (gsc-gemini-boost src/marketing/pages/HomePage.tsx) in the website's kit.
 */
export default async function PlatformHubPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <>
      <SchemaMarkup schemas={[gscBoostSoftwareSchema(locale)]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={
            <AnnouncePill
              href={`${lp("/platform/features")}#ai-visibility`}
              kind="ai"
              tag="AI"
              text={tx("See when ChatGPT, Gemini and Perplexity mention you", "Δείτε πότε σας αναφέρουν το ChatGPT, το Gemini και το Perplexity")}
            />
          }
          title={
            <>
              {tx("Search Console, turned into a", "Το Search Console γίνεται")} <Accent>{tx("growth plan", "πλάνο ανάπτυξης")}</Accent>
            </>
          }
          lead={tx(
            "GSC Boost by AnotherSEOGuru is SEO software for Google Search Console. Connect Google once, read-only, and it finds the fixes that win the most clicks: striking-distance keywords, weak snippets, decaying pages, cannibalization and missing content, each with an estimate of what it is worth.",
            "Το GSC Boost του AnotherSEOGuru είναι λογισμικό SEO για το Google Search Console. Συνδέστε τη Google μία φορά, μόνο για ανάγνωση, και βρίσκει τις διορθώσεις που φέρνουν τα περισσότερα κλικ: λέξεις-κλειδιά κοντά στην κορυφή, αδύναμα snippets, σελίδες σε φθορά, κανιβαλισμό και περιεχόμενο που λείπει, με εκτίμηση για το πόσο αξίζει η καθεμία.",
          )}
          actions={<SoftwareCtas locale={locale} source="platform-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <div className="mx-auto mt-14 w-full max-w-[1240px] px-3 sm:px-6">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-[4%] -top-[10%] -z-10 h-[55%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_35%,transparent),transparent)] blur-3xl"
              />
              <AppWindow
                href={appLink("/demo", locale, "platform-window")}
                ctaLabel={tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
                label={tx(
                  "The GSC Boost overview on a sample hotel: clicks, impressions, CTR and position, a clicks chart and the top fixes to ship next.",
                  "Η επισκόπηση του GSC Boost σε δείγμα ξενοδοχείου: κλικ, εμφανίσεις, CTR και θέση, γράφημα κλικ και οι επόμενες διορθώσεις.",
                )}
                badge={
                  <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {tx("Live demo · sample data", "Ζωντανή επίδειξη · δείγμα δεδομένων")}
                  </span>
                }
              >
                <OverviewPreview locale={locale} />
              </AppWindow>
            </div>
            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              {tx("Sample data for a fictional hotel. The demo runs the real app with no account.", "Δείγμα δεδομένων για ένα φανταστικό ξενοδοχείο. Η επίδειξη τρέχει την πραγματική εφαρμογή χωρίς λογαριασμό.")}{" "}
              <a
                href={appLink("/demo", locale, "platform-window-link")}
                className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground"
              >
                {tx("Open the live demo", "Ανοίξτε τη ζωντανή επίδειξη")}
              </a>
            </p>
          </div>
        </HeroCentered>

        <WorksWith locale={locale} />

        {/* ------------------------------------------------- before / after */}
        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx("Why GSC Boost", "Γιατί GSC Boost")}
            title={
              <>
                {tx("Search Console shows you data.", "Το Search Console σάς δείχνει δεδομένα.")} {tx("GSC Boost hands you", "Το GSC Boost σάς δίνει")}{" "}
                <Accent>{tx("decisions", "αποφάσεις")}</Accent>.
              </>
            }
            description={tx(
              "Search Console’s reports are thousands of rows sorted by clicks, usually with your own brand name on top. The fixes worth making are buried further down.",
              "Οι αναφορές του Search Console είναι χιλιάδες γραμμές ταξινομημένες κατά κλικ, συνήθως με το όνομα του brand σας στην κορυφή. Οι διορθώσεις που αξίζουν είναι θαμμένες πιο κάτω.",
            )}
          />
          <div className="mt-14">
            <BeforeAfter
              before={{
                tag: tx("Before", "Πριν"),
                title: "Google Search Console",
                text: tx("Raw rows, sorted by clicks", "Ακατέργαστες γραμμές, ταξινομημένες κατά κλικ"),
                node: (
                  <Stage className="p-2.5 sm:p-4">
                    <RawQueriesPanel locale={locale} />
                  </Stage>
                ),
              }}
              after={{
                tag: tx("After", "Μετά"),
                title: "GSC Boost",
                text: tx("The same data, as ranked actions", "Τα ίδια δεδομένα, ως ενέργειες με προτεραιότητα"),
                node: (
                  <Stage className="p-2.5 sm:p-4">
                    <DecisionsPanel locale={locale} />
                  </Stage>
                ),
              }}
            />
          </div>
          <ValueTrio
            className="mt-16"
            items={[
              {
                icon: Target,
                title: tx("Ranked by clicks, not noise", "Προτεραιότητα στα κλικ, όχι στον θόρυβο"),
                text: tx(
                  "Every fix is scored by the extra clicks it could bring and the effort it takes, so the top of the list is always the best next move.",
                  "Κάθε διόρθωση βαθμολογείται με βάση τα επιπλέον κλικ που μπορεί να φέρει και τον κόπο που απαιτεί, οπότε η κορυφή της λίστας είναι πάντα η πιο χρήσιμη επόμενη κίνηση.",
                ),
              },
              {
                icon: Calculator,
                title: tx("Every estimate explained", "Κάθε εκτίμηση τεκμηριωμένη"),
                text: tx(
                  "Each number shows the position, impressions and CTR behind it, measured against a CTR curve fitted to your own site.",
                  "Κάθε νούμερο δείχνει τη θέση, τις εμφανίσεις και το CTR από τα οποία προκύπτει, σε σύγκριση με μια καμπύλη CTR προσαρμοσμένη στον δικό σας ιστότοπο.",
                ),
              },
              {
                icon: ListChecks,
                title: tx("Follow-through built in", "Ενσωματωμένη υλοποίηση"),
                text: tx(
                  "Turn a fix into a task, annotate what you shipped and see the effect on the chart, or in a client report.",
                  "Μετατρέψτε μια διόρθωση σε εργασία, σημειώστε τι υλοποιήσατε και δείτε το αποτέλεσμα στο γράφημα ή σε μια αναφορά πελάτη.",
                ),
              },
            ]}
          />
        </KitSection>

        {/* ------------------------------------------------------ module tour */}
        <section id="product" className="scroll-mt-24 border-t border-hairline py-20 sm:py-28">
          <Container>
            <KitHeading
              align="center"
              eyebrow={tx("The product", "Το προϊόν")}
              title={
                <>
                  {tx("One workspace for the whole", "Ένας χώρος εργασίας για ολόκληρο τον")} <Accent>{tx("SEO loop", "κύκλο του SEO")}</Accent>
                </>
              }
              description={tx(
                "Find what to fix, research what to build, ship it and prove it worked. Nine modules, all working from the same data.",
                "Βρείτε τι να διορθώσετε, ερευνήστε τι να δημιουργήσετε, υλοποιήστε το και αποδείξτε ότι πέτυχε. Εννέα λειτουργίες, όλες πάνω στα ίδια δεδομένα.",
              )}
            />
            <ModuleTour locale={locale} ids={TOUR} source="platform-tour" className="mt-20 sm:mt-24" />
            <div className="mt-20 text-center">
              <SoftwareCtas locale={locale} source="platform-tour-end" />
              <p className="mt-4 text-[13px] text-muted-foreground">
                <Link href={lp("/platform/features")} className="underline decoration-hairline underline-offset-4 hover:text-foreground">
                  {tx("Every module, with what it costs", "Όλες οι λειτουργίες, με το κόστος τους")}
                </Link>
              </p>
            </div>
          </Container>
        </section>

        <HowItWorks locale={locale} source="platform-steps" tinted />

        {/* ---------------------------------------------------------- plans */}
        <KitSection id="pricing">
          <KitHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Simple plans. Credits only for", "Απλά πακέτα. Μονάδες μόνο για")} <Accent>{tx("heavy lifting", "τη βαριά δουλειά")}</Accent>.
              </>
            }
            description={tx(
              "Search Console analysis, the opportunity engine and client reports never use credits. Credits cover third-party data and AI.",
              "Η ανάλυση Search Console, η μηχανή ευκαιριών και οι αναφορές πελατών δεν χρησιμοποιούν ποτέ μονάδες. Οι μονάδες καλύπτουν δεδομένα τρίτων και AI.",
            )}
          />
          <PlanPicker locale={locale} source="platform-plans" className="mt-10" />
          <p className="mt-10 text-center text-[14px]">
            <Link href={`${lp("/platform/pricing")}#compare`} className="inline-flex items-center gap-1.5 font-medium text-link hover:underline hover:underline-offset-4">
              {tx("Compare every feature and credit cost", "Συγκρίνετε όλες τις λειτουργίες και το κόστος σε μονάδες")} <ArrowRight className="size-4" />
            </Link>
          </p>
        </KitSection>

        {/* --------------------------------------------------------- personas */}
        <KitSection tinted>
          <KitHeading
            align="center"
            eyebrow={tx("Who it’s for", "Για ποιους είναι")}
            title={
              <>
                {tx("The same software, framed around", "Το ίδιο λογισμικό, στα μέτρα")} <Accent>{tx("your team", "της ομάδας σας")}</Accent>
              </>
            }
          />
          <PersonaLinks locale={locale} className="mt-12" />
        </KitSection>

        <AgencyCrossSell locale={locale} />
        <GscFaq locale={locale} items={HOME_FAQ} />
        <CtaBand
          locale={locale}
          source="platform-band"
          title={
            <>
              {tx("Your next wins are already in your data.", "Οι επόμενες επιτυχίες σας κρύβονται ήδη στα δεδομένα σας.")}{" "}
              <Accent>{tx("Let’s find them", "Ας τις βρούμε")}</Accent>.
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
