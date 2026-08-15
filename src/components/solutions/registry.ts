import type { ReactElement } from 'react';
import type { SiteLocale } from '@/lib/i18n/locale';
import { RentACarPage } from './rent-a-car';
import { HotelsPage } from './hotels';

/**
 * Bespoke industry page registry.
 *
 * Each /solutions/[industry] page owns its own layout in its own file. The
 * route resolves the slug here; anything not yet rebuilt falls through to the
 * shared IndustryPageView until its bespoke design lands, so the rollout can
 * ship in waves without any page 404ing or regressing.
 *
 * The route keeps metadata, generateStaticParams and ISR. Only the body is
 * bespoke.
 */
export type BespokeIndustryPage = (props: { locale: SiteLocale }) => ReactElement;

export const bespokeIndustryPages: Partial<Record<string, BespokeIndustryPage>> = {
  'rent-a-car': RentACarPage,
  hotels: HotelsPage,
};

export function getBespokeIndustryPage(slug: string): BespokeIndustryPage | undefined {
  return bespokeIndustryPages[slug];
}
