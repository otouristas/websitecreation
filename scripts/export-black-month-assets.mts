import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { currentDisplayPrice, currentPriceIncludesVat, formatPrice, seoPackages, websitePackages, withVat } from '../src/data/pricing';

/** Render campaign text with the real Inter font, original logo and shared price policy. */
const root = process.cwd();
const out = path.join(root, 'public/campaigns/black-month-2026');
if (!currentPriceIncludesVat(websitePackages[0])) throw new Error('The Black Month VAT-gift campaign is not active.');
const [font, logo, artwork] = await Promise.all([
  fs.readFile(path.join(root, 'public/brand/fonts/Inter-700.ttf')),
  fs.readFile(path.join(root, 'public/brand/asg-lockup-on-dark.svg')),
  fs.readFile(path.join(out, 'background.webp')),
]);
const web = formatPrice(currentDisplayPrice(websitePackages[0]), 'el');
const seo = formatPrice(currentDisplayPrice(seoPackages[0]), 'el');
const webWas = formatPrice(websitePackages[0].regular, 'el');
const webWasGross = formatPrice(withVat(websitePackages[0].regular), 'el');
const seoWas = formatPrice(seoPackages[0].regular, 'el');
const seoWasGross = formatPrice(withVat(seoPackages[0].regular), 'el');
const document = (format: 'landscape' | 'portrait') => `<!doctype html><html lang="el"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Black Month 2026 · AnotherSEOGuru</title><style>
@font-face{font-family:Inter;src:url(data:font/ttf;base64,${font.toString('base64')});font-weight:700;font-display:block}*{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#050d1a;color:#f5f7fb;font-weight:700}.creative{position:relative;isolation:isolate;overflow:hidden;width:1200px;height:630px;padding:38px 48px}.art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3}.shade{position:absolute;inset:0;z-index:-2;background:linear-gradient(90deg,#050d1a,#050d1ae6 50%,#050d1a22)}header{display:flex;align-items:center;justify-content:space-between;gap:40px}header img{width:225px;height:auto}header span{font-size:12px;letter-spacing:.12em;color:#bac6d8}.label{margin-top:35px;color:#2fc6f4;font-size:13px;letter-spacing:.15em}.headline{font-size:72px;letter-spacing:-.065em;line-height:.92;margin:15px 0 0}.headline span{color:#2fc6f4}.tagline{font-size:32px;line-height:1.15;letter-spacing:-.04em;margin:18px 0 0}.offers{display:grid;grid-template-columns:1fr 1fr;gap:16px;width:820px;margin-top:26px}.offer{padding:18px 22px;border:1px solid #667995;border-radius:16px;background:#050d1ae8}.offer h2{font-size:15px;margin:0 0 7px;color:#bac6d8}.price{font-size:59px;letter-spacing:-.05em;line-height:1.1}.price small{font-size:16px;letter-spacing:0}.tax{font-size:12px;color:#bac6d8;margin-top:3px}.duration{font-size:10px;color:#78e6a3;margin-top:7px}.terms{position:absolute;left:48px;bottom:24px;font-size:11px;line-height:1.7;color:#bac6d8}.url{color:#f5f7fb;letter-spacing:.025em}.portrait{width:1080px;height:1350px;padding:55px 60px}.portrait header img{width:310px}.portrait header span{font-size:15px}.portrait .art{object-position:65% center}.portrait .shade{background:linear-gradient(120deg,#050d1af5 0%,#050d1a99 70%,#050d1a55)}.portrait .label{margin-top:94px;font-size:17px}.portrait .headline{font-size:151px;line-height:.89;margin-top:28px;max-width:800px}.portrait .headline span{display:block}.portrait .tagline{font-size:48px;line-height:1.18;margin-top:34px;max-width:730px}.portrait .offers{width:960px;gap:22px;margin-top:58px}.portrait .offer{padding:30px 28px}.portrait .offer h2{font-size:21px;margin-bottom:20px}.portrait .price{font-size:86px}.portrait .price small{font-size:23px}.portrait .tax{font-size:19px;line-height:1.6;margin-top:10px}.portrait .duration{font-size:15px;line-height:1.7;margin-top:14px}.portrait .terms{left:60px;bottom:52px;font-size:16px;max-width:900px;line-height:1.9}.portrait .url{font-size:22px}
.landscape .offers{margin-top:18px}.landscape .offer{padding:16px 22px}.was{font-size:13px;line-height:1.5;color:#bac6d8;margin:8px 0}.was span{display:block}.now{display:block;font-size:11px;line-height:1.4;letter-spacing:.03em;color:#bac6d8;margin-bottom:3px}.portrait .was{font-size:18px;line-height:1.5;margin:12px 0}.portrait .now{font-size:16px;line-height:1.4;margin-bottom:5px}.portrait .label{margin-top:80px}.portrait .offers{margin-top:40px}.portrait .offer{padding:26px 28px}.portrait .offer h2{margin-bottom:12px}.portrait .duration{font-size:14px;margin-top:12px}</style><main class="creative ${format}"><img class="art" src="data:image/webp;base64,${artwork.toString('base64')}" alt=""><div class="shade"></div><header><img src="data:image/svg+xml;base64,${logo.toString('base64')}" alt="AnotherSEOGuru"><span>ΝΟΕΜΒΡΙΟΣ 2026</span></header><div class="label">ΙΣΤΟΣΕΛΙΔΕΣ / SEO / E-SHOP</div><h1 class="headline">BLACK <span>MONTH.</span></h1><p class="tagline">Ίδια τιμή.<br>Δώρο και ο ΦΠΑ.</p><div class="offers"><section class="offer"><h2>Website Starter</h2><p class="was">ΠΡΙΝ <del>€${webWas}</del> + ΦΠΑ 24%<span>(€${webWasGross} με ΦΠΑ)</span></p><div class="price"><span class="now">ΤΩΡΑ</span>€${web}</div><div class="tax">τελική τιμή με ΦΠΑ 24%</div><div class="duration">ΝΕΑ ΙΣΤΟΣΕΛΙΔΑ ΓΙΑ ΤΗΝ ΕΠΙΧΕΙΡΗΣΗ ΣΑΣ</div></section><section class="offer"><h2>SEO Foundations</h2><p class="was">ΠΡΙΝ <del>€${seoWas}/μήνα</del> + ΦΠΑ 24%<span>(€${seoWasGross}/μήνα με ΦΠΑ)</span></p><div class="price"><span class="now">ΤΩΡΑ</span>€${seo}<small>/μήνα</small></div><div class="tax">τελική τιμή με ΦΠΑ 24%</div><div class="duration">ΣΕ ΟΛΗ ΤΗΝ ΕΞΑΜΗΝΗ ΣΥΝΕΡΓΑΣΙΑ</div></section></div><footer class="terms">Για νέα έργα που θα επιβεβαιωθούν έως 30/11/2026. SEO: ελάχιστη διάρκεια 6 μήνες.<br>Παροχές και όροι: <span class="url">anotherseoguru.com/el/ypiresies/times</span></footer></main></html>`;
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [format, name, width, height] of [['landscape', 'facebook', 1200, 630], ['portrait', 'instagram', 1080, 1350]] as const) {
    const html = document(format);
    await fs.writeFile(path.join(out, `${name}.html`), html);
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(html);
    await page.evaluate(() => window.document.fonts.ready);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    await page.close();
    process.stdout.write(`${name}.png ${width}×${height}: was €${webWas} / €${seoWas} net, now €${web} / €${seo} VAT included\n`);
  }
  await sharp(path.join(out, 'facebook.png')).webp({ quality: 92 }).toFile(path.join(out, 'article-visual.webp'));
  process.stdout.write('article-visual.webp regenerated from the same source-priced Facebook creative\n');
} finally { await browser.close(); }
