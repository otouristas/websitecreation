import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { SampleWindow } from "@/components/pages/home/SampleWindow";
import { homeCopy } from "@/components/pages/home/copy";
import { TieredModuleGrid } from "@/components/pages/platform-wave/modules";
import {
  AnnouncePill,
  TrustMarks,
  WaveSoftwareActions,
  WaveAccent,
  WaveClose,
  WaveFaq,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
} from "@/components/pages/platform-wave/ui";
import {
  HOME_FAQ,
  IntegrationCards,
  PlatformLinks,
  gscBoostSoftwareSchema,
  platformBreadcrumbs,
  platformMetadata,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/features",
    title: { en: "SEO Platform Features: AnotherSEOGuru App", el: "AnotherSEOGuru App: δυνατότητες λογισμικού SEO" },
    description: {
      en: "Every AnotherSEOGuru App module: ranked opportunities with click estimates, performance, keywords, content, site audit, competitors, AI visibility and agency tools.",
      el: "Όλες οι λειτουργίες του AnotherSEOGuru App: ευκαιρίες με εκτίμηση κλικ, απόδοση, λέξεις-κλειδιά, περιεχόμενο, έλεγχος, ανταγωνιστές, ορατότητα σε AI και agency.",
    },
    keyword: { en: "SEO platform features", el: "δυνατότητες λογισμικού SEO" },
  });
}

/** The three questions people ask on a features page, from the app's FAQ. */
const FEATURE_FAQ = HOME_FAQ.filter((item) =>
  ["How are the click estimates calculated?", "What are credits used for?", "What access do you need to my Google account?"].includes(item.q.en),
);

/**
 * Every AnotherSEOGuru App module on one page. Section ids are the anchors
 * the site menu links to. The 27 retired /platform/features/<slug> URLs 308 here.
 */
export default async function PlatformFeaturesPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);

  return (
    <>
      <SchemaMarkup
        schemas={[
          gscBoostSoftwareSchema(locale, "/platform/features"),
          platformBreadcrumbs(locale, [{ name: tx("Features", "Δυνατότητες"), path: "/platform/features" }]),
        ]}
      />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <AnnouncePill
              href={localizedPath(locale, "/platform")}
              tag={tx("Features", "Δυνατότητες")}
              text={tx("AnotherSEOGuru App", "AnotherSEOGuru App")}
            />
          }
          title={
            <>
              <span className="block">{tx("Every SEO tool you need,", "Όλα τα εργαλεία SEO που χρειάζεστε,")}</span>
              <span className="block">
                {tx("grounded in ", "βασισμένα στα ")}
                <WaveAccent>{tx("your data.", "δικά σας δεδομένα.")}</WaveAccent>
              </span>
            </>
          }
          lead={tx(
            "AnotherSEOGuru App has nine modules in one workspace. Search Console features cost nothing on every plan; paid data and AI use credits, and every action shows its cost before you run it.",
            "Το AnotherSEOGuru App έχει εννέα λειτουργίες σε έναν χώρο εργασίας. Οι λειτουργίες του Search Console δεν κοστίζουν τίποτα σε κανένα πακέτο· τα δεδομένα τρίτων και η AI χρησιμοποιούν μονάδες, και κάθε ενέργεια δείχνει το κόστος της πριν την εκτελέσετε.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="features-hero" />}
          trust={<TrustMarks items={[copy.trust[0], tx("No credit card for the demo", "Χωρίς κάρτα για την επίδειξη"), tx("Cancel anytime", "Ακύρωση οποτεδήποτε")]} yesLabel={copy.markYes} />}
          panel={<SampleWindow copy={copy} />}
          panelNote={copy.sampleCaption}
        />

        <WaveSection shot="capabilities">
          <WaveHeading
            align="center"
            eyebrow={tx("Capabilities", "Δυνατότητες")}
            title={
              <>
                {tx("Nine modules, ", "Εννέα λειτουργίες, ")}
                <WaveAccent>{tx("three tiers.", "τρία επίπεδα.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Search Console work is on every plan. Research, content and AI visibility open on Growth. The client workspace is the Agency plan.",
              "Η δουλειά στο Search Console υπάρχει σε κάθε πακέτο. Η έρευνα, το περιεχόμενο και η ορατότητα σε AI ανοίγουν στο Growth. Ο χώρος εργασίας πελατών είναι το πακέτο Agency.",
            )}
          />
          <TieredModuleGrid locale={locale} source="features" detailed />
        </WaveSection>

        <WaveSection id="integrations" shot="integrations" tinted>
          <WaveHeading
            eyebrow={tx("Integrations", "Ενσωματώσεις")}
            title={
              <>
                {tx("Every module, on the same account in ", "Κάθε λειτουργία, με τον ίδιο λογαριασμό, σε ")}
                <WaveAccent>{tx("Chrome, WordPress and AI.", "Chrome, WordPress και AI.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Check pages with the SEO Chrome extension, see Search Console in the WordPress editor, or ask Claude and ChatGPT through the MCP server. Tasks sync back here.",
              "Ελέγξτε σελίδες με την επέκταση SEO για Chrome, δείτε το Search Console μέσα στον editor του WordPress ή ρωτήστε Claude και ChatGPT μέσω του MCP server. Οι εργασίες συγχρονίζονται εδώ.",
            )}
          />
          <IntegrationCards locale={locale} exclude="web" className="mt-12" />
        </WaveSection>

        <WaveStats locale={locale} />
        <WaveFaq
          locale={locale}
          items={FEATURE_FAQ}
          title={
            <>
              {copy.faqTitleBefore}
              <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          lead={copy.faqLead}
        />
        <WaveClose
          locale={locale}
          source="features-band"
          title={
            <>
              {tx("Try every module on ", "Δοκιμάστε κάθε λειτουργία στα ")}
              <WaveAccent>{tx("your own data.", "δικά σας δεδομένα.")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/features" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
