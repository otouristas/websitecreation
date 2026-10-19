import { STAY_VERTICALS } from './verticals-stay';
import { TRIP_VERTICALS } from './verticals-trips';
import type { TourismVertical } from './types';

/** Hub order: highest Greek demand first. */
export const TOURISM_VERTICALS: readonly TourismVertical[] = [...STAY_VERTICALS, ...TRIP_VERTICALS];

const BY_SLUG = new Map(TOURISM_VERTICALS.map((vertical) => [vertical.slug, vertical]));

export function getTourismVertical(slug: string): TourismVertical | undefined {
  return BY_SLUG.get(slug);
}

export type { TourismCard, TourismFaq, TourismLink, TourismRegion, TourismSection, TourismVertical } from './types';
export { HUB_TOURISM_FAQS, TOURISM_PROCESS, TOURISM_RULES } from './shared';
export {
  TOURISM_HUB_NAME,
  TOURISM_HUB_PATH,
  buildTourismHubSchemas,
  buildVerticalSchemas,
  tourismPath,
  tourismUrl,
} from './schema';
export { visibleTourismText } from './text';
