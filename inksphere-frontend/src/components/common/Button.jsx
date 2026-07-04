import { forwardRef } from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-ink-soft)]',
  gold: 'bg-[color:var(--color-gold)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-gold-dark)] hover:text-white',
  outline: 'border border-[color:var(--color-ink)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]',
  ghost: 'text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper-dim)]',
  danger: 'bg-[color:var(--color-crimson)] text-white hover:opacity-90',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const Button = forwardRef(function Button(
  { as: Component = 'button', variant = 'primary', size = 'md', className, loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      )}
      {children}
    </Component>
  );
});

export default Button;
