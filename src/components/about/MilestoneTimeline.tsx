import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../layout/Section";
import Magnetic from "../ui/Magnetic";

type Milestone = { id: string; year: string; title: string; body: string };

const MILESTONES: Milestone[] = [
  { id: "start",   year: "2021", title: "Founded",             body: "Bradford Informed Guidance begins with a mission: clarity-first insurance advice." },
  { id: "fl",      year: "2022", title: "Florida Licensed",    body: "Launched operations serving self-employed and families across FL." },
  { id: "mi",      year: "2024", title: "Michigan Expansion",  body: "Added MI with wider carrier access and PPO options." },
  { id: "nc",      year: "2025", title: "North Carolina Launch", body: "Rolled out in NC — continuing our All American MedPlans footprint." },
  { id: "future",  year: "Next", title: "Nationwide Growth",   body: "More states coming soon. Join our updates for availability in your area." },
];

export default function MilestoneTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const Wrap: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) =>
    prefersReducedMotion ? (
      <div>{children}</div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    );

  return (
    <Section className="relative">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 md:mb-8">Our Journey</h2>
      <div className="relative">
        <div className="absolute left-5 md:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-sky-500 to-slate-300 rounded-full" aria-hidden="true" />
        <ol className="space-y-6 md:space-y-8">
          {MILESTONES.map((m, idx) => (
            <li key={m.id} className="relative pl-14 md:pl-16">
              <div className="absolute left-4 md:left-5 top-2 size-4 md:size-5 rounded-full bg-white ring-2 ring-emerald-500 shadow-md" aria-hidden="true" />
              <Wrap delay={idx * 0.05}>
                <div className="rounded-2xl ring-1 ring-slate-200/70 bg-white p-5 md:p-6 hover:shadow-lg/20 transition">
                  <div className="text-xs md:text-sm font-semibold text-emerald-700">{m.year}</div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-1 text-slate-700">{m.body}</p>
                </div>
              </Wrap>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-8 md:mt-10">
        <Magnetic>
          <a
            href="/#updates"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium shadow-lg hover:bg-emerald-500 active:scale-[.99] transition"
            data-gtm="timeline-updates"
          >
            Get notified when we launch in your area
          </a>
        </Magnetic>
      </div>
    </Section>
  );
}