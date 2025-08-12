import { useEffect, useRef } from 'react';

type CalendlyInlineProps = {
  url?: string;
  /**
   * Height of the inline embed container. Defaults to 720px.
   */
  height?: number | string;
};

/**
 * Lightweight Calendly inline embed without external dependency.
 * Injects Calendly script once and renders the inline scheduling widget.
 */
export default function CalendlyInline({
  url = 'https://calendly.com/bradfordinformedguidance',
  height = 720,
}: CalendlyInlineProps) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (loadedRef.current) return;

    const existing = document.querySelector<HTMLScriptElement>('script[src*="assets/calendly.com/assets/external/widget.js"]');
    if (existing) {
      loadedRef.current = true;
      return;
    }

    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    s.onload = () => {
      loadedRef.current = true;
    };
    document.head.appendChild(s);

    return () => {
      // Keep script since multiple pages use it; no cleanup
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-lg border border-slate-200"
      data-url={url}
      style={{ minWidth: 320, height }}
      aria-label="Calendly inline scheduler"
    />
  );
}