import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { MarkdownBody } from "@/components/blog/markdown-body";
import { getAllBlogPosts, getBlogPostBySlug, getTranslationCounterpart } from "@/lib/blog";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildHreflangMapFromPaths } from "@/lib/locale-paths";
import { buildMetadata } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/seo/schema";

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
    // Wrong-locale URL renders a 404 — never advertise it to crawlers.
    return { robots: { index: false, follow: false } };
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
    notFound();
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

  return (
    <>
      <SchemaMarkup schemas={[articleSchema]} />
      <Header />
      <main className="main-below-header pb-20">
        <article className="container max-w-[var(--marketing-container-narrow)]">
          <header className="mb-12">
            {post.isPillarHub ? (
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Content pillar
              </span>
            ) : null}
            {post.category && !post.isPillarHub ? (
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${post.categoryColor ?? "bg-muted text-foreground"}`}
              >
                {post.category}
              </span>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">{post.title}</h1>
            <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="mx-2">·</span>
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </header>
          <div className="markdown-body">
            <MarkdownBody markdown={post.content} />
          </div>
          <footer className="mt-16 pt-10 border-t border-border">
            {counterpart ? (
              <p className="text-sm text-muted-foreground mb-6">
                {isEl ? "Read this article in English: " : "Διαβάστε το άρθρο στα Ελληνικά: "}
                <Link
                  href={localizedPath(counterpart.locale, `/blog/${counterpart.slug}`)}
                  className="text-primary underline"
                >
                  {counterpart.title}
                </Link>
              </p>
            ) : null}
            <div className="rounded-2xl glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-2">
                {isEl ? "Θέλετε αποτελέσματα σαν αυτά;" : "Want results like these?"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {isEl
                  ? "Ζητήστε δωρεάν προσφορά για κατασκευή ιστοσελίδας ή SEO - απάντηση εντός 24 ωρών."
                  : "Get a free quote for web design or SEO - we reply within 24 hours."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={lp("/get-started")} className="btn btn-gradient rounded-xl px-5 py-2.5 text-sm font-bold">
                  {isEl ? "Δωρεάν Προσφορά" : "Free Quote"}
                </Link>
                <Link href={lp("/pricing")} className="btn btn-outline rounded-xl px-5 py-2.5 text-sm font-bold">
                  {isEl ? "Δείτε Τιμές" : "See Pricing"}
                </Link>
              </div>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
