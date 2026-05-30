import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Get Started — Website & SEO Project',
    description:
        'Start your website or SEO project: choose a package, share your goals, and launch a fast, SEO-ready site in weeks. Platform trial or full agency delivery available.',
    path: '/get-started',
});

export default function GetStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
