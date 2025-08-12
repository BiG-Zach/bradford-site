type StateKey = 'FL' | 'MI' | 'NC';

const STATES: Record<StateKey, { name: string; path: string; href: string }> = {
  FL: { name: 'Florida', path: '/states/florida', href: '/states/florida' },
  MI: { name: 'Michigan', path: '/states/michigan', href: '/states/michigan' },
  NC: { name: 'North Carolina', path: '/states/north-carolina', href: '/states/north-carolina' },
};

export default function CoverageMap() {
  return (
    <section className="section bg-white" aria-label="Coverage states">
      <div className="container-default">
        <h2 className="h2 mb-4">Coverage Areas</h2>
        <p className="lead mb-6">Currently licensed in Florida, Michigan, and North Carolina — with more states coming soon.</p>

        <div className="rounded-lg border border-slate-200 p-4 overflow-x-auto">
          <svg
            viewBox="0 0 960 600"
            role="img"
            aria-label="Map highlighting Florida, Michigan, and North Carolina"
            className="w-full h-auto"
          >
            {/* Simplified shapes (not geographically precise). Replace with precise SVG later if desired */}
            <a href={STATES.FL.href} aria-label="Florida">
              <path d="M770,420 l 130,0 l 0,40 l -120,0 l -10,-40 z" className="fill-sky-200 stroke-sky-600 hover:fill-sky-300" />
            </a>
            <a href={STATES.MI.href} aria-label="Michigan">
              <path d="M520,120 l 60,0 l 40,40 l -20,60 l -80,0 l 0,-100 z" className="fill-sky-200 stroke-sky-600 hover:fill-sky-300" />
            </a>
            <a href={STATES.NC.href} aria-label="North Carolina">
              <path d="M620,320 l 200,0 l 60,20 l -40,20 l -220,0 l 0,-40 z" className="fill-sky-200 stroke-sky-600 hover:fill-sky-300" />
            </a>
          </svg>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {Object.entries(STATES).map(([code, s]) => (
              <a
                key={code}
                href={s.href}
                className="rounded-lg border border-slate-200 p-3 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{s.name}</span>
                <span aria-hidden="true" className="text-slate-400">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}