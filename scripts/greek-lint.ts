#!/usr/bin/env npx tsx
/**
 * Greek copy linter.
 *
 * Deliberately limited to rules that are DETERMINISTIC. Greek morphology is
 * ambiguous - `του` is both masculine and neuter genitive, and in
 * "η κατασκευή e-shop" the feminine article agrees with κατασκευή, not with the
 * loanword - so a regex that flags those produces false positives. Two earlier
 * attempts did exactly that.
 *
 * This therefore checks only the unambiguous cases: a feminine or masculine
 * article/adjective in the NOMINATIVE or ACCUSATIVE sitting directly on a
 * neuter loanword, plus flat blocklists. Genuine grammar review is done by
 * reading; this is the regression net underneath it.
 *
 * Run: npx tsx scripts/greek-lint.ts
 */

import { readFileSync } from 'fs';
import { execSync } from 'child_process';

/** Loanwords that are neuter in Greek and take «το». */
const NEUTER = [
  'SEO', 'GEO', 'AEO', 'CTR', 'ROI', 'site', 'website', 'e-shop', 'blog', 'link',
  'domain', 'hosting', 'backlink', 'schema', 'budget', 'portfolio', 'newsletter',
  'dashboard', 'audit', 'brief', 'report',
];

/**
 * Nominative/accusative feminine and masculine determiners only. The genitive
 * (`του`, `των`) is excluded on purpose because it is shared with the neuter.
 */
const FEM_DET = ['Η', 'η', 'Την', 'την', 'Μια', 'μια', 'Μία', 'μία'];
const MASC_DET = ['Ο', 'ο', 'Τον', 'τον', 'Ένας', 'ένας'];

/**
 * Explicit adjective list, NOT a suffix pattern.
 *
 * A pattern like /[α-ωά-ώ]+ή/ also matches feminine NOUNS such as «κατασκευή»
 * and «αλλαγή», so "η κατασκευή e-shop" - which is correct, because the article
 * agrees with κατασκευή - got flagged as an error. Only a closed list of known
 * adjectives is safe here.
 */
const FEM_ADJ = /(?:τοπική|τεχνική|πλήρης|καλή|σωστή|νέα|βασική|μηνιαία|οργανική|ολική|δωρεάν)/;
const MASC_ADJ = /(?:τοπικός|τεχνικός|πλήρης|καλός|σωστός|νέος|βασικός|μηνιαίος|οργανικός)/;

const GREEKLISH = [
  /rank[άα]ρ/i, /κλικ[άα]ρ/i, /ποστ[άα]ρ/i, /σεταπ/i, /σερβ[άα]ρ/i,
  /μηδεν[άα]ρ/i, /σκρολ[άα]ρ/i, /σεταρ/i,
];

/** Constructions that read as machine translation. */
const MACHINE_TRANSLATED = [
  /SEO-ready\s+παράδοση/i,
  /Πλήρες\s+On-page/i,
  /Tier-1\s+πόλ/i,
  /full\s+optimization/i,
  /SEO\s+optimized\s+υπηρεσ/i,
  /κυριαρχ[ήη]στε\s+στη\s+Google/i,
];

interface Finding {
  file: string;
  line: number;
  rule: string;
  text: string;
}

const findings: Finding[] = [];

function filesToCheck(): string[] {
  const out = execSync(
    "git ls-files 'src/**/*.ts' 'src/**/*.tsx' 'content/**/*.md' | grep -v _archive",
    { encoding: 'utf8' },
  );
  return out.split('\n').filter(Boolean);
}

const hasGreek = (s: string) => /[Α-Ωα-ωά-ώ]/.test(s);

for (const file of filesToCheck()) {
  let content: string;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (!hasGreek(content)) continue;

  content.split('\n').forEach((line, idx) => {
    const n = idx + 1;
    if (!hasGreek(line)) return;

    // 1. gendered determiner/adjective directly on a neuter loanword
    for (const w of NEUTER) {
      for (const det of FEM_DET) {
        const rx = new RegExp(`(?<![\\p{L}])${det}\\s+(?:${FEM_ADJ.source}\\s+)?${w}(?![\\p{L}])`, 'u');
        const m = rx.exec(line);
        if (m) findings.push({ file, line: n, rule: `feminine on neuter «το ${w}»`, text: m[0] });
      }
      for (const det of MASC_DET) {
        const rx = new RegExp(`(?<![\\p{L}])${det}\\s+(?:${MASC_ADJ.source}\\s+)?${w}(?![\\p{L}])`, 'u');
        const m = rx.exec(line);
        if (m) findings.push({ file, line: n, rule: `masculine on neuter «το ${w}»`, text: m[0] });
      }
    }

    // 2. Greeklish
    for (const rx of GREEKLISH) {
      const m = rx.exec(line);
      if (m) findings.push({ file, line: n, rule: 'Greeklish', text: m[0] });
    }

    // 3. machine-translated constructions
    for (const rx of MACHINE_TRANSLATED) {
      const m = rx.exec(line);
      if (m) findings.push({ file, line: n, rule: 'machine-translated phrasing', text: m[0] });
    }

    // 4. em dash
    if (line.includes('—')) {
      findings.push({ file, line: n, rule: 'em dash (use " - ")', text: line.trim().slice(0, 60) });
    }

    // 5. Latin question mark ending a Greek sentence
    const q = /[α-ωά-ώ]\s*\?(?=["'\s`]|$)/u.exec(line);
    if (q) findings.push({ file, line: n, rule: 'Latin "?" in Greek (use ";")', text: q[0] });
  });
}

if (findings.length === 0) {
  console.log('greek-lint: clean');
  process.exit(0);
}

const byRule = new Map<string, number>();
for (const f of findings) byRule.set(f.rule, (byRule.get(f.rule) ?? 0) + 1);

console.log(`\ngreek-lint: ${findings.length} findings\n`);
for (const [rule, n] of [...byRule.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${rule}`);
}
console.log('');
for (const f of findings.slice(0, 40)) {
  console.log(`  ${f.file}:${f.line}\n    [${f.rule}] "${f.text}"`);
}
if (findings.length > 40) console.log(`\n  … and ${findings.length - 40} more`);

process.exit(1);
