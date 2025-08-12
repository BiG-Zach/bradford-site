import { BRAND } from "../lib/brand";
import EstimatorWidget from "../components/tools/EstimatorWidget";

function Step({n,title,desc,time}:{n:number;title:string;desc:string;time:string}) {
  return (
    <div className="p-4 rounded-2xl border bg-white/80">
      <div className="text-xs uppercase tracking-wide text-ink-1/60">Step {n}</div>
      <h3 className="mt-1 font-semibold">{title}</h3>
      <p className="text-sm text-ink-1/70 mt-1">{desc}</p>
      <div className="mt-2 inline-flex items-center gap-2 text-xs px-2 py-1 rounded-full bg-slate-100">
        <span>⏱</span><span>{time}</span>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-12">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">How it works</h1>
        <p className="text-ink-1/70 mt-2">Clarity → Confidence → Action. Real guidance, zero fluff.</p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <Step n={1} title="Rapid pre-check" desc="Tell us your basics, doctors, and priorities." time="5–10 minutes"/>
        <Step n={2} title="Best-fit options" desc="We compare PPO networks and total cost—then shortlist." time="45–90 minutes same day"/>
        <Step n={3} title="Enroll with a human" desc="We finalize together so nothing is missed." time="15–20 minutes"/>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Quick fit check</h2>
        <EstimatorWidget/>
      </section>

      <section className="mt-8 p-4 rounded-2xl border bg-white/80">
        <h3 className="font-semibold">Eligibility & expectations</h3>
        <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
          <li>Medically underwritten • Available year-round.</li>
          <li>We try to keep your current doctors where possible.</li>
          <li>If a PPO isn't a fit, we'll offer alternatives with clear pros/cons.</li>
        </ul>
        <details className="mt-2">
          <summary className="text-sm font-medium">What if I have conditions?</summary>
          <p className="text-sm text-ink-1/70 mt-1">We'll assess options honestly. If underwriting is tough, we pivot—no pressure.</p>
        </details>
        <div className="mt-4 flex gap-3">
          <a href="/lead" className="btn-primary" data-gtm={`${BRAND.gtm.quote}_how`}>Start pre-check</a>
          <a href={BRAND.phoneTel} className="btn-secondary" data-gtm={`${BRAND.gtm.call}_how`}>Call now</a>
        </div>
      </section>
    </main>
  );
}