import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactFormClient } from "./contact-form-client";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { elContact } from "@/data/translations/el-contact";
import { Container, CtaBand, TrustLine, agencyTrust } from "@/components/kit";
import { PageHero, accentTail } from "@/components/page-kit";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const l = locale as SiteLocale;
  const isEl = l === "el";
  const lp = (path: string) => localizedPath(l, path);

  return (
    <>
      <Header locale={l} />
      <main className="blueprint-grid relative z-0" lang={isEl ? "el" : undefined}>
        <PageHero
          locale={l}
          breadcrumbs={[
            { name: isEl ? elContact.breadcrumbHome : "Home", url: lp("/") },
            { name: isEl ? elContact.breadcrumbContact : "Contact", url: lp("/contact") },
          ]}
          pill={{
            href: lp("/get-started#free-audit"),
            kind: "free",
            tag: isEl ? "Δωρεάν" : "Free",
            text: isEl ? "Προσθέστε την ιστοσελίδα σας για δωρεάν έλεγχο SEO" : "Add your website for a free SEO audit",
          }}
          title={accentTail(isEl ? elContact.h1 : "Let's Talk About Your Project", 2)}
          lead={
            isEl
              ? elContact.intro
              : "Have a question or ready to get started? Send us a message and we'll get back to you within 24 hours."
          }
          actions={null}
          trust={<TrustLine items={agencyTrust(l)} />}
        >
          <Container className="mt-12">
            <ContactFormClient locale={l} />
          </Container>
        </PageHero>
        <CtaBand locale={l} source="contact-band" />
      </main>
      <Footer locale={l} />
    </>
  );
}
