export default function Loader({ label = 'Loading', size = 'md', full = false }) {
  const dimensions = size === 'sm' ? 'h-4 w-4 border-2' : size === 'lg' ? 'h-10 w-10 border-[3px]' : 'h-6 w-6 border-2';

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 py-2">
      <span
        className={`inline-block ${dimensions} animate-spin rounded-full border-[color:var(--color-paper-line)] border-t-[color:var(--color-gold)]`}
        role="status"
        aria-label={label}
      />
      {size === 'lg' && <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">{label}</span>}
    </div>
  );

  if (full) {
    return <div className="flex min-h-[50vh] w-full items-center justify-center">{spinner}</div>;
  }
  return spinner;
}
