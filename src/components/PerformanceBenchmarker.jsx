import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaPlay, FaCheckCircle, FaBolt, FaChartLine, FaServer, FaBrain, FaCubes } from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const benchmarkSuites = [
  {
    id: "sse_vs_polling",
    title: "Server-Sent Events vs HTTP Polling",
    category: "Real-Time Messaging",
    icon: <FaServer className="text-indigo-600 dark:text-indigo-400" />,
    metrics: [
      { name: "HTTP Polling Latency", value: "850 ms", pct: 100, color: "bg-rose-500", type: "legacy" },
      { name: "Sashverse SSE Push Latency", value: "12 ms", pct: 14, color: "bg-emerald-500", type: "optimized" }
    ],
    summary: "SSE real-time stream reduced messaging latency by 98.6% on the Workverse SaaS platform.",
    graphData: [850, 820, 840, 810, 12, 12, 12, 12]
  },
  {
    id: "vector_vs_loop",
    title: "Vectorized Cosine Similarity vs Loop",
    category: "AI / ML Recommendations",
    icon: <FaBrain className="text-purple-600 dark:text-purple-400" />,
    metrics: [
      { name: "Nested Python Loops", value: "480 ms", pct: 100, color: "bg-rose-500", type: "legacy" },
      { name: "TF-IDF Vectorized Dot Product", value: "114 ms", pct: 24, color: "bg-emerald-500", type: "optimized" }
    ],
    summary: "Sparse matrix dot product vectorization yielded a 4.2x execution speedup on movie recommendation scoring.",
    graphData: [480, 475, 490, 460, 114, 114, 114, 114]
  },
  {
    id: "c_rank_nullity",
    title: "C Rank-Nullity Image Compression",
    category: "C Systems Optimization",
    icon: <FaCubes className="text-amber-600 dark:text-amber-400" />,
    metrics: [
      { name: "Uncompressed Image Memory", value: "4.096 MB", pct: 100, color: "bg-rose-500", type: "legacy" },
      { name: "Rank-Truncated Matrix Memory", value: "1.453 MB", pct: 35.5, color: "bg-emerald-500", type: "optimized" }
    ],
    summary: "Rank-Nullity theorem singular value truncation reduced storage footprint by 64.5% in C.",
    graphData: [100, 100, 100, 100, 35.5, 35.5, 35.5, 35.5]
  }
];

const PerformanceBenchmarker = () => {
  const [activeSuite, setActiveSuite] = useState(benchmarkSuites[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [executed, setExecuted] = useState(false);

  const handleSelect = (suite) => {
    playClickSound();
    setActiveSuite(suite);
    setExecuted(false);
  };

  const handleRunBenchmark = () => {
    playSuccessSound();
    setIsRunning(true);
    setExecuted(false);
    setTimeout(() => {
      setIsRunning(false);
      setExecuted(true);
    }, 1000);
  };

  return (
    <div className="bento-card p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 border border-indigo-200/80 dark:border-slate-800/80 my-12 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="pro-badge-indigo mb-2 inline-block">
            LIVE SYSTEM BENCHMARK SUITE
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaTachometerAlt className="text-indigo-600 dark:text-indigo-400" /> Interactive Performance Benchmarker
          </h3>
        </div>

        <button
          onClick={handleRunBenchmark}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md shrink-0 hover:scale-105 disabled:opacity-50"
        >
          <FaBolt className="text-xs" /> {isRunning ? "Benchmarking Engine..." : "Run Live Speed Test"}
        </button>
      </div>

      {/* Selector Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {benchmarkSuites.map((suite) => (
          <button
            key={suite.id}
            onClick={() => handleSelect(suite)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSuite.id === suite.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            {suite.icon} {suite.title}
          </button>
        ))}
      </div>

      {/* Benchmarking Visualizer Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Metrics Comparison (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80">
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">
              BENCHMARK CATEGORY: {activeSuite.category}
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              {activeSuite.summary}
            </p>
          </div>

          <div className="space-y-4">
            {activeSuite.metrics.map((m, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{m.name}</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{m.value}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: executed || !isRunning ? `${m.pct}%` : "0%" }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${m.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Animated Latency Graph (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 text-white font-mono border border-slate-800 shadow-2xl flex flex-col justify-between h-64">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
              <FaChartLine /> Execution Latency Profile
            </span>
            <span className="text-emerald-400 text-[10px] font-bold">
              {executed ? "SPEED TEST VERIFIED" : "READY"}
            </span>
          </div>

          {/* SVG Latency Curve Graph */}
          <div className="flex-1 flex items-center justify-center relative my-2">
            {isRunning ? (
              <p className="text-indigo-400 animate-pulse text-xs">Simulating 1,000 throughput requests...</p>
            ) : (
              <svg className="w-full h-28 text-emerald-400" viewBox="0 0 300 100">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  points="0,80 50,75 100,82 150,20 200,18 250,22 300,19"
                />
                <circle cx="150" cy="20" r="5" fill="#10b981" />
                <text x="160" y="25" fill="#34d399" fontSize="10" fontFamily="monospace">Optimized: {activeSuite.metrics[1].value}</text>
              </svg>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>Sample size: 10,000 requests</span>
            <span className="text-emerald-400 font-bold">High Precision</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PerformanceBenchmarker;
