import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  FolderGit2, 
  ShoppingBag, 
  Cpu, 
  GraduationCap, 
  User, 
  Briefcase, 
  Award, 
  Send, 
  CheckCircle2, 
  ArrowDown, 
  ArrowUp 
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Overview', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'freelance', label: 'Freelance', icon: ShoppingBag },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  // { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'about', label: 'About', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certs', icon: Award },
  { id: 'contact', label: 'Contact', icon: Send },
];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // Smooth line progression from 0% to 100%
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Dynamic horizontal anchor translation: ensures 0% aligns flush left, and 100% aligns flush right with zero viewport clipping
  const pillTranslate = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (diff > 1.2) {
        setScrollDirection('down');
      } else if (diff < -1.2) {
        setScrollDirection('up');
      }

      lastScrollY = currentScrollY;

      // Real-time active section waypoint detection
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    const unsubscribePct = scrollYProgress.on('change', (latest) => {
      const pct = Math.min(Math.max(latest * 100, 0), 100);
      setScrollPercent(pct);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      unsubscribePct();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYProgress]);

  const isAtEnd = scrollPercent >= 98.8;
  const ActiveIcon = activeSection.icon;

  const handlePillClick = () => {
    const el = document.getElementById(activeSection.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none select-none">
      
      {/* 2.5px Precision Laser Track */}
      <div className="relative h-[2.5px] sm:h-[3px] w-full bg-black/10 dark:bg-white/10 backdrop-blur-xs overflow-hidden">
        {/* Luminous Gradient Fill */}
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-[#777C62] via-[#C1A17F] to-[#ADB293] relative shadow-[0_0_12px_rgba(173,178,147,0.7)]"
        >
          {/* Active travelling pulse shimmer beam */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
          />
        </motion.div>
      </div>

      {/* Floating Compact Meaningful Waypoint HUD (High Contrast & Zero-Clipping) */}
      <motion.div
        style={{
          left: progressWidth,
          x: pillTranslate,
        }}
        className="absolute top-[4px] pointer-events-none select-none px-2 sm:px-3"
      >
        <div
          onClick={handlePillClick}
          style={{ backgroundColor: '#1C1D19' }}
          className={`pointer-events-auto cursor-pointer flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border shadow-md transition-all duration-200 hover:scale-105 active:scale-95 ${
            isAtEnd
              ? 'border-emerald-500/50 shadow-[0_0_14px_rgba(16,185,129,0.35)]'
              : 'border-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.4)]'
          }`}
          title={`Currently in: ${activeSection.label} (Click to scroll)`}
        >
          {/* Animated Active Section Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: scrollDirection === 'down' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: scrollDirection === 'down' ? -4 : 4 }}
              transition={{ duration: 0.14 }}
              className="flex items-center gap-1 shrink-0"
            >
              <ActiveIcon className="w-3 h-3 text-[#C1A17F] shrink-0" />
              <span className="font-semibold text-[10px] sm:text-[11px] text-white tracking-tight whitespace-nowrap">
                {activeSection.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Micro Divider */}
          <span className="w-[1px] h-2.5 bg-white/30 shrink-0" />

          {/* Live Reading Depth Percentage */}
          <div className="flex items-center gap-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-white tracking-wider shrink-0">
            <span className="tabular-nums">{Math.round(scrollPercent)}%</span>
            {isAtEnd ? (
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            ) : scrollDirection === 'down' ? (
              <ArrowDown className="w-2.5 h-2.5 text-[#ADB293]" />
            ) : (
              <ArrowUp className="w-2.5 h-2.5 text-[#C1A17F]" />
            )}
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default ScrollProgress;
