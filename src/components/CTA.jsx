import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { playClickSound } from '../utils/sound';

const CTA = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  const handleClick = () => {
    try { playClickSound(); } catch (e) {}
  };

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 md:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs text-center flex flex-col items-center relative overflow-hidden"
        >
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 mb-4 inline-block">
            LET'S WORK TOGETHER
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Interested in building something together?
          </h2>

          <p className="max-w-xl text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed font-normal">
            I am currently open for full-stack software engineering & AI/ML opportunities, internships, and collaborations.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
              href="/Adhi_Vignesh_Resume.pdf"
              download="Adhi_Vignesh_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all duration-200"
            >
              <FaDownload className="text-xs" /> Download Resume PDF
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClick}
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200"
            >
              <FaEnvelope className="text-xs text-indigo-600 dark:text-indigo-400" /> Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
