import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection } from "@/components/kit";
import {
  AddonList,
  AgencyCrossSell,
  FREE_PLAN,
  ComparisonTable,
  CreditCapacity,
  CreditPacks,
  GscFaq,
  IncludedGrid,
  PLANS,
  PRICING_FAQ,
  PlanPicker,
  PlatformLinks,
  TRIAL,
  appLink,
  gscBoostSoftwareSchema,
  platformBreadcrumbs,
  platformMetadata,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

const [STARTER, PRO, AGENCY] = PLANS;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/pricing",
    title: { en: "SEO Software Pricing: AnotherSEOGuru App Plans", el: "AnotherSEOGuru App: τιμές λογισμικού SEO" },
    description: {
      en: `AnotherSEOGuru App pricing: Free, Starter $${STARTER.monthly}, Pro $${PRO.monthly} and Agency $${AGENCY.monthly} a month, two months free yearly. Search Console features never use credits.`,
      el: `Τιμές AnotherSEOGuru App: Free, Starter $${STARTER.monthly}, Pro $${PRO.monthly} και Agency $${AGENCY.monthly} τον μήνα, δύο μήνες δώρο ετησίως. Το Search Console δεν χρεώνει μονάδες.`,
    },
    keyword: { en: "SEO software pricing", el: "τιμές λογισμικού SEO" },
  });
}

/**
 * AnotherSEOGuru App plans and credits, adapted from the app's PricingPage. Every
 * figure comes from components/gsc-boost/plans.ts, a copy of the app's plan
 * catalog; nothing on this page is typed in by hand.
 */
export default async function PlatformPricingPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, "/pricing"),
          platformBreadcrumbs(locale, [{ name: tx("Pricing", "Τιμές"), path: "/pricing" }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow>{tx("AnotherSEOGuru App · Pricing", "AnotherSEOGuru App · Τιμές")}</KitEyebrow>}
          title={
            <>
              {tx("Which SEO plan fits", "Ποιο πακέτο SEO ταιριάζει")} <Accent>{tx("your sites?", "στην ομάδα σας;")}</Accent>
            </>
          }
          lead={tx(
            "Work on your own site, research a market or report to clients. Choose the tools you need today.",
            "Άλλες ανάγκες έχει ένα e-shop, άλλες μια ομάδα που φροντίζει δέκα πελάτες. Διαλέξτε τις λειτουργίες που χρειάζεστε σήμερα.",
          )}
        >
          <Container className="mt-8 sm:mt-10">
            <div className="mx-auto mb-7 flex max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-hairline bg-surface px-5 py-4 text-left sm:px-6">
              <div>
                <h2 className="font-display text-lg font-semibold">{tx("Start with one site for free", "Ξεκινήστε δωρεάν με μία ιστοσελίδα")}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {tx(
                    `${FREE_PLAN.credits} credits every month. Try Pro for ${TRIAL.days} days without a payment card.`,
                    `${FREE_PLAN.credits} μονάδες κάθε μήνα. Δοκιμάστε το Pro για ${TRIAL.days} ημέρες χωρίς κάρτα.`,
                  )}
                </p>
              </div>
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 px-4 text-sm font-semibold text-link hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-ring" href={appLink("/signup", locale, "pricing-free")}>
                {tx("Create a free account", "Δωρεάν εγγραφή")} <ArrowRight aria-hidden className="size-4" />
              </a>
            </div>
            <PlanPicker locale={locale} source="pricing-plans" className="mx-auto max-w-[1100px]" compactOnMobile />
            <p className="mt-8 text-center text-[13px] text-muted-foreground">
              {tx("Prices are in US dollars. Taxes may apply.", "Οι τιμές είναι σε δολάρια ΗΠΑ. Ενδέχεται να προστεθούν φόροι.")}{" "}
              <a
                href={appLink("/demo", locale, "pricing-hero-note")}
                className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground"
              >
                {tx("Try the demo", "Δοκιμάστε την εφαρμογή")}
              </a>{" "}
              {tx("with no account.", "χωρίς λογαριασμό.")}
            </p>
          </Container>
        </HeroCentered>

        <section aria-labelledby="included" className="mt-20 border-y border-hairline bg-surface/35 sm:mt-24">
          <Container className="py-12">
            <h2 id="included" className="text-center font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
              {tx("Included on every plan", "Περιλαμβάνεται σε κάθε πακέτο")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-center text-[14.5px] leading-relaxed text-muted-foreground">
              {tx(
                "Follow the searches that bring people to your site, export the numbers and ask Aster AI about a change you’re considering.",
                "Δείτε ποιες αναζητήσεις φέρνουν επισκέπτες, κατεβάστε τα στοιχεία και ρωτήστε τον Aster AI για μια αλλαγή που σκέφτεστε να κάνετε.",
              )}
            </p>
            <IncludedGrid locale={locale} />
          </Container>
        </section>

        <KitSection id="compare">
          <KitHeading
            title={
              <>
                {tx("Compare", "Σύγκριση")} <Accent>{tx("every", "όλων")}</Accent> {tx("feature", "των λειτουργιών")}
              </>
            }
            description={tx("Higher plans include everything in the plans before them.", "Τα ανώτερα πακέτα περιλαμβάνουν όλα όσα έχουν τα προηγούμενα.")}
          />
          <div className="reveal mt-10">
            <p className="mb-3 text-[12px] text-muted-foreground sm:hidden">
              {tx("Swipe the table sideways to compare all three plans.", "Σύρετε τον πίνακα οριζόντια για να συγκρίνετε και τα τρία πακέτα.")}
            </p>
            <ComparisonTable locale={locale} source="pricing-compare" />
          </div>
        </KitSection>

        <KitSection id="credits" className="border-t border-hairline">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <KitHeading
              eyebrow={tx("Credits", "Μονάδες")}
              title={
                <>
                  {tx("Which tools", "Ποιες λειτουργίες")} <Accent>{tx("use credits?", "χρησιμοποιούν μονάδες;")}</Accent>
                </>
              }
              description={tx(
                "You use credits for actions such as importing a website, checking a keyword’s live ranking or publishing a page to WordPress. The app shows the cost before you run a check. Search Console reports keep working if your balance reaches zero.",
                "Χρησιμοποιείτε μονάδες, για παράδειγμα, όταν εισάγετε μια ιστοσελίδα, ελέγχετε τη σημερινή θέση μιας λέξης-κλειδιού ή δημοσιεύετε μια σελίδα στο WordPress. Βλέπετε το κόστος πριν ξεκινήσετε. Αν εξαντληθούν οι μονάδες, οι αναφορές του Search Console παραμένουν διαθέσιμες.",
              )}
            />
            <div className="reveal min-w-0">
              <CreditCapacity locale={locale} />
            </div>
          </div>
          <div className="mt-14">
            <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{tx("Credit packs", "Πακέτα μονάδων")}</h3>
            <p className="mt-1 text-[14.5px] text-muted-foreground">
              {tx("Buy extra credits when you have more research to do in a particular month.", "Αν κάποιον μήνα χρειάζεστε περισσότερες μονάδες για την έρευνά σας, μπορείτε να αγοράσετε ένα επιπλέον πακέτο.")}
            </p>
            <div className="reveal mt-6">
              <CreditPacks locale={locale} source="pricing-packs" />
            </div>
          </div>
          <div className="mt-14">
            <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{tx("Plan add-ons", "Προσθήκες στο πακέτο σας")}</h3>
            <p className="mt-1 text-[14.5px] text-muted-foreground">
              {tx(
                "Add more sites, tracked keywords, AI questions or monthly credits to a paid plan. With annual billing you pay for ten months and get twelve.",
                "Αν έχετε συνδρομή, μπορείτε να προσθέσετε ιστοσελίδες, λέξεις-κλειδιά, ερωτήσεις για έλεγχο σε AI ή μηνιαίες μονάδες. Με ετήσια χρέωση πληρώνετε δέκα μήνες για ολόκληρο τον χρόνο.",
              )}
            </p>
            <div className="reveal mt-6">
              <AddonList locale={locale} />
            </div>
          </div>
        </KitSection>

        <AgencyCrossSell locale={locale} />
        <GscFaq locale={locale} items={PRICING_FAQ} />
        <CtaBand
          locale={locale}
          source="pricing-band"
          title={
            <>
              {tx("Try it on", "Δοκιμάστε το στη")} <Accent>{tx("your own site", "δική σας ιστοσελίδα")}</Accent>
            </>
          }
          description={tx(
            "Connect Search Console with read-only access. Your first suggestions come from searches people have already made for your site.",
            "Συνδέστε το Search Console με πρόσβαση μόνο για ανάγνωση. Οι πρώτες προτάσεις βασίζονται σε αναζητήσεις στις οποίες έχει ήδη εμφανιστεί η ιστοσελίδα σας.",
          )}
        />
        <PlatformLinks locale={locale} current="/pricing" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
