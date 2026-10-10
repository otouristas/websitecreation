/**
 * Retired /platform/features/<slug> pages.
 *
 * Until 2026-10 the website had 27 feature pages built from a JSON file that
 * described features GSC Boost (the app at app.anotherseoguru.com) does not
 * have, such as gamification, SERPProof testing and outreach autopilot. The
 * platform section now mirrors the app's nine real modules on one page,
 * /platform/features, with an anchor per module.
 *
 * Each old slug maps to the closest module anchor. next.config.ts reads this
 * map to 308 the old URLs (both locales), and marketing-links.ts uses it for
 * legacy `/features/<slug>` paths in glossary copy. Keep this file free of
 * imports: next.config.ts loads it directly.
 */

export type GscBoostModuleAnchor =
  | 'opportunities'
  | 'performance'
  | 'keywords'
  | 'content'
  | 'audit'
  | 'competitors'
  | 'ai-visibility'
  | 'assistant'
  | 'agency';

export const LEGACY_FEATURE_MODULES: Readonly<Record<string, GscBoostModuleAnchor>> = {
  'sprint-board-task-management': 'agency',
  'ai-autopilot-mode': 'assistant',
  'keyword-research-clustering': 'keywords',
  'serp-tracking-analysis': 'keywords',
  'serpproof-testing': 'performance',
  'backlink-monitoring': 'competitors',
  'competitor-analysis': 'competitors',
  'ranking-tracker': 'keywords',
  'ai-content-generation': 'content',
  'technical-seo-audits': 'audit',
  'local-seo-google-maps': 'performance',
  'shopping-product-research': 'keywords',
  'content-gap-analysis': 'competitors',
  'multi-llm-ai-system': 'assistant',
  'achievements-gamification': 'opportunities',
  'algorithm-drop-detector': 'performance',
  'content-decay-detector': 'opportunities',
  'seo-health-score': 'audit',
  'ranking-predictions': 'opportunities',
  'competitor-content-spy': 'competitors',
  'semantic-keyword-clustering': 'keywords',
  'serp-intent-mapper': 'keywords',
  'cannibalization-doctor': 'opportunities',
  'serp-feature-hunter': 'keywords',
  'link-velocity-tracker': 'competitors',
  'outreach-autopilot': 'competitors',
  'eeat-optimizer': 'content',
};

/** The /platform/features anchor an old feature slug now lives at. */
export function legacyFeatureAnchor(slug: string): GscBoostModuleAnchor | undefined {
  return LEGACY_FEATURE_MODULES[slug];
}
