import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolioBySlug, PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { HOME_WORK_SLUGS } from "@/data/home-content";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Eyebrow, GhostButtonLink, Section, SectionHeading } from "./primitives";
import { ProductFrame } from "./graphics";

/**
 * Horizontal rail of live client work. Native scroll-snap, no JS: it scrolls
 * with the wheel, a trackpad, a thumb, or the keyboard. Only projects that
 * are `featured` and still online are eligible; a dead domain is never shown
 * as proof.
 */
export function WorkRail({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const projects = HOME_WORK_SLUGS.map(getPortfolioBySlug).filter(
    (p): p is NonNullable<typeof p> => !!p && p.featured && !p.liveStatus,
  );

  return (
    <Section id="in-action" className="max-w-none px-0">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow={isEl ? "Έργα" : "Work"}
          title={
            isEl ? (
              <>
                Δουλειά που <span className="gradient-text">κατατάσσεται</span>
              </>
            ) : (
              <>
                Work that <span className="gradient-text">actually ranks</span>
              </>
            )
          }
          body={
            isEl
              ? "Ζωντανά έργα με τη διεύθυνσή τους. Ανοίξτε το οποιοδήποτε και δείτε τι παραδίδουμε στην πράξη."
              : "Live projects with their real address. Open any of them and see what we deliver in practice."
          }
        />
      </div>

      <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 scrollbar-none [scroll-padding-inline:1.5rem] md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        {projects.map((project) => {
          const cat = PORTFOLIO_CATEGORIES[project.category];
          return (
            <article
              key={project.slug}
              className="group w-[85vw] shrink-0 snap-start sm:w-[34rem]"
            >
              <Link href={lp(`/work/${project.slug}`)} className="block">
                <ProductFrame
                  url={project.url.replace(/^https?:\/\//, "")}
                  padded={false}
                  className="transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={project.screenshot}
                      alt={isEl ? `${project.name} - αρχική σελίδα` : `${project.name} homepage`}
                      fill
                      sizes="(max-width: 640px) 85vw, 544px"
                      className="object-cover object-top"
                    />
                  </div>
                </ProductFrame>
              </Link>
              <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <Eyebrow dot={false}>{isEl ? cat.labelEl : cat.label}</Eyebrow>
                  <h3 className="mt-1.5 truncate font-display text-xl font-semibold tracking-[-0.03em] text-foreground">
                    {project.name}
                  </h3>
                </div>
                <Link
                  href={lp(`/work/${project.slug}`)}
                  className="inline-flex shrink-0 items-center gap-1.5 pt-1 text-sm font-medium text-link hover:text-brand"
                >
                  {isEl ? "Το έργο" : "View"}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between gap-4 px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {isEl ? "Σύρετε για περισσότερα" : "Scroll for more"} →
        </p>
        <GhostButtonLink href={lp("/work")} className="shrink-0">
          {isEl ? "Όλα τα έργα" : "View all projects"}
        </GhostButtonLink>
      </div>
    </Section>
  );
}
