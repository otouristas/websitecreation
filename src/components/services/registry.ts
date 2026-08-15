import type { ReactElement } from 'react';
import type { SiteLocale } from '@/lib/i18n/locale';
import { WebsiteCreationPage } from './website-creation';
import { LocalSeoPage } from './local-seo';

/**
 * Bespoke service page registry.
 *
 * Mirrors the industry registry: each /services/[service] hub owns its layout
 * in its own file, and anything not yet rebuilt keeps rendering the shared hub
 * template. The route retains metadata, generateStaticParams and ISR.
 */
export type BespokeServicePage = (props: { locale: SiteLocale }) => ReactElement;

export const bespokeServicePages: Partial<Record<string, BespokeServicePage>> = {
  'website-creation': WebsiteCreationPage,
  'local-seo': LocalSeoPage,
};

export function getBespokeServicePage(slug: string): BespokeServicePage | undefined {
  return bespokeServicePages[slug];
}
