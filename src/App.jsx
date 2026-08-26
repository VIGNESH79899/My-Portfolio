import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import HeroPlayground from "./components/HeroPlayground";
import About from "./components/About";
import Skills from "./components/Skills";
import AlgorithmSimulator from "./components/AlgorithmSimulator";
import Experience from "./components/Experience";
import ArchitectureVisualizer from "./components/ArchitectureVisualizer";
import Projects from "./components/Projects";
import GitHubStatsWidget from "./components/GitHubStatsWidget";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import SocialSidebar from "./components/SocialSidebar";
import BackToTop from "./components/BackToTop";
import CmdKModal from "./components/CmdKModal";
import ThreeMeshCanvas from "./components/ThreeMeshCanvas";
import ScrollProgress from "./components/ScrollProgress";
import MusicPlayer from "./components/MusicPlayer";
import ParticleCursorTrail from "./components/ParticleCursorTrail";
import InteractiveIDE from "./components/InteractiveIDE";
import AIAssistantWidget from "./components/AIAssistantWidget";
import PerformanceBenchmarker from "./components/PerformanceBenchmarker";
import PhysicsTechSandbox from "./components/PhysicsTechSandbox";

function App() {
  const [dark, setDark] = useState(false);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (!window.location.hash || window.location.hash === '#hero')) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdKOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDark = () => setDark(!dark);
  const handleOpenCmdK = () => setIsCmdKOpen(true);
  const handleCloseCmdK = () => setIsCmdKOpen(false);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-indigo-200">
      
      {/* Background Decorators */}
      <ErrorBoundary><ParticleCursorTrail /></ErrorBoundary>
      <ErrorBoundary><ScrollProgress /></ErrorBoundary>
      <ErrorBoundary><ThreeMeshCanvas /></ErrorBoundary>

      {/* Cmd+K Quick Search Command Palette */}
      <ErrorBoundary><CmdKModal isOpen={isCmdKOpen} onClose={handleCloseCmdK} /></ErrorBoundary>

      {/* Header Navigation */}
      <ErrorBoundary><Navbar dark={dark} toggleDark={toggleDark} onOpenCmdK={handleOpenCmdK} /></ErrorBoundary>
      
      {/* Main Page Sections */}
      <main className="relative z-10">
        <ErrorBoundary><HeroPlayground onOpenCmdK={handleOpenCmdK} /></ErrorBoundary>
        <ErrorBoundary><About /></ErrorBoundary>
        <ErrorBoundary><Experience /></ErrorBoundary>
        <ErrorBoundary><Education /></ErrorBoundary>
        <ErrorBoundary><ArchitectureVisualizer /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <div className="max-w-6xl mx-auto px-6">
          <ErrorBoundary><GitHubStatsWidget /></ErrorBoundary>
          <ErrorBoundary><InteractiveIDE /></ErrorBoundary>
          <ErrorBoundary><PerformanceBenchmarker /></ErrorBoundary>
        </div>
        <ErrorBoundary><Skills /></ErrorBoundary>
        <div className="max-w-6xl mx-auto px-6">
          <ErrorBoundary><PhysicsTechSandbox /></ErrorBoundary>
          <ErrorBoundary><AlgorithmSimulator /></ErrorBoundary>
        </div>
        <ErrorBoundary><Certifications /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
        <ErrorBoundary><CTA /></ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Adhi Vignesh. All rights reserved.</p>
          <p>
            Built with <span className="font-semibold text-slate-700 dark:text-slate-300">React</span>, <span className="font-semibold text-slate-700 dark:text-slate-300">Tailwind CSS</span> & <span className="font-semibold text-slate-700 dark:text-slate-300">Framer Motion</span>
          </p>
        </div>
      </footer>

      {/* Floating Controls */}
      <ErrorBoundary><SocialSidebar /></ErrorBoundary>
      <ErrorBoundary><BackToTop /></ErrorBoundary>
      <ErrorBoundary><MusicPlayer /></ErrorBoundary>
      <ErrorBoundary><AIAssistantWidget /></ErrorBoundary>
    </div>
  );
}

export default App;

