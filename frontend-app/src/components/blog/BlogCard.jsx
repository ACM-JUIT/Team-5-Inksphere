import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Eye } from 'lucide-react';
import { categoryColor } from '../../utils/categories';
import { formatDate, estimateReadTime } from '../../utils/formatDate';
import Avatar from '../common/Avatar';

export default function BlogCard({ blog }) {
  const spine = categoryColor(blog.category);

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group relative flex gap-4 overflow-hidden rounded-sm border border-[color:var(--color-paper-line)] bg-white/50 pl-4 transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(22,21,31,0.18)] sm:gap-5"
      style={{ borderLeft: `4px solid ${spine}` }}
    >
      <div className="flex-1 py-4 pr-4 sm:py-5">
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: spine }}>
          <span>{blog.category || 'General'}</span>
          <span className="text-[color:var(--color-paper-line)]">&bull;</span>
          <span className="text-[color:var(--color-muted)] normal-case tracking-normal">{estimateReadTime(blog.content)}</span>
        </div>

        <h3 className="font-display text-xl font-semibold leading-snug text-[color:var(--color-ink)] group-hover:underline decoration-[color:var(--color-gold)] decoration-2 underline-offset-4 sm:text-2xl">
          {blog.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-[color:var(--color-muted)] sm:text-[15px]">
          {blog.content?.replace(/\s+/g, ' ')}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[color:var(--color-muted)]">
          <span className="flex items-center gap-1.5">
            <Avatar src={blog.author?.profilepic} username={blog.author?.username} size="sm" className="h-5 w-5 text-[10px]" />
            {blog.author?.username || 'Unknown'}
          </span>
          <span>{formatDate(blog.createdAt)}</span>
          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {blog.views ?? 0}</span>
          <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {blog.likes?.length ?? 0}</span>
          <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {blog.comments?.length ?? 0}</span>
        </div>
      </div>

      {blog.coverImage && (
        <div className="hidden w-40 shrink-0 overflow-hidden sm:block">
          <img
            src={blog.coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Link>
  );
}
