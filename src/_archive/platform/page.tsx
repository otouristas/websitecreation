import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ProductHero, HowItWorks, FeatureHighlightGrid, AgencyBand, HomeFaq } from "@/components/marketing";
import { MARKETING_FEATURES } from "@/data/marketing-features";
import { buildMetadata } from "@/lib/seo";
import { generateSoftwareApplicationSchema } from "@/lib/seo/schema";
import { BASE_URL } from "@/lib/seo/description";

export const metadata = buildMetadata({
  title: "SEO platform — Search Console, AI workflows, rank tracking",
  description:
    "AnotherSEOGuru software: Google Search Console workspace, AI-assisted SEO, rank tracking, technical audits, and LLM citation insights. Start free.",
  path: "/platform",
  primaryKeyword: "SEO software platform",
});

export default function PlatformHubPage() {
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "AnotherSEOGuru SEO Platform",
    description:
      "All-in-one SEO workspace with Search Console analytics, keyword clustering, rank tracking, site audits, and multi-LLM AI assistance.",
    url: `${BASE_URL}/platform`,
  });
  return (
    <>
      <SchemaMarkup schemas={[softwareSchema]} />
      <Header />
      <main className="main-below-header">
        <ProductHero
          badge="Product · Connects to Google Search Console"
          title="The SEO command center for teams who"
          titleHighlight="outgrow spreadsheets."
          description="Query-level GSC analytics, semantic clustering, rank tracking, technical audits, and AI workflows — one login. Prefer hands-off execution? Our agency team has your back."
        />
        <HowItWorks
          heading="How teams ship faster with the platform"
          subheading="From raw Search Console data to prioritized actions in minutes — not slide decks."
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
          subheading="Explore every capability — each page maps to the same modules inside the live app."
          features={MARKETING_FEATURES}
          limit={9}
        />
        <section className="py-16 border-t border-border">
          <div className="container flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/platform/pricing" className="btn btn-outline px-8 py-3 text-center">
              Software plans
            </Link>
            <Link href="/platform/features" className="btn btn-outline px-8 py-3 text-center">
              All features
            </Link>
            <Link href="/resources" className="btn btn-outline px-8 py-3 text-center">
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
