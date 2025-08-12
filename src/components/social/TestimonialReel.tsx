const items = [
  {quote: "Kept our doctors and cut costs by $210/mo.", who: "Family in Tampa"},
  {quote: "Quick, clear, and zero pressure.", who: "Self-employed, Detroit"},
  {quote: "Enrollment was simple—start to finish.", who: "Raleigh couple"},
];

export default function TestimonialReel() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap will-change-transform motion-safe:animate-ticker motion-reduce:animate-none">
        {[...items, ...items].map((t,i)=>(
          <div key={i} className="glass px-4 py-3 inline-flex items-center gap-3">
            <span className="text-sm">"{t.quote}"</span>
            <span className="text-xs text-ink-1/60">— {t.who}</span>
          </div>
        ))}
      </div>
    </div>
  );
}