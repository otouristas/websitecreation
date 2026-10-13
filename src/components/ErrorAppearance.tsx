"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { geistMono, inter } from "@/brand/typography";
import { initializeStoredTheme, THEME_INIT_SCRIPT } from "@/brand/theme";

// Next's error root may omit the normal root's classes and head initializer.
const script = `${THEME_INIT_SCRIPT}document.documentElement.classList.add(${JSON.stringify(inter.variable)},${JSON.stringify(geistMono.variable)});document.documentElement.lang=location.pathname.split('/')[1]==='el'?'el':'en';`;

/** Reapply the same stored preference/font setup on initial and client 404s. */
export function ErrorAppearance() {
  const pathname = usePathname();
  useEffect(() => {
    initializeStoredTheme();
    document.documentElement.classList.add(inter.variable, geistMono.variable);
    document.documentElement.lang = pathname?.split("/")[1] === "el" ? "el" : "en";
  }, [pathname]);
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
