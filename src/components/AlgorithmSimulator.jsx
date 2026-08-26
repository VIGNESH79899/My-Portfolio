import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaStepForward, FaRedo, FaSlidersH, 
  FaBrain, FaCubes, FaStream, FaCheckCircle, FaCode, FaTerminal, 
  FaBolt, FaLaptopCode, FaGlobe, FaServer, FaCheck
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const algorithms = [
  {
    id: "cosine",
    title: "Cosine Similarity Matrix",
    subtitle: "TF-IDF Vector Engine for Movie Recommendation System",
    icon: <FaBrain className="text-purple-400" />,
    badge: "AI / ML PIPELINE",
    sampleInputs: [
      { label: "Sci-Fi Pair", input1: "Sci-Fi Space Voyage", input2: "Interstellar Space Movie", expectedScore: "89.2%" },
      { label: "Action Pair", input1: "Cyberpunk Action Hero", input2: "Sci-Fi Action Adventure", expectedScore: "84.5%" },
      { label: "Drama Pair", input1: "Romantic Drama Story", input2: "Historical Drama Tale", expectedScore: "76.4%" }
    ],
    code: [
      "def cosine_similarity(vec_a, vec_b):",
      "    dot_product = np.dot(vec_a, vec_b)",
      "    norm_a = np.linalg.norm(vec_a)",
      "    norm_b = np.linalg.norm(vec_b)",
      "    return dot_product / (norm_a * norm_b)"
    ],
    steps: [
      { step: 1, name: "Tokenization & Normalization", detail: "Tokenizing inputs into normalized vector space", metric: "3 Tokens Processed", activeLine: 0 },
      { step: 2, name: "TF-IDF Matrix Vectorization", detail: "Computing term frequency matrix: V1=[0.82, 0.45], V2=[0.79, 0.48]", metric: "Sparse Vector (2D)", activeLine: 1 },
      { step: 3, name: "Dot Product & Norm Calculation", detail: "Computing Dot Product: V1 • V2 = 0.892 (89.2% Match)", metric: "Sim(V1, V2) = 0.892", activeLine: 2 },
      { step: 4, name: "Recommendation Feed Trigger", detail: "Similarity threshold > 0.85 -> Pushing 'Interstellar' to feed", metric: "MATCH HIGH", activeLine: 4 }
    ],
    variables: [
      { name: "vec_a", value: "[0.82, 0.45, 0.12]", type: "ndarray" },
      { name: "vec_b", value: "[0.79, 0.48, 0.08]", type: "ndarray" },
      { name: "dot_product", value: "0.8924", type: "float64" },
      { name: "similarity", value: "0.892 (89.2%)", type: "float64" }
    ]
  },
  {
    id: "hashing",
    title: "Hash Table Collision Resolution",
    subtitle: "C Password Storage Engine with DJB2 & Linear Probing",
    icon: <FaCubes className="text-amber-400" />,
    badge: "LOW-LEVEL C SYSTEMS",
    sampleInputs: [
      { label: "Secure Key 1", input1: "user_pass_secure_901", input2: "Slot #47", expectedScore: "0 Collisions" },
      { label: "Secure Key 2", input1: "admin_auth_token_88", input2: "Slot #23", expectedScore: "0 Collisions" }
    ],
    code: [
      "unsigned long hash_key(const char *str) {",
      "    unsigned long hash = 5381;",
      "    while (*str) hash = ((hash << 5) + hash) + *str++;",
      "    return hash % TABLE_SIZE;",
      "}"
    ],
    steps: [
      { step: 1, name: "DJB2 Hash Digest Generation", detail: "Hashing string 'user_pass_secure_901' via DJB2 Algorithm", metric: "Digest: 0x7f4a9b", activeLine: 1 },
      { step: 2, name: "Bucket Index Computation", detail: "Index = Digest % 64 -> Computed Bucket Slot: #47", metric: "Slot #47", activeLine: 3 },
      { step: 3, name: "Chaining & Linear Probe Check", detail: "Slot #47 status: Empty (0 Collisions detected)", metric: "0 Collisions", activeLine: 3 },
      { step: 4, name: "Heap Memory Allocation", detail: "Writing hashed payload to memory offset 0x00A4F", metric: "Status 200 OK", activeLine: 4 }
    ],
    variables: [
      { name: "*str", value: "\"user_pass_secure_901\"", type: "const char*" },
      { name: "hash", value: "0x7f4a9b5c", type: "unsigned long" },
      { name: "bucket_index", value: "47", type: "int" },
      { name: "collisions", value: "0", type: "int" }
    ]
  },
  {
    id: "sse_stream",
    title: "Server-Sent Events (SSE) Stream",
    subtitle: "Sub-15ms Live Telemetry Push for Workverse SaaS",
    icon: <FaStream className="text-emerald-400" />,
    badge: "REAL-TIME STREAMING",
    sampleInputs: [
      { label: "Notification Event", input1: "TASK_ASSIGNED", input2: "Mentorship Queue", expectedScore: "12ms Latency" },
      { label: "Telemetry Event", input1: "WORKVERSE_LIVE_SYNC", input2: "Student Dashboard", expectedScore: "11ms Latency" }
    ],
    code: [
      "app.get('/api/v1/stream', (req, res) => {",
      "    res.setHeader('Content-Type', 'text/event-stream');",
      "    res.setHeader('Cache-Control', 'no-cache');",
      "    res.write('data: ' + JSON.stringify(payload) + '\\n\\n');",
      "});"
    ],
    steps: [
      { step: 1, name: "Client SSE Handshake", detail: "Opening persistent HTTP/1.1 socket: text/event-stream", metric: "HTTP 200 OK", activeLine: 1 },
      { step: 2, name: "Event Queue Polling", detail: "Broadcasting payload: { type: 'NOTIFICATION', id: 492 }", metric: "Latency: 12ms", activeLine: 3 },
      { step: 3, name: "Chunk Stream Transmission", detail: "Streaming data chunk via event-loop queue: 1.4 kB", metric: "1.4 kB Streamed", activeLine: 3 },
      { step: 4, name: "Client UI State Sync", detail: "React state listener received packet & updated UI", metric: "Synced", activeLine: 4 }
    ],
    variables: [
      { name: "socket_status", value: "HTTP_200_CONNECTED", type: "string" },
      { name: "event_type", value: "\"NOTIFICATION_PUSH\"", type: "string" },
      { name: "latency", value: "12ms", type: "duration" },
      { name: "chunk_size", value: "1.4 kB", type: "bytes" }
    ]
  }
];

const AlgorithmSimulator = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState("canvas"); // "canvas" or "debugger"
  const [speed, setSpeed] = useState(1);
  const [selectedInputPair, setSelectedInputPair] = useState(algorithms[0].sampleInputs[0]);

  // Automated Step Execution Loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 1200 / speed;
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < selectedAlgo.steps.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          try { playSuccessSound(); } catch (e) {}
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, selectedAlgo, speed]);

  const handleSelectAlgo = (algo) => {
    try { playClickSound(); } catch (e) {}
    setSelectedAlgo(algo);
    setSelectedInputPair(algo.sampleInputs[0]);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    try { playClickSound(); } catch (e) {}
    if (currentStepIdx >= selectedAlgo.steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepNext = () => {
    try { playClickSound(); } catch (e) {}
    setIsPlaying(false);
    if (currentStepIdx < selectedAlgo.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    try { playClickSound(); } catch (e) {}
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleSelectInput = (inputObj) => {
    try { playClickSound(); } catch (e) {}
    setSelectedInputPair(inputObj);
    setCurrentStepIdx(0);
  };

  const activeStep = selectedAlgo.steps[currentStepIdx];

  return (
    <div className="bento-card p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 my-14 shadow-2xl overflow-hidden font-sans relative">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/5 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800/80 relative z-10">
        <div>
          <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-2">
            LIVE ALGORITHM SIMULATOR
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FaSlidersH className="text-indigo-600 dark:text-indigo-400 text-xl" /> Interactive Algorithm Execution Engine
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Simulate, step through, and debug real algorithmic pipelines from Adhi's core projects
          </p>
        </div>

        {/* View Mode & Controls Suite */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          
          {/* View Mode Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-1">
            <button
              onClick={() => { try { playClickSound(); } catch (e) {} setViewMode("canvas"); }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "canvas"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaGlobe className="text-[10px]" /> Graphical Canvas
            </button>
            <button
              onClick={() => { try { playClickSound(); } catch (e) {} setViewMode("debugger"); }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "debugger"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FaCode className="text-[10px]" /> Memory Debugger
            </button>
          </div>

          <button
            onClick={handlePlayPause}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer ${
              isPlaying
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isPlaying ? <><FaPause className="text-[10px]" /> Pause</> : <><FaPlay className="text-[10px]" /> Play Engine</>}
          </button>

          <button
            onClick={handleStepNext}
            disabled={currentStepIdx >= selectedAlgo.steps.length - 1}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-indigo-50 dark:hover:bg-slate-700 disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FaStepForward className="text-[10px]" /> Step Next
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FaRedo className="text-[10px]" /> Reset
          </button>

          <button
            onClick={() => { try { playClickSound(); } catch (e) {} setSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1)); }}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold border border-slate-200/80 dark:border-slate-700/80 cursor-pointer"
          >
            {speed}x Speed
          </button>

        </div>
      </div>

      {/* Algorithm Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => handleSelectAlgo(algo)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              selectedAlgo.id === algo.id
                ? "bg-indigo-600 text-white shadow-2xs font-bold scale-102"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
            }`}
          >
            {algo.icon} <span>{algo.title}</span>
          </button>
        ))}
      </div>

      {/* Sample Inputs Bar */}
      <div className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 mb-6 flex flex-wrap items-center gap-2 text-xs font-mono relative z-10">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">TEST INPUTS:</span>
        {selectedAlgo.sampleInputs.map((inputPair, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectInput(inputPair)}
            className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
              selectedInputPair.label === inputPair.label
                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-800"
            }`}
          >
            {inputPair.label} ({inputPair.input1})
          </button>
        ))}
      </div>

      {/* Full-Stage Immersive Visual Studio (min-h-[460px]) */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-800/90 text-white shadow-2xl relative z-10 space-y-6">
        
        {/* Top Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-bold border border-indigo-800 uppercase text-[10px]">
              {selectedAlgo.badge}
            </span>
            <span className="text-slate-300 font-semibold">{selectedAlgo.subtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className={`w-2 h-2 rounded-full bg-emerald-500 ${isPlaying ? "animate-ping" : ""}`} />
              STATUS: {isPlaying ? "RUNNING" : currentStepIdx >= selectedAlgo.steps.length - 1 ? "COMPLETED" : "READY"}
            </span>
            <span className="text-indigo-400 font-bold">
              STEP {currentStepIdx + 1} / {selectedAlgo.steps.length}
            </span>
          </div>
        </div>

        {/* View Mode 1: Full-Stage Graphical Canvas */}
        {viewMode === "canvas" ? (
          <div className="min-h-[300px] flex flex-col justify-between space-y-6">
            
            {/* Algorithm 1: Cosine Similarity Graphical Coordinate Plane */}
            {selectedAlgo.id === "cosine" && (
              <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">MATH FORMULA</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                      Cos(θ) = (V₁ • V₂) / (||V₁|| ||V₂||) = <span className="text-purple-600 dark:text-purple-400 font-bold">0.892</span>
                    </h4>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-purple-700 dark:text-purple-300 font-bold">
                    Match Confidence: {selectedInputPair.expectedScore || "89.2%"}
                  </div>
                </div>

                {/* 2D Vector Plane SVG Graph */}
                <div className="relative h-48 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 400 160">
                    {/* Grid Lines */}
                    <line x1="40" y1="130" x2="360" y2="130" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="40" y1="20" x2="40" y2="130" stroke="#CBD5E1" strokeWidth="1.5" />

                    {/* Vector 1 (Indigo) */}
                    <line x1="40" y1="130" x2="280" y2="40" stroke="#4F46E5" strokeWidth="3" strokeDasharray="4 2" />
                    <circle cx="280" cy="40" r="5" fill="#4F46E5" />
                    <text x="290" y="38" fill="#4F46E5" fontSize="11" fontFamily="monospace" fontWeight="bold">Vector A [0.82, 0.45]</text>

                    {/* Vector 2 (Cyan) */}
                    <line x1="40" y1="130" x2="260" y2="55" stroke="#0284C7" strokeWidth="3" strokeDasharray="4 2" />
                    <circle cx="260" cy="55" r="5" fill="#0284C7" />
                    <text x="270" y="70" fill="#0284C7" fontSize="11" fontFamily="monospace" fontWeight="bold">Vector B [0.79, 0.48]</text>

                    {/* Angle Arc */}
                    <path d="M 90 110 A 50 50 0 0 0 95 102" fill="none" stroke="#7C3AED" strokeWidth="2" />
                    <text x="105" y="105" fill="#7C3AED" fontSize="10" fontFamily="monospace">θ = 26.8°</text>
                  </svg>
                </div>

                {/* Vector Match Score Progress Fill */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">TF-IDF Match Score</span>
                    <span className="text-purple-400 font-bold">{selectedInputPair.expectedScore || "89.2%"} Match</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedInputPair.expectedScore || "89.2%"}` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* Algorithm 2: C Hash Table Memory Grid Canvas */}
            {selectedAlgo.id === "hashing" && (
              <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">KEY DIGEST CALCULATOR</span>
                    <h4 className="text-sm font-bold text-white font-mono mt-0.5">
                      DJB2 Digest: <span className="text-amber-400 font-bold">SHA-256("{selectedInputPair.input1}") → 0x7f4a9b</span>
                    </h4>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 font-bold">
                    Target Bucket: Slot #47
                  </div>
                </div>

                {/* 64-Bucket Memory Allocation Grid */}
                <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 pt-2">
                  {Array.from({ length: 32 }).map((_, idx) => {
                    const isTarget = idx === 11;
                    return (
                      <div
                        key={idx}
                        className={`h-9 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                          isTarget
                            ? "bg-amber-500 text-slate-950 ring-2 ring-amber-300 scale-110 shadow-lg shadow-amber-500/50"
                            : "bg-slate-950 border border-slate-800 text-slate-600"
                        }`}
                      >
                        #{idx * 2}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                  <span>Linear Probe Collision Check: <strong className="text-emerald-400">0 Collisions</strong></span>
                  <span className="text-slate-500">Heap Offset: 0x00A4F</span>
                </div>

              </div>
            )}

            {/* Algorithm 3: SSE Stream 3-Node Architecture Canvas */}
            {selectedAlgo.id === "sse_stream" && (
              <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">REAL-TIME SSE CHANNEL</span>
                    <h4 className="text-sm font-bold text-white font-mono mt-0.5 flex items-center gap-2">
                      <FaBolt className="text-amber-400 text-xs" /> Streaming Event Pipe: <span className="text-emerald-400 font-bold">12ms Latency</span>
                    </h4>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 font-bold">
                    Bandwidth: 1.4 kB/s
                  </div>
                </div>

                {/* 3-Node Architecture Transmission Pipeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs font-mono">
                  {/* Node 1: Server */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                      <FaServer />
                    </div>
                    <span className="font-bold text-white block">Node.js Server</span>
                    <span className="text-[10px] text-slate-400">Event Emitter</span>
                  </div>

                  {/* Node 2: Stream Socket */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-center">
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden relative border border-slate-800">
                      <motion.div
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-full rounded-full bg-emerald-400 shadow-md shadow-emerald-400/80"
                      />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold mt-2">HTTP text/event-stream</span>
                  </div>

                  {/* Node 3: React Client */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center mx-auto">
                      <FaLaptopCode />
                    </div>
                    <span className="font-bold text-white block">React Client UI</span>
                    <span className="text-[10px] text-slate-400">State Listener</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        ) : (
          
          /* View Mode 2: Code & Live Memory Debugger */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[300px]">
            {/* Left Sub-Panel: Source Code Line Inspector (7 Cols) */}
            <div className="lg:col-span-7 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                  <FaCode className="text-indigo-400" /> SOURCE CODE EXECUTION
                </span>
                <span>LINE {activeStep.activeLine + 1} HIGHLIGHTED</span>
              </div>

              <div className="space-y-1.5">
                {selectedAlgo.code.map((line, lineIdx) => {
                  const isActive = lineIdx === activeStep.activeLine;
                  return (
                    <div
                      key={lineIdx}
                      className={`px-3 py-1.5 rounded transition-colors flex items-center gap-3 ${
                        isActive
                          ? "bg-indigo-600/40 text-indigo-100 border-l-4 border-indigo-400 font-bold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-slate-600 text-[10px] select-none w-4">{lineIdx + 1}</span>
                      <code>{line}</code>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Sub-Panel: Live Memory Variable Inspector (5 Cols) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="pb-2 border-b border-slate-800 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                LIVE MEMORY VARIABLES
              </div>

              <div className="space-y-2">
                {selectedAlgo.variables.map((varItem, vIdx) => (
                  <div key={vIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-bold block">{varItem.name}</span>
                      <span className="text-[9px] text-slate-500 uppercase">{varItem.type}</span>
                    </div>
                    <span className="text-indigo-300 font-bold font-mono">{varItem.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        )}

        {/* Active Step Details Bar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
          <div>
            <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">CURRENT STEP EXECUTION</span>
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
              <FaCheckCircle className="text-emerald-400 text-xs" /> {activeStep.name}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">{activeStep.detail}</p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800 font-bold shrink-0 text-center">
            {activeStep.metric}
          </span>
        </div>

      </div>

    </div>
  );
};

export default AlgorithmSimulator;
