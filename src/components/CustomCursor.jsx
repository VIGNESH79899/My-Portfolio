import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState({ isHovered: false, label: '' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest('button, a, .pro-card, [role="button"]');
      
      if (interactiveEl) {
        let label = '';
        if (interactiveEl.getAttribute('href')?.startsWith('#projects') || interactiveEl.textContent?.includes('Project')) {
          label = 'EXPLORE';
        } else if (interactiveEl.getAttribute('download') || interactiveEl.textContent?.includes('Resume')) {
          label = 'DOWNLOAD';
        } else if (interactiveEl.textContent?.includes('Copy')) {
          label = 'COPY';
        } else if (interactiveEl.tagName === 'A') {
          label = 'OPEN';
        } else {
          label = 'VIEW';
        }
        setHoverState({ isHovered: true, label });
      } else {
        setHoverState({ isHovered: false, label: '' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Sleek Inverted Color Cursor Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-slate-900 dark:bg-white mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - (hoverState.isHovered ? 20 : 6),
          y: mousePosition.y - (hoverState.isHovered ? 20 : 6),
          width: hoverState.isHovered ? 40 : 12,
          height: hoverState.isHovered ? 40 : 12,
          opacity: hoverState.isHovered ? 0.35 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.1 }}
      />

      {/* Contextual Action Pill Label when hovering interactive elements */}
      <AnimatePresence>
        {hoverState.isHovered && hoverState.label && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="pointer-events-none fixed top-0 left-0 z-50 px-2 py-0.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] font-mono font-bold tracking-wider uppercase shadow-md hidden md:block"
            style={{
              x: mousePosition.x + 16,
              y: mousePosition.y + 16,
            }}
          >
            {hoverState.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
