import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO platform for in-house teams — GSC to roadmap",
  description:
    "Give marketing and SEO leads one workspace: Search Console analytics, health scores, rank tracking, and AI briefs without a dozen subscriptions.",
  path: "/platform/for/in-house",
  primaryKeyword: "in-house SEO software",
});

export default function PlatformForInHousePage() {
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
            <Link href="/compare/search-console-alone" className="btn btn-outline px-6 py-3">
              vs Search Console alone
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
