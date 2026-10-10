import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, Container, CtaBand, HeroCentered, KitEyebrow, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import {
  GscFaq,
  HOME_FAQ,
  MODULES,
  ModuleDetail,
  ModuleIndex,
  PlatformLinks,
  gscBoostSoftwareSchema,
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
    path: "/platform/features",
    title: { en: "SEO Platform Features: GSC Boost", el: "GSC Boost: δυνατότητες λογισμικού SEO" },
    description: {
      en: "Every GSC Boost module: ranked opportunities with click estimates, performance, keywords, content, site audit, competitors, AI visibility and agency tools.",
      el: "Όλες οι λειτουργίες του GSC Boost: ευκαιρίες με εκτίμηση κλικ, απόδοση, λέξεις-κλειδιά, περιεχόμενο, έλεγχος, ανταγωνιστές, ορατότητα σε AI και agency.",
    },
    keyword: { en: "SEO platform features", el: "δυνατότητες λογισμικού SEO" },
  });
}

/** The three questions people ask on a features page, from the app's FAQ. */
const FEATURE_FAQ = HOME_FAQ.filter((f) =>
  ["How are the click estimates calculated?", "What are credits used for?", "What access do you need to my Google account?"].includes(f.q.en),
);

/**
 * Every GSC Boost module on one page, adapted from the app's FeaturesPage.
 * Section ids are the anchors the site menu links to; the 27 retired
 * /platform/features/<slug> URLs 308 here (next.config.ts).
 */
export default async function PlatformFeaturesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, "/platform/features"),
          platformBreadcrumbs(locale, [{ name: tx("Features", "Δυνατότητες"), path: "/platform/features" }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow>{tx("GSC Boost · Features", "GSC Boost · Δυνατότητες")}</KitEyebrow>}
          title={
            <>
              {tx("Every SEO tool you need, grounded in", "Όλα τα εργαλεία SEO που χρειάζεστε, βασισμένα στα")} <Accent>{tx("your data", "δικά σας δεδομένα")}</Accent>
            </>
          }
          lead={tx(
            "GSC Boost has nine modules in one workspace. Search Console features cost nothing on every plan; paid data and AI use credits, and every action shows its cost before you run it.",
            "Το GSC Boost έχει εννέα λειτουργίες σε έναν χώρο εργασίας. Οι λειτουργίες του Search Console δεν κοστίζουν τίποτα σε κανένα πακέτο· τα δεδομένα τρίτων και η AI χρησιμοποιούν μονάδες, και κάθε ενέργεια δείχνει το κόστος της πριν την εκτελέσετε.",
          )}
          actions={<SoftwareCtas locale={locale} source="features-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <Container className="mt-14 pb-6">
            <ModuleIndex locale={locale} />
          </Container>
        </HeroCentered>

        <div className="mt-10">
          {MODULES.map((m, i) => (
            <ModuleDetail key={m.id} m={m} locale={locale} flip={i % 2 === 1} />
          ))}
        </div>

        <GscFaq locale={locale} items={FEATURE_FAQ} />
        <CtaBand
          locale={locale}
          source="features-band"
          title={
            <>
              {tx("Try every module on", "Δοκιμάστε κάθε λειτουργία στα")} <Accent>{tx("your own data", "δικά σας δεδομένα")}</Accent>.
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/features" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
