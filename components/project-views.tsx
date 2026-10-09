"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type View = { id: string; label: string; content: ReactNode };

// Accessible tabs. The first view is server-rendered and visible without JavaScript.
export function ProjectViews({ views, label }: { views: View[]; label: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  if (views.length === 0) return null;
  if (views.length === 1) return <div>{views[0].content}</div>;

  const focusTab = (i: number) => {
    const next = (i + views.length) % views.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") focusTab(i + 1);
    else if (e.key === "ArrowLeft") focusTab(i - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(views.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="tablist">
        {views.map((v, i) => (
          <button
            key={v.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${base}-tab-${v.id}`}
            role="tab"
            type="button"
            className="tab"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${v.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      {views.map((v, i) => (
        <div
          key={v.id}
          id={`${base}-panel-${v.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${v.id}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-5 rounded-md"
        >
          {v.content}
        </div>
      ))}
    </div>
  );
}
