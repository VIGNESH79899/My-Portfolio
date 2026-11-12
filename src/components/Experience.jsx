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

      const xOffset = (x / rect.width - 0.5) * 4;
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
                <span key={sub + Math.random()} className="font-semibold text-[#252722] dark:text-[#F5F2EB] bg-[#777C62]/10 dark:bg-[#ADB293]/15 px-1 py-0.5 rounded text-[#5E634D] dark:text-[#C6CCAA]">
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
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-3px)`
          : 'none',
        transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
      }}
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border transition-all duration-300 shadow-2xs ${
        isHovered
          ? 'border-[#777C62] dark:border-[#ADB293] shadow-md shadow-[#777C62]/5'
          : 'border-[#D8D1C5] dark:border-[#414239]'
      }`}
    >
      {/* Soft Cursor Spotlight Glow */}
      {!isTouch && !isReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(280px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(119, 124, 98, 0.08), transparent 80%)`
          }}
        />
      )}

      {/* Card Top Header: Company Name, Role & Badges */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#D8D1C5]/70 dark:border-[#414239]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <span className="text-xs font-bold text-[#777C62] dark:text-[#ADB293] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <FaBuilding className="text-[#8C7258] dark:text-[#C1A17F]" /> {exp.company}
            </span>
            
            {exp.isProduction ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#777C62]/12 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/25 dark:border-[#ADB293]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
                PRODUCTION EXPERIENCE
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E7E1D6]/70 dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3] border border-[#D8D1C5] dark:border-[#414239]">
                {exp.type}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
            {exp.role}
          </h3>
        </div>

        {/* Date & Location Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#68675F] dark:text-[#C0BFB3] font-medium shrink-0">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E7E1D6]/60 dark:bg-[#303129] border border-[#D8D1C5] dark:border-[#414239] text-[#252722] dark:text-[#F5F2EB] font-mono text-[11px]">
            <FaCalendarAlt className="text-[#777C62] dark:text-[#ADB293] text-xs" /> {exp.period}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#E7E1D6]/60 dark:bg-[#303129] border border-[#D8D1C5] dark:border-[#414239] text-[#68675F] dark:text-[#C0BFB3] text-[11px]">
            <FaMapMarkerAlt className="text-[#8C7258] dark:text-[#C1A17F] text-xs" /> {exp.location}
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
            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#E7E1D6]/50 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]"
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
            className="flex items-start gap-3 text-[#68675F] dark:text-[#C0BFB3] text-sm leading-relaxed"
          >
            <FaCheckCircle className="text-[#777C62] dark:text-[#ADB293] shrink-0 mt-1 text-xs" />
            <span>{renderHighlightedText(bullet)}</span>
          </motion.li>
        ))}
      </ul>

      {/* Sashverse Compact Engineering Flow Micro-Visualization */}
      {exp.flow && (
        <div className="relative z-10 pt-4 border-t border-[#D8D1C5]/70 dark:border-[#414239]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] flex items-center gap-1.5 font-mono">
              <FaServer className="text-[#777C62] dark:text-[#ADB293] text-xs" /> Engineering SaaS Architecture Flow:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#252722] dark:text-[#F5F2EB]">
            {exp.flow.map((node, nIdx) => (
              <React.Fragment key={nIdx}>
                <span className={`px-2.5 py-1 rounded border transition-all duration-300 ${
                  flowActiveIdx === nIdx
                    ? 'bg-[#252722] text-[#F5F2EB] dark:bg-[#F5F2EB] dark:text-[#252722] border-transparent scale-105 font-bold shadow-xs'
                    : (isHovered && nIdx === exp.flow.length - 1)
                      ? 'bg-[#777C62]/15 text-[#252722] dark:text-[#F5F2EB] border-[#777C62]/40 dark:border-[#ADB293]/40 font-semibold'
                      : 'bg-[#FFFDF9] dark:bg-[#252620] border-[#D8D1C5] dark:border-[#414239]'
                }`}>
                  {node}
                </span>
                {nIdx < exp.flow.length - 1 && (
                  <FaChevronRight className={`text-[8px] transition-colors duration-200 ${
                    flowActiveIdx >= nIdx ? 'text-[#777C62] dark:text-[#ADB293]' : 'text-[#68675F] dark:text-[#C0BFB3]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons: Live Website & Certificate */}
      {(exp.liveUrl || exp.certImage) && (
        <div className="relative z-10 pt-4 border-t border-[#D8D1C5]/70 dark:border-[#414239] flex flex-wrap items-center gap-3">
          {exp.liveUrl && (
            <a
              href={exp.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Visit Live Website</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
          {exp.liveUrl && (
            <span className="text-[11px] font-mono text-[#777C62] dark:text-[#ADB293] font-semibold">
              chandeshwaraenterprises.com
            </span>
          )}
          {exp.certImage && (
            <button
              onClick={() => onOpenCert(exp)}
              className="btn-secondary text-xs cursor-pointer"
            >
              <span>View Certificate</span>
              <FaExternalLinkAlt className="text-[10px] text-[#777C62] dark:text-[#ADB293]" />
            </button>
          )}
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
    <section id="experience" ref={sectionRef} className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-[#8C7258]/5 dark:bg-[#C1A17F]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left border-b border-[#D8D1C5] dark:border-[#414239] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="pro-badge-olive mb-3 inline-block">
              WORK EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Industry Internships
            </h2>
          </div>

          <span className="text-xs font-mono font-semibold text-[#68675F] dark:text-[#C0BFB3] bg-[#FFFDF9] dark:bg-[#252620] px-3 py-1.5 rounded-lg border border-[#D8D1C5] dark:border-[#414239] self-start sm:self-auto">
            01 / 02 EXPERIENCE TIMELINE
          </span>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Desktop Central Vertical Timeline Beam */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-[#D8D1C5] dark:bg-[#414239] z-0">
            {!prefersReducedMotion && (
              <motion.div
                className="w-full bg-[#777C62] dark:bg-[#ADB293] rounded-full"
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
                  <div className="w-7 h-7 rounded-full bg-[#FFFDF9] dark:bg-[#252620] border-2 border-[#777C62] dark:border-[#ADB293] flex items-center justify-center shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
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

      {/* In-App Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div 
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#FFFDF9] dark:bg-[#252620] rounded-3xl border border-[#D8D1C5] dark:border-[#414239] p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-4 overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#D8D1C5] dark:border-[#414239] shrink-0">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">{selectedCert.company} — {selectedCert.role} Certificate</h3>
                  <p className="text-xs text-[#777C62] dark:text-[#ADB293] font-semibold">{selectedCert.period} ({selectedCert.location})</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <a
                    href={selectedCert.pdfLink || selectedCert.certImage}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs"
                  >
                    Download Document
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-[#E7E1D6]/60 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] hover:bg-[#EEE9DF] dark:hover:bg-[#36372E] border border-[#D8D1C5] dark:border-[#414239] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>

              {/* Crystal-Clear Image Embed */}
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-[#D8D1C5] dark:border-[#414239] bg-[#1C1D19] flex items-center justify-center p-2 min-h-[50vh] max-h-[72vh]">
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
