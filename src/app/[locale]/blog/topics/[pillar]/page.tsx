import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Link from "next/link";
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
import { Layers } from "lucide-react";
import { CtaBand, KitHeading, KitSection, kitSecondaryBtn } from "@/components/kit";
import { PageHero, accentTail } from "@/components/page-kit";
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
        itemType: 'BlogPosting',
      })),
    }),
    generateBreadcrumbSchema({ items: breadcrumbItems }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            href: lp("/blog"),
            kind: "new",
            tag: isEl ? "Θεματικός κόμβος" : "Topic hub",
            text: isEl ? "Όλα τα άρθρα του blog" : "Browse the whole blog",
          }}
          title={accentTail(copy.heading, 1)}
          lead={copy.intro}
          meta={
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand">
              {posts.length} {isEl ? "άρθρα" : "articles"}
            </p>
          }
          actions={null}
          trust={null}
          size="md"
        />

        <KitSection className="!pt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={siteLocale} />
            ))}
          </div>
        </KitSection>

        <BlogProductCta locale={siteLocale} />

        <KitSection>
          <KitHeading
            eyebrow={isEl ? "Άλλοι κόμβοι" : "Other hubs"}
            eyebrowIcon={<Layers />}
            title={accentTail(isEl ? "Συνεχίστε το διάβασμα" : "Keep reading", 1)}
          />
          <div className="mt-10">
            <PillarGrid pillars={pillars} locale={siteLocale} currentSlug={pillar} />
          </div>
          <div className="mt-10 flex justify-center">
            <Link href={lp("/blog")} className={kitSecondaryBtn}>
              {isEl ? "Όλα τα άρθρα" : "All articles"}
            </Link>
          </div>
        </KitSection>

        <CtaBand locale={siteLocale} source="blog-topic-band" />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
