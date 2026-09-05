'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Dna, Activity, BrainCircuit, CheckCircle2, Workflow } from 'lucide-react';

interface DnaTechNode {
  id: string;
  name: string;
  strand: 'ai' | 'fullstack';
  strandLabel: 'Strand A: AI/ML Core' | 'Strand B: Full-Stack Infrastructure';
  metrics: string;
  architecture: string;
  description: string;
  relatedIds: string[]; // Supported relationship connections
}

const dnaSkillNodes: DnaTechNode[] = [
  // Strand A: AI / ML & GenAI Core
  {
    id: 'groq',
    name: 'Groq (Llama 3 70B)',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: '18x LPU Generation Speedup',
    architecture: 'Language Processing Unit Custom Silicon Hardware',
    description: 'Ultra-low latency LLM inference executing structured prompt verification and gap analysis.',
    relatedIds: ['qdrant', 'fastapi', 'react']
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: '~90% False Positive Match Reduction',
    architecture: 'HNSW Cosine Similarity Vector Search Indexing',
    description: 'Dense vector database for real-time similarity search over candidate resume embeddings.',
    relatedIds: ['groq', 'spacy', 'fastapi']
  },
  {
    id: 'yolo',
    name: 'YOLOv8 & OpenCV',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: '< 1 Sec Real-time Pothole Inference',
    architecture: 'Custom Fine-Tuned PyTorch Object Detection Model',
    description: 'Computer vision pipeline detecting road damage with bounding box telemetry served over FastAPI.',
    relatedIds: ['fastapi', 'postgres', 'react']
  },
  {
    id: 'xgboost',
    name: 'XGBoost ML Engine',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: 'Isotonic Probability Calibration',
    architecture: 'CalibratedClassifierCV Engine (80/20 Holdout)',
    description: 'Machine learning probability model predicting payment recovery likelihood for Razorpay Buildathon.',
    relatedIds: ['python', 'fastapi', 'postgres']
  },
  {
    id: 'gemini',
    name: 'Google Gemini API',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: '100% Parseable Structured JSON Verdicts',
    architecture: 'System Prompt Engineering & Multi-Modal Vision Chaining',
    description: 'Generative AI pipeline for fact-checking claim classification and garment outfit compositing.',
    relatedIds: ['fastapi', 'react', 'postgres']
  },
  {
    id: 'spacy',
    name: 'SpaCy & NLP Pipelines',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: 'Multi-Stage NLP v2.2 Pipeline',
    architecture: 'Tokenized Entity Matcher & Rule-Based Skill Extraction',
    description: 'Natural language processing for exact skill token matching and gap analysis.',
    relatedIds: ['qdrant', 'groq', 'fastapi']
  },
  {
    id: 'sentence-transformer',
    name: 'Sentence-Transformers',
    strand: 'ai',
    strandLabel: 'Strand A: AI/ML Core',
    metrics: 'Dense Text Embeddings',
    architecture: 'Transformer Embeddings Model',
    description: 'Generating dense vector representations of text for semantic similarity indexing.',
    relatedIds: ['qdrant', 'fastapi']
  },

  // Strand B: Full-Stack Web Infrastructure
  {
    id: 'fastapi',
    name: 'FastAPI REST Architecture',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Sub-second Endpoint Response Time',
    architecture: 'Asynchronous Python ASGI Microservices',
    description: 'High-speed REST API framework serving ML model inference and policy guardrail routing.',
    relatedIds: ['groq', 'yolo', 'gemini', 'postgres', 'react']
  },
  {
    id: 'react',
    name: 'React 19 & TypeScript',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Typed Component System & 60 FPS UI',
    architecture: 'Typed Component Library, Glassmorphism CSS & Framer Motion',
    description: 'Modern frontend framework powering interactive roadmap generators and audit dashboards.',
    relatedIds: ['fastapi', 'tailwind', 'framer']
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Relational DB',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Idempotency Audit Ledger & Geo Indexing',
    architecture: 'Relational Schema Design & Spatial Lat/Long Indexing',
    description: 'Relational database storing payment failure history, idempotency logs, and geo-spatial overlays.',
    relatedIds: ['fastapi', 'xgboost', 'yolo']
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express.js',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Scalable Microservice Route Controllers',
    architecture: 'Event-Driven Async Web Services',
    description: 'Backend web API design with structured controller routing and async middleware.',
    relatedIds: ['react', 'postgres']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Dark Theme Glassmorphism Layouts',
    architecture: 'Utility-First Styling & Sub-pixel UI Responsiveness',
    description: 'Custom design tokens powering dark theme glassmorphism, ambient lighting, and clean typography.',
    relatedIds: ['react']
  },
  {
    id: 'aws',
    name: 'AWS (EC2, Lambda, ALB)',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Production Cloud Deployment',
    architecture: 'Virtual Machine Instances, Serverless Execution & Load Balancers',
    description: 'Cloud environment management including EC2 virtual servers, Lambda functions, and ALB load balancing.',
    relatedIds: ['docker', 'fastapi']
  },
  {
    id: 'docker',
    name: 'Docker Containerization',
    strand: 'fullstack',
    strandLabel: 'Strand B: Full-Stack Infrastructure',
    metrics: 'Consistent Microservice Container Deployments',
    architecture: 'Multi-Stage Dockerfile Container Builds',
    description: 'Containerizing Python FastAPI microservices and Node backends for reproducible deployments.',
    relatedIds: ['aws', 'fastapi']
  }
];

export const TechDNAHelix: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<DnaTechNode>(dnaSkillNodes[0]);
  const [hoveredTech, setHoveredTech] = useState<DnaTechNode | null>(null);

  const activeTech = hoveredTech || selectedTech;

  useEffect(() => {
    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mount = mountRef.current;
    if (!mount) return;

    // 3D Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 175);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // 3D DNA Double Helix Parameters
    const numPairs = 20;
    const helixRadius = 34;
    const helixHeight = 150;

    const cyan = new THREE.Color('#06b6d4');
    const purple = new THREE.Color('#a855f7');
    const indigo = new THREE.Color('#6366f1');

    const rungsGroup = new THREE.Group();
    dnaGroup.add(rungsGroup);

    const nodeMeshes: { id: string; mesh: THREE.Mesh }[] = [];

    for (let i = 0; i < numPairs; i++) {
      const t = i / numPairs;
      const y = t * helixHeight - helixHeight / 2;
      const angle = t * Math.PI * 4;

      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;

      const sphereA = new THREE.Mesh(
        new THREE.SphereGeometry(2.6, 16, 16),
        new THREE.MeshBasicMaterial({ color: cyan })
      );
      sphereA.position.set(x1, y, z1);
      dnaGroup.add(sphereA);

      const sphereB = new THREE.Mesh(
        new THREE.SphereGeometry(2.6, 16, 16),
        new THREE.MeshBasicMaterial({ color: purple })
      );
      sphereB.position.set(x2, y, z2);
      dnaGroup.add(sphereB);

      const rungLineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y, z1),
        new THREE.Vector3(x2, y, z2)
      ]);
      const rungLineMat = new THREE.LineBasicMaterial({
        color: indigo,
        transparent: true,
        opacity: 0.35
      });
      const rungLine = new THREE.Line(rungLineGeo, rungLineMat);
      rungsGroup.add(rungLine);

      if (i < dnaSkillNodes.length) {
        nodeMeshes.push({ id: dnaSkillNodes[i].id, mesh: sphereA });
      }
    }

    // Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      dnaGroup.rotation.y += deltaX * 0.008;
      dnaGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // IntersectionObserver to pause rendering when section is outside viewport (Phase 2)
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible || prefersReducedMotion) return;

      if (!isDragging) {
        dnaGroup.rotation.y += 0.003; // Slow, spacious, organic cinematic motion
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#030509]">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60 flex items-center justify-center gap-1.5 w-fit mx-auto">
          <Dna className="w-4 h-4 text-cyan-400 animate-pulse" />
          UNIFIED 3D CYBER-DNA HELIX
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          The AI/ML & Full-Stack Cyber-DNA
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Strand A (Cyan: AI/ML Core) & Strand B (Purple: Full-Stack Infrastructure) bound in an intelligent technology network. Select any node to inspect relationship specs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Cyber-DNA Viewport */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* 3D WebGL Canvas */}
          <div className="relative w-full h-80 sm:h-[400px] rounded-3xl bg-slate-950/90 border border-indigo-900/60 overflow-hidden cursor-grab active:cursor-grabbing mb-4 flex items-center justify-center shadow-2xl">
            <div ref={mountRef} className="absolute inset-0" />
            
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5 z-10">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> 3D Drag to Rotate Cyber-DNA
            </div>

            {/* Currently Selected Node Banner */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-indigo-500/50 flex items-center justify-between text-xs font-mono text-slate-200 z-10">
              <span className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${activeTech.strand === 'ai' ? 'bg-cyan-400' : 'bg-purple-400'} animate-ping`} />
                Active Node: <strong className="text-indigo-300">{activeTech.name}</strong>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">{activeTech.strandLabel}</span>
            </div>
          </div>

          {/* Skill Selector Badges */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {dnaSkillNodes.map((node) => {
              const isSelected = activeTech.id === node.id;
              const isRelated = activeTech.relatedIds.includes(node.id);
              const isAiStrand = node.strand === 'ai';

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedTech(node)}
                  onMouseEnter={() => setHoveredTech(node)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isSelected
                      ? isAiStrand
                        ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/40 scale-105 border border-cyan-300'
                        : 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/40 scale-105 border border-purple-300'
                      : isRelated
                      ? 'bg-indigo-950 border border-indigo-500/60 text-indigo-200 font-semibold'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {node.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Existing Telemetry Panel */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/60 space-y-6 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> CYBER-DNA SKILL TELEMETRY
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-100 font-mono mt-0.5">
                    {activeTech.name}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                  activeTech.strand === 'ai'
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                    : 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                }`}>
                  {activeTech.strandLabel}
                </span>
              </div>

              {/* Performance Impact Metric */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">PERFORMANCE & IMPACT METRIC</div>
                <p className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {activeTech.metrics}
                </p>
              </div>

              {/* Architecture Spec */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">ARCHITECTURE / SPECIFICATION</div>
                <p className="text-xs text-slate-200 font-mono font-semibold">{activeTech.architecture}</p>
              </div>

              {/* Connected Relationships Pill */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1">
                  <Workflow className="w-3.5 h-3.5 text-indigo-400" /> CONNECTED PIPELINE RELATIONSHIPS
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeTech.relatedIds.map(relId => {
                    const relNode = dnaSkillNodes.find(n => n.id === relId);
                    if (!relNode) return null;
                    return (
                      <span key={relId} className="px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-xs font-mono border border-indigo-800/60">
                        → {relNode.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">DESCRIPTION</div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">{activeTech.description}</p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
