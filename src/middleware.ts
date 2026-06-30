import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  isLocalizedPath,
  isValidLocale,
  localizedPath,
  type SiteLocale,
} from '@/lib/i18n/locale';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
