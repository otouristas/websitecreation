import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { appLink } from "@/components/gsc-boost/copy";
import { AsterMark } from "@/components/landing/AsterIdentity";
import { northwindTitleExample } from "@/data/northwind-title-example";
import type { SiteLocale } from "@/lib/i18n/locale";

export function TitleRecommendation({ locale }: { readonly locale: SiteLocale }) {
  const sample = northwindTitleExample[locale];
  const tx = (en: string, el: string) => locale === "el" ? el : en;

  return (
    <article aria-labelledby="sample-title-heading" className="overflow-hidden rounded-[20px] border border-primary/20 bg-surface text-foreground shadow-[0_22px_55px_-35px_color-mix(in_oklab,var(--primary)_65%,transparent)] lg:rounded-3xl">
      <header className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5 lg:px-7 lg:py-4">
        <h2 id="sample-title-heading" className="flex min-w-0 items-center gap-2 text-sm font-semibold lg:text-base">
          <AsterMark className="size-7 shrink-0 text-primary lg:size-9" />
          {tx("Aster AI’s title suggestion", "Ο τίτλος που προτείνει ο Aster AI")}
        </h2>
        <span className="shrink-0 rounded-full border border-hairline px-2 py-1 text-[11px] font-medium text-muted-foreground lg:px-2.5">
          {tx("Sample data", "Δείγμα")}
        </span>
      </header>

      <div className="px-4 py-3 lg:px-7 lg:py-6">
        <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground lg:text-sm">
          <Search className="size-3.5 shrink-0 text-primary" aria-hidden />
          <span>{tx("Google search", "Αναζήτηση Google")}</span>
          <span className="font-medium text-foreground">“{sample.search}”</span>
        </div>
        <dl className="mt-3 overflow-hidden rounded-xl border border-hairline lg:mt-5">
          <div className="px-3 py-2 lg:px-5 lg:py-4">
            <dt className="text-[11px] font-medium text-muted-foreground lg:text-xs">{tx("Current page title", "Σημερινός τίτλος")}</dt>
            <dd className="mt-1 break-words text-sm leading-snug text-muted-foreground lg:text-[17px]">{sample.before}</dd>
          </div>
          <div className="border-t border-hairline bg-primary/[0.06] px-3 py-2 lg:px-5 lg:py-4">
            <dt className="text-[11px] font-semibold text-link lg:text-xs">{tx("Suggested title", "Προτεινόμενος τίτλος")}</dt>
            <dd className="mt-1 break-words font-display text-[16px] font-semibold leading-snug tracking-tight lg:text-2xl">{sample.after}</dd>
          </div>
        </dl>
      </div>

      <details className="group border-t border-hairline">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2 text-sm font-semibold text-link transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary lg:px-7 lg:py-4 [&::-webkit-details-marker]:hidden">
          {tx("Why this title?", "Γιατί αυτός ο τίτλος;")}
          <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
        </summary>
        <div className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground lg:px-7 lg:pb-6">
          <p>{sample.reason}</p>
          <a href={appLink("/demo", locale, "platform-window-link")} className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-medium text-link underline underline-offset-4">
            {tx("Explore the sample account", "Δείτε τον δοκιμαστικό λογαριασμό")}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
      </details>
    </article>
  );
}
