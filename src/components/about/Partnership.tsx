import * as React from "react";
import Section from "../layout/Section";
import { useReducedMotion } from "framer-motion";
import { useParallax } from "../../lib/useParallax";
import Magnetic from "../ui/Magnetic";
import MicroTilt from "../effects/MicroTilt";

/**
 * Diagonal split partnership banner with micro parallax on the image panel.
 */
export default function Partnership() {
  const reduce = useReducedMotion();
  // Gentle, capped parallax. We'll move opposite the scroll (-y) and a hint of x.
  const { ref, y } = useParallax(0.16, 36);

  // Map vertical offset to a tiny horizontal shift for extra depth.
  const x = reduce ? 0 : y * -0.25;
  const yOut = reduce ? 0 : y * -1; // counter-motion

  return (
    <Section className="relative">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 to-sky-700 text-white shadow-xl ring-1 ring-white/10">
        <div className="relative grid md:grid-cols-2 gap-0">
          {/* Left: Content */}
          <div className="relative z-10 p-6 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/25">
              IN PARTNERSHIP
            </div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              Best Insurance Group (BiG)
            </h2>
            <p className="mt-2 text-white/90 max-w-prose">
              We're proud to partner with Best Insurance Group, an industry-leading field marketing
              organization serving families, individuals, and entrepreneurs with transparency, choice,
              and tailored service.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="/carriers"
                  data-gtm="about-partnership-primary"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-emerald-800 font-medium shadow-lg hover:shadow-xl active:scale-[.99] transition"
                >
                  Explore Our Carriers
                </a>
              </Magnetic>
              <Magnetic strength={10}>
                <span className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-white/30 text-white/90">
                  ● Transparent. Tailored. Trusted.
                </span>
              </Magnetic>
            </div>
          </div>

          {/* Right: Diagonal Visual Panel (hidden on small screens) */}
          <div className="relative hidden md:block">
            {/* MicroTilt wraps the parallaxed inner panel so effects layer cleanly */}
            <MicroTilt className="absolute inset-0">
              <div
                ref={ref}
                className="absolute inset-0 clip-diagonal-left overflow-hidden will-change-transform"
                style={{ transform: reduce ? undefined : `translate3d(${x}px, ${yOut}px, 0) scale(1.03)` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-70"
                  style={{ backgroundImage: 'url("/about/partners-bg.jpg")' }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/40 via-sky-500/25 to-sky-700/40" aria-hidden="true" />
                <div className="absolute inset-0 sheen-diagonal pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 noise-fine opacity-[0.10]" aria-hidden="true" />
              </div>
            </MicroTilt>
          </div>
        </div>
      </div>
    </Section>
  );
}