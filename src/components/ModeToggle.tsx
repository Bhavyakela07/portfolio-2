'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BrainCircuit } from 'lucide-react';
import { Mode } from '../types/portfolio';

interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="relative inline-flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
      <button
        onClick={() => setMode('fullstack')}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
          mode === 'fullstack' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {mode === 'fullstack' && (
          <motion.div
            layoutId="activeModeTab"
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-lg shadow-indigo-500/30"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <Zap className={`w-3.5 h-3.5 relative z-10 ${mode === 'fullstack' ? 'text-amber-300' : ''}`} />
        <span className="relative z-10">Full-Stack ⚡</span>
      </button>

      <button
        onClick={() => setMode('aiml')}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
          mode === 'aiml' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        {mode === 'aiml' && (
          <motion.div
            layoutId="activeModeTab"
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg shadow-purple-500/30"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <BrainCircuit className={`w-3.5 h-3.5 relative z-10 ${mode === 'aiml' ? 'text-cyan-300' : ''}`} />
        <span className="relative z-10">AI / ML 🤖</span>
      </button>
    </div>
  );
};
