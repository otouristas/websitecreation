import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AnnouncePill as KitAnnouncePill,
  AuditPreview,
  CtaBand,
  Stage,
  TrustLine,
  kitSecondaryBtn,
  kitSoftwareBtn,
  softwareTrust,
} from "@/components/kit";
import { KitBreadcrumbs } from "@/components/page-kit";
import { WaveEyebrow, WaveHero, WaveSection } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";
import { PLATFORM_TOOLS, getPlatformToolBySlug } from "@/data/platform-tools";
import { getAppPath } from "@/lib/app-links";
import { blogHref } from "@/lib/blog";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

interface ToolPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return PLATFORM_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const tool = getPlatformToolBySlug(slug);
  if (!tool) {
    return {};
  }
  return buildMetadata({
    title: tool.title,
    description: tool.description,
    path: localizedPath(locale as SiteLocale, `/tools/${tool.slug}`),
    canonicalPath: localizedPath("en", `/tools/${tool.slug}`),
    primaryKeyword: tool.primaryKeyword,
    // The interactive tool runs on the app subdomain; this page is a heading,
    // a description and a deep link. Indexing it would be indexing an ad for a
    // tool rather than the tool. Route stays for navigation.
    noIndex: true,
  });
}

export default async function PlatformToolPage({ params }: ToolPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const tool = getPlatformToolBySlug(slug);
  if (!tool) {
    notFound();
  }
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);
  const appUrl = getAppPath(tool.appPath);
  const faqItems = (tool.faqs ?? []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));
  // No FAQPage: every /tools/[slug] route is noIndex, so this was structured
  // data on a page explicitly asking not to be indexed.

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
                  { name: "SEO tools", url: lp("/tools") },
                  { name: tool.title, url: lp(`/tools/${tool.slug}`) },
                ]}
              />
              <KitAnnouncePill href={appUrl} kind="free" tag="Free" text="Runs in the AnotherSEOGuru App app" className="whitespace-normal" />
            </div>
          }
          title={accentEnd(tool.title, 1)}
          titleClassName="text-[1.55rem] min-[400px]:text-[1.75rem] sm:text-[2.15rem] lg:text-[2.55rem]"
          lead={tool.description}
          actions={
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a href={appUrl} className={`${kitSoftwareBtn} !pl-5`} rel="noopener noreferrer">
                Open in platform
              </a>
              <Link href={lp("/services/seo-audits")} className={kitSecondaryBtn}>
                SEO audit services
              </Link>
            </div>
          }
          trust={<TrustLine align="left" items={softwareTrust(siteLocale)} />}
          panel={
            <div className="min-w-0">
              <Stage>
                <AuditPreview locale="en" />
              </Stage>
              <p className="mt-6 text-pretty text-[14px] leading-relaxed text-muted-foreground">
                The interactive tool runs on our secure app subdomain. Need done-for-you help? See{" "}
                <Link href={lp("/services")} className="text-primary hover:underline">
                  SEO services
                </Link>
                ,{" "}
                <Link href={lp("/services/local-seo")} className="text-primary hover:underline">
                  local SEO
                </Link>
                , or our{" "}
                <Link href={blogHref("what-is-seo", siteLocale)} className="text-primary hover:underline">
                  SEO pillar guide
                </Link>
                .
              </p>
            </div>
          }
        />
        {faqItems.length > 0 ? (
          <WaveSection id="faq" shot="faq" tinted>
            <WaveEyebrow>FAQ</WaveEyebrow>
            <h2 className="mt-4 max-w-3xl text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.5rem]">
              {`Frequently asked questions about ${tool.primaryKeyword}`}
            </h2>
            <div className="mt-10 divide-y divide-hairline overflow-hidden rounded-[22px] border border-hairline bg-background/70">
              {faqItems.map((item, index) => (
                <details key={item.question} className="group p-5 sm:p-6" open={index === 0 ? true : undefined}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-[16px] font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 text-pretty">{item.question}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline text-primary transition-transform duration-200 group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-pretty text-[15.5px] leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </WaveSection>
        ) : null}
        <div data-shot="cta">
          <CtaBand locale={siteLocale} source={`tool-${tool.slug}`} />
        </div>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
