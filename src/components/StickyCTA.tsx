import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent, GTM_EVENTS } from '../utils/gtm';

export default function StickyCTA() {
  const prefersReducedMotion = useReducedMotion();

  const handleCallClick = () => {
    trackEvent(GTM_EVENTS.STICKY_CALL_CLICK);
    window.location.href = 'tel:+1-555-BRADFORD';
  };

  const handleQuoteClick = () => {
    trackEvent(GTM_EVENTS.STICKY_QUOTE_CLICK);
    window.location.href = '/quote';
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-slate-200 shadow-lg"
    >
      <div className="px-4 py-3 flex items-center justify-center gap-3">
        <motion.button
          onClick={handleCallClick}
          className="flex-1 bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus-ring-emerald flex items-center justify-center gap-2 min-h-[44px]"
          aria-label="Call Bradford Informed Guidance now"
          data-gtm="sticky-call"
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </motion.button>
        
        <motion.button
          onClick={handleQuoteClick}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus-ring-emerald flex items-center justify-center gap-2 min-h-[44px]"
          aria-label="Get your insurance quote"
          data-gtm="sticky-quote"
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Get My Quote
        </motion.button>
      </div>
      
      {/* Safe area for devices with home indicators */}
      <div className="h-safe-area-inset-bottom bg-white/95 supports-[backdrop-filter]:bg-white/80" />
    </motion.div>
  );
}