#!/usr/bin/env node
/**
 * Audit static metadata in src/app (grep-based).
 * Run: node scripts/audit-meta.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src', 'app');
const BRAND = 'AnotherSEOGuru';
const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith('.tsx') || name.endsWith('.ts')) files.push(p);
  }
  return files;
}

const issues = [];

for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  if (!src.includes('buildMetadata')) continue;

  const titleMatch = src.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const descMatch = src.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/);

  if (titleMatch) {
    const raw = titleMatch[1];
    const hasDupBrand =
      (raw.match(new RegExp(BRAND, 'gi')) || []).length > 0 &&
      raw.includes('|');
    let primary = raw.replace(new RegExp(`\\s*[\\|\\-]\\s*${BRAND}`, 'gi'), '').trim();
    const full = primary === BRAND ? BRAND : `${primary} | ${BRAND}`;
    if (full.length > TITLE_MAX) {
      issues.push({ file, type: 'title-long', value: full, len: full.length });
    }
    if (hasDupBrand) {
      issues.push({ file, type: 'title-dup-brand', value: raw });
    }
  }

  if (descMatch) {
    const d = descMatch[1];
    if (d.length < DESC_MIN || d.length > DESC_MAX + 20) {
      issues.push({ file, type: 'description-length', value: d, len: d.length });
    }
  }
}

if (issues.length === 0) {
  console.log('✓ No obvious metadata issues in static buildMetadata() calls.');
  process.exit(0);
}

console.error(`Found ${issues.length} metadata issue(s):`);
for (const i of issues) {
  console.error(`- [${i.type}] ${i.file}${i.len ? ` (${i.len} chars)` : ''}`);
  if (i.value) console.error(`  ${i.value.slice(0, 100)}...`);
}
process.exit(1);
