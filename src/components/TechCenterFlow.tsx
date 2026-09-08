'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, BrainCircuit, Workflow, Layers, Database, Server, Sparkles, Code, Terminal, Box, Cloud, FileCode, Eye, GitBranch, Flame } from 'lucide-react';

interface CenterFlowTechItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  metric: string;
  angle: number; // Angle in degrees (0 to 360)
  radiusPercent: number; // Distance percentage from center hub (32% inner, 42% outer)
}

const resumeMain16TechStack: CenterFlowTechItem[] = [
  {
    id: 'groq',
    name: 'Groq (Llama 3)',
    category: 'GenAI & RAG',
    icon: Cpu,
    metric: 'LPU Inference Speedup',
    angle: 0,
    radiusPercent: 39,
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    category: 'GenAI & RAG',
    icon: Database,
    metric: 'Vector Embedding Search',
    angle: 22.5,
    radiusPercent: 25,
  },
  {
    id: 'yolo',
    name: 'YOLOv8',
    category: 'Computer Vision',
    icon: Eye,
    metric: 'Real-Time Vision Pipeline',
    angle: 45,
    radiusPercent: 39,
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision',
    icon: Activity,
    metric: 'Frame Preprocessing',
    angle: 67.5,
    radiusPercent: 25,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend APIs',
    icon: Server,
    metric: 'Async REST Microservices',
    angle: 90,
    radiusPercent: 39,
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'Backend APIs',
    icon: Terminal,
    metric: 'Event-Driven Server Runtime',
    angle: 112.5,
    radiusPercent: 25,
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend UI',
    icon: Layers,
    metric: 'Component State & Hooks',
    angle: 135,
    radiusPercent: 39,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend UI',
    icon: Code,
    metric: 'Utility Dark Styling',
    angle: 157.5,
    radiusPercent: 25,
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'Frontend UI',
    icon: Activity,
    metric: 'Layout Animations',
    angle: 180,
    radiusPercent: 39,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Databases',
    icon: Database,
    metric: 'ACID Ledger Storage',
    angle: 202.5,
    radiusPercent: 25,
  },
  {
    id: 'next',
    name: 'Next.js 14',
    category: 'Frontend UI',
    icon: Layers,
    metric: 'App Router & SSR',
    angle: 225,
    radiusPercent: 39,
  },
  {
    id: 'xgboost',
    name: 'XGBoost ML',
    category: 'ML & Data',
    icon: BrainCircuit,
    metric: 'Anomaly Scoring Model',
    angle: 247.5,
    radiusPercent: 25,
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'GenAI & RAG',
    icon: Sparkles,
    metric: 'Multi-Modal Reasoning',
    angle: 270,
    radiusPercent: 39,
  },
  {
    id: 'spacy',
    name: 'spaCy NLP',
    category: 'GenAI & RAG',
    icon: FileCode,
    metric: 'Entity Extraction Pipeline',
    angle: 292.5,
    radiusPercent: 25,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & Tools',
    icon: Box,
    metric: 'Containerized Services',
    angle: 315,
    radiusPercent: 39,
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Cloud & Tools',
    icon: Cloud,
    metric: 'EC2 & Cloud Deployments',
    angle: 337.5,
    radiusPercent: 25,
  }
];

export const TechCenterFlow: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<CenterFlowTechItem | null>(null);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3.5 py-1 rounded-full border border-cyan-800/60 inline-flex items-center gap-1.5">
          <Workflow className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          TECH STACK / 02
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Languages, Frameworks &amp; Core Architecture
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Core technologies engineered into end-to-end intelligent applications &mdash; connecting AI models with APIs, vector storage, and modern interfaces.
        </p>
      </div>

      {/* Full Width Center Flow Container */}
      <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[700px] rounded-3xl liquid-glass overflow-hidden flex items-center justify-center shadow-2xl">
        {/* Top Specular Rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        
        {/* SVG Connecting Light Beams Flowing Towards Center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="fullFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
            </linearGradient>

            <filter id="hubGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Paths for All 16 Tech Nodes */}
          {resumeMain16TechStack.map((tech) => {
            const isHovered = hoveredTech?.id === tech.id;
            const rad = (tech.angle - 90) * (Math.PI / 180);
            
            const rx = tech.radiusPercent * 0.78;
            const ry = tech.radiusPercent * 0.88;
            const startX = 50 + rx * Math.cos(rad);
            const startY = 50 + ry * Math.sin(rad);

            return (
              <g key={tech.id}>
                <line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2="50%"
                  y2="50%"
                  stroke={isHovered ? '#06b6d4' : 'rgba(99, 102, 241, 0.2)'}
                  strokeWidth={isHovered ? '2.5' : '1.2'}
                  strokeDasharray={isHovered ? 'none' : '4 4'}
                />

                <motion.line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2="50%"
                  y2="50%"
                  stroke="url(#fullFlowGradient)"
                  strokeWidth={isHovered ? '3.5' : '2'}
                  strokeDasharray="14 14"
                  animate={{
                    strokeDashoffset: [56, 0],
                  }}
                  transition={{
                    duration: isHovered ? 0.7 : 1.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  filter={isHovered ? 'url(#hubGlow)' : undefined}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Core AI Engine Hub */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(99, 102, 241, 0.3)',
              '0 0 60px rgba(6, 182, 212, 0.5)',
              '0 0 30px rgba(99, 102, 241, 0.3)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full liquid-glass border-2 border-cyan-400/60 flex flex-col items-center justify-center p-3 text-center shadow-2xl overflow-hidden backdrop-blur-2xl"
        >
          {/* Top Specular Arc */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full" />

          <BrainCircuit className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-400 mb-1 animate-pulse relative z-10" />
          <span className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase font-mono relative z-10">
            AI ENGINE
          </span>
          <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono tracking-tight relative z-10">
            System Core
          </span>
        </motion.div>

        {/* 16 Radial Tech Nodes */}
        {resumeMain16TechStack.map((tech) => {
          const isHovered = hoveredTech?.id === tech.id;
          const rad = (tech.angle - 90) * (Math.PI / 180);
          
          const rx = tech.radiusPercent * 0.78;
          const ry = tech.radiusPercent * 0.88;
          const posX = 50 + rx * Math.cos(rad);
          const posY = 50 + ry * Math.sin(rad);

          return (
            <div
              key={tech.id}
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-30 cursor-pointer"
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                className={`liquid-chip px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg ${
                  isHovered
                    ? 'bg-cyan-950/80 text-cyan-200 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'text-slate-200 hover:border-white/30'
                }`}
              >
                <span className="text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap tracking-wide">{tech.name}</span>

                {/* Hover Tooltip Badge */}
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md liquid-chip text-cyan-300 text-[10px] font-mono border-cyan-500/60 whitespace-nowrap shadow-xl z-50 pointer-events-none"
                  >
                    {tech.metric}
                  </motion.span>
                )}
              </motion.div>
            </div>
          );
        })}

      </div>

      {/* Core Languages & Infrastructure Infinite Marquee Strip */}
      <div className="mt-10 py-7 px-4 rounded-3xl liquid-glass shadow-2xl relative overflow-hidden">
        
        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

        {/* Section Label */}
        <div className="flex items-center justify-center gap-2.5 mb-5 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            CORE PROGRAMMING LANGUAGES &amp; INFRASTRUCTURE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Dual Edge Feathered Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0B0D13] via-[#0B0D13]/90 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0B0D13] via-[#0B0D13]/90 to-transparent pointer-events-none z-20" />

        {/* Infinite Scrolling Dual Tracks */}
        <div className="space-y-3 relative z-10">
          
          {/* Row 1: Leftward Infinite Scroll */}
          <div className="flex overflow-hidden select-none">
            <div className="flex shrink-0 items-center gap-3 animate-marquee-left hover:[animation-play-state:paused]">
              {[
                { name: 'Python 3.11', icon: Terminal, color: 'text-amber-400' },
                { name: 'TypeScript', icon: Code, color: 'text-blue-400' },
                { name: 'JavaScript (ES6+)', icon: Code, color: 'text-yellow-400' },
                { name: 'PyTorch Deep Learning', icon: Flame, color: 'text-rose-400' },
                { name: 'SQL & Query Optimization', icon: Database, color: 'text-emerald-400' },
                { name: 'C++ Systems', icon: Cpu, color: 'text-cyan-400' },
                { name: 'Python 3.11', icon: Terminal, color: 'text-amber-400' },
                { name: 'TypeScript', icon: Code, color: 'text-blue-400' },
                { name: 'JavaScript (ES6+)', icon: Code, color: 'text-yellow-400' },
                { name: 'PyTorch Deep Learning', icon: Flame, color: 'text-rose-400' },
                { name: 'SQL & Query Optimization', icon: Database, color: 'text-emerald-400' },
                { name: 'C++ Systems', icon: Cpu, color: 'text-cyan-400' },
                { name: 'Python 3.11', icon: Terminal, color: 'text-amber-400' },
                { name: 'TypeScript', icon: Code, color: 'text-blue-400' },
                { name: 'JavaScript (ES6+)', icon: Code, color: 'text-yellow-400' },
                { name: 'PyTorch Deep Learning', icon: Flame, color: 'text-rose-400' },
                { name: 'SQL & Query Optimization', icon: Database, color: 'text-emerald-400' },
                { name: 'C++ Systems', icon: Cpu, color: 'text-cyan-400' },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={`r1-${idx}`}
                    className="liquid-chip flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-200 text-xs font-mono font-medium hover:border-cyan-400/60 hover:text-white transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap group"
                  >
                    <IconComp className={`w-3.5 h-3.5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Rightward Infinite Scroll */}
          <div className="flex overflow-hidden select-none">
            <div className="flex shrink-0 items-center gap-3 animate-marquee-right hover:[animation-play-state:paused]">
              {[
                { name: 'AWS Cloud (EC2 & Lambda)', icon: Cloud, color: 'text-orange-400' },
                { name: 'Docker Containers', icon: Box, color: 'text-sky-400' },
                { name: 'REST API Architecture', icon: Workflow, color: 'text-indigo-400' },
                { name: 'Git & GitHub Workflows', icon: GitBranch, color: 'text-purple-400' },
                { name: 'Linux / Shell Scripting', icon: Terminal, color: 'text-emerald-300' },
                { name: 'Java Enterprise', icon: Server, color: 'text-red-400' },
                { name: 'AWS Cloud (EC2 & Lambda)', icon: Cloud, color: 'text-orange-400' },
                { name: 'Docker Containers', icon: Box, color: 'text-sky-400' },
                { name: 'REST API Architecture', icon: Workflow, color: 'text-indigo-400' },
                { name: 'Git & GitHub Workflows', icon: GitBranch, color: 'text-purple-400' },
                { name: 'Linux / Shell Scripting', icon: Terminal, color: 'text-emerald-300' },
                { name: 'Java Enterprise', icon: Server, color: 'text-red-400' },
                { name: 'AWS Cloud (EC2 & Lambda)', icon: Cloud, color: 'text-orange-400' },
                { name: 'Docker Containers', icon: Box, color: 'text-sky-400' },
                { name: 'REST API Architecture', icon: Workflow, color: 'text-indigo-400' },
                { name: 'Git & GitHub Workflows', icon: GitBranch, color: 'text-purple-400' },
                { name: 'Linux / Shell Scripting', icon: Terminal, color: 'text-emerald-300' },
                { name: 'Java Enterprise', icon: Server, color: 'text-red-400' },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={`r2-${idx}`}
                    className="liquid-chip flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-200 text-xs font-mono font-medium hover:border-indigo-400/60 hover:text-white transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap group"
                  >
                    <IconComp className={`w-3.5 h-3.5 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Smooth CSS Infinite Keyframe Animations */}
        <style>{`
          @keyframes marqueeLeftTrack {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-33.333333%); }
          }
          @keyframes marqueeRightTrack {
            0% { transform: translateX(-33.333333%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            animation: marqueeLeftTrack 32s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRightTrack 35s linear infinite;
          }
        `}</style>
      </div>

    </section>
  );
};
