import * as React from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = () =>
      (window.innerWidth || document.documentElement.clientWidth) < 768;

    const formEl = document.getElementById('mobileQuoteForm');
    const sentinelEl = document.querySelector('[data-hero-sentinel]') as HTMLElement | null;
    const target = formEl ?? sentinelEl;

    // Fail-closed: hide by default if no target or not mobile
    if (!isMobile() || !target) {
      setVisible(false);
      return;
    }

    const onResize = () => {
      if (!isMobile()) setVisible(false);
    };
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry?.intersectionRatio ?? 0;
        // Hide while form/sentinel is ≥ 25% visible; show after hero is off-screen
        setVisible(ratio < 0.25);
      },
      {
        threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -120px 0px',
      }
    );

    io.observe(target);

    // Initialize visibility once
    try {
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visiblePx = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const ratio = r.height > 0 ? visiblePx / r.height : 0;
      setVisible(ratio < 0.25);
    } catch {}

    return () => {
      window.removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, []);

  const onQuote = () => {
    const el = document.getElementById('mobileQuoteForm');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

