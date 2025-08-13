import * as React from 'react';

export default function MobileHeader() {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isMobile = () => (window.innerWidth || 0) < 768;

    const setVar = () => {
      if (!isMobile()) return;
      const h = (ref.current?.offsetHeight ?? 64);
      root.style.setProperty('--header-h', `${h}px`);
    };

    setVar();
    window.addEventListener('resize', setVar);

    return () => {
      window.removeEventListener('resize', setVar);
      root.style.removeProperty('--header-h');
    };
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-40 md:hidden bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur border-b border-slate-200"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
      aria-label="Mobile site header"
    >
      <div className="container-default flex h-16 items-center justify-between">
        <a
          href="/"
          className="font-extrabold text-lg tracking-tight text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ea2]"
        >
          Bradford Informed Guidance
        </a>
        <a
          id="headerMobileCTA"
          href="https://calendly.com/bradfordinformedguidance"
          className="inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#005ea2] active:scale-[0.98] px-4 py-3 text-base bg-[#005ea2] text-white shadow-sm min-h-[44px] min-w-[44px]"
          aria-label="Schedule"
        >
          Schedule
        </a>
      </div>
      <div className="h-1 bg-[#1DD3B0]" />
    </header>
  );
}