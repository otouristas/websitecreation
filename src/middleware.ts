import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  isLocalizedPath,
  isValidLocale,
  localizedPath,
  type SiteLocale,
} from '@/lib/i18n/locale';
import { decideServiceLocationRoute } from '@/lib/indexability/service-location';
import { legacyWebDesignRedirect } from '@/lib/indexability/web-design-redirect';
import { getAllServiceSlugs } from '@/data/services';
import { THEME_INIT_SCRIPT } from '@/brand/theme';
import {
  AGENCY_DOMAIN,
  AGENCY_WORKER,
  PRODUCT_ORIGIN,
  agencyDomainPath,
  comPathForAgencyDomain,
  englishAgencyRedirect,
  greekAgencyMoveRedirect,
  greekAgencyPath,
  isAgencyPathname,
} from '@/lib/site-split';

const LOCALE_COOKIE = 'locale';

function detectLocale(request: NextRequest): SiteLocale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isValidLocale(cookie)) return cookie;

  const accept = request.headers.get('accept-language') ?? '';
  const prefersGreek = accept
    .split(',')
    .some((part) => {
      const lang = part.trim().split(';')[0]?.toLowerCase();
      return lang === 'el' || lang?.startsWith('el-');
    });
  return prefersGreek ? 'el' : DEFAULT_LOCALE;
}

const KNOWN_SERVICES = new Set(getAllServiceSlugs());

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

/**
 * 410 Gone for service × city pages removed in the 2026-10 cut (see
 * `src/lib/indexability/service-location.ts`). A 410 tells Google the URL is
 * gone on purpose, so it drops out of the index faster than a 404 would. The
 * body is a small page that sends people to the service hub.
 */
function goneResponse(locale: SiteLocale, service: string): NextResponse {
  const isEl = locale === 'el';
  const hub = KNOWN_SERVICES.has(service) ? `/${locale}/services/${service}` : `/${locale}/services`;
  const title = isEl ? 'Η σελίδα αφαιρέθηκε' : 'This page has been removed';
  const body = isEl
    ? 'Αυτή η σελίδα πόλης δεν υπάρχει πια. Θα βρείτε την υπηρεσία στη βασική της σελίδα.'
    : 'This city page no longer exists. You will find the service on its main page.';
  const cta = isEl ? 'Δείτε την υπηρεσία' : 'See the service';
  const html = `<!doctype html><html lang="${locale}" data-asg-theme="light" class="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/brand/brand.tokens.css"><link rel="stylesheet" href="/brand/error-fonts.css"><script>${THEME_INIT_SCRIPT}</script><style>body{font-family:Inter,system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;line-height:1.6;color:var(--asg-text);background:var(--asg-background)}a{color:var(--asg-link)}a:focus-visible{outline:2px solid var(--asg-focus);outline-offset:3px}.brand{display:block;width:220px;max-width:100%;height:auto;margin-bottom:2rem}.on-light{display:none}[data-asg-theme="light"] .on-dark{display:none}[data-asg-theme="light"] .on-light{display:block}</style></head><body><a href="/${locale}" aria-label="AnotherSEOGuru"><img src="/brand/asg-lockup-on-dark.svg" class="brand on-dark" alt="AnotherSEOGuru"><img src="/brand/asg-lockup-on-light.svg" class="brand on-light" alt="AnotherSEOGuru"></a><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(hub)}">${escapeHtml(cta)}</a></p></body></html>`;
  return new NextResponse(html, {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'public, max-age=3600',
    },
  });
}

/**
 * anotherseoguru.gr serves the Greek agency pages of this project: `/` is
 * /el/ypiresies, `/times` is /el/ypiresies/times and `/<section>/...` is
 * /el/<section>/.... Anything else on .gr belongs to the product site.
 */
function agencyDomainResponse(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  // The .gr domain's own SEO files (src/lib/agency-domain-seo.ts).
  const seoFile: Record<string, string> = {
    '/robots.txt': '/agency-domain/robots.txt',
    '/sitemap.xml': '/agency-domain/sitemap.xml',
    '/sitemap-index.xml': '/agency-domain/sitemap.xml',
    '/llms.txt': '/agency-domain-llms.txt',
    '/llms-full.txt': '/agency-domain-llms.txt',
  };
  if (seoFile[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = seoFile[pathname];
    return NextResponse.rewrite(url);
  }
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/opengraph-image')
  ) {
    return NextResponse.next();
  }
  // /ypiresies is the .gr home itself, and /ypiresies/times is /times.
  if (pathname === '/ypiresies' || pathname.startsWith('/ypiresies/')) {
    return NextResponse.redirect(new URL(`${agencyDomainPath(`/el${pathname}`)}${search}`, request.url), 301);
  }
  // Old English and translated route aliases point straight to the final Greek URL.
  if (pathname.startsWith('/en/') && isAgencyPathname(pathname)) {
    const greekPath = greekAgencyPath(pathname.slice(3));
    return NextResponse.redirect(new URL(`${agencyDomainPath(greekPath)}${search}`, request.url), 301);
  }
  const target = comPathForAgencyDomain(pathname);
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.rewrite(url);
  }
  // A .com-style Greek agency URL on .gr: drop the /el.
  if (pathname.startsWith('/el/') && comPathForAgencyDomain(agencyDomainPath(pathname))) {
    return NextResponse.redirect(new URL(`${agencyDomainPath(pathname)}${search}`, request.url), 301);
  }
  return NextResponse.redirect(`${PRODUCT_ORIGIN}${pathname}${search}`, 301);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0];
  if (host === `www.${AGENCY_DOMAIN}`) {
    return NextResponse.redirect(new URL(`${pathname}${request.nextUrl.search}`, `https://${AGENCY_DOMAIN}`), 301);
  }
  if (AGENCY_WORKER || host === AGENCY_DOMAIN) {
    return agencyDomainResponse(request);
  }

  // Once the agency has its own domain, its Greek pages here move there.
  const moved = greekAgencyMoveRedirect(pathname);
  if (moved) {
    return NextResponse.redirect(`${moved}${request.nextUrl.search}`, 301);
  }

  // Legacy and city redirects that land on an English agency page go straight
  // on to its Greek page, so no request takes two hops.
  const webDesign = legacyWebDesignRedirect(pathname);
  if (webDesign) {
    return NextResponse.redirect(new URL(englishAgencyRedirect(webDesign) ?? webDesign, request.url), 301);
  }

  const cityRoute = decideServiceLocationRoute(pathname);
  if (cityRoute?.kind === 'gone') {
    return goneResponse(cityRoute.locale, cityRoute.service);
  }
  if (cityRoute?.kind === 'redirect') {
    return NextResponse.redirect(new URL(englishAgencyRedirect(cityRoute.to) ?? cityRoute.to, request.url), cityRoute.status);
  }

  // anotherseoguru.com is the product site. The agency serves Greek clients, so
  // every English agency page now lives on its Greek twin (see lib/site-split).
  const agency = englishAgencyRedirect(pathname);
  if (agency) {
    return NextResponse.redirect(new URL(agency, request.url), 301);
  }

  // Markdown twin of a docs page: /en/help/x/y.md -> the static Markdown route.
  const md = /^\/(en|el)\/(help|glossary|resources)((?:\/[a-z0-9-]+)*)\.md$/.exec(pathname);
  if (md) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/docs-md/${md[1]}/${md[2]}${md[3]}`;
    return NextResponse.rewrite(url);
  }

  // Markdown twin of any other page: /en.md, /el/platform/mcp.md -> rendered page as Markdown.
  const pageMd = /^\/(en|el)((?:\/[a-z0-9-]+)*)\.md$/.exec(pathname);
  if (pageMd) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/page-md/${pageMd[1]}${pageMd[2]}`;
    return NextResponse.rewrite(url);
  }

  // Same twin by content negotiation, for agents that send Accept: text/markdown.
  const accept = request.headers.get('accept') ?? '';
  if (
    accept.includes('text/markdown') &&
    !request.headers.get('x-asg-markdown') &&
    /^\/(en|el)((?:\/[a-z0-9-]+)*)\/?$/.test(pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/page-md${pathname.replace(/\/$/, '')}`;
    return NextResponse.rewrite(url);
  }

  // The glossary used to be one page with ?term=<id>; each term has its own URL now.
  const glossary = /^\/(en|el)\/glossary\/?$/.exec(pathname);
  const termParam = request.nextUrl.searchParams.get('term');
  if (glossary && termParam) {
    // Term ids are the slugs; anything that isn't slug-shaped goes to the A-Z page.
    const id = /^[a-z0-9-]{1,80}$/.test(termParam.trim().toLowerCase()) ? termParam.trim().toLowerCase() : null;
    const url = request.nextUrl.clone();
    url.search = '';
    url.pathname = id ? `/${glossary[1]}/glossary/${id}` : `/${glossary[1]}/glossary`;
    return NextResponse.redirect(url, 308);
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/opengraph-image') ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split('/')[1];

  if (isValidLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  if (pathname === '/gr' || pathname.startsWith('/gr/')) {
    const dest = pathname.replace(/^\/gr/, '/el') || '/el';
    return NextResponse.redirect(new URL(dest, request.url), 308);
  }

  if (!isLocalizedPath(pathname)) {
    const locale = detectLocale(request);
    const target = localizedPath(locale, pathname === '/' ? '/' : pathname);
    const url = request.nextUrl.clone();
    url.pathname = target;

    // Homepage: rewrite (no extra hop) so PSI/root visitors avoid a 307.
    // Other unprefixed paths keep a 307 so bookmarks still land on locale URLs.
    if (pathname === '/') {
      const response = NextResponse.rewrite(url);
      response.cookies.set(LOCALE_COOKIE, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      return response;
    }

    const response = NextResponse.redirect(url, 307);
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
