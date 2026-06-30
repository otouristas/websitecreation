import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AnotherSEOGuru - Web design, SEO, GEO & AEO for tourism';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0ea5e9 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>AnotherSEOGuru</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Web Design · SEO · GEO & AEO
        </div>
        <div style={{ fontSize: 28, marginTop: 24, opacity: 0.9, maxWidth: 800 }}>
          Tourism, hotels, rent-a-car & travel AI - built to rank globally
        </div>
      </div>
    ),
    { ...size },
  );
}
