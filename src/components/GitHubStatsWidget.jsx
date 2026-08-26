import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaTerminal, FaCheckCircle, FaFire, FaBolt, FaLayerGroup } from 'react-icons/fa';
import CountUp from './CountUp';

const GitHubStatsWidget = () => {
  const topLanguages = [
    { name: "JavaScript / TypeScript", pct: 40, color: "bg-amber-400" },
    { name: "Python (AI/ML)", pct: 30, color: "bg-sky-400" },
    { name: "C & Systems", pct: 18, color: "bg-indigo-400" },
    { name: "HTML / CSS / PHP", pct: 12, color: "bg-emerald-400" }
  ];

  const commitBlocks = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    level: (i % 5 === 0) ? 3 : (i % 3 === 0) ? 2 : (i % 2 === 0) ? 1 : 0
  }));

  return (
    <div className="bento-card p-6 md:p-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 my-12 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="pro-badge-indigo mb-2 inline-block">
            DEVELOPER METRICS & GITHUB
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaGithub className="text-indigo-600 dark:text-indigo-400" /> Engineering Activity & Code Distribution
          </h3>
        </div>

        <a
          href="https://github.com/VIGNESH79899"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm shrink-0 hover:scale-105"
        >
          <FaGithub className="text-sm" /> Follow @VIGNESH79899
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Languages Breakdown (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FaLayerGroup className="text-indigo-500" /> Language Distribution
            </span>
            <span className="text-xs font-mono text-slate-400">100% Verified Code</span>
          </div>

          {/* Stacked Progress Line Bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 flex overflow-hidden p-0.5">
            {topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{ width: `${lang.pct}%` }}
                className={`h-full ${lang.color} transition-all duration-500`}
                title={`${lang.name}: ${lang.pct}%`}
              />
            ))}
          </div>

          {/* Languages Grid Chips */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {topLanguages.map((lang, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                  <span className="text-slate-700 dark:text-slate-200">{lang.name}</span>
                </div>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{lang.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Commit Heatmap Grid & System Specs (6 Cols) */}
        <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-slate-950 text-white font-mono border border-slate-800">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="text-indigo-400 font-bold flex items-center gap-1.5">
              <FaFire className="text-amber-400" /> Recent GitHub Contributions
            </span>
            <span className="text-emerald-400 text-[10px]">Active Streak</span>
          </div>

          {/* Commit Heatmap Tiles */}
          <div className="grid grid-cols-7 gap-2 py-2">
            {commitBlocks.map((block) => {
              const bg = 
                block.level === 3 ? "bg-indigo-500" :
                block.level === 2 ? "bg-indigo-600/80" :
                block.level === 1 ? "bg-indigo-900/60" : "bg-slate-800/60";
              return (
                <motion.div
                  key={block.id}
                  whileHover={{ scale: 1.2 }}
                  className={`h-6 rounded-md ${bg} transition-colors border border-slate-800`}
                />
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <FaCheckCircle /> 450+ Total Commits Built
            </span>
            <span className="text-slate-400 font-mono">VS Code & Git</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default GitHubStatsWidget;
