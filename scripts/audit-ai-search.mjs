#!/usr/bin/env node
/**
 * Audit any site against the six layers and the twelve page checks.
 *
 *   npx tsx scripts/audit-ai-search.mjs                       # localhost:3000, sitemap sample
 *   npx tsx scripts/audit-ai-search.mjs --base https://x.com  # any origin
 *   npx tsx scripts/audit-ai-search.mjs --paths /a,/b --json report.json
 *   npx tsx scripts/audit-ai-search.mjs --min-score 70        # exits 1 below the floor
 *
 * Fetches raw HTML and never executes JavaScript, because that is what GPTBot,
 * ClaudeBot, PerplexityBot and OAI-SearchBot do. A page that passes here passes
 * for the reader it is being audited for; a headless browser would tell you
 * about a different one.
 *
 * The rules live in `src/lib/ai-search/checks.ts`, which has no imports and no
 * network of its own - this file is only fetching, arguments and output, so the
 * pair drops into another repo unchanged.
 */

import { writeFileSync } from 'node:fs';
import { auditPage } from '../src/lib/ai-search/checks.ts';

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
}
const flag = (name) => args.includes(`--${name}`);

const BASE = (arg('base', process.env.AUDIT_BASE_URL ?? 'http://localhost:3000')).replace(/\/$/, '');
const LIMIT = Number(arg('limit', '12'));
const MIN_SCORE = Number(arg('min-score', '0'));
const JSON_OUT = arg('json', null);
const VERBOSE = flag('verbose');

const C = process.stdout.isTTY
  ? { dim: '\x1b[2m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', bold: '\x1b[1m', off: '\x1b[0m' }
  : { dim: '', red: '', green: '', yellow: '', bold: '', off: '' };

const MARK = { pass: `${C.green}PASS${C.off}`, fail: `${C.red}FAIL${C.off}`, warn: `${C.yellow}WARN${C.off}`, na: `${C.dim} -  ${C.off}` };

async function get(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        // Identify honestly, and ask for what a crawler would be served.
        'user-agent': 'ai-search-auditor (+https://llmstxt.org/)',
        accept: 'text/html,application/xhtml+xml',
      },
    });
    return { status: res.status, body: await res.text() };
  } catch (err) {
    return { status: 0, body: '', error: String(err.message ?? err) };
  }
}

/** Paths from --paths, else a spread sampled from the sitemap, else the root. */
async function resolvePaths() {
  const explicit = arg('paths', null);
  if (explicit) return explicit.split(',').map((p) => p.trim()).filter(Boolean);

  for (const sitemap of ['/sitemap.xml', '/sitemap-index.xml', '/sitemap_index.xml']) {
    const { status, body } = await get(`${BASE}${sitemap}`);
    if (status !== 200 || !body.includes('<loc>')) continue;

    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const pages = locs.filter((u) => !/\.xml($|\?)/.test(u));
    if (pages.length === 0) {
      // A sitemap index: follow the first child rather than auditing XML.
      const child = locs[0];
      if (!child) continue;
      const nested = await get(child);
      const nestedLocs = [...nested.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      return sample(nestedLocs, LIMIT).map(toPath);
    }
    return sample(pages, LIMIT).map(toPath);
  }
  return ['/'];
}

/** Even spread across the sitemap, so the sample is not all one template. */
function sample(list, n) {
  if (list.length <= n) return list;
  const step = list.length / n;
  return Array.from({ length: n }, (_, i) => list[Math.floor(i * step)]);
}

function toPath(u) {
  try {
    return new URL(u).pathname;
  } catch {
    return u;
  }
}

async function main() {
  console.log(`\n${C.bold}AI-search audit${C.off} ${C.dim}${BASE}${C.off}\n`);

  const [robots, llms] = await Promise.all([get(`${BASE}/robots.txt`), get(`${BASE}/llms.txt`)]);
  const robotsTxt = robots.status === 200 ? robots.body : undefined;
  const hasLlmsTxt = llms.status === 200;

  const paths = await resolvePaths();
  const reports = [];

  for (const path of paths) {
    const url = `${BASE}${path}`;
    const { status, body, error } = await get(url);
    if (status !== 200 || !body) {
      console.log(`${C.red}HTTP ${status}${C.off}  ${path}${error ? `  ${error}` : ''}`);
      continue;
    }
    const report = auditPage({ url, html: body, robotsTxt, hasLlmsTxt, status });
    reports.push(report);

    const failed = report.results.filter((r) => r.status === 'fail');
    const warned = report.results.filter((r) => r.status === 'warn' && !r.advisory);
    const colour = report.score >= 80 ? C.green : report.score >= 60 ? C.yellow : C.red;
    console.log(`${colour}${String(report.score).padStart(3)}${C.off}  ${path}  ${C.dim}${failed.length} fail, ${warned.length} warn${C.off}`);

    for (const r of report.results) {
      if (r.status === 'pass' && !VERBOSE) continue;
      if (r.status === 'na' && !VERBOSE) continue;
      if (r.advisory && !VERBOSE) continue;
      console.log(`       ${MARK[r.status]}  ${C.dim}${r.layer.padEnd(3)}${C.off} ${r.title}${C.dim} - ${r.detail}${C.off}`);
    }
  }

  if (reports.length === 0) {
    console.error('\nNo pages audited.');
    process.exit(1);
  }

  // Per-layer totals across every page, which is how the six layers are meant
  // to be read: a stack, where the lowest weak layer caps the ones above it.
  const layers = {};
  for (const r of reports) {
    for (const [layer, v] of Object.entries(r.byLayer)) {
      layers[layer] ??= { pass: 0, total: 0 };
      layers[layer].pass += v.pass;
      layers[layer].total += v.total;
    }
  }

  const order = ['SEO', 'AEO', 'GEO', 'AIO', 'DEO', 'SXO'];
  console.log(`\n${C.bold}By layer${C.off}  ${C.dim}(${reports.length} pages)${C.off}`);
  for (const layer of order) {
    const v = layers[layer];
    if (!v) continue;
    const pct = Math.round((v.pass / v.total) * 100);
    const bar = '#'.repeat(Math.round(pct / 5)).padEnd(20, '.');
    const colour = pct >= 80 ? C.green : pct >= 60 ? C.yellow : C.red;
    console.log(`  ${layer.padEnd(4)} ${colour}${bar}${C.off} ${String(pct).padStart(3)}%  ${v.pass}/${v.total}`);
  }

  const mean = Math.round(reports.reduce((s, r) => s + r.score, 0) / reports.length);
  console.log(`\n${C.bold}Mean score ${mean}/100${C.off}`);

  // The failures that appear on the most pages: one template fix each.
  const tally = new Map();
  for (const r of reports) {
    for (const c of r.results) {
      if (c.status !== 'fail') continue;
      tally.set(c.title, (tally.get(c.title) ?? 0) + 1);
    }
  }
  if (tally.size) {
    console.log(`\n${C.bold}Most common failures${C.off}`);
    for (const [title, n] of [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)) {
      console.log(`  ${String(n).padStart(3)} pages  ${title}`);
    }
  }

  if (JSON_OUT) {
    writeFileSync(JSON_OUT, JSON.stringify({ base: BASE, generatedAt: new Date().toISOString(), mean, layers, reports }, null, 2));
    console.log(`\n${C.dim}JSON written to ${JSON_OUT}${C.off}`);
  }

  console.log('');
  if (mean < MIN_SCORE) {
    console.error(`Mean score ${mean} is below the --min-score floor of ${MIN_SCORE}.`);
    process.exit(1);
  }
}

await main();
