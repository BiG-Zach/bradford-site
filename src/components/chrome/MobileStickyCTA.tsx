import * as React from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = document.getElementById('mobileQuoteForm');
    if (!el) { setVisible(true); return; } // fail-open if form not found

    // Robust visibility check: percent of the form currently visible in the viewport
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Visible pixels of the element in the viewport
      const visiblePx = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const ratio = visiblePx / Math.max(1, r.height);

      // Show sticky only when ≤ 40% of the form is visible
      setVisible(ratio <= 0.4);
    };

    // Run once and on scroll/resize for accuracy
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    // Also observe for layout shifts
    const io = new IntersectionObserver(update, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    io.observe(el);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      io.disconnect();
    };
  }, []);

  const onQuote = () => {
    const el = document.getElementById('mobileQuoteForm');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] md:hidden bg-white/95 backdrop-blur border-t border-slate-200"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-3">
        <button
          onClick={onQuote}
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-3 font-semibold shadow hover:bg-emerald-500"
          style={{ minHeight: '48px' }}
        >
          Get Quote
        </button>
        <a
          href="tel:+16893256570"
          className="flex-1 inline-flex items-center justify-center rounded-xl ring-1 ring-slate-300 px-4 py-3 font-semibold"
          style={{ minHeight: '48px' }}
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
