import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <span className="font-display text-7xl font-semibold text-[color:var(--color-ink)]">404</span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-[color:var(--color-ink)]">This page has been torn out</h1>
      <p className="mt-2 text-[color:var(--color-muted)]">The story or page you're looking for doesn't exist, or may have been removed.</p>
      <Button as={Link} to="/" variant="primary" className="mt-6">Back to InkSphere</Button>
    </div>
  );
}
