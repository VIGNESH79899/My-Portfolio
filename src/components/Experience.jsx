import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, 
  FaExternalLinkAlt, FaTimes, FaBuilding, FaChevronRight, FaServer
} from 'react-icons/fa';

// Core Factual Experience Data
const experiences = [
  {
    id: 'sashverse',
    year: '2026',
    company: 'Sashverse Technologies',
    role: 'Full Stack Developer Intern',
    period: 'Apr 2026 – Jun 2026',
    location: 'Hyderabad, India',
    type: 'Production Internship',
    isProduction: true,
    tech: ['React.js', 'Node.js', 'Express.js', 'Koa.js', 'PostgreSQL', 'Sequelize ORM', 'SSE Real-Time', 'JWT Auth'],
    highlights: ['Workverse', 'REST APIs', 'Server-Sent Events', 'JWT authentication', 'role-based authorization', 'PostgreSQL', 'Sequelize ORM'],
    description: [
      'Contributed to Workverse, a production SaaS internship management platform supporting onboarding, task workflows, communication, timesheets, and project tracking.',
      'Developed task assignment and lifecycle workflows and built REST APIs using Node.js, Express, Koa, PostgreSQL, and Sequelize ORM.',
      'Engineered real-time group and direct messaging using Server-Sent Events (SSE), including live updates and user mentions.',
      'Implemented JWT authentication, role-based authorization, and a referral and reward system with database-backed transaction tracking.'
    ],
    flow: ['Frontend UI', 'REST API', 'Node / Express', 'PostgreSQL', 'SSE Stream'],
    certImage: '/certficates/SASHVERSE-CERTIFICATE.jpg',
    pdfLink: '/SASHVERSE-INTERNSHIP-CERTIFICATE.pdf'
  },
  {
    id: 'staxtech',
    year: '2025',
    company: 'StaxTech',
    role: 'Web Development Intern',
    period: 'May 2025 – Jun 2025',
    location: 'Remote',
    type: 'Web Internship',
    isProduction: false,
    tech: ['HTML5', 'CSS3', 'JavaScript', 'E-Commerce', 'UI/UX', 'Responsive Design'],
    highlights: ['responsive web applications', 'e-commerce application', 'personal portfolio website', 'UI/UX principles'],
    description: [
      'Built responsive web applications using HTML, CSS, and JavaScript, including a portfolio website and an e-commerce application with product listings, cart functionality, and checkout workflow.',
      'Designed and deployed personal portfolio website with smooth animations for digital branding.',
      'Improved understanding of UI/UX principles and scalable project structure.'
    ],
    flow: null,
    certImage: '/certficates/STAXTECH-CERTIFICATE.jpg',
    pdfLink: '/STAXTECH-INTERNSHIP-CERTIFICATE.pdf'
  }
];

// Single Experience Card Component
const ExperienceCard = ({ exp, index, isTouch, isReducedMotion, onOpenCert }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [flowActiveIdx, setFlowActiveIdx] = useState(-1);

  // Card Hover Spotlight & 3D Tilt
  const handleMouseMove = (e) => {
    if (isTouch || isReducedMotion || !cardRef.current) return;
    try {
      const rect = cardRef.current.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos({ x, y });

      const xOffset = (x / rect.width - 0.5) * 4; // max 2-3 deg
      const yOffset = (y / rect.height - 0.5) * -4;
      setTilt({ 
        rx: Math.max(-2.5, Math.min(2.5, yOffset)), 
        ry: Math.max(-2.5, Math.min(2.5, xOffset)) 
      });
    } catch (err) {}
  };

  const handleMouseEnter = () => {
    if (!isTouch && !isReducedMotion) {
      setIsHovered(true);
      // Trigger one-time micro-visualization flow signal on Sashverse card
      if (exp.flow) {
        setFlowActiveIdx(0);
        let current = 0;
        const interval = setInterval(() => {
          current++;
          if (current < exp.flow.length) {
            setFlowActiveIdx(current);
          } else {
            clearInterval(interval);
            setTimeout(() => setFlowActiveIdx(-1), 400);
          }
        }, 180);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setFlowActiveIdx(-1);
  };

  // Helper to highlight key concepts in bullets
  const renderHighlightedText = (text) => {
    if (!exp.highlights) return text;
    let parts = [text];
    
    exp.highlights.forEach((kw) => {
      const newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const split = part.split(new RegExp(`(${kw})`, 'gi'));
          split.forEach((sub) => {
            if (sub.toLowerCase() === kw.toLowerCase()) {
              newParts.push(
                <span key={sub + Math.random()} className="font-semibold text-slate-900 dark:text-white bg-indigo-500/10 dark:bg-indigo-400/15 px-1 py-0.5 rounded text-indigo-700 dark:text-indigo-300">
                  {sub}
                </span>
              );
            } else {
              newParts.push(sub);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 30 : -30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: !isTouch && !isReducedMotion && isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
          : 'none',
        transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
      }}
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-2xs ${
        isHovered
          ? 'border-indigo-400/40 dark:border-indigo-500/40 shadow-md shadow-indigo-500/5'
          : 'border-slate-200/80 dark:border-slate-800/80'
      }`}
    >
      {/* Soft Cursor Spotlight Glow (5-8% opacity radial purple) */}
      {!isTouch && !isReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(91, 75, 255, 0.07), transparent 80%)`
          }}
        />
      )}

      {/* Card Top Header: Company Name, Role & Badges */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaBuilding className="text-indigo-500" /> {exp.company}
            </span>
            
            {exp.isProduction ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                PRODUCTION EXPERIENCE
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {exp.type}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {exp.role}
          </h3>
        </div>

        {/* Date & Location Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
            <FaCalendarAlt className="text-indigo-500 text-xs" /> {exp.period}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-[11px]">
            <FaMapMarkerAlt className="text-slate-400 text-xs" /> {exp.location}
          </span>
        </div>
      </div>

      {/* Staggered Technology Pills */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mb-6">
        {exp.tech.map((t, tIdx) => (
          <motion.span
            key={tIdx}
            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: isReducedMotion ? 0 : tIdx * 0.05, ease: 'easeOut' }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 ${
              ['Node.js', 'PostgreSQL', 'SSE Real-Time', 'JWT Auth'].includes(t)
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60'
                : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* Staggered Bullet Points */}
      <ul className="relative z-10 space-y-3 mb-6">
        {exp.description.map((bullet, bIdx) => (
          <motion.li
            key={bIdx}
            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: isReducedMotion ? 0 : bIdx * 0.08, ease: 'easeOut' }}
            className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed"
          >
            <FaCheckCircle className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-1 text-xs" />
            <span>{renderHighlightedText(bullet)}</span>
          </motion.li>
        ))}
      </ul>

      {/* Sashverse Compact Engineering Flow Micro-Visualization */}
      {exp.flow && (
        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FaServer className="text-indigo-500 text-xs" /> Engineering SaaS Architecture Flow:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
            {exp.flow.map((node, nIdx) => (
              <React.Fragment key={nIdx}>
                <span className={`px-2.5 py-1 rounded border transition-all duration-300 ${
                  flowActiveIdx === nIdx
                    ? 'bg-indigo-600 text-white border-indigo-500 scale-105 font-bold shadow-xs'
                    : (isHovered && nIdx === exp.flow.length - 1)
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                }`}>
                  {node}
                </span>
                {nIdx < exp.flow.length - 1 && (
                  <FaChevronRight className={`text-[8px] transition-colors duration-200 ${
                    flowActiveIdx >= nIdx ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Button (StaxTech) */}
      {exp.certImage && (
        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            onClick={() => onOpenCert(exp)}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 shadow-2xs hover:shadow-xs"
          >
            <span>View Certificate</span>
            <FaExternalLinkAlt className="text-[10px] text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Experience = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  // Timeline Scroll Beam Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 30%']
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-purple-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left border-b border-slate-200/80 dark:border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              WORK EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Industry Internships
            </h2>
          </div>

          <span className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
            01 / 02 EXPERIENCE TIMELINE
          </span>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Desktop Central Vertical Timeline Beam (hidden on small screens, left-aligned on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-200 dark:bg-slate-800 z-0">
            {/* Scroll-Driven Purple Beam */}
            {!prefersReducedMotion && (
              <motion.div
                className="w-full bg-gradient-to-b from-indigo-500 via-indigo-600 to-purple-600 rounded-full"
                style={{ height: beamHeight }}
              />
            )}
          </div>

          {/* Timeline Nodes & Cards List */}
          <div className="space-y-12 md:space-y-16 relative z-10">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-stretch gap-6 md:gap-12">
                
                {/* Timeline Year Node Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-400 flex items-center justify-center shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  </div>
                </div>

                {/* Left/Right Column Grid Placement on Desktop */}
                <div className={`w-full pl-10 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-left' : 'md:pl-12 md:ml-auto'}`}>
                  <ExperienceCard
                    exp={exp}
                    index={index}
                    isTouch={isTouchDevice}
                    isReducedMotion={prefersReducedMotion}
                    onOpenCert={(expObj) => setSelectedCert(expObj)}
                  />
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 100% Bulletproof In-App Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div 
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-4 overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">{selectedCert.company} — {selectedCert.role} Certificate</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedCert.period} ({selectedCert.location})</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={selectedCert.pdfLink || selectedCert.certImage}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/40 text-xs font-mono font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Download Document
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>

              {/* Crystal-Clear Image Embed */}
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-950 flex items-center justify-center p-2 min-h-[50vh] max-h-[72vh]">
                <img
                  src={selectedCert.certImage}
                  alt={`${selectedCert.company} Certificate`}
                  className="w-full h-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Experience;
