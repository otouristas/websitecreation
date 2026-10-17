"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accent } from "@/components/kit/primitives";
import { KIT_COPY, kitPrimaryBtn, kitSecondaryBtn } from "@/components/kit/sections";
import { trackCtaClick } from "@/lib/analytics";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * Quiet split closer that sits directly above the footer. Left is one
 * headline and one supporting line. Right is the existing free-audit button
 * and a secondary link to agency pricing.
 */
export function FooterCta({ locale }: { readonly locale: SiteLocale }): ReactElement {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section
      data-footer-cta=""
      aria-labelledby="footer-cta-title"
      className="relative border-t border-hairline bg-surface/40 before:absolute before:inset-x-0 before:top-[-1px] before:h-px before:bg-[linear-gradient(90deg,transparent,var(--primary-glow)_30%,var(--brand)_70%,transparent)] before:opacity-70 before:content-['']"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="min-w-0 max-w-xl lg:flex-1">
          <h2
            id="footer-cta-title"
            className="text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[32px]"
          >
            {isEl ? (
              <>
                Δείτε τι <Accent>λείπει</Accent> από την ιστοσελίδα.
              </>
            ) : (
              <>
                See what <Accent>is missing</Accent> from the site.
              </>
            )}
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            {isEl
              ? "Σύντομος έλεγχος και, αν θέλετε να προχωρήσουμε, σταθερή τιμή."
              : "A short audit, and a fixed price if you want the work done."}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:shrink-0">
          <Link
            href={`${lp("/get-started")}#free-audit`}
            className={`${kitPrimaryBtn} w-full shrink-0 sm:w-auto`}
            onClick={() => trackCtaClick("footer_cta_audit")}
          >
            {KIT_COPY.freeAudit[locale]}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
          <Link
            href={lp("/pricing")}
            className={`${kitSecondaryBtn} w-full shrink-0 sm:w-auto`}
            onClick={() => trackCtaClick("footer_cta_pricing")}
          >
            {isEl ? "Δείτε τις τιμές" : "See pricing"}
          </Link>
        </div>
      </div>
    </section>
  );
}
