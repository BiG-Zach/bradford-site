import * as React from "react";

const steps = [
  { k: "Understand", d: "We learn your needs, network preferences, and budget." },
  { k: "Compare", d: "We compare plans from top carriers and PPO networks." },
  { k: "Enroll", d: "Choose confidently and get help with enrollment and next steps." },
];

export default function ProcessTimeline() {
  return (
    <section className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How It Works</h2>
          <p className="text-slate-600 md:text-lg">A clear 3-step path from consult to coverage.</p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 h-[3px] bg-emerald-200/70" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 relative">
            {steps.map((s, i) => (
              <div key={s.k} className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-emerald-600 text-white text-xs grid place-items-center shadow">
                  {i + 1}
                </div>
                <div className="rounded-2xl ring-1 ring-slate-200/70 bg-white p-4 md:p-5 hover:shadow-lg/20 transition">
                  <div className="font-medium">{s.k}</div>
                  <div className="mt-1 text-slate-600 text-sm">{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="/quote"
              data-gtm="how-cta-start"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow-lg hover:bg-emerald-500 active:scale-[.99] transition"
            >
              Start Step 1 Now
            </a>
          </div>
          <p className="mt-3 text-center text-slate-500 text-sm">Free consultation • No obligation • Licensed advisors</p>
        </div>
      </div>
    </section>
  );
}