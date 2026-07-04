import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { createComment, deleteComment, getComments } from '../../api/blog.api';
import { extractErrorMessage } from '../../api/axios';
import { useAuth } from '../../hooks/useAuth';
import { formatRelative } from '../../utils/formatDate';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Textarea } from '../common/Field';
import Loader from '../common/Loader';

export default function CommentSection({ blogId, blogAuthorId }) {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);

  const loadComments = async () => {
    try {
      const { data } = await getComments(blogId);
      setComments(data.comments || []);
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not load comments.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    try {
      await createComment(blogId, text.trim());
      setText('');
      await loadComments();
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not post your comment.'));
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success('Comment removed');
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not remove the comment.'));
    }
  };

  return (
    <section className="mt-14 border-t border-[color:var(--color-paper-line)] pt-8">
      <h2 className="font-display text-2xl font-semibold text-[color:var(--color-ink)]">
        Discussion <span className="font-mono text-base font-normal text-[color:var(--color-muted)]">({comments.length})</span>
      </h2>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <Textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts…"
          />
          <div>
            <Button type="submit" variant="gold" size="sm" loading={posting} disabled={!text.trim()}>
              Post comment
            </Button>
          </div>
        </form>
      ) : (
        <p className="mt-5 text-sm text-[color:var(--color-muted)]">
          <Link to="/login" className="font-medium text-[color:var(--color-teal)] hover:underline">Sign in</Link> to join the discussion.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-6">
        {loading ? (
          <Loader label="Loading comments" />
        ) : comments.length === 0 ? (
          <p className="text-sm text-[color:var(--color-muted)]">No comments yet — be the first to respond.</p>
        ) : (
          comments.map((comment) => {
            const canDelete = user && (comment.username?._id === user._id || blogAuthorId === user._id);
            return (
              <div key={comment._id} className="flex gap-3">
                <Avatar src={comment.username?.profilepic} username={comment.username?.username} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[color:var(--color-ink)]">{comment.username?.username || 'Deleted user'}</span>
                    <span className="text-xs text-[color:var(--color-muted)]">{formatRelative(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">{comment.content}</p>
                </div>
                {canDelete && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="h-fit rounded-sm p-1.5 text-[color:var(--color-muted)] hover:bg-[color:var(--color-paper-dim)] hover:text-[color:var(--color-crimson)]"
                    title="Delete comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
