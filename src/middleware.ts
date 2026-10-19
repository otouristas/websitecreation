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
import { THEME_INIT_SCRIPT } from '@/brand/theme';

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
  const html = `<!doctype html><html lang="${locale}" data-asg-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="icon" href="/icon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico"><title>${escapeHtml(title)}</title><link rel="stylesheet" href="/brand/brand.tokens.css"><link rel="stylesheet" href="/brand/error-fonts.css"><script>${THEME_INIT_SCRIPT}</script><style>body{font-family:Inter,system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;line-height:1.6;color:var(--asg-text);background:var(--asg-background)}a{color:var(--asg-link)}a:focus-visible{outline:2px solid var(--asg-focus);outline-offset:3px}.brand{display:block;width:220px;max-width:100%;height:auto;margin-bottom:2rem}.on-light{display:none}[data-asg-theme="light"] .on-dark{display:none}[data-asg-theme="light"] .on-light{display:block}</style></head><body><a href="/${locale}" aria-label="AnotherSEOGuru"><img src="/brand/asg-lockup-on-dark.svg" class="brand on-dark" alt="AnotherSEOGuru"><img src="/brand/asg-lockup-on-light.svg" class="brand on-light" alt="AnotherSEOGuru"></a><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p><p><a href="${escapeHtml(hub)}">${escapeHtml(cta)}</a></p></body></html>`;
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
    return NextResponse.redirect(new URL(cityRoute.to, request.url), cityRoute.status);
  }

  // Markdown twin of a docs page: /en/help/x/y.md -> the static Markdown route.
  const md = /^\/(en|el)\/(help|glossary|resources)((?:\/[a-z0-9-]+)*)\.md$/.exec(pathname);
  if (md) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/docs-md/${md[1]}/${md[2]}${md[3]}`;
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
