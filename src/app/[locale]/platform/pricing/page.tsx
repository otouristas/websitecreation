import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import {
  AgencyCrossSell,
  ComparisonTable,
  CreditCapacity,
  CreditPacks,
  GscFaq,
  IncludedGrid,
  PLANS,
  PRICING_FAQ,
  PlanPicker,
  PlatformLinks,
  appLink,
  formatUsd,
  gscBoostSoftwareSchema,
  platformBreadcrumbs,
  platformMetadata,
} from "@/components/gsc-boost";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

const [LAUNCH, GROWTH, AGENCY] = PLANS;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/pricing",
    title: { en: "SEO Software Pricing: GSC Boost Plans", el: "GSC Boost: τιμές λογισμικού SEO" },
    description: {
      en: `GSC Boost pricing: Launch $${LAUNCH.monthly}, Growth $${GROWTH.monthly} and Agency $${AGENCY.monthly} a month, two months free on yearly billing. Search Console features never use credits on any plan.`,
      el: `Τιμές GSC Boost: Launch $${LAUNCH.monthly}, Growth $${GROWTH.monthly} και Agency $${AGENCY.monthly} τον μήνα, δύο μήνες δώρο με ετήσια χρέωση. Οι λειτουργίες του Search Console δεν χρεώνουν μονάδες.`,
    },
    keyword: { en: "SEO software pricing", el: "τιμές λογισμικού SEO" },
  });
}

/**
 * GSC Boost plans and credits, adapted from the app's PricingPage. Every
 * figure comes from components/gsc-boost/plans.ts, a copy of the app's plan
 * catalog; nothing on this page is typed in by hand.
 */
export default async function PlatformPricingPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const usd = (n: number) => formatUsd(locale, n);

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, "/platform/pricing"),
          platformBreadcrumbs(locale, [{ name: tx("Pricing", "Τιμές"), path: "/platform/pricing" }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow>{tx("GSC Boost · Pricing", "GSC Boost · Τιμές")}</KitEyebrow>}
          title={
            <>
              {tx("Simple plans. Credits only for the", "Απλά πακέτα. Μονάδες μόνο για τη")} <Accent>{tx("heavy lifting", "βαριά δουλειά")}</Accent>.
            </>
          }
          lead={tx(
            `GSC Boost costs ${usd(LAUNCH.monthly)}, ${usd(GROWTH.monthly)} or ${usd(AGENCY.monthly)} a month, with two months free on yearly billing. Search Console analysis, opportunities and client reports never use credits. Credits pay for third-party data and AI, and every action shows its cost before you run it.`,
            `Το GSC Boost κοστίζει ${usd(LAUNCH.monthly)}, ${usd(GROWTH.monthly)} ή ${usd(AGENCY.monthly)} τον μήνα, με δύο μήνες δώρο στην ετήσια χρέωση. Η ανάλυση Search Console, οι ευκαιρίες και οι αναφορές πελατών δεν χρησιμοποιούν ποτέ μονάδες. Οι μονάδες καλύπτουν δεδομένα τρίτων και AI, και κάθε ενέργεια δείχνει το κόστος της πριν την εκτελέσετε.`,
          )}
          actions={<SoftwareCtas locale={locale} source="pricing-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <Container className="mt-14">
            <p className="mb-7 flex items-center justify-center gap-2 text-[14px] font-medium text-foreground">
              <span className="flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              {tx("Everything included, no add-ons", "Όλα περιλαμβάνονται, χωρίς add-ons")}
            </p>
            <PlanPicker locale={locale} source="pricing-plans" className="mx-auto max-w-[1100px]" />
            <p className="mt-8 text-center text-[13px] text-muted-foreground">
              {tx("Prices in US dollars. Taxes may apply. Not ready to pay?", "Τιμές σε δολάρια ΗΠΑ. Ενδέχεται να ισχύουν φόροι. Δεν είστε έτοιμοι να πληρώσετε;")}{" "}
              <a
                href={appLink("/demo", locale, "pricing-hero-note")}
                className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground"
              >
                {tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
              </a>{" "}
              {tx("with no account.", "χωρίς λογαριασμό.")}
            </p>
          </Container>
        </HeroCentered>

        <section aria-labelledby="included" className="mt-20 border-y border-hairline bg-surface/35 sm:mt-24">
          <Container className="py-12">
            <h2 id="included" className="text-center font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
              {tx("Everything included, no add-ons", "Όλα περιλαμβάνονται, χωρίς add-ons")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-center text-[14.5px] leading-relaxed text-muted-foreground">
              {tx(
                "A plan’s price covers every feature listed for it. No paid toolkits or per-feature upgrades on top. Every plan includes:",
                "Η τιμή κάθε πακέτου καλύπτει όλες τις λειτουργίες που αναφέρει. Χωρίς επιπλέον χρεώσεις για εργαλεία ή αναβαθμίσεις ανά λειτουργία. Κάθε πακέτο περιλαμβάνει:",
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
                  {tx("What a credit", "Τι σας")} <Accent>{tx("buys", "δίνει μια μονάδα")}</Accent>
                </>
              }
              description={tx(
                "Credits are only spent when GSC Boost pays a provider for you: keyword and SERP data, crawls, backlinks and AI. If you run out, Search Console features keep working.",
                "Οι μονάδες χρεώνονται μόνο όταν το GSC Boost πληρώνει έναν πάροχο για λογαριασμό σας: δεδομένα λέξεων-κλειδιών και SERP, crawls, backlinks και AI. Αν σας τελειώσουν, οι λειτουργίες του Search Console συνεχίζουν να δουλεύουν.",
              )}
            />
            <div className="reveal min-w-0">
              <CreditCapacity locale={locale} />
            </div>
          </div>
          <div className="mt-14">
            <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{tx("Credit packs", "Πακέτα μονάδων")}</h3>
            <p className="mt-1 text-[14.5px] text-muted-foreground">
              {tx("Need more in a busy month? Add credits on top of your plan.", "Χρειάζεστε περισσότερες σε έναν φορτωμένο μήνα; Προσθέστε μονάδες πέρα από το πακέτο σας.")}
            </p>
            <div className="reveal mt-6">
              <CreditPacks locale={locale} source="pricing-packs" />
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
              {tx("Start with your own data,", "Ξεκινήστε με τα δικά σας δεδομένα,")} <Accent>{tx("today", "σήμερα")}</Accent>.
            </>
          }
          description={tx(
            "Connect Google in one click, read-only, and pick the plan that fits. Change or cancel anytime.",
            "Συνδέστε τη Google με ένα κλικ, μόνο για ανάγνωση, και επιλέξτε το πακέτο που σας ταιριάζει. Αλλάξτε ή ακυρώστε οποτεδήποτε.",
          )}
        />
        <PlatformLinks locale={locale} current="/platform/pricing" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
