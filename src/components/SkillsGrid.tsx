'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { BrainCircuit, Server, Layout, Database, Code2, Wrench, Sparkles } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ai': return <BrainCircuit className="w-5 h-5 text-cyan-400" />;
    case 'backend': return <Server className="w-5 h-5 text-indigo-400" />;
    case 'frontend': return <Layout className="w-5 h-5 text-purple-400" />;
    case 'database': return <Database className="w-5 h-5 text-emerald-400" />;
    case 'languages': return <Code2 className="w-5 h-5 text-amber-400" />;
    case 'tools': return <Wrench className="w-5 h-5 text-rose-400" />;
    default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
  }
};

export const SkillsGrid: React.FC = () => {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800/60">
          TECHNICAL STACK & COMPETENCIES
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Tools & Frameworks I Master
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Combining AI/ML pipelines (RAG, YOLOv8, Qdrant) with full-stack web platforms (React, TypeScript, FastAPI, PostgreSQL).
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeData.skills.map((categoryGroup, index) => (
          <motion.div
            key={categoryGroup.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {getCategoryIcon(categoryGroup.category)}
                </div>
                <h3 className="font-bold text-slate-100 text-lg">{categoryGroup.title}</h3>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {categoryGroup.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                      skill.highlight
                        ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-700/60 font-semibold shadow-sm'
                        : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
