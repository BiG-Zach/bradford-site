import * as React from "react";
import { useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: React.ReactElement;        // <a> or <button>
  strength?: number;                   // max px offset
  radius?: number;                     // px capture radius
  className?: string;                  // wrapper classes (optional)
};

/**
 * Magnetic — luxury hover that nudges the child toward the cursor.
 * Motion-safe: disabled if reduced motion is preferred.
 */
export default function Magnetic({ children, strength = 12, radius = 80, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      setStyle({ transform: "translate3d(0,0,0)" });
      return;
    }
    const t = Math.min(1, dist / radius);
    const f = (1 - t) * strength; // ease toward center
    setStyle({ transform: `translate3d(${(dx / dist) * f || 0}px, ${(dy / dist) * f || 0}px, 0)` });
  };

  const onLeave = () => setStyle({ transform: "translate3d(0,0,0)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className ?? ""}
      style={{ willChange: reduce ? undefined : "transform" }}
    >
      {React.cloneElement(children, {
        style: {
          ...((children.props as any)?.style || {}),
          ...style,
          transition: reduce ? undefined : "transform 160ms ease"
        },
      } as any)}
    </div>
  );
}