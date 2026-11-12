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

  // Card Hover Spotlight & 3D Tilt
  const handleMouseMove = (e) => {
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;
    try {
      const rect = cardRef.current.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos({ x, y });

      const xOffset = (x / rect.width - 0.5) * 3;
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
    <section id="education" ref={sectionRef} className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] border-y border-[#D8D1C5] dark:border-[#414239] relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[320px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        
        {/* Section Header with Clear Degree Duration */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D1C5] dark:border-[#414239]">
          <div>
            <span className="pro-badge-olive mb-3 inline-block">
              ACADEMIC JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Engineering Growth &amp; Academic Progress
            </h2>
          </div>

          {/* Explicit Degree Program Duration Badge */}
          <div className="bg-[#FFFDF9] dark:bg-[#252620] px-4 py-2.5 rounded-xl border border-[#D8D1C5] dark:border-[#414239] shadow-2xs self-start md:self-auto">
            <div className="flex items-center gap-2.5">
              <FaGraduationCap className="text-[#777C62] dark:text-[#ADB293] text-base" />
              <div>
                <span className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] block leading-tight font-heading">
                  B.Tech CSE (AI &amp; ML)
                </span>
                <span className="text-[11px] font-medium text-[#777C62] dark:text-[#ADB293] block font-mono">
                  Aurora University · 2024–2028
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sleek Milestone Timeline Selector */}
        <div className="max-w-xl mx-auto space-y-3">
          <div className="p-1.5 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-sm grid grid-cols-3 gap-1.5">
            {[
              { year: '2024', label: 'Foundation' },
              { year: '2025', label: 'Development' },
              { year: '2026', label: 'Current Focus', isCurrent: true }
            ].map(({ year, label, isCurrent }) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`relative py-2 sm:py-2.5 px-1.5 sm:px-3 rounded-xl text-center transition-all duration-200 cursor-pointer focus:outline-none ${
                    isActive
                      ? 'pill-venom-active shadow-md font-bold text-white'
                      : 'pill-venom-inactive hover:-translate-y-0.5'
                  }`}
                  aria-label={`View ${year} milestones`}
                >
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                    {isCurrent && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#ADB293] dark:bg-[#777C62]' : 'bg-[#777C62] dark:bg-[#ADB293]'} animate-pulse`} />
                    )}
                    <span className="font-mono text-xs sm:text-sm font-bold">{year}</span>
                  </div>
                  <span className={`text-[10px] sm:text-[11px] block mt-0.5 truncate font-sans ${
                    isActive ? 'text-[#F5F2EB]/80 dark:text-[#252722]/80' : 'text-[#68675F]/80 dark:text-[#C0BFB3]/80'
                  }`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Academic Target Subtext */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#68675F] dark:text-[#C0BFB3]">
            <span>Active Journey: 2024 – 2026</span>
            <span className="text-[#D8D1C5] dark:text-[#414239]">•</span>
            <span className="text-[#777C62] dark:text-[#ADB293] font-medium">B.Tech Degree Target: 2028</span>
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
                  ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-3px)`
                  : 'none',
                transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
              }}
              className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border transition-all duration-300 shadow-2xs ${
                currentData.isCurrent
                  ? 'border-[#777C62] dark:border-[#ADB293] shadow-md shadow-[#777C62]/5 ring-1 ring-[#777C62]/20'
                  : 'border-[#D8D1C5] dark:border-[#414239] hover:border-[#777C62]/40'
              }`}
            >
              {/* Soft Cursor Spotlight Glow */}
              {!isTouchDevice && !prefersReducedMotion && isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(260px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(119, 124, 98, 0.07), transparent 80%)`
                  }}
                />
              )}

              {/* Card Header: Year, Stage Badge & Title */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#D8D1C5]/70 dark:border-[#414239]">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#777C62] dark:text-[#ADB293] uppercase tracking-wider">
                      MILESTONE {currentData.year}
                    </span>
                    
                    {currentData.isCurrent ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#777C62]/12 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/25 dark:border-[#ADB293]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
                        ● CURRENT
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E7E1D6]/70 dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3] border border-[#D8D1C5] dark:border-[#414239] uppercase tracking-wider">
                        {currentData.stage}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
                    {currentData.title}
                  </h3>
                </div>

                <span className="text-xs font-medium text-[#252722] dark:text-[#F5F2EB] bg-[#E7E1D6]/60 dark:bg-[#303129] px-3 py-1.5 rounded-lg border border-[#D8D1C5] dark:border-[#414239] self-start sm:self-auto shrink-0 font-mono">
                  {currentData.badge}
                </span>
              </div>

              {/* Institution Subtitle */}
              <div className="relative z-10 text-xs font-semibold text-[#777C62] dark:text-[#ADB293] mb-3 flex items-center gap-1.5">
                <FaGraduationCap className="text-sm" />
                {currentData.institution}
              </div>

              {/* Narrative Summary */}
              <p className="relative z-10 text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] leading-relaxed mb-6 font-normal">
                {currentData.summary}
              </p>

              {/* Key Milestones List */}
              <div className="relative z-10 space-y-2.5 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block mb-1 font-mono">
                  Key Academic &amp; Technical Milestones:
                </span>
                {currentData.milestones.map((m, mIdx) => (
                  <motion.div
                    key={mIdx}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: prefersReducedMotion ? 0 : mIdx * 0.08 }}
                    className="flex items-start gap-2.5 text-xs text-[#252722] dark:text-[#F5F2EB]"
                  >
                    <FaCheckCircle className="text-[#777C62] dark:text-[#ADB293] text-xs shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </motion.div>
                ))}
              </div>

              {/* Unlocked Skill Pills */}
              <div className="relative z-10 pt-4 border-t border-[#D8D1C5]/70 dark:border-[#414239] mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block mb-2 font-mono">
                  Skills &amp; Technologies Unlocked:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentData.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 5, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : sIdx * 0.05 }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#E7E1D6]/60 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Academic -> Engineering Micro-Visualization Flow */}
              {currentData.flow && (
                <div className="relative z-10 pt-3 border-t border-[#D8D1C5]/70 dark:border-[#414239]">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block mb-1.5 font-mono">
                    Progression Phase:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#252722] dark:text-[#F5F2EB]">
                    {currentData.flow.map((stepNode, nIdx) => (
                      <React.Fragment key={nIdx}>
                        <span className={`px-2 py-0.5 rounded border ${
                          nIdx === currentData.flow.length - 1
                            ? 'bg-[#252722] text-[#F5F2EB] dark:bg-[#F5F2EB] dark:text-[#252722] border-transparent font-semibold'
                            : 'bg-[#FFFDF9] dark:bg-[#252620] border-[#D8D1C5] dark:border-[#414239]'
                        }`}>
                          {stepNode}
                        </span>
                        {nIdx < currentData.flow.length - 1 && (
                          <FaChevronRight className="text-[8px] text-[#777C62] dark:text-[#ADB293] shrink-0" />
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
        <div className="pt-8 border-t border-[#D8D1C5]/70 dark:border-[#414239] text-center">
          <span className="text-[11px] font-mono text-[#68675F] dark:text-[#C0BFB3] uppercase tracking-widest flex items-center justify-center gap-2">
            <span>ACADEMIC FOUNDATION</span>
            <FaChevronRight className="text-[9px] text-[#777C62] dark:text-[#ADB293]" />
            <span className="text-[#252722] dark:text-[#F5F2EB] font-semibold">ENGINEERING CAREER</span>
          </span>
        </div>

      </div>
    </section>
  );
};

export default Education;
