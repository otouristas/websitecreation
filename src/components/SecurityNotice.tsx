import { ShieldCheck } from 'lucide-react';
import { getCommonDictionary } from '@/lib/i18n/get-dictionary';
import type { SiteLocale } from '@/lib/i18n/locale';

export function SecurityNotice({ locale }: { locale: SiteLocale }) {
  const copy = getCommonDictionary(locale).securityNotice;
  return (
    <details className="mx-auto mt-3 max-w-md text-left text-xs text-muted-foreground md:mx-0">
      <summary className="w-fit cursor-pointer rounded py-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
        <ShieldCheck aria-hidden="true" className="mr-1 inline size-4 align-text-bottom" />
        {copy.title}
      </summary>
      <p className="pb-2 leading-relaxed">{copy.body}</p>
    </details>
  );
}
