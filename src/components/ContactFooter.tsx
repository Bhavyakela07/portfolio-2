'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Mail, Github, Copy, Check, FileDown, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-transparent">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Contact Banner Card */}
        <div className="p-8 sm:p-12 rounded-3xl liquid-glass text-center relative overflow-hidden mb-16 group">
          {/* Top Specular Rim */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3.5 py-1 rounded-full border border-cyan-800/60 relative z-10">
            GET IN TOUCH
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 tracking-tight relative z-10">
            Let&apos;s Build Something Extraordinary
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto relative z-10">
            Available for Full-Stack, Generative AI, RAG, and Computer Vision roles. Open to freelance, full-time, and research opportunities.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
            
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Email Copied!' : 'Copy Email Address'}
            </button>

            {/* Direct Email Link */}
            <a
              href={`mailto:${resumeData.email}`}
              className="liquid-chip flex items-center gap-2 px-6 py-3 rounded-xl text-slate-200 font-semibold text-sm shadow-md transition-all hover:scale-105 hover:border-cyan-400/50"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              Send Email Directly
            </a>

            {/* GitHub Link */}
            <a
              href={resumeData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-chip flex items-center gap-2 px-6 py-3 rounded-xl text-slate-200 font-semibold text-sm shadow-md transition-all hover:scale-105 hover:border-cyan-400/50"
            >
              <Github className="w-4 h-4 text-slate-300" />
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Direct Details Strip */}
          <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400 relative z-10">
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              {resumeData.email}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              github.com/Bhavyakela07
            </span>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {resumeData.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            Built with Next.js, React 19, TypeScript & Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
