# Editing the site's content

All public content lives in three typed files in `content/`. Edit them, run `npm run dev`, and check the page.

## Profile: `content/profile.ts`

| Change | Field |
|---|---|
| Headline, short bio, long bio | `headline`, `shortBio`, `longBio` |
| Menzync role | `menzyncRole`. Also update the line in `components/home/featured.tsx` (MenzyncFeature) |
| Show the phone number | `showPhone: true` |
| Add a CV | Put a public-safe PDF in `public/` (no date of birth, address or student ID), set `cvPath: "/Muhammad-Shahwaiz-CV.pdf"` |
| Add a portrait | Put an image in `public/images/`, set `headshotPath`. A 4:5 crop works best |
| AI-assisted note | `aiAssistedNote` text, `showAiAssistedNote` on/off |
| Semester GPA | `semesterGpa.show: true` |
| Education, coursework, "beyond code" | `education`, `coursework`, `beyondCode` |

## Experience and recognition: `content/experience.ts`

- **Roles:** edit `roles`. Set `show: false` to hide one without deleting it. For an ongoing role, use "– present".
- **Top recognition:** `topRecognition` (keep it to three). An entry can carry an `image` with a caption.
- **Other recognition, training:** `otherRecognition`, `training`. Set `url: null` when there's no public record.

## Projects: `content/projects.ts`

- `stages` is one or more of `live`, `prototype`, `research`, `in-progress`, `academic`. Use `live` only after checking the URL works.
- `category`: `featured` (homepage plus a case study), `product` or `academic` (on /work only).
- A project gets a `/work/<slug>` page only when it has a `caseStudy` block.
- Homepage views (Contribution / Architecture / Evidence) come from `contribution`, `architecture` and `evidence`. Leave one empty to hide that tab.
- **Swapping the third featured project** (e.g. to ClientDesk): set ClientDesk's `category: "featured"`, write its `contribution` and `caseStudy`, set EmoSense to `category: "product"`, then point `FeaturedWork` in `components/home/featured.tsx` at the new slug.

## Rules of thumb

- Every number needs context (dataset, date, artifact). If you can't give it, leave the number out.
- Don't add other people's names or photos without their permission.
- Unresolved questions go in `docs/content-review.md`, not on the page.
