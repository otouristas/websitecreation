import Image from "next/image";
import { getTrustStats } from "@/data/trust-stats";
import { HOME_LOGOS } from "@/data/home-content";
import type { SiteLocale } from "@/lib/i18n/locale";
import { Counter } from "@/components/motion/Counter";

/**
 * Proof rail: the four derived trust numbers (project count comes from the
 * portfolio dataset, so it cannot drift from /work) counting up, then the
 * client logo marquee. One hairline band, straight under the hero.
 */
export function ProofRail({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const stats = getTrustStats(locale);

  const track = (ariaHidden: boolean) => (
    <div
      className="marquee flex shrink-0 items-center gap-14 pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {HOME_LOGOS.map((logo) => (
        <Image
          key={`${logo.alt}-${ariaHidden}`}
          src={logo.src}
          alt={ariaHidden ? "" : logo.alt}
          width={140}
          height={44}
          // Next's optimizer refuses to serve SVG inline unless
          // `dangerouslyAllowSVG` is set. These are our own static files, so
          // bypass the optimizer for them rather than loosening that flag.
          unoptimized={logo.src.endsWith(".svg")}
          // Most marks are dark-on-transparent: invert them on the dark canvas
          // so they read as light silhouettes, and let the light theme show
          // them as shipped. Colour returns on hover in light only.
          className="h-10 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 dark:invert light:hover:grayscale-0"
        />
      ))}
    </div>
  );

  return (
    <section className="relative border-y border-hairline bg-surface/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const numeric = /^\d+$/.test(s.value);
          const suffix = /^\d+/.test(s.value) && !numeric ? s.value.replace(/^\d+/, "") : "";
          const n = parseInt(s.value, 10);
          return (
            <div
              key={s.label}
              className={`px-6 py-8 ${i % 2 === 1 ? "border-l border-hairline" : ""} ${
                i >= 2 ? "border-t border-hairline lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="font-display text-4xl font-semibold tabular-nums tracking-[-0.04em] text-foreground sm:text-5xl">
                {Number.isFinite(n) && /^\d+/.test(s.value) ? (
                  <Counter value={n} suffix={suffix} />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-hairline py-8">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {isEl
            ? "Μας εμπιστεύονται επιχειρήσεις σε Ελλάδα και εξωτερικό"
            : "Trusted by businesses across Greece and beyond"}
        </p>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </section>
  );
}
