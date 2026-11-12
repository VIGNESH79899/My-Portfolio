import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { Download, Command, ArrowUpRight } from "lucide-react";
import { playClickSound } from "../utils/sound";

const footerLinks = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Freelancing", href: "#freelance" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

const Footer = ({ onOpenCmdK }) => {
  const scrollToTop = () => {
    try { playClickSound(); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 mt-auto w-full border-t border-[#D8D1C5] dark:border-[#383A2F] bg-[#FFFDF9] dark:bg-[#161713] text-[#68675F] dark:text-[#C0BFB3] font-sans overflow-hidden">
      {/* Subtle Top Gradient Accent Hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#777C62]/50 to-transparent dark:via-[#ADB293]/45" />

      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 sm:pb-24">
        {/* Main Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-[#D8D1C5]/80 dark:border-[#2D3025]">
          
          {/* Brand & Availability Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1C1D19] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#1C1D19] font-heading font-bold text-sm flex items-center justify-center shadow-sm border border-[#252722]/15 dark:border-white/15 shrink-0">
                AV
              </div>
              <div>
                <h3 className="text-base font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
                  Adhi Vignesh
                </h3>
                <p className="text-[11px] font-mono text-[#777C62] dark:text-[#ADB293]">
                  Full-Stack &amp; Applied AI Engineer
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#68675F] dark:text-[#C0BFB3] max-w-sm font-normal">
              B.Tech CSE (AI &amp; ML) student at Aurora University, Hyderabad building production SaaS platforms, REST/SSE architectures, and machine learning applications.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F2EB] dark:bg-[#22241D] border border-[#D8D1C5] dark:border-[#383A2F] text-[11px] font-mono font-medium text-[#252722] dark:text-[#F5F2EB]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Open for SWE &amp; AI/ML Roles</span>
            </div>
          </div>

          {/* Quick Section Navigation Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777C62] dark:text-[#ADB293] block">
              Sections
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => { try { playClickSound(); } catch (e) {} }}
                    className="group inline-flex items-center gap-1 text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-[#F5F2EB] transition-colors font-medium"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Quick Actions Column */}
          <div className="md:col-span-3 space-y-3.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777C62] dark:text-[#ADB293] block">
              Connect &amp; Spec
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="/Adhi_Vignesh_Resume.pdf"
                download="Adhi_Vignesh_Resume.pdf"
                onClick={() => { try { playClickSound(); } catch (e) {} }}
                className="btn-primary !px-4 !py-2 !text-xs !rounded-full inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#ADB293] dark:text-[#777C62]" />
                <span>Resume PDF</span>
              </a>

              {onOpenCmdK && (
                <button
                  type="button"
                  onClick={() => { try { playClickSound(); } catch (e) {} onOpenCmdK(); }}
                  className="pill-venom-inactive !px-3 !py-2 !text-xs rounded-full inline-flex items-center gap-1.5 font-mono cursor-pointer"
                  aria-label="Open quick command palette"
                >
                  <Command className="w-3 h-3" />
                  <span>Ctrl+K</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://github.com/VIGNESH79899"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="pill-venom-inactive !w-9 !h-9 !p-0 rounded-full inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform"
              >
                <FaGithub size={14} />
              </a>
              <a
                href="https://linkedin.com/in/adhi-vignesh-342431289"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="pill-venom-inactive !w-9 !h-9 !p-0 rounded-full inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href="mailto:vigneshadhi773@gmail.com"
                aria-label="Email Adhi Vignesh"
                className="pill-venom-inactive !w-9 !h-9 !p-0 rounded-full inline-flex items-center justify-center hover:-translate-y-0.5 transition-transform"
              >
                <FaEnvelope size={13} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Stack Attribution Row (Cleared above floating widgets) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68675F] dark:text-[#C0BFB3]">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Adhi Vignesh. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-center sm:text-right">
              Crafted with{" "}
              <span className="font-semibold text-[#252722] dark:text-[#F5F2EB] whitespace-nowrap">React</span>,{" "}
              <span className="font-semibold text-[#252722] dark:text-[#F5F2EB] whitespace-nowrap">Tailwind CSS</span> &amp;{" "}
              <span className="font-semibold text-[#252722] dark:text-[#F5F2EB] whitespace-nowrap">Framer Motion</span>
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="pill-venom-inactive !px-3 !py-1 !text-[11px] rounded-full inline-flex items-center gap-1.5 font-mono cursor-pointer hover:-translate-y-0.5 transition-transform"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <FaArrowUp size={9} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
