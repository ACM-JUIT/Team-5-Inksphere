export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-[color:var(--color-paper-line)] px-8 py-16 text-center">
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M32 4C32 4 12 30 12 42C12 53.0457 20.9543 62 32 62C43.0457 62 52 53.0457 52 42C52 30 32 4 32 4Z"
          stroke="var(--color-paper-line)"
          strokeWidth="2.5"
        />
        <path d="M24 44C24 38 27 33 32 30" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <h3 className="font-display text-xl text-[color:var(--color-ink)]">{title}</h3>
      {description && <p className="max-w-sm text-sm text-[color:var(--color-muted)]">{description}</p>}
      {action}
    </div>
  );
}
