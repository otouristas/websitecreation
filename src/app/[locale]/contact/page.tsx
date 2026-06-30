import type { ReactElement } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactFormClient } from './contact-form-client';
import { isValidLocale, type SiteLocale } from '@/lib/i18n/locale';
import { notFound } from 'next/navigation';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return (
    <>
      <Header />
      <ContactFormClient locale={locale as SiteLocale} />
      <Footer />
    </>
  );
}
