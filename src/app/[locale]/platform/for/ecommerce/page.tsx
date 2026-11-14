import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, Copy as CopyIcon, FileSearch, MousePointerClick, ShoppingBag, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { DecisionsPanel } from "@/components/kit";
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
} from "@/components/pages/platform-wave/ui";
import {
  HOME_FAQ,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  appLink,
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
    path: "/platform/for/ecommerce",
    title: { en: "SEO for Ecommerce: AnotherSEOGuru App", el: "AnotherSEOGuru App: λογισμικό SEO για e-shop" },
    description: {
      en: "AnotherSEOGuru App for online shops: find category and product pages one fix from page one, rewrite weak snippets and catch decaying pages before they lose sales.",
      el: "Το AnotherSEOGuru App για e-shop: βρείτε σελίδες κατηγοριών και προϊόντων κοντά στην πρώτη σελίδα, διορθώστε αδύναμα snippets και εντοπίστε σελίδες σε πτώση.",
    },
    keyword: { en: "ecommerce SEO software", el: "λογισμικό SEO για e-shop" },
  });
}

const SHOP_MODULES: readonly ModuleId[] = ["opportunities", "keywords", "content", "audit", "competitors", "ai-visibility"];

const ECOMMERCE_FAQ: readonly GscFaqItem[] = [
  {
    q: { en: "Does AnotherSEOGuru App connect to Shopify or WooCommerce?", el: "Συνδέεται το AnotherSEOGuru App με Shopify ή WooCommerce;" },
    a: {
      en: "Not directly. AnotherSEOGuru App works from Google Search Console and Google Analytics 4, which any shop can connect whatever platform it runs on. If your site runs on WordPress, you can also import pages and publish drafts back to it.",
      el: "Όχι απευθείας. Το AnotherSEOGuru App δουλεύει με το Google Search Console και το Google Analytics 4, που μπορεί να συνδέσει κάθε e-shop, σε όποια πλατφόρμα κι αν τρέχει. Αν ο ιστότοπός σας τρέχει σε WordPress, μπορείτε επίσης να εισάγετε σελίδες και να δημοσιεύετε κείμενα πίσω σε αυτόν.",
    },
  },
  {
    q: { en: "Does it show revenue per page?", el: "Δείχνει έσοδα ανά σελίδα;" },
    a: {
      en: "No. AnotherSEOGuru App estimates extra clicks, measured from your own Search Console data, and does not estimate revenue. To estimate sales, you also need your conversion rate and margins.",
      el: "Όχι. Το AnotherSEOGuru App εκτιμά επιπλέον κλικ, με βάση τα δικά σας δεδομένα Search Console, και δεν εκτιμά έσοδα. Για να εκτιμήσετε την αξία τους, χρειάζεστε επίσης το ποσοστό μετατροπής και το περιθώριο κέρδους σας.",
    },
  },
  ...HOME_FAQ.filter((item) => ["How are the click estimates calculated?", "What are credits used for?", "Do I need a credit card to try it?"].includes(item.q.en)),
];

export default async function PlatformForEcommercePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const copy = homeCopy(locale);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For e-commerce", "Για e-shop"), path: "/platform/for/ecommerce" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<AnnouncePill href="#capabilities" tag="E-shop" text={tx("AnotherSEOGuru App for e-commerce", "AnotherSEOGuru App για e-shop")} />}
          title={
            <>
              {tx("Which product or category page", "Ποια σελίδα του e-shop σας")} <WaveAccent>{tx("should you update first?", "αξίζει να βελτιώσετε πρώτα;")}</WaveAccent>
            </>
          }
          lead={tx(
            "A category may appear in hundreds of searches while few shoppers click through. AnotherSEOGuru App finds those pages in your Search Console data, shows the terms shoppers used and estimates the extra clicks a change could bring.",
            "Μια κατηγορία μπορεί να εμφανίζεται συχνά στη Google και παρ’ όλα αυτά να δέχεται λίγα κλικ. Το AnotherSEOGuru App εντοπίζει αυτές τις σελίδες στο Search Console, σας δείχνει τι έψαχναν οι υποψήφιοι πελάτες και εκτιμά πόσα επιπλέον κλικ θα μπορούσε να φέρει μια αλλαγή.",
          )}
          actions={<WaveSoftwareActions locale={locale} source="ecommerce-hero" />}
          trust={<TrustMarks items={copy.trust} yesLabel={copy.markYes} />}
          panel={
            <a href={appLink("/demo/opportunities", locale, "ecommerce-window")} className="block min-w-0">
              <AppPanel
                url="app.anotherseoguru.com/demo/opportunities"
                badge={tx("Sample data", "Δείγμα δεδομένων")}
                caption={tx(
                  "A ranked list of fixes with estimated extra clicks per month, on sample data.",
                  "Λίστα διορθώσεων με σειρά και εκτίμηση επιπλέον κλικ ανά μήνα, σε δείγμα δεδομένων.",
                )}
              >
                <DecisionsPanel locale={locale} details />
              </AppPanel>
            </a>
          }
          panelNote={
            <a href={appLink("/demo/opportunities", locale, "ecommerce-window-link")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
              {tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
            </a>
          }
        />

        <WaveSection id="capabilities" shot="capabilities">
          <WaveHeading
            align="center"
            eyebrow={tx("Where shops lose clicks", "Πού χάνουν κλικ τα e-shop")}
            title={
              <>
                {tx("Five opportunity types, ", "Πέντε είδη ευκαιριών, ")}
                <WaveAccent>{tx("read for a shop.", "για ένα e-shop.")}</WaveAccent>
              </>
            }
            lead={tx(
              "These five checks use the product, category and guide pages in your shop’s Search Console data.",
              "Οι πέντε έλεγχοι βασίζονται στα στοιχεία που έχει το Search Console για τα προϊόντα, τις κατηγορίες και τους οδηγούς αγοράς σας.",
            )}
          />
          <CapabilityGrid
            yesLabel={copy.markYes}
            tiers={[
              {
                id: "close",
                label: tx("Already close", "Ήδη κοντά"),
                items: [
                  {
                    key: "striking",
                    icon: <TrendingUp className="size-5" aria-hidden />,
                    kicker: tx("Striking distance", "Κοντά στην κορυφή"),
                    title: tx("Category pages stuck on positions 4–20", "Σελίδες κατηγοριών κολλημένες στις θέσεις 4–20"),
                    body: tx(
                      "Queries with real demand where a category or product page already ranks, just not high enough to be clicked.",
                      "Αναζητήσεις με πραγματική ζήτηση όπου μια σελίδα κατηγορίας ή προϊόντος ήδη κατατάσσεται, αλλά όχι αρκετά ψηλά για να πάρει κλικ.",
                    ),
                  },
                ],
              },
              {
                id: "click",
                label: tx("The click", "Το κλικ"),
                items: [
                  {
                    key: "ctr",
                    icon: <MousePointerClick className="size-5" aria-hidden />,
                    kicker: tx("Low CTR", "Χαμηλό CTR"),
                    title: tx("Snippets that undersell the product", "Snippets που δεν πουλάνε το προϊόν"),
                    body: tx(
                      "Pages that earn fewer clicks than their position should, usually a title or description worth rewriting.",
                      "Σελίδες που παίρνουν λιγότερα κλικ απ’ όσα δικαιολογεί η θέση τους, συνήθως με τίτλο ή περιγραφή που θέλει ξαναγράψιμο.",
                    ),
                  },
                  {
                    key: "decay",
                    icon: <ArrowDownRight className="size-5" aria-hidden />,
                    kicker: tx("Content decay", "Φθορά περιεχομένου"),
                    title: tx("Guides and seasonal pages losing ground", "Οδηγοί και εποχικές σελίδες που χάνουν έδαφος"),
                    body: tx(
                      "Pages whose clicks and rankings are sliding, flagged while there is still time to refresh them.",
                      "Σελίδες με κλικ και θέσεις σε πτώση, που επισημαίνονται όσο υπάρχει ακόμη χρόνος να ανανεωθούν.",
                    ),
                  },
                ],
              },
              {
                id: "catalogue",
                label: tx("The catalogue", "Ο κατάλογος"),
                items: [
                  {
                    key: "overlap",
                    icon: <CopyIcon className="size-5" aria-hidden />,
                    kicker: tx("Cannibalization", "Ίδια αναζήτηση"),
                    title: tx("Two pages fighting for one query", "Δύο σελίδες για την ίδια αναζήτηση"),
                    body: tx(
                      "When similar category, filter or product pages split the same search, with a plan to merge or separate them.",
                      "Όταν παρόμοιες σελίδες κατηγοριών, φίλτρων ή προϊόντων μοιράζονται την ίδια αναζήτηση, με πλάνο για συγχώνευση ή διαχωρισμό.",
                    ),
                  },
                  {
                    key: "missing",
                    icon: <FileSearch className="size-5" aria-hidden />,
                    kicker: tx("Missing content", "Περιεχόμενο που λείπει"),
                    title: tx("Searches you have no page for", "Αναζητήσεις χωρίς δική τους σελίδα"),
                    body: tx(
                      "Queries you already appear for without a page that answers them, a gap a new category or buying guide can fill.",
                      "Αναζητήσεις στις οποίες ήδη εμφανίζεστε χωρίς σελίδα που να τις απαντά, ένα κενό που καλύπτει μια νέα κατηγορία ή ένας οδηγός αγοράς.",
                    ),
                  },
                  {
                    key: "own",
                    icon: <ShoppingBag className="size-5" aria-hidden />,
                    title: tx("See them on your own shop.", "Δείτε τα στο δικό σας e-shop."),
                    body: tx(
                      "Connect Google read-only. The same five checks run on your Search Console property.",
                      "Συνδέστε τη Google μόνο για ανάγνωση. Οι ίδιοι πέντε έλεγχοι τρέχουν στο δικό σας property του Search Console.",
                    ),
                  },
                ],
              },
            ]}
          />
          <div className="mt-8">
            <WaveSoftwareActions locale={locale} source="ecommerce-types" />
          </div>
        </WaveSection>

        <WaveSection shot="modules" tinted>
          <WaveHeading
            align="center"
            eyebrow={tx("The modules shops use", "Οι λειτουργίες που χρησιμοποιούν τα e-shop")}
            title={
              <>
                {tx("From search demand to ", "Από τη ζήτηση στην αναζήτηση μέχρι ")}
                <WaveAccent>{tx("the category page.", "τη σελίδα κατηγορίας.")}</WaveAccent>
              </>
            }
          />
          <TieredModuleGrid locale={locale} source="ecommerce-tour" ids={SHOP_MODULES} />
        </WaveSection>

        <WaveSection id="pricing" shot="pricing">
          <WaveHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Plans that grow with ", "Πακέτα που μεγαλώνουν μαζί με ")}
                <WaveAccent>{tx("the shop.", "το e-shop.")}</WaveAccent>
              </>
            }
            lead={tx(
              "Content briefs, competitor gaps and AI visibility are on Pro and Agency. Search Console analysis and the opportunity engine never use credits on any plan.",
              "Τα briefs περιεχομένου, τα κενά έναντι ανταγωνιστών και η ορατότητα στην AI υπάρχουν στα Pro και Agency. Η ανάλυση Search Console και η μηχανή ευκαιριών δεν χρεώνουν μονάδες σε κανένα πακέτο.",
            )}
          />
          <PlanPicker locale={locale} source="ecommerce-plans" className="mt-10" />
          <p className="mt-10 text-center text-[14px] text-muted-foreground">
            {tx("Building or rebuilding the shop itself?", "Φτιάχνετε ή ανανεώνετε το ίδιο το e-shop;")}{" "}
            <Link href="https://anotherseoguru.gr/services/eshop-woocommerce" className="font-semibold text-primary hover:text-foreground">
              {tx("WooCommerce store development in Greece", "Κατασκευή e-shop με WooCommerce")}
            </Link>
          </p>
        </WaveSection>

        <WaveStats locale={locale} />
        <WaveAgencyDoor locale={locale} />
        <WaveFaq
          locale={locale}
          items={ECOMMERCE_FAQ}
          title={
            <>
              {copy.faqTitleBefore}
              <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          lead={copy.faqLead}
        />
        <WaveSection shot="others">
          <WaveHeading align="center" title={tx("Not running a shop?", "Δεν έχετε e-shop;")} />
          <PersonaLinks locale={locale} exclude="/platform/for/ecommerce" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </WaveSection>
        <WaveClose locale={locale} source="ecommerce-band" title={<>{copy.finalTitleBefore}<WaveAccent>{copy.finalAccent}</WaveAccent></>} />
        <PlatformLinks locale={locale} current="/platform/for/ecommerce" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
