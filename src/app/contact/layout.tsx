import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Contact — Get a Free SEO Quote',
    description:
        'Contact our SEO and web design team. We respond within 24 hours. Request a free quote for websites, GEO, AEO, technical SEO, or platform trial access.',
    path: '/contact',
});

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
