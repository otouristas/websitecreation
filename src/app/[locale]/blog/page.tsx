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
import { getAllBlogPosts, getPillarSummary } from "@/lib/blog";
import { getBlogUi } from "@/lib/i18n/get-dictionary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Section, SectionHeading, Bloom } from "@/components/landing/primitives";
import { PostCard } from "@/components/blog/PostCard";
import { PillarGrid } from "@/components/blog/PillarGrid";
import { BlogProductCta } from "@/components/blog/BlogProductCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const ui = getBlogUi(locale);
  return buildMetadata({
    title: ui.title,
    description: ui.metaDescription,
    path: localizedPath(locale, "/blog"),
    hreflangPath: "/blog",
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === "el";
  const ui = getBlogUi(siteLocale);
  const lp = (path: string) => localizedPath(siteLocale, path);

  const posts = getAllBlogPosts(siteLocale).filter((p) => !p.isPillarHub);
  const pillars = getPillarSummary(siteLocale);
  const [lead, ...rest] = posts;

  const breadcrumbItems = [
    { name: isEl ? "Αρχική" : "Home", url: lp("/") },
    { name: "Blog", url: lp("/blog") },
  ];

  const collectionSchema = generateCollectionPageSchema({
    name: ui.h1,
    description: ui.metaDescription,
    url: `${BASE_URL}${lp("/blog")}`,
    inLanguage: siteLocale,
    items: posts.slice(0, 30).map((p) => ({
      url: `${BASE_URL}${lp(`/blog/${p.slug}`)}`,
      name: p.title,
    })),
  });

  const schemas = combineSchemas(
    collectionSchema,
    generateBreadcrumbSchema({ items: breadcrumbItems }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <section className="relative overflow-hidden">
          <Bloom className="left-1/2 top-[-8rem] h-[26rem] w-[60rem] -translate-x-1/2" />
          <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-12 pt-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <h1 className="rise-in max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl">
              {ui.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {ui.intro}
            </p>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
              {posts.length} {isEl ? "άρθρα" : "articles"} · {pillars.length}{" "}
              {isEl ? "θεματικοί κόμβοι" : "topic hubs"}
            </p>
          </div>
        </section>

        {/* Pillar hubs - the archive's primary navigation */}
        <Section className="pt-4">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Θεματικοί κόμβοι" : "Topic hubs"}
            title={isEl ? "Ξεκινήστε από έναν κόμβο" : "Start with a hub"}
            body={
              isEl
                ? "Κάθε κόμβος συγκεντρώνει τα άρθρα ενός θέματος, από τα βασικά μέχρι τις προχωρημένες τακτικές."
                : "Each hub collects everything on one topic, from the fundamentals through to the advanced tactics."
            }
            className="mb-10"
          />
          <PillarGrid pillars={pillars} locale={siteLocale} />
        </Section>

        {/* Lead article */}
        {lead ? (
          <Section className="pt-0">
            <SectionHeading
              align="left"
              eyebrow={isEl ? "Τελευταίο" : "Latest"}
              title={isEl ? "Νέο στο blog" : "New on the blog"}
              className="mb-10"
            />
            <div className="relative overflow-hidden rounded-[10px] border border-hairline">
              <PostCard post={lead} locale={siteLocale} featured />
            </div>
          </Section>
        ) : null}

        <BlogProductCta locale={siteLocale} />

        {/* All articles */}
        <Section className="pt-0" id="all">
          <SectionHeading
            align="left"
            eyebrow={isEl ? "Αρχείο" : "Archive"}
            title={isEl ? "Όλα τα άρθρα" : "All articles"}
            className="mb-10"
          />
          <div className="grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <div key={post.slug} className="relative">
                <PostCard post={post} locale={siteLocale} />
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
