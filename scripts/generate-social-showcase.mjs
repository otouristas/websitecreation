import React from 'react'
import { ImageResponse } from 'next/og.js'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.cwd())
const captureDir = path.join(root, 'public', 'social-showcase')
const outputDir = path.join(captureDir, 'posts')
const fontRegularPath = '/System/Library/Fonts/Supplemental/Arial.ttf'
const fontBoldPath = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'

await mkdir(outputDir, { recursive: true })

const [fontRegularData, fontBoldData, logoData] = await Promise.all([
  readFile(fontRegularPath),
  readFile(fontBoldPath),
  readFile(path.join(root, 'public', 'logo.png')),
])

const toDataUrl = (bytes, mime = 'image/png') => `data:${mime};base64,${bytes.toString('base64')}`
const logoSrc = toDataUrl(logoData)
const h = React.createElement

const projects = [
  {
    slug: 'discover-cyclades',
    name: 'Discover Cyclades',
    url: 'discovercyclades.gr',
    screenshot: 'discover-cyclades-mobile.png',
    label: 'TRAVEL AI PLATFORM',
    headline: 'AI travel planning for 24 Cycladic islands.',
    chips: ['Travel AI', 'Mobile UX', 'SEO architecture'],
    accent: '#2ee9d1',
  },
  {
    slug: 'naxos-car-rentals',
    name: 'Naxos Car Rentals',
    url: 'naxos-carrentals.com',
    screenshot: 'naxos-car-rentals-mobile.png',
    label: 'CAR RENTAL WEBSITE',
    headline: 'From island arrival to booking in a few taps.',
    chips: ['Booking UX', 'Local SEO', 'Fleet design'],
    accent: '#11bce7',
  },
  {
    slug: 'rent-a-car-piraeus',
    name: 'Rent a Car Piraeus',
    url: 'rentacarpiraeus.gr',
    screenshot: 'rent-a-car-piraeus-mobile.png',
    label: 'LOCAL LEAD GENERATION',
    headline: 'Port-ready car rental, built for mobile.',
    chips: ['Lead generation', 'Local SEO', 'Conversion UX'],
    accent: '#198cff',
  },
  {
    slug: 'hotels-santorini',
    name: 'Hotels Santorini',
    url: 'hotelssantorini.gr',
    screenshot: 'hotels-santorini-mobile.png',
    label: 'HOTEL DISCOVERY PLATFORM',
    headline: '400+ stays. One smarter way to discover Santorini.',
    chips: ['Travel platform', 'AI discovery', 'Technical SEO'],
    accent: '#ffb319',
  },
  {
    slug: 'onoma-hotel',
    name: 'ONOMA Hotel',
    url: 'onomahotel.com',
    screenshot: 'onoma-hotel-mobile.png',
    label: 'BOUTIQUE HOTEL EXPERIENCE',
    headline: 'A hotel journey that begins with your name.',
    chips: ['Brand story', 'Direct booking', 'Luxury UX'],
    accent: '#f2f2f2',
  },
  {
    slug: 'villa-olivia-clara',
    name: 'Villa Olivia Clara',
    url: 'villaoliviaclara.com',
    screenshot: 'villa-olivia-clara-mobile.png',
    label: 'LUXURY VILLA WEBSITE',
    headline: 'Photo-led hospitality design built to convert.',
    chips: ['Hospitality', 'Direct booking', 'SEO'],
    accent: '#a9c38d',
  },
  {
    slug: 'mykonos-luxury',
    name: 'Mykonos Luxury',
    url: 'mykonos.luxury',
    screenshot: 'mykonos-luxury-mobile.png',
    label: 'LUXURY TRAVEL & CONCIERGE',
    headline: 'High-end journeys, delivered with editorial precision.',
    chips: ['Luxury travel', 'Concierge UX', 'SEO'],
    accent: '#d6c89b',
  },
]

const baseFonts = [
  { name: 'Geist', data: fontRegularData, weight: 400, style: 'normal' },
  { name: 'Geist', data: fontBoldData, weight: 700, style: 'normal' },
]

function brandLockup() {
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: 16 } },
    h('div', { style: { display: 'flex', width: 52, height: 52, borderRadius: 15, background: '#07111f', border: '1px solid #1a65ff', alignItems: 'center', justifyContent: 'center' } },
      h('img', { src: logoSrc, width: 44, height: 44, style: { objectFit: 'contain' } })
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column' } },
      h('div', { style: { fontSize: 24, fontWeight: 700, color: '#ffffff', letterSpacing: -0.5 } }, 'Another SEO Guru'),
      h('div', { style: { fontSize: 13, color: '#77a7ff', letterSpacing: 2.2 } }, 'WEBSITES · SEO · GEO')
    )
  )
}

function chip(text, accent) {
  return h('div', {
    key: text,
    style: {
      display: 'flex',
      padding: '10px 16px',
      borderRadius: 999,
      border: `1px solid ${accent}55`,
      background: '#0c1b30',
      color: '#d9e8ff',
      fontSize: 17,
    },
  }, text)
}

async function renderProject(project) {
  const screenshotData = await readFile(path.join(captureDir, project.screenshot))
  const screenshotSrc = toDataUrl(screenshotData, 'image/jpeg')
  const element = h('div', {
    style: {
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Geist',
      color: '#ffffff',
      backgroundImage: 'radial-gradient(circle at 20% 8%, #163c86 0%, #071525 33%, #030915 75%)',
      padding: 58,
      flexDirection: 'column',
    },
  },
    h('div', { style: { display: 'flex', position: 'absolute', right: -130, top: -130, width: 430, height: 430, borderRadius: 999, border: `1px solid ${project.accent}35` } }),
    h('div', { style: { display: 'flex', position: 'absolute', left: -220, bottom: -220, width: 600, height: 600, borderRadius: 999, background: `${project.accent}12` } }),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 } },
      brandLockup(),
      h('div', { style: { display: 'flex', color: project.accent, fontSize: 14, fontWeight: 700, letterSpacing: 2.2 } }, 'PROJECT SHOWCASE')
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: 52, zIndex: 2 } },
      h('div', { style: { color: project.accent, fontSize: 16, fontWeight: 700, letterSpacing: 2.4 } }, project.label),
      h('div', { style: { fontSize: 56, lineHeight: 1.03, fontWeight: 700, letterSpacing: -2.4, marginTop: 15, maxWidth: 870 } }, project.headline),
      h('div', { style: { display: 'flex', gap: 10, marginTop: 25, flexWrap: 'wrap' } }, ...project.chips.map((text) => chip(text, project.accent)))
    ),
    h('div', { style: { display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginTop: 34, zIndex: 2 } },
      h('div', {
        style: {
          display: 'flex',
          width: 430,
          height: 770,
          padding: 13,
          borderRadius: 54,
          background: '#05080d',
          border: `2px solid ${project.accent}66`,
          boxShadow: `0 28px 90px ${project.accent}24`,
          overflow: 'hidden',
          position: 'relative',
        },
      },
        h('div', { style: { display: 'flex', position: 'absolute', top: 17, left: 155, width: 120, height: 27, borderRadius: 999, background: '#05080d', zIndex: 3 } }),
        h('img', { src: screenshotSrc, width: 404, height: 744, style: { borderRadius: 41, objectFit: 'cover', objectPosition: 'top' } })
      )
    ),
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, marginTop: 28 } },
      h('div', { style: { display: 'flex', flexDirection: 'column' } },
        h('div', { style: { fontSize: 27, fontWeight: 700 } }, project.name),
        h('div', { style: { fontSize: 17, color: '#8ea5c8', marginTop: 5 } }, project.url)
      ),
      h('div', { style: { display: 'flex', padding: '13px 21px', borderRadius: 999, background: '#1461ff', color: '#ffffff', fontSize: 17, fontWeight: 700 } }, 'anotherseoguru.com/work')
    )
  )

  const response = new ImageResponse(element, { width: 1080, height: 1350, fonts: baseFonts })
  await writeFile(path.join(outputDir, `${project.slug}-showcase.png`), Buffer.from(await response.arrayBuffer()))
}

function phoneTile(src, accent, rotate, x, y) {
  return h('div', {
    style: {
      display: 'flex', position: 'absolute', left: x, top: y, width: 265, height: 570,
      padding: 8, borderRadius: 34, background: '#05080d', border: `2px solid ${accent}77`,
      boxShadow: `0 24px 65px ${accent}22`, transform: `rotate(${rotate}deg)`, overflow: 'hidden',
    },
  }, h('img', { src, width: 245, height: 550, style: { borderRadius: 26, objectFit: 'cover', objectPosition: 'top' } }))
}

async function renderAd({ slug, headline, subhead, cta, screenshots, accent = '#2ed9ff' }) {
  const sources = await Promise.all(screenshots.map(async (name) => toDataUrl(await readFile(path.join(captureDir, name)), 'image/jpeg')))
  const element = h('div', {
    style: {
      display: 'flex', width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: 'Geist', color: '#ffffff', padding: 58, flexDirection: 'column',
      backgroundImage: 'radial-gradient(circle at 80% 12%, #153f92 0%, #071424 38%, #020712 78%)',
    },
  },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 3 } },
      brandLockup(),
      h('div', { style: { display: 'flex', color: accent, fontSize: 14, fontWeight: 700, letterSpacing: 2.2 } }, 'FOR TOURISM BRANDS')
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', zIndex: 3, width: 900, marginTop: 60 } },
      h('div', { style: { fontSize: 69, lineHeight: 0.98, fontWeight: 700, letterSpacing: -3.2 } }, headline),
      h('div', { style: { fontSize: 26, lineHeight: 1.32, color: '#b8c9e6', marginTop: 25, width: 760 } }, subhead)
    ),
    phoneTile(sources[0], '#2ee9d1', -7, 95, 575),
    phoneTile(sources[1], '#168cff', 0, 410, 535),
    phoneTile(sources[2], '#ffb319', 7, 725, 575),
    h('div', { style: { display: 'flex', position: 'absolute', left: 58, right: 58, bottom: 48, alignItems: 'center', justifyContent: 'space-between', zIndex: 4 } },
      h('div', { style: { display: 'flex', flexDirection: 'column' } },
        h('div', { style: { fontSize: 20, fontWeight: 700, color: accent } }, 'WEBSITES · SEO · GEO/AEO'),
        h('div', { style: { fontSize: 17, color: '#8ea5c8', marginTop: 5 } }, 'Built for hotels, villas, tours & car rentals')
      ),
      h('div', { style: { display: 'flex', background: '#1461ff', color: '#ffffff', padding: '19px 28px', borderRadius: 999, fontSize: 20, fontWeight: 700 } }, cta)
    )
  )
  const response = new ImageResponse(element, { width: 1080, height: 1350, fonts: baseFonts })
  await writeFile(path.join(outputDir, `${slug}.png`), Buffer.from(await response.arrayBuffer()))
}

for (const project of projects) await renderProject(project)

await renderAd({
  slug: 'ad-tourism-websites',
  headline: 'Your tourism website should do more than look good.',
  subhead: 'Turn mobile visitors into direct bookings with conversion-first design, SEO and AI-search visibility.',
  cta: 'Get a free quote',
  screenshots: ['villa-olivia-clara-mobile.png', 'naxos-car-rentals-mobile.png', 'hotels-santorini-mobile.png'],
})

await renderAd({
  slug: 'ad-built-to-book',
  headline: 'Built to rank. Designed to book.',
  subhead: 'Mobile-first websites for hotels, villas, tours and car-rental brands—from €899.',
  cta: 'See our work',
  screenshots: ['discover-cyclades-mobile.png', 'rent-a-car-piraeus-mobile.png', 'mykonos-luxury-mobile.png'],
  accent: '#2ee9d1',
})

console.log(`Generated ${projects.length + 2} social assets in ${outputDir}`)
