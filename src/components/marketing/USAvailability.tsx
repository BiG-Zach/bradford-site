import { useNavigate } from "react-router-dom";
import USMap from "../ExpansionTracker/USMap";
import { STATE_STATUS, statusLabel, type StateCode } from "../ExpansionTracker/data";
import MapLegend from "../ui/MapLegend";

export default function USAvailability() {
  const nav = useNavigate();
  return (
    <section className="py-10 md:py-12 bg-band">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Where we're live</h2>
          <MapLegend/>
        </div>
        <div className="rounded-2xl overflow-hidden border bg-white/70 p-3">
          <USMap
            getStateAttrs={(code: StateCode) => {
              const status = STATE_STATUS[code];
              const base = status==='available'
                ? 'fill-emerald-500/70 hover:fill-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400'
                : status==='comingSoon'
                ? 'fill-sky-500/60 hover:fill-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400'
                : 'fill-slate-300 hover:fill-slate-400';
              return { className: `${base} stroke-white/70`, title: `${code} — ${statusLabel(code)}` };
            }}
            onActivate={(code)=> nav(`/states/${code}`)}
          />
        </div>
      </div>
    </section>
  );
}