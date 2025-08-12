import * as React from "react";
import CarrierCard from "./CarrierCard";

type Carrier = { name: string; logo: string; tagline?: string; tags?: string[] };

type Props = { items: Carrier[] };

export default function CarriersGrid({ items }: Props) {
  const [q, setQ] = React.useState("");
  const filtered = items.filter(c =>
    [c.name, ...(c.tags || [])].join(" ").toLowerCase().includes(q.toLowerCase())
  );
  return (
    <section className="py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Our Carrier Partners</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter carriers…"
            className="rounded-xl ring-1 ring-slate-300 px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
            aria-label="Filter carriers"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((c) => (
            <CarrierCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}