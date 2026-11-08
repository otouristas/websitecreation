import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { COMPARE_HUB_EL, COMPARE_PAGES_EL } from "@/data/compare-pages-el";
import { COMPARE_PAGES, getComparePage } from "@/data/compare-pages";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { Check, Minus } from "lucide-react";
import { CtaBand, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import { ChipLinks, KitBreadcrumbs } from "@/components/page-kit";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, generateSoftwareApplicationSchema, combineSchemas, BASE_URL } from "@/lib/seo/schema";
import { AnnouncePill, WaveHero } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return COMPARE_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getComparePage(slug, locale);
  if (!c) {
    return {};
  }
  const el = locale === "el";
  return buildMetadata({
    title: c.seoTitle,
    description: c.summary,
    path: localizedPath(locale, `/compare/${c.slug}`),
    canonicalPath: localizedPath(locale, `/compare/${c.slug}`),
    hreflangPath: `/compare/${c.slug}`,
    primaryKeyword: el ? `σύγκριση με ${c.competitorName}` : (c.primaryKeyword ?? `SEO software vs ${c.competitorName}`),
  });
}

export default async function ComparePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const el = siteLocale === "el";
  const c = getComparePage(slug, siteLocale);
  if (!c) {
    notFound();
  }
  const greek = el ? COMPARE_PAGES_EL[c.slug] : undefined;
  const lp = (path: string) => localizedPath(siteLocale, path);
  // The comparison pages sat one level under a hub that did not exist, with a
  // hand-rolled two-item trail and no BreadcrumbList at all.
  const breadcrumbItems = [
    { name: el ? "Αρχική" : "Home", url: lp("/") },
    { name: el ? COMPARE_HUB_EL.crumb : "Compare", url: lp("/compare") },
    { name: c.competitorName, url: lp(`/compare/${c.slug}`) },
  ];

  return (
    <>
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        {/*
          Our own product, declared. The page compares two tools and said
          nothing structured about either.

          Only our side is marked up. Emitting a SoftwareApplication for a
          competitor would mean publishing claims about their feature set and
          licensing that we cannot verify and that go stale the moment they
          ship, and the prose below is already careful to describe where they
          fit rather than score them. A comparison table of unverifiable
          competitor specs would read as more rigorous and be less true.
        */}
        <SchemaMarkup
          schemas={combineSchemas(
            generateBreadcrumbSchema({ items: breadcrumbItems }),
            generateSoftwareApplicationSchema({
              name: "AnotherSEOGuru",
              description: c.summary,
              url: `${BASE_URL}${localizedPath(siteLocale, "/")}`,
            }),
            ...(c.faq?.length ? [generateFAQSchema({ faqs: c.faq.map((f) => ({ question: f.q, answer: f.a })) })] : []),
          )}
        />
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs align="left" items={breadcrumbItems} />
              <AnnouncePill wrap href={lp("/compare")} tag={el ? "Σύγκριση" : "Compare"} text={el ? COMPARE_HUB_EL.all : "All comparisons"} />
            </div>
          }
          title={accentEnd(c.headline, greek?.accentWords ?? c.competitorName.split(" ").length)}
          titleClassName="text-[1.65rem] min-[400px]:text-[1.9rem] sm:text-[2.35rem] lg:text-[2.75rem]"
          lead={c.summary}
          actions={<SoftwareCtas locale={siteLocale} align="left" source={`compare-${c.slug}`} />}
          trust={<TrustLine align="left" items={softwareTrust(siteLocale)} />}
          panel={
            <div className="grid min-w-0 gap-4">
              <div className="rounded-[22px] border border-primary/35 bg-primary/5 p-6">
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{el ? COMPARE_HUB_EL.fitsUs : "When AnotherSEOGuru fits"}</h2>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                  {c.whenChooseUs.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0 text-pretty">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[22px] border border-hairline bg-surface/80 p-6">
                <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{el ? COMPARE_HUB_EL.fitsThem(c.competitorName) : `When ${c.competitorName} may fit`}</h2>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                  {c.whenChooseThem.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Minus className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="min-w-0 text-pretty">{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        />

        {c.sections?.length || c.faq?.length ? (
          <section data-shot="details" className="scroll-mt-28">
            <div className="mx-auto max-w-[860px] px-5 pb-12 lg:px-8">
              {c.sections?.map((sec) => (
                <div key={sec.heading} className="mt-12 first:mt-0">
                  <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-foreground">{sec.heading}</h2>
                  {sec.body ? <p className="mt-4 text-pretty text-[16.5px] leading-[1.75] text-muted-foreground">{sec.body}</p> : null}
                  {sec.bullets?.length ? (
                    <ul className="mt-4 space-y-2.5 text-[16px] leading-relaxed text-muted-foreground">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                          <span className="min-w-0 text-pretty">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
              {c.slug === "agencyanalytics" || c.slug === "whatagraph" || c.slug === "dashthis" ? (
                <p className="mt-8 text-[16px] text-muted-foreground">
                  See the reports first:{" "}
                  <Link href={lp("/resources/sample-seo-report")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                    sample SEO report
                  </Link>{" "}
                  ·{" "}
                  <Link href={lp("/platform/white-label-reports")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                    white-label SEO reports
                  </Link>{" "}
                  ·{" "}
                  <Link href={lp("/pricing")} className="font-medium text-foreground underline decoration-hairline underline-offset-4">
                    pricing
                  </Link>
                </p>
              ) : null}
              {c.faq?.length ? (
                <div className="mt-12">
                  <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-foreground">Questions</h2>
                  <div className="mt-5 divide-y divide-hairline rounded-[22px] border border-hairline bg-background/70">
                    {c.faq.map((f) => (
                      <details key={f.q} className="group p-5">
                        <summary className="cursor-pointer list-none text-[16px] font-semibold text-foreground [&::-webkit-details-marker]:hidden">{f.q}</summary>
                        <p className="mt-3 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section data-shot="links" className="scroll-mt-28">
          <div className="mx-auto max-w-[1240px] px-5 pb-16 lg:px-8 lg:pb-24">
            <ChipLinks
              align="left"
              items={[
                { href: lp("/platform/features"), label: el ? COMPARE_HUB_EL.features : "Browse features" },
                { href: lp("/contact"), label: el ? COMPARE_HUB_EL.agency : "Talk to agency" },
                { href: lp("/compare"), label: el ? COMPARE_HUB_EL.all : "All comparisons" },
              ]}
            />
          </div>
        </section>

        <div data-shot="cta">
          <CtaBand locale={siteLocale} source={`compare-${c.slug}-band`} />
        </div>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
