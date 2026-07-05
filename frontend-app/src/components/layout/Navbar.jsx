import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PenSquare, Bookmark, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-paper-line)] bg-[color:var(--color-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path
              d="M32 4C32 4 12 30 12 42C12 53.0457 20.9543 62 32 62C43.0457 62 52 53.0457 52 42C52 30 32 4 32 4Z"
              fill="var(--color-ink)"
            />
            <path d="M24 44C24 38 27 33 32 30" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight text-[color:var(--color-ink)]">InkSphere</span>
        </Link>

        <form onSubmit={handleSearch} className="relative ml-2 hidden flex-1 max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search stories, writers…"
            className="w-full rounded-full border border-[color:var(--color-paper-line)] bg-white/60 py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[color:var(--color-teal)]"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            to="/category"
            className="rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
          >
            Categories
          </Link>
          <Link
            to="/trending"
            className="rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
          >
            Trending
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/write"
                className="ml-1 flex items-center gap-1.5 rounded-sm bg-[color:var(--color-ink)] px-4 py-2 text-sm font-medium text-[color:var(--color-paper)] hover:bg-[color:var(--color-ink-soft)]"
              >
                <PenSquare className="h-4 w-4" /> Write
              </Link>
              <Link to="/bookmarks" className="rounded-sm p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]" title="Bookmarks">
                <Bookmark className="h-5 w-5" />
              </Link>
              <Link to="/profile" className="ml-1">
                <Avatar src={user?.profilepic} username={user?.username} size="sm" />
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-sm p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
                title="Sign out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]">
                Sign in
              </Link>
              <Link
                to="/register"
                className="ml-1 rounded-sm bg-[color:var(--color-gold)] px-4 py-2 text-sm font-medium text-[color:var(--color-ink)] hover:bg-[color:var(--color-gold-dark)] hover:text-white"
              >
                Get started
              </Link>
            </>
          )}
        </nav>

        <button className="ml-auto p-2 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[color:var(--color-paper-line)] px-5 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search stories, writers…"
              className="w-full rounded-full border border-[color:var(--color-paper-line)] bg-white/60 py-2 pl-9 pr-4 text-sm outline-none"
            />
          </form>
          <div className="flex flex-col gap-1">
            <Link to="/category" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
              Categories
            </Link>
            <Link to="/trending" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
              Trending
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/write" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
                  Write a story
                </Link>
                <Link to="/bookmarks" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
                  Bookmarks
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
                  Profile
                </Link>
                <button onClick={handleLogout} className="rounded-sm px-3 py-2 text-left text-sm font-medium text-[color:var(--color-crimson)] hover:bg-[color:var(--color-paper-dim)]">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
                  Sign in
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="rounded-sm px-3 py-2 text-sm font-medium hover:bg-[color:var(--color-paper-dim)]">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
