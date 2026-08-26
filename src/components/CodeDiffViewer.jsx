import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaCheck, FaCopy, FaExchangeAlt, FaBolt } from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const diffs = [
  {
    id: "sse",
    title: "Sashverse SSE Real-Time Messaging",
    benefit: "Reduced Messaging Latency from 850ms to 12ms",
    oldCode: `// Old Polling Architecture (High Latency)
setInterval(async () => {
  const updates = await db.query("SELECT * FROM messages WHERE user_id = $1", [userId]);
  renderMessages(updates);
}, 3000);`,
    newCode: `// New Real-Time SSE Stream (Sub-15ms Push)
const eventSource = new EventSource("/api/v1/sse/stream");
eventSource.addEventListener("NEW_MESSAGE", (e) => {
  const message = JSON.parse(e.data);
  appendLiveMessage(message);
});`
  },
  {
    id: "tfidf",
    title: "AI Recommendation Vectorizer",
    benefit: "Vector Similarity Speedup 4.2x",
    oldCode: `# Naive Nested Loop Matrix Comparison
for doc1 in corpus:
    for doc2 in corpus:
        similarity = compute_cosine(doc1, doc2)`,
    newCode: `# Vectorized Sparse Matrix Dot Product
from sklearn.feature_extraction.text import TfidfVectorizer
matrix = TfidfVectorizer().fit_transform(corpus)
similarities = (matrix * matrix.T).toarray()`
  }
];

const CodeDiffViewer = () => {
  const [activeDiff, setActiveDiff] = useState(diffs[0]);
  const [copied, setCopied] = useState(false);

  const handleSelect = (diff) => {
    playClickSound();
    setActiveDiff(diff);
  };

  const handleCopy = () => {
    playSuccessSound();
    navigator.clipboard.writeText(activeDiff.newCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pro-card p-6 md:p-8 border border-slate-200/80 dark:border-slate-800/80 my-12 bg-white dark:bg-slate-900 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="pro-badge-indigo mb-2 inline-block">
            ENGINEERING OPTIMIZATION
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaBolt className="text-amber-500" /> Interactive Code Architecture Diffs
          </h3>
        </div>

        <div className="flex gap-2">
          {diffs.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelect(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeDiff.id === d.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Benefit Highlight Badge */}
      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <FaCheck className="text-xs" /> {activeDiff.benefit}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 flex items-center gap-1 font-mono"
        >
          {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />} {copied ? "Copied" : "Copy Optimized Code"}
        </button>
      </div>

      {/* Dual Code Columns (Before vs After) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        
        {/* Old Legacy Code */}
        <div className="rounded-xl bg-slate-950 border border-rose-900/50 p-4">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-2">
            ❌ Before Optimization
          </span>
          <pre className="text-[11px] leading-relaxed text-rose-300/90 overflow-x-auto">
            <code>{activeDiff.oldCode}</code>
          </pre>
        </div>

        {/* New Optimized Code */}
        <div className="rounded-xl bg-slate-950 border border-emerald-900/50 p-4">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            ⚡ Optimized Implementation
          </span>
          <pre className="text-[11px] leading-relaxed text-emerald-300 overflow-x-auto">
            <code>{activeDiff.newCode}</code>
          </pre>
        </div>

      </div>

    </div>
  );
};

export default CodeDiffViewer;
