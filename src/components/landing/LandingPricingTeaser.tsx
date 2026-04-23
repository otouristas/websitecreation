import Link from "next/link";
import { getAppPath } from "@/lib/app-links";

const tiers = [
  {
    name: "Launch",
    blurb: "Solo operators getting organized",
    price: "From $29/mo",
    bullets: ["GSC workspace", "Clustering & tracking", "Core audits"],
    highlight: false,
  },
  {
    name: "Growth",
    blurb: "Teams shipping every week",
    price: "From $79/mo",
    bullets: ["More projects", "Deeper audits", "Collaboration"],
    highlight: true,
  },
  {
    name: "Agency",
    blurb: "Scale client delivery",
    price: "From $149/mo",
    bullets: ["Higher limits", "Reporting", "Workflows"],
    highlight: false,
  },
] as const;

export function LandingPricingTeaser() {
  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Software plans</h2>
          <p className="text-muted-foreground">
            Pricing details and limits live in-product. Start free, then upgrade when you are ready. Agency retainers are
            separate — see agency pricing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-6 flex flex-col ${
                t.highlight ? "border-primary shadow-glow bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="text-sm font-semibold text-primary mb-1">{t.name}</div>
              <div className="text-lg font-bold text-foreground mb-2">{t.price}</div>
              <p className="text-sm text-muted-foreground mb-4">{t.blurb}</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6 flex-1">
                {t.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <a
                href={getAppPath("/signup")}
                className={`btn w-full justify-center ${t.highlight ? "btn-gradient" : "btn-outline"}`}
                rel="noopener noreferrer"
              >
                Start free
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/platform/pricing" className="btn btn-outline px-8">
            Full software pricing page
          </Link>
          <Link href="/pricing" className="btn btn-outline px-8">
            Agency retainers
          </Link>
        </div>
      </div>
    </section>
  );
}
