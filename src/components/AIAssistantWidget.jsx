import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, FaTimes, FaPaperPlane, FaUser, 
  FaCheckCircle, FaChevronRight, FaArrowRight, FaCode,
  FaLightbulb, FaTrash
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';
import { generateStreamingResponse } from '../services/aiTwin';

const quickPrompts = [
  { label: "⚡ Top Skills & Stack", text: "What are Adhi's strongest technical skills and what does he use them for?" },
  { label: "🚀 Sashverse SaaS Project", text: "Tell me about Adhi's work at Sashverse Technologies and the Workverse platform." },
  { label: "🧠 Featured AI/ML Work", text: "What are Adhi's main AI/ML projects and how do they work?" },
  { label: "🛍️ Freelance Client Work", text: "Tell me about Chandeshwara Enterprises e-commerce project built with TypeScript and MongoDB." },
  { label: "🎓 Academic Roadmap", text: "What is Adhi's academic background and degree timeline at Aurora University?" }
];

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: "welcome-1",
      sender: "ai", 
      text: "👋 Hi! I'm Adhi's **AI Developer Twin**. Ask me about his software projects, technical skills, internships, AI/ML models, or how he builds production SaaS systems." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const widgetRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  // Keyboard accessibility & Instant Auto-Close on Scroll, Wheel, or Click Outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScrollOrWheel = () => {
      setIsOpen(false);
    };

    const handleClickOutside = (e) => {
      if (
        widgetRef.current && 
        !widgetRef.current.contains(e.target) &&
        launcherRef.current &&
        !launcherRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScrollOrWheel, { passive: true });
    window.addEventListener("wheel", handleScrollOrWheel, { passive: true });
    window.addEventListener("pointerdown", handleClickOutside, { capture: true });
    window.addEventListener("mousedown", handleClickOutside, { capture: true });
    window.addEventListener("touchstart", handleClickOutside, { capture: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScrollOrWheel);
      window.removeEventListener("wheel", handleScrollOrWheel);
      window.removeEventListener("pointerdown", handleClickOutside, { capture: true });
      window.removeEventListener("mousedown", handleClickOutside, { capture: true });
      window.removeEventListener("touchstart", handleClickOutside, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 150);
    }
  }, [isOpen]);

  const handleToggle = () => {
    try { playClickSound(); } catch (e) {}
    setIsOpen(!isOpen);
  };

  const handleClearHistory = () => {
    try { playClickSound(); } catch (e) {}
    setMessages([
      { 
        id: `welcome-${Date.now()}`,
        sender: "ai", 
        text: "Conversation reset! How else can I assist you with Adhi's portfolio, skills, or projects?" 
      }
    ]);
  };

  const handleActionClick = (targetSectionId) => {
    try { playClickSound(); } catch (e) {}
    setIsOpen(false);
    const targetEl = document.getElementById(targetSectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = async (userPromptText) => {
    const textToSend = userPromptText || input.trim();
    if (!textToSend || isTyping) return;

    try { playClickSound(); } catch (e) {}

    const userMsgId = `user-${Date.now()}`;
    const userMsg = { id: userMsgId, sender: 'user', text: textToSend };
    
    const botMsgId = `ai-${Date.now()}`;
    const initialBotMsg = { id: botMsgId, sender: 'ai', text: '' };

    setMessages((prev) => [...prev, userMsg, initialBotMsg]);
    setInput('');
    setIsTyping(true);

    let accumulatedText = "";

    await generateStreamingResponse(
      textToSend,
      messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      (tokenChunk) => {
        accumulatedText += tokenChunk;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
          )
        );
      }
    );

    setIsTyping(false);
    try { playSuccessSound(); } catch (e) {}
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageText = (msg) => {
    if (msg.sender === 'user') {
      return <p className="leading-relaxed font-sans">{msg.text}</p>;
    }

    const actionPattern = /\[View (Projects|Experience|Education|Architecture|Certifications)\]/g;
    const actionMatches = [...msg.text.matchAll(actionPattern)];

    const cleanedText = msg.text.replace(actionPattern, '');

    const foundActions = actionMatches.map(m => {
      const type = m[1].toLowerCase();
      const targetMap = {
        'projects': 'projects',
        'experience': 'experience',
        'education': 'education',
        'architecture': 'architecture',
        'certifications': 'certifications'
      };
      return {
        label: `View ${m[1]} Section`,
        target: targetMap[type] || 'projects'
      };
    });

    const parseFormattedText = (rawText) => {
      const lines = rawText.split('\n');
      return lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <React.Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                const boldContent = part.slice(2, -2);
                return (
                  <strong key={partIdx} className="font-bold text-slate-900 dark:text-white">
                    {boldContent}
                  </strong>
                );
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </React.Fragment>
        );
      });
    };

    return (
      <div>
        <div className="leading-relaxed font-normal font-sans text-xs sm:text-xs">
          {parseFormattedText(cleanedText.trim())}
        </div>

        {foundActions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            {foundActions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => handleActionClick(act.target)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer shadow-2xs"
              >
                <span>{act.label}</span>
                <FaArrowRight className="text-[8px]" />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Invisible Screen Backdrop Overlay when AI Chat is Open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-35 bg-slate-950/30 backdrop-blur-[2px] cursor-pointer"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 font-sans max-w-[calc(100vw-24px)]">
        
        {/* Floating Launcher Button */}
        {!isOpen && (
          <motion.button
            ref={launcherRef}
            whileHover={prefersReducedMotion ? {} : { scale: 1.06, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
            onClick={handleToggle}
            aria-label="Open Adhi's AI Developer Twin Chat"
            className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/25 border border-indigo-400/40 text-xs font-bold cursor-pointer focus:outline-hidden"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 ring-2 ring-indigo-900/40" />
            </span>
            <div className="p-1.5 rounded-full bg-white/20 group-hover:rotate-12 transition-transform duration-300">
              <FaRobot className="text-sm" />
            </div>
            <span className="tracking-tight text-xs">Ask Adhi's AI Twin</span>
          </motion.button>
        )}

        {/* Floating Modern AI Assistant Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={widgetRef}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[calc(100vw-32px)] sm:w-[410px] max-w-[410px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[540px] max-h-[82vh]"
            >
              {/* Ultra-Modern Header Bar */}
              <div className="p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative p-2.5 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md shadow-inner">
                    <FaRobot className="text-lg" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-extrabold leading-tight tracking-tight">Adhi's AI Twin</h4>
                      <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-100">
                        AI 2.0
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-100 flex items-center gap-1 font-mono mt-0.5">
                      <FaCheckCircle className="text-emerald-300 text-[9px]" /> Grounded Portfolio Knowledge
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClearHistory}
                    title="Clear Conversation"
                    className="p-2 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <FaTrash size={12} />
                  </button>
                  <button
                    onClick={handleToggle}
                    aria-label="Close Chat"
                    className="p-2 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>

              {/* Message History Stream */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar text-xs bg-slate-50/50 dark:bg-slate-950/50">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar Badge */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                        : 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800'
                    }`}>
                      {msg.sender === 'user' ? <FaUser size={10} /> : <FaRobot size={12} />}
                    </div>

                    {/* Message Bubble */}
                    <div className={`p-3.5 rounded-2xl max-w-[84%] shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-xs font-medium'
                        : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80'
                    }`}>
                      {msg.text === '' && isTyping ? (
                        <div className="flex items-center gap-2 py-1 px-1">
                          <span className="text-[11px] font-mono text-indigo-500 font-semibold animate-pulse">Processing context...</span>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-150" />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse delay-300" />
                          </div>
                        </div>
                      ) : (
                        renderMessageText(msg)
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Quick Suggestions Pill Bar */}
              <div className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <FaLightbulb className="text-amber-500 text-[10px]" />
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">SUGGESTED QUESTIONS:</span>
                </div>
                <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-1 text-[11px]">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(qp.text)}
                      disabled={isTyping}
                      className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-50 font-medium text-[11px]"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask about Adhi's projects, skills, SaaS work..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    disabled={isTyping}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
                  >
                    <FaPaperPlane size={12} />
                  </button>
                </div>

                <div className="mt-2 text-center">
                  <span className="text-[9px] font-mono text-slate-400">
                    ⚡ Powered by Grounded Twin Context · Responds in real-time
                  </span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AIAssistantWidget;
