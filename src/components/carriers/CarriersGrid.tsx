import React from "react";
import CarrierCard from "./CarrierCard";

type Carrier = {
  name: string;
  logo: string;
  tagline?: string;
  tags?: string[];
};

const ITEMS: Carrier[] = [
  { name: "Aetna", logo: "/logos/carriers/aetna.webp", tagline: "PPO Network", tags: ["ppo"] },
  { name: "Aflac", logo: "/logos/carriers/aflac.webp", tagline: "Supplemental Coverage", tags: ["supplemental"] },
  { name: "Allstate Health Solutions", logo: "/logos/carriers/allstate.webp", tagline: "PPO Network", tags: ["ppo"] },
  { name: "Americo", logo: "/logos/carriers/americo.webp", tagline: "Life Insurance", tags: ["life"] },
  { name: "Blue Cross Blue Shield", logo: "/logos/carriers/bluecrossblueshield.png", tagline: "PPO Network", tags: ["ppo", "bcbs"] },
  { name: "Cigna", logo: "/logos/carriers/cigna.webp", tagline: "PPO Network", tags: ["ppo"] },
  { name: "First Health", logo: "/logos/carriers/firsthealth.webp", tagline: "PPO Network", tags: ["ppo"] },
  { name: "MultiPlan", logo: "/logos/carriers/multiplan.webp", tagline: "PPO Network", tags: ["ppo"] },
  { name: "Mutual of Omaha", logo: "/logos/carriers/mutualofomaha.webp", tagline: "Life & Health", tags: ["life", "health"] },
  { name: "PAL (Philadelphia American Life)", logo: "/logos/carriers/pal.webp", tagline: "Health", tags: ["health", "pal"] },
  { name: "SGIC", logo: "/logos/carriers/sgic.webp", tagline: "Health", tags: ["health"] },
  { name: "UnitedHealthcare", logo: "/logos/carriers/unitedhealthcare.webp", tagline: "PPO Network", tags: ["ppo", "uhc"] },
];

export default function CarriersGrid() {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(
    () =>
      ITEMS.filter((c) =>
        [c.name, c.tagline ?? "", ...(c.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [q]
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
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Filter carriers"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {filtered.map((c) => (
            <CarrierCard key={c.name} {...c} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          All carriers are A+ rated with AM Best. We don’t use discount plans or limited networks.
        </p>
      </div>
    </section>
  );
}
