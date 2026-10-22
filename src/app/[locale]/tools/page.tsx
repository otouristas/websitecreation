import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { getAppPath } from "@/lib/app-links";
import {
  AiVisibilityPreview,
  CtaBand,
  MarketingBadge,
  SoftwareCtas,
  Stage,
  TrustLine,
  kitSoftwareBtn,
  softwareTrust,
} from "@/components/kit";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveEyebrow, WaveHero, WaveSection } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";

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
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);

  return (
    <>
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs
                align="left"
                items={[
                  { name: "Home", url: lp("/") },
                  { name: "Tools", url: lp("/tools") },
                ]}
              />
              <AnnouncePill
                wrap
                href={lp("/ai-visibility-check")}
                tag="AI"
                text="New: check one keyword in Google, AI Overview and ChatGPT"
              />
            </div>
          }
          title={accentEnd("SEO tools", 1)}
          lead="Free SEO tools for keyword research, audits, Search Console clustering, and AI visibility, plus browser checkers in the app. Start with keyword research or a free SEO audit, then deepen with our guides."
          actions={<SoftwareCtas locale={siteLocale} align="left" source="tools-hub" />}
          trust={<TrustLine align="left" items={softwareTrust(siteLocale)} />}
          panel={
            <Link
              href={lp("/ai-visibility-check")}
              className="group grid min-w-0 items-center gap-6 rounded-[22px] border border-primary/35 bg-surface/80 p-5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-colors hover:border-primary/55 sm:p-6"
            >
              <div className="min-w-0">
                <span className="inline-flex flex-wrap items-center gap-2">
                  <MarketingBadge kind="free">Free</MarketingBadge>
                  <span className="font-code text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Runs here, no signup</span>
                </span>
                <span className="mt-3 block text-balance font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-[1.55rem]">
                  AI visibility check: Google, AI Overview &amp; ChatGPT
                </span>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  Type one keyword and see all three surfaces side by side, with your own domain marked wherever it
                  appears. Live SERP and chat data, free.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-primary">
                  Run a check <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
              <Stage className="hidden min-w-0 sm:block">
                <AiVisibilityPreview locale="en" />
              </Stage>
            </Link>
          }
        />

        <WaveSection shot="finder">
          <Link
            href={lp("/resources/search-console-opportunity-finder")}
            className="block min-w-0 rounded-[22px] border border-hairline bg-surface/70 p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <span className="inline-flex flex-wrap items-center gap-2">
              <MarketingBadge kind="free">Free</MarketingBadge>
              <span className="font-code text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Runs in your browser, no signup</span>
            </span>
            <span className="mt-3 block text-balance font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              Search Console opportunity finder
            </span>
            <p className="mt-3 max-w-3xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Upload your Search Console export and get the queries worth pushing onto page one, the snippets worth
              rewriting and a click forecast. Your file never leaves the page.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-primary">
              Find opportunities <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </WaveSection>

        <WaveSection shot="tools" tinted>
          <WaveEyebrow>In the app</WaveEyebrow>
          <h2 className="mt-4 max-w-3xl text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
            Tools that run on your <span className="inline-block max-w-full bg-[linear-gradient(90deg,var(--primary),var(--signal))] bg-clip-text pr-[0.22em] italic text-transparent box-decoration-clone [-webkit-box-decoration-break:clone]">own data</span>
          </h2>
          <div className="mt-10 grid min-w-0 gap-4 md:grid-cols-2">
            {PLATFORM_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={lp(`/tools/${tool.slug}`)}
                className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-background/80 p-6 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <h3 className="text-balance font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground">{tool.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{tool.description}</p>
                <span className="mt-5 font-medium text-primary">Read intent page →</span>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex min-w-0 flex-col gap-5 rounded-[22px] border border-hairline bg-background/70 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-[18px] font-semibold text-foreground">More in the app</h2>
              <p className="mt-1.5 text-pretty text-[14.5px] text-muted-foreground">
                Meta generators, schema, robots.txt, CWV helpers, and the full free-tools directory live in the product.
              </p>
            </div>
            <a href={getAppPath("/free-tools")} className={`${kitSoftwareBtn} shrink-0 !pl-5`} rel="noopener noreferrer">
              Open free tools in app
            </a>
          </div>
        </WaveSection>

        <div data-shot="cta">
          <CtaBand locale={siteLocale} source="tools-hub-band" />
        </div>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
