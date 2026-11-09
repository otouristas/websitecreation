import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BrandMark } from "@/components/BrandLogo";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, KitHeading, KitSection, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import {
  AddonList,
  AgencyCrossSell,
  AppVersusAgencyNote,
  ComparisonTable,
  CreditCapacity,
  CreditPacks,
  FreePlanCard,
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
  const usd = (n: number) => formatUsd(locale, n);

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
          titleClassName="max-w-full sm:max-w-4xl sm:text-[52px] lg:text-[60px]"
          pill={
            <span className="inline-flex items-center gap-3">
              <BrandMark className="h-11 w-auto" />
              <KitEyebrow>{tx("AnotherSEOGuru App · Pricing", "AnotherSEOGuru App · Τιμές")}</KitEyebrow>
            </span>
          }
          title={
            <>
              {tx("Simple", "Απλά")} <Accent>{tx("plans", "πακέτα")}</Accent> {tx("for AnotherSEOGuru App", "για το AnotherSEOGuru App")}
            </>
          }
          lead={tx(
            `AnotherSEOGuru App costs ${usd(STARTER.monthly)}, ${usd(PRO.monthly)} or ${usd(AGENCY.monthly)} a month, with two months free on yearly billing. Search Console analysis, opportunities and client reports never use credits. Credits pay for third-party data and AI, and every action shows its cost before you run it.`,
            `Το AnotherSEOGuru App κοστίζει ${usd(STARTER.monthly)}, ${usd(PRO.monthly)} ή ${usd(AGENCY.monthly)} τον μήνα, με δύο μήνες δώρο στην ετήσια χρέωση. Η ανάλυση Search Console, οι ευκαιρίες και οι αναφορές πελατών δεν χρησιμοποιούν ποτέ μονάδες. Οι μονάδες καλύπτουν δεδομένα τρίτων και AI, και κάθε ενέργεια δείχνει το κόστος της πριν την εκτελέσετε.`,
          )}
          actions={<SoftwareCtas locale={locale} source="pricing-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <Container className="mt-14">
            <PlanPicker
              locale={locale}
              source="pricing-plans"
              className="mx-auto max-w-[1100px]"
              beforeCards={<FreePlanCard locale={locale} />}
              afterCards={<AppVersusAgencyNote locale={locale} />}
              yearlyBadge={{ en: "2 months free", el: "2 μήνες δώρο" }}
              emphasizeYearlyGift
            />
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
              {tx("Included on every plan", "Περιλαμβάνεται σε κάθε πακέτο")}
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-center text-[14.5px] leading-relaxed text-muted-foreground">
              {tx(
                "A plan’s price covers the features listed for it. Add-ons raise capacity: sites, keywords, prompts and credits. White-label reports are included on Agency and can be added to another plan. Every plan includes:",
                "Η τιμή κάθε πακέτου καλύπτει τις λειτουργίες που αναφέρει. Τα πρόσθετα αυξάνουν τη χωρητικότητα: ιστοτόπους, λέξεις-κλειδιά, prompts και μονάδες. Οι αναφορές white-label περιλαμβάνονται στο Agency και μπορείτε να τις προσθέσετε και σε άλλο πακέτο. Κάθε πακέτο περιλαμβάνει:",
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
            description={tx(
              "Higher plans include everything in the plans before them. Features are split into groups, so you can see what changes at each tier.",
              "Τα ανώτερα πακέτα περιλαμβάνουν όλα όσα έχουν τα προηγούμενα. Οι λειτουργίες είναι χωρισμένες σε ομάδες, ώστε να βλέπετε τι αλλάζει σε κάθε επίπεδο.",
            )}
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
                "Credits are only spent when AnotherSEOGuru App pays a provider for you: keyword and SERP data, crawls, backlinks and AI. If you run out, Search Console features keep working.",
                "Οι μονάδες χρεώνονται μόνο όταν το AnotherSEOGuru App πληρώνει έναν πάροχο για λογαριασμό σας: δεδομένα λέξεων-κλειδιών και SERP, crawls, backlinks και AI. Αν σας τελειώσουν, οι λειτουργίες του Search Console συνεχίζουν να δουλεύουν.",
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
          <div className="mt-14">
            <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{tx("Add-ons", "Πρόσθετα")}</h3>
            <p className="mt-1 text-[14.5px] text-muted-foreground">
              {tx(
                "Need more room on a paid plan? Add a site, tracked keywords, AI visibility prompts, monthly credits or white-label reports. Yearly add-ons include two months free.",
                "Χρειάζεστε περισσότερο χώρο σε ένα πληρωμένο πακέτο; Προσθέστε ιστότοπο, λέξεις-κλειδιά σε παρακολούθηση, prompts ορατότητας στην AI, μηνιαίες μονάδες ή αναφορές white-label. Τα ετήσια πρόσθετα έχουν δύο μήνες δώρο.",
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
              {tx("Start with your own data,", "Ξεκινήστε με τα δικά σας δεδομένα,")} <Accent>{tx("today", "σήμερα")}</Accent>.
            </>
          }
          description={tx(
            "Connect Google in one click, read-only, and pick the plan that fits. Change or cancel anytime.",
            "Συνδέστε τη Google με ένα κλικ, μόνο για ανάγνωση, και επιλέξτε το πακέτο που σας ταιριάζει. Αλλάξτε ή ακυρώστε οποτεδήποτε.",
          )}
        />
        <PlatformLinks locale={locale} current="/pricing" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
