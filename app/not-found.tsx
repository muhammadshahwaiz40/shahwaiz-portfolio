import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="surface-dark">
      <div className="wrap py-24 md:py-36">
        <svg width="220" height="60" viewBox="0 0 220 60" aria-hidden="true" focusable="false" className="overflow-visible">
          <path
            className="ink-path ink-draw"
            pathLength={1}
            d="M4 44c30-30 60-36 84-18 18 14 30 12 44-4 16-18 40-18 58 4"
            stroke="#8ea6ff"
            strokeWidth="2.2"
          />
          <circle cx="196" cy="30" r="3.5" fill="#8ea6ff" />
        </svg>
        <p className="eyebrow mt-8">404</p>
        <h1 id="nf-title" className="display mt-4 max-w-3xl">
          This line <span className="serif-em">leads nowhere</span>.
        </h1>
        <p className="lede muted mt-6">The page you asked for doesn&apos;t exist, or it has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/work" className="btn btn-ghost">
            See all work
          </Link>
        </div>
      </div>
    </section>
  );
}
