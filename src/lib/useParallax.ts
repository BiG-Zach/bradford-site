import * as React from "react";

/**
 * useParallax — tiny, motion-safe parallax hook.
 * Attach `ref` to the container; apply translate3d to the moving layer.
 */
export function useParallax(strength = 0.18, max = 40) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;

    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      const value = Math.max(-max, Math.min(max, -centerOffset * strength * 0.1));
      raf = requestAnimationFrame(() => setY(value));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength, max]);

  return { ref, y };
}