import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

const FRAMEWORKS = [
  {
    path: "/resources/search-optimization-layers",
    eyebrow: "Framework",
    title: "The layers of modern search optimization",
    body: "SEO, AEO, GEO, AIO, DEO and SXO in one model: what each layer optimizes for, what it asks of a page, and how it is measured.",
  },
  {
    path: "/resources/ai-search-page-anatomy",
    eyebrow: "Answer engine optimization",
    title: "Anatomy of a page built for AI search",
    body: "Twelve parts of a page that decide whether an answer engine can read it, quote it and cite it, annotated on a worked example.",
  },
] as const;

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Resources - Blog, Tools & Guides",
    description:
      "Free SEO resources: Search Console playbooks, GEO and AEO guides, technical SEO checklists, blog pillars, and links to clustering, audit, and AI visibility tools.",
    path: localizedPath(locale as SiteLocale, "/resources"),
    canonicalPath: localizedPath("en", "/resources"),
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
      <main className="blueprint-grid relative z-0 main-below-header pb-20">
        <div className="container">
          <header className="max-w-3xl mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
            <p className="text-lg text-muted-foreground">
              Frameworks, deep reads, product deep-links, and the same modules our agency uses with clients.
            </p>
          </header>
          {/* Frameworks lead: these two are the definitional owners for the
              GEO/AEO cluster, and everything else here is a list of links. */}
          <section className="mb-14 grid gap-4 md:grid-cols-2">
            {FRAMEWORKS.map((f) => (
              <Link
                key={f.path}
                href={lp(f.path)}
                className="glass rounded-2xl p-6 transition-colors hover:border-brand/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
                  {f.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-xl font-medium tracking-[-0.02em]">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </Link>
            ))}
          </section>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12">
            <section>
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] mb-4">Glossary</h2>
              <p className="text-sm text-muted-foreground mb-3">
                <Link href={lp("/glossary")} className="text-primary font-medium hover:underline">
                  SEO glossary
                </Link>{" "}
                - definitions, examples, and links to features and tools.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] mb-4">Blog</h2>
              <ul className="space-y-3">
                {posts.map((p) => (
                  <li key={`${p.locale}-${p.slug}`}>
                    <Link
                      href={localizedPath(p.locale, `/blog/${p.slug}`)}
                      className="text-primary hover:underline font-medium"
                    >
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
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] mb-4">Product intents</h2>
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
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] mb-4">Compare</h2>
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
