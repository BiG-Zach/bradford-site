import { BRAND } from "../lib/brand";
import TestimonialReel from "../components/social/TestimonialReel";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-12">
      <section className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
        <img src="/about/portrait.webp" alt="Zachary Bradford" width="600" height="720" className="w-full h-auto rounded-2xl shadow-xl" loading="lazy"/>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Clarity → Confidence → Action</h1>
          <p className="mt-3 text-ink-1/80">
            Independent broker, directly appointed with major carriers. Licensed in {BRAND.licensed}. We tell the truth, do the math, and keep it human.
          </p>
          <ul className="mt-4 text-sm space-y-1">
            <li>NPN {BRAND.npn}</li>
            <li>{BRAND.hours}</li>
            <li><a href={BRAND.phoneTel} className="underline">{BRAND.phoneHuman}</a> • <a href={`mailto:${BRAND.email}`} className="underline">{BRAND.email}</a></li>
          </ul>
        </div>
      </section>

      <section className="mt-10 glass p-4">
        <h2 className="font-semibold">What I believe</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div className="p-3 rounded-xl bg-white/70 border"><h3 className="font-medium">Tell the truth</h3><p className="text-sm text-ink-1/70">Straight answers beat jargon—always.</p></div>
          <div className="p-3 rounded-xl bg-white/70 border"><h3 className="font-medium">Do the math</h3><p className="text-sm text-ink-1/70">Lower total cost beats low sticker price.</p></div>
          <div className="p-3 rounded-xl bg-white/70 border"><h3 className="font-medium">Keep it human</h3><p className="text-sm text-ink-1/70">You get real help from a real person.</p></div>
        </div>
      </section>

      <section className="mt-10"><TestimonialReel/></section>
    </main>
  );
}