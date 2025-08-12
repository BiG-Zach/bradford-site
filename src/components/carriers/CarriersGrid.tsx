import * as React from 'react';
type Logo = { key: string; name: string; alt: string; src: string; tags?: string[] };

const LOGOS: Logo[] = [
  { key: 'aetna', name: 'Aetna', alt: 'Aetna — PPO Network', src: '/logos/carriers/aetna.webp', tags: ['ppo'] },
  { key: 'aflac', name: 'Aflac', alt: 'Aflac — Supplemental Coverage', src: '/logos/carriers/aflac.webp', tags: ['supplemental'] },
  { key: 'allstate', name: 'Allstate Health Solutions', alt: 'Allstate Health Solutions — PPO Network', src: '/logos/carriers/allstate.webp', tags: ['ppo'] },
  { key: 'americo', name: 'Americo', alt: 'Americo — Life Insurance', src: '/logos/carriers/americo.webp', tags: ['life'] },
  { key: 'bcbs', name: 'Blue Cross Blue Shield', alt: 'Blue Cross Blue Shield — PPO Network', src: '/logos/carriers/bluecrossblueshield.png', tags: ['ppo','bcbs'] },
  { key: 'cigna', name: 'Cigna', alt: 'Cigna — PPO Network', src: '/logos/carriers/cigna.webp', tags: ['ppo'] },
  { key: 'firsthealth', name: 'First Health', alt: 'First Health — PPO Network', src: '/logos/carriers/firsthealth.webp', tags: ['ppo'] },
  { key: 'multiplan', name: 'MultiPlan', alt: 'MultiPlan — PPO Network', src: '/logos/carriers/multiplan.webp', tags: ['ppo'] },
  { key: 'mof', name: 'Mutual of Omaha', alt: 'Mutual of Omaha — Life & Health', src: '/logos/carriers/mutualofomaha.webp', tags: ['life','health'] },
  { key: 'pal', name: 'PAL (Philadelphia American Life)', alt: 'PAL — Health', src: '/logos/carriers/pal.webp', tags: ['health'] },
  { key: 'sgic', name: 'SGIC', alt: 'SGIC — Health', src: '/logos/carriers/sgic.webp', tags: ['health'] },
  { key: 'uhc', name: 'UnitedHealthcare', alt: 'UnitedHealthcare — PPO Network', src: '/logos/carriers/unitedhealthcare.webp', tags: ['ppo','uhc'] }
];

export default function CarriersGrid() {
  const [q, setQ] = React.useState('');
  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return LOGOS;
    return LOGOS.filter(c => [c.name, c.alt, ...(c.tags||[])].join(' ').toLowerCase().includes(query));
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Our Carrier Partners</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter carriers…"
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="filter carriers"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {filtered.map((c) => (
          <div key={c.key} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full h-20 flex items-center justify-center">
            <img src={c.src} alt={c.alt} className="max-h-12 w-auto object-contain" loading="lazy" height={48} />
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-600">
        All carriers are A+ rated with AM Best. We don’t use discount plans or limited networks.
      </p>
    </div>
  );
}
