export default function TestimonialsGrid() {
  const items = [
    { q: "Saved us $210/mo and kept our pediatrician.", who: "Family • Tampa" },
    { q: "Clear, fast, and zero pressure.", who: "Self-employed • Detroit" },
    { q: "Enrollment took 15 minutes. Done.", who: "Raleigh couple" },
    { q: "Understood our doctors and Rx needs.", who: "Nurse • Orlando" },
    { q: "Real help from a real person.", who: "Retiree • Sarasota" },
    { q: "Lower total cost, not just lower premium.", who: "Contractor • Miami" },
  ];
  return (
    <section className="py-10 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">What people say</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t,i)=>(
            <figure key={i} className="p-4 rounded-2xl border bg-white/80 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500" aria-hidden>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="mt-2 text-[0.98rem]">"{t.q}"</blockquote>
              <figcaption className="mt-2 text-sm text-ink-1/60">— {t.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}