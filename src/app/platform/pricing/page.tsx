import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Software pricing — AnotherSEOGuru SEO platform",
  description:
    "Start free and scale with credits for AI and data APIs. Full checkout and plan management live in the app — this page explains how software billing differs from agency retainers.",
  path: "/platform/pricing",
  primaryKeyword: "SEO software pricing",
});

const PLANS = [
  {
    name: "Starter",
    blurb: "Solo operators validating GSC workflows and light AI usage.",
    bullets: ["Search Console workspace", "Core dashboards", "Limited AI credits"],
  },
  {
    name: "Growth",
    blurb: "In-house teams running weekly SEO rituals across properties.",
    bullets: ["Higher credit pools", "Rank tracking & SERP modules", "Autopilot-ready workflows"],
    highlighted: true,
  },
  {
    name: "Scale",
    blurb: "Agencies and brands with heavy Data + AI throughput.",
    bullets: ["Priority-style limits in-app", "Multi-project patterns", "CRM & collaboration surfaces"],
  },
];

export default function PlatformPricingPage() {
  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-5xl">
          <header className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Platform pricing</h1>
            <p className="text-lg text-muted-foreground">
              Software plans, credits, and checkout are managed inside the product. Start free — upgrade when your team is
              ready. Looking for done-for-you execution? See{" "}
              <Link href="/pricing" className="text-primary font-medium hover:underline">
                agency packages
              </Link>
              .
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-8 flex flex-col ${p.highlighted ? "border-primary shadow-glow bg-primary/5" : "border-border bg-card"}`}
              >
                <h2 className="text-xl font-bold mb-2">{p.name}</h2>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{p.blurb}</p>
                <ul className="text-sm space-y-2 text-muted-foreground mb-8">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={getAppPath("/signup")}
                  className={`btn w-full text-center ${p.highlighted ? "btn-gradient" : "btn-outline"}`}
                  rel="noopener noreferrer"
                >
                  Open app to view plans
                </a>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Exact prices, credit bundles, and add-ons ship in-product and may change — this marketing page stays focused
              on positioning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={getAppPath("/signup")} className="btn btn-gradient px-8" rel="noopener noreferrer">
                Create account
              </a>
              <Link href="/contact" className="btn btn-outline px-8">
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
