import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { StarRating } from './ui/CustomIcons';
import Section from './layout/Section';

type Testimonial = {
  name: string;
  text: string;
  rating: number; // 1..5
  title?: string;
  location?: string;
  headshot?: string;
  verified: boolean;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jordan M.',
    title: 'Small Business Owner',
    location: 'Tampa, FL',
    text: 'Professional, transparent, and made the process easy. We saved money and kept our doctors. Highly recommend Bradford Informed Guidance.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Alicia R.',
    title: 'New Parent',
    location: 'Grand Rapids, MI',
    text: 'As a new parent, I appreciated the clear explanations. We got a plan that makes sense for our budget and growing family.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Sam P.',
    title: 'Entrepreneur',
    location: 'Charlotte, NC',
    text: 'Great options for my small business. Quick turnaround and ongoing support when employees had questions about their coverage.',
    rating: 5,
    verified: true,
  },
  {
    name: 'Maria L.',
    title: 'Early Retiree',
    location: 'Naples, FL',
    text: 'After leaving corporate, I needed individual coverage. Bradford found me excellent options with my preferred doctors at a great price.',
    rating: 5,
    verified: true,
  },
  {
    name: 'David K.',
    title: 'Freelance Consultant',
    location: 'Ann Arbor, MI',
    text: 'Self-employed for 10 years, this was the smoothest insurance experience I\'ve had. Clear communication and no surprises.',
    rating: 5,
    verified: true,
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    
    timer.current = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [prefersReducedMotion, isPaused]);

  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  const currentTestimonial = TESTIMONIALS[index];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <Section className="bg-slate-50 border-y border-slate-200" aria-label="Client testimonials">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 leading-tight mb-2 md:mb-3"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="text-slate-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          Real experiences from families and businesses we've helped
        </motion.p>
      </div>

      {/* Testimonial carousel */}
      <div className="relative max-w-4xl mx-auto">
        <div 
          className="relative h-64 sm:h-48 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center"
            >
              {/* Star rating */}
              <div className="mb-4">
                <StarRating rating={currentTestimonial.rating} className="flex items-center gap-0.5 justify-center sm:justify-start" />
              </div>

              {/* Quote */}
              <blockquote className="text-slate-800 text-lg sm:text-xl leading-relaxed mb-6 text-center sm:text-left">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Attribution */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <div className="font-semibold text-slate-900">{currentTestimonial.name}</div>
                  {currentTestimonial.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Verified Client
                    </span>
                  )}
                </div>
                {currentTestimonial.title && (
                  <div className="text-sm text-slate-600">{currentTestimonial.title}</div>
                )}
                {currentTestimonial.location && (
                  <div className="text-sm text-slate-500">{currentTestimonial.location}</div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prev}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:ring-slate-300 transition-all duration-200 focus-ring-emerald"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 focus-ring-emerald ${
                  i === index ? 'bg-emerald-600' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:ring-slate-300 transition-all duration-200 focus-ring-emerald"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>

      {/* Trust indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="text-center mt-8"
      >
        <p className="text-sm text-slate-500">
          Join hundreds of satisfied clients across FL, MI, and NC
        </p>
      </motion.div>
    </Section>
  );
}