import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFileDownload, FaEnvelope, FaGithub, FaLinkedin, FaBriefcase, FaCode, FaGraduationCap } from 'react-icons/fa';

const CmdKModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else isOpen = true; // handled by parent listener
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      title: "View Work Experience",
      category: "Navigation",
      icon: <FaBriefcase className="text-indigo-500" />,
      action: () => { window.location.href = "#experience"; onClose(); }
    },
    {
      title: "View Projects Showcase",
      category: "Navigation",
      icon: <FaCode className="text-indigo-500" />,
      action: () => { window.location.href = "#projects"; onClose(); }
    },
    {
      title: "View Technical Skills",
      category: "Navigation",
      icon: <FaCode className="text-indigo-500" />,
      action: () => { window.location.href = "#skills"; onClose(); }
    },
    {
      title: "View Education & Academics",
      category: "Navigation",
      icon: <FaGraduationCap className="text-indigo-500" />,
      action: () => { window.location.href = "#education"; onClose(); }
    },
    {
      title: "Download Resume PDF",
      category: "Actions",
      icon: <FaFileDownload className="text-emerald-500" />,
      action: () => {
        const link = document.createElement('a');
        link.href = '/Adhi_Vignesh_Resume.pdf';
        link.download = 'Adhi_Vignesh_Resume.pdf';
        link.click();
        onClose();
      }
    },
    {
      title: "Send Email Message",
      category: "Contact",
      icon: <FaEnvelope className="text-sky-500" />,
      action: () => { window.location.href = "mailto:vigneshadhi773@gmail.com"; onClose(); }
    },
    {
      title: "Open GitHub Profile",
      category: "External",
      icon: <FaGithub className="text-slate-700 dark:text-slate-300" />,
      action: () => { window.open("https://github.com/VIGNESH79899", "_blank"); onClose(); }
    },
    {
      title: "Open LinkedIn Profile",
      category: "External",
      icon: <FaLinkedin className="text-blue-600" />,
      action: () => { window.open("https://linkedin.com/in/adhi-vignesh-342431289", "_blank"); onClose(); }
    }
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Search Bar Input Header */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <FaSearch className="text-slate-400 text-sm mr-3" />
          <input
            type="text"
            placeholder="Type a command or search section (e.g. Resume, Projects, Experience)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <FaTimes size={14} />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">No matching commands found.</div>
          ) : (
            filteredActions.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Use <strong>ESC</strong> to exit</span>
          <span>Command Palette</span>
        </div>

      </div>
    </div>
  );
};

export default CmdKModal;
