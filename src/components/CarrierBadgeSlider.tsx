import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import aetna from '../assets/logos/aetna.webp';
import allstate from '../assets/logos/allstate.webp';
import americo from '../assets/logos/americo.webp';
import cigna from '../assets/logos/cigna.webp';
import firstHealth from '../assets/logos/first-health.webp';
import multiplan from '../assets/logos/multiplan.webp';
import philadelphia from '../assets/logos/philadelphia.webp';
import sgic from '../assets/logos/sgic.webp';
import united from '../assets/logos/united.webp';

const logos = [
  { src: aetna, alt: 'Aetna' },
  { src: allstate, alt: 'Allstate Health Solutions' },
  { src: americo, alt: 'Americo' },
  { src: cigna, alt: 'Cigna' },
  { src: firstHealth, alt: 'First Health' },
  { src: multiplan, alt: 'MultiPlan' },
  { src: philadelphia, alt: 'Philadelphia American Life' },
  { src: sgic, alt: 'SGIC' },
  { src: united, alt: 'UnitedHealthcare' },
];

const CarrierBadgeSlider = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-band">
      <div className="text-center">
        {/* "Trusted by" label */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <h2
            className="text-sm font-medium text-slate-600 uppercase tracking-wide mb-6"
            aria-labelledby="trusted-carriers"
          >
            Trusted by Leading Carriers
          </h2>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ 
                duration: 0.45, 
                ease: "easeOut",
                delay: prefersReducedMotion ? 0 : index * 0.1 
              }}
              className="group w-full"
            >
              <div className="aspect-[3/1] flex items-center justify-center p-4 md:p-5 bg-white rounded-xl ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-lg/20 transition-all duration-300">
                <motion.img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 md:h-9 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
          className="text-center text-xs text-slate-500 mt-6 max-w-2xl mx-auto"
        >
          We partner with A-rated insurance carriers to bring you reliable coverage options with nationwide provider networks.
        </motion.p>
      </div>
    </div>
  );
};

export default CarrierBadgeSlider;
