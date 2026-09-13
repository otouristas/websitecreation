import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import StickyMobileCta from '@/components/StickyMobileCta';
import WhatsAppPill from '@/components/WhatsAppPill';
import { Analytics } from '@vercel/analytics/next';
import { isValidLocale } from '@/lib/i18n/locale';
import { CONTACT_EMAIL, PHONE_E164 } from '@/lib/contact-info';

const SITE_URL = 'https://anotherseoguru.com';

/**
 * Three faces, all of them shipping Greek glyphs - Greek is ~74% of our
 * clicks, and a display or mono face without a `greek` subset would split
 * strings like "SEO για ξενοδοχεία" across two typefaces.
 *
 * - Inter Tight (variable) is the display face: headlines, prices, numerals.
 * - Inter is the text face at 400-600.
 * - JetBrains Mono carries the uppercase micro-labels and metadata.
 */
const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin', 'latin-ext', 'greek', 'greek-ext'],
  weight: 'variable',
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'greek', 'greek-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'greek'],
  weight: ['400', '500'],
  display: 'swap',
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEl = locale === 'el';

  const title = isEl
    ? 'Κατασκευή Ιστοσελίδων & SEO στην Ελλάδα | AnotherSEOGuru'
    : 'Web Design & SEO Agency for Greece and Beyond | AnotherSEOGuru';
  const description = isEl
    ? 'Κατασκευή ιστοσελίδων, e-shop και SEO για επιχειρήσεις σε όλη την Ελλάδα. Διαφανείς τιμές σε €, GEO/AEO, γρήγορη παράδοση. Ζητήστε δωρεάν προσφορά.'
    : 'Web design, e-shops, and SEO for businesses in Greece and international markets. Transparent EUR pricing, GEO/AEO expertise, fast delivery. Get a free quote.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: isEl
      ? [
          'κατασκευή ιστοσελίδων',
          'SEO',
          'κατασκευή eshop',
          'τοπικό SEO',
          'κατασκευή ιστοσελίδων Αθήνα',
          'SEO Θεσσαλονίκη',
          'AEO',
          'GEO',
          'κατασκευή ιστοσελίδας ξενοδοχείου',
          'ανασχεδιασμός ιστοσελίδας',
        ]
      : [
          'web design agency',
          'SEO agency',
          'website creation',
          'local SEO',
          'technical SEO',
          'AI SEO',
          'GEO',
          'AEO',
          'e-shop development',
          'Greece web design',
        ],
    authors: [{ name: 'AnotherSEOGuru', url: SITE_URL }],
    creator: 'AnotherSEOGuru',
    publisher: 'AnotherSEOGuru',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: isEl ? 'el_GR' : 'en_US',
      alternateLocale: isEl ? ['en_US', 'en_GB'] : ['en_GB', 'el_GR'],
      url: `${SITE_URL}/${locale}`,
      siteName: 'AnotherSEOGuru',
      title,
      description,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'AnotherSEOGuru - Web design & SEO agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@anotherseoguru',
      images: ['/opengraph-image.png'],
    },
    icons: {
      icon: '/favicon.ico',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: ['tkWhNe__BsE39YeIQM5fmGc8Y1W7hzw8RadiokDZquw', 'google57799cfd84f0e265'],
    },
  };
}

/** Site-wide Organization + WebSite JSON-LD (@graph) for rich results and entity clarity */
function buildStructuredDataGraph(isEl: boolean) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AnotherSEOGuru',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
        description: isEl
          ? 'Ψηφιακό γραφείο κατασκευής ιστοσελίδων και SEO με έδρα την Ελλάδα: κατασκευή ιστοσελίδων και e-shop, τοπικό SEO, GEO/AEO και περιεχόμενο για επιχειρήσεις στην Ελλάδα και το εξωτερικό. Διαθέτει και SEO πλατφόρμα συνδεδεμένη με το Google Search Console.'
          : 'Web design and SEO agency serving Greece (Athens, Thessaloniki, the islands) and international clients: website and e-shop development, local SEO, GEO/AEO, and content. Also builds a GSC-native SEO platform.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: CONTACT_EMAIL,
          telephone: PHONE_E164,
          areaServed: ['GR', 'GB', 'US', 'EU'],
          availableLanguage: ['Greek', 'English'],
        },
        sameAs: [
          'https://www.linkedin.com/company/anotherseoguru',
          'https://twitter.com/anotherseoguru',
          'https://www.youtube.com/@anotherseoguru',
        ],
        // Only the markets the portfolio actually covers. Canada, Australia and
        // Ireland were asserted here with zero client work behind them, and
        // `MARKET_COUNT` derives to 4: GR, EU, UK, US.
        areaServed: [
          { '@type': 'Country', name: 'Greece' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'United States' },
          { '@type': 'AdministrativeArea', name: 'Europe' },
        ],
        knowsAbout: [
          'Web design',
          'Website development',
          'E-shop development',
          'Technical SEO',
          'Local SEO',
          'Google Search Console',
          'Generative AI search visibility',
          'Core Web Vitals',
          'Conversion rate optimization',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isEl ? 'Υπηρεσίες' : 'Agency Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEl ? 'Κατασκευή Ιστοσελίδων' : 'Website Creation',
                description: isEl
                  ? 'SEO-ready ιστοσελίδες με διαφανείς τιμές και γρήγορη παράδοση'
                  : 'SEO-ready websites with transparent pricing and fast delivery',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEl ? 'SEO & Τοπικό SEO' : 'SEO & Local SEO',
                description: isEl
                  ? 'Τεχνικό SEO, τοπική προβολή και GEO/AEO για Google και AI μηχανές'
                  : 'Technical SEO, local visibility, and GEO/AEO for Google and AI engines',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: isEl ? 'Κατασκευή E-shop' : 'E-shop Development',
                description: isEl
                  ? 'WooCommerce e-shop με SEO αρχιτεκτονική και βελτιστοποίηση ταχύτητας'
                  : 'WooCommerce e-shops with SEO architecture and speed optimization',
              },
            },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'AnotherSEOGuru',
        description: isEl
          ? 'Κατασκευή ιστοσελίδων, e-shop και SEO για επιχειρήσεις στην Ελλάδα - μαζί με SEO πλατφόρμα για ομάδες.'
          : 'Web design, e-shops, and SEO for businesses in Greece and beyond - plus an SEO platform for Search Console teams.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en', 'el'],
      },
    ],
  };
}

/**
 * Dark is the brand default and needs no class. Only a visitor who explicitly
 * chose the light theme gets `.light` on <html>, before first paint so there
 * is no flash. The stored key is unchanged from the previous toggle.
 */
const themeInitScript = `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEl = locale === 'el';

  return (
    <html
      lang={isEl ? 'el' : 'en'}
      // The next/font variables sit on <html> so they resolve everywhere,
      // including Tailwind's preflight font rule on the root element.
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs documentation for AnotherSEOGuru" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredDataGraph(isEl)) }}
        />
      </head>
      <body className="relative antialiased">
        <GoogleAnalytics />
        <CookieConsent />
        {/* Bottom padding tracks the sticky bar's real height instead of a
            hardcoded 5rem, so content never hides behind it on a notched
            device and no dead space is reserved on pages without the bar. */}
        <div
          className="relative z-0 min-h-dvh"
          style={{ paddingBottom: 'var(--chrome-bottom-bar)' }}
          data-locale={locale}
        >
          {children}
        </div>
        <StickyMobileCta />
        <WhatsAppPill locale={isEl ? 'el' : 'en'} />
        <Analytics />
      </body>
    </html>
  );
}
