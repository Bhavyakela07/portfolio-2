'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SystemIntroSequenceProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  targetX?: number;
  targetY?: number;
}

interface TechTagNode {
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
}

// Whisper-quiet audio click feedback for typing character appearance
const playSoftTypingClick = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.012);
    gain.gain.setValueAtTime(0.012, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.012);
  } catch {
    // Ignore audio context autoplay restriction gracefully
  }
};

export const SystemIntroSequence: React.FC<SystemIntroSequenceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const lastAudioCharRef = useRef<number>(-1);

  const run = useCallback(() => {
    // Check for prefers-reduced-motion accessibility setting
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = W < 768;

    // ── Phase Timing (Total ~7.0s) ──
    const STAGE1_MS = 800;  // 0.0 -> 0.8s: Dark Ambient space
    const STAGE2_MS = 1500; // 0.8 -> 2.3s: "building..." character writing
    const STAGE3_MS = 1200; // 2.3 -> 3.5s: "BUILDING INTELLIGENCE" morphing
    const STAGE4_MS = 1500; // 3.5 -> 5.0s: AI/ML Tech Stack Materializes
    const STAGE5_MS = 1200; // 5.0 -> 6.2s: Stack Mixes & Interconnects
    const STAGE6_MS = 800;  // 6.2 -> 7.0s: Convergence into central orb
    const STAGE7_MS = 200;  // 7.0s+: Trigger completion crossfade

    const T_STAGE1 = STAGE1_MS;
    const T_STAGE2 = T_STAGE1 + STAGE2_MS;
    const T_STAGE3 = T_STAGE2 + STAGE3_MS;
    const T_STAGE4 = T_STAGE3 + STAGE4_MS;
    const T_STAGE5 = T_STAGE4 + STAGE5_MS;
    const T_STAGE6 = T_STAGE5 + STAGE6_MS;

    const colors = ['#818cf8', '#22d3ee', '#c084fc', '#a855f7'];
    const numParticles = isMobile ? 40 : 100;

    // Ambient background particles
    const particles: Particle[] = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 0.6 + Math.random() * 0.8,
        alpha: 0.15 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Helper to sample text particle points from offscreen canvas
    const getParticlePointsFromTexts = (text1: string, font1: string, text2: string, font2: string, sampleGap = 5) => {
      const pts: { x: number; y: number }[] = [];
      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.ceil(W * dpr);
      offCanvas.height = Math.ceil(H * dpr);
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return pts;

      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      
      const gap = H * 0.05;
      offCtx.font = font1;
      offCtx.fillText(text1, W / 2, H / 2 - gap);

      offCtx.font = font2;
      offCtx.fillText(text2, W / 2, H / 2 + gap);

      try {
        const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
        const data = imgData.data;
        for (let py = 0; py < H; py += sampleGap) {
          for (let px = 0; px < W; px += sampleGap) {
            const idx = (Math.floor(py * dpr) * offCanvas.width + Math.floor(px * dpr)) * 4;
            if (idx >= 0 && idx < data.length && data[idx + 3] > 120) {
              pts.push({ x: px, y: py });
            }
          }
        }
      } catch {
        for (let i = 0; i < 200; i++) {
          pts.push({
            x: W / 2 + (Math.random() - 0.5) * 320,
            y: H / 2 + (Math.random() - 0.5) * 90,
          });
        }
      }
      return pts;
    };

    const cursiveText = 'building...';
    
    // Target particle points for "BUILDING INTELLIGENCE"
    const buildFont = `500 ${Math.min(W * 0.045, 34)}px 'Kanit', sans-serif`;
    const intelFont = `900 ${Math.min(W * 0.085, 68)}px 'Kanit', sans-serif`;
    const intelPts = getParticlePointsFromTexts('BUILDING', buildFont, 'INTELLIGENCE', intelFont, isMobile ? 7 : 5);
    const assignedIntelPts = particles.map(() => intelPts[Math.floor(Math.random() * intelPts.length)] || { x: W / 2, y: H / 2 });

    // Technologies represented in Bhavya's portfolio
    const fullTechList = isMobile
      ? ['GROQ', 'RAG', 'YOLOv8', 'GEMINI', 'FASTAPI', 'REACT']
      : ['GROQ', 'LLM', 'RAG', 'QDRANT', 'YOLOv8', 'GEMINI', 'XGBOOST', 'SPACY', 'FASTAPI', 'REACT', 'TYPESCRIPT', 'POSTGRESQL', 'DOCKER', 'AWS'];

    // Position tech tag nodes in orbital spatial layout
    const techNodes: TechTagNode[] = fullTechList.map((name, idx) => {
      const angle = (idx / fullTechList.length) * Math.PI * 2;
      const radiusX = Math.min(W, H) * (isMobile ? 0.32 : 0.36);
      const radiusY = Math.min(W, H) * (isMobile ? 0.28 : 0.28);
      return {
        name,
        x: W / 2,
        y: H / 2,
        targetX: W / 2 + Math.cos(angle) * radiusX,
        targetY: H / 2 + Math.sin(angle) * radiusY,
        color: colors[idx % colors.length],
      };
    });

    // Technology connection pairings for Stage 5 signal pulses
    const connections: [number, number][] = isMobile
      ? [[0, 1], [1, 3], [2, 4], [4, 5], [3, 4]]
      : [[0, 1], [1, 2], [2, 3], [4, 8], [5, 2], [6, 8], [7, 2], [8, 11], [9, 10], [8, 9], [12, 13]];

    let t0 = 0;
    
    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      const elapsed = ts - t0;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, W, H);

      // ── STAGE 1: DARK AMBIENT (~0.8s) ──
      if (elapsed <= T_STAGE1) {
        const progress = elapsed / STAGE1_MS;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * progress;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
      
      // ── STAGE 2: TYPING / WRITING "building..." (~1.5s) ──
      else if (elapsed <= T_STAGE2) {
        const stage2Elapsed = elapsed - T_STAGE1;
        const writeProgress = Math.min(1, stage2Elapsed / STAGE2_MS);
        
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = W;
          if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H;
          if (p.y > H) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        const fontSz = Math.min(W * 0.085, 75);
        ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const charsToShow = Math.floor(writeProgress * cursiveText.length);
        const partialStr = cursiveText.substring(0, charsToShow);

        // Trigger whisper-quiet audio tick on new character reveal
        if (charsToShow > 0 && charsToShow !== lastAudioCharRef.current) {
          lastAudioCharRef.current = charsToShow;
          playSoftTypingClick();
        }

        ctx.fillStyle = 'rgba(215, 226, 234, 0.95)';
        ctx.fillText(partialStr, W / 2, H / 2);

        // Glowing pen cursor tip
        if (charsToShow > 0 && charsToShow <= cursiveText.length) {
          const textW = ctx.measureText(partialStr).width;
          const fullW = ctx.measureText(cursiveText).width;
          const tipX = W / 2 - fullW / 2 + textW;
          const tipY = H / 2;

          const g = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 16);
          g.addColorStop(0, 'rgba(168, 85, 247, 0.95)');
          g.addColorStop(0.5, 'rgba(34, 211, 238, 0.5)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(tipX, tipY, 16, 0, Math.PI * 2);
          ctx.fill();

          for (let s = 0; s < 2; s++) {
            if (Math.random() > 0.4) {
              ctx.fillStyle = '#22d3ee';
              ctx.globalAlpha = Math.random() * 0.9;
              ctx.beginPath();
              ctx.arc(tipX + (Math.random() - 0.5) * 12, tipY + (Math.random() - 0.5) * 12, 0.6 + Math.random(), 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1;
      }
      
      // ── STAGE 3: BUILDING INTELLIGENCE MORPHING (~1.2s) ──
      else if (elapsed <= T_STAGE3) {
        const stage3Elapsed = elapsed - T_STAGE2;
        const progress = Math.min(1, stage3Elapsed / STAGE3_MS);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        // Cursive text fades out
        if (stage3Elapsed < 300) {
          const fadeProgress = stage3Elapsed / 300;
          const fontSz = Math.min(W * 0.085, 75);
          ctx.font = `italic 600 ${fontSz}px Georgia, serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(215, 226, 234, ${0.95 * (1 - fadeProgress)})`;
          ctx.fillText(cursiveText, W / 2, H / 2);
        }

        particles.forEach((p, idx) => {
          const target = assignedIntelPts[idx];
          if (target) {
            p.x += (target.x - p.x) * ease * 0.12;
            p.y += (target.y - p.y) * ease * 0.12;
          }
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.min(1, p.alpha + progress);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        
        const gap = H * 0.05;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * progress})`;
        
        ctx.font = buildFont;
        ctx.fillText('BUILDING', W / 2, H / 2 - gap);

        ctx.font = intelFont;
        ctx.fillText('INTELLIGENCE', W / 2, H / 2 + gap);

        ctx.globalAlpha = 1;
      }

      // ── STAGE 4: AI TECH STACK MATERIALIZES (~1.5s) ──
      else if (elapsed <= T_STAGE4) {
        const stage4Elapsed = elapsed - T_STAGE3;
        const progress = Math.min(1, stage4Elapsed / STAGE4_MS);
        const ease = 1 - Math.pow(1 - progress, 3);

        // Particle cloud disperses slowly into space
        particles.forEach((p) => {
          p.x += p.vx * 1.5;
          p.y += p.vy * 1.5;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Tech tag nodes float outward to spatial positions
        ctx.font = `700 ${Math.min(W * 0.03, isMobile ? 13 : 17)}px 'Kanit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        techNodes.forEach((node) => {
          node.x += (node.targetX - node.x) * ease * 0.15;
          node.y += (node.targetY - node.y) * ease * 0.15;

          // Node pill glow
          const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 24);
          g.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
          ctx.fill();

          // Node label text
          ctx.fillStyle = node.color;
          ctx.globalAlpha = Math.min(1, progress * 1.2);
          ctx.fillText(node.name, node.x, node.y);
        });

        ctx.globalAlpha = 1;
      }

      // ── STAGE 5: THE STACK MIXES & CONNECTS (~1.2s) ──
      else if (elapsed <= T_STAGE5) {
        const stage5Elapsed = elapsed - T_STAGE4;
        const progress = Math.min(1, stage5Elapsed / STAGE5_MS);

        // Gentle orbital drift
        techNodes.forEach((node, idx) => {
          const orbitSpeed = (idx % 2 === 0 ? 1 : -1) * 0.0015;
          const currentAngle = Math.atan2(node.y - H / 2, node.x - W / 2) + orbitSpeed;
          const radiusX = Math.min(W, H) * (isMobile ? 0.32 : 0.36);
          const radiusY = Math.min(W, H) * (isMobile ? 0.28 : 0.28);
          node.x = W / 2 + Math.cos(currentAngle) * radiusX;
          node.y = H / 2 + Math.sin(currentAngle) * radiusY;
        });

        // Draw connections between related tech nodes
        ctx.lineWidth = 1;
        connections.forEach(([i, j]) => {
          const n1 = techNodes[i];
          const n2 = techNodes[j];
          if (n1 && n2) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 * progress})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Signals traveling along connections
            const signalPos = (stage5Elapsed * 0.001 + (i + j) * 0.1) % 1;
            const sx = n1.x + (n2.x - n1.x) * signalPos;
            const sy = n1.y + (n2.y - n1.y) * signalPos;
            ctx.fillStyle = '#22d3ee';
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Render tech nodes
        ctx.font = `700 ${Math.min(W * 0.03, isMobile ? 13 : 17)}px 'Kanit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        techNodes.forEach((node) => {
          const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 24);
          g.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = node.color;
          ctx.globalAlpha = 1;
          ctx.fillText(node.name, node.x, node.y);
        });

        ctx.globalAlpha = 1;
      }

      // ── STAGE 6: CONVERGENCE (~0.8s) ──
      else if (elapsed <= T_STAGE6) {
        const stage6Elapsed = elapsed - T_STAGE5;
        const progress = Math.min(1, stage6Elapsed / STAGE6_MS);
        const ease = progress * progress * progress;

        // Tech nodes collapse to center
        techNodes.forEach((node) => {
          node.x += (W / 2 - node.x) * ease * 0.35;
          node.y += (H / 2 - node.y) * ease * 0.35;
        });

        // Connections collapse
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.25 * (1 - progress);
        connections.forEach(([i, j]) => {
          const n1 = techNodes[i];
          const n2 = techNodes[j];
          if (n1 && n2) {
            ctx.strokeStyle = '#22d3ee';
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        });

        // Glowing node points collapse
        techNodes.forEach((node) => {
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 1 - progress * 0.7;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3 * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fill();
        });

        // Central soft radial orb expands brightly
        ctx.globalAlpha = progress;
        const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 130 * progress);
        g.addColorStop(0, 'rgba(168, 85, 247, 0.95)');
        g.addColorStop(0.5, 'rgba(34, 211, 238, 0.5)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, 130 * progress, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      // ── STAGE 7: PORTFOLIO ENTERS (7.0s+) ──
      else {
        onComplete();
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => run(), 50);
    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [run]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
      className="fixed inset-0 z-50 bg-[#08080C]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Optional Skip Button for Instant Portfolio Access */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700 transition-all z-50 flex items-center gap-1.5 group cursor-pointer"
      >
        <span>Skip Intro</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </motion.div>
  );
};
