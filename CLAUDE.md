@AGENTS.md

# Project notes

- Static portfolio. Content is in `content/*.ts`; components never hard-code project facts.
- Public copy follows one rule: only supported claims. Unresolved items go to `docs/content-review.md` (git-ignored, never imported).
- `cacheComponents` is intentionally off. Case studies use `generateStaticParams` + `dynamicParams = false`.
- Before finishing a change: `npm run check`, then `npm run start` + `npm run smoke`.
