'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Orbit, Activity, BrainCircuit, Sparkles, Cpu, Layers, Zap, CheckCircle2 } from 'lucide-react';

interface TechItemSpec {
  id: string;
  name: string;
  category: 'AI / GenAI & ML' | 'Computer Vision' | 'Backend Systems' | 'Frontend Engineering' | 'Databases & Tools';
  ringIndex: number; // 0, 1, 2
  architecture: string;
  metrics: string;
  description: string;
}

const techSkillsData: TechItemSpec[] = [
  {
    id: 'groq',
    name: 'Groq (Llama 3 70B)',
    category: 'AI / GenAI & ML',
    ringIndex: 0,
    architecture: 'LPU (Language Processing Unit) Custom Silicon Hardware',
    metrics: '18x Generation Speedup over standard GPU instances',
    description: 'Ultra-low latency LLM inference engine executing complex prompt verification and structured JSON schema outputs.'
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    category: 'AI / GenAI & ML',
    ringIndex: 0,
    architecture: 'HNSW Indexing with Cosine Similarity Vector Search',
    metrics: '~90% Reduction in False-Positive Semantic Matches',
    description: 'High-speed vector database for indexing and querying dense text embeddings for real-time RAG gap analysis.'
  },
  {
    id: 'yolo',
    name: 'YOLOv8 & OpenCV',
    category: 'Computer Vision',
    ringIndex: 0,
    architecture: 'Custom Fine-Tuned PyTorch YOLOv8 Object Detection Weights',
    metrics: 'Sub-Second Real-Time Inference Latency (< 1s)',
    description: 'Computer vision pipeline for real-time road infrastructure pothole detection and bounding box coordinate calculation.'
  },
  {
    id: 'xgboost',
    name: 'XGBoost ML Engine',
    category: 'AI / GenAI & ML',
    ringIndex: 0,
    architecture: 'CalibratedClassifierCV with Isotonic Calibration (80/20 Holdout)',
    metrics: 'Brier Score Loss Minimization on Synthetic Holdout',
    description: 'Machine learning probability model predicting payment recovery likelihood with calibrated confidence scores.'
  },
  {
    id: 'gemini',
    name: 'Google Gemini API',
    category: 'AI / GenAI & ML',
    ringIndex: 0,
    architecture: 'System Prompt Engineering & Multi-Modal Vision Chaining',
    metrics: '100% Parseable Structured JSON Outputs',
    description: 'Generative AI pipeline for automated claim fact-checking verdicts and multi-modal garment outfit compositing.'
  },
  {
    id: 'spacy',
    name: 'SpaCy & NLP Pipelines',
    category: 'AI / GenAI & ML',
    ringIndex: 0,
    architecture: 'Rule-Based Entity Extraction & Tokenized NLP v2.2',
    metrics: 'Multi-Stage Gap Analysis Flow',
    description: 'Natural language processing pipeline for tokenizing resumes, exact skill matching, and gap analysis.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI REST Architecture',
    category: 'Backend Systems',
    ringIndex: 1,
    architecture: 'Asynchronous Python ASGI REST Microservices',
    metrics: 'Sub-second Endpoint Response Latency',
    description: 'High-performance API framework serving machine learning inference, prompt parsing, and deterministic policy guardrails.'
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express.js',
    category: 'Backend Systems',
    ringIndex: 1,
    architecture: 'Scalable Event-Driven REST API Services',
    metrics: 'Production Route Controllers & Middleware',
    description: 'Backend web API design with structured route handling, async middleware, and database integrations.'
  },
  {
    id: 'react',
    name: 'React 19 & TypeScript',
    category: 'Frontend Engineering',
    ringIndex: 2,
    architecture: 'Typed Glassmorphic Component System & Framer Motion',
    metrics: 'Zero Runtime Type Errors & 60 FPS Micro-Interactions',
    description: 'Modern frontend architecture with reusable component libraries, interactive roadmap generators, and live UI dashboards.'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend Engineering',
    ringIndex: 2,
    architecture: 'Custom Utility Styling & Dark Mode Glassmorphism Tokens',
    metrics: 'Responsive Cross-Browser Sub-pixel Layouts',
    description: 'Utility-first CSS styling powering dark theme glassmorphic card depth, glowing ambient borders, and clean typography.'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL Relational DB',
    category: 'Databases & Tools',
    ringIndex: 1,
    architecture: 'Relational Schema Design & Spatial Lat/Long Indexing',
    metrics: 'Idempotency Audit Ledger & Spatial Queries',
    description: 'Relational database architecture for storing transactional payment logs, spatial geo-tagged overlays, and audit trails.'
  },
  {
    id: 'aws',
    name: 'AWS (EC2, Lambda, ALB)',
    category: 'Databases & Tools',
    ringIndex: 2,
    architecture: 'Scalable Cloud Hosting & Serverless Execution',
    metrics: 'Production Cloud Infrastructure',
    description: 'Cloud environment management including EC2 virtual machines, Lambda serverless execution, and Application Load Balancers.'
  },
  {
    id: 'docker',
    name: 'Docker Containerization',
    category: 'Databases & Tools',
    ringIndex: 2,
    architecture: 'Isolated Container Environments & Multi-Stage Builds',
    metrics: 'Consistent Microservice Deployment',
    description: 'Containerizing Python FastAPI microservices and Node backends for reproducible deployments across environments.'
  }
];

export const TechOrbitalMatrix: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<TechItemSpec>(techSkillsData[0]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 3D Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 40, 165);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // 1. Central Glowing AI Core Sphere
    const coreGeo = new THREE.IcosahedronGeometry(11, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#6366f1'),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const aiCore = new THREE.Mesh(coreGeo, coreMat);
    orbitalGroup.add(aiCore);

    const innerGeo = new THREE.SphereGeometry(6, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#06b6d4'),
      transparent: true,
      opacity: 0.95,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    orbitalGroup.add(innerCore);

    // 2. Three Clean Concentric 3D Orbital Rings
    const ringRadii = [42, 70, 95];
    const ringColors = ['#06b6d4', '#6366f1', '#a855f7'];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.5, radius + 0.5, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ringColors[idx]),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (idx * 0.15);
      orbitalGroup.add(ringMesh);
    });

    // 3. Orbiting 3D Nodes (Clean Glowing Spheres without text clutter inside 3D viewport)
    const nodeMeshes: { id: string; mesh: THREE.Mesh; radius: number; speed: number; angle: number }[] = [];

    techSkillsData.forEach((node, i) => {
      const radius = ringRadii[node.ringIndex];
      const angle = (i / techSkillsData.length) * Math.PI * 2;
      const speed = 0.004 + (node.ringIndex * 0.0015);

      const nodeGeo = new THREE.SphereGeometry(3.2, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ringColors[node.ringIndex]),
      });
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);

      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = (node.ringIndex - 1) * 9;

      orbitalGroup.add(mesh);
      nodeMeshes.push({ id: node.id, mesh, radius, speed, angle });
    });

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

      orbitalGroup.rotation.y += deltaX * 0.008;
      orbitalGroup.rotation.x += deltaY * 0.008;

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

      aiCore.rotation.y += 0.008;
      aiCore.rotation.x += 0.004;
      innerCore.rotation.y -= 0.01;

      if (!isDragging) {
        orbitalGroup.rotation.y += 0.004;
      }

      // Rotate individual nodes along orbital rings
      nodeMeshes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * item.radius;
      });

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
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#030509]">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/60 px-3.5 py-1 rounded-full border border-indigo-800/60 flex items-center justify-center gap-1.5 w-fit mx-auto">
          <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          3D ORBITAL TECH MATRIX
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-3 tracking-tight">
          Technical Stack & Specifications
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto font-mono">
          Drag to rotate the 3D orbital space. Select any skill badge to view its architecture specifications and impact metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Clean 3D WebGL Orbit Canvas & Technology Pills */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* 3D WebGL Orbital Canvas */}
          <div className="relative w-full h-80 sm:h-[380px] rounded-3xl bg-slate-950/90 border border-indigo-900/60 overflow-hidden cursor-grab active:cursor-grabbing mb-4 flex items-center justify-center shadow-2xl">
            <div ref={mountRef} className="absolute inset-0" />
            
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5 z-10">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> 3D Orbit Drag Active
            </div>

            {/* Selected Technology Indicator Overlay */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-indigo-500/50 flex items-center justify-between text-xs font-mono text-slate-200 z-10">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                Active Skill: <strong className="text-indigo-300">{selectedTech.name}</strong>
              </span>
              <span className="text-[10px] text-slate-400">{selectedTech.category}</span>
            </div>
          </div>

          {/* Technology Badges Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {techSkillsData.map((tech) => {
              const isSelected = selectedTech.id === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-lg shadow-indigo-600/40 scale-105 border border-cyan-400'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-indigo-500/40 hover:text-white'
                  }`}
                >
                  {tech.name}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Column: Clean Skill Specs Card ("Small Box Beside It") */}
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

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> SKILL TELEMETRY & SPECIFICATIONS
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-100 font-mono mt-0.5">
                    {selectedTech.name}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                  {selectedTech.category}
                </span>
              </div>

              {/* Performance Impact Metric */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">PERFORMANCE & IMPACT METRIC</div>
                <p className="text-sm font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {selectedTech.metrics}
                </p>
              </div>

              {/* Core Architecture */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">ARCHITECTURE / TECHNICAL SPECIFICATION</div>
                <p className="text-xs text-slate-200 font-mono font-semibold">{selectedTech.architecture}</p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">TECHNICAL DESCRIPTION</div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedTech.description}</p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
