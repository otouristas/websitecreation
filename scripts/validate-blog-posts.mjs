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
  'poso-kostizei-to-seo',
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

  if (!data.categoryColor || !String(data.categoryColor).includes('bg-')) {
    warnings.push(`categoryColor may be invalid: ${data.categoryColor ?? '(none)'}`);
  }

  return { slug, words, errors, warnings, locale: data.locale || 'en' };
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).sort();
const results = files.map((f) => validatePost(path.join(blogDir, f)));

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
