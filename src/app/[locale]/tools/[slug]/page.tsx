import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FAQSection, SchemaMarkup } from "@/components/seo";
import { PLATFORM_TOOLS, getPlatformToolBySlug } from "@/data/platform-tools";
import { getAppPath } from "@/lib/app-links";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata, generateFAQSchema } from "@/lib/seo";

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
  const faqSchema = faqItems.length > 0 ? generateFAQSchema({ faqs: faqItems }) : null;

  return (
    <>
      <Header />
      {faqSchema ? <SchemaMarkup schemas={[faqSchema]} /> : null}
      <main className="main-below-header pb-16">
        <div className="container max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href={lp("/")} className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={lp("/tools")} className="hover:text-primary">
              SEO tools
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tool.title}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{tool.description}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={appUrl}
              className="btn btn-gradient px-6 py-3"
              rel="noopener noreferrer"
            >
              Open in platform
            </a>
            <Link href={lp("/services/seo-audits")} className="btn btn-outline px-6 py-3">
              SEO audit services
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            The interactive tool runs on our secure app subdomain. Need done-for-you help? See{" "}
            <Link href={lp("/services")} className="text-primary hover:underline">
              SEO services
            </Link>
            ,{" "}
            <Link href={lp("/services/local-seo")} className="text-primary hover:underline">
              local SEO
            </Link>
            , or our{" "}
            <Link href={lp("/blog/what-is-seo")} className="text-primary hover:underline">
              SEO pillar guide
            </Link>
            .
          </p>
          {faqItems.length > 0 ? (
            <FAQSection faqs={faqItems} focusKeyword={tool.primaryKeyword} className="mt-4" />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
