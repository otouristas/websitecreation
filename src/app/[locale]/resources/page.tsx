import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Block } from "@/data/help";
import { OPPORTUNITY_FINDER, RESOURCE_ARTICLES, RESOURCE_CLUSTERS, clusterArticles, findResource, resourcePath } from "@/data/resources";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { getAllBlogPosts } from "@/lib/blog";
import { glossaryPath } from "@/lib/docs/glossary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "Free SEO Resources & Search Console Guides",
    description:
      "Free SEO resources built on Search Console data: guides to analysis, traffic drops, forecasting and reporting, a free opportunity finder, AI search frameworks and the SEO glossary.",
    path: localizedPath(locale as SiteLocale, "/resources"),
    canonicalPath: localizedPath("en", "/resources"),
    primaryKeyword: "SEO resources",
  });
}

/** Resources are English-only (see EN_ONLY_SECTIONS); /el/resources redirects here. */
export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath("en", path);
  const posts = getAllBlogPosts().filter((p) => p.locale === "en").slice(0, 12);

  const blocks: Block[] = [
    {
      type: "p",
      text: "Practical guides for turning Google Search Console data into growth: how to read it, how to diagnose a drop, how to size and prioritize fixes, and how to report the results. Each topic starts with a guide that covers it end to end, then goes deeper.",
    },
    { type: "h2", id: "free-tool", text: "Free tool" },
    {
      type: "cards",
      cols: 2,
      items: [
        { title: OPPORTUNITY_FINDER.title, text: "Upload your Search Console export and get the queries worth pushing, the snippets worth rewriting and a click forecast. Runs in your browser, no sign-up.", href: resourcePath(OPPORTUNITY_FINDER.slug), icon: "wrench" },
        { title: "AI visibility check", text: "See what Google's AI Overview and ChatGPT answer for one keyword, and who they cite.", href: lp("/ai-visibility-check"), icon: "bot" },
      ],
    },
    ...RESOURCE_CLUSTERS.flatMap((cluster): Block[] => {
      const pillar = findResource(cluster.pillar);
      const articles = clusterArticles(cluster.id).filter((a) => a.kind !== "pillar");
      return [
        { type: "h2", id: cluster.id, text: cluster.title },
        { type: "p", text: cluster.summary },
        {
          type: "cards",
          cols: 3,
          items: [
            pillar
              ? { title: pillar.title.split(":")[0], text: `Start here. ${pillar.description}`, href: resourcePath(pillar.slug), icon: "book" }
              : { title: "The layers of modern search optimization", text: "Start here. SEO, AEO, GEO, AIO, DEO and SXO in one model.", href: lp("/resources/search-optimization-layers"), icon: "layers" },
            ...articles.map((a) => ({ title: a.title.split(":")[0], text: a.description, href: resourcePath(a.slug) })),
            ...cluster.existing.filter((e) => e.role !== "commercial").map((e) => ({ title: e.title, text: e.role === "tool" ? "Free tool." : "Related guide.", href: e.href })),
          ],
        },
      ];
    }),
    { type: "h2", id: "frameworks", text: "Frameworks worth bookmarking" },
    {
      type: "cards",
      cols: 2,
      items: [
        {
          title: "The layers of modern search optimization",
          text: "SEO, AEO, GEO, AIO, DEO and SXO in one model: what each layer optimizes for, what it asks of a page, and how it is measured.",
          href: lp("/resources/search-optimization-layers"),
          icon: "layers",
        },
        {
          title: "Anatomy of a page built for AI search",
          text: "Twelve parts of a page that decide whether an answer engine can read it, quote it and cite it, annotated on a worked example.",
          href: lp("/resources/ai-search-page-anatomy"),
          icon: "file",
        },
      ],
    },
    { type: "h2", id: "learn", text: "Learn" },
    {
      type: "cards",
      cols: 3,
      items: [
        { title: "SEO guides", text: "The ranking guides in one index: the main guide, plus keywords, on-page, technical SEO, links and local search.", href: lp("/seo-guides"), icon: "book" },
        { title: "SEO glossary", text: "Over 100 terms, each on its own page with an example and how to apply it.", href: glossaryPath("en"), icon: "library" },
        { title: "AnotherSEOGuru App guides", text: "How to use every screen of the web app, with screenshots.", href: lp("/help"), icon: "book" },
        { title: "iPhone app", text: "Get the beta, Live Activities, widgets and alerts.", href: lp("/help/iphone-app"), icon: "smartphone" },
      ],
    },
    { type: "h2", id: "tools", text: "Free tools" },
    {
      type: "cards",
      cols: 2,
      items: PLATFORM_TOOLS.map((t) => ({ title: t.title, text: t.description ?? "", href: lp(`/tools/${t.slug}`), icon: "wrench" })),
    },
    { type: "h2", id: "blog", text: "From the blog" },
    { type: "list", items: [...posts.map((p) => `[${p.title}](${localizedPath(p.locale, `/blog/${p.slug}`)})`), `[All articles](${lp("/blog")})`] },
    { type: "h2", id: "compare", text: "Compare" },
    {
      type: "cards",
      cols: 3,
      items: [
        { title: "AnotherSEOGuru App vs Ahrefs", text: "Where each one fits, feature by feature.", href: lp("/compare/ahrefs") },
        { title: "AnotherSEOGuru App vs Semrush", text: "Price, data sources and workflow compared.", href: lp("/compare/semrush") },
        { title: "vs Search Console alone", text: "What you get on top of the free Google tool.", href: lp("/compare/search-console-alone") },
      ],
    },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: [{ name: "Home", url: lp("/") }, { name: "Resources", url: resourcePath() }] }),
    generateCollectionPageSchema({
      name: "SEO resources",
      description: "Search Console guides, free tools and frameworks from AnotherSEOGuru.",
      url: `${BASE_URL}${resourcePath()}`,
      inLanguage: "en",
      items: [
        ...RESOURCE_ARTICLES.map((a) => ({ url: `${BASE_URL}${resourcePath(a.slug)}`, name: a.title, itemType: "Article" })),
        { url: `${BASE_URL}${resourcePath(OPPORTUNITY_FINDER.slug)}`, name: OPPORTUNITY_FINDER.title, itemType: "WebApplication" },
      ],
    }),
  );

  return (
    <DocsShell locale="en" tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale="en"
        eyebrow="Resources"
        title="SEO resources"
        description="Search Console guides, a free opportunity finder, AI search frameworks and the glossary: the same material our team uses on client work."
        path={lp("/resources")}
        markdown={false}
        headings={blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text, level: 2 as const }] : []))}
        rail={<SignupCard locale="en" source="resources" />}
      >
        <ArticleBody blocks={blocks} locale="en" />
      </DocsPage>
    </DocsShell>
  );
}
