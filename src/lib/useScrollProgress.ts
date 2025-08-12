import * as React from "react";

/** Returns scroll progress 0..1 of the whole document. */
export function useScrollProgress() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = (h.scrollHeight - h.clientHeight) || 1;
      const v = Math.min(1, Math.max(0, h.scrollTop / max));
      setP(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return p;
}