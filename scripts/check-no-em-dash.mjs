/**
 * Fails if an em dash, a horizontal bar, their HTML entities, or an en dash
 * used as a spaced clause separator appears in any tracked text file.
 *
 * Rewrite the sentence instead of swapping in another dash: a comma, colon,
 * full stop or parentheses. Unspaced en dashes in ranges ("1–3",
 * "Mon–Fri") are fine. Code that must still match an em dash coming from
 * user input writes it as an escape (backslash, u2014).
 *
 *   node scripts/check-no-em-dash.mjs
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SELF = 'scripts/check-no-em-dash.mjs';

const TEXT_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.mts', '.cts',
  '.json', '.md', '.mdx', '.txt', '.html', '.xml', '.csv', '.tsv',
  '.yml', '.yaml', '.css', '.svg', '.toml', '.py', '.sh', '.env',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'out', 'coverage']);

/** Built from code points so this file does not contain the characters it bans. */
const EM = String.fromCharCode(0x2014);
const BAR = String.fromCharCode(0x2015);
const EN = String.fromCharCode(0x2013);
const RULES = [
  { label: 'em dash', rx: new RegExp(EM, 'g') },
  { label: 'horizontal bar', rx: new RegExp(BAR, 'g') },
  { label: 'em dash entity', rx: /&mdash;|&#8212;|&#x0*2014;/gi },
  { label: 'spaced en dash', rx: new RegExp(`[ \\t]${EN}[ \\t]`, 'g') },
];

function trackedFiles() {
  try {
    const out = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    return out.split('\0').filter(Boolean);
  } catch {
    // Not a git checkout (e.g. a tarball): walk the tree instead.
    const files = [];
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (SKIP_DIRS.has(entry.name)) continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.isFile()) files.push(relative(ROOT, full).replaceAll('\\', '/'));
      }
    };
    walk(ROOT);
    return files;
  }
}

function selfTest() {
  const bad = [`a ${EM} b`, `a${EM}b`, `a ${BAR} b`, 'a &mdash; b', 'a &#8212; b', 'a &#x2014; b', `Title ${EN} Brand`];
  const good = [`1${EN}3 weeks`, `Mon${EN}Fri`, 'a - b', 'a, b'];
  const hit = (s) => RULES.some(({ rx }) => {
    rx.lastIndex = 0;
    return rx.test(s);
  });
  const failures = [
    ...bad.filter((s) => !hit(s)).map((s) => `self-test: expected a hit for ${JSON.stringify(s)}`),
    ...good.filter((s) => hit(s)).map((s) => `self-test: unexpected hit for ${JSON.stringify(s)}`),
  ];
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
}

function main() {
  selfTest();
  const hits = [];
  let scanned = 0;
  for (const rel of trackedFiles()) {
    if (rel === SELF) continue;
    const ext = extname(rel).toLowerCase();
    if (!TEXT_EXT.has(ext) && !rel.endsWith('LICENSE')) continue;
    const full = join(ROOT, rel);
    let text;
    try {
      if (statSync(full).size > 8_000_000) continue;
      text = readFileSync(full, 'utf8');
    } catch {
      continue;
    }
    if (text.includes('\u0000')) continue;
    scanned += 1;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const { label, rx } of RULES) {
        rx.lastIndex = 0;
        if (rx.test(line)) {
          hits.push(`${rel}:${i + 1}: ${label}: ${line.trim().slice(0, 120)}`);
          break;
        }
      }
    });
  }
  if (hits.length) {
    console.error(`Em dashes found (${hits.length}). Rewrite the sentence with a comma, colon, full stop or parentheses:`);
    console.error(hits.slice(0, 100).join('\n'));
    if (hits.length > 100) console.error(`... and ${hits.length - 100} more`);
    process.exit(1);
  }
  console.log(`check-no-em-dash: no em dashes in ${scanned} tracked text files.`);
}

main();
