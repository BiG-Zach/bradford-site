type Link = { name: string; href: string, label?: string };
const links: Link[] = [
  { name: "Aetna",       href: "https://www.aetna.com/individuals-families/find-a-doctor.html" },
  { name: "Cigna",       href: "https://www.cigna.com/find-a-doctor" },
  { name: "First Health",href: "https://www.firsthealth.com/find-a-provider" },
  { name: "MultiPlan",   href: "https://www.multiplan.com/search/search-our-networks" },
  { name: "UnitedHealthcare", href: "https://www.uhc.com/find-a-doctor" },
];
export default function ProviderLookupLinks() {
  return (
    <div className="glass p-4 md:p-5">
      <h3 className="text-lg font-semibold">Provider lookups</h3>
      <p className="text-sm text-ink-1/70 mb-3">Check if your doctor is in-network. Each link opens the official finder in a new tab.</p>
      <div className="flex flex-wrap gap-2">
        {links.map((l)=>(
          <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            {l.name} — Find a doctor
          </a>
        ))}
      </div>
      <p className="text-xs text-ink-1/60 mt-2">We'll still verify during your pre-check before enrollment.</p>
    </div>
  );
}