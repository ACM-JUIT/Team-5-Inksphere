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
  const { user, isAuthenticated, initializing } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [likePop, setLikePop] = useState(false);
  const [bookmarkPop, setBookmarkPop] = useState(false);

  // Fetch the story itself. This can run before the session has resolved.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data } = await getBlogById(id);
        if (cancelled) return;
        setBlog(data.blog);
        setLikeCount(data.blog.likes?.length || 0);
      } catch (error) {
        if (!cancelled) toast.error(extractErrorMessage(error, 'Could not load this story.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Derive liked/bookmarked from the session *whenever either becomes
  // available* — the session can resolve after the story has already
  // loaded (or vice versa), so this can't be folded into the fetch above.
  useEffect(() => {
    if (!blog) return;
    if (!user) {
      setLiked(false);
      setBookmarked(false);
      return;
    }
    setLiked(Boolean(blog.likes?.some((likeId) => String(likeId) === String(user._id))));
    setBookmarked(Boolean(user.bookmarks?.some((bookmarkId) => String(bookmarkId) === String(blog._id))));
  }, [blog, user]);

  const handleLike = async () => {
    if (!isAuthenticated) return navigate('/login');
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => (next ? c + 1 : c - 1));
    setLikePop(true);
    setTimeout(() => setLikePop(false), 450);
    try {
      await likeBlog(id);
    } catch (error) {
      setLiked(!next);
      setLikeCount((c) => (next ? c - 1 : c + 1));
      toast.error(extractErrorMessage(error, 'Could not update like.'));
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) return navigate('/login');
    const next = !bookmarked;
    setBookmarked(next);
    setBookmarkPop(true);
    setTimeout(() => setBookmarkPop(false), 450);
    try {
      await toggleBookmark(id);
      toast.success(next ? 'Saved to bookmarks' : 'Removed from bookmarks');
    } catch (error) {
      setBookmarked(!next);
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

  if (loading || initializing) return <Loader full size="lg" label="Opening story" />;
  if (!blog) return null;

  const isOwner = user && blog.author?._id === user._id;
  const spine = categoryColor(blog.category);

  return (
    <article className="mx-auto max-w-3xl animate-fade-up px-5 py-12 sm:px-8">
      <div className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: spine }}>
        <Link to={`/category/${blog.category}`} className="hover:underline">{blog.category || 'General'}</Link>
        <span className="text-[color:var(--color-paper-line)]">&bull;</span>
        <span className="normal-case tracking-normal text-[color:var(--color-muted)]">{estimateReadTime(blog.content)}</span>
      </div>

      <h1 className="font-display text-3xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-5xl">{blog.title}</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[color:var(--color-paper-line)] py-4">
        <Link to={`/authors/${blog.author?._id}`} className="group flex items-center gap-3">
          <Avatar src={blog.author?.profilepic} username={blog.author?.username} className="transition-transform duration-300 group-hover:scale-105" />
          <div>
            <p className="text-sm font-semibold text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-teal)]">{blog.author?.username}</p>
            <p className="text-xs text-[color:var(--color-muted)]">{formatDate(blog.createdAt)}</p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLike}
            className="btn-press relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
          >
            <span className="relative inline-flex">
              {likePop && liked && (
                <Heart className="absolute inset-0 h-4.5 w-4.5 animate-burst fill-[color:var(--color-crimson)] text-[color:var(--color-crimson)]" aria-hidden="true" />
              )}
              <Heart
                className={
                  (liked ? 'fill-[color:var(--color-crimson)] text-[color:var(--color-crimson)] ' : '') +
                  'h-4.5 w-4.5 transition-colors duration-200 ' +
                  (likePop ? 'animate-pop' : '')
                }
              />
            </span>
            {likeCount}
          </button>
          <button
            onClick={handleBookmark}
            className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]"
            title="Bookmark"
          >
            <Bookmark
              className={
                (bookmarked ? 'fill-[color:var(--color-gold)] text-[color:var(--color-gold)] ' : '') +
                'h-4.5 w-4.5 transition-colors duration-200 ' +
                (bookmarkPop ? 'animate-pop' : '')
              }
            />
          </button>
          <span className="flex items-center gap-1 px-2 text-sm text-[color:var(--color-muted)]"><Eye className="h-4 w-4" /> {blog.views}</span>

          {isOwner && (
            <>
              <Link to={`/edit/${blog._id}`} className="btn-press rounded-full p-2 text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-dim)]" title="Edit">
                <Pencil className="h-4.5 w-4.5" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleDelete} loading={deleting} className="btn-press text-[color:var(--color-crimson)] hover:bg-[color:var(--color-crimson)]/10">
                <Trash2 className="h-4.5 w-4.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="mt-8 w-full rounded-lg border border-[color:var(--color-paper-line)] object-cover shadow-sm"
        />
      )}

      <div className="prose-content mt-8 text-lg">{blog.content}</div>

      <CommentSection blogId={blog._id} blogAuthorId={blog.author?._id} />
    </article>
  );
}
