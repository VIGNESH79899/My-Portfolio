import React, { useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaServer, FaDatabase, FaBrain, FaTools, FaLayerGroup,
  FaPython, FaJs, FaPhp, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaBolt, FaShieldAlt,
  FaGitAlt, FaLaptopCode, FaPlug, FaChartLine, FaChartBar, FaCloud, FaAtom
} from 'react-icons/fa';
import { 
  SiTypescript, SiPostgresql, SiMysql, SiMongodb, SiSupabase, 
  SiExpress, SiTailwindcss, SiPostman, SiVercel 
} from 'react-icons/si';
import TechRadar3D from './TechRadar3D';
import { playClickSound } from '../utils/sound';

const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: <FaCode className="text-[#777C62] dark:text-[#ADB293]" />,
    barColor: "bg-[#777C62] dark:bg-[#ADB293]",
    skills: [
      { name: "Python", level: 92, icon: FaPython, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Production" },
      { name: "JavaScript (ES6+)", level: 90, icon: FaJs, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Production" },
      { name: "TypeScript", level: 85, icon: SiTypescript, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Advanced" },
      { name: "C Language", level: 88, icon: FaCode, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Systems" },
      { name: "PHP", level: 80, icon: FaPhp, iconColor: "text-[#68675F] dark:text-[#C0BFB3]", tag: "Proficient" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: <FaLayerGroup className="text-[#777C62] dark:text-[#ADB293]" />,
    barColor: "bg-[#777C62] dark:bg-[#ADB293]",
    skills: [
      { name: "React.js", level: 92, icon: FaReact, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Production" },
      { name: "HTML5 & Semantic Markup", level: 95, icon: FaHtml5, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Expert" },
      { name: "CSS3 & Modern Layouts", level: 92, icon: FaCss3Alt, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Expert" },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Production" },
      { name: "Framer Motion", level: 85, icon: FaAtom, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Advanced" }
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: <FaServer className="text-[#777C62] dark:text-[#ADB293]" />,
    barColor: "bg-[#777C62] dark:bg-[#ADB293]",
    skills: [
      { name: "Node.js", level: 88, icon: FaNodeJs, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Production" },
      { name: "Express.js", level: 90, icon: SiExpress, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Production" },
      { name: "Koa.js", level: 82, icon: FaServer, iconColor: "text-[#68675F] dark:text-[#C0BFB3]", tag: "Proficient" },
      { name: "REST API Design", level: 92, icon: FaPlug, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Expert" },
      { name: "Server-Sent Events (SSE)", level: 88, icon: FaBolt, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Real-Time" },
      { name: "JWT Auth & RBAC", level: 88, icon: FaShieldAlt, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Security" }
    ]
  },
  {
    id: "databases",
    title: "Database Architectures",
    icon: <FaDatabase className="text-[#8C7258] dark:text-[#C1A17F]" />,
    barColor: "bg-[#8C7258] dark:bg-[#C1A17F]",
    skills: [
      { name: "PostgreSQL", level: 86, icon: SiPostgresql, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Relational" },
      { name: "MySQL", level: 88, icon: SiMysql, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Relational" },
      { name: "MongoDB Atlas", level: 85, icon: SiMongodb, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "NoSQL" },
      { name: "Supabase", level: 82, icon: SiSupabase, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Cloud" },
      { name: "Sequelize ORM", level: 85, icon: FaDatabase, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "ORM" }
    ]
  },
  {
    id: "aiml",
    title: "AI / ML & Data",
    icon: <FaBrain className="text-[#8C7258] dark:text-[#C1A17F]" />,
    barColor: "bg-[#8C7258] dark:bg-[#C1A17F]",
    skills: [
      { name: "Pandas & Data Processing", level: 86, icon: FaBrain, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Data Analysis" },
      { name: "Scikit-learn ML Pipelines", level: 82, icon: FaBrain, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "ML Engineering" },
      { name: "TF-IDF Text Vectorization", level: 85, icon: FaBrain, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "NLP / ML" },
      { name: "Cosine Similarity Engines", level: 85, icon: FaChartLine, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "Rec Systems" },
      { name: "Power BI Analytics", level: 80, icon: FaChartBar, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Analytics" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: <FaTools className="text-[#777C62] dark:text-[#ADB293]" />,
    barColor: "bg-[#777C62] dark:bg-[#ADB293]",
    skills: [
      { name: "Git & GitHub Workflow", level: 90, icon: FaGitAlt, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "VCS" },
      { name: "Postman API Testing", level: 92, icon: SiPostman, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "API Testing" },
      { name: "VS Code Workstation", level: 95, icon: FaLaptopCode, iconColor: "text-[#777C62] dark:text-[#ADB293]", tag: "IDE" },
      { name: "Vercel Deployment", level: 88, icon: SiVercel, iconColor: "text-[#252722] dark:text-[#F5F2EB]", tag: "CI/CD" },
      { name: "Render & Compass", level: 85, icon: FaCloud, iconColor: "text-[#8C7258] dark:text-[#C1A17F]", tag: "Cloud Ops" }
    ]
  }
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRefs = useRef([]);
  const [tilt, setTilt] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({});
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  const handleMouseMove = (e, index, catId) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const el = cardRefs.current[index];
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos((prev) => ({ ...prev, [catId]: { x, y } }));

      const xOffset = (x / rect.width - 0.5) * 3;
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt((prev) => ({ 
        ...prev, 
        [catId]: { rx: Math.max(-2.5, Math.min(2.5, yOffset)), ry: Math.max(-2.5, Math.min(2.5, xOffset)) } 
      }));
    } catch (err) {}
  };

  const handleSelectTab = (id) => {
    try { playClickSound(); } catch (e) {}
    setActiveTab(id);
  };

  // Filter skills by active tab and search query
  const filteredCategories = skillCategories.map(cat => {
    if (activeTab !== "all" && activeTab !== cat.id) return null;
    if (!searchQuery.trim()) return cat;

    const query = searchQuery.toLowerCase();
    const matchingSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.tag.toLowerCase().includes(query)
    );

    if (matchingSkills.length > 0 || cat.title.toLowerCase().includes(query)) {
      return { ...cat, skills: matchingSkills.length > 0 ? matchingSkills : cat.skills };
    }
    return null;
  }).filter(Boolean);

  return (
    <section id="skills" className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] border-y border-[#D8D1C5] dark:border-[#414239] relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-[#D8D1C5] dark:border-[#414239] flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="pro-badge-olive mb-3 inline-block">
              TECHNICAL SKILLS &amp; PROFICIENCY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Tech Stack Matrix &amp; Competency
            </h2>
            <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-2 font-normal">
              Verified technical proficiency across full-stack frameworks, AI/ML pipelines, databases, and low-level systems
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search skills (React, Python...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] text-xs text-[#252722] dark:text-[#F5F2EB] placeholder-[#68675F]/60 dark:placeholder-[#C0BFB3]/60 focus:outline-none focus:border-[#777C62] focus:ring-2 focus:ring-[#777C62]/20 transition-all font-sans"
            />
          </div>
        </motion.div>

        {/* 3D Interactive Tech Radar Orbit Canvas */}
        <TechRadar3D />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => handleSelectTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 cursor-pointer focus:outline-none select-none ${
              activeTab === "all"
                ? "pill-venom-active shadow-md"
                : "pill-venom-inactive hover:-translate-y-0.5"
            }`}
          >
            All Categories (30)
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 cursor-pointer focus:outline-none select-none ${
                activeTab === cat.id
                  ? "pill-venom-active shadow-md"
                  : "pill-venom-inactive hover:-translate-y-0.5"
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Enhanced Skill Cards Grid with Status Badges */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              const cardTilt = tilt[category.id] || { rx: 0, ry: 0 };
              const cardSpotlight = spotlightPos[category.id] || { x: 0, y: 0 };
              const isHovered = hoveredCardId === category.id;

              return (
                <motion.div
                  key={category.id}
                  layout
                  ref={(el) => (cardRefs.current[index] = el)}
                  onMouseMove={(e) => handleMouseMove(e, index, category.id)}
                  onMouseEnter={() => { if (!isTouchDevice && !prefersReducedMotion) setHoveredCardId(category.id); }}
                  onMouseLeave={() => { setHoveredCardId(null); setTilt((prev) => ({ ...prev, [category.id]: { rx: 0, ry: 0 } })); }}
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transform: !isTouchDevice && !prefersReducedMotion && isHovered
                      ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-3px)`
                      : 'none',
                    transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                  }}
                  className="relative overflow-hidden p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] transition-all duration-300 flex flex-col justify-between h-full shadow-2xs group hover:border-[#777C62]/50 hover:shadow-md"
                >
                  {/* Cursor Spotlight Glow */}
                  {!isTouchDevice && !prefersReducedMotion && isHovered && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(240px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(119, 124, 98, 0.07), transparent 80%)`
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#D8D1C5]/70 dark:border-[#414239]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#E7E1D6]/60 dark:bg-[#303129] border border-[#D8D1C5] dark:border-[#414239] text-base">
                          {category.icon}
                        </div>
                        <h3 className="text-base font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">{category.title}</h3>
                      </div>
                    </div>

                    {/* Skill Items */}
                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => {
                        const IconComp = skill.icon;
                        const isHighProficiency = skill.level >= 90;

                        return (
                          <div key={sIdx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              {/* Brand Icon + Name */}
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-[#E7E1D6]/60 dark:bg-[#1C1D19] flex items-center justify-center shrink-0 border border-[#D8D1C5] dark:border-[#414239] text-xs">
                                  <IconComp className={skill.iconColor} />
                                </div>
                                <span className="text-[#252722] dark:text-[#F5F2EB] font-medium">{skill.name}</span>
                              </div>

                              {/* Proficiency Score & Tag */}
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#E7E1D6]/60 dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3]">
                                  {skill.tag}
                                </span>
                                <span className={`font-mono text-[11px] font-bold ${isHighProficiency ? "text-[#777C62] dark:text-[#ADB293]" : "text-[#68675F] dark:text-[#C0BFB3]"}`}>
                                  {skill.level}%
                                </span>
                              </div>
                            </div>

                            {/* Progress Fill Bar */}
                            <div className="w-full h-1.5 rounded-full bg-[#E7E1D6] dark:bg-[#303129] overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : sIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-full rounded-full ${category.barColor}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
