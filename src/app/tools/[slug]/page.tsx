import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PLATFORM_TOOLS, getPlatformToolBySlug } from "@/data/platform-tools";
import { getAppPath } from "@/lib/app-links";
import { buildMetadata } from "@/lib/seo";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return PLATFORM_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getPlatformToolBySlug(slug);
  if (!tool) {
    return {};
  }
  return buildMetadata({
    title: tool.title,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    primaryKeyword: tool.primaryKeyword,
  });
}

export default async function PlatformToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getPlatformToolBySlug(slug);
  if (!tool) {
    notFound();
  }
  const appUrl = getAppPath(tool.appPath);
  return (
    <>
      <Header />
      <main className="main-below-header pb-16">
        <div className="container max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/seo-platform" className="hover:text-primary">
              SEO platform
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tool.title}</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">{tool.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{tool.description}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={appUrl}
              className="btn btn-gradient px-6 py-3"
              rel="noopener noreferrer"
            >
              Open in platform
            </a>
            <Link href="/seo-platform" className="btn btn-outline px-6 py-3">
              All product modules
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            The interactive tool runs on our secure app subdomain. Agency services for done-for-you SEO and web design
            are still available on this site — see{" "}
            <Link href="/services" className="text-primary hover:underline">
              services
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
