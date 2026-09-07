'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-12 lg:px-16 py-24 overflow-hidden">
      
      {/* ── DECORATIVE 3D CORNER FRAMING ELEMENTS ── */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-0 opacity-40">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          aria-hidden="true"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-0 opacity-40">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          aria-hidden="true"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[6%] left-[3%] sm:left-[6%] md:left-[8%] pointer-events-none z-0 opacity-30">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          aria-hidden="true"
          className="w-[90px] sm:w-[120px] md:w-[150px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[6%] right-[3%] sm:right-[6%] md:right-[8%] pointer-events-none z-0 opacity-30">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          aria-hidden="true"
          className="w-[110px] sm:w-[150px] md:w-[190px] h-auto drop-shadow-2xl"
        />
      </FadeIn>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12 sm:space-y-14 md:space-y-16">
        
        {/* 1. SECTION LABEL & MAIN HEADLINE */}
        <div className="space-y-4 max-w-4xl">
          <FadeIn delay={0} y={20}>
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3.5 py-1.5 rounded-full border border-cyan-800/60">
              ABOUT / 01
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={25} blur={2}>
            <h2
              className="font-black uppercase tracking-tight leading-[1.05] text-slate-100 text-balance"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)' }}
            >
              Building intelligent<br className="hidden sm:inline" /> systems, end to end.
            </h2>
          </FadeIn>
        </div>

        {/* 2. INTRODUCTION & ENGINEERING STATEMENT (GRID ON DESKTOP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Introduction Paragraphs */}
          <FadeIn delay={0.2} y={25} className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-200">
              I&apos;m Bhavya Kela, an AI/ML &amp; Full-Stack Engineer focused on turning AI concepts into usable software.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-slate-400 font-sans">
              I work across Generative AI, RAG, Computer Vision, Machine Learning, and full-stack development, connecting models with APIs, databases, and modern interfaces.
            </p>
          </FadeIn>

          {/* Visually Distinct Engineering Statement */}
          <FadeIn delay={0.3} y={25} className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-2xl glass-card border border-indigo-500/20 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-300" />
              <div className="text-xs font-mono font-extrabold tracking-widest text-indigo-400 uppercase mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                AI &times; ENGINEERING &times; PRODUCT
              </div>
              <p className="text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-300">
                I enjoy solving problems where intelligence isn&apos;t isolated in a model &mdash; it has to work reliably as part of a complete system.
              </p>
            </div>
          </FadeIn>

        </div>

        {/* 3. THREE CORE AREAS (COMPACT 3-COLUMN CARDS) */}
        <div className="space-y-4">
          <FadeIn delay={0.35} y={15}>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              CORE DIMENSIONS OF MY WORK
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* 01 — BUILD */}
            <FadeIn delay={0.4} y={25}>
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-cyan-400 uppercase bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-900/60 w-max">
                  01 &mdash; BUILD
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  AI-powered applications<br />and ML systems.
                </p>
              </div>
            </FadeIn>

            {/* 02 — ENGINEER */}
            <FadeIn delay={0.48} y={25}>
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-indigo-400 uppercase bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-900/60 w-max">
                  02 &mdash; ENGINEER
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  APIs, databases,<br />architecture and interfaces.
                </p>
              </div>
            </FadeIn>

            {/* 03 — EXPLORE */}
            <FadeIn delay={0.56} y={25}>
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-purple-400 uppercase bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-900/60 w-max">
                  03 &mdash; EXPLORE
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  New AI technologies,<br />architectures and real-world use cases.
                </p>
              </div>
            </FadeIn>

          </div>
        </div>

        {/* 4. CURRENT FOCUS (SUBTLE & COMPACT STRIP) */}
        <FadeIn delay={0.65} y={15}>
          <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm font-mono">
            <span className="text-slate-400 uppercase font-bold tracking-wider shrink-0">
              Currently exploring &mdash;
            </span>
            <div className="flex flex-wrap gap-2 text-slate-300 font-medium">
              {[
                'Generative AI',
                'RAG',
                'Computer Vision',
                'AI Agents',
                'ML Systems'
              ].map((item, idx, arr) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="text-cyan-300 hover:text-white transition-colors">{item}</span>
                  {idx < arr.length - 1 && <span className="text-slate-700 font-bold">&middot;</span>}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>

    </section>
  );
};
