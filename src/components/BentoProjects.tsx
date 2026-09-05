'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Project } from '../types/portfolio';
import { Github, Sparkles, CheckCircle2, Workflow, ArrowRight } from 'lucide-react';

interface BentoProjectsProps {
  onOpenDemo: (project: Project) => void;
}

const getArchitecturePipeline = (projectId: string) => {
  switch (projectId) {
    case 'recoverOS':
      return [
        'Razorpay Webhook',
        'XGBoost (p_recovery)',
        'Policy Engine (Quiet Hours & ₹50k Cap)',
        'Verdict & PDF Audit'
      ];
    case 'skill-gap-analyzer':
      return [
        'Resume & Job Spec',
        'SpaCy Exact Match',
        'Qdrant Vector Search',
        'Groq Llama 3 LPU Verification'
      ];
    case 'kavaach':
      return [
        'Road Video Stream',
        'YOLOv8 Object Detection',
        'PostgreSQL Geo-Overlays',
        'React Real-time Overlay'
      ];
    case 'perspectai':
      return [
        'Raw Claim Input',
        'Gemini API Prompt Chain',
        'FastAPI JSON Parsing',
        '100% Structured Verdict'
      ];
    case 'ai-virtual-photographer':
      return [
        'Garment Image',
        'Gemini Vision API (Garment)',
        'Gemini Vision API (Outfit)',
        'Streamlit Render'
      ];
    default:
      return ['Input Payload', 'AI Engine', 'FastAPI Backend', 'React UI Output'];
  }
};

export const BentoProjects: React.FC<BentoProjectsProps> = ({ onOpenDemo }) => {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--light-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--light-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--light-x', '50%');
    card.style.setProperty('--light-y', '50%');
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#030509]">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3.5 py-1 rounded-full border border-cyan-800/60">
          FEATURED ENGINEERING PROJECTS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Flagship Applications & Systems
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto font-mono">
          End-to-end applications designed with fail-closed policy governance, scalable APIs, and real-time telemetry.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {resumeData.projects.map((project, index) => {
          const isBigCard = project.id === 'recoverOS' || project.id === 'skill-gap-analyzer';
          const colSpan = isBigCard ? 'lg:col-span-6' : 'lg:col-span-4';
          const pipeline = getArchitecturePipeline(project.id);

          return (
            <motion.div
              key={project.id}
              id={project.id}
              ref={(el) => { cardRefs.current[project.id] = el; }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              style={{
                perspective: 1000,
                transition: 'transform 0.15s ease-out',
                ['--light-x' as string]: '50%',
                ['--light-y' as string]: '50%',
              }}
              className={`p-6 sm:p-8 rounded-3xl glass-card relative flex flex-col justify-between overflow-hidden group ${colSpan}`}
            >
              {/* Pointer Light Reflection Following Mouse Position */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at var(--light-x, 50%) var(--light-y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)`,
                }}
              />

              {/* Card Ambient Glow */}
              <div className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none`} />

              <div>
                {/* Top Badge & Demo Trigger */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 text-[11px] font-mono border border-slate-800">
                    {project.subtitle}
                  </span>

                  <button
                    onClick={() => onOpenDemo(project)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 text-xs font-semibold shadow-sm transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Test Live Demo
                  </button>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-extrabold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Architectural Data Flow Blueprint */}
                <div className="mt-5 p-3 rounded-xl bg-slate-950/90 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1 mb-2">
                    <Workflow className="w-3 h-3 text-cyan-400" /> SYSTEM DATA FLOW BLUEPRINT
                  </div>
                  <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono text-slate-300">
                    {pipeline.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {step}
                        </span>
                        {sIdx < pipeline.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-2">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Key Metrics Pills */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">{metric.label}</div>
                      <div className="text-xs font-bold text-slate-200 mt-0.5">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & GitHub Link */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-md bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    Repository ↗
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};
