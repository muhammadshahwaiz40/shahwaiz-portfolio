"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Screen } from "@/content/projects";

const INTERVAL_MS = 3000;

// Browser-framed product screenshots that advance every 3 seconds, continuously (owner's choice:
// no pause control). Choosing a tab jumps to that screen and the cycle continues from there.
// The timer only idles while the showcase is offscreen or the browser tab is hidden, which
// nobody can see. The first screen is server-rendered and readable without JavaScript.
export function ProductShowcase({ screens, mobile, url }: { screens: Screen[]; mobile?: Screen; url: string }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const current = screens[active];
  const running = visible && !pageHidden;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    const onVis = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % screens.length), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [running, active, screens.length]);

  const choose = (i: number, focus = false) => {
    const next = (i + screens.length) % screens.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") choose(i + 1, true);
    else if (e.key === "ArrowLeft") choose(i - 1, true);
    else if (e.key === "Home") choose(0, true);
    else if (e.key === "End") choose(screens.length - 1, true);
    else return;
    e.preventDefault();
  };

  return (
    <figure
      ref={root}
      className="showcase relative"
      aria-roledescription="carousel"
      aria-label="NextAct product screens"
    >
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

      <div className="mt-5 flex flex-wrap items-center gap-3">
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
              className="tab showcase-tab"
              aria-selected={active === i}
              aria-controls={`${base}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {s.label}
              {active === i && (
                <span
                  key={`${active}-${s.id}`}
                  className="tab-progress"
                  aria-hidden="true"
                  style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="muted mt-3 text-sm">
        {current.caption}
      </figcaption>
    </figure>
  );
}
