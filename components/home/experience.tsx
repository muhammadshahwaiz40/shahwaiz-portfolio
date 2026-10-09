import Image from "next/image";
import { otherRecognition, roles, topRecognition, training } from "@/content/experience";

export function Experience() {
  const visible = roles.filter((r) => r.show);
  return (
    <section id="experience" aria-labelledby="experience-title" className="surface-paper section">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title" className="h2 mt-4">
            Where I&apos;ve <span className="serif-em">worked</span>.
          </h2>
          <ol className="mt-10">
            {visible.map((r) => (
              <li key={`${r.org}-${r.title}`} className="rule-t py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold tracking-tight">{r.title}</h3>
                  <p className="muted text-sm">{r.period}</p>
                </div>
                <p className="mt-0.5 text-[0.95rem]">
                  {r.org}
                  {r.place && <span className="muted"> · {r.place}</span>}
                </p>
                {r.points.length > 0 && <p className="muted mt-2 text-[0.95rem]">{r.points.join(" ")}</p>}
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Recognition</p>
          <h2 className="h2 mt-4">
            Competitions &amp; <span className="serif-em">programmes</span>.
          </h2>
          <ol className="mt-10 grid gap-4">
            {topRecognition.map((r) => (
              <li key={r.title} className="rounded-2xl border border-[var(--rule-paper)] bg-[var(--paper-2)] p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{r.title}</h3>
                  <span className="serif-em text-xl text-[var(--accent-on-paper)]">{r.year}</span>
                </div>
                <p className="muted mt-1.5 text-[0.95rem]">{r.detail}</p>
                {r.image && (
                  <figure className="mt-5">
                    <Image
                      src={r.image.src}
                      width={r.image.width}
                      height={r.image.height}
                      alt={r.image.alt}
                      sizes="(min-width: 1024px) 560px, 92vw"
                      className="h-auto w-full rounded-lg border border-[var(--rule-paper)]"
                    />
                    <figcaption className="muted mt-2 text-xs">{r.image.caption}</figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>

          <h3 className="mt-10 text-sm font-semibold tracking-wide uppercase">Also</h3>
          <ul className="prose-list mt-4 text-[0.95rem]">
            {otherRecognition.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>

          <details className="rule-t mt-10 pt-5">
            <summary className="flex min-h-11 items-center justify-between gap-4 font-semibold">
              Training &amp; courses ({training.length})
              <span aria-hidden="true" className="plus text-xl leading-none">
                +
              </span>
            </summary>
            <ul className="mt-4 grid gap-4">
              {training.map((t) => (
                <li key={t.title} className="text-[0.95rem]">
                  <p className="font-medium">{t.title}</p>
                  <p className="muted text-sm">
                    {t.issuer}
                    {t.date && ` · ${t.date}`}
                    {t.url && (
                      <>
                        {" · "}
                        <a className="link link-accent" href={t.url} rel="noopener">
                          Certificate record<span className="sr-only"> for {t.title}</span>
                        </a>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
