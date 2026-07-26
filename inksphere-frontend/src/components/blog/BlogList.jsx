import EmptyState from '../common/EmptyState';
import BlogCard from './BlogCard';

function SkeletonCard({ index }) {
  return (
    <div
      className="flex animate-fade-up gap-4 overflow-hidden rounded-lg border border-[color:var(--color-paper-line)] bg-[color:var(--color-surface)]/70 pl-4 sm:gap-5"
      style={{ borderLeft: '4px solid var(--color-paper-line)', animationDelay: `${index * 60}ms` }}
    >
      <div className="flex-1 py-4 pr-4 sm:py-5">
        <div className="mb-3 h-3 w-24 animate-shimmer rounded-full" />
        <div className="mb-2 h-6 w-3/4 animate-shimmer rounded-md" />
        <div className="mb-1 h-3.5 w-full animate-shimmer rounded-full" />
        <div className="mb-4 h-3.5 w-2/3 animate-shimmer rounded-full" />
        <div className="h-3 w-40 animate-shimmer rounded-full" />
      </div>
      <div className="hidden w-40 shrink-0 animate-shimmer sm:block" />
    </div>
  );
}

export default function BlogList({ blogs, loading, emptyTitle = 'No stories yet', emptyDescription = 'Check back soon.', action }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={action} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog, i) => (
        <BlogCard key={blog._id} blog={blog} index={i} />
      ))}
    </div>
  );
}
