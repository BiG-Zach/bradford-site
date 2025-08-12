import React from 'react';

interface BrandShapeProps {
  variant?: 'circle' | 'square' | 'triangle' | 'blob';
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'sky' | 'slate';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  opacity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const BrandShape: React.FC<BrandShapeProps> = ({
  variant = 'circle',
  size = 'md',
  color = 'emerald',
  position = 'top-right',
  opacity = 'low',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const colorClasses = {
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    slate: 'bg-slate-400',
  };

  const opacityClasses = {
    low: 'opacity-5',
    medium: 'opacity-10',
    high: 'opacity-20',
  };

  const positionClasses = {
    'top-left': 'absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'rounded-sm transform rotate-45',
    blob: 'rounded-full transform scale-x-150',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${opacityClasses[opacity]}
        ${positionClasses[position]}
        ${shapeClasses[variant]}
        pointer-events-none
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

// Decorative background pattern component
export const BrandPattern: React.FC<{
  variant?: 'dots' | 'grid' | 'waves';
  className?: string;
}> = ({ variant = 'dots', className = '' }) => {
  const patterns = {
    dots: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    grid: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    waves: (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    ),
  };

  return (
    <div className={`absolute inset-0 pointer-events-none text-emerald-500 ${className}`} aria-hidden="true">
      {patterns[variant]}
    </div>
  );
};

// Section background with subtle brand elements
export const SectionBackground: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'tinted' | 'gradient';
  shapes?: boolean;
  pattern?: boolean;
  className?: string;
}> = ({ 
  children, 
  variant = 'default', 
  shapes = false, 
  pattern = false,
  className = '' 
}) => {
  const backgroundClasses = {
    default: 'bg-white',
    tinted: 'bg-slate-50',
    gradient: 'bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/30',
  };

  return (
    <div className={`relative overflow-hidden ${backgroundClasses[variant]} ${className}`}>
      {pattern && <BrandPattern variant="dots" className="opacity-30" />}
      
      {shapes && (
        <>
          <BrandShape variant="circle" size="lg" color="emerald" position="top-right" opacity="low" />
          <BrandShape variant="square" size="md" color="sky" position="bottom-left" opacity="low" />
        </>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BrandShape;