#!/usr/bin/env node
/**
 * Fails when Greek copy uses a literal translation of an SEO or Google term
 * instead of the English term (docs/greek-style-guide.md, "never translate").
 * A Greek gloss in brackets right after the English term is allowed:
 * "Structured Data (Δομημένα Δεδομένα)" in the glossary.
 *
 * Usage: npm run check:greek
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DIRS = ["src", "content"];

/** [literal translation, the term to use instead] */
const BANNED = [
  [/γράφο[ςυ] γνώσης/giu, "Knowledge Graph"],
  [/σύνοψη(ς)? ai/giu, "AI Overview"],
  [/επιθεώρηση(ς)? url/giu, "URL Inspection"],
  [/παραπέμπο(ν|ντα|ντος|ντων) domain/giu, "referring domain(s)"],
  [/κεν(ό|ού) λέξεων-κλειδιών/giu, "keyword gap"],
  [/οι χρήστες ρωτούν επίσης/giu, "People Also Ask"],
  [/κείμενο συνδέσμου|κείμενα συνδέσμων/giu, "anchor text"],
  [/ετικέτα τίτλου|ετικέτες τίτλου/giu, "title tag"],
  [/δομημένα δεδομένα|δομημένων δεδομένων/giu, "structured data"],
  [/εμπλουτισμένα αποτελέσματα/giu, "rich results"],
  [/χάρτη(ς)? ιστοτόπου/giu, "sitemap"],
];

function files(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/\.(ts|tsx|md|mdx)$/.test(name)) out.push(path);
  }
  return out;
}

/** "English Term (ελληνική απόδοση)": the match sits in brackets right after Latin text. */
function isGloss(line, index) {
  const open = line.lastIndexOf("(", index);
  if (open === -1 || line.indexOf(")", index) === -1) return false;
  return /[A-Za-z][\w\s-]*\s$/.test(line.slice(Math.max(0, open - 40), open));
}

const problems = [];
for (const dir of DIRS) {
  for (const file of files(join(ROOT, dir))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (/\bAster\b(?! AI)/u.test(line)) problems.push(`${relative(ROOT, file)}:${i + 1}  use the full product name Aster AI`);
      if (/φύλακας αλλαγών|λέξεις-σπόροι|μερίδιο φωνής/iu.test(line)) problems.push(`${relative(ROOT, file)}:${i + 1}  rewrite the literal Greek phrasing`);
      for (const [pattern, use] of BANNED) {
        for (const m of line.matchAll(pattern)) {
          if (!isGloss(line, m.index)) problems.push(`${relative(ROOT, file)}:${i + 1}  «${m[0]}» → use "${use}"`);
        }
      }
    });
  }
}

if (problems.length) {
  console.error(`Greek glossary: ${problems.length} literal translation(s) of SEO terms\n`);
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("Greek glossary: no literal translations of SEO terms.");
