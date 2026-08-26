import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaFolder, FaFileCode, FaPlay, FaCheckCircle, FaTerminal, FaCopy, FaCheck } from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const ideFiles = [
  {
    name: "workverse_server.js",
    lang: "javascript",
    badge: "Express / SSE",
    code: `// Sashverse Technologies - Workverse SaaS Real-Time SSE Engine
const express = require('express');
const { sendSSEEvent } = require('./sseBroadcaster');
const app = express();

app.post('/api/v1/tasks/assign', async (req, res) => {
  const { taskId, assigneeId } = req.body;
  const task = await db.Task.updateStatus(taskId, 'ASSIGNED', assigneeId);

  // Broadcast real-time SSE notification
  sendSSEEvent(assigneeId, {
    type: 'TASK_ASSIGNED',
    timestamp: new Date().toISOString(),
    task
  });

  res.json({ success: true, task });
});`,
    stdout: `[INFO] Server running on port 5000...
[SSE] Real-Time Event Listener Established (Client ID: #8921)
[POST /api/v1/tasks/assign] HTTP 200 OK (Latency: 14ms)
[EVENT] TASK_ASSIGNED broadcast to user: DEV-07 (Adhi Vignesh)`
  },
  {
    name: "recommendation_engine.py",
    lang: "python",
    badge: "Scikit-Learn ML",
    code: `# Movie Recommendation Pipeline - TF-IDF & Cosine Similarity
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def build_recommendation_matrix(movies_df):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(movies_df['features'])
    
    # Compute Cosine Similarity Dot Product Matrix
    similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)
    return similarity

print("Recommendation Engine initialized successfully.")`,
    stdout: `[PYTHON 3.10] Loading Pandas & Scikit-Learn...
[TF-IDF] Vectorized 5,000 document features into sparse matrix.
[COSINE SIMILARITY] Matrix computed in 0.042s
[RESULT] Top Recommendations for "Interstellar":
  1. Inception (Sim: 0.892)
  2. The Martian (Sim: 0.845)
  3. Arrival (Sim: 0.812)`
  },
  {
    name: "image_compressor.c",
    lang: "c",
    badge: "C Systems / Linear Algebra",
    code: `// C Language - Image Compression via Rank-Nullity Theorem
#include <stdio.h>
#include <stdlib.h>

void compress_image_matrix(float** matrix, int rows, int cols, int rank_k) {
    printf("[C ENGINE] Truncating Singular Values to Rank %d...\\n", rank_k);
    // Linear Algebra Rank Reduction
    printf("[C ENGINE] Storage footprint reduced by 64.5%%\\n");
}

int main() {
    compress_image_matrix(NULL, 1024, 1024, 64);
    return 0;
}`,
    stdout: `[GCC 11.2] Compiling image_compressor.c -O3...
[EXECUTE ./image_compressor]
[C ENGINE] Truncating Singular Values to Rank 64...
[C ENGINE] Storage footprint reduced by 64.5%
[STATUS] Image compression completed with 0 errors.`
  }
];

const InteractiveIDE = () => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showStdout, setShowStdout] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeFile = ideFiles[activeFileIndex];

  const handleSelectFile = (index) => {
    playClickSound();
    setActiveFileIndex(index);
    setShowStdout(false);
  };

  const handleRunCode = () => {
    playSuccessSound();
    setIsExecuting(true);
    setShowStdout(false);
    setTimeout(() => {
      setIsExecuting(false);
      setShowStdout(true);
    }, 800);
  };

  const handleCopyCode = () => {
    playSuccessSound();
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bento-card p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 border border-indigo-200/80 dark:border-slate-800/80 my-12 shadow-2xl overflow-hidden">
      
      {/* Top IDE Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="pro-badge-indigo mb-2 inline-block">
            INTERACTIVE VS CODE IDE
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaCode className="text-indigo-600 dark:text-indigo-400" /> Production Workspace Code Inspector
          </h3>
        </div>

        <button
          onClick={handleRunCode}
          disabled={isExecuting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 shrink-0 hover:scale-105"
        >
          <FaPlay className="text-[10px]" /> {isExecuting ? "Executing Code..." : "Run Code Snippet"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Sidebar: File Tree Explorer (4 Cols) */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-500 font-bold uppercase text-[10px] tracking-wider pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <span className="flex items-center gap-1.5"><FaFolder className="text-amber-500" /> EXPLORER: PORTFOLIO-SRC</span>
            <span>3 Files</span>
          </div>

          <div className="space-y-1.5">
            {ideFiles.map((file, idx) => {
              const isSelected = activeFileIndex === idx;
              return (
                <button
                  key={file.name}
                  onClick={() => handleSelectFile(idx)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white font-bold shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FaFileCode className={isSelected ? "text-white" : "text-indigo-500"} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${isSelected ? "bg-indigo-700 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                    {file.lang}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Editor & Output Pane (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono text-xs border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
          
          {/* File Tab Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <FaFileCode /> {activeFile.name}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="text-[11px] text-slate-600 dark:text-slate-400 hover:text-indigo-600 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-800 hover:bg-slate-200 transition-colors font-semibold"
            >
              {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />} {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Code Editor Block with Line Numbers */}
          <div className="p-4 overflow-x-auto max-h-72 leading-relaxed text-slate-800 dark:text-emerald-400 font-mono text-[11px] bg-slate-50/70 dark:bg-slate-950/60">
            <pre>
              <code>{activeFile.code}</code>
            </pre>
          </div>

          {/* Terminal STDOUT Live Output Bar */}
          <div className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950 p-4 font-mono text-[11px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <FaTerminal /> CONSOLE STDOUT TERMINAL
              </span>
              <span>UTF-8</span>
            </div>

            {isExecuting ? (
              <p className="text-amber-400 animate-pulse italic">Compiling and executing runtime environment...</p>
            ) : showStdout ? (
              <motion.pre
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-slate-200 whitespace-pre-wrap leading-relaxed text-[10px]"
              >
                <code>{activeFile.stdout}</code>
              </motion.pre>
            ) : (
              <p className="text-slate-500 text-[10px]">Click "Run Code Snippet" above to simulate live terminal output...</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default InteractiveIDE;
