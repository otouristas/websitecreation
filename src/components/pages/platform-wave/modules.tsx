import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModulePreview } from "@/components/gsc-boost/ModulePreview";
import { CostTable } from "@/components/gsc-boost/sections";
import { appLink, type Copy } from "@/components/gsc-boost/copy";
import { MODULES, planAvailability, type ModuleId, type ProductModule } from "@/components/gsc-boost/modules";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";
import { WaveAccent, WaveEyebrow, WaveMark, waveGhostBtn } from "./ui";

const TIERS: readonly { readonly id: string; readonly label: Copy; readonly match: (module: ProductModule) => boolean }[] = [
  {
    id: "every-plan",
    label: { en: "On every plan", el: "Σε κάθε πακέτο" },
    match: (module) => module.plans.length === 3,
  },
  {
    id: "growth",
    label: { en: "Growth and Agency", el: "Growth και Agency" },
    match: (module) => module.plans.length === 2,
  },
  {
    id: "agency",
    label: { en: "Agency plan", el: "Πακέτο Agency" },
    match: (module) => module.plans.length === 1,
  },
];

function moduleTitle(module: ProductModule, locale: SiteLocale) {
  const tail = module.title.tail?.[locale] ?? "";
  return (
    <>
      {module.title.lead[locale]} <WaveAccent>{module.title.accent[locale]}</WaveAccent>
      {tail ? (tail.startsWith(",") ? tail : ` ${tail}`) : null}
    </>
  );
}

export function TieredModuleGrid({
  locale,
  source,
  ids,
  detailed = false,
}: {
  readonly locale: SiteLocale;
  readonly source: string;
  readonly ids?: readonly ModuleId[];
  readonly detailed?: boolean;
}) {
  const isEl = locale === "el";
  const yes = isEl ? "Περιλαμβάνεται" : "Included";
  const selected = ids ? ids.map((id) => MODULES.find((module) => module.id === id)).filter((module): module is ProductModule => Boolean(module)) : MODULES;
  const tiers = TIERS.map((tier) => ({ ...tier, modules: selected.filter(tier.match) })).filter((tier) => tier.modules.length > 0);

  return (
    <div className="mt-12 space-y-14">
      {tiers.map((tier) => (
        <div key={tier.id} data-shot={tier.id} className="min-w-0 scroll-mt-28">
          <WaveEyebrow>{tier.label[locale]}</WaveEyebrow>
          <ul className={cn("mt-5 grid gap-5", detailed ? "" : "sm:grid-cols-2 lg:grid-cols-3")}>
            {tier.modules.map((module) => {
              const Icon = module.icon;
              const demo = appLink(module.demoPath, locale, `${source}-${module.id}`);
              const details = `${localizedPath(locale, "/platform/features")}#${module.id}`;
              return (
                <li key={module.id} id={detailed ? module.id : undefined} className="scroll-mt-28 min-w-0">
                  <article className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-6 sm:p-7">
                    <div className={cn("flex h-full min-w-0 flex-col", detailed && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-8")}>
                      <div className="flex min-w-0 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                            <Icon className="size-5" aria-hidden />
                          </span>
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-right text-[11px] font-semibold text-primary">
                            {planAvailability(module.plans)[locale]}
                          </span>
                        </div>
                        <h3 className="mt-5 text-balance text-[19px] font-bold leading-snug text-foreground">{moduleTitle(module, locale)}</h3>
                        <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{module.summary[locale]}</p>
                        <ul className="mt-4 space-y-2.5 text-[14px] text-foreground">
                          {module.bullets.map((bullet) => (
                            <li key={bullet.en} className="flex gap-2.5">
                              <WaveMark kind="yes" label={yes} />
                              <span className="min-w-0">{bullet[locale]}</span>
                            </li>
                          ))}
                        </ul>
                        {detailed ? (
                          <>
                            <p className="mt-4 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{module.why[locale]}</p>
                            <h4 className="mt-5 text-[13px] font-semibold text-foreground">{isEl ? "Πόσο κοστίζει" : "What it costs"}</h4>
                            <div className="mt-2">
                              <CostTable costs={module.costs} locale={locale} />
                            </div>
                          </>
                        ) : null}
                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                          <a href={demo} className={waveGhostBtn}>
                            {isEl ? "Δείτε την επίδειξη" : "See the demo"}
                            <ArrowRight className="size-4" aria-hidden />
                          </a>
                          {detailed ? (
                            <a href={appLink("/signup", locale, `${source}-${module.id}-signup`)} className="inline-flex min-h-12 items-center text-[15px] font-semibold text-primary hover:text-foreground">
                              {isEl ? "Δωρεάν εγγραφή" : "Sign up free"}
                            </a>
                          ) : (
                            <Link href={details} className="inline-flex min-h-12 items-center text-[15px] font-semibold text-primary hover:text-foreground">
                              {isEl ? "Λεπτομέρειες και κόστος" : "Details and cost"}
                            </Link>
                          )}
                        </div>
                      </div>
                      {detailed ? (
                        <div className="mt-5 min-w-0 overflow-hidden lg:mt-0">
                          <ModulePreview
                            id={module.id}
                            locale={locale}
                            footnote={isEl ? "Δείγμα δεδομένων για έναν φανταστικό ιστότοπο." : "Sample data for a fictional site."}
                          />
                        </div>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CapabilityGrid({
  yesLabel,
  tiers,
}: {
  readonly yesLabel: string;
  readonly tiers: readonly {
    readonly id: string;
    readonly label: string;
    readonly items: readonly {
      readonly key: string;
      readonly icon: ReactNode;
      readonly kicker?: string;
      readonly title: string;
      readonly body: string;
      readonly points?: readonly string[];
    }[];
  }[];
}) {
  return (
    <div className="mt-12 space-y-14">
      {tiers.map((tier) => (
        <div key={tier.id} data-shot={tier.id} className="min-w-0 scroll-mt-28">
          <WaveEyebrow>{tier.label}</WaveEyebrow>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tier.items.map((item) => (
              <li key={item.key} className="min-w-0">
                <article className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">{item.icon}</span>
                  {item.kicker ? <p className="mt-5 font-code text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{item.kicker}</p> : null}
                  <h3 className="mt-2 text-balance text-[19px] font-bold leading-snug text-foreground">{item.title}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
                  {item.points ? (
                    <ul className="mt-4 space-y-2 text-[14.5px] text-foreground">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <WaveMark kind="yes" label={yesLabel} />
                          <span className="min-w-0">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
