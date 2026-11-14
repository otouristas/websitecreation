import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { SampleWindow } from "@/components/pages/home/SampleWindow";
import { homeCopy } from "@/components/pages/home/copy";
import { TieredModuleGrid } from "@/components/pages/platform-wave/modules";
import { WorkspacePreview } from "@/components/pages/platform-wave/WorkspacePreview";
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
              href={localizedPath(locale, "/")}
              tag={tx("Features", "Δυνατότητες")}
              text={tx("AnotherSEOGuru App", "AnotherSEOGuru App")}
            />
          }
          title={
            <>
              {tx("See which pages", "Ποιες σελίδες σας")} <WaveAccent>{tx("need your attention", "χρειάζονται δουλειά;")}</WaveAccent>
            </>
          }
          lead={tx(
            "Connect Google Search Console to see which pages are losing clicks and which searches could bring more visitors. Choose a fix, track the work and check the numbers after you publish. This part of AnotherSEOGuru App is included on every plan.",
            "Συνδέστε το Google Search Console για να δείτε ποιες σελίδες χάνουν κλικ και ποιες αναζητήσεις θα μπορούσαν να φέρουν περισσότερους επισκέπτες. Επιλέξτε από πού θα ξεκινήσετε και δείτε πώς άλλαξαν τα κλικ μετά τη διόρθωση. Αυτές οι δυνατότητες περιλαμβάνονται σε όλα τα πακέτα του AnotherSEOGuru App.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="features-hero" />}
          trust={<TrustMarks items={[copy.trust[0], tx("No credit card for the demo", "Χωρίς κάρτα για την επίδειξη"), tx("Cancel anytime", "Ακύρωση οποτεδήποτε")]} yesLabel={copy.markYes} />}
          panel={<SampleWindow copy={copy} />}
          panelNote={copy.sampleCaption}
        />

        <WorkspacePreview locale={locale} />

        <WaveSection shot="capabilities">
          <WaveHeading
            align="center"
            eyebrow={tx("Capabilities", "Δυνατότητες")}
            title={
              <>
                {tx("Which tools come with ", "Ποια εργαλεία περιλαμβάνει ")}
                <WaveAccent>{tx("each plan?", "κάθε πακέτο;")}</WaveAccent>
              </>
            }
            lead={tx(
              "Every plan includes Search Console analysis. Choose Pro for keyword research, content tools and AI visibility, or Agency for client work and branded reports. You can see the credit cost of a paid action before you run it.",
              "Όλα τα πακέτα περιλαμβάνουν ανάλυση Search Console. Το Pro προσθέτει έρευνα λέξεων-κλειδιών, εργαλεία περιεχομένου και έλεγχο ορατότητας σε AI. Με το Agency διαχειρίζεστε πελάτες και στέλνετε αναφορές με το λογότυπό σας. Πριν από κάθε ενέργεια που χρεώνεται, βλέπετε πόσες μονάδες απαιτεί.",
            )}
          />
          <TieredModuleGrid locale={locale} source="features" detailed />
        </WaveSection>

        <WaveSection id="integrations" shot="integrations" tinted>
          <WaveHeading
            eyebrow={tx("Integrations", "Ενσωματώσεις")}
            title={
              <>
                {tx("Connect your account to ", "Σύνδεση του λογαριασμού σας με ")}
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
              {tx("Find a first task for ", "Βρείτε την πρώτη βελτίωση για ")}
              <WaveAccent>{tx("your site", "τον ιστότοπό σας")}</WaveAccent>
            </>
          }
        />
        <PlatformLinks locale={locale} current="/platform/features" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
