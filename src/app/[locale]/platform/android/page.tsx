import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductEcosystem } from "@/components/landing/ProductEcosystem";
import { SeoChatDemo } from "@/components/landing/SeoChatDemo";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({ title: locale === "el" ? "AnotherSEOGuru για Android" : "AnotherSEOGuru for Android", description: locale === "el" ? "Η εγγενής εφαρμογή Android για τα δεδομένα SEO, τις εργασίες και τον βοηθό σας. Πληροφορίες διαθεσιμότητας και ροής εργασίας." : "The native Android client for your SEO data, tasks and assistant. Availability and workflow information.", path: `/${locale}/platform/android`, hreflangPath: "/platform/android" });
}
export default async function AndroidPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const el = locale === "el";
  return <><Header locale={locale} /><main className="blueprint-grid px-6 pt-32"><div className="mx-auto mb-12 max-w-3xl text-center"><p className="text-xs font-medium uppercase tracking-widest text-primary">Android · {el ? "Προετοιμασία κυκλοφορίας" : "Release preparation"}</p><h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{el ? "Το SEO σας, μαζί σας στο Android." : "Your SEO workspace, on Android."}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{el ? "Η εγγενής εφαρμογή συνδέεται στον ίδιο λογαριασμό για Search Console, εργασίες, ειδοποιήσεις και συνομιλία με τον βοηθό. Η διάθεση μέσω Google Play δεν έχει ανακοινωθεί. Μπορείτε ήδη να δοκιμάσετε το δείγμα της εφαρμογής web." : "The native app connects to the same account for Search Console, tasks, alerts and assistant conversations. Google Play availability has not been announced. You can try the web sample workspace now."}</p></div><SeoChatDemo locale={locale} /><ProductEcosystem locale={locale} /></main><Footer locale={locale} /></>;
}
