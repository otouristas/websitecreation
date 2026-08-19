import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ProductHero, HowItWorks, FeatureHighlightGrid, AgencyBand, HomeFaq } from "@/components/marketing";
import { MARKETING_FEATURES } from "@/data/marketing-features";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { generateSoftwareApplicationSchema } from "@/lib/seo/schema";
import { BASE_URL } from "@/lib/seo/description";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Software Platform - GSC & AI",
    description:
      "GSC-native SEO platform: semantic clustering, rank tracking, technical audits, GEO, AEO, and multi-LLM workflows. Turn Search Console data into weekly execution. 7-day trial.",
    path: localizedPath(locale as SiteLocale, "/platform"),
    canonicalPath: localizedPath("en", "/platform"),
    primaryKeyword: "SEO software platform",
  });
}

export default async function PlatformHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "AnotherSEOGuru SEO Platform",
    description:
      "All-in-one SEO workspace with Search Console analytics, keyword clustering, rank tracking, site audits, and multi-LLM AI assistance.",
    url: `${BASE_URL}${lp("/platform")}`,
  });
  return (
    <>
      <SchemaMarkup schemas={[softwareSchema]} />
      <Header />
      <main className="blueprint-grid relative z-0 main-below-header">
        <ProductHero
          badge="Product · Connects to Google Search Console"
          title="The SEO command center for teams who"
          titleHighlight="outgrow spreadsheets."
          description="Query-level GSC analytics, semantic clustering, rank tracking, technical audits, and AI workflows - one login. Prefer hands-off execution? Our agency team has your back."
        />
        <HowItWorks
          heading="How teams ship faster with the platform"
          subheading="From raw Search Console data to prioritized actions in minutes - not slide decks."
          steps={[
            {
              step: 1,
              title: "Connect Search Console",
              description: "Authorize your property and pull queries, pages, countries, and devices into a built-for-SEO workspace.",
            },
            {
              step: 2,
              title: "Cluster & prioritize",
              description: "Group queries by intent, spot cannibalization, and surface content gaps without exporting to ten tools.",
            },
            {
              step: 3,
              title: "Track & experiment",
              description: "Monitor rankings, SERP features, and health scores; run structured tests where it matters.",
            },
            {
              step: 4,
              title: "Automate the grind",
              description: "Use AI Autopilot and sprint boards to turn recommendations into a weekly execution rhythm.",
            },
          ]}
        />
        <FeatureHighlightGrid
          heading="Built for serious SEO workflows"
          subheading="Explore every capability - each page maps to the same modules inside the live app."
          features={MARKETING_FEATURES}
          limit={9}
        />
        {/*
          These three pages sat in the sitemap and the hub-spoke config but had
          zero inbound links anywhere in the rendered site - unreachable by
          crawl. The platform hub is their natural parent.
        */}
        <section className="py-16 border-t border-hairline">
          <div className="container">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl mb-2">
              Built for your team
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              The same platform, framed around how each kind of team actually works.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { href: "/platform/for/agencies", title: "SEO platform for agencies", copy: "Built for agencies shipping client work every week." },
                { href: "/platform/for/in-house", title: "SEO platform for in-house teams", copy: "One stack for the whole marketing org." },
                { href: "/platform/for/ecommerce", title: "SEO platform for ecommerce", copy: "Organic revenue needs operational SEO." },
              ].map((c) => (
                <Link key={c.href} href={lp(c.href)} className="card card-interactive p-6">
                  <h3 className="font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 border-t border-hairline">
          <div className="container flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={lp("/platform/pricing")} className="btn btn-outline px-8 py-3 text-center">
              Software plans
            </Link>
            <Link href={lp("/platform/features")} className="btn btn-outline px-8 py-3 text-center">
              All features
            </Link>
            <Link href={lp("/resources")} className="btn btn-outline px-8 py-3 text-center">
              Guides & resources
            </Link>
          </div>
        </section>
        <AgencyBand />
        <HomeFaq />
      </main>
      <Footer />
    </>
  );
}
