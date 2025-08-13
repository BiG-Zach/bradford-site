type Logo = { src: string; alt: string; width?: number; height?: number };

export default function LogoRail({ logos, className="" }: { logos: Logo[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-center ${className}`}>
      {logos.map((l,i)=>(
        <div key={i} className="h-16 md:h-20 flex items-center justify-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-3 shadow-sm">
          <div className="relative aspect-[2/1] w-full">
            <img
              src={l.src}
              alt={l.alt}
              width={l.width ?? 160}
              height={l.height ?? 80}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
