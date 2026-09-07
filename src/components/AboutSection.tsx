'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 overflow-hidden">
      
      {/* ── DECORATIVE 3D ACCENTS (POSITIONED STRICTLY IN NEGATIVE SPACE) ── */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] right-[3%] pointer-events-none z-0 opacity-20 hidden lg:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          aria-hidden="true"
          className="w-[120px] xl:w-[150px] h-auto drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[8%] left-[2%] pointer-events-none z-0 opacity-15 hidden lg:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          aria-hidden="true"
          className="w-[100px] xl:w-[130px] h-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* ── MAIN ART-DIRECTED CONTAINER ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-9 sm:space-y-11 md:space-y-12">
        
        {/* 1. SECTION LABEL & CONTROLLED HEADLINE */}
        <div className="space-y-3.5 max-w-3xl">
          <FadeIn delay={0} y={15}>
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              ABOUT / 01
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={20} blur={2}>
            <h2
              className="font-black uppercase tracking-tight leading-[1.08] text-slate-100 text-balance"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)' }}
            >
              Building intelligent<br className="hidden sm:inline" /> systems, end to end.
            </h2>
          </FadeIn>
        </div>

        {/* 2. INTRO + PHILOSOPHY CARD (UNIFIED COMPOSITION) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Introduction Paragraphs */}
          <FadeIn delay={0.2} y={20} className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
            <p className="text-base sm:text-lg font-normal leading-relaxed text-slate-200">
              I&apos;m Bhavya Kela, an AI/ML &amp; Full-Stack Engineer focused on turning AI concepts into usable software.
            </p>
            <p className="text-sm sm:text-base font-light leading-relaxed text-slate-400">
              I work across Generative AI, RAG, Computer Vision, Machine Learning, and full-stack development, connecting models with APIs, databases, and modern interfaces.
            </p>
          </FadeIn>

          {/* Philosophy Statement Card */}
          <FadeIn delay={0.3} y={20} className="lg:col-span-5 flex">
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-indigo-500/25 relative overflow-hidden group w-full flex flex-col justify-center">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-300" />
              <div className="text-xs font-mono font-extrabold tracking-widest text-indigo-400 uppercase mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                AI &times; ENGINEERING &times; PRODUCT
              </div>
              <p className="text-xs sm:text-sm font-normal leading-relaxed text-slate-300">
                I enjoy solving problems where intelligence isn&apos;t isolated in a model &mdash; it has to work reliably as part of a complete system.
              </p>
            </div>
          </FadeIn>

        </div>

        {/* 3. CORE DIMENSIONS CARDS */}
        <div className="space-y-3.5">
          <FadeIn delay={0.35} y={15}>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              CORE DIMENSIONS
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            
            {/* CARD 01 — BUILD */}
            <FadeIn delay={0.4} y={20}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between space-y-3 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-cyan-400 uppercase bg-cyan-950/50 px-2.5 py-1 rounded-md border border-cyan-900/60 w-max">
                  01 &mdash; BUILD
                </span>
                <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  AI-powered applications<br />and ML systems.
                </p>
              </div>
            </FadeIn>

            {/* CARD 02 — ENGINEER */}
            <FadeIn delay={0.48} y={20}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between space-y-3 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-indigo-400 uppercase bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-900/60 w-max">
                  02 &mdash; ENGINEER
                </span>
                <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  APIs, databases,<br />architecture and interfaces.
                </p>
              </div>
            </FadeIn>

            {/* CARD 03 — EXPLORE */}
            <FadeIn delay={0.56} y={20}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between space-y-3 group">
                <span className="text-xs font-mono font-extrabold tracking-wider text-purple-400 uppercase bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-900/60 w-max">
                  03 &mdash; EXPLORE
                </span>
                <p className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">
                  New AI technologies,<br />architectures and real-world use cases.
                </p>
              </div>
            </FadeIn>

          </div>
        </div>

        {/* 4. CURRENT FOCUS STRIP */}
        <FadeIn delay={0.65} y={15}>
          <div className="pt-3.5 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs sm:text-sm font-mono">
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
