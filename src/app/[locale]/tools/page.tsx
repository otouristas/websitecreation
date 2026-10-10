import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAppPath } from "@/lib/app-links";
import { ArrowRight } from "lucide-react";
import {
  Accent,
  AiVisibilityPreview,
  CtaBand,
  KitHeading,
  KitSection,
  MarketingBadge,
  SoftwareCtas,
  Stage,
  TrustLine,
  kitSoftwareBtn,
  softwareTrust,
} from "@/components/kit";
import { CardGrid, LinkCard, PageHero } from "@/components/page-kit";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Tools, Free Keyword Research, Audits & Checkers",
    description:
      "Free SEO tools for keyword research, SEO audits, Search Console clustering, LLM citations, health scores, and browser checkers for meta, schema, and Core Web Vitals.",
    path: localizedPath(locale as SiteLocale, "/tools"),
    canonicalPath: localizedPath("en", "/tools"),
    primaryKeyword: "seo tools",
  });
}

export default async function ToolsHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale as SiteLocale}
          breadcrumbs={[
            { name: "Home", url: lp("/") },
            { name: "Tools", url: lp("/tools") },
          ]}
          pill={{ href: lp("/ai-visibility-check"), kind: "ai", tag: "AI", text: "New: check one keyword in Google, AI Overview and ChatGPT" }}
          title={
            <>
              SEO <Accent>tools</Accent>
            </>
          }
          lead="Free SEO tools for keyword research, audits, Search Console clustering, and AI visibility, plus browser checkers in the app. Start with keyword research or a free SEO audit, then deepen with our guides."
          actions={<SoftwareCtas locale={locale as SiteLocale} source="tools-hub" />}
          trust={<TrustLine items={softwareTrust(locale as SiteLocale)} />}
        />

        <KitSection className="!pt-14">
          {/* The one tool that runs on this site rather than in the app. */}
          <Link
            href={lp("/ai-visibility-check")}
            className="reveal group grid items-center gap-8 rounded-3xl border border-brand/35 bg-surface/60 p-6 transition-colors hover:border-brand/60 sm:p-8 lg:grid-cols-[1fr_1.1fr]"
          >
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2">
                <MarketingBadge kind="free">Free</MarketingBadge>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Runs here, no signup</span>
              </span>
              <span className="mt-3 block font-display text-[26px] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                AI visibility check: Google, AI Overview &amp; ChatGPT
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                Type one keyword and see all three surfaces side by side, with your own domain marked wherever it
                appears. Live SERP and chat data, free.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-link">
                Run a check <ArrowRight className="size-4" aria-hidden />
              </span>
            </div>
            <Stage className="hidden min-w-0 sm:block">
              <AiVisibilityPreview locale="en" />
            </Stage>
          </Link>

          <KitHeading className="mt-24" eyebrow="In the app" title={<>Tools that run on your <Accent>own data</Accent></>} />
          <CardGrid cols={2} className="mt-10">
            {PLATFORM_TOOLS.map((t) => (
              <LinkCard
                key={t.slug}
                href={lp(`/tools/${t.slug}`)}
                title={t.title}
                text={t.description}
                footer={<span className="font-medium text-link">Read intent page →</span>}
              />
            ))}
          </CardGrid>

          <div className="reveal mt-12 flex flex-col gap-5 rounded-2xl border border-hairline bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-foreground">More in the app</h2>
              <p className="mt-1.5 text-[14.5px] text-muted-foreground">
                Meta generators, schema, robots.txt, CWV helpers, and the full free-tools directory live in the product.
              </p>
            </div>
            <a href={getAppPath("/free-tools")} className={`${kitSoftwareBtn} shrink-0 !pl-5`} rel="noopener noreferrer">
              Open free tools in app
            </a>
          </div>
        </KitSection>

        <CtaBand locale={locale as SiteLocale} source="tools-hub-band" />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
