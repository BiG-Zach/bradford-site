import * as React from "react";

/**
 * BrandGrade
 * Subtle brand-color film that harmonizes imagery with the emerald/sky palette.
 * Use on top of photos with blend modes and a soft vignette.
 */
type BrandGradeProps = {
  strength?: number; // 0..100
  variant?: "emeraldSky" | "skyEmerald" | "clean";
  className?: string;
};

export default function BrandGrade({
  strength = 100,
  variant = "emeraldSky",
  className,
}: BrandGradeProps) {
  const opacity = Math.min(100, Math.max(0, strength)) / 100;
  const gradient =
    variant === "skyEmerald"
      ? "from-sky-500/60 via-emerald-500/35 to-emerald-700/50"
      : "from-emerald-600/60 via-sky-500/35 to-sky-700/50";

  return (
    <div className={className}>
      <div className={`absolute inset-0 bg-gradient-to-tr ${gradient}`} style={{ opacity }} />
      <div className="absolute inset-0 bg-[radial-gradient(130%_80%_at_50%_60%,rgba(0,0,0,.25),transparent_65%)]" style={{ opacity: opacity * 0.6 }} />
      <div className="absolute inset-0 mix-blend-soft-light" />
    </div>
  );
}