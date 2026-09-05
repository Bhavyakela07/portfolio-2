'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { Mail, Phone, Github, Copy, Check, FileDown, ArrowUpRight, Heart, Sparkles } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/80">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Contact Banner Card */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-slate-800 text-center relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60">
            GET IN TOUCH
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 tracking-tight">
            Let&apos;s Build Something Extraordinary
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto">
            Available for Full-Stack, Generative AI, RAG, and Computer Vision roles. Open to freelance, full-time, and research opportunities.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Email Copied!' : 'Copy Email Address'}
            </button>

            {/* Direct Email Link */}
            <a
              href={`mailto:${resumeData.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm shadow-md transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              Send Email Directly
            </a>

            {/* GitHub Link */}
            <a
              href={resumeData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm shadow-md transition-all"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Direct Details Strip */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {resumeData.phone}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              {resumeData.email}
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
