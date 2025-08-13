export default function MobileHome() {
  return (
    <main className="relative">
      <section
        className="min-h-[72vh] flex items-center justify-center bg-gradient-to-b from-white to-neutral-50 px-4 pt-[calc(var(--header-h,56px)+env(safe-area-inset-top))]"
        aria-label="Mobile Hero"
      >
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-[clamp(24px,6vw,32px)] font-bold leading-tight tracking-[-0.01em] text-slate-900">
            Private Health & Life Guidance
          </h1>
          <p className="mt-2 text-slate-600">
            Mobile UI scaffold in progress — placeholder content.
          </p>
        </div>
      </section>

      {/* Hero sentinel for sticky CTA visibility */}
      <div data-hero-sentinel style={{ height: 1 }} />

      <section className="py-8">
        <div className="px-4 text-center text-sm text-slate-600">
          Mobile sections will be implemented in subsequent passes.
        </div>
      </section>
    </main>
  );
}