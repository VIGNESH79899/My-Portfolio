import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaTwitter, 
  FaDownload, FaArrowRight, FaMapMarkerAlt, FaGraduationCap, FaSearch
} from 'react-icons/fa';

const Hero = ({ onOpenCmdK }) => {
  return (
    <section id="hero" className="relative pt-36 pb-20 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side Info (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Available for Full-Stack & AI/ML Opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
          >
            Hi, I'm <span className="text-gradient">Adhi Vignesh</span>
          </motion.h1>

          {/* Role Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300 mb-6"
          >
            Full-Stack Developer & AI/ML Engineer
          </motion.h2>

          {/* Paragraph Summary */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl"
          >
            Computer Science student specializing in AI & Machine Learning at <strong className="text-slate-900 dark:text-white font-semibold">Aurora University</strong>. Built production SaaS platforms (<strong className="text-slate-900 dark:text-white font-semibold">Workverse @ Sashverse Tech</strong>), REST APIs, Server-Sent Events real-time messaging, and recommendation engines with <span className="text-indigo-600 dark:text-indigo-400 font-semibold">React.js</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Node.js</span>, and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Python</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all hover:scale-[1.02]"
            >
              Explore Projects <FaArrowRight className="text-xs" />
            </a>

            <a
              href="/Adhi_Vignesh_Resume.pdf"
              download="Adhi_Vignesh_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm shadow-sm transition-all"
            >
              <FaDownload className="text-xs text-indigo-600 dark:text-indigo-400" /> Download Resume
            </a>

            <button
              onClick={onOpenCmdK}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-all border border-slate-200/60 dark:border-slate-700/60"
            >
              <FaSearch className="text-xs" /> Quick Search (⌘K)
            </button>
          </motion.div>

          {/* Social Links Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-800/80 w-full"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Socials:</span>
            <a href="https://github.com/VIGNESH79899" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/adhi-vignesh-342431289" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="mailto:vigneshadhi773@gmail.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <FaEnvelope size={18} />
            </a>
            <a href="https://x.com/Adhi_Vignesh_07" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <FaTwitter size={18} />
            </a>
          </motion.div>

        </div>

        {/* Right Side Avatar & Dashboard Pill Card (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="pro-card p-6 md:p-8 flex flex-col gap-6">
            
            {/* Avatar Profile */}
            <div className="flex items-center gap-4">
              <img
                src="/profile-pic.jpg"
                alt="Adhi Vignesh"
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Adhi Vignesh</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400" /> Hyderabad, India
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" /> Aurora University
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white block font-mono">2</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Internships</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white block font-mono">10+</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Projects</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white block font-mono">6+</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">Certificates</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white block font-mono">86.1%</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase">XII Score</span>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                Core Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["React.js", "Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "Scikit-learn"].map((tech, i) => (
                  <span key={i} className="pro-badge text-[11px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
