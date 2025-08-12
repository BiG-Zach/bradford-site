type Logo = { src: string; alt: string; width?: number; height?: number };

export default function LogoRail({ logos, className="" }: { logos: Logo[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center ${className}`}>
      {logos.map((l,i)=>(
        <div key={i} className="h-16 md:h-20 flex items-center justify-center rounded-xl bg-white/60 shadow-sm border border-white/40 hover:scale-[1.02] hover:shadow-md transition-transform">
          <img src={l.src} alt={l.alt} loading="lazy" width={l.width ?? 156} height={l.height ?? 64} className="max-h-10 md:max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}