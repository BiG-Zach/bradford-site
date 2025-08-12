import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  delay?: number;
};

export default function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as as any;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25, once: true }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}