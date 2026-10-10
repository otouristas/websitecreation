import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreditCard, Database, ExternalLink, Eye, KeyRound, LockKeyhole, ServerCog, ShieldCheck, Trash2, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { Accent, CheckList, Container, CtaBand, HeroCentered, KitEyebrow, SoftwareCtas, TrustLine, softwareTrust } from "@/components/kit";
import { PlatformLinks, platformBreadcrumbs, platformMetadata, type Copy } from "@/components/gsc-boost";
import { getAppPath } from "@/lib/app-links";
import { isValidLocale, type SiteLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

/** The app's support address (gsc-gemini-boost SiteFooter SUPPORT_EMAIL). */
const SUPPORT_EMAIL = "support@anotherseoguru.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return platformMetadata({
    locale,
    path: "/platform/security",
    title: { en: "GSC Boost Security: Read-Only by Design", el: "GSC Boost: ασφάλεια και δεδομένα" },
    description: {
      en: "How GSC Boost handles your Google data: read-only Search Console scopes, tokens kept on the server, row-level security, Stripe payments, deletion on request.",
      el: "Πώς χειρίζεται το GSC Boost τα δεδομένα σας: πρόσβαση μόνο για ανάγνωση, tokens στον server, ασφάλεια ανά γραμμή, πληρωμές Stripe και διαγραφή όποτε ζητήσετε.",
    },
    keyword: { en: "GSC Boost security", el: "ασφάλεια GSC Boost" },
  });
}

const HIGHLIGHTS: ReadonlyArray<{ icon: LucideIcon; title: Copy; text: Copy }> = [
  {
    icon: Eye,
    title: { en: "Read-only Google access", el: "Πρόσβαση στη Google μόνο για ανάγνωση" },
    text: {
      en: "GSC Boost asks Google for read-only scopes. It can read your Search Console and Analytics data; it can’t change anything.",
      el: "Το GSC Boost ζητά από τη Google δικαιώματα μόνο για ανάγνωση. Μπορεί να διαβάσει τα δεδομένα σας από Search Console και Analytics· δεν μπορεί να αλλάξει τίποτα.",
    },
  },
  {
    icon: KeyRound,
    title: { en: "Tokens stay on the server", el: "Τα tokens μένουν στον server" },
    text: {
      en: "Google sends the authorization to our server, which stores the tokens. Your browser never holds your Google refresh token.",
      el: "Η Google στέλνει την εξουσιοδότηση στον server μας, ο οποίος αποθηκεύει τα tokens. Ο browser σας δεν κρατά ποτέ το refresh token της Google.",
    },
  },
  {
    icon: LockKeyhole,
    title: { en: "Encrypted in transit and at rest", el: "Κρυπτογράφηση κατά τη μεταφορά και την αποθήκευση" },
    text: {
      en: "Every connection uses TLS. The database and its backups are encrypted at rest by our hosting provider.",
      el: "Κάθε σύνδεση χρησιμοποιεί TLS. Η βάση δεδομένων και τα αντίγραφα ασφαλείας της είναι κρυπτογραφημένα από τον πάροχο φιλοξενίας μας.",
    },
  },
  {
    icon: Database,
    title: { en: "Row-level security", el: "Ασφάλεια σε επίπεδο γραμμής (RLS)" },
    text: {
      en: "Your records are scoped to your account inside the database itself, not only in application code.",
      el: "Οι εγγραφές σας περιορίζονται στον λογαριασμό σας μέσα στην ίδια τη βάση δεδομένων, όχι μόνο στον κώδικα της εφαρμογής.",
    },
  },
  {
    icon: CreditCard,
    title: { en: "Payments by Stripe", el: "Πληρωμές μέσω Stripe" },
    text: {
      en: "Card details go straight to Stripe. We never see or store your full card number.",
      el: "Τα στοιχεία της κάρτας πηγαίνουν απευθείας στη Stripe. Δεν βλέπουμε και δεν αποθηκεύουμε ποτέ τον πλήρη αριθμό της κάρτας σας.",
    },
  },
  {
    icon: Trash2,
    title: { en: "Deletion on request", el: "Διαγραφή κατόπιν αιτήματος" },
    text: {
      en: "Revoke Google access at any time, and ask us to delete your account and data whenever you like.",
      el: "Ανακαλέστε την πρόσβαση στη Google οποιαδήποτε στιγμή και ζητήστε μας να διαγράψουμε τον λογαριασμό και τα δεδομένα σας όποτε θέλετε.",
    },
  },
];

const SCOPES: ReadonlyArray<{ scope: string; allows: Copy; when: Copy }> = [
  {
    scope: "openid · email · profile",
    allows: {
      en: "Your name, email address and profile picture, to create and identify your account.",
      el: "Το όνομά σας, η διεύθυνση email και η φωτογραφία προφίλ, για τη δημιουργία και την ταυτοποίηση του λογαριασμού σας.",
    },
    when: { en: "When you sign in with Google", el: "Όταν συνδέεστε με Google" },
  },
  {
    scope: "webmasters.readonly",
    allows: {
      en: "Read Search Console performance data (queries, pages, clicks, impressions, CTR, position), your list of properties and URL inspection results.",
      el: "Ανάγνωση δεδομένων απόδοσης του Search Console (αναζητήσεις, σελίδες, κλικ, εμφανίσεις, CTR, θέση), της λίστας των ιδιοτήτων σας και των αποτελεσμάτων επιθεώρησης URL.",
    },
    when: { en: "When you connect Google", el: "Όταν συνδέετε τη Google" },
  },
  {
    scope: "analytics.readonly",
    allows: {
      en: "Read Google Analytics 4 reports. GSC Boost only requests reports for properties you select in the app.",
      el: "Ανάγνωση αναφορών του Google Analytics 4. Το GSC Boost ζητά αναφορές μόνο για τις ιδιότητες που επιλέγετε στην εφαρμογή.",
    },
    when: { en: "On the same consent screen", el: "Στην ίδια οθόνη συναίνεσης" },
  },
];

const inlineLink = "font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground";

function Block({ id, title, children }: { readonly id: string; readonly title: string; readonly children: ReactNode }) {
  return (
    <section id={id} className="reveal grid scroll-mt-28 gap-4 border-t border-hairline py-12 lg:grid-cols-[0.42fr_1fr] lg:gap-14">
      <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      <div className="grid min-w-0 gap-4 text-[15px] leading-relaxed text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">{children}</div>
    </section>
  );
}

/** How GSC Boost handles data, adapted from the app's SecurityPage. */
export default async function PlatformSecurityPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const isEl = locale === "el";
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={[platformBreadcrumbs(locale, [{ name: tx("Security", "Ασφάλεια"), path: "/platform/security" }])]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <HeroCentered
          pill={<KitEyebrow icon={<ShieldCheck />}>{tx("GSC Boost · Security", "GSC Boost · Ασφάλεια")}</KitEyebrow>}
          title={
            <>
              {tx("Read-only", "Μόνο ανάγνωση,")} <Accent>{tx("by design", "εκ σχεδιασμού")}</Accent>
            </>
          }
          lead={tx(
            "You’re trusting GSC Boost with your search data. Here is exactly what it can access, where the data lives and how it’s protected, in plain language.",
            "Εμπιστεύεστε στο GSC Boost τα δεδομένα αναζήτησής σας. Εδώ εξηγούμε με απλά λόγια σε τι ακριβώς έχει πρόσβαση, πού αποθηκεύονται τα δεδομένα και πώς προστατεύονται.",
          )}
          actions={<SoftwareCtas locale={locale} source="security-hero" />}
          trust={<TrustLine items={softwareTrust(locale)} />}
        />

        <Container className="mt-16 pb-12">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title.en} className="bg-background p-6 sm:p-7">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Icon className="size-4" aria-hidden />
                </span>
                <h2 className="mt-4 text-[16px] font-semibold text-foreground">{title[locale]}</h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{text[locale]}</p>
              </li>
            ))}
          </ul>
        </Container>

        <Container className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl">
            <Block id="google-access" title={tx("What GSC Boost can access", "Σε τι έχει πρόσβαση το GSC Boost")}>
              <p>
                {tx(
                  "Google shows you exactly what GSC Boost is asking for on its own consent screen, and you can approve or decline. Signing in with Google only shares your basic profile. Search Console and Analytics access is a separate, read-only grant.",
                  "Η Google σάς δείχνει ακριβώς τι ζητά το GSC Boost στη δική της οθόνη συναίνεσης και εσείς αποφασίζετε αν θα το εγκρίνετε. Η σύνδεση με Google μοιράζεται μόνο το βασικό σας προφίλ. Η πρόσβαση σε Search Console και Analytics είναι ξεχωριστή άδεια, μόνο για ανάγνωση.",
                )}
              </p>
              <div className="relative overflow-x-auto rounded-xl border border-hairline bg-surface">
                <table className="w-full min-w-[560px] text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-hairline text-[12px] text-muted-foreground">
                      <th scope="col" className="px-4 py-2.5 font-medium">
                        {tx("Google scope", "Δικαίωμα (scope) Google")}
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-medium">
                        {tx("What it allows", "Τι επιτρέπει")}
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-medium">
                        {tx("When we ask", "Πότε το ζητάμε")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCOPES.map((s) => (
                      <tr key={s.scope} className="border-t border-hairline align-top">
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] text-foreground">{s.scope}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.allows[locale]}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{s.when[locale]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                <strong>{tx("What GSC Boost can’t do:", "Τι δεν μπορεί να κάνει το GSC Boost:")}</strong>{" "}
                {tx(
                  "change Search Console or Analytics settings, submit or remove URLs and sitemaps, add or remove users, or act on your behalf anywhere else in your Google account.",
                  "να αλλάξει ρυθμίσεις στο Search Console ή στο Analytics, να υποβάλει ή να αφαιρέσει URL και sitemaps, να προσθέσει ή να αφαιρέσει χρήστες ή να ενεργήσει για λογαριασμό σας οπουδήποτε αλλού στον λογαριασμό σας Google.",
                )}
              </p>
            </Block>

            <Block id="tokens" title={tx("How Google tokens are handled", "Πώς διαχειριζόμαστε τα tokens της Google")}>
              <p>
                {tx(
                  "When you connect Google, Google returns an authorization code to our server. The server exchanges it for tokens and stores them in our database, scoped to your account with row-level security. Your browser never receives your Google refresh token.",
                  "Όταν συνδέετε τη Google, η Google επιστρέφει έναν κωδικό εξουσιοδότησης στον server μας. Ο server τον ανταλλάσσει με tokens και τα αποθηκεύει στη βάση δεδομένων μας, περιορισμένα στον λογαριασμό σας με ασφάλεια σε επίπεδο γραμμής. Ο browser σας δεν λαμβάνει ποτέ το refresh token της Google.",
                )}
              </p>
              <p>
                {tx(
                  "Tokens are used only by our server functions, only to fetch the data you ask for in the app. You can revoke access at any time from",
                  "Τα tokens χρησιμοποιούνται μόνο από τις λειτουργίες του server μας και μόνο για να φέρουν τα δεδομένα που ζητάτε στην εφαρμογή. Μπορείτε να ανακαλέσετε την πρόσβαση οποιαδήποτε στιγμή από",
                )}{" "}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer noopener" className={inlineLink}>
                  {tx("your Google Account", "τον Λογαριασμό σας Google")}
                  <ExternalLink className="ml-1 inline size-3.5 align-[-2px]" aria-hidden />
                </a>
                {tx("; access stops immediately.", "· η πρόσβαση σταματά αμέσως.")}
              </p>
            </Block>

            <Block id="infrastructure" title={tx("Where your data lives", "Πού βρίσκονται τα δεδομένα σας")}>
              <CheckList
                items={[
                  <>
                    <strong>{tx("Database and authentication", "Η βάση δεδομένων και η αυθεντικοποίηση")}</strong>{" "}
                    {tx("run on Supabase (managed PostgreSQL) with row-level security on user data.", "τρέχουν στη Supabase (managed PostgreSQL), με ασφάλεια σε επίπεδο γραμμής για τα δεδομένα χρηστών.")}
                  </>,
                  <>
                    <strong>{tx("Server logic", "Η λογική του server")}</strong>{" "}
                    {tx(
                      "runs in Supabase Edge Functions. Third-party API keys live in server-side secrets and never ship to the browser.",
                      "τρέχει σε Supabase Edge Functions. Τα API keys τρίτων φυλάσσονται σε secrets στον server και δεν φτάνουν ποτέ στον browser.",
                    )}
                  </>,
                  <>
                    <strong>{tx("The website and app", "Ο ιστότοπος και η εφαρμογή")}</strong> {tx("are served by Vercel over HTTPS.", "εξυπηρετούνται από τη Vercel μέσω HTTPS.")}
                  </>,
                  <>
                    <strong>{tx("WordPress connections", "Οι συνδέσεις WordPress")}</strong>{" "}
                    {tx(
                      "store your application password in an encrypted secrets vault, not in a regular table.",
                      "αποθηκεύουν το application password σας σε κρυπτογραφημένο θησαυροφυλάκιο secrets, όχι σε απλό πίνακα.",
                    )}
                  </>,
                  <>
                    <strong>{tx("Encryption:", "Κρυπτογράφηση:")}</strong>{" "}
                    {tx(
                      "TLS for every connection; the database and backups are encrypted at rest by our provider.",
                      "TLS σε κάθε σύνδεση· η βάση δεδομένων και τα αντίγραφα ασφαλείας κρυπτογραφούνται από τον πάροχό μας.",
                    )}
                  </>,
                ]}
              />
            </Block>

            <Block id="ai" title={tx("AI features and third parties", "Λειτουργίες AI και τρίτοι")}>
              <p>
                {tx(
                  "When you use the AI assistant, generate a brief or run an AI visibility check, GSC Boost sends the AI provider only what that request needs, through an AI gateway. Keyword, SERP, backlink and crawl features send keywords, domains and URLs (not your Google data) to the data providers that power them.",
                  "Όταν χρησιμοποιείτε τον βοηθό AI, δημιουργείτε ένα brief ή εκτελείτε έλεγχο ορατότητας στην AI, το GSC Boost στέλνει στον πάροχο AI μόνο ό,τι χρειάζεται το συγκεκριμένο αίτημα, μέσω ενός AI gateway. Οι λειτουργίες λέξεων-κλειδιών, SERP, backlinks και crawl στέλνουν λέξεις-κλειδιά, domains και URL (όχι τα δεδομένα σας από τη Google) στους παρόχους δεδομένων που τις τροφοδοτούν.",
                )}
              </p>
              <p>
                {tx(
                  "We don’t sell your data, and we don’t use Google user data to train AI models. The full list of providers is in the",
                  "Δεν πουλάμε τα δεδομένα σας και δεν χρησιμοποιούμε δεδομένα χρηστών της Google για την εκπαίδευση μοντέλων AI. Η πλήρης λίστα παρόχων βρίσκεται στην",
                )}{" "}
                <a href={`${getAppPath("/privacy")}?lang=${locale}#subprocessors`} className={inlineLink}>
                  {tx("app’s privacy policy", "πολιτική απορρήτου της εφαρμογής")}
                </a>
                .
              </p>
            </Block>

            <Block id="payments" title={tx("Payments", "Πληρωμές")}>
              <p>
                {tx(
                  "Payments are processed by Stripe, which is certified as a PCI DSS Level 1 Service Provider. Card details go directly to Stripe; we store only references such as your Stripe customer ID, plan and subscription status.",
                  "Οι πληρωμές γίνονται μέσω Stripe, η οποία είναι πιστοποιημένη ως PCI DSS Level 1 Service Provider. Τα στοιχεία της κάρτας πηγαίνουν απευθείας στη Stripe· εμείς αποθηκεύουμε μόνο αναφορές, όπως το Stripe customer ID, το πακέτο και την κατάσταση της συνδρομής σας.",
                )}
              </p>
            </Block>

            <Block id="deletion" title={tx("Your controls", "Ο έλεγχος είναι δικός σας")}>
              <CheckList
                items={[
                  <>
                    <strong>{tx("Revoke Google access", "Ανακαλέστε την πρόσβαση στη Google")}</strong>{" "}
                    {tx("from your Google Account at any time.", "από τον Λογαριασμό σας Google οποιαδήποτε στιγμή.")}
                  </>,
                  <>
                    <strong>{tx("Delete your account and data", "Διαγράψτε τον λογαριασμό και τα δεδομένα σας")}</strong>
                    {tx(": email", ": στείλτε email στο")}{" "}
                    <a href={`mailto:${SUPPORT_EMAIL}`} className={inlineLink}>
                      {SUPPORT_EMAIL}
                    </a>{" "}
                    {tx(
                      "from the address on your account. We delete your account, stored Google tokens and workspace data; copies in backups expire on their normal schedule.",
                      "από τη διεύθυνση του λογαριασμού σας. Διαγράφουμε τον λογαριασμό σας, τα αποθηκευμένα tokens της Google και τα δεδομένα του χώρου εργασίας· τα αντίγραφα στα backups λήγουν σύμφωνα με το κανονικό τους πρόγραμμα.",
                    )}
                  </>,
                  <>
                    <strong>{tx("Export your work", "Εξαγάγετε τη δουλειά σας")}</strong>
                    {tx(": every table in the app exports to CSV.", ": κάθε πίνακας της εφαρμογής εξάγεται σε CSV.")}
                  </>,
                ]}
              />
            </Block>

            <Block id="certifications" title={tx("Certifications", "Πιστοποιήσεις")}>
              <p>
                {tx(
                  "We’re a small team and don’t hold SOC 2 or ISO 27001 certifications ourselves. We build on providers that run their own audited security programs, keep our own footprint small and read-only, and are happy to answer specific questions.",
                  "Είμαστε μια μικρή ομάδα και δεν διαθέτουμε οι ίδιοι πιστοποιήσεις SOC 2 ή ISO 27001. Βασιζόμαστε σε παρόχους με δικά τους ελεγμένα προγράμματα ασφάλειας, κρατάμε το δικό μας αποτύπωμα μικρό και μόνο για ανάγνωση, και απαντάμε με χαρά σε συγκεκριμένες ερωτήσεις.",
                )}
              </p>
            </Block>

            <Block id="disclosure" title={tx("Responsible disclosure", "Υπεύθυνη γνωστοποίηση")}>
              <p>
                {tx("If you believe you’ve found a security issue, email", "Αν πιστεύετε ότι εντοπίσατε κάποιο πρόβλημα ασφαλείας, στείλτε email στο")}{" "}
                <a href={`mailto:${SUPPORT_EMAIL}?subject=Security%20report`} className={inlineLink}>
                  {SUPPORT_EMAIL}
                </a>{" "}
                {tx(
                  "with “Security” in the subject, a description and steps to reproduce. Please don’t access other people’s data, degrade the service or disclose the issue publicly before we’ve had a reasonable chance to fix it. We’ll acknowledge your report and keep you updated while we work on it.",
                  "με θέμα «Security», μια περιγραφή και τα βήματα αναπαραγωγής. Παρακαλούμε μην αποκτήσετε πρόσβαση σε δεδομένα άλλων, μην επηρεάσετε τη λειτουργία της υπηρεσίας και μη δημοσιοποιήσετε το πρόβλημα πριν έχουμε εύλογο χρόνο να το διορθώσουμε. Θα επιβεβαιώσουμε τη λήψη της αναφοράς σας και θα σας ενημερώνουμε όσο το διορθώνουμε.",
                )}
              </p>
              <div className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-4 py-3 text-[13.5px]">
                <ServerCog className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span>
                  {tx("Questions about security or data handling?", "Ερωτήσεις για την ασφάλεια ή τη διαχείριση δεδομένων;")}{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className={inlineLink}>
                    {tx("Get in touch", "Επικοινωνήστε μαζί μας")}
                  </a>
                  .
                </span>
              </div>
            </Block>
          </div>
        </Container>

        <CtaBand locale={locale} source="security-band" />
        <PlatformLinks locale={locale} current="/platform/security" />
      </main>
      <Footer locale={locale} />
    </>
  );
}
