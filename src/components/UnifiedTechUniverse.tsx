'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FadeIn } from './FadeIn';
import { Cpu, Database, Layout, Cloud, Sparkles, X } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: 'aiml' | 'backend' | 'frontend' | 'infra';
  project: string;
  role: string;
  position: [number, number, number];
  color: string;
}

const TECH_NODES: TechItem[] = [
  // 🧠 AI / ML Cluster (Top Right Spatial Orbit)
  { id: 'xgboost', name: 'XGBoost', category: 'aiml', project: 'RecoverOS', role: 'Payment recovery probability estimation & anomaly scoring', position: [3.8, 2.2, 1.5], color: '#a855f7' },
  { id: 'yolov8', name: 'YOLOv8', category: 'aiml', project: 'KAVAACH', role: 'Real-time road safety & pothole detection vision pipeline', position: [4.5, 1.0, -1.2], color: '#a855f7' },
  { id: 'spacy', name: 'spaCy', category: 'aiml', project: 'Skill-Gap-Analyzer', role: 'NLP resume parsing & entity extraction pipeline', position: [2.9, 3.1, -2.0], color: '#a855f7' },
  { id: 'qdrant', name: 'Qdrant Vector DB', category: 'aiml', project: 'Skill-Gap-Analyzer', role: 'High-dimensional embedding similarity search', position: [3.2, -1.5, 2.0], color: '#a855f7' },
  { id: 'groq', name: 'Groq LPU', category: 'aiml', project: 'Skill-Gap-Analyzer', role: 'Ultra-low latency Llama 3 70B inference engine', position: [4.8, -0.5, -0.8], color: '#c084fc' },
  { id: 'gemini', name: 'Gemini API', category: 'aiml', project: 'PerspectAI', role: 'Multi-modal fact-checking & context reasoning', position: [2.5, 3.8, 1.0], color: '#c084fc' },
  { id: 'pytorch', name: 'PyTorch', category: 'aiml', project: 'AI Virtual Photographer', role: 'Deep learning model training & feature extraction', position: [3.5, -2.8, -1.5], color: '#a855f7' },

  // ⚡ Data / Backend Cluster (Bottom Right Spatial Orbit)
  { id: 'fastapi', name: 'FastAPI', category: 'backend', project: 'RecoverOS & KAVAACH', role: 'Async microservices backend API architecture', position: [2.2, -3.2, 2.2], color: '#38bdf8' },
  { id: 'postgres', name: 'PostgreSQL', category: 'backend', project: 'RecoverOS', role: 'ACID compliant relational ledger storage', position: [1.2, -4.2, -1.0], color: '#38bdf8' },
  { id: 'python', name: 'Python 3.11', category: 'backend', project: 'All AI Pipelines', role: 'Core AI logic, scripting, & data processing', position: [3.2, -3.8, 0.5], color: '#38bdf8' },
  { id: 'node', name: 'Node.js', category: 'backend', project: 'PerspectAI', role: 'Event-driven server runtime & stream handlers', position: [0.8, -3.5, 3.2], color: '#38bdf8' },
  { id: 'express', name: 'Express', category: 'backend', project: 'PerspectAI', role: 'RESTful route routing & authentication middleware', position: [2.5, -4.5, -2.2], color: '#38bdf8' },

  // 💻 Frontend Cluster (Top Left Spatial Orbit)
  { id: 'react', name: 'React 19', category: 'frontend', project: 'Portfolio & RecoverOS', role: 'Component-driven UI, hooks & state orchestration', position: [-3.5, 2.5, 1.8], color: '#22d3ee' },
  { id: 'next', name: 'Next.js 14', category: 'frontend', project: 'Portfolio', role: 'App router, SSR, & optimized static generation', position: [-4.2, 1.2, -1.5], color: '#22d3ee' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', project: 'All Full-Stack Systems', role: 'Strict static typing & contract safety', position: [-2.8, 3.8, -1.0], color: '#22d3ee' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', project: 'Portfolio', role: 'Utility-first dark-mode styling & fluid layouts', position: [-4.8, -0.8, 2.0], color: '#22d3ee' },
  { id: 'three', name: 'Three.js / WebGL', category: 'frontend', project: '3D Visualizations', role: '3D spatial matrix, particle shaders & lighting', position: [-3.2, 3.2, 2.8], color: '#22d3ee' },
  { id: 'framer', name: 'Framer Motion', category: 'frontend', project: 'Portfolio', role: 'Physics-based layout transitions & gestures', position: [-2.2, 4.2, 0.8], color: '#22d3ee' },

  // ☁️ Infrastructure & Tools Cluster (Bottom Left Spatial Orbit)
  { id: 'aws', name: 'AWS Cloud', category: 'infra', project: 'Production Systems', role: 'EC2, S3 bucket storage, & cloud deployment', position: [-3.2, -2.8, -2.5], color: '#818cf8' },
  { id: 'docker', name: 'Docker', category: 'infra', project: 'Microservices', role: 'Containerized reproducible backend environments', position: [-2.2, -4.0, 1.8], color: '#818cf8' },
  { id: 'git', name: 'Git & GitHub', category: 'infra', project: 'Version Control', role: 'CI/CD workflows, branching & repo management', position: [-4.0, -3.2, 0.2], color: '#818cf8' },
  { id: 'rest', name: 'REST APIs', category: 'infra', project: 'All Projects', role: 'Decoupled HTTP endpoints & JSON schemas', position: [-1.5, -3.8, -3.2], color: '#818cf8' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Stack (22 Nodes)', icon: Sparkles },
  { id: 'aiml', label: 'AI / ML Engines', icon: Cpu, color: '#a855f7' },
  { id: 'backend', label: 'Data & Backend', icon: Database, color: '#38bdf8' },
  { id: 'frontend', label: 'Frontend & 3D', icon: Layout, color: '#22d3ee' },
  { id: 'infra', label: 'Cloud & Infra', icon: Cloud, color: '#818cf8' },
];

export const UnifiedTechUniverse: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeCategoryRef = useRef<string>(activeCategory);
  const [selectedNode, setSelectedNode] = useState<TechItem | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isMobile = window.innerWidth < 768;

    // ── Setup Three.js WebGL Scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xc084fc, 2, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // ── Central AI Core Orb ──
    const coreGroup = new THREE.Group();
    const wireGeo = new THREE.IcosahedronGeometry(1.2, isMobile ? 1 : 2);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    const innerGeo = new THREE.SphereGeometry(0.65, isMobile ? 16 : 32, isMobile ? 16 : 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    scene.add(coreGroup);

    // ── Node Meshes Array ──
    const nodeMeshes: { mesh: THREE.Mesh; node: TechItem }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.35, isMobile ? 16 : 32, isMobile ? 16 : 32);

    TECH_NODES.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...node.position);
      scene.add(mesh);
      nodeMeshes.push({ mesh, node });
    });

    // Raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          setHoveredNode(hit.node);
          canvas.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        canvas.style.cursor = 'grab';
      }

      if (isMouseDown) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        scene.rotation.y += deltaX * 0.005;
        scene.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      isMouseDown = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit) setSelectedNode(hit.node);
      }
    };

    const handlePointerUp = () => {
      isMouseDown = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    // ── Resize Handler ──
    const handleResize = () => {
      if (!container || !canvas) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // ── Intersection Observer ──
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // ── Animation Loop ──
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause rAF logic when offscreen

      // Rotate scene slowly
      scene.rotation.y += 0.002;
      coreGroup.rotation.y += 0.01;

      // Pulse meshes
      const currentCategory = activeCategoryRef.current;
      nodeMeshes.forEach(({ mesh, node }) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const isDim = currentCategory !== 'all' && node.category !== currentCategory;

        if (isDim) {
          mat.opacity = 0.25;
          mesh.scale.setScalar(0.65);
        } else {
          mat.opacity = 0.95;
          mesh.scale.setScalar(1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometry and material
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      sphereGeo.dispose();
      nodeMeshes.forEach(({ mesh }) => {
        (mesh.material as THREE.Material).dispose();
      });
      
      renderer.dispose();
    };
  }, []);

  const activeDetailNode = selectedNode || hoveredNode;

  return (
    <section id="skills" className="relative min-h-screen bg-[#08080C] text-[#D7E2EA] py-20 px-4 sm:px-8 overflow-hidden flex flex-col justify-between">
      
      {/* SECTION HEADER */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <FadeIn delay={0} y={30}>
          <span className="px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono uppercase tracking-widest">
            Consolidated 3D Tech Architecture
          </span>
          <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight mt-3">
            Tech Universe
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-light">
            An interactive 3D spatial network of 22 core technologies powering end-to-end AI models, pipelines, and full-stack systems.
          </p>
        </FadeIn>

        {/* CATEGORY FILTER TABS */}
        <FadeIn delay={0.15} y={20} className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-600/30 border border-purple-500/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                    : 'bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-white/25'
                }`}
              >
                <Icon className="w-4 h-4" style={{ color: cat.color || '#a855f7' }} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </FadeIn>
      </div>

      {/* 3D CANVAS SPATIAL VIEWPORT */}
      <div ref={containerRef} className="relative w-full h-[55vh] sm:h-[65vh] my-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden cursor-grab active:cursor-grabbing">
        {prefersReducedMotion ? (
          <div className="w-full h-full p-6 sm:p-10 overflow-y-auto custom-scrollbar flex flex-wrap gap-4 items-center justify-center">
            {TECH_NODES.filter(n => activeCategory === 'all' || n.category === activeCategory).map(node => (
              <div key={node.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-2 w-40 text-center items-center">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: node.color }} />
                <span className="font-bold text-white text-sm">{node.name}</span>
                <span className="text-xs text-gray-400">{node.project}</span>
              </div>
            ))}
          </div>
        ) : (
          <canvas ref={canvasRef} className="w-full h-full block" />
        )}

        {/* INSTRUCTION PILL */}
        {!prefersReducedMotion && (
          <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>DRAG TO ROTATE | CLICK SPHERE NODE TO INSPECT ROLE</span>
          </div>
        )}

        {/* HOVER / SELECTION DETAIL PANEL CARD */}
        {activeDetailNode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#121318]/90 backdrop-blur-2xl border border-purple-500/40 p-5 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-20 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeDetailNode.color }} />
                <h3 className="font-bold text-lg text-white tracking-wide">{activeDetailNode.name}</h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-purple-300 font-mono flex items-center gap-1">
              <span>PROJECT:</span>
              <span className="font-bold text-white">{activeDetailNode.project}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              {activeDetailNode.role}
            </p>
          </div>
        )}
      </div>

      {/* FOOTER METRIC NOTE */}
      <div className="relative z-10 text-center text-xs text-gray-500 font-mono">
        Single WebGL Viewport | Zero DOM Node Overhead | 60 FPS Three.js Scene
      </div>

    </section>
  );
};
