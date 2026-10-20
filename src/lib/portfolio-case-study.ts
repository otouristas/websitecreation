import type { PortfolioProject } from '@/data/portfolio';
import { PORTFOLIO_CASE_STUDIES } from '@/data/portfolio-case-studies';
import type { SiteLocale } from '@/lib/i18n/locale';

export function buildProjectCaseStudy(project: PortfolioProject, locale: SiteLocale = 'en') {
  const copy = PORTFOLIO_CASE_STUDIES[project.slug];
  const isEl = locale === 'el';
  const section = (title: string, items: string[]) => ({title, items});
  return {
    overview: copy?.overview[locale] ?? (isEl ? project.summaryEl || project.summary : project.summary),
    challenge: copy?.challenge[locale] ?? '', approach: copy?.approach[locale] ?? '',
    seo: section(isEl ? 'Θέματα αναζήτησης' : 'Search topics', copy?.seo[locale] ?? []),
    geoAeo: section(isEl ? 'Με μια ματιά' : 'At a glance', copy?.geoAeo[locale] ?? []),
    technical: section('', []), content: section('', []), outcomes: copy?.outcomes[locale] ?? [],
  };
}
