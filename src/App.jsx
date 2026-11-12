import React, { useState, useEffect, lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import HeroPlayground from "./components/HeroPlayground";

// Code-split below-the-fold sections and heavy interactive widgets for fast Mobile LCP/FCP
const Projects = lazy(() => import("./components/Projects"));
const FreelanceSpotlight = lazy(() => import("./components/FreelanceSpotlight"));
const Experience = lazy(() => import("./components/Experience"));
const About = lazy(() => import("./components/About"));
const Education = lazy(() => import("./components/Education"));
const Certifications = lazy(() => import("./components/Certifications"));
const Contact = lazy(() => import("./components/Contact"));
const CTA = lazy(() => import("./components/CTA"));
const Footer = lazy(() => import("./components/Footer"));
const SocialSidebar = lazy(() => import("./components/SocialSidebar"));
const BackToTop = lazy(() => import("./components/BackToTop"));
const ScrollProgress = lazy(() => import("./components/ScrollProgress"));
const ParticleCursorTrail = lazy(() => import("./components/ParticleCursorTrail"));
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
      <ErrorBoundary><Suspense fallback={null}><ParticleCursorTrail /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={null}><ScrollProgress /></Suspense></ErrorBoundary>
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
        <ErrorBoundary><Suspense fallback={<section id="projects" className="py-24 min-h-[600px]" aria-hidden="true" />}><Projects /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<section id="freelance" className="py-20 min-h-[420px]" aria-hidden="true" />}><FreelanceSpotlight /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<section id="experience" className="py-20 min-h-[420px]" aria-hidden="true" />}><Experience /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<section id="about" className="py-20 min-h-[480px]" aria-hidden="true" />}><About /></Suspense></ErrorBoundary>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ErrorBoundary>
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-xs font-mono text-[#68675F]">Loading Telemetry...</div>}>
              <GitHubStatsWidget />
            </Suspense>
          </ErrorBoundary>
        </div>
        <ErrorBoundary><Suspense fallback={<section id="education" className="py-20 min-h-[360px]" aria-hidden="true" />}><Education /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<section id="certifications" className="py-20 min-h-[360px]" aria-hidden="true" />}><Certifications /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={<section id="contact" className="py-20 min-h-[420px]" aria-hidden="true" />}><Contact /></Suspense></ErrorBoundary>
        <ErrorBoundary><Suspense fallback={null}><CTA /></Suspense></ErrorBoundary>
      </main>

      {/* Footer */}
      <ErrorBoundary><Suspense fallback={null}><Footer onOpenCmdK={handleOpenCmdK} /></Suspense></ErrorBoundary>

      {/* Floating Controls */}
      <ErrorBoundary><Suspense fallback={null}><SocialSidebar /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={null}><BackToTop /></Suspense></ErrorBoundary>
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

