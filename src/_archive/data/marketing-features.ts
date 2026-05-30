import raw from "./marketing-features.json";

export interface MarketingFeatureSeo {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly keywords: string;
}

export interface MarketingFeature {
  readonly slug: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly overview: string;
  readonly benefits: readonly string[];
  readonly howItWorks: readonly string[];
  readonly useCases: readonly string[];
  readonly relatedFeatures: readonly string[];
  readonly seo: MarketingFeatureSeo;
}

export const MARKETING_FEATURES: readonly MarketingFeature[] = raw as MarketingFeature[];

export function getMarketingFeatureBySlug(slug: string): MarketingFeature | undefined {
  return MARKETING_FEATURES.find((f) => f.slug === slug);
}

/** Deep link to Vite app feature marketing page (matches App.tsx /features/* routes). */
export function getAppFeaturePath(slug: string): string {
  return `/features/${slug}`;
}
