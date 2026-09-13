import { ArrowRight } from "lucide-react";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Bloom, PrimaryButtonLink, ghostBtnClass } from "./primitives";

/** Full-bleed closing statement: the brand line, then the two ways in. */
export function ClosingCta({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="relative overflow-hidden border-t border-hairline">
      <Bloom className="left-1/2 top-1/4 h-[30rem] w-[72rem] -translate-x-1/2" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-foreground">
          {isEl ? (
            <>
              Φτιαγμένο για κατάταξη.
              <br />
              <span className="gradient-text">Σχεδιασμένο για μετατροπές.</span>
            </>
          ) : (
            <>
              Built to rank.
              <br />
              <span className="gradient-text">Designed to convert.</span>
            </>
          )}
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {isEl
            ? "Πείτε μας τι θέλετε να πετύχετε. Θα σας στείλουμε δωρεάν αξιολόγηση και συγκεκριμένο πλάνο μέσα σε 24 ώρες."
            : "Tell us what you want to achieve. We send back a free assessment and a concrete plan within 24 hours."}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButtonLink href={lp("/get-started")}>
            {isEl ? "Δωρεάν αξιολόγηση" : "Get your free audit"}
            <ArrowRight className="size-4" aria-hidden />
          </PrimaryButtonLink>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={ghostBtnClass}>
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            {isEl ? "Μίλα μας στο WhatsApp" : "Talk on WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
