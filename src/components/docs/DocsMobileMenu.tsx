"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useDocsUI } from "./DocsUI";
import { DocsSidebar, type SidebarChrome } from "./DocsSidebar";
import type { SideGroup } from "@/lib/docs/nav";

/** The sidebar as a drawer below lg. Closes itself on navigation. */
export function DocsMobileMenu({ groups, chrome, locale, closeLabel }: { readonly groups: ReadonlyArray<SideGroup>; readonly chrome: SidebarChrome; readonly locale: "en" | "el"; readonly closeLabel: string }) {
  const ui = useDocsUI();
  const pathname = usePathname();
  const { close } = ui;
  useEffect(() => {
    close();
  }, [pathname, close]);
  if (ui.panel !== "menu") return null;
  return (
    <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true">
      <button type="button" aria-label={closeLabel} onClick={ui.close} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] border-r border-hairline bg-background shadow-2xl">
        <button type="button" onClick={ui.close} aria-label={closeLabel} className="absolute right-3 top-14 z-10 grid size-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
          <X className="size-4" aria-hidden />
        </button>
        <DocsSidebar groups={groups} chrome={chrome} locale={locale} />
      </div>
    </div>
  );
}
