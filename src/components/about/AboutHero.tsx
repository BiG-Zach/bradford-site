import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../layout/Section";
import BrandGrade from "../media/BrandGrade";
import { useParallax } from "../../lib/useParallax";
import { useScrollProgress } from "../../lib/useScrollProgress";

const HAS_MULTI = false; // set to true when you add @1x/@2x webp/jpg
const SINGLE_FALLBACK = "/about/bridge-hero.jpg"; // drop one image here for now
const LQIP = "/about/bridge-hero.lqip.jpg"; // optional tiny blur

// multi-source names (only used if HAS_MULTI === true)
const JPG1X = "/about/bridge-hero@1x.jpg";
const JPG2X = "/about/bridge-hero@2x.jpg";
const WEBP1X = "/about/bridge-hero@1x.webp";
const WEBP2X = "/about/bridge-hero@2x.webp";

export default function AboutHero() {
  const prefersReducedMotion = useReducedMotion();
  const { ref, y } = useParallax(0.2, 48);
  const page = useScrollProgress(); // 0..1 over the whole page
  const [imgError, setImgError] = React.useState(false);

  // Scroll-reactive strength: 75 → 95 as user scrolls
  const strength = prefersReducedMotion ? 85 : Math.round(75 + page * 20);

  const Content = (
    <div className="mx-auto max-w-4xl px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,.65)]">
        Guidance You Can Trust.<br className="hidden md:block" /> Protection You Can Rely On.
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-[0_3px_14px_rgba(0,0,0,.5)]">
        We help self-employed professionals, families, and early retirees make confident insurance decisions.
        Licensed in FL, MI, and NC — expanding nationwide.
      </p>
    </div>
  );

  return (
    <Section as="header" className="relative isolate px-0 py-0">
      <div ref={ref} className="relative w-full min-h-[52vh] md:min-h-[58vh] overflow-hidden">
        {/* Parallax layer */}
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: prefersReducedMotion ? undefined : `translate3d(0, ${y}px, 0)` }}
        >
          {/* If multi-source assets exist and no error, use <picture>. Otherwise, use single fallback or just let BrandGrade carry the visual. */}
          {!imgError && HAS_MULTI ? (
            <picture>
              <source type="image/webp" srcSet={`${WEBP1X} 1600w, ${WEBP2X} 2400w`} sizes="100vw" />
              <source type="image/jpeg" srcSet={`${JPG1X} 1600w, ${JPG2X} 2400w`} sizes="100vw" />
              <img
                src={JPG1X}
                alt=""
                className="block h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                onError={() => setImgError(true)}
                style={LQIP ? { backgroundImage: `url(${LQIP})`, backgroundSize: "cover", backgroundPosition: "50% 50%" } : undefined}
              />
            </picture>
          ) : SINGLE_FALLBACK && !imgError ? (
            <img
              src={SINGLE_FALLBACK}
              alt=""
              className="block h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              onError={() => setImgError(true)}
              style={LQIP ? { backgroundImage: `url(${LQIP})`, backgroundSize: "cover", backgroundPosition: "50% 50%" } : undefined}
            />
          ) : (
            // final graceful fallback (no image)
            <div className="h-full w-full bg-gradient-to-b from-slate-200 to-slate-400" />
          )}
        </div>

        {/* Scroll-reactive BrandGrade */}
        <BrandGrade className="absolute inset-0 z-10 pointer-events-none" strength={strength} variant="emeraldSky" />
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_50%,rgba(0,0,0,.28),transparent_60%),radial-gradient(120%_60%_at_100%_50%,rgba(0,0,0,.28),transparent_60%)]" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-30 grid place-items-end">
          <div className="w-full pb-10 md:pb-14">
            {prefersReducedMotion ? (
              Content
            ) : (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
                {Content}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}