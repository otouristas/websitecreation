import { ISLAND_PLACES } from './places-islands';
import { MAINLAND_PLACES } from './places-mainland';
import type { PlacePageData, PlaceRegionId } from './types';

export const PLACE_PAGES: readonly PlacePageData[] = [...MAINLAND_PLACES, ...ISLAND_PLACES];

const BY_SLUG = new Map(PLACE_PAGES.map((place) => [place.slug, place]));

export function getPlace(slug: string): PlacePageData | undefined {
  return BY_SLUG.get(slug);
}

export function placesInRegion(region: PlaceRegionId): readonly PlacePageData[] {
  return PLACE_PAGES.filter((place) => place.region === region);
}

export {
  H1_ACCENT,
  PLACE_REGION_LABEL,
  PLACE_REGION_ORDER,
  placeH1,
  placeTitle,
} from './types';
export type { AreaServedType, PlaceFaq, PlaceLink, PlacePageData, PlaceRegionId, PlaceSection } from './types';
export { HUB_FAQS, PLACE_PROCESS } from './shared';
export { buildHubSchemas, buildPlaceSchemas, placePath, placeUrl } from './schema';
export { countWords, jaccardSimilarity, visiblePlaceText } from './text';
