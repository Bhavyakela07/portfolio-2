'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { BentoProjects } from '../components/BentoProjects';
import { UnifiedTechUniverse } from '../components/UnifiedTechUniverse';
import { TechCenterFlow } from '../components/TechCenterFlow';
import { EducationSection } from '../components/Education';
import { ContactFooter } from '../components/ContactFooter';
import { CmdKModal } from '../components/CmdKModal';
import { ProjectDemos } from '../components/ProjectDemos';
import { SystemIntroSequence } from '../components/SystemIntroSequence';
import { ThreeCanvas } from '../components/ThreeCanvas';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleOpenCmdK = () => setIsCmdKOpen(true);
    window.addEventListener('openCmdK', handleOpenCmdK);
    return () => window.removeEventListener('openCmdK', handleOpenCmdK);
  }, []);

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] relative selection:bg-emerald-500 selection:text-slate-950 overflow-x-clip">
      
      {/* 4-Phase System Story Intro (human -> intelligence -> technology -> engineer) */}
      <AnimatePresence>
        {showIntro && (
          <SystemIntroSequence onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* 3D WebGL Particle Nebula Background Canvas */}
      <ThreeCanvas />

      {/* 1. Hero Section (HI, I'M BHAVYA - Perfectly Framed) */}
      <Hero
        openCmdK={() => setIsCmdKOpen(true)}
      />

      {/* 2. About Section (3D Corner Icons & Character Scroll Reveal Text) */}
      <AboutSection />

      {/* 3. All 5 Flagship Projects Showcase (Bento Projects Grid) */}
      <BentoProjects
        onOpenDemo={(project) => setActiveDemoProject(project)}
      />

      {/* 4. Single Consolidated WebGL 3D Tech Spatial Universe (22 Tech Nodes) */}
      <UnifiedTechUniverse />

      {/* Radial System Architecture Flow Diagram (AI Engine Core & 16 Connected Nodes) */}
      <TechCenterFlow />

      {/* 5. Education Background */}
      <EducationSection />

      {/* 6. Contact & Footer */}
      <ContactFooter />

      {/* Cmd+K AI Resume Assistant & Search Console */}
      <CmdKModal
        isOpen={isCmdKOpen}
        onClose={() => setIsCmdKOpen(false)}
      />

      {/* Interactive Micro-Demo Test Bench */}
      <ProjectDemos
        project={activeDemoProject}
        onClose={() => setActiveDemoProject(null)}
      />
    </main>
  );
}
