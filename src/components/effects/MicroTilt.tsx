import * as React from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactElement;
  maxDeg?: number;       // max rotation in degrees, default 4
  perspective?: number;  // px perspective, default 800
  className?: string;
};

/** MicroTilt — subtle 3D tilt toward cursor (motion-safe). */
export default function MicroTilt({ children, maxDeg = 4, perspective = 800, className }: Props) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;  // -0.5 .. 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rx = (y * -2) * maxDeg; // rotateX inversed
    const ry = (x *  2) * maxDeg; // rotateY
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    });
  };

  const onLeave = () => setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        willChange: reduce ? undefined : "transform",
        transition: reduce ? undefined : "transform 160ms ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}