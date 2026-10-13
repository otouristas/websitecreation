import { Geist_Mono, Inter } from 'next/font/google';

/** Shared Inter UI family, including Greek; logo lettering remains outlined artwork. */
export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'greek', 'greek-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

/** Monospace is reserved for code, not a separate marketing identity. */
export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});
