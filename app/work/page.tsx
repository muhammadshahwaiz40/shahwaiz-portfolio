import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { ProjectLinks, Stack, StageBadges } from "@/components/project-bits";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies, product prototypes and coursework by Muhammad Shahwaiz.",
  alternates: { canonical: "/work" },
};

const groups: { id: Project["category"]; title: string; intro: string }[] = [
  {
    id: "featured",
    title: "Case studies",
    intro: "The three projects I can show in the most depth.",
  },
  {
    id: "product",
    title: "Product prototypes",
    intro: "Working builds that run locally. Integrations that haven't been tested against the real vendor are described as such.",
  },
  {
    id: "academic",
    title: "Coursework & competitions",
    intro: "University projects and competition entries.",
  },
];

function Entry({ p }: { p: Project }) {
  const title = p.caseStudy ? (
    <Link href={`/work/${p.slug}`} className="link">
      {p.name}
    </Link>
  ) : (
    p.name
  );
  return (
    <li id={p.slug} className="rule-t grid scroll-mt-28 gap-4 py-8 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <h3 className="h3">{title}</h3>
        <p className="serif-em mt-1 text-lg">{p.tagline}</p>
        <div className="mt-3">
          <StageBadges project={p} />
        </div>
      </div>
      <div className="md:col-span-8">
        <p className="measure">{p.summary}</p>
        {p.image && (
          <Image
            src={p.image.src}
            width={p.image.width}
            height={p.image.height}
            alt={p.image.alt}
            sizes="(min-width: 768px) 60vw, 92vw"
            className="mt-5 h-auto w-full max-w-2xl rounded-lg border border-[var(--rule-paper)]"
          />
        )}
        <div className="mt-4">
          <Stack items={p.stack} />
        </div>
        {(p.caseStudy || p.links.length > 0) && (
          <div className="mt-5">
            <ProjectLinks project={p} />
          </div>
        )}
      </div>
    </li>
  );
}

export default function WorkPage() {
  return (
    <>
      <section aria-labelledby="work-title" className="surface-dark">
        <div className="wrap pt-16 pb-14 md:pt-24 md:pb-20">
          <p className="eyebrow">Work</p>
          <h1 id="work-title" className="display mt-5 max-w-4xl">
            Everything I&apos;ve built, <span className="serif-em">labelled honestly</span>.
          </h1>
          <p className="lede muted mt-6">
            Each project carries a stage label: live, prototype, research, in progress or academic.
            {profile.showAiAssistedNote && ` ${profile.aiAssistedNote}`}
          </p>
          <nav aria-label="Project groups" className="mt-10">
            <ul className="flex flex-wrap gap-3">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#group-${g.id}`} className="btn btn-ghost">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <div className="surface-paper">
        {groups.map((g) => (
          <section key={g.id} id={`group-${g.id}`} aria-labelledby={`group-${g.id}-title`} className="wrap scroll-mt-20 pt-16 pb-6 md:pt-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id={`group-${g.id}-title`} className="h2">
                {g.title}
              </h2>
              <p className="muted max-w-md text-[0.95rem]">{g.intro}</p>
            </div>
            <ul className="mt-10">
              {projects
                .filter((p) => p.category === g.id)
                .map((p) => (
                  <Entry key={p.slug} p={p} />
                ))}
            </ul>
          </section>
        ))}
        <div className="pb-20" />
      </div>
    </>
  );
}
