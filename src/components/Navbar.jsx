import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaMoon, FaSun, FaDownload, FaSearch } from "react-icons/fa";

const Navbar = ({ dark, toggleDark, onOpenCmdK }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed w-full top-0 left-0 z-40 transition-all duration-200 ${
      scrolled 
        ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm" 
        : "bg-transparent py-2"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            AV
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Adhi Vignesh
            </span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Full-Stack & AI/ML
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* Cmd+K Quick Search Button */}
          <button
            onClick={onOpenCmdK}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono transition-colors border border-slate-200/60 dark:border-slate-700/60"
            title="Open Command Palette"
          >
            <FaSearch className="text-[10px]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[9px] text-slate-600 dark:text-slate-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {dark ? <FaSun className="text-amber-400 text-sm" /> : <FaMoon className="text-slate-600 text-sm" />}
          </button>

          {/* Resume PDF Download */}
          <a
            href="/Adhi_Vignesh_Resume.pdf"
            download="Adhi_Vignesh_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold tracking-wide border border-slate-700/40 dark:border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <FaDownload className="text-xs text-indigo-400 dark:text-indigo-600 shrink-0" /> Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCmdK}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <FaSearch size={14} />
          </button>

          <button
            onClick={toggleDark}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {dark ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/Adhi_Vignesh_Resume.pdf"
            download="Adhi_Vignesh_Resume.pdf"
            className="mt-2 text-center py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold tracking-wide border border-slate-800 dark:border-slate-200"
          >
            Download Resume PDF
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
