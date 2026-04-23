import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getMarketingFeatureBySlug, MARKETING_FEATURES, getAppFeaturePath } from "@/data/marketing-features";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return MARKETING_FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const f = getMarketingFeatureBySlug(slug);
  if (!f) {
    return {};
  }
  return buildMetadata({
    title: f.seo.metaTitle.replace(/\s*\|\s*AnotherSEOGuru\s*$/i, "").trim(),
    description: f.seo.metaDescription,
    path: `/platform/features/${f.slug}`,
    primaryKeyword: f.seo.keywords.split(",")[0]?.trim(),
  });
}

export default async function PlatformFeatureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const f = getMarketingFeatureBySlug(slug);
  if (!f) {
    notFound();
  }
  const breadcrumbs = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: "/" },
      { name: "Platform", url: "/platform" },
      { name: "Features", url: "/platform/features" },
      { name: f.title, url: `/platform/features/${f.slug}` },
    ],
  });
  const appUrl = getAppPath(getAppFeaturePath(f.slug));
  const related = f.relatedFeatures
    .map((s) => getMarketingFeatureBySlug(s))
    .filter(Boolean)
    .slice(0, 4);
  return (
    <>
      <SchemaMarkup schemas={[breadcrumbs]} />
      <Header />
      <main className="main-below-header pb-20">
        <article className="container max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/platform" className="hover:text-primary">
              Platform
            </Link>
            <span className="mx-2">/</span>
            <Link href="/platform/features" className="hover:text-primary">
              Features
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{f.title}</span>
          </nav>
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{f.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{f.shortDescription}</p>
          </header>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href={appUrl} className="btn btn-gradient px-6 py-3" rel="noopener noreferrer">
              Open in app
            </a>
            <a href={getAppPath("/signup")} className="btn btn-outline px-6 py-3" rel="noopener noreferrer">
              Start free
            </a>
          </div>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p className="text-lg">{f.overview}</p>
            {f.benefits.length > 0 ? (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Benefits</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {f.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {f.howItWorks.length > 0 ? (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">How it works</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  {f.howItWorks.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
              </section>
            ) : null}
            {f.useCases.length > 0 ? (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Ideal for</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {f.useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
          {related.length > 0 ? (
            <section className="mt-16 pt-10 border-t border-border">
              <h2 className="text-xl font-bold mb-4">Related capabilities</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((r) =>
                  r ? (
                    <li key={r.slug}>
                      <Link href={`/platform/features/${r.slug}`} className="text-primary hover:underline font-medium">
                        {r.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
