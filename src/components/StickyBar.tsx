import React, { useEffect, useState } from 'react';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const sentinel = document.getElementById('sticky-sentinel') || document.body;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(!e.isIntersecting)),
      { rootMargin: '0px', threshold: [0, 1] }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div id="sticky-sentinel" aria-hidden="true" className="h-1 w-full" />
      <div
        className={[
          'fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-emerald-500 shadow-2xl transition-transform duration-300 lg:hidden',
          visible ? 'translate-y-0' : 'translate-y-full'
        ].join(' ')}
      >
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+16893256570" className="flex items-center justify-center bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-gray-900">
              Call Now
            </a>
            <button
              onClick={() => document.getElementById('mobileQuoteForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="flex items-center justify-center bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:bg-emerald-700"
            >
              Get Quote
            </button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">Response in 45–90 minutes • Mon–Sun 8AM–8PM EST</div>
        </div>
      </div>
    </>
  );
}
