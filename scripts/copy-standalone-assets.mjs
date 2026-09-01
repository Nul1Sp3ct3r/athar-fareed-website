/**
 * `output: "standalone"` deliberately leaves `.next/static` and `public/` out
 * of the standalone folder, on the assumption a CDN serves them. Railway
 * serves them from the same Node process, so copy them in — without this the
 * site boots with no CSS, JS or fonts.
 *
 * Runs as a postbuild step so `pnpm build` stays exactly `next build`.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const standalone = join(".next", "standalone");

if (!existsSync(standalone)) {
  console.error(
    "[copy-standalone-assets] .next/standalone is missing - is output: \"standalone\" set in next.config.ts?",
  );
  process.exit(1);
}

const copies = [
  { from: join(".next", "static"), to: join(standalone, ".next", "static") },
  { from: "public", to: join(standalone, "public") },
];

for (const { from, to } of copies) {
  if (!existsSync(from)) {
    console.log(`[copy-standalone-assets] skipped ${from} (not present)`);
    continue;
  }
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log(`[copy-standalone-assets] copied ${from} -> ${to}`);
}
