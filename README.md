# shahwaiz.me

Personal portfolio of Muhammad Shahwaiz: AI Systems & Backend Engineering.

A static Next.js (App Router) site. There is no database, CMS, analytics or runtime API call. Every route is prerendered at build time.

## Requirements

- Node.js ≥ 20.9 (developed on 24.15)
- npm (the repo uses `package-lock.json`; don't mix package managers)
- **Keep this folder outside OneDrive/Dropbox.** Synced folders corrupt `node_modules`.

## Commands

```bash
npm ci              # install exact dependencies
npm run dev         # http://localhost:3000
npm run typecheck   # generate route types + tsc
npm run lint        # eslint
npm run build       # production build
npm run start       # serve the production build on :3000
npm run smoke       # route/content/404/header checks against a running server (SMOKE_URL to override)
npm run check       # typecheck + lint + build
```

Local production preview:

```bash
npm run build
npm run start
# in a second terminal
npm run smoke
```

## Structure

```
app/            routes: /, /work, /work/[slug], 404, sitemap, robots, OG image, icon
components/     header, footer, system atlas, project views, home sections
content/        all public copy (profile, experience, projects), typed
lib/site.ts     site URL, indexing switch, nav
public/images/  optimised, public-safe image derivatives
scripts/        smoke checks
docs/           content editing guide; content-review.md (private, git-ignored)
```

Editing content: see [`docs/content-editing.md`](docs/content-editing.md).

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://shahwaiz.me` | Canonical URLs, sitemap, OG |
| `SITE_INDEXING` | unset | Set `true` to allow indexing outside Vercel |
| `VERCEL_ENV` | set by Vercel | Only `production` is indexable; previews get `noindex` |

## Deploying

Live at **https://shahwaiz.me** (Vercel project `shahwaiz-portfolio`, connected to this GitHub repo).

**Every push to `main` deploys to production automatically.** Pushes to other branches create protected preview deployments. Run the checks before pushing:

```bash
npm run check
git push
SMOKE_URL=https://shahwaiz.me npm run smoke   # after the deploy finishes
```

Manual deploys still work if needed:

```bash
npm run check
npx vercel@latest deploy          # preview (behind Vercel login)
npx vercel@latest deploy --prod   # production
SMOKE_URL=https://shahwaiz.me npm run smoke
```

### First-time setup (already done)

Recommended: Vercel, which runs `next build` with zero config.

1. Push this repo to GitHub. Keep `docs/content-review.md` out; it's git-ignored.
2. Import it in Vercel (framework preset: Next.js). Set `NEXT_PUBLIC_SITE_URL=https://shahwaiz.me` for Production.
3. In Vercel → Domains, add `shahwaiz.me` and `www.shahwaiz.me`, then set the DNS records Vercel shows you at your registrar. Choose one canonical host (apex recommended) and redirect the other.
4. After DNS resolves, check `https://shahwaiz.me/robots.txt` allows crawling, and that `/sitemap.xml` lists the routes.
5. Run `SMOKE_URL=https://shahwaiz.me npm run smoke`.

Security headers are set in `next.config.ts`. A Content-Security-Policy is not set yet: Next's inline scripts need a nonce-based CSP, which forces dynamic rendering. Add one if you move to dynamic rendering.
