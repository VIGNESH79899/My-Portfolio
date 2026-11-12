import React, { useState, useEffect, useRef } from 'react';
import { 
  FaLaptopCode, FaBrain, FaDatabase, FaGraduationCap, 
  FaBuilding, FaChevronRight, FaCheckCircle
} from 'react-icons/fa';
import { playClickSound } from '../utils/sound';

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
      icon: <FaGraduationCap className="text-[#777C62] dark:text-[#ADB293] text-lg" />,
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
      subtitle: 'Workverse @Sashverse Technologies',
      tag: 'Production SaaS',
      icon: <FaLaptopCode className="text-[#777C62] dark:text-[#ADB293] text-lg" />,
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
      icon: <FaBrain className="text-[#8C7258] dark:text-[#C1A17F] text-lg" />,
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
      icon: <FaDatabase className="text-[#777C62] dark:text-[#ADB293] text-lg" />,
      desc: 'PostgreSQL, MySQL, MongoDB Atlas, Server-Sent Events (SSE), JWT role-based security, and C hash algorithms.',
      pipeline: ['Client Stream', 'JWT RBAC Auth', 'SQL Engine', 'Real-Time Event']
    }
  }
];

// Sub-Component for Interactive Engineering Card
const InteractiveEngineeringCard = ({ data, stepNum, isTouch, isReducedMotion, index, activeStepIndex, onCardClick }) => {
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

      const xOffset = (x / rect.width - 0.5) * 4;
      const yOffset = (y / rect.height - 0.5) * -4;
      setTilt({ rx: Math.max(-2, Math.min(2, yOffset)), ry: Math.max(-2, Math.min(2, xOffset)) });
    } catch (err) {}
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
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-2px)`
          : 'none',
        transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease, opacity 250ms ease'
      }}
      className={`relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border transition-all duration-300 cursor-pointer group ${
        isActive
          ? 'border-[#777C62]/65 dark:border-[#ADB293]/60 shadow-lg ring-1 ring-[#777C62]/20'
          : 'border-[#D8D1C5] dark:border-[#414239] shadow-2xs opacity-90 hover:opacity-100 hover:border-[#777C62]/45 hover:shadow-md'
      }`}
    >
      {/* Top Hairline Accent Strip */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] transition-opacity duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-[#777C62] via-[#ADB293] to-[#777C62] opacity-100'
            : 'bg-gradient-to-r from-[#777C62]/50 via-[#ADB293]/50 to-[#777C62]/50 opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Soft Cursor Spotlight Glow */}
      {!isTouch && !isReducedMotion && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(220px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(119, 124, 98, 0.08), transparent 80%)`
          }}
        />
      )}

      {/* Top Card Badge & Icon Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
            isActive
              ? 'bg-[#777C62]/15 dark:bg-[#ADB293]/15 border-[#777C62]/40 dark:border-[#ADB293]/40'
              : 'bg-[#E7E1D6]/65 dark:bg-[#303129] border-[#D8D1C5] dark:border-[#414239]'
          }`}>
            {data.icon}
          </div>
          <span className="text-[10px] font-mono font-bold text-[#68675F] dark:text-[#C0BFB3] tracking-wider">
            MODULE {stepNum}
          </span>
        </div>

        <span className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1.5 transition-colors ${
          isActive
            ? 'bg-[#1C1D19] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#1C1D19] shadow-xs'
            : 'bg-[#E7E1D6]/75 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]'
        }`}>
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />}
          <span>{data.tag}</span>
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="relative z-10 mb-2">
        <h4 className="text-base font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight group-hover:text-[#777C62] dark:group-hover:text-[#ADB293] transition-colors">
          {data.title}
        </h4>
        <span className="text-[11px] font-medium text-[#777C62] dark:text-[#ADB293] block mt-0.5">
          {data.subtitle}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] leading-relaxed relative z-10 mb-4 font-normal">
        {data.desc}
      </p>

      {/* Compact Interactive Micro-Visualization Pipeline */}
      {data.pipeline && (
        <div className="relative z-10 p-3 rounded-xl bg-[#F5F2EB]/75 dark:bg-[#1C1D19]/75 border border-[#D8D1C5]/80 dark:border-[#414239]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block mb-2 font-mono">
            Architecture Flow
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[#252722] dark:text-[#F5F2EB]">
            {data.pipeline.map((node, nIdx) => (
              <React.Fragment key={nIdx}>
                <span className={`px-2 py-0.5 rounded-md border transition-colors ${
                  (isHovered || isActive) && nIdx === data.pipeline.length - 1
                    ? 'bg-[#1C1D19] text-[#F5F2EB] dark:bg-[#F5F2EB] dark:text-[#1C1D19] border-transparent font-semibold shadow-2xs'
                    : 'bg-[#FFFDF9] dark:bg-[#252620] border-[#D8D1C5] dark:border-[#414239]'
                }`}>
                  {node}
                </span>
                {nIdx < data.pipeline.length - 1 && (
                  <FaChevronRight className="text-[8px] text-[#777C62] dark:text-[#ADB293] shrink-0" />
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
      } catch (e) {}
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
        { threshold: 0.2, rootMargin: '-20% 0px -40% 0px' }
      );

      const elements = document.querySelectorAll('.step-narrative-block');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    } catch (e) {}
  }, []);

  const handleStepSelect = (index, scrollTarget = true) => {
    try { playClickSound(); } catch (e) {}
    setActiveStep(index);
    if (scrollTarget && typeof document !== 'undefined') {
      const targetEl = document.querySelector(`[data-step-index="${index}"]`);
      if (targetEl && targetEl.scrollIntoView) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const activeStepData = stepsData[activeStep] || stepsData[0];

  return (
    <section id="about" className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] border-y border-[#D8D1C5] dark:border-[#414239] relative overflow-hidden font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#D8D1C5] dark:border-[#414239]">
          <div>
            <span className="pro-badge-olive mb-3 inline-block">
              ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Background &amp; Engineering Focus
            </h2>
            <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-2 font-normal">
              From computer science fundamentals to production full-stack SaaS and applied AI engineering
            </p>
          </div>

          {/* Interactive 01 -> 04 Chapter Progress Capsule */}
          <div className="flex items-center gap-3 bg-[#FFFDF9] dark:bg-[#252620] px-4 py-2 rounded-full border border-[#D8D1C5] dark:border-[#414239] shadow-2xs self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-bold text-[#252722] dark:text-[#F5F2EB] font-mono">
              {activeStepData.num}
            </span>
            <div className="w-20 sm:w-28 h-1.5 bg-[#E7E1D6] dark:bg-[#303129] rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#777C62] to-[#ADB293] transition-all duration-300 rounded-full"
                style={{ width: `${((activeStep + 1) / stepsData.length) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#68675F] dark:text-[#C0BFB3] font-mono">
              0{stepsData.length}
            </span>
          </div>
        </div>

        {/* Interactive Venom Pillar Quick-Jump Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {stepsData.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepSelect(index, true)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'pill-venom-active shadow-md'
                    : 'pill-venom-inactive hover:-translate-y-0.5'
                }`}
              >
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full leading-none ${
                  isActive
                    ? 'bg-white/20 text-current'
                    : 'bg-[#E7E1D6] dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3]'
                }`}>
                  {step.num}
                </span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Storytelling Grid: Left Narrative Steps (7 Cols) / Right Interactive Cards (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Narrative Steps */}
          <div className="lg:col-span-7 space-y-6">
            {stepsData.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  data-step-index={index}
                  onClick={() => handleStepSelect(index, false)}
                  className={`step-narrative-block relative overflow-hidden transition-all duration-300 p-5 sm:p-6 rounded-2xl border cursor-pointer ${
                    isActive 
                      ? 'bg-[#FFFDF9] dark:bg-[#252620] border-[#777C62]/55 dark:border-[#ADB293]/50 shadow-md ring-1 ring-[#777C62]/15' 
                      : 'bg-[#FFFDF9]/55 dark:bg-[#252620]/55 border-[#D8D1C5]/75 dark:border-[#414239]/75 opacity-85 hover:opacity-100 hover:bg-[#FFFDF9] dark:hover:bg-[#252620]'
                  }`}
                >
                  {/* Active Left Accent Rail */}
                  <div
                    className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-b from-[#777C62] via-[#ADB293] to-[#777C62] opacity-100'
                        : 'opacity-0'
                    }`}
                  />

                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full transition-colors ${
                        isActive 
                          ? 'bg-[#1C1D19] text-[#F5F2EB] dark:bg-[#F5F2EB] dark:text-[#1C1D19] shadow-2xs' 
                          : 'bg-[#E7E1D6] dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3]'
                      }`}>
                        {step.num}
                      </span>
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                        isActive ? 'text-[#777C62] dark:text-[#ADB293]' : 'text-[#68675F] dark:text-[#C0BFB3]'
                      }`}>
                        {step.label}
                      </span>
                    </div>

                    {isActive && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#777C62]/12 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/25 dark:border-[#ADB293]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active Focus</span>
                      </span>
                    )}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Narrative Text */}
                  <div className="space-y-3 text-sm text-[#68675F] dark:text-[#C0BFB3] leading-relaxed">
                    {step.narrative.map((paragraph, pIdx) => (
                      <p key={pIdx} className={paragraph.type === 'lead' ? 'text-[#252722] dark:text-[#F5F2EB] font-medium' : ''}>
                        {paragraph.text}
                      </p>
                    ))}
                  </div>

                  {/* Highlighted Sashverse Case Study Block inside Step 02 */}
                  {step.productionBlock && (
                    <div className="relative overflow-hidden mt-5 p-4 sm:p-5 rounded-xl bg-[#F5F2EB]/90 dark:bg-[#1C1D19]/70 border border-[#777C62]/35 dark:border-[#ADB293]/35 space-y-2.5 shadow-2xs">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#777C62] via-[#ADB293] to-[#777C62]" />
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-bold text-[#5E634D] dark:text-[#ADB293] tracking-wider uppercase flex items-center gap-1.5 font-mono">
                          <FaBuilding className="text-xs" />
                          <span>{step.productionBlock.badge}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#252722] dark:text-[#F5F2EB] bg-[#FFFDF9] dark:bg-[#252620] px-2.5 py-0.5 rounded-full border border-[#D8D1C5] dark:border-[#414239]">
                          <FaCheckCircle className="text-[9px] text-emerald-500" />
                          <span>{step.productionBlock.period}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#252722] dark:text-[#F5F2EB] font-heading">
                        {step.productionBlock.company} — <span className="text-[#777C62] dark:text-[#ADB293]">{step.productionBlock.project}</span>
                      </h4>

                      <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] leading-relaxed font-normal">
                        {step.productionBlock.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(step.productionBlock.techs || step.productionBlock.stack || []).map((t, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#FFFDF9] dark:bg-[#252620] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Keyword Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#D8D1C5]/60 dark:border-[#414239]/70">
                    {step.highlights.map((kw, kIdx) => (
                      <span key={kIdx} className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#E7E1D6]/60 dark:bg-[#303129]/75 text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]">
                        {kw}
                      </span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Engineering Cards & Visual Connection System */}
          <div className="lg:col-span-5 relative space-y-5 lg:sticky lg:top-24">
            
            {/* Desktop Vertical Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-0.5 bg-[#D8D1C5] dark:bg-[#414239] pointer-events-none z-0">
              {!prefersReducedMotion && (
                <div 
                  className="w-2.5 h-2.5 bg-emerald-500 ring-4 ring-[#F5F2EB] dark:ring-[#1C1D19] rounded-full shadow-xs -translate-x-[4px] transition-all duration-500"
                  style={{ top: `${(activeStep / (stepsData.length - 1)) * 88 + 6}%`, position: 'absolute' }}
                />
              )}
            </div>

            {/* Cards List */}
            {stepsData.map((step, index) => (
              <div key={step.id} className="relative z-10">
                <InteractiveEngineeringCard
                  data={step.card}
                  stepNum={step.num}
                  isTouch={isTouchDevice}
                  isReducedMotion={prefersReducedMotion}
                  index={index}
                  activeStepIndex={activeStep}
                  onCardClick={(idx) => handleStepSelect(idx, true)}
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
