import * as React from "react";
import { useScrollProgress } from "../../lib/useScrollProgress";
import { useReducedMotion } from "framer-motion";
import Section from "../layout/Section";

/**
 * GradientHueBand — a full-width, ultra-subtle brand band whose hue shifts
 * slightly with scroll for a cinematic finish. Motion-safe.
 */
export default function GradientHueBand() {
  const p = useScrollProgress();         // 0..1
  const reduce = useReducedMotion();

  // Map 0..1 to a pleasant emerald->sky hue range (approx 155 -> 205)
  const hue = reduce ? 180 : Math.round(155 + (205 - 155) * p);

  return (
    <Section className="py-12 md:py-16">
      <div
        aria-hidden="true"
        className="rounded-3xl hue-band ring-1 ring-slate-200/60 shadow-sm"
        style={{ ["--band-h" as any]: `${hue}` }}
      >
        {/* Spacer for the visual band */}
        <div className="h-24 md:h-28" />
      </div>
    </Section>
  );
}