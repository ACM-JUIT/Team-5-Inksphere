import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '../../utils/categories';

export default function CategoryTabs() {
  const { category } = useParams();

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const active = category === cat.value;
        return (
          <Link
            key={cat.value}
            to={`/category/${cat.value}`}
            className="rounded-t-sm border-b-[3px] px-4 py-2 text-sm font-medium transition-colors"
            style={{
              borderColor: cat.color,
              color: active ? 'var(--color-ink)' : 'var(--color-muted)',
              backgroundColor: active ? 'var(--color-paper-dim)' : 'transparent',
            }}
          >
            {cat.value}
          </Link>
        );
      })}
    </div>
  );
}
