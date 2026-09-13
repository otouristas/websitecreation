import type { ComponentType } from "react";
import {
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  LayoutTemplate,
  Link2,
  MapPin,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { HOME_FEATURES, HOME_ENGINES, HOME_PROMPT_SAMPLES, type HomeFeatureIcon } from "@/data/home-content";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { Bento, BentoCell, Eyebrow, Section, SectionHeading } from "./primitives";
import { ProductFrame, SearchChart } from "./graphics";
import { Reveal } from "@/components/motion/Reveal";

const ICONS: Record<HomeFeatureIcon, ComponentType<{ className?: string }>> = {
  search: Search,
  audit: ClipboardCheck,
  pin: MapPin,
  sparkles: Sparkles,
  layout: LayoutTemplate,
  cart: ShoppingCart,
  book: BookOpen,
  link: Link2,
};

/** Static engine rows for the GEO cell: the first sample, fully resolved. */
function EngineRows({ locale }: { locale: SiteLocale }) {
  const sample = HOME_PROMPT_SAMPLES[locale][0];
  const isEl = locale === "el";
  return (
    <div className="mt-6 rounded-xl border border-hairline bg-background/60 p-3">
      <p className="mb-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        “{sample.prompt}”
      </p>
      <ul className="space-y-1.5">
        {HOME_ENGINES.map((e) => {
          const cited = sample.cited[e.id];
          return (
            <li
              key={e.id}
              className={`flex items-center justify-between gap-3 rounded-lg border px-2.5 py-1.5 text-[12px] ${
                cited ? "border-signal/30 bg-signal/10 text-foreground" : "border-hairline text-muted-foreground"
              }`}
            >
              <span>{e.name}</span>
              <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${cited ? "text-signal" : ""}`}>
                {cited ? (isEl ? "Αναφέρεται" : "Cited") : isEl ? "Όχι" : "No"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Services as a bento. The two offers that carry the positioning - AI
 * visibility and website design - get the large cells with a live visual; the
 * other six are compact. Every cell is a link into its service page.
 */
export function ServicesBento({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const [ai, web, ...rest] = HOME_FEATURES;

  const cellHeader = (f: (typeof HOME_FEATURES)[number], large = false) => {
    const Icon = ICONS[f.icon];
    return (
      <>
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-9 place-items-center rounded-xl border border-hairline bg-background/60 text-brand">
            <Icon className="size-4" />
          </span>
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            aria-hidden
          />
        </div>
        <Eyebrow className="mt-5" dot={false}>
          {isEl ? f.eyebrowEl : f.eyebrowEn}
        </Eyebrow>
        <h3
          className={`mt-2 font-display font-semibold tracking-[-0.03em] text-foreground ${
            large ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {isEl ? f.titleEl : f.titleEn}
        </h3>
        <p className={`mt-2 leading-relaxed text-muted-foreground ${large ? "text-base" : "text-sm"}`}>
          {isEl ? f.bodyEl : f.bodyEn}
        </p>
      </>
    );
  };

  return (
    <Section id="features">
      <SectionHeading
        eyebrow={isEl ? "Τι κάνουμε" : "What we do"}
        title={
          isEl ? (
            <>
              Ό,τι χρειάζεται για να <span className="gradient-text">σας βρίσκουν</span>
            </>
          ) : (
            <>
              Everything it takes to <span className="gradient-text">get found</span>
            </>
          )
        }
        body={
          isEl
            ? "Μία ομάδα για κατασκευή, SEO και ορατότητα σε AI. Χωρίς να συντονίζετε τρεις διαφορετικούς συνεργάτες."
            : "One team for the build, the SEO and the AI visibility. No coordinating three separate suppliers."
        }
      />

      <Reveal className="mt-14">
        <Bento>
          {/* GEO & AEO: tall hero cell with the engine rows */}
          <BentoCell href={lp(ai.href)} className="md:col-span-6 lg:col-span-6 lg:row-span-2">
            {cellHeader(ai, true)}
            <EngineRows locale={locale} />
          </BentoCell>

          {/* Website design: wide hero cell with the Search Console chart */}
          <BentoCell href={lp(web.href)} className="md:col-span-6 lg:col-span-6">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_1fr] sm:items-center">
              <div>{cellHeader(web, true)}</div>
              <div className="hidden sm:block">
                <ProductFrame url="app.anotherseoguru.com" className="text-left" padded={false}>
                  <div className="p-3">
                    <SearchChart />
                  </div>
                </ProductFrame>
              </div>
            </div>
          </BentoCell>

          {rest.map((f) => (
            <BentoCell key={f.href} href={lp(f.href)} className="md:col-span-3 lg:col-span-3">
              {cellHeader(f)}
            </BentoCell>
          ))}
        </Bento>
      </Reveal>
    </Section>
  );
}
