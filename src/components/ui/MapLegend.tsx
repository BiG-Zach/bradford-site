import { STATE_STATUS, type StateCode } from "../ExpansionTracker/data";
export default function MapLegend() {
  const items = [
    { key:'available', label:'Available now', dot:'bg-emerald-500 ring-emerald-300' },
    { key:'comingSoon', label:'Coming soon', dot:'bg-sky-500 ring-sky-300' },
    { key:'notAvailable', label:'Not available', dot:'bg-slate-300 ring-slate-200' },
  ];
  return (
    <div className="flex items-center gap-4 text-sm">
      {items.map(i=>(
        <div key={i.key} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ring-2 ${i.dot}`} />
          <span>{i.label}</span>
        </div>
      ))}
    </div>
  );
}