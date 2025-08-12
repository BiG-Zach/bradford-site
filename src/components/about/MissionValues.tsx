import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../layout/Section";

const Item: React.FC<{ title: string; desc: string; icon?: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="group rounded-2xl ring-1 ring-slate-200/70 bg-white hover:shadow-lg/20 transition p-5 md:p-6">
    <div className="flex items-start gap-3">
      <div className="size-9 md:size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
        {icon ?? <span className="font-bold">✓</span>}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-slate-600">{desc}</p>
      </div>
    </div>
  </div>
);

export default function MissionValues() {
  const prefersReducedMotion = useReducedMotion();
  const Wrap: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) =>
    prefersReducedMotion ? (
      <div>{children}</div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    );

  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <Wrap>
          <div className="rounded-2xl ring-1 ring-slate-200/70 bg-white p-6 md:p-7">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Mission</h2>
            <p className="mt-3 text-slate-700">
              To be your trusted partner in navigating the health and life insurance landscape —
              ensuring you understand your options and enroll with confidence.
            </p>
          </div>
        </Wrap>

        <Wrap delay={0.05}>
          <div className="rounded-2xl ring-1 ring-slate-200/70 bg-white p-6 md:p-7">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Values</h2>
            <div className="mt-4 grid gap-4">
              <Item title="Clarity" desc="Plain language, transparent options, and zero jargon." />
              <Item title="Service" desc="Responsive guidance before, during, and after enrollment." />
              <Item title="Fit" desc="Plans aligned to your budget, network, and needs." />
            </div>
          </div>
        </Wrap>
      </div>
    </Section>
  );
}