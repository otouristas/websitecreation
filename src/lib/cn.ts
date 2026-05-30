import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind class merger. Always use this in component className composition
 * so conflicting utilities (e.g. `bg-red-500` + `bg-blue-500`) resolve to the
 * last one.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
