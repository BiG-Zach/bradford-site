import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import {
  NetworkIcon,
  ClockIcon,
  ShieldStarIcon,
  HandHeartIcon,
  WalletCheckIcon,
  SparkleCheckIcon,
} from "../ui/CustomIcons";

type Item = {
  title: string;
  body: string;
  icon: React.ReactNode;
  aria: string;
};

const items: Item[] = [
  {
    title: "Nationwide PPO Access",
    body: "Care anywhere with top provider networks.",
    icon: <NetworkIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Nationwide PPO Access",
  },
  {
    title: "Year-Round Enrollment",
    body: "Apply anytime, start coverage in days.",
    icon: <ClockIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Year-Round Enrollment",
  },
  {
    title: "Top-Rated Carriers",
    body: "A-rated insurers for reliable peace of mind.",
    icon: <ShieldStarIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Top-Rated Carriers",
  },
  {
    title: "Personalized Guidance",
    body: "Licensed advisors guide your enrollment journey.",
    icon: <HandHeartIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Personalized Guidance",
  },
  {
    title: "Budget-Friendly Options",
    body: "Quality plans tailored to your budget.",
    icon: <WalletCheckIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Budget-Friendly Options",
  },
  {
    title: "Fast, Simple Enrollment",
    body: "Smooth process from consultation to activation.",
    icon: <SparkleCheckIcon aria-hidden={true} className="h-6 w-6" />,
    aria: "Fast and Simple Enrollment",
  },
];

export default function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-labelledby="why-choose-us">
      <div className="text-center mb-8 md:mb-10">
        <motion.h2
          id="why-choose-us"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight mb-2 md:mb-3"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Why Choose Bradford Informed Guidance
        </motion.h2>
        <motion.p
          className="text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Clear options, trusted carriers, and a team that makes enrollment easy.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            aria-label={item.aria}
            className="group rounded-2xl ring-1 ring-slate-200/70 bg-white hover:shadow-lg/20 hover:ring-slate-300 transition-all duration-300 p-5 md:p-6 cursor-pointer"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ 
              duration: 0.45, 
              ease: "easeOut",
              delay: prefersReducedMotion ? 0 : index * 0.06 
            }}
            whileHover={prefersReducedMotion ? {} : { y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="size-9 md:size-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors duration-300">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 
                  className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors duration-300 leading-tight mb-1"
                  aria-describedby={`${item.title.replace(/\s+/g, '-').toLowerCase()}-desc`}
                >
                  {item.title}
                </h3>
                <p 
                  id={`${item.title.replace(/\s+/g, '-').toLowerCase()}-desc`}
                  className="text-sm leading-6 text-slate-600 group-hover:text-slate-700 transition-colors duration-300"
                >
                  {item.body}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}