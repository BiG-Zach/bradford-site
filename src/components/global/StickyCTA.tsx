import * as React from 'react';

export default function StickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = () =>
      (window.innerWidth || document.documentElement.clientWidth) < 768;

    let mobile = isMobile();
    const onResize = () => {
      mobile = isMobile();
      if (!mobile) setVisible(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    const formEl = document.getElementById('mobileQuoteForm');
    const sentinelEl = document.querySelector('[data-hero-sentinel]') as HTMLElement | null;
    const target = formEl || sentinelEl;

    if (!target || !mobile) return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const mostlyVisible = !!entry?.isIntersecting && (entry.intersectionRatio > 0.25);
        setVisible(!mostlyVisible);
      },
      { threshold: [0, 0.25, 0.5, 1], rootMargin: '0px 0px -120px 0px' }
    );

    io.observe(target);

    return () => {
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
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

