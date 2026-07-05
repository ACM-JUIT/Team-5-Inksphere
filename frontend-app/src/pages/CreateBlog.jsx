import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ImagePlus, X } from 'lucide-react';
import { createBlog } from '../api/blog.api';
import { extractErrorMessage } from '../api/axios';
import { CATEGORIES } from '../utils/categories';
import { Label, Input, Textarea, Select, FieldError } from '../components/common/Field';
import Button from '../components/common/Button';

export default function CreateBlog() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setCover(null);
    setPreview('');
    if (fileInput.current) fileInput.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createBlog({ ...form, coverImage: cover });
      toast.success('Story published');
      navigate('/');
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not publish your story.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">New story</p>
      <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">Write something worth reading</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} placeholder="A working title" required />
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
          <Label>Cover image</Label>
          {preview ? (
            <div className="relative w-full overflow-hidden rounded-sm border border-[color:var(--color-paper-line)]">
              <img src={preview} alt="Cover preview" className="h-48 w-full object-cover" />
              <button
                type="button"
                onClick={clearFile}
                className="absolute right-2 top-2 rounded-full bg-[color:var(--color-ink)] p-1.5 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-[color:var(--color-paper-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-teal)] hover:text-[color:var(--color-teal)]">
              <ImagePlus className="h-6 w-6" />
              <span className="text-sm">Click to upload an image</span>
              <input ref={fileInput} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
          )}
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" name="content" rows={14} value={form.content} onChange={handleChange} placeholder="Begin your story…" required />
        </div>

        <FieldError>{error}</FieldError>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" variant="gold" loading={loading}>Publish story</Button>
        </div>
      </form>
    </div>
  );
}
