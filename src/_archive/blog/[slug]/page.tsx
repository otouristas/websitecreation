import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { MarkdownBody } from "@/components/blog/markdown-body";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/seo/schema";

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }
  return buildMetadata({
    title: `${post.title} | AnotherSEOGuru`,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { name: post.author },
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
            <p className="text-sm text-muted-foreground mb-4">
              Explore the{" "}
              <Link href="/platform" className="text-primary underline">
                SEO platform
              </Link>{" "}
              or browse{" "}
              <Link href="/resources" className="text-primary underline">
                resources
              </Link>
              .
            </p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
