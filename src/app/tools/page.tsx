import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS } from "@/data/platform-tools";
import { buildMetadata } from "@/lib/seo";
import { getAppPath } from "@/lib/app-links";

export const metadata = buildMetadata({
  title: "Free SEO tools & product intents — AnotherSEOGuru",
  description:
    "Marketing hub for Search Console workflows, clustering, LLM visibility, health scores, and more — with deep links into the product app.",
  path: "/tools",
  primaryKeyword: "free SEO tools",
});

export default function ToolsHubPage() {
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tools &amp; intents</h1>
          <p className="text-lg text-muted-foreground mb-10">
            These pages explain what you can do in the product and link to the live app. Generators and advanced free tools
            run on the app subdomain.
          </p>
          <ul className="space-y-4">
            {PLATFORM_TOOLS.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}`} className="block rounded-xl border border-border p-6 hover:border-primary/40 hover:bg-muted/20 transition-smooth">
                  <span className="font-semibold text-foreground text-lg">{t.title}</span>
                  <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-primary">Read intent page →</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 p-6 rounded-2xl border border-border bg-muted/20">
            <h2 className="font-bold text-lg mb-2">More in the app</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Meta generators, schema, robots.txt, CWV helpers, and the full free-tools directory live in the product.
            </p>
            <a href={getAppPath("/free-tools")} className="btn btn-gradient text-sm" rel="noopener noreferrer">
              Open free tools in app
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
