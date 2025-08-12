import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'accent' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  href?: never;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
};

type Props = ButtonProps | AnchorProps;

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClasses: Record<Variant, string> = {
  // Primary navy #005ea2 with hover #0078c8
  primary:
    'bg-[#005ea2] text-white hover:bg-[#0078c8] active:bg-[#065f9a] focus-visible:ring-[#005ea2] shadow-sm hover:shadow-md',
  // Accent teal/green #1DD3B0
  accent:
    'bg-[#1DD3B0] text-slate-900 hover:bg-[#17bfa0] active:bg-[#12a78c] focus-visible:ring-[#1DD3B0] shadow-sm hover:shadow-md',
  ghost:
    'text-slate-800 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-300',
  outline:
    'border border-slate-300 text-slate-800 hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-300',
};

export default function Button(props: Props) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth,
    ...rest
  } = props as (Props & { variant: Variant; size: Size });

  const base =
    'inline-flex items-center justify-center rounded-2xl font-semibold transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]';

  const commonClass = clsx(
    base,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    loading && 'opacity-70 pointer-events-none',
    className
  );

  if ((props as AnchorProps).as === 'a') {
    const { as: _as, ...anchorRest } = props as AnchorProps;
    return (
      <a className={commonClass} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = props as ButtonProps;
  const disabled = (buttonRest as ButtonProps).disabled || loading;

  return (
    <button className={commonClass} disabled={disabled} {...(buttonRest as ButtonProps)}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          <span>Loading…</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}