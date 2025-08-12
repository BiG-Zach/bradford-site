import * as React from "react";

type Props = {
  name: string;
  logo: string;           // src to logo (svg/png/webp)
  tagline?: string;
};

export default function CarrierCard({ name, logo, tagline }: Props) {
  return (
    <div className="group rounded-2xl ring-1 ring-slate-200/70 bg-white p-4 md:p-5 hover:shadow-lg/20 transition will-change-transform">
      <div className="flex items-center gap-3">
        <img src={logo} alt={`${name} logo`} className="h-10 w-auto object-contain pointer-events-none" loading="lazy" />
        <div>
          <div className="font-medium text-slate-800">{name}</div>
          {tagline && <div className="text-sm text-slate-500">{tagline}</div>}
        </div>
      </div>
    </div>
  );
}