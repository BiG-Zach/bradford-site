import React from 'react';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

// Custom branded icons matching the Bradford Informed Guidance palette
export const NetworkIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6" />
    <path d="m21 12-6-3-6 3-6-3" />
    <path d="m21 12-6 3-6-3-6 3" />
    <circle cx="12" cy="12" r="11" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
    <path d="M8 2h8" />
    <path d="M8 22h8" />
  </svg>
);

export const ShieldStarIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

export const HandHeartIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
    <path d="m2 15 6 6" />
    <path d="M19.5 8.5c.7-.7 1.1-1.6 1.1-2.5a3 3 0 0 0-6 0c0 .9.4 1.8 1.1 2.5L17 10l1.5-1.5Z" />
  </svg>
);

export const WalletCheckIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M17 14h.01" />
    <path d="M7 7h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z" />
    <path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const SparkleCheckIcon: React.FC<IconProps> = ({ className = "h-6 w-6", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// Star rating component for testimonials
export const StarRating: React.FC<{ rating: number; className?: string }> = ({ 
  rating, 
  className = "flex items-center gap-0.5" 
}) => (
  <div className={className} role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
          clipRule="evenodd"
        />
      </svg>
    ))}
  </div>
);

// Numbered circle icon for How It Works section
export const NumberedIcon: React.FC<{ number: number; className?: string }> = ({ 
  number, 
  className = "h-12 w-12" 
}) => (
  <div 
    className={`${className} rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 font-bold text-lg`}
    role="img"
    aria-label={`Step ${number}`}
  >
    {number}
  </div>
);