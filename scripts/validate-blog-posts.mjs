#!/usr/bin/env node
/**
 * Validate blog posts meet the content upgrade bar:
 * - pillar frontmatter
 * - faq: frontmatter (min 3)
 * - body word count 1000–1200 (long guides exempt)
 * - at least 1 markdown table
 * - in-body CTA heading
 * - min 5 internal links
 *
 * Usage: node scripts/validate-blog-posts.mjs [--strict]
 * Exit 1 when any post fails required checks.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = path.join(root, 'content/blog');
const strict = process.argv.includes('--strict');

const pillarSrc = fs.readFileSync(path.join(root, 'src/data/blog-pillars.ts'), 'utf8');
const knownPillars = new Set([...pillarSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]));
if (knownPillars.size < 2) {
  console.error('Could not read pillar slugs from src/data/blog-pillars.ts');
  process.exit(1);
}

/** Posts allowed to exceed 1200 words (pillar / comprehensive guides). */
const ALLOW_LONG = new Set([
  'local-seo-guide',
  'kataskevi-eshop-odigos',
  'geo-aeo-global-seo-playbook',
  'seo-web-design-development-platform',
  'diy-vs-agency',
  'pillar-ai-llm-visibility',
  'pillar-agency-playbooks',
  'pillar-search-console-mastery',
  'pillar-technical-seo-in-house',
  'google-business-profile-masterclass',
  'gsc-weekly-ops-playbook',
  'gsc-query-prioritization-framework',
  'llm-citations-brand-visibility',
  'pricing-page-seo-software-vs-agency',
  'medical-marketing',
  'internal-linking-audit-checklist',
  'glossary-strategy-internal-linking',
  // Chapters, a 30-day plan table, and an in-page glossary list. Cutting any
  // of those drops a section the page is built around.
  'seo-for-beginners',
  'poso-kostizei-to-seo',
  'backlink-checker',
  // Strategies, the prospect sheet and the outreach email examples are the
  // page. Cutting them under 1200 words would delete the templates.
  'link-building-guide',
  // The AI Mode pair carries a seven-row entity table plus the caveats about
  // the source, which do not compress without losing the point of the post.
  'google-ai-mode-tags',
  'google-ai-mode-tags-el',
  // 21-strategy listicle. The brief asks for about 2,500 words so each item
  // can say what to do, not just name a tactic.
  'seo-strategies',
]);

const CTA_RE =
  /^##\s+.*(Θέλετε|Ready|Get |Next |Work with|Start |Ξεκινήστε|Not sure|Want |Need |Ζητήστε|Ενσωματώστε|Επόμενο|Δουλέψτε|Roadmap|Plan|Outreach|Growth)/im;
const FAQ_HEADING_RE = /^##\s+(FAQ|Συχνές Ερωτήσεις)/m;

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function hasTable(body) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (/^\|.+\|$/.test(lines[i].trim()) && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
      return true;
    }
  }
  return false;
}

function countInternalLinks(body) {
  const matches = body.match(/\]\(\/(?:en|el)?\/?(?:blog|services|solutions|pricing|get-started|work|glossary|platform|tools|compare)[^)]*\)/g);
  return matches ? matches.length : 0;
}

function validatePost(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const slug = typeof data.slug === 'string' ? data.slug : path.basename(filePath, '.md');
  const errors = [];
  const warnings = [];

  if (!data.pillar && !data.pillarHub) {
    errors.push('missing pillar');
  }

  const pillarRaw = typeof data.pillar === 'string' ? data.pillar : '';
  // `ai-visibility` is folded into the ai-llm-visibility hub at read time.
  if (pillarRaw && pillarRaw !== 'ai-visibility' && !knownPillars.has(pillarRaw)) {
    errors.push(`pillar "${pillarRaw}" has no hub page, so /blog/topics/${pillarRaw} would 404`);
  }

  if (data.locale !== undefined && data.locale !== 'en' && data.locale !== 'el') {
    errors.push(`locale "${data.locale}" must be en or el (canonical and sitemap follow it)`);
  }

  const dateOk =
    (data.date instanceof Date && !Number.isNaN(data.date.getTime())) ||
    (typeof data.date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(data.date.trim()));
  if (!dateOk) {
    errors.push('missing or unparseable date (datePublished and sitemap lastmod)');
  }

  const translationOf = typeof data.translationOf === 'string' ? data.translationOf.trim() : '';
  if (typeof data.translationOf === 'string' && !translationOf) {
    errors.push('translationOf is empty');
  }

  const faq = Array.isArray(data.faq) ? data.faq : [];
  if (faq.length < 3) {
    errors.push(`faq frontmatter has ${faq.length} items (need ≥3)`);
  }

  const words = countWords(content);
  const allowLong = ALLOW_LONG.has(slug) || data.pillarHub === true;
  if (words < 1000) {
    errors.push(`word count ${words} < 1000`);
  } else if (words > 1200 && !allowLong) {
    (strict ? errors : warnings).push(`word count ${words} > 1200 (not in ALLOW_LONG)`);
  }

  if (!hasTable(content)) {
    errors.push('missing markdown table');
  }

  if (!CTA_RE.test(content)) {
    errors.push('missing in-body CTA heading');
  }

  if (!FAQ_HEADING_RE.test(content) && faq.length < 3) {
    errors.push('missing FAQ body section');
  }

  const links = countInternalLinks(content);
  if (links < 5) {
    errors.push(`internal links ${links} < 5`);
  }

  // buildMetadata() hard-caps descriptions at 160 and cuts at a word boundary,
  // which amputated the closing noun or verb on 15 posts before this check
  // existed ("...με χαμηλότερο κόστος από την."). Catch it at author time.
  // Measure what actually ships. `{{ENTRY_SEO}}` is 14 characters in the file
  // and resolves to something like "€500" at render, so measuring the raw
  // string would fail a description that is comfortably inside the window.
  // Six characters covers every price in src/data/pricing.ts ("€1.500").
  const desc = String(data.description ?? '')
    .replace(/\{\{[A-Z_]+\}\}/g, '\u20ac1.500')
    .replace(/\s+/g, ' ')
    .trim();
  if (!desc) {
    errors.push('missing description');
  } else if (desc.length > 158) {
    errors.push(`description ${desc.length} > 158 (would be truncated mid-phrase in the SERP)`);
  } else if (desc.length < 120) {
    warnings.push(`description ${desc.length} < 120 (short for the SERP window)`);
  }

  if (!data.categoryColor || !String(data.categoryColor).includes('bg-')) {
    warnings.push(`categoryColor may be invalid: ${data.categoryColor ?? '(none)'}`);
  }

  return {
    slug,
    words,
    errors,
    warnings,
    locale: data.locale || 'en',
    localeNorm: data.locale === 'el' ? 'el' : 'en',
    translationOf,
    file: path.basename(filePath),
  };
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).sort();
const results = files.map((f) => validatePost(path.join(blogDir, f)));

const bySlug = new Map();
const slugFiles = new Map();
for (const r of results) {
  const names = slugFiles.get(r.slug) ?? [];
  names.push(r.file);
  slugFiles.set(r.slug, names);
  bySlug.set(r.slug, r);
}
for (const [slug, names] of slugFiles) {
  if (names.length < 2) continue;
  for (const r of results) {
    if (r.slug === slug) r.errors.push(`duplicate slug in ${names.join(', ')}`);
  }
}

const inbound = new Map();
for (const r of results) {
  if (!r.translationOf) continue;
  const sources = inbound.get(r.translationOf) ?? [];
  sources.push(r.slug);
  inbound.set(r.translationOf, sources);
}
for (const [target, sources] of inbound) {
  if (sources.length < 2) continue;
  for (const slug of sources) {
    bySlug.get(slug)?.errors.push(
      `translationOf "${target}" is shared with ${sources.filter((s) => s !== slug).join(', ')}`,
    );
  }
}
for (const r of results) {
  if (!r.translationOf) continue;
  const target = bySlug.get(r.translationOf);
  if (!target) {
    r.errors.push(`translationOf "${r.translationOf}" does not match a post slug`);
    continue;
  }
  if (target.localeNorm === r.localeNorm) {
    r.errors.push(`translationOf "${r.translationOf}" is the same locale (${r.localeNorm})`);
  }
  if (target.translationOf && target.translationOf !== r.slug) {
    r.errors.push(`translationOf "${r.translationOf}" points back at "${target.translationOf}"`);
  }
}

let failed = 0;
let warnCount = 0;

for (const r of results) {
  if (r.errors.length) {
    failed++;
    console.log(`FAIL  ${r.locale} ${r.slug} (${r.words}w)`);
    for (const e of r.errors) console.log(`       - ${e}`);
  } else if (r.warnings.length) {
    warnCount++;
    console.log(`WARN  ${r.locale} ${r.slug} (${r.words}w)`);
    for (const w of r.warnings) console.log(`       - ${w}`);
  } else {
    console.log(`OK    ${r.locale} ${r.slug} (${r.words}w)`);
  }
}

console.log(`\n${results.length} posts · ${failed} failed · ${warnCount} warnings · ${results.length - failed - warnCount} ok`);
process.exit(failed > 0 ? 1 : 0);
