import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPARE_PAGES, getComparePageBySlug } from "@/data/compare-pages";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return COMPARE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparePageBySlug(slug);
  if (!c) {
    return {};
  }
  return buildMetadata({
    title: c.headline,
    description: c.summary,
    path: `/compare/${c.slug}`,
    primaryKeyword: `SEO software vs ${c.competitorName}`,
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparePageBySlug(slug);
  if (!c) {
    notFound();
  }
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <article className="container max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{c.headline}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{c.headline}</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{c.summary}</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <h2 className="font-bold text-lg mb-4">When AnotherSEOGuru fits</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.whenChooseUs.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-primary font-bold">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-bold text-lg mb-4">When {c.competitorName} may fit</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {c.whenChooseThem.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="text-muted-foreground">–</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={getAppPath("/signup")} className="btn btn-gradient px-6 py-3" rel="noopener noreferrer">
              Try the platform
            </a>
            <Link href="/platform/features" className="btn btn-outline px-6 py-3">
              Browse features
            </Link>
            <Link href="/contact" className="btn btn-outline px-6 py-3">
              Talk to agency
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
