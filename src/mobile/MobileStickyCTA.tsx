import React from "react";
import { COMPANY } from "../config/company";

type CallAttrs = {
  href: string;
  data: Record<string, string>;
};

/**
 * MobileStickyCTA
 * - Shows only on mobile (<768px) and only when the observed sentinel/form is < 25% visible.
 * - Observes: #mobileQuoteForm OR [data-hero-sentinel]
 * - Fail-closed: if neither target exists, component renders null (no sticky shown).
 * - Buttons:
 *    - Get Quote: smooth-scroll to #mobileQuoteForm
 *    - Call Now: mirrors header tel + data-* attributes exactly if present; otherwise falls back to COMPANY.phoneHref
 * - Sets <html data-sticky-cta-visible="true|false"> based on visibility
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const callAttrs = React.useRef<CallAttrs>({ href: COMPANY.phoneHref ?? "tel:", data: {} });

  // Clone header call link attributes at runtime
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    // Priority: #header-call, then any header a[href^="tel:"], else fallback to COMPANY.phoneHref
    const headerCall =
      (document.querySelector("#header-call") as HTMLAnchorElement | null) ||
      (document.querySelector("header a[href^='tel:']") as HTMLAnchorElement | null);

    if (headerCall) {
      const data: Record<string, string> = {};
      // Copy ALL data-* attributes exactly
      for (const attr of Array.from(headerCall.attributes)) {
        if (attr.name.startsWith("data-")) data[attr.name] = attr.value;
      }
      callAttrs.current = {
        href: headerCall.getAttribute("href") ?? COMPANY.phoneHref ?? "tel:",
        data,
      };
    } else {
      callAttrs.current = { href: COMPANY.phoneHref ?? "tel:", data: {} };
    }
  }, []);

  // Observe sentinel/form to decide visibility
  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    const formEl = document.getElementById("mobileQuoteForm");
    const sentinelEl = document.querySelector("[data-hero-sentinel]") as HTMLElement | null;
    const target: Element | null = formEl || sentinelEl;

    if (!target) {
      // Fail-closed: neither target exists, do not show sticky
      setReady(false);
      setVisible(false);
      document.documentElement.dataset.stickyCtaVisible = "false";
      window.removeEventListener("resize", updateIsMobile);
      return;
    }

    setReady(true);

    // IntersectionObserver: show when < 25% visible (i.e., hero has left viewport)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target !== target) continue;
          const ratio = entry.intersectionRatio;
          const shouldShow = isMobile && ratio < 0.25;
          setVisible(shouldShow);
          document.documentElement.dataset.stickyCtaVisible = shouldShow ? "true" : "false";

          // Also hide header's mobile CTA while sticky is visible (if present)
          const headerMobileCTA = document.getElementById("headerMobileCTA");
          if (headerMobileCTA) {
            if (shouldShow) {
              headerMobileCTA.setAttribute("data-hidden-by-sticky", "true");
            } else {
              headerMobileCTA.removeAttribute("data-hidden-by-sticky");
            }
          }
        }
      },
      { threshold: [0, 0.25, 1] }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIsMobile);
      document.documentElement.dataset.stickyCtaVisible = "false";

      const headerMobileCTA = document.getElementById("headerMobileCTA");
      if (headerMobileCTA) headerMobileCTA.removeAttribute("data-hidden-by-sticky");
    };
  }, [isMobile]);

  // If not mobile or no targets to observe, do not render the sticky
  if (!ready || !isMobile) return null;

  const onGetQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("mobileQuoteForm");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  const callHref = callAttrs.current.href;
  const callData = callAttrs.current.data;

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-50 md:hidden",
        "transition-transform duration-300 ease-out will-change-transform",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      aria-hidden={!visible}
    >
      {/* Bar */}
      <div className="bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur border-t border-slate-200 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-center gap-3">
          {/* Call Now */}
          <a
            href={callHref}
            {...callData}
            className="flex-1 inline-flex items-center justify-center rounded-lg font-semibold text-base min-h-[44px] px-4 py-3 text-white bg-slate-800 hover:bg-slate-900 active:scale-[0.98] transition-transform"
            aria-label="Call now"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.69l1.5 4.48a1 1 0 01-.5 1.2l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.2-.5l4.48 1.5a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
            </svg>
            Call Now
          </a>

          {/* Get Quote */}
          <button
            type="button"
            onClick={onGetQuote}
            className="flex-1 inline-flex items-center justify-center rounded-lg font-semibold text-base min-h-[44px] px-4 py-3 text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-transform"
            aria-label="Get quote"
            data-gtm="sticky-quote"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Get Quote
          </button>
        </div>

        {/* Safe area for devices with home indicators */}
        <div className="h-safe-area-inset-bottom bg-white/95 supports-[backdrop-filter]:bg-white/80" />
      </div>
    </div>
  );
}