import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRunning, FaBug, FaTrophy, FaBolt } from 'react-icons/fa';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress directly into smooth percentage string for 100% exact alignment down to the single pixel
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down'); // 'down' or 'up'
  const [isScrollingFast, setIsScrollingFast] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeout;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const pct = Math.min(Math.max(latest * 100, 0), 100);
      setScrollPercent(pct);

      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (diff > 1.5) {
        setScrollDirection('down');
      } else if (diff < -1.5) {
        setScrollDirection('up');
      }

      if (Math.abs(diff) > 12) {
        setIsScrollingFast(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setIsScrollingFast(false), 250);
      }

      lastScrollY = currentScrollY;
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [scrollYProgress]);

  const isAtEnd = scrollPercent > 98;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      
      {/* 6px Flowing Progress Track with Vibrant Gradient */}
      <div className="relative h-[6px] w-full bg-slate-200/50 dark:bg-slate-800/60 shadow-xs">
        
        {/* Flowing Gradient Fill Bar */}
        <motion.div
          style={{ width: progressWidth }}
          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-600 via-purple-600 via-pink-500 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)] origin-left flex items-center justify-end overflow-visible"
        >
          
          {/* Character Stage (Shifted to top-4 / y=16px so 😫 Emoji is 100% Fully Visible on Screen) */}
          {scrollPercent > 0.5 && (
            <div className="absolute top-4 right-0 translate-x-1/2 overflow-visible pointer-events-none">
              
              {/* Victory Trophy Badge at 100% Page End */}
              {isAtEnd ? (
                <div 
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xl border-2 border-white dark:border-slate-900 shrink-0"
                  title="Bug Free Victory!"
                >
                  <FaTrophy className="text-amber-300 text-xs" />
                </div>
              ) : (
                /* Dynamic Directional Chase Stage: flex-row for DOWN, flex-row-reverse for UP */
                <div className={`flex items-center gap-1.5 overflow-visible ${scrollDirection === 'up' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Chasing Bug Badge (24px Stable Circle) */}
                  {scrollPercent > 2 && (
                    <div 
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 shrink-0"
                      title="Bug Chasing"
                    >
                      <FaBug 
                        className="text-[10px] text-white animate-pulse" 
                        style={{ transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'none' }}
                      />
                    </div>
                  )}

                  {/* Escaping Developer Runner Badge with 100% Fully Visible 😫 Emoji */}
                  <div 
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center shadow-xl border-2 border-white dark:border-slate-900 shrink-0 relative"
                    title="Developer Escaping"
                  >
                    {/* 100% Fully Screen-Visible 😫 Emoji Positioned Safely Above Badge */}
                    <span 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 text-base leading-none select-none pointer-events-none drop-shadow-md animate-pulse"
                      title="Exhausted / Frustrated Escaping"
                    >
                      😫
                    </span>

                    {/* Runner Icon - Faces direction of movement */}
                    <FaRunning 
                      className="text-xs text-white" 
                      style={{ transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'none' }}
                    />

                    {/* Speed Lightning Badge when Scrolling Fast */}
                    {isScrollingFast && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border border-white flex items-center justify-center shadow-xs">
                        <FaBolt className="text-[7px] text-slate-900" />
                      </span>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
};

export default ScrollProgress;
