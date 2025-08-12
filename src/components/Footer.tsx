import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { COMPANY } from '../config/company';

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <h3 className="text-lg font-bold text-white mb-4">
              Bradford Informed Guidance
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Smarter health and life insurance solutions for self-employed, families, and early retirees.
            </p>
            
            {/* Social Proof Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
                Licensed Insurance Agent
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
                BBB Accredited Business
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>
                {COMPANY.npnLabel}: {COMPANY.npn}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                About
              </Link>
              <Link to="/carriers" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                Carriers
              </Link>
              <Link to="/how-it-works" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                How it Works
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                Contact
              </Link>
              <Link to="#faq-title" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                FAQs
              </Link>
              <Link to="/terms" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                Legal
              </Link>
            </nav>
          </motion.div>

          {/* Coverage Areas */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Coverage Areas</h4>
            <nav className="space-y-2">
              <Link to="/states/florida" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                Florida
              </Link>
              <Link to="/states/michigan" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                Michigan
              </Link>
              <Link to="/states/north-carolina" className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm">
                North Carolina
              </Link>
              <span className="block text-slate-400 text-sm">
                More states coming soon
              </span>
            </nav>
          </motion.div>

          {/* Mini-Contact */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div>
                <a
                  href={COMPANY.phoneHref}
                  className="text-white font-semibold hover:text-emerald-400 transition-colors duration-200 text-sm"
                  data-gtm="footer-phone"
                  rel="nofollow"
                >
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div>
                <a
                  href={COMPANY.emailHref}
                  className="text-white font-semibold hover:text-emerald-400 transition-colors duration-200 text-sm"
                  data-gtm="footer-email"
                  rel="nofollow"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div className="text-sm text-slate-300">
                {COMPANY.hours}
              </div>
              <div className="pt-2">
                <a
                  href="https://calendly.com/bradfordinformedguidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                  data-gtm="footer-schedule"
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.4 }}
          className="divider-soft mt-8 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>&copy; {currentYear} Bradford Informed Guidance. All rights reserved.</p>
            <nav className="flex items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </nav>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}