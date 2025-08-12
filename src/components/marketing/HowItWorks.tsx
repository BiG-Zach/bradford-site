import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '../../utils/gtm';

const steps = [
  {
    number: 1,
    title: "Understand",
    description: "We learn about your needs, network preferences, and budget.",
  },
  {
    number: 2,
    title: "Compare",
    description: "We compare plans from top carriers and PPO networks.",
  },
  {
    number: 3,
    title: "Enroll",
    description: "Choose confidently and get help with enrollment and next steps.",
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  const handleCTAClick = () => {
    trackEvent({
      event: 'cta_click',
      event_category: 'engagement',
      event_action: 'click',
      event_label: 'howitworks_start_step_1',
    });
    window.location.href = '/quote';
  };

  return (
    <div className="bg-white" aria-labelledby="how-it-works-title">
      <div className="text-center mb-8 md:mb-10">
        <motion.h2
          id="how-it-works-title"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight mb-2 md:mb-3"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Getting the right insurance coverage shouldn't be complicated. Our simple 3-step process makes it easy.
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connecting line - enhanced with gradient and better positioning */}
        <div className="hidden md:block absolute top-[2.25rem] left-0 right-0 h-px z-0">
          <div className="relative h-full">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            {/* Animated progress line */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </div>
        
        {/* Steps grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="text-center group"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 0.45, 
                ease: "easeOut",
                delay: prefersReducedMotion ? 0 : index * 0.15 
              }}
            >
              {/* Numbered circle */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <motion.div
                    className="size-9 md:size-10 bg-emerald-600 text-white font-bold rounded-full flex items-center justify-center group-hover:bg-emerald-700 transition-colors duration-300 shadow-lg"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  >
                    {step.number}
                  </motion.div>
                  {/* Connecting dots for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-emerald-300 to-emerald-200" />
                  )}
                </div>
              </div>

              {/* Step content */}
              <div className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-slate-200 group-hover:shadow-lg/20 group-hover:ring-slate-300 transition-all duration-300">
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors duration-300 leading-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="text-center mt-10 md:mt-12"
      >
        <motion.button
          onClick={handleCTAClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label="Start step 1 now - begin your insurance journey"
          whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
          data-gtm="howitworks-start"
        >
          Start Step 1 Now
        </motion.button>
        <p className="text-sm text-slate-500 mt-3">
          Free consultation • No obligation • Licensed advisors
        </p>
      </motion.div>
    </div>
  );
}