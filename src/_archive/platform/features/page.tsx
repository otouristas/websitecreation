import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MARKETING_FEATURES } from "@/data/marketing-features";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Platform features — GSC, AI, rankings, links, and more",
  description:
    "Full list of AnotherSEOGuru platform capabilities: sprint boards, autopilot, keyword research, SERP tracking, audits, E-E-A-T, outreach, and LLM insights.",
  path: "/platform/features",
  primaryKeyword: "SEO platform features",
});

export default function PlatformFeaturesIndexPage() {
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
                  href={`/platform/features/${f.slug}`}
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
