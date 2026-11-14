'use client';

import { forwardRef } from 'react';
import Link from 'vinext/shims/link';
import { AGENCY_ORIGIN, PRODUCT_ORIGIN, agencyDomainPath, comPathForAgencyDomain, greekAgencyPath, isAgencyPathname } from '../../src/lib/site-split';

export function agencyNavigationHref(href) {
  if (typeof href !== 'string' || href.startsWith('//')) return href;
  let relative = href;
  if (href === AGENCY_ORIGIN || href.startsWith(AGENCY_ORIGIN + '/')) relative = href.slice(AGENCY_ORIGIN.length) || '/';
  if (href === PRODUCT_ORIGIN || href.startsWith(PRODUCT_ORIGIN + '/')) {
    relative = href.slice(PRODUCT_ORIGIN.length) || '/';
    if (!isAgencyPathname(relative)) return href;
  }
  if (!relative.startsWith('/')) return relative;
  const index = relative.search(/[?#]/);
  const pathname = index < 0 ? relative : relative.slice(0, index);
  const suffix = index < 0 ? '' : relative.slice(index);
  const localized = /^\/(?:en|el)(?:\/|$)/.test(pathname);
  if (localized && isAgencyPathname(pathname)) {
    const el = pathname.startsWith('/en/') ? greekAgencyPath(pathname.slice(3)) : pathname;
    return agencyDomainPath(el) + suffix;
  }
  if (localized) return PRODUCT_ORIGIN + relative;
  const canonical = comPathForAgencyDomain(pathname);
  return canonical ? agencyDomainPath(canonical) + suffix : relative;
}

export default forwardRef(function AgencyLink({ href, as, prefetch, ...props }, ref) {
  const target = agencyNavigationHref(href);
  const external = typeof target === 'string' && /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target);
  return <Link {...props} ref={ref} href={target} as={agencyNavigationHref(as)} prefetch={external ? false : prefetch} />;
});
