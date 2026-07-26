import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PenSquare, Bookmark, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Avatar from '../common/Avatar';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <header
      className={
        'sticky top-0 z-40 border-b bg-[color:var(--color-paper)]/90 backdrop-blur-md transition-shadow duration-300 ' +
        (scrolled ? 'border-[color:var(--color-paper-line)] shadow-[0_6px_24px_-16px_rgba(22,21,31,0.3)]' : 'border-transparent')
      }
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
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
            className="w-full rounded-full border border-[color:var(--color-paper-line)] bg-[color:var(--color-surface)]/70 py-2 pl-9 pr-4 text-sm outline-none transition-all duration-200 focus:border-[color:var(--color-teal)] focus:bg-[color:var(--color-surface)] focus:shadow-[0_0_0_4px_rgba(14,92,86,0.1)]"
          />
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link to="/category" className="nav-link rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)]">
            Categories
          </Link>
          <Link to="/trending" className="nav-link rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)]">
            Trending
          </Link>

          <button
            onClick={toggleTheme}
            className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/write"
                className="btn-press ml-1 flex items-center gap-1.5 rounded-full bg-[color:var(--color-ink)] px-4 py-2 text-sm font-medium text-[color:var(--color-paper)] shadow-sm hover:bg-[color:var(--color-ink-soft)] hover:shadow-md"
              >
                <PenSquare className="h-4 w-4" /> Write
              </Link>
              <Link to="/bookmarks" className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]" title="Bookmarks">
                <Bookmark className="h-5 w-5" />
              </Link>
              <Link to="/profile" className="btn-press ml-1 transition-transform hover:scale-105">
                <Avatar src={user?.profilepic} username={user?.username} size="sm" />
              </Link>
              <button
                onClick={handleLogout}
                className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
                title="Sign out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">
                Sign in
              </Link>
              <Link
                to="/register"
                className="btn-press ml-1 rounded-full bg-[color:var(--color-gold)] px-4 py-2 text-sm font-medium text-[color:var(--color-ink)] shadow-sm hover:bg-[color:var(--color-gold-dark)] hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(201,150,44,0.6)]"
              >
                Get started
              </Link>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button
            onClick={toggleTheme}
            className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="animate-fade-up border-t border-[color:var(--color-paper-line)] px-5 py-4 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search stories, writers…"
              className="w-full rounded-full border border-[color:var(--color-paper-line)] bg-[color:var(--color-surface)]/70 py-2 pl-9 pr-4 text-sm outline-none"
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
