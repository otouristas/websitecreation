import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Contact Us',
    description: 'Get in touch with AnotherSEOGuru for your website project. We respond within 24 hours. Request a free quote for web design, SEO, and more.',
    path: '/contact',
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
