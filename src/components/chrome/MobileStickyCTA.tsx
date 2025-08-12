import * as React from "react";

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] md:hidden bg-white/95 backdrop-blur border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-3">
        <a href="tel:+1-XXX-XXX-XXXX" className="flex-1 inline-flex items-center justify-center rounded-xl ring-1 ring-slate-300 px-4 py-3 font-medium">
          Call Now
        </a>
        <a href="/quote" className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-4 py-3 font-medium shadow hover:bg-emerald-500">
          Get My Quote
        </a>
      </div>
    </div>
  );
}