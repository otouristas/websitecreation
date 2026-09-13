import { HOME_TESTIMONIALS } from "@/data/home-content";
import type { SiteLocale } from "@/lib/i18n/locale";
import { Section, SectionHeading } from "./primitives";
import { Reveal } from "@/components/motion/Reveal";

export function TestimonialsWall({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const items = HOME_TESTIMONIALS[locale];

  return (
    <Section id="proof">
      <SectionHeading
        eyebrow={isEl ? "Πελάτες" : "Proof"}
        title={isEl ? "Τι λένε οι πελάτες μας" : "What our clients say"}
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08} className="h-full">
            <figure className="glass relative flex h-full flex-col rounded-3xl p-7">
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-2 font-display text-[6rem] font-semibold leading-none text-brand/15"
              >
                ”
              </span>
              <div className="flex items-center gap-0.5" role="img" aria-label={isEl ? "5 στα 5" : "5 out of 5"}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <svg key={k} viewBox="0 0 20 20" className="size-3.5 fill-brand text-brand" aria-hidden>
                    <path d="M10 1.5l2.35 5.1 5.55.7-4.15 3.85 1.15 5.45L10 13.9 5.1 16.6l1.15-5.45L2.1 7.3l5.55-.7L10 1.5z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-display text-lg font-medium leading-snug tracking-[-0.01em] text-foreground">
                {t.text}
              </blockquote>
              <figcaption className="mt-7 border-t border-hairline pt-5">
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
