import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";
import { GetStartedClient } from "./get-started-client";

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <Header />
      <GetStartedClient locale={locale as SiteLocale} />
      <Footer />
    </>
  );
}
