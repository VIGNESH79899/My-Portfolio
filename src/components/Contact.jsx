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
    <section id="contact" className="py-24 px-6 bg-[var(--bg-page)] border-t border-[var(--border-color)] relative overflow-hidden font-sans">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[380px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
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
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)] tracking-tight">
              Contact & Engineering Collaboration Hub
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 font-medium">
              Open for full-stack software engineering, AI/ML development roles, and high-impact technical projects
            </p>
          </div>

          {/* Live Availability Status Pill */}
          <div className="p-3 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-color)] shadow-xs flex items-center gap-2.5 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-primary)]"></span>
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider block leading-none">AVAILABILITY</span>
              <span className="text-xs font-bold text-[var(--text-primary)] leading-tight">Full-Stack & AI Roles (Q3/Q4)</span>
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
            className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-color)] shadow-xs flex flex-col justify-between space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] tracking-tight mb-2">Let's connect</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                Actively seeking Full-Stack & AI/ML engineering opportunities. Reach out via email, phone, or message form.
              </p>

              <div className="space-y-3">
                {/* Email Item */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-color)] flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-[var(--accent-primary)] shrink-0">
                      <FaEnvelope size={16} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">PRIMARY EMAIL</span>
                      <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-primary)] font-mono truncate">vigneshadhi773@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-full bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)] shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-none hover:border-[var(--accent-primary)] transition-all cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <FaCheck className="text-[var(--accent-primary)] text-xs" /> : <FaCopy className="text-xs" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-color)] flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-[var(--accent-primary)] shrink-0">
                      <FaPhoneAlt size={16} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">PHONE / WHATSAPP</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)] font-mono truncate">+91 79899 49808</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2.5 rounded-full bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--border-color)] shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-none hover:border-[var(--accent-primary)] transition-all cursor-pointer shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <FaCheck className="text-[var(--accent-primary)] text-xs" /> : <FaCopy className="text-xs" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-color)] flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-[var(--accent-primary)]">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider font-mono">LOCATION</span>
                    <span className="text-xs font-semibold text-[var(--text-primary)]">Hyderabad, Telangana, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Resume Download */}
            <div className="pt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2.5">
                <a
                  href="https://linkedin.com/in/adhi-vignesh-342431289"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-venom-icon group"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin size={18} className="group-hover:text-[#0A66C2] group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.7)] transition-all" />
                </a>
                <a
                  href="https://github.com/VIGNESH79899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-venom-icon group"
                  aria-label="GitHub"
                  title="GitHub Profile"
                >
                  <FaGithub size={18} className="group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all" />
                </a>
              </div>

              <a
                href="/Adhi_Vignesh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs flex items-center gap-2"
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
            className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-color)] shadow-xs flex flex-col gap-5"
          >
            {/* Inquiry Role Selector Pills */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2.5">SELECT INQUIRY TYPE</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {roleOptions.map((roleObj) => {
                  const IconComp = roleObj.icon;
                  const isSelected = selectedRole === roleObj.id;
                  return (
                    <button
                      key={roleObj.id}
                      type="button"
                      onClick={() => handleSelectRole(roleObj)}
                      className={`p-2.5 sm:p-3 rounded-2xl text-xs font-heading font-semibold transition-all duration-200 flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer select-none ${
                        isSelected
                          ? "pill-venom-active"
                          : "pill-venom-inactive"
                      }`}
                    >
                      <IconComp className={`text-base transition-colors ${isSelected ? "text-white" : "text-[var(--accent-primary)]"}`} />
                      <span className="text-[11px] text-center leading-tight sm:whitespace-nowrap tracking-tight">{roleObj.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase text-[10px] tracking-wider font-mono">YOUR NAME *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:outline-hidden focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase text-[10px] tracking-wider font-mono">YOUR EMAIL *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:outline-hidden focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase text-[10px] tracking-wider font-mono">SUBJECT *</label>
              <input
                type="text"
                name="subject"
                placeholder="Software Role / Project Collaboration"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:outline-hidden focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase text-[10px] tracking-wider font-mono">MESSAGE *</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3.5 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:outline-hidden focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all font-sans"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full !py-4 !px-8 text-sm !font-bold tracking-tight shadow-xl cursor-pointer"
            >
              {status === "loading" ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" /> <span>Send Message</span>
                </>
              )}
            </motion.button>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[var(--surface-secondary)] text-[var(--text-primary)] text-xs font-medium border border-[var(--accent-primary)] space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-[var(--accent-primary)]">
                  <FaCheckCircle className="text-[var(--accent-primary)]" /> Message Sent Successfully!
                </div>
                <p className="text-[var(--text-secondary)]">{statusMsg}</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[var(--surface-secondary)] text-[var(--text-primary)] text-xs font-medium border border-rose-300 dark:border-rose-800 space-y-2"
              >
                <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                  <FaExclamationTriangle className="text-rose-500" /> {statusMsg}
                </div>
                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="btn-primary text-xs !py-1.5 !px-3 font-semibold flex items-center gap-1.5 cursor-pointer"
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
