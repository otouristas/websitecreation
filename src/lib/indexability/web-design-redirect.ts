/**
 * Permanent moves off the retired service slug.
 *
 * The live hub is `/services/web-design`. City URLs for the old slug were
 * never in the kept city set, so they do not 301 onto a page that would
 * itself 410. Rethymno goes to the live SEO-audits city page. Other removed
 * cities follow the same place-page rule as every other retired service, or
 * land on the web-design hub when nothing more specific is live.
 *
 * Edge-safe: string lists only, same constraint as `service-location.ts`.
 */
import { decideServiceLocationRoute } from '@/lib/indexability/service-location';

const RETIRED = 'seo-web-design';

function stripTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function cityDestination(locale: 'en' | 'el', location: string): string {
  if (location === 'rethymno-gr') return `/${locale}/services/seo-audits/rethymno-gr`;
  const renamed = `/${locale}/services/web-design/${location}`;
  const decision = decideServiceLocationRoute(renamed);
  if (decision?.kind === 'keep' || decision?.kind === 'redirect') {
    return decision.kind === 'keep' ? renamed : decision.to;
  }
  return `/${locale}/services/web-design`;
}

/** Final path for a retired web-design URL, or null when the path is unrelated. */
export function legacyWebDesignRedirect(pathname: string): string | null {
  const path = stripTrailingSlash(pathname);

  if (path === `/services/${RETIRED}`) return '/en/services/web-design';

  const bareSolutions = new RegExp(`^/solutions/([^/]+)/${RETIRED}$`).exec(path);
  if (bareSolutions) return `/en/solutions/${bareSolutions[1]}/web-design`;

  const bareCity = new RegExp(`^/services/${RETIRED}/([^/]+)$`).exec(path);
  if (bareCity) return cityDestination('en', bareCity[1]);

  const hub = new RegExp(`^/(en|el)/services/${RETIRED}$`).exec(path);
  if (hub) return `/${hub[1]}/services/web-design`;

  const solutions = new RegExp(`^/(en|el)/solutions/([^/]+)/${RETIRED}$`).exec(path);
  if (solutions) return `/${solutions[1]}/solutions/${solutions[2]}/web-design`;

  const city = new RegExp(`^/(en|el)/services/${RETIRED}/([^/]+)$`).exec(path);
  if (city) return cityDestination(city[1] as 'en' | 'el', city[2]);

  return null;
}
