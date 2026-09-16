import type { CSSProperties } from "react";
import { elHome } from "@/data/translations/el-home";
import { resolvePriceTokens } from "@/data/pricing";
import type { SiteLocale } from "@/lib/i18n/locale";
import { Bloom, Eyebrow, Kicker } from "./primitives";
import { ScanWidget } from "./ScanWidget";
import { AnswerEnginePanel } from "./AnswerEnginePanel";

/**
 * Homepage hero.
 *
 * Copy follows `docs/keyword-research/`: /el is the C1 pillar (21 of 51 P0
 * keywords resolve to it), so the H1 leads with `seo υπηρεσίες` +
 * `προώθηση ιστοσελίδων`, and the paragraph beneath is the 40-55 word
 * answer-first opener the AEO rules require.
 *
 * The headline is server-rendered and animates with CSS only (each word is a
 * span with a staggered `--i`), so it is the LCP element and paints before any
 * JavaScript. The scan widget and the answer-engine panel hydrate after.
 */

/** Wrap each word in a staggered span. `offset` continues the stagger across lines. */
function Words({ text, offset = 0, className }: { text: string; offset?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} style={{ "--i": offset + i } as CSSProperties} className={className}>
          {word}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export function HeroKinetic({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const t = isEl ? elHome.hero : null;

  const line1 = isEl ? t!.h1Line1 : "SEO services & web design";
  const line2 = isEl ? t!.h1Line2 : "that bring in customers";
  const line1Words = line1.split(" ").length;

  const proofs = isEl
    ? ["Τεχνικό + τοπικό SEO", "GEO / AEO", "Ιστοσελίδες & e-shop", "Δωρεάν αξιολόγηση σε 24 ώρες"]
    : ["Technical + local SEO", "GEO / AEO", "Websites & e-shops", "Free audit in 24h"];

  return (
    <section className="relative overflow-hidden">
      <Bloom className="left-[20%] top-[-8rem] h-[36rem] w-[64rem] -translate-x-1/2" />
      <Bloom signal className="right-[-10%] top-[10rem] h-[28rem] w-[40rem]" />

      {/* Both columns are `min-w-0`: a grid item's automatic minimum is its
          min-content width, and the answer-engine panel's nowrap labels and
          the scan result card each measure wider than a 375px phone. Without
          it the single mobile column grew past the viewport and the
          headline, the scan widget and the panel were cut off at the edge. */}
      <div className="hero-below-header relative mx-auto grid grid-cols-[minmax(0,1fr)] max-w-6xl items-center gap-14 px-6 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-28">
        <div className="relative min-w-0">
          <Eyebrow className="rise-in">
            {isEl ? t!.badge : "SEO · GEO / AEO · Websites · E-shop"}
          </Eyebrow>

          <h1
            className={`rise-words mt-6 font-display font-semibold leading-[0.98] tracking-[-0.045em] text-foreground ${
              isEl
                ? "text-[clamp(2.25rem,5.4vw,4.5rem)]"
                : "text-[clamp(2.75rem,7vw,5.5rem)]"
            }`}
          >
            <Words text={line1} />
            <br />
            <Words text={line2} offset={line1Words} className="gradient-text" />
          </h1>

          {/* Answer-first opener: 40-55 words, entity named. Targets PAA / AI Overviews. */}
          <p className="rise-in mt-7 max-w-xl text-base leading-relaxed text-muted-foreground [animation-delay:420ms] md:text-lg">
            {isEl
              ? resolvePriceTokens(t!.sub, locale)
              : resolvePriceTokens(
                  "AnotherSEOGuru is a Greek SEO and web design agency. We handle technical SEO, local SEO, GEO/AEO and website or e-shop builds, with transparent packages from {{ENTRY_SEO}} a month. Every engagement starts with a free SEO audit, so you see what works before you commit.",
                  locale,
                )}
          </p>

          <div className="rise-in mt-9 [animation-delay:520ms]">
            <ScanWidget locale={locale} />
          </div>

          <Kicker items={proofs} className="rise-in mt-10 justify-start [animation-delay:640ms]" />
        </div>

        <div className="relative flex min-w-0 justify-center lg:justify-end">
          <div className="rise-in relative w-full min-w-0 max-w-[520px] [animation-delay:300ms]">
            <Bloom soft className="left-1/2 top-1/2 h-[30rem] w-[36rem] -translate-x-1/2 -translate-y-1/2" />
            <AnswerEnginePanel locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
