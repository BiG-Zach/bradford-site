import React from 'react';

interface GradientDividerProps {
  variant?: 'emerald' | 'sky' | 'slate';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const GradientDivider: React.FC<GradientDividerProps> = ({ 
  variant = 'emerald', 
  direction = 'horizontal',
  className = '' 
}) => {
  const gradientClasses = {
    emerald: direction === 'horizontal' 
      ? 'bg-gradient-to-r from-transparent via-emerald-200 to-transparent'
      : 'bg-gradient-to-b from-transparent via-emerald-200 to-transparent',
    sky: direction === 'horizontal'
      ? 'bg-gradient-to-r from-transparent via-sky-200 to-transparent'
      : 'bg-gradient-to-b from-transparent via-sky-200 to-transparent',
    slate: direction === 'horizontal'
      ? 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'
      : 'bg-gradient-to-b from-transparent via-slate-200 to-transparent',
  };

  const sizeClasses = direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full';

  return (
    <div className={`${sizeClasses} ${gradientClasses[variant]} ${className}`} />
  );
};

export default GradientDivider;