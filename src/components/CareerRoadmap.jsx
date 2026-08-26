import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCode, FaCheckCircle, FaStar, FaAward, FaCalendarAlt } from 'react-icons/fa';
import { playClickSound } from '../utils/sound';

const roadmapYears = [
  {
    year: "2024",
    title: "Foundation & Aurora University Enrollment",
    badge: "Academic Entry",
    icon: <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" />,
    summary: "Enrolled in B.Tech CSE (AI & ML) at Aurora University, Hyderabad. Mastered C programming, Data Structures, and Core Math foundations.",
    skillsUnlocked: ["C Language", "Data Structures", "Linear Algebra", "HTML5 & CSS3"],
    highlights: ["Class XII (MPC) Graduated with 86.1%", "Started CS Fundamentals & Algorithm Logic"]
  },
  {
    year: "2025",
    title: "StaxTech Internship & Full-Stack Expansion",
    badge: "Web Internship",
    icon: <FaBriefcase className="text-purple-600 dark:text-purple-400" />,
    summary: "Completed Web Development Internship at StaxTech. Engineered responsive e-commerce platforms and digital branding websites.",
    skillsUnlocked: ["JavaScript (ES6+)", "React.js", "Tailwind CSS", "MySQL", "PHP"],
    highlights: ["Built online Luxury Watch Store with checkout workflow", "Created personal digital portfolio"]
  },
  {
    year: "2026",
    title: "Sashverse Technologies Production SaaS Internship",
    badge: "Production SaaS Intern",
    icon: <FaCode className="text-emerald-600 dark:text-emerald-400" />,
    summary: "Full Stack Internship on Workverse SaaS platform. Built REST APIs, SSE real-time messaging, Sequelize ORM, and JWT role-based security.",
    skillsUnlocked: ["Node.js", "Express.js", "Koa.js", "PostgreSQL", "SSE Real-Time", "JWT Auth", "Sequelize ORM"],
    highlights: ["Engineered sub-15ms real-time event stream", "Built database-backed referral & rewards engine"]
  },
  {
    year: "2027",
    title: "AI & Machine Learning Production Deployments",
    badge: "Specialization",
    icon: <FaStar className="text-amber-600 dark:text-amber-400" />,
    summary: "Focusing on advanced TF-IDF vectorization, recommendation algorithms, automated AI DOCX generation tools, and cloud microservices.",
    skillsUnlocked: ["Python", "Scikit-Learn", "Pandas", "TF-IDF Vectorizer", "Cosine Similarity", "MongoDB Atlas"],
    highlights: ["Built AI Assessment Maker with DOCX generation", "Developed content-based Movie Recommendation engine"]
  },
  {
    year: "2028",
    title: "B.Tech Graduation & Industry Full-Stack / AI Role",
    badge: "Target Degree",
    icon: <FaAward className="text-sky-600 dark:text-sky-400" />,
    summary: "Graduating B.Tech CSE (AI & ML) from Aurora University. Ready for full-time Full-Stack SaaS & AI/ML Software Engineering roles.",
    skillsUnlocked: ["Full-Stack SaaS Architecture", "Production Microservices", "AI/ML Engineering"],
    highlights: ["Targeting Full-Stack Developer & AI Engineer positions", "Open for remote and on-site opportunities"]
  }
];

const CareerRoadmap = () => {
  const [activeYearIndex, setActiveYearIndex] = useState(2); // default 2026

  const activeRoadmap = roadmapYears[activeYearIndex];

  const handleSelectYear = (idx) => {
    playClickSound();
    setActiveYearIndex(idx);
  };

  return (
    <div className="bento-card p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 border border-indigo-200/80 dark:border-slate-800/80 my-12 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <span className="pro-badge-indigo mb-2 inline-block">
            ACADEMIC & CAREER ROADMAP
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaGraduationCap className="text-indigo-600 dark:text-indigo-400" /> Interactive 2024–2028 Journey Timeline
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Aurora University (2024–2028)</span>
      </div>

      {/* Year Slider Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
        {roadmapYears.map((item, idx) => {
          const isSelected = activeYearIndex === idx;
          return (
            <button
              key={item.year}
              onClick={() => handleSelectYear(idx)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              <FaCalendarAlt className="text-xs" /> {item.year}
            </button>
          );
        })}
      </div>

      {/* Active Roadmap Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoadmap.year}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-2xl">
                {activeRoadmap.icon}
              </div>
              <div>
                <span className="pro-badge-indigo text-[10px] mb-1 inline-block">{activeRoadmap.badge}</span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{activeRoadmap.title}</h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {activeRoadmap.summary}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Key Milestones:</span>
              <ul className="space-y-1.5">
                {activeRoadmap.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <FaCheckCircle className="text-indigo-600 dark:text-indigo-400 text-xs shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Unlocked Skills Pill Card (5 Cols) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block border-b border-slate-200/60 dark:border-slate-800 pb-2">
              ⚡ Skills & Tech Unlocked in {activeRoadmap.year}:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeRoadmap.skillsUnlocked.map((s, idx) => (
                <span key={idx} className="pro-badge-indigo text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default CareerRoadmap;
