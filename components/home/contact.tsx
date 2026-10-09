import { profile } from "@/content/profile";
import { CopyEmail } from "@/components/copy-email";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="surface-paper section">
      <div className="wrap">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="reveal display mt-5 max-w-4xl">
          Building something that needs to be <span className="serif-em">right</span>? Let&apos;s talk.
        </h2>
        <p className="lede muted mt-6">
          For roles, collaborations or questions about any project here, email is the quickest way to reach me.
        </p>
        <p className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="link text-[clamp(1.35rem,4.2vw,2.6rem)] font-semibold tracking-tight [overflow-wrap:anywhere]"
          >
            {profile.email}
          </a>
        </p>
        <div className="mt-6">
          <CopyEmail email={profile.email} />
        </div>
        <ul className="rule-t mt-12 flex flex-wrap gap-x-10 gap-y-4 pt-6 text-[0.95rem]">
          <li>
            <a className="link font-semibold" href={profile.github} rel="me noopener">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="link font-semibold" href={profile.linkedin} rel="me noopener">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          {profile.showPhone && (
            <li>
              <a className="link font-semibold" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                {profile.phone}
              </a>
            </li>
          )}
          {profile.cvPath && (
            <li>
              <a className="link font-semibold" href={profile.cvPath} download>
                Download CV (PDF)
              </a>
            </li>
          )}
          <li className="muted">
            {profile.location} · {profile.timeZone}
          </li>
        </ul>
      </div>
    </section>
  );
}
