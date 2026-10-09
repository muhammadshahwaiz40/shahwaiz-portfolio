import Image from "next/image";
import { beyondCode, coursework, education, profile, semesterGpa } from "@/content/profile";
import { Monogram } from "@/components/monogram";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="surface-dark section">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          {profile.headshotPath ? (
            <Image
              src={profile.headshotPath}
              alt={`Portrait of ${profile.name}`}
              width={480}
              height={600}
              className="h-auto w-full max-w-xs rounded-2xl"
            />
          ) : (
            <div className="flex w-full max-w-xs flex-col justify-between gap-10 sm:aspect-[4/5] rounded-2xl border border-[var(--rule-dark)] bg-[var(--raised)] p-7">
              <Monogram className="h-14 w-14" />
              <div>
                <p className="serif-em text-[2.6rem] leading-[1.05]">Muhammad Shahwaiz</p>
                <p className="muted mt-3 text-sm">Daska · Sialkot · Pakistan</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="h2 mt-4">
            From transcripts to <span className="serif-em">systems</span>.
          </h2>
          <div className="mt-8 grid gap-5 text-[1.05rem] measure">
            {profile.longBio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {profile.showAiAssistedNote && <p className="muted">{profile.aiAssistedNote}</p>}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase">Education</h3>
              <ol className="mt-4">
                {education.map((e) => (
                  <li key={e.title} className="rule-t py-4">
                    <p className="font-semibold">{e.title}</p>
                    <p className="muted text-[0.95rem]">{e.place}</p>
                    <p className="muted text-sm">
                      {e.period} · {e.note}
                    </p>
                  </li>
                ))}
              </ol>
              {semesterGpa.show && (
                <p className="muted mt-3 text-sm">
                  Semester GPA: {semesterGpa.entries.map((g) => `${g.gpa} (${g.term})`).join(", ")}
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase">Selected coursework</h3>
              <ul className="chips mt-5">
                {coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <h3 className="mt-10 text-sm font-semibold tracking-wide uppercase">Core tools</h3>
              <p className="muted mt-3 text-[0.95rem]">
                Python and TypeScript APIs (FastAPI, Express, Next.js route handlers), LLM integration, PostgreSQL and
                SQLite, pytest and Vitest, Docker.
              </p>
              <p className="muted mt-3 text-[0.95rem]">
                In projects I&apos;ve also used Celery and Redis, SQLAlchemy and Alembic, Prisma and Drizzle, Qdrant and
                FAISS, React and Tailwind. Coursework added deep learning, NLP, Wireshark and Android.
              </p>
              <h3 className="mt-10 text-sm font-semibold tracking-wide uppercase">Languages</h3>
              <p className="muted mt-3 text-[0.95rem]">{profile.languages.join(" · ")}</p>
            </div>
          </div>

          <div className="rule-t mt-16 pt-10">
            <h3 className="text-sm font-semibold tracking-wide uppercase">Beyond code</h3>
            <ul className="mt-6 grid gap-8 sm:grid-cols-3">
              {beyondCode.map((b) => (
                <li key={b.title}>
                  <p className="serif-em text-2xl">{b.title}</p>
                  <p className="muted mt-2 text-[0.95rem]">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
