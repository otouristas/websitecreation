#!/usr/bin/env node
/**
 * Portfolio audit — fetches metadata and screenshots for all projects in portfolio.ts.
 * Usage:
 *   node scripts/portfolio-audit.mjs              # audit only
 *   node scripts/portfolio-audit.mjs --screenshot # audit + screenshots
 *   node scripts/portfolio-audit.mjs --screenshot-only
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORTFOLIO_SRC = path.join(ROOT, 'src/data/portfolio.ts');
const OUTPUT_DIR = path.join(ROOT, 'content/portfolio');
const SCREENSHOT_DIR = path.join(ROOT, 'public/portfolio');

function loadProjectsFromPortfolio() {
  const src = fs.readFileSync(PORTFOLIO_SRC, 'utf8');
  const projects = [];
  const re =
    /\{\s*\n\s*slug:\s*'([^']+)',\s*\n[\s\S]*?\n\s*url:\s*'(https?:\/\/[^']+)',\s*\n[\s\S]*?\n\s*screenshot:\s*'(\/portfolio\/[^']+)',/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    projects.push({ slug: m[1], url: m[2], screenshot: m[3] });
  }
  return projects;
}

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? '';
  const desc =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1] ??
    '';
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ?? '';
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? '';
  return { title, description: desc, h1, lang };
}

async function auditUrl(project) {
  const result = { slug: project.slug, url: project.url, ok: false, meta: {}, error: null };
  try {
    const res = await fetch(project.url, {
      headers: { 'User-Agent': 'AnotherSEOGuru-Portfolio-Audit/1.0' },
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    result.status = res.status;
    result.ok = res.ok;
    if (res.ok) {
      const html = await res.text();
      result.meta = extractMeta(html);
    }
  } catch (e) {
    result.error = e.message;
  }
  return result;
}

async function screenshotUrl(project) {
  const outPath = path.join(ROOT, 'public', project.screenshot.replace(/^\//, ''));
  if (fs.existsSync(outPath)) {
    return true;
  }

  const urls = [project.url];
  try {
    const parsed = new URL(project.url);
    if (!parsed.hostname.startsWith('www.')) {
      urls.push(`${parsed.protocol}//www.${parsed.hostname}${parsed.pathname}`);
    }
    if (parsed.protocol === 'https:') {
      urls.push(project.url.replace('https://', 'http://'));
    }
  } catch {
    /* keep original url */
  }

  for (const url of urls) {
    const ok = await tryScreenshot(project, outPath, url);
    if (ok) return true;
  }

  await generatePlaceholder(project, outPath);
  console.warn(`Used placeholder for ${project.slug}`);
  return true;
}

async function tryScreenshot(project, outPath, url) {
  const tmpPng = `${outPath}.tmp.png`;
  try {
    const { chromium } = await import('playwright');
    const sharp = (await import('sharp')).default;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: tmpPng, type: 'png', fullPage: false });
    await browser.close();
    await sharp(tmpPng).webp({ quality: 85 }).toFile(outPath);
    fs.unlinkSync(tmpPng);
    return true;
  } catch (e) {
    if (fs.existsSync(tmpPng)) fs.unlinkSync(tmpPng);
    console.warn(`Screenshot failed for ${project.slug} (${url}):`, e.message.split('\n')[0]);
    return false;
  }
}

async function generatePlaceholder(project, outPath) {
  const sharp = (await import('sharp')).default;
  const name = project.slug.replace(/-/g, ' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e3a5f"/>
        <stop offset="100%" style="stop-color:#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="1280" height="800" fill="url(#g)"/>
    <text x="640" y="360" font-family="system-ui,sans-serif" font-size="42" fill="#93c5fd" text-anchor="middle">${name}</text>
    <text x="640" y="420" font-family="system-ui,sans-serif" font-size="22" fill="#94a3b8" text-anchor="middle">anotherseoguru.com portfolio</text>
  </svg>`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(outPath);
}

async function main() {
  const withScreenshot = process.argv.includes('--screenshot');
  const screenshotOnly = process.argv.includes('--screenshot-only');
  const projects = loadProjectsFromPortfolio();

  if (projects.length === 0) {
    console.error('No projects parsed from portfolio.ts');
    process.exit(1);
  }

  console.log(`Found ${projects.length} portfolio projects`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let shotOk = 0;
  let shotFail = 0;

  for (const project of projects) {
    if (!screenshotOnly) {
      console.log(`Auditing ${project.slug}...`);
      const audit = await auditUrl(project);
      fs.writeFileSync(path.join(OUTPUT_DIR, `${project.slug}.json`), JSON.stringify(audit, null, 2));
    }

    if (withScreenshot || screenshotOnly) {
      console.log(`Screenshot ${project.slug} → ${project.screenshot}`);
      const ok = await screenshotUrl(project);
      if (ok) shotOk++;
      else shotFail++;
    }
  }

  if (withScreenshot || screenshotOnly) {
    console.log(`Screenshots: ${shotOk} ok, ${shotFail} failed → ${SCREENSHOT_DIR}`);
  }
  console.log(`Done. ${screenshotOnly ? '' : `JSON audits in ${OUTPUT_DIR}`}`);
}

main();
