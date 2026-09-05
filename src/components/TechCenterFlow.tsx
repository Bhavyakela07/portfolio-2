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
    metric: '18x LPU Speedup',
    angle: 0,
    radiusPercent: 42,
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    category: 'GenAI & RAG',
    icon: Database,
    metric: '90% Precision',
    angle: 22.5,
    radiusPercent: 32,
  },
  {
    id: 'yolo',
    name: 'YOLOv8',
    category: 'Computer Vision',
    icon: Eye,
    metric: '< 1s Latency',
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
    name: 'FastAPI REST',
    category: 'Backend APIs',
    icon: Server,
    metric: 'Sub-second REST',
    angle: 90,
    radiusPercent: 42,
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'Backend APIs',
    icon: Terminal,
    metric: 'Scalable Routes',
    angle: 112.5,
    radiusPercent: 32,
  },
  {
    id: 'react',
    name: 'React 19 & TS',
    category: 'Frontend UI',
    icon: Layers,
    metric: '60 FPS UI',
    angle: 135,
    radiusPercent: 42,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS v4',
    category: 'Frontend UI',
    icon: Code,
    metric: 'Glassmorphism UI',
    angle: 157.5,
    radiusPercent: 32,
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'Frontend UI',
    icon: Activity,
    metric: 'Spring Physics',
    angle: 180,
    radiusPercent: 42,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL DB',
    category: 'Databases',
    icon: Database,
    metric: 'Audit Ledger',
    angle: 202.5,
    radiusPercent: 32,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases',
    icon: Database,
    metric: 'NoSQL Storage',
    angle: 225,
    radiusPercent: 42,
  },
  {
    id: 'xgboost',
    name: 'XGBoost ML',
    category: 'ML & Data',
    icon: BrainCircuit,
    metric: 'Calibrated ML',
    angle: 247.5,
    radiusPercent: 32,
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'GenAI & RAG',
    icon: Sparkles,
    metric: '100% JSON Verdicts',
    angle: 270,
    radiusPercent: 42,
  },
  {
    id: 'spacy',
    name: 'SpaCy NLP',
    category: 'GenAI & RAG',
    icon: FileCode,
    metric: 'Tokenized NLP',
    angle: 292.5,
    radiusPercent: 32,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & Tools',
    icon: Box,
    metric: 'Containers',
    angle: 315,
    radiusPercent: 42,
  },
  {
    id: 'aws',
    name: 'AWS (EC2/Lambda)',
    category: 'Cloud & Tools',
    icon: Cloud,
    metric: 'Cloud Host',
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
          FULL-WIDTH CENTER FLOW TECH STACK
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Core 16 Resume Technologies
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Light beams flowing from all 16 core technologies towards the central AI Engine hub. Hover any node to highlight metrics.
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

        {/* Central Hub Node */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(99, 102, 241, 0.35)',
              '0 0 55px rgba(6, 182, 212, 0.55)',
              '0 0 30px rgba(99, 102, 241, 0.35)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-950 to-purple-950 border-2 border-indigo-500/80 flex flex-col items-center justify-center p-3 text-center shadow-2xl backdrop-blur-xl group cursor-pointer"
        >
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/25 transition-all pointer-events-none" />
          <Layers className="w-10 h-10 text-cyan-400 animate-pulse mb-1" />
          <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-100 tracking-tight leading-tight">
            AI ENGINE CORE
          </span>
          <span className="text-[9px] font-mono text-indigo-300 mt-0.5">UNIFIED STACK</span>
        </motion.div>

        {/* All 16 Surrounding Tech Nodes (Fixed positioning wrapper to prevent right shift on click/hover!) */}
        {resumeMain16TechStack.map((tech) => {
          const isHovered = hoveredTech?.id === tech.id;
          const IconComp = tech.icon;

          const rad = (tech.angle - 90) * (Math.PI / 180);
          const rx = tech.radiusPercent * 1.1;
          const ry = tech.radiusPercent * 0.9;
          const left = 50 + rx * Math.cos(rad);
          const top = 50 + ry * Math.sin(rad);

          return (
            <div
              key={tech.id}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 40 : 30,
              }}
            >
              <motion.div
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative cursor-pointer flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl transition-all duration-150 shadow-xl ${
                  isHovered
                    ? 'bg-indigo-600 border-2 border-cyan-400 text-white font-bold shadow-indigo-600/60'
                    : 'bg-slate-900/95 backdrop-blur-md border border-slate-800 text-slate-300 hover:border-indigo-500/60 hover:text-white'
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

      {/* Additional Languages & Specialized Tools Section (Complementing the 16 Center Flow Nodes) */}
      <div className="mt-10 p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
        <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
          ADDITIONAL PROGRAMMING LANGUAGES & TOOLING
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {[
            "Python 3.11", "C++", "Java", "JavaScript (ES6+)", "TypeScript", "SQL",
            "Streamlit", "REST API Architecture", "Webhooks", "Git", "GitHub", "PyTorch", "Isotonic Calibration"
          ].map((item) => (
            <span
              key={item}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-mono border border-slate-800 shadow-sm hover:border-emerald-400/50 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};
