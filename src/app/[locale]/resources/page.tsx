import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";
import { ArrowRight, BookOpen, GitCompare, Library, Wrench } from "lucide-react";
import { Accent, CtaBand, KitHeading, KitSection } from "@/components/kit";
import { CardGrid, LinkCard, PageHero } from "@/components/page-kit";

const colCard = "flex flex-col rounded-2xl border border-hairline bg-surface/70 p-6";
const colTitle = "flex items-center gap-2 font-display text-lg font-semibold tracking-[-0.02em] text-foreground [&_svg]:size-4 [&_svg]:text-brand";
const moreLink = "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline";

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
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale="en"
          pill={{ href: lp("/glossary"), kind: "free", tag: "Glossary", text: "Every SEO term in plain words" }}
          title={
<Accent>Resources</Accent>
          }
          lead="Frameworks, deep reads, product deep-links, and the same modules our agency uses with clients."
        />

        {/* Frameworks lead: these two are the definitional owners for the
            GEO/AEO cluster, and everything else here is a list of links. */}
        <KitSection className="!pt-14">
          <KitHeading eyebrow="Frameworks" eyebrowIcon={<Library />} title={<>Two models worth <Accent>bookmarking</Accent></>} />
          <CardGrid cols={2} className="mt-10">
            {FRAMEWORKS.map((f) => (
              <LinkCard key={f.path} href={lp(f.path)} eyebrow={f.eyebrow} title={f.title} text={f.body} as="h2" />
            ))}
          </CardGrid>
        </KitSection>

        <KitSection tinted>
          <KitHeading eyebrow="Library" eyebrowIcon={<BookOpen />} title={<>Everything else, <Accent>in one place</Accent></>} />
          <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <section className={colCard}>
              <h2 className={colTitle}>
                <BookOpen aria-hidden /> Glossary
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <Link href={lp("/glossary")} className="font-medium text-primary hover:underline">
                  SEO glossary
                </Link>{" "}
                - definitions, examples, and links to features and tools.
              </p>
            </section>
            <section className={colCard}>
              <h2 className={colTitle}>
                <Library aria-hidden /> Blog
              </h2>
              <ul className="mt-4 max-h-[28rem] space-y-3 overflow-y-auto pr-1">
                {posts.map((p) => (
                  <li key={`${p.locale}-${p.slug}`}>
                    <Link
                      href={localizedPath(p.locale, `/blog/${p.slug}`)}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {p.title}
                    </Link>
                    <p className="line-clamp-2 text-[13px] text-muted-foreground">{p.description}</p>
                  </li>
                ))}
              </ul>
              <Link href={lp("/blog")} className={moreLink}>
                All articles <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </section>
            <section className={colCard}>
              <h2 className={colTitle}>
                <Wrench aria-hidden /> Product intents
              </h2>
              <ul className="mt-4 space-y-2.5">
                {PLATFORM_TOOLS.map((t) => (
                  <li key={t.slug}>
                    <Link href={lp(`/tools/${t.slug}`)} className="text-sm font-medium text-foreground hover:text-primary">
                      {t.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-4">
                <Link href={lp("/tools")} className={moreLink}>
                  Tools hub <ArrowRight className="size-3.5" aria-hidden />
                </Link>
                <Link href={lp("/platform/features")} className={moreLink}>
                  Feature library <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </section>
            <section className={colCard}>
              <h2 className={colTitle}>
                <GitCompare aria-hidden /> Compare
              </h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link href={lp("/compare/ahrefs")} className="text-sm font-medium text-foreground hover:text-primary">
                    vs Ahrefs
                  </Link>
                </li>
                <li>
                  <Link href={lp("/compare/semrush")} className="text-sm font-medium text-foreground hover:text-primary">
                    vs Semrush
                  </Link>
                </li>
                <li>
                  <Link href={lp("/compare/search-console-alone")} className="text-sm font-medium text-foreground hover:text-primary">
                    vs Search Console alone
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </KitSection>

        <CtaBand locale="en" source="resources-band" />
      </main>
      <Footer />
    </>
  );
}
