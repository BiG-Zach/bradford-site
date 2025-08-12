import * as React from "react";
import { useScrollProgress } from "../../lib/useScrollProgress";
import { useReducedMotion } from "framer-motion";

/** Thin, brand gradient progress bar fixed at the top. */
export default function PageProgressBar() {
  const p = useScrollProgress();
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[80] h-[3px] bg-transparent"
    >
      <div
        className="origin-left h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(16,185,129,.35)]"
        style={{
          transform: `scaleX(${p})`,
          transition: reduce ? "none" : "transform 60ms linear",
        }}
      />
    </div>
  );
}