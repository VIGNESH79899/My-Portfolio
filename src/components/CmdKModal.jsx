import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFileDownload, FaEnvelope, FaGithub, FaLinkedin, FaBriefcase, FaCode, FaGraduationCap, FaStore } from 'react-icons/fa';

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
      title: "View Work Experience & Internships",
      category: "Navigation",
      icon: <FaBriefcase className="text-[var(--accent-primary)]" />,
      action: () => { window.location.href = "#experience"; onClose(); }
    },
    {
      title: "View Freelance Client Work (Chandeshwara Enterprises)",
      category: "Navigation",
      icon: <FaStore className="text-[var(--accent-primary)]" />,
      action: () => { window.location.href = "#freelance"; onClose(); }
    },
    {
      title: "View Projects Showcase",
      category: "Navigation",
      icon: <FaCode className="text-[var(--accent-primary)]" />,
      action: () => { window.location.href = "#projects"; onClose(); }
    },
    {
      title: "View Technical Skills",
      category: "Navigation",
      icon: <FaCode className="text-[var(--accent-primary)]" />,
      action: () => { window.location.href = "#skills"; onClose(); }
    },
    {
      title: "View Education & Academics",
      category: "Navigation",
      icon: <FaGraduationCap className="text-[var(--accent-primary)]" />,
      action: () => { window.location.href = "#education"; onClose(); }
    },
    {
      title: "Download Resume PDF",
      category: "Actions",
      icon: <FaFileDownload className="text-[var(--accent-primary)]" />,
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
      icon: <FaEnvelope className="text-[#8C7258] dark:text-[#C1A17F]" />,
      action: () => { window.location.href = "mailto:vigneshadhi773@gmail.com"; onClose(); }
    },
    {
      title: "Open GitHub Profile",
      category: "External",
      icon: <FaGithub className="text-[var(--text-primary)]" />,
      action: () => { window.open("https://github.com/VIGNESH79899", "_blank"); onClose(); }
    },
    {
      title: "Open LinkedIn Profile",
      category: "External",
      icon: <FaLinkedin className="text-[var(--accent-primary)]" />,
      action: () => { window.open("https://linkedin.com/in/adhi-vignesh-342431289", "_blank"); onClose(); }
    }
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-xl bg-[var(--surface-primary)] rounded-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden">
        
        {/* Search Bar Input Header */}
        <div className="flex items-center px-4 border-b border-[var(--border-color)]">
          <FaSearch className="text-[var(--text-secondary)] text-sm mr-3" />
          <input
            type="text"
            placeholder="Type a command or search section (e.g. Resume, Projects, Experience)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 text-sm bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <FaTimes size={14} />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredActions.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--text-secondary)]">No matching commands found.</div>
          ) : (
            filteredActions.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[var(--hover-surface)] flex items-center justify-between transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-color)]">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors truncate max-w-[190px] sm:max-w-none block">
                      {item.title}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase bg-[var(--surface-secondary)] border border-[var(--border-color)] px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-[var(--surface-secondary)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
          <span>Use <strong>ESC</strong> to exit</span>
          <span>Command Palette</span>
        </div>

      </div>
    </div>
  );
};

export default CmdKModal;
