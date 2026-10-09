import { profile } from "@/content/profile";

// Canonical origin. Override with NEXT_PUBLIC_SITE_URL once the domain is confirmed.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shahwaiz.me").replace(/\/$/, "");

// Indexing is opt-in: on Vercel only the production deployment is indexable;
// elsewhere set SITE_INDEXING=true. Previews and local builds stay noindex.
export const indexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.SITE_INDEXING === "true";

export const siteTitle = `${profile.name} — ${profile.positioning}`;
export const siteDescription =
  "Final-year Software Engineering student and Menzync founder building Python and TypeScript backends, AI integrations and automated tests.";

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
] as const;
