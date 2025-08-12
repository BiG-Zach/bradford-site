import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  bg?: 'none' | 'tint' | 'gradient';
  id?: string;
  padding?: 'default' | 'tight' | 'loose';
};

export default function Section({
  children,
  className = '',
  bg = 'none',
  id,
  padding = 'default',
}: SectionProps) {
  const bgClass =
    bg === 'tint'
      ? 'bg-slate-50'
      : bg === 'gradient'
      ? 'bg-gradient-to-b from-sky-50/60 to-white'
      : '';
  const padClass =
    padding === 'tight' ? 'py-8 sm:py-10' : padding === 'loose' ? 'py-16 sm:py-20' : 'py-12 sm:py-16';
  return (
    <section id={id} className={`${bgClass} ${padClass} ${className}`}>
      <div className="container-default">{children}</div>
    </section>
  );
}