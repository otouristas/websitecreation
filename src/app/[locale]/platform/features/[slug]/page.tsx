import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getMarketingFeatureBySlug, MARKETING_FEATURES, getAppFeaturePath } from "@/data/marketing-features";
import { getAppPath } from "@/lib/app-links";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/schema";
import { buildWebPageNode } from "@/lib/ai-search";
import { LastUpdated } from "@/components/ai-search";
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from "@/lib/seo/content-dates";
import { getFeatureExplainer } from "@/data/platform-feature-explainers";
import { evaluatePlatformFeature } from "@/lib/indexability/platform-feature";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return MARKETING_FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const f = getMarketingFeatureBySlug(slug);
  if (!f) {
    return {};
  }
  return buildMetadata({
    title: f.seo.metaTitle.replace(/\s*\|\s*AnotherSEOGuru\s*$/i, "").trim(),
    description: f.seo.metaDescription,
    path: localizedPath(locale as SiteLocale, `/platform/features/${f.slug}`),
    canonicalPath: localizedPath("en", `/platform/features/${f.slug}`),
    primaryKeyword: f.seo.keywords.split(",")[0]?.trim(),
    noIndex: !evaluatePlatformFeature(slug).indexable,
  });
}

export default async function PlatformFeatureDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const f = getMarketingFeatureBySlug(slug);
  if (!f) {
    notFound();
  }
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  // One list, used for both the visible trail and the JSON-LD, so the two
  // cannot disagree. The visible trail used to be hand-rolled `<nav>` markup
  // with no `aria-label`, alongside a separate copy of the same items.
  const breadcrumbItems = [
    { name: "Home", url: lp("/") },
    { name: "Platform", url: lp("/platform") },
    { name: "Features", url: lp("/platform/features") },
    { name: f.title, url: lp(`/platform/features/${f.slug}`) },
  ];
  const breadcrumbs = generateBreadcrumbSchema({ items: breadcrumbItems });
  const appUrl = getAppPath(getAppFeaturePath(f.slug));
  const related = f.relatedFeatures
    .map((s) => getMarketingFeatureBySlug(s))
    .filter(Boolean)
    .slice(0, 4);

  const explainer = getFeatureExplainer(slug);
  const faqSchema =
    explainer && explainer.faqs.length > 0 ? generateFAQSchema({ faqs: [...explainer.faqs] }) : null;

  /*
   * Before this, a feature page's only JSON-LD was a breadcrumb and the
   * site-wide Organization node: nothing said what the page itself was, and
   * nothing said when it was last true. Both are cheap, and a model has no
   * other way to tell a current feature page from an abandoned one.
   */
  const pageNode = buildWebPageNode({
    siteUrl: "https://anotherseoguru.com",
    url: `https://anotherseoguru.com${lp(`/platform/features/${f.slug}`)}`,
    name: f.title,
    description: f.shortDescription,
    locale: "en",
    datePublished: GENERATED_CONTENT_PUBLISHED,
    dateModified: GENERATED_CONTENT_UPDATED,
  });

  return (
    <>
      <SchemaMarkup
        schemas={[pageNode, breadcrumbs, ...(faqSchema ? [faqSchema] : [])]}
      />
      <Header />
      <main className="blueprint-grid relative z-0 main-below-header pb-20">
        <article className="container max-w-3xl">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />
          <header className="mb-10">
            <h1 className="font-display text-4xl font-medium tracking-[-0.04em] md:text-5xl text-foreground mb-4">{f.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{f.shortDescription}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              <LastUpdated
                date={GENERATED_CONTENT_UPDATED}
                published={GENERATED_CONTENT_PUBLISHED}
                locale="en"
              />
            </p>
            {explainer ? (
              <p className="mt-6 rounded-[10px] border border-hairline bg-surface-raised p-5 text-base leading-relaxed text-foreground">
                {explainer.directAnswer}
              </p>
            ) : null}
          </header>
          <div className="flex flex-wrap gap-4 mb-12">
            <a href={appUrl} className="btn btn-primary px-6 py-3" rel="noopener noreferrer">
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
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">Benefits</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {f.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {f.howItWorks.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">How it works</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  {f.howItWorks.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
              </section>
            ) : null}
            {f.useCases.length > 0 ? (
              <section>
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">Ideal for</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {f.useCases.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
          {explainer ? (
            <div className="mt-16 space-y-10 text-muted-foreground leading-relaxed">
              {explainer.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)} className="mb-4">
                      {para}
                    </p>
                  ))}
                  {sec.bullets ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {sec.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
              <section>
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">
                  Frequently asked questions
                </h2>
                <div className="space-y-5">
                  {explainer.faqs.map((q) => (
                    <div key={q.question}>
                      <h3 className="font-semibold text-foreground mb-1">{q.question}</h3>
                      <p>{q.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
              {explainer.furtherReading?.length ? (
                <section>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.02em] text-foreground mb-4">
                    Further reading
                  </h2>
                  <ul className="list-disc space-y-2 pl-6">
                    {explainer.furtherReading.map(([href, label]) => (
                      <li key={href}>
                        <Link href={lp(href)} className="text-primary hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}
          {related.length > 0 ? (
            <section className="mt-16 pt-10 border-t border-hairline">
              <h2 className="font-display text-xl font-medium tracking-[-0.02em] mb-4">Related capabilities</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((r) =>
                  r ? (
                    <li key={r.slug}>
                      <Link href={lp(`/platform/features/${r.slug}`)} className="text-primary hover:underline font-medium">
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
