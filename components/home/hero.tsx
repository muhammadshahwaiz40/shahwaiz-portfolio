import Link from "next/link";
import { profile } from "@/content/profile";
import { SystemAtlas } from "@/components/system-atlas";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="surface-dark relative overflow-hidden">
      <div className="wrap grid gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="eyebrow">
            {profile.name} <span aria-hidden="true">·</span> {profile.positioning}
          </p>
          <h1 id="hero-title" className="display mt-6">
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
              <dt className="muted">Time zone</dt>
              <dd className="mt-0.5 font-medium">{profile.timeZone}</dd>
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
    </section>
  );
}
