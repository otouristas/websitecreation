import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { CASE_RESULTS, metricValue } from '@/data/case-results';
import { VALUE_HONESTY } from '@/data/value-explainer';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/** Real before and after numbers from Search Console, right under "how it works": proof, not promises. */
export function ProofStrip({ locale }: { readonly locale: SiteLocale }) {
  const el = locale === 'el';
  const cases = CASE_RESULTS.filter((c) => c.slug === 'onoma-hotel' || c.slug === 'helicro' || c.slug === 'antiparos-rentacar');
  if (cases.length === 0) return null;
  return (
    <section data-shot="proof" aria-labelledby="proof-title" className="mx-auto max-w-[1240px] px-5 py-10 sm:py-14 lg:px-8 lg:py-16">
      <div className="rounded-[22px] border border-hairline bg-surface/60 p-6 sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-primary">{el ? 'Στοιχεία από έργα μας' : 'Client projects'}</p>
        <h2 id="proof-title" className="mt-2 text-balance font-display text-[1.5rem] font-bold tracking-tight text-foreground sm:text-[1.9rem]">
          {el ? 'Πώς άλλαξαν τα κλικ σε τρεις ιστοσελίδες πελατών' : 'How search clicks changed across three client sites'}
        </h2>
        <ul className="mt-7 grid gap-6 sm:grid-cols-3">
          {cases.map((c) => (
            <li key={c.slug} className="min-w-0 border-t border-hairline pt-4">
              <Link href={localizedPath(locale, `/work/${c.slug}`)} className="group block">
                <span className="font-display text-[2rem] font-bold leading-none tracking-tight tabular-nums text-foreground sm:text-[2.4rem]">
                  {metricValue(c.headline, el)}
                </span>
                <span className="mt-2 block text-[14px] leading-snug text-muted-foreground">{el ? c.headline.labelEl : c.headline.labelEn}</span>
                <span className="mt-1 block text-[12px] text-muted-foreground">{el ? c.periodEl : c.periodEn}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-primary group-hover:text-foreground">
                  {c.name}
                  <ArrowRight className="size-3.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-1.5 text-[12px] leading-snug text-muted-foreground">
          <Info className="mt-px size-3.5 shrink-0" aria-hidden />
          {el ? VALUE_HONESTY.el : VALUE_HONESTY.en}
        </p>
      </div>
    </section>
  );
}
