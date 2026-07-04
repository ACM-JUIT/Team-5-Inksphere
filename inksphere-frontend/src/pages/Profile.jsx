import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Camera, Pencil } from 'lucide-react';
import { getBlogsByProfile } from '../api/blog.api';
import { uploadProfilePicture } from '../api/user.api';
import { extractErrorMessage } from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import BlogList from '../components/blog/BlogList';

export default function Profile() {
  const { user, refreshProfile } = useAuth();
  const fileInput = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data } = await getBlogsByProfile(user._id);
        setBlogs(data.blogs || []);
      } catch (error) {
        toast.error(extractErrorMessage(error, 'Could not load your stories.'));
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handlePictureChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadProfilePicture(file);
      await refreshProfile();
      toast.success('Profile picture updated');
    } catch (error) {
      toast.error(extractErrorMessage(error, 'Could not upload your picture.'));
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <div className="flex flex-col items-start gap-6 border-b border-[color:var(--color-paper-line)] pb-8 sm:flex-row sm:items-center">
        <div className="relative">
          <Avatar src={user.profilepic} username={user.username} size="xl" />
          <button
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="absolute -bottom-1 -right-1 rounded-full border border-[color:var(--color-paper-line)] bg-[color:var(--color-paper)] p-2 shadow-sm hover:bg-[color:var(--color-paper-dim)]"
            title="Change photo"
          >
            <Camera className="h-4 w-4 text-[color:var(--color-ink)]" />
          </button>
          <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={handlePictureChange} />
        </div>

        <div className="flex-1">
          <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">{user.username}</h1>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">{user.email}</p>
          {user.bio && <p className="mt-3 max-w-lg text-[color:var(--color-ink-soft)]">{user.bio}</p>}
        </div>

        <Button as={Link} to="/profile/edit" variant="outline" size="sm">
          <Pencil className="h-3.5 w-3.5" /> Edit profile
        </Button>
      </div>

      <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-[color:var(--color-ink)]">Your stories</h2>
      <BlogList
        blogs={blogs}
        loading={loading}
        emptyTitle="You haven't published yet"
        emptyDescription="Your first story is one page away."
        action={
          <Button as={Link} to="/write" variant="gold" size="sm" className="mt-2">
            Write a story
          </Button>
        }
      />
    </div>
  );
}
