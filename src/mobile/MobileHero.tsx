import React from "react";
import HeroForm from "../components/HeroForm";

export default function MobileHero() {
  return (
    <section
      className="px-4 pt-[calc(var(--header-h,56px)+env(safe-area-inset-top))] pb-6"
      aria-label="Mobile hero"
    >
      <h1 className="text-[clamp(26px,5vw,34px)] leading-[1.15] tracking-[-0.01em] font-extrabold mb-2">
        Private Health & Life Guidance
      </h1>
      <p className="text-slate-600 mb-4">Clear. Fast. Year-round.</p>

      {/* Render the existing desktop form (no logic changes).
          Note: The form inside HeroForm already has id="mobileQuoteForm". */}
      <HeroForm />

      {/* Sentinel for sticky CTA */}
      <div data-hero-sentinel style={{ height: 1 }} />
    </section>
  );
}