/**
 * Service-aware English copy for the service × city pages that survived the
 * 2026-10 city cut (see `src/lib/indexability/service-location.ts`).
 *
 * English counterpart of `service-copy-el.ts`, translated from it for the four
 * services that keep city pages. Without it, an English SEO-audit or e-shop
 * city page carried only the shared city paragraph plus generic template text,
 * so it read the same as the website-creation page for that city.
 *
 * Same rules as the Greek file:
 *  - Never state a price here. Prices live in `data/pricing.ts`.
 *  - Never claim a deliverable the service does not list in `services.ts`.
 *  - Never assert local presence, client names, results or statistics.
 */
import type { ServiceCopyBlock } from './service-copy-el';

export interface ServiceCopyContextEn {
  /** City name, e.g. "Heraklion". */
  readonly city: string;
  /** Neighbourhood names from the Location entity. */
  readonly neighborhoods: readonly string[];
  /** Pack flag: this is a tourism/hospitality market. */
  readonly tourism: boolean;
}

type Builder = (c: ServiceCopyContextEn) => ServiceCopyBlock;

function hoodList(c: ServiceCopyContextEn, limit = 3): string {
  const h = c.neighborhoods.slice(0, limit);
  if (h.length === 0) return '';
  if (h.length === 1) return h[0];
  return `${h.slice(0, -1).join(', ')} and ${h[h.length - 1]}`;
}

function hoodSentence(c: ServiceCopyContextEn, lead: string): string[] {
  const list = hoodList(c);
  return list ? [`${lead} ${list}.`] : [];
}

const BUILDERS: Record<string, Builder> = {
  'website-creation': (c) => ({
    heading: `What website creation in ${c.city} includes`,
    paragraphs: [
      'We start from what the site is for, not from a ready-made theme: what you want a visitor to do, which service pages you need, and how someone gets from a search result to your form or phone number. The UX/UI design is built on that path.',
      'The technical foundations go in on day one, not afterwards: fast pages, a fully responsive mobile layout, a clean URL structure and built-in SEO basics, so the site can win rankings instead of needing a rebuild a year later.',
      ...hoodSentence(
        c,
        'Where demand is clearly local, we build a separate page per area instead of one generic "areas we serve" page - for example',
      ),
    ],
    deliverables: [
      'Custom UX/UI design',
      'Mobile-first responsive build',
      'SEO foundations included',
      'Analytics setup',
    ],
  }),

  'local-seo': (c) => ({
    heading: `Local SEO and Google Business Profile in ${c.city}`,
    paragraphs: [
      'Local searches are decided in two places: the Google map pack and the organic results below it. Your profile and your website have to work together for you to appear in both.',
      'We start with the Google Business Profile - categories, services, photos, questions - and with consistent citations and NAP, because mismatched business names, addresses and phone numbers cost you trust with the algorithm.',
      ...hoodSentence(
        c,
        'Alongside that we build local keywords and landing pages targeted by area, where demand justifies it - for example',
      ),
      'A review strategy closes the loop: a steady flow of reviews and replies to them, which count both for rankings and for how many people call.',
    ],
    deliverables: [
      'Google Business Profile optimisation',
      'Citation building & NAP consistency',
      'Local keywords & landing pages',
      'Review strategy',
    ],
  }),

  'seo-audits': (c) => ({
    heading: `What a technical SEO audit in ${c.city} checks`,
    paragraphs: [
      'The audit starts with the foundations: can Google read and index the pages you want, and only those. This is where the problems that cancel out every later effort show up - duplicates, wrong canonicals, pages left out of the index, broken internal structure.',
      'Next come on-page and content: which pages target the same query and compete with each other, where coverage is missing, and what to fix in titles and headings. Keyword research and competitor gap analysis show where there is realistic room to grow.',
      'Core Web Vitals and speed get their own chapter, because they affect both rankings and conversions.',
      'You get a prioritised fix roadmap - what first, what next and why - not a list of warnings exported from a tool.',
    ],
    deliverables: [
      'Technical health check',
      'Core Web Vitals analysis',
      'Competitor gap analysis',
      'Prioritised fix roadmap',
    ],
  }),

  'eshop-woocommerce': (c) => ({
    heading: `WooCommerce e-shop development in ${c.city}`,
    paragraphs: [
      'An e-shop is judged on the things the homepage does not show: how fast someone finds the product, how many steps the checkout has, and what happens when something is out of stock. The WooCommerce setup is built around those.',
      'We design product pages to answer the questions that stop a purchase, connect the payment gateways and set up shipping rules and checkout for the way you actually ship.',
      'The category structure is planned with SEO in mind from the start, because categories - not the homepage - are what rank for commercial searches.',
    ],
    deliverables: [
      'WooCommerce setup',
      'Payment gateway integration',
      'Shipping rules & checkout optimisation',
      'SEO category structure',
    ],
  }),
};

const TOURISM_SERVICES = new Set(['website-creation', 'local-seo', 'seo-audits']);

const TOURISM_PARAGRAPH =
  'In hospitality and tourism markets, search is seasonal and often in other languages: demand builds months before arrival, and much of it passes through OTAs. We work so that direct bookings are not lost along that path, with multilingual targeting where there is real demand.';

/** Service-specific English copy, or null for services without an authored block. */
export function getServiceCopyEn(
  serviceSlug: string,
  ctx: ServiceCopyContextEn,
): ServiceCopyBlock | null {
  const build = BUILDERS[serviceSlug];
  if (!build) return null;
  const block = build(ctx);
  const paragraphs =
    ctx.tourism && TOURISM_SERVICES.has(serviceSlug)
      ? [...block.paragraphs, TOURISM_PARAGRAPH]
      : block.paragraphs;
  return { ...block, paragraphs };
}

export const SERVICES_WITH_EN_COPY = new Set(Object.keys(BUILDERS));
