import Link from "next/link";

const nodes = [
  {
    label: "Evidence",
    text: "Show what was checked, what contradicts it, and what couldn't be verified.",
    project: "NextAct",
    href: "/work/nextact",
  },
  {
    label: "Grounding",
    text: "Hold model output to a schema or to retrieved sources, and fall back in the open when that fails.",
    project: "EmoSense AI",
    href: "/work/emosense-ai",
  },
  {
    label: "Human approval",
    text: "Draft, don't send. A person approves every outgoing reply.",
    project: "ClientDesk",
    href: "/work#clientdesk",
  },
  {
    label: "Validation",
    text: "Evaluate and audit the data before any model reaches a user.",
    project: "Menzync",
    href: "/work/menzync",
  },
] as const;

// Server-rendered and fully usable without JavaScript.
// The opening pen stroke draws once on load; reduced motion shows it complete.
export function SystemAtlas() {
  return (
    <figure className="relative" aria-labelledby="atlas-caption">
      <svg
        width="260"
        height="74"
        viewBox="0 0 260 74"
        className="block overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="ink-path ink-draw"
          pathLength={1}
          d="M250 14c-38-10-92-8-118 6-22 12-10 30 8 24 20-7 12-34-26-34C70 10 20 24 11 46c-1 3-1 9-1 28"
          stroke="#8ea6ff"
          strokeWidth="2.2"
        />
      </svg>

      <div className="relative">
        <span
          aria-hidden="true"
          className="atlas-spine absolute top-0 bottom-6 left-[9.5px] w-px bg-gradient-to-b from-[#8ea6ff] via-[rgb(142_166_255/0.45)] to-transparent"
        />
        <ol className="relative grid gap-3 pl-10" aria-label="How my projects handle uncertainty">
          {nodes.map((n) => (
            <li key={n.label}>
              <Link href={n.href} className="atlas-node" data-spotlight>
                <span className="atlas-dot" aria-hidden="true" />
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold tracking-tight">{n.label}</span>
                  <span className="text-[0.8rem] text-[var(--accent-on-dark)]">
                    {n.project} <span aria-hidden="true" className="arrow">→</span>
                  </span>
                </span>
                <span className="muted mt-1 block text-[0.92rem] leading-snug">{n.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="atlas-caption" className="muted mt-4 pl-10 text-[0.8rem]">
        A conceptual map of four ideas that run through my projects.
      </figcaption>
    </figure>
  );
}
