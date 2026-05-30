"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { getAlternateLocalePath } from "@/lib/locale-paths";

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const isGreek = pathname === "/gr" || pathname.startsWith("/gr/");
  const alternatePath = getAlternateLocalePath(pathname);

  const enHref = isGreek ? alternatePath : pathname === "/" ? "/" : pathname;
  const elHref = isGreek
    ? pathname
    : alternatePath.startsWith("/gr")
      ? alternatePath
      : pathname === "/"
        ? "/gr"
        : alternatePath;

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-lg border border-border/80 bg-muted/30 p-0.5 text-xs font-medium"
      role="group"
      aria-label="Language"
    >
      <Globe className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" aria-hidden />
      <Link
        href={enHref}
        className={`rounded-md px-2 py-1 transition-colors ${
          !isGreek
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        hrefLang="en"
      >
        EN
      </Link>
      <Link
        href={elHref}
        className={`rounded-md px-2 py-1 transition-colors ${
          isGreek
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        hrefLang="el"
      >
        ΕΛ
      </Link>
    </div>
  );
}
