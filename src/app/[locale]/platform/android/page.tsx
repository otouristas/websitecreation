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
  return buildMetadata({ title: locale === "el" ? "AnotherSEOGuru App για Android" : "AnotherSEOGuru App for Android", description: locale === "el" ? "Δείτε πώς θα ελέγχετε τα κλικ και τις εργασίες SEO από το Android. Μέχρι την κυκλοφορία, δοκιμάστε τον Aster AI στο δείγμα της εφαρμογής web." : "See how your Search Console data and tasks will work on Android. Try Aster AI in the web demo while the Android release is in preparation.", path: `/${locale}/platform/android`, hreflangPath: "/platform/android" });
}
export default async function AndroidPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const el = locale === "el";
  return <><Header locale={locale} /><main className="blueprint-grid px-6 pt-32"><div className="mx-auto mb-12 max-w-3xl text-center"><p className="text-xs font-medium uppercase tracking-widest text-primary">Android · {el ? "Προετοιμασία κυκλοφορίας" : "Release preparation"}</p><h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{el ? "Τα κλικ και οι εργασίες σας στο Android" : "Your search traffic and tasks on Android"}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{el ? "Με τον ίδιο λογαριασμό θα μπορείτε να βλέπετε τα στοιχεία του Search Console, να παρακολουθείτε εργασίες και ειδοποιήσεις και να ρωτάτε τον Aster AI από το κινητό. Δεν έχει ανακοινωθεί ημερομηνία κυκλοφορίας στο Google Play. Στο μεταξύ, δοκιμάστε τον Aster AI στον browser σας με ενδεικτικά δεδομένα." : "The Android app will use your existing account, so you can check Search Console, follow tasks and alerts, and ask Aster AI about your site from your phone. A Google Play release date has yet to be announced. You can try Aster AI in your browser today with sample data."}</p></div><SeoChatDemo locale={locale} /><ProductEcosystem locale={locale} /></main><Footer locale={locale} /></>;
}
