import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Copy, Check, Lock, Star, GitFork, 
  Briefcase, GraduationCap, MapPin, Mail, 
  Download, FileText, Sparkles, CheckCircle2, 
  Code, RefreshCw, Radio, Clock, Activity, GitCommit, GitBranch
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const GITHUB_USERNAME = 'VIGNESH79899';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const LINKEDIN_VANITY = 'adhi-vignesh-342431289';
const LINKEDIN_URL = `https://linkedin.com/in/${LINKEDIN_VANITY}`;
const RESUME_URL = "/Adhi_Vignesh_Resume.pdf";
const EMAIL_ADDRESS = "vigneshadhi773@gmail.com";

const LANG_COLORS = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-emerald-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-indigo-500',
  C: 'bg-slate-400',
  PHP: 'bg-purple-500'
};

const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const SocialProfileModal = ({ isOpen, type, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(type || 'github');
  
  // Real-time GitHub API state
  const [githubUser, setGithubUser] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubEvents, setGithubEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // End-to-End Real-Time Fetching for GitHub
  const fetchLiveGithubData = useCallback(async () => {
    setLoading(true);
    try {
      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=8`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=6`)
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setGithubUser(userData);
      }
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        const filtered = reposData.filter(r => r.name !== GITHUB_USERNAME);
        setGithubRepos(filtered.slice(0, 6));
      }
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setGithubEvents(eventsData);
      }
      setLastSynced(new Date());
    } catch (err) {
      console.warn("GitHub live API rate-limit/offline:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (type) setActiveTab(type);
  }, [type]);

  // Fetch live GitHub data whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchLiveGithubData();
    }
  }, [isOpen, fetchLiveGithubData]);

  // Load official LinkedIn Badge Script dynamically
  useEffect(() => {
    if (isOpen && activeTab === 'linkedin') {
      const scriptId = 'linkedin-profile-badge-script';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://platform.linkedin.com/badges/js/profile.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      } else if (window.IN && window.IN.parse) {
        try { window.IN.parse(); } catch {}
      }
    }
  }, [isOpen, activeTab]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = (text) => {
    try {
      playClickSound();
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      playSuccessSound();
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  const currentUrl = 
    activeTab === 'github' ? GITHUB_URL :
    activeTab === 'linkedin' ? LINKEDIN_URL :
    activeTab === 'resume' ? 'https://adhivignesh.dev/resume.pdf' :
    'mailto:' + EMAIL_ADDRESS;

  // Real-time computed profile values
  const userAvatar = githubUser?.avatar_url || 'https://avatars.githubusercontent.com/u/189199802?v=4';
  const displayName = githubUser?.name || 'Vignesh';
  const userBio = githubUser?.bio || 'B.Tech CSE (AIML) Student | AI & ML Enthusiast | Software & Web Developer\nPython • C • JavaScript • React • TypeScript';
  const publicReposCount = githubUser?.public_repos ?? 32;
  const followersCount = githubUser?.followers ?? 1;
  const followingCount = githubUser?.following ?? 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
        
        {/* Full-Screen Deep Frosted Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl transition-all"
        />

        {/* Browser Window Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFDF9] dark:bg-[#181914] text-[#252722] dark:text-[#F5F2EB] rounded-2xl sm:rounded-3xl border border-[#D8D1C5] dark:border-[#383A2F] shadow-2xl flex flex-col overflow-hidden z-10"
        >
          
          {/* Window Chrome Top Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#EFEAE1]/70 dark:bg-[#20211B]/80 border-b border-[#D8D1C5]/80 dark:border-[#383A2F]/80 backdrop-blur-md shrink-0">
            
            {/* macOS Style Traffic Dots */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity flex items-center justify-center group"
                title="Close"
              >
                <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <button 
                onClick={() => window.open(currentUrl, '_blank')}
                className="w-3 h-3 rounded-full bg-[#27C93F] hover:opacity-80 transition-opacity flex items-center justify-center group"
                title="Open in new window"
              >
                <ExternalLink className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            {/* Simulated Secure Address Bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/70 dark:bg-black/30 rounded-full border border-[#D8D1C5]/70 dark:border-[#383A2F]/70 text-[11px] font-mono text-[#68675F] dark:text-[#A8A79B] max-w-sm w-full mx-3 truncate">
              <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">{currentUrl}</span>
            </div>

            {/* Quick Switch Tabs */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => { playClickSound(); setActiveTab('linkedin'); }}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  activeTab === 'linkedin'
                    ? 'bg-[#0A66C2] text-white shadow-xs'
                    : 'text-[#68675F] dark:text-[#A8A79B] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('github'); }}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  activeTab === 'github'
                    ? 'bg-[#252722] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#252722] shadow-xs'
                    : 'text-[#68675F] dark:text-[#A8A79B] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="GitHub Profile"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('resume'); }}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  activeTab === 'resume'
                    ? 'bg-[#777C62] text-white shadow-xs'
                    : 'text-[#68675F] dark:text-[#A8A79B] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Resume PDF"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => { playClickSound(); setActiveTab('email'); }}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  activeTab === 'email'
                    ? 'bg-[#EA4335] text-white shadow-xs'
                    : 'text-[#68675F] dark:text-[#A8A79B] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title="Email & Contact"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="ml-2 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-[#68675F] dark:text-[#A8A79B] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">

            {/* VIEW 1: GITHUB 100% REAL-TIME LIVE PROFILE */}
            {activeTab === 'github' && (
              <div className="space-y-6">
                
                {/* Real-Time Live Status Bar */}
                <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="font-semibold">REAL-TIME GITHUB API STREAM</span>
                    {lastSynced && (
                      <span className="hidden sm:inline text-[10px] opacity-75">
                        · Synced {lastSynced.toLocaleTimeString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={fetchLiveGithubData}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] transition-colors cursor-pointer"
                    title="Fetch latest data from api.github.com"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    <span>{loading ? 'Fetching...' : 'Live Sync'}</span>
                  </button>
                </div>

                {/* Header Card with Real-Time Profile Data */}
                <div className="relative rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] text-white p-5 sm:p-6 border border-white/10 shadow-lg overflow-hidden">
                  
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      
                      {/* Real-Time GitHub Avatar Monogram */}
                      <div className="relative">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/20 shadow-md bg-gradient-to-br from-[#21262d] to-[#0d1117] flex flex-col items-center justify-center font-heading text-white select-none">
                          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#f0f6fc]">AV</span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#161b22]" title="Live on GitHub" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-bold font-heading">{displayName}</h2>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold border border-emerald-500/30">
                            LIVE
                          </span>
                        </div>
                        <p className="text-sm font-mono text-[#8b949e]">@{GITHUB_USERNAME}</p>
                        <p className="text-xs text-[#c9d1d9] mt-1 max-w-md whitespace-pre-line leading-relaxed">
                          {userBio}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs transition-colors shadow-sm cursor-pointer"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>Open on GitHub.com</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>

                      <button
                        onClick={() => handleCopy(GITHUB_URL)}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied Link!' : 'Copy Profile'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Real-Time Live Telemetry Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10 text-center">
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-base sm:text-lg font-bold font-mono text-white">{publicReposCount}</p>
                      <p className="text-[10px] text-[#8b949e] uppercase tracking-wider">Public Repos</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-base sm:text-lg font-bold font-mono text-amber-400">{followersCount}</p>
                      <p className="text-[10px] text-[#8b949e] uppercase tracking-wider">Followers</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <p className="text-base sm:text-lg font-bold font-mono text-emerald-400">{followingCount}</p>
                      <p className="text-[10px] text-[#8b949e] uppercase tracking-wider">Following</p>
                    </div>
                  </div>

                </div>

                {/* Real-Time Live Events & Commit Stream */}
                {githubEvents.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#A8A79B] mb-2.5 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Live Activity &amp; Push Stream (api.github.com/events)</span>
                    </h3>

                    <div className="space-y-2">
                      {githubEvents.slice(0, 4).map((evt) => {
                        const repoShort = evt.repo?.name ? evt.repo.name.replace(`${GITHUB_USERNAME}/`, '') : 'Repository';
                        const isPush = evt.type === 'PushEvent';
                        return (
                          <div 
                            key={evt.id}
                            className="p-2.5 rounded-xl border border-[#D8D1C5]/70 dark:border-[#383A2F]/70 bg-white/40 dark:bg-black/20 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isPush ? (
                                <GitCommit className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              ) : (
                                <GitBranch className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                              )}
                              <span className="font-semibold text-[#252722] dark:text-[#F5F2EB] truncate">
                                {isPush ? 'Pushed commits to' : 'Repository activity in'}
                              </span>
                              <span className="font-mono text-[#777C62] dark:text-[#ADB293] truncate">
                                {repoShort}
                              </span>
                            </div>

                            <span className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B] shrink-0 ml-2">
                              {formatRelativeTime(evt.created_at)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Real-Time Live Repositories Stream */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#A8A79B] flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-[#777C62] dark:text-[#ADB293]" />
                      <span>Live Repositories (Fetched in Real-Time)</span>
                    </h3>
                    <span className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B]">
                      Sort: Most Recently Updated
                    </span>
                  </div>

                  {githubRepos.length === 0 && loading ? (
                    <div className="p-8 text-center text-xs font-mono text-[#68675F] flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#777C62]" />
                      <span>Streaming real-time repositories from GitHub...</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {githubRepos.map((repo) => (
                        <a
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3.5 rounded-xl border border-[#D8D1C5] dark:border-[#383A2F] bg-white/50 dark:bg-black/20 hover:border-[#777C62] dark:hover:border-[#ADB293] hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-[#252722] dark:text-[#F5F2EB] group-hover:text-[#777C62] dark:group-hover:text-[#ADB293] transition-colors flex items-center gap-1.5 truncate">
                                <Star className="w-3 h-3 text-amber-500 shrink-0" />
                                <span className="truncate">{repo.name}</span>
                              </span>
                              <ExternalLink className="w-3 h-3 text-[#68675F] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                            </div>
                            <p className="text-[11px] text-[#68675F] dark:text-[#A8A79B] mt-1.5 line-clamp-2 leading-relaxed">
                              {repo.description || "Production repository by Adhi Vignesh with active commit history."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#D8D1C5]/50 dark:border-[#383A2F]/50 text-[10px] font-mono">
                            <div className="flex items-center gap-1.5">
                              {repo.language && (
                                <>
                                  <span className={`w-2 h-2 rounded-full ${LANG_COLORS[repo.language] || 'bg-[#777C62]'}`} />
                                  <span className="text-[#68675F] dark:text-[#A8A79B]">{repo.language}</span>
                                </>
                              )}
                              {repo.stargazers_count > 0 && (
                                <span className="ml-2 text-amber-500 flex items-center gap-0.5">
                                  ★ {repo.stargazers_count}
                                </span>
                              )}
                            </div>
                            <span className="text-[#68675F] dark:text-[#A8A79B] text-[9px]">
                              {formatRelativeTime(repo.updated_at)}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Real-Time GitHub Stats Embeds */}
                <div className="rounded-2xl p-4 bg-[#EFEAE1]/50 dark:bg-[#20211B]/60 border border-[#D8D1C5] dark:border-[#383A2F]">
                  <p className="text-xs font-mono font-bold text-[#68675F] dark:text-[#A8A79B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C1A17F]" />
                    <span>Real-Time SVG Telemetry Badges</span>
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <img 
                      src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=777C62&text_color=68675F&icon_color=C1A17F`}
                      alt="GitHub Stats" 
                      className="w-full sm:w-1/2 rounded-xl"
                      loading="lazy"
                    />
                    <img 
                      src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=777C62&text_color=68675F`}
                      alt="Top Languages" 
                      className="w-full sm:w-1/2 rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: LINKEDIN LIVE EMBED & VERIFIED PROFILE */}
            {activeTab === 'linkedin' && (
              <div className="space-y-6">

                {/* LinkedIn Live Connection Status */}
                <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A66C2] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A66C2]" />
                    </span>
                    <span className="font-semibold">OFFICIAL LINKEDIN PLATFORM EMBED</span>
                  </div>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#0A66C2] font-semibold text-[11px] hover:underline"
                  >
                    <span>linkedin.com/in/{LINKEDIN_VANITY}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Official LinkedIn Public Profile Badge (Live from platform.linkedin.com) */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1F1A] border border-[#D8D1C5] dark:border-[#383A2F] shadow-sm flex flex-col items-center text-center">
                  <div 
                    className="badge-base LI-profile-badge my-1" 
                    data-locale="en_US" 
                    data-size="large" 
                    data-theme="dark" 
                    data-type="VERTICAL" 
                    data-vanity={LINKEDIN_VANITY} 
                    data-version="v1"
                  >
                    <a 
                      className="badge-base__link LI-simple-link text-xs font-mono text-[#0A66C2] hover:underline" 
                      href={`https://in.linkedin.com/in/${LINKEDIN_VANITY}?trk=profile-badge`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Loading Live LinkedIn Profile Badge...
                    </a>
                  </div>
                </div>

                {/* LinkedIn Card Header */}
                <div className="relative rounded-2xl bg-white dark:bg-[#1E1F1A] border border-[#D8D1C5] dark:border-[#383A2F] shadow-lg overflow-hidden">
                  
                  {/* LinkedIn Signature Blue Gradient Banner */}
                  <div className="h-24 sm:h-28 w-full bg-gradient-to-r from-[#004182] via-[#0A66C2] to-[#0073b1] relative">
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-[10px] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        Verified Profile
                      </span>
                    </div>
                  </div>

                  {/* Profile Info Overlay */}
                  <div className="px-5 pb-5 pt-0 relative">
                    
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
                      
                      {/* Monogram Avatar */}
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-[#1E1F1A] shadow-xl bg-gradient-to-br from-[#252722] via-[#2D3028] to-[#161713] dark:from-[#31332C] dark:to-[#181914] text-[#F5F2EB] flex flex-col items-center justify-center font-heading select-none">
                          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#E7E1D6]">AV</span>
                          <span className="text-[9px] font-mono tracking-widest text-[#ADB293] uppercase mt-0.5">DEV</span>
                        </div>
                        <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#0A66C2] text-white shadow-md">
                          <FaLinkedin className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <a
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                        >
                          <FaLinkedin className="w-3.5 h-3.5" />
                          <span>Connect on LinkedIn</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>

                        <button
                          onClick={() => handleCopy(LINKEDIN_URL)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#D8D1C5] dark:border-[#383A2F] hover:bg-black/5 dark:hover:bg-white/5 text-xs transition-colors font-medium cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copied' : 'Share'}</span>
                        </button>
                      </div>

                    </div>

                    {/* Headline & Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB]">
                          Adhi Vignesh
                        </h2>
                        <span className="text-[11px] font-mono text-[#68675F] dark:text-[#A8A79B]">(He/Him)</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#252722] dark:text-[#F5F2EB] font-medium mt-1 leading-snug">
                        Full-Stack Developer &amp; Applied AI Engineer · Building Scalable Web &amp; AI Systems
                      </p>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#68675F] dark:text-[#A8A79B] mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#777C62]" />
                          Hyderabad, Telangana, India
                        </span>
                        <span>•</span>
                        <span className="text-[#0A66C2] font-semibold">500+ Connections</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Open to Work</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Experience Highlights */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#A8A79B] mb-3 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>Experience Timeline</span>
                  </h3>

                  <div className="space-y-3">
                    {[
                      {
                        company: 'Chandeshwara Enterprises',
                        role: 'Lead Full-Stack Developer & Webmaster (Freelance)',
                        period: 'Jul 2025 – Present',
                        location: 'Hyderabad, India',
                        desc: 'Architected and deployed production e-commerce platform with Razorpay checkout and Render cloud hosting.'
                      },
                      {
                        company: 'Sashverse Technologies',
                        role: 'Full Stack Developer Intern',
                        period: 'Apr 2026 – Jun 2026',
                        location: 'Hyderabad, India',
                        desc: 'Engineered sub-15ms real-time Server-Sent Events (SSE) streaming and JWT RBAC on Workverse SaaS platform.'
                      },
                      {
                        company: 'StaxTech',
                        role: 'Web Development Intern',
                        period: 'May 2025 – Jun 2025',
                        location: 'Remote',
                        desc: 'Built luxury e-commerce watch interfaces and dynamic cart workflows with modern JavaScript.'
                      }
                    ].map((exp, i) => (
                      <div 
                        key={i}
                        className="p-3.5 rounded-xl border border-[#D8D1C5] dark:border-[#383A2F] bg-white/40 dark:bg-black/20"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="font-semibold text-xs text-[#252722] dark:text-[#F5F2EB]">{exp.role}</h4>
                          <span className="font-mono text-[10px] text-[#68675F] dark:text-[#A8A79B]">{exp.period}</span>
                        </div>
                        <p className="text-xs font-medium text-[#777C62] dark:text-[#ADB293] mt-0.5">{exp.company}</p>
                        <p className="text-[11px] text-[#68675F] dark:text-[#A8A79B] mt-1 leading-relaxed">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#A8A79B] mb-2 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#777C62]" />
                    <span>Education</span>
                  </h3>
                  <div className="p-3.5 rounded-xl border border-[#D8D1C5] dark:border-[#383A2F] bg-white/40 dark:bg-black/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-[#252722] dark:text-[#F5F2EB]">Aurora University</h4>
                      <p className="text-xs text-[#777C62] dark:text-[#ADB293]">B.Tech in Computer Science Engineering (AI &amp; ML)</p>
                      <p className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B]">2024 – 2028 · In Progress</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                      Undergrad
                    </span>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: RESUME VIEWER */}
            {activeTab === 'resume' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#EFEAE1]/60 dark:bg-[#20211B]/60 border border-[#D8D1C5] dark:border-[#383A2F]">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#777C62] dark:text-[#ADB293]" />
                    <div>
                      <p className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB]">Adhi_Vignesh_Resume.pdf</p>
                      <p className="text-[10px] text-[#68675F] dark:text-[#A8A79B]">Software Engineer &amp; Applied AI</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={RESUME_URL}
                      download="Adhi_Vignesh_Resume.pdf"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#777C62] hover:bg-[#5C604B] text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-[#D8D1C5] dark:border-[#383A2F] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-[#68675F] dark:text-[#A8A79B]"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="w-full h-[62vh] rounded-xl overflow-hidden border border-[#D8D1C5] dark:border-[#383A2F] bg-[#181914] shadow-inner">
                  <iframe 
                    src={`${RESUME_URL}#toolbar=0`} 
                    className="w-full h-full" 
                    title="Adhi Vignesh Resume"
                  />
                </div>
              </div>
            )}

            {/* VIEW 4: EMAIL / CONTACT COMPOSER */}
            {activeTab === 'email' && (
              <div className="space-y-5 max-w-lg mx-auto py-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#EA4335]/15 text-[#EA4335] flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-[#252722] dark:text-[#F5F2EB]">Get in Touch with Adhi</h3>
                  <p className="text-xs text-[#68675F] dark:text-[#A8A79B] mt-1">
                    Available for full-time software engineering roles, internships, and freelance projects.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1F1A] border border-[#D8D1C5] dark:border-[#383A2F] shadow-sm space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F2EB]/60 dark:bg-[#181914]/60 border border-[#D8D1C5]/60 dark:border-[#383A2F]/60">
                    <div>
                      <p className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B] uppercase">Direct Email</p>
                      <p className="text-xs sm:text-sm font-semibold font-mono text-[#252722] dark:text-[#F5F2EB]">{EMAIL_ADDRESS}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(EMAIL_ADDRESS)}
                      className="p-2 rounded-lg bg-white dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#383A2F] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-[#68675F] dark:text-[#A8A79B] transition-colors"
                      title="Copy email address"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F2EB]/60 dark:bg-[#181914]/60 border border-[#D8D1C5]/60 dark:border-[#383A2F]/60">
                    <div>
                      <p className="text-[10px] font-mono text-[#68675F] dark:text-[#A8A79B] uppercase">Phone / WhatsApp</p>
                      <p className="text-xs sm:text-sm font-semibold font-mono text-[#252722] dark:text-[#F5F2EB]">+91 79899 49808</p>
                    </div>
                    <button
                      onClick={() => handleCopy('+917989949808')}
                      className="p-2 rounded-lg bg-white dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#383A2F] hover:bg-black/5 dark:hover:bg-white/5 text-xs text-[#68675F] dark:text-[#A8A79B] transition-colors"
                      title="Copy phone number"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}?subject=Opportunity%20Discussion%20-%20Portfolio&body=Hi%20Adhi,%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect%20regarding...`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#252722] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#252722] font-semibold text-xs shadow-md hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email Client</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-[#D8D1C5] dark:border-[#383A2F] text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer Strip */}
          <div className="px-4 py-2.5 bg-[#EFEAE1]/50 dark:bg-[#20211B]/60 border-t border-[#D8D1C5]/70 dark:border-[#383A2F]/70 flex items-center justify-between text-[11px] font-mono text-[#68675F] dark:text-[#A8A79B] shrink-0">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black/40 border border-[#D8D1C5] dark:border-[#383A2F] text-[10px]">ESC</kbd> to exit popup</span>
            <button 
              onClick={() => window.open(currentUrl, '_blank')}
              className="flex items-center gap-1 text-[#777C62] dark:text-[#ADB293] hover:underline"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default SocialProfileModal;
