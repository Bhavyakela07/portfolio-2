'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, ArrowRight, Shield, Cpu } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Step 0: "Hello." (0ms - 1200ms)
    // Step 1: "I'm Bhavya Kela." (1200ms - 2400ms)
    // Step 2: "Creative AI/ML & Full-Stack Systems Architect." (2400ms - 4000ms)
    // Step 3: Initializing Workspace Bar (4000ms - 5500ms)

    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2500);
    const timer3 = setTimeout(() => setStep(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Progress Bar Simulation for Step 3
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 400);
            return 100;
          }
          return prev + 12;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [step, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#030509] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background Architectural Dot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2 group z-50"
      >
        Skip Intro
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Cinematic Center Box */}
      <div className="max-w-2xl w-full text-center relative z-10 space-y-6">
        
        {/* Step 0: Hello */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-serif text-slate-100 tracking-wide font-light italic"
            >
              Hello.
            </motion.div>
          )}

          {/* Step 1: I'm Bhavya Kela */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">[ SYSTEM ARCHITECT ]</span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
                I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400">Bhavya Kela</span>.
              </h1>
            </motion.div>
          )}

          {/* Step 2: Creative AI/ML & Full-Stack Systems Architect */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ UNIFIED ECOSYSTEM ]</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-200 tracking-tight">
                Creative AI/ML & Full-Stack Systems Architect
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto font-mono">
                Fusing RAG Pipelines, Computer Vision & LLMs with High-Performance Web Infrastructure.
              </p>
            </motion.div>
          )}

          {/* Step 3: Workspace Initialization Progress */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-w-md mx-auto"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  INITIALIZING ARCHITECT WORKSPACE...
                </span>
                <span className="text-indigo-400 font-bold">{progress}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1">
                <span>[ STATUS: OPERATIONAL ]</span>
                <span>[ 5 PROJECTS LOADED ]</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Subtle bottom watermark */}
      <div className="absolute bottom-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        BHAVYA KELA ARCHITECT WORKSPACE • PARUL UNIV CS &apos;27
      </div>
    </motion.div>
  );
};
