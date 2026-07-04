import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Label, Input, FieldError } from '../components/common/Field';
import Button from '../components/common/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      toast.success('Account created — sign in to continue');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Join InkSphere</p>
      <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">Create your account</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" value={form.username} onChange={handleChange} placeholder="janedoe" required minLength={5} maxLength={12} />
          <p className="mt-1 text-xs text-[color:var(--color-muted)]">5–12 characters.</p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required minLength={8} />
          <p className="mt-1 text-xs text-[color:var(--color-muted)]">8+ characters, with upper &amp; lower case, a number and a symbol.</p>
        </div>

        <FieldError>{error}</FieldError>

        <Button type="submit" size="lg" loading={loading} className="mt-1">
          Create account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[color:var(--color-muted)]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-[color:var(--color-teal)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
