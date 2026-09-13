import { HOME_REASONS } from "@/data/home-content";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Bloom, Eyebrow, GhostButtonLink, Numeral, Section } from "./primitives";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "What makes us different" as a two-column spread: the heading stays put on
 * the left while the five numbered reasons scroll past on the right, each on
 * the hairline spine.
 */
export function WhyUsTimeline({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="different" className="relative">
      <Bloom soft className="-left-32 top-1/3 h-80 w-[36rem]" />
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{isEl ? "Γιατί εμείς" : "Why us"}</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground">
            {isEl ? (
              <>
                Τι μας κάνει
                <br />
                <span className="gradient-text">διαφορετικούς;</span>
              </>
            ) : (
              <>
                What makes us
                <br />
                <span className="gradient-text">different?</span>
              </>
            )}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {isEl
              ? "Δεν είμαστε ούτε μόνο agency ούτε μόνο λογισμικό. Είμαστε και τα δύο, και αυτό αλλάζει τον τρόπο που δουλεύουμε."
              : "We are not only an agency, and not only software. We are both, and that changes how the work gets done."}
          </p>
          <div className="mt-8">
            <GhostButtonLink href={lp("/about")}>{isEl ? "Ποιοι είμαστε" : "About us"}</GhostButtonLink>
          </div>
        </div>

        <ol className="relative border-l border-hairline">
          {HOME_REASONS.map((r, i) => (
            <Reveal key={r.titleEn} as="li" delay={i * 0.06} className="relative pb-10 pl-8 last:pb-0">
              <div>
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--brand)_20%,transparent)]"
                />
                <Numeral n={i + 1} />
                <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-foreground md:text-2xl">
                  {isEl ? r.titleEl : r.titleEn}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                  {isEl ? r.bodyEl : r.bodyEn}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
