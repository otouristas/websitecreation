import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * The markets the AI-visibility check can run in.
 *
 * `locationCode` is the Google Ads geo target ("criteria") ID DataForSEO takes
 * as `location_code`. For countries it is 2000 + the ISO 3166-1 numeric code,
 * so Greece (300) is 2300 and the United Kingdom (826) is 2826. The full list
 * comes from `serp/google/locations`; we keep a short table instead, because a
 * visitor picking a market should see six choices, not forty thousand.
 *
 * `countryIso` is what the ChatGPT endpoint wants for `web_search_country_iso_code`,
 * so the chat answer is localised the same way the SERP is.
 */
export type MarketId = 'gr-el' | 'gr-en' | 'cy-el' | 'uk-en' | 'us-en' | 'de-de';

export interface Market {
  readonly id: MarketId;
  readonly locationCode: number;
  readonly languageCode: string;
  readonly countryIso: string;
  readonly label: { readonly en: string; readonly el: string };
}

export const MARKETS: readonly Market[] = [
  {
    id: 'gr-el',
    locationCode: 2300,
    languageCode: 'el',
    countryIso: 'GR',
    label: { en: 'Greece · Greek', el: 'Ελλάδα · ελληνικά' },
  },
  {
    id: 'gr-en',
    locationCode: 2300,
    languageCode: 'en',
    countryIso: 'GR',
    label: { en: 'Greece · English', el: 'Ελλάδα · αγγλικά' },
  },
  {
    id: 'cy-el',
    locationCode: 2196,
    languageCode: 'el',
    countryIso: 'CY',
    label: { en: 'Cyprus · Greek', el: 'Κύπρος · ελληνικά' },
  },
  {
    id: 'uk-en',
    locationCode: 2826,
    languageCode: 'en',
    countryIso: 'GB',
    label: { en: 'United Kingdom · English', el: 'Ηνωμένο Βασίλειο · αγγλικά' },
  },
  {
    id: 'us-en',
    locationCode: 2840,
    languageCode: 'en',
    countryIso: 'US',
    label: { en: 'United States · English', el: 'ΗΠΑ · αγγλικά' },
  },
  {
    id: 'de-de',
    locationCode: 2276,
    languageCode: 'de',
    countryIso: 'DE',
    label: { en: 'Germany · German', el: 'Γερμανία · γερμανικά' },
  },
];

export const DEFAULT_MARKET: MarketId = 'gr-el';

export function getMarket(id: string): Market | undefined {
  return MARKETS.find((m) => m.id === id);
}

/** Greek visitors check Greek SERPs; the English site is aimed at people searching Greece in English. */
export function defaultMarketFor(locale: SiteLocale): MarketId {
  return locale === 'el' ? 'gr-el' : 'gr-en';
}
