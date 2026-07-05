import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[color:var(--color-paper-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 4C32 4 12 30 12 42C12 53.0457 20.9543 62 32 62C43.0457 62 52 53.0457 52 42C52 30 32 4 32 4Z" fill="var(--color-ink)" />
          </svg>
          <span className="font-display text-[color:var(--color-ink)]">InkSphere</span>
          <span>&middot; every idea deserves a page.</span>
        </div>
        <div className="flex gap-5">
          <Link to="/category" className="hover:text-[color:var(--color-ink)]">Categories</Link>
          <Link to="/trending" className="hover:text-[color:var(--color-ink)]">Trending</Link>
          <Link to="/write" className="hover:text-[color:var(--color-ink)]">Write</Link>
        </div>
      </div>
    </footer>
  );
}
