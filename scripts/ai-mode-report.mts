#!/usr/bin/env npx tsx
/**
 * AI Mode readiness across the client portfolio.
 *
 * Drives the live audit engine - the same one behind /api/audit - against
 * client sites and reports the ai pillar alongside the entity type each
 * business is. It re-implements no analysis: a second, weaker copy of the
 * scoring would drift from the widget within a month, and then we would be
 * advising from one set of numbers and measuring with another.
 *
 * What the script produces is the work list. The verdict is still a person's:
 * whether a rent-a-car client publishes per-model pages worth marking up as
 * vehicles, or a tour operator publishes dated departures worth marking up as
 * events, is a judgement about their content, not a property of their HTML.
 *
 * Usage:
 *   npx tsx scripts/ai-mode-report.mts                    # first 5, live only
 *   npx tsx scripts/ai-mode-report.mts --category hotel
 *   npx tsx scripts/ai-mode-report.mts --slug way-to-crete
 *   npx tsx scripts/ai-mode-report.mts --all              # every live client
 *   npx tsx scripts/ai-mode-report.mts --plan-only        # no network at all
 *
 * This hits third-party sites we do not own, so requests are sequential with
 * a delay between them and the default is five. `--all` is opt-in on purpose.
 */

import { portfolioProjects, type PortfolioProject } from '../src/data/portfolio';
import {
  PORTFOLIO_ENTITY_MAP,
  AI_MODE_ENTITY_TYPES,
  entityTypesForVertical,
  groundingProfileFor,
  requiredGrounding,
} from '../src/data/ai-mode-tags';
import { runAudit } from '../src/lib/audit/run';
import type { AuditResult } from '../src/lib/audit/types';

const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name: string): boolean => args.includes(`--${name}`);

const DELAY_MS = 2000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function selectProjects(): PortfolioProject[] {
  let list = [...portfolioProjects];
  const slug = flag('slug');
  const category = flag('category');
  if (slug) list = list.filter((p) => p.slug === slug);
  if (category) list = list.filter((p) => p.category === category);

  // Four domains are dead and one is a parked for-sale page. Auditing them
  // would report a failure that belongs to the registrar, not the client.
  const live = list.filter((p) => p.liveStatus !== 'offline');
  const skipped = list.length - live.length;
  if (skipped > 0) console.log(`Skipping ${skipped} project(s) recorded as offline.\n`);

  if (has('all') || slug) return live;
  const limit = Number(flag('limit') ?? 5);
  return live.slice(0, Number.isFinite(limit) && limit > 0 ? limit : 5);
}

/** What the client's business is, versus what their site could ground. */
function classify(project: PortfolioProject) {
  const mapped = PORTFOLIO_ENTITY_MAP[project.category];
  const schemaType = mapped?.schemaType ?? 'Organization';
  const profile = groundingProfileFor(schemaType);
  // The conditional set: cards their own content could ground if they publish
  // the right pages. Deliberately separate from what the business is.
  const couldGround = entityTypesForVertical(project.category);
  return { schemaType, entity: mapped?.entity ?? 'Corporation', profile, couldGround };
}

function planTable(projects: readonly PortfolioProject[]): void {
  console.log('| slug | category | business is | schema.org | could also ground |');
  console.log('| :--- | :--- | :--- | :--- | :--- |');
  for (const p of projects) {
    const c = classify(p);
    const extra = c.couldGround
      .map((e) => e.type)
      .filter((t) => t !== c.entity)
      .join(', ');
    console.log(
      `| ${p.slug} | ${p.category} | ${c.entity} | ${c.schemaType} | ${extra || '-'} |`,
    );
  }
}

async function auditOne(project: PortfolioProject): Promise<AuditResult | null> {
  try {
    for await (const event of runAudit(project.url)) {
      if (event.type === 'result') return event.result;
      if (event.type === 'error') {
        console.log(`  ${project.slug}: ${event.code}`);
        return null;
      }
    }
  } catch (err) {
    console.log(`  ${project.slug}: ${err instanceof Error ? err.message : 'failed'}`);
  }
  return null;
}

async function main(): Promise<void> {
  const projects = selectProjects();

  console.log('# AI Mode readiness report\n');
  console.log(`Generated ${new Date().toISOString().slice(0, 10)}.`);
  console.log(
    'Scores are the live audit\'s ai pillar. See docs/ai-mode-readiness.md for what each check means.\n',
  );

  console.log('## Coverage\n');
  const byCategory = new Map<string, number>();
  for (const p of portfolioProjects) {
    byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
  }
  let mapped = 0;
  for (const [category, n] of [...byCategory].sort((a, b) => b[1] - a[1])) {
    const types = entityTypesForVertical(category);
    if (types.length) mapped += n;
    console.log(
      `- ${category}: ${n} - ${types.map((t) => t.type).join(' + ') || 'needs a human decision'}`,
    );
  }
  console.log(
    `\n${mapped} of ${portfolioProjects.length} clients fall into a vertical with a known entity mapping.\n`,
  );

  console.log('## Classification\n');
  planTable(projects);

  if (has('plan-only')) {
    console.log('\n(--plan-only: no sites were contacted.)');
    return;
  }

  console.log(`\n## Measured (${projects.length} site(s), sequential)\n`);
  console.log('| slug | ai score | failing ai checks |');
  console.log('| :--- | ---: | :--- |');

  for (const [i, project] of projects.entries()) {
    if (i > 0) await sleep(DELAY_MS);
    const result = await auditOne(project);
    if (!result) {
      console.log(`| ${project.slug} | - | unreachable |`);
      continue;
    }
    const ai = result.pillars.find((p) => p.pillar === 'ai');
    const failing = result.checks
      .filter((c) => c.pillar === 'ai' && c.state !== 'pass')
      .map((c) => `${c.id}:${c.state}`)
      .join(' ');
    console.log(`| ${project.slug} | ${ai?.score ?? '-'} | ${failing || 'all pass'} |`);
  }

  console.log(
    '\nThe required grounding attributes per entity type are in docs/ai-mode-readiness.md;',
  );
  console.log(
    `this run covered ${new Set(projects.map((p) => p.category)).size} of ${byCategory.size} verticals.`,
  );
}

void main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);

// Referenced so the required-attribute helper stays exercised by a real
// caller rather than existing only for the docs generator.
void requiredGrounding(AI_MODE_ENTITY_TYPES[0]!);
