import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getBlogById, updateBlog } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { CATEGORIES } from '../utils/categories';
import { Label, Input, Textarea, Select, FieldError } from '../components/common/Field';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

export default function EditBlog() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getBlogById(id);
        if (user && data.blog.author?._id !== user._id) {
          toast.error('You can only edit your own stories.');
          navigate(`/blog/${id}`);
          return;
        }
        setForm({ title: data.blog.title, content: data.blog.content, category: data.blog.category });
      } catch (err) {
        toast.error(extractErrorMessage(err, 'Could not load this story.'));
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await updateBlog(id, form);
      toast.success('Story updated');
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not update this story.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader full size="lg" label="Loading story" />;

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Edit story</p>
      <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">Revise your story</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select id="category" name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.value}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" name="content" rows={14} value={form.content} onChange={handleChange} required />
        </div>

        <FieldError>{error}</FieldError>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" variant="gold" loading={saving}>Save changes</Button>
        </div>
      </form>
    </div>
  );
}
