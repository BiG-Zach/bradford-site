import * as React from "react";

type LogoCardProps = {
  alt: string;
  src: string;
  className?: string;
};

export default function LogoCard({ alt, src, className }: LogoCardProps) {
  return (
    <div
      className={
        "aspect-[3/1] flex items-center justify-center p-4 md:p-5 bg-white rounded-xl ring-1 ring-slate-200 " +
        (className || "")
      }
    >
      <img
        src={src}
        alt={alt}
        className="h-8 md:h-9 object-contain opacity-90 hover:opacity-100 transition"
        loading="lazy"
      />
    </div>
  );
}