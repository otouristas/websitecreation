import Link from "next/link";
import type { SiteLocale } from "@/lib/i18n/locale";

/** Original Aster identity. An AI product mark, not a third-party model logo. */
export function AsterMark({ className = "size-9" }: { className?: string }) {
  return <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <rect x="1" y="1" width="38" height="38" rx="13" fill="currentColor" fillOpacity=".1" />
    <path d="m20 7 3.5 9.5L33 20l-9.5 3.5L20 33l-3.5-9.5L7 20l9.5-3.5L20 7Z" fill="currentColor" />
    <circle cx="30" cy="9" r="2" fill="currentColor" />
  </svg>;
}

export function AsterIdentity({ locale }: { locale: SiteLocale }) {
  return <Link href={`/${locale}/platform#aster`} className="inline-flex max-w-full items-center gap-3 rounded-full border border-primary/25 bg-primary/5 py-2 pl-2 pr-5 text-left transition hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
    <span className="text-primary"><AsterMark /></span>
    <span className="min-w-0"><span className="block text-sm font-semibold text-foreground">{locale === "el" ? "Γνωρίστε τον Aster" : "Meet Aster"}<span className="ml-2 rounded-md border border-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">AI</span></span>
      <span className="block text-xs text-muted-foreground">{locale === "el" ? "Ο SEO Guru που ξεκινά από την ερώτησή σας." : "Your SEO Guru. Start with a question."}</span>
    </span>
  </Link>;
}
