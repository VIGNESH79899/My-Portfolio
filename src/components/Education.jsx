import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FaGraduationCap, FaCheckCircle, 
  FaChevronRight, FaBookReader, FaLaptopCode, FaServer
} from 'react-icons/fa';

// Factual Academic & Engineering Growth Journey Data
const academicJourney = [
  {
    year: '2024',
    stage: 'FOUNDATION',
    badge: 'Academic Entry',
    title: 'Foundation & Academic Entry',
    institution: 'Aurora University · B.Tech CSE (AI & ML) (2024–2028)',
    summary: 'Enrolled in B.Tech CSE (AI & Machine Learning) at Aurora University, Hyderabad. Established foundational strength in C programming, data structures, linear algebra, and web fundamentals.',
    milestones: [
      'Graduated Class XII (MPC - Math, Physics, Chemistry) with 86.1%',
      'Enrolled in B.Tech CSE (AI & ML) at Aurora University (2024–2028)',
      'Mastered C Language, Data Structures & Algorithm Logic'
    ],
    skills: ['C Language', 'Data Structures', 'Linear Algebra', 'Algorithms', 'HTML5 & CSS3'],
    flow: ['Academic Foundation', 'Computer Science Fundamentals']
  },
  {
    year: '2025',
    stage: 'PRACTICAL DEVELOPMENT',
    badge: 'Web Engineering Growth',
    title: 'Engineering Growth & Web Development',
    institution: 'Applied Web Development & Practical Projects',
    summary: 'Transitioned CS fundamentals into practical software development. Built interactive web applications, mastered JavaScript and React component architecture, and completed Web Development Internship at StaxTech.',
    milestones: [
      'Built responsive web applications and e-commerce workflows',
      'Designed personal portfolio branding with animated UI/UX',
      'Completed Web Development Internship at StaxTech'
    ],
    skills: ['JavaScript (ES6+)', 'React.js', 'UI/UX Principles', 'Responsive Design', 'StaxTech'],
    flow: ['Academic Foundation', 'Web Development', 'Practical Engineering']
  },
  {
    year: '2026',
    stage: 'CURRENT ENGINEERING FOCUS',
    badge: 'Production Full-Stack & AI/ML',
    isCurrent: true,
    title: 'Current Engineering Focus',
    institution: 'Production Full-Stack SaaS & ML Recommendation Systems',
    summary: 'Architecting production full-stack SaaS platforms with Node.js, Express, Koa, PostgreSQL, and Server-Sent Events (SSE) stream messaging, alongside TF-IDF & Cosine Similarity ML recommendation engines.',
    milestones: [
      'Production Full-Stack SaaS Internship at Sashverse Technologies (Workverse)',
      'Engineered SSE real-time event messaging and JWT role-based security',
      'Developed AI/ML recommendation engines (TF-IDF & Cosine Similarity)'
    ],
    skills: ['Node.js', 'PostgreSQL', 'Sequelize ORM', 'SSE Real-Time', 'JWT Auth', 'Python AI/ML'],
    flow: ['Foundation', 'Web Development', 'Full-Stack SaaS', 'AI/ML']
  }
];

const Education = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  // Card Hover Spotlight & 3D Tilt (Max 2-3 degrees)
  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;
    try {
      const rect = cardRef.current.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos({ x, y });

      const xOffset = (x / rect.width - 0.5) * 3; // max 2-3 deg
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt({ 
        rx: Math.max(-2, Math.min(2, yOffset)), 
        ry: Math.max(-2, Math.min(2, xOffset)) 
      });
    } catch (err) {}
  };

  const activeIndex = academicJourney.findIndex((item) => item.year === activeYear);
  const currentData = academicJourney[activeIndex] || academicJourney[0];

  // Scroll Progress tracking for automatic step update
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%']
  });

  const beamProgress = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '50%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setActiveYear('2024');
      } else if (latest >= 0.35 && latest < 0.7) {
        setActiveYear('2025');
      } else if (latest >= 0.7) {
        setActiveYear('2026');
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="education" ref={sectionRef} className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[320px] bg-indigo-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header with Clear Degree Duration */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              ACADEMIC JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Growth & Academic Progress
            </h2>
          </div>

          {/* Explicit Degree Program Duration Badge */}
          <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs self-start md:self-auto">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-base" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  B.Tech CSE (AI & ML)
                </span>
                <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 block font-mono">
                  Aurora University · 2024–2028
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Animation — Horizontal Academic Progress Beam (2024 -> 2025 -> 2026 -> 2028) */}
        <div className="space-y-6">
          
          {/* Year Selector Tabs (STRICTLY 2024, 2025, 2026 ONLY) */}
          <div className="flex items-center justify-between max-w-xl mx-auto relative px-4">
            
            {/* Background Base Progress Line */}
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 z-0">
              {!prefersReducedMotion && (
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  style={{ width: beamProgress }}
                />
              )}
            </div>

            {/* Interactive Year Control Tabs (STRICTLY 2024, 2025, 2026 ONLY) */}
            {['2024', '2025', '2026'].map((year) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-hidden`}
                >
                  <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border transition-all duration-300 shadow-2xs ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 ring-4 ring-indigo-500/20 scale-105'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-400/50'
                  }`}>
                    {year}
                  </span>
                  
                  {/* Timeline Dot Indicator */}
                  <span className={`mt-2 w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-indigo-600 ring-2 ring-white dark:ring-slate-900 scale-125 shadow-xs' 
                      : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-indigo-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* 2028 Continuation Line Indicator (Non-Interactive Destination Node) */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-1 flex-wrap">
            <span className={activeYear === '2024' ? 'text-indigo-600 font-bold' : ''}>2024</span>
            <span className="text-indigo-500 font-bold">→</span>
            <span className={activeYear === '2025' ? 'text-indigo-600 font-bold' : ''}>2025</span>
            <span className="text-indigo-500 font-bold">→</span>
            <span className={activeYear === '2026' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>2026 (CURRENT)</span>
            <span className="w-12 h-px border-t border-dashed border-slate-300 dark:border-slate-700 mx-1" />
            <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-500">
              2028 DEGREE COMPLETION
            </span>
          </div>

        </div>

        {/* Interactive Milestone Journey Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => !isTouchDevice && !prefersReducedMotion && setIsHovered(true)}
              onMouseLeave={() => { setIsHovered(false); setTilt({ rx: 0, ry: 0 }); }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: !isTouchDevice && !prefersReducedMotion && isHovered
                  ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
                  : 'none',
                transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
              }}
              className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-2xs ${
                currentData.isCurrent
                  ? 'border-indigo-500/50 dark:border-indigo-400/50 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/30'
              }`}
            >
              {/* Soft Cursor Spotlight Glow (Barely visible 5% opacity radial purple) */}
              {!isTouchDevice && !prefersReducedMotion && isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(260px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(91, 75, 255, 0.05), transparent 80%)`
                  }}
                />
              )}

              {/* Card Header: Year, Stage Badge & Title */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      MILESTONE {currentData.year}
                    </span>
                    
                    {currentData.isCurrent ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        ● CURRENT
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                        {currentData.stage}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {currentData.title}
                  </h3>
                </div>

                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 self-start sm:self-auto shrink-0">
                  {currentData.badge}
                </span>
              </div>

              {/* Institution Subtitle */}
              <div className="relative z-10 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                <FaGraduationCap className="text-sm" />
                {currentData.institution}
              </div>

              {/* Narrative Summary */}
              <p className="relative z-10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                {currentData.summary}
              </p>

              {/* Key Milestones List (Staggered Reveal) */}
              <div className="relative z-10 space-y-2.5 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Key Academic & Technical Milestones:
                </span>
                {currentData.milestones.map((m, mIdx) => (
                  <motion.div
                    key={mIdx}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : mIdx * 0.08 }}
                    className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <FaCheckCircle className="text-indigo-600 dark:text-indigo-400 text-xs shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </motion.div>
                ))}
              </div>

              {/* Unlocked Skill Pills (Staggered Reveal) */}
              <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Skills & Technologies Unlocked:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentData.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 5, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : sIdx * 0.05 }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        currentData.isCurrent
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Academic -> Engineering Micro-Visualization Flow */}
              {currentData.flow && (
                <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Progression Phase:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                    {currentData.flow.map((stepNode, nIdx) => (
                      <React.Fragment key={nIdx}>
                        <span className={`px-2 py-0.5 rounded border ${
                          nIdx === currentData.flow.length - 1
                            ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                        }`}>
                          {stepNode}
                        </span>
                        {nIdx < currentData.flow.length - 1 && (
                          <FaChevronRight className="text-[8px] text-indigo-400 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Transition Footer Indicator */}
        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 text-center">
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <span>ACADEMIC FOUNDATION</span>
            <FaChevronRight className="text-[9px] text-indigo-500" />
            <span className="text-slate-700 dark:text-slate-300 font-semibold">ENGINEERING CAREER</span>
          </span>
        </div>

      </div>
    </section>
  );
};

export default Education;
