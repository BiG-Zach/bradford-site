import { useState } from "react";
import { BRAND } from "../../lib/brand";

export default function QuoteQuickstart() {
  const [zip, setZip] = useState(""); const [ages, setAges] = useState(""); const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("LeadQuickstart", { zip, ages, email });
    localStorage.setItem("lead:quickstart", JSON.stringify({ zip, ages, email, ts: Date.now() }));
    window.location.href = "/thanks?lead=1";
  };
  return (
    <form onSubmit={submit} className="glass p-4 md:p-5 flex flex-col gap-3 w-full max-w-md border-white/40" aria-describedby="quickstart-help">
      <div className="text-sm text-ink-1/80" id="quickstart-help">Avg first options in 45–90 mins • {BRAND.hours}</div>
      <label className="flex flex-col gap-1"><span className="text-sm font-medium">ZIP Code</span>
        <input inputMode="numeric" pattern="[0-9]*" value={zip} onChange={e=>setZip(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-sky-500"/>
      </label>
      <label className="flex flex-col gap-1"><span className="text-sm font-medium">Ages (comma-separated)</span>
        <input value={ages} onChange={e=>setAges(e.target.value)} placeholder="39, 37" required className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-sky-500"/>
      </label>
      <label className="flex flex-col gap-1"><span className="text-sm font-medium">Email</span>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-sky-500"/>
      </label>
      <button type="submit" data-gtm={`${BRAND.gtm.quote}_quickstart`} className="btn-primary w-full">Start My Pre-Check</button>
      <p className="text-xs text-ink-1/70">By submitting, you agree we may contact you by call, text, or email. No spam. Opt out anytime.</p>
    </form>
  );
}