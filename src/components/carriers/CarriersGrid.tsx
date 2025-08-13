import * as React from 'react';

type Carrier = { name: string; src: string };

const CARRIERS: Carrier[] = [
  { name: 'Aetna', src: '/logos/carriers/aetna.webp' },
  { name: 'Aflac', src: '/logos/carriers/aflac.webp' },
  { name: 'Allstate', src: '/logos/carriers/allstate.webp' },
  { name: 'Americo', src: '/logos/carriers/americo.webp' },
  { name: 'Cigna', src: '/logos/carriers/cigna.webp' },
  { name: 'Blue Cross Blue Shield', src: '/logos/carriers/bluecrossblueshield.png' },
  { name: 'First Health', src: '/logos/carriers/firsthealth.webp' },
  { name: 'Mutual of Omaha', src: '/logos/carriers/mutualofomaha.webp' },
  { name: 'SGIC', src: '/logos/carriers/sgic.webp' },
  { name: 'Multiplan', src: '/logos/carriers/multiplan.webp' },
  { name: 'PAL', src: '/logos/carriers/pal.webp' },
  { name: 'UnitedHealthcare', src: '/logos/carriers/unitedhealthcare.webp' }
];

export default function CarriersGrid() {
  const [q, setQ] = React.useState('');

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CARRIERS;
    return CARRIERS.filter(c => c.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <section aria-labelledby="carriers-title" className="w-full">
      <h2 id="carriers-title" className="sr-only">Carriers & PPO networks</h2>

      <div className="mb-4">
        <input
          type="search"
          inputMode="search"
          placeholder="Search carriers…"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          style={{ fontSize: '16px', minHeight: '44px' }}
          aria-label="Search carriers"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(({name, src}) => (
          <div
            key={name}
            className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 shadow-sm"
          >
            {/* Mobile: CLS-safe wider ratio; Desktop: unchanged */}
            <div className="relative w-full aspect-[3/1] md:aspect-[2/1]">
              <img
                src={src}
                alt={name}
                width={160}
                height={80}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 text-center text-sm text-slate-700">{name}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        Logos are for identification only. Plan availability varies by state and underwriting.
      </p>
    </section>
  );
}

