import { ImageResponse } from 'next/og';

export const alt = 'AnotherSEOGuru - Websites, SEO, GEO & AEO for tourism. Built to rank. Designed to convert.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social card in the brand world: navy canvas, royal blue mark, cyan accent,
 * the tagline. Rendered by satori, so layout is flexbox-only and colours are
 * plain hex (the oklch tokens in globals.css resolve to these).
 */
const NAVY = '#0a1030';
const NAVY_DEEP = '#060a1f';
const BLUE = '#3b74f5';
const BLUE_DEEP = '#0859DC';
const CYAN = '#5fd3f0';
const SIGNAL = '#c8f542';
const TEXT = '#f4f6fb';
const MUTED = '#a9b4cc';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: `radial-gradient(60% 55% at 18% 10%, rgba(59,116,245,0.42) 0%, rgba(59,116,245,0) 70%), radial-gradient(45% 40% at 88% 0%, rgba(95,211,240,0.28) 0%, rgba(95,211,240,0) 70%), linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
          color: TEXT,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 1024 1024" fill="none" stroke={BLUE} strokeWidth="66" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="410" cy="450" r="205" />
              <path d="M556 596 655 785" />
              <path d="M300 462 385 350 625 635 825 400" />
            </svg>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>AnotherSEOGuru</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 18,
              letterSpacing: 3,
              color: CYAN,
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 99, background: SIGNAL, display: 'flex' }} />
            Websites · SEO · GEO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 700, lineHeight: 0.98, letterSpacing: -4 }}>
            <div style={{ display: 'flex' }}>Built to rank.</div>
            <div
              style={{
                display: 'flex',
                backgroundImage: `linear-gradient(90deg, ${BLUE} 0%, ${CYAN} 100%)`,
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Designed to convert.
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: MUTED, maxWidth: 900, lineHeight: 1.3 }}>
            Websites, SEO and AI visibility for tourism businesses in Greece and beyond.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, color: MUTED }}>
          <div style={{ display: 'flex' }}>anotherseoguru.com</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 24px',
              borderRadius: 99,
              background: `linear-gradient(180deg, ${BLUE} 0%, ${BLUE_DEEP} 100%)`,
              color: TEXT,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Get a free SEO audit
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
