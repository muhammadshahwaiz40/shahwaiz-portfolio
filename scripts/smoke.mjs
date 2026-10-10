// Smoke checks against a running server (default http://localhost:3000).
// Usage: npm run build && npm run start   (in one terminal)
//        npm run smoke                     (in another)
const base = (process.env.SMOKE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const pages = [
  { path: "/", expect: ["AI systems.", "NextAct", "Menzync", "EmoSense AI", 'id="contact"', "mailto:shahwaizarts@gmail.com", "portrait.webp"] },
  { path: "/work", expect: ["Case studies", "Product prototypes", "Coursework", 'id="clientdesk"'] },
  { path: "/work/nextact", expect: ["My role", "Architecture", "https://nextact.tech"] },
  { path: "/work/menzync", expect: ["My role", "connected to the prototype yet"] },
  { path: "/work/emosense-ai", expect: ["My role", "github.com/muhammadshahwaiz40"] },
  { path: "/sitemap.xml", expect: ["/work/nextact"] },
  { path: "/robots.txt", expect: ["User-Agent"] },
];

// Strings that must never reach a public page. Private values live in a git-ignored
// file (scripts/private-strings.local.json) so this script can be public.
import { existsSync, readFileSync } from "node:fs";
const localFile = new URL("./private-strings.local.json", import.meta.url);
const forbidden = ["content-review", ...(existsSync(localFile) ? JSON.parse(readFileSync(localFile, "utf8")).forbidden : [])];
if (!existsSync(localFile)) console.warn("! scripts/private-strings.local.json not found: private-string checks skipped");

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("✗", msg);
};

for (const page of pages) {
  const res = await fetch(base + page.path, { redirect: "manual" });
  const body = await res.text();
  if (res.status !== 200) fail(`${page.path} returned ${res.status}`);
  for (const s of page.expect) if (!body.includes(s)) fail(`${page.path} is missing "${s}"`);
  for (const s of forbidden) if (body.includes(s)) fail(`${page.path} contains forbidden "${s}"`);
  // No empty or placeholder hrefs.
  if (/href="(#|)"/.test(body)) fail(`${page.path} has an empty or "#" href`);
  if (page.path.startsWith("/work") || page.path === "/") {
    const h1 = body.match(/<h1[\s>]/g)?.length ?? 0;
    if (h1 !== 1) fail(`${page.path} has ${h1} <h1> elements`);
  }
  console.log(`✓ ${page.path}`);
}

for (const path of ["/work/does-not-exist", "/work/clientdesk", "/nope"]) {
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 404) fail(`${path} should be 404, got ${res.status}`);
  else console.log(`✓ ${path} → 404`);
}

// The CV is intentionally not published.
for (const page of ["/"]) {
  const body = await (await fetch(base + page)).text();
  if (body.includes("Download CV") || body.includes(".pdf")) fail(`${page} still links a CV`);
}

const head = await fetch(base + "/");
for (const h of ["x-content-type-options", "referrer-policy", "x-frame-options"]) {
  if (!head.headers.get(h)) fail(`missing header ${h}`);
}

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll smoke checks passed");
