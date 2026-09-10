"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import type { SiteLocale } from "@/lib/i18n/locale";

const LABELS: Record<SiteLocale, { neutral: string; toDark: string; toLight: string }> = {
  en: {
    neutral: "Toggle theme",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
  },
  el: {
    neutral: "Εναλλαγή θέματος",
    toDark: "Εναλλαγή σε σκούρο θέμα",
    toLight: "Εναλλαγή σε ανοιχτό θέμα",
  },
};

/**
 * Toggles the Tailwind `dark` class on `document.documentElement`.
 *
 * The moon is absolutely positioned so it can cross-fade with the sun inside
 * the same 36px box. That needs `relative` on the button: without it the
 * containing block was whatever ancestor happened to be positioned - the
 * `fixed` header `<nav>` on desktop, the `fixed inset-0` overlay inside the
 * mobile menu - so in dark mode the moon detached from its button and painted
 * over the logo. `inset-0 m-auto` centres it in both axes regardless of the
 * button's own layout mode.
 */
export function ThemeToggle({ locale = "en" }: { locale?: SiteLocale }): ReactElement {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const labels = LABELS[locale] ?? LABELS.en;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");
    // Post-mount sync is the point here: theme comes from localStorage / prefers-color-scheme, both browser-only,
    // so the first paint has to be the SSR value and this corrects it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    setMounted(true);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  function toggleTheme(): void {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  // Before mount the DOM class comes from the pre-paint inline script, which the
  // server render cannot know about, so stay neutral until the state is real.
  const label = !mounted ? labels.neutral : theme === "dark" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative grid size-9 shrink-0 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Sun className="absolute inset-0 m-auto h-5 w-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-5 w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
