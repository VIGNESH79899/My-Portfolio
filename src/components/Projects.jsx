import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBrain, FaFilm, FaChartLine, FaBook, FaLeaf, FaIdCard, FaRocket, FaStore, FaUsers,
  FaSearch, FaExternalLinkAlt, FaTimes, FaStar, FaCubes, FaFilter,
  FaChevronRight, FaTerminal, FaCheckCircle
} from "react-icons/fa";
import ProjectPlayground from "./ProjectPlayground";
import { playClickSound, playSuccessSound } from "../utils/sound";

const projectList = [
  {
    id: "ai-assessment",
    category: "aiml",
    title: "AI Assessment Maker",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "AI Integration", "DOCX Gen"],
    summary: "End-to-end AI-powered platform for generating structured academic assignments, reports, case studies, automated DOCX generation, and email workflows.",
    description: "Built an end-to-end AI platform for generating structured academic content including assignments, reports, case studies, lab records, and research documents. Developed a full-stack architecture with React frontend, Node/Express backend, MongoDB Atlas, cloud storage, and automated document delivery.",
    engineeringFocus: "AI prompt engineering pipelines, document generation streams, and automated delivery.",
    icon: <FaBrain className="text-indigo-600 dark:text-indigo-400" />,
    demo: "https://assessmentmaker.vercel.app/",
    github: "https://github.com/VIGNESH79899",
    featured: true
  },
  {
    id: "movie-rec",
    category: "aiml",
    title: "Movie Recommendation System",
    tech: ["Python", "Pandas", "Scikit-learn", "TF-IDF", "Cosine Similarity"],
    summary: "Content-based recommendation engine leveraging TF-IDF text vectorization and cosine similarity.",
    description: "Built a content-based recommendation engine using TF-IDF vectorization and cosine similarity. Implemented data cleaning, feature extraction, text vectorization, and top-N recommendation generation.",
    engineeringFocus: "NLP text vectorization, feature extraction matrix, and high-performance similarity scoring.",
    icon: <FaFilm className="text-purple-600 dark:text-purple-400" />,
    demo: "https://github.com/VIGNESH79899/MOVIE_REC",
    github: "https://github.com/VIGNESH79899/MOVIE_REC",
    featured: true
  },
  {
    id: "sales-aggregator",
    category: "aiml",
    title: "Sales Data Aggregator",
    tech: ["Python", "Pandas", "Data Analysis", "Visualization"],
    summary: "Data processing application to clean, aggregate, analyze, and visualize raw sales data for business insights.",
    description: "Developed a Python-based data processing application to clean, aggregate, analyze, and visualize raw sales data for decision-support insights and business performance analysis.",
    engineeringFocus: "Data ETL pipelines, Pandas transformations, and business metric aggregations.",
    icon: <FaChartLine className="text-blue-600 dark:text-blue-400" />,
    demo: "#",
    featured: false
  },
  {
    id: "library-mgmt",
    category: "fullstack",
    title: "Library Management System",
    tech: ["PHP", "MySQL", "Relational DB", "CRUD"],
    summary: "Database-driven system supporting book indexing, user management, issue/return workflows, and fine tracking.",
    description: "Developed a database-driven system supporting books, users, issue/return workflows, transactions, and fine tracking using CRUD operations, relational schema design, normalization, and SQL queries.",
    engineeringFocus: "Normalized relational schema, ACID transaction integrity, and index optimization.",
    icon: <FaBook className="text-amber-600 dark:text-amber-400" />,
    demo: "https://github.com/VIGNESH79899/Library_management",
    github: "https://github.com/VIGNESH79899/Library_management",
    featured: true
  },
  {
    id: "eco-track",
    category: "fullstack",
    title: "Eco Track",
    tech: ["TypeScript", "JavaScript"],
    summary: "Smart eco-tracking application designed to estimate daily and weekly CO₂ emissions using simple data analysis logic.",
    description: "Eco-Track is a smart eco-tracking application designed to estimate daily and weekly CO₂ emissions. The project aims to create awareness about environmental impact using simple data analysis logic.",
    engineeringFocus: "TypeScript type safety, CO₂ emission estimation logic, and environmental impact data analysis.",
    icon: <FaLeaf className="text-emerald-600 dark:text-emerald-400" />,
    demo: "https://eco-track-ochre.vercel.app/",
    github: "https://github.com/VIGNESH79899",
    featured: false
  },
  {
    id: "portfolio-site",
    category: "fullstack",
    title: "Personal Digital Portfolio",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    summary: "Interactive digital portfolio showcasing projects, experience, and achievements.",
    description: "Designed and built an interactive portfolio showcasing technical projects and achievements with dark mode support, smooth scroll navigation, and micro-animations.",
    engineeringFocus: "Framer Motion layout transitions, dark theme persistence, and accessible micro-interactions.",
    icon: <FaIdCard className="text-teal-600 dark:text-teal-400" />,
    demo: "#",
    github: "https://github.com/VIGNESH79899",
    featured: false
  },
  {
    id: "pixelboost",
    category: "fullstack",
    title: "PixelBoost Digital Agency",
    tech: ["React.js", "HTML5", "CSS3", "JS"],
    summary: "Modern digital agency platform for creative digital solutions and software services.",
    description: "Developed a modern digital agency web platform under active development to showcase creative branding, custom software, and digital solutions for clients.",
    engineeringFocus: "Modular component architecture, client landing pages, and responsive branding layouts.",
    icon: <FaRocket className="text-rose-600 dark:text-rose-400" />,
    demo: "https://github.com/VIGNESH79899/PixelBoost",
    github: "https://github.com/VIGNESH79899/PixelBoost",
    featured: false
  },
  {
    id: "chandeshwara-enterprises",
    category: "fullstack",
    title: "Chandeshwara Enterprises",
    tech: ["TypeScript", "MongoDB", "E-Commerce", "Freelance Client Work"],
    summary: "Production e-commerce platform developed for a freelance client, built with TypeScript and MongoDB.",
    description: "Engineered and deployed a production e-commerce platform for Chandeshwara Enterprises as a freelance software developer. Implemented scalable product catalog management, order processing workflows, responsive storefront UI, and MongoDB database integration.",
    engineeringFocus: "Freelance production client delivery, TypeScript type safety, catalog indexing, and MongoDB schema design.",
    icon: <FaStore className="text-violet-600 dark:text-violet-400" />,
    demo: "https://chandeshwaraenterprises.com/",
    github: "https://github.com/VIGNESH79899",
    featured: true
  },
  {
    id: "population-growth",
    category: "aiml",
    title: "Population Growth Prediction",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Data Modeling"],
    summary: "Mathematical prediction application that forecasts population growth based on historical datasets.",
    description: "Built a mathematical prediction application that forecasts population growth based on historical datasets. Features an interactive frontend built with React, TypeScript, and Tailwind CSS for data visualization and trend analysis.",
    engineeringFocus: "Mathematical population projection algorithms, data visualization charts, and TypeScript type-safe modeling.",
    icon: <FaUsers className="text-cyan-600 dark:text-cyan-400" />,
    demo: "https://github.com/VIGNESH79899/Population-Growth",
    github: "https://github.com/VIGNESH79899/Population-Growth",
    featured: false
  }
];

const categoryTabs = [
  { id: "all", name: "All Projects" },
  { id: "aiml", name: "AI / ML & Data" },
  { id: "fullstack", name: "Full-Stack & Web" },
  { id: "systems", name: "Systems & C" }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectModal, setActiveProjectModal] = useState(null);

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

  const handleMouseMove = (e, index, projectId) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const el = cardRefs.current[index];
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos((prev) => ({ ...prev, [projectId]: { x, y } }));

      const xOffset = (x / rect.width - 0.5) * 3;
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt((prev) => ({ 
        ...prev, 
        [projectId]: { rx: Math.max(-2.5, Math.min(2.5, yOffset)), ry: Math.max(-2.5, Math.min(2.5, xOffset)) } 
      }));
    } catch (err) {}
  };

  const handleSelectCategory = (catId) => {
    try { playClickSound(); } catch (e) {}
    setActiveCategory(catId);
  };

  const handleOpenModal = (project) => {
    try { playSuccessSound(); } catch (e) {}
    setActiveProjectModal(project);
  };

  const filteredProjects = projectList.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      project.title.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.tech.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden font-sans border-t border-slate-200/60 dark:border-slate-800/60">
      
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              TECHNICAL PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Software Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Interactive systems, AI recommendation engines, full-stack applications, and client solutions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 self-start sm:self-auto bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
            <span>FULL-STACK</span>
            <span className="text-indigo-500 font-bold">·</span>
            <span>AI / ML</span>
            <span className="text-indigo-500 font-bold">·</span>
            <span>SYSTEMS</span>
          </div>
        </motion.div>

        {/* Hero Featured System Container */}
        <ProjectPlayground />

        {/* Command Search & Segmented Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
          
          {/* Segmented Category Filter Navigation */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-2xs ring-2 ring-indigo-500/20 scale-105"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Command Search Bar */}
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
            <input
              type="text"
              placeholder="⌕ Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

        </div>

        {/* Interactive Projects Grid with FLIP Re-ordering */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const cardTilt = tilt[project.id] || { rx: 0, ry: 0 };
                const cardSpotlight = spotlightPos[project.id] || { x: 0, y: 0 };
                const isHovered = hoveredCardId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    ref={(el) => (cardRefs.current[index] = el)}
                    onMouseMove={(e) => handleMouseMove(e, index, project.id)}
                    onMouseEnter={() => { if (!isTouchDevice && !prefersReducedMotion) setHoveredCardId(project.id); }}
                    onMouseLeave={() => { setHoveredCardId(null); setTilt((prev) => ({ ...prev, [project.id]: { rx: 0, ry: 0 } })); }}
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transform: !isTouchDevice && !prefersReducedMotion && isHovered
                        ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-4px)`
                        : 'none',
                      transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                    }}
                    className="relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:border-indigo-400/50 hover:shadow-md"
                  >
                    {/* Spotlight Ambient Cursor Shader Glow */}
                    {!isTouchDevice && !prefersReducedMotion && isHovered && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(240px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(91, 75, 255, 0.06), transparent 80%)`
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      
                      {/* Card Header & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-lg group-hover:scale-110 transition-transform duration-200">
                          {project.icon}
                        </div>
                        {project.featured && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 flex items-center gap-1 uppercase tracking-wider">
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Title & Summary */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5 font-normal">
                        {project.summary}
                      </p>

                      {/* Staggered Technology Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((t, tIdx) => (
                          <motion.span
                            key={tIdx}
                            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : tIdx * 0.03 }}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform cursor-pointer"
                      >
                        <span>View Specs & Architecture</span>
                        <FaChevronRight className="text-[9px]" />
                      </button>
                      
                      {project.demo && project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          aria-label="Demo Link"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-500">No projects found matching "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Inspector Spec Sheet Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div 
            onClick={() => setActiveProjectModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-5 right-5 z-10 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes size={14} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 pr-8">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xl shrink-0">
                  {activeProjectModal.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    PROJECT INSPECTOR
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {activeProjectModal.title}
                  </h3>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  SYSTEM OVERVIEW:
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {activeProjectModal.description}
                </p>
              </div>

              {/* Engineering Focus */}
              {activeProjectModal.engineeringFocus && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
                    ENGINEERING FOCUS:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {activeProjectModal.engineeringFocus}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  VERIFIED TECHNOLOGY STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <FaCheckCircle className="text-xs" /> Verified Production Spec
                </span>

                <div className="flex items-center gap-2">
                  {activeProjectModal.demo && activeProjectModal.demo !== "#" && (
                    <a
                      href={activeProjectModal.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Open Live Project</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Close Spec Sheet
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Projects;
