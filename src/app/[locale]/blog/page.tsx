import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";
import { getBlogUi } from "@/lib/i18n/get-dictionary";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const ui = getBlogUi(locale as SiteLocale);
  return buildMetadata({
    title: ui.title,
    description: ui.metaDescription,
    path: localizedPath(locale as SiteLocale, "/blog"),
    hreflangPath: "/blog",
  });
}

export default async function BlogIndex({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);
  const ui = getBlogUi(siteLocale);
  const articles = getAllBlogPosts(siteLocale);

  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <section className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{ui.h1}</h1>
            <p className="text-xl text-muted-foreground">{ui.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={lp(`/blog/${article.slug}`)}
                className="group card p-0 overflow-hidden hover-glow block h-full"
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {article.isPillarHub ? (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                        {siteLocale === "el" ? "Pillar hub" : "Pillar hub"}
                      </span>
                    ) : null}
                    {article.category ? (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${article.categoryColor ?? "bg-muted text-foreground"}`}
                      >
                        {article.category}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{article.title}</h2>
                  <p className="text-muted-foreground mb-6 flex-grow">{article.description}</p>
                  <div className="font-bold text-primary flex items-center mt-auto">
                    {ui.readMore}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
