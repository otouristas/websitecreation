import { MetadataRoute } from 'next';
import { COMPARE_PAGES } from '@/data/compare-pages';
import { getAllBlogPosts, getPillarSummary } from '@/lib/blog';
import { blogSitemapEntry } from '@/lib/blog-seo';
import { getPillarMeta } from '@/data/blog-pillars';
import { portfolioProjects } from '@/data/portfolio';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import { consultantPath } from '@/data/founder';
import { helpContent } from '@/data/help';
import { OPPORTUNITY_FINDER, RESOURCE_ARTICLES } from '@/data/resources';
import { allTerms } from '@/lib/docs/glossary';
import { PLACE_PAGES } from '@/data/place-seo';
import { WEBSITE_REGION_PAGES } from '@/data/website-regions';
import { PLATFORM_TOOLS } from '@/data/platform-tools';
import { TOURISM_VERTICALS } from '@/data/tourism-seo';
import { ENGLISH_VERTICALS } from '@/data/tourism-seo/en';
import { buildLocationServiceUrls } from '@/lib/sitemap-locations';

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
    lastModified: opts.lastModified ?? new Date(GENERATED_CONTENT_UPDATED),
    changeFrequency: opts.changeFrequency ?? 'weekly',
    priority: opts.priority ?? 0.8,
  }));
}

function forElOnly(
  path: string,
  opts: Partial<Omit<MetadataRoute.Sitemap[number], 'url'>> = {},
): MetadataRoute.Sitemap {
  return [
    {
      url: localeUrl('el', path),
      lastModified: opts.lastModified ?? new Date(GENERATED_CONTENT_UPDATED),
      changeFrequency: opts.changeFrequency ?? 'weekly',
      priority: opts.priority ?? 0.8,
    },
  ];
}

function forEnOnly(
  path: string,
  opts: Partial<Omit<MetadataRoute.Sitemap[number], 'url'>> = {},
): MetadataRoute.Sitemap {
  return [
    {
      url: localeUrl('en', path),
      lastModified: opts.lastModified ?? new Date(GENERATED_CONTENT_UPDATED),
      changeFrequency: opts.changeFrequency ?? 'weekly',
      priority: opts.priority ?? 0.8,
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts();

  // Shared agency/marketing pages, bilingual.
  const bilingualPaths = [
    // The SEO-services commercial pillar. Not part of /services/[service],
    // which is the axis of the location and industry matrices.
    { path: '/seo-services', priority: 0.95 },
    // Spokes of the hub. Not service × city URLs.
    { path: '/seo-services/technical', priority: 0.85 },
    { path: '/seo-services/on-page', priority: 0.85 },
    { path: '/seo-services/strategy', priority: 0.85 },
    { path: '/seo-guru', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/glossary', priority: 0.86 },
    // One page per glossary term, in both languages.
    ...allTerms().map(({ term }) => ({ path: `/glossary/${term.id}`, priority: 0.6, changeFrequency: 'monthly' as const })),
    { path: '/services', priority: 0.9 },
    { path: '/solutions', priority: 0.9 },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/get-started', priority: 0.9, changeFrequency: 'monthly' as const },
    // The live GEO/AEO check. Bilingual, same as /tools, /compare and /resources.
    { path: '/ai-visibility-check', priority: 0.86 },
    { path: '/locations', priority: 0.8 },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/work', priority: 0.88 },
    { path: '/blog', priority: 0.8 },
    { path: '/seo-guides', priority: 0.84 },
    // AnotherSEOGuru App, the software (/platform). Bilingual since 2026-10: the
    // module pages and pricing have real Greek copy from the app's own
    // dictionary. The old /platform/features/<slug> pages are gone (308s
    // in next.config.ts to the module anchors on /platform/features).
    { path: '/platform', priority: 0.95 },
    { path: '/platform/features', priority: 0.92 },
    { path: '/platform/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/platform/for/agencies', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/platform/for/in-house', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/platform/for/ecommerce', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/platform/iphone', priority: 0.8, changeFrequency: 'monthly' as const },
    // One login everywhere: the integrations hub and its three product pages.
    { path: '/platform/integrations', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/platform/chrome-extension', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/platform/wordpress', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/platform/mcp', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/platform/security', priority: 0.6, changeFrequency: 'monthly' as const },
    // AnotherSEOGuru App help center: same slugs in both locales.
    { path: '/help', priority: 0.8 },
    ...helpContent('en').flatMap((c) => [
      { path: `/help/${c.slug}`, priority: 0.7, changeFrequency: 'monthly' as const },
      ...c.articles.map((a) => ({ path: `/help/${c.slug}/${a.slug}`, priority: 0.65, changeFrequency: 'monthly' as const })),
    ]),
  ];

  // Tools, resources and compare keep the English slug in both locales.
  // Tool intent pages stay noindex,follow; they are listed the same way the
  // English URLs already were.
  const bilingualProductPaths = [
    { path: '/resources', priority: 0.88 },
    { path: '/resources/search-optimization-layers', priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/resources/ai-search-page-anatomy', priority: 0.86, changeFrequency: 'monthly' as const },
    ...RESOURCE_ARTICLES.map((a) => ({
      path: `/resources/${a.slug}`,
      priority: a.kind === 'pillar' ? 0.86 : 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: `/resources/${OPPORTUNITY_FINDER.slug}`, priority: 0.86, changeFrequency: 'monthly' as const },
    { path: '/tools', priority: 0.84 },
    ...PLATFORM_TOOLS.map((tool) => ({
      path: `/tools/${tool.slug}`,
      priority: 0.72,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/compare', priority: 0.86, changeFrequency: 'monthly' as const },
  ];

  const staticPages = [
    ...bilingualPaths.flatMap(({ path, priority, changeFrequency }) =>
      forBothLocales(path, { priority, changeFrequency }),
    ),
    ...bilingualProductPaths.flatMap(({ path, priority, changeFrequency }) =>
      forBothLocales(path, { priority, changeFrequency }),
    ),
  ];

  // Managed SEO uses a different slug per locale, like the consultant page.
  const managedPages: MetadataRoute.Sitemap = [
    ...forEnOnly('/managed-seo', { priority: 0.9, changeFrequency: 'monthly' }),
    ...forElOnly('/diacheirisi-seo', { priority: 0.9, changeFrequency: 'monthly' }),
  ];

  // How it works uses a different slug per locale. Pass the path without the
  // locale prefix: localizedPath adds /en or /el.
  const howItWorksPages: MetadataRoute.Sitemap = [
    ...forEnOnly('/how-it-works', { priority: 0.9, changeFrequency: 'monthly' }),
    ...forElOnly('/pos-leitourgei', { priority: 0.9, changeFrequency: 'monthly' }),
  ];

  // The founder / SEO-consultant page has a different slug per locale.
  const consultantPages: MetadataRoute.Sitemap = LOCALES.map((locale) => ({
    url: `${BASE_URL}${consultantPath(locale)}`,
    lastModified: new Date(GENERATED_CONTENT_UPDATED),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // Greek place hub. No English twin in this phase.
  const placePages: MetadataRoute.Sitemap = [
    ...forElOnly('/seo', { priority: 0.9, changeFrequency: 'weekly' }),
    ...PLACE_PAGES.flatMap((place) =>
      forElOnly(`/seo/${place.slug}`, { priority: 0.82, changeFrequency: 'monthly' }),
    ),
    // Greek regional website-creation pages (Κρήτη, Κυκλάδες).
    ...WEBSITE_REGION_PAGES.flatMap((page) =>
      forElOnly(`/kataskevi-istoselidon/${page.slug}`, { priority: 0.86, changeFrequency: 'monthly' }),
    ),
    // Greek tourism SEO hub and one commercial page per vertical.
    ...forElOnly('/seo-tourismou', { priority: 0.9, changeFrequency: 'weekly' }),
    ...TOURISM_VERTICALS.flatMap((vertical) =>
      forElOnly(`/seo-tourismou/${vertical.slug}`, { priority: 0.88, changeFrequency: 'monthly' }),
    ),
    // English tourism SEO hub. Paired with the Greek URLs above, different slugs.
    ...forEnOnly('/tourism-seo', { priority: 0.9, changeFrequency: 'weekly' }),
    ...ENGLISH_VERTICALS.flatMap((vertical) =>
      forEnOnly(`/tourism-seo/${vertical.slug}`, { priority: 0.88, changeFrequency: 'monthly' }),
    ),
  ];

  const comparePages = COMPARE_PAGES.flatMap((c) =>
    forBothLocales(`/compare/${c.slug}`, { priority: 0.82, changeFrequency: 'monthly' }),
  );


  const portfolioPages = portfolioProjects.flatMap((p) =>
    forBothLocales(`/work/${p.slug}`, {
      priority: p.featured ? 0.75 : 0.65,
      changeFrequency: 'monthly',
    }),
  );

  // Posts are single-locale files, only list them under the locale they exist in.
  // Pillar hubs are aggregation pages; emit them per locale where posts exist.
  // A pillar slug with no hub copy 404s, so a new post cannot add that URL.
  const pillarPages: MetadataRoute.Sitemap = (['en', 'el'] as const).flatMap((loc) =>
    getPillarSummary(loc)
      .filter((p) => getPillarMeta(p.pillar))
      .map((p) => ({
        url: localeUrl(loc, `/blog/topics/${p.pillar}`),
        lastModified: new Date(p.latest ? (p.latest.updated ?? p.latest.date) : GENERATED_CONTENT_UPDATED),
        changeFrequency: 'weekly' as const,
        priority: 0.75,
      })),
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => blogSitemapEntry(p));

  // Indexable service × city pages. The location shards still list the same
  // URLs; they were absent from this file, which is the inventory at
  // /sitemap.xml. Only combinations that pass the indexability gate are
  // included, so noindex and redirected city URLs stay out.
  const serviceCityPages: MetadataRoute.Sitemap = (
    [
      ['el', 'el'],
      ['en', 'en-intl'],
      ['en', 'en-us'],
    ] as const
  ).flatMap(([locale, shard]) =>
    buildLocationServiceUrls(locale, shard).map((entry) => ({
      url: entry.loc,
      lastModified: new Date(GENERATED_CONTENT_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: Number(entry.priority ?? '0.6'),
    })),
  );

  return [...staticPages,
    ...placePages,
    ...consultantPages,
    ...managedPages,
    ...howItWorksPages,
    ...comparePages,
    ...portfolioPages,
    ...pillarPages,
    ...blogPages,
    ...serviceCityPages,
  ];
}
