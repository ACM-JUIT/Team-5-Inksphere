import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getAllBlogs, getTrendingBlogs } from '../api/blog.api';
import { useAuth } from '../hooks/useAuth';
import BlogList from '../components/blog/BlogList';
import BlogCard from '../components/blog/BlogCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllBlogs();
        setBlogs(data.blogs || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setTrendingLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await getTrendingBlogs();
        setTrending((data.blogs || []).slice(0, 3));
      } finally {
        setTrendingLoading(false);
      }
    })();
  }, [isAuthenticated]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-paper-line)] bg-[color:var(--color-paper-dim)]">
        {/* Decorative floating accents */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-float-slow absolute -left-16 top-10 h-56 w-56 rounded-full bg-[color:var(--color-gold)]/20 blur-3xl" />
          <div className="animate-float-slower absolute -right-10 top-24 h-72 w-72 rounded-full bg-[color:var(--color-teal)]/15 blur-3xl" />
          <div className="animate-float-slow absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[color:var(--color-cat-lifestyle)]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <p className="mb-4 animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-teal)]">
              Volume I &middot; Est. 2026
            </p>
            <h1 className="animate-fade-up font-display text-4xl font-semibold leading-[1.1] text-[color:var(--color-ink)] sm:text-5xl md:text-6xl" style={{ animationDelay: '80ms' }}>
              Ideas worth
              <br />
              <span className="ink-underline">
                putting to paper
                <svg viewBox="0 0 340 24" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M4 14C60 22 260 22 336 8" pathLength="340" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-md animate-fade-up text-lg text-[color:var(--color-muted)]" style={{ animationDelay: '160ms' }}>
              InkSphere is a quiet corner of the internet for essays, field notes and long-form
              thinking — written by people, read by people.
            </p>
            <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <Button as={Link} to={isAuthenticated ? '/write' : '/register'} variant="primary" size="lg">
                {isAuthenticated ? 'Start writing' : 'Join InkSphere'} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as={Link} to="/category" variant="outline" size="lg">
                Browse categories
              </Button>
            </div>
          </div>

          <div className="hidden animate-float-slow justify-self-end md:block">
            <svg width="220" height="260" viewBox="0 0 220 260" fill="none" aria-hidden="true">
              <rect x="20" y="10" width="160" height="220" rx="4" fill="var(--color-surface)" stroke="var(--color-paper-line)" strokeWidth="2" />
              <rect x="20" y="10" width="10" height="220" fill="var(--color-cat-tech)" />
              <line x1="52" y1="50" x2="152" y2="50" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="52" y1="70" x2="164" y2="70" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="52" y1="90" x2="140" y2="90" stroke="var(--color-paper-line)" strokeWidth="2" />
              <rect x="44" y="16" width="150" height="210" rx="4" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="2" />
              <rect x="44" y="16" width="10" height="210" fill="var(--color-gold)" />
              <line x1="76" y1="56" x2="176" y2="56" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="76" y1="76" x2="188" y2="76" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="76" y1="96" x2="160" y2="96" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="76" y1="120" x2="184" y2="120" stroke="var(--color-paper-line)" strokeWidth="2" />
              <line x1="76" y1="140" x2="150" y2="140" stroke="var(--color-paper-line)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-[color:var(--color-ink)]">Trending now</h2>
            <Link to="/trending" className="flex items-center gap-1 text-sm font-medium text-[color:var(--color-teal)] hover:underline">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {trendingLoading ? (
            <Loader label="Fetching trending stories" />
          ) : trending.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {trending.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>
          ) : null}
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="mb-4 font-display text-2xl font-semibold text-[color:var(--color-ink)]">Latest stories</h2>
        <BlogList blogs={blogs} loading={loading} emptyTitle="No stories published yet" emptyDescription="Be the first to share something worth reading." />
      </section>
    </div>
  );
}
