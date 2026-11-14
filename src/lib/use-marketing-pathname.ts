'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { AGENCY_DOMAIN, AGENCY_WORKER, comPathForAgencyDomain } from '@/lib/site-split';

const subscribe = () => () => {};
const serverHost = () => AGENCY_WORKER;
const browserHost = () => AGENCY_WORKER || [AGENCY_DOMAIN, `www.${AGENCY_DOMAIN}`].includes(window.location.hostname.toLowerCase());

/** The agency header and forms use the same route identity before and after the domain move. */
export function useMarketingPathname() {
  const pathname = usePathname() ?? '/';
  const agencyHost = useSyncExternalStore(subscribe, browserHost, serverHost);
  return agencyHost ? comPathForAgencyDomain(pathname) ?? pathname : pathname;
}
