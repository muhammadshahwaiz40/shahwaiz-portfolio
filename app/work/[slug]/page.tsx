import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudySlugs, getProject, projects } from "@/content/projects";
import { BulletList, ProjectLinks, Stack, StageBadges } from "@/components/project-bits";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p?.caseStudy) return {};
  return {
    title: `${p.name} case study`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.name}: ${p.tagline}`, description: p.summary, url: `/work/${p.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;

  const featured = projects.filter((x) => x.caseStudy);
  const idx = featured.findIndex((x) => x.slug === p.slug);
  const next = featured[(idx + 1) % featured.length];

  return (
    <article aria-labelledby="cs-title">
      <header className="surface-dark">
        <div className="wrap pt-12 pb-16 md:pt-16 md:pb-24">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="muted flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/work" className="link">
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[var(--text-light)]">
                {p.name}
              </li>
            </ol>
          </nav>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <StageBadges project={p} />
              <h1 id="cs-title" className="display mt-6">
                {p.name}
              </h1>
              <p className="serif-em mt-3 text-[clamp(1.5rem,3vw,2.2rem)] leading-snug text-[var(--accent-on-dark)]">
                {p.tagline}
              </p>
              <p className="lede muted mt-6">{p.summary}</p>
            </div>
            <aside aria-label="Project facts" className="lg:col-span-4 lg:pt-14">
              <dl className="grid gap-5 text-[0.95rem]">
                <div className="rule-t pt-4">
                  <dt className="muted text-sm">Stack</dt>
                  <dd className="mt-2">
                    <Stack items={p.stack} />
                  </dd>
                </div>
                {p.links.length > 0 && (
                  <div className="rule-t pt-4">
                    <dt className="muted text-sm">Links</dt>
                    <dd className="mt-2 grid gap-1.5">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} className="link link-accent font-semibold" rel="noopener">
                          {l.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </div>
      </header>

      <div className="surface-paper">
        <div className="wrap grid gap-x-8 gap-y-16 py-16 md:py-24 lg:grid-cols-12">
          <section aria-labelledby="stage" className="lg:col-span-4">
            <h2 id="stage" className="eyebrow">
              Scope &amp; stage
            </h2>
            <p className="mt-4 text-[1.05rem]">{cs.stageNote}</p>
          </section>
          <section aria-labelledby="role" className="lg:col-span-7 lg:col-start-6">
            <h2 id="role" className="h3">
              My role
            </h2>
            <div className="mt-5 measure">
              <BulletList items={cs.role} />
            </div>
          </section>

          <section aria-labelledby="arch" className="lg:col-span-12">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id="arch" className="h3">
                  Architecture
                </h2>
                <p className="muted mt-4">{cs.architectureIntro}</p>
                <p className="muted mt-4 text-sm">Conceptual flow, simplified from the codebase.</p>
              </div>
              <ol className="flow lg:col-span-7 lg:col-start-6">
                {cs.architecture.map((a) => (
                  <li key={a.label}>
                    <div>
                      <p className="font-semibold">{a.label}</p>
                      <p className="muted mt-0.5 text-[0.95rem]">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {cs.sections.map((s, i) => (
            <section
              key={s.heading}
              aria-labelledby={`s-${i}`}
              className="rule-t grid gap-6 pt-10 lg:col-span-12 lg:grid-cols-12 lg:gap-8"
            >
              <h2 id={`s-${i}`} className="h3 lg:col-span-4">
                {s.heading}
              </h2>
              <div className="measure lg:col-span-7 lg:col-start-6">
                {s.body?.map((b) => (
                  <p key={b} className="mb-4">
                    {b}
                  </p>
                ))}
                {s.points && <BulletList items={s.points} />}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="surface-dark">
        <div className="wrap flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Next case study</p>
            <Link href={`/work/${next.slug}`} className="h2 mt-3 block no-underline hover:underline">
              {next.name} <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>
          <ProjectLinks project={p} withCaseStudy={false} />
        </div>
      </footer>
    </article>
  );
}
