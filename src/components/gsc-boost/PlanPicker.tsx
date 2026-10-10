"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import { CheckList } from "@/components/kit/primitives";
import { kitSecondaryBtn, kitSoftwareBtn } from "@/components/kit/sections";
import { appLink, formatNumber, formatUsd } from "./copy";
import { PLANS, yearlySavings, type BillingCycle, type Plan } from "./plans";

const T = {
  monthly: { en: "Monthly", el: "Μηνιαία" },
  yearly: { en: "Yearly", el: "Ετήσια" },
  free2: { en: "2 months free", el: "2 μήνες δωρεάν" },
  period: { en: "Billing period", el: "Περίοδος χρέωσης" },
  perMonth: { en: "/ month", el: "/ μήνα" },
  perYear: { en: "/ year", el: "/ έτος" },
  recommended: { en: "Recommended", el: "Προτείνεται" },
  credits: { en: "Credits / mo", el: "Μονάδες / μήνα" },
  sites: { en: "Sites", el: "Ιστότοποι" },
  seats: { en: "Seats", el: "Χρήστες" },
} as const;

function priceParts(plan: Plan, cycle: BillingCycle, l: SiteLocale) {
  if (cycle === "monthly") {
    return {
      amount: formatUsd(l, plan.monthly),
      unit: T.perMonth[l],
      note:
        l === "el"
          ? `ή ${formatUsd(l, plan.yearly)} τον χρόνο, με 2 μήνες δώρο`
          : `or ${formatUsd(l, plan.yearly)} a year, 2 months free`,
    };
  }
  const perMonth = formatUsd(l, plan.yearly / 12, 2);
  const savings = formatUsd(l, yearlySavings(plan));
  return {
    amount: formatUsd(l, plan.yearly),
    unit: T.perYear[l],
    note:
      l === "el"
        ? `${perMonth} τον μήνα, με ετήσια χρέωση · εξοικονομείτε ${savings}`
        : `${perMonth} a month, billed yearly · save ${savings}`,
  };
}

export function BillingToggle({
  cycle,
  onChange,
  locale,
  className,
}: {
  readonly cycle: BillingCycle;
  readonly onChange: (c: BillingCycle) => void;
  readonly locale: SiteLocale;
  readonly className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={T.period[locale]}
      className={cn("inline-flex items-center gap-1 rounded-full border border-hairline bg-surface/80 p-1 backdrop-blur", className)}
    >
      {(["monthly", "yearly"] as const).map((value) => {
        const active = cycle === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(value)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {T[value][locale]}
            {value === "yearly" ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-px text-[11px] font-medium",
                  active ? "bg-background/15 text-background" : "bg-success/15 text-success",
                )}
              >
                {T.free2[locale]}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ plan, cycle, locale, source }: { readonly plan: Plan; readonly cycle: BillingCycle; readonly locale: SiteLocale; readonly source: string }) {
  const price = priceParts(plan, cycle, locale);
  const featured = Boolean(plan.highlight);
  const href = appLink("/signup", locale, `${source}-${plan.id.toLowerCase()}`, { plan: plan.id, cycle });
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 sm:p-7",
        featured
          ? "border-signal/45 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] ring-1 ring-signal/20"
          : "border-hairline bg-surface/60",
      )}
    >
      {featured ? (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-signal px-2.5 py-0.5 text-[12px] font-semibold text-signal-foreground">
          {T.recommended[locale]}
        </span>
      ) : null}
      <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{plan.id}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground sm:min-h-[44px]">{plan.tagline[locale]}</p>
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-foreground tabular-nums">{price.amount}</span>
        <span className="text-[14px] text-muted-foreground">{price.unit}</span>
      </div>
      <p className="mt-2 min-h-[20px] text-[13px] text-muted-foreground">{price.note}</p>
      <a href={href} className={cn("mt-6 w-full", featured ? cn(kitSoftwareBtn, "pl-5") : kitSecondaryBtn)}>
        {locale === "el" ? `Ξεκινήστε με το ${plan.id}` : `Start with ${plan.id}`}
        <ArrowRight className="size-4" />
      </a>
      <dl className="mt-6 grid grid-cols-3 divide-x divide-hairline rounded-xl border border-hairline bg-background/60 text-center">
        {(
          [
            [T.credits[locale], formatNumber(locale, plan.credits)],
            [T.sites[locale], String(plan.sites)],
            [T.seats[locale], String(plan.seats)],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="px-2 py-2.5">
            <dt className="text-[11px] text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
      <CheckList items={plan.features.map((f) => f[locale])} size="sm" className="mt-6" />
    </div>
  );
}

/**
 * The three GSC Boost plans with a monthly/yearly switch. Every plan button
 * goes to the app's sign-up with `plan` and `cycle`, which the app reads to
 * preselect the plan after Google sign-in.
 */
export function PlanPicker({ locale, source, className }: { readonly locale: SiteLocale; readonly source: string; readonly className?: string }) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  return (
    <div className={className}>
      <div className="flex justify-center">
        <BillingToggle cycle={cycle} onChange={setCycle} locale={locale} />
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-start">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} cycle={cycle} locale={locale} source={source} />
        ))}
      </div>
    </div>
  );
}
