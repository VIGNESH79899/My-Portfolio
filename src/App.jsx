import React, { useState, useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import HeroPlayground from "./components/HeroPlayground";
import Projects from "./components/Projects";
import FreelanceSpotlight from "./components/FreelanceSpotlight";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import About from "./components/About";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SocialSidebar from "./components/SocialSidebar";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import ParticleCursorTrail from "./components/ParticleCursorTrail";

// Code-split heavy interactive and below-the-fold widgets for sub-second loading
const ThreeMeshCanvas = lazy(() => import("./components/ThreeMeshCanvas"));
const GitHubStatsWidget = lazy(() => import("./components/GitHubStatsWidget"));
const CmdKModal = lazy(() => import("./components/CmdKModal"));
const MusicPlayer = lazy(() => import("./components/MusicPlayer"));
const AIAssistantWidget = lazy(() => import("./components/AIAssistantWidget"));

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
      }
    }
    return false; // Light-first design as specified
  });
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
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
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#F5F2EB] text-[#252722] dark:bg-[#1C1D19] dark:text-[#F5F2EB] font-sans selection:bg-[#777C62]/20 selection:text-[#252722] dark:selection:bg-[#ADB293]/25 dark:selection:text-[#F5F2EB]">
      
      {/* Background Decorators */}
      <ErrorBoundary><ParticleCursorTrail /></ErrorBoundary>
      <ErrorBoundary><ScrollProgress /></ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ThreeMeshCanvas />
        </Suspense>
      </ErrorBoundary>

      {/* Cmd+K Quick Search Command Palette */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <CmdKModal isOpen={isCmdKOpen} onClose={handleCloseCmdK} />
        </Suspense>
      </ErrorBoundary>

      {/* Header Navigation */}
      <ErrorBoundary><Navbar dark={dark} toggleDark={toggleDark} onOpenCmdK={handleOpenCmdK} /></ErrorBoundary>
      
      {/* Main Page Sections */}
      <main className="relative z-10 flex-1">
        <ErrorBoundary><HeroPlayground onOpenCmdK={handleOpenCmdK} /></ErrorBoundary>
        <ErrorBoundary><Projects /></ErrorBoundary>
        <ErrorBoundary><FreelanceSpotlight /></ErrorBoundary>
        <ErrorBoundary><Experience /></ErrorBoundary>
        {/* <ErrorBoundary><Skills /></ErrorBoundary> */}
        <ErrorBoundary><About /></ErrorBoundary>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ErrorBoundary>
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs font-mono text-[#68675F]">Loading Telemetry...</div>}>
              <GitHubStatsWidget />
            </Suspense>
          </ErrorBoundary>
        </div>
        <ErrorBoundary><Education /></ErrorBoundary>
        <ErrorBoundary><Certifications /></ErrorBoundary>
        <ErrorBoundary><Contact /></ErrorBoundary>
        <ErrorBoundary><CTA /></ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary><Footer onOpenCmdK={handleOpenCmdK} /></ErrorBoundary>

      {/* Floating Controls */}
      <ErrorBoundary><SocialSidebar /></ErrorBoundary>
      <ErrorBoundary><BackToTop /></ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <MusicPlayer />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AIAssistantWidget />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

