"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Screen } from "@/content/projects";

// Browser-framed product screenshots with an accessible tab switcher.
// The first screen is server-rendered and visible without JavaScript.
export function ProductShowcase({ screens, mobile, url }: { screens: Screen[]; mobile?: Screen; url: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const current = screens[active];

  const go = (i: number) => {
    const next = (i + screens.length) % screens.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") go(i + 1);
    else if (e.key === "ArrowLeft") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(screens.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="showcase relative">
      <div className="showcase-frame" data-spotlight>
        <div className="showcase-bar" aria-hidden="true">
          <span className="showcase-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="showcase-url">{url.replace(/^https?:\/\//, "")}</span>
        </div>
        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${current.id}`}
          className="relative aspect-[16/10] overflow-hidden bg-[#0b1020]"
        >
          {screens.map((s, i) => (
            <Image
              key={s.id}
              src={s.src}
              width={s.width}
              height={s.height}
              alt={i === active ? s.alt : ""}
              aria-hidden={i === active ? undefined : true}
              sizes="(min-width: 1024px) 640px, 94vw"
              priority={false}
              className={`showcase-img ${i === active ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      {mobile && (
        <div className="showcase-phone" aria-hidden="true">
          <Image src={mobile.src} width={mobile.width} height={mobile.height} alt="" sizes="150px" />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="NextAct screens" className="tablist">
          {screens.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${base}-tab-${s.id}`}
              role="tab"
              type="button"
              className="tab"
              aria-selected={active === i}
              aria-controls={`${base}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="muted mt-3 text-sm" aria-live="polite">
        {current.caption}
      </figcaption>
    </figure>
  );
}
