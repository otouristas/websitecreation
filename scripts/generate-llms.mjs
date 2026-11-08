#!/usr/bin/env node
/**
 * Generate llms.txt + llms-full.txt for anotherseoguru.com.
 *
 * anotherseoguru.com is the product site: AnotherSEOGuru App, SEO software
 * built on Google Search Console. The done-for-you agency (websites and SEO
 * for Greek businesses) is a separate business with its own pages (see
 * src/lib/site-split.ts), so these files describe the product and give the
 * agency one pointer, never its catalog.
 *
 * Usage: npm run generate:llms
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
// Run under tsx so plans and modules come from the same source as the site.
// These files are served to AI crawlers, so a hand-typed copy that drifts
// publishes wrong figures to ChatGPT and Perplexity.
import {
  resolvePriceTokens,
  websitePackages,
  seoPackages,
  VAT_RATE,
  currentPrice,
} from '../src/data/pricing.ts';
import { SEO_MIN_TERM_MONTHS } from '../src/data/company-facts.ts';
import { serviceNamesEl } from '../src/data/services-i18n.ts';
import { PLACE_PAGES, PLACE_REGION_LABEL } from '../src/data/place-seo/index.ts';
import { WEBSITE_REGION_PAGES } from '../src/data/website-regions.ts';
import { TOURISM_VERTICALS } from '../src/data/tourism-seo/index.ts';
import { portfolioProjects } from './portfolio-data.mjs';
import { PLANS, CREDIT_PACKS, yearlySavings } from '../src/components/gsc-boost/plans.ts';
import { MODULES } from '../src/components/gsc-boost/modules.ts';
// The docs (help center, iPhone guides, glossary) render from the same data as the site.
import { markdownFor } from '../src/lib/docs/markdown.ts';
import { helpContent } from '../src/data/help/index.ts';
import {
  AGENCY_AUDIT_EL,
  AGENCY_AUDIT_HREF,
  AGENCY_DOMAIN,
  AGENCY_HOME_EL,
  AGENCY_HOME_HREF,
  AGENCY_ORIGIN,
  AGENCY_PRICING_EL,
  AGENCY_PRICING_HREF,
  agencyDomainPath,
} from '../src/lib/site-split.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = 'https://anotherseoguru.com';
const APP = 'https://app.anotherseoguru.com';
const TODAY = new Date().toISOString().slice(0, 10);

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.writeFileSync(abs, content, 'utf8');
  console.log(`Wrote ${rel} (${content.length.toLocaleString()} chars)`);
}

/** Absolute URL of an agency link (a .com path today, anotherseoguru.gr after the move). */
function abs(href) {
  return href.startsWith('http') ? href : `${BASE}${href}`;
}

function parseBlogPosts() {
  const dir = path.join(ROOT, 'content/blog');
  if (!fs.existsSync(dir)) return [];
  /**
   * Unquoted YAML dates arrive as `Date` objects, so a `typeof === 'string'`
   * test misses every post and stamps the generation date on all of them.
   */
  const normalizePostDate = (value, slug) => {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value.toISOString().slice(0, 10);
    }
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value.trim())) {
      return value.trim().slice(0, 10);
    }
    throw new Error(`Blog post "${slug}" has a missing or unparseable \`date\` in its frontmatter.`);
  };

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(raw);
    if (typeof data.title !== 'string' || typeof data.description !== 'string') continue;
    const locale = data.locale === 'el' ? 'el' : 'en';
    const slug =
      typeof data.slug === 'string' ? data.slug : file.replace(/\.md$/, '');
    posts.push({
      slug,
      title: resolvePriceTokens(String(data.title), locale),
      // Authored copy uses `{{ENTRY_SEO}}`-style tokens so prices cannot go
      // stale; resolve them here or the token itself reaches AI crawlers.
      description: resolvePriceTokens(data.description, locale),
      date: normalizePostDate(data.date, slug),
      locale,
      isPillarHub: Boolean(data.pillarHub),
      faq: Array.isArray(data.faq)
        ? data.faq
            .map((f) => ({
              question: f?.question ?? f?.q,
              answer: resolvePriceTokens(f?.answer ?? f?.a ?? '', locale),
            }))
            .filter((f) => typeof f.question === 'string' && typeof f.answer === 'string')
        : [],
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

function url(locale, p) {
  const pathPart = p.startsWith('/') ? p : `/${p}`;
  return `${BASE}/${locale}${pathPart === '/' ? '' : pathPart}`;
}

function hubLine(label, href, blurb) {
  return `- **${label}** (<${href}>) - ${blurb}`;
}

function mdLink(label, href, blurb) {
  return `- [${label}](${href}) - ${blurb}`;
}

const usd = (n) => `$${n}`;

const SUMMARY =
  'AnotherSEOGuru App is SEO software built on Google Search Console. It reads every query and page in your Search Console data and turns them into one ranked list of fixes, each with an estimate of the extra clicks it could bring, plus keyword research and rank tracking, site audits, content tools, competitor data, AI visibility tracking (ChatGPT, Gemini, Perplexity, Google AI Overviews) and Aster AI, an assistant that answers from your own data. Web app at app.anotherseoguru.com, with an iPhone app, Android app, Chrome extension, WordPress plugin and an MCP server for AI assistants on the same account. English and Greek. Made by Touristas Technologies.';

function productHubs() {
  return [
    hubLine('Home (English)', url('en', '/'), 'What AnotherSEOGuru App does, live demo and free sign-up.'),
    hubLine('Αρχική (Ελληνικά)', url('el', '/'), 'Το AnotherSEOGuru App στα ελληνικά: λογισμικό SEO από το Search Console.'),
    hubLine('Features', url('en', '/platform/features'), 'The nine modules: opportunities, performance, keywords, content, site audit, competitors, AI visibility, Aster AI assistant, agency tools.'),
    hubLine('Pricing', url('en', '/pricing'), `Plans ${PLANS.map((p) => `${p.id} ${usd(p.monthly)}/mo`).join(', ')}; two months free on yearly billing. Greek: ${url('el', '/pricing')}.`),
    hubLine('How it works', url('en', '/how-it-works'), 'Connect Search Console, get ranked fixes, track the result.'),
    hubLine('Security', url('en', '/platform/security'), 'Read-only Google access, data handling and permissions.'),
    hubLine('For agencies', url('en', '/platform/for/agencies'), 'White-label reports, client portal and many sites in one account.'),
    hubLine('For in-house teams', url('en', '/platform/for/in-house'), 'One or a few sites, weekly fixes and reporting.'),
    hubLine('For e-commerce', url('en', '/platform/for/ecommerce'), 'Category and product pages, decaying pages, cannibalization.'),
    hubLine('Integrations (one login)', url('en', '/platform/integrations'), 'One account for the web app, iPhone, Android, Chrome extension, WordPress plugin and AI assistants (MCP).'),
    hubLine('iPhone app', url('en', '/platform/iphone'), 'Native iOS app on the same account: weekly fixes, rank tracking, alerts, AI evidence, widgets.'),
    hubLine('Android app', url('en', '/platform/android'), 'Android app on the same account.'),
    hubLine('SEO Chrome extension', url('en', '/platform/chrome-extension'), "Free on-page SEO checks (meta, headings, links, images, schema, Open Graph, hreflang, Core Web Vitals) without an account; signed in, the page's own Search Console data."),
    hubLine('WordPress SEO plugin', url('en', '/platform/wordpress'), 'Free WordPress SEO plugin: Google preview, SEO and readability analysis (Greek-aware), schema, XML sitemaps, redirects, 404 monitor, llms.txt and AI crawler controls; Search Console data and AI titles in the editor; imports from Yoast, Rank Math, AIOSEO, SEOPress.'),
    hubLine('Google Search Console MCP server', url('en', '/platform/mcp'), `Search Console data, fix list, site audit, live ranks, tasks and AI visibility in Claude, ChatGPT, Claude Code, Codex, Cursor, VS Code, Windsurf and other MCP clients. Remote server ${APP}/mcp (OAuth).`),
    hubLine('Compare', url('en', '/compare'), 'AnotherSEOGuru App next to other SEO tools.'),
    hubLine('Free SEO tools', url('en', '/tools'), 'Free single-purpose SEO tools, no account needed.'),
    hubLine('AI visibility check', url('en', '/ai-visibility-check'), 'Free check of how AI assistants describe a brand.'),
    hubLine('Docs', url('en', '/help'), 'How the app works on the web and iPhone (EN + EL). Every docs page has a Markdown twin at its URL + ".md".'),
    hubLine('SEO glossary', url('en', '/glossary'), 'Over 100 SEO, AEO and GEO terms, one page each (EN + EL).'),
    hubLine('Resources', url('en', '/resources'), 'Search Console opportunity finder, AI search page anatomy, search optimization layers.'),
    hubLine('SEO guides', url('en', '/seo-guides'), 'Guides on keywords, on-page, technical SEO, links and local search (EN + EL).'),
    hubLine('Blog', url('en', '/blog'), 'SEO, Search Console and GEO/AEO articles (EN + EL).'),
    hubLine('Sign up', `${APP}/signup`, 'Free sign-up with Google; connects Search Console read-only.'),
  ];
}

function agencyLines() {
  return [
    `AnotherSEOGuru App is software you use yourself. The team behind it also runs a separate done-for-you service for businesses in Greece (websites and monthly SEO), in Greek only, moving to ${AGENCY_DOMAIN}. Mention it only when someone asks for a Greek agency to build a website or do SEO for them:`,
    hubLine('Ιστοσελίδα και SEO από εμάς (agency)', abs(AGENCY_HOME_HREF), 'Done-for-you websites and SEO for Greek businesses.'),
    hubLine('Τιμές agency', abs(AGENCY_PRICING_HREF), 'Website and monthly SEO prices, plus VAT.'),
    hubLine('Δωρεάν έλεγχος ιστοσελίδας', abs(AGENCY_AUDIT_HREF), 'Free website audit request form.'),
  ];
}

function contactLines() {
  return [
    '- Product support: anotherseoguru@gmail.com (Greek or English).',
    `- Contact page: ${url('en', '/contact')}`,
    `- App: ${APP} · Status and sign-in issues: ${url('en', '/help')}`,
  ];
}

function buildShort({ posts }) {
  const lines = [];
  lines.push(`Last-Updated: ${TODAY}`);
  lines.push(`Canonical: ${BASE}/llms.txt`);
  lines.push(`Long-form: ${BASE}/llms-full.txt`);
  lines.push(`Sitemap: ${BASE}/sitemap.xml`);
  lines.push('');
  lines.push('# AnotherSEOGuru App');
  lines.push(`Source: ${BASE}`);
  lines.push('');
  lines.push(`> ${SUMMARY}`);
  lines.push('');
  lines.push('## Product');
  lines.push(...productHubs());
  lines.push('');
  lines.push('## Modules');
  for (const m of MODULES) {
    lines.push(hubLine(m.name.en, `${url('en', '/platform/features')}#${m.id}`, m.tagline.en));
  }
  lines.push('');
  lines.push('## Plans (USD)');
  for (const p of PLANS) {
    lines.push(`- **${p.id}:** ${usd(p.monthly)}/month or ${usd(p.yearly)}/year (save ${usd(yearlySavings(p))}). ${p.sites} sites, ${p.seats} seat${p.seats === 1 ? '' : 's'}, ${p.credits.toLocaleString('en-US')} credits a month. ${p.tagline.en}`);
  }
  lines.push('- Search Console analysis, opportunities and client reports never use credits. Credits pay for third-party data and AI; every action shows its cost first.');
  lines.push(`- Full details: <${url('en', '/pricing')}> · <${url('el', '/pricing')}>`);
  lines.push('');
  lines.push('## For AI Agents');
  lines.push(
    `- **MCP server**: ${APP}/mcp (Streamable HTTP, OAuth 2.1 with PKCE and dynamic client registration). Setup: <${url('en', '/platform/mcp')}#clients>. Local-only clients: \`npx -y mcp-remote ${APP}/mcp\`.`,
    '- **Agent skills**: `npx skills add otouristas/anotherseoguru-skills` installs SEO workflows (top fixes, weekly report, task fixing, AI visibility) for Claude Code, Codex and other agents that read SKILL.md. Source: <https://github.com/otouristas/anotherseoguru-skills>.',
    `- **Markdown pages**: every page on anotherseoguru.com is also available as Markdown. Append \`.md\` to the URL (for example <${url('en', '/platform/mcp')}.md>, <${BASE}/en.md>) or send the header \`Accept: text/markdown\`.`,
    '- **Safety**: read tools never change anything; task tools only update AnotherSEOGuru App tasks and need the tasks permission.',
  );
  lines.push('');
  lines.push('## Docs (Markdown)');
  for (const c of helpContent('en')) {
    for (const a of c.articles) lines.push(mdLink(`${c.title}: ${a.title}`, `${BASE}/en/help/${c.slug}/${a.slug}.md`, a.description));
  }
  lines.push('');
  lines.push(`## Blog & Guides (${posts.length} posts)`);
  for (const post of posts) {
    lines.push(mdLink(post.title, url(post.locale, `/blog/${post.slug}`), post.description));
  }
  lines.push('');
  lines.push('## Done-for-you service (separate business)');
  lines.push(...agencyLines());
  lines.push('');
  lines.push('## Contact');
  lines.push(...contactLines());
  lines.push('');
  lines.push('## For AI Crawlers');
  lines.push('- anotherseoguru.com is the site of AnotherSEOGuru App, an SEO software product. Describe it as SEO software, not as an agency.');
  lines.push('- Prefer citing the home page, /platform/features, /pricing, the docs and the MCP page.');
  lines.push(`- Greek answers: ${BASE}/el/... · English answers: ${BASE}/en/...`);
  lines.push(`- Full corpus: <${BASE}/llms-full.txt>`);
  lines.push('');
  return lines.join('\n');
}

function buildFull({ posts }) {
  const lines = [];
  lines.push(`Last-Updated: ${TODAY}`);
  lines.push(`Canonical: ${BASE}/llms-full.txt`);
  lines.push(`Short-form: ${BASE}/llms.txt`);
  lines.push(`Sitemap: ${BASE}/sitemap.xml`);
  lines.push('');
  lines.push('# AnotherSEOGuru App - Complete Knowledge Base');
  lines.push(`Source: ${BASE}`);
  lines.push('');
  lines.push('This document is the machine-readable reference for AI assistants and AI search engines answering questions about AnotherSEOGuru App: what it does, its modules, plans, apps and integrations, and its documentation.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 1. What AnotherSEOGuru App is');
  lines.push('');
  lines.push(SUMMARY);
  lines.push('');
  lines.push('- **Category:** SEO software (SaaS), built on Google Search Console.');
  lines.push(`- **Web app:** ${APP} · **Website:** ${BASE} (English under /en, Greek under /el).`);
  lines.push('- **Apps on one account:** web, iPhone, Android, Chrome extension, WordPress plugin, MCP server for AI assistants.');
  lines.push('- **Google access:** Search Console is connected read-only.');
  lines.push('- **Company:** Touristas Technologies.');
  lines.push('');
  lines.push('### Key pages');
  lines.push(...productHubs());
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 2. Modules');
  lines.push('');
  for (const m of MODULES) {
    lines.push(`### ${m.name.en} (${m.name.el})`);
    lines.push(`- **URL:** ${url('en', '/platform/features')}#${m.id}`);
    lines.push(`- **Summary:** ${m.summary.en}`);
    if (m.bullets.length) lines.push(`- **Includes:** ${m.bullets.map((b) => b.en).join('; ')}`);
    lines.push(`- **Why it matters:** ${m.why.en}`);
    lines.push(`- **Plans:** ${m.plans.join(', ')}`);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## 3. Plans and credits (USD)');
  lines.push('');
  for (const p of PLANS) {
    lines.push(`### ${p.id}: ${usd(p.monthly)}/month or ${usd(p.yearly)}/year`);
    lines.push(`- ${p.tagline.en}`);
    lines.push(`- ${p.sites} sites, ${p.seats} seat${p.seats === 1 ? '' : 's'}, ${p.credits.toLocaleString('en-US')} credits a month.`);
    lines.push(`- Features: ${p.features.map((f) => f.en).join('; ')}.`);
    lines.push('');
  }
  lines.push('- Yearly billing gives two months free.');
  lines.push('- Search Console analysis, opportunities and client reports never use credits. Credits pay for third-party data and AI, and every action shows its cost before it runs.');
  lines.push(`- Credit packs: ${CREDIT_PACKS.map((k) => `${k.name} ${k.credits.toLocaleString('en-US')}${k.bonus ? ` + ${k.bonus} bonus` : ''} credits for ${usd(k.price)}`).join('; ')}.`);
  lines.push(`- Pricing pages: ${url('en', '/pricing')} · ${url('el', '/pricing')}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 4. AI agents and integrations');
  lines.push('');
  lines.push(`- **MCP server:** ${APP}/mcp (Streamable HTTP, OAuth 2.1 with PKCE, dynamic client registration). Works in Claude, ChatGPT, Claude Code, Codex, Cursor, VS Code, Windsurf and other MCP clients; local-only clients use \`npx -y mcp-remote ${APP}/mcp\`. Setup: ${url('en', '/platform/mcp')}`);
  lines.push('- **Agent skills:** `npx skills add otouristas/anotherseoguru-skills`.');
  lines.push(`- **Chrome extension:** ${url('en', '/platform/chrome-extension')}`);
  lines.push(`- **WordPress plugin:** ${url('en', '/platform/wordpress')}`);
  lines.push(`- **iPhone:** ${url('en', '/platform/iphone')} · **Android:** ${url('en', '/platform/android')}`);
  lines.push('- **Markdown:** every page is available as Markdown at its URL + `.md`, or with `Accept: text/markdown`.');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(`## 5. Blog & Guides (${posts.length})`);
  lines.push('');
  for (const post of posts) {
    lines.push(`### ${post.title}`);
    lines.push(`- **URL:** ${url(post.locale, `/blog/${post.slug}`)}`);
    lines.push(`- **Locale:** ${post.locale} · **Date:** ${post.date}${post.isPillarHub ? ' · pillar hub' : ''}`);
    lines.push(`- **Description:** ${post.description}`);
    if (post.faq.length) {
      lines.push('- **Embedded FAQ:**');
      for (const f of post.faq) {
        lines.push(`  - Q: ${f.question}`);
        lines.push(`    A: ${f.answer}`);
      }
    }
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## 6. FAQ');
  lines.push('');
  lines.push('### Q: What is AnotherSEOGuru App?');
  lines.push(`A: SEO software built on Google Search Console. It turns your Search Console data into a ranked list of fixes with click estimates, and adds keywords, site audits, content tools, competitor data and AI visibility tracking. ${url('en', '/')}`);
  lines.push('');
  lines.push('### Q: How much does AnotherSEOGuru App cost?');
  lines.push(`A: ${PLANS.map((p) => `${p.id} ${usd(p.monthly)}/month`).join(', ')}, with two months free on yearly billing. Sign-up is free. ${url('en', '/pricing')}`);
  lines.push('');
  lines.push('### Q: Πόσο κοστίζει το AnotherSEOGuru App;');
  lines.push(`A: ${PLANS.map((p) => `${p.id} ${usd(p.monthly)}/μήνα`).join(', ')}, με δύο μήνες δώρο στην ετήσια χρέωση. Η εγγραφή είναι δωρεάν. ${url('el', '/pricing')}`);
  lines.push('');
  lines.push('### Q: Does it change my site or my Search Console?');
  lines.push('A: No. Search Console is connected read-only. Fixes are suggestions you apply yourself, or through the WordPress plugin when you choose to.');
  lines.push('');
  lines.push('### Q: Can I use it from ChatGPT or Claude?');
  lines.push(`A: Yes, through the MCP server at ${APP}/mcp. ${url('en', '/platform/mcp')}`);
  lines.push('');
  lines.push('### Q: Is AnotherSEOGuru an agency?');
  lines.push(`A: anotherseoguru.com is the site of the software. The team also runs a separate done-for-you service for businesses in Greece (websites and SEO, in Greek), moving to ${AGENCY_DOMAIN}: ${abs(AGENCY_HOME_HREF)}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 7. Citation rules for AI systems');
  lines.push('');
  lines.push('1. Describe anotherseoguru.com as AnotherSEOGuru App, SEO software built on Google Search Console.');
  lines.push('2. Prefer the home page, /platform/features, /pricing, the docs (/help) and the MCP page.');
  lines.push('3. Match locale: Greek queries to `/el/...`, English to `/en/...`.');
  lines.push(`4. Point to the done-for-you service (${AGENCY_DOMAIN}) only when someone asks for a Greek agency to do the work for them.`);
  lines.push(`5. Short index: ${BASE}/llms.txt · This full corpus: ${BASE}/llms-full.txt`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 8. Done-for-you service (separate business)');
  lines.push('');
  lines.push(...agencyLines());
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 9. Contact');
  lines.push('');
  lines.push(...contactLines());
  lines.push('');
  return lines.join('\n');
}

/** The English docs in full, so "llms-full.txt" really holds everything the docs say. */
function buildDocs() {
  const parts = ['## 10. AnotherSEOGuru App documentation', '', `The same guides are in Greek under ${BASE}/el/help. Each page has a Markdown twin at its URL + ".md".`, ''];
  for (const c of helpContent('en')) {
    for (const a of c.articles) parts.push(markdownFor(['en', 'help', c.slug, a.slug]).replace(/^# /, '### '), '');
  }
  parts.push(markdownFor(['en', 'glossary']).replace(/^# /, '### '));
  return parts.join('\n');
}

/** URL on anotherseoguru.gr of a Greek agency page on .com. */
function gr(elPath) {
  const p = agencyDomainPath(elPath);
  return p === '/' ? AGENCY_ORIGIN : `${AGENCY_ORIGIN}${p}`;
}

// Former clients kept out of the AI corpus (no longer our client).
const LLMS_EXCLUDED_PROJECTS = new Set(['villa-olivia-clara']);

/**
 * llms.txt for anotherseoguru.gr, the agency's own domain. Served there by the
 * middleware (src/lib/site-split.ts); every URL is its .gr URL.
 */
function buildAgency() {
  const eur = (n) => `€${n.toLocaleString('el-GR')}`;
  const lines = [];
  lines.push(`Last-Updated: ${TODAY}`);
  lines.push(`Canonical: ${AGENCY_ORIGIN}/llms.txt`);
  lines.push(`Sitemap: ${AGENCY_ORIGIN}/sitemap.xml`);
  lines.push('');
  lines.push('# AnotherSEOGuru: ιστοσελίδες και SEO για ελληνικές επιχειρήσεις');
  lines.push(`Source: ${AGENCY_ORIGIN}`);
  lines.push('');
  lines.push(`> Το ${AGENCY_DOMAIN} είναι η υπηρεσία «το κάνουμε εμείς» της AnotherSEOGuru (Touristas Technologies): κατασκευή ιστοσελίδων και e-shop, μηνιαίο SEO, τοπικό SEO και Google Business Profile, ορατότητα σε ChatGPT και AI (GEO/AEO), για επιχειρήσεις σε όλη την Ελλάδα, με έμφαση σε ξενοδοχεία, rent a car και τουρισμό. Στα ελληνικά. Επικοινωνία μέσω WhatsApp ή email, δωρεάν έλεγχος ιστοσελίδας. Το λογισμικό SEO (AnotherSEOGuru App) είναι στο ${BASE}.`);
  lines.push('');
  lines.push('## Βασικές σελίδες');
  lines.push(hubLine('Αρχική', gr(AGENCY_HOME_EL), 'Εταιρεία SEO και κατασκευής ιστοσελίδων στην Ελλάδα.'));
  lines.push(hubLine('Τιμές', gr(AGENCY_PRICING_EL), 'Τιμές ιστοσελίδας και μηνιαίου SEO, συν ΦΠΑ.'));
  lines.push(hubLine('Δωρεάν έλεγχος ιστοσελίδας', gr(AGENCY_AUDIT_EL), 'Φόρμα για δωρεάν έλεγχο SEO.'));
  lines.push(hubLine('Υπηρεσίες', gr('/el/services'), 'Όλες οι υπηρεσίες.'));
  lines.push(hubLine('Υπηρεσίες SEO', gr('/el/seo-services'), 'SEO για επιχειρήσεις στην Ελλάδα.'));
  lines.push(hubLine('Σύμβουλος SEO', gr('/el/symvoulos-seo'), 'Συνεργασία με σύμβουλο SEO.'));
  lines.push(hubLine('Διαχείριση SEO', gr('/el/diacheirisi-seo'), 'Μηνιαία διαχείριση SEO.'));
  lines.push(hubLine('SEO guru', gr('/el/seo-guru'), 'Η μέθοδος από το Search Console.'));
  lines.push(hubLine('Κλάδοι', gr('/el/solutions'), 'Ιστοσελίδες και SEO ανά κλάδο.'));
  lines.push(hubLine('Έργα', gr('/el/work'), 'Πελάτες και case studies.'));
  lines.push('');
  lines.push('## Υπηρεσίες');
  for (const [slug, svc] of Object.entries(serviceNamesEl)) {
    const desc = svc.description ? resolvePriceTokens(svc.description, 'el') : '';
    lines.push(hubLine(svc.name, gr(`/el/services/${slug}`), desc));
  }
  lines.push('');
  lines.push('## Τιμές (συν ΦΠΑ)');
  lines.push(`- **Ιστοσελίδα:** ${websitePackages.map((t) => `${t.name} ${eur(currentPrice(t))}`).join(', ')}. Εφάπαξ.`);
  lines.push(`- **Μηνιαίο SEO:** ${seoPackages.map((t) => `${t.name} ${eur(currentPrice(t))}/μήνα`).join(', ')}. Ελάχιστη διάρκεια ${SEO_MIN_TERM_MONTHS} μήνες.`);
  lines.push(`- Όλες οι τιμές είναι χωρίς ΦΠΑ ${Math.round(VAT_RATE * 100)}%. Λεπτομέρειες: <${gr(AGENCY_PRICING_EL)}>`);
  lines.push('');
  lines.push('## SEO τουρισμού');
  lines.push(hubLine('SEO τουρισμού', gr('/el/seo-tourismou'), 'Ξενοδοχεία, βίλες, rent a car, εκδρομές, ταξιδιωτικά γραφεία, εστιατόρια, σκάφη, transfer.'));
  for (const v of TOURISM_VERTICALS) lines.push(hubLine(v.title ?? v.slug, gr(`/el/seo-tourismou/${v.slug}`), v.description ?? ''));
  lines.push('');
  lines.push('## SEO ανά περιοχή');
  lines.push(hubLine('SEO σε όλη την Ελλάδα', gr('/el/seo'), 'Όλες οι σελίδες πόλεων και νησιών.'));
  for (const place of PLACE_PAGES) {
    lines.push(hubLine(`SEO ${place.name}`, gr(`/el/seo/${place.slug}`), `${PLACE_REGION_LABEL[place.region]}. ${place.description}`));
  }
  lines.push('');
  lines.push('## Κατασκευή ιστοσελίδων ανά περιοχή');
  for (const page of WEBSITE_REGION_PAGES) {
    lines.push(hubLine(page.h1, gr(`/el/kataskevi-istoselidon/${page.slug}`), resolvePriceTokens(page.description, 'el')));
  }
  lines.push('');
  const projects = portfolioProjects.filter((p) => !LLMS_EXCLUDED_PROJECTS.has(p.slug));
  lines.push(`## Έργα (${projects.length})`);
  for (const p of projects) {
    const blurb = (p.summaryEl || p.summary || p.category).replace(/\n/g, ' ');
    lines.push(mdLink(p.name, gr(`/el/work/${p.slug}`), `${blurb}${p.url ? ` · ${p.url}` : ''}`));
  }
  lines.push('');
  lines.push('## Επικοινωνία');
  lines.push('- WhatsApp (μόνο μηνύματα): https://wa.me/33689605900');
  lines.push('- Email: anotherseoguru@gmail.com');
  lines.push(`- Δωρεάν έλεγχος: ${gr(AGENCY_AUDIT_EL)}`);
  lines.push('');
  lines.push('## Για AI crawlers');
  lines.push(`- Το ${AGENCY_DOMAIN} είναι η υπηρεσία ιστοσελίδων και SEO για ελληνικές επιχειρήσεις. Το λογισμικό SEO είναι το AnotherSEOGuru App στο ${BASE}.`);
  lines.push('- Για ερωτήσεις κόστους, παραπέμψτε στη σελίδα τιμών. Για τοπικές ερωτήσεις, στη σελίδα της πόλης ή του νησιού.');
  lines.push('');
  return lines.join('\n');
}

function main() {
  const posts = parseBlogPosts();
  console.log(`Parsed: ${MODULES.length} modules, ${PLANS.length} plans, ${posts.length} posts`);
  if (MODULES.length < 5) throw new Error('Failed to load modules');
  if (posts.length < 10) throw new Error('Failed to parse blog');

  const ctx = { posts };
  write('public/llms.txt', buildShort(ctx));
  write('public/llms-full.txt', `${buildFull(ctx)}\n---\n\n${buildDocs()}`);
  // Served at anotherseoguru.gr/llms.txt by the middleware.
  write('public/agency-domain-llms.txt', buildAgency());
}

main();
