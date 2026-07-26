import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Rss, Globe, Send } from 'lucide-react';
import { CATEGORIES } from '../../utils/categories';

const CONNECT_LINKS = [
  { label: 'RSS Feed', href: '/rss.xml', icon: Rss },
  { label: 'Newsletter', href: 'mailto:hello@inksphere.com?subject=Newsletter%20signup', icon: Send },
  { label: 'Website', href: 'https://inksphere.example.com', icon: Globe },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[color:var(--color-paper-line)] bg-[color:var(--color-paper-dim)]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="group flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-6">
                <path
                  d="M32 4C32 4 12 30 12 42C12 53.0457 20.9543 62 32 62C43.0457 62 52 53.0457 52 42C52 30 32 4 32 4Z"
                  fill="var(--color-ink)"
                />
                <path d="M24 44C24 38 27 33 32 30" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="font-display text-lg font-semibold text-[color:var(--color-ink)]">InkSphere</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--color-muted)]">
              A quiet corner of the internet for essays, field notes and long-form thinking — written by
              people, read by people.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {CONNECT_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  title={label}
                  className="btn-press rounded-full border border-[color:var(--color-paper-line)] p-2 text-[color:var(--color-ink-soft)] hover:border-[color:var(--color-teal)] hover:text-[color:var(--color-teal)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li><Link to="/category" className="text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">Categories</Link></li>
              <li><Link to="/trending" className="text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">Trending</Link></li>
              <li><Link to="/write" className="text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">Write a story</Link></li>
              <li><Link to="/bookmarks" className="text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">Bookmarks</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">Categories</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link to={`/category/${cat.value}`} className="flex items-center gap-2 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">Get in touch</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href="mailto:hello@inksphere.com" className="flex items-center gap-2.5 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">
                  <Mail className="h-4 w-4 shrink-0 text-[color:var(--color-muted)]" />
                  hello@inksphere.com
                </a>
              </li>
              <li>
                <a href="tel:+9537901205" className="flex items-center gap-2.5 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">
                  <Phone className="h-4 w-4 shrink-0 text-[color:var(--color-muted)]" />
                  +91 9537901205
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[color:var(--color-muted)]">
                <MapPin className="h-4 w-4 shrink-0" />
                Remote-first &middot; worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--color-paper-line)] pt-6 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} InkSphere. All rights reserved.</p>
          <div className="flex gap-5">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
