import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO platform for ecommerce — products, SERP, and decay",
  description:
    "Monitor category and product queries, shopping visibility, content decay, and technical health for stores that live or die on organic product discovery.",
  path: "/platform/for/ecommerce",
  primaryKeyword: "ecommerce SEO software",
});

export default function PlatformForEcommercePage() {
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Organic revenue needs operational SEO</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Product grids, faceted navigation, and seasonal demand punish slow teams. AnotherSEOGuru helps you see which
            queries and templates actually drive revenue, where content is decaying, and which SERP features you can
            realistically win — then tracks progress over time.
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
            <Link href="/platform/features/shopping-product-research" className="btn btn-outline px-6 py-3">
              Shopping research module
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
