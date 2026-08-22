import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === "out") continue;
      walk(full, files);
    } else if (full.endsWith(".tsx") || full.endsWith(".ts")) {
      files.push(full);
    }
  }
  return files;
}

describe("Regression guard: no locale-dependent number formatting", () => {
  it("no source file (other than lib/format.ts) calls toLocaleString() without an explicit locale", () => {
    const srcDir = join(__dirname, "..");
    const offenders: string[] = [];
    for (const file of walk(srcDir)) {
      if (file.endsWith("lib/format.ts")) continue;
      if (file.includes("__tests__")) continue;
      const content = readFileSync(file, "utf-8");
      // Flags toLocaleString() called with zero arguments (locale-dependent).
      if (/\.toLocaleString\(\s*\)/.test(content)) {
        offenders.push(file);
      }
    }
    expect(offenders).toEqual([]);
  });
});
