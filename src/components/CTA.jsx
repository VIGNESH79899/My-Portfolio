import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/sound';
import { VenomButton } from "./venom-button";

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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:vigneshadhi773@gmail.com';
    }
  };

  return (
    <section className="py-20 px-6 bg-[var(--bg-page)] border-t border-[var(--border-color)] relative overflow-hidden font-sans">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 md:p-12 rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-color)] shadow-xs text-center flex flex-col items-center relative overflow-hidden"
        >
          <span className="pro-badge-olive mb-4 inline-block">
            LET'S WORK TOGETHER
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[var(--text-primary)] mb-4 tracking-tight">
            Interested in building something together?
          </h2>

          <p className="max-w-xl text-[var(--text-secondary)] text-xs sm:text-sm mb-8 leading-relaxed font-normal">
            I am currently open for full-stack software engineering & AI/ML opportunities, internships, and collaborations.
          </p>

          {/* Venom Symbiote Interactive Button */}
          <div className="w-full max-w-xl mx-auto -mt-2">
            <VenomButton 
              label="Let's Collaborate"
              onClick={handleClick}
              height={280}
              className="bg-transparent"
            />
          </div>

          {/* Kept aside (commented): Previous dual buttons
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/Adhi_Vignesh_Resume.pdf" download="Adhi_Vignesh_Resume.pdf">Download Resume PDF</a>
            <a href="#contact">Contact Me</a>
          </div>
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
