'use client';

import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      
      {/* ── 4 DECORATIVE 3D CORNER IMAGES ── */}
      
      {/* Top-Left: Moon Icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-0"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Icon"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      {/* Bottom-Left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-0"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Sphere Object"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      {/* Top-Right: Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-0"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Icon"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      {/* Bottom-Right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-0"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Cylinder Group"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      {/* ── CENTER CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-10 sm:gap-14 md:gap-16">
        
        {/* Heading: About me */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Character-by-Character Scroll Reveal Text */}
        <div className="max-w-[640px]">
          <AnimatedText
            text="as an AI/ML & full-stack engineer, i specialize in building end-to-end intelligent systems. from fine-tuning yolo vision models and engineering spacy + qdrant rag pipelines to building high-performance fastapi backends and responsive web applications, i thrive at the intersection of artificial intelligence and full-stack development. let's build something incredible together!"
            className="font-medium leading-relaxed justify-center text-[#D7E2EA]"
          />
        </div>

        {/* Contact Button */}
        <div className="pt-6 sm:pt-10">
          <ContactButton label="Contact Me" href="#contact" />
        </div>

      </div>

    </section>
  );
};

