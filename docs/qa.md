# QA record — 9 Oct 2026

Local production build (`next build` + `next start`, Next.js 16.4.0), Windows 11, headless Microsoft Edge 154.

## Automated

| Check | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` | pass, no warnings |
| `npm run build` | pass; all 11 routes prerendered (3 case studies via `generateStaticParams`) |
| `npm run smoke` | pass: 7 routes return 200 with expected content; `/work/does-not-exist`, `/work/clientdesk`, `/nope` return 404; security headers present; no forbidden private strings; one `<h1>` per page; no empty/`#` hrefs |
| Client JS bundle scan | no phone number, student ID or seed password in `.next/static` |
| axe-core 4 (WCAG 2.0/2.1/2.2 A+AA + best practice) | **0 violations** on `/`, `/work`, 3 case studies and the 404, at 1440px and 390px |
| Horizontal overflow | none at 1440, 390 or 320px on any of those 6 pages |
| Console errors | none (except the expected 404 response on the not-found page) |
| No JavaScript | H1, all 4 atlas links and the first panel of each project's views are readable |
| `prefers-reduced-motion: reduce` | 0 running animations; smooth scrolling off |
| Keyboard | mobile menu opens and closes, Escape closes it and returns focus to the button; project view tabs support ←/→/Home/End with roving tabindex |

## Lighthouse 12 (mobile, simulated throttling, local server)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 69* |
| `/work/nextact` | 92 | 100 | 100 | 66* |
| `/` with `SITE_INDEXING=true` | — | — | — | 100 |

\* Local and preview builds are deliberately `noindex`, which fails Lighthouse's "is crawlable" audit. With indexing enabled, as on the production deployment, SEO scores 100.

Lab figures: LCP 2.5–2.6 s, CLS 0, TBT 80–270 ms. These are lab measurements on a local machine, not field Core Web Vitals.

## Screenshots

`docs/screenshots/`: home (desktop, mobile), work index (desktop), NextAct case study (desktop, mobile), 404 (mobile). Captured with headless Edge. The APPEC image looks blank in full-page captures because it lazy-loads; it loads normally when scrolled into view (verified).

## Not verified

- Behaviour on real iOS/Android devices and Safari/Firefox.
- (Local section above.) The deployed site was verified separately, see Production below.
- Coursera certificate pages (not fetched).
- Field performance data (needs real traffic).
- Manual screen-reader pass (NVDA/VoiceOver). Automated scans don't replace it.

## Production — 9 Oct 2026

Deployed with the Vercel CLI to project `shahwaiz-portfolio` (Node 24.x, Next.js preset).

| Check | Result |
|---|---|
| `https://shahwaiz.me` | 200, Let's Encrypt certificate (expires 7 Jan 2027, auto-renewed by Vercel) |
| `http://shahwaiz.me` → | 308 to `https://shahwaiz.me/` |
| `https://www.shahwaiz.me/*` → | 308 to `https://shahwaiz.me/*` |
| `SMOKE_URL=https://shahwaiz.me npm run smoke` | all checks passed |
| robots.txt / sitemap.xml | indexable, sitemap lists the 5 public routes |
| Headers | HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy present |
| Private files (`docs/content-review.md`, `.env.local`, docs) | 404, not uploaded (`.vercelignore`) |
| `*.vercel.app` URLs | behind Vercel Authentication (not public) |

DNS at Namecheap: `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com.`; email-forwarding MX/TXT unchanged.

## Google Search Console — 9 Oct 2026

- URL-prefix property `https://shahwaiz.me/` verified with the HTML meta tag (`verification.google` in `app/layout.tsx`; removing it un-verifies the property).
- `sitemap.xml` submitted. Search Console showed "Couldn't fetch" immediately after submission. The file itself returns 200 `application/xml` to a Googlebot user agent with 5 valid URLs, so this is the usual first-fetch delay for a new property; re-check the Sitemaps report in a day or two.
