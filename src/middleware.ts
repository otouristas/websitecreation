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
import { getAllServiceSlugs } from '@/data/services';

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
  const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title><style>body{font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;line-height:1.6;color:#111;background:#fff}a{color:#2563eb}</style></head><body><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(hub)}">${escapeHtml(cta)}</a></p></body></html>`;
  return new NextResponse(html, {
    status: 410,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'public, max-age=3600',
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cityRoute = decideServiceLocationRoute(pathname);
  if (cityRoute?.kind === 'gone') {
    return goneResponse(cityRoute.locale, cityRoute.service);
  }
  if (cityRoute?.kind === 'redirect') {
    return NextResponse.redirect(new URL(cityRoute.to, request.url), 308);
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
