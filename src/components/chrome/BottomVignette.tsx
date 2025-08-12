import * as React from "react";
import { useScrollProgress } from "../../lib/useScrollProgress";
import { useReducedMotion } from "framer-motion";

/**
 * BottomVignette
 * A soft, fixed gradient at the bottom of the viewport that fades in
 * as you approach the end of the page, making the footer "emerge".
 */
export default function BottomVignette() {
  const p = useScrollProgress();     // 0..1 over the whole page
  const reduce = useReducedMotion();

  // Only show during the last quarter of the page.
  // When p <= 0.75 -> 0, when p >= 1.0 -> 1
  const tail = Math.min(1, Math.max(0, (p - 0.75) / 0.25));
  const opacity = reduce ? 0.8 * tail : tail; // slightly softer if motion is reduced

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 bottom-0 z-[70] pointer-events-none footer-vignette"
      style={{ opacity }}
    />
  );
}