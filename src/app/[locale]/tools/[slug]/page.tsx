import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  AuditPreview,
  Container,
  CtaBand,
  Stage,
  TrustLine,
  kitSecondaryBtn,
  kitSoftwareBtn,
  softwareTrust,
} from "@/components/kit";
import { KitFaq, PageHero, accentTail } from "@/components/page-kit";
import { PLATFORM_TOOLS, getPlatformToolBySlug } from "@/data/platform-tools";
import { getAppPath } from "@/lib/app-links";
import { blogHref } from '@/lib/blog';
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
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  const appUrl = getAppPath(tool.appPath);
  const faqItems = (tool.faqs ?? []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));
  // No FAQPage: every /tools/[slug] route is noIndex, so this was structured
  // data on a page explicitly asking not to be indexed.

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale as SiteLocale}
          size="md"
          breadcrumbs={[
            { name: "Home", url: lp("/") },
            { name: "SEO tools", url: lp("/tools") },
            { name: tool.title, url: lp(`/tools/${tool.slug}`) },
          ]}
          pill={{ href: appUrl, kind: "free", tag: "Free", text: "Runs in the GSC Boost app" }}
          title={accentTail(tool.title, 1)}
          lead={tool.description}
          actions={
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a href={appUrl} className={`${kitSoftwareBtn} !pl-5`} rel="noopener noreferrer">
                Open in platform
              </a>
              <Link href={lp("/services/seo-audits")} className={kitSecondaryBtn}>
                SEO audit services
              </Link>
            </div>
          }
          trust={<TrustLine items={softwareTrust(locale as SiteLocale)} />}
        >
          <Container className="mt-12 max-w-[900px]">
            <Stage>
              <AuditPreview locale="en" />
            </Stage>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[14px] leading-relaxed text-muted-foreground">
              The interactive tool runs on our secure app subdomain. Need done-for-you help? See{" "}
              <Link href={lp("/services")} className="text-link hover:underline">
                SEO services
              </Link>
              ,{" "}
              <Link href={lp("/services/local-seo")} className="text-link hover:underline">
                local SEO
              </Link>
              , or our{" "}
              <Link href={blogHref("what-is-seo", locale as SiteLocale)} className="text-link hover:underline">
                SEO pillar guide
              </Link>
              .
            </p>
          </Container>
        </PageHero>
        {faqItems.length > 0 ? (
          <KitFaq title={`Frequently asked questions about ${tool.primaryKeyword}`} items={faqItems} />
        ) : null}
        <CtaBand locale={locale as SiteLocale} source={`tool-${tool.slug}`} />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
