
import * as React from 'react';

export default function MobileStickyCTA() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById('mobileQuoteForm');
    if (!hero) { setVisible(true); return; } // fail-open if not found

    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      const isVisible = e.isIntersecting && e.intersectionRatio > 0.5;
      setVisible(!isVisible);
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px 0px -80px 0px'
    });

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  const onQuote = () => {
    const el = document.getElementById('mobileQuoteForm');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] md:hidden bg-white/95 backdrop-blur border-t border-slate-200" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom))' }}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-3">
        <button onClick={onQuote} className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-3 font-semibold shadow hover:bg-emerald-500" style={{ minHeight: '48px' }}>
          Get Quote
        </button>
        <a href="tel:+16893256570" className="flex-1 inline-flex items-center justify-center rounded-xl ring-1 ring-slate-300 px-4 py-3 font-semibold" style={{ minHeight: '48px' }}>
          Call Now
        </a>
      </div>
    </div>
  );
}
