type SrcSet = { webp: string; jpg: string; media?: string };

export default function ScrimPicture({ sources, alt, className="" }: { sources: SrcSet[]; alt: string; className?: string; }) {
  return (
    <div className={`relative ${className}`}>
      <picture>
        {sources.map((s, i) => (<source key={i} srcSet={s.webp} type="image/webp" media={s.media}/>))}
        {sources.map((s, i) => (<source key={i+"j"} srcSet={s.jpg} type="image/jpeg" media={s.media}/>))}
        <img src={sources[sources.length-1].jpg} alt={alt} className="w-full h-full object-cover" loading="eager" width="1920" height="1080"/>
      </picture>
      <div className="absolute inset-0 triple-scrim pointer-events-none" aria-hidden />
    </div>
  );
}