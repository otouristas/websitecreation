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
    title: "SEO Platform for Ecommerce",
    description:
      "Ecommerce SEO software: product and category query tracking, SERP monitoring, content decay alerts, technical audits, and AI briefs for stores scaling organic revenue.",
    path: localizedPath(locale as SiteLocale, "/platform/for/ecommerce"),
    hreflangPath: "/platform/for/ecommerce",
    primaryKeyword: "ecommerce SEO software",
  });
}

export default async function PlatformForEcommercePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Organic revenue needs operational SEO</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Product grids, faceted navigation, and seasonal demand punish slow teams. AnotherSEOGuru helps you see which
            queries and templates actually drive revenue, where content is decaying, and which SERP features you can
            realistically win - then tracks progress over time.
          </p>
          <ul className="space-y-4 text-muted-foreground mb-12">
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Tie Search Console segments to category and PDP priorities.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Use shopping-oriented research modules alongside rank tracking.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              Refresh stale templates before rankings slip quietly.
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <a href={getAppPath("/signup")} className="btn btn-gradient px-6 py-3" rel="noopener noreferrer">
              Start free
            </a>
            <Link href={lp("/platform/features/shopping-product-research")} className="btn btn-outline px-6 py-3">
              Shopping research module
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
