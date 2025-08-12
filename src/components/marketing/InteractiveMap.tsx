import React, { useMemo, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import USMap from '../ExpansionTracker/USMap';
import MapTooltip from '../ui/MapTooltip';
import { STATE_STATUS, statusClasses, statusLabel, legend, type StateCode } from '../ExpansionTracker/data';
import { trackEvent, GTM_EVENTS } from '../../utils/gtm';

type Status = 'Available' | 'Coming Soon' | 'Not Available';
type HoverInfo = { code: StateCode; name: string; status: Status; x: number; y: number };

export default function InteractiveMap() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [hover, setHover] = useState<HoverInfo | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Enhanced state information for tooltips
  const getStateInfo = (code: StateCode): { name: string; status: Status; benefit?: string } => {
    const stateData = {
      FL: {
        name: 'Florida',
        status: 'Available' as Status,
        benefit: 'Full coverage options available'
      },
      MI: {
        name: 'Michigan',
        status: 'Available' as Status,
        benefit: 'Comprehensive plans with top networks'
      },
      NC: {
        name: 'North Carolina',
        status: 'Available' as Status,
        benefit: 'Quality coverage with preferred providers'
      },
      TX: {
        name: 'Texas',
        status: 'Coming Soon' as Status,
        benefit: 'Launching Q2 2025'
      },
      CA: {
        name: 'California',
        status: 'Coming Soon' as Status,
        benefit: 'Expanding soon'
      },
      NY: {
        name: 'New York',
        status: 'Coming Soon' as Status,
        benefit: 'Coming in 2025'
      }
    };
    
    const defaultInfo = {
      name: code,
      status: 'Not Available' as Status,
      benefit: undefined
    };
    
    return stateData[code as keyof typeof stateData] || defaultInfo;
  };

  const getStateAttrs = useMemo(() => {
    return (code: StateCode) => {
      const status = STATE_STATUS[code];
      const stateInfo = getStateInfo(code);
      
      const base = 'transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2';
      const hover = status === 'available'
        ? 'hover:brightness-95 hover:scale-[1.01]'
        : 'hover:brightness-95';
      
      const cls = `${base} ${hover} ${statusClasses(status)}`;
      return {
        className: cls,
        status,
        title: `${stateInfo.name} — ${stateInfo.status}`
      };
    };
  }, []);

  function onActivate(code: StateCode) {
    const status = STATE_STATUS[code];
    
    // Track the interaction
    trackEvent({
      ...GTM_EVENTS.STATE_MAP_CLICK,
      event_label: `state_map_click_${code.toLowerCase()}`,
    });

    // Navigate to state page if available
    if (status === 'available') {
      navigate(`/states/${code.toLowerCase()}`);
    }
  }

  const updateTooltipPosition = (code: StateCode, event: React.MouseEvent | React.FocusEvent) => {
    if (!mapContainerRef.current) return;
    
    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const stateInfo = getStateInfo(code);
    
    if ('clientX' in event) {
      // Mouse event - position relative to cursor
      setHover({
        code,
        name: stateInfo.name,
        status: stateInfo.status,
        x: event.clientX - containerRect.left + 12, // Small offset so tooltip doesn't cover cursor
        y: event.clientY - containerRect.top - 12
      });
    } else {
      // Focus event - position near the focused state's centroid
      const pathElement = event.currentTarget as SVGPathElement;
      const bbox = pathElement.getBBox();
      const svgRect = pathElement.closest('svg')?.getBoundingClientRect();
      
      if (svgRect) {
        const svgX = bbox.x + bbox.width / 2;
        const svgY = bbox.y + bbox.height / 2;
        
        // Convert SVG coordinates to container coordinates
        const scaleX = svgRect.width / 960; // SVG viewBox width
        const scaleY = svgRect.height / 600; // SVG viewBox height
        
        setHover({
          code,
          name: stateInfo.name,
          status: stateInfo.status,
          x: svgX * scaleX,
          y: svgY * scaleY - 20 // Offset above the state
        });
      }
    }
  };

  const handleMouseEnter = (code: StateCode, event: React.MouseEvent) => {
    updateTooltipPosition(code, event);
  };

  const handleMouseMove = (code: StateCode, event: React.MouseEvent) => {
    if (hover?.code === code) {
      updateTooltipPosition(code, event);
    }
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const handleFocus = (code: StateCode, event: React.FocusEvent) => {
    updateTooltipPosition(code, event);
  };

  const handleBlur = () => {
    setHover(null);
  };

  const handleKeyUp = (event: React.KeyboardEvent, code: StateCode) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate(code);
    }
  };

  return (
    <div className="bg-slate-50 border-y border-slate-200" aria-labelledby="interactive-map-title">
      <div className="text-center mb-8">
        <motion.h2
          id="interactive-map-title"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight mb-2 md:mb-3"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Where We Serve
        </motion.h2>
        <motion.p
          className="text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Click on available states to explore coverage options and benefits
        </motion.p>
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 text-sm"
      >
        {legend().map((item) => (
          <div key={item.key} className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-full ring-2 ${item.dotClass}`}
            />
            <span className="text-slate-700 font-medium">{item.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        className="relative max-w-4xl mx-auto"
      >
        <div
          ref={mapContainerRef}
          className="bg-white rounded-2xl p-4 md:p-6 ring-1 ring-slate-200 shadow-sm relative overflow-hidden"
        >
          {/* Single world-class tooltip */}
          {hover && mapContainerRef.current && (
            <MapTooltip
              isVisible={true}
              stateName={hover.name}
              status={hover.status}
              benefit={getStateInfo(hover.code).benefit}
              x={hover.x}
              y={hover.y}
              containerWidth={mapContainerRef.current.offsetWidth}
              containerHeight={mapContainerRef.current.offsetHeight}
            />
          )}

          {/* Map */}
          <div className="mx-auto w-full max-w-[900px]">
            <USMap
              getStateAttrs={getStateAttrs}
              onActivate={onActivate}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Mobile status indicator */}
          <div className="mt-4 text-center text-sm text-slate-500 md:hidden" role="status" aria-live="polite">
            {hover ? `${hover.name} — ${hover.status}` : 'Tap a state for details'}
          </div>
        </div>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-slate-600">
          Don't see your state? We're expanding rapidly.{' '}
          <a 
            href="/contact" 
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
          >
            Get notified when we launch in your area
          </a>
        </p>
      </motion.div>
    </div>
  );
}