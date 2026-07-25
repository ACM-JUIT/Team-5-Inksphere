import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, Bookmark, Pencil, Trash2, Eye } from 'lucide-react';
import { deleteBlog, getBlogById, likeBlog, toggleBookmark } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { categoryColor } from '../utils/categories';
import { formatDate, estimateReadTime } from '../utils/formatDate';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import CommentSection from '../components/blog/CommentSection';

export default function BlogDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getBlogById(id);
      setBlog(data.blog);
      setLikeCount(data.blog.likes?.length || 0);
      if (user) {
        setLiked(data.blog.likes?.includes(user._id));
        setBookmarked(user.bookmarks?.includes(data.blog._id));
      }
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not load this story.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) return navigate('/login');
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    try {
      await likeBlog(id);
    } catch (error) {
      setLiked((v) => !v);
      setLikeCount((c) => (liked ? c + 1 : c - 1));
      toast.error(extractErrorMessage(error, 'Could not update like.'));
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) return navigate('/login');
    setBookmarked((v) => !v);
    try {
      await toggleBookmark(id);
      toast.success(bookmarked ? 'Removed from bookmarks' : 'Saved to bookmarks');
    } catch (error) {
      setBookmarked((v) => !v);
      toast.error(extractErrorMessage(error, 'Could not update bookmark.'));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this story? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteBlog(id);
      toast.success('Story deleted');
      navigate('/');
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not delete this story.'));
      setDeleting(false);
    }
  };

  if (loading) return <Loader full size="lg" label="Opening story" />;
  if (!blog) return null;

  const isOwner = user && blog.author?._id === user._id;
  const spine = categoryColor(blog.category);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: spine }}>
        <Link to={`/category/${blog.category}`} className="hover:underline">{blog.category || 'General'}</Link>
        <span className="text-[color:var(--color-paper-line)]">&bull;</span>
        <span className="normal-case tracking-normal text-[color:var(--color-muted)]">{estimateReadTime(blog.content)}</span>
      </div>

      <h1 className="font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-5xl">{blog.title}</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[color:var(--color-paper-line)] py-4">
        <Link to={`/authors/${blog.author?._id}`} className="flex items-center gap-3">
          <Avatar src={blog.author?.profilepic} username={blog.author?.username} />
          <div>
            <p className="text-sm font-semibold text-[color:var(--color-ink)]">{blog.author?.username}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{formatDate(blog.createdAt)}</p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 rounded-sm px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
          >
            <Heart className={liked ? 'h-4.5 w-4.5 fill-[color:var(--color-crimson)] text-[color:var(--color-crimson)]' : 'h-4.5 w-4.5'} />
            {likeCount}
          </button>
          <button
            onClick={handleBookmark}
            className="rounded-sm p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
            title="Bookmark"
          >
            <Bookmark className={bookmarked ? 'h-4.5 w-4.5 fill-[color:var(--color-gold)] text-[color:var(--color-gold)]' : 'h-4.5 w-4.5'} />
          </button>
          <span className="flex items-center gap-1 px-2 text-sm text-[color:var(--color-muted)]"><Eye className="h-4 w-4" /> {blog.views}</span>

          {isOwner && (
            <>
              <Link to={`/edit/${blog._id}`} className="rounded-sm p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]" title="Edit">
                <Pencil className="h-4.5 w-4.5" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleDelete} loading={deleting} className="text-[color:var(--color-crimson)]">
                <Trash2 className="h-4.5 w-4.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {blog.coverImage && (
        <img src={blog.coverImage} alt={blog.title} className="mt-8 w-full rounded-sm border border-[color:var(--color-paper-line)] object-cover" />
      )}

      <div className="prose-content mt-8 text-lg">{blog.content}</div>

      <CommentSection blogId={blog._id} blogAuthorId={blog.author?._id} />
    </article>
  );
}
