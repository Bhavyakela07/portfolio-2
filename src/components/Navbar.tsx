'use client';

import React from 'react';
import { Command, Github, Sparkles, RefreshCw, Terminal, Layers } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface NavbarProps {
  openCmdK: () => void;
  replayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openCmdK, replayIntro }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#030509]/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 p-1 shadow-inner group-hover:border-indigo-500/60 transition-colors">
            <Terminal className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-sm tracking-tight flex items-center gap-2">
              Bhavya Kela
              <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 text-[10px] font-mono border border-indigo-800/60">
                AI/ML & FULL-STACK
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              CREATIVE DEVELOPER
            </span>
          </div>
        </a>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#projects" className="hover:text-indigo-300 transition-colors flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Projects
          </a>
          <a href="#skills" className="hover:text-indigo-300 transition-colors">
            3D Tech Vortex
          </a>
          <a href="#education" className="hover:text-indigo-300 transition-colors">
            Background
          </a>
          <a href="#contact" className="hover:text-indigo-300 transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Actions: Replay Intro, Cmd+K & Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Replay Intro Button */}
          <button
            onClick={replayIntro}
            className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Replay Hello Intro"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Cmd + K Trigger Button */}
          <button
            onClick={openCmdK}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-slate-300 text-xs font-mono transition-all duration-200 shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask AI / Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* GitHub Icon Link */}
          <a
            href={resumeData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
