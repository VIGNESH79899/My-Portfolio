import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStore, FaExternalLinkAlt, FaCheckCircle, 
  FaShoppingCart, FaLock, FaGlobe, FaCreditCard, 
  FaServer, FaSearch, FaArrowRight, FaShieldAlt, FaRocket
} from 'react-icons/fa';
import { playClickSound, playSuccessSound } from '../utils/sound';

const FreelanceSpotlight = () => {
  const [cartCount, setCartCount] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const handleAddToCart = () => {
    try { playClickSound(); } catch (e) {}
    setCartCount(prev => prev + 1);
    setShowAddedToast(true);
    try { playSuccessSound(); } catch (e) {}
    setTimeout(() => setShowAddedToast(false), 2200);
  };

  const pillars = [
    {
      icon: <FaStore className="text-[#777C62] dark:text-[#ADB293] text-base" />,
      title: "Custom Storefront UI/UX",
      desc: "Engineered with React, Vite, and Tailwind CSS. Features mobile-first responsive layouts, instant product browsing, and fluid typography."
    },
    {
      icon: <FaCreditCard className="text-[#8C7258] dark:text-[#C1A17F] text-base" />,
      title: "Razorpay Payment Gateway",
      desc: "Integrated secure multi-mode payment processing supporting UPI (GPay, PhonePe), Debit/Credit Cards, and Net Banking with instant webhooks."
    },
    {
      icon: <FaServer className="text-[#777C62] dark:text-[#ADB293] text-base" />,
      title: "REST API & MongoDB Atlas",
      desc: "Architected a custom Node.js/Express backend hosted on Render, backed by MongoDB Atlas for real-time inventory and customer order tracking."
    },
    {
      icon: <FaGlobe className="text-[#8C7258] dark:text-[#C1A17F] text-base" />,
      title: "Digital Presence & Webmaster Ops",
      desc: "Complete end-to-end management: custom domain & DNS routing, Google Search Console indexing, Schema.org SEO metadata, SSL certificates, and 99.9% uptime."
    }
  ];

  return (
    <section id="freelance" className="py-24 px-6 bg-[#F5F2EB] dark:bg-[#1C1D19] border-t border-[#D8D1C5] dark:border-[#414239] relative overflow-hidden font-sans">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-[#777C62]/5 dark:bg-[#ADB293]/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="pb-6 border-b border-[#D8D1C5] dark:border-[#414239] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#777C62]/15 dark:bg-[#ADB293]/15 text-[#5E634D] dark:text-[#C6CCAA] border border-[#777C62]/30 dark:border-[#ADB293]/35 mb-3 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse" />
              <span>FREELANCING WORK &amp; CLIENT PRODUCTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
              Freelance E-Commerce &amp; Digital Presence
            </h2>
            <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] mt-2 font-normal max-w-2xl">
              End-to-end full-stack development, cloud infrastructure, Razorpay checkout, and continuous webmaster operations managed independently for business clients.
            </p>
          </div>

          <div className="self-start md:self-auto">
            <span className="px-4 py-1.5 rounded-full bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] text-xs font-mono font-bold text-[#777C62] dark:text-[#ADB293] shadow-xs inline-flex items-center gap-2">
              <FaShieldAlt className="text-xs text-[#8C7258] dark:text-[#C1A17F]" />
              <span>100% Solo Ownership</span>
            </span>
          </div>
        </div>

        {/* Master Showcase Banner Card */}
        <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-sm p-6 sm:p-10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Client Story, Ownership & Architecture Pillars (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Client & Role Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#E7E1D6]/70 dark:bg-[#303129] text-[#252722] dark:text-[#F5F2EB] border border-[#D8D1C5] dark:border-[#414239]">
                    FREELANCE CONTRACT
                  </span>
                  <span className="text-xs font-mono text-[#777C62] dark:text-[#ADB293] font-semibold">
                    Jul 2025 – Present • Hyderabad, India
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#252722] dark:text-[#F5F2EB] font-heading tracking-tight">
                  Chandeshwara Enterprises
                </h3>

                <p className="text-sm font-semibold text-[#777C62] dark:text-[#ADB293]">
                  Lead Full-Stack Developer &amp; Digital Webmaster
                </p>
              </div>

              {/* Context & Impact Narrative */}
              <p className="text-xs sm:text-sm text-[#68675F] dark:text-[#C0BFB3] leading-relaxed">
                Chandeshwara Enterprises specializes in preserving authentic generational Telangana pit-loom weaving traditions, producing handcrafted <strong>Deccani sheep wool Gongadi blankets</strong> and handwoven shawls. I was entrusted to architect, deploy, and actively manage their complete e-commerce web platform and digital footprint from the ground up.
              </p>

              {/* 4 Architectural Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {pillars.map((pillar, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#F5F2EB]/70 dark:bg-[#1E201B] border border-[#D8D1C5]/70 dark:border-[#414239] space-y-1.5 transition-all duration-200 hover:border-[#777C62]/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] shadow-2xs">
                        {pillar.icon}
                      </span>
                      <h4 className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading">{pillar.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Action Link & Meta */}
              <div className="pt-3 border-t border-[#D8D1C5]/70 dark:border-[#414239] flex flex-wrap items-center gap-4">
                <a
                  href="https://chandeshwaraenterprises.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs cursor-pointer inline-flex items-center gap-2 !px-4 !py-2.5 !rounded-full shadow-md"
                >
                  <span>Visit chandeshwaraenterprises.com</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>

                <span className="text-xs font-mono text-[#68675F] dark:text-[#C0BFB3] flex items-center gap-1.5">
                  <FaCheckCircle className="text-[#777C62] dark:text-[#ADB293] text-xs" />
                  <span>Production Live &amp; Continuously Maintained</span>
                </span>
              </div>

            </div>

            {/* Right Column: Interactive Browser Window & Store Mockup (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#1E201B] border border-[#D8D1C5] dark:border-[#414239] shadow-xl overflow-hidden">
                
                {/* Browser Window Header */}
                <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-[#E7E1D6]/60 dark:bg-[#252620] border-b border-[#D8D1C5] dark:border-[#414239] text-xs">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 bg-[#FFFDF9] dark:bg-[#1C1D19] border border-[#D8D1C5] dark:border-[#414239] rounded-lg text-[11px] font-mono text-[#68675F] dark:text-[#C0BFB3] truncate min-w-0 flex-1 max-w-[210px]">
                    <FaLock className="text-[9px] text-[#777C62] dark:text-[#ADB293] shrink-0" />
                    <span className="truncate">chandeshwaraenterprises.com</span>
                  </div>

                  <span className="w-2 h-2 rounded-full bg-[#777C62] dark:bg-[#ADB293] animate-pulse shrink-0" />
                </div>

                {/* Mock Storefront Canvas */}
                <div className="p-4 sm:p-5 space-y-4">
                  
                  {/* Storefront Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8D1C5]/70 dark:border-[#414239]">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase text-[#777C62] dark:text-[#ADB293] font-bold block">
                        TELANGANA HERITAGE STORE
                      </span>
                      <h5 className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading">
                        Traditional Gongadi Blankets
                      </h5>
                    </div>

                    <div className="pill-venom-inactive px-3 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-xs shrink-0">
                      <FaShoppingCart className="text-[#777C62] dark:text-[#ADB293] text-[10px]" />
                      <span>Cart ({cartCount})</span>
                    </div>
                  </div>

                  {/* Featured Product Card */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F5F2EB]/80 dark:bg-[#252620] border border-[#D8D1C5] dark:border-[#414239] space-y-3.5 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3">
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono font-bold text-[#777C62] dark:text-[#ADB293] bg-[#E7E1D6]/80 dark:bg-[#303129] px-2.5 py-0.5 rounded-full border border-[#D8D1C5] dark:border-[#414239] inline-block">
                          100% DECCANI SHEEP WOOL
                        </span>
                        <h6 className="text-xs font-bold text-[#252722] dark:text-[#F5F2EB] font-heading mt-2">
                          Authentic Handwoven Gongadi Blanket
                        </h6>
                        <p className="text-[11px] text-[#68675F] dark:text-[#C0BFB3] mt-1 leading-relaxed">
                          Handcrafted on pit-looms by Kuruma community weavers. Water-resistant lanolin fibers, natural black wool, thermal comfort.
                        </p>
                      </div>

                      <div className="flex sm:block items-center justify-between gap-2 pt-1 sm:pt-0 sm:text-right shrink-0">
                        <span className="text-sm font-bold text-[#252722] dark:text-[#F5F2EB] font-heading block">₹4,800</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#5E634D] dark:text-[#C6CCAA] mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          In Stock
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-[#D8D1C5]/70 dark:border-[#414239] flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono transition-colors font-medium ${showAddedToast ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-[#68675F] dark:text-[#C0BFB3]'}`}>
                        {showAddedToast ? "✓ Added to live order!" : "Razorpay Checkout Ready"}
                      </span>
                      <button
                        onClick={handleAddToCart}
                        className="btn-primary text-[11px] !py-1.5 !px-3.5 !rounded-full font-bold flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-transform"
                      >
                        <FaShoppingCart className="text-[10px]" />
                        <span>{showAddedToast ? "Added!" : "+ Add to Cart"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Production Trust Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5]/70 dark:border-[#414239] shadow-2xs hover:border-[#777C62]/40 transition-colors">
                      <span className="text-[9px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">GATEWAY</span>
                      <span className="text-[11px] font-bold text-[#252722] dark:text-[#F5F2EB]">Razorpay</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5]/70 dark:border-[#414239] shadow-2xs hover:border-[#777C62]/40 transition-colors">
                      <span className="text-[9px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">DATABASE</span>
                      <span className="text-[11px] font-bold text-[#252722] dark:text-[#F5F2EB]">MongoDB</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#252620] border border-[#D8D1C5]/70 dark:border-[#414239] shadow-2xs hover:border-[#777C62]/40 transition-colors">
                      <span className="text-[9px] font-mono text-[#68675F] dark:text-[#C0BFB3] block">HOSTING</span>
                      <span className="text-[11px] font-bold text-[#777C62] dark:text-[#ADB293]">Render / CDN</span>
                    </div>
                  </div>

                  {/* Bottom launch button */}
                  <a
                    href="https://chandeshwaraenterprises.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-olive w-full !py-3 !rounded-full text-xs font-bold tracking-wide flex items-center justify-center gap-2.5 shadow-md group cursor-pointer"
                  >
                    <span>Launch Storefront in New Window</span>
                    <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default FreelanceSpotlight;
