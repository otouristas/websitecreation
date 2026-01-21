import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Start Your Website Project',
    description: 'Begin your custom website project with AnotherSEOGuru. Choose your package, tell us about your business, and get a fast, SEO-optimized website in weeks.',
    path: '/get-started',
});

export default function GetStartedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
