import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Bot, User, Send, Download, 
  ArrowRight, RotateCcw, X, CheckCircle2 
} from "lucide-react";
import { playClickSound, playSuccessSound } from '../utils/sound';
import { generateStreamingResponse } from '../services/aiTwin';

const quickPrompts = [
  { label: "⚡ 30s Summary", text: "Give me a quick 30-second summary about Adhi." },
  { label: "🛠️ Skills", text: "What is Adhi's core tech stack?" },
  { label: "🚀 Projects", text: "What are Adhi's top projects?" },
  { label: "💼 Experience", text: "Tell me about Adhi's work experience." },
  { label: "🛍️ Freelance Store", text: "Tell me about Chandeshwara Enterprises." },
  { label: "📄 Resume & Contact", text: "How can I contact Adhi or get his resume?" }
];

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: "welcome-1",
      sender: "ai", 
      text: "👋 **Adhi's AI Twin**\n\n• **Who**: Full-Stack & Applied AI Engineer\n• **Built**: Sashverse SaaS, Chandeshwara E-Commerce & AI tools\n• **Stack**: React, Node.js, PostgreSQL, Python\n\n[View Projects] [Download Resume] [Contact Adhi]" 
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

    window.addEventListener("pointerdown", handleClickOutside, { capture: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handleClickOutside, { capture: true });
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
        text: "👋 **Adhi's AI Twin**\n\n• **Who**: Full-Stack & Applied AI Engineer\n• **Built**: Sashverse SaaS, Chandeshwara E-Commerce & AI tools\n• **Stack**: React, Node.js, PostgreSQL, Python\n\n[View Projects] [Download Resume] [Contact Adhi]" 
      }
    ]);
  };

  const handleActionClick = (target) => {
    try { playClickSound(); } catch (e) {}

    // 1. Direct PDF Resume Download
    if (target === 'resume') {
      const link = document.createElement('a');
      link.href = '/Adhi_Vignesh_Resume.pdf';
      link.download = 'Adhi_Vignesh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      try { playSuccessSound(); } catch (e) {}
      return;
    }

    // 2. External Web Links
    if (target.startsWith('http://') || target.startsWith('https://')) {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }

    // 3. Smooth in-page section scrolling
    setIsOpen(false);
    setTimeout(() => {
      const targetEl = document.getElementById(target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
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

    await generateStreamingResponse(
      textToSend,
      messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      (streamedText) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: streamedText } : msg
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
      return <p className="leading-relaxed font-sans text-xs">{msg.text}</p>;
    }

    // Match action tags like [View Projects], [View Skills], [Download Resume], [Contact Adhi], etc.
    const actionPattern = /\[(View [A-Za-z]+|Download Resume|Contact Adhi|Contact Me|Contact|Resume|Projects|Skills|Experience|Education|Freelance|Certifications|About)\]/gi;
    const actionMatches = [...msg.text.matchAll(actionPattern)];
    
    // Clean text by stripping out action brackets
    let cleanedText = msg.text.replace(actionPattern, '');
    // Clean any residual bracketed command tags
    cleanedText = cleanedText.replace(/\[(View|Download|Contact)[^\]]*\]/gi, '').trim();

    const targetMap = {
      'view projects': { label: 'View Projects', target: 'projects', icon: 'arrow' },
      'projects': { label: 'View Projects', target: 'projects', icon: 'arrow' },
      'view skills': { label: 'View Skills', target: 'skills', icon: 'arrow' },
      'skills': { label: 'View Skills', target: 'skills', icon: 'arrow' },
      'view experience': { label: 'View Experience', target: 'experience', icon: 'arrow' },
      'experience': { label: 'View Experience', target: 'experience', icon: 'arrow' },
      'view freelance': { label: 'View Freelance Store', target: 'freelance', icon: 'arrow' },
      'freelance': { label: 'View Freelance Store', target: 'freelance', icon: 'arrow' },
      'view education': { label: 'View Education', target: 'education', icon: 'arrow' },
      'education': { label: 'View Education', target: 'education', icon: 'arrow' },
      'view certifications': { label: 'View Certifications', target: 'certifications', icon: 'arrow' },
      'certifications': { label: 'View Certifications', target: 'certifications', icon: 'arrow' },
      'view about': { label: 'View About', target: 'about', icon: 'arrow' },
      'about': { label: 'View About', target: 'about', icon: 'arrow' },
      'view architecture': { label: 'View Architecture', target: 'experience', icon: 'arrow' },
      'download resume': { label: 'Download Resume (PDF)', target: 'resume', icon: 'download' },
      'resume': { label: 'Download Resume (PDF)', target: 'resume', icon: 'download' },
      'contact adhi': { label: 'Contact Adhi', target: 'contact', icon: 'contact' },
      'contact me': { label: 'Contact Adhi', target: 'contact', icon: 'contact' },
      'contact': { label: 'Contact Adhi', target: 'contact', icon: 'contact' }
    };

    const seenTargets = new Set();
    const foundActions = [];
    for (const match of actionMatches) {
      const key = match[1].toLowerCase().trim();
      const action = targetMap[key];
      if (action && !seenTargets.has(action.target)) {
        seenTargets.add(action.target);
        foundActions.push(action);
      }
    }

    const parseFormattedText = (rawText) => {
      const lines = rawText.split('\n');
      return lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        const isBullet = trimmed.startsWith('•') || /^\d+\./.test(trimmed);
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <div key={lineIdx} className={`leading-relaxed my-0.5 ${isBullet ? 'pl-2 -indent-2' : ''}`}>
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                const boldContent = part.slice(2, -2);
                return (
                  <strong key={partIdx} className="font-bold text-[#252722] dark:text-[#F5F2EB]">
                    {boldContent}
                  </strong>
                );
              }
              // Check if part contains a url like https://...
              if (part.includes('http://') || part.includes('https://')) {
                const urlParts = part.split(/(https?:\/\/[^\s)]+)/g);
                return urlParts.map((subPart, subIdx) => {
                  if (subPart.startsWith('http://') || subPart.startsWith('https://')) {
                    return (
                      <a
                        key={subIdx}
                        href={subPart}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#777C62] dark:text-[#ADB293] underline hover:opacity-80 transition-opacity font-medium break-all"
                      >
                        {subPart.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      </a>
                    );
                  }
                  return <span key={subIdx}>{subPart}</span>;
                });
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </div>
        );
      });
    };

    return (
      <div>
        <div className="leading-relaxed font-normal font-sans text-xs">
          {parseFormattedText(cleanedText)}
        </div>

        {foundActions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-[#E8E2D6] dark:border-[#2D3025]">
            {foundActions.map((act, idx) => {
              const isDownload = act.icon === 'download';
              return (
                <button
                  key={idx}
                  onClick={() => handleActionClick(act.target)}
                  className={
                    isDownload
                      ? "btn-primary !text-[11px] !py-1.5 !px-4 !rounded-full shadow-md active:scale-95 transition-all select-none cursor-pointer flex items-center gap-1.5"
                      : "btn-secondary !text-[11px] !py-1.5 !px-3.5 !rounded-full shadow-xs active:scale-95 transition-all select-none cursor-pointer flex items-center gap-1.5"
                  }
                >
                  {isDownload && <Download className="w-3 h-3 text-[#ADB293] dark:text-[#C6CCAA]" />}
                  {act.icon === 'contact' && <Send className="w-2.5 h-2.5 text-[#777C62] dark:text-[#ADB293]" />}
                  <span>{act.label}</span>
                  {act.icon === 'arrow' && <ArrowRight className="w-3 h-3 text-[#777C62] dark:text-[#ADB293]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs cursor-pointer"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 font-sans max-w-[calc(100vw-32px)]">
        
        {/* Sleek Floating Glass Launcher Pill */}
        {!isOpen && (
          <motion.button
            ref={launcherRef}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            onClick={handleToggle}
            aria-label="Open AI Assistant"
            className="btn-venom group flex items-center gap-2.5 !px-4 !py-2.5 shadow-2xl cursor-pointer select-none"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </span>
            <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              <Sparkles className="w-3 h-3 text-[#E2E8F0]" />
            </div>
            <span className="text-xs font-bold tracking-tight font-heading text-white">AI Twin</span>
          </motion.button>
        )}

        {/* High-End AI Assistant Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={widgetRef}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="w-[calc(100vw-32px)] sm:w-[430px] max-w-[430px] h-[540px] sm:h-[580px] max-h-[85vh] rounded-3xl bg-[#FFFDF9]/95 dark:bg-[#181914]/95 backdrop-blur-2xl border border-[#D8D1C5]/90 dark:border-[#383A2F]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Top Modern Glass Bar */}
              <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#FFFDF9]/85 dark:bg-[#181914]/85 backdrop-blur-md border-b border-[#E8E2D6] dark:border-[#2D3025] flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="relative w-8 h-8 rounded-xl bg-gradient-to-b from-[#2A2C26] to-[#0D0E0B] text-white flex items-center justify-center shadow-md border border-white/20 shrink-0">
                    <Sparkles className="w-4 h-4 text-[#ADB293]" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight whitespace-nowrap">
                        Adhi AI Twin
                      </p>
                      <span className="px-2 py-0.5 rounded-full bg-[#777C62]/10 dark:bg-[#ADB293]/15 text-[#5C614B] dark:text-[#C6CCAA] border border-[#777C62]/25 dark:border-[#ADB293]/30 text-[9px] font-mono font-bold shadow-2xs whitespace-nowrap shrink-0">
                        Live Grounded
                      </span>
                    </div>
                    <span className="text-[10px] text-[#7C7A72] dark:text-[#A8A79B] font-mono flex items-center gap-1 min-w-0 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                      <span className="truncate">Verified Portfolio Knowledge</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleClearHistory}
                    title="Reset Conversation"
                    aria-label="Reset Conversation"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full pill-venom-inactive flex items-center justify-center text-[#68675F] dark:text-[#A8A79B] hover:text-[#252722] dark:hover:text-[#F5F2EB] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleToggle}
                    aria-label="Close"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full pill-venom-inactive flex items-center justify-center text-[#68675F] dark:text-[#A8A79B] hover:text-[#252722] dark:hover:text-[#F5F2EB] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Message Stream Area */}
              <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 sm:space-y-3.5 custom-scrollbar text-xs bg-[#F7F4EC]/50 dark:bg-[#141510]/60">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-start gap-2 sm:gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#252722] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#252722]'
                        : 'bg-[#EFEAE1] dark:bg-[#24261F] text-[#777C62] dark:text-[#ADB293] border border-[#D8D1C5]/80 dark:border-[#383A2F]'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div className={`p-3 sm:p-4 rounded-2xl max-w-[88%] sm:max-w-[85%] min-w-0 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-b from-[#2D2F28] via-[#20211C] to-[#161713] text-[#F5F2EB] rounded-tr-xs font-medium shadow-md border border-white/10'
                        : 'bg-[#FFFDF9] dark:bg-[#1E201B] text-[#252722] dark:text-[#F5F2EB] border border-[#E5DFD3] dark:border-[#33352A] rounded-tl-xs shadow-2xs'
                    }`}>
                      {msg.text === '' && isTyping ? (
                        <div className="flex items-center gap-2 py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse delay-75" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse delay-150" />
                          <span className="text-[11px] font-mono text-[#777C62] dark:text-[#ADB293] font-medium ml-1">Thinking...</span>
                        </div>
                      ) : (
                        renderMessageText(msg)
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions Chips Track */}
              <div className="px-3.5 py-2.5 bg-[#FFFDF9]/90 dark:bg-[#181914]/90 border-t border-[#E8E2D6] dark:border-[#2D3025] shrink-0">
                <div className="overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[11px]">
                  {quickPrompts.map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(qp.text)}
                      disabled={isTyping}
                      className="pill-venom-inactive !px-3.5 !py-1.5 !rounded-full text-[11px] font-medium font-sans whitespace-nowrap cursor-pointer shrink-0 disabled:opacity-40 shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-1.5 select-none"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Pill Input Bar */}
              <div className="p-3 bg-[#FFFDF9]/95 dark:bg-[#181914]/95 border-t border-[#E8E2D6] dark:border-[#2D3025] shrink-0">
                <div className="flex items-center gap-2 bg-[#FFFDF9] dark:bg-[#1E201B] border border-[#D8D1C5] dark:border-[#383A2F] rounded-full px-3.5 py-1.5 focus-within:border-[#777C62] dark:focus-within:border-[#ADB293] focus-within:ring-2 focus-within:ring-[#777C62]/20 dark:focus-within:ring-[#ADB293]/20 transition-all shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.04)]">
                  <Sparkles className="w-3.5 h-3.5 text-[#777C62] dark:text-[#ADB293] shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask about Adhi's stack & projects..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    disabled={isTyping}
                    className="flex-1 min-w-0 bg-transparent text-xs text-[#252722] dark:text-[#F5F2EB] placeholder-[#88867D] dark:placeholder-[#9C9A8E] focus:outline-none py-1"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="btn-primary !w-8 !h-8 !p-0 !rounded-full text-white disabled:opacity-30 disabled:scale-100 enabled:hover:scale-105 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
                    aria-label="Send Message"
                  >
                    <Send className="w-3.5 h-3.5 -translate-x-0.2" />
                  </button>
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
