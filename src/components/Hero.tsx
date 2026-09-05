'use client';

import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';

interface HeroProps {
  openCmdK: () => void;
}

export const Hero: React.FC<HeroProps> = ({ openCmdK }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA] px-4 sm:px-6 md:px-10 pt-6 md:pt-8 pb-8">
      
      {/* ── 1. NAVBAR ── */}
      <FadeIn delay={0} y={-15} className="w-full z-20">
        <nav className="flex items-center justify-between w-full text-xs sm:text-base md:text-lg lg:text-[1.25rem] font-medium uppercase tracking-wider text-[#D7E2EA]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">
            About
          </a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">
            Projects
          </a>
          <a href="#skills" className="hover:opacity-70 transition-opacity duration-200">
            Stack
          </a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">
            Contact
          </a>
        </nav>
      </FadeIn>

      {/* ── 2. PERFECTLY FRAMED HERO TITLE: "HI, I'M BHAVYA" ── */}
      <div className="my-auto w-full text-center relative z-10 py-2 sm:py-4">
        <FadeIn delay={0.15} y={30} blur={3} className="w-full flex items-center justify-center">
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center select-none"
            style={{ fontSize: 'clamp(2.4rem, 11vw, 10.5rem)' }}
          >
            hi, i&apos;m bhavya
          </h1>
        </FadeIn>
      </div>

      {/* ── 3. CENTERED MAGNETIC HERO PORTRAIT (JACK STYLE CUTOUT - NO BOX) ── */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.4} y={25}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            <img
              src="/images/creator_avatar_mask_cutout.png"
              alt="Bhavya Kela -- AI/ML & Full-Stack Engineer"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* ── 4. BOTTOM BAR: LEFT TAGLINE & RIGHT SINGLE CONTACT BUTTON ── */}
      <div className="relative z-20 flex justify-between items-end w-full pt-4">
        {/* Left Subhead */}
        <FadeIn delay={0.3} y={15}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[210px] md:max-w-[250px]"
            style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1.25rem)' }}
          >
            an ai/ml & full-stack engineer driven by crafting striking projects
          </p>
        </FadeIn>

        {/* Single Right Contact Button */}
        <FadeIn delay={0.45} y={15}>
          <ContactButton label="Contact Me" href="#contact" />
        </FadeIn>
      </div>

    </section>
  );
};
