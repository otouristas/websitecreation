import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO Glossary — 200+ Terms Explained",
  description:
    "SEO glossary with 200+ definitions: technical SEO, GEO, AEO, AI search, links, and Search Console. Clear examples and links to platform features and guides.",
  path: "/glossary",
  primaryKeyword: "SEO glossary",
});

export default function GlossaryPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="main-below-header min-h-screen text-center text-muted-foreground">Loading glossary…</div>}>
        <GlossaryClient />
      </Suspense>
      <Footer />
    </>
  );
}
