import { MetadataRoute } from 'next';
import { PLATFORM_TOOLS } from '@/data/platform-tools';
import { MARKETING_FEATURES } from '@/data/marketing-features';
import { COMPARE_PAGES } from '@/data/compare-pages';
import { getAllBlogPosts } from '@/lib/blog';
import { portfolioProjects } from '@/data/portfolio';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const BASE_URL = 'https://anotherseoguru.com';
const LOCALES: SiteLocale[] = ['en', 'el'];

function localeUrl(locale: SiteLocale, path: string) {
  return `${BASE_URL}${localizedPath(locale, path)}`;
}

function forBothLocales(
  path: string,
  opts: Partial<Omit<MetadataRoute.Sitemap[number], 'url'>> = {},
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'weekly',
    priority: opts.priority ?? 0.8,
  }));
}

function forEnOnly(
  path: string,
  opts: Partial<Omit<MetadataRoute.Sitemap[number], 'url'>> = {},
): MetadataRoute.Sitemap {
  return [
    {
      url: localeUrl('en', path),
      lastModified: opts.lastModified ?? new Date(),
      changeFrequency: opts.changeFrequency ?? 'weekly',
      priority: opts.priority ?? 0.8,
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();

  // Shared agency/marketing pages — bilingual.
  const bilingualPaths = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/glossary', priority: 0.86 },
    { path: '/services', priority: 0.9 },
    { path: '/solutions', priority: 0.9 },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/get-started', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/locations', priority: 0.8 },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/work', priority: 0.88 },
    { path: '/blog', priority: 0.8 },
  ];

  // Platform / tools / resources canonicalize to EN — do not list /el duplicates.
  const enOnlyPaths = [
    { path: '/platform', priority: 0.95 },
    { path: '/platform/features', priority: 0.92 },
    { path: '/platform/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/platform/for/agencies', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/platform/for/in-house', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/platform/for/ecommerce', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/resources', priority: 0.88 },
    { path: '/tools', priority: 0.84 },
  ];

  const staticPages = [
    ...bilingualPaths.flatMap(({ path, priority, changeFrequency }) =>
      forBothLocales(path, { priority, changeFrequency }),
    ),
    ...enOnlyPaths.flatMap(({ path, priority, changeFrequency }) =>
      forEnOnly(path, { priority, changeFrequency }),
    ),
  ];

  const comparePages = COMPARE_PAGES.flatMap((c) =>
    forEnOnly(`/compare/${c.slug}`, { priority: 0.82, changeFrequency: 'monthly' }),
  );

  const featurePages = MARKETING_FEATURES.flatMap((f) =>
    forEnOnly(`/platform/features/${f.slug}`, { priority: 0.8, changeFrequency: 'monthly' }),
  );

  const portfolioPages = portfolioProjects.flatMap((p) =>
    forBothLocales(`/work/${p.slug}`, {
      priority: p.featured ? 0.75 : 0.65,
      changeFrequency: 'monthly',
    }),
  );

  // Posts are single-locale files — only list them under the locale they exist in.
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: localeUrl(p.locale, `/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: p.isPillarHub ? 0.85 : 0.7,
  }));

  const toolPages = PLATFORM_TOOLS.flatMap((tool) =>
    forEnOnly(`/tools/${tool.slug}`, { priority: 0.75, changeFrequency: 'monthly' }),
  );

  return [...staticPages, ...comparePages, ...featurePages, ...portfolioPages, ...blogPages, ...toolPages];
}
