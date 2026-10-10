import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPARE_PAGES, getComparePageBySlug } from "@/data/compare-pages";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { Check, Minus } from "lucide-react";
import { CtaBand, KitSection, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import { ChipLinks, PageHero, accentTail } from "@/components/page-kit";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateSoftwareApplicationSchema, combineSchemas, BASE_URL } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return COMPARE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getComparePageBySlug(slug);
  if (!c) {
    return {};
  }
  return buildMetadata({
    title: c.headline,
    description: c.summary,
    path: localizedPath(locale as SiteLocale, `/compare/${c.slug}`),
    canonicalPath: localizedPath("en", `/compare/${c.slug}`),
    primaryKeyword: `SEO software vs ${c.competitorName}`,
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = getComparePageBySlug(slug);
  if (!c) {
    notFound();
  }
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  // The comparison pages sat one level under a hub that did not exist, with a
  // hand-rolled two-item trail and no BreadcrumbList at all.
  const breadcrumbItems = [
    { name: "Home", url: lp("/") },
    { name: "Compare", url: lp("/compare") },
    { name: c.competitorName, url: lp(`/compare/${c.slug}`) },
  ];

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        {/*
          Our own product, declared. The page compares two tools and said
          nothing structured about either.

          Only our side is marked up. Emitting a SoftwareApplication for a
          competitor would mean publishing claims about their feature set and
          licensing that we cannot verify and that go stale the moment they
          ship, and the prose below is already careful to describe where they
          fit rather than score them. A comparison table of unverifiable
          competitor specs would read as more rigorous and be less true.
        */}
        <SchemaMarkup
          schemas={combineSchemas(
            generateBreadcrumbSchema({ items: breadcrumbItems }),
            generateSoftwareApplicationSchema({
              name: "AnotherSEOGuru",
              description: c.summary,
              url: `${BASE_URL}${localizedPath("en", "/platform")}`,
            }),
          )}
        />
        <PageHero
          locale="en"
          breadcrumbs={breadcrumbItems}
          pill={{ href: lp("/compare"), kind: "save", tag: "Compare", text: "All comparisons" }}
          title={accentTail(c.headline, c.competitorName.split(" ").length)}
          lead={c.summary}
          size="md"
          actions={<SoftwareCtas locale="en" source={`compare-${c.slug}`} />}
          trust={<TrustLine items={softwareTrust("en")} />}
        />

        <KitSection className="!pt-14">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/35 bg-primary/5 p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">When AnotherSEOGuru fits</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                {c.whenChooseUs.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-hairline bg-surface/70 p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">When {c.competitorName} may fit</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                {c.whenChooseThem.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Minus className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ChipLinks
            align="center"
            className="mt-10"
            items={[
              { href: lp("/platform/features"), label: "Browse features" },
              { href: lp("/contact"), label: "Talk to agency" },
              { href: lp("/compare"), label: "All comparisons" },
            ]}
          />
        </KitSection>

        <CtaBand locale="en" source={`compare-${c.slug}-band`} />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
