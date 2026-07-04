import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getTrendingBlogs } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import BlogList from '../components/blog/BlogList';

export default function Trending() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTrendingBlogs();
        setBlogs(data.blogs || []);
      } catch (error) {
        toast.error(extractErrorMessage(error, 'Could not load trending stories.'));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Ranked by reach</p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-[color:var(--color-ink)]">Trending stories</h1>
      <BlogList blogs={blogs} loading={loading} emptyTitle="Nothing trending yet" emptyDescription="Views, likes, and comments shape this list — check back soon." />
    </div>
  );
}
