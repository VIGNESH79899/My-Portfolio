import React from 'react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { playClickSound } from '../utils/sound';

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
              className="btn-primary !px-6 !py-3.5 text-sm !font-bold tracking-tight"
            >
              Explore Projects <FaArrowRight className="text-[10px]" />
            </a>

            <a
              href="/Adhi_Vignesh_Resume.pdf"
              download="Adhi_Vignesh_Resume.pdf"
              onClick={() => { try { playClickSound(); } catch {} }}
              className="btn-secondary !px-6 !py-3.5 text-sm !font-bold tracking-tight"
            >
              <FaDownload className="text-[10px] text-[#777C62] dark:text-[#ADB293]" /> Resume (PDF)
            </a>
          </div>

        </div>

        {/* Right Column (Col-5): Crisp Transparent Waist-Up Cutout Grounded at Hero Bottom */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end self-end">
          <div className="w-[290px] sm:w-[350px] md:w-[380px] lg:w-full max-w-[440px]">
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
