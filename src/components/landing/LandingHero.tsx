import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

const poweredBy = [
  { name: "OpenAI", src: "/logos/assets/openai.webp", width: 20, height: 20 },
  { name: "Claude", src: "/logos/assets/Claude_A.png", width: 20, height: 20 },
] as const;

export function LandingHero({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const t = isEl ? elHome.hero : null;

  return (
    <section className="hero-below-header relative flex min-h-[70vh] items-center overflow-hidden border-b border-border/80 pb-12 lg:pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-5 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                {isEl ? t!.badge : "Tourism websites · Hotels · Rent-a-car · Travel AI"}
              </div>
            </div>
            <h1 className="mb-5 text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl">
              <span className="gradient-text">
                {isEl ? t!.h1Line1 : "Websites that win bookings & rankings"}
              </span>
              <br />
              <span className="text-foreground">{isEl ? t!.h1Line2 : "SEO · GEO · AEO · AI chatbots"}</span>
            </h1>
            <p className="mb-3 text-lg text-muted-foreground md:text-xl">{isEl ? t!.sub : "High-converting sites for hotels, car rental & travel brands — with full SEO, GEO, AEO & AI chatbots."}</p>
            <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground lg:mx-0">
              {isEl
                ? t!.proof
                : "55+ live projects across Greece, UK, US, Canada & Europe. Built to rank on Google and AI search."}
            </p>
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href={localizedPath(isEl ? "el" : "en", "/get-started")}
                className="btn btn-gradient px-8 py-4 text-lg font-semibold"
              >
                {isEl ? t!.ctaQuote : "Get a quote"}
              </Link>
              <Link href={localizedPath(isEl ? "el" : "en", "/work")} className="btn btn-outline text-lg px-8 py-4">
                {isEl ? t!.ctaWork : "See our work"}
              </Link>
              <Link href={localizedPath(isEl ? "el" : "en", "/contact")} className="btn btn-outline text-lg px-8 py-4">
                {isEl ? t!.ctaContact : "Talk to us"}
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-muted-foreground">
              {(isEl
                ? [t!.trust1, t!.trust2, t!.trust3]
                : ["SEO-ready from day one", "Multilingual sites", "Agency + technical support"]
              ).map((label) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--success))]" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-border shadow-strong">
              <Image
                src={isEl ? "/portfolio/discover-cyclades.webp" : "/logos/assets/screenshots/sidebar-ai-tools.png"}
                alt={isEl ? t!.imageAlt : "AnotherSEOGuru tourism website example"}
                width={1200}
                height={800}
                className="w-full h-auto object-cover object-top"
                priority
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl -z-10" />
          </div>
        </div>
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-medium">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {isEl ? (
                <>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{t!.stats.projectsVal}</div>
                    <div className="text-sm text-muted-foreground">{t!.stats.projects}</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{t!.stats.marketsVal}</div>
                    <div className="text-sm text-muted-foreground">{t!.stats.markets}</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{t!.stats.languagesVal}</div>
                    <div className="text-sm text-muted-foreground">{t!.stats.languages}</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">{t!.stats.supportVal}</div>
                    <div className="text-sm text-muted-foreground">{t!.stats.support}</div>
                  </div>
                </>
              ) : (
                <>
                  <div><div className="text-2xl md:text-3xl font-bold">55+</div><div className="text-sm text-muted-foreground">Projects</div></div>
                  <div><div className="text-2xl md:text-3xl font-bold">5</div><div className="text-sm text-muted-foreground">Markets</div></div>
                  <div><div className="text-2xl md:text-3xl font-bold">EN/EL</div><div className="text-sm text-muted-foreground">Languages</div></div>
                  <div><div className="text-2xl md:text-3xl font-bold">24/7</div><div className="text-sm text-muted-foreground">Support</div></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
