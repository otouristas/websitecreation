import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MARKETING_FEATURES } from "@/data/marketing-features";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: "SEO Platform Features — Full List",
    description:
      "Explore every platform feature: GSC clustering, rank tracking, technical audits, AI autopilot, sprint boards, E-E-A-T, outreach, LLM citations, and GEO/AEO workflows.",
    path: localizedPath(locale as SiteLocale, "/platform/features"),
    hreflangPath: "/platform/features",
    primaryKeyword: "SEO platform features",
  });
}

export default async function PlatformFeaturesIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container">
          <div className="max-w-3xl mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Platform capabilities</h1>
            <p className="text-lg text-muted-foreground">
              Every module below opens a deep-dive with benefits, how it works, and a direct link into the product.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {MARKETING_FEATURES.map((f) => (
              <li key={f.slug}>
                <Link
                  href={lp(`/platform/features/${f.slug}`)}
                  className="block rounded-2xl border border-border p-6 hover:border-primary/40 hover:bg-muted/20 transition-smooth"
                >
                  <h2 className="font-semibold text-lg text-foreground mb-2">{f.title}</h2>
                  <p className="text-sm text-muted-foreground">{f.shortDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
