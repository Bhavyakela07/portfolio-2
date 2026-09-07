'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, BrainCircuit, Workflow, Layers, Database, Server, Sparkles, Code, Terminal, Box, Cloud, FileCode, Eye } from 'lucide-react';

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
    radiusPercent: 42,
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    category: 'GenAI & RAG',
    icon: Database,
    metric: 'Vector Embedding Search',
    angle: 22.5,
    radiusPercent: 32,
  },
  {
    id: 'yolo',
    name: 'YOLOv8',
    category: 'Computer Vision',
    icon: Eye,
    metric: 'Real-Time Vision Pipeline',
    angle: 45,
    radiusPercent: 42,
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision',
    icon: Activity,
    metric: 'Frame Preprocessing',
    angle: 67.5,
    radiusPercent: 32,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend APIs',
    icon: Server,
    metric: 'Async REST Microservices',
    angle: 90,
    radiusPercent: 42,
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'Backend APIs',
    icon: Terminal,
    metric: 'Event-Driven Server Runtime',
    angle: 112.5,
    radiusPercent: 32,
  },
  {
    id: 'react',
    name: 'React 19',
    category: 'Frontend UI',
    icon: Layers,
    metric: 'Component State & Hooks',
    angle: 135,
    radiusPercent: 42,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend UI',
    icon: Code,
    metric: 'Utility Dark Styling',
    angle: 157.5,
    radiusPercent: 32,
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'Frontend UI',
    icon: Activity,
    metric: 'Layout Animations',
    angle: 180,
    radiusPercent: 42,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Databases',
    icon: Database,
    metric: 'ACID Ledger Storage',
    angle: 202.5,
    radiusPercent: 32,
  },
  {
    id: 'next',
    name: 'Next.js 14',
    category: 'Frontend UI',
    icon: Layers,
    metric: 'App Router & SSR',
    angle: 225,
    radiusPercent: 42,
  },
  {
    id: 'xgboost',
    name: 'XGBoost ML',
    category: 'ML & Data',
    icon: BrainCircuit,
    metric: 'Anomaly Scoring Model',
    angle: 247.5,
    radiusPercent: 32,
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'GenAI & RAG',
    icon: Sparkles,
    metric: 'Multi-Modal Reasoning',
    angle: 270,
    radiusPercent: 42,
  },
  {
    id: 'spacy',
    name: 'spaCy NLP',
    category: 'GenAI & RAG',
    icon: FileCode,
    metric: 'Entity Extraction Pipeline',
    angle: 292.5,
    radiusPercent: 32,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & Tools',
    icon: Box,
    metric: 'Containerized Services',
    angle: 315,
    radiusPercent: 42,
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Cloud & Tools',
    icon: Cloud,
    metric: 'EC2 & Cloud Deployments',
    angle: 337.5,
    radiusPercent: 32,
  }
];

export const TechCenterFlow: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<CenterFlowTechItem | null>(null);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#030509]">
      
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
      <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl bg-slate-950/90 border border-indigo-900/60 overflow-hidden flex items-center justify-center shadow-2xl">
        
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
            
            const rx = tech.radiusPercent * 1.1;
            const ry = tech.radiusPercent * 0.9;
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
              '0 0 30px rgba(99, 102, 241, 0.4)',
              '0 0 60px rgba(6, 182, 212, 0.6)',
              '0 0 30px rgba(99, 102, 241, 0.4)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-indigo-950 via-slate-950 to-cyan-950 border-2 border-cyan-400/60 flex flex-col items-center justify-center p-3 text-center shadow-2xl backdrop-blur-md"
        >
          <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mb-1 animate-pulse" />
          <span className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase font-mono">
            AI ENGINE
          </span>
          <span className="text-[10px] text-cyan-300 font-mono tracking-tight">
            System Core
          </span>
        </motion.div>

        {/* 16 Radial Tech Nodes */}
        {resumeMain16TechStack.map((tech) => {
          const isHovered = hoveredTech?.id === tech.id;
          const rad = (tech.angle - 90) * (Math.PI / 180);
          
          const rx = tech.radiusPercent * 1.1;
          const ry = tech.radiusPercent * 0.9;
          const posX = 50 + rx * Math.cos(rad);
          const posY = 50 + ry * Math.sin(rad);

          const IconComp = tech.icon;

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
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-2 shadow-lg ${
                  isHovered
                    ? 'bg-cyan-950 text-white border-cyan-400 shadow-cyan-500/30'
                    : 'bg-slate-950/90 text-slate-300 border-indigo-900/60 hover:border-indigo-400'
                }`}
              >
                {/* Glowing Dot */}
                <span className={`w-2.5 h-2.5 rounded-full ${isHovered ? 'bg-cyan-300 animate-ping' : 'bg-cyan-400'}`} />
                
                <IconComp className={`w-3.5 h-3.5 ${isHovered ? 'text-cyan-300' : 'text-indigo-400'}`} />
                
                <span className="text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap">{tech.name}</span>

                {/* Hover Tooltip Badge */}
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-slate-950 text-cyan-300 text-[10px] font-mono border border-cyan-500/60 whitespace-nowrap shadow-lg z-50 pointer-events-none"
                  >
                    {tech.metric}
                  </motion.span>
                )}
              </motion.div>
            </div>
          );
        })}

      </div>

      {/* Core Languages & Infrastructure Strip */}
      <div className="mt-10 p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
        <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          CORE PROGRAMMING LANGUAGES &amp; INFRASTRUCTURE
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {[
            "Python 3.11", "TypeScript", "JavaScript (ES6+)", "SQL", "C++", "Java",
            "REST API Architecture", "Docker", "AWS Cloud", "Git & GitHub", "PyTorch"
          ].map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-mono border border-slate-800 shadow-sm hover:border-cyan-400/50 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
