import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

interface ProblemSolutionSectionProps {
  locale?: SiteLocale;
}

export function ProblemSolutionSection({ locale = "en" }: ProblemSolutionSectionProps) {
  const isEl = locale === "el";
  const t = isEl ? elHome.problem : null;

  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive mb-6">
              <AlertCircle className="w-4 h-4" aria-hidden />
              <span className="text-sm font-semibold">{isEl ? t!.badge : "The problem"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {isEl ? t!.title : "Your website isn't bringing bookings?"}
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              {(isEl
                ? t!.items
                : [
                    { strong: "Outdated design", text: " - tourists don't trust it enough to book direct." },
                    { strong: "No SEO", text: " - you lose organic traffic to OTAs and competitors." },
                    { strong: "No AI visibility", text: " - you're missing ChatGPT, Perplexity and AI Overviews." },
                  ]
              ).map((item) => (
                <li key={item.strong} className="flex gap-3">
                  <span className="text-destructive font-bold">×</span>
                  <span>
                    <strong className="text-foreground">{item.strong}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--success)/0.15)] text-[hsl(var(--success))] mb-6">
              <CheckCircle2 className="w-4 h-4" aria-hidden />
              <span className="text-sm font-semibold">{isEl ? t!.solutionBadge : "The solution"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {isEl ? t!.solutionTitle : "Website + SEO + GEO/AEO from one team"}
            </h2>
            <ul className="space-y-4 mb-8 text-muted-foreground">
              {(isEl
                ? t!.solutionItems
                : [
                    { strong: "Conversion-first design", text: " - bookings, quote requests and direct calls." },
                    { strong: "Technical SEO", text: " - speed, schema, local pages and content hubs." },
                    { strong: "AI chatbots", text: " - multilingual 24/7 support for travelers." },
                  ]
              ).map((item) => (
                <li key={item.strong} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] shrink-0 mt-0.5" aria-hidden />
                  <span>
                    <strong className="text-foreground">{item.strong}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={localizedPath(isEl ? "el" : "en", "/get-started")}
                className="btn btn-gradient px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                {isEl ? t!.ctaQuote : "Get a quote"}
                <ArrowRight className="w-5 h-5" aria-hidden />
              </Link>
              <Link
                href={localizedPath(isEl ? "el" : "en", "/services")}
                className="btn btn-outline px-8 py-4 text-center"
              >
                {isEl ? t!.ctaServices : "View services"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
