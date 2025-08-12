import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { trackEvent, GTM_EVENTS } from '../utils/gtm';

type QA = { q: string; a: string };

const ITEMS: QA[] = [
  { q: 'Which states do you currently serve?', a: 'Florida, Michigan, and North Carolina — with more coming soon as we expand nationwide.' },
  { q: 'Do you work with PPO networks?', a: 'Yes — Aetna, Cigna, First Health, Multiplan, and United (availability varies by plan and location).' },
  { q: 'What makes Bradford Informed Guidance different?', a: 'We combine personalized service with A-rated carriers, year-round enrollment, and transparent pricing. No hidden fees, no pressure — just honest guidance from licensed professionals who truly understand your needs.' },
  { q: 'Can I really enroll any time of year?', a: 'Absolutely! Unlike ACA marketplace plans, our private health insurance options allow year-round enrollment with coverage starting as soon as the next month. No waiting for open enrollment periods.' },
  { q: 'What types of coverage can you help with?', a: 'Health and life insurance for individuals, families, and small businesses. We specialize in solutions for self-employed, early retirees, and those between jobs.' },
  { q: 'How much does a consultation cost?', a: 'It\'s completely free. We\'ll discuss your needs, compare options, and present plans that fit your budget — no obligation.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleCTAClick = () => {
    trackEvent(GTM_EVENTS.FAQ_CTA_CLICK);
    window.open('https://calendly.com/bradfordinformedguidance', '_blank');
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white" aria-labelledby="faq-title">
      <div className="text-center mb-8 md:mb-10">
        <motion.h2
          id="faq-title"
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight mb-2 md:mb-3"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Get answers to common questions about our services and coverage options
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {ITEMS.map((item, index) => (
            <motion.div
              key={index}
              className="rounded-2xl ring-1 ring-slate-200 bg-white shadow-sm hover:shadow-md/20 hover:ring-slate-300 transition-all duration-200"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 0.45, 
                ease: "easeOut",
                delay: prefersReducedMotion ? 0 : index * 0.1 
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-start justify-between gap-4 focus-ring-emerald rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-900 pr-4 leading-tight">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 text-xl font-light flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  ›
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: "easeInOut" },
                      opacity: { duration: 0.2, delay: openIndex === index ? 0.1 : 0 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA below FAQs */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="text-center mt-10 md:mt-12"
      >
        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto ring-1 ring-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 leading-tight mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6">
            Our licensed advisors are here to help. Schedule a free consultation to get personalized answers.
          </p>
          <motion.button
            onClick={handleCTAClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl focus-ring-emerald"
            aria-label="Schedule free consultation to get answers"
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
          >
            Let's Talk
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}