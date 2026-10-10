import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Layers, LineChart, Plane, Search, Target, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getIndustriesForLocale, TOURISM_INDUSTRY_SLUGS } from "@/data/industries";
import { industriesEl } from "@/data/industries-i18n";
import { services } from "@/data/services";
import { getServiceEl } from "@/data/services-i18n";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  combineSchemas,
  BASE_URL,
} from "@/lib/seo/schema";
import { generateBreadcrumbs } from "@/lib/linking";
import {
  Accent,
  AiVisibilityPreview,
  CheckList,
  Container,
  CtaBand,
  DecisionsPanel,
  FeatureRow,
  KitHeading,
  KitSection,
  LocalPackPreview,
  Stage,
  ValueTrio,
} from "@/components/kit";
import { CardGrid, ChipLinks, LinkCard, PageHero } from "@/components/page-kit";
import { PROJECT_COUNT } from "@/data/company-facts";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === "el";

  return buildMetadata({
    title: isEl ? "Λύσεις SEO & Ιστοσελίδων ανά Κλάδο" : "SEO & Website Solutions by Industry",
    description: isEl
      ? "Ιστοσελίδες και SEO ανά κλάδο: ξενοδοχεία, ενοικίαση αυτοκινήτου, τουρισμός, εστίαση και υπηρεσίες. Στρατηγική με βάση τη ζήτηση του κλάδου σας."
      : "Websites and SEO by industry: hotels, rent-a-car, tourism, restaurants and service businesses. Strategy built around the demand in your sector.",
    path: localizedPath(locale, "/solutions"),
    hreflangPath: "/solutions",
    primaryKeyword: isEl ? "λύσεις ανά κλάδο" : "industry solutions",
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: isEl ? "Λύσεις" : "Solutions", url: "/solutions" }],
    siteLocale,
  );

  // US-only verticals (DUI lawyers, personal injury...) are left out of /el.
  const named = getIndustriesForLocale(siteLocale).map((i) => ({
    ...i,
    displayName: isEl ? industriesEl[i.slug]?.name ?? i.name : i.name,
    displayDescription: isEl
      ? industriesEl[i.slug]?.description ?? i.description
      : i.description,
    displayPainPoints: isEl
      ? industriesEl[i.slug]?.painPoints ?? i.painPoints
      : i.painPoints,
  }));

  // Tourism is where the portfolio proof lives, so it leads. Everything else
  // keeps its own indexable page and is listed in full below.
  const tourism = named.filter((i) => TOURISM_INDUSTRY_SLUGS.includes(i.slug as never));
  const rest = named.filter((i) => !TOURISM_INDUSTRY_SLUGS.includes(i.slug as never));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateCollectionPageSchema({
      name: isEl ? "Λύσεις ανά κλάδο" : "Solutions by industry",
      url: `${BASE_URL}${lp("/solutions")}`,
      inLanguage: siteLocale,
      items: named.map((i) => ({
        url: `${BASE_URL}${lp(`/solutions/${i.slug}`)}`,
        name: i.displayName,
        itemType: 'WebPage',
      })),
    }),
  );

  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            href: lp("/solutions/hotels"),
            kind: "popular",
            tag: tx("Hotels", "Ξενοδοχεία"),
            text: tx("SEO for more direct bookings", "SEO για περισσότερες απευθείας κρατήσεις"),
          }}
          title={
            <>
              {tx("Solutions by", "Λύσεις ανά")} <Accent>{tx("industry", "κλάδο")}</Accent>
            </>
          }
          lead={
            isEl
              ? `Η ζήτηση αναζήτησης διαφέρει ριζικά ανά κλάδο. Έχουμε παραδώσει ${PROJECT_COUNT} έργα, με το μεγαλύτερο βάθος σε τουρισμό και φιλοξενία.`
              : `Search demand differs sharply by sector. We have delivered ${PROJECT_COUNT} projects, with the most depth in tourism and hospitality.`
          }
        >
          <Container className="mt-14">
            <div className="grid gap-4 lg:grid-cols-2">
              <Stage>
                <LocalPackPreview locale={siteLocale} />
              </Stage>
              <Stage className="hidden lg:block">
                <AiVisibilityPreview locale={siteLocale} />
              </Stage>
            </div>
            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              {tx("Sample data for a Paros hotel, the kind of view every client gets.", "Δείγμα δεδομένων για ξενοδοχείο στην Πάρο, η εικόνα που παίρνει κάθε πελάτης.")}{" "}
              <Link href={lp("/work")} className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground">
                {isEl ? "Δείτε τα Έργα μας" : "View Our Work"}
              </Link>
            </p>
          </Container>
        </PageHero>

        <KitSection>
          <KitHeading
            eyebrow={isEl ? "Εξειδίκευση" : "Where we are strongest"}
            eyebrowIcon={<Plane />}
            title={
              <>
                {tx("Tourism and", "Τουρισμός και")} <Accent>{tx("hospitality", "φιλοξενία")}</Accent>
              </>
            }
            description={
              isEl
                ? "Εδώ βρίσκεται το μεγαλύτερο μέρος του portfolio μας: εποχικότητα, πολυγλωσσικά sites, απευθείας κρατήσεις και ανταγωνισμός με τα OTAs."
                : "This is where most of our portfolio sits: seasonality, multilingual sites, direct bookings and competing with the OTAs."
            }
          />
          <CardGrid className="mt-12">
            {tourism.map((industry) => (
              <LinkCard
                key={industry.slug}
                as="h2"
                href={lp(`/solutions/${industry.slug}`)}
                title={industry.displayName}
                text={industry.displayDescription}
                badge={industry.slug === "hotels" ? { kind: "popular", label: tx("Popular", "Δημοφιλές") } : undefined}
              >
                <CheckList size="sm" className="mt-5 border-t border-hairline pt-4" items={industry.displayPainPoints.slice(0, 3)} />
              </LinkCard>
            ))}
          </CardGrid>
        </KitSection>

        <KitSection tinted>
          <KitHeading
            eyebrow={isEl ? "Και ακόμη" : "Also covered"}
            eyebrowIcon={<Layers />}
            title={
              <>
                {tx("Other", "Υπόλοιποι")} <Accent>{tx("industries", "κλάδοι")}</Accent>
              </>
            }
            description={
              isEl
                ? "Η ίδια μεθοδολογία εφαρμόζεται και εδώ: ανάλυση ζήτησης, τεχνικά θεμέλια, περιεχόμενο και μετρήσιμα leads."
                : "The same method applies here: demand analysis, technical foundations, content and measurable leads."
            }
          />
          <ValueTrio
            className="mt-12"
            items={[
              {
                icon: Search,
                title: tx("Demand analysis", "Ανάλυση ζήτησης"),
                text: tx(
                  "What your customers actually type, in which language and season, before any page is planned.",
                  "Τι πληκτρολογούν πραγματικά οι πελάτες σας, σε ποια γλώσσα και εποχή, πριν σχεδιαστεί οποιαδήποτε σελίδα.",
                ),
              },
              {
                icon: Wrench,
                title: tx("Technical foundations", "Τεχνικά θεμέλια"),
                text: tx(
                  "Fast pages, clean indexing and schema, so the work that follows can rank.",
                  "Γρήγορες σελίδες, σωστή ευρετηρίαση και schema, ώστε ό,τι ακολουθεί να μπορεί να κατατάσσεται.",
                ),
              },
              {
                icon: LineChart,
                title: tx("Content and measurable leads", "Περιεχόμενο και μετρήσιμα leads"),
                text: tx(
                  "Pages written for the searches that bring enquiries, tracked through to the call or form.",
                  "Σελίδες για τις αναζητήσεις που φέρνουν αιτήματα, με μέτρηση μέχρι το τηλέφωνο ή τη φόρμα.",
                ),
              },
            ]}
          />
          <ul className="mt-14 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={lp(`/solutions/${industry.slug}`)}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-hairline bg-background/60 px-4 py-3.5 transition-colors hover:border-brand/40 hover:bg-surface"
                >
                  <span className="text-[14.5px] font-medium leading-snug text-foreground">{industry.displayName}</span>
                  <ArrowUpRight
                    className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </KitSection>

        <KitSection>
          <FeatureRow
            eyebrow={isEl ? "Υπηρεσίες" : "Services"}
            eyebrowIcon={<Target />}
            title={
              <>
                {tx("What we apply in", "Τι εφαρμόζουμε σε")} <Accent>{tx("every sector", "κάθε κλάδο")}</Accent>
              </>
            }
            body={tx(
              "Every engagement starts from the same short list: the fixes that bring the most customers, ranked by what they are worth to you.",
              "Κάθε συνεργασία ξεκινά από την ίδια σύντομη λίστα: τις διορθώσεις που φέρνουν τους περισσότερους πελάτες, με σειρά βάσει αξίας.",
            )}
            links={[{ href: lp("/pricing"), label: isEl ? "Δείτε τις Τιμές" : "View Pricing", primary: true }]}
            preview={
              <Stage>
                <DecisionsPanel locale={siteLocale} />
              </Stage>
            }
          />
          <ChipLinks
            className="mt-14"
            items={services.map((s) => {
              const el = isEl ? getServiceEl(s.slug) : null;
              return { href: lp(`/services/${s.slug}`), label: el?.shortName ?? el?.name ?? s.shortName };
            })}
          />
        </KitSection>

        <CtaBand
          locale={siteLocale}
          source="solutions-band"
          title={
            <>
              {tx("Sector not", "Ο κλάδος σας δεν είναι")} <Accent>{tx("on the list?", "στη λίστα;")}</Accent>
            </>
          }
          description={
            isEl
              ? "Η μεθοδολογία δεν αλλάζει. Πείτε μας τι κάνετε και σε ποια αγορά, και θα δούμε αν υπάρχει πραγματική ζήτηση αναζήτησης να αξιοποιήσουμε."
              : "The method does not change. Tell us what you do and which market, and we will look at whether there is real search demand to work with."
          }
        />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
