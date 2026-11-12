import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBrain, FaServer, FaStore, FaFilm, 
  FaExternalLinkAlt, FaCheckCircle, FaPlay, 
  FaShoppingCart, FaLock, FaGithub, FaFileWord, FaSyncAlt, FaArrowRight
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const interactiveProjects = [
  {
    id: "ai-maker",
    title: "AI Assessment Maker",
    category: "Full-Stack AI Application",
    badge: "Live on Vercel",
    liveUrl: "https://assessmentmaker.vercel.app/",
    githubUrl: "https://github.com/VIGNESH79899",
    icon: <FaBrain className="text-[#777C62] dark:text-[#ADB293] text-lg" />,
    summary: "Full-stack AI platform generating complete academic assignments, exam rubrics, and automated DOCX downloads.",
    tech: ["React.js", "Node.js", "MongoDB", "AI APIs", "DOCX Export"],
    browserUrl: "assessmentmaker.vercel.app",
    type: "ai"
  },
  {
    id: "workverse",
    title: "Workverse SaaS Platform",
    category: "Full-Stack Internship",
    badge: "Production SaaS",
    liveUrl: "https://github.com/VIGNESH79899",
    githubUrl: "https://github.com/VIGNESH79899",
    icon: <FaServer className="text-[#8C7258] dark:text-[#C1A17F] text-lg" />,
    summary: "Production team workspace with real-time Server-Sent Events (SSE) updates, JWT authentication, and task boards.",
    tech: ["React.js", "Node.js", "PostgreSQL", "SSE Real-Time", "JWT Auth"],
    browserUrl: "workverse.sashverse.com/dashboard",
    type: "saas"
  },
  {
    id: "movie-rec",
    title: "Movie Recommendation Engine",
    category: "Machine Learning & NLP",
    badge: "ML NLP Engine",
    liveUrl: "https://github.com/VIGNESH79899/MOVIE_REC",
    githubUrl: "https://github.com/VIGNESH79899/MOVIE_REC",
    icon: <FaFilm className="text-[#8C7258] dark:text-[#C1A17F] text-lg" />,
    summary: "Content-based movie recommendation system using TF-IDF vectorization and cosine similarity over 5,000+ films.",
    tech: ["Python", "Scikit-Learn", "TF-IDF", "Cosine Similarity", "Pandas"],
    browserUrl: "ml-recommendation-engine.local",
    type: "ml"
  }
];

// Sample AI Topics for interactive preview
const aiTopics = [
  {
    id: "ml",
    title: "Deep Learning & Neural Architectures",
    description: "Multi-layer perceptrons, backpropagation gradients, and attention mechanisms in NLP.",
    pages: 14,
    similarity: "99% Original"
  },
  {
    id: "db",
    title: "Database Normalization & ACID Transactions",
    description: "Comparative study of 3NF/BCNF schemas, transaction isolation levels, and WAL logging.",
    pages: 12,
    similarity: "98% Original"
  },
  {
    id: "sys",
    title: "Distributed Systems & Consensus Protocols",
    description: "Raft consensus, split-brain resolution, and leader election across distributed clusters.",
    pages: 16,
    similarity: "99% Original"
  }
];

// Sample Movie Recommendations for interactive preview
const movieRecData = {
  "Interstellar": [
    { title: "The Martian", match: 94, genre: "Sci-Fi / Space Survival" },
    { title: "Arrival", match: 89, genre: "Sci-Fi / Linguistics" },
    { title: "Gravity", match: 85, genre: "Sci-Fi / Thriller" }
  ],
  "The Dark Knight": [
    { title: "Batman Begins", match: 96, genre: "Action / Superhero" },
    { title: "The Dark Knight Rises", match: 94, genre: "Action / Thriller" },
    { title: "Joker (2019)", match: 87, genre: "Psychological Drama" }
  ],
  "Inception": [
    { title: "Shutter Island", match: 91, genre: "Mystery / Thriller" },
    { title: "Memento", match: 89, genre: "Mystery / Neo-Noir" },
    { title: "Tenet", match: 86, genre: "Sci-Fi / Action" }
  ]
};

const ProjectPlayground = () => {
  const [activeProject, setActiveProject] = useState(interactiveProjects[0]);
  
  // AI Assessment interactive state
  const [selectedAiTopic, setSelectedAiTopic] = useState(aiTopics[0]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Workverse interactive state
  const [taskStatus, setTaskStatus] = useState("IN_PROGRESS");
  const [liveEventBanner, setLiveEventBanner] = useState("Connected to Live SSE Stream • Sub-100ms sync active");

  // Movie Recommendation interactive state
  const [selectedMovie, setSelectedMovie] = useState("Interstellar");

  const handleSelect = (project) => {
    try { playClickSound(); } catch (e) {}
    setActiveProject(project);
  };

  const handleAiTopicChange = (topic) => {
    try { playClickSound(); } catch (e) {}
    setIsAiGenerating(true);
    setTimeout(() => {
      setSelectedAiTopic(topic);
      setIsAiGenerating(false);
      try { playSuccessSound(); } catch (e) {}
    }, 350);
  };

  const handleToggleTaskStatus = () => {
    try { playClickSound(); } catch (e) {}
    if (taskStatus === "IN_PROGRESS") {
      setTaskStatus("COMPLETED");
      setLiveEventBanner("⚡ SSE Broadcast: Adhi marked Task #8921 as COMPLETED • Broadcasted to 4 clients!");
      try { playSuccessSound(); } catch (e) {}
    } else {
      setTaskStatus("IN_PROGRESS");
      setLiveEventBanner("⚡ SSE Broadcast: Task #8921 set to IN_PROGRESS • Syncing team board...");
    }
  };

  const handleSelectMovie = (movieName) => {
    try { playClickSound(); } catch (e) {}
    setSelectedMovie(movieName);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 border border-[#D8D1C5] dark:border-[#414239] my-10 bg-[#FFFDF9] dark:bg-[#252620] rounded-2xl shadow-2xs relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[300px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#D8D1C5]/70 dark:border-[#414239] relative z-10">
        <div>
          <span className="pro-badge-olive mb-2 inline-block">
            FEATURED PROJECT SPOTLIGHT
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
            Live Project Preview &amp; Interactive Demos
          </h3>
          <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-1 font-normal">
            Interact with live workflows, test features, and view deployed applications directly
          </p>
        </div>

        {/* Action Button linking to live deployment */}
        {activeProject.liveUrl && (
          <a
            href={activeProject.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs cursor-pointer focus:outline-none self-start sm:self-auto flex items-center gap-2"
          >
            <span>Visit Live App</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Tabs (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {interactiveProjects.map((p) => {
            const isSelected = activeProject.id === p.id;
            return (
              <motion.div
                key={p.id}
                onClick={() => handleSelect(p)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-[#E7E1D6]/70 dark:bg-[#303129] border-[#777C62] dark:border-[#ADB293] shadow-xs ring-1 ring-[#777C62]/30 dark:ring-[#ADB293]/30"
                    : "bg-[#FFFDF9] dark:bg-[#252620] border-[#D8D1C5] dark:border-[#414239] opacity-85 hover:opacity-100 hover:border-[#777C62]/40"
                }`}
              >
                <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="p-2 rounded-lg bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-2xs text-base shrink-0 mt-0.5">
                      {p.icon}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#252722] dark:text-[#F5F2EB] font-heading leading-snug">{p.title}</h4>
                      <span className="text-[10px] text-[#68675F] dark:text-[#C0BFB3] font-mono block mt-0.5">{p.category}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FFFDF9] dark:bg-[#252620] text-[#777C62] dark:text-[#ADB293] border border-[#D8D1C5] dark:border-[#414239] whitespace-nowrap self-start shrink-0">
                    {p.badge}
                  </span>
                </div>

                <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] leading-relaxed mb-3">
                  {p.summary}
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FFFDF9] dark:bg-[#252620] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Live Interactive Browser Preview Panel (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#1E201B] border border-[#D8D1C5] dark:border-[#414239] shadow-md overflow-hidden">
            
            {/* Realistic Browser Chrome Header */}
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-[#E7E1D6]/50 dark:bg-[#252620] border-b border-[#D8D1C5] dark:border-[#414239] text-xs">
              
              {/* Window Controls (Red/Yellow/Green) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-2 px-3 py-1 bg-[#FFFDF9] dark:bg-[#1C1D19] border border-[#D8D1C5] dark:border-[#414239] rounded-lg max-w-[280px] min-w-0 flex-1 text-[11px] font-mono text-[#68675F] dark:text-[#C0BFB3] truncate">
                <FaLock className="text-[9px] text-[#777C62] dark:text-[#ADB293] shrink-0" />
                <span className="truncate">{activeProject.browserUrl}</span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#777C62] dark:text-[#ADB293] shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
                <span className="hidden sm:inline">LIVE PREVIEW</span>
              </div>
            </div>

            {/* Interactive Preview Canvas */}
            <div className="p-3.5 sm:p-6 min-h-[300px] sm:min-h-[360px] flex flex-col justify-between">
              
              {/* VIEW 1: AI ASSESSMENT MAKER */}
              {activeProject.type === "ai" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] font-bold block mb-2">
                      SELECT ACADEMIC TOPIC TO PREVIEW GENERATION:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {aiTopics.map((topic) => {
                        const isChosen = selectedAiTopic.id === topic.id;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => handleAiTopicChange(topic)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                              isChosen
                                ? 'pill-venom-active font-semibold shadow-md'
                                : 'pill-venom-inactive hover:border-[#777C62]'
                            }`}
                          >
                            <span className="block truncate font-medium text-[11px]">{topic.title.split('&')[0]}</span>
                            <span className="block text-[10px] opacity-75 mt-0.5">{topic.pages} Pages • .DOCX</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generated Document Card Preview */}
                  <AnimatePresence mode="wait">
                    {isAiGenerating ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-8 rounded-xl bg-[#E7E1D6]/40 dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] text-center space-y-2"
                      >
                        <FaSyncAlt className="animate-spin text-xl text-[#777C62] dark:text-[#ADB293] mx-auto" />
                        <p className="text-xs font-semibold text-[#252722] dark:text-[#F5F2EB]">Generating Assessment Outline...</p>
                        <p className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3]">Formatting Bloom's Taxonomy &amp; DOCX Streams</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={selectedAiTopic.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-4 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-2xs space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D1C5]/70 dark:border-[#414239] pb-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="p-1.5 rounded-lg bg-[#E7E1D6] dark:bg-[#303129] text-[#777C62] dark:text-[#ADB293] shrink-0">
                              <FaFileWord className="text-base" />
                            </span>
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading truncate">{selectedAiTopic.title}</h5>
                              <span className="text-[10px] font-mono text-[#777C62] dark:text-[#ADB293]">Document Ready for Export</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#E7E1D6]/60 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239] shrink-0">
                            {selectedAiTopic.similarity}
                          </span>
                        </div>

                        <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] leading-relaxed">
                          {selectedAiTopic.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
                          <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                            <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">FORMAT</span>
                            <span className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB]">DOCX / PDF</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                            <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">LENGTH</span>
                            <span className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB]">{selectedAiTopic.pages} Pages</span>
                          </div>
                          <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                            <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">DELIVERY</span>
                            <span className="text-xs font-bold text-[#777C62] dark:text-[#ADB293]">Instant Stream</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* VIEW 2: WORKVERSE SAAS PLATFORM */}
              {activeProject.type === "saas" && (
                <div className="space-y-4">
                  {/* Real-time Status Notification Banner */}
                  <div className="p-2.5 rounded-xl bg-[#E7E1D6]/70 dark:bg-[#303129] border border-[#777C62]/30 dark:border-[#ADB293]/30 flex items-center justify-between text-xs font-medium text-[#252722] dark:text-[#F5F2EB]">
                    <div className="flex items-center gap-2 min-w-0 w-full">
                      <span className="w-2 h-2 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse shrink-0" />
                      <span className="font-mono text-[11px] leading-snug break-words">{liveEventBanner}</span>
                    </div>
                  </div>

                  {/* Kanban Sprint Task Card */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-2xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#777C62] dark:text-[#ADB293] bg-[#E7E1D6]/60 dark:bg-[#303129] px-2 py-0.5 rounded border border-[#D8D1C5] dark:border-[#414239]">
                        SPRINT TASK #8921
                      </span>
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                        taskStatus === "COMPLETED"
                          ? "bg-[#777C62]/20 text-[#777C62] dark:text-[#ADB293] border border-[#777C62]/40"
                          : "bg-[#8C7258]/20 text-[#8C7258] dark:text-[#C1A17F] border border-[#8C7258]/40"
                      }`}>
                        {taskStatus === "COMPLETED" ? "COMPLETED ✓" : "IN PROGRESS ⏳"}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-[#252722] dark:text-[#F5F2EB] font-heading">
                        Implement JWT Auth &amp; Real-Time SSE Mentions
                      </h5>
                      <p className="text-xs text-[#68675F] dark:text-[#C0BFB3] mt-1">
                        Assigned to: <strong className="text-[#252722] dark:text-[#F5F2EB]">Adhi Vignesh (Full Stack Intern)</strong>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#D8D1C5]/70 dark:border-[#414239] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3]">
                        Real-Time Channel: <code className="text-[#252722] dark:text-[#F5F2EB]">/sse/tasks/stream</code>
                      </span>
                      <button
                        onClick={handleToggleTaskStatus}
                        className="btn-primary text-xs !py-1.5 !px-3 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <FaCheckCircle className="text-xs" />
                        <span>{taskStatus === "COMPLETED" ? "Reopen Task" : "Complete Task"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Architecture metric tags */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">LATENCY</span>
                      <span className="font-bold text-[#252722] dark:text-[#F5F2EB]">&lt; 100ms SSE</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">DATABASE</span>
                      <span className="font-bold text-[#252722] dark:text-[#F5F2EB]">PostgreSQL</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">SECURITY</span>
                      <span className="font-bold text-[#777C62] dark:text-[#ADB293]">JWT Cookie</span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: MOVIE RECOMMENDATION ENGINE */}
              {activeProject.type === "ml" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3] font-bold block mb-2">
                      SELECT A MOVIE TO RUN SIMILARITY MATCHER:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {Object.keys(movieRecData).map((movie) => {
                        const isChosen = selectedMovie === movie;
                        return (
                          <button
                            key={movie}
                            onClick={() => handleSelectMovie(movie)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer text-xs font-semibold ${
                              isChosen
                                ? 'pill-venom-active shadow-md'
                                : 'pill-venom-inactive hover:border-[#777C62]'
                            }`}
                          >
                            <span className="block truncate">{movie}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommendations Output List */}
                  <div className="p-4 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-2xs space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 border-b border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[11px] font-bold text-[#252722] dark:text-[#F5F2EB]">
                        Top Matches for "{selectedMovie}":
                      </span>
                      <span className="text-[10px] font-mono text-[#777C62] dark:text-[#ADB293] font-bold">
                        TF-IDF &amp; Cosine Score
                      </span>
                    </div>

                    <div className="space-y-2">
                      {movieRecData[selectedMovie]?.map((rec, rIdx) => (
                        <div key={rIdx} className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#252722] dark:text-[#F5F2EB] block">{rec.title}</span>
                            <span className="text-[10px] text-[#68675F] dark:text-[#C0BFB3]">{rec.genre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-[#D8D1C5] dark:bg-[#414239] overflow-hidden hidden sm:block">
                              <div 
                                className="h-full bg-[#777C62] dark:bg-[#ADB293] rounded-full transition-all duration-500" 
                                style={{ width: `${rec.match}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-[#777C62] dark:text-[#ADB293]">{rec.match}% Match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">ALGORITHM</span>
                      <span className="font-bold text-[#252722] dark:text-[#F5F2EB]">Cosine Similarity</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">FEATURES</span>
                      <span className="font-bold text-[#252722] dark:text-[#F5F2EB]">5,000 TF-IDF</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5F2EB] dark:bg-[#1C1D19] border border-[#D8D1C5]/70 dark:border-[#414239]">
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">DATASET</span>
                      <span className="font-bold text-[#777C62] dark:text-[#ADB293]">5,000+ Movies</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Bar of Preview Window */}
              <div className="mt-4 pt-3 border-t border-[#D8D1C5] dark:border-[#414239] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#777C62] dark:text-[#ADB293] font-semibold text-[11px]">
                  <FaCheckCircle className="text-xs" /> Interactive Live Preview Ready
                </span>
                <div className="flex items-center gap-3">
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-[#F5F2EB] flex items-center gap-1.5 text-xs font-medium transition-colors"
                    >
                      <FaGithub className="text-sm" />
                      <span>Source</span>
                    </a>
                  )}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#777C62] dark:text-[#ADB293] hover:underline flex items-center gap-1 text-xs font-semibold"
                    >
                      <span>Open Website</span>
                      <FaArrowRight className="text-[10px]" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ProjectPlayground;
