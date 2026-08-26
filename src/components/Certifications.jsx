import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaExternalLinkAlt, FaTimes, FaCheckCircle, FaFileDownload } from "react-icons/fa";
import { playClickSound, playSuccessSound } from "../utils/sound";

const certs = [
  {
    name: "Full Stack Developer Internship Certificate",
    issuer: "Sashverse Technologies Private Limited",
    link: "/certficates/SASHVERSE-CERTIFICATE.jpg",
    pdfLink: "/SASHVERSE-INTERNSHIP-CERTIFICATE.pdf",
    tag: "Full-Stack Development"
  },
  {
    name: "Web Development Internship Certificate (ID: STAXA0042)",
    issuer: "StaxTech (Founder & CEO: Pawan Kushwaha)",
    link: "/certficates/STAXTECH-CERTIFICATE.jpg",
    pdfLink: "/STAXTECH-INTERNSHIP-CERTIFICATE.pdf",
    tag: "Web Development"
  },
  {
    name: "Power BI Workshop Certificate",
    issuer: "OfficeMaster",
    link: "/certficates/POWER-BI-CERTIFICATE.jpg",
    pdfLink: "/POWER-BI-WORKSHOP-CERTIFICATE.pdf",
    tag: "Data Analytics"
  },
  {
    name: "Programming Fundamentals using Python",
    issuer: "Infosys Springboard",
    link: "/certficates/INFO1.jpg",
    pdfLink: "/certficates/INFO1.jpg",
    tag: "Python Programming"
  },
  {
    name: "Data Analytics Job Simulation Certificate",
    issuer: "Deloitte (via Forage, Issued June 12, 2025)",
    link: "/certficates/DELOITTE-CERTIFICATE.jpg",
    pdfLink: "/DELOITTE-DATA-ANALYTICS-CERTIFICATE.pdf",
    tag: "Data Analytics & Forensic Tech"
  },
  {
    name: "Elements of AI Certificate (2 ECTS Credits)",
    issuer: "University of Helsinki & MinnaLearn (Issued June 12, 2025)",
    link: "/certficates/ELEMENTS-OF-AI.png",
    pdfLink: "/certficates/ELEMENTS-OF-AI.png",
    tag: "Artificial Intelligence"
  },
  {
    name: "Dynamic Public Speaking Specialization",
    issuer: "Coursera (University of Washington, Issued Aug 9, 2025)",
    link: "/certficates/DYNAMIC-PUBLIC-SPEAKING-CERTIFICATE.jpg",
    pdfLink: "/DYNAMIC-PUBLIC-SPEAKING-CERTIFICATE.pdf",
    tag: "Communication & Leadership"
  },
  {
    name: "Ignite India Entrepreneurship Certificate (42 Hours)",
    issuer: "Wadhwani Foundation & Aurora Higher Education (Issued Aug 30, 2025)",
    link: "/certficates/WADHWANI-IGNITE-INDIA-CERTIFICATE.jpg",
    pdfLink: "/WADHWANI-IGNITE-INDIA-CERTIFICATE.pdf",
    tag: "Entrepreneurship & Ideation"
  }
];

const Certifications = () => {
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRefs = useRef([]);
  const [tilt, setTilt] = useState({});
  const [spotlightPos, setSpotlightPos] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  const handleMouseMove = (e, index) => {
    if (isTouchDevice || prefersReducedMotion) return;
    const el = cardRefs.current[index];
    if (!el) return;
    try {
      const rect = el.getBoundingClientRect();
      if (!rect || !rect.width || !rect.height) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos((prev) => ({ ...prev, [index]: { x, y } }));

      const xOffset = (x / rect.width - 0.5) * 3;
      const yOffset = (y / rect.height - 0.5) * -3;
      setTilt((prev) => ({ 
        ...prev, 
        [index]: { rx: Math.max(-2.5, Math.min(2.5, yOffset)), ry: Math.max(-2.5, Math.min(2.5, xOffset)) } 
      }));
    } catch (err) {}
  };

  const handleOpenCert = (cert) => {
    try { playSuccessSound(); } catch (e) {}
    setActiveCertModal(cert);
  };

  return (
    <section id="certifications" className="py-24 px-6 bg-white dark:bg-slate-900 border-y border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
            CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certifications & Achievements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Verified industry internship completion certificates, technical workshops, and virtual job simulations
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certs.map((cert, index) => {
            const cardTilt = tilt[index] || { rx: 0, ry: 0 };
            const cardSpotlight = spotlightPos[index] || { x: 0, y: 0 };
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => handleOpenCert(cert)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => { if (!isTouchDevice && !prefersReducedMotion) setHoveredIndex(index); }}
                onMouseLeave={() => { setHoveredIndex(null); setTilt((prev) => ({ ...prev, [index]: { rx: 0, ry: 0 } })); }}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transform: !isTouchDevice && !prefersReducedMotion && isHovered
                    ? `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateY(-4px)`
                    : 'none',
                  transition: 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1), border-color 200ms ease, box-shadow 200ms ease'
                }}
                className="relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-2xs hover:border-indigo-400/50 hover:shadow-md"
              >
                {/* 5% Cursor Spotlight Glow */}
                {!isTouchDevice && !prefersReducedMotion && isHovered && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(240px circle at ${cardSpotlight.x}px ${cardSpotlight.y}px, rgba(91, 75, 255, 0.05), transparent 80%)`
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                      <FaAward size={18} />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {cert.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">{cert.issuer}</p>
                </div>

                <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <FaCheckCircle className="text-xs" /> Verified Credential
                  </span>
                  <FaExternalLinkAlt className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* In-App Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeCertModal && (
          <div 
            onClick={() => setActiveCertModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-2xl flex flex-col justify-between space-y-4 overflow-hidden font-sans"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">{activeCertModal.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{activeCertModal.issuer}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeCertModal.pdfLink || activeCertModal.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500/40 text-xs font-mono font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <FaFileDownload size={12} /> Download
                  </a>
                  <button
                    onClick={() => setActiveCertModal(null)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>

              {/* Certificate Image Preview */}
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-950 flex items-center justify-center p-2 min-h-[50vh] max-h-[72vh]">
                <img
                  src={activeCertModal.link}
                  alt={activeCertModal.name}
                  className="w-full h-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                />
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Certifications;
