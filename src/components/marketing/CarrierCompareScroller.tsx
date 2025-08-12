import BrandGrade from "../shared/BrandGrade";

type Carrier = { name: string; logo: string; networkBreadth: number; costPredictability: number; rxStrength: number; speedToIssue: number; blurb: string; };

export default function CarrierCompareScroller({ carriers }: { carriers: Carrier[] }) {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4">
      <aside className="glass p-3 sticky top-24 h-fit">
        <div className="text-sm font-semibold mb-2">Compare by</div>
        <ul className="text-sm space-y-2">
          <li>Network breadth</li>
          <li>Total cost predictability</li>
          <li>Rx strength</li>
          <li>Speed to issue</li>
        </ul>
      </aside>
      <div className="overflow-x-auto" aria-label="Carrier comparison">
        <div className="min-w-[720px] grid grid-cols-1 gap-4">
          {carriers.map((c,i)=>(
            <div key={i} className="glass p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={c.logo} alt={`${c.name} logo`} width="120" height="48" className="h-10 w-auto" loading="lazy"/>
                <h3 className="text-lg font-semibold">{c.name}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <BrandGrade label="Network breadth" value={c.networkBreadth}/>
                <BrandGrade label="Cost predictability" value={c.costPredictability}/>
                <BrandGrade label="Rx strength" value={c.rxStrength}/>
                <BrandGrade label="Speed to issue" value={c.speedToIssue}/>
              </div>
              <p className="mt-3 text-sm">{c.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}