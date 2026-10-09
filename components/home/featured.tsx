import Link from "next/link";
import { getProject, type Project } from "@/content/projects";
import { ProjectViews, type View } from "@/components/project-views";
import { BulletList, ProjectLinks, Stack, StageBadges } from "@/components/project-bits";

function viewsFor(p: Project): View[] {
  const views: View[] = [];
  if (p.contribution?.length) views.push({ id: "contribution", label: "Contribution", content: <BulletList items={p.contribution} /> });
  if (p.architecture?.length) views.push({ id: "architecture", label: "Architecture", content: <BulletList items={p.architecture} /> });
  if (p.evidence?.length)
    views.push({
      id: "evidence",
      label: "Evidence",
      content: (
        <ul className="prose-list">
          {p.evidence.map((e) =>
            e.href ? (
              <li key={e.text}>
                <a className="link link-accent" href={e.href} rel="noopener">
                  {e.text}
                </a>
              </li>
            ) : (
              <li key={e.text}>{e.text}</li>
            ),
          )}
        </ul>
      ),
    });
  return views;
}

function Header({ p, index }: { p: Project; index: string }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <span className="idx serif-em text-2xl leading-none">{index}</span>
        <StageBadges project={p} />
      </div>
      <h3 id={`${p.slug}-title`} className="h2 mt-5">
        {p.name}
      </h3>
      <p className="serif-em mt-2 text-[1.45rem] leading-snug">{p.tagline}</p>
      <p className="muted mt-5 measure">{p.summary}</p>
    </>
  );
}

/* NextAct: paper spread, the decision chain as the visual. */
function NextActFeature({ p }: { p: Project }) {
  const chain = ["Claims", "Evidence", "Contradictions", "Unknowns", "Risk", "Safest next step"];
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="surface-paper section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Header p={p} index="01" />
          <div className="mt-6">
            <Stack items={p.stack} />
          </div>
          <div className="mt-8">
            <ProjectLinks project={p} />
          </div>
        </div>
        <div className="lg:col-span-6 lg:pl-6">
          <figure className="rounded-2xl border border-[var(--rule-paper)] bg-[var(--paper-2)] p-6 sm:p-8">
            <figcaption className="eyebrow">What a result contains</figcaption>
            <ol className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {chain.map((c, i) => (
                <li
                  key={c}
                  className={`rounded-lg border px-3 py-3 text-[0.92rem] font-semibold leading-tight ${
                    i === chain.length - 1
                      ? "border-[var(--accent-on-paper)] bg-[var(--accent-on-paper)] text-white"
                      : "border-[var(--rule-paper)] bg-[var(--paper)]"
                  }`}
                >
                  <span className="serif-em mr-1.5 font-normal opacity-70">{i + 1}</span>
                  {c}
                </li>
              ))}
            </ol>
            <p className="muted mt-5 text-sm">
              A result never says &ldquo;safe&rdquo;. The strongest one says no material risk was observed, and shows
              which facts were verified.
            </p>
          </figure>
          <div className="mt-10">
            <ProjectViews views={viewsFor(p)} label={`${p.name} details`} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* Menzync: dark raised spread, two separate tracks. */
function MenzyncFeature({ p }: { p: Project }) {
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="surface-raised section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-6 lg:pr-6">
          <figure className="rounded-2xl border border-[var(--rule-dark)] p-6 sm:p-8">
            <figcaption className="eyebrow">Two tracks, kept apart on purpose</figcaption>
            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
              <div className="rounded-xl bg-[var(--graphite)] p-5">
                <p className="font-semibold">Research</p>
                <ul className="muted mt-3 grid gap-1.5 text-[0.92rem]">
                  <li>Roman Urdu / English text classifiers</li>
                  <li>Facial-expression experiments</li>
                  <li>Fusion design with abstention</li>
                  <li>Evaluation and data audits</li>
                </ul>
              </div>
              <div className="flex items-center justify-center" aria-hidden="true">
                <svg width="56" height="24" viewBox="0 0 56 24" className="rotate-90 sm:rotate-0">
                  <path d="M2 12h52" stroke="#8ea6ff" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
                </svg>
              </div>
              <div className="rounded-xl bg-[var(--graphite)] p-5">
                <p className="font-semibold">Student prototype</p>
                <ul className="muted mt-3 grid gap-1.5 text-[0.92rem]">
                  <li>Check-ins in English or Roman Urdu</li>
                  <li>Nothing saved by default</li>
                  <li>Consent-gated history</li>
                  <li>Export and delete</li>
                </ul>
              </div>
            </div>
            <p className="muted mt-5 text-sm">
              The dashed line is deliberate: no model is connected to the prototype until it has been evaluated.
            </p>
          </figure>
          <div className="mt-10">
            <ProjectViews views={viewsFor(p)} label={`${p.name} details`} />
          </div>
        </div>
        <div className="order-1 lg:sticky lg:top-24 lg:order-2 lg:col-span-6 lg:self-start">
          <Header p={p} index="02" />
          <p className="mt-5 text-sm">
            <span className="text-[var(--accent-on-dark)]">Finalist, National Idea Bank IV 2026</span>
            <span className="muted"> · Co-founder &amp; FYP developer</span>
          </p>
          <div className="mt-6">
            <Stack items={p.stack} />
          </div>
          <div className="mt-8">
            <ProjectLinks project={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* EmoSense: paper, an endpoint table as the visual. */
function EmoSenseFeature({ p }: { p: Project }) {
  const endpoints = [
    { path: "/api/analyze", does: "Emotion, sentiment, urgency, risk flags" },
    { path: "/api/simulate-response", does: "Reviews a drafted reply against the original" },
    { path: "/api/persona-chat", does: "Practice conversation with a persona" },
  ];
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="surface-paper section rule-t">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Header p={p} index="03" />
          <div className="mt-6">
            <Stack items={p.stack} />
          </div>
          <div className="mt-8">
            <ProjectLinks project={p} />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <figure>
            <figcaption className="eyebrow">Every route follows the same path</figcaption>
            <ol className="mt-5 flex flex-wrap items-center gap-2 text-[0.92rem] font-semibold">
              {["Validate input", "Call Gemini with a schema", "Or return a labelled fallback"].map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-[var(--accent-on-paper)]">
                      →
                    </span>
                  )}
                  <span className="rounded-full border border-[var(--rule-paper)] px-3 py-1.5">{s}</span>
                </li>
              ))}
            </ol>
            <dl className="mt-8 grid text-[0.92rem]">
              {endpoints.map((e) => (
                <div key={e.path} className="rule-t grid gap-1 py-3 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-4">
                  <dt className="whitespace-nowrap">
                    <span className="mr-2 rounded bg-[var(--text-dark)] px-1.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-[var(--paper)]">
                      POST
                    </span>
                    <code className="font-mono text-[0.85rem]">{e.path}</code>
                  </dt>
                  <dd className="muted">{e.does}</dd>
                </div>
              ))}
            </dl>
          </figure>
          <div className="mt-10">
            <ProjectViews views={viewsFor(p)} label={`${p.name} details`} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeaturedWork() {
  const nextact = getProject("nextact")!;
  const menzync = getProject("menzync")!;
  const emosense = getProject("emosense-ai")!;
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="surface-paper">
        <div className="wrap rule-b flex flex-wrap items-end justify-between gap-6 pt-20 pb-10 md:pt-28">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title" className="h2 mt-4 max-w-2xl">
              Three projects, three ways of handling <span className="serif-em">uncertainty</span>.
            </h2>
          </div>
          <Link href="/work" className="link link-accent font-semibold">
            All projects <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>
      </div>
      <NextActFeature p={nextact} />
      <MenzyncFeature p={menzync} />
      <EmoSenseFeature p={emosense} />
    </section>
  );
}
