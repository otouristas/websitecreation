import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Persistent marketing signpost, separate from the software subscription prices. */
export function BlackMonthRibbon() {
  return <aside data-black-month-ribbon className="fixed inset-x-0 top-0 z-50 h-12 bg-[var(--asg-brand-ink)] text-[var(--asg-brand-paper)]" aria-label="Black Month">
    <Link href="/el/ypiresies/times" className="mx-auto flex h-full max-w-7xl items-center justify-center gap-2 px-3 text-[12px] font-semibold sm:gap-4 sm:text-sm">
      <span className="rounded border border-[var(--asg-brand-cyan)]/40 px-2 py-1 font-mono text-[10px] tracking-wider text-[var(--asg-brand-cyan)] sm:text-xs">BLACK MONTH</span>
      <span>Δώρο και ο ΦΠΑ<span className="hidden sm:inline"> · Ιστοσελίδα €599 · SEO €149/μήνα</span></span>
      <span className="hidden lg:inline text-xs text-white/65">Υπηρεσίες · Έως 30/11 · SEO: 6μηνη συνεργασία</span>
      <ArrowUpRight className="size-4 shrink-0 text-[var(--asg-brand-cyan)]" aria-hidden />
    </Link>
  </aside>;
}
