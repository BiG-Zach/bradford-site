type Item = { name: string; logo: string; bestFor: string[]; note?: string };
const items: Item[] = [
  { name:"Allstate Health Solutions", logo:"/logos/allstate.webp", bestFor:["Nationwide PPO access","Fast issue"], note:"Member tools + support" },
  { name:"UnitedHealthcare", logo:"/logos/uhc.webp", bestFor:["Deep specialist network","Strong Rx"], note:"Broad provider access" },
  { name:"Philadelphia American Life", logo:"/logos/palic.webp", bestFor:["Lower total cost strategies","Flexible riders"] },
  { name:"SGIC", logo:"/logos/sgic.webp", bestFor:["Balanced PPO access","Efficient processing"] },
  { name:"First Health", logo:"/logos/firsthealth.webp", bestFor:["Multi-state coverage","Large PPO footprint"] },
  { name:"Mutual of Omaha", logo:"/logos/mutualofomaha.webp", bestFor:["Life insurance","Living benefits"], note:"Carrier partner" },
  { name:"Aflac", logo:"/logos/aflac.webp", bestFor:["Supplemental benefits","Cash payouts"], note:"Add-on protection" },
];
export default function CarrierDirectory() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((c)=>(
        <article key={c.name} className="p-4 rounded-2xl border bg-white/80">
          <div className="flex items-center gap-3">
            <img src={c.logo} alt={`${c.name} logo`} className="h-8 w-auto" loading="lazy"/>
            <h3 className="font-semibold">{c.name}</h3>
          </div>
          <ul className="mt-3 text-sm list-disc pl-5 space-y-1">
            {c.bestFor.map((b,i)=>(<li key={i}>{b}</li>))}
          </ul>
          {c.note && <p className="text-xs text-ink-1/60 mt-2">{c.note}</p>}
        </article>
      ))}
    </div>
  );
}