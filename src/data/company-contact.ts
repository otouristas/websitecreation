import type { PostalAddressData } from '@/lib/types/seo';

/** Company contact address from the EN/EL privacy policy, separate from the founder's base. */
export const COMPANY_CONTACT_ADDRESS = {
  addressLocality: 'Kamares',
  addressRegion: 'Sifnos',
  postalCode: '84003',
  addressCountry: 'GR',
} as const satisfies PostalAddressData;
