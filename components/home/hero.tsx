import Link from "next/link";
import { profile } from "@/content/profile";
import { SystemAtlas } from "@/components/system-atlas";
import { LocalTime } from "@/components/fx";

// Verifiable facts only. Each links to where it can be checked.
const proof = [
  { value: "Live", label: "NextAct in production", href: "https://nextact.tech", external: true },
  { value: "3rd", label: "National prompt engineering, APPEC 2026", href: "#experience" },
  { value: "1 of 24", label: "Startups selected, NIB IV pre-incubation", href: "#experience" },
  { value: "Open", label: "Source on GitHub", href: profile.github, external: true },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface-dark hero relative overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap relative grid gap-14 pt-12 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="now-chip fade-in">
            <span className="now-dot" aria-hidden="true" />
            <span>
              <span className="sr-only">Currently: </span>Founder, Menzync · AI Intern, FlyRank
            </span>
          </p>
          <p className="eyebrow mt-8">
            {profile.name} <span aria-hidden="true">·</span> {profile.positioning}
          </p>
          <h1 id="hero-title" className="display mt-5">
            AI systems. <span className="serif-em text-[var(--accent-on-dark)]">Clear evidence.</span> Human judgment.
          </h1>
          <p className="lede muted mt-7">{profile.shortBio}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#work" className="btn btn-primary">
              View selected work <span aria-hidden="true" className="arrow">→</span>
            </Link>
            <Link href="#contact" className="btn btn-ghost">
              Let&apos;s talk
            </Link>
          </div>
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 border-t border-[var(--rule-dark)] pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="muted">Based in</dt>
              <dd className="mt-0.5 font-medium">Sialkot, Pakistan</dd>
            </div>
            <div>
              <dt className="muted">Local time</dt>
              <dd className="mt-0.5 font-medium tabular-nums">
                <LocalTime />
              </dd>
            </div>
            <div>
              <dt className="muted">Currently</dt>
              <dd className="mt-0.5 font-medium">Final year, BS SE at UMT</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-5 lg:pt-2">
          <SystemAtlas />
        </div>
      </div>

      <div className="wrap relative pb-14 lg:pb-16">
        <ul className="proof" aria-label="Verifiable highlights">
          {proof.map((p) => (
            <li key={p.label}>
              <a href={p.href} rel={p.external ? "noopener" : undefined} className="proof-item" data-spotlight>
                <span className="proof-value">{p.value}</span>
                <span className="proof-label">
                  {p.label}
                  {p.external && <span aria-hidden="true"> ↗</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
