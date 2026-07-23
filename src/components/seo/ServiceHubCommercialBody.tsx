import Link from 'next/link';
import type { ServiceHubCommercial } from '@/data/service-hub-commercial';
import type { SiteLocale } from '@/lib/i18n/locale';
import { localizedPath } from '@/lib/i18n/locale';

type Props = {
  commercial: ServiceHubCommercial;
  locale: SiteLocale;
};

export default function ServiceHubCommercialBody({ commercial, locale }: Props) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="text-lg text-muted-foreground mb-10">{commercial.definition}</p>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{commercial.processTitle}</h2>
        <ol className="mb-10 space-y-3 list-decimal list-inside text-muted-foreground">
          {commercial.process.map((step) => (
            <li key={step} className="pl-1">
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mb-10 rounded-xl border border-border bg-muted/30 p-6">
          <h2 className="text-xl font-bold mb-3">
            {isEl ? 'Τιμές & πακέτα' : 'Pricing teaser'}
          </h2>
          <p className="text-muted-foreground mb-4">{commercial.pricingTeaser}</p>
          <Link href={lp('/pricing')} className="text-primary font-medium hover:underline">
            {isEl ? 'Δείτε τιμές & πακέτα →' : 'See pricing & packages →'}
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-3">{commercial.audienceTitle}</h2>
        <p className="text-muted-foreground">{commercial.audience}</p>
      </div>
    </section>
  );
}
