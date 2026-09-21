import type { AuditResult, Localized, Pillar } from '@/lib/audit/types';
import type { EstimateInput, SeoTierId, Track } from './model';

/**
 * Turning a measurement into a starting scope.
 *
 * The rule this file follows: every recommendation must be able to name the
 * number that produced it, and that number must have been measured on this
 * visitor's site. A recommendation nobody can trace is a sales pitch, and a
 * sales pitch dressed as a diagnostic is worse than no diagnostic - so the
 * reasons travel with the config and the UI prints them next to the price.
 *
 * The visitor can override every field afterwards. This only decides where
 * the sliders start.
 */

export interface Recommendation {
  readonly input: Partial<EstimateInput>;
  /** Why, in the visitor's language, each with the figure that drove it. */
  readonly reasons: readonly Localized[];
}

function pillar(result: AuditResult, id: Pillar): number {
  return result.pillars.find((p) => p.pillar === id)?.score ?? 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function recommendFromAudit(result: AuditResult): Recommendation {
  const technical = pillar(result, 'technical');
  const content = pillar(result, 'content');
  const performance = pillar(result, 'performance');
  const ai = pillar(result, 'ai');
  const reasons: Localized[] = [];

  // Page count comes from the sitemap when the site publishes one, because
  // that is the site's own count rather than our guess. Internal links are the
  // fallback; the default only applies when neither was measurable.
  let pages = 8;
  if (result.metrics.sitemapUrls && result.metrics.sitemapUrls > 0 && !result.metrics.sitemapIsIndex) {
    pages = clamp(result.metrics.sitemapUrls, 1, 60);
    reasons.push({
      en: `Scoped to ${pages} pages from your sitemap.`,
      el: `Το scope ορίστηκε στις ${pages} σελίδες από το sitemap σας.`,
    });
  } else if (result.metrics.internalLinks > 0) {
    pages = clamp(result.metrics.internalLinks, 1, 60);
    reasons.push({
      en: `Scoped to about ${pages} pages from the links on your homepage.`,
      el: `Το scope ορίστηκε σε περίπου ${pages} σελίδες από τους συνδέσμους της αρχικής σας.`,
    });
  }

  const languages = result.metrics.hreflangCount > 1 ? clamp(result.metrics.hreflangCount / 2, 1, 5) : 1;
  if (languages > 1) {
    reasons.push({
      en: `${languages} languages, read from your hreflang tags.`,
      el: `${languages} γλώσσες, από τις ετικέτες hreflang σας.`,
    });
  }

  // The track is the visitor's, not ours.
  //
  // A measurement can add to what someone asked for; it has no business
  // quietly taking it away. Somebody who arrived from the website-creation
  // page wants a website - a healthy technical score is not a reason to move
  // them to an SEO-only plan behind their back. So this escalates to "both"
  // when the platform itself is measurably the constraint, with the figures
  // that say so, and otherwise leaves the track exactly where it was.
  let track: Track | undefined;
  if (technical < 45 && performance < 45) {
    track = 'both';
    reasons.push({
      en: `Technical ${technical}/100 and performance ${performance}/100: the platform is holding the site back, not just the content. Priced as a rebuild plus SEO - switch it back if you only want the SEO.`,
      el: `Τεχνικά ${technical}/100 και ταχύτητα ${performance}/100: το ίδιο το platform κρατά πίσω το site, όχι μόνο το περιεχόμενο. Κοστολογείται ως ανακατασκευή μαζί με SEO. Αλλάξτε το αν θέλετε μόνο το SEO.`,
    });
  }

  let seoTier: SeoTierId = 'growth';
  if (technical >= 75 && content >= 75 && ai >= 70) {
    seoTier = 'foundations';
    reasons.push({
      en: 'The basics already pass, so the entry retainer is enough to build on.',
      el: 'Τα βασικά ήδη περνούν, οπότε η εισαγωγική συνεργασία αρκεί ως βάση.',
    });
  } else if ((result.metrics.sitemapUrls ?? 0) > 200) {
    seoTier = 'authority';
    reasons.push({
      en: `${result.metrics.sitemapUrls} URLs in the sitemap: a site this size needs the larger programme.`,
      el: `${result.metrics.sitemapUrls} διευθύνσεις στο sitemap. Ένα site αυτού του μεγέθους χρειάζεται το μεγαλύτερο πρόγραμμα.`,
    });
  }

  const contentPagesPerMonth = content < 55 ? 3 : content < 75 ? 2 : 1;
  if (content < 55) {
    reasons.push({
      en: `Only ${result.metrics.wordCount} words on the homepage, so the plan starts with content.`,
      el: `Μόλις ${result.metrics.wordCount} λέξεις στην αρχική, οπότε το πλάνο ξεκινά από το περιεχόμενο.`,
    });
  }

  const technicalFailures = result.checks.filter(
    (c) => c.pillar === 'technical' && c.state === 'fail',
  ).length;
  const auditDepth = technicalFailures >= 4 ? 'advanced' : technicalFailures >= 1 ? 'technical' : 'none';
  if (technicalFailures >= 1) {
    reasons.push({
      en: `${technicalFailures} technical check${technicalFailures === 1 ? '' : 's'} failed, so an audit comes first.`,
      el: `${technicalFailures} τεχνικ${technicalFailures === 1 ? 'ός έλεγχος απέτυχε' : 'οί έλεγχοι απέτυχαν'}, οπότε προηγείται έλεγχος.`,
    });
  }

  const blockedAi = result.aiAccess.filter((a) => !a.allowed);
  if (blockedAi.length > 0) {
    reasons.push({
      en: `${blockedAi.map((a) => a.token).join(', ')} cannot crawl you: AI visibility work starts with robots.txt.`,
      el: `${blockedAi.map((a) => a.token).join(', ')} δεν μπορούν να σας σαρώσουν. Η ορατότητα σε AI ξεκινά από το robots.txt.`,
    });
  } else if (ai < 55) {
    reasons.push({
      en: `AI visibility scores ${ai}/100: the crawlers get in but find nothing structured to quote.`,
      el: `Η ορατότητα σε AI βαθμολογείται ${ai}/100: τα crawlers μπαίνουν αλλά δεν βρίσκουν δομημένο περιεχόμενο να αναφέρουν.`,
    });
  }

  return {
    input: {
      ...(track ? { track } : {}),
      pages,
      languages,
      seoTier,
      contentPagesPerMonth,
      auditDepth,
    },
    reasons,
  };
}

/**
 * Where the sliders start when a visitor arrives from a service page.
 *
 * `/get-started?service=ai-visibility` previously landed on a blank wizard:
 * the visitor had just read a page about one thing and was asked to start
 * from nothing. These presets are the smallest honest reading of what that
 * click meant, and the audit overrides them the moment it returns real data.
 */
export const SERVICE_PRESETS: Readonly<Record<string, Partial<EstimateInput>>> = {
  'ai-visibility': { track: 'seo', seoTier: 'growth', contentPagesPerMonth: 3, auditDepth: 'technical' },
  'local-seo': { track: 'seo', seoTier: 'foundations', contentPagesPerMonth: 2, auditDepth: 'technical' },
  'seo-audits': { track: 'seo', seoTier: 'foundations', auditDepth: 'advanced', contentPagesPerMonth: 0 },
  'link-building': { track: 'seo', seoTier: 'authority', contentPagesPerMonth: 2, auditDepth: 'none' },
  'content-creation': { track: 'seo', seoTier: 'growth', contentPagesPerMonth: 4, auditDepth: 'none' },
  'eshop-seo': { track: 'seo', seoTier: 'authority', contentPagesPerMonth: 3, auditDepth: 'advanced' },
  'website-creation': { track: 'website', auditDepth: 'none', features: ['contact-form'] },
  'website-redesign': { track: 'both', auditDepth: 'technical', seoTier: 'growth' },
  'seo-web-design': { track: 'both', auditDepth: 'technical', seoTier: 'growth' },
  'speed-optimization': { track: 'website', auditDepth: 'technical', features: [] },
  'logo-design': { track: 'website', auditDepth: 'none', features: ['logo'] },
  'eshop-woocommerce': { track: 'website', auditDepth: 'none', features: ['ecommerce', 'contact-form'], pages: 15 },
};

/** The wizard goal a service slug implies, so step 1 arrives already answered. */
export const SERVICE_GOALS: Readonly<Record<string, string>> = {
  'ai-visibility': 'ai',
  'local-seo': 'local',
  'seo-audits': 'recover',
  'link-building': 'local',
  'content-creation': 'local',
  'eshop-seo': 'eshop',
  'eshop-woocommerce': 'eshop',
  'website-creation': 'new-site',
  'website-redesign': 'new-site',
  'seo-web-design': 'new-site',
  'speed-optimization': 'recover',
  'logo-design': 'new-site',
};

export function presetForService(slug: string | null): Partial<EstimateInput> {
  if (!slug) return {};
  return SERVICE_PRESETS[slug] ?? {};
}
