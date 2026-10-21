/**
 * Calls the real generateMetadata functions for a sample of mapped URLs.
 * The full rendered check is scripts/check-meta-map.mjs --base.
 */
import type { Metadata } from 'next';
import { generateMetadata as place } from '../src/app/[locale]/seo/[place]/page';
import { generateMetadata as city } from '../src/app/[locale]/services/[service]/[location]/page';
import { generateMetadata as hub } from '../src/app/[locale]/services/[service]/page';
import { generateMetadata as services } from '../src/app/[locale]/services/page';
import { generateMetadata as seoHub } from '../src/app/[locale]/seo/page';
import { generateMetadata as pillar } from '../src/app/[locale]/seo-services/page';
import { generateMetadata as spoke } from '../src/app/[locale]/seo-services/[spoke]/page';
import { generateMetadata as tourism } from '../src/app/[locale]/seo-tourismou/page';
import { generateMetadata as vertical } from '../src/app/[locale]/seo-tourismou/[vertical]/page';
import { consultantMetadata } from '../src/components/pages/ConsultantPageView';
import map from '../src/data/serp-meta.json';

function text(value: unknown): string {
  return typeof value === 'string' ? value : String(value ?? '');
}

const failures: string[] = [];

async function check(path: string, metaPromise: Promise<Metadata> | Metadata) {
  const meta = await metaPromise;
  const expected = map[path as keyof typeof map];
  const rows: Array<[string, string, string]> = [
    ['title', text(meta.title), expected.title],
    ['description', text(meta.description), expected.description],
    ['og:title', text(meta.openGraph?.title), expected.title],
    ['og:description', text(meta.openGraph?.description), expected.description],
    ['twitter:title', text(meta.twitter?.title), expected.title],
    ['twitter:description', text(meta.twitter?.description), expected.description],
  ];
  for (const [field, actual, want] of rows) {
    if (actual !== want) {
      failures.push(`${path} ${field}`);
      console.log('FAIL', path, field, '\n want', want, '\n got ', actual);
    }
  }
}

async function main() {
  const samples: Array<[string, Promise<Metadata>]> = [
    ['/el/seo/athens', place({ params: Promise.resolve({ locale: 'el', place: 'athens' }) })],
    ['/el/seo/thessaloniki', place({ params: Promise.resolve({ locale: 'el', place: 'thessaloniki' }) })],
    ['/el/services/website-creation/athens-gr', city({ params: Promise.resolve({ locale: 'el', service: 'website-creation', location: 'athens-gr' }) })],
    ['/el/services/seo-audits/rethymno-gr', city({ params: Promise.resolve({ locale: 'el', service: 'seo-audits', location: 'rethymno-gr' }) })],
    ['/en/services/website-creation/london-uk', city({ params: Promise.resolve({ locale: 'en', service: 'website-creation', location: 'london-uk' }) })],
    ['/en/services/local-seo/athens-gr', city({ params: Promise.resolve({ locale: 'en', service: 'local-seo', location: 'athens-gr' }) })],
    ['/en/services/web-design', hub({ params: Promise.resolve({ locale: 'en', service: 'web-design' }) })],
    ['/el/services/web-design', hub({ params: Promise.resolve({ locale: 'el', service: 'web-design' }) })],
    ['/el/services/logo-design', hub({ params: Promise.resolve({ locale: 'el', service: 'logo-design' }) })],
    ['/en/services/website-creation', hub({ params: Promise.resolve({ locale: 'en', service: 'website-creation' }) })],
    ['/en/services/ai-visibility', hub({ params: Promise.resolve({ locale: 'en', service: 'ai-visibility' }) })],
    ['/el/services', services({ params: Promise.resolve({ locale: 'el' }) })],
    ['/en/services', services({ params: Promise.resolve({ locale: 'en' }) })],
    ['/el/seo', seoHub({ params: Promise.resolve({ locale: 'el' }) })],
    ['/en/seo-services', pillar({ params: Promise.resolve({ locale: 'en' }) })],
    ['/el/seo-services', pillar({ params: Promise.resolve({ locale: 'el' }) })],
    ['/en/seo-services/technical', spoke({ params: Promise.resolve({ locale: 'en', spoke: 'technical' }) })],
    ['/el/seo-services/on-page', spoke({ params: Promise.resolve({ locale: 'el', spoke: 'on-page' }) })],
    ['/el/seo-tourismou', tourism({ params: Promise.resolve({ locale: 'el' }) })],
    ['/el/seo-tourismou/xenodoxeia', vertical({ params: Promise.resolve({ locale: 'el', vertical: 'xenodoxeia' }) })],
  ];
  for (const [path, promise] of samples) await check(path, promise);
  await check('/el/symvoulos-seo', Promise.resolve(consultantMetadata('el')));
  await check('/en/seo-consultant', Promise.resolve(consultantMetadata('en')));
  console.log(failures.length ? `sample mismatches ${failures.length}` : 'sample generateMetadata matches');
  process.exit(failures.length ? 1 : 0);
}

void main();
