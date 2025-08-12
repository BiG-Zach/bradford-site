import React, { useEffect, useState } from 'react';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const heroForm = document.getElementById('mobileQuoteForm');
      if (!heroForm) return;

      const rect = heroForm.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Show sticky bar only when the hero form is completely out of view
      // Form is considered "out of view" when its bottom is well above the viewport
      // Use a more aggressive threshold - only show when form is completely scrolled out
      const formOutOfView = rect.bottom < -50; // Show only when form is 50px above viewport
      
      setVisible(formOutOfView);
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={[
        'fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-emerald-500 shadow-2xl transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      ].join(' ')}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+16893256570"
            className="flex items-center justify-center bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-gray-900"
            style={{ minHeight: '44px' }}
          >
            Call Now
          </a>
          <button
            onClick={() => document.getElementById('mobileQuoteForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className="flex items-center justify-center bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-emerald-700"
            style={{ minHeight: '44px' }}
          >
            Get Quote
          </button>
        </div>
        <div className="text-center text-xs text-gray-500 mt-2">Response in 45–90 minutes • Mon–Sun 8AM–8PM EST</div>
      </div>
    </div>
  );
}
