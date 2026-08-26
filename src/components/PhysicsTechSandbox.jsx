import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaAtom, FaRedo, FaHandPointer, FaBolt, FaGlobeAmericas, 
  FaReact, FaNodeJs, FaPython, FaCode, FaBrain, FaShieldAlt
} from 'react-icons/fa';
import { SiPostgresql, SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si';
import { playClickSound, playSuccessSound } from '../utils/sound';

const initialTechTags = [
  { id: "react", name: "React.js", icon: FaReact, iconColor: "text-cyan-400", x: 30, y: 30, vx: 1.5, vy: 1.2 },
  { id: "node", name: "Node.js", icon: FaNodeJs, iconColor: "text-emerald-400", x: 180, y: 70, vx: -1.4, vy: 1.6 },
  { id: "python", name: "Python", icon: FaPython, iconColor: "text-amber-400", x: 320, y: 40, vx: 1.8, vy: -1.2 },
  { id: "postgres", name: "PostgreSQL", icon: SiPostgresql, iconColor: "text-sky-400", x: 460, y: 90, vx: -1.5, vy: 1.7 },
  { id: "c-lang", name: "C Language", icon: FaCode, iconColor: "text-blue-400", x: 100, y: 150, vx: 1.6, vy: -1.6 },
  { id: "express", name: "Express.js", icon: SiExpress, iconColor: "text-slate-300", x: 250, y: 130, vx: -1.7, vy: 1.4 },
  { id: "mongodb", name: "MongoDB", icon: SiMongodb, iconColor: "text-emerald-500", x: 390, y: 170, vx: 1.5, vy: -1.5 },
  { id: "tailwind", name: "Tailwind CSS", icon: SiTailwindcss, iconColor: "text-cyan-400", x: 530, y: 110, vx: -1.4, vy: 1.8 },
  { id: "tfidf", name: "TF-IDF ML", icon: FaBrain, iconColor: "text-purple-400", x: 150, y: 230, vx: 1.7, vy: -1.3 },
  { id: "sse", name: "SSE Stream", icon: FaBolt, iconColor: "text-amber-400", x: 290, y: 210, vx: -1.9, vy: 1.5 },
  { id: "jwt", name: "JWT Security", icon: FaShieldAlt, iconColor: "text-indigo-400", x: 430, y: 250, vx: 1.4, vy: -1.7 }
];

const PhysicsTechSandbox = () => {
  const containerRef = useRef(null);
  const [tags, setTags] = useState(initialTechTags);
  const [gravityMode, setGravityMode] = useState("zero"); // "zero" or "earth"
  const [isBursting, setIsBursting] = useState(false);

  // Smooth Physics Simulation Loop
  useEffect(() => {
    let animationId;

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const bounds = containerRef.current.getBoundingClientRect();
      const containerWidth = bounds.width || 700;
      const containerHeight = bounds.height || 360;

      setTags((prevTags) =>
        prevTags.map((tag) => {
          let newVx = tag.vx;
          let newVy = tag.vy;

          if (gravityMode === "earth") {
            newVy += 0.22;
            newVx *= 0.993;
            newVy *= 0.993;
          } else {
            newVx *= 0.998;
            newVy *= 0.998;
          }

          let newX = tag.x + newVx;
          let newY = tag.y + newVy;

          const badgeWidth = 120;
          const badgeHeight = 42;

          if (newX < 10) {
            newX = 10;
            newVx = Math.abs(newVx) * 0.85;
          } else if (newX > containerWidth - badgeWidth) {
            newX = Math.max(10, containerWidth - badgeWidth);
            newVx = -Math.abs(newVx) * 0.85;
          }

          if (newY < 10) {
            newY = 10;
            newVy = Math.abs(newVy) * 0.85;
          } else if (newY > containerHeight - badgeHeight) {
            newY = Math.max(10, containerHeight - badgeHeight);
            newVy = -Math.abs(newVy) * (gravityMode === "earth" ? 0.70 : 0.85);
          }

          return { ...tag, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [gravityMode]);

  const handleReset = () => {
    try { playClickSound(); } catch (e) {}
    setTags(initialTechTags);
  };

  const handleToggleGravity = () => {
    try { playClickSound(); } catch (e) {}
    setGravityMode((prev) => (prev === "zero" ? "earth" : "zero"));
  };

  const handleBurst = () => {
    try { playSuccessSound(); } catch (e) {}
    setIsBursting(true);
    setTimeout(() => setIsBursting(false), 500);

    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const centerX = (bounds.width || 700) / 2;
    const centerY = (bounds.height || 360) / 2;

    setTags((prev) =>
      prev.map((t) => {
        const dx = t.x - centerX;
        const dy = t.y - centerY;
        const angle = Math.atan2(dy, dx);
        const force = 7 + Math.random() * 5;
        return {
          ...t,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force
        };
      })
    );
  };

  return (
    <div className="bento-card p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 my-12 shadow-2xl overflow-hidden font-sans relative z-20">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800 relative z-10">
        <div>
          <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-2">
            INTERACTIVE PHYSICS ARENA
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FaAtom className="text-indigo-600 dark:text-indigo-400 animate-spin-slow text-xl" /> Interactive Bouncy Tech Tags Sandbox
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Toss, bounce, and collide Adhi's technology tags inside a real-time 2D impulse physics arena
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={handleToggleGravity}
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              gravityMode === "earth"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-semibold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700"
            }`}
          >
            <FaGlobeAmericas className="text-[10px]" />
            <span>{gravityMode === "earth" ? "Earth-G (9.8m/s²)" : "Zero-G Space"}</span>
          </button>

          <button
            onClick={handleBurst}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold border border-purple-400/30 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <FaBolt className="text-[10px]" /> Radial Burst
          </button>

          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FaRedo className="text-[10px]" /> Reset Arena
          </button>
        </div>
      </div>

      {/* Physics Sandbox Arena Container */}
      <div
        ref={containerRef}
        className="relative h-[380px] min-h-[380px] w-full rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 overflow-hidden p-4 shadow-md bg-dot-pattern"
      >
        {/* Top Telemetry HUD Overlay */}
        <div className="absolute top-3 left-3 z-10 text-[10px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-4 pointer-events-none bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> BODIES: {tags.length}
          </span>
          <span>GRAVITY: {gravityMode === "earth" ? "9.8 m/s²" : "0.0 m/s²"}</span>
          <span className="hidden sm:inline text-indigo-600 dark:text-indigo-400">ENGINE: 2D IMPULSE SIM</span>
        </div>

        {/* Drag Instruction Banner */}
        <div className="absolute bottom-3 left-3 z-10 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
          <FaHandPointer className="text-indigo-400 text-xs" /> Click & toss tech pills across the arena!
        </div>

        {/* Shockwave Burst Effect */}
        {isBursting && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-indigo-500 pointer-events-none z-10"
          />
        )}

        {/* Physics Tag Badges */}
        {tags.map((tag) => {
          const IconComp = tag.icon;

          return (
            <div
              key={tag.id}
              style={{
                position: 'absolute',
                transform: `translate3d(${tag.x}px, ${tag.y}px, 0px)`
              }}
              className="px-4 py-2 rounded-full bg-slate-900/95 text-white font-mono font-bold text-xs shadow-xl border-2 border-indigo-500/60 hover:border-indigo-400 transition-shadow flex items-center gap-2 select-none z-20 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <IconComp className={`text-sm ${tag.iconColor}`} />
              <span>{tag.name}</span>
            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PhysicsTechSandbox;
