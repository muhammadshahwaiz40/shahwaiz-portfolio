// "MS" monogram: an M drawn as one stroke that hooks into an S, in the spirit of a pen line.
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11" fill="none" stroke="currentColor" strokeOpacity="0.28" />
      <path
        className="ink-path"
        d="M9 27.5V13.2l6.2 9.3 6.2-9.3v10.3c0 2.6 1.6 4 3.9 4 2.4 0 4-1.3 4-3.3 0-4.6-7.6-3.3-7.6-8 0-1.9 1.6-3.2 3.7-3.2 1.6 0 2.9.7 3.6 1.9"
        stroke="#8ea6ff"
        strokeWidth="2"
      />
    </svg>
  );
}
