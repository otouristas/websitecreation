import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAppPath } from "@/lib/app-links";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Platform for In-House Teams",
    description:
      "In-house SEO platform: one GSC workspace for clustering, health scores, rank tracking, AI briefs, and sprint planning—replace scattered tools with measurable roadmaps.",
    path: localizedPath(locale as SiteLocale, "/platform/for/in-house"),
    hreflangPath: "/platform/for/in-house",
    primaryKeyword: "in-house SEO software",
  });
}

export default async function PlatformForInHousePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">One stack for the marketing org</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            In-house teams win when SEO, content, and web share a single source of truth. AnotherSEOGuru starts from the
            queries and pages Google already shows you — then layers clustering, audits, and AI assistance so roadmap
            debates end faster.
          </p>
          <ul className="space-y-4 text-muted-foreground mb-12">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Align leadership with health scores and trend views instead of screenshots.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Give content teams keyword groups and briefs grounded in real impressions.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Escalate to our agency when you need extra hands for technical or local execution.
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <a href={getAppPath("/signup")} className="btn btn-gradient px-6 py-3" rel="noopener noreferrer">
              Create workspace
            </a>
            <Link href={lp("/compare/search-console-alone")} className="btn btn-outline px-6 py-3">
              vs Search Console alone
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
