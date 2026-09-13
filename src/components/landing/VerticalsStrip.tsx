import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_VERTICALS } from "@/data/home-content";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Eyebrow, Section, SectionHeading } from "./primitives";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The three tourism verticals as tall cards. Each one is backed by a real
 * client screenshot from the portfolio, dimmed under the canvas gradient so
 * the type stays readable and the card still reads as "a site we built".
 */
export function VerticalsStrip({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="ideal-for">
      <SectionHeading
        eyebrow={isEl ? "Εξειδίκευση" : "Ideal for"}
        title={isEl ? "Ξέρουμε τον κλάδο σας" : "We know your vertical"}
        body={
          isEl
            ? "Δεν φτιάχνουμε γενικές ιστοσελίδες. Η εμπειρία μας είναι στον τουρισμό και τη φιλοξενία."
            : "We do not build generic websites. Our depth is in tourism and hospitality."
        }
      />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {HOME_VERTICALS.map((v, i) => (
          <Reveal key={v.slug} delay={i * 0.08}>
            <Link
              href={lp(`/solutions/${v.slug}`)}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl border border-hairline bg-surface transition-colors hover:border-brand/40"
            >
              <Image
                src={v.screenshot}
                alt={isEl ? v.screenshotAltEl : v.screenshotAltEn}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top opacity-40 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-55 motion-reduce:transition-none"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_10%,transparent)_0%,color-mix(in_oklab,var(--background)_55%,transparent)_45%,var(--background)_100%)]"
              />
              <div className="relative p-7">
                <Eyebrow>{isEl ? "Λύση" : "Solution"}</Eyebrow>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {isEl ? v.titleEl : v.titleEn}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isEl ? v.descEl : v.descEn}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
