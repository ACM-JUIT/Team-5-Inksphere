import clsx from 'clsx';

export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">
      {children}
    </label>
  );
}

export function Input({ error, className, ...props }) {
  return (
    <input
      className={clsx(
        'w-full rounded-sm border bg-[color:var(--color-surface)] px-3.5 py-2.5 text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-muted)]',
        error ? 'border-[color:var(--color-crimson)]' : 'border-[color:var(--color-paper-line)] focus:border-[color:var(--color-teal)]',
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ error, className, ...props }) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-sm border bg-[color:var(--color-surface)] px-3.5 py-2.5 text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-[color:var(--color-muted)]',
        error ? 'border-[color:var(--color-crimson)]' : 'border-[color:var(--color-paper-line)] focus:border-[color:var(--color-teal)]',
        className,
      )}
      {...props}
    />
  );
}

export function Select({ error, className, children, ...props }) {
  return (
    <select
      className={clsx(
        'w-full rounded-sm border bg-[color:var(--color-surface)] px-3.5 py-2.5 text-[color:var(--color-ink)] outline-none transition-colors',
        error ? 'border-[color:var(--color-crimson)]' : 'border-[color:var(--color-paper-line)] focus:border-[color:var(--color-teal)]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-[color:var(--color-crimson)]">{children}</p>;
}
