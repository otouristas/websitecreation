"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

/**
 * Toggles Tailwind `dark` class on `document.documentElement` (matches Vite marketing).
 */
export function ThemeToggle(): ReactElement {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");
    // Post-mount sync is the point here: theme comes from localStorage / prefers-color-scheme, both browser-only,
    // so the first paint has to be the SSR value and this corrects it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);
  function toggleTheme(): void {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="grid size-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
