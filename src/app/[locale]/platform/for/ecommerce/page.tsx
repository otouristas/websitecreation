import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, Copy as CopyIcon, FileSearch, MousePointerClick, ShoppingBag, TrendingUp, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import {
  Accent,
  AppWindow,
  Container,
  CtaBand,
  DecisionsPanel,
  HeroCentered,
  KitEyebrow,
  KitHeading,
  KitSection,
  SoftwareCtas,
  TrustLine,
  softwareTrust,
} from "@/components/kit";
import {
  AgencyCrossSell,
  GscFaq,
  HOME_FAQ,
  ModuleTour,
  PersonaLinks,
  PlanPicker,
  PlatformLinks,
  appLink,
  platformBreadcrumbs,
  platformMetadata,
  type Copy,
  type GscFaqItem,
} from "@/components/gsc-boost";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/for/ecommerce",
    title: { en: "SEO Platform for Ecommerce: GSC Boost", el: "GSC Boost: λογισμικό SEO για e-shop" },
    description: {
      en: "GSC Boost for online shops: find category and product pages one fix from page one, rewrite weak snippets and catch decaying pages before they lose sales.",
      el: "Το GSC Boost για e-shop: βρείτε σελίδες κατηγοριών και προϊόντων κοντά στην πρώτη σελίδα, διορθώστε αδύναμα snippets και εντοπίστε σελίδες σε πτώση.",
    },
    keyword: { en: "ecommerce SEO software", el: "λογισμικό SEO για e-shop" },
  });
}

/** The app's five opportunity types, read the way a shop sees them. */
const SHOP_OPPORTUNITIES: ReadonlyArray<{ icon: LucideIcon; tag: Copy; title: Copy; text: Copy }> = [
  {
    icon: TrendingUp,
    tag: { en: "Striking distance", el: "Κοντά στην κορυφή" },
    title: { en: "Category pages stuck on positions 4–20", el: "Σελίδες κατηγοριών κολλημένες στις θέσεις 4–20" },
    text: {
      en: "Queries with real demand where a category or product page already ranks, just not high enough to be clicked.",
      el: "Αναζητήσεις με πραγματική ζήτηση όπου μια σελίδα κατηγορίας ή προϊόντος ήδη κατατάσσεται, αλλά όχι αρκετά ψηλά για να πάρει κλικ.",
    },
  },
  {
    icon: MousePointerClick,
    tag: { en: "Low CTR", el: "Χαμηλό CTR" },
    title: { en: "Snippets that undersell the product", el: "Snippets που δεν πουλάνε το προϊόν" },
    text: {
      en: "Pages that earn fewer clicks than their position should, usually a title or description worth rewriting.",
      el: "Σελίδες που παίρνουν λιγότερα κλικ απ’ όσα δικαιολογεί η θέση τους, συνήθως με τίτλο ή περιγραφή που θέλει ξαναγράψιμο.",
    },
  },
  {
    icon: ArrowDownRight,
    tag: { en: "Content decay", el: "Φθορά περιεχομένου" },
    title: { en: "Guides and seasonal pages losing ground", el: "Οδηγοί και εποχικές σελίδες που χάνουν έδαφος" },
    text: {
      en: "Pages whose clicks and rankings are sliding, flagged while there is still time to refresh them.",
      el: "Σελίδες με κλικ και θέσεις σε πτώση, που επισημαίνονται όσο υπάρχει ακόμη χρόνος να ανανεωθούν.",
    },
  },
  {
    icon: CopyIcon,
    tag: { en: "Cannibalization", el: "Κανιβαλισμός" },
    title: { en: "Two pages fighting for one query", el: "Δύο σελίδες για την ίδια αναζήτηση" },
    text: {
      en: "When similar category, filter or product pages split the same search, with a plan to merge or separate them.",
      el: "Όταν παρόμοιες σελίδες κατηγοριών, φίλτρων ή προϊόντων μοιράζονται την ίδια αναζήτηση, με πλάνο για συγχώνευση ή διαχωρισμό.",
    },
  },
  {
    icon: FileSearch,
    tag: { en: "Missing content", el: "Περιεχόμενο που λείπει" },
    title: { en: "Searches you have no page for", el: "Αναζητήσεις χωρίς δική τους σελίδα" },
    text: {
      en: "Queries you already appear for without a page that answers them, a gap a new category or buying guide can fill.",
      el: "Αναζητήσεις στις οποίες ήδη εμφανίζεστε χωρίς σελίδα που να τις απαντά, ένα κενό που καλύπτει μια νέα κατηγορία ή ένας οδηγός αγοράς.",
    },
  },
];

const ECOMMERCE_FAQ: ReadonlyArray<GscFaqItem> = [
  {
    q: { en: "Does GSC Boost connect to Shopify or WooCommerce?", el: "Συνδέεται το GSC Boost με Shopify ή WooCommerce;" },
    a: {
      en: "Not directly. GSC Boost works from Google Search Console and Google Analytics 4, which any shop can connect whatever platform it runs on. If your site runs on WordPress, you can also import pages and publish drafts back to it.",
      el: "Όχι απευθείας. Το GSC Boost δουλεύει με το Google Search Console και το Google Analytics 4, που μπορεί να συνδέσει κάθε e-shop, σε όποια πλατφόρμα κι αν τρέχει. Αν ο ιστότοπός σας τρέχει σε WordPress, μπορείτε επίσης να εισάγετε σελίδες και να δημοσιεύετε κείμενα πίσω σε αυτόν.",
    },
  },
  {
    q: { en: "Does it show revenue per page?", el: "Δείχνει έσοδα ανά σελίδα;" },
    a: {
      en: "No. GSC Boost estimates extra clicks, measured from your own Search Console data, and does not estimate revenue. Clicks are the part SEO controls; what they are worth depends on your conversion rate and margins.",
      el: "Όχι. Το GSC Boost εκτιμά επιπλέον κλικ, με βάση τα δικά σας δεδομένα Search Console, και δεν εκτιμά έσοδα. Τα κλικ είναι το κομμάτι που ελέγχει το SEO· η αξία τους εξαρτάται από το ποσοστό μετατροπής και τα περιθώριά σας.",
    },
  },
  ...HOME_FAQ.filter((f) => ["How are the click estimates calculated?", "What are credits used for?", "Do I need a credit card to try it?"].includes(f.q.en)),
];

/**
 * GSC Boost for e-commerce. Honest by construction: it maps the app's real
 * opportunity types and modules onto shop pages and claims no shop-platform
 * integration or revenue figure the app does not have.
 */
export default async function PlatformForEcommercePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (p: string) => localizedPath(locale, p);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("For e-commerce", "Για e-shop"), path: "/platform/for/ecommerce" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<ShoppingBag />}>{tx("GSC Boost for e-commerce", "GSC Boost για e-shop")}</KitEyebrow>}
          title={
            <>
              {tx("Find the shop pages", "Βρείτε τις σελίδες του e-shop")} <Accent>{tx("one fix from page one", "μία διόρθωση πριν την πρώτη σελίδα")}</Accent>
            </>
          }
          lead={tx(
            "GSC Boost is SEO software that reads your shop’s Search Console data and ranks the fixes worth making: category pages on positions 4–20, product snippets that earn fewer clicks than they should, guides losing traffic and searches you have no page for, each with an estimate of the extra clicks.",
            "Το GSC Boost είναι λογισμικό SEO που διαβάζει τα δεδομένα Search Console του e-shop σας και βάζει σε σειρά τις διορθώσεις που αξίζουν: σελίδες κατηγοριών στις θέσεις 4–20, snippets προϊόντων με λιγότερα κλικ απ’ όσα θα έπρεπε, οδηγούς που χάνουν κίνηση και αναζητήσεις χωρίς σελίδα, με εκτίμηση των επιπλέον κλικ.",
          )}
          actions={<SoftwareCtas locale={locale} source="ecommerce-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        >
          <div className="mx-auto mt-14 w-full max-w-[880px] px-3 sm:px-6">
            <AppWindow
              href={appLink("/demo/opportunities", locale, "ecommerce-window")}
              ctaLabel={tx("Explore the live demo", "Δείτε τη ζωντανή επίδειξη")}
              label={tx(
                "A ranked list of fixes with estimated extra clicks per month, on sample data.",
                "Λίστα διορθώσεων με σειρά και εκτίμηση επιπλέον κλικ ανά μήνα, σε δείγμα δεδομένων.",
              )}
              badge={
                <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {tx("Sample data", "Δείγμα δεδομένων")}
                </span>
              }
            >
              <div className="p-3 sm:p-6">
                <DecisionsPanel locale={locale} details />
              </div>
            </AppWindow>
          </div>
        </HeroCentered>

        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx("Where shops lose clicks", "Πού χάνουν κλικ τα e-shop")}
            title={
              <>
                {tx("Five opportunity types,", "Πέντε είδη ευκαιριών,")} <Accent>{tx("read for a shop", "για ένα e-shop")}</Accent>
              </>
            }
            description={tx(
              "The opportunity engine scans every query and page in Search Console for the same five things on any site. On a shop they usually look like this.",
              "Η μηχανή ευκαιριών σαρώνει κάθε αναζήτηση και σελίδα του Search Console για τα ίδια πέντε πράγματα σε κάθε ιστότοπο. Σε ένα e-shop συνήθως μοιάζουν κάπως έτσι.",
            )}
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_OPPORTUNITIES.map(({ icon: Icon, tag, title, text }) => (
              <li key={tag.en} className="reveal flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{tag[locale]}</span>
                </div>
                <h3 className="mt-4 text-[16.5px] font-semibold text-foreground">{title[locale]}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{text[locale]}</p>
              </li>
            ))}
            <li className="reveal flex flex-col justify-center rounded-2xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] p-6">
              <p className="text-[15px] font-semibold text-foreground">
                {tx("See them on your own shop.", "Δείτε τα στο δικό σας e-shop.")}
              </p>
              <SoftwareCtas locale={locale} align="left" source="ecommerce-types" className="mt-5 sm:!flex-col sm:!items-stretch" />
            </li>
          </ul>
        </KitSection>

        <section className="border-t border-hairline py-20 sm:py-28">
          <Container>
            <KitHeading
              align="center"
              eyebrow={tx("The modules shops use", "Οι λειτουργίες που χρησιμοποιούν τα e-shop")}
              title={
                <>
                  {tx("From search demand to", "Από τη ζήτηση στην αναζήτηση μέχρι")} <Accent>{tx("the category page", "τη σελίδα κατηγορίας")}</Accent>
                </>
              }
            />
            <ModuleTour
              locale={locale}
              ids={["opportunities", "keywords", "content", "audit", "competitors", "ai-visibility"]}
              source="ecommerce-tour"
              className="mt-20"
            />
          </Container>
        </section>

        <KitSection id="pricing" tinted>
          <KitHeading
            align="center"
            eyebrow={tx("Pricing", "Τιμές")}
            title={
              <>
                {tx("Plans that grow with", "Πακέτα που μεγαλώνουν μαζί με")} <Accent>{tx("the shop", "το e-shop")}</Accent>
              </>
            }
            description={tx(
              "Content briefs, competitor gaps and AI visibility are on Growth and Agency. Search Console analysis and the opportunity engine never use credits on any plan.",
              "Τα briefs περιεχομένου, τα κενά έναντι ανταγωνιστών και η ορατότητα στην AI υπάρχουν στα Growth και Agency. Η ανάλυση Search Console και η μηχανή ευκαιριών δεν χρεώνουν μονάδες σε κανένα πακέτο.",
            )}
          />
          <PlanPicker locale={locale} source="ecommerce-plans" className="mt-10" />
          <p className="mt-10 text-center text-[14px] text-muted-foreground">
            {tx("Building or rebuilding the shop itself?", "Φτιάχνετε ή ανανεώνετε το ίδιο το e-shop;")}{" "}
            <Link href={lp("/services/eshop-woocommerce")} className="font-medium text-link hover:underline">
              {tx("Our e-shop service", "Η υπηρεσία μας για e-shop")}
            </Link>
          </p>
        </KitSection>

        <AgencyCrossSell locale={locale} />
        <GscFaq locale={locale} items={ECOMMERCE_FAQ} />

        <KitSection className="border-t border-hairline">
          <KitHeading align="center" title={tx("Not running a shop?", "Δεν έχετε e-shop;")} />
          <PersonaLinks locale={locale} exclude="/platform/for/ecommerce" className="mx-auto mt-10 max-w-3xl md:!grid-cols-2" />
        </KitSection>

        <CtaBand locale={locale} source="ecommerce-band" />
        <PlatformLinks locale={locale} current="/platform/for/ecommerce" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
