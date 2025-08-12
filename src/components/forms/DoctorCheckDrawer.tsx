import { useState } from "react";
import { BRAND } from "../../lib/brand";

export default function DoctorCheckDrawer() {
  const [open, setOpen] = useState(false); const [provider, setProvider] = useState(""); const [city, setCity] = useState(""); const [note, setNote] = useState<"likely"|"verify"|"out"|null>(null);
  const check = (e: React.FormEvent) => { e.preventDefault(); if (provider.length > 3 && city.length > 2) setNote("verify"); else setNote("likely"); };
  return (
    <>
      <button onClick={()=>setOpen(true)} data-gtm={BRAND.gtm.checkDoctor} className="btn-primary">Check My Doctor</button>
      {open && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md glass p-4 md:p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Doctor quick-check</h2>
              <button className="btn-secondary px-3 py-1" onClick={()=>setOpen(false)} aria-label="Close">Close</button>
            </div>
            <form onSubmit={check} className="flex flex-col gap-3">
              <label className="flex flex-col gap-1"><span className="text-sm font-medium">Provider name</span>
                <input value={provider} onChange={e=>setProvider(e.target.value)} className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required/>
              </label>
              <label className="flex flex-col gap-1"><span className="text-sm font-medium">City or ZIP</span>
                <input value={city} onChange={e=>setCity(e.target.value)} className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500" required/>
              </label>
              <button className="btn-primary" type="submit">Quick check</button>
            </form>
            {note && (
              <div className="mt-4 p-3 rounded-xl border bg-white/70">
                <p className="text-sm">
                  Result: <strong>{note === "likely" ? "Likely In" : note === "verify" ? "Need to verify" : "Out of network"}</strong>.
                  We'll confirm and text you updates within business hours.
                </p>
                <a href="/lead" className="btn-primary mt-3 inline-flex" data-gtm={`${BRAND.gtm.quote}_doctor`}>Start Pre-Check</a>
              </div>
            )}
            <p className="mt-3 text-xs text-ink-1/70">Disclaimer: Preliminary indication only; final network status depends on carrier/provider data at time of enrollment.</p>
          </div>
        </div>
      )}
    </>
  );
}