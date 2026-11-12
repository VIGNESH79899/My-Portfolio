import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBrain, FaFilm, FaChartLine, FaBook, FaLeaf, FaIdCard, FaRocket, FaStore, FaUsers,
  FaSearch, FaExternalLinkAlt, FaGithub, FaTimes, FaStar, FaCubes, FaFilter,
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
    icon: <FaBrain className="text-[#777C62] dark:text-[#ADB293]" />,
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
    icon: <FaFilm className="text-[#8C7258] dark:text-[#C1A17F]" />,
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
    icon: <FaChartLine className="text-[#777C62] dark:text-[#ADB293]" />,
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
    icon: <FaBook className="text-[#8C7258] dark:text-[#C1A17F]" />,
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
    icon: <FaLeaf className="text-[#777C62] dark:text-[#ADB293]" />,
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
    icon: <FaIdCard className="text-[#8C7258] dark:text-[#C1A17F]" />,
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
    icon: <FaRocket className="text-[#777C62] dark:text-[#ADB293]" />,
    demo: "https://github.com/VIGNESH79899/PixelBoost",
    github: "https://github.com/VIGNESH79899/PixelBoost",
    featured: false
  },
  {
    id: "population-growth",
    category: "aiml",
    title: "Population Growth Prediction",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Data Modeling"],
    summary: "Mathematical prediction application that forecasts population growth based on historical datasets.",
    description: "Built a mathematical prediction application that forecasts population growth based on historical datasets. Features an interactive frontend built with React, TypeScript, and Tailwind CSS for data visualization and trend analysis.",
    engineeringFocus: "Mathematical population projection algorithms, data visualization charts, and TypeScript type-safe modeling.",
    icon: <FaUsers className="text-[#777C62] dark:text-[#ADB293]" />,
    demo: "https://github.com/VIGNESH79899/Population-Growth",
    github: "https://github.com/VIGNESH79899/Population-Growth",
    featured: false
  }
];

const categoryTabs = [
  { id: "all", name: "All Projects" },
  { id: "aiml", name: "AI / ML & Data" },
  { id: "fullstack", name: "Full-Stack & Web" }
];

const categoryLabels = {
  aiml: "AI / ML & Data",
  fullstack: "Full-Stack & Web"
};

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

  const handleSelectCategory = (id) => {
    try { playClickSound(); } catch (e) {}
    setActiveCategory(id);
  };

  const handleOpenModal = (project) => {
    try { playSuccessSound(); } catch (e) {}
    setActiveProjectModal(project);
  };

  const categoryCounts = {
    all: projectList.length,
    aiml: projectList.filter((p) => p.category === "aiml").length,
    fullstack: projectList.filter((p) => p.category === "fullstack").length,
  };

  useEffect(() => {
    if (!activeProjectModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveProjectModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjectModal]);

  const filteredProjects = projectList.filter((project) => {
    const matchesCategory = activeCategory === "all" || project.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.tech.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] relative overflow-hidden font-sans border-t border-[#D8D1C5] dark:border-[#414239]">
      
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-[#D8D1C5] dark:border-[#414239] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="pro-badge-olive mb-3 inline-block">
              TECHNICAL PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Featured Software Projects
            </h2>
            <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-2 font-normal">
              AI recommendation engines, full-stack platforms, and deployed client applications
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#68675F] dark:text-[#C0BFB3] self-start sm:self-auto bg-[#FFFDF9] dark:bg-[#252620] px-3.5 py-2 rounded-full border border-[#D8D1C5] dark:border-[#414239] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FULL-STACK</span>
            <span className="text-[#777C62] dark:text-[#ADB293] font-bold">·</span>
            <span>AI / ML</span>
            <span className="text-[#777C62] dark:text-[#ADB293] font-bold">·</span>
            <span>{projectList.length} BUILDS</span>
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
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 cursor-pointer focus:outline-none select-none ${
                    isActive
                      ? "pill-venom-active shadow-md"
                      : "pill-venom-inactive hover:-translate-y-0.5"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                      isActive
                        ? "bg-white/20 text-current"
                        : "bg-[#E7E1D6] dark:bg-[#303129] text-[#68675F] dark:text-[#C0BFB3]"
                    }`}
                  >
                    {categoryCounts[tab.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Command Search Bar */}
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#68675F] dark:text-[#C0BFB3] text-xs pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] text-xs text-[#252722] dark:text-[#F5F2EB] placeholder-[#68675F]/60 dark:placeholder-[#C0BFB3]/60 focus:outline-none focus:border-[#777C62] focus:ring-2 focus:ring-[#777C62]/20 transition-all font-sans shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-[#F5F2EB] hover:bg-[#E7E1D6]/70 dark:hover:bg-[#303129] transition-colors cursor-pointer"
                aria-label="Clear project search"
              >
                <FaTimes size={10} />
              </button>
            )}
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
                const hasLiveDemo = Boolean(
                  project.demo && project.demo !== "#" && !project.demo.includes("github.com")
                );
                const hasExternalDemo = Boolean(project.demo && project.demo !== "#");
                const showSeparateGithub = Boolean(project.github && project.github !== project.demo);

                return (
                  <motion.div
                    key={project.id}
                    layout
                    ref={(el) => (cardRefs.current[index] = el)}
                    onClick={() => handleOpenModal(project)}
                    onMouseMove={(e) => handleMouseMove(e, index, project.id)}
                    onMouseEnter={() => { if (!isTouchDevice && !prefersReducedMotion) setHoveredCardId(project.id); }}
                    onMouseLeave={() => { setHoveredCardId(null); setTilt((prev) => ({ ...prev, [project.id]: { rx: 0, ry: 0 } })); }}
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transform: !isTouchDevice && !prefersReducedMotion && isHovered
                        ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-3px)`
                        : 'none',
                      transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                    }}
                    className={`relative overflow-hidden p-6 rounded-2xl bg-[#FFFDF9] dark:bg-[#252620] border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                      project.featured
                        ? "border-[#777C62]/45 dark:border-[#ADB293]/40 shadow-sm hover:border-[#777C62] dark:hover:border-[#ADB293] hover:shadow-lg"
                        : "border-[#D8D1C5] dark:border-[#414239] shadow-2xs hover:border-[#777C62]/50 hover:shadow-md"
                    }`}
                  >
                    {/* Top Hairline Accent Strip */}
                    <div
                      className={`absolute inset-x-0 top-0 h-[3px] transition-opacity duration-300 ${
                        project.featured
                          ? "bg-gradient-to-r from-[#777C62] via-[#ADB293] to-[#777C62] opacity-90"
                          : "bg-gradient-to-r from-[#777C62]/60 via-[#ADB293]/60 to-[#777C62]/60 opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Spotlight Cursor Shader */}
                    {!isTouchDevice && !prefersReducedMotion && isHovered && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(240px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(119, 124, 98, 0.07), transparent 80%)`
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      
                      {/* Card Header & Status Pill */}
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[#E7E1D6]/75 dark:bg-[#303129] border border-[#D8D1C5] dark:border-[#414239] text-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-2xs">
                            {project.icon}
                          </div>
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] truncate">
                            {categoryLabels[project.category] || "Engineering"}
                          </span>
                        </div>

                        {project.featured ? (
                          <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#1C1D19] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#1C1D19] shadow-xs flex items-center gap-1.5 uppercase tracking-wider">
                            {hasLiveDemo ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
                            ) : (
                              <FaStar className="text-[9px] text-[#ADB293] dark:text-[#777C62]" />
                            )}
                            <span>Featured</span>
                          </span>
                        ) : hasLiveDemo ? (
                          <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#777C62]/12 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/25 dark:border-[#ADB293]/30 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live</span>
                          </span>
                        ) : null}
                      </div>

                      {/* Title & Summary */}
                      <h3 className="text-lg font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight mb-2 group-hover:text-[#777C62] dark:group-hover:text-[#ADB293] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] leading-relaxed mb-4 font-normal">
                        {project.summary}
                      </p>

                      {/* Architectural Focus Micro-Callout */}
                      {project.engineeringFocus && (
                        <div className="mb-4 px-3 py-2 rounded-xl bg-[#F5F2EB]/80 dark:bg-[#1C1D19]/70 border border-[#D8D1C5]/80 dark:border-[#414239] flex items-start gap-2">
                          <FaTerminal className="text-[10px] text-[#777C62] dark:text-[#ADB293] mt-0.5 shrink-0" />
                          <p className="text-[11px] text-[#5B5D51] dark:text-[#C0BFB3] leading-snug line-clamp-2 font-medium">
                            {project.engineeringFocus}
                          </p>
                        </div>
                      )}

                      {/* Staggered Technology Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.map((t, tIdx) => (
                          <motion.span
                            key={tIdx}
                            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: prefersReducedMotion ? 0 : tIdx * 0.03 }}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#E7E1D6]/65 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="relative z-10 pt-4 border-t border-[#D8D1C5]/70 dark:border-[#414239] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(project);
                        }}
                        className="btn-primary !px-3.5 !py-1.5 !text-[11px] !rounded-full inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Specs</span>
                        <FaChevronRight className="text-[9px]" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {showSeparateGithub && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="pill-venom-inactive !w-8 !h-8 !p-0 rounded-full inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform"
                            aria-label={`Open ${project.title} GitHub repository`}
                            title="GitHub Repository"
                          >
                            <FaGithub size={13} />
                          </a>
                        )}

                        {hasExternalDemo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="pill-venom-inactive !px-3 !py-1.5 !text-[11px] rounded-full inline-flex items-center gap-1.5 font-semibold hover:-translate-y-0.5 transition-transform"
                            aria-label={`Open ${project.title} ${hasLiveDemo ? "live demo" : "GitHub repository"}`}
                          >
                            {hasLiveDemo ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            ) : (
                              <FaGithub size={11} />
                            )}
                            <span>{hasLiveDemo ? "Live" : "Repo"}</span>
                            <FaExternalLinkAlt size={9} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center bg-[#FFFDF9] dark:bg-[#252620] rounded-2xl border border-dashed border-[#D8D1C5] dark:border-[#414239] space-y-3">
                <p className="text-sm font-semibold text-[#68675F] dark:text-[#C0BFB3]">No projects found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="btn-secondary !text-xs !px-4 !py-2 !rounded-full cursor-pointer"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#FFFDF9] dark:bg-[#252620] rounded-3xl border border-[#D8D1C5] dark:border-[#414239] p-5 sm:p-6 md:p-8 shadow-2xl space-y-6 font-sans"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="pill-venom-inactive absolute top-5 right-5 z-10 !w-9 !h-9 !p-0 rounded-full inline-flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes size={13} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 pr-10">
                <div className="p-3 rounded-xl bg-[#E7E1D6]/60 dark:bg-[#303129] border border-[#D8D1C5] dark:border-[#414239] text-xl shrink-0">
                  {activeProjectModal.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#777C62] dark:text-[#ADB293] uppercase tracking-wider">
                      PROJECT INSPECTOR
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#E7E1D6]/70 dark:bg-[#303129] text-[#5B5D51] dark:text-[#C0BFB3] border border-[#D8D1C5] dark:border-[#414239]">
                      {categoryLabels[activeProjectModal.category] || "Engineering"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
                    {activeProjectModal.title}
                  </h3>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block font-mono">
                  SYSTEM OVERVIEW:
                </span>
                <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] leading-relaxed font-normal">
                  {activeProjectModal.description}
                </p>
              </div>

              {/* Engineering Focus */}
              {activeProjectModal.engineeringFocus && (
                <div className="p-3.5 rounded-xl bg-[#E7E1D6]/50 dark:bg-[#303129]/60 border border-[#D8D1C5] dark:border-[#414239] space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#777C62] dark:text-[#ADB293] block">
                    ENGINEERING FOCUS:
                  </span>
                  <p className="text-xs text-[#252722] dark:text-[#F5F2EB]">
                    {activeProjectModal.engineeringFocus}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] block mb-2 font-mono">
                  VERIFIED TECHNOLOGY STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.tech.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E7E1D6]/60 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#D8D1C5]/70 dark:border-[#414239]">
                <span className="text-[11px] font-mono text-[#777C62] dark:text-[#ADB293] flex items-center gap-1.5">
                  <FaCheckCircle className="text-xs" /> Verified Production Spec
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {activeProjectModal.github && activeProjectModal.github !== activeProjectModal.demo && (
                    <a
                      href={activeProjectModal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs"
                    >
                      <FaGithub size={12} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {activeProjectModal.demo && activeProjectModal.demo !== "#" && (
                    <a
                      href={activeProjectModal.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs"
                    >
                      {activeProjectModal.demo.includes("github.com") ? (
                        <FaGithub size={12} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      <span>{activeProjectModal.demo.includes("github.com") ? "Open Repository" : "Open Live Project"}</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(null)}
                    className="btn-secondary text-xs"
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
