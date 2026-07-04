import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';
import BlogCard from './BlogCard';

export default function BlogList({ blogs, loading, emptyTitle = 'No stories yet', emptyDescription = 'Check back soon.', action }) {
  if (loading) return <Loader full label="Fetching stories" size="lg" />;

  if (!blogs || blogs.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={action} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
