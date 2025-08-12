import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Status = 'Available' | 'Coming Soon' | 'Not Available';

type TooltipProps = {
  isVisible: boolean;
  stateName: string;
  status: Status;
  benefit?: string;
  x: number;
  y: number;
  containerWidth: number;
  containerHeight: number;
};

const statusVariants = {
  Available: {
    pill: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
    cta: 'text-emerald-300'
  },
  'Coming Soon': {
    pill: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20',
    cta: 'text-sky-300'
  },
  'Not Available': {
    pill: 'bg-slate-400/15 text-slate-300 ring-1 ring-slate-300/20',
    cta: 'text-slate-300'
  }
};

export default function MapTooltip({
  isVisible,
  stateName,
  status,
  benefit,
  x,
  y,
  containerWidth,
  containerHeight
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, arrowSide: 'bottom' as 'bottom' | 'top' | 'left' | 'right' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current;
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = 220; // min-w-[220px]
    const tooltipHeight = tooltipRect.height || 80; // estimated height

    // Calculate desired position with offset so tooltip doesn't cover cursor
    const offsetX = 12;
    const offsetY = 12;
    let desiredX = x + offsetX;
    let desiredY = y - tooltipHeight - offsetY;
    let arrowSide: 'bottom' | 'top' | 'left' | 'right' = 'bottom';

    // Edge detection and flipping
    const padding = 8;
    
    // Check right edge
    if (desiredX + tooltipWidth > containerWidth - padding) {
      desiredX = x - tooltipWidth - offsetX;
      arrowSide = 'right';
    }
    
    // Check left edge
    if (desiredX < padding) {
      desiredX = padding;
      arrowSide = 'bottom';
    }
    
    // Check top edge
    if (desiredY < padding) {
      desiredY = y + offsetY;
      arrowSide = 'top';
    }
    
    // Check bottom edge
    if (desiredY + tooltipHeight > containerHeight - padding) {
      desiredY = containerHeight - tooltipHeight - padding;
      if (arrowSide === 'bottom') arrowSide = 'top';
    }

    // Final clamp to ensure tooltip stays within bounds
    const clampedX = Math.max(padding, Math.min(desiredX, containerWidth - tooltipWidth - padding));
    const clampedY = Math.max(padding, Math.min(desiredY, containerHeight - tooltipHeight - padding));

    setPosition({ x: clampedX, y: clampedY, arrowSide });
  }, [isVisible, x, y, containerWidth, containerHeight]);

  if (!isVisible) return null;

  const variant = statusVariants[status];
  
  const arrowClasses = {
    bottom: 'top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-slate-900/95',
    top: 'bottom-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-slate-900/95',
    left: 'right-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-slate-900/95',
    right: 'left-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-slate-900/95'
  };

  return (
    <motion.div
      ref={tooltipRef}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? undefined : { duration: 0.18, ease: "easeOut" }}
      role="status"
      aria-live="polite"
      data-gtm="map-tooltip"
      className="pointer-events-none absolute z-40 min-w-[220px] max-w-xs rounded-xl bg-slate-900/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur supports-[backdrop-filter]:backdrop-blur"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="p-3">
        {/* Title row with state name and status pill */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold text-white truncate">
            {stateName}
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium shrink-0 ${variant.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              status === 'Available' ? 'bg-emerald-400' :
              status === 'Coming Soon' ? 'bg-sky-400' :
              'bg-slate-400'
            }`} aria-hidden="true" />
            {status}
          </span>
        </div>

        {/* Benefit text */}
        {benefit && (
          <div className="mt-1 text-xs text-slate-200 leading-relaxed">
            {benefit}
          </div>
        )}

        {/* CTA hint for available states */}
        {status === 'Available' && (
          <div className={`mt-2 text-xs font-medium ${variant.cta} flex items-center gap-1`}>
            <span>Click to explore</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div 
        className={`absolute w-0 h-0 ${arrowClasses[position.arrowSide]}`}
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}