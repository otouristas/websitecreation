import type { ComponentType } from "react";
import {
  FileText,
  Settings,
  Link2,
  Search,
  BarChart3,
  Star,
  MapPin,
  BookOpen,
  Gauge,
  RefreshCw,
  Bot,
  Wrench,
} from "lucide-react";

export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  fullDefinition: string;
  /** Greek translations (optional; UI falls back to English when absent). */
  termEl?: string;
  shortDefinitionEl?: string;
  fullDefinitionEl?: string;
  example?: string;
  technique?: string;
  proTip?: string;
  /** Greek versions of example / technique / proTip (optional; UI falls back to English when absent). */
  exampleEl?: string;
  techniqueEl?: string;
  proTipEl?: string;
  relatedTerms?: string[];
  relatedLinks?: { title: string; url: string; type: "feature" | "tool" | "blog" | "help" }[];
}

export interface GlossaryCategory {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  terms: GlossaryTerm[];
}

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "on-page-seo",
    title: "On-Page SEO",
    description: "Optimization techniques applied directly on web pages",
    icon: FileText,
    color: "blue",
    terms: [
      {
        id: "on-page-seo-term",
        termEl: "On-Page SEO",
        shortDefinitionEl: "Βελτιστοποίηση στοιχείων μέσα στη σελίδα: τίτλοι, περιεχόμενο, επικεφαλίδες και εσωτερικοί σύνδεσμοι.",
        fullDefinitionEl: "Το on-page SEO καλύπτει ό,τι ελέγχετε στη σελίδα σας, title tags, H1, δομή περιεχομένου, εσωτερική σύνδεση, εικόνες και meta, ώστε να ταιριάζει με την πρόθεση αναζήτησης. Είναι το θεμέλιο πριν από off-page και link building.",
        term: "On-Page SEO",
        shortDefinition: "Optimizing elements on a web page to rank for relevant searches.",
        fullDefinition: "On-page SEO covers titles, headings, content, internal links, images, and meta tags so a page matches search intent and can rank. It is the foundation before off-page authority work.",
        example: "Rewriting a service page title and opening paragraph to answer 'τι είναι το on-page SEO' in the first 50 words.",
        exampleEl: "Ξαναγράφετε τον τίτλο και την πρώτη παράγραφο μιας σελίδας υπηρεσίας, ώστε να απαντά στο «τι είναι το on-page SEO» μέσα στις πρώτες 50 λέξεις.",
        technique: "One intent per URL, keyword in title/H1 naturally, short answer near the top, supporting H2s for PAA, internal links to money pages.",
        techniqueEl: "Μία πρόθεση αναζήτησης ανά URL, η λέξη-κλειδί φυσικά στον τίτλο και στο H1, μια σύντομη απάντηση ψηλά στη σελίδα, H2 που καλύπτουν τις ερωτήσεις του People Also Ask και εσωτερικοί σύνδεσμοι προς τις σελίδες που φέρνουν έσοδα.",
        relatedTerms: ["title-tag", "meta-description", "keywords", "seo"],
        relatedLinks: [
          { title: "On-page SEO tips", url: "/en/blog/on-page-seo", type: "blog" },
          { title: "Συμβουλές on-page SEO", url: "/el/blog/on-page-seo-el", type: "blog" }
        ]
      },
      {
        id: "title-tag",
        termEl: "Title Tag (Ετικέτα Τίτλου)",
        shortDefinitionEl: "HTML στοιχείο που ορίζει τον τίτλο της σελίδας στα αποτελέσματα αναζήτησης και στην καρτέλα του browser.",
        fullDefinitionEl: "Το title tag είναι το HTML στοιχείο που ορίζει τον τίτλο μιας ιστοσελίδας. Εμφανίζεται ως ο τίτλος που πατάει ο χρήστης στα αποτελέσματα της Google και στις καρτέλες του browser. Είναι από τους σημαντικότερους on-page SEO παράγοντες: κρατήστε τον 50-60 χαρακτήρες, με τη βασική λέξη-κλειδί στην αρχή.",
        term: "Title Tag",
        shortDefinition: "HTML element specifying a page's title for search results and browser tabs.",
        fullDefinition: "The title tag is an HTML element that defines the title of a web page. It appears in search engine results as the clickable headline and in browser tabs. Title tags are one of the most important on-page SEO factors.",
        example: "<title>Best Running Shoes 2026 | Expert Reviews & Buying Guide</title>",
        exampleEl: "<title>Τα καλύτερα παπούτσια τρεξίματος 2026 | Κριτικές & οδηγός αγοράς</title>",
        technique: "Keep titles 50-60 characters, include primary keyword near the beginning, add brand name at the end with a pipe separator, make it compelling to improve CTR.",
        techniqueEl: "Κρατήστε τον τίτλο στους 50-60 χαρακτήρες, βάλτε τη βασική λέξη-κλειδί κοντά στην αρχή, προσθέστε το όνομα της επιχείρησης στο τέλος μετά από κάθετη γραμμή (|) και κάντε τον ελκυστικό, ώστε να ανεβάσει το CTR.",
        proTip: "Use unique titles for every page. Duplicate titles confuse search engines about which page to rank.",
        proTipEl: "Κάθε σελίδα χρειάζεται δικό της, μοναδικό τίτλο. Οι διπλότυποι τίτλοι μπερδεύουν τις μηχανές αναζήτησης για το ποια σελίδα να κατατάξουν.",
        relatedTerms: ["meta-description", "serp", "ctr"],
        relatedLinks: [
          { title: "Meta Tags Generator", url: "/free-tools/meta-tags-generator", type: "tool" },
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "meta-description",
        termEl: "Meta Description (Μετα-περιγραφή)",
        shortDefinitionEl: "Σύντομη περίληψη της σελίδας που εμφανίζεται κάτω από τον τίτλο στα αποτελέσματα της Google.",
        fullDefinitionEl: "Η meta description είναι η σύντομη περιγραφή (150-160 χαρακτήρες) που εμφανίζεται κάτω από τον τίτλο στα αποτελέσματα αναζήτησης. Δεν αποτελεί άμεσο παράγοντα κατάταξης, αλλά καθορίζει το ποσοστό κλικ (CTR): μια πειστική περιγραφή με σαφή αξία και κάλεσμα φέρνει περισσότερους επισκέπτες από την ίδια θέση.",
        term: "Meta Description",
        shortDefinition: "HTML attribute providing a brief summary of page content for search results.",
        fullDefinition: "A meta description is an HTML attribute that provides a concise summary of a web page's content. While not a direct ranking factor, it significantly impacts click-through rates as it appears as the snippet text under the title in search results.",
        example: "<meta name=\"description\" content=\"Compare the top 10 running shoes of 2026. Expert reviews, price comparisons, and buying tips to help you find your perfect pair.\">",
        exampleEl: "<meta name=\"description\" content=\"Συγκρίνετε τα 10 καλύτερα παπούτσια τρεξίματος του 2026. Κριτικές από ειδικούς, σύγκριση τιμών και συμβουλές αγοράς για να βρείτε το ιδανικό ζευγάρι.\">",
        technique: "Write 150-160 characters, include primary keyword naturally, add a call-to-action, make it unique per page, and match search intent.",
        techniqueEl: "Γράψτε 150-160 χαρακτήρες, βάλτε φυσικά τη βασική λέξη-κλειδί, προσθέστε ένα κάλεσμα σε δράση, φροντίστε να είναι μοναδική για κάθε σελίδα και να ταιριάζει με την πρόθεση αναζήτησης.",
        proTip: "If Google rewrites your meta description, it means the original didn't match user intent well enough.",
        proTipEl: "Αν η Google ξαναγράφει τη meta description σας, σημαίνει ότι η αρχική δεν ταίριαζε αρκετά με αυτό που ψάχνει ο χρήστης.",
        relatedTerms: ["title-tag", "ctr", "serp"],
        relatedLinks: [
          { title: "Meta Description Generator", url: "/free-tools/meta-description-generator", type: "tool" },
          { title: "Meta Tags Generator", url: "/free-tools/meta-tags-generator", type: "tool" }
        ]
      },
      {
        id: "h1-tag",
        termEl: "H1 Tag",
        shortDefinitionEl: "Η κύρια επικεφαλίδα μιας σελίδας στην HTML, συνήθως ο βασικός τίτλος του περιεχομένου.",
        fullDefinitionEl: "Το H1 είναι η επικεφαλίδα ανώτατου επιπέδου στην HTML και πρέπει να εκφράζει το κύριο θέμα της σελίδας. Βοηθά τις μηχανές αναζήτησης να καταλάβουν την ιεραρχία του περιεχομένου και είναι κρίσιμο για την προσβασιμότητα.",
        term: "H1 Tag",
        shortDefinition: "The main heading tag in HTML, typically used for the primary page title.",
        fullDefinition: "The H1 tag is the highest-level heading in HTML and should represent the main topic of your page. It helps search engines understand page content hierarchy and is crucial for accessibility.",
        example: "<h1>Complete Guide to Running Shoes: How to Choose the Right Pair</h1>",
        exampleEl: "<h1>Πλήρης οδηγός για παπούτσια τρεξίματος: πώς να διαλέξετε το σωστό ζευγάρι</h1>",
        technique: "Use exactly one H1 per page, include your primary keyword, make it descriptive and different from your title tag, place it near the top of your content.",
        techniqueEl: "Χρησιμοποιήστε ακριβώς ένα H1 ανά σελίδα, με τη βασική λέξη-κλειδί. Κάντε το περιγραφικό και διαφορετικό από το title tag και τοποθετήστε το ψηλά στο περιεχόμενο.",
        proTip: "Your H1 should answer: 'What is this page about?' in a way that matches user search intent.",
        proTipEl: "Το H1 πρέπει να απαντά στο «για τι μιλάει αυτή η σελίδα;» με τρόπο που ταιριάζει με την πρόθεση αναζήτησης του χρήστη.",
        relatedTerms: ["heading-structure", "content-optimization", "semantic-html"],
        relatedLinks: [
          { title: "Heading Analyzer", url: "/free-tools/heading-analyzer", type: "tool" }
        ]
      },
      {
        id: "heading-structure",
        termEl: "Heading Structure (Δομή επικεφαλίδων)",
        shortDefinitionEl: "Η ιεραρχική οργάνωση των επικεφαλίδων H1-H6 που δομεί το περιεχόμενο μιας σελίδας.",
        fullDefinitionEl: "Η δομή επικεφαλίδων είναι η λογική ιεραρχία των επικεφαλίδων (από H1 έως H6) που οργανώνει το περιεχόμενο. Μια σωστή δομή κάνει το κείμενο πιο ευανάγνωστο και προσβάσιμο και βοηθά τις μηχανές αναζήτησης να καταλάβουν πώς συνδέονται τα θέματα μεταξύ τους.",
        term: "Heading Structure",
        shortDefinition: "The hierarchical organization of H1-H6 tags to structure page content.",
        fullDefinition: "Heading structure refers to the logical hierarchy of headings (H1 through H6) used to organize content. Proper heading structure improves readability, accessibility, and helps search engines understand content relationships.",
        example: "H1: Guide to SEO → H2: On-Page SEO → H3: Title Tags → H2: Off-Page SEO → H3: Link Building",
        exampleEl: "H1: Οδηγός SEO → H2: On-Page SEO → H3: Title tags → H2: Off-Page SEO → H3: Link building",
        technique: "Follow a logical hierarchy (never skip levels), use H2s for main sections, H3s for subsections. Include keywords naturally but prioritize readability.",
        techniqueEl: "Ακολουθήστε λογική ιεραρχία (χωρίς να πηδάτε επίπεδα): H2 για τις βασικές ενότητες, H3 για τις υποενότητες. Βάλτε λέξεις-κλειδιά όπου ταιριάζουν φυσικά, αλλά η αναγνωσιμότητα έρχεται πρώτη.",
        proTip: "Create a heading outline before writing content. It serves as your content roadmap and ensures logical flow.",
        proTipEl: "Φτιάξτε το σχεδιάγραμμα των επικεφαλίδων πριν γράψετε. Λειτουργεί ως οδικός χάρτης του κειμένου και εξασφαλίζει ότι η ροή βγάζει νόημα.",
        relatedTerms: ["h1-tag", "semantic-html", "content-optimization"],
        relatedLinks: [
          { title: "Heading Analyzer", url: "/free-tools/heading-analyzer", type: "tool" }
        ]
      },
      {
        id: "keyword-density",
        termEl: "Keyword Density (Πυκνότητα λέξης-κλειδιού)",
        shortDefinitionEl: "Το ποσοστό των φορών που εμφανίζεται μια λέξη-κλειδί σε σχέση με το σύνολο των λέξεων.",
        fullDefinitionEl: "Η πυκνότητα λέξης-κλειδιού είναι ο λόγος των εμφανίσεων μιας λέξης-κλειδιού προς τις συνολικές λέξεις της σελίδας, εκφρασμένος ως ποσοστό. Κάποτε μετρούσε πολύ, όμως το σύγχρονο SEO δίνει περισσότερη σημασία στη φυσική γλώσσα και τη σημασιολογική συνάφεια παρά σε συγκεκριμένους στόχους πυκνότητας.",
        term: "Keyword Density",
        shortDefinition: "The percentage of times a keyword appears compared to total word count.",
        fullDefinition: "Keyword density is the ratio of a target keyword's frequency to total words on a page, expressed as a percentage. While once important, modern SEO focuses more on natural language and semantic relevance than specific density targets.",
        example: "If 'running shoes' appears 10 times in a 1,000-word article, the keyword density is 1%.",
        exampleEl: "Αν η φράση «παπούτσια τρεξίματος» εμφανίζεται 10 φορές σε ένα άρθρο 1.000 λέξεων, η πυκνότητα είναι 1%.",
        technique: "Aim for 1-2% naturally, but focus on synonyms and related terms. Use your keyword in the first 100 words, in headings, and in the conclusion.",
        techniqueEl: "Στοχεύστε φυσικά στο 1-2%, αλλά δώστε βάρος σε συνώνυμα και συναφείς όρους. Χρησιμοποιήστε τη λέξη-κλειδί στις πρώτες 100 λέξεις, στις επικεφαλίδες και στο συμπέρασμα.",
        proTip: "If you have to force keywords in, you're overdoing it. Write for humans first, search engines second.",
        proTipEl: "Αν πρέπει να «χώσετε» τη λέξη-κλειδί με το ζόρι, το παρακάνετε. Γράψτε πρώτα για ανθρώπους και μετά για τις μηχανές αναζήτησης.",
        relatedTerms: ["keyword-stuffing", "lsi-keywords", "semantic-seo"],
        relatedLinks: [
          { title: "Keyword Density Checker", url: "/free-tools/keyword-density-checker", type: "tool" },
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" }
        ]
      },
      {
        id: "image-alt-text",
        termEl: "Image Alt Text (Εναλλακτικό κείμενο εικόνας)",
        shortDefinitionEl: "Περιγραφικό κείμενο για τις εικόνες που βοηθά τις μηχανές αναζήτησης και τους αναγνώστες οθόνης.",
        fullDefinitionEl: "Το alt text (εναλλακτικό κείμενο) είναι ένα HTML attribute που περιγράφει τι δείχνει μια εικόνα. Εξυπηρετεί τρεις σκοπούς: προσβασιμότητα για άτομα με προβλήματα όρασης, πλαίσιο για τις μηχανές αναζήτησης και κείμενο που εμφανίζεται όταν η εικόνα δεν φορτώνει.",
        term: "Image Alt Text",
        shortDefinition: "Descriptive text attribute for images that helps search engines and screen readers.",
        fullDefinition: "Alt text (alternative text) is an HTML attribute that describes the contents of an image. It serves three purposes: accessibility for visually impaired users, context for search engines, and fallback text when images fail to load.",
        example: "<img src=\"nike-air-max.jpg\" alt=\"Nike Air Max 2026 running shoes in black and white colorway\">",
        exampleEl: "<img src=\"nike-air-max.jpg\" alt=\"Παπούτσια τρεξίματος Nike Air Max 2026 σε ασπρόμαυρο χρώμα\">",
        technique: "Be descriptive and specific, include relevant keywords naturally, keep it under 125 characters, don't start with 'image of' or 'picture of'.",
        techniqueEl: "Να είστε περιγραφικοί και συγκεκριμένοι, να βάζετε σχετικές λέξεις-κλειδιά μόνο όπου ταιριάζουν φυσικά, να μένετε κάτω από 125 χαρακτήρες και να μην ξεκινάτε με «εικόνα του» ή «φωτογραφία του».",
        proTip: "Decorative images can use empty alt attributes (alt=\"\"). Don't describe images that don't add informational value.",
        proTipEl: "Οι διακοσμητικές εικόνες μπορούν να έχουν κενό alt (alt=\"\"). Μην περιγράφετε εικόνες που δεν προσθέτουν πληροφορία.",
        relatedTerms: ["image-seo", "accessibility", "technical-seo"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "internal-linking",
        termEl: "Internal Linking (Εσωτερική Διασύνδεση)",
        shortDefinitionEl: "Σύνδεσμοι μεταξύ σελίδων του ίδιου site που μοιράζουν αξία SEO και καθοδηγούν χρήστες και Google.",
        fullDefinitionEl: "Η εσωτερική διασύνδεση είναι οι σύνδεσμοι από μία σελίδα του site σας προς άλλη. Βοηθά τη Google να ανακαλύψει τις σελίδες σας, μεταφέρει «κύρος» στις σημαντικές σελίδες και κρατά τους επισκέπτες περισσότερο. Στρατηγική hub-and-spoke: οι κεντρικές σελίδες υπηρεσιών συνδέονται με τοπικές σελίδες και άρθρα, και αντίστροφα.",
        term: "Internal Linking",
        shortDefinition: "Hyperlinks connecting pages within the same website.",
        fullDefinition: "Internal linking is the practice of creating hyperlinks between pages on the same domain. It distributes page authority, helps users navigate, and enables search engines to discover and understand site structure and content relationships.",
        example: "A blog post about 'running techniques' links to your 'best running shoes' guide using descriptive anchor text.",
        exampleEl: "Ένα άρθρο στο blog για «τεχνικές τρεξίματος» παραπέμπει στον οδηγό σας «τα καλύτερα παπούτσια τρεξίματος» με περιγραφικό anchor text.",
        technique: "Use descriptive anchor text, link from high-authority pages to important pages, create topic clusters, add contextual links within content, maintain a shallow site architecture.",
        techniqueEl: "Χρησιμοποιήστε περιγραφικό anchor text, βάλτε συνδέσμους από ισχυρές σελίδες προς τις σημαντικές, φτιάξτε θεματικά clusters, προσθέστε συνδέσμους μέσα στο κείμενο και κρατήστε την αρχιτεκτονική της ιστοσελίδας ρηχή.",
        proTip: "Audit your orphan pages regularly. Pages with no internal links pointing to them are hard for search engines to find and rank.",
        proTipEl: "Ελέγχετε τακτικά για ορφανές σελίδες. Σελίδες χωρίς κανέναν εσωτερικό σύνδεσμο προς αυτές δύσκολα τις βρίσκουν και τις κατατάσσουν οι μηχανές αναζήτησης.",
        relatedTerms: ["anchor-text", "link-equity", "site-architecture", "topic-clusters"],
        relatedLinks: [
          { title: "Internal Linking Audit Checklist", url: "/blog/internal-linking-audit-checklist", type: "blog" }
        ]
      },
      {
        id: "content-optimization",
        termEl: "Content Optimization (Βελτιστοποίηση περιεχομένου)",
        shortDefinitionEl: "Η βελτίωση του περιεχομένου ώστε να κατατάσσεται καλύτερα και να καλύπτει την πρόθεση του χρήστη.",
        fullDefinitionEl: "Η βελτιστοποίηση περιεχομένου σημαίνει να βελτιώνετε το περιεχόμενο της ιστοσελίδας για καλύτερες κατατάξεις, μεγαλύτερη εμπλοκή των επισκεπτών και περισσότερες μετατροπές. Περιλαμβάνει την ενσωμάτωση λέξεων-κλειδιών, πιο ευανάγνωστο κείμενο, προσθήκη πολυμέσων και φροντίδα ώστε το περιεχόμενο να απαντά πλήρως σε ό,τι ψάχνει ο χρήστης.",
        term: "Content Optimization",
        shortDefinition: "The process of improving content to rank better and satisfy user intent.",
        fullDefinition: "Content optimization involves enhancing web content to improve search rankings, user engagement, and conversions. It includes keyword integration, readability improvements, multimedia addition, and ensuring content fully addresses user queries.",
        example: "Updating an old blog post with current statistics, adding an FAQ section, embedding relevant videos, and improving readability scores.",
        exampleEl: "Ανανεώνετε ένα παλιό άρθρο με τρέχοντα στατιστικά, προσθέτετε ενότητα συχνών ερωτήσεων, ενσωματώνετε σχετικά βίντεο και βελτιώνετε την αναγνωσιμότητα.",
        technique: "Cover topics comprehensively (10x content), answer related questions, use structured data, optimize for featured snippets, update content regularly.",
        techniqueEl: "Καλύψτε το θέμα σε βάθος (περιεχόμενο 10 φορές καλύτερο από των ανταγωνιστών), απαντήστε στις συναφείς ερωτήσεις, χρησιμοποιήστε structured data, στοχεύστε σε featured snippets και ανανεώνετε τακτικά το περιεχόμενο.",
        proTip: "Use the 'People Also Ask' boxes and related searches as inspiration for content sections and FAQs.",
        proTipEl: "Χρησιμοποιήστε τα πλαίσια People Also Ask και τις σχετικές αναζητήσεις ως έμπνευση για ενότητες και συχνές ερωτήσεις.",
        relatedTerms: ["content-freshness", "search-intent", "e-e-a-t"],
        relatedLinks: [
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" },
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    description: "Website infrastructure optimization for search engine crawling and indexing",
    icon: Settings,
    color: "purple",
    terms: [
      {
        id: "technical-seo-term",
        termEl: "Τεχνικό SEO",
        shortDefinitionEl: "Βελτιστοποίηση υποδομής site για crawl, index, ταχύτητα και structured data.",
        fullDefinitionEl: "Το τεχνικό SEO διασφαλίζει ότι η Google μπορεί να ανιχνεύσει και να ευρετηριάσει τις σελίδες σας: Core Web Vitals, mobile-first, HTTPS, sitemaps, robots.txt, canonicals και schema. Χωρίς αυτό, το καλύτερο περιεχόμενο δεν αποδίδει.",
        term: "Technical SEO",
        shortDefinition: "Improving site infrastructure for crawling, indexing, speed, and structured data.",
        fullDefinition: "Technical SEO ensures search engines can crawl and index your pages efficiently, Core Web Vitals, mobile-first, HTTPS, sitemaps, robots.txt, canonicals, and schema.",
        example: "Fixing 'Discovered, currently not indexed' URLs and improving LCP on mobile before launching a content blitz.",
        exampleEl: "Διορθώνετε τα URLs με κατάσταση «Discovered, currently not indexed» και βελτιώνετε το LCP σε κινητό πριν ξεκινήσετε μια μεγάλη καμπάνια περιεχομένου.",
        technique: "Audit crawl/index first, submit sitemaps, fix vitals, add relevant schema, keep internal links to money pages.",
        techniqueEl: "Ελέγξτε πρώτα crawl και indexing, υποβάλετε τα sitemaps, διορθώστε τα Core Web Vitals, προσθέστε το σχετικό schema και κρατήστε εσωτερικούς συνδέσμους προς τις σελίδες που φέρνουν έσοδα.",
        relatedTerms: ["crawling", "indexing", "core-web-vitals", "seo"],
        relatedLinks: [
          { title: "Τεχνικό SEO checklist", url: "/el/blog/techniko-seo", type: "blog" },
          { title: "SEO Audit", url: "/el/services/seo-audits", type: "feature" }
        ]
      },
      {
        id: "crawling",
        termEl: "Crawling (Ανίχνευση)",
        shortDefinitionEl: "Η διαδικασία όπου τα ρομπότ της Google ανακαλύπτουν και διαβάζουν τις σελίδες του ιστού.",
        fullDefinitionEl: "Crawling είναι η διαδικασία με την οποία τα προγράμματα της Google (Googlebot) επισκέπτονται σελίδες ακολουθώντας συνδέσμους και sitemaps. Αν μια σελίδα δεν ανιχνεύεται (μπλοκαρισμένη στο robots.txt, ορφανή χωρίς εσωτερικούς συνδέσμους, πολύ αργή), δεν μπορεί ποτέ να εμφανιστεί στα αποτελέσματα.",
        term: "Crawling",
        shortDefinition: "The process by which search engine bots discover and read web pages.",
        fullDefinition: "Crawling is the process where search engine bots (like Googlebot) systematically browse the web to discover new and updated content. Bots follow links, read content, and send data back to be indexed.",
        example: "Googlebot discovers your new blog post by following an internal link from your homepage, then reads and stores the content.",
        exampleEl: "Το Googlebot βρίσκει το νέο σας άρθρο ακολουθώντας έναν εσωτερικό σύνδεσμο από την αρχική σελίδα και στη συνέχεια διαβάζει και αποθηκεύει το περιεχόμενο.",
        technique: "Ensure a clear site structure, submit an XML sitemap, use internal linking, avoid crawl traps (infinite calendars, faceted navigation), and monitor crawl stats in GSC.",
        techniqueEl: "Φροντίστε για καθαρή δομή ιστοσελίδας, υποβάλετε XML sitemap, χρησιμοποιήστε εσωτερικούς συνδέσμους, αποφύγετε τις «παγίδες» crawl (ατελείωτα ημερολόγια, φίλτρα πλοήγησης με αμέτρητους συνδυασμούς) και παρακολουθείτε τα crawl stats στο Search Console.",
        proTip: "Check Server Logs to see exactly what Googlebot is crawling. GSC's crawl stats only show aggregates.",
        proTipEl: "Ελέγξτε τα server logs για να δείτε ακριβώς τι κάνει crawl το Googlebot. Τα crawl stats του Search Console δείχνουν μόνο συγκεντρωτικά στοιχεία.",
        relatedTerms: ["indexing", "robots-txt", "xml-sitemap", "crawl-budget"],
        relatedLinks: [
          { title: "Technical SEO Guide", url: "/blog/technical-seo-guide", type: "blog" },
          { title: "Site audit in AnotherSEOGuru App", url: "/platform/features#audit", type: "feature" }
        ]
      },
      {
        id: "indexing",
        termEl: "Indexing (Ευρετηρίαση)",
        shortDefinitionEl: "Η αποθήκευση μιας σελίδας στο ευρετήριο της Google ώστε να μπορεί να εμφανιστεί στα αποτελέσματα.",
        fullDefinitionEl: "Μετά το crawl, η Google αποφασίζει αν θα αποθηκεύσει τη σελίδα στο ευρετήριό της. Σελίδες με λεπτό ή διπλότυπο περιεχόμενο, noindex ή τεχνικά προβλήματα μένουν εκτός - άρα αόρατες. Ελέγξτε την κατάσταση ευρετηρίασης στο Google Search Console (Coverage / Ευρετηρίαση σελίδων).",
        term: "Indexing",
        shortDefinition: "The process of storing and organizing crawled pages in search engine databases.",
        fullDefinition: "After crawling, search engines process and store page content in their index (a massive database). Only indexed pages can appear in search results. Indexing involves analyzing content, understanding topics, and determining relevance.",
        example: "After Googlebot crawls your page, it gets processed and added to Google's index within hours to weeks, depending on site authority.",
        exampleEl: "Αφού το Googlebot κάνει crawl τη σελίδα σας, η Google την επεξεργάζεται και την προσθέτει στο ευρετήριό της μέσα σε λίγες ώρες έως μερικές εβδομάδες, ανάλογα με το κύρος του site.",
        technique: "Use the URL Inspection tool in GSC to check indexing status, request indexing for important pages, avoid duplicate content, and ensure pages are crawlable.",
        techniqueEl: "Χρησιμοποιήστε το εργαλείο URL Inspection στο Search Console για να ελέγξετε την κατάσταση ευρετηρίασης, ζητήστε ευρετηρίαση για τις σημαντικές σελίδες, αποφύγετε το διπλότυπο περιεχόμενο και βεβαιωθείτε ότι οι σελίδες επιτρέπουν crawl.",
        proTip: "A page being crawled doesn't guarantee indexing. Low-quality or duplicate content may be crawled but not indexed.",
        proTipEl: "Το ότι μια σελίδα έγινε crawl δεν εγγυάται ότι θα μπει στο ευρετήριο. Το χαμηλής ποιότητας ή διπλότυπο περιεχόμενο μπορεί να γίνει crawl αλλά να μην ευρετηριαστεί.",
        relatedTerms: ["crawling", "de-indexing", "index-bloat", "canonical-tag"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "robots-txt",
        termEl: "Robots.txt",
        shortDefinitionEl: "Αρχείο που λέει στις μηχανές αναζήτησης ποια σημεία του site επιτρέπεται να ανιχνεύσουν.",
        fullDefinitionEl: "Το robots.txt είναι ένα απλό αρχείο κειμένου στη ρίζα του site (π.χ. anotherseoguru.com/robots.txt) που δίνει οδηγίες στα ρομπότ: τι να ανιχνεύσουν και τι όχι. Προσοχή: ένα λάθος Disallow μπορεί να εξαφανίσει ολόκληρο site από τη Google - από τα πρώτα πράγματα που ελέγχουμε σε κάθε τεχνικό audit.",
        term: "Robots.txt",
        shortDefinition: "A file that instructs search engine crawlers which pages to crawl or avoid.",
        fullDefinition: "Robots.txt is a text file placed in your site's root directory that tells search engine crawlers which URLs they can and cannot access. It's used to manage crawl budget and prevent indexing of certain content.",
        example: "User-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: /public/\nSitemap: https://example.com/sitemap.xml",
        exampleEl: "User-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: /public/\nSitemap: https://example.com/sitemap.xml",
        technique: "Block admin pages, staging environments, search results pages, and low-value filter/sort URLs. Always allow CSS/JS files. Include sitemap location.",
        techniqueEl: "Μπλοκάρετε σελίδες διαχείρισης, δοκιμαστικά περιβάλλοντα (staging), σελίδες εσωτερικής αναζήτησης και URLs φίλτρων και ταξινόμησης χωρίς αξία. Αφήνετε πάντα ελεύθερα τα αρχεία CSS και JS. Δηλώστε τη θέση του sitemap.",
        proTip: "Robots.txt blocks crawling, not indexing. If pages have external links pointing to them, they can still appear in search results.",
        proTipEl: "Το robots.txt μπλοκάρει το crawl, όχι την ευρετηρίαση. Αν άλλα sites παραπέμπουν σε αυτές τις σελίδες, μπορούν να εμφανιστούν στα αποτελέσματα.",
        relatedTerms: ["crawling", "noindex", "crawl-budget"],
        relatedLinks: [
          { title: "Robots.txt Generator", url: "/free-tools/robots-txt-generator", type: "tool" }
        ]
      },
      {
        id: "xml-sitemap",
        termEl: "XML Sitemap (Χάρτης Ιστοσελίδας)",
        shortDefinitionEl: "Αρχείο που απαριθμεί όλες τις σημαντικές σελίδες του site για τις μηχανές αναζήτησης.",
        fullDefinitionEl: "Το XML sitemap είναι ο «κατάλογος» των σελίδων που θέλετε να ευρετηριάσει η Google, με πληροφορίες όπως ημερομηνία τελευταίας αλλαγής. Υποβάλλεται στο Google Search Console και είναι ιδιαίτερα σημαντικό για μεγάλα sites, e-shop και νέες ιστοσελίδες χωρίς πολλά backlinks.",
        term: "XML Sitemap",
        shortDefinition: "A file listing important URLs to help search engines discover and crawl content.",
        fullDefinition: "An XML sitemap is a structured file that lists the URLs on your website you want search engines to crawl and index. It includes metadata like last modification date, change frequency, and priority.",
        example: "<?xml version=\"1.0\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>https://example.com/page</loc>\n    <lastmod>2026-01-15</lastmod>\n  </url>\n</urlset>",
        exampleEl: "<?xml version=\"1.0\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url>\n    <loc>https://example.com/page</loc>\n    <lastmod>2026-01-15</lastmod>\n  </url>\n</urlset>",
        technique: "Include only indexable pages, keep under 50MB or 50,000 URLs, update lastmod only when content changes, submit to GSC, and split large sitemaps.",
        techniqueEl: "Βάλτε μόνο σελίδες που μπορούν να ευρετηριαστούν, μείνετε κάτω από 50MB ή 50.000 URLs ανά αρχείο, αλλάζετε το lastmod μόνο όταν αλλάζει πραγματικά το περιεχόμενο, υποβάλετε το sitemap στο Search Console και χωρίστε τα μεγάλα sitemaps σε μικρότερα.",
        proTip: "Monitor 'Sitemap' report in GSC. If submitted URLs don't match indexed URLs, investigate why pages are being excluded.",
        proTipEl: "Παρακολουθείτε την αναφορά Sitemaps στο Search Console. Αν τα URLs που υποβάλατε δεν συμφωνούν με όσα έχουν ευρετηριαστεί, ψάξτε γιατί εξαιρούνται σελίδες.",
        relatedTerms: ["crawling", "indexing", "robots-txt"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "canonical-tag",
        termEl: "Canonical Tag (Κανονική Διεύθυνση)",
        shortDefinitionEl: "HTML ετικέτα που δηλώνει την «επίσημη» έκδοση μιας σελίδας όταν υπάρχει παρόμοιο περιεχόμενο.",
        fullDefinitionEl: "Το canonical tag (rel=\"canonical\") λέει στη Google ποια έκδοση μιας σελίδας είναι η κύρια όταν το ίδιο ή παρόμοιο περιεχόμενο υπάρχει σε πολλά URLs (π.χ. με παραμέτρους, φίλτρα e-shop). Χωρίς σωστά canonicals, η αξία της σελίδας μοιράζεται σε διπλότυπα και οι κατατάξεις υποφέρουν.",
        term: "Canonical Tag",
        shortDefinition: "HTML element that specifies the preferred version of a page to avoid duplicate content.",
        fullDefinition: "A canonical tag (rel=\"canonical\") is an HTML element that tells search engines which URL is the 'master' version when multiple pages have similar or identical content. It consolidates ranking signals to the preferred URL.",
        example: "<link rel=\"canonical\" href=\"https://www.example.com/products/shoes\" />",
        exampleEl: "<link rel=\"canonical\" href=\"https://www.example.com/products/shoes\" />",
        technique: "Self-reference canonicals on every page, point duplicates to the original, use absolute URLs, ensure canonical pages are indexable and match the content.",
        techniqueEl: "Βάλτε self-referencing canonical σε κάθε σελίδα, δείξτε από τα διπλότυπα προς το πρωτότυπο, χρησιμοποιήστε απόλυτα URLs και βεβαιωθείτε ότι οι canonical σελίδες μπορούν να ευρετηριαστούν και έχουν το ίδιο περιεχόμενο.",
        proTip: "Check that your canonical points to the version you want to rank (https vs http, www vs non-www, with/without trailing slash).",
        proTipEl: "Ελέγξτε ότι το canonical δείχνει στην έκδοση που θέλετε να κατατάσσεται (https ή http, με ή χωρίς www, με ή χωρίς κάθετο στο τέλος).",
        relatedTerms: ["duplicate-content", "indexing", "url-normalization"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "structured-data",
        termEl: "Structured Data (Δομημένα Δεδομένα)",
        shortDefinitionEl: "Κώδικας schema.org που βοηθά Google και AI να καταλάβουν το περιεχόμενο και δίνει πλούσια αποτελέσματα.",
        fullDefinitionEl: "Τα structured data (JSON-LD schema) περιγράφουν το περιεχόμενο με τυποποιημένο τρόπο: επιχείρηση, προϊόν, FAQ, άρθρο, κριτικές. Ξεκλειδώνουν πλούσια αποτελέσματα (αστέρια, τιμές, FAQ) στη Google και είναι θεμέλιο για την ορατότητα σε AI μηχανές (GEO/AEO).",
        term: "Structured Data (Schema)",
        shortDefinition: "Code markup that helps search engines understand page content and enables rich results.",
        fullDefinition: "Structured data is a standardized format (typically JSON-LD) for providing explicit information about a page's content. It helps search engines understand entities, relationships, and can trigger rich results like stars, FAQs, and product info in SERPs.",
        example: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\",\n  \"headline\": \"SEO Guide\",\n  \"author\": {\"@type\": \"Person\", \"name\": \"John Doe\"}\n}",
        exampleEl: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\",\n  \"headline\": \"Οδηγός SEO\",\n  \"author\": {\"@type\": \"Person\", \"name\": \"Γιάννης Παπαδόπουλος\"}\n}",
        technique: "Use JSON-LD format, validate with Google's Rich Results Test, implement relevant schema types (Article, Product, FAQ, HowTo), avoid spammy markup.",
        techniqueEl: "Χρησιμοποιήστε JSON-LD, ελέγξτε τον κώδικα με το Rich Results Test της Google, εφαρμόστε τους τύπους schema που ταιριάζουν (Article, Product, FAQ, HowTo) και αποφύγετε το παραπλανητικό markup.",
        proTip: "Not all schema types trigger rich results. Focus on types Google explicitly supports and documents.",
        proTipEl: "Δεν βγάζουν όλοι οι τύποι schema rich results. Εστιάστε στους τύπους που η Google υποστηρίζει και τεκμηριώνει ρητά.",
        relatedTerms: ["rich-snippets", "serp-features", "json-ld"],
        relatedLinks: [
          { title: "Schema Generator", url: "/free-tools/schema-generator", type: "tool" }
        ]
      },
      {
        id: "https",
        termEl: "HTTPS",
        shortDefinitionEl: "Η ασφαλής έκδοση του HTTP, που κρυπτογραφεί τα δεδομένα μεταξύ browser και server.",
        fullDefinitionEl: "Το HTTPS (Hypertext Transfer Protocol Secure) κρυπτογραφεί τα δεδομένα που ανταλλάσσονται ανάμεσα στον browser του χρήστη και στον server σας. Είναι επιβεβαιωμένος παράγοντας κατάταξης της Google και απαραίτητο για την εμπιστοσύνη των επισκεπτών, ειδικά σε sites που διαχειρίζονται ευαίσθητα στοιχεία.",
        term: "HTTPS",
        shortDefinition: "Secure version of HTTP that encrypts data between browser and server.",
        fullDefinition: "HTTPS (Hypertext Transfer Protocol Secure) encrypts data transmitted between a user's browser and your web server. It's a confirmed Google ranking factor and essential for user trust, especially for sites handling sensitive information.",
        example: "https://www.example.com (secure) vs http://www.example.com (not secure)",
        exampleEl: "https://www.example.com (ασφαλές) έναντι http://www.example.com (μη ασφαλές)",
        technique: "Get an SSL certificate (free via Let's Encrypt), redirect all HTTP to HTTPS, update internal links, update sitemap and canonical tags, check for mixed content.",
        techniqueEl: "Αποκτήστε πιστοποιητικό SSL (δωρεάν μέσω Let's Encrypt), ανακατευθύνετε όλο το HTTP σε HTTPS, ενημερώστε τους εσωτερικούς συνδέσμους, το sitemap και τα canonical tags και ελέγξτε για mixed content.",
        proTip: "After migrating to HTTPS, monitor GSC for both versions for a few months to catch any issues.",
        proTipEl: "Μετά τη μετάβαση σε HTTPS, παρακολουθείτε και τις δύο εκδόσεις στο Search Console για μερικούς μήνες, ώστε να εντοπίσετε τυχόν προβλήματα.",
        relatedTerms: ["ssl-certificate", "site-security", "migration"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "hreflang",
        termEl: "Hreflang",
        shortDefinitionEl: "Ετικέτα που δηλώνει τη γλώσσα και τη χώρα-στόχο κάθε έκδοσης μιας πολυγλωσσικής σελίδας.",
        fullDefinitionEl: "Το hreflang λέει στη Google ποια γλωσσική έκδοση να δείξει σε κάθε χρήστη - π.χ. τα ελληνικά (/el) σε αναζητήσεις από Ελλάδα και τα αγγλικά (/en) διεθνώς. Κρίσιμο για τουριστικά sites: λάθος hreflang σημαίνει λάθος γλώσσα στα αποτελέσματα ή σελίδες που ανταγωνίζονται η μία την άλλη.",
        term: "Hreflang",
        shortDefinition: "HTML attribute that specifies language and regional targeting for international pages.",
        fullDefinition: "Hreflang is an HTML attribute that tells search engines which language and regional version of a page to show users based on their location and language preferences. Essential for international and multilingual websites.",
        example: "<link rel=\"alternate\" hreflang=\"en-us\" href=\"https://example.com/en-us/page\" />\n<link rel=\"alternate\" hreflang=\"es\" href=\"https://example.com/es/page\" />",
        exampleEl: "<link rel=\"alternate\" hreflang=\"en-us\" href=\"https://example.com/en-us/page\" />\n<link rel=\"alternate\" hreflang=\"es\" href=\"https://example.com/es/page\" />",
        technique: "Include self-referencing hreflang, ensure bidirectional references, use correct language/region codes, implement via HTML head, HTTP headers, or sitemap.",
        techniqueEl: "Βάλτε self-referencing hreflang, φροντίστε οι αναφορές να είναι αμφίδρομες, χρησιμοποιήστε σωστούς κωδικούς γλώσσας και περιοχής και υλοποιήστε το μέσω του HTML head, των HTTP headers ή του sitemap.",
        proTip: "Always include an x-default hreflang for users who don't match any specified language/region combination.",
        proTipEl: "Προσθέτετε πάντα ένα x-default hreflang για τους χρήστες που δεν ταιριάζουν σε κανέναν από τους συνδυασμούς γλώσσας και περιοχής που ορίσατε.",
        relatedTerms: ["international-seo", "geo-targeting", "language-targeting"],
        relatedLinks: [
          { title: "Technical SEO Guide (hreflang)", url: "/blog/technical-seo-guide", type: "blog" },
          { title: "Hreflang Builder", url: "/free-tools/hreflang-builder", type: "tool" }
        ]
      },
      {
        id: "page-speed",
        termEl: "Page Speed (Ταχύτητα Σελίδας)",
        shortDefinitionEl: "Πόσο γρήγορα φορτώνει μια σελίδα. Είναι παράγοντας κατάταξης και καθοριστικός για τις μετατροπές.",
        fullDefinitionEl: "Η ταχύτητα σελίδας μετριέται με τα Core Web Vitals της Google (LCP, INP, CLS). Επηρεάζει άμεσα τις κατατάξεις και ακόμα περισσότερο τις πωλήσεις: κάθε δευτερόλεπτο καθυστέρησης κοστίζει επισκέπτες. Ελέγξτε το site σας στο PageSpeed Insights - κάτω από 2,5s LCP σε κινητό είναι ο στόχος.",
        term: "Page Speed",
        shortDefinition: "How fast a web page loads, affecting user experience and search rankings.",
        fullDefinition: "Page speed measures how quickly the content on a URL loads. It's a ranking factor for both desktop and mobile search, and significantly impacts user experience, bounce rates, and conversions.",
        example: "A page with 2-second load time typically has 9% bounce rate; a 5-second load time increases bounce to 38%.",
        exampleEl: "Μια σελίδα που φορτώνει σε 2 δευτερόλεπτα έχει συνήθως bounce rate 9%. Στα 5 δευτερόλεπτα το bounce rate ανεβαίνει στο 38%.",
        technique: "Optimize images (WebP format, lazy loading), minify CSS/JS, enable compression, use CDN, reduce server response time, eliminate render-blocking resources.",
        techniqueEl: "Βελτιστοποιήστε τις εικόνες (μορφή WebP, lazy loading), συμπιέστε (minify) CSS και JS, ενεργοποιήστε τη συμπίεση, χρησιμοποιήστε CDN, μειώστε τον χρόνο απόκρισης του server και αφαιρέστε τους πόρους που μπλοκάρουν την απόδοση της σελίδας.",
        proTip: "Focus on perceived performance. Users care about when they can interact with content, not just when everything finishes loading.",
        proTipEl: "Εστιάστε στην ταχύτητα που αντιλαμβάνεται ο χρήστης. Τον ενδιαφέρει πότε μπορεί να αλληλεπιδράσει με το περιεχόμενο, όχι μόνο πότε τελειώνει να φορτώνει το καθετί.",
        relatedTerms: ["core-web-vitals", "lcp", "fid", "cls"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "mobile-first-indexing",
        termEl: "Mobile-First Indexing",
        shortDefinitionEl: "Η πρακτική της Google να χρησιμοποιεί την έκδοση για κινητά ενός site για ευρετηρίαση και κατάταξη.",
        fullDefinitionEl: "Mobile-first indexing σημαίνει ότι η Google χρησιμοποιεί κυρίως την έκδοση για κινητά του περιεχομένου σας για να το ευρετηριάσει και να το κατατάξει. Αντανακλά το ότι οι περισσότεροι χρήστες πλέον μπαίνουν στο διαδίκτυο από κινητό.",
        term: "Mobile-First Indexing",
        shortDefinition: "Google's practice of using the mobile version of a site for indexing and ranking.",
        fullDefinition: "Mobile-first indexing means Google predominantly uses the mobile version of content for indexing and ranking. This reflects how most users now access the web via mobile devices.",
        example: "If your mobile site has less content than desktop, Google will only see and index the mobile content, potentially hurting rankings.",
        exampleEl: "Αν η έκδοση για κινητά έχει λιγότερο περιεχόμενο από την έκδοση για υπολογιστή, η Google θα δει και θα ευρετηριάσει μόνο το περιεχόμενο του κινητού, κάτι που μπορεί να ρίξει τις κατατάξεις σας.",
        technique: "Ensure mobile and desktop have the same content, use responsive design, check mobile usability in GSC, test with Mobile-Friendly Test tool.",
        techniqueEl: "Βεβαιωθείτε ότι κινητό και υπολογιστής έχουν το ίδιο περιεχόμενο, χρησιμοποιήστε σχεδιασμό προσαρμοσμένο σε όλες τις οθόνες, ελέγξτε τη χρηστικότητα σε κινητά στο Search Console και κάντε δοκιμή με το εργαλείο Mobile-Friendly Test.",
        proTip: "Check the User-Agent string in your server logs. If you see 'Googlebot-Mobile', that's what's indexing your site.",
        proTipEl: "Ελέγξτε το User-Agent στα server logs σας. Αν βλέπετε «Googlebot-Mobile», αυτό είναι που ευρετηριάζει το site σας.",
        relatedTerms: ["responsive-design", "mobile-usability", "page-speed"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "link-building",
    title: "Link Building",
    description: "Strategies for acquiring quality backlinks from other websites",
    icon: Link2,
    color: "green",
    terms: [
      {
        id: "off-page-seo",
        termEl: "Off-Page SEO",
        shortDefinitionEl: "Σήματα αξιοπιστίας έξω από το site σας, κυρίως ποιοτικά backlinks και brand mentions.",
        fullDefinitionEl: "Το off-page SEO καλύπτει παράγοντες εκτός της ιστοσελίδας σας που επηρεάζουν την κατάταξη: backlinks, mentions, φήμη και digital PR. Στην Ελλάδα προτιμήστε συνάφεια και ποιότητα αντί για μαζικά spam directories.",
        term: "Off-Page SEO",
        shortDefinition: "Ranking signals earned outside your website, mainly backlinks and brand mentions.",
        fullDefinition: "Off-page SEO covers external trust signals, backlinks, mentions, reputation, and digital PR, that influence rankings beyond what you control on your own pages.",
        example: "An industry blog linking to your Greek SEO guide with a natural editorial mention.",
        exampleEl: "Ένα κλαδικό blog παραπέμπει στον ελληνικό σας οδηγό SEO με μια φυσική, συντακτική αναφορά.",
        technique: "Earn relevant editorial links, diversify anchors, pair with strong on-page pages, avoid PBNs and bulk paid links.",
        techniqueEl: "Κερδίστε σχετικούς συντακτικούς συνδέσμους, διαφοροποιήστε τα anchors, συνδυάστε τα με δυνατές σελίδες on-page και αποφύγετε τα PBNs και τους μαζικούς πληρωμένους συνδέσμους.",
        relatedTerms: ["backlink", "anchor-text", "seo"],
        relatedLinks: [
          { title: "Off-Page SEO οδηγός", url: "/el/blog/off-page-seo", type: "blog" },
          { title: "Link Building", url: "/el/services/link-building", type: "feature" }
        ]
      },
      {
        id: "backlink",
        termEl: "Backlink (Εισερχόμενος Σύνδεσμος)",
        shortDefinitionEl: "Σύνδεσμος από άλλο site προς το δικό σας, που η Google διαβάζει ως «ψήφο εμπιστοσύνης».",
        fullDefinitionEl: "Backlink είναι κάθε σύνδεσμος από ξένο site προς το δικό σας. Η Google τον διαβάζει ως ψήφο αξιοπιστίας: ποιοτικά backlinks από σχετικά, έγκυρα sites ανεβάζουν τις κατατάξεις. Ποιότητα πάνω από ποσότητα - ένας σύνδεσμος από κλαδικό μέσο αξίζει περισσότερο από εκατοντάδες σπαμ καταχωρήσεις, που μπορεί και να βλάψουν.",
        term: "Backlink",
        shortDefinition: "A link from one website to another, signaling trust and authority.",
        fullDefinition: "A backlink (also called inbound link or incoming link) is a hyperlink from one website to another. Search engines view backlinks as votes of confidence, using them as a key ranking factor to determine page authority and relevance.",
        example: "A tech blog linking to your software review: '<a href=\"https://yoursite.com/review\">Check out this detailed review</a>'",
        exampleEl: "Ένα τεχνολογικό blog παραπέμπει στην κριτική σας για ένα λογισμικό: '<a href=\"https://yoursite.com/review\">Δείτε αυτή την αναλυτική κριτική</a>'",
        technique: "Focus on earning links from high-authority, relevant sites. Create linkable assets (studies, tools, guides), do outreach, guest post strategically, and build relationships in your niche.",
        techniqueEl: "Εστιάστε σε συνδέσμους από έγκυρα, σχετικά sites. Δημιουργήστε περιεχόμενο που αξίζει να πάρει συνδέσμους (έρευνες, εργαλεία, οδηγούς), κάντε outreach, γράψτε guest posts με στρατηγική και χτίστε σχέσεις μέσα στον κλάδο σας.",
        proTip: "One link from a high-authority site in your niche is worth more than 100 links from random low-quality sites.",
        proTipEl: "Ένας σύνδεσμος από ένα έγκυρο site του κλάδου σας αξίζει περισσότερο από 100 συνδέσμους από τυχαία sites χαμηλής ποιότητας.",
        relatedTerms: ["anchor-text", "domain-authority", "link-equity", "dofollow"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" },
          { title: "Link Velocity Tracker", url: "/features/link-velocity-tracker", type: "feature" }
        ]
      },
      {
        id: "anchor-text",
        termEl: "Anchor Text (Κείμενο Συνδέσμου)",
        shortDefinitionEl: "Το ορατό κείμενο ενός συνδέσμου, πάνω στο οποίο πατάει ο χρήστης. Λειτουργεί ως σήμα για το θέμα της σελίδας που ανοίγει.",
        fullDefinitionEl: "Το anchor text είναι οι λέξεις πάνω στις οποίες πατάει ο χρήστης. Η Google το χρησιμοποιεί για να καταλάβει το θέμα της σελίδας-στόχου: το «κατασκευή ιστοσελίδων Αθήνα» ως anchor λέει πολύ περισσότερα από το «δείτε εδώ». Στα εξωτερικά links, η υπερβολική χρήση ακριβούς λέξης-κλειδιού μοιάζει χειραγώγηση - χρειάζεται φυσική ποικιλία.",
        term: "Anchor Text",
        shortDefinition: "The visible, clickable text in a hyperlink.",
        fullDefinition: "Anchor text is the visible, clickable text of a hyperlink that provides context about the linked page's content. Search engines use anchor text to understand what the destination page is about.",
        example: "In 'Read our <a href=\"/guide\">complete SEO guide</a>', the anchor text is 'complete SEO guide'.",
        exampleEl: "Στη φράση «Διαβάστε τον <a href=\"/guide\">πλήρη οδηγό SEO</a>», το anchor text είναι «πλήρη οδηγό SEO».",
        technique: "Use varied, natural anchor text. Mix branded, exact-match, partial-match, and generic anchors. Avoid over-optimized anchor text which looks manipulative.",
        techniqueEl: "Χρησιμοποιήστε ποικίλο, φυσικό anchor text. Συνδυάστε anchors με το όνομα της επιχείρησης, με ακριβή λέξη-κλειδί, με μέρος της λέξης-κλειδιού και γενικά anchors. Αποφύγετε το υπερβελτιστοποιημένο anchor text, που μοιάζει με χειραγώγηση.",
        proTip: "An unnatural anchor text profile (too many exact-match keywords) is a red flag for Google's spam algorithms.",
        proTipEl: "Ένα αφύσικο προφίλ anchor text (πάρα πολλές ακριβείς λέξεις-κλειδιά) είναι καμπανάκι για τους αλγορίθμους spam της Google.",
        relatedTerms: ["backlink", "internal-linking", "link-building"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "domain-authority",
        termEl: "Domain Authority (Κύρος Domain)",
        shortDefinitionEl: "Μετρική (0-100) που εκτιμά τη συνολική δύναμη ενός domain στις κατατάξεις.",
        fullDefinitionEl: "Το Domain Authority και οι παρόμοιες μετρικές «δύναμης domain» εκτιμούν πόσο «δυνατό» είναι ένα site με βάση το προφίλ των backlinks του. Δεν είναι επίσημη μετρική της Google, αλλά χρήσιμος δείκτης σύγκρισης με ανταγωνιστές και αξιολόγησης ευκαιριών για guest posts και συνεργασίες.",
        term: "Domain Authority (DA)",
        shortDefinition: "A metric predicting a website's ability to rank, based on its backlink profile.",
        fullDefinition: "Domain Authority is a third-party score that estimates how likely a website is to rank in search results. It's calculated based on the quantity and quality of backlinks, scored from 1-100.",
        example: "Wikipedia has DA 100, while a new blog might have DA 10-20. Higher DA sites pass more value when linking to you.",
        exampleEl: "Η Wikipedia έχει DA 100, ενώ ένα καινούριο blog μπορεί να έχει DA 10-20. Όταν σας παραπέμπουν sites με υψηλότερο DA, μεταφέρουν περισσότερη αξία.",
        technique: "Build DA by earning quality backlinks, creating valuable content, and maintaining a clean link profile. Focus on your niche authority rather than raw DA numbers.",
        techniqueEl: "Ανεβάστε το DA κερδίζοντας ποιοτικά backlinks, δημιουργώντας περιεχόμενο με αξία και διατηρώντας καθαρό προφίλ συνδέσμων. Εστιάστε στο κύρος σας μέσα στον κλάδο, όχι στον σκέτο αριθμό DA.",
        proTip: "DA is a third-party metric, not a Google ranking factor. Use it comparatively within your niche, not as an absolute target.",
        proTipEl: "Το DA είναι μετρική τρίτων, όχι παράγοντας κατάταξης της Google. Χρησιμοποιήστε το για σύγκριση μέσα στον κλάδο σας, όχι ως απόλυτο στόχο.",
        relatedTerms: ["page-authority", "backlink", "link-equity"],
        relatedLinks: [
          { title: "Competitor Analysis", url: "/features/competitor-analysis", type: "feature" }
        ]
      },
      {
        id: "link-equity",
        termEl: "Link Equity (Link Juice)",
        shortDefinitionEl: "Η αξία κατάταξης που μεταφέρεται από μια σελίδα σε άλλη μέσω συνδέσμων.",
        fullDefinitionEl: "Το link equity (στην καθομιλουμένη «link juice») είναι η αξία και το κύρος που μεταφέρει ένας σύνδεσμος από μια σελίδα σε άλλη. Επηρεάζεται από το κύρος της σελίδας που δίνει τον σύνδεσμο, τη συνάφεια, τη θέση του συνδέσμου και το anchor text.",
        term: "Link Equity (Link Juice)",
        shortDefinition: "The ranking value passed from one page to another through hyperlinks.",
        fullDefinition: "Link equity (colloquially 'link juice') refers to the value and authority that a hyperlink passes from one page to another. Factors affecting link equity include the linking page's authority, relevance, link placement, and anchor text.",
        example: "A dofollow link from a high-authority homepage passes more equity than a nofollow link buried in a footer.",
        exampleEl: "Ένας dofollow σύνδεσμος από την αρχική σελίδα ενός έγκυρου site μεταφέρει περισσότερο equity από έναν nofollow σύνδεσμο κρυμμένο στο footer.",
        technique: "Earn links from high-authority pages, ensure links are dofollow, get contextual links (within content), and build relevance between linking and linked pages.",
        techniqueEl: "Κερδίστε συνδέσμους από ισχυρές σελίδες, βεβαιωθείτε ότι είναι dofollow, επιδιώξτε συνδέσμους μέσα στο κείμενο και φροντίστε να υπάρχει θεματική συνάφεια ανάμεσα στη σελίδα που δίνει και σε αυτή που παίρνει τον σύνδεσμο.",
        proTip: "Links from pages with fewer outbound links pass more equity per link. A page linking to 3 sites passes more per link than one linking to 100.",
        proTipEl: "Οι σελίδες με λιγότερους εξερχόμενους συνδέσμους μεταφέρουν περισσότερο equity ανά σύνδεσμο. Μια σελίδα που παραπέμπει σε 3 sites δίνει περισσότερα ανά σύνδεσμο από μια που παραπέμπει σε 100.",
        relatedTerms: ["backlink", "dofollow", "nofollow", "pagerank"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "dofollow",
        termEl: "Dofollow Link",
        shortDefinitionEl: "Σύνδεσμος που μεταφέρει αξία SEO και κύρος στη σελίδα στην οποία παραπέμπει.",
        fullDefinitionEl: "Dofollow είναι ο σύνδεσμος που επιτρέπει στους crawlers των μηχανών αναζήτησης να τον ακολουθήσουν και να μεταφέρουν link equity (αξία κατάταξης) στη σελίδα-στόχο. Από προεπιλογή όλοι οι σύνδεσμοι είναι dofollow, εκτός αν οριστεί κάτι άλλο.",
        term: "Dofollow Link",
        shortDefinition: "A link that passes SEO value and authority to the destination page.",
        fullDefinition: "A dofollow link is a hyperlink that allows search engine crawlers to follow it and pass link equity (ranking value) to the linked page. By default, all links are dofollow unless specified otherwise.",
        example: "A standard HTML link: <a href=\"https://example.com\">Link Text</a> (dofollow by default)",
        exampleEl: "Ένας απλός σύνδεσμος HTML: <a href=\"https://example.com\">Κείμενο</a> (dofollow από προεπιλογή)",
        technique: "Prioritize earning dofollow links from authoritative sites, but maintain a natural link profile that includes nofollow links too (from social media, forums, etc.).",
        techniqueEl: "Δώστε προτεραιότητα σε dofollow συνδέσμους από έγκυρα sites, αλλά κρατήστε ένα φυσικό προφίλ που περιλαμβάνει και nofollow συνδέσμους (από social media, φόρουμ κ.λπ.).",
        proTip: "A healthy backlink profile has a mix of dofollow and nofollow links. 100% dofollow looks unnatural.",
        proTipEl: "Ένα υγιές προφίλ backlinks έχει μείγμα dofollow και nofollow συνδέσμων. Το 100% dofollow δείχνει αφύσικο.",
        relatedTerms: ["nofollow", "link-equity", "backlink"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "nofollow",
        termEl: "Nofollow Link",
        shortDefinitionEl: "Σύνδεσμος με attribute που λέει στις μηχανές αναζήτησης να μη μεταφέρουν αξία κατάταξης.",
        fullDefinitionEl: "Ο nofollow σύνδεσμος έχει το attribute rel='nofollow', που λέει στις μηχανές αναζήτησης να μην ακολουθήσουν τον σύνδεσμο και να μη μεταφέρουν link equity. Χρησιμοποιείται συνήθως σε πληρωμένους συνδέσμους, σε περιεχόμενο που γράφουν οι χρήστες και σε πηγές που δεν εμπιστεύεστε.",
        term: "Nofollow Link",
        shortDefinition: "A link with an attribute telling search engines not to pass ranking value.",
        fullDefinition: "A nofollow link includes the rel='nofollow' attribute, which tells search engines not to follow the link or pass link equity. Commonly used for paid links, user-generated content, and untrusted sources.",
        example: "<a href=\"https://example.com\" rel=\"nofollow\">Sponsored Link</a>",
        exampleEl: "<a href=\"https://example.com\" rel=\"nofollow\">Χορηγούμενος σύνδεσμος</a>",
        technique: "Use nofollow for: paid/sponsored links, user-generated content (comments, forums), affiliate links, and any links you don't want to vouch for.",
        techniqueEl: "Χρησιμοποιήστε nofollow για πληρωμένους και χορηγούμενους συνδέσμους, περιεχόμενο χρηστών (σχόλια, φόρουμ), affiliate συνδέσμους και κάθε σύνδεσμο για τον οποίο δεν θέλετε να εγγυηθείτε.",
        proTip: "Google treats nofollow as a 'hint' rather than a directive. They may choose to follow and count nofollow links if deemed valuable.",
        proTipEl: "Η Google αντιμετωπίζει το nofollow ως «υπόδειξη» και όχι ως εντολή. Μπορεί να επιλέξει να ακολουθήσει και να μετρήσει έναν nofollow σύνδεσμο αν τον κρίνει πολύτιμο.",
        relatedTerms: ["dofollow", "sponsored-attribute", "ugc-attribute", "backlink"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "link-building-outreach",
        termEl: "Link Building Outreach",
        shortDefinitionEl: "Η επικοινωνία με ιδιοκτήτες ιστοσελίδων για να αποκτήσετε backlinks.",
        fullDefinitionEl: "Το link building outreach σημαίνει να εντοπίζετε σχετικές ιστοσελίδες και να επικοινωνείτε με τους ιδιοκτήτες ή τους συντάκτες τους ζητώντας backlinks. Για να πετύχει χρειάζεται προσωπική προσέγγιση, κάτι πραγματικά χρήσιμο να προσφέρετε και χτίσιμο σχέσεων.",
        term: "Link Building Outreach",
        shortDefinition: "The process of contacting website owners to request backlinks.",
        fullDefinition: "Link building outreach involves identifying relevant websites and reaching out to their owners or editors to request backlinks. Successful outreach requires personalization, value proposition, and relationship building.",
        example: "Emailing a blogger: 'I noticed your article on X topic. We just published a comprehensive study that your readers might find valuable...'",
        exampleEl: "Email σε έναν blogger: «Είδα το άρθρο σας για το θέμα Χ. Μόλις δημοσιεύσαμε μια αναλυτική έρευνα που πιστεύω ότι θα φανεί χρήσιμη στους αναγνώστες σας...»",
        technique: "Personalize every email, offer value (not just ask), target relevant sites, follow up strategically, build relationships before asking, use tools to find contact info.",
        techniqueEl: "Προσαρμόστε κάθε email στον παραλήπτη, προσφέρετε αξία (μην ζητάτε μόνο), στοχεύστε σχετικά sites, κάντε follow-up με μέτρο, χτίστε τη σχέση πριν ζητήσετε κάτι και χρησιμοποιήστε εργαλεία για να βρείτε στοιχεία επικοινωνίας.",
        proTip: "Focus on building relationships, not transactions. The best links come from genuine connections in your industry.",
        proTipEl: "Εστιάστε στις σχέσεις, όχι στις συναλλαγές. Οι καλύτεροι σύνδεσμοι έρχονται από πραγματικές γνωριμίες μέσα στον κλάδο σας.",
        relatedTerms: ["guest-posting", "broken-link-building", "skyscraper-technique"],
        relatedLinks: [
          { title: "Outreach Autopilot", url: "/features/outreach-autopilot", type: "feature" }
        ]
      },
      {
        id: "toxic-backlinks",
        termEl: "Toxic Backlinks",
        shortDefinitionEl: "Χαμηλής ποιότητας ή spam σύνδεσμοι που μπορεί να βλάψουν τις κατατάξεις σας.",
        fullDefinitionEl: "Τα toxic backlinks είναι σύνδεσμοι από χαμηλής ποιότητας, spam ή άσχετες ιστοσελίδες που μπορεί να επηρεάσουν αρνητικά το SEO σας. Μπορεί να προέρχονται από επιθέσεις negative SEO, κακές πρακτικές link building ή σχήματα ανταλλαγής συνδέσμων.",
        term: "Toxic Backlinks",
        shortDefinition: "Low-quality or spammy links that can harm your search rankings.",
        fullDefinition: "Toxic backlinks are links from low-quality, spammy, or irrelevant websites that can negatively impact your SEO. They may be the result of negative SEO attacks, poor link building practices, or link schemes.",
        example: "Links from PBNs (private blog networks), link farms, adult sites, gambling sites (if unrelated), and sites with malware.",
        exampleEl: "Σύνδεσμοι από PBNs (ιδιωτικά δίκτυα blogs), link farms, sites για ενήλικες, sites τυχερών παιχνιδιών (αν δεν σχετίζονται με τον κλάδο σας) και sites με malware.",
        technique: "Regularly audit your backlink profile, identify toxic links using SEO tools, try to get them removed via outreach, and disavow as a last resort.",
        techniqueEl: "Ελέγχετε τακτικά το προφίλ backlinks, εντοπίστε τους toxic συνδέσμους με εργαλεία SEO, ζητήστε την αφαίρεσή τους μέσω outreach και κάντε disavow μόνο ως έσχατη λύση.",
        proTip: "Don't panic about every low-quality link. Google usually ignores them. Only disavow if you have a manual penalty or obvious negative SEO attack.",
        proTipEl: "Μην πανικοβάλλεστε με κάθε χαμηλής ποιότητας σύνδεσμο. Η Google συνήθως τους αγνοεί. Κάντε disavow μόνο αν έχετε manual penalty ή προφανή επίθεση negative SEO.",
        relatedTerms: ["disavow-tool", "link-audit", "negative-seo"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "keyword-research",
    title: "Keyword Research",
    description: "Finding and analyzing search terms to target for SEO",
    icon: Search,
    color: "orange",
    terms: [
      {
        id: "seo",
        termEl: "SEO (Βελτιστοποίηση για Μηχανές Αναζήτησης)",
        shortDefinitionEl: "Η διαδικασία βελτιστοποίησης ιστοσελίδας ώστε να κατατάσσεται ψηλότερα στα οργανικά αποτελέσματα της Google.",
        fullDefinitionEl: "SEO (Search Engine Optimization) είναι το σύνολο τεχνικών, περιεχομένου και εξωτερικών σημάτων που βοηθούν μια ιστοσελίδα να εμφανίζεται ψηλά στα οργανικά αποτελέσματα αναζήτησης. Περιλαμβάνει τεχνικό SEO, on-page, off-page και τοπικό SEO. Στην Ελλάδα οι χρήστες συχνά ψάχνουν «τι είναι το SEO», «υπηρεσίες SEO» και «τιμές SEO».",
        term: "SEO (Search Engine Optimization)",
        shortDefinition: "The practice of improving a website so it ranks higher in organic search results.",
        fullDefinition: "Search Engine Optimization (SEO) is the set of technical, content, and off-site practices that help a website appear higher in unpaid search results. It includes technical SEO, on-page SEO, off-page SEO, and local SEO.",
        example: "Optimizing a service page for 'υπηρεσίες SEO' with clear titles, FAQ schema, and fast mobile load.",
        exampleEl: "Βελτιστοποιείτε μια σελίδα υπηρεσίας για το «υπηρεσίες SEO» με σαφείς τίτλους, FAQ schema και γρήγορη φόρτωση σε κινητό.",
        technique: "Map one primary intent per URL, fix crawl/index issues first, write citation-ready answers, add FAQ schema, and measure in Google Search Console.",
        techniqueEl: "Αντιστοιχίστε μία κύρια πρόθεση αναζήτησης σε κάθε URL, διορθώστε πρώτα τα προβλήματα crawl και ευρετηρίασης, γράψτε απαντήσεις που αξίζει να παρατεθούν ως πηγή, προσθέστε FAQ schema και μετρήστε τα αποτελέσματα στο Google Search Console.",
        proTip: "In Greece, commercial queries like τιμές SEO and υπηρεσίες SEO often convert better than the head term SEO alone.",
        proTipEl: "Στην Ελλάδα, εμπορικές αναζητήσεις όπως «τιμές SEO» και «υπηρεσίες SEO» συχνά φέρνουν περισσότερους πελάτες από τον σκέτο όρο «SEO».",
        relatedTerms: ["on-page-seo-term", "technical-seo-term", "keywords", "local-pack"],
        relatedLinks: [
          { title: "What is SEO?", url: "/en/blog/what-is-seo", type: "blog" },
          { title: "SEO for beginners", url: "/en/blog/seo-for-beginners", type: "blog" },
          { title: "Τι είναι το SEO", url: "/el/blog/seo-gia-arxarious", type: "blog" },
          { title: "SEO audit services", url: "/en/services/seo-audits", type: "feature" }
        ]
      },
      {
        id: "keywords",
        termEl: "Keywords (Λέξεις-κλειδιά)",
        shortDefinitionEl: "Οι όροι που πληκτρολογούν οι χρήστες στις μηχανές αναζήτησης, η βάση κάθε SEO στρατηγικής.",
        fullDefinitionEl: "Λέξεις-κλειδιά είναι ό,τι ψάχνει το κοινό σας: από «δικηγόρος Αθήνα» μέχρι «πόσο κοστίζει ιστοσελίδα». Η έρευνα λέξεων-κλειδιών αποκαλύπτει τι ψάχνουν, πόσο συχνά και με ποια πρόθεση - ώστε κάθε σελίδα του site να στοχεύει μια πραγματική αναζήτηση με εμπορική αξία.",
        term: "Keywords",
        shortDefinition: "Words or phrases users type into search engines to find information.",
        fullDefinition: "Keywords are the terms and phrases that users enter into search engines when looking for information, products, or services. They form the foundation of SEO strategy, connecting user intent with your content.",
        example: "'best running shoes for beginners', 'how to train for a marathon', 'Nike Air Max reviews'",
        exampleEl: "«καλύτερα παπούτσια τρεξίματος για αρχάριους», «πώς να προπονηθώ για μαραθώνιο», «κριτικές Nike Air Max»",
        technique: "Start with seed keywords, expand using research tools, analyze competitor keywords, consider search intent, and organize into topic clusters.",
        techniqueEl: "Ξεκινήστε από τις seed keywords, επεκταθείτε με εργαλεία έρευνας, αναλύστε τις λέξεις-κλειδιά των ανταγωνιστών, λάβετε υπόψη την πρόθεση αναζήτησης και οργανώστε τα αποτελέσματα σε θεματικά clusters.",
        proTip: "Don't just chase high-volume keywords. Focus on keywords that match your content's purpose and your audience's needs.",
        proTipEl: "Μην κυνηγάτε μόνο λέξεις-κλειδιά με μεγάλο όγκο. Εστιάστε σε όσες ταιριάζουν με τον σκοπό του περιεχομένου σας και τις ανάγκες του κοινού σας.",
        relatedTerms: ["long-tail-keywords", "search-intent", "keyword-difficulty", "search-volume"],
        relatedLinks: [
          { title: "Keyword research guide", url: "/en/blog/keyword-research-guide", type: "blog" },
          { title: "Free keyword research tool", url: "/en/tools/keyword-research", type: "tool" },
          { title: "Keyword Clustering Tool", url: "/free-tools/keyword-clustering", type: "tool" }
        ]
      },
      {
        id: "long-tail-keywords",
        termEl: "Long-tail Keywords (Μακριές Λέξεις-κλειδιά)",
        shortDefinitionEl: "Πιο συγκεκριμένες, πολυλεκτικές αναζητήσεις με λιγότερο ανταγωνισμό και υψηλότερη πρόθεση.",
        fullDefinitionEl: "Long-tail είναι οι εξειδικευμένες αναζητήσεις: όχι «SEO» αλλά «πόσο κοστίζει το SEO για e-shop». Έχουν μικρότερο όγκο αλλά πολύ υψηλότερη πρόθεση αγοράς και χαμηλότερο ανταγωνισμό - ιδανικό σημείο εκκίνησης για νέα sites και τοπικές επιχειρήσεις.",
        term: "Long-tail Keywords",
        shortDefinition: "Longer, more specific keyword phrases with lower volume but higher intent.",
        fullDefinition: "Long-tail keywords are longer, more specific search phrases (typically 3+ words) that have lower search volume but often higher conversion rates. They represent more specific user intent and face less competition.",
        example: "'best waterproof running shoes for flat feet' vs the short-tail 'running shoes'",
        exampleEl: "«καλύτερα αδιάβροχα παπούτσια τρεξίματος για πλατυποδία» έναντι του γενικού «παπούτσια τρεξίματος»",
        technique: "Find long-tail variations using 'People Also Ask', related searches, forums, and keyword tools. Target them in specific content pieces and FAQ sections.",
        techniqueEl: "Βρείτε long-tail παραλλαγές μέσα από το People Also Ask, τις σχετικές αναζητήσεις, τα φόρουμ και τα εργαλεία λέξεων-κλειδιών. Στοχεύστε τες σε εξειδικευμένα κομμάτια περιεχομένου και σε ενότητες συχνών ερωτήσεων.",
        proTip: "Long-tail keywords often make up 70% of all searches. They're easier to rank for and convert better because of specific intent.",
        proTipEl: "Οι long-tail αναζητήσεις αποτελούν συχνά το 70% όλων των αναζητήσεων. Κατατάσσεστε πιο εύκολα σε αυτές και φέρνουν περισσότερες μετατροπές, επειδή η πρόθεση είναι συγκεκριμένη.",
        relatedTerms: ["keywords", "search-intent", "keyword-difficulty"],
        relatedLinks: [
          { title: "Keyword Clustering Guide", url: "/help/keyword-clustering-guide", type: "help" },
          { title: "PAA Extractor", url: "/free-tools/paa-extractor", type: "tool" }
        ]
      },
      {
        id: "search-volume",
        termEl: "Search Volume (Όγκος αναζήτησης)",
        shortDefinitionEl: "Πόσες φορές αναζητείται μια λέξη-κλειδί σε ένα συγκεκριμένο χρονικό διάστημα.",
        fullDefinitionEl: "Ο όγκος αναζήτησης είναι ο μέσος αριθμός αναζητήσεων μιας λέξης-κλειδιού ανά μήνα. Είναι βασική μετρική για να εκτιμήσετε τις δυνατότητες μιας λέξης-κλειδιού και να αποφασίσετε ποιους όρους θα στοχεύσετε πρώτους στη στρατηγική SEO σας.",
        term: "Search Volume",
        shortDefinition: "The number of times a keyword is searched in a given timeframe.",
        fullDefinition: "Search volume represents the average number of times a keyword is searched per month. It's a key metric for understanding keyword potential and prioritizing which terms to target in your SEO strategy.",
        example: "'SEO' might have 100K monthly searches, while 'local SEO for dentists' might have 500.",
        exampleEl: "Το «SEO» μπορεί να έχει 100.000 αναζητήσεις τον μήνα, ενώ το «τοπικό SEO για οδοντιάτρους» μπορεί να έχει 500.",
        technique: "Balance volume with competition and intent. High volume means more potential traffic but often more competition. Cross-reference with keyword difficulty.",
        techniqueEl: "Ζυγίστε τον όγκο με τον ανταγωνισμό και την πρόθεση. Μεγάλος όγκος σημαίνει περισσότερη πιθανή επισκεψιμότητα αλλά συνήθως και μεγαλύτερο ανταγωνισμό. Διασταυρώστε τον με το keyword difficulty.",
        proTip: "Search volume is an estimate, not exact data. Use it for comparison between keywords rather than absolute planning.",
        proTipEl: "Ο όγκος αναζήτησης είναι εκτίμηση, όχι ακριβές νούμερο. Χρησιμοποιήστε τον για να συγκρίνετε λέξεις-κλειδιά μεταξύ τους, όχι για απόλυτο σχεδιασμό.",
        relatedTerms: ["keyword-difficulty", "keywords", "ctr"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      },
      {
        id: "keyword-difficulty",
        termEl: "Keyword Difficulty",
        shortDefinitionEl: "Μετρική που εκτιμά πόσο δύσκολο είναι να κατατάξετε μια σελίδα για συγκεκριμένη λέξη-κλειδί.",
        fullDefinitionEl: "Το keyword difficulty (KD) είναι ένας δείκτης που εκτιμά πόσο δύσκολο θα ήταν να βγείτε στην πρώτη σελίδα των αποτελεσμάτων για μια λέξη-κλειδί. Συνήθως βασίζεται στο κύρος και στο προφίλ backlinks των σελίδων που ήδη κατατάσσονται.",
        term: "Keyword Difficulty",
        shortDefinition: "A metric estimating how hard it is to rank for a specific keyword.",
        fullDefinition: "Keyword difficulty (KD) is a score that estimates how challenging it would be to rank on the first page of search results for a given keyword. It's typically based on the authority and backlink profiles of currently ranking pages.",
        example: "KD 10 = Easy (new sites can rank), KD 50 = Moderate, KD 80+ = Very hard (requires high authority)",
        exampleEl: "KD 10 = εύκολη (μπορούν να κατατάξουν και νέα sites), KD 50 = μέτρια, KD 80+ = πολύ δύσκολη (χρειάζεται υψηλό κύρος)",
        technique: "For new sites, target KD under 30. Build authority over time to compete for harder keywords. Always verify by manually checking who's currently ranking.",
        techniqueEl: "Για νέα sites, στοχεύστε KD κάτω από 30. Χτίστε κύρος με τον καιρό για να διεκδικήσετε δυσκολότερες λέξεις-κλειδιά. Επιβεβαιώνετε πάντα ελέγχοντας με το μάτι ποιοι κατατάσσονται σήμερα.",
        proTip: "Don't rely solely on KD scores. Manually analyze the SERP - sometimes 'high difficulty' keywords have weak competitors you can beat with better content.",
        proTipEl: "Μη βασίζεστε μόνο στο KD. Αναλύστε μόνοι σας τη SERP: μερικές φορές λέξεις-κλειδιά «υψηλής δυσκολίας» έχουν αδύναμους ανταγωνιστές που μπορείτε να ξεπεράσετε με καλύτερο περιεχόμενο.",
        relatedTerms: ["search-volume", "serp-analysis", "domain-authority"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" },
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "search-intent",
        termEl: "Search Intent (Πρόθεση Αναζήτησης)",
        shortDefinitionEl: "Ο πραγματικός στόχος πίσω από μια αναζήτηση: πληροφορία, σύγκριση, αγορά ή πλοήγηση.",
        fullDefinitionEl: "Η πρόθεση αναζήτησης καθορίζει τι είδους σελίδα πρέπει να φτιάξετε: το «τι είναι SEO» θέλει οδηγό, το «SEO τιμές» θέλει σελίδα τιμών, το «SEO agency Θεσσαλονίκη» θέλει τοπική σελίδα υπηρεσίας. Σελίδα που δεν ταιριάζει με την πρόθεση δεν κατατάσσεται, όσο καλή κι αν είναι.",
        term: "Search Intent",
        shortDefinition: "The underlying goal a user has when typing a search query.",
        fullDefinition: "Search intent (also called user intent or query intent) refers to the purpose behind a search query. Understanding intent is crucial for creating content that satisfies users and ranks well. The four main types are informational, navigational, commercial, and transactional.",
        example: "Informational: 'how to tie running shoes'. Transactional: 'buy Nike Air Max'. Commercial: 'best running shoes 2026'. Navigational: 'Nike official site'",
        exampleEl: "Πληροφοριακή: «πώς δένω τα κορδόνια στα παπούτσια τρεξίματος». Συναλλακτική: «αγορά Nike Air Max». Εμπορική: «καλύτερα παπούτσια τρεξίματος 2026». Πλοήγησης: «Nike επίσημο site»",
        technique: "Analyze the current SERP to understand what Google thinks the intent is. Match your content format (guide, product page, comparison, etc.) to the intent.",
        techniqueEl: "Αναλύστε την τρέχουσα SERP για να καταλάβετε ποια πρόθεση θεωρεί η Google ότι έχει η αναζήτηση. Προσαρμόστε τη μορφή του περιεχομένου (οδηγός, σελίδα προϊόντος, σύγκριση κ.λπ.) στην πρόθεση.",
        proTip: "If your content doesn't match search intent, you won't rank - no matter how good it is. Always check the SERP before creating content.",
        proTipEl: "Αν το περιεχόμενό σας δεν ταιριάζει με την πρόθεση αναζήτησης, δεν θα κατατάσσεται, όσο καλό κι αν είναι. Ελέγχετε πάντα τη SERP πριν γράψετε.",
        relatedTerms: ["keywords", "serp-analysis", "content-optimization"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      },
      {
        id: "keyword-cannibalization",
        termEl: "Keyword Cannibalization",
        shortDefinitionEl: "Όταν πολλές σελίδες του site σας ανταγωνίζονται για την ίδια λέξη-κλειδί.",
        fullDefinitionEl: "Το keyword cannibalization συμβαίνει όταν πολλές σελίδες του ίδιου site στοχεύουν την ίδια ή πολύ παρόμοια λέξη-κλειδί και καταλήγουν να ανταγωνίζονται μεταξύ τους στα αποτελέσματα. Αυτό αραιώνει τα σήματα κατάταξης και μπερδεύει τις μηχανές αναζήτησης.",
        term: "Keyword Cannibalization",
        shortDefinition: "When multiple pages on your site compete for the same keyword.",
        fullDefinition: "Keyword cannibalization occurs when multiple pages on the same website target the same or very similar keywords, causing them to compete against each other in search results. This can dilute ranking signals and confuse search engines.",
        example: "Having '/best-running-shoes' and '/top-running-shoes-2026' both targeting 'best running shoes' causes cannibalization.",
        exampleEl: "Αν οι σελίδες «/best-running-shoes» και «/top-running-shoes-2026» στοχεύουν και οι δύο το «καλύτερα παπούτσια τρεξίματος», έχετε cannibalization.",
        technique: "Audit your content for overlapping keywords, consolidate similar pages into one comprehensive piece, use canonical tags, or differentiate content focus.",
        techniqueEl: "Ελέγξτε το περιεχόμενό σας για λέξεις-κλειδιά που επικαλύπτονται, ενώστε τις παρόμοιες σελίδες σε μία ολοκληρωμένη, χρησιμοποιήστε canonical tags ή διαφοροποιήστε την εστίαση κάθε σελίδας.",
        proTip: "Use GSC to identify cannibalization: if multiple URLs rank for the same query and swap positions, you likely have cannibalization.",
        proTipEl: "Εντοπίστε το cannibalization στο Search Console: αν πολλά URLs κατατάσσονται για την ίδια αναζήτηση και αλλάζουν θέσεις μεταξύ τους, το πιθανότερο είναι ότι υπάρχει.",
        relatedTerms: ["content-consolidation", "canonical-tag", "site-architecture"],
        relatedLinks: [
          { title: "Cannibalization Doctor", url: "/features/cannibalization-doctor", type: "feature" }
        ]
      },
      {
        id: "keyword-clustering",
        termEl: "Keyword Clustering (Ομαδοποίηση λέξεων-κλειδιών)",
        shortDefinitionEl: "Ομαδοποίηση συναφών λέξεων-κλειδιών ώστε να στοχεύονται από ένα μόνο κομμάτι περιεχομένου.",
        fullDefinitionEl: "Το keyword clustering είναι η ομαδοποίηση σημασιολογικά συναφών λέξεων-κλειδιών που έχουν την ίδια πρόθεση αναζήτησης. Αντί να φτιάχνετε ξεχωριστή σελίδα για κάθε λέξη-κλειδί, στοχεύετε ολόκληρη την ομάδα με ένα ολοκληρωμένο κομμάτι περιεχομένου.",
        term: "Keyword Clustering",
        shortDefinition: "Grouping related keywords to target with a single piece of content.",
        fullDefinition: "Keyword clustering is the practice of grouping semantically related keywords that share the same search intent. Instead of creating separate pages for each keyword, you target a cluster of related terms with one comprehensive piece of content.",
        example: "Clustering 'running shoes for beginners', 'best first running shoes', 'starter running sneakers' into one guide targeting all three.",
        exampleEl: "Ομαδοποιείτε τα «παπούτσια τρεξίματος για αρχάριους», «καλύτερα πρώτα παπούτσια τρεξίματος» και «αθλητικά για αρχάριους δρομείς» σε έναν οδηγό που στοχεύει και τα τρία.",
        technique: "Use SERP overlap analysis to group keywords (if 3+ same URLs rank for two keywords, they belong together). Create pillar content for clusters.",
        techniqueEl: "Ομαδοποιήστε με ανάλυση επικάλυψης της SERP (αν τα ίδια 3+ URLs κατατάσσονται για δύο λέξεις-κλειδιά, ανήκουν στην ίδια ομάδα). Φτιάξτε pillar περιεχόμενο για κάθε cluster.",
        proTip: "Clustering prevents cannibalization and creates more authoritative content. One great page > five thin pages targeting similar keywords.",
        proTipEl: "Το clustering αποτρέπει το cannibalization και δίνει πιο έγκυρο περιεχόμενο. Μία εξαιρετική σελίδα αξίζει περισσότερο από πέντε φτωχές σελίδες με παρόμοιες λέξεις-κλειδιά.",
        relatedTerms: ["topic-clusters", "semantic-seo", "pillar-content"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" },
          { title: "Keyword Clustering Tool", url: "/free-tools/keyword-clustering", type: "tool" },
          { title: "Keyword Clustering Guide", url: "/help/keyword-clustering-guide", type: "help" }
        ]
      },
      {
        id: "seed-keywords",
        termEl: "Seed Keywords",
        shortDefinitionEl: "Οι αρχικές λέξεις-κλειδιά από τις οποίες χτίζετε ευρύτερες λίστες λέξεων-κλειδιών.",
        fullDefinitionEl: "Οι seed keywords είναι οι βασικοί όροι που εκφράζουν τα κύρια θέματα, τα προϊόντα ή τις υπηρεσίες σας. Είναι το σημείο εκκίνησης της έρευνας λέξεων-κλειδιών, από όπου επεκτείνεστε σε συναφείς όρους, long-tail παραλλαγές και αναζητήσεις σε μορφή ερώτησης.",
        term: "Seed Keywords",
        shortDefinition: "Starting keywords used to generate broader keyword lists.",
        fullDefinition: "Seed keywords are the foundational terms that represent your core topics, products, or services. They serve as starting points for keyword research, from which you expand to find related terms, long-tail variations, and question-based queries.",
        example: "For a running shoe store: seed keywords might be 'running shoes', 'athletic footwear', 'trail running'",
        exampleEl: "Για ένα κατάστημα παπουτσιών τρεξίματος, seed keywords θα μπορούσαν να είναι «παπούτσια τρεξίματος», «αθλητικά υποδήματα», «ορεινό τρέξιμο».",
        technique: "Brainstorm core topics, check competitor home/category pages, use GSC data for existing queries, think about how customers describe your products/services.",
        techniqueEl: "Καταγράψτε τα βασικά σας θέματα, δείτε τις αρχικές σελίδες και τις κατηγορίες των ανταγωνιστών, χρησιμοποιήστε τα δεδομένα του Search Console για τις αναζητήσεις που ήδη φέρνουν επισκέπτες και σκεφτείτε πώς περιγράφουν οι πελάτες τα προϊόντα ή τις υπηρεσίες σας.",
        proTip: "Don't overthink seed keywords. Start broad and let research tools reveal the opportunities. The goal is to discover keywords you didn't think of.",
        proTipEl: "Μην το σκέφτεστε πολύ. Ξεκινήστε γενικά και αφήστε τα εργαλεία έρευνας να αποκαλύψουν τις ευκαιρίες. Ο στόχος είναι να ανακαλύψετε λέξεις-κλειδιά που δεν είχατε σκεφτεί.",
        relatedTerms: ["keyword-research", "keyword-expansion", "competitor-analysis"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "analytics-metrics",
    title: "Analytics & Metrics",
    description: "Key performance indicators and measurements for SEO success",
    icon: BarChart3,
    color: "cyan",
    terms: [
      {
        id: "clicks",
        termEl: "Clicks (Κλικ)",
        shortDefinitionEl: "Πόσες φορές οι χρήστες πάτησαν το αποτέλεσμά σας στην αναζήτηση για να επισκεφθούν τη σελίδα σας.",
        fullDefinitionEl: "Στο SEO, τα κλικ είναι ο αριθμός των φορών που οι χρήστες πάτησαν την καταχώριση της ιστοσελίδας σας στα αποτελέσματα αναζήτησης. Είναι άμεσο μέτρο του πόσο καλά οι τίτλοι και οι περιγραφές σας προσελκύουν επισκέπτες από την αναζήτηση.",
        term: "Clicks",
        shortDefinition: "The number of times users click on your search result to visit your page.",
        fullDefinition: "In SEO, clicks represent the number of times users clicked on your website's listing in search results. It's a direct measure of how effective your titles and descriptions are at attracting visitors from search.",
        example: "Your page appeared 10,000 times in search results (impressions) and received 500 clicks = 5% CTR",
        exampleEl: "Η σελίδα σας εμφανίστηκε 10.000 φορές στα αποτελέσματα (impressions) και πήρε 500 κλικ = CTR 5%",
        technique: "Improve clicks by optimizing title tags for appeal, writing compelling meta descriptions, using structured data for rich snippets, and matching search intent.",
        techniqueEl: "Αυξήστε τα κλικ κάνοντας τα title tags πιο ελκυστικά, γράφοντας πειστικές meta descriptions, χρησιμοποιώντας structured data για rich snippets και καλύπτοντας την πρόθεση αναζήτησης.",
        proTip: "Track clicks alongside position. If you rank #1 but have low clicks, your title/description needs work. If you rank #5 with high clicks, you're doing something right.",
        proTipEl: "Παρακολουθείτε τα κλικ μαζί με τη θέση. Αν είστε #1 αλλά έχετε λίγα κλικ, ο τίτλος ή η περιγραφή θέλει δουλειά. Αν είστε #5 με πολλά κλικ, κάτι κάνετε σωστά.",
        relatedTerms: ["impressions", "ctr", "serp"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "impressions",
        termEl: "Impressions (Εμφανίσεις)",
        shortDefinitionEl: "Πόσες φορές εμφανίστηκε η σελίδα σας στα αποτελέσματα αναζήτησης.",
        fullDefinitionEl: "Οι εμφανίσεις (impressions) μετρούν πόσες φορές κάποιο URL του site σας εμφανίστηκε σε αποτελέσματα αναζήτησης που είδε ένας χρήστης. Μια εμφάνιση μετράει όταν το URL σας εμφανίζεται στα αποτελέσματα, είτε ο χρήστης κάνει scroll μέχρι εκεί είτε όχι.",
        term: "Impressions",
        shortDefinition: "The number of times your page appeared in search results.",
        fullDefinition: "Impressions count how many times any URL from your site appeared in search results viewed by a user. An impression is counted when your URL appears in search results, whether or not the user scrolls to see it.",
        example: "If your page shows on page 1 for 'running shoes' and that query is searched 10,000 times, you could get up to 10,000 impressions.",
        exampleEl: "Αν η σελίδα σας εμφανίζεται στην πρώτη σελίδα για το «παπούτσια τρεξίματος» και η αναζήτηση γίνεται 10.000 φορές, μπορείτε να πάρετε έως 10.000 εμφανίσεις.",
        technique: "Increase impressions by targeting more keywords, improving rankings for existing keywords, expanding to new content topics, and fixing indexing issues.",
        techniqueEl: "Αυξήστε τις εμφανίσεις στοχεύοντας περισσότερες λέξεις-κλειδιά, βελτιώνοντας τις κατατάξεις στις υπάρχουσες, επεκτείνοντας το περιεχόμενο σε νέα θέματα και διορθώνοντας προβλήματα ευρετηρίασης.",
        proTip: "High impressions with low clicks? Your rankings might be lower positions (7-10) or your titles aren't compelling. Low impressions but you're indexed? You might need more content or better keyword targeting.",
        proTipEl: "Πολλές εμφανίσεις αλλά λίγα κλικ; Ίσως κατατάσσεστε σε χαμηλές θέσεις (7-10) ή οι τίτλοι σας δεν τραβούν. Λίγες εμφανίσεις ενώ είστε στο ευρετήριο; Ίσως χρειάζεστε περισσότερο περιεχόμενο ή καλύτερη στόχευση λέξεων-κλειδιών.",
        relatedTerms: ["clicks", "ctr", "average-position"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "ctr",
        termEl: "CTR (Ποσοστό Κλικ)",
        shortDefinitionEl: "Το ποσοστό όσων είδαν το αποτέλεσμά σας και έκαναν κλικ: τα κλικ διαιρεμένα με τις εμφανίσεις.",
        fullDefinitionEl: "Το CTR (Click-Through Rate) δείχνει πόσο ελκυστικό είναι το αποτέλεσμά σας: κλικ ÷ εμφανίσεις. Χαμηλό CTR σε καλή θέση σημαίνει αδύναμο τίτλο ή περιγραφή - η πιο γρήγορη SEO νίκη είναι συχνά η επανασυγγραφή τίτλων σε σελίδες με πολλές εμφανίσεις και λίγα κλικ (δεδομένα από το Search Console).",
        term: "CTR (Click-Through Rate)",
        shortDefinition: "The percentage of impressions that resulted in clicks.",
        fullDefinition: "Click-through rate (CTR) is the ratio of clicks to impressions, expressed as a percentage. It measures how often people who see your listing in search results actually click through to your website.",
        example: "500 clicks ÷ 10,000 impressions × 100 = 5% CTR. Average CTR for position 1 is ~28%, position 10 is ~2.5%.",
        exampleEl: "500 κλικ ÷ 10.000 εμφανίσεις × 100 = CTR 5%. Το μέσο CTR για τη θέση 1 είναι περίπου 28%, για τη θέση 10 περίπου 2,5%.",
        technique: "Improve CTR by: writing compelling titles with power words, adding numbers/dates, using emotional triggers, testing different meta descriptions, earning rich snippets.",
        techniqueEl: "Βελτιώστε το CTR με ελκυστικούς τίτλους που έχουν δυνατές λέξεις, προσθέτοντας αριθμούς ή ημερομηνίες, αγγίζοντας το συναίσθημα, δοκιμάζοντας διαφορετικές meta descriptions και κερδίζοντας rich snippets.",
        proTip: "CTR varies by position. Compare your CTR to expected CTR for your position. If you're underperforming, focus on title/description optimization.",
        proTipEl: "Το CTR διαφέρει ανάλογα με τη θέση. Συγκρίνετε το CTR σας με το αναμενόμενο για τη θέση σας. Αν υστερείτε, εστιάστε στη βελτίωση τίτλου και περιγραφής.",
        relatedTerms: ["clicks", "impressions", "title-tag", "meta-description"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "average-position",
        termEl: "Average Position (Μέση θέση)",
        shortDefinitionEl: "Η μέση θέση κατάταξης της σελίδας σας για μια αναζήτηση στα αποτελέσματα.",
        fullDefinitionEl: "Η μέση θέση είναι ο μέσος όρος της κατάταξης του URL σας για τις αναζητήσεις σε ένα χρονικό διάστημα. Θέση 1 σημαίνει ότι είστε πρώτοι, θέση 10 ότι είστε τελευταίοι στην πρώτη σελίδα. Υπολογίζεται σε όλες τις φορές που εμφανίστηκε η σελίδα.",
        term: "Average Position",
        shortDefinition: "The average ranking position of your page for a query in search results.",
        fullDefinition: "Average position is the mean ranking of your URL for queries over a time period. A position of 1 means you're first; position 10 means you're last on page 1. It's averaged across all times the page appeared.",
        example: "If your page ranked #1 once and #5 once for a query, your average position is 3.",
        exampleEl: "Αν η σελίδα σας βγήκε #1 μία φορά και #5 μία φορά για μια αναζήτηση, η μέση θέση είναι 3.",
        technique: "Improve average position through content optimization, building backlinks, improving user engagement signals, fixing technical issues, and enhancing E-E-A-T signals.",
        techniqueEl: "Βελτιώστε τη μέση θέση με βελτιστοποίηση περιεχομένου, backlinks, καλύτερα σήματα εμπλοκής χρηστών, διόρθωση τεχνικών προβλημάτων και ενίσχυση των σημάτων E-E-A-T.",
        proTip: "Focus on queries where you rank 5-15 (striking distance). Small improvements here can significantly boost traffic. Queries at 50+ need major work.",
        proTipEl: "Εστιάστε στις αναζητήσεις όπου είστε στις θέσεις 5-15 (striking distance). Μικρές βελτιώσεις εκεί μπορούν να ανεβάσουν σημαντικά την επισκεψιμότητα. Οι αναζητήσεις στη θέση 50+ θέλουν πολλή δουλειά.",
        relatedTerms: ["ranking", "serp", "impressions"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Ranking Predictions", url: "/features/ranking-predictions", type: "feature" }
        ]
      },
      {
        id: "bounce-rate",
        termEl: "Bounce Rate (Ποσοστό εγκατάλειψης)",
        shortDefinitionEl: "Το ποσοστό των επισκεπτών που φεύγουν αφού δουν μόνο μία σελίδα.",
        fullDefinitionEl: "Το bounce rate μετρά το ποσοστό των επισκέψεων μίας σελίδας, όπου ο χρήστης έφυγε από το site χωρίς άλλη αλληλεπίδραση. Δεν είναι άμεσος παράγοντας κατάταξης, αλλά ένα υψηλό ποσοστό μπορεί να δείχνει περιεχόμενο που δεν καλύπτει την πρόθεση του χρήστη.",
        term: "Bounce Rate",
        shortDefinition: "The percentage of visitors who leave after viewing only one page.",
        fullDefinition: "Bounce rate measures the percentage of single-page sessions where users left your site without interacting further. While not a direct ranking factor, high bounce rates may indicate content that doesn't satisfy user intent.",
        example: "1,000 visitors, 600 left after one page = 60% bounce rate. Blogs often have 70-90% bounce rate (normal), e-commerce should be 20-45%.",
        exampleEl: "1.000 επισκέπτες, 600 έφυγαν μετά από μία σελίδα = bounce rate 60%. Τα blogs έχουν συχνά 70-90% (φυσιολογικό), ενώ ένα e-shop θα πρέπει να είναι στο 20-45%.",
        technique: "Reduce bounce rate by: matching search intent, improving page speed, adding compelling CTAs, using internal links, improving content quality, and optimizing mobile experience.",
        techniqueEl: "Μειώστε το bounce rate καλύπτοντας την πρόθεση αναζήτησης, βελτιώνοντας την ταχύτητα, προσθέτοντας ελκυστικά καλέσματα σε δράση, χρησιμοποιώντας εσωτερικούς συνδέσμους, ανεβάζοντας την ποιότητα του περιεχομένου και βελτιώνοντας την εμπειρία σε κινητό.",
        proTip: "Bounce rate without context is meaningless. A single-page site or a page that fully answers the query will have high bounce rate - and that's fine.",
        proTipEl: "Το bounce rate χωρίς πλαίσιο δεν λέει τίποτα. Ένα site μίας σελίδας ή μια σελίδα που απαντά πλήρως στην αναζήτηση θα έχει υψηλό bounce rate, και αυτό είναι απολύτως εντάξει.",
        relatedTerms: ["dwell-time", "pogo-sticking", "user-engagement"],
        relatedLinks: [
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "organic-traffic",
        termEl: "Organic Traffic (Οργανική Επισκεψιμότητα)",
        shortDefinitionEl: "Επισκέπτες που έρχονται από μη πληρωμένα αποτελέσματα αναζήτησης.",
        fullDefinitionEl: "Οργανική επισκεψιμότητα είναι όσοι σας βρίσκουν στη Google χωρίς να πληρώνετε ανά κλικ - το αποτέλεσμα του SEO. Σε αντίθεση με τις διαφημίσεις, χτίζεται σταδιακά και παραμένει: μια σελίδα που κατατάσσεται φέρνει επισκέπτες κάθε μέρα, για χρόνια, με μηδενικό οριακό κόστος.",
        term: "Organic Traffic",
        shortDefinition: "Visitors who arrive at your site from unpaid search engine results.",
        fullDefinition: "Organic traffic consists of visitors who find your website through non-paid search engine results. It's the primary goal of SEO - increasing the quantity and quality of visitors from search engines without paying for ads.",
        example: "If 10,000 monthly visitors come from Google search results (not Google Ads), that's your organic traffic.",
        exampleEl: "Αν 10.000 επισκέπτες τον μήνα έρχονται από τα αποτελέσματα αναζήτησης της Google (όχι από Google Ads), αυτή είναι η οργανική σας επισκεψιμότητα.",
        technique: "Grow organic traffic by: expanding keyword targeting, improving existing rankings, creating more content, building backlinks, fixing technical issues, and targeting featured snippets.",
        techniqueEl: "Αυξήστε την οργανική επισκεψιμότητα στοχεύοντας περισσότερες λέξεις-κλειδιά, βελτιώνοντας τις υπάρχουσες κατατάξεις, δημιουργώντας περισσότερο περιεχόμενο, αποκτώντας backlinks, διορθώνοντας τεχνικά προβλήματα και στοχεύοντας featured snippets.",
        proTip: "Track organic traffic trends, not just absolute numbers. Seasonal businesses have natural fluctuations. Compare year-over-year for accurate growth measurement.",
        proTipEl: "Παρακολουθείτε την τάση της οργανικής επισκεψιμότητας, όχι μόνο τα απόλυτα νούμερα. Οι εποχικές επιχειρήσεις έχουν φυσικές διακυμάνσεις. Συγκρίνετε με την ίδια περίοδο της προηγούμενης χρονιάς για να μετρήσετε σωστά την ανάπτυξη.",
        relatedTerms: ["paid-traffic", "direct-traffic", "referral-traffic"],
        relatedLinks: [
          { title: "How to increase organic traffic", url: "/blog/how-to-increase-organic-traffic", type: "blog" },
          { title: "What is SEO?", url: "/en/blog/what-is-seo", type: "blog" },
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "dwell-time",
        termEl: "Dwell Time",
        shortDefinitionEl: "Πόσο χρόνο περνά ένας χρήστης στη σελίδα σας πριν επιστρέψει στα αποτελέσματα αναζήτησης.",
        fullDefinitionEl: "Το dwell time είναι ο χρόνος από τη στιγμή που ο χρήστης πατά ένα αποτέλεσμα μέχρι να επιστρέψει στη SERP. Είναι πιθανό σήμα εμπλοκής: μεγαλύτερο dwell time δείχνει ότι το περιεχόμενο κάλυψε αυτό που έψαχνε ο χρήστης.",
        term: "Dwell Time",
        shortDefinition: "How long a user spends on your page before returning to search results.",
        fullDefinition: "Dwell time is the duration between when a user clicks on a search result and when they return to the SERP. It's a potential user engagement signal - longer dwell time suggests the content satisfied the user's query.",
        example: "User clicks your result, spends 5 minutes reading, then goes back to Google. Dwell time = 5 minutes.",
        exampleEl: "Ο χρήστης πατά το αποτέλεσμά σας, διαβάζει για 5 λεπτά και μετά επιστρέφει στη Google. Dwell time = 5 λεπτά.",
        technique: "Increase dwell time by: creating comprehensive content, using engaging multimedia, improving readability, adding table of contents, using internal links to keep users on site.",
        techniqueEl: "Αυξήστε το dwell time με ολοκληρωμένο περιεχόμενο, ελκυστικά πολυμέσα, πιο ευανάγνωστο κείμενο, πίνακα περιεχομένων και εσωτερικούς συνδέσμους που κρατούν τους χρήστες στο site.",
        proTip: "Dwell time isn't directly measurable in analytics. Use 'time on page' as a proxy, but remember it's not identical - dwell time specifically measures return to SERP.",
        proTipEl: "Το dwell time δεν μετριέται άμεσα στα analytics. Χρησιμοποιήστε τον «χρόνο στη σελίδα» ως ενδεικτικό μέτρο, αλλά θυμηθείτε ότι δεν είναι το ίδιο: το dwell time μετρά συγκεκριμένα την επιστροφή στη SERP.",
        relatedTerms: ["bounce-rate", "pogo-sticking", "user-engagement"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "conversion-rate",
        termEl: "Conversion Rate (Ποσοστό μετατροπής)",
        shortDefinitionEl: "Το ποσοστό των επισκεπτών που ολοκληρώνουν μια επιθυμητή ενέργεια.",
        fullDefinitionEl: "Το ποσοστό μετατροπής μετρά πόσοι από τους επισκέπτες της ιστοσελίδας ολοκληρώνουν έναν συγκεκριμένο στόχο, όπως μια αγορά, μια εγγραφή στο newsletter ή μια φόρμα επικοινωνίας. Συνδέει την επισκεψιμότητα από το SEO με τα πραγματικά επιχειρηματικά αποτελέσματα.",
        term: "Conversion Rate",
        shortDefinition: "The percentage of visitors who complete a desired action.",
        fullDefinition: "Conversion rate measures the percentage of website visitors who complete a specific goal, such as making a purchase, signing up for a newsletter, or filling out a contact form. It connects SEO traffic to business outcomes.",
        example: "1,000 organic visitors, 30 made a purchase = 3% conversion rate. Average e-commerce is 2-3%, B2B lead gen is 2-5%.",
        exampleEl: "1.000 οργανικοί επισκέπτες, 30 έκαναν αγορά = ποσοστό μετατροπής 3%. Ο μέσος όρος για e-shop είναι 2-3% και για B2B αιτήματα πελατών 2-5%.",
        technique: "Improve conversion rate by: attracting the right traffic (intent match), optimizing landing pages, improving UX, A/B testing CTAs, building trust with reviews/testimonials.",
        techniqueEl: "Βελτιώστε το ποσοστό μετατροπής φέρνοντας τους σωστούς επισκέπτες (που ταιριάζουν με την πρόθεση), βελτιστοποιώντας τα landing pages, βελτιώνοντας την εμπειρία χρήστη, κάνοντας A/B tests στα καλέσματα σε δράση και χτίζοντας εμπιστοσύνη με κριτικές και μαρτυρίες πελατών.",
        proTip: "High-intent long-tail keywords often convert better than high-volume head terms. 100 visitors from 'buy running shoes online' > 1,000 from 'running'.",
        proTipEl: "Οι long-tail λέξεις-κλειδιά με υψηλή πρόθεση συχνά φέρνουν περισσότερες μετατροπές από τους γενικούς όρους με μεγάλο όγκο. 100 επισκέπτες από το «αγορά παπουτσιών τρεξίματος online» αξίζουν περισσότερο από 1.000 από το «τρέξιμο».",
        relatedTerms: ["organic-traffic", "user-intent", "landing-page"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "serp-features",
    title: "SERP Features",
    description: "Special result types that appear in search engine results pages",
    icon: Star,
    color: "yellow",
    terms: [
      {
        id: "featured-snippet",
        termEl: "Featured Snippet (Προβεβλημένο Απόσπασμα)",
        shortDefinitionEl: "Το πλαίσιο απάντησης στην κορυφή της Google, πάνω από τα κανονικά αποτελέσματα.",
        fullDefinitionEl: "Το featured snippet απαντά στην ερώτηση του χρήστη απευθείας στα αποτελέσματα, με απόσπασμα από μια σελίδα. Κερδίζεται με σαφείς, σύντομες απαντήσεις (40-60 λέξεις) κάτω από ερώτηση-επικεφαλίδα, λίστες και πίνακες - και τροφοδοτεί και τις απαντήσεις των AI μηχανών (AEO).",
        term: "Featured Snippet",
        shortDefinition: "A highlighted answer box that appears at the top of search results.",
        fullDefinition: "A featured snippet is a special search result that appears above the regular organic results (position 0). It extracts and displays a direct answer from a webpage, including paragraph, list, table, or video formats.",
        example: "Query: 'How to tie shoelaces' → Featured snippet shows step-by-step instructions pulled from a webpage.",
        exampleEl: "Αναζήτηση: «πώς δένω κορδόνια» → Το featured snippet δείχνει οδηγίες βήμα προς βήμα, παρμένες από μια ιστοσελίδα.",
        technique: "Target question-based queries, structure content with clear headings, use lists/tables, answer the query concisely in 40-60 words, provide comprehensive follow-up content.",
        techniqueEl: "Στοχεύστε αναζητήσεις σε μορφή ερώτησης, δομήστε το περιεχόμενο με σαφείς επικεφαλίδες, χρησιμοποιήστε λίστες και πίνακες, απαντήστε σύντομα σε 40-60 λέξεις και συνεχίστε με αναλυτικό περιεχόμενο.",
        proTip: "Check what format the current snippet uses (paragraph, list, table) and match it. Google prefers keeping the same format.",
        proTipEl: "Δείτε ποια μορφή έχει το τρέχον snippet (παράγραφος, λίστα, πίνακας) και ακολουθήστε την. Η Google προτιμά να κρατά την ίδια μορφή.",
        relatedTerms: ["serp", "position-zero", "rich-snippets"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "people-also-ask",
        termEl: "People Also Ask (PAA)",
        shortDefinitionEl: "Ένα πλαίσιο που ανοίγει και δείχνει συναφείς ερωτήσεις που αναζητούν συχνά οι χρήστες.",
        fullDefinitionEl: "Το People Also Ask είναι στοιχείο της SERP που εμφανίζει μια λίστα με συναφείς ερωτήσεις που αναζητούνται συχνά. Όταν πατήσετε μια ερώτηση, ανοίγει και δείχνει ένα απόσπασμα απάντησης με σύνδεσμο. Καθώς ο χρήστης αλληλεπιδρά, φορτώνουν δυναμικά νέες ερωτήσεις.",
        term: "People Also Ask (PAA)",
        shortDefinition: "An expandable box showing related questions users commonly search.",
        fullDefinition: "People Also Ask is a SERP feature that displays a list of related questions users frequently search for. When clicked, each question expands to show an answer snippet and link. New questions dynamically load as users interact.",
        example: "Searching 'running shoes' shows PAA: 'What are the best running shoes for beginners?', 'How often should you replace running shoes?'",
        exampleEl: "Η αναζήτηση «παπούτσια τρεξίματος» δείχνει στο PAA: «Ποια είναι τα καλύτερα παπούτσια τρεξίματος για αρχάριους;», «Κάθε πότε πρέπει να αλλάζετε παπούτσια τρεξίματος;»",
        technique: "Use PAA questions as content ideas, create FAQ sections addressing these questions, use question-and-answer format in content, target long-tail question keywords.",
        techniqueEl: "Χρησιμοποιήστε τις ερωτήσεις του PAA ως ιδέες για περιεχόμενο, φτιάξτε ενότητες συχνών ερωτήσεων που τις απαντούν, γράψτε σε μορφή ερώτησης-απάντησης και στοχεύστε long-tail λέξεις-κλειδιά σε μορφή ερώτησης.",
        proTip: "PAA questions are gold for content planning. Each one represents real user interest and can be a section in your content or a standalone article.",
        proTipEl: "Οι ερωτήσεις του PAA είναι χρυσάφι για τον σχεδιασμό περιεχομένου. Κάθε μία εκφράζει πραγματικό ενδιαφέρον χρηστών και μπορεί να γίνει ενότητα σε ένα κείμενο ή αυτόνομο άρθρο.",
        relatedTerms: ["featured-snippet", "faq-schema", "long-tail-keywords"],
        relatedLinks: [
          { title: "PAA Extractor", url: "/free-tools/paa-extractor", type: "tool" }
        ]
      },
      {
        id: "rich-snippets",
        termEl: "Rich Snippets",
        shortDefinitionEl: "Αποτελέσματα αναζήτησης με επιπλέον πληροφορίες, όπως αστέρια, τιμές ή εικόνες.",
        fullDefinitionEl: "Τα rich snippets είναι αποτελέσματα αναζήτησης εμπλουτισμένα με επιπλέον οπτική πληροφορία που προέρχεται από structured data. Μπορεί να δείχνουν βαθμολογία με αστέρια, τιμές, διαθεσιμότητα, χρόνο μαγειρέματος, θερμίδες και άλλα, κάνοντας την καταχώριση πιο εντυπωσιακή.",
        term: "Rich Snippets",
        shortDefinition: "Enhanced search results displaying additional information like stars, prices, or images.",
        fullDefinition: "Rich snippets are search results enhanced with additional visual information derived from structured data. They can include star ratings, prices, availability, cooking times, calorie counts, and more - making listings more eye-catching.",
        example: "A recipe result showing: ★★★★☆ (4.5) · 45 min · 350 calories vs a plain blue link with just title and description.",
        exampleEl: "Ένα αποτέλεσμα συνταγής που δείχνει: ★★★★☆ (4,5) · 45 λεπτά · 350 θερμίδες, απέναντι σε έναν απλό μπλε σύνδεσμο με μόνο τίτλο και περιγραφή.",
        technique: "Implement relevant schema markup (Product, Recipe, Review, FAQ, HowTo), test with Rich Results Test, ensure data accuracy, avoid spammy markup.",
        techniqueEl: "Εφαρμόστε το σχετικό schema markup (Product, Recipe, Review, FAQ, HowTo), ελέγξτε το με το Rich Results Test, βεβαιωθείτε ότι τα στοιχεία είναι ακριβή και αποφύγετε το παραπλανητικό markup.",
        proTip: "Rich snippets improve CTR by 20-30%. Prioritize schema for your most important page types and track CTR changes after implementation.",
        proTipEl: "Τα rich snippets ανεβάζουν το CTR κατά 20-30%. Δώστε προτεραιότητα στο schema για τους πιο σημαντικούς τύπους σελίδων σας και παρακολουθήστε πώς αλλάζει το CTR μετά την εφαρμογή.",
        relatedTerms: ["structured-data", "schema-markup", "ctr"],
        relatedLinks: [
          { title: "Schema Generator", url: "/free-tools/schema-generator", type: "tool" }
        ]
      },
      {
        id: "knowledge-panel",
        termEl: "Knowledge Panel",
        shortDefinitionEl: "Πλαίσιο πληροφοριών για οντότητες που εμφανίζεται στη δεξιά πλευρά των αποτελεσμάτων.",
        fullDefinitionEl: "Το Knowledge Panel είναι ένα πλαίσιο στα αποτελέσματα αναζήτησης με τα βασικά στοιχεία για μια οντότητα (πρόσωπο, τόπο, οργανισμό, πράγμα). Αντλεί πληροφορίες από το Knowledge Graph της Google και από διάφορες αξιόπιστες πηγές.",
        term: "Knowledge Panel",
        shortDefinition: "An information box appearing on the right side of search results for entities.",
        fullDefinition: "A Knowledge Panel is a box that appears in search results containing key facts about entities (people, places, organizations, things). It draws information from Google's Knowledge Graph and various trusted sources.",
        example: "Searching 'Apple Inc' shows a panel with logo, stock price, CEO, founding date, headquarters, etc.",
        exampleEl: "Η αναζήτηση «Apple Inc» δείχνει ένα panel με λογότυπο, τιμή μετοχής, CEO, ημερομηνία ίδρυσης, έδρα κ.λπ.",
        technique: "Claim and verify your Google Business Profile, maintain consistent NAP across the web, build Wikipedia presence (if notable), use Organization schema, cultivate authoritative mentions.",
        techniqueEl: "Διεκδικήστε και επαληθεύστε το Google Business Profile σας, κρατήστε τα ίδια στοιχεία NAP σε όλο το διαδίκτυο, αποκτήστε παρουσία στη Wikipedia (αν είστε αρκετά γνωστοί), χρησιμοποιήστε Organization schema και καλλιεργήστε αναφορές από έγκυρες πηγές.",
        proTip: "You can suggest edits to your Knowledge Panel if you're the verified representative of the entity. Look for 'Claim this knowledge panel' at the bottom.",
        proTipEl: "Αν είστε ο επαληθευμένος εκπρόσωπος της οντότητας, μπορείτε να προτείνετε αλλαγές στο Knowledge Panel. Ψάξτε το «Claim this knowledge panel» στο κάτω μέρος.",
        relatedTerms: ["knowledge-graph", "entity-seo", "google-business-profile"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-pack",
        termEl: "Local Pack",
        shortDefinitionEl: "Ένας χάρτης με 3 τοπικές επιχειρήσεις που εμφανίζεται σε αναζητήσεις με τοπικό χαρακτήρα.",
        fullDefinitionEl: "Το Local Pack (λέγεται και Map Pack ή 3-Pack) είναι στοιχείο της SERP που δείχνει έναν χάρτη και τρεις τοπικές επιχειρήσεις για αναζητήσεις με τοπική πρόθεση. Εμφανίζεται σε περίοπτη θέση και είναι κρίσιμο για τις τοπικές επιχειρήσεις.",
        term: "Local Pack",
        shortDefinition: "A map with 3 local business listings appearing for location-based searches.",
        fullDefinition: "The Local Pack (also called Map Pack or 3-Pack) is a SERP feature displaying a map and three local business listings for queries with local intent. It appears prominently and is crucial for local businesses.",
        example: "Searching 'coffee shops near me' shows a map with 3 nearby coffee shops, their ratings, hours, and directions.",
        exampleEl: "Η αναζήτηση «καφετέριες κοντά μου» δείχνει έναν χάρτη με 3 κοντινές καφετέριες, τις βαθμολογίες τους, το ωράριο και οδηγίες διαδρομής.",
        technique: "Optimize Google Business Profile, ensure NAP consistency, build local citations, get reviews, use local keywords, add location pages, embed Google Maps.",
        techniqueEl: "Βελτιστοποιήστε το Google Business Profile, κρατήστε ίδια τα στοιχεία NAP παντού, αποκτήστε τοπικές αναφορές (citations), μαζέψτε κριτικές, χρησιμοποιήστε τοπικές λέξεις-κλειδιά, προσθέστε σελίδες ανά περιοχή και ενσωματώστε Google Maps.",
        proTip: "Proximity is a major factor, but you can compete with businesses closer to the searcher by having better reviews, more complete profile, and stronger local signals.",
        proTipEl: "Η απόσταση μετράει πολύ, αλλά μπορείτε να ανταγωνιστείτε επιχειρήσεις πιο κοντά στον χρήστη με καλύτερες κριτικές, πιο πλήρες προφίλ και ισχυρότερα τοπικά σήματα.",
        relatedTerms: ["google-business-profile", "local-seo", "nap"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "image-pack",
        termEl: "Image Pack",
        shortDefinitionEl: "Μια σειρά από εικόνες που εμφανίζεται μέσα στα οργανικά αποτελέσματα.",
        fullDefinitionEl: "Το Image Pack είναι μια οριζόντια σειρά εικόνων που εμφανίζεται μέσα στα οργανικά αποτελέσματα, σε αναζητήσεις όπου το οπτικό περιεχόμενο έχει σημασία. Πατώντας μια εικόνα, ο χρήστης πηγαίνει στο Google Images ή απευθείας στη σελίδα-πηγή.",
        term: "Image Pack",
        shortDefinition: "A row of images appearing in organic search results.",
        fullDefinition: "The Image Pack is a horizontal row of images that appears within organic search results for queries where visual content is relevant. Clicking these images takes users to Google Images or directly to the source page.",
        example: "Searching 'running shoe styles' might show an image pack with photos of different running shoes inline with web results.",
        exampleEl: "Η αναζήτηση «στυλ παπουτσιών τρεξίματος» μπορεί να δείξει ένα image pack με φωτογραφίες από διάφορα παπούτσια ανάμεσα στα αποτελέσματα.",
        technique: "Optimize images with descriptive filenames, use relevant alt text, ensure images are high quality, create image-heavy content for visual queries, use image sitemaps.",
        techniqueEl: "Βελτιστοποιήστε τις εικόνες με περιγραφικά ονόματα αρχείων, σχετικό alt text και υψηλή ποιότητα, φτιάξτε περιεχόμενο με πολλές εικόνες για αναζητήσεις με οπτικό χαρακτήρα και χρησιμοποιήστε image sitemaps.",
        proTip: "Images that appear in the Image Pack often drive significant traffic. Check GSC's 'Image' search type to see which images are performing.",
        proTipEl: "Οι εικόνες που εμφανίζονται στο Image Pack φέρνουν συχνά σημαντική επισκεψιμότητα. Επιλέξτε τον τύπο αναζήτησης «Εικόνα» στο Search Console για να δείτε ποιες εικόνες αποδίδουν.",
        relatedTerms: ["image-seo", "image-alt-text", "visual-search"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "video-carousel",
        termEl: "Video Carousel",
        shortDefinitionEl: "Μια σειρά από αποτελέσματα βίντεο που κυλάει οριζόντια, συνήθως από το YouTube.",
        fullDefinitionEl: "Το Video Carousel είναι στοιχείο της SERP με μια οριζόντια σειρά από μικρογραφίες βίντεο, σε αναζητήσεις όπου το βίντεο έχει σημασία. Τα βίντεο προέρχονται κυρίως από το YouTube και δείχνουν τίτλο, κανάλι και διάρκεια.",
        term: "Video Carousel",
        shortDefinition: "A scrollable row of video results, typically from YouTube.",
        fullDefinition: "The Video Carousel is a SERP feature showing a horizontal, scrollable row of video thumbnails for queries where video content is relevant. Videos are primarily from YouTube and display titles, channels, and durations.",
        example: "Searching 'how to tie a tie' shows a video carousel with tutorial videos from various YouTube channels.",
        exampleEl: "Η αναζήτηση «πώς δένω γραβάτα» δείχνει ένα video carousel με εκπαιδευτικά βίντεο από διάφορα κανάλια του YouTube.",
        technique: "Create video content for informational queries, optimize YouTube titles/descriptions, use Video schema on embedded videos, create engaging thumbnails, add timestamps.",
        techniqueEl: "Φτιάξτε βίντεο για πληροφοριακές αναζητήσεις, βελτιστοποιήστε τίτλους και περιγραφές στο YouTube, χρησιμοποιήστε Video schema στα ενσωματωμένα βίντεο, φτιάξτε ελκυστικές μικρογραφίες και προσθέστε χρονοσημάνσεις.",
        proTip: "Videos often appear for 'how to' queries. If you see video carousels for your target keywords, consider creating video content - or you're missing a major traffic opportunity.",
        proTipEl: "Τα βίντεο εμφανίζονται συχνά σε αναζητήσεις «πώς να». Αν βλέπετε video carousels για τις λέξεις-κλειδιά σας, σκεφτείτε να φτιάξετε βίντεο, αλλιώς χάνετε μια μεγάλη ευκαιρία επισκεψιμότητας.",
        relatedTerms: ["youtube-seo", "video-schema", "serp-features"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "ai-overview",
        termEl: "AI Overview (SGE)",
        shortDefinitionEl: "Σύνοψη που δημιουργεί η AI της Google και εμφανίζεται στην κορυφή των αποτελεσμάτων.",
        fullDefinitionEl: "Το AI Overview (παλαιότερα Search Generative Experience/SGE) είναι η λειτουργία της Google με AI που δίνει μια συνθετική απάντηση στην κορυφή των αποτελεσμάτων. Συνδυάζει πληροφορίες από πολλές πηγές και μπορεί να αλλάξει τον τρόπο που οι χρήστες αλληλεπιδρούν με τα αποτελέσματα.",
        term: "AI Overview (SGE)",
        shortDefinition: "AI-generated summary appearing at the top of search results.",
        fullDefinition: "AI Overview (formerly Search Generative Experience/SGE) is Google's AI-powered feature that provides a synthesized answer at the top of search results. It combines information from multiple sources and may change how users interact with search results.",
        example: "Searching 'best time to visit Japan' might show an AI-generated overview summarizing weather, events, and tourist seasons with source links.",
        exampleEl: "Η αναζήτηση «καλύτερη εποχή για ταξίδι στην Ιαπωνία» μπορεί να δείξει ένα AI Overview που συνοψίζει καιρό, εκδηλώσεις και τουριστικές περιόδους, με συνδέσμους στις πηγές.",
        technique: "Focus on E-E-A-T signals, create authoritative content that could be cited, use clear structure, answer questions comprehensively, build topical authority.",
        techniqueEl: "Εστιάστε στα σήματα E-E-A-T, γράψτε έγκυρο περιεχόμενο που αξίζει να παρατεθεί ως πηγή, με σαφή δομή, απαντήστε στις ερωτήσεις ολοκληρωμένα και χτίστε θεματικό κύρος.",
        proTip: "Being cited in AI Overviews may become crucial. Focus on being the authoritative source that AI wants to reference, not just ranking #1.",
        proTipEl: "Η αναφορά σας ως πηγή στα AI Overviews μπορεί να γίνει κρίσιμη. Στοχεύστε να είστε η έγκυρη πηγή που θέλει να παραθέσει η AI, όχι μόνο να βγαίνετε #1.",
        relatedTerms: ["llm-seo", "zero-click-search", "serp-features"],
        relatedLinks: [
          { title: "AI Overview Checker", url: "/free-tools/ai-overview-checker", type: "tool" },
          { title: "LLM Citations & Brand Visibility", url: "/blog/llm-citations-brand-visibility", type: "blog" }
        ]
      }
    ]
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "Optimization for location-based searches and local businesses",
    icon: MapPin,
    color: "red",
    terms: [
      {
        id: "local-seo-term",
        termEl: "Τοπικό SEO (Local SEO)",
        shortDefinitionEl: "Βελτιστοποίηση για τοπικές αναζητήσεις και το map pack της Google (Αθήνα, Θεσσαλονίκη, «κοντά μου»).",
        fullDefinitionEl: "Το τοπικό SEO βοηθά επιχειρήσεις με φυσική ή γεωγραφική εμβέλεια να εμφανίζονται στο map pack και στα τοπικά αποτελέσματα. Κεντρικά στοιχεία: Google Business Profile, σταθερό NAP, κριτικές, τοπικές σελίδες και citations.",
        term: "Local SEO",
        shortDefinition: "Optimization for map pack and location-based search results.",
        fullDefinition: "Local SEO helps businesses appear in Google’s map pack and local results for city and “near me” queries through GBP, NAP consistency, reviews, local pages, and citations.",
        example: "Ranking in the map pack for 'seo θεσσαλονικη' with a complete GBP and a dedicated Thessaloniki service page.",
        exampleEl: "Κατάταξη στο map pack για το «seo θεσσαλονικη» με πλήρες Google Business Profile και ξεχωριστή σελίδα υπηρεσίας για τη Θεσσαλονίκη.",
        technique: "Complete GBP fields, keep NAP identical everywhere, build location pages, collect and reply to reviews, add LocalBusiness schema.",
        techniqueEl: "Συμπληρώστε όλα τα πεδία του Google Business Profile, κρατήστε το NAP ίδιο παντού, φτιάξτε σελίδες ανά περιοχή, μαζέψτε κριτικές και απαντήστε σε αυτές και προσθέστε LocalBusiness schema.",
        relatedTerms: ["google-business-profile", "nap", "local-pack"],
        relatedLinks: [
          { title: "Τοπικό SEO υπηρεσία", url: "/el/services/local-seo", type: "feature" },
          { title: "SEO Θεσσαλονίκη", url: "/el/services/local-seo/thessaloniki-gr", type: "feature" }
        ]
      },
      {
        id: "google-business-profile",
        termEl: "Google Business Profile (Επιχειρηματικό Προφίλ Google)",
        shortDefinitionEl: "Το δωρεάν προφίλ της επιχείρησης στο Google Maps και την τοπική αναζήτηση.",
        fullDefinitionEl: "Το Google Business Profile (πρώην Google My Business) είναι το εργαλείο που κρίνει τις αναζητήσεις «κοντά μου» και το τοπικό «τρίο» του χάρτη. Πλήρες προφίλ με σωστή κατηγορία, φωτογραφίες, ωράριο και σταθερή ροή κριτικών με απαντήσεις είναι το 60% του τοπικού SEO για ελληνικές επιχειρήσεις.",
        term: "Google Business Profile (GBP)",
        shortDefinition: "Free Google tool for managing your business's appearance in search and maps.",
        fullDefinition: "Google Business Profile (formerly Google My Business) is a free tool that allows businesses to manage their online presence across Google Search and Maps. It displays business information, hours, reviews, photos, and posts.",
        example: "When someone searches 'pizza near me', GBP determines which businesses appear in the Local Pack with their hours, ratings, and location.",
        exampleEl: "Όταν κάποιος ψάχνει «πίτσα κοντά μου», το Google Business Profile καθορίζει ποιες επιχειρήσεις εμφανίζονται στο Local Pack, με ωράριο, βαθμολογία και τοποθεσία.",
        technique: "Complete every field, choose accurate categories, add high-quality photos, post regularly, respond to all reviews, enable messaging, keep hours updated.",
        techniqueEl: "Συμπληρώστε κάθε πεδίο, διαλέξτε ακριβείς κατηγορίες, ανεβάστε φωτογραφίες υψηλής ποιότητας, δημοσιεύετε τακτικά, απαντάτε σε όλες τις κριτικές, ενεργοποιήστε τα μηνύματα και κρατάτε το ωράριο ενημερωμένο.",
        proTip: "Add products/services with descriptions and prices. Many businesses skip this, but it helps you appear for more specific local searches.",
        proTipEl: "Προσθέστε προϊόντα και υπηρεσίες με περιγραφές και τιμές. Πολλές επιχειρήσεις το παραλείπουν, αλλά σας βοηθά να εμφανίζεστε σε πιο συγκεκριμένες τοπικές αναζητήσεις.",
        relatedTerms: ["local-pack", "local-seo", "nap"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "nap",
        termEl: "NAP (Όνομα, Διεύθυνση, Τηλέφωνο)",
        shortDefinitionEl: "Τα στοιχεία επικοινωνίας της επιχείρησης, που πρέπει να είναι ίδια σε όλο το διαδίκτυο.",
        fullDefinitionEl: "NAP σημαίνει Name, Address, Phone: όνομα, διεύθυνση και τηλέφωνο. Είναι τα κρίσιμα στοιχεία της επιχείρησης που πρέπει να είναι ίδια στην ιστοσελίδα σας, στο Google Business Profile, στους καταλόγους και σε κάθε αναφορά στο διαδίκτυο. Οι ασυνέπειες μπερδεύουν τις μηχανές αναζήτησης και ρίχνουν τις τοπικές κατατάξεις.",
        term: "NAP (Name, Address, Phone)",
        shortDefinition: "Business contact information that must be consistent across the web.",
        fullDefinition: "NAP stands for Name, Address, and Phone number - the critical business information that should be consistent across your website, Google Business Profile, directories, and all online mentions. Inconsistency confuses search engines and hurts local rankings.",
        example: "If your GBP says '123 Main St' but your website says '123 Main Street, Suite 100', that's NAP inconsistency.",
        exampleEl: "Αν το Google Business Profile γράφει «Ερμού 12» αλλά η ιστοσελίδα σας «Οδός Ερμού 12, 2ος όροφος», αυτό είναι ασυνέπεια στο NAP.",
        technique: "Audit all citations for consistency, use the exact same format everywhere, include NAP in website footer, use LocalBusiness schema, fix variations promptly.",
        techniqueEl: "Ελέγξτε όλες τις καταχωρήσεις για συνέπεια, χρησιμοποιήστε ακριβώς την ίδια μορφή παντού, βάλτε το NAP στο footer της ιστοσελίδας, χρησιμοποιήστε LocalBusiness schema και διορθώνετε αμέσως τις παραλλαγές.",
        proTip: "Create a master document with your exact NAP format. Use it when submitting to any directory or platform. Even small variations can hurt.",
        proTipEl: "Φτιάξτε ένα έγγραφο αναφοράς με την ακριβή μορφή του NAP σας και χρησιμοποιείτε αυτό σε κάθε κατάλογο ή πλατφόρμα. Ακόμα και μικρές διαφορές μπορεί να βλάψουν.",
        relatedTerms: ["local-citations", "google-business-profile", "local-seo"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-citations",
        termEl: "Local Citations (Τοπικές Καταχωρήσεις)",
        shortDefinitionEl: "Αναφορές της επιχείρησης (όνομα, διεύθυνση, τηλέφωνο) σε καταλόγους και τοπικά sites.",
        fullDefinitionEl: "Citations είναι οι αναφορές των στοιχείων NAP (Name, Address, Phone) σε καταλόγους όπως Vrisko, XO και κλαδικά directories. Η συνέπεια μετράει: ίδια στοιχεία παντού. Ασυνεπείς καταχωρήσεις (παλιά διεύθυνση, διαφορετικό τηλέφωνο) μπερδεύουν τη Google και υπονομεύουν τις τοπικές κατατάξεις.",
        term: "Local Citations",
        shortDefinition: "Online mentions of your business name, address, and phone number.",
        fullDefinition: "Local citations are online references to your business's NAP information on websites, directories, apps, and social platforms. They help search engines verify your business exists and is legitimate, impacting local search rankings.",
        example: "Listings on Yelp, Yellow Pages, Facebook, industry directories, local chamber of commerce - each is a citation.",
        exampleEl: "Καταχωρήσεις σε Yelp, Yellow Pages, Facebook, κλαδικούς καταλόγους και στο τοπικό επιμελητήριο: η καθεμία είναι ένα citation. Στην Ελλάδα αντίστοιχοι κατάλογοι είναι το Vrisko και το XO.",
        technique: "Submit to major directories first (Yelp, Facebook, Apple Maps, Bing Places), then industry-specific directories, ensure consistency, remove duplicates, fix incorrect listings.",
        techniqueEl: "Ξεκινήστε από τους μεγάλους καταλόγους (Yelp, Facebook, Apple Maps, Bing Places), συνεχίστε με κλαδικούς καταλόγους, κρατήστε τα στοιχεία ίδια, αφαιρέστε τα διπλότυπα και διορθώστε τις λανθασμένες καταχωρήσεις.",
        proTip: "Quality over quantity. Citations from authoritative, relevant sources matter more than hundreds from low-quality directories.",
        proTipEl: "Ποιότητα πάνω από ποσότητα. Τα citations από έγκυρες, σχετικές πηγές μετρούν περισσότερο από εκατοντάδες σε καταλόγους χαμηλής ποιότητας.",
        relatedTerms: ["nap", "google-business-profile", "local-seo"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "local-keywords",
        termEl: "Local Keywords (Τοπικές λέξεις-κλειδιά)",
        shortDefinitionEl: "Αναζητήσεις που περιέχουν τοποθεσία ή υπονοούν τοπική πρόθεση.",
        fullDefinitionEl: "Οι τοπικές λέξεις-κλειδιά είναι αναζητήσεις που περιέχουν τοποθεσία (πόλη, γειτονιά, «κοντά μου») ή έχουν έμμεση τοπική πρόθεση. Είναι απαραίτητες για επιχειρήσεις που απευθύνονται σε πελάτες συγκεκριμένης περιοχής.",
        term: "Local Keywords",
        shortDefinition: "Search terms that include geographic modifiers or imply local intent.",
        fullDefinition: "Local keywords are search terms that include location modifiers (city, neighborhood, 'near me') or have implicit local intent. They're essential for businesses targeting customers in specific geographic areas.",
        example: "'plumber in Brooklyn', 'best coffee shop downtown Seattle', 'dentist near me', '24-hour pharmacy Chicago'",
        exampleEl: "«υδραυλικός Περιστέρι», «καλύτερη καφετέρια κέντρο Θεσσαλονίκης», «οδοντίατρος κοντά μου», «διανυκτερεύον φαρμακείο Πάτρα»",
        technique: "Research local search volume, include city/neighborhood names in content, create location-specific landing pages, optimize for 'near me' queries, use location in title tags.",
        techniqueEl: "Ερευνήστε τον τοπικό όγκο αναζήτησης, αναφέρετε ονόματα πόλεων και γειτονιών στο περιεχόμενο, φτιάξτε landing pages ανά περιοχή, βελτιστοποιήστε για αναζητήσεις «κοντά μου» και βάλτε την τοποθεσία στα title tags.",
        proTip: "Don't just add city names randomly. Create genuinely useful local content that mentions neighborhoods, landmarks, and local references naturally.",
        proTipEl: "Μην προσθέτετε ονόματα πόλεων στην τύχη. Φτιάξτε πραγματικά χρήσιμο τοπικό περιεχόμενο που αναφέρει φυσικά γειτονιές, αξιοθέατα και τοπικά σημεία αναφοράς.",
        relatedTerms: ["geo-targeting", "local-content", "location-pages"],
        relatedLinks: [
          { title: "Keyword Research & Clustering", url: "/features/keyword-research-clustering", type: "feature" }
        ]
      },
      {
        id: "review-management",
        termEl: "Review Management (Διαχείριση κριτικών)",
        shortDefinitionEl: "Η παρακολούθηση των κριτικών πελατών, οι απαντήσεις σε αυτές και η ενθάρρυνση νέων.",
        fullDefinitionEl: "Η διαχείριση κριτικών σημαίνει να παρακολουθείτε ενεργά τις κριτικές σε όλες τις πλατφόρμες, να απαντάτε επαγγελματικά τόσο στα θετικά όσο και στα αρνητικά σχόλια και να εφαρμόζετε τρόπους που ενθαρρύνουν τους ικανοποιημένους πελάτες να γράψουν κριτική.",
        term: "Review Management",
        shortDefinition: "The practice of monitoring, responding to, and encouraging customer reviews.",
        fullDefinition: "Review management involves actively monitoring reviews across platforms, responding professionally to both positive and negative feedback, and implementing strategies to encourage satisfied customers to leave reviews.",
        example: "Responding to a negative review: 'We're sorry about your experience. Please contact us at [email] so we can make this right.'",
        exampleEl: "Απάντηση σε αρνητική κριτική: «Λυπούμαστε για την εμπειρία σας. Επικοινωνήστε μαζί μας στο [email] για να το διορθώσουμε.»",
        technique: "Respond to all reviews within 24-48 hours, thank positive reviewers, address negative reviews professionally, never argue, ask happy customers for reviews at the right moment.",
        techniqueEl: "Απαντάτε σε όλες τις κριτικές μέσα σε 24-48 ώρες, ευχαριστείτε όσους γράφουν θετικά, χειρίζεστε τις αρνητικές επαγγελματικά, δεν μπαίνετε ποτέ σε αντιπαράθεση και ζητάτε κριτική από ευχαριστημένους πελάτες την κατάλληλη στιγμή.",
        proTip: "Negative reviews handled well can build trust. A thoughtful response shows potential customers you care. Never buy fake reviews - Google will catch you.",
        proTipEl: "Μια αρνητική κριτική που τη χειριστήκατε σωστά μπορεί να χτίσει εμπιστοσύνη. Μια προσεγμένη απάντηση δείχνει στους υποψήφιους πελάτες ότι νοιάζεστε. Μην αγοράζετε ποτέ ψεύτικες κριτικές: η Google θα το καταλάβει.",
        relatedTerms: ["google-business-profile", "local-seo", "reputation-management"],
        relatedLinks: [
          { title: "Local SEO & Google Maps", url: "/features/local-seo-google-maps", type: "feature" }
        ]
      },
      {
        id: "geo-targeting",
        termEl: "Geo-Targeting (Γεωγραφική στόχευση)",
        shortDefinitionEl: "Προβολή περιεχομένου ή αποτελεσμάτων ανάλογα με τη γεωγραφική θέση του χρήστη.",
        fullDefinitionEl: "Η γεωγραφική στόχευση είναι η προβολή διαφορετικού περιεχομένου, διαφημίσεων ή αποτελεσμάτων αναζήτησης στους χρήστες ανάλογα με το πού βρίσκονται. Στο SEO σημαίνει βελτιστοποίηση για συγκεκριμένες περιοχές, ώστε οι μηχανές αναζήτησης να καταλαβαίνουν ποιες περιοχές στοχεύετε.",
        term: "Geo-Targeting",
        shortDefinition: "Delivering content or results based on a user's geographic location.",
        fullDefinition: "Geo-targeting is the practice of delivering different content, ads, or search results to users based on their geographic location. In SEO, it involves optimizing for specific locations and ensuring search engines understand your target areas.",
        example: "A national pizza chain showing different locations and menus based on whether you're searching from New York or Los Angeles.",
        exampleEl: "Μια αλυσίδα πιτσαρίας με πανελλαδική παρουσία δείχνει διαφορετικά καταστήματα και μενού αν ψάχνετε από την Αθήνα ή από τη Θεσσαλονίκη.",
        technique: "Use hreflang for international targeting, create location-specific landing pages, implement LocalBusiness schema, set geographic target in GSC (if applicable).",
        techniqueEl: "Χρησιμοποιήστε hreflang για διεθνή στόχευση, φτιάξτε landing pages ανά περιοχή, εφαρμόστε LocalBusiness schema και ορίστε γεωγραφικό στόχο στο Search Console (όπου ισχύει).",
        proTip: "For multi-location businesses, don't create thin doorway pages. Each location page should have unique, valuable content about that specific location.",
        proTipEl: "Αν έχετε πολλά καταστήματα, μη φτιάχνετε φτωχές doorway pages. Κάθε σελίδα καταστήματος πρέπει να έχει μοναδικό, χρήσιμο περιεχόμενο για τη συγκεκριμένη τοποθεσία.",
        relatedTerms: ["local-keywords", "hreflang", "location-pages"],
        relatedLinks: [
          { title: "Hreflang Builder", url: "/free-tools/hreflang-builder", type: "tool" }
        ]
      }
    ]
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    description: "Planning and creating content that ranks and converts",
    icon: BookOpen,
    color: "indigo",
    terms: [
      {
        id: "e-e-a-t",
        termEl: "E-E-A-T",
        shortDefinitionEl: "Εμπειρία, εξειδίκευση, κύρος, αξιοπιστία: οι οδηγίες της Google για την ποιότητα του περιεχομένου.",
        fullDefinitionEl: "Το E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness: εμπειρία, εξειδίκευση, κύρος, αξιοπιστία) είναι το πλαίσιο της Google για την αξιολόγηση της ποιότητας του περιεχομένου. Είναι ιδιαίτερα σημαντικό στα θέματα YMYL (Your Money Your Life: υγεία, οικονομικά, ασφάλεια). Το επιπλέον E της εμπειρίας προστέθηκε το 2022.",
        term: "E-E-A-T",
        shortDefinition: "Experience, Expertise, Authoritativeness and Trustworthiness: Google's content quality guidelines.",
        fullDefinition: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is Google's framework for evaluating content quality. It's especially important for YMYL (Your Money Your Life) topics. The extra E for Experience was added in 2022.",
        example: "A medical article written by a licensed doctor (expertise) who has treated patients (experience) for a respected hospital (authority) with cited sources (trust).",
        exampleEl: "Ένα ιατρικό άρθρο γραμμένο από αδειούχο γιατρό (εξειδίκευση) που έχει θεραπεύσει ασθενείς (εμπειρία), για ένα αναγνωρισμένο νοσοκομείο (κύρος), με παραπομπές σε πηγές (αξιοπιστία).",
        technique: "Display author credentials, link to authoritative sources, show real experience, get mentions/links from authorities, use HTTPS, display contact info, update content regularly.",
        techniqueEl: "Δείξτε τα προσόντα του συγγραφέα, παραπέμψτε σε έγκυρες πηγές, αναδείξτε πραγματική εμπειρία, αποκτήστε αναφορές και συνδέσμους από έγκυρους φορείς, χρησιμοποιήστε HTTPS, εμφανίστε στοιχεία επικοινωνίας και ανανεώνετε τακτικά το περιεχόμενο.",
        proTip: "E-E-A-T isn't a direct ranking factor - it's what Google's quality raters use. But optimizing for it aligns with what Google's algorithms reward.",
        proTipEl: "Το E-E-A-T δεν είναι άμεσος παράγοντας κατάταξης: είναι αυτό που χρησιμοποιούν οι αξιολογητές ποιότητας της Google. Όμως η βελτιστοποίηση γι' αυτό συμβαδίζει με ό,τι επιβραβεύουν οι αλγόριθμοι της Google.",
        relatedTerms: ["ymyl", "content-quality", "author-authority"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "content-decay",
        termEl: "Content Decay (Φθορά περιεχομένου)",
        shortDefinitionEl: "Η σταδιακή πτώση της οργανικής επισκεψιμότητας και των κατατάξεων του παλαιότερου περιεχομένου.",
        fullDefinitionEl: "Η φθορά περιεχομένου συμβαίνει όταν περιεχόμενο που κάποτε απέδιδε καλά χάνει σταδιακά κατατάξεις και επισκεψιμότητα. Συμβαίνει καθώς το περιεχόμενο παλιώνει, οι ανταγωνιστές δημοσιεύουν κάτι καλύτερο ή αλλάζουν οι ανάγκες των χρηστών.",
        term: "Content Decay",
        shortDefinition: "The gradual decline in organic traffic and rankings of older content.",
        fullDefinition: "Content decay occurs when previously high-performing content gradually loses rankings and traffic over time. This happens as content becomes outdated, competitors publish better content, or user needs evolve.",
        example: "A 'Best Tools 2024' article that ranked #1 now ranks #15 because it's outdated and competitors have 2026 versions.",
        exampleEl: "Ένα άρθρο «Τα καλύτερα εργαλεία 2024» που ήταν #1 τώρα είναι #15, επειδή έχει παλιώσει και οι ανταγωνιστές έχουν εκδόσεις για το 2026.",
        technique: "Monitor traffic trends per page, identify decaying content before it's too late, update with current information, refresh titles with current year, add new sections, improve comprehensiveness.",
        techniqueEl: "Παρακολουθείτε την επισκεψιμότητα ανά σελίδα, εντοπίστε το περιεχόμενο που φθίνει πριν είναι αργά, ενημερώστε το με τρέχουσες πληροφορίες, ανανεώστε τους τίτλους με την τρέχουσα χρονιά, προσθέστε νέες ενότητες και κάντε το πιο ολοκληρωμένο.",
        proTip: "Set calendar reminders to review evergreen content quarterly. Preventing decay is easier than recovering from it.",
        proTipEl: "Βάλτε υπενθύμιση στο ημερολόγιο να ελέγχετε το διαχρονικό περιεχόμενο κάθε τρίμηνο. Είναι πιο εύκολο να προλάβετε τη φθορά παρά να ανακάμψετε από αυτήν.",
        relatedTerms: ["content-freshness", "content-update", "evergreen-content"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "topic-clusters",
        termEl: "Topic Clusters (Θεματικοί κόμβοι περιεχομένου)",
        shortDefinitionEl: "Στρατηγική οργάνωσης περιεχομένου που συνδέει σχετικά άρθρα γύρω από μια κεντρική pillar page.",
        fullDefinitionEl: "Τα topic clusters είναι μια αρχιτεκτονική περιεχομένου όπου μια ολοκληρωμένη pillar page καλύπτει ένα ευρύ θέμα και πολλές σελίδες του cluster αναλύουν σε βάθος τα επιμέρους υποθέματα. Όλες οι σελίδες του cluster συνδέονται με την pillar page και το αντίστροφο, δημιουργώντας σημασιολογική σχέση.",
        term: "Topic Clusters",
        shortDefinition: "A content organization strategy linking related articles around a pillar page.",
        fullDefinition: "Topic clusters are a content architecture strategy where a comprehensive pillar page covers a broad topic, and multiple cluster pages cover related subtopics in depth. All cluster pages link to the pillar and vice versa, creating a semantic relationship.",
        example: "Pillar: 'Complete Guide to Running' → Clusters: 'Running Shoes', 'Training Plans', 'Nutrition for Runners', 'Injury Prevention'",
        exampleEl: "Pillar: «Πλήρης οδηγός για το τρέξιμο» → Clusters: «Παπούτσια τρεξίματος», «Προγράμματα προπόνησης», «Διατροφή για δρομείς», «Πρόληψη τραυματισμών»",
        technique: "Identify core topics for pillar pages, create detailed cluster content for subtopics, use consistent internal linking structure, ensure anchor text reflects topic relationships.",
        techniqueEl: "Εντοπίστε τα βασικά θέματα για τις pillar pages, γράψτε αναλυτικό περιεχόμενο για τα υποθέματα, κρατήστε σταθερή δομή εσωτερικών συνδέσμων και φροντίστε το anchor text να αντικατοπτρίζει τη σχέση των θεμάτων.",
        proTip: "Pillar pages should be 3,000+ words covering the topic broadly. Cluster pages go deeper on specific aspects. Together they establish topical authority.",
        proTipEl: "Οι pillar pages πρέπει να έχουν 3.000+ λέξεις και να καλύπτουν το θέμα σε εύρος. Οι σελίδες του cluster εμβαθύνουν σε συγκεκριμένες πτυχές. Μαζί χτίζουν θεματικό κύρος.",
        relatedTerms: ["pillar-content", "internal-linking", "topical-authority"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "content-gap-analysis",
        termEl: "Content Gap Analysis (Ανάλυση κενών περιεχομένου)",
        shortDefinitionEl: "Ο εντοπισμός θεμάτων που καλύπτουν οι ανταγωνιστές και εσείς όχι.",
        fullDefinitionEl: "Η ανάλυση κενών περιεχομένου συγκρίνει το περιεχόμενό σας με των ανταγωνιστών για να εντοπίσει θέματα, λέξεις-κλειδιά ή ερωτήσεις που καλύπτουν εκείνοι και εσείς όχι. Αποκαλύπτει ευκαιρίες να κερδίσετε επισκεψιμότητα και να εξυπηρετήσετε καλύτερα το κοινό σας.",
        term: "Content Gap Analysis",
        shortDefinition: "Identifying topics competitors cover that you don't.",
        fullDefinition: "Content gap analysis is the process of comparing your content to competitors' to identify topics, keywords, or questions they cover that you're missing. It reveals opportunities to capture traffic and serve your audience better.",
        example: "Competitor ranks for 'running in rain' and 'running at night'. You have no content on these topics = content gaps.",
        exampleEl: "Ένας ανταγωνιστής κατατάσσεται για το «τρέξιμο στη βροχή» και το «τρέξιμο τη νύχτα». Εσείς δεν έχετε περιεχόμενο για αυτά τα θέματα = κενά περιεχομένου.",
        technique: "Analyze competitor keywords you don't rank for, check PAA boxes for missed questions, survey customers about unanswered needs, use content gap tools.",
        techniqueEl: "Αναλύστε τις λέξεις-κλειδιά των ανταγωνιστών για τις οποίες εσείς δεν κατατάσσεστε, δείτε στο People Also Ask ποιες ερωτήσεις σας ξέφυγαν, ρωτήστε τους πελάτες σας ποιες ανάγκες τους μένουν αναπάντητες και χρησιμοποιήστε εργαλεία ανάλυσης κενών.",
        proTip: "Not every gap needs filling. Prioritize gaps that align with your business goals and have reasonable search volume. Quality > quantity.",
        proTipEl: "Δεν χρειάζεται να καλύψετε κάθε κενό. Δώστε προτεραιότητα σε όσα ταιριάζουν με τους επιχειρηματικούς σας στόχους και έχουν λογικό όγκο αναζήτησης. Ποιότητα πάνω από ποσότητα.",
        relatedTerms: ["competitor-analysis", "keyword-research", "content-strategy"],
        relatedLinks: [
          { title: "Content Gap Analysis", url: "/features/content-gap-analysis", type: "feature" },
          { title: "Competitor Content Spy", url: "/features/competitor-content-spy", type: "feature" }
        ]
      },
      {
        id: "evergreen-content",
        termEl: "Evergreen Content (Διαχρονικό περιεχόμενο)",
        shortDefinitionEl: "Περιεχόμενο που μένει επίκαιρο και χρήσιμο για πολύ καιρό μετά τη δημοσίευσή του.",
        fullDefinitionEl: "Το διαχρονικό περιεχόμενο μένει επίκαιρο με τον καιρό και φέρνει συνεχώς επισκεψιμότητα χωρίς να παλιώνει. Καλύπτει θέματα με σταθερό ενδιαφέρον αναζήτησης, σε αντίθεση με τις ειδήσεις ή το περιεχόμενο που βασίζεται σε τάσεις.",
        term: "Evergreen Content",
        shortDefinition: "Content that remains relevant and valuable long after publication.",
        fullDefinition: "Evergreen content is content that stays relevant over time, continually attracting traffic without becoming dated. It covers timeless topics that maintain consistent search interest, unlike news or trend-based content.",
        example: "'How to tie a tie' (evergreen) vs 'Best phones of 2023' (not evergreen). The first will be relevant for decades; the second is already outdated.",
        exampleEl: "«Πώς δένω γραβάτα» (διαχρονικό) έναντι «Τα καλύτερα κινητά του 2023» (όχι διαχρονικό). Το πρώτο θα είναι επίκαιρο για δεκαετίες, το δεύτερο έχει ήδη παλιώσει.",
        technique: "Target timeless topics, avoid date-specific references unless necessary, write comprehensively, plan regular updates, focus on fundamental concepts and how-to guides.",
        techniqueEl: "Στοχεύστε θέματα που δεν παλιώνουν, αποφύγετε αναφορές σε ημερομηνίες εκτός αν είναι απαραίτητες, γράψτε ολοκληρωμένα, προγραμματίστε τακτικές ενημερώσεις και εστιάστε σε βασικές έννοιες και οδηγούς «πώς να».",
        proTip: "Even evergreen content needs occasional updates. Check annually to ensure examples, links, and best practices are current.",
        proTipEl: "Ακόμα και το διαχρονικό περιεχόμενο θέλει πού και πού ενημέρωση. Ελέγχετε μία φορά τον χρόνο ότι τα παραδείγματα, οι σύνδεσμοι και οι βέλτιστες πρακτικές είναι επίκαιρα.",
        relatedTerms: ["content-strategy", "content-decay", "long-form-content"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "thin-content",
        termEl: "Thin Content (Φτωχό περιεχόμενο)",
        shortDefinitionEl: "Σελίδες με ελάχιστη ή καμία προστιθέμενη αξία για τους χρήστες.",
        fullDefinitionEl: "Thin content είναι οι σελίδες που προσφέρουν ελάχιστη μοναδική αξία: μπορεί να είναι πολύ σύντομες, να αντιγράφουν άλλο περιεχόμενο, να έχουν παραχθεί αυτόματα ή απλώς να μη βοηθούν τον χρήστη. Η Google μπορεί να υποβαθμίσει το φτωχό περιεχόμενο ή να τιμωρήσει sites που έχουν πολύ από αυτό.",
        term: "Thin Content",
        shortDefinition: "Pages with little or no added value for users.",
        fullDefinition: "Thin content refers to pages that provide little unique value - they may be too short, duplicate other content, be auto-generated, or simply not helpful to users. Google may demote thin content or penalize sites with too much of it.",
        example: "A 100-word product description copied from the manufacturer, or tag pages with just a list of post titles and no context.",
        exampleEl: "Μια περιγραφή προϊόντος 100 λέξεων αντιγραμμένη από τον κατασκευαστή ή σελίδες ετικετών με μια σκέτη λίστα τίτλων άρθρων χωρίς κανένα πλαίσιο.",
        technique: "Audit for thin pages (under 300 words without good reason), noindex low-value pages, consolidate similar thin pages, add unique value to product descriptions.",
        techniqueEl: "Εντοπίστε τις φτωχές σελίδες (κάτω από 300 λέξεις χωρίς σοβαρό λόγο), βάλτε noindex στις σελίδες χωρίς αξία, ενώστε τις παρόμοιες φτωχές σελίδες και προσθέστε μοναδική αξία στις περιγραφές προϊόντων.",
        proTip: "Word count alone doesn't define thin content. A 200-word page that perfectly answers a simple question is better than 2,000 words of fluff.",
        proTipEl: "Ο αριθμός λέξεων από μόνος του δεν ορίζει το thin content. Μια σελίδα 200 λέξεων που απαντά τέλεια σε μια απλή ερώτηση είναι καλύτερη από 2.000 λέξεις «φλυαρίας».",
        relatedTerms: ["content-quality", "index-bloat", "duplicate-content"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "content-freshness",
        termEl: "Content Freshness (Φρεσκάδα περιεχομένου)",
        shortDefinitionEl: "Πόσο πρόσφατα δημοσιεύτηκε ή ενημερώθηκε ένα περιεχόμενο.",
        fullDefinitionEl: "Η φρεσκάδα περιεχομένου δείχνει πόσο επίκαιρο είναι το περιεχόμενό σας. Σε ορισμένες αναζητήσεις (ειδήσεις, θέματα της επικαιρότητας, «τα καλύτερα του [έτους]») η Google προτιμά το φρέσκο περιεχόμενο. Η ενημέρωση υπάρχοντος περιεχομένου μπορεί να ανεβάσει τις κατατάξεις, επειδή δείχνει ότι παραμένει σχετικό.",
        term: "Content Freshness",
        shortDefinition: "How recently content was published or updated.",
        fullDefinition: "Content freshness refers to how current your content is. For some queries (news, trending topics, 'best of [year]'), Google prefers fresh content. Updating existing content can boost rankings by signaling relevance.",
        example: "Updating your 'Best Running Shoes' post from 2024 data to 2026 data and changing the title can restore lost rankings.",
        exampleEl: "Αν ενημερώσετε το άρθρο «Τα καλύτερα παπούτσια τρεξίματος» από τα στοιχεία του 2024 σε αυτά του 2026 και αλλάξετε τον τίτλο, μπορείτε να ανακτήσετε κατατάξεις που χάσατε.",
        technique: "Update content with new information regularly, change last-modified dates only with substantial updates, add current year to titles where relevant, publish timely content for trending topics.",
        techniqueEl: "Ενημερώνετε τακτικά το περιεχόμενο με νέες πληροφορίες, αλλάζετε την ημερομηνία τελευταίας τροποποίησης μόνο σε ουσιαστικές αλλαγές, προσθέτετε την τρέχουσα χρονιά στους τίτλους όπου έχει νόημα και δημοσιεύετε έγκαιρα περιεχόμενο για θέματα της επικαιρότητας.",
        proTip: "Not all content needs freshness. 'How to boil water' doesn't need 2026 updates. But 'Best AI tools' becomes stale quickly.",
        proTipEl: "Δεν χρειάζεται όλο το περιεχόμενο φρεσκάδα. Το «πώς βράζω νερό» δεν θέλει ενημέρωση για το 2026. Το «Τα καλύτερα εργαλεία AI» όμως παλιώνει γρήγορα.",
        relatedTerms: ["content-decay", "content-update", "query-deserves-freshness"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "core-web-vitals",
    title: "Core Web Vitals",
    description: "Google's metrics for measuring user experience and page performance",
    icon: Gauge,
    color: "emerald",
    terms: [
      {
        id: "lcp",
        termEl: "LCP (Largest Contentful Paint)",
        shortDefinitionEl: "Μετρά πόσο γρήγορα γίνεται ορατό το μεγαλύτερο στοιχείο περιεχομένου της σελίδας.",
        fullDefinitionEl: "Το Largest Contentful Paint (LCP) μετρά τον χρόνο που χρειάζεται για να γίνει ορατό το μεγαλύτερο στοιχείο περιεχομένου (εικόνα, βίντεο ή μπλοκ κειμένου) στο ορατό τμήμα της οθόνης. Είναι βασικό Core Web Vital και δείχνει πόσο γρήγορη αντιλαμβάνεται ο χρήστης τη φόρτωση.",
        term: "LCP (Largest Contentful Paint)",
        shortDefinition: "Measures how quickly the largest content element becomes visible.",
        fullDefinition: "Largest Contentful Paint (LCP) measures the time it takes for the largest content element (image, video, or text block) in the viewport to become visible. It's a key Core Web Vital indicating perceived load speed.",
        example: "Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s. If your hero image takes 5 seconds to load, your LCP is 5 seconds.",
        exampleEl: "Καλό: <2,5s, Θέλει βελτίωση: 2,5-4s, Κακό: >4s. Αν η κεντρική εικόνα (hero) σας θέλει 5 δευτερόλεπτα να φορτώσει, το LCP σας είναι 5 δευτερόλεπτα.",
        technique: "Optimize and compress images, use next-gen formats (WebP), implement lazy loading, preload critical resources, use CDN, reduce server response time.",
        techniqueEl: "Βελτιστοποιήστε και συμπιέστε τις εικόνες, χρησιμοποιήστε σύγχρονες μορφές (WebP), εφαρμόστε lazy loading, κάντε preload τους κρίσιμους πόρους, χρησιμοποιήστε CDN και μειώστε τον χρόνο απόκρισης του server.",
        proTip: "Identify your LCP element using PageSpeed Insights or DevTools. Often it's a hero image - optimizing just that one element can dramatically improve LCP.",
        proTipEl: "Βρείτε ποιο είναι το στοιχείο LCP σας με το PageSpeed Insights ή τα DevTools. Συχνά είναι η κεντρική εικόνα (hero): βελτιστοποιώντας μόνο αυτήν μπορείτε να βελτιώσετε δραματικά το LCP.",
        relatedTerms: ["core-web-vitals", "page-speed", "fid", "cls"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "fid",
        termEl: "FID (First Input Delay)",
        shortDefinitionEl: "Μετρά τον χρόνο από την πρώτη αλληλεπίδραση του χρήστη μέχρι να αντιδράσει ο browser.",
        fullDefinitionEl: "Το First Input Delay (FID) μετρά τον χρόνο από τη στιγμή που ο χρήστης αλληλεπιδρά πρώτη φορά με τη σελίδα (κλικ, πάτημα στην οθόνη, πλήκτρο) μέχρι τη στιγμή που ο browser μπορεί να ανταποκριθεί. Δείχνει πόσο γρήγορα «αντιδρά» η σελίδα.",
        term: "FID (First Input Delay)",
        shortDefinition: "Measures the time from first user interaction to browser response.",
        fullDefinition: "First Input Delay (FID) measures the time between when a user first interacts with your page (clicks, taps, presses a key) and when the browser can respond. It indicates how responsive your page feels.",
        example: "Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms. If you click a button and nothing happens for 500ms, that's poor FID.",
        exampleEl: "Καλό: <100ms, Θέλει βελτίωση: 100-300ms, Κακό: >300ms. Αν πατάτε ένα κουμπί και δεν συμβαίνει τίποτα για 500ms, το FID είναι κακό.",
        technique: "Minimize JavaScript execution, break up long tasks, use web workers, defer non-critical JavaScript, remove unused code, reduce third-party script impact.",
        techniqueEl: "Περιορίστε την εκτέλεση JavaScript, σπάστε τις μεγάλες εργασίες σε μικρότερες, χρησιμοποιήστε web workers, καθυστερήστε (defer) τη μη κρίσιμη JavaScript, αφαιρέστε τον κώδικα που δεν χρησιμοποιείται και μειώστε την επίδραση των scripts τρίτων.",
        proTip: "FID is being replaced by INP (Interaction to Next Paint). Start measuring INP now as it will become the primary responsiveness metric.",
        proTipEl: "Το FID αντικαθίσταται από το INP (Interaction to Next Paint). Ξεκινήστε να μετράτε από τώρα το INP, γιατί θα γίνει η κύρια μετρική απόκρισης.",
        relatedTerms: ["core-web-vitals", "inp", "javascript-optimization"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" }
        ]
      },
      {
        id: "cls",
        termEl: "CLS (Cumulative Layout Shift)",
        shortDefinitionEl: "Μετρά την οπτική σταθερότητα, καταγράφοντας τις απρόσμενες μετακινήσεις στη διάταξη της σελίδας.",
        fullDefinitionEl: "Το Cumulative Layout Shift (CLS) μετρά πόσο μετακινείται απρόσμενα το περιεχόμενο της σελίδας κατά τη φόρτωση. Ένα υψηλό CLS εκνευρίζει τους χρήστες, γιατί τα στοιχεία μετακινούνται ενώ προσπαθούν να αλληλεπιδράσουν με τη σελίδα.",
        term: "CLS (Cumulative Layout Shift)",
        shortDefinition: "Measures visual stability by tracking unexpected layout movements.",
        fullDefinition: "Cumulative Layout Shift (CLS) measures how much page content unexpectedly shifts during loading. High CLS frustrates users when elements move as they try to interact with the page.",
        example: "Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25. A button that moves as an ad loads above it = high CLS.",
        exampleEl: "Καλό: <0,1, Θέλει βελτίωση: 0,1-0,25, Κακό: >0,25. Ένα κουμπί που μετακινείται επειδή φορτώνει μια διαφήμιση από πάνω του = υψηλό CLS.",
        technique: "Set explicit dimensions for images/videos, reserve space for ads/embeds, avoid inserting content above existing content, use CSS transform for animations.",
        techniqueEl: "Ορίστε συγκεκριμένες διαστάσεις σε εικόνες και βίντεο, κρατήστε χώρο για διαφημίσεις και ενσωματωμένο περιεχόμενο, μην προσθέτετε περιεχόμενο πάνω από το υπάρχον και χρησιμοποιήστε CSS transform για τα animations.",
        proTip: "Ads are often the biggest CLS culprits. Reserve exact pixel dimensions for ad containers to prevent shifts when ads load.",
        proTipEl: "Οι διαφημίσεις είναι συχνά ο μεγαλύτερος ένοχος για το CLS. Δεσμεύστε ακριβείς διαστάσεις σε pixels για τα πλαίσια των διαφημίσεων, ώστε να μη μετακινείται τίποτα όταν φορτώνουν.",
        relatedTerms: ["core-web-vitals", "layout-stability", "page-experience"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "CWV Troubleshooting", url: "/help/cwv-troubleshooting", type: "help" }
        ]
      },
      {
        id: "inp",
        termEl: "INP (Interaction to Next Paint)",
        shortDefinitionEl: "Μετρά πόσο γρήγορα ανταποκρίνεται συνολικά η σελίδα στις αλληλεπιδράσεις του χρήστη.",
        fullDefinitionEl: "Το Interaction to Next Paint (INP) αντικαθιστά το FID ως Core Web Vital. Μετρά την απόκριση παρακολουθώντας όλες τις αλληλεπιδράσεις κατά την επίσκεψη σε μια σελίδα και καταγράφει τη χειρότερη (ή σχεδόν τη χειρότερη) καθυστέρηση.",
        term: "INP (Interaction to Next Paint)",
        shortDefinition: "Measures overall page responsiveness to user interactions.",
        fullDefinition: "Interaction to Next Paint (INP) is replacing FID as a Core Web Vital. It measures responsiveness by observing all interactions during a page visit and reporting the worst (or near-worst) interaction latency.",
        example: "Good: <200ms, Needs Improvement: 200-500ms, Poor: >500ms. Unlike FID (first interaction only), INP considers all interactions.",
        exampleEl: "Καλό: <200ms, Θέλει βελτίωση: 200-500ms, Κακό: >500ms. Σε αντίθεση με το FID (μόνο η πρώτη αλληλεπίδραση), το INP λαμβάνει υπόψη όλες τις αλληλεπιδράσεις.",
        technique: "Optimize JavaScript for all interactions (not just first), yield to the main thread frequently, prioritize visible content, minimize third-party script impact.",
        techniqueEl: "Βελτιστοποιήστε τη JavaScript για όλες τις αλληλεπιδράσεις (όχι μόνο την πρώτη), αφήνετε συχνά ελεύθερο το main thread, δώστε προτεραιότητα στο ορατό περιεχόμενο και μειώστε την επίδραση των scripts τρίτων.",
        proTip: "INP is harder to optimize than FID because every interaction counts. Focus on optimizing your most common user interactions first.",
        proTipEl: "Το INP βελτιστοποιείται πιο δύσκολα από το FID, γιατί μετράει κάθε αλληλεπίδραση. Ξεκινήστε από τις αλληλεπιδράσεις που κάνουν πιο συχνά οι χρήστες σας.",
        relatedTerms: ["core-web-vitals", "fid", "responsiveness"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" }
        ]
      },
      {
        id: "page-experience",
        termEl: "Page Experience",
        shortDefinitionEl: "Το συνολικό μέτρο της Google για την εμπειρία χρήστη, που περιλαμβάνει τα Core Web Vitals.",
        fullDefinitionEl: "Το Page Experience είναι το συνολικό μέτρο της Google για την εμπειρία του χρήστη. Περιλαμβάνει τα Core Web Vitals, τη φιλικότητα σε κινητά, το HTTPS, την ασφαλή περιήγηση και τις οδηγίες για ενοχλητικά αναδυόμενα παράθυρα (intrusive interstitials). Έγινε παράγοντας κατάταξης το 2021.",
        term: "Page Experience",
        shortDefinition: "Google's combined measure of user experience signals including Core Web Vitals.",
        fullDefinition: "Page Experience is Google's holistic measure of user experience encompassing Core Web Vitals, mobile-friendliness, HTTPS, safe browsing, and intrusive interstitial guidelines. It became a ranking factor in 2021.",
        example: "A page with good Core Web Vitals, mobile-friendly design, HTTPS, no security issues, and no intrusive popups has good page experience.",
        exampleEl: "Μια σελίδα με καλά Core Web Vitals, σχεδιασμό φιλικό σε κινητά, HTTPS, χωρίς προβλήματα ασφάλειας και χωρίς ενοχλητικά pop-ups έχει καλό page experience.",
        technique: "Pass all Core Web Vitals, ensure mobile responsiveness, use HTTPS, avoid malware, remove intrusive interstitials, maintain safe browsing status.",
        techniqueEl: "Περάστε όλα τα Core Web Vitals, φροντίστε η σελίδα να είναι προσαρμοσμένη σε όλες τις οθόνες, χρησιμοποιήστε HTTPS, αποφύγετε το malware, αφαιρέστε τα ενοχλητικά αναδυόμενα παράθυρα και διατηρήστε καθαρή την κατάσταση ασφαλούς περιήγησης.",
        proTip: "Page experience is a tiebreaker, not a dominant signal. Great content with poor page experience can still outrank poor content with perfect metrics.",
        proTipEl: "Το page experience λειτουργεί ως κριτήριο ισοπαλίας, όχι ως κυρίαρχο σήμα. Εξαιρετικό περιεχόμενο με κακό page experience μπορεί ακόμα να ξεπεράσει κακό περιεχόμενο με τέλειες μετρικές.",
        relatedTerms: ["core-web-vitals", "mobile-usability", "https"],
        relatedLinks: [
          { title: "Core Web Vitals Pulse", url: "/free-tools/cwv-pulse", type: "tool" },
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "algorithm-updates",
    title: "Algorithm & Updates",
    description: "Google algorithm changes and their impact on rankings",
    icon: RefreshCw,
    color: "amber",
    terms: [
      {
        id: "google-algorithm",
        termEl: "Google Algorithm (Αλγόριθμος της Google)",
        shortDefinitionEl: "Το σύνθετο σύστημα που χρησιμοποιεί η Google για να κατατάσσει τα αποτελέσματα αναζήτησης.",
        fullDefinitionEl: "Ο αλγόριθμος της Google είναι το σύστημα κανόνων και μοντέλων μηχανικής μάθησης που ανακτά και κατατάσσει περιεχόμενο από το ευρετήριό της. Λαμβάνει υπόψη εκατοντάδες παράγοντες για να δώσει τα πιο σχετικά αποτελέσματα σε κάθε αναζήτηση.",
        term: "Google Algorithm",
        shortDefinition: "The complex system Google uses to rank search results.",
        fullDefinition: "Google's algorithm is the system of rules and machine learning models that retrieve and rank content from its index. It considers hundreds of factors to deliver the most relevant results for each search query.",
        example: "When you search 'best pizza', the algorithm evaluates millions of pages for relevance, authority, and user experience to rank results.",
        exampleEl: "Όταν ψάχνετε «καλύτερη πίτσα», ο αλγόριθμος αξιολογεί εκατομμύρια σελίδες για συνάφεια, κύρος και εμπειρία χρήστη ώστε να κατατάξει τα αποτελέσματα.",
        technique: "Focus on quality content, build authority, ensure technical health, and align with user intent. Don't try to 'game' the algorithm - build for users.",
        techniqueEl: "Εστιάστε σε ποιοτικό περιεχόμενο, χτίστε κύρος, φροντίστε την τεχνική υγεία του site και καλύψτε την πρόθεση του χρήστη. Μην προσπαθείτε να «ξεγελάσετε» τον αλγόριθμο: χτίστε για τους χρήστες.",
        proTip: "The algorithm updates constantly. Focus on sustainable SEO practices rather than tactics that exploit temporary loopholes.",
        proTipEl: "Ο αλγόριθμος αλλάζει συνεχώς. Εστιάστε σε βιώσιμες πρακτικές SEO αντί για τακτικές που εκμεταλλεύονται προσωρινά κενά.",
        relatedTerms: ["ranking-factors", "algorithm-update", "serp"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "algorithm-update",
        termEl: "Algorithm Update (Ενημέρωση αλγορίθμου)",
        shortDefinitionEl: "Οι αλλαγές που κάνει η Google στα συστήματα κατάταξής της.",
        fullDefinitionEl: "Οι ενημερώσεις αλγορίθμου είναι αλλαγές στον τρόπο που η Google κατατάσσει τα αποτελέσματα. Κυμαίνονται από μικρές καθημερινές ρυθμίσεις έως μεγάλα core updates που μπορούν να επηρεάσουν σημαντικά τις κατατάξεις. Η Google ανακοινώνει τις μεγάλες ενημερώσεις, όχι τις μικρές.",
        term: "Algorithm Update",
        shortDefinition: "Changes Google makes to its ranking systems.",
        fullDefinition: "Algorithm updates are changes Google makes to how it ranks search results. They range from minor daily tweaks to major core updates that can significantly impact rankings. Google announces major updates but not minor ones.",
        example: "A core update might cause sites with thin content to drop 30% while quality sites improve. The Helpful Content Update targeted AI-generated fluff.",
        exampleEl: "Ένα core update μπορεί να ρίξει κατά 30% τα sites με φτωχό περιεχόμενο, ενώ τα ποιοτικά sites ανεβαίνουν. Το Helpful Content Update στόχευσε τη «φλυαρία» που γράφει η AI.",
        technique: "Monitor rankings around announced update dates, compare to industry trends, analyze impacted pages for patterns, focus recovery on content quality.",
        techniqueEl: "Παρακολουθείτε τις κατατάξεις γύρω από τις ημερομηνίες των ανακοινωμένων ενημερώσεων, συγκρίνετε με τις τάσεις του κλάδου, αναλύστε τις σελίδες που επηρεάστηκαν για κοινά μοτίβα και εστιάστε την ανάκαμψη στην ποιότητα του περιεχομένου.",
        proTip: "If you drop after an update, don't panic-edit everything. Wait for the dust to settle, analyze patterns, then make strategic improvements.",
        proTipEl: "Αν πέσετε μετά από μια ενημέρωση, μην αρχίσετε πανικόβλητοι να αλλάζετε τα πάντα. Περιμένετε να ηρεμήσουν τα πράγματα, αναλύστε τα μοτίβα και μετά κάντε στοχευμένες βελτιώσεις.",
        relatedTerms: ["core-update", "helpful-content-update", "spam-update"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "core-update",
        termEl: "Core Update",
        shortDefinitionEl: "Μεγάλες ενημερώσεις του αλγορίθμου που επηρεάζουν ευρύτερα τα συστήματα κατάταξης.",
        fullDefinitionEl: "Τα core updates είναι σημαντικές αλλαγές στον κύριο αλγόριθμο κατάταξης της Google, που συνήθως ανακοινώνονται και ονομάζονται με βάση την ημερομηνία κυκλοφορίας (π.χ. «March 2025 Core Update»). Μπορούν να προκαλέσουν μεγάλες διακυμάνσεις στις κατατάξεις και συνήθως ολοκληρώνονται μέσα σε 2 εβδομάδες.",
        term: "Core Update",
        shortDefinition: "Major algorithm updates affecting broad ranking systems.",
        fullDefinition: "Core updates are significant changes to Google's main ranking algorithm, typically announced and named by release date (e.g., 'March 2025 Core Update'). They can cause large ranking fluctuations and usually complete over 2 weeks.",
        example: "A core update might promote sites with strong E-E-A-T while demoting those with thin content or poor user experience.",
        exampleEl: "Ένα core update μπορεί να ανεβάσει sites με ισχυρό E-E-A-T και να υποβαθμίσει όσα έχουν φτωχό περιεχόμενο ή κακή εμπειρία χρήστη.",
        technique: "Focus on overall site quality, E-E-A-T signals, content depth, and user satisfaction. There's no 'fix' for core updates - improve broadly.",
        techniqueEl: "Εστιάστε στη συνολική ποιότητα του site, στα σήματα E-E-A-T, στο βάθος του περιεχομένου και στην ικανοποίηση των χρηστών. Δεν υπάρχει «διόρθωση» για τα core updates: βελτιωθείτε συνολικά.",
        proTip: "Core update recovery can take until the next core update. Use the time between to make substantial quality improvements.",
        proTipEl: "Η ανάκαμψη από ένα core update μπορεί να αργήσει μέχρι το επόμενο core update. Αξιοποιήστε το διάστημα στο ενδιάμεσο για ουσιαστικές βελτιώσεις ποιότητας.",
        relatedTerms: ["algorithm-update", "e-e-a-t", "ranking-volatility"],
        relatedLinks: [
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      },
      {
        id: "helpful-content-update",
        termEl: "Helpful Content Update",
        shortDefinitionEl: "Ενημέρωση που στοχεύει περιεχόμενο γραμμένο κυρίως για τις μηχανές αναζήτησης και όχι για τους χρήστες.",
        fullDefinitionEl: "Το Helpful Content Update στοχεύει sites με περιεχόμενο που μοιάζει γραμμένο για τις μηχανές αναζήτησης και όχι για ανθρώπους. Είναι σήμα που αφορά όλο το site: πολύ μη χρήσιμο περιεχόμενο μπορεί να ρίξει τις κατατάξεις ολόκληρου του domain.",
        term: "Helpful Content Update",
        shortDefinition: "Update targeting content created primarily for search engines rather than users.",
        fullDefinition: "The Helpful Content Update targets sites with content that feels written for search engines rather than humans. It's a site-wide signal - having lots of unhelpful content can drag down rankings for your entire domain.",
        example: "Sites with auto-generated content, thin affiliate pages, or content that doesn't satisfy user intent were hit. 'How tall is Eiffel Tower?' articles with 2000 words of filler.",
        exampleEl: "Επηρεάστηκαν sites με αυτόματα παραγόμενο περιεχόμενο, φτωχές affiliate σελίδες ή περιεχόμενο που δεν κάλυπτε την πρόθεση του χρήστη. Για παράδειγμα, άρθρα «Τι ύψος έχει ο Πύργος του Άιφελ;» με 2.000 λέξεις γέμισμα.",
        technique: "Remove or substantially improve unhelpful content, ensure every page provides unique value, write for humans first, answer queries directly without excessive fluff.",
        techniqueEl: "Αφαιρέστε ή βελτιώστε ουσιαστικά το μη χρήσιμο περιεχόμενο, φροντίστε κάθε σελίδα να προσφέρει μοναδική αξία, γράψτε πρώτα για ανθρώπους και απαντήστε απευθείας στις ερωτήσεις χωρίς περιττή φλυαρία.",
        proTip: "The HCU classifier is site-wide. Even if 80% of your content is great, 20% unhelpful content can hurt everything. Audit and prune aggressively.",
        proTipEl: "Ο ταξινομητής του HCU αφορά όλο το site. Ακόμα κι αν το 80% του περιεχομένου σας είναι εξαιρετικό, ένα 20% μη χρήσιμο μπορεί να βλάψει τα πάντα. Ελέγξτε και «κλαδέψτε» χωρίς δισταγμό.",
        relatedTerms: ["content-quality", "thin-content", "algorithm-update"],
        relatedLinks: [
          { title: "Content Decay Detector", url: "/features/content-decay-detector", type: "feature" }
        ]
      },
      {
        id: "spam-update",
        termEl: "Spam Update",
        shortDefinitionEl: "Ενημερώσεις που στοχεύουν χειριστικές τακτικές SEO και spam.",
        fullDefinitionEl: "Τα spam updates βελτιώνουν την ικανότητα της Google να εντοπίζει και να υποβαθμίζει ιστοσελίδες που χρησιμοποιούν χειριστικές τακτικές, όπως link spam, cloaking, keyword stuffing και άλλες παραβιάσεις των οδηγιών αναζήτησης.",
        term: "Spam Update",
        shortDefinition: "Updates targeting manipulative and spammy SEO tactics.",
        fullDefinition: "Spam updates improve Google's ability to detect and demote websites using manipulative tactics like link spam, cloaking, keyword stuffing, and other violations of search guidelines.",
        example: "Sites with purchased links, hidden text, or private blog networks dropping from rankings after a spam update.",
        exampleEl: "Sites με αγορασμένους συνδέσμους, κρυφό κείμενο ή ιδιωτικά δίκτυα blogs πέφτουν στις κατατάξεις μετά από ένα spam update.",
        technique: "Avoid link schemes, don't use hidden text, ensure no cloaking, disavow toxic links if you have a penalty, follow Google's spam policies.",
        techniqueEl: "Αποφύγετε τα σχήματα συνδέσμων, μη χρησιμοποιείτε κρυφό κείμενο, βεβαιωθείτε ότι δεν κάνετε cloaking, κάντε disavow τους toxic συνδέσμους αν έχετε ποινή και ακολουθήστε τις πολιτικές spam της Google.",
        proTip: "Spam updates can take weeks to fully roll out. If hit, address violations thoroughly rather than making quick fixes.",
        proTipEl: "Τα spam updates μπορεί να χρειαστούν εβδομάδες για να εφαρμοστούν πλήρως. Αν επηρεαστείτε, αντιμετωπίστε τις παραβιάσεις σε βάθος αντί για γρήγορα «μπαλώματα».",
        relatedTerms: ["link-spam", "manual-penalty", "black-hat-seo"],
        relatedLinks: [
          { title: "Backlink Monitoring", url: "/features/backlink-monitoring", type: "feature" }
        ]
      },
      {
        id: "ranking-volatility",
        termEl: "Ranking Volatility (Μεταβλητότητα κατατάξεων)",
        shortDefinitionEl: "Ο βαθμός διακύμανσης των κατατάξεων στην αναζήτηση με την πάροδο του χρόνου.",
        fullDefinitionEl: "Η μεταβλητότητα κατατάξεων δείχνει πόσο αλλάζουν οι κατατάξεις. Υψηλή μεταβλητότητα σημαίνει ότι πολλά sites αλλάζουν θέσεις, συχνά λόγω ενημερώσεων αλγορίθμου. Οι κανονικές διακυμάνσεις είναι αναμενόμενες. Η ακραία μεταβλητότητα δείχνει μεγάλες αλλαγές.",
        term: "Ranking Volatility",
        shortDefinition: "The degree of fluctuation in search rankings over time.",
        fullDefinition: "Ranking volatility refers to how much search rankings change. High volatility indicates many sites moving positions, often due to algorithm updates. Normal fluctuation is expected; extreme volatility suggests major changes.",
        example: "On a normal day, rankings might shift 1-2 positions. During a core update, you might see 10+ position swings across many queries.",
        exampleEl: "Μια συνηθισμένη μέρα οι κατατάξεις μπορεί να μετακινηθούν 1-2 θέσεις. Σε ένα core update μπορεί να δείτε αλλαγές 10+ θέσεων σε πολλές αναζητήσεις.",
        technique: "Track rankings daily, compare to industry volatility sensors, don't overreact to minor fluctuations, investigate patterns during high volatility periods.",
        techniqueEl: "Παρακολουθείτε τις κατατάξεις καθημερινά, συγκρίνετε με τους δείκτες μεταβλητότητας του κλάδου, μην αντιδράτε υπερβολικά σε μικρές διακυμάνσεις και ψάξτε για μοτίβα σε περιόδους υψηλής μεταβλητότητας.",
        proTip: "Use volatility tools to distinguish between site-specific issues and industry-wide algorithm changes. If everyone's volatile, it's probably an update.",
        proTipEl: "Χρησιμοποιήστε εργαλεία μεταβλητότητας για να ξεχωρίσετε τα προβλήματα του δικού σας site από τις αλλαγές του αλγορίθμου που αφορούν όλο τον κλάδο. Αν όλοι κουνιούνται, πιθανότατα πρόκειται για ενημέρωση.",
        relatedTerms: ["algorithm-update", "ranking-tracker", "serp-analysis"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Algorithm Drop Detector", url: "/features/algorithm-drop-detector", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "ai-seo",
    title: "AI & SEO",
    description: "AI technologies and their impact on search optimization",
    icon: Bot,
    color: "violet",
    terms: [
      {
        id: "ai-mode",
        term: "AI Mode",
        termEl: "AI Mode",
        shortDefinition: "Google's conversational search surface, which renders answers as interactive cards rather than a list of links.",
        shortDefinitionEl: "Η συνομιλιακή επιφάνεια αναζήτησης της Google, που αποδίδει απαντήσεις ως διαδραστικές κάρτες αντί για λίστα συνδέσμων.",
        fullDefinition: "AI Mode is distinct from AI Overviews. An AI Overview is a summary above the classic results; AI Mode is a conversational surface where the whole answer is assembled, and can include maps, carousels, comparison tables and generated widgets. A site cannot produce those elements. It can only publish the data one is assembled from, which is why entity markup and parallel, typed lists matter more here than page-level copy.",
        fullDefinitionEl: "Το AI Mode διαφέρει από τα AI Overviews. Ένα AI Overview είναι μια σύνοψη πάνω από τα κλασικά αποτελέσματα. Το AI Mode είναι μια συνομιλιακή επιφάνεια όπου συναρμολογείται ολόκληρη η απάντηση και μπορεί να περιλαμβάνει χάρτες, carousels, πίνακες σύγκρισης και δημιουργούμενα εργαλεία. Ένα site δεν μπορεί να παράγει αυτά τα στοιχεία. Μπορεί μόνο να δημοσιεύει τα δεδομένα από τα οποία συναρμολογούνται. Γι' αυτό εδώ το markup οντοτήτων και οι παράλληλες λίστες με ομοειδή στοιχεία μετρούν περισσότερο από τα κείμενα της σελίδας.",
        example: "Asking a follow-up question about hotels and getting a carousel of three properties with prices, rather than ten blue links.",
        exampleEl: "Κάνετε μια διευκρινιστική ερώτηση για ξενοδοχεία και παίρνετε ένα carousel με τρία καταλύματα και τις τιμές τους, αντί για δέκα μπλε συνδέσμους.",
        technique: "Publish a complete entity block, keep lists parallel and at least three items long with one type per list, and serve the text without JavaScript.",
        techniqueEl: "Δημοσιεύστε ένα πλήρες μπλοκ στοιχείων για την οντότητα, κρατήστε τις λίστες παράλληλες, με τουλάχιστον τρία στοιχεία και έναν τύπο στοιχείου ανά λίστα, και σερβίρετε το κείμενο χωρίς να χρειάζεται JavaScript.",
        proTip: "AI Mode and AI Overviews get used interchangeably and are not the same thing. Being clear about which one a client means changes what you measure.",
        proTipEl: "Το AI Mode και τα AI Overviews συχνά χρησιμοποιούνται σαν να είναι το ίδιο, αλλά δεν είναι. Αν ξεκαθαρίσετε ποιο από τα δύο εννοεί ο πελάτης, αλλάζει το τι μετράτε.",
        relatedTerms: ["ai-overview", "grounding", "llm-seo"],
        relatedLinks: [
          { title: "Google AI Mode tags and what grounds them", url: "/blog/google-ai-mode-tags", type: "blog" }
        ]
      },
      {
        id: "grounding",
        term: "Grounding",
        termEl: "Τεκμηρίωση (grounding)",
        shortDefinition: "Tying a generated answer to a retrievable source, so the claim can be attributed rather than invented.",
        shortDefinitionEl: "Η σύνδεση μιας παραγόμενης απάντησης με ανακτήσιμη πηγή, ώστε ο ισχυρισμός να αποδίδεται αντί να επινοείται.",
        fullDefinition: "Grounding is how an answer engine anchors what it says to something it retrieved. For a website, being useful as a grounding source is the whole of the available leverage: you cannot control how an answer is rendered, only whether your page supplies data clean enough to be quoted. That favours structured data matching the visible content, and answers stated plainly near the question.",
        fullDefinitionEl: "Η τεκμηρίωση είναι ο τρόπος με τον οποίο μια μηχανή απαντήσεων αγκυρώνει όσα λέει σε κάτι που ανέκτησε. Για ένα site, το να είναι αξιοποιήσιμη πηγή τεκμηρίωσης είναι όλο το διαθέσιμο περιθώριο: δεν ελέγχετε πώς αποδίδεται μια απάντηση, μόνο αν η σελίδα σας δίνει δεδομένα αρκετά καθαρά ώστε να παρατεθούν. Αυτό ευνοεί structured data που συμφωνούν με το ορατό περιεχόμενο και απαντήσεις διατυπωμένες απλά, κοντά στην ερώτηση.",
        example: "A hotel page publishing price, coordinates and three captioned images gives an assistant something to attribute; a page of prose does not.",
        exampleEl: "Μια σελίδα ξενοδοχείου που δημοσιεύει τιμή, συντεταγμένες και τρεις εικόνες με λεζάντες δίνει στον ψηφιακό βοηθό κάτι να παραθέσει ως πηγή. Μια σελίδα με σκέτο κείμενο όχι.",
        technique: "Match structured data to what is visibly on the page, answer the question in the first two sentences under the heading, and render the text server-side.",
        techniqueEl: "Κάντε τα structured data να συμφωνούν με όσα φαίνονται στη σελίδα, απαντήστε στην ερώτηση στις δύο πρώτες προτάσεις κάτω από την επικεφαλίδα και αποδώστε το κείμενο στον server (server-side).",
        proTip: "Grounding is retrieval, not training. Being in a model's training data and being retrievable today are different problems with different fixes.",
        proTipEl: "Η τεκμηρίωση είναι ανάκτηση, όχι εκπαίδευση. Το να βρίσκεστε στα δεδομένα εκπαίδευσης ενός μοντέλου και το να μπορείτε να ανακτηθείτε σήμερα είναι διαφορετικά προβλήματα, με διαφορετικές λύσεις.",
        relatedTerms: ["ai-mode", "llm-seo", "schema-markup"],
        relatedLinks: [
          { title: "Google AI Mode tags and what grounds them", url: "/blog/google-ai-mode-tags", type: "blog" }
        ]
      },
      {
        id: "llm-seo",
        termEl: "LLM SEO",
        shortDefinitionEl: "Βελτιστοποίηση περιεχομένου ώστε να εμφανίζεται στις απαντήσεις των μεγάλων γλωσσικών μοντέλων (LLM).",
        fullDefinitionEl: "Το LLM SEO περιλαμβάνει τις στρατηγικές με τις οποίες το περιεχόμενό σας αναφέρεται ως πηγή από βοηθούς AI όπως το ChatGPT, το Perplexity, το Claude και τα AI Overviews της Google. Καθώς όλο και περισσότεροι χρήστες παίρνουν απαντήσεις από την AI, το να είστε η πηγή που παραθέτουν αυτά τα μοντέλα αποκτά μεγάλη αξία.",
        term: "LLM SEO",
        shortDefinition: "Optimizing content to appear in Large Language Model responses.",
        fullDefinition: "LLM SEO refers to strategies for getting your content cited by AI assistants like ChatGPT, Perplexity, Claude, and Google's AI Overviews. As users increasingly get answers from AI, being the source these models reference becomes valuable.",
        example: "When someone asks ChatGPT 'best project management tools', getting your software mentioned with a link is LLM SEO success.",
        exampleEl: "Όταν κάποιος ρωτά το ChatGPT «καλύτερα εργαλεία διαχείρισης έργων» και αναφέρεται το λογισμικό σας με σύνδεσμο, αυτό είναι επιτυχία στο LLM SEO.",
        technique: "Build brand authority, get mentioned on authoritative sites, create factual structured content, ensure data is easily parseable, target question-based queries.",
        techniqueEl: "Χτίστε το κύρος της επωνυμίας σας, αποκτήστε αναφορές σε έγκυρα sites, γράψτε περιεχόμενο με γεγονότα και σαφή δομή, φροντίστε τα δεδομένα να διαβάζονται εύκολα από μηχανές και στοχεύστε αναζητήσεις σε μορφή ερώτησης.",
        proTip: "LLMs learn from their training data and sometimes real-time search. Building brand mentions across the web is increasingly important.",
        proTipEl: "Τα LLM μαθαίνουν από τα δεδομένα εκπαίδευσής τους και μερικές φορές από αναζήτηση σε πραγματικό χρόνο. Οι αναφορές στην επωνυμία σας σε όλο το διαδίκτυο μετρούν όλο και περισσότερο.",
        relatedTerms: ["ai-overview", "zero-click-search", "e-e-a-t"],
        relatedLinks: [
          { title: "LLM Citations & Brand Visibility", url: "/blog/llm-citations-brand-visibility", type: "blog" },
          { title: "AI Overview Checker", url: "/free-tools/ai-overview-checker", type: "tool" }
        ]
      },
      {
        id: "ai-content",
        termEl: "AI-Generated Content (Περιεχόμενο από AI)",
        shortDefinitionEl: "Περιεχόμενο που δημιουργείται με εργαλεία τεχνητής νοημοσύνης.",
        fullDefinitionEl: "Περιεχόμενο από AI είναι κείμενα, εικόνες ή άλλα μέσα που δημιουργούνται με εργαλεία AI όπως το ChatGPT, το Claude ή το Gemini. Η Google δεν τιμωρεί το περιεχόμενο από AI αυτό καθαυτό: τιμωρεί το χαμηλής ποιότητας περιεχόμενο, όπως κι αν δημιουργήθηκε.",
        term: "AI-Generated Content",
        shortDefinition: "Content created by artificial intelligence tools.",
        fullDefinition: "AI-generated content is text, images, or other media created by AI tools like ChatGPT, Claude, or Gemini. Google doesn't penalize AI content per se - it penalizes low-quality content regardless of how it's created.",
        example: "Using ChatGPT to draft a blog post, then editing for accuracy, brand voice, and adding unique insights.",
        exampleEl: "Χρησιμοποιείτε το ChatGPT για ένα πρώτο προσχέδιο άρθρου και στη συνέχεια το διορθώνετε για ακρίβεια, το προσαρμόζετε στο ύφος της επιχείρησής σας και προσθέτετε δικές σας γνώσεις.",
        technique: "Use AI as a starting point, not a final product. Add unique expertise, fact-check everything, inject personal experience, ensure E-E-A-T signals.",
        techniqueEl: "Χρησιμοποιήστε την AI ως αφετηρία, όχι ως τελικό προϊόν. Προσθέστε μοναδική εξειδίκευση, ελέγξτε κάθε στοιχείο, βάλτε προσωπική εμπειρία και φροντίστε για τα σήματα E-E-A-T.",
        proTip: "The Helpful Content Update targets content that doesn't add value. AI content that's just regurgitation will fail; AI content enhanced with expertise can succeed.",
        proTipEl: "Το Helpful Content Update στοχεύει περιεχόμενο που δεν προσθέτει αξία. Περιεχόμενο από AI που απλώς ανακυκλώνει τα γνωστά θα αποτύχει. Περιεχόμενο από AI εμπλουτισμένο με εξειδίκευση μπορεί να πετύχει.",
        relatedTerms: ["helpful-content-update", "content-quality", "e-e-a-t"],
        relatedLinks: [
          { title: "AI Content Generation", url: "/features/ai-content-generation", type: "feature" },
          { title: "ChatGPT SEO Prompts", url: "/free-tools/chatgpt-seo-prompts", type: "tool" }
        ]
      },
      {
        id: "zero-click-search",
        termEl: "Zero-Click Search",
        shortDefinitionEl: "Αναζητήσεις όπου ο χρήστης παίρνει την απάντηση χωρίς να πατήσει κανένα αποτέλεσμα.",
        fullDefinitionEl: "Zero-click search έχουμε όταν ο χρήστης βρίσκει την απάντηση απευθείας στη SERP (μέσω featured snippets, knowledge panels ή AI Overviews) χωρίς να επισκεφθεί καμία ιστοσελίδα. Η τάση αυτή μεγαλώνει όσο η AI ενσωματώνεται στην αναζήτηση.",
        term: "Zero-Click Search",
        shortDefinition: "Searches where users get answers without clicking any results.",
        fullDefinition: "Zero-click searches occur when users find their answer directly on the SERP (via featured snippets, knowledge panels, or AI Overviews) without clicking through to any website. This trend is growing with AI integration.",
        example: "Searching 'weather today' shows the forecast directly. No click needed. Same for 'how old is Tom Hanks' or simple calculations.",
        exampleEl: "Η αναζήτηση «καιρός σήμερα» δείχνει απευθείας την πρόγνωση. Δεν χρειάζεται κλικ. Το ίδιο ισχύει για το «πόσο χρονών είναι ο Τομ Χανκς» ή για απλούς υπολογισμούς.",
        technique: "Optimize for featured snippets to get brand exposure even without clicks, target queries with commercial/transactional intent that require clicks, track brand visibility not just clicks.",
        techniqueEl: "Βελτιστοποιήστε για featured snippets ώστε να προβάλλεται η επωνυμία σας ακόμα και χωρίς κλικ, στοχεύστε αναζητήσεις με εμπορική ή συναλλακτική πρόθεση που χρειάζονται κλικ και μετράτε την ορατότητα της επωνυμίας σας, όχι μόνο τα κλικ.",
        proTip: "Zero-click isn't always bad. Being the answer in a featured snippet builds brand awareness even without clicks. Adjust your KPIs accordingly.",
        proTipEl: "Το zero-click δεν είναι πάντα κακό. Όταν η απάντηση στο featured snippet είναι δική σας, χτίζετε αναγνωρισιμότητα ακόμα και χωρίς κλικ. Προσαρμόστε ανάλογα τους δείκτες (KPIs) σας.",
        relatedTerms: ["featured-snippet", "ai-overview", "knowledge-panel"],
        relatedLinks: [
          { title: "SERP Feature Hunter", url: "/features/serp-feature-hunter", type: "feature" }
        ]
      },
      {
        id: "semantic-search",
        termEl: "Semantic Search (Σημασιολογική αναζήτηση)",
        shortDefinitionEl: "Αναζήτηση που καταλαβαίνει το νόημα και το πλαίσιο, όχι μόνο τις λέξεις-κλειδιά.",
        fullDefinitionEl: "Η σημασιολογική αναζήτηση χρησιμοποιεί AI για να καταλάβει την πρόθεση και το νόημα πίσω από μια αναζήτηση, αντί απλώς να ταιριάζει λέξεις-κλειδιά. Συνδέει συναφείς έννοιες και δίνει αποτελέσματα που απαντούν σε αυτό που πραγματικά θέλει ο χρήστης.",
        term: "Semantic Search",
        shortDefinition: "Search that understands meaning and context, not just keywords.",
        fullDefinition: "Semantic search uses AI to understand the intent and contextual meaning behind queries, rather than just matching keywords. It connects related concepts and delivers results that answer what users actually want.",
        example: "'Apple pie recipe' returns recipes, not Apple Inc. 'best phone for photos' understands you want camera-focused phones.",
        exampleEl: "Το «συνταγή μηλόπιτας» (apple pie) φέρνει συνταγές, όχι την Apple Inc. Το «καλύτερο κινητό για φωτογραφίες» καταλαβαίνει ότι θέλετε κινητά με δυνατή κάμερα.",
        technique: "Write naturally for topics, not just keywords. Cover related concepts comprehensively, use synonyms, answer related questions, build topical authority.",
        techniqueEl: "Γράψτε φυσικά για θέματα, όχι μόνο για λέξεις-κλειδιά. Καλύψτε ολοκληρωμένα τις συναφείς έννοιες, χρησιμοποιήστε συνώνυμα, απαντήστε στις σχετικές ερωτήσεις και χτίστε θεματικό κύρος.",
        proTip: "Keyword stuffing is dead. Semantic search rewards content that thoroughly covers a topic with natural language rather than repeating exact keywords.",
        proTipEl: "Το keyword stuffing ανήκει στο παρελθόν. Η σημασιολογική αναζήτηση επιβραβεύει περιεχόμενο που καλύπτει ένα θέμα σε βάθος με φυσική γλώσσα, αντί να επαναλαμβάνει ακριβείς λέξεις-κλειδιά.",
        relatedTerms: ["search-intent", "topical-authority", "natural-language-processing"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "entity-seo",
        termEl: "Entity SEO",
        shortDefinitionEl: "Βελτιστοποίηση με επίκεντρο τις οντότητες (πρόσωπα, τόπους, πράγματα) αντί για τις λέξεις-κλειδιά.",
        fullDefinitionEl: "Το entity SEO είναι η βελτιστοποίηση για τον τρόπο που οι μηχανές αναζήτησης καταλαβαίνουν και συνδέουν τις οντότητες: συγκεκριμένα πρόσωπα, τόπους, οργανισμούς, έννοιες και πράγματα. Στόχος είναι να αναγνωρίζεστε ως η αδιαμφισβήτητη οντότητα στον χώρο σας.",
        term: "Entity SEO",
        shortDefinition: "Optimization focused on entities (people, places, things) rather than keywords.",
        fullDefinition: "Entity SEO is the practice of optimizing for how search engines understand and connect entities - specific people, places, organizations, concepts, and things. It's about being recognized as a definitive entity in your space.",
        example: "When you search 'Elon Musk', Google shows a Knowledge Panel because it understands Elon Musk as an entity connected to Tesla, SpaceX, etc.",
        exampleEl: "Όταν ψάχνετε «Elon Musk», η Google δείχνει Knowledge Panel επειδή αναγνωρίζει τον Elon Musk ως οντότητα συνδεδεμένη με την Tesla, τη SpaceX κ.λπ.",
        technique: "Build consistent brand mentions, claim Knowledge Panels, use Organization schema, get Wikipedia presence (if notable), maintain consistent information across platforms.",
        techniqueEl: "Χτίστε σταθερές αναφορές στην επωνυμία σας, διεκδικήστε Knowledge Panels, χρησιμοποιήστε Organization schema, αποκτήστε παρουσία στη Wikipedia (αν είστε αρκετά γνωστοί) και κρατήστε τις ίδιες πληροφορίες σε όλες τις πλατφόρμες.",
        proTip: "Entities are how Google connects information across the web. Building entity recognition means your brand becomes part of Google's understanding of topics.",
        proTipEl: "Οι οντότητες είναι ο τρόπος με τον οποίο η Google συνδέει την πληροφορία σε όλο το διαδίκτυο. Όταν η επωνυμία σας αναγνωρίζεται ως οντότητα, γίνεται μέρος του τρόπου που η Google καταλαβαίνει τα θέματα.",
        relatedTerms: ["knowledge-graph", "knowledge-panel", "structured-data"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "ai-autopilot",
        termEl: "AI Autopilot (SEO)",
        shortDefinitionEl: "Αυτοματοποιημένη βελτιστοποίηση SEO και εκτέλεση εργασιών με AI.",
        fullDefinitionEl: "Το AI Autopilot στο SEO αφορά συστήματα που αναλύουν αυτόματα δεδομένα, δημιουργούν προτάσεις και εκτελούν εργασίες βελτιστοποίησης με τεχνητή νοημοσύνη. Βοηθά να κλιμακωθεί η δουλειά SEO σε μεγάλα sites.",
        term: "AI Autopilot (SEO)",
        shortDefinition: "Automated AI-driven SEO optimization and task execution.",
        fullDefinition: "AI Autopilot in SEO refers to systems that automatically analyze data, generate recommendations, and execute optimization tasks using artificial intelligence. It helps scale SEO efforts across large sites.",
        example: "An AI system that automatically detects content decay, generates improvement suggestions, and schedules updates based on priority.",
        exampleEl: "Ένα σύστημα AI που εντοπίζει αυτόματα τη φθορά περιεχομένου, προτείνει βελτιώσεις και προγραμματίζει ενημερώσεις ανάλογα με την προτεραιότητα.",
        technique: "Use AI for repetitive tasks (meta description generation, content audits), maintain human oversight for strategy, validate AI recommendations before implementation.",
        techniqueEl: "Χρησιμοποιήστε την AI για επαναλαμβανόμενες εργασίες (δημιουργία meta descriptions, έλεγχοι περιεχομένου), κρατήστε ανθρώπινη εποπτεία στη στρατηγική και επιβεβαιώνετε τις προτάσεις της AI πριν τις εφαρμόσετε.",
        proTip: "AI Autopilot works best for execution at scale. Strategy and critical decisions still benefit from human expertise and judgment.",
        proTipEl: "Το AI Autopilot αποδίδει καλύτερα στην εκτέλεση σε μεγάλη κλίμακα. Η στρατηγική και οι κρίσιμες αποφάσεις εξακολουθούν να κερδίζουν από την ανθρώπινη εμπειρία και κρίση.",
        relatedTerms: ["ai-content", "seo-automation", "machine-learning"],
        relatedLinks: [
          { title: "AI Autopilot Mode", url: "/features/ai-autopilot-mode", type: "feature" },
          { title: "Sprint Board", url: "/features/sprint-board-task-management", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    description: "Essential SEO tools and platforms for analysis and optimization",
    icon: Wrench,
    color: "slate",
    terms: [
      {
        id: "google-search-console",
        termEl: "Google Search Console",
        shortDefinitionEl: "Δωρεάν εργαλείο της Google με δεδομένα απόδοσης στην αναζήτηση και την τεχνική υγεία του site.",
        fullDefinitionEl: "Το Google Search Console είναι δωρεάν υπηρεσία της Google που σας βοηθά να παρακολουθείτε, να συντηρείτε και να διορθώνετε την παρουσία του site σας στα αποτελέσματα αναζήτησης. Δίνει δεδομένα για εμφανίσεις, κλικ, κατατάξεις, κατάσταση ευρετηρίασης και τεχνικά προβλήματα.",
        term: "Google Search Console (GSC)",
        shortDefinition: "Free Google tool providing search performance data and site health insights.",
        fullDefinition: "Google Search Console is a free service from Google that helps you monitor, maintain, and troubleshoot your site's presence in search results. It provides data on impressions, clicks, rankings, indexing status, and technical issues.",
        example: "GSC shows you're getting 10,000 impressions for 'running shoes' but only 200 clicks, indicating low CTR that needs improvement.",
        exampleEl: "Το Search Console δείχνει ότι παίρνετε 10.000 εμφανίσεις για το «παπούτσια τρεξίματος» αλλά μόνο 200 κλικ, άρα το CTR είναι χαμηλό και θέλει βελτίωση.",
        technique: "Connect all site properties, submit sitemaps, monitor Core Web Vitals, check indexing coverage, analyze search queries, request indexing for new content.",
        techniqueEl: "Συνδέστε όλες τις ιδιότητες (properties) του site, υποβάλετε sitemaps, παρακολουθείτε τα Core Web Vitals, ελέγχετε την κάλυψη ευρετηρίασης, αναλύετε τις αναζητήσεις και ζητάτε ευρετηρίαση για το νέο περιεχόμενο.",
        proTip: "GSC data has a 2-3 day delay. For recent changes, check the URL Inspection tool which shows fresh crawl data.",
        proTipEl: "Τα δεδομένα του Search Console έχουν καθυστέρηση 2-3 ημερών. Για πρόσφατες αλλαγές, δείτε το εργαλείο URL Inspection, που δείχνει φρέσκα στοιχεία crawl.",
        relatedTerms: ["impressions", "clicks", "average-position", "indexing"],
        relatedLinks: [
          { title: "Connect Search Console", url: "/help/connect-search-console", type: "help" }
        ]
      },
      {
        id: "google-analytics",
        termEl: "Google Analytics 4 (GA4)",
        shortDefinitionEl: "Δωρεάν πλατφόρμα analytics της Google για συμπεριφορά χρηστών και conversions, κρίσιμη για μέτρηση SEO.",
        fullDefinitionEl: "Το Google Analytics 4 μετρά sessions, engagement και conversions. Για SEO, συνδέστε το με Search Console ώστε να βλέπετε ποια οργανικά ερωτήματα φέρνουν πραγματική αξία, όχι μόνο εμφανίσεις.",
        term: "Google Analytics 4 (GA4)",
        shortDefinition: "Google's free web analytics platform for tracking user behavior.",
        fullDefinition: "Google Analytics 4 is Google's analytics platform that tracks website traffic, user behavior, conversions, and more. It uses event-based tracking and machine learning to provide insights about your audience and their journey.",
        example: "GA4 shows organic traffic drives 60% of your conversions, with users visiting an average of 3 pages before purchasing.",
        exampleEl: "Το GA4 δείχνει ότι η οργανική επισκεψιμότητα φέρνει το 60% των μετατροπών σας και ότι οι χρήστες βλέπουν κατά μέσο όρο 3 σελίδες πριν αγοράσουν.",
        technique: "Set up proper conversion tracking, connect with GSC, create custom reports for SEO metrics, use segments to analyze organic traffic separately.",
        techniqueEl: "Ρυθμίστε σωστά τη μέτρηση μετατροπών, συνδέστε το με το Search Console, φτιάξτε προσαρμοσμένες αναφορές για τις μετρικές SEO και χρησιμοποιήστε segments για να αναλύετε ξεχωριστά την οργανική επισκεψιμότητα.",
        proTip: "Link GA4 with GSC to combine behavior data with search performance. This helps identify which rankings actually drive conversions.",
        proTipEl: "Συνδέστε το GA4 με το Search Console για να συνδυάσετε τα δεδομένα συμπεριφοράς με την απόδοση στην αναζήτηση. Έτσι βλέπετε ποιες κατατάξεις φέρνουν πραγματικά μετατροπές.",
        relatedTerms: ["organic-traffic", "conversion-rate", "user-behavior"],
        relatedLinks: [
          { title: "Εργαλεία SEO", url: "/el/blog/ergaleia-seo", type: "blog" },
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "serp",
        termEl: "SERP (σελίδα αποτελεσμάτων αναζήτησης)",
        shortDefinitionEl: "Η σελίδα που εμφανίζει η μηχανή αναζήτησης ως απάντηση σε μια αναζήτηση.",
        fullDefinitionEl: "SERP (Search Engine Results Page) είναι η σελίδα που δείχνουν οι μηχανές αναζήτησης όταν ο χρήστης κάνει μια αναζήτηση. Οι σύγχρονες SERP περιλαμβάνουν οργανικά αποτελέσματα, πληρωμένες διαφημίσεις, featured snippets, knowledge panels, χάρτες, εικόνες, βίντεο και πολλά άλλα στοιχεία.",
        term: "SERP (Search Engine Results Page)",
        shortDefinition: "The page displayed by search engines in response to a query.",
        fullDefinition: "A SERP is the page search engines display after a user enters a query. Modern SERPs include organic results, paid ads, featured snippets, knowledge panels, maps, images, videos, and various other features.",
        example: "Searching 'best coffee maker' shows ads at top, a featured snippet, shopping results, PAA box, and organic listings - all on one SERP.",
        exampleEl: "Η αναζήτηση «καλύτερη καφετιέρα» δείχνει διαφημίσεις στην κορυφή, ένα featured snippet, αποτελέσματα αγορών, πλαίσιο People Also Ask και οργανικά αποτελέσματα, όλα στην ίδια SERP.",
        technique: "Analyze SERPs for your target keywords to understand intent, identify featured snippet opportunities, assess competitor content, and plan content format.",
        techniqueEl: "Αναλύστε τις SERP για τις λέξεις-κλειδιά-στόχους σας για να καταλάβετε την πρόθεση, να βρείτε ευκαιρίες για featured snippets, να αξιολογήσετε το περιεχόμενο των ανταγωνιστών και να αποφασίσετε τη μορφή του περιεχομένου σας.",
        proTip: "SERPs vary by device, location, and personalization. Check from incognito mode and different locations for accurate competitive analysis.",
        proTipEl: "Οι SERP διαφέρουν ανάλογα με τη συσκευή, την τοποθεσία και την εξατομίκευση. Ελέγξτε σε ανώνυμη περιήγηση (incognito) και από διαφορετικές τοποθεσίες για σωστή ανάλυση ανταγωνισμού.",
        relatedTerms: ["serp-features", "organic-results", "featured-snippet"],
        relatedLinks: [
          { title: "SERP Tracking & Analysis", url: "/features/serp-tracking-analysis", type: "feature" }
        ]
      },
      {
        id: "search-operators",
        termEl: "Search Operators (Τελεστές αναζήτησης)",
        shortDefinitionEl: "Ειδικές εντολές που φιλτράρουν και εξειδικεύουν τις αναζητήσεις.",
        fullDefinitionEl: "Οι τελεστές αναζήτησης είναι ειδικοί χαρακτήρες και εντολές που εξειδικεύουν μια αναζήτηση. Είναι πολύτιμοι για έρευνα SEO, ανάλυση ανταγωνισμού, εύρεση ευκαιριών για backlinks και έλεγχο των σελίδων που έχουν ευρετηριαστεί.",
        term: "Search Operators",
        shortDefinition: "Special commands to refine and filter search queries.",
        fullDefinition: "Search operators are special characters and commands used to refine search queries. They're invaluable for SEO research, competitive analysis, finding backlink opportunities, and auditing indexed pages.",
        example: "site:example.com (all indexed pages), intitle:\"keyword\" (pages with keyword in title), -keyword (exclude results), link:example.com (who links to you)",
        exampleEl: "site:example.com (όλες οι ευρετηριασμένες σελίδες), intitle:\"λέξη-κλειδί\" (σελίδες με τη λέξη-κλειδί στον τίτλο), -λέξη (εξαίρεση αποτελεσμάτων), link:example.com (ποιος σας παραπέμπει)",
        technique: "Use site: to audit indexing, intitle:/inurl: for competitive research, related: for finding similar sites, cache: to see Google's version.",
        techniqueEl: "Χρησιμοποιήστε το site: για έλεγχο ευρετηρίασης, τα intitle: και inurl: για έρευνα ανταγωνισμού, το related: για να βρείτε παρόμοια sites και το cache: για να δείτε την έκδοση της σελίδας που έχει η Google.",
        proTip: "Combine operators for powerful queries: site:competitor.com intitle:\"guest post\" finds guest post opportunities on competitor sites.",
        proTipEl: "Συνδυάστε τελεστές για ισχυρές αναζητήσεις: το site:competitor.com intitle:\"guest post\" βρίσκει ευκαιρίες για guest posts στα sites των ανταγωνιστών.",
        relatedTerms: ["indexing", "serp", "competitive-analysis"],
        relatedLinks: [
          { title: "Search Operators Tool", url: "/free-tools/search-operators", type: "tool" },
          { title: "Google Search Operators Guide", url: "/blog/google-search-operators-2026", type: "blog" }
        ]
      },
      {
        id: "rank-tracking",
        termEl: "Rank Tracking (Παρακολούθηση κατατάξεων)",
        shortDefinitionEl: "Η παρακολούθηση των θέσεων των λέξεων-κλειδιών στα αποτελέσματα αναζήτησης με την πάροδο του χρόνου.",
        fullDefinitionEl: "Η παρακολούθηση κατατάξεων καταγράφει σε ποια θέση εμφανίζονται οι σελίδες σας στα αποτελέσματα για συγκεκριμένες λέξεις-κλειδιά. Βοηθά να μετρήσετε την πρόοδο του SEO, να εντοπίσετε ευκαιρίες και προβλήματα και να παρακολουθείτε τις κινήσεις των ανταγωνιστών.",
        term: "Rank Tracking",
        shortDefinition: "Monitoring keyword positions in search results over time.",
        fullDefinition: "Rank tracking involves monitoring where your pages appear in search results for specific keywords. It helps measure SEO progress, identify opportunities, detect problems, and track competitor movements.",
        example: "Tracking 100 keywords weekly shows 'best running shoes' improved from #8 to #4, while 'marathon training' dropped from #3 to #7.",
        exampleEl: "Παρακολουθώντας 100 λέξεις-κλειδιά κάθε εβδομάδα βλέπετε ότι το «καλύτερα παπούτσια τρεξίματος» ανέβηκε από το #8 στο #4, ενώ το «προπόνηση για μαραθώνιο» έπεσε από το #3 στο #7.",
        technique: "Track head terms and long-tail keywords, monitor daily during updates, compare to competitors, segment by page/category, track SERP feature presence.",
        techniqueEl: "Παρακολουθείτε γενικούς όρους και long-tail λέξεις-κλειδιά, ελέγχετε καθημερινά κατά τις ενημερώσεις αλγορίθμου, συγκρίνετε με τους ανταγωνιστές, χωρίστε ανά σελίδα ή κατηγορία και καταγράφετε την παρουσία σας στα στοιχεία της SERP.",
        proTip: "Don't obsess over daily fluctuations. Look at trends over weeks/months. A 1-position change day-to-day is noise; consistent decline is a signal.",
        proTipEl: "Μην αγχώνεστε με τις καθημερινές διακυμάνσεις. Κοιτάξτε τις τάσεις σε εβδομάδες και μήνες. Μια αλλαγή μίας θέσης από μέρα σε μέρα είναι θόρυβος. Μια σταθερή πτώση είναι σήμα.",
        relatedTerms: ["average-position", "serp", "ranking-volatility"],
        relatedLinks: [
          { title: "Ranking Tracker", url: "/features/ranking-tracker", type: "feature" },
          { title: "Ranking Predictions", url: "/features/ranking-predictions", type: "feature" }
        ]
      },
      {
        id: "site-audit",
        termEl: "Site Audit (Τεχνικός έλεγχος SEO)",
        shortDefinitionEl: "Ολοκληρωμένη ανάλυση της τεχνικής υγείας SEO μιας ιστοσελίδας.",
        fullDefinitionEl: "Το site audit είναι ένας ενδελεχής έλεγχος του τεχνικού SEO μιας ιστοσελίδας, που εντοπίζει προβλήματα τα οποία μπορεί να επηρεάζουν το crawl, την ευρετηρίαση και τις κατατάξεις. Καλύπτει την αρχιτεκτονική της ιστοσελίδας, την ταχύτητα, τη φιλικότητα σε κινητά, την ευρετηρίαση και τα στοιχεία on-page.",
        term: "Site Audit",
        shortDefinition: "Comprehensive analysis of a website's technical SEO health.",
        fullDefinition: "A site audit is a thorough examination of a website's technical SEO, identifying issues that may impact crawling, indexing, and rankings. It covers site structure, page speed, mobile-friendliness, indexing, and on-page elements.",
        example: "An audit reveals 500 pages with missing meta descriptions, 200 broken internal links, 3 orphan pages, and slow Core Web Vitals.",
        exampleEl: "Ένας έλεγχος αποκαλύπτει 500 σελίδες χωρίς meta description, 200 σπασμένους εσωτερικούς συνδέσμους, 3 ορφανές σελίδες και αργά Core Web Vitals.",
        technique: "Run audits monthly on large sites, weekly during migrations. Prioritize issues by impact, fix crawl/index issues first, then on-page, then minor items.",
        techniqueEl: "Κάντε έλεγχο κάθε μήνα σε μεγάλα sites και κάθε εβδομάδα κατά τη διάρκεια μιας μετάβασης (migration). Ιεραρχήστε τα προβλήματα με βάση την επίπτωση: πρώτα crawl και ευρετηρίαση, μετά on-page και στο τέλος τα δευτερεύοντα.",
        proTip: "Not all audit issues matter equally. 100 missing image alt texts < 1 noindex on your money page. Prioritize by traffic impact.",
        proTipEl: "Δεν έχουν όλα τα ευρήματα την ίδια σημασία. 100 εικόνες χωρίς alt text μετρούν λιγότερο από ένα noindex στη σελίδα που φέρνει τα έσοδα. Ιεραρχήστε με βάση την επίπτωση στην επισκεψιμότητα.",
        relatedTerms: ["technical-seo", "crawling", "indexing"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" },
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      },
      {
        id: "competitor-analysis",
        termEl: "Competitor Analysis (Ανάλυση ανταγωνισμού)",
        shortDefinitionEl: "Έρευνα των στρατηγικών SEO και της απόδοσης των ανταγωνιστών.",
        fullDefinitionEl: "Η ανάλυση ανταγωνισμού στο SEO εξετάζει την οργανική απόδοση των ανταγωνιστών, τις κατατάξεις τους, τα προφίλ backlinks, τις στρατηγικές περιεχομένου και τις τεχνικές τους υλοποιήσεις, ώστε να εντοπίσετε ευκαιρίες και να διαμορφώσετε τη δική σας στρατηγική.",
        term: "Competitor Analysis",
        shortDefinition: "Researching competitor SEO strategies and performance.",
        fullDefinition: "SEO competitor analysis involves studying competitors' organic search performance, keyword rankings, backlink profiles, content strategies, and technical implementations to identify opportunities and inform your strategy.",
        example: "Analysis shows competitor ranks for 500 keywords you don't, has 3x your backlinks, but poor Core Web Vitals you can beat.",
        exampleEl: "Η ανάλυση δείχνει ότι ένας ανταγωνιστής κατατάσσεται για 500 λέξεις-κλειδιά που εσείς δεν έχετε, έχει τριπλάσια backlinks, αλλά αδύναμα Core Web Vitals που μπορείτε να ξεπεράσετε.",
        technique: "Identify true SERP competitors (not just business competitors), analyze their top content, find their backlink sources, identify content gaps, study their site structure.",
        techniqueEl: "Εντοπίστε τους πραγματικούς ανταγωνιστές στη SERP (όχι μόνο τους επιχειρηματικούς), αναλύστε το περιεχόμενο που τους αποδίδει περισσότερο, βρείτε από πού παίρνουν backlinks, εντοπίστε κενά περιεχομένου και μελετήστε την αρχιτεκτονική του site τους.",
        proTip: "Your real competitors are whoever ranks for your target keywords - not necessarily your business competitors. A blog might outrank you, not a rival company.",
        proTipEl: "Οι πραγματικοί σας ανταγωνιστές είναι όσοι κατατάσσονται για τις λέξεις-κλειδιά σας, όχι απαραίτητα οι επιχειρηματικοί σας ανταγωνιστές. Μπορεί να σας ξεπερνά ένα blog, όχι μια ανταγωνίστρια εταιρεία.",
        relatedTerms: ["content-gap-analysis", "backlink-analysis", "keyword-research"],
        relatedLinks: [
          { title: "Competitor Analysis", url: "/features/competitor-analysis", type: "feature" },
          { title: "Competitor Content Spy", url: "/features/competitor-content-spy", type: "feature" }
        ]
      },
      {
        id: "seo-reporting",
        termEl: "SEO Reporting (Αναφορές SEO)",
        shortDefinitionEl: "Τακτικές αναφορές που παρουσιάζουν την απόδοση και την πρόοδο του SEO.",
        fullDefinitionEl: "Οι αναφορές SEO είναι τακτικές συνόψεις με τις μετρικές SEO, την πρόοδο προς τους στόχους και συμπεράσματα που οδηγούν σε ενέργειες. Μια καλή αναφορά μεταφράζει τα δεδομένα σε επιχειρηματικό αποτέλεσμα και καθοδηγεί τις αποφάσεις στρατηγικής.",
        term: "SEO Reporting",
        shortDefinition: "Regular reports communicating SEO performance and progress.",
        fullDefinition: "SEO reporting involves creating regular summaries of SEO metrics, progress toward goals, and actionable insights. Good reports translate data into business impact and guide strategy decisions.",
        example: "Monthly report shows: 15% organic traffic increase, 5 new page 1 rankings, 20 backlinks acquired, 3 technical issues fixed.",
        exampleEl: "Η μηνιαία αναφορά δείχνει: +15% οργανική επισκεψιμότητα, 5 νέες κατατάξεις στην πρώτη σελίδα, 20 νέα backlinks, 3 τεχνικά προβλήματα διορθώθηκαν.",
        technique: "Report on business metrics (traffic, conversions, revenue), not just rankings. Include context, trends, actions taken, and next steps. Customize for audience.",
        techniqueEl: "Αναφέρετε επιχειρηματικές μετρικές (επισκεψιμότητα, μετατροπές, έσοδα), όχι μόνο κατατάξεις. Δώστε πλαίσιο, τάσεις, τι έγινε και ποια είναι τα επόμενα βήματα. Προσαρμόστε την αναφορά σε αυτόν που τη διαβάζει.",
        proTip: "Executives want business impact, not rankings. Lead with 'organic traffic increased revenue by $X' not 'we moved from position 8 to 5'.",
        proTipEl: "Η διοίκηση θέλει επιχειρηματικό αποτέλεσμα, όχι κατατάξεις. Ξεκινήστε με το «η οργανική επισκεψιμότητα αύξησε τα έσοδα κατά Χ €» και όχι με το «ανεβήκαμε από τη θέση 8 στην 5».",
        relatedTerms: ["analytics", "kpis", "organic-traffic"],
        relatedLinks: [
          { title: "SEO Health Score", url: "/features/seo-health-score", type: "feature" }
        ]
      }
    ]
  },
  {
    id: "advanced-concepts",
    title: "Advanced Concepts",
    description: "Advanced SEO strategies and specialized optimization techniques",
    icon: Settings,
    color: "pink",
    terms: [
      {
        id: "crawl-budget",
        termEl: "Crawl Budget",
        shortDefinitionEl: "Πόσες σελίδες του site σας θα κάνει crawl το Googlebot σε ένα συγκεκριμένο χρονικό διάστημα.",
        fullDefinitionEl: "Το crawl budget είναι ο αριθμός των σελίδων που θα επισκεφθεί ο crawler της Google στο site σας μέσα σε ένα χρονικό διάστημα. Στα μεγάλα sites, η βελτιστοποίησή του εξασφαλίζει ότι οι σημαντικές σελίδες γίνονται crawl συχνά, ενώ οι σελίδες χωρίς αξία δεν σπαταλούν πόρους.",
        term: "Crawl Budget",
        shortDefinition: "The number of pages Googlebot will crawl on your site in a given time.",
        fullDefinition: "Crawl budget is the number of pages Google's crawler will visit on your website within a certain timeframe. For large sites, optimizing crawl budget ensures important pages get crawled frequently while low-value pages don't waste resources.",
        example: "A site with 1 million pages but crawl budget for 10,000/day means it takes 100 days to crawl everything once.",
        exampleEl: "Ένα site με 1 εκατομμύριο σελίδες και crawl budget 10.000 σελίδων την ημέρα χρειάζεται 100 ημέρες για να γίνει crawl ολόκληρο μία φορά.",
        technique: "Block low-value pages in robots.txt, fix crawl errors, improve page speed, remove duplicate content, optimize internal linking to important pages.",
        techniqueEl: "Μπλοκάρετε τις σελίδες χωρίς αξία στο robots.txt, διορθώστε τα σφάλματα crawl, βελτιώστε την ταχύτητα, αφαιρέστε το διπλότυπο περιεχόμενο και βελτιστοποιήστε τους εσωτερικούς συνδέσμους προς τις σημαντικές σελίδες.",
        proTip: "Crawl budget only matters for large sites (100K+ pages). Small sites will have everything crawled regardless of optimization.",
        proTipEl: "Το crawl budget μετράει μόνο σε μεγάλα sites (100.000+ σελίδες). Στα μικρά sites όλες οι σελίδες θα γίνουν crawl, με ή χωρίς βελτιστοποίηση.",
        relatedTerms: ["crawling", "robots-txt", "indexing"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "index-bloat",
        termEl: "Index Bloat",
        shortDefinitionEl: "Όταν έχουν ευρετηριαστεί πάρα πολλές σελίδες χωρίς αξία.",
        fullDefinitionEl: "Το index bloat συμβαίνει όταν ένα site έχει ευρετηριασμένες πάρα πολλές φτωχές, διπλότυπες ή χαμηλής ποιότητας σελίδες. Αυτό σπαταλά crawl budget, αραιώνει το PageRank και μπορεί να επηρεάσει αρνητικά το πώς αντιλαμβάνεται η Google την ποιότητα του site.",
        term: "Index Bloat",
        shortDefinition: "Having too many low-value pages indexed in search engines.",
        fullDefinition: "Index bloat occurs when a site has too many thin, duplicate, or low-quality pages indexed. This dilutes crawl budget, spreads PageRank thin, and can negatively impact how Google perceives site quality.",
        example: "An e-commerce site with 500 product pages but 50,000 indexed URLs due to faceted navigation creating infinite filter combinations.",
        exampleEl: "Ένα e-shop με 500 σελίδες προϊόντων αλλά 50.000 ευρετηριασμένα URLs, επειδή τα φίλτρα πλοήγησης δημιουργούν ατελείωτους συνδυασμούς.",
        technique: "Audit indexed pages with site: operator, noindex thin/duplicate pages, canonicalize variations, block low-value URLs from crawling, consolidate content.",
        techniqueEl: "Ελέγξτε τις ευρετηριασμένες σελίδες με τον τελεστή site:, βάλτε noindex στις φτωχές ή διπλότυπες σελίδες, ορίστε canonical στις παραλλαγές, μπλοκάρετε το crawl στα URLs χωρίς αξία και ενοποιήστε το περιεχόμενο.",
        proTip: "Check GSC's 'Pages' report. If indexed pages >> your actual content pages, you likely have bloat. Target quality over quantity.",
        proTipEl: "Δείτε την αναφορά «Σελίδες» στο Search Console. Αν οι ευρετηριασμένες σελίδες είναι πολύ περισσότερες από τις πραγματικές σελίδες περιεχομένου σας, μάλλον έχετε bloat. Στοχεύστε στην ποιότητα, όχι στην ποσότητα.",
        relatedTerms: ["thin-content", "duplicate-content", "crawl-budget"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "topical-authority",
        termEl: "Topical Authority (Θεματικό κύρος)",
        shortDefinitionEl: "Η αναγνώριση ενός site ως έγκυρης πηγής για ένα συγκεκριμένο θέμα.",
        fullDefinitionEl: "Το θεματικό κύρος είναι η εξειδίκευση που αναγνωρίζεται σε μια ιστοσελίδα για ένα συγκεκριμένο θεματικό πεδίο. Τα sites με θεματικό κύρος κατατάσσονται συνήθως καλύτερα σε συναφείς αναζητήσεις, επειδή η Google τα εμπιστεύεται ως ολοκληρωμένες πηγές.",
        term: "Topical Authority",
        shortDefinition: "Being recognized as an authoritative source on a specific topic.",
        fullDefinition: "Topical authority is the perceived expertise a website has on a particular subject area. Sites with topical authority tend to rank better for related queries because Google trusts them as comprehensive sources.",
        example: "A website dedicated to running with 100+ detailed articles on training, shoes, nutrition, and injuries has topical authority in running.",
        exampleEl: "Μια ιστοσελίδα αφιερωμένη στο τρέξιμο, με 100+ αναλυτικά άρθρα για προπόνηση, παπούτσια, διατροφή και τραυματισμούς, έχει θεματικό κύρος στο τρέξιμο.",
        technique: "Cover your topic comprehensively, create content clusters, earn links from topic-relevant sites, build author expertise, update content regularly.",
        techniqueEl: "Καλύψτε το θέμα σας ολοκληρωμένα, φτιάξτε θεματικά clusters περιεχομένου, κερδίστε συνδέσμους από sites του ίδιου θέματος, χτίστε την εξειδίκευση των συγγραφέων και ανανεώνετε τακτικά το περιεχόμενο.",
        proTip: "You don't need authority in everything. Pick your niche and go deep. A site about 'running' will outrank a general 'sports' site for running queries.",
        proTipEl: "Δεν χρειάζεται να έχετε κύρος σε όλα. Διαλέξτε τον τομέα σας και πηγαίνετε σε βάθος. Ένα site για το «τρέξιμο» θα ξεπεράσει ένα γενικό site για «αθλητισμό» στις αναζητήσεις για τρέξιμο.",
        relatedTerms: ["topic-clusters", "e-e-a-t", "content-strategy"],
        relatedLinks: [
          { title: "Semantic Keyword Clustering", url: "/features/semantic-keyword-clustering", type: "feature" }
        ]
      },
      {
        id: "pogo-sticking",
        termEl: "Pogo-sticking",
        shortDefinitionEl: "Όταν ο χρήστης επιστρέφει γρήγορα στα αποτελέσματα και πατά άλλο αποτέλεσμα.",
        fullDefinitionEl: "Pogo-sticking έχουμε όταν ο χρήστης πατά ένα αποτέλεσμα, επιστρέφει γρήγορα στη SERP και πατά ένα διαφορετικό. Δείχνει ότι το πρώτο αποτέλεσμα δεν κάλυψε αυτό που έψαχνε, άρα είναι πιθανό αρνητικό σήμα.",
        term: "Pogo-sticking",
        shortDefinition: "When users quickly bounce back to search results and click another result.",
        fullDefinition: "Pogo-sticking occurs when a user clicks a search result, quickly returns to the SERP, and clicks a different result. It suggests the first result didn't satisfy their query - a potential negative signal.",
        example: "User searches 'best coffee maker', clicks result #1, returns in 5 seconds, clicks result #2 and stays. Result #1 may have pogo-sticking issues.",
        exampleEl: "Ο χρήστης ψάχνει «καλύτερη καφετιέρα», πατά το αποτέλεσμα #1, επιστρέφει σε 5 δευτερόλεπτα, πατά το #2 και μένει εκεί. Το αποτέλεσμα #1 μάλλον έχει πρόβλημα pogo-sticking.",
        technique: "Match search intent precisely, answer the query quickly (don't bury the answer), improve page speed, ensure mobile-friendliness, use clear headlines.",
        techniqueEl: "Καλύψτε με ακρίβεια την πρόθεση αναζήτησης, απαντήστε γρήγορα (μην κρύβετε την απάντηση), βελτιώστε την ταχύτητα, φροντίστε τη φιλικότητα σε κινητά και χρησιμοποιήστε σαφείς επικεφαλίδες.",
        proTip: "Put the answer to the query near the top. If users have to scroll through ads and fluff to find what they want, they'll pogo-stick back.",
        proTipEl: "Βάλτε την απάντηση ψηλά στη σελίδα. Αν οι χρήστες πρέπει να περάσουν από διαφημίσεις και φλυαρίες για να βρουν αυτό που θέλουν, θα γυρίσουν πίσω στα αποτελέσματα.",
        relatedTerms: ["bounce-rate", "dwell-time", "search-intent"],
        relatedLinks: [
          { title: "SERP Intent Mapper", url: "/features/serp-intent-mapper", type: "feature" }
        ]
      },
      {
        id: "redirect",
        termEl: "Redirect (301/302)",
        shortDefinitionEl: "Ανακατεύθυνση χρηστών και μηχανών αναζήτησης από ένα URL σε άλλο.",
        fullDefinitionEl: "Τα redirects λένε στους browsers και στις μηχανές αναζήτησης ότι μια σελίδα μετακινήθηκε. Τα 301 είναι μόνιμα (μεταφέρουν πλήρως το link equity), ενώ τα 302 είναι προσωρινά (για βραχυπρόθεσμη χρήση, και ιστορικά μετέφεραν λιγότερο equity).",
        term: "Redirect (301/302)",
        shortDefinition: "Sending users and search engines from one URL to another.",
        fullDefinition: "Redirects tell browsers and search engines that a page has moved. 301 redirects are permanent (pass full link equity), while 302 redirects are temporary (intended to be short-term, historically passed less equity).",
        example: "Migrating from HTTP to HTTPS requires 301 redirects: http://example.com/page → https://example.com/page",
        exampleEl: "Η μετάβαση από HTTP σε HTTPS απαιτεί 301 redirects: http://example.com/page → https://example.com/page",
        technique: "Use 301 for permanent moves, keep redirect chains under 3 hops, update internal links to point directly to final URLs, monitor for redirect loops.",
        techniqueEl: "Χρησιμοποιήστε 301 για μόνιμες μετακινήσεις, κρατήστε τις αλυσίδες ανακατευθύνσεων κάτω από 3 βήματα, ενημερώστε τους εσωτερικούς συνδέσμους ώστε να δείχνουν απευθείας στο τελικό URL και ελέγχετε για βρόχους ανακατευθύνσεων.",
        proTip: "After a site migration, keep old redirects in place for at least a year. Removing them too soon can lose accumulated link equity.",
        proTipEl: "Μετά από μια μετάβαση site, κρατήστε τα παλιά redirects για τουλάχιστον έναν χρόνο. Αν τα αφαιρέσετε νωρίς, μπορεί να χάσετε το link equity που έχετε μαζέψει.",
        relatedTerms: ["site-migration", "link-equity", "technical-seo"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "log-file-analysis",
        termEl: "Log File Analysis (Ανάλυση server logs)",
        shortDefinitionEl: "Ανάλυση των αρχείων καταγραφής του server για να δείτε πώς κάνουν crawl οι μηχανές αναζήτησης στο site σας.",
        fullDefinitionEl: "Η ανάλυση των log files εξετάζει τα αρχεία καταγραφής του web server για να δείξει ακριβώς ποιες σελίδες επισκέπτονται τα bots των μηχανών αναζήτησης, πόσο συχνά και αν συναντούν σφάλματα. Δίνει την πραγματική εικόνα της συμπεριφοράς crawl.",
        term: "Log File Analysis",
        shortDefinition: "Analyzing server logs to understand how search engines crawl your site.",
        fullDefinition: "Log file analysis involves examining your web server's log files to see exactly which pages search engine bots visit, how often, and whether they encounter errors. It provides ground truth about crawl behavior.",
        example: "Logs show Googlebot visits your blog 1000 times/day but your product pages only 50 times/day - indicating crawl priority issues.",
        exampleEl: "Τα logs δείχνουν ότι το Googlebot επισκέπτεται το blog σας 1.000 φορές την ημέρα αλλά τις σελίδες προϊόντων μόνο 50, άρα υπάρχει πρόβλημα προτεραιότητας στο crawl.",
        technique: "Filter logs for bot user agents, identify frequently/rarely crawled pages, spot crawl errors, detect crawl waste, analyze crawl patterns over time.",
        techniqueEl: "Φιλτράρετε τα logs για τα user agents των bots, εντοπίστε τις σελίδες που γίνονται crawl συχνά ή σπάνια, βρείτε σφάλματα crawl, εντοπίστε το crawl που πάει χαμένο και αναλύστε τα μοτίβα crawl στον χρόνο.",
        proTip: "Log files are the only way to see what Googlebot actually does, not what you think it does. They can reveal hidden issues GSC doesn't show.",
        proTipEl: "Τα log files είναι ο μόνος τρόπος να δείτε τι κάνει πραγματικά το Googlebot, όχι τι νομίζετε ότι κάνει. Μπορούν να αποκαλύψουν κρυφά προβλήματα που δεν δείχνει το Search Console.",
        relatedTerms: ["crawling", "crawl-budget", "googlebot"],
        relatedLinks: [
          { title: "Technical SEO Guide", url: "/blog/technical-seo-guide", type: "blog" }
        ]
      },
      {
        id: "site-migration",
        termEl: "Site Migration (Μετάβαση ιστοσελίδας)",
        shortDefinitionEl: "Η μεταφορά μιας ιστοσελίδας σε νέο domain, πλατφόρμα ή δομή.",
        fullDefinitionEl: "Η μετάβαση ιστοσελίδας περιλαμβάνει σημαντικές αλλαγές στη δομή των URLs, στο domain, στην πλατφόρμα ή στο περιεχόμενο. Κάθε μετάβαση έχει ρίσκο για το SEO: αν γίνει λάθος, μπορεί να χαθεί μεγάλο μέρος της επισκεψιμότητας, ενώ αν γίνει σωστά, οι κατατάξεις μπορούν να διατηρηθούν ή και να βελτιωθούν.",
        term: "Site Migration",
        shortDefinition: "Moving a website to a new domain, platform, or structure.",
        fullDefinition: "Site migration involves significant changes to a website's URL structure, domain, platform, or content. Migrations carry SEO risk - improper handling can cause major traffic losses, while good execution can maintain or improve rankings.",
        example: "Migrating from example.com to newexample.com, or from HTTP to HTTPS, or from an old CMS to a new one.",
        exampleEl: "Μεταφορά από το example.com στο newexample.com, από HTTP σε HTTPS ή από ένα παλιό CMS σε καινούριο.",
        technique: "Create comprehensive redirect maps, update all internal links, monitor GSC for errors, notify Google via Change of Address tool, preserve URL structures when possible.",
        techniqueEl: "Φτιάξτε πλήρη χάρτη ανακατευθύνσεων, ενημερώστε όλους τους εσωτερικούς συνδέσμους, παρακολουθείτε το Search Console για σφάλματα, ενημερώστε τη Google με το εργαλείο Change of Address και διατηρήστε τη δομή των URLs όπου γίνεται.",
        proTip: "Never migrate during your busy season. Traffic drops are normal post-migration - recover time can be weeks to months. Plan buffer time.",
        proTipEl: "Μην κάνετε ποτέ μετάβαση στην περίοδο αιχμής σας. Η πτώση της επισκεψιμότητας μετά τη μετάβαση είναι φυσιολογική και η ανάκαμψη μπορεί να πάρει από εβδομάδες έως μήνες. Αφήστε περιθώριο χρόνου.",
        relatedTerms: ["redirect", "canonical-tag", "https"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "ymyl",
        termEl: "YMYL (Your Money Your Life)",
        shortDefinitionEl: "Θέματα που μπορούν να επηρεάσουν σημαντικά την υγεία, τα οικονομικά ή την ασφάλεια των χρηστών.",
        fullDefinitionEl: "YMYL (Your Money Your Life) είναι τα θέματα που μπορούν να επηρεάσουν σημαντικά την υγεία, την οικονομική σταθερότητα, την ασφάλεια ή την ευημερία ενός ανθρώπου. Η Google κρίνει το περιεχόμενο YMYL με αυστηρότερα κριτήρια ποιότητας και E-E-A-T.",
        term: "YMYL (Your Money Your Life)",
        shortDefinition: "Topics that can significantly impact users' health, finances, or safety.",
        fullDefinition: "YMYL (Your Money Your Life) refers to topics that could significantly impact a person's health, financial stability, safety, or wellbeing. Google holds YMYL content to higher quality standards and E-E-A-T requirements.",
        example: "Medical advice, financial planning, legal information, news about current events, and safety-related content are all YMYL topics.",
        exampleEl: "Ιατρικές συμβουλές, οικονομικός σχεδιασμός, νομικές πληροφορίες, ειδήσεις επικαιρότητας και περιεχόμενο για την ασφάλεια είναι όλα θέματα YMYL.",
        technique: "Ensure content is created/reviewed by experts, cite authoritative sources, display credentials, maintain accuracy, update regularly, build author reputation.",
        techniqueEl: "Φροντίστε το περιεχόμενο να γράφεται ή να ελέγχεται από ειδικούς, παραπέμψτε σε έγκυρες πηγές, δείξτε τα προσόντα των συγγραφέων, διατηρήστε την ακρίβεια, ανανεώνετε τακτικά και χτίστε τη φήμη των συγγραφέων.",
        proTip: "If you're in a YMYL niche, invest heavily in author bios, expert review, citations, and trustworthiness signals. Google scrutinizes YMYL content closely.",
        proTipEl: "Αν δραστηριοποιείστε σε θέματα YMYL, επενδύστε σοβαρά σε βιογραφικά συγγραφέων, έλεγχο από ειδικούς, παραπομπές σε πηγές και σήματα αξιοπιστίας. Η Google εξετάζει εξονυχιστικά το περιεχόμενο YMYL.",
        relatedTerms: ["e-e-a-t", "content-quality", "trustworthiness"],
        relatedLinks: [
          { title: "E-E-A-T Optimizer", url: "/features/eeat-optimizer", type: "feature" }
        ]
      },
      {
        id: "duplicate-content",
        termEl: "Duplicate Content (Διπλότυπο περιεχόμενο)",
        shortDefinitionEl: "Ουσιαστικά ίδιο περιεχόμενο που εμφανίζεται σε πολλά URLs.",
        fullDefinitionEl: "Διπλότυπο περιεχόμενο είναι το ίδιο ή σχεδόν ίδιο περιεχόμενο που εμφανίζεται σε πολλά URLs, είτε μέσα στο ίδιο site είτε σε διαφορετικά sites. Σπαταλά crawl, αραιώνει τις κατατάξεις και μπερδεύει τις μηχανές αναζήτησης για το ποια έκδοση να κατατάξουν.",
        term: "Duplicate Content",
        shortDefinition: "Substantially similar content appearing at multiple URLs.",
        fullDefinition: "Duplicate content is identical or near-identical content that appears at multiple URLs, either within a single site or across different sites. It can cause crawl waste, dilute rankings, and confuse search engines about which version to rank.",
        example: "Product descriptions copied from manufacturers, www vs non-www versions, HTTP vs HTTPS versions, URL parameters creating duplicates.",
        exampleEl: "Περιγραφές προϊόντων αντιγραμμένες από τους κατασκευαστές, εκδόσεις με και χωρίς www, εκδόσεις HTTP και HTTPS, παράμετροι URL που δημιουργούν διπλότυπα.",
        technique: "Use canonical tags to specify preferred versions, implement proper redirects, set parameter handling in GSC, create unique content, consolidate similar pages.",
        techniqueEl: "Χρησιμοποιήστε canonical tags για να δηλώσετε την προτιμώμενη έκδοση, εφαρμόστε σωστά redirects, ορίστε τον χειρισμό παραμέτρων στο Search Console, γράψτε μοναδικό περιεχόμενο και ενοποιήστε τις παρόμοιες σελίδες.",
        proTip: "Duplicate content typically isn't penalized - it's filtered. But it wastes crawl budget and can cause the wrong version to rank. Fix with canonicals.",
        proTipEl: "Το διπλότυπο περιεχόμενο συνήθως δεν τιμωρείται: φιλτράρεται. Όμως σπαταλά crawl budget και μπορεί να οδηγήσει στην κατάταξη της λάθος έκδοσης. Διορθώστε το με canonicals.",
        relatedTerms: ["canonical-tag", "index-bloat", "content-quality"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "noindex",
        termEl: "Noindex Tag",
        shortDefinitionEl: "Οδηγία που λέει στις μηχανές αναζήτησης να μην προσθέσουν μια σελίδα στο ευρετήριο.",
        fullDefinitionEl: "Το noindex (meta tag ή HTTP header) λέει στις μηχανές αναζήτησης να μην προσθέσουν μια σελίδα στο ευρετήριό τους, οπότε δεν θα εμφανίζεται στα αποτελέσματα. Διαφέρει από το μπλοκάρισμα του crawl: η σελίδα εξακολουθεί να γίνεται crawl, αλλά δεν ευρετηριάζεται.",
        term: "Noindex Tag",
        shortDefinition: "A directive telling search engines not to include a page in their index.",
        fullDefinition: "The noindex meta tag or HTTP header tells search engines that a page should not be added to their index and therefore won't appear in search results. It's different from blocking crawling - the page is still crawled but not indexed.",
        example: "<meta name=\"robots\" content=\"noindex\"> on thank-you pages, admin pages, or thin tag/category pages.",
        exampleEl: "<meta name=\"robots\" content=\"noindex\"> σε σελίδες ευχαριστίας, σελίδες διαχείρισης ή φτωχές σελίδες ετικετών και κατηγοριών.",
        technique: "Use noindex for: thin pages, duplicate pages, admin areas, staging sites, thank-you pages. Don't use on pages you want traffic to.",
        techniqueEl: "Χρησιμοποιήστε noindex για φτωχές σελίδες, διπλότυπες σελίδες, περιοχές διαχείρισης, δοκιμαστικά sites (staging) και σελίδες ευχαριστίας. Μην το βάζετε σε σελίδες από τις οποίες θέλετε επισκεψιμότητα.",
        proTip: "Noindex + follow lets Google crawl links on the page without indexing it. Useful for pages with good internal links but no search value themselves.",
        proTipEl: "Το noindex μαζί με follow επιτρέπει στη Google να ακολουθεί τους συνδέσμους της σελίδας χωρίς να την ευρετηριάζει. Χρήσιμο για σελίδες με καλούς εσωτερικούς συνδέσμους αλλά χωρίς δική τους αξία στην αναζήτηση.",
        relatedTerms: ["robots-txt", "indexing", "meta-tags"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "pagination-seo",
        termEl: "Pagination SEO (SEO σελιδοποίησης)",
        shortDefinitionEl: "Ο σωστός χειρισμός του περιεχομένου που χωρίζεται σε πολλές σελίδες, για βέλτιστη ευρετηρίαση.",
        fullDefinitionEl: "Το SEO σελιδοποίησης αφορά τον σωστό χειρισμό του περιεχομένου που χωρίζεται σε πολλές σελίδες (όπως τα αρχεία ενός blog ή οι λίστες προϊόντων), ώστε οι μηχανές αναζήτησης να βρίσκουν όλο το περιεχόμενο χωρίς προβλήματα διπλότυπου περιεχομένου.",
        term: "Pagination SEO",
        shortDefinition: "Handling multi-page content for optimal search engine indexing.",
        fullDefinition: "Pagination SEO involves properly handling content split across multiple pages (like blog archives or product listings) so search engines can discover all content while avoiding duplicate content issues.",
        example: "A blog with 50 posts showing 10 per page: /blog/, /blog/page/2/, /blog/page/3/, etc. Each needs proper handling.",
        exampleEl: "Ένα blog με 50 άρθρα που δείχνει 10 ανά σελίδα: /blog/, /blog/page/2/, /blog/page/3/ κ.λπ. Η καθεμία θέλει σωστό χειρισμό.",
        technique: "Use self-referencing canonicals on each page, ensure proper linking between pages, consider 'load more' or infinite scroll with proper implementation, use view-all pages if appropriate.",
        techniqueEl: "Βάλτε self-referencing canonical σε κάθε σελίδα, φροντίστε για σωστή σύνδεση ανάμεσα στις σελίδες, εξετάστε το «φόρτωση περισσότερων» ή το infinite scroll με σωστή υλοποίηση και χρησιμοποιήστε σελίδες «προβολή όλων» όπου ταιριάζει.",
        proTip: "Google deprecated rel='next/prev' hints. Now focus on clear navigation, ensuring each paginated page has unique valuable content visible.",
        proTipEl: "Η Google σταμάτησε να χρησιμοποιεί τις υποδείξεις rel='next/prev'. Εστιάστε πλέον σε σαφή πλοήγηση και φροντίστε κάθε σελίδα της σελιδοποίησης να έχει ορατό, μοναδικό και χρήσιμο περιεχόμενο.",
        relatedTerms: ["canonical-tag", "crawling", "site-architecture"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      },
      {
        id: "rendering",
        termEl: "Rendering (JavaScript SEO)",
        shortDefinitionEl: "Πώς επεξεργάζονται και εκτελούν οι μηχανές αναζήτησης τη JavaScript για να δουν το περιεχόμενο της σελίδας.",
        fullDefinitionEl: "Rendering είναι η διαδικασία με την οποία οι μηχανές αναζήτησης εκτελούν τη JavaScript για να παράγουν το τελικό HTML μιας σελίδας. Τα sites που βασίζονται πολύ στη JavaScript χρειάζονται σωστό rendering για να ευρετηριαστεί το περιεχόμενό τους.",
        term: "Rendering (JavaScript SEO)",
        shortDefinition: "How search engines process and execute JavaScript to see page content.",
        fullDefinition: "Rendering is the process by which search engines execute JavaScript to generate the final HTML content of a page. JavaScript-heavy sites require proper rendering for search engines to index their content.",
        example: "A React SPA that loads content via JavaScript. Googlebot must render the page to see the content - if rendering fails, content isn't indexed.",
        exampleEl: "Μια εφαρμογή React (SPA) φορτώνει το περιεχόμενο μέσω JavaScript. Το Googlebot πρέπει να κάνει rendering τη σελίδα για να δει το περιεχόμενο: αν το rendering αποτύχει, το περιεχόμενο δεν ευρετηριάζεται.",
        technique: "Use server-side rendering (SSR) or static generation for critical content, test with Mobile-Friendly Test, check rendered HTML in GSC, minimize render-blocking JS.",
        techniqueEl: "Χρησιμοποιήστε server-side rendering (SSR) ή static generation για το κρίσιμο περιεχόμενο, κάντε δοκιμή με το Mobile-Friendly Test, ελέγξτε το HTML μετά το rendering στο Search Console και περιορίστε τη JavaScript που μπλοκάρει την απόδοση της σελίδας.",
        proTip: "Googlebot queues pages for rendering - there's a delay between crawl and render. SSR ensures content is immediately visible without rendering dependency.",
        proTipEl: "Το Googlebot βάζει τις σελίδες σε ουρά για rendering, οπότε υπάρχει καθυστέρηση ανάμεσα στο crawl και στο rendering. Με SSR το περιεχόμενο είναι αμέσως ορατό, χωρίς να εξαρτάται από το rendering.",
        relatedTerms: ["javascript-seo", "indexing", "crawling"],
        relatedLinks: [
          { title: "Technical SEO Audits", url: "/features/technical-seo-audits", type: "feature" }
        ]
      }
    ]
  }
];
