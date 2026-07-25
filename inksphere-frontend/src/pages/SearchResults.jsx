import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { searchBlogs } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import BlogCard from '../components/blog/BlogCard';
import Avatar from '../components/common/Avatar';

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const { data } = await searchBlogs(query);
        setResult(data.result);
      } catch (error) {
        toast.error(extractErrorMessage(error, 'Search failed.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  const titleMatches = result?.title || [];
  const contentMatches = result?.content?.filter((b) => !titleMatches.some((t) => t._id === b._id)) || [];
  const authorMatches = result?.Author || [];
  const totalBlogMatches = titleMatches.length + contentMatches.length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Search</p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-[color:var(--color-ink)]">
        Results for &ldquo;{query}&rdquo;
      </h1>

      {loading ? (
        <Loader full size="lg" label="Searching InkSphere" />
      ) : !query ? (
        <EmptyState title="Type something to search" description="Search by title, content, or author username." />
      ) : totalBlogMatches === 0 && authorMatches.length === 0 ? (
        <EmptyState title="No matches found" description="Try a different keyword or check your spelling." />
      ) : (
        <div className="flex flex-col gap-10">
          {authorMatches.length > 0 && (
            <section>
              <h2 className="mb-3 font-display text-xl font-semibold text-[color:var(--color-ink)]">Writers</h2>
              <div className="flex flex-col gap-2">
                {authorMatches.map((author) => (
                  <Link
                    key={author._id}
                    to={`/authors/${author._id}`}
                    className="flex items-center gap-3 rounded-sm border border-[color:var(--color-paper-line)] p-3 hover:bg-[color:var(--color-paper-dim)]"
                  >
                    <Avatar src={author.profilepic} username={author.username} size="sm" />
                    <span className="text-sm font-medium text-[color:var(--color-ink)]">{author.username}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {totalBlogMatches > 0 && (
            <section>
              <h2 className="mb-3 font-display text-xl font-semibold text-[color:var(--color-ink)]">Stories</h2>
              <div className="flex flex-col gap-4">
                {[...titleMatches, ...contentMatches].map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
