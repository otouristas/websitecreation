import type { SiteLocale } from '@/lib/i18n/locale';
import { navEn } from '@/data/translations/en/nav';
import { navEl } from '@/data/translations/el/nav';
import { footerEn } from '@/data/translations/en/footer';
import { footerEl } from '@/data/translations/el/footer';
import { commonEn } from '@/data/translations/en/common';
import { commonEl } from '@/data/translations/el/common';
import { legalEn } from '@/data/translations/en/legal';
import { legalEl } from '@/data/translations/el/legal';
import { glossaryUiEn, glossaryUiEl } from '@/data/translations/glossary-ui';
import { blogUiEn, blogUiEl } from '@/data/translations/blog-ui';

export function getNavDictionary(locale: SiteLocale) {
  return locale === 'el' ? navEl : navEn;
}

export function getFooterDictionary(locale: SiteLocale) {
  return locale === 'el' ? footerEl : footerEn;
}

export function getCommonDictionary(locale: SiteLocale) {
  return locale === 'el' ? commonEl : commonEn;
}

export function getLegalDictionary(locale: SiteLocale) {
  return locale === 'el' ? legalEl : legalEn;
}

export function getGlossaryUi(locale: SiteLocale) {
  return locale === 'el' ? glossaryUiEl : glossaryUiEn;
}

export function getBlogUi(locale: SiteLocale) {
  return locale === 'el' ? blogUiEl : blogUiEn;
}

export function getDictionary(locale: SiteLocale) {
  return {
    nav: getNavDictionary(locale),
    footer: getFooterDictionary(locale),
    common: getCommonDictionary(locale),
    legal: getLegalDictionary(locale),
    glossary: getGlossaryUi(locale),
    blog: getBlogUi(locale),
  };
}
