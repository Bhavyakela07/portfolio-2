'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Server, Database, Code2, ArrowUpRight, Sparkles, Workflow, CheckCircle2 } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'ai' | 'backend' | 'frontend' | 'database';
  usedInProjects: {
    id: string;
    title: string;
    role: string;
    metric: string;
  }[];
}

const techUsageData: TechItem[] = [
  {
    name: 'Qdrant Vector DB',
    category: 'ai',
    usedInProjects: [
      {
        id: 'skill-gap-analyzer',
        title: 'Skill-Gap-Analyzer',
        role: 'Semantic Vector Search Indexing for Resume-to-Job Matching',
        metric: '~90% False-Positive Match Reduction'
      }
    ]
  },
  {
    name: 'Groq (Llama 3 LLM)',
    category: 'ai',
    usedInProjects: [
      {
        id: 'skill-gap-analyzer',
        title: 'Skill-Gap-Analyzer',
        role: 'LLM Verification Stage powered by custom LPU hardware',
        metric: '18x Faster Inference Latency'
      }
    ]
  },
  {
    name: 'XGBoost ML Engine',
    category: 'ai',
    usedInProjects: [
      {
        id: 'recoverOS',
        title: 'RecoverOS',
        role: 'CalibratedClassifierCV probability inference for payment retries',
        metric: 'Isotonic Probability Calibration'
      }
    ]
  },
  {
    name: 'YOLOv8 Computer Vision',
    category: 'ai',
    usedInProjects: [
      {
        id: 'kavaach',
        title: 'KAVAACH',
        role: 'Fine-tuned vision model for real-time pothole identification',
        metric: '< 1 Sec Real-time Inference'
      }
    ]
  },
  {
    name: 'Google Gemini API',
    category: 'ai',
    usedInProjects: [
      {
        id: 'perspectai',
        title: 'PerspectAI',
        role: 'Generative claim fact-checking & JSON response structuring',
        metric: '100% Parseable JSON Output'
      },
      {
        id: 'ai-virtual-photographer',
        title: 'AI Virtual Photographer',
        role: 'Dual Gemini Vision API chain for garment & outfit compositing',
        metric: '< 1 Day Demo Turnaround'
      }
    ]
  },
  {
    name: 'FastAPI Backend',
    category: 'backend',
    usedInProjects: [
      {
        id: 'recoverOS',
        title: 'RecoverOS',
        role: 'REST API service executing deterministic policy rules',
        metric: 'Database-Authoritative Audit'
      },
      {
        id: 'skill-gap-analyzer',
        title: 'Skill-Gap-Analyzer',
        role: 'High-speed Python microservice serving RAG pipelines',
        metric: 'Multi-stage NLP API'
      },
      {
        id: 'kavaach',
        title: 'KAVAACH',
        role: 'Model inference server delivering geo-tagged overlays',
        metric: 'Sub-second API Latency'
      }
    ]
  },
  {
    name: 'React 19 & TypeScript',
    category: 'frontend',
    usedInProjects: [
      {
        id: 'skill-gap-analyzer',
        title: 'Skill-Gap-Analyzer',
        role: 'Glassmorphic component library, Framer Motion & Recharts UI',
        metric: 'Reusable UI Component Library'
      },
      {
        id: 'recoverOS',
        title: 'RecoverOS',
        role: 'Interactive audit dashboard with 1-click PDF certificate generator',
        metric: 'Razorpay AI Buildathon UI'
      }
    ]
  },
  {
    name: 'PostgreSQL Relational DB',
    category: 'database',
    usedInProjects: [
      {
        id: 'recoverOS',
        title: 'RecoverOS',
        role: 'Idempotency ledger & transactional payment failure history',
        metric: 'Audit-Proof Relational Schema'
      },
      {
        id: 'kavaach',
        title: 'KAVAACH',
        role: 'Geo-spatial detection overlay database with lat/long indexing',
        metric: 'Sub-second Geo Queries'
      }
    ]
  }
];

export const TechUsageMap: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem>(techUsageData[0]);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60">
          INTERACTIVE TECH STACK MAP
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Where Each Technology Is Used
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto font-mono">
          Click any technology to see its exact architectural role, project deployment, and performance metrics.
        </p>
      </div>

      {/* Interactive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Skill Selector Pills */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            SELECT A TECHNOLOGY TO INSPECT:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {techUsageData.map((item) => {
              const isSelected = selectedTech.name === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedTech(item)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-950/90 border-indigo-500 shadow-lg shadow-indigo-500/20 text-indigo-200 font-bold scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
                    <span className="text-xs font-mono">{item.name}</span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-300">
                    {item.usedInProjects.length} {item.usedInProjects.length === 1 ? 'project' : 'projects'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Project Usage Inspection Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTech.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-800/60 space-y-6 relative overflow-hidden"
            >
              {/* Card Ambient Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Inspector Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800/80">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                      TECHNOLOGY DEPLOYMENT INSPECTOR
                    </span>
                    <h3 className="text-2xl font-extrabold text-slate-100 font-mono">
                      {selectedTech.name}
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800">
                  {selectedTech.usedInProjects.length} Deployment Site(s)
                </span>
              </div>

              {/* Projects List using this technology */}
              <div className="space-y-4">
                {selectedTech.usedInProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={`#${proj.id}`}
                        className="text-base font-bold text-slate-100 hover:text-indigo-300 transition-colors flex items-center gap-1.5 group"
                      >
                        {proj.title}
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-800/60 font-bold">
                        {proj.metric}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{proj.role}</span>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
