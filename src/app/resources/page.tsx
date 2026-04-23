import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Resources — guides, blog, and SEO tools",
  description:
    "AnotherSEOGuru resources: blog, intent guides, and links to free tools in the product. Learn Search Console, AI visibility, and technical SEO.",
  path: "/resources",
  primaryKeyword: "SEO resources",
});

export default function ResourcesPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container">
          <header className="max-w-3xl mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
            <p className="text-lg text-muted-foreground">
              Deep reads, product deep-links, and the same modules our agency uses with clients.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12">
            <section>
              <h2 className="text-xl font-bold mb-4">Glossary</h2>
              <p className="text-sm text-muted-foreground mb-3">
                <Link href="/glossary" className="text-primary font-medium hover:underline">
                  SEO glossary
                </Link>{" "}
                — definitions, examples, and links to features and tools.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">Blog</h2>
              <ul className="space-y-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-primary hover:underline font-medium">
                      {p.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
                All articles →
              </Link>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">Product intents</h2>
              <ul className="space-y-3">
                {PLATFORM_TOOLS.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tools/${t.slug}`} className="text-primary hover:underline font-medium">
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/tools" className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
                Tools hub →
              </Link>
              <Link href="/platform/features" className="inline-block mt-4 ml-4 text-sm font-semibold text-primary hover:underline">
                Feature library →
              </Link>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">Compare</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/compare/ahrefs" className="text-primary hover:underline">
                    vs Ahrefs
                  </Link>
                </li>
                <li>
                  <Link href="/compare/semrush" className="text-primary hover:underline">
                    vs Semrush
                  </Link>
                </li>
                <li>
                  <Link href="/compare/search-console-alone" className="text-primary hover:underline">
                    vs Search Console alone
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
