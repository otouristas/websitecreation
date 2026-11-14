import Link from "next/link";
import { ArrowRight, FolderOpen, Globe2, Plug } from "lucide-react";
import { WaveAccent, WaveHeading, WaveSection } from "./ui";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/** Web project/country flows released separately from the forthcoming native screens. */
export function WorkspacePreview({ locale }: { readonly locale: SiteLocale }) {
  const tx = (en: string, el: string) => locale === "el" ? el : en;
  return <WaveSection id="project-workspace" shot="project-workspace" tinted>
    <WaveHeading eyebrow={tx("Project workspace", "Χώρος έργου")} title={<>{tx("Organise your SEO work ", "Οργανώστε τις εργασίες σας ")}<WaveAccent>{tx("by website", "ανά ιστότοπο")}</WaveAccent></>}
      lead={tx("Keep each website's analyses, keywords, tasks and conversations together. Switch projects to change the website you work on, and explore its connected Google data without mixing it with another project.", "Κρατήστε μαζί τις αναλύσεις, τις λέξεις-κλειδιά, τις εργασίες και τις συνομιλίες κάθε ιστοτόπου. Αλλάξτε έργο για να εργαστείτε σε άλλον ιστότοπο και δείτε τα συνδεδεμένα δεδομένα Google που τον αφορούν.")} />
    <div className="mt-10 grid gap-5 lg:grid-cols-3">
      <article className="rounded-2xl border border-hairline bg-background p-5 sm:p-7">
        <FolderOpen className="size-6 text-primary" aria-hidden />
        <h3 className="mt-5 font-display text-xl font-semibold">{tx("Start with the project", "Ξεκινήστε από το έργο")}</h3>
        <ol className="mt-5 grid gap-4 text-sm leading-6 text-muted-foreground">
          <li><strong className="text-foreground">01.</strong> {tx("Create a project and enter the website URL.", "Δημιουργήστε έργο και συμπληρώστε τη διεύθυνση του ιστοτόπου.")}</li>
          <li><strong className="text-foreground">02.</strong> {tx("Connect Search Console to see how the site performs in Google Search.", "Συνδέστε το Search Console για να δείτε πώς εμφανίζεται ο ιστότοπός σας στη Google.")}</li>
          <li><strong className="text-foreground">03.</strong> {tx("Switch projects to return to each website's analyses, keywords, tasks and conversations.", "Αλλάξτε έργο για να βρείτε τις αναλύσεις, τις λέξεις-κλειδιά, τις εργασίες και τις συνομιλίες του κάθε ιστοτόπου.")}</li>
        </ol>
        <p className="mt-5 border-t border-hairline pt-4 text-xs leading-5 text-muted-foreground">{tx("One project represents one website. Your existing plan determines how many projects you can create.", "Κάθε έργο αντιστοιχεί σε έναν ιστότοπο. Το πακέτο σας καθορίζει πόσα έργα μπορείτε να δημιουργήσετε.")}</p>
      </article>
      <article className="rounded-2xl border border-hairline bg-background p-5 sm:p-7">
        <Globe2 className="size-6 text-primary" aria-hidden />
        <h3 className="mt-5 font-display text-xl font-semibold">{tx("Your audience, by country", "Το κοινό σας ανά χώρα")}</h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{tx("Connect GA4 to see which countries send visitors to the site. Compare sessions by country on the map or in the list, and check the total number of active users for the same period.", "Συνδέστε το GA4 για να δείτε από ποιες χώρες έρχονται οι επισκέπτες σας. Συγκρίνετε τις επισκέψεις ανά χώρα στον χάρτη ή στον πίνακα και δείτε το σύνολο των ενεργών χρηστών για την ίδια περίοδο.")}</p>
        <div className="mt-5 rounded-xl bg-primary/5 p-4 text-xs leading-5 text-muted-foreground">{tx("The map groups activity by country at approximate country centers. The active-user total comes from a separate Google measurement.", "Ο χάρτης συγκεντρώνει την επισκεψιμότητα ανά χώρα, σε ενδεικτικά κέντρα χωρών. Το σύνολο ενεργών χρηστών προέρχεται από ξεχωριστή μέτρηση της Google.")}</div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{tx("Available on the web · Coming to iPhone", "Διαθέσιμο στο web · Έρχεται στο iPhone")}</p>
      </article>
      <article className="rounded-2xl border border-hairline bg-background p-5 sm:p-7">
        <Plug className="size-6 text-primary" aria-hidden />
        <h3 className="mt-5 font-display text-xl font-semibold">{tx("Use the same account in AI tools", "Ο ίδιος λογαριασμός στους βοηθούς AI")}</h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{tx("Add the remote MCP server to a compatible ChatGPT or Claude client. Sign in with AnotherSEOGuru, review the permissions and name the project you want to discuss.", "Προσθέστε τον απομακρυσμένο MCP server σε συμβατή εφαρμογή ChatGPT ή Claude. Συνδεθείτε με AnotherSEOGuru, ελέγξτε τις άδειες και αναφέρετε το έργο για το οποίο ρωτάτε.")}</p>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{tx("Explore interactive performance cards in ChatGPT or work with standard MCP results in Claude. Approve task updates when you want the assistant to save a change.", "Δείτε διαδραστικές κάρτες απόδοσης στο ChatGPT ή χρησιμοποιήστε τις απαντήσεις εργαλείων MCP στο Claude. Εγκρίνετε την ενημέρωση μιας εργασίας όταν θέλετε ο βοηθός να αποθηκεύσει μια αλλαγή.")}</p>
        <Link href={localizedPath(locale, "/platform/mcp")} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">{tx("Connect an AI assistant", "Συνδέστε έναν βοηθό AI")}<ArrowRight className="size-4" aria-hidden /></Link>
      </article>
    </div>
  </WaveSection>;
}
