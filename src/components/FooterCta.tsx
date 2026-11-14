"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accent } from "@/components/kit/primitives";
import { KIT_COPY, kitPrimaryBtn, kitSecondaryBtn } from "@/components/kit/sections";
import { trackCtaClick } from "@/lib/analytics";
import { useMarketingPathname } from '@/lib/use-marketing-pathname';
import { appLink } from "@/components/gsc-boost/copy";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { AGENCY_PRICING_HREF, isAgencyPathname } from "@/lib/site-split";

/**
 * Quiet split closer that sits directly above the footer. Left is one
 * headline and one supporting line. On agency pages the right side is the
 * free-audit button and agency prices; on the product site it is sign-up and
 * the app plans.
 */
export function FooterCta({ locale }: { readonly locale: SiteLocale }): ReactElement {
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(locale, path);
  const pathname = useMarketingPathname();
  if (!isAgencyPathname(pathname)) return <ProductFooterCta locale={locale} />;

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
                Τι θα βελτιώναμε <Accent>στη δική σας ιστοσελίδα;</Accent>
              </>
            ) : (
              <>
                What would we change <Accent>on your website?</Accent>
              </>
            )}
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            {isEl
              ? "Στείλτε μας τη διεύθυνση της ιστοσελίδας σας. Θα δείτε τι εντοπίσαμε και μπορείτε να μας ρωτήσετε ποια αλλαγή αξίζει να κάνετε πρώτη."
              : "Send us your website address. We’ll share what the audit found, and you can ask us which change we’d make first."}
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
            href={AGENCY_PRICING_HREF}
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

function ProductFooterCta({ locale }: { readonly locale: SiteLocale }): ReactElement {
  const isEl = locale === "el";
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
                Με ποια σελίδα <Accent>να ξεκινήσετε;</Accent>
              </>
            ) : (
              <>
                Which page should you <Accent>work on first?</Accent>
              </>
            )}
          </h2>
          <p className="mt-2 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
            {isEl
              ? "Συνδέστε δωρεάν μία ιστοσελίδα. Δείτε ποιες αναζητήσεις τη φέρνουν ήδη στην Google και ποια σελίδα έχει περιθώριο για περισσότερα κλικ."
              : "Connect one site for free. See the searches that already bring people to it and where a change could earn more clicks."}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:shrink-0">
          <a
            href={appLink("/signup", locale, "footer-cta")}
            className={`${kitPrimaryBtn} w-full shrink-0 sm:w-auto`}
            onClick={() => trackCtaClick("footer_cta_signup")}
          >
            {isEl ? "Δωρεάν εγγραφή" : "Sign up free"}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
          <Link
            href={localizedPath(locale, "/pricing")}
            className={`${kitSecondaryBtn} w-full shrink-0 sm:w-auto`}
            onClick={() => trackCtaClick("footer_cta_plans")}
          >
            {isEl ? "Δείτε τα πακέτα" : "See plans"}
          </Link>
        </div>
      </div>
    </section>
  );
}
