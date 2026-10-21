/**
 * Check the city and service metadata map.
 *
 * 1. The map itself: 50–60 character titles, 140–155 character descriptions,
 *    no banned terms, no duplicate titles.
 * 2. Rendered HTML, when given a base URL or a built `.next` tree: the
 *    <title>, meta description, Open Graph and Twitter title/description on
 *    every mapped URL match the map, and those tags contain no banned term.
 *
 *   node scripts/check-meta-map.mjs
 *   node scripts/check-meta-map.mjs --base http://127.0.0.1:3456
 *   node scripts/check-meta-map.mjs --html-dir .next/server/app
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MAP_PATH = join(ROOT, 'src/data/serp-meta.json');

function joined(parts) {
  return parts.join('');
}

const BANNED = [
  { label: 'SEO Web Design', rx: /seo web design/i },
  { label: 'euro sign', rx: /€/ },
  { label: 'price-from', rx: new RegExp(`${joined(['απ', 'ό'])}\\s*€`, 'i') },
  { label: 'prices-el', rx: new RegExp(`${joined(['τιμ', 'ές'])}|${joined(['τιμ', 'ες'])}`, 'i') },
  { label: 'Prices', rx: /\bprices\b/i },
  { label: 'from-euro', rx: /from\s*€/i },
  { label: 'owner-name', rx: new RegExp(`\\b${joined(['geo', 'rge'])}\\b`, 'i') },
  { label: 'island', rx: new RegExp(`${joined(['sif', 'nos'])}|${joined(['σίφ', 'ν'])}`, 'i') },
  { label: 'harbour', rx: new RegExp(`${joined(['kama', 'res'])}|${joined(['καμ', 'άρ'])}`, 'i') },
];

function arg(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function decode(value) {
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function metaContent(html, key) {
  const attrs = '(?:name|property)';
  const patterns = [
    new RegExp(`<meta[^>]*${attrs}=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attrs}=["']${key}["'][^>]*>`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decode(match[1]);
  }
  return null;
}

function readTags(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return {
    title: titleMatch ? decode(titleMatch[1].trim()) : null,
    description: metaContent(html, 'description'),
    ogTitle: metaContent(html, 'og:title'),
    ogDescription: metaContent(html, 'og:description'),
    twitterTitle: metaContent(html, 'twitter:title'),
    twitterDescription: metaContent(html, 'twitter:description'),
  };
}

function walkHtml(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) walkHtml(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function htmlForPath(htmlDir, pathname) {
  const relative = pathname.replace(/^\//, '');
  const candidates = [
    join(htmlDir, `${relative}.html`),
    join(htmlDir, relative, 'index.html'),
    join(htmlDir, relative, 'page.html'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return readFileSync(candidate, 'utf8');
  }
  return null;
}

const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
const paths = Object.keys(map);
let failed = 0;

function fail(message) {
  failed += 1;
  console.error(`FAIL ${message}`);
}

if (paths.length !== 163) fail(`map has ${paths.length} pages, expected 163`);

const seenTitles = new Map();
for (const pathname of paths) {
  const row = map[pathname];
  if (row.title.length < 50 || row.title.length > 60) {
    fail(`${pathname} title is ${row.title.length} chars`);
  }
  if (row.description.length < 140 || row.description.length > 155) {
    fail(`${pathname} description is ${row.description.length} chars`);
  }
  if (row.title !== row.title.trim() || row.description !== row.description.trim()) {
    fail(`${pathname} has surrounding whitespace`);
  }
  const fields = { title: row.title, description: row.description };
  for (const [field, value] of Object.entries(fields)) {
    for (const ban of BANNED) {
      if (ban.rx.test(value)) fail(`${pathname} ${field} contains ${ban.label}`);
    }
  }
  const previous = seenTitles.get(row.title);
  if (previous) fail(`duplicate title «${row.title}» on ${previous} and ${pathname}`);
  else seenTitles.set(row.title, pathname);
}

console.log(`map: ${paths.length} pages, ${seenTitles.size} unique titles, banned-term scan ${failed ? 'failed' : 'clean'}`);

const base = arg('--base');
const htmlDir = arg('--html-dir') ?? (existsSync(join(ROOT, '.next/server/app')) ? join(ROOT, '.next/server/app') : undefined);
const rendered = Boolean(base || htmlDir);

if (!rendered) {
  console.log('rendered: skipped (pass --base or build the site so .next/server/app exists)');
} else {
  let compared = 0;
  for (const pathname of paths) {
    const expected = map[pathname];
    let html = null;
    if (base) {
      const response = await fetch(new URL(pathname, base.endsWith('/') ? base : `${base}/`));
      if (!response.ok) {
        fail(`${pathname} returned HTTP ${response.status}`);
        continue;
      }
      html = await response.text();
    } else {
      html = htmlForPath(htmlDir, pathname);
      if (!html) {
        fail(`${pathname} has no built HTML under ${htmlDir}`);
        continue;
      }
    }
    const tags = readTags(html);
    compared += 1;
    const pairs = [
      ['title', tags.title, expected.title],
      ['description', tags.description, expected.description],
      ['og:title', tags.ogTitle, expected.title],
      ['og:description', tags.ogDescription, expected.description],
      ['twitter:title', tags.twitterTitle, expected.title],
      ['twitter:description', tags.twitterDescription, expected.description],
    ];
    for (const [field, actual, want] of pairs) {
      if (actual == null) {
        fail(`${pathname} missing ${field}`);
        continue;
      }
      if (actual !== want) {
        fail(`${pathname} ${field}\n  expected: ${want}\n  actual:   ${actual}`);
      }
      for (const ban of BANNED) {
        if (ban.rx.test(actual)) fail(`${pathname} rendered ${field} contains ${ban.label}`);
      }
    }
  }
  console.log(`rendered: compared ${compared} pages`);
}

if (failed) {
  console.error(`\n${failed} failure(s)`);
  process.exit(1);
}
console.log('meta map check passed');
