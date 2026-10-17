import { ArrowRight, Sparkles } from "lucide-react";
import { appLink } from "@/components/gsc-boost/copy";
import type { SiteLocale } from "@/lib/i18n/locale";

/** The right-rail sign-up nudge on docs pages. */
export function SignupCard({ locale, source }: { readonly locale: SiteLocale; readonly source: string }) {
  const el = locale === "el";
  return (
    <div className="rounded-2xl border border-primary/30 bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_60%)] p-4">
      <Sparkles className="size-4.5 text-primary-glow" aria-hidden />
      <p className="mt-3 font-display text-[15px] font-semibold text-foreground">{el ? "Δοκιμάστε το GSC Boost δωρεάν" : "Try GSC Boost free"}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        {el ? "Συνδέστε το Search Console και δείτε τις διορθώσεις της εβδομάδας σε λίγα λεπτά." : "Connect Search Console and see this week's fixes in minutes."}
      </p>
      <a href={appLink("/signup", locale, source)} className="asg-primary-action mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl font-display text-[13.5px] font-semibold text-primary-foreground">
        {el ? "Δωρεάν εγγραφή" : "Sign up free"}
        <ArrowRight className="size-3.5" aria-hidden />
      </a>
      <a href={appLink("/demo", locale, `${source}-demo`)} className="mt-2 block text-center text-[12.5px] font-medium text-muted-foreground hover:text-foreground">
        {el ? "ή δείτε τη ζωντανή επίδειξη" : "or open the live demo"}
      </a>
    </div>
  );
}
