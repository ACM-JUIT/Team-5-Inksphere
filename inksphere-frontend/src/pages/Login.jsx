import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Label, Input, FieldError } from '../components/common/Field';
import Button from '../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || '/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16 sm:px-0">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">Welcome back</p>
      <h1 className="font-display text-3xl font-semibold text-[color:var(--color-ink)]">Sign in to InkSphere</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" value={form.username} onChange={handleChange} placeholder="janedoe" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
        </div>

        <FieldError>{error}</FieldError>

        <Button type="submit" size="lg" loading={loading} className="mt-1">
          Sign in
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-[color:var(--color-muted)]">
        New to InkSphere?{' '}
        <Link to="/register" className="font-medium text-[color:var(--color-teal)] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
