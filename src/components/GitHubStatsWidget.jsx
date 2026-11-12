import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaCodeBranch, FaStar, FaSyncAlt, 
  FaCheckCircle, FaBolt, FaLayerGroup, FaExternalLinkAlt, 
  FaCode, FaCalendarAlt, FaFire, FaPalette
} from 'react-icons/fa';
import CountUp from './CountUp';
import { playClickSound, playSuccessSound } from '../utils/sound';
import contributionsByYear from '../data/githubContributionsByYear.json';

const GITHUB_USERNAME = 'VIGNESH79899';
const CACHE_KEY = `github_telemetry_v5_${GITHUB_USERNAME}`;
const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache

// Curated definitions for user-selected featured repositories
const FEATURED_REPO_KEYS = [
  'App_Issue_Tracking_System',
  'AQI',
  'vault-eagle',
  'Eco-Track'
];

const CURATED_REPOS = {
  'App_Issue_Tracking_System': {
    name: 'App_Issue_Tracking_System',
    lang: 'TypeScript',
    stars: 0,
    url: `https://github.com/${GITHUB_USERNAME}/App_Issue_Tracking_System`,
    desc: 'Application issue tracking system built for software teams to manage bug lifecycles and sprint resolution.'
  },
  'AQI': {
    name: 'AQI',
    lang: 'TypeScript',
    stars: 0,
    url: `https://github.com/${GITHUB_USERNAME}/AQI`,
    desc: 'Air quality index prediction engine leveraging PCA and Random Forest machine learning models.'
  },
  'vault-eagle': {
    name: 'vault-eagle',
    lang: 'TypeScript',
    stars: 0,
    url: `https://github.com/${GITHUB_USERNAME}/vault-eagle`,
    desc: 'Secure vault and credential management system with granular access control and token-based authentication.'
  },
  'Eco-Track': {
    name: 'Eco-Track',
    lang: 'TypeScript',
    stars: 0,
    url: `https://github.com/${GITHUB_USERNAME}/Eco-Track`,
    desc: 'Smart eco-tracking application to estimate daily and weekly CO₂ emissions using data analysis and TypeScript logic.'
  }
};

// Verified fallback defaults in case of network throttle or API rate limiting
const DEFAULT_FALLBACK = {
  profile: {
    login: GITHUB_USERNAME,
    name: "Adhi Vignesh",
    public_repos: 32,
    followers: 1,
    avatar_url: "https://avatars.githubusercontent.com/u/189199802?v=4",
    created_at: "2024-11-21T05:46:38Z",
    bio: "B.Tech CSE (AIML) Student | Software & Web Developer"
  },
  totalStars: 6,
  totalContributions: 595,
  topLanguages: [
    { name: "TypeScript", count: 13, pct: 59, color: "bg-[#777C62]" },
    { name: "JavaScript", count: 5, pct: 23, color: "bg-[#8C7258]" },
    { name: "HTML / CSS", count: 3, pct: 14, color: "bg-[#ADB293]" },
    { name: "PHP / SQL", count: 1, pct: 4, color: "bg-[#C1A17F]" }
  ],
  topRepos: [
    CURATED_REPOS['App_Issue_Tracking_System'],
    CURATED_REPOS['AQI'],
    CURATED_REPOS['vault-eagle'],
    CURATED_REPOS['Eco-Track']
  ]
};

const GitHubStatsWidget = () => {
  const [data, setData] = useState(DEFAULT_FALLBACK);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [colorScheme, setColorScheme] = useState('emerald'); // 'emerald' (Native GitHub) or 'olive' (Portfolio Theme)
  const [hoveredCell, setHoveredCell] = useState(null);

  // Selected year dataset
  const currentYearData = useMemo(() => {
    return contributionsByYear[selectedYear] || contributionsByYear['2026'];
  }, [selectedYear]);

  // Guaranteed featured repositories list - strictly user chosen
  const featuredRepos = useMemo(() => {
    return FEATURED_REPO_KEYS.map((key) => {
      const live = (data?.topRepos || []).find(
        (r) => r && r.name && r.name.toLowerCase() === key.toLowerCase()
      );
      if (live) {
        return {
          name: live.name,
          lang: live.lang || CURATED_REPOS[key]?.lang || "TypeScript",
          stars: live.stars ?? 0,
          url: live.url || CURATED_REPOS[key]?.url,
          desc: live.desc || CURATED_REPOS[key]?.desc
        };
      }
      return CURATED_REPOS[key];
    });
  }, [data.topRepos]);

  // Group days into 53 weeks starting Sunday for the selected year
  const weeks = useMemo(() => {
    const rawDays = currentYearData.days || [];
    const weekCols = [];
    let currentWeek = [];

    // Pad beginning if first day is not Sunday
    const firstDay = rawDays[0];
    const padCount = firstDay ? firstDay.dayOfWeek : 0;
    for (let p = 0; p < padCount; p++) {
      currentWeek.push(null);
    }

    rawDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weekCols.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weekCols.push(currentWeek);
    }

    return weekCols;
  }, [currentYearData]);

  // Derive month labels above each week column
  const monthLabels = useMemo(() => {
    let lastMonth = '';
    return weeks.map((week) => {
      const validDay = week.find((d) => d !== null);
      if (!validDay) return '';
      if (validDay.month !== lastMonth) {
        lastMonth = validDay.month;
        return validDay.month;
      }
      return '';
    });
  }, [weeks]);

  // Fetch real live metrics from GitHub API
  const fetchGitHubMetrics = async (force = false) => {
    if (!force) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (
            Date.now() - parsed.timestamp < CACHE_EXPIRY_MS &&
            parsed.data &&
            parsed.data.profile &&
            parsed.data.profile.public_repos > 0
          ) {
            setData(parsed.data);
            setLastUpdated(new Date(parsed.timestamp));
            setIsLive(true);
            return;
          }
        }
      } catch (e) {}
    }

    setLoading(true);
    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!userRes.ok) throw new Error("Failed user fetch");
      const user = await userRes.json();

      // 2. Fetch User Repositories
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
      if (!reposRes.ok) throw new Error("Failed repos fetch");
      const repos = await reposRes.json();

      // Calculate real language distribution
      const langCounts = {};
      let totalStars = 0;
      let reposWithLang = 0;

      repos.forEach((repo) => {
        totalStars += repo.stargazers_count || 0;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          reposWithLang++;
        }
      });

      const colorMap = {
        TypeScript: "bg-[#777C62]",
        JavaScript: "bg-[#8C7258]",
        Python: "bg-[#5E634D] dark:bg-[#ADB293]",
        HTML: "bg-[#ADB293]",
        PHP: "bg-[#C1A17F]",
        C: "bg-[#252722] dark:bg-[#F5F2EB]"
      };

      const sortedLangs = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({
          name,
          count,
          pct: reposWithLang > 0 ? Math.round((count / reposWithLang) * 100) : 0,
          color: colorMap[name] || "bg-[#777C62]"
        }));

      // Map the 4 user-selected featured repositories with live data if available
      const topRepos = FEATURED_REPO_KEYS.map((key) => {
        const liveRepo = repos.find(
          (r) => r.name.toLowerCase() === key.toLowerCase()
        );
        if (liveRepo) {
          return {
            name: liveRepo.name,
            lang: liveRepo.language || CURATED_REPOS[key]?.lang || "TypeScript",
            stars: liveRepo.stargazers_count || 0,
            url: liveRepo.html_url,
            desc: liveRepo.description || CURATED_REPOS[key]?.desc || "Active software repository under active development."
          };
        }
        return CURATED_REPOS[key];
      });

      const freshData = {
        profile: {
          login: user.login,
          name: user.name || "Adhi Vignesh",
          public_repos: user.public_repos || DEFAULT_FALLBACK.profile.public_repos,
          followers: user.followers || 0,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          bio: user.bio || DEFAULT_FALLBACK.profile.bio
        },
        totalStars,
        totalContributions: 595,
        topLanguages: sortedLangs.length > 0 ? sortedLangs : DEFAULT_FALLBACK.topLanguages,
        topRepos: topRepos.length > 0 ? topRepos : DEFAULT_FALLBACK.topRepos
      };

      setData(freshData);
      setIsLive(true);
      const now = Date.now();
      setLastUpdated(new Date(now));

      // Cache locally
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: freshData }));
      } catch (e) {}

    } catch (err) {
      console.warn("Using verified GitHub fallback data due to rate-limit/offline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear out any old cached repositories from prior versions
    try {
      ['github_stats_', 'github_telemetry_v1_', 'github_telemetry_v2_', 'github_telemetry_v3_', 'github_telemetry_v4_'].forEach(prefix => {
        localStorage.removeItem(`${prefix}${GITHUB_USERNAME}`);
      });
    } catch (e) {}

    fetchGitHubMetrics(false);
  }, []);

  const handleManualRefresh = () => {
    try { playClickSound(); } catch (e) {}
    fetchGitHubMetrics(true).then(() => {
      try { playSuccessSound(); } catch (e) {}
    });
  };

  const handleYearChange = (year) => {
    try { playClickSound(); } catch (e) {}
    setSelectedYear(year);
  };

  const toggleColorScheme = () => {
    try { playClickSound(); } catch (e) {}
    setColorScheme(prev => prev === 'emerald' ? 'olive' : 'emerald');
  };

  // Color mappings
  const getCellClass = (level) => {
    if (colorScheme === 'emerald') {
      // Exact GitHub colors matching user screenshot
      switch (level) {
        case 1: return 'bg-[#0e4429] border-[#003820]';
        case 2: return 'bg-[#006d32] border-[#005a29]';
        case 3: return 'bg-[#26a641] border-[#218838]';
        case 4: return 'bg-[#39d353] border-[#28a745] shadow-[0_0_6px_rgba(57,211,83,0.4)]';
        default: return 'bg-[#161b22] border-[#1b1f24]';
      }
    } else {
      // Olive palette
      switch (level) {
        case 1: return 'bg-[#484d3d] border-[#393d30]';
        case 2: return 'bg-[#5f654f] border-[#4f5442]';
        case 3: return 'bg-[#777C62] border-[#666a54]';
        case 4: return 'bg-[#ADB293] border-[#9aa082] shadow-[0_0_6px_rgba(173,178,147,0.4)]';
        default: return 'bg-[#252722] border-[#343630]';
      }
    }
  };

  return (
    <section id="github-metrics" className="my-16 font-sans">
      <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#1E201B] border border-[#D8D1C5] dark:border-[#414239] p-4 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Soft Background Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[140px] pointer-events-none rounded-full" />

        {/* Header with Live Status & Refresh Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D8D1C5]/70 dark:border-[#414239] relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="pro-badge-olive">
                DEVELOPER METRICS &amp; ACTIVITY
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#777C62]/10 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/20 dark:border-[#ADB293]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
                {isLive ? "LIVE GITHUB API" : "VERIFIED GITHUB DATA"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB] tracking-tight flex items-center gap-2.5">
              <FaGithub className="text-[#777C62] dark:text-[#ADB293]" />
              <span>Real-Time GitHub Intelligence</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-1 font-normal">
              Direct telemetry from <code className="font-mono text-[#252722] dark:text-[#F5F2EB]">github.com/{GITHUB_USERNAME}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handleManualRefresh}
              disabled={loading}
              title="Refresh live metrics from GitHub API"
              className="btn-secondary !py-2 !px-4 !rounded-full text-xs flex items-center gap-2 font-heading font-semibold cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              <FaSyncAlt className={`text-xs ${loading ? 'animate-spin text-[#777C62] dark:text-[#ADB293]' : 'text-[#777C62] dark:text-[#ADB293]'}`} />
              <span className="hidden sm:inline text-xs font-mono">Sync</span>
            </button>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs flex items-center gap-2 !px-4 !py-2 !rounded-full shadow-md"
            >
              <FaGithub className="text-sm" />
              <span>@{GITHUB_USERNAME}</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        </div>

        {/* 4 Real-Time Telemetry Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8 relative z-10">
          
          {/* Card 1: Dynamic Year Contributions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F2EB]/70 dark:bg-[#181915] border border-[#D8D1C5]/70 dark:border-[#414239] space-y-1">
            <div className="flex items-center justify-between text-[#8C7258] dark:text-[#C1A17F] mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3]">
                TOTAL CONTRIBUTIONS
              </span>
              <FaFire className="text-xs text-[#8C7258] dark:text-[#C1A17F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB]">
              <CountUp to={currentYearData.total} end={currentYearData.total} />
              <span className="text-lg font-normal text-[#777C62] dark:text-[#ADB293]">+</span>
            </div>
            <span className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] block">
              {selectedYear === '2026' ? 'In the last year (GitHub commits)' : `In ${selectedYear} (GitHub commits)`}
            </span>
          </div>

          {/* Card 2: 32+ Public Repos */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F2EB]/70 dark:bg-[#181915] border border-[#D8D1C5]/70 dark:border-[#414239] space-y-1">
            <div className="flex items-center justify-between text-[#777C62] dark:text-[#ADB293] mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3]">
                PUBLIC REPOS
              </span>
              <FaCodeBranch className="text-xs" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB]">
              <CountUp to={data.profile.public_repos} end={data.profile.public_repos} />
              <span className="text-lg font-normal text-[#777C62] dark:text-[#ADB293]">+</span>
            </div>
            <span className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] block">Active Git repositories</span>
          </div>

          {/* Card 3: 6 Stars Earned */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F2EB]/70 dark:bg-[#181915] border border-[#D8D1C5]/70 dark:border-[#414239] space-y-1">
            <div className="flex items-center justify-between text-[#8C7258] dark:text-[#C1A17F] mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3]">
                STARS EARNED
              </span>
              <FaStar className="text-xs" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB]">
              <CountUp to={data.totalStars} end={data.totalStars} />
            </div>
            <span className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] block">Across public projects</span>
          </div>

          {/* Card 4: Dominant Stack */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F2EB]/70 dark:bg-[#181915] border border-[#D8D1C5]/70 dark:border-[#414239] space-y-1">
            <div className="flex items-center justify-between text-[#777C62] dark:text-[#ADB293] mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#68675F] dark:text-[#C0BFB3]">
                PRIMARY CODEBASE
              </span>
              <FaLayerGroup className="text-xs" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-heading text-[#252722] dark:text-[#F5F2EB] truncate">
              {data.topLanguages[0]?.name || "TypeScript"}
            </div>
            <span className="text-[11px] text-[#777C62] dark:text-[#ADB293] font-mono font-semibold block">
              {data.topLanguages[0]?.pct}% of repositories
            </span>
          </div>

        </div>

        {/* Authentic Interactive GitHub Contribution Calendar (Matching User Screenshot) */}
        <div className="mb-8 relative z-10">
          <div className="p-3.5 sm:p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] text-white shadow-xl relative overflow-hidden">
            
            {/* Header: Title, Year Tabs & Color Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#30363d]/80">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base font-semibold text-[#e6edf3] font-heading flex items-center gap-2">
                  <FaGithub className="text-base text-[#7d8590]" />
                  <span>{currentYearData.title}</span>
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>Active Cadence</span>
                </span>
              </div>

              {/* Year Selector Tabs & Scheme Toggle */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <button
                  onClick={toggleColorScheme}
                  title="Toggle Emerald / Olive palette"
                  className="pill-venom-dark px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
                >
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    colorScheme === 'emerald' 
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]' 
                      : 'bg-[#C6CCAA] shadow-[0_0_8px_rgba(198,204,170,0.9)]'
                  }`} />
                  <FaPalette className="text-[10px] text-[#A8A79B]" />
                  <span className="text-white/95">{colorScheme === 'emerald' ? 'Emerald' : 'Olive'}</span>
                </button>

                <div className="flex items-center bg-[#07090d]/90 p-1 rounded-full border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] backdrop-blur-md gap-0.5">
                  {['2026', '2025', '2024'].map((year) => {
                    const isSelected = selectedYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className={`px-2.5 sm:px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'pill-venom-active shadow-md text-white'
                            : 'text-[#7d8590] hover:text-[#e6edf3] hover:bg-white/5'
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sm:hidden text-[10px] font-mono text-[#7d8590] mb-1.5 flex items-center justify-end gap-1 whitespace-nowrap">
              <span>Swipe horizontally for full year</span>
              <span>→</span>
            </div>

            {/* Interactive Grid Container - Stretches edge-to-edge */}
            <div className="overflow-x-auto py-2 relative">
              <div className="w-full min-w-[680px] select-none">
                
                {/* Month Headers - Distributed across 100% width */}
                <div className="flex w-full text-[10px] sm:text-[11px] font-mono text-[#7d8590] mb-2 pl-7 sm:pl-8">
                  {monthLabels.map((month, idx) => (
                    <div
                      key={idx}
                      className="flex-1 text-left shrink-0 overflow-visible"
                    >
                      {month && <span className="block font-medium">{month}</span>}
                    </div>
                  ))}
                </div>

                {/* Grid: 7 Rows (Sun to Sat) with Mon/Wed/Fri labels */}
                <div className="flex w-full gap-1 sm:gap-1.5 items-stretch">
                  
                  {/* Day of Week Labels */}
                  <div className="flex flex-col justify-between text-[9px] sm:text-[10px] font-mono text-[#7d8590] pr-2 shrink-0 select-none py-[1px]">
                    <span className="leading-none opacity-0 select-none text-[8px]">S</span>
                    <span className="leading-none">Mon</span>
                    <span className="leading-none opacity-0 select-none text-[8px]">T</span>
                    <span className="leading-none">Wed</span>
                    <span className="leading-none opacity-0 select-none text-[8px]">T</span>
                    <span className="leading-none">Fri</span>
                    <span className="leading-none opacity-0 select-none text-[8px]">S</span>
                  </div>

                  {/* 53 Columns of Weeks - full width flex-1 */}
                  <div className="flex-1 flex w-full gap-1 sm:gap-1.5">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex-1 flex flex-col gap-1 sm:gap-1.5 justify-between">
                        {week.map((day, dIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={dIdx}
                                className="w-full aspect-square rounded-[2px] sm:rounded-[3px] opacity-0 pointer-events-none"
                              />
                            );
                          }

                          return (
                            <div
                              key={dIdx}
                              onMouseEnter={() => setHoveredCell(day)}
                              onMouseLeave={() => setHoveredCell(null)}
                              className={`w-full aspect-square rounded-[2px] sm:rounded-[3px] border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getCellClass(
                                day.level
                              )}`}
                              title={`${day.count > 0 ? day.count : 'No'} contributions on ${day.date}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>

            {/* Hover Tooltip Overlay */}
            <div className="min-h-6 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-[#7d8590] mt-3 pt-3 border-t border-[#30363d]/80">
              <div className="min-w-0">
                {hoveredCell ? (
                  <span className="text-[#e6edf3] font-medium flex items-center gap-1.5 animate-fadeIn">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${getCellClass(hoveredCell.level)}`} />
                    <span className="truncate">
                      {hoveredCell.count > 0 ? `${hoveredCell.count} contributions` : 'No contributions'} on {hoveredCell.date}
                    </span>
                  </span>
                ) : (
                  <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#58a6ff] hover:underline transition-colors inline-block"
                  >
                    Learn how we count contributions
                  </a>
                )}
              </div>

              {/* Less / More Legend */}
              <div className="flex items-center gap-1.5 text-[10px] shrink-0 self-start sm:self-auto">
                <span>Less</span>
                <div className={`w-[10px] h-[10px] rounded-[2px] border ${getCellClass(0)}`} />
                <div className={`w-[10px] h-[10px] rounded-[2px] border ${getCellClass(1)}`} />
                <div className={`w-[10px] h-[10px] rounded-[2px] border ${getCellClass(2)}`} />
                <div className={`w-[10px] h-[10px] rounded-[2px] border ${getCellClass(3)}`} />
                <div className={`w-[10px] h-[10px] rounded-[2px] border ${getCellClass(4)}`} />
                <span>More</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2-Column Deep Dive: Language Distribution & Top Active Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 mb-8">
          
          {/* Left Column: Dynamic Real Language Distribution (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#181915] border border-[#D8D1C5] dark:border-[#414239] space-y-4 shadow-2xs">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D1C5]/70 dark:border-[#414239] pb-3">
                <span className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading flex items-center gap-1.5">
                  <FaLayerGroup className="text-[#777C62] dark:text-[#ADB293] shrink-0" />
                  <span>Real Repository Code Breakdown</span>
                </span>
                <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] shrink-0">
                  Calculated Live
                </span>
              </div>

              {/* Stacked Progress Bar */}
              <div className="w-full h-3 rounded-full bg-[#E7E1D6]/60 dark:bg-[#2b2d26] flex overflow-hidden p-0.5 border border-[#D8D1C5] dark:border-[#414239]">
                {data.topLanguages.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${lang.pct}%` }}
                    className={`h-full ${lang.color} transition-all duration-700`}
                    title={`${lang.name}: ${lang.pct}% (${lang.count} repos)`}
                  />
                ))}
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 pt-1">
                {data.topLanguages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#F5F2EB]/70 dark:bg-[#1E201B] border border-[#D8D1C5]/70 dark:border-[#414239] flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${lang.color} shrink-0`} />
                      <span className="font-semibold text-[#252722] dark:text-[#F5F2EB] truncate">{lang.name}</span>
                      <span className="text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3] shrink-0">({lang.count} repos)</span>
                    </div>
                    <span className="font-mono font-bold text-[#777C62] dark:text-[#ADB293] shrink-0">{lang.pct}%</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Top Active Public Repositories (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#181915] border border-[#D8D1C5] dark:border-[#414239] space-y-3 shadow-2xs">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D1C5]/70 dark:border-[#414239] pb-3">
                <span className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading flex items-center gap-2">
                  <FaCode className="text-[#777C62] dark:text-[#ADB293] shrink-0" />
                  <span>Top Active Public Repositories</span>
                </span>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-venom-inactive !px-3 !py-1 text-xs font-mono font-bold text-[#777C62] dark:text-[#ADB293] inline-flex items-center gap-1.5 shadow-2xs hover:border-[#777C62] shrink-0"
                >
                  <span>All 32 Repos</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {featuredRepos.map((repo, idx) => (
                  <a
                    key={idx}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#F5F2EB]/70 dark:bg-[#1E201B] border border-[#D8D1C5]/70 dark:border-[#414239] hover:border-[#777C62] dark:hover:border-[#ADB293] transition-all duration-200 block group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading group-hover:text-[#777C62] dark:group-hover:text-[#ADB293] transition-colors truncate">
                        {repo.name}
                      </h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFFDF9] dark:bg-[#252620] text-[#777C62] dark:text-[#ADB293] border border-[#D8D1C5] dark:border-[#414239] shrink-0">
                        {repo.lang}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] leading-relaxed line-clamp-2">
                      {repo.desc}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#D8D1C5]/40 dark:border-[#414239]/40 flex items-center justify-between gap-2 text-[10px] font-mono text-[#68675F] dark:text-[#C0BFB3]">
                      <span className="truncate min-w-0">github.com/{GITHUB_USERNAME}/{repo.name}</span>
                      <span className="text-[#777C62] dark:text-[#ADB293] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 shrink-0">
                        Open <FaExternalLinkAlt className="text-[7px]" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GitHubStatsWidget;
