import Link from "next/link";

const items = [
  {
    title: "Evidence",
    text: "A result shows what was checked, where it came from, and what contradicts it. NextAct's results list unknowns next to findings.",
    href: "/work/nextact",
    project: "NextAct",
  },
  {
    title: "Grounding",
    text: "Model output is held to a schema or to retrieved sources. EmoSense constrains Gemini to JSON; Aidesk answers from a company's documents with citations.",
    href: "/work/emosense-ai",
    project: "EmoSense AI",
  },
  {
    title: "Human approval",
    text: "Where a mistake is costly, software drafts and a person decides. ClientDesk sends nothing a freelancer hasn't approved.",
    href: "/work#clientdesk",
    project: "ClientDesk",
  },
  {
    title: "Validation",
    text: "Tests, audits and evaluation come before claims. Menzync keeps its models out of the product until they've been measured.",
    href: "/work/menzync",
    project: "Menzync",
  },
] as const;

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="surface-dark section">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">How I work</p>
            <h2 id="approach-title" className="h2 mt-4">
              Software that is honest about <span className="serif-em">what it knows</span>.
            </h2>
          </div>
          <p className="lede muted lg:col-span-6 lg:col-start-7 lg:self-end">
            Four ideas run through most of what I build. None of them is a guarantee. Each is a specific engineering
            choice you can inspect in a real project.
          </p>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule-dark)] bg-[var(--rule-dark)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.title} className="flex flex-col bg-[var(--graphite)] p-6 sm:p-7">
              <span className="serif-em text-2xl text-[var(--accent-on-dark)]">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{it.title}</h3>
              <p className="muted mt-2 flex-1 text-[0.95rem]">{it.text}</p>
              <Link href={it.href} className="link mt-5 text-sm font-semibold">
                See it in {it.project} <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
