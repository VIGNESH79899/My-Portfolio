import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import SocialProfileModal from './SocialProfileModal';
import { playClickSound } from '../utils/sound';

const SocialSidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('github');

  const openProfile = (type) => {
    try { playClickSound(); } catch {}
    setModalType(type);
    setModalOpen(true);
  };

  const socials = [
    { 
      id: 'linkedin', 
      name: "LinkedIn Profile", 
      badge: "Popup",
      icon: <FaLinkedin className="w-4 h-4" />,
      hoverColor: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/15 dark:hover:bg-[#0A66C2]/25",
      activeGlow: "group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]"
    },
    { 
      id: 'github', 
      name: "GitHub Profile", 
      badge: "Popup",
      icon: <FaGithub className="w-4 h-4" />,
      hoverColor: "hover:text-[#252722] dark:hover:text-[#F5F2EB] hover:bg-black/10 dark:hover:bg-white/10",
      activeGlow: "group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
    },
    { 
      id: 'email', 
      name: "Quick Message", 
      badge: "Email",
      icon: <FaEnvelope className="w-4 h-4" />,
      hoverColor: "hover:text-[#EA4335] hover:bg-[#EA4335]/15 dark:hover:bg-[#EA4335]/25",
      activeGlow: "group-hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.6)]"
    },
    { 
      id: 'resume', 
      name: "Resume PDF", 
      badge: "Preview",
      icon: <FaFileAlt className="w-4 h-4" />,
      hoverColor: "hover:text-[#777C62] dark:hover:text-[#ADB293] hover:bg-[#777C62]/15 dark:hover:bg-[#ADB293]/25",
      activeGlow: "group-hover:drop-shadow-[0_0_8px_rgba(119,124,98,0.6)]"
    }
  ];

  return (
    <>
      <aside className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-3 sm:left-5 flex-col items-center gap-2 z-40 select-none">
        
        {/* Floating Tactile Glass Capsule Dock */}
        <div className="flex flex-col items-center gap-2 p-2 rounded-full bg-[#FFFDF9]/90 dark:bg-[#141510]/90 backdrop-blur-2xl border border-white/90 dark:border-white/15 shadow-[0_20px_45px_-10px_rgba(37,39,34,0.18),0_4px_16px_-2px_rgba(37,39,34,0.08),inset_0_1.5px_1px_0_rgba(255,255,255,1),inset_0_-1.5px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.8),0_6px_20px_-2px_rgba(0,0,0,0.5),inset_0_1.5px_1px_0_rgba(255,255,255,0.3),inset_0_-1.5px_2px_0_rgba(0,0,0,0.6)] transition-all">
          
          {/* Active Live Signal Orb */}
          <div className="pt-1.5 pb-0.5 flex flex-col items-center justify-center" title="Profiles Online • Available for Opportunities">
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
          </div>

          <span className="w-5 h-[1px] bg-gradient-to-r from-transparent via-[#D8D1C5] to-transparent dark:via-[#383A2F] my-0.5" />

          {/* Tactile Icon Bead Triggers */}
          {socials.map((s) => (
            <button
              key={s.id}
              onClick={() => openProfile(s.id)}
              aria-label={s.name}
              className="group relative w-10 h-10 rounded-full flex items-center justify-center text-[#68675F] dark:text-[#C0BFB3] hover:text-[#252722] dark:hover:text-[#FFFFFF] hover:bg-gradient-to-b hover:from-white/95 hover:to-white/60 dark:hover:from-white/15 dark:hover:to-white/5 hover:shadow-[0_4px_14px_rgba(37,39,34,0.12),inset_0_1px_0_rgba(255,255,255,1)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer select-none"
            >
              <div className={`${s.activeGlow} transition-all duration-200 text-base`}>
                {s.icon}
              </div>

              {/* Glossy Obsidian Slide-Out Tooltip */}
              <span className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#161713]/95 dark:bg-[#0B0C09]/95 text-white text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-[0_12px_28px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] border border-white/20 flex items-center gap-2 z-50 translate-x-1 group-hover:translate-x-0">
                <span>{s.name}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/15 text-[9px] font-mono text-[#ADB293] uppercase font-bold">
                  {s.badge}
                </span>
              </span>
            </button>
          ))}

        </div>
      </aside>

      {/* In-Portfolio Live Profile Modal with Backdrop Blur */}
      <SocialProfileModal
        isOpen={modalOpen}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default SocialSidebar;
