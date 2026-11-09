import { Fragment } from "react";
import { ArrowRight, Check, Download, LineChart, LockKeyhole, MessageSquare, Minus, RotateCcw, Sparkles, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/BrandLogo";
import { kitSecondaryBtn } from "@/components/kit/sections";
import { cn } from "@/lib/cn";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { appLink, formatCredits, formatNumber, formatUsd, type Copy } from "./copy";
import { ADDONS, COMPARISON_GROUPS, comparisonRows, CREDIT_COSTS, CREDIT_EXAMPLES, CREDIT_PACKS, FREE_PLAN, PLANS, TRIAL, type ComparisonRow } from "./plans";

type L = SiteLocale;

const INCLUDED: ReadonlyArray<{ icon: LucideIcon; label: Copy }> = [
  { icon: LockKeyhole, label: { en: "Read-only Google connection", el: "Σύνδεση με τη Google μόνο για ανάγνωση" } },
  { icon: LineChart, label: { en: "Up to 16 months of Search Console history", el: "Έως 16 μήνες ιστορικό Search Console" } },
  { icon: Sparkles, label: { en: "Opportunity engine with click estimates", el: "Μηχανή ευκαιριών με εκτιμήσεις κλικ" } },
  {
    icon: MessageSquare,
    label: {
      en: `AI assistant at ${CREDIT_COSTS.seo_ai_chat} credit per question`,
      el: `Βοηθός AI με ${CREDIT_COSTS.seo_ai_chat} μονάδα ανά ερώτηση`,
    },
  },
  { icon: Download, label: { en: "CSV export from every table", el: "Εξαγωγή σε CSV από κάθε πίνακα" } },
  { icon: RotateCcw, label: { en: "Cancel anytime from Billing", el: "Ακύρωση οποτεδήποτε από τις Χρεώσεις" } },
];

export function IncludedGrid({ locale }: { readonly locale: L }) {
  return (
    <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {INCLUDED.map(({ icon: Icon, label }) => (
        <li key={label.en} className="flex items-center gap-3 text-[14.5px] text-foreground">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface text-brand">
            <Icon className="size-4" aria-hidden />
          </span>
          {label[locale]}
        </li>
      ))}
    </ul>
  );
}

function Included({ included, locale }: { readonly included: boolean; readonly locale: L }) {
  return included ? (
    <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand/15 text-brand">
      <Check className="size-3" strokeWidth={3} aria-hidden />
      <span className="sr-only">{locale === "el" ? "Περιλαμβάνεται" : "Included"}</span>
    </span>
  ) : (
    <span className="inline-flex size-5 items-center justify-center text-muted-foreground/60">
      <Minus className="size-3.5" aria-hidden />
      <span className="sr-only">{locale === "el" ? "Δεν περιλαμβάνεται" : "Not included"}</span>
    </span>
  );
}

const stickyCell = "sticky left-0 z-10 bg-surface px-4 text-left shadow-[inset_-1px_0_0_var(--hairline)] sm:shadow-none";

/** Plan comparison derived from PLANS, so it can never drift from the cards. */
export function ComparisonTable({ locale, source }: { readonly locale: L; readonly source: string }) {
  const isEl = locale === "el";
  const usage: ReadonlyArray<[string, (p: (typeof PLANS)[number]) => string]> = [
    [isEl ? "Μονάδες κάθε μήνα" : "Credits every month", (p) => formatNumber(locale, p.credits)],
    [isEl ? "Ιστότοποι" : "Sites", (p) => String(p.sites)],
    [isEl ? "Θέσεις χρηστών" : "Team seats", (p) => String(p.seats)],
  ];
  const rows = comparisonRows();
  const group = (label: string) => (
    <tr>
      <th
        colSpan={4}
        scope="colgroup"
        className="border-t border-hairline bg-[color-mix(in_oklab,var(--brand)_8%,var(--surface))] px-4 py-3 text-left text-[13px] font-semibold tracking-[-0.01em] text-foreground"
      >
        <span className="sticky left-4">{label}</span>
      </th>
    </tr>
  );
  const featureRow = (row: ComparisonRow) => (
    <tr key={row.feature.en} className="border-t border-hairline">
      <th scope="row" className={cn(stickyCell, "py-3 font-normal text-foreground")}>
        {row.feature[locale]}
        {/^(Search Console|Opportunity engine)/.test(row.feature.en) ? (
          <span className="ml-2 whitespace-nowrap rounded-full bg-success/15 px-1.5 py-px text-[11px] font-medium text-success">
            {isEl ? "0 μονάδες" : "0 credits"}
          </span>
        ) : null}
      </th>
      {row.included.map((inc, i) => (
        <td key={PLANS[i].id} className={cn("px-4 py-3", PLANS[i].highlight && "bg-accent")}>
          <Included included={inc} locale={locale} />
        </td>
      ))}
    </tr>
  );
  return (
    <div
      role="region"
      aria-label={isEl ? "Σύγκριση πακέτων" : "Plan comparison"}
      tabIndex={0}
      className="relative overflow-x-auto rounded-2xl border border-hairline bg-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
    >
      <table className="w-full min-w-[620px] border-collapse text-[14px]">
        <caption className="sr-only">{isEl ? "Σύγκριση πακέτων" : "Plan comparison"}</caption>
        <thead>
          <tr className="border-b border-hairline">
            <th scope="col" className={cn(stickyCell, "w-[40%] py-4 align-bottom text-[13px] font-medium text-muted-foreground")}>
              {isEl ? "Τιμές σε δολάρια ΗΠΑ" : "Prices in US dollars"}
            </th>
            {PLANS.map((p) => (
              <th key={p.id} scope="col" className={cn("px-4 py-4 text-left align-bottom", p.highlight && "bg-accent")}>
                <div className="text-[15px] font-semibold text-foreground">{p.id}</div>
                <div className="mt-0.5 text-[13px] font-normal tabular-nums text-muted-foreground">
                  {formatUsd(locale, p.monthly)} {isEl ? "/ μήνα" : "/ month"}
                </div>
                <div className="text-[12px] font-normal tabular-nums text-muted-foreground/80">
                  {isEl ? "ή" : "or"} {formatUsd(locale, p.yearly)} {isEl ? "/ έτος" : "/ year"}
                </div>
                <a
                  href={appLink("/signup", locale, `${source}-${p.id.toLowerCase()}`, { plan: p.id, cycle: "monthly" })}
                  className={cn(
                    "mt-3 inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-md px-3 text-[12.5px] font-semibold transition-colors",
                    p.highlight ? "asg-primary-action text-primary-foreground" : "border border-hairline bg-background text-foreground hover:border-brand/50",
                  )}
                >
                  {isEl ? `Επιλογή ${p.id}` : `Choose ${p.id}`}
                </a>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON_GROUPS.map((groupMeta) => {
            const featureRows = rows.filter((row) => row.group === groupMeta.id);
            if (groupMeta.id !== "usage" && featureRows.length === 0) return null;
            return (
              <Fragment key={groupMeta.id}>
                {group(groupMeta.label[locale])}
                {groupMeta.id === "usage"
                  ? usage.map(([label, value]) => (
                      <tr key={label} className="border-t border-hairline">
                        <th scope="row" className={cn(stickyCell, "py-3 font-normal text-foreground")}>
                          {label}
                        </th>
                        {PLANS.map((p) => (
                          <td key={p.id} className={cn("px-4 py-3 font-medium tabular-nums text-foreground", p.highlight && "bg-accent")}>
                            {value(p)}
                          </td>
                        ))}
                      </tr>
                    ))
                  : null}
                {featureRows.map(featureRow)}
              </Fragment>
            );
          })}
          {rows.some((row) => row.group === "other") ? group(isEl ? "Δυνατότητες" : "Features") : null}
          {rows.filter((row) => row.group === "other").map(featureRow)}
        </tbody>
      </table>
    </div>
  );
}

/** How many times a month of credits covers each action, per plan. */
export function CreditCapacity({ locale }: { readonly locale: L }) {
  const isEl = locale === "el";
  return (
    <div
      role="region"
      aria-label={isEl ? "Τι καλύπτουν οι μονάδες ενός μήνα σε κάθε πακέτο" : "What a month of credits covers on each plan"}
      tabIndex={0}
      className="relative overflow-x-auto rounded-2xl border border-hairline bg-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
    >
      <table className="w-full min-w-[560px] text-[14px]">
        <caption className="sr-only">{isEl ? "Τι καλύπτουν οι μονάδες ενός μήνα σε κάθε πακέτο" : "What a month of credits covers on each plan"}</caption>
        <thead>
          <tr className="border-b border-hairline text-left text-[12px] text-muted-foreground">
            <th scope="col" className={cn(stickyCell, "py-3 font-medium")}>
              {isEl ? "Ενέργεια" : "Action"}
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              {isEl ? "Κόστος" : "Cost"}
            </th>
            {PLANS.map((p) => (
              <th key={p.id} scope="col" className="whitespace-nowrap px-4 py-3 text-right font-medium">
                {p.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CREDIT_EXAMPLES.map((ex) => (
            <tr key={ex.label.en} className="border-t border-hairline">
              <th scope="row" className={cn(stickyCell, "py-3 font-normal text-foreground")}>
                {ex.label[locale]}
              </th>
              <td className={cn("whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums", ex.credits === 0 ? "text-success" : "text-foreground")}>
                {formatCredits(locale, ex.credits)}
              </td>
              {PLANS.map((p) => (
                <td key={p.id} className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-muted-foreground">
                  {ex.credits === 0 ? (isEl ? "Περιλαμβάνεται" : "Included") : `${formatNumber(locale, Math.floor(p.credits / ex.credits))}×`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-hairline px-4 py-3 text-[12px] text-muted-foreground">
        {isEl
          ? "Οι στήλες των πακέτων δείχνουν πόσες φορές θα κάλυπταν οι μονάδες ενός μήνα τη συγκεκριμένη ενέργεια μόνη της. Στην πράξη, η χρήση συνδυάζει διάφορες ενέργειες."
          : "Plan columns show how many times one month’s credits would cover that action on its own. Real usage mixes actions."}
      </p>
    </div>
  );
}

export function CreditPacks({ locale, source }: { readonly locale: L; readonly source: string }) {
  const isEl = locale === "el";
  const best = Math.min(...CREDIT_PACKS.map((p) => p.price / (p.credits + p.bonus)));
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {CREDIT_PACKS.map((pack) => {
        const total = pack.credits + pack.bonus;
        const perCredit = pack.price / total;
        return (
          <div key={pack.name} className="flex flex-col rounded-xl border border-hairline bg-surface/60 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold text-foreground">{pack.name}</span>
              {perCredit === best ? (
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
                  {isEl ? "Χαμηλότερη τιμή ανά μονάδα" : "Lowest per credit"}
                </span>
              ) : null}
            </div>
            <div className="mt-4 font-display text-[28px] font-semibold leading-none tracking-[-0.03em] text-foreground tabular-nums">{formatNumber(locale, total)}</div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              {isEl ? "μονάδες" : "credits"}
              {pack.bonus > 0 ? <span> · {isEl ? `περιλαμβάνει ${formatNumber(locale, pack.bonus)} μονάδες δώρο` : `includes ${formatNumber(locale, pack.bonus)} bonus`}</span> : null}
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-hairline pt-4">
              <span className="text-[18px] font-semibold tabular-nums text-foreground">{formatUsd(locale, pack.price)}</span>
              <span className="text-[12px] tabular-nums text-muted-foreground">
                {formatUsd(locale, perCredit, 3)} {isEl ? "/ μονάδα" : "/ credit"}
              </span>
            </div>
          </div>
        );
      })}
      <p className="text-[13px] text-muted-foreground sm:col-span-3">
        {isEl
          ? "Εφάπαξ ενισχύσεις για τους πιο φορτωμένους μήνες, που αγοράζονται από τις Χρεώσεις μέσα στην εφαρμογή."
          : "One-time top-ups for busy months, bought from Billing inside the app."}{" "}
        <a href={appLink("/signup", locale, source)} className="font-medium text-link hover:underline hover:underline-offset-4">
          {isEl ? "Δημιουργήστε λογαριασμό" : "Create an account"}
        </a>
      </p>
    </div>
  );
}

/**
 * Free stays a compact offer above the paid cards. Only the credit allowance
 * is stated here: site and seat limits for Free are in the catalog, but they
 * are not on the public pricing page and are not confirmed for this update.
 */
export function FreePlanCard({ locale }: { readonly locale: L }) {
  const isEl = locale === "el";
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-6">
      <div className="flex min-w-0 items-start gap-4 text-left">
        <BrandMark className="mt-0.5 h-11 w-auto shrink-0" />
        <div className="min-w-0">
          <h3 className="font-display text-[18px] font-semibold tracking-[-0.02em] text-foreground">
            Free · {formatUsd(locale, 0)} {isEl ? "για πάντα" : "forever"}
          </h3>
          <p className="mt-1 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">
            {isEl
              ? `${formatNumber(locale, FREE_PLAN.credits)} μονάδες τον μήνα, χωρίς κάρτα. Μπορείτε επίσης να δοκιμάσετε το Pro δωρεάν για ${TRIAL.days} ημέρες.`
              : `${formatNumber(locale, FREE_PLAN.credits)} credits a month, no card. You can also try Pro free for ${TRIAL.days} days.`}
          </p>
        </div>
      </div>
      <a href={appLink("/signup", locale, "pricing-free")} className={cn(kitSecondaryBtn, "w-full shrink-0 sm:w-auto")}>
        {isEl ? "Ξεκινήστε δωρεάν" : "Start free"}
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

/** Keeps the software ladder separate from managed SEO, without quoting agency prices. */
export function AppVersusAgencyNote({ locale }: { readonly locale: L }) {
  const isEl = locale === "el";
  return (
    <p className="text-pretty text-center text-[14.5px] leading-relaxed text-muted-foreground">
      {isEl ? "Θέλετε να κάνει τη δουλειά η ομάδα μας; " : "Want our team to do the work? "}
      <Link
        href={localizedPath(locale, "/ypiresies/times")}
        className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground"
      >
        {isEl ? "Δείτε τα πακέτα υπηρεσιών SEO" : "See the SEO service packages"}
      </Link>
      {isEl ? " (ξεχωριστά από το App)." : " (separate from the App)."}
    </p>
  );
}

/** Recurring add-ons on any paid plan, with the app's prices. */
export function AddonList({ locale }: { readonly locale: L }) {
  const isEl = locale === "el";
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ADDONS.map((addon) => (
        <li key={addon.id} className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface/60 px-5 py-4">
          <span className="text-[14px] font-medium text-foreground">{addon.name[locale]}</span>
          <span className="shrink-0 text-[14px] font-semibold tabular-nums text-foreground">
            {formatUsd(locale, addon.monthly)}
            <span className="font-normal text-muted-foreground">{isEl ? " / μήνα" : " / mo"}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
