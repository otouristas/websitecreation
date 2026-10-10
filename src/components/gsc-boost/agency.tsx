import { ArrowRight, Command, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { CheckList, KitEyebrow, PCard, kitSoftwareBtn } from "@/components/kit";
import { appLink, formatNumber, formatUsd } from "./copy";
import { planById, yearlySavings } from "./plans";

type L = SiteLocale;

/** The ⌘K site switcher, drawn on fictional properties. */
export function SiteSwitcherMini({ locale, className }: { readonly locale: L; readonly className?: string }) {
  const sites = ["aegean-suites.example", "villa-thalassa.example", "naxos-tours.example", "milos-rent.example", "kyma-hotel.example"];
  return (
    <PCard className={cn("mx-auto max-w-[520px]", className)}>
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 text-muted-foreground">
        <Search className="size-4" aria-hidden />
        <span className="flex-1 text-[13px]">{locale === "el" ? "Αναζήτηση ιστοτόπων…" : "Search properties…"}</span>
        <kbd className="rounded border border-hairline bg-background px-1.5 font-sans text-[11px]">⌘K</kbd>
      </div>
      <ul className="p-2">
        {sites.map((s, i) => (
          <li
            key={s}
            className={cn("flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13px]", i === 1 ? "bg-primary/10 text-foreground" : "text-foreground/85")}
          >
            <span className="truncate">{s}</span>
            <span className="shrink-0 text-[11px] text-muted-foreground">{i === 1 ? "↵" : "Domain"}</span>
          </li>
        ))}
      </ul>
    </PCard>
  );
}

/** The Agency plan, with its real price, allowance and limits. */
export function AgencyPlanCard({ locale, source }: { readonly locale: L; readonly source: string }) {
  const isEl = locale === "el";
  const plan = planById("Agency");
  return (
    <div className="grid overflow-hidden rounded-2xl border border-hairline bg-surface/60 lg:grid-cols-[1fr_1.1fr]">
      <div className="border-b border-hairline p-7 sm:p-9 lg:border-b-0 lg:border-r">
        <KitEyebrow icon={<Command />}>{isEl ? "Πακέτο Agency" : "Agency plan"}</KitEyebrow>
        <div className="mt-5 flex items-baseline gap-1.5">
          <span className="font-display text-[48px] font-semibold leading-none tracking-[-0.04em] text-foreground tabular-nums">{formatUsd(locale, plan.monthly)}</span>
          <span className="text-[15px] text-muted-foreground">{isEl ? "/ μήνα" : "/ month"}</span>
        </div>
        <p className="mt-2 text-[14px] text-muted-foreground">
          {isEl
            ? `ή ${formatUsd(locale, plan.yearly)} τον χρόνο, εξοικονομώντας ${formatUsd(locale, yearlySavings(plan))}`
            : `or ${formatUsd(locale, plan.yearly)} a year, saving ${formatUsd(locale, yearlySavings(plan))}`}
        </p>
        <dl className="mt-7 grid grid-cols-3 divide-x divide-hairline rounded-xl border border-hairline bg-background/60 text-center">
          {(
            [
              [isEl ? "Μονάδες / μήνα" : "Credits / mo", formatNumber(locale, plan.credits)],
              [isEl ? "Ιστότοποι" : "Sites", String(plan.sites)],
              [isEl ? "Χρήστες" : "Seats", String(plan.seats)],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="px-2 py-3">
              <dt className="text-[11px] text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 text-[16px] font-semibold tabular-nums text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={appLink("/signup", locale, source, { plan: plan.id, cycle: "monthly" })} className={cn(kitSoftwareBtn, "pl-5")}>
            {isEl ? `Ξεκινήστε με το ${plan.id}` : `Start with ${plan.id}`}
            <ArrowRight className="size-4" />
          </a>
          <Link href={`${localizedPath(locale, "/platform/pricing")}#compare`} className="text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            {isEl ? "Σύγκριση όλων των πακέτων" : "Compare all plans"}
          </Link>
        </div>
      </div>
      <div className="p-7 sm:p-9">
        <h3 className="text-[15px] font-semibold text-foreground">{plan.tagline[locale]}</h3>
        <CheckList
          className="mt-5"
          items={[
            ...plan.features.map((f) => f[locale]),
            isEl ? "Ανάλυση Search Console, ευκαιρίες και αναφορές με 0 μονάδες" : "Search Console analysis, opportunities and reports at 0 credits",
          ]}
        />
      </div>
    </div>
  );
}
