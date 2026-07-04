import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getBlogsByCategory } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import CategoryTabs from '../components/blog/CategoryTabs';
import BlogList from '../components/blog/BlogList';

export default function CategoryPage() {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await getBlogsByCategory(category);
        setBlogs(data.blogs || []);
      } catch (error) {
        // A 404 here just means the category is empty — treat it as such rather than an error toast.
        if (error?.response?.status !== 404) {
          toast.error(extractErrorMessage(error, 'Could not load this category.'));
        }
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">The catalog</p>
      <h1 className="mb-6 font-display text-3xl font-semibold text-[color:var(--color-ink)]">{category}</h1>

      <div className="mb-8">
        <CategoryTabs />
      </div>

      <BlogList
        blogs={blogs}
        loading={loading}
        emptyTitle={`No stories in ${category} yet`}
        emptyDescription="Check back soon, or explore another category."
      />
    </div>
  );
}
