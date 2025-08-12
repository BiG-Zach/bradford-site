import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  bgUrl?: string;                 // optional image; otherwise gradient band
  children?: React.ReactNode;     // optional right-side content
};

export default function PageHero({ title, subtitle, bgUrl, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <header className="relative isolate overflow-hidden">
      <div className="relative min-h-[36vh] md:min-h-[42vh]">
        {bgUrl ? (
          <img src={bgUrl} alt="" className="absolute inset-0 z-0 h-full w-full object-cover" loading="eager" />
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-700 to-sky-700" />
        )}

        {/* readability scrims */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_50%,rgba(0,0,0,.28),transparent_60%),radial-gradient(120%_60%_at_100%_50%,rgba(0,0,0,.28),transparent_60%)]" />
        </div>

        <div className="absolute inset-0 z-30 grid md:grid-cols-2 place-items-center px-4 md:px-6">
          <div className="w-full max-w-3xl rounded-2xl bg-black/45 backdrop-blur-md ring-1 ring-white/15 shadow-[0_10px_40px_rgba(0,0,0,.55)] px-6 py-6 md:px-8 md:py-8">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-white [text-shadow:_0_0_3px_rgba(0,0,0,.9),0_0_8px_rgba(0,0,0,.7)]"
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className="mt-3 text-white/95 md:text-lg [text-shadow:_0_0_2px_rgba(0,0,0,.85),0_0_6px_rgba(0,0,0,.7)]"
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {children ? <div className="hidden md:block w-full">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}