import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const SocialSidebar = () => {
  const socials = [
    { name: "LinkedIn", href: "https://linkedin.com/in/adhi-vignesh-342431289", icon: <FaLinkedin size={15} /> },
    { name: "GitHub", href: "https://github.com/VIGNESH79899", icon: <FaGithub size={15} /> },
    { name: "Email", href: "mailto:vigneshadhi773@gmail.com", icon: <FaEnvelope size={15} /> },
    { name: "Resume PDF", href: "/Adhi_Vignesh_Resume.pdf", icon: <FaFileAlt size={15} />, download: "Adhi_Vignesh_Resume.pdf" }
  ];

  return (
    <aside className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-5 flex-col gap-2.5 z-30">
      {socials.map((s, idx) => (
        <a
          key={idx}
          href={s.href}
          download={s.download || undefined}
          target={s.href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          aria-label={s.name}
          className="group relative p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-2xs transition-all hover:scale-105 hover:border-indigo-500/40"
        >
          {s.icon}
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            {s.name}
          </span>
        </a>
      ))}
    </aside>
  );
};

export default SocialSidebar;

