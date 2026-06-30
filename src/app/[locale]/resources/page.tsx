import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Resources — Blog, Tools & Guides",
    description:
      "Free SEO resources: Search Console playbooks, GEO and AEO guides, technical SEO checklists, blog pillars, and links to clustering, audit, and AI visibility tools.",
    path: localizedPath(locale as SiteLocale, "/resources"),
    hreflangPath: "/resources",
    primaryKeyword: "SEO resources",
  });
}

export default async function ResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
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
                <Link href={lp("/glossary")} className="text-primary font-medium hover:underline">
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
                    <Link href={lp(`/blog/${p.slug}`)} className="text-primary hover:underline font-medium">
                      {p.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  </li>
                ))}
              </ul>
              <Link href={lp("/blog")} className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
                All articles →
              </Link>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">Product intents</h2>
              <ul className="space-y-3">
                {PLATFORM_TOOLS.map((t) => (
                  <li key={t.slug}>
                    <Link href={lp(`/tools/${t.slug}`)} className="text-primary hover:underline font-medium">
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={lp("/tools")} className="inline-block mt-4 text-sm font-semibold text-primary hover:underline">
                Tools hub →
              </Link>
              <Link href={lp("/platform/features")} className="inline-block mt-4 ml-4 text-sm font-semibold text-primary hover:underline">
                Feature library →
              </Link>
            </section>
            <section>
              <h2 className="text-xl font-bold mb-4">Compare</h2>
              <ul className="space-y-3">
                <li>
                  <Link href={lp("/compare/ahrefs")} className="text-primary hover:underline">
                    vs Ahrefs
                  </Link>
                </li>
                <li>
                  <Link href={lp("/compare/semrush")} className="text-primary hover:underline">
                    vs Semrush
                  </Link>
                </li>
                <li>
                  <Link href={lp("/compare/search-console-alone")} className="text-primary hover:underline">
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
