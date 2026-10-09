"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Screen } from "@/content/projects";

// Screenshot grid. Each tile is a link to the full image (works without JS);
// with JS it opens in a native <dialog> instead.
export function ScreenGallery({ screens }: { screens: Screen[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Screen | null>(null);

  const show = (s: Screen) => {
    setOpen(s);
    dialog.current?.showModal();
  };

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {screens.map((s, i) => (
          <li key={s.id} className={i === 0 ? "md:col-span-2" : ""}>
            <figure>
              <a
                href={s.src}
                className="gallery-tile block"
                data-spotlight
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                  e.preventDefault();
                  show(s);
                }}
              >
                <Image
                  src={s.src}
                  width={s.width}
                  height={s.height}
                  alt={s.alt}
                  sizes={i === 0 ? "(min-width: 1024px) 1100px, 94vw" : "(min-width: 768px) 46vw, 94vw"}
                  className="h-auto w-full"
                />
                <span className="sr-only">Open full size</span>
              </a>
              <figcaption className="muted mt-3 text-sm">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={open ? `${open.label} screenshot` : "Screenshot"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        {open && (
          <figure className="m-0">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">{open.label}</p>
              <button type="button" className="btn btn-ghost min-h-10 px-4 py-1.5" onClick={() => dialog.current?.close()} autoFocus>
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>
            <Image
              src={open.src}
              width={open.width}
              height={open.height}
              alt={open.alt}
              sizes="94vw"
              className="mx-auto h-auto max-h-[76vh] w-auto max-w-full rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-sm text-[var(--text-light-muted)]">{open.caption}</figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
