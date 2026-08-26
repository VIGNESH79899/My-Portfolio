import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaAtom, FaPlay, FaPause, FaLayerGroup, FaCode, FaServer, 
  FaBrain, FaDatabase, FaCheckCircle, FaExternalLinkAlt, FaSlidersH,
  FaReact, FaNodeJs, FaPython, FaBolt, FaShieldAlt, FaThLarge, FaGlobe
} from 'react-icons/fa';
import { SiPostgresql, SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si';
import { playClickSound } from '../utils/sound';

const techNodes = [
  // Ring 1 (Inner Core - 150px radius)
  { 
    id: "react", 
    name: "React.js", 
    category: "Frontend", 
    level: 92, 
    ring: 1, 
    angle: 0, 
    icon: FaReact,
    iconColor: "text-cyan-400",
    usages: ["Workverse SaaS Dashboard", "AI Assessment Maker", "Portfolio UI"], 
    concepts: ["Hooks & State", "Component Architecture", "Virtual DOM Optimization"] 
  },
  { 
    id: "node", 
    name: "Node.js", 
    category: "Backend", 
    level: 90, 
    ring: 1, 
    angle: 90, 
    icon: FaNodeJs,
    iconColor: "text-emerald-400",
    usages: ["Workverse REST Services", "SSE Event Stream", "AI DOCX Pipeline"], 
    concepts: ["Event Loop", "Asynchronous I/O", "REST Controllers"] 
  },
  { 
    id: "python", 
    name: "Python", 
    category: "AI / ML", 
    level: 92, 
    ring: 1, 
    angle: 180, 
    icon: FaPython,
    iconColor: "text-amber-400",
    usages: ["Movie Recommendation Engine", "Sales Aggregator", "Data Processing"], 
    concepts: ["Scikit-learn Pipelines", "TF-IDF Vectorization", "Cosine Similarity"] 
  },
  { 
    id: "postgres", 
    name: "PostgreSQL", 
    category: "Databases & Systems", 
    level: 86, 
    ring: 1, 
    angle: 270, 
    icon: SiPostgresql,
    iconColor: "text-sky-400",
    usages: ["Workverse Relational DB", "Referral Transactions", "Sequelize ORM"], 
    concepts: ["ACID Compliance", "Normalized Schemas", "Indexing & Joins"] 
  },

  // Ring 2 (Middle Specializations - 240px radius)
  { 
    id: "express", 
    name: "Express.js", 
    category: "Backend", 
    level: 90, 
    ring: 2, 
    angle: 45, 
    icon: SiExpress,
    iconColor: "text-slate-300",
    usages: ["Workverse SaaS Backend", "AI Assessment API Router"], 
    concepts: ["Middleware Architecture", "REST API Design", "Error Handlers"] 
  },
  { 
    id: "tfidf", 
    name: "TF-IDF ML", 
    category: "AI / ML", 
    level: 85, 
    ring: 2, 
    angle: 135, 
    icon: FaBrain,
    iconColor: "text-purple-400",
    usages: ["Movie Recommendation System"], 
    concepts: ["Text Vectorization", "Document Matrix", "Similarity Scoring"] 
  },
  { 
    id: "tailwind", 
    name: "Tailwind CSS", 
    category: "Frontend", 
    level: 92, 
    ring: 2, 
    angle: 225, 
    icon: SiTailwindcss,
    iconColor: "text-cyan-400",
    usages: ["Portfolio Design System", "Workverse UI Components"], 
    concepts: ["Utility-First CSS", "Responsive Layouts", "Dark Mode Styling"] 
  },
  { 
    id: "mongodb", 
    name: "MongoDB", 
    category: "Databases & Systems", 
    level: 85, 
    ring: 2, 
    angle: 315, 
    icon: SiMongodb,
    iconColor: "text-emerald-500",
    usages: ["AI Assessment Document Store"], 
    concepts: ["BSON Schemas", "Aggregation Pipelines", "Document Storage"] 
  },

  // Ring 3 (Outer Systems & Stream - 330px radius)
  { 
    id: "c-lang", 
    name: "C Language", 
    category: "Databases & Systems", 
    level: 88, 
    ring: 3, 
    angle: 30, 
    icon: FaCode,
    iconColor: "text-blue-400",
    usages: ["Password Hash Storage Engine", "Image Compression Utility"], 
    concepts: ["Memory Allocation", "Hash Tables", "Linear Algebra Matrix Reduction"] 
  },
  { 
    id: "sse", 
    name: "SSE Stream", 
    category: "Backend", 
    level: 88, 
    ring: 3, 
    angle: 150, 
    icon: FaBolt,
    iconColor: "text-amber-400",
    usages: ["Workverse Sub-15ms Event Stream"], 
    concepts: ["Server-Sent Events", "Persistent Connections", "Live Telemetry"] 
  },
  { 
    id: "jwt", 
    name: "JWT & RBAC", 
    category: "Backend", 
    level: 88, 
    ring: 3, 
    angle: 270, 
    icon: FaShieldAlt,
    iconColor: "text-indigo-400",
    usages: ["Workverse Student/Mentor Security"], 
    concepts: ["Stateless Tokens", "Role Access Control", "Security Middleware"] 
  }
];

const categoryColors = {
  "Frontend": { badge: "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800", node: "from-indigo-600 to-cyan-500" },
  "Backend": { badge: "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800", node: "from-emerald-600 to-teal-500" },
  "AI / ML": { badge: "bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800", node: "from-purple-600 to-violet-500" },
  "Databases & Systems": { badge: "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800", node: "from-amber-600 to-blue-500" }
};

const TechRadar3D = () => {
  const [viewMode, setViewMode] = useState("orbit"); // "orbit" or "grid"
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPercentages, setShowPercentages] = useState(false);
  const [selectedNode, setSelectedNode] = useState(techNodes[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  // Continuous 3D Orbital Rotation Loop
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || viewMode !== "orbit") return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying, prefersReducedMotion, viewMode]);

  const categories = ["All", "Frontend", "Backend", "AI / ML", "Databases & Systems"];

  const filteredNodes = activeCategory === "All" 
    ? techNodes 
    : techNodes.filter(n => n.category === activeCategory);

  const activeNode = techNodes.find(n => n.id === hoveredNodeId) || selectedNode;

  return (
    <div className="my-14 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden relative font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header Bar */}
      <div className="p-6 md:p-8 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div>
          <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-2">
            3D TECH RADAR & ORBIT
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FaAtom className="text-indigo-600 dark:text-indigo-400 animate-spin-slow text-xl" /> Interactive 3D Tech Stack Orbit
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Explore Adhi's core engineering skills, framework proficiencies, and verified portfolio usages
          </p>
        </div>

        {/* View Mode & Controls Suite */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          
          {/* View Mode Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-1">
            <button
              onClick={() => { try { playClickSound(); } catch (e) {} setViewMode("orbit"); }}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "orbit"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaGlobe className="text-[10px]" /> 3D Orbit
            </button>
            <button
              onClick={() => { try { playClickSound(); } catch (e) {} setViewMode("grid"); }}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaThLarge className="text-[10px]" /> Tech Matrix
            </button>
          </div>

          {viewMode === "orbit" && (
            <>
              <button
                onClick={() => { try { playClickSound(); } catch (e) {} setIsPlaying(!isPlaying); }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-indigo-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isPlaying ? <><FaPause className="text-[10px]" /> Pause</> : <><FaPlay className="text-[10px]" /> Orbit</>}
              </button>

              <button
                onClick={() => { try { playClickSound(); } catch (e) {} setShowPercentages(!showPercentages); }}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  showPercentages 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-semibold" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-indigo-50 dark:hover:bg-slate-700"
                }`}
              >
                <FaSlidersH className="text-[10px]" /> % Metrics
              </button>
            </>
          )}

        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-6 md:px-8 py-3 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-medium relative z-10">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">FILTER:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { try { playClickSound(); } catch (e) {} setActiveCategory(cat); }}
            className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? "bg-indigo-600 text-white font-semibold shadow-2xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View Mode 1: Immersive 3D Solar Orbit Stage */}
      {viewMode === "orbit" ? (
        <div className="p-6 md:p-10 min-h-[520px] flex items-center justify-center relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/30">
          
          {/* Tilted 3D Solar Orbit Container (Full Stage Dimensions: max-w-[720px] h-[480px]) */}
          <div className="relative w-full max-w-[720px] h-[480px] flex items-center justify-center" style={{ perspective: "1200px" }}>
            
            {/* Central Core Hub */}
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="absolute z-20 w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-indigo-500/30 flex flex-col items-center justify-center p-2 text-center border-2 border-indigo-200/60 dark:border-indigo-400/40 cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-200">CORE HUB</span>
              <span className="text-sm font-extrabold leading-tight">Full-Stack</span>
              <span className="text-[11px] text-purple-200 font-mono font-semibold">& AI / ML</span>
            </motion.div>

            {/* 3 Enlarged Concentric Tilted Orbital Rings */}
            <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-indigo-500/35 dark:border-indigo-400/30 pointer-events-none" style={{ transform: "rotateX(65deg)" }} />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-indigo-500/25 dark:border-indigo-400/20 pointer-events-none" style={{ transform: "rotateX(65deg)" }} />
            <div className="absolute w-[660px] h-[660px] rounded-full border border-dotted border-indigo-500/20 dark:border-indigo-400/15 pointer-events-none" style={{ transform: "rotateX(65deg)" }} />

            {/* Orbiting Tech Nodes */}
            {filteredNodes.map((node) => {
              const ringRadius = node.ring === 1 ? 150 : node.ring === 2 ? 240 : 330;
              const currentAngle = ((node.angle + rotation) * Math.PI) / 180;
              
              // 3D Perspective Projection (tilted Y axis by factor 0.65 for generous height separation)
              const x = Math.cos(currentAngle) * ringRadius;
              const y = Math.sin(currentAngle) * ringRadius * 0.65;

              // Z-Depth scaling & opacity (nodes in front are larger/brighter)
              const zDepth = Math.sin(currentAngle);
              const scale = 0.88 + (zDepth + 1) * 0.14; // 0.88 to 1.16 scale
              const opacity = 0.70 + (zDepth + 1) * 0.15; // 0.70 to 1.0 opacity
              const zIndex = Math.round((zDepth + 1) * 20);

              const isHovered = hoveredNodeId === node.id;
              const isSelected = selectedNode.id === node.id;
              const IconComp = node.icon;

              return (
                <React.Fragment key={node.id}>
                  {/* Active Laser Connection Line to Central Hub */}
                  {(isHovered || isSelected) && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
                      <line 
                        x1="50%" 
                        y1="50%" 
                        x2={`calc(50% + ${x}px)`} 
                        y2={`calc(50% + ${y}px)`} 
                        stroke="#6366f1" 
                        strokeWidth="2" 
                        strokeDasharray="5 4"
                        className="animate-pulse"
                      />
                    </svg>
                  )}

                  <motion.div
                    style={{
                      transform: `translate(${x}px, ${y}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex
                    }}
                    onMouseEnter={() => { setHoveredNodeId(node.id); }}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => { try { playClickSound(); } catch (e) {} setSelectedNode(node); }}
                    className="absolute cursor-pointer"
                  >
                    {/* Brand Icon Node Card */}
                    <div 
                      className={`flex items-center gap-2 p-1.5 pr-3.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 shadow-md ${
                        isSelected || isHovered
                          ? "bg-slate-900 text-white border-2 border-indigo-500 scale-110 shadow-indigo-500/40 shadow-xl"
                          : "bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 backdrop-blur-md"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800 shadow-inner">
                        <IconComp className={`text-sm ${node.iconColor}`} />
                      </div>
                      <span>{showPercentages ? `${node.name} (${node.level}%)` : node.name}</span>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}

          </div>

          {/* Floating Glassmorphic HUD Inspector Overlay (Absolute Top-Right) */}
          <div className="absolute top-4 right-4 z-30 w-72 sm:w-80 p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-indigo-200/80 dark:border-slate-800/80 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${categoryColors[activeNode.category]?.badge}`}>
                {activeNode.category}
              </span>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <FaCheckCircle className="text-emerald-500 text-[9px]" /> Verified Telemetry
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-lg shadow-md shrink-0">
                {React.createElement(activeNode.icon, { className: activeNode.iconColor })}
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  {activeNode.name}
                </h4>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {activeNode.level}% Competency Score
                </span>
              </div>
            </div>

            {/* Level Fill */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activeNode.level}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full bg-gradient-to-r ${categoryColors[activeNode.category]?.node}`}
              />
            </div>

            {/* Verified Usages */}
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">VERIFIED PORTFOLIO USAGE</span>
              <div className="space-y-1 text-xs">
                {activeNode.usages.slice(0, 2).map((usage, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 text-[11px] text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{usage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concepts */}
            <div className="flex flex-wrap gap-1 pt-1">
              {activeNode.concepts.map((concept, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono">
                  {concept}
                </span>
              ))}
            </div>

          </div>

        </div>
      ) : (
        
        /* View Mode 2: High-Density Tech Matrix Grid */
        <div className="p-6 md:p-8 bg-slate-50/40 dark:bg-slate-950/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techNodes.map((node) => {
            const IconComp = node.icon;
            const colors = categoryColors[node.category] || categoryColors["Frontend"];
            return (
              <motion.div
                key={node.id}
                whileHover={{ y: -3 }}
                onClick={() => { try { playClickSound(); } catch (e) {} setSelectedNode(node); }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 cursor-pointer hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-base">
                    <IconComp className={node.iconColor} />
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{node.level}%</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">{node.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{node.category}</span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${colors.node}`} style={{ width: `${node.level}%` }} />
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {node.usages[0]}
                </div>
              </motion.div>
            );
          })}
        </div>

      )}

    </div>
  );
};

export default TechRadar3D;
