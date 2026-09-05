'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
          ACADEMIC FOUNDATION
        </span>
        <h2 className="text-3xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Education & Background
        </h2>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={edu.institution}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 rounded-2xl glass-card glass-card-hover flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-indigo-950/90 text-indigo-400 border border-indigo-800/60 shrink-0 mt-1">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-bold text-slate-100 text-lg">{edu.degree}</h3>
                <h4 className="text-sm font-medium text-indigo-300 mt-0.5">{edu.institution}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-2xl">{edu.details}</p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {edu.period}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {edu.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
