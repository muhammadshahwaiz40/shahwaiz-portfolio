import Link from "next/link";
import { stageLabel, type Project } from "@/content/projects";

export function StageBadges({ project }: { project: Project }) {
  if (project.stages.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Stage">
      {project.stages.map((s) => (
        <li key={s} className={`badge ${s === "live" ? "badge-live" : ""}`}>
          {stageLabel[s]}
        </li>
      ))}
    </ul>
  );
}

export function Stack({ items, label = "Technologies" }: { items: string[]; label?: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, withCaseStudy = true }: { project: Project; withCaseStudy?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {withCaseStudy && project.caseStudy && (
        <Link href={`/work/${project.slug}`} className="btn btn-primary">
          Read the case study <span aria-hidden="true" className="arrow">→</span>
          <span className="sr-only">: {project.name}</span>
        </Link>
      )}
      {project.links.map((l) => (
        <a key={l.href} href={l.href} className="btn btn-ghost" rel="noopener">
          {l.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="prose-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
