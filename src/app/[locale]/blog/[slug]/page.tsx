import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { MarkdownBody } from "@/components/blog/markdown-body";
import RelatedPages from "@/components/seo/RelatedPages";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import {
  extractFaqFromMarkdown,
  getAllBlogPosts,
  getBlogPostBySlug,
  getTranslationCounterpart,
  blogHref,
  getRelatedPosts,
  getPillarNeighbours,
  normalizePillar,
} from "@/lib/blog";
import { getPillarCopy } from "@/data/blog-pillars";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogProductCta } from "@/components/blog/BlogProductCta";
import FAQSection from "@/components/seo/FAQSection";
import { Bloom } from "@/components/landing/primitives";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildHreflangMapFromPaths } from "@/lib/locale-paths";
import { buildMetadata } from "@/lib/seo";
import { getBlogMoneyLinks } from "@/lib/linking";
import { getAppPath } from "@/lib/app-links";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  combineSchemas,
} from "@/lib/seo/schema";

interface BlogPostPageProps {
  readonly params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}): { slug: string }[] {
  // Posts are single-locale files; only emit slugs under their own locale.
  return getAllBlogPosts(isValidLocale(params.locale) ? params.locale : "en").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }
  if (post.locale !== locale) {
    // Wrong-locale URL redirects to the post's real locale, never index the bad URL.
    return { robots: { index: false, follow: true } };
  }
  const counterpart = getTranslationCounterpart(post);
  const languages = counterpart
    ? buildHreflangMapFromPaths({
        [post.locale]: localizedPath(post.locale, `/blog/${post.slug}`),
        [counterpart.locale]: localizedPath(counterpart.locale, `/blog/${counterpart.slug}`),
      })
    : undefined;
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: localizedPath(locale as SiteLocale, `/blog/${post.slug}`),
    ...(languages ? { languages } : { hreflangLocales: [post.locale] }),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }
  if (post.locale !== locale) {
    permanentRedirect(localizedPath(post.locale, `/blog/${post.slug}`));
  }
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  const isEl = locale === "el";
  const counterpart = getTranslationCounterpart(post);
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { name: post.author },
    schemaType: "BlogPosting",
    inLanguage: post.locale,
    mainEntityOfPage: `https://anotherseoguru.com${lp(`/blog/${post.slug}`)}`,
  });
  const breadcrumbItems = [
    { name: isEl ? "Αρχική" : "Home", url: lp("/") },
    { name: "Blog", url: lp("/blog") },
    { name: post.title, url: lp(`/blog/${post.slug}`) },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: breadcrumbItems,
  });
  // Prefer explicit frontmatter FAQ; otherwise derive from the body's FAQ section.
  const faqItems =
    post.faq && post.faq.length > 0 ? post.faq : extractFaqFromMarkdown(post.content);
  const faqSchema =
    faqItems.length > 0
      ? generateFAQSchema({ faqs: faqItems.map((f) => ({ question: f.question, answer: f.answer })) })
      : null;
  const schemas = combineSchemas(articleSchema, breadcrumbSchema,
    ...(faqSchema ? [faqSchema] : []));

  /**
   * Related posts fall back from pillar to category. The pillar-only version
   * left Greek posts in the thin pillars with a single suggestion.
   */
  const relatedPosts = getRelatedPosts(post, 4).map((p) => ({
    slug: lp(`/blog/${p.slug}`),
    title: p.title,
    description: p.description,
  }));

  const pillarSlug = normalizePillar(post.pillar);
  const pillarCopy = pillarSlug ? getPillarCopy(pillarSlug, locale as SiteLocale) : undefined;
  const { prev, next } = getPillarNeighbours(post);

  /**
   * Blog slugs differ per locale, so the header's default prefix-swap pointed at
   * a URL that 308s straight back. Send the switcher to the real counterpart, or
   * to the other locale's blog index when the post has no translation.
   */
  const alternateHref = counterpart
    ? localizedPath(counterpart.locale as SiteLocale, `/blog/${counterpart.slug}`)
    : localizedPath(isEl ? 'en' : 'el', '/blog');

  const moneyPages = getBlogMoneyLinks(post.slug).map((p) => ({
    // Blog targets resolve to the post's own locale; everything else follows the reader's.
    slug: p.path.startsWith('/blog/')
      ? blogHref(p.path.slice('/blog/'.length), locale as 'en' | 'el')
      : lp(p.path),
    title: isEl ? p.titleEl : p.titleEn,
  }));

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale as SiteLocale} alternateHref={alternateHref} />
      <main className="blueprint-grid relative z-0 pb-20">
        {/* Article header */}
        <section className="relative overflow-hidden border-b border-hairline">
          <Bloom className="left-1/2 top-[-10rem] h-[24rem] w-[52rem] -translate-x-1/2" />
          <div className="main-below-header relative mx-auto max-w-6xl px-6 pb-12 pt-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />

            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              {pillarCopy ? (
                <Link
                  href={lp(`/blog/topics/${pillarSlug}`)}
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand hover:underline"
                >
                  {pillarCopy.title}
                </Link>
              ) : null}
              {post.category ? (
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {post.category}
                </span>
              ) : null}
            </div>

            <h1 className="rise-in max-w-4xl font-display text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-foreground md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(isEl ? "el-GR" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>
                {post.readingTime} {isEl ? "λεπτά ανάγνωσης" : "min read"}
              </span>
            </div>
          </div>
        </section>

        {/* Body + sticky TOC rail */}
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <article className="min-w-0">
            <div className="markdown-body">
              <MarkdownBody markdown={post.content} locale={locale as SiteLocale} />
            </div>

            {/* FAQ: same source as the FAQPage schema, so the two cannot drift */}
            {faqItems.length > 0 ? (
              <FAQSection
                className="mt-14"
                faqs={faqItems.map((f) => ({ question: f.question, answer: f.answer }))}
                title={isEl ? "Συχνές ερωτήσεις" : "Frequently asked questions"}
                locale={locale as SiteLocale}
              />
            ) : null}

            {/* Prev / next within the pillar */}
            {prev || next ? (
              <nav
                aria-label={isEl ? "Πλοήγηση άρθρων" : "Article navigation"}
                className="mt-14 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline sm:grid-cols-2"
              >
                {prev ? (
                  <Link href={lp(`/blog/${prev.slug}`)} className="group bg-surface p-5 transition-colors hover:bg-surface-raised">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {isEl ? "Προηγούμενο" : "Previous"}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-foreground group-hover:text-primary">
                      {prev.title}
                    </span>
                  </Link>
                ) : <span className="bg-surface" />}
                {next ? (
                  <Link href={lp(`/blog/${next.slug}`)} className="group bg-surface p-5 text-right transition-colors hover:bg-surface-raised">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {isEl ? "Επόμενο" : "Next"}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-foreground group-hover:text-primary">
                      {next.title}
                    </span>
                  </Link>
                ) : <span className="bg-surface" />}
              </nav>
            ) : null}

            <footer className="mt-14 border-t border-hairline pt-10">
              {counterpart ? (
                <p className="mb-6 text-sm text-muted-foreground">
                  {isEl ? "Read this article in English: " : "Διαβάστε το άρθρο στα Ελληνικά: "}
                  <Link
                    href={localizedPath(counterpart.locale, `/blog/${counterpart.slug}`)}
                    className="text-primary underline"
                  >
                    {counterpart.title}
                  </Link>
                </p>
              ) : null}

              {moneyPages.length > 0 ? (
                <RelatedPages
                  title={isEl ? "Υπηρεσίες & Τιμές" : "Services & Pricing"}
                  pages={moneyPages}
                />
              ) : null}

              {relatedPosts.length > 0 ? (
                <RelatedPages
                  className="mt-10"
                  title={isEl ? "Σχετικά Άρθρα" : "Related Articles"}
                  pages={relatedPosts}
                />
              ) : null}
            </footer>
          </article>

          {/* Rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <TableOfContents
                headings={post.headings}
                label={isEl ? "Περιεχόμενα" : "On this page"}
              />

              <div className="rounded-[10px] border border-hairline bg-surface p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
                  {isEl ? "Η πλατφόρμα μας" : "Our platform"}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isEl
                    ? "Συνδέστε το Search Console και δείτε ποια queries απέχουν μία θέση από κλικ."
                    : "Connect Search Console and see which queries are one position from real clicks."}
                </p>
                <a
                  href={getAppPath("/signup")}
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-[8px] bg-primary px-4 font-display text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {isEl ? "Δοκιμάστε δωρεάν" : "Try it free"}
                </a>
              </div>

              {pillarCopy ? (
                <div className="rounded-[10px] border border-hairline bg-surface p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {isEl ? "Μέρος του κόμβου" : "Part of the hub"}
                  </p>
                  <Link
                    href={lp(`/blog/topics/${pillarSlug}`)}
                    className="mt-2 block font-display text-sm font-medium text-foreground hover:text-primary"
                  >
                    {pillarCopy.heading}
                  </Link>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <BlogProductCta locale={locale as SiteLocale} />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
