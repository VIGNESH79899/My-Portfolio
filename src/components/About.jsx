import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLaptopCode, FaBrain, FaDatabase, FaGraduationCap, 
  FaBuilding, FaChevronRight
} from 'react-icons/fa';

// Step Data with Narrative Content & Card Visualizations
const stepsData = [
  {
    id: '01',
    num: '01',
    label: 'WHO I AM',
    title: 'Computer Science & AI/ML Engineer',
    narrative: [
      {
        type: 'lead',
        text: 'I am a B.Tech student in Computer Science Engineering (AI & Machine Learning) at Aurora University, Hyderabad (2024–2028).'
      },
      {
        type: 'text',
        text: 'My foundation combines core computer science fundamentals—data structures, algorithm design, and linear algebra—with modern software architecture to build robust, scalable applications.'
      }
    ],
    highlights: ['Aurora University', 'AI & Machine Learning', 'Software Architecture'],
    card: {
      title: 'Academic & CS Foundation',
      subtitle: 'Aurora University • 2024–2028',
      tag: 'B.Tech CSE (AI & ML)',
      icon: <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 text-lg" />,
      desc: 'Data Structures, Algorithms, Linear Algebra, Machine Learning Theory, and System Design.',
      pipeline: ['CS Theory', 'Algorithms', 'Math & Linear Algebra', 'AI Systems']
    }
  },
  {
    id: '02',
    num: '02',
    label: 'WHAT I BUILD',
    title: 'Production Full-Stack SaaS Platforms',
    narrative: [
      {
        type: 'text',
        text: 'My primary focus is full-stack web development and REST API engineering. I specialize in building complete web products with robust authentication, role-based authorization, and real-time event streaming.'
      }
    ],
    highlights: ['full-stack web development', 'REST API design', 'production SaaS'],
    productionBlock: {
      badge: 'PRODUCTION INTERNSHIP EXPERIENCE',
      company: 'Sashverse Technologies',
      role: 'Full-Stack Developer Intern',
      period: 'Apr 2026 – Jun 2026',
      project: 'Workverse — Production SaaS Platform',
      desc: 'Architected REST APIs, database schemas, real-time messaging, and referral reward systems.',
      stack: ['Node.js', 'Express', 'Koa', 'PostgreSQL', 'Sequelize', 'SSE Stream', 'JWT Auth']
    },
    card: {
      title: 'Full-Stack SaaS Engineering',
      subtitle: 'Workverse @ Sashverse Tech',
      tag: 'Production SaaS',
      icon: <FaLaptopCode className="text-indigo-600 dark:text-indigo-400 text-lg" />,
      desc: 'REST API architecture, SSE real-time streams, JWT auth, and PostgreSQL schema design.',
      pipeline: ['Client UI', 'REST / SSE API', 'Node.js Engine', 'PostgreSQL DB']
    }
  },
  {
    id: '03',
    num: '03',
    label: 'WHAT I EXPLORE',
    title: 'AI, NLP & Recommendation Engines',
    narrative: [
      {
        type: 'text',
        text: 'Developing intelligent machine learning pipelines and automated content tools. I have built content-based recommendation systems using TF-IDF text vectorization and cosine similarity, as well as automated AI document generation engines.'
      }
    ],
    highlights: ['machine learning algorithms', 'TF-IDF vectorization', 'cosine similarity'],
    card: {
      title: 'AI & Recommendation Engines',
      subtitle: 'NLP & ML Vectorization',
      tag: 'Machine Learning',
      icon: <FaBrain className="text-purple-600 dark:text-purple-400 text-lg" />,
      desc: 'Content-based movie recommendation systems, TF-IDF vector space, cosine similarity, and automated AI DOCX tools.',
      pipeline: ['Text Raw Data', 'TF-IDF Vector', 'Cosine Sim Matrix', 'Top Recommendations']
    }
  },
  {
    id: '04',
    num: '04',
    label: 'HOW I ENGINEER',
    title: 'Databases, Systems & Real-Time Security',
    narrative: [
      {
        type: 'text',
        text: 'Designing relational and document database schemas alongside low-level memory structures. Experienced in implementing Server-Sent Events (SSE) for live user communication, password hashing in C, and mathematical Rank-Nullity image compression.'
      }
    ],
    highlights: ['database systems', 'real-time messaging', 'JWT authentication'],
    card: {
      title: 'Real-Time Systems & Security',
      subtitle: 'PostgreSQL, SSE Streams & C Systems',
      tag: 'Databases & Systems',
      icon: <FaDatabase className="text-emerald-600 dark:text-emerald-400 text-lg" />,
      desc: 'PostgreSQL, MySQL, MongoDB Atlas, Server-Sent Events (SSE), JWT role-based security, and C hash algorithms.',
      pipeline: ['Client Stream', 'JWT RBAC Auth', 'SQL Engine', 'Real-Time Event']
    }
  }
];

// Sub-Component for Interactive Engineering Card
const InteractiveEngineeringCard = ({ data, isTouch, isReducedMotion, index, activeStepIndex, onCardClick }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isTouch || isReducedMotion || !cardRef.current) return;
    try {
      const rect = cardRef.current.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos({ x, y });

      const xOffset = (x / rect.width - 0.5) * 4; // max 2 deg
      const yOffset = (y / rect.height - 0.5) * -4; // max 2 deg
      setTilt({ rx: Math.max(-2, Math.min(2, yOffset)), ry: Math.max(-2, Math.min(2, xOffset)) });
    } catch (err) {
      // Fail silently without crashing render
    }
  };

  const handleMouseEnter = () => {
    if (!isTouch && !isReducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const isActive = activeStepIndex === index;

  if (!data) return null;

  return (
    <div
      ref={cardRef}
      onClick={() => onCardClick && onCardClick(index)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: !isTouch && !isReducedMotion && isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-3px)`
          : 'none',
        transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
      }}
      className={`relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 shadow-2xs cursor-pointer ${
        isActive
          ? 'border-indigo-500/50 dark:border-indigo-400/50 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/30'
      }`}
    >
      {/* Soft Cursor Spotlight Glow */}
      {!isTouch && !isReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(91, 75, 255, 0.07), transparent 80%)`
          }}
        />
      )}

      {/* Top Card Badge & Icon Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 shrink-0">
          {data.icon}
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {data.tag}
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="relative z-10 mb-2">
        <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          {data.title}
        </h4>
        <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 block">
          {data.subtitle}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed relative z-10 mb-4 font-normal">
        {data.desc}
      </p>

      {/* Compact Interactive Micro-Visualization Pipeline */}
      {data.pipeline && (
        <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Engineering Flow:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
            {data.pipeline.map((node, nIdx) => (
              <React.Fragment key={nIdx}>
                <span className={`px-2 py-0.5 rounded border transition-colors ${
                  (isHovered || isActive) && nIdx === data.pipeline.length - 1
                    ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                }`}>
                  {node}
                </span>
                {nIdx < data.pipeline.length - 1 && (
                  <FaChevronRight className="text-[8px] text-indigo-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const About = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {
        // Safe fallback
      }
    }
  }, []);

  // Safe IntersectionObserver for step detection
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stepIdx = Number(entry.target.getAttribute('data-step-index'));
              if (!isNaN(stepIdx) && stepIdx >= 0 && stepIdx < stepsData.length) {
                setActiveStep(stepIdx);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      const elements = document.querySelectorAll('.step-narrative-block');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } catch (e) {
      // Safe fallback if IntersectionObserver fails
    }
  }, []);

  const handleCardClick = (index) => {
    setActiveStep(index);
    if (typeof document !== 'undefined') {
      const targetEl = document.querySelector(`[data-step-index="${index}"]`);
      if (targetEl && targetEl.scrollIntoView) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section id="about" className="py-20 px-6 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Background & Engineering Focus
            </h2>
          </div>

          {/* Compact 01 -> 04 Scroll Progress Bar */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs self-start sm:self-auto">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">01</span>
            <div className="w-24 sm:w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 rounded-full"
                style={{ width: `${((activeStep + 1) / stepsData.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">04</span>
          </div>
        </div>

        {/* Storytelling Grid: Left Narrative Steps (7 Cols) / Right Interactive Cards (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative Steps */}
          <div className="lg:col-span-7 space-y-8">
            {stepsData.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  data-step-index={index}
                  className={`step-narrative-block transition-all duration-300 p-5 sm:p-6 rounded-2xl border ${
                    isActive 
                      ? 'bg-white dark:bg-slate-900 border-indigo-500/30 dark:border-indigo-400/30 shadow-xs' 
                      : 'bg-transparent border-transparent opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {step.num}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Narrative Text */}
                  <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.narrative.map((paragraph, pIdx) => (
                      <p key={pIdx} className={paragraph.type === 'lead' ? 'text-slate-800 dark:text-slate-200 font-medium' : ''}>
                        {paragraph.text}
                      </p>
                    ))}
                  </div>

                  {/* Highlighted Sashverse Case Study Block inside Step 02 */}
                  {step.productionBlock && (
                    <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/80 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 tracking-wider uppercase flex items-center gap-1">
                          <FaBuilding className="text-xs" /> {step.productionBlock.badge}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                          {step.productionBlock.period}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {step.productionBlock.company} — <span className="text-indigo-600 dark:text-indigo-400">{step.productionBlock.project}</span>
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {step.productionBlock.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {(step.productionBlock.techs || step.productionBlock.stack || []).map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyword Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {step.highlights.map((kw, kIdx) => (
                      <span key={kIdx} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {kw}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Engineering Cards & Visual Connection System */}
          <div className="lg:col-span-5 relative space-y-6 lg:sticky lg:top-28">
            
            {/* Desktop Vertical Connection Line with Slow Purple Pulse Signal */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-slate-200/80 dark:bg-slate-800 pointer-events-none z-0">
              {!prefersReducedMotion && (
                <div 
                  className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-xs -translate-x-[2px] transition-all duration-500"
                  style={{ top: `${(activeStep / (stepsData.length - 1)) * 90 + 5}%`, position: 'absolute' }}
                />
              )}
            </div>

            {/* Cards List */}
            {stepsData.map((step, index) => (
              <div key={step.id} className="relative z-10">
                <InteractiveEngineeringCard
                  data={step.card}
                  isTouch={isTouchDevice}
                  isReducedMotion={prefersReducedMotion}
                  index={index}
                  activeStepIndex={activeStep}
                  onCardClick={handleCardClick}
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;



