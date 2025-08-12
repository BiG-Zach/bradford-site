import ProviderLookupLinks from "../components/marketing/ProviderLookupLinks";
import CarrierDirectory from "../components/marketing/CarrierDirectory";
import { BRAND } from "../lib/brand";

export default function CarriersPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-12">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Carriers & Networks</h1>
        <p className="text-ink-1/70 mt-2">Start with a provider lookup, then browse who we work with.</p>
      </header>

      <ProviderLookupLinks />

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Who we work with</h2>
        <CarrierDirectory />
      </section>

      <div className="mt-8 text-sm text-ink-1/70">
        Prefer a human? <a className="underline" href={BRAND.phoneTel} data-gtm={`${BRAND.gtm.call}_carriers`}>Call {BRAND.phoneHuman}</a>.
      </div>
    </main>
  );
}