import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../layout/Section";

const HERO_SRC = "/hero-family.webp";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const Content = (
    <div className="relative z-[60] mx-auto max-w-3xl">
      <div className="rounded-2xl bg-black/65 backdrop-blur-md ring-1 ring-white/15 shadow-[0_10px_40px_rgba(0,0,0,.55)] px-6 py-6 md:px-8 md:py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white [text-shadow:_0_0_3px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.7),0_0_12px_rgba(0,0,0,0.6),0_1px_0px_rgba(255,255,255,0.2)]">
          Smarter Health & Life <br className="hidden md:block" /> Insurance
        </h1>
        <p className="mt-3 text-lg md:text-xl leading-relaxed text-white [text-shadow:_0_0_2px_rgba(0,0,0,0.85),0_0_6px_rgba(0,0,0,0.7)]">
          Clear, affordable options for self-employed, families, and early retirees.
          Licensed in FL, MI, and NC — expanding nationwide.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="/contact" data-gtm="hero-cta-schedule" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow-lg shadow-emerald-900/25 hover:bg-emerald-500 active:scale-[.99] transition">
            Schedule Free Consultation
          </a>
          <a href="/#options" data-gtm="hero-cta-options" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-white/95 ring-1 ring-white/35 hover:bg-white/10 active:scale-[.99] transition">
            See Your Options
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <Section as="header" className="relative isolate overflow-clip px-0 py-0">
      {/* DEBUG CHIP — proves we're in the right file; remove later */}
      <div className="absolute left-3 top-3 z-[70] rounded-full bg-black/60 px-3 py-1 text-xs text-white">HERO ACTIVE</div>

      <div className="relative h-[62vh] min-h-[460px] w-full">
        {/* Background image */}
        <img src={HERO_SRC} alt="" className="absolute inset-0 z-0 h-full w-full object-cover" loading="eager" fetchPriority="high" />

        {/* Overlays (high z-index to guarantee on top of image) */}
        <div className="pointer-events-none absolute inset-0 z-[30]">
          {/* left/right vignettes */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_50%,rgba(0,0,0,.30),transparent_60%),radial-gradient(120%_60%_at_100%_50%,rgba(0,0,0,.30),transparent_60%)]" />
          {/* bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
          {/* top fade */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/25 to-transparent" />
          {/* center focus vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_58%,rgba(0,0,0,.40),rgba(0,0,0,.25)_35%,transparent_70%)]" />
        </div>

        {/* Content (highest) */}
        <div className="absolute inset-0 z-[50] grid place-items-center px-4 md:px-6">
          {prefersReducedMotion ? (
            Content
          ) : (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
              {Content}
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}