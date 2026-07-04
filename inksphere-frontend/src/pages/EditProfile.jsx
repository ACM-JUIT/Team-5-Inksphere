import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateMyProfile } from '../api/user.api';
import { extractErrorMessage } from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Label, Input, Textarea, FieldError } from '../components/common/Field';
import Button from '../components/common/Button';

export default function EditProfile() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: user?.username || '', bio: user?.bio || '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateMyProfile(form);
      await refreshProfile();
      toast.success('Profile updated');
      navigate('/profile');
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not update your profile.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-5 py-12 sm:px-8">
      <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">Edit profile</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" value={form.username} onChange={handleChange} minLength={5} maxLength={12} />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" rows={4} value={form.bio} onChange={handleChange} placeholder="A short line about you" />
        </div>

        <FieldError>{error}</FieldError>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => navigate('/profile')}>Cancel</Button>
          <Button type="submit" variant="gold" loading={loading}>Save changes</Button>
        </div>
      </form>
    </div>
  );
}
