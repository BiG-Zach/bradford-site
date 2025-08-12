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

export default function LicensingAndNetworks() {
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
    <Section className="bg-slate-50/50">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Licensed & Connected</h2>
        <p className="mt-2 text-slate-600">Comprehensive coverage across multiple states and networks</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Wrap>
          <Item 
            title="Licensing" 
            desc="Florida • Michigan • North Carolina"
            icon={<span className="text-sm font-bold">📍</span>}
          />
        </Wrap>
        
        <Wrap delay={0.1}>
          <Item 
            title="Carriers" 
            desc="Allstate Health Solutions, UnitedHealthcare, PAL, Southern Guaranty (SGIC), Mutual of Omaha, Americo"
            icon={<span className="text-sm font-bold">🏢</span>}
          />
        </Wrap>
        
        <Wrap delay={0.2}>
          <Item 
            title="PPO Networks" 
            desc="Aetna • Cigna • First Health • Multiplan • United"
            icon={<span className="text-sm font-bold">🌐</span>}
          />
        </Wrap>
      </div>
    </Section>
  );
}