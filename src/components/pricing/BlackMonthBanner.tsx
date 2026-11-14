import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  currentDisplayPrice,
  currentPriceIncludesVat,
  formatPrice,
  seoPackages,
  websitePackages,
  withVat,
} from "@/data/pricing";

export function BlackMonthBanner() {
  if (!currentPriceIncludesVat(websitePackages[0])) return null;
  return (
    <aside
      className="mx-auto mb-12 max-w-[1240px] px-5"
      aria-label="Black Month προσφορές"
    >
      <div className="relative isolate overflow-hidden rounded-2xl border border-hairline bg-surface p-7 text-foreground sm:p-10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--asg-info-surface),transparent_65%)]"
        />
        <p className="text-[11px] font-semibold tracking-[0.14em] text-link">
          BLACK MONTH / ΥΠΗΡΕΣΙΕΣ ΙΣΤΟΣΕΛΙΔΩΝ & SEO / ΝΟΕΜΒΡΙΟΣ 2026
        </p>
        <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] sm:text-[36px]">
          Νέα ιστοσελίδα ή μηνιαίο SEO με τον ΦΠΑ στην τιμή.
        </h2>
        <div className="mt-4 grid max-w-3xl gap-4 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
          <p>
            <strong className="text-foreground">Website Starter</strong><br />
            Πριν <del>€{formatPrice(websitePackages[0].regular, "el")}</del> + ΦΠΑ 24%
            {' '}(€{formatPrice(withVat(websitePackages[0].regular), "el")} με ΦΠΑ).<br />
            <strong className="text-foreground">Τώρα €{formatPrice(currentDisplayPrice(websitePackages[0]), "el")} τελική, με ΦΠΑ 24%.</strong>
          </p>
          <p>
            <strong className="text-foreground">SEO Foundations</strong><br />
            Πριν <del>€{formatPrice(seoPackages[0].regular, "el")}/μήνα</del> + ΦΠΑ 24%
            {' '}(€{formatPrice(withVat(seoPackages[0].regular), "el")}/μήνα με ΦΠΑ).<br />
            <strong className="text-foreground">Τώρα €{formatPrice(currentDisplayPrice(seoPackages[0]), "el")} τελική/μήνα, με ΦΠΑ 24% σε όλη την εξάμηνη συνεργασία.</strong>
          </p>
        </div>
        <Link
          href="/el/ypiresies/times"
          className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Δείτε τι περιλαμβάνει κάθε υπηρεσία
          <ArrowUpRight size={18} aria-hidden />
        </Link>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Για νέα έργα που θα επιβεβαιωθούν έως 30/11/2026.
        </p>
      </div>
    </aside>
  );
}
