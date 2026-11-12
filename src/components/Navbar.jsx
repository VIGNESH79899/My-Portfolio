import React, { useState, useEffect } from "react";
import { playClickSound } from "../utils/sound";

const iconProps = (className) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  "aria-hidden": "true",
});

const Search = ({ className }) => (
  <svg {...iconProps(className)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Sun = ({ className }) => (
  <svg {...iconProps(className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const Moon = ({ className }) => (
  <svg {...iconProps(className)}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const Download = ({ className }) => (
  <svg {...iconProps(className)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const Menu = ({ className }) => (
  <svg {...iconProps(className)}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ className }) => (
  <svg {...iconProps(className)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ArrowUpRight = ({ className }) => (
  <svg {...iconProps(className)}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const Navbar = ({ dark, toggleDark, onOpenCmdK }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const sectionIds = [
      "hero",
      "projects",
      "freelance",
      "experience",
      "about",
      "education",
      "certifications",
      "contact",
    ];
    let observer;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          }
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 }
      );
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Freelancing", href: "#freelance", id: "freelance" },
    { name: "Experience", href: "#experience", id: "experience" },
    // { name: "Skills", href: "#skills", id: "skills" },
    { name: "About", href: "#about", id: "about" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Certifications", href: "#certifications", id: "certifications" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = () => {
    try { playClickSound(); } catch (e) {}
    setMenuOpen(false);
  };

  const handleToggleDark = () => {
    try { playClickSound(); } catch (e) {}
    toggleDark();
  };

  const handleOpenSearch = () => {
    try { playClickSound(); } catch (e) {}
    onOpenCmdK();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-3 px-3 sm:px-6 font-sans pointer-events-none">
      <div 
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-between gap-2 xl:gap-5 px-3 sm:px-5 xl:px-6 py-2.5 sm:py-3 border shadow-sm ${
          scrolled
            ? "bg-[#FFFDF9]/92 dark:bg-[#181914]/92 backdrop-blur-2xl border-[#D8D1C5] dark:border-[#383A2F] shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
            : "bg-[#FFFDF9]/85 dark:bg-[#181914]/85 backdrop-blur-xl border-[#D8D1C5]/80 dark:border-[#35372D]/80"
        }`}
      >
        
        {/* Brand Logo & Telemetry (Left) */}
        <a 
          href="#hero" 
          onClick={handleLinkClick}
          className="flex items-center gap-2.5 group focus:outline-none select-none shrink-0"
        >
          <div className="relative w-8 h-8 rounded-full btn-venom-icon !w-8 !h-8 text-xs font-mono font-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
            AV
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight group-hover:text-[#777C62] dark:group-hover:text-[#ADB293] transition-colors leading-tight whitespace-nowrap">
              Adhi Vignesh
            </span>
            <span className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B] tracking-wide leading-none mt-0.5 whitespace-nowrap hidden sm:block">
              Full-Stack &amp; Applied AI
            </span>
          </div>
        </a>

        {/* Center Links Track - Floating Glass Capsule */}
        <nav className="hidden lg:flex items-center bg-[#FFFDF9]/90 dark:bg-[#12130F]/90 backdrop-blur-2xl px-1.5 xl:px-2 py-1.5 rounded-full border border-[#D8D1C5]/80 dark:border-white/12 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(37,39,34,0.04)] dark:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.4)] gap-0.5 xl:gap-1 shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-xs font-heading select-none whitespace-nowrap px-2.5 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "pill-venom-active font-bold shadow-md"
                    : "font-semibold text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Action Controls (Right) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0 flex-nowrap">
          
          {/* Quick Search Button */}
          <button
            onClick={handleOpenSearch}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9]/90 dark:bg-[#12130F]/90 hover:bg-[#F5F2EA] dark:hover:bg-[#1E2018] text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-white text-xs font-heading font-medium transition-all border border-[#D8D1C5]/80 dark:border-white/12 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(37,39,34,0.04)] dark:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Search Portfolio & Commands (⌘K)"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="text-xs hidden xl:inline">Search</span>
            <kbd className="px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/15 text-[10px] text-[#252722] dark:text-white font-mono font-bold border border-black/10 dark:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={handleToggleDark}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="w-9 h-9 rounded-full bg-[#FFFDF9]/90 dark:bg-[#12130F]/90 hover:bg-[#F5F2EA] dark:hover:bg-[#1E2018] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5]/80 dark:border-white/12 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(37,39,34,0.04)] dark:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
            title={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            <span
              className={`inline-flex transition-transform duration-300 ${dark ? "rotate-180" : "rotate-0"}`}
            >
              {dark ? <Sun className="w-4 h-4 text-[#C1A17F]" /> : <Moon className="w-4 h-4 text-[#555A44]" />}
            </span>
          </button>

          {/* Resume Download CTA Button */}
          <a
            href="/Adhi_Vignesh_Resume.pdf"
            download="Adhi_Vignesh_Resume.pdf"
            onClick={() => { try { playClickSound(); } catch (e) {} }}
            className="btn-primary text-xs !py-1.5 !px-4 shrink-0 inline-flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-[#ADB293] dark:text-[#777C62] shrink-0" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile / Tablet Controls (< 1024px) */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <button
            onClick={handleOpenSearch}
            className="w-10 h-10 rounded-full bg-[#FFFDF9]/90 dark:bg-[#12130F]/90 text-[#52514B] dark:text-[#C0BFB3] border border-[#D8D1C5]/80 dark:border-white/12 shadow-sm flex items-center justify-center"
            aria-label="Search portfolio"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleDark}
            className="w-10 h-10 rounded-full bg-[#FFFDF9]/90 dark:bg-[#12130F]/90 text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5]/80 dark:border-white/12 shadow-sm flex items-center justify-center"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun className="w-4 h-4 text-[#C1A17F]" /> : <Moon className="w-4 h-4 text-[#555A44]" />}
          </button>

          <button
            onClick={() => {
              try { playClickSound(); } catch (e) {}
              setMenuOpen(!menuOpen);
            }}
            className="w-10 h-10 rounded-full btn-venom !p-0 flex items-center justify-center transition-all"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl bg-[#FFFDF9]/95 dark:bg-[#181914]/95 backdrop-blur-2xl border border-[#D8D1C5] dark:border-[#383A2F] p-4 flex flex-col gap-2 shadow-xl pointer-events-auto overflow-hidden transition-all"
        >
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      isActive 
                        ? "pill-venom-active font-bold shadow-xs text-white" 
                        : "pill-venom-inactive hover:bg-[#E3DDD1] dark:hover:bg-[#2C2E25]"
                    }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Resume CTA */}
            <a
              href="/Adhi_Vignesh_Resume.pdf"
              download="Adhi_Vignesh_Resume.pdf"
              onClick={handleLinkClick}
              className="btn-primary w-full !py-2.5 !rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#ADB293] dark:text-[#777C62]" />
              <span>Download Official Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
