import clsx from 'clsx';

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-20 w-20 text-xl',
  xl: 'h-28 w-28 text-3xl',
};

export default function Avatar({ src, username = '', size = 'md', className }) {
  const initial = username?.charAt(0)?.toUpperCase() || '?';
  return (
    <div
      className={clsx(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--color-paper-line)] bg-[color:var(--color-paper-dim)] font-display text-[color:var(--color-ink)]',
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={username} className="h-full w-full object-cover" />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
