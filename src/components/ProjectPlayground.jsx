import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaServer, FaBrain, FaDatabase, FaCheckCircle, 
  FaPlay, FaCode, FaChevronRight, FaTerminal 
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const interactiveProjects = [
  {
    id: "workverse",
    title: "Workverse SaaS Platform",
    company: "Sashverse Technologies",
    icon: <FaServer className="text-indigo-500 text-lg" />,
    badge: "Production SaaS API",
    tech: ["React.js", "Node.js", "Express", "PostgreSQL", "SSE Real-Time", "JWT Auth"],
    summary: "Production SaaS platform managing onboarding, task workflows, and real-time Server-Sent Events messaging.",
    pipelineNodes: [
      { name: "React Client", role: "UI & SSE Listener" },
      { name: "Node.js API", role: "REST Router" },
      { name: "SSE Stream", role: "Real-Time Broadcaster" },
      { name: "PostgreSQL", role: "Relational Storage" }
    ],
    demoOutput: {
      type: "JSON_RESPONSE",
      endpoint: "POST /api/v1/workverse/tasks/assign",
      status: 200,
      json: {
        success: true,
        event: "TASK_ASSIGNED_SSE",
        task: { id: "TASK-8921", title: "Implement JWT & SSE Mentions", status: "IN_PROGRESS" },
        assignee: { id: "DEV-07", name: "Adhi Vignesh", role: "Full Stack Developer Intern" },
        timestamp: "2026-08-24T21:54:00Z"
      }
    }
  },
  {
    id: "ai-maker",
    title: "AI Assessment Maker",
    company: "Personal Innovation",
    icon: <FaBrain className="text-purple-500 text-lg" />,
    badge: "Full-Stack AI Engine",
    tech: ["React.js", "Node.js", "MongoDB Atlas", "AI Service API", "DOCX Export"],
    pipelineNodes: [
      { name: "React App", role: "Prompt Interface" },
      { name: "Express Service", role: "Pipeline Controller" },
      { name: "AI Engine", role: "Structured Generation" },
      { name: "DOCX Exporter", role: "Document Stream" }
    ],
    demoOutput: {
      type: "AI_GENERATION",
      endpoint: "POST /api/v1/ai/generate-assessment",
      status: 200,
      json: {
        status: "GENERATED",
        documentType: "RESEARCH_REPORT_DOCX",
        topic: "Linear Algebra & Rank-Nullity Applications in Deep Learning",
        pages: 14,
        exportUrl: "https://storage.googleapis.com/assessments/report-891.docx",
        similarityScore: "0.02 (Original)"
      }
    }
  },
  {
    id: "recommendation",
    title: "Movie Recommendation Engine",
    company: "Machine Learning Project",
    icon: <FaBrain className="text-emerald-500 text-lg" />,
    badge: "ML NLP Pipeline",
    tech: ["Python", "Pandas", "Scikit-learn", "TF-IDF Vectorizer", "Cosine Similarity"],
    pipelineNodes: [
      { name: "Raw Data", role: "Movie Metadata" },
      { name: "TF-IDF", role: "Text Vectorization" },
      { name: "Cosine Matrix", role: "Similarity Score" },
      { name: "Top-N Rank", role: "Recommendation List" }
    ],
    demoOutput: {
      type: "ML_PREDICTION",
      endpoint: "PYTHON ML_PIPELINE.py --query 'Interstellar'",
      status: 200,
      json: {
        queryMovie: "Interstellar (2014)",
        vectorizer: "TF-IDF (5000 features)",
        recommendations: [
          { title: "Inception", similarity: 0.892 },
          { title: "The Martian", similarity: 0.845 },
          { title: "Arrival", similarity: 0.812 },
          { title: "Contact", similarity: 0.789 }
        ]
      }
    }
  }
];

const ProjectPlayground = () => {
  const [activeProject, setActiveProject] = useState(interactiveProjects[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (project) => {
    try { playClickSound(); } catch (e) {}
    setActiveProject(project);
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    try { playClickSound(); } catch (e) {}
    
    setIsSimulating(true);
    setIsComplete(false);
    setActiveStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < activeProject.pipelineNodes.length) {
        try { playClickSound(); } catch (e) {}
        setActiveStep(step);
      } else {
        clearInterval(interval);
        try { playSuccessSound(); } catch (e) {}
        setIsComplete(true);
        setActiveStep(-1);

        setTimeout(() => {
          setIsSimulating(false);
          setIsComplete(false);
        }, 1500);
      }
    }, 600);
  };

  return (
    <div className="p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 my-10 bg-white dark:bg-slate-900 rounded-2xl shadow-2xs relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[450px] h-[300px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-2">
            FEATURED SYSTEM
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Live API & Pipeline Inspector
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate real data packet flows across production architectures
          </p>
        </div>

        {/* Primary Simulation Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 shadow-2xs shrink-0 cursor-pointer focus:outline-hidden ${
            isComplete
              ? 'bg-emerald-600 text-white shadow-emerald-500/20 ring-2 ring-emerald-400'
              : isSimulating
                ? 'bg-indigo-700 text-white opacity-90 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30'
          }`}
        >
          {isComplete ? (
            <>
              <FaCheckCircle className="text-xs" />
              <span>Simulation Complete ✓</span>
            </>
          ) : isSimulating ? (
            <>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Running Simulation...</span>
            </>
          ) : (
            <>
              <FaPlay className="text-[10px]" />
              <span>Run Live Simulation</span>
            </>
          )}
        </motion.button>
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
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-400/50 shadow-2xs ring-1 ring-indigo-500/20"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800/60 opacity-85 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-2xs text-base">
                      {p.icon}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {p.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {p.summary}
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Browser / Terminal Inspector Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Animated Pipeline Nodes Flow Visualizer */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
              LIVE PIPELINE STAGES:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {activeProject.pipelineNodes.map((node, nIdx) => {
                const isStepActive = isSimulating && activeStep === nIdx;
                return (
                  <div
                    key={nIdx}
                    className={`p-2.5 rounded-lg border text-xs transition-all duration-300 ${
                      isStepActive
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm ring-2 ring-indigo-500/30 font-bold scale-105'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-indigo-500 dark:text-indigo-400 block mb-0.5">
                      0{nIdx + 1}
                    </span>
                    <span className="text-[11px] font-bold block truncate">{node.name}</span>
                    <span className="text-[9px] opacity-75 block truncate">{node.role}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Code Response Frame */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-white shadow-2xl overflow-hidden relative">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-indigo-300 font-bold flex items-center gap-1.5">
                  <FaTerminal className="text-indigo-400 text-xs" /> {activeProject.demoOutput.endpoint}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                HTTP {activeProject.demoOutput.status} OK
              </span>
            </div>

            {/* Simulated Code JSON Response Output */}
            <div className="relative">
              {isSimulating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center text-indigo-300 font-bold gap-2.5 z-10 rounded-xl"
                >
                  <FaCode className="animate-spin text-base" /> Executing pipeline simulation...
                </motion.div>
              )}

              <pre className="text-[11px] leading-relaxed text-emerald-400 overflow-x-auto p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <code>{JSON.stringify(activeProject.demoOutput.json, null, 2)}</code>
              </pre>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <FaCheckCircle className="text-xs" /> Verified Live Pipeline Execution
              </span>
              <span>Spec #{activeProject.id}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectPlayground;
