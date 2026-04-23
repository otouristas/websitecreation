import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { getAppPath } from "@/lib/app-links";

const poweredBy = [
  { name: "OpenAI", src: "/logos/assets/openai.webp", width: 20, height: 20 },
  { name: "Claude", src: "/logos/assets/Claude_A.png", width: 20, height: 20 },
] as const;

/**
 * Vite-style two-column hero: headline, model row, screenshot, stats strip.
 */
export function LandingHero() {
  return (
    <section className="hero-below-header relative flex min-h-[85vh] items-center overflow-hidden border-b border-border/80 pb-16 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                AI SEO platform connected to Google Search Console
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground md:text-6xl md:leading-[1.02] lg:text-7xl">
              <span className="gradient-text">Track rankings · Analyze competitors</span>
              <br />
              <span className="text-foreground">AI workflows · Search Console intelligence</span>
            </h1>
            <p className="mb-3 text-lg text-muted-foreground md:text-xl">
              Powered by <strong className="text-foreground">OpenAI, Claude, Gemini &amp; more</strong>
            </p>
            <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
              Keyword clustering, rank tracking, technical audits, LLM citation insights, sprint planning, and optional
              autopilot — plus our agency team when you want execution.
            </p>
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={getAppPath("/signup")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/30 btn btn-gradient"
                rel="noopener noreferrer"
                aria-label="Start free with AnotherSEOGuru — create your account"
              >
                Start free
              </a>
              <Link
                href="/platform/features"
                className="btn btn-outline text-lg px-8 py-4"
                aria-label="Browse all SEO platform features"
              >
                View all features
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline text-lg px-8 py-4"
                aria-label="Book a call with the AnotherSEOGuru agency team"
              >
                Book agency call
              </Link>
            </div>
            <p className="mx-auto mb-8 max-w-xl text-sm text-muted-foreground lg:mx-0">
              Prefer to evaluate first?{" "}
              <Link href="/tools" className="font-medium text-primary underline-offset-4 hover:underline">
                Try free SEO tools
              </Link>{" "}
              or{" "}
              <Link href="/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
                compare agency pricing
              </Link>
              .
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[hsl(var(--success))]" aria-hidden />
                GSC-native workspace
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[hsl(var(--success))]" aria-hidden />
                Multi-model AI
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[hsl(var(--success))]" aria-hidden />
                Agency optional
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              <Image
                src="/logos/assets/screenshots/sidebar-ai-tools.png"
                alt="AnotherSEOGuru product workspace"
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl border-2 border-border shadow-strong"
                priority
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
        <div className="mt-14 mb-8">
          <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-wider">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {poweredBy.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <Image src={p.src} alt="" width={p.width} height={p.height} className="object-contain" />
                <span className="text-xs md:text-sm font-semibold text-foreground">{p.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
              <span className="text-xs md:text-sm font-semibold text-foreground">Google Gemini</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
              <Image
                src="/logos/assets/perplexity.png"
                alt=""
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="text-xs md:text-sm font-semibold text-foreground">Perplexity</span>
            </div>
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl -z-10" />
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-medium">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">50M+</div>
                <div className="text-sm text-muted-foreground">Keywords</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">60+</div>
                <div className="text-sm text-muted-foreground">SEO checks</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">8+</div>
                <div className="text-sm text-muted-foreground">AI workflows</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">SERP tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
