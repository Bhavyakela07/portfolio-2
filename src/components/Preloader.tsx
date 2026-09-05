'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1600; // ms
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#030509] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
        {/* Large 0 -> 100 Numeric Counter */}
        <div className="flex items-baseline font-mono font-extrabold text-slate-100">
          <span className="text-7xl sm:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-indigo-200 to-cyan-300">
            {count}
          </span>
          <span className="text-2xl sm:text-4xl text-indigo-400 font-bold ml-1">%</span>
        </div>

        {/* Subtitle Telemetry */}
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">
            BHAVYA KELA
          </span>
          <span className="text-[11px] font-mono text-slate-400 tracking-wider">
            INITIALIZING ARCHITECT WORKSPACE...
          </span>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-48 h-1 rounded-full bg-slate-900 border border-slate-800 overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        AI/ML & FULL-STACK SYSTEMS ARCHITECT
      </div>
    </motion.div>
  );
};
