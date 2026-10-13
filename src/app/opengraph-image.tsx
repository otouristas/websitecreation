import React from 'react';
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import tokens from '@/brand/tokens/brand.tokens.json';

export const alt = 'AnotherSEOGuru - Websites, SEO, GEO & AEO for tourism. Built to rank. Designed to convert.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Exact approved artwork, with static I/O outside request rendering.
const logo = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), 'public', 'brand', 'asg-lockup-on-dark.svg')).toString('base64')}`;
const theme = tokens.themes.dark;
const fonts = ([400, 600, 700] as const).map((weight) => ({
  name: 'Inter',
  data: readFileSync(join(process.cwd(), 'src', 'brand', 'fonts', `Inter-${weight}.ttf`)),
  weight,
  style: 'normal' as const,
}));

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: theme.background, color: theme.text, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* The logo's outlined lettering is preserved; this is artwork, not UI text. */}
        <img src={logo} width={418} height={95} alt="AnotherSEOGuru" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, letterSpacing: 3, color: theme.textSecondary }}>
          Websites · SEO · GEO
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 86, fontWeight: 700, lineHeight: 1.04, letterSpacing: -4 }}>
          <div style={{ display: 'flex' }}>Built to rank.</div>
          <div style={{ display: 'flex', color: theme.link }}>Designed to convert.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: theme.textSecondary, maxWidth: 900, lineHeight: 1.3 }}>
          Websites, SEO and AI visibility for tourism businesses in Greece and beyond.
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, color: theme.textSecondary }}>
        <div style={{ display: 'flex' }}>anotherseoguru.com</div>
        <div style={{ display: 'flex', padding: '12px 24px', borderRadius: 99, background: theme.action, color: theme.actionForeground, fontSize: 20, fontWeight: 600 }}>
          Get a free SEO audit
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
