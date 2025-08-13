import * as React from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mobile-only gate (never affect desktop >= 768px)
    const isMobile = (window.innerWidth || 0) < 768;
    if (!isMobile) return;

    const root = document.documentElement;
    const setAttr = (v: boolean) => root.setAttribute('data-sticky-cta-visible', String(v));

    // Fail-closed target: require the mobile quote form
    const el = document.getElementById('mobileQuoteForm');
    if (!el) {
      setVisible(false);
      setAttr(false);
      return;
    }

    // Toggle visibility after the form is mostly out of view (≤ 40% visible)
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visiblePx = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const ratio = visiblePx / Math.max(1, r.height);
      const next = ratio <= 0.4;
      setVisible(next);
      setAttr(next);
    };

    update();
    window.addEventListener('scroll', update, { passive: true } as EventListenerOptions);
    window.addEventListener('resize', update);

    const io = new IntersectionObserver(() => update(), {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px 0px -120px 0px',
    });
    io.observe(el);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      io.disconnect();
      setAttr(false);
    };
  }, []);

  const onQuote = () => {
    const el = document.getElementById('mobileQuoteForm');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!visible) return null;

  return (
    <div
      data-sticky-cta
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

        {/* Mirror header CTA action/attributes for CRM consistency */}
        <a
          href="https://calendly.com/bradfordinformedguidance"
          aria-label="Schedule"
          className="flex-1 inline-flex items-center justify-center rounded-xl ring-1 ring-slate-300 px-4 py-3 font-semibold"
          style={{ minHeight: '48px' }}
        >
          Schedule
        </a>
      </div>
    </div>
  );
}
