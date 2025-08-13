import * as React from "react";

type Props = {
  name: string;
  logo: string;      // /logos/... path from /public
  tagline?: string;
};

export default function CarrierCard({ name, logo, tagline }: Props) {
  return (
    <div className="group rounded-2xl ring-1 ring-slate-200/70 bg-white p-4 md:p-5 hover:shadow-lg/20 transition">
      <div className="flex items-center gap-3">
        {/* Mobile-only CLS-safe fixed ratio box */}
        <div className="relative h-10 aspect-[3/1] shrink-0 md:hidden">
          <img
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none"
          />
        </div>
        {/* Desktop-only original behavior (unchanged) */}
        <img
          src={logo}
          alt={`${name} logo`}
          className="hidden md:block h-10 w-auto object-contain pointer-events-none select-none"
          loading="lazy"
          decoding="async"
        />
        <div>
          <div className="font-medium text-slate-800">{name}</div>
          {tagline && <div className="text-sm text-slate-500">{tagline}</div>}
        </div>
      </div>
    </div>
  );
}
