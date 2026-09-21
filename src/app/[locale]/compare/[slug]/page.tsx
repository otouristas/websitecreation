import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPARE_PAGES, getComparePageBySlug } from "@/data/compare-pages";
import { getAppPath } from "@/lib/app-links";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
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
      <Header />
      <main className="blueprint-grid relative z-0 main-below-header pb-20">
        <article className="container max-w-3xl">
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
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
          <h1 className="font-display text-4xl font-medium tracking-[-0.04em] md:text-5xl mb-6">{c.headline}</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{c.summary}</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-[10px] border border-primary/30 bg-primary/5 p-6">
              <h2 className="font-bold text-lg mb-4">When AnotherSEOGuru fits</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.whenChooseUs.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[10px] border border-hairline p-6">
              <h2 className="font-bold text-lg mb-4">When {c.competitorName} may fit</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.whenChooseThem.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-muted-foreground">–</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={getAppPath("/signup")} className="btn btn-primary px-6 py-3" rel="noopener noreferrer">
              Try the platform
            </a>
            <Link href={lp("/platform/features")} className="btn btn-outline px-6 py-3">
              Browse features
            </Link>
            <Link href={lp("/contact")} className="btn btn-outline px-6 py-3">
              Talk to agency
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
