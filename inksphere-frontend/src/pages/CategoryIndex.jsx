import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/categories';

const blurbs = {
  General: 'Everything that does not fit neatly elsewhere — and plenty that does.',
  Tech: 'Software, systems, and the tools reshaping how we build.',
  Travel: 'Field notes from elsewhere.',
  Lifestyle: 'Habits, homes, and the everyday, examined.',
  Education: 'Teaching, learning, and the ideas behind both.',
};

export default function CategoryIndex() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[color:var(--color-teal)]">The catalog</p>
      <h1 className="mb-8 font-display text-3xl font-semibold text-[color:var(--color-ink)]">Browse by category</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            to={`/category/${cat.value}`}
            className="group relative overflow-hidden rounded-sm border border-[color:var(--color-paper-line)] bg-white/50 p-6 pl-7 transition-shadow hover:shadow-[0_4px_24px_-8px_rgba(22,21,31,0.18)]"
            style={{ borderLeft: `4px solid ${cat.color}` }}
          >
            <h2 className="font-display text-2xl font-semibold text-[color:var(--color-ink)] group-hover:underline decoration-2 underline-offset-4" style={{ textDecorationColor: cat.color }}>
              {cat.value}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">{blurbs[cat.value]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
