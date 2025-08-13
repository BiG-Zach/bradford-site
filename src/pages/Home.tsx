import HeroForm from "../components/HeroForm";
import QuoteQuickstart from "../components/forms/QuoteQuickstart";
import LogoRail from "../components/marketing/LogoRail";
import TestimonialsGrid from "../components/social/TestimonialsGrid";
import USAvailability from "../components/marketing/USAvailability";
import StickyCTA from "../components/global/StickyCTA";
import { BRAND } from "../lib/brand";

const logos = [
  { src: "/logos/carriers/aetna.webp", alt: "Aetna health insurance carrier" },
  { src: "/logos/carriers/cigna.webp", alt: "Cigna health insurance carrier" },
  { src: "/logos/carriers/americo.webp", alt: "Americo life insurance carrier" },
  { src: "/logos/carriers/multiplan.webp", alt: "MultiPlan PPO network provider" },
  { src: "/logos/carriers/allstate.webp", alt: "Allstate Health Solutions insurance carrier" },
  { src: "/logos/carriers/unitedhealthcare.webp", alt: "UnitedHealthcare insurance carrier" },
  { src: "/logos/carriers/firsthealth.webp", alt: "First Health PPO network provider" },
  { src: "/logos/carriers/bluecrossblueshield.png", alt: "Blue Cross Blue Shield" },
  { src: "/logos/carriers/sgic.webp", alt: "Southern Guaranty Insurance Company (SGIC)" },
  { src: "/logos/carriers/mutualofomaha.webp", alt: "Mutual of Omaha life insurance" },
  { src: "/logos/carriers/pal.webp", alt: "Philadelphia American Life (PAL)" },
  { src: "/logos/carriers/aflac.webp", alt: "Aflac supplemental" }
];

export default function Home() {
  return (
    <main className="relative">
      <section
        className="relative w-full min-h-[82vh] md:min-h-[84vh] overflow-hidden hero-bg-force pt-[calc(var(--header-h,56px)+env(safe-area-inset-top))]"
        aria-label="Hero"
      >
        {/* BACKGROUND IMAGE — ONLY LAYER */}
        <img
          src="/hero-family.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: "center center" }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(26px,5vw,34px)] md:text-5xl lg:text-6xl leading-[1.15] tracking-[-0.01em] mb-[10px] font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                Private Health & Life Guidance. Clear. Fast. Year-Round.
              </h1>
              <p className="mt-3 text-white/90 text-lg">
                Licensed in {BRAND.licensed} • NPN {BRAND.npn} • Medically underwritten options with PPO networks.
              </p>
              <div className="mt-5 flex gap-3">
                <a href="/lead" className="btn-primary" data-gtm={`${BRAND.gtm.quote}_home`}>Get My Quote</a>
                <a href={BRAND.phoneTel} className="btn-secondary" data-gtm={`${BRAND.gtm.call}_home`}>Call Now</a>
              </div>
              <div className="mt-5 text-white/85 text-sm">Avg first options in 45–90 mins • {BRAND.hours}</div>
            </div>

            <div className="hidden md:block">
              <HeroForm/>
            </div>
          </div>
        </div>

        {/* Mobile: form anchored bottom */}
        <div id="mobileQuoteForm" className="absolute bottom-0 inset-x-0 pb-4 md:hidden px-4">
          <HeroForm/>
        </div>
      </section>
      {/* Hero sentinel for sticky CTA visibility */}
      <div data-hero-sentinel style={{ height: 1 }} />

      <section className="py-10 md:py-12 bg-band">
        <div className="container mx-auto px-4">
          <p className="text-sm mb-3 text-ink-1/70">Carriers & PPO networks we work with</p>
          <LogoRail logos={logos}/>
        </div>
      </section>

      <USAvailability />

      <TestimonialsGrid />

      <StickyCTA/>
    </main>
  );
}