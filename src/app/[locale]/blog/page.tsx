import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
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
import { Archive, Layers, Sparkles } from "lucide-react";
import { CtaBand, KitHeading, KitSection } from "@/components/kit";
import { PageHero, accentTail } from "@/components/page-kit";
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
      itemType: 'BlogPosting',
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
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            href: lp("/glossary"),
            kind: "free",
            tag: isEl ? "Γλωσσάρι" : "Glossary",
            text: isEl ? "Οι όροι του SEO με απλά λόγια" : "Every SEO term in plain words",
          }}
          title={accentTail(ui.h1, isEl ? 2 : 1)}
          lead={ui.intro}
          meta={
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-brand">
              {posts.length} {isEl ? "άρθρα" : "articles"} · {pillars.length} {isEl ? "θεματικοί κόμβοι" : "topic hubs"}
            </p>
          }
          actions={null}
          trust={null}
        />

        {/* Pillar hubs - the archive's primary navigation */}
        <KitSection className="!pt-14">
          <KitHeading
            eyebrow={isEl ? "Θεματικοί κόμβοι" : "Topic hubs"}
            eyebrowIcon={<Layers />}
            title={accentTail(isEl ? "Ξεκινήστε από έναν κόμβο" : "Start with a hub", 1)}
            description={
              isEl
                ? "Κάθε κόμβος συγκεντρώνει τα άρθρα ενός θέματος, από τα βασικά μέχρι τις προχωρημένες τακτικές."
                : "Each hub collects everything on one topic, from the fundamentals through to the advanced tactics."
            }
          />
          <div className="mt-10">
            <PillarGrid pillars={pillars} locale={siteLocale} />
          </div>

          {/* Lead article */}
          {lead ? (
            <div className="mt-24">
              <KitHeading
                eyebrow={isEl ? "Τελευταίο" : "Latest"}
                eyebrowIcon={<Sparkles />}
                title={isEl ? "Νέο στο blog" : "New on the blog"}
              />
              <div className="mt-10">
                <PostCard post={lead} locale={siteLocale} featured />
              </div>
            </div>
          ) : null}
        </KitSection>

        <BlogProductCta locale={siteLocale} />

        {/* All articles */}
        <KitSection id="all">
          <KitHeading eyebrow={isEl ? "Αρχείο" : "Archive"} eyebrowIcon={<Archive />} title={isEl ? "Όλα τα άρθρα" : "All articles"} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} locale={siteLocale} />
            ))}
          </div>
        </KitSection>

        <CtaBand locale={siteLocale} source="blog-band" />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
