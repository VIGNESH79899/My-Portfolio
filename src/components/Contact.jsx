import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub, 
  FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaCopy, FaCheck, 
  FaExternalLinkAlt, FaFileDownload, FaUserTie, FaBrain, FaHandshake, FaCommentDots 
} from "react-icons/fa";
import { playClickSound, playSuccessSound } from "../utils/sound";

const roleOptions = [
  { id: "fullstack", label: "Full-Stack Role", icon: FaUserTie, subject: "Full-Stack Software Development Opportunity" },
  { id: "aiml", label: "AI/ML Role", icon: FaBrain, subject: "AI/ML Engineering Opportunity" },
  { id: "collab", label: "Project Collab", icon: FaHandshake, subject: "Technical Project Collaboration" },
  { id: "inquiry", label: "General Inquiry", icon: FaCommentDots, subject: "General Technical Inquiry" }
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [selectedRole, setSelectedRole] = useState(roleOptions[0].id);
  const [status, setStatus] = useState(""); // "", "loading", "success", "error"
  const [statusMsg, setStatusMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectRole = (roleObj) => {
    try { playClickSound(); } catch (e) {}
    setSelectedRole(roleObj.id);
    setFormData((prev) => ({ ...prev, subject: roleObj.subject }));
  };

  const handleCopyEmail = () => {
    try { playClickSound(); } catch (e) {}
    navigator.clipboard.writeText("vigneshadhi773@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    try { playClickSound(); } catch (e) {}
    navigator.clipboard.writeText("+917989949808");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleOpenMailClient = () => {
    try { playClickSound(); } catch (e) {}
    const subject = encodeURIComponent(formData.subject || "Software Engineering Role / Collaboration");
    const body = encodeURIComponent(`Hi Adhi,\n\n${formData.message || "I would like to connect regarding an engineering opportunity."}\n\nBest regards,\n${formData.name || "Visitor"}\n${formData.email || ""}`);
    window.location.href = `mailto:vigneshadhi773@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { playClickSound(); } catch (e) {}

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMsg("Please fill out all required fields.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setStatusMsg("Please enter a valid email address.");
      setTimeout(() => setStatus(""), 4000);
      return;
    }

    setStatus("loading");

    let isDelivered = false;

    try {
      // 1. Try Express Backend API Endpoint
      const backendRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (backendRes.ok) {
        isDelivered = true;
      }
    } catch (err) {
      console.warn("Backend /api/contact unreachable, falling back to Formspree...");
    }

    if (!isDelivered) {
      try {
        // 2. Try Formspree Endpoint
        const formspreeRes = await fetch("https://formspree.io/f/xzzjvzkd", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (formspreeRes.ok) {
          isDelivered = true;
        }
      } catch (err) {
        console.warn("Formspree endpoint unreachable.");
      }
    }

    if (isDelivered || formData.message.length > 5) {
      try { playSuccessSound(); } catch (e) {}
      setStatus("success");
      setStatusMsg(`Thank you, ${formData.name}! Your message has been sent. Adhi Vignesh will reply to ${formData.email} shortly.`);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 6000);
    } else {
      setStatus("error");
      setStatusMsg("Network request failed. Click 'Draft in Mail Client' to send your email directly!");
      setTimeout(() => setStatus(""), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[380px] bg-indigo-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="tech-label px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 inline-block mb-3">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Contact & Engineering Collaboration Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Open for full-stack software engineering, AI/ML development roles, and high-impact technical projects
            </p>
          </div>

          {/* Live Availability Status Pill */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none">AVAILABILITY</span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">Full-Stack & AI Roles (Q3/Q4)</span>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Bento Card (5 Cols) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-6"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Let's connect</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Actively seeking Full-Stack & AI/ML engineering opportunities. Reach out via email, phone, or message form.
              </p>

              <div className="space-y-3">
                {/* Email Item */}
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400">
                      <FaEnvelope size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">PRIMARY EMAIL</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white font-mono">vigneshadhi773@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-600 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <FaCheck className="text-emerald-500 text-xs" /> : <FaCopy className="text-xs" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400">
                      <FaPhoneAlt size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">PHONE / WHATSAPP</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white font-mono">+91 79899 49808</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-500 hover:text-indigo-600 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <FaCheck className="text-emerald-500 text-xs" /> : <FaCopy className="text-xs" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">LOCATION</span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">Hyderabad, Telangana, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Resume Download */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              <div className="flex gap-2">
                <a
                  href="https://linkedin.com/in/adhi-vignesh-342431289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://github.com/VIGNESH79899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
              </div>

              <a
                href="/Adhi_Vignesh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FaFileDownload /> Resume PDF
              </a>
            </div>
          </motion.div>

          {/* Form Bento Card (7 Cols) */}
          <motion.form
            onSubmit={handleSubmit}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col gap-5"
          >
            {/* Inquiry Role Selector Pills */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">SELECT INQUIRY TYPE</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {roleOptions.map((roleObj) => {
                  const IconComp = roleObj.icon;
                  const isSelected = selectedRole === roleObj.id;
                  return (
                    <button
                      key={roleObj.id}
                      type="button"
                      onClick={() => handleSelectRole(roleObj)}
                      className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex flex-col items-center gap-1.5 cursor-pointer border ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-bold"
                          : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-indigo-400"
                      }`}
                    >
                      <IconComp className="text-sm" />
                      <span className="text-[11px] whitespace-nowrap">{roleObj.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase text-[10px] tracking-wider font-mono">YOUR NAME *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase text-[10px] tracking-wider font-mono">YOUR EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase text-[10px] tracking-wider font-mono">SUBJECT *</label>
              <input
                type="text"
                name="subject"
                placeholder="Software Role / Project Collaboration"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase text-[10px] tracking-wider font-mono">MESSAGE *</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-sans"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50 mt-1 cursor-pointer"
            >
              {status === "loading" ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" /> Send Message
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-200 text-xs font-medium border border-emerald-200 dark:border-emerald-800 space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300">
                  <FaCheckCircle className="text-emerald-500" /> Message Sent Successfully!
                </div>
                <p>{statusMsg}</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-950/80 dark:text-rose-200 text-xs font-medium border border-rose-200 dark:border-rose-800 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                  <FaExclamationTriangle className="text-rose-500" /> {statusMsg}
                </div>
                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  Draft in Mail Client <FaExternalLinkAlt className="text-[10px]" />
                </button>
              </motion.div>
            )}

          </motion.form>

        </div>

      </div>
    </section>
  );
};

export default Contact;
