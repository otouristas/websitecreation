import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  combineSchemas,
  BASE_URL,
} from "@/lib/seo/schema";
import { getPostsByPillar, getPillarSummary, getAllPillarSlugs } from "@/lib/blog";
import { BLOG_PILLARS, getPillarCopy } from "@/data/blog-pillars";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Section, SectionHeading, Bloom, GhostButtonLink } from "@/components/landing/primitives";
import { PostCard } from "@/components/blog/PostCard";
import { PillarGrid } from "@/components/blog/PillarGrid";
import { BlogProductCta } from "@/components/blog/BlogProductCta";

/**
 * Blog pillar hub.
 *
 * The `pillar` frontmatter field already grouped posts, but nothing surfaced
 * it - hubs never linked down to spokes and spokes never linked up. These six
 * pages turn each pillar into a real aggregation surface.
 *
 * Lives under `/blog/topics/` rather than `/blog/` because Next.js forbids two
 * differently-named dynamic segments at the same path level (`[pillar]` and the
 * existing post `[slug]`).
 */
export function generateStaticParams(): { pillar: string }[] {
  return getAllPillarSlugs().map((pillar) => ({ pillar }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pillar: string }>;
}): Promise<Metadata> {
  const { locale, pillar } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = getPillarCopy(pillar, locale);
  if (!copy) return {};
  return buildMetadata({
    title: copy.title,
    description: copy.intro,
    path: localizedPath(locale, `/blog/topics/${pillar}`),
    hreflangPath: `/blog/topics/${pillar}`,
  });
}

export default async function PillarHubPage({
  params,
}: {
  params: Promise<{ locale: string; pillar: string }>;
}) {
  const { locale, pillar } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);

  const copy = getPillarCopy(pillar, siteLocale);
  const known = BLOG_PILLARS.some((p) => p.slug === pillar);
  if (!copy || !known) notFound();

  const posts = getPostsByPillar(pillar, siteLocale);
  if (posts.length === 0) notFound();

  const pillars = getPillarSummary(siteLocale);

  const breadcrumbItems = [
    { name: isEl ? "Αρχική" : "Home", url: lp("/") },
    { name: "Blog", url: lp("/blog") },
    { name: copy.title, url: lp(`/blog/topics/${pillar}`) },
  ];

  const schemas = combineSchemas(
    generateCollectionPageSchema({
      name: copy.heading,
      description: copy.intro,
      url: `${BASE_URL}${lp(`/blog/topics/${pillar}`)}`,
      inLanguage: siteLocale,
      items: posts.map((p) => ({
        url: `${BASE_URL}${lp(`/blog/${p.slug}`)}`,
        name: p.title,
      })),
    }),
    generateBreadcrumbSchema({ items: breadcrumbItems }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <section className="relative overflow-hidden">
          <Bloom className="left-1/2 top-[-8rem] h-[26rem] w-[56rem] -translate-x-1/2" />
          <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-12 pt-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              {isEl ? "Θεματικός κόμβος" : "Topic hub"}
            </span>
            <h1 className="rise-in mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
              {copy.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {copy.intro}
            </p>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {posts.length} {isEl ? "άρθρα" : "articles"}
            </p>
          </div>
        </section>

        <Section className="pt-4">
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.slug} className="relative">
                <PostCard post={post} locale={siteLocale} />
              </div>
            ))}
          </div>
        </Section>

        <BlogProductCta locale={siteLocale} />

        <Section className="pt-0">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Άλλοι κόμβοι" : "Other hubs"}
            title={isEl ? "Συνεχίστε το διάβασμα" : "Keep reading"}
            className="mb-10"
          />
          <PillarGrid pillars={pillars} locale={siteLocale} currentSlug={pillar} />
          <div className="mt-10">
            <GhostButtonLink href={lp("/blog")}>
              {isEl ? "Όλα τα άρθρα" : "All articles"}
            </GhostButtonLink>
          </div>
        </Section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
