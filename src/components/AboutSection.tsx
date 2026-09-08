'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-transparent text-slate-100 px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 overflow-hidden">
      
      {/* ── AMBIENT GEOMETRIC ACCENTS (ZERO EXTERNAL DEPENDENCIES) ── */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] right-[4%] pointer-events-none z-0 opacity-20 hidden lg:block"
        aria-hidden="true"
      >
        <svg className="w-32 h-32 text-indigo-500/40 drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" />
          <line x1="50" y1="15" x2="50" y2="95" />
          <line x1="50" y1="55" x2="85" y2="35" />
          <line x1="50" y1="55" x2="15" y2="35" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[8%] left-[3%] pointer-events-none z-0 opacity-15 hidden lg:block"
        aria-hidden="true"
      >
        <svg className="w-28 h-28 text-cyan-500/40 drop-shadow-[0_0_20px_rgba(6,182,212,0.2)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="50" cy="50" r="35" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      </motion.div>

      {/* ── MAIN ART-DIRECTED CONTAINER ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-9 sm:space-y-11 md:space-y-12">
        
        {/* 1. SECTION LABEL & CONTROLLED HEADLINE */}
        <div className="space-y-3.5 max-w-3xl">
          <FadeIn delay={0} y={15}>
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              01 &mdash; PHILOSOPHY
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={20}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight leading-[1.08] text-slate-100">
              I build production-grade AI systems and full-stack software.
            </h2>
          </FadeIn>
        </div>

        {/* 2. THREE CORE PILLARS (LIQUID GLASS CARDS) */}
        <div className="space-y-4">
          <FadeIn delay={0.3} y={15}>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Core Engineering Focus &mdash;
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            
            {/* CARD 01 — BUILD */}
            <FadeIn delay={0.4} y={20}>
              <div className="liquid-glass p-5 sm:p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <span className="text-xs font-mono font-extrabold tracking-wider text-cyan-400 uppercase liquid-chip px-2.5 py-1 rounded-lg w-max">
                  01 &mdash; BUILD
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-cyan-200 transition-colors">
                  AI-powered applications<br />and ML systems.
                </p>
              </div>
            </FadeIn>

            {/* CARD 02 — ENGINEER */}
            <FadeIn delay={0.48} y={20}>
              <div className="liquid-glass p-5 sm:p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
                <span className="text-xs font-mono font-extrabold tracking-wider text-indigo-400 uppercase liquid-chip px-2.5 py-1 rounded-lg w-max">
                  02 &mdash; ENGINEER
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-indigo-200 transition-colors">
                  APIs, databases,<br />architecture and interfaces.
                </p>
              </div>
            </FadeIn>

            {/* CARD 03 — EXPLORE */}
            <FadeIn delay={0.56} y={20}>
              <div className="liquid-glass p-5 sm:p-6 rounded-2xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between space-y-4 group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
                <span className="text-xs font-mono font-extrabold tracking-wider text-purple-400 uppercase liquid-chip px-2.5 py-1 rounded-lg w-max">
                  03 &mdash; EXPLORE
                </span>
                <p className="text-sm font-semibold text-slate-100 leading-snug group-hover:text-purple-200 transition-colors">
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
