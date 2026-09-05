'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Workflow, CheckCircle2, ArrowUpRight, Sparkles, Orbit, Cpu, Database, BrainCircuit, Activity } from 'lucide-react';

interface DetailedTechNode {
  id: string;
  name: string;
  category: 'GenAI & RAG' | 'Computer Vision' | 'ML & Probability' | 'Backend APIs' | 'Frontend UI' | 'Databases';
  badgeColor: string;
  specifications: {
    architecture: string;
    metrics: string;
    role: string;
  };
  deployedInProject: {
    title: string;
    details: string;
    repoUrl?: string;
  };
}

const detailedTechNodes: DetailedTechNode[] = [
  {
    id: 'groq-llama3',
    name: 'Groq (Llama 3 70B)',
    category: 'GenAI & RAG',
    badgeColor: 'text-cyan-400 border-cyan-800/60 bg-cyan-950/80',
    specifications: {
      architecture: 'LPU (Language Processing Unit) Custom Silicon Hardware',
      metrics: '18x Faster Generation Speed vs standard GPU instances',
      role: 'Final Verification Stage in Multi-Stage NLP Resume Matcher'
    },
    deployedInProject: {
      title: 'Skill-Gap-Analyzer',
      details: 'Evaluated LLM inference providers and selected Groq LPU hardware to eliminate borderline resume-to-job false positives.',
      repoUrl: 'https://github.com/Bhavyakela07/Skill-Gap-Analyzer'
    }
  },
  {
    id: 'qdrant-vector',
    name: 'Qdrant Vector DB',
    category: 'GenAI & RAG',
    badgeColor: 'text-indigo-400 border-indigo-800/60 bg-indigo-950/80',
    specifications: {
      architecture: 'HNSW Indexing with Cosine Similarity Vector Search',
      metrics: '~90% Reduction in False Positive Skill Matches',
      role: 'Dense Vector Retrieval Engine for Semantic Resume Embeddings'
    },
    deployedInProject: {
      title: 'Skill-Gap-Analyzer',
      details: 'Indexed candidate resume vectors and job descriptions into Qdrant for real-time similarity gap analysis.',
      repoUrl: 'https://github.com/Bhavyakela07/Skill-Gap-Analyzer'
    }
  },
  {
    id: 'yolov8-cv',
    name: 'YOLOv8 & OpenCV',
    category: 'Computer Vision',
    badgeColor: 'text-amber-400 border-amber-800/60 bg-amber-950/80',
    specifications: {
      architecture: 'Custom Fine-Tuned PyTorch YOLOv8 Object Detection Weights',
      metrics: 'Sub-Second Real-Time Inference Latency (< 1s)',
      role: 'Road Infrastructure Pothole Detection & Bounding Box Overlays'
    },
    deployedInProject: {
      title: 'KAVAACH',
      details: 'Trained and deployed fine-tuned YOLOv8 model served via FastAPI with geo-tagged PostgreSQL detection overlays.',
      repoUrl: 'https://github.com/Bhavyakela07/KAVAACH'
    }
  },
  {
    id: 'xgboost-ml',
    name: 'XGBoost Probability Engine',
    category: 'ML & Probability',
    badgeColor: 'text-emerald-400 border-emerald-800/60 bg-emerald-950/80',
    specifications: {
      architecture: 'CalibratedClassifierCV with Isotonic Calibration (80/20 Holdout)',
      metrics: 'Brier Score Loss Minimization on Synthetic Transaction Holdout',
      role: 'AI Recovery Probability Inference (p_recovery)'
    },
    deployedInProject: {
      title: 'RecoverOS',
      details: 'Built AI recovery engine governed by a deterministic Policy Rules Engine (IST quiet hours & ₹50k caps) for Razorpay Buildathon 2026.',
      repoUrl: 'https://github.com/Bhavyakela07/RecoverOS'
    }
  },
  {
    id: 'gemini-api',
    name: 'Google Gemini API',
    category: 'GenAI & RAG',
    badgeColor: 'text-purple-400 border-purple-800/60 bg-purple-950/80',
    specifications: {
      architecture: 'System Prompt Engineering & Multi-Modal Vision Chaining',
      metrics: '100% Parseable Structured JSON Output',
      role: 'Fact-Checking Claim Classification & Virtual Try-On Compositing'
    },
    deployedInProject: {
      title: 'PerspectAI & AI Virtual Photographer',
      details: 'Structured 100% of LLM outputs into parseable JSON for fact-checking verdicts and chained dual Gemini Vision API calls.',
      repoUrl: 'https://github.com/Bhavyakela07/PerspectAI'
    }
  },
  {
    id: 'fastapi-backend',
    name: 'FastAPI REST Architecture',
    category: 'Backend APIs',
    badgeColor: 'text-blue-400 border-blue-800/60 bg-blue-950/80',
    specifications: {
      architecture: 'Asynchronous Python ASGI REST API Service',
      metrics: 'Sub-second API Endpoint Response Times',
      role: 'Model Serving, Prompt Parsing, & Policy Guardrail Routing'
    },
    deployedInProject: {
      title: 'RecoverOS, Skill-Gap-Analyzer, KAVAACH, PerspectAI',
      details: 'Exposed clean REST API endpoints serving ML model inference and LLM prompt pipelines to React frontend.',
      repoUrl: 'https://github.com/Bhavyakela07'
    }
  },
  {
    id: 'react-ts',
    name: 'React 19 & TypeScript',
    category: 'Frontend UI',
    badgeColor: 'text-cyan-400 border-cyan-800/60 bg-cyan-950/80',
    specifications: {
      architecture: 'Typed Component Library, Glassmorphism CSS, & Framer Motion',
      metrics: 'Zero Runtime Type Errors & Reusable UI Systems',
      role: 'Interactive Dashboards, Real-Time Overlays, & Micro-Simulators'
    },
    deployedInProject: {
      title: 'Skill-Gap-Analyzer & RecoverOS',
      details: 'Shipped a reusable component library powering interactive roadmap generators and 1-click audit certificates.',
      repoUrl: 'https://github.com/Bhavyakela07'
    }
  },
  {
    id: 'postgres-db',
    name: 'PostgreSQL Relational DB',
    category: 'Databases',
    badgeColor: 'text-emerald-400 border-emerald-800/60 bg-emerald-950/80',
    specifications: {
      architecture: 'Relational Schema Design with Geo-Spatial Lat/Long Indexing',
      metrics: 'Idempotency Audit Ledger & High-Speed Spatial Queries',
      role: 'Transaction History Logging & Geo-Tagged Infrastructure Overlays'
    },
    deployedInProject: {
      title: 'RecoverOS & KAVAACH',
      details: 'Structured relational schemas storing payment failure logs and geo-tagged pothole detection coordinates.',
      repoUrl: 'https://github.com/Bhavyakela07/KAVAACH'
    }
  }
];

export const TechTornado: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<DetailedTechNode>(detailedTechNodes[0]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Tornado Group
    const tornadoGroup = new THREE.Group();
    scene.add(tornadoGroup);

    const count = 350;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#06b6d4');
    const indigo = new THREE.Color('#6366f1');
    const purple = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      const radius = (i / count) * 65 + 10;
      const angle = i * 0.35;
      const y = (i / count) * 130 - 65;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = i % 3 === 0 ? cyan : i % 3 === 1 ? indigo : purple;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    tornadoGroup.add(particles);

    // Interactive Orbit Controls
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

      tornadoGroup.rotation.y += deltaX * 0.008;
      tornadoGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        tornadoGroup.rotation.y += 0.005;
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
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#030509]">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60 flex items-center justify-center gap-1.5 w-fit mx-auto">
          <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          3D TECH STACK VORTEX & AI TELEMETRY
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          AI/ML Tech Stack Telemetry
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Drag to rotate the 3D Tornado. Select any technology below to inspect model architecture, loss functions, and project deployment specs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D WebGL Vortex Viewport & Technology Selector Pills */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* 3D WebGL Vortex Viewport */}
          <div className="relative w-full h-72 sm:h-80 rounded-3xl bg-slate-950/90 border border-indigo-900/60 overflow-hidden cursor-grab active:cursor-grabbing mb-4 flex items-center justify-center shadow-2xl">
            <div ref={mountRef} className="absolute inset-0" />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> 3D Orbit Drag Active
            </div>

            {/* Currently Selected Floating Badge Overlay inside Viewport */}
            <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-indigo-500/50 flex items-center justify-between text-xs font-mono text-slate-200">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                Active Node: <strong className="text-indigo-300">{selectedTech.name}</strong>
              </span>
              <span className="text-[10px] text-slate-400">{selectedTech.category}</span>
            </div>
          </div>

          {/* Technology Badges Selector */}
          <div className="flex flex-wrap justify-center gap-2">
            {detailedTechNodes.map((node) => {
              const isSelected = selectedTech.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedTech(node)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-lg shadow-indigo-600/40 scale-105 border border-cyan-400'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-indigo-500/40 hover:text-white'
                  }`}
                >
                  {node.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Deep AI/ML Telemetry & Architecture Inspector */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTech.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-indigo-500/60 space-y-6 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Inspector Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> AI/ML TELEMETRY & SPECIFICATIONS
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-100 font-mono mt-0.5">
                    {selectedTech.name}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${selectedTech.badgeColor}`}>
                  {selectedTech.category}
                </span>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">MODEL / ENGINE ARCHITECTURE</div>
                  <div className="text-xs font-bold text-slate-200 mt-1 font-mono">{selectedTech.specifications.architecture}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">PERFORMANCE METRIC</div>
                  <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">{selectedTech.specifications.metrics}</div>
                </div>
              </div>

              {/* Architectural Role */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">PIPELINE ARCHITECTURE ROLE</div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedTech.specifications.role}</p>
              </div>

              {/* Deployment Site Card */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">DEPLOYMENT SITE</span>
                  {selectedTech.deployedInProject.repoUrl && (
                    <a
                      href={selectedTech.deployedInProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-indigo-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      Repository ↗
                    </a>
                  )}
                </div>
                <h4 className="text-base font-bold text-slate-100 font-mono">
                  {selectedTech.deployedInProject.title}
                </h4>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedTech.deployedInProject.details}
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
