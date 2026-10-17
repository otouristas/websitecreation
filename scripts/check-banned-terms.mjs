/**
 * Fails if the agency owner or the agency's old street address appears in
 * source or build output.
 *
 * Client case studies may still name their own place or a client. Those
 * matches are allowed only when a client marker sits near the hit, or when
 * the file is listed in scripts/banned-terms.allowlist.json. The owner's
 * name, the postal code, and "based in …" phrasing are never allowed.
 *
 *   node scripts/check-banned-terms.mjs
 *   node scripts/check-banned-terms.mjs --require-build
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const ALLOWLIST_PATH = join(ROOT, 'scripts/banned-terms.allowlist.json');
const requireBuild = process.argv.includes('--require-build');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next/cache',
  'coverage',
]);

const TEXT_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.mts', '.cts',
  '.json', '.md', '.mdx', '.txt', '.html', '.xml', '.csv',
  '.yml', '.yaml', '.css', '.svg', '.toml',
]);

const SELF = new Set([
  'scripts/check-banned-terms.mjs',
  'scripts/banned-terms.allowlist.json',
]);

/** Never allowed, including inside client case studies. */
const HARD = [
  /κασιωτ/g,
  /kasiot/g,
  /kasios/g,
  /γιωργ/g,
  /giorg/g,
  /yiorg/g,
  /giwrg/g,
  /george\s+k\b/g,
  /based in sifnos/g,
  /sifnos-based/g,
  /εδρα τη σιφν/g,
  /εδρα στις καμαρ/g,
  /kamares,\s*sifnos/g,
  /καμαρες,\s*σιφν/g,
];

/** Allowed only with a nearby client marker or an allowlisted file. */
const SOFT = [
  /sifnos/g,
  /σιφν/g,
  /kamares/g,
  /καμαρες/g,
  /\bgeorge\b/g,
];

const CLIENT_MARKERS = [
  'hotels-sifnos',
  'hotelssifnos',
  'hotels sifnos',
  'rentacar-sifnos',
  'rentacarsifnos',
  'artemis rental',
  'travel-sifnos',
  'xipolitas',
  'george-xipolitas',
  'georgexipolitas',
  'villa-olivia',
  'villaoliviaclara',
  'platis gialos',
  'kamares port',
  'kamares car',
  'ξενοδοχεια σιφν',
  'διαμονη σιφν',
  'ενοικιαση αυτοκινητου σιφν',
  'ενοικιαση μηχανης σιφν',
  'αυτοκινητο καμαρες',
  'παραλαβη στις καμαρες',
  'sifnos accommodation',
  'sifnos scooter',
  'where to stay sifnos',
  'rent a car sifnos',
  // US city in INTRO/us_cities_over_50000.csv, not a person.
  'saint george',
];

const WINDOW = 50000;

function normalize(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function loadAllowlist() {
  const parsed = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8'));
  return new Set(parsed.files.map((file) => file.replaceAll('\\', '/')));
}

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    const rel = relative(ROOT, full).replaceAll('\\', '/');
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || SKIP_DIRS.has(rel)) continue;
      if (rel.startsWith('.next/cache')) continue;
      walk(full, out);
      continue;
    }
    if (!entry.isFile()) continue;
    if (SELF.has(rel)) continue;
    const ext = extname(entry.name).toLowerCase();
    if (!TEXT_EXT.has(ext) && !rel.startsWith('.next/') && !rel.startsWith('out/')) continue;
    if (rel.startsWith('.next/') || rel.startsWith('out/')) {
      if (!TEXT_EXT.has(ext) && ext !== '.js' && ext !== '.rsc' && ext !== '') continue;
    }
    out.push(rel);
  }
}

function nearestLine(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i += 1) {
    if (text.charCodeAt(i) === 10) line += 1;
  }
  return line;
}

/** The old postal code. In build output the same digits are also a JS module id. */
function postalCodeHit(rel, norm, index) {
  const around = norm.slice(Math.max(0, index - 80), index + 5 + 80);
  const nearPlace = /sifnos|kamares|σιφν|καμαρ|postal|addresslocality/.test(around);
  if (rel.startsWith('.next/') || rel.startsWith('out/')) return nearPlace;
  return true;
}

function scanFile(rel, allowFiles) {
  const full = join(ROOT, rel);
  let raw;
  try {
    const size = statSync(full).size;
    if (size > 8_000_000) return [];
    raw = readFileSync(full, 'utf8');
  } catch {
    return [];
  }
  if (raw.includes('\u0000')) return [];
  const norm = normalize(raw);
  const fileAllowed = allowFiles.has(rel) || CLIENT_MARKERS.some((marker) => rel.toLowerCase().includes(marker));
  const hits = [];

  const consider = (regex, hard) => {
    regex.lastIndex = 0;
    let match = regex.exec(norm);
    while (match) {
      const index = match.index;
      const line = nearestLine(norm, index);
      const around = norm.slice(Math.max(0, index - WINDOW), index + match[0].length + WINDOW);
      const clientNear = CLIENT_MARKERS.some((marker) => around.includes(marker));
      const allowed = !hard && (fileAllowed || clientNear);
      if (!allowed) {
        const start = Math.max(0, index - 60);
        const snippet = norm.slice(start, index + match[0].length + 60).replace(/\s+/g, ' ');
        hits.push(`${rel}:${line}: ${hard ? 'blocked' : 'unlisted'} “${match[0]}” …${snippet}…`);
      }
      if (match.index === regex.lastIndex) regex.lastIndex += 1;
      match = regex.exec(norm);
    }
  };

  for (const regex of HARD) consider(regex, true);
  for (const regex of SOFT) consider(regex, false);

  const postal = /84003/g;
  let postalMatch = postal.exec(norm);
  while (postalMatch) {
    if (postalCodeHit(rel, norm, postalMatch.index)) {
      const line = nearestLine(norm, postalMatch.index);
      const snippet = norm
        .slice(Math.max(0, postalMatch.index - 60), postalMatch.index + 65)
        .replace(/\s+/g, ' ');
      hits.push(`${rel}:${line}: blocked “84003” …${snippet}…`);
    }
    postalMatch = postal.exec(norm);
  }
  return hits;
}

function selfTest() {
  const samples = [
    { text: 'Based in Sifnos, Greece', fail: true },
    { text: 'Με έδρα τη Σίφνο', fail: true },
    { text: 'Kamares, Sifnos 84003', fail: true },
    { text: 'Γιώργος Κασιώτης', fail: true },
    { text: 'George K, SEO consultant', fail: true },
    { text: 'Καμάρι, Σαντορίνη', fail: false },
    { text: 'hotels-sifnos Hotels Sifnos stays in Sifnos', fail: false },
    { text: 'George Xipolitas hospitality', fail: false },
    { text: 'free Kamares port pickup for rentacar-sifnos', fail: false },
  ];
  const failures = [];
  for (const sample of samples) {
    const norm = normalize(sample.text);
    const hard = HARD.some((regex) => {
      regex.lastIndex = 0;
      return regex.test(norm);
    });
    const soft = SOFT.some((regex) => {
      regex.lastIndex = 0;
      return regex.test(norm);
    });
    const clientNear = CLIENT_MARKERS.some((marker) => norm.includes(marker));
    const blocked = hard || (soft && !clientNear);
    if (blocked !== sample.fail) {
      failures.push(`self-test expected fail=${sample.fail} for “${sample.text}”`);
    }
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
}

function main() {
  selfTest();
  const allowFiles = loadAllowlist();
  const files = [];
  walk(ROOT, files);

  const buildDirs = ['.next', 'out'].filter((dir) => existsSync(join(ROOT, dir)));
  if (requireBuild && buildDirs.length === 0) {
    console.error('check-banned-terms: --require-build was set but neither .next nor out exists.');
    process.exit(1);
  }

  const hits = [];
  for (const rel of files) hits.push(...scanFile(rel, allowFiles));
  if (hits.length) {
    console.error(`Banned terms found (${hits.length}):`);
    console.error(hits.slice(0, 80).join('\n'));
    if (hits.length > 80) console.error(`… and ${hits.length - 80} more`);
    process.exit(1);
  }
  const scannedBuild = buildDirs.length ? ` and ${buildDirs.join(', ')}` : '';
  console.log(`check-banned-terms: no blocked mentions in ${files.length} files${scannedBuild}.`);
}

main();
