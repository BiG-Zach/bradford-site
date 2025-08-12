export default function BrandGrade({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(10, value)) * 10;
  return (
    <div className="p-3 rounded-xl bg-white/70 border">
      <div className="text-sm font-medium">{label}</div>
      <div className="mt-2 h-2 rounded bg-slate-200 overflow-hidden">
        <div className="h-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #12bfae, #2aa8ff)" }} />
      </div>
    </div>
  );
}