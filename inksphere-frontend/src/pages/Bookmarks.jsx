import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getBookmarks } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import BlogList from '../components/blog/BlogList';

export default function Bookmarks() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getBookmarks();
        setBlogs(data.bookmarks || []);
      } catch (error) {
        toast.error(extractErrorMessage(error, 'Could not load your bookmarks.'));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Your shelf</p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-[color:var(--color-ink)]">Bookmarked stories</h1>
      <BlogList blogs={blogs} loading={loading} emptyTitle="Your shelf is empty" emptyDescription="Bookmark stories to find them here later." />
    </div>
  );
}
