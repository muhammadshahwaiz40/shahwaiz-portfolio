"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { Monogram } from "./monogram";

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const isCurrent = (href: string) => (href === "/work" ? pathname.startsWith("/work") : false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule-dark)] bg-[rgb(17_19_24/0.88)] backdrop-blur-md">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 rounded-md no-underline" aria-label={`${name}, home`}>
          <Monogram className="h-8 w-8" />
          <span className="text-[0.95rem] font-semibold tracking-tight">{name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-[var(--text-light-muted)] transition-colors hover:text-[var(--text-light)] aria-[current=page]:text-[var(--text-light)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-[var(--rule-dark)] px-4 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-[var(--rule-dark)] bg-[var(--graphite)] md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center justify-between border-b border-[var(--rule-dark)] text-lg font-medium last:border-0"
                >
                  {item.label}
                  <span aria-hidden="true" className="muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
