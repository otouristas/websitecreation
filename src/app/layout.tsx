import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anotherseoguru.com"),
  title: {
    default: "AnotherSEOGuru | Data-Driven SEO Agency",
    template: "%s", // Use strict template (or just %s) to prevent double branding since buildMetadata handles it
  },
  description:
    "Transform your online presence with cutting-edge SEO strategies, AI-powered insights, and proven techniques that drive organic traffic and boost conversions. 500+ clients served, 98% retention rate.",
  keywords: [
    "SEO agency",
    "SEO services",
    "search engine optimization",
    "digital marketing",
    "organic traffic",
    "keyword research",
    "link building",
    "technical SEO",
    "content strategy",
    "local SEO",
  ],
  authors: [{ name: "AnotherSEOGuru" }],
  creator: "AnotherSEOGuru",
  publisher: "AnotherSEOGuru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anotherseoguru.com",
    siteName: "AnotherSEOGuru",
    title: "AnotherSEOGuru | Data-Driven SEO Agency",
    description:
      "Transform your online presence with cutting-edge SEO strategies, AI-powered insights, and proven techniques that drive organic traffic.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnotherSEOGuru | Data-Driven SEO Agency",
    description:
      "Transform your online presence with cutting-edge SEO strategies and AI-powered insights.",
    creator: "@anotherseoguru",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://anotherseoguru.com",
  },
  verification: {
    google: "tkWhNe__BsE39YeIQM5fmGc8Y1W7hzw8RadiokDZquw",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AnotherSEOGuru",
  url: "https://anotherseoguru.com",
  logo: "https://anotherseoguru.com/logo.png",
  description:
    "Data-driven SEO agency specializing in technical SEO, content strategy, link building, and AI-powered optimization.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@anotherseoguru.com",
    availableLanguage: ["English", "Greek"],
  },
  sameAs: [
    "https://www.linkedin.com/company/anotherseoguru",
    "https://twitter.com/anotherseoguru",
    "https://www.youtube.com/@anotherseoguru",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "150",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEO Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical SEO",
          description: "Comprehensive site audits and Core Web Vitals optimization",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Content Strategy",
          description: "AI-powered content creation and keyword research",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Link Building",
          description: "White-hat link acquisition and digital PR",
        },
      },
    ],
  },
};

import MarketingPopup from "@/components/MarketingPopup";
import CookieConsent from "@/components/CookieConsent";

// ... (Metadata and imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FGFJEKZHB1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FGFJEKZHB1');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MarketingPopup />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}
