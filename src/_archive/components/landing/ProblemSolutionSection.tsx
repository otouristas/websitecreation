import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getAppPath } from "@/lib/app-links";

export function ProblemSolutionSection() {
  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-6">
              <AlertCircle className="w-4 h-4" aria-hidden />
              <span className="text-sm font-semibold">The problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Fragmented SEO tools and endless exports?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-destructive font-bold">×</span>
                <span>
                  <strong className="text-foreground">Stack overload</strong> — separate rank trackers, content tools, and GSC
                  spreadsheets.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">×</span>
                <span>
                  <strong className="text-foreground">Slow decisions</strong> — insights do not turn into a weekly backlog.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-destructive font-bold">×</span>
                <span>
                  <strong className="text-foreground">AI bolt-ons</strong> — generic chat instead of SEO-native workflows.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] mb-6">
              <CheckCircle2 className="w-4 h-4" aria-hidden />
              <span className="text-sm font-semibold">The solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">One workspace tied to Search Console</h2>
            <ul className="space-y-4 mb-8 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-foreground">Cluster &amp; prioritize</strong> from real queries and pages.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-foreground">Track &amp; audit</strong> with modules your team actually opens.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-foreground">AI + agency</strong> — ship in-product or hand off to our team.
                </span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getAppPath("/signup")}
                className="btn btn-gradient px-8 py-4 inline-flex items-center justify-center gap-2"
                rel="noopener noreferrer"
              >
                Start free
                <ArrowRight className="w-5 h-5" aria-hidden />
              </a>
              <Link href="/platform" className="btn btn-outline px-8 py-4 text-center">
                Platform overview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
