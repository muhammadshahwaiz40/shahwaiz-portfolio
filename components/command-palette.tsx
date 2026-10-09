"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

export type Command = { id: string; label: string; group: string; hint?: string; href?: string; action?: "copy-email" };

// ⌘K / Ctrl+K command menu built on a native <dialog> (focus handling and Escape come for free).
export function CommandPalette({ commands, email }: { commands: Command[]; email: string }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    setNote("");
    dialog.current?.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);
  const close = () => dialog.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    const onOpen = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [open]);

  const run = async (c: Command) => {
    if (c.action === "copy-email") {
      try {
        await navigator.clipboard.writeText(email);
        setNote("Email address copied.");
      } catch {
        setNote(`Couldn't copy. The address is ${email}`);
      }
      return;
    }
    if (!c.href) return;
    close();
    if (/^https?:|^mailto:/.test(c.href) || c.href.endsWith(".pdf")) window.open(c.href, c.href.startsWith("mailto:") ? "_self" : "_blank", "noopener");
    else router.push(c.href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
    else if (e.key === "Enter" && results[active]) run(results[active]);
    else return;
    e.preventDefault();
  };

  return (
    <dialog
      ref={dialog}
      className="palette"
      aria-label="Command menu"
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <div className="flex items-center gap-3 border-b border-[var(--rule-dark)] px-4">
        <span aria-hidden="true" className="muted">
          ⌕
        </span>
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Jump to a page, project or link…"
          className="h-14 w-full bg-transparent text-[1rem] outline-none placeholder:text-[var(--text-light-muted)]"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-label="Search commands"
        />
        <kbd className="kbd">Esc</kbd>
      </div>
      <ul id={listId} role="listbox" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2" aria-label="Commands">
        {results.length === 0 && <li className="muted px-3 py-6 text-center text-sm">No matches.</li>}
        {results.map((c, i) => {
          const header = i === 0 || results[i - 1].group !== c.group ? c.group : null;
          return (
            <li key={c.id} role="presentation">
              {header && (
                <p className="muted px-3 pt-3 pb-1 text-[0.72rem] font-semibold tracking-[0.12em] uppercase" aria-hidden="true">
                  {header}
                </p>
              )}
              <div
                id={`${listId}-${c.id}`}
                role="option"
                aria-selected={i === active}
                className="palette-item"
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
              >
                <span>{c.label}</span>
                {c.hint && <span className="muted text-xs">{c.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <p role="status" aria-live="polite" className="muted px-4 pb-3 text-xs">
        {note}
      </p>
    </dialog>
  );
}

export function CommandButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className="hidden min-h-9 items-center gap-2 rounded-full border border-[var(--rule-dark)] px-3 text-[0.82rem] text-[var(--text-light-muted)] transition-colors hover:text-[var(--text-light)] md:inline-flex"
      aria-label="Open command menu (Ctrl+K)"
    >
      Search <kbd className="kbd">Ctrl K</kbd>
    </button>
  );
}
