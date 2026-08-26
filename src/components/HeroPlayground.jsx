import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload, FaArrowRight, FaGraduationCap, FaTerminal, FaLayerGroup, FaBrain, FaDatabase, FaBolt
} from 'react-icons/fa';
import InteractiveTerminal from './InteractiveTerminal';
import MagneticButton from './MagneticButton';
import profilePic from '../assets/profile-pic.jpg';

const HeroPlayground = ({ onOpenCmdK }) => {
  const [imgError, setImgError] = useState(false);

  const heroTechs = ["React", "Node.js", "Python", "PostgreSQL", "MongoDB", "AI / ML"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-12 px-4 sm:px-6 overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Dynamic Animated Background Glow Orbs */}
      <motion.div 
        animate={{ 
          y: [-15, 15, -15],
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" 
      />

      <motion.div 
        animate={{ 
          y: [15, -15, 15],
          scale: [1.05, 1, 1.05],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-[450px] h-[280px] bg-gradient-to-br from-emerald-500/10 via-indigo-500/10 to-transparent blur-[110px] pointer-events-none rounded-full" 
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-4">
        
        {/* Two-Column Main Viewport Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Personal Intro & Technical Identity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-between space-y-4"
          >
            {/* Status Pill Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold shadow-xs hover:border-emerald-500/50 transition-all cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Available for Full-Stack & AI/ML Roles</span>
              </div>
            </motion.div>

            {/* Profile Avatar & Main Headline */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative shrink-0 group cursor-pointer"
              >
                {/* Glowing Aura Ring around Avatar */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-40 blur-sm group-hover:opacity-100 transition duration-500 animate-pulse" />

                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-lg flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
                  AV
                </div>
                <span className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-xs z-10" title="Online & Available">
                  <FaBolt className="text-[8px] text-white" />
                </span>
              </motion.div>

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
                    Adhi Vignesh
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Hierarchy: Role → Education → Description */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                Full-Stack Developer & AI/ML Engineer
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-sm" /> B.Tech CSE (AI & ML) • Aurora University • 2024–2028
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl pt-0.5">
                Building scalable web applications, AI-powered products, and developer-focused solutions with modern production stacks.
              </p>
            </motion.div>

            {/* Specialization Cards Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:border-indigo-500/50 hover:shadow-md group transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <FaLayerGroup className="text-xs" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Full-Stack</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                  REST APIs • SSE • JWT • Workverse
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:border-purple-500/50 hover:shadow-md group transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <FaBrain className="text-xs" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">AI / ML</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                  TF-IDF • Recommendations • Automation
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative overflow-hidden p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:border-emerald-500/50 hover:shadow-md group transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <FaDatabase className="text-xs" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">System Design</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                  PostgreSQL • MongoDB • C Algorithms
                </p>
              </motion.div>

            </motion.div>

            {/* Core Technology Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1">
                CORE STACK:
              </span>
              {heroTechs.map((tech, idx) => (
                <motion.span 
                  key={idx} 
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-2xs cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 pt-1">
              <MagneticButton strength={0.25}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Explore Projects <FaArrowRight className="text-[10px]" />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href="/Adhi_Vignesh_Resume.pdf"
                  download="Adhi_Vignesh_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-xs shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FaDownload className="text-xs text-indigo-600 dark:text-indigo-400" /> Download Resume
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <button
                  onClick={onOpenCmdK}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-all border border-slate-200/60 dark:border-slate-700/60 font-mono hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FaTerminal className="text-xs text-indigo-600 dark:text-indigo-400" /> ⌘K Palette
                </button>
              </MagneticButton>
            </motion.div>

            {/* Credibility Metrics Bar */}
            <motion.div variants={itemVariants} className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col cursor-default">
                <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                  2 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Industry Internships</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col cursor-default">
                <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                  10+ <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium font-medium">Projects</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col cursor-default">
                <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono flex items-center gap-1">
                  6+ <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Certifications</span>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* Right Column: Floating Workstation Terminal with Smooth Hover Loop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -6, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              scale: { duration: 0.5, delay: 0.2 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="lg:col-span-5 flex flex-col justify-center relative group"
          >
            {/* Terminal Ambient Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />

            <div className="relative z-10">
              <InteractiveTerminal />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default HeroPlayground;
