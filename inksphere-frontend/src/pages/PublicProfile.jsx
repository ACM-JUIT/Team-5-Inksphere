import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getBlogsByProfile } from '../api/blog.api';
import { getProfileById } from '../api/user.api';
import { extractErrorMessage } from '../api/axios';
import Avatar from '../components/common/Avatar';
import Loader from '../components/common/Loader';
import BlogList from '../components/blog/BlogList';

export default function PublicProfile() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [profileRes, blogsRes] = await Promise.all([getProfileById(id), getBlogsByProfile(id)]);
        setAuthor(profileRes.data.user);
        setBlogs(blogsRes.data.blogs || []);
      } catch (error) {
        toast.error(extractErrorMessage(error, 'Could not load this profile.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader full size="lg" label="Loading profile" />;
  if (!author) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <div className="flex flex-col items-start gap-6 border-b border-[color:var(--color-paper-line)] pb-8 sm:flex-row sm:items-center">
        <Avatar src={author.profilepic} username={author.username} size="xl" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">{author.username}</h1>
          {author.bio && <p className="mt-2 max-w-lg text-[color:var(--color-ink-soft)]">{author.bio}</p>}
        </div>
      </div>

      <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-[color:var(--color-ink)]">Stories by {author.username}</h2>
      <BlogList blogs={blogs} loading={false} emptyTitle="No stories yet" emptyDescription={`${author.username} hasn't published anything yet.`} />
    </div>
  );
}
