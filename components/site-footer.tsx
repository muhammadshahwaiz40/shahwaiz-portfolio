import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="surface-dark border-t border-[var(--rule-dark)]">
      <div className="wrap flex flex-col gap-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="muted">
          {profile.name} · {profile.location} · {profile.timeZone}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="link" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link" href={profile.github} rel="me noopener">
              GitHub
            </a>
          </li>
          <li>
            <a className="link" href={profile.linkedin} rel="me noopener">
              LinkedIn
            </a>
          </li>
          <li>
            <Link className="link" href="/work">
              All work
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
