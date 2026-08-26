import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaServer, FaDatabase, FaMobileAlt, FaLock, FaStream, 
  FaPlay, FaCheckCircle, FaChevronRight, FaTerminal, FaCodeBranch
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

// Factual Architecture Nodes Data
const nodes = [
  {
    id: 'client',
    title: 'React.js Client App',
    sub: 'Workverse Student Dashboard',
    roleTag: 'Frontend UI',
    icon: <FaMobileAlt className="text-sky-500 text-lg" />,
    color: 'border-sky-500/40 bg-sky-50/70 dark:bg-sky-950/30',
    desc: 'Frontend dashboard built with React.js, Tailwind CSS, and Server-Sent Events (SSE) event listeners for live updates.',
    role: 'Frontend + SSE Event Listener',
    tech: 'React.js · Tailwind CSS · SSE Client',
    codeSnippet: `// React.js SSE Event Listener
const eventSource = new EventSource('/api/v1/sse/stream');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateDashboardState(data);
};`
  },
  {
    id: 'api',
    title: 'Node.js / Express API',
    sub: 'REST Service Layer',
    roleTag: 'REST Service',
    icon: <FaServer className="text-indigo-500 text-lg" />,
    color: 'border-indigo-500/40 bg-indigo-50/70 dark:bg-indigo-950/30',
    desc: 'Backend API handling authentication, task management workflows, time-tracking logs, and referral reward calculation.',
    role: 'REST Controller & Task Routing',
    tech: 'Node.js · Express.js · Koa.js',
    codeSnippet: `// Node.js Express REST Router
app.post('/api/v1/tasks/assign', authenticateJWT, async (req, res) => {
  const task = await TaskService.assign(req.body);
  broadcastSSE('TASK_ASSIGNED', task);
  res.json({ success: true, task });
});`
  },
  {
    id: 'sse',
    title: 'Real-Time SSE Engine',
    sub: 'Server-Sent Events Stream',
    roleTag: 'Real-Time Stream',
    icon: <FaStream className="text-emerald-500 text-lg" />,
    color: 'border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30',
    desc: 'Persistent real-time event streaming pipeline broadcasting live messages, task assignment updates, and user mentions.',
    role: 'Event Broadcasting Stream Engine',
    tech: 'Server-Sent Events (SSE) · HTTP Streams',
    codeSnippet: `// Real-Time SSE Stream Broadcaster
export const broadcastSSE = (eventType, data) => {
  clients.forEach(client => {
    client.res.write(\`data: \${JSON.stringify({ eventType, data })}\\n\\n\`);
  });
};`
  },
  {
    id: 'db',
    title: 'PostgreSQL & Sequelize',
    sub: 'Relational Storage',
    roleTag: 'Relational DB',
    icon: <FaDatabase className="text-purple-500 text-lg" />,
    color: 'border-purple-500/40 bg-purple-50/70 dark:bg-purple-950/30',
    desc: 'Normalized relational database schema managing user profiles, role-based authorization rules, and transaction history logs.',
    role: 'Relational Storage & Schema Queries',
    tech: 'PostgreSQL · Sequelize ORM',
    codeSnippet: `-- PostgreSQL Relational Schema Index
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  assignee_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'PENDING'
);`
  },
  {
    id: 'auth',
    title: 'JWT Authorization',
    sub: 'Role-Based Security',
    roleTag: 'RBAC Security',
    icon: <FaLock className="text-amber-500 text-lg" />,
    color: 'border-amber-500/40 bg-amber-50/70 dark:bg-amber-950/30',
    desc: 'Stateless JSON Web Tokens providing RBAC security for Admin, Mentor, and Student user tiers.',
    role: 'Stateless Token & Role Security',
    tech: 'JWT Authentication · Authorization Middleware',
    codeSnippet: `// JWT Authentication Middleware
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};`
  }
];

const ArchitectureVisualizer = () => {
  const [activeNode, setActiveNode] = useState(nodes[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRefs = useRef([]);
  const [tilt, setTilt] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({});
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  // Desktop Card Hover 3D Tilt (Max 2-3 deg) & Spotlight
  const handleMouseMove = (e, index, nodeId) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const el = cardRefs.current[index];
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos((prev) => ({ ...prev, [nodeId]: { x, y } }));

      const xOffset = (x / rect.width - 0.5) * 3; // max 2-3 deg
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt((prev) => ({ 
        ...prev, 
        [nodeId]: { rx: Math.max(-2.5, Math.min(2.5, yOffset)), ry: Math.max(-2.5, Math.min(2.5, xOffset)) } 
      }));
    } catch (err) {}
  };

  const handleSelectNode = (node) => {
    try { playClickSound(); } catch (e) {}
    setActiveNode(node);
  };

  // Signature Simulation Handler (~2.5s data packet travel)
  const handleSimulateRequest = () => {
    if (isSimulating) return;
    try { playClickSound(); } catch (e) {}
    
    setIsSimulating(true);
    setIsComplete(false);
    setActiveStep(0);
    setActiveNode(nodes[0]);

    let currentStep = 0;

    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < nodes.length) {
        try { playClickSound(); } catch (e) {}
        setActiveStep(currentStep);
        setActiveNode(nodes[currentStep]);
      } else {
        clearInterval(stepInterval);
        try { playSuccessSound(); } catch (e) {}
        setIsComplete(true);
        setActiveStep(-1);
        
        setTimeout(() => {
          setIsSimulating(false);
          setIsComplete(false);
        }, 1500);
      }
    }, 500); // 5 steps * 500ms = 2.5 seconds
  };

  return (
    <section id="architecture" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      
      {/* Background Subtle Radial Glow & Grid Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Production Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Sashverse Technologies — Workverse SaaS Backend & Real-Time SSE Pipeline
            </p>
          </div>

          {/* Primary Action Button — Live Request Simulator */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSimulateRequest}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-xs transition-all duration-300 shadow-sm shrink-0 cursor-pointer focus:outline-hidden ${
              isComplete
                ? 'bg-emerald-600 text-white shadow-emerald-500/20 ring-2 ring-emerald-400'
                : isSimulating
                  ? 'bg-indigo-700 text-white opacity-90 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30'
            }`}
          >
            {isComplete ? (
              <>
                <FaCheckCircle className="text-sm animate-bounce" />
                <span>Request Complete ✓</span>
              </>
            ) : isSimulating ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Simulating Request...</span>
              </>
            ) : (
              <>
                <FaPlay className="text-[10px]" />
                <span>Simulate Live Request Data Packet</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Live Packet Simulation Indicator & Request Label */}
        {isSimulating && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between px-4 py-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="font-bold text-indigo-700 dark:text-indigo-300">REQUEST PACKET ACTIVE:</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">STAGE {activeStep + 1} OF 5 — {nodes[activeStep]?.title}</span>
            </div>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
              LIVE REQUEST
            </span>
          </motion.div>
        )}

        {/* Pipeline Grid & Animated Connection Channels */}
        <div className="relative">
          
          {/* Desktop Connection Beam Behind Cards */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full">
            {isSimulating && (
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: `${(activeStep / (nodes.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-600 shadow-md shadow-indigo-500/50 border-2 border-white dark:border-slate-900 flex items-center justify-center -ml-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </motion.div>
            )}
          </div>

          {/* 5 Architecture Nodes (Desktop: 5-Col Grid / Mobile: Vertical Stack) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const isSelected = activeNode.id === node.id;
              const isStepActive = isSimulating && activeStep === index;
              const nodeTilt = tilt[node.id] || { rx: 0, ry: 0 };
              const nodeSpotlight = spotlightPos[node.id] || { x: 0, y: 0 };
              const isNodeHovered = hoveredNodeId === node.id;

              return (
                <motion.div
                  key={node.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleSelectNode(node)}
                  onMouseMove={(e) => handleMouseMove(e, index, node.id)}
                  onMouseEnter={() => { if (!isTouchDevice && !prefersReducedMotion) setHoveredNodeId(node.id); }}
                  onMouseLeave={() => { setHoveredNodeId(null); setTilt((prev) => ({ ...prev, [node.id]: { rx: 0, ry: 0 } })); }}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15, filter: 'blur(3px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transform: !isTouchDevice && !prefersReducedMotion && isNodeHovered
                      ? `perspective(1000px) rotateX(${nodeTilt.rx}deg) rotateY(${nodeTilt.ry}deg) translateY(-4px)`
                      : 'none',
                    transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                  }}
                  className={`relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full shadow-2xs ${
                    isStepActive
                      ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/30 shadow-md shadow-indigo-500/10 scale-[1.02]'
                      : isSelected
                        ? 'border-indigo-400/60 dark:border-indigo-500/60 shadow-xs ring-1 ring-indigo-500/20'
                        : 'border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                >
                  {/* Barely Visible 5% Opacity Cursor Spotlight Glow */}
                  {!isTouchDevice && !prefersReducedMotion && isNodeHovered && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(220px circle at ${nodeSpotlight.x}px ${nodeSpotlight.y}px, rgba(91, 75, 255, 0.05), transparent 80%)`
                      }}
                    />
                  )}

                  {/* Active Simulation Step Pulse Dot */}
                  {isStepActive && (
                    <span className="absolute top-3 right-3 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600" />
                    </span>
                  )}

                  <div>
                    {/* Node Icon Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 w-fit shrink-0">
                        {node.icon}
                      </div>

                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        STAGE 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-0.5">
                      {node.title}
                    </h3>
                    <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                      {node.sub}
                    </p>
                  </div>

                  {/* Node Role Tag Footer (No fake latencies) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="uppercase text-[9px] font-bold text-slate-400">ROLE:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60">
                      {node.roleTag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Selected Architecture Layer Detail & Live Code Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Detail Inspector (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xl shrink-0">
                  {activeNode.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{activeNode.title}</h3>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{activeNode.sub}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {activeNode.desc}
              </p>

              {/* Factual Architectural Specifications */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">ARCHITECTURE ROLE:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{activeNode.role}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">TECH STACK:</span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">{activeNode.tech}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 px-3 py-1.5 rounded-xl">
                  <FaCheckCircle className="text-emerald-500" /> Production Verified Layer
                </span>
              </div>
            </div>

            {/* Right Verified Code Inspector Terminal (7 Cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-white shadow-2xl overflow-hidden relative">
              
              {/* Terminal Window Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-[10px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-indigo-300 font-bold flex items-center gap-1.5">
                    <FaCodeBranch className="text-indigo-400 text-xs" /> {activeNode.id}_implementation_spec.js
                  </span>
                </div>
                <span className="text-slate-500 font-mono">Verified Spec</span>
              </div>

              {/* Code Snippet Container */}
              <pre className="text-[11px] leading-relaxed text-emerald-400 overflow-x-auto p-2">
                <code>{activeNode.codeSnippet}</code>
              </pre>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ArchitectureVisualizer;
