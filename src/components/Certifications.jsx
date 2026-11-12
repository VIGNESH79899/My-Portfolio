import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAward, FaExternalLinkAlt, FaTimes, FaCheckCircle,
  FaFileDownload, FaExpandAlt, FaChevronLeft, FaChevronRight,
  FaCalendarAlt, FaShieldAlt, FaBuilding
} from "react-icons/fa";
import { playClickSound, playSuccessSound } from "../utils/sound";

const certs = [
  {
    id: "sashverse-internship",
    name: "Full Stack Developer Internship Certificate",
    issuer: "Sashverse Technologies Private Limited",
    shortIssuer: "Sashverse Tech",
    date: "Apr – Jun 2026",
    link: "/certficates/SASHVERSE-CERTIFICATE.jpg",
    pdfLink: "/SASHVERSE-INTERNSHIP-CERTIFICATE.pdf",
    tag: "Full-Stack Development",
    category: "internships",
    highlight: "Production SaaS",
    isFlagship: true
  },
  {
    id: "staxtech-internship",
    name: "Web Development Internship Certificate",
    issuer: "StaxTech (Founder & CEO: Pawan Kushwaha)",
    shortIssuer: "StaxTech",
    date: "May 22, 2025",
    credentialId: "STAXA0042",
    link: "/certficates/STAXTECH-CERTIFICATE.jpg",
    pdfLink: "/STAXTECH-INTERNSHIP-CERTIFICATE.pdf",
    tag: "Web Development",
    category: "internships",
    highlight: "ID: STAXA0042",
    isFlagship: true
  },
  {
    id: "elements-of-ai",
    name: "Elements of AI Certificate (2 ECTS Credits)",
    issuer: "University of Helsinki & MinnaLearn",
    shortIssuer: "Univ. of Helsinki",
    date: "Jun 12, 2025",
    verifyUrl: "https://certificates.mooc.fi/validate/iy43aswxi2",
    link: "/certficates/ELEMENTS-OF-AI.png",
    pdfLink: "/certficates/ELEMENTS-OF-AI.png",
    tag: "Artificial Intelligence",
    category: "ai-data",
    highlight: "2 ECTS Credits",
    isFlagship: false
  },
  {
    id: "deloitte-analytics",
    name: "Data Analytics Job Simulation Certificate",
    issuer: "Deloitte (via Forage)",
    shortIssuer: "Deloitte",
    date: "Jun 12, 2025",
    credentialId: "qx6HYEoY3afGCpu7b",
    link: "/certficates/DELOITTE-CERTIFICATE.jpg",
    pdfLink: "/DELOITTE-DATA-ANALYTICS-CERTIFICATE.pdf",
    tag: "Data Analytics & Forensic Tech",
    category: "ai-data",
    highlight: "Job Simulation",
    isFlagship: false
  },
  {
    id: "infosys-python",
    name: "Programming Fundamentals using Python",
    issuer: "Infosys Springboard",
    shortIssuer: "Infosys Springboard",
    date: "2025",
    link: "/certficates/INFO1.jpg",
    pdfLink: "/certficates/INFO1.jpg",
    tag: "Python Programming",
    category: "ai-data",
    highlight: "Core Python",
    isFlagship: false
  },
  {
    id: "power-bi-workshop",
    name: "Power BI Workshop Certificate",
    issuer: "OfficeMaster",
    shortIssuer: "OfficeMaster",
    date: "Sep 28, 2025",
    link: "/certficates/POWER-BI-CERTIFICATE.jpg",
    pdfLink: "/POWER-BI-WORKSHOP-CERTIFICATE.pdf",
    tag: "Data Analytics",
    category: "ai-data",
    highlight: "BI Dashboards",
    isFlagship: false
  },
  {
    id: "public-speaking",
    name: "Dynamic Public Speaking Specialization (4 Courses)",
    issuer: "Coursera • University of Washington",
    shortIssuer: "Univ. of Washington",
    date: "Aug 9, 2025",
    verifyUrl: "https://coursera.org/verify/specialization/UIHAN7GLUGR7",
    link: "/certficates/DYNAMIC-PUBLIC-SPEAKING-CERTIFICATE.jpg",
    pdfLink: "/DYNAMIC-PUBLIC-SPEAKING-CERTIFICATE.pdf",
    tag: "Communication & Leadership",
    category: "leadership",
    highlight: "4-Course Spec",
    isFlagship: false
  },
  {
    id: "wadhwani-ignite",
    name: "Ignite India Entrepreneurship Certificate",
    issuer: "Wadhwani Foundation & Aurora Higher Education",
    shortIssuer: "Wadhwani Foundation",
    date: "Aug 30, 2025",
    link: "/certficates/WADHWANI-IGNITE-INDIA-CERTIFICATE.jpg",
    pdfLink: "/WADHWANI-IGNITE-INDIA-CERTIFICATE.pdf",
    tag: "Entrepreneurship & Ideation",
    category: "leadership",
    highlight: "42 Hours Training",
    isFlagship: false
  }
];

const categoryTabs = [
  { id: "all", name: "All Credentials", count: certs.length },
  { id: "internships", name: "Industry Internships", count: certs.filter(c => c.category === "internships").length },
  { id: "ai-data", name: "AI, Data & Code", count: certs.filter(c => c.category === "ai-data").length },
  { id: "leadership", name: "Leadership & Business", count: certs.filter(c => c.category === "leadership").length }
];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRefs = useRef([]);
  const [tilt, setTilt] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
        setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      } catch (e) {}
    }
  }, []);

  const filteredCerts = activeCategory === "all"
    ? certs
    : certs.filter((c) => c.category === activeCategory);

  // Keyboard navigation in Lightbox Modal (Esc, Left/Right arrows)
  useEffect(() => {
    if (!activeCertModal || filteredCerts.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveCertModal(null);
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const currentIdx = filteredCerts.findIndex((c) => c.id === activeCertModal.id);
        const nextIdx = (currentIdx + dir + filteredCerts.length) % filteredCerts.length;
        try { playClickSound(); } catch (err) {}
        setActiveCertModal(filteredCerts[nextIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCertModal, filteredCerts]);

  const handleMouseMove = (e, index, id) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const el = cardRefs.current[index];
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos((prev) => ({ ...prev, [id]: { x, y } }));

      const xOffset = (x / rect.width - 0.5) * 3;
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt((prev) => ({
        ...prev,
        [id]: {
          rx: Math.max(-2.5, Math.min(2.5, yOffset)),
          ry: Math.max(-2.5, Math.min(2.5, xOffset))
        }
      }));
    } catch (err) {}
  };

  const handleSelectCategory = (catId) => {
    try { playClickSound(); } catch (e) {}
    setActiveCategory(catId);
  };

  const handleOpenCert = (cert) => {
    try { playSuccessSound(); } catch (e) {}
    setActiveCertModal(cert);
  };

  const handleStepCert = (direction) => {
    if (!activeCertModal || filteredCerts.length === 0) return;
    try { playClickSound(); } catch (e) {}
    const currentIdx = filteredCerts.findIndex((c) => c.id === activeCertModal.id);
    const nextIdx = (currentIdx + direction + filteredCerts.length) % filteredCerts.length;
    setActiveCertModal(filteredCerts[nextIdx]);
  };

  return (
    <section
      id="certifications"
      className="py-24 px-6 bg-[var(--bg-page)] border-y border-[var(--border-color)] relative overflow-hidden font-sans"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[320px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-[var(--border-color)] flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="pro-badge-olive inline-block mb-3">
              CREDENTIALS VAULT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)] tracking-tight">
              Certifications &amp; Achievements
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 font-medium max-w-2xl">
              Verified industry internship completion certificates, technical workshops, and accredited specializations
            </p>
          </div>

          <div className="self-start md:self-auto px-3.5 py-2 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-color)] shadow-2xs flex items-center gap-2.5 text-xs font-mono shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="font-bold text-[var(--text-primary)]">0{certs.length}</span>
            <span className="text-[var(--text-secondary)]">VERIFIED RECORDS</span>
          </div>
        </motion.div>

        {/* Segmented Category Filter Bar (Venom Pills) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200 cursor-pointer focus:outline-none select-none flex items-center gap-1.5 ${
                    isActive
                      ? "pill-venom-active shadow-md"
                      : "pill-venom-inactive hover:-translate-y-0.5"
                  }`}
                >
                  <span>{tab.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-black/5 dark:bg-white/10 text-[var(--text-secondary)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-[var(--text-secondary)] hidden sm:flex items-center gap-1.5">
            <FaShieldAlt className="text-[var(--accent-primary)]" />
            <span>Click any credential to inspect full certificate</span>
          </span>
        </div>

        {/* Interactive Credential Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => {
              const cardTilt = tilt[cert.id] || { rx: 0, ry: 0 };
              const cardSpotlight = spotlightPos[cert.id] || { x: 0, y: 0 };
              const isHovered = hoveredId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  layout
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleOpenCert(cert)}
                  onMouseMove={(e) => handleMouseMove(e, index, cert.id)}
                  onMouseEnter={() => {
                    if (!isTouchDevice && !prefersReducedMotion) setHoveredId(cert.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    setTilt((prev) => ({ ...prev, [cert.id]: { rx: 0, ry: 0 } }));
                  }}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.32, delay: prefersReducedMotion ? 0 : index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transform: !isTouchDevice && !prefersReducedMotion && isHovered
                      ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-4px)`
                      : "none",
                    transition: "transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease"
                  }}
                  className={`relative overflow-hidden rounded-2xl bg-[var(--surface-primary)] border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-lg ${
                    cert.isFlagship
                      ? "border-[#777C62]/45 dark:border-[#ADB293]/40 hover:border-[var(--accent-primary)]"
                      : "border-[var(--border-color)] hover:border-[var(--accent-primary)]"
                  }`}
                >
                  {/* Cursor Spotlight Shader */}
                  {!isTouchDevice && !prefersReducedMotion && isHovered && (
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
                      style={{
                        background: `radial-gradient(260px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(119, 124, 98, 0.1), transparent 80%)`
                      }}
                    />
                  )}

                  {/* Top Framed Certificate Document Preview */}
                  <div className="relative h-40 w-full overflow-hidden bg-[#181915] border-b border-[var(--border-color)]">
                    <img
                      src={cert.link}
                      alt={cert.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    {/* Soft Gradient Scrim for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181915]/85 via-[#181915]/25 to-black/35 pointer-events-none" />

                    {/* Top Floating Status & Date Pills */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      {cert.isFlagship ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161713]/90 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                          <span>INTERNSHIP</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#161713]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold text-[#E7E1D6]">
                          <FaAward className="text-[10px] text-[#ADB293]" />
                          <span>{cert.shortIssuer}</span>
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#161713]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#D8D1C5]">
                        <FaCalendarAlt className="text-[9px] text-[#ADB293]" />
                        <span>{cert.date}</span>
                      </span>
                    </div>

                    {/* Hover Center "Inspect" Glass Pill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <span className="btn-venom !py-1.5 !px-3.5 text-[11px] shadow-xl flex items-center gap-1.5">
                        <FaExpandAlt className="text-[10px]" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>

                    {/* Bottom-Left Highlight Chip inside Preview */}
                    <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/15 text-[10px] font-mono font-semibold text-[#C6CCAA]">
                        {cert.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      {/* Category Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--surface-secondary)] text-[var(--accent-primary)] border border-[var(--border-color)] truncate">
                          {cert.tag}
                        </span>
                        {cert.credentialId && (
                          <span className="text-[9px] font-mono text-[var(--text-secondary)] truncate max-w-[115px]" title={`Credential ID: ${cert.credentialId}`}>
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold font-display text-[var(--text-primary)] tracking-tight leading-snug mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                        {cert.name}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 mb-4">
                        <FaBuilding className="text-[10px] text-[var(--accent-primary)] shrink-0 opacity-80" />
                        <span className="truncate">{cert.issuer}</span>
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--accent-primary)]">
                        <FaCheckCircle className="text-xs text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>Verified</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              try { playClickSound(); } catch (err) {}
                            }}
                            title="Verify credential online"
                            className="pill-venom-inactive !px-2.5 !py-1 !rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 shadow-2xs"
                          >
                            <span>Verify</span>
                            <FaExternalLinkAlt className="text-[8px]" />
                          </a>
                        )}

                        <a
                          href={cert.pdfLink || cert.link}
                          download
                          onClick={(e) => {
                            e.stopPropagation();
                            try { playClickSound(); } catch (err) {}
                          }}
                          title="Download Certificate"
                          className="pill-venom-inactive !p-1.5 !rounded-full text-[var(--text-primary)] inline-flex items-center justify-center shadow-2xs"
                          aria-label={`Download ${cert.name}`}
                        >
                          <FaFileDownload className="text-xs text-[var(--accent-primary)]" />
                        </a>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCert(cert);
                          }}
                          className="btn-primary !py-1 !px-3 !text-[11px] !rounded-full shadow-sm"
                        >
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* In-App Certificate Lightbox Modal with Prev/Next Slide Controls */}
      <AnimatePresence>
        {activeCertModal && (
          <div
            onClick={() => setActiveCertModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[var(--surface-primary)] rounded-3xl border border-[var(--border-color)] p-4 sm:p-6 shadow-2xl flex flex-col justify-between space-y-4 overflow-hidden font-sans cursor-default"
            >
              {/* Modal Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)] shrink-0">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="pro-badge-olive !text-[9px] !py-0.5 !px-2">
                      {activeCertModal.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                      {activeCertModal.date}
                    </span>
                    {activeCertModal.credentialId && (
                      <span className="text-[10px] font-mono text-[var(--accent-primary)] font-semibold">
                        ID: {activeCertModal.credentialId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-[var(--text-primary)] tracking-tight truncate">
                    {activeCertModal.name}
                  </h3>
                  <p className="text-xs text-[var(--accent-primary)] font-semibold truncate">
                    {activeCertModal.issuer}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {activeCertModal.verifyUrl && (
                    <a
                      href={activeCertModal.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !text-xs !py-1.5 !px-3.5 inline-flex items-center gap-1.5"
                    >
                      <span>Verify Live</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                  <a
                    href={activeCertModal.pdfLink || activeCertModal.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !text-xs !py-1.5 !px-4 inline-flex items-center gap-1.5"
                  >
                    <FaFileDownload size={12} /> <span>Download</span>
                  </a>
                  <button
                    onClick={() => setActiveCertModal(null)}
                    className="pill-venom-inactive !w-8 !h-8 rounded-full flex items-center justify-center text-[var(--text-primary)] cursor-pointer shadow-xs"
                    aria-label="Close"
                  >
                    <FaTimes size={13} />
                  </button>
                </div>
              </div>

              {/* Certificate Image Preview */}
              <div className="relative flex-1 w-full overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[#141512] flex items-center justify-center p-2 min-h-[42vh] max-h-[65vh]">
                <img
                  src={activeCertModal.link}
                  alt={activeCertModal.name}
                  className="w-full h-full max-h-[62vh] object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Modal Footer Navigation (Prev / Counter / Next) */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] shrink-0 text-xs">
                <button
                  onClick={() => handleStepCert(-1)}
                  className="pill-venom-inactive !px-3.5 !py-1.5 !rounded-full inline-flex items-center gap-1.5 font-heading font-semibold cursor-pointer"
                >
                  <FaChevronLeft className="text-[10px]" />
                  <span>Previous</span>
                </button>

                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  {filteredCerts.findIndex((c) => c.id === activeCertModal.id) + 1} / {filteredCerts.length}
                </span>

                <button
                  onClick={() => handleStepCert(1)}
                  className="pill-venom-inactive !px-3.5 !py-1.5 !rounded-full inline-flex items-center gap-1.5 font-heading font-semibold cursor-pointer"
                >
                  <span>Next</span>
                  <FaChevronRight className="text-[10px]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
