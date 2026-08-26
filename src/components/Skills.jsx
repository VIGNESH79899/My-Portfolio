import React, { useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, FaServer, FaDatabase, FaBrain, FaTools, FaLayerGroup, FaBookReader,
  FaPython, FaJs, FaPhp, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaBolt, FaShieldAlt,
  FaGitAlt, FaLaptopCode, FaPlug, FaChartLine, FaChartBar, FaCloud, FaAtom
} from 'react-icons/fa';
import { 
  SiTypescript, SiPostgresql, SiMysql, SiMongodb, SiSupabase, 
  SiExpress, SiTailwindcss, SiPostman, SiVercel 
} from 'react-icons/si';
import TechRadar3D from './TechRadar3D';
import PhysicsTechSandbox from './PhysicsTechSandbox';
import { playClickSound } from '../utils/sound';

const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: <FaCode className="text-indigo-600 dark:text-indigo-400" />,
    gradient: "from-indigo-600 to-blue-500",
    skills: [
      { name: "Python", level: 92, icon: FaPython, iconColor: "text-amber-400", tag: "Production" },
      { name: "JavaScript (ES6+)", level: 90, icon: FaJs, iconColor: "text-yellow-400", tag: "Production" },
      { name: "TypeScript", level: 85, icon: SiTypescript, iconColor: "text-sky-400", tag: "Advanced" },
      { name: "C Language", level: 88, icon: FaCode, iconColor: "text-blue-400", tag: "Systems" },
      { name: "PHP", level: 80, icon: FaPhp, iconColor: "text-purple-400", tag: "Proficient" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: <FaLayerGroup className="text-cyan-600 dark:text-cyan-400" />,
    gradient: "from-cyan-600 to-indigo-500",
    skills: [
      { name: "React.js", level: 92, icon: FaReact, iconColor: "text-cyan-400", tag: "Production" },
      { name: "HTML5 & Semantic Markup", level: 95, icon: FaHtml5, iconColor: "text-orange-500", tag: "Expert" },
      { name: "CSS3 & Modern Flexbox/Grid", level: 92, icon: FaCss3Alt, iconColor: "text-blue-500", tag: "Expert" },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, iconColor: "text-teal-400", tag: "Production" },
      { name: "Framer Motion", level: 85, icon: FaAtom, iconColor: "text-indigo-400", tag: "Advanced" }
    ]
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: <FaServer className="text-emerald-600 dark:text-emerald-400" />,
    gradient: "from-emerald-600 to-teal-500",
    skills: [
      { name: "Node.js", level: 88, icon: FaNodeJs, iconColor: "text-emerald-400", tag: "Production" },
      { name: "Express.js", level: 90, icon: SiExpress, iconColor: "text-slate-300", tag: "Production" },
      { name: "Koa.js", level: 82, icon: FaServer, iconColor: "text-emerald-300", tag: "Proficient" },
      { name: "REST API Design", level: 92, icon: FaPlug, iconColor: "text-sky-400", tag: "Expert" },
      { name: "Server-Sent Events (SSE)", level: 88, icon: FaBolt, iconColor: "text-amber-400", tag: "Real-Time" },
      { name: "JWT Auth & RBAC", level: 88, icon: FaShieldAlt, iconColor: "text-indigo-400", tag: "Security" }
    ]
  },
  {
    id: "databases",
    title: "Database Architectures",
    icon: <FaDatabase className="text-sky-600 dark:text-sky-400" />,
    gradient: "from-sky-600 to-indigo-500",
    skills: [
      { name: "PostgreSQL", level: 86, icon: SiPostgresql, iconColor: "text-sky-400", tag: "Relational" },
      { name: "MySQL", level: 88, icon: SiMysql, iconColor: "text-blue-400", tag: "Relational" },
      { name: "MongoDB Atlas", level: 85, icon: SiMongodb, iconColor: "text-emerald-500", tag: "NoSQL" },
      { name: "Supabase", level: 82, icon: SiSupabase, iconColor: "text-emerald-400", tag: "Cloud" },
      { name: "Sequelize ORM", level: 85, icon: FaDatabase, iconColor: "text-indigo-400", tag: "ORM" }
    ]
  },
  {
    id: "aiml",
    title: "AI / ML & Data",
    icon: <FaBrain className="text-purple-600 dark:text-purple-400" />,
    gradient: "from-purple-600 to-violet-500",
    skills: [
      { name: "Pandas & Data Processing", level: 86, icon: FaBrain, iconColor: "text-purple-400", tag: "Data Analysis" },
      { name: "Scikit-learn ML Pipelines", level: 82, icon: FaBrain, iconColor: "text-violet-400", tag: "ML Engineering" },
      { name: "TF-IDF Text Vectorization", level: 85, icon: FaBrain, iconColor: "text-indigo-400", tag: "NLP / ML" },
      { name: "Cosine Similarity Engines", level: 85, icon: FaChartLine, iconColor: "text-cyan-400", tag: "Rec Systems" },
      { name: "Power BI Analytics", level: 80, icon: FaChartBar, iconColor: "text-amber-500", tag: "Analytics" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: <FaTools className="text-amber-600 dark:text-amber-400" />,
    gradient: "from-amber-600 to-orange-500",
    skills: [
      { name: "Git & GitHub Workflow", level: 90, icon: FaGitAlt, iconColor: "text-orange-500", tag: "VCS" },
      { name: "Postman API Testing", level: 92, icon: SiPostman, iconColor: "text-orange-400", tag: "API Testing" },
      { name: "VS Code Workstation", level: 95, icon: FaLaptopCode, iconColor: "text-sky-400", tag: "IDE" },
      { name: "Vercel Deployment", level: 88, icon: SiVercel, iconColor: "text-slate-200", tag: "CI/CD" },
      { name: "Render & Compass", level: 85, icon: FaCloud, iconColor: "text-blue-400", tag: "Cloud Ops" }
    ]
  }
];

const csCoursework = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Machine Learning Fundamentals",
  "Linear Algebra & Matrix Math"
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
    <section id="skills" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              TECHNICAL SKILLS & PROFICIENCY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tech Stack Matrix & Competency
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Verified technical proficiency across full-stack frameworks, AI/ML pipelines, databases, and low-level systems
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="⌕ Search skills (React, Python...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
            />
          </div>
        </motion.div>

        {/* Interactive Code Architecture Diffs */}
        <CodeDiffViewer />

        {/* 3D Interactive Tech Radar Orbit Canvas */}
        <TechRadar3D />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => handleSelectTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden ${
              activeTab === "all"
                ? "bg-indigo-600 text-white shadow-2xs ring-2 ring-indigo-500/20 scale-105"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
            }`}
          >
            All Categories (30)
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden ${
                activeTab === cat.id
                  ? "bg-indigo-600 text-white shadow-2xs ring-2 ring-indigo-500/20 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Enhanced Skill Cards Grid with Brand Logos & Status Badges */}
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
                      ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-4px)`
                      : 'none',
                    transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                  }}
                  className="relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between h-full shadow-2xs group hover:border-indigo-400/50"
                >
                  {/* Barely Visible 5% Opacity Cursor Spotlight Glow */}
                  {!isTouchDevice && !prefersReducedMotion && isHovered && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(240px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(91, 75, 255, 0.05), transparent 80%)`
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-base">
                          {category.icon}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{category.title}</h3>
                      </div>
                    </div>

                    {/* Skill Items with Brand Icons */}
                    <div className="space-y-4">
                      {category.skills.map((skill, sIdx) => {
                        const IconComp = skill.icon;
                        const isHighProficiency = skill.level >= 90;

                        return (
                          <div key={sIdx} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              {/* Brand Icon + Name */}
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800 text-xs">
                                  <IconComp className={skill.iconColor} />
                                </div>
                                <span className="text-slate-800 dark:text-slate-200 font-semibold">{skill.name}</span>
                              </div>

                              {/* Proficiency Score & Tag */}
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                  {skill.tag}
                                </span>
                                <span className={`font-mono text-[11px] font-bold ${isHighProficiency ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"}`}>
                                  {skill.level}%
                                </span>
                              </div>
                            </div>

                            {/* Progress Fill Bar */}
                            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : sIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
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

        {/* CS Coursework Strip */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400">
              <FaBookReader />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Academic Coursework</h3>
              <p className="text-xs text-slate-500 font-medium">Core Computer Science Foundations @ Aurora University</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {csCoursework.map((course, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-mono">
                {course}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
