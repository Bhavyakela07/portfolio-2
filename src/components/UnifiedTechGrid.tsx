'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Server, Layout, Database, Code2, Wrench, ArrowUpRight, Sparkles, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'ai' | 'backend' | 'frontend' | 'database' | 'languages' | 'tools';
  categoryLabel: string;
  highlight?: boolean;
  deployment?: {
    projectTitle: string;
    projectId: string;
    metric: string;
    role: string;
  };
}

const completeTechStack: TechItem[] = [
  // AI & ML Stack
  {
    name: 'RAG Architecture',
    category: 'ai',
    categoryLabel: 'AI / GenAI',
    highlight: true,
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: '~90% False Positive Reduction',
      role: 'Hybrid vector search & LLM verification pipeline'
    }
  },
  {
    name: 'Groq (Llama 3)',
    category: 'ai',
    categoryLabel: 'AI / GenAI',
    highlight: true,
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: '18x LPU Inference Speedup',
      role: 'Fast LLM verification on custom LPU hardware'
    }
  },
  {
    name: 'Google Gemini API',
    category: 'ai',
    categoryLabel: 'AI / GenAI',
    highlight: true,
    deployment: {
      projectTitle: 'PerspectAI & Virtual Photographer',
      projectId: 'perspectai',
      metric: '100% Structured JSON Verdicts',
      role: 'Prompt engineering & multi-modal vision chaining'
    }
  },
  {
    name: 'YOLOv8 & OpenCV',
    category: 'ai',
    categoryLabel: 'Computer Vision',
    highlight: true,
    deployment: {
      projectTitle: 'KAVAACH',
      projectId: 'kavaach',
      metric: '< 1 Sec Pothole Detection',
      role: 'Fine-tuned vision model for real-time surveillance'
    }
  },
  {
    name: 'Qdrant Vector DB',
    category: 'ai',
    categoryLabel: 'AI / GenAI',
    highlight: true,
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: 'HNSW Cosine Vector Search',
      role: 'Dense vector retrieval index for resume embeddings'
    }
  },
  {
    name: 'SpaCy & NLP Pipelines',
    category: 'ai',
    categoryLabel: 'NLP',
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: 'v2.2 Multi-Stage Pipeline',
      role: 'Exact match & tokenized skill extraction'
    }
  },
  {
    name: 'Sentence-Transformers',
    category: 'ai',
    categoryLabel: 'NLP',
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: 'Dense Text Embeddings',
      role: 'Semantic embedding generation for resumes'
    }
  },
  {
    name: 'XGBoost & ML Calibration',
    category: 'ai',
    categoryLabel: 'ML & Probability',
    highlight: true,
    deployment: {
      projectTitle: 'RecoverOS',
      projectId: 'recoverOS',
      metric: 'Isotonic Calibration',
      role: 'CalibratedClassifierCV probability engine'
    }
  },
  {
    name: 'Prompt Engineering',
    category: 'ai',
    categoryLabel: 'AI / GenAI',
    deployment: {
      projectTitle: 'PerspectAI',
      projectId: 'perspectai',
      metric: 'Structured Schema Prompting',
      role: 'Strict JSON schema formatting for Gemini API'
    }
  },

  // Backend Stack
  {
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'Backend APIs',
    highlight: true,
    deployment: {
      projectTitle: 'RecoverOS, KAVAACH, PerspectAI',
      projectId: 'recoverOS',
      metric: 'Sub-second ASGI Endpoints',
      role: 'Asynchronous REST microservices serving ML inference'
    }
  },
  {
    name: 'Node.js & Express.js',
    category: 'backend',
    categoryLabel: 'Backend APIs',
    highlight: true,
    deployment: {
      projectTitle: 'Full-Stack Systems',
      projectId: 'skill-gap-analyzer',
      metric: 'Scalable REST APIs',
      role: 'Scalable backend API design & route controllers'
    }
  },
  {
    name: 'REST API Architecture',
    category: 'backend',
    categoryLabel: 'Backend APIs',
    highlight: true,
    deployment: {
      projectTitle: 'All 5 Projects',
      projectId: 'recoverOS',
      metric: 'Clean API Contracts',
      role: 'End-to-end endpoint architecture & Postman docs'
    }
  },
  {
    name: 'Webhooks & Automation',
    category: 'backend',
    categoryLabel: 'Backend APIs',
    deployment: {
      projectTitle: 'RecoverOS',
      projectId: 'recoverOS',
      metric: 'Razorpay Webhook Handlers',
      role: 'Real-time payment failure event processing'
    }
  },

  // Frontend Stack
  {
    name: 'React 19 / 18',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    highlight: true,
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer & RecoverOS',
      projectId: 'skill-gap-analyzer',
      metric: 'Glassmorphic UI Systems',
      role: 'Reusable component library powering roadmap generators'
    }
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    highlight: true,
    deployment: {
      projectTitle: 'All Frontend Apps',
      projectId: 'skill-gap-analyzer',
      metric: 'Strict Type Safety',
      role: 'End-to-end typed props, interfaces & API contracts'
    }
  },
  {
    name: 'Tailwind CSS v4 / v3',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    highlight: true,
    deployment: {
      projectTitle: 'All User Interfaces',
      projectId: 'skill-gap-analyzer',
      metric: 'Custom Utility Styling',
      role: 'Responsive layouts, glassmorphism & dark themes'
    }
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    highlight: true,
    deployment: {
      projectTitle: 'Portfolio & Component Lib',
      projectId: 'skill-gap-analyzer',
      metric: 'Smooth Spring Physics',
      role: 'Micro-interactions, page transitions & animations'
    }
  },
  {
    name: 'Recharts',
    category: 'frontend',
    categoryLabel: 'Frontend UI',
    deployment: {
      projectTitle: 'Skill-Gap-Analyzer',
      projectId: 'skill-gap-analyzer',
      metric: 'Interactive Data Visuals',
      role: 'Radar charts & skill match analytics'
    }
  },

  // Databases Stack
  {
    name: 'PostgreSQL',
    category: 'database',
    categoryLabel: 'Databases',
    highlight: true,
    deployment: {
      projectTitle: 'RecoverOS & KAVAACH',
      projectId: 'recoverOS',
      metric: 'Audit Ledgers & Geo-Indexing',
      role: 'Relational schema design with lat/long spatial queries'
    }
  },
  {
    name: 'SQL',
    category: 'database',
    categoryLabel: 'Databases',
    deployment: {
      projectTitle: 'Relational Backends',
      projectId: 'recoverOS',
      metric: 'Complex Relational Queries',
      role: 'Transaction queries, joins & index optimization'
    }
  },
  {
    name: 'MongoDB',
    category: 'database',
    categoryLabel: 'Databases',
    deployment: {
      projectTitle: 'NoSQL Storage',
      projectId: 'skill-gap-analyzer',
      metric: 'Document Collections',
      role: 'Flexible JSON document storage & schema flexibility'
    }
  },

  // Programming Languages
  {
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Languages',
    highlight: true,
    deployment: {
      projectTitle: 'All AI/ML Pipelines',
      projectId: 'skill-gap-analyzer',
      metric: 'Core AI & FastAPI Language',
      role: 'PyTorch, XGBoost, SpaCy, FastAPI & OpenCV scripts'
    }
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'languages',
    categoryLabel: 'Languages',
    deployment: {
      projectTitle: 'Full-Stack Web',
      projectId: 'skill-gap-analyzer',
      metric: 'Web Core',
      role: 'Asynchronous promises, DOM API & Node scripts'
    }
  },
  {
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Languages',
    deployment: {
      projectTitle: 'Academic Coursework',
      projectId: 'education',
      metric: 'Object-Oriented Programming',
      role: 'Data structures, algorithms & OOP design'
    }
  },
  {
    name: 'C++',
    category: 'languages',
    categoryLabel: 'Languages',
    deployment: {
      projectTitle: 'Academic Coursework',
      projectId: 'education',
      metric: 'System Programming',
      role: 'Memory management & low-level data structures'
    }
  },

  // Tools & Cloud
  {
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'Tools & DevOps',
    highlight: true,
    deployment: {
      projectTitle: 'All Repositories',
      projectId: 'recoverOS',
      metric: 'Version Control',
      role: 'Branching workflows, commits & open source hosting'
    }
  },
  {
    name: 'Docker',
    category: 'tools',
    categoryLabel: 'Tools & DevOps',
    deployment: {
      projectTitle: 'Microservice Deployment',
      projectId: 'recoverOS',
      metric: 'Containerization',
      role: 'Containerized environments for Python & Node services'
    }
  },
  {
    name: 'AWS (EC2, Lambda, ALB)',
    category: 'tools',
    categoryLabel: 'Cloud Infrastructure',
    highlight: true,
    deployment: {
      projectTitle: 'Cloud Infrastructure',
      projectId: 'recoverOS',
      metric: 'Scalable Cloud Hosting',
      role: 'Virtual machines, serverless execution & load balancing'
    }
  },
  {
    name: 'Streamlit',
    category: 'tools',
    categoryLabel: 'AI Prototyping',
    deployment: {
      projectTitle: 'AI Virtual Photographer',
      projectId: 'virtualPhotographer',
      metric: '< 1 Day Demo Setup',
      role: 'Rapid AI pipeline web interface testbed'
    }
  }
];

export const UnifiedTechGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const filteredTech = activeTab === 'all'
    ? completeTechStack
    : completeTechStack.filter(t => t.category === activeTab);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#030509]">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60 flex items-center justify-center gap-1.5 w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          TECHNICAL COMPETENCIES & PROJECT DEPLOYMENT MAP
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Complete AI/ML & Full-Stack Ecosystem
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Explore every language, framework, vector engine, and model deployed across my projects. Click any skill card to view its exact usage telemetry.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'All Stack (28)' },
          { id: 'ai', label: 'AI, GenAI & CV' },
          { id: 'backend', label: 'Backend & APIs' },
          { id: 'frontend', label: 'Frontend UI' },
          { id: 'database', label: 'Databases' },
          { id: 'languages', label: 'Languages' },
          { id: 'tools', label: 'Tools & AWS' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Tech Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTech.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.03 }}
            onClick={() => setSelectedTech(tech)}
            className={`p-5 rounded-2xl glass-card glass-card-hover cursor-pointer border flex flex-col justify-between group relative overflow-hidden ${
              tech.highlight
                ? 'border-indigo-500/40 bg-slate-900/70'
                : 'border-slate-800/80 bg-slate-950/60'
            }`}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
                  {tech.categoryLabel}
                </span>
                {tech.deployment && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    Deployed
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-slate-100 group-hover:text-indigo-300 transition-colors font-mono">
                {tech.name}
              </h3>

              {/* Deployment info preview */}
              {tech.deployment && (
                <div className="mt-3 pt-3 border-t border-slate-800/60 space-y-1.5">
                  <div className="text-[11px] font-mono text-cyan-300 font-bold flex items-center justify-between">
                    <span>Used in: {tech.deployment.projectTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 line-clamp-1">
                    {tech.deployment.role}
                  </div>
                </div>
              )}
            </div>

            {/* Metric pill */}
            {tech.deployment && (
              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                <span>Metric:</span>
                <span>{tech.deployment.metric}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tech Detail Modal Drawer */}
      <AnimatePresence>
        {selectedTech && selectedTech.deployment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTech(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-indigo-500/60 shadow-2xl space-y-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    {selectedTech.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-100 font-mono">
                    {selectedTech.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700"
                >
                  Close
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 space-y-2">
                <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase">DEPLOYMENT LOCATION</span>
                <h4 className="text-base font-bold text-slate-100 font-mono">
                  {selectedTech.deployment.projectTitle}
                </h4>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedTech.deployment.role}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Impact Metric: {selectedTech.deployment.metric}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
