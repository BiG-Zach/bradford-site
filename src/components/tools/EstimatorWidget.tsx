import { useState } from "react";

export default function EstimatorWidget() {
  const [zip, setZip] = useState(""); const [age, setAge] = useState(""); const [health, setHealth] = useState<"great"|"good"|"mixed">("good");
  const [result, setResult] = useState<{fit: string; confidence: number} | null>(null);
  const estimate = (e: React.FormEvent) => {
    e.preventDefault();
    const conf = health === "great" ? 0.9 : health === "good" ? 0.75 : 0.5;
    const fit = conf >= 0.75 ? "Likely PPO fit" : "Let's talk options";
    setResult({ fit, confidence: Math.round(conf*100) });
  };
  return (
    <div className="glass p-4 md:p-5">
      <form onSubmit={estimate} className="grid sm:grid-cols-3 gap-3">
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">ZIP</span>
          <input value={zip} onChange={e=>setZip(e.target.value)} required className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500"/>
        </label>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Age</span>
          <input value={age} onChange={e=>setAge(e.target.value)} required className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500"/>
        </label>
        <label className="flex flex-col gap-1"><span className="text-sm font-medium">Health snapshot</span>
          <select value={health} onChange={e=>setHealth(e.target.value as any)} className="rounded-xl border px-3 py-2 focus:ring-2 focus:ring-brand-sky-500">
            <option value="great">Great</option><option value="good">Good</option><option value="mixed">Mixed</option>
          </select>
        </label>
        <button className="btn-primary sm:col-span-3" type="submit">Check Fit</button>
      </form>
      {result && (
        <div className="mt-4 p-3 rounded-xl border bg-white/70">
          <p className="text-sm"><strong>{result.fit}</strong> • Confidence ~{result.confidence}%</p>
          <a href="/lead" className="btn-primary mt-3 inline-flex" data-gtm="cta_quote_estimator">Start Pre-Check</a>
        </div>
      )}
      <p className="text-xs text-ink-1/70 mt-2">This is an estimate, not a guarantee. A short pre-check confirms eligibility.</p>
    </div>
  );
}