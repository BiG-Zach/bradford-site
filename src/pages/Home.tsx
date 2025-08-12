import QuoteQuickstart from "../components/forms/QuoteQuickstart";
import LogoRail from "../components/marketing/LogoRail";
import TestimonialsGrid from "../components/social/TestimonialsGrid";
import USAvailability from "../components/marketing/USAvailability";
import StickyCTA from "../components/global/StickyCTA";
import { BRAND } from "../lib/brand";

const logos = [
  { src: "/logos/aetna.webp", alt: "Aetna health insurance carrier" },
  { src: "/logos/cigna.webp", alt: "Cigna health insurance carrier" },
  { src: "/logos/americo.webp", alt: "Americo life insurance carrier" },
  { src: "/logos/multiplan.webp", alt: "MultiPlan PPO network provider" },
  { src: "/logos/allstate.webp", alt: "Allstate Health Solutions insurance carrier" },
  { src: "/logos/uhc.webp", alt: "UnitedHealthcare insurance carrier" },
  { src: "/logos/palic.webp", alt: "Philadelphia American Life Insurance Company" },
  { src: "/logos/firsthealth.webp", alt: "First Health Network PPO provider" },
  { src: "/logos/sgic.webp", alt: "SGIC health insurance carrier" },
  { src: "/logos/mutualofomaha.webp", alt: "Mutual of Omaha insurance carrier" },
  { src: "/logos/aflac.webp", alt: "Aflac supplemental insurance" },
  // TODO: Add Aflac and Blue Cross Blue Shield logos once the actual .webp files are added to src/assets/logos/
  // { src: "/logos/aflac.webp", alt: "Aflac supplemental insurance carrier" },
  // { src: blueCrossLogo, alt: "Blue Cross Blue Shield health insurance carrier" },
];

export default function Home() {
  return (
    <main className="relative">
      <section
        className="relative w-full min-h-[82vh] md:min-h-[84vh] overflow-hidden hero-bg-force"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
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
              <QuoteQuickstart/>
            </div>
          </div>
        </div>

        {/* Mobile: form anchored bottom */}
        <div className="absolute bottom-0 inset-x-0 pb-4 md:hidden px-4">
          <QuoteQuickstart/>
        </div>
      </section>

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