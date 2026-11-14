import { HOME_LOGOS } from "./home-content";

interface ClientMark {
  readonly src: string;
  readonly alt: string;
  readonly surface?: "light" | "dark";
}

// Use the artwork and background treatment supplied by the client.
const caseMarks: Readonly<Record<string, ClientMark | undefined>> = {
  // https://cycladesrentacar.com/brand/logo.svg
  "cyclades-rentacar": { src: "/logos/clients/cyclades-rentacar.svg", alt: "Cyclades Rent a Car", surface: "light" },
  // https://www.skydream.travel/wp-content/uploads/2026/03/Skydream_Travel_Design_logo.svg
  "skydream-travel": { src: "/logos/clients/skydream-travel.svg", alt: "Skydream Travel", surface: "light" },
  // https://projectshadow.ai/assets/logo-dark-style.svg
  "project-shadow-ai": { src: "/logos/clients/project-shadow-ai.svg", alt: "Project Shadow AI", surface: "dark" },
  // https://bestpumpkinnearme.com/logo-mark.svg
  "best-pumpkin-near-me": { src: "/logos/clients/best-pumpkin-near-me.svg", alt: "Best Pumpkin Near Me", surface: "light" },
  // https://rentacarsifnos.com/images/brand/artemis-auto-rental-white.svg
  "rentacar-sifnos": { src: "/logos/clients/rentacar-sifnos.svg", alt: "Artemis Rental Sifnos", surface: "dark" },
};

export function caseStudyMark(slug: string): ClientMark | undefined {
  return caseMarks[slug];
}

const caseMarksByName = new Map(
  Object.values(caseMarks).filter((mark): mark is ClientMark => Boolean(mark)).map((mark) => [mark.alt, mark]),
);
export const portfolioMarks: readonly ClientMark[] = [
  ...HOME_LOGOS.map((mark) => caseMarksByName.get(mark.alt) ?? mark),
  ...Array.from(caseMarksByName.values()).filter((mark) => !HOME_LOGOS.some((original) => original.alt === mark.alt)),
];
