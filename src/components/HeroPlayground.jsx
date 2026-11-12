import React from 'react';
import { playClickSound } from '../utils/sound';

const ArrowRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="10" height="10" viewBox="0 0 512 512" fill="currentColor" className="text-[#555A44] dark:text-[#ADB293]" aria-hidden="true">
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
  </svg>
);

const HeroPlayground = () => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-32 pb-0 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* Subtle Warm Ambient Ray Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[320px] bg-gradient-to-b from-[#777C62]/10 via-[#8C7258]/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Main Hero Grid: Narrative (Left) + Seamless Portrait Cutout (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
        
        {/* Left Column (Col-7): Ultra-clean, punchy & minimal */}
        <div className="lg:col-span-7 space-y-5 pb-4 lg:pb-20 lg:self-center">
          
          {/* Greeting & Name */}
          <div className="space-y-1">
            <span className="text-lg sm:text-xl font-medium text-[#555A44] dark:text-[#ADB293] block">
              Hi, I'm
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold tracking-[-0.035em] text-[#252722] dark:text-[#F5F2EB] leading-[1.05] font-heading">
              Adhi Vignesh
            </h1>
          </div>

          {/* Single Pop-Out Line About Me */}
          <p className="text-2xl sm:text-3xl lg:text-[32px] text-[#252722] dark:text-[#F5F2EB] font-medium leading-[1.3] font-heading">
            I build high-performance web applications and intelligent AI systems that deliver real results.
          </p>

          {/* What I am looking for */}
          <p className="text-base sm:text-lg text-[#68675F] dark:text-[#C0BFB3] leading-relaxed font-normal">
            Currently seeking full-time software engineering roles and high-impact client projects.
          </p>

          {/* Clean Action Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href="#projects"
              onClick={() => { try { playClickSound(); } catch {} }}
              className="btn-primary !px-6 !py-3.5 text-sm !font-bold tracking-tight inline-flex items-center gap-2"
            >
              <span>Explore Projects</span> <ArrowRightIcon />
            </a>

            <a
              href="/Adhi_Vignesh_Resume.pdf"
              download="Adhi_Vignesh_Resume.pdf"
              onClick={() => { try { playClickSound(); } catch {} }}
              className="btn-secondary !px-6 !py-3.5 text-sm !font-bold tracking-tight inline-flex items-center gap-2"
            >
              <DownloadIcon /> <span>Resume (PDF)</span>
            </a>
          </div>

        </div>

        {/* Right Column (Col-5): Crisp Transparent Waist-Up Cutout Grounded at Hero Bottom */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
          <div className="w-[288px] sm:w-[348px] md:w-[378px] lg:w-full max-w-[438px]">
            <picture>
              <source
                media="(max-width: 639px)"
                srcSet={`${import.meta.env.BASE_URL}images/developer-hoodie-mobile.webp`}
                type="image/webp"
              />
              <source
                srcSet={`${import.meta.env.BASE_URL}images/developer-hoodie.webp`}
                type="image/webp"
              />
              <img
                src={`${import.meta.env.BASE_URL}images/developer-hoodie.png`}
                alt="Adhi Vignesh — Full-Stack Developer and Applied AI Engineer"
                width={671}
                height={953}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block w-full h-auto max-h-[430px] sm:max-h-[510px] lg:max-h-[590px] object-contain object-bottom select-none pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, #000 97%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 97%, transparent 100%)',
                }}
              />
            </picture>
          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroPlayground;
