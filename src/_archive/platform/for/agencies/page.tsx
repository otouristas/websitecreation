import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO platform for agencies — multi-client workflows",
  description:
    "White-label-ready narratives, sprint boards, GSC-centric reporting, and AI velocity for agencies managing many Search Console properties.",
  path: "/platform/for/agencies",
  primaryKeyword: "SEO software for agencies",
});

export default function PlatformForAgenciesPage() {
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Built for agencies shipping every week</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Your clients do not pay for another export — they pay for clarity and velocity. AnotherSEOGuru ties each property to
            query-level reality, clusters intent, surfaces cannibalization, and turns recommendations into sprint tasks your
            team can defend on a Friday call.
          </p>
          <ul className="space-y-4 text-muted-foreground mb-12">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              Onboard a client property in minutes with standard GSC OAuth.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              Use semantic clustering and content gap views to brief writers with evidence — not hunches.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              Pair software with our agency bench when you need execution bandwidth.
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <a href={getAppPath("/signup")} className="btn btn-gradient px-6 py-3" rel="noopener noreferrer">
              Start free
            </a>
            <Link href="/platform/features" className="btn btn-outline px-6 py-3">
              Explore features
            </Link>
            <Link href="/contact" className="btn btn-outline px-6 py-3">
              Partner with our team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
