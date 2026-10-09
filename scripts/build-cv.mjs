// Renders cv/cv.html to public/Muhammad-Shahwaiz-CV.pdf with headless Edge or Chrome.
// Usage: npm run cv   (set BROWSER_PATH to override the browser executable)
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) throw new Error("No Edge/Chrome found. Set BROWSER_PATH.");

const src = pathToFileURL(resolve("cv/cv.html")).href;
const out = resolve("public/Muhammad-Shahwaiz-CV.pdf");
const profile = mkdtempSync(join(tmpdir(), "cv-browser-"));
const startedAt = Date.now();

spawn(
  browser,
  ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${profile}`, "--no-pdf-header-footer", `--print-to-pdf=${out}`, src],
  { stdio: "ignore", detached: true },
).unref();

// Edge on Windows hands off to a child process and exits early, so wait for the file instead.
for (let i = 0; i < 120; i++) {
  if (existsSync(out) && statSync(out).mtimeMs >= startedAt && statSync(out).size > 0) {
    await new Promise((r) => setTimeout(r, 500));
    console.log(`Wrote ${out} (${statSync(out).size} bytes)`);
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 500));
}
throw new Error("Timed out waiting for the PDF.");
