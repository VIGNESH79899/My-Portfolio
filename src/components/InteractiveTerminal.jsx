import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal, FaPlay, FaTrashAlt, FaCode, FaCheck, FaCopy } from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [activeViewTab, setActiveViewTab] = useState('cli');
  const [copied, setCopied] = useState(false);
  const [activeCodeFile, setActiveCodeFile] = useState('workverse.ts');
  const terminalEndRef = useRef(null);

  const [history, setHistory] = useState([
    { cmd: 'whoami', output: '⚡ ADHI VIGNESH\nFull-Stack Developer & AI/ML Engineer | Aurora University (2024–2028)\nBuilt production SaaS @ Sashverse Tech & AI recommendation tools.' }
  ]);

  const commands = {
    whoami: '⚡ ADHI VIGNESH\n• Role: Full-Stack Developer & AI/ML Engineer\n• Education: B.Tech CSE (AI & ML) @ Aurora University (2024–2028)\n• Location: Hyderabad, India\n• Focus: Production SaaS, REST APIs, SSE Streams & ML Systems',
    skills: '🚀 TECHNICAL STACK:\n• Frontend: React.js, Tailwind CSS, HTML5/CSS3, JavaScript\n• Backend: Node.js, Express.js, Koa.js, REST APIs, SSE Streams, JWT Auth\n• AI / ML: Python, Scikit-Learn, Pandas, TF-IDF Vectorization, Cosine Similarity\n• Databases: PostgreSQL, MongoDB, MySQL, Sequelize ORM\n• Systems: C Language, Hash Tables, Linear Algebra Image Compression',
    experience: '💼 WORK EXPERIENCE:\n1. Sashverse Technologies (Apr–Jun 2026) | Full-Stack Developer Intern\n   - Workverse SaaS platform: Node.js, Express, Koa, PostgreSQL, Sequelize\n   - SSE Real-Time event stream & user messaging\n   - JWT Auth & Role-Based Security (RBAC)\n\n2. StaxTech (May–Jun 2025) | Web Development Intern\n   - Responsive E-Commerce & Portfolio web applications\n\n[Navigating to Experience section...]',
    projects: '🛠️ FEATURED PROJECTS:\n1. AI Assessment Maker (React, Node, MongoDB, AI DOCX Gen)\n2. Movie Recommendation System (Python ML, TF-IDF, Cosine Similarity)\n3. Workverse Real-Time SaaS (Node, Express, PostgreSQL, SSE Stream)\n4. Chandeshwara Enterprises (TypeScript & MongoDB Freelance Client E-Commerce)\n\n[Navigating to Projects section...]',
    contact: '📬 CONTACT INFORMATION:\n• Email: vigneshadhi773@gmail.com\n• Phone: +91 79899 49808\n• GitHub: https://github.com/VIGNESH79899\n• LinkedIn: https://linkedin.com/in/adhi-vignesh-342431289\n• Location: Hyderabad, India\n\n[Navigating to Contact section...]',
    resume: '📄 RESUME:\nAdhi_Vignesh_Resume.pdf (Downloading PDF...)'
  };

  const codeSnippets = {
    "workverse.ts": `// Sashverse Technologies - Workverse Real-Time SSE Router
import { Router } from "express";
import { authenticateJWT, checkRole } from "../middleware/auth";
import { sendSSEUpdate } from "../services/sseService";

export const taskRouter = Router();

taskRouter.post("/assign", authenticateJWT, checkRole(["ADMIN", "MENTOR"]), async (req, res) => {
  const { taskId, assigneeId } = req.body;
  const updatedTask = await TaskService.assign(taskId, assigneeId);
  
  // Real-Time Server-Sent Event Broadcast
  sendSSEUpdate(assigneeId, { 
    type: "TASK_ASSIGNED", 
    timestamp: new Date().toISOString(),
    task: updatedTask 
  });

  return res.status(200).json({ success: true, data: updatedTask });
});`,

    "ai_recommendation.py": `# Movie Recommendation Engine - TF-IDF & Cosine Similarity
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationEngine:
    def __init__(self, metadata_df):
        self.df = metadata_df
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df['combined_features'])

    def recommend(self, title, top_n=5):
        idx = self.df[self.df['title'] == title].index[0]
        sim_scores = list(enumerate(cosine_similarity(self.tfidf_matrix[idx], self.tfidf_matrix)[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:top_n+1]
        return self.df.iloc[[i[0] for i in sim_scores]][['title', 'category']]`
  };

  useEffect(() => {
    if (terminalEndRef.current && history.length > 1) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [history]);

  const handleRunCommand = (cmdKey) => {
    try { playClickSound(); } catch (e) {}

    if (cmdKey === 'clear') {
      setHistory([]);
      return;
    }

    const outputText = commands[cmdKey] || `Command not found: '${cmdKey}'. Available: whoami, skills, experience, projects, contact, resume, clear`;
    
    setHistory((prev) => [...prev, { cmd: cmdKey, output: outputText }]);

    if (cmdKey === 'experience' || cmdKey === 'projects' || cmdKey === 'skills' || cmdKey === 'contact') {
      setTimeout(() => {
        const el = document.getElementById(cmdKey);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    } else if (cmdKey === 'resume') {
      const link = document.createElement('a');
      link.href = '/Adhi_Vignesh_Resume.pdf';
      link.download = 'Adhi_Vignesh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;
    handleRunCommand(trimmed);
    setInput('');
  };

  const handleCopySnippet = (snippetText) => {
    try { playSuccessSound(); } catch (e) {}
    navigator.clipboard.writeText(snippetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-mono rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden flex flex-col min-h-[330px] max-h-[360px]">
      
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100/90 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="ml-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-mono">
            <FaTerminal className="text-indigo-600 dark:text-indigo-400 text-[10px]" /> adhi-vignesh@workstation:~
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex bg-slate-200/70 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/60 dark:border-slate-800 text-[10px]">
          <button
            onClick={() => { playClickSound(); setActiveViewTab('cli'); }}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              activeViewTab === 'cli' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            CLI Terminal
          </button>
          <button
            onClick={() => { playClickSound(); setActiveViewTab('code'); }}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
              activeViewTab === 'code' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Code
          </button>
        </div>
      </div>

      {activeViewTab === 'cli' ? (
        <div className="p-4 flex flex-col flex-1 overflow-hidden justify-between bg-slate-50/60 dark:bg-slate-900/50">
          
          {/* Quick Shortcut Buttons */}
          <div className="flex flex-wrap gap-1.5 mb-3 shrink-0">
            {['whoami', 'skills', 'experience', 'projects', 'contact', 'resume'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleRunCommand(cmd)}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-[10px] text-indigo-700 dark:text-indigo-300 font-semibold transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
              >
                <FaPlay className="text-[7px] opacity-70" /> ${cmd}
              </button>
            ))}
            <button
              onClick={() => handleRunCommand('clear')}
              className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-[10px] text-slate-500 hover:text-white transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
            >
              <FaTrashAlt className="text-[7px]" /> clear
            </button>
          </div>

          {/* History Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pr-1 custom-scrollbar">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1 bg-white dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xs">
                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400">➜</span>
                  <span>{item.cmd}</span>
                </div>
                <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed">
                  {item.output}
                </pre>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80 text-xs shrink-0 mt-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">➜</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command (e.g. whoami, projects, skills)..."
              className="w-full bg-transparent text-slate-900 dark:text-white font-mono focus:outline-none placeholder-slate-400 text-xs font-medium"
            />
          </form>
        </div>
      ) : (
        /* Code Inspector View */
        <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-50/60 dark:bg-slate-900/50">
          <div className="flex gap-2">
            {Object.keys(codeSnippets).map((filename) => (
              <button
                key={filename}
                onClick={() => { playClickSound(); setActiveCodeFile(filename); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                  activeCodeFile === filename
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filename}
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3.5 relative shadow-2xs">
            <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-slate-200/80 dark:border-slate-800 text-[11px]">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <FaCode /> {activeCodeFile}
              </span>
              <button
                onClick={() => handleCopySnippet(codeSnippets[activeCodeFile])}
                className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold"
              >
                {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />} {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="text-[11px] leading-relaxed text-slate-800 dark:text-emerald-400 overflow-x-auto p-1 font-mono">
              {codeSnippets[activeCodeFile]}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveTerminal;
