import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SEO Glossary — definitions, examples, and tactics",
  description:
    "Browse 200+ SEO terms: on-page, technical, AI visibility, links, and more. Examples, implementation tips, and links to our platform and tools.",
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
