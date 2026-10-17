import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { docIcon } from "@/components/docs/icons";
import type { HelpHomeCard } from "@/lib/help/home";
import { cn } from "@/lib/cn";

/** Server-rendered links to help categories and articles that already exist. */
export function HelpHomeCards({ cards, label }: { readonly cards: readonly HelpHomeCard[]; readonly label: string }) {
  if (cards.length === 0) return null;
  return (
    <section aria-label={label} className="mt-6">
      <ul className="grid list-none gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = docIcon(card.icon);
          return (
            <li key={card.href} className="min-w-0">
              <Link href={card.href} className="group relative block h-full rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-primary/50">
                {Icon ? <Icon className="size-5 text-primary-glow" aria-hidden /> : null}
                <span className={cn("block font-display text-[15.5px] font-semibold text-foreground", Icon && "mt-4")}>{card.title}</span>
                <span className="mt-1.5 block text-[14px] leading-relaxed text-muted-foreground">{card.text}</span>
                <ArrowRight className="absolute right-5 top-5 size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
